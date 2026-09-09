function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/** Preserve prazos e condições: "7 dias; reavaliar" não significa uso indefinido. */
export function prescriptionDurationClause(value: string): string {
  const cleaned = value.trim().replace(/[.\s]+$/, '');
  if (!cleaned) return '';
  const normalized = normalize(cleaned);
  if (/^(?:uso continuo|continuamente)$/.test(normalized)) return ', em uso contínuo';
  if (/^(?:dose unica|uma unica administracao|uma unica vez)$/.test(normalized)) return ', em dose única';
  if (/^(ate|durante|por|em)\b/.test(normalized)) return `, ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
  if (/^uso\b/.test(normalized)) return `, para ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
  return `, durante ${cleaned}`;
}

export type PrescriptionDurationPreset = '' | 'continuous' | 'reevaluation' | 'days' | 'weeks' | 'months' | 'administrations' | 'custom';

export function inferPrescriptionDurationPreset(value: string): PrescriptionDurationPreset {
  const normalized = normalize(value).replace(/\.$/, '');
  if (!normalized) return '';
  if (/^(uso continuo|continuamente)$/.test(normalized)) return 'continuous';
  if (/^ate reavaliacao(?: clinica)?$/.test(normalized)) return 'reevaluation';
  if (/^\d+ dias?$/.test(normalized)) return 'days';
  if (/^\d+ semanas?$/.test(normalized)) return 'weeks';
  if (/^\d+ (mes|meses)$/.test(normalized)) return 'months';
  if (/^\d+ administra(?:cao|coes)$/.test(normalized)) return 'administrations';
  return 'custom';
}
