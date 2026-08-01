import type { DiseaseQuickSummaryRich, DiseaseRecord } from '../../types/disease';

type DiseaseOverview = Pick<DiseaseQuickSummaryRich, 'lead' | 'leadHighlights' | 'pillars'>;

const OVERVIEWS: Record<string, DiseaseOverview> = {
  'babesiose-canina': {
    lead: 'A babesiose canina é uma infecção dos glóbulos vermelhos causada por protozoários do gênero Babesia. A transmissão ocorre principalmente por carrapatos, embora transfusão, transmissão materna e contato com sangue também possam participar conforme a espécie do parasita. A destruição das hemácias provoca anemia hemolítica, que pode variar de discreta a rapidamente fatal, e desencadear inflamação sistêmica, alterações da coagulação e lesão de órgãos. A apresentação, a gravidade e a resposta ao tratamento dependem da espécie de Babesia, da região geográfica, da imunidade do cão e de coinfecções.',
    leadHighlights: ['infecção dos glóbulos vermelhos', 'anemia hemolítica', 'espécie de Babesia'],
    pillars: [
      { title: 'O que acontece', body: 'O parasita invade as hemácias; a ruptura e a remoção imunológica dessas células reduzem o transporte de oxigênio e podem produzir icterícia, hemoglobinúria e esplenomegalia.', highlights: ['invade as hemácias'] },
      { title: 'Quando suspeitar', body: 'Febre, apatia, mucosas pálidas ou amareladas, urina escura e queda rápida do hematócrito, especialmente em cão exposto a carrapatos, exigem investigação imediata.', highlights: ['mucosas pálidas ou amareladas'] },
      { title: 'Como confirmar e conduzir', body: 'Esfregaço sanguíneo pode demonstrar o agente, mas testes moleculares aumentam a sensibilidade e ajudam a identificar a espécie. O tratamento antiparasitário deve ser associado ao suporte da anemia e das complicações.', highlights: ['identificar a espécie'] },
    ],
  },
  'doencas-trato-urinario-inferior-felino-dtuif': {
    lead: 'Doenças do trato urinário inferior felino são um conjunto de afecções da bexiga e da uretra que produzem sinais semelhantes, como urinar muitas vezes em pequeno volume, dor ou esforço para urinar, sangue na urina e eliminação fora da caixa. O termo descreve uma síndrome clínica, não um diagnóstico final. As principais causas incluem cistite idiopática felina, cálculos, tampões uretrais, infecção bacteriana, alterações anatômicas e neoplasia. Em gatos jovens e de meia-idade, a cistite idiopática é frequente e envolve interação entre estresse, ambiente, sistema nervoso e barreira da bexiga.',
    leadHighlights: ['conjunto de afecções da bexiga e da uretra', 'não um diagnóstico final', 'cistite idiopática felina'],
    pillars: [
      { title: 'Prioridade imediata', body: 'Gato, sobretudo macho, com tentativas improdutivas de urinar e bexiga distendida deve ser tratado como possível obstrução uretral, uma emergência potencialmente fatal.', highlights: ['possível obstrução uretral', 'emergência'] },
      { title: 'Diagnóstico por causa', body: 'História, exame físico, urinálise e imagem orientam a investigação. Cultura urinária e outros exames são selecionados pela idade, recorrência e fatores de risco, sem presumir infecção.', highlights: ['sem presumir infecção'] },
      { title: 'Controle a longo prazo', body: 'Aumentar ingestão hídrica, reduzir estressores e adequar caixas, recursos e alimentação são centrais na cistite idiopática; cálculos, infecção e obstrução exigem condutas específicas.', highlights: ['Aumentar ingestão hídrica', 'reduzir estressores'] },
    ],
  },
  'fistula-perianal-furunculose-anal': {
    lead: 'A fístula perianal, também chamada furunculose anal, é uma doença inflamatória crônica e muito dolorosa na qual surgem úlceras e trajetos profundos ao redor do ânus. A evidência favorece um mecanismo imunomediado, com participação predominante de linfócitos T, embora conformação anatômica, umidade e ventilação local possam contribuir. Pastores-alemães são particularmente predispostos, mas outras raças podem ser afetadas. As lesões podem alcançar os sacos anais ou o reto e provocar dor intensa, dificuldade para defecar, sangue nas fezes, lambedura persistente e perda de condição corporal.',
    leadHighlights: ['doença inflamatória crônica e muito dolorosa', 'mecanismo imunomediado', 'trajetos profundos'],
    pillars: [
      { title: 'Reconhecimento', body: 'O exame perianal e retal, frequentemente sob sedação por causa da dor, define extensão, presença de secreção e envolvimento de estruturas adjacentes.', highlights: ['frequentemente sob sedação'] },
      { title: 'Diagnósticos diferenciais', body: 'Abscesso de saco anal, neoplasia, trauma, infecção e doenças do cólon ou reto devem ser considerados quando a aparência ou a evolução não forem típicas.', highlights: ['Abscesso de saco anal', 'neoplasia'] },
      { title: 'Tratamento', body: 'A base é imunomodulação, controle de dor, higiene local e manejo de doença intestinal concomitante. Cirurgia é reservada a casos selecionados, pois recorrência e complicações são possíveis.', highlights: ['imunomodulação', 'controle de dor'] },
    ],
  },
  'hiperadrenocorticismo-sindrome-cushing': {
    lead: 'O hiperadrenocorticismo, conhecido como síndrome de Cushing, resulta da exposição crônica do organismo a concentrações excessivas de cortisol. Na maioria dos cães espontaneamente afetados, a origem é um tumor da hipófise que secreta hormônio adrenocorticotrófico e estimula as duas adrenais; outra parcela apresenta tumor funcional de uma adrenal. O quadro também pode ser causado pelo uso prolongado de glicocorticoides. O excesso de cortisol altera metabolismo, pele, músculos, fígado, pressão arterial, coagulação e defesa contra infecções, produzindo uma síndrome multissistêmica de evolução geralmente lenta.',
    leadHighlights: ['exposição crônica', 'concentrações excessivas de cortisol', 'síndrome multissistêmica'],
    pillars: [
      { title: 'Manifestação típica', body: 'Aumento de sede, volume urinário e apetite, ofegação, fraqueza muscular, abdômen pendular, pele fina e perda simétrica de pelos formam o padrão clássico.', highlights: ['Aumento de sede, volume urinário e apetite'] },
      { title: 'Confirmação', body: 'Nenhum teste isolado substitui a compatibilidade clínica. Exames hormonais demonstram produção ou regulação anormal do cortisol; imagem e testes complementares ajudam a determinar a origem.', highlights: ['Nenhum teste isolado'] },
      { title: 'Objetivo terapêutico', body: 'Reduzir os efeitos do cortisol sem provocar deficiência hormonal. A escolha entre tratamento medicamentoso, cirurgia e acompanhamento depende da causa, das comorbidades e da possibilidade de monitorização.', highlights: ['sem provocar deficiência hormonal'] },
    ],
  },
  'leishmaniose-visceral-canina': {
    lead: 'A leishmaniose visceral canina é uma infecção sistêmica crônica causada principalmente pelo protozoário Leishmania infantum e transmitida, em condições naturais, por flebotomíneos. Muitos cães infectados permanecem sem sinais por meses ou anos; a doença aparece quando a resposta imune não controla adequadamente o parasita. Inflamação persistente e deposição de complexos imunes podem lesar pele, olhos, articulações, medula óssea e, sobretudo, rins. A apresentação é muito variável e pode incluir emagrecimento, linfonodos aumentados, alterações cutâneas, crescimento anormal das unhas, sangramento nasal, anemia e proteinúria.',
    leadHighlights: ['infecção sistêmica crônica', 'Leishmania infantum', 'sobretudo, rins'],
    pillars: [
      { title: 'Infecção não é doença clínica', body: 'Um resultado positivo demonstra exposição ou infecção, mas a decisão clínica exige integrar sinais, carga parasitária quando disponível, alterações laboratoriais e lesão de órgãos.', highlights: ['Infecção não é doença clínica'] },
      { title: 'Avaliação inicial', body: 'Hemograma, bioquímica, urinálise, relação proteína-creatinina urinária e pressão arterial são essenciais para estadiar repercussões, especialmente a doença renal associada.', highlights: ['relação proteína-creatinina urinária'] },
      { title: 'Controle contínuo', body: 'O tratamento reduz sinais e carga parasitária, mas não garante eliminação completa. Monitorização clínica e renal, prevenção da picada do vetor e cumprimento das normas sanitárias locais são indispensáveis.', highlights: ['não garante eliminação completa'] },
    ],
  },
  'erliquiose-monocitica-canina': {
    lead: 'A erliquiose monocítica canina é uma infecção transmitida por carrapatos, causada principalmente pela bactéria Ehrlichia canis, que se multiplica em células do sistema mononuclear fagocítico. A doença pode atravessar fases aguda, subclínica e crônica, com intensidade muito variável. Trombocitopenia, isto é, redução das plaquetas, é frequente, mas não exclusiva da enfermidade. Inflamação vascular, alterações imunológicas e comprometimento da medula óssea explicam febre, apatia, perda de peso, linfonodos aumentados, sangramentos, alterações oculares e, nos casos graves, redução simultânea de várias linhagens de células sanguíneas.',
    leadHighlights: ['infecção transmitida por carrapatos', 'Ehrlichia canis', 'redução das plaquetas'],
    pillars: [
      { title: 'Interpretar os testes', body: 'Sorologia indica contato e resposta imune, mas não prova sozinha doença ativa. A reação em cadeia da polimerase procura material genético do agente e deve ser interpretada com fase clínica e tratamento prévio.', highlights: ['não prova sozinha doença ativa'] },
      { title: 'Pesquisar coinfecções', body: 'O mesmo carrapato e a mesma exposição podem transmitir outros agentes. Anemia intensa, hemólise ou resposta incompleta justificam ampliar a investigação.', highlights: ['Pesquisar coinfecções'] },
      { title: 'Tratamento e prognóstico', body: 'Doxiciclina é o tratamento de referência, acompanhada de suporte conforme a gravidade. Casos agudos tendem a responder melhor; hipoplasia grave da medula óssea piora o prognóstico.', highlights: ['Doxiciclina', 'hipoplasia grave da medula óssea'] },
    ],
  },
  'colapso-traqueal-canino': {
    lead: 'O colapso traqueal e a traqueobroncomalácia são doenças dinâmicas das vias aéreas nas quais o enfraquecimento das cartilagens e a flacidez da membrana dorsal reduzem o calibre da traqueia, dos brônquios ou de ambos durante a respiração. Há predisposição importante em cães de pequeno porte, mas inflamação crônica, obesidade, irritantes, doença cardíaca e outras alterações respiratórias podem agravar o quadro. A tosse seca e sonora é característica, porém a gravidade varia desde episódios ocasionais até dificuldade respiratória, cianose e síncope.',
    leadHighlights: ['doenças dinâmicas das vias aéreas', 'reduzem o calibre', 'dificuldade respiratória'],
    pillars: [
      { title: 'Diagnóstico dinâmico', body: 'Radiografias podem falhar por registrar apenas um instante. Fluoroscopia e broncoscopia demonstram a variação do lúmen durante o ciclo respiratório e avaliam o envolvimento brônquico.', highlights: ['podem falhar', 'variação do lúmen'] },
      { title: 'Manejo clínico', body: 'Controle de peso, peitoral em vez de coleira cervical, redução de calor e excitação e tratamento da tosse e da inflamação compõem a primeira linha.', highlights: ['Controle de peso', 'peitoral'] },
      { title: 'Casos graves', body: 'Crise com esforço respiratório, coloração azulada de mucosas ou colapso requer estabilização. Próteses intraluminais são reservadas a pacientes refratários cuidadosamente selecionados.', highlights: ['requer estabilização'] },
    ],
  },
  'micoplasmoses-hemotropicas': {
    lead: 'As micoplasmoses hemotrópicas são infecções por bactérias sem parede celular que aderem à superfície dos glóbulos vermelhos de gatos e cães. A importância clínica varia entre espécies do agente e condições do hospedeiro: alguns animais permanecem portadores sem sinais, enquanto outros desenvolvem anemia hemolítica aguda ou recorrente. A destruição das hemácias ocorre principalmente pela resposta do próprio organismo. Imunossupressão, retirada do baço, outras infecções e doenças concomitantes podem aumentar o risco de manifestação clínica.',
    leadHighlights: ['bactérias sem parede celular', 'anemia hemolítica', 'portadores sem sinais'],
    pillars: [
      { title: 'Transmissão', body: 'A transmissão natural ainda não está completamente definida para todos os agentes. Sangue contaminado, brigas, transfusão e possível participação de artrópodes devem ser considerados.', highlights: ['não está completamente definida'] },
      { title: 'Diagnóstico', body: 'A reação em cadeia da polimerase é o método mais sensível para detectar material genético do agente. Estruturas vistas no esfregaço podem ser transitórias ou confundidas com artefatos.', highlights: ['método mais sensível'] },
      { title: 'Conduta', body: 'Tratar é indicado quando há doença clínica compatível, não apenas um resultado positivo. Antimicrobiano e suporte da anemia são ajustados à gravidade e às comorbidades.', highlights: ['não apenas um resultado positivo'] },
    ],
  },
  'doenca-renal-cronica-caes-gatos': {
    lead: 'A doença renal crônica é definida por alterações estruturais ou funcionais dos rins que persistem por pelo menos três meses. A perda de néfrons é irreversível, mas a velocidade de progressão e as complicações podem ser modificadas. Conforme a capacidade de filtração e concentração urinária diminui, surgem aumento de sede e urina, perda de peso, desidratação, náusea, anemia, distúrbios minerais, hipertensão e acúmulo de toxinas urêmicas. Cães e gatos podem permanecer clinicamente estáveis por longo período, por isso o diagnóstico precoce depende de integrar histórico, urinálise, marcadores de filtração, pressão arterial e imagem.',
    leadHighlights: ['persistem por pelo menos três meses', 'perda de néfrons é irreversível', 'diagnóstico precoce'],
    pillars: [
      { title: 'Estadiar para decidir', body: 'O sistema da International Renal Interest Society organiza a doença em estágios e acrescenta subestágios de proteinúria e pressão arterial, orientando tratamento e prognóstico.', highlights: ['International Renal Interest Society', 'proteinúria'] },
      { title: 'Tratar complicações', body: 'Dieta renal, hidratação e controle de fósforo, pressão, proteinúria, potássio, anemia, náusea e acidose são individualizados conforme o estágio e os achados do paciente.', highlights: ['individualizados'] },
      { title: 'Monitorar tendência', body: 'Uma medida isolada pode enganar. Peso, massa muscular, creatinina, dimetilarginina simétrica, urina e pressão devem ser acompanhados em série e interpretados em conjunto.', highlights: ['acompanhados em série'] },
    ],
  },
  'doenca-valvar-mitral-degenerativa-caes': {
    lead: 'A doença valvar mitral degenerativa é a cardiopatia adquirida mais comum em cães, sobretudo de pequeno porte e idosos. A degeneração espessa e deforma os folhetos da válvula mitral, impedindo seu fechamento completo e permitindo refluxo de sangue do ventrículo esquerdo para o átrio esquerdo. Esse refluxo geralmente produz sopro e, ao longo do tempo, sobrecarga de volume e aumento das câmaras cardíacas. Muitos cães permanecem assintomáticos por anos; em parte deles, o aumento das pressões no átrio e nos vasos pulmonares culmina em edema pulmonar e insuficiência cardíaca congestiva.',
    leadHighlights: ['cardiopatia adquirida mais comum em cães', 'refluxo de sangue', 'edema pulmonar'],
    pillars: [
      { title: 'Estágio importa', body: 'A presença de sopro não significa insuficiência cardíaca. Exame clínico, radiografias e ecocardiografia distinguem doença sem aumento cardíaco, remodelamento pré-clínico e congestão.', highlights: ['sopro não significa insuficiência cardíaca'] },
      { title: 'Sinal de descompensação', body: 'Aumento persistente da frequência respiratória durante o sono, esforço respiratório, tosse associada à congestão e intolerância ao exercício exigem reavaliação.', highlights: ['frequência respiratória durante o sono'] },
      { title: 'Tratamento por fase', body: 'A conduta muda com o estágio: monitorização nos casos iniciais, terapia que retarda descompensação quando há remodelamento definido e diuréticos quando existe congestão.', highlights: ['muda com o estágio'] },
    ],
  },
  'hipertensao-arterial-sistemica-caes-gatos': {
    lead: 'A hipertensão arterial sistêmica é a elevação persistente da pressão nas artérias em intensidade capaz de aumentar o risco de lesão em órgãos. Em cães e gatos, costuma acompanhar doença renal, distúrbios endócrinos ou medicamentos, embora possa ocorrer sem causa identificável. Olhos, rins, cérebro e coração são os principais órgãos-alvo. A pressão varia com ansiedade, técnica, tamanho do manguito e posição do paciente; portanto, o diagnóstico não deve se apoiar em uma leitura isolada obtida sob estresse.',
    leadHighlights: ['elevação persistente da pressão', 'olhos, rins, cérebro e coração', 'não deve se apoiar em uma leitura isolada'],
    pillars: [
      { title: 'Medir corretamente', body: 'Ambiente calmo, aclimatação, manguito adequado, posição constante e várias medidas concordantes reduzem o efeito do estresse e os erros técnicos.', highlights: ['várias medidas concordantes'] },
      { title: 'Procurar lesão', body: 'Exame de fundo de olho, avaliação neurológica, urinálise, função renal e investigação cardíaca ajudam a reconhecer dano de órgão-alvo e definir urgência.', highlights: ['dano de órgão-alvo'] },
      { title: 'Tratar risco e causa', body: 'O objetivo é reduzir gradualmente o risco de lesão sem causar hipotensão, ao mesmo tempo que se identifica e controla a doença de base quando possível.', highlights: ['sem causar hipotensão'] },
    ],
  },
  'cardiomiopatia-dilatada-caes-gatos': {
    lead: 'A cardiomiopatia dilatada é uma doença do músculo cardíaco caracterizada principalmente por redução da força de contração e aumento das câmaras do coração. Em cães, afeta com maior frequência raças grandes e gigantes e pode ter base genética, nutricional, tóxica, inflamatória ou permanecer sem causa definida. Arritmias podem preceder ou acompanhar a dilatação. A progressão reduz o débito cardíaco e eleva as pressões de enchimento, favorecendo fraqueza, síncope, insuficiência cardíaca congestiva e morte súbita. Em gatos, o fenótipo dilatado é incomum e exige busca cuidadosa de causas secundárias, incluindo deficiência de taurina.',
    leadHighlights: ['redução da força de contração', 'aumento das câmaras do coração', 'morte súbita'],
    pillars: [
      { title: 'Doença silenciosa', body: 'A fase pré-clínica pode apresentar apenas dilatação, queda da função sistólica ou arritmias. Ecocardiografia e monitorização eletrocardiográfica prolongada são essenciais em animais predispostos.', highlights: ['fase pré-clínica'] },
      { title: 'Confirmar e buscar causa', body: 'O diagnóstico exige excluir sobrecarga de volume, cardiopatias congênitas e causas reversíveis ou tratáveis, além de considerar o padrão específico de cada raça.', highlights: ['causas reversíveis ou tratáveis'] },
      { title: 'Tratamento por fenótipo', body: 'A terapia é dirigida ao estágio, à congestão, à baixa contratilidade e às arritmias. Dieta e suplementação só devem ser corrigidas conforme história e avaliação nutricional.', highlights: ['dirigida ao estágio'] },
    ],
  },
  'cardiomiopatia-hipertrofica-caes-gatos': {
    lead: 'A cardiomiopatia hipertrófica é caracterizada por espessamento anormal do músculo do ventrículo esquerdo sem outra condição capaz de explicar completamente a hipertrofia. É a cardiomiopatia mais comum em gatos e ocorre raramente em cães. O ventrículo espessado relaxa e se enche com dificuldade, elevando a pressão no átrio esquerdo; em alguns pacientes também há obstrução dinâmica da saída do coração. A expressão clínica varia de um achado incidental a insuficiência cardíaca congestiva, formação de trombos, obstrução arterial, arritmias ou morte súbita.',
    leadHighlights: ['espessamento anormal', 'se enche com dificuldade', 'formação de trombos'],
    pillars: [
      { title: 'Excluir imitações', body: 'Hipertensão, hipertireoidismo, desidratação e outras causas de espessamento ventricular devem ser avaliadas antes de classificar a doença como primária.', highlights: ['Excluir imitações'] },
      { title: 'Avaliar o átrio e o fluxo', body: 'Ecocardiografia define distribuição da hipertrofia, função diastólica, obstrução, tamanho atrial e sinais de estase sanguínea, que modificam o risco.', highlights: ['sinais de estase sanguínea'] },
      { title: 'Conduta individual', body: 'Não existe um único protocolo para todos os fenótipos. Congestão, risco de trombo, frequência cardíaca, obstrução e comorbidades orientam a escolha terapêutica.', highlights: ['Não existe um único protocolo'] },
    ],
  },
  'cardiomiopatia-restritiva-felina': {
    lead: 'A cardiomiopatia restritiva felina é uma doença do miocárdio em que fibrose ou alterações do endocárdio tornam os ventrículos rígidos e limitam seu enchimento, apesar de a força de contração poder permanecer relativamente preservada no início. A pressão elevada durante o enchimento causa aumento importante do átrio esquerdo ou dos dois átrios. Gatos de meia-idade ou idosos são mais frequentemente diagnosticados. A doença pode permanecer silenciosa até surgir dificuldade respiratória por insuficiência cardíaca, derrame pleural, tromboembolismo arterial ou arritmia.',
    leadHighlights: ['ventrículos rígidos', 'limitam seu enchimento', 'aumento importante do átrio'],
    pillars: [
      { title: 'Diagnóstico por padrão', body: 'Ecocardiografia identifica aumento atrial desproporcional, alterações de enchimento e possíveis pontes ou áreas de fibrose, além de excluir outros fenótipos cardíacos.', highlights: ['aumento atrial desproporcional'] },
      { title: 'Risco trombótico', body: 'Átrio dilatado, fluxo lento e contraste espontâneo favorecem formação de coágulos e devem ser considerados na estratificação do risco arterial.', highlights: ['formação de coágulos'] },
      { title: 'Objetivo do manejo', body: 'Controlar congestão, frequência cardíaca quando necessário e risco de trombo, evitando reduzir excessivamente o enchimento de um coração pouco complacente.', highlights: ['evitando reduzir excessivamente o enchimento'] },
    ],
  },
  'hipoadrenocorticismo-addison': {
    lead: 'O hipoadrenocorticismo é a deficiência de cortisol, de aldosterona ou de ambos por falha das glândulas adrenais ou, menos frequentemente, por falta de estímulo da hipófise. Na forma primária clássica, a destruição progressiva do córtex adrenal compromete a resposta ao estresse e o equilíbrio de sódio, potássio e água. Os sinais são frequentemente vagos, intermitentes e semelhantes aos de doenças gastrointestinais ou renais. Uma crise addisoniana pode causar desidratação grave, pressão baixa, alterações do ritmo cardíaco, fraqueza intensa e choque.',
    leadHighlights: ['deficiência de cortisol, de aldosterona ou de ambos', 'sinais são frequentemente vagos', 'crise addisoniana'],
    pillars: [
      { title: 'Quando suspeitar', body: 'Vômitos e diarreia recorrentes, perda de peso, prostração que piora com estresse, sódio baixo, potássio alto ou ausência de resposta de estresse no hemograma justificam investigação.', highlights: ['piora com estresse'] },
      { title: 'Como confirmar', body: 'O teste de estimulação com hormônio adrenocorticotrófico avalia a reserva de cortisol. Eletrólitos podem ser normais nas formas sem deficiência de aldosterona.', highlights: ['Eletrólitos podem ser normais'] },
      { title: 'Tratamento', body: 'A crise exige reposição de volume, correção cuidadosa das alterações metabólicas e glicocorticoide. O controle crônico repõe os hormônios deficientes e ajusta doses em situações de estresse.', highlights: ['ajusta doses em situações de estresse'] },
    ],
  },
  'diabetes-mellitus-canina': {
    lead: 'O diabetes mellitus canino é um distúrbio de hiperglicemia persistente causado, na maioria dos cães, por deficiência de insulina suficiente para exigir reposição por toda a vida. A falta desse hormônio impede o aproveitamento adequado da glicose e favorece quebra de gordura e proteína. Consequentemente, são comuns aumento de urina e sede, fome, perda de peso e catarata. Doenças ou fármacos que antagonizam a insulina podem precipitar ou dificultar o controle. Sem tratamento, o acúmulo de cetonas pode produzir cetoacidose diabética, uma emergência metabólica.',
    leadHighlights: ['hiperglicemia persistente', 'deficiência de insulina', 'cetoacidose diabética'],
    pillars: [
      { title: 'Confirmar persistência', body: 'Sinais compatíveis, glicose sanguínea persistentemente elevada e glicose na urina sustentam o diagnóstico; uma elevação isolada deve ser contextualizada.', highlights: ['persistentemente elevada'] },
      { title: 'Base do controle', body: 'Insulina, dieta consistente, rotina de atividade e tratamento de doenças concomitantes são combinados. Curvas de glicose e outros marcadores ajudam a ajustar com segurança.', highlights: ['Insulina', 'dieta consistente'] },
      { title: 'Evitar hipoglicemia', body: 'A meta é controlar sinais e complicações sem normalização agressiva. Fraqueza, desorientação, tremores ou convulsões após insulina exigem ação imediata.', highlights: ['sem normalização agressiva', 'ação imediata'] },
    ],
  },
  'diabetes-mellitus-felina': {
    lead: 'O diabetes mellitus felino é uma síndrome de hiperglicemia persistente causada por resistência à ação da insulina e perda progressiva da capacidade das células pancreáticas de secretá-la. Obesidade, idade, inatividade, glicocorticoides e doenças hormonais aumentam o risco. Os sinais mais comuns são aumento de urina e sede, perda de peso apesar de apetite preservado ou aumentado e, em alguns gatos, fraqueza dos membros posteriores. Diferentemente do que costuma ocorrer em cães, parte dos gatos pode entrar em remissão quando a glicose é controlada cedo e os fatores de resistência são corrigidos.',
    leadHighlights: ['resistência à ação da insulina', 'perda progressiva', 'pode entrar em remissão'],
    pillars: [
      { title: 'Distinguir estresse de doença', body: 'Gatos podem apresentar aumento transitório da glicose durante estresse. Sinais clínicos, glicose urinária, medidas repetidas e frutosamina ajudam a confirmar persistência.', highlights: ['aumento transitório da glicose'] },
      { title: 'Controle inicial', body: 'Insulina, alimentação adequada, perda de peso segura e correção de doenças concomitantes reduzem a toxicidade da glicose e podem favorecer remissão.', highlights: ['podem favorecer remissão'] },
      { title: 'Monitorização segura', body: 'Consumo de água, peso, apetite, glicose e cetonas orientam ajustes. Hipoglicemia e cetoacidose são complicações que exigem reconhecimento rápido.', highlights: ['Hipoglicemia e cetoacidose'] },
    ],
  },
  'hipertireoidismo-felino': {
    lead: 'O hipertireoidismo felino é uma doença multissistêmica causada pela produção excessiva dos hormônios tiroxina e triiodotironina, geralmente por hiperplasia adenomatosa ou adenoma benigno de uma ou das duas tireoides. O metabolismo acelerado provoca perda de peso, frequentemente acompanhada de apetite aumentado, hiperatividade, vômitos, diarreia, sede aumentada e pelagem desorganizada. O excesso hormonal também aumenta frequência e trabalho cardíacos, pode elevar a pressão arterial e modifica a perfusão dos rins. Por isso, doença renal preexistente pode se tornar mais evidente após o controle da tireoide.',
    leadHighlights: ['produção excessiva', 'metabolismo acelerado', 'doença renal preexistente'],
    pillars: [
      { title: 'Diagnóstico', body: 'Concentração total de tiroxina elevada em gato compatível geralmente confirma o quadro. Resultados limítrofes exigem repetição ou testes complementares, especialmente diante de outra doença.', highlights: ['Resultados limítrofes'] },
      { title: 'Avaliação completa', body: 'Pressão arterial, função renal, urina e coração devem ser avaliados antes e depois do tratamento para reconhecer comorbidades mascaradas pela tireotoxicose.', highlights: ['antes e depois do tratamento'] },
      { title: 'Opções terapêuticas', body: 'Iodo radioativo e cirurgia podem ser curativos em casos selecionados; medicamentos antitireoidianos e dieta restrita em iodo controlam a produção enquanto são mantidos.', highlights: ['podem ser curativos', 'controlam a produção'] },
    ],
  },
  'hipotireoidismo-canino': {
    lead: 'O hipotireoidismo canino é uma deficiência dos hormônios tireoidianos, quase sempre causada por destruição imunomediada ou atrofia da própria tireoide. Como esses hormônios regulam o metabolismo de muitos tecidos, a redução costuma produzir sinais graduais e inespecíficos: letargia, intolerância ao exercício e ao frio, ganho de peso sem aumento proporcional do apetite, alterações de pele e pelo, infecções recorrentes e frequência cardíaca reduzida. Doenças não tireoidianas e diversos medicamentos também diminuem os exames hormonais sem existir hipotireoidismo verdadeiro, o que torna essencial interpretar os testes no contexto clínico.',
    leadHighlights: ['deficiência dos hormônios tireoidianos', 'sinais graduais e inespecíficos', 'sem existir hipotireoidismo verdadeiro'],
    pillars: [
      { title: 'Não diagnosticar por um valor', body: 'Tiroxina total baixa isoladamente não confirma a doença. Combinação de sinais, tiroxina livre, hormônio estimulante da tireoide e interferências clínicas aumenta a segurança diagnóstica.', highlights: ['não confirma a doença'] },
      { title: 'Diferenciar outras causas', body: 'Obesidade, dermatopatias, doença sistêmica e uso de glicocorticoides, anticonvulsivantes ou outros fármacos podem imitar o quadro ou alterar resultados.', highlights: ['podem imitar o quadro'] },
      { title: 'Reposição e controle', body: 'Levotiroxina substitui o hormônio ausente. A resposta clínica e a concentração hormonal em horário padronizado orientam o ajuste, evitando excesso de tratamento.', highlights: ['evitando excesso de tratamento'] },
    ],
  },
  'tumores-mamarios-caes-gatos': {
    lead: 'Tumores mamários são proliferações de células da glândula mamária que podem ser benignas ou malignas. São muito comuns em cadelas não castradas e, embora menos frequentes em gatas, apresentam nelas maior probabilidade de comportamento agressivo. Influência hormonal, idade, espécie, tamanho, invasão, tipo histológico e presença de metástase afetam o risco. Nódulos diferentes no mesmo animal podem ter diagnósticos distintos; por isso, cada lesão deve ser descrita, medida e submetida à avaliação histopatológica sempre que removida.',
    leadHighlights: ['podem ser benignas ou malignas', 'cada lesão', 'avaliação histopatológica'],
    pillars: [
      { title: 'Estadiamento', body: 'Exame de toda a cadeia mamária e linfonodos, medidas do tumor e imagem do tórax ajudam a definir extensão local e disseminação antes da cirurgia.', highlights: ['definir extensão local e disseminação'] },
      { title: 'Diagnóstico definitivo', body: 'Citologia pode esclarecer alguns diferenciais, mas a histopatologia determina tipo, grau, margens, invasão vascular e outros fatores prognósticos.', highlights: ['histopatologia determina'] },
      { title: 'Tratamento', body: 'Cirurgia é a principal abordagem para doença localizada operável. Extensão da ressecção e terapia adicional dependem do estágio, da histologia e das condições do paciente.', highlights: ['doença localizada operável'] },
    ],
  },
  'mastite-caes-gatos': {
    lead: 'Mastite é a inflamação de uma ou mais glândulas mamárias, geralmente associada a infecção bacteriana durante o pós-parto e a lactação, embora trauma, retenção de leite e disseminação pelo sangue também possam contribuir. A apresentação varia de dor, calor e alteração do leite a necrose, abscesso, febre, desidratação, sepse e choque. Além do risco para a mãe, leite contaminado ou produção insuficiente compromete os filhotes. O exame deve avaliar todas as glândulas, o estado sistêmico da fêmea e a condição da ninhada.',
    leadHighlights: ['inflamação de uma ou mais glândulas mamárias', 'sepse e choque', 'compromete os filhotes'],
    pillars: [
      { title: 'Confirmar gravidade', body: 'Hemograma, bioquímica e avaliação do leite, incluindo cultura quando possível, ajudam a diferenciar doença localizada de infecção sistêmica e orientar o antimicrobiano.', highlights: ['doença localizada de infecção sistêmica'] },
      { title: 'Tratar mãe e ninhada', body: 'Suporte de hidratação e dor, esvaziamento cuidadoso quando indicado e antimicrobiano compatível com lactação são combinados; filhotes precisam de peso e ingestão monitorados.', highlights: ['mãe e ninhada'] },
      { title: 'Emergência cirúrgica', body: 'Tecido escuro, frio, ulcerado, com gás, secreção intensa ou progressão apesar do tratamento sugere necrose ou abscesso e pode exigir drenagem ou retirada do tecido afetado.', highlights: ['necrose ou abscesso'] },
    ],
  },
};

export function applyDiseaseOverviewOverride(disease: DiseaseRecord): DiseaseRecord {
  const overview = OVERVIEWS[disease.slug];
  if (!overview) return disease;

  return {
    ...disease,
    quickSummary: overview.lead,
    quickSummaryRich: {
      ...disease.quickSummaryRich,
      ...overview,
      diagnosticFlow: disease.quickSummaryRich?.diagnosticFlow,
      treatmentFlow: disease.quickSummaryRich?.treatmentFlow,
    },
  };
}

