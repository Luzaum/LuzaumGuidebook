import { BloodGasInput } from '../types';

export interface ParameterGuideEntry {
  label: string;
  unit: string;
  whatItIs: string;
  highMeaning: string;
  lowMeaning: string;
  relationships: string[];
  scenarios: string[];
  pitfalls: string[];
  sampleLimitations?: string;
}

type ComputedHemogasParameter =
  | 'PAO2'
  | 'aaGradient'
  | 'pfRatio'
  | 'ctO2'
  | 'FO2Hb'
  | 'COHb'
  | 'MetHb'
  | 'HHb'
  | 'tHb'
  | 'osmolality'
  | 'SID'
  | 'strongIonGap'
  | 'standardBaseExcess'
  | 'actualBaseExcess'
  | 'respiratoryQuotient';

export const PARAMETER_GUIDE: Partial<Record<keyof BloodGasInput | 'barometricPressure' | 'altitude' | ComputedHemogasParameter, ParameterGuideEntry>> = {
  pH: {
    label: 'pH',
    unit: 'adimensional',
    whatItIs: 'Resume o balanco entre ácidos e bases no sangue.',
    highMeaning: 'Alcalemia ou compensação excessiva aparente.',
    lowMeaning: 'Acidemia por distúrbio respiratório, metabólico ou misto.',
    relationships: ['Interpretar sempre junto de pCO2 e HCO3/BE.', 'pH normal pode mascarar distúrbio misto.'],
    scenarios: ['Choque', 'DKA', 'vomitos', 'doença pulmonar', 'obstrução uretral'],
    pitfalls: ['Nunca interpretar pH isoladamente.', 'Valores extremos exigem revisao de unidade ou digitacao.'],
  },
  pCO2: {
    label: 'pCO2',
    unit: 'mmHg',
    whatItIs: 'Reflete a ventilação alveolar e o componente respiratório do equilíbrio ácido-base.',
    highMeaning: 'Hipoventilação e tendência à acidose respiratória.',
    lowMeaning: 'Hiperventilação e tendência à alcalose respiratória.',
    relationships: ['Avaliar com pH.', 'Relacionar com PaO2 e gradiente A-a em amostra arterial.'],
    scenarios: ['Sedação', 'fadiga respiratória', 'dor', 'ansiedade', 'doença pleural'],
    pitfalls: ['Amostra venosa não substitui análise arterial da oxigenação.'],
  },
  pO2: {
    label: 'pO2',
    unit: 'mmHg',
    whatItIs: 'Estima a pressão parcial de oxigênio dissolvido.',
    highMeaning: 'Hiperóxia ou oxigenioterapia.',
    lowMeaning: 'Hipoxemia.',
    relationships: ['Interpretar com fração inspirada de oxigênio (FiO2), tipo de amostra, saturação arterial de oxigênio (SaO2) e gradiente alvéolo-arterial (A-a).', 'Não usar a pressão venosa de oxigênio (PvO2) como medida do desempenho pulmonar.'],
    scenarios: ['Pneumonia', 'edema pulmonar', 'hipoventilacao', 'derrame pleural'],
    pitfalls: ['Sem FiO2 a interpretação fica limitada.', 'Em amostra venosa não indica troca gasosa pulmonar.'],
    sampleLimitations: 'Confiável para desempenho pulmonar apenas em amostra arterial.',
  },
  PAO2: {
    label: 'PAO2 alveolar calculada',
    unit: 'mmHg',
    whatItIs: 'Estimativa da pressão alveolar de oxigênio pela equação dos gases alveolares: PAO2 = FiO2 x (Pb - PH2O) - PaCO2/R.',
    highMeaning: 'Geralmente reflete FiO2 alta, pressão barométrica adequada e/ou PaCO2 baixa.',
    lowMeaning: 'Pode cair por FiO2 baixa, altitude, baixa pressão barométrica ou hipoventilação com PaCO2 alta.',
    relationships: ['Usada para calcular o gradiente alvéolo-arterial (A-a).', 'Depende de FiO2, pressão barométrica, vapor de água e PaCO2.'],
    scenarios: ['Hipoxemia arterial', 'anestesia', 'ventilação mecânica', 'oxigenioterapia'],
    pitfalls: ['É calculada, não medida; se a FiO2 estiver errada, a PAO2 e o gradiente A-a também ficarão errados.'],
    sampleLimitations: 'Só faz sentido com amostra arterial quando PaO2 e PaCO2 pertencem ao mesmo momento clínico.',
  },
  aaGradient: {
    label: 'Gradiente alvéolo-arterial (A-a)',
    unit: 'mmHg',
    whatItIs: 'Diferença entre a PAO2 calculada e a PaO2 medida. Mostra quanto oxigênio saiu do alvéolo e efetivamente chegou ao sangue arterial.',
    highMeaning: 'Aumento sugere defeito de troca pulmonar: desequilíbrio entre ventilação e perfusão (V/Q), desvio sanguíneo, difusão prejudicada, edema, pneumonia, atelectasia ou tromboembolismo.',
    lowMeaning: 'Gradiente normal com hipoxemia favorece hipoventilação pura, baixa FiO2 ou baixa pressão inspirada de oxigênio.',
    relationships: ['Interpretar junto de PaCO2: hipercapnia com A-a normal aponta para hipoventilacao.', 'Interpretar junto de P/F e imagem torácica.'],
    scenarios: ['Pneumonia', 'edema pulmonar', 'atelectasia', 'desvio sanguíneo', 'hipoventilação anestésica'],
    pitfalls: ['Não calcular em sangue venoso.', 'Uma FiO2 estimada incorretamente distorce o gradiente.', 'Com FiO2 alta, o gradiente tende a aumentar e precisa de contexto.'],
    sampleLimitations: 'Calcular somente em amostra arterial com PaO2, PaCO2 e FiO2 confiaveis.',
  },
  pfRatio: {
    label: 'Relação PaO2/FiO2 (P/F)',
    unit: 'mmHg',
    whatItIs: 'Índice simples de eficiência da oxigenação arterial: PaO2 dividida pela FiO2 em fração.',
    highMeaning: 'Melhor eficiência de oxigenação; em ar ambiente normal, costuma ser alto.',
    lowMeaning: 'Sugere comprometimento da oxigenação, especialmente se persistente apesar do oxigênio.',
    relationships: ['Complementa o gradiente A-a, mas não identifica o mecanismo sozinho.', 'Usar com FiO2 real e tipo de amostra arterial.'],
    scenarios: ['Triagem de insuficiência respiratória', 'monitoração da oxigenioterapia', 'ventilação mecânica'],
    pitfalls: ['Não usar a relação PvO2/FiO2.', 'A relação PaO2/FiO2 (P/F) pode parecer melhor ou pior se a FiO2 informada for aproximada.'],
    sampleLimitations: 'Somente com PaO2 arterial.',
  },
  HCO3: {
    label: 'HCO3',
    unit: 'mEq/L',
    whatItIs: 'Principal tampao metabólico.',
    highMeaning: 'Alcalose metabólica ou compensação renal crônica.',
    lowMeaning: 'Acidose metabólica ou compensação de alcalose respiratória.',
    relationships: ['Comparar com excesso de bases (BE) e cloro (Cl).', 'Essencial para o hiato aniônico e a compensação esperada.'],
    scenarios: ['Diarreia', 'vomitos', 'doença renal', 'DKA'],
    pitfalls: ['Se conflitar com o excesso de bases (BE), revisar sinal e unidade.', 'Não assumir distúrbio simples sem conferir a compensação.'],
  },
  BE: {
    label: 'Base excess',
    unit: 'mEq/L',
    whatItIs: 'Quantifica o componente metabólico independentemente da pCO2.',
    highMeaning: 'Excesso de base, consistente com alcalose metabólica.',
    lowMeaning: 'Déficit de base, consistente com acidose metabólica.',
    relationships: ['Deve caminhar de forma coerente com HCO3.', 'Ajuda quando HCO3 esta ausente.'],
    scenarios: ['Choque', 'perdas gastricas', 'diarreia', 'insuficiencia renal'],
    pitfalls: ['Sinal invertido gera interpretação enganosa.', 'Conflito com HCO3 deve gerar cautela.'],
  },
  AG: {
    label: 'Anion gap',
    unit: 'mEq/L',
    whatItIs: 'Ajuda a diferenciar acidose metabólica por ácidos não mensurados de acidose hiperclorêmica.',
    highMeaning: 'Ácidos não mensurados elevados.',
    lowMeaning: 'Pode refletir hipoalbuminemia ou erro de entrada.',
    relationships: ['Corrigir por albumina quando possível.', 'Interpretar junto de lactato, glicose e HCO3.'],
    scenarios: ['DKA', 'sepse', 'uremia', 'intoxicacoes'],
    pitfalls: ['Hiato aniônico (AG) normal não exclui acidose quando a albumina está baixa.'],
  },
  Na: {
    label: 'Sódio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation extracelular.',
    highMeaning: 'Déficit de água livre ou ganho de sódio.',
    lowMeaning: 'Excesso relativo de água ou perda de sódio.',
    relationships: ['Influencia AG e osmolaridade.', 'Comparar com glicose e contexto de desidratacao.'],
    scenarios: ['Desidratacao', 'hipoadrenocorticismo', 'diabetes insipidus'],
    pitfalls: ['Mudancas rapidas sao mais perigosas do que o numero isolado.'],
  },
  K: {
    label: 'Potássio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation intracelular, crítico para excitabilidade cardiaca.',
    highMeaning: 'Risco de arritmia e fraqueza muscular.',
    lowMeaning: 'Fraqueza, íleo, piora de alcalose e sensibilidade a insulina.',
    relationships: ['Interpretar com pH e ECG.', 'Em DKA, valor normal pode mascarar depleção total.'],
    scenarios: ['Obstrução uretral', 'DKA', 'vomitos', 'doença renal'],
    pitfalls: ['Não confiar apenas no valor sérico em acidemia importante.'],
  },
  Cl: {
    label: 'Cloro',
    unit: 'mEq/L',
    whatItIs: 'Principal anion extracelular mensurado.',
    highMeaning: 'Tende à acidose metabólica hiperclorêmica.',
    lowMeaning: 'Tende à alcalose metabólica hipoclorêmica.',
    relationships: ['Ler com HCO3 e fluidoterapia.', 'Ajuda a diferenciar perdas gastricas de intestinais.'],
    scenarios: ['Vômitos', 'diarreia', 'uso excessivo de NaCl 0.9%'],
    pitfalls: ['O valor isolado não explica o distúrbio sem o contexto do bicarbonato.'],
  },
  albumin: {
    label: 'Albumina',
    unit: 'g/dL',
    whatItIs: 'Principal proteína plasmática e ânion não mensurado relevante.',
    highMeaning: 'Hemoconcentracao ou desidratacao.',
    lowMeaning: 'Hipoalbuminemia; reduz o hiato aniônico (AG) aparente e a pressão oncótica.',
    relationships: ['Corrigir AG por albumina.', 'Relacionar com perfusão e doença hepática/intestinal.'],
    scenarios: ['PLE', 'hepatopatia', 'inflamacao sistêmica'],
    pitfalls: ['O hiato aniônico (AG) pode parecer normal pela falsa redução de ânions não mensurados.'],
  },
  lactate: {
    label: 'Lactato',
    unit: 'mmol/L',
    whatItIs: 'Marcador de metabolismo anaerobio e perfusão.',
    highMeaning: 'Hipoperfusão, sepse ou causa tipo B.',
    lowMeaning: 'Sem relevancia clínica isolada.',
    relationships: ['Interpretar com choque, AG e perfusão.', 'Clearance seriado e mais util que medida única.'],
    scenarios: ['Sepse', 'GDV', 'choque hipovolemico'],
    pitfalls: ['Elevação isolada sem contexto não estabelece diagnóstico.'],
  },
  glucose: {
    label: 'Glicose',
    unit: 'mg/dL',
    whatItIs: 'Substrato energetico e marcador de estresse/metabolismo.',
    highMeaning: 'Estresse, diabetes, DKA.',
    lowMeaning: 'Risco neurologico, sepse, insulinoma, filhotes graves.',
    relationships: ['Interpretar com hiato aniônico (AG) e potássio (K) na suspeita de cetoacidose diabética (CAD).', 'Corrige parte da leitura do sódio na hiperglicemia.'],
    scenarios: ['DKA', 'sepse', 'filhotes graves'],
    pitfalls: ['Hiperglicemia de estresse e comum em gatos.'],
  },
  osmolality: {
    label: 'Osmolalidade calculada',
    unit: 'mOsm/kg',
    whatItIs: 'Estimativa da carga osmótica plasmática, geralmente dominada por sódio, glicose e ureia quando disponíveis.',
    highMeaning: 'Hiperosmolalidade pode indicar déficit de água livre, hipernatremia, hiperglicemia grave ou intoxicacoes osmoticamente ativas.',
    lowMeaning: 'Hipo-osmolalidade ocorre em excesso de água livre e hiponatremia verdadeira.',
    relationships: ['Interpretar com Na, glicose, ureia e estado neurologico.', 'Ajuda a diferenciar hiponatremia verdadeira de pseudohiponatremia/hiperglicemia.'],
    scenarios: ['DKA/HHS', 'hipernatremia', 'hiponatremia neurologica', 'intoxicacoes'],
    pitfalls: ['Muitos gásômetros não reportam ureia; uma fórmula incompleta fornece apenas uma estimativa.'],
  },
  SID: {
    label: 'Strong ion difference (SID)',
    unit: 'mEq/L',
    whatItIs: 'Diferenca entre cations fortes e ânions fortes, principalmente Na + K - Cl. Relaciona eletrólitos com acidose/alcalose pelo modelo fisico-quimico.',
    highMeaning: 'SID alto favorece alcalinizacao, frequentemente por hipocloremia relativa.',
    lowMeaning: 'SID baixo favorece acidificacao, frequentemente por hipercloremia relativa.',
    relationships: ['Na-Cl e Cl/Na sao atalhos praticos para perceber o efeito do cloro.', 'Complementa HCO3, BE e AG.'],
    scenarios: ['Vômitos hipocloremicos', 'diarreia', 'fluidoterapia com NaCl 0.9%', 'doença renal'],
    pitfalls: ['Não substitui a abordagem tradicional; integra principalmente a interpretação de cloro e sódio.'],
  },
  strongIonGap: {
    label: 'Strong ion gap (SIG)',
    unit: 'mEq/L',
    whatItIs: 'Estimativa de ânions fortes não mensurados no modelo físico-químico.',
    highMeaning: 'Sugere ânions não mensurados, semelhante ao raciocínio de hiato aniônico alto, mas com mais variáveis.',
    lowMeaning: 'Pode ocorrer por erro de dados ou alteracoes de proteinas/fosfato conforme fórmula usada.',
    relationships: ['Relaciona-se com AG, lactato, albumina e fosfato.', 'Pode refinar a avaliação em pacientes criticos.'],
    scenarios: ['Sepse', 'choque', 'uremia', 'intoxicacoes', 'DKA'],
    pitfalls: ['Depende de fórmula e parametros nem sempre disponiveis no gasometro.'],
  },
  iCa: {
    label: 'Cálcio ionizado',
    unit: 'mmol/L',
    whatItIs: 'Fração biologicamente ativa do cálcio.',
    highMeaning: 'Pode acompanhar neoplasia, hiperparatireoidismo ou erro de unidade.',
    lowMeaning: 'Maior irritabilidade neuromuscular e piora de cardiotoxicidade por hipercalemia.',
    relationships: ['Importante na obstrução uretral e cetoacidose diabética.', 'O pH altera a fração ionizada.'],
    scenarios: ['Obstrução uretral', 'pancreatite', 'eclampsia'],
    pitfalls: ['Conferir unidade quando valor parecer muito alto.'],
  },
  tCa: {
    label: 'Cálcio total',
    unit: 'mg/dL',
    whatItIs: 'Soma do cálcio ligado e ionizado.',
    highMeaning: 'Hipercalcemia.',
    lowMeaning: 'Pode refletir hipoalbuminemia sem reduzir iCa.',
    relationships: ['Interpretar junto da albumina e do cálcio ionizado (iCa).', 'Não substitui o cálcio ionizado (iCa) em pacientes críticos.'],
    scenarios: ['Neoplasia', 'hipoalbuminemia'],
    pitfalls: ['Não usar o cálcio total isoladamente para uma decisão crítica.'],
  },
  hematocrit: {
    label: 'Hematocrito',
    unit: '%',
    whatItIs: 'Proporcao de volume sanguineo ocupada por eritrócitos.',
    highMeaning: 'Hemoconcentracao ou policitemia.',
    lowMeaning: 'Anemia e menor capacidade de transporte de oxigênio.',
    relationships: ['Interpretar com hemoglobina, perfusão e PaO2.', 'Hipoxemia pode ser agravada por anemia.'],
    scenarios: ['Hemorragia', 'desidratacao', 'hemolise'],
    pitfalls: ['PaO2 normal não exclui hipóxia se hemoglobina (Hb) e hematócrito (Ht) estiverem baixos.'],
  },
  hemoglobin: {
    label: 'Hemoglobina',
    unit: 'g/dL',
    whatItIs: 'Principal carreador de oxigênio no sangue.',
    highMeaning: 'Pode acompanhar hemoconcentracao.',
    lowMeaning: 'Reduz o conteúdo arterial de oxigênio mesmo com PaO2 normal.',
    relationships: ['Integrar com Ht, SaO2 e quadro perfusional.', 'Baixa Hb limita DO2.'],
    scenarios: ['Anemia hemorrágica', 'hemolise', 'doença crônica'],
    pitfalls: ['Não confundir boa saturação com entrega adequada de oxigênio.'],
  },
  tHb: {
    label: 'Hemoglobina total (tHb)',
    unit: 'g/dL',
    whatItIs: 'Hemoglobina total medida por co-oximetria; define a capacidade máxima de transporte de oxigênio.',
    highMeaning: 'Hemoconcentracao ou policitemia; pode aumentar viscosidade.',
    lowMeaning: 'Anemia reduz conteúdo arterial de O2 mesmo com PaO2 e SaO2 normais.',
    relationships: ['Conteúdo arterial de O2 depende muito mais de Hb e SaO2 do que do O2 dissolvido.', 'Interpretar com Ht, lactato e perfusão.'],
    scenarios: ['Hemorragia', 'hemolise', 'desidratacao', 'choque'],
    pitfalls: ['PaO2 normal não garante entrega de oxigênio se a hemoglobina total (tHb) está baixa.'],
  },
  ctO2: {
    label: 'Conteúdo de oxigênio (ctO2/CaO2)',
    unit: 'mL/dL',
    whatItIs: 'Quantidade total de oxigênio no sangue, somando O2 ligado à hemoglobina e pequena fração dissolvida.',
    highMeaning: 'Pode refletir Hb alta e saturação adequada.',
    lowMeaning: 'Indica risco de baixa entrega de O2 por anemia, dessaturacao ou ambas.',
    relationships: ['DO2 depende de ctO2 e debito cardíaco.', 'Relacionar com lactato, perfusão, Hb e SaO2.'],
    scenarios: ['Anemia crítica', 'choque', 'hipoxemia', 'transfusao'],
    pitfalls: ['Não confundir oxigenação pulmonar (PaO2/A-a) com entrega sistêmica de oxigênio (ctO2/DO2).'],
  },
  FO2Hb: {
    label: 'Oxi-hemoglobina fracional (FO2Hb)',
    unit: '%',
    whatItIs: 'Percentual de hemoglobina total que está ligada ao oxigênio, considerando dis-hemoglobinas.',
    highMeaning: 'Boa fração oxigenada quando a co-oximetria é confiável.',
    lowMeaning: 'Pode indicar dessaturacao real ou competicao por COHb/MetHb.',
    relationships: ['Diferente de sO2 calculada se houver COHb ou MetHb.', 'Importante em intoxicacoes e anestesia.'],
    scenarios: ['Intoxicacao por monoxido de carbono', 'metemoglobinemia', 'hipoxemia'],
    pitfalls: ['Saturação de pulso pode enganar em COHb/MetHb.'],
  },
  COHb: {
    label: 'Carboxi-hemoglobina (COHb)',
    unit: '%',
    whatItIs: 'Hemoglobina ligada a monoxido de carbono, incapaz de transportar O2 adequadamente.',
    highMeaning: 'Intoxicacao por CO/fumaca; reduz conteúdo de O2 e desloca curva de dissociacao.',
    lowMeaning: 'Normal, sem impacto clínico relevante.',
    relationships: ['PaO2 pode estar normal apesar de hipóxia tecidual.', 'Correlacionar com incendio, aquecedores, fumaca e sinais neurologicos.'],
    scenarios: ['Inalacao de fumaca', 'ambiente fechado com combustao'],
    pitfalls: ['SpO2 pode parecer falsamente normal. Precisa de co-oximetria.'],
  },
  MetHb: {
    label: 'Metemoglobina (MetHb)',
    unit: '%',
    whatItIs: 'Hemoglobina oxidada que não transporta oxigênio de forma efetiva.',
    highMeaning: 'Metemoglobinemia por oxidantes, tóxicos ou fármacos; causa hipóxia funcional.',
    lowMeaning: 'Normal, sem impacto clínico relevante.',
    relationships: ['Cianose com PaO2 normal deve levantar suspeita.', 'Correlacionar com chocolate/cebola/alho, benzocaina, nitratos e alguns fármacos.'],
    scenarios: ['Toxicologia', 'cianose refrataria', 'sangue achocolatado'],
    pitfalls: ['O oxigênio pode não corrigir completamente a hipóxia funcional se a metemoglobina (MetHb) estiver alta.'],
  },
  HHb: {
    label: 'Desoxi-hemoglobina (HHb)',
    unit: '%',
    whatItIs: 'Fração de hemoglobina não ligada ao oxigênio.',
    highMeaning: 'Aumenta em dessaturacao, baixa PaO2 ou extracao tecidual elevada em amostras venosas.',
    lowMeaning: 'Fração desoxigenada baixa, geralmente com boa saturação ou oxigenioterapia.',
    relationships: ['Em venosa reflete extracao tecidual e fluxo regional.', 'Em arterial acompanha hipoxemia/dessaturacao.'],
    scenarios: ['Choque', 'hipoxemia', 'monitoracao venosa'],
    pitfalls: ['Interpretar sempre pelo tipo de amostra.'],
  },
  sO2: {
    label: 'Saturação de O2',
    unit: '%',
    whatItIs: 'Percentual de hemoglobina saturada por oxigênio.',
    highMeaning: 'Adequada ou em oxigenioterapia.',
    lowMeaning: 'Dessaturacao relevante.',
    relationships: ['Comparar com pO2.', 'Incompatibilidades podem sugerir erro de amostra ou valor.'],
    scenarios: ['Doença pulmonar', 'desvio sanguíneo', 'hipoventilação'],
    pitfalls: ['A pressão venosa de oxigênio (PvO2) e a saturação venosa (PvSatO2) não medem o desempenho pulmonar.'],
  },
  H: {
    label: 'H+',
    unit: 'nmol/L',
    whatItIs: 'Representa acidez de forma inversa ao pH.',
    highMeaning: 'Acidemia.',
    lowMeaning: 'Alcalemia.',
    relationships: ['Deve ser coerente com o pH.', 'Valor pode denunciar erro de OCR.'],
    scenarios: ['Qualquer distúrbio ácido-base importante'],
    pitfalls: ['Não usar isoladamente.'],
  },
  cHCO3: {
    label: 'cHCO3/std HCO3',
    unit: 'mEq/L',
    whatItIs: 'Formas calculadas/padronizadas de bicarbonato.',
    highMeaning: 'Sugere alcalose metabólica.',
    lowMeaning: 'Sugere acidose metabólica.',
    relationships: ['Serve como apoio quando HCO3 principal estiver ausente.', 'Comparar com HCO3 medido e BE.'],
    scenarios: ['Analises com painel ampliado'],
    pitfalls: ['Pode divergir por arredondamento ou tipo de calculo do aparelho.'],
  },
  tCO2: {
    label: 'tCO2',
    unit: 'mEq/L',
    whatItIs: 'CO2 total, geralmente proximo do bicarbonato em clínica.',
    highMeaning: 'Tende à alcalose metabólica.',
    lowMeaning: 'Tende à acidose metabólica.',
    relationships: ['Complementa HCO3.', 'Comparar com HCO3 e pCO2.'],
    scenarios: ['Painel bioquimico/hemogas ampliado'],
    pitfalls: ['Não substitui sozinho a análise completa.'],
  },
  standardBaseExcess: {
    label: 'Standard base excess (SBE)',
    unit: 'mEq/L',
    whatItIs: 'Base excess padronizado para condicoes de CO2, estimando componente metabólico extracelular.',
    highMeaning: 'Excesso de base metabólico.',
    lowMeaning: 'Déficit de base metabólico.',
    relationships: ['Mais estavel para componente metabólico do que pH isolado.', 'Comparar com HCO3 e BE reportado.'],
    scenarios: ['Choque', 'diarreia', 'vomitos', 'doença renal'],
    pitfalls: ['A nomenclatura varia por aparelho: SBE, BEecf, BE(B). Conferir campo e unidade.'],
  },
  actualBaseExcess: {
    label: 'Actual base excess (ABE)',
    unit: 'mEq/L',
    whatItIs: 'Base excess calculado nas condicoes reais da amostra.',
    highMeaning: 'Excesso de base nas condicoes medidas.',
    lowMeaning: 'Déficit de base nas condicoes medidas.',
    relationships: ['Pode diferir do excesso de bases padrão (SBE).', 'Usar junto do bicarbonato (HCO3) e da pressão de dióxido de carbono (pCO2) para não confundir o componente respiratório.'],
    scenarios: ['Aparelhos que reportam BE(B)/ABE e BEecf/SBE separadamente'],
    pitfalls: ['Não misturar excesso de bases real (ABE) e excesso de bases padrão (SBE) sem saber o que o aparelho está reportando.'],
  },
  respiratoryQuotient: {
    label: 'Quociente respiratório (R)',
    unit: 'adimensional',
    whatItIs: 'Razao entre produção de CO2 e consumo de O2. Na equacao alveolar costuma-se usar 0,8 como padrão.',
    highMeaning: 'Pode subir com metabolismo de carboidrato predominante ou superalimentacao; raramente medido no gasometro comum.',
    lowMeaning: 'Pode cair com oxidacao de gordura/jejum; raramente usado diretamente na rotina.',
    relationships: ['Entra no calculo da PAO2 e, portanto, do gradiente A-a.', 'Na pratica clínica, R=0,8 e uma aproximacao aceitavel na maioria dos casos.'],
    scenarios: ['Cálculo refinado do gradiente alvéolo-arterial (A-a)', 'ventilação mecânica e metabolismo intensivo'],
    pitfalls: ['Não alterar o quociente respiratório (R) sem motivo; isso pode criar falsa precisão.'],
  },
  fio2: {
    label: 'FiO2',
    unit: 'fração interna / porcentagem na interface',
    whatItIs: 'Fração inspirada de oxigênio ofertada ao paciente.',
    highMeaning: 'Oxigenioterapia ou ventilação com enriquecimento de oxigênio.',
    lowMeaning: 'Não aplicável abaixo do ar ambiente.',
    relationships: ['Essencial para P/F e A-a.', 'Deve ser normalizada para fração no cálculo.'],
    scenarios: ['Oxigenioterapia', 'VM', 'avaliação de hipoxemia'],
    pitfalls: ['Confusao entre 21 e 0.21 e uma das falhas mais comuns.'],
  },
  temperature: {
    label: 'Temperatura',
    unit: 'C',
    whatItIs: 'Contextualiza consumo de O2, produção de CO2 e discrepancias entre valor reportado e fisiologia real.',
    highMeaning: 'Hipertermia aumenta metabolismo e demanda de O2.',
    lowMeaning: 'Hipotermia pode reduzir metabolismo e alterar a comparacao clínica com o valor reportado.',
    relationships: ['Orienta a interpretação da pCO2, do lactato e da oxigenação com mais cautela.', 'Deve aparecer no resumo e na qualidade dos dados.'],
    scenarios: ['Sepse', 'choque, trauma, anestesia'],
    pitfalls: ['Não aplicar correção matemática sem base. Contextualizar e alertar é mais seguro.'],
  },
  barometricPressure: {
    label: 'Pressão barometrica',
    unit: 'mmHg',
    whatItIs: 'Ajusta a disponibilidade alveolar de oxigênio.',
    highMeaning: 'Sem significado clínico isolado comum.',
    lowMeaning: 'Pode reduzir PAO2 esperada.',
    relationships: ['Usada no calculo do gradiente A-a.', 'Relacionar com altitude.'],
    scenarios: ['Pacientes em altitude'],
    pitfalls: ['Sem ela, o calculo de A-a e aproximado.'],
  },
  altitude: {
    label: 'Altitude',
    unit: 'm',
    whatItIs: 'Contextualiza a menor pressão ambiental de oxigênio.',
    highMeaning: 'Maior altitude reduz PAO2 esperada.',
    lowMeaning: 'Não aplicável clinicamente ao nível do mar.',
    relationships: ['Pode ajudar a estimar a pressão barométrica.', 'Interfere na leitura da hipoxemia.'],
    scenarios: ['Clinicas em altitude'],
    pitfalls: ['Não classificar hipoxemia sem considerar a altitude quando ela for relevante.'],
  },
};

