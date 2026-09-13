import type { ClinicalQuickGuide, ClinicalQuickGuideBlock } from '../../types/clinicalQuickGuide';

// Redação original após consulta ao acervo. Rastreabilidade: docs/biopsia-incisional-fontes.md.
const h = (text: string, level: 2 | 3 = 2): ClinicalQuickGuideBlock => ({ type: 'heading', level, text });
const p = (text: string): ClinicalQuickGuideBlock => ({ type: 'paragraph', text });
const box = (variant: 'info' | 'warning' | 'tip', title: string, text: string): ClinicalQuickGuideBlock => ({ type: 'callout', variant, title, text });
const steps = (title: string, items: string[]): ClinicalQuickGuideBlock => ({ type: 'steps', title, items });
const list = (items: string[]): ClinicalQuickGuideBlock => ({ type: 'list', items });
const table = (caption: string, headers: string[], rows: string[][]): ClinicalQuickGuideBlock => ({ type: 'table', caption, headers, rows });
const figure = (file: string, alt: string, caption: string): ClinicalQuickGuideBlock => ({ type: 'figure', src: `/consulta-vet/clinical-guides/biopsia-incisional/${file}`, alt, caption });

export const guiaBiopsiaIncisional: ClinicalQuickGuide = {
  id: 'cqg-biopsia-incisional-001',
  slug: 'biopsia-incisional-caes-gatos',
  title: 'Biópsia incisional em cães e gatos',
  subtitle: 'Procedimentos Clínicos — Biópsia em cunha, planejamento oncológico, manipulação do fragmento e histopatologia',
  summary: 'Aprenda a escolher o acesso, expor a lesão e retirar uma cunha representativa sem comprometer a cirurgia definitiva. Técnica explicada passo a passo, com esquemas, particularidades de massas orais e sarcomas, conservação da amostra e resolução de falhas diagnósticas.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: ['biopsia', 'biópsia incisional', 'cunha', 'wedge', 'oncologia', 'histopatologia', 'sarcoma', 'tecidos moles', 'massa oral', 'melanoma', 'FISS', 'sarcoma de aplicação', 'punch', 'tru-cut', 'PAAF', 'formol', 'formalina', 'imprint', 'withrow', 'bsava'],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/biopsia-incisional/capa.svg',
  heroImageAlt: 'Esquema de uma cunha de tecido tumoral e frasco para histopatologia.',
  richText: true,
  showTableOfContents: true,
  quickBullets: [
    'Indique quando diagnóstico ou grau histológico mudarem o tratamento, especialmente em massas grandes, infiltrativas ou de ressecção complexa.',
    'Planeje a cirurgia definitiva primeiro: a cicatriz e todo o trajeto da biópsia precisam ser removíveis junto com o tumor.',
    'Em membros, prefira incisão longitudinal. Evite túneis, descolamentos amplos e passagem por compartimentos não envolvidos.',
    'Colete uma cunha de tumor viável, suficientemente profunda; crosta, necrose e pseudocápsula isoladas podem não responder à pergunta clínica.',
    'Use instrumento frio. Segure a periferia delicadamente; cautério fica para a hemostasia após a coleta.',
    'Se indicado, faça imprint antes da fixação. Histologia: formalina tamponada neutra 10%, aproximadamente 1:10 de tecido:fixador.',
    'Envie citologia longe dos vapores de formalina; cultura e exames que exigem tecido fresco precisam de recipiente próprio.',
    'A biópsia não avalia margens definitivas e pode subestimar o grau. Laudo discordante exige revisão; a peça final deve ser examinada novamente.'
  ],
  sections: [
    h('1. O que estamos coletando? Uma parte que preserve a arquitetura'),
    p('Na biópsia incisional, o cirurgião remove **uma parte da lesão** e deixa a maior parte dela no paciente. O fragmento segue para histopatologia, que examina células e sua organização no tecido. O propósito é descobrir o que a lesão é e obter informações que orientem o tratamento; a remoção completa pertence a outra etapa.'),
    box('tip', 'A analogia do bolo: o que uma fatia consegue mostrar?', 'A citologia examina as “migalhas”: mostra muito bem as células, mas não conserva toda a organização. Uma cunha é uma fatia que mantém as camadas e a relação entre elas. Porém, se o bolo tem recheios diferentes, uma única fatia não revela tudo. No tumor, essa heterogeneidade explica por que uma boa biópsia pode diagnosticar a neoplasia e ainda subestimar seu grau.'),
    p('Este passo a passo descreve a **biópsia cirúrgica aberta em cunha de massas cutâneas, subcutâneas e de tecidos moles acessíveis**, com adaptações para a cavidade oral. Biópsias de osso, vísceras, nervos e órgãos profundos exigem técnicas próprias de acesso e hemostasia. [1,2]'),
    box('warning', 'A primeira decisão é oncológica', '==A biópsia já faz parte do tratamento definitivo.== A incisão e os tecidos atravessados constituem um trajeto potencialmente contaminado. Na cirurgia com intenção curativa, esse trajeto deve poder sair em continuidade com o tumor. Uma amostra boa com um acesso mal escolhido pode dificultar a próxima cirurgia. [1,2]'),

    h('2. PAAF, core, punch, incisional ou excisional?'),
    table('Escolha a amostra pela pergunta clínica', ['Método', 'O que é coletado', 'Quando ajuda', 'Limitação prática'], [
      ['PAAF / citologia', 'Células aspiradas ou obtidas por capilaridade.', 'Primeira investigação de muitas massas; identifica inflamação e neoplasias que esfoliam bem.', 'Resultado pouco celular ou “mesenquimal” pode não definir subtipo nem grau; arquitetura limitada.'],
      ['Core / Tru-cut', 'Cilindro estreito de tecido.', 'Massa sólida acessível ou guiada por imagem; preserva arquitetura com menor acesso.', 'Necrose, septos e heterogeneidade podem tornar o cilindro pouco representativo.'],
      ['Punch', 'Cilindro recortado por lâmina circular.', 'Principalmente pele e lesões superficiais selecionadas.', 'Pode colher só pele ou superfície inflamada sem alcançar a massa profunda.'],
      ['**Incisional em cunha**', '**Parte da massa obtida sob visão direta.**', 'Fragmento mais amplo/profundo, coleta anterior inconclusiva ou cirurgia definitiva complexa.', 'Exige acesso cirúrgico, hemostasia e planejamento de todo o trajeto.'],
      ['Excisional', 'Toda a lesão, com ressecção planejada.', 'Casos em que o diagnóstico prévio não mudaria uma cirurgia já apropriada.', '“Descascar” uma massa suspeita pode deixar doença e comprometer o controle local.']
    ]),
    p('**Punch e core também podem ser biópsias parciais.** Aqui, “incisional” designa a técnica aberta em cunha para diferenciá-la desses instrumentos. Não é obrigatório tentar todos os métodos antes dela: escolha a abordagem que responda à pergunta com morbidade aceitável. [1–3]'),

    h('3. Quando indicar e quando a biópsia muda a conduta'),
    steps('Perguntas que justificam coletar antes do tratamento', [
      '**A citologia foi inconclusiva ou discordante?** Uma massa infiltrativa com PAAF mostrando apenas sangue ou inflamação exige reconsiderar alvo e modalidade de amostragem.',
      '**O diagnóstico muda o tratamento?** Saber se a massa é inflamatória, epitelial, mesenquimal ou hematopoiética pode alterar a indicação de cirurgia, radioterapia ou tratamento sistêmico.',
      '**Tipo ou grau mudam a extensão da ressecção?** Isso é especialmente relevante em suspeita de sarcoma de tecidos moles.',
      '**A cirurgia terá grande consequência funcional ou reconstrutiva?** Planeje o diagnóstico antes de mandibulectomia, maxilectomia, amputação ou retalhos extensos.',
      '**O tutor precisa do diagnóstico para decidir?** Obter informação antes de uma cirurgia de maior morbidade pode evitar um tratamento inadequado. [1,2]'
    ]),
    box('info', 'Exemplo clínico: massa subcutânea na parede torácica', 'Um lipoma e um sarcoma podem ter apresentações palpáveis parecidas, mas exigem estratégias diferentes. Se a PAAF não esclarece a natureza da lesão, coletar tecido ajuda a definir o plano antes de abrir amplamente a região. Tamanho, mobilidade e palpação isolados não substituem o diagnóstico. [1,2]'),
    p('A incisional pode ajudar em **lesões ulceradas ou heterogêneas**, porque permite alcançar uma região sólida em profundidade. Isso não significa colher a úlcera: significa superar a superfície alterada para chegar ao tecido que representa o processo de base. [1,2]'),

    h('4. Quando adiar, mudar a técnica ou encaminhar'),
    table('Segurança e utilidade antes de começar', ['Situação', 'Por que importa', 'Conduta de planejamento'], [
      ['Coagulopatia relevante ou sangramento anormal', 'A lesão pode ser vascular e pouco acessível à compressão.', 'Investigue/corrija a alteração; adapte técnica e recursos de hemostasia.'],
      ['Instabilidade cardiorrespiratória', 'Sedação, anestesia e hemorragia podem ser mal toleradas.', 'Estabilize e reavalie benefício/risco.'],
      ['Trajeto não ressecável ou estruturas críticas no caminho', 'A coleta pode contaminar uma região que não poderá ser removida.', 'Discuta com o cirurgião definitivo; considere imagem ou encaminhamento.'],
      ['Via infectada ou lesão muito vascular', 'Risco de inoculação, hemorragia ou amostra não diagnóstica.', 'Escolha outro acesso ou outra modalidade quando possível.'],
      ['Diagnóstico prévio não mudaria a cirurgia', 'Duas intervenções podem acrescentar morbidade sem benefício.', 'Considere ressecção direta apropriada, se estadiamento e condição clínica permitirem.']
    ]),
    p('O Withrow cita massas testiculares e algumas massas esplênicas solitárias como exemplos em que a biópsia prévia pode ser desnecessária. **Isso não torna toda massa pequena candidata a uma excisão marginal.** O critério é se a informação mudará a conduta e se a ressecção proposta já é adequada. [1]'),

    h('5. Entenda o trajeto: a cicatriz é só a parte visível'),
    p('O trajeto é um volume tridimensional: começa na pele ou mucosa, atravessa os tecidos de acesso e termina no local onde a massa foi incisada. Descolamentos, túneis e hematomas também podem ampliar a área exposta. “Tirar a cicatriz depois” não basta se a coleta atravessou um plano profundo diferente daquele que será ressecado. [1,2]'),
    figure('trajeto.svg', 'Incisão longitudinal contida no campo planejado comparada com uma incisão transversal que ultrapassa esse campo.', 'Figura 1 — Planejamento em um membro, em vista superficial. O contorno tracejado representa um campo hipotético de ressecção, não uma margem em centímetros. O acesso deve caber nesse campo em superfície e profundidade. Esquema original baseado em Withrow, cap. 9, e BSAVA Oncology, cap. 6.'),
    steps('Regras anatômicas para escolher a via', [
      '**Imagine a futura ressecção antes de marcar a pele.** Se houver dúvida, envie fotografia e exames ao cirurgião responsável.',
      '**Em membros e cauda, siga o eixo longitudinal.** Uma cicatriz transversal pode exigir um defeito mais largo e difícil de fechar.',
      '**Prefira a via curta que seja oncologicamente ressecável.** O caminho mais curto não serve se atravessa articulação, vaso importante ou feixe neurovascular.',
      '**Evite abrir planos extensos.** Não descole toda a pseudocápsula nem cruze outro compartimento apenas para obter melhor ângulo.',
      '**Preserve os tecidos de reconstrução.** Uma futura área doadora de retalho não deve ser usada como corredor da biópsia. [1,2]'
    ]),
    box('tip', 'Pseudocápsula não é margem de segurança', 'Em muitos sarcomas, a faixa que parece uma cápsula contém tecido reativo e pode ter relação íntima com células tumorais. “Descolar por fora” não equivale a ressecção oncológica. Para diagnóstico, confirme que a cunha inclui a lesão, e não somente sua cobertura fibrosa. [1,2]'),

    h('6. A imagem deve vir antes da coleta?'),
    p('Em uma pequena lesão superficial, o exame clínico pode bastar para escolher o acesso. Nas massas **profundas, fixas, grandes ou próximas de osso e estruturas críticas**, a imagem ajuda a reconhecer tecido sólido e estruturas no caminho. TC e RM também permitem avaliar a extensão local antes que sangramento e reação à manipulação modifiquem a região.'),
    table('Planejamento por localização', ['Apresentação', 'O que esclarecer antes da incisão'], [
      ['Massa profunda ou intramuscular', 'Compartimento de origem, relação com fáscias e feixes neurovasculares; necessidade de coleta guiada.'],
      ['Tumor oral ou de cabeça e pescoço', 'Extensão profunda e envolvimento ósseo; acesso pela mucosa e possibilidade de ressecção.'],
      ['Massa heterogênea ou cavitada', 'Regiões sólidas viáveis alcançáveis sem trajetos adicionais.'],
      ['Suspeita de sarcoma felino associado a injeção', 'Extensão real e relação com parede corporal/músculos antes do tratamento definitivo.']
    ]),
    p('Em massas orais caninas, Nelson & Couto recomendam imagem local, como TC, e biópsia incisional relativamente profunda. **Imagem e histopatologia respondem perguntas diferentes:** uma mostra extensão anatômica; a outra identifica o processo tecidual. [1,4]'),

    h('7. Como escolher uma região representativa'),
    p('Observe e palpe; use a imagem quando disponível. Procure **tecido sólido, viável e compatível com a lesão principal**. Crosta, exsudato ou ulceração podem representar apenas uma reação secundária. A amostra precisa atingir profundidade suficiente para incluir o processo que causa aquela alteração. [1,2,4]'),
    table('A aparência da amostra pode enganar', ['Região escolhida', 'Risco diagnóstico', 'Como melhorar'], [
      ['Crosta ou superfície ulcerada', 'Inflamação e granulação predominam.', 'Alcance tecido lesional sólido em profundidade.'],
      ['Centro liquefeito ou necrótico', 'Ausência de células preservadas e arquitetura útil.', 'Escolha componente viável; não envie só material desvitalizado.'],
      ['Pseudocápsula isolada', 'Fibrose reativa em vez do tumor.', 'Confira que o plano de corte inclui a massa.'],
      ['Uma área de massa heterogênea', 'Subtipo ou grau podem não representar o conjunto.', 'Considere regiões viáveis distintas pela mesma via planejada.'],
      ['Interface normal–lesão com ampliação do acesso', 'Exposição de tecido que não precisaria ser removido.', 'Na suspeita oncológica, priorize tumor dentro do campo ressecável.']
    ]),
    box('info', 'A nuance entre os livros: incluir tecido normal?', 'O BSAVA descreve a interface como útil em algumas lesões. O Withrow ressalva que, na suspeita de neoplasia, não se deve ampliar deliberadamente o acesso em tecidos antes não envolvidos apenas para incluí-la. Dermatoses inflamatórias seguem outra lógica de seleção de borda/superfície, combinada com o dermatopatologista. [1–3]'),
    box('warning', 'Necrose conta para o grau, mas necrose isolada não basta', 'A necrose participa de sistemas de graduação de sarcomas. A meta é obter **tumor viável e representativo da heterogeneidade**, sem transformar a coleta em múltiplos trajetos. A peça inteira continua necessária para a avaliação definitiva. [1,5,6]'),

    h('8. Materiais: prepare a cirurgia e a bancada'),
    table('Tudo pronto antes de iniciar', ['Finalidade', 'Materiais', 'Verificação útil'], [
      ['Campo', 'Tricotomia, antisséptico apropriado, campos, luvas estéreis e iluminação.', 'Exposição suficiente para reconhecer anatomia e controlar sangramento.'],
      ['Coleta', 'Cabo e lâmina nº 10 ou 15, pinça delicada, tesoura fina.', 'Instrumentos cortantes e atraumáticos; cautério não recorta o fragmento diagnóstico.'],
      ['Hemostasia/fechamento', 'Gazes, hemostáticas, ligaduras, cautério quando disponível, porta-agulha e suturas.', 'Plano compatível com profundidade e vascularização.'],
      ['Histologia', 'Frasco estanque de boca larga, rotulado, com formalina tamponada neutra 10%.', 'Volume suficiente e abertura que permita retirar o tecido endurecido.'],
      ['Citologia', 'Lâminas limpas, lápis de identificação, porta-lâminas separado.', 'Imprint antes da formalina, se indicado.'],
      ['Exames adicionais', 'Recipiente estéril e meio definido com o laboratório.', 'Separar material fresco antes de fixar.'],
      ['Documentação', 'Régua/escala, câmera, desenho anatômico e formulário.', 'Vincular cada frasco ao local e à profundidade.']
    ]),
    p('Combine quem receberá e identificará o fragmento. Evite deixá-lo sobre gaze enquanto alguém procura o frasco: **ressecar, comprimir e atrasar a fixação diminuem a qualidade diagnóstica**. [1–3]'),

    h('9. Avaliação do paciente, anestesia e analgesia'),
    p('Revise estado clínico, comorbidades, medicamentos, sangramentos prévios e exames disponíveis. A investigação hematológica e da hemostasia deve refletir o risco do paciente e da lesão. Localização, profundidade, temperamento e controle da via aérea determinam o plano anestésico.'),
    table('Anestesia orientada pelo procedimento', ['Cenário', 'Abordagem a considerar', 'O que garantir'], [
      ['Massa superficial, paciente cooperativo', 'Sedação quando necessária, anestesia local e analgesia.', 'Imobilidade e anestesia dos tecidos atravessados.'],
      ['Massa profunda, área sensível ou posição difícil', 'Anestesia geral costuma facilitar controle e precisão.', 'Analgesia, monitorização e acesso para hemostasia.'],
      ['Cavidade oral', 'Anestesia geral com intubação e proteção da via aérea.', 'Visão, controle de sangue/secreções e recuperação supervisionada.']
    ]),
    box('warning', 'Sedação não substitui analgesia', 'Mesmo quando o tumor tem pouca inervação, **pele, subcutâneo, mucosa e músculo são dolorosos**. Anestesie o acesso ou use bloqueio regional apropriado; calcule a dose total conforme espécie, peso e condição clínica. Ausência de movimento não confirma ausência de dor. [1–3]'),

    h('10. Passo 1 — documentar, posicionar e marcar'),
    steps('Antes de alterar a aparência da lesão', [
      '**Registre a massa:** local anatômico, três dimensões quando possível, mobilidade, fixação, ulceração e crescimento. Fotografe com escala.',
      '**Posicione com acesso e iluminação adequados**, permitindo coleta e hemostasia sem tração excessiva.',
      '**Marque a pequena incisão dentro do futuro campo cirúrgico.** Confirme que o trajeto profundo também poderá ser retirado.',
      '**Defina os nomes das amostras** para reproduzi-los no desenho e nos frascos.',
      '**Confirme os destinos:** histologia, imprint e eventual cultura. Decida a divisão antes de mergulhar tudo em formalina. [1,2]'
    ]),
    box('tip', 'Ponto de checagem', 'Você deve conseguir explicar: “Vou entrar por este ponto, colher esta região e retirar este trajeto junto com a massa na cirurgia definitiva”. Se isso não estiver claro, reveja o acesso antes de cortar.'),

    h('11. Passo 2 — preparar o campo e anestesiar o acesso'),
    steps('Preparo da biópsia aberta de uma massa', [
      'Faça tricotomia que permita visualizar a anatomia e trabalhar se houver sangramento; retire pelos soltos.',
      'Prepare pele e campo de forma asséptica, com antisséptico compatível com a região; evite produtos inadequados para mucosas ou olhos.',
      'Em lesão ulcerada, cuide da contaminação superficial sem traumatizar agressivamente o interior da massa.',
      'Anestesie a via de acesso ou faça o bloqueio indicado. Evite distorcer o alvo com infiltrações desnecessárias no fragmento a enviar.',
      'Aguarde e confira o efeito antes da incisão; ajuste analgesia ou anestesia se houver reação. [1–3]'
    ]),
    box('info', 'Massa tumoral não é o mesmo que dermatose', 'O preparo mínimo descrito no BSAVA Procedures para punch dermatológico preserva estruturas superficiais das lesões cutâneas. Isso não deve ser transferido automaticamente para uma biópsia aberta de massa subcutânea, que exige campo cirúrgico asséptico. O objetivo diagnóstico determina o preparo. [1,3]'),

    h('12. Passo 3 — incisar a pele e expor apenas o necessário'),
    steps('Acesso controlado', [
      'Estabilize suavemente a região sem comprimir vigorosamente o tumor.',
      'Faça uma **incisão linear, curta e orientada pelo planejamento**. Curta significa suficiente para enxergar e colher; não tão estreita que obrigue tração e esmagamento.',
      'Se a pele sobre a massa for normal e não aderida, abra o acesso sem retirar uma grande elipse de pele normal.',
      'Exponha a região selecionada com mínima dissecção. Diferencie o componente sólido de gordura, tecido reativo e pseudocápsula.',
      'Se anatomia ou vascularização forem diferentes do previsto, reavalie antes de aprofundar às cegas. [1,2]'
    ]),
    box('warning', 'Não transforme a biópsia em exploração', 'Não circunde a massa por dissecção nem abra um amplo plano fascial para “ver melhor”. Superfícies adicionais expostas podem ampliar o campo de preocupação oncológica. A visão deve ser adequada, com acesso restrito ao necessário. [1,2]'),

    h('13. Passo 4 — retirar a cunha: como o bisturi trabalha'),
    p('A cunha é um fragmento com volume e profundidade, obtido por cortes que convergem dentro do tecido lesional. Não é uma raspagem nem exige ângulo geométrico exato. O formato deve permitir **preservar arquitetura e liberar a base com controle visual**, respeitando a anatomia. [1]'),
    figure('cunha.svg', 'Corte esquemático com tecido viável, região superficial alterada e cunha profunda contida na massa.', 'Figura 2 — Os planos de corte convergem dentro de uma região viável e a base é liberada sob visão. O desenho não define profundidade, ângulo ou tamanho universais e não representa um órgão específico. Esquema original baseado em Withrow, cap. 9.'),
    steps('Coleta com instrumento frio', [
      '**Escolha os limites sobre tecido viável.** Se há ulceração, alcance a lesão abaixo ou ao lado da superfície alterada, sem colher somente crosta.',
      '**Faça o primeiro plano de corte com bisturi**, até profundidade suficiente para incluir tecido representativo.',
      '**Faça o segundo plano convergente**, delimitando uma cunha de espessura útil. Permaneça no tumor acessível; não procure uma margem normal profunda.',
      '**Sustente a periferia delicadamente e libere a base sob visão**, com lâmina ou tesoura fina quando apropriado. Não arranque o fragmento pela tração.',
      '**Inspecione o material:** há tecido sólido e íntegro ou só gordura, cápsula, coágulo e material friável? A conferência macroscópica orienta, mas não confirma sozinha que há tumor.',
      '**Se necessário, obtenha outra região viável pelo mesmo acesso planejado**, documentando sua origem. Não crie incisões indiscriminadamente para compensar uma seleção inadequada. [1,2]'
    ]),
    box('tip', 'Qual deve ser o tamanho da cunha?', 'Não existe uma dimensão única para toda massa. O fragmento precisa preservar arquitetura e profundidade lesional útil; a decisão depende da anatomia e da pergunta ao patologista. Combine necessidades especiais com o laboratório. O limite de espessura para fixação não é uma profundidade obrigatória de corte.'),

    h('14. Passo 5 — manipular sem destruir a informação'),
    p('O patologista precisa reconhecer células e as relações entre elas. A pinça pode amassar núcleos; a tração pode romper o fragmento; o calor pode coagular e deformar o tecido. Uma amostra retirada do lugar certo pode se tornar pouco útil por **artefato de coleta**. [1–3]'),
    table('Manobra → efeito sobre a amostra', ['Evite', 'O que acontece', 'Faça assim'], [
      ['Pinçar o centro com força', 'Esmagamento e perda de detalhes celulares.', 'Manipule a periferia, com instrumento delicado e mínima pressão.'],
      ['Puxar a amostra ainda presa', 'Rasgo e distorção da arquitetura.', 'Libere a base com corte antes de transferir.'],
      ['Cautério ou laser para recortar', 'Artefato térmico no tecido diagnóstico.', 'Instrumento frio; energia para hemostasia após a retirada.'],
      ['Esquecer sobre gaze seca', 'Desidratação e aderência ao tecido.', 'Transfira prontamente para o destino apropriado.'],
      ['Fragmentar repetidamente na bancada', 'Perda de orientação e de áreas úteis.', 'Preserve o fragmento; combine cortes necessários com o laboratório.']
    ]),

    h('15. Passo 6 — fazer imprint, quando ele ajudar'),
    p('O imprint é uma impressão citológica da superfície recém-cortada. Pode fornecer informação celular complementar e ajudar a correlacionar o material com a suspeita clínica. **Não substitui a histopatologia**; uma impressão pobre em células não invalida automaticamente o fragmento. [1,2]'),
    steps('Impressão antes de fixar', [
      'Identifique previamente as lâminas e separe um porta-lâminas seco.',
      'Retire delicadamente o excesso de sangue da superfície, sem comprimir nem deixar o tecido ressecar.',
      'Encoste a face recém-cortada no vidro em toques suaves. Não esfregue nem arraste o fragmento como uma raspagem.',
      'Deixe as impressões secarem ao ar e encaminhe-as identificadas para citologia.',
      'Coloque o fragmento no fixador logo após a impressão; embale as lâminas separadamente dos frascos de formalina. [1,2]'
    ]),
    box('warning', 'Formalina e citologia não compartilham embalagem', '==Os vapores de formalina prejudicam as lâminas citológicas.== Não basta deixar a lâmina fora do líquido: mantenha seu porta-lâminas separado da embalagem que contém o fixador. [2]'),

    h('16. Passo 7 — hemostasia e fechamento'),
    steps('Depois de retirar a amostra', [
      '**Controle o sangramento com visão direta:** compressão, ligadura ou cautério seletivo conforme o local. Evite manobras cegas perto de estruturas importantes.',
      '**Reavalie o leito antes de fechar.** Fechar a pele sobre uma hemorragia favorece hematoma e dificulta avaliar sua extensão.',
      '**Reduza o espaço morto quando necessário**, sem ampliar a dissecção para produzir um fechamento mais elaborado.',
      '**Aproxime os planos de forma simples e atraumática**, com material e padrão adequados à região, tensão e qualidade tecidual.',
      '**Evite drenos quando possível.** Se inevitáveis, sua via e saída precisam ser planejadas como parte do campo potencialmente contaminado e documentadas.',
      '**Fotografe o resultado e registre o trajeto profundo**, número de fragmentos e qualquer hematoma ou intercorrência. [1,2]'
    ]),
    box('info', 'Por que o hematoma importa além do sangramento?', 'O sangue pode se distribuir por planos que não foram diretamente incisados. Minimizar hematoma, seroma e espaço morto é uma medida preventiva para limitar a exposição local a células tumorais. Isso não significa que toda biópsia dissemina câncer nem fornece uma incidência universal de implantação. [1,2]'),

    h('17. Fixação: como conservar o que foi coletado'),
    p('Para histopatologia convencional, use **formalina tamponada neutra a 10%**, na proporção aproximada de **uma parte de tecido para dez partes de fixador**. Use solução preparada para histologia; “formalina 10%” não significa formaldeído puro a 10%. O tecido deve ficar imerso em frasco de boca larga e bem vedado. [1–3]'),
    figure('destinos.svg', 'Destinos separados: histopatologia em formalina, imprint em lâmina seca e tecido fresco para exames específicos.', 'Figura 3 — A divisão do material é planejada antes da fixação. A relação 1:10 refere-se a volumes aproximados de tecido e fixador. Cultura/PCR não têm um meio universal: confirme exame e transporte com o laboratório. Esquema original baseado nas recomendações de submissão.'),
    steps('Checagem da conservação', [
      '**Fixe prontamente.** Não deixe secar, não coloque em água e não congele tecido destinado à histologia convencional.',
      '**Confira a espessura.** O Withrow orienta que o tecido não exceda aproximadamente 1 cm de espessura para fixar adequadamente; isso é um limite de processamento, não uma medida padrão de cunha.',
      '**Não force fragmentos em frascos estreitos.** O tecido endurece com a fixação e pode ser difícil de retirar sem danificá-lo.',
      '**Identifique cada região.** Lesões distintas devem ir em recipientes separados; correlacione os códigos com o desenho.',
      '**Se houver processamento especial**, como em determinadas amostras musculares ou nervosas, consulte o laboratório antes da coleta. [1–3]'
    ]),
    box('warning', 'Há suspeita de infecção?', 'Histologia e cultura exigem destinos diferentes. Separe uma porção com técnica asséptica, em recipiente estéril e meio definido pelo laboratório, **antes da formalina**. Alguns testes moleculares aceitam tecido fixado e outros exigem material fresco: confirme a necessidade específica. [1,3]'),

    h('18. A requisição faz parte da qualidade da biópsia'),
    p('Um fragmento não informa sozinho de onde veio, como a massa se comporta ou o que o cirurgião viu. A requisição permite relacionar morfologia e contexto. Identifique expressamente: **biópsia incisional, com lesão remanescente no paciente**. [1,2,7]'),
    table('Dados que acompanham os frascos', ['Grupo', 'Informações essenciais'], [
      ['Paciente', 'Espécie, raça, idade, sexo e identificação.'],
      ['Lesão', 'Local exato, dimensões, duração, crescimento, mobilidade/fixação e ulceração.'],
      ['Histórico', 'Recidiva, tratamentos e cirurgias anteriores; relação com injeção quando pertinente.'],
      ['Exames', 'Citologia, imagem, suspeita de invasão e diferenciais relevantes.'],
      ['Coleta', 'Tipo incisional, número de fragmentos, região/profundidade e eventuais artefatos reconhecidos.'],
      ['Pergunta', 'Diagnóstico, subtipo e grau quando aplicável; adequação da amostra e testes adicionais.'],
      ['Mapa', 'Fotografia ou esquema com códigos dos recipientes e orientação anatômica.']
    ]),
    box('tip', 'Exemplo de requisição — caso hipotético', '“Cão, massa subcutânea lateral na coxa direita, 6 × 4 × 3 cm, crescimento há 8 semanas, pouco móvel. PAAF inconclusiva, células mesenquimais esparsas. Biópsia incisional: frasco A, região craniolateral sólida; frasco B, segunda região sólida pelo mesmo acesso. A maior parte permanece no paciente. Solicito diagnóstico e graduação se aplicável, com comentário sobre adequação. Fotografias e mapa anexos.”'),

    h('19. Cavidade oral: profundidade e via de acesso'),
    p('A superfície de uma massa oral sofre trauma, ulceração, necrose e inflamação. Uma coleta superficial pode mostrar somente essa reação, mesmo quando existe neoplasia abaixo. Nelson & Couto enfatizam amostras **profundas e de tamanho útil**, tanto para reconhecer tumor como para distinguir diferenciais inflamatórios. [4]'),
    figure('massa-oral-wright-2023.webp', 'Fotografia intraoperatória de massa oral caudal na mandíbula esquerda de um cão, em decúbito dorsal.', 'Figura 4 — A fotografia mostra localização e aspecto da massa, não a execução da cunha. No caso, a repetição da biópsia confirmou carcinoma de células escamosas papilar. © Wright, Peralta e Fiani, 2023, Figura 1, [Frontiers in Veterinary Science](https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2023.1281232/full). [CC BY](https://creativecommons.org/licenses/by/4.0/), sem alterações.'),
    steps('Adaptação para uma massa oral', [
      'Planeje imagem local quando necessária para avaliar profundidade e osso; avalie extensão antes da manipulação.',
      'Obtenha acesso e imobilidade sob anestesia geral, com via aérea protegida e recursos para aspiração/hemostasia.',
      '**Entre pela mucosa oral.** No melanoma oral, o consenso recomenda evitar via transcutânea que crie outro trajeto e comprometa a futura ressecção.',
      'Selecione componente sólido e obtenha profundidade suficiente para não enviar apenas superfície ulcerada.',
      'Controle o sangramento e confira a cavidade antes da recuperação; se usar tampão faríngeo, registre e confirme sua retirada.',
      'Planeje analgesia e alimentação conforme local, dor e capacidade de deglutir. [4,8]'
    ]),
    box('warning', 'Laudo “inflamatório” em massa oral agressiva', 'Crescimento rápido, destruição ou fixação importantes não devem ser ignorados diante de uma amostra superficial. Discuta profundidade e representatividade com o patologista; considere nova coleta, revisão ou imuno-histoquímica conforme a suspeita. [1,4,8]'),

    h('20. Sarcomas em cães e massas em locais de injeção nos gatos'),
    h('Cão — sarcoma de tecidos moles', 3),
    p('Em uma massa grande ou de cirurgia complexa, conhecer o diagnóstico antes da ressecção permite discutir extensão, reconstrução e terapias complementares. O consenso ABROVET 2026 recomenda biópsia antes do tratamento definitivo nesses cenários e reforça que a **peça completa deve voltar à histopatologia**, mesmo com diagnóstico incisional prévio. [5]'),
    h('Gato — suspeita de sarcoma associado ao local de injeção', 3),
    p('Uma massa suspeita nesse contexto exige atenção ao comportamento infiltrativo e à possibilidade de cirurgia extensa. Planeje a coleta e o trajeto com a equipe que fará o tratamento, obtenha diagnóstico e determine a extensão local. A sequência de imagem e biópsia deve ser ajustada ao planejamento do caso. [1,2]'),
    box('warning', 'Não “descascar a bolinha” para descobrir depois', 'Retirar marginalmente uma massa infiltrativa pode deixar extensões microscópicas e transformar a próxima intervenção em ressecção de tumor residual, cicatriz e planos manipulados. **A primeira cirurgia definitiva deve ser planejada**; a biópsia diagnóstica precisa preservar essa oportunidade. [1,2,5]'),

    h('21. O que o laudo pode — e não pode — responder'),
    table('Interprete a resposta na escala da amostra', ['Pergunta', 'O que pode fornecer', 'Limite'], [
      ['Existe neoplasia?', 'Identificação do processo e diferenciais.', 'Tecido reativo, necrótico ou superficial pode não representar a lesão.'],
      ['Qual é o tipo?', 'Linhagem e subtipo quando a morfologia permite.', 'Imuno-histoquímica ou outros exames podem ser necessários.'],
      ['Qual é o grau?', 'Graduação nos tumores com sistema aplicável.', 'Pode ser subestimado; reavaliar a peça inteira.'],
      ['Há invasão?', 'Invasão presente no fragmento.', 'Ausência no fragmento não exclui invasão em outra região.'],
      ['As margens estão livres?', '**Não avalia margens definitivas.**', 'Por definição, a massa permaneceu no paciente.'],
      ['Qual é o prognóstico?', 'Dados histológicos que contribuem para estimá-lo.', 'Depende também de extensão/estádio, local, tratamento e paciente.']
    ]),
    p('Não atribua uma sensibilidade, especificidade ou “acurácia de 95%” universal à técnica. O desempenho muda com lesão, alvo, tamanho, profundidade e processamento. Estudos de concordância de graduação respondem uma pergunta específica; não medem todas essas situações. [1,5,6]'),

    h('22. Evidência clínica: por que uma amostra pode subgraduar'),
    p('Ferraris e colaboradores estudaram prospectivamente **32 cães com sarcomas cutâneos/subcutâneos**. Após a excisão, coletaram três amostras por punch — uma central e duas periféricas — e compararam a graduação com a da massa inteira. [6]'),
    figure('concordancia.svg', 'Concordância de grau de 71% na amostra central e 59% na periférica; subgraduação de 29% e 40,5%.', 'Figura 5 — Ferraris et al., 2026: 32 cães, amostras por punch após excisão. Concordância e subgraduação são desfechos distintos; não somam necessariamente 100%. Gráfico original com os resultados publicados.'),
    box('info', 'O que muda na prática — e o que o estudo não prova', 'Pelo menos duas regiões aumentaram a chance de prever o grau definitivo no estudo. Isso reforça representatividade, mas **não determina três punções para todo paciente nem a coleta de um centro necrótico**. As amostras foram obtidas após excisão, fora do paciente; os resultados não validam qualquer trajeto pré-operatório nem todos os tumores. [6]'),
    p('O consenso ABROVET cita diferenças de graduação pré-operatória em **12–29%** dos casos de estudos anteriores. É outra síntese, não um intervalo universal nem os mesmos dados do gráfico. Em ambos os contextos, a consequência é reavaliar a peça definitiva. [5]'),

    h('23. Laudo discordante: como resolver'),
    steps('Quando a histologia não explica o paciente', [
      '**Confira identidade, local e tipo de amostra.** O laudo corresponde ao fragmento e à região enviados?',
      '**Leia a adequação:** necrose, inflamação superficial, artefato, pequeno tamanho ou insuficiência de material.',
      '**Converse com o patologista**, mostrando fotografias, citologia e imagem. Pergunte se os achados explicam crescimento e invasividade.',
      '**Discuta recortes, colorações, imuno-histoquímica ou segunda opinião**, conforme hipótese e material disponível.',
      '**Se o problema é amostragem, planeje nova coleta representativa.** Repetir o mesmo acesso superficial pode repetir a falha.',
      '**Reavalie a estratégia após essa correlação**, antes de uma intervenção irreversível apoiada em resultado pouco compatível. [1,2,8]'
    ]),
    box('tip', 'Exemplo: “fibrose e inflamação” não encerra toda investigação', 'Em uma massa de crescimento lento e contexto inflamatório plausível, pode ser coerente. Em uma massa destrutiva e progressiva, pergunte se foi coletada apenas sua cobertura reativa. O laudo precisa ser interpretado junto do paciente, e não aceito ou descartado automaticamente.'),

    h('24. Complicações: prevenção e resposta inicial'),
    table('Reconhecer o problema cedo', ['Problema', 'Mecanismo / pista', 'Prevenção e resposta'], [
      ['Hemorragia ou hematoma expansivo', 'Lesão vascular, hemostasia incompleta ou alteração sistêmica.', 'Controle direto e reavaliação clínica; não apenas suturar sobre o sangramento.'],
      ['Seroma', 'Espaço morto e dissecção extensa.', 'Limitar dissecção e tratar o espaço morto sem criar corredores desnecessários.'],
      ['Deiscência', 'Tensão, infecção ou tecido comprometido.', 'Fechamento atraumático; revisar viabilidade, tensão e contaminação.'],
      ['Infecção', 'Contaminação do acesso ou ferida.', 'Assepsia e acompanhamento; avaliar necessidade de tratamento dirigido.'],
      ['Dor / dificuldade de alimentação', 'Trauma de tecidos sensíveis, principalmente na boca.', 'Analgesia, suporte e reavaliação funcional.'],
      ['Amostra não diagnóstica', 'Alvo errado, superficialidade, necrose ou artefato.', 'Revisar seleção e técnica; nova coleta quando indicada.'],
      ['Campo definitivo comprometido', 'Trajeto mal posicionado, hematoma ou planos cruzados.', 'Planejar antes e documentar a área manipulada para a discussão cirúrgica.']
    ]),

    h('25. Pós-procedimento e continuidade do tratamento'),
    list([
      '**Recuperação imediata:** monitore sangramento, aumento de volume, dor e recuperação anestésica. Na boca, avalie também via aérea e deglutição.',
      '**Proteção da ferida:** impeça lambedura e trauma; limite atividade conforme local. Defina reavaliação e retirada de sutura conforme o fechamento.',
      '**Retorno antecipado:** sangramento persistente, aumento rápido de volume, secreção, abertura da ferida, dor progressiva ou dificuldade respiratória/alimentar.',
      '**Rastreie o exame:** confirme envio e previsão do laudo; atribua a alguém a responsabilidade pelo retorno e comunicação ao tutor.',
      '**Planeje o tratamento após a resposta:** encaminhe fotos/mapa; remova tumor e trajeto em bloco quando indicada ressecção com intenção curativa. [1,2]'
    ]),
    p('A sutura que cicatrizou bem não encerra o caso. O seguimento inclui interpretar o resultado, resolver discordâncias e transformar a informação em um plano terapêutico.'),

    h('26. Fluxo clínico — da indicação ao tratamento'),
    {
      type: 'flowchart', title: 'Sequência principal de trabalho',
      nodes: [
        { id: 'question', label: 'Definir a pergunta clínica', variant: 'start' },
        { id: 'plan', label: 'Planejar imagem, campo e trajeto', variant: 'action' },
        { id: 'collect', label: 'Coletar cunha viável com instrumento frio', variant: 'action' },
        { id: 'send', label: 'Fixar, identificar e enviar com histórico', variant: 'action' },
        { id: 'interpret', label: 'Correlacionar laudo e paciente', variant: 'decision' },
        { id: 'treat', label: 'Definir tratamento e destino do trajeto', variant: 'end' }
      ],
      edges: [{ from: 'question', to: 'plan' }, { from: 'plan', to: 'collect' }, { from: 'collect', to: 'send' }, { from: 'send', to: 'interpret' }, { from: 'interpret', to: 'treat' }]
    },
    box('warning', 'Duas situações interrompem o fluxo', '**Trajeto inadequado antes da coleta:** replanejar ou encaminhar.\n\n**Laudo incompatível depois da coleta:** discutir adequação, revisão e eventual nova biópsia. Não seguir automaticamente para uma ressecção baseada em informação insuficiente.'),

    h('27. Box de bolso — antes, durante e depois'),
    box('tip', 'Oito pontos para memorizar', '1. **PERGUNTA:** o diagnóstico muda a conduta?\n\n2. **TRAJETO:** cabe na futura ressecção em superfície e profundidade?\n\n3. **ALVO:** tecido viável e representativo, não apenas crosta/cápsula?\n\n4. **DOR:** os tecidos do acesso estão anestesiados?\n\n5. **COLETA:** cunha com instrumento frio, sem esmagar nem arrancar?\n\n6. **HEMOSTASIA:** leito controlado, mínimo espaço morto e trajeto documentado?\n\n7. **ENVIO:** formalina 10%, 1:10, identificação e lâminas separadas?\n\n8. **LAUDO:** coerente com a clínica e incorporado ao plano definitivo?'),
    h('Checklist de conferência da sessão', 3),
    { type: 'list', checklist: true, items: ['Fotografia, medidas e mapa do acesso registrados.', 'Risco anestésico/hemorrágico avaliado.', 'Acesso compatível com a futura ressecção.', 'Material de coleta, hemostasia e recipientes preparados.', 'Tecido representativo obtido com manipulação delicada.', 'Imprint e material fresco separados, quando indicados.', 'Fixação e identificação conferidas.', 'Requisição com contexto, local e pergunta preenchida.', 'Analgesia, cuidados e retorno combinados.', 'Responsável pelo acompanhamento do laudo definido.'] },

    h('28. Referências técnicas e leitura crítica'),
    p('Os capítulos abaixo foram consultados no acervo local. Os números entre colchetes identificam as fontes; as páginas são as impressas nos livros. Os artigos complementam pontos específicos de diagnóstico, submissão e representatividade.'),
    table('Livros consultados — aplicação no guia', ['Referência', 'Capítulo / páginas', 'Aplicação'], [
      ['[1] Vail DM, Thamm DH, Liptak JM (eds.). Withrow & MacEwen’s Small Animal Clinical Oncology. 6ª ed. Elsevier; 2020.', 'Cap. 9, Biopsy and Sentinel Lymph Node Mapping Principles, pp. 158–163.', 'Indicação, cunha, trajeto, interface, hemostasia, fixação e interpretação.'],
      ['[2] Dobson JM, Lascelles BDX (eds.). BSAVA Manual of Canine and Feline Oncology. 3ª ed. BSAVA; 2011.', 'Cap. 2, How to make a diagnosis, pp. 10–13; cap. 6, Principles of oncological surgery, pp. 46–48.', 'Amostragem, instrumentos, envio, orientação da incisão e compartimentos.'],
      ['[3] Bexfield N, Riggs J (eds.). BSAVA Guide to Procedures in Small Animal Practice. 3ª ed. BSAVA; 2024.', 'Skin biopsy – punch biopsy, pp. 255–256.', 'Manipulação atraumática, recipientes e distinção do preparo dermatológico; não é capítulo de cunha tumoral.'],
      ['[4] Nelson RW, Couto CG. Small Animal Internal Medicine. 6ª ed. Elsevier; 2020.', 'Cap. 29, Disorders of the Oral Cavity, Pharynx, and Esophagus, pp. 447–449.', 'Imagem e amostragem profunda em massas orais de cães e gatos.']
    ]),
    list([
      '[5] **Fonseca-Alves CE et al.** Canine cutaneous and subcutaneous soft tissue sarcoma in dogs: a consensus report from the Brazilian association of veterinary oncology. Front Vet Sci. 2026;13:1750148. [Artigo e DOI](https://doi.org/10.3389/fvets.2026.1750148). Consenso/revisão: biópsia prévia e reavaliação da peça; não é ensaio de comparação de técnicas.',
      '[6] **Ferraris EI et al.** Multiple preoperative biopsies may increase histologic grade accuracy in canine soft tissue sarcoma: a prospective study. Vet J. 2026;316:106596. [PubMed](https://pubmed.ncbi.nlm.nih.gov/41692151/) · [DOI](https://doi.org/10.1016/j.tvjl.2026.106596). Estudo prospectivo em 32 cães, amostras por punch após excisão.',
      '[7] **Kamstock DA et al.** Recommended guidelines for submission, trimming, margin evaluation, and reporting of tumor biopsy specimens in veterinary surgical pathology. Vet Pathol. 2011;48(1):19–31. [PubMed](https://pubmed.ncbi.nlm.nih.gov/21123864/) · [DOI](https://doi.org/10.1177/0300985810389316). Diretriz de submissão/processamento; margens aplicam-se à peça de ressecção.',
      '[8] **Polton G et al.** Melanoma of the dog and cat: consensus and guidelines. Front Vet Sci. 2024;11:1359426. [Artigo e DOI](https://doi.org/10.3389/fvets.2024.1359426). Amostra ampla/profunda, acesso mucoso no melanoma oral e imuno-histoquímica quando necessária.',
      '[9] **Wright AL, Peralta S, Fiani N.** Case report: Spontaneous mandibular body regeneration following unilateral subtotal mandibulectomy in a 3-month-old French bulldog. Front Vet Sci. 2023;10:1281232. [Artigo e Figura 1](https://doi.org/10.3389/fvets.2023.1281232). Fotografia sob CC BY, com atribuição; relato ilustrativo, não estudo de acurácia.'
    ]),
    box('info', 'Como ler o peso das fontes', 'Os livros fundamentam a técnica; os consensos reúnem recomendações; Ferraris quantifica um desfecho em uma amostra específica; a fotografia ilustra um caso. Esses tipos de evidência não são intercambiáveis. Os esquemas são didáticos e não definem margens, ângulos ou profundidades universais.')
  ],
  isPublished: true
};
