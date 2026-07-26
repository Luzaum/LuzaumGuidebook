export const mixedDisorders = [
  {
    id: 'mixed_1',
    name: 'Acidose Metabólica + Alcalose Respiratória',
    mechanisms: [
      'No choque séptico inicial, a síndrome da resposta inflamatória sistêmica (SIRS), a febre e a dor podem causar hiperventilação, enquanto a hipoperfusão aumenta o lactato.',
      'Na pneumonia grave, a hipoxemia pode causar hiperventilação e alcalose respiratória, enquanto a hipóxia tecidual ou o choque podem produzir acidose láctica simultânea.'
    ],
    presentation: 'O pH pode permanecer próximo de 7,40, enquanto a pCO2 e o HCO3 estão simultaneamente baixos. A pCO2 abaixo da faixa prevista pela fórmula de Winter sustenta alcalose respiratória associada.',
    danger: 'Um pH próximo do intervalo de referência não exclui gravidade. Avalie individualmente pCO2, HCO3, lactato e perfusão.'
  },
  {
    id: 'mixed_2',
    name: 'Acidose Metabólica + Alcalose Metabólica',
    mechanisms: [
      'Enterite por parvovírus com desidratação e hiperlactatemia pode coexistir com vômitos e perda de cloro, produzindo acidose e alcalose metabólicas simultâneas.',
      'Na doença renal crônica, a retenção de ácidos urêmicos pode coexistir com vômitos e perda gástrica de ácido clorídrico.'
    ],
    presentation: 'O pH e o HCO3 podem ficar próximos do intervalo de referência. A combinação de hiato aniônico (AG) elevado e hipocloremia desproporcional revela os dois processos.',
    danger: 'Os efeitos opostos sobre o bicarbonato podem se neutralizar. Avalie cloro, AG, relação delta e contexto clínico.'
  },
  {
    id: 'mixed_3',
    name: 'Acidose Mista (Respiratória + Metabólica)',
    mechanisms: [
      'Na parada cardiorrespiratória (PCR), a ausência de ventilação acumula dióxido de carbono, enquanto a interrupção do fluxo sanguíneo aumenta o lactato.',
      'Na pneumonia grave associada à sepse, a falência ventilatória pode causar retenção de CO2 e a hipoperfusão pode elevar o lactato.'
    ],
    presentation: 'O pH está muito baixo, com pCO2 elevada e HCO3 reduzido simultaneamente. A magnitude de cada alteração deve ser interpretada com a situação clínica e a qualidade da amostra.',
    danger: 'A acidemia grave reduz a contratilidade miocárdica e a resposta às catecolaminas. Priorize reanimação, ventilação e correção da causa de base.'
  }
];
