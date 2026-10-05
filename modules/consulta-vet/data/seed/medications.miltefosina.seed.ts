import { MedicationRecord } from '../../types/medication';

export const miltefosinaMedicationRecord: MedicationRecord = {
  id: 'med-miltefosina',
  slug: 'miltefosina',
  title: 'Miltefosina',
  activeIngredient: 'Miltefosina (Hexadecilfosfocolina / HDPC / D-18506)',
  isControlled: true,
  controlNotice:
    'MEDICAMENTO VETERINÁRIO SOB CONTROLE ESPECIAL FEDERAL (PORTARIA MAPA Nº 837/2025). Prescrição médica obrigatória através de Notificação de Receita Veterinária (NRV/MAPA), emitida no sistema oficial instituído pelo MAPA. Notificação impressa em duas vias brancas (1ª via retida pelo estabelecimento comercial veterinário; 2ª via carimbada com o proprietário do animal). Validade estrita de 30 dias corridos em todo o território nacional, com quantidade máxima correspondente a 30 dias de tratamento (ciclo padrão de 28 dias). No Brasil, o tratamento da Leishmaniose Visceral Canina (LVC) é regido pela Portaria Interministerial nº 1.426/2008 e Notas Técnicas do MAPA, que vedam expressamente o uso de produtos humanos ou não registrados no MAPA para essa finalidade.',
  tradeNames: [
    'Milteforan® 20 mg/mL Solução Oral Frascos 30 mL, 60 mL e 90 mL (Virbac — Produto Veterinário Exclusivo no Brasil)',
    'Impavido® 50 mg Cápsulas (Aeterna Zentaris / Knight Therapeutics — Uso Humano Internacional; VEDADO no Brasil para LVC)',
  ],
  officialSiteUrl: 'https://vet-br.virbac.com/produtos/leishmaniose/milteforan',
  leafletUrl: 'https://vet-br.virbac.com/produtos/leishmaniose/milteforan',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/miltefosine/PNG',
  priceReference: {
    amountBrl: 1450.0,
    label:
      'Frasco 30 mL (20 mg/mL): R$ 1.350 a R$ 1.580 | Frasco 60 mL: R$ 2.400 a R$ 2.750 | Frasco 90 mL: R$ 3.200 a R$ 3.850',
    presentation: 'Milteforan 20 mg/mL solução oral (Virbac Brasil)',
    sourceName: 'Comércio Veterinário Especializado / Distribuidores Credenciados MAPA',
    sourceUrl: 'https://vet-br.virbac.com',
    checkedAt: '2026-09-30',
    notes:
      'Valores de referência praticados em distribuidores veterinários autorizados no Brasil em setembro de 2026. Medicamento veterinário sujeito a Notificação de Receita Veterinária (Portaria MAPA 837/2025). O custo total do ciclo de 28 dias varia proporcionalmente ao peso corporal do animal.',
  },
  pharmacologicClass:
    'Antiprotozoário leishmanicida oral; alquilfosfocolina (alquilfosfolipídio sintético / análogo da fosfatidilcolina)',
  species: ['dog', 'cat'],
  category: 'infectologia',
  tags: [
    'Miltefosina',
    'Milteforan',
    'Miltefosine',
    'Hexadecilfosfocolina',
    'HDPC',
    'Leishmaniose',
    'Leishmaniose Visceral Canina',
    'LVC',
    'Leishmania infantum',
    'Alquilfosfocolina',
    'Leishmanicida',
    'Alopurinol',
    'CLWG 2026',
    'WAVD 2025',
    'LeishVet',
    'MAPA Portaria 837/2025',
    'NRV',
    'Controle Especial MAPA',
    'Zoonose',
    'Saúde Única',
  ],

  plainLanguageSummary:
    'A miltefosina é o principal medicamento leishmanicida de uso oral aprovado no Brasil para o tratamento da leishmaniose visceral canina (calazar). Ela age desestruturando a membrana externa e as usinas de energia (mitocôndrias) do protozoário Leishmania infantum, provocando a destruição maciça dos parasitas dentro das células do cão. No entanto, é fundamental que tutores e clínicos compreendam que a miltefosina NÃO promove a cura parasitológica estéril: ela reduz dramaticamente a quantidade de parasitas e permite a recuperação da qualidade de vida e dos exames do paciente, mas o cão permanece infectado por toda a vida e pode sofrer recaídas se a imunidade cair. Além disso, mesmo com melhora clínica notável, alguns animais continuam capazes de infectar o mosquito-palha, sendo terminantemente obrigatório manter coleiras ou produtos repelentes contra flebotomíneos permanentemente. O ciclo padrão dura 28 dias consecutivos e a medicação tem uma meia-vida no organismo de cerca de uma semana, acumulando-se durante o tratamento. Os efeitos adversos mais comuns são digestivos (vômito leve, diarreia e falta de apetite, especialmente na primeira semana), sendo aliviados fornecendo a dose diária junto a uma refeição completa. Por fim, a miltefosina é severamente tóxica para embriões e filhotes em gestação: cadelas prenhas, lactantes e animais reprodutores jamais devem tomá-la, e mulheres grávidas ou em idade fértil nunca devem manipular o produto sem luvas de proteção.',

  mechanismOfAction:
    'A miltefosina (hexadecilfosfocolina — HDPC) é um alquilfosfolipídio sintético estruturado por uma cauda hidrofóbica linear de 16 carbonos (alquila C16) acoplada a uma cabeça polar de fosfocolina zwitteriônica. Ao contrário dos fármacos convencionais que se ligam a um receptor proteico exclusivo, sua ação leishmanicida é multifatorial e biofísica sobre múltiplos alvos dos amastigotas de Leishmania infantum:\n' +
    '1. CAPTAÇÃO ATIVA PARASITÁRIA PELO COMPLEXO LMT-Ros3: A entrada do fármaco no parasita depende do transportador fosfolipídico LMT (Leishmania Miltefosine Transporter, uma aminofosfolipídio-translocase / ATPase tipo P) e sua subunidade proteica não catalítica associada Ros3 (LdRos3). Mutações pontuais, deleções ou repressão transcricional do complexo LMT/Ros3 reduzem drasticamente a captação intracelular da miltefosina, constituindo a principal via molecular de resistência parasitária adquirida.\n' +
    '2. DESESTRUTURAÇÃO LIPÍDICA E DE PLATAFORMAS DE MEMBRANA (LIPID RAFTS): No citoplasma parasitário, a miltefosina inibe a enzima fosfocolina-citidililtransferase (CCT), etapa reguladora limitante da biossíntese de fosfatidilcolina (via Kennedy), além de interferir na biossíntese de esfingolipídios e âncoras de glicosilfosfatidilinositol (GPI) que ancoram fatores de virulência de superfície (como a glicoproteína gp63 e lipofosfoglicano LPG). Isso desestabiliza a bicamada lipídica, aumenta a permeabilidade passiva e desorganiza jangadas lipídicas vitais para a sobrevivência do amastigota no vacúolo fagolisossômico do macrófago.\n' +
    '3. COLAPSO DO POTENCIAL BIOELETROQUÍMICO MITOCONDRIAL (ΔΨm) E QUEDA DE ATP: O fármaco acumula-se nas membranas mitocondriais do protozoário, inibindo o complexo IV da cadeia respiratória (citocromo-c oxidase) e dissipando o potencial transmembrana (ΔΨm). A perda de gradiente de prótons acarreta desacoplamento da fosforilação oxidativa, depleção crítica das reservas celulares de ATP e liberação massiva de espécies reativas de oxigênio (ROS), ativando vias de morte celular programada semelhantes à apoptose (apoptosis-like cell death com clivagem de DNA e externalização de fosfatidilserina).\n' +
    '4. DISRUPÇÃO DOS ACIDOCALCISSOMOS E SOBRECARGA CITOSÓLICA DE CÁLCIO: Interfere na homeostase de organelas de armazenamento iônico exclusivas de tripanossomatídeos (acidocalcissomos), desregulando trocadores Ca2+/H+ e provocando influxo citosólico patológico de Ca2+, culminando em perda osmótica e lise osmótica.\n' +
    '5. ATIVAÇÃO IMUNOCELULAR TH1 INDIRETA: BSAVA (10ª ed.) e estudos pré-clínicos destacam que a miltefosina estimula secundariamente a produção de óxido nítrico sintase induzível (iNOS) e interferon-gama (IFN-γ) em macrófagos do hospedeiro, auxiliando a reprogramação da resposta celular do fenótipo imune Th2 permissivo para Th1 leishmanicida.',

  pillars: [
    {
      title: 'Leishmanicida, Não Esterilizante',
      icon: '🦠',
      desc: 'Reduz substancialmente a carga parasitária tecidual e reverte os sinais clínicos, mas NÃO produz esterilização parasitológica. L. infantum persiste em reservatórios fagocíticos; o paciente permanece infectado e requer acompanhamento clínico-laboratorial contínuo por toda a vida.',
    },
    {
      title: 'Mecanismo Biofísico Multialvo',
      icon: '🧬',
      desc: 'Perturba a biossíntese de fosfolipídios de membrana (via CCT), inibe a citocromo-c oxidase mitocondrial com depleção de ATP, desregula acidocalcissomos com sobrecarga letal de Ca²⁺ e induz morte do tipo apoptose sem depender de um único receptor.',
    },
    {
      title: 'Permanência Ultra-Prolongada (t½ ~6,9 dias)',
      icon: '⏳',
      desc: 'Com clearance extremamente baixo (0,04 mL/min/kg) e meia-vida canina de 153 a 165 horas (~6,9 dias), a miltefosina sofre acúmulo contínuo durante o regime diário de 28 dias, atingindo fator de acúmulo tecidual de 7 a 8 vezes ao final do ciclo.',
    },
    {
      title: 'A Cauda Farmacocinética e Risco de Resistência',
      icon: '⚠️',
      desc: 'Após a última tomada, a eliminação extremamente lenta cria uma cauda plasmática sub-leishmanicida residual durante várias semanas. Essa janela favorece a pressão de seleção de cepas mutantes com mutações no transportador LMT/Ros3 caso ocorram subdosagens ou ciclos sucessivos indiscriminados.',
    },
  ],

  quickSummaryHighlights: [
    'Leishmanicida oral de eleição para cães clinicamente doentes por Leishmania infantum: 2 mg/kg VO q24h durante 28 dias consecutivos (Milteforan 20 mg/mL = 0,1 mL/kg q24h; regra prática: 1 mL para cada 10 kg de peso).',
    'Divergência de Consenso 2025/2026: WAVD 2025 classifica miltefosina + alopurinol como primeira linha; CLWG 2026 reposicionou o esquema como segunda escolha frente ao antimoniato de meglumina + alopurinol pela preocupação com recidiva precoce e seleção de resistência.',
    'Conflito Regulatório Brasil vs Diretrizes Internacionais: a literatura internacional favorece a associação com alopurinol, porém a legislação brasileira oficial (Portaria Interministerial nº 1.426/2008 e MAPA) restringe o tratamento ao produto veterinário registrado exclusivamente para LVC (Milteforan).',
    'Biodisponibilidade oral elevada (~94%) com eliminação ultra-lenta (t½ de 6,4 a 6,9 dias); excreção renal inalterada é desprezível (<0,2%), tornando inútil a diurese forçada em superdoses.',
    'Toxicidade embrionária e teratogênica severa: contraindicada em prenhez, lactação e animais reprodutores; gestantes humanas jamais devem manipular o frasco. Não utilizar em gatos para esporotricose (estudo Silva 2018 comprovou falha e alta toxicidade).',
  ],

  quickIndications: [
    {
      condition: 'Leishmaniose Visceral Canina (L. infantum) — Protocolo Canônico Padrão Ouro',
      species: 'dog',
      doseSummary: '2 mg/kg VO a cada 24 horas por 28 dias consecutivos (0,1 mL/kg q24h; 1 mL a cada 10 kg)',
      route: 'Via Oral (VO) obrigatoriamente administrada junto a refeição úmida',
      duration: '28 dias consecutivos ininterruptos; associar alopurinol 10 mg/kg VO q12h por 6 a 12 meses',
      clinicalContext: 'Cães clinicamente doentes (Estágios II a IV LeishVet; Classes B a D CLWG 2026); remissão de sinais e proteinúria',
    },
    {
      condition: 'Regime Escalonado para Minimização de Êmese Inicial (Cães Sensíveis)',
      species: 'dog',
      doseSummary: '1,5 mg/kg VO q24h por 5 dias, seguido de 2,5 mg/kg VO q24h por mais 23 dias',
      route: 'Via Oral (VO) com alimento',
      duration: 'Total de 28 dias de tratamento',
      clinicalContext: 'Cães com histórico de intolerância gástrica grave na tentativa de titular a dose',
    },
    {
      condition: 'Osteomielite Fúngica Refratária por Lomentospora prolificans (Cães)',
      species: 'dog',
      doseSummary: '2 mg/kg VO a cada 24 horas associado a voriconazol e terbinafina',
      route: 'Via Oral (VO)',
      duration: 'Semanas a meses sob acompanhamento e monitoramento rigoroso',
      clinicalContext: 'Terapia de resgate em micose fúngica invasiva pan-resistente com dano ósseo',
    },
    {
      condition: 'Uso em Esporotricose Felina (CONTRAINDICADO)',
      species: 'cat',
      doseSummary: 'CONTRAINDICADO: ausência de eficácia clínica e toxicidade grave em felinos',
      route: 'Não administrar',
      duration: 'Não utilizar',
      clinicalContext: 'Ensaio clínico de Silva et al. (2018) comprovou ineficácia e severa toxicidade gastrointestinal e hematológica',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-milte-dog-leish-standard',
      indication: 'Tratamento leishmanicida específico da Leishmaniose Visceral Canina manifesta',
      clinicalContext: 'Cães com confirmação diagnóstica e sinais clínicos/laboratoriais (alopecia periocular, úlceras, linfoadenomegalia, proteinúria)',
      species: 'dog',
      dose: '2 mg/kg (0,1 mL/kg da solução 20 mg/mL)',
      route: 'VO',
      frequency: 'a cada 24 horas',
      duration: '28 dias consecutivos',
      mechanismOfAction: 'Inibição de CCT e síntese de fosfatidilcolina, colapso de ATP mitocondrial e apoptose parasitária nos macrófagos.',
      clinicalRationale: 'Reduz a carga parasitária em múltiplos tecidos e induz remissão clínica sem nefrotoxicidade tubular marcante.',
      monitoring: 'UPC urinário, creatinina, ureia, hemograma, ALT e sinais gastrointestinais (vômitos na 1ª semana).',
      referenceIds: ['ref-milte-wavd-2025', 'ref-milte-clwg-2026', 'ref-milte-plumbs-10ed'],
      evidenceLevel: 'Nível 1a — Consensos mundiais WAVD 2025 e CLWG 2026; bula oficial registrada MAPA',
    },
    {
      id: 'ind-milte-dog-lomentospora',
      indication: 'Terapia adjuvante de resgate na osteomielite invasiva por Lomentospora prolificans',
      clinicalContext: 'Micose fúngica óssea invasiva multirresistente a azólicos e anfotericina B',
      species: 'dog',
      dose: '2 mg/kg',
      route: 'VO',
      frequency: 'a cada 24 horas',
      duration: 'Tratamento prolongado associado a antifúngicos',
      mechanismOfAction: 'Desestruturação de membranas e sinergismo in vitro contra fungos filamentosos recalcitrantes.',
      clinicalRationale: 'Opção de salvamento em afecções ósseas sem alternativa cirúrgica curativa.',
      monitoring: 'Função hepática, tolerância digestiva e evolução radiográfica da lesão óssea.',
      referenceIds: ['ref-milte-hasany-2024', 'ref-milte-plumbs-10ed'],
      evidenceLevel: 'Nível 4 — Relatos de caso e estudos mecanísticos in vitro (Hasany et al. 2024)',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'DIVERGÊNCIA DE CONSENSO INTERNACIONAL (WAVD 2025 vs CLWG 2026)',
      text: 'O consenso mundial de dermatologia veterinária (WAVD 2025) classifica a miltefosina associada ao alopurinol como regime terapêutico estabelecido de primeira linha para a leishmaniose canina. Em contraste, a atualização do Canine Leishmaniosis Working Group (CLWG 2026) reposicionou a miltefosina + alopurinol como segunda escolha/alternativa em relação ao antimoniato de meglumina + alopurinol, embasando-se em evidências recentes de recaídas clínicas precoces mais frequentes e documentação de cepas de L. infantum com suscetibilidade reduzida e resistência cruzada após tratamentos com miltefosina.',
    },
    {
      label: 'CONFLITO REGULATÓRIO BRASILEIRO (MAPA / MINISTÉRIO DA SAÚDE 2026)',
      text: 'Enquanto guidelines internacionais preconizam sistematicamente a associação de miltefosina com alopurinol por 6 a 12 meses, a regulamentação brasileira oficial (Portaria Interministerial nº 1.426/2008, Nota Técnica MAPA nº 11/2016 e orientações do CFMV) determina que o tratamento da leishmaniose visceral canina deve ser efetuado exclusivamente com produto veterinário registrado no MAPA para essa finalidade (condição preenchida pelo Milteforan®). O Manual de Vigilância da Leishmaniose Visceral do Ministério da Saúde (2026) reconhece o uso empírico de associações, mas alerta que não há registro específico dessas combinações para LVC no país, impondo ao médico-veterinário responsabilidade técnica e documental no esclarecimento ao tutor.',
    },
    {
      label: 'NÃO TRATAR CÃES ASSINTOMÁTICOS (INFECÇÃO ≠ DOENÇA CLÍNICA ATIVA)',
      text: 'O consenso LeishVet e o CLWG 2026 estabelecem expressamente que cães infectados (soropositivos ou PCR positivos) sem sinais clínicos e sem alterações laboratoriais (ausência de proteinúria, de hipoalbuminemia e de hipergamaglobulinemia) NÃO devem receber tratamento leishmanicida com miltefosina. A exposição de parasitas em cães que mantêm controle imunológico celular competente não previne a progressão e exerce pressão de seleção de resistência sem benefício clínico para o hospedeiro.',
    },
    {
      label: 'TOXICIDADE REPRODUTIVA SEVERA E SEGURANÇA OCUPACIONAL',
      text: 'A miltefosina é comprovadamente teratogênica, embriotóxica e fetotóxica em animais de laboratório e humanos, provocando fendas palatinas, malformações esqueléticas e morte fetal, além de causar atrofia testicular, danos em túbulos seminíferos, atrofia prostática e estro irregular em animais reprodutores. É contraindicada em cadelas prenhas, lactantes ou reprodutores. Mulheres gestantes ou que planejam engravidar estão expressamente proibidas de manipular o produto ou administrar a solução. O manipulador deve utilizar luvas de látex/nitrilo e lavar imediatamente a pele exposta.',
    },
    {
      label: 'INEXISTÊNCIA DE AJUSTE PERCENTUAL DE DOSE PARA DOENÇA RENAL (IRIS 1–4)',
      text: 'A excreção urinária de miltefosina inalterada é mínima (<0,2%), sendo o fármaco depurado principalmente por clivagem fosfolipídica tecidual e excreção fecal. Embora cães em estágios renais avançados (IRIS 3 e 4) demandem avaliação rigorosa de risco-benefício pela gravidade da glomerulopatia por imunocomplexos, NÃO EXISTE fórmula de redução percentual validada (ex.: reduzir 25% ou 50%). Subdosar o leishmanicida por medo empírico de nefrotoxicidade resulta em falha parasitológica catastrófica e acelera a seleção de resistência parasitária.',
    },
    {
      label: 'EVIDÊNCIA NEGATIVA E CONTRAINDICAÇÃO NA ESPOROTRICOSE FELINA',
      text: 'O ensaio clínico de Silva et al. (2018) avaliou o uso de miltefosina oral (2 mg/kg q24h) em 10 gatos com esporotricose refratária por Sporothrix brasiliensis. O estudo demonstrou falha terapêutica evidente (ausência de cura clínica) acompanhada de severa intolerância gastrintestinal (70% com hiporexia e perda de peso, vômitos, sialorreia) e anemia em 40% dos felinos. A miltefosina NÃO É recomendada para esporotricose felina.',
    },
  ],

  indications: [
    'Tratamento leishmanicida específico de cães acometidos por Leishmaniose Visceral Canina (LVC) causada por Leishmania infantum que apresentem doença clínica manifesta (estágios II, III ou IV do LeishVet; Classes B, C e D do CLWG 2026).',
    'Redução expressiva da carga parasitária tecidual em linfonodos, medula óssea, pele e baço, promovendo resolução ou alívio acentuado de lesões cutâneas (dermatite esfoliativa, alopecia periocular, úlceras, onicogrifose), linfoadenomegalia, esplenomegalia e caquexia.',
    'Controle da glomerulonefrite membranoproliferativa e redução da proteinúria secundária à deposição de imunocomplexos circulantes, em associação ao suporte nefrológico em cães com doença renal crônica nos estágios IRIS 1 e 2.',
    'Protocolo multimodal combinado leishmanicida/leishmaniostático internacional (miltefosina 28 dias + alopurinol 10 mg/kg VO q12h por 6 a 12 meses), observado o enquadramento regulatório nacional brasileiro.',
    'Indicação de evidência extremamente restrita / anedótica: adjuvante no tratamento de osteomielite e infecções fúngicas invasivas por Lomentospora prolificans (anteriormente Scedosporium prolificans) associada a voriconazol e terbinafina (uso reservado a centros de referência sob monitoramento estrito; evidência não validada em cães).',
  ],

  contraindications: [
    'Gestação confirmada ou suspeita em cadelas e gatas: fármaco com teratogenicidade e embriotoxicidade comprovadas, indutor de abortamento e anomalias esqueléticas fetais graves.',
    'Fêmeas em período de lactação: o fármaco e metabólitos derivados são excretados no leite materno e acumulam-se nos neonatos.',
    'Machos e fêmeas destinados à reprodução cinotécnica: produz toxicidade testicular grave, atrofia de túbulos seminíferos, redução de espermatogênese e atrofia prostática em cães machos, e irregularidades no ciclo estral em fêmeas.',
    'Cães infectados por Leishmania infantum clinicamente saudáveis e assintomáticos (PCR positivo ou soropositivo isolado sem doença tecidual ou urinária comprovada), pelo risco de seleção de cepas resistentes sem benefício clínico.',
    'Hipersensibilidade conhecida à miltefosina ou a qualquer um dos excipientes da formulação (contém propilenoglicol).',
    'Insuficiência hepática descompensada terminal com perda de função sintética e encefalopatia hepática em curso.',
    'Uso rotineiro em gatos e contraindicação explícita para o tratamento de esporotricose felina.',
  ],

  cautions: [
    'Doença Renal Crônica concomitante (IRIS 1 a 4): a leishmaniose é uma das maiores causas infecciosas de glomerulonefrite e síndrome nefrótica em cães; monitorar relação proteína:creatinina urinária (UPC), creatinina, ureia, SDMA e pressão arterial sistólica. Não reduzir empiricamente a dose sem indicação de especialista.',
    'Tolerância digestiva na primeira semana de tratamento: episódios transitórios de êmese, diarreia e hiporexia ocorrem com frequência em até 30% a 50% dos cães; fornecer a medicação misturada a uma refeição completa diminui a irritação mucosal.',
    'Cães portadores de distúrbios gastrintestinais prévios ativos (gastrite erosiva, doença inflamatória intestinal, vômitos crônicos): estabilizar previamente o trato digestivo e considerar suporte com antieméticos (maropitant, ondansetrona) se houver êmese repetida que comprometa a retenção da dose.',
    'Segurança em Saúde Única e Controle Vetorial Contínuo: cães tratados com miltefosina podem permanecer infectantes para flebotomíneos vetores (Lutzomyia longipalpis); a manutenção de coleiras repelentes à base de deltametrina ou tópicos à base de permetrina/dinotefuran é mandatória e inegociável.',
    'Segurança do manipulador humano: mulheres grávidas ou em planejamento reprodutivo não devem manipular o Milteforan®; todos os manipuladores devem usar luvas e evitar contato mucocutâneo.',
    'Suspeita de resistência parasitária em recaídas clínicas precoces (< 3 a 6 meses após o ciclo): não repetir sucessivos ciclos de miltefosina sem antes investigar má adesão, subdosagem, comorbidades, reinfecção e considerar fármaco alternativo (antimoniato).',
  ],

  adverseEffects: [
    'Efeitos gastrintestinais (muito comuns na 1ª e 2ª semanas): êmese reflexa, náusea com sialorreia, regurgitação, diarreia pastosa a aquosa, hiporexia e redução transitória da ingestão de alimentos.',
    'Sinais sistêmicos inespecíficos: letargia leve, prostração pós-administração, relutância ao exercício e perda ponderal moderada nas semanas iniciais de terapia.',
    'Alterações laboratoriais hematológicas raras: relatos esporádicos de citopenias (anemia leve, neutropenia transitória ou plaquetopenia); ressalta-se que a própria LVC frequentemente induz aplasia medular e trombocitopenia imunomediada.',
    'Toxicidade sobre o sistema reprodutor: atrofia prostática reversível, degeneração do epitélio seminífero testicular, redução de motilidade e contagem espermática em machos caninos.',
    'Reações no ponto de contato dérmico ou ocular no tutor/manipulador: dermatite irritativa de contato, eritema cutâneo e ardor conjuntival grave em casos de respingos acidentais.',
  ],

  administration: [
    'Via exclusivamente oral (VO). A formulação veterinária Milteforan® 20 mg/mL NUNCA deve ser administrada por via intravenosa, intramuscular, subcutânea ou infusão contínua (CRI).',
    'Administrar rigorosamente junto à refeição principal do cão (misturada a uma porção palatável de ração úmida ou petisco pasteurizado) para atenuar a irritação sobre a mucosa gástrica e prevenir episódios de náusea e vômito precoce.',
    'Não colocar a dose líquida no comedouro inteiro de ração seca caso o animal apresente apetite caprichoso: fornecer em uma pequena porção inicial e garantir que todo o volume seja consumido antes de liberar o restante do alimento.',
    'Medir o volume com a seringa dosadora graduada fornecida na embalagem original ou seringa hipodérmica compatível, calculando rigorosamente 0,1 mL para cada 1 kg de peso vivo (1 mL para cada 10 kg de peso).',
    'NÃO AGITAR O FRASCO VIGOROSAMENTE: a miltefosina atua como um tensoativo alquilfosfolipídico, gerando espuma persistente que impede a aspiração precisa do volume líquido. Homogeneizar por inversão suave do frasco.',
    'Não utilizar cálculos empíricos em gotas: a solução de 20 mg/mL tem viscosidade e densidade próprias que inviabilizam calibração por conta-gotas comum.',
    'Uso estrito de luvas de proteção pelo aplicador; lavar as mãos com água corrente e sabão imediatamente após a administração.',
  ],

  doses: [
    {
      id: 'dose-milte-dog-leish-standard',
      species: 'dog',
      indication: 'Leishmaniose Visceral Canina (LVC por L. infantum) — protocolo de ataque clássico internacional',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 24 horas (uma vez ao dia)',
      duration: 'durante 28 dias consecutivos',
      notes:
        'Protocolo de referência mundial e dose registrada no MAPA para Milteforan® 20 mg/mL (0,1 mL/kg q24h; equivalente a 1 mL para cada 10 kg de peso). Fornecer sempre junto com alimento para reduzir a ocorrência de êmese. O ciclo não deve ser encurtado arbitrariamente devido ao tempo requerido para atingir o platô terapêutico de acúmulo (t½ ~6,9 dias). Em diretrizes internacionais (WAVD 2025, LeishVet), associa-se concomitante ao alopurinol 10 mg/kg VO q12h por 6 a 12 meses.',
      calculatorEnabled: true,
      presentationId: 'pres-milteforan-20mgml',
      evidenceLevel: 'Consensos internacionais LeishVet, WAVD 2025 e bula oficial MAPA',
    },
    {
      id: 'dose-milte-dog-leish-titration',
      species: 'dog',
      indication: 'Leishmaniose Canina — regime escalonado histórico (Iarussi et al. 2020 / Plumb)',
      doseMin: 1.5,
      doseMax: 2.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: '1,5 mg/kg q24h por 5 dias, seguido de 2,5 mg/kg q24h por 23 a 25 dias',
      duration: 'total de 28 a 30 dias',
      notes:
        'Esquema alternativo avaliado clinicamente para tentar minimizar episódios de vômitos iniciais por titulação ascendente. Ensaios clínicos controlados posteriores (Iarussi et al. 2020) não demonstraram superioridade clínica ou parasitológica em relação à dose fixa padrão de 2 mg/kg q24h, mantendo-se a dose uniforme de 2 mg/kg como padrão ouro preferencial.',
      calculatorEnabled: false,
      presentationId: 'pres-milteforan-20mgml',
      evidenceLevel: 'Ensaio clínico piloto comparativo (Iarussi et al. 2020)',
    },
    {
      id: 'dose-milte-dog-lomentospora',
      species: 'dog',
      indication: 'Osteomielite invasiva por Lomentospora (Scedosporium) prolificans — adjuvante de resgate',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 8 horas (q8h)',
      duration: 'prolongada sob monitoramento estrito',
      notes:
        'ALERTA DE EVIDÊNCIA EXTREMAMENTE LIMITADA: esquema terapêutico experimental citado em formulários históricos (VIN) e derivado de relatos anedóticos de micoses fúngicas refratárias em combinação com voriconazol e terbinafina. Não existem ensaios clínicos veterinários randomizados que sustentem sua eficácia ou segurança na rotina. Risco toxicológico gastrointestinal e reprodutivo altamente elevado devido à frequência q8h.',
      calculatorEnabled: false,
      evidenceLevel: 'Relatos de caso anedóticos / experiência empírica isolada',
    },
    {
      id: 'dose-milte-cat-experimental',
      species: 'cat',
      indication: 'Leishmaniose felina por L. infantum — uso experimental em centros de referência',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 24 horas',
      duration: '28 dias sob vigilância contínua',
      notes:
        'USO EXPERIMENTAL NÃO CONSOLIDADO: a BSAVA (10ª ed.) adverte explicitamente que não existem dados farmacocinéticos ou posologia validada para a espécie felina. Pequenas séries de casos utilizaram 2 mg/kg/dia com tolerância variável, mas o produto contém propilenoglicol e não possui registro felino. Preferir protocolos à base de alopurinol em monoterapia como primeira linha na leishmaniose felina segundo as diretrizes europeias ABCD (2026).',
      calculatorEnabled: false,
      evidenceLevel: 'Séries de casos retrospectivas e diretrizes ABCD 2026',
    },
    {
      id: 'dose-milte-cat-sporotrichosis-contraindicated',
      species: 'cat',
      indication: 'Esporotricose felina refratária — CONTRAINDICADO POR EVIDÊNCIA NEGATIVA DIRETA',
      doseMin: 0,
      doseMax: 0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'CONTRAINDICADO',
      duration: 'NÃO UTILIZAR',
      notes:
        'CONTRAINDICAÇÃO FORMAL BASEADA EM ENSAIO CLÍNICO: o estudo prospectivo de Silva et al. (2018) avaliou 10 felinos com esporotricose refratária tratados com 2 mg/kg VO q24h por 30 dias. O estudo evidenciou ausência total de eficácia curativa contra Sporothrix brasiliensis, associada a anorexia severa (70%), perda rápida de peso corporal, diarreia e anemia não regenerativa iatrogênica em 40% dos animais. A miltefosina NÃO DEVE ser prescrita para esporotricose felina.',
      calculatorEnabled: false,
      evidenceLevel: 'Ensaio clínico prospectivo negativo (Silva et al. 2018)',
    },
  ],

  presentations: [
    {
      id: 'pres-milteforan-20mgml',
      name: 'Milteforan® 20 mg/mL Solução Oral Frascos de 30 mL, 60 mL e 90 mL (Virbac)',
      brand: 'Milteforan® (Virbac Saúde Animal)',
      form: 'solução oral',
      concentrationValue: 20,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frascos de polietileno de alta densidade contendo 30 mL, 60 mL ou 90 mL, acompanhados de seringa dosadora de 3 mL ou 6 mL com graduação volumétrica em mililitros e quilogramas de peso vivo.',
      route: 'VO',
      channel: 'veterinary',
      commercialProductSlug: 'milteforan-virbac',
      commercialType: 'Veterinário registrado no MAPA sob controle especial',
      packageDescription:
        'Solução límpida incolor a amarelada pálida, com 20 mg de miltefosina por mL (2,0% m/v) em veículo aquoso com propilenoglicol.',
      calculatedMlPerKgFormula: '0.1 mL/kg q24h',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção oral lenta e altamente eficiente em cães, com biodisponibilidade oral absoluta (F) descrita em aproximadamente 94%. O tempo para atingir a concentração plasmática máxima (Tmax) exibe grande dispersão conforme a presença de alimento e regime posológico: estudos regulatórios em cães alimentados relatam Tmax médio em torno de 5 a 8 horas, enquanto investigações com doses repetidas descrevem faixas ampliadas de 8 a 24 horas. A administração com alimento reduz substancialmente a emetogênese sem prejudicar a absorção líquida.',
    distribution:
      'Volume de distribuição moderado no cão (Vd ~0,48 L/kg), indicando penetração extravascular eficiente com acúmulo celular seletivo em órgãos ricos em macrófagos do sistema fagocítico mononuclear (fígado, baço, linfonodos e medula óssea), além de tecido nervoso central e órgãos do trato reprodutor (próstata, testículos, ovários). A ligação a proteínas plasmáticas é elevada (~93% no cão), distribuindo-se tanto no plasma quanto no interior da fração eritrocitária. Não há dados consolidados de proporção exata líquor:plasma em cães.',
    metabolism:
      'Metabolização peculiar e independente do citocromo P450 microssomal hepático clássico: a miltefosina sofre clivagem hidrolítica oxidativa lenta mediada por fosfolipases intracelulares teciduais (atividade semelhante à fosfolipase D), liberando colina livre, metabólitos orgânicos conjugados contendo colina e hexadecanol (álcool cetílico graxo que é posteriormente incorporado ao ciclo de beta-oxidação de ácidos graxos). Essa via explica a ausência de interações clássicas dependentes de indução ou inibição enzimática das famílias CYP1A, CYP2C, CYP2D e CYP3A.',
    elimination:
      'Eliminação extraordinariamente lenta com meia-vida plasmática terminal (t1/2) canina de 153 a 165 horas (média de 6,4 a 6,9 dias) e clearance sistêmico extremamente baixo de aproximadamente 0,04 mL/min/kg (2,4 mL/kg/h). A depuração renal de fármaco intacto é negligenciável (<0,2% da dose administrada é recuperada inalterada na urina), sendo a eliminação corporal predominantemente metabólica e por excreção fecal/biliar lenta (~10% de fármaco inalterado nas fezes). Sob administração diária de 28 dias, o fator de acúmulo atinge 7 a 8 vezes, alcançando o estado de equilíbrio dinâmico (steady state) próximo ao final do tratamento.',
    cnsPenetration:
      'Alcança concentrações detectáveis no tecido encefálico e nervos periféricos, porém sem coeficiente de permeabilidade liquórica (líquor:plasma) formalmente padronizado na literatura canina.',
    halfLife: 'Cães: 153 a 165 horas (~6,4 a 6,9 dias); Gatos: dados robustos não estabelecidos.',
    plasmaBinding: 'Aproximadamente 93% em cães (ampla fração ligada à albumina plasmática).',
  },

  practicalWeightTable: {
    standardDoseText:
      'Referência prática de cálculo para Milteforan® 20 mg/mL (2 mg/kg VO q24h durante 28 dias). Fórmula simples: Peso (kg) × 0,1 = Volume diário (mL). Regra de bolso: cada 10 kg de peso requer exatamente 1,0 mL de solução oral ao dia.',
    headers: ['Peso Corporal', 'Dose Diária (mg)', 'Volume Diário (mL)', 'Volume Total do Ciclo (28 dias)'],
    rows: [
      { weight: '2 kg', totalDose: '4 mg', col1: '0,2 mL', col2: '5,6 mL' },
      { weight: '3 kg', totalDose: '6 mg', col1: '0,3 mL', col2: '8,4 mL' },
      { weight: '4 kg', totalDose: '8 mg', col1: '0,4 mL', col2: '11,2 mL' },
      { weight: '5 kg', totalDose: '10 mg', col1: '0,5 mL', col2: '14,0 mL' },
      { weight: '7,5 kg', totalDose: '15 mg', col1: '0,75 mL', col2: '21,0 mL' },
      { weight: '10 kg', totalDose: '20 mg', col1: '1,0 mL', col2: '28,0 mL (1 frasco de 30 mL)' },
      { weight: '15 kg', totalDose: '30 mg', col1: '1,5 mL', col2: '42,0 mL (1 frasco de 60 mL)' },
      { weight: '20 kg', totalDose: '40 mg', col1: '2,0 mL', col2: '56,0 mL (1 frasco de 60 mL)' },
      { weight: '25 kg', totalDose: '50 mg', col1: '2,5 mL', col2: '70,0 mL (1 frasco de 90 mL)' },
      { weight: '30 kg', totalDose: '60 mg', col1: '3,0 mL', col2: '84,0 mL (1 frasco de 90 mL)' },
      { weight: '35 kg', totalDose: '70 mg', col1: '3,5 mL', col2: '98,0 mL (1 frasco 90 mL + 1 de 30 mL)' },
      { weight: '40 kg', totalDose: '80 mg', col1: '4,0 mL', col2: '112,0 mL (2 frascos de 60 mL)' },
      { weight: '50 kg', totalDose: '100 mg', col1: '5,0 mL', col2: '140,0 mL' },
    ],
  },

  samplePrescriptionText:
    'NOTIFICAÇÃO DE RECEITA VETERINÁRIA — CONTROLE ESPECIAL MAPA (PORTARIA MAPA Nº 837/2025)\n' +
    'EMITIDA EM 2 VIAS BRANCAS (1ª VIA: RETIDA PELO ESTABELECIMENTO COMERCIAL / 2ª VIA: TUTOR DO PACIENTE)\n\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\n' +
    'IDENTIFICAÇÃO DO PROPRIETÁRIO: [Nome do Tutor], CPF: [000.000.000-00], Endereço Completo: [Logradouro, Município, UF]\n' +
    'IDENTIFICAÇÃO DO ANIMAL: [Nome do Cão], Espécie: Canina, Raça: [Raça], Sexo: [M/F], Idade: [Anos], Peso Atual: [10,0 kg]\n\n' +
    'PRESCRIÇÃO TERAPÊUTICA:\n' +
    '1. MILTEFORAN® (miltefosina 20 mg/mL) solução oral ------------------------------------------------ 1 frasco de 30 mL\n' +
    '   (Acompanha seringa dosadora graduada em mililitros e quilogramas)\n' +
    '   Posologia: Administrar 1,0 mL (equivalente a 20 mg de miltefosina, na dose de 2 mg/kg) por via oral, uma vez ao dia (a cada 24 horas), durante 28 dias consecutivos ininterruptos.\n' +
    '   Modo de Administração: Fornecer o volume medido estritamente misturado a uma pequena porção de alimento úmido altamente palatável, imediatamente antes da refeição habitual do cão.\n\n' +
    'ORIENTAÇÕES DE SEGURANÇA MANDATÓRIAS AO TUTOR:\n' +
    '1. HORÁRIO E REGULARIDADE: Ministrar o remédio sempre no mesmo horário todos os dias. Não suspender o tratamento por conta própria antes de completar rigorosamente os 28 dias.\n' +
    '2. NÃO AGITAR O FRASCO: A agitação vigorosa forma espuma e impede a dosagem correta. Homogeneizar apenas girando suavemente o frasco com movimentos circulares lentos.\n' +
    '3. PROTEÇÃO DO APLICADOR E VETO GESTACIONAL: O manipulador deve utilizar luvas descartáveis durante a administração. Mulheres gestantes ou que estejam tentando engravidar NÃO PODEM manipular este produto em nenhuma hipótese, devido ao risco severo de malformações no feto.\n' +
    '4. EFEITOS DIGESTIVOS: Vômitos leves, fezes amolecidas ou diminuição temporária do apetite podem ocorrer nos primeiros 7 a 10 dias. Não suspenda a medicação por um vômito isolado. Caso ocorram vômitos repetidos e recusa alimentar completa por mais de 24 horas, entre em contato imediatamente com a clínica veterinária.\n' +
    '5. NÃO PRODUZ CURA ESTÉRIL: O tratamento com Milteforan® controla a multiplicação do parasita e alivia as lesões da leishmaniose, mas o cão permanecerá portador do parasita por toda a vida.\n' +
    '6. PROTEÇÃO CONTRA O MOSQUITO É OBRIGATÓRIA: O animal tratado pode continuar sendo fonte de infecção para o mosquito-palha. É mandatório manter o uso permanente de coleiras repelentes à base de deltametrina ou pipetas inseticidas autorizadas, trocadas rigorosamente nos prazos dos fabricantes.\n' +
    '7. RETORNO PROGRAMADO: Retornar para consulta de reavaliação clínica e coleta de exames de controle (hemograma, função renal, proteinúria UPC e perfil proteico) ao final dos 28 dias e aos 3 e 6 meses após o término do ciclo.\n\n' +
    'Validade desta Notificação de Receita Veterinária: 30 dias corridos a partir da data de emissão.',

  attentionData: {
    attentionSubtitle:
      'Leishmanicida oral alquilfosfocolina multialvo com meia-vida ultra-longa (~6,9 dias); risco de seleção de resistência com repetição indiscriminada de ciclos ou subdosagem; contraindicação reprodutiva estrita; intolerância gastrintestinal na 1ª semana; sem fórmula de redução percentual para doença renal.',
    precautions: [
      {
        condition: 'Divergência de Diretrizes (WAVD 2025 vs CLWG 2026)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O consenso dermatológico WAVD 2025 posiciona miltefosina + alopurinol na primeira linha terapêutica, enquanto o grupo de trabalho em leishmaniose CLWG 2026 reposicionou o esquema para segunda escolha frente ao antimoniato de meglumina + alopurinol em razão de evidências de recaídas clínicas precoces mais frequentes e risco de seleção de mutantes com transporte deficitário LMT/Ros3.',
        clinicalAction:
          'Avaliar individualmente a tolerância do paciente (presença de insuficiência renal contraindica antimoniato e favorece miltefosina) e discutir com o tutor os riscos de recaída, garantindo adesão perfeita aos 28 dias.',
      },
      {
        condition: 'Conflito Regulatório Nacional (Portaria Interministerial 1.426/2008 e MAPA)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A legislação sanitária e agropecuária brasileira vincula o tratamento da leishmaniose visceral canina estritamente a produtos registrados no MAPA com essa finalidade (Milteforan®), não havendo autorização regulatória formal para produtos humanos ou associações não registradas.',
        clinicalAction:
          'Prescrever o Milteforan® conforme as diretrizes aprovadas na bula do MAPA e esclarecer formalmente ao tutor os fundamentos legais e éticos das eventuais condutas adjuvantes.',
      },
      {
        condition: 'Gestação, Lactação e Potencial Teratogênico (Gravidez Humana e Canina)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A miltefosina altera a homeostase de membranas fosfolipídicas embrionárias e induz apoptose em células pluripotentes, provocando morte embrionária, fenda palatina e deformidades esqueléticas severas.',
        clinicalAction:
          'Contraindicação absoluta em cadelas e gatas prenhes ou lactantes. Proibir estritamente o manuseio do produto por mulheres grávidas ou em idade fértil que não utilizem contracepção confiável. Exigir luvas em todas as aplicações.',
      },
      {
        condition: 'Avaliação de Doença Renal Concomitante (Classificação IRIS)',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A nefropatia na LVC decorre primariamente de glomerulonefrite por imunocomplexos circulantes induzida pela infecção crônica, e não por lesão tubular direta da miltefosina. A depuração renal da droga inalterada é desprezível (<0,2%).',
        clinicalAction:
          'Não reduzir empiricamente a dose da miltefosina em cães com DRC estágios IRIS 1 ou 2. Em estágios avançados (IRIS 3 e 4), estabilizar hemodinamicamente o paciente e realizar avaliação com nefrologista antes de instituir leishmanicidas.',
      },
      {
        condition: 'Intolerância Gastrintestinal na Primeira Semana',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A estrutura tensoativa anfifílica da hexadecilfosfocolina exerce ação irritativa direta sobre a mucosa gástrica e o epitélio entérico proximal, deflagrando êmese reflexa precoce.',
        clinicalAction:
          'Administrar a dose rigorosamente misturada ao alimento. Se ocorrerem vômitos persistentes que impeçam a retenção da droga, instituir suporte com maropitant (2 mg/kg VO q24h) ou ondansetrona (0,5 mg/kg VO q12h).',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Vômito e náusea reflexa',
        frequency: 'common',
        mechanism: 'Irritação direta da mucosa gastroduodenal pela cauda hidrofóbica da alquilfosfocolina.',
        clinicalManagement:
          'Fornecer com alimento úmido altamente palatável. Se persistir, associar antiemético (maropitant ou ondansetrona) 30 a 45 minutos antes da tomada.',
      },
      {
        effect: 'Diarreia pastosa a aquosa',
        frequency: 'common',
        mechanism: 'Alteração na absorção lipídica entérica e motilidade por efeito detergente fisiológico brando.',
        clinicalManagement:
          'Suporte dietético com fibras e hidratação oral; geralmente autolimitada em 3 a 5 dias.',
      },
      {
        effect: 'Hiporexia e prostração transitória',
        frequency: 'common',
        mechanism: 'Desconforto digestivo associado à liberação de citocinas inflamatórias durante a lise parasitária.',
        clinicalManagement:
          'Oferecer dietas úmidas hipercalóricas pastosas; fracionar a alimentação ao longo do dia.',
      },
      {
        effect: 'Toxicidade reprodutiva (atrofia testicular e espermatogênese deprimida)',
        frequency: 'rare',
        mechanism: 'Acúmulo nos órgãos reprodutivos com disrupção da barreira hematotesticular e degeneração de túbulos.',
        clinicalManagement: 'Contraindicar em animais destinados à reprodução cinotécnica.',
      },
      {
        effect: 'Citopenias medulares (anemia / trombocitopenia)',
        frequency: 'rare',
        mechanism: 'Rara mielossupressão iatrogênica somada à própria patogênese parasitária medular da LVC.',
        clinicalManagement:
          'Realizar hemograma completo aos 14 e 28 dias do ciclo; investigar anemia hemolítica imune ou leishmaniose ativa.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Insuficiência Renal Crônica (Estágios IRIS 1, 2, 3 e 4)',
        recommendedAdjustment:
          'NÃO HÁ AJUSTE PERCENTUAL VALIDADO. Manter 2 mg/kg q24h ou contraindicar se uremia terminal.',
        physiologicalRationale:
          'Menos de 0,2% da miltefosina inalterada é excretada pelos rins. Reduzir a dose para 1 mg/kg ou 1,5 mg/kg gera subexposição crítica, falha leishmanicida e rápida seleção de cepas resistentes.',
      },
      {
        clinicalCondition: 'Disfunção Hepática Crônica Compensada',
        recommendedAdjustment: 'Manter posologia de 2 mg/kg q24h sob monitoramento quinzenal de ALT, FA e albumina.',
        physiologicalRationale:
          'A degradação ocorre por fosfolipases teciduais distribuídas em múltiplos órgãos, não sobrecarregando o citocromo P450.',
      },
      {
        clinicalCondition: 'Superdosagem Acidental (> 3 mg/kg/dia)',
        recommendedAdjustment:
          'Suspensão temporária do fármaco, controle antiemético e fluidoterapia hidroeletrolítica vigorosa.',
        physiologicalRationale:
          'Doses acima de 3,16 mg/kg causam vômitos intratáveis e desidratação. A diurese forçada é ineficaz para eliminação.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Alopurinol',
        severity: 'minor',
        clinicalEffect:
          'Sinergismo terapêutico antiparasitário acentuado (combinação recomendada pelos consensos internacionais).',
        pharmacologicalMechanism:
          'A miltefosina atua como leishmanicida de ataque (reduzindo a carga parasitária inicial) enquanto o alopurinol atua como leishmaniostático de manutenção por bloqueio da síntese purínica parasitária.',
      },
      {
        drugOrClass: 'Antimoniato de Meglumina',
        severity: 'major',
        clinicalEffect:
          'Não associar simultaneamente na rotina clínica; risco de acúmulo de toxicidade gastrintestinal e renal.',
        pharmacologicalMechanism:
          'Ambos são leishmanicidas de ação rápida. As diretrizes preconizam monoterapia leishmanicida sequencial, não concomitante.',
      },
      {
        drugOrClass: 'Fármacos Nefrotóxicos (Aminoglicosídeos, Anfotericina B desoxicolato)',
        severity: 'moderate',
        clinicalEffect:
          'Potenciação de dano renal em cães leishmaniose-positivos portadores de glomerulonefrite.',
        pharmacologicalMechanism:
          'Embora a miltefosina tenha baixo potencial nefrotóxico intrínseco, a nefropatia por LVC torna o rim hipersensível a lesões hemodinâmicas adicionais.',
      },
      {
        drugOrClass: 'Fármacos Altamente Ligados a Proteínas (AINEs, Anticoagulantes)',
        severity: 'minor',
        clinicalEffect: 'Interação teórica sem repercussão clínica comprovada.',
        pharmacologicalMechanism:
          'A miltefosina liga-se em ~93% às proteínas plasmáticas, mas deslocamentos farmacológicos significativos não foram documentados em cães.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Administração estritamente oral, medida em seringa milimetrada graduada, incorporada a pequena porção de alimento úmido antes da refeição principal.',
        nursingCare:
          'Usar luvas de proteção; não forçar a deglutição caso o animal esteja vomitando ativamente; certificar-se de que não permaneceu resíduo aderido ao comedouro.',
        limitations:
          'Intolerância gastrintestinal na 1ª semana; impossibilidade de administração em animais em jejum estrito ou com vômitos intratáveis.',
      },
    ],
    pharmacologicalClassification: {
      chemicalClass: 'Alquilfosfocolina (Hexadecilfosfocolina / fosfolipídio sintético)',
      chemicalClassDescription:
        'Molécula anfifílica constituída por uma cadeia alifática linear saturada de 16 átomos de carbono ligada a um éster de fosfocolina.',
      therapeuticClass: 'Antiprotozoário leishmanicida oral',
      therapeuticClassDescription:
        'Agente antiparasitário que interfere na homeostase de membranas, fosfolipídios, função mitocondrial e cálcio intracelular de protozoários do gênero Leishmania.',
      atcCode: 'P01CX04',
      receptorTargets: [
        'Transportador de miltefosina de Leishmania (LMT - aminofosfolipídio ATPase)',
        'Subunidade LdRos3',
        'Fosfocolina-citidililtransferase (CCT parasitária)',
        'Complexo IV mitocondrial (Citocromo-c oxidase parasitária)',
        'Acidocalcissomos (bomba Ca²+/H⁺ do parasita)',
      ],
      detailedTargets: [
        {
          target: 'Complexo LMT/Ros3',
          action: 'Translocação ativa do fármaco da fenda extracelular para o citoplasma do amastigota',
          clinicalSignificance:
            'A perda funcional deste complexo reduz a concentração intracelular e confere resistência parasitária adquirida.',
        },
        {
          target: 'Citocromo-c oxidase mitocondrial',
          action: 'Inibição do transporte de elétrons e dissipação do potencial ΔΨm',
          clinicalSignificance:
            'Esgotamento crítico de ATP e deflagração de apoptose no parasito intracelular.',
        },
        {
          target: 'Fosfocolina-citidililtransferase (CCT)',
          action: 'Inibição enzimática competitiva na via de Kennedy',
          clinicalSignificance:
            'Bloqueio da síntese e remodelamento de fosfatidilcolina com desestruturação da membrana parasitária.',
        },
      ],
    },
    prescriptionType: {
      category: 'Medicamento Veterinário Sujeito a Controle Especial',
      ordinanceOrLaw: 'Portaria MAPA nº 837/2025 e Portaria Interministerial nº 1.426/2008',
      retentionRequired: true,
      guidelines:
        'Prescrição privativa de médico-veterinário através de Notificação de Receita Veterinária (NRV/MAPA) em 2 vias brancas; validade de 30 dias corridos; retenção obrigatória da 1ª via pelo estabelecimento distribuidor/farmácia veterinária; registro compulsório e manutenção de controle vetorial repelente.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Espécie-alvo primária de Leishmania infantum e farmacocinética peculiar',
        description:
          'O cão é o principal reservatório doméstico da leishmaniose visceral urbana. A miltefosina possui biodisponibilidade oral de ~94% e meia-vida longa de 6,9 dias, gerando acúmulo contínuo até o final do ciclo de 28 dias. Embora promova remissão clínica e queda marcante da carga parasitária, não produz esterilização tecidual completa, podendo o cão permanecer infectante para flebotomíneos se não for devidamente protegido com inseticidas repelentes.',
        clinicalImplications:
          'Acompanhamento sorológico e parasitológico periódico por toda a vida; manter coleira repelente; não suspender o ciclo precocemente.',
      },
      {
        species: 'cat',
        title: 'Ausência de posologia validada e contraindicação na esporotricose',
        description:
          'Gatos são infectados de forma atípica por L. infantum. A literatura científica veterinária não possui estudos farmacocinéticos robustos que validem a segurança ou eficácia da miltefosina na espécie felina. Adicionalmente, seu uso em esporotricose felina foi formalmente testado e reprovado (Silva et al. 2018), com ausência de benefício e severa intolerância sistêmica.',
        clinicalImplications:
          'Não prescrever miltefosina para gatos com esporotricose. Na leishmaniose felina, preferir protocolos baseados em alopurinol.',
      },
    ],
    curiositiesAndHistory: [
      'Desenvolvida originalmente na década de 1980 como fármaco antineoplásico para câncer de mama, a miltefosina teve seu potencial leishmanicida descoberto nos anos 1990 devido à similaridade bioquímica das membranas de protozoários tripanossomatídeos.',
      'Tornou-se o primeiro leishmanicida de administração exclusivamente oral no mundo para o tratamento da leishmaniose visceral humana na Índia (aprovada em 2002 para combater cepas resistentes ao antimônio).',
      'No Brasil, o Milteforan® foi o primeiro produto leishmanicida a obter registro oficial perante o Ministério da Agricultura (MAPA) para o tratamento da leishmaniose visceral canina em 2016, quebrando um veto histórico de décadas ao tratamento da doença no país.',
    ],
  },

  clinicalStudiesCommented: [
    {
      title:
        'Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis',
      authorsYear: 'Miró G, Oliva G, Cruz I, et al. (2009)',
      journal: 'Veterinary Dermatology, 20(5-6):397–404',
      studyDesign: 'Ensaio clínico prospectivo, multicêntrico, controlado e randomizado',
      sampleSize: 'Cães naturalmente infectados com leishmaniose clínica distribuídos em múltiplos centros europeus',
      mainFindings:
        'Comparou a combinação de miltefosina (2 mg/kg VO q24h por 28 dias) associada ao alopurinol versus o protocolo padrão europeu de antimoniato de meglumina + alopurinol. Ambos os regimes promoveram reduções estatisticamente equivalentes nos escores de gravidade clínica e na carga parasitária linfonodal ao longo de 6 meses de acompanhamento, com perfil de segurança favorável e menor frequência de dor/reações no local de injeção no grupo miltefosina oral.',
      clinicalTakeaway:
        'Estudo seminal que consolidou a miltefosina oral associada ao alopurinol como uma das terapias de primeira linha para leishmaniose canina.',
      referenceId: 'ref-miro-2009-multicentric',
    },
    {
      title: 'Study of efficacy of miltefosine and allopurinol in dogs with leishmaniosis',
      authorsYear: 'Manna L, Vitale F, Reale S, et al. (2009)',
      journal: 'The Veterinary Journal, 182(3):441–445',
      studyDesign: 'Ensaio clínico prospectivo controlado com monitoramento quantitativo por qPCR',
      sampleSize: '28 cães naturalmente acometidos por Leishmania infantum',
      mainFindings:
        'A administração de miltefosina oral associada a alopurinol resultou em redução marcante da carga parasitária na medula óssea e sangue periférico em todos os cães avaliados, acompanhada de recuperação hematológica e proteica. Contudo, a qPCR revelou que nenhum cão atingiu a esterilização parasitológica completa (DNA parasitário permaneceu detectável em níveis residuais). Alguns cães submetidos a um segundo ciclo terapêutico não obtiveram eliminação dos parasitas restantes.',
      clinicalTakeaway:
        'Demonstrou clinicamente que a miltefosina não erradica o parasita e que repetir ciclos sucessivos não garante esterilização tecidual.',
      referenceId: 'ref-manna-2009-efficacy',
    },
    {
      title:
        'Comparative study on the short term efficacy and adverse effects of miltefosine and meglumine antimoniate in dogs with natural leishmaniosis',
      authorsYear: 'Mateo M, Ramos C, et al. (2009)',
      journal: 'Parasitology Research, 105:155–162',
      studyDesign: 'Ensaio clínico prospectivo comparativo curto-prazo',
      sampleSize: 'Cães com leishmaniose clínica acompanhados durante os primeiros 30 dias de tratamento',
      mainFindings:
        'Avaliou o impacto renal e gastrintestinal comparativo entre miltefosina oral e antimoniato de meglumina injetável. Os cães tratados com miltefosina apresentaram vômitos e fezes amolecidas leves nos primeiros dias, porém sem elevação de marcadores de lesão tubular renal, em nítido contraste com o grupo tratado com antimoniato que exibiu dano tubular renal transitório.',
      clinicalTakeaway:
        'Comprovou a menor nefrotoxicidade tubular da miltefosina em relação aos antimoniais pentavalentes na fase aguda.',
      referenceId: 'ref-mateo-2009-comparative',
    },
    {
      title:
        'Comparison of two dosing regimens of miltefosine, both in combination with allopurinol, on clinical and parasitological findings of dogs with leishmaniosis: a pilot study',
      authorsYear: 'Iarussi F, et al. (2020)',
      journal: 'Frontiers in Veterinary Science, 7:577395',
      studyDesign: 'Ensaio clínico piloto prospectivo comparativo randomizado',
      sampleSize: 'Cães com leishmaniose espontânea divididos em regime de dose fixa versus dose escalonada',
      mainFindings:
        'Comparou o regime tradicional de miltefosina (2 mg/kg q24h por 28 dias) versus um regime escalonado (1,5 mg/kg por 5 dias e 2,5 mg/kg por 23 dias). Não houve diferença estatisticamente significativa na taxa de remissão clínica, na redução da carga parasitária nem na ocorrência de efeitos adversos digestivos entre os dois grupos.',
      clinicalTakeaway:
        'Sustenta a recomendação de manter a posologia padrão e simplificada de 2 mg/kg q24h por 28 dias.',
      referenceId: 'ref-iarussi-2020-regimens',
    },
    {
      title:
        'Therapeutic success and failure in using miltefosine to treat dogs naturally infected with Leishmania infantum',
      authorsYear: 'Gonçalves G, et al. (2024)',
      journal: 'Revista Brasileira de Parasitologia Veterinária, 33(1):e015023',
      studyDesign: 'Estudo de coorte clínica prospectiva longitudinal em região endêmica brasileira',
      sampleSize: 'Cães naturalmente infectados acompanhados no Brasil pós-Milteforan',
      mainFindings:
        'Acompanhou cães tratados com o protocolo brasileiro de miltefosina. Constatou que, a despeito de excelente taxa inicial de cura clínica e recuperação física dos cães, uma parcela substancial dos animais manteve DNA parasitário detectável por PCR quantitativo na pele e medula óssea, com elevação gradual da carga parasitária meses após a conclusão do ciclo, culminando em recaídas clínicas.',
      clinicalTakeaway:
        'Evidenciou no cenário epidemiológico brasileiro contemporâneo que a melhora clínica visual não equivale à cura biológica e exige monitoramento.',
      referenceId: 'ref-goncalves-2024-brazil',
    },
    {
      title: 'Updated Canine Leishmaniosis Working Group recommendations for leishmaniosis in dogs: Q&A on clinical management',
      authorsYear: 'Roura X, et al. / CLWG (2026)',
      journal: 'Parasites & Vectors, 19:305',
      studyDesign: 'Consenso internacional de especialistas e revisão sistemática baseada em evidências',
      sampleSize: 'Painel internacional de especialistas da Europa e Américas',
      mainFindings:
        'Revisou amplamente as opções terapêuticas da LVC. Reposicionou a miltefosina + alopurinol como regime de segunda escolha/alternativo frente ao antimoniato de meglumina + alopurinol, embasando-se em taxas mais altas de recidiva precoce e risco documentado de seleção de resistência de L. infantum e resistência cruzada com anfotericina B.',
      clinicalTakeaway:
        'Marco na literatura contemporânea de 2026 que altera a hierarquia de escolha dos leishmanicidas na Europa e acende alerta de farmacovigilância.',
      referenceId: 'ref-clwg-2026-recommendations',
    },
    {
      title: 'Miltefosine Administration in Cats with Refractory Sporotrichosis',
      authorsYear: 'Silva FDS, et al. (2018)',
      journal: 'Acta Scientiae Veterinariae, 46:Pub. 1599',
      studyDesign: 'Ensaio clínico prospectivo não controlado de fase II em felinos',
      sampleSize: '10 gatos naturalmente acometidos por esporotricose refratária ao itraconazol/terbinafina',
      mainFindings:
        'A administração de miltefosina (2 mg/kg VO q24h por mediana de 30 dias) não promoveu melhora clínica satisfatória em nenhum dos 10 gatos tratados. Houve 70% de perda ponderal e anorexia acentuada, vômitos e diarreia frequentes, e 40% desenvolveram anemia normocítica normocrômica.',
      clinicalTakeaway:
        'Contraindica formalmente a miltefosina para esporotricose felina devido à ineficácia microbiológica e alta toxicidade clínica.',
      referenceId: 'ref-silva-2018-cat-sporotrichosis',
    },
  ],

  monitoringParameters: [
    'Avaliação pré-tratamento obrigatória: escore clínico de gravidade, peso corporal exato, hemograma completo, perfil bioquímico (creatinina, ureia, SDMA, ALT, fosfatase alcalina, albumina, globulinas, relação A:G), eletroforese de proteínas séricas, urinálise completa com relação proteína:creatinina urinária (UPC) e aferição da pressão arterial sistólica (PAS).',
    'Monitoramento durante os 28 dias do ciclo: pesagem semanal, avaliação rigorosa do apetite, frequência de êmese e consistência fecal; garantir hidratação adequada.',
    'Monitoramento pós-tratamento programado (ao término dos 28 dias, aos 3 meses, 6 meses e 12 meses): reavaliação do estadiamento renal IRIS, relação UPC urinária, titulação de anticorpos (sorologia quantitativa) e perfil proteico.',
    'Interpretação da sorologia: títulos de anticorpos diminuem muito lentamente após a terapia e podem permanecer positivos por meses a anos; títulos não devem ser utilizados como critério único de cura ou de retratamento imediato.',
    'Vigilância para recidiva clínica ou resistência: retorno de lesões cutâneas, perda de peso, uveíte ou agravamento de proteinúria/azotemia devem deflagrar investigação diagnóstica de atividade parasitária e reavaliação de adesão.',
  ],

  clientInformation: [
    'O Milteforan® é o medicamento aprovado no Brasil para o tratamento da leishmaniose visceral canina. Ele reduz os sintomas e a quantidade de parasitas no organismo, permitindo que o cão recupere sua saúde e vitalidade.',
    'ATENÇÃO: Este remédio NÃO elimina completamente o parasita do corpo do cão. O animal permanecerá portador da infecção por toda a vida e precisará de acompanhamento com o veterinário periodicamente.',
    'USO OBRIGATÓRIO DE COLEIRA REPELENTE: Mesmo após o tratamento com sucesso, o cão ainda pode transmitir o parasita se for picado pelo mosquito-palha. O uso ininterrupto de coleiras ou produtos repelentes aprovados contra o mosquito é uma obrigação legal e de saúde pública para proteger sua família e outros animais.',
    'COMO ADMINISTRAR: Dê o remédio uma vez ao dia, exatamente no mesmo horário, misturado a uma colherada de comida saborosa ou petisco úmido, imediatamente antes da refeição. Nunca dê com o estômago vazio.',
    'NÃO BALANCE O FRASCO COM FORÇA: Agitar o frasco forma muita espuma e impede que você meça a quantidade certa na seringa. Apenas gire o frasco suavemente nas mãos.',
    'USE LUVAS DE PROTEÇÃO: Use sempre luvas ao manusear e dar o remédio. Lave as mãos com água e sabão em seguida.',
    'ALERTA GRAVÍSSIMO PARA GESTANTES: Mulheres grávidas ou que estejam tentando engravidar NUNCA devem encostar no remédio ou dá-lo ao animal, pois ele pode causar defeitos congênitos graves e perda do bebê.',
    'EFEITOS DIGESTIVOS: É comum o cão ter vômitos leves ou fezes moles nos primeiros dias de tratamento. Não pare o remédio por conta própria. Se o animal vomitar muitas vezes no mesmo dia ou parar de comer completamente, avise imediatamente o médico-veterinário.',
    'NUNCA ENCURTE O TRATAMENTO: O ciclo dura exatamente 28 dias seguidos. Parar antes do prazo ou esquecer doses faz com que os parasitas fiquem resistentes ao medicamento.',
  ],

  relatedDiseaseSlugs: ['leishmaniose-caes-gatos'],

  references: [
    {
      id: 'ref-wavd-2025-consensus',
      title:
        'World Association for Veterinary Dermatology Consensus Statement for Diagnosis, and Evidence-Based Clinical Practice Guidelines for Treatment and Prevention of Canine Leishmaniosis',
      authors: 'Saridomichelakis MN, Baneth G, Bourdeau P, et al.',
      year: 2025,
      citation: 'Veterinary Dermatology, 36(6):723–787.',
      doi: '10.1111/vde.70006',
      url: 'https://doi.org/10.1111/vde.70006',
    },
    {
      id: 'ref-clwg-2026-recommendations',
      title:
        'Updated Canine Leishmaniosis Working Group recommendations for leishmaniosis in dogs: Q&A on clinical management',
      authors: 'Roura X, et al. / Canine Leishmaniosis Working Group (CLWG)',
      year: 2026,
      citation: 'Parasites & Vectors, 19:305.',
      doi: '10.1186/s13071-026-07446-6',
      url: 'https://doi.org/10.1186/s13071-026-07446-6',
    },
    {
      id: 'ref-leishvet-2025-guidelines',
      title: 'Practical Management of Canine Leishmaniosis — LeishVet Guidelines',
      authors: 'LeishVet Group (Solano-Gallego L, Miró G, Koutinas A, et al.)',
      year: 2025,
      citation: 'LeishVet Consensus Guidelines. 5th update, 2024/2025.',
      url: 'https://www.leishvet.org',
    },
    {
      id: 'ref-plumbs-10-miltefosine',
      title: 'Plumb’s Veterinary Drug Handbook, 10th Edition — Miltefosine Monograph',
      authors: 'Budde JA, McCluskey DM',
      year: 2023,
      citation: 'Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023: pp. 887–888 (PDF pp. 914–915).',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781394172207',
    },
    {
      id: 'ref-bsava-10-miltefosine',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th Edition — Miltefosine Monograph',
      authors: 'Ramsey I (Ed)',
      year: 2020,
      citation: 'BSAVA Small Animal Formulary, Part A. 10th ed. British Small Animal Veterinary Association; 2020: pp. 268–269.',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
    },
    {
      id: 'ref-vin-2025-miltefosine',
      title: 'VIN Veterinary Drug Handbook — Miltefosine Clinical Review',
      authors: 'Veterinary Information Network (VIN)',
      year: 2025,
      citation: 'VIN Veterinary Drug Handbook. Updated review. Veterinary Information Network, Davis, CA.',
      url: 'https://www.vin.com',
    },
    {
      id: 'ref-portaria-mapa-837-2025',
      title: 'Portaria MAPA nº 837/2025 — Regime de Controle Especial de Medicamentos Veterinários e NRV',
      authors: 'Ministério da Agricultura e Pecuária (MAPA)',
      year: 2025,
      citation: 'Diário Oficial da União. Portaria MAPA nº 837, disciplinando substâncias sob controle e a Notificação de Receita Veterinária.',
      url: 'https://www.gov.br/agricultura/pt-br',
    },
    {
      id: 'ref-manual-ms-lvc-2026',
      title: 'Manual de Vigilância e Controle da Leishmaniose Visceral, Edição 2026',
      authors: 'Ministério da Saúde do Brasil — Secretaria de Vigilância em Saúde e Ambiente',
      year: 2026,
      citation: 'Ministério da Saúde. Manual de Vigilância e Controle da Leishmaniose Visceral. Brasília: Ministério da Saúde; 2026.',
      url: 'https://www.gov.br/saude/pt-br',
    },
    {
      id: 'ref-miro-2009-multicentric',
      title:
        'Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis',
      authors: 'Miró G, Oliva G, Cruz I, et al.',
      year: 2009,
      citation: 'Vet Dermatol. 2009;20(5-6):397–404.',
      doi: '10.1111/j.1365-3164.2009.00824.x',
      url: 'https://doi.org/10.1111/j.1365-3164.2009.00824.x',
    },
    {
      id: 'ref-manna-2009-efficacy',
      title: 'Study of efficacy of miltefosine and allopurinol in dogs with leishmaniosis',
      authors: 'Manna L, Vitale F, Reale S, et al.',
      year: 2009,
      citation: 'Vet J. 2009;182(3):441–445.',
      doi: '10.1016/j.tvjl.2008.08.009',
      url: 'https://doi.org/10.1016/j.tvjl.2008.08.009',
    },
    {
      id: 'ref-silva-2018-cat-sporotrichosis',
      title: 'Miltefosine Administration in Cats with Refractory Sporotrichosis',
      authors: 'Silva FDS, et al.',
      year: 2018,
      citation: 'Acta Sci Vet. 2018;46:Pub. 1599.',
      doi: '10.22456/1679-9216.83639',
      url: 'https://doi.org/10.22456/1679-9216.83639',
    },
  ],
};
