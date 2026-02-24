-- ============================================================================
-- Migration: Add missing fields to tutors and patients
-- Date: 2026-02-24
-- Purpose: TAREFA E - Importação completa tutor/paciente
-- ============================================================================

-- ============================================================================
-- STEP 1: Add missing fields to tutors
-- ============================================================================

-- Verificar se coluna já existe antes de adicionar
DO $$
BEGIN
  -- address_complement (complemento)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'tutors'
      AND column_name = 'address_complement'
  ) THEN
    ALTER TABLE public.tutors
      ADD COLUMN address_complement text NULL;

    COMMENT ON COLUMN public.tutors.address_complement IS 'Complemento do endereço (ex: Apto 123, Bloco B)';
  END IF;
END $$;

-- ============================================================================
-- STEP 2: Add missing fields to patients
-- ============================================================================

DO $$
BEGIN
  -- reproductive_condition (condição reprodutiva: Castrado | Inteiro | Sem dados)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'reproductive_condition'
  ) THEN
    ALTER TABLE public.patients
      ADD COLUMN reproductive_condition text NULL;

    COMMENT ON COLUMN public.patients.reproductive_condition IS 'Condição reprodutiva: Castrado | Inteiro | Sem dados';
  END IF;

  -- microchipped (possui microchip?)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'microchipped'
  ) THEN
    ALTER TABLE public.patients
      ADD COLUMN microchipped boolean DEFAULT false;

    COMMENT ON COLUMN public.patients.microchipped IS 'Possui microchip de identificação?';
  END IF;

  -- microchip_number (número do microchip)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'microchip_number'
  ) THEN
    ALTER TABLE public.patients
      ADD COLUMN microchip_number text NULL;

    COMMENT ON COLUMN public.patients.microchip_number IS 'Número do microchip';
  END IF;

  -- anamnesis (anamnese/histórico)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'anamnesis'
  ) THEN
    ALTER TABLE public.patients
      ADD COLUMN anamnesis text NULL;

    COMMENT ON COLUMN public.patients.anamnesis IS 'Anamnese e histórico clínico do paciente';
  END IF;

  -- notes já existe? Se não, adicionar
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.patients
      ADD COLUMN notes text NULL;

    COMMENT ON COLUMN public.patients.notes IS 'Observações gerais sobre o paciente';
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Backfill reproductive_condition from neutered (se existir)
-- ============================================================================

-- Migrar neutered (boolean) → reproductive_condition (text)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'patients'
      AND column_name = 'neutered'
  ) THEN
    UPDATE public.patients
    SET reproductive_condition = CASE
      WHEN neutered = true THEN 'Castrado'
      WHEN neutered = false THEN 'Inteiro'
      ELSE 'Sem dados'
    END
    WHERE reproductive_condition IS NULL;
  END IF;
END $$;

-- ============================================================================
-- STEP 4: Create indexes (optional, for performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_patients_microchipped
  ON public.patients(microchipped)
  WHERE microchipped = true;

CREATE INDEX IF NOT EXISTS idx_patients_reproductive_condition
  ON public.patients(reproductive_condition);

-- ============================================================================
-- COMMIT: Migration complete
-- ============================================================================

-- Resumo das colunas adicionadas:
-- tutors:
--   - address_complement (text)
--
-- patients:
--   - reproductive_condition (text)
--   - microchipped (boolean)
--   - microchip_number (text)
--   - anamnesis (text)
--   - notes (text) [se não existia]
