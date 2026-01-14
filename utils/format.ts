/**
 * Formata números no padrão brasileiro (pt-BR) para exibição ao usuário.
 * 
 * Regra obrigatória: usar vírgula (,) como separador decimal, nunca ponto (.).
 * 
 * @param value - Número a ser formatado
 * @param maxDecimals - Número máximo de casas decimais (padrão: 3)
 * @returns String formatada no padrão pt-BR (ex: "2,5", "0,6", "10")
 * 
 * @example
 * formatNumberPtBR(2)        // "2"
 * formatNumberPtBR(2.0)      // "2"
 * formatNumberPtBR(2.5)      // "2,5"
 * formatNumberPtBR(0.6)      // "0,6"
 * formatNumberPtBR(0.125)    // "0,125"
 * formatNumberPtBR(10.000)   // "10"
 */
export function formatNumberPtBR(value: number, maxDecimals = 3): string {
  // Arredonda com segurança
  const rounded = Number(value.toFixed(maxDecimals))

  // Formata no padrão pt-BR
  return rounded.toLocaleString('pt-BR', {
    minimumFractionDigits: rounded % 1 === 0 ? 0 : 1,
    maximumFractionDigits: maxDecimals,
  })
}
