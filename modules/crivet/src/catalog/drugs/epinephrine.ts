import { Drug, DoseUnit } from '../../shared/types/drug';

const toMcgKgMin = (dose: number, unit: DoseUnit) => {
  switch (unit) {
    case 'mcg/kg/min': return dose;
    case 'mcg/kg/h':   return dose / 60;
    case 'mg/kg/min':  return dose * 1000;
    case 'mg/kg/h':    return (dose * 1000) / 60;
    default:           return dose;
  }
};

export const epinephrine: Drug = {
  id: 'epinephrine',
  namePt: 'Epinefrina',
  nameEn: 'Epinephrine',
  synonyms: [
    'Epinephrine',
    'Epinefrina',
    'Adrenaline',
    'Adrenalina',
    'Epinephrine HCl',
  ],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Catecolamina Endógena — Agonista Alfa e Beta Adrenérgico (CRI)',

  clinicalSummary:
    'Catecolamina alfa e beta agonista muito potente, com perfil dose-dependente: em doses baixas predominam efeitos beta-1/beta-2 (inotrópico/cronotrópico + vasodilatação periférica); em doses maiores cresce o componente alfa-1 (vasoconstricção e aumento de RVS). Para o CRIVET é tratada como droga de UTI/centro cirúrgico, útil em: hipotensão anestésica refratária, choque anafilático com choque instalado necessitando titulação contínua, e hipotensão/prevenção de re-arresto no pós-ROSC. Tem custo fisiológico alto: pode aumentar consumo miocárdico de O₂, lactato, arritmias e comprometer perfusão esplâncnica. NÃO é substituta de reposição volêmica. APENAS CRI nesta ficha.',

  physiology:
    'Agonista α1, α2, β1 e β2. Em infusões baixas tende a predominar a resposta beta, com aumento de contratilidade, frequência cardíaca, débito cardíaco e certa vasodilatação periférica. Conforme a dose sobe, cresce o peso alfa-1, com aumento de RVS e da pressão arterial. Em gatos anestesiados com isoflurano, infusões de 0,125–2 μg/kg/min aumentaram FC, índice cardíaco e SVI; MAP subiu a partir de 0,5 μg/kg/min, mas esse ganho veio junto com aumento de lactato e acidose metabólica progressiva, além do efeito proarrítmico. Meia-vida plasmática curtíssima (1–2 min), tornando a CRI ideal para titulação fina.',

  indications: [
    'Hipotensão associada à anestesia quando outras medidas (fluidos, ajuste anestésico, outros inotrópicos/vasopressores) falharam',
    'Choque anafilático com choque já instalado e necessidade de suporte contínuo titulável',
    'Hipotensão por vasodilatação e suporte hemodinâmico no pós-ROSC, inclusive prevenção de re-arresto precoce',
    'Bradicardia severa + hipotensão em cenários selecionados do pós-PCR (monitorização intensiva obrigatória)',
  ],

  contraindications: [
    'Hipovolemia não corrigida — a vasoconstrição alfa-1 pode mascarar a depleção e piorar a perfusão tecidual',
    'Pacientes com ritmo prefibrilatório ou taquiarritmias ventriculares ativas — ação pró-arrítmica pode precipitar FV',
    'Cardiopatia com risco de arritmia — usar somente se o benefício superar claramente o risco',
    'Uso concomitante com fármacos que sensibilizam o miocárdio a arritmias (ex.: halotano)',
    'Acesso periférico ruim ou com alto risco de extravasamento',
    'Monitorização inadequada (ECG + PA contínuos são obrigatórios)',
    'Estados em que o custo pró-arrítmico/metabólico pode superar o benefício hemodinâmico',
  ],

  advantages: [
    'Início de ação muito rápido — efeito em segundos a poucos minutos via IV',
    'Mistura vasopressor + inotrópico + cronotrópico em um único agente',
    'Útil quando se quer corrigir pressão e suporte cardíaco simultaneamente',
    'Muito útil como "ponte" em choque anafilático ou pós-ROSC quando a hemodinâmica muda rapidamente e a droga precisa ser muito titulável',
    'Em choque anafilático canino, infusão contínua mostrou melhor recuperação hemodinâmica do que bolus isolado em modelos experimentais',
  ],

  limitations: [
    'Pró-arrítmica — reduz limiar para arritmias ventriculares, especialmente com halogenados',
    'Pode aumentar lactato e piorar acidose metabólica com infusões mais longas ou doses mais altas',
    'Aumenta o consumo miocárdico de O₂ — risco em isquemia miocárdica',
    'Pode comprometer perfusão esplâncnica e renal',
    'Não deve ser usada para substituir reposição volêmica',
    'Janela terapêutica estreita e grande risco de erro de concentração/unidade (1 mg/mL vs 0,1 mg/mL)',
    'Conflito de fonte sobre o diluente ideal (D5W vs NaCl) — ler a bula da apresentação cadastrada',
  ],

  commonProblems: [
    'Taquicardia sinusal e arritmias ventriculares (CVPs, taquicardia ventricular)',
    'Hipertensão severa transitória',
    'Aumento de lactato e acidose metabólica progressiva em doses mais altas',
    'Hiperglicemia (glicogenólise beta-2)',
    'Hipocalemia (efeito beta-2)',
    'Necrose tecidual por extravasamento',
    'Confusão de concentração: 1 mg/mL (1:1000) vs 0,1 mg/mL (1:10.000)',
  ],

  usageErrors: [
    'Confundir concentração 1 mg/mL com 0,1 mg/mL — erro de 10 vezes',
    'Usar como substituta de reposição volêmica em paciente hipovolêmico',
    'Extravasamento em acesso periférico ruim — necrose isquêmica local',
    'Não monitorar ECG contínuo durante a infusão',
    'Misturar com bicarbonato ou soluções alcalinas — inativação química',
    'Não desmavar gradualmente após estabilização',
    'Usar acima de 0,5–1 mcg/kg/min sem reavaliar o contexto clínico',
  ],

  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'titratable'],
  highAlert: true,

  doses: {
    dog: {
      min: 0.05,
      max: 1,
      unit: 'mcg/kg/min',
      observations:
        'INÍCIO PADRÃO: 0,05 mcg/kg/min. Faixa comum de trabalho: 0,05–0,5 mcg/kg/min. ALERTA FORTE acima de 0,5 mcg/kg/min. Zona avançada: 0,5–1 mcg/kg/min. Acima de 1 mcg/kg/min: somente em hipotensão anestésica refratária com monitorização intensiva (até 2 mcg/kg/min descrito em anestesia). Titular a cada 10–15 minutos ao efeito hemodinâmico. Por cenário: Anafilaxia com choque = 0,05 mcg/kg/min; Anestesia refratária = 0,1–0,5 (até 2) mcg/kg/min; Pós-ROSC = 0,1–0,5 (tabela BSAVA até 1) mcg/kg/min.',
    },
    cat: {
      min: 0.05,
      max: 1,
      unit: 'mcg/kg/min',
      observations:
        'Mesma faixa geral do cão. ATENÇÃO: gatos podem ser mais sensíveis aos efeitos arritmogênicos. Iniciar em 0,05 mcg/kg/min e titular com cautela. ECG contínuo é obrigatório.',
    },
  },

  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mcg/kg/h'],

  presentations: [
    {
      id: 'epinephrine_1mgml_1ml_amp',
      description: 'Epinefrina 1 mg/mL (1:1000) — ampola 1 mL [PADRÃO BR — preferir para CRI]',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 1,
    },
    {
      id: 'epinephrine_1mgml_30ml_vial',
      description: 'Epinefrina 1 mg/mL (1:1000) — frasco multidose 30 mL',
      concentration: 1,
      concentrationUnit: 'mg/mL',
      volume: 30,
    },
    {
      id: 'epinephrine_0_1mgml_10ml',
      description: 'Epinefrina 0,1 mg/mL (1:10.000) — solução injetável 10 mL ⚠️ CONFIRMAR FORÇA: para CRI, usar preferencialmente 1 mg/mL',
      concentration: 0.1,
      concentrationUnit: 'mg/mL',
      volume: 10,
    },
  ],

  safetyMetadata: {
    preferredDiluent: 'Glicose 5%',
    allowedDiluents: ['Glicose 5%', 'NaCl 0.9%', 'Glicose 5% + NaCl 0.9%', 'Ringer Lactato'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: true,
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: true,
    photosensitive: true,
    stabilityAfterDilution:
      'Proteger da luz obrigatoriamente. Descartar imediatamente se a solução estiver rosada, marrom ou com precipitado — indicam oxidação. Preparar próximo do uso. Há conflito de fonte sobre D5W vs NaCl: Plumb\'s lista compatibilidade com D5W; BSAVA Formulary alerta instabilidade em Glicose 5%. Rótulos recentes recomendam soluções com dextrose para proteger da oxidação. Conferir bula da apresentação cadastrada.',
    incompatibilities: [
      'Bicarbonato de sódio (CRÍTICO — inativa a epinefrina quimicamente)',
      'Soluções alcalinas/oxidantes',
      'Aminofilina',
      'Warfarina',
      'Alguns Ionosol específicos',
      'Agentes alcalinos em geral',
    ],
    recommendedMonitoring: [
      'ECG contínuo — OBRIGATÓRIO (risco de arritmias)',
      'Pressão arterial contínua ou muito frequente (preferencialmente invasiva)',
      'Perfusão periférica (TPC, temperatura)',
      'Lactato e tendência (acidose metabólica com doses mais altas)',
      'Glicemia (glicogenólise beta-2)',
      'Potássio sérico (hipocalemia por efeito beta-2)',
      'Inspeção frequente do sítio de infusão (extravasamento)',
    ],
  },

  alerts: [
    {
      id: 'epinephrine-high-alert',
      condition: () => true,
      message: 'MEDICAMENTO DE ALTO RISCO. Dupla checagem obrigatória: concentração da apresentação, volume aspirado, diluente e taxa da bomba antes de iniciar. Janela terapêutica estreita.',
      level: 'danger',
    },
    {
      id: 'epinephrine-concentration-confusion',
      condition: () => true,
      message: 'NUNCA ASSUMA A CONCENTRAÇÃO: Existem apresentações de 1 mg/mL (1:1000) e 0,1 mg/mL (1:10.000). Confundir essas concentrações é um erro de 10 vezes na dose. O cálculo usa SEMPRE a apresentação selecionada.',
      level: 'danger',
    },
    {
      id: 'epinephrine-no-volume-replacement',
      condition: (patient) => patient.comorbidities.includes('hypovolemia') || patient.comorbidities.includes('shock'),
      message: 'HIPOVOLEMIA: Epinefrina NÃO substitui ressuscitação volêmica. Corrigir depleção de volume antes ou concomitantemente. A vasoconstrição alfa pode mascarar a hipovolemia e piorar a perfusão tecidual.',
      level: 'danger',
    },
    {
      id: 'epinephrine-arrhythmia-risk',
      condition: () => true,
      message: 'RISCO DE ARRITMIA: A epinefrina reduz o limiar arrítmico e pode precipitar taquiarritmias ventriculares e fibrilação ventricular. ECG contínuo é obrigatório. Em casos de arritmia, reduzir ou suspender a infusão.',
      level: 'danger',
    },
    {
      id: 'epinephrine-inhalant-arrhythmia',
      condition: () => true,
      message: 'HALOGENADOS: O risco de arritmias é significativamente maior em pacientes sob anestesia com inalatórios (isoflurano, sevoflurano, especialmente halotano). Monitorização rigorosa — usar somente se o benefício superar claramente o risco.',
      level: 'warning',
    },
    {
      id: 'epinephrine-dose-moderate',
      condition: (_patient, dose, unit) => {
        const n = toMcgKgMin(dose, unit as DoseUnit);
        return n > 0.5 && n <= 1;
      },
      message: 'DOSE ALTA (>0,5 mcg/kg/min): Zona de maior risco pró-arrítmico e metabólico. Reavalie: o benefício hemodinâmico supera o custo fisiológico? Monitorar lactato e ECG com ainda mais atenção.',
      level: 'warning',
    },
    {
      id: 'epinephrine-dose-advanced',
      condition: (_patient, dose, unit) => toMcgKgMin(dose, unit as DoseUnit) > 1,
      message: 'DOSE AVANÇADA (>1 mcg/kg/min): Faixa excepcional, somente em hipotensão anestésica refratária com monitorização intensiva. Avaliar se outra estratégia combinada (norepinefrina + dobutamina) não seria mais segura.',
      level: 'danger',
    },
    {
      id: 'epinephrine-extravasation',
      condition: (_patient, _dose, _unit, _diluent, access) => access === 'peripheral',
      message: 'EXTRAVASAMENTO: Acesso periférico aumenta o risco. Extravasamento de epinefrina pode causar vasoconstrição local intensa e necrose tecidual. Use veia calibrosa e inspecione o sítio frequentemente. Prefira acesso central sempre que possível.',
      level: 'danger',
    },
    {
      id: 'epinephrine-bicarbonate-incompatibility',
      condition: () => true,
      message: 'NÃO MISTURAR com bicarbonato de sódio ou soluções alcalinas — inativam quimicamente a epinefrina. Usar soluções compatíveis e linha separada.',
      level: 'danger',
    },
    {
      id: 'epinephrine-diluent-conflict',
      condition: () => true,
      message: 'CONFLITO DE DILUENTE: Há divergência entre as fontes sobre Glicose 5% vs NaCl 0,9% como diluente preferencial. Plumb\'s lista compatibilidade com D5W; BSAVA alerta instabilidade em glicose; rótulos recentes recomendam soluções com dextrose. Consultar a bula específica da apresentação cadastrada.',
      level: 'warning',
    },
    {
      id: 'epinephrine-lactate-warning',
      condition: (_patient, dose, unit) => toMcgKgMin(dose, unit as DoseUnit) >= 0.5,
      message: 'LACTATO/ACIDOSE: Infusões mais altas de epinefrina podem aumentar lactato e piorar acidose metabólica (descrito em gatos com isoflurano a partir de 0,5 mcg/kg/min). Monitorar lactato e gasometria se disponível.',
      level: 'warning',
    },
    {
      id: 'epinephrine-glucose-warning',
      condition: (patient) => patient.comorbidities.includes('endocrinopath'),
      message: 'HIPERGLICEMIA: A epinefrina estimula a glicogenólise via receptores beta-2. Monitorar glicemia, especialmente em pacientes diabéticos ou com infusões prolongadas.',
      level: 'warning',
    },
    {
      id: 'epinephrine-light-protection',
      condition: () => true,
      message: 'PROTEGER DA LUZ: A solução é fotossensível. Descartar imediatamente se estiver rosada, marrom ou com precipitado — são sinais de oxidação e perda de potência.',
      level: 'info',
    },
    {
      id: 'epinephrine-not-clean-pressor',
      condition: () => true,
      message: 'VASOPRESSOR FISIOLOGICAMENTE CARO: Corrige hemodinâmica, mas à custa de maior risco arrítmico, possível elevação de lactato e maior demanda miocárdica. Reavaliar se outra estratégia (ex.: norepinefrina isolada ou combinação com dobutamina) não seria mais fisiológica para o caso.',
      level: 'info',
    },
  ],

  adverseEffects: [
    'Taquicardia sinusal e arritmias ventriculares (CVPs, taquicardia ventricular, fibrilação ventricular)',
    'Hipertensão severa transitória',
    'Aumento de lactato e acidose metabólica progressiva (especialmente em doses ≥0,5 mcg/kg/min)',
    'Isquemia miocárdica (aumento do MVO₂)',
    'Isquemia esplâncnica e renal em doses altas',
    'Hiperglicemia (glicogenólise)',
    'Hipocalemia (efeito beta-2)',
    'Necrose tecidual por extravasamento',
    'Ansiedade, tremores e excitação em pacientes conscientes',
  ],

  detailedInfo: {
    mechanismOfAction:
      'Agonista direto de α1, α2, β1 e β2. Efeito β1 → aumento de inotropismo e cronotropismo. Efeito β2 → broncodilatação e vasodilatação periférica (leitos musculares). Efeito α1 → vasoconstrição periférica, aumento de RVS e da pressão arterial. O perfil dose-dependente explica por que a droga funciona simultaneamente como inotrópico, cronotrópico e vasopressor, e também por que seu custo metabólico/arrítmico aumenta com a dose.',
    metabolism:
      'Rápido, pela COMT (catecol-O-metiltransferase) e MAO (monoamina oxidase) no fígado, rins e outros tecidos.',
    excretion:
      'Renal — metabólitos inativos (principalmente ácido vanilmandélico — VMA).',
    onsetOfAction:
      'IV: imediato (segundos). Efeito hemodinâmico estável com ajuste da CRI geralmente percebido em 1–3 minutos.',
    durationOfAction:
      'Meia-vida plasmática de 1–2 minutos. Efeitos cessam rapidamente após suspensão da infusão — excelente para titulação fina.',
    speciesDifferences:
      'Gatos podem ser mais sensíveis aos efeitos arritmogênicos da epinefrina. Em gatos anestesiados com isoflurano (Lumb & Jones), infusões de 0,125–2 μg/kg/min aumentaram FC, índice cardíaco e SVI, mas MAP só subiu a partir de 0,5 μg/kg/min, acompanhado de aumento progressivo de lactato e acidose metabólica.',
    clinicalObservations:
      'PONTO CRÍTICO — EPINEFRINA vs. NOREPINEFRINA vs. DOBUTAMINA: Epinefrina traz vasoconstrição E inotropia simultaneamente, ao custo de maior risco arrítmico e metabólico. Norepinefrina é mais "limpa" para vasoplegia isolada. Dobutamina é mais "limpa" para baixo débito por contratilidade ruim. Em cenários mistos de pós-ROSC ou anafilaxia grave, a epinefrina pode ser a única opção inicial por sua mistura de efeitos — mas reavaliar rapidamente se é possível simplificar a estratégia.',
    administrationGuidelines:
      'APENAS CRI nesta ficha — não usar como bolus de rotina. Diluir antes de administrar. Concentrações práticas recomendadas: 1 mg em 100 mL = 10 mcg/mL; 0,5 mg em 100 mL = 5 mcg/mL; 1 mg em 10 mL = 100 mcg/mL (solução de trabalho). Concentração clássica de rótulo oficial: 1 mg em 1.000 mL = 1 mcg/mL (pouco prático para muitos pacientes veterinários). Iniciar em 0,05 mcg/kg/min e titular a cada 10–15 minutos. Preferir grande veia ou acesso central. Bomba de infusão ou bomba de seringa obrigatória.',
    maximumUsageTime:
      'Não há limite fixo definido — uso geralmente limitado pelo contexto clínico (indução ao uso da menor dose efetiva pelo menor tempo possível). Desmame gradual após estabilização: rótulos humanos sugerem redução incremental a cada 30 min ao longo de 12–24 h após estabilização hemodinâmica.',
    extraClinicalNotes: [
      'MACETE DIDÁTICO DE CONCENTRAÇÃO: Estoque puro 1 mg/mL = 1.000 mcg/mL. Diluição 1:10 (1 mL em 10 mL total) = 100 mcg/mL. Diluição 1:100 (1 mL em 100 mL total) = 10 mcg/mL.',
      'PRESET 1 — Solução 10 mcg/mL: aspirar 1 mL de epinefrina 1 mg/mL + completar para 100 mL = 10 mcg/mL.',
      'PRESET 2 — Solução 5 mcg/mL: aspirar 0,5 mL de epinefrina 1 mg/mL + completar para 100 mL = 5 mcg/mL.',
      'PRESET 3 — Solução de trabalho 100 mcg/mL: aspirar 1 mL de epinefrina 1 mg/mL + completar para 10 mL = 100 mcg/mL. Útil para pacientes pequenos ou para fazer uma segunda seringa com mais precisão.',
      'PRESET OFICIAL — 1 mcg/mL: 1 mg em 1.000 mL. Pouco prático para maioria dos cães/gatos pela taxa de bomba necessária.',
      'EXEMPLO CLÍNICO (cão 10 kg, 0,1 mcg/kg/min, bomba 10 mL/h, bolsa 100 mL): Passo 1: 0,1 × 10 × 60 = 60 mcg/h. Passo 2: 60 ÷ 10 = 6 mcg/mL (concentração necessária). Passo 3: 6 × 100 = 600 mcg totais. Passo 4: 600 ÷ 1.000 = 0,60 mL a aspirar do estoque 1 mg/mL. Montar: 0,60 mL + diluente até 100 mL → correr a 10 mL/h.',
      'ANAFILAXIA: Em choque anafilático canino, infusão contínua de epinefrina mostrou melhor recuperação hemodinâmica do que bolus isolado em modelos experimentais (Textbook of Small Animal Emergency Medicine).',
    ],
  },

  doseGuides: [
    {
      id: 'epinephrine-anaphylaxis-shock',
      regimen: 'CRI',
      title: 'Choque anafilático com choque instalado',
      indication: 'Anafilaxia com choque presente e necessidade de suporte contínuo titulável',
      species: ['dog', 'cat'],
      doseText: 'Início: 0,05 mcg/kg/min | Titular ao efeito hemodinâmico',
      rationale:
        'Faixa inicial de 0,05 mcg/kg/min descrita pelo Plumb\'s para anafilaxia com choque. Em modelos experimentais caninos, infusão contínua foi superior ao bolus isolado para recuperação hemodinâmica (Textbook of Small Animal Emergency Medicine). Corrigir hipovolemia concomitantemente.',
    },
    {
      id: 'epinephrine-refractory-anesthesia',
      regimen: 'CRI',
      title: 'Hipotensão anestésica refratária',
      indication: 'Hipotensão persistente sob anestesia após falha de outras medidas (fluidos, ajuste anestésico, dobutamina, norepinefrina)',
      species: ['dog', 'cat'],
      doseText: 'Início: 0,1 mcg/kg/min | Faixa prática: 0,1–0,5 mcg/kg/min | Avançado: 0,5–2 mcg/kg/min (monitorização intensiva)',
      rationale:
        'Plumb\'s: 0,125–2 μg/kg/min para hipotensão anestésica. Lumb & Jones: dados experimentais em gatos com isoflurano a 0,125–2 μg/kg/min. Acima de 0,5: risco arrítmico e metabólico cresce significativamente. Usar acima de 1 mcg/kg/min somente quando o benefício supera claramente o risco. Reavaliar se norepinefrina + dobutamina separadas não seriam mais seguras.',
    },
    {
      id: 'epinephrine-post-rosc',
      regimen: 'CRI',
      title: 'Hipotensão pós-ROSC / prevenção de re-arresto',
      indication: 'Hipotensão por vasodilatação ou suporte hemodinâmico após retorno da circulação espontânea',
      species: ['dog', 'cat'],
      doseText: 'Texto BSAVA ECC: 0,1–0,5 mcg/kg/min | Tabela BSAVA ECC: 0,1–1,0 mcg/kg/min',
      rationale:
        'Início em 0,1 mcg/kg/min e titular ao efeito. Acima de 0,5: alerta forte. Reavaliar estratégia à medida que o paciente estabiliza — o objetivo é usar a menor dose efetiva pelo menor tempo possível. Desmame gradual após estabilização.',
    },
    {
      id: 'epinephrine-dose-ranges-summary',
      regimen: 'titratable',
      title: 'Resumo de faixas por cenário',
      species: ['dog', 'cat'],
      doseText: 'Anafilaxia/choque: 0,05 mcg/kg/min | Anestesia refratária: 0,1–0,5 (até 2) | Pós-ROSC: 0,1–0,5 (tabela até 1)',
      rationale:
        'Faixa comum de trabalho no CRIVET: 0,05–0,5 mcg/kg/min. Alerta forte acima de 0,5. Zona avançada: 0,5–1 mcg/kg/min. Acima de 1: apenas excepcional com monitorização intensiva. Titular a cada 10–15 minutos.',
    },
  ],

  diluentGuidance: [
    {
      id: 'epinephrine-diluent-conflict-detail',
      title: '⚠️ Conflito de fonte — confirmar bula da apresentação',
      recommendation: 'Há divergência real entre as fontes: BSAVA Formulary indica instabilidade em Glicose 5%; Plumb\'s lista compatibilidade com D5W; rótulos recentes recomendam soluções com dextrose para proteger da oxidação. NÃO assuma diluente universal — siga a bula da apresentação cadastrada.',
      rationale: 'Conflito documentado entre referências veterinárias e rótulos humanos quanto ao diluente ideal. Glicose 5% com ou sem NaCl é frequentemente preferida em rótulos oficiais por estabilidade; NaCl 0,9% é alternativa comum na prática veterinária.',
      tone: 'warning',
    },
    {
      id: 'epinephrine-diluent-preset-10mcg',
      title: 'Preset — Solução 10 mcg/mL',
      recommendation: '1 mL de epinefrina 1 mg/mL + completar para 100 mL = concentração final 10 mcg/mL.',
      rationale: 'Solução prática para a maioria dos pacientes veterinários de médio porte. Evita taxas de bomba muito altas ou volumes muito pequenos.',
      tone: 'info',
    },
    {
      id: 'epinephrine-diluent-preset-5mcg',
      title: 'Preset — Solução 5 mcg/mL',
      recommendation: '0,5 mL de epinefrina 1 mg/mL + completar para 100 mL = concentração final 5 mcg/mL.',
      rationale: 'Útil quando se quer uma concentração menor para titulação mais lenta e controlada.',
      tone: 'info',
    },
    {
      id: 'epinephrine-diluent-preset-100mcg-working',
      title: 'Preset — Solução de trabalho 100 mcg/mL (1:10)',
      recommendation: '1 mL de epinefrina 1 mg/mL + 9 mL de diluente = 10 mL total = concentração 100 mcg/mL.',
      rationale: 'Útil para pacientes pequenos ou quando o volume calculado da droga pura seria minúsculo. Serve como "solução mãe" para preparar depois uma segunda seringa/bolsa com mais precisão.',
      tone: 'info',
    },
    {
      id: 'epinephrine-diluent-never-bicarb',
      title: 'NUNCA misturar com bicarbonato',
      recommendation: 'Bicarbonato de sódio e soluções alcalinas inativam quimicamente a epinefrina. Usar linha dedicada.',
      rationale: 'Incompatibilidade química documentada — inativação irreversível da catecolamina em meio alcalino.',
      tone: 'danger',
    },
  ],

  accessGuidance: [
    {
      id: 'epinephrine-access-central-preferred',
      title: 'Acesso central ou grande veia — preferir sempre',
      recommendation: 'Preferir acesso venoso central ou grande veia periférica. Infundir em veia calibrosa para reduzir risco de vasoconstrição local concentrada e lesão tecidual.',
      rationale: 'A epinefrina tem potente efeito vasoconstritor alfa-1; extravasamento em veia pequena pode causar necrose isquêmica local importante.',
      tone: 'warning',
    },
    {
      id: 'epinephrine-access-peripheral-risk',
      title: 'Periférico: use apenas com vigilância rigorosa',
      recommendation: 'Se periférico for a única opção, usar veia calibrosa e inspecionar o sítio com frequência muito alta. Qualquer sinal de extravasamento (dor, palidez, frio, edema local): parar imediatamente e trocar o acesso.',
      rationale: 'Extravasamento de epinefrina pode causar necrose isquêmica. Em humanos, fentolamina local é usada como antídoto, mas em veterinária o recurso é limitado.',
      tone: 'danger',
    },
  ],

  infusionGuidance: [
    {
      id: 'epinephrine-infusion-cri-only',
      title: 'APENAS CRI — sem bolus nesta ficha',
      recommendation: 'Esta entrada do catálogo é exclusiva para infusão contínua titulável (CRI/TITRATABLE). Não usar como bolus de rotina.',
      rationale: 'A lógica da epinefrina em CRI é titulação fina ao efeito hemodinâmico. A ficha de bolus/CPA não é gerenciada aqui.',
      tone: 'danger',
    },
    {
      id: 'epinephrine-infusion-start-low',
      title: 'Iniciar baixo — 0,05 mcg/kg/min',
      recommendation: 'Iniciar na dose mais baixa (0,05 mcg/kg/min) e titular a cada 10–15 minutos ao efeito.',
      rationale: 'Dose inicial baixa minimiza risco arrítmico e metabólico. A titulação frequente (10–15 min) é recomendada pelos rótulos oficiais e referências clínicas.',
      tone: 'success',
    },
    {
      id: 'epinephrine-infusion-pump-mandatory',
      title: 'Bomba de infusão — obrigatória',
      recommendation: 'Bomba de infusão ou bomba de seringa são obrigatórias. A droga não pode ser administrada por gotejamento manual.',
      rationale: 'Variações pequenas na taxa entregue têm consequências hemodinâmicas importantes dada a janela terapêutica estreita da epinefrina.',
      tone: 'danger',
    },
    {
      id: 'epinephrine-infusion-targets',
      title: 'Metas clínicas de titulação',
      recommendation: 'Titular ao efeito: ↑ MAP, ↑ perfusão periférica, controle de FC e ritmo no ECG, ↓ lactato ao longo do tempo.',
      rationale: 'MAP adequada com ECG anormal é sinal de que o custo arrítmico da dose pode superar o benefício. Reavaliar estratégia.',
      tone: 'info',
    },
    {
      id: 'epinephrine-infusion-weaning',
      title: 'Desmame gradual — não suspender abruptamente',
      recommendation: 'Após estabilização hemodinâmica, reduzir a dose gradualmente. Rótulos oficiais sugerem redução incremental a cada 30 minutos ao longo de 12–24 h.',
      rationale: 'Suspensão abrupta pode causar queda brusca de pressão, especialmente em pacientes que permanecem dependentes do tônus vasopressor.',
      tone: 'warning',
    },
  ],

  clinicalPearls: [
    '⚠️ EPINEFRINA = mistura vasopressor + inotrópico + cronotrópico. Potente, mas fisiologicamente cara (arritmia, lactato, O₂). Reavaliar se outra combinação (norepinefrina + dobutamina) seria mais fisiológica.',
    '🔢 NUNCA ASSUMA A CONCENTRAÇÃO: 1 mg/mL (1:1000) ≠ 0,1 mg/mL (1:10.000). Erro de 10 vezes. Verificar o rótulo sempre.',
    '💉 APENAS CRI nesta ficha — sem bolus de rotina.',
    '📊 PRESET 10 mcg/mL: 1 mL de epinefrina 1 mg/mL em 100 mL = 10 mcg/mL.',
    '📊 DILUÇÃO 1:10 = 100 mcg/mL | DILUÇÃO 1:100 = 10 mcg/mL | ESTOQUE PURO = 1.000 mcg/mL.',
    '⏱️ TITULAR A CADA 10–15 MIN — faixa comum 0,05–0,5 mcg/kg/min. Alerta forte acima de 0,5.',
    '🩺 ANAFILAXIA: Iniciar em 0,05 mcg/kg/min. Infusão contínua mostrou melhor recuperação hemodinâmica do que bolus isolado em cães (modelo experimental).',
    '❤️ PÓS-ROSC: 0,1–0,5 mcg/kg/min (tabela BSAVA até 1). Menor dose efetiva pelo menor tempo possível.',
    '🔴 NUNCA MISTURAR COM BICARBONATO — inativação química.',
    '💡 PROTEGER DA LUZ. Descartar se rosada ou marrom.',
    '⚗️ CONFLITO DE DILUENTE: verificar bula da apresentação cadastrada. Há divergência D5W vs NaCl entre referências.',
    '🐾 GATOS: Podem ser mais sensíveis a arritmias. ECG contínuo essencial.',
  ],

  references: [
    "Plumb's Veterinary Drug Handbook, 10ª ed. — indicação de CRI para hipotensão anestésica refratária (0,125–2 μg/kg/min), 0,05 μg/kg/min em anafilaxia com choque, estabilidade/compatibilidade, confusão de concentrações, acesso central, extravasamento",
    'Lumb and Jones — Veterinary Anesthesia and Analgesia, 6ª ed. — farmacodinâmica dose-dependente, dados de infusão em gatos anestesiados com isoflurano (0,125–2 μg/kg/min), aumento de MAP a partir de 0,5, elevação de lactato/acidose e risco arrítmico',
    'BSAVA Small Animal Formulary, 10ª ed. — efeitos dose-dependentes, duração curta (2–5 min), risco de overdose, hipovolemia, diabetes, hiper/tireoidismo, sensibilidade à luz/ar, aviso de instabilidade em D5W',
    'BSAVA Manual of Canine and Feline Emergency and Critical Care — pós-ROSC: texto 0,1–0,5 μg/kg/min, tabela 0,1–1,0 μg/kg/min; hipotensão por vasodilatação, bradicardia severa e prevenção de re-arresto',
    'Textbook of Small Animal Emergency Medicine — anafilaxia sistêmica: CRI 0,05 μg/kg/min se choque presente; infusão contínua mais eficaz que bolus isolado em modelos experimentais caninos',
    'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice — faixa geral 0,05–1,0 mcg/kg/min como vasopressor/inotrópico; alerta de efeitos colaterais significativos e pior perfusão esplâncnica',
    'FDA/AccessData e rotulagem oficial atual — solução 1 mg/mL; diluição em soluções com dextrose; concentração clássica 1 mcg/mL (1 mg em 1.000 mL); taxa 0,05–2 μg/kg/min; ajuste a cada 10–15 min; desmame 12–24 h; infundir em grande veia',
    'DailyMed — apresentações atuais: 1 mg/mL em frascos/viais de 1 mL e 30 mL',
    'PubMed / revisão de anafilaxia — modelo experimental canino: infusão contínua melhorou recuperação hemodinâmica vs bolus isolado',
  ],
};
