
-- Add project_id to projects table to store the ID from the generation service
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_id TEXT;
-- Make project_id unique
ALTER TABLE public.projects ADD CONSTRAINT projects_project_id_key UNIQUE (project_id);

-- Create a storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage: Authenticated users can upload to a folder named with their user ID.
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'project-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- RLS for storage: Users can list their own images.
CREATE POLICY "Users can list their own images"
ON storage.objects FOR SELECT TO authenticated
USING ( bucket_id = 'project-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- RLS for storage: Users can update their own images.
CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'project-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- RLS for storage: Users can delete their own images.
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'project-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

