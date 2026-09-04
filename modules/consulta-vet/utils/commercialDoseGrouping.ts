import type { CommercialMedicationDoseEntry } from '../types/commercialMedication';

export interface GroupedCommercialDoseIndication {
  title: string;
  duration?: string;
  note?: string;
}

export interface GroupedCommercialDoseEntry {
  regimen: string;
  indications: GroupedCommercialDoseIndication[];
}

/** Separa esquema posológico (mg/kg, via, intervalo) de duração final. */
export function splitDoseRegimenAndDuration(dose: string): { regimen: string; duration?: string } {
  const trimmed = dose.trim();
  if (!trimmed) return { regimen: trimmed };

  // Esquemas alternativos na mesma linha não devem ser particionados.
  if (/\s+ou\s+/i.test(trimmed)) {
    return { regimen: trimmed };
  }

  const match = trimmed.match(/^(.+?)\s+((?:por|durante)\s+.+|(?:×|x)\s*.+)$/i);
  if (match) {
    return { regimen: match[1].trim(), duration: match[2].trim() };
  }

  return { regimen: trimmed };
}

function normalizeRegimenKey(regimen: string): string {
  return regimen.replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR');
}

/** Agrupa entradas Plumb's/bula com o mesmo esquema posológico; duração fica por indicação. */
export function groupCommercialDoseEntries(entries: CommercialMedicationDoseEntry[]): GroupedCommercialDoseEntry[] {
  const map = new Map<string, GroupedCommercialDoseEntry>();

  for (const entry of entries) {
    const { regimen, duration } = splitDoseRegimenAndDuration(entry.dose);
    const key = normalizeRegimenKey(regimen);
    const indication: GroupedCommercialDoseIndication = {
      title: entry.title,
      duration,
      note: entry.note,
    };

    const existing = map.get(key);
    if (existing) {
      existing.indications.push(indication);
      continue;
    }

    map.set(key, { regimen, indications: [indication] });
  }

  return Array.from(map.values());
}

/** Usa layout compacto quando há repetição de esquema ou volume alto de indicações. */
export function shouldGroupCommercialDoseEntries(entries: CommercialMedicationDoseEntry[]): boolean {
  if (entries.length < 3) return false;
  const grouped = groupCommercialDoseEntries(entries);
  return grouped.length < entries.length || entries.length >= 4;
}
