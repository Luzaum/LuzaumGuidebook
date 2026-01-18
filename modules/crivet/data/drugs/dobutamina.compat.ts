export const dobutamineCompatibility = {
  compatibleDiluent: ['Glicose 5%', 'NaCl 0,9%', 'Ringer Lactato'],
  compatibleMeds: [],
  incompatibilities: [
    {
      drug: 'Bicarbonato de sódio',
      why: 'Dobutamina é instável em meio alcalino. Não misturar na mesma bolsa ou Y-site.',
      severity: 'critical' as const,
    },
    {
      drug: 'Furosemida',
      why: 'Incompatibilidade físico-química. Evitar Y-site ou mesma bolsa.',
      severity: 'critical' as const,
    },
    {
      drug: 'Penicilinas / Cefalosporinas',
      why: 'Instabilidade documentada em prática hospitalar. Não misturar.',
      severity: 'warning' as const,
    },
    {
      drug: 'Soluções alcalinas',
      why: 'Dobutamina oxida em meio alcalino. Verificar pH de soluções antes de misturar.',
      severity: 'warning' as const,
    },
  ],
  materialWarnings:
    'Dobutamina oxida com exposição ao ar e luz. A solução pode adquirir coloração levemente rosada. Se não houver partículas ou precipitado, mantém potência clínica por até 24h.',
  practicalWarnings: [
    'Proteger da luz durante infusão.',
    'Diluir para 1–2 mg/mL para melhor precisão da bomba.',
    'Preparar próximo ao momento de uso quando possível.',
  ],
}
