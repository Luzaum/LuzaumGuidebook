// ============================================================
// AI SERVICE — Chamadas às APIs de IA (análise + imagem)
// Toda comunicação com backend é centralizada aqui.
// ============================================================
import type { AIAnalysisResponse, AIImageResponse } from '../types';

// ---- Análise Clínica (Gemini) ----

export interface AnalysisRequestPayload {
    patientSpecies: string;
    patientStatus: string;
    patientWeight: string;
    comorbidities: string[];
    selectedSigns: string[];
    clinicalNotes: string;
}

function buildAnalysisPrompt(payload: AnalysisRequestPayload): string {
    const { patientSpecies, patientStatus, patientWeight, comorbidities, selectedSigns, clinicalNotes } = payload;
    const patientInfo = `Paciente: ${patientSpecies}, ${patientStatus}${patientWeight ? `, ${patientWeight}kg` : ''}. Comorbidades: ${comorbidities.length > 0 ? comorbidities.join(', ') : 'nenhuma'}.`;
    const signsInfo = `Sinais clínicos selecionados: ${selectedSigns.join(', ') || 'nenhum'}.`;
    const notesInfo = `Anotações do clínico: "${clinicalNotes || 'nenhuma'}".`;

    return `Aja como um médico veterinário toxicologista sênior, fornecendo uma análise detalhada e profunda.
**Caso Clínico:**
*   **Paciente:** ${patientInfo}
*   **Sinais Clínicos:** ${signsInfo}
*   **Anotações Adicionais:** ${notesInfo}

**Sua Tarefa:**
Com base nos dados fornecidos, elabore uma análise completa em um único texto contínuo. Sua resposta deve ser didática, clara e abranger os seguintes pontos, nesta ordem:

1.  **Raciocínio Diagnóstico Principal:** Comece declarando qual é a suspeita mais provável. Explique detalhadamente a **fisiopatologia** que conecta os sinais clínicos apresentados com o veneno suspeito. Justifique por que os sinais observados (ex: coagulopatia, neurotoxicidade) são consistentes com o envenenamento em questão.

2.  **Diagnósticos Diferenciais Relevantes:** Discuta brevemente 2-3 outros diferenciais importantes. Para cada um, explique por que ele é menos provável, apontando os sinais clínicos que são inconsistentes ou ausentes no caso atual.

3.  **Plano Diagnóstico de Confirmação:** Liste os exames laboratoriais e de imagem essenciais para confirmar a suspeita principal e avaliar a extensão dos danos. Especifique o que você espera encontrar em cada exame (ex: "Hemograma: esperar trombocitopenia e anemia", "TC: incoagulável", "CPK: > 10.000 U/L").

4.  **Protocolo Terapêutico de Emergência:** Descreva os passos imediatos e cruciais para o tratamento. Inclua a terapia específica (soroterapia, com doses e nomes comerciais se possível), fluidoterapia (tipo de fluido e taxas iniciais) e analgesia (fármacos e doses). Enfatize as contraindicações (ex: "NÃO usar AINEs").

Seu texto deve ser coeso, profissional e pronto para ser usado como uma consulta de alto nível.`;
}

/**
 * Solicita análise clínica por IA.
 * Tenta /api/analysis primeiro, com fallback para /.netlify/functions/generate-analysis.
 */
export async function fetchAIAnalysis(payload: AnalysisRequestPayload): Promise<AIAnalysisResponse> {
    const prompt = buildAnalysisPrompt(payload);

    const callEndpoint = async (url: string): Promise<AIAnalysisResponse> => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({} as Record<string, string>));
            throw new Error(err?.error || `HTTP ${response.status}`);
        }
        return response.json();
    };

    try {
        return await callEndpoint('/api/analysis');
    } catch {
        // Fallback para caminho direto da função Netlify
        return await callEndpoint('/.netlify/functions/generate-analysis');
    }
}

// ---- Geração de Imagem (Imagen) ----

/**
 * Solicita geração de imagem por IA.
 */
export async function fetchAIImage(prompt: string): Promise<AIImageResponse> {
    const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({} as Record<string, string>));
        throw new Error(err?.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// ---- Utilitários de Prompt de Imagem ----

const POSITIVE_STYLE = `
Photorealistic wildlife photograph, high-detail, natural colors, realistic textures.
Camera: full-frame DSLR, 50mm, f/2.8, shallow depth of field.
Lighting: soft, diffused, no harsh shadows.
Composition: eye-level, rule of thirds, subject in sharp focus, background bokeh.
Documentary style, field shot, no studio, no handler.
`.trim();

const COMMON_NEGATIVES = `
cartoon, illustration, painting, CGI, 3D render, toy, text, watermark, logo, collage, composite,
human, hand, handler, cage, lab, specimen tray,
low-res, blur, out-of-focus, distorted, deformed, incorrect anatomy,
multiple subjects, duplicate body parts, extra limbs, multiple heads, two-headed, conjoined
`.trim();

function getSpeciesNegatives(animalName: string): string {
    const n = animalName.toLowerCase();
    if (n.includes('coral')) return 'false coral, milk snake, incomplete rings, broken rings, rattlesnake rattle';
    if (n.includes('jararaca') || n.includes('bothrops')) return 'coral snake rings, rattlesnake rattle';
    if (n.includes('cascavel') || n.includes('crotalus')) return 'no rattle, coral snake rings';
    if (n.includes('surucucu') || n.includes('lachesis')) return 'coral snake rings, rattlesnake rattle';
    if (n.includes('aranha')) return 'eight+ legs duplicated, missing legs, extra eyes pattern, cartoon spider';
    if (n.includes('escorpi') || n.includes('tityus')) return 'missing tail, duplicated tail, extra claws, cartoon scorpion';
    if (n.includes('sapo') || n.includes('rhinella')) return 'tree frog toes, vibrant poison dart frog patterns';
    if (n.includes('taturana') || n.includes('lonomia')) return 'butterfly, moth, smooth caterpillar';
    if (n.includes('abelha')) return 'wasp body shape, hornet, paper wasp nest';
    if (n.includes('vespa') || n.includes('marimbondo')) return 'honeybee, bee hive frames';
    if (n.includes('lesma') || n.includes('caracol')) return 'fantasy shell shapes, cartoon eyes on stalks exaggerated';
    return '';
}

export function buildImagePrompt(animalName: string, scenePrompt: string, identification: string): string {
    const negatives = `${COMMON_NEGATIVES}, ${getSpeciesNegatives(animalName)}`.replace(/\s+/g, ' ').trim();
    return `A single ${animalName} in a photorealistic, high-detail wildlife photograph. Natural habitat: ${scenePrompt}. Must have these key anatomical features: ${identification}. Style: ${POSITIVE_STYLE}. Do not include: ${negatives}.`
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
