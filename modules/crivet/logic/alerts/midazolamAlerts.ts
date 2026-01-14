export type AppAlert = { level: 'info' | 'warning' | 'critical'; title: string; message: string }

type PatientFlags = {
  species: 'dog' | 'cat'
  hepaticFailureOrShunt?: boolean
  suspectedHepaticEncephalopathy?: boolean
  aggressive?: boolean
  geriatric?: boolean
  pregnantFirstTrimester?: boolean
  csectionBeforeDelivery?: boolean
  glaucomaAngleClosure?: boolean
  renalAnuria?: boolean
  withOpioid?: boolean
}

type Inputs = {
  mode: 'CRI' | 'BOLUS'
  doseMgKgH?: number // CRI
  doseMgKg?: number // bolus
  patient: PatientFlags
}

export function getMidazolamAlerts(i: Inputs): AppAlert[] {
  const a: AppAlert[] = []
  const p = i.patient

  if (p.hepaticFailureOrShunt || p.suspectedHepaticEncephalopathy) {
    a.push({
      level: 'critical',
      title: '🚨 Hepatopata/Encefalopatia: evitar midazolam',
      message:
        'Benzodiazepínicos podem precipitar/piorar encefalopatia hepática e prolongar sedação. Se uso inevitável: dose muito reduzida e flumazenil disponível.',
    })
  }

  if (p.aggressive) {
    a.push({
      level: 'warning',
      title: '⚠️ Agressividade: risco de desinibição',
      message: 'Pode remover inibição e piorar comportamento defensivo. Preferir associação e contenção segura.',
    })
  }

  if (p.geriatric) {
    a.push({
      level: 'warning',
      title: '⚠️ Geriátrico: maior sensibilidade do SNC',
      message: 'Considerar reduzir dose inicial em ~20–50% e titular por efeito.',
    })
  }

  if (p.pregnantFirstTrimester) {
    a.push({
      level: 'warning',
      title: '⚠️ Gestação (1º trimestre): evitar',
      message: 'Evitar uso quando possível (princípio de precaução).',
    })
  }

  if (p.csectionBeforeDelivery) {
    a.push({
      level: 'warning',
      title: '⚠️ Cesárea antes de retirar fetos',
      message:
        'Atravessa placenta e pode causar filhotes hipotônicos (“floppy puppy”). Preferir após retirada dos fetos ou alternativa.',
    })
  }

  if (p.glaucomaAngleClosure) {
    a.push({
      level: 'warning',
      title: '⚠️ Glaucoma de ângulo fechado',
      message: 'Citado como precaução em algumas fontes/bulas. Avaliar risco-benefício.',
    })
  }

  if (p.renalAnuria) {
    a.push({
      level: 'warning',
      title: '⚠️ Anúria: risco de acúmulo de metabólitos',
      message: 'Geralmente seguro, mas em anúria pode prolongar efeito. Monitorar.',
    })
  }

  // dose-driven
  if (i.mode === 'CRI' && typeof i.doseMgKgH === 'number') {
    if (i.doseMgKgH >= 1.0) {
      a.push({
        level: 'warning',
        title: '⚠️ CRI alta (SE refratário): monitorar ventilação',
        message:
          'Doses até 1 mg/kg/h podem ser usadas em status epilepticus refratário, mas aumentam risco de depressão respiratória (especialmente com opioide).',
      })
    }
  }

  // excitação paradoxal (isolado)
  if (!p.withOpioid) {
    a.push({
      level: 'info',
      title: 'ℹ️ Midazolam isolado pode excitar',
      message: 'Em hígidos/jovens sem dor, pode causar excitação paradoxal. Preferir associar opioide/anestésico.',
    })
  }

  return a
}
