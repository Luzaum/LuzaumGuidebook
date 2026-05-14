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
    whatItIs: 'Resume o balanco entre acidos e bases no sangue.',
    highMeaning: 'Alcalemia ou compensacao excessiva aparente.',
    lowMeaning: 'Acidemia por disturbio respiratorio, metabolico ou misto.',
    relationships: ['Interpretar sempre junto de pCO2 e HCO3/BE.', 'pH normal pode mascarar disturbio misto.'],
    scenarios: ['Choque', 'DKA', 'vomitos', 'doenca pulmonar', 'obstrucao uretral'],
    pitfalls: ['Nunca interpretar pH isoladamente.', 'Valores extremos exigem revisao de unidade ou digitacao.'],
  },
  pCO2: {
    label: 'pCO2',
    unit: 'mmHg',
    whatItIs: 'Reflete ventilacao alveolar e o componente respiratorio do equilibrio acido-base.',
    highMeaning: 'Hipoventilacao e tendencia a acidose respiratoria.',
    lowMeaning: 'Hiperventilacao e tendencia a alcalose respiratoria.',
    relationships: ['Avaliar com pH.', 'Relacionar com PaO2 e gradiente A-a em amostra arterial.'],
    scenarios: ['Sedacao', 'fadiga respiratoria', 'dor', 'ansiedade', 'doenca pleural'],
    pitfalls: ['Amostra venosa nao substitui analise arterial de oxigenacao.'],
  },
  pO2: {
    label: 'pO2',
    unit: 'mmHg',
    whatItIs: 'Estima a pressao parcial de oxigenio dissolvido.',
    highMeaning: 'Hiperoxia ou oxigenioterapia.',
    lowMeaning: 'Hipoxemia.',
    relationships: ['Interpretar com FiO2, tipo de amostra, SaO2 e A-a.', 'Nao usar PvO2 como desempenho pulmonar.'],
    scenarios: ['Pneumonia', 'edema pulmonar', 'hipoventilacao', 'derrame pleural'],
    pitfalls: ['Sem FiO2 a interpretacao fica limitada.', 'Em amostra venosa nao indica troca gasosa pulmonar.'],
    sampleLimitations: 'Confiavel para desempenho pulmonar apenas em amostra arterial.',
  },
  PAO2: {
    label: 'PAO2 alveolar calculada',
    unit: 'mmHg',
    whatItIs: 'Estimativa da pressao alveolar de oxigenio pela equacao dos gases alveolares: PAO2 = FiO2 x (Pb - PH2O) - PaCO2/R.',
    highMeaning: 'Geralmente reflete FiO2 alta, pressao barometrica adequada e/ou PaCO2 baixa.',
    lowMeaning: 'Pode cair por FiO2 baixa, altitude/baixa pressao barometrica ou hipoventilacao com PaCO2 alta.',
    relationships: ['Usada para calcular o gradiente A-a.', 'Depende de FiO2, pressao barometrica, vapor de agua e PaCO2.'],
    scenarios: ['Hipoxemia arterial', 'anestesia', 'ventilacao mecanica', 'oxigenioterapia'],
    pitfalls: ['E calculada, nao medida; se FiO2 estiver errada, PAO2 e A-a tambem ficam errados.'],
    sampleLimitations: 'So faz sentido com amostra arterial quando PaO2 e PaCO2 pertencem ao mesmo momento clinico.',
  },
  aaGradient: {
    label: 'Gradiente alvéolo-arterial (A-a)',
    unit: 'mmHg',
    whatItIs: 'Diferenca entre PAO2 calculada e PaO2 medida. Mostra quanto oxigenio saiu do alveolo e efetivamente chegou ao sangue arterial.',
    highMeaning: 'Aumento sugere defeito de troca pulmonar: desequilibrio V/Q, shunt, difusao prejudicada, edema, pneumonia, atelectasia ou tromboembolismo.',
    lowMeaning: 'Gradiente normal com hipoxemia favorece hipoventilacao pura, baixa FiO2 ou baixa pressao inspirada de O2.',
    relationships: ['Interpretar junto de PaCO2: hipercapnia com A-a normal aponta para hipoventilacao.', 'Interpretar junto de P/F e imagem toracica.'],
    scenarios: ['Pneumonia', 'edema pulmonar', 'atelectasia', 'shunt', 'hipoventilacao anestesica'],
    pitfalls: ['Nao calcular em sangue venoso.', 'FiO2 estimada errada distorce o gradiente.', 'Em FiO2 alta, o gradiente tende a aumentar e precisa de contexto.'],
    sampleLimitations: 'Calcular somente em amostra arterial com PaO2, PaCO2 e FiO2 confiaveis.',
  },
  pfRatio: {
    label: 'Relação PaO2/FiO2 (P/F)',
    unit: 'mmHg',
    whatItIs: 'Indice simples de eficiencia de oxigenacao arterial: PaO2 dividida pela FiO2 em fracao.',
    highMeaning: 'Melhor eficiencia de oxigenacao; em ar ambiente normal costuma ser alto.',
    lowMeaning: 'Sugere comprometimento de oxigenacao, especialmente se persistente apesar de oxigenio.',
    relationships: ['Complementa A-a, mas nao identifica mecanismo sozinho.', 'Usar com FiO2 real e tipo de amostra arterial.'],
    scenarios: ['Triagem de insuficiencia respiratoria', 'monitoracao de oxigenoterapia', 'ventilacao mecanica'],
    pitfalls: ['Nao usar PvO2/FiO2.', 'P/F pode parecer melhor ou pior se FiO2 informada for aproximada.'],
    sampleLimitations: 'Somente com PaO2 arterial.',
  },
  HCO3: {
    label: 'HCO3',
    unit: 'mEq/L',
    whatItIs: 'Principal tampao metabolico.',
    highMeaning: 'Alcalose metabolica ou compensacao renal cronica.',
    lowMeaning: 'Acidose metabolica ou compensacao de alcalose respiratoria.',
    relationships: ['Comparar com BE e Cl.', 'Essencial para anion gap e compensacao esperada.'],
    scenarios: ['Diarreia', 'vomitos', 'doenca renal', 'DKA'],
    pitfalls: ['Se conflitar com BE, revisar sinal e unidade.', 'Nao assumir distubio simples sem conferir compensacao.'],
  },
  BE: {
    label: 'Base excess',
    unit: 'mEq/L',
    whatItIs: 'Quantifica o componente metabolico independentemente da pCO2.',
    highMeaning: 'Excesso de base, consistente com alcalose metabolica.',
    lowMeaning: 'Deficit de base, consistente com acidose metabolica.',
    relationships: ['Deve caminhar de forma coerente com HCO3.', 'Ajuda quando HCO3 esta ausente.'],
    scenarios: ['Choque', 'perdas gastricas', 'diarreia', 'insuficiencia renal'],
    pitfalls: ['Sinal invertido gera interpretacao enganosa.', 'Conflito com HCO3 deve disparar cautela.'],
  },
  AG: {
    label: 'Anion gap',
    unit: 'mEq/L',
    whatItIs: 'Ajuda a diferenciar acidose metabolica por acidos nao mensurados de acidose hipercloremica.',
    highMeaning: 'Acidos nao mensurados elevados.',
    lowMeaning: 'Pode refletir hipoalbuminemia ou erro de entrada.',
    relationships: ['Corrigir por albumina quando possivel.', 'Interpretar junto de lactato, glicose e HCO3.'],
    scenarios: ['DKA', 'sepse', 'uremia', 'intoxicacoes'],
    pitfalls: ['AG normal nao exclui acidose se albumina estiver baixa.'],
  },
  Na: {
    label: 'Sodio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation extracelular.',
    highMeaning: 'Deficit de agua livre ou ganho de sodio.',
    lowMeaning: 'Excesso relativo de agua ou perda de sodio.',
    relationships: ['Influencia AG e osmolaridade.', 'Comparar com glicose e contexto de desidratacao.'],
    scenarios: ['Desidratacao', 'hipoadrenocorticismo', 'diabetes insipidus'],
    pitfalls: ['Mudancas rapidas sao mais perigosas do que o numero isolado.'],
  },
  K: {
    label: 'Potassio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation intracelular, critico para excitabilidade cardiaca.',
    highMeaning: 'Risco de arritmia e fraqueza muscular.',
    lowMeaning: 'Fraqueza, ileo, piora de alcalose e sensibilidade a insulina.',
    relationships: ['Interpretar com pH e ECG.', 'Em DKA, valor normal pode mascarar deplecao total.'],
    scenarios: ['Obstrucao uretral', 'DKA', 'vomitos', 'doenca renal'],
    pitfalls: ['Nao confiar apenas no valor serico em acidemia importante.'],
  },
  Cl: {
    label: 'Cloro',
    unit: 'mEq/L',
    whatItIs: 'Principal anion extracelular mensurado.',
    highMeaning: 'Tende a acidose metabolica hipercloremica.',
    lowMeaning: 'Tende a alcalose metabolica hipocloremica.',
    relationships: ['Ler com HCO3 e fluidoterapia.', 'Ajuda a diferenciar perdas gastricas de intestinais.'],
    scenarios: ['Vomitos', 'diarreia', 'uso excessivo de NaCl 0.9%'],
    pitfalls: ['Valor isolado nao explica o disturbio sem contexto de bicarbonato.'],
  },
  albumin: {
    label: 'Albumina',
    unit: 'g/dL',
    whatItIs: 'Principal proteina plasmatic e anion nao mensurado relevante.',
    highMeaning: 'Hemoconcentracao ou desidratacao.',
    lowMeaning: 'Hipoalbuminemia, reduz AG aparente e reduz pressao oncótica.',
    relationships: ['Corrigir AG por albumina.', 'Relacionar com perfusao e doenca hepatica/intestinal.'],
    scenarios: ['PLE', 'hepatopatia', 'inflamacao sistemica'],
    pitfalls: ['AG pode parecer normal por falsa reducao de anions nao mensurados.'],
  },
  lactate: {
    label: 'Lactato',
    unit: 'mmol/L',
    whatItIs: 'Marcador de metabolismo anaerobio e perfusao.',
    highMeaning: 'Hipoperfusao, sepse ou causa tipo B.',
    lowMeaning: 'Sem relevancia clinica isolada.',
    relationships: ['Interpretar com choque, AG e perfusao.', 'Clearance seriado e mais util que medida unica.'],
    scenarios: ['Sepse', 'GDV', 'choque hipovolemico'],
    pitfalls: ['Elevacao isolada sem contexto nao fecha diagnostico.'],
  },
  glucose: {
    label: 'Glicose',
    unit: 'mg/dL',
    whatItIs: 'Substrato energetico e marcador de estresse/metabolismo.',
    highMeaning: 'Estresse, diabetes, DKA.',
    lowMeaning: 'Risco neurologico, sepse, insulinoma, filhotes graves.',
    relationships: ['Interpretar com AG e K em suspeita de DKA.', 'Corrige parte da leitura de sodio em hiperglicemia.'],
    scenarios: ['DKA', 'sepse', 'filhotes graves'],
    pitfalls: ['Hiperglicemia de estresse e comum em gatos.'],
  },
  osmolality: {
    label: 'Osmolalidade calculada',
    unit: 'mOsm/kg',
    whatItIs: 'Estimativa da carga osmotica plasmática, geralmente dominada por sodio, glicose e ureia quando disponivel.',
    highMeaning: 'Hiperosmolalidade pode indicar deficit de agua livre, hipernatremia, hiperglicemia grave ou intoxicacoes osmoticamente ativas.',
    lowMeaning: 'Hipo-osmolalidade ocorre em excesso de agua livre e hiponatremia verdadeira.',
    relationships: ['Interpretar com Na, glicose, ureia e estado neurologico.', 'Ajuda a diferenciar hiponatremia verdadeira de pseudohiponatremia/hiperglicemia.'],
    scenarios: ['DKA/HHS', 'hipernatremia', 'hiponatremia neurologica', 'intoxicacoes'],
    pitfalls: ['Muitos gasometros nao reportam ureia; formula incompleta e apenas estimativa.'],
  },
  SID: {
    label: 'Strong ion difference (SID)',
    unit: 'mEq/L',
    whatItIs: 'Diferenca entre cations fortes e anions fortes, principalmente Na + K - Cl. Relaciona eletrólitos com acidose/alcalose pelo modelo fisico-quimico.',
    highMeaning: 'SID alto favorece alcalinizacao, frequentemente por hipocloremia relativa.',
    lowMeaning: 'SID baixo favorece acidificacao, frequentemente por hipercloremia relativa.',
    relationships: ['Na-Cl e Cl/Na sao atalhos praticos para perceber o efeito do cloro.', 'Complementa HCO3, BE e AG.'],
    scenarios: ['Vomitos hipocloremicos', 'diarreia', 'fluidoterapia com NaCl 0.9%', 'doenca renal'],
    pitfalls: ['Nao substitui a abordagem tradicional; integra principalmente a interpretacao de cloro e sodio.'],
  },
  strongIonGap: {
    label: 'Strong ion gap (SIG)',
    unit: 'mEq/L',
    whatItIs: 'Estimativa de anions fortes nao mensurados no modelo fisico-quimico.',
    highMeaning: 'Sugere anions nao mensurados, semelhante ao raciocinio de AG alto, mas com mais variaveis.',
    lowMeaning: 'Pode ocorrer por erro de dados ou alteracoes de proteinas/fosfato conforme formula usada.',
    relationships: ['Relaciona-se com AG, lactato, albumina e fosfato.', 'Pode refinar a avaliacao em pacientes criticos.'],
    scenarios: ['Sepse', 'choque', 'uremia', 'intoxicacoes', 'DKA'],
    pitfalls: ['Depende de formula e parametros nem sempre disponiveis no gasometro.'],
  },
  iCa: {
    label: 'Calcio ionizado',
    unit: 'mmol/L',
    whatItIs: 'Fracao biologicamente ativa do calcio.',
    highMeaning: 'Pode acompanhar neoplasia, hiperparatireoidismo ou erro de unidade.',
    lowMeaning: 'Maior irritabilidade neuromuscular e piora de cardiotoxicidade por hipercalemia.',
    relationships: ['Importante na obstrucao uretral e DKA.', 'pH altera fracao ionizada.'],
    scenarios: ['Obstrucao uretral', 'pancreatite', 'eclampsia'],
    pitfalls: ['Conferir unidade quando valor parecer muito alto.'],
  },
  tCa: {
    label: 'Calcio total',
    unit: 'mg/dL',
    whatItIs: 'Soma do calcio ligado e ionizado.',
    highMeaning: 'Hipercalcemia.',
    lowMeaning: 'Pode refletir hipoalbuminemia sem reduzir iCa.',
    relationships: ['Interpretar junto de albumina e iCa.', 'Nao substitui o iCa em pacientes criticos.'],
    scenarios: ['Neoplasia', 'hipoalbuminemia'],
    pitfalls: ['Nao usar calcio total sozinho para tomada de decisao critica.'],
  },
  hematocrit: {
    label: 'Hematocrito',
    unit: '%',
    whatItIs: 'Proporcao de volume sanguineo ocupada por eritrócitos.',
    highMeaning: 'Hemoconcentracao ou policitemia.',
    lowMeaning: 'Anemia e menor capacidade de transporte de oxigenio.',
    relationships: ['Interpretar com hemoglobina, perfusao e PaO2.', 'Hipoxemia pode ser agravada por anemia.'],
    scenarios: ['Hemorragia', 'desidratacao', 'hemolise'],
    pitfalls: ['PaO2 normal nao exclui hipoxia se Hb/Ht estiverem baixos.'],
  },
  hemoglobin: {
    label: 'Hemoglobina',
    unit: 'g/dL',
    whatItIs: 'Principal carreador de oxigenio no sangue.',
    highMeaning: 'Pode acompanhar hemoconcentracao.',
    lowMeaning: 'Reduz conteudo arterial de oxigenio mesmo com PaO2 normal.',
    relationships: ['Integrar com Ht, SaO2 e quadro perfusional.', 'Baixa Hb limita DO2.'],
    scenarios: ['Anemia hemorrágica', 'hemolise', 'doenca cronica'],
    pitfalls: ['Nao confundir boa saturacao com adequada entrega de oxigenio.'],
  },
  tHb: {
    label: 'Hemoglobina total (tHb)',
    unit: 'g/dL',
    whatItIs: 'Hemoglobina total medida por co-oximetria; define capacidade maxima de transporte de oxigenio.',
    highMeaning: 'Hemoconcentracao ou policitemia; pode aumentar viscosidade.',
    lowMeaning: 'Anemia reduz conteudo arterial de O2 mesmo com PaO2 e SaO2 normais.',
    relationships: ['Conteudo arterial de O2 depende muito mais de Hb e SaO2 do que do O2 dissolvido.', 'Interpretar com Ht, lactato e perfusao.'],
    scenarios: ['Hemorragia', 'hemolise', 'desidratacao', 'choque'],
    pitfalls: ['PaO2 normal nao garante entrega de oxigenio se tHb esta baixa.'],
  },
  ctO2: {
    label: 'Conteudo de oxigenio (ctO2/CaO2)',
    unit: 'mL/dL',
    whatItIs: 'Quantidade total de oxigenio no sangue, somando O2 ligado a hemoglobina e pequena fracao dissolvida.',
    highMeaning: 'Pode refletir Hb alta e saturacao adequada.',
    lowMeaning: 'Indica risco de baixa entrega de O2 por anemia, dessaturacao ou ambas.',
    relationships: ['DO2 depende de ctO2 e debito cardiaco.', 'Relacionar com lactato, perfusao, Hb e SaO2.'],
    scenarios: ['Anemia critica', 'choque', 'hipoxemia', 'transfusao'],
    pitfalls: ['Nao confundir oxigenacao pulmonar (PaO2/A-a) com entrega sistêmica de O2 (ctO2/DO2).'],
  },
  FO2Hb: {
    label: 'Oxi-hemoglobina fracional (FO2Hb)',
    unit: '%',
    whatItIs: 'Percentual de hemoglobina total que esta ligada ao oxigenio, considerando dis-hemoglobinas.',
    highMeaning: 'Boa fracao oxigenada quando co-oximetria e confiavel.',
    lowMeaning: 'Pode indicar dessaturacao real ou competicao por COHb/MetHb.',
    relationships: ['Diferente de sO2 calculada se houver COHb ou MetHb.', 'Importante em intoxicacoes e anestesia.'],
    scenarios: ['Intoxicacao por monoxido de carbono', 'metemoglobinemia', 'hipoxemia'],
    pitfalls: ['Saturacao de pulso pode enganar em COHb/MetHb.'],
  },
  COHb: {
    label: 'Carboxi-hemoglobina (COHb)',
    unit: '%',
    whatItIs: 'Hemoglobina ligada a monoxido de carbono, incapaz de transportar O2 adequadamente.',
    highMeaning: 'Intoxicacao por CO/fumaca; reduz conteudo de O2 e desloca curva de dissociacao.',
    lowMeaning: 'Normal/sem impacto clinico relevante.',
    relationships: ['PaO2 pode estar normal apesar de hipoxia tecidual.', 'Correlacionar com incendio, aquecedores, fumaca e sinais neurologicos.'],
    scenarios: ['Inalacao de fumaca', 'ambiente fechado com combustao'],
    pitfalls: ['SpO2 pode parecer falsamente normal. Precisa de co-oximetria.'],
  },
  MetHb: {
    label: 'Metemoglobina (MetHb)',
    unit: '%',
    whatItIs: 'Hemoglobina oxidada que nao carrega O2 de forma efetiva.',
    highMeaning: 'Metemoglobinemia por oxidantes, toxicos ou farmacos; causa hipoxia funcional.',
    lowMeaning: 'Normal/sem impacto clinico relevante.',
    relationships: ['Cianose com PaO2 normal deve levantar suspeita.', 'Correlacionar com chocolate/cebola/alho, benzocaina, nitratos e alguns farmacos.'],
    scenarios: ['Toxicologia', 'cianose refrataria', 'sangue achocolatado'],
    pitfalls: ['Oxigenio pode nao corrigir completamente a hipoxia funcional se MetHb estiver alta.'],
  },
  HHb: {
    label: 'Desoxi-hemoglobina (HHb)',
    unit: '%',
    whatItIs: 'Fracao de hemoglobina nao ligada ao oxigenio.',
    highMeaning: 'Aumenta em dessaturacao, baixa PaO2 ou extracao tecidual elevada em amostras venosas.',
    lowMeaning: 'Fracao desoxigenada baixa, geralmente com boa saturacao ou oxigenioterapia.',
    relationships: ['Em venosa reflete extracao tecidual e fluxo regional.', 'Em arterial acompanha hipoxemia/dessaturacao.'],
    scenarios: ['Choque', 'hipoxemia', 'monitoracao venosa'],
    pitfalls: ['Interpretar sempre pelo tipo de amostra.'],
  },
  sO2: {
    label: 'Saturacao de O2',
    unit: '%',
    whatItIs: 'Percentual de hemoglobina saturada por oxigenio.',
    highMeaning: 'Adequada ou em oxigenioterapia.',
    lowMeaning: 'Dessaturacao relevante.',
    relationships: ['Comparar com pO2.', 'Incompatibilidades podem sugerir erro de amostra ou valor.'],
    scenarios: ['Doenca pulmonar', 'shunt', 'hipoventilacao'],
    pitfalls: ['PvO2/PvSatO2 nao servem para desempenho pulmonar.'],
  },
  H: {
    label: 'H+',
    unit: 'nmol/L',
    whatItIs: 'Representa acidez de forma inversa ao pH.',
    highMeaning: 'Acidemia.',
    lowMeaning: 'Alcalemia.',
    relationships: ['Deve ser coerente com o pH.', 'Valor pode denunciar erro de OCR.'],
    scenarios: ['Qualquer disturbio acido-base importante'],
    pitfalls: ['Nao usar isoladamente.'],
  },
  cHCO3: {
    label: 'cHCO3/std HCO3',
    unit: 'mEq/L',
    whatItIs: 'Formas calculadas/padronizadas de bicarbonato.',
    highMeaning: 'Sugere alcalose metabolica.',
    lowMeaning: 'Sugere acidose metabolica.',
    relationships: ['Serve como apoio quando HCO3 principal estiver ausente.', 'Comparar com HCO3 medido e BE.'],
    scenarios: ['Analises com painel ampliado'],
    pitfalls: ['Pode divergir por arredondamento ou tipo de calculo do aparelho.'],
  },
  tCO2: {
    label: 'tCO2',
    unit: 'mEq/L',
    whatItIs: 'CO2 total, geralmente proximo do bicarbonato em clinica.',
    highMeaning: 'Tende a alcalose metabolica.',
    lowMeaning: 'Tende a acidose metabolica.',
    relationships: ['Complementa HCO3.', 'Comparar com HCO3 e pCO2.'],
    scenarios: ['Painel bioquimico/hemogas ampliado'],
    pitfalls: ['Nao substitui sozinho a analise completa.'],
  },
  standardBaseExcess: {
    label: 'Standard base excess (SBE)',
    unit: 'mEq/L',
    whatItIs: 'Base excess padronizado para condicoes de CO2, estimando componente metabolico extracelular.',
    highMeaning: 'Excesso de base metabolico.',
    lowMeaning: 'Deficit de base metabolico.',
    relationships: ['Mais estavel para componente metabolico do que pH isolado.', 'Comparar com HCO3 e BE reportado.'],
    scenarios: ['Choque', 'diarreia', 'vomitos', 'doenca renal'],
    pitfalls: ['A nomenclatura varia por aparelho: SBE, BEecf, BE(B). Conferir campo e unidade.'],
  },
  actualBaseExcess: {
    label: 'Actual base excess (ABE)',
    unit: 'mEq/L',
    whatItIs: 'Base excess calculado nas condicoes reais da amostra.',
    highMeaning: 'Excesso de base nas condicoes medidas.',
    lowMeaning: 'Deficit de base nas condicoes medidas.',
    relationships: ['Pode diferir do SBE.', 'Usar junto de HCO3 e pCO2 para nao confundir componente respiratorio.'],
    scenarios: ['Aparelhos que reportam BE(B)/ABE e BEecf/SBE separadamente'],
    pitfalls: ['Nao misturar ABE e SBE sem saber o que o aparelho esta reportando.'],
  },
  respiratoryQuotient: {
    label: 'Quociente respiratorio (R)',
    unit: 'adimensional',
    whatItIs: 'Razao entre producao de CO2 e consumo de O2. Na equacao alveolar costuma-se usar 0,8 como padrao.',
    highMeaning: 'Pode subir com metabolismo de carboidrato predominante ou superalimentacao; raramente medido no gasometro comum.',
    lowMeaning: 'Pode cair com oxidacao de gordura/jejum; raramente usado diretamente na rotina.',
    relationships: ['Entra no calculo da PAO2 e, portanto, do gradiente A-a.', 'Na pratica clinica, R=0,8 e uma aproximacao aceitavel na maioria dos casos.'],
    scenarios: ['Calculo refinado de A-a', 'ventilacao mecanica e metabolismo intensivo'],
    pitfalls: ['Nao alterar R sem motivo; isso pode criar falsa precisao.'],
  },
  fio2: {
    label: 'FiO2',
    unit: 'fracao interna / % na UI',
    whatItIs: 'Fracao inspirada de oxigenio ofertada ao paciente.',
    highMeaning: 'Oxigenioterapia ou ventilacao com enriquecimento de O2.',
    lowMeaning: 'Nao aplicavel abaixo de ar ambiente.',
    relationships: ['Essencial para P/F e A-a.', 'Deve ser normalizada para fracao no motor.'],
    scenarios: ['Oxigenioterapia', 'VM', 'avaliacao de hipoxemia'],
    pitfalls: ['Confusao entre 21 e 0.21 e uma das falhas mais comuns.'],
  },
  temperature: {
    label: 'Temperatura',
    unit: 'C',
    whatItIs: 'Contextualiza consumo de O2, producao de CO2 e discrepancias entre valor reportado e fisiologia real.',
    highMeaning: 'Hipertermia aumenta metabolismo e demanda de O2.',
    lowMeaning: 'Hipotermia pode reduzir metabolismo e alterar a comparacao clinica com o valor reportado.',
    relationships: ['Interpreta pCO2, lactato e oxigenacao com mais cautela.', 'Deve aparecer no resumo e na qualidade dos dados.'],
    scenarios: ['Sepse', 'choque, trauma, anestesia'],
    pitfalls: ['Nao inventar correcao matematica sem base. Contextualizar e alertar e mais seguro.'],
  },
  barometricPressure: {
    label: 'Pressao barometrica',
    unit: 'mmHg',
    whatItIs: 'Ajusta a disponibilidade alveolar de oxigenio.',
    highMeaning: 'Sem significado isolado clinico comum.',
    lowMeaning: 'Pode reduzir PAO2 esperada.',
    relationships: ['Usada no calculo do gradiente A-a.', 'Relacionar com altitude.'],
    scenarios: ['Pacientes em altitude'],
    pitfalls: ['Sem ela, o calculo de A-a e aproximado.'],
  },
  altitude: {
    label: 'Altitude',
    unit: 'm',
    whatItIs: 'Contextualiza menor pressao de O2 ambiental.',
    highMeaning: 'Maior altitude reduz PAO2 esperada.',
    lowMeaning: 'Nao aplicavel clinicamente ao nivel do mar.',
    relationships: ['Pode ajudar a estimar pressao barometrica.', 'Interfere na leitura de hipoxemia.'],
    scenarios: ['Clinicas em altitude'],
    pitfalls: ['Nao classificar hipoxemia sem considerar altitude quando relevante.'],
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
