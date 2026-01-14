export type AppAlert = { level: 'info' | 'warning' | 'critical'; title: string; message: string }

type PatientFlags = {
  species: 'dog' | 'cat'
  spontaneousBreathingNoAirway?: boolean
  bradycardiaBaseline?: boolean // cão <60, gato <120
  headTraumaRaisedICP?: boolean
  hepaticFailure?: boolean
  renalDisease?: boolean
  cardiacFailure?: boolean
  respiratoryDisease?: boolean
  septicOrHypotensive?: boolean
}

type Inputs = {
  mode: 'CRI' | 'BOLUS'
  unit: 'mcg/kg/h' | 'mcg/kg/min' | 'mcg/kg'
  dose: number
  patient: PatientFlags
}

export function getFentanylAlerts(i: Inputs): AppAlert[] {
  const a: AppAlert[] = []
  const p = i.patient

  // 60x trap - unidade perigosa
  if (i.mode === 'CRI' && i.unit === 'mcg/kg/min') {
    a.push({
      level: 'critical',
      title: '🚨 Unidade perigosa: mcg/kg/min (erro 60×)',
      message: 'O CRIVET padroniza CRI em mcg/kg/h. Se você pretendeu usar /h, trocar unidade evita overdose 60×.',
    })
  }

  // Alerta de unidade (mcg vs mg)
  if (i.unit.includes('mg/kg')) {
    a.push({
      level: 'critical',
      title: '⛔ ERRO CRÍTICO: unidade em mg/kg',
      message:
        'Fentanil deve ser calculado em MICROGRAMAS (mcg). Erro mcg↔mg muda a dose em 1000×. Use apenas mcg/kg/h para CRI.',
    })
  }

  // Respiração espontânea sem via aérea
  if (p.spontaneousBreathingNoAirway) {
    a.push({
      level: 'critical',
      title: '⛔ Risco de depressão respiratória',
      message:
        'Depressor respiratório potente. Em doses altas, ideal com via aérea/ventilação e ETCO2. Use com titulação e monitorização rigorosa.',
    })
  }

  // Bradicardia
  if (p.bradycardiaBaseline) {
    a.push({
      level: 'warning',
      title: '⚠️ Bradicardia vagotônica',
      message: 'Pode piorar bradicardia. Tenha anticolinérgico disponível e monitore ECG/PA. Evitar bolus rápido.',
    })
  }

  // TCE/PIC
  if (p.headTraumaRaisedICP) {
    a.push({
      level: 'warning',
      title: '⚠️ TCE/PIC: usar com ventilação',
      message:
        'Se hipoventilar, CO2↑ pode aumentar PIC. Usar com ventilação controlada e monitorização. Risco indireto se hipoventilar.',
    })
  }

  // Hepatopatia
  if (p.hepaticFailure) {
    a.push({
      level: 'warning',
      title: '⚠️ Hepatopatia grave: pode prolongar meia-vida',
      message: 'Metabolismo hepático. Em insuficiência grave, reduzir 25–50% e titular ao efeito.',
    })
  }

  // Renopatia
  if (p.renalDisease) {
    a.push({
      level: 'info',
      title: '✅ Renopatia: geralmente mais seguro que morfina',
      message:
        'Em geral mais seguro que morfina (menos preocupação com metabólitos ativos renais), mas monitorar sedação/ventilação.',
    })
  }

  // Cardiopatia/ICC
  if (p.cardiacFailure) {
    a.push({
      level: 'info',
      title: '✅ Cardiopatia/ICC: opioide de escolha',
      message: 'Opioide de escolha em muitos cardiopatas. Monitorar bradicardia; evitar bolus rápido.',
    })
  }

  // Doença respiratória/tórax
  if (p.respiratoryDisease) {
    a.push({
      level: 'critical',
      title: '⛔ Doença respiratória/tórax: depressor respiratório potente',
      message: 'Depressor respiratório potente. Em doses altas, ideal com via aérea/ventilação e ETCO2.',
    })
  }

  // Sepse/hipotensão
  if (p.septicOrHypotensive) {
    a.push({
      level: 'info',
      title: '✅ Opioide de escolha em hipotensão/sepse',
      message: 'Menos vasodilatação direta que morfina; ainda assim monitorar ventilação.',
    })
  }

  return a
}
