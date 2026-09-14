import type { MedicationRecord } from '../../types/medication';

export const clindamicinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-clindamicina',
    slug: 'clindamicina',
    title: 'Clindamicina',
    activeIngredient: 'Cloridrato de clindamicina / Fosfato de clindamicina / Palmitato de clindamicina',
    pharmacologicClass:
      'Antibacteriano e antiprotozoário da classe das lincosamidas; inibidor da síntese proteica na subunidade ribossomal 50S bacteriana e no apicoplasto de protozoários',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Clindamicina',
      'Lincosamidas',
      'Clinbacter',
      'Dalacin C',
      'Antirobe',
      'Piodermite Canina',
      'Osteomielite',
      'Infecção Odontológica',
      'Toxoplasmose Felina',
      'Neosporose Canina',
      'Piotórax',
      'ISCAID 2025',
      'D-Test',
      'Estenose Esofágica',
    ],
    tradeNames: [
      'Clinbacter® Comprimidos Palatáveis 75 mg e 150 mg (Agener União — Uso Veterinário Oficial)',
      'Dalacin C® Cápsulas 300 mg (Pfizer — Uso Humano sob Retenção de Receita)',
      'Fosfato de Clindamicina Solução Injetável 150 mg/mL (Pfizer / Genéricos — Uso Hospitalar Parenteral)',
      'Antirobe® / Clinacin® / Clindaseptin® / Zodon® (Marcas Internacionais Veterinárias)',
    ],
    officialSiteUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos-pt/clinbacter/',
    leafletUrl: 'https://agener.com.br/wp-content/uploads/2020/05/4020676-Clinbacter.pdf',
    mechanismOfAction:
      'A clindamicina é um antimicrobiano semissintético da classe das lincosamidas, derivado clorado da lincomicina, que exerce atividade antibacteriana tempo-dependente através da ligação seletiva e de alta afinidade à porção 23S do RNA ribossômico (rRNA) na subunidade 50S do ribossomo bacteriano 70S. Ao fixar-se adjacentemente ao centro da peptidil-transferase e ao túnel de saída do peptídeo nascente, a molécula bloqueia estericamente a formação da ligação peptídica e a translocação do tRNA, impedindo a elongação das cadeias polipeptídicas. Como resultado direto, cessa a produção de proteínas estruturais, enzimas vitais e exotoxinas estafilocócicas e estreptocócicas. Conforme a concentração tecidual, a carga de inóculo e a sensibilidade do microrganismo, atua como bacteriostática ou bactericida. Em protozoários apicomplexos (Toxoplasma gondii e Neospora caninum), a clindamicina atua sobre os ribossomos do apicoplasto — uma organela celular de ancestralidade procariótica —, suprimindo a tradução de proteínas essenciais e desencadeando o fenômeno de morte retardada (delayed death), no qual a replicação das progênies subsequentes é inviabilizada.',
    plainLanguageSummary:
      'Antimicrobiano da família das lincosamidas com ação potente contra bactérias Gram-positivas (como Staphylococcus e Streptococcus), bactérias anaeróbias estritas (que vivem sem oxigênio em feridas profundas, boca e pulmões) e protozoários intracelulares como Toxoplasma gondii e Neospora caninum. PONTOS CRÍTICOS DE PLANTÃO: 1) ALERTA MÁXIMO EM GATOS (Beatty et al., 2006): NUNCA administrar comprimidos ou cápsulas a seco (dry-pilling). A forma sólida retida no esôfago do gato sofre dissolução estagnada, causando esofagite cáustica grave e estenose esofágica cicatricial irreversível. Sempre fornecer imediatamente 5 a 10 mL de água ou alimento úmido logo após a ingestão. 2) D-TEST E RESISTÊNCIA INDUZÍVEL: Isolados de Staphylococcus resistentes à eritromicina mas aparentemente sensíveis à clindamicina no antibiograma podem conter o gene erm induzível. Se o D-test for positivo, a clindamicina falhará clinicamente e NÃO deve ser usada. 3) ESPECTRO FOCADO: Não possui cobertura eficaz contra bactérias Gram-negativas aeróbias (E. coli, Pseudomonas, Proteus) nem Enterococcus. Em sepse ou piotórax, é indispensável associar outro antimicrobiano (como fluoroquinolona). 4) BAIXA EXCREÇÃO URINÁRIA ATIVA: É metabolizada no fígado e eliminada pelas fezes e bile, com concentrações urinárias ativas insuficientes para infecções de trato urinário.',

    indications: [
      'Foliculite bacteriana superficial canina com falha de terapia tópica e piodermites profundas por Staphylococcus pseudintermedius sensível (ISCAID 2025).',
      'Osteomielite canina aguda e crônica decorrente de fraturas expostas, cirurgias ortopédicas ou disseminação hematogênica por Gram-positivos e anaeróbios suscetíveis.',
      'Abscessos subcutâneos, celulites, feridas por mordedura contaminadas e infecções periodontais ou de polpa dentária.',
      'Toxoplasmose clínica felina sistêmica, ocular (uveíte, retinocoroidite) e neurológica (SNC) em cursos de pelo menos 4 semanas.',
      'Neosporose canina clínica (miosite ascendente e polirradiculoneurite com paresia de membros pélvicos em filhotes e jovens).',
      'Piotórax e pneumonia por aspiração mista em cães e gatos, atuando como componente bactericida anaeróbio e Gram-positivo em protocolos combinados.',
    ],

    contraindications: [
      'Hipersensibilidade prévia conhecida à clindamicina ou à lincomicina.',
      'Espécies herbívoras e fermentadoras cecocólicas: contraindicação absoluta em equinos, ruminantes, coelhos, porquinhos-da-índia, hamsters e chinchilas (risco fatal de enterocolite necrotizante e enterotoxemia clostridial).',
      'Administração intravenosa em bólus rápido não diluído (risco de colapso cardiovascular agudo, hipotensão severa, arritmias ventriculares e morte).',
      'Monoterapia empírica em infecções urinárias rotineiras (concentrações ativas de clindamicina livre na urina são muito baixas).',
      'Monoterapia empírica para sepse de foco abdominal ou choque séptico sem associação de cobertura contra Gram-negativos aeróbios (Enterobacterales e Pseudomonas).',
      'Isolados de Staphylococcus com D-test positivo para resistência MLSB induzível (falha terapêutica documentada in vivo).',
    ],

    cautions: [
      'Administração oral em felinos (Prevenção de Estenose Esofágica): nunca realizar dry-pilling. Oferecer sempre alíquota de água (3 a 5 mL) ou petisco úmido imediatamente após qualquer cápsula ou comprimido.',
      'D-Test e Resistência Induzível (Gene erm): em qualquer isolado estafilocócico resistente à eritromicina, exigir teste de aproximação de disco (D-zone test) antes de confiar no laudo de sensibilidade à clindamicina.',
      'Monitoramento em terapias prolongadas (> 30 dias): realizar avaliação periódica de enzimas hepáticas (ALT, AST, FA) e creatinina em protocolos longos de osteomielite e neosporose.',
      'Infusão intravenosa intermitente obrigatória: sempre diluir a formulação injetável (fosfato de clindamicina) para concentração igual ou inferior a 18 mg/mL e infundir em período de 10 a 60 minutos, sem exceder a taxa máxima de 30 mg/minuto.',
      'Associação obrigatória em infecções graves mistas: em piotórax, peritonite ou sepse, a clindamicina cobre com maestria cocos Gram-positivos e anaeróbios estritos, mas necessita de parceiro contra Gram-negativos aeróbios (como fluoroquinolona ou amicacina).',
      'Hepatopatia e nefropatia avançadas: o fármaco é biotransformado pelo fígado e sua depuração depende da integridade hepática; embora ajustes pré-fixados não sejam padronizados, monitorar sinais de acúmulo em insuficiência descompensada.',
    ],

    adverseEffects: [
      'Distúrbios gastrointestinais leves a moderados em cães e gatos: êmese, náusea, amolecimento fecal e hiporexia (relativamente comuns, mitigados pela administração concomitante a alimento).',
      'Esofagite cáustica de contato e estenose esofágica cicatricial grave em felinos recebendo comprimidos ou cápsulas a seco (Beatty et al., 2006).',
      'Sialorreia profusa, aversão gustativa intensa e movimentos de deglutição (lip-smacking) em gatos devido ao sabor extremamente amargo da molécula.',
      'Dor, irritação local transitória e formação de edema estéril no sítio de injeção intramuscular profunda.',
      'Diarreia sanguinolenta ou colite em cães sob altas doses ou terapias muito prolongadas (raro, mas requer suspensão imediata).',
      'Elevação enzimática hepática assintomática (aumentos discretos de ALT, AST e fosfatase alcalina sem disfunção clínica evidente).',
      'Potencialização transitória de bloqueio neuromuscular durante procedimentos anestésicos envolvendo relaxantes musculares periféricos (atracúrio, pancurônio).',
    ],

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Bloqueio Ribossomal 50S',
        icon: 'Shield',
        desc: 'Ligação de alta afinidade ao sítio 23S rRNA da subunidade 50S bacteriana, inibindo a peptidil-transferase e a translocação de cadeias peptídicas com potente supressão de toxinas.',
      },
      {
        title: 'Anaeróbios e Gram-Positivos',
        icon: 'Droplets',
        desc: 'Excelente cobertura contra estafilococos, estreptococos e anaeróbios estritos (Bacteroides, Clostridium, Fusobacterium), ideal para abscessos, cavidade pleural e periodonto.',
      },
      {
        title: 'Distribuição Óssea Profunda',
        icon: 'Lock',
        desc: 'Alta lipofilicidade com penetração extraordinária em tecido ósseo, líquido sinovial, periósteo e interior de fagócitos, constituindo referência para osteomielite canina.',
      },
      {
        title: 'Ação no Apicoplasto',
        icon: 'Clock',
        desc: 'Bloqueio seletivo da tradução proteica no apicoplasto de Toxoplasma gondii e Neospora caninum, exercendo fenômeno de delayed death essencial para resolução de protozooses.',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Piodermite Bacteriana Canina Sistêmica (Diretriz ISCAID 2025)',
        species: 'dog',
        doseSummary: '11 mg/kg VO a cada 12 horas (ou 10 mg/kg q12h com Clinbacter®)',
        route: 'Oral (VO com alimento)',
        duration: 'Superficial: 2 semanas iniciais; Profunda: 3 semanas iniciais com reavaliação citológica',
        clinicalContext:
          'Reservada para foliculite com impossibilidade de banhos terapêuticos ou piodermite profunda por MSSP. Citologia obrigatória e reavaliação antes de estender o curso.',
      },
      {
        condition: 'Osteomielite Bacteriana Canina Aguda ou Crônica',
        species: 'dog',
        doseSummary: '11 a 33 mg/kg VO a cada 12 horas (padrão ouro experimental: 11 mg/kg q12h)',
        route: 'Oral (VO)',
        duration: 'Mínimo obrigatório de 28 dias consecutivos (avaliar radiografia e PCR)',
        clinicalContext:
          'Penetração óssea superior com taxas de cura microbiológica de 93,7% em ensaios controlados (Braden et al.). Cirurgia de desbridamento e estabilização devem acompanhar o protocolo.',
      },
      {
        condition: 'Abscessos, Feridas Infectadas e Infecção Odontológica / Periodontal',
        species: 'both',
        doseSummary: '10 mg/kg VO a cada 12 horas (dose de bula Clinbacter®) ou 5,5 a 11 mg/kg q12h',
        route: 'Oral (VO)',
        duration: '7 a 14 dias (desbridamento, drenagem cirúrgica e extração dentária são mandatórios)',
        clinicalContext:
          'Atinge concentrações elevadas na mandíbula, gengiva e interior de abscessos. Em gatos, administrar sempre com água ou alimento úmido.',
      },
      {
        condition: 'Toxoplasmose Clínica Felina (Sistêmica, Ocular e Neurológica)',
        species: 'cat',
        doseSummary: '12,5 mg/kg VO a cada 12 horas (25 mg/kg/dia); em SNC: 15 a 25 mg/kg q12h (30 a 50 mg/kg/dia)',
        route: 'Oral (VO com alíquota de água) ou IV lenta',
        duration: 'Mínimo de 4 semanas ininterruptas (risco de recidiva se suspenso precocemente)',
        clinicalContext:
          'Bloqueia o apicoplasto com melhora clínica em 48 a 72h. Nelson & Couto alerta que cursos inferiores a 28 dias favorecem recidivas. Casos com uveíte requerem corticoide local.',
      },
      {
        condition: 'Neosporose Canina Clínica (Miosite e Radiculoneurite Ascendente)',
        species: 'dog',
        doseSummary: '10 mg/kg VO a cada 8 horas ou 15 mg/kg VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: '4 a 8 semanas consecutivas (iniciar imediatamente diante de suspeita em filhotes)',
        clinicalContext:
          'Janela terapêutica urgente antes que a inflamação muscular e radicular evolua para contratura fibrosa permanente dos membros pélvicos.',
      },
      {
        condition: 'Piotórax e Sepse: Componente Anaeróbio e Gram-Positivo',
        species: 'both',
        doseSummary: '10 mg/kg IV lenta a cada 12 horas (diluída em SF 0,9% em 10 a 60 min)',
        route: 'Intravenosa (IV intermitente lenta, nunca bólus)',
        duration: 'Conforme evolução clínica, resolução do empiema pleural e retirada de drenos',
        clinicalContext:
          'Excelente cobertura anaeróbia em fluidos purulentos. DEVE ser associada a fluoroquinolona ou aminoglicosídeo para cobertura de Gram-negativos aeróbios.',
      },
    ],

    // 3. Indicações Clínicas Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-clinda-pyoderma-iscaid-2025',
        indication: 'Piodermite Bacteriana Canina Sistêmica (Consenso ISCAID 2025)',
        clinicalContext:
          'As diretrizes mundiais da ISCAID de 2025 estabelecem uma hierarquia estrita: a terapia tópica com xampus de clorexidina a 3-4% constitui a primeira escolha para foliculite superficial, visando reduzir o uso de antimicrobianos sistêmicos. Quando a terapia tópica é inviável, ineficaz ou o quadro atinge planos dérmicos profundos (furunculose e celulite), a clindamicina oral é uma das principais escolhas de primeira linha para cepas de Staphylococcus pseudintermedius sensíveis à meticilina (MSSP). Embora o regime de 5,5 mg/kg q12h ou 11 mg/kg q24h apresente eficácia histórica, o consenso ISCAID 2025 recomenda 11 mg/kg a cada 12 horas para obter resposta clínica e microbiológica mais consistente. Importante: não há base científica para a antiga prática de manter o antibiótico por duas semanas após a cura clínica; o tratamento deve ser suspenso assim que as lesões macroscópicas e a citologia confirmarem resolução.',
        species: 'dog',
        dose: '11 mg/kg VO a cada 12 horas (ou 10 mg/kg q12h conforme apresentação veterinária)',
        route: 'Oral (VO administrado com alimentos para evitar náuseas)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Superficial: 2 semanas com reavaliação; Profunda: 3 semanas com controle citológico',
        mechanismOfAction:
          'Inibição ribossomal 50S com supressão da síntese proteica e redução na liberação de enterotoxinas e fatores de virulência de Staphylococcus pseudintermedius.',
        clinicalRationale:
          'Apresenta alta concentração na derme e glândulas sebáceas caninas, atingindo níveis teciduais que superam a MIC90 de estafilococos suscetíveis.',
        monitoring: 'Citologia por aposição com fita adesiva ou swab no dia zero e na reavaliação (pesquisa de neutrófilos e cocos fagocitados).',
        referenceIds: ['ref-iscaid-pyoderma-2025', 'ref-littlewood-1999', 'ref-plumbs-10th-clinda'],
        evidenceLevel: 'Consenso Internacional Especializado ISCAID 2025 / Ensaio Randomizado Littlewood (Nível 1b)',
      },
      {
        id: 'ind-clinda-osteomyelitis',
        indication: 'Osteomielite Bacteriana Aguda e Crônica Canina',
        clinicalContext:
          'Infecções ósseas bacterianas em cães decorrem frequentemente de traumas penetrantes, fraturas com exposição, fixações cirúrgicas ou disseminação hematogênica, apresentando sequestro ósseo, desvascularização local e formação de biofilme por Staphylococcus aureus, S. pseudintermedius e anaeróbios. A clindamicina é um dos poucos antimicrobianos dotados de elevada avidez por tecido ósseo cortical e trabecular, mantendo níveis terapêuticos na matriz óssea e no fluido sinovial. O ensaio experimental de Braden et al. (1988) demonstrou esterilização de medula óssea em 93,7% dos cães tratados com 11 mg/kg q12h por 28 dias versus 46,1% nos controles não tratados. A intervenção cirúrgica (remoção de implantes frouxos, sequestrectomia e curetagem) deve ser associada.',
        species: 'dog',
        dose: '11 a 33 mg/kg VO a cada 12 horas (dose padrão: 11 mg/kg q12h)',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Mínimo de 28 dias consecutivos (podendo atingir 6 a 8 semanas guiadas por imagem e PCR)',
        mechanismOfAction:
          'Penetração óssea profunda da fração lipofílica livre com ligação ao ribossomo 50S e atividade bactericida contra Gram-positivos em tecidos de baixa perfusão.',
        clinicalRationale:
          'Apresentação de penetração óssea consagrada pelo FDA e pela literatura mundial para o tratamento de osteomielite canina por patógenos suscetíveis.',
        monitoring: 'Radiografias ortopédicas seriadas a cada 3 a 4 semanas, dosagem de Proteína C Reativa (PCR) como marcador inflamatório e perfil hepatorrenal a cada 30 dias.',
        referenceIds: ['ref-braden-1988-osteomyelitis', 'ref-plumbs-10th-clinda', 'ref-bsava-10th-clinda'],
        evidenceLevel: 'Ensaio Controlado Padrão Ouro Braden 1988 / Monografia FDA Plumb (Nível 1b)',
      },
      {
        id: 'ind-clinda-dental-wounds',
        indication: 'Feridas Contaminadas, Abscessos Subcutâneos e Doença Periodontal / Odontogênica',
        clinicalContext:
          'Infecções da cavidade oral, abscessos retrobulbares, periodontites e celulites por mordedura apresentam flora bacteriana complexa dominada por anaeróbios estritos (Porphyromonas, Prevotella, Fusobacterium, Peptostreptococcus) e cocos Gram-positivos. A clindamicina é altamente lipofílica, concentra-se ativamente no interior de neutrófilos e macrófagos e atinge concentrações no fluido crevicular gengival e osso alveolar muito superiores às concentrações séricas. Em cães e gatos, o Clinbacter® tem dose de bula brasileira de 10 mg/kg a cada 12 horas. Ressalta-se que o antibiótico é coadjuvante e não substitui o controle mecânico: drenagem ampla de abscessos e tartarectomia com extração de dentes comprometidos são etapas mandatórias.',
        species: 'both',
        dose: '10 mg/kg VO a cada 12 horas (dose de bula Clinbacter®) ou 5,5 a 11 mg/kg q12h',
        route: 'Oral (VO com alimento; gatos NUNCA a seco)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 14 dias conforme gravidade e intervenção periodontal',
        mechanismOfAction:
          'Bloqueio ribossomal 50S com ação bactericida contra anaeróbios gram-negativos e gram-positivos orais e cocos aeróbios.',
        clinicalRationale:
          'Penetração tecidual e óssea mandibular excelente, sendo o antimicrobiano de eleição odontológica veterinária.',
        monitoring: 'Inspeção da cicatrização de alvéolos e mucosa oral; em gatos, atentar para disfagia ou regurgitação precoces.',
        referenceIds: ['ref-clinbacter-bula', 'ref-bsava-10th-clinda', 'ref-plumbs-10th-clinda'],
        evidenceLevel: 'Bula Oficial MAPA / Compêndio BSAVA / Prática Clínica Especializada',
      },
      {
        id: 'ind-clinda-feline-toxoplasmosis',
        indication: 'Toxoplasmose Clínica Felina Sistêmica, Oftálmica e de SNC',
        clinicalContext:
          'Toxoplasma gondii é um protozoário coccídio intracelular cujo felino é o hospedeiro definitivo. A manifestação clínica em gatos manifesta-se por febre, letargia, perda de peso, pneumonia intersticial, hepatite necrosante, pancreatite, uveíte anterior, retinocoroidite e meningoencefalomielite. A clindamicina é o fármaco de primeira linha consagrado para o tratamento da toxoplasmose ativa. O protozoário possui um apicoplasto cuja síntese proteica é bloqueada pela clindamicina, impedindo a invasão celular nas gerações filhas (morte retardada). Lappin et al. (1989) relataram resolução completa de sinais não oculares e de retinocoroidite em gatos tratados. O compêndio Nelson & Couto destaca que cursos inferiores a 4 semanas estão fortemente associados a recidivas clínicas. A melhora dos sinais sistêmicos ocorre habitualmente entre 48 e 72 horas. Em envolvimento neurológico central, doses aumentadas (30 a 50 mg/kg/dia divididos) são recomendadas devido à limitação da barreira hematoencefálica.',
        species: 'cat',
        dose: '12,5 mg/kg VO q12h (25 mg/kg/dia); em SNC: 15 a 25 mg/kg VO q12h (30 a 50 mg/kg/dia divididos)',
        route: 'Oral (VO com água/alimento úmido) ou IV intermitente lenta se em jejum',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Mínimo de 4 semanas ininterruptas (28 dias) para prevenir recaídas',
        mechanismOfAction:
          'Inibição seletiva da tradução no apicoplasto de Toxoplasma gondii, gerando morte retardada de taquizoítos.',
        clinicalRationale:
          'Padrão ouro internacional em medicina felina para contenção da replicação ativa de taquizoítos teciduais.',
        monitoring: 'Avaliação oftalmológica (lâmpada de fenda / oftalmoscopia direta), resposta motora e tolerância digestiva.',
        referenceIds: ['ref-lappin-1989-toxoplasmosis', 'ref-nelson-couto-6th', 'ref-bsava-10th-clinda'],
        evidenceLevel: 'Série Clínica Padrão Ouro Lappin 1989 / Nelson & Couto / BSAVA',
      },
      {
        id: 'ind-clinda-canine-neosporosis',
        indication: 'Neosporose Clínica Canina (Miosite e Radiculoneurite Ascendente)',
        clinicalContext:
          'Neospora caninum acomete cães de todas as idades, com curso devastador em filhotes e cães com menos de 6 meses por transmissão congênita vertical. O quadro clássico compreende paresia e paralisia rígida progressiva de membros pélvicos decorrente de miosite necrótica, radiculoneurite lombo-sacra e atrofia muscular por desnervação. Nelson & Couto enfatiza que o tratamento com clindamicina deve ser instituído imediatamente diante da suspeita clínica, antes mesmo do resultado de sorologias ou PCR, pois uma vez instalada a fibrose muscular com hiperextensão rígida e contratura miofascial, o dano anatômico torna-se clinicamente irreversível. Os protocolos posológicos preconizam 10 mg/kg a cada 8 horas ou 15 mg/kg a cada 12 horas mantidos por 4 a 8 semanas consecutivas, podendo ser associados a sulfas potencializadas em casos refratários.',
        species: 'dog',
        dose: '10 mg/kg VO a cada 8 horas (q8h) ou 15 mg/kg VO a cada 12 horas (q12h)',
        route: 'Oral (VO)',
        frequency: 'A cada 8 horas (q8h) ou a cada 12 horas (q12h)',
        duration: '4 a 8 semanas consecutivas de tratamento contínuo',
        mechanismOfAction:
          'Supressão da síntese proteica no apicoplasto de Neospora caninum, interrompendo a destruição de miócitos e axônios motores.',
        clinicalRationale:
          'Única intervenção farmacológica capaz de salvar a locomoção de filhotes caninos quando administrada precocemente.',
        monitoring: 'Exame neurológico motor seriado (amplitude reflexa e tônus muscular), CK sérica e fisioterapia motora precoce.',
        referenceIds: ['ref-nelson-couto-6th', 'ref-bsava-10th-clinda', 'ref-plumbs-10th-clinda'],
        evidenceLevel: 'Nelson & Couto Medicina Interna / Formulário BSAVA / Literatura Neurológica',
      },
      {
        id: 'ind-clinda-pyothorax-sepsis',
        indication: 'Piotórax e Sepse Abdominal / Respiratória (Braço Anaeróbio e Gram-Positivo)',
        clinicalContext:
          'Em piotórax felino e canino, as infecções são predominantemente polimicrobianas e ricas em bactérias anaeróbias estritas (Peptostreptococcus, Prevotella, Fusobacterium, Clostridium) derivadas de feridas penetrantes ou inalação de corpos estranhos. A clindamicina penetra extraordinariamente bem no líquido e tecido pleural, atingindo concentrações bactericidas mesmo em exsudatos purulentos e ambiente ácido. No Plumb e Nelson & Couto, a dose hospitalar preconizada é de 10 mg/kg IV lenta a cada 12 horas. Contudo, como a clindamicina não possui cobertura contra enterobactérias ou Pseudomonas aeruginosa, é MANDATÓRIO associar um antimicrobiano com cobertura para Gram-negativos (como enrofloxacina até 5 mg/kg/dia em gatos ou amicacina). O suporte mecânico por toracocentese, dreno torácico fechado e lavagem pleural salina é inegociável.',
        species: 'both',
        dose: '10 mg/kg IV em infusão intermitente lenta a cada 12 horas (diluída em SF 0,9% ao longo de 20 a 30 min)',
        route: 'Intravenosa (IV intermitente lenta, estritamente diluída; NUNCA bólus)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Conforme evolução clínica, citologia pleural seriada e remoção do dreno torácico',
        mechanismOfAction:
          'Atividade bactericida potente sobre anaeróbios e cocos Gram-positivos em exsudatos purulentos e tecidos inflamados.',
        clinicalRationale:
          'Fornece o braço anaeróbio padrão ouro hospitalar em associação à antibioticoterapia de quatro quadrantes.',
        monitoring: 'Pressão arterial durante infusão, ausculta pulmonar, débito do dreno torácico e citopatologia da efusão.',
        referenceIds: ['ref-plumbs-10th-clinda', 'ref-nelson-couto-6th', 'ref-bsava-10th-clinda'],
        evidenceLevel: 'Consensos Internacionais de Terapia Intensiva / Plumb / Nelson & Couto',
      },
    ],

    // 4. Farmacocinética Clínica Comparada
    pharmacokineticsData: {
      absorption:
        'A clindamicina é rapidamente e extensamente absorvida pelo trato gastrointestinal após administração oral em cães e gatos. O estudo farmacocinético cruzado padrão de Batzias et al. (2005) em cães Beagles demonstrou biodisponibilidade oral (F) de 72,55 ± 9,86% após a dose de 11 mg/kg de cloridrato de clindamicina em cápsulas, com tempo médio de absorção rápido de 0,87 ± 0,40 horas e Tmax sérico entre 45 e 60 minutos. A presença de alimento retarda levemente a taxa de absorção gástrica, mas não reduz a biodisponibilidade sistêmica total, sendo vantajoso administrar a medicação junto a alimentos para minimizar desconforto em animais suscetíveis a náuseas. Em gatos, a absorção é igualmente efetiva, com comportamento cinético dependente da formulação: o Plumb relata meia-vida oral de aproximadamente 8 horas para soluções líquidas e de até 16 horas para cápsulas sólidas.',
      distribution:
        'Apresenta lipofilicidade substancialmente superior à das aminopenicilinas, o que resulta em ampla distribuição tecidual e penetração intracelular. O volume de distribuição em estado de equilíbrio (Vdss) no cão situa-se em 2,48 ± 0,48 L/kg (Batzias et al., 2005; valor histórico de 0,9 L/kg compilado no Plumb), e no gato varia entre 1,6 e 3,0 L/kg. A taxa de ligação a proteínas plasmáticas é elevada (~93%), mas não impede a difusão para pele, tecido subcutâneo, ossos trabeculares e corticais, líquido sinovial, peritônio, pleura, miocárdio e bile. Um dos grandes diferenciais é o acúmulo intracelular em neutrófilos e macrófagos, transportando ativamente o fármaco para focos de supuração e abscessos. Em gatos, a relação de concentração tecido pulmonar:soro é superior a 3:1. A penetração pela barreira hematoencefálica com meninges íntegras é baixa, atingindo até 40% das concentrações séricas durante inflamação meníngea ativa; o LCR apresenta níveis modestos, justificando doses elevadas em toxoplasmose de SNC.',
      metabolism:
        'As formas éster pró-farmacológicas (fosfato de clindamicina parenteral e palmitato de clindamicina oral) são biologicamente inativas e sofrem rápida hidrólise in vivo pelas fosfatases e esterases teciduais, liberando clindamicina livre circulante. A droga sofre biotransformação hepática parcial via oxidação mediada por isoenzimas do citocromo P450 (complexo CYP3A em humanos), originando metabólitos bioativos como a clindamicina-sulfóxido e a N-desmetilclindamicina, além de derivados inativos. Gatos não apresentam deficiência metabólica específica para a clindamicina (não há dependência crítica da via de glucuronidação). Em pacientes com insuficiência hepática severa descompensada, a depuração metabólica pode estar diminuída.',
      elimination:
        'A depuração corporal total ocorre por via biliar, fecal e urinária combinadas. No cão, o clearance plasmático sistêmico após administração intravenosa é de aproximadamente 0,503 ± 0,095 L/kg/h (Batzias et al., 2005). A meia-vida de eliminação plasmática no cão é de aproximadamente 4,37 a 5,0 horas, podendo aumentar para 7 a 10 horas em dosagens elevadas. No gato, a meia-vida é mais prolongada, variando de 8 horas (solução oral) a 16 horas (cápsulas). Apenas uma fração minoritária é excretada na forma de fármaco ativo livre pela urina (eliminação predominantemente fecal e biliar). Por essa razão, as concentrações ativas na urina são baixas, sendo a clindamicina contraindicada como escolha primária para infecções do trato urinário.',
      cnsPenetration:
        'Penetração no sistema nervoso central modesta com barreira hematoencefálica íntegra; atinge até 40% dos níveis séricos na presença de meninges inflamadas. Em infecções bacterianas primárias de SNC não é indicada; na toxoplasmose de SNC requer doses aumentadas (30 a 50 mg/kg/dia) para compensar a baixa penetração liquórica.',
      plasmaBinding:
        'Elevada em cães e gatos, estimada em aproximadamente 93% de ligação a proteínas plasmáticas (predominantemente alfa-1-glicoproteína ácida e albumina).',
      halfLife:
        'No cão: média de 4,37 a 5,0 horas após doses convencionais (podendo atingir 7 a 10 horas em regimes elevados). No gato: meia-vida prolongada de 8 horas (solução oral) e até 16 horas (cápsula oral).',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO - Comprimidos Palatáveis ou Cápsulas)',
          technique:
            'Via prioritária na rotina ambulatorial. Para cães, administrar junto a uma refeição ou petisco úmido para prevenir irritação gástrica. Para felinos, NUNCA realizar dry-pilling: administrar o comprimido e fornecer IMEDIATAMENTE alíquota de 3 a 5 mL de água em seringa ou porção de sachê úmido para assegurar a passagem para o estômago.',
          nursingCare:
            'Garantir deglutição completa em gatos e monitorar sinais de esofagite (engasgos, sialorreia, regurgitação de saliva). Orientar os tutores a nunca forçar comprimidos fragmentados na orofaringe felina.',
          limitations:
            'Não utilizar a via oral em animais com vômitos incoercíveis, obstrução gastrointestinal mecânica ou estenose esofágica preexistente.',
        },
        {
          route: 'Intravenosa Intermitente (IV - Exclusiva para Fosfato de Clindamicina)',
          technique:
            'Exclusiva para a forma farmacêutica fosfato de clindamicina (150 mg/mL). NUNCA administrar em bólus direto não diluído. A dose calculada deve ser obrigatoriamente diluída em SF 0,9%, SG 5% ou Ringer Lactato para concentração final igual ou inferior a 18 mg/mL e infundida ao longo de 10 a 60 minutos em bomba de infusão ou equipo de microgotas.',
          nursingCare:
            'Taxa máxima absoluta de infusão: 30 mg/minuto (nunca exceder 1.200 mg/hora). Acompanhar a pressão arterial e a frequência cardíaca durante a infusão. Interromper imediatamente caso ocorra hipotensão súbita ou bradicardia.',
          limitations:
            'O bólus intravenoso rápido provoca hipotensão profunda por vasodilatação periférica e colapso cardiovascular com arritmias.',
        },
        {
          route: 'Intramuscular (IM - Fosfato de Clindamicina)',
          technique:
            'Injetar profundamente em massa muscular calibrosa (quadríceps femoral ou musculatura lombar epaxial).',
          nursingCare:
            'A injeção IM é descrita como dolorosa e irritante em pequenos animais. Alternar sítios de aplicação e massagear suavemente.',
          limitations:
            'Devido à dor intensa à injeção e risco de miosite local, a via intramuscular deve ser evitada sempre que houver acesso venoso pérvio disponível.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica a 0,9% (SF 0,9%) - veículo de escolha para diluição intravenosa intermitente',
          'Solução Glicosada a 5% (SG 5%) - compatível em diluições de 6, 9 e 12 mg/mL com estabilidade física documentada',
          'Ringer Lactato (RL) - compatível para administração hospitalar em infusão contínua ou intermitente',
        ],
        incompatibleFluids: [
          'NUNCA administrar em bólus IV rápido não diluído (risco de choque cardiovascular e arritmias)',
          'Incompatibilidade físico-química estrita com ampicilina sódica na mesma seringa ou frasco',
          'Incompatível com barbitúricos (como tiopental e fenobarbital injetável)',
          'Incompatível com gluconato de cálcio, sulfato de magnésio, fenitoína e aminofilina na mesma linha de infusão',
        ],
        infusionRateGuidance:
          'Concentração máxima final permitida: 18 mg/mL. Taxa máxima absoluta de infusão: 30 mg/minuto (máximo de 1.200 mg/hora). Tempo de infusão intermitente: infundir a dose calculada em um intervalo mínimo de 10 a 60 minutos.',
        preparationNotes:
          'Clinbacter® comprimidos palatáveis: conservar na embalagem original, em temperatura ambiente entre 15 e 30 °C, em local seco e protegido da luz solar direta e umidade. Ampolas de fosfato de clindamicina injetável 150 mg/mL: conservar entre 20 e 25 °C; após diluição asséptica em SF 0,9% ou SG 5%, utilizar preferencialmente nas primeiras 24 horas sob refrigeração.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Lincosamida Semissintética Clorada',
        chemicalClassDescription:
          'Derivado 7-cloro-7-desoxilincomicina com lipofilicidade superior e maior potência antimicrobiana que a lincomicina base.',
        therapeuticClass: 'Antibacteriano Ribossomal e Antiprotozoário Específico',
        therapeuticClassDescription:
          'Inibidor seletivo da síntese de proteínas no ribossomo 50S e na organela apicoplasto com ação bactericida tempo-dependente e ação antiprotozoária de morte retardada.',
        detailedTargets: [
          {
            target: '23S rRNA da Subunidade Ribossomal 50S Bacteriana',
            action:
              'Liga-se com alta afinidade ao domínio V do 23S rRNA bacteriano, provocando impedimento estéreo no sítio catalítico.',
            clinicalSignificance:
              'Inibe a atividade da enzima peptidil-transferase, bloqueando a formação de ligações peptídicas e a elongação proteica.',
          },
          {
            target: 'Túnel de Saída do Peptídeo Nascente Ribossomal',
            action:
              'Ocupa o canal de saída luminal pelo qual os peptídeos recém-sintetizados emergem do ribossomo 70S.',
            clinicalSignificance:
              'Provoca término prematuro da tradução e desestabilização ribossômica, suprimindo a produção de exoenzimas e toxinas estafilocócicas.',
          },
          {
            target: 'Ribossomos da Organela Apicoplasto em Apicomplexos',
            action:
              'Interfere na maquinaria de tradução proteica própria do apicoplasto de Toxoplasma gondii e Neospora caninum.',
            clinicalSignificance:
              'Desencadeia o fenômeno de delayed death: os protozoários completam o primeiro ciclo mas as progênies perdem a infectividade celular.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Caninos: Padrão Ouro em Osteomielite, Piodermite e Neosporose',
          description:
            'Cães toleram muito bem a clindamicina por via oral e intravenosa, apresentando meia-vida média de 4 a 5 horas e biodisponibilidade de aproximadamente 73%. O fármaco possui extraordinária validação em osteomielites por S. aureus (Braden et al., 1988), nas infecções periodontais com penetração mandibular e na neosporose clínica em filhotes (Nelson & Couto). Para piodermite sistêmica canina, o consenso ISCAID 2025 recomenda 11 mg/kg q12h para garantir resposta uniforme.',
          clinicalImplications:
            'Em terapias prolongadas superiores a 30 dias (como em osteomielite e neosporose), realizar controle periódico de ALT, AST e creatinina séricas.',
        },
        {
          species: 'cat',
          title: 'Felinos: Risco Gravíssimo de Estenose Esofágica por Dry-Pilling e T½ Prolongada',
          description:
            'Gatos apresentam trânsito esofágico fisiologicamente mais lento na transição para o esfíncter esofágico inferior. Comprimidos ou cápsulas administrados a seco (sem água ou alimento) aderem à mucosa esofágica, sofrem dissolução cáustica local e provocam esofagite necrosante com estenose cicatricial grave (Beatty et al., 2006). A meia-vida felina é mais longa (até 16h para cápsulas), a penetração pulmonar é excelente (relação pulmão:soro >3) e constitui droga de primeira escolha para toxoplasmose ativa.',
          clinicalImplications:
            'PROIBIDO administrar cápsulas ou comprimidos a seco em gatos. É mandatório fornecer 3 a 5 mL de água líquida ou alimento úmido imediatamente após a medicação. Em toxoplasmose de SNC, doses de até 30 a 50 mg/kg/dia são indicadas.',
        },
      ],
      prescriptionType: {
        category: 'Medicamento Veterinário sob Prescrição / Farmácia Humana sob Controle Especial',
        ordinanceOrLaw: 'Decreto-Lei nº 467/1969 e IN MAPA / RDC Anvisa nº 471/2021 e IN Anvisa nº 360/2025',
        retentionRequired: false,
        guidelines:
          'Para a apresentação veterinária oficial registrada no MAPA (Clinbacter® 75 mg e 150 mg comprimidos), a dispensação ocorre sob receituário veterinário simples em uma via. Quando o profissional prescrever apresentações comerciais de farmácia humana (como Dalacin C® cápsulas 300 mg ou ampolas injetáveis), aplicam-se a RDC Anvisa 471/2021 e a IN Anvisa 360/2025: receita em duas vias (uma via retida na farmácia com validade de 10 dias corridos), contendo identificação completa do tutor (com CPF e endereço) e do animal.',
      },
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      attentionSubtitle: 'Alerta Esofágico Felino, Fenótipo MLSB / D-Test e Condutas de Segurança',
      precautions: [
        {
          condition: 'Hipersensibilidade Alérgica Conhecida à Clindamicina ou Lincomicina',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Reexposição imunológica deflagra reações de hipersensibilidade mediadas por IgE ou imunocomplexos com risco de choque anafilático agudo, angioedema e colapso respiratório.',
          clinicalAction:
            'Contraindicação absoluta. Nunca reintroduzir lincosamidas em animais com relato alérgico prévio.',
        },
        {
          condition: 'Administração a Animais Herbívoros e Fermentadores Cecocólicos',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A clindamicina destrói a microbiota anaeróbia comensal do ceco e cólon de equinos, ruminantes, coelhos e roedores, desencadeando proliferação maciça de Clostridium spp. toxigênico, enterocolite necrotizante fulminante e óbito.',
          clinicalAction:
            'Contraindicação absoluta universal em cavalos, ruminantes, coelhos, porquinhos-da-índia, hamsters e chinchilas.',
        },
        {
          condition: 'Administração Oral em Felinos sem Deglutição Fornecida (Dry-Pilling)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A cápsula ou comprimido aloja-se no esôfago distal e dissolve-se estagnado, liberando cloridrato de clindamicina concentrado que promove desepitelização química cáustica, ulceração transmural e deposição fibroblástica cicatricial que culmina em estenose esofágica mecânica obstrutiva irreversível (Beatty et al., 2006).',
          clinicalAction:
            'Contraindicação prática estrita ao dry-pilling. É mandatório fornecer 3 a 5 mL de água em seringa ou refeição úmida imediatamente após a deglutição.',
        },
        {
          condition: 'Isolados de Staphylococcus com D-Test Positivo (Resistência MLSB Induzível)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'O isolado estafilocócico carrega o gene erm em estado reprimido. A exposição a macrolídeos ou o próprio uso in vivo desreprime a metilase do 23S rRNA, convertendo o patógeno em resistente e gerando falha terapêutica rápida a despeito do antibiograma convencional mostrar clindamicina sensível.',
          clinicalAction:
            'Contraindicação clínica. Se o antibiograma relatar eritromicina resistente e clindamicina sensível, exigir o D-test; se positivo, contraindicar formalmente a clindamicina.',
        },
        {
          condition: 'Infusão Intravenosa Direta em Bólus Rápido',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A injeção intravenosa súbita produz vasodilatação periférica intensa, colapso vascular agudo e depressão miocárdica direta com alto risco de arritmias ventriculares e óbito.',
          clinicalAction:
            'Contraindicação absoluta. Diluir sempre para concentração ≤ 18 mg/mL e infundir em 10 a 60 minutos, não excedendo 30 mg/minuto.',
        },
        {
          condition: 'Monoterapia em Sepse Severa Polimicrobiana e Choque Séptico',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A clindamicina possui atividade nula contra bacilos Gram-negativos entéricos aeróbios (E. coli, Klebsiella, Proteus, Serratia) e Pseudomonas aeruginosa, além de resistência intrínseca de Enterococcus spp.',
          clinicalAction:
            'Precaução crítica. Em infecções sistêmicas polimicrobianas graves, utilizar obrigatoriamente em associação a antimicrobiano com cobertura para Gram-negativos.',
        },
        {
          condition: 'Insuficiência Hepática Grave Descompensada',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A metabolização da clindamicina é dependente das vias oxidativas microssomais hepáticas. Na cirrose ou necrose hepatocelular maciça, o clearance diminui e a meia-vida se prolonga com acúmulo sistêmico.',
          clinicalAction:
            'Utilizar com cautela e monitoramento clínico e bioquímico contínuo. Considerar redução de dose ou aumento do intervalo se houver disfunção hepática severa.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Êmese, Náusea e Amolecimento Fecal (Cães e Gatos)',
          frequency: 'common',
          mechanism:
            'Irritação gástrica direta pela acidez do sal cloridrato e alteração transitória da flora microbiana gastrointestinal sensível',
          clinicalManagement:
            'Administrar o medicamento acompanhado de pequena refeição ou alimento úmido; a administração com alimento reduz náuseas sem diminuir a absorção total.',
        },
        {
          effect: 'Esofagite Cáustica e Estenose Esofágica Cicatricial em Gatos (Beatty et al., 2006)',
          frequency: 'uncommon',
          mechanism:
            'Estase prolongada do comprimido no esôfago felino por dry-pilling gerando dissolução cáustica local, necrose e cicatrização fibrosa estenosante',
          clinicalManagement:
            'Prevenção obrigatória: administrar sempre com água (3-5 mL) ou petisco úmido. Se houver regurgitação ou disfagia, suspender e realizar esofagoscopia diagnóstica.',
        },
        {
          effect: 'Sialorreia Intensa e Lip-Smacking em Gatos',
          frequency: 'common',
          mechanism:
            'Estímulo gustativo amargo intenso e aversivo da molécula na mucosa orofaríngea de felinos durante a tentativa de deglutição',
          clinicalManagement:
            'Não fracionar nem macerar comprimidos palatáveis; utilizar técnica rápida de introdução na base da língua e seguir imediatamente com água fresca.',
        },
        {
          effect: 'Dor e Inflamação Local no Sítio de Aplicação Intramuscular',
          frequency: 'common',
          mechanism:
            'Irritação química direta da solução hiperosmolar de fosfato de clindamicina nos feixes musculares esqueléticos',
          clinicalManagement:
            'Evitar a via intramuscular; priorizar a infusão intravenosa intermitente lenta diluída quando o paciente possuir cateter venoso.',
        },
        {
          effect: 'Elevação Discreta e Assintomática de Enzimas Hepáticas (ALT, AST, FA)',
          frequency: 'uncommon',
          mechanism:
            'Metabolização oxidativa microssomal hepática intensa gerando estresse metabólico celular transitório sem perda de função de síntese',
          clinicalManagement:
            'Acompanhar o perfil hepático a cada 30 dias em tratamentos de longo prazo; não requer suspensão na ausência de hiperbilirrubinemia ou sinais de falência.',
        },
        {
          effect: 'Prolongamento do Bloqueio Neuromuscular Perioperatório',
          frequency: 'uncommon',
          mechanism:
            'A clindamicina possui atividade bloqueadora neuromuscular intrínseca pré e pós-sináptica, sinérgica com bloqueadores competitivos',
          clinicalManagement:
            'Avisar a equipe de anestesiologia; reduzir as doses de atracúrio ou rocurônio e monitorar a mecânica ventilatória com estimulador de nervo periférico.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Paciente Canino ou Felino em Terapia Ambulatorial com Desconforto Gástrico',
          recommendedAdjustment: 'Manter a dose plena prescrita, mas administrar rigorosamente misturada a pequena porção de alimento úmido',
          physiologicalRationale:
            'Alimento reduz o contato cáustico do cloridrato com a mucosa gástrica e atrasa ligeiramente o esvaziamento gástrico sem diminuir a biodisponibilidade total.',
        },
        {
          clinicalCondition: 'Paciente Felino Recebendo Formas Farmacêuticas Sólidas (Comprimidos/Cápsulas)',
          recommendedAdjustment: 'NUNCA administrar a seco; administrar obrigatoriamente 3 a 5 mL de água ou alimento pastoso imediatamente após cada dose',
          physiologicalRationale:
            'A água impulsiona o trânsito do comprimido pelo esfíncter esofágico inferior, prevenindo a retenção luminal e a estenose esofágica cáustica (Beatty et al., 2006).',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Grave Descompensada (Cirrose, Shunt Portossistêmico)',
          recommendedAdjustment: 'Monitorar rigorosamente a função hepática; considerar ampliar o intervalo posológico (ex.: q24h) em casos descompensados',
          physiologicalRationale:
            'A depuração plasmática depende de biotransformação hepática; disfunção celular maciça prolonga a meia-vida do fármaco.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica (Estágios IRIS 1 a 4)',
          recommendedAdjustment: 'Não há recomendação de redução automática baseada apenas no estágio IRIS; manter hidratação adequada',
          physiologicalRationale:
            'A eliminação da clindamicina é predominantemente biliar e fecal, com excreção urinária ativa baixa; o rim não é a principal via de depuração.',
        },
        {
          clinicalCondition: 'Toxoplasmose de Sistema Nervoso Central em Gatos',
          recommendedAdjustment: 'Utilizar a faixa superior de dosagem: 15 a 25 mg/kg VO a cada 12 horas (total de 30 a 50 mg/kg/dia)',
          physiologicalRationale:
            'A barreira hematoencefálica restringe a penetração da clindamicina no LCR; concentrações elevadas no sangue são indispensáveis para obter níveis inibitórios centrais.',
        },
        {
          clinicalCondition: 'Término do Tratamento Antimicrobiano (Desmame)',
          recommendedAdjustment: 'Suspender a medicação diretamente ao atingir o objetivo clínico/temporal; NÃO realizar desmame gradual',
          physiologicalRationale:
            'Antimicrobianos nunca devem ser desmamados com subdoses progressivas, prática que induz resistência bacteriana por subconcentração terapêutica.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Macrolídeos (Eritromicina, Claritromicina, Azitromicina)',
          severity: 'major',
          clinicalEffect: 'Antagonismo antimicrobiano mútuo com perda de eficácia clínica de ambos os fármacos',
          pharmacologicalMechanism:
            'Lincosamidas e macrolídeos competem pelo mesmo sítio alostérico sobreposto no domínio 23S rRNA da subunidade 50S ribossomal; a ligação de um impede estericamente a fixação do outro.',
        },
        {
          drugOrClass: 'Cloranfenicol',
          severity: 'major',
          clinicalEffect: 'Antagonismo funcional direto com perda da atividade bactericida e bacterioprostática',
          pharmacologicalMechanism:
            'O cloranfenicol fixa-se ao centro da peptidil-transferase na subunidade 50S, adjacente ao sítio de ancoragem da clindamicina, bloqueando mutuamente suas ações farmacodinâmicas.',
        },
        {
          drugOrClass: 'Bloqueadores Neuromusculares (Atracúrio, Pancurônio, Rocurônio)',
          severity: 'major',
          clinicalEffect: 'Acentuação e prolongamento do bloqueio neuromuscular com fraqueza muscular pós-operatória e hipoventilação',
          pharmacologicalMechanism:
            'A clindamicina possui atividade bloqueadora pré e pós-sináptica intrínseca, diminuindo a liberação de acetilcolina na placa motora e potencializando os relaxantes musculares não despolarizantes.',
        },
        {
          drugOrClass: 'Antimiastênicos / Inibidores da Acetilcolinesterase (Neostigmina, Piridostigmina)',
          severity: 'moderate',
          clinicalEffect: 'Antagonismo parcial do efeito pró-colinérgico e piora da fraqueza muscular em pacientes miastênicos',
          pharmacologicalMechanism:
            'A ação bloqueadora neuromuscular da clindamicina antagoniza o efeito restaurador da transmissão neuromuscular promovido pelos inibidores da acetilcolinesterase.',
        },
        {
          drugOrClass: 'Indutores do Citocromo P450 / CYP3A (Fenobarbital, Rifampicina)',
          severity: 'moderate',
          clinicalEffect: 'Possível redução das concentrações plasmáticas de clindamicina com risco de subexposição terapêutica',
          pharmacologicalMechanism:
            'Indução da atividade oxidativa microssomal hepática acelerando a biotransformação e o clearance sistêmico da clindamicina.',
        },
        {
          drugOrClass: 'Inibidores do CYP3A / Azóis (Cetoconazol, Itraconazol)',
          severity: 'moderate',
          clinicalEffect: 'Aumento das concentrações plasmáticas e prolongamento da meia-vida da clindamicina',
          pharmacologicalMechanism:
            'Inibição das vias enzimáticas microssomais hepáticas responsáveis pela biotransformação da clindamicina em metabólitos inativos.',
        },
        {
          drugOrClass: 'Aminoglicosídeos (Gentamicina, Amicacina)',
          severity: 'minor',
          clinicalEffect: 'Antagonismo in vitro relatado em alguns modelos bacterianos; compatibilidade clínica e física mantida',
          pharmacologicalMechanism:
            'Embora haja descrição de antagonismo bactericida in vitro, a associação é frequentemente utilizada em medicina veterinária para cobertura de quatro quadrantes (Gram+ / anaeróbios da clinda + Gram- dos aminoglicosídeos).',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-clinbacter-75mg',
        label: 'Clinbacter® 75 mg Comprimidos Palatáveis (Agener União)',
        form: 'tablet',
        route: 'Oral',
        channel: 'veterinary',
        concentrationValue: 75,
        concentrationUnit: 'mg',
        concentrationOptions: [
          {
            id: 'conc-clinbacter-75mg',
            label: '75 mg de clindamicina base por comprimido (equivale a 81,45 mg de cloridrato de clindamicina)',
            concentrationValue: 75,
            concentrationUnit: 'mg/comp',
          },
        ],
        packInfo: 'Cartucho contendo 14 comprimidos palatáveis e bissulcados',
        scoringInfo: 'Comprimido bissulcado (permite divisão precisa em quatro partes iguais de 18,75 mg cada)',
      },
      {
        id: 'pres-clinbacter-150mg',
        label: 'Clinbacter® 150 mg Comprimidos Palatáveis (Agener União)',
        form: 'tablet',
        route: 'Oral',
        channel: 'veterinary',
        concentrationValue: 150,
        concentrationUnit: 'mg',
        concentrationOptions: [
          {
            id: 'conc-clinbacter-150mg',
            label: '150 mg de clindamicina base por comprimido (equivale a 162,9 mg de cloridrato de clindamicina)',
            concentrationValue: 150,
            concentrationUnit: 'mg/comp',
          },
        ],
        packInfo: 'Cartucho contendo 14 comprimidos palatáveis e bissulcados',
        scoringInfo: 'Comprimido bissulcado (permite divisão precisa em quatro partes de 37,5 mg ou metades de 75 mg)',
      },
      {
        id: 'pres-dalacin-c-300mg',
        label: 'Dalacin C® 300 mg Cápsulas (Pfizer — Farmácia Humana)',
        form: 'capsule',
        route: 'Oral',
        channel: 'human_pharmacy',
        concentrationValue: 300,
        concentrationUnit: 'mg',
        concentrationOptions: [
          {
            id: 'conc-dalacin-c-300mg',
            label: '300 mg de clindamicina base por cápsula dura',
            concentrationValue: 300,
            concentrationUnit: 'mg/cáps',
          },
        ],
        packInfo: 'Embalagem com 16 cápsulas duras',
        scoringInfo: 'Cápsula dura não divisível (uso prático apenas em cães de porte grande; NÃO indicada para gatos)',
      },
      {
        id: 'pres-clindamicina-fosfato-inj-150mg-ml',
        label: 'Fosfato de Clindamicina 150 mg/mL Solução Injetável (Pfizer / Genéricos)',
        form: 'liquid',
        route: 'Intravenosa / Intramuscular',
        channel: 'human_pharmacy',
        concentrationValue: 150,
        concentrationUnit: 'mg/mL',
        concentrationOptions: [
          {
            id: 'conc-clinda-inj-150mg-ml',
            label: '150 mg/mL de clindamicina base (ampolas de 4 mL com 600 mg)',
            concentrationValue: 150,
            concentrationUnit: 'mg/mL',
          },
        ],
        packInfo: 'Ampolas de 4 mL (600 mg totais) para uso hospitalar',
        scoringInfo: 'Solução injetável parenteral hospitalar (exige diluição prévia para concentração ≤ 18 mg/mL antes de infundir IV)',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-clinda-bacterial-clinbacter',
        species: 'both',
        indication: 'Infecções Odontológicas, Abscessos e Feridas (Dose de Bula Clinbacter®)',
        doseMin: 10,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com alimento; gatos com água)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 14 dias conforme controle de foco e resposta clínica',
        clinicalContext:
          'Dose veterinária oficial brasileira de bula do Clinbacter® (10 mg/kg q12h). Em gatos, administrar rigorosamente alíquota de água após cada tomada para proteger o esôfago.',
        monitoring: 'Resolução da dor, exsudato e edema. Em gatos, atentar para deglutição.',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-75mg',
        presentationConcentrationId: 'conc-clinbacter-75mg',
        evidenceLevel: 'Bula Oficial MAPA / Compêndio BSAVA',
      },
      {
        id: 'dose-clinda-pyoderma-iscaid',
        species: 'dog',
        indication: 'Piodermite Canina Sistêmica (Consenso ISCAID 2025)',
        doseMin: 11,
        doseMax: 11,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com refeição)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Superficial: 2 semanas; Profunda: 3 semanas com controle citológico',
        clinicalContext:
          'Dose padrão ouro do consenso internacional ISCAID 2025 para foliculite bacteriana profunda ou superficial com falha tópica.',
        monitoring: 'Citologia cutânea antes de suspender. Não prolongar automaticamente por 2 semanas após cura.',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-150mg',
        presentationConcentrationId: 'conc-clinbacter-150mg',
        evidenceLevel: 'Consenso Internacional Especializado ISCAID 2025 (Nível 1b)',
      },
      {
        id: 'dose-clinda-osteomyelitis',
        species: 'dog',
        indication: 'Osteomielite Bacteriana Canina por Patógenos Suscetíveis',
        doseMin: 11,
        doseMax: 33,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Mínimo de 28 dias ininterruptos (podendo alcançar 6 a 8 semanas)',
        clinicalContext:
          'Alta penetração óssea com cura em 93,7% no estudo Braden 1988 na dose de 11 mg/kg q12h. Acompanhar com cirurgia desbridante.',
        monitoring: 'Radiografia ortopédica e PCR aos 28 dias; perfil hepatorrenal seriado a cada 30 dias.',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-150mg',
        presentationConcentrationId: 'conc-clinbacter-150mg',
        evidenceLevel: 'Ensaio Controlado Braden 1988 / Monografia FDA Plumb',
      },
      {
        id: 'dose-clinda-feline-toxoplasmosis',
        species: 'cat',
        indication: 'Toxoplasmose Clínica Felina Sistêmica e Ocular',
        doseMin: 12.5,
        doseMax: 12.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com alíquota de água obrigatória)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Mínimo de 4 semanas ininterruptas (28 dias)',
        clinicalContext:
          'Dose de 25 mg/kg/dia dividida em duas tomadas (12,5 mg/kg q12h). Início de melhora clínica em 48 a 72h. Nelson & Couto enfatiza curso mínimo de 4 semanas para evitar recidivas.',
        monitoring: 'Oftalmoscopia seriada, resolução de febre e miosite. Atenção inegociável à prevenção de estenose esofágica.',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-75mg',
        presentationConcentrationId: 'conc-clinbacter-75mg',
        evidenceLevel: 'Série Lappin 1989 / Nelson & Couto / Formulário BSAVA',
      },
      {
        id: 'dose-clinda-feline-toxo-cns',
        species: 'cat',
        indication: 'Toxoplasmose de Sistema Nervoso Central em Gatos',
        doseMin: 15,
        doseMax: 25,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO) ou IV intermitente lenta',
        frequency: 'A cada 12 horas (q12h)',
        duration: '4 semanas consecutivas no mínimo',
        clinicalContext:
          'Dose total diária aumentada de 30 a 50 mg/kg/dia dividida a cada 12 horas para superar a baixa penetração liquórica pela barreira hematoencefálica.',
        monitoring: 'Avaliação motora e estado de consciência; monitorar náuseas e tolerância gástrica sob doses elevadas.',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-75mg',
        presentationConcentrationId: 'conc-clinbacter-75mg',
        evidenceLevel: 'Formulário BSAVA 10ª ed. / Nelson & Couto',
      },
      {
        id: 'dose-clinda-canine-neosporosis',
        species: 'dog',
        indication: 'Neosporose Canina (Miosite e Polirradiculoneurite)',
        doseMin: 10,
        doseMax: 15,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: '10 mg/kg q8h ou 15 mg/kg q12h',
        duration: '4 a 8 semanas consecutivas',
        clinicalContext:
          'Iniciar imediatamente na suspeita em filhotes e cães jovens antes da consolidação de fibrose muscular e contratura rígida de membros pélvicos.',
        monitoring: 'Exame neurológico motor seriado, tônus de membros posteriores e enzimas musculares (CK).',
        calculatorEnabled: true,
        presentationId: 'pres-clinbacter-75mg',
        presentationConcentrationId: 'conc-clinbacter-75mg',
        evidenceLevel: 'Nelson & Couto Medicina Interna / BSAVA 10ª ed.',
      },
      {
        id: 'dose-clinda-pyothorax-iv',
        species: 'both',
        indication: 'Piotórax e Sepse Hospitalar: Cobertura Anaeróbia e Gram-Positiva',
        doseMin: 10,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa (IV intermitente lenta em 10 a 60 min)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Conforme evolução clínica e permanência de drenagem torácica',
        clinicalContext:
          'Administrar em infusão intermitente lenta diluída em SF 0,9% para concentração ≤ 18 mg/mL. ASSOCIAR obrigatoriamente a fluoroquinolona ou aminoglicosídeo para cobertura de Gram-negativos.',
        monitoring: 'Pressão arterial durante infusão, débito do dreno torácico e citologia pleural.',
        calculatorEnabled: true,
        presentationId: 'pres-clindamicina-fosfato-inj-150mg-ml',
        presentationConcentrationId: 'conc-clinda-inj-150mg-ml',
        evidenceLevel: 'Monografia Plumb 10ª ed. / Nelson & Couto',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Doses 10 mg/kg e 11 mg/kg q12h)
    practicalWeightTable: {
      standardDoseText:
        'Cálculo baseado na dose veterinária oficial brasileira de 10 mg/kg (Clinbacter®) e na dose de 11 mg/kg (Consenso ISCAID 2025 / Osteomielite), administrada a cada 12 horas por via oral. Em gatos, administrar obrigatoriamente acompanhado de alíquota de água ou alimento úmido.',
      headers: [
        'Peso do Paciente (kg)',
        'Dose 10 mg/kg q12h',
        'Clinbacter 75 mg (10 mg/kg)',
        'Clinbacter 150 mg (10 mg/kg)',
        'Dose 11 mg/kg q12h (ISCAID 2025)',
      ],
      rows: [
        { weight: '2 kg', totalDose: '20 mg', col1: '1/4 comp (~18,75 mg)', col2: 'Inviável fracionar', col3: '22 mg (~1/4 comp de 75 mg)' },
        { weight: '4 kg', totalDose: '40 mg', col1: '1/2 comp (~37,5 mg)', col2: '1/4 comp (~37,5 mg)', col3: '44 mg (~1/2 comp de 75 mg)' },
        { weight: '5 kg', totalDose: '50 mg', col1: '3/4 comp (~56 mg)', col2: 'Inviável fracionar', col3: '55 mg (~3/4 comp de 75 mg)' },
        { weight: '7,5 kg', totalDose: '75 mg', col1: '1 comprimido inteiro', col2: '1/2 comprimido', col3: '82,5 mg (~1 comp de 75 mg)' },
        { weight: '10 kg', totalDose: '100 mg', col1: '1 e 1/4 comprimido', col2: '3/4 comp (~112,5 mg)', col3: '110 mg (~3/4 comp de 150 mg)' },
        { weight: '15 kg', totalDose: '150 mg', col1: '2 comprimidos', col2: '1 comprimido inteiro', col3: '165 mg (~1 comp de 150 mg)' },
        { weight: '20 kg', totalDose: '200 mg', col1: 'Ajustar com 150 mg', col2: '1 e 1/4 comp (~187,5 mg)', col3: '220 mg (~1,5 comp de 150 mg)' },
        { weight: '30 kg', totalDose: '300 mg', col1: '4 comprimidos', col2: '2 comprimidos inteiros', col3: '330 mg (~2 comp de 150 mg)' },
        { weight: '40 kg', totalDose: '400 mg', col1: 'Inadequado', col2: '2 e 1/2 a 3 comp', col3: '440 mg (~3 comp de 150 mg)' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Dosagem Oral e Orientações de Fracionamento',
        concentration: 'Clinbacter® Comprimidos Bissulcados Palatáveis de 75 mg e 150 mg (Agener União)',
        dropletRatio: 'Comprimidos com vinco cruzado (bissulcados) que permitem divisão limpa em metades e quartos',
        practicalRule:
          'Para formulações líquidas magistrais de 25 mg/mL (exemplo): volume (mL) = peso (kg) x 0,4 mL para a dose de 10 mg/kg q12h. Priorizar sempre seringa graduada em mL.',
        note:
          'ALERTA MÁXIMO EM GATOS: Independentemente da dose ou apresentação em comprimido, NUNCA administrar a seco. Oferecer 3 a 5 mL de água em seringa dosadora ou uma colher de sachê úmido imediatamente após a deglutição.',
      },
    },

    // 10. Texto Modelo de Prescrição Veterinária Pronto
    samplePrescriptionText:
      'USO ORAL\n1. Clinbacter® 150 mg (Cloridrato de clindamicina palatável) — Caixa com 14 comprimidos bissulcados\n   - Administrar 1 (um) comprimido, por via oral, a cada 12 horas, durante o período determinado para o controle do foco infeccioso (dose de 10 mg/kg/dose para cão de 15 kg).\n   - Instruções ao tutor:\n     a) Administrar preferencialmente junto ou logo após uma pequena porção de alimento se o animal apresentar sensibilidade gástrica ou náuseas.\n     b) Reavaliar com o médico-veterinário caso ocorram episódios persistentes de vômito, fezes amolecidas ou ausência de melhora clínica após 3 a 4 dias.\n\nORIENTAÇÃO OBRIGATÓRIA PARA PACIENTES FELINOS (PREVENÇÃO DE ESTENOSE ESOFÁGICA):\n"Após administrar qualquer comprimido ou cápsula a um gato, fornecer IMEDIATAMENTE uma pequena quantidade de alimento úmido (sachê/patê) ou cerca de 3 a 5 mL de água fresca com uma seringa para garantir que a medicação seja conduzida com segurança até o estômago. NUNCA administrar o comprimido a seco. Caso o gato apresente dificuldade de engolir, engasgos, salivação constante ou regurgitação de alimentos, contatar imediatamente o veterinário."',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas
    clinicalFoundationsData: [
      {
        id: 'cf-littlewood-1999-pyoderma',
        title: 'Piodermite Superficial Canina: Clindamicina (59%) vs Amoxicilina-Clavulanato (30%)',
        narrative:
          'O ensaio clínico randomizado, mascarado e controlado de Littlewood et al. (1999, Veterinary Record) avaliou a eficácia comparativa do cloridrato de clindamicina versus amoxicilina-clavulanato em 56 cães com foliculite superficial estafilocócica. Os animais foram tratados durante 21 dias com clindamicina oral (5,5 mg/kg a cada 12 horas) ou amoxicilina-clavulanato (12,5 mg/kg a cada 12 horas). Ao término de 21 dias, a taxa de cura clínica e bacteriológica completa atingiu 59% (17 de 29 cães) no grupo da clindamicina em comparação a apenas 30% (8 de 27 cães) no grupo da amoxicilina-clavulanato, revelando superioridade estatisticamente significativa no modelo. Esse trabalho consagrou a clindamicina como antimicrobiano de alta eficácia dermatológica. Contemporaneamente, o Consenso ISCAID 2025 recomenda 11 mg/kg a cada 12 horas para garantir resposta ainda mais consistente quando a terapia sistêmica for indicada.',
        narrativeHighlights: [
          '59% de cura completa com clindamicina vs 30% com amoxicilina-clavulanato',
          'ensaio prospectivo randomizado e mascarado em 56 cães',
          'base histórica para eficácia em Staphylococcus pseudintermedius',
          'evolução posológica atual para 11 mg/kg q12h no consenso ISCAID 2025',
        ],
        studies: [
          {
            citation: 'Littlewood JD, Lakhani KH, Paterson S, Wood JL, Chanter N. Vet Rec. 1999;144(24):662-665. doi: 10.1136/vr.144.24.662. PMID: 10404604.',
            referenceId: 'ref-littlewood-1999',
            sourceType: 'Ensaio Clínico Prospectivo Randomizado e Mascarado em Cães',
            summaryText:
              'Comparação direta entre clindamicina (5,5 mg/kg q12h) e amoxicilina-clavulanato (12,5 mg/kg q12h) por 21 dias em 56 cães com piodermite superficial. Cura completa em 59% (clindamicina) vs 30% (amoxicilina-clavulanato).',
            summaryHighlights: ['cura completa 59% vs 30%', 'n = 56 cães', 'p < 0,05'],
            metrics: ['n = 56 cães', 'Cura: 17/29 (59%) clindamicina vs 8/27 (30%) amox-clav', 'Duração: 21 dias'],
            clinicalConclusion:
              'Comprova a alta eficácia estafilocócica cutânea da clindamicina, fundamentando seu papel de primeira linha sistêmica em foliculite bacteriana canina.',
          },
        ],
      },
      {
        id: 'cf-saridomichelakis-2011-pk-regimens',
        title: 'Farmacocinética Canina de Dois Regimes: 5,5 mg/kg BID versus 11 mg/kg SID',
        narrative:
          'A comparação farmacocinética entre dividir ou concentrar a dose diária de clindamicina no cão foi investigada por Saridomichelakis et al. (2011, Veterinary Dermatology) em estudo cruzado com 6 Beagles saudáveis recebendo 5,5 mg/kg a cada 12 horas ou 11 mg/kg a cada 24 horas por via oral. O regime de 11 mg/kg em dose única diária produziu pico plasmático (Cmax) substancialmente superior e maior área sob a curva total (AUC0-24), resultando em índices farmacodinâmicos AUC/MIC mais elevados para organismos com MIC moderada (0,5 µg/mL). O estudo demonstrou a plausibilidade clínica de regimes em dose única diária contra isolados altamente suscetíveis. Contudo, para infecções profundas ou bactérias com MICs mais elevadas, o regime fracionado a cada 12 horas mantém o tempo acima da MIC (T>MIC) mais estável, justificando por que as diretrizes atuais preconizam 11 mg/kg a cada 12 horas.',
        narrativeHighlights: [
          'estudo cruzado avaliando 5,5 mg/kg BID vs 11 mg/kg SID',
          'maior Cmax e AUC0-24 no regime de dose única diária (11 mg/kg SID)',
          'justificativa farmacocinética para escolha entre SID e BID conforme a MIC',
        ],
        studies: [
          {
            citation: 'Saridomichelakis MN, Athanasiou LV, Salame M, et al. Vet Dermatol. 2011;22(5):429-435. doi: 10.1111/j.1365-3164.2011.00969.x. PMID: 21418348.',
            referenceId: 'ref-saridomichelakis-2011',
            sourceType: 'Ensaio Farmacocinético Cruzado em Cães Beagles',
            summaryText:
              'Avaliação farmacocinética comparativa em 6 Beagles. O regime de 11 mg/kg q24h produziu Cmax e AUC superiores ao de 5,5 mg/kg q12h, demonstrando que doses diárias concentradas atingem excelente exposição para patógenos de baixa MIC.',
            summaryHighlights: ['Cmax e AUC superiores no SID', '6 Beagles saudáveis', 'washout de 1 semana'],
            metrics: ['n = 6 cães', 'Doses: 5,5 mg/kg BID vs 11 mg/kg SID', 'AUC0-24 superior no grupo SID'],
            clinicalConclusion:
              'Explica por que doses de 11 mg/kg SID são eficazes em patógenos altamente suscetíveis, enquanto infecções severas e MICs maiores exigem 11 mg/kg q12h.',
          },
        ],
      },
      {
        id: 'cf-braden-1988-osteomyelitis',
        title: 'Osteomielite Canina por S. aureus: Cura Microbiológica de 93,7% em 28 Dias',
        narrative:
          'O estudo de Braden et al. (1988, Journal of the American Veterinary Medical Association) forneceu a evidência experimental definitiva que consolidou a clindamicina como fármaco padrão ouro para osteomielite bacteriana canina. Em modelo experimental de osteomielite pós-traumática inoculada por Staphylococcus aureus, 16 cães foram tratados com cloridrato de clindamicina oral na dose de 11 mg/kg a cada 12 horas durante 28 dias consecutivos, enquanto 13 cães permaneceram como grupo controle não tratado. Ao término do período, 15 dos 16 cães tratados (93,7%) apresentaram culturas de medula óssea completamente estéreis (sem crescimento bacteriano), contra apenas 6 dos 13 controles (46,1%). A histopatologia confirmou ausência de osteomielite persistente em 100% dos tratados versus persistência em 38% dos controles, alcançando taxa de recuperação global de 94% contra 31%.',
        narrativeHighlights: [
          'esterilização de medula óssea em 93,7% dos cães tratados',
          'modelo de osteomielite pós-traumática por Staphylococcus aureus',
          'recuperação global de 94% nos tratados vs 31% nos controles',
          'base científica do FDA para a indicação de osteomielite canina por 28 dias',
        ],
        studies: [
          {
            citation: 'Braden TD, Johnson CA, Wakenell P, Tvedten HW, Mostosky UV. J Am Vet Med Assoc. 1988;192(12):1721-1725. PMID: 3410788.',
            referenceId: 'ref-braden-1988-osteomyelitis',
            sourceType: 'Ensaio Clínico Experimental Controlado em Cães',
            summaryText:
              'Investigação da eficácia da clindamicina oral (11 mg/kg q12h por 28 dias) em osteomielite experimental por S. aureus em cães. Culturas de medula óssea estéreis em 93,7% dos tratados vs 46,1% dos controles.',
            summaryHighlights: ['cultura negativa em 15/16 (93,7%)', '28 dias de tratamento', 'p < 0,01'],
            metrics: ['n = 29 cães', 'Esterilização óssea: 15/16 (93,7%) vs 6/13 (46,1%)', 'Cura histológica: 100%'],
            clinicalConclusion:
              'Estabelece o protocolo internacional de 11 mg/kg q12h por no mínimo 28 dias para osteomielite canina por cocos Gram-positivos suscetíveis.',
          },
        ],
      },
      {
        id: 'cf-lappin-1989-feline-toxo',
        title: 'Toxoplasmose Clínica Felina: Série de 15 Casos e Resolução em 4 Semanas',
        narrative:
          'A série clínica clássica de Lappin et al. (1989, Journal of Veterinary Internal Medicine) descreveu o diagnóstico sorológico e a resposta terapêutica à clindamicina em 15 gatos com toxoplasmose clínica multissistêmica espontânea (quatro deles co-infectados com FIV). Os felinos apresentavam hiperestesia muscular, febre de origem indeterminada, emagrecimento, pneumopatia e manifestações oftalmológicas exuberantes (uveíte anterior e retinocoroidite). A administração de cloridrato de clindamicina (12,5 a 25 mg/kg a cada 12 horas por 4 semanas) resultou em remissão completa dos sinais clínicos sistêmicos e musculares em todos os animais sobreviventes. As lesões ativas de retinocoroidite resolveram completamente em 4 de 4 gatos (100%), e a uveíte anterior regrediu em 6 de 9 gatos. O estudo fixou a clindamicina como antimicrobiano antiprotozoário de primeira escolha na rotina felina.',
        narrativeHighlights: [
          'série de 15 gatos com toxoplasmose clínica multissistêmica',
          'resolução completa dos sinais não oculares nos sobreviventes',
          'cura de retinocoroidite ativa em 100% (4/4) e uveíte em 66% (6/9)',
          'fundamenta o curso terapêutico mínimo de 4 semanas',
        ],
        studies: [
          {
            citation: 'Lappin MR, Greene CE, Winston S, Toll SL, Epstein ME. J Vet Intern Med. 1989;3(3):139-143. doi: 10.1111/j.1939-1676.1989.tb03089.x. PMID: 2778747.',
            referenceId: 'ref-lappin-1989-toxoplasmosis',
            sourceType: 'Estudo Clínico Prospectivo de Série de Casos em Felinos',
            summaryText:
              'Acompanhamento de 15 gatos com toxoplasmose clínica tratados com clindamicina por 4 semanas. Resolução completa dos sinais não oculares e de retinocoroidite em todos os sobreviventes.',
            summaryHighlights: ['15 gatos acompanhados', 'resolução oftalmológica e muscular', 'curso de 4 semanas'],
            metrics: ['n = 15 gatos', 'Retinocoroidite: resolução em 4/4 (100%)', 'Uveíte: resolução em 6/9 (66,7%)'],
            clinicalConclusion:
              'Consagra a clindamicina como fármaco de primeira escolha para toxoplasmose clínica felina, orientando cursos de no mínimo 4 semanas.',
          },
        ],
      },
      {
        id: 'cf-beatty-2006-esophageal-injury',
        title: 'Lesão Esofágica e Estenose por Clindamicina em Felinos (Dry-Pilling): 5 Casos',
        narrative:
          'O estudo de farmacovigilância e série clínica de Beatty et al. (2006, Journal of Feline Medicine and Surgery) revolucionou os protocolos de administração de medicamentos em felinos ao documentar 5 gatos que desenvolveram lesão esofágica grave associada ao uso de clindamicina. Todos os animais haviam recebido cápsulas duras de 75 mg a cada 12 horas (12 a 19 mg/kg) administradas a seco, sem oferta subsequente de água ou alimento. Em um intervalo de apenas 3 a 9 dias, os gatos desenvolveram disfagia, regurgitação frequente de saliva, ânsia de vômito e engasgos. A endoscopia revelou esofagite erosiva grave em 3 gatos (um evoluiu para estenose obstrutiva) e estenose esofágica cicatricial já estabelecida nos outros 2 gatos, exigindo procedimentos complexos de dilatação esofágica por balão. O estudo provou a citotoxicidade cáustica de contato da clindamicina estagnada e tornou obrigatória a orientação de fornecer água ou alimento logo após formas orais sólidas.',
        narrativeHighlights: [
          '5 gatos acometidos por esofagite e estenose cicatricial por clindamicina',
          'todas as cápsulas haviam sido administradas a seco (sem água ou comida)',
          'início dos sinais obstrutivos em apenas 3 a 9 dias após o início',
          'mudança definitiva na rotina mundial: proibição do dry-pilling em gatos',
        ],
        studies: [
          {
            citation: 'Beatty JA, Swift N, Foster DJ, Barrs VRD. J Feline Med Surg. 2006;8(6):412-419. doi: 10.1016/j.jfms.2006.04.006. PMID: 16849039.',
            referenceId: 'ref-beatty-2006-esophageal',
            sourceType: 'Estudo de Farmacovigilância e Série Clínica em Gatos',
            summaryText:
              'Descrição de cinco gatos com lesão esofágica e estenose cicatricial induzidas por cápsulas orais de clindamicina administradas sem água. Sinais surgiram em 3 a 9 dias, demandando dilatações endoscópicas por balão.',
            summaryHighlights: ['5 gatos com lesão esofágica', 'cápsulas dadas a seco', 'estenose confirmada em endoscopia'],
            metrics: ['n = 5 gatos', 'Período até sinais: 3 a 9 dias', 'Estenose: 3 gatos'],
            clinicalConclusion:
              'Fundamenta a recomendação mandatória mundial de nunca administrar clindamicina sólida a seco em gatos, sob risco de lesão cáustica irreversível.',
          },
        ],
      },
      {
        id: 'cf-batzias-2005-canine-pk-bioavailability',
        title: 'Farmacocinética Canina de Clindamicina: Biodisponibilidade de 73% e Vdss de 2,48 L/kg',
        narrative:
          'A caracterização farmacocinética quantitativa moderna da clindamicina no cão foi conduzida por Batzias et al. (2005, The Veterinary Journal) em delineamento cruzado comparando administrações intravenosa e oral de 11 mg/kg em Beagles. A biodisponibilidade oral foi estabelecida em 72,55 ± 9,86%, com tempo médio de absorção rápido de 0,87 ± 0,40 horas. O volume de distribuição em estado de equilíbrio (Vdss) foi de 2,48 ± 0,48 L/kg e a depuração plasmática sistêmica (clearance) de 0,503 ± 0,095 L/kg/h, com meia-vida de eliminação plasmática de 4,37 ± 0,76 horas. Os autores modelaram os índices farmacodinâmicos e demonstraram que para microrganismos altamente suscetíveis (MIC ≤ 0,1 µg/mL), o regime de 11 mg/kg SID assegura tempo acima da MIC (T>MIC) adequado; contudo, para patógenos com MICs mais elevadas (0,5 a 1,0 µg/mL), o intervalo a cada 12 horas (q12h) é essencial para manter concentrações livres eficazes.',
        narrativeHighlights: [
          'biodisponibilidade oral canina de 72,55%',
          'volume de distribuição amplo de 2,48 L/kg',
          'clearance de 0,503 L/kg/h e meia-vida de 4,37 horas',
          'elucidação da relação entre a MIC do patógeno e o intervalo de dose (SID vs BID)',
        ],
        studies: [
          {
            citation: 'Batzias GC, Delis GA, Athanasiou LV. Vet J. 2005;170(3):339-345. doi: 10.1016/j.tvjl.2004.06.007. PMID: 16266847.',
            referenceId: 'ref-batzias-2005-pk',
            sourceType: 'Ensaio Farmacocinético Cruzado IV/VO em Cães Beagles',
            summaryText:
              'Estudo cruzado em Beagles avaliando cloridrato de clindamicina (11 mg/kg). Biodisponibilidade oral de 72,55%, Vdss de 2,48 L/kg, clearance de 0,503 L/kg/h e t1/2 de 4,37 h. Explica por que MICs mais altas requerem intervalo q12h.',
            summaryHighlights: ['biodisponibilidade 72,55%', 'Vdss 2,48 L/kg', 'relação farmacodinâmica T>MIC'],
            metrics: ['F oral: 72,55 ± 9,86%', 'Vdss: 2,48 ± 0,48 L/kg', 'Clearance: 0,503 ± 0,095 L/kg/h'],
            clinicalConclusion:
              'Fornece os parâmetros farmacocinéticos quantitativos padrão da clindamicina no cão, fundamentando os intervalos posológicos clínicos.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-plumbs-10th-clinda',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Clindamycin monograph, pp. 283-285 (PDF pp. 310-313). Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-clinda',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Clindamycin monograph, pp. 91-92 (PDF pp. 107-108). British Small Animal Veterinary Association; 2020.',
        sourceType: 'Formulário Clínico Internacional BSAVA',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-nelson-couto-6th',
        citationText:
          'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed. Antimicrobial therapy, toxoplasmosis, neosporosis, and osteomyelitis chapters. Elsevier; 2020.',
        sourceType: 'Tratado Internacional de Medicina Interna de Pequenos Animais',
        url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-59004-4',
        evidenceLevel: 'Tratado Padrão Ouro Internacional',
      },
      {
        id: 'ref-iscaid-pyoderma-2025',
        citationText:
          'Morris DO, Loeffler A, Davis GM, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis (ISCAID 2025 Update). Vet Dermatol. 2025;36(1):vde.13342. doi: 10.1111/vde.13342.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID Dermatologia',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/vde.13342',
        evidenceLevel: 'Consenso Internacional Especializado ISCAID 2025',
      },
      {
        id: 'ref-littlewood-1999',
        citationText:
          'Littlewood JD, Lakhani KH, Paterson S, Wood JL, Chanter N. Clindamycin hydrochloride and clavulanate-amoxycillin in the treatment of canine superficial pyoderma. Vet Rec. 1999;144(24):662-665. doi: 10.1136/vr.144.24.662. PMID: 10404604.',
        sourceType: 'Ensaio Clínico Prospectivo Randomizado Mascarado em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/10404604/',
        evidenceLevel: 'Nível 1b (Ensaio Randomizado Controlado)',
      },
      {
        id: 'ref-saridomichelakis-2011',
        citationText:
          'Saridomichelakis MN, Athanasiou LV, Salame M, et al. Serum pharmacokinetics of clindamycin hydrochloride in normal dogs when administered at two dosage regimens. Vet Dermatol. 2011;22(5):429-435. doi: 10.1111/j.1365-3164.2011.00969.x. PMID: 21418348.',
        sourceType: 'Ensaio Farmacocinético Cruzado em Cães Beagles',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21418348/',
        evidenceLevel: 'Nível 1b (Estudo Farmacocinético Cruzado)',
      },
      {
        id: 'ref-braden-1988-osteomyelitis',
        citationText:
          'Braden TD, Johnson CA, Wakenell P, Tvedten HW, Mostosky UV. Efficacy of clindamycin in the treatment of Staphylococcus aureus osteomyelitis in dogs. J Am Vet Med Assoc. 1988;192(12):1721-1725. PMID: 3410788.',
        sourceType: 'Ensaio Clínico Experimental Controlado em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/3410788/',
        evidenceLevel: 'Nível 1b (Estudo Experimental Padrão Ouro)',
      },
      {
        id: 'ref-lappin-1989-toxoplasmosis',
        citationText:
          'Lappin MR, Greene CE, Winston S, Toll SL, Epstein ME. Clinical feline toxoplasmosis: serologic diagnosis and therapeutic management of 15 cases. J Vet Intern Med. 1989;3(3):139-143. doi: 10.1111/j.1939-1676.1989.tb03089.x. PMID: 2778747.',
        sourceType: 'Estudo Clínico Prospectivo de Série de Casos em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/2778747/',
        evidenceLevel: 'Nível 2b (Série Clínica Especializada Felina)',
      },
      {
        id: 'ref-beatty-2006-esophageal',
        citationText:
          'Beatty JA, Swift N, Foster DJ, Barrs VRD. Suspected clindamycin-associated oesophageal injury in cats: five cases. J Feline Med Surg. 2006;8(6):412-419. doi: 10.1016/j.jfms.2006.04.006. PMID: 16849039.',
        sourceType: 'Estudo de Farmacovigilância e Série Clínica em Gatos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16849039/',
        evidenceLevel: 'Nível 2b (Farmacovigilância Padrão Ouro Felina)',
      },
      {
        id: 'ref-batzias-2005-pk',
        citationText:
          'Batzias GC, Delis GA, Athanasiou LV. Clindamycin bioavailability and pharmacokinetics following oral administration of clindamycin hydrochloride capsules in dogs. Vet J. 2005;170(3):339-345. doi: 10.1016/j.tvjl.2004.06.007. PMID: 16266847.',
        sourceType: 'Ensaio Farmacocinético Cruzado IV/VO em Cães Beagles',
        url: 'https://pubmed.ncbi.nlm.nih.gov/16266847/',
        evidenceLevel: 'Nível 1b (Farmacocinética Padrão Ouro Canina)',
      },
      {
        id: 'ref-clinbacter-bula',
        citationText:
          'Agener União Saúde Animal. Clinbacter® Comprimidos Palatáveis (Cloridrato de clindamicina 75 mg e 150 mg) — Bula técnica oficial registrada no MAPA sob nº SP 000292-5.000019.',
        sourceType: 'Bula Oficial do Fabricante / Registro MAPA',
        url: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos-pt/clinbacter/',
        evidenceLevel: 'Registro Oficial Regulatório MAPA',
      },
    ],

    genericBrandsNote:
      'A linha veterinária oficial brasileira é o Clinbacter® (Agener União Saúde Animal), disponível em comprimidos palatáveis e bissulcados de 75 mg e 150 mg (registro MAPA SP 000292-5.000019). No mercado de farmácia humana, encontram-se apresentações como o Dalacin C® 300 mg em cápsulas duras (Pfizer) e o Fosfato de Clindamicina Injetável 150 mg/mL (ampolas de 4 mL com 600 mg). Atenção regulatória: a prescrição veterinária de formulações humanas de clindamicina segue a RDC Anvisa nº 471/2021 e a IN Anvisa nº 360/2025 (receita de controle especial em duas vias, uma via retida, validade de 10 dias com CPF do tutor e identificação do paciente). Toda dosagem clínica expressa em mg refere-se à quantidade equivalente de clindamicina base.',

    // 13. Avisos Clínicos Importantes Específicos (Banner de Destaque)
    clinicalWarningItems: [
      {
        label: 'Alerta Gravíssimo em Gatos (Estenose Esofágica):',
        text: 'NUNCA administrar cápsulas ou comprimidos a seco (dry-pilling) em gatos. O contato estagnado do fármaco no esôfago felino causa esofagite cáustica necrosante e estenose cicatricial grave (Beatty et al., 2006). Fornecer OBRIGATORIAMENTE 3 a 5 mL de água ou alimento úmido logo após a medicação.',
      },
      {
        label: 'D-Test e Resistência Induzível (Gene erm):',
        text: 'Isolados de Staphylococcus resistentes à eritromicina podem carregar o gene erm de resistência MLSB induzível. Mesmo que o antibiograma automático reporte clindamicina sensível, se o D-test for positivo o fármaco falhará clinicamente in vivo e NÃO deve ser utilizado.',
      },
      {
        label: 'Espectro Focado & Ineficácia Urinária:',
        text: 'A clindamicina não cobre bacilos Gram-negativos aeróbios (E. coli, Pseudomonas, Proteus) e Enterococcus é intrinsecamente resistente. Em sepse ou piotórax, associe cobertura Gram-negativa. Além disso, a excreção urinária ativa é muito baixa, sendo contraindicada para infecção urinária rotineira.',
      },
    ],

    relatedDiseaseSlugs: ['piotorax-caes-gatos', 'doenca-periodontal-caes', 'doenca-periodontal-gatos'],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const clindamicinaMedicationRecord = clindamicinaMedicationsSeed[0];
