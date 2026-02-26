-- Secure receituario-media bucket with clinic-based RLS
-- Date: 2026-02-26
-- Purpose: Restrict storage.objects access to members of the clinic identified by the first segment of the path (clinicId UUID).
--          Replace permissive policies that allowed any authenticated user to read/write the whole bucket.

-- Ensure bucket exists and is private (already set by previous migration)
INSERT INTO storage.buckets (id, name, public)
VALUES ('receituario-media', 'receituario-media', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Drop existing permissive policies
DROP POLICY IF EXISTS rxv_media_read ON storage.objects;
DROP POLICY IF EXISTS rxv_media_insert ON storage.objects;
DROP POLICY IF EXISTS rxv_media_update ON storage.objects;
DROP POLICY IF EXISTS rxv_media_delete ON storage.objects;

-- 1) SELECT policy: users can read objects where they are members of the clinic extracted from the path
CREATE POLICY rxv_media_read ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND public.is_member_of_clinic(
    split_part(name, '/', 1)::uuid
  )
);

-- 2) INSERT policy: users can insert objects only into paths that start with their clinic UUID
CREATE POLICY rxv_media_insert ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'receituario-media'
  AND public.is_member_of_clinic(
    split_part(name, '/', 1)::uuid
  )
);

-- 3) UPDATE policy: users can update objects only within their clinic
CREATE POLICY rxv_media_update ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND public.is_member_of_clinic(
    split_part(name, '/', 1)::uuid
  )
)
WITH CHECK (
  bucket_id = 'receituario-media'
  AND public.is_member_of_clinic(
    split_part(name, '/', 1)::uuid
  )
);

-- 4) DELETE policy: users can delete objects only within their clinic
CREATE POLICY rxv_media_delete ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND public.is_member_of_clinic(
    split_part(name, '/', 1)::uuid
  )
);

-- Optional: Add a comment to clarify the path structure
COMMENT ON POLICY rxv_media_read ON storage.objects IS 'Users can read objects where the first path segment is a clinic they belong to';
COMMENT ON POLICY rxv_media_insert ON storage.objects IS 'Users can insert objects only into paths that start with their clinic UUID';
COMMENT ON POLICY rxv_media_update ON storage.objects IS 'Users can update objects only within their clinic';
COMMENT ON POLICY rxv_media_delete ON storage.objects IS 'Users can delete objects only within their clinic';