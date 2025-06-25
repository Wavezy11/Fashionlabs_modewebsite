-- Add updated_at column to pending_photos table if you want to track updates
ALTER TABLE pending_photos 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_pending_photos_updated_at ON pending_photos;
CREATE TRIGGER update_pending_photos_updated_at
    BEFORE UPDATE ON pending_photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
