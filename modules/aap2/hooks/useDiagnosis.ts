// ============================================================
// useDiagnosis — Hook para lógica de diagnóstico diferencial
// Algoritmo de scoring baseado em significância dos sinais.
// ============================================================
import { useMemo } from 'react';
import { ALL_ANIMALS } from '../data/animals';
import { CLINICAL_SIGNS_KEYWORDS, SIGNIFICANCE_SCORES } from '../data/constants';
import type { DiagnosisResult } from '../types';

/**
 * Calcula diagnósticos diferenciais ranqueados por score.
 * @param selectedSigns - sinais clínicos selecionados pelo usuário
 * @returns lista ordenada de resultados com score e probabilidade
 */
export function useDiagnosis(selectedSigns: string[]): DiagnosisResult[] {
    return useMemo(() => {
        if (selectedSigns.length === 0) return [];

        // Inicializa scores para todos os animais
        const scoreMap = new Map<string, DiagnosisResult>();
        ALL_ANIMALS.forEach(animal => {
            scoreMap.set(animal.id, {
                animal,
                score: 0,
                probability: 0,
                matchingSigns: [],
            });
        });

        // Calcula score para cada sinal selecionado
        selectedSigns.forEach(uiSign => {
            const keywords = CLINICAL_SIGNS_KEYWORDS[uiSign] ?? [uiSign.toLowerCase()];

            ALL_ANIMALS.forEach(animal => {
                const entry = scoreMap.get(animal.id)!;

                const matchedSign = animal.signs.find(animalSign =>
                    keywords.some(kw => animalSign.name.toLowerCase().includes(kw))
                );

                if (matchedSign && !entry.matchingSigns.some(s => s.name === matchedSign.name)) {
                    entry.score += SIGNIFICANCE_SCORES[matchedSign.significance] ?? 1;
                    entry.matchingSigns.push(matchedSign);
                }
            });
        });

        // Filtra, ordena e normaliza probabilidades
        const results = Array.from(scoreMap.values())
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score);

        if (results.length === 0) return [];

        const maxScore = results[0].score;
        return results.map(r => ({
            ...r,
            probability: Math.min(100, Math.round((r.score / maxScore) * 95)),
        }));
    }, [selectedSigns]);
}
