-- Migration: Add PDF and document kind columns to prescriptions table
-- Date: 2026-02-25
-- Purpose: Persistência de receitas emitidas com PDF baixável e histórico

ALTER TABLE public.prescriptions
ADD COLUMN IF NOT EXISTS pdf_path text,
ADD COLUMN IF NOT EXISTS pdf_url text,
ADD COLUMN IF NOT EXISTS document_kind text,
ADD COLUMN IF NOT EXISTS storage_bucket text DEFAULT 'receituario-media';

COMMENT ON COLUMN public.prescriptions.pdf_path IS 'Caminho do arquivo PDF no storage (bucket)';
COMMENT ON COLUMN public.prescriptions.pdf_url IS 'URL pública do PDF (se disponível)';
COMMENT ON COLUMN public.prescriptions.document_kind IS 'Tipo de documento: standard ou special-control';
COMMENT ON COLUMN public.prescriptions.storage_bucket IS 'Bucket do Supabase Storage onde o PDF está salvo';