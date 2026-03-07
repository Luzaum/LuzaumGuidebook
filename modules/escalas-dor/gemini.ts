
import { GeminiAnalysis } from './types';

interface PainDataContext {
  species: string;
  painType: string;
  scaleName: string;
  score: string;
  analysis: string;
}

export async function getPainAnalysis(context: PainDataContext): Promise<GeminiAnalysis> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY não configurada.");
  }

  const speciesPortuguese = context.species === 'dog' ? 'Cão' : 'Gato';
  const painTypePortuguese = context.painType === 'acute' ? 'Aguda' : 'Crônica';

  const prompt = `
    Você é um especialista veterinário sênior em manejo da dor, fornecendo uma segunda opinião concisa para um colega veterinário.
    Com base nos seguintes dados de avaliação, gere uma resposta JSON estruturada.

    Dados da Avaliação:
    - Espécie: ${speciesPortuguese}
    - Tipo de Dor: ${painTypePortuguese}
    - Escala Utilizada: ${context.scaleName}
    - Escore Obtido: ${context.score}
    - Interpretação Padrão da Escala: ${context.analysis}

    Sua Tarefa:
    Preencha os campos do schema JSON com base nos dados. Seja direto, profissional e use terminologia técnica apropriada. O objetivo é apoiar a decisão clínica, não substituí-la.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                clinicalAnalysis: { type: 'STRING' },
                actionSuggestions: { type: 'STRING' },
                importantReminders: { type: 'STRING' },
              },
              required: ['clinicalAnalysis', 'actionSuggestions'],
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Falha na API Gemini (${response.status}): ${errorBody}`);
    }

    const payload = await response.json();
    const jsonText = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() ?? '';
    if (jsonText.startsWith('{') && jsonText.endsWith('}')) {
        return JSON.parse(jsonText) as GeminiAnalysis;
    } else {
        console.error("Gemini response was not a valid JSON object:", jsonText);
        throw new Error("A IA retornou uma resposta em formato inesperado.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Erro ao contatar a IA: ${error.message}. Verifique a chave de API e a conexão.`);
    }
    throw new Error("Ocorreu um erro desconhecido ao contatar a IA.");
  }
}
