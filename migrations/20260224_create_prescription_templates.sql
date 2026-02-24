-- ============================================================================
-- Migration: Create prescription_templates table
-- Date: 2026-02-24
-- Purpose: TAREFA G - Templates de Receita no Supabase (sincroniza entre dispositivos)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.prescription_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Template data
  name text NOT NULL,
  template_json jsonb NOT NULL,
  is_default boolean DEFAULT false,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================

ALTER TABLE public.prescription_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own templates"
  ON public.prescription_templates
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

CREATE INDEX idx_prescription_templates_clinic_user
  ON public.prescription_templates(clinic_id, user_id);

CREATE INDEX idx_prescription_templates_clinic
  ON public.prescription_templates(clinic_id);

CREATE INDEX idx_prescription_templates_default
  ON public.prescription_templates(clinic_id, is_default)
  WHERE is_default = true;

-- ============================================================================
-- Trigger para atualizar updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_prescription_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_prescription_templates_updated_at
  BEFORE UPDATE ON public.prescription_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_prescription_templates_updated_at();

-- ============================================================================
-- Trigger para garantir apenas 1 template padrão por usuário
-- ============================================================================

CREATE OR REPLACE FUNCTION ensure_single_default_template()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE public.prescription_templates
    SET is_default = false
    WHERE clinic_id = NEW.clinic_id
      AND user_id = NEW.user_id
      AND id != NEW.id
      AND is_default = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ensure_single_default_template
  BEFORE INSERT OR UPDATE ON public.prescription_templates
  FOR EACH ROW
  WHEN (NEW.is_default = true)
  EXECUTE FUNCTION ensure_single_default_template();

-- ============================================================================
-- Comments
-- ============================================================================

COMMENT ON TABLE public.prescription_templates IS 'Templates de receita por clínica e usuário';
COMMENT ON COLUMN public.prescription_templates.name IS 'Nome do template (ex: "Padrão", "Controle Especial")';
COMMENT ON COLUMN public.prescription_templates.template_json IS 'Configuração do template (headers, footers, etc)';
COMMENT ON COLUMN public.prescription_templates.is_default IS 'Se é o template padrão do usuário (apenas 1 por usuário)';

-- ============================================================================
-- COMMIT: Migration complete
-- ============================================================================
