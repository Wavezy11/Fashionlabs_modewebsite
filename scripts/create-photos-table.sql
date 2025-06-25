-- Create photos table for approved photos
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_name VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_photos_likes ON photos(likes DESC);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reads for everyone
CREATE POLICY "Allow public reads" ON photos
  FOR SELECT USING (true);

-- Create policy to allow inserts for everyone (for approved photos)
CREATE POLICY "Allow public inserts" ON photos
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updates for everyone (for likes)
CREATE POLICY "Allow public updates" ON photos
  FOR UPDATE USING (true);
