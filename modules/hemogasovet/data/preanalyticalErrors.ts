export const preanalyticalErrors = [
  {
    id: 'heparin_excess',
    name: 'Excesso de Heparina Líquida',
    mechanism: 'Diluição da amostra e pH alterado.',
    effect: 'Heparina é um ácido. Em seringas de 1mL ou 3mL, molhar a agulha e não expulsar todo o conteúdo afoga o pouco sangue coletado (0.3mL).',
    falseFindings: [
      'Diluição severa e linear de tCO2, HCO3, pCO2',
      'iCa despenca falsamente (heparina quela cálcio)',
      'Falsa acidose leve',
      'Queda em hematócrito'
    ],
    prevention: 'Usar seringas heparinizadas liofilizadas (secas), ou "banhar" e expulsar TODO o volume da líquida, deixando só o resquício na agulha. Coletar o máximo volume.'
  },
  {
    id: 'air_bubbles',
    name: 'Bolhas de Ar na Seringa',
    mechanism: 'Equilibração gasosa com o ar ambiente (pO2 150 e pCO2 0).',
    effect: 'Ar ambiente tem virtualmente zero CO2 e altíssimo O2 comparado ao sangue venoso.',
    falseFindings: [
      'pCO2 despenca rápido (CO2 foge da amostra para a bolha)',
      'pO2 arterial (se paciente < 150mmHg) pode subir, ou se for > 150 (anestesia/FiO2 100) pode descer puxando pro ar normal',
      'Falsa melhora de ventilação, falso distúrbio respiratório com pH alcalêmico arrastado.'
    ],
    prevention: 'Expulsar TODO ar imediatamente. Tapar a ponta (vedar com borracha), Não agitar com bolha lá dentro.'
  },
  {
    id: 'delay_analysis',
    name: 'Demora e Metabolismo Leucocitário',
    mechanism: 'Sem gelo, leucócitos continuam consumindo O2 gulosamente e gerando CO2 em ambiente fechado.',
    effect: 'Sangue continua vivo na seringa e continua o metabolismo celular.',
    falseFindings: [
      'Consumo rápido e artificial de pO2 (Falsa hipoxemia dramática!)',
      'Queda agressiva de Glicose',
      'Aumento forte no Lactato na seringa',
      'pH cai progressivamente'
    ],
    prevention: 'Analisar < 15min. Se for demorar 30 a 60 min, obrigatoriamente colocar em "slurry" (banho) de água e gelo para parar metabolismo enzimático.'
  },
  {
    id: 'hyperventilation_pain',
    name: 'Dor e Panting (Ofegância) na Coleção',
    mechanism: 'Estresse agudo durante a punção arterial muda a ventilação do bixo drasticamente em segundos.',
    effect: 'Se você demorou 2 minutos pelejando na artéria e o Pinscher chorou e ofegou pesado todo o tempo.',
    falseFindings: [
      'Alcaloide respiratória puramente artefatual (pCO2 despenca para 25)',
      'O pH que no doente real anestesiado estaria ótimo, vem em 7.55 te enganando.'
    ],
    prevention: 'Alergias anestésicos tópicos prévios, conter em silêncio antes da dor ou ignorar sutil pCO2 baixo se amostra foi bélicosa.'
  }
];
