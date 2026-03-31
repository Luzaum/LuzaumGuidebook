export const guidelinesContent = [
  {
    id: 'step-by-step',
    title: 'Passo a Passo da Leitura',
    category: 'basics',
    content: `
      ### 1. Olhe o pH primeiro
      - pH < 7.35: Acidemia. O distúrbio primário deve ser uma ACIDOSIS.
      - pH > 7.45: Alcalemia. O distúrbio primário deve ser uma ALKALOSIS.
      - pH Normal (7.35-7.45): Pode haver distúrbio misto perfeitamente compensado ou compensação crônica extrema. Sempre cheque PCO2 e HCO3 mesmo com pH normal.

      ### 2. Olhe a pCO2 e o HCO3
      - Qual deles explica o pH?
      - Se acidemia (pH baixo): A pCO2 alta (acidose respiratória) explica? Ou o HCO3 baixo (acidose metabólica) explica?
      - Se alcalemia (pH alto): A pCO2 baixa (alcalose respiratória) explica? Ou o HCO3 alto (alcalose metabólica) explica?
      - O fator que 'bate' com o pH é o Distúrbio Primário.

      ### 3. Avalie o Movimento do Outro Parâmetro
      - O parâmetro que NÃO é o primário está se movendo na mesma direção? 
      - Ex: Se HCO3 caiu e pH caiu (Acidose Metabólica primária), a pCO2 DEVE cair para tentar compensar (Hiperventilação compensatória).
      - Se o outro parâmetro não se move ou move ao contrário, há um DISTÚRBIO MISTO.

      ### 4. Calcule a Compensação Esperada
      - A compensação é previsível matematicamente. Se a pCO2 caiu muito menos ou muito mais do que a fórmula de compensação esperada de Winter/equivalente, há um segundo distúrbio sobreposto.

      ### 5. Sempre Calcule o Anion Gap (AG)
      - Na acidose metabólica, o AG define se o problema é perda de base (AG Normal/Hiperclorêmica) ou acúmulo de ácido letal oculto (AG Alto).

      ### 6. Olhe a Oxigenação (apenas se Arterial)
      - pO2 baixa / SatO2 baixa? Se sim, é hipoxemia. Calcule a relação PaO2/FiO2 (P/F ratio) e o gradiente Alvéolo-arterial (A-a) para descobrir por que o pulmão está falhando.
    `
  },
  {
    id: 'arterial-vs-venous',
    title: 'Arterial vs. Venosa Central vs. Periférica',
    category: 'sampling',
    content: `
      A hemogasometria é validade dependentemente de onde a amostra foi tirada.
      
      ### Arterial (A. Femoral / Dorsal do pé)
      - **Padrão Ouro** para Função Respiratória e Oxigenação.
      - ÚNICA amostra que atesta se o pulmão está trocando gases (PaO2).
      - Dolorosa. Pode alterar padroes respiratórios pelo choro (alcalose respiratória momentânea).
      
      ### Venosa Central (Jugular)
      - **Padrão Ouro** para Perfusão Sistêmica.
      - Reflete excelente espelho de CO2 e pH do CORPO INTEIRO pós tecidos.
      - Útil para cálculo real do lactato e de extração sistêmica de O2.
      - pCO2 venoso será em média 4 a 6 mmHg MAIOR que o arterial.

      ### Venosa Periférica (Cefálica / Safena)
      - **Ótima para** eletrólitos (Na, K, Cl, Ca), lactato locoregional (cautela se garrote for muito frote), HCO3, BD.
      - **Não reflete** o CO2 sistêmico verdadeiramente se houver estase severa ou temperatura local muito baixa (choque com garrote longo). A pCO2 aqui pode vir absurdamente alta enquanto o paciente pulmomente está ótimo.
    `
  },
  {
    id: 'anion-gap-master',
    title: 'Domine o Anion Gap & Lactato',
    category: 'advanced',
    content: `
      Na acidose metabólica, SEMPRE calcule o Anion Gap.
      
      **Fórmula:** AG = (Na + K) - (Cl + HCO3)
      
      - Se **AG for ALTO (>25)**: Existe um ácido não-mensurado empurrando o bicarbonato ladeira abaixo.
        - **K**etones (Cetoacidose)
        - **U**remia (Ácidos renais)
        - **L**actato (Choque, isquemia, sepse)
        - **P**oisons (Intoxicações: etilenoglicol, salicilatos)

      - Se **AG for NORMAL (15-25)**: É uma acidose HIPERCLORÊMICA. O corpo perdeu HCO3 puro (ou via fezes ou urina) e na tentativa de manter neutralidade elétrica, os rins reabsorveram o Cloro.
        - Diarreia severa (perda fecal de base).
        - Fluidoterapia pesada com NaCl 0.9% (Você está literalmente injetando ácido clorídrico indireto).
        - Doença renal (Acidose Tubular).
      
      **Armadilha da Albumina:**
      A albumina é o principal "ânion não medido" fisiológico. Gatos/Cães criticamente doentes e hipoalbuminêmicos podem ter um **"Falso AG Normal"**. Cada decréscimo de 1 g/dL na albumina esconde 3 a 4 mEq de AG. A acidose latente passa despercebida!
    `
  }
];
