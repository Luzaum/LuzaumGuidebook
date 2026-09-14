import type { ClinicalQuickGuide, ClinicalQuickGuideBlock } from '../../types/clinicalQuickGuide';

// Redação técnica e oncológica completa baseada em Withrow & MacEwen, BSAVA Oncology, Nelson & Couto e diretrizes ACVP / ABROVET.
// Rastreabilidade editorial e fontes: docs/biopsia-incisional-fontes.md.
const h = (text: string, level: 2 | 3 | 4 = 2): ClinicalQuickGuideBlock => ({ type: 'heading', level, text });
const p = (text: string): ClinicalQuickGuideBlock => ({ type: 'paragraph', text });
const box = (variant: 'info' | 'warning' | 'tip', title: string, text: string): ClinicalQuickGuideBlock => ({ type: 'callout', variant, title, text });
const steps = (title: string, items: string[]): ClinicalQuickGuideBlock => ({ type: 'steps', title, items });
const list = (items: string[], checklist = false): ClinicalQuickGuideBlock => ({ type: 'list', items, checklist });
const table = (caption: string, headers: string[], rows: string[][]): ClinicalQuickGuideBlock => ({ type: 'table', caption, headers, rows });
const pre = (text: string): ClinicalQuickGuideBlock => ({ type: 'preformatted', text });

const figureSizes: Record<string, [number, number]> = {
  'trajeto.svg': [800, 713],
  'cunha.svg': [800, 710],
  'destinos.svg': [800, 701],
  'massa-oral-wright-2023.webp': [851, 569],
  'concordancia.svg': [864, 720],
  'sarcoma-resseccao-fonseca-2026.webp': [1418, 1069],
  'margens-vincenti-2025.webp': [1535, 566],
};

const figure = (file: string, alt: string, caption: string): ClinicalQuickGuideBlock => ({
  type: 'figure',
  src: `/consulta-vet/clinical-guides/biopsia-incisional/${file}`,
  alt,
  caption,
  width: figureSizes[file]?.[0],
  height: figureSizes[file]?.[1],
});


// ============================================================================
// ABA 1: QUANDO FAZER
// ============================================================================
const tabQuandoFazer: ClinicalQuickGuideBlock[] = [
  h('1. O que é a biópsia incisional e conceito oncológico fundamental'),
  p('A **biópsia incisional** é a remoção cirúrgica de apenas uma porção representativa de uma lesão, deixando a maior parte da massa no paciente, com o objetivo estrito de obter tecido suficiente para avaliação histopatológica antes do tratamento definitivo.'),
  box('warning', 'O princípio basilar da oncologia cirúrgica', '==A biópsia incisional não deve ser encarada como “tirar um pedacinho para descobrir o que é”.== Em oncologia, a biópsia já faz parte da cirurgia definitiva: o local, a direção e a profundidade da incisão criam um trajeto potencialmente contaminado por células tumorais que **deverá ser removido em bloco junto com o tumor posteriormente**. O Withrow & MacEwen orienta categoricamente que o trajeto da biópsia incisional seja incorporado à futura ressecção em bloco.'),
  p('O objetivo da biópsia incisional **não é obter margens livres**, mas obter tecido com arquitetura preservada para responder a perguntas que mudarão a conduta: *Existe neoplasia? → Qual a linhagem? → Qual o subtipo? → Qual o grau histológico quando aplicável? → Isso muda a extensão cirúrgica, radioterapia, quimioterapia ou o prognóstico?*'),
  box('tip', 'A analogia do bolo: por que a histopatologia supera a citologia', 'A citologia avalia as “migalhas”: mostra muito bem as células individuais, mas não conserva a organização tecidual. Uma cunha é uma fatia que mantém as camadas e a relação entre elas. A histopatologia preserva a arquitetura tecidual, permitindo avaliar diferenciação, mitoses, necrose, invasão vascular/linfática e graduação histológica. O BSAVA destaca essa vantagem fundamental das técnicas histológicas sobre a citologia isolada.'),
  p('Este guia detalha a técnica aberta em cunha (*wedge biopsy*) de massas cutâneas, subcutâneas e de tecidos moles acessíveis, além das particularidades fundamentais para a cavidade oral e sarcomas em cães e gatos.'),

  h('2. Comparação prática: PAAF, core, punch, incisional ou excisional?'),
  table('Modalidades de biópsia e amostragem tecidual', ['Técnica', 'Material obtido', 'Principal vantagem', 'Principal limitação'], [
    ['PAAF', 'Células isoladas', 'Rápida, barata, pouco invasiva; dispensa anestesia na maioria dos casos.', 'Arquitetura tecidual ausente; não avalia invasão estromal nem gradua sarcomas.'],
    ['Core / Tru-cut', 'Cilindro de tecido', 'Arquitetura tecidual preservada com baixa morbidade cirúrgica.', 'Amostra pequena; suscetível a erros por heterogeneidade tumoral, necrose e fibrose.'],
    ['Punch', 'Cilindro relativamente largo', 'Excelente para pele e lesões superficiais; rápido e padronizado.', 'Profundidade limitada; pode colher apenas derme e inflamação sobre massa profunda.'],
    ['**Incisional (em cunha)**', '**Fragmento/wedge relativamente grande**', '**Excelente arquitetura e representatividade tecidual sob visão direta.**', '**Mais invasiva; cria trajeto cirúrgico potencialmente contaminado que exige ressecção futura.**'],
    ['Excisional', 'Massa inteira', 'Diagnóstico e potencial tratamento simultâneo em lesões selecionadas.', 'Pode arruinar a primeira cirurgia oncológica se feita sem planejamento ou com margens infiltradas.']
  ]),
  p('O Withrow ressalta que a **biópsia excisional é empregada com frequência maior do que deveria**: a remoção marginal (“descascar a bolinha”) de uma massa posteriormente diagnosticada como sarcoma transforma uma cirurgia inicialmente simples em uma segunda operação muito maior, mutilante ou com necessidade de radioterapia complementar.'),
  box('warning', 'O perigo de “descascar e descobrir depois”', 'Nunca realize excisão marginal de uma massa sólida suspeita sem diagnóstico prévio. A primeira cirurgia oncológica é a melhor oportunidade de cura do paciente; desrespeitar os princípios de margens amplas tridimensionais resulta em recidiva local agressiva.'),

  h('3. Quando indicar biópsia incisional (Indicações fortes)'),
  steps('Indicações estabelecidas pelas diretrizes de oncologia clínica (Withrow & MacEwen / BSAVA)', [
    '**PAAF ou core biopsy foram inconclusivos ou discordantes da clínica:** massa palpável progressiva cuja citologia revelou apenas sangue, tecido adiposo ou inflamação reativa inespecífica.',
    '**O tipo tumoral modifica a modalidade de tratamento:** diferenciação entre neoplasia epitelial, mesenquimal, de células redondas ou inflamatória, definindo cirurgia, radioterapia ou quimioterapia.',
    '**O grau histológico modifica a extensão cirúrgica:** crucial em sarcomas de tecidos moles (STS) e mastocitomas, nos quais o grau define as margens laterais e fasciais.',
    '**A lesão é grande, infiltrativa ou fixa:** massas em que a exérese definitiva exigirá cirurgia de grande porte.',
    '**A localização torna a cirurgia definitiva complexa:** áreas com pouca cobertura cutânea ou próximas a estruturas nobres (membros, cabeça, períneo).',
    '**Uma reconstrução complexa pode ser necessária:** planejamento prévio de retalhos, enxertos, mandibulectomia, maxilectomia ou amputação.',
    '**A decisão do tutor depende de informações prognósticas:** tutores que demandam precisão de prognóstico antes de autorizarem procedimentos de maior morbidade.',
    '**A lesão apresenta grande quantidade de inflamação, ulceração ou necrose:** tornando pequenas amostras (PAAF/punch superficial) pouco confiáveis.',
    '**Preservação da arquitetura indispensável para diagnóstico diferencial:** diferenciação precisa de neoplasias mesenquimais.',
    '**Massas da cavidade oral:** exigem amostra profunda e representativa para superar a inflamação e necrose superficiais causadas pela microbiota bucal.'
  ]),
  box('info', 'Exemplo clássico: Sarcoma de Tecidos Moles (STS)', 'O consenso brasileiro da **ABROVET (2026)** recomenda histopatologia para o diagnóstico definitivo dos tumores de tecidos moles e considera a **biópsia incisional o método de escolha antes do tratamento definitivo**, particularmente em massas grandes ou situações nas quais a ressecção pode ser complexa. O grau histológico prediz o comportamento biológico e influencia a “dose” cirúrgica; tentar retirar primeiro e descobrir depois resulta em cirurgia inadequada.'),

  h('4. Quando NÃO fazer uma biópsia incisional'),
  p('É fundamental distinguir clinicamente uma **biópsia pré-operatória desnecessária** de uma **contraindicação formal ou motivo para adiamento**.'),
  table('Biópsia desnecessária vs Contraindicações e motivos para adiar', ['Cenário clínico', 'Classificação', 'Conduta recomendada'], [
    ['Massa testicular', 'Desnecessária', 'O conhecimento prévio não alteraria a cirurgia; a orquiectomia é curativa e diagnóstica, evitando semeadura escrotal.'],
    ['Massa esplênica solitária com indicação de esplenectomia', 'Desnecessária', 'A biópsia esplênica traz risco hemorrágico e de semeadura peritoneal; a esplenectomia total é indicada diretamente.'],
    ['Procedimento de biópsia com morbidade semelhante à cirurgia definitiva', 'Desnecessária', 'Se a informação não mudar a conduta cirúrgica e o procedimento definitivo já for apropriado, execute diretamente a cirurgia planejada.'],
    ['Coagulopatia clinicamente relevante não corrigida', 'Contraindicação / Adiar', 'Risco hemorrágico grave e formação de hematoma expansivo; corrigir discrasia antes de biopsiar.'],
    ['Trombocitopenia grave ou disfunção hemostática importante', 'Contraindicação / Adiar', 'Risco de sangramento incontrolável; adiar e tratar a hemostasia primária previamente.'],
    ['Instabilidade cardiovascular ou respiratória', 'Contraindicação / Adiar', 'Incompatibilidade com sedação ou anestesia; estabilizar o paciente antes de qualquer procedimento eletivo.'],
    ['Infecção ativa importante na via de acesso', 'Contraindicação / Adiar', 'Risco de inocular patógenos em planos teciduais profundos; tratar ou redirecionar a rota anatômica.'],
    ['Impossibilidade de posicionar o trajeto dentro da futura área de ressecção', 'Contraindicação formal', 'Acesso inadequado contamina tecidos que não poderão ser retirados; replanejar a via cirúrgica.'],
    ['Necessidade de atravessar articulação, grande vaso, cavidade ou nervo sadio', 'Contraindicação formal', 'Viola planos anatômicos virgens e contamina estruturas que precisariam ser preservadas.'],
    ['Lesão extremamente vascularizada com alto risco hemorrágico', 'Contraindicação relativa', 'Considerar biópsia guiada por imagem, core biopsy ou embolização prévia.']
  ]),
  box('tip', 'Princípio de ouro do trajeto oncológico', '==Se você não consegue imaginar como vai retirar o trajeto da biópsia junto com a massa depois, provavelmente precisa reconsiderar o trajeto antes de biopsiar.=='),

  h('5. Algoritmo prático de decisão clínica no plantão'),
  {
    type: 'flowchart',
    title: 'Fluxograma decisório da massa suspeita à cirurgia definitiva',
    nodes: [
      { id: 'massa', label: 'Massa suspeita (História + Exame 3D + Fotografia)', variant: 'start' },
      { id: 'paaf', label: 'PAAF é capaz de responder à pergunta clínica?', variant: 'decision' },
      { id: 'cito', label: 'Citologia conclusiva (ex.: Mastocitoma, Linfoma)', variant: 'end' },
      { id: 'arquitetura', label: 'Preciso de arquitetura tecidual ou grau histológico?', variant: 'decision' },
      { id: 'muda', label: 'Diagnóstico mudará tratamento ou extensão cirúrgica?', variant: 'decision' },
      { id: 'ressec', label: 'Considerar excisão direta planejada apropriada', variant: 'end' },
      { id: 'imagem', label: 'TC / RM prévia se massa profunda/complexa', variant: 'action' },
      { id: 'planejar', label: 'PLANEJAR TRAJETO (curto + linear + futuro campo)', variant: 'action' },
      { id: 'incisional', label: 'BIÓPSIA INCISIONAL (amostra viável + profunda + sem cautério)', variant: 'action' },
      { id: 'fixacao', label: 'FORMALINA 10% (1:10) + HISTÓRICO COMPLETO (ACVP)', variant: 'action' },
      { id: 'laudo', label: 'Resultado da histopatologia faz sentido clínico?', variant: 'decision' },
      { id: 'cirurgia', label: 'Cirurgia definitiva: retirar tumor + trajeto EM BLOCO', variant: 'end' },
      { id: 'segunda_opiniao', label: 'Falar com patologista / recortes / IHQ / repetir biópsia', variant: 'action' }
    ],
    edges: [
      { from: 'massa', to: 'paaf' },
      { from: 'paaf', to: 'cito', label: 'Sim' },
      { from: 'paaf', to: 'arquitetura', label: 'Não / Inconclusiva' },
      { from: 'arquitetura', to: 'muda', label: 'Sim' },
      { from: 'muda', to: 'ressec', label: 'Não' },
      { from: 'muda', to: 'imagem', label: 'Sim' },
      { from: 'imagem', to: 'planejar' },
      { from: 'planejar', to: 'incisional' },
      { from: 'incisional', to: 'fixacao' },
      { from: 'fixacao', to: 'laudo' },
      { from: 'laudo', to: 'cirurgia', label: 'Sim' },
      { from: 'laudo', to: 'segunda_opiniao', label: 'Não (Discordante)' }
    ]
  },
  pre(`MASSA SUSPEITA
│
▼
História + exame físico tridimensional + fotografia com escala
│
▼
PAAF é capaz de responder à pergunta clínica?
│   ┌────┴─────┐
│   SIM        NÃO / inconclusiva
│   │          ▼
│   ▼        Preciso de arquitetura ou grau histológico?
Citologia     │   ┌─────┴─────┐
              │   NÃO         SIM
              │   │           ▼
              │ Core/punch   Core ou Incisional em cunha
              ▼
    Diagnóstico mudará tratamento/extensão cirúrgica?
    │   ┌──────┴──────┐
    │   NÃO           SIM
    │   │             ▼
    │ considerar   TC / RM prévia se profunda/complexa
    │ excisão       │
    │ direta          ▼
    │          PLANEJAR TRAJETO CIRÚRGICO
    │          curto + linear + dentro do futuro campo de ressecção
    │                 ▼
    │          BIÓPSIA INCISIONAL
    │          amostra viável + profunda + bisturi frio sem cautério
    │                 ▼
    │          FORMALINA 10% (1:10) + HISTÓRICO DETALHADO (ACVP)
    │                 ▼
    │          HISTOPATOLOGIA
    │          resultado faz sentido clínico?
    │                 │
    │   SIM ──────────┴────────── NÃO
    │   │                         │
    │   ▼                         ▼
cirurgia definitiva        falar com patologista / recortes / IHQ /
(retirar tumor +           segunda opinião ou repetir biópsia
trajeto da biópsia EM BLOCO)`),
  box('warning', 'Duas situações que interrompem o fluxo', '**Trajeto inadequado antes da coleta:** pare e replaneje o acesso ou encaminhe ao cirurgião oncológico.\n\n**Laudo incompatível depois da coleta:** discuta adequação com o patologista antes de tomar uma conduta irreversível.')
];


