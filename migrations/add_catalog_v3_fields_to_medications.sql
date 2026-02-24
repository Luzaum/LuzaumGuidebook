-- Migration: Add Catálogo 3.0 fields to medications
-- Purpose: Support species_targets, is_active, and metadata
-- Date: 2026-02-24

-- Add species_targets (array of strings: 'canine', 'feline', etc.)
ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS species_targets text[] NULL;

-- Add is_active flag
ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Add metadata for flexible future fields
ALTER TABLE public.medications
ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_medications_species_targets
ON public.medications USING gin (species_targets);

CREATE INDEX IF NOT EXISTS idx_medications_is_active
ON public.medications (is_active);

CREATE INDEX IF NOT EXISTS idx_medications_metadata
ON public.medications USING gin (metadata);

-- Add comments
COMMENT ON COLUMN public.medications.species_targets IS
'Array of target species: canine, feline, equine, bovine, etc.';

COMMENT ON COLUMN public.medications.is_active IS
'Whether this medication is active in the catalog. Soft delete alternative.';

COMMENT ON COLUMN public.medications.metadata IS
'Flexible metadata storage for fields like active_ingredient, tags, administration_routes, etc.';
