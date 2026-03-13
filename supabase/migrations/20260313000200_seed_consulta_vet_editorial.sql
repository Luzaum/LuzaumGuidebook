insert into public.consulta_vet_categories (slug, title, description, sort_order, is_published)
values
  ('infecciosas', 'Doenças Infecciosas', 'Condições infecciosas com foco em triagem, isolamento e conduta inicial.', 1, true),
  ('endocrinologia', 'Endocrinologia', 'Distúrbios hormonais e metabólicos com abordagem clínica objetiva.', 2, true),
  ('gastroenterologia', 'Gastroenterologia', 'Doenças gastrointestinais e terapias de suporte.', 3, true),
  ('nefrologia', 'Nefrologia e Urologia', 'Alterações renais e urinárias com acompanhamento longitudinal.', 4, true),
  ('cardiologia', 'Cardiologia', 'Doenças cardiovasculares e monitorização clínica.', 5, true),
  ('dermatologia', 'Dermatologia', 'Dermatopatias infecciosas, alérgicas e autoimunes.', 6, true),
  ('neurologia', 'Neurologia', 'Síndromes neurológicas, crises e sequela funcional.', 7, true),
  ('oncologia', 'Oncologia', 'Conceitos oncológicos essenciais para decisão rápida.', 8, true)
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;

