export type ParsedDifferential = {
  title: string
  probability: number | null
  category: string
  clinicalFit: string
  supportingFindings: string[]
  opposingFindings: string[]
  prioritizedDiagnostics: string[]
  patientAssessment: string[]
  monitoringPlan: string[]
  treatmentPlan: string[]
  allowedDrugs: string[]
  avoidDrugs: string[]
  comorbidityIntegration: string[]
}

export type ParsedAiClinicalReport = {
  neurolocalization: {
    probableLocation: string
    distribution: string
    motorPattern: string
    confidence: string
    reasoning: string
    supportiveFindings: string[]
    contradictoryFindings: string[]
  }
  differentials: ParsedDifferential[]
  priorities: string[]
  criticalAlerts: string[]
  comorbidityImpact: {
    alerts: string[]
    cautions: string[]
    recommendedTests: string[]
    avoidOrAdjust: string[]
  }
  limitations: string[]
  references: string[]
}

function firstNonEmpty(...values: Array<string | null | undefined>): string {
  return values.find((value) => Boolean(value && value.trim().length > 0))?.trim() || ''
}

function extractTextFromUnknown(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => extractTextFromUnknown(item))
      .filter(Boolean)
      .join('\n')
      .trim()
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return firstNonEmpty(
      extractTextFromUnknown(record.text),
      extractTextFromUnknown(record.content),
      extractTextFromUnknown(record.value),
    )
  }

  return ''
}

function pickFirstDefined(record: Record<string, any>, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key]
    }
  }

  return undefined
}

function toStringList(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    const items = value.map((item) => extractTextFromUnknown(item)).filter(Boolean)
    return items.length > 0 ? items : fallback
  }

  if (typeof value === 'string') {
    const items = value
      .split(/\r?\n|;\s+/)
      .map((item) => item.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)
    return items.length > 0 ? items : fallback
  }

  return fallback
}

function clampProbability(value: unknown): number | null {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) {
    return null
  }

  return Math.max(0, Math.min(100, Math.round(numeric)))
}

function sanitizeJsonCandidate(value: string): string {
  return value
    .replace(/^\uFEFF/, '')
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .replace(/,\s*([}\]])/g, '$1')
    .trim()
}

function extractFirstJsonObject(value: string): string | null {
  const candidate = sanitizeJsonCandidate(value)
  const start = candidate.indexOf('{')
  if (start < 0) {
    return null
  }

  let depth = 0
  let inString = false
  let escaped = false

  for (let index = start; index < candidate.length; index += 1) {
    const char = candidate[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') {
      inString = true
      continue
    }

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return candidate.slice(start, index + 1)
      }
    }
  }

  return null
}

