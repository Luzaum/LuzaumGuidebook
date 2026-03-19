-- Migration: Enrich medication_recommended_doses with range and structured clinical fields
-- Context: Catalog 3.0 dose import fix — support dose ranges, frequency ranges,
-- indication, duration, and calculator defaults.

-- 1. Add new columns (all nullable for backward compat)
ALTER TABLE public.medication_recommended_doses
  ADD COLUMN IF NOT EXISTS dose_max numeric,
  ADD COLUMN IF NOT EXISTS per_weight_unit text,
  ADD COLUMN IF NOT EXISTS indication text,
  ADD COLUMN IF NOT EXISTS frequency_min integer,
  ADD COLUMN IF NOT EXISTS frequency_max integer,
  ADD COLUMN IF NOT EXISTS frequency_mode text DEFAULT 'times_per_day',
  ADD COLUMN IF NOT EXISTS frequency_text text,
  ADD COLUMN IF NOT EXISTS duration text,
  ADD COLUMN IF NOT EXISTS calculator_default_dose numeric,
  ADD COLUMN IF NOT EXISTS calculator_default_frequency integer;

-- 2. Semantic comments
COMMENT ON COLUMN public.medication_recommended_doses.dose_value IS 'Dose mínima (ou fixa se dose_max IS NULL)';
COMMENT ON COLUMN public.medication_recommended_doses.dose_max IS 'Dose máxima da faixa (NULL = dose fixa sem faixa)';
COMMENT ON COLUMN public.medication_recommended_doses.per_weight_unit IS 'Unidade de peso (kg, lb) — NULL se dose não é por peso';
COMMENT ON COLUMN public.medication_recommended_doses.indication IS 'Indicação clínica (ex: Analgesia crônica)';
COMMENT ON COLUMN public.medication_recommended_doses.frequency_min IS 'Frequência mínima (vezes/dia) — NULL se fixa';
COMMENT ON COLUMN public.medication_recommended_doses.frequency_max IS 'Frequência máxima (vezes/dia) — NULL se fixa';
COMMENT ON COLUMN public.medication_recommended_doses.frequency_mode IS 'times_per_day | every_x_hours | custom';
COMMENT ON COLUMN public.medication_recommended_doses.frequency_text IS 'Texto livre de frequência (ex: 2 a 3 vezes ao dia)';
COMMENT ON COLUMN public.medication_recommended_doses.duration IS 'Duração recomendada (ex: 7 dias, conforme resposta clínica)';
COMMENT ON COLUMN public.medication_recommended_doses.calculator_default_dose IS 'Valor default para calculadora de dose';
COMMENT ON COLUMN public.medication_recommended_doses.calculator_default_frequency IS 'Frequência default para calculadora';

-- 3. Check constraint for frequency_mode
ALTER TABLE public.medication_recommended_doses
  ADD CONSTRAINT mrd_frequency_mode_check
  CHECK (frequency_mode IS NULL OR frequency_mode IN ('times_per_day', 'every_x_hours', 'custom'));
