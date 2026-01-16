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
  urethralObstruction?: boolean
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
        'Aumenta FC e consumo de O₂, reduz enchimento diastólico. Contraindicada em HCM felina.',
    })
  }

  if (p.glaucoma || p.openGlobe) {
    a.push({
      level: 'warning',
      title: '⚠️ Glaucoma / lesão ocular: cautela',
      message: 'Pode aumentar pressão intraocular. Evitar quando houver alternativa.',
    })
  }

  if (p.severeHypertension) {
    a.push({
      level: 'warning',
      title: '⚠️ Hipertensão grave: cautela',
      message: 'Efeito simpaticomimético pode elevar PA/FC. Preferir microdose e monitorar PAM.',
    })
  }

  if (p.raisedICP) {
    a.push({
      level: 'warning',
      title: '⚠️ Suspeita de PIC elevada (TCE): usar com critério',
      message:
        'Uso aceitável se ventilado e normocápnico; evitar em respiração espontânea instável.',
    })
  }

  if (p.uncontrolledSeizures) {
    a.push({
      level: 'warning',
      title: '⚠️ Epilepsia/convulsões: cautela',
      message: 'Pode reduzir limiar convulsivo. Associar midazolam e evitar doses altas.',
    })
  }

  if (p.species === 'cat' && (p.renalDisease || p.urethralObstruction)) {
    a.push({
      level: 'warning',
      title: '⚠️ Gato renal/obstruído: risco de efeito prolongado',
      message:
        'Excreção renal ativa pode prolongar efeito. Reduzir dose e evitar redoses.',
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
          'Acima de 20 mcg/kg/min: alto risco de disforia/rigidez/hipertensão. Reavaliar e confirmar associação com benzo + opioide.',
      })
    } else if (d > ketamineSafetyThresholds.criAnalgesiaUpperMcgKgMin) {
      a.push({
        level: 'warning',
        title: '⚠️ Acima da faixa analgésica típica',
        message:
          'Acima de 10 mcg/kg/min tende a TIVA; nunca usar isolada. Manter faixa analgésica quando objetivo for dor.',
      })
    } else if (d < 2) {
      a.push({
        level: 'info',
        title: 'ℹ️ Abaixo da faixa analgésica',
        message:
          'Abaixo de 2 mcg/kg/min pode falhar em bloquear NMDA. Reavaliar dor e titulação.',
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
