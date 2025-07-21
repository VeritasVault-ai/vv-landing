-- Create table for tracking data refresh status
CREATE TABLE IF NOT EXISTS data_refresh_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data_type VARCHAR(255) NOT NULL UNIQUE,
  last_updated TIMESTAMP WITH TIME ZONE,
  next_refresh TIMESTAMP WITH TIME ZONE,
  is_refreshing BOOLEAN DEFAULT FALSE,
  refresh_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for tracking background processes
CREATE TABLE IF NOT EXISTS background_processes (
  id VARCHAR(255) PRIMARY KEY,
  data_type VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  options JSONB,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for error logging
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  stack TEXT,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create index on data_type for faster lookups
CREATE INDEX IF NOT EXISTS idx_background_processes_data_type ON background_processes(data_type);

-- Create index on status for filtering by status
CREATE INDEX IF NOT EXISTS idx_background_processes_status ON background_processes(status);

-- Create index on source for error logs
CREATE INDEX IF NOT EXISTS idx_error_logs_source ON error_logs(source);

-- Create index on created_at for error logs
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
