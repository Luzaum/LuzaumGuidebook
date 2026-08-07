/**
 * Dicionário de definições simplificadas para as doenças do Consulta Vet.
 * Preferir `plainLanguage` no seed; este arquivo reexporta o catálogo central.
 */
import { DISEASE_PLAIN_LANGUAGE } from '../data/seed/diseasePlainLanguage';

export const SIMPLIFIED_DISEASE_DEFINITIONS = DISEASE_PLAIN_LANGUAGE;

/**
 * Retorna a definição simplificada para o slug fornecido.
 */
export function getSimplifiedDiseaseDefinition(slug: string) {
  return SIMPLIFIED_DISEASE_DEFINITIONS[slug] || null;
}
