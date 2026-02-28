import type { CaseReport } from '../../types/analysis'

const GEMINI_API_KEY = 'AIzaSyCrdeE4tvCvR4kjrmatWjlm0QgtBsPNf6E'

export async function generateGeminiAnalysis(
    patientSummary: string,
    historySummary: string,
    examSummary: string,
    rawCaseState: any
): Promise<CaseReport> {
    const prompt = `
  Você é um Neurologista Veterinário Especialista (Diplomado).
  Seu objetivo é analisar os dados do paciente, o histórico clínico e o exame neurológico fornecido e retornar as conclusões estruturadas estritamente em JSON.
  
  Dados do Paciente:
  ${patientSummary}
  
  Histórico e Queixa:
  ${historySummary}
  
  Exame Neurológico:
  ${examSummary}
  
  Dados Brutos Adicionais:
  ${JSON.stringify(rawCaseState, null, 2)}
  
  DIRETRIZES:
  1. Determine a neuro-localização primária e padrão motor com precisão impressionante. Use as categorias exatas exigidas no schema.
  2. Forneça o Top 5 diagnósticos diferenciais (differentials) em ordem de probabilidade (likelihood de 0 a 100). As causas devem cruzar fisiologia, neuro-anatomia, prevalência na espécie/idade e no tempo de evolução.
  3. Descreva cuidadosamente as justificativas (why), métodos diagnósticos (diagnostics) e plano terapêutico inicial e definitivo (treatment).
  4. Analise o impacto das comorbidades do paciente se existirem (comorbidityImpact).
  5. Você DEVE retornar um objeto JSON válido, aderindo EXATAMENTE à seguinte estrutura:
  
  {
    "neuroLocalization": {
      "status": "ok" ou "insufficient_data",
      "primary": "PROSENCEFALO" | "TRONCO_ENCEFALICO" | "CEREBELO" | "VESTIBULAR_PERIFERICO" | "VESTIBULAR_CENTRAL" | "MEDULA_C1_C5" | "MEDULA_C6_T2" | "MEDULA_T3_L3" | "MEDULA_L4_S3" | "CAUDA_EQUINA" | "NEUROMUSCULAR" | "MULTIFOCAL_OU_DIFUSA" | "INDETERMINADO",
      "secondary": ["lista de eixos secundarios caso haja duvida"],
      "distribution": "FOCAL" | "MULTIFOCAL" | "DIFUSA" | "INDETERMINADA",
      "motorPattern": "UMN" | "LMN" | "VESTIBULAR" | "CEREBELAR" | "NEUROMUSCULAR" | "INDEFINIDO",
      "confidence": numero_de_0_a_100,
      "supportiveFindings": ["lista de achados que apoiam a localizacao"],
      "contradictoryFindings": ["lista de achados que contradizem, se houver"],
      "narrative": "Texto rico explicativo do raciocínio clínico da neurolocalização baseado nos sinais aferentes e eferentes.",
      "missing": ["dados cruciais faltando no exame, se houver"]
    },
    "differentials": [
      {
        "id": "ID_UNICO",
        "name": "Nome Cientifico da Doenca",
        "category": "INFLAMATORIA" | "INFECCIOSA" | "NEOPLASICA" | "VASCULAR" | "DEGENERATIVA" | "TRAUMATICA" | "TOXICO_METABOLICA" | "COMPRESSIVA" | "IDIOPATICA" | "ENDOCRINA",
        "likelihood": numero_de_0_a_100,
        "why": ["Justificativa profunda 1", "Justificativa profunda 2"],
        "diagnostics": [
          {
            "test": "Nome do Exame",
            "priority": "ALTA" | "MEDIA" | "BAIXA",
            "whatItAdds": "O que este exame confirmara?",
            "expectedFindings": "Achados esperados se positivo",
            "limitations": "Limitacoes no contexto clinico"
          }
        ],
        "treatment": [
          {
            "phase": "0-6H" | "DEFINITIVO",
            "plan": ["Passo farmaco/cirurgico 1", "Passo 2"],
            "cautions": ["Cuidado terapeutico 1"]
          }
        ]
      }
    ],
    "comorbidityImpact": {
      "alerts": ["Alertas gerais devido a comorbidades"],
      "cautions": ["Riscos de medicamentos devido a comorbidades"],
      "diagnosticAdds": ["Exames extras sugeridos devido a comorbidades"],
      "diagnosticAvoids": ["Procedimentos a evitar devido a comorbidades"]
    }
  }
  
  MUITO IMPORTANTE: O JSON deve ser em Português-BR. Nao inclua nenhuma tag markdown \`\`\`json no inicio ou no fim, retorne apenas o JSON limpo!
  `

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2, // Baixa temperatura para preservar precisão médica
                    responseMimeType: "application/json",
                }
            })
        })

        if (!response.ok) {
            console.error(await response.text())
            throw new Error('Erro na API Gemini (Verifique a chave ou limites)')
        }

        const data = await response.json()
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (!textResult) throw new Error('Retorno vazio do LLM')

        // As vezes a API ignora instructions e manda markdown anyway.
        const cleanText = textResult.replace(/```(?:json)?/gi, '').trim()
        const parsed = JSON.parse(cleanText)

        return {
            generatedAtISO: new Date().toISOString(),
            patientSummary,
            historySummary,
            examSummary,
            ...parsed
        } as CaseReport

    } catch (err) {
        console.error("Erro ao gerar análise NeuroVet AI: ", err)
        throw err
    }
}
