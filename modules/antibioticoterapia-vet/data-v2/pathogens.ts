import type { PathogenProfileV2 } from '../model/institutional'

export const PATHOGEN_PROFILES_V2: Record<string, PathogenProfileV2> = {
  staph_pseudintermedius: {
    id: 'staph_pseudintermedius',
    slug: 'staphylococcus-pseudintermedius',
    label: 'Staphylococcus pseudintermedius',
    kind: 'species',
    synonyms: ['staph pseudintermedius', 'S. pseudintermedius', 'piodermite estafilococcica', 'MRSP'],
    habitatSummary:
      'Comensal frequente da pele e mucosas de cães; pode colonizar feridas e superfícies do paciente hospitalizado.',
    clinicalRoleSummary:
      'Agente clássico de piodermites superficiais e profundas; em infecção de pele/tecido mole costuma ser patógeno plausível quando correlacionado clinicamente.',
    resistanceHighlights: [
      'Resistência a meticilina (MRSP) altera completamente a escolha empírica — não presumir sensibilidade a beta-lactâmicos beta.',
      'Antibiograma guia descalonamento; cultura de lesão primária preferível a swab de superfície contaminada.',
    ],
    stewardshipBullets: [
      'Tratar cultura de colonização sem correlação clínica aumenta pressão seletiva.',
      'Duração e via (tópico vs sistêmico) devem seguir resposta e foco.',
    ],
    samplingNotes: [
      'Preferir material representativo da lesão; evitar “swab único” sem critério em lesões crônicas.',
      'Resultado deve ser interpretado junto ao quadro (prurido, dor, celulite, febre).',
    ],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  staph_aureus: {
    id: 'staph_aureus',
    slug: 'staphylococcus-aureus',
    label: 'Staphylococcus aureus',
    kind: 'species',
    synonyms: ['S. aureus', 'estafilococo aureus', 'MRSA'],
    habitatSummary: 'Pode colonizar narinas, pele e feridas; relevância hospitalar e comunitária conforme contexto.',
    clinicalRoleSummary:
      'Patógeno de pele/tecido mole, osteomielite, septicemia e focos profundos; gravidade depende do sítio e do hospedeiro.',
    resistanceHighlights: [
      'MRSA exige cobertura e isolamento conforme protocolo local.',
      'Beta-lactâmicos clássicos frequentemente inadequados empiricamente se MRSA suspeito ou confirmado.',
    ],
    stewardshipBullets: [
      'Hemocultura e material de foco antes de mudanças repetidas de esquema.',
      'Descalonar após identificação e desbridamento quando aplicável.',
    ],
    samplingNotes: ['Múltiplas hemoculturas quando sepse; material de foco sempre que possível.'],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  e_coli: {
    id: 'e_coli',
    slug: 'escherichia-coli',
    label: 'Escherichia coli',
    kind: 'species',
    synonyms: ['E. coli', 'coliforme', 'enterobacteral urinária'],
    habitatSummary: 'Parte da flora entérica; patógeno frequente em ITU, enterites e sepse de origem abdominal.',
    clinicalRoleSummary:
      'Em uropatia sintomática costuma ser patógeno; em fezes pode ser comensal — interpretação depende do sítio e quadro.',
    resistanceHighlights: [
      'ESBL e resistência a quinolonas são epidemiologicamente relevantes — antibiograma guia terapia.',
      'ITU recorrente: cultura antes de novo ciclo empírico repetido.',
    ],
    stewardshipBullets: [
      'Reservar fluoroquinolonas para indicações claras.',
      'Cursos curtos quando o protocolo e a cultura suportarem.',
    ],
    samplingNotes: [
      'Urocultura com técnica adequada; hemocultura se toxemia.',
      'Interpretar bacteriúria assintomática com cautela (muitas vezes não tratar).',
    ],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  enterococcus_spp: {
    id: 'enterococcus_spp',
    slug: 'enterococcus',
    label: 'Enterococcus spp.',
    kind: 'species',
    synonyms: ['enterococo', 'E. faecalis', 'E. faecium'],
    habitatSummary: 'Flora gastrointestinal e ambiental hospitalar; sobrevive bem no ambiente inanimado.',
    clinicalRoleSummary:
      'Patógeno em ITU, abdome, feridas e bacteremia associada a procedimentos; também pode ser contaminante de cultura.',
    resistanceHighlights: [
      'Resistência a vancomicina (VRE) e aminopenicilinas é possível — antibiograma essencial.',
      'Monoterapia bactericida “universal” nem sempre aplicável; combinações dependem de sensibilidade.',
    ],
    stewardshipBullets: [
      'Diferenciar colonização de infecção com critérios clínicos e repetição de culturas quando indicado.',
      'Controle de foco (drenagem, remoção de corpo estranho) frequentemente tão importante quanto o ATB.',
    ],
    samplingNotes: ['Vários isolados de superfície podem refletir colonização, não infecção profunda.'],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  pasteurella_multocida: {
    id: 'pasteurella_multocida',
    slug: 'pasteurella-multocida',
    label: 'Pasteurella multocida',
    kind: 'species',
    synonyms: ['Pasteurella', 'mordedura', 'arranhadura felina'],
    habitatSummary: 'Comensal da orofaringe de cães e gatos; introduzida em ferimentos por mordedura ou lambedura.',
    clinicalRoleSummary:
      'Patógeno típico em feridas por mordedura/agressão animal, celulites e abscessos associados.',
    resistanceHighlights: [
      'Geralmente sensível a beta-lactâmicos com inibidor e outras opções — confirmar com cultura em falha terapêutica.',
      'Polimicrobianismo comum: cobertura anaeróbia pode ser necessária conforme profundidade e tempo de evolução.',
    ],
    stewardshipBullets: [
      'Amostra de abscesso após drenagem costuma ser mais informativa que superfície purulenta isolada.',
      'Profilaxia pós-mordedura segue critério local e risco do ferimento.',
    ],
    samplingNotes: ['Documentar espécie agressora e tempo até atendimento; cultura de pus quando possível.'],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  anaerobes_clinical: {
    id: 'anaerobes_clinical',
    slug: 'anaerobios-relevantes',
    label: 'Anaeróbios clinicamente relevantes (agrupamento)',
    kind: 'group',
    synonyms: ['anaeróbio', 'bacteroides', 'fusobacterium', 'clostridium', 'abscesso', 'empiema'],
    habitatSummary:
      'Predominam em ambientes hipóxicos: abscessos, empiemas, útero/cavidades fechadas, algumas feridas profundas.',
    clinicalRoleSummary:
      'Frequentemente presentes em infecções polimicrobianas profundas; a clínica (odor, gás, tipo de coleção) apoia suspeita.',
    resistanceHighlights: [
      'Cobertura anaeróbia inadequada falha mesmo com “bom” antibiótico para aeróbios.',
      'Cultura anaeróbia depende de coleta e transporte adequados.',
    ],
    stewardshipBullets: [
      'Controle cirúrgico/drenagem muitas vezes determina o desfecho mais que o esquema empírico prolongado.',
      'Evitar metronidazol isolado quando o foco exige cobertura aeróbia Gram-negativa simultânea.',
    ],
    samplingNotes: [
      'Material de abscesso/empiema preferível a swab superficial.',
      'Informar laboratório quando anaeróbios são suspeitos.',
    ],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },

  mixed_flora_contamination: {
    id: 'mixed_flora_contamination',
    slug: 'flora-mista-contaminacao',
    label: 'Flora mista / contaminação provável (agrupamento)',
    kind: 'group',
    synonyms: ['flora mista', 'contaminação', 'polimicrobiano superficial', 'pele normal'],
    habitatSummary:
      'Múltiplos morfotipos de pele, boca e ambiente podem aparecer em culturas de baixa qualidade ou superfície.',
    clinicalRoleSummary:
      'Crescimento polimicrobiano sem correlação clínica pode representar contaminação ou colonização — não automatizar ATB de amplo espectro.',
    resistanceHighlights: [
      '“Cultura positiva” ≠ infecção que exige tratamento sistêmico prolongado.',
      'Resistências múltiplas no antibiograma podem refletir colonização hospitalar sem papel terapêutico claro.',
    ],
    stewardshipBullets: [
      'Repetir amostra com técnica melhor ou amostra tecidual quando o quadro não bate com o resultado.',
      'Discutir com equipe se o achado muda conduta na ausência de sinais sistêmicos.',
    ],
    samplingNotes: [
      'Swab de superfície tem baixo valor interpretativo em muitos contextos.',
      'Preferir biópsia, aspirado, lavado broncoalveolar ou fluido estéril conforme foco.',
    ],
    referenceKeys: ['ref_registry.microbiology_v2_sampling'],
  },

  gram_negative_enteric_clinical: {
    id: 'gram_negative_enteric_clinical',
    slug: 'gram-negativos-entericos',
    label: 'Gram-negativos entéricos de importância clínica (agrupamento)',
    kind: 'group',
    synonyms: [
      'Enterobacterales',
      'bacilo Gram negativo',
      'Klebsiella',
      'Proteus',
      'Pseudomonas',
      'GNR',
    ],
    habitatSummary:
      'Flora intestinal e ambiental; Pseudomonas e outros não fermentadores associados a umidade hospitalar e biofilme.',
    clinicalRoleSummary:
      'Patógenos centrais em ITU, sepse abdominal, pneumonia nosocomial e infecções de ferida — gravidade e espectro variam.',
    resistanceHighlights: [
      'MDR e ESBL exigem revisão de protocolo institucional e, quando aplicável, precauções.',
      'Pseudomonas e outros não fermentadores: antibiograma obrigatório para terapia direcionada.',
    ],
    stewardshipBullets: [
      'Empirismo amplo deve ter data de revisão (48–72 h) e critério de descalonamento.',
      'Dupla cobertura prolongada sem indicação aumenta toxicidade e resistência.',
    ],
    samplingNotes: [
      'Hemocultura e cultura do foco antes de mudanças repetidas de antibiótico, quando seguro.',
      'Infecção hospitalar recente: considerar perfil de resistência local (dados agregados, não suposição individual).',
    ],
    referenceKeys: ['ref_registry.microbiology_v2_general'],
  },
}

export const PATHOGEN_IDS_V2 = Object.keys(PATHOGEN_PROFILES_V2)

export function listPathogenProfilesV2(): PathogenProfileV2[] {
  return PATHOGEN_IDS_V2.map((id) => PATHOGEN_PROFILES_V2[id])
}