with cinomose_category as (
  select id from public.consulta_vet_categories where slug = 'infecciosas'
)
insert into public.consulta_vet_diseases (
  category_id,
  slug,
  title,
  synonyms,
  species,
  tags,
  quick_summary,
  thirty_second_view,
  do_not_forget,
  when_to_suspect,
  initial_conduct,
  high_yield_tests,
  common_mistakes,
  red_flags,
  clinical_pearls,
  introduction,
  etiology,
  transmission,
  pathophysiology,
  epidemiology,
  clinical_presentation,
  physical_exam,
  differential_diagnoses,
  diagnostics,
  diagnostic_approach,
  treatment,
  prognosis,
  complications,
  prevention,
  "references",
  is_published
)
select
  cinomose_category.id,
  'cinomose-canina',
  'Cinomose Canina',
  array['Distemper canino'],
  array['dog']::text[],
  array['Viral', 'Neurológica', 'Vacinação', 'Filhotes'],
  'Doença viral sistêmica com acometimento respiratório, gastrointestinal e neurológico. A prova de conceito do módulo prioriza reconhecimento clínico, suporte intensivo e controle de complicações secundárias.',
  array[
    'Pense em cinomose em cão jovem, não vacinado, com sinais multissistêmicos.',
    'Mioclonia, hiperqueratose de coxins e progressão neurológica têm alto peso clínico.',
    'Não existe antiviral curativo de rotina: o diferencial é suporte, isolamento e monitorização precoce.'
  ],
  array[
    'Sinais neurológicos podem surgir dias ou semanas após a fase respiratória ou digestiva.',
    'Resultados negativos em teste rápido não excluem a doença em paciente muito sugestivo.',
    'Isolamento é parte do tratamento e protege outros pacientes internados.'
  ],
  array[
    'Filhote ou adulto jovem sem protocolo vacinal completo.',
    'Secreção ocular ou nasal, tosse e apatia associados a vômito ou diarreia.',
    'Mioclonia, convulsões, ataxia ou déficits proprioceptivos em conjunto com histórico compatível.'
  ],
  array[
    'Isolar o paciente e estabilizar hidratação, perfusão e controle de vômito.',
    'Coletar PCR ou teste específico antes de antibiótico quando possível, sem atrasar suporte.',
    'Tratar complicações bacterianas e neurológicas de acordo com apresentação clínica.'
  ],
  array[
    'RT-PCR em swab conjuntival, secreção nasal, urina ou sangue.',
    'Hemograma para leucopenia, linfopenia e avaliação de infecção secundária.',
    'Radiografia torácica quando houver tosse, crepitações ou suspeita de broncopneumonia.'
  ],
  array[
    'Esperar confirmação laboratorial para iniciar suporte em paciente claramente instável.',
    'Subestimar mioclonia e sinais discretos de déficit neurológico.',
    'Usar antibiótico de forma indiscriminada sem justificar infecção bacteriana secundária.'
  ],
  array[
    'Convulsões, mioclonia persistente ou alteração aguda do estado mental.',
    'Hipoxemia, esforço respiratório ou broncopneumonia com suspeita de sepse secundária.',
    'Desidratação importante com recusa alimentar e evolução rápida.',
    'Filhote não vacinado com leucopenia acentuada e piora progressiva.'
  ],
  array[
    'Mioclonia em cão jovem não vacinado tem alto valor sugestivo no contexto correto.',
    'A cinomose pode simular doença respiratória ou gastroenterite nos primeiros dias.',
    'O prognóstico piora muito quando o acometimento neurológico já é estabelecido.'
  ],
  to_jsonb('A cinomose canina é uma enfermidade infecciosa altamente contagiosa, de grande impacto em filhotes e em pacientes com baixa cobertura vacinal. O vírus pode produzir quadro multissistêmico, com intensidade variável entre formas leves e encefalomielite progressiva.'::text),
  to_jsonb('Causada pelo canine distemper virus (CDV), um Morbillivirus envelopado, sensível a desinfetantes usuais, mas altamente transmissível em populações suscetíveis.'::text),
  to_jsonb(array[
    'Contato direto com secreções respiratórias, oculares, saliva, urina ou fezes de animais infectados.',
    'Aerossóis em locais com alta densidade de cães, como abrigos, creches e internações.',
    'Eliminação viral pode persistir por semanas mesmo após melhora clínica parcial.'
  ]),
  jsonb_build_object(
    'Resposta imune e progressão', array[
      'Após replicar em tonsilas e linfonodos regionais, o vírus induz imunossupressão transitória com linfopenia.',
      'Se a resposta imune é insuficiente, ocorre disseminação para epitélios, pele e sistema nervoso central.',
      'O acometimento neurológico envolve inflamação, desmielinização e lesão viral direta.'
    ],
    'Sistemas acometidos', array[
      'Respiratório: rinite, secreção ocular ou nasal, tosse e broncopneumonia.',
      'Gastrointestinal: vômito, diarreia, anorexia e perda de peso.',
      'Cutâneo: hiperqueratose de coxins e plano nasal em fases tardias.',
      'Neurológico: ataxia, paresia, mioclonia, convulsões e alterações comportamentais.'
    ]
  ),
  to_jsonb('Mais frequente em cães jovens entre 3 e 6 meses, especialmente sem vacinação primária completa. Surtos ainda ocorrem em cenários de baixa adesão vacinal e alta rotatividade de animais.'::text),
  jsonb_build_object(
    'Fase inicial', array[
      'Febre, apatia e queda do apetite.',
      'Secreção ocular e nasal serosa evoluindo para mucopurulenta.',
      'Tosse, espirros e sinais de bronquite ou pneumonia.'
    ],
    'Fase digestiva', array[
      'Vômito e diarreia com risco de desidratação e desequilíbrio eletrolítico.',
      'Perda ponderal rápida em pacientes com anorexia persistente.'
    ],
    'Fase neurológica', array[
      'Mioclonia focal ou generalizada.',
      'Ataxia, tetraparesia, déficits proprioceptivos e hiperestesia.',
      'Convulsões e alteração do estado mental.'
    ]
  ),
  to_jsonb(array[
    'Avaliar hidratação, temperatura, padrão respiratório e secreções oculares ou nasais.',
    'Inspecionar coxins plantares e plano nasal em busca de hiperqueratose.',
    'Realizar exame neurológico completo sempre que houver mioclonia, tremores ou ataxia.',
    'Auscultar tórax e palpar linfonodos periféricos.'
  ]),
  to_jsonb(array[
    'Traqueobronquite infecciosa canina e outras doenças respiratórias infecciosas.',
    'Parvovirose ou outras gastroenterites infecciosas em filhotes.',
    'Meningoencefalites infecciosas ou inflamatórias.',
    'Toxoplasmose, neosporose e intoxicações em pacientes neurológicos.'
  ]),
  jsonb_build_object(
    'Exames laboratoriais', array[
      'Hemograma pode revelar leucopenia, linfopenia e leucocitose tardia por infecção bacteriana secundária.',
      'Bioquímica ajuda a avaliar hidratação, eletrólitos e funções hepática e renal.'
    ],
    'Testes específicos', array[
      'RT-PCR em swab conjuntival, secreção nasal, sangue ou urina tem bom rendimento nas fases iniciais.',
      'Imunocromatografia rápida pode ajudar na triagem, mas não exclui a doença quando negativa.',
      'Citologia de conjuntiva ou sedimento urinário pode mostrar corpúsculos de inclusão, com sensibilidade limitada.'
    ],
    'Imagem e suporte', array[
      'Radiografia torácica é útil quando há suspeita de broncopneumonia.',
      'Líquor e imagem avançada entram em casos neurológicos selecionados.'
    ]
  ),
  to_jsonb('Priorizar histórico vacinal, idade, ambiente, evolução clínica e sinais multissistêmicos. Em paciente suspeito, coletar exame específico precocemente, corrigir desidratação e tratar complicações concomitantes.'::text),
  jsonb_build_object(
    'Conduta de suporte', array[
      'Fluidoterapia e correção de distúrbios hidroeletrolíticos.',
      'Controle de vômito, suporte nutricional e manejo intensivo de pacientes anoréxicos.',
      'Nebulização, fisioterapia respiratória e oxigenioterapia quando indicadas.'
    ],
    'Controle de complicações', array[
      'Antimicrobiano apenas quando houver evidência ou forte suspeita de infecção bacteriana secundária.',
      'Anticonvulsivantes conforme o padrão de acometimento neurológico.',
      'Cuidados de enfermagem e prevenção de lesões por decúbito.'
    ],
    'Monitorização', array[
      'Reavaliar hidratação, estado mental, frequência de crises e progressão respiratória.',
      'Alinhar com tutor que o tratamento é de suporte e o prognóstico depende principalmente do SNC.'
    ]
  ),
  to_jsonb('Variável. Casos com apresentação respiratória ou digestiva leve podem evoluir bem com suporte adequado. Já pacientes com acometimento neurológico progressivo têm prognóstico reservado a desfavorável.'::text),
  to_jsonb(array[
    'Broncopneumonia bacteriana secundária.',
    'Encefalomielite e sequelas neurológicas permanentes.',
    'Desnutrição, lesões de decúbito e infecções oportunistas em internação prolongada.'
  ]),
  to_jsonb(array[
    'Vacinação essencial com protocolo primário completo e reforços conforme risco individual.',
    'Isolamento rigoroso de pacientes suspeitos ou confirmados.',
    'Higienização ambiental e controle de circulação em abrigos e clínicas.',
    'Orientação intensiva a tutores de filhotes e pacientes de risco.'
  ]),
  '[]'::jsonb,
  true