function parseJsonClinicalReport(content: string): ParsedAiClinicalReport | null {
  const jsonBlock = extractFirstJsonObject(content)
  if (!jsonBlock) {
    return null
  }

  try {
    const parsed = JSON.parse(jsonBlock) as Record<string, any>
    const neurolocalization =
      (pickFirstDefined(parsed, ['neurolocalization', 'neuroLocalization', 'neuro_localization']) as Record<
        string,
        any
      >) || {}
    const differentialsSource = pickFirstDefined(parsed, [
      'differentials',
      'topDifferentials',
      'top5Differentials',
      'diagnosticDifferentials',
    ])
    const differentialsRaw = Array.isArray(differentialsSource) ? differentialsSource : []

    const differentials: ParsedDifferential[] = differentialsRaw
      .map((item: Record<string, any>) => {
        const differential = createEmptyDifferential()
        differential.title =
          extractTextFromUnknown(
            pickFirstDefined(item, ['diagnosis', 'diagnostic', 'title', 'name', 'differential']),
          ) || 'Diagnóstico não especificado'
        differential.probability = clampProbability(
          pickFirstDefined(item, ['probability', 'likelihood', 'chance', 'confidence']),
        )
        differential.category =
          extractTextFromUnknown(pickFirstDefined(item, ['category', 'etiology', 'group'])) || 'Não informada'
        differential.clinicalFit =
          extractTextFromUnknown(
            pickFirstDefined(item, ['clinicalFit', 'caseFit', 'summary', 'rationaleSummary', 'fitSummary']),
          ) || ''
        differential.supportingFindings = toStringList(
          pickFirstDefined(item, ['supportingFindings', 'supportiveFindings', 'findingsFor', 'supportingEvidence']),
        )
        differential.opposingFindings = toStringList(
          pickFirstDefined(item, [
            'opposingFindings',
            'findingsAgainst',
            'contradictoryFindings',
            'conflictingFindings',
          ]),
        )
        differential.prioritizedDiagnostics = toStringList(
          pickFirstDefined(item, [
            'prioritizedDiagnostics',
            'diagnostics',
            'diagnosticPlan',
            'howToDiagnose',
            'workup',
          ]),
        )
        differential.patientAssessment = toStringList(
          pickFirstDefined(item, ['patientAssessment', 'assessment', 'howToAssess', 'bedsideEvaluation']),
        )
        differential.monitoringPlan = toStringList(
          pickFirstDefined(item, ['monitoringPlan', 'monitoring', 'reassessment', 'followUp']),
        )
        differential.treatmentPlan = toStringList(
          pickFirstDefined(item, ['treatmentPlan', 'treatment', 'management', 'howToTreat']),
        )
        differential.allowedDrugs = toStringList(
          pickFirstDefined(item, ['allowedDrugs', 'consideredDrugs', 'medicationsToConsider']),
        )
        differential.avoidDrugs = toStringList(
          pickFirstDefined(item, ['avoidDrugs', 'avoidOrAdjustDrugs', 'contraindicatedDrugs']),
        )
        differential.comorbidityIntegration = toStringList(
          pickFirstDefined(item, ['comorbidityIntegration', 'comorbidityNotes', 'caseModifiers']),
        )
        return finalizeDifferential(differential)
      })
      .filter((item): item is ParsedDifferential => Boolean(item))

    if (differentials.length === 0) {
      return null
    }

    return {
      neurolocalization: {
        probableLocation:
          extractTextFromUnknown(
            pickFirstDefined(neurolocalization, ['probableLocation', 'location', 'primaryLocation']),
          ) || '',
        distribution:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['distribution', 'patternDistribution'])) || '',
        motorPattern:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['motorPattern', 'gaitPattern'])) || '',
        confidence: firstNonEmpty(
          extractTextFromUnknown(
            pickFirstDefined(neurolocalization, ['confidence', 'confidencePercent', 'estimatedConfidence']),
          ),
          '',
        ),
        reasoning:
          extractTextFromUnknown(pickFirstDefined(neurolocalization, ['reasoning', 'summary', 'analysis'])) || '',
        supportiveFindings: toStringList(
          pickFirstDefined(neurolocalization, ['supportiveFindings', 'supportingFindings', 'supportive']),
        ),
        contradictoryFindings: toStringList(
          pickFirstDefined(neurolocalization, [
            'contradictoryFindings',
            'conflictingFindings',
            'contradictions',
          ]),
        ),
      },
      differentials,
      priorities: toStringList(
        pickFirstDefined(parsed, ['prioritiesNext6h', 'priorities', 'nextSteps', 'prioritiesNextHours']),
      ),
      criticalAlerts: toStringList(pickFirstDefined(parsed, ['criticalAlerts', 'alerts', 'redFlags'])),
      comorbidityImpact: {
        alerts: toStringList(parsed.comorbidityImpact?.alerts),
        cautions: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['cautions', 'precautions', 'therapeuticCautions']),
        ),
        recommendedTests: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['recommendedTests', 'tests', 'diagnosticAdds']),
        ),
        avoidOrAdjust: toStringList(
          pickFirstDefined(parsed.comorbidityImpact || {}, ['avoidOrAdjust', 'avoid', 'doseAdjustments']),
        ),
      },
      limitations: toStringList(pickFirstDefined(parsed, ['limitations', 'missingData', 'uncertainties'])),
      references: toStringList(pickFirstDefined(parsed, ['references', 'bibliography', 'sources'])),
    }
  } catch {
    return null
  }
}

