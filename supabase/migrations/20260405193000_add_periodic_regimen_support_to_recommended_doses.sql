-- Support periodic regimens for standard medications
-- Examples: dose única, repetir a cada 1 mês, 3 meses, 12 semanas.

ALTER TABLE public.medication_recommended_doses
  ADD COLUMN IF NOT EXISTS recurrence_value integer,
  ADD COLUMN IF NOT EXISTS recurrence_unit text;

ALTER TABLE public.global_medication_recommended_doses
  ADD COLUMN IF NOT EXISTS recurrence_value integer,
  ADD COLUMN IF NOT EXISTS recurrence_unit text;

ALTER TABLE public.medication_recommended_doses
  DROP CONSTRAINT IF EXISTS mrd_frequency_mode_check;

ALTER TABLE public.medication_recommended_doses
  ADD CONSTRAINT mrd_frequency_mode_check
  CHECK (
    frequency_mode IS NULL
    OR frequency_mode IN (
      'times_per_day',
      'every_x_hours',
      'custom',
      'single_dose',
      'repeat_interval'
    )
  );

COMMENT ON COLUMN public.medication_recommended_doses.recurrence_value IS 'Valor do intervalo de repetição para esquemas periódicos';
COMMENT ON COLUMN public.medication_recommended_doses.recurrence_unit IS 'Unidade do intervalo de repetição: dias | semanas | meses';
COMMENT ON COLUMN public.global_medication_recommended_doses.recurrence_value IS 'Valor do intervalo de repetição para esquemas periódicos';
COMMENT ON COLUMN public.global_medication_recommended_doses.recurrence_unit IS 'Unidade do intervalo de repetição: dias | semanas | meses';