from cinomose_category
on conflict (slug) do update
set
  category_id = excluded.category_id,
  title = excluded.title,
  synonyms = excluded.synonyms,
  species = excluded.species,
  tags = excluded.tags,
  quick_summary = excluded.quick_summary,
  thirty_second_view = excluded.thirty_second_view,
  do_not_forget = excluded.do_not_forget,
  when_to_suspect = excluded.when_to_suspect,
  initial_conduct = excluded.initial_conduct,
  high_yield_tests = excluded.high_yield_tests,
  common_mistakes = excluded.common_mistakes,
  red_flags = excluded.red_flags,
  clinical_pearls = excluded.clinical_pearls,
  introduction = excluded.introduction,
  etiology = excluded.etiology,
  transmission = excluded.transmission,
  pathophysiology = excluded.pathophysiology,
  epidemiology = excluded.epidemiology,
  clinical_presentation = excluded.clinical_presentation,
  physical_exam = excluded.physical_exam,
  differential_diagnoses = excluded.differential_diagnoses,
  diagnostics = excluded.diagnostics,
  diagnostic_approach = excluded.diagnostic_approach,
  treatment = excluded.treatment,
  prognosis = excluded.prognosis,
  complications = excluded.complications,
  prevention = excluded.prevention,
  "references" = excluded."references",
  is_published = excluded.is_published;

