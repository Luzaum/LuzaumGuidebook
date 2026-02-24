-- ============================================================================
-- CATÁLOGO 3.0 - MIGRATION COMPLETA
-- Execute este script completo no Supabase SQL Editor
-- Data: 2026-02-24
-- ============================================================================

-- ============================================================================
-- PARTE 1: Adicionar metadata em medication_presentations
-- ============================================================================

-- Add metadata column to medication_presentations
ALTER TABLE public.medication_presentations
ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Add index for better performance on metadata queries
CREATE INDEX IF NOT EXISTS idx_medication_presentations_metadata
ON public.medication_presentations USING gin (metadata);

-- Add comment for documentation
COMMENT ON COLUMN public.medication_presentations.metadata IS
'Flexible metadata storage for additional fields like manufacturer, package_quantity, package_unit, administration_routes, palatable, etc. Allows UI evolution without schema migrations.';

-- ============================================================================
-- PARTE 2: Adicionar campos Catálogo 3.0 em medications
-- ============================================================================

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

-- ============================================================================
-- VERIFICAÇÃO: Listar colunas criadas
-- ============================================================================

-- Verificar colunas em medications
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'medications'
  AND column_name IN ('species_targets', 'is_active', 'metadata')
ORDER BY column_name;

-- Verificar colunas em medication_presentations
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'medication_presentations'
  AND column_name = 'metadata'
ORDER BY column_name;

-- ============================================================================
-- VERIFICAÇÃO: Listar índices criados
-- ============================================================================

SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('medications', 'medication_presentations')
  AND indexname LIKE '%metadata%' OR indexname LIKE '%species_targets%' OR indexname LIKE '%is_active%'
ORDER BY tablename, indexname;

-- ============================================================================
-- ✅ MIGRATION COMPLETA!
-- ============================================================================
-- Próximos passos:
-- 1. Verificar resultados das queries de verificação acima
-- 2. Testar Catálogo 3.0 no front-end
-- 3. Monitorar logs no console para warnings de whitelist
-- ============================================================================
