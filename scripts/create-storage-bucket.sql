-- Disable RLS temporarily to create bucket
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the uploads bucket
CREATE POLICY "Give users access to uploads folder" ON storage.objects
FOR ALL USING (bucket_id = 'uploads');

-- Allow public access to uploads
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Public Upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Public Update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'uploads');

CREATE POLICY "Public Delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'uploads');
