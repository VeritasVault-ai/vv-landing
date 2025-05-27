-- Create wallet_sessions table for tracking wallet connection sessions
CREATE TABLE IF NOT EXISTS wallet_sessions (
  id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_active TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  ip_address TEXT,
  user_agent TEXT,
  security_score INTEGER CHECK (security_score IS NULL OR (security_score >= 0 AND security_score <= 100)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_user_id ON wallet_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_session_id ON wallet_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_wallet_address ON wallet_sessions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_is_active ON wallet_sessions(is_active);

-- Add RLS policies for security
ALTER TABLE wallet_sessions ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own wallet sessions
CREATE POLICY wallet_sessions_select_policy
  ON wallet_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own wallet sessions (via API)
CREATE POLICY wallet_sessions_insert_policy
  ON wallet_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own wallet sessions
CREATE POLICY wallet_sessions_update_policy
  ON wallet_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_wallet_sessions()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE wallet_sessions
  SET is_active = FALSE
  WHERE expires_at < NOW() AND is_active = TRUE;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to run cleanup function periodically
DROP TRIGGER IF EXISTS trigger_cleanup_expired_wallet_sessions ON wallet_sessions;
CREATE TRIGGER trigger_cleanup_expired_wallet_sessions
AFTER INSERT OR UPDATE ON wallet_sessions
EXECUTE FUNCTION cleanup_expired_wallet_sessions();

-- Create an additional daily scheduled job for cleaning up expired sessions
COMMENT ON FUNCTION cleanup_expired_wallet_sessions() IS 'Cleans up expired wallet sessions to maintain security. Should be called by trigger and scheduled job.';