export type AppAlert = { level: 'info' | 'warning' | 'critical'; title: string; message: string }

type PatientFlags = {
  guaranteedVentilation?: boolean
  baselineBrady?: boolean
  usingBloodProductsSameLine?: boolean
  longDeadSpaceTubing?: boolean
  hepaticFailure?: boolean
  renalFailure?: boolean
  neonate?: boolean
  neuroSurgeryOrNeedFastWake?: boolean
}

type Inputs = {
  unit: 'mcg/kg/min' | 'mcg/kg/h'
  dose: number
  patient: PatientFlags
}

export function getRemifentanilAlerts(i: Inputs): AppAlert[] {
  const a: AppAlert[] = []
  const p = i.patient

  if (i.unit !== 'mcg/kg/min') {
    a.push({
      level: 'critical',
      title: '🚨 Unidade errada: remifentanil é mcg/kg/min',
      message: 'Padronize em mcg/kg/min para titulação segura.',
    })
  }

  if (!p.guaranteedVentilation && i.dose >= 0.5) {
    a.push({
      level: 'critical',
      title: '🚨 Dose alta sem ventilação garantida',
      message: 'Remifentanil pode causar apneia e tórax rígido. Doses altas exigem ventilação assistida.',
    })
  } else if (!p.guaranteedVentilation) {
    a.push({
      level: 'warning',
      title: '⚠️ Ventilação: monitorar de perto',
      message: 'Mesmo em doses baixas pode haver hipoventilação/apneia. Pré-oxigenar quando indicado.',
    })
  }

  if (p.baselineBrady) {
    a.push({
      level: 'warning',
      title: '⚠️ Bradicardia vagotônica',
      message: 'É muito vagotônico. Tenha atropina/glicopirrolato disponível e monitore ECG.',
    })
  }

  if (p.usingBloodProductsSameLine) {
    a.push({
      level: 'critical',
      title: '⛔ Não misturar com sangue/hemoderivados no mesmo equipo',
      message: 'Esterases presentes no sangue podem degradar o fármaco antes de chegar ao paciente.',
    })
  }

  if (p.longDeadSpaceTubing) {
    a.push({
      level: 'warning',
      title: '⚠️ Espaço morto / equipo longo',
      message:
        'Como as doses são micro, o volume no “rabicho” pode atrasar início e confundir titulação. Purgar/preencher o sistema com solução diluída.',
    })
  }

  if (p.hepaticFailure || p.renalFailure) {
    a.push({
      level: 'info',
      title: '✅ Ótima escolha em falência hepática/renal',
      message: 'Eliminação por esterases (não depende de fígado/rim).',
    })
  }

  if (p.neonate) {
    a.push({
      level: 'info',
      title: '✅ Neonato: geralmente seguro',
      message: 'Esterases costumam ser suficientes; ainda assim titule e monitore ventilação.',
    })
  }

  if (p.neuroSurgeryOrNeedFastWake) {
    a.push({
      level: 'info',
      title: '✅ Neurocirurgia: despertar rápido',
      message: 'Permite neuro-check rápido após desligar a bomba.',
    })
  }

  // alerta fixo de transição (para UI/automation interna do app)
  a.push({
    level: 'warning',
    title: '⚠️ Sem efeito residual',
    message: 'Planeje analgesia de transição antes de desligar (ideal ~30 min antes).',
  })

  return a
}
