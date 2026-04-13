import type { ResistanceConceptV2 } from '../model/institutional'

export const RESISTANCE_CONCEPTS_V2: Record<string, ResistanceConceptV2> = {
  mrsp: {
    id: 'mrsp',
    slug: 'mrsp',
    label: 'MRSP (resistência a meticilina em S. pseudintermedius)',
    synonyms: ['meticilina staph dog', 'oxacilina resistente', 'MRSP'],
    definitionShort:
      'Linhagem de Staphylococcus pseudintermedius com mecanismo de resistência a beta-lactâmicos antiestafilocócicos (análogo conceitual ao MRSA em humanos).',
    clinicalImplication: [
      'Empirismo com aminopenicilinas/cefalosporinas de rotina costuma ser inadequado.',
      'Isolamento e precauções seguem protocolo local; antibiograma guia terapia definitiva.',
    ],
    stewardshipBullets: [
      'Não tratar “positivo de swab” sem quadro compatível.',
      'Reavaliar necessidade de ATB sistêmico vs tópico/cirúrgico conforme foco.',
    ],
    relatedPathogenIds: ['staph_pseudintermedius'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_resistance'],
  },

  mrsa: {
    id: 'mrsa',
    slug: 'mrsa',
    label: 'MRSA (resistência a meticilina em S. aureus)',
    synonyms: ['Staph aureus meticilina', 'oxacilina'],
    definitionShort:
      'S. aureus portador do gene mec (ou fenótipo equivalente), com implicações de espectro e controle de infecção.',
    clinicalImplication: [
      'Risco aumentado de falha com beta-lactâmicos beta antiestafilocócicos empíricos.',
      'Infecção profunda ou hospitalar: considerar precaução de contato até definição.',
    ],
    stewardshipBullets: [
      'Descalonar com cultura; evitar dupla cobertura gram-positiva prolongada.',
      'Buscar e tratar foco (drenagem, remoção de implante infectado quando aplicável).',
    ],
    relatedPathogenIds: ['staph_aureus'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_resistance'],
  },

  esbl: {
    id: 'esbl',
    slug: 'esbl',
    label: 'ESBL (beta-lactamases de espectro estendido)',
    synonyms: ['ESBL', 'cefpodoxima resistente', 'cefalosporina 3g resistente'],
    definitionShort:
      'Enzimas que hidrolisam cefalosporinas de amplo espectro e monobactâmicos; frequentemente em Enterobacterales.',
    clinicalImplication: [
      'Sensibilidade “in vitro” pode ser enganosa para alguns beta-lactâmicos — seguir regras do laboratório/protocolo.',
      'Associação frequente com resistência a outros classes (aminoglicosídeos, fluoroquinolonas).',
    ],
    stewardshipBullets: [
      'Infecção hospitalar ou uso prévio de antibiótico: elevar suspeita clínica, não adivinhar sensibilidade.',
      'Precaução de contato pode ser indicada conforme risco epidemiológico local.',
    ],
    relatedPathogenIds: ['e_coli', 'gram_negative_enteric_clinical'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_resistance'],
  },

  intrinsic_resistance: {
    id: 'intrinsic_resistance',
    slug: 'resistencia-intrinseca',
    label: 'Resistência intrínseca',
    synonyms: ['naturalmente resistente', 'espectro inerente'],
    definitionShort:
      'Ausência de atividade de uma classe contra um grupo taxonômico ou metabolismo (ex.: anaeróbios vs aminoglicosídeo).',
    clinicalImplication: [
      'Antibiograma “sensível” enganoso é raro para resistência intrínseca clássica — mas interpretação de relatório exige formação.',
      'Erros de escolha empírica costumam vir de esquecimento de metabolismo anaeróbio/aeróbio.',
    ],
    stewardshipBullets: [
      'Checklist mental: anaeróbio no foco? Gram-negativo não fermentador? Ajustar esquema antes de prolongar curso errado.',
    ],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_resistance'],
  },

  commensal_vs_pathogen: {
    id: 'commensal_vs_pathogen',
    slug: 'comensal-vs-patogeno',
    label: 'Comensal versus patógeno provável',
    synonyms: ['colonização', 'contaminante', 'patógeno'],
    definitionShort:
      'Distinguir crescimento microbiológico de processo infecciosos que exigem tratamento com critério clínico e qualidade da amostra.',
    clinicalImplication: [
      'Bacteriúria assintomática, colonização traqueal pós-intubação e swabs de superfície geram “positivos” de baixo impacto terapêutico.',
      'Febre, leucocitose, dor focal, piora de função orgânica sustentam papel patogênico.',
    ],
    stewardshipBullets: [
      '“Tratar cultura” sem síndrome compatível aumenta C. difficile-like patterns, resistência e custo.',
      'Repetir amostra ou obter material invasivo quando o quadro e o resultado divergem.',
    ],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_sampling'],
  },

  low_value_sample: {
    id: 'low_value_sample',
    slug: 'amostra-baixo-valor',
    label: 'Amostra de baixo valor interpretativo',
    synonyms: ['swab ruim', 'contaminação laboratorial', 'qualidade amostra'],
    definitionShort:
      'Material que não representa o foco infeccioso ou que atravessa flora de superfície de forma inevitável.',
    clinicalImplication: [
      'Resultados polimicrobianos ou “mistos” com baixa correlação clínica não devem disparar esquemas empíricos máximos por rotina.',
    ],
    stewardshipBullets: [
      'Orientar equipe de coleta; preferir aspirado, biópsia, sangue, líquido estéril ou lavado conforme foco.',
      'Registrar na requisição o sítio e a suspeita clínica para o laboratório interpretar comentários.',
    ],
    relatedPathogenIds: ['mixed_flora_contamination'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.microbiology_v2_sampling'],
  },

  adequate_sample_preatb: {
    id: 'adequate_sample_preatb',
    slug: 'amostra-antes-antibiotico',
    label: 'Amostra adequada antes do antimicrobiano',
    synonyms: ['cultura antes', 'hemocultura pré-atb', 'amostragem stewardship'],
    definitionShort:
      'Priorizar coleta representativa antes da primeira dose quando o atraso for clinicamente aceitável — pilar de stewardship.',
    clinicalImplication: [
      'Após antibiótico de amplo espectro, sensibilidade pode ficar falseada ou cultura negativizada.',
      'Sepse: não atrasar dose após estabilização mínima, mas planejar hemocultura e material de foco em paralelo quando possível.',
    ],
    stewardshipBullets: [
      'Definir na unidade fluxo “cultura primeiro quando seguro” vs “dose após primeira punção”.',
      'Reavaliar em 48–72 h com base em cultura identificada.',
    ],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_registry.hospital_culture_timing'],
  },
}

export const RESISTANCE_CONCEPT_IDS_V2 = Object.keys(RESISTANCE_CONCEPTS_V2)

export function listResistanceConceptsV2(): ResistanceConceptV2[] {
  return RESISTANCE_CONCEPT_IDS_V2.map((id) => RESISTANCE_CONCEPTS_V2[id])
}
