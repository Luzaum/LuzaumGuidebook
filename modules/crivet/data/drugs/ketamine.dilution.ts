export const ketamineDilutionGuidance = {
  problem:
    'A apresentação comercial é concentrada (50–100 mg/mL). Em CRI analgésica, a taxa pode ficar muito baixa para a bomba ser precisa.',
  recommendedTargetsMgMl: [1, 2],
  example: {
    scenario: 'Cão 10 kg — CRI 0,5 mg/kg/h',
    math: [
      'Dose total por hora = 0,5 × 10 = 5 mg/h',
      'Se usar 100 mg/mL puro → 5 mg/h ÷ 100 mg/mL = 0,05 mL/h (impreciso)',
      'Se diluir para 1 mg/mL → 5 mg/h ÷ 1 mg/mL = 5 mL/h (mais seguro)',
    ],
    howToMake1mgMlFrom100mgMl:
      'Retire 1 mL (100 mg) e complete para 100 mL com diluente compatível → 1 mg/mL.',
  },
}
