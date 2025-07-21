-- Create strategies table
CREATE TABLE IF NOT EXISTS strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  risk_level VARCHAR(50) NOT NULL,
  target_apy DECIMAL(10, 2) NOT NULL,
  stable_pairs_percentage INTEGER NOT NULL,
  medium_volatility_percentage INTEGER NOT NULL,
  high_volatility_percentage INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strategy_pools table to track pool allocations
CREATE TABLE IF NOT EXISTS strategy_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE CASCADE,
  pool_id UUID,
  allocation_percentage INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strategy_performance table to track historical performance
CREATE TABLE IF NOT EXISTS strategy_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  apy DECIMAL(10, 2) NOT NULL,
  tvl DECIMAL(20, 2),
  fees_earned DECIMAL(20, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_strategies_user_id ON strategies(user_id);
CREATE INDEX IF NOT EXISTS idx_strategy_pools_strategy_id ON strategy_pools(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_performance_strategy_id ON strategy_performance(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_performance_date ON strategy_performance(date);

-- Add some sample data
INSERT INTO strategies (name, description, risk_level, target_apy, stable_pairs_percentage, medium_volatility_percentage, high_volatility_percentage, status)
VALUES 
('Conservative Tezos', 'Low risk strategy focusing on stable pairs', 'Low', 8.5, 70, 30, 0, 'active'),
('Balanced Yield', 'Moderate risk with balanced allocation', 'Medium', 15.8, 40, 40, 20, 'active'),
('Growth Maximizer', 'High risk strategy for maximum returns', 'High', 24.5, 10, 40, 50, 'active');
