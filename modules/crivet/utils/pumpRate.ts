/**
 * Sugere taxa de bomba baseada no tipo de veículo e peso do paciente
 */
export function suggestPumpRate(args: { vehicle: 'syringe' | 'bag'; weightKg: number }): number {
  if (args.vehicle === 'syringe') {
    if (args.weightKg <= 5) return 2
    if (args.weightKg <= 10) return 3
    return 5
  }
  // bolsa: sugestão conservadora
  if (args.weightKg <= 5) return 10
  if (args.weightKg <= 15) return 20
  return 40
}
