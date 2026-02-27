-- Harden receituario-media policies:
-- - Enforce clinic UUID in first path segment
-- - Avoid invalid UUID cast errors in RLS evaluation
-- - Keep access scoped to clinic membership via is_member_of_clinic(uuid)

INSERT INTO storage.buckets (id, name, public)
VALUES ('receituario-media', 'receituario-media', false)
ON CONFLICT (id) DO UPDATE SET public = false;

DROP POLICY IF EXISTS rxv_media_read ON storage.objects;
DROP POLICY IF EXISTS rxv_media_insert ON storage.objects;
DROP POLICY IF EXISTS rxv_media_update ON storage.objects;
DROP POLICY IF EXISTS rxv_media_delete ON storage.objects;

CREATE POLICY rxv_media_read ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  AND public.is_member_of_clinic(split_part(name, '/', 1)::uuid)
);

CREATE POLICY rxv_media_insert ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'receituario-media'
  AND split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  AND public.is_member_of_clinic(split_part(name, '/', 1)::uuid)
);

CREATE POLICY rxv_media_update ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  AND public.is_member_of_clinic(split_part(name, '/', 1)::uuid)
)
WITH CHECK (
  bucket_id = 'receituario-media'
  AND split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  AND public.is_member_of_clinic(split_part(name, '/', 1)::uuid)
);

CREATE POLICY rxv_media_delete ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'receituario-media'
  AND split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  AND public.is_member_of_clinic(split_part(name, '/', 1)::uuid)
);
