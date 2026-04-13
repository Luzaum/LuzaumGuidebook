/**
 * Fichas clínicas v2 — alinhadas aos moleculeIds dos regimes da engine.
 * Conteúdo educacional; referências apenas como placeholders.
 */

export interface AntibioticSheetV2 {
  id: string
  slug: string
  displayName: string
  classLabel: string
  subclassLabel: string
  mechanismSummary: string
  pkpdSummary: string
  spectrumSummary: string
  usesInApp: string[]
  patientCautions: string[]
  adverseEffects: string[]
  stewardshipNotes: string[]
  synonyms: string[]
  referenceKeys: string[]
}

/** Moléculas que aparecem em pelo menos um regime v2 (regimens.ts). */
export const V2_LIBRARY_MOLECULE_IDS: string[] = [
  'mol_amoxicillin_clavulanate',
  'mol_ampicillin_sulbactam',
  'mol_cefazolin',
  'mol_clindamycin',
  'mol_doxycycline',
  'mol_enrofloxacin',
  'mol_gentamicin',
  'mol_marbo',
  'mol_metronidazole',
]

export const ANTIBIOTIC_SHEETS_V2: Record<string, AntibioticSheetV2> = {
  mol_amoxicillin_clavulanate: {
    id: 'mol_amoxicillin_clavulanate',
    slug: 'amoxicilina-acido-clavulanico',
    displayName: 'Amoxicilina + ácido clavulânico',
    classLabel: 'Beta-lactâmicos',
    subclassLabel: 'Aminopenicilina + inibidor de beta-lactamase',
    mechanismSummary:
      'Ligação a PBPs e bloqueio da síntese da parede celular; o clavulanato inativa muitas beta-lactamases.',
    pkpdSummary:
      'Beta-lactâmico dependente do tempo acima do MIC (T>MIC); administração fracionada costuma favorecer eficácia.',
    spectrumSummary:
      'Boa atividade contra vários Gram-positivos e Gram-negativos não produtores de beta-lactamases de amplo espectro; cobertura ampliada versus amoxicilina isolada.',
    usesInApp: [
      'ITU inferior não complicada e transições em quadros uterinos (regimes v2).',
      'Pneumonia ambulatorial (alternativa) em esquemas v2.',
    ],
    patientCautions: [
      'Gestação: histórico de uso com critério; avaliar risco-benefício localmente.',
      'Função renal/hepática: revisar dose e intervalo conforme protocolo.',
      'Hipersensibilidade a penicilinas: contraindicação relativa/absoluta conforme gravidade.',
    ],
    adverseEffects: [
      'Gastrointestinais (vômito, diarreia), especialmente com clavulanato.',
      'Reações de hipersensibilidade.',
    ],
    stewardshipNotes: [
      'Preferir como opção de espectro mais estreito que fluoroquinolonas em ITU simples quando aplicável.',
      'Evitar uso prolongado sem cultura em recidivas.',
    ],
    synonyms: ['amoxi clav', 'amoxicilina clavulanato', 'co-amoxiclav', 'amoxicillin clavulanate', 'amoxi-clav'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_amox_clav'],
  },

  mol_ampicillin_sulbactam: {
    id: 'mol_ampicillin_sulbactam',
    slug: 'ampicilina-sulbactam',
    displayName: 'Ampicilina + sulbactam',
    classLabel: 'Beta-lactâmicos',
    subclassLabel: 'Aminopenicilina + inibidor de beta-lactamase',
    mechanismSummary: 'Inibição de síntese de peptidoglicano; sulbactam protege contra degradação por algumas beta-lactamases.',
    pkpdSummary: 'Perfil T>MIC típico de beta-lactâmicos; infusão prolongada pode ser estratégia em protocolos hospitalares.',
    spectrumSummary:
      'Cobre diversos Gram-positivos e Gram-negativos, incluindo alguns produtores de beta-lactamase; não cobre MRSP/MRSA por si só.',
    usesInApp: [
      'Esquemas IV hospitalares em piometra/metrite, ITU complicada, pneumonia internada, sepse e piotórax (v2).',
      'Base empírica em muitos regimes de ampliação até cultura.',
    ],
    patientCautions: [
      'Alergia a penicilinas.',
      'Ajuste renal; monitorização em politerapia.',
    ],
    adverseEffects: ['Reações cutâneas e GI', 'Reações de hipersensibilidade'],
    stewardshipNotes: [
      'Descalonar após cultura; evitar manter espectro amplo sem critério.',
      'Combinar com outros agentes só quando o protocolo clínico justificar.',
    ],
    synonyms: ['amp sulbactam', 'unasyn', 'ampicillin sulbactam'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_amp_sulb'],
  },

  mol_cefazolin: {
    id: 'mol_cefazolin',
    slug: 'cefazolina',
    displayName: 'Cefazolina (1ª geração)',
    classLabel: 'Cefalosporinas',
    subclassLabel: '1ª geração — parenteral',
    mechanismSummary: 'Ligação a PBPs e bloqueio da parede celular; instável a muitas beta-lactamases.',
    pkpdSummary: 'T>MIC; uso típico em dose única ou curta para profilaxia perioperatória em protocolos.',
    spectrumSummary: 'Boa atividade contra muitos cocos Gram-positivos e alguns Gram-negativos; não cobre anaeróbios.',
    usesInApp: ['Profilaxia cirúrgica típica no perfil perioperatório v2.'],
    patientCautions: ['Alergia a beta-lactâmicos (cautela cruzada)', 'Ajuste renal em doses repetidas'],
    adverseEffects: ['Reações de hipersensibilidade', 'Flebite em IV'],
    stewardshipNotes: [
      'Profilaxia: duração mínima eficaz; não substituir terapêutica de infecção estabelecida.',
      'Colonização por MRSP/MRSA pode exigir adaptação institucional.',
    ],
    synonyms: ['cefazolin', 'cefazolina', 'ancef'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_cefazolin'],
  },

  mol_clindamycin: {
    id: 'mol_clindamycin',
    slug: 'clindamicina',
    displayName: 'Clindamicina',
    classLabel: 'Lincosamidas',
    subclassLabel: 'Inibição da síntese proteica (subunidade 50S)',
    mechanismSummary: 'Ligação à subunidade 50S do ribossomo; efeito bacteriostático ou bactericida conforme concentração e patógeno.',
    pkpdSummary: 'Penetração tecidual relevante; atenção à cobertura de aeróbios Gram-negativos (geralmente pobre).',
    spectrumSummary: 'Anaeróbios e muitos Gram-positivos; não é monoterapia empírica de Gram-negativos.',
    usesInApp: ['Alternativa em esquemas uterinos e piotórax (v2) em combinação conforme regime.'],
    patientCautions: [
      'Risco de colite associada a antibiótico (C. difficile / similares).',
      'Cautela hepática e interações.',
    ],
    adverseEffects: ['GI', 'Reações cutâneas'],
    stewardshipNotes: ['Associar a cobertura GN quando o foco exigir', 'Evitar monoterapia empírica polimicrobiana GN+anaeróbio sem critério'],
    synonyms: ['clinda', 'clindamycin'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_clinda'],
  },

  mol_doxycycline: {
    id: 'mol_doxycycline',
    slug: 'doxiciclina',
    displayName: 'Doxiciclina',
    classLabel: 'Tetraciclinas',
    subclassLabel: 'Inibição da síntese proteica (30S)',
    mechanismSummary: 'Ligação ribossomal 30S; bacteriostática na maioria dos cenários.',
    pkpdSummary: 'Meia-vida longa permite intervalos maiores; atenção a formulação e esofagite em felinos.',
    spectrumSummary: 'Amplo espectro incluindo alguns intracelulares e patógenos respiratórios em contexto ambulatorial.',
    usesInApp: ['Pneumonia ambulatorial estável (regime v2).'],
    patientCautions: [
      'Gestação e lactação: classicamente desaconselhada.',
      'Filhotes: dentição/esmalte.',
      'Gatos: risco de esofagite — hidratar/administrar conforme protocolo.',
    ],
    adverseEffects: ['Náusea/vômito', 'Fotossensibilidade (menos comum em vet)'],
    stewardshipNotes: ['Não primeira linha empírica universal; reservar conforme suspeita etiológica e cultura'],
    synonyms: ['doxy', 'doxycycline', 'doxiciclina'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_doxy'],
  },

  mol_enrofloxacin: {
    id: 'mol_enrofloxacin',
    slug: 'enrofloxacina',
    displayName: 'Enrofloxacina',
    classLabel: 'Fluoroquinolonas',
    subclassLabel: 'Inibidor de DNA girase/topoisonmerase',
    mechanismSummary: 'Interfere na replicação bacteriana; concentração-dependente para muitos patógenos.',
    pkpdSummary: 'Cmax/MIC relevante; cautela de dose em felinos (retinopatia) conforme bula/protocolo.',
    spectrumSummary: 'Amplo espectro Gram-negativo e alguns Gram-positivos; resistência crescente por uso excessivo.',
    usesInApp: ['Ampliação empírica em pneumonia séptica, sepse, alternativas uterinas e piotórax (v2).'],
    patientCautions: [
      'Gatos: dose e formulário conforme segurança.',
      'Crescimento/cartilagem em animais jovens (critério local).',
      'Comorbidade neurológica: neuroexcitação.',
    ],
    adverseEffects: ['GI', 'Neurotoxicidade (especialmente felinos em overdose)'],
    stewardshipNotes: [
      'Reservar para indicações claras; evitar primeira linha em ITU simples.',
      'Descalonar após cultura.',
    ],
    synonyms: ['enro', 'baytril', 'enrofloxacin'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_enro'],
  },

  mol_marbo: {
    id: 'mol_marbo',
    slug: 'marbofloxacina',
    displayName: 'Marbofloxacina',
    classLabel: 'Fluoroquinolonas',
    subclassLabel: 'Inibidor de DNA girase/topoisonmerase',
    mechanismSummary: 'Similar a outras quinolonas; perfil concentration-dependent.',
    pkpdSummary: 'Meia-vida prolongada em cães; ajustar por espécie e função renal.',
    spectrumSummary: 'Gram-negativos e parte dos Gram-positivos; resistência dependente de pressão de uso.',
    usesInApp: ['Alternativa oral em ITU (regime v2) quando indicada — não como padrão universal.'],
    patientCautions: ['Renal', 'Neurológica', 'Desenvolvimento (critério local)'],
    adverseEffects: ['GI', 'Alterações articulares em animais jovens (debate/literatura)'],
    stewardshipNotes: ['Stewardship: reservar; combinar cultura em recidivas'],
    synonyms: ['marbo', 'marbofloxacin', 'zeniquin'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_marbo'],
  },

  mol_metronidazole: {
    id: 'mol_metronidazole',
    slug: 'metronidazol',
    displayName: 'Metronidazol',
    classLabel: 'Nitroimidazóis',
    subclassLabel: 'Metabolitos tóxicos para anaeróbios',
    mechanismSummary: 'Redução intracelular em anaeróbios gera metabolitos que lesam o DNA.',
    pkpdSummary: 'Boa penetração em tecidos e fluidos; atenção a interações (ex.: varfarina) e neurotoxicidade em overdose.',
    spectrumSummary: 'Anaeróbios e alguns protozoários; sem cobertura relevante de aeróbios Gram-negativos.',
    usesInApp: ['Componente anaeróbio em piometra, piotórax, sepse e perioperatório contaminado (v2).'],
    patientCautions: ['Hepatopatia', 'Neurológico em altas doses/duração prolongada'],
    adverseEffects: ['Náusea, saliva metálica', 'Neurotoxicidade dose/tempo-dependentes'],
    stewardshipNotes: ['Não substituir cobertura GN quando necessária', 'Associar a beta-lactâmico ou outro agente conforme foco'],
    synonyms: ['metro', 'metronidazole', 'flagyl'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_metro'],
  },

  mol_gentamicin: {
    id: 'mol_gentamicin',
    slug: 'gentamicina',
    displayName: 'Gentamicina',
    classLabel: 'Aminoglicosídeos',
    subclassLabel: 'Inibição da síntese proteica (30S) — concentration-dependent',
    mechanismSummary: 'Ligação ao ribossomo 30S; uptake dependente de energia em aeróbios.',
    pkpdSummary: 'Cmax/MIC; necessidade de monitorização e ajuste renal; intervalo estendido em alguns protocolos.',
    spectrumSummary: 'Aeróbios Gram-negativos; sinergia com beta-lactâmicos em alguns cenários; sem anaeróbios.',
    usesInApp: ['Componente GN em piometra séptica e sepse instável (v2).'],
    patientCautions: [
      'Nefrotoxicidade e ototoxicidade.',
      'Gestação: risco placentário/fetal — critério estrito.',
      'Desidratação e insuficiência renal: evitar ou ajustar.',
    ],
    adverseEffects: ['Nefrotoxicidade', 'Ototoxicidade', 'Bloqueio neuromuscular (raro IV rápido)'],
    stewardshipNotes: [
      'Monitorizar função renal; duração mínima necessária.',
      'Não duplicar aminoglicosídeo sem critério.',
    ],
    synonyms: ['genta', 'gentamicin', 'gentamicina'],
    referenceKeys: ['ref_registry.institutional_ccih_2024', 'ref_placeholders.v2_sheet_genta'],
  },
}

export function getAntibioticSheetV2(moleculeId: string): AntibioticSheetV2 | undefined {
  return ANTIBIOTIC_SHEETS_V2[moleculeId]
}

export function listAntibioticSheetsV2(): AntibioticSheetV2[] {
  return V2_LIBRARY_MOLECULE_IDS.map((id) => ANTIBIOTIC_SHEETS_V2[id]).filter(Boolean)
}