type ParameterGuideCard = {
  id: string;
  name: string;
  fullName: string;
  category: 'acid-base' | 'oxygenation' | 'electrolyte' | 'metabolite';
  unit: string;
  description: string;
  physiology: string;
  importance: string;
  highMeaning: string;
  lowMeaning: string;
  clinicalScenarios: string[];
  pitfalls: string;
  relationship: string;
};

function inferCategory(id: string): ParameterGuideCard['category'] {
  if (['pH', 'pCO2', 'HCO3', 'BE', 'AG', 'H', 'cHCO3', 'tCO2', 'SID', 'strongIonGap', 'standardBaseExcess', 'actualBaseExcess'].includes(id)) return 'acid-base';
  if (['pO2', 'sO2', 'fio2', 'barometricPressure', 'altitude', 'PAO2', 'aaGradient', 'pfRatio', 'ctO2', 'FO2Hb', 'COHb', 'MetHb', 'HHb', 'tHb', 'respiratoryQuotient'].includes(id)) return 'oxygenation';
  if (['Na', 'K', 'Cl', 'iCa', 'tCa'].includes(id)) return 'electrolyte';
  return 'metabolite';
}

export const parameterGuide: ParameterGuideCard[] = Object.entries(PARAMETER_GUIDE).map(([id, entry]) => ({
  id,
  name: entry?.label || id,
  fullName: entry?.label || id,
  category: inferCategory(id),
  unit: entry?.unit || '',
  description: entry?.whatItIs || '',
  physiology: [entry?.whatItIs, ...(entry?.relationships || [])].filter(Boolean).join(' '),
  importance: [entry?.highMeaning, entry?.lowMeaning, entry?.sampleLimitations].filter(Boolean).join(' '),
  highMeaning: entry?.highMeaning || '',
  lowMeaning: entry?.lowMeaning || '',
  clinicalScenarios: entry?.scenarios || [],
  pitfalls: (entry?.pitfalls || []).join(' '),
  relationship: (entry?.relationships || []).join(' '),
}));
