-- ============================================================================
-- Migration: Create prescriber_profiles table
-- Date: 2026-02-24
-- Purpose: TAREFA G - Configurar Médico no Supabase (sincroniza entre dispositivos)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.prescriber_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Dados do prescritor
  full_name text NOT NULL,
  crmv text,
  uf text,
  clinic_name text,
  phone text,
  address text,

  -- Assinatura e logo (URLs do Storage bucket)
  signature_url text,
  logo_url text,

  -- Metadata (outros campos não estruturados)
  metadata jsonb DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(clinic_id, user_id)
);

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================

ALTER TABLE public.prescriber_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prescriber profiles"
  ON public.prescriber_profiles
  FOR ALL
  USING (
    clinic_id IN (
      SELECT clinic_id FROM public.clinic_memberships
      WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX idx_prescriber_profiles_clinic_user
  ON public.prescriber_profiles(clinic_id, user_id);

CREATE INDEX idx_prescriber_profiles_clinic
  ON public.prescriber_profiles(clinic_id);

-- ============================================================================
-- Trigger para atualizar updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_prescriber_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_prescriber_profiles_updated_at
  BEFORE UPDATE ON public.prescriber_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_prescriber_profiles_updated_at();

-- ============================================================================
-- Comments
-- ============================================================================

COMMENT ON TABLE public.prescriber_profiles IS 'Perfis de prescritores (médicos veterinários) por clínica';
COMMENT ON COLUMN public.prescriber_profiles.full_name IS 'Nome completo do prescritor';
COMMENT ON COLUMN public.prescriber_profiles.crmv IS 'Número do CRMV (sem estado)';
COMMENT ON COLUMN public.prescriber_profiles.uf IS 'Estado do CRMV (ex: SP, RJ, MG)';
COMMENT ON COLUMN public.prescriber_profiles.signature_url IS 'URL da assinatura no Storage (bucket: prescriber_signatures)';
COMMENT ON COLUMN public.prescriber_profiles.logo_url IS 'URL do logo da clínica no Storage';

-- ============================================================================
-- COMMIT: Migration complete
-- ============================================================================
