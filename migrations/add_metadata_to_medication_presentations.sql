-- Migration: Add metadata column to medication_presentations
-- Purpose: Support Catálogo 3.0 with flexible metadata storage
-- Date: 2026-02-24

-- Add metadata column to medication_presentations
ALTER TABLE public.medication_presentations
ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Add index for better performance on metadata queries
CREATE INDEX IF NOT EXISTS idx_medication_presentations_metadata
ON public.medication_presentations USING gin (metadata);

-- Add comment for documentation
COMMENT ON COLUMN public.medication_presentations.metadata IS
'Flexible metadata storage for additional fields like manufacturer, package_quantity, package_unit, administration_routes, palatable, etc. Allows UI evolution without schema migrations.';
