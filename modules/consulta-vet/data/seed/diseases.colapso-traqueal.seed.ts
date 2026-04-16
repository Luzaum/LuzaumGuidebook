import { DiseaseRecord } from '../../types/disease';

/** Colapso traqueal / traqueobroncomalácia em cães; síntese Johnson, Nelson & Couto, Drobatz et al., BSAVA, ACVS, meta-análise JVIM 2024, Kim et al. 2024. */
export const colapsoTraquealCaninoRecord: DiseaseRecord = {
  id: 'disease-colapso-traqueal-canino',
  slug: 'colapso-traqueal-canino',
  title: 'Colapso traqueal e traqueobroncomalácia (cão)',
  synonyms: [
    'Traqueobroncomalácia',
    'Tracheal collapse',
    'TBM',
    'Tosse em grasnado de ganso',
  ],
  species: ['dog'],
  category: 'respiratorio',
  tags: [
    'Toy',
    'Tosse',
    'Fluoroscopia',
    'Broncoscopia',
    'Stent',
    'Hidrocodona',
  ],
  quickSummary:
    'Doença crônica degenerativa das vias aéreas (condromalácia dos anéis traqueais, membrana dorsal redundante), frequentemente com broncomalácia associada. Clássica em raças pequenas: tosse seca em “grasnado de ganso”, piora com excitação, calor, umidade e tração cervical. Radiografia subestima gravidade dinâmica; fluoroscopia documenta colapso em movimento; traqueoscopia/broncoscopia é padrão ouro para graduar. Tratamento multimodal (peso, peitoral, controle da tosse, corticoide curto ou inalado, broncodilatadores quando há componente brônquico); anéis extraluminais ou stent em falha clínica selecionada — stent com taxa relevante de complicações.',
  quickDecisionStrip: [
    'Pequeno porte + tosse “honking” + piora com excitação/coleira: pense colapso traqueal.',
    'Cervical costuma piorar na inspiração; intratorácico/brônquico na expiração e na tosse.',
    'Radiografia ajuda mas não gradua nem localiza com fidelidade o componente dinâmico.',
    'Broncoscopia gradua (ACVS I–IV); fluoroscopia mostra o colapso funcional.',
    'Stent é segunda linha: benefício real com tosse/complicações frequentes no seguimento.',
  ],
  quickSummaryRich: {
    lead:
      'A traqueia é sustentada por anéis em C e membrana dorsal. Perda de rigidez cartilagiosa + membrana dorsal frouxa → estreitamento dinâmico do lúmen. A pressão intrapleural negativa na inspiração favorece colapso cervical; a expiração/tosse positiva favorece colapso intratorácico e bronquial. Muitos casos são na verdade traqueobroncomalácia primária (predisposto) ou secundária a inflamação crônica, obesidade ou comorbidades de vias aéreas superiores.',
    leadHighlights: ['honking', 'fluoroscopia', 'broncoscopia', 'traqueobroncomalácia'],
    pillars: [
      {
        title: 'Dinâmica',
        body:
          'Cervical vs intratorácico vs bronquial mudam o ruído predominante (inspiratório vs expiratório) e o plano de imagem (inspiração vs expiração na radiografia).',
        highlights: ['inspiração', 'expiração'],
      },
      {
        title: 'Peso e coleira',
        body:
          'Perda de peso é medida central (estudos recentes com alta proporção de sobrepeso). Peitoral reduz estímulo da tosse por tração cervical.',
        highlights: ['peso', 'peitoral'],
      },
      {
        title: 'Cardíaco',
        body:
          'Aumento de átrio esquerdo (DMVD) pode comprimir brônquio principal esquerdo e imitar ou somar ao colapso — sempre na lista diferencial do toy idoso.',
        highlights: ['DMVD'],
      },
    ],
    diagnosticFlow: {
      title: 'Diagnóstico (ordem prática)',
      steps: [
        { label: 'História + exame', detail: 'Honking, gatilhos, palpação traqueal sensível.' },
        { label: 'Banco mínimo', detail: 'Bioquímica (hepático comum); preparar terapia futura.' },
        { label: 'RX + fluoroscopia', detail: 'RX triagem; fluoroscopia para dinâmica.' },
        { label: 'Endoscopia', detail: 'Graduação, BAL/cultura quando seguro anestésico.' },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento (prioridades)',
      steps: [
        { label: 'Conservador', detail: 'Peso, ambiente, peitoral, comorbidades.' },
        { label: 'Antitussígenos', detail: 'Eixo principal quando a tosse domina.' },
        { label: 'Anti-inflamatório', detail: 'Curso curto sistêmico ou inalado de manutenção.' },
        { label: 'Intervenção', detail: 'Anéis cervicais / stent intratorácico conforme local e grau.' },
      ],
    },
  },
  etiology: {
    tcAnatomiaMembranaDorsal:
      'Anéis cartilaginosos em C com membrana dorsal (músculo traqueal + conjuntivo) fechando a parede. Perda de condrócitos e alteração de matriz (GAG, sulfato de condroitina) enfraquece a cartilagem; membrana dorsal prolapsa → trauma mucoso repetido → edema/inflamação → ciclo vicioso (Johnson; Nelson).',
    tcPrimariaSecundaria:
      'Traqueobroncomalácia pode ser primária/congênita (toy breeds) ou secundária a inflamação crônica, esforço respiratório aumentado ou doença de base (Nelson; Johnson).',
    tcFatoresAgravantes: [
      'Obesidade — sobrepeso extremamente comum em casuísticas recentes (ex.: >97% com BCS ≥4 em série de 2024).',
      'Bronquite crônica, irritantes, infecções de repetição.',
      'Vias aéreas superiores: palato alongado, estenose nasal, paralisia laríngea, BOAS, colapso nasofaríngeo.',
      'Hiperadrenocorticismo e outras condições sistêmicas citadas como agravantes em textos de referência.',
    ],
    notaFelinos:
      'Em gatos o colapso traqueal primário degenerativo típico do toy é raro. Quando ocorre, costuma ser secundário a tumor, corpo estranho ou trauma — o raciocínio deve ser “causa estrutural/obstrutiva” e não apenas “colapso idiopático como no cão”.',
  },
  epidemiology: {
    tcPerfilRacas:
      'Predominância em cães pequenos e toy: Yorkshire, Pomerânia, Poodle, Maltês, Chihuahua; meia-idade a idosos (Johnson). Prevalência populacional exata desconhecida, mas muito comum em centros de referência em cães com tosse crônica.',
    tcBroncomalacia:
      'Broncomalácia pode ser mais frequente do que se imagina e coexistir ou predominar — impacta prognóstico e resposta a stent.',
  },
  pathogenesisTransmission: {
    tcFisiologiaDinamica:
      'Colapso cervical na inspiração (pressão transmural); colapso intratorácico/brônquico na expiração forçada e tosse (pressão intrapleural positiva). Tosse mecânica perpetua inflamação e vice-versa — “quebrar o ciclo da tosse” é núcleo do manejo.',
    tcComplicacoesGraves:
      'Crises podem cursar com hipoxemia, cianose, síncope (reflexo vagal ou obstrução) e, em doença respiratória crônica associada, hipertensão pulmonar descrita na literatura especializada.',
  },
  pathophysiology:
    'O trauma repetido da membrana dorsal na mucosa gera edema e secreção; obstrução dinâmica piora esforço respiratório. Associação com broncomalácia reduz previsibilidade se apenas a traqueia for tratada (ex.: expectativa irreal com stent quando o gargalo é distal).',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        'Tosse seca “honking”; piora com excitação, calor, umidade, comer/beber, tração de coleira.',
        'Sibilos estridor na traqueia; esforço inspiratório (cervical); esforço expiratório / “abdominal press” (intratorácico/brônquico).',
        'Cianose e síncope em casos graves.',
      ],
    },
    {
      system: 'gastrointestinal',
      findings: ['Gagging / retching pós-tosse — mimetiza vômito.'],
    },
  ],
  diagnosis: {
    tcHistoriaEFisico:
      'História muitas vezes diagnóstica: toy, tosse honking, gatilhos ambientais, progressão. Palpação traqueal sensível induz tosse — útil mas não exclusivo.',
    tcBancoMinimo:
      'Hemograma/bioquímica: não fecham diagnóstico; avaliam comorbidades, hepatopatia subclínica, suporte para corticoide/anestesia. Ácidos biliares elevados relatados em parte dos casos (Johnson).',
    tcRadiografia: {
      kind: 'clinicalTable',
      headers: ['Papel da radiografia', 'Detalhe clínico'],
      rows: [
        [
          'Triagem',
          'Avalia calibre traqueal, cardiomegalia, bronquite, pneumonia aspirativa, edema pulmonar.',
        ],
        [
          'Limite principal',
          'Exame estático para doença dinâmica — subestima gravidade e localização (literatura de emergência: discordância relevante vs fluoroscopia).',
        ],
        [
          'Técnica',
          'Cervical preferencialmente em inspiração; intratorácica/brônquios mais evidentes em expiração.',
        ],
      ],
    },
    tcFluoroscopia:
      'Melhor imagem funcional para documentar colapso com respiração e tosse; avalia também vias aéreas superiores e fenômenos associados (Johnson; texto de emergência).',
    tcTraqueoBroncoscopia:
      'Padrão ouro para avaliação e graduação (graus ACVS 1–4; colapso mais frequente próximo ao thoracic inlet). Permite BAL/citologia/cultura. Risco anestésico em paciente muito comprometido — timing individualizado.',
    tcTomografia:
      'CT tem papel seletivo; com intubação pode perder comportamento dinâmico natural; dynamic CT sem anestesia profunda é mais centro especializado.',
    tcLavadoCultura:
      'BAL/ETW: citologia + cultura para inflamação e infecção secundária. Cultura positiva isolada não prova infecção patológica — interpretar com citologia e clínica.',
    tcTabelaGrauACVS: {
      kind: 'clinicalTable',
      headers: ['Grau (ACVS)', 'Aproximação de colapso do lúmen'],
      rows: [
        ['I', '~25% de redução'],
        ['II', '~50%'],
        ['III', '~75%'],
        ['IV', '~100% / obstrução severa'],
      ],
    },
    tcTabelaComplicacoesStent2024: {
      kind: 'clinicalTable',
      headers: ['Complicação (meta-análise JVIM 2024)', 'Prevalência aproximada reportada'],
      rows: [
        ['Tosse precoce', '~99%'],
        ['Tosse tardia', '~75%'],
        ['Tosse tardia clinicamente relevante', '~52%'],
        ['Infecção traqueobrônquica', '~24%'],
        ['Granuloma', '~20%'],
        ['Fratura do stent', '~12%'],
        ['Recidiva/relapso de colapso', '~10%'],
        ['Migração', '~5%'],
      ],
    },
    tcDiagnosticosDiferenciais:
      'Bronquite crônica e broncomalácia isolada; paralisia/colapso laríngeo, palato alongado, BOAS, colapso nasofaríngeo; compressão de brônquio principal esquerdo por aumento de AE (DMVD); corpo estranho, neoplasia, estenose; parenquimatoso, pneumonia, edema.',
  },
  treatment: {
    tcPrincipioConservador:
      'Manejo médico deve ser tentado na maioria, exceto obstrução iminente à vida. Literatura de emergência cita controle clínico prolongado em grande proporção de cães; estudo retrospectivo 2024 com melhora após peso + ambiente + farmacoterapia na grande maioria.',
    tcMedidasNaoFarmacologicas: [
      'Perda de peso — medida central, não “opcional”.',
      'Peitoral em vez de coleira.',
      'Evitar calor, umidade, excitação, fumaça; tratar comorbidades (bronquite, cardiopatia, vias aéreas superiores).',
    ],
    tcAntitussigenosTabela: {
      kind: 'clinicalTable',
      headers: ['Fármaco', 'Faixas de dose (referências do acervo)', 'Notas'],
      rows: [
        [
          'Hidrocodona',
          '0,22–0,5 mg/kg PO q6–12h (variação entre manuais); até 1 mg/kg q6h em casos selecionados (Plumb’s) com cautela sedativa',
          'Mainstay antitussígeno; melhor prevenir tosse do que abortar crise instalada.',
        ],
        [
          'Butorfanol',
          '0,5–0,55 mg/kg PO q6–12h crônico; crise IV/IM 0,2–0,4 mg/kg (BSAVA); PO 0,5–1,0 mg/kg q6–12h (Plumb’s)',
          'Opioide misto agonista-antagonista.',
        ],
      ],
    },
    tcCorticosteroides:
      'Crise: dexametasona 0,05–0,1 mg/kg IV/SQ/IM q12–24h ou dose única 0,10–0,25 mg/kg IV (textos de emergência/respiratório). Curso curto oral prednisona 0,25–0,5 mg/kg q12h ou 0,5–1 mg/kg q24h com desmame. Preferir, quando necessário prolongado, esquema inalatório para reduzir efeitos sistêmicos (Johnson).',
    tcBroncodilatadores:
      'Controversos no colapso “puro”; mais lógicos com broncomalácia/bronquite: teofilina LP 5–10 mg/kg BID (respiratório) ou faixas mais amplas em emergência; aminofilina; terbutalina em crise broncoespástica (BSAVA) — sempre com monitorização.',
    tcAntibioticos:
      'Não rotina. Usar com citologia/cultura compatíveis ou pneumonia. Doxiciclina empírica citada em texto respiratório para trial quando não se pode amostrar (efeito anti-inflamatório leve + Mycoplasma).',
    tcCriseAguda:
      'Oxigénio, mínimo estresse, sedação/antitussígenos, anti-inflamatório; excluir edema/pneumonia. Traqueostomia raramente resolve colapso difuso extenso.',
    tcAnéisExtraluminais:
      'Indicação clássica para colapso cervical/inlet; risco de lesão do nervo laríngeo recorrente (paralisia laríngea iatrogênica possível).',
    tcStentIntraluminal:
      'Considerar quando obstrução respiratória relevante persiste apesar de manejo médico máximo; resultados menos satisfatórios se a queixa principal for apenas tosse sem obstrução funcional grave. Nelson cita sobrevida mediana ~502 dias em série complicada por taxa relevante de eventos adversos; alinhar expectativas com meta-análise 2024 (tosse/complicações frequentes, medicação e revisões contínuas).',
  },
  prevention: {
    tcPrevencaoDescompensacao:
      'Controle de peso, ambiente, peitoral e comorbidades é a “prevenção” de descompensação e de cirurgia de resgate.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-johnson-resp-2020',
      citationText: 'Johnson LR. Canine and Feline Respiratory Medicine, 2nd ed., 2020. Wiley — cap. vias aéreas.',
      sourceType: 'Livro especialidade',
      url: null,
      notes: 'Dinâmica, RX, fluoroscopia, broncomalácia, tratamento clínico.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-nelson-trachea-2020',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — Disorders of the Trachea and Bronchi.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'TBM primária vs secundária, stent, sobrevida.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-drobatz-emerg-2019',
      citationText: 'Drobatz KJ et al. Textbook of Small Animal Emergency Medicine, 2019 — traqueobronquial injury and collapse.',
      sourceType: 'Emergência',
      url: null,
      notes: 'RX vs fluoroscopia, antitussígenos, corticoides, manejo agudo.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-acvs-tracheal-collapse',
      citationText: 'American College of Veterinary Surgeons (ACVS). Tracheal Collapse — recurso educacional.',
      sourceType: 'Revisão especializada',
      url: 'https://www.acvs.org/',
      notes: 'Gradação, indicações cirúrgicas.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-jvim-stent-meta-2024',
      citationText: 'Robin T et al. JVIM. Systematic review and meta-analysis of complications after tracheal stenting in dogs. 2024.',
      sourceType: 'Meta-análise',
      url: 'https://doi.org/10.1111/jvim.17117',
      notes: 'Percentagens de complicações pós-stent.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-kim-tracheal-2024',
      citationText: 'Kim MR et al. Front Vet Sci. Retrospective tracheal collapse small-breed dogs, 2024.',
      sourceType: 'Estudo retrospectivo',
      url: null,
      notes: 'Sobrepeso; grau fluoroscópico vs severidade da tosse.',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
