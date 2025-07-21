-- Add new columns to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email_notifications": true, "strategy_alerts": true, "performance_updates": true, "security_alerts": true}'::jsonb;

-- Update existing records to have default notification preferences
UPDATE user_profiles
SET notification_preferences = '{"email_notifications": true, "strategy_alerts": true, "performance_updates": true, "security_alerts": true}'::jsonb
WHERE notification_preferences IS NULL;
