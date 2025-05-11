-- Seed data for liquidity pools
INSERT INTO liquidity_pools (name, pair, protocol, chain, tvl, apy, risk_level, address, is_verified)
VALUES
  ('Plenty USDT/USDtz', 'USDT/USDtz', 'Plenty', 'Tezos', 2500000, 4.5, 'low', 'KT1EtjRRCBC2exyCRXZPn59fCJhTZGLZ8LTW', true),
  ('Plenty ETHtz/XTZ', 'ETHtz/XTZ', 'Plenty', 'Tezos', 1800000, 8.2, 'medium', 'KT1GA6KaUvcx1GbTCT3VGX8Qm5V7gKqf6cii', true),
  ('QuipuSwap USDtz/XTZ', 'USDtz/XTZ', 'QuipuSwap', 'Tezos', 3200000, 5.1, 'low', 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6', true),
  ('QuipuSwap BTC/XTZ', 'BTC/XTZ', 'QuipuSwap', 'Tezos', 2100000, 7.8, 'medium', 'KT1WBLrLE2vG8SedBqiSJFm4VVAZZBytJYHc', true),
  ('SpicySwap USDC/XTZ', 'USDC/XTZ', 'SpicySwap', 'Tezos', 1500000, 6.3, 'low', 'KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z', true),
  ('SpicySwap LINK/XTZ', 'LINK/XTZ', 'SpicySwap', 'Tezos', 950000, 9.5, 'high', 'KT1TwzD6zV3WeJ39ukuqxcfK2fJCnhvrdN1X', true),
  ('Plenty MATIC/XTZ', 'MATIC/XTZ', 'Plenty', 'Tezos', 780000, 11.2, 'high', 'KT1Waas7LkEUjYHNF8zrjp93p8qdXkw7HM8p', true),
  ('QuipuSwap KUSD/USDtz', 'KUSD/USDtz', 'QuipuSwap', 'Tezos', 4200000, 3.8, 'low', 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6', true),
  ('Plenty DOT/XTZ', 'DOT/XTZ', 'Plenty', 'Tezos', 1200000, 8.9, 'medium', 'KT1WxgZ1ZSfMgmsSDDcUn8Xn577HwnQ7VdAv', true),
  ('SpicySwap AAVE/XTZ', 'AAVE/XTZ', 'SpicySwap', 'Tezos', 850000, 10.3, 'high', 'KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z', true);

-- Insert seed data for performance history
INSERT INTO performance_history (strategy_id, pool_id, date, tvl, apy, impermanent_loss, fees_earned)
SELECT 
  NULL as strategy_id,
  id as pool_id,
  (CURRENT_DATE - (i || ' days')::INTERVAL)::DATE as date,
  tvl * (1 + (random() * 0.1 - 0.05)) as tvl,
  apy * (1 + (random() * 0.2 - 0.1)) as apy,
  random() * 0.5 as impermanent_loss,
  tvl * apy / 365 * random() as fees_earned
FROM liquidity_pools, generate_series(1, 30) as i;

-- Insert default admin role (you'll need to replace with a real user ID after signup)
INSERT INTO user_roles (user_id, role)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin')
ON CONFLICT (user_id) DO NOTHING;
