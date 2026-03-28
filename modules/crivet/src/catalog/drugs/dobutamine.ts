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

export const dobutamine: Drug = {
  id: 'dobutamine',
  namePt: 'Dobutamina',
  nameEn: 'Dobutamine',
  synonyms: [
    'Dobutamine',
    'Dobutamina',
    'Dobutamine HCl',
    'Cloridrato de dobutamina',
    'Dobutrex',
    'Posiject',
  ],
  category: 'vasopressores_inotropicos',
  pharmacologicalClass: 'Inotrópico Positivo Sintético (Agonista Beta-1 Adrenérgico)',

  clinicalSummary:
    'Inotrópico beta-1 de ação curta e rápida titulação. Indicado quando o problema dominante é BAIXO DÉBITO por contratilidade reduzida, e não vasoplegia pura. Droga de UTI/centro cirúrgico, uso exclusivamente em CRI titulável. Melhor para IC aguda sistólica, choque cardiogênico, hipotensão anestésica por depressão miocárdica e sépsis com hipoperfusão persistente após volume + vasopressor. NÃO é bolus de rotina e NÃO é a melhor escolha quando a hipotensão é predominantemente por vasodilatação.',

  physiology:
    'Agonista beta-1 predominante, com efeitos beta-2 e alfa-1 mais discretos em doses usuais. Aumenta contratilidade e volume sistólico elevando o débito cardíaco, sem depender de liberação de norepinefrina endógena (ao contrário da dopamina). Em doses terapêuticas, tem efeito relativamente menor sobre frequência cardíaca e resistência vascular sistêmica do que outros catecolamínicos. Início rápido (1–2 min), pico em 10 min, meia-vida plasmática de ~2 min — offset rápido após suspensão, ideal para titulação fina. Em doses mais altas pode causar taquicardia, arritmias e aumento da demanda miocárdica de O₂.',

  indications: [
    'Insuficiência cardíaca congestiva aguda (ICC) com baixo débito por disfunção sistólica (ex.: DCM, miocárdio deprimido, pós-cirurgia cardíaca)',
    'Choque cardiogênico',
    'Hipotensão durante anestesia quando a suspeita principal é contratilidade diminuída (depressão miocárdica por inalatórios)',
    'Choque séptico ou sépsis com hipoperfusão persistente e suspeita de componente de baixo débito, geralmente após volume e vasopressor',
    'Suporte inotrópico adjuvante em bradiarritmias específicas com baixo débito, enquanto se conduz a causa, em ambiente monitorado',
    'IC aguda com congestão — pode ajudar a manter perfusão renal e suporte ao diurético, desde que o problema seja falência de bomba e não obstrução fixa',
  ],

  contraindications: [
    'Hipovolemia não corrigida (absoluta — a vasodilatação beta-2 pode precipitar hipotensão grave)',
    'Obstrução fixa de via de saída: estenose aórtica severa, HOCM/HCM obstrutiva (IHSS) — pode piorar a obstrução',
    'Taquiarritmias ventriculares ou supraventriculares não controladas',
    'Fibrilação atrial sem controle adequado de condução atrioventricular',
    'Estados em que o problema dominante seja vasoplegia — dobutamina pode melhorar CO mas não corrigir adequadamente a MAP',
    'Uso "cego" sem ECG e pressão arterial disponíveis',
    'Hipersensibilidade conhecida aos sulfitos (presentes em algumas formulações)',
    'Cautela especial em gatos, principalmente em doses mais altas, pelo maior risco de sinais de SNC e meia-vida mais longa nesta espécie',
  ],

  advantages: [
    'Inotrópico rápido e titulável: onset de 1–2 min, pico em 10 min',
    'Melhor alvo quando o problema é bomba fraca, não vaso frouxo',
    'Menor tendência a vasoconstrição do que a dopamina',
    'Início e offset rápidos — muito úteis em anestesia e UTI para ajustes precisos',
    'Não depende de catecolaminas endógenas armazenadas (eficaz mesmo em corações depletados)',
    'Em IC aguda, costuma ser preferida à dopamina quando se quer aumentar débito com menos aumento de pós-carga',
    'Pode melhorar perfusão renal e suporte ao diurético em IC congestiva por falência de bomba',
  ],

  limitations: [
    'Não é vasopressor puro — pode não corrigir MAP se a hipotensão for predominantemente vasodilatadora',
    'Pode causar taquicardia, taquiarritmia e aumento do consumo miocárdico de O₂ (especialmente em doses >10 mcg/kg/min)',
    'Taquifilaxia/tolerância com infusões prolongadas — frequentemente perceptível em 48–72 h',
    'Em gatos, é mais difícil de usar: risco de tremores e convulsões com doses mais altas, e meia-vida mais longa',
    'Exige bomba de infusão, ECG contínuo e monitorização de pressão arterial',
    'Não é indicada para vasoplegia isolada — nesses casos, a norepinefrina costuma ser a melhor escolha',
  ],

  commonProblems: [
    'Taquicardia sinusal (especialmente em doses >10 mcg/kg/min em cães)',
    'Arritmias ventriculares (CVPs)',
    'Hipotensão se o paciente estiver hipovolêmico ou severamente vasodilatado (efeito beta-2)',
    'Tremores musculares e convulsões em gatos (efeito tóxico no SNC, doses >5 mcg/kg/min)',
    'Taquifilaxia após 48–72 h de infusão contínua',
    'Confusão com dopamina pelo nome similar — risco de erro de fármaco',
  ],

  usageErrors: [
    'Uso em pacientes hipovolêmicos sem reposição volêmica prévia',
    'Usar como vasopressor em choque distributivo/vasoplegia — a dobutamina pode piorar a hipotensão',
    'Administração em bolus — não suportado clinicamente',
    'Mistura com bicarbonato ou soluções alcalinas (inativa a droga)',
    'Assumir automaticamente a concentração do frasco sem verificar (existem 12,5 mg/mL e 50 mg/mL)',
    'Continuar a infusão sem reavaliação após 48–72 h (tolerância reduz o custo-benefício)',
    'Confundir DOBUTamina com DOPamina pela similaridade dos nomes',
  ],

  supportedSpecies: ['dog', 'cat'],
  allowedRegimes: ['CRI', 'titratable'],
  highAlert: true,

  doses: {
    dog: {
      min: 1,
      max: 20,
      unit: 'mcg/kg/min',
      observations:
        'Iniciar em 1–2 mcg/kg/min e titular a cada 15–30 min avaliando PA, perfusão, ECG e lactato. Faixa clínica comum: 3–7 mcg/kg/min (menos efeito sobre FC e PA). Faixa alta: 8–15 mcg/kg/min. ALERTA ≥10 mcg/kg/min: risco significativamente maior de taquicardia e arritmias. Doses >15 mcg/kg/min devem ser consideradas zona avançada, somente em UTI com monitorização intensiva. Excepcionalmente até 20 mcg/kg/min em alguns protocolos, mas não é padrão elegante do app.',
    },
    cat: {
      min: 0.5,
      max: 5,
      unit: 'mcg/kg/min',
      observations:
        'ATENÇÃO: Gatos são mais sensíveis. Iniciar em 0.5 mcg/kg/min. Faixa clínica prática: 1–3 mcg/kg/min. LIMITE PRÁTICO DE ROTINA: 5 mcg/kg/min. ALERTA CRÍTICO >5 mcg/kg/min: risco significativo de tremores e convulsões por toxicidade SNC. Dobutamina é raramente indicada em gatos (Merck Vet Manual); usar principalmente quando há disfunção sistólica documentada — não em HCM/HOCM típica.',
    },
  },

  preferredUnit: 'mcg/kg/min',
  allowedUnits: ['mcg/kg/min', 'mcg/kg/h'],

  presentations: [
    {
      id: 'dobutamine_12_5mg_ml_20ml',
      description: 'Cloridrato de Dobutamina 12,5 mg/mL — ampola/frasco 20 mL (250 mg/20 mL) [BR padrão: Dobutrex/genéricos hospitalares]',
      concentration: 12.5,
      concentrationUnit: 'mg/mL',
      volume: 20,
    },
    {
      id: 'dobutamine_50mg_ml',
      description: 'Dobutamina 50 mg/mL — solução injetável (concentração variável, mercado internacional) ⚠️ Confirmar força real antes de calcular',
      concentration: 50,
      concentrationUnit: 'mg/mL',
    },
  ],

  safetyMetadata: {
    preferredDiluent: 'NaCl 0.9%',
    allowedDiluents: ['NaCl 0.9%', 'Glicose 5%', 'Ringer Lactato', 'Glicose 5% + NaCl 0.9%'],
    notRecommendedDiluents: [],
    centralAccessRequired: false,
    centralAccessPreferred: true,
    peripheralAllowed: true,
    syringePumpRequired: true,
    dedicatedLineRequired: true,
    photosensitive: false,
    stabilityAfterDilution:
      'Usar solução diluída em até 24 h após preparo. A solução pode adquirir coloração levemente rosada ao longo do tempo por oxidação — essa coloração em si não indica perda de potência, mas descartar se a coloração for intensa ou se houver precipitado.',
    incompatibilities: [
      'Bicarbonato de sódio (CRÍTICO — inativa a dobutamina)',
      'Soluções fortemente alcalinas',
      'Aminofilina',
      'Diazepam',
      'Digoxina',
      'Furosemida',
      'Insulina regular',
      'Sulfato de magnésio',
      'Fenitoína/Fosfenitoína',
      'Fosfato de potássio',
      'Heparina (resultados inconsistentes — evitar mistura na mesma solução)',
      'Penicilinas / Cefalosporinas (ex.: cefazolina)',
    ],
    recommendedMonitoring: [
      'ECG contínuo — OBRIGATÓRIO',
      'Pressão arterial contínua ou seriada (frequente, idealmente invasiva em UTI)',
      'Frequência cardíaca e ritmo',
      'Perfusão periférica (tempo de preenchimento capilar, temperatura)',
      'Débito urinário',
      'Lactato sérico (avaliação de perfusão tecidual)',
      'Potássio sérico (hipopotassemia pode exacerbar arritmias)',
      'Função renal se indicado',
      'Reavaliação da indicação a cada 24–48 h (tolerância)',
    ],
  },

  alerts: [
    {
      id: 'dobutamine-high-alert',
      condition: () => true,
      message: 'MEDICAMENTO DE ALTO RISCO. Realize dupla checagem: concentração, volume aspirado, diluente e taxa da bomba antes de iniciar a infusão.',
      level: 'danger',
    },
    {
      id: 'dobutamine-no-bolus',
      condition: () => true,
      message: 'Dobutamina NÃO é droga de bolus. Deve ser administrada exclusivamente como CRI titulável em bomba de infusão ou bomba de seringa.',
      level: 'danger',
    },
    {
      id: 'dobutamine-check-stock-strength',
      condition: () => true,
      message: 'CONFIRME a concentração do frasco antes de calcular. Existem apresentações de 12,5 mg/mL e 50 mg/mL em diferentes mercados. Nunca assuma a força sem verificar o rótulo.',
      level: 'danger',
    },
    {
      id: 'dobutamine-hypovolemia',
      condition: (patient) => patient.comorbidities.includes('hypovolemia') || patient.comorbidities.includes('shock'),
      message: 'HIPOVOLEMIA: Corrigir volume antes ou concomitantemente. Dobutamina NÃO substitui ressuscitação volêmica. Em paciente hipovolêmico, o efeito beta-2 vasodilatador pode precipitar hipotensão grave e colapso cardiovascular.',
      level: 'danger',
    },
    {
      id: 'dobutamine-cat-cns',
      condition: (patient, dose, unit) => patient.species === 'cat' && toMcgKgMin(dose, unit as any) > 5,
      message: 'GATOS — RISCO CRÍTICO DE SNC: Doses >5 mcg/kg/min em gatos estão fortemente associadas a tremores e convulsões refratárias por toxicidade do sistema nervoso central. Reduzir imediatamente para ≤5 mcg/kg/min ou considerar alternativa clínica.',
      level: 'danger',
    },
    {
      id: 'dobutamine-cat-conservative',
      condition: (patient) => patient.species === 'cat',
      message: 'Gatos são mais sensíveis à dobutamina: meia-vida mais longa, maior risco de sinais de SNC. Use a faixa conservadora (0,5–3 mcg/kg/min). Dobutamina raramente é indicada em gatos com HCM/HOCM típica.',
      level: 'warning',
    },
    {
      id: 'dobutamine-arrhythmia-risk',
      condition: (_patient, dose, unit) => toMcgKgMin(dose, unit as any) >= 10,
      message: 'DOSE ALTA ≥10 mcg/kg/min: risco significativamente aumentado de taquicardia sinusal, arritmias supraventriculares e ventriculares (CVPs), e aumento do consumo miocárdico de O₂. ECG contínuo e avaliação frequente são essenciais.',
      level: 'danger',
    },
    {
      id: 'dobutamine-outflow-obstruction',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'OBSTRUÇÃO DE VIA DE SAÍDA: Se houver estenose aórtica, HCM obstrutiva (HOCM/IHSS) ou lesão semelhante, a dobutamina pode piorar a obstrução e o quadro clínico. Confirmar morfologia cardíaca antes de iniciar.',
      level: 'danger',
    },
    {
      id: 'dobutamine-af-conduction',
      condition: (patient) => patient.comorbidities.includes('cardiopath'),
      message: 'CAUTELA EM FIBRILAÇÃO ATRIAL: A dobutamina pode facilitar a condução AV e aumentar a resposta ventricular. Controlar a condução antes de iniciar; digoxina pode ser necessária.',
      level: 'warning',
    },
    {
      id: 'dobutamine-not-for-vasoplegia',
      condition: (patient) => patient.comorbidities.includes('sepsis') || patient.comorbidities.includes('shock'),
      message: 'ATENÇÃO À ESTRATÉGIA: Se a hipotensão for predominantemente vasodilatadora (vasoplegia, choque distributivo, isoflurano em paciente normovolêmico), a dobutamina pode melhorar o débito cardíaco sem corrigir adequadamente a MAP. Reavalie se a norepinefrina não é o agente mais lógico neste cenário.',
      level: 'warning',
    },
    {
      id: 'dobutamine-tachyphylaxis',
      condition: () => true,
      message: 'TOLERÂNCIA (TAQUIFILAXIA): A resposta hemodinâmica à dobutamina pode diminuir significativamente após 48–72 h de infusão contínua. Se usar por mais de 24–48 h, reavaliar necessidade, considerar desmame ou troca de estratégia.',
      level: 'warning',
    },
    {
      id: 'dobutamine-alkaline-incompatibility',
      condition: () => true,
      message: 'NÃO MISTURAR com bicarbonato de sódio ou soluções fortemente alcalinas — inativam a dobutamina quimicamente. Usar diluente compatível e linha apropriada.',
      level: 'danger',
    },
    {
      id: 'dobutamine-name-confusion',
      condition: () => true,
      message: 'RISCO DE ERRO DE NOME: Não confundir DOBUTamina com DOPamina. São fármacos distintos com mecanismos e indicações diferentes. Verifique o nome completo antes de preparar.',
      level: 'warning',
    },
    {
      id: 'dobutamine-sepsis-adjunct',
      condition: (patient) => patient.comorbidities.includes('sepsis'),
      message: 'NO CHOQUE SÉPTICO: Dobutamina não é vasopressor de primeira linha. Indicar apenas como inotrópico adjuvante quando, mesmo após fluidos e vasopressor (norepinefrina), há evidência de hipoperfusão persistente por componente de baixo débito. Literatural recente de 2024 aponta perfil de risco/benefício menor quando ocorre mais taquicardia e vasodilatação do que ganho contrátil real.',
      level: 'info',
    },
  ],

  adverseEffects: [
    'Taquicardia sinusal',
    'Arritmias ventriculares (CVPs) e supraventriculares',
    'Hipotensão (em paciente hipovolêmico ou severamente vasodilatado)',
    'Tremores musculares e convulsões — especialmente em gatos com doses >5 mcg/kg/min',
    'Aumento do consumo miocárdico de O₂',
    'Flebite no local de infusão',
    'Náusea e vômito (raro em veterinária)',
    'Taquifilaxia/tolerância com uso prolongado (>48–72 h)',
  ],

  detailedInfo: {
    mechanismOfAction:
      'Agonista sintético direto dos receptores beta-1 adrenérgicos (principal efeito), com atividade agonista beta-2 e alfa-1 leve e balanceada. Aumenta a contratilidade miocárdica (inotropismo positivo) e o volume sistólico, resultando em elevação do débito cardíaco COM moderada tendência a reduzir ou manter a resistência vascular sistêmica (pós-carga), facilitando o esvaziamento ventricular. Diferente da dopamina, não depende de liberação de norepinefrina endógena — eficaz mesmo em corações com estoques depletados.',
    metabolism:
      'Rápido metabolismo hepático e em outros tecidos pela enzima catecol-O-metiltransferase (COMT) em compostos inativos (3-O-metildobutamina) e conjugação com ácido glicurônico.',
    excretion:
      'Principalmente renal (metabólitos inativos) e pequena fração biliar.',
    onsetOfAction:
      'Muito rápido: 1–2 minutos. Pico de ação em aproximadamente 10 minutos após o início da infusão.',
    durationOfAction:
      'Muito curta: meia-vida plasmática de aproximadamente 2 minutos. Em gatos, a meia-vida é notavelmente mais longa. Os efeitos cessam em poucos minutos após a interrupção da infusão — excelente para titulação fina.',
    speciesDifferences:
      'Gatos são muito mais sensíveis aos efeitos tóxicos no SNC (tremores, convulsões) do que cães — exigindo doses máximas muito menores (≤5 mcg/kg/min) e uso mais cuidadoso. Em gatos, a meia-vida é mais longa, aumentando o risco de acúmulo. Dobutamina raramente é indicada em gatos conforme o Merck Vet Manual, e deve ser evitada em HCM/HOCM típica.',
    clinicalObservations:
      'PONTO CRÍTICO CLÍNICO — Dobutamina vs. Norepinefrina: (1) Dobutamina encaixa melhor quando: há baixo débito, disfunção sistólica documentada, suspeita de miocárdio deprimido, paciente anestesiado em que o problema principal parece ser contratilidade, ou sépsis com evidência de hipoperfusão persistente por componente inotrópico baixo. (2) Dobutamina encaixa pior quando: a hipotensão é predominantemente vasodilatadora, anestesia inalatória em cão normovolêmico com MAP muito baixa sem sinal de contratilidade ruim, paciente já muito taquicárdico, ou obstrução fixa de saída. PÉROLA DE LITERATURA: Em cães saudáveis sob isoflurano com hipotensão grave, estudos 2022/2023 mostraram que norepinefrina foi mais eficiente para restaurar MAP, enquanto dobutamina aumentou CO, DO₂ e VO₂, mas não estabilizou MAP >65 mmHg até a dose máxima do protocolo. Dobutamina é ótima para débito/contratilidade; para vasoplegia pura, a norepinefrina costuma ser mais eficaz.',
    administrationGuidelines:
      'Diluir obrigatoriamente antes de administrar (não administrar concentrada). Concentrações habituais de trabalho: 250 mg em 250 mL = 1.000 mcg/mL | 250 mg em 500 mL = 500 mcg/mL | 250 mg em 1.000 mL = 250 mcg/mL. Limites de concentração: Plumb\'s recomenda ≤5 mg/mL (5.000 mcg/mL); para uso prático e rotineiro, concentrações muito mais baixas são preferidas. Compatível com NaCl 0,9%, Glicose 5%, Ringer Lactato e combinações dextrose-salina. Titular a cada 15–30 minutos com base em pressão arterial, perfusão, ECG, lactato e débito urinário. Desmame gradual ao longo de 12–24 h quando a perfusão melhora.',
    maximumUsageTime:
      'Geralmente limitada a 24–48 horas de uso contínuo. Tolerância (taquifilaxia) com redução da resposta hemodinâmica é frequente após 48–72 h — reavaliar a estratégia se uso prolongado for necessário.',
    extraClinicalNotes: [
      'MACETE PLUMB\'S (6 × PESO): Peso (kg) × 6 = mg de dobutamina em 100 mL de solução. Essa solução administrada a 1 mL/h entrega 1 mcg/kg/min. Logo: 2 mL/h = 2 mcg/kg/min; 5 mL/h = 5 mcg/kg/min; 10 mL/h = 10 mcg/kg/min. Exemplo: cão 10 kg → 60 mg em 100 mL → 1 mL/h = 1 mcg/kg/min.',
      'MACETE NELSON & COUTO: 250 mg em 500 mL = 500 mcg/mL. Se a solução correr a 0,6 mL/kg/h: 500 mcg/mL × 0,6 mL/kg/h = 300 mcg/kg/h = 5 mcg/kg/min. Logo: 0,6 mL/kg/h = 5 mcg/kg/min; 1,2 mL/kg/h = 10 mcg/kg/min.',
      'PRESET ALTERNATIVO 1: 250 mg em 250 mL = 1.000 mcg/mL → 0,3 mL/kg/h = 5 mcg/kg/min; 0,6 mL/kg/h = 10 mcg/kg/min.',
      'PRESET ALTERNATIVO 2: 250 mg em 1.000 mL = 250 mcg/mL → 1,2 mL/kg/h = 5 mcg/kg/min; 2,4 mL/kg/h = 10 mcg/kg/min.',
      'MISTO DOBUTAMINA + NOREPINEFRINA: Quando há componente de baixo débito E vasoplegia simultaneamente, associar dobutamina (inotrópico) + norepinefrina (vasopressor) pode ser mais eficaz do que escalar apenas um agente.',
    ],
  },

  doseGuides: [
    {
      id: 'dobutamine-ic-aguda',
      regimen: 'CRI',
      title: 'Insuficiência cardíaca aguda / CHF descompensada por disfunção sistólica',
      indication: 'Hipotensão + baixo débito + perfusão ruim com disfunção sistólica documentada ou fortemente suspeita',
      species: ['dog', 'cat'],
      doseText: 'Cães: iniciar 1–2 mcg/kg/min | faixa clínica comum 3–7 mcg/kg/min | faixa alta 8–15 mcg/kg/min\nGatos: usar mais raramente; principalmente sistólica sem HCM/HOCM | faixa prática 0,5–3 mcg/kg/min',
      rationale:
        'Faixa de 3–7 mcg/kg/min em cães tende a mexer menos com FC e PA enquanto melhora o débito. Titular a cada 15–30 min ao ECG, pressão e perfusão. Nelson & Couto: início em 1 mcg/kg/min, titular até 10–15 mcg/kg/min por 24–48 h. BSAVA ECC: cães 2–15 mcg/kg/min, começar baixo e titular.',
    },
    {
      id: 'dobutamine-hipotensao-anestesica',
      regimen: 'CRI',
      title: 'Hipotensão anestésica por depressão miocárdica',
      indication: 'Suspeita de contratilidade ruim como componente principal da hipotensão',
      species: ['dog'],
      doseText: 'Cães: 2–12 mcg/kg/min (estudos experimentais), faixa prática 2–7 mcg/kg/min. Titular ao efeito.',
      rationale:
        'Faz mais sentido quando a suspeita é contratilidade ruim (ex.: cardiopata, depressão por propofol/inalatório em cardiopata). NÃO é a melhor bala mágica para vasodilatação pura do isoflurano — nesses casos, norepinefrina costuma ser superior para restaurar MAP (estudos 2022/2023 em cães). Dobutamina pode melhorar CO mesmo sem resolver MAP adequadamente na vasoplegia pura.',
    },
    {
      id: 'dobutamine-sepsis',
      regimen: 'CRI',
      title: 'Sépsis / Choque séptico com componente de baixo débito',
      indication: 'Hipoperfusão persistente após fluidos adequados e vasopressor (norepinefrina), com suspeita de disfunção miocárdica séptica',
      species: ['dog', 'cat'],
      doseText: 'Cães: 2–10 mcg/kg/min como adjuvante inotrópico | Gatos: 1–3 mcg/kg/min (raramente)',
      rationale:
        'NÃO é primeira escolha para vasoplegia isolada em sepsis. Considerar quando: MAP corrigida com vasopressor, mas ainda há lactato elevado, perfusão ruim, oligúria ou evidência ecocardiográfica de hipofunção miocárdica. Revisão 2024: em sépsis, a dobutamina frequentemente traz taquicardia e vasodilatação, com benefício hemodinâmico inconsistente — usar com critério.',
    },
    {
      id: 'dobutamine-nao-para-vasoplegia',
      regimen: 'CRI',
      title: '⚠️ Quando NÃO escolher dobutamina',
      indication: 'Hipotensão predominantemente vasodilatadora sem evidência de baixo débito',
      species: ['dog', 'cat'],
      doseText: 'N/A — considerar norepinefrina ou associação',
      rationale:
        'BOMBA FRACA → dobutamina. CANO DILATADO → norepinefrina. MISTO → pode precisar de combinação. Se o paciente estiver normovolêmico com vasoplegia como causa dominante, a dobutamina pode melhorar CO sem corrigir MAP. Reorientar para norepinefrina nestes casos.',
    },
  ],

  diluentGuidance: [
    {
      id: 'dobutamine-diluent-standard',
      title: 'Diluente padrão',
      recommendation: 'Use NaCl 0,9% ou Glicose 5% como padrão. Ringer Lactato e combinações dextrose-salina também são compatíveis.',
      rationale: 'Diluentes isotônicos são compatíveis e estáveis por até 24 h. A solução pode ficar levemente rosada por oxidação — sem perda significativa de potência em 24 h.',
      tone: 'success',
    },
    {
      id: 'dobutamine-diluent-avoid',
      title: 'O que NUNCA misturar',
      recommendation: 'NUNCA misturar com bicarbonato de sódio ou soluções fortemente alcalinas — inativam a dobutamina. Evitar também: aminofilina, diazepam, digoxina, furosemida, insulina, MgSO₄, fenitoína, fosfato de potássio, heparina (inconsistente).',
      rationale: 'Incompatibilidade química real — a dobutamina é inativada em meio alcalino. Outras incompatibilidades listadas são clinicamente relevantes e documentadas nas bulas e referências.',
      tone: 'danger',
    },
    {
      id: 'dobutamine-diluent-macete-plumbs',
      title: 'Macete Plumb\'s: 6 × Peso',
      recommendation: 'Peso (kg) × 6 = mg de dobutamina em 100 mL. Taxa 1 mL/h = 1 mcg/kg/min; 5 mL/h = 5 mcg/kg/min; 10 mL/h = 10 mcg/kg/min.',
      rationale: 'Macete elegante para bomba de seringa/bolsa pequena. Exemplo: cão 10 kg → 60 mg em 100 mL de NaCl 0,9% → 1 mL/h = 1 mcg/kg/min. Fonte: Plumb\'s Veterinary Drug Handbook, 10ª ed.',
      tone: 'info',
    },
    {
      id: 'dobutamine-diluent-macete-nelson',
      title: 'Macete Nelson & Couto: 250 mg em 500 mL',
      recommendation: '250 mg em 500 mL = 500 mcg/mL. Correr a 0,6 mL/kg/h = 5 mcg/kg/min; 1,2 mL/kg/h = 10 mcg/kg/min.',
      rationale: 'Derivação: 500 mcg/mL × 0,6 mL/kg/h = 300 mcg/kg/h ÷ 60 = 5 mcg/kg/min. Excelente para padronizar o preparo de bolsa. Fonte: Nelson & Couto — Small Animal Internal Medicine.',
      tone: 'info',
    },
    {
      id: 'dobutamine-diluent-concentrations',
      title: 'Concentrações clássicas de preparo',
      recommendation: '250 mg/250 mL = 1.000 mcg/mL (densa) | 250 mg/500 mL = 500 mcg/mL (padrão) | 250 mg/1.000 mL = 250 mcg/mL (diluída).',
      rationale: 'Plumb\'s: não ultrapassar 5 mg/mL (5.000 mcg/mL) de concentração. Para uso prático e seguro, as concentrações acima são as referências clínicas habituais. Inspeção da solução antes do uso; descartar se houver precipitado.',
      tone: 'info',
    },
  ],

  accessGuidance: [
    {
      id: 'dobutamine-access-preferred',
      title: 'Via central preferível',
      recommendation: 'Prefira acesso venoso central e linha dedicada sempre que possível.',
      rationale: 'Para inotrópicos de uso prologado em UTI, acesso central oferece maior segurança e facilita monitorização hemodinâmica.',
      tone: 'warning',
    },
    {
      id: 'dobutamine-access-peripheral',
      title: 'Periférico: permitido com cuidado',
      recommendation: 'Acesso periférico é permitido (extravasamento é menos necrosante do que dopamina/norepinefrina), mas use veia calibrosa e cheque o sítio frequentemente.',
      rationale: 'Ao contrário da norepinefrina, a dobutamina tem propriedades vasoconstritoras menores — menor risco de necrose por extravasamento. Ainda assim, monitorização local é obrigatória.',
      tone: 'info',
    },
    {
      id: 'dobutamine-access-reliable',
      title: 'Acesso confiável e bomba obrigatória',
      recommendation: 'Use bomba de infusão ou bomba de seringa — uso sem bomba não é aceitável. Linha dedicada preferível.',
      rationale: 'A droga exige bomba para controle fino da taxa de infusão. Variações na taxa entregue alteram diretamente o efeito hemodinâmico.',
      tone: 'danger',
    },
  ],

  infusionGuidance: [
    {
      id: 'dobutamine-infusion-no-bolus',
      title: 'Bolus NÃO é suportado',
      recommendation: 'Dobutamina é droga de CRI/infusão titulável. Não usar como bolus rotineiro.',
      rationale: 'A lógica da dobutamina é infusão contínua titulada ao efeito. Bolus não é feito para esta droga no contexto veterinário.',
      tone: 'danger',
    },
    {
      id: 'dobutamine-infusion-start-low',
      title: 'Iniciar baixo e titular',
      recommendation: 'Iniciar na dose mínima (cão: 1–2 mcg/kg/min; gato: 0,5–1 mcg/kg/min) e reavalia a cada 15–30 min.',
      rationale: 'Permite avaliar resposta hemodinâmica e minimiza o risco de taquiarritmia com doses desnecessariamente altas no início.',
      tone: 'success',
    },
    {
      id: 'dobutamine-infusion-targets',
      title: 'Metas clínicas de titulação',
      recommendation: 'Titular ao efeito: ↑ pressão arterial, ↑ perfusão periférica, ↓ lactato, ↑ débito urinário, controle de FC e ritmo no ECG.',
      rationale: 'Pressão "bonita" com perfusão ruim é armadilha clínica. Avaliar o conjunto e não apenas a PA.',
      tone: 'info',
    },
    {
      id: 'dobutamine-infusion-weaning',
      title: 'Desmame gradual — não suspender abruptamente',
      recommendation: 'Reduzir a dose gradualmente ao longo de 12–24 h quando a perfusão melhora. Não retirar abruptamente.',
      rationale: 'Muitos textos clínicos sugerem desmame ao longo de 12–24 h. Uso geralmente limitado a 24–48 h; tolerância costuma diminuir o custo-benefício após esse período.',
      tone: 'warning',
    },
    {
      id: 'dobutamine-infusion-tolerance',
      title: 'Tolerância — reavalie após 48–72 h',
      recommendation: 'A resposta hemodinâmica pode cair significativamente após 48–72 h de uso contínuo. Se ainda necessário, reavaliar estratégia.',
      rationale: 'Taquifilaxia documentada nas referências de medicina veterinária de cuidados intensivos. Prolongar além de 48 h sem reavaliação não é prática recomendada.',
      tone: 'warning',
    },
  ],

  clinicalPearls: [
    '💊 REGRA CLÍNICA CENTRAL: BOMBA FRACA → Dobutamina. CANO DILATADO → Norepinefrina. MISTO → Combinação dos dois.',
    '📊 MACETE PLUMB\'S: Peso (kg) × 6 = mg em 100 mL. Taxa 1 mL/h entrega 1 mcg/kg/min.',
    '📊 MACETE NELSON & COUTO: 250 mg em 500 mL = 500 mcg/mL → 0,6 mL/kg/h = 5 mcg/kg/min.',
    '🐾 GATOS: Limite rígido de 5 mcg/kg/min. Acima disso: risco real de convulsões. Usar raramente; não indicar em HCM/HOCM típica.',
    '⏱️ TOLERÂNCIA: Reavalie após 48–72 h — a resposta hemostática cai (taquifilaxia). Planejar desmame.',
    '🩺 SÉPSIS: Dobutamina não é vasopressor. Usar apenas como adjuvante inotrópico quando MAP já está corrigida com norepinefrina mas persiste hipoperfusão.',
    '⚗️ FRASCO: Existem frascos de 12,5 mg/mL e 50 mg/mL. Sempre verificar rótulo antes de calcular.',
    '🚫 BOLUS: Não é droga de bolus. Apenas CRI titulável em bomba.',
    '🔴 NÃO MISTURAR COM BICARBONATO — inativação química da droga.',
    '📝 DOBU ≠ DOPA: Dobutamina e Dopamina são fármacos diferentes. Atenção ao nome completo na prescrição.',
  ],

  references: [
    "Plumb's Veterinary Drug Handbook, 10ª ed. — Dobutamine, indicações, farmacologia, contraindicações, eventos adversos, compatibilidade, preparo, macete 6×peso e estabilidade/diluição",
    'Lumb and Jones — Veterinary Anesthesia and Analgesia, 6ª ed. — fisiologia cardiovascular, comportamento em cães e gatos, potencial proarrítmico ≥10 mcg/kg/min, uso em hipotensão anestésica com baixa contratilidade',
    'BSAVA Small Animal Formulary, 10ª ed. — apresentações 12,5/50 mg/mL, usos, monitorização e segurança; cães 2–15 mcg/kg/min; gatos 1–5 mcg/kg/min',
    'BSAVA Manual of Canine and Feline Emergency and Critical Care, 3ª ed. — faixas por espécie, obrigatoriedade de CRI, monitorização, tolerância com uso prolongado',
    "Nelson & Couto — Small Animal Internal Medicine — faixa elegante 3–7 mcg/kg/min, início 1 mcg/kg/min, titulação q15–30 min, desmame 24–48 h, macete 250 mg/500 mL = 500 mcg/mL",
    'Textbook of Small Animal Emergency Medicine — papel em inotropia no choque cardiogênico/baixo débito e necessidade de desmame gradual',
    'Pfizer/Hospira label oficial — apresentação 12,5 mg/mL (20 mL), necessidade de diluir, faixa clássica 2,5–15 mcg/kg/min, estabilidade 24 h, teto 5.000 mcg/mL, incompatibilidade com bicarbonato',
    'Bula profissional brasileira ABL/Dobutrex — 250 mg/20 mL (12,5 mg/mL), uso exclusivamente IV por infusão',
    'Merck/MSD Veterinary Manual — cautela em gatos, não bolus nas tabelas clínicas, 0,5–10 mcg/kg/min (gatos), 2–15 mcg/kg/min (cães)',
    'Frontiers 2021 — sépsis: considerar dobutamina quando há hipoperfusão persistente após fluidos + vasopressor',
    'Review 2024 — choque séptico: perfil benefício/risco menos favorável quando provoca mais taquicardia e vasodilatação do que ganho contrátil real',
    'Estudos anestésicos 2022/2023 em cães — norepinefrina mais eficiente para corrigir MAP em vasodilatação grave por isoflurano; dobutamina melhorou CO mas não estabilizou MAP >65 mmHg',
  ],
};
