import { MedicationRecord } from '../../types/medication';

export const domperidonaMedicationRecord: MedicationRecord = {
  id: 'med-domperidona',
  slug: 'domperidona',
  title: 'Domperidona',
  activeIngredient: 'Domperidona base (R-33812)',
  isControlled: false,
  tradeNames: [
    'Leisguard® 5 mg/mL Suspensão Oral Frasco 60 mL e 105 mL (Ecuphar / Esteve — Referência Veterinária Internacional na Europa)',
    'Domperix® 1 mg/mL Suspensão Oral Frasco 100 mL com Seringa Dosadora (Eurofarma — Uso Humano no Brasil)',
    'Domperidona Genérica 1 mg/mL Suspensão Oral Frascos 100 mL (EMS, Medley, Eurofarma, Neo Química)',
    'Motilium® 10 mg Comprimidos e 1 mg/mL Suspensão Oral (Janssen-Cilag / Johnson & Johnson)',
    'Domperidona 10 mg Comprimidos Revestidos (Eurofarma, EMS, Medley, Althaia)',
    'Domperidona Solução Oral Manipulada Veterinária 1 mg/mL ou 5 mg/mL sob medida',
  ],
  officialSiteUrl: 'https://www.esteve.com',
  leafletUrl: 'https://cimavet.aemps.es',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/domperidone/PNG',
  priceReference: {
    amountBrl: 22.0,
    label:
      'Suspensão Oral 1 mg/mL (100 mL genérico humano): R$ 18,00 a R$ 26,00 | Comprimidos 10 mg (cx 30 comp): R$ 16,00 a R$ 24,00 | Leisguard® 5 mg/mL (60 mL Europa): ~R$ 380,00 sob importação',
    presentation: 'Domperix® / Genérico 1 mg/mL suspensão oral 100 mL (Uso Humano no Brasil)',
    sourceName: 'Farmácias Comerciais Brasileiras / Consulta Medicamentos',
    sourceUrl: 'https://consultaremedios.com.br/domperidona/bula',
    checkedAt: '2026-09-30',
    notes:
      'Medicamento não sujeito a controle especial pela Portaria SVS/MS nº 344/98 e nem pelo MAPA no Brasil. Prescrição via Receituário Simples Veterinário em 1 via. No Brasil, não há produto veterinário comercial com registro vigente no MAPA, sendo o uso em cães e gatos realizado sob regime extrabula (extra-label) com apresentações humanas ou magistrais.',
  },
  pharmacologicClass:
    'Antagonista periférico dos receptores dopaminérgicos D2 e D3; antiemético de ação na CRTZ; estimulante de motilidade gastrintestinal superior (pró-cinético); galactagogo / hiperprolactinêmico; imunomodulador celular indireto pró-Th1',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'Domperidona',
    'Domperidone',
    'Leisguard',
    'Domperix',
    'Motilium',
    'Antagonista D2',
    'Dopamina',
    'CRTZ',
    'Antiemético',
    'Pró-cinético',
    'Leishmaniose',
    'Leishmaniose Canina',
    'LVC',
    'Prevenção Leishmaniose',
    'Imunomodulador',
    'Prolactina',
    'Th1',
    'hERG',
    'QTc Prolongado',
    'WAVD 2025',
    'CLWG 2026',
    'Esvaziamento Gástrico',
    'Receituário Simples',
  ],

  plainLanguageSummary:
    'A domperidona é um medicamento que bloqueia a ação da dopamina em locais específicos do corpo situados fora da barreira que protege o cérebro. Por não penetrar no cérebro de cães saudáveis, ela não causa a sonolência ou as reações extrapiramidais (tremores e rigidez) observadas com a metoclopramida. Historicamente, a domperidona foi muito usada para controlar náuseas, vômitos e refluxo gástrico, mas perdeu espaço na rotina para medicamentos modernos como maropitant e ondansetrona, pois estudos demonstraram que seu estímulo sobre o estômago pode ser inconsistente em cães e ineficaz em gatos. Hoje, o uso mais consagrado da domperidona em cães de áreas endêmicas é como IMUNOMODULADOR PREVENTIVO contra a leishmaniose visceral: ao agir na hipófise, ela estimula a liberação de prolactina, um hormônio que ativa os macrófagos e direciona as defesas do cão para uma resposta imune protetora (Th1). Entretanto, há dois alertas fundamentais: 1) Ela pode alterar o ritmo elétrico do coração (prolongamento do intervalo QTc no eletrocardiograma), devendo ser evitada junto com antifúngicos (itraconazol, cetoconazol), antibióticos macrolídeos e antiarrítmicos; 2) Consensos internacionais recentes (WAVD 2025) destacam que ela serve para PREVENIR a doença em cães saudáveis negativos, mas NÃO é recomendada para tratar cães já clinicamente doentes, nos quais são obrigatórios medicamentos leishmanicidas específicos.',

  mechanismOfAction:
    'A domperidona (5-cloro-1-[1-[3-(2-oxo-2,3-di-hidro-1H-benzo[d]imidazol-1-il)propil]piperidin-4-il]-1H-benzo[d]imidazol-2(3H)-ona) é um derivado benzimidazolônico e piperidínico que atua como antagonista seletivo e de alta afinidade dos receptores dopaminérgicos do subtipo D2 (e, em menor grau, D3). Seus mecanismos biológicos desdobram-se em quatro eixos farmacodinâmicos:\n' +
    '1. ANTAGONISMO D2 NA CRTZ E EFEITO ANTIEMÉTICO PERIFÉRICO: A domperidona bloqueia competitivamente os receptores D2 situados na zona de gatilho quimiorreceptora (CRTZ — área postrema no assoalho do IV ventrículo). Como a CRTZ possui capilares fenestrados desprovidos da barreira hematoencefálica (BHE) contínua, a domperidona atinge essas sinapses sem necessitar atravessar a barreira endotelial, suprimindo o arco reflexo do vômito desencadeado por toxinas circulantes, apomorfina e uremia.\n' +
    '2. REMOÇÃO DO FREIO DOPAMINÉRGICO MOTOR NO TRATO GASTRINTESTINAL: A dopamina atua perifericamente no plexo mioentérico entérico inibindo a liberação de acetilcolina pelas terminações pós-ganglionares colinérgicas. O antagonismo de D2 pela domperidona suspende essa inibição tônica, permitindo aumento da amplitude e frequência das contrações antrais gástricas, relaxamento sincronizado do esfíncter pilórico e coordenação da motilidade gastroduodenal. Adicionalmente, eleva o tônus do esfíncter esofágico inferior (EEI), prevenindo o refluxo gastroesofágico.\n' +
    '3. EIXO HIPOFISÁRIO, HIPERPROLACTINEMIA E IMUNOMODULAÇÃO CELULAR (Th1): Os lactotrofos da adeno-hipófise (também externa à BHE) sofrem inibição tônica contínua pela dopamina via receptores D2 (fator inibidor da prolactina — PIF). O bloqueio desses receptores induz elevação plasmática transitória e fisiológica de prolactina. Em cães, a prolactina transcende o papel reprodutivo e comporta-se como uma potente citocina imunomoduladora: interage com receptores de prolactina (PRL-R) expressos em linfócitos T e macrófagos, estimulando a diferenciação de células T CD4+ no fenótipo auxiliar Th1 e induzindo a secreção de interferon-gama (IFN-γ), fator de necrose tumoral alfa (TNF-α) e óxido nítrico sintase induzível (iNOS). Esse ambiente citocínico ativa os macrófagos do hospedeiro, capacitando-os a destruir os amastigotas de Leishmania infantum no vacúolo parasitóforo.\n' +
    '4. BLOQUEIO DOS CANAIS DE POTÁSSIO CARDÍACOS hERG/Kv11.1 E RISCO ELETROCARDIOGRÁFICO: A domperidona exerce efeito bloqueador off-target sobre a subunidade alfa do canal de potássio voltagem-dependente cardíaco hERG (human Ether-à-go-go-Related Gene / Kv11.1), responsável pela corrente retificadora rápida de potássio (IKr). Esse bloqueio retarda a repolarização da fase 3 do potencial de ação dos miócitos ventriculares, prolongando o intervalo QTc no eletrocardiograma e abrindo uma janela de vulnerabilidade para pós-despolarizações precoces (EADs) e taquicardias ventriculares polimórficas (Torsades de Pointes).',

  pillars: [
    {
      title: 'Antagonismo D₂ Periférico e Baixa Passagem na BHE',
      icon: '🛡️',
      desc: 'Bloqueia receptores D2 na CRTZ (área postrema) e no plexo mioentérico sem cruzar a barreira hematoencefálica intacta devido ao efluxo eficiente pela P-glicoproteína (ABCB1), minimizando reações extrapiramidais e sedação central.',
    },
    {
      title: 'Eixo Hipofisário e Hiperprolactinemia Imunomoduladora',
      icon: '🧬',
      desc: 'Ao suprimir o freio dopaminérgico sobre os lactotrofos adeno-hipofisários, induz aumento de prolactina sérica. No cão, a prolactina atua como citocina pró-Th1, estimulando macrófagos a produzir IFN-γ e iNOS com efeito leishmanicida.',
    },
    {
      title: 'Bloqueio hERG/Kv11.1 e Risco Eletrocardiográfico de QTc',
      icon: '⚡',
      desc: 'Bloqueia canais cardíacos IKr, gerando prolongamento estatisticamente significativo do QTc em cães saudáveis (Donato et al. 2024; p=0,0292). Risco potencializado por azólicos, macrolídeos, antiarrítmicos, hipocalemia e hipomagnesemia.',
    },
    {
      title: 'Prevenção vs Tratamento: Divergência Crítica (WAVD 2025 vs CLWG 2026)',
      icon: '⚖️',
      desc: 'Eficácia preventiva comprovada em cães soronegativos de áreas endêmicas (WAVD 2025 grau moderado). Contudo, o WAVD 2025 NÃO recomenda seu uso como tratamento em cães doentes, enquanto o CLWG 2026 admite apenas como adjuvante aos leishmanicidas.',
    },
  ],

  quickSummaryHighlights: [
    'Uso principal contemporâneo no cão: imunomodulação preventiva contra Leishmaniose Visceral Canina (LVC) em animais soronegativos de áreas endêmicas (0,5 mg/kg VO q24h por 30 dias a cada 4 meses).',
    'Divergência de Consenso 2025/2026: o consenso mundial de dermatologia (WAVD 2025) NÃO recomenda domperidona para o tratamento de cães com leishmaniose clínica manifesta (SORT fraco); o CLWG 2026 permite seu uso apenas como imunoterápico adjuvante junto aos leishmanicidas consolidados, NUNCA em monoterapia.',
    'Segurança Cardíaca e QTc: o estudo prospectivo de Donato et al. (2024) comprovou que a dose clínica padrão prolonga significativamente o intervalo QTc em cães; contraindicada em associação a cetoconazol, itraconazol, eritromicina e antiarrítmicos.',
    'Declínio como Pró-cinético / Antiemético: superada por maropitant e ondansetrona para êmese; estudos manométricos demonstraram esvaziamento gástrico inconsistente em cães (Orihata & Sarna 1994) e ineficácia antral em gatos (Mangel 1983).',
    'Espécie Felina: sem validação farmacocinética e com evidência clínica muito fraca; contraindicada na rotina gastroenterológica quando há opções validadas.',
    'Correção Textual de Literatura: Zhang et al. (2011) avaliou 10 mg/cão em Beagles (e não 10 mg/kg); na ficha técnica Leisguard 2026, a Cmax de 16,6 mg/mL é um erro tipográfico (a unidade real é ng/mL).',
  ],

  quickIndications: [
    {
      condition: 'Imunomodulação Preventiva na Leishmaniose Canina (Soronegativos)',
      species: 'dog',
      doseSummary: '0,5 mg/kg VO a cada 24 horas por 30 dias consecutivos a cada 4 meses',
      route: 'Via Oral (VO) — 0,5 mL/kg da suspensão 1 mg/mL ou 0,1 mL/kg de Leisguard 5 mg/mL',
      duration: 'Ciclos de 30 dias repetidos a cada 4 meses (quadrimestralmente)',
      clinicalContext: 'Cães hígidos soronegativos em áreas endêmicas de alta transmissão; redução de 80% no adoecimento',
    },
    {
      condition: 'Adjuvante Imunoterapêutico na Leishmaniose Clínica (CLWG 2026)',
      species: 'dog',
      doseSummary: '0,5 a 1,0 mg/kg VO a cada 12 a 24 horas por 30 dias (somente associada a leishmanicidas)',
      route: 'Via Oral (VO)',
      duration: '30 dias consecutivos; jamais usar em monoterapia (WAVD 2025 não recomenda)',
      clinicalContext: 'Associação estrita a miltefosina ou antimoniato + alopurinol em cães sintomáticos',
    },
    {
      condition: 'Distúrbios de Motilidade Gastrointestinal Superior e Refluxo (Uso Secundário)',
      species: 'dog',
      doseSummary: '0,05 a 0,1 mg/kg VO a cada 12 a 24 horas (ou 2 a 5 mg/cão) antes das refeições',
      route: 'Via Oral (VO) 15 a 30 minutos antes da alimentação',
      duration: '3 a 7 dias conforme resposta clínica',
      clinicalContext: 'Esofagite de refluxo e gastroparesia leve; uso em declínio na rotina atual',
    },
    {
      condition: 'Estimulação de Lactação / Agalactia Pós-Parto (Cadelas)',
      species: 'dog',
      doseSummary: '0,1 a 0,2 mg/kg VO a cada 12 horas até o restabelecimento do fluxo lácteo',
      route: 'Via Oral (VO)',
      duration: '5 a 7 dias sob rigoroso monitoramento da glândula mamária',
      clinicalContext: 'Estimulação de prolactina por bloqueio D2 hipofisário; vigiar mastite',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-domp-dog-leish-prevention',
      indication: 'Imunomodulação profilática contra Leishmaniose Visceral Canina em áreas endêmicas',
      clinicalContext: 'Cães soronegativos hígidos sob risco de picada de flebotomíneos',
      species: 'dog',
      dose: '0,5 mg/kg (0,5 mL/kg da suspensão 1 mg/mL)',
      route: 'VO',
      frequency: 'a cada 24 horas',
      duration: '30 dias consecutivos a cada 4 meses',
      mechanismOfAction: 'Bloqueio de D2 hipofisário com elevação de prolactina sérica, citocina pró-Th1 que ativa macrófagos para produzir IFN-γ e iNOS.',
      clinicalRationale: 'Reduz significativamente a taxa de progressão para doença clínica em áreas de transmissão.',
      monitoring: 'Intervalo QTc no ECG, sorologia pré-ciclo e galactorreia indesejada.',
      referenceIds: ['ref-domp-sabate-2014', 'ref-domp-wavd-2025'],
      evidenceLevel: 'Nível 1b — Ensaio clínico randomizado e controlado (Sabaté et al. 2014)',
    },
    {
      id: 'ind-domp-dog-prokinetic',
      indication: 'Antiemético e promotor da motilidade gastroduodenal em cães (uso secundário)',
      clinicalContext: 'Hipomotilidade gástrica funcional e refluxo gastroesofágico leve',
      species: 'dog',
      dose: '0,05 a 0,1 mg/kg',
      route: 'VO',
      frequency: 'a cada 12 a 24 horas',
      duration: '3 a 7 dias',
      mechanismOfAction: 'Antagonismo de receptores dopaminérgicos D2 periféricos e na CRTZ desprovida de BHE.',
      clinicalRationale: 'Aumenta a pressão do EEI sem produzir efeitos extrapiramidais centrais.',
      monitoring: 'Tolerância clínica, persistência de vômitos e ritmo cardíaco.',
      referenceIds: ['ref-domp-plumbs-10ed', 'ref-domp-bsava-10ed'],
      evidenceLevel: 'Nível 3 — Formulários de consenso e farmacologia clássica (Plumb’s 10ª ed.)',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'PROLONGAMENTO DO INTERVALO QTc E RISCO CARDÍACO (DONATO ET AL. 2024)',
      text: 'Ensaios farmacológicos e eletrocardiográficos em cães (Donato et al. 2024) demonstraram que a domperidona em dose terapêutica oral promove prolongamento estatisticamente significativo do intervalo QTc médio (195,4 ms basal para 205,1 ms após o tratamento; p = 0,0292). Embora a maioria dos animais saudáveis permaneça assintomática, o bloqueio do canal hERG/Kv11.1 torna o fármaco arritmogênico em animais cardiopatas, sob distúrbios eletrolíticos (hipocalemia, hipomagnesemia) ou em polifarmácia com inibidores de CYP3A (cetoconazol, itraconazol) e outros fármacos prolongadores de repolarização (antiarrítmicos classes IA e III, metadona, cisaprida, ondansetrona).',
    },
    {
      label: 'PREVENÇÃO vs TRATAMENTO DA LEISHMANIOSE: DIVERGÊNCIA EXPLÍCITA DE CONSENSOS',
      text: 'Existe divergência científica substancial entre os consensos mundiais de 2025/2026: 1) Na PREVENÇÃO em cães soronegativos de regiões endêmicas, a domperidona possui respaldo em ensaios randomizados (Sabaté 2014) e grau moderado de recomendação pelo WAVD 2025. 2) No TRATAMENTO da leishmaniose clínica manifesta, o WAVD 2025 NÃO recomenda o fármaco por considerar a evidência insuficiente e de baixa qualidade. O consenso CLWG 2026 aceita seu papel unicamente como agente imunomodulador auxiliar somado aos leishmanicidas aprovados (miltefosina ou meglumina + alopurinol). É terminantemente contraindicado prescrever domperidona como tratamento isolado em cães sintomáticos ou com proteinúria.',
    },
    {
      label: 'DECLÍNIO COMO PRÓ-CINÉTICO E ANTIEMÉTICO NA ROTINA DE PEQUENOS ANIMAIS',
      text: 'A domperidona perdeu protagonismo histórico na gastroenterologia de cães e gatos. Investigações fisiológicas de motilidade demonstraram que seus efeitos pró-cinéticos sobre o antro gástrico canino são erráticos e imprevisíveis (Orihata & Sarna 1994). Para o controle emético, os antagonistas NK1 (maropitant) e 5-HT3 (ondansetrona) oferecem potência e abrangência central e periférica vastamente superiores. Seu uso digestivo fica restrito a casos selecionados de refluxo gastroesofágico com incompetência de EEI refratária.',
    },
    {
      label: 'EVIDÊNCIA FRACA E INEFICÁCIA DEMONSTRADA NA ESPÉCIE FELINA',
      text: 'A BSAVA (10ª ed.) e Plumb’s (10ª ed.) alertam que não existem estudos farmacocinéticos robustos ou posologias formalmente validadas para gatos. Além disso, investigações manométricas de Mangel (1983) comprovaram que a domperidona não estimula a motilidade antral nem acelera o trânsito no trato digestivo de felinos, decorrente de distribuição e resposta divergente de receptores dopaminérgicos entéricos nesta espécie. A domperidona não deve ser considerada droga de primeira escolha em gatos.',
    },
    {
      label: 'CORREÇÃO DE ERROS TEXTUAIS CLÁSSICOS NA LITERATURA ESPECIALIZADA',
      text: 'Atenção a dois equívocos frequentes de compilação: 1) No estudo farmacocinético seminal de Zhang et al. (2011) em cães Beagle, a dose administrada foi de 10 mg por cão (formulação humana de 10 mg), e não 10 mg/kg como reproduzido inadvertidamente em algumas revisões secundárias; 2) Na ficha técnica oficial (SPC) espanhola do Leisguard® 2026, a concentração plasmática máxima publicada como "Cmax = 16,6 mg/mL" trata-se de um erro de digitação tipográfico (a grandeza correta é 16,6 ng/mL, uma diferença de 10^6 vezes).',
    },
    {
      label: 'ENQUADRAMENTO REGULATÓRIO NO BRASIL (USO EXTRABULA HUMANO)',
      text: 'Ao contrário da União Europeia, onde a domperidona veterinária possui registro específico para leishmaniose canina (Leisguard® 5 mg/mL), no Brasil não há produto canino comercial registrado no MAPA com esse princípio ativo. O emprego na clínica de pequenos animais ocorre sob regime de uso extrabula (extra-label) utilizando produtos humanos (Domperix®, Motilium® 1 mg/mL ou 10 mg) ou formulações magistrais veterinárias, prescritos em Receituário Simples de uso veterinário (medicamento não controlado).',
    },
  ],

  indications: [
    'Imunomodulação profilática na Leishmaniose Visceral Canina (LVC por L. infantum): redução do risco de desenvolvimento de infecção ativa e doença clínica em cães soronegativos saudáveis que residem ou viajam para áreas de transmissão endêmica (protocolo quadrimestral de 30 dias; Sabaté 2014; Consenso WAVD 2025 grau moderado).',
    'Adjuvante imunoterapêutico na Leishmaniose Canina clínica manifesta (apenas associada aos leishmanicidas consolidados miltefosina ou antimoniato de meglumina + alopurinol segundo o consenso CLWG 2026; contraindicada em monoterapia pelo WAVD 2025).',
    'Estimulação da lactação (efeito galactagogo) em cadelas com agalactia ou hipogalactia pós-parto, estimulando a síntese de leite através do aumento fisiológico da prolactina sérica.',
    'Tratamento adjuvante do refluxo gastroesofágico e esofagite de refluxo em cães e gatos, atuando no aumento da pressão de fechamento do esfíncter esofágico inferior (EEI).',
    'Antiemético periférico de segunda linha em gastroparesia diabética, estase gástrica pós-operatória ou dispepsia com náusea crônica (uso secundário em declínio na medicina veterinária contemporânea).',
  ],

  contraindications: [
    'Obstrução mecânica do trato gastrintestinal, estenose pilórica, corpo estranho gástrico ou intussuscepção: o estímulo de motilidade contra obstrução mecânica fixa acarreta risco de perfuração visceral e choque séptico.',
    'Hemorragia digestiva ativa ou perfuração de víscera oca gastrintestinal confirmada ou sob suspeita.',
    'Arritmias cardíacas ventriculares prévias, bloqueio atrioventricular de 2º ou 3º grau, insuficiência cardíaca congestiva avançada, histórico de síncope cardiogênica ou síndrome de QT longo.',
    'Uso concomitante com inibidores potentes do CYP3A4 (cetoconazol, itraconazol, fluconazol, eritromicina, claritromicina) e fármacos que prolongam o intervalo QTc (antiarrítmicos classes IA e III, cisaprida, metadona).',
    'Neoplasias dependentes de prolactina, prolactinomas hipofisários ou adenocarcinomas mamários hormônio-dependentes em cadelas.',
    'Uso simultâneo de agonistas dopaminérgicos (cabergolina ou bromocriptina): ocorre antagonismo farmacodinâmico competitivo recíproco e anulação mútua dos efeitos.',
    'Hipersensibilidade conhecida à domperidona ou aos excipientes da formulação (algumas formulações contêm propilenoglicol ou sulfitos).',
  ],

  cautions: [
    'Avaliação e monitoramento eletrocardiográfico (ECG): realizar traçado basal e reavaliação periódica em cães submetidos a ciclos preventivos repetidos, especialmente em pacientes geriátricos ou de raças predispostas a cardiomiopatia dilatada (Doberman, Boxer, Cocker).',
    'Distúrbios hidroeletrolíticos concomitantes: hipocalemia, hipomagnesemia e desidratação amplificam drasticamente o risco de arritmias ventriculares fatais decorrentes do bloqueio hERG.',
    'Cães portadores da mutação ABCB1-1Δ (gene MDR1 / P-glicoproteína defeituosa — Collies, Pastores Australianos e afins) ou em uso de inibidores da P-gp: a ausência do efluxo pela BHE pode elevar as concentrações encefálicas e precipitar tremores, ataxia ou distonia extrapiramidal.',
    'Insuficiência hepática moderada a grave: a domperidona sofre extenso metabolismo microssomal hepático por CYP3A; o clearance sistêmico pode diminuir substancialmente, predispondo a superdosagens e acúmulo sérico.',
    'Doença Renal Crônica (IRIS estágios 3 e 4): embora a excreção renal inalterada seja pequena (<1%), metabólitos conjugados acumulam-se em uremia, podendo agravar o risco eletrocardiográfico.',
    'Gestação e lactação: o fármaco ultrapassa a barreira placentária; usar com extrema cautela e somente se o benefício justificar o risco fetal. Na lactação, usar apenas com a finalidade médica expressa de indução galactagoga e vigilância de mastite.',
  ],

  adverseEffects: [
    'Efeitos eletrocardiográficos e cardiovasculares: prolongamento assintomático ou clínico do intervalo QTc no ECG (Donato et al. 2024), arritmias ventriculares complexas e risco teórico de síncope ou Torsades de Pointes sob polifarmácia.',
    'Efeitos endócrinos e reprodutivos: hiperprolactinemia sustentada com ingurgitamento e sensibilidade da cadeia mamária, galactorreia não puerperal (inclusive em fêmeas castradas e machos) e alterações na ciclicidade estral em cadelas reprodutoras.',
    'Distúrbios gastrintestinais transitórios: cólicas abdominais tipo espasmo decorrentes de aumento súbito da motilidade antral, fezes amolecidas, diarreia aquosa passageira e borborigmos audíveis.',
    'Efeitos neurológicos e comportamentais (raros em doses normais, comuns em superdosagem ou mutação ABCB1): sonolência, letargia transitória, agitação paradoxal com nervosismo ou sinais extrapiramidais leves (tremores musculares, rigidez postural).',
    'Reações de hipersensibilidade cutânea: erupções cutâneas, prurido e urticária de caráter transitório após a administração.',
  ],

  administration: [
    'Via exclusivamente oral (VO). As apresentações líquidas devem ser administradas diretamente na cavidade oral ou misturadas a uma pequena quantidade de alimento úmido palatável.',
    'Tempo de administração em relação às refeições: para efeito pró-cinético digestivo e controle de refluxo, administrar 15 a 30 minutos ANTES das refeições para garantir que o pico sérico coincida com a chegada do bolo alimentar ao estômago. Para a imunomodulação preventiva da leishmaniose, o horário pode ser fixado com as refeições diárias para minimizar queixas de cólicas.',
    'Uso de formulações líquidas humanas no Brasil (Domperix® / Genéricos 1 mg/mL): medir rigorosamente o volume prescrito em mililitros utilizando a seringa dosadora que acompanha o frasco ou uma seringa hipodérmica graduada. Agitar suavemente a suspensão antes de cada retirada.',
    'Uso de comprimidos humanos de 10 mg: podem ser fracionados caso possuam sulco central com o auxílio de cortador de comprimidos; contudo, para animais de pequeno porte (< 10 kg), a manipulação veterinária ou o uso da suspensão oral líquida é imperativa para evitar sobredosagem acidental.',
    'Armazenamento: conservar os frascos em temperatura ambiente (15°C a 30°C), protegidos da umidade e da incidência solar direta.',
  ],

  doses: [
    {
      id: 'dose-domp-dog-leish-prevention',
      species: 'dog',
      indication: 'Prevenção da Leishmaniose Visceral Canina em cães soronegativos de áreas endêmicas',
      doseMin: 0.5,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 24 horas (uma vez ao dia)',
      duration: 'durante 30 dias consecutivos a cada 4 meses',
      notes:
        'Protocolo internacional padronizado (Sabaté et al. 2014; Bula Leisguard® Europa; Consenso WAVD 2025 grau moderado). Administrar 0,5 mg/kg VO q24h por 30 dias seguidos. Repetir o ciclo a cada 4 meses (março, julho e novembro no hemisfério norte; ou quadrimestralmente em áreas de alta transmissão no Brasil). Com a suspensão veterinária Leisguard 5 mg/mL: 0,1 mL/kg q24h (1 mL a cada 10 kg). Com a suspensão humana 1 mg/mL: 0,5 mL/kg q24h (5 mL a cada 10 kg). Cães devem ser previamente testados (sorologia e/ou PCR negativos) antes de cada ciclo.',
      calculatorEnabled: true,
      presentationId: 'pres-domperix-1mgml',
      evidenceLevel: 'Consenso WAVD 2025 (grau moderado); Ensaio clínico randomizado Sabaté et al. 2014',
    },
    {
      id: 'dose-domp-dog-leish-treatment',
      species: 'dog',
      indication: 'Leishmaniose Canina clínica manifesta — adjuvante imunoterapêutico (DIVERGÊNCIA DE CONSENSO)',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 a 24 horas',
      duration: '30 dias consecutivos',
      notes:
        'AVISO CRÍTICO DE DIVERGÊNCIA CIENTÍFICA: O consenso mundial WAVD 2025 NÃO recomenda a domperidona como tratamento de cães com leishmaniose clínica devido à insuficiência de evidência. Já o Canine Leishmaniosis Working Group (CLWG 2026) e Gómez-Ochoa et al. (2009) admitem seu papel estritamente como AGENTE IMUNOTERAPÊUTICO ADJUVANTE associado aos leishmanicidas padrão (miltefosina ou meglumina + alopurinol). NUNCA prescrever domperidona isolada em cães clinicamente doentes, com linfoadenopatia, caquexia ou proteinúria.',
      calculatorEnabled: false,
      presentationId: 'pres-domperix-1mgml',
      evidenceLevel: 'Controvérsia: Não recomendado por WAVD 2025; Adjuvante aceito por CLWG 2026',
    },
    {
      id: 'dose-domp-dog-prokinetic',
      species: 'dog',
      indication: 'Antiemético e pró-cinético gastrintestinal superior secundário / refluxo gastroesofágico',
      doseMin: 0.05,
      doseMax: 0.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 a 24 horas',
      duration: '3 a 7 dias conforme resposta clínica',
      notes:
        'Dose histórica em formulários veterinários (Plumb’s 10ª ed. pp. 421–422; BSAVA 10ª ed. p. 135: 0,05 a 0,1 mg/kg VO q12–24h ou 2 a 5 mg por cão). Administrar 15 a 30 minutos antes das refeições. Emprego em declínio na medicina veterinária contemporânea devido à inconsistência demonstrada no esvaziamento gástrico (Orihata & Sarna 1994) e à superioridade absoluta de maropitant e ondansetrona para êmese.',
      calculatorEnabled: true,
      presentationId: 'pres-domperix-1mgml',
      evidenceLevel: 'Plumb’s 10ª ed.; BSAVA 10ª ed.; Orihata & Sarna 1994',
    },
    {
      id: 'dose-domp-dog-agalactia',
      species: 'dog',
      indication: 'Agalactia / hipogalactia pós-parto em cadelas (indução de lactação via prolactina)',
      doseMin: 1.1,
      doseMax: 1.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '5 a 7 dias consecutivos',
      notes:
        'Indicação endócrina fundamentada no bloqueio D2 adeno-hipofisário que desinibe a secreção de prolactina pelos lactotrofos. Fornecer a cada 12 horas até o estabelecimento de fluxo lácteo adequado, associado à estimulação da sucção pelos neonatos. Monitorar rigorosamente as glândulas mamárias para prevenir mastite estagnante secundária.',
      calculatorEnabled: false,
      evidenceLevel: 'Estudos endócrinos reprodutivos / Plumb’s 10ª ed.',
    },
    {
      id: 'dose-domp-cat-prokinetic',
      species: 'cat',
      indication: 'Distúrbios de motilidade gastrintestinal e refluxo — USO HISTÓRICO COM EVIDÊNCIA MUITO LIMITADA',
      doseMin: 2,
      doseMax: 5,
      doseUnit: 'mg',
      perWeightUnit: 'por gato',
      route: 'VO',
      frequency: 'a cada 8 a 12 horas',
      duration: '3 a 5 dias sob vigilância',
      notes:
        'ALERTA DE EVIDÊNCIA INSUFICIENTE: Plumb’s (10ª ed.) e BSAVA (10ª ed.) citam dose empírica fixa de 2 a 5 mg por felino (aproximadamente 0,1 a 0,3 mg/kg) q8–12h. Entretanto, ensaios manométricos comparativos de Mangel (1983) comprovaram que a domperidona NÃO estimula a motilidade antral em felinos. Inexistem estudos farmacocinéticos ou ensaios clínicos controlados de eficácia em gatos. Evitar na rotina e priorizar fármacos com eficácia demonstrada na espécie.',
      calculatorEnabled: false,
      evidenceLevel: 'Formulários históricos; Evidência fisiológica negativa de motilidade (Mangel 1983)',
    },
  ],

  presentations: [
    {
      id: 'pres-domperix-1mgml',
      name: 'Domperix® 1 mg/mL Suspensão Oral Frasco 100 mL com Seringa Dosadora (Eurofarma)',
      brand: 'Domperix® (Eurofarma Laboratórios)',
      form: 'suspensão oral',
      concentrationValue: 1,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frasco de plástico âmbar contendo 100 mL de suspensão oral homogênea branca a esbranquiçada, acompanhado de seringa dosadora plástica graduada de 5 mL.',
      route: 'VO',
      channel: 'human_pharmacy',
      commercialProductSlug: 'domperix-eurofarma',
      commercialType: 'Uso Humano Extrabula no Brasil',
      packageDescription:
        'Cada 1 mL de suspensão oral contém 1 mg de domperidona base em veículo aquoso estabilizado com sorbitol e aroma característico.',
      calculatedMlPerKgFormula: '0.5 mL/kg q24h (para dose preventiva de 0,5 mg/kg)',
    },
    {
      id: 'pres-domperidona-10mg-comp',
      name: 'Domperidona 10 mg Comprimidos Revestidos (Genéricos Eurofarma / EMS / Medley)',
      brand: 'Domperidona Genérica (Diversos Fabricantes)',
      form: 'comprimido',
      concentrationValue: 10,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Blísteres com 30 ou 60 comprimidos revestidos brancos sulcados.',
      route: 'VO',
      channel: 'human_pharmacy',
      commercialType: 'Uso Humano Extrabula no Brasil',
      packageDescription: 'Cada comprimido contém 10 mg de domperidona base.',
      scoringInfo: 'Comprimido sulcado; permite divisão em metades iguais de 5 mg.',
    },
    {
      id: 'pres-leisguard-5mgml',
      name: 'Leisguard® 5 mg/mL Suspensão Oral Frasco 60 mL ou 105 mL (Ecuphar / Esteve)',
      brand: 'Leisguard® (Ecuphar / Esteve — Referência Veterinária Internacional)',
      form: 'suspensão oral',
      concentrationValue: 5,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frascos de 60 mL ou 105 mL acompanhados de seringa dosadora graduada em quilogramas de peso vivo (0,1 mL para cada 1 kg de peso).',
      route: 'VO',
      channel: 'veterinary',
      commercialProductSlug: 'leisguard-ecuphar',
      commercialType: 'Produto Veterinário com Registro Oficial na Europa (CIMAVET)',
      packageDescription:
        'Suspensão oral veterinária palatável contendo 5 mg de domperidona por mL. Registro oficial na Europa para redução do risco de desenvolvimento de leishmaniose canina clínica.',
      calculatedMlPerKgFormula: '0.1 mL/kg q24h (equivalente a 1 mL para cada 10 kg)',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'A domperidona apresenta rápida absorção gastrintestinal após administração oral no cão, alcançando a concentração plasmática máxima (Tmax) entre 0,5 e 1,5 horas (média de aproximadamente 1,0 hora). No cão, a biodisponibilidade oral absoluta (F) situa-se em torno de 24%, limitada por extenso metabolismo de primeira passagem intestinal e hepático mediado pelo citocromo P450 e por efluxo apical na mucosa entérica mediado pela P-glicoproteína (P-gp/ABCB1). Ao contrário de humanos, nos quais alimentos reduzem a taxa de absorção inicial, em cães a presença de alimento na refeição não altera de modo significativo a biodisponibilidade sistêmica nem a extensão total de absorção (AUC).',
    distribution:
      'Volume de distribuição aparente de moderado a amplo em cães (Vd de 1,3 a 2,5 L/kg), refletindo eficiente penetração extravascular em tecidos moles e órgãos periféricos. A taxa de ligação a proteínas plasmáticas caninas é muito elevada, oscilando entre 91% e 93% (ligando-se predominantemente à albumina e à alfa-1-glicoproteína ácida). Em animais saudáveis com barreira hematoencefálica (BHE) íntegra, a domperidona praticamente não atinge o parênquima cerebral nem o líquido cefalorraquidiano, comportando-se como excelente substrato da P-glicoproteína endotelial, que atua bombeando ativamente a molécula de volta para o lúmen capilar. Entretanto, atinge concentrações plenas na zona de gatilho quimiorreceptora (CRTZ — área postrema) e nos lactotrofos da adeno-hipófise, sítios desprovidos de BHE contínua.',
    metabolism:
      'Biotransformação hepática rápida e quase completa, dependente do sistema microssomal hepático, sendo mediada primariamente pela família do citocromo P450 isoforma CYP3A (CYP3A12 e CYP3A26 na espécie canina). As principais rotas metabólicas compreendem a hidroxilação aromática do anel benzimidazolônico e a desalquilação oxidativa da cadeia piperidínica, gerando metabólitos hidroxilados e fragmentos conjugados sem atividade farmacológica relevante. Fármacos inibidores do CYP3A reduzem drasticamente a depuração metabólica da domperidona, elevando a concentração sérica livre.',
    elimination:
      'A meia-vida de eliminação plasmática terminal (t1/2) em cães é relativamente curta, variando entre 6,5 e 7,5 horas (média próxima a 7,0 horas). O clearance plasmático sistêmico total no cão situa-se em torno de 10 a 14 mL/min/kg. A via predominante de excreção é a biliar e fecal, correspondendo a aproximadamente 66% da dose administrada sob forma de metabólitos inativos. A excreção urinária responde por cerca de 30% da dose (quase que exclusivamente na forma de metabólitos polares), sendo a depuração renal de fármaco intacto desprezível (<1%). Na espécie felina, não há dados farmacocinéticos validados na literatura.',
    cnsPenetration:
      'Praticamente desprezível em encéfalo e medula com barreira hematoencefálica íntegra devido ao efluxo contínuo via P-glicoproteína (ABCB1). Concentra-se seletivamente na área postrema e na adeno-hipófise.',
    halfLife: 'Cães: 6,5 a 7,5 horas (~7 h); Gatos: dados farmacocinéticos robustos inexistentes.',
    plasmaBinding: 'Aproximadamente 91% a 93% em cães (alta ligação à albumina sérica).',
  },

  practicalWeightTable: {
    standardDoseText:
      'Referência prática de cálculo para a DOSE PREVENTIVA DE LEISHMANIOSE CANINA (0,5 mg/kg VO q24h por 30 dias a cada 4 meses). Fórmula para suspensão humana brasileira (1 mg/mL): Peso (kg) × 0,5 = Volume em mL. Fórmula para suspensão veterinária europeia Leisguard® (5 mg/mL): Peso (kg) × 0,1 = Volume em mL.',
    headers: [
      'Peso Corporal',
      'Dose Diária (mg)',
      'Suspensão 1 mg/mL (Humana Brasil)',
      'Suspensão 5 mg/mL (Leisguard® Europa)',
      'Comprimidos 10 mg (Humano)',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '1,0 mg',
        col1: '1,0 mL',
        col2: '0,2 mL',
        col3: 'Inviável (usar suspensão)',
      },
      {
        weight: '3 kg',
        totalDose: '1,5 mg',
        col1: '1,5 mL',
        col2: '0,3 mL',
        col3: 'Inviável (usar suspensão)',
      },
      {
        weight: '4 kg',
        totalDose: '2,0 mg',
        col1: '2,0 mL',
        col2: '0,4 mL',
        col3: 'Inviável (usar suspensão)',
      },
      {
        weight: '5 kg',
        totalDose: '2,5 mg',
        col1: '2,5 mL',
        col2: '0,5 mL',
        col3: 'Inviável (usar suspensão)',
      },
      {
        weight: '7,5 kg',
        totalDose: '3,75 mg',
        col1: '3,75 mL',
        col2: '0,75 mL',
        col3: 'Inviável (usar suspensão)',
      },
      {
        weight: '10 kg',
        totalDose: '5,0 mg',
        col1: '5,0 mL',
        col2: '1,0 mL',
        col3: '1/2 comprimido de 10 mg',
      },
      {
        weight: '15 kg',
        totalDose: '7,5 mg',
        col1: '7,5 mL',
        col2: '1,5 mL',
        col3: 'Usar suspensão ou comp. manipulado',
      },
      {
        weight: '20 kg',
        totalDose: '10,0 mg',
        col1: '10,0 mL',
        col2: '2,0 mL',
        col3: '1 comprimido inteiro de 10 mg',
      },
      {
        weight: '25 kg',
        totalDose: '12,5 mg',
        col1: '12,5 mL',
        col2: '2,5 mL',
        col3: '1 e 1/4 comp. ou suspensão',
      },
      {
        weight: '30 kg',
        totalDose: '15,0 mg',
        col1: '15,0 mL',
        col2: '3,0 mL',
        col3: '1 e 1/2 comprimido de 10 mg',
      },
      {
        weight: '35 kg',
        totalDose: '17,5 mg',
        col1: '17,5 mL',
        col2: '3,5 mL',
        col3: '1 e 3/4 comp. ou suspensão',
      },
      {
        weight: '40 kg',
        totalDose: '20,0 mg',
        col1: '20,0 mL',
        col2: '4,0 mL',
        col3: '2 comprimidos de 10 mg',
      },
    ],
  },

  samplePrescriptionText:
    'RECEITUÁRIO SIMPLES DE USO VETERINÁRIO (USO EXTRABULA)\n' +
    'EMITIDO EM VIA ÚNICA (MEDICAMENTO NÃO CONTROLADO NO BRASIL)\n\n' +
    'CLÍNICA VETERINÁRIA [NOME DA CLÍNICA] — Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\n' +
    'Endereço: [Logradouro, Bairro, Cidade, UF] — Tel: [(XX) XXXXX-XXXX]\n\n' +
    'PACIENTE: [Nome do Cão], Espécie: Canina, Raça: [Raça], Sexo: [M/F], Peso: [10,0 kg]\n' +
    'TUTOR: [Nome Completo do Tutor], CPF: [000.000.000-00], Endereço: [Logradouro, Cidade, UF]\n\n' +
    'PRESCRIÇÃO:\n' +
    'OPÇÃO A (USO DA SUSPENSÃO HUMANA DE 1 mg/mL — MAIS COMUM NO BRASIL):\n' +
    '1. DOMPERIX® (domperidona 1 mg/mL) suspensão oral --------------------------- 2 frascos de 100 mL\n' +
    '   (Apresentação de uso humano — comercializada em farmácias comuns)\n' +
    '   Posologia (Imunomodulação Preventiva na Leishmaniose Canina em Cão Soronegativo):\n' +
    '   Administrar 5,0 mL (equivalente a 5,0 mg de domperidona, na dose de 0,5 mg/kg) por via oral, uma vez ao dia (a cada 24 horas), durante 30 dias consecutivos.\n' +
    '   Administrar junto com uma porção de alimento. Repetir este ciclo de 30 dias a cada 4 meses, após prévia confirmação sorológica negativa para leishmaniose.\n\n' +
    'OPÇÃO B (USO DA SUSPENSÃO VETERINÁRIA LEISGUARD® 5 mg/mL — SE IMPORTADO/DISPONÍVEL):\n' +
    '1. LEISGUARD® (domperidona 5 mg/mL) suspensão oral veterinária -------------- 1 frasco de 60 mL\n' +
    '   Posologia: Administrar 1,0 mL (equivalente a 5,0 mg de domperidona, na dose de 0,5 mg/kg = 0,1 mL/kg) por via oral, uma vez ao dia (q24h), durante 30 dias consecutivos.\n\n' +
    'OPÇÃO C (USO DOS COMPRIMIDOS HUMANOS DE 10 mg PARA CÃES DE MÉDIO/GRANDE PORTE):\n' +
    '1. DOMPERIDONA 10 mg comprimidos -------------------------------------------- 1 caixa com 30 comprimidos\n' +
    '   Posologia (para cão de 20 kg): Fornecer 1 comprimido (10 mg) por via oral a cada 24 horas durante 30 dias consecutivos.\n' +
    '   Posologia (para cão de 10 kg): Fornecer 1/2 comprimido (5 mg) por via oral a cada 24 horas durante 30 dias consecutivos.\n\n' +
    'ALERTAS OBRIGATÓRIOS AO PROPRIETÁRIO:\n' +
    '- A domperidona NÃO substitui o uso ininterrupto da coleira repelente contra flebotomíneos (Lutzomyia longipalpis).\n' +
    '- Este protocolo é profilático em animais negativos; se o cão apresentar sintomas de leishmaniose, suspender e realizar exames laboratoriais imediatamente.\n' +
    '- Contraindicado fornecer simultaneamente com antifúngicos (cetoconazol, itraconazol), eritromicina ou medicamentos cardíacos sem autorização prévia.\n\n' +
    '[Localidade - UF], [Data do Atendimento]\n' +
    '________________________________________________________\n' +
    'Dr(a). [Nome do Médico Veterinário] — CRMV-[UF] nº [XXXXX]',

  clinicalStudiesCommented: [
    {
      title:
        'A randomized, double-blind, placebo-controlled field trial on the efficacy of oral domperidone in the prevention of canine leishmaniosis in an endemic area',
      authorsYear: 'Sabaté et al. (2014)',
      journal: 'Veterinary Parasitology',
      studyDesign:
        'Ensaio clínico prospectivo de campo, randomizado, duplo-cego e controlado por placebo',
      sampleSize: '94 cães soronegativos para L. infantum em área hiperendêmica da Espanha',
      mainFindings:
        'Os cães foram alocados para receber domperidona oral (0,5 mg/kg q24h durante 30 dias consecutivos a cada 4 meses) ou placebo. Ao longo de 12 meses de acompanhamento, o grupo tratado com domperidona demonstrou uma redução estatisticamente significativa no desenvolvimento de leishmaniose clínica manifesta (risco relativo reduzido em aproximadamente 80% comparado ao placebo; p < 0,05) e menor taxa de soroconversão. Os animais tratados mantiveram títulos de anticorpos significativamente mais baixos e ausência de efeitos adversos graves.',
      clinicalTakeaway:
        'Constitui a principal base científica do registro oficial do Leisguard® na Europa e da recomendação de grau moderado do consenso mundial WAVD 2025 para a profilaxia da leishmaniose canina em áreas de alta transmissão.',
      referenceId: 'ref-domp-sabate-2014',
    },
    {
      title:
        'Electrocardiographic evaluation and QTc interval prolongation in healthy dogs treated with oral domperidone: a prospective study',
      authorsYear: 'Donato et al. (2024)',
      journal: 'Journal of Veterinary Internal Medicine / Vet Record',
      studyDesign: 'Ensaio clínico prospectivo eletrocardiográfico e farmacológico controlado',
      sampleSize: '24 cães hígidos sob protocolo padrão de domperidona',
      mainFindings:
        'Avaliou o traçado eletrocardiográfico computadorizado e mensurou os intervalos PR, QRS, QT e QTc corrigido pelas fórmulas de Fridericia e van de Water antes, durante e após 30 dias de domperidona oral (0,5 mg/kg q24h). O estudo comprovou um aumento estatisticamente significativo do intervalo QTc médio (195,4 ± 14,2 ms no basal versus 205,1 ± 16,8 ms ao término do tratamento; p = 0,0292). Embora nenhum cão hígido tenha apresentado arritmias ventriculares complexas sintomáticas, o prolongamento documentado comprova a suscetibilidade do miocárdio canino ao bloqueio de canais hERG/Kv11.1.',
      clinicalTakeaway:
        'Demonstra formalmente que a domperidona prolonga a repolarização ventricular no cão. Alerta contra a polifarmácia com fármacos bloqueadores do CYP3A4 (azólicos) e arritmogênicos, reforçando a indicação de ECG basal em pacientes cardiopatas.',
      referenceId: 'ref-domp-donato-2024',
    },
    {
      title:
        'Use of domperidone as an immunomodulator in the treatment of mild-to-moderate canine leishmaniosis: clinical and serological outcome',
      authorsYear: 'Gómez-Ochoa et al. (2009)',
      journal: 'Veterinary Journal',
      studyDesign: 'Estudo clínico prospectivo piloto aberto',
      sampleSize: '26 cães com leishmaniose clínica leve a moderada',
      mainFindings:
        'Os cães receberam domperidona oral (0,5 mg/kg q12h a q24h) por 30 dias como modalidade imunomoduladora. Observou-se melhora clínica nos escores de dermatite, linfoadenopatia e ganho de peso corporal, correlacionada com pico de prolactina e aumento na produção ex vivo de TNF-α e IFN-γ por leucócitos sanguíneos. Contudo, as taxas de redução de carga parasitária tecidual foram variáveis e inferiores às proporcionadas pelos leishmanicidas de ataque convencionais.',
      clinicalTakeaway:
        'Evidencia que a domperidona melhora escores clínicos leves, mas não possui potência leishmanicida estéril suficiente para justificar seu uso como monoterapia em animais sintomáticos graves.',
      referenceId: 'ref-domp-gomez-ochoa-2009',
    },
    {
      title:
        'Cellular and humoral immune response in dogs naturally infected by Leishmania infantum treated with domperidone',
      authorsYear: 'Cavalera et al. (2021)',
      journal: 'Parasites & Vectors',
      studyDesign: 'Ensaio clínico imunológico e biomolecular longitudinal',
      sampleSize: '30 cães infectados por Leishmania infantum',
      mainFindings:
        'Demonstrou que a administração de domperidona induz ativação de linfócitos T auxiliares com polarização imune pró-Th1, mensurada pela elevação significativa da relação IFN-γ / IL-4 e aumento na atividade leishmanicida fagocítica macrofágica via expressão da sintase de óxido nítrico induzível (iNOS). Houve controle temporário da proliferação parasitária em animais em estágios iniciais.',
      clinicalTakeaway:
        'Confirma o mecanismo biológico de imunomodulação celular secundária à hiperprolactinemia, fundamentando seu emprego preventivo e como adjuvante imunoterapêutico.',
      referenceId: 'ref-domp-cavalera-2021',
    },
    {
      title:
        'Follow-up of mucosal and systemic immunity in dogs under preventive treatment with oral domperidone in an endemic focus',
      authorsYear: 'Cavalera et al. (2022)',
      journal: 'Comparative Immunology, Microbiology and Infectious Diseases',
      studyDesign: 'Estudo prospectivo de coorte de campo',
      sampleSize: '45 cães sob ciclos preventivos quadrimestrais',
      mainFindings:
        'Os ciclos repetidos de domperidona a cada 4 meses mantiveram a ativação da imunidade celular específica sem deflagrar exaustão clonal de linfócitos T ou imunossupressão paradoxal. A produção mucosal de anticorpos e a proliferação celular mantiveram-se superiores ao grupo controle não tratado.',
      clinicalTakeaway:
        'Sustenta a segurança imunológica e a plausibilidade da repetição quadrimestral de ciclos de 30 dias de domperidona em cães residentes em áreas endêmicas.',
      referenceId: 'ref-domp-cavalera-2022',
    },
    {
      title:
        'Immune biomarkers and parasitic load dynamics in dogs receiving repeated preventive cycles of domperidone against Leishmania infantum',
      authorsYear: 'Baxarias et al. (2023)',
      journal: 'Veterinary Immunology and Immunopathology',
      studyDesign: 'Ensaio clínico prospectivo controlado com monitoramento por qPCR',
      sampleSize: '38 cães de canil em área endêmica sob vigilância sorológica e molecular',
      mainFindings:
        'Avaliou a carga parasitária em aspirados de linfonodo e sangue periférico por qPCR e a cinética de citocinas. O regime preventivo de domperidona reduziu a taxa de infecção detectável em linfonodos quando associado a coleiras repelentes. No entanto, animais que desenvolveram infecções de escape sob alta densidade vetorial necessitaram de resgate leishmanicida imediato.',
      clinicalTakeaway:
        'Ressalta que a domperidona atua como barreira imunológica profilática, mas não previne a infecção se houver alta inoculação e ausência de repelência vetorial.',
      referenceId: 'ref-domp-baxarias-2023',
    },
    {
      title:
        'Effect of dopamine and dopamine antagonists on the motility of the feline antrum and pylorus',
      authorsYear: 'Mangel (1983)',
      journal: 'Gastroenterology / Research in Veterinary Science',
      studyDesign: 'Estudo experimental manométrico comparativo in vivo',
      sampleSize: 'Modelos experimentais felinos e caninos avaliados sob manometria intraluminal',
      mainFindings:
        'Comparou os efeitos de agonistas e antagonistas dopaminérgicos sobre a motilidade antral. Enquanto no cão os antagonistas dopaminérgicos exerceram coordenação motora gástrica em determinadas condições, nos gatos a domperidona não promoveu aumento significativo nas contrações do antro gástrico nem acelerou o tempo de esvaziamento de líquidos ou sólidos.',
      clinicalTakeaway:
        'Comprova a ineficácia fisiológica da domperidona como pró-cinético antral na espécie felina, desmistificando sua extrapolação indiscriminada da medicina canina e humana para gatos.',
      referenceId: 'ref-domp-mangel-1983',
    },
    {
      title:
        'The role of dopamine in the regulation of canine gastric motor activity and coordination: a manometric and fluoroscopic assessment',
      authorsYear: 'Orihata & Sarna (1994)',
      journal: 'American Journal of Physiology — Gastrointestinal and Liver Physiology',
      studyDesign: 'Estudo fisiológico manométrico e de trânsito radioscópico controlado',
      sampleSize: 'Cães hígidos monitorados por sensores de pressão antropilóricos implantados',
      mainFindings:
        'Demonstrou que o bloqueio dopaminérgico pela domperidona produz respostas altamente variáveis e erráticas na coordenação motora antropilórica em cães. Embora eleve o tônus do esfíncter esofágico inferior, seu impacto sobre a velocidade real de esvaziamento gástrico de refeições sólidas e semissólidas foi inconsistente e desprovido de aceleração estatisticamente uniforme.',
      clinicalTakeaway:
        'Explica por que a domperidona perdeu espaço como pró-cinético de primeira escolha em pequenos animais, fundamentando a transição clínica para fármacos serotoninérgicos (cisaprida, mosaprida) e antieméticos modernos.',
      referenceId: 'ref-domp-orihata-sarna-1994',
    },
    {
      title:
        'Pharmacokinetics and absolute oral bioavailability of domperidone in Beagle dogs after single oral and intravenous administration',
      authorsYear: 'Zhang et al. (2011)',
      journal: 'European Journal of Drug Metabolism and Pharmacokinetics',
      studyDesign: 'Estudo farmacocinético experimental cruzado (crossover)',
      sampleSize: '6 cães da raça Beagle sadios',
      mainFindings:
        'Determinou os parâmetros de disposição corporal após dose intravenosa (IV) e oral (VO) de 10 mg por cão (formulação humana de 10 mg). A biodisponibilidade oral média no cão foi de 24,1% ± 4,3%, com Tmax de 0,83 ± 0,26 h, Cmax de 64,8 ± 18,2 ng/mL e meia-vida terminal de eliminação de 7,1 ± 1,2 horas. O clearance total foi de 12,4 mL/min/kg e a taxa de ligação proteica foi de 92,6%.',
      clinicalTakeaway:
        'Esclarece que a dose administrada foi de 10 mg por cão (e não 10 mg/kg), documentando com precisão a biodisponibilidade de ~24% e a rápida metabolização por CYP3A na espécie canina.',
      referenceId: 'ref-domp-zhang-2011',
    },
  ],

  attentionData: {
    attentionSubtitle:
      'Vigilância eletrocardiográfica (intervalo QTc), interações com inibidores de CYP3A, divergência entre consensos mundiais na leishmaniose e limitações na espécie felina',
    precautions: [
      {
        condition: 'Polifarmácia com inibidores de CYP3A4 e bloqueadores de canais de potássio hERG',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A domperidona é depurada quase que exclusivamente por metabolismo microssomal mediado por CYP3A. Inibidores enzimáticos potentes (cetoconazol, itraconazol, eritromicina, claritromicina) bloqueiam a depuração, elevando dramaticamente a concentração sérica do fármaco livre. Como esses mesmos fármacos também bloqueiam o canal hERG/Kv11.1, ocorre um sinergismo eletrofisiológico que retarda a repolarização ventricular da fase 3, precipitando arritmias ventriculares polimórficas malignas (Torsades de Pointes) e parada cardíaca.',
        clinicalAction:
          'Contraindicação absoluta de uso concomitante. Respeitar janela de descontinuação (washout) de pelo menos 5 a 7 dias antes de iniciar domperidona.',
      },
      {
        condition: 'Prescrição como monoterapia em leishmaniose visceral canina clinicamente manifesta',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A domperidona é um imunomodulador dependente de prolactina e não possui capacidade leishmanicida direta intrínseca capaz de promover a lise maciça de amastigotas de Leishmania infantum em cães com alta carga parasitária, linfoadenopatia, caquexia ou glomerulonefrite. O consenso WAVD 2025 concluiu que a evidência de eficácia no tratamento de cães doentes é fraca e insuficiente.',
        clinicalAction:
          'NUNCA prescrever domperidona isolada para cães sintomáticos. Em cães clinicamente doentes, o tratamento obrigatório exige fármacos leishmanicidas consolidados (miltefosina ou meglumina + alopurinol).',
      },
      {
        condition: 'Obstrução gastrintestinal mecânica ou perfuração de víscera oca',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Ao bloquear os receptores D2 no plexo mioentérico e desinibir a liberação de acetilcolina, a domperidona estimula o peristaltismo gástrico e proximal. Forçar a motilidade contra uma barreira mecânica fixa (corpo estranho, intussuscepção) eleva a pressão intraluminal e pode precipitar isquemia mural, necrose e rotura gástrica ou duodenal.',
        clinicalAction:
          'Excluir rigorosamente estenoses, corpos estranhos e peritonite por palpação, radiografia simples/contrastada ou ultrassonografia antes de qualquer administração.',
      },
      {
        condition: 'Cães de raças sensíveis com suspeita ou confirmação de mutação no gene ABCB1 (MDR1)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A domperidona depende do transportador transmembrana P-glicoproteína (ABCB1) para ser ativamente efluída das células endoteliais da barreira hematoencefálica de volta à circulação sanguínea. Cães homozigotos para a mutação ABCB1-1Δ (Collie, Pastor Australiano, Shetland, Whippet de pelo longo) carecem desse mecanismo de extrusão, permitindo penetração patológica no SNC e ligação a receptores D2 dos gânglios da base.',
        clinicalAction:
          'Utilizar com extrema cautela ou selecionar fármaco alternativo em raças sensíveis. Em caso de necessidade, iniciar com doses reduzidas e monitorar ataxia, tremores e rigidez postural.',
      },
      {
        condition: 'Pacientes cardiopatas com arritmias prévias ou distúrbios hidroeletrolíticos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O estudo de Donato et al. (2024) comprovou que a domperidona causa prolongamento estatisticamente significativo do intervalo QTc no ECG canino. Hipocalemia e hipomagnesemia hiperpolarizam a membrana e potencializam a inibição da corrente retificadora rápida de potássio (IKr), desestabilizando o potencial de repouso miocárdico.',
        clinicalAction:
          'Realizar ECG basal e mensurar eletrólitos séricos (potássio e magnésio) antes de iniciar a medicação em animais idosos ou nefropatas. Corrigir déficits eletrolíticos previamente.',
      },
      {
        condition: 'Uso na espécie felina para distúrbios motores digestivos',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Estudos funcionais manométricos (Mangel 1983) comprovaram ausência de resposta motora contrátil antral à domperidona em gatos, e não existem dados farmacocinéticos que sustentem regimes posológicos seguros na espécie.',
        clinicalAction:
          'Não priorizar domperidona em felinos. Para êmese em gatos, indicar maropitant ou ondansetrona; para pró-cinética esofágica/gástrica, indicar opções respaldadas pela literatura felina.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Antifúngicos azólicos (Cetoconazol, Itraconazol, Fluconazol, Voriconazol)',
        severity: 'contraindicated',
        clinicalEffect:
          'Prolongamento severo do intervalo QTc, arritmias ventriculares malignas (Torsades de Pointes) e risco de parada cardiorrespiratória.',
        pharmacologicalMechanism:
          'Inibição potente do metabolismo microssomal hepático da domperidona mediado por CYP3A4/CYP3A12, resultando em elevação de até 3 a 5 vezes nas concentrações plasmáticas livres somada ao bloqueio concomitante de canais de potássio hERG por ambos os fármacos.',
      },
      {
        drugOrClass: 'Antibióticos macrolídeos (Eritromicina, Claritromicina)',
        severity: 'contraindicated',
        clinicalEffect:
          'Aumento perigoso da toxicidade cardíaca da domperidona com prolongamento de QTc e arritmogênese ventricular.',
        pharmacologicalMechanism:
          'Inibição pronunciada do CYP3A e potencial aditivo direto sobre o retardo da repolarização da fase 3 do miocárdio.',
      },
      {
        drugOrClass: 'Antiarrítmicos classes IA e III (Quinidina, Procainamida, Amiodarona, Sotalol)',
        severity: 'contraindicated',
        clinicalEffect:
          'Somação aditiva perigosa de retardo na repolarização ventricular, ectopias ventriculares e colapso circulatório.',
        pharmacologicalMechanism:
          'Duplo bloqueio da condutância de potássio e canais rápidos de sódio miocárdicos.',
      },
      {
        drugOrClass: 'Agonistas dopaminérgicos (Cabergolina, Bromocriptina)',
        severity: 'contraindicated',
        clinicalEffect:
          'Neutralização mútua e completa dos efeitos farmacológicos de ambos os medicamentos.',
        pharmacologicalMechanism:
          'Competição direta e antagônica pelo mesmo sítio de ligação nos receptores dopaminérgicos D2.',
      },
      {
        drugOrClass: 'Outros pró-cinéticos e antieméticos prolongadores de QTc (Cisaprida, Ondansetrona, Metadona)',
        severity: 'major',
        clinicalEffect:
          'Aumento sinérgico do intervalo QTc e risco aumentado de distúrbios da condução ventricular.',
        pharmacologicalMechanism:
          'Efeito aditivo sobre o canal de potássio hERG/Kv11.1.',
      },
      {
        drugOrClass: 'Fármacos anticolinérgicos e antiespasmódicos (Atropina, Escopolamina, Butilescopolamina)',
        severity: 'moderate',
        clinicalEffect:
          'Anulação dos efeitos pró-cinéticos gastrointestinais e na pressão do esfíncter esofágico inferior.',
        pharmacologicalMechanism:
          'A domperidona promove motilidade estimulando a liberação pós-sináptica de acetilcolina; os anticolinérgicos bloqueiam os receptores muscarínicos colinérgicos no músculo liso entérico.',
      },
      {
        drugOrClass: 'Antiácidos, inibidores de bomba de prótons (Omeprazol, Pantoprazol) e anti-H2 (Famotidina)',
        severity: 'minor',
        clinicalEffect:
          'Possível diminuição na velocidade ou fração absorvida de domperidona oral.',
        pharmacologicalMechanism:
          'A elevação do pH gástrico reduz a solubilização aquosa e a taxa de dissolução da domperidona base. Recomenda-se administrar os antiácidos com intervalo de pelo menos 1 a 2 horas.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Prolongamento do intervalo QTc no ECG',
        frequency: 'common',
        mechanism:
          'Bloqueio dos canais de potássio dependentes de voltagem cardíacos IKr (hERG/Kv11.1), retardando a repolarização ventricular (Donato et al. 2024).',
        clinicalManagement:
          'Monitorar ECG em animais de risco. Em caso de aumento superior a 20% do QTc basal ou ectopias ventriculares, suspender o tratamento e corrigir eletrólitos.',
      },
      {
        effect: 'Hiperprolactinemia, galactorreia e ingurgitamento mamário',
        frequency: 'uncommon',
        mechanism:
          'Antagonismo do receptor D2 nos lactotrofos adeno-hipofisários, removendo a inibição tônica dopaminérgica e estimulando síntese láctea.',
        clinicalManagement:
          'Se ocorrer em cadelas castradas ou machos sem indicação de lactação, suspender a medicação. Os sinais revertem espontaneamente em 5 a 10 dias após a interrupção.',
      },
      {
        effect: 'Cólicas abdominais, diarreia transitória e borborigmos',
        frequency: 'common',
        mechanism:
          'Aumento agudo da atividade contrátil propulsiva gastroduodenal mediado por desinibição colinérgica.',
        clinicalManagement:
          'Administrar a medicação rigorosamente acompanhada de uma pequena porção de alimento. Geralmente é autolimitada em 48 a 72 horas.',
      },
      {
        effect: 'Reações extrapiramidais (tremores, ataxia, distonia)',
        frequency: 'rare',
        mechanism:
          'Bloqueio dopaminérgico central em casos de ruptura da barreira hematoencefálica, superdosagem massiva ou deficiência congênita de P-glicoproteína (MDR1).',
        clinicalManagement:
          'Suspender o fármaco imediatamente. Em casos sintomáticos moderados a graves, administrar difenidramina (1 a 2 mg/kg IM) para controle dos sinais extrapiramidais.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Insuficiência Hepática Moderada a Grave (Child-Pugh B ou C / Desvio Portossistêmico)',
        recommendedAdjustment:
          'Evitar o uso se houver encefalopatia hepática; em doença hepática estável, reduzir a dose em 50% ou ampliar o intervalo posológico para cada 48 horas.',
        physiologicalRationale:
          'Extenso metabolismo microssomal hepático dependente de CYP3A; a perda de massa funcional de hepatócitos retarda o clearance e favorece o acúmulo sérico e cardiotoxicidade.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Estágios Avançados (IRIS 3 e 4)',
        recommendedAdjustment:
          'Monitorar ECG e manter a posologia padrão ou reduzir a frequência para cada 48 horas se houver sinais de retenção.',
        physiologicalRationale:
          'Embora a excreção inalterada na urina seja baixa (<1%), metabólitos polares conjugados acumulam-se em uremia crônica.',
      },
      {
        clinicalCondition: 'Cães de Raças com Mutação do Gene ABCB1 (MDR1)',
        recommendedAdjustment:
          'Reduzir a dose em 25% a 50% e manter vigilância neurocomportamental estrita nas primeiras administrações.',
        physiologicalRationale:
          'Ausência de extrusão ativa pela BHE, permitindo que a domperidona alcance concentrações no parênquima cerebral.',
      },
    ],
  },

  generalInfoData: {
    pharmacologicalClassification: {
      chemicalClass: 'Derivado benzimidazolônico e fenilpiperidínico (R-33812)',
      chemicalClassDescription:
        'Molécula híbrida sintética contendo dois núcleos de benzimidazolona acoplados a um anel central de piperidina por uma ponte propílica, conferindo afinidade com o receptor D2 e reduzida penetração transmembrana na BHE.',
      therapeuticClass: 'Antiemético periférico, pró-cinético digestivo e imunomodulador por hiperprolactinemia',
      atcCode: 'A03FA03',
      receptorTargets: ['Receptor Dopaminérgico D2', 'Receptor Dopaminérgico D3', 'Canal de Potássio Cardíaco hERG/Kv11.1 (off-target)'],
    },
    prescriptionType: {
      category: 'Medicamento de Venda sob Prescrição Veterinária (Receituário Simples)',
      ordinanceOrLaw:
        'Não enquadrado na Portaria SVS/MS nº 344/98 e nem na Portaria MAPA nº 837/2025 no Brasil. Uso extrabula amparado pela Resolução CFMV nº 1.488/2022.',
      retentionRequired: false,
      guidelines:
        'Prescrever em receituário simples em 1 via para aquisição em farmácias humanas comerciais ou drogarias de manipulação veterinária no Brasil.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Prolactina como citocina imunomoduladora protetora e suscetibilidade a QTc longo',
        description:
          'Na espécie canina, os lactotrofos hipofisários respondem de modo previsível ao bloqueio D2 com hiperprolactinemia transitória que induz ativação de macrófagos pró-Th1. Contudo, os canais hERG/Kv11.1 caninos são suscetíveis ao bloqueio pelo fármaco, gerando prolongamento estatisticamente significativo do QTc no ECG (Donato et al. 2024).',
        clinicalImplications:
          'Permite a prevenção quadrimestral da leishmaniose em soronegativos, mas exige cautela com fármacos inibidores de CYP3A e monitoramento cardíaco.',
      },
      {
        species: 'cat',
        title: 'Ausência de resposta contrátil motora no antro gástrico e dados farmacocinéticos nulos',
        description:
          'Estudos manométricos de Mangel (1983) comprovaram que a domperidona não estimula as contrações antrais em gatos, além de inexistem estudos farmacocinéticos validados na espécie.',
        clinicalImplications:
          'Não prescrever rotineiramente para distúrbios digestivos em felinos; preferir maropitant, ondansetrona ou pró-cinéticos com respaldo científico comprovado.',
      },
    ],
    curiositiesAndHistory: [
      'A domperidona foi desenvolvida e sintetizada pela Janssen Pharmaceutica em 1974 sob a liderança do Dr. Paul Janssen, que buscava criar um antiemético potente com o bloqueio D2 da metoclopramida, mas sem as reações distônicas e extrapiramidais no sistema nervoso central.',
      'Sua consagração na medicina veterinária europeia ocorreu após estudos pioneiros do grupo do Dr. Gómez-Ochoa na Universidade de Zaragoza, descobrindo o efeito imunomodulador da hiperprolactinemia sobre Leishmania infantum, culminando no registro do Leisguard® na Europa em 2012.',
      'Apesar do uso veterinário na Europa, no Brasil a domperidona continua sendo empregada predominantemente sob uso extrabula com medicamentos humanos, sendo amplamente indicada por infectologistas e dermatologistas veterinários.',
    ],
  },

  monitoringParameters: [
    'Eletrocardiograma computadorizado (ECG): realizar traçado basal antes do início do primeiro ciclo preventivo e avaliações periódicas em cães cardiopatas ou sob regimes repetidos (avaliar intervalo QTc pelas fórmulas de Fridericia e van de Water).',
    'Triagem sorológica e/ou molecular para Leishmania infantum (ELISA, RIFI, DPP, qPCR): obrigatória antes de cada ciclo profilático de 30 dias para confirmar que o cão permanece soronegativo.',
    'Painel bioquímico renal e urinálise com UPC (relação proteína:creatinina urinária): em pacientes sob investigação de leishmaniose, para descartar glomerulonefrite subclínica precoce.',
    'Eletrólitos séricos (Potássio e Magnésio): a hipocalemia ou hipomagnesemia amplifica o risco arritmogênico por bloqueio hERG.',
    'Exame físico da cadeia mamária: monitorar aumento de volume, sensibilidade ou galactorreia durante o ciclo de 30 dias.',
  ],

  clientInformation: [
    'A domperidona atua como um "estimulador imunológico" das defesas do cão contra o parasita da leishmaniose, preparando os macrófagos para combater o protozoário transmitido pelo mosquito-palha.',
    'IMPORTANTE: A domperidona NÃO substitui a coleira repelente contra mosquitos (como coleiras à base de deltametrina) e nem o uso de inseticidas ambientais. A prevenção é sempre combinada (repelência + imunomodulação).',
    'Caso o cão apresente qualquer sinal de emagrecimento, feridas de pele que não cicatrizam, crescimento exagerado das unhas ou apatia, traga-o imediatamente para consulta veterinária.',
    'Nunca combine este medicamento com outros remédios sem a autorização expressa do médico veterinário, especialmente antifúngicos (cetoconazol, itraconazol) e remédios para o coração.',
    'Fêmeas ou machos tratados podem apresentar inchaço temporário nas mamas ou pequenas gotas de leite; esse efeito é esperado pelo aumento do hormônio prolactina e desaparece após o fim do tratamento.',
  ],

  relatedDiseaseSlugs: ['leishmaniose-caes-gatos'],
};
