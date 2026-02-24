-- ============================================================================
-- Migration: Add package_quantity and package_unit to medication_presentations
-- Date: 2026-02-24
-- Purpose: TAREFA A - Embalagem não salva (Catálogo 3.0)
-- ============================================================================

-- STEP 1: Add columns to medication_presentations
ALTER TABLE public.medication_presentations
  ADD COLUMN IF NOT EXISTS package_quantity numeric NULL,
  ADD COLUMN IF NOT EXISTS package_unit text NULL;

-- STEP 2: Backfill from metadata (if exists)
UPDATE public.medication_presentations
SET
  package_quantity = CASE
    WHEN metadata->>'package_quantity' IS NOT NULL
      AND metadata->>'package_quantity' != ''
      AND package_quantity IS NULL
    THEN (metadata->>'package_quantity')::numeric
    ELSE package_quantity
  END,
  package_unit = CASE
    WHEN metadata->>'package_unit' IS NOT NULL
      AND metadata->>'package_unit' != ''
      AND package_unit IS NULL
    THEN metadata->>'package_unit'
    ELSE package_unit
  END
WHERE
  (package_quantity IS NULL AND metadata->>'package_quantity' IS NOT NULL)
  OR (package_unit IS NULL AND metadata->>'package_unit' IS NOT NULL);

-- STEP 3: Create index for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_medication_presentations_package
  ON public.medication_presentations (package_quantity, package_unit)
  WHERE package_quantity IS NOT NULL;

-- ============================================================================
-- COMMIT: Migration complete
-- ============================================================================

COMMENT ON COLUMN public.medication_presentations.package_quantity IS 'Quantidade de unidades na embalagem (ex: 10, 20, 100)';
COMMENT ON COLUMN public.medication_presentations.package_unit IS 'Unidade da embalagem (ex: comprimido, mL, cápsula)';
