-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create strategies table
CREATE TABLE IF NOT EXISTS strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  risk_level VARCHAR(50) NOT NULL,
  target_apy FLOAT NOT NULL,
  stable_pairs_percentage FLOAT NOT NULL,
  medium_volatility_percentage FLOAT NOT NULL,
  high_volatility_percentage FLOAT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create liquidity pools table
CREATE TABLE IF NOT EXISTS liquidity_pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  pair VARCHAR(255) NOT NULL,
  protocol VARCHAR(255) NOT NULL,
  chain VARCHAR(100) NOT NULL,
  tvl FLOAT NOT NULL,
  apy FLOAT NOT NULL,
  risk_level VARCHAR(50) NOT NULL,
  address VARCHAR(255),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create strategy pools table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS strategy_pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES liquidity_pools(id) ON DELETE SET NULL,
  allocation_percentage FLOAT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create performance history table
CREATE TABLE IF NOT EXISTS performance_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  strategy_id UUID REFERENCES strategies(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES liquidity_pools(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  tvl FLOAT NOT NULL,
  apy FLOAT NOT NULL,
  impermanent_loss FLOAT,
  fees_earned FLOAT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme VARCHAR(50) DEFAULT 'system',
  notification_preferences JSONB DEFAULT '{"email": true, "push": true}',
  risk_tolerance VARCHAR(50) DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_preferences UNIQUE (user_id)
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_role UNIQUE (user_id)
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS strategies_user_id_idx ON strategies(user_id);
CREATE INDEX IF NOT EXISTS liquidity_pools_protocol_idx ON liquidity_pools(protocol);
CREATE INDEX IF NOT EXISTS liquidity_pools_chain_idx ON liquidity_pools(chain);
CREATE INDEX IF NOT EXISTS strategy_pools_strategy_id_idx ON strategy_pools(strategy_id);
CREATE INDEX IF NOT EXISTS performance_history_strategy_id_idx ON performance_history(strategy_id);
CREATE INDEX IF NOT EXISTS performance_history_date_idx ON performance_history(date);

-- Add RLS policies
ALTER TABLE strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE liquidity_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Strategies policies
CREATE POLICY "Users can view their own strategies"
  ON strategies
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own strategies"
  ON strategies
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own strategies"
  ON strategies
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own strategies"
  ON strategies
  FOR DELETE
  USING (auth.uid() = user_id);

-- Liquidity pools policies (public read, admin write)
CREATE POLICY "Anyone can view liquidity pools"
  ON liquidity_pools
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify liquidity pools"
  ON liquidity_pools
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  ));

-- Strategy pools policies
CREATE POLICY "Users can view their own strategy pools"
  ON strategy_pools
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM strategies
    WHERE strategies.id = strategy_pools.strategy_id
    AND strategies.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own strategy pools"
  ON strategy_pools
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM strategies
    WHERE strategies.id = strategy_pools.strategy_id
    AND strategies.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own strategy pools"
  ON strategy_pools
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM strategies
    WHERE strategies.id = strategy_pools.strategy_id
    AND strategies.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own strategy pools"
  ON strategy_pools
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM strategies
    WHERE strategies.id = strategy_pools.strategy_id
    AND strategies.user_id = auth.uid()
  ));

-- Performance history policies
CREATE POLICY "Users can view their own performance history"
  ON performance_history
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM strategies
    WHERE strategies.id = performance_history.strategy_id
    AND strategies.user_id = auth.uid()
  ));

-- User preferences policies
CREATE POLICY "Users can view their own preferences"
  ON user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Settings policies
CREATE POLICY "Anyone can view public settings"
  ON settings
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "Admins can view all settings"
  ON settings
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  ));

CREATE POLICY "Only admins can modify settings"
  ON settings
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  ));

-- User roles policies
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can modify user roles"
  ON user_roles
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  ));

-- Insert default settings
INSERT INTO settings (key, value, description, is_public)
VALUES 
  ('app_name', '"Tezos Liquidity Management"', 'Application name', true),
  ('maintenance_mode', 'false', 'Whether the application is in maintenance mode', true),
  ('default_risk_tolerance', '"medium"', 'Default risk tolerance for new users', true),
  ('min_allocation_percentage', '5', 'Minimum allocation percentage for a pool in a strategy', true),
  ('max_pools_per_strategy', '10', 'Maximum number of pools allowed in a strategy', true),
  ('featured_protocols', '["Plenty", "QuipuSwap", "SpicySwap"]', 'Featured protocols to highlight', true),
  ('api_rate_limits', '{"public": 60, "authenticated": 120}', 'API rate limits per minute', false)
ON CONFLICT (key) DO NOTHING;