// ============================================================================
// ABA 2: PLANEJAMENTO
// ============================================================================
const tabPlanejamento: ClinicalQuickGuideBlock[] = [
  h('6. Antes da biópsia: planeje a cirurgia definitiva primeiro'),
  p('Esse é o ponto em que muitas biópsias oncológicas dão errado. Imagine uma massa na face lateral da coxa. Não escolha simplesmente “o ponto mais fácil para cortar”. Pergunte:'),
  box('tip', 'A pergunta que define o trajeto', '==“Se isso for um sarcoma agressivo, qual será minha futura linha de ressecção?”== A biópsia deve então ocupar uma pequena parte dessa futura linha.'),
  p('O BSAVA estabelece princípios rigorosos: a incisão deve permanecer dentro do provável campo cirúrgico/radioterápico, ser tão curta quanto possível e ser orientada de modo que não amplie a área que posteriormente precisará ser retirada. Em membros e cauda, recomenda-se tradicionalmente **orientação paralela ao eixo longitudinal do membro**.'),
  figure('trajeto.svg', 'Incisão longitudinal contida no campo planejado comparada com uma incisão transversal.', 'Figura 1 — Planejamento da incisão em um membro. O contorno tracejado representa o campo hipotético de ressecção. Em membros, a incisão deve ser longitudinal ao eixo longo. Uma incisão transversal extravasa o campo cirúrgico e impede o fechamento primário na cirurgia definitiva. Esquema baseado em Withrow & MacEwen (Cap. 9) e BSAVA Oncology (Cap. 6).'),
  steps('Regras anatômicas para planejar a via de acesso', [
    '**Imagine a futura ressecção antes de marcar a pele:** projete mentalmente a margem lateral e profunda necessária para uma ressecção curativa.',
    '**Em membros e cauda, siga rigorosamente o eixo longitudinal:** incisões transversais forçam uma elipse definitiva imensa, frequentemente impossível de fechar sem enxertos ou amputação.',
    '**Prefira a via curta que seja oncologicamente ressecável:** o caminho mais curto não serve se atravessar articulação, grande vaso ou feixe neurovascular.',
    '**Evite descolamentos teciduais e dissecções amplas:** não descole a pseudocápsula nem crie túneis laterais que aumentem a área contaminada.',
    '**Preserve os tecidos de reconstrução:** uma futura área doadora de retalho reconstrutivo não deve ser utilizada como corredor da biópsia.'
  ]),
  box('warning', 'Pseudocápsula tumoral não é margem cirúrgica!', 'Em muitos sarcomas, a faixa que parece uma cápsula fibrosa contém células tumorais infiltrativas viáveis e tecido reativo inflamado. “Descolar por fora” não equivale a ressecção oncológica e deixa doença microscópica residual em todo o leito cirúrgico.'),

  h('7. O princípio sagrado dos compartimentos anatômicos'),
  p('Este princípio merece destaque absoluto: o trajeto da biópsia é um volume tridimensional potencialmente contaminado. Durante a manipulação cirúrgica e a incisão tumoral, células neoplásicas podem ser deslocadas para o trajeto, contaminando novos planos anatômicos.'),
  box('warning', 'Não contamine compartimentos sadios virgens', '==Nunca atravesse desnecessariamente: outro músculo, septo fascial íntegro, articulação, cavidade sinovial, grande vaso sanguíneo, feixe neurovascular, cavidade pleural/peritoneal ou área necessária para retalho reconstrutivo.== Se você violar um compartimento muscular adjacente sadio para atingir o tumor, esse compartimento também terá que ser removido na cirurgia definitiva (BSAVA Oncology).'),
  p('O BSAVA orienta explicitamente evitar violação de planos anatômicos e compartimentos não envolvidos pela lesão.'),

  h('8. Extensão cirúrgica em sarcomas: por que o trajeto precisa ser planejado'),
  figure('sarcoma-resseccao-fonseca-2026.webp', 'Ressecção oncológica de sarcoma de tecidos moles em cão com margens amplas e reconstrução.', 'Figura 2 — Ressecção oncológica de sarcoma de tecidos moles em cão. A sequência cirúrgica em bloco evidencia a extensão de uma cirurgia definitiva e reforça a necessidade imperativa de posicionar previamente o trajeto da biópsia dentro do campo que será removido em bloco. Licença CC BY. Fonte: Fonseca-Alves et al., 2026, Frontiers in Veterinary Science (DOI: 10.3389/fvets.2026.1750148).'),
  p('A sequência cirúrgica do consenso ABROVET (2026) demonstra que a ressecção curativa de sarcomas exige margens laterais tridimensionais amplas e fáscia profunda intacta. Se o trajeto da biópsia tiver sido feito fora do alinhamento correto, o cirurgião definitivo será obrigado a ampliar ainda mais o defeito tecidual.'),

  h('9. Imagem avançada: antes ou depois da biópsia?'),
  p('Para pequenas massas superficiais móveis, a imagem avançada muitas vezes não faz diferença prévia. Entretanto, para **massas profundas, sarcomas grandes, massas fixas, tumores de extremidades, tumores de cabeça e pescoço, massas vertebrais, suspeita de invasão óssea ou proximidade com grandes vasos**, é frequentemente muito vantajoso realizar **Tomografia Computadorizada (TC) ou Ressonância Magnética (RM) antes da biópsia**, quando possível.'),
  table('Indicações de imagem avançada pré-biópsia por apresentação clínica', ['Apresentação clínica da massa', 'O que esclarecer na imagem antes de cortar'], [
    ['Massa profunda ou intramuscular', 'Compartimento muscular de origem, relação com fáscias e feixes neurovasculares; define se a via é ressecável.'],
    ['Tumor oral ou de cabeça e pescoço', 'Extensão profunda, invasão óssea/lise cortical e possibilidade real de mandibulectomia/maxilectomia.'],
    ['Massa volumosa, heterogênea ou cavitada', 'Diferenciação clara entre tecido sólido viável contrastado e centro necrótico/fluido, guiando o ponto exato da cunha.'],
    ['Suspeita de sarcoma felino de aplicação (FISS)', 'Extensão tridimensional real dos planos fasciais infiltrados antes de qualquer manipulação.']
  ]),
  box('info', 'Por que a biópsia antes da imagem pode distorcer a TC/RM?', 'O mecanismo é direto: **biópsia cirúrgica → inflamação local + edema tecidual ± hemorragia e hematoma → alteração e obscurecimento dos planos anatômicos originais → potencial dificuldade para definir a real extensão tumoral na imagem posterior**. Além disso, conhecer previamente a anatomia permite escolher um trajeto que não cruze estruturas nobres que devam ser preservadas.'),

  h('10. Particularidades: Sarcomas em cães e gatos (FISS)'),
  h('Sarcoma de tecidos moles em cães (STS)', 3),
  p('Aqui a biópsia pré-operatória tem enorme valor porque o diagnóstico e principalmente o grau histológico ajudam a definir a estratégia cirúrgica. O consenso ABROVET 2026 recomenda biópsia antes de tratar especialmente massas grandes ou potencialmente irressecáveis. Entretanto, salienta que 12–29% das biópsias pré-operatórias podem apresentar grau diferente daquele observado na peça completa. Por isso, a massa inteira deve novamente ser enviada para histopatologia após a cirurgia definitiva.'),
  h('Sarcoma felino associado ao local de injeção (FISS) 🐈', 3),
  p('Este é um cenário no qual “tirar a bolinha e mandar para biópsia” causa uma tragédia oncológica. Esses sarcomas são caracteristicamente **infiltrativos, localmente agressivos e associados a altíssima taxa de recidiva após cirurgia inadequada**. O BSAVA destaca esse comportamento e a necessidade de planejamento oncológico radical prévio.'),
  box('warning', 'Sequência obrigatória diante de suspeita de FISS', 'Se a lesão for suspeita para sarcoma de aplicação (regra 3-2-1), a sequência mandatória deve ser: **diagnóstico tecidual prévio (core ou incisional planejada) → estadiamento / TC local → planejamento cirúrgico radical com margens amplas (3 a 5 cm e 2 planos fasciais) incorporando o trajeto**. Jamais faça enucleação marginal (“shell out”) para esperar o laudo.'),

  h('11. Relato de caso demonstrativo: Ressecção vertebral com trajeto em bloco'),
  p('Um relato contemporâneo publicado por **Ho, Lim & Thompson (2026)** descreveu um cão com condrossarcoma vertebral extradural de alto grau. Inicialmente, foi realizada uma pequena biópsia incisional diagnóstica pela abordagem dorsolateral. Quando o paciente foi submetido à cirurgia definitiva, os cirurgiões executaram a ressecção vertebral incorporando todo o trajeto cirúrgico anterior em bloco, exatamente como determinam os princípios de oncologia cirúrgica (Frontiers in Veterinary Science, CC BY, DOI: 10.3389/fvets.2026.1767307).')
];


