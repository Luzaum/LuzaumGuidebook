export const mixedDisorders = [
  {
    id: 'mixed_1',
    name: 'Acidose Metabólica + Alcalose Respiratória',
    mechanisms: [
      'Choque Séptico inicial: Ocorre SIRS e febre causando hiperventilação (alcalose respiratória) + Hipoperfusão que gera lactato (acidose metabólica).',
      'Pneumonia Severa em um cão idoso: Hipoxia impulsiona ofegância grave (alcalose pCO2 baixa), MAS exaustão da bomba cardíaca ou hipóxia grave tecidual gera acidose láctica simultânea.'
    ],
    presentation: 'O pH final pode vir "normal" ou falsamente perto de 7.4. Mas ao olhar o painel, a pCO2 está esmagada (ex: 20) e o HCO3 está esmagado também (ex: 12). A regra da compensação falha absurdamente pois o pCO2 caiu além do que deveria pelo Winters.',
    danger: 'É letal acreditar que a amostra está "ok" por causa do pH em 7.38. Olhar SEMPRE a base da pCO2 e HCO3 individualmente.'
  },
  {
    id: 'mixed_2',
    name: 'Acidose Metabólica + Alcalose Metabólica',
    mechanisms: [
      'Cachorro parvo-vírus com desidratação maciça e lactato altíssimo (acidose metabólica elevada de AG) MAS também com vômito jorrante de suco gástrico perdendo Cloro (Alcalose metabólica hipoclorêmica).',
      'Cão renal crônico terminal nauseante (vômito urêmico perdendo H+ Cl-) associado aos ácidos urêmicos retidos empurrando por acidose.'
    ],
    presentation: 'O pH pode bater em 7.4. O que entrega o quadro duplo? O HCO3 pode estar medíocre "normal" (ex: 22). Mas o ALERTA vem pelo Gap. O AG está explodido em 35 (acidose) MAS O Cloro está cronicamente destruído em 80. E pCO2 40.',
    danger: 'O HCO3 sócio dos dois processos se anula e disfarça na normalidade. Sem avaliar Cloro e Anion Gap, você perde a acidose gravíssima oculta.'
  },
  {
    id: 'mixed_3',
    name: 'Acidose Mista (Respiratória + Metabólica)',
    mechanisms: [
      'Parada Cardiorrespiratória (PCR). Paciente não respira (pCO2 acumula drasticamente = acidose respiratória) e choque global sem fluxo gera lactato explosivo (ácido latente = acidose metabólica).',
      'Pneumonia Severa + Sepse. O pulmão cansou, reteve CO2. E a sepse arrebentou a perfusão gerando lactato.'
    ],
    presentation: 'O desastre total do pH. O paciente aparece com pH < 6.9 ou menor. pCO2 > 80 e HCO3 < 12 simultaneamente.',
    danger: 'O pH tão baixo reprime a capacidade contrátil do miocárdio de forma drástica, nenhuma adrenalina / amina funciona bem sob pH assim. Corrija o CO2 primeiro entubando/ventilando.'
  }
];
