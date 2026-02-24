-- ENFORCE CASCADE DELETE FOR CATALOG 3.0
-- Este script garante que ao excluir um medicamento, as apresentações e doses indicadas sejam removidas automaticamente.

-- 1. Apresentações
ALTER TABLE public.medication_presentations
DROP CONSTRAINT IF EXISTS fk_medication_presentations_medication_id,
DROP CONSTRAINT IF EXISTS medication_presentations_medication_id_fkey;

ALTER TABLE public.medication_presentations
ADD CONSTRAINT medication_presentations_medication_id_fkey
FOREIGN KEY (medication_id)
REFERENCES public.medications(id)
ON DELETE CASCADE;

-- 2. Doses Recomendadas
ALTER TABLE public.medication_recommended_doses
DROP CONSTRAINT IF EXISTS medication_recommended_doses_medication_id_fkey;

ALTER TABLE public.medication_recommended_doses
ADD CONSTRAINT medication_recommended_doses_medication_id_fkey
FOREIGN KEY (medication_id)
REFERENCES public.medications(id)
ON DELETE CASCADE;

COMMENT ON CONSTRAINT medication_presentations_medication_id_fkey ON public.medication_presentations IS 'Remove apresentações automaticamente quando o medicamento é excluído.';
COMMENT ON CONSTRAINT medication_recommended_doses_medication_id_fkey ON public.medication_recommended_doses IS 'Remove doses recomendadas automaticamente quando o medicamento é excluído.';
