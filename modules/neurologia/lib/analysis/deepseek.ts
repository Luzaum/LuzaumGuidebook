import type { CaseReport } from '../../types/analysis'

type CaseStateInput = {
  patient: unknown
  complaint: unknown
  neuroExam: unknown
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return '{}'
  }
}

export async function generateDeepSeekClinicalOpinion(
  caseState: CaseStateInput,
  report: CaseReport,
): Promise<string | null> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY as string | undefined
  if (!apiKey) return null

  const model = (import.meta.env.VITE_DEEPSEEK_MODEL as string | undefined) || 'deepseek-chat'

  const prompt = [
    'Voce e um neurologista veterinario senior.',
    'Gere uma sintese clinica objetiva para o caso abaixo, em portugues do Brasil.',
    'Formato obrigatorio com os titulos:',
    '1) Hipotese principal e justificativa curta',
    '2) Hipoteses diferenciais prioritarias',
    '3) Exames imediatos e por que',
    '4) Conduta inicial nas primeiras 6 horas',
    '5) Alertas de risco e pontos de monitorizacao',
    '',
    'Resumo estruturado ja calculado pelo sistema:',
    safeJson(report),
    '',
    'Dados brutos do caso:',
    safeJson(caseState),
  ].join('\n')

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 900,
      messages: [
        {
          role: 'system',
          content:
            'Especialista em neurologia veterinaria. Responda de forma tecnica, clara e pragmatica.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek HTTP ${response.status}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = data?.choices?.[0]?.message?.content?.trim()
  return content || null
}

