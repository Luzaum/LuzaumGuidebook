insert into public.consensus_documents (
  slug,
  title,
  description,
  organization,
  year,
  category,
  species,
  file_path,
  file_url,
  is_published,
  related_disease_slugs,
  related_medication_slugs
)
values
  (
    'leishmaniose-brasileiro-2020',
    'Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina',
    'Atualizacao das diretrizes para diagnostico, estadiamento e tratamento da leishmaniose visceral canina no Brasil.',
    'Brasileish',
    2020,
    'infecciosas',
    'dog',
    'external/Diretrizes-Brasileish-2020.pdf',
    'https://www.brasileish.com.br/wp-content/uploads/2020/12/Diretrizes-Brasileish-2020.pdf',
    true,
    '["leishmaniose-visceral-canina"]'::jsonb,
    '["miltefosina","alopurinol"]'::jsonb
  ),
  (
    'iris-drc-2023',
    'IRIS Staging of CKD',
    'Diretrizes internacionais para estadiamento e acompanhamento da doenca renal cronica em caes e gatos.',
    'International Renal Interest Society',
    2023,
    'nefrologia',
    'both',
    'external/IRIS_Staging_of_CKD_modified_2023.pdf',
    'http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf',
    true,
    '["doenca-renal-cronica"]'::jsonb,
    '["amlodipina","maropitant"]'::jsonb
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  organization = excluded.organization,
  year = excluded.year,
  category = excluded.category,
  species = excluded.species,
  file_path = excluded.file_path,
  file_url = excluded.file_url,
  is_published = excluded.is_published,
  related_disease_slugs = excluded.related_disease_slugs,
  related_medication_slugs = excluded.related_medication_slugs;

insert into public.consensus_document_details (
  consensus_document_id,
  summary_text,
  key_points_text,
  practical_application_text,
  app_notes_text,
  "references"
)
select
  c.id,
  'Documento-base para diagnostico, estadiamento e tratamento da LVC no Brasil.',
  E'- Estrutura estadiamento clinico e laboratorial\n- Reforca avaliacao renal e proteinuria antes da terapia\n- Base pratica para miltefosina e alopurinol',
  'Usar como referencia editorial para estratificar gravidade, alinhar exames e revisar metas de tratamento e seguimento da leishmaniose visceral canina.',
  'Miltefosina entra como leishmanicida aprovado, mas a conduta depende do estagio clinico e da avaliacao renal.',
  '[{"citationText":"Brasileish. Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina (2020).","sourceType":"Consenso","url":"https://www.brasileish.com.br/wp-content/uploads/2020/12/Diretrizes-Brasileish-2020.pdf","notes":"Documento-base para diagnostico, estadiamento e tratamento da LVC no Brasil."}]'::jsonb
from public.consensus_documents c
where c.slug = 'leishmaniose-brasileiro-2020'
on conflict (consensus_document_id) do update set
  summary_text = excluded.summary_text,
  key_points_text = excluded.key_points_text,
  practical_application_text = excluded.practical_application_text,
  app_notes_text = excluded.app_notes_text,
  "references" = excluded."references";

insert into public.consensus_document_details (
  consensus_document_id,
  summary_text,
  key_points_text,
  practical_application_text,
  app_notes_text,
  "references"
)
select
  c.id,
  'Referencia central para estadiamento, subestadiamento e monitorizacao da doenca renal cronica em caes e gatos.',
  E'- Estadiamento por creatinina ou SDMA em contexto adequado\n- Subestadiar por proteinuria e pressao arterial\n- Reavaliar sempre hidratacao e estabilidade clinica',
  'Aplicar no atendimento para classificar a DRC, definir seguimento e organizar prioridades como dieta renal, controle pressorico e monitorizacao de proteinuria.',
  'Evitar classificar estagio definitivo em paciente desidratado ou com agudizacao sem estabilizacao clinica.',
  '[{"citationText":"International Renal Interest Society (IRIS). IRIS Staging of CKD modified 2023.","sourceType":"Guideline","url":"http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf","notes":"Estadiamento, subestadiamento e monitorizacao da doenca renal cronica em caes e gatos."}]'::jsonb
from public.consensus_documents c
where c.slug = 'iris-drc-2023'
on conflict (consensus_document_id) do update set
  summary_text = excluded.summary_text,
  key_points_text = excluded.key_points_text,
  practical_application_text = excluded.practical_application_text,
  app_notes_text = excluded.app_notes_text,
  "references" = excluded."references";
