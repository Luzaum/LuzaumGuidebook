export const ketamineCompatibility = {
  compatibleDiluent: ['NaCl 0,9% (SF)', 'Ringer Lactato (RL)', 'Glicose 5% (SG 5%)', 'Ringer simples'],
  physicalIncompatibilities: [
    {
      drug: 'Diazepam',
      why: 'Incompatibilidade física: precipita/cristaliza rapidamente (aspecto branco/leitoso).',
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
    'Morfina',
    'Fentanil',
    'Lidocaína (MLK/FLK — avaliar paciente e doença)',
    'Midazolam (geralmente aceito em diluição; atenção a compatibilidade local)',
    'Dexmedetomidina (avaliar cardiopatas descompensados)',
  ],
}
