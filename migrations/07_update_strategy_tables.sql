-- Add additional fields to strategies table for better comparison
ALTER TABLE strategies 
ADD COLUMN IF NOT EXISTS historical_volatility DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS sharpe_ratio DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS max_drawdown DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS avg_monthly_return DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS benchmark_id UUID,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Create strategy_comparison table to store comparison sessions
CREATE TABLE IF NOT EXISTS strategy_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strategy_comparison_items to track which strategies are being compared
CREATE TABLE IF NOT EXISTS strategy_comparison_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comparison_id UUID REFERENCES strategy_comparisons(id) ON DELETE CASCADE,
  strategy_id UUID REFERENCES strategies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for strategy metrics snapshots to enable point-in-time comparisons
CREATE TABLE IF NOT EXISTS strategy_metrics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_id UUID REFERENCES strategies(id) ON DELETE CASCADE,
  snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tvl DECIMAL(20, 2),
  apy DECIMAL(10, 2),
  fees_earned DECIMAL(20, 2),
  impermanent_loss DECIMAL(10, 2),
  risk_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some sample data for strategy metrics
INSERT INTO strategy_metrics_snapshots (strategy_id, snapshot_date, tvl, apy, fees_earned, impermanent_loss, risk_score)
SELECT 
  id, 
  NOW() - (i || ' days')::INTERVAL, 
  50000 + (RANDOM() * 10000)::DECIMAL(20, 2), 
  (8 + (RANDOM() * 20))::DECIMAL(10, 2),
  (100 + (RANDOM() * 500))::DECIMAL(20, 2),
  (0.5 + (RANDOM() * 5))::DECIMAL(10, 2),
  (CASE WHEN risk_level = 'Low' THEN 2 + (RANDOM() * 2)::INTEGER
        WHEN risk_level = 'Medium' THEN 4 + (RANDOM() * 3)::INTEGER
        ELSE 7 + (RANDOM() * 3)::INTEGER END)
FROM strategies, generate_series(1, 30) i
WHERE status = 'active';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_strategy_comparison_items_comparison_id ON strategy_comparison_items(comparison_id);
CREATE INDEX IF NOT EXISTS idx_strategy_metrics_snapshots_strategy_id ON strategy_metrics_snapshots(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_metrics_snapshots_date ON strategy_metrics_snapshots(snapshot_date);
