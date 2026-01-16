export const ketamineDilutionGuidance = {
  problem:
    'A apresentação comercial é concentrada (50–100 mg/mL). Em CRI analgésica, a taxa pode ficar baixa demais para a bomba.',
  recommendedTargetsMgMl: [10, 2, 1],
  example: {
    scenario: 'Gato 3 kg — bolus 5 mg/kg (indução)',
    math: [
      'Dose total = 5 × 3 = 15 mg',
      'Se usar 100 mg/mL → 15 mg ÷ 100 mg/mL = 0,15 mL (margem de erro alta)',
      'Se diluir para 10 mg/mL → 15 mg ÷ 10 mg/mL = 1,5 mL (mais seguro)',
    ],
    howToMake1mgMlFrom100mgMl:
      'Para CRI: 1 mL (100 mg) + 99 mL diluente = 1 mg/mL (1:100).',
  },
}
