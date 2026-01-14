export const fentanylCompatibility = {
  compatibleDiluent: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
  compatibleMeds: ['Midazolam', 'Cetamina', 'Lidocaína'],
  incompatibilities: [
    {
      drug: 'Barbitúricos (Fenobarbital/Pentobarbital)',
      why: 'Risco de precipitação/incompatibilidade. Não misturar.',
      severity: 'critical' as const,
    },
    {
      drug: 'Propofol',
      why: 'Evitar na mesma seringa (risco de instabilidade da emulsão). Preferir via em Y/linha separada.',
      severity: 'warning' as const,
    },
  ],
  materialWarning:
    'Fentanil é lipofílico e pode aderir ao PVC. Em infusões muito lentas e equipos longos, parte da dose "gruda" no plástico inicialmente. Preferir extensores curtos/polietileno ou purgar o sistema com solução antes de conectar.',
  practicalWarnings: [
    'Em infusões muito lentas, minimizar equipos longos e espaço morto.',
    'Se usar bolsa, garantir homogeneização e checar concentração final.',
  ],
}
