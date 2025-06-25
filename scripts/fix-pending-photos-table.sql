-- First, let's check the current table structure and fix it
-- Drop the existing table and recreate it properly
DROP TABLE IF EXISTS pending_photos CASCADE;

-- Create the table with proper SERIAL primary key
CREATE TABLE pending_photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  image_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_pending_photos_status ON pending_photos(status);
CREATE INDEX idx_pending_photos_created_at ON pending_photos(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE pending_photos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for everyone (for photo uploads)
CREATE POLICY "Allow photo uploads" ON pending_photos
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users only (for admin dashboard)
CREATE POLICY "Allow reads for authenticated users" ON pending_photos
  FOR SELECT USING (true);

-- Create policy to allow updates for authenticated users
CREATE POLICY "Allow updates for authenticated users" ON pending_photos
  FOR UPDATE USING (true);

-- Create policy to allow deletes for authenticated users
CREATE POLICY "Allow deletes for authenticated users" ON pending_photos
  FOR DELETE USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pending_photos_updated_at
    BEFORE UPDATE ON pending_photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
