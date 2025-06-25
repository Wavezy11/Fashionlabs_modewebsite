-- Bucket voor alle foto formaten - maximale flexibiliteit
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads', 
  true,
  6291456, -- 6MB limiet
  ARRAY[
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/webp', 
    'image/gif', 
    'image/bmp', 
    'image/tiff', 
    'image/tif',
    'image/heic', 
    'image/heif',
    'image/avif',
    'image/svg+xml'
  ] -- Alle gangbare foto formaten
) ON CONFLICT (id) DO NOTHING;

-- RLS policies
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Public Upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Limited Update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
