-- Insert sample liquidity pools
INSERT INTO liquidity_pools (id, name, pair, protocol, tvl, apy, risk_level, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Quipuswap Stability Pool', 'XTZ/USDT', 'Quipuswap', 2500000, 8.5, 'low', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Plenty DEX LP', 'XTZ/ETH', 'Plenty', 1800000, 12.3, 'medium', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Youves Yield Farm', 'uUSD/uBTC', 'Youves', 950000, 15.7, 'medium', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'SpicySwap Liquidity', 'XTZ/KUSD', 'SpicySwap', 750000, 9.2, 'low', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'Crunchy Staking Pool', 'CRUNCH/XTZ', 'Crunchy', 320000, 22.5, 'high', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'Quipuswap Farming', 'kUSD/USDC', 'Quipuswap', 1250000, 7.8, 'low', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'Plenty Stables Pool', 'USDT/USDC', 'Plenty', 3100000, 5.4, 'low', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'Youves Governance', 'YOU/XTZ', 'Youves', 680000, 18.9, 'high', NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999999', 'SpicySwap High Yield', 'FLAME/XTZ', 'SpicySwap', 420000, 25.3, 'high', NOW(), NOW()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Crunchy Stable Farm', 'USDC/DAI', 'Crunchy', 1750000, 6.7, 'low', NOW(), NOW())
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  pair = EXCLUDED.pair,
  protocol = EXCLUDED.protocol,
  tvl = EXCLUDED.tvl,
  apy = EXCLUDED.apy,
  risk_level = EXCLUDED.risk_level,
  updated_at = NOW();

-- Insert sample performance history (last 30 days for each pool)
DO $$
DECLARE
  pool_id uuid;
  current_date date := CURRENT_DATE;
  i int;
  tvl_value numeric;
  apy_value numeric;
  daily_change numeric;
BEGIN
  FOR pool_id IN SELECT id FROM liquidity_pools LOOP
    -- Get initial values from the pool
    SELECT tvl, apy INTO tvl_value, apy_value FROM liquidity_pools WHERE id = pool_id;
    
    -- Generate 30 days of history with small random changes
    FOR i IN 1..30 LOOP
      -- Random daily change between -3% and +3%
      daily_change := 0.97 + random() * 0.06;
      
      -- Update values with daily change
      tvl_value := tvl_value * daily_change;
      apy_value := apy_value * (0.98 + random() * 0.04); -- Smaller changes for APY
      
      -- Insert the daily record
      INSERT INTO performance_history (id, pool_id, date, tvl, apy, created_at)
      VALUES (
        gen_random_uuid(),
        pool_id,
        current_date - (i || ' days')::interval,
        tvl_value,
        apy_value,
        NOW()
      )
      ON CONFLICT (pool_id, date) DO UPDATE
      SET tvl = EXCLUDED.tvl, apy = EXCLUDED.apy;
    END LOOP;
  END LOOP;
END $$;
