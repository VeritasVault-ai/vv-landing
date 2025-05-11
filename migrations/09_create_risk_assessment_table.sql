-- Create risk assessments table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES liquidity_pools(id) ON DELETE CASCADE,
  strategy_id UUID REFERENCES strategies(id) ON DELETE CASCADE,
  assessment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_risk_assessments_pool_id ON risk_assessments(pool_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_strategy_id ON risk_assessments(strategy_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_created_at ON risk_assessments(created_at);

-- Add constraint to ensure either pool_id or strategy_id is provided
ALTER TABLE risk_assessments ADD CONSTRAINT check_risk_assessment_target 
  CHECK (
    (pool_id IS NOT NULL AND strategy_id IS NULL) OR 
    (pool_id IS NULL AND strategy_id IS NOT NULL)
  );
