-- ============================================================================
-- MASTER MIGRATION FILE - Integração Catálogo 3.0 + Supabase
-- Date: 2026-02-24
-- ============================================================================
--
-- Este arquivo executa TODAS as migrations necessárias para:
-- - TAREFA A: Embalagem (package_quantity, package_unit)
-- - TAREFA E: Campos faltantes tutor/paciente
-- - TAREFA G: Prescriber profiles + Templates
--
-- INSTRUÇÕES:
-- 1. Conectar ao Supabase (SQL Editor ou psql)
-- 2. Executar este arquivo completo
-- 3. Verificar logs para confirmar sucesso
--
-- ============================================================================

\echo '=========================================='
\echo '🚀 INICIANDO MIGRATIONS - CATÁLOGO 3.0'
\echo '=========================================='

-- ============================================================================
-- MIGRATION 1: TAREFA A - Package columns
-- ============================================================================

\echo '📦 [1/4] Adicionando colunas de embalagem...'

ALTER TABLE public.medication_presentations
  ADD COLUMN IF NOT EXISTS package_quantity numeric NULL,
  ADD COLUMN IF NOT EXISTS package_unit text NULL;

-- Backfill from metadata
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

CREATE INDEX IF NOT EXISTS idx_medication_presentations_package
  ON public.medication_presentations (package_quantity, package_unit)
  WHERE package_quantity IS NOT NULL;

COMMENT ON COLUMN public.medication_presentations.package_quantity IS 'Quantidade de unidades na embalagem (ex: 10, 20, 100)';
COMMENT ON COLUMN public.medication_presentations.package_unit IS 'Unidade da embalagem (ex: comprimido, mL, cápsula)';

\echo '✅ [1/4] Colunas de embalagem adicionadas!'

-- ============================================================================
-- MIGRATION 2: TAREFA E - Missing tutor/patient fields
-- ============================================================================

\echo '👥 [2/4] Adicionando campos de tutor/paciente...'

-- Tutors: address_complement
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'tutors' AND column_name = 'address_complement'
  ) THEN
    ALTER TABLE public.tutors ADD COLUMN address_complement text NULL;
    COMMENT ON COLUMN public.tutors.address_complement IS 'Complemento do endereço';
  END IF;
END $$;

-- Patients: reproductive_condition, microchipped, microchip_number, anamnesis, notes
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'reproductive_condition') THEN
    ALTER TABLE public.patients ADD COLUMN reproductive_condition text NULL;
    COMMENT ON COLUMN public.patients.reproductive_condition IS 'Condição reprodutiva: Castrado | Inteiro | Sem dados';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'microchipped') THEN
    ALTER TABLE public.patients ADD COLUMN microchipped boolean DEFAULT false;
    COMMENT ON COLUMN public.patients.microchipped IS 'Possui microchip?';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'microchip_number') THEN
    ALTER TABLE public.patients ADD COLUMN microchip_number text NULL;
    COMMENT ON COLUMN public.patients.microchip_number IS 'Número do microchip';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'anamnesis') THEN
    ALTER TABLE public.patients ADD COLUMN anamnesis text NULL;
    COMMENT ON COLUMN public.patients.anamnesis IS 'Anamnese e histórico clínico';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'notes') THEN
    ALTER TABLE public.patients ADD COLUMN notes text NULL;
    COMMENT ON COLUMN public.patients.notes IS 'Observações gerais';
  END IF;
END $$;

-- Backfill reproductive_condition from neutered
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'neutered') THEN
    UPDATE public.patients
    SET reproductive_condition = CASE
      WHEN neutered = true THEN 'Castrado'
      WHEN neutered = false THEN 'Inteiro'
      ELSE 'Sem dados'
    END
    WHERE reproductive_condition IS NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_patients_microchipped ON public.patients(microchipped) WHERE microchipped = true;
CREATE INDEX IF NOT EXISTS idx_patients_reproductive_condition ON public.patients(reproductive_condition);

\echo '✅ [2/4] Campos de tutor/paciente adicionados!'

-- ============================================================================
-- MIGRATION 3: TAREFA G - Prescriber profiles
-- ============================================================================

\echo '👨‍⚕️ [3/4] Criando tabela prescriber_profiles...'

CREATE TABLE IF NOT EXISTS public.prescriber_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  crmv text,
  uf text,
  clinic_name text,
  phone text,
  address text,
  signature_url text,
  logo_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(clinic_id, user_id)
);

