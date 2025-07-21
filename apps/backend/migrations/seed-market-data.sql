-- Seed data for market_data table
INSERT INTO market_data (symbol, price, change_24h, volume_24h, market_cap, timestamp)
VALUES
  ('ETH', 3450.75, 2.35, 12500000000, 415000000000, NOW()),
  ('BTC', 62150.25, 1.25, 28700000000, 1210000000000, NOW()),
  ('SOL', 128.45, 4.75, 3200000000, 54000000000, NOW()),
  ('AVAX', 35.80, -1.20, 980000000, 12800000000, NOW());
