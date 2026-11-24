import { MedicationRecord } from '../../types/medication';

/**
 * ALOPURINOL — Monografia Farmacológica Veterinária Completa
 * ConsultaVET / Vetius • Farmacologia clínica de cães e gatos • Revisão: novembro de 2026
 */
export const alopurinolMedicationRecord: MedicationRecord = {
  id: 'med-alopurinol',
  slug: 'alopurinol',
  title: 'Alopurinol',
  activeIngredient: 'Alopurinol (base / ácido enólico fraco — não é sal sódico)',
  isControlled: false,
  controlNotice:
    'Medicamento humano sob prescrição em receituário simples (não listado na Portaria SVS/MS nº 344/1998). ATENÇÃO REGULATÓRIA NA LVC (BRASIL): a Portaria Interministerial MS/MAPA nº 1.426/2008 proíbe o tratamento da leishmaniose visceral canina com produtos de uso humano ou fármacos não registrados no MAPA (incluindo o alopurinol); o clínico deve distinguir consenso científico internacional de exigência sanitária nacional vigente.',
  tradeNames: [
    'Zyloric® 100 mg e 300 mg comprimidos (Aspen Pharma — medicamento de referência humano no Brasil)',
    'Alopurinol Genérico 100 mg e 300 mg comprimidos (Medley, EMS, Eurofarma, Teuto, Sandoz, Neo Química)',
    'Alopurinol Suspensão Oral Manipulada 20 mg/mL (formulação extemporânea em Ora-Plus® / Ora-Sweet®)',
    'Alopurinol Cápsulas Magistrais Veterinárias (doses individualizadas para cães miniaturas e gatos)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/allopurinol/PNG',
  pharmacologicClass:
    'Análogo estrutural de purina (pirazolopirimidina) • Inibidor da xantina oxidoredutase (XO/XDH) • Leishmaniostático e antiurolítico de urato',
  species: ['dog', 'cat'],
  category: 'nefrologia',
  tags: [
    'alopurinol',
    'allopurinol',
    'oxipurinol',
    'aloxantina',
    'Zyloric',
    'xantina oxidoredutase',
    'xantina-oxidase',
    'leishmaniose canina',
    'leishmaniose felina',
    'leishmaniostático',
    'WAVD 2025',
    'CLWG 2026',
    'LeishVet',
    'Portaria 1426/2008',
    'urolitíase por urato',
    'urato de amônio',
    'hiperuricosúria',
    'SLC2A9',
    'Dálmata',
    'xantinúria',
    'urólito de xantina',
    'mineralização renal',
    'azatioprina',
  ],

  plainLanguageSummary:
    'O alopurinol é um medicamento oral que desempenha dois papéis distintos: em cães predispostos a cálculos de urato, bloqueia a enzima xantina oxidoredutase e diminui a formação de ácido úrico na urina; na leishmaniose, aproveita o fato de Leishmania depender de purinas externas, sendo captado como falso substrato que desregula o RNA e paralisa a multiplicação parasitária (efeito leishmaniostático, sem cura esterilizante). Seu principal risco em tratamentos longos é o paradoxo da xantina: ao bloquear o passo final da degradação das purinas, a xantina acumula na urina e pode formar cristais e cálculos radiotransparentes, exigindo dieta pobre em purinas, estímulo hídrico e urinálise + ultrassonografia seriadas. Nunca associar a azatioprina sem ajuste rigoroso (risco de mielossupressão grave).',

  mechanismOfAction:
    'Análogo isomérico da hipoxantina (1H-pirazolo[3,4-d]pirimidin-4-ol; C₅H₄N₄O; massa molecular 136,11 g/mol; pKa ≈ 9,4) com duplo mecanismo farmacodinâmico dependente do alvo biológico:\n\n' +
    '1. Inibição da xantina oxidoredutase (XO/XDH) no hospedeiro: atua como substrato competitivo e inibidor mecanismo-dependente da xantina oxidoredutase. A própria enzima oxida o alopurinol em oxipurinol (aloxantina, pKa ≈ 7,7), metabólito ativo de meia-vida mais longa que forma complexo estável com o centro de molibdênio reduzido da enzima, sustentando a inibição ao longo do intervalo posológico. O bloqueio simultâneo das etapas hipoxantina → xantina → ácido úrico reduz expressivamente o urato sérico e urinário (sem efeito uricosúrico direto, anti-inflamatório ou analgésico). Em cães hígidos, a uricase hepática converte ácido úrico em alantoína altamente solúvel; já cães homozigotos para a mutação autossômica recessiva SLC2A9 (como Dálmatas, Bulldogs Ingleses e Russian Black Terriers, que excretam 400–600 mg/dia de ácido úrico contra 10–60 mg/dia em cães não afetados) acumulam urato urinário. Ao fechar essa rota, o alopurinol eleva os precursores a montante (hipoxantina e xantina): como a xantina é moderadamente insolúvel em praticamente qualquer pH urinário e pouco influenciada pelo pH alcalino, dietas com excesso de purinas levam à precipitação de cristalúria e cálculos de xantina (ou camadas de xantina revestindo urólitos de urato).\n\n' +
    '2. Efeito leishmaniostático em protozoários: protozoários do gênero Leishmania são auxotróficos para purinas — incapazes de sintetizar o anel purínico de novo — e dependem integralmente da via de salvamento. Transportadores parasitários captam o alopurinol, que é fosforribosilado pelas enzimas HGPRT/XPRT do parasito em nucleotídeos anômalos (como ribonucleotídeo de 4-aminopirazolopirimidina / alopurinol-ribosídeo monofosfato). Esses metabólitos inibem enzimas críticas (IMP-desidrogenase, GMP-redutase e succinil-AMP sintetase), depletam o pool intracelular de nucleotídeos de adenina e guanina e incorporam-se ao RNA parasitário, bloqueando a síntese proteica e a replicação de amastigotas. Por ser estritamente leishmaniostático (não esterilizante), requer protocolos combinados prolongados e pode selecionar resistência parasitária por redução na captação de purinas e na expressão do gene da S-adenosilmetionina sintetase.',

  quickIndications: [
    {
      condition: 'Leishmaniose visceral canina (protocolo combinado)',
      species: 'dog',
      doseSummary: '10 mg/kg a cada 12 horas',
      route: 'VO',
      duration: '6–12 meses (em associação a leishmanicida; checar Portaria MS/MAPA nº 1.426/2008 no Brasil)',
      clinicalContext: 'Consenso internacional WAVD 2025 / CLWG 2026 / LeishVet 2025',
    },
    {
      condition: 'Dissolução de urólitos de urato caninos (SLC2A9 / HHU)',
      species: 'dog',
      doseSummary: '15 mg/kg a cada 12 horas',
      route: 'VO',
      duration: 'Até 4 semanas com dieta hipopurínica alcalinizante (pH 7,0–7,5; USG ≤ 1,020)',
      clinicalContext: 'Consenso urológico ACVIM 2016 (excluir shunt portossistêmico antes)',
    },
    {
      condition: 'Prevenção de urólitos de urato recorrentes em cães',
      species: 'dog',
      doseSummary: '5–7 mg/kg a cada 12–24 horas',
      route: 'VO',
      duration: 'Uso contínuo apenas quando dieta pobre em purinas e hidratação isoladas falharem',
      clinicalContext: 'Consenso ACVIM 2016 (menor dose efetiva contra cristalúria)',
    },
    {
      condition: 'Leishmaniose felina (uso empírico vigiado)',
      species: 'cat',
      doseSummary: '10 mg/kg q12h ou 20 mg/kg q24h',
      route: 'VO',
      duration: '6–12 meses sob monitoramento dermatológico e renal rigoroso',
      clinicalContext: 'Séries de casos ABCD / LeishVet Felina (PK felina desconhecida)',
    },
    {
      condition: 'Tripanossomíase / Doença de Chagas',
      species: 'both',
      doseSummary: 'Sem posologia clínica validada',
      route: 'VO',
      duration: 'Dados experimentais preliminares; não usar como monoterapia confiável',
      clinicalContext: 'Evidência experimental limitada',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-allo-dog-lvc',
      indication: 'Leishmaniose visceral canina (Leishmania infantum) — Terapia combinada de manutenção',
      clinicalContext: 'Consenso internacional WAVD 2025 / CLWG 2026 / LeishVet 2025 • Atenção à Portaria MS/MAPA nº 1.426/2008 no Brasil',
      species: 'dog',
      dose: '10 mg/kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Pelo menos 6–12 meses associado a antimoniato de meglumina ou miltefosina',
      mechanismOfAction:
        'Protozoários Leishmania são auxotróficos para purinas e incorporam o alopurinol via fosforribosiltransferases parasitárias ao RNA, bloqueando síntese proteica e divisão de amastigotas (ação leishmaniostática).',
      clinicalRationale:
        'Reduz carga parasitária, lesões clínicas e proteinúria por imunocomplexos enquanto administrado, mas não induz cura parasitológica estéril; a monoterapia crônica seleciona resistência parasitária e está proscrita pelos consensos recentes.',
      monitoring: 'Urinálise e US urinário (xantinúria) aos 30d e a cada 3–6m; creatinina, SDMA, UPC, hemograma e eletroforese.',
      referenceIds: ['ref-wavd-leish-2025', 'ref-clwg-leish-2026', 'ref-leishvet-canine-2025', 'ref-portaria-1426-2008'],
      evidenceLevel: 'Consenso internacional elevado (nível I em terapia combinada)',
      highlights: ['Ação leishmaniostática (não esterilizante)', 'Exige terapia combinada', 'Conformidade sanitária no Brasil'],
    },
    {
      id: 'ind-allo-dog-urate-dissolution',
      indication: 'Dissolução médica de urólitos de urato em cães (hiperuricosúria genética SLC2A9)',
      clinicalContext: 'Consenso ACVIM (2016) em cálculos vesicais não obstrutivos sem shunt portossistêmico',
      species: 'dog',
      dose: '15 mg/kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Até 4 semanas (reavaliar por US/cistografia; suspender se não houver resposta)',
      mechanismOfAction:
        'Inibição da xantina oxidoredutase pelo alopurinol e oxipurinol reduz a conversão hepática e sistêmica de hipoxantina/xantina em ácido úrico, diminuindo drasticamente o urato urinário.',
      clinicalRationale:
        'Alcança dissolução completa em ~30–40% dos cães com HHU (mediana 1 mês) e parcial em outro 1/3 quando estritamente combinado a dieta pobre em purinas (~35–50 g proteína/Mcal com fontes vegetais/ovo), USG ≤ 1,020 e pH 7,0–7,5.',
      monitoring: 'Urinálise e US vesical a cada 4 semanas; atenção a casca de xantina se dieta falhar.',
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-nutrition-2e', 'ref-ettinger-9e'],
      evidenceLevel: 'Consenso internacional ACVIM',
      highlights: ['Dieta pobre em purinas obrigatória', 'Alvo pH 7,0–7,5 e USG ≤ 1,020', 'Contraindicado em shunt não reparado'],
    },
    {
      id: 'ind-allo-dog-urate-prevention',
      indication: 'Prevenção secundária de cálculos de urato em cães hiperuricosúricos',
      clinicalContext: 'Consenso ACVIM (2016) após falha do manejo dietético e hídrico exclusivo',
      species: 'dog',
      dose: '5–7 mg/kg',
      route: 'VO',
      frequency: 'a cada 12–24 horas',
      duration: 'Uso contínuo sob titulação pela menor dose eficaz contra cristalúria de urato',
      mechanismOfAction:
        'Supressão parcial sustentada da xantina oxidoredutase evitando acúmulo excessivo de xantina pouco solúvel.',
      clinicalRationale:
        'Evita manter cronicamente 30 mg/kg/dia, minimizando risco de troca para litíase iatrogênica por xantina.',
      monitoring: 'Urinálise mensal inicial e trimestral/semestral depois; US abdominal periódico.',
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-plumb-10', 'ref-bsava-nephro-3e'],
      evidenceLevel: 'Consenso internacional ACVIM',
      highlights: ['Menor dose eficaz', 'Rastrear xantinúria no sedimento'],
    },
    {
      id: 'ind-allo-cat-leishmania',
      indication: 'Leishmaniose felina (FeL)',
      clinicalContext: 'Evidência descritiva em séries de casos (ABCD 2024/2026 e LeishVet Felina)',
      species: 'cat',
      dose: '10 mg/kg (q12h) ou 20 mg/kg (q24h)',
      route: 'VO',
      frequency: 'a cada 12–24 horas',
      duration: 'Prolongada (6–12 meses) com monitoramento estrito',
      mechanismOfAction:
        'Inibição parasitária por incorporação na via de salvamento de purinas; farmacocinética formal em felinos não estabelecida.',
      clinicalRationale:
        'Opção frequentemente empregada em felinos sintomáticos na ausência de fármacos aprovados para a espécie, porém com relatos de dermatite esfoliativa crostosa facial grave e LRA.',
      monitoring: 'Inspeção dermatológica facial/cervical, creatinina, SDMA, ALT/FA e hemograma seriados.',
      referenceIds: ['ref-abcd-fel-2024', 'ref-leishvet-feline-2024', 'ref-bsava-10'],
      evidenceLevel: 'Séries de casos / baixo grau de evidência controlada',
      highlights: ['Lacuna PK felina', 'Vigiar dermatite crostosa e azotemia'],
    },
  ],

  indications: [
    'Terapia leishmaniostática combinada de médio/longo prazo na leishmaniose visceral canina (10 mg/kg VO q12h associada a miltefosina ou antimoniato, respeitando normas sanitárias nacionais).',
    'Dissolução médica de urólitos vesicais de urato em cães com hiperuricosúria genética (SLC2A9) e função hepática normal, sempre em conjunto com dieta restrita em purinas e alcalinização urinária.',
    'Prevenção secundária de recorrência de urólitos de urato caninos refratários ao manejo dietético e hídrico exclusivo.',
    'Manejo empírico da leishmaniose felina (evidência observacional limitada, exigindo vigilância para reações cutâneas e injúria renal).',
    'Controle adjuvante de gota úrica/hiperuricemia em aves ornamentais e répteis selecionados (contraindicado em aves de rapina).',
  ],

  contraindications: [
    'Uso concomitante com dieta rica em purinas (carnes vermelhas, vísceras, miúdos ou proteínas animais padrão): desencadeia rapidamente xantinúria maciça, revestimento de urólitos por xantina e cálculos obstrutivos refratários à dissolução.',
    'Associação com azatioprina ou 6-mercaptopurina sem ajuste severo da dose imunossupressora e monitorização semanal: bloqueio da inativação pela XO provoca mielotoxicidade e pancitopenia fatais.',
    'Obstrução uretral ou ureteral aguda por urólitos/xantina (demanda desobstrução mecânica, uro-hidropropulsão ou remoção cirúrgica imediata, não dissolução medicamentosa).',
    'Monoterapia de longo prazo como substituto de leishmanicidas em cães (rejeitada pelos consensos WAVD 2025 e CLWG 2026 por falha esterilizante e indução de resistência parasitária).',
    'Urolitíase por urato em cães com shunt portossistêmico não tratado ou em felinos como alternativa única à remoção cirúrgica (eficácia clínica não comprovada pelo consenso ACVIM 2016).',
    'Hipersensibilidade prévia documentada ao alopurinol, dermatite esfoliativa ou toxicidade orgânica idiopática em exposição anterior.',
    'Aves de rapina como o gavião-de-cauda-vermelha (Buteo jamaicensis): relatos de vômito, hiperuricemia paradoxal e disfunção renal aguda a 50 mg/kg/dia.',
  ],

  cautions: [
    'Monitoramento urinário obrigatório contra xantinúria e mineralização renal: a cristalúria pode surgir já no primeiro mês (mediana de 150 dias; variação de 31 a 455 dias), acometendo 13,1% a até ~50% dos cães tratados cronicamente. Como a xantina é radiotransparente e pouco dependente do pH ou densidade, a ultrassonografia abdominal e o exame de sedimento urinário são insubstituíveis.',
    'Doença renal crônica (DRC) ou redução da taxa de filtração glomerular: alopurinol e oxipurinol são eliminados por via renal e acumulam-se na azotemia. Embora cães com glomerulopatia da LVC possam apresentar melhora renal com o controle parasitário, compêndios recomendam iniciar em 5 mg/kg VO q12h na insuficiência renal prévia e acompanhar creatinina, SDMA, UPC e ultrassom.',
    'Felinos exibem farmacocinética não estabelecida e maior risco aparente de dermatite crostosa/esfoliativa em face e pescoço e injúria renal aguda idiossincrática: suspender imediatamente diante de lesões cutâneas ou azotemia progressiva.',
    'Nunca associar acidificantes urinários (metionina, cloreto de amônio) durante tratamento para urato: pH ácido precipita ácido úrico e anula a terapia de dissolução.',
    'Administrar com alimento se ocorrer desconforto gástrico: ensaios farmacocinéticos cruzados demonstraram que a alimentação não reduz a AUC nem a biodisponibilidade em cães.',
    'Se ocorrerem cálculos puros de xantina induzidos por alopurinol + excesso de purinas, suspender o alopurinol mantendo dieta estritamente hipopurínica e hidratação favorece a dissolução da xantina; caso seja necessário reintroduzir posteriormente, reduzir para 25–35% da dose prévia.',
    'Uso de suspensão extemporânea a 20 mg/mL (Ora-Plus®/Ora-Sweet®): possui estabilidade físico-química publicada por 60 dias a 5 °C e 25 °C protegida da luz, porém sem ensaios microbiológicos formais publicados — agitar vigorosamente antes de cada dose e respeitar rigorosamente o prazo magistral e a higiene do frasco.',
  ],

  adverseEffects: [
    'Urolitíase e cristalúria por xantina / nefrocalcinose (frequentes e mecanismo-dependentes em terapias prolongadas): cristais esféricos amarelo-acastanhados ou cálculos vesicais/uretrais radiolucentes e mineralização do parênquima renal (observada em 13,1% de 320 cães em estudo de coorte, incluindo casos com obstrução uretral).',
    'Gastrointestinais (comuns, geralmente leves): náusea, êmese transitória, hiporexia e diarreia — minimizados quando fornecido com alimento.',
    'Cutâneos e hipersensibilidade (incomuns a raros em cães; mais preocupantes em felinos): prurido, eritema, alopecia, piodermite/dermatite esfoliativa crostosa facial e cervical e erupções descamativas (especialmente se associado a aminopenicilinas).',
    'Hepáticos: elevação assintomática e transitória de ALT/AST e fosfatase alcalina; hepatite medicamentosa ou necrose hepática idiossincrática rara.',
    'Hematológicos (raros): neutropenia, trombocitopenia e aplasia medular (risco multiplicado na coterapia com azatioprina/6-mercaptopurina ou ciclofosfamida).',
    'Renais: injúria renal aguda por hipersensibilidade ou progressão de nefropatia obstrutiva/intratubular secundária a microcristais de xantina.',
  ],

  interactions: [
    'Azatioprina e 6-Mercaptopurina (INTERAÇÃO CRÍTICA — risco de morte): a xantina-oxidase é via fundamental de inativação da 6-MP. Seu bloqueio desvia a metabolização para nucleotídeos 6-tioguanina (6-TGN) em níveis tóxicos, causando pancitopenia e aplasia medular grave. Evitar a combinação; caso indispensável, reduzir drasticamente a dose da tiopurina (diversas referências preconizam administrar apenas 25%–33% da dose original, isto é, redução de 67%–75%, embora alguns formulários veterinários redijam redução inicial de 25%–33%) sob hemograma semanal rigoroso.',
    'Teofilina e Aminofilina: o alopurinol inibe a depuração oxidativa das metilxantinas, elevando concentrações séricas com risco de tremores, taquicardia, vômitos e arritmias ventriculares.',
    'Ciclofosfamida e outros mielossupressores (ex.: cloranfenicol): risco aditivo de neutropenia e supressão medular.',
    'Ciclosporina: pode elevar concentrações plasmáticas mínimas de ciclosporina e potencializar nefrotoxicidade.',
    'Diuréticos tiazídicos e de alça (furosemida, hidroclorotiazida): podem diminuir a excreção renal do oxipurinol e elevar concentrações plasmáticas do metabólito ativo, sobretudo na presença de disfunção renal.',
    'Aminopenicilinas (amoxicilina, ampicilina) e inibidores da ECA (benazepril, enalapril): associação ligada a maior incidência de erupções cutâneas e reações de hipersensibilidade em medicina humana, com relatos clínicos caninos isolados.',
    'Hidróxido de alumínio e antiácidos orais: reduzem a absorção gastrointestinal do alopurinol — respeitar intervalo mínimo de 2 horas entre as administrações.',
    'Acidificantes urinários (cloreto de amônio, DL-metionina): antagonizam a dissolução de urato ao reduzir o pH urinário (< 6,5), acelerando a cristalização.',
    'Agentes uricosúricos (probenecida, sulfinpirazona): aceleram a excreção renal do oxipurinol (reduzindo sua duração de inibição sobre a XO).',
    'Anticoagulantes cumarínicos (varfarina): possível inibição do metabolismo hepático com aumento do risco de sangramento; monitorar tempo de protrombina (TP/INR).',
  ],

  routes: ['Via Oral (VO) — com ou sem alimento (preferir com refeição em estômagos sensíveis)'],

  administration: [
    'Administrar por via oral em intervalos regulares (a cada 12 horas na maioria dos protocolos caninos), preferencialmente junto ao alimento ou pequena porção pastosa para reduzir irritação gástrica sem perda de absorção.',
    'Instituir concomitantemente dieta com estrita restrição de purinas (evitar carnes vermelhas, fígado, rins, coração, extratos cárneos e petiscos proteicos; preferir dietas veterinárias terapêuticas à base de soja/ovo ou formulação clínica de ~35–50 g proteína/Mcal no manejo de urato).',
    'Garantir acesso irrestrito a água fresca e estimular hidratação via alimento úmido ou adição de água morna visando densidade urinária ≤ 1,020 em cães.',
    'Para cães abaixo de 5 kg e gatos: NÃO fracionar comprimidos de 100 mg em frações menores que 1/2 comprimido (50 mg); prescrever suspensão oral manipulada 20 mg/mL ou cápsulas magistrais na dose exata.',
    'Suspensão manipulada 20 mg/mL (Ora-Plus®/Ora-Sweet®): armazenar em frasco âmbar protegido da luz (geladeira 5 °C ou temperatura ambiente 25 °C por até 60 dias segundo estabilidade físico-química; agitar vigorosamente antes de aspirar).',
  ],

  clinicalNotesRichText:
    'Síntese clínica aplicada: o alopurinol é peça central em duas áreas distintas da clínica médica veterinária — a urologia de cálculos de urato e a infectologia da leishmaniose — mas exige vigilância rigorosa para não trocar uma doença tratável por uma iatrogenia de difícil resolução.\n\n' +
    '1. Por que a dieta pobre em purinas e a ultrassonografia são inegociáveis: enquanto a eliminação parcial de urato pode ser compensada com hidratação e pH 7,0–7,5, o acúmulo de xantina provocado pelo bloqueio enzimático NÃO dissolve com citrato de potássio nem aparece facilmente em radiografias simples (xantina é radiolucente). Além disso, na presença de purinas alimentares, a xantina forma uma casca insolúvel ao redor do cálculo de urato e bloqueia sua dissolução. O aparecimento de xantinúria pode ocorrer precocemente (já no primeiro mês, mediana de 150 dias) e exige redução da dose ou revisão dietética imediata.\n\n' +
    '2. Contexto sanitário no Brasil versus diretriz científica na LVC: consensos mundiais e europeus (WAVD 2025, CLWG 2026, LeishVet 2025) sustentam 10 mg/kg VO q12h por 6–12 meses sempre em combinação com antimonial pentavalente ou miltefosina (nunca em monoterapia de rotina, pelo risco de resistência parasitária documentada e falha de cura estéril). No Brasil, entretanto, a Portaria Interministerial MS/MAPA nº 1.426/2008 restringe o tratamento da leishmaniose visceral canina a medicamentos veterinários registrados no MAPA (caso da miltefosina veterinária), vedando o emprego oficial de fármacos de uso humano como o alopurinol. Cabe ao médico-veterinário documentar claramente em prontuário e termo de consentimento qualquer decisão clínica, monitorar carga/proteinúria e manter repelência vetorial permanente contra flebotomíneos.\n\n' +
    '3. Atenção a erros frequentes de prescrição e cálculo: (a) evitar doses > 30 mg/kg/dia em cães, pois a cinética não linear gera platô farmacodinâmico sobre o ácido úrico enquanto multiplica exponencialmente a xantinúria; (b) na tripanossomíase (Doença de Chagas), não há posologia validada; (c) sempre separar por ≥ 2 h de hidróxido de alumínio e revisar todo o receituário para excluir azatioprina.',

  clinicalStructuredBlocks: [
    {
      kind: 'clinicalCallout',
      variant: 'brazil',
      title: 'Regulação Brasileira na Leishmaniose Visceral Canina (LVC)',
      body: 'No Brasil, embora diretrizes internacionais (WAVD 2025, CLWG 2026, LeishVet 2025) e protocolos de pesquisa adotem miltefosina + alopurinol 10 mg/kg VO q12h, a Portaria Interministerial MS/MAPA nº 1.426/2008 proíbe o tratamento da LVC com produtos de uso humano ou não registrados no MAPA (o que engloba o alopurinol). O único leishmanicida com registro veterinário específico vigente no país é a miltefosina (Milteforan®). Diferencie sempre a base científica internacional da conformidade regulatória local e mantenha controle vetorial obrigatório (coleiras/pipetas repelentes).',
    },
    {
      kind: 'clinicalCallout',
      variant: 'caution',
      title: 'Paradoxo da Xantina e Armadilha da Radiografia Simples',
      body: 'Urólitos e cristais de xantina induzidos pelo alopurinol são radiotransparentes na radiografia abdominal simples e praticamente insolúveis em qualquer pH urinário (a alcalinização com citrato de potássio protege contra urato, NÃO dissolve xantina). Em estudos clínicos, 13,1% a ~50% dos cães tratados cronicamente desenvolveram xantinúria, com tempo mediano de apenas 150 dias (variando de 31 a 455 dias). Realize urinálise completa e ultrassonografia de vias urinárias a cada 1–3 meses no início e trimestralmente depois.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'info',
      title: 'Discrepâncias de Literatura & Correções Críticas de Dose/PK',
      body: '• Cmax canina após 10 mg/kg VO (Bartges et al., 1997): 0,87 mg/dL equivale a 8,7 µg/mL (não confundir mg/dL com µg/mL). • Biodisponibilidade oral canina: 68–70% no estudo cruzado controlado (alguns compêndios secundários arredondam para ~90%). • Ajuste renal na LVC: formulários conservadores iniciam com 5 mg/kg VO q12h na DRC para evitar retenção de oxipurinol, mas a melhora da glomerulopatia por controle da Leishmania exige decisão individualizada por estágio IRIS, UPC e ultrassonografia. • Azatioprina: evite a associação; se indispensável, reduza a azatioprina para 25%–33% da dose habitual sob hemograma semanal.',
    },
  ],

  pillars: [
    {
      title: 'Inibição da XO & Oxipurinol Ativo',
      icon: 'Scissors',
      desc: 'Convertido pela própria xantina oxidoredutase em oxipurinol, bloqueia duradouramente hipoxantina → xantina → ácido úrico e reduz o urato urinário.',
    },
    {
      title: 'Falso Substrato na Leishmania',
      icon: 'ShieldAlert',
      desc: 'Parasitos incapazes de síntese de novo incorporam o alopurinol em nucleotídeos anômalos e no RNA parasitário, paralisando amastigotas sem cura estéril.',
    },
    {
      title: 'Paradoxo & Insolubilidade da Xantina',
      icon: 'AlertTriangle',
      desc: 'Sem dieta pobre em purinas, o acúmulo de xantina reveste cálculos de urato ou forma urólitos radiotransparentes refratários em qualquer pH.',
    },
    {
      title: 'Teto Não Linear & Interação Fatal',
      icon: 'Droplets',
      desc: 'Cinética saturável em cães (teto > 30 mg/kg/dia), depuração renal do oxipurinol e toxicidade medular grave se associado à azatioprina.',
    },
  ],

  quickSummaryHighlights: [
    'Fórmula C₅H₄N₄O (136,11 g/mol — não é sal sódico). Biodisponibilidade oral em cães: ~68–70% (ensaio cruzado; alguns textos citam ~90%), sem interferência do alimento; 0% ligado a proteínas.',
    'LVC (consenso internacional WAVD 2025 / CLWG 2026): 10 mg/kg VO q12h por 6–12 meses SEMPRE em terapia combinada (no Brasil, checar Portaria MS/MAPA nº 1.426/2008).',
    'Urato canino (ACVIM 2016): 15 mg/kg VO q12h até 4 semanas para dissolução (eficácia ~30–40%) e 5–7 mg/kg VO q12–24h na prevenção; evitar como monoterapia em shunt não corrigido e gatos.',
    'Xantinúria surge em mediana de 150 dias (desde 31 dias) e provoca cálculos radiolucentes insolúveis: exige dieta restrita em purinas (35–50 g proteína/Mcal), USG ≤ 1,020, pH 7,0–7,5 e US periódico.',
    'Nunca associar azatioprina sem corte drástico de dose; evitar monoterapia na LVC (seleção de resistência via diminuição de transportadores/S-adenosilmetionina sintetase); PK felina não estabelecida.',
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção oral rápida e consistente em cães sadios. No estudo farmacocinético cruzado controlado de Bartges et al. (1997) em Beagles (10 mg/kg e 30 mg/kg IV e VO em jejum e pós-prandial), a biodisponibilidade oral foi de ~68–70% (67,7 ± 12,1% em dose única), embora resumos secundários de formulários citem valores próximos de ~90%. O pico plasmático (Tmax) ocorre em ~1,3 a 2 horas (variação de 1 a 3 horas em Dálmatas). Na dose oral de 10 mg/kg em cães, a concentração máxima (Cmax) observada foi de ~0,87 mg/dL (= 8,7 µg/mL). A alimentação não altera significativamente a absorção ou a área sob a curva (AUC), permitindo administrar com refeições para atenuar irritação gástrica. Gatos: parâmetros de absorção oral e biodisponibilidade NÃO estabelecidos em estudos formais.',
    distribution:
      'Baixa lipofilicidade relativa e ausência de ligação a proteínas plasmáticas (~0% para alopurinol e oxipurinol), eliminando interações por deslocamento proteico. Volume de distribuição aparente no estado de equilíbrio (Vdss) em cães de ~0,88 a 0,90 L/kg (equivalente à água corporal total). Penetração limitada no sistema nervoso central (LCR). Ambos os compostos atravessam a barreira placentária e são excretados no leite materno. Gatos: volume de distribuição e penetração tecidual não estabelecidos.',
    metabolism:
      'Biotransformação hepática e tecidual rápida e saturável pela própria xantina oxidoredutase e pela aldeído-oxidase, gerando principalmente oxipurinol (aloxantina), metabólito farmacologicamente ativo responsável pela maior parte da inibição enzimática prolongada no intervalo de 12 h, além de pequenas frações de ribosídeos conjugados. Apresenta farmacocinética não linear e teto farmacodinâmico em cães (Bartges et al., 1997): doses acima de ~30 mg/kg/dia saturam a conversão/eliminação e reduzem pouco ou nada o ácido úrico adicional, enquanto elevam desproporcionalmente o risco de xantinúria. Gatos: vias quantitativas de conversão alopurinol → oxipurinol não estabelecidas.',
    elimination:
      'Eliminação predominantemente renal (filtração glomerular e reabsorção tubular do oxipurinol; parte do alopurinol também é excretada inalterada). Em cães hígidos: meia-vida plasmática (t1/2) de ~1,5–2,7 horas para o alopurinol (clearance plasmático ~3,5–4,3 mL/kg/min) e ~3,8–4,5 horas para o metabólito ativo oxipurinol. Na insuficiência renal crônica ou redução severa da TFG, o clearance do oxipurinol cai acentuadamente e sua meia-vida prolonga-se de forma expressiva, predispondo a acúmulo sistêmico, toxicidade e cristalização intratubular. É dialisável em situações de superdosagem grave. Gatos: meia-vida de eliminação não estabelecida.',
  },

  clinicalFoundationsData: [
    {
      id: 'found-allo-pk-nonlinear',
      title: 'Farmacocinética canina cruzada, correção de Cmax e cinética não linear',
      narrative:
        'Os dados farmacocinéticos quantitativos no cão provêm principalmente do ensaio cruzado em Beagles sadios (IV e VO em jejum vs. pós-prandial). A alimentação não altera significativamente a AUC (biodisponibilidade oral ~68–70% nesse ensaio; resumos secundários citam ~90%), permitindo administrar com refeições. Na dose de 10 mg/kg VO, a Cmax de 0,87 mg/dL equivale a 8,7 µg/mL — erro frequente de transcrição quando citada como µg/mL sem conversão. Acima de ~30 mg/kg/dia surge platô não linear com maior acúmulo de oxipurinol e xantinúria sem ganho proporcional.',
      narrativeHighlights: [
        'Biodisponibilidade oral real medida ~68–70% em Beagles (não prejudicada por alimento).',
        'Cmax a 10 mg/kg = 0,87 mg/dL (= 8,7 µg/mL); 0% de ligação proteica e t1/2 do oxipurinol ~3,8–4,5 h.',
        'Cinética não linear > 30 mg/kg/dia contraindica escalonamento empírico de doses altas.',
      ],
      referenceIds: ['ref-bartges-1997', 'ref-plumb-10'],
      studies: [
        {
          citation: 'Bartges JW et al. AJVR 1997;58(5):504–510',
          referenceId: 'ref-bartges-1997',
          sourceType: 'Ensaio farmacocinético cruzado experimental',
          summaryText:
            'Avaliou 6 Beagles adultos recebendo alopurinol 10 e 30 mg/kg IV e VO em jejum e pós-prandial. Demonstrou F = 67,7 ± 12,1% (sem efeito significativo de alimento), Vdss ~0,88–0,90 L/kg e saturação metabólica/farmacodinâmica nas doses mais elevadas.',
          metrics: ['F oral ~68–70%', 'Cmax 8,7 µg/mL (10 mg/kg)', 't1/2 oxipurinol ~4 h'],
          clinicalConclusion:
            'Pode ser oferecido com alimento para reduzir náuseas; evitar doses > 30 mg/kg/dia devido ao teto de eficácia e maior risco de xantina.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/9140559/',
        },
      ],
    },
    {
      id: 'found-allo-lvc-combo',
      title: 'Evidência na Leishmaniose Canina: efeito leishmaniostático, terapia combinada e resistência',
      narrative:
        'Ensaios clínicos controlados comprovaram que o alopurinol reduz carga parasitária e melhora significativamente sinais clínicos e glomerulopatia, porém não promove cura parasitológica estéril em monoterapia (PCR positiva persistente). Protocolos combinados com antimoniato de meglumina ou miltefosina consolidaram 10 mg/kg VO q12h por 6–12 meses nos consensos internacionais (WAVD 2025, CLWG 2026, LeishVet 2025), enquanto tratamentos isolados selecionam cepas resistentes de L. infantum por redução de transportadores de purina e do gene da S-adenosilmetionina sintetase.',
      narrativeHighlights: [
        'Leishmaniostático não esterilizante: evitar monoterapia contínua e não interromper abruptamente.',
        'Resistência documentada in vitro e ex vivo em cães com recaída clínica (IC50 ~5× maior).',
        'No Brasil, observar sempre as disposições da Portaria Interministerial MS/MAPA nº 1.426/2008.',
      ],
      referenceIds: ['ref-koutinas-2001', 'ref-miro-miltefosine-2009', 'ref-manna-2015', 'ref-yasur-landau-2016'],
      studies: [
        {
          citation: 'Koutinas AF et al. Vet Parasitol 2001;98(4):247–261',
          referenceId: 'ref-koutinas-2001',
          sourceType: 'Ensaio clínico randomizado controlado por placebo',
          summaryText:
            '45 cães naturalmente infectados tratados com 10 mg/kg q12h vs. placebo por 4 meses obtiveram remissão clínica acentuada, porém 100% mantiveram PCR positiva de medula óssea.',
          clinicalConclusion: 'Confirma natureza leishmaniostática e necessidade de associação leishmanicida.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/11423183/',
        },
        {
          citation: 'Miró G et al. Vet Dermatol 2009 & Manna L et al. Parasit Vectors 2015',
          referenceId: 'ref-miro-miltefosine-2009',
          sourceType: 'Ensaios multicêntrico e longitudinal comparativos',
          summaryText:
            'Validaram miltefosina (2 mg/kg/dia × 28 d) ou antimoniato + alopurinol (10 mg/kg q12h × 6–12 m), mostrando redução sustentada de escores e qPCR parasitário.',
          clinicalConclusion: 'Base posológica dos protocolos internacionais combinados.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/20178476/',
        },
        {
          citation: 'Yasur-Landau D et al. PLoS Negl Trop Dis 2016;10:e0004341',
          referenceId: 'ref-yasur-landau-2016',
          sourceType: 'Estudo parasitológico de resistência',
          summaryText:
            'Isolados de cães com recidiva sob alopurinol exibiram IC50 ~996 µg/mL vs. ~200 µg/mL pré-tratamento (P = 0,01).',
          clinicalConclusion: 'Sustenta a proscrição da monoterapia prolongada rotineira pelos consensos atuais.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/26735519/',
        },
      ],
    },
    {
      id: 'found-allo-xanthinuria-uroliths',
      title: 'Farmacovigilância urinária: xantinúria precoce, nefrocalcinose e manejo dietético',
      narrative:
        'A inibição crônica da XO eleva a xantina urinária, cuja solubilidade é baixa independentemente do pH urinário e gera cálculos radiotransparentes na radiografia simples. Em estudo com 320 cães sob alopurinol, 13,1% desenvolveram complicações urinárias (cristalúria, urólitos e/ou mineralização renal); estudo caso-controle multicêntrico de 2025 revelou tempo mediano de apenas 150 dias até o surgimento de xantinúria (com casos já aos 31 dias). Dieta restrita em purinas (~35–50 g proteína/Mcal no urato), hidratação intensa e ultrassonografia seriada são obrigatórias.',
      narrativeHighlights: [
        'Urólitos de xantina são radiotransparentes: exigir ultrassonografia abdominal + análise de sedimento.',
        'Xantinúria pode surgir no 1º mês (mediana 150 dias; mais comum em cães mais jovens).',
        'Suspender alopurinol sob dieta pobre em purinas pode dissolver depósitos recentes de xantina.',
      ],
      referenceIds: ['ref-torres-2016', 'ref-oliveira-2025', 'ref-acvim-uroliths-2016', 'ref-nutrition-2e'],
      studies: [
        {
          citation: 'Torres M et al. JSAP 2016;57(6):299–304',
          referenceId: 'ref-torres-2016',
          sourceType: 'Coorte clínica de farmacovigilância (320 cães)',
          summaryText:
            '42/320 cães (13,1%) desenvolveram xantinúria com urolitíase (21,4%), mineralização renal (26,2%) ou ambos (31%).',
          clinicalConclusion: 'Estabelece vigilância urinária e ultrassonográfica rotineira em todo cão sob alopurinol.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/27112522/',
        },
        {
          citation: 'Oliveira BC et al. Parasit Vectors 2025;18:98',
          referenceId: 'ref-oliveira-2025',
          sourceType: 'Caso-controle multicêntrico pareado 1:1 (90 cães)',
          summaryText:
            'Mediana de 150 dias (IQR 31–455 dias) para surgimento de xantinúria; cães acometidos eram significativamente mais jovens (4 vs. 6 anos; P = 0,002).',
          clinicalConclusion: 'Antecipar primeira urinálise de controle para ~30 dias após início da terapia.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/40065388/',
        },
      ],
    },
  ],

  doses: [
    {
      id: 'dose-allo-dog-leishmania-combo',
      species: 'dog',
      indication:
        'Leishmaniose visceral canina (LVC) — Protocolo combinado padrão internacional (associado a leishmanicida)',
      doseMin: 10,
      doseMax: 10,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '6 a 12 meses (ou manutenção monitorada conforme estágio clínico, sorologia, qPCR e UPC)',
      clinicalContext:
        'Referência internacional (WAVD 2025, CLWG 2026 e LeishVet 2025) associada a antimoniato de meglumina ou miltefosina; no Brasil, verificar conformidade com a Portaria Interministerial MS/MAPA nº 1.426/2008.',
      evidenceLevel: 'Consenso internacional elevado (nível I em associação com leishmanicida)',
      monitoring:
        'Urinálise com sedimento (pesquisa de cristais de xantina) e ultrassonografia urinária a cada 1–3 meses no início e depois a cada 3–6 meses; creatinina, SDMA, UPC, hemograma, proteínas séricas e enzimas hepáticas.',
      notes:
        'Administrar preferencialmente com alimento para melhor tolerância gástrica. Efeito estritamente leishmaniostático (não esterilizante): a suspensão abrupta sem controle clínico/laboratorial associa-se à recidiva. Manter dieta restrita em purinas caso ocorra xantinúria e repelência vetorial contínua. Para cães < 5 kg, usar a suspensão 20 mg/mL ou cápsula manipulada (evitar fracionar comprimido de 100 mg abaixo de 1/2 comprimido).',
      calculatorEnabled: true,
      presentationId: 'pres-alopurinol-susp-20mg',
      referenceIds: [
        'ref-wavd-leish-2025',
        'ref-clwg-leish-2026',
        'ref-leishvet-canine-2025',
        'ref-miro-miltefosine-2009',
        'ref-manna-2015',
        'ref-portaria-1426-2008',
      ],
    },
    {
      id: 'dose-allo-dog-urate-dissolution',
      species: 'dog',
      indication:
        'Dissolução médica de urólitos de urato em cães (hiperuricosúria genética / SLC2A9 sem shunt portossistêmico)',
      doseMin: 15,
      doseMax: 15,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Até 4 semanas (reavaliar imagem por US/cistografia; suspender se não houver redução ou se surgir xantinúria)',
      clinicalContext:
        'Consenso ACVIM (2016) e tratados de medicina interna/nutrição para cálculos não obstrutivos, obrigatoriamente associado a dieta pobre em purinas (~35–50 g proteína/Mcal), alta ingestão hídrica e pH urinário 7,0–7,5.',
      evidenceLevel: 'Consenso internacional ACVIM e estudos clínicos de dissolução',
      monitoring:
        'Urinálise e ultrassonografia vesical ou cistografia de duplo contraste a cada 4 semanas (espera-se redução ≥ 50% do volume em 4 semanas; dissolução completa em ~30–40%, mediana 1 mês). Vigiar sinais de disúria/obstrução uretral.',
      notes:
        'Alternativa descrita em alguns formulários europeus: 10 mg/kg VO q8h (mesma dose diária total de 30 mg/kg/dia). JAMAIS manter 30 mg/kg/dia cronicamente nem administrar sem restrição rigorosa de purinas, pois forma casca de xantina ao redor do cálculo de urato e bloqueia a dissolução. Contraindicado para shunt portossistêmico não reparado.',
      calculatorEnabled: true,
      presentationId: 'pres-alopurinol-100mg',
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-plumb-10', 'ref-bsava-10', 'ref-nutrition-2e', 'ref-ettinger-9e'],
    },
    {
      id: 'dose-allo-dog-urate-prevention',
      species: 'dog',
      indication:
        'Prevenção secundária de urólitos de urato em cães hiperuricosúricos refratários à dieta isolada',
      doseMin: 5,
      doseMax: 7,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 a 24 horas (q12–24h)',
      duration: 'Uso contínuo sob titulação para a menor dose capaz de evitar cristalúria de urato sem gerar xantinúria',
      clinicalContext:
        'Consenso ACVIM (2016): instituir apenas quando dieta restrita em purinas, alimento úmido (USG ≤ 1,020) e alcalinização com citrato de potássio (pH ≥ 7,0) não controlarem a recidiva.',
      evidenceLevel: 'Consenso internacional ACVIM',
      monitoring:
        'Urinálise mensal nos primeiros meses e depois a cada 3–6 meses (ausência de cristais de urato E ausência de cristais de xantina); US abdominal a cada 3–6 meses.',
      notes:
        'Formulários britânicos e textos nefrológicos citam ainda faixas profiláticas de 5–10 mg/kg/dia ou 10–15 mg/kg VO q24h; recomenda-se iniciar no limite inferior (5–7 mg/kg) e titular conforme sedimento urinário.',
      calculatorEnabled: true,
      presentationId: 'pres-alopurinol-100mg',
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-plumb-10', 'ref-bsava-nephro-3e'],
    },
    {
      id: 'dose-allo-dog-leishmania-renal',
      species: 'dog',
      indication:
        'Leishmaniose canina com disfunção renal crônica prévia (ajuste conservador em azotemia)',
      doseMin: 5,
      doseMax: 5,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Prolongada sob reavaliação quinzenal/mensal de função renal e sedimento (individualizada por estágio IRIS)',
      clinicalContext:
        'Dose inicial reduzida em 50% recomendada por formulários clínicos em cães com insuficiência renal prévia para compensar menor depuração de oxipurinol; calcular e titular de modo individualizado (calculadora bloqueada).',
      evidenceLevel: 'Recomendação de formulário farmacológico (cautela posológica renal)',
      monitoring:
        'Creatinina, ureia, SDMA, UPC, fósforo, eletrólitos, sedimento urinário e ultrassom renal a cada 15–30 dias no início.',
      notes:
        'Contraponto importante da literatura de infectologia: em cães cuja azotemia/proteinúria decorre de glomerulonefrite ativa pela própria Leishmania, doses usuais frequentemente melhoram as lesões renais ao conter os imunocomplexos. Portanto, o corte para 5 mg/kg q12h é uma partida prudente na DRC avançada (IRIS 3–4), reavaliável conforme resposta clínica e ausência de xantinúria.',
      calculatorEnabled: false,
      presentationId: 'pres-alopurinol-susp-20mg',
      referenceIds: ['ref-plumb-10', 'ref-greene-5e', 'ref-oliveira-2025'],
    },
    {
      id: 'dose-allo-dog-leishmania-monotherapy-historical',
      species: 'dog',
      indication:
        'Leishmaniose canina — Monoterapia histórica / faixa alternativa de formulários antigos (NÃO recomendada como rotina)',
      doseMin: 5,
      doseMax: 20,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Histórica (2 a 24 meses) — evitar monoterapia prolongada isolada',
      clinicalContext:
        'Faixa citada em monografias mais antigas quando não havia associação leishmanicida; consensos atuais (WAVD 2025, CLWG 2026) desaconselham monoterapia por incapacidade de cura estéril, risco de recidiva e seleção de resistência parasitária.',
      evidenceLevel: 'Evidência histórica superada / ensaio controlado demonstrando falha de esterilização',
      monitoring:
        'Vigilância estrita de xantinúria, nefrocalcinose e piora clínica/recidiva.',
      notes:
        'Calculadora desabilitada propositalmente para impedir automação de doses de 20 mg/kg q12h (= 40 mg/kg/dia), que ultrapassam o limiar não linear canino (> 30 mg/kg/dia) e elevam drasticamente a litíase por xantina.',
      calculatorEnabled: false,
      referenceIds: ['ref-plumb-10', 'ref-koutinas-2001', 'ref-wavd-leish-2025', 'ref-yasur-landau-2016'],
    },
    {
      id: 'dose-allo-cat-leishmania',
      species: 'cat',
      indication:
        'Leishmaniose felina (FeL) — Protocolo empírico de séries de casos (lacuna farmacocinética formal)',
      doseMin: 10,
      doseMax: 20,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (10 mg/kg) ou a cada 24 horas (20 mg/kg)',
      duration: 'Prolongada (6 a 12 meses) sob acompanhamento clínico e laboratorial contínuo',
      clinicalContext:
        'Regimes mais empregados em séries de casos (ABCD 2024/2026 e LeishVet Felina), embora a literatura descreva ampla faixa empírica de 5–50 mg/kg/dia; farmacocinética felina não estabelecida e risco elevado de hipersensibilidade cutânea e LRA.',
      evidenceLevel: 'Séries de casos e consenso descritivo (baixo grau de evidência controlada)',
      monitoring:
        'Avaliação dermatológica (face/pescoço — dermatite esfoliativa crostosa), creatinina, ureia, SDMA, ALT/FA, hemograma e urinálise quinzenais/mensais no início.',
      notes:
        'Calculadora automática bloqueada para impedir extrapolação acrítica ou cálculo livre da faixa de 5–50 mg/kg/dia. Utilizar exclusivamente suspensão manipulada 20 mg/mL ou cápsulas magistrais exatas sob supervisão especializada.',
      calculatorEnabled: false,
      presentationId: 'pres-alopurinol-susp-20mg',
      referenceIds: ['ref-abcd-fel-2024', 'ref-leishvet-feline-2024', 'ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-allo-cat-urate-alert',
      species: 'cat',
      indication:
        'Urolitíase por urato em felinos — Alerta de eficácia não comprovada (dose histórica desencorajada)',
      doseMin: 7.5,
      doseMax: 15,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: 'Não recomendada como conduta padrão — priorizar remoção cirúrgica e dieta úmida hipoproteica',
      clinicalContext:
        'O consenso ACVIM (2016) e tratados de medicina interna advertem que não há segurança nem eficácia comprovadas para alopurinol em cálculos de urato felinos (embora relatos pontuais citem 7,5–15 mg/kg q12h).',
      evidenceLevel: 'Opinião histórica isolada contraposta por consenso internacional ACVIM',
      monitoring:
        'Investigação obrigatória de shunt portossistêmico/disfunção hepática, remoção mecânica (uro-hidropropulsão/PCCL/cistotomia) e dieta úmida renal/hepática alcalinizante.',
      notes:
        'Calculadora bloqueada intencionalmente. Gatos com urato devem passar por triagem hepática e extração física do urólito.',
      calculatorEnabled: false,
      referenceIds: ['ref-acvim-uroliths-2016', 'ref-ettinger-9e', 'ref-nutrition-2e'],
    },
  ],

  presentations: [
    {
      id: 'pres-alopurinol-susp-20mg',
      label: 'Alopurinol Suspensão Oral Manipulada 20 mg/mL',
      name: 'Alopurinol Suspensão Oral Manipulada 20 mg/mL (Ora-Plus® / Ora-Sweet®)',
      brand: 'Formulação Extemporânea / Farmácia de Manipulação Veterinária',
      form: 'Suspensão oral',
      concentrationValue: 20,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco âmbar 60–120 mL (preparo clássico: 8 comp. 300 mg + 60 mL Ora-Plus® q.s.p. 120 mL Ora-Sweet®)',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
    {
      id: 'pres-alopurinol-100mg',
      label: 'Alopurinol 100 mg Comprimido (Zyloric® / Genérico)',
      name: 'Zyloric® / Alopurinol Genérico 100 mg comprimidos sulcados',
      brand: 'Aspen Pharma (Zyloric®) / Medley / EMS / Eurofarma',
      form: 'Comprimido sulcado',
      concentrationValue: 100,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 ou 60 comprimidos humanos de 100 mg',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-alopurinol-300mg',
      label: 'Alopurinol 300 mg Comprimido (Zyloric® / Genérico)',
      name: 'Zyloric® / Alopurinol Genérico 300 mg comprimidos sulcados',
      brand: 'Aspen Pharma (Zyloric®) / Medley / EMS / Eurofarma',
      form: 'Comprimido sulcado',
      concentrationValue: 300,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos humanos de 300 mg (uso em cães ≥ 15–30 kg)',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-alopurinol-mag-caps',
      label: 'Alopurinol Cápsula Manipulada Veterinária (50 mg ref.)',
      name: 'Alopurinol Cápsulas Magistrais Veterinárias sob medida',
      brand: 'Farmácia de Manipulação Veterinária',
      form: 'Cápsula oral manipulada',
      concentrationValue: 50,
      concentrationUnit: 'mg',
      packInfo: 'Frasco com 30–90 cápsulas ajustadas em mg exata (ex.: 20 mg, 30 mg, 50 mg, 75 mg, 150 mg)',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  attentionSubtitle:
    'Xantinúria e cálculos radiolucentes precoces (mediana 150d), interação medular fatal com azatioprina, exigência de dieta pobre em purinas e Portaria MS/MAPA nº 1.426/2008 na LVC.',

  attentionData: {
    precautions: [
      {
        condition: 'Terapia prolongada sem restrição dietética de purinas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O bloqueio da xantina oxidoredutase acumula xantina na urina. Como a xantina apresenta baixíssima solubilidade em praticamente qualquer pH urinário e não depende apenas da diluição urinária, o aporte contínuo de purinas alimentares precipita cristalúria e urólitos puros de xantina ou reveste urólitos prévios impedindo a dissolução.',
        clinicalAction:
          'Proibir carnes vermelhas, vísceras e miúdos; instituir dieta veterinária hipopurínica (~35–50 g proteína/Mcal no urato) e monitorar sedimento urinário e ultrassonografia a cada 1–3 meses.',
      },
      {
        condition: 'Uso concomitante com azatioprina ou 6-mercaptopurina',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A xantina-oxidase inativa a 6-mercaptopurina (metabólito ativo da azatioprina). Com a enzima bloqueada pelo alopurinol, a droga desvia-se para a síntese excessiva de nucleotídeos 6-tioguanina (6-TGN), desencadeando pancitopenia fulminante e aplasia medular.',
        clinicalAction:
          'Evitar a associação. Se estritamente necessária, reduzir a azatioprina para 25%–33% da dose habitual (corte de 67%–75%) com hemograma completo semanal.',
      },
      {
        condition: 'Leishmaniose Visceral Canina no Brasil — Conformidade Sanitária (Portaria nº 1.426/2008)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'No Brasil, a Portaria Interministerial MS/MAPA nº 1.426/2008 proíbe o tratamento da LVC com produtos de uso humano ou fármacos não registrados no MAPA. Paralelamente, consensos internacionais indicam alopurinol apenas combinado a leishmanicida.',
        clinicalAction:
          'Priorizar terapia registrada no MAPA (miltefosina veterinária), esclarecer limitações legais e técnicas ao tutor em prontuário, jamais prescrever como monoterapia de rotina e manter encoleiramento/repelência contínua.',
      },
      {
        condition: 'Doença Renal Crônica (DRC IRIS 2–4) e retenção de oxipurinol',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Tanto o alopurinol quanto o metabólito ativo oxipurinol dependem da depuração renal; a queda da TFG prolonga sua meia-vida e facilita deposição intratubular de microcristais de xantina e mineralização renal.',
        clinicalAction:
          'Avaliar se a nefropatia é lesão crônica fixa (considerar início cauteloso em 5 mg/kg VO q12h) ou glomerulonefrite ativa da LVC responsiva ao controle parasitário; monitorar creatinina, SDMA, UPC e US renal seriados.',
      },
      {
        condition: 'Shunt portossistêmico (PSS) / hepatopatia grave e pacientes felinos com urato',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'No shunt hepatovascular, o defeito primário é o desvio sanguíneo impedindo o clearance hepático de ácido úrico pela uricase e de amônia. Em gatos, faltam estudos de eficácia/segurança de dissolução medicamentosa.',
        clinicalAction:
          'Priorizar correção cirúrgica do shunt no cão ou extração física (PCCL/cistotomia/VUH) + dieta hepática/renal úmida em gatos e cães shunted.',
      },
      {
        condition: 'Uso de acidificantes urinários concomitantes (NH₄Cl, metionina)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Urina ácida (pH < 6,5) diminui drasticamente a solubilidade do urato e favorece precipitação lítica sem ajudar na solubilidade da xantina.',
        clinicalAction:
          'Suspender acidificantes; manter pH entre 7,0 e 7,5 com dieta adequada ou citrato de potássio (~75 mg/kg VO q12h quando necessário).',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Xantinúria, urolitíase por xantina e mineralização renal',
        frequency: 'common',
        mechanism:
          'Acúmulo urinário de xantina pouco solúvel por inibição da xantina oxidoredutase, detectado em 13,1% de 320 cães em estudo de coorte (até ~50% em séries com sedimento dirigido; tempo mediano 150 dias, IQR 31–455 d).',
        clinicalManagement:
          'Suspender ou reduzir dose se surgir urolitíase/mineralização progressiva; associar dieta pobre em purinas e hidratação pode dissolver depósitos recentes de xantina após pausa do fármaco (eventual retomada a 25–35% da dose prévia).',
      },
      {
        effect: 'Náusea, êmese, hiporexia e diarreia',
        frequency: 'common',
        mechanism: 'Irritação gástrica direta e intolerância digestiva.',
        clinicalManagement: 'Administrar imediatamente junto à refeição (sem prejuízo à biodisponibilidade em cães).',
      },
      {
        effect: 'Dermatite esfoliativa crostosa / reações cutâneas de hipersensibilidade (notadamente em gatos)',
        frequency: 'uncommon',
        mechanism: 'Reação imunomediada idiossincrática a metabólitos do alopurinol (risco elevado em gatos e em coterapia com aminopenicilinas).',
        clinicalManagement: 'Interromper o medicamento imediatamente diante de prurido facial, crostas, eritema ou lesões esfoliativas.',
      },
      {
        effect: 'Elevação de enzimas hepáticas (ALT, AST, FA) e hepatite rara',
        frequency: 'uncommon',
        mechanism: 'Biotransformação hepática intensa ou hipersensibilidade hepatocelular idiossincrática.',
        clinicalManagement: 'Checar bioquímica hepática basal e a cada 3–6 meses; suspender se elevação progressiva ou hiperbilirrubinemia.',
      },
      {
        effect: 'Neutropenia, trombocitopenia e aplasia medular',
        frequency: 'rare',
        mechanism: 'Toxicidade medular direta rara ou desvio severo de tiopurinas quando associado a azatioprina/ciclofosfamida.',
        clinicalManagement: 'Realizar hemograma basal e periódico (semanal se houver associação com imunossupressor).',
      },
      {
        effect: 'Toxicidade aguda por superdosagem (> 44 mg/kg no cão)',
        frequency: 'rare',
        mechanism: 'Sobrecarga gastrointestinal e neurometabólica aguda em ingestão maciça acidental.',
        clinicalManagement: 'Sem antídoto específico; emese precoce/carvão ativado se recente, fluidoterapia de suporte e diálise em quadros graves (fármaco e oxipurinol são dialisáveis).',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Azatioprina / 6-Mercaptopurina',
        severity: 'contraindicated',
        clinicalEffect:
          'Pancitopenia, neutropenia grave, trombocitopenia e aplasia medular potencialmente fatal. Conduta: evitar coadministração; se imprescindível, reduzir azatioprina para 25%–33% da dose original (corte de 67%–75%) com hemograma semanal.',
        pharmacologicalMechanism:
          'Inibição da xantina-oxidase bloqueia a inativação oxidativa da 6-mercaptopurina, aumentando maciçamente os metabólitos citotóxicos 6-tioguanina.',
      },
      {
        drugOrClass: 'Teofilina / Aminofilina',
        severity: 'major',
        clinicalEffect:
          'Toxicidade por metilxantinas (tremores, agitação, taquicardia, arritmias e vômitos). Conduta: evitar ou reduzir dose de aminofilina/teofilina monitorando sinais clínicos.',
        pharmacologicalMechanism: 'Redução da depuração metabólica hepática das xantinas exógenas.',
      },
      {
        drugOrClass: 'Ciclofosfamida / Mielossupressores',
        severity: 'major',
        clinicalEffect:
          'Supressão medular potencializada (leucopenia e trombocitopenia). Conduta: monitoramento hematológico seriado rigoroso durante coterapia oncológica/imunossupressora.',
        pharmacologicalMechanism: 'Efeito aditivo sobre precursores hematopoiéticos e alteração de clearance metabólico.',
      },
      {
        drugOrClass: 'Ciclosporina',
        severity: 'moderate',
        clinicalEffect:
          'Elevação dos níveis plasmáticos mínimos de ciclosporina e risco nefrotóxico. Conduta: monitorar creatinina, SDMA e nível sérico de ciclosporina quando disponíveis.',
        pharmacologicalMechanism: 'Redução da depuração metabólica em pacientes tratados concomitantemente.',
      },
      {
        drugOrClass: 'Diuréticos de alça e tiazídicos (furosemida, hidroclorotiazida)',
        severity: 'moderate',
        clinicalEffect:
          'Retenção de oxipurinol e maior risco de xantinúria ou hipersensibilidade. Conduta: garantir hidratação adequada e reforçar controle de creatinina e sedimento urinário.',
        pharmacologicalMechanism: 'Competição/redução da depuração tubular renal do oxipurinol associada à contração de volume.',
      },
      {
        drugOrClass: 'Hidróxido de alumínio / Antiácidos orais',
        severity: 'moderate',
        clinicalEffect:
          'Redução da absorção entérica e perda parcial de eficácia do alopurinol. Conduta: separar as administrações orais por pelo menos 2 horas.',
        pharmacologicalMechanism: 'Adsorção intraluminal e alteração do perfil de dissolução gástrica.',
      },
      {
        drugOrClass: 'Aminopenicilinas (amoxicilina, ampicilina) e IECAs (benazepril, enalapril)',
        severity: 'minor',
        clinicalEffect:
          'Possível aumento de reações de hipersensibilidade/eritema cutâneo (observação humana + relato pontual canino). Conduta: acompanhar tegumento em pacientes recebendo coterapia antibiótica ou antiproteinúrica.',
        pharmacologicalMechanism: 'Mecanismo imunológico não completamente elucidado.',
      },
      {
        drugOrClass: 'Acidificantes urinários (NH₄Cl, DL-metionina)',
        severity: 'contraindicated',
        clinicalEffect:
          'Falha de dissolução e recorrência acelerada de cálculos de urato. Conduta: proscrever acidificantes e manter pH urinário alvo em 7,0–7,5.',
        pharmacologicalMechanism: 'Queda do pH urinário (< 6,5) reduz fortemente a solubilidade do ácido úrico e do urato de amônio.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Via Oral (VO — padrão e exclusiva na clínica de pequenos animais)',
        technique:
          'Administrar comprimidos, cápsulas manipuladas ou suspensão oral 20 mg/mL (agitada vigorosamente) preferencialmente junto com uma refeição ou petisco compatível com dieta pobre em purinas.',
        nursingCare:
          'Conferir deglutição completa, manter água fresca disponível ad libitum e estimular consumo hídrico (ração úmida ou água adicionada) para diluição urinária contínua.',
        limitations:
          'Não existem apresentações industriais veterinárias aprovadas no Brasil; exige uso extra-bula de comprimidos humanos (100 e 300 mg) ou manipulação veterinária individualizada para pacientes ≤ 5 kg e gatos.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Não se trata de solução injetável de rotina no Brasil. Para manipulação de suspensão oral extemporânea a 20 mg/mL: triturar 8 comprimidos de 300 mg (= 2.400 mg de alopurinol), levigar em 60 mL de Ora-Plus® e completar volume (q.s.p.) para 120 mL com Ora-Sweet® ou Ora-Sweet® SF.',
      ],
      incompatibleFluids: [
        'Evitar misturar comprimidos triturados diretamente em soluções acidificantes ou administrar junto de hidróxido de alumínio/quelantes no mesmo horário (espaçar ≥ 2 horas).',
      ],
      infusionRateGuidance:
        'Uso exclusivamente oral. Em aves psitacídeas (uso exótico especializado), soluções em água de bebida devem ser renovadas diariamente; não se aplica via IV na rotina de cães e gatos.',
      preparationNotes:
        'A suspensão oral a 20 mg/mL descrita em farmacopeia veterinária mantém > 95% de potência por até 60 dias a 5 °C (refrigeração) ou 25 °C (temperatura ambiente) protegida da luz. Atenção: há estabilidade físico-química publicada, mas ausência de estudos formais publicados de estabilidade microbiológica — usar boas práticas magistrais, frasco âmbar bem vedado e agitar vigorosamente antes de cada coleta.',
      storageRequirements:
        'Comprimidos humanos (100 e 300 mg): armazenar entre 15–30 °C (20–25 °C idealmente) em recipiente bem fechado e protegido de luz e umidade.',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Pirazolopirimidina (1H-pirazolo[3,4-d]pirimidin-4-ol) — análogo estrutural da hipoxantina (C₅H₄N₄O | 136,11 g/mol)',
      chemicalClassDescription:
        'Base/ácido enólico fraco cristalino branco a quase branco, praticamente insolúvel ou muito pouco solúvel em água, com pKa ≈ 9,4 (metabólito ativo oxipurinol com pKa ≈ 7,7) e ponto de fusão > 350 °C.',
      therapeuticClass: 'Inibidor da xantina oxidoredutase (XO/XDH) • Antiprotozoário leishmaniostático • Antiurolítico de urato',
      therapeuticClassDescription:
        'Reduz biossíntese de ácido úrico no hospedeiro mamífero e bloqueia o metabolismo de purinas e síntese proteica em protozoários do gênero Leishmania.',
      atcCode: 'M04AA01',
      receptorTargets: [
        'Xantina oxidoredutase / Xantina-oxidase (XO/XDH) hepática e endotelial do hospedeiro',
        'Via de salvamento de purinas parasitária (HGPRT / XPRT de Leishmania infantum)',
        'IMP-desidrogenase, GMP-redutase e RNA mensageiro parasitários',
      ],
    },
    prescriptionType: {
      category: 'Receituário simples (humano extra-bula / magistral veterinário)',
      ordinanceOrLaw: 'Não integra a Portaria SVS/MS nº 344/1998 • Restrição na LVC pela Portaria Interministerial MS/MAPA nº 1.426/2008',
      retentionRequired: false,
      guidelines:
        'Para prevenção/dissolução de urolitíase por urato em cães, prescrever em receituário simples orientando dieta restrita em purinas. Para Leishmaniose Visceral Canina no Brasil, observar rigorosamente as restrições da Portaria Interministerial MS/MAPA nº 1.426/2008 e resoluções do CFMV quanto ao uso de fármacos não registrados no MAPA.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Mutação SLC2A9, cinética saturável e alto risco de xantinúria crônica',
        description:
          'Cães não Dálmatas convertem ácido úrico em alantoína altamente solúvel via uricase hepática (excreção urinária de 10–60 mg/dia). Já Dálmatas, Bulldogs Ingleses e outras raças homozigotas para a mutação SLC2A9 falham no transporte hepático/renal de urato e excretam 400–600 mg/dia de ácido úrico. Em ambos os casos, terapias longas ou doses > 30 mg/kg/dia de alopurinol geram xantinúria precoce (mediana 150 dias, já observada com 31 dias; incidência de 13,1% a ~50%), nefrocalcinose e cálculos de xantina radiotransparentes.',
        clinicalImplications:
          'Confirmar ausência de shunt portossistêmico antes de tratar urato, associar dieta pobre em purinas + USG ≤ 1,020 + pH 7,0–7,5, usar suspensão 20 mg/mL abaixo de 5 kg e realizar urinálise + ultrassonografia abdominal seriadas.',
      },
      {
        species: 'cat',
        title: 'Lacuna farmacocinética, falha de evidência em urato e vulnerabilidade cutânea/renal',
        description:
          'Não existem estudos farmacocinéticos formais (F%, Cmax, Tmax, Vdss, t1/2) para alopurinol nem oxipurinol em gatos. Além disso, o consenso ACVIM (2016) e tratados de medicina interna contraindicam depender do alopurinol para dissolver cálculos de urato felinos (remoção física/cirúrgica é o padrão). Na leishmaniose felina (ABCD/LeishVet), relatos clínicos apontam ocorrência significativa de dermatite crostosa/esfoliativa facial e injúria renal aguda.',
        clinicalImplications:
          'Nunca automatizar faixas empíricas amplas (como 5–50 mg/kg/dia) na rotina clínica; na leishmaniose felina empregar manipulação exata (20 mg/mL ou cápsula) e monitorar pele, creatinina, SDMA e ALT a cada 2–4 semanas.',
      },
    ],
    curiositiesAndHistory: [
      'Desenvolvido na década de 1950 por Gertrude Elion e George Hitchings originalmente com o propósito de potencializar a 6-mercaptopurina em leucemias ao inibir sua degradação — justamente o mecanismo hoje temido como interação fatal quando associados sem ajuste.',
      'Na leishmaniose canina, é um dos exemplos mais clássicos de medicina translacional de biologia parasitária: explora a incapacidade evolutiva dos tripanossomatídeos de fabricar o anel purínico de novo.',
      'A xantina possui solubilidade inferior à do ácido úrico em meio aquoso neutro/ácido; assim, um paciente que ingere carnes ou miúdos durante o alopurinol literalmente reveste seu cálculo de urato original com uma camada insolúvel de xantina.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Referência prática na dose internacional padrão de 10 mg/kg VO q12h (LVC em associação leishmanicida). Para dissolução de urato canino (15 mg/kg q12h), multiplicar os valores por 1,5. ATENÇÃO: frações < 0,5 comprimido de 100 mg (*) são equivalências matemáticas inviáveis na rotina — utilizar suspensão manipulada 20 mg/mL ou cápsula magistral em cães ≤ 4–5 kg e gatos.',
    headers: [
      'Peso Corporal',
      'Dose por Tomada (10 mg/kg)',
      'Suspensão 20 mg/mL',
      'Comprimido 100 mg',
      'Comprimido 300 mg',
    ],
    rows: [
      {
        weight: '2 kg (Miniatura / Gato)',
        totalDose: '20 mg q12h',
        col1: '1,0 mL q12h',
        col2: '0,2 comp* (usar 20 mg/mL)',
        col3: 'Inaplicável',
      },
      {
        weight: '4 kg (Pequeno / Gato)',
        totalDose: '40 mg q12h',
        col1: '2,0 mL q12h',
        col2: '0,4 comp* (usar 20 mg/mL)',
        col3: 'Inaplicável',
      },
      {
        weight: '5 kg',
        totalDose: '50 mg q12h',
        col1: '2,5 mL q12h',
        col2: '1/2 comp (50 mg)',
        col3: 'Inaplicável',
      },
      {
        weight: '10 kg',
        totalDose: '100 mg q12h',
        col1: '5,0 mL q12h',
        col2: '1 comp (100 mg)',
        col3: 'Inaplicável',
      },
      {
        weight: '15 kg',
        totalDose: '150 mg q12h',
        col1: '7,5 mL q12h',
        col2: '1 e 1/2 comp (150 mg)',
        col3: '1/2 comp (150 mg)',
      },
      {
        weight: '20 kg',
        totalDose: '200 mg q12h',
        col1: '10,0 mL q12h',
        col2: '2 comp (200 mg)',
        col3: 'Usar 2× 100 mg',
      },
      {
        weight: '30 kg',
        totalDose: '300 mg q12h',
        col1: '15,0 mL q12h',
        col2: '3 comp (300 mg)',
        col3: '1 comp (300 mg)',
      },
      {
        weight: '40 kg',
        totalDose: '400 mg q12h',
        col1: '20,0 mL q12h',
        col2: '4 comp (400 mg)',
        col3: '1 comp 300 mg + 1 comp 100 mg',
      },
    ],
  },

  genericBrandsNote:
    'Zyloric® 100 mg / 300 mg (Aspen Pharma) e genéricos humanos (Medley, EMS, Eurofarma, Teuto) são apresentados em comprimidos sulcados de 100 mg e 300 mg sem uso veterinário em bula. Para pacientes ≤ 5 kg ou gatos, prescrever manipulação veterinária (cápsulas na dose exata ou suspensão oral 20 mg/mL preparada com Ora-Plus®/Ora-Sweet®, estável por 60 dias protegida da luz).',

  monitoringParameters: [
    'Urinálise completa com análise de sedimento urinário (pesquisa dirigida de cristais esféricos marrom-amarelados de xantina e avaliação de cristalúria de urato) após 30 dias de início e a cada 1–3 a 6 meses continuamente.',
    'Ultrassonografia de trato urinário (rins, ureteres, vesícula urinária e uretra proximal): indispensável porque urólitos de xantina são radiotransparentes e a mineralização renal pode evoluir silenciosamente.',
    'Densidade urinária (meta USG ≤ 1,020 em cães no manejo de urato) e pH urinário (alvo 7,0–7,5 para urato; lembrar que xantina precipita mesmo em urina neutra/alcalina se houver excesso de purinas).',
    'Bioquímica renal seriada (creatinina, ureia, SDMA, fósforo) e relação proteína/creatinina urinária (UPC): essenciais tanto para monitorar acúmulo de oxipurinol na DRC quanto para acompanhar remissão da glomerulopatia na LVC.',
    'Painel hepático (ALT, AST, fosfatase alcalina, bilirrubinas) e hemograma completo antes do início e a cada 3–6 meses (semanal caso haja coterapia inevitável com azatioprina).',
    'Na LVC: acompanhamento clínico dermatológico/linfonodal, eletroforese de proteínas, proteínas de fase aguda (PCR, haptoglobina) e qPCR/sorologia quantitativa para vigiar recidivas ou resistência.',
  ],

  clientInformation: [
    'Nunca interromper o uso por conta própria na leishmaniose: a melhora clínica da pele e dos pelos não significa cura definitiva do parasito, e pausas sem orientação favorecem recidiva rápida.',
    'Dieta rigorosamente pobre em purinas é parte obrigatória do tratamento: NÃO oferecer carnes vermelhas, fígado, coração, rim, miúdos ou petiscos ricos em carne sem liberação veterinária, pois isso favorece a formação de pedras de xantina na bexiga e nos rins.',
    'Oferecer água fresca em abundância em vários pontos da casa e priorizar ração úmida ou adição de água conforme orientação médica para manter a urina bem diluída.',
    'Se houver vômito ou desconforto estomacal em jejum, administrar o medicamento junto com a refeição prescrita (em cães a alimentação não prejudica a absorção).',
    'Buscar atendimento veterinário imediato diante de dificuldade ou esforço para urinar, gotas de sangue na urina, lambedura genital intensa, feridas com crostas na face/pescoço (especialmente em gatos) ou prostração súbita.',
    'Comparecer a todos os exames de urina e ultrassons solicitados: cálculos de xantina não aparecem no raio-X comum e precisam ser detectados precocemente por ultrassom.',
  ],

  clinicalStudiesCommented: [
    {
      title: 'Bioavailability and pharmacokinetics of intravenously and orally administered allopurinol in healthy beagles',
      authorsYear: 'Bartges JW, Osborne CA, Felice LJ, et al. (1997)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Ensaio farmacocinético experimental cruzado (IV e VO em jejum vs. pós-prandial; 10 e 30 mg/kg)',
      sampleSize: '6 cães Beagles adultos sadios',
      mainFindings:
        'Biodisponibilidade oral de ~68–70%, Tmax de ~1,3–2 h, Cmax de ~0,87 mg/dL (= 8,7 µg/mL) a 10 mg/kg VO, Vdss de ~0,88–0,90 L/kg e ausência de impacto significativo do alimento sobre a AUC. Demonstrou cinética de eliminação não linear e existência de platô farmacodinâmico na supressão de ácido úrico em doses maiores.',
      clinicalTakeaway:
        'Sustenta a administração oral com alimento para reduzir náusea e comprova que ultrapassar ~30 mg/kg/dia aumenta toxicidade urinária sem ganho terapêutico proporcional.',
      referenceId: 'ref-bartges-1997',
    },
    {
      title: 'A randomised, blinded, placebo-controlled clinical trial with allopurinol in canine leishmaniosis',
      authorsYear: 'Koutinas AF, Saridomichelakis MN, Mylonakis ME, et al. (2001)',
      journal: 'Veterinary Parasitology',
      studyDesign: 'Ensaio clínico randomizado duplo-cego controlado por placebo (RCT)',
      sampleSize: '45 cães naturalmente infectados por L. infantum (37 tratados com 10 mg/kg q12h e 8 placebo)',
      mainFindings:
        'Promoveu redução expressiva dos escores clínicos e da carga tecidual parasitária ao longo de 4 meses, mas todos os animais tratados persistiram positivos na PCR de aspirado de medula óssea.',
      clinicalTakeaway:
        'Confirma em nível I o caráter leishmaniostático (e não esterilizante) do alopurinol, justificando sua combinação a leishmanicidas nos consensos atuais.',
      referenceId: 'ref-koutinas-2001',
    },
    {
      title: 'Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis',
      authorsYear: 'Miró G, Oliva G, Cruz I, et al. (2009)',
      journal: 'Veterinary Dermatology',
      studyDesign: 'Ensaio clínico prospectivo multicêntrico controlado',
      sampleSize: 'Cães com LVC acompanhados em múltiplos centros europeus',
      mainFindings:
        'A combinação miltefosina (2 mg/kg VO q24h por 28 dias) + alopurinol (10 mg/kg VO q12h por 7 meses) reduziu escores clínicos e densidade parasitária com eficácia e segurança comparáveis ao protocolo clássico de antimoniato de meglumina + alopurinol.',
      clinicalTakeaway:
        'Consolida a dose de 10 mg/kg VO q12h como espinha dorsal dos protocolos leishmaniostáticos combinados.',
      referenceId: 'ref-miro-miltefosine-2009',
    },
    {
      title: 'Long-term follow-up of dogs with leishmaniosis treated with meglumine antimoniate plus allopurinol versus miltefosine plus allopurinol',
      authorsYear: 'Manna L, Corso R, Galiero G, et al. (2015)',
      journal: 'Parasites & Vectors',
      studyDesign: 'Coorte clínica de acompanhamento longitudinal de longo prazo',
      sampleSize: 'Cães tratados com antimonial + alopurinol versus miltefosina + alopurinol',
      mainFindings:
        'Ambas as associações melhoraram significativamente os escores clínicos e reduziram a carga parasitária por qPCR, com melhor sustentação de baixa carga parasitária em longo prazo no esquema com antimoniato + alopurinol.',
      clinicalTakeaway:
        'Reforça que o sucesso longitudinal depende de leishmanicida inicial associado à manutenção com alopurinol e vigilância por qPCR/clínica.',
      referenceId: 'ref-manna-2015',
    },
    {
      title: 'Adverse urinary effects of allopurinol in dogs with leishmaniasis',
      authorsYear: 'Torres M, Pastor J, Roura X, et al. (2016)',
      journal: 'Journal of Small Animal Practice (JSAP)',
      studyDesign: 'Estudo retrospectivo de farmacovigilância clínica',
      sampleSize: '320 cães com LVC tratados cronicamente com alopurinol',
      mainFindings:
        '42 de 320 cães (13,1%) apresentaram eventos adversos urinários associados à xantinúria: 31% tiveram concomitantemente urolitíase e mineralização renal, 26,2% mineralização renal isolada, 21,4% urolitíase por xantina isolada e 21,4% cristalúria isolada.',
      clinicalTakeaway:
        'Quantifica o risco concreto de nefrocalcinose e cálculos de xantina sob terapia prolongada, tornando inegociáveis a dieta pobre em purinas e a ultrassonografia periódica.',
      referenceId: 'ref-torres-2016',
    },
    {
      title: 'Allopurinol Resistance in Leishmania infantum from Dogs with Disease Relapse',
      authorsYear: 'Yasur-Landau D, Jaffe CL, David L, Baneth G (2016)',
      journal: 'PLoS Neglected Tropical Diseases',
      studyDesign: 'Estudo parasitológico comparativo ex vivo / in vitro',
      sampleSize: 'Isolados clínicos de L. infantum de cães recidivantes vs. pré-tratamento e responsivos',
      mainFindings:
        'Isolados obtidos após recaída sob terapia prolongada apresentaram aumento acentuado da IC50 ao alopurinol (~996 µg/mL vs. ~200 µg/mL pré-tratamento e ~268 µg/mL em responsivos; P = 0,01), associado à redução na captação/metabolismo de purinas e alterações no gene da S-adenosilmetionina sintetase em estudos subsequentes (2017).',
      clinicalTakeaway:
        'Demonstra seleção real de resistência parasitária e fundamenta a proibição da monoterapia contínua indiscriminada pelos consensos atuais.',
      referenceId: 'ref-yasur-landau-2016',
    },
    {
      title: 'Impact of allopurinol treatment on canine leishmaniosis: clinical, parasitological and urinary follow-up',
      authorsYear: 'Kaempfle M, Hartmann K, et al. (2023) & Oliveira BC, Silva AC, et al. (2025)',
      journal: 'Parasites & Vectors / Medicina Interna Veterinária',
      studyDesign: 'Estudos multicêntricos recentes de acompanhamento clínico e caso-controle pareado (90 cães em 2025)',
      sampleSize: 'Coortes europeias (2023) e 90 cães pareados 1:1 (45 com xantinúria vs. 45 controles, 2025)',
      mainFindings:
        'Confirmaram a eficácia do alopurinol como parte de protocolos combinados e revelaram mediana de 150 dias até o aparecimento de xantinúria (amplitude interquartil 31–455 dias), com maior frequência em cães mais jovens (mediana 4 vs. 6 anos; P = 0,002).',
      clinicalTakeaway:
        'Comprova que a xantinúria pode instalar-se já nas primeiras semanas/meses de uso, exigindo urinálise precoce no 1º mês além do seguimento trimestral.',
      referenceId: 'ref-oliveira-2025',
    },
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografia: Allopurinol, pp. 37–39 (PDF pp. 64–66).',
      sourceType: 'Compêndio Farmacológico Veterinário',
      notes: 'Corroboração de propriedades físico-químicas, suspensão oral 20 mg/mL em Ora-Plus®/Ora-Sweet®, doses em cães, gatos, aves e répteis, cautelas renais e interações.',
      evidenceLevel: 'Referência terciária padrão-ouro',
    },
    {
      id: 'ref-bsava-10',
      citationText: 'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. BSAVA; 2020. Monografia: Allopurinol, pp. 11–12.',
      sourceType: 'Formulário Veterinário Internacional',
      notes: 'Corroboração de doses de dissolução/prevenção de ácido úrico em cães (10 mg/kg q8h ou 15 mg/kg q12h), leishmaniose canina e experiência felina limitada.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-ettinger-9e',
      citationText: 'Côté E, Ettinger SJ, Feldman EC. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Sec. XI (Leishmaniasis, p. 1032 / PDF p. 1091), Sec. XX (Hyperxanthinuria, p. 2122 / PDF p. 2274) e Cap. 308–309 (Canine and Feline Lower Urinary Tract Urolithiasis, pp. 2149–2163 / PDF pp. 2301–2315).',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      notes: 'Base de dissolução em HHU canina (30–40%, mediana 1 mês), insolubilidade da xantina em qualquer pH urinário, radiolucência em raios X e contraindicação como terapia primária em felinos com urato.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-greene-5e',
      citationText: 'Sykes JE, Papich MG. Greene’s Infectious Diseases of the Dog and Cat. 5th ed. Elsevier; 2023. Cap. 12: Antiprotozoal Drugs — Antileishmanial Antiprotozoal Drugs (Allopurinol), PDF pp. 542–544.',
      sourceType: 'Tratado de Doenças Infecciosas Veterinárias',
      notes: 'Corroboração da via de resistência (redução de transportadores de purina e cópias do gene S-adenosilmetionina sintetase) e impacto clínico renal positivo na LVC sob monitoramento.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-nephro-3e',
      citationText: 'Elliott J, Grauer GF, Westropp JL. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA; 2017. Cap. 6, 14 e 26 (pp. 77, 173–174, 308–310).',
      sourceType: 'Manual de Nefrologia e Urologia Veterinária',
      notes: 'Genética SLC2A9 c.616G>T, excreção urinária comparada de ácido úrico em Dálmatas (400–600 vs. 10–60 mg/dia) e algoritmos de prevenção de urato.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-nutrition-2e',
      citationText: 'Fascetti AJ, Delaney SJ, Larsen JA, Villaverde C. Applied Veterinary Clinical Nutrition. 2nd ed. Wiley-Blackwell; 2023. Cap. 16: Nutritional Management of Lower Urinary Tract Disease (Purines, Urate and Xanthine), pp. 426–428 (PDF pp. 454–456).',
      sourceType: 'Tratado de Nutrição Clínica Veterinária',
      notes: 'Alvo nutricional (35–50 g proteína/Mcal com fontes vegetais/ovo), revestimento de urato por xantina na falha dietética e protocolo de suspensão + redução para 25–35% após cálculos de xantina.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-acvim-uroliths-2016',
      citationText: 'Lulich JP, Berent AC, Adams LG, Westropp JL, Bartges JW, Osborne CA. ACVIM Small Animal Consensus Recommendations on the Treatment and Prevention of Uroliths in Dogs and Cats. J Vet Intern Med. 2016;30(5):1564–1574.',
      sourceType: 'Diretriz de Consenso Internacional ACVIM',
      doi: '10.1111/jvim.14559',
      url: 'https://doi.org/10.1111/jvim.14559',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-wavd-leish-2025',
      citationText: 'World Association for Veterinary Dermatology (WAVD). Clinical Consensus Guidelines for the Diagnosis and Treatment of Canine Leishmaniosis. 2025.',
      sourceType: 'Diretriz Internacional WAVD',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-clwg-leish-2026',
      citationText: 'Canine Leishmaniosis Working Group (CLWG). Updated International Recommendations on Canine Leishmaniosis Classification and Therapy. 2026.',
      sourceType: 'Consenso Internacional CLWG',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-leishvet-canine-2025',
      citationText: 'LeishVet Group. Practical Management of Canine Leishmaniosis. Guidelines Updated 2025.',
      sourceType: 'Diretriz Internacional LeishVet',
      url: 'https://www.leishvet.org/wp-content/uploads/2025/09/FS-LeishVetC.pdf',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-leishvet-feline-2024',
      citationText: 'LeishVet Group. Practical Management of Feline Leishmaniosis. Guidelines Updated 2024.',
      sourceType: 'Diretriz Internacional LeishVet Felina',
      url: 'https://www.leishvet.org/wp-content/uploads/2024/04/FS-ALIVE24-feline.pdf',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-abcd-fel-2024',
      citationText: 'European Advisory Board on Cat Diseases (ABCD). Guideline for Leishmaniosis in Cats. 2024/2026 update.',
      sourceType: 'Diretriz Europeia ABCD Felina',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-portaria-1426-2008',
      citationText: 'Brasil. Ministério da Saúde / Ministério da Agricultura, Pecuária e Abastecimento. Portaria Interministerial nº 1.426, de 11 de julho de 2008 (proibição do tratamento de LVC com produtos humanos ou não registrados no MAPA) e notas técnicas do CFMV / Brasileish.',
      sourceType: 'Normativa Sanitária Brasileira',
      evidenceLevel: 'Legislação sanitária vigente no Brasil',
    },
    {
      id: 'ref-bartges-1997',
      citationText: 'Bartges JW, Osborne CA, Felice LJ, et al. Bioavailability and pharmacokinetics of intravenously and orally administered allopurinol in healthy beagles. Am J Vet Res. 1997;58(5):504–510.',
      sourceType: 'Estudo farmacocinético cruzado',
      pmid: '9140559',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9140559/',
      evidenceLevel: 'Nível I — Farmacocinética experimental controlada',
    },
    {
      id: 'ref-koutinas-2001',
      citationText: 'Koutinas AF, Saridomichelakis MN, Mylonakis ME, et al. A randomised, blinded, placebo-controlled clinical trial with allopurinol in canine leishmaniosis. Vet Parasitol. 2001;98(4):247–261.',
      sourceType: 'Ensaio clínico randomizado duplo-cego controlado por placebo',
      doi: '10.1016/s0304-4017(01)00399-5',
      pmid: '11423183',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11423183/',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado',
    },
    {
      id: 'ref-miro-miltefosine-2009',
      citationText: 'Miró G, Oliva G, Cruz I, et al. Multicentric, controlled clinical study to evaluate effectiveness and safety of miltefosine and allopurinol for canine leishmaniosis. Vet Dermatol. 2009;20(5-6):397–404.',
      sourceType: 'Ensaio clínico multicêntrico controlado',
      doi: '10.1111/j.1365-3164.2009.00824.x',
      pmid: '20178476',
      url: 'https://pubmed.ncbi.nlm.nih.gov/20178476/',
      evidenceLevel: 'Nível I — Estudo multicêntrico controlado',
    },
    {
      id: 'ref-manna-2015',
      citationText: 'Manna L, Corso R, Galiero G, et al. Long-term follow-up of dogs with leishmaniosis treated with meglumine antimoniate plus allopurinol versus miltefosine plus allopurinol. Parasit Vectors. 2015;8:289.',
      sourceType: 'Estudo longitudinal comparativo',
      doi: '10.1186/s13071-015-0896-0',
      url: 'https://doi.org/10.1186/s13071-015-0896-0',
      evidenceLevel: 'Nível II — Coorte clínica longitudinal',
    },
    {
      id: 'ref-torres-2016',
      citationText: 'Torres M, Pastor J, Roura X, et al. Adverse urinary effects of allopurinol in dogs with leishmaniasis. J Small Anim Pract. 2016;57(6):299–304.',
      sourceType: 'Estudo de coorte de farmacovigilância',
      doi: '10.1111/jsap.12484',
      pmid: '27112522',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27112522/',
      evidenceLevel: 'Nível II — Farmacovigilância clínica',
    },
    {
      id: 'ref-yasur-landau-2016',
      citationText: 'Yasur-Landau D, Jaffe CL, David L, Baneth G. Allopurinol Resistance in Leishmania infantum from Dogs with Disease Relapse. PLoS Negl Trop Dis. 2016;10(1):e0004341.',
      sourceType: 'Estudo parasitológico de resistência',
      doi: '10.1371/journal.pntd.0004341',
      pmid: '26735519',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26735519/',
      evidenceLevel: 'Estudo experimental ex vivo / in vitro',
    },
    {
      id: 'ref-oliveira-2025',
      citationText: 'Oliveira BC, Silva AC, Fontes MM, et al. Characterisation and evaluation of predisposing factors for the development of xanthinuria in dogs with leishmaniosis under allopurinol therapy. Parasit Vectors. 2025;18(1):98.',
      sourceType: 'Estudo multicêntrico retrospectivo pareado',
      doi: '10.1186/s13071-025-06731-0',
      pmid: '40065388',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40065388/',
      evidenceLevel: 'Nível II — Caso-controle pareado multicêntrico',
    },
    {
      id: 'ref-zyloric-bula',
      citationText: 'Aspen Pharma Indústria Farmacêutica Ltda / Medley Farmacêutica Ltda. Bulas técnicas de alopurinol 100 mg e 300 mg comprimidos (Zyloric® e genérico). Anvisa.',
      sourceType: 'Bula oficial registrada na ANVISA',
      url: 'https://consultas.anvisa.gov.br/#/medicamentos/',
      evidenceLevel: 'Documento técnico regulatório',
    },
  ],

  relatedDiseaseSlugs: [
    'leishmaniose-visceral-canina',
    'leishmaniose-caes-gatos',
    'doenca-renal-cronica-canina',
    'doenca-renal-cronica-felina',
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
  ],
};