ALTER TABLE public.prescriber_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'prescriber_profiles' AND policyname = 'Users can manage their own prescriber profiles') THEN
    CREATE POLICY "Users can manage their own prescriber profiles"
      ON public.prescriber_profiles FOR ALL
      USING (clinic_id IN (SELECT clinic_id FROM public.clinic_memberships WHERE user_id = auth.uid()));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_prescriber_profiles_clinic_user ON public.prescriber_profiles(clinic_id, user_id);
CREATE INDEX IF NOT EXISTS idx_prescriber_profiles_clinic ON public.prescriber_profiles(clinic_id);

CREATE OR REPLACE FUNCTION update_prescriber_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_prescriber_profiles_updated_at ON public.prescriber_profiles;
CREATE TRIGGER trigger_update_prescriber_profiles_updated_at
  BEFORE UPDATE ON public.prescriber_profiles
  FOR EACH ROW EXECUTE FUNCTION update_prescriber_profiles_updated_at();

COMMENT ON TABLE public.prescriber_profiles IS 'Perfis de prescritores por clínica';

\echo '✅ [3/4] Tabela prescriber_profiles criada!'

-- ============================================================================
-- MIGRATION 4: TAREFA G - Prescription templates
-- ============================================================================

\echo '📄 [4/4] Criando tabela prescription_templates...'

CREATE TABLE IF NOT EXISTS public.prescription_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  template_json jsonb NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.prescription_templates ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'prescription_templates' AND policyname = 'Users can manage their own templates') THEN
    CREATE POLICY "Users can manage their own templates"
      ON public.prescription_templates FOR ALL
      USING (clinic_id IN (SELECT clinic_id FROM public.clinic_memberships WHERE user_id = auth.uid()));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_prescription_templates_clinic_user ON public.prescription_templates(clinic_id, user_id);
CREATE INDEX IF NOT EXISTS idx_prescription_templates_clinic ON public.prescription_templates(clinic_id);
CREATE INDEX IF NOT EXISTS idx_prescription_templates_default ON public.prescription_templates(clinic_id, is_default) WHERE is_default = true;

CREATE OR REPLACE FUNCTION update_prescription_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_prescription_templates_updated_at ON public.prescription_templates;
CREATE TRIGGER trigger_update_prescription_templates_updated_at
  BEFORE UPDATE ON public.prescription_templates
  FOR EACH ROW EXECUTE FUNCTION update_prescription_templates_updated_at();

CREATE OR REPLACE FUNCTION ensure_single_default_template()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE public.prescription_templates
    SET is_default = false
    WHERE clinic_id = NEW.clinic_id AND user_id = NEW.user_id AND id != NEW.id AND is_default = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_ensure_single_default_template ON public.prescription_templates;
CREATE TRIGGER trigger_ensure_single_default_template
  BEFORE INSERT OR UPDATE ON public.prescription_templates
  FOR EACH ROW WHEN (NEW.is_default = true)
  EXECUTE FUNCTION ensure_single_default_template();

COMMENT ON TABLE public.prescription_templates IS 'Templates de receita por clínica e usuário';

\echo '✅ [4/4] Tabela prescription_templates criada!'

-- ============================================================================
-- STORAGE BUCKET (executar manualmente se necessário)
-- ============================================================================

\echo ''
\echo '⚠️  ATENÇÃO: Storage bucket "prescriber_signatures" deve ser criado manualmente no Supabase Dashboard:'
\echo '   1. Ir para Storage > Create bucket'
\echo '   2. Nome: prescriber_signatures'
\echo '   3. Public: false'
\echo '   4. Aplicar policies do arquivo: 20260224_create_prescriber_signatures_bucket.sql'
\echo ''

-- ============================================================================
-- FINAL
-- ============================================================================

\echo '=========================================='
\echo '✅ MIGRATIONS COMPLETAS!'
\echo '=========================================='
\echo ''
\echo '📋 Resumo das alterações:'
\echo '  [✓] medication_presentations: package_quantity, package_unit'
\echo '  [✓] tutors: address_complement'
\echo '  [✓] patients: reproductive_condition, microchipped, microchip_number, anamnesis, notes'
\echo '  [✓] Tabela: prescriber_profiles'
\echo '  [✓] Tabela: prescription_templates'
\echo ''
\echo '🔧 Próximos passos:'
\echo '  1. Criar bucket "prescriber_signatures" no Supabase Dashboard'
\echo '  2. Atualizar código TypeScript (adapters, types)'
\echo '  3. Testar importação tutor/paciente'
\echo '  4. Implementar TAREFA C (Modal Nova Receita)'
\echo '  5. Implementar TAREFA D (Fluxo Plantão)'
\echo '  6. Implementar TAREFA F (Histórico de peso)'
\echo ''
