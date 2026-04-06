-- ============================================================
-- Fase 3A: colunas canônicas de administração nas doses recomendadas
-- Fase 3B: snapshot canônico nos protocolos (metadata jsonb)
-- ============================================================

-- ── Fase 3A: medication_recommended_doses ───────────────────

ALTER TABLE public.medication_recommended_doses
  ADD COLUMN IF NOT EXISTS administration_basis    text,
  ADD COLUMN IF NOT EXISTS administration_amount   numeric,
  ADD COLUMN IF NOT EXISTS administration_unit     text,
  ADD COLUMN IF NOT EXISTS administration_target   text,
  ADD COLUMN IF NOT EXISTS is_single_dose          boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS repeat_periodically     boolean NOT NULL DEFAULT false;

-- Constraint: valores canônicos (per_animal / per_application_site são os nomes definitivos)
ALTER TABLE public.medication_recommended_doses
  DROP CONSTRAINT IF EXISTS mrd_administration_basis_check;

ALTER TABLE public.medication_recommended_doses
  ADD CONSTRAINT mrd_administration_basis_check
  CHECK (
    administration_basis IS NULL
    OR administration_basis IN (
      'weight_based',
      'weight_band',
      'per_animal',
      'per_application_site'
    )
  );

COMMENT ON COLUMN public.medication_recommended_doses.administration_basis    IS 'weight_based | weight_band | per_animal | per_application_site';
COMMENT ON COLUMN public.medication_recommended_doses.administration_amount   IS 'Quantidade por unidade/sítio (ex: 1, 4)';
COMMENT ON COLUMN public.medication_recommended_doses.administration_unit     IS 'Unidade de administração (ex: comprimido, gota, borrifada)';
COMMENT ON COLUMN public.medication_recommended_doses.administration_target   IS 'Alvo de aplicação (ex: por animal, em cada ouvido)';
COMMENT ON COLUMN public.medication_recommended_doses.is_single_dose         IS 'true quando a posologia é dose única (inclui periódica)';
COMMENT ON COLUMN public.medication_recommended_doses.repeat_periodically    IS 'true quando dose única se repete periodicamente';

-- ── Fase 3A: global_medication_recommended_doses ────────────

ALTER TABLE public.global_medication_recommended_doses
  ADD COLUMN IF NOT EXISTS administration_basis    text,
  ADD COLUMN IF NOT EXISTS administration_amount   numeric,
  ADD COLUMN IF NOT EXISTS administration_unit     text,
  ADD COLUMN IF NOT EXISTS administration_target   text,
  ADD COLUMN IF NOT EXISTS is_single_dose          boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS repeat_periodically     boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.global_medication_recommended_doses.administration_basis    IS 'weight_based | weight_band | per_animal | per_application_site';
COMMENT ON COLUMN public.global_medication_recommended_doses.administration_amount   IS 'Quantidade por unidade/sítio';
COMMENT ON COLUMN public.global_medication_recommended_doses.administration_unit     IS 'Unidade de administração';
COMMENT ON COLUMN public.global_medication_recommended_doses.administration_target   IS 'Alvo de aplicação';
COMMENT ON COLUMN public.global_medication_recommended_doses.is_single_dose         IS 'true quando posologia é dose única';
COMMENT ON COLUMN public.global_medication_recommended_doses.repeat_periodically    IS 'true quando dose única repete periodicamente';

-- ── Fase 3B: protocol_medications — snapshot canônico ───────

ALTER TABLE public.protocol_medications
  ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.protocol_medications.metadata IS 'Snapshot canônico do regime: is_single_dose, repeat_periodically, repeat_every_value/unit, administration_basis/amount/unit/target, duration_mode, etc.';
