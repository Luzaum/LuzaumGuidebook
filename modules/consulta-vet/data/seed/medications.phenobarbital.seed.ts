import type { MedicationRecord } from '../../types/medication';

export const phenobarbitalMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-fenobarbital',
    slug: 'fenobarbital',
    title: 'Fenobarbital',
    activeIngredient: 'Fenobarbital',
    tradeNames: ['Convless® — Agener União', 'Gardenal® e genéricos humanos'],
    pharmacologicClass: 'Anticonvulsivante barbitúrico; indutor enzimático hepático',
    species: ['dog', 'cat'],
    category: 'neurologia',
    tags: ['Epilepsia', 'Anticonvulsivante', 'Barbitúrico', 'Monitorização sérica', 'Controle especial'],
    mechanismOfAction:
      'Potencializa a neurotransmissão inibitória mediada por GABA, aumentando a condutância de cloreto, e reduz mecanismos excitatórios, incluindo a liberação de glutamato. O resultado é aumento do limiar convulsivo e menor propagação da descarga epiléptica. Produz depressão do sistema nervoso central dependente da dose e não possui analgesia verdadeira.',
    plainLanguageSummary:
      'Anticonvulsivante de primeira linha para controle crônico de crises em cães e gatos. Costuma ser administrado a cada 12 horas e exige acompanhamento clínico, laboratorial e da concentração sérica. Não deve ser interrompido abruptamente.',
    indications: [
      'Controle crônico da epilepsia e de crises recorrentes em cães e gatos.',
      'Terapia de manutenção após crises em cluster ou status epilepticus, quando clinicamente indicado.',
      'Status epilepticus/cluster: pode ser usado como anticonvulsivante de ação mais duradoura após terapia de interrupção rápida, com monitorização cardiorrespiratória.',
    ],
    contraindications: [
      'Hipersensibilidade a barbitúricos.',
      'Hepatopatia grave ou insuficiência hepática sem possibilidade de monitorização adequada.',
      'Evitar interrupção abrupta após uso crônico, pelo risco de crises em cluster ou status epilepticus.',
    ],
    cautions: [
      'Obter hemograma, bioquímica e urinálise basais; considerar avaliação funcional hepática quando indicada.',
      'Dosar concentração sérica aproximadamente 10–14 dias após início ou ajuste e novamente por volta de 6 semanas, devido à autoindução metabólica.',
      'Em pacientes estáveis, repetir concentração sérica, hemograma e bioquímica aproximadamente a cada 6 meses ou antes conforme risco clínico.',
      'Faixa sérica ampla frequentemente citada: 15–35 µg/mL; interpretar junto do controle das crises e dos efeitos adversos, sem tratar apenas o número.',
      'Aumento isolado de fosfatase alcalina e aumento discreto/moderado de ALT podem refletir indução enzimática. Hipoalbuminemia, hiperbilirrubinemia, ácidos biliares elevados, icterícia, ascite ou coagulopatia aumentam a suspeita de hepatotoxicidade.',
      'Pode reduzir T4 total e livre e aumentar TSH sem hipotireoidismo verdadeiro; interpretar o painel tireoidiano no contexto clínico.',
      'Desmamar gradualmente. Um esquema descrito é reduzir cerca de 25% a cada 2 semanas, individualizando conforme controle das crises.',
    ],
    adverseEffects: [
      'Sedacão, letargia e ataxia, especialmente no início ou após aumento da dose; pode haver excitação paradoxal.',
      'Poliúria, polidipsia, polifagia, ganho de peso e fraqueza.',
      'Indução de enzimas hepáticas e hepatomegalia em cães; hepatotoxicidade clínica é menos comum, mas potencialmente grave.',
      'Raramente: anemia, neutropenia, trombocitopenia, reações imunomediadas ou dermatológicas.',
      'Gatos podem apresentar ataxia, letargia, prurido facial, polifagia e PU/PD; elevação de enzimas hepáticas deve ser investigada.',
    ],
    interactions: [
      'Depressores do SNC, como opioides, benzodiazepínicos e agonistas alfa-2: sedação e depressão respiratória aditivas.',
      'Brometo de potássio: efeitos anticonvulsivantes e adversos podem ser aditivos.',
      'Indução enzimática pode reduzir a exposição a levetiracetam, azóis, corticosteroides, ciclosporina, doxiciclina, teofilina, praziquantel e outros fármacos.',
      'A indução metabólica pode persistir por semanas após a retirada.',
    ],
    routes: ['VO', 'IV'],
    presentations: [
      {
        id: 'pres-fenobarbital-convless-20',
        label: 'Convless® 20 mg/mL — solução oral veterinária 60 mL com seringa dosadora',
        form: 'Solução oral palatável',
        concentrationValue: 20,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco 60 mL + seringa dosadora; produto rotulado exclusivamente para cães',
        route: 'VO',
        channel: 'veterinary',
        commercialProductSlug: 'convless-agener',
      },
      { id: 'pres-fenobarbital-15', label: 'Comprimido 15 mg', form: 'Comprimido', concentrationValue: 15, concentrationUnit: 'mg/comprimido', channel: 'human_pharmacy', scoringInfo: 'Confirmar sulco e possibilidade de fracionamento no produto em mãos' },
      { id: 'pres-fenobarbital-30', label: 'Comprimido 30 mg', form: 'Comprimido', concentrationValue: 30, concentrationUnit: 'mg/comprimido', channel: 'human_pharmacy', scoringInfo: 'Confirmar sulco e possibilidade de fracionamento no produto em mãos' },
      { id: 'pres-fenobarbital-100', label: 'Comprimido 100 mg', form: 'Comprimido', concentrationValue: 100, concentrationUnit: 'mg/comprimido', channel: 'human_pharmacy', scoringInfo: 'Confirmar sulco e possibilidade de fracionamento no produto em mãos' },
    ],
    doses: [
      {
        id: 'dose-fenobarbital-dog-initial',
        species: 'dog', indication: 'Epilepsia — dose inicial usual da literatura',
        doseMin: 2.5, doseMax: 3, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'a cada 12 horas', duration: 'uso contínuo',
        notes: 'Titular conforme crises, efeitos adversos e concentração sérica. Faixas de manutenção mais amplas, aproximadamente 2–5 mg/kg q12h, são descritas.',
        evidenceLevel: 'Plumb\'s 10ª ed.; Nelson & Couto 6ª ed.; evidência clínica contemporânea',
        referenceIds: ['ref-fenobarbital-plumbs10', 'ref-fenobarbital-nelson6', 'ref-fenobarbital-frontiers-2026'], calculatorEnabled: true,
      },
      {
        id: 'dose-fenobarbital-cat-initial',
        species: 'cat', indication: 'Epilepsia — dose inicial usual em gatos',
        doseMin: 1, doseMax: 3, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'a cada 12 horas', duration: 'uso contínuo',
        notes: 'Esta dose se refere ao princípio ativo. Convless® não possui indicação comercial atual para gatos.',
        evidenceLevel: 'Plumb\'s 10ª ed.', referenceIds: ['ref-fenobarbital-plumbs10'], calculatorEnabled: true,
      },
      {
        id: 'dose-fenobarbital-convless-label',
        species: 'dog', indication: 'Convless® — faixa de bula do produto',
        doseMin: 1.3, doseMax: 6, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'a cada 12 horas', duration: 'uso contínuo',
        notes: 'Faixa de bula, não equivalente automaticamente à dose inicial padrão da literatura. Convless® = 20 mg/mL; volume por dose = peso × dose ÷ 20.',
        evidenceLevel: 'Bula/fabricante — Agener União', referenceIds: ['ref-convless-agener'], calculatorEnabled: true, presentationId: 'pres-fenobarbital-convless-20',
      },
      {
        id: 'dose-fenobarbital-dog-loading',
        species: 'dog', indication: 'Status epilepticus/cluster — carga hospitalar incremental',
        doseMin: 16, doseMax: 24, doseUnit: 'mg', perWeightUnit: 'kg', route: 'IV', frequency: 'dose cumulativa titulada',
        notes: 'NÃO administrar como bolus único. Usar doses incrementais após anticonvulsivante de ação rápida, considerando exposição prévia e com monitorização cardiorrespiratória.',
        evidenceLevel: 'BSAVA Emergency; Textbook of Small Animal Emergency Medicine', referenceIds: ['ref-fenobarbital-bsava-emergency'], calculatorEnabled: false,
      },
    ],
    clinicalNotesRichText:
      '<p><strong>Monitorização é parte do tratamento.</strong> Avaliar resposta clínica e efeitos adversos junto da concentração sérica; um paciente controlado abaixo de 25 µg/mL não precisa ser aumentado apenas para atingir um alvo numérico.</p>' +
      '<p><strong>Indução enzimática não é sinônimo de hepatotoxicidade.</strong> FA elevada isoladamente é comum em cães. Investigar especialmente quando houver sinais clínicos, hipoalbuminemia, hiperbilirrubinemia, ácidos biliares elevados, icterícia, ascite ou coagulopatia.</p>' +
      '<p><strong>Convless®:</strong> produto veterinário canino 20 mg/mL. Manter separadas a faixa de bula (1,3–6 mg/kg q12h) e a dose farmacológica inicial usual da literatura (2,5–3 mg/kg q12h).</p>' +
      '<p><strong>Retirada:</strong> nunca suspender abruptamente o tratamento crônico.</p>',
    adminNotesText:
      'Medicamento de controle especial. Prescrição veterinária obrigatória e retenção de receita conforme legislação vigente. Regras regulatórias devem ser confirmadas no momento da prescrição.',
    relatedDiseaseSlugs: [],
    references: [
      { id: 'ref-fenobarbital-plumbs10', citationText: "Plumb's Veterinary Drug Handbook, 10th ed. — Phenobarbital, pp. 1007–1010.", sourceType: 'Formulário', url: null, evidenceLevel: 'Alta' },
      { id: 'ref-fenobarbital-nelson6', citationText: 'Nelson & Couto. Small Animal Internal Medicine, 6th ed. — Seizures and Other Paroxysmal Events.', sourceType: 'Livro-texto', url: null, evidenceLevel: 'Alta' },
      { id: 'ref-fenobarbital-bsava-emergency', citationText: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — Neurological emergencies.', sourceType: 'Manual', url: null, evidenceLevel: 'Alta' },
      { id: 'ref-fenobarbital-frontiers-2026', citationText: 'Pompermaier E et al. Retrospective study on canine idiopathic epilepsy treatment in primary care practices in the United States. Front Vet Sci. 2026.', sourceType: 'Estudo retrospectivo', url: 'https://doi.org/10.3389/fvets.2026.1723038', evidenceLevel: 'Moderada' },
      { id: 'ref-convless-agener', citationText: 'Agener União. Convless® — informações oficiais do produto.', sourceType: 'Fabricante/bula', url: 'https://agener.com.br/produtos/pequenos-animais/suplementos/convless/', evidenceLevel: 'Bula brasileira' },
    ],
    isControlled: true,
    isPublished: true,
    source: 'seed',
  },
];
