import type { MedicationRecord } from '../../types/medication';

export const sulfametoxazolTrimetoprimaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-sulfametoxazol-trimetoprima',
    slug: 'sulfametoxazol-trimetoprima',
    title: 'Trimetoprima + Sulfonamida (TMP-SDZ / TMP-SMX)',
    activeIngredient: 'Sulfadiazina + Trimetoprima / Sulfametoxazol + Trimetoprima',
    pharmacologicClass:
      'Antibacteriano e antiprotozoário bactericida; sulfonamida potencializada por diaminopirimidina (bloqueio sequencial da via do folato bacteriano na proporção 1:5)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Trimetoprima',
      'Sulfadiazina',
      'Sulfametoxazol',
      'TMP-SDZ',
      'TMP-SMX',
      'Cotrimoxazol',
      'Ibatrim',
      'Bactrim',
      'Sulfonamida Potencializada',
      'Infecção Urinária',
      'Cistite Canina',
      'Prostatite Canina',
      'ISCAID 2025',
    ],
    tradeNames: [
      'Ibatrim Oral® Solução 240 mg/mL (IBASA — Uso Veterinário Oficial)',
      'Bactrim® Comprimidos 480 mg e 960 mg (Roche / Genéricos — Uso Humano)',
      'Bactrim® Suspensão Oral 48 mg/mL (Roche / Genéricos — Uso Humano)',
      'Tribrissen® / Norodine® / Duphatrim® / Septrin® (Marcas Internacionais Veterinárias e Humanas)',
    ],
    officialSiteUrl: 'https://www.ibasa.com.br/ibatrim-antibacteriano-ibasa-caes-gatos-20ml',
    leafletUrl: 'https://www.ibasa.com.br/ibatrim-antibacteriano-ibasa-caes-gatos-50ml',
    mechanismOfAction:
      'A associação constitui uma sulfonamida potencializada que atua através do duplo bloqueio enzimático sequencial na via de biossíntese do ácido tetraidrofólico (THF), cofator indispensável à síntese de purinas, timidilato e metionina requeridos na replicação e reparo de DNA e RNA microbiano. A sulfonamida (sulfadiazina ou sulfametoxazol) é um ácido fraco análogo estrutural do ácido para-aminobenzoico (PABA) que inibe competitivamente a di-hidropteroato sintase (DHPS), impedindo a incorporação de PABA na síntese de ácido di-hidrofólico (DHF). Em seguida, a trimetoprima (diaminopirimidina e base fraca lipofílica) atua como inibidor seletivo reversível da enzima bacteriana di-hidrofolato redutase (DHFR), impedindo a conversão de DHF em tetraidrofolato funcional, com afinidade 50.000 a 100.000 vezes maior pela enzima de bactérias e protozoários que pela DHFR de mamíferos. A inibição sequencial em dois pontos obrigatórios da mesma via converte o efeito predominantemente bacteriostático de cada droga isolada em uma ação bactericida sinérgica rápida e tempo-dependente contra cepas suscetíveis.',
    plainLanguageSummary:
      'Antimicrobiano oral de amplo espectro formado pela união de dois princípios ativos: uma sulfonamida (sulfadiazina ou sulfametoxazol) e a trimetoprima. Juntos, eles bloqueiam em duas etapas seguidas a capacidade da bactéria de produzir ácido fólico e multiplicar seu DNA. PONTOS CRÍTICOS DE PLANTÃO: 1) A dose expressa em compêndios internacionais (Plumb, BSAVA, ISCAID) refere-se SEMPRE ao PRODUTO COMBINADO TOTAL (trimetoprima + sulfonamida na proporção clássica de 1:5). Uma dose de 15 mg/kg total equivale a 2,5 mg/kg de trimetoprima mais 12,5 mg/kg de sulfonamida. Nunca prescrever 15 mg/kg de cada componente isolado. 2) Em cistite bacteriana esporádica canina, cursos curtos de 3 a 5 dias alcançam a mesma taxa de cura de tratamentos antigos de 10 a 14 dias (0,0625 mL/kg de Ibatrim Oral a cada 12 horas). 3) Cães tratados por mais de 7 dias exigem monitoramento rigoroso para ceratoconjuntivite seca (olho seco com Teste de Schirmer basal e seriado) e síndrome de hipersensibilidade tardia (febre, dor articular, trombocitopenia e hepatite ao redor do 12º dia, com maior risco em Doberman, Samoieda e Schnauzer). Em gatos jovens, a maioria dos sinais urinários não é de origem bacteriana e exige urocultura antes de qualquer antimicrobiano.',

    indications: [
      'Cistite bacteriana esporádica em cães e gatos em cursos curtos de 3 a 5 dias, orientada por antibiograma e padrões de suscetibilidade regional (ISCAID UTI).',
      'Infecções bacterianas recorrentes e complicadas do trato urinário por microrganismos Gram-negativos e Gram-positivos suscetíveis.',
      'Prostatite bacteriana aguda e crônica em cães, aproveitando o aprisionamento iônico (ion trapping) da trimetoprima no tecido e fluido prostático.',
      'Piodermite bacteriana canina como antimicrobiano de segunda escolha segundo o consenso ISCAID 2025, reservado para falhas tópicas ou confirmação em cultura.',
      'Nocardiose cutânea, pleural e disseminada por Nocardia spp. em cães e gatos, em protocolos prolongados combinados ou guiados por antibiograma.',
      'Tratamento alternativo e adjuvante de protozooses sistêmicas (Toxoplasma gondii, Neospora caninum, Hepatozoon americanum e coccidiose).',
    ],

    contraindications: [
      'Histórico prévio comprovado de hipersensibilidade alérgica, erupção medicamentosa cutânea ou anafilaxia a sulfonamidas ou trimetoprima.',
      'Ceratoconjuntivite seca (KCS) pré-existente ou histórico de toxicidade lacrimal induzida por sulfonamidas (risco de aplasia acinar irreversível).',
      'Histórico de poliartrite imunomediada, anemia hemolítica imunomediada ou necrose hepática aguda idiossincrática associada a sulfas.',
      'Hepatopatia parenquimatosa grave, insuficiência hepática aguda ou necrose hepática ativa.',
      'Insuficiência renal grave anúrica ou oligúrica e urolitíase preexistente com urina fortemente ácida e concentrada.',
      'Discrasias sanguíneas preexistentes graves (trombocitopenia grave, agranulocitose ou anemia aplásica).',
    ],

    cautions: [
      'Dose do produto total: conferir sempre se a dose calculada é da combinação (1:5). Dose de 15 mg/kg total = 2,5 mg/kg TMP + 12,5 mg/kg sulfa; dose de 30 mg/kg total = 5 mg/kg TMP + 25 mg/kg sulfa.',
      'Monitoramento oftálmico obrigatório em cães: em tratamentos superiores a 7 dias, realizar o Teste Lacrimal de Schirmer (STT) basal e reavaliar periodicamente (5º dia e a cada 2 a 3 semanas). Orientar o tutor a relatar secreção ocular ou blefaroespasmo.',
      'Síndrome de hipersensibilidade sistêmica tardia canina: pico de incidência entre 5 e 36 dias de uso (média de 12 dias), caracterizada por febre, poliartrite, trombocitopenia e elevação de ALT. Maior suscetibilidade relatada em Doberman Pinscher, Samoieda e Schnauzer Miniatura.',
      'Hipotireoidismo farmacológico induzido: sulfonamidas inibem reversivelmente a organificação tireoidiana; reduzem T4 e fT4 e elevam TSH em cães sob tratamento de 3 semanas. Não diagnosticar hipotireoidismo primário sem intervalo de suspensão de 1 a 2 semanas.',
      'Cristalúria e nefrotoxicidade tubular: sulfonamidas precipitam em urina ácida e concentrada. Manter livre acesso à água, garantir hidratação contínua e NUNCA administrar agentes acidificantes urinários concomitantes.',
      'Ineficácia contra patógenos específicos: Pseudomonas aeruginosa e Enterococcus spp. apresentam resistência intrínseca in vivo; bactérias em pus e tecido necrótico utilizam PABA e timidina extracelulares, reduzindo a eficácia sem desbridamento e drenagem.',
    ],

    adverseEffects: [
      'Ceratoconjuntivite seca (KCS) canina por toxicidade direta e imunomediada às células acinares da glândula lacrimal (prevalência recente de 1,8% no VetCompass 2026, potencialmente irreversível se não suspensa rapidamente).',
      'Síndrome de hipersensibilidade multissistêmica tardia no cão (febre, claudicação e dor articular por poliartrite asséptica, trombocitopenia, anemia hemolítica e petéquias ao redor do 12º dia).',
      'Hepatotoxicidade idiossincrática e hepatite neutrofílica aguda com icterícia e elevação acentuada de ALT/AST e bilirrubina (fator associado a pior prognóstico).',
      'Hipotireoidismo farmacológico reversível em cães por bloqueio da síntese tireoidiana de T4 com elevação reflexa compensatória de TSH.',
      'Cristalúria, hematúria, disúria e obstrução tubular renal por precipitação de cristais de sulfonamida em urina ácida ou em animais hipohidratados.',
      'Supressão medular dose/tempo-dependente por efeito antifolato (neutropenia, agranulocitose e trombocitopenia em tratamentos crônicos).',
      'Distúrbios gastrointestinais e salivação: hipersalivação transitória e êmese frequentes em gatos devido ao sabor amargo; vômito e fezes pastosas em cães.',
    ],

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Duplo Bloqueio do Folato',
        icon: 'Shield',
        desc: 'Inibição enzimática sequencial da DHPS pela sulfonamida e da DHFR pela trimetoprima, convertendo duas drogas bacteriostáticas em um efeito bactericida sinérgico.',
      },
      {
        title: 'Eficácia Tempo-Dependente',
        icon: 'Clock',
        desc: 'A eficácia antimicrobiana depende do tempo em que a concentração livre permanece acima da MIC (fT>MIC), exigindo intervalo posológico rigoroso a cada 12 horas.',
      },
      {
        title: 'Alta Concentração Urinária',
        icon: 'Droplets',
        desc: 'Ampla excreção renal por filtração e secreção tubular maciça gerando níveis vesicais ideais para cistites bacterianas curtas de 3 a 5 dias.',
      },
      {
        title: 'Aprisionamento Prostático',
        icon: 'Lock',
        desc: 'A trimetoprima é uma base fraca lipofílica que sofre ion trapping e atinge altas concentrações no fluido e parênquima prostático inflamado.',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Cistite Bacteriana Esporádica Canina e Felina (Consenso ISCAID UTI)',
        species: 'both',
        doseSummary: '15 mg/kg da associação total VO a cada 12 horas (2,5 mg/kg TMP + 12,5 mg/kg sulfa)',
        route: 'Oral (VO com água abundante)',
        duration: 'Curso curto de 3 a 5 dias (0,0625 mL/kg de Ibatrim Oral 240 mg/mL q12h)',
        clinicalContext:
          'Eficácia clínica comprovada equivalente a cursos antigos de 10 a 14 dias com significativamente menos pressão de resistência. Em gatos jovens, afastar cistite idiopática felina antes de tratar.',
      },
      {
        condition: 'Prostatite Bacteriana Canina Aguda ou Crônica',
        species: 'dog',
        doseSummary: '15 a 30 mg/kg da associação total VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: 'Aguda: 4 semanas; Crônica: 4 a 6 semanas sob monitoramento rigoroso',
        clinicalContext:
          'A trimetoprima penetra a barreira hemato-prostática por aprisionamento iônico no fluido prostático ácido. Em cães não reprodutores, a orquiectomia cirúrgica é indispensável.',
      },
      {
        condition: 'Piodermite Bacteriana Canina (Segunda Escolha - Diretriz ISCAID 2025)',
        species: 'dog',
        doseSummary: '15 mg/kg total VO a cada 12 horas ou 30 mg/kg total VO a cada 24 horas',
        route: 'Oral (VO)',
        duration: 'Superficial: 2 a 3 semanas; Profunda: 3 a 4 semanas com citologia de controle',
        clinicalContext:
          'Classificada como droga de segunda escolha pelo ISCAID 2025 devido ao perfil de reações adversas; indicada mediante cultura e antibiograma quando a terapia tópica e aminopenicilinas forem inadequadas.',
      },
      {
        condition: 'Nocardiose Cutânea, Pleural e Disseminada (Cães e Gatos)',
        species: 'both',
        doseSummary: '15 a 30 mg/kg da associação total VO a cada 12 horas',
        route: 'Oral (VO)',
        duration: 'Tratamentos prolongados de 1 a 6 meses guiados por imagem e antibiograma',
        clinicalContext:
          'Nocardia spp. frequentemente mantém sensibilidade às sulfonamidas potencializadas. O tratamento exige drenagem pleural cirúrgica e monitoramento hematológico e lacrimal seriado.',
      },
      {
        condition: 'Toxoplasmose e Neosporose Clínica Canina e Felina',
        species: 'both',
        doseSummary: '15 mg/kg da associação total VO a cada 12 horas (TMP-SDZ ou TMP-SMX)',
        route: 'Oral (VO)',
        duration: '4 semanas consecutivas; pode ser associada a pirimetamina em neosporose',
        clinicalContext:
          'Opção alternativa à clindamicina. Se associada à pirimetamina em neosporose canina, há potente bloqueio antifolato cumulativo, exigindo hemograma seriado contra neutropenia e anemia.',
      },
    ],

    // 3. Indicações Clínicas Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-sulfa-tmp-cystitis-short',
        indication: 'Cistite Bacteriana Esporádica Canina e Felina (Protocolo Curto ISCAID UTI)',
        clinicalContext:
          'O Consenso Internacional da ISCAID para Infecções do Trato Urinário em Cães e Gatos consagra a associação sulfonamida-trimetoprima na dose de 15 mg/kg total a cada 12 horas como uma das principais escolhas de primeira linha quando há padrões locais conhecidos de sensibilidade. O marco conceitual moderno é a abolição dos tratamentos históricos de 10 a 14 dias: o ensaio clínico randomizado mascarado de Clare et al. (2014) em cadelas com cistite não complicada comprovou taxas de cura clínica equivalentes a 85% com apenas 3 dias de TMP-SMX, idênticas às alcançadas com 10 dias de cefalexina. Em felinos, é crucial lembrar que mais de 90% dos gatos jovens com disúria e hematúria têm cistite idiopática não bacteriana (DTUIF/FIC); o antimicrobiano deve ser reservado a animais idosos com DRC, diabetes ou urocultura positiva confirmada.',
        species: 'both',
        dose: '15 mg/kg da associação total (2,5 mg/kg de trimetoprima + 12,5 mg/kg de sulfonamida)',
        route: 'Oral (VO administrado com água fresca abundante)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Curso curto de 3 a 5 dias (conforme consenso ISCAID UTI)',
        mechanismOfAction:
          'A alta filtração glomerular e secreção tubular ativa concentram a sulfonamida e a trimetoprima na urina vesical em níveis dezenas de vezes superiores aos plasmáticos, erradicando rapidamente patógenos uropatogênicos suscetíveis (E. coli, Proteus, Klebsiella, estafilococos).',
        clinicalRationale:
          'Cursos curtos de 3 a 5 dias minimizam a disbiose gastrintestinal, reduzem a pressão de seleção de cepas multirresistentes e evitam o desenvolvimento de reações adversas imunomediadas e KCS, que ocorrem tipicamente em terapias superiores a 7 dias.',
        monitoring: 'Resolução rápida da disúria, hematúria e polaciúria dentro de 48 a 72 horas; reavaliar urocultura apenas se houver falha de resposta clínica ou recidiva.',
        referenceIds: ['ref-iscaid-uti-2019', 'ref-clare-2014-short-uti', 'ref-plumbs-10th-sulfa-tmp'],
        evidenceLevel: 'Consenso Internacional ISCAID / Ensaio Clínico Randomizado Mascarado (Nível 1b)',
      },
      {
        id: 'ind-sulfa-tmp-uti-complicated',
        indication: 'Infecção Urinária Recorrente e Complicada por Patógeno Suscetível',
        clinicalContext:
          'Definida como ITU associada a comorbidades predisponentes funcionais ou estruturais (doença renal crônica, endocrinopatias como diabetes mellitus e hiperadrenocorticismo, urolitíase, bexiga neurogênica ou cateteres de demora). O tratamento deve ser orientado por urocultura com identificação de sensibilidade in vitro. A associação trimetoprima-sulfonamida atinge concentrações teciduais vesicais e urinárias maciças. Contudo, em pacientes com urolitíase preexistente ou urina persistentemente ácida, a sulfadiazina deve ser usada com extremo cuidado para evitar a deposição adicional de cristais de sulfa nos cálculos.',
        species: 'both',
        dose: '15 a 30 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 14 dias conforme controle da comorbidade de base e resposta clínica',
        mechanismOfAction:
          'Bloqueio sinérgico sequencial da síntese de DNA bacteriano pela via do tetraidrofolato, mantendo altas concentrações urinárias ativas.',
        clinicalRationale:
          'Opção eficaz e poupadora de fluoroquinolonas em infecções complicadas por enterobactérias e estreptococos sensíveis, desde que a causa estrutural de base seja investigada.',
        monitoring: 'Urinálise completa seriada, urocultura de controle por cistocentese 5 a 7 dias após o término, Teste de Schirmer se tratamento superar 7 dias.',
        referenceIds: ['ref-iscaid-uti-2019', 'ref-plumbs-10th-sulfa-tmp', 'ref-bsava-10th-sulfa-tmp'],
        evidenceLevel: 'Diretrizes Clínicas Especializadas ISCAID / Literatura Internacional',
      },
      {
        id: 'ind-sulfa-tmp-prostatitis',
        indication: 'Prostatite Bacteriana Canina Aguda e Crônica',
        clinicalContext:
          'A próstata canina possui uma barreira hemato-prostática lipofílica impermeável a antimicrobianos polares hidrofílicos (como aminopenicilinas e cefalosporinas). A trimetoprima é uma molécula básica fraca altamente lipofílica que atravessa facilmente as junções intercelulares do estroma prostático. Uma vez no fluido prostático, cujo pH normal é mais ácido que o plasma (pH 6,4 vs 7,4), a trimetoprima recebe prótons (H+) e torna-se ionizada na forma cationizada (BH+). Moléculas ionizadas não conseguem atravessar membranas lipídicas de volta, ficando retidas em concentrações muito superiores às séricas (fenômeno de ion trapping). Na prostatite bacteriana aguda, a inflamação vascular temporariamente amplia a permeabilidade; na prostatite crônica, o aprisionamento da trimetoprima é essencial para atingir o foco. Em cães inteiros, a castração cirúrgica (orquiectomia) é tratamento de base obrigatório para induzir atrofia prostática e prevenir recidivas.',
        species: 'dog',
        dose: '15 a 30 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Prostatite aguda: 4 semanas; Prostatite crônica: 4 a 6 semanas guiadas por urocultura e ultrassom',
        mechanismOfAction:
          'Penetração tecidual lipofílica profunda da trimetoprima com aprisionamento iônico no ácino prostático e ação bactericida sequencial associada à sulfonamida.',
        clinicalRationale:
          'Uma das poucas opções orais não fluoradas capazes de superar a barreira prostática em cães, evitando a indução precoce de resistência a fluoroquinolonas.',
        monitoring: 'Acompanhamento do tamanho prostático por ultrassonografia seriada, exame de urina, STT a cada 2 a 3 semanas e hemograma completo com enzimas hepáticas.',
        referenceIds: ['ref-iscaid-uti-2019', 'ref-bsava-10th-sulfa-tmp', 'ref-plumbs-10th-sulfa-tmp'],
        evidenceLevel: 'Consenso Internacional ISCAID / Farmacologia Aplicada',
      },
      {
        id: 'ind-sulfa-tmp-pyoderma-second-line',
        indication: 'Piodermite Bacteriana Canina com Indicação Sistêmica (Consenso ISCAID 2025)',
        clinicalContext:
          'O Consenso Internacional da ISCAID de 2025 para diagnóstico e tratamento de foliculite bacteriana superficial e piodermite em cães promoveu uma reclassificação substancial das sulfonamidas potencializadas. Historicamente consideradas drogas de primeira linha, as diretrizes de 2025 reclassificaram a trimetoprima-sulfonamida como antimicrobiano de SEGUNDA ESCOLHA. O motivo central não é a falta de potência in vitro contra Staphylococcus pseudintermedius sensível à meticilina (MSSP), mas sim o perfil desfavorável de eventos adversos idiossincráticos caninos (KCS irreversível, poliartrite imunomediada, hepatite aguda e hipotireoidismo). Portanto, a terapia tópica isolada (xampu de clorexidina a 4%) é a escolha inicial prioritária; a associação oral entra apenas em casos profundos ou refratários quando aminopenicilinas ou cefalosporinas de primeira escolha não forem opções viáveis.',
        species: 'dog',
        dose: '15 mg/kg total VO a cada 12 horas ou 30 mg/kg total VO a cada 24 horas',
        route: 'Oral (VO junto ao alimento)',
        frequency: 'A cada 12 horas (q12h) ou a cada 24 horas (q24h)',
        duration: 'Superficial: 2 a 3 semanas; Profunda: 3 a 4 semanas com reavaliação citológica seriada',
        mechanismOfAction:
          'Inibição sequencial da produção de tetraidrofolato no estafilococo cutâneo, inibindo a replicação bacteriana nos folículos e derme.',
        clinicalRationale:
          'Apresenta boa distribuição dérmica no cão, mas requer estrito antimicrobial stewardship para proteger o paciente de toxicidade tecidual desnecessária.',
        monitoring: 'Citologia cutânea de controle, Teste Lacrimal de Schirmer basal e periódico, inspeção de claudicação articular ou febre.',
        referenceIds: ['ref-iscaid-pyoderma-2025', 'ref-plumbs-10th-sulfa-tmp'],
        evidenceLevel: 'Consenso Internacional ISCAID 2025 (Diretriz de Segunda Escolha)',
      },
      {
        id: 'ind-sulfa-tmp-nocardiosis',
        indication: 'Nocardiose Sistêmica, Cutânea e Piogranulomatosa (Cães e Gatos)',
        clinicalContext:
          'A nocardiose é uma doença piogranulomatosa crônica grave e debilitante causada por bactérias filamentosas e ramificadas aeróbias estritas Gram-positivas álcool-ácido resistentes modificadas do gênero Nocardia (como N. asteroides, N. veterana e N. brasiliensis). As infecções manifestam-se frequentemente como piotórax exuberante em cães e gatos com efusão pleural com grânulos de enxofre, celulite subcutânea abscedante e fistulosa ou disseminação para sistema nervoso central e órgãos internos. A sulfadiazina ou sulfametoxazol potencializada por trimetoprima constitui o pilar clássico de escolha terapêutica médica, frequentemente combinada a drenagem torácica aberta ou fechada e lavagens contínuas.',
        species: 'both',
        dose: '15 a 30 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Tratamento de longo prazo por 1 a 6 meses (e pelo menos 2 a 4 semanas após resolução radiográfica e citológica completa)',
        mechanismOfAction:
          'Bloqueio potente da síntese de folato e timidilato de Nocardia spp., permitindo controle e regressão de lesões granulomatosas.',
        clinicalRationale:
          'Terapia médica consagrada internacionalmente para microrganismos corineformes e filamentosos onde a maioria dos beta-lactâmicos simples falha.',
        monitoring: 'Hemograma completo com contagem de plaquetas e leucócitos a cada 2 semanas, perfil bioquímico hepático e renal, Schirmer Tear Test seriado.',
        referenceIds: ['ref-bsava-10th-sulfa-tmp', 'ref-plumbs-10th-sulfa-tmp'],
        evidenceLevel: 'Padrão Ouro Internacional em Doenças Infecciosas / Relatos de Série Clínica',
      },
      {
        id: 'ind-sulfa-tmp-toxoplasmosis',
        indication: 'Toxoplasmose e Neosporose Clínica em Pequenos Animais',
        clinicalContext:
          'Toxoplasma gondii e Neospora caninum são protozoários intracelulares que infectam cães e gatos, provocando miosite grave, polirradiculoneurite ascendente, paralisia rígida de membros pélvicos em filhotes (neosporose) e sinais respiratórios, oculares ou neurológicos difusos. A associação de sulfonamida e trimetoprima apresenta potente ação antiprotozoária ao bloquear a síntese de folato do parasito. Em neosporose canina, esquemas combinados com pirimetamina (1 mg/kg VO q24h) são descritos para potencializar a inibição da di-hidrofolato redutase protozoária; contudo, a associação simultânea de sulfonamida, trimetoprima e pirimetamina promove bloqueio maciço do folato também no hospedeiro, elevando significativamente o perigo de anemia megaloblástica e leucopenia severa.',
        species: 'both',
        dose: '15 a 20 mg/kg da associação total VO',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '4 semanas consecutivas; estender por 2 semanas após platô de melhora neurológica',
        mechanismOfAction:
          'Inibição sequencial da produção de tetraidrofolato requerida para a síntese de purinas e replicação de taquizoítos protozoários.',
        clinicalRationale:
          'Alternativa terapêutica estabelecida à clindamicina quando houver intolerância gastrointestinal severa ou para protocolos de combinação sinérgica.',
        monitoring: 'Hemograma semanal (atenção crítica para neutropenia e trombocitopenia se associado a pirimetamina), avaliação neurológica e motora.',
        referenceIds: ['ref-plumbs-10th-sulfa-tmp', 'ref-bsava-10th-sulfa-tmp'],
        evidenceLevel: 'Literatura Especializada / Compêndios Farmacológicos Veterinários',
      },
    ],

    // 4. Farmacocinética Clínica Comparada
    pharmacokineticsData: {
      absorption:
        'Após administração oral em cães em jejum ou alimentados, a absorção gastrointestinal da associação trimetoprima-sulfonamida é rápida e quase completa. O estudo farmacocinético cruzado padrão ouro conduzido por Ekstrand et al. (2026, BMC Veterinary Research) em cães Beagles comparando administrações intravenosa e oral de TMP-SDZ e TMP-SMX revelou biodisponibilidade oral impressionante de 93% a 97% para ambos os componentes ativos, com picos plasmáticos (Tmax) alcançados entre 1 e 4 horas. A alimentação não interfere de forma clinicamente relevante na exposição sistêmica total da sulfonamida, embora possa retardar levemente a taxa de absorção da trimetoprima. Em felinos, estudos clássicos de Craig e White (1976) demonstraram absorção entérica efetiva; contudo, não existem dados quantitativos modernos de biodisponibilidade felina equivalentes aos caninos, sendo formalmente contraindicado extrapolar os parâmetros cinéticos do cão para o gato.',
      distribution:
        'A trimetoprima e as sulfonamidas apresentam volumes de distribuição bastante divergentes devido às suas características físico-químicas. A trimetoprima é uma base fraca lipofílica (pKa de 7,1) com volume de distribuição amplo de aproximadamente 2,67 L/kg no cão (Ekstrand et al., 2026; dados históricos de Plumb: 1,49 L/kg), penetrando avidamente nos tecidos parenquimatosos, pulmões, secreções brônquicas, pele e no fluido prostático por aprisionamento iônico. A sulfadiazina e o sulfametoxazol são ácidos fracos (pKa de 6,3 e 5,7) mais restritos ao espaço extracelular, com volume de distribuição de cerca de 0,5 L/kg no cão (Plumb: 1,02 L/kg). Na presença de inflamação meníngea ativa, ambos os fármacos ultrapassam a barreira hematoencefálica, atingindo concentrações no líquor (LCR) de aproximadamente 50% dos níveis plasmáticos. A taxa de ligação proteica plasmática no cão situa-se em torno de 57% para a trimetoprima (fração livre média de 43%), 50% para a sulfadiazina (fração livre de 50%) e 67% para o sulfametoxazol (fração livre de 33%).',
      metabolism:
        'Existe uma peculiaridade metabólica fundamental da espécie canina: os cães são geneticamente desprovidos da enzima N-acetiltransferase funcional e não realizam a clássica N-acetilação de sulfonamidas observada em seres humanos e outras espécies. A biotransformação canina ocorre predominantemente por oxidação microssomal via citocromo P450, gerando metabólitos hidroxilaminas reativos que formam nitrosobifenilas e intermediários eletrofílicos que se ligam covalentemente a proteínas teciduais, atuando como haptenos e desencadeando a síndrome de hipersensibilidade imunomediada tardia. A conjugação com ácido glucurônico e sulfato também ocorre. A trimetoprima sofre hidroxilação hepática moderada e oxidação formando metabólitos N-óxidos e alfa-hidroxilados sem atividade antibacteriana substancial.',
      elimination:
        'A depuração da associação envolve excreção renal e hepática concomitantes. Ambos os componentes são eliminados por filtração glomerular e secreção tubular ativa sob as formas inalterada e conjugada. No cão, Ekstrand et al. (2026) demonstraram que a trimetoprima possui uma taxa de depuração (clearance) plasmática muito mais rápida que as sulfonamidas: o clearance da trimetoprima é de aproximadamente 0,44 L/kg/h, enquanto o da sulfadiazina é de 0,05 L/kg/h e o do sulfametoxazol é de 0,026 L/kg/h. Como consequência, a meia-vida de eliminação plasmática (t1/2) no cão é de 4,2 horas para a trimetoprima, 7,6 horas para a sulfadiazina e 12,6 horas para o sulfametoxazol. Isso prova que a proporção plasmática fixa administrada de 1:5 decai continuamente ao longo do intervalo, com a trimetoprima sendo eliminada mais precocemente e reforçando a obrigatoriedade da dosagem a cada 12 horas.',
      cnsPenetration:
        'Com barreiras meníngeas íntegras a penetração no sistema nervoso central é modesta; contudo, durante inflamação meníngea ativa, as concentrações no líquor cefalorraquidiano atingem cerca de 50% dos níveis plasmáticos tanto para a sulfonamida quanto para a trimetoprima.',
      plasmaBinding:
        'Moderada a baixa no cão: fração livre média de aproximadamente 43% para trimetoprima, 50% para sulfadiazina e 33% para sulfametoxazol.',
      halfLife:
        'No cão (Ekstrand et al., 2026): meia-vida de eliminação plasmática de 4,2 horas para a trimetoprima, 7,6 horas para a sulfadiazina e 12,6 horas para o sulfametoxazol. No Plumb (dados históricos): t1/2 de 2,5 h para trimetoprima e 9,8 h para sulfadiazina.',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO - Solução Oral ou Comprimidos)',
          technique:
            'Via prioritária e padrão ouro na clínica de cães e gatos. A biodisponibilidade oral canina é excelente (93% a 97%). Para soluções orais como Ibatrim Oral 240 mg/mL, homogeneizar rigorosamente o frasco por agitação antes de aspirar o volume em seringa dosadora graduada em mL. Pode ser administrado diretamente na comissura labial ou misturado a uma pequena porção de alimento úmido.',
          nursingCare:
            'Garantir livre e irrestrito acesso à água fresca durante todo o curso do tratamento para manter alto fluxo urinário e evitar a precipitação de cristais nos túbulos renais. Em gatos, administrar pequenas alíquotas lentas para evitar sialorreia induzida pelo sabor amargo característico da trimetoprima.',
          limitations:
            'Não utilizar a via oral em pacientes com vômitos incoercíveis, obstrução intestinal mecânica, íleo adinâmico grave ou em estado de choque circulatório descompensado.',
        },
        {
          route: 'Subcutânea (SC - Apresentações Veterinárias Específicas)',
          technique:
            'Aplicável exclusivamente quando for utilizada formulação veterinária injetável expressamente registrada para a via subcutânea (como apresentações internacionais de TMP-SDZ a 24% ou 48%). A dose descrita no BSAVA é de 30 mg/kg total a cada 24 horas. Injetar no tecido subcutâneo da região interescapular ou flanco.',
          nursingCare:
            'Realizar massagem suave e avaliar o local da aplicação; formulações injetáveis podem causar dor transitória, edema e fibrose subcutânea local.',
          limitations:
            'NUNCA improvisar suspensões ou soluções orais pela via injetável. Em animais desidratados ou hipotérmicos com vasoconstrição periférica reflexa, a absorção subcutânea é errática.',
        },
        {
          route: 'Intravenosa / Intramuscular (IV / IM - Formulações Hospitalares Humanas)',
          technique:
            'Apresentações humanas injetáveis de TMP-SMX possuem pH fortemente alcalino (ao redor de 10) e contêm propilenoglicol (40%) e álcool benzílico como cossolventes. Se o uso hospitalar parenteral for imprescindível, a solução deve ser obrigatoriamente diluída (mínimo de 1 parte de ampola para 25 partes de SG 5% ou SF 0,9%) e infundida lentamente em bomba de infusão contínua em 60 a 90 minutos.',
          nursingCare:
            'Monitorar rigorosamente o trajeto venoso (alto risco de flebite química se extravasar). Monitorar frequência e ritmo cardíacos e pressão arterial durante toda a infusão.',
          limitations:
            'A infusão rápida direta em bólus IV causa colapso cardiovascular agudo, hipotensão profunda e arritmias ventriculares. Contraindicada a administração concomitante com anestésicos ou depressores do SNC.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica a 0,9% (SF 0,9%) para formulações injetáveis compatíveis',
          'Solução Glicosada a 5% (SG 5%) para diluição de ampolas hospitalares humanas de TMP-SMX (diluição mínima de 1:25 para evitar turvação e precipitação)',
          'Água purificada para reconstituição ou diluição imediata de doses orais em seringa',
        ],
        incompatibleFluids: [
          'NUNCA administrar em associação com agentes acidificantes urinários (cloreto de amônio, metionina)',
          'Incompatível com soluções contendo bicarbonato de sódio ou substâncias altamente alcalinizantes/ácidas instáveis',
          'Incompatível com emulsões lipídicas de nutrição parenteral e soluções de aminoácidos na mesma via venosa',
          'Contraindicada a associação intravenosa concomitante com agonistas alfa-2 adrenérgicos (detomidina em equinos causa arritmias fatais documentadas) e fenotiazinas',
        ],
        infusionRateGuidance:
          'Apresentações orais líquidas (como Ibatrim Oral) não se destinam a infusões vasculares. Para a formulação hospitalar humana injetável excepcional, infundir em bomba ao longo de 60 a 90 minutos diluída em SG 5%, nunca ultrapassando vazão que gere hipotensão ou desconforto.',
        preparationNotes:
          'Conservar o Ibatrim Oral em sua embalagem original, em temperatura ambiente entre 15 e 30 °C, em local seco e ao abrigo da luz solar direta. Após aberto, o fabricante garante estabilidade por até 16 dias em temperatura ambiente. Não congelar.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Diaminopirimidina associada a Sulfonamida (Potencializada)',
        chemicalClassDescription:
          'Associação sinérgica fixa de uma base fraca lipofílica (trimetoprima) com um ácido fraco (sulfadiazina ou sulfametoxazol) na proporção ponderal padrão de 1:5.',
        therapeuticClass: 'Antibacteriano e Antiprotozoário Sistêmico Bloqueador do Folato',
        therapeuticClassDescription:
          'Agentes de duplo bloqueio enzimático sequencial na via de tetraidrofolato com atividade bactericida tempo-dependente e ampla distribuição tecidual.',
        detailedTargets: [
          {
            target: 'Di-hidropteroato sintase bacteriana (DHPS)',
            action:
              'A sulfonamida atua como análogo competitivo de substrato do PABA, bloqueando a condensação com di-hidropteridina pirofosfato.',
            clinicalSignificance:
              'Interrompe a síntese de novo de ácido di-hidrofólico em bactérias e protozoários que não absorvem folato preformado.',
          },
          {
            target: 'Di-hidrofolato redutase bacteriana (DHFR)',
            action:
              'A trimetoprima liga-se com altíssima seletividade ao sítio ativo da DHFR bacteriana, inibindo a redução de DHF a tetraidrofolato.',
            clinicalSignificance:
              'Esgota os estoques intracelulares de tetraidrofolato ativo, suprimindo a síntese de timidilato e purinas essenciais ao DNA.',
          },
          {
            target: 'Canal Epitelial de Sódio (ENaC) no Néfron Distal',
            action:
              'A trimetoprima exerce efeito inibitório farmacológico direto sobre os canais ENaC no túbulo coletor cortical (similar à amilorida).',
            clinicalSignificance:
              'Diminui o gradiente elétrico luminal negativo que impulsiona a secreção de potássio, predispondo à hipercalemia em nefropatas ou sob uso concomitante de espironolactona.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Caninos: Deficiência de Acetilação, Risco de KCS e Hipersensibilidade Tardia',
          description:
            'Cães não possuem a enzima hepática N-acetiltransferase funcional e oxidam as sulfonamidas em metabólitos hidroxilaminas reativos que funcionam como haptenos imunogênicos. Apresentam suscetibilidade singular à síndrome de hipersensibilidade sistêmica (febre, poliartrite asséptica, trombocitopenia e hepatite aguda por volta do 12º dia de uso, especialmente em Doberman, Samoieda e Schnauzer). Além disso, cães são a principal espécie afetada por ceratoconjuntivite seca (KCS) tóxica acinar lacrimal e supressão transitória da síntese tireoidiana de T4 com elevação de TSH.',
          clinicalImplications:
            'Em tratamentos caninos superiores a 7 dias, é obrigatório realizar o Teste Lacrimal de Schirmer basal e periódico, acompanhar hemograma e ALT/AST, e nunca diagnosticar hipotireoidismo primário sem intervalo de suspensão prévio.',
        },
        {
          species: 'cat',
          title: 'Felinos: Sialorreia por Palatabilidade, Anemia e Ausência de Dados Farmacocinéticos Modernos',
          description:
            'Gatos toleram a associação e apresentam menor incidência descrita de KCS do que os cães. Entretanto, as apresentações líquidas e a própria molécula de trimetoprima provocam sialorreia intensa e aversão por palatabilidade nos gatos, podendo levar à recusa alimentar voluntária precoce. As principais reações adversas felinas documentadas em compêndios são anorexia, hipersalivação profusa, sonolência, anemia regenerativa ou não regenerativa e leucopenia transitória. Não existem parâmetros modernos de biodisponibilidade e clearance para felinos comparáveis aos obtidos em cães por Ekstrand et al. (2026).',
          clinicalImplications:
            'Administrar com técnica suave evitando romper comprimidos amargos na orofaringe, assegurar hidratação adequada contra cristalúria e realizar urocultura prévia antes de prescrever empiricamente para sinais urinários baixos em gatos jovens.',
        },
      ],
      prescriptionType: {
        category: 'Medicamento Veterinário / Farmácia Humana sob Controle Especial',
        ordinanceOrLaw: 'Decreto-Lei nº 467/1969 e IN MAPA / RDC Anvisa nº 471/2021 e IN Anvisa nº 360/2025',
        retentionRequired: false,
        guidelines:
          'Para a apresentação veterinária nacional registrada no MAPA (Ibatrim Oral 240 mg/mL), a dispensação exige receituário simples do médico-veterinário em uma via. Quando o profissional optar pela prescrição extra-bula de formulações de farmácia humana comercial (como Bactrim ou genéricos de sulfametoxazol + trimetoprima), aplicam-se a RDC Anvisa 471/2021 e IN Anvisa 360/2025: receita em duas vias (uma via retida pela farmácia humana), com validade estrita de 10 dias corridos, contendo obrigatoriamente identificação completa do tutor (com CPF e endereço) e identificação do paciente animal.',
      },
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      precautions: [
        {
          condition: 'Hipersensibilidade Alérgica Prévia a Sulfonamidas ou Trimetoprima',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Reexposição em animais previamente sensibilizados desencadeia reação de hipersensibilidade aguda mediada por IgE (tipo I) ou formação maciça de imunocomplexos circulantes (tipo III), com risco de anafilaxia fulminante, angioedema e vasculite necrosante.',
          clinicalAction:
            'Contraindicação absoluta. Nunca reutilizar qualquer sulfonamida ou associação potencializada em pacientes com histórico alérgico documentado.',
        },
        {
          condition: 'Ceratoconjuntivite Seca (KCS) Preexistente em Cães',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'As sulfonamidas exercem citotoxicidade direta e imunomediada contra o epitélio acinar das glândulas lacrimais orbitária e da terceira pálpebra, diminuindo drasticamente a fração aquosa do filme lacrimal e podendo induzir atrofia glandular irreversível.',
          clinicalAction:
            'Contraindicação prática estrita. Realizar Teste de Schirmer antes de iniciar; em cães com valores basais baixos ou KCS conhecida, eleger outra classe antimicrobiana.',
        },
        {
          condition: 'Histórico de Poliartrite Imunomediada ou Necrose Hepática por Sulfa',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A formação de metabólitos reativos nitroso atua como antígeno tecidual, fixando-se às membranas sinoviais e hepatócitos e deflagrando ataque citotóxico de linfócitos T e neutrófilos com destruição tecidual rápida.',
          clinicalAction:
            'Contraindicação absoluta permanente. Proibir expressamente o uso de sulfonamidas na ficha clínica do paciente.',
        },
        {
          condition: 'Cães das Raças Doberman Pinscher, Samoieda e Schnauzer Miniatura',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Essas raças possuem predisposição genética hereditária a vias oxidativas anômalas de biotransformação de sulfonamidas, apresentando incidência desproporcionalmente maior de síndrome de hipersensibilidade multissistêmica tardia.',
          clinicalAction:
            'Precaução crítica. Preferir antimicrobianos alternativos igualmente eficazes sempre que disponíveis; se indispensável, monitorar com hemograma, ALT e STT rigorosos.',
        },
        {
          condition: 'Desidratação, Urina Ácida e Risco de Cristalúria / Urolitíase',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Sulfonamidas são ácidos fracos com solubilidade altamente dependente do pH. Em urina ácida (pH < 6,0) e concentrada por oligúria, as moléculas não ionizadas precipitam na luz dos túbulos coletores renais, formando cristais pontiagudos e cálculos.',
          clinicalAction:
            'Corrigir volemia e desidratação antes de prescrever; manter água disponível 24 horas por dia; nunca administrar substâncias acidificantes urinárias concomitantes.',
        },
        {
          condition: 'Insuficiência Renal Avançada ou Hepatopatia Grave',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A eliminação depende da filtração glomerular e da biotransformação hepática. Em insuficiência orgânica grave, há acúmulo de fármaco inalterado e metabólitos tóxicos com potencialização de reações adversas sistêmicas.',
          clinicalAction:
            'Reduzir a dose diária e/ou ampliar o intervalo posológico com base no clearance de creatinina; evitar sulfadiazina em nefropatias graves.',
        },
        {
          condition: 'Hipotireoidismo Farmacológico Induzido por Sulfonamidas em Cães',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Sulfonamidas inibem a enzima tireoperoxidase e a organificação do iodo na glândula tireoide, reduzindo T4 total e livre e elevando reflexamente o TSH em tratamentos de 3 semanas.',
          clinicalAction:
            'Não diagnosticar hipotireoidismo primário nem prescrever levotiroxina em cães sob uso crônico de sulfa-TMP; suspender a medicação e reavaliar o perfil tireoidiano após 2 semanas.',
        },
        {
          condition: 'Gestação e Lactação',
          alertLevel: 'caution',
          physiologicalExplanation:
            'A trimetoprima e as sulfonamidas atravessam livremente a barreira placentária e são excretadas no leite materno. Há relatos de teratogenia (fenda palatina e anomalias ósseas) em modelos de laboratório sob doses elevadas.',
          clinicalAction:
            'Avaliar rigorosamente a relação risco-benefício; evitar a administração durante o primeiro terço da gestação.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Ceratoconjuntivite Seca (KCS / Olho Seco Canino)',
          frequency: 'uncommon',
          mechanism:
            'Toxicidade citotóxica acinar direta da sulfonamida e seus metabólitos reativos sobre as glândulas lacrimais associada a resposta inflamatória imunomediada',
          clinicalManagement:
            'Suspender a medicação imediatamente ao primeiro sinal de secreção ocular ou hiperemia; realizar Teste Lacrimal de Schirmer (STT); iniciar lubrificantes oculares e imunomoduladores tópicos (ciclosporina ou tacrolimus). O dano pode ser irreversível se a suspensão for tardia.',
        },
        {
          effect: 'Síndrome de Hipersensibilidade Multissistêmica Tardia Canina',
          frequency: 'uncommon',
          mechanism:
            'Reação imunomediada tipo III e citotóxica desencadeada por haptenos formados pela oxidação hepática microssomal de sulfonamidas em cães sem N-acetilação',
          clinicalManagement:
            'Suspender imediatamente a sulfonamida. Manifesta-se entre 5 e 36 dias (pico ao 12º dia) com febre, dor e inchaço articular (poliartrite asséptica), trombocitopenia e elevação de ALT. Instituir suporte volêmico, analgesia e corticoterapia imunossupressora se severo.',
        },
        {
          effect: 'Hipotireoidismo Farmacológico Reversível',
          frequency: 'common',
          mechanism:
            'Inibição farmacológica direta reversível da tireoperoxidase e da organificação tireoidiana do iodo, com queda de T4/fT4 e elevação de TSH',
          clinicalManagement:
            'Efeito farmacológico benigno que reverte completamente em 1 a 2 semanas após o término da terapia. Não iniciar reposição com levotiroxina.',
        },
        {
          effect: 'Cristalúria, Hematúria e Lesão Renal Tubular Aguda',
          frequency: 'rare',
          mechanism:
            'Precipitação mecânica intra-tubular de cristais insolúveis de sulfonamida em urina altamente concentrada e com pH ácido',
          clinicalManagement:
            'Hidratação volêmica vigorosa com fluidoterapia cristaloide para restabelecer alto fluxo tubular; suspender o medicamento e analisar sedimento urinário.',
        },
        {
          effect: 'Supressão da Medula Óssea (Neutropenia, Agranulocitose, Trombocitopenia)',
          frequency: 'rare',
          mechanism:
            'Efeito antifolato cumulativo inibindo a síntese de DNA nas linhagens hematopoéticas em proliferação ativa associado a citotoxicidade imunomediada',
          clinicalManagement:
            'Realizar hemograma completo em tratamentos prolongados (>7 dias). Suspender o fármaco se houver queda abrupta de granulócitos ou plaquetas. Em superdosagens graves, pode-se administrar ácido folínico (leucovorina).',
        },
        {
          effect: 'Hepatotoxicidade Aguda e Necrose Hepática Idiossincrática',
          frequency: 'rare',
          mechanism:
            'Ataque citotóxico hepático direcionado por metabólitos nitroso gerando hepatite neutrofílica aguda com colestase',
          clinicalManagement:
            'Suspender imediatamente; monitorar enzimas hepáticas e bilirrubina total; fornecer suporte hepático e fluidoterapia.',
        },
        {
          effect: 'Sialorreia Intensa, Náusea e Vômitos em Gatos',
          frequency: 'common',
          mechanism:
            'Estímulo gustativo amargo intenso da trimetoprima na mucosa oral e faríngea felina associado a irritação gástrica direta',
          clinicalManagement:
            'Administrar a suspensão lentamente ou encapsular comprimidos; nunca forçar formulações trituradas na cavidade oral de gatos.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Paciente Canino com Cistite Bacteriana Esporádica',
          recommendedAdjustment: 'Manter rigorosamente 15 mg/kg total q12h por apenas 3 a 5 dias; NÃO estender para 10 a 14 dias',
          physiologicalRationale:
            'O consenso ISCAID UTI comprovou que 3 a 5 dias alcançam cura clínica idêntica a cursos prolongados, minimizando o risco de KCS e hipersensibilidade tardia que ocorrem após o 7º dia.',
        },
        {
          clinicalCondition: 'Disfunção Renal Crônica Moderada (Clearance de Creatinina 30–50 mL/min)',
          recommendedAdjustment: 'Manter a dose unitária de 15 mg/kg total mas estender o intervalo posológico para cada 18 a 24 horas',
          physiologicalRationale:
            'A depuração renal da trimetoprima e sulfonamida livre diminui proporcionalmente à filtração glomerular, prolongando a meia-vida plasmática.',
        },
        {
          clinicalCondition: 'Disfunção Renal Grave (Clearance de Creatinina < 30 mL/min)',
          recommendedAdjustment: 'Reduzir a dose habitual em 50% ou estender o intervalo para q24h; evitar preferencialmente produtos contendo sulfadiazina',
          physiologicalRationale:
            'A sulfadiazina possui alto potencial de cristalização intratubular em nefropatas com baixo débito urinário e acidose metabólica.',
        },
        {
          clinicalCondition: 'Prevenção de Cristalúria em Pacientes com Urina Concentrada',
          recommendedAdjustment: 'Garantir fluidoterapia ou livre acesso à água; NUNCA associar acidificantes urinários',
          physiologicalRationale:
            'Em urina ácida a sulfonamida fica não ionizada e sua solubilidade despenca drasticamente, formando precipitados microcristalinos.',
        },
        {
          clinicalCondition: 'Descontinuação da Terapia (Desmame)',
          recommendedAdjustment: 'Suspender diretamente ao término do período terapêutico prescrito; NÃO realizar desmame gradual',
          physiologicalRationale:
            'Antimicrobianos bactericidas tempo-dependentes nunca devem ser desmamados com doses fracionadas, o que gera subconcentração e seleciona cepas resistentes.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Metotrexato',
          severity: 'major',
          clinicalEffect: 'Aumento severo da toxicidade do metotrexato com risco fatal de pancitopenia e necrose de medula óssea',
          pharmacologicalMechanism:
            'Deslocamento do metotrexato dos sítios de ligação proteica plasmática associado à inibição competitiva da secreção tubular renal e bloqueio aditivo do ácido fólico.',
        },
        {
          drugOrClass: 'Pirimetamina',
          severity: 'major',
          clinicalEffect: 'Potencialização massiva de mielossupressão, anemia megaloblástica e agranulocitose',
          pharmacologicalMechanism:
            'Bloqueio duplo e simultâneo da di-hidrofolato redutase (trimetoprima + pirimetamina) superando a capacidade proliferativa hematopoética do hospedeiro.',
        },
        {
          drugOrClass: 'Espironolactona e Suplementos de Potássio',
          severity: 'major',
          clinicalEffect: 'Risco significativo de retenção de potássio e arritmias cardíacas por hipercalemia severa',
          pharmacologicalMechanism:
            'A trimetoprima inibe farmacologicamente os canais de sódio epiteliais (ENaC) no néfron distal de forma idêntica à amilorida, bloqueando a secreção de K+ que já é poupado pela espironolactona.',
        },
        {
          drugOrClass: 'Warfarina e Anticoagulantes Cumarínicos',
          severity: 'major',
          clinicalEffect: 'Prolongamento acentuado do tempo de protrombina (PT) e INR, predispondo a hemorragias espontâneas',
          pharmacologicalMechanism:
            'Deslocamento da warfarina de proteínas plasmáticas e inibição de seu metabolismo oxidativo dependente do complexo CYP2C.',
        },
        {
          drugOrClass: 'Agentes Acidificantes Urinários (Cloreto de Amônio, DL-Metionina)',
          severity: 'moderate',
          clinicalEffect: 'Formação maciça de cristais e cálculos de sulfonamida na bexiga e rins com obstrução uretral ou tubular',
          pharmacologicalMechanism:
            'A acidificação urinária desloca o equilíbrio da sulfonamida (ácido fraco) para a forma não ionizada, reduzindo drasticamente sua solubilidade aquosa.',
        },
        {
          drugOrClass: 'Anestésicos Locais Derivados do PABA (Procaína, Tetracaína)',
          severity: 'moderate',
          clinicalEffect: 'Antagonismo farmacológico direto com redução da eficácia antimicrobiana da sulfonamida',
          pharmacologicalMechanism:
            'A metabolização hidrolítica desses anestésicos libera ácido para-aminobenzoico (PABA) livre nos tecidos, que compete e reverte o bloqueio da DHPS.',
        },
        {
          drugOrClass: 'Digoxina',
          severity: 'moderate',
          clinicalEffect: 'Aumento das concentrações séricas de digoxina com risco de intoxicação digitálica (bloqueio atrioventricular, êmese)',
          pharmacologicalMechanism:
            'A trimetoprima pode inibir transportadores tubulares renais e glicoproteína-P, diminuindo a excreção renal e tecidual da digoxina.',
        },
        {
          drugOrClass: 'Rifampicina',
          severity: 'moderate',
          clinicalEffect: 'Queda substancial das concentrações plasmáticas da trimetoprima e da sulfonamida com risco de falha terapêutica',
          pharmacologicalMechanism:
            'Potente indução enzimática das vias oxidativas do citocromo P450 e de transportadores microssomais hepáticos.',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-ibatrim-240mg-ml',
        label: 'Ibatrim Oral® 240 mg/mL Solução (IBASA)',
        form: 'liquid',
        route: 'Oral',
        channel: 'veterinary',
        concentrationValue: 240,
        concentrationUnit: 'mg/mL',
        concentrationOptions: [
          {
            id: 'conc-ibatrim-240mg',
            label: '240 mg/mL total (200 mg Sulfadiazina + 40 mg Trimetoprima por mL - Proporção 1:5)',
            concentrationValue: 240,
            concentrationUnit: 'mg/mL',
          },
        ],
        packInfo: 'Frascos gotejadores de 20 mL e 50 mL',
        dropsPerMl: 20,
        scoringInfo: 'Solução oral líquida dosada em seringa graduada ou gotejador (20 gotas/mL = 12 mg/gota total)',
      },
      {
        id: 'pres-bactrim-480mg',
        label: 'Bactrim® / Sulfametoxazol + Trimetoprima 480 mg Comprimidos (Roche / Genéricos)',
        form: 'tablet',
        route: 'Oral',
        channel: 'human_pharmacy',
        concentrationValue: 480,
        concentrationUnit: 'mg',
        concentrationOptions: [
          {
            id: 'conc-bactrim-480mg',
            label: '480 mg total (400 mg Sulfametoxazol + 80 mg Trimetoprima - Proporção 1:5)',
            concentrationValue: 480,
            concentrationUnit: 'mg/comp',
          },
        ],
        packInfo: 'Cartuchos contendo 20 comprimidos sulcados',
        scoringInfo: 'Comprimido birriscado (permite divisão em metades de 240 mg total)',
      },
      {
        id: 'pres-bactrim-f-960mg',
        label: 'Bactrim® F / DS Comprimidos 960 mg (Roche / Genéricos)',
        form: 'tablet',
        route: 'Oral',
        channel: 'human_pharmacy',
        concentrationValue: 960,
        concentrationUnit: 'mg',
        concentrationOptions: [
          {
            id: 'conc-bactrim-f-960mg',
            label: '960 mg total (800 mg Sulfametoxazol + 160 mg Trimetoprima - Dupla Força 1:5)',
            concentrationValue: 960,
            concentrationUnit: 'mg/comp',
          },
        ],
        packInfo: 'Cartuchos contendo 10 ou 20 comprimidos',
        scoringInfo: 'Comprimido sulcado (cada metade = 480 mg total = 400 mg SMX + 80 mg TMP)',
      },
      {
        id: 'pres-bactrim-susp-48mg',
        label: 'Bactrim® Suspensão Oral Pediátrica 48 mg/mL (Roche / Genéricos)',
        form: 'liquid',
        route: 'Oral',
        channel: 'human_pharmacy',
        concentrationValue: 48,
        concentrationUnit: 'mg/mL',
        concentrationOptions: [
          {
            id: 'conc-bactrim-susp-48mg',
            label: '48 mg/mL total (40 mg Sulfametoxazol + 8 mg Trimetoprima por mL = 240 mg/5 mL)',
            concentrationValue: 48,
            concentrationUnit: 'mg/mL',
          },
        ],
        packInfo: 'Frasco de 100 mL com copo dosador graduado',
        scoringInfo: 'Suspensão oral (na dose de 15 mg/kg total, corresponde a exatamente 0,3125 mL/kg)',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-sulfa-tmp-cystitis-short',
        species: 'both',
        indication: 'Cistite Bacteriana Esporádica em Cães e Gatos (Protocolo Curto ISCAID)',
        doseMin: 15,
        doseMax: 15,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com água abundante)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Curso curto de 3 a 5 dias consecutivos',
        clinicalContext:
          'Dose baseada na combinação total (15 mg/kg total = 2,5 mg TMP + 12,5 mg sulfa). Em Ibatrim Oral 240 mg/mL, equivale a exatamente 0,0625 mL/kg por tomada.',
        monitoring: 'Resolução rápida de disúria e polaciúria em 48 a 72h. Livre acesso contínuo à água fresca.',
        calculatorEnabled: true,
        presentationId: 'pres-ibatrim-240mg-ml',
        presentationConcentrationId: 'conc-ibatrim-240mg',
        evidenceLevel: 'Consenso Internacional ISCAID UTI / Ensaio Randomizado Clare 2014 (Nível 1b)',
      },
      {
        id: 'dose-sulfa-tmp-uti-complicated',
        species: 'both',
        indication: 'Infecção Urinária Recorrente / Complicada por Patógeno Suscetível',
        doseMin: 15,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '7 a 14 dias guiados por urocultura e resposta clínica',
        clinicalContext:
          'Utilizar sob confirmação em antibiograma. Se o tratamento ultrapassar 7 dias em cães, realizar STT basal e seriado.',
        monitoring: 'Urinálise, urocultura de controle após término, Teste de Schirmer em tratamentos >7 dias.',
        calculatorEnabled: true,
        presentationId: 'pres-ibatrim-240mg-ml',
        presentationConcentrationId: 'conc-ibatrim-240mg',
        evidenceLevel: 'Diretrizes Especializadas ISCAID',
      },
      {
        id: 'dose-sulfa-tmp-prostatitis',
        species: 'dog',
        indication: 'Prostatite Bacteriana Canina Aguda e Crônica',
        doseMin: 15,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Aguda: 4 semanas; Crônica: 4 a 6 semanas',
        clinicalContext:
          'Penetração estromal e aprisionamento iônico no fluido prostático ácido. Castração cirúrgica recomendada em cães não reprodutores.',
        monitoring: 'Ultrassom prostático seriado, urocultura, STT e hemograma com ALT a cada 2 a 3 semanas.',
        calculatorEnabled: true,
        presentationId: 'pres-ibatrim-240mg-ml',
        presentationConcentrationId: 'conc-ibatrim-240mg',
        evidenceLevel: 'Consenso Internacional ISCAID UTI / Farmacologia Prostática',
      },
      {
        id: 'dose-sulfa-tmp-pyoderma',
        species: 'dog',
        indication: 'Piodermite Bacteriana Canina (Segunda Escolha - Diretriz ISCAID 2025)',
        doseMin: 15,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO com alimento)',
        frequency: '15 mg/kg q12h ou 30 mg/kg q24h',
        duration: 'Superficial: 2 a 3 semanas; Profunda: 3 a 4 semanas até remissão citológica',
        clinicalContext:
          'Reservado para casos onde a terapia tópica e aminopenicilinas falharem ou houver indicação por antibiograma.',
        monitoring: 'Citologia cutânea pré e pós-tratamento, STT e inspeção para sinais de hipersensibilidade tardia.',
        calculatorEnabled: true,
        presentationId: 'pres-bactrim-480mg',
        presentationConcentrationId: 'conc-bactrim-480mg',
        evidenceLevel: 'Consenso Internacional ISCAID 2025',
      },
      {
        id: 'dose-sulfa-tmp-protozoal',
        species: 'both',
        indication: 'Toxoplasmose e Neosporose Clínica em Cães e Gatos',
        doseMin: 15,
        doseMax: 20,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 12 horas (q12h)',
        duration: '4 semanas consecutivas',
        clinicalContext:
          'Opção alternativa à clindamicina. Se associado a pirimetamina em neosporose, monitorar hemograma rigorosamente contra neutropenia.',
        monitoring: 'Hemograma semanal, avaliação neuromuscular e tolerância gastrointestinal.',
        calculatorEnabled: true,
        presentationId: 'pres-ibatrim-240mg-ml',
        presentationConcentrationId: 'conc-ibatrim-240mg',
        evidenceLevel: 'Compêndios Veterinários Padrão Ouro (Plumb e BSAVA)',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Dose 15 mg/kg total q12h)
    practicalWeightTable: {
      standardDoseText:
        'Cálculo baseado na dose padrão internacional de 15 mg/kg da associação TOTAL (2,5 mg/kg de trimetoprima + 12,5 mg/kg de sulfonamida na proporção 1:5), administrada a cada 12 horas por via oral acompanhada de livre acesso à água fresca.',
      headers: [
        'Peso do Paciente (kg)',
        'Dose Total (15 mg/kg)',
        'Ibatrim Oral 240 mg/mL',
        'Bactrim Suspensão 48 mg/mL',
        'Comprimidos de 480 mg*',
      ],
      rows: [
        { weight: '2 kg', totalDose: '30 mg total', col1: '0,125 mL (~3 gotas)', col2: '0,63 mL', col3: 'Impraticável' },
        { weight: '4 kg', totalDose: '60 mg total', col1: '0,25 mL (5 gotas)', col2: '1,25 mL', col3: '1/8 comp (inviável)' },
        { weight: '5 kg', totalDose: '75 mg total', col1: '0,31 mL (~6 gotas)', col2: '1,56 mL', col3: 'Impraticável' },
        { weight: '10 kg', totalDose: '150 mg total', col1: '0,63 mL (~12 gotas)', col2: '3,13 mL', col3: '1/4 comprimido' },
        { weight: '15 kg', totalDose: '225 mg total', col1: '0,94 mL (~19 gotas)', col2: '4,69 mL', col3: '1/2 comprimido' },
        { weight: '20 kg', totalDose: '300 mg total', col1: '1,25 mL (25 gotas)', col2: '6,25 mL', col3: '1/2 a 3/4 comprimido' },
        { weight: '30 kg', totalDose: '450 mg total', col1: '1,88 mL', col2: '9,38 mL', col3: '1 comprimido' },
        { weight: '40 kg', totalDose: '600 mg total', col1: '2,50 mL', col2: '12,50 mL', col3: '1 e 1/4 comprimido' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Dosagem Oral Líquida e Seringa Dosadora',
        concentration: 'Ibatrim Oral 240 mg/mL (200 mg Sulfadiazina + 40 mg Trimetoprima por mL)',
        dropletRatio: '20 gotas por mL no conta-gotas original do frasco (= aproximadamente 12 mg da associação total por gota)',
        practicalRule:
          'Volume por dose (mL) = peso (kg) x 0,0625 mL para a dose de 15 mg/kg total a cada 12 horas | Para a dose de bula de 30 mg/kg total: volume (mL) = peso (kg) x 0,125 mL (= 1 mL para cada 8 kg).',
        note:
          'Priorizar sempre a medição precisa em seringa dosadora graduada em mL (seringa de 1 mL ou 3 mL), reservando a contagem de gotas apenas quando a administração por seringa for inviável.',
      },
    },

    // 10. Texto Modelo de Prescrição Veterinária Pronto
    samplePrescriptionText:
      'USO ORAL\n1. Ibatrim Oral® 240 mg/mL (Sulfadiazina 200 mg/mL + Trimetoprima 40 mg/mL) — Frasco com 20 mL ou 50 mL\n   - Administrar [VOLUME_ML] mL (equivalente a 15 mg/kg da associação total = 2,5 mg/kg de trimetoprima + 12,5 mg/kg de sulfadiazina), por via oral, a cada 12 horas, durante [NUMERO_DIAS: 3 a 5] dias consecutivos.\n   - Instruções ao tutor:\n     a) Agitar vigorosamente o frasco antes de cada tomada e utilizar seringa graduada em mL para medição exata do volume prescrito.\n     b) Manter vasilhas de água limpa e fresca permanentemente acessíveis ao paciente durante todo o tratamento para garantir hidratação contínua e proteger os rins.\n     c) Suspender o medicamento imediatamente e contatar o médico-veterinário se o paciente apresentar: secreção ocular espessa, vermelhidão nos olhos, febre, claudicação (mancar), inchaço no focinho ou perda de apetite persistente.\n   - Observação legal: Este regime corresponde a 15 mg/kg da combinação total respaldado por diretrizes internacionais (ISCAID UTI), podendo diferir da posologia descrita na bula do fabricante.',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas
    clinicalFoundationsData: [
      {
        id: 'cf-ekstrand-2026-canine-pk',
        title: 'Farmacocinética Canina Moderna: Biodisponibilidade de 95% e Rápido Clearance de TMP',
        narrative:
          'O estudo farmacocinético contemporâneo definitivo em cães foi conduzido por Ekstrand et al. (2026, BMC Veterinary Research) em delineamento cruzado IV/VO avaliando TMP-SDZ e TMP-SMX em Beagles saudáveis. O trabalho demonstrou que a biodisponibilidade oral no cão é extraordinariamente elevada, atingindo de 93% a 97% para todos os componentes, confirmando a alta confiabilidade da via enteral. O achado dinâmico mais relevante foi o descompasso de eliminação entre os dois fármacos: a trimetoprima possui taxa de depuração (clearance) plasmática de 0,44 L/kg/h, sendo eliminada quase 9 vezes mais rápido que a sulfadiazina (0,05 L/kg/h) e 17 vezes mais rápido que o sulfametoxazol (0,026 L/kg/h). Isso resulta em meia-vida de 4,2 horas para a TMP versus 7,6 horas para a SDZ e 12,6 horas para o SMX. Como consequência direta, a proporção plasmática fixa inicial de 1:5 decai continuamente ao longo do dia, fundamentando por que o intervalo posológico de duas administrações diárias (q12h) é indispensável para sustentar a eficácia sinérgica tempo-dependente.',
        narrativeHighlights: [
          'biodisponibilidade oral canina de 93% a 97%',
          'clearance de TMP quase 9 vezes maior que o da sulfadiazina',
          'meia-vida de 4,2h para TMP vs 7,6h para SDZ',
          'justificativa farmacocinética para posologia a cada 12 horas',
        ],
        studies: [
          {
            citation: 'Ekstrand C, Löwgren M, Erkas M, et al. BMC Vet Res. 2026;22:336. doi: 10.1186/s12917-026-05604-7. PMID: 42243796.',
            referenceId: 'ref-ekstrand-2026-pk',
            sourceType: 'Ensaio Farmacocinético Cruzado IV/VO em Cães Beagles',
            summaryText:
              'Avaliação farmacocinética cruzada de TMP-SDZ e TMP-SMX em cães Beagles. A biodisponibilidade oral foi de 93-97%. A trimetoprima apresentou clearance de 0,44 L/kg/h e meia-vida de 4,2 h, enquanto a sulfadiazina teve clearance de 0,05 L/kg/h e t1/2 de 7,6 h, e o sulfametoxazol teve clearance de 0,026 L/kg/h e t1/2 de 12,6 h.',
            summaryHighlights: ['biodisponibilidade 93-97%', 'clearance 0,44 vs 0,05 L/kg/h', 't1/2 4,2 h vs 7,6 h'],
            metrics: ['Biodisponibilidade oral: 93% a 97%', 'Vd TMP: 2,67 L/kg vs SDZ: 0,5 L/kg', 'Clearance: 0,44 vs 0,05 L/kg/h'],
            clinicalConclusion:
              'Fornece a base farmacocinética quantitativa moderna no cão, comprovando que a absorção oral é excelente e que a trimetoprima desaparece do plasma mais rápido que a sulfonamida, exigindo intervalo q12h.',
          },
        ],
      },
      {
        id: 'cf-clare-2014-short-duration-cystitis',
        title: 'Cistite Bacteriana Canina: Protocolo Curto de 3 Dias Iguala Tratamento de 10 Dias',
        narrative:
          'A mudança paradigmática no tratamento da cistite bacteriana esporádica canina foi solidificada no ensaio clínico prospectivo randomizado e duplo-mascarado de Clare et al. (2014, Journal of Veterinary Internal Medicine). Trinta e oito cadelas com cistite bacteriana não complicada confirmada clinicamente e por urocultura foram randomizadas para receber TMP-SMX oral (15 mg/kg da associação total a cada 12 horas durante 3 dias) ou cefalexina oral (20 mg/kg a cada 12 horas durante 10 dias). A taxa de cura clínica avaliada logo após o término do tratamento foi de 85% no grupo TMP-SMX versus 72% no grupo da cefalexina, sem qualquer diferença estatisticamente significativa. Na avaliação de longo prazo (>30 dias pós-tratamento), as taxas de cura mantiveram-se estatisticamente indistinguíveis. Esse estudo serviu de base direta para as diretrizes mundiais da ISCAID preconizarem cursos curtos de 3 a 5 dias para cistite esporádica, minimizando a seleção de resistência bacteriana e o risco de toxicidade medicamentosa.',
        narrativeHighlights: [
          '3 dias de TMP-SMX igualaram 10 dias de cefalexina',
          'taxa de cura clínica de 85% com 3 dias de tratamento',
          'base científica para o protocolo curto de 3 a 5 dias da ISCAID UTI',
        ],
        studies: [
          {
            citation: 'Clare S, Hartmann FA, Jooss M, et al. J Vet Intern Med. 2014;28(3):818-826. doi: 10.1111/jvim.12324. PMID: 24673608.',
            referenceId: 'ref-clare-2014-short-uti',
            sourceType: 'Ensaio Clínico Prospectivo Randomizado Duplo-Mascarado em Cadelas',
            summaryText:
              'Comparação direta entre TMP-SMX 15 mg/kg q12h por 3 dias e cefalexina 20 mg/kg q12h por 10 dias em 38 cadelas com cistite bacteriana. A cura clínica inicial foi de 85% (TMP-SMX) vs 72% (cefalexina), demonstrando que tratamentos de 3 dias são altamente eficazes.',
            summaryHighlights: ['85% cura em 3 dias', 'n = 38 cadelas', 'ensaio duplo-mascarado'],
            metrics: ['n = 38 cadelas com cistite', 'Cura clínica: 85% (3 dias) vs 72% (10 dias)', 'p > 0,05'],
            clinicalConclusion:
              'Fundamenta a diretriz contemporânea de utilizar cursos curtos de 3 a 5 dias de sulfonamida potencializada em cistite bacteriana não complicada.',
          },
        ],
      },
      {
        id: 'cf-trepanier-2003-hypersensitivity-syndrome',
        title: 'Síndrome de Hipersensibilidade Tardia Canina: Média de Início ao 12º Dia e Tríade Clínica',
        narrative:
          'A caracterização clínica detalhada das reações adversas imunomediadas a sulfonamidas em cães foi documentada por Trepanier et al. (2003, Journal of Veterinary Internal Medicine) em estudo de coorte multicêntrico analisando 40 cães acometidos. A síndrome manifestou-se tardiamente, com início dos sinais clínicos ocorrendo entre 5 e 36 dias após o início do tratamento (média de 12,1 ± 5,9 dias), explicando por que tratamentos curtos de 3 a 5 dias são muito mais seguros. As principais manifestações foram febre (55%), trombocitopenia (54%), poliartrite asséptica com claudicação e dor (35%), hepatopatia com aumento de ALT (28%) e ceratoconjuntivite seca (15%). Trinta de 39 cães (77%) recuperaram-se completamente com a suspensão do fármaco e cuidados de suporte; contudo, 21% foram eutanasiados ou morreram, e a presença de hepatotoxicidade com necrose correlacionou-se significativamente com pior prognóstico e mortalidade.',
        narrativeHighlights: [
          'manifestação clínica tardia com média de 12,1 dias',
          'tríade clássica: febre (55%), trombocitopenia (54%) e hepatopatia (28%)',
          'hepatotoxicidade esteve correlacionada a menor sobrevida',
          'reforça segurança de cursos curtos inferiores a 7 dias',
        ],
        studies: [
          {
            citation: 'Trepanier LA, Danhof R, Toll J, Watrous D. J Vet Intern Med. 2003;17(5):647-652. doi: 10.1111/j.1939-1676.2003.tb02495.x. PMID: 14529130.',
            referenceId: 'ref-trepanier-2003-hypersensitivity',
            sourceType: 'Estudo Clínico Multicêntrico de Série de Casos em Cães',
            summaryText:
              'Análise de 40 cães com síndrome de hipersensibilidade induzida por sulfonamidas potencializadas. Os sinais surgiram em média após 12 dias de terapia, com predomínio de febre, trombocitopenia e hepatopatia.',
            summaryHighlights: ['40 cães analisados', 'início médio 12 dias', 'febre 55%, trombocitopenia 54%'],
            metrics: ['n = 40 cães', 'Início dos sinais: 12,1 ± 5,9 dias', 'Recuperação: 77% (30/39)'],
            clinicalConclusion:
              'Identifica a janela temporal crítica da hipersensibilidade tardia canina e estabelece os sinais de alerta imediatos para descontinuação da medicação.',
          },
        ],
      },
      {
        id: 'cf-frank-2005-thyroid-suppression',
        title: 'Hipotireoidismo Farmacológico Iatrogênico em Cães: Queda de T4 e Reversão em 2 Semanas',
        narrative:
          'O impacto da terapia com sulfonamidas potencializadas sobre o eixo tireoidiano canino foi comprovado experimentalmente por Frank et al. (2005, American Journal of Veterinary Research). Seis cães saudáveis e eutireoideos receberam TMP-SMX na dose média de 15 mg/kg a cada 12 horas por via oral durante 3 semanas consecutivas. Ao término do período, 5 dos 6 cães (83%) apresentaram concentrações de tiroxina sérica total (T4 total) abaixo dos limites de referência laboratoriais normais, 4 de 6 apresentaram T4 livre reduzida e 4 de 6 apresentaram elevação compensatória do hormônio tireoestimulante (cTSH), mimetizando o perfil laboratorial completo de um hipotireoidismo primário clínico. Após a interrupção do fármaco, as concentrações de T4 total e livre normalizaram-se completamente dentro de 1 semana, e os níveis de TSH retornaram à normalidade em 2 semanas. Esse achado alerta os clínicos a nunca diagnosticar hipotireoidismo nem introduzir reposição hormonal em cães recebendo sulfonamidas.',
        narrativeHighlights: [
          'TMP-SMX induziu queda de T4 total em 83% dos cães em 3 semanas',
          'elevação simultânea de TSH caracterizando padrão de hipotireoidismo',
          'reversão completa em 1 a 2 semanas após a suspensão do antimicrobiano',
        ],
        studies: [
          {
            citation: 'Frank LA, Hnilica KA, May ER, et al. Am J Vet Res. 2005;66(2):256-259. doi: 10.2460/ajvr.2005.66.256. PMID: 15757124.',
            referenceId: 'ref-frank-2005-thyroid',
            sourceType: 'Ensaio Clínico Experimental Prospectivo em Cães Eutireoideos',
            summaryText:
              'Investigação dos efeitos de TMP-SMX (15 mg/kg q12h por 3 semanas) sobre o perfil tireoidiano de 6 cães. Demonstrou supressão marcante de T4 e T4 livre com aumento de TSH, com reversão espontânea total em 14 dias pós-término.',
            summaryHighlights: ['queda de T4 em 5/6 cães', 'elevação de TSH', 'reversão completa em 2 semanas'],
            metrics: ['n = 6 cães eutireoideos', 'Supressão hormonal aos 21 dias', 'Reversão total em 7 a 14 dias'],
            clinicalConclusion:
              'Comprova o hipotireoidismo farmacológico reversível induzido por sulfonamidas e proíbe a dosagem diagnóstica tireoidiana durante o curso terapêutico.',
          },
        ],
      },
      {
        id: 'cf-ekstrand-2026-systematic-review-vetcompass',
        title: 'Segurança Global em 4.200 Pequenos Animais e Prevalência Real de KCS (1,8%)',
        narrative:
          'A dimensão epidemiológica contemporânea dos riscos de sulfonamidas potencializadas foi sintetizada na ampla revisão sistemática e metanálise de Ekstrand et al. (2026, Veterinary Research Communications), que compilou dados de mais de 4.200 cães e gatos distribuídos em 110 estudos internacionais. Em cães, a taxa agregada de eventos adversos leves foi de aproximadamente 2,3%, enquanto a incidência de eventos graves foi de apenas 0,2%, comprovando que o fármaco é seguro para a imensa maioria dos pacientes, mas exige vigilância pelas repercussões de suas reações idiossincráticas. Quanto à ceratoconjuntivite seca (KCS), frequentemente citada na literatura histórica com números inflados de até 15%, o estudo de base populacional VetCompass (2026, Journal of Veterinary Internal Medicine) avaliando 2.243 cães expostos encontrou uma prevalência combinada real de KCS de 1,8% (IC 95%: 1,3% a 2,5%), demonstrando que o risco existe e demanda monitoramento com Teste de Schirmer em cursos >7 dias, mas não deve inviabilizar o uso do fármaco quando clinicamente indicado.',
        narrativeHighlights: [
          'metanálise de 4.200 cães e gatos em 110 estudos',
          'eventos leves em 2,3% e eventos graves em 0,2% dos cães',
          'prevalência populacional de KCS de 1,8% (VetCompass 2026)',
          'tratamentos superiores a 7 dias concentram o maior risco',
        ],
        studies: [
          {
            citation: 'Ekstrand C, Hedlund M, Pelander L, Scahill K. Vet Res Commun. 2026;50:224. doi: 10.1007/s11259-026-11143-1. PMID: 41880081.',
            referenceId: 'ref-ekstrand-2026-systematic-review',
            sourceType: 'Revisão Sistemática e Metanálise de Segurança Farmacológica em Cães e Gatos',
            summaryText:
              'Revisão sistemática reunindo mais de 4.200 pequenos animais em 110 estudos clínicos. A taxa de reações adversas leves no cão foi de 2,3% e a de reações graves foi de 0,2%, com concentração expressiva de eventos em tratamentos superiores a 7 dias.',
            summaryHighlights: ['4.200 animais avaliados', 'eventos leves 2,3%', 'eventos graves 0,2%'],
            metrics: ['110 estudos analisados', 'n > 4.200 cães e gatos', 'Eventos graves: 0,2%'],
            clinicalConclusion:
              'Oferece a melhor estimativa contemporânea de segurança em pequenos animais, demonstrando que o fármaco é globalmente bem tolerado quando respeitados a dose total e a duração curta.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-plumbs-10th-sulfa-tmp',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Sulfa-/Trimethoprim monograph, pp. 1193-1196 (PDF pp. 1220-1224). Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-sulfa-tmp',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Trimethoprim/Sulphonamide monograph, pp. 418-420 (PDF pp. 434-436). British Small Animal Veterinary Association; 2020.',
        sourceType: 'Formulário Clínico Internacional BSAVA',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-ekstrand-2026-pk',
        citationText:
          'Ekstrand C, Löwgren M, Erkas M, et al. Comparative pharmacokinetics of trimethoprim-sulfadiazine and trimethoprim-sulfamethoxazole in dogs. BMC Vet Res. 2026;22:336. doi: 10.1186/s12917-026-05604-7. PMID: 42243796.',
        sourceType: 'Estudo Farmacocinético Canino Crossover Contemporâneo',
        url: 'https://pubmed.ncbi.nlm.nih.gov/42243796/',
        evidenceLevel: 'Nível 1b (Farmacocinética Padrão Ouro Canina 2026)',
      },
      {
        id: 'ref-clare-2014-short-uti',
        citationText:
          'Clare S, Hartmann FA, Jooss M, Bachar E, Wong YY, Trepanier LA, Viviano KR. Short- and long-term cure rates of short-duration trimethoprim-sulfamethoxazole treatment in female dogs with uncomplicated bacterial cystitis. J Vet Intern Med. 2014;28(3):818-826. doi: 10.1111/jvim.12324. PMID: 24673608.',
        sourceType: 'Ensaio Clínico Prospectivo Randomizado Duplo-Mascarado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24673608/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado Mascarado)',
      },
      {
        id: 'ref-trepanier-2003-hypersensitivity',
        citationText:
          'Trepanier LA, Danhof R, Toll J, Watrous D. Clinical findings in 40 dogs with hypersensitivity associated with administration of potentiated sulfonamides. J Vet Intern Med. 2003;17(5):647-652. doi: 10.1111/j.1939-1676.2003.tb02495.x. PMID: 14529130.',
        sourceType: 'Estudo Clínico Multicêntrico de Série de Casos em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/14529130/',
        evidenceLevel: 'Nível 2b (Estudo Multicêntrico de Farmacovigilância)',
      },
      {
        id: 'ref-frank-2005-thyroid',
        citationText:
          'Frank LA, Hnilica KA, May ER, Sargent SJ, Davis JA. Effects of sulfamethoxazole-trimethoprim on thyroid function in dogs. Am J Vet Res. 2005;66(2):256-259. doi: 10.2460/ajvr.2005.66.256. PMID: 15757124.',
        sourceType: 'Ensaio Clínico Experimental Prospectivo Canino',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15757124/',
        evidenceLevel: 'Nível 1b (Ensaio Experimental Controlado)',
      },
      {
        id: 'ref-ekstrand-2026-systematic-review',
        citationText:
          'Ekstrand C, Hedlund M, Pelander L, Scahill K. Adverse events of trimethoprim-sulphonamide treatment of cats and dogs: a systematic review. Vet Res Commun. 2026;50:224. doi: 10.1007/s11259-026-11143-1. PMID: 41880081.',
        sourceType: 'Revisão Sistemática e Metanálise em Pequenos Animais',
        url: 'https://link.springer.com/article/10.1007/s11259-026-11143-1',
        evidenceLevel: 'Nível 1a (Revisão Sistemática e Metanálise 2026)',
      },
      {
        id: 'ref-vetcompass-2026-kcs',
        citationText:
          'O’Neill DG, et al. Epidemiology of keratoconjunctivitis sicca in dogs receiving potentiated sulfonamides: a VetCompass study of 2,243 dogs. J Vet Intern Med. 2026;40(1):aalaf013. doi: 10.1111/jvim.17120.',
        sourceType: 'Estudo Epidemiológico Populacional VetCompass',
        url: 'https://academic.oup.com/jvim/article/40/1/aalaf013/8429714',
        evidenceLevel: 'Nível 2b (Estudo de Coorte Populacional de 2.243 Cães)',
      },
      {
        id: 'ref-iscaid-uti-2019',
        citationText:
          'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. doi: 10.1016/j.tvjl.2019.02.008.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID Urologia',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
        evidenceLevel: 'Consenso Internacional Padrão Ouro ISCAID UTI',
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
        id: 'ref-ibasa-ibatrim-bula',
        citationText:
          'IBASA Indústria Farmacêutica. Ibatrim Oral® Solução Veterinária (Sulfadiazina 200 mg/mL + Trimetoprima 40 mg/mL) — Bula técnica oficial e registro no MAPA sob nº 5.123.',
        sourceType: 'Bula Oficial do Fabricante / Registro MAPA',
        url: 'https://www.ibasa.com.br/ibatrim-antibacteriano-ibasa-caes-gatos-50ml',
        evidenceLevel: 'Registro Oficial Regulatório MAPA',
      },
    ],

    genericBrandsNote:
      'A apresentação veterinária clássica comercializada no Brasil é o Ibatrim Oral® (IBASA), composto por Sulfadiazina 200 mg/mL + Trimetoprima 40 mg/mL, totalizando 240 mg/mL da associação na proporção padrão de 1:5. Apresentações de uso humano de sulfametoxazol + trimetoprima (como o Bactrim® da Roche e seus equivalentes genéricos) são encontradas na forma de comprimidos de 480 mg (400 mg SMX + 80 mg TMP), comprimidos de 960 mg (800 mg SMX + 160 mg TMP) e suspensão pediátrica de 48 mg/mL (40 mg SMX + 8 mg TMP por mL). Todas as dosagens clínicas de compêndios internacionais devem ser calculadas com base na soma dos miligramas da associação total.',

    // 13. Avisos Clínicos Importantes Específicos (Banner de Destaque)
    clinicalWarningItems: [
      {
        label: 'Dose da Associação Total (1:5):',
        text: 'A dose prescrita em compêndios (Plumb, BSAVA, ISCAID) refere-se SEMPRE ao total da associação na proporção 1:5. A dose padrão de 15 mg/kg total = 2,5 mg/kg de TMP + 12,5 mg/kg de sulfonamida (0,0625 mL/kg de Ibatrim Oral q12h). Nunca calcular 15 mg/kg para cada princípio ativo separadamente.',
      },
      {
        label: 'Ceratoconjuntivite Seca (KCS) & Teste de Schirmer:',
        text: 'Sulfonamidas causam toxicidade acinar lacrimal e KCS em cães (~1,8% no estudo VetCompass 2026). Em tratamentos caninos com duração superior a 7 dias, é mandatório realizar Teste Lacrimal de Schirmer (STT) basal e seriado. Se houver olho seco ou secreção, suspender a droga imediatamente (risco de lesão irreversível).',
      },
      {
        label: 'Hipersensibilidade Tardia e Hipotireoidismo:',
        text: 'Cães não acetilam sulfonamidas e formam metabólitos reativos que causam síndrome imunomediada tardia (febre, poliartrite, trombocitopenia e hepatite por volta do 12º dia, especialmente em Doberman e Samoieda). Além disso, o fármaco inibe a tireoide, reduzindo T4 e elevando TSH reversivelmente; não diagnosticar hipotireoidismo durante o tratamento.',
      },
    ],

    relatedDiseaseSlugs: ['doencas-trato-urinario-inferior-felino-dtuif', 'prostatite-caes-gatos'],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const sulfametoxazolTrimetoprimaMedicationRecord = sulfametoxazolTrimetoprimaMedicationsSeed[0];
