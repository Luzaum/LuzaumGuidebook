import { Species } from '../types';

export interface SmartImportDraft {
  name: string;
  tutorName: string;
  breed: string;
  ageLabel: string;
  weightLabel: string;
  species: Species;
  mainDiagnosis: string;
  summary: string;
  definingPhrase: string;
  alertBadges: string[];
  medicationsInUse: string[];
}

export function parseSmartImportText(rawText: string): SmartImportDraft {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const name =
    rawText.match(/Paciente:\s*([^,\n]+)/i)?.[1]?.trim() ||
    rawText.match(/Nome:\s*([^\n]+)/i)?.[1]?.trim() ||
    lines[0]?.slice(0, 60) ||
    'Paciente importado';
  const tutorName = rawText.match(/Tutor:\s*([^\n]+)/i)?.[1]?.trim() || '';
  const breed = rawText.match(/,\s*([^,]+),\s*\d+\s*anos/i)?.[1]?.trim() || '';
  const ageLabel = rawText.match(/(\d+\s*anos?)/i)?.[1]?.trim() || '';
  const weightLabel = rawText.match(/(\d+\s*(?:kg|kgs))/i)?.[1]?.trim() || '';
  const mainDiagnosis =
    rawText.match(/(?:Diagnostico|Suspeita|Motivo da consulta):\s*([^\n]+)/i)?.[1]?.trim() ||
    lines[1] ||
    '';
  const summary = lines.slice(0, 5).join(' ');
  const species: Species = /felin/i.test(rawText)
    ? 'felina'
    : /canin|poodle|labrador|shih/i.test(rawText)
      ? 'canina'
      : 'outra';
  const alertBadges = [
    /sonda/i.test(rawText) ? 'SONDA' : null,
    /jejum/i.test(rawText) ? 'JEJUM' : null,
    /exame/i.test(rawText) ? 'EXAME PENDENTE' : null,
    /isolamento/i.test(rawText) ? 'ISOLAMENTO' : null,
  ].filter((value): value is string => Boolean(value));
  const medicationsInUse = Array.from(
    new Set(
      Array.from(
        rawText.matchAll(
          /(furosemida|pimobendan|prednisona|dipirona|tramadol|omeprazol|amoxicilina|metronidazol|ceftriaxona)/gi
        )
      ).map((match) => match[1])
    )
  );

  return {
    name,
    tutorName,
    breed,
    ageLabel,
    weightLabel,
    species,
    mainDiagnosis,
    summary,
    definingPhrase: mainDiagnosis
      ? `Caso importado para acompanhamento de ${mainDiagnosis.toLowerCase()}.`
      : 'Caso importado para revisao clinica.',
    alertBadges,
    medicationsInUse,
  };
}
