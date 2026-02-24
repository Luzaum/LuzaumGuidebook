-- TABELA DE DOSES RECOMENDADAS (V8 - FIX MEMBERSHIPS)
-- Esta tabela armazena protocolos de dosagem sugeridos pela clínica para cada medicamento.

CREATE TABLE IF NOT EXISTS public.medication_recommended_doses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
    
    species TEXT NOT NULL, -- 'cão' ou 'gato'
    route TEXT NOT NULL, -- 'VO', 'IV', 'IM', 'SC', etc
    
    dose_value NUMERIC NOT NULL DEFAULT 0,
    dose_unit TEXT NOT NULL DEFAULT 'mg/kg',
    
    frequency TEXT, -- '1x ao dia', '2x ao dia', etc
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_rec_doses_clinic_med ON public.medication_recommended_doses(clinic_id, medication_id);

-- Habilitar RLS
ALTER TABLE public.medication_recommended_doses ENABLE ROW LEVEL SECURITY;

-- POLICIES (Usando a função is_member_of_clinic para evitar dependência de nome de tabela de memberships)
-- SELECT: Membros da clínica podem ver as doses
CREATE POLICY "Membros da clínica podem ver doses recomendadas"
ON public.medication_recommended_doses FOR SELECT
TO authenticated
USING ( public.is_member_of_clinic(clinic_id) );

-- INSERT: Membros da clínica podem criar
CREATE POLICY "Membros da clínica podem criar doses recomendadas"
ON public.medication_recommended_doses FOR INSERT
TO authenticated
WITH CHECK ( public.is_member_of_clinic(clinic_id) );

-- UPDATE: Membros da clínica podem atualizar
CREATE POLICY "Membros da clínica podem atualizar doses recomendadas"
ON public.medication_recommended_doses FOR UPDATE
TO authenticated
USING ( public.is_member_of_clinic(clinic_id) );

-- DELETE: Membros da clínica podem deletar
CREATE POLICY "Membros da clínica podem deletar doses recomendadas"
ON public.medication_recommended_doses FOR DELETE
TO authenticated
USING ( public.is_member_of_clinic(clinic_id) );

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_medication_recommended_doses_updated_at ON public.medication_recommended_doses;
CREATE TRIGGER tr_medication_recommended_doses_updated_at
    BEFORE UPDATE ON public.medication_recommended_doses
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

COMMENT ON TABLE public.medication_recommended_doses IS 'Protocolos de dosagem sugeridos pela clínica para medicamentos do catálogo.';