with med_categories as (
  select slug, id
  from public.consulta_vet_categories
  where slug in ('gastroenterologia', 'neurologia', 'infecciosas')
)
insert into public.consulta_vet_medications (
  category_id,
  slug,
  title,
  active_ingredient,
  trade_names,
  pharmacologic_class,
  species,
  tags,
  mechanism_of_action,
  indications,
  contraindications,
  cautions,
  adverse_effects,
  doses,
  presentations,
  clinical_notes_rich_text,
  "references",
  is_published
)
values
  (
    (select id from med_categories where slug = 'gastroenterologia'),
    'maropitant',
    'Maropitant',
    'Citrato de maropitant',
    array['Cerenia'],
    'Antiemético',
    array['dog', 'cat']::text[],
    array['Náusea', 'Vômito', 'Internação'],
    'Antagonista do receptor NK1, reduzindo a ação da substância P em centros relacionados ao vômito.',
    array[
      'Controle de vômito agudo em cães e gatos.',
      'Suporte em pacientes com cinomose, doença renal crônica e outras enfermidades sistêmicas com náusea.'
    ],
    array['Hipersensibilidade ao princípio ativo.'],
    array[
      'Ajustar a expectativa em pacientes com obstrução gastrointestinal, onde o controle de vômito não substitui diagnóstico.',
      'Usar com critério em hepatopatas.'
    ],
    array[
      'Dor à aplicação subcutânea.',
      'Hipersalivação ou letargia discreta.'
    ],
    jsonb_build_array(
      jsonb_build_object(
        'id', 'dose-maropitant-dog',
        'species', 'dog',
        'indication', 'Vômito agudo em cães',
        'doseMin', 1,
        'doseMax', 1,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'SC/VO',
        'frequency', 'SID',
        'calculatorEnabled', true
      ),
      jsonb_build_object(
        'id', 'dose-maropitant-cat',
        'species', 'cat',
        'indication', 'Vômito agudo em gatos',
        'doseMin', 1,
        'doseMax', 1,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'SC',
        'frequency', 'SID',
        'calculatorEnabled', true
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'id', 'pres-maropitant-injetavel',
        'label', 'Solução injetável 10 mg/mL',
        'form', 'Solução injetável',
        'concentrationValue', 10,
        'concentrationUnit', 'mg/mL'
      )
    ),
    '<p>Útil para estabilização de pacientes com cinomose, DRC ou gastroenteropatia. O controle do vômito melhora conforto, hidratação e adesão ao suporte nutricional.</p>',
    '[]'::jsonb,
    true
  ),
  (
    (select id from med_categories where slug = 'neurologia'),
    'fenobarbital',
    'Fenobarbital',
    'Fenobarbital',
    array['Gardenal', 'Genéricos'],
    'Anticonvulsivante barbitúrico',
    array['dog', 'cat']::text[],
    array['Convulsão', 'Neurológico', 'Manutenção'],
    'Potencializa a neurotransmissão gabaérgica e reduz a excitabilidade neuronal, aumentando o limiar convulsivo.',
    array[
      'Controle de convulsões recorrentes.',
      'Manutenção anticonvulsivante em pacientes neurológicos, inclusive com sequelas de cinomose.'
    ],
    array[
      'Hepatopatia grave sem monitorização.',
      'Hipersensibilidade conhecida ao fármaco.'
    ],
    array[
      'Monitorar função hepática e concentração sérica quando uso prolongado.',
      'Ajustar desmame e escalonamento para evitar descompensações.'
    ],
    array[
      'Sedação, polifagia e poliúria/polidipsia.',
      'Elevação de enzimas hepáticas.',
      'Ataxia transitória no início do tratamento.'
    ],
    jsonb_build_array(
      jsonb_build_object(
        'id', 'dose-fenobarbital-dog',
        'species', 'dog',
        'indication', 'Manutenção anticonvulsivante em cães',
        'doseMin', 2.5,
        'doseMax', 3,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'VO',
        'frequency', 'BID',
        'calculatorEnabled', true
      ),
      jsonb_build_object(
        'id', 'dose-fenobarbital-cat',
        'species', 'cat',
        'indication', 'Manutenção anticonvulsivante em gatos',
        'doseMin', 1.5,
        'doseMax', 2.5,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'VO',
        'frequency', 'BID',
        'calculatorEnabled', true
      )
    ),
    jsonb_build_array(
      jsonb_build_object('id', 'pres-fenobarbital-15', 'label', 'Comprimido 15 mg', 'form', 'Comprimido', 'scoringInfo', 'Sulcado'),
      jsonb_build_object('id', 'pres-fenobarbital-30', 'label', 'Comprimido 30 mg', 'form', 'Comprimido', 'scoringInfo', 'Sulcado'),
      jsonb_build_object('id', 'pres-fenobarbital-100', 'label', 'Comprimido 100 mg', 'form', 'Comprimido', 'scoringInfo', 'Sulcado')
    ),
    '<p>Em pacientes com cinomose neurológica, o objetivo é controle sintomático das crises e melhor qualidade de vida. Ajustes devem considerar resposta clínica e tolerância.</p>',
    '[]'::jsonb,
    true
  ),
  (
    (select id from med_categories where slug = 'infecciosas'),
    'amoxicilina-clavulanato',
    'Amoxicilina + clavulanato',
    'Amoxicilina trihidratada + clavulanato de potássio',
    array['Synulox', 'Clavulin'],
    'Antibiótico beta-lactâmico potencializado',
    array['dog', 'cat']::text[],
    array['Suporte', 'Bacteriana secundária', 'VO'],
    'A amoxicilina inibe a síntese da parede bacteriana; o clavulanato bloqueia beta-lactamases e amplia a cobertura contra alguns patógenos produtores dessas enzimas.',
    array[
      'Infecções bacterianas de tecidos moles, vias respiratórias e trato urinário em cenários compatíveis.',
      'Cobertura de suporte em paciente com cinomose quando houver suspeita consistente de broncopneumonia ou infecção bacteriana secundária.'
    ],
    array[
      'Hipersensibilidade a penicilinas ou cefalosporinas.',
      'Uso empírico sem indício clínico de infecção bacteriana secundária.'
    ],
    array[
      'Reavaliar resposta clínica em 48 a 72 horas e ajustar conforme cultura quando disponível.',
      'Evitar usar como rotina em toda cinomose sem justificativa infecciosa.'
    ],
    array[
      'Vômito, diarreia e hiporexia.',
      'Hipersensibilidade cutânea ou sistêmica em pacientes suscetíveis.'
    ],
    jsonb_build_array(
      jsonb_build_object(
        'id', 'dose-amox-clav-dog',
        'species', 'dog',
        'indication', 'Infecção bacteriana secundária em cães',
        'doseMin', 12.5,
        'doseMax', 25,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'VO',
        'frequency', 'BID',
        'calculatorEnabled', true
      ),
      jsonb_build_object(
        'id', 'dose-amox-clav-cat',
        'species', 'cat',
        'indication', 'Infecção bacteriana em gatos',
        'doseMin', 12.5,
        'doseMax', 20,
        'doseUnit', 'mg',
        'perWeightUnit', 'kg',
        'route', 'VO',
        'frequency', 'BID',
        'calculatorEnabled', true
      )
    ),
    jsonb_build_array(
      jsonb_build_object('id', 'pres-amox-clav-50', 'label', 'Comprimido 50 mg', 'form', 'Comprimido', 'scoringInfo', 'Sulcado'),
      jsonb_build_object('id', 'pres-amox-clav-250', 'label', 'Comprimido 250 mg', 'form', 'Comprimido', 'scoringInfo', 'Sulcado')
    ),
    '<p>Na demonstração da cinomose, entra como exemplo de antibiótico de suporte apenas quando o exame clínico sugere complicação bacteriana secundária. Não substitui suporte intensivo, isolamento e monitorização neurológica.</p>',
    '[]'::jsonb,
    true
  )
on conflict (slug) do update
set
  category_id = excluded.category_id,
  title = excluded.title,
  active_ingredient = excluded.active_ingredient,
  trade_names = excluded.trade_names,
  pharmacologic_class = excluded.pharmacologic_class,
  species = excluded.species,
  tags = excluded.tags,
  mechanism_of_action = excluded.mechanism_of_action,
  indications = excluded.indications,
  contraindications = excluded.contraindications,
  cautions = excluded.cautions,
  adverse_effects = excluded.adverse_effects,
  doses = excluded.doses,
  presentations = excluded.presentations,
  clinical_notes_rich_text = excluded.clinical_notes_rich_text,
  "references" = excluded."references",
  is_published = excluded.is_published;

delete from public.consulta_vet_disease_medications
where disease_id = (select id from public.consulta_vet_diseases where slug = 'cinomose-canina');

insert into public.consulta_vet_disease_medications (disease_id, medication_id)
select d.id, m.id
from public.consulta_vet_diseases d
join public.consulta_vet_medications m on m.slug in ('maropitant', 'fenobarbital', 'amoxicilina-clavulanato')
where d.slug = 'cinomose-canina'
on conflict do nothing;