type DifferentialListTarget =
  | 'supportingFindings'
  | 'opposingFindings'
  | 'prioritizedDiagnostics'
  | 'patientAssessment'
  | 'monitoringPlan'
  | 'treatmentPlan'
  | 'allowedDrugs'
  | 'avoidDrugs'
  | 'comorbidityIntegration'

function createEmptyDifferential(): ParsedDifferential {
  return {
    title: '',
    probability: null,
    category: '',
    clinicalFit: '',
    supportingFindings: [],
    opposingFindings: [],
    prioritizedDiagnostics: [],
    patientAssessment: [],
    monitoringPlan: [],
    treatmentPlan: [],
    allowedDrugs: [],
    avoidDrugs: [],
    comorbidityIntegration: [],
  }
}

function finalizeDifferential(differential: ParsedDifferential | null): ParsedDifferential | null {
  if (!differential || !differential.title) {
    return null
  }

  if (!differential.clinicalFit && differential.supportingFindings.length > 0) {
    differential.clinicalFit = differential.supportingFindings.join(' ')
  }

  return differential
}

export function parseAiClinicalReport(content: string): ParsedAiClinicalReport | null {
  const parsedFromJson = parseJsonClinicalReport(content)
  if (parsedFromJson) {
    return parsedFromJson
  }

  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return null
  }

  const parsed: ParsedAiClinicalReport = {
    neurolocalization: {
      probableLocation: '',
      distribution: '',
      motorPattern: '',
      confidence: '',
      reasoning: '',
      supportiveFindings: [],
      contradictoryFindings: [],
    },
    differentials: [],
    priorities: [],
    criticalAlerts: [],
    comorbidityImpact: {
      alerts: [],
      cautions: [],
      recommendedTests: [],
      avoidOrAdjust: [],
    },
    limitations: [],
    references: [],
  }

  let section:
    | 'neuro'
    | 'differentials'
    | 'priorities'
    | 'alerts'
    | 'comorbidity'
    | 'limitations'
    | 'references'
    | null = null
  let differentialListTarget: DifferentialListTarget | null = null
  let neuroListTarget: 'supportiveFindings' | 'contradictoryFindings' | null = null
  let currentDifferential: ParsedDifferential | null = null

  const pushCurrentDifferential = () => {
    const finalized = finalizeDifferential(currentDifferential)
    if (finalized) {
      parsed.differentials.push(finalized)
    }
    currentDifferential = null
    differentialListTarget = null
  }

  for (const line of lines) {
    if (line === 'Neurolocalizacao') {
      pushCurrentDifferential()
      section = 'neuro'
      neuroListTarget = null
      continue
    }
    if (line === 'Top 5 diagnosticos diferenciais') {
      pushCurrentDifferential()
      section = 'differentials'
      continue
    }
    if (line === 'Prioridades praticas nas proximas 6 horas') {
      pushCurrentDifferential()
      section = 'priorities'
      continue
    }
    if (line === 'Alertas clinicos criticos') {
      pushCurrentDifferential()
      section = 'alerts'
      continue
    }
    if (line === 'Impacto das comorbidades') {
      pushCurrentDifferential()
      section = 'comorbidity'
      continue
    }
    if (line === 'Limitacoes e dados faltantes') {
      pushCurrentDifferential()
      section = 'limitations'
      continue
    }
    if (line === 'Base bibliografica considerada') {
      pushCurrentDifferential()
      section = 'references'
      continue
    }

    if (section === 'neuro') {
      if (line.startsWith('Localizacao provavel:')) {
        parsed.neurolocalization.probableLocation = line.replace('Localizacao provavel:', '').trim()
        continue
      }
      if (line.startsWith('Distribuicao:')) {
        parsed.neurolocalization.distribution = line.replace('Distribuicao:', '').trim()
        continue
      }
      if (line.startsWith('Padrao motor:')) {
        parsed.neurolocalization.motorPattern = line.replace('Padrao motor:', '').trim()
        continue
      }
      if (line.startsWith('Confianca estimada:')) {
        parsed.neurolocalization.confidence = line.replace('Confianca estimada:', '').trim()
        continue
      }
      if (line.startsWith('Raciocinio:')) {
        parsed.neurolocalization.reasoning = line.replace('Raciocinio:', '').trim()
        continue
      }
      if (line === 'Achados que sustentam:') {
        neuroListTarget = 'supportiveFindings'
        continue
      }
      if (line === 'Achados contraditorios:') {
        neuroListTarget = 'contradictoryFindings'
        continue
      }
      if (line.startsWith('- ') && neuroListTarget) {
        parsed.neurolocalization[neuroListTarget].push(line.replace(/^- /, '').trim())
      }
      continue
    }

    if (section === 'differentials') {
      const differentialMatch = line.match(/^\d+\.\s(.+?)\s-\s(\d+)%$/)
      if (differentialMatch) {
        pushCurrentDifferential()
        currentDifferential = createEmptyDifferential()
        currentDifferential.title = differentialMatch[1].trim()
        currentDifferential.probability = Number(differentialMatch[2])
        continue
      }

      if (!currentDifferential) {
        continue
      }

      if (line.startsWith('Categoria:')) {
        currentDifferential.category = line.replace('Categoria:', '').trim()
        continue
      }
      if (line.startsWith('Sintese clinica:')) {
        currentDifferential.clinicalFit = line.replace('Sintese clinica:', '').trim()
        differentialListTarget = null
        continue
      }
      if (line === 'Achados a favor:' || line === 'Justificativas:') {
        differentialListTarget = 'supportingFindings'
        continue
      }
      if (line === 'Achados contra:') {
        differentialListTarget = 'opposingFindings'
        continue
      }
      if (line === 'Exames priorizados:' || line === 'Como diagnosticar:') {
        differentialListTarget = 'prioritizedDiagnostics'
        continue
      }
      if (line === 'Como avaliar este paciente no plantao:') {
        differentialListTarget = 'patientAssessment'
        continue
      }
      if (line === 'Monitorizacao e reavaliacao:') {
        differentialListTarget = 'monitoringPlan'
        continue
      }
      if (line === 'Tratamento e conduta:' || line === 'Como tratar:') {
        differentialListTarget = 'treatmentPlan'
        continue
      }
      if (line === 'Farmacos que posso considerar:') {
        differentialListTarget = 'allowedDrugs'
        continue
      }
      if (line === 'Farmacos a evitar ou ajustar:' || line === 'Armadilhas clinicas:') {
        differentialListTarget = 'avoidDrugs'
        continue
      }
      if (line === 'Como as comorbidades mudam a conduta:') {
        differentialListTarget = 'comorbidityIntegration'
        continue
      }
      if (line.startsWith('- ') && differentialListTarget) {
        currentDifferential[differentialListTarget].push(line.replace(/^- /, '').trim())
      }
      continue
    }

    if (!line.startsWith('- ')) {
      continue
    }

    const bulletValue = line.replace(/^- /, '').trim()
    if (section === 'priorities') {
      parsed.priorities.push(bulletValue)
    } else if (section === 'alerts') {
      parsed.criticalAlerts.push(bulletValue)
    } else if (section === 'limitations') {
      parsed.limitations.push(bulletValue)
    } else if (section === 'references') {
      parsed.references.push(bulletValue)
    } else if (section === 'comorbidity') {
      if (bulletValue.startsWith('Alerta:')) {
        parsed.comorbidityImpact.alerts.push(bulletValue.replace('Alerta:', '').trim())
      } else if (bulletValue.startsWith('Cautela terapeutica:')) {
        parsed.comorbidityImpact.cautions.push(bulletValue.replace('Cautela terapeutica:', '').trim())
      } else if (bulletValue.startsWith('Exame recomendado:')) {
        parsed.comorbidityImpact.recommendedTests.push(bulletValue.replace('Exame recomendado:', '').trim())
      } else if (bulletValue.startsWith('Evitar/Ajustar:')) {
        parsed.comorbidityImpact.avoidOrAdjust.push(bulletValue.replace('Evitar/Ajustar:', '').trim())
      }
    }
  }

  pushCurrentDifferential()

  return parsed.differentials.length > 0 || parsed.neurolocalization.reasoning ? parsed : null
}
