-- Migration para garantir base canônica de Categorias no módulo Consulta VET
-- Esta migration usa UPSERT (ON CONFLICT) para não duplicar caso já existam via UI

INSERT INTO consulta_vet_categories (slug, title, description, sort_order, is_published)
VALUES 
  ('infectologia', 'Infectologia', 'Doenças infecciosas e parasitárias', 10, true),
  ('hematologia', 'Hematologia', 'Doenças do sangue e órgãos hematopoiéticos', 20, true),
  ('gastroenterologia', 'Gastroenterologia', 'Distúrbios do trato digestivo e anexos', 30, true),
  ('neurologia', 'Neurologia', 'Distúrbios do sistema nervoso central e periférico', 40, true),
  ('respiratorio', 'Respiratório', 'Distúrbios do trato respiratório superior e inferior', 50, true),
  ('cardiologia', 'Cardiologia', 'Doenças cardiovasculares', 60, true),
  ('endocrinologia', 'Endocrinologia', 'Distúrbios hormonais e metabólicos', 70, true),
  ('nefrologia-urologia', 'Nefrologia / Urologia', 'Distúrbios renais e do trato urinário', 80, true),
  ('hepatologia-pancreas', 'Hepatologia / Pâncreas', 'Doenças hepáticas, biliares e pancreáticas', 90, true),
  ('emergencia-intensivismo', 'Emergência / Intensivismo', 'Cuidados críticos e suporte avançado de vida', 100, true),
  ('anestesia-dor', 'Dor / Anestesia / Analgesia', 'Manejo da dor, anestesia e sedação', 110, true),
  ('reproducao-neonatologia', 'Reprodução / Neonatologia', 'Distúrbios reprodutivos e cuidados neonatais', 120, true),
  ('imunologia', 'Imunologia', 'Doenças imunomediadas e autoimunes', 130, true),
  ('oncologia', 'Oncologia', 'Diagnóstico e tratamento de neoplasias', 140, true),
  ('procedimentos', 'Procedimentos', 'Procedimentos clínicos e cirúrgicos', 150, true),
  ('fluidoterapia-disturbios-hidroeletroliticos', 'Fluidoterapia / Distúrbios hidroeletrolíticos', 'Manejo de fluidos e eletrólitos', 160, true),
  ('clinica-medica', 'Clínica médica', 'Tópicos gerais em clínica de pequenos animais', 170, true),
  ('outros', 'Outros', 'Miscelânea e temas diversos', 999, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = COALESCE(consulta_vet_categories.description, EXCLUDED.description),
  sort_order = COALESCE(consulta_vet_categories.sort_order, EXCLUDED.sort_order),
  is_published = true;
