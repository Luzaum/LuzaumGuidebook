export interface NormalizedFiO2 {
  fraction?: number;
  displayPercent?: number;
  source?: 'fraction' | 'percentage' | 'assumed';
  note?: string;
  warning?: string;
}

export function normalizeFiO2Input(raw?: number): NormalizedFiO2 {
  if (raw === undefined || raw === null || Number.isNaN(raw)) {
    return {};
  }

  if (raw >= 0.21 && raw <= 1) {
    return {
      fraction: raw,
      displayPercent: Number((raw * 100).toFixed(1)),
      source: 'fraction',
      note: `FiO2 interpretada como fracao (${raw.toFixed(2)}), equivalente a ${Number((raw * 100).toFixed(1))}%.`,
    };
  }

  if (raw >= 21 && raw <= 100) {
    const fraction = raw / 100;
    return {
      fraction,
      displayPercent: Number(raw.toFixed(1)),
      source: 'percentage',
      note: `FiO2 interpretada como porcentagem (${Number(raw.toFixed(1))}%).`,
    };
  }

  if (raw > 1 && raw < 21) {
    const fraction = raw / 100;
    return {
      fraction,
      displayPercent: Number(raw.toFixed(1)),
      source: 'percentage',
      warning: `FiO2 ${raw} foi interpretada como ${raw}%, mas esta faixa costuma indicar unidade ambigua. Confirme a unidade.`,
    };
  }

  return {
    warning: `FiO2 ${raw} esta fora da faixa esperada para fracao (0.21-1.00) ou porcentagem (21-100).`,
  };
}

export function formatFiO2Percent(fraction?: number): string {
  if (fraction === undefined || Number.isNaN(fraction)) {
    return '--';
  }

  return `${Number((fraction * 100).toFixed(1))}%`;
}
