-- Add auth_provider column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS auth_provider VARCHAR(50) DEFAULT 'email';

-- Add last_sign_in column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Make email nullable since some providers might not provide email
ALTER TABLE user_profiles 
ALTER COLUMN email DROP NOT NULL;

-- Create function to handle user profile sync on auth events
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name, email, avatar_url, auth_provider)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(
      (SELECT provider FROM auth.identities WHERE id = NEW.id LIMIT 1),
      'email'
    )
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    email = COALESCE(EXCLUDED.email, user_profiles.email),
    avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
    auth_provider = EXCLUDED.auth_provider,
    last_sign_in = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
