export type AppleHelp = { assess: string; physiology: string; pitfalls: string };
export const APPLE_HELP: Record<string, AppleHelp> = {
  mentation: {
    assess: 'Avalie na admissão, antes de sedação ou analgesia que altere a consciência. Grau 0: normal. Grau 1: fica em estação sem ajuda, responsivo, mas deprimido. Grau 2: fica em estação somente com ajuda, responsivo e deprimido. Grau 3: não fica em estação, mas responde. Grau 4: não fica em estação e não responde.',
    physiology: 'Alterações podem acompanhar hipoperfusão cerebral, hipoxemia, distúrbios metabólicos, encefalopatia associada à sepse ou doença neurológica primária.',
    pitfalls: 'Incapacidade de ficar em estação por lesão ortopédica não equivale automaticamente a alteração de consciência. Considere a causa e registre as interferências.',
  },
  fluid: {
    assess: 'Avalie as cavidades abdominal, pleural e pericárdica por FAST/TFAST. Grau 0: sem líquido livre. Grau 1: uma cavidade. Grau 2: duas ou mais cavidades.',
    physiology: 'Efusões podem acompanhar inflamação, hemorragia, congestão ou redução da pressão oncótica.',
    pitfalls: 'O grau conta cavidades, não volume. No protocolo original, ausência de indicação de ultrassom após história e exame físico permitia grau 0; isso exige julgamento clínico explícito e não é preenchido automaticamente aqui.',
  },
  lactate: {
    assess: 'Use o resultado mais anormal das primeiras 24 horas, respeitando a unidade da linha. No canino full, a figura em unidades americanas usa mg/dL: mmol/L × 9,01 ≈ mg/dL. Os demais modelos aqui usam mmol/L.',
    physiology: 'Pode aumentar por hipoperfusão, estímulo adrenérgico, alterações metabólicas ou redução da depuração hepática.',
    pitfalls: 'Não é um marcador exclusivo de hipóxia. Considere coleta, demora no processamento e contexto. As fronteiras diferem entre modelos; não transfira a seleção do FAST para o FULL.',
  },
  pressure: {
    assess: 'PAM em mmHg. O estudo felino usou pressão média por manometria direta/indireta ou a pressão do primeiro retorno de sinal no Doppler, conforme o protocolo dos autores.',
    physiology: 'A pressão contribui para a perfusão dos órgãos, mas não descreve sozinha fluxo sanguíneo ou oferta de oxigênio.',
    pitfalls: 'Não substitua automaticamente PAM por PAS. Verifique método, manguito, posicionamento e interferências de movimento.',
  },
  pcv: {
    assess: 'Selecione o hematócrito em porcentagem, considerando o valor mais anormal nas primeiras 24 horas.',
    physiology: 'Reflete anemia, hemoconcentração, perdas hemorrágicas e efeitos de fluidoterapia ou transfusão.',
    pitfalls: 'Valores baixos recebem zero em alguns intervalos do modelo; isso não indica ausência de gravidade. Preserve os pesos publicados e interprete a anemia separadamente.',
  },
  urea: {
    assess: 'A tabela principal usa ureia em mmol/L, como a Figura 3 do artigo felino. É possível alternar para BUN em mg/dL, conforme o apêndice americano. Ureia (mg/dL) ÷ 2,14 ≈ BUN (mg/dL); ureia (mg/dL) ÷ 6,006 ≈ ureia (mmol/L).',
    physiology: 'Azotemia pode acompanhar hipoperfusão, doença renal, catabolismo aumentado ou hemorragia gastrointestinal.',
    pitfalls: 'Ureia e nitrogênio ureico (BUN) não são o mesmo resultado numérico. Exemplo: ureia 85,6 mg/dL corresponde a aproximadamente BUN 40 mg/dL. As tabelas publicadas têm arredondamentos próprios; confira valores limítrofes na fonte.',
  },
  glucose: {
    assess: 'Use glicemia em mg/dL, com o valor mais anormal nas primeiras 24 horas.',
    physiology: 'Alterações podem acompanhar resposta ao estresse, endocrinopatias, disfunção hepática ou doença sistêmica.',
    pitfalls: 'Glicemia >273 recebe zero no modelo FAST canino. Isso não torna a hiperglicemia benigna: os pesos representam relações multivariáveis, não uma escala linear de normalidade.',
  },
  albumin: {
    assess: 'Use albumina em g/dL. Se o laudo estiver em g/L, divida por 10.',
    physiology: 'Pode diminuir por inflamação, extravasamento capilar, perdas renais ou intestinais, redução de síntese ou hemodiluição.',
    pitfalls: 'FAST e FULL atribuem pesos diferentes. Não interprete cada intervalo como uma categoria isolada de gravidade.',
  },
  platelets: {
    assess: 'Use contagem em mil/µL: 180.000/µL corresponde a 180 na tabela.',
    physiology: 'Trombocitopenia pode refletir consumo, inflamação, destruição imune ou alterações medulares.',
    pitfalls: 'Verifique agregados plaquetários e o esfregaço quando houver suspeita de contagem falsamente baixa.',
  },
  creatinine: {
    assess: 'Use creatinina em mg/dL, selecionando o resultado mais anormal nas primeiras 24 horas.',
    physiology: 'Elevação pode acompanhar redução da filtração por hipoperfusão, lesão renal aguda ou doença renal crônica.',
    pitfalls: 'Massa muscular e doença preexistente influenciam o resultado. APPLE não distingue a causa da azotemia.',
  },
  wbc: {
    assess: 'Use leucócitos em mil/µL: 8.000/µL corresponde a 8,0 na tabela.',
    physiology: 'Leucopenia pode acompanhar consumo e marginação; leucocitose pode ocorrer por inflamação, infecção ou estresse.',
    pitfalls: 'A contagem não confirma nem exclui sepse. Considere diferencial, morfologia e quadro clínico.',
  },
  spo2: {
    assess: 'Use saturação periférica em porcentagem. Confirme sinal adequado e registre suporte de oxigênio.',
    physiology: 'Estima a saturação da hemoglobina e auxilia a reconhecer comprometimento da oxigenação.',
    pitfalls: 'Movimento e baixa perfusão podem interferir. Saturação não mede sozinha a oferta total de oxigênio aos tecidos.',
  },
  bilirubin: {
    assess: 'Use bilirrubina total em mg/dL, não apenas a fração direta ou indireta.',
    physiology: 'Pode aumentar por hemólise, colestase, disfunção hepatocelular ou alterações associadas à sepse.',
    pitfalls: 'Os pontos não aumentam continuamente com a concentração; mantenha os pesos do modelo.',
  },
  respiration: {
    assess: 'Conte movimentos respiratórios por minuto e considere o resultado mais anormal nas primeiras 24 horas.',
    physiology: 'Taquipneia pode acompanhar dor, estresse, alterações ácido-base, hipoxemia ou doença pulmonar.',
    pitfalls: 'Ofegação e agitação podem dificultar a contagem. Registre contexto e qualidade da mensuração.',
  },
  age: {
    assess: 'Selecione a faixa de idade em anos completos.',
    physiology: 'A idade pode refletir diferenças de reserva fisiológica e de doenças concomitantes na população estudada.',
    pitfalls: 'O estudo canino excluiu cães com menos de quatro meses. O modelo não deve ser extrapolado como validado para esses pacientes.',
  },
  temperature: {
    assess: 'Use temperatura retal em °C, com o resultado mais anormal das primeiras 24 horas.',
    physiology: 'Hipotermia felina pode acompanhar choque, hipoperfusão, sepse ou comprometimento da termorregulação.',
    pitfalls: 'As faixas e pontos diferem entre FAST e FULL, inclusive o limite superior da faixa de zero pontos.',
  },
  chloride: {
    assess: 'Use cloreto em mmol/L, observando as faixas publicadas para o FULL felino.',
    physiology: 'Alterações podem acompanhar distúrbios hídricos e ácido-base, perdas gastrointestinais, doença renal e fluidoterapia.',
    pitfalls: 'Interprete junto ao sódio e ao estado ácido-base. Os pontos não têm relação linear com o afastamento do intervalo laboratorial.',
  },
};
