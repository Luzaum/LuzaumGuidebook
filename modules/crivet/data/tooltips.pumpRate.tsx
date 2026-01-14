import React from 'react'

export const pumpRateTooltipContent = (
  <div className="space-y-3 text-sm leading-relaxed">
    <p className="font-semibold">Como escolher a taxa de infusão</p>
    
    <div className="space-y-2">
      <p>
        A taxa da bomba é uma escolha prática. Ela não muda a dose em mg/kg/h, apenas define:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>o quão fácil é preparar a seringa/bolsa</li>
        <li>a precisão da bomba</li>
        <li>o volume total infundido</li>
      </ul>
      <p className="font-medium mt-2">
        O CRIVET recalcula automaticamente a concentração para manter a dose correta.
      </p>
    </div>

    <div className="pt-2 border-t border-border/40 space-y-2">
      <p className="font-semibold">Como o CRIVET usa a taxa:</p>
      <p>
        O CRIVET usa a taxa escolhida para calcular a concentração final necessária:
      </p>
      <p className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs">
        Concentração (mg/mL) = dose total (mg/h) ÷ taxa (mL/h)
      </p>
      <p className="text-xs opacity-80">
        Exemplo: Dose 10 mg/h ÷ Taxa 5 mL/h = 2 mg/mL. Se você mudar a taxa, o CRIVET ajusta automaticamente a concentração — a dose permanece correta.
      </p>
    </div>
  </div>
)

// Taxas comumente usadas na prática (regras clínicas corretas)
export const COMMON_RATES_SYRINGE = [1, 2, 3, 5, 8] // Preferencial: 2-5 mL/h
export const COMMON_RATES_BAG = [10, 20, 40, 60] // Para manutenção com bolsa

export function suggestRates(volumeType: 'syringe' | 'bag'): number[] {
  return volumeType === 'syringe' ? COMMON_RATES_SYRINGE : COMMON_RATES_BAG
}

export function preferredRateHint(rate: number, volumeType: 'syringe' | 'bag'): { type: 'warning' | 'info'; message: string } | null {
  if (rate < 0.5) {
    return {
      type: 'warning',
      message: 'Taxa muito baixa — risco de imprecisão. Considere aumentar a taxa e diluir mais a droga.',
    }
  }
  // Alerta inteligente: taxas altas em seringa indicam diluição inadequada
  if (volumeType === 'syringe' && rate > 10) {
    return {
      type: 'warning',
      message: 'Taxa elevada para seringa. Taxas > 10 mL/h geralmente indicam diluição inadequada. Considere aumentar a concentração ou usar bolsa.',
    }
  }
  if (volumeType === 'syringe' && rate >= 2 && rate <= 5) {
    return {
      type: 'info',
      message: 'Faixa preferencial em UTI (2–5 mL/h).',
    }
  }
  return null
}
