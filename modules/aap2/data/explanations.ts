// ============================================================
// EXPLANATIONS — Glossário fisiopatológico (modais de ajuda)
// ============================================================

export const EXPLANATIONS: Record<string, string> = {
    'Coagulopatia': `<strong>Coagulopatia por Consumo:</strong><br/>
<strong>Bioquímica:</strong> O veneno botrópico contém serinaproteases com atividade "trombina-símile". Diferente da trombina fisiológica, essas enzimas clivam o fibrinogênio diretamente em monômeros de fibrina instável, sem ativar o Fator XIII.<br/>
<strong>Fisiopatologia:</strong> Essa conversão descontrolada e sistêmica de fibrinogênio leva a um consumo agudo e massivo deste e de outros fatores de coagulação (Fator V, Fator VIII). O resultado é a hipofibrinogenemia e a incoagulabilidade sanguínea, um achado diagnóstico chave.<br/>
<strong>Clínica:</strong> Clinicamente, isso se manifesta como sangue que não coagula no teste de tempo de coagulação (TC) e hemorragias sistêmicas (gengivorragia, hematúria, melena), exacerbadas pela ação das metaloproteinases (hemorraginas) que danificam o endotélio vascular.`,

    'Lesão Renal Aguda (LRA)': `<strong>Fisiopatologia da LRA no Envenenamento:</strong><br/>
A Lesão Renal Aguda é um risco multifatorial em toxicologia. Pode ser causada por:<br/>
<strong>1. Nefrotoxicidade Direta:</strong> Algumas toxinas (como as de veneno botrópico ou crotálico) podem lesar diretamente as células dos túbulos renais.<br/>
<strong>2. Hipovolemia e Choque:</strong> A hipotensão severa reduz o fluxo sanguíneo para os rins (isquemia pré-renal), causando lesão.<br/>
<strong>3. Rabdomiólise:</strong> A destruição muscular (típica do acidente crotálico) libera grandes quantidades de mioglobina, que é tóxica e pode obstruir os túbulos renais.<br/>
<strong>4. Deposição de Fibrina:</strong> Em coagulopatias, microtrombos de fibrina podem se depositar nos glomérulos, prejudicando a filtração.`,

    'Arritmias cardíacas': `<strong>Fisiopatologia das Arritmias por Bufotoxinas (Sapos):</strong><br/>
As bufotoxinas possuem uma ação "digitálico-símile", ou seja, atuam de forma semelhante aos fármacos digitálicos (ex: digoxina).<br/>
<strong>Mecanismo Molecular:</strong> Elas inibem a enzima Na+/K+-ATPase na membrana das células do músculo cardíaco (miocárdio).<br/>
<strong>Consequência Iônica:</strong> Essa inibição causa um acúmulo de sódio dentro da célula, o que por sua vez leva a um aumento dos níveis de cálcio intracelular.<br/>
<strong>Efeito Clínico:</strong> O excesso de cálcio aumenta a excitabilidade das células cardíacas, levando a contrações ventriculares prematuras, taquicardia ventricular, bloqueios atrioventriculares e, nos casos mais graves, fibrilação ventricular e parada cardíaca.`,

    'Doença Renal Crônica (DRC)': `<strong>Risco da Fluidoterapia na Doença Renal Crônica:</strong><br/>
<strong>Fisiopatologia:</strong> A DRC compromete a capacidade do rim de excretar fluidos e metabólitos. A fluidoterapia agressiva, embora necessária para tratar o choque hipovolêmico do envenenamento, pode levar rapidamente à sobrecarga volêmica, resultando em edema pulmonar e piora da hipertensão.<br/>
<strong>Nefrotoxicidade Adicional:</strong> O veneno botrópico pode causar Lesão Renal Aguda (LRA). Em um rim já comprometido pela DRC, esse insulto adicional pode levar a uma descompensação aguda e irreversível da função renal.<br/>
<strong>Conduta Clínica:</strong> O monitoramento do débito urinário e da pressão venosa central (PVC) é crucial para guiar a fluidoterapia, evitando tanto a hipovolemia quanto a hipervolemia.`,

    'AINEs': `<strong>Contraindicação de AINEs em Pacientes com DRC e Envenenamento:</strong><br/>
Anti-inflamatórios não esteroidais (AINEs) são formalmente contraindicados nestes casos por dois motivos principais:<br/>
<strong>1. Risco Renal:</strong> AINEs inibem as prostaglandinas, que são cruciais para manter a vasodilatação e o fluxo sanguíneo para os rins, especialmente durante estados de hipotensão (choque). Em um paciente com DRC, cujo fluxo sanguíneo renal já pode ser limítrofe, e sob o estresse de um veneno nefrotóxico, o uso de AINEs pode precipitar uma crise renal aguda e insuficiência renal irreversível.<br/>
<strong>2. Risco Hemorrágico:</strong> Muitos venenos (especialmente o botrópico) já causam distúrbios de coagulação. AINEs também possuem efeito anti-plaquetário, o que agravaria ainda mais a tendência hemorrágica do paciente.`,

    'Estado Fisiológico': `<strong>Filhote:</strong> Metabolismo e reservas fisiológicas diferentes. Doses podem precisar de ajuste e são mais sensíveis à hipoglicemia e hipotermia.<br/><br/>
<strong>Idoso:</strong> Função renal e hepática podem estar diminuídas, alterando a metabolização de toxinas e fármacos. Maior risco de efeitos adversos.<br/><br/>
<strong>Gestante:</strong> Risco para o feto. Fármacos (ex: sedativos, AINEs) e estresse podem impactar a gestação. Fluidoterapia deve ser cautelosa.<br/><br/>
<strong>Lactante:</strong> Risco de excreção de toxinas ou fármacos no leite materno. A amamentação pode precisar ser suspensa.`,

    'Comorbidades': `<strong>Cardiopatia:</strong> Risco aumentado de arritmias e descompensação hemodinâmica, especialmente com venenos cardiotóxicos (sapo, escorpião). Fluidoterapia deve ser criteriosa.<br/><br/>
<strong>Hepatopatia:</strong> Prejudica a metabolização de toxinas e fármacos. Pode agravar coagulopatias pela menor produção de fatores de coagulação.<br/><br/>
<strong>Doença Renal Crônica (DRC):</strong> Altíssimo risco de lesão renal aguda sobre crônica. Venenos nefrotóxicos (jararaca, cascavel) são críticos. Evitar ou ajustar fármacos nefrotóxicos (ex: AINEs, aminoglicosídeos).<br/><br/>
<strong>Endocrinopatia:</strong> (Ex: Diabetes, Hiperadrenocorticismo) Pacientes mais frágeis, com maior risco de descompensação metabólica e infecções secundárias.`,
};
