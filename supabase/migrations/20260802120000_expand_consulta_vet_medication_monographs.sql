alter table if exists public.consulta_vet_medications
  add column if not exists plain_language_summary text;

comment on column public.consulta_vet_medications.plain_language_summary is
  'Explicação curta e acessível do efeito do medicamento, exibida antes do mecanismo técnico.';

comment on column public.consulta_vet_medications.doses is
  'Regimes clínicos em JSON. Pode incluir diseaseSlugs, clinicalContext, monitoring, maximumDose, referenceIds e evidenceLevel.';

comment on column public.consulta_vet_medications.presentations is
  'Apresentações em JSON. Pode incluir commercialProductSlug para vínculo com a seção Comerciais.';
