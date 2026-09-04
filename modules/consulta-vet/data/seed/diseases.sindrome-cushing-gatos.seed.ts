import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndrome de Cushing felina — síntese editorial Vetius.
 * Miceli 2022 > Boland 2017 > ALIVE 2025 > Nelson & Couto.
 */
export const sindromeCushingGatosRecord: DiseaseRecord = {
  id: 'disease-sindrome-cushing-gatos',
  slug: 'sindrome-cushing-gatos',
  title: 'Síndrome de Cushing — Gato',
  synonyms: [
    'Hiperadrenocorticismo felino',
    'HAC felino',
    'Hipercortisolismo felino',
    'PDH felino',
    'ADH felino',
    'Feline hyperadrenocorticism',
    'Cushing felino',
  ],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Cortisol',
    'PDH',
    'ADH',
    'Trilostano',
    'LDDST',
    'Diabetes felino',
    'Pele frágil',
    'ALIVE 2025',
    'Miceli 2022',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cushing-gatos'],
  quickSummary:
    'Síndrome de Cushing felina: doença RARA com PDH ~80–85% e ADH ~15–20%. ~80% dos gatos têm ou desenvolvem diabetes mellitus (Miceli et al., 2022). Fragilidade cutânea é cardinal; calcinosis cutis NÃO é típica. ALP frequentemente normal; USG >1,020 comum. LDDST 0,1 mg/kg IV (NÃO dose canina). Trilostano extra-label ~1 mg/kg q12h; monitorar insulina (risco hipoglicemia). Comparar com ficha canina (Hardy et al.; Boland et al., 2017; Miceli et al., 2022).',
  quickDecisionStrip: [
    'Cushing felino é RARO — suspeitar em gato diabético difícil + pele frágil (Miceli et al., 2022).',
    'PDH ~80–85%, ADH ~15–20% — semelhante ao cão, mas apresentação distinta (Miceli et al., 2022).',
    '~80% dos gatos com Cushing têm ou desenvolvem diabetes mellitus (Miceli et al., 2022).',
    'Fragilidade cutânea (pele de papel) é sinal cardinal — calcinosis cutis NÃO é típica (Hardy et al.; Boland et al., 2017).',
    'ALP frequentemente NORMAL no gato — não há isoforma esteróide como no cão (Boland et al., 2017).',
    'USG urinário frequentemente >1,020 — diferente do cão hipostenúurico (Valentin et al., 2014).',
    'LDDST felino: 0,1 mg/kg IV — NÃO usar dose canina 0,01 mg/kg (Valentin et al., 2014; Boland et al., 2017).',
    'ACTHST é pobre triagem felina (~33–60% sensibilidade) — preferir LDDST (Valentin et al., 2014).',
    'Cosintropina 125 mcg/gato (não mg/kg) para ACTHST (Keith et al., 2013).',
    'Trilostano extra-label ~1 mg/kg q12h; coorte Miceli: média 1,3 mg/kg inicial, 1,9 mg/kg final (Miceli et al., 2022).',
    'Monitorar insulina de perto — risco de hipoglicemia quando Cushing é controlado (Miceli et al., 2022).',
    'Subdiagnóstico (subclinical CS) existe — nem todo hipercortisolismo exige tratamento imediato (Niessen et al., 2025).',
    'Tumores secretores de progesterona podem mimetizar Cushing — considerar em fêmea intacta (Boland et al., 2017).',
    'Radioterapia hipofisária é opção em macroadenoma (Yayoshi et al.).',
    'Pneumoperitônio pós-trilostano: relato Kelly 2026 — farmacovigilância, causalidade NÃO comprovada (Kelly et al., 2026).',
    'NÃO aplicar algoritmo canino integralmente ao gato — ver ficha canina para comparação.',
  ],
  quickSummaryRich: {
    lead:
      'Cushing no gato é exceção endócrina, não miniatura do cão. Tríade: diabetes difícil + pele de papel + caquexia. ALIVE usa Síndrome de Cushing como título principal; hiperadrenocorticismo é sinônimo de busca.',
    leadHighlights: ['raro', 'DM', 'pele frágil', 'LDDST 0,1 mg/kg'],
    pillars: [
      {
        title: 'Epidemiologia felina',
        body:
          'PDH 80–85%, ADH 15–20%; DM ~80% (Miceli et al., 2022). Idade média >10 anos; sem predileção racial forte.',
        highlights: ['PDH', 'DM 80%'],
      },
      {
        title: 'Diferenças vs cão',
        body:
          'Pele frágil sim; calcinosis NÃO; ALP normal; USG >1,020; LDDST 0,1 mg/kg; ACTHST pobre triagem (Boland et al., 2017).',
        highlights: ['pele frágil', 'ALP normal'],
      },
      {
        title: 'Tratamento extra-label',
        body:
          'Trilostano ~1 mg/kg q12h; coorte Miceli: 1,3 mg/kg inicial, 1,9 mg/kg final. Vigiar hipoglicemia ao controlar Cushing (Miceli et al., 2022).',
        highlights: ['trilostano', 'hipoglicemia'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagnóstico felino',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Primeira consulta',
          detail:
            'Gato diabético insulinorresistente + pele extremamente frágil + caquexia/má cicatrização (Hardy et al.; Boland et al., 2017).',
        },
        {
          label: 'Excluir mimics',
          detail:
            'Tumor secretor de progesterona em fêmea intacta; iatrogênia por glicocorticoide tópico/sistêmico (Boland et al., 2017).',
        },
        {
          label: 'Banco mínimo',
          detail:
            'Glicemia, frutosamina, bioquímica (ALP frequentemente normal), urinálise (USG >1,020 comum), UPC se indicado.',
        },
        {
          label: 'Triagem endócrina',
          detail:
            'LDDST 0,1 mg/kg IV dexametasona — NÃO 0,01 mg/kg canina (Valentin et al., 2014). ACTHST: sensibilidade ~33–60% — pobre triagem.',
        },
        {
          label: 'Confirmar e diferenciar',
          detail:
            'eACTH + ultrassom abdominal (PDH bilateral vs ADH unilateral). Subdiagnóstico: hipercortisolismo bioquímico sem sinais completos — nem todo caso exige tratamento (Niessen et al., 2025).',
        },
        {
          label: 'Imagem hipofisária selecionada',
          detail:
            'Macroadenoma: radioterapia hipofisária é opção (Yayoshi et al.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terapêutico felino',
      steps: [
        {
          label: 'Trilostano extra-label',
          dose: '~1 mg/kg PO q12h inicial (Miceli: média 1,3 mg/kg → 1,9 mg/kg final)',
          duration: 'Reavaliar 10–14 dias',
          detail:
            'Extra-label; melhora clínica e controle glicêmico em parte dos casos (Miceli et al., 2022; Keith et al., 2013).',
        },
        {
          label: 'Ajuste insulina',
          reassess: 'Reduzir insulina conforme glicemia — risco hipoglicemia ao controlar Cushing',
          detail:
            'Monitoramento domiciliar de glicemia; curvas/CGM quando disponível (Miceli et al., 2022).',
        },
        {
          label: 'Manejo pele frágil',
          detail:
            'Minimizar manipulação, evitar punções desnecessárias, proteger ambiente doméstico (Hardy et al.).',
        },
        {
          label: 'Alternativas',
          detail:
            'Adrenalectomia unilateral ADH; radioterapia macroadenoma (Yayoshi et al.); hipofisectomia em centro especializado.',
        },
        {
          label: 'Farmacovigilância',
          detail:
            'Kelly et al. (2026): pneumoperitônio pós-trilostano relatado — causalidade NÃO comprovada; informar tutor.',
        },
      ],
    },
  },
  etiology: {
    classificacao:
      'PDH ~80–85% (adenoma hipofisário); ADH ~15–20% (tumor adrenal autônomo). Iatrogênico por glicocorticoide tópico/sistêmico. Subdiagnóstico (ALIVE). Tumores secretores de progesterona mimics em fêmeas intactas (Niessen et al., 2025; Boland et al., 2017).',
    progesterona:
      'Tumor ovariano/progesterona pode induzir hipercortisolismo funcional — ovariohisterectomia pode resolver (Boland et al., 2017).',
  },
  epidemiology: {
    raridade:
      'Muito menos frequente que no cão. Idade média >10 anos; sem predileção racial definida (Miceli et al., 2022).',
    diabetes:
      '~80% dos gatos com Cushing têm ou desenvolvem diabetes mellitus — remodela apresentação e conduta (Miceli et al., 2022).',
    distribuicao:
      'PDH 80–85%, ADH 15–20% — proporção semelhante ao cão, mas apresentação clínica distinta (Miceli et al., 2022).',
  },
  pathogenesisTransmission: {
    transmissao: 'Não contagioso. Neoplasia endócrina ou iatrogênia (Niessen et al., 2025).',
    peleFragil:
      'Cortisol crônico → catabolismo colágeno dérmico acentuado → pele de papel, equimoses, má cicatrização (Hardy et al., 2023; Boland et al., 2017).',
    figuraPeleFragil: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/laceracao-pele-fragil-hardy-fig3.jpg',
      alt: 'Laceração de espessura total em gato com hipercortisolismo hipófise-dependente',
      caption:
        'Ferida de espessura total com tecido subcutâneo visível — fragilidade cutânea associada ao hipercortisolismo felino (Hardy et al., 2023). CC BY-NC 4.0.',
    },
    figuraCtPituitaria: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/ct-pituitaria-hardy-fig4.jpg',
      alt: 'TC de massa hipofisária aumentada em gato com PDH',
      display: 'wide',
      caption:
        'TC demonstrando hipófise aumentada (seta) em gato com hipercortisolismo hipófise-dependente — imagem caracteriza anatomia, não substitui testes hormonais (Hardy et al., 2023). CC BY-NC 4.0.',
    },
    figuraLaceracaoExtensa: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-gatos/laceracao-extensa-hardy-fig7.jpg',
      alt: 'Laceração extensa de pele em flanco esquerdo de gato cushingoide',
      caption:
        'Laceração extensa secundária à fragilidade cutânea — pode limitar qualidade de vida apesar de controle parcial do cortisol (Hardy et al., 2023). CC BY-NC 4.0.',
    },
    subdiagnostico:
      'Hipercortisolismo documentado com sinais incompletos — ALIVE reconhece subdiagnóstico; conduta individualizada (Niessen et al., 2025).',
  },
  pathophysiology: {
    tabelaComparacaoCaoGato: {
      kind: 'clinicalTable' as const,
      title: 'Comparação cão vs gato — Síndrome de Cushing',
      headers: ['Aspecto', 'Cão', 'Gato'],
      rows: [
        ['Frequência', 'Relativamente comum', 'Raro (Miceli et al., 2022)'],
        ['PDH / ADH', '80–85% / 15–20%', '80–85% / 15–20%'],
        ['Diabetes mellitus', 'Possível', '~80% dos casos (Miceli et al., 2022)'],
        ['Calcinosis cutis', '8–15%', 'NÃO típica (Boland et al., 2017)'],
        ['Fragilidade cutânea', 'Menos marcante', 'Cardinal (Hardy et al.)'],
        ['ALP', '85–95% elevada (isoforma esteróide)', 'Frequentemente normal (Boland et al., 2017)'],
        ['USG urinário', 'Frequentemente <1,020', 'Frequentemente >1,020 (Valentin et al., 2014)'],
        ['LDDST dose', '0,01 mg/kg IV', '0,1 mg/kg IV (Valentin et al., 2014)'],
        ['ACTHST triagem', 'Sensibilidade ~85% PDH', 'Sensibilidade ~33–60% (Valentin et al., 2014)'],
        ['Cosintropina', '5 µg/kg IV (máx. 250 µg)', '125 mcg/gato (Keith et al., 2013)'],
        ['Trilostano', '1 mg/kg q12h ou 2 mg/kg q24h', 'Extra-label ~1 mg/kg q12h (Miceli et al., 2022)'],
      ],
    },
    diabetes:
      'Resistência insulínica por cortisol crônico → diabetes difícil de controlar apesar de doses elevadas de insulina (Miceli et al., 2022).',
    dermatologico:
      'Pele extremamente fina, equimoses espontâneas, má cicatrização. Calcinosis cutis NÃO é manifestação típica felina (Boland et al., 2017).',
    hepatico:
      'ALP frequentemente normal — gato não induz isoforma esteróide como cão (Boland et al., 2017).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [{
        finding: 'Fragilidade cutânea extrema (pele de papel)',
        mechanism: 'Catabolismo acentuado de colágeno dérmico e capilares frágeis.',
        clinicalMeaning: 'Sinal cardinal; calcinosis NÃO típica (Hardy et al.; Boland et al., 2017).',
        priority: 'common',
      }],
    },
    {
      system: 'metabolic',
      findings: [{
        finding: 'Diabetes mellitus insulinorresistente',
        mechanism: 'Cortisol antagoniza insulina periférica.',
        clinicalMeaning: '~80% dos casos; tratar Cushing pode reduzir necessidade de insulina (Miceli et al., 2022).',
        priority: 'common',
      }],
    },
    {
      system: 'general',
      findings: [{
        finding: 'Caquexia / emagrecimento',
        mechanism: 'Catabolismo proteico crônico apesar de polifagia possível.',
        clinicalMeaning: 'Contraste com obesidade abdominal canina.',
        priority: 'common',
      }],
    },
    {
      system: 'renal',
      findings: [{
        finding: 'USG frequentemente >1,020',
        mechanism: 'Menor impacto na concentração urinária que no cão.',
        clinicalMeaning: 'PU/PD pode existir sem hipostenúuria marcada (Valentin et al., 2014).',
        priority: 'common',
      }],
    },
    {
      system: 'hepatic',
      findings: [{
        finding: 'ALP normal ou discretamente elevada',
        mechanism: 'Ausência de isoforma ALP esteróide induzida.',
        clinicalMeaning: 'ALP normal NÃO exclui Cushing felino (Boland et al., 2017).',
        priority: 'common',
      }],
    },
    {
      system: 'neurologic',
      findings: [{
        finding: 'Sinais neurológicos (macroadenoma)',
        mechanism: 'Compressão hipofisária.',
        clinicalMeaning: 'Discutir radioterapia (Yayoshi et al.).',
        priority: 'emergency',
      }],
    },
  ],
  diagnosis: {
    abordagem:
      'Suspeitar em gato diabético difícil + pele frágil. LDDST 0,1 mg/kg IV é preferencial; ACTHST é pobre triagem (Valentin et al., 2014; Boland et al., 2017).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'LDDST felino — 0,1 mg/kg IV (NAO dose canina)',
      headers: ['Etapa', 'Detalhe'],
      rows: [
        ['Dose', 'Dexametasona 0,1 mg/kg IV'],
        ['Colheitas', 'Cortisol basal, 4 h e 8 h'],
        ['Interpretacao', 'Cortisol 8 h acima do corte confirma'],
        ['Nota', 'Dose canina 0,01 mg/kg e inadequada no gato (Valentin et al., 2014)'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'ACTHST felino — limitacoes',
      headers: ['Aspecto', 'Detalhe'],
      rows: [
        ['Dose cosintropina', '125 mcg/gato IV/IM (Keith et al., 2013)'],
        ['Sensibilidade triagem', '~33–60% — pobre triagem (Valentin et al., 2014)'],
        ['Uso principal', 'Monitoramento trilostano; iatrogenia'],
        ['NAO usar', 'Como unico teste de triagem quando LDDST disponivel'],
      ],
    },
    subdiagnostico:
      'Subdiagnostico ALIVE: hipercortisolismo bioquimico sem sinais completos. Nem todo caso exige tratamento imediato — individualizar (Niessen et al., 2025).',
    progesterona:
      'Femea intacta: considerar tumor secretor de progesterona antes de rotular Cushing (Boland et al., 2017).',
  },
  treatment: {
    trilostano: {
      dose: 'Extra-label ~1 mg/kg PO q12h inicial (Miceli et al., 2022; Keith et al., 2013).',
      coorteMiceli: 'Media 1,3 mg/kg dose inicial, 1,9 mg/kg dose final na coorte Miceli 2022.',
      monitoramento: [
        'Clínica + glicemia seriada (risco hipoglicemia)',
        'ACTHST 125 mcg/gato para monitoramento',
        'Ajustar insulina conforme controle do Cushing',
        '10–14 dias apos inicio/ajuste',
      ],
    },
    diabetes:
      'Reduzir insulina proativamente quando glicemia cai apos controle do Cushing. Monitoramento domiciliar essencial (Miceli et al., 2022).',
    peleFragil:
      'Minimizar trauma; proteger ambiente; evitar cateteres e punções repetidas quando possível (Hardy et al., 2023).',
    radioterapia:
      'Macroadenoma hipofisario: radioterapia e opcao (Yayoshi et al.).',
    adrenalectomia:
      'ADH unilateral operavel em centro especializado.',
    farmacovigilancia:
      'Kelly et al. (2026): pneumoperitônio pós-trilostano relatado — causalidade NÃO comprovada; informar tutor (Kelly et al., 2026).',
  },
  prevention: {
    deteccaoPrecoce:
      'Gato diabético insulinorresistente: investigar Cushing antes de escalar insulina indefinidamente (Miceli et al., 2022).',
    errosComuns: [
      'Aplicar algoritmo canino integralmente (LDDST 0,01 mg/kg, ACTHST como triagem).',
      'ALP normal exclui Cushing felino.',
      'Esperar calcinosis cutis como sinal cardinal.',
      'Ignorar fragilidade cutânea em gato diabético.',
      'Nao ajustar insulina ao controlar Cushing (risco hipoglicemia).',
      'Usar dose canina de cosintropina (5 mcg/kg) em vez de 125 mcg/gato.',
      'Confundir tumor secretor de progesterona com Cushing.',
      'Tratar subdiagnóstico sem critério clínico (Niessen et al., 2025).',
      'Assumir causalidade do pneumoperitoneo pos-trilostano (Kelly et al., 2026).',
      'Nao cross-linkar com ficha canina para comparacao.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'sindrome-cushing-caes',
    'diabetes-mellitus-felina',
    'hipoadrenocorticismo-addison',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    { id: 'ref-cush-fel-miceli-2022', citationText: 'Miceli DD et al. Trilostane in feline hyperadrenocorticism: multicentre study. J Feline Med Surg. 2022.', sourceType: 'Estudo multicéntrico', url: 'https://doi.org/10.1177/1098612X211069123', evidenceLevel: 'B' },
    { id: 'ref-cush-fel-alive-2025', citationText: 'Niessen SJM et al. ALIVE: Cushing\'s Syndrome and Hypoadrenocorticism. Vet Sci. 2025;12:761.', sourceType: 'Consenso ALIVE', url: 'https://doi.org/10.3390/vetsci12080761', evidenceLevel: 'A — terminologia' },
    { id: 'ref-cush-fel-hardy', citationText: 'Hardy L et al. Skin fragility in a cat with pituitary-dependent hyperadrenocorticism. JFMS Open Rep. 2023.', sourceType: 'Relato de caso', url: 'https://doi.org/10.1177/20551169231171245', evidenceLevel: 'B/C' },
    { id: 'ref-cush-fel-boland-2017', citationText: 'Boland LA et al. Peculiarities of feline hyperadrenocorticism. JFMS. 2017.', sourceType: 'Revisão temática', url: 'https://doi.org/10.1177/1098612X17723245', evidenceLevel: 'B' },
    { id: 'ref-cush-fel-valentin-2014', citationText: 'Valentin SY et al. Spontaneous feline hyperadrenocorticism: 30 cases. JVIM. 2014.', sourceType: 'Serie retrospectiva', url: 'https://doi.org/10.1111/jvim.12298', evidenceLevel: 'B' },
    { id: 'ref-cush-fel-keith-2013', citationText: 'Keith AMM et al. Trilostane therapy in cats with spontaneous HAC. JVIM. 2013.', sourceType: 'Estudo clinico', url: 'https://doi.org/10.1111/jvim.12178', evidenceLevel: 'B/C' },
    { id: 'ref-cush-fel-yayoshi', citationText: 'Yayoshi N et al. Radiotherapy for feline pituitary macroadenoma. J Vet Med Sci. 2022.', sourceType: 'Estudo clinico', url: 'https://doi.org/10.1292/jvms.22-0021', evidenceLevel: 'B/C' },
    { id: 'ref-cush-fel-kelly-2026', citationText: 'Kelly S et al. Pneumoperitoneum following trilostane in a cat. Vet Rec Case Rep. 2026.', sourceType: 'Relato farmacovigilancia', url: 'https://doi.org/10.1002/vrc2.70284', evidenceLevel: 'C — causalidade não comprovada' },
    { id: 'ref-cush-fel-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 50.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-cush-fel-cook-2021', citationText: 'Cook AK, Evans JB. Cushingoid diabetic cat. JFMS. 2021.', sourceType: 'Revisão narrativa', url: 'https://doi.org/10.1177/1098612X20979507', evidenceLevel: 'B' },
    { id: 'ref-cush-fel-plumb-2023', citationText: 'Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Trilostane.', sourceType: 'Formulário', evidenceLevel: 'Referência farmacológica' },
    { id: 'ref-cush-fel-behrend-vin-2022', citationText: 'Behrend EN. Canine/feline hyperadrenocorticism (VIN, 2022).', sourceType: 'Revisão VIN', evidenceLevel: 'B' },
  ],
  isPublished: true,
  source: 'seed',
};
