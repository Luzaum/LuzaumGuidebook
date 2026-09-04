import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Hipotireoidismo congênito (cão e gato) — síntese editorial Vetius.
 * Golinelli 2022 > Van Poucke 2022 > Abitbol 2026.
 */
export const hipotireoidismoCongenitoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-congenito-caes-gatos',
  slug: 'hipotireoidismo-congenito-caes-gatos',
  title: 'Hipotireoidismo congênito (cão e gato)',
  synonyms: [
    'Hipotireoidismo congênito primário',
    'Disgenesia tireoidiana',
    'Disormonogênese congênita',
    'Cretinismo',
    'Nanismo tireoidiano',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'Tireoide',
    'Congênito',
    'TPO',
    'TG',
    'Nanismo',
    'Goitro',
    'Levotiroxina',
    'Tratamento precoce',
    'Genética',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipotireoidismo-congenito-caes-gatos'],
  quickSummary:
    'Hipotireoidismo congênito é deficiência hormonal tireoidiana presente desde o nascimento por disgenesia (glândula ausente/ectópica), disormonogênese (defeito de síntese — mutações TPO, TG, NIS, TSHR) ou, raramente, deficiência central de TSH. Formas goitrosas (síntese bloqueada → TSH alto → bócio) vs não goitrosas (disgenesia/central). Cão: nanismo desproporcional, atraso de ossificação, retenção dentária, mente obtusa, surdez. Gato: crescimento retardado, ataxia, bócio. Tratamento precoce com levotiroxina é crítico — Golinelli et al. (2022) mostram melhor prognóstico neurológico com início <12 semanas. Cão: 0,02 mg/kg q12h; gato: 0,05–0,10 mg/gato q24h (cohort Golinelli usou ~35,3 mcg/kg q12h — não universal). Van Poucke et al. (2022): mutações TPO em gatos. Abitbol et al. (2026): variantes TG em Rottweilers.',
  quickDecisionStrip: [
    'Suspeitar em filhote com nanismo desproporcional, fontanela aberta, dentição retardada, surdez ou mente obtusa (Nelson & Couto, 6ª ed.).',
    'Forma goitrosa: bócio palpável + TSH alto + T4 baixo — defeito de síntese (TPO, TG, NIS) (Van Poucke et al., 2022).',
    'Forma não goitrosa: tireoide ausente/hipoplásica — disgenesia; USG/cintilografia podem confirmar.',
    'Diferenciar nanismo hipofisário (GH baixo, proporções diferentes) de hipotireoidismo congênito — ver tabela comparativa.',
    'TT4 baixo em filhote confirma deficiência; cTSH alto apoia primário; TSH baixo sugere central (raro).',
    'Radiografia: epífises abertas, atraso de ossificação, vértebras hemiplágicas em casos clássicos (Sánchez González et al., 2024).',
    'Tratamento precoce (<12 semanas) melhora prognóstico neurológico — Golinelli et al. (2022).',
    'Cão: levotiroxina 0,02 mg/kg q12h; gato: 0,05–0,10 mg/GATO q24h (Bugbee et al., 2023).',
    'Dose Golinelli ~35,3 mcg/kg q12h é dado de cohort — NÃO protocolo universal.',
    'Rottweiler: investigar variantes TG — Abitbol et al. (2026).',
    'Gato: mutações TPO documentadas — Van Poucke et al. (2022).',
    'French Bulldog: MRI pode documentar alterações esqueléticas/cerebrais (Sánchez González et al., 2024).',
    'Cretinismo é sinônimo histórico — evitar termo pejorativo com tutores; usar hipotireoidismo congênito.',
    'Não atrasar tratamento aguardando genética — iniciar levotiroxina ao confirmar deficiência.',
  ],
  quickSummaryRich: {
    lead:
      'Filhote pequeno demais, ossos atrasados, cabeça grande, orelhas caídas? Pergunte: é nanismo hipofisário ou tireoide congênita? Tratamento precoce muda o prognóstico neurológico — não espere o filhote “crescer sozinho”.',
    leadHighlights: ['nanismo', 'tratamento precoce', 'goitroso', 'TPO'],
    pillars: [
      {
        title: 'Goitroso vs não goitroso',
        body:
          'Goitroso: enzima de síntese defeituosa → TSH elevado estimula bócio. Não goitroso: glândula ausente/hipoplásica (disgenesia) ou deficiência central de TSH (Nelson & Couto, 6ª ed.).',
        highlights: ['goitroso', 'disgenesia'],
      },
      {
        title: 'Genética',
        body:
          'Mutações TPO em gatos (Van Poucke et al., 2022); variantes TG em Rottweilers (Abitbol et al., 2026); TPO/TG/NIS/TSHR em cães por raça.',
        highlights: ['TPO', 'TG', 'Rottweiler'],
      },
      {
        title: 'Tratamento precoce',
        body:
          'Golinelli et al. (2022): início <12 semanas associa-se a melhor desfecho neurológico. Levotiroxina vitalícia na maioria.',
        highlights: ['<12 semanas', 'levotiroxina'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        { label: 'Suspeita clínica', timing: 'Filhote', detail: 'Nanismo, fontanela aberta, dentição retardada, surdez, bócio (Nelson & Couto, 6ª ed.).' },
        { label: 'TT4 + cTSH', timing: 'Confirmação', detail: 'T4 baixo confirma deficiência; TSH alto = primário (Bugbee et al., 2023).' },
        { label: 'Imagem', timing: 'Etiologia', detail: 'USG tireoidiana, radiografias esqueléticas, MRI selecionado (Sánchez González et al., 2024).' },
        { label: 'Genética', timing: 'Selecionado', detail: 'Painel TPO/TG conforme raça — Van Poucke 2022 (felino), Abitbol 2026 (Rottweiler).' },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Início imediato',
          detail: 'Confirmar deficiência → iniciar levotiroxina sem aguardar genética (Golinelli et al., 2022).',
          dose: 'Cão: 0,02 mg/kg q12h; gato: 0,05–0,10 mg/gato q24h.',
          duration: 'Vitalícia na maioria.',
        },
        {
          label: 'Monitoramento',
          detail: 'TT4 4–6 h pós-dose; crescimento, ossificação, neurodesenvolvimento seriados.',
          reassess: 'Cohort Golinelli: ~35,3 mcg/kg q12h — referência, não dose universal.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Deficiência congênita de hormônios tireoidianos por disgenesia (aplasia, hipoplasia, ectopia), disormonogênese (defeitos TPO, TG, NIS, pendrina, TSHR) ou deficiência central de TSH (Nelson & Couto, 6ª ed.).',
    goitrosoVsNaoGoitroso:
      'Goitroso: bloqueio de síntese → feedback positivo → hipertrofia/bócio. Não goitroso: glândula ausente/reduzida (disgenesia) ou TSH central baixo.',
    figuraGoitroso: {
      kind: 'clinicalFigure' as const,
      src: '',
      alt: 'Painéis esquemáticos: hipotireoidismo congênito goitroso (bócio + TSH alto) vs não goitroso (disgenesia, tireoide ausente/hipoplásica)',
      caption:
        'Descrição clínica: forma goitrosa — bócio cervical palpável, TSH elevado, T4 baixo; forma não goitrosa — tireoide não palpável/ausente ao USG, TSH variável conforme etiologia. Imagem ilustrativa não incluída — reconhecimento por exame + laboratório (Nelson & Couto, 6ª ed.).',
    },
    genetica: {
      kind: 'clinicalTable' as const,
      title: 'Mutações por raça/espécie (seleção)',
      headers: ['Gene', 'Espécie/Raça', 'Fenótipo', 'Referência'],
      rows: [
        ['TPO', 'Gato', 'Hipotireoidismo congênito goitroso', 'Van Poucke et al., 2022'],
        ['TG (tireoglobulina)', 'Rottweiler', 'Hipotireoidismo congênito', 'Abitbol et al., 2026'],
        ['TPO', 'Cão (várias raças)', 'Disormonogênese goitrosa', 'Nelson & Couto, 6ª ed.'],
        ['TSHR', 'Cão', 'Resistência ou disfunção receptora', 'Literatura clínica'],
        ['NIS / pendrina', 'Cão/gato', 'Defeito iodário/organelar', 'Disormonogênese rara'],
      ],
    },
    evidenciaAbitbolRottweiler: {
      kind: 'clinicalTable' as const,
      title: 'Evidência — variantes TG em Rottweiler (Abitbol et al., 2026)',
      headers: ['Achado', 'Implicação'],
      rows: [
        ['Variantes TG associadas a hipotireoidismo congênito', 'Teste genético selecionado em Rottweilers afetados'],
        ['Herança familiar sugerida', 'Evitar reprodução de portadores sem aconselhamento'],
        ['Tratamento = levotiroxina', 'Genética não substitui reposição hormonal'],
      ],
    },
    vanPouckeFelino:
      'Van Poucke et al. (2022): mutações TPO identificadas em gatos com hipotireoidismo congênito — apoia teste genético selecionado e aconselhamento reprodutivo.',
    cretinismoHistorico:
      'Cretinismo é sinônimo histórico para hipotireoidismo congênito grave — usar apenas como sinônimo interno; preferir hipotireoidismo congênito com tutores.',
  },
  epidemiology: {
    caes:
      'Raro; maior reconhecimento em raças predispostas (Akita, German Shepherd, Rottweiler, Golden Retriever, etc.). Abitbol et al. (2026) reforçam componente genético em Rottweilers.',
    gatos:
      'Muito raro espontâneo; Van Poucke et al. (2022) documentaram mutações TPO em casos felinos.',
    prognostico:
      'Prognóstico neurológico melhor com tratamento precoce (<12 semanas) — Golinelli et al. (2022). Atraso prolongado pode causar deficiência intelectual e alterações esqueléticas irreversíveis.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Defeito genético ou embriológico → tireoide ausente, ectópica ou incapaz de sintetizar T4/T3.',
      'T4/T3 baixos desde o nascimento → atraso de crescimento, ossificação e mielinização.',
      'TSH alto (formas primárias goitrosas) → hipertrofia glandular/bócio.',
      'Sem tratamento: nanismo, surdez, retardo mental, deformidades esqueléticas.',
    ],
    transmissao: 'Herança genética em mutações conhecidas; aconselhamento reprodutivo recomendado.',
  },
  pathophysiology: {
    tabelaNanismoHipofisario: {
      kind: 'clinicalTable' as const,
      title: 'Nanismo hipofisário vs hipotireoidismo congênito',
      headers: ['Característica', 'Nanismo hipofisário', 'Hipotireoidismo congênito'],
      rows: [
        ['Hormônio deficiente', 'GH (e possivelmente TSH secundário)', 'T4/T3 primários'],
        ['Proporções', 'Proporcionado (Laron-like) ou variável', 'Desproporcional — tronco curto, membros curtos'],
        ['TT4', 'Normal ou baixo (se TSH central)', 'Baixo'],
        ['cTSH', 'Baixo (central) ou normal', 'Alto (primário) ou baixo (central raro)'],
        ['Bócio', 'Ausente', 'Presente em formas goitrosas'],
        ['Tratamento', 'GH exógeno se disponível + manejo tireoidiano', 'Levotiroxina'],
        ['Ossificação', 'Atraso generalizado', 'Epífises abertas, vértebras hemiplágicas clássicas'],
      ],
    },
    tabelaDiferencialNanismo: {
      kind: 'clinicalTable' as const,
      title: 'Diagnósticos diferenciais de nanismo/desproporção em filhotes',
      headers: ['Condição', 'Pista distintiva'],
      rows: [
        ['Hipotireoidismo congênito', 'T4 baixo, bócio possível, surdez, mente obtusa'],
        ['Nanismo hipofisário', 'GH baixo, proporções podem ser diferentes'],
        ['Osteocondrodisplasia', 'Achados radiográficos específicos de raça'],
        ['Malnutrição/desnutrição', 'História dietética; T4 normaliza com nutrição'],
        ['Hipopituitarismo congênito', 'Múltiplas deficiências hormonais'],
        ['Mucopolissacaridose', 'Facies grosseira, opacidade corneal, enzimas lisossômicas'],
      ],
    },
    tabelaRadiografia: {
      kind: 'clinicalTable' as const,
      title: 'Achados radiográficos clássicos',
      headers: ['Achado', 'Significado'],
      rows: [
        ['Epífises abertas persistentes', 'Atraso de ossificação endócrina'],
        ['Vértebras hemiplágicas', 'Sinal clássico de hipotireoidismo congênito canino'],
        ['Fontanela aberta prolongada', 'Atraso de fechamento craniano'],
        ['Membros curtos desproporcionais', 'Nanismo esquelético tireoidiano'],
        ['Dentição retardada', 'Erupção dentária atrasada'],
        ['MRI — French Bulldog', 'Alterações esqueléticas/cerebrais documentadas (Sánchez González et al., 2024)'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Nanismo desproporcional, tronco curto, membros curtos',
          mechanism: 'T4/T3 baixos desde o nascimento retardam ossificação endócrina e crescimento linear.',
          clinicalMeaning: 'Diferenciar de nanismo hipofisário e osteocondrodisplasia (Nelson & Couto, 6ª ed.).',
          priority: 'common',
        },
        {
          finding: 'Fontanela aberta, cabeça grande relativa, orelhas caídas',
          mechanism: 'Atraso de fechamento craniano e cartilagem auricular.',
          clinicalMeaning: 'Sinais clássicos em cães; alertam para investigação precoce.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Retardo mental, mente obtusa, ataxia (gatos)',
          mechanism: 'Hormônios tireoidianos essenciais para mielinização e neurodesenvolvimento fetal/neonatal.',
          clinicalMeaning: 'Tratamento <12 semanas melhora prognóstico (Golinelli et al., 2022).',
          priority: 'common',
        },
        {
          finding: 'Surdez',
          mechanism: 'Alteração do desenvolvimento coclear.',
          clinicalMeaning: 'Pode ser irreversível se tratamento tardio.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'oral',
      findings: [
        {
          finding: 'Retenção de dentes decíduos, erupção dentária tardia',
          mechanism: 'Atraso de ossificação alveolar e erupção.',
          clinicalMeaning: 'Sinal de suporte em filhotes com nanismo.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'Bócio cervical palpável (forma goitrosa)',
          mechanism: 'TSH elevado estimula hipertrofia glandular por bloqueio de síntese.',
          clinicalMeaning: 'Aponta disormonogênese (TPO, TG) — Van Poucke 2022, Abitbol 2026.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'Suspeita clínica em filhote com nanismo + T4 baixo confirma deficiência. cTSH diferencia primário (alto) de central (baixo). Imagem e genética refinam etiologia (Bugbee et al., 2023; Nelson & Couto, 6ª ed.).',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Exame físico + história',
        purpose: 'Suspeita clínica.',
        description: 'Nanismo, fontanela, dentição, surdez, bócio, raça predisposta.',
        interpretation: 'Alta suspeita justifica TT4 imediato.',
        limitations: 'Achados inespecíficos isolados.',
      },
      {
        stepNumber: 2,
        title: 'TT4 + cTSH',
        purpose: 'Confirmar deficiência e localizar.',
        description: 'T4 baixo confirma; TSH alto = primário goitroso/disgenético; TSH baixo = central (Bugbee et al., 2023).',
        interpretation: 'Iniciar levotiroxina ao confirmar — não aguardar genética.',
        limitations: 'Valores de referência pediátricos podem diferir.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Radiografias esqueléticas',
        purpose: 'Documentar atraso de ossificação.',
        description: 'Epífises abertas, vértebras hemiplágicas; MRI em casos selecionados (Sánchez González et al., 2024).',
        interpretation: 'Suporte ao diagnóstico; acompanhar resposta ao tratamento.',
        limitations: 'Não específico isolado.',
      },
      {
        stepNumber: 4,
        title: 'USG tireoidiana + genética',
        purpose: 'Etiologia.',
        description: 'Disgenesia vs disormonogênese; painel TPO/TG conforme espécie/raça (Van Poucke et al., 2022; Abitbol et al., 2026).',
        interpretation: 'Aconselhamento reprodutivo.',
        limitations: 'Disponibilidade variável.',
      },
    ],
  },
  treatment: {
    principio:
      'Reposição hormonal vitalícia na maioria. Tratamento precoce é crítico para neurodesenvolvimento (Golinelli et al., 2022).',
    levotiroxinaCao: [
      '0,02 mg/kg PO q12h (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
      'Monitorar TT4 4–6 h pós-dose; crescimento e ossificação seriados.',
    ],
    levotiroxinaGato: [
      '0,05–0,10 mg/GATO q24h — NÃO mg/kg (Bugbee et al., 2023).',
      'Cohort Golinelli et al. (2022): mediana ~35,3 mcg/kg q12h — dado de série, NÃO protocolo universal.',
    ],
    golinelliNota:
      'Golinelli et al. (2022): tratamento precoce (<12 semanas) associado a melhor desfecho neurológico. Dose do estudo (~35,3 mcg/kg q12h) reflete cohort italiano — titular individualmente.',
    monitoramento: [
      'TT4 seriado 4–6 h pós-dose.',
      'Peso, comprimento, neurodesenvolvimento, audição.',
      'Radiografias de seguimento para ossificação.',
    ],
  },
  prevention: {
    genetica:
      'Teste genético selecionado em linhagens afetadas (TPO felino — Van Poucke 2022; TG Rottweiler — Abitbol 2026). Evitar reprodução de portadores.',
    screening:
      'Filhotes de raças predispostas com nanismo: TT4 precoce antes de rotular osteocondrodisplasia.',
    errosComuns: [
      'Aguardar genética antes de iniciar levotiroxina.',
      'Confundir nanismo hipofisário com tireoidiano.',
      'Usar dose Golinelli como protocolo universal.',
      'Gato: dose em mg/kg como cão.',
      'Rotular cretinismo com tutores — preferir hipotireoidismo congênito.',
      'Atrasar tratamento além de 12 semanas esperando crescimento espontâneo.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['hipotireoidismo-adquirido-caes-gatos'],
  relatedMedicationSlugs: ['levotiroxina-sodica'],
  references: [
    { id: 'ref-hypoc-aaha-2023', citationText: 'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59.', sourceType: 'Diretriz AAHA', evidenceLevel: 'A' },
    { id: 'ref-hypoc-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 48.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypoc-golinelli-2022', citationText: 'Golinelli S, et al. Congenital hypothyroidism: early treatment and neurological outcomes. J Vet Intern Med. 2022.', sourceType: 'Estudo clínico', evidenceLevel: 'B' },
    { id: 'ref-hypoc-vanpoucke-2022', citationText: 'Van Poucke M, et al. TPO mutations in feline congenital hypothyroidism. J Vet Intern Med. 2022.', sourceType: 'Estudo genético', evidenceLevel: 'B' },
    { id: 'ref-hypoc-abitbol-2026', citationText: 'Abitbol O, et al. Thyroglobulin variants in Rottweiler congenital hypothyroidism. J Vet Intern Med. 2026.', sourceType: 'Estudo genético', evidenceLevel: 'B' },
    { id: 'ref-hypoc-sanchez-2024', citationText: 'Sánchez González P, et al. MRI in congenital hypothyroid French Bulldog. Vet Radiol Ultrasound. 2024.', sourceType: 'Estudo por imagem', evidenceLevel: 'C' },
    { id: 'ref-hypoc-plumb-2023', citationText: 'Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Levothyroxine.', sourceType: 'Formulário', evidenceLevel: 'A' },
    { id: 'ref-hypoc-cunningham-2020', citationText: 'Klein BG. Cunningham\'s Textbook of Veterinary Physiology. 6th ed. 2020.', sourceType: 'Fisiologia', evidenceLevel: 'Base fisiológica' },
    { id: 'ref-hypoc-lumb-2023', citationText: 'Lumb WV, Constable PD. Veterinary Medicine. 2023.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypoc-rothrock-vin-2025', citationText: 'Rothrock K. Congenital hypothyroidism review (VIN, 2025). Paráfrase editorial Vetius.', sourceType: 'Revisão VIN', evidenceLevel: 'Consenso prático' },
  ],
  isPublished: true,
  source: 'seed',
};
