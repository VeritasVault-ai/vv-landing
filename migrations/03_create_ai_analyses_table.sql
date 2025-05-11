-- Create AI analyses table to store prediction results
CREATE TABLE IF NOT EXISTS ai_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  prediction_data JSONB NOT NULL,
  recommendations JSONB,
  risk_assessment JSONB,
  impermanent_loss JSONB,
  confidence FLOAT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS ai_analyses_user_id_idx ON ai_analyses(user_id);
CREATE INDEX IF NOT EXISTS ai_analyses_timestamp_idx ON ai_analyses(timestamp);

-- Add RLS policies
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own analyses
CREATE POLICY "Users can view their own analyses"
  ON ai_analyses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own analyses
CREATE POLICY "Users can insert their own analyses"
  ON ai_analyses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own analyses
CREATE POLICY "Users can update their own analyses"
  ON ai_analyses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own analyses
CREATE POLICY "Users can delete their own analyses"
  ON ai_analyses
  FOR DELETE
  USING (auth.uid() = user_id);
