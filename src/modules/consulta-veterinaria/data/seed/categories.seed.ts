import type { Category } from '../../types/category'

export const categoriesSeed: Category[] = [
  { id: 'cat-infectologia', slug: 'infectologia', title: 'Infectologia', description: 'Doenças infecciosas, vacinação e biossegurança.', icon: 'shield-plus', sortOrder: 1 },
  { id: 'cat-hematologia', slug: 'hematologia', title: 'Hematologia', description: 'Hemograma, coagulopatias e distúrbios hematológicos.', icon: 'droplets', sortOrder: 2 },
  { id: 'cat-gastro', slug: 'gastroenterologia', title: 'Gastroenterologia', description: 'TGI, vômito, diarreia e suporte nutricional.', icon: 'pill', sortOrder: 3 },
  { id: 'cat-neuro', slug: 'neurologia', title: 'Neurologia', description: 'SNC, convulsões e raciocínio neurológico.', icon: 'brain', sortOrder: 4 },
  { id: 'cat-resp', slug: 'respiratorio', title: 'Respiratório', description: 'Doença respiratória e imagem torácica.', icon: 'stethoscope', sortOrder: 5 },
  { id: 'cat-cardio', slug: 'cardiologia', title: 'Cardiologia', description: 'Hemodinâmica e doença cardíaca.', icon: 'heart-pulse', sortOrder: 6 },
  { id: 'cat-endo', slug: 'endocrinologia', title: 'Endocrinologia', description: 'Hormônios, metabolismo e diabetes.', icon: 'activity', sortOrder: 7 },
  { id: 'cat-nefro', slug: 'nefrologia-urologia', title: 'Nefrologia / Urologia', description: 'Rim, trato urinário e distúrbios hidroeletrolíticos.', icon: 'droplet', sortOrder: 8 },
  { id: 'cat-hepato', slug: 'hepatologia-pancreas', title: 'Hepatologia / Pâncreas', description: 'Fígado, vias biliares e pâncreas.', icon: 'syringe', sortOrder: 9 },
  { id: 'cat-emerg', slug: 'emergencia-intensivismo', title: 'Emergência / Intensivismo', description: 'Suporte inicial, choque e UTI.', icon: 'zap', sortOrder: 10 },
  { id: 'cat-anestesia', slug: 'anestesia-dor', title: 'Dor / Anestesia / Analgesia', description: 'Analgésicos, monitorização e planos perioperatórios.', icon: 'shield-alert', sortOrder: 11 },
  { id: 'cat-repro', slug: 'reproducao-neonatologia', title: 'Reprodução / Neonatologia', description: 'Gestação, parto e neonatos.', icon: 'baby', sortOrder: 12 },
  { id: 'cat-imuno', slug: 'imunologia', title: 'Imunologia', description: 'Doenças imunomediadas e imunomodulação.', icon: 'shield', sortOrder: 13 },
  { id: 'cat-onco', slug: 'oncologia', title: 'Oncologia', description: 'Massas, estadiamento e terapias antineoplásicas.', icon: 'microscope', sortOrder: 14 },
  { id: 'cat-proc', slug: 'procedimentos', title: 'Procedimentos', description: 'Técnicas, amostras e condutas práticas.', icon: 'scissors', sortOrder: 15 },
  { id: 'cat-outros', slug: 'outros', title: 'Outros', description: 'Conteúdos transversais e materiais de apoio.', icon: 'folders', sortOrder: 16 },
]