// ============================================================================
// ABA 3: PASSO A PASSO
// ============================================================================
const tabPassoAPasso: ClinicalQuickGuideBlock[] = [
  h('12. Materiais e montagem da bancada cirúrgica'),
  p('Para uma massa cutânea/subcutânea convencional, organize os materiais antes de induzir a anestesia:'),
  table('Checklist completo de materiais cirúrgicos e laboratoriais', ['Finalidade', 'Materiais necessários', 'Verificação crítica'], [
    ['Campo cirúrgico', 'Aparelho de tricotomia cirúrgica, clorexidina degermante e alcoólica, campos estéreis e luvas cirúrgicas.', 'Tricotomia ampla para enxergar os limites anatômicos e permitir ampliação imediata em caso de sangramento.'],
    ['Incisão e coleta', 'Cabo de bisturi nº 3, lâminas nº 10 ou 15 novas, pinça anatômica delicada (Adson sem dente), tesoura de Metzenbaum fina.', 'Instrumentos cortantes de lâmina fria; eletrocautério não deve ser utilizado para recortar o fragmento diagnóstico.'],
    ['Hemostasia e sutura', 'Gazes estéreis, pinças hemostáticas mosquito/Halsted, bisturi elétrico (apenas para o leito), porta-agulha e fios de sutura apropriados.', 'Hemostasia rigorosa antes de fechar; fio absorvível no subcutâneo e inabsorvível na pele.'],
    ['Histopatologia', 'Frasco de boca larga, vedação hermética, pré-preenchido com formalina tamponada neutra a 10%.', 'Volume de formol correspondente a 10 vezes o volume do fragmento (1:10); boca larga para retirar o tecido endurecido.'],
    ['Citologia (imprint)', 'Lâminas de vidro limpas, lápis de grafite para identificação, porta-lâminas seco separado.', 'Lâminas mantidas totalmente afastadas e transportadas separadamente dos vapores de formol.'],
    ['Microbiologia / PCR', 'Frasco estéril sem formalina ou meio de transporte indicado pelo laboratório.', 'Separar fragmento a fresco com assepsia antes de qualquer contato com fixador.'],
    ['Documentação anatômica', 'Régua milimetrada estéril, câmera/celular para fotografia clínica e prontuário para desenho.', 'Registrar referências anatômicas, profundidade e orientação do trajeto cirúrgico.']
  ]),

  h('13. Sedação, anestesia e analgesia multimodal'),
  p('A necessidade de anestesia geral ou sedação depende muito mais da localização e profundidade da lesão do que da espécie do paciente.'),
  table('Estratégia anestésica conforme a apresentação clínica', ['Cenário clínico', 'Abordagem anestésica', 'Justificativa e cuidados'], [
    ['Massas superficiais em paciente cooperativo', 'Sedação balanceada + Anestesia local infiltrativa perilesional + Analgesia preventiva.', 'Imobilidade; infiltração no tecido sadio periférico ao trajeto sem perfurações intratumorais.'],
    ['Massas profundas, intramusculares ou extremidades sensíveis', 'Anestesia geral balanceada com monitorização multiparamétrica.', 'Permite dissecção profunda controlada, bloqueio de reflexos álgicos e hemostasia segura sob visualização direta.'],
    ['Cavidade oral, face e região periocular', 'Anestesia geral inalatória obrigatória com intubação orotraqueal e proteção de via aérea.', 'Proteção indispensável contra aspiração de sangue/saliva; inspeção minuciosa e hemostasia sem pressa.']
  ]),
  box('warning', 'Sedação não é analgesia!', '==Muitos tumores possuem relativamente pouca inervação própria, mas pele, tecido subcutâneo, fáscias e músculos atravessados são ricamente inervados, extremamente dolorosos e precisam ser adequadamente anestesiados (Withrow).== Calcule as doses de anestésico local conforme espécie e peso.'),

  h('14. Passo 1 — Documentar a massa antes de interferir nela 🩺'),
  steps('Registro pré-procedimento no prontuário', [
    '**Localização anatômica exata:** registre referências ósseas e musculares anatômicas precisas.',
    '**Mensuração tridimensional:** comprimento × largura × altura (profundidade) em centímetros ou milímetros.',
    '**Consistência e fixação:** registre consistência (firme, flutuante, elástica) e mobilidade em relação à pele e aos planos profundos.',
    '**Aspecto da superfície:** anote presença de alopecia, ulcerações, crostas ou fístulas.',
    '**Fotografia técnica com escala:** fotografe a lesão com uma régua milimetrada posicionada paralelamente ao tumor. Isso será extremamente útil para a cirurgia definitiva e para o patologista.'
  ]),
  box('tip', 'Ponto de checagem mental obrigatório', 'Antes de encostar o bisturi, certifique-se: *“Eu sei exatamente por onde estou entrando, qual tecido vou colher e como este trajeto será extirpado em bloco na cirurgia definitiva”*. Se houver dúvida, reavalie a linha cirúrgica.'),

  h('15. Passo 2 — Preparo do campo e anestesia local perilesional'),
  steps('Assepsia e infiltração inteligente', [
    '**Tricotomia ampla:** faça tricotomia suficiente para enxergar claramente a anatomia e permitir eventual ampliação cirúrgica caso haja sangramento inesperado.',
    '**Preparo cirúrgico asséptico:** aplique degermante e antisséptico cirúrgico (clorexidina) com colocação de panos de campo estéreis. Em tumores ulcerados, não tente “esterilizar” agressivamente o interior da cratera lesional para não provocar hemorragia profusa; o objetivo é evitar introduzir contaminação nos tecidos profundos.',
    '**Anestesia local ao redor da via:** infiltre a pele e tecidos subcutâneos sadios periféricos à linha de incisão planejada. Evite múltiplas perfurações desnecessárias da massa tumoral com a agulha para não criar trajetos adicionais nem provocar hematomas intratumorais.'
  ]),

  h('16. Passo 3 — Incisão cutânea e exposição cirúrgica mínima'),
  steps('Acesso cirúrgico controlado', [
    'Faça uma **incisão linear, curta e diretamente sobre a rota mais curta e segura até a massa**, estritamente orientada de acordo com a futura cirurgia (eixo longitudinal em membros).',
    'Evite criar uma elipse grande na pele — você não está tentando retirar pele normal. O Withrow observa que, se a pele sobre a massa estiver normal e não aderida, não existe necessidade de retirar uma cunha de pele normal junto com o tumor.',
    '**Exponha a massa com o mínimo absoluto de dissecção:** não transforme uma biópsia em exploração cirúrgica. Quanto maior a dissecção, maior a superfície exposta, maior a possibilidade de contaminação e maior a área que potencialmente deverá entrar na futura cirurgia. Faça exposição apenas suficiente para identificar claramente tecido tumoral sólido.'
  ]),
  box('warning', 'Não faça dissecção circunferencial!', 'Não contorne a massa nem disseque seus polos laterais ou planos profundos. A visualização deve se restringir à janela estritamente necessária para a retirada da cunha.'),

  h('17. Passo 4 — Retirada da cunha com bisturi frio'),
  p('Com lâmina fria de bisturi (nº 10 ou 15), retire uma **cunha suficientemente profunda e volumosa para preservar a arquitetura tecidual**. Uma amostra muito superficial pode ser pior do que nenhuma amostragem.'),
  figure('cunha.svg', 'Corte convergente em cunha no tecido tumoral viável.', 'Figura 3 — Forma conceitual da cunha diagnóstica. Os planos de incisão convergem em “V” no interior de tecido tumoral viável e a base é liberada sob visão direta. Você deseja obter epitélio/tecido superficial quando relevante + tecido tumoral sólido viável em profundidade, e não apenas crosta ou debris inflamatórios superficiais. Esquema baseado em Withrow & MacEwen (Cap. 9).'),
  steps('Técnica de corte convergente sob visão direta', [
    '**Selecione parênquima sólido viável:** se a massa tiver crosta ou úlcera superficial, alcance a porção sólida profunda.',
    '**Primeiro plano de corte com bisturi:** realize incisão linear firme e profunda na massa.',
    '**Segundo plano de corte convergente:** incise em ângulo inclinado convergindo em direção ao fundo do primeiro corte, delimitando a cunha tecidual.',
    '**Liberação da base sob visão direta:** sustente delicadamente a borda da cunha com pinça anatômica e seccione a base com lâmina fria ou tesoura fina. Não arranque o fragmento por tração mecânica.',
    '**Inspeção macroscópica imediata:** certifique-se de que obteve tecido tumoral sólido viável, e não apenas gordura subcutânea ou coágulos amorfos.'
  ]),

  h('18. Passo 5 — O tecido normal deve entrar na amostra? (Nuance moderna)'),
  p('Aqui existe uma nuance importante entre textos cirúrgicos mais antigos e os princípios oncológicos modernos. Alguns manuais historicamente recomendaram incluir a interface normal–tumor para ajudar o patologista, e o próprio BSAVA menciona a interface como área útil em algumas circunstâncias.'),
  box('tip', 'Recomendação cautelosa do Withrow & MacEwen para neoplasias', '==Em suspeita de neoplasia, NÃO amplie deliberadamente a incisão para dentro de tecido previamente normal apenas para obter a interface.== Isso pode contaminar tecidos e planos fasciais sadios que precisariam permanecer intactos para a futura cirurgia curativa. Em vez disso, priorize tumor viável e representativo sem contaminar margens sadias que não precisariam ser removidas.'),

  h('19. Passo 6 — Nunca esmague o fragmento (Manipulação delicada)'),
  p('Um erro extremamente comum e destrutivo é segurar o centro da pequena amostra com uma pinça cirúrgica traumática (com dente ou hemostática). Isso causa: **pressão excessiva → ruptura celular → distorção nuclear → perda da arquitetura tecidual → artefato de esmagamento (*crush artifact*) → menor acurácia histológica ou laudo inconclusivo**.'),
  table('Manobra a evitar vs Impacto na amostra vs Conduta correta', ['Manobra inadequada', 'Efeito prejudicial na amostra', 'Conduta correta recomendada'], [
    ['Pinçar o centro da cunha com força', 'Esmagamento e perda completa dos detalhes celulares e nucleares.', 'Manipule preferencialmente a borda periférica com pinça anatômica delicada e mínima pressão.'],
    ['Tracionar a amostra com a base presa', 'Rasgamento tecidual e desorientação arquitetural.', 'Libere a base sob visualização direta com lâmina fria antes de transferir a amostra.'],
    ['Cortar a cunha diagnóstica com bisturi elétrico', 'Artefato térmico severo, coagulação de proteínas e carbonização tecidual.', 'Use bisturi de lâmina fria metálica; o eletrocautério fica reservado exclusivamente para hemostasia posterior.']
  ]),

  h('20. Passo 7 — Eletrocautério: ótimo para hemostasia, ruim para a amostra'),
  box('warning', 'Não corte o fragmento com bisturi elétrico', '==Não use eletrocautério para cortar o fragmento diagnóstico se puder evitá-lo.== O calor produz coagulação proteica maciça, distorção nuclear grave, carbonização e perda da relação arquitetural. O BSAVA e o Withrow recomendam a obtenção da amostra com bisturi/instrumento frio e o uso do cautério estritamente depois, para hemostasia do leito cruento.'),

  h('21. Passo 8 — Controle rigoroso de hemorragia e fechamento'),
  steps('Hemostasia e sutura segura', [
    '**Controle rigoroso da hemorragia após a retirada do fragmento:** utilize compressão local com gaze estéril, ligadura vascular ou cauterização seletiva pontual dos vasos sangrantes residuais.',
    '**Evite a formação de hematoma:** o sangramento residual distribui-se pelos planos teciduais e planos fasciais; as células tumorais potencialmente presentes podem acompanhar esse conteúdo hemático, expandindo a área contaminada e aumentando o campo de preocupação oncológica.',
    '**Fechamento por planos simples:** realize aproximação profunda simples se necessária, aproxime o subcutâneo e suture a pele sem tensão. Não amplie a dissecção apenas para obter um resultado estético mais refinado.',
    '**Evite drenos cirúrgicos:** idealmente, evite colocar drenos em uma biópsia oncológica. Se um dreno se tornar inevitável por sangramento profuso, seu trajeto e orifício de saída passam a representar outra região contaminada que deverá ser levada em consideração e ressecada na cirurgia definitiva.'
  ]),

  h('22. Passo 9 — Marque o trajeto cirúrgico no prontuário 📸'),
  steps('Documentação minuciosa obrigatória', [
    'Fotografe a ferida cirúrgica suturada com régua ou escala milimetrada ao lado.',
    'Desenhe um esquema anatômico no prontuário registrando a orientação exata (cranial/caudal, medial/lateral).',
    'Anote o tamanho da incisão em milímetros, a profundidade alcançada, o músculo ou compartimento acessado, o número de amostras colhidas e qualquer área de hematoma residual.',
    'Lembre-se: daqui a duas semanas, quando o tumor for retirado na cirurgia curativa, ninguém pode depender da memória sobre onde exatamente estava uma cicatriz de 8 mm.'
  ]),

  h('23. Particularidades críticas: Massas Orais e Melanoma Oral'),
  p('Massas na cavidade oral representam uma situação em que uma biópsia superficial frequentemente falha. O Nelson & Couto enfatiza que **tumores orais precisam de amostras generosas e profundas**, porque a superfície frequentemente apresenta necrose e inflamação causadas pelo trauma mastigatório e pela microbiota bucal.'),
  figure('massa-oral-wright-2023.webp', 'Massa oral em cão durante avaliação sob anestesia.', 'Figura 4 — Massa oral em cão durante avaliação sob anestesia geral. A visualização direta da lesão permite selecionar uma região profunda e representativa para biópsia e planejar um acesso intraoral que possa ser incorporado à futura ressecção oncológica. Wright et al., 2023, Frontiers in Veterinary Science (CC BY).'),
  steps('Recomendações técnicas para massas orais (Nelson & Couto / Polton et al., 2024)', [
    'Para uma massa oral canina, o livro recomenda **estadiamento por imagem tomográfica (TC) seguido de biópsia incisional relativamente profunda** sob anestesia geral e intubação traqueal protegida.',
    '**Melanoma oral:** o consenso de melanoma em cães e gatos recomenda amostra incisional/core grande e profunda, evitando tecido necrótico/ulcerado. Em melanoma oral, recomenda-se **biopsiar pela mucosa e não através da pele**, porque um trajeto externo pode comprometer a cirurgia curativa posterior.'
  ]),
  box('warning', 'Regra de ouro para lesões orais', '==Tumor oral → entre pela boca, NUNCA atravesse a pele da face para alcançá-lo.== Um acesso transcutâneo externo cria um trajeto contaminado que condena o paciente a uma ressecção facial desnecessariamente mutilante.')
];


