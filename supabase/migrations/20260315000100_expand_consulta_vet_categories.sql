-- Expandir taxonomia canonica de categorias do Consulta VET
-- Mantem compatibilidade com registros existentes via UPSERT por slug

INSERT INTO consulta_vet_categories (slug, title, description, sort_order, is_published)
VALUES
  ('infectologia', 'Infectologia', 'Doencas infecciosas e agentes transmissiveis', 10, true),
  ('parasitologia', 'Parasitologia', 'Doencas parasitarias e ecto/endoparasitas', 20, true),
  ('dermatologia', 'Dermatologia', 'Pele, anexos cutaneos e doencas alergicas cutaneas', 30, true),
  ('otologia', 'Otologia', 'Doencas do ouvido externo, medio e interno', 40, true),
  ('oftalmologia', 'Oftalmologia', 'Doencas oculares e anexos oftalmicos', 50, true),
  ('neurologia', 'Neurologia', 'Sistema nervoso central, periferico e neuromuscular', 60, true),
  ('ortopedia', 'Ortopedia', 'Sistema musculoesqueletico, dor ortopedica e claudicacao', 70, true),
  ('cirurgia-ortopedica-traumatologia', 'Cirurgia ortopedica / Traumatologia', 'Fraturas, estabilizacoes e cirurgia ortopedica', 80, true),
  ('cirurgia-tecidos-moles', 'Cirurgia de tecidos moles', 'Procedimentos cirurgicos de cavidade, pele e anexos', 90, true),
  ('cirurgia-neurologica', 'Cirurgia neurologica', 'Procedimentos neurocirurgicos e de coluna', 100, true),
  ('cardiologia', 'Cardiologia', 'Doencas cardiovasculares e hemodinamica', 110, true),
  ('respiratorio', 'Respiratorio', 'Doencas de vias aereas e pulmoes', 120, true),
  ('gastroenterologia', 'Gastroenterologia', 'Trato digestivo e motilidade gastrointestinal', 130, true),
  ('hepatologia-pancreas', 'Hepatologia / Pancreas', 'Figado, vias biliares e pancreas', 140, true),
  ('nefrologia-urologia', 'Nefrologia / Urologia', 'Rins, trato urinario e disturbios renais', 150, true),
  ('endocrinologia', 'Endocrinologia', 'Doencas hormonais e metabolicas', 160, true),
  ('hematologia', 'Hematologia', 'Sangue, hemostasia e orgaos hematopoieticos', 170, true),
  ('oncologia', 'Oncologia', 'Neoplasias, estadiamento e tratamento oncologico', 180, true),
  ('imunologia', 'Imunologia', 'Doencas imunomediadas, inflamatorias e autoimunes', 190, true),
  ('reproducao-neonatologia', 'Reproducao / Neonatologia', 'Disturbios reprodutivos, gestacao e neonatos', 200, true),
  ('anestesia-dor', 'Dor / Anestesia / Analgesia', 'Sedacao, anestesia, analgesia e manejo perioperatorio', 210, true),
  ('emergencia-intensivismo', 'Emergencia / Intensivismo', 'Cuidados criticos e suporte avancado de vida', 220, true),
  ('fluidoterapia-disturbios-hidroeletroliticos', 'Fluidoterapia / Disturbios hidroeletroliticos', 'Manejo de fluidos, eletrolitos e equilibrio acido-base', 230, true),
  ('diagnostico-por-imagem', 'Diagnostico por imagem', 'Radiologia, ultrassonografia, tomografia e ressonancia', 240, true),
  ('odontologia-odontostomatologia', 'Odontologia / Odontostomatologia', 'Cavidade oral, dentes e procedimentos odontologicos', 250, true),
  ('toxicologia', 'Toxicologia', 'Intoxicacoes, exposicoes e descontaminacao', 260, true),
  ('comportamento', 'Comportamento', 'Medicina comportamental e modulacao de ansiedade', 270, true),
  ('nutricao-clinica', 'Nutricao clinica', 'Suporte nutricional e dietoterapia', 280, true),
  ('medicina-preventiva', 'Medicina preventiva', 'Prevencao, vacinacao e protocolos de rastreio', 290, true),
  ('cuidados-paliativos', 'Cuidados paliativos', 'Conforto, manejo de sintomas e qualidade de vida', 300, true),
  ('clinica-medica', 'Clinica medica', 'Topicos gerais em clinica de caes e gatos', 310, true),
  ('procedimentos', 'Procedimentos', 'Procedimentos clinicos e tecnico-operacionais', 320, true),
  ('outros', 'Outros', 'Temas transversais, miscelanea e categorias ainda nao classificadas', 999, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = true;
