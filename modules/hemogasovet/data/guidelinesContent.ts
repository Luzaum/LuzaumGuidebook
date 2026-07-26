export const guidelinesContent = [
  {
    id: 'step-by-step',
    title: 'Passo a Passo da Leitura',
    category: 'basics',
    content: `
      ### 1. Olhe o pH primeiro
      - pH < 7,35: acidemia. O distúrbio primário pode ser uma acidose.
      - pH > 7,45: alcalemia. O distúrbio primário pode ser uma alcalose.
      - pH entre 7,35 e 7,45: pode haver distúrbio misto ou compensação crônica. Sempre confira a pressão de dióxido de carbono (pCO2) e o bicarbonato (HCO3), mesmo com pH normal.

      ### 2. Olhe a pCO2 e o HCO3
      - Qual deles explica o pH?
      - Se acidemia (pH baixo): A pCO2 alta (acidose respiratória) explica? Ou o HCO3 baixo (acidose metabólica) explica?
      - Se alcalemia (pH alto): A pCO2 baixa (alcalose respiratória) explica? Ou o HCO3 alto (alcalose metabólica) explica?
      - O componente cuja alteração explica a direção do pH indica o provável distúrbio primário.

      ### 3. Avalie o Movimento do Outro Parâmetro
      - O parâmetro que não é o primário está se movendo na direção esperada?
      - Exemplo: se o HCO3 e o pH caíram em uma acidose metabólica primária, a pCO2 deve cair como resposta à hiperventilação compensatória.
      - Se o outro parâmetro não se move como esperado, considere um distúrbio misto.

      ### 4. Calcule a Compensação Esperada
      - A compensação tem uma faixa matematicamente previsível. Se a pCO2 estiver fora da faixa prevista pela fórmula de Winter ou por uma regra equivalente, considere um segundo distúrbio sobreposto.

      ### 5. Calcule o hiato aniônico (AG)
      - Na acidose metabólica, o AG ajuda a diferenciar perda de bicarbonato, geralmente com hipercloremia, de acúmulo de ácidos não mensurados.

      ### 6. Olhe a Oxigenação (apenas se Arterial)
      - Pressão parcial de oxigênio (pO2) ou saturação de oxigênio (SatO2) baixas indicam hipoxemia. Calcule a relação entre pressão arterial e fração inspirada de oxigênio (PaO2/FiO2, ou P/F) e o gradiente alvéolo-arterial (A-a) para investigar o mecanismo.
    `
  },
  {
    id: 'arterial-vs-venous',
    title: 'Amostra arterial, venosa central ou venosa periférica',
    category: 'sampling',
    content: `
      A validade da interpretação hemogasométrica depende do local de coleta.
      
      ### Arterial, como artéria femoral ou dorsal do pé
      - É a referência para avaliar função respiratória e oxigenação.
      - É a amostra apropriada para avaliar a troca gasosa pulmonar pela pressão arterial de oxigênio (PaO2).
      - A coleta pode causar dor e alterar transitoriamente o padrão respiratório.
      
      ### Venosa Central (Jugular)
      - Ajuda a avaliar perfusão sistêmica e extração de oxigênio.
      - Reflete o pH e o dióxido de carbono após a passagem do sangue pelos tecidos.
      - É útil para lactato e saturação venosa central de oxigênio.
      - A pCO2 venosa central costuma ser discretamente maior que a arterial; interprete no contexto clínico.

      ### Venosa Periférica (Cefálica / Safena)
      - É útil para eletrólitos, como sódio (Na), potássio (K), cloro (Cl) e cálcio (Ca), além de bicarbonato (HCO3) e excesso de bases.
      - Lactato, pH e pCO2 podem sofrer influência local quando há estase, garrote prolongado ou baixa perfusão periférica.
      - Não use a pO2 venosa periférica para classificar a oxigenação pulmonar.
    `
  },
  {
    id: 'anion-gap-master',
    title: 'Hiato aniônico e lactato',
    category: 'advanced',
    content: `
      Na acidose metabólica, calcule o hiato aniônico (AG).
      
      **Fórmula:** AG = (Na + K) - (Cl + HCO3)
      
      - Se o **AG estiver alto**: há aumento de ânions não mensurados. Considere:
        - Cetonas, como na cetoacidose diabética.
        - Ácidos urêmicos.
        - Lactato, como no choque, na isquemia ou na sepse.
        - Intoxicações, conforme a exposição e a espécie.

      - Se o **AG estiver normal**: uma acidose hiperclorêmica pode decorrer de perda de bicarbonato ou ganho relativo de cloro.
        - Diarreia com perda fecal de bicarbonato.
        - Administração de grande volume de cloreto de sódio a 0,9%.
        - Acidose tubular renal.
      
      **Armadilha da Albumina:**
      A albumina é um dos principais ânions não mensurados fisiológicos. Em cães e gatos hipoalbuminêmicos, o AG pode parecer normal apesar do aumento de outros ânions. Considere a correção pela albumina e a faixa de referência do laboratório.
    `
  }
];
