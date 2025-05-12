-- Create auth logs table to track user logins
CREATE TABLE IF NOT EXISTS auth_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dashboard stats table
CREATE TABLE IF NOT EXISTS user_dashboard_stats (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_value_locked DECIMAL(18, 2) DEFAULT 0,
  active_strategies INTEGER DEFAULT 0,
  total_yield_30d DECIMAL(18, 2) DEFAULT 0,
  il_prevented DECIMAL(18, 2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user activity table
CREATE TABLE IF NOT EXISTS user_activity (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to log auth events
CREATE OR REPLACE FUNCTION log_auth_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO auth_logs (user_id, event_type, created_at)
  VALUES (NEW.id, 'login', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS auth_event_trigger ON auth.users;
CREATE TRIGGER auth_event_trigger
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION log_auth_event();
