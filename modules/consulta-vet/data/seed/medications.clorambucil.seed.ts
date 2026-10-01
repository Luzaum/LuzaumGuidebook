import { MedicationRecord } from '../../types/medication';

export const clorambucilMedicationRecord: MedicationRecord = {
  id: 'med-clorambucil',
  slug: 'clorambucil',
  title: 'Clorambucil (Clorambucila)',
  activeIngredient: 'Clorambucil (ácido 4-[bis(2-cloroetil)amino]benzenobutanoico)',
  isControlled: false,
  tradeNames: [
    'Leukeran® 2 mg Comprimidos Revestidos (Aspen Pharma — Frasco com 25 comprimidos, MS 1.3764.0148)',
    'Clorambucila 2 mg Comprimidos Revestidos Genéricos / Referência Internacional',
    'Clorambucil Cápsulas Manipuladas Magistrais de Alta Precisão (Farmácia Especializada em Citotóxicos)',
    'Chlorambucil Tablets 2 mg USP / BP (Apresentações Internacionais)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/chlorambucil/PNG',
  pharmacologicClass:
    'Antineoplásico citotóxico alquilante; mostarda nitrogenada aromática bifuncional; imunossupressor celular de ação lenta e agente metronômico',
  species: ['dog', 'cat'],
  category: 'oncologia',
  tags: [
    'Clorambucil',
    'Clorambucila',
    'Leukeran',
    'Mostarda Nitrogenada',
    'Agente Alquilante',
    'Linfoma Felino',
    'Small Cell Lymphoma',
    'Leucemia Linfocítica Crônica',
    'PLE Canina',
    'Consenso ACVIM 2026',
    'Quimioterapia Metronômica',
    'Quimioterapia Oral',
    'Citotóxico',
    'Receita Simples',
  ],

  mechanismOfAction:
    'O clorambucil é um antineoplásico alquilante oral pertencente à classe das mostardas nitrogenadas aromáticas bifuncionais. Sua molécula possui um núcleo aromático ligado a dois grupamentos 2-cloroetil em um átomo de nitrogênio terciário. Por meio de uma reação intramolecular espontânea de ciclização, o cloro terminal é clivado com liberação de cloreto e formação de um intermediário carbocátion cíclico altamente reativo e eletrofílico denominado íon aziridínio. Esse intermediário ataca nucleófilos celulares com elevada afinidade, principalmente a posição N7 da base nitrogenada guanina na cadeia de DNA. Devido à sua natureza bifuncional (presença de dois braços cloroetil reativos), a extremidade oposta da molécula reage subsequentemente com uma segunda base púrica na fita de DNA oposta ou na mesma fita, gerando ligações cruzadas covalentes irreversíveis (cross-links interfita e intrafita). As ligações cruzadas interfita impedem mecanicamente a separação das fitas de DNA pela DNA-helicase durante as fases de replicação e transcrição gênica, deflagrando a parada da DNA-polimerase e o colapso irreversível da forquilha de replicação. O acúmulo dessas lesões ativa os sensores quinase ATM/ATR da cascata de resposta a dano no DNA e os pontos de checagem do ciclo celular, culminando na ativação da via intrínseca de apoptose. Embora seja classificado farmacologicamente como um agente ciclo celular inespecífico (cell-cycle non-specific / CCNS) capaz de alquilar o DNA em repouso (G0), sua toxicidade letal se manifesta de forma desproporcional nas células com alta taxa de proliferação e divisão ativa — tais como linfócitos neoplásicos, células-tronco precursoras hematopoiéticas na medula óssea, enterócitos e linhagens germinativas. Seu efeito imunossupressor deriva da inibição mecânica da expansão clonal de linfócitos T e B estimulados antigenicamente, exigindo de 2 a 4 semanas para esgotar populações linfocitárias maduras e manifestar benefício terapêutico pleno. Adicionalmente, quando administrado em regime metronômico contínuo em baixas doses (4 mg/m² VO q24h), exerce citotoxicidade seletiva sobre células endoteliais em angiogênese tumoral, inibe precursores endoteliais circulantes da medula óssea e reduz a contagem de linfócitos T reguladores (Tregs), suprimindo o suporte vascular e a imunotolerância tumoral.',

  plainLanguageSummary:
    'O clorambucil é um quimioterápico citotóxico oral da classe das mostardas nitrogenadas alquilantes utilizado em cães e gatos principalmente para o controle de neoplasias linfóides de evolução lenta, com destaque absoluto para o linfoma intestinal de pequenas células em felinos, além de atuar como imunossupressor em enteropatias com perda proteica graves e em protocolos de quimioterapia metronômica de baixa dose contínua. Ele não atua como um imunossupressor comum ou leve, mas sim grampeando e quebrando quimicamente o DNA das células que tentam se multiplicar rapidamente, impedindo a divisão de linfócitos cancerígenos e reduzindo gradualmente as defesas imunes hiperativas ao longo de duas a quatro semanas de tratamento contínuo. Devido ao seu potente mecanismo destrutivo sobre células em divisão, o principal órgão afetado de forma indesejada é a medula óssea, o que torna obrigatório o acompanhamento frequente do hemograma para monitorar a queda de glóbulos brancos e plaquetas, além de exigir exames de urina de rotina nos gatos para identificar precocemente uma falha rara nos rins chamada Síndrome de Fanconi, caracterizada pelo aparecimento de glicose na urina com taxa de açúcar normal no sangue. Por ser um medicamento quimioterápico perigoso e mutagênico para seres humanos, os comprimidos revestidos de dois miligramas devem ser mantidos estritamente sob refrigeração na embalagem original, nunca podem ser partidos, mastigados, triturados ou colocados em alimentos em casa, e devem ser manipulados com luvas descartáveis pelo tutor, sendo formalmente proibido o manuseio por mulheres grávidas ou que estejam amamentando.',

  pillars: [
    {
      title: 'Alquilação Bifuncional & Grampeamento Covalente do DNA',
      icon: 'Shield',
      desc: 'Formação espontânea do intermediário íon aziridínio que reage com a guanina N7 gerando pontes cruzadas interfita irreversíveis que travam a replicação e disparam apoptose.',
    },
    {
      title: 'A Medula Paga o Preço: Mielossupressão Limitante & Cumulativa',
      icon: 'Zap',
      desc: 'Toxicidade órgão-limitante direta sobre precursores hematopoiéticos da medula óssea; nadir inicial em 7 a 14 dias com risco de supressão crônica cumulativa e lenta recuperação.',
    },
    {
      title: 'Pequenas Células, Grandes Respostas: O Grande Nicho Felino',
      icon: 'Heart',
      desc: 'Tratamento padrão-ouro do linfoma intestinal felino de pequenas células (baixo grau T), alcançando taxas de remissão superiores a 85-95% e sobrevidas medianas de anos com prednisolona.',
    },
    {
      title: 'Quimioterapia Metronômica & Modulação Imunológica Lenta',
      icon: 'AlertTriangle',
      desc: 'Em doses baixas contínuas (4 mg/m² q24h) inibe a angiogênese tumoral e Tregs; como imunossupressor requer 2 a 4 semanas para remodelar populações linfocitárias.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Risco Ocupacional e Manipulação Citotóxica: Proibição Absoluta de Partir ou Esmagar',
      text: 'O clorambucil é quimioterapia citotóxica verdadeira com propriedades mutagênicas, teratogênicas e carcinogênicas comprovadas. A bula oficial do Leukeran 2 mg e compêndios veterinários internacionais determinam que o comprimido revestido deve ser administrado estritamente inteiro, sendo expressamente proibido partir, esmagar, triturar ou pulverizar o comprimido em casa. A quebra libera pó citotóxico inalável e aerossolizado altamente perigoso para o tutor e o ambiente. O tutor deve administrar o comprimido com luvas descartáveis de procedimento e lavar as mãos. Gestantes, mulheres em planejamento reprodutivo e lactantes não devem manipular o medicamento sob nenhuma circunstância.',
    },
    {
      label: 'Diferenciação Crítica entre mg/m² e mg/kg: Prevenção de Superdose Letal',
      text: 'Em medicina veterinária, doses de clorambucil para cães são frequentemente expressas em miligramas por metro quadrado de superfície corporal (mg/m²) e não por quilograma de peso corporal (mg/kg). Confundir 4 mg/m² com 4 mg/kg em um cão de 20 kg resultaria na administração de 80 mg em vez de aproximadamente 3 mg diários — uma superdose letal superior a 26 vezes a faixa terapêutica, induzindo aplasia medular fulminante, hemorragias e colapso irreversível. Sempre utilizar calculadoras validadas de área corporal (BSA ≈ 0,101 x Peso^0,67).',
    },
    {
      label: 'Mielossupressão Tardia e Limiares de Interrupção Hematológica',
      text: 'A mielossupressão é a principal toxicidade limitante do clorambucil. O nadir de neutrófilos e plaquetas costuma ocorrer entre 7 e 14 dias em esquemas pulsados, mas no tratamento contínuo pode manifestar-se como supressão tardia e cumulativa com recuperação medular prolongada de semanas a meses. A terapia deve ser temporariamente suspensa se a contagem absoluta de neutrófilos cair abaixo de 2.000/µL (ou < 1.500/µL em protocolos metronômicos) ou se as plaquetas forem inferiores a 50.000/µL (ou < 100.000/µL). Neutropenia associada a febre é uma emergência médica que exige internação e antibióticos parenterais imediatos.',
    },
    {
      label: 'Síndrome de Fanconi Adquirida e Neurotoxicidade em Felinos',
      text: 'Gatos sob terapia crônica com clorambucil podem desenvolver disfunção do túbulo renal proximal (Síndrome de Fanconi adquirida; Reinert & Feldman 2016). O sinal diagnóstico característico é o achado de glicosúria na presença de glicemia sérica rigorosamente normal; a realização de urinálise periódica com fita reagente é indispensável para evitar o diagnóstico incorreto de diabetes mellitus. Caso identificada, a descontinuação do clorambucil reverte a tubulopatia em semanas. Além disso, sinais neurológicos como mioclonia, fasciculações musculares e convulsões podem ocorrer por toxicidade no SNC, exigindo suspensão imediata.',
    },
    {
      label: 'Recomendação Forte do Consenso ACVIM 2026 para PLE Canina Refratária',
      text: 'O Consenso Internacional ACVIM sobre Enteropatia Inflamatória Crônica Canina (JVIM 2026) endossou uma recomendação clínica forte para a introdução de clorambucil (2 a 4 mg/m² VO q24h) associado à prednisolona em cães com enteropatia perdedora de proteínas (PLE) que falharam à intervenção dietética com proteínas hidrolisadas e corticosteroides. O estudo seminal de Dandrieux et al. (2013) demonstrou incremento superior da albumina sérica e maior taxa de sobrevida com o esquema clorambucil + prednisolona em relação à azatioprina + prednisolona.',
    },
  ],

  indications: [
    'Tratamento padrão-ouro de primeira linha do linfoma intestinal felino de pequenas células / baixo grau (Small-Cell Alimentary Lymphoma) associado à prednisolona.',
    'Enteropatia crônica com perda proteica (PLE) em cães refratários à dieta hidrolisada e corticosteroides (Recomendação Forte do Consenso ACVIM 2026).',
    'Quimioterapia metronômica de baixa dose contínua em cães com carcinoma urotelial (de células transicionais), sarcomas de tecidos moles e neoplasias vasculares.',
    'Tratamento de indução e manutenção da leucemia linfocítica crônica (LLC) e neoplasias linfóides indolentes em cães e gatos.',
    'Tratamento imunossupressor de segunda linha em doenças autoimunes refratárias (pênfigo foliáceo, poliartrite imunomediada, DBAI) e alternativa segura à azatioprina em felinos.',
    'Substituição da ciclofosfamida em protocolos quimioterápicos caninos (como CHOP) em pacientes que desenvolveram cistite hemorrágica estéril induzida por acroleína.',
  ],

  quickIndications: [
    {
      condition: 'Linfoma Intestinal Felino de Pequenas Células / Baixo Grau',
      species: 'cat',
      doseSummary: '2 mg por gato VO q48h (≥ 4 kg) ou q72h (< 4 kg) associado a prednisolona oral',
      route: 'Oral (VO)',
      duration: 'Tratamento oncológico prolongado (frequentemente 12 meses ou contínuo se resposta completa mantida)',
      clinicalContext: 'Gatos com espessamento muscular intestinal difuso e infiltração de pequenos linfócitos T CD3+.',
    },
    {
      condition: 'Enteropatia Perdedora de Proteínas (PLE) Canina Refratária',
      species: 'dog',
      doseSummary: '2 a 4 mg/m² VO a cada 24 horas (q24h) associado a prednisolona (Consenso ACVIM 2026)',
      route: 'Oral (VO)',
      duration: 'Até elevação sustentada da albumina sérica; reduzir gradualmente dose ou estender intervalo',
      clinicalContext: 'Cães com hipoalbuminemia grave e enteropatia inflamatória com resposta insatisfatória a corticoide isolado.',
    },
    {
      condition: 'Quimioterapia Metronômica Canina (Carcinoma Urotelial / Sarcomas)',
      species: 'dog',
      doseSummary: '4 mg/m² VO a cada 24 horas (q24h) de forma contínua sem interrupções planejadas',
      route: 'Oral (VO)',
      duration: 'Uso contínuo enquanto houver controle tumoral / estabilização sem toxicidade medular',
      clinicalContext: 'Terapia antiangiogênica crônica ambulatorial; não aumentar para 6 a 8 mg/m².',
    },
    {
      condition: 'Leucemia Linfocítica Crônica (LLC) e Linfoma Indolente Canino',
      species: 'dog',
      doseSummary: '2 a 6 mg/m² VO q24h inicialmente até remissão; reduzir para manutenção (BSAVA 10ª ed.)',
      route: 'Oral (VO)',
      duration: 'Ajustado conforme contagem de linfócitos circulantes e infiltração esplênica/medular',
      clinicalContext: 'Cães idosos com linfocitose clonal madura persistente e acometimento medular.',
    },
    {
      condition: 'Doenças Imunomediadas Refratárias em Cães (Pênfigo Foliáceo)',
      species: 'dog',
      doseSummary: '0,1 a 0,2 mg/kg VO a cada 24 a 48 horas (q24-48h) ou 2 a 4,5 mg/m² q24-48h',
      route: 'Oral (VO)',
      duration: 'Latência de 2 a 4 semanas para início de ação imunossupressora efetiva',
      clinicalContext: 'Poupador de corticoide em dermatopatias autoimunes caninas com intolerância à azatioprina.',
    },
  ],

  contraindications: [
    'Mielossupressão grave pré-existente (neutropenia absoluta < 1.500/µL, trombocitopenia < 50.000/µL, hipoplasia medular ou pancitopenia).',
    'Infecção bacteriana, fúngica, protozoária ou viral ativa não controlada ou sepse clínica.',
    'Fêmeas gestantes ou em lactação (risco comprovado de teratogenicidade, malformações fetais e perda embrionária; categoria D/X).',
    'Hipersensibilidade conhecida à clorambucila ou a qualquer excipiente da formulação comercial.',
    'Histórico prévio de neurotoxicidade induzida por clorambucil (mioclonia severa ou crises convulsivas).',
    'Linfoma multicêntrico de alto grau (linfoma de grandes células) como monoterapia ou primeira linha — prognóstico desfavorável; requer protocolos combinados agressivos (CHOP).',
  ],

  cautions: [
    '🚨 MEDICAMENTO CITOTÓXICO PERIGOSO — Proibição absoluta de triturar, partir, abrir ou manipular comprimidos em ambiente doméstico.',
    'Manuseio restrito: manipulação com luvas descartáveis de procedimento; contraindicado o contato com gestantes e lactantes.',
    'Diferenciação mandatória entre mg/m² e mg/kg: o erro de prescrição pode causar uma superdose letal superior a 25 vezes.',
    'Armazenamento sob refrigeração estrita de 2°C a 8°C na embalagem original; proteger contra acesso acidental de crianças e animais.',
    'Doença renal crônica e nefropatias felinas: monitorar urinálise periódica com fita reagente para detecção precoce de Síndrome de Fanconi (glicosúria normoglicêmica).',
    'Hepatopatias preexistentes: o metabolismo é intensamente hepático; acompanhar transaminases (ALT/AST) e bilirrubinas.',
    'Hipoalbuminemia acentuada (comum em PLE e linfoma intestinal): pode elevar a fração livre do fármaco e acentuar riscos tóxicos.',
    'Suspensões aquosas manipuladas são extremamente instáveis (perda de ~66% da potência em 7 dias em temperatura ambiente); preferir comprimidos comerciais inteiros de 2 mg.',
  ],

  adverseEffects: [
    'Mielossupressão dose-dependente e cumulativa: neutropenia, trombocitopenia, anemia arregenerativa, linfopenia e pancitopenia prolongada.',
    'Efeitos gastrointestinais: anorexia, náuseas, vômitos e episódios de diarreia (geralmente leves a moderados em doses diárias/baixas).',
    'Hepatotoxicidade: elevação de enzimas hepáticas (ALT, AST, FA) e colestase (graus III e IV relatados em até 10,7% dos gatos; Pope et al. 2015).',
    'Neurotoxicidade felina idiossincrática: tremores musculares, mioclonia, fasciculações, hiperestesia, ataxia e convulsões (Benitah et al. 2003).',
    'Síndrome de Fanconi tubular renal adquirida em felinos: glicosúria normoglicêmica, aminoacidúria e perda de solutos tubulares (Reinert & Feldman 2016).',
    'Predisposição aumentada a infecções oportunistas secundárias em decorrência da imunossupressão prolongada.',
    'Atraso na cicatrização de feridas e alopecia parcial transitória (especialmente em raças de crescimento contínuo de pelo como Poodle e Schnauzer).',
    'Potencial mutagênico e carcinogênico tardio: risco biológico de desenvolvimento de neoplasias secundárias com exposições crônicas prolongadas.',
  ],

  interactions: [
    'Outros Agentes Mielossupressores Citotóxicos (Azatioprina, Ciclofosfamida, Lomustina, Doxorrubicina, Carboplatina): Somação de citotoxidade medular profunda. A associação simultânea fora de protocolos combinados pré-definidos aumenta drasticamente o risco de neutropenia febril e pancitopenia.',
    'Corticosteroides Sistêmicos (Prednisolona, Dexametasona): Interação sinérgica e intencional no tratamento do linfoma felino e doenças imunomediadas. Embora não haja competição enzimática metabólica desfavorável, a imunossupressão aditiva exige vigilância contínua contra infecções oportunistas.',
    'Radioterapia Externa em Campos Hematopoiéticos: A irradiação simultânea ou recente de grandes ossos planos e vértebras acentua a depleção de células progenitoras medulares, precipitando aplasia grave.',
    'Vacinas Vivas Modificadas: Contraindicação absoluta durante o tratamento e por pelo menos 3 meses após a descontinuação, devido ao risco de replicação vacinal descontrolada e falência de resposta imune protetora.',
    'Alimentos e Refeições: Em humanos, a ingestão com alimentos reduz a Cmax e a AUC do clorambucil. Bula humana e VIN preconizam administração em jejum (1 hora antes ou 3 horas após refeição); o BSAVA 10ª ed. sugere oferta com alimento para mitigar náusea. Recomenda-se manter consistência na rotina alimentar e não alternar diariamente.',
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção gastrointestinal rápida e expressiva após administração oral. Em estudo farmacocinético populacional contemporâneo em 24 gatos com neoplasias linfóides indolentes (Al-Nadaf et al., 2022, AJVR), a administração de 2 mg por gato produziu pico de concentração plasmática máxima (Cmax) médio de ~170 ng/mL em tempo extremamente precoce (Tmax aproximado de 15 minutos). A biodisponibilidade oral em humanos situa-se entre 50% e 70%; em cães e gatos, a biodisponibilidade absoluta precisa ainda não foi formalmente estabelecida por comparação com curvas IV. O alimento retarda e diminui a absorção em humanos, mas estudos comparativos de desfecho clínico com dietas em animais de companhia ainda são escassos.',
    distribution:
      'Elevada taxa de ligação a proteínas plasmáticas (superior a 90% a 99%, ligando-se predominantemente à albumina sérica). Em pacientes com enteropatia perdedora de proteínas (PLE) ou linfoma intestinal grave com hipoalbuminemia acentuada, a fração livre circulante teoricamente aumenta, elevando o volume de distribuição e a penetração tecidual. Atravessa a placenta com facilidade (efeitos teratogênicos). A penetração na barreira hematoencefálica é relativamente modesta sob condições basais, porém metabólitos neuroativos e produtos de clivagem (cloroacetaldeído) são capazes de induzir efeitos centrais como mioclonias.',
    metabolism:
      'Metabolismo extensivo e predominantemente hepático. O fármaco parental sofre reação de beta-oxidação da sua cadeia lateral butírica, gerando o metabólito ativo principal phenylacetic acid mustard (PAAM / mostarda do ácido fenilacético), que também exibe potente atividade alquilante citotóxica e meia-vida ligeiramente superior. Ao contrário de formulações anteriores que o descreviam como pró-fármaco inerte, tanto o clorambucil quanto o PAAM são agentes alquilantes ativos in vivo. Vias secundárias incluem conjugação direta com a glutationa intracelular (catalisada por GSTs), descloração hidrolítica e degradação oxidativa.',
    elimination:
      'A eliminação renal da molécula intacta de clorambucil e do PAAM livre é negligenciável (menos de 1% excretado na urina em 24 horas). Mais de 50% a 60% da dose administrada é excretada por via urinária na forma de metabólitos inativos conjugados. Em felinos, a meia-vida plasmática terminal do clorambucil parental é curta, de aproximadamente 1,8 hora (Al-Nadaf et al., 2022). Em humanos, a meia-vida é de cerca de 1,5 h para o clorambucil e de 2,5 h para o PAAM. A duração da eficácia antitumoral e imunossupressora não depende da persistência plasmática da droga, decorrendo da formação duradoura de ligações cruzadas covalentes irreversíveis no DNA.',
  },

  doses: [
    {
      id: 'dose-chlorambucil-cat-small-cell-lymphoma',
      species: 'cat',
      indication: 'Linfoma intestinal felino de pequenas células / baixo grau (protocolo contínuo padrão-ouro)',
      doseMin: 2.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q48–72h',
      duration: 'Tratamento prolongado (frequentemente 12 meses ou contínuo se mantida resposta completa)',
      notes:
        'Protocolo canônico padrão para linfoma intestinal T de pequenas células: 2 mg por gato a cada 48 horas (gatos ≥ 4 kg) ou a cada 72 horas (ou segunda/quarta/sexta para gatos < 4 kg). Administrar o comprimido comercial de 2 mg inteiro sem partir. Associar obrigatoriamente a prednisolona (1 a 2 mg/kg/dia inicial com redução gradual). Taxas de resposta global de 85% a 96% e sobrevidas medianas de 700 a 1300 dias (Kiselow 2008, Stein 2010, Pope 2015). Monitorar hemograma quinzenal no início, ALT e glicose urinária (Fanconi).',
      calculatorEnabled: false,
      referenceIds: ['ref-kiselow-2008', 'ref-stein-2010', 'ref-pope-2015', 'ref-al-nadaf-2022', 'ref-plumb-10'],
    },
    {
      id: 'dose-chlorambucil-cat-small-cell-pulse',
      species: 'cat',
      indication: 'Linfoma intestinal felino de pequenas células — protocolo em pulso quinzenal',
      doseMin: 20.0,
      doseMax: 20.0,
      doseUnit: 'mg/m²',
      perWeightUnit: 'm²',
      route: 'VO',
      frequency: 'q14d',
      duration: 'Ciclos a cada 14 dias condicionados a neutrófilos > 2.000/µL e plaquetas > 50.000/µL',
      notes:
        'Protocolo de pulso alternativo em felinos: 20 mg/m² VO em dose única a cada 14 dias (ou 15 mg/m² VO q24h por 4 dias consecutivos repetido a cada 3 semanas), associado a prednisolona. Nunca sobrepor ou misturar regimes de pulso com regimes diários/em dias alternados. Exige formulação magistral fracionada de alta exatidão em farmácia oncológica.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-chlorambucil-dog-ple-acvim2026',
      species: 'dog',
      indication: 'Enteropatia perdedora de proteínas (PLE) canina refratária (Recomendação Forte Consenso ACVIM 2026)',
      doseMin: 2.0,
      doseMax: 4.0,
      doseUnit: 'mg/m²',
      perWeightUnit: 'm²',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Indução até normalização da albumina sérica; reduzir gradualmente dose/frequência para manutenção',
      notes:
        'Recomendação Forte do Consenso Internacional ACVIM 2026 sobre Enteropatia Inflamatória Crônica em cães que falharam à dieta hidrolisada e corticosteroides: 2 a 4 mg/m² VO a cada 24 horas associado a prednisolona. Substitui as faixas empíricas históricas mais tóxicas de 4 a 6 mg/m². Dandrieux et al. (2013) comprovaram ganho superior de albumina e peso comparado à azatioprina.',
      calculatorEnabled: false,
      referenceIds: ['ref-acvim-ple-2026', 'ref-dandrieux-2013', 'ref-plumb-10'],
    },
    {
      id: 'dose-chlorambucil-dog-metronomic',
      species: 'dog',
      indication: 'Quimioterapia metronômica canina e carcinoma urotelial / tumores estromais',
      doseMin: 4.0,
      doseMax: 4.0,
      doseUnit: 'mg/m²',
      perWeightUnit: 'm²',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Uso contínuo diário enquanto houver controle tumoral / estabilização sem toxicidade',
      notes:
        'Posologia metronômica padrão: 4 mg/m² VO a cada 24 horas contínuo. Alvos antiangiogênicos e imunomoduladores sobre o estroma tumoral e redução de células T reguladoras (Tregs). Doses maiores de 6 a 8 mg/m² demonstraram aumento de toxicidade sem ganho de eficácia antitumoral (London et al. 2016). Leach et al. (2012) demonstraram 47% de estabilização de doença.',
      calculatorEnabled: false,
      referenceIds: ['ref-leach-2012', 'ref-schrempp-2013', 'ref-london-2016', 'ref-plumb-10'],
    },
    {
      id: 'dose-chlorambucil-dog-cll-bsava',
      species: 'dog',
      indication: 'Leucemia linfocítica crônica (LLC) e neoplasias linfóides indolentes caninas',
      doseMin: 2.0,
      doseMax: 6.0,
      doseUnit: 'mg/m²',
      perWeightUnit: 'm²',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Fase de indução até controle da linfocitose clonal; reduzir dose ou espaçar para dias alternados',
      notes:
        'Regime clássico de indução: 2 a 6 mg/m² VO a cada 24 horas (ou 0,2 mg/kg VO q24h por 7 a 14 dias seguido de 0,1 mg/kg q24h como manutenção). Associar a prednisolona. Monitorar hemograma completo a cada 14 a 28 dias.',
      calculatorEnabled: false,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10'],
    },
    {
      id: 'dose-chlorambucil-dog-chop-substitute',
      species: 'dog',
      indication: 'Substituto da ciclofosfamida em protocolos CHOP após cistite hemorrágica estéril',
      doseMin: 1.4,
      doseMax: 1.4,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'Dose única no dia programado do ciclo',
      duration: 'Administrado exclusivamente nos ciclos correspondentes à substituição da ciclofosfamida',
      notes:
        'Indicação específica de resgate e substituição: 1,4 mg/kg VO em dose única substituindo a ciclofosfamida nos dias do protocolo em que esta foi descontinuada devido ao desenvolvimento de cistite hemorrágica estéril induzida por acroleína.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-chlorambucil-dog-imd-general',
      species: 'dog',
      indication: 'Doenças imunomediadas refratárias em cães (pênfigo foliáceo, poliartrite, DBAI)',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24–48h',
      duration: 'Indução por 4 a 8 semanas até remissão; reduzir gradualmente para q48–72h na manutenção',
      notes:
        'Faixa posológica para imunossupressão lenta em cães: 0,1 a 0,2 mg/kg VO a cada 24 a 48 horas (ou ~2 a 4,5 mg/m² q24-48h). O início da imunossupressão efetiva demora de 2 a 4 semanas. Requer associação inicial com corticoide.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-chlorambucil-cat-imd-general',
      species: 'cat',
      indication: 'Doenças imunomediadas felinas (pênfigo foliáceo, granuloma eosinofílico grave)',
      doseMin: 2.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q48–72h',
      duration: 'Indução por 4 a 6 semanas; transição para menor frequência eficaz após controle',
      notes:
        'Posologia fixa para gatos com pênfigo ou dermatopatias autoimunes graves: 2 mg por gato a cada 48 horas (animais ≥ 4 kg) ou a cada 72 horas (animais < 4 kg). Alternativa muito mais segura que a azatioprina (que é altamente letal em gatos). Monitorar hemograma, ALT e glicose urinária (Fanconi).',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-reinert-2016'],
    },
  ],

  monitoringParameters: [
    'Hemograma completo com contagem de plaquetas e contagem absoluta de neutrófilos: realizar contagem basal antes do início, repetir em 7 a 14 dias (nadir) e a cada 2 a 4 semanas nos primeiros 3 meses. Em animais estáveis a longo prazo, monitorar a cada 4 a 8 semanas.',
    'Limiares de segurança hematológica: suspender imediatamente a medicação se neutrófilos totais < 2.000/µL (< 1.500/µL em metronômico) ou plaquetas < 50.000/µL (< 100.000/µL em metronômico). Avaliar prontamente febre ou prostração como indicativo de emergência infecciosa.',
    'Bioquímica hepática completa (ALT, AST, FA, GGT e bilirrubinas): monitorar a cada 4 a 8 semanas. Em séries felinas, hepatotoxicidade clinicamente relevante de grau III/IV ocorre em cerca de 10% dos pacientes (Pope et al. 2015), exigindo redução de dose ou descontinuação.',
    'Urinálise de rotina periódica em felinos (fita reagente): avaliar sistematicamente a presença de glicosúria. A identificação de glicosúria na presença de glicemia sérica normal é o marcador patognomônico de Síndrome de Fanconi adquirida por toxicidade tubular proximal (Reinert & Feldman 2016).',
    'Exame clínico neurológico seriado em felinos: questionar ativamente o tutor quanto a contrações musculares involuntárias, mioclonias palpebrais ou auriculares, tremores de cabeça e crises convulsivas (Benitah et al. 2003).',
    'Avaliação da resposta tumoral e escore clínico: em linfoma de pequenas células felino, monitorar ganho de peso, vômitos, consistência fecal, espessamento da alça intestinal por ultrassonografia seriada e níveis séricos de cobalamina (vitamina B12).',
  ],

  clientInformation: [
    'Medicamento Quimioterápico Perigoso: O clorambucil é uma quimioterapia citotóxica verdadeira. Ele destrói células tumorais e atua sobre o sistema imune, mas pode ser perigoso para seres humanos se manipulado sem os devidos cuidados.',
    'Não partir os comprimidos: O comprimido de Leukeran® 2 mg deve ser engolido estritamente inteiro. NUNCA parta, quebre, triture, mastigue ou dissolva o comprimido na água ou na comida. Isso evita a liberação de poeira tóxica no ar e na sua casa.',
    'Use luvas descartáveis: Ao administrar o medicamento na boca do seu animal, use luvas descartáveis e lave bem as mãos com água e sabão logo em seguida. Nunca coma, beba ou toque nos olhos durante o manuseio.',
    'Atenção para gestantes: Mulheres grávidas, com suspeita de gravidez ou que estejam amamentando NÃO devem manipular este medicamento sob nenhuma hipótese devido ao alto risco para o feto.',
    'Onde guardar: Guarde o frasco bem fechado dentro da geladeira, em temperatura de 2°C a 8°C, longe de alimentos, de crianças e de outros animais da casa.',
    'Cuidado com as fezes e urina: Durante o tratamento e por até 48 horas após a última dose, use luvas e recolha as fezes e a areia da caixinha de areia em sacos plásticos duplos antes de descartar no lixo.',
    'Exames de sangue são indispensáveis: Nunca atrase os hemogramas agendados. O medicamento pode baixar os glóbulos brancos e as plaquetas sem que o animal aparente estar doente no início.',
    'Sinais de alerta: Entre em contato imediato com a clínica se o animal apresentar febre, fraqueza severa, manchas vermelhas ou roxas na pele/gengiva, vômitos, tremores musculares ou convulsões.',
  ],

  references: [
    {
      id: 'ref-al-nadaf-2022',
      citationText:
        'Al-Nadaf S, Wittenburg LA, Skorupski KA, Burton JH. Population pharmacokinetics identifies rapid gastrointestinal absorption and plasma clearance of oral chlorambucil administered to cats with indolent lymphoproliferative malignancies. Am J Vet Res. 2022;83(11):ajvr.22.06.0102. doi:10.2460/ajvr.22.06.0102.',
      sourceType: 'Ensaio clínico farmacocinético populacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36155936/',
      notes: 'Estudo pioneiro em 24 gatos demonstrando Tmax ultrarrápido (~15 min), Cmax de ~170 ng/mL e meia-vida terminal de 1,8 h após dose oral de 2 mg.',
      evidenceLevel: 'Nível I — Farmacocinética clínica veterinária prospectiva',
    },
    {
      id: 'ref-kiselow-2008',
      citationText:
        'Kiselow MA, Rassnick KM, McDonough SP, Goldstein RE, Simpson KW, Weinkle TK, Erb HN. Outcome of cats with low-grade lymphocytic lymphoma: 41 cases (1995-2005). J Am Vet Med Assoc. 2008;232(3):405-410. doi:10.2460/javma.232.3.405.',
      sourceType: 'Estudo clínico observacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18241108/',
      notes: 'Consolidou o esquema clorambucil + prednisolona no linfoma felino de baixo grau: resposta global de 95% e mediana de sobrevida de 704 dias.',
      evidenceLevel: 'Nível II — Estudo observacional histórico seminal',
    },
    {
      id: 'ref-stein-2010',
      citationText:
        'Stein TJ, Pellin M, Steinberg H, Chun R. Treatment of feline gastrointestinal small-cell lymphoma with chlorambucil and glucocorticoids. J Am Anim Hosp Assoc. 2010;46(6):413-417. doi:10.5326/0460413.',
      sourceType: 'Estudo clínico retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21041334/',
      notes: 'Avaliou 28 gatos com linfoma intestinal de pequenas células com biópsia intestinal completa, registrando taxa de resposta clínica de 96% e remissão mediana de 786 dias.',
      evidenceLevel: 'Nível II — Série clínica multicêntrica',
    },
    {
      id: 'ref-pope-2015',
      citationText:
        'Pope KV, Tun AE, McNeill CJ, Brown DC, Krick EL. Outcome and toxicity assessment of feline small cell lymphoma: 56 cases (2000-2010). Vet Med Sci. 2015;1(2):51-62. doi:10.1002/vms3.9.',
      sourceType: 'Estudo clínico de desfecho e toxicidade',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29067174/',
      notes: 'Avaliando 56 gatos, reportou resposta de 85,7%, PFS mediano de 1078 dias e sobrevida mediana de 1317 dias; detectou hepatotoxicidade grau III/IV em 10,7%.',
      evidenceLevel: 'Nível II — Coorte clínica retrospectiva',
    },
    {
      id: 'ref-acvim-ple-2026',
      citationText:
        'Allenspach K, Dandrieux JRS, Gaschen F, Jergens AE, Kook PH, Marks SL, Simpson KW, Suchodolski JS. ACVIM-endorsed consensus statement and systematic review on chronic inflammatory enteropathy in dogs. J Vet Intern Med. 2026;40(1):aalaf017. doi:10.1093/jvimsj/aalaf017.',
      sourceType: 'Consenso Internacional Especializado ACVIM',
      url: 'https://doi.org/10.1093/jvimsj/aalaf017',
      notes: 'Recomendação Forte para o uso de clorambucil (2 a 4 mg/m² VO q24h) associado a prednisolona em cães com enteropatia com perda proteica (PLE) refratários a dieta e corticosteroide.',
      evidenceLevel: 'Consenso de Especialistas ACVIM / Revisão Sistemática',
    },
    {
      id: 'ref-dandrieux-2013',
      citationText:
        'Dandrieux JRS, Noble PJM, Scase TJ, Cripps PJ, German AJ. Comparison of a chlorambucil-prednisolone combination with an azathioprine-prednisolone combination for treatment of chronic enteropathy with concurrent protein-losing enteropathy in dogs: 27 cases (2007-2010). J Am Vet Med Assoc. 2013;242(12):1705-1714. doi:10.2460/javma.242.12.1705.',
      sourceType: 'Estudo clínico comparativo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23725434/',
      notes: 'Demonstrou que o clorambucil superou expressivamente a azatioprina em cães com PLE grave, proporcionando maior elevação da albumina e maior sobrevida.',
      evidenceLevel: 'Nível II — Estudo comparativo controlado histórico',
    },
    {
      id: 'ref-leach-2012',
      citationText:
        'Leach TN, Childress MO, Greene SN, Mohamed AS, Ramos-Vara JA, Dhawan D, Knapp DW. Prospective trial of metronomic chlorambucil chemotherapy in dogs with naturally occurring cancer. Vet Comp Oncol. 2012;10(2):102-112. doi:10.1111/j.1476-5829.2011.00280.x.',
      sourceType: 'Ensaio clínico prospectivo metronômico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/22236329/',
      notes: 'Ensaio clínico prospectivo em 36 cães com neoplasias espontâneas recebendo 4 mg/m² q24h, demonstrando 47% de estabilização de doença e perfil seguro.',
      evidenceLevel: 'Nível II — Ensaio clínico prospectivo',
    },
    {
      id: 'ref-schrempp-2013',
      citationText:
        'Schrempp DR, Childress MO, Stewart JC, Leach TN, Tan KM, Abbo AH, de Gortari AE, Bonney PL, Knapp DW. Metronomic chlorambucil chemotherapy in 31 dogs with transitional cell carcinoma of the urinary bladder. J Am Anim Hosp Assoc. 2013;49(3):183-190. doi:10.5326/JAAHA-MS-5847.',
      sourceType: 'Estudo clínico prospectivo oncológico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23683018/',
      notes: 'Avaliou o esquema metronômico (4 mg/m² q24h) em 31 cães com carcinoma de células transicionais, obtendo 67% de estabilização de doença e sobrevida mediana de 221 dias.',
      evidenceLevel: 'Nível II — Estudo prospectivo oncológico',
    },
    {
      id: 'ref-london-2016',
      citationText:
        'London CA, Gardner HL, Mathie T, Stingle N, Portela R, Bergman PJ, Clifford C, Rosenberg M, Vail D, LeBlanc AK, et al. Impact of dose escalation in metronomic chemotherapy: a comparative evaluation of 4 vs 6 vs 8 mg/m2/day chlorambucil in dogs with advanced cancer. Vet Comp Oncol. 2016;14(4):e112-e120. doi:10.1111/vco.12117.',
      sourceType: 'Ensaio clínico de escalonamento de dose',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27136377/',
      notes: 'Demonstrou que elevar a dose metronômica de 4 para 6 ou 8 mg/m² aumenta significativamente a toxicidade sem ganho de eficácia terapêutica.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado de otimização de dose',
    },
    {
      id: 'ref-reinert-2016',
      citationText:
        'Reinert NC, Feldman DG. Acquired Fanconi syndrome in four cats treated with chlorambucil. J Feline Med Surg. 2016;18(12):1034-1040. doi:10.1177/1098612X15593108.',
      sourceType: 'Série de casos clínicos e farmacovigilância',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26170278/',
      notes: 'Documentou Síndrome de Fanconi adquirida reversível (glicosúria normoglicêmica) em 4 gatos sob terapia prolongada com clorambucil.',
      evidenceLevel: 'Nível III — Série de casos clínicos especializados',
    },
    {
      id: 'ref-benitah-2003',
      citationText:
        'Benitah N, de Lorimier LP, Gasparini S, Kitchell BE. Chlorambucil-induced myoclonus and neurotoxicity in a cat with small cell intestinal lymphoma. J Am Anim Hosp Assoc. 2003;39(3):283-287. doi:10.5326/0390283.',
      sourceType: 'Relato de caso clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12755202/',
      notes: 'Relato pioneiro de neurotoxicidade caracterizada por mioclonia e fasciculações associadas ao clorambucil em felino.',
      evidenceLevel: 'Nível IV — Relato de caso documentado',
    },
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia: Chlorambucil, pp. 243–245.',
      sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Monografia canônica com posologia em mg/m² e doses fixas felinas, toxicologia medular e alertas citotóxicos.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia: Chlorambucil, p. 76.',
      sourceType: 'Formulário Veterinário Internacional',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Diretrizes britânicas de administração com alimento, regimes de leucemia linfocítica crônica e linfoma indolente.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-leukeran-bula',
      citationText:
        'Aspen Pharma Indústria Farmacêutica Ltda. Bula oficial do paciente e profissional do medicamento Leukeran® (clorambucila 2 mg comprimidos revestidos). Registro ANVISA MS nº 1.3764.0148.',
      sourceType: 'Bula Técnica Oficial Registrada ANVISA',
      url: 'https://consultas.anvisa.gov.br/#/medicamentos/',
      notes: 'Referência comercial humana oficial no Brasil; orientações mandatórias de conservação a 2–8°C e proibição de partir o comprimido.',
      evidenceLevel: 'Documento Técnico Regulatório ANVISA',
    },
  ],

  presentations: [
    {
      id: 'pres-leukeran-2mg',
      name: 'Leukeran® 2 mg Comprimidos Revestidos',
      brand: 'Aspen Pharma (Referência Humana Extrabula no Brasil)',
      form: 'Comprimido revestido',
      concentrationValue: 2.0,
      concentrationUnit: 'mg',
      packInfo: 'Frasco de vidro âmbar com 25 comprimidos revestidos de 2 mg',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-clorambucil-comp-magistral',
      name: 'Clorambucil Cápsulas Magistrais de Alta Precisão',
      brand: 'Farmácia Veterinária Especializada em Manipulação de Citotóxicos',
      form: 'Cápsula gelatinosa manipulada',
      concentrationValue: 1.0,
      concentrationUnit: 'mg',
      packInfo: 'Frasco plástico de alta segurança com dessecante',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  relatedDiseaseSlugs: [
    'linfoma-mediastinal-caes-gatos',
    'linfoma-cutaneo-caes-gatos',
    'doenca-renal-cronica-felina',
    'doenca-renal-cronica-caes',
    'trombocitopenia-caes-gatos',
    'anemia-caes-gatos',
  ],
};