// ============================================================================
// ABA 4: AMOSTRA E HISTOPATOLOGIA
// ============================================================================
const tabAmostra: ClinicalQuickGuideBlock[] = [
  h('24. Como escolher o ponto da amostra: fragmento representativo 🎯'),
  p('O fragmento precisa ser verdadeiramente representativo do processo de base da neoplasia.'),
  table('O que evitar e o que buscar na seleção do ponto de amostragem', ['Zona macroscópica', 'Risco diagnóstico', 'Conduta correta recomendada'], [
    ['Centro liquefeito ou necrose amorfa grosseira', 'Ausência de células viáveis; laudo descritivo inconclusivo de debris celulares.', 'Evite o miolo liquefeito; busque a porção periférica sólida e viável.'],
    ['Crostas e ulcerações superficiais', 'Diagnóstico restrito a “necrose, inflamação piogranulomatosa e tecido de granulação”.', 'Aprofunde o corte abaixo da úlcera para atingir o parênquima tumoral verdadeiro.'],
    ['Região intensamente hemorrágica sem tecido sólido', 'Diluição sanguínea e lise celular maciça.', 'Palpe e selecione áreas carnosas firmes com tecido sólido.'],
    ['Pseudocápsula fibrosa isolada', 'Falso-negativo de fibrose reativa enquanto o sarcoma agressivo segue oculto.', 'Assegure-se de que o plano de corte ultrapassou a capa fibrosa e amostrou o tumor.'],
    ['Parênquima tumoral sólido profundo e viável', 'Excelente preservação celular e arquitetura histológica preservada.', 'Padrão-ouro da biópsia incisional em cunha.']
  ]),
  box('info', 'A nuance da necrose nos sarcomas', 'A necrose é também componente formal de sistemas de graduação histológica tumoral. Portanto: não queremos uma amostra composta unicamente por necrose amorfa, mas também não devemos ignorar toda a heterogeneidade. Em sarcomas de tecidos moles, uma estratégia excelente é colher mais de uma região viável através do mesmo trajeto cirúrgico de acesso.'),

  h('25. Heterogeneidade tumoral: lições do estudo prospectivo Ferraris et al. 2026'),
  p('Ferraris et al. (2026) avaliaram prospectivamente 32 cães com sarcoma cutâneo/subcutâneo no *The Veterinary Journal*. Após a remoção cirúrgica, três *punch biopsies* foram retiradas da massa — uma central e duas periféricas — e comparadas com a graduação histológica da peça completa definitiva.'),
  figure('concordancia.svg', 'Concordância e subgraduação de biópsias únicas em sarcoma de tecidos moles canino.', 'Figura 5 — Dados do estudo prospectivo de Ferraris et al. (2026) em 32 cães com sarcoma. A concordância entre uma única amostra e o grau definitivo foi de 71% para amostra central e 59% para periférica. A graduação foi subestimada em 29% das centrais e 40,5% das periféricas. O uso de pelo menos duas regiões aumentou a probabilidade de predizer corretamente o grau definitivo. Limitação: punções realizadas após a excisão da massa.'),
  box('tip', 'Como interpretar corretamente esse estudo no plantão', 'Isso não significa biopsiar o centro necrótico. Significa: **o tumor é heterogêneo → uma única pequena região pode não representar o hotspot mitótico/diferenciação/necrose da massa inteira → colher mais de uma região viável aumenta a representatividade**.\n\nAlém disso, o consenso ABROVET 2026 reforça que **12% a 29% das biópsias pré-operatórias apresentam grau diferente da peça completa**. Por isso, mesmo com biópsia prévia, **a massa inteira removida deve ser enviada para histopatologia definitiva**.'),

  h('26. Imprint citológico antes da formalina: técnica e cuidados'),
  p('Uma prática de imenso valor clínico imediato:'),
  steps('Passo a passo do imprint de fragmento cirúrgico (BSAVA Oncology)', [
    'Assim que a cunha for retirada, seque delicadamente o excesso de sangue superficial tocando uma gaze estéril seca na face de corte.',
    'Encoste a superfície de corte recém-fatiada suavemente sobre uma lâmina de vidro limpa em vários pontos.',
    'Deixe as lâminas secarem completamente ao ar à temperatura ambiente.',
    'Envie para citologia junto com a requisição de histopatologia para conferência rápida de linhagem celular e correlação cito-histológica.',
    'Mergulhe o fragmento tecidual imediatamente no frasco de formalina 10%.'
  ]),
  box('warning', 'ALERTA MÁXIMO: Formalina destrói a citologia!', '==NUNCA envie as lâminas citológicas na mesma embalagem, caixa ou envelope contendo o frasco de formalina.== Os vapores de formalina deterioram intensamente a coloração e morfologia citológica, impedindo a visualização microscópica adequada.'),

  h('27. Fixação tecidual em formalina tamponada neutra a 10%'),
  p('Para a histopatologia convencional de rotina, o fixador correto é a **formalina tamponada neutra a 10%** (que corresponde a formaldeído a 4% tamponado com fosfatos a pH 7,0–7,2).'),
  figure('destinos.svg', 'Divisão e acondicionamento correto das amostras para histopatologia, citologia e microbiologia.', 'Figura 6 — Destinos separados da amostra planejados antes da coleta: histopatologia em frasco de boca larga com formalina 1:10; lâminas de imprint citológico secas ao ar e embaladas isoladamente; e tecido fresco em recipiente estéril sem formol se houver indicação de cultura ou PCR.'),
  steps('Regras de ouro da fixação tecidual (Withrow & MacEwen / Kamstock et al.)', [
    '**Proporção volumétrica 1:10:** aproximadamente 1 parte de tecido para 10 partes de solução de formalina. O formol precisa penetrar e fixar quimicamente as proteínas.',
    '**Espessura máxima de 1 cm:** a formalina penetra no tecido a cerca de 1 mm por hora. Fragmentos espessos demais fixam por fora, enquanto o centro sofre autólise e putrefação. O Withrow recomenda que o tecido não permaneça com mais de aproximadamente 1 cm de espessura.',
    '**Frasco de boca larga:** utilize recipientes com abertura ampla. O tecido enrijece após a fixação e não poderá ser retirado de frascos estreitos sem ser danificado.'
  ]),
  box('warning', 'O que NUNCA fazer com a amostra histológica', '• **NUNCA deixe o fragmento secar** exposto ao ar sobre a mesa cirúrgica.\n• **NUNCA esmague** o tecido com pinças ou na tampa do frasco.\n• **NUNCA coloque o fragmento em água destilada ou soro** (induz lise osmótica e autólise acelerada).\n• **NUNCA congele** uma amostra destinada à histopatologia de rotina (a formação de cristais de gelo rompe as células e inutiliza a leitura histológica).\n• **NUNCA misture** fragmentos de locais diferentes no mesmo frasco sem identificação separada.'),

  h('28. Suspeita de doença infecciosa associada (Fungos profundos e bactérias)'),
  box('info', 'Divida corretamente as amostras antes da formalina', 'Se entre os diferenciais da massa existir suspeita de **micobacteriose, fungo profundo (esporotricose, criptococose, histoplasmose), infecção bacteriana crônica ou granuloma infeccioso**, divida as amostras cirúrgicas:\n\n• **Histopatologia:** → formalina tamponada a 10%.\n• **Cultura microbiológica ou PCR que necessite material fresco:** → recipiente estéril ou meio de transporte indicado pelo laboratório, **RIGOROSAMENTE SEM FORMALINA**.\n\nIdealmente, consulte o laboratório microbiológico antes de coletar uma lesão com suspeita infecciosa incomum.'),

  h('29. O formulário enviado ao patologista faz parte da biópsia'),
  p('Um patologista não está examinando “uma massa”; ele está examinando secções microscópicas de alguns milímetros daquela massa. O consenso **ACVP de Kamstock et al. (2011)** foi elaborado justamente para padronizar coleta, orientação, processamento e comunicação de amostras tumorais.'),
  table('Dados indispensáveis no formulário de encaminhamento oncológico', ['Categoria', 'Informações obrigatórias'], [
    ['Identificação do paciente', 'Espécie, raça, idade exata, sexo e estado reprodutivo.'],
    ['Topografia e exame físico', 'Localização anatômica precisa, tempo de evolução, velocidade de crescimento, tamanho tridimensional, consistência, mobilidade/fixação e ulceração.'],
    ['Histórico clínico e oncológico', 'Recorrência/recidiva prévia, tratamentos anteriores, cirurgias no local, quimioterapia prévia.'],
    ['Exames complementares', 'Relatório e impressões de citologia prévia, achados de TC / RM / ultrassonografia / radiografias e principais diagnósticos diferenciais suspeitos.'],
    ['Tipo de procedimento', '**Biópsia incisional em cunha** (especificar que a lesão permaneceu no paciente; não avaliar margens).'],
    ['Documentação visual', 'Fotografia clínica com escala milimetrada e esquema anatômico indicando qual região foi amostrada.']
  ]),
  box('tip', 'Impacto prático do consenso ACVP', 'Uma biópsia tecnicamente perfeita pode perder totalmente seu valor diagnóstico se for encaminhada ao laboratório sem orientação anatômica, sem histórico clínico detalhado ou com fixação inadequada.'),

  h('30. Da sala cirúrgica ao patologista: como as margens são avaliadas'),
  figure('margens-vincenti-2025.webp', 'Processamento histopatológico de uma peça tumoral pelos métodos transversal e tangencial.', 'Figura 7 — Processamento histopatológico de uma peça tumoral pelos métodos transversal (radial) e tangencial (en face). A orientação correta da amostra e a comunicação entre cirurgião e patologista determinam quais regiões do tumor e das margens serão efetivamente examinadas microscopicamente. Licença CC BY. Fonte: Vincenti et al., 2025, Frontiers in Veterinary Science (DOI: 10.3389/fvets.2025.1629994).'),
  p('O estudo de **Vincenti et al. (2025)** demonstrou com clareza o impacto metodológico do processamento laboratorial: em 20 tumores de cães e gatos, o método transversal detectou margem infiltrada em 1/20 casos, enquanto o método tangencial detectou infiltração em 11/20 casos. Isso ilustra o quanto a orientação das amostras e a comunicação cirurgião–patologista determinam a acurácia do laudo.'),

  h('31. O que esperar do laudo histopatológico e seus limites'),
  table('Alcance da biópsia incisional e limitações metodológicas', ['Pergunta clínica', 'O que a biópsia incisional pode fornecer', 'Limitação inerente ao método'], [
    ['Existe neoplasia?', 'Confirmação diagnóstica de neoplasia vs hiperplasia vs inflamação.', 'Amostra superficial pode colher apenas reação inflamatória.'],
    ['Qual a linhagem celular?', 'Origem epitelial, mesenquimal, hematopoiética, melanocítica.', 'Tumores anaplásicos indiferenciados podem exigir imuno-histoquímica.'],
    ['Qual o subtipo e graduação?', 'Subtipo tumoral, contagem mitótica, necrose, índice de diferenciação e grau histológico.', 'Pode subestimar o grau histológico definitivo da massa inteira.'],
    ['Há invasão vascular ou linfática?', 'Avaliação de êmbolos neoplásicos intravasculares no fragmento colhido.', 'Ausência no fragmento não descarta invasão em outras partes do tumor.'],
    ['As margens cirúrgicas estão livres?', '**NÃO AVALIA MARGEM CIRÚRGICA DEFINITIVA.**', '**Por definição, a massa tumoral permaneceu no paciente.**'],
    ['Qual a sensibilidade e especificidade?', 'Não existe um percentual universal (ex.: “95% de sensibilidade”).', 'A acurácia depende do tipo tumoral, heterogeneidade, tamanho da amostra, ausência de artefatos e experiência do patologista.']
  ]),

  h('32. Discordância entre patologistas e conduta diante de laudo discordante'),
  p('Um ponto excelente para memorizar: “Histopatologia” não significa infalibilidade absoluta. O Withrow cita um estudo de segunda opinião histopatológica em oncologia veterinária que revelou: **70% de concordância completa, 20% de concordância parcial e 10% de discordância diagnóstica completa**, com divergências que envolveram inclusive a distinção entre lesão maligna versus benigna.'),
  box('tip', 'Regra de ouro de conduta clínica', '==Se o laudo diz “lesão benigna discreta / dermatite”, mas você tem uma massa de 12 cm, invasiva, destrutiva e em crescimento rápido: NÃO adapte o paciente ao laudo. Questione a amostra e o laudo!==\n\nConverse com o médico patologista, solicite recortes adicionais do bloco de parafina, colorações especiais, painel de imuno-histoquímica, envie para segunda opinião ou repita a biópsia incisional representativa profunda antes de qualquer intervenção irreversível.')
];


