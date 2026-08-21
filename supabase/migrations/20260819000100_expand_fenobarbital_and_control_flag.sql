alter table public.consulta_vet_medications
  add column if not exists is_controlled boolean not null default false;

update public.consulta_vet_medications
set
  title = 'Fenobarbital',
  active_ingredient = 'Fenobarbital',
  is_controlled = true,
  trade_names = array['Convless® — Agener União', 'Gardenal® e genéricos humanos']::text[],
  pharmacologic_class = 'Anticonvulsivante barbitúrico; indutor enzimático hepático',
  species = array['dog', 'cat']::text[],
  tags = array['Epilepsia', 'Anticonvulsivante', 'Barbitúrico', 'Monitorização sérica', 'Controle especial']::text[],
  mechanism_of_action = 'Potencializa a neurotransmissão inibitória mediada por GABA, aumenta a condutância de cloreto e reduz mecanismos excitatórios, incluindo a liberação de glutamato. Aumenta o limiar convulsivo e reduz a propagação da descarga epiléptica. Não possui analgesia verdadeira.',
  plain_language_summary = 'Anticonvulsivante de primeira linha para controle crônico de crises em cães e gatos. Exige acompanhamento clínico, laboratorial e da concentração sérica. Não interromper abruptamente.',
  indications = array[
    'Controle crônico da epilepsia e de crises recorrentes em cães e gatos.',
    'Terapia de manutenção após crises em cluster ou status epilepticus, quando clinicamente indicado.'
  ]::text[],
  contraindications = array[
    'Hipersensibilidade a barbitúricos.',
    'Hepatopatia grave ou insuficiência hepática sem monitorização adequada.',
    'Não interromper abruptamente após uso crônico.'
  ]::text[],
  cautions = array[
    'Obter hemograma, bioquímica e urinálise basais; considerar avaliação funcional hepática.',
    'Dosar concentração sérica aproximadamente 10–14 dias após início ou ajuste e novamente por volta de 6 semanas devido à autoindução.',
    'Faixa sérica ampla frequentemente citada: 15–35 µg/mL; interpretar junto do controle das crises e dos efeitos adversos.',
    'FA elevada isoladamente pode refletir indução enzimática. Hipoalbuminemia, hiperbilirrubinemia, ácidos biliares elevados, icterícia, ascite ou coagulopatia aumentam a suspeita de hepatotoxicidade.',
    'Pode reduzir T4 total/livre e aumentar TSH sem hipotireoidismo verdadeiro.',
    'Desmamar gradualmente; nunca suspender abruptamente.'
  ]::text[],
  adverse_effects = array[
    'Sedação, letargia e ataxia, principalmente no início ou após aumento da dose.',
    'Poliúria, polidipsia, polifagia, ganho de peso e fraqueza.',
    'Indução de enzimas hepáticas; hepatotoxicidade clínica é menos comum, mas potencialmente grave.',
    'Raramente anemia, neutropenia, trombocitopenia e reações imunomediadas ou dermatológicas.'
  ]::text[],
  interactions = array[
    'Depressores do SNC podem produzir sedação e depressão respiratória aditivas.',
    'Brometo de potássio pode produzir efeitos anticonvulsivantes e adversos aditivos.',
    'A indução enzimática pode reduzir a exposição a levetiracetam, azóis, corticosteroides, ciclosporina, doxiciclina, teofilina, praziquantel e outros fármacos.'
  ]::text[],
  routes = array['VO', 'IV']::text[],
  doses = '[
    {"id":"dose-fenobarbital-dog-initial","species":"dog","indication":"Epilepsia — dose inicial usual da literatura","doseMin":2.5,"doseMax":3,"doseUnit":"mg","perWeightUnit":"kg","route":"VO","frequency":"a cada 12 horas","duration":"uso contínuo","calculatorEnabled":true,"notes":"Titular conforme crises, efeitos adversos e concentração sérica."},
    {"id":"dose-fenobarbital-cat-initial","species":"cat","indication":"Epilepsia — dose inicial usual em gatos","doseMin":1,"doseMax":3,"doseUnit":"mg","perWeightUnit":"kg","route":"VO","frequency":"a cada 12 horas","duration":"uso contínuo","calculatorEnabled":true,"notes":"Convless não possui indicação comercial atual para gatos."},
    {"id":"dose-fenobarbital-convless-label","species":"dog","indication":"Convless® — faixa de bula do produto","doseMin":1.3,"doseMax":6,"doseUnit":"mg","perWeightUnit":"kg","route":"VO","frequency":"a cada 12 horas","duration":"uso contínuo","calculatorEnabled":true,"presentationId":"pres-fenobarbital-convless-20","notes":"Faixa de bula, não equivalente automaticamente à dose inicial padrão da literatura. Volume em mL = peso x dose / 20."},
    {"id":"dose-fenobarbital-dog-loading","species":"dog","indication":"Status epilepticus/cluster — carga hospitalar incremental","doseMin":16,"doseMax":24,"doseUnit":"mg","perWeightUnit":"kg","route":"IV","frequency":"dose cumulativa titulada","calculatorEnabled":false,"notes":"NÃO administrar como bolus único; usar doses incrementais com monitorização cardiorrespiratória."}
  ]'::jsonb,
  presentations = '[
    {"id":"pres-fenobarbital-convless-20","label":"Convless® 20 mg/mL — solução oral veterinária 60 mL com seringa dosadora","form":"Solução oral palatável","concentrationValue":20,"concentrationUnit":"mg/mL","packInfo":"Frasco 60 mL + seringa dosadora; somente cães","route":"VO","channel":"veterinary","commercialProductSlug":"convless-agener"},
    {"id":"pres-fenobarbital-15","label":"Comprimido 15 mg","form":"Comprimido","concentrationValue":15,"concentrationUnit":"mg/comprimido","channel":"human_pharmacy"},
    {"id":"pres-fenobarbital-30","label":"Comprimido 30 mg","form":"Comprimido","concentrationValue":30,"concentrationUnit":"mg/comprimido","channel":"human_pharmacy"},
    {"id":"pres-fenobarbital-100","label":"Comprimido 100 mg","form":"Comprimido","concentrationValue":100,"concentrationUnit":"mg/comprimido","channel":"human_pharmacy"}
  ]'::jsonb,
  clinical_notes_rich_text = '<p><strong>Monitorização é parte do tratamento.</strong> Interpretar concentração sérica junto do controle das crises e dos efeitos adversos.</p><p><strong>Indução enzimática não é sinônimo de hepatotoxicidade.</strong> FA elevada isoladamente é comum em cães.</p><p><strong>Convless®:</strong> manter separadas a faixa de bula (1,3–6 mg/kg q12h) e a dose inicial usual da literatura (2,5–3 mg/kg q12h).</p><p><strong>Nunca suspender abruptamente.</strong></p>',
  admin_notes_text = 'Medicamento de controle especial. Prescrição veterinária obrigatória e retenção conforme legislação vigente.',
  references = '[
    {"id":"ref-fenobarbital-plumbs10","citationText":"Plumb''s Veterinary Drug Handbook, 10th ed. — Phenobarbital, pp. 1007–1010.","sourceType":"Formulário","evidenceLevel":"Alta"},
    {"id":"ref-fenobarbital-nelson6","citationText":"Nelson & Couto. Small Animal Internal Medicine, 6th ed. — Seizures and Other Paroxysmal Events.","sourceType":"Livro-texto","evidenceLevel":"Alta"},
    {"id":"ref-fenobarbital-frontiers-2026","citationText":"Pompermaier E et al. Front Vet Sci. 2026.","sourceType":"Estudo retrospectivo","url":"https://doi.org/10.3389/fvets.2026.1723038","evidenceLevel":"Moderada"},
    {"id":"ref-convless-agener","citationText":"Agener União. Convless® — informações oficiais do produto.","sourceType":"Fabricante/bula","url":"https://agener.com.br/produtos/pequenos-animais/suplementos/convless/","evidenceLevel":"Bula brasileira"}
  ]'::jsonb,
  is_published = true,
  updated_at = now()
where slug = 'fenobarbital';
