export const ketamineCompatibility = {
  compatibleDiluent: ['NaCl 0,9% (SF)', 'Ringer Lactato (RL)', 'Glicose 5% (SG 5%)'],
  physicalIncompatibilities: [
    {
      drug: 'Diazepam',
      why: 'Incompatibilidade física: precipita/cristaliza (não misturar na mesma seringa/linha).',
      severity: 'critical',
    },
    {
      drug: 'Barbitúricos (tiopental/fenobarbital)',
      why: 'Precipitação/incompatibilidade química.',
      severity: 'critical',
    },
    {
      drug: 'Bicarbonato de sódio',
      why: 'pH alcalino pode inativar/alterar a estabilidade.',
      severity: 'critical',
    },
  ],
  cocktailOftenUsed: [
    'Midazolam (preferível para prevenir disforia)',
    'Lidocaína (MLK)',
    'Morfina',
    'Fentanil',
    'Dexmedetomidina',
  ],
}
