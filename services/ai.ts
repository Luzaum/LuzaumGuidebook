import { getEnv } from '../utils/env';

export type DrLuzaumParams = {
  caseSummary: string;
  extraNotes?: string;
};

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateDrLuzaumOpinion({ caseSummary, extraNotes }: DrLuzaumParams): Promise<string> {
  const apiKey = getEnv('VITE_GEMINI_API_KEY') || getEnv('GEMINI_API_KEY') || (import.meta as any).env?.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chave da IA não configurada. Defina VITE_GEMINI_API_KEY nas metas do index.html ou no ambiente.');
  }

  const system = [
    'Você é o Dr. Luzaum, médico-veterinário (pós-doutor em clínica de cães e gatos), especialista em acidentes com animais peçonhentos.',
    'Sua tarefa é emitir uma opinião clínica estruturada e fundamentada em literatura veterinária confiável (ex.: Plumb\'s, BSAVA Emergency & Critical Care, Nelson & Couto, Cunningham, consensos e diretrizes atualizadas, artigos veterinários).',
    'Regras: cite referências no final; não invente dados; se algo não for suportado por literatura, indique com cautela. Use dose-faixa e UNIDADES corretas, e aponte ajustes por estado fisiológico/comorbidades.',
  ].join(' ');

  const user = [
    'Caso clínico resumido (dados do app):',
    caseSummary,
    extraNotes ? `\nNotas adicionais do usuário: ${extraNotes}` : '',
    '\nGere a opinião com esta estrutura, em tópicos curtos e objetivos:',
    '1) Diagnóstico principal provável e justificativa',
    '2) Diagnósticos diferenciais relevantes e por que foram descartados/menos prováveis',
    '3) Etiologia do veneno/peçonha e fisiopatologia dos sinais relatados, correlacionando com o caso',
    '4) Considerações por estado fisiológico (filhote, gestante, idoso) e comorbidades (renal, cardíaco, etc.) que impactam a escolha terapêutica',
    '5) Como confirmar o diagnóstico: exames recomendados, parâmetros-alvo e seus intervalos/valores esperados',
    '6) Protocolo terapêutico de emergência (passo a passo): estabilização, monitorização (quais sinais vitais e frequência), fluidoterapia (detalhada, com ajustes por comorbidades), analgesia, antivenenos e medicações (doses calculáveis, mg/kg ou mL/kg, via, intervalos), e suporte',
    '7) Integração final dos dados (inclua quaisquer dados extras fornecidos) e plano',
    '8) Referências bibliográficas (formato curto: Obra/Autor, edição/ano, capítulo ou página quando pertinente).',
    '\nObservação legal: deixe claro ao final que isto não substitui o julgamento do veterinário e que o aplicativo é apenas um guia sem responsabilidade sobre decisões clínicas.',
  ].join('\n');

  const body = {
    contents: [
      { role: 'user', parts: [{ text: `${system}\n\n${user}` }] },
    ],
  };

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Falha na IA: ${res.status} ${txt}`);
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
  return text as string;
}


