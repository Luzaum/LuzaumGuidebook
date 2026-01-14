import { ketamineSafetyThresholds } from '../../data/drugs/ketamine'

type PatientFlags = {
  species: 'dog' | 'cat'
  hcmCat?: boolean
  glaucoma?: boolean
  openGlobe?: boolean
  severeHypertension?: boolean
  raisedICP?: boolean // TCE / PIC elevada
  renalDisease?: boolean // principalmente relevante em gatos
  uncontrolledSeizures?: boolean
  decompensatedHeartFailure?: boolean
}

type KetamineInputs = {
  mode: 'CRI' | 'BOLUS'
  // se CRI:
  mcgKgMin?: number
  // se bolus:
  mgKg?: number
  route?: 'IV' | 'IM'
  patient: PatientFlags
}

export type AppAlert = {
  level: 'info' | 'warning' | 'critical'
  title: string
  message: string
}

export function getKetamineAlerts(input: KetamineInputs): AppAlert[] {
  const a: AppAlert[] = []
  const p = input.patient

  // Contraindicações / alertas clínicos
  if (p.species === 'cat' && p.hcmCat) {
    a.push({
      level: 'critical',
      title: '⛔ CMH felina (HCM): evitar cetamina',
      message:
        'Pode aumentar trabalho cardíaco e consumo de O₂. Prefira alternativa e monitore ECG/PA se uso inevitável.',
    })
  }

  if (p.glaucoma || p.openGlobe) {
    a.push({
      level: 'critical',
      title: '⛔ Olho: evitar em glaucoma ou ferimento global aberto',
      message: 'Risco de piora de pressão intraocular e dano ocular (princípio de precaução).',
    })
  }

  if (p.severeHypertension) {
    a.push({
      level: 'warning',
      title: '⚠️ Hipertensão grave: cautela',
      message: 'Pode elevar PA e FC. Iniciar baixo, titular e monitorar pressão.',
    })
  }

  if (p.raisedICP) {
    a.push({
      level: 'warning',
      title: '⚠️ Suspeita de PIC elevada (TCE): usar com critério',
      message:
        'Hoje pode ser aceitável sob ventilação/monitorização, mas o risco é maior. Preferir equipe e monitorização intensiva.',
    })
  }

  if (p.uncontrolledSeizures) {
    a.push({
      level: 'warning',
      title: '⚠️ Convulsões não controladas: evitar',
      message: 'Pode precipitar/exacerbar sinais neurológicos em alguns cenários. Priorize controle anticonvulsivante.',
    })
  }

  if (p.species === 'cat' && p.renalDisease) {
    a.push({
      level: 'warning',
      title: '⚠️ Gato com doença renal/obstrução: risco de efeito prolongado',
      message:
        'A cetamina pode ter eliminação renal relevante em gatos; pode prolongar sedação e aumentar toxicidade. Reduzir dose/evitar CRI prolongada.',
    })
  }

  // Alertas por DOSE em CRI
  if (input.mode === 'CRI' && typeof input.mcgKgMin === 'number') {
    const d = input.mcgKgMin

    if (d > ketamineSafetyThresholds.criHighRiskMcgKgMin) {
      a.push({
        level: 'critical',
        title: '🚨 CRI muito alta para animal acordado',
        message:
          'Acima de 20 mcg/kg/min: alto risco de disforia intensa, rigidez, sialorreia, nistagmo, hipertensão e convulsões. Reavaliar dose e indicação.',
      })
    } else if (d > ketamineSafetyThresholds.criAnalgesiaUpperMcgKgMin) {
      a.push({
        level: 'warning',
        title: '⚠️ Acima da faixa analgésica típica',
        message:
          'Acima de 10 mcg/kg/min pode causar efeitos psicomiméticos/disforia em paciente acordado. Manter na faixa analgésica quando objetivo for dor.',
      })
    } else if (d < 2) {
      a.push({
        level: 'info',
        title: 'ℹ️ Abaixo da faixa analgésica',
        message:
          'Abaixo de 2 mcg/kg/min pode falhar em bloquear NMDA (analgesia insuficiente). Reavaliar dor e titulação.',
      })
    }
  }

  // Alerta por bolus rápido (lembrar no app)
  if (input.mode === 'BOLUS' && input.route === 'IV') {
    a.push({
      level: 'info',
      title: 'ℹ️ Bolus IV: administrar lentamente',
      message:
        'Bolus rápido aumenta risco de apneia/sedação profunda. Prefira titulação lenta e associar benzo quando indicado.',
    })
  }

  return a
}
