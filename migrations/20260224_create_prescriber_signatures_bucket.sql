-- ============================================================================
-- Migration: Create Storage bucket for prescriber signatures and logos
-- Date: 2026-02-24
-- Purpose: TAREFA G - Storage para assinaturas e logos dos prescritores
-- ============================================================================

-- STEP 1: Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriber_signatures', 'prescriber_signatures', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 2: RLS Policies for storage
-- ============================================================================

-- Policy: Users can upload their own signatures
CREATE POLICY "Users can upload their own signatures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can read their own signatures
CREATE POLICY "Users can read their own signatures"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can update their own signatures
CREATE POLICY "Users can update their own signatures"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can delete their own signatures
CREATE POLICY "Users can delete their own signatures"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'prescriber_signatures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- COMMIT: Migration complete
-- ============================================================================

-- Usage example:
-- Path format: /{user_id}/signature.png
-- Path format: /{user_id}/logo.png
--
-- Upload via Supabase client:
-- const { data, error } = await supabase.storage
--   .from('prescriber_signatures')
--   .upload(`${userId}/signature.png`, file, { upsert: true })