// ============================================================================
// ABA 5: ERROS E COMPLICAÇÕES
// ============================================================================
const tabErros: ClinicalQuickGuideBlock[] = [
  h('33. Os 10 erros que mais prejudicam o paciente oncológico 🚨'),
  list([
    '❌ **1. Fazer uma incisão transversal em um membro:** amplia brutalmente a futura área de excisão definitiva e impede o fechamento primário, forçando defeitos imensos ou amputação.',
    '❌ **2. Biopsiar “onde é mais fácil”:** o melhor local para biopsiar é aquele que será rigorosamente removido junto com o tumor na cirurgia definitiva.',
    '❌ **3. Atravessar dois compartimentos musculares para acessar o tumor de um deles:** você potencialmente transforma um compartimento acometido em dois planos contaminados.',
    '❌ **4. Coletar apenas a superfície ulcerada ou crostosa:** resultado provável de “inflamação piogranulomatosa crônica, necrose e tecido de granulação”, permanecendo sem diagnóstico.',
    '❌ **5. Retirar apenas a pseudocápsula fibrosa:** pseudocápsula não é tumor representativo; fornecerá falso laudo de fibrose reativa.',
    '❌ **6. Usar eletrocautério para colher o fragmento diagnóstico:** o calor queima o tecido e destrói a arquitetura e detalhes nucleares.',
    '❌ **7. Apertar e esmagar a amostra com pinça cirúrgica:** causa artefato mecânico irreversível de esmagamento (*crush artifact*).',
    '❌ **8. Criar vários trajetos para colher várias áreas:** quando possível, múltiplas amostras viáveis devem ser colhidas pelo mesmo trajeto planejado.',
    '❌ **9. Não controlar a hemostasia e permitir hematoma:** o hematoma disseca planos fasciais e expande o campo de contaminação oncológica.',
    '❌ **10. Não documentar minuciosamente onde biopsiou:** daqui a duas semanas, ninguém saberá onde estava uma cicatriz de 8 mm que precisa ser extirpada.'
  ]),

  h('34. Tabela completa de complicações cirúrgicas: mecanismo e prevenção'),
  table('Complicações da biópsia incisional em pequenos animais', ['Complicação', 'Mecanismo biológico primário', 'Prevenção cirúrgica e conduta'], [
    ['Hemorragia ativa', 'Ruptura vascular tumoral ou vasos calibrosos neoformados.', 'Planejar local de acesso, dissecar sob visualização direta e hemostasia cuidadosa por compressão ou ligadura.'],
    ['Hematoma pós-operatório', 'Sangramento residual no leito da cunha após fechamento cutâneo.', 'Hemostasia rigorosa antes de fechar a pele; curativo compressivo moderado nas primeiras 24 horas.'],
    ['Seroma', 'Espaço morto residual excessivo gerado por dissecção lateral exagerada.', 'Biópsia pequena, direta e sem descolamentos periféricos extensos.'],
    ['Deiscência de sutura', 'Tensão na ferida, infecção bacteriana ou tecido neoplásico infiltrado.', 'Fechamento atraumático sem tensão; aproximar planos com fios absorvíveis monofilamentares.'],
    ['Infecção cirúrgica', 'Contaminação externa ou flora secundária de superfície ulcerada.', 'Técnica cirúrgica estritamente asséptica e antissepsia cuidadosa.'],
    ['Dor pós-operatória', 'Lesão de pele, subcutâneo, fáscia muscular ou periósteo.', 'Analgesia multimodal preventiva com AINEs e opioides.'],
    ['Amostra não diagnóstica', 'Necrose amorfa pura, superficialidade excessiva ou erro de alvo.', 'Cunha sólida, profunda e volumosa de tecido viável sob visão direta.'],
    ['Subgraduação histopatológica', 'Heterogeneidade tumoral (zonas de baixo grau adjacentes a áreas atípicas).', 'Colher mais de uma área viável pelo mesmo trajeto; exame histopatológico mandatório da peça final.'],
    ['Artefato histopatológico', 'Pinça traumática no centro, cautério na amostra ou dessecação.', 'Manipulação delicada pela periferia, bisturi frio e fixação imediata em formalina.'],
    ['Contaminação do trajeto', 'Manipulação do tumor e deslocamento mecânico de células neoplásicas.', 'Trajeto curto, linear e planejado para ser ressecado em bloco.'],
    ['Comprometimento da futura cirurgia', 'Incisão mal posicionada, transversal em membros ou fora do campo ressecável.', 'Planejar a cirurgia definitiva curativa antes de encostar o bisturi para a biópsia.']
  ]),

  h('35. Pós-operatório imediato e seguimento oncológico'),
  list([
    '**Recuperação anestésica e monitorização imediata:** monitore sangramentos na ferida cirúrgica, aumento súbito de volume local, dor e retorno da consciência. Em procedimentos na cavidade oral, inspecione a via aérea e monitore a deglutição.',
    '**Proteção mecânica da ferida:** utilize colar elizabetano ou roupa cirúrgica de proteção para impedir lambedura e traumatismo da ferida cirúrgica.',
    '**Sinais de alerta para retorno antecipado:** instrua expressamente o tutor a retornar caso note sangramento persistente, aumento rápido de volume (hematoma expansivo), secreção na incisão, abertura de pontos ou dor progressiva.',
    '**Rastreamento do laudo laboratorial:** acompanhe ativamente a emissão do laudo histopatológico junto ao laboratório com base na data prevista informada ao tutor.',
    '**Planejamento cirúrgico definitivo:** assim que o laudo histopatológico for liberado e validado clinicamente, planeje a cirurgia definitiva curativa, garantindo que o **tumor e todo o trajeto cirúrgico prévio sejam extirpados em bloco**.'
  ]),

  h('36. Checklist de bolso interativo ✅ (Antes, Durante e Depois)'),
  h('Antes do procedimento', 3),
  list([
    'Medir as três dimensões da massa (comprimento × largura × altura) e registrar consistência e mobilidade.',
    'Fotografar a lesão em vistas padronizadas com régua milimetrada paralela ao tumor.',
    'Revisar exames de citologia (PAAF) prévios e correlacionar com a clínica.',
    'Decidir se Tomografia Computadorizada ou Ressonância Magnética deve ser realizada antes da biópsia.',
    'Avaliar risco hemorrágico e hemostasia quando indicado (plaquetas, TP, TTPa).',
    'Mentalizar e desenhar a futura linha de ressecção definitiva em bloco.',
    'Marcar o trajeto da biópsia estritamente dentro do futuro campo cirúrgico (longitudinal em membros).',
    'Garantir que o trajeto não atravessará septos musculares, articulações ou feixes nervosos sadios.'
  ], true),
  h('Durante o procedimento', 3),
  list([
    'Aplicar técnica asséptica rigorosa com panos de campo estéreis.',
    'Infiltrar anestésico local ao redor do acesso (perilesional), evitando múltiplas perfurações na massa.',
    'Fazer incisão linear curta, sem retirar fuso de pele normal se ela for sadia.',
    'Expor o tumor com o mínimo absoluto de dissecção, sem criar descolamentos laterais.',
    'Obter cunha em “V” volumosa e profunda de tecido sólido viável sob visão direta com bisturi frio.',
    'Evitar colher unicamente crostas superficiais, áreas liquefeitas ou pseudocápsula fibrosa.',
    'Considerar a coleta de mais de uma região viável pelo mesmo trajeto se a massa for heterogênea.',
    'Manipular exclusivamente a borda periférica com pinça delicada; NUNCA esmagar o centro da amostra.',
    'Utilizar bisturi de lâmina fria para o corte diagnóstico; nunca usar eletrocautério na amostra.',
    'Realizar imprint citológico delicado da face de corte em lâmina limpa antes da fixação.',
    'Garantir hemostasia rigorosa do leito cirúrgico antes do fechamento para evitar hematoma.',
    'Aproximar os planos com sutura simples e sem tensão, evitando colocação de drenos.'
  ], true),
  h('Depois do procedimento', 3),
  list([
    'Fotografar a ferida suturada com escala ao lado e registrar referências anatômicas no prontuário.',
    'Imergir o fragmento imediatamente em formalina tamponada neutra a 10% na proporção de 1:10.',
    'Conferir que o fragmento não ultrapassa 1 cm de espessura para permitir fixação homogênea.',
    'Acondicionar as lâminas de imprint citológico em porta-lâminas seco SEPARADO dos vapores de formol.',
    'Se houver suspeita de infecção, acondicionar fração estéril sem formol em recipiente apropriado para cultura/PCR.',
    'Preencher requisição oncológica detalhada (ACVP) informando tratar-se de biópsia incisional sem margens.',
    'Fornecer analgesia pós-operatória adequada e instituir proteção mecânica da ferida cirúrgica.',
    'Correlacionar criticamente o laudo histopatológico emitido com a apresentação clínica do paciente.',
    'Programar a cirurgia definitiva oncológica incorporando o trajeto da biópsia incisional EM BLOCO.'
  ], true),

  h('37. O que precisa ser memorizado 🧠 (Os 8 pontos de ouro)'),
  box('tip', 'Os 8 mandamentos inegociáveis da biópsia incisional oncológica', '1. **A biópsia é parte da cirurgia definitiva:** não é um procedimento isolado, mas a primeira etapa do tratamento.\n\n2. **Todo o trajeto deve ser considerado potencialmente contaminado:** pele incisada, tecidos transpassados e leito manipulado contêm células neoplásicas.\n\n3. **O trajeto precisa caber dentro da futura ressecção:** em membros, incisão estritamente paralela ao eixo longitudinal.\n\n4. **Não atravesse compartimentos anatômicos sadios:** não transfixe músculos normais, articulações ou fáscias não acometidas.\n\n5. **Colete tecido tumoral viável, profundo e representativo:** evite crostas, necrose amorfa pura e pseudocápsula fibrosa.\n\n6. **Nunca esmague a amostra com pinças nem a corte com eletrocautério:** preserve a integridade celular com bisturi frio e manipulação delicada.\n\n7. **Tumores heterogêneos podem ser subgraduados na biópsia prévia:** a peça cirúrgica completa definitiva DEVE voltar para histopatologia.\n\n8. **Se o laudo histopatológico não condiz com a clínica do paciente, questione a amostra:** nunca tome decisões irreversíveis baseado em laudo discordante sem antes solicitar recortes, IHQ, segunda opinião ou nova biópsia.'),

  h('38. Mapa das fontes do projeto e evidências científicas'),
  p('O conteúdo deste guia técnico foi construído com base nas principais obras de referência e diretrizes de sociedades veterinárias mundiais e nacionais:'),
  table('Obras de referência técnica utilizadas no guia', ['Fonte consultada', 'Capítulo / Seção', 'Contribuição clínica incorporada'], [
    ['Withrow & MacEwen’s Small Animal Clinical Oncology (6ª ed., 2020)', 'Cap. 9 — Biopsy and Sentinel Lymph Node Mapping Principles (pp. 158–163)', 'Indicações, técnica em cunha, incorporação de trajeto, interface normal-tumor, fixação em formol 1:10 e discordância diagnóstica.'],
    ['BSAVA Manual of Canine and Feline Oncology (3ª ed., 2011)', 'Cap. 2 — How to make a diagnosis (pp. 10–13); Cap. 6 — Principles of oncological surgery (pp. 46–48); Cap. 14 — Soft tissue sarcomas (pp. 180–181); Cap. 15a — Oral tumours (p. 194)', 'Princípio dos compartimentos anatômicos, orientação longitudinal de incisão em membros, contraindicação de cautério na amostra e FISS em felinos.'],
    ['BSAVA Guide to Procedures in Small Animal Practice (3ª ed., 2024)', 'Skin biopsy – punch biopsy (pp. 255–256)', 'Manipulação atraumática de biópsias, cuidados de transporte e distinção explícita entre preparo de massa tumoral vs dermatose.'],
    ['Nelson & Couto: Small Animal Internal Medicine (6ª ed., 2020)', 'Cap. 29 — Disorders of the Oral Cavity (pp. 447–449); Cap. 26 — Manifestações orais (p. 390)', 'Indicação mandatória de biópsia incisional profunda em tumores orais e TC prévia para avaliação óssea.']
  ]),
  list([
    '**Kamstock DA et al. (2011)** — *Recommended guidelines for submission, trimming, margin evaluation, and reporting of tumor biopsy specimens in veterinary surgical pathology*. Vet Pathol. 48(1):19–31. Diretrizes de consenso do comitê de oncologia do ACVP para padronização de requisições, fixação e relatórios histopatológicos. [PubMed](https://pubmed.ncbi.nlm.nih.gov/21123864/) · [DOI](https://doi.org/10.1177/0300985810389316).',
    '**Fonseca-Alves CE et al. (2026)** — *Canine cutaneous and subcutaneous soft tissue sarcoma in dogs: a consensus report from the Brazilian Association of Veterinary Oncology (ABROVET)*. Front Vet Sci. 13:1750148. Consenso brasileiro contemporâneo que estabelece a biópsia incisional como método de escolha pré-operatório em massas grandes/complexas e ressalta a taxa de 12% a 29% de divergência de grau entre biópsia e peça final. [Artigo Open Access CC BY](https://doi.org/10.3389/fvets.2026.1750148).',
    '**Ferraris EI et al. (2026)** — *Multiple preoperative biopsies may increase histologic grade accuracy in canine soft tissue sarcoma: a prospective study*. Vet J. 316:106596. Estudo prospectivo em 32 cães com sarcoma demonstrando que punções únicas centrais e periféricas subestimam o grau histológico em 29% e 40,5% das massas, reforçando a indicação de múltiplas amostras viáveis. [PubMed](https://pubmed.ncbi.nlm.nih.gov/41692151/) · [DOI](https://doi.org/10.1016/j.tvjl.2026.106596).',
    '**Vincenti S et al. (2025)** — *Combined cross-sectional and tangential margin evaluation of different tumor types in dogs and cats*. Front Vet Sci. 12:1629994. Avaliação dos métodos transversal e tangencial de corte de margens em tumores de cães e gatos, evidenciando o impacto do processamento patológico. [Artigo Open Access CC BY](https://doi.org/10.3389/fvets.2025.1629994).',
    '**Polton G et al. (2024)** — *Melanoma of the dog and cat: consensus and guidelines*. Front Vet Sci. 11:1359426. Recomenda biópsia incisional/core profunda e generosa para melanoma oral, orientando acesso estritamente transmucoso para não comprometer a cirurgia definitiva. [Artigo Open Access CC BY](https://doi.org/10.3389/fvets.2024.1359426).',
    '**Wright AL, Peralta S, Fiani N. (2023)** — *Case report: Spontaneous mandibular body regeneration following unilateral subtotal mandibulectomy in a 3-month-old French bulldog*. Front Vet Sci. 10:1281232. Registro fotográfico intraoperatório de massa oral sob anestesia geral e planejamento de ressecção. [Artigo Open Access CC BY](https://doi.org/10.3389/fvets.2023.1281232).',
    '**Ho L, Lim WZ, Thompson JL. (2026)** — *Case Report: Surgical resection of high-grade extradural thoracic vertebral chondrosarcoma in a dog*. Front Vet Sci. 13:1767307. Demonstração clínica do princípio oncológico de ressecção em bloco incorporando o trajeto de biópsia incisional prévia. [Artigo Open Access CC BY](https://doi.org/10.3389/fvets.2026.1767307).'
  ]),
  box('info', 'Hierarquia e peso das evidências científicas', 'Os livros de referência (Withrow, BSAVA, Nelson & Couto) fundamentam a doutrina e os princípios cirúrgicos consagrados; os consensos (ABROVET, ACVP) harmonizam as recomendações de especialistas; ensaios prospectivos (Ferraris) quantificam desfechos numéricos em coortes específicas; e relatos de casos ilustram a aplicação tridimensional do trajeto ressecado.'),

  h('39. Bibliografia principal completa (Formato ABNT)'),
  list([
    'BEXFIELD, N.; RIGGS, J. (Eds.). **BSAVA Guide to Procedures in Small Animal Practice**. 3. ed. Gloucester: British Small Animal Veterinary Association, 2024. pp. 255–256.',
    'DOBSON, J. M.; LASCELLES, B. D. X. (Eds.). **BSAVA Manual of Canine and Feline Oncology**. 3. ed. Gloucester: British Small Animal Veterinary Association, 2011. pp. 10–13, 46–48, 180–181, 194.',
    'FERRARIS, E. I. et al. Multiple preoperative biopsies may increase histologic grade accuracy in canine soft tissue sarcoma: a prospective study. **The Veterinary Journal**, v. 316, p. 106596, 2026. DOI: 10.1016/j.tvjl.2026.106596.',
    'FONSECA-ALVES, C. E. et al. Canine cutaneous and subcutaneous soft tissue sarcoma in dogs: a consensus report from the Brazilian Association of Veterinary Oncology. **Frontiers in Veterinary Science**, v. 13, p. 1750148, 2026. DOI: 10.3389/fvets.2026.1750148.',
    'HO, L.; LIM, W. Z.; THOMPSON, J.-L. Case Report: Surgical resection of high-grade extradural thoracic vertebral chondrosarcoma in a dog. **Frontiers in Veterinary Science**, v. 13, p. 1767307, 2026. DOI: 10.3389/fvets.2026.1767307.',
    'KAMSTOCK, D. A. et al. Recommended guidelines for submission, trimming, margin evaluation, and reporting of tumor biopsy specimens in veterinary surgical pathology. **Veterinary Pathology**, v. 48, n. 1, p. 19–31, 2011. DOI: 10.1177/0300985810389316.',
    'NELSON, R. W.; COUTO, C. G. **Small Animal Internal Medicine**. 6. ed. St. Louis: Elsevier, 2020. pp. 390, 447–449.',
    'POLTON, G. et al. Melanoma of the dog and cat: consensus and guidelines. **Frontiers in Veterinary Science**, v. 11, p. 1359426, 2024. DOI: 10.3389/fvets.2024.1359426.',
    'VAIL, D. M.; THAMM, D. H.; LIPTAK, J. M. (Eds.). **Withrow & MacEwen’s Small Animal Clinical Oncology**. 6. ed. St. Louis: Elsevier, 2020. Cap. 9: Biopsy and Sentinel Lymph Node Mapping Principles, pp. 158–163.',
    'VINCENTI, S. et al. Combined cross-sectional and tangential margin evaluation of different tumor types in dogs and cats. **Frontiers in Veterinary Science**, v. 12, p. 1629994, 2025. DOI: 10.3389/fvets.2025.1629994.',
    'WRIGHT, A. L.; PERALTA, S.; FIANI, N. Case report: Spontaneous mandibular body regeneration following unilateral subtotal mandibulectomy in a 3-month-old French bulldog. **Frontiers in Veterinary Science**, v. 10, p. 1281232, 2023. DOI: 10.3389/fvets.2023.1281232.'
  ])
];


// Concatenação de todas as seções e cálculo dinâmico dos índices de início de cada aba
const sections: ClinicalQuickGuideBlock[] = [
  ...tabQuandoFazer,
  ...tabPlanejamento,
  ...tabPassoAPasso,
  ...tabAmostra,
  ...tabErros
];

const idxPlanejamento = tabQuandoFazer.length;
const idxPassoAPasso = tabQuandoFazer.length + tabPlanejamento.length;
const idxAmostra = tabQuandoFazer.length + tabPlanejamento.length + tabPassoAPasso.length;
const idxErros = tabQuandoFazer.length + tabPlanejamento.length + tabPassoAPasso.length + tabAmostra.length;

export const guiaBiopsiaIncisional: ClinicalQuickGuide = {
  id: 'cqg-biopsia-incisional-001',
  slug: 'biopsia-incisional-caes-gatos',
  title: 'Biópsia incisional em cães e gatos 🧬🔬',
  subtitle: 'Procedimentos Clínicos e Oncológicos — Biópsia em cunha, planejamento de trajeto, técnica cirúrgica e histopatologia',
  summary: 'Guia técnico completo: a biópsia incisional como etapa da cirurgia definitiva. Aprenda o planejamento oncológico do trajeto, a preservação dos compartimentos, a técnica em cunha com bisturi frio, conservação da amostra em formalina 10%, resolução de laudos discordantes e prevenção de complicações.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'biopsia', 'biópsia', 'biópsia incisional', 'cunha', 'wedge', 'oncologia',
    'histopatologia', 'sarcoma', 'tecidos moles', 'massa oral', 'melanoma',
    'FISS', 'sarcoma de aplicação', 'punch', 'tru-cut', 'PAAF', 'formol',
    'formalina', 'imprint', 'withrow', 'bsava', 'kamstock', 'abrovet'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/biopsia-incisional/capa.svg',
  heroImageAlt: 'Esquema de uma cunha de tecido tumoral e frasco para histopatologia.',
  richText: true,
  showTableOfContents: false,
  readingTabs: [
    { label: 'Quando fazer', startIndex: 0 },
    { label: 'Planejamento', startIndex: idxPlanejamento },
    { label: 'Passo a passo', startIndex: idxPassoAPasso },
    { label: 'Amostra e histopatologia', startIndex: idxAmostra },
    { label: 'Erros e complicações', startIndex: idxErros },
  ],
  quickBullets: [
    'A biópsia é parte da cirurgia definitiva: o trajeto e a incisão são potencialmente contaminados e devem ser incorporados à ressecção em bloco.',
    'Indique quando o diagnóstico ou o grau histológico modificarem a conduta, margem ou modalidade terapêutica (ex.: sarcoma de tecidos moles).',
    'Planeje a cirurgia definitiva antes de cortar: em membros, faça incisão estritamente longitudinal; nunca transversal.',
    'Respeite os compartimentos anatômicos: nunca atravesse fáscias, músculos ou articulações não envolvidos para atingir o tumor.',
    'Colete uma cunha representativa com instrumento frio (bisturi): evite crostas, necrose isolada ou pseudocápsula. Cautério apenas após a retirada.',
    'Nunca esmague o fragmento com pinças traumáticas: manipule delicadamente pela periferia para preservar a arquitetura tecidual.',
    'Amostra em formalina tamponada a 10% (1:10), espessura ≤ 1 cm. Se fizer imprint citológico, envie lâminas secas e separadas dos vapores de formol.',
    'A biópsia não avalia margens definitivas e pode subestimar o grau tumoral. Se a histopatologia conflitar com o quadro clínico, questione a amostra!'
  ],
  sections,
  isPublished: true
};
