import type { MedicationRecord } from '../../types/medication';

export const hidroxidoDeAluminioMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-hidroxido-de-aluminio',
    slug: 'hidroxido-de-aluminio',
    title: 'Hidróxido de Alumínio',
    activeIngredient: 'Hidróxido de Alumínio USP [Al(OH)₃]',
    pharmacologicClass:
      'Quelante e ligante intestinal de fósforo inorgânico; antiácido gástrico neutralizante local',
    species: ['dog', 'cat'],
    category: 'nefrologia-urologia',
    tags: [
      'Hidróxido de Alumínio',
      'Quelante de Fósforo',
      'Ligante Intestinal',
      'Doença Renal Crônica',
      'Hiperfosfatemia',
      'FGF23',
      'IRIS 2026',
      'Alumínio Sérico',
      'Antiácido',
      'Uremia',
      'Constipação',
    ],
    tradeNames: [
      'Hidróxido de Alumínio Gel Seco USP Pó Puro (Manipulação Magistral Veterinária Oficial)',
      'Hidróxido de Alumínio Suspensão Oral 60 mg/mL (6%) (Medley / EMS / Neo Química — Farmácia Humana)',
      'Hidróxido de Alumínio Suspensão Oral 61,5 mg/mL (Genéricos Humanos)',
      'Amphojel® / Alu-Tab® / Alucap® (Marcas de Referência Históricas Internacionais)',
    ],
    officialSiteUrl: 'https://www.iris-kidney.com/iris-guidelines-1',
    leafletUrl: 'https://terminologia.saude.gov.br/fhir/ValueSet-BRAlergenos.html',
    mechanismOfAction:
      'O hidróxido de alumínio é um composto inorgânico insolúvel e anfótero que atua primariamente no lúmen gastrointestinal através da quelação química direta do fósforo alimentar. No ambiente gástrico ácido, o Al(OH)₃ reage com os íons hidrogênio (H+), liberando espécies catiônicas ativas de alumínio trivalente (Al³⁺). No intestino delgado, o Al³⁺ liga-se com altíssima afinidade aos ânions fosfato inorgânicos e fosfatos liberados pela digestão da dieta, formando complexos de fosfato de alumínio (AlPO₄) extremamente insolúveis e não absorvíveis. Esses complexos estáveis atravessam todo o trato entérico e são eliminados passivamente nas fezes. Como consequência direta, a absorção líquida de fósforo da refeição para a circulação sistêmica é suprimida, reduzindo a sobrecarga fosfórica sobre os néfrons remanescentes e atenuando o estímulo fisiopatológico contínuo sobre o eixo FGF23-calcitriol-PTH (hiperparatireoidismo secundário renal). Como antiácido secundário de curta duração (30 a 60 minutos), consome H⁺ gástrico formando cloreto de alumínio e água, elevando temporariamente o pH do suco gástrico.',
    plainLanguageSummary:
      'Medicamento inorgânico utilizado em cães e gatos com Doença Renal Crônica (DRC) que apresentam excesso de fósforo no sangue (hiperfosfatemia). Ele age dentro do intestino como um ímã: agarra o fósforo da comida e forma um composto que o corpo não consegue absorver, sendo eliminado nas fezes. PONTOS CRÍTICOS DE PLANTÃO: 1) DEVE SER DADO SEMPRE JUNTO COM A COMIDA: Não adianta administrar em jejum; o medicamento precisa estar em contato físico com o alimento na hora da digestão. Divida a dose diária entre todas as refeições do dia. 2) DIETA RENAL PRIMEIRO: O primeiro passo é sempre a ração terapêutica renal com restrição de fósforo; o hidróxido de alumínio só deve entrar se o fósforo continuar acima da meta estipulada pelo IRIS após 4 a 6 semanas de dieta. 3) TOXICIDADE POR ALUMÍNIO EXISTE EM CÃES E GATOS (Sheffler et al., 2025; Segev et al., 2008): O alumínio absorvido só sai pelo rim doente. Doses exageradas crônicas causam intoxicação com fraqueza muscular, tremores, contrações involuntárias (mioclonia) e diminuição do tamanho dos glóbulos vermelhos (microcitose). 4) NUNCA ASSOCIAR COM CITRATO DE POTÁSSIO: O citrato aumenta a absorção do alumínio e acelera a intoxicação. 5) SEPARAR POR 2 HORAS: O alumínio gruda e anula outros remédios (como enrofloxacina, doxiciclina, ferro e gabapentina).',

    indications: [
      'Hiperfosfatemia persistente em cães e gatos com Doença Renal Crônica (estágios IRIS 2, 3 e 4) não controlada exclusivamente pela dieta terapêutica renal.',
      'Atenuação da progressão do hiperparatireoidismo secundário renal e do distúrbio mineral e ósseo da DRC (CKD-MBD).',
      'Controle do fósforo sérico em nefropatas com elevação precoce de FGF23 mesmo com fosfatemia nos limites superiores da normalidade.',
      'Quelante intestinal adjuvante em protocolos de transição dietética ou em pacientes com recusa parcial de rações renais exclusivas.',
      'Antiácido estomacal secundário de curta ação para alívio temporário de desconforto gástrico hiperácido (ação restrita a 30-60 min; não substitui prazóis).',
    ],

    contraindications: [
      'Hipersensibilidade conhecida a sais ou hidróxidos inorgânicos de alumínio.',
      'Associação concomitante deliberada com citrato de potássio ou agentes acidificantes/alcalinizantes à base de citrato (o citrato solubiliza o alumínio e multiplica sua absorção sistêmica, deflagrando toxicidade grave).',
      'Hipofosfatemia preexistente ou fósforo sérico abaixo de 2,7 mg/dL (risco de fraqueza muscular, hemólise e esgotamento de ATP celular).',
      'Constipação grave refratária, obstipação, fecaloma retido ou megacólon funcional/orgânico.',
      'Obstrução mecânica da saída gástrica ou estenose pilórica severa (o alumínio retarda o esvaziamento gastroduodenal).',
      'Monoterapia de resgate em hiperfosfatemia aguda grave descompensada (o fármaco apenas impede nova absorção entérica; não remove fósforo já circulante).',
    ],

    cautions: [
      'Administração rigorosamente simultânea à alimentação: a dose total diária deve ser dividida e homogeneizada em cada porção de alimento oferecida ao longo do dia.',
      'Vigilância ativa para intoxicação crônica por alumínio: monitorar o paciente para surgimento de tremores, mioclonia, fraqueza progressiva de membros pélvicos, ataxia ou queda persistente do VCM (microcitose eritrocitária).',
      'Titulação orientada por metas laboratoriais IRIS 2026: reavaliar cálcio total, cálcio ionizado e fósforo sérico (após jejum de 12 horas) a cada 4 a 6 semanas até a estabilização, e a cada 12 semanas na fase de manutenção.',
      'Separação posológica de pelo menos 2 horas: manter intervalo estrito de 2 horas entre o hidróxido de alumínio e outros fármacos orais (tetraciclinas, fluoroquinolonas, gabapentina, ferro, levotiroxina, micofenolato e bloqueadores H2).',
      'Prevenção e manejo da constipação em gatos renais: o alumínio diminui o trânsito intestinal; se ocorrer ressecamento fecal acentuado, associar fluidoterapia e laxativos osmóticos (como PEG 3350 ou lactulose).',
      'Palatabilidade e aceitação da dieta: formulações humanas líquidas com saborizantes (menta) provocam aversão alimentar em felinos; preferir o pó seco USP puro sem sabor misturado ao sachê úmido.',
    ],

    adverseEffects: [
      'Constipação intestinal moderada a severa (efeito adverso mais frequente, decorrente da redução da motilidade gastrointestinal e ressecamento das fezes pelo alumínio).',
      'Intoxicação sistêmica crônica por alumínio em cães e gatos (tremores, mioclonia de membros torácicos e pélvicos, fraqueza muscular, ataxia e encefalopatia urêmica/alumínica).',
      'Alterações hematológicas com microcitose progressiva (queda do VCM sem deficiência primária de ferro por interferência do alumínio na incorporação do ferro e maturação da hemoglobina).',
      'Hipofosfatemia iatrogênica por superdosagem do ligante (fósforo < 2,7 mg/dL, com esgotamento energético de ATP, fraqueza, letargia e risco de lise eritrocitária).',
      'Doença óssea adinâmica e osteomalácia crônica (deposição de alumínio na frente de mineralização óssea somada à hipofosfatemia e supressão excessiva do PTH).',
      'Aversão alimentar condicionada em gatos quando administrado em suspensões aromatizadas com menta misturadas na ração renal.',
      'Formação de bezoares ou agregados insolúveis de alumínio no trato digestório superior em pacientes com esvaziamento gástrico retardado.',
    ],

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Capturar antes de Absorver',
        icon: 'Lock',
        desc: 'Atua exclusivamente no lúmen intestinal, ligando-se ao fosfato dietético e formando complexos insolúveis de AlPO₄ eliminados nas fezes antes de ingressarem na circulação.',
      },
      {
        title: 'Refeição é Parte do Mecanismo',
        icon: 'Clock',
        desc: 'Exige contato físico simultâneo com o bolo alimentar digerido; a dose diária deve ser obrigatoriamente fracionada e misturada a cada refeição fornecida.',
      },
      {
        title: 'Titulação por Metas IRIS 2026',
        icon: 'Shield',
        desc: 'Dose ajustada dinamicamente conforme os alvos séricos de fósforo do estadiamento IRIS (<4,5 mg/dL no IRIS 2; <5,0 no IRIS 3; <6,0 no IRIS 4), evitando hipofosfatemia.',
      },
      {
        title: 'Alumínio Não é Inerte',
        icon: 'TriangleAlert',
        desc: 'Pequena fração absorvida não é excretada pelo rim insuficiente; doses elevadas crônicas geram neurotoxicidade documentada em cães e gatos (Sheffler 2025; Segev 2008).',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Hiperfosfatemia Crônica na DRC (Cães e Gatos — Diretrizes IRIS 2026)',
        species: 'both',
        doseSummary: '30 a 60 mg/kg/dia VO (inicial), dividida igualmente entre todas as refeições diárias',
        route: 'Oral (VO homogeneizado completamente no alimento úmido)',
        duration: 'Uso contínuo enquanto o fósforo persistir acima da meta; monitorar a cada 4 a 6 semanas',
        clinicalContext:
          'Instituir somente após 4 a 6 semanas de dieta renal restrita em fósforo se os níveis séricos permanecerem acima dos alvos IRIS. Titular até 90 a 100 mg/kg/dia se necessário.',
      },
      {
        condition: 'Hiperfosfatemia com Fósforo no Limite Superior e FGF23 Elevado em Gatos',
        species: 'cat',
        doseSummary: '30 mg/kg/dia VO misturada à dieta renal fracionada',
        route: 'Oral (VO)',
        duration: 'Contínuo com reavaliações periódicas de cálcio, fósforo e creatinina',
        clinicalContext:
          'O biomarcador FGF23 identifica retenção precoce de fósforo em gatos IRIS 2 mesmo com fosfatemia aparentemente normal, justificando introdução de baixas doses do ligante.',
      },
      {
        condition: 'Antiácido Local Adjuvante de Ação Rápida (Uso Ocasional)',
        species: 'both',
        doseSummary: '10 a 30 mg/kg VO a cada 6 a 8 horas (ou 0,5 a 1,0 mL/kg de suspensão a 6%)',
        route: 'Oral (VO)',
        duration: 'Tratamento de curto prazo (alívio imediato pontual)',
        clinicalContext:
          'Ação restrita a 30-60 minutos; o consenso ACVIM não recomenda o hidróxido de alumínio como terapia de rotina para úlceras ou refluxo, devendo-se priorizar inibidores da bomba de prótons.',
      },
    ],

    // 3. Indicações Clínicas Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-aloh-ckd-hyperphosphatemia',
        indication: 'Hiperfosfatemia Crônica na Doença Renal Crônica em Cães e Gatos (Diretrizes IRIS 2026)',
        clinicalContext:
          'Na Doença Renal Crônica, a perda progressiva de néfrons funcionantes compromete a filtração glomerular do fósforo. Nos estágios iniciais, a secreção de FGF23 pelos osteócitos e de PTH pelas paratireoides eleva a excreção fracionária de fósforo nos néfrons remanescentes à custa da supressão do calcitriol e instalação do distúrbio mineral e ósseo (CKD-MBD). Conforme a doença avança, esse mecanismo compensatório falha e a hiperfosfatemia manifesta-se, acelerando a mineralização distrófica do parênquima renal e encurtando a sobrevida. O primeiro passo inegociável é a prescrição de dieta renal veterinária com restrição estrita de fósforo (Barber et al., 1999). Se após 4 a 6 semanas de adesão dietética rigorosa o fósforo permanecer acima das metas IRIS 2026 (IRIS 2: <4,5 mg/dL; IRIS 3: <5,0 mg/dL; IRIS 4: <6,0 mg/dL), o hidróxido de alumínio deve ser introduzido na dose inicial de 30 a 60 mg/kg/dia, dividida entre todas as refeições. A dose é titulada progressivamente a cada 4 a 6 semanas com base no fósforo de jejum, com teto usual de 100 mg/kg/dia para prevenir intoxicação por alumínio.',
        species: 'both',
        dose: '30 a 60 mg/kg/dia VO (inicial), podendo titular até 90 a 100 mg/kg/dia; dividir entre as refeições',
        route: 'Oral (VO misturado ao alimento úmido)',
        frequency: 'Dividida em 2 a 4 tomadas (conforme o número de refeições do animal)',
        duration: 'Terapia contínua de longo prazo ajustada pela resposta laboratorial',
        mechanismOfAction:
          'Quimiosorção intraluminal: Al³⁺ reage com o fosfato dietético formando complexos insolúveis de AlPO₄ eliminados nas fezes, bloqueando a absorção entérica.',
        clinicalRationale:
          'Reduz a carga fosfórica sistêmica, suprime o hiperparatireoidismo secundário renal e retarda o declínio da taxa de filtração glomerular.',
        monitoring: 'Dosagem de fósforo sérico (após jejum de 12 horas) e cálcio a cada 4 a 6 semanas na titulação e a cada 12 semanas na estabilização; hemograma para MCV e exame neurológico.',
        referenceIds: ['ref-iris-guidelines-2026', 'ref-plumbs-10th-aloh', 'ref-bsava-10th-aloh'],
        evidenceLevel: 'Diretrizes Clínicas Especializadas IRIS 2026 / Plumb Padrão Ouro',
      },
      {
        id: 'ind-aloh-early-ckd-fgf23',
        indication: 'Controle Mineral Precoce Guiado por FGF23 em Felinos (Estágio IRIS 2)',
        clinicalContext:
          'Em gatos com DRC estágio 2, as concentrações plasmáticas de fósforo frequentemente situam-se na faixa aparentemente normal do laboratório (ex.: 4,2 a 4,5 mg/dL), mas o fator de crescimento de fibroblastos 23 (FGF23) já se encontra maciçamente elevado, sinalizando retenção fosfórica celular e esgotamento renal precoce. A dosagem de FGF23 permite identificar felinos que se beneficiam da introdução antecipada do quelante de fósforo associado à dieta renal, prevenindo a hipertrofia paratireoidiana. A dose inicial recomendada é de 30 mg/kg/dia dividida nas refeições, titulando para manter o FGF23 abaixo de 300 pg/mL e o fósforo sérico estritamente abaixo de 4,5 mg/dL, respeitando o limite inferior de segurança de 2,7 mg/dL.',
        species: 'cat',
        dose: '30 mg/kg/dia VO dividida entre as refeições diárias',
        route: 'Oral (VO homogeneizado em pó seco USP no sachê úmido)',
        frequency: 'A cada 8 ou 12 horas (acompanhando o alimento)',
        duration: 'Contínua sob monitoramento bioquímico',
        mechanismOfAction:
          'Bloqueio luminal da absorção residual de fosfato, aliviando a sinalização de FGF23 nos osteócitos e preservando os níveis de calcitriol.',
        clinicalRationale:
          'Intervenção preventiva no estágio inicial para evitar a cascata de calcificação de tecidos moles e perda nefronal acelerada.',
        monitoring: 'Fósforo sérico de jejum, cálcio total e ionizado, creatinina, ureia e FGF23 a cada 6 a 8 semanas.',
        referenceIds: ['ref-iris-guidelines-2026', 'ref-beita-2024-ajvr'],
        evidenceLevel: 'Consenso Internacional IRIS 2026 / Ensaio Randomizado Beita 2024',
      },
      {
        id: 'ind-aloh-antacid-short-acting',
        indication: 'Neutralização Ácida Gástrica Local Adjuvante (Uso Ocasional de Curta Ação)',
        clinicalContext:
          'O hidróxido de alumínio possui histórico de uso como antiácido de contato. Quando ingerido, os íons hidroxila reagem instantaneamente com o ácido clorídrico gástrico, elevando o pH intragástrico e inativando a pepsina em pH > 4, além de estimular a secreção local de muco e bicarbonato citoprotetor. Contudo, o Consenso ACVIM sobre Protetores Gastrointestinais (Marks et al., 2018) concluiu que o efeito neutralizante dos antiácidos orais tem duração extremamente curta (apenas 30 a 60 minutos), exigindo administrações excessivamente frequentes (a cada 4 a 6 horas) que são impraticáveis e predispõem à constipação e interações farmacológicas. Portanto, o Al(OH)₃ NÃO é recomendado como gastroprotetor de escolha para esofagite de refluxo ou úlceras gastroduodenais em pequenos animais, devendo-se prescrever inibidores da bomba de prótons (omeprazol). Seu uso atual como antiácido restringe-se a situações de alívio pontual temporário.',
        species: 'both',
        dose: '10 a 30 mg/kg VO a cada 6 a 8 horas (ou 0,5 a 1,0 mL/kg de suspensão a 6%)',
        route: 'Oral (VO)',
        frequency: 'A cada 6 a 8 horas (conforme tolerância e necessidade pontual)',
        duration: 'Uso pontual de curta duração (1 a 3 dias)',
        mechanismOfAction:
          'Reação estequiométrica com o HCl gástrico [Al(OH)₃ + 3HCl -> AlCl₃ + 3H₂O], neutralizando temporariamente o ácido já secretado no estômago.',
        clinicalRationale:
          'Alívio sintomático rápido de hiperacidez estomacal, mas com eficácia e duração substancialmente inferiores aos supressores ácidos modernos.',
        monitoring: 'Alívio de náuseas e regurgitação; monitorar presença de constipação fecal.',
        referenceIds: ['ref-marks-2018-acvim', 'ref-bsava-10th-aloh'],
        evidenceLevel: 'Consenso ACVIM Gastroprotetores 2018 / Formulário BSAVA',
      },
    ],

    // 4. Farmacocinética Clínica Comparada
    pharmacokineticsData: {
      absorption:
        'O hidróxido de alumínio é um composto inorgânico praticamente insolúvel em água que não foi desenhado para absorção sistêmica. Seu objetivo farmacodinâmico é atuar estritamente no lúmen gastrointestinal. A biodisponibilidade oral convencional do Al(OH)₃ é praticamente nula. No entanto, no ambiente ácido do estômago e duodeno proximal, uma pequena fração do sal sofre solubilização liberando íons Al³⁺ livres, dos quais uma quantidade minoritária (menos de 0,1% a 1% da dose ingerida) é absorvida passivamente por via paracelular entérica. Embora insignificante em animais sadios, essa absorção adquire relevância clínica crítica no paciente com Doença Renal Crônica: o uso contínuo de 30 a 100 mg/kg/dia por meses ou anos resulta em sobrecarga cumulativa contínua. Em estudo recente de farmacovigilância felina, Sheffler et al. (2025) demonstraram que gatos com DRC recebendo hidróxido de alumínio apresentaram concentrações séricas de alumínio significativamente mais elevadas do que gatos com DRC não expostos ao fármaco (média de 69 ng/mL vs 29 ng/mL; p = 0,0034), confirmando a ocorrência de absorção sistêmica crônica em felinos.',
      distribution:
        'A molécula intacta de Al(OH)₃ não circula na corrente sanguínea. A ínfima fração de alumínio que consegue atravessar a barreira intestinal circula no plasma predominantemente ligada à transferrina (ocupando os mesmos sítios de transporte do ferro) e a pequenos ânions plasmáticos como o citrato. Em pacientes com depuração renal preservada, esse alumínio é rapidamente filtrado; contudo, na falência renal crônica, ocorre retenção tecidual progressiva. O alumínio acumulado deposita-se preferencialmente na frente de calcificação óssea (entre a matriz osteoide não mineralizada e o osso trabecular calcificado), no córtex cerebral e núcleos da base do sistema nervoso central, no fígado e no baço. No osso, o metal impede a deposição e incorporação de cálcio e fosfato na hidroxiapatita, inibindo a atividade dos osteoblastos e deflagrando osteomalácia e doença óssea adinâmica. No tecido cerebral, induz estresse oxidativo neuronal e disfunção sináptica.',
      metabolism:
        'O hidróxido de alumínio não passa por nenhuma etapa de metabolização enzimática hepática. Não é substrato, indutor ou inibidor de isoenzimas do citocromo P450 (CYP1A, CYP2C, CYP3A) e não depende de conjugação por glicuroniltransferase ou sulfotransferases. A deficiência fisiológica felina de glucuronidação é completamente irrelevante para este fármaco. Suas transformações resumem-se a reações químicas inorgânicas dependentes do pH intraluminal digestório (dissolução ácida e precipitação alcalina com ânions fosfato).',
      elimination:
        'A depuração corporal total segue dois caminhos inteiramente distintos conforme o destino da fração administrada: 1) Mais de 99% da dose ingerida permanece no tubo digestório ligada ao fosfato sob a forma insolúvel de AlPO₄ e Al(OH)₃ não dissolvido, sendo excretada integralmente pelas fezes. Essa é a via de eliminação primária e desejada. 2) A fração minoritária de alumínio que sofre absorção sistêmica depende exclusivamente da filtração glomerular renal para ser depurada do organismo. Em animais com Doença Renal Crônica avançada, a redução drástica do ritmo de filtração glomerular bloqueia a eliminação do alumínio absorvido, transformando o fármaco em uma substância de retenção e depósito tecidual contínuo. A meia-vida de eliminação do alumínio tecidual ósseo e cerebral após retenção crônica é de semanas a meses, caindo lentamente apenas após a suspensão completa da fonte exógena.',
      cnsPenetration:
        'O fármaco Al(OH)₃ não penetra o sistema nervoso central. Contudo, o alumínio iônico absorvido cronicamente ultrapassa lentamente a barreira hematoencefálica acoplado à transferrina, acumulando-se no parênquima cerebral em nefropatas e provocando neurotoxicidade com tremores, mioclonia e encefalopatia.',
      plasmaBinding:
        'Não aplicável à molécula de Al(OH)₃. O alumínio iônico absorvido apresenta alta taxa de ligação plasmática à transferrina (~80% a 90%) e a quelantes de baixo peso molecular (citrato e albumina).',
      halfLife:
        'Não existe meia-vida plasmática validada para o Al(OH)₃. Para o alumínio absorvido retido nos tecidos, a depuração corporal é lenta e depende da função renal residual, exigindo de 3 a 6 meses para declínio sérico significativo após interrupção da terapia.',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO - Pó Seco USP ou Suspensão Oral)',
          technique:
            'Via de uso exclusiva em medicina veterinária. A formulação padrão ouro é o gel seco de hidróxido de alumínio USP em pó puro sem sabor. Pesar a dose diária exata em miligramas (mg) e fracionar proporcionalmente entre as refeições oferecidas ao animal. Homogeneizar vigorosamente o pó no alimento úmido (sachê, patê ou dieta renal úmida) para dispersão total. Se for utilizada a suspensão oral humana de 60 mg/mL, agitar o frasco antes de aspirar o volume em seringa graduada em mL.',
          nursingCare:
            'Garantir que o animal consuma toda a porção de alimento contendo o quelante. Nunca forçar suspensões orais aromatizadas na boca de gatos nauseados, sob risco de aversão alimentar definitiva à dieta renal. Manter água limpa e fresca permanentemente disponível para atenuar o risco de constipação.',
          limitations:
            'NUNCA administrar por vias parenterais (intravenosa, intramuscular ou subcutânea). O hidróxido de alumínio é um pó inorgânico insolúvel e sua injeção vascular causa embolia maciça imediata, choque e morte.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Alimento úmido veterinário (sachês, latas e patês para cães e gatos com DRC)',
          'Dietas caseiras balanceadas com baixo teor de fósforo prescritas por nutrólogo veterinário',
          'Água potável (apenas para veículo imediato de suspensões magistrais em seringa oral)',
        ],
        incompatibleFluids: [
          'NUNCA misturar ou administrar concomitantemente com citrato de potássio ou soluções acidificantes/alcalinizantes à base de citrato (o citrato multiplica a absorção sistêmica de alumínio)',
          'NUNCA administrar por via intravenosa em qualquer diluente (SF 0,9%, SG 5%, Ringer Lactato); produto estritamente entérico',
          'Incompatibilidade de administração conjunta no mesmo horário com antibióticos (fluoroquinolonas, tetraciclinas) e ferro',
        ],
        infusionRateGuidance:
          'Não aplicável. O hidróxido de alumínio não possui indicação ou apresentação para infusão intravascular.',
        preparationNotes:
          'Pó seco USP: conservar em recipiente hermeticamente fechado, em temperatura ambiente entre 15 e 30 °C, ao abrigo da umidade e da luz solar direta. Por apresentar densidades variáveis conforme o lote, a pesagem em balança de precisão (mg) é muito mais segura do que o uso de colheres caseiras. Suspensões orais líquidas: conservar em temperatura ambiente; NÃO CONGELAR.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Composto Inorgânico Anfótero de Alumínio',
        chemicalClassDescription:
          'Hidróxido metálico trivalente com propriedades insolúveis em água que atua como base fraca neutralizante e agente quelante de ânions inorgânicos.',
        therapeuticClass: 'Quelante Entérico de Fósforo e Antiácido Gástrico Local',
        therapeuticClassDescription:
          'Agente de quimiosorção intraluminal gastrointestinal que bloqueia a absorção de fosfato dietético e neutraliza a acidez estomacal.',
        detailedTargets: [
          {
            target: 'Ânions Fosfato Dietético (PO₄³⁻ / HPO₄²⁻) no Lúmen Intestinal',
            action:
              'Reação química de precipitação formando fosfato de alumínio (AlPO₄) insolúvel e eletricamente neutro.',
            clinicalSignificance:
              'Inibe a absorção entérica de fósforo, reduzindo a hiperfosfatemia na Doença Renal Crônica e atenuando o hiperparatireoidismo secundário.',
          },
          {
            target: 'Íons Hidrogênio (H⁺) no Lúmen Gástrico',
            action:
              'Reação estequiométrica de neutralização ácido-base formando cloreto de alumínio e água.',
            clinicalSignificance:
              'Eleva temporariamente o pH do suco gástrico, inativando a pepsina e reduzindo o desconforto em quadros pontuais de hiperacidez.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Felinos: Risco Comprovado de Neurotoxicidade (Sheffler 2025), Aversão a Menta e Constipação',
          description:
            'Gatos com DRC frequentemente sofrem de hipocitratemia, desidratação crônica e tendência grave à constipação intestinal. Durante anos acreditou-se que a toxicidade por alumínio era meramente teórica em gatos; contudo, o estudo definitivo de Sheffler et al. (2025) documentou níveis séricos de alumínio superiores a 100 ng/mL em gatos com DRC e relatou o caso clássico de uma gata que desenvolveu mioclonia e fraqueza associadas a concentrações de 376 ng/mL sob altas doses (250 mg/kg/dia), com remissão completa após a retirada do fármaco. Além disso, gatos rejeitam veementemente suspensões humanas aromatizadas com menta, podendo desenvolver aversão permanente à ração renal.',
          clinicalImplications:
            'Utilizar obrigatoriamente pó seco puro USP sem sabor misturado ao alimento úmido, dosar na faixa IRIS de 30 a 60 mg/kg/dia, monitorar o trânsito fecal e investigar tremores ou mioclonia com dosagem de alumínio sérico.',
        },
        {
          species: 'dog',
          title: 'Caninos: Toxicidade por Alumínio Documentada (Segev 2008) e Volume Inviável de Suspensão',
          description:
            'Cães com falência renal recebendo quelantes de alumínio também podem desenvolver intoxicação sistêmica grave com tremores, miopatia, ataxia e microcitose eritrocitária (Segev et al., 2008). Em cães de médio e grande porte, o uso da suspensão oral humana a 6% (60 mg/mL) torna-se inviável devido aos volumes colossais exigidos (ex.: um cão de 30 kg a 60 mg/kg/dia exigiria 30 mL diários da suspensão), o que sobrecarrega o tutor e gera recusa.',
          clinicalImplications:
            'Priorizar formulações magistrais de pó seco USP pesado em balança ou sachês individualizados misturados na alimentação, evitando suspensões volumosas.',
        },
      ],
      prescriptionType: {
        category: 'Medicamento Isento de Prescrição / Preparação Magistral Veterinária',
        ordinanceOrLaw: 'RDC Anvisa nº 106/2021 (Medicamento de Notificação Simplificada) e Decreto-Lei nº 467/1969',
        retentionRequired: false,
        guidelines:
          'O hidróxido de alumínio não é substância controlada pela Portaria SVS/MS nº 344/1998 e não exige receita de controle especial. Apresentações de farmácia humana (suspensões a 6%) são comercializadas como medicamentos isentos de prescrição (MIP/OTC). Para uso em cães e gatos com DRC, o médico-veterinário deve emitir receituário simples prescrevendo a formulação magistral do gel seco USP em pó ou sachês, especificando a dose exata em miligramas (mg) e a obrigatoriedade de administração fracionada com o alimento.',
      },
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      attentionSubtitle: 'Toxicidade por Alumínio, Interações por Quelação e Metas Estritas IRIS 2026',
      precautions: [
        {
          condition: 'Uso Simultâneo com Citrato de Potássio ou Agentes Contendo Citrato',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'O ânion citrato forma quelatos solúveis de citrato de alumínio no intestino delgado que atravessam facilmente as junções intercelulares epiteliais, multiplicando em várias vezes a absorção sistêmica de alumínio em pacientes que já não conseguem eliminá-lo pelo rim, deflagrando intoxicação alumínica fulminante.',
          clinicalAction:
            'Contraindicação formal. Em pacientes renais necessitando de correção de hipocalemia ou acidose metabólica, eleger gluconato de potássio ou bicarbonato de sódio, evitando expressamente produtos à base de citrato.',
        },
        {
          condition: 'Intoxicação Sistêmica Crônica por Alumínio (Neurotoxicidade e Encefalopatia)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O acúmulo tecidual crônico de alumínio no córtex cerebral e gânglios da base causa estresse oxidativo neuronal, bloqueio da transmissão colinérgica e sináptica, manifestando-se por tremores musculares, mioclonia intermitente, fraqueza de membros pélvicos, ataxia e alterações comportamentais (Sheffler et al., 2025; Segev et al., 2008).',
          clinicalAction:
            'Diante de tremores, mioclonia ou fraqueza inexplicada em paciente renal usando Al(OH)₃, suspender o medicamento imediatamente, dosar alumínio sérico (alerta se > 86-100 ng/mL) e migrar para quelante sem alumínio (carbonato de lantânio ou sevelamer).',
        },
        {
          condition: 'Constipação Intestinal Grave e Fecaloma em Felinos com DRC',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O hidróxido de alumínio exerce efeito adstringente e espasmolítico local sobre a musculatura lisa intestinal, ressecando as fezes e diminuindo o peristaltismo. Em gatos idosos desidratados com DRC, pode desencadear retenção fecal maciça, tenesmo e dilatação colônica.',
          clinicalAction:
            'Monitorar diariamente as dejeções. Manter hidratação adequada e, se necessário, associar laxativos osmóticos seguros (como polietilenoglicol PEG 3350 ou lactulose).',
        },
        {
          condition: 'Queda do Volume Corpuscular Médio (Microcitose Eritrocitária Induzida por Alumínio)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O alumínio absorvido liga-se à transferrina plasmática e compete diretamente com o ferro nos precursores eritroides medulares, inibindo a síntese de heme e a maturação celular, resultando em queda progressiva do VCM/MCV sem carência real de ferro corporal.',
          clinicalAction:
            'Acompanhar o hemograma completo a cada 4 a 8 semanas; queda persistente e inexplicada do VCM em cão ou gato renal em uso de Al(OH)₃ sugere toxicidade por alumínio e indica suspensão do quelante.',
        },
        {
          condition: 'Hipofosfatemia Iatrogênica (Fósforo Sérico < 2,7 mg/dL)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A quelação excessiva de fosfato em animais recebendo dieta com baixo teor de fósforo esgota os estoques de fósforo inorgânico, depletando o ATP celular e o 2,3-DPG dos eritrócitos, gerando fraqueza muscular grave, depressão metabólica e risco de hemólise aguda.',
          clinicalAction:
            'Suspender imediatamente o ligante de fósforo se a dosagem de fósforo sérico cair abaixo de 2,7 mg/dL (ou abaixo da meta do estágio IRIS correspondente).',
        },
        {
          condition: 'Obstrução da Saída Gástrica ou Estenose Pilórica',
          alertLevel: 'caution',
          physiologicalExplanation:
            'O alumínio inibe as contrações antrais e retarda o esvaziamento gástrico fisiológico, agravando quadros mecânicos obstrutivos e retenção de resíduos.',
          clinicalAction:
            'Usar com extremo cuidado ou evitar em pacientes com suspeita de retardo de motilidade gástrica ou obstrução parcial.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Constipação e Ressecamento Fecal',
          frequency: 'common',
          mechanism:
            'Ação adstringente do alumínio na mucosa cólica associada à redução do tônus contrátil muscular liso gastrointestinal',
          clinicalManagement:
            'Garantir hidratação volêmica adequada, misturar água extra no alimento úmido e prescrever PEG 3350 ou lactulose conforme necessidade.',
        },
        {
          effect: 'Neurotoxicidade por Alumínio (Mioclonia, Tremores e Fraqueza)',
          frequency: 'uncommon',
          mechanism:
            'Depósito tóxico progressivo do metal no tecido cerebral e junções neuromusculares em animais com retenção por baixa depuração renal',
          clinicalManagement:
            'Suspender o hidróxido de alumínio imediatamente; dosar alumínio sérico; substituir por quelante à base de lantânio ou cálcio.',
        },
        {
          effect: 'Microcitose Eritrocitária sem Anemia Ferropriva',
          frequency: 'uncommon',
          mechanism:
            'Interferência do alumínio na captação celular de ferro e na biossíntese da hemoglobina na medula óssea',
          clinicalManagement:
            'Monitorar índices hematimétricos (VCM/MCV); suspender o Al(OH)₃ se houver microcitose progressiva não justificada.',
        },
        {
          effect: 'Hipofosfatemia Iatrogênica',
          frequency: 'uncommon',
          mechanism:
            'Bloqueio excessivo da absorção de fosfato por subdoses dietéticas somadas a doses elevadas do ligante',
          clinicalManagement:
            'Monitorar o fósforo sérico a cada 4 semanas; suspender o medicamento se o fósforo cair abaixo de 2,7 mg/dL.',
        },
        {
          effect: 'Aversão Alimentar e Náusea em Felinos',
          frequency: 'common',
          mechanism:
            'Palatabilidade desagradável de aromatizantes (menta) ou textura arenosa de suspensões comerciais humanas oferecidas a gatos',
          clinicalManagement:
            'Substituir a suspensão por pó seco USP inodoro e insípido magistral homogeneizado no patê ou sachê.',
        },
        {
          effect: 'Osteomalácia e Doença Óssea Adinâmica',
          frequency: 'rare',
          mechanism:
            'Deposição do alumínio na interface osso-matriz osteoide bloqueando a incorporação de minerais somada à supressão do PTH',
          clinicalManagement:
            'Evitar a elevação de doses acima de 100 mg/kg/dia por períodos prolongados; associar ligantes livres de alumínio.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Estadiamento da DRC e Metas Estritas de Fósforo IRIS 2026',
          recommendedAdjustment: 'Titular a dose a cada 4 a 6 semanas para manter o fósforo nas metas: IRIS 2 (<4,5 mg/dL), IRIS 3 (<5,0 mg/dL), IRIS 4 (<6,0 mg/dL)',
          physiologicalRationale:
            'O objetivo terapêutico não é zerar o fósforo nem reduzi-lo ao mínimo possível, mas mantê-lo dentro da faixa estipulada pelo IRIS para frear o hiperparatireoidismo sem causar hipofosfatemia.',
        },
        {
          clinicalCondition: 'Fósforo Sérico Atingindo Valores Abaixo de 2,7 mg/dL (Hipofosfatemia)',
          recommendedAdjustment: 'Suspender temporariamente o quelante ou reduzir a dose diária em 50%; reavaliar fosfatemia em 2 a 4 semanas',
          physiologicalRationale:
            'Níveis de fósforo inferiores a 2,7 mg/dL esgotam o ATP dos miócitos e eritrócitos, gerando fraqueza muscular, letargia profunda e risco de hemólise intravascular.',
        },
        {
          clinicalCondition: 'Surgimento de Tremores, Mioclonia ou Queda do VCM (Suspeita de Toxicidade por Alumínio)',
          recommendedAdjustment: 'Suspender DEFINITIVAMENTE o hidróxido de alumínio; dosar alumínio sérico e migrar para quelante sem alumínio',
          physiologicalRationale:
            'A intoxicação por alumínio é progressiva e potencialmente fatal; Sheffler et al. (2025) comprovaram que a retirada do fármaco reverte a mioclonia e permite a depuração tecidual lenta.',
        },
        {
          clinicalCondition: 'Constipação Intestinal Persistente em Paciente Felino Renal',
          recommendedAdjustment: 'Reduzir a dose diária em 25% a 33% ou fracionar em mais tomadas; introduzir PEG 3350 ou lactulose',
          physiologicalRationale:
            'O alumínio reduz o peristaltismo; se a constipação comprometer o apetite do gato, a nutrição renal fica ameaçada.',
        },
        {
          clinicalCondition: 'Paciente em Fase de Anorexia / Recusa Alimentar Hospitalar',
          recommendedAdjustment: 'Suspender o quelante enquanto não houver oferta de alimento com fósforo; reintroduzir junto à nutrição enteral',
          physiologicalRationale:
            'O ligante precisa de fosfato luminal alimentar para quelar; administrar em jejum sobrecarrega o estômago sem benefício substancial de quelação.',
        },
        {
          clinicalCondition: 'Descontinuação da Terapia (Desmame)',
          recommendedAdjustment: 'Não exige desmame fisiológico gradual; a dose pode ser suspensa diretamente se o fósforo for controlado pela dieta',
          physiologicalRationale:
            'O hidróxido de alumínio não atua sobre receptores hormonais ou sinápticos; a suspensão abrupta não causa rebote farmacológico.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Citrato de Potássio e Sais de Citrato',
          severity: 'major',
          clinicalEffect: 'Aumento maciço da absorção intestinal de alumínio com alto risco de neurotoxicidade grave e encefalopatia',
          pharmacologicalMechanism:
            'O citrato forma quelatos solúveis de citrato de alumínio que penetram avidamente pela via paracelular intestinal, elevando drasticamente os níveis séricos do metal.',
        },
        {
          drugOrClass: 'Tetraciclinas (Doxiciclina, Minociclina)',
          severity: 'major',
          clinicalEffect: 'Queda drástica na absorção oral e biodisponibilidade do antimicrobiano com falha terapêutica no combate a infecções',
          pharmacologicalMechanism:
            'O cátion Al³⁺ quela diretamente o anel tetraciclínico no lúmen gastrointestinal, formando complexos quelatos insolúveis e totalmente não absorvíveis.',
        },
        {
          drugOrClass: 'Fluoroquinolonas (Enrofloxacina, Marbofloxacina, Ciprofloxacina)',
          severity: 'major',
          clinicalEffect: 'Redução acentuada na concentração sérica da fluoroquinolona com perda do pico bactericida (Cmax/MIC)',
          pharmacologicalMechanism:
            'Formação de quelatos bi e trivalentes insolúveis entre os íons de alumínio e o grupamento 4-quinolona do antimicrobiano.',
        },
        {
          drugOrClass: 'Sais de Ferro Oral (Sulfato Ferroso)',
          severity: 'major',
          clinicalEffect: 'Bloqueio na absorção entérica do ferro com falha na correção de anemias ferroprivas',
          pharmacologicalMechanism:
            'Adsorção direta e competição química pelos sítios de transporte entéricos, além da redução da acidez gástrica necessária para ionização do ferro.',
        },
        {
          drugOrClass: 'Gabapentina',
          severity: 'moderate',
          clinicalEffect: 'Redução de aproximadamente 20% a 30% na biodisponibilidade oral da gabapentina com perda de controle da dor',
          pharmacologicalMechanism:
            'Adsorção física da molécula de gabapentina às partículas de hidróxido de alumínio no lúmen gastroduodenal.',
        },
        {
          drugOrClass: 'Hormônios Tireoidianos (Levotiroxina Sódica)',
          severity: 'moderate',
          clinicalEffect: 'Diminuição significativa da absorção de T4 com descompensação do hipotireoidismo',
          pharmacologicalMechanism:
            'Adsorção inespecífica da levotiroxina à matriz coloidal do gel de hidróxido de alumínio.',
        },
        {
          drugOrClass: 'Micofenolato de Mofetila',
          severity: 'moderate',
          clinicalEffect: 'Queda substancial na área sob a curva (AUC) e exposição ao ácido micofenólico com risco de rejeição/falha imunossupressora',
          pharmacologicalMechanism:
            'Quimiosorção física diminuindo a absorção entérica do pró-fármaco micofenolato.',
        },
        {
          drugOrClass: 'Antagonistas dos Receptores H2 (Famotidina, Ranitidina)',
          severity: 'minor',
          clinicalEffect: 'Diminuição leve da absorção dos bloqueadores H2 se administrados simultaneamente',
          pharmacologicalMechanism:
            'Adsorção física discreta no trato gastrointestinal; separar as tomadas em pelo menos 1 a 2 horas.',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-aloh-usp-powder',
        label: 'Hidróxido de Alumínio Gel Seco USP Pó Puro (Manipulação Magistral)',
        form: 'powder',
        route: 'Oral',
        channel: 'compounded',
        concentrationValue: 1000,
        concentrationUnit: 'mg/g',
        concentrationOptions: [
          {
            id: 'conc-aloh-powder-pure',
            label: 'Gel Seco de Hidróxido de Alumínio USP pó puro (teor mínimo de 76,5% de Al(OH)₃) pesado em mg ou sachês',
            concentrationValue: 1000,
            concentrationUnit: 'mg/g',
          },
        ],
        packInfo: 'Sachês individualizados (ex.: 60 mg, 90 mg, 150 mg) ou pote com colher-medida calibrada',
        scoringInfo: 'Pó fino, branco, inodoro e insípido; forma farmacêutica padrão ouro para mistura em refeições de felinos e caninos',
      },
      {
        id: 'pres-aloh-susp-60mg-ml',
        label: 'Hidróxido de Alumínio Suspensão Oral 60 mg/mL (6%) (Farmácia Humana)',
        form: 'liquid',
        route: 'Oral',
        channel: 'human_pharmacy',
        concentrationValue: 60,
        concentrationUnit: 'mg/mL',
        concentrationOptions: [
          {
            id: 'conc-aloh-susp-60mg',
            label: '60 mg/mL de hidróxido de alumínio (equivalente a 6% p/v = 300 mg a cada 5 mL)',
            concentrationValue: 60,
            concentrationUnit: 'mg/mL',
          },
        ],
        packInfo: 'Frascos contendo 150 mL ou 240 mL de suspensão oral',
        scoringInfo: 'Suspensão oral homogênea; atenção: formulações humanas podem conter aromatizantes de menta desagradáveis para gatos',
      },
      {
        id: 'pres-aloh-susp-100mg-ml',
        label: 'Hidróxido de Alumínio Suspensão Oral Veterinária 100 mg/mL (Manipulação)',
        form: 'liquid',
        route: 'Oral',
        channel: 'compounded',
        concentrationValue: 100,
        concentrationUnit: 'mg/mL',
        concentrationOptions: [
          {
            id: 'conc-aloh-susp-100mg',
            label: '100 mg/mL de hidróxido de alumínio em suspensão aquosa sem sabor para pequenos animais',
            concentrationValue: 100,
            concentrationUnit: 'mg/mL',
          },
        ],
        packInfo: 'Frascos de 60 mL ou 100 mL com seringa dosadora graduada em mL',
        scoringInfo: 'Facilita a dosagem volumétrica em cães pequenos e gatos (100 mg/mL = 0,3 a 0,6 mL/kg/dia)',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-aloh-ckd-initial',
        species: 'both',
        indication: 'Hiperfosfatemia na DRC: Dose Inicial Recomendada (Diretrizes IRIS 2026)',
        doseMin: 30,
        doseMax: 60,
        doseUnit: 'mg',
        perWeightUnit: 'kg/dia',
        route: 'Oral (VO homogeneizado nas refeições)',
        frequency: 'Dose diária total dividida entre as refeições do dia',
        duration: 'Uso contínuo enquanto o fósforo estiver acima da meta',
        clinicalContext:
          'Dose padrão recomendada pelo consenso IRIS 2026 para iniciar após falha da dieta renal em atingir as metas. Dividir a dose diária entre as refeições (ex.: se o animal come 2x/dia, dividir por 2; se come 3x/dia, dividir por 3).',
        monitoring: 'Reavaliar fósforo sérico após jejum de 12 horas e cálcio a cada 4 a 6 semanas até a meta.',
        calculatorEnabled: true,
        presentationId: 'pres-aloh-usp-powder',
        presentationConcentrationId: 'conc-aloh-powder-pure',
        evidenceLevel: 'Diretrizes Internacionais IRIS 2026 (Padrão Ouro Nefrologia)',
      },
      {
        id: 'dose-aloh-ckd-titrated',
        species: 'both',
        indication: 'Hiperfosfatemia na DRC: Faixa de Titulação Refratária (Plumb 10ª ed.)',
        doseMin: 60,
        doseMax: 100,
        doseUnit: 'mg',
        perWeightUnit: 'kg/dia',
        route: 'Oral (VO com o alimento)',
        frequency: 'Dose diária total dividida entre as refeições',
        duration: 'Uso contínuo sob monitoramento rigoroso',
        clinicalContext:
          'Para pacientes que não atingiram a meta IRIS com doses iniciais. O Plumb permite titular até 100 mg/kg/dia. Se doses próximas a 100 mg/kg/dia não controlarem o fósforo, associar ou substituir por outro ligante (lantânio ou cálcio) para evitar intoxicação por alumínio.',
        monitoring: 'Fósforo, cálcio, VCM no hemograma e observação rigorosa de tremores ou mioclonia.',
        calculatorEnabled: true,
        presentationId: 'pres-aloh-susp-60mg-ml',
        presentationConcentrationId: 'conc-aloh-susp-60mg',
        evidenceLevel: 'Monografia Farmacológica Plumb 10ª ed. / Nelson & Couto',
      },
      {
        id: 'dose-aloh-antacid-empirical',
        species: 'both',
        indication: 'Antiácido Neutralizante Gástrico Adjuvante (Dose BSAVA 10ª ed.)',
        doseMin: 10,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (VO)',
        frequency: 'A cada 6 a 8 horas (junto ou logo após as refeições)',
        duration: '1 a 3 dias pontuais conforme desconforto gástrico',
        clinicalContext:
          'Dose empírica do formulário britânico BSAVA. Ação curta de 30-60 minutos; não substitui prazóis na gastrite urêmica severa.',
        monitoring: 'Sinais de alívio de náusea e desconforto abdominal.',
        calculatorEnabled: true,
        presentationId: 'pres-aloh-susp-60mg-ml',
        presentationConcentrationId: 'conc-aloh-susp-60mg',
        evidenceLevel: 'Formulário Clínico BSAVA 10ª ed. (Dose Empírica)',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Suspensão 60 mg/mL e Pó)
    practicalWeightTable: {
      standardDoseText:
        'Cálculo baseado na dose inicial padrão recomendada pelo IRIS 2026 de 30 a 60 mg/kg/dia da DOSE TOTAL DIÁRIA. O volume diário ou quantidade em pó DEVE ser obrigatoriamente fracionado entre todas as refeições oferecidas ao animal ao longo do dia.',
      headers: [
        'Peso do Paciente (kg)',
        'Dose 30 mg/kg/dia',
        'Suspensão 60 mg/mL (30 mg/kg)',
        'Dose 60 mg/kg/dia',
        'Suspensão 60 mg/mL (60 mg/kg)',
      ],
      rows: [
        { weight: '2 kg', totalDose: '60 mg/dia', col1: '1,0 mL/dia (0,5 mL BID)', col2: '120 mg/dia', col3: '2,0 mL/dia (1,0 mL BID)' },
        { weight: '4 kg', totalDose: '120 mg/dia', col1: '2,0 mL/dia (1,0 mL BID)', col2: '240 mg/dia', col3: '4,0 mL/dia (2,0 mL BID)' },
        { weight: '5 kg', totalDose: '150 mg/dia', col1: '2,5 mL/dia (1,25 mL BID)', col2: '300 mg/dia', col3: '5,0 mL/dia (2,5 mL BID)' },
        { weight: '10 kg', totalDose: '300 mg/dia', col1: '5,0 mL/dia (2,5 mL BID)', col2: '600 mg/dia', col3: '10,0 mL/dia (5,0 mL BID)' },
        { weight: '15 kg', totalDose: '450 mg/dia', col1: '7,5 mL/dia (3,75 mL BID)', col2: '900 mg/dia', col3: '15,0 mL/dia (7,5 mL BID)' },
        { weight: '20 kg', totalDose: '600 mg/dia', col1: '10,0 mL/dia (5,0 mL BID)', col2: '1.200 mg/dia', col3: '20,0 mL/dia (10,0 mL BID)' },
        { weight: '30 kg', totalDose: '900 mg/dia', col1: '15,0 mL/dia (preferir pó)', col2: '1.800 mg/dia', col3: '30,0 mL/dia (preferir pó)' },
        { weight: '40 kg', totalDose: '1.200 mg/dia', col1: '20,0 mL/dia (preferir pó)', col2: '2.400 mg/dia', col3: '40,0 mL/dia (inviável líquido)' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Dosagem Oral e Orientações Práticas de Formulação',
        concentration: 'Hidróxido de Alumínio Suspensão Oral 60 mg/mL (6%) vs Gel Seco USP Pó',
        dropletRatio: 'Não utilizar dosagem por gotas; administrar líquidos estritamente com seringa oral graduada em mL',
        practicalRule:
          'Suspensão 60 mg/mL: Volume diário total = Peso (kg) x 0,5 mL para a dose de 30 mg/kg/dia | Volume diário total = Peso (kg) x 1,0 mL para a dose de 60 mg/kg/dia. Dividir o volume obtido pelo número de refeições do dia.',
        note:
          'ALERTA PARA CÃES MÉDIOS E GRANDES: Acima de 15 kg, os volumes da suspensão líquida a 6% tornam-se excessivamente grandes e difíceis de aceitar. Nesses animais, prescrever obrigatoriamente a formulação magistral em pó puro USP pesado em sachês.',
      },
    },

    // 10. Texto Modelo de Prescrição Veterinária Pronto
    samplePrescriptionText:
      'USO ORAL\n1. Hidróxido de Alumínio Gel Seco USP — Pó puro oral em sachês de [DOSE_SACHE_MG: ex. 90 mg]\n   - Administrar 1 (um) sachê, misturado completamente e homogeneizado ao alimento úmido, a cada 12 horas, junto às duas principais refeições do paciente (dose total diária calculada conforme a recomendação IRIS de 30 a 60 mg/kg/dia).\n   - Instruções obrigatórias ao tutor:\n     a) A medicação DEVE ser oferecida estritamente misturada ao alimento no momento da refeição; se o paciente não se alimentar, não administrar a dose isolada em jejum.\n     b) Respeitar um intervalo mínimo de pelo menos 2 (duas) horas entre o hidróxido de alumínio e quaisquer outros medicamentos orais (como enrofloxacina, doxiciclina, ferro, gabapentina ou levotiroxina).\n     c) NUNCA administrar simultaneamente com suplementos ou xaropes contendo citrato de potássio.\n     d) Manter vasilhas de água limpa e fresca permanentemente acessíveis para evitar ressecamento das fezes.\n     e) Retornar para reavaliação laboratorial de fósforo sérico e cálcio em 4 a 6 semanas. Contatar imediatamente o médico-veterinário caso o animal apresente fezes excessivamente duras, tremores musculares ou fraqueza nas patas.',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas
    clinicalFoundationsData: [
      {
        id: 'cf-barber-1999-dietary-restriction',
        title: 'Restrição Dietética de Fósforo na DRC Felina: Dieta Deve Preceder o Ligante',
        narrative:
          'O ensaio clínico prospectivo de Barber et al. (1999, Journal of Small Animal Practice) estabeleceu o alicerce científico para a abordagem escalonada da hiperfosfatemia na Doença Renal Crônica felina. Vinte e três gatos com insuficiência renal crônica estável foram acompanhados ao longo do tempo. Quinze gatos aceitaram e mantiveram a adesão a uma dieta veterinária com restrição controlada de fósforo e proteína, enquanto oito gatos rejeitaram a dieta terapêutica e mantiveram alimentos convencionais. Após aproximadamente cinco meses de acompanhamento, o grupo que aderiu à dieta renal apresentou redução marcante e estatisticamente significativa do fósforo plasmático e do hormônio da paratireoide (PTH), e oito felinos atingiram euparatireoidismo completo. Digno de nota, apenas 2 dos 15 gatos em uso da dieta renal necessitaram da adição de hidróxido de alumínio para atingir as metas. Em contrapartida, no grupo sem dieta renal, as concentrações de PTH aumentaram em 7 dos 8 gatos. O estudo comprovou que a dieta renal terapêutica deve ser sempre o primeiro passo, reservando o hidróxido de alumínio para os animais que permanecem hiperfosfatêmicos.',
        narrativeHighlights: [
          'apenas 2 de 15 gatos em dieta renal restrita necessitaram de hidróxido de alumínio',
          'redução marcante de fósforo e PTH e controle do hiperparatireoidismo pela dieta',
          'fundamenta o protocolo mundial de iniciar primeiro a dieta renal e reavaliar antes do ligante',
        ],
        studies: [
          {
            citation: 'Barber PJ, Rawlings JM, Markwell PJ, Elliott J. J Small Anim Pract. 1999;40(2):62-70. doi: 10.1111/j.1748-5827.1999.tb03039.x. PMID: 10088085.',
            referenceId: 'ref-barber-1999',
            sourceType: 'Ensaio Clínico Prospectivo em Felinos com DRC',
            summaryText:
              'Acompanhamento de 23 gatos com insuficiência renal crônica. A dieta restrita em fósforo controlou o PTH e a fosfatemia em quase todos os animais, com apenas 2 gatos exigindo hidróxido de alumínio complementar aos 5 meses.',
            summaryHighlights: ['23 gatos com DRC', 'apenas 2 necessitaram de Al(OH)3', 'p < 0,01 para queda de PTH'],
            metrics: ['n = 23 gatos', 'Euparatireoidismo atingido em 8/15 na dieta', 'Acompanhamento: 5 meses'],
            clinicalConclusion:
              'Comprova que a dieta renal restrita é a base inegociável do tratamento, devendo o hidróxido de alumínio ser reservado a casos refratários.',
          },
        ],
      },
      {
        id: 'cf-sheffler-2025-feline-toxicity',
        title: 'Toxicidade por Alumínio em Gatos: Níveis Séricos em 176 Felinos e Caso Clínico de Mioclonia',
        narrative:
          'O marco contemporâneo na farmacovigilância de quelantes de fósforo em pequenos animais foi publicado por Sheffler et al. (2025, BMC Veterinary Research). O estudo avaliou as concentrações séricas de alumínio em 176 felinos, comparando gatos com DRC recebendo hidróxido de alumínio com gatos controle não expostos. Entre os 21 gatos com DRC que recebiam Al(OH)₃, quase metade (9 de 21) apresentou alumínio sérico superior a 100 ng/mL, com média significativamente mais alta do que nos controles sem a droga (69 ng/mL vs 29 ng/mL; p = 0,0034). Os autores descreveram o caso clínico detalhado de uma gata de 16 anos e 4 kg com DRC estágio 2 que recebia dose massiva empírica de 500 mg q12h (250 mg/kg/dia) de Al(OH)₃ e desenvolveu fraqueza progressiva de membros pélvicos e mioclonia intermitente em membros torácicos. A concentração sérica de alumínio atingiu 376 ng/mL. Após a suspensão imediata do Al(OH)₃ e substituição por quelante sem alumínio, houve resolução clínica completa da mioclonia e dos tremores, com o alumínio sérico caindo para 71 ng/mL em cinco meses. O trabalho quebrou o mito histórico de que gatos não desenvolvem toxicidade por alumínio e sugeriu o ponto de corte de 86 ng/mL para alerta clínico.',
        narrativeHighlights: [
          'primeiro relato clínico detalhado e comprovado de neurotoxicidade por alumínio em gato',
          'mioclonia e fraqueza associadas a 376 ng/mL sob superdosagem de 250 mg/kg/dia',
          'resolução completa dos sinais neurológicos após a descontinuação do fármaco',
          '9 de 21 gatos renais em uso de Al(OH)3 apresentaram alumínio sérico acima de 100 ng/mL',
        ],
        studies: [
          {
            citation: 'Sheffler R, Karpf S, Rebolloso S, et al. BMC Vet Res. 2025;21:327. doi: 10.1186/s12917-025-04788-8. PMID: 40336076.',
            referenceId: 'ref-sheffler-2025-toxicity',
            sourceType: 'Estudo de Farmacovigilância Observacional e Relato de Caso Clínico Felino',
            summaryText:
              'Mensuração de alumínio sérico em 176 gatos e descrição de neurotoxicidade reversível (mioclonia e fraqueza com 376 ng/mL) em gata com DRC sob 250 mg/kg/dia de Al(OH)3. Níveis séricos foram significativamente superiores nos expostos.',
            summaryHighlights: ['176 gatos avaliados', 'Al sérico > 100 ng/mL em 43% dos expostos', 'reversão de mioclonia'],
            metrics: ['Al sérico expostos: 69 ng/mL vs controles: 29 ng/mL (p=0,0034)', 'Caso clínico: 376 ng/mL -> 71 ng/mL'],
            clinicalConclusion:
              'Evidencia que o alumínio é absorvido e retido em felinos com DRC, exigindo respeito estrito às faixas posológicas IRIS e vigilância neurológica.',
          },
        ],
      },
      {
        id: 'cf-segev-2008-canine-toxicity',
        title: 'Intoxicação por Alumínio em Cães Renais: Alterações Neuromusculares e Hematológicas',
        narrative:
          'A evidência definitiva de intoxicação por alumínio na espécie canina foi relatada por Segev et al. (2008, Journal of Veterinary Internal Medicine) em dois cães com insuficiência renal crônica recebendo quelantes à base de hidróxido de alumínio. Os animais apresentaram sinais neurológicos graves de disfunção do sistema nervoso central, fraqueza muscular esquelética generalizada e alterações hematológicas com redução progressiva do volume corpuscular médio (microcitose) sem perda concomitante de ferro. As dosagens séricas revelaram concentrações extremamente elevadas de alumínio (atingindo 318 ng/mL). A publicação alertou a comunidade nefrológica veterinária para a capacidade dos cães de acumularem alumínio nos tecidos cerebrais e na medula óssea quando a filtração glomerular está comprometida, servindo de base para a recomendação formal do IRIS de monitorar microcitose e fraqueza em pacientes renais crônicos.',
        narrativeHighlights: [
          'dois cães com insuficiência renal e intoxicação sistêmica por quelantes de alumínio',
          'tríade clínica: alterações neurológicas/encefalopatia, fraqueza e microcitose',
          'níveis séricos de alumínio atingiram 318 ng/mL',
          'base das diretrizes IRIS para monitoramento hematológico e neurológico em cães',
        ],
        studies: [
          {
            citation: 'Segev G, Bandt C, Francey T, Cowgill LD. J Vet Intern Med. 2008;22(6):1432-1435. doi: 10.1111/j.1939-1676.2008.0206.x. PMID: 19000253.',
            referenceId: 'ref-segev-2008-canine',
            sourceType: 'Relato de Casos Clínicos de Toxicidade Farmacológica em Cães',
            summaryText:
              'Documentação de intoxicação por alumínio em 2 cães com insuficiência renal crônica recebendo ligantes de fósforo à base de alumínio. Manifestações de demência/encefalopatia, fraqueza neuromuscular e microcitose.',
            summaryHighlights: ['2 cães com falência renal', 'Al sérico até 318 ng/mL', 'microcitose e ataxia'],
            metrics: ['n = 2 cães', 'Concentrações séricas tóxicas de Al > 300 ng/mL'],
            clinicalConclusion:
              'Comprova que cães com baixa filtração glomerular acumulam alumínio tóxico, tornando indispensável a titulação cautelosa da dose.',
          },
        ],
      },
      {
        id: 'cf-beita-2024-ajvr-fgf23',
        title: 'Estudo Randomizado em Gatos com DRC: Impacto do Al(OH)₃ sobre Fósforo Sérico e FGF23',
        narrative:
          'O ensaio prospectivo e randomizado de Beita et al. (2024, American Journal of Veterinary Research) avaliou os efeitos do hidróxido de alumínio (90 mg/kg/dia VO por 42 dias) sobre as concentrações de fósforo e FGF23 em 17 gatos jovens com DRC induzida cirurgicamente, todos mantidos em dieta renal úmida restrita em fósforo, comparados a 13 gatos saudáveis. Os gatos com DRC apresentavam elevação basal significativa de fósforo, cálcio e FGF23 em relação aos sadios. A adição de 90 mg/kg/dia de Al(OH)₃ à dieta renal não produziu uma redução adicional estatisticamente significativa na fosfatemia sérica no grupo tratado; contudo, enquanto os controles apresentaram aumento significativo de FGF23 ao longo do período (p < 0,02), o grupo tratado com Al(OH)₃ manteve os níveis de FGF23 estabilizados sem aumento estatístico (p = 0,059). O trabalho evidenciou que em pacientes já sob dieta restrita com hiperfosfatemia leve, o benefício do ligante manifesta-se principalmente pela contenção do eixo FGF23, reforçando que o fármaco deve ser titulado para metas laboratoriais reais e não prescrito de forma empírica indiscriminada.',
        narrativeHighlights: [
          'ensaio prospectivo randomizado em modelo de DRC felina sob dieta renal úmida',
          'estabilização da elevação de FGF23 no grupo tratado com hidróxido de alumínio',
          'demonstra que o fármaco atua atenuando a sobrecarga do eixo mineral mesmo quando a queda de P sérico é discreta',
        ],
        studies: [
          {
            citation: 'Beita KG, Lourenço BN, Rehagen M, Schmiedt CW. Am J Vet Res. 2024;85(10):ajvr.24.04.0123. doi: 10.2460/ajvr.24.04.0123. PMID: 39137806.',
            referenceId: 'ref-beita-2024-ajvr',
            sourceType: 'Ensaio Clínico Experimental Prospectivo Randomizado em Gatos',
            summaryText:
              'Avaliação de 42 dias de Al(OH)3 (90 mg/kg/dia) em gatos com DRC sob dieta renal. Demonstrou contenção na elevação do FGF23 plasmático no grupo tratado em comparação aos controles não tratados.',
            summaryHighlights: ['17 gatos com DRC', 'dose de 90 mg/kg/dia', 'estabilização do FGF23'],
            metrics: ['n = 17 gatos DRC + 13 saudáveis', 'FGF23 controles: p < 0,02 vs tratados: p = 0,059'],
            clinicalConclusion:
              'Ilustra o papel do hidróxido de alumínio na modulação do FGF23 e orienta a titulação individualizada da dose.',
          },
        ],
      },
      {
        id: 'cf-marks-2018-acvim-gastroprotectants',
        title: 'Consenso ACVIM: Por Que o Al(OH)₃ Não é Gastroprotetor de Rotina em Pequenos Animais',
        narrative:
          'O Consenso do Colégio Americano de Medicina Interna Veterinária (ACVIM) sobre o uso racional de protetores gastrointestinais em cães e gatos (Marks et al., 2018, Journal of Veterinary Internal Medicine) analisou criticamente a eficácia dos antiácidos locais à base de hidróxido de alumínio e magnésio. O painel concluiu que, embora os antiácidos neutralizem temporariamente o ácido já secretado na luz gástrica, sua duração de ação é extremamente efêmera, persistindo por apenas 30 a 60 minutos após a administração. Para manter o pH intragástrico acima de 3 a 4 (necessário para a cicatrização de úlceras e controle da esofagite), seriam necessárias administrações a cada poucas horas ao longo do dia e da noite, o que é clinicamente inviável e induz constipação severa e inúmeras interações farmacológicas por quelação. O consenso recomendou formalmente que os inibidores da bomba de prótons (como o omeprazol) são os fármacos de primeira escolha para erosão, ulceração e esofagite, desaconselhando o uso do Al(OH)₃ como supressor gástrico de rotina.',
        narrativeHighlights: [
          'duração de neutralização gástrica de apenas 30 a 60 minutos',
          'evidência insuficiente para tratamento de rotina de úlcera e esofagite em pequenos animais',
          'reforça a identidade primária moderna do hidróxido de alumínio como ligante entérico de fósforo',
        ],
        studies: [
          {
            citation: 'Marks SL, Kook PH, Papich MG, et al. J Vet Intern Med. 2018;32(6):1823-1840. doi: 10.1111/jvim.15337. PMID: 30378711.',
            referenceId: 'ref-marks-2018-acvim',
            sourceType: 'Diretriz de Consenso de Especialistas do ACVIM',
            summaryText:
              'Declaração de consenso do ACVIM sobre protetores gastrointestinais em cães e gatos. Antiácidos orais possuem ação muito curta (30-60 min) e evidência inadequada para úlcera péptica ou esofagite.',
            summaryHighlights: ['Consenso ACVIM', 'ação antiácida dura 30-60 min', 'prazóis são primeira escolha'],
            metrics: ['Painel multicêntrico de especialistas', 'Revisão sistemática de evidências'],
            clinicalConclusion:
              'Consolida que o hidróxido de alumínio não deve ser usado como gastroprotetor rotineiro, fixando seu papel clínico como ligante de fósforo.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-iris-guidelines-2026',
        citationText:
          'International Renal Interest Society (IRIS). IRIS Treatment Recommendations for Chronic Kidney Disease in Dogs and Cats (2026 Reissue / Updates). IRIS; 2026.',
        sourceType: 'Diretrizes Internacionais de Consenso Nefrológico Padrão Ouro',
        url: 'https://www.iris-kidney.com/iris-guidelines-1',
        evidenceLevel: 'Consenso Internacional Padrão Ouro IRIS 2026',
      },
      {
        id: 'ref-plumbs-10th-aloh',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Aluminum Hydroxide monograph, pp. 44-45 (PDF pp. 71-72). Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-aloh',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Aluminium antacids / Aluminium hydroxide monograph, pp. 13-14 (PDF pp. 29-30). British Small Animal Veterinary Association; 2020.',
        sourceType: 'Formulário Clínico Internacional BSAVA',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-nelson-couto-6th',
        citationText:
          'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed. Chapter 41: Acute Kidney Injury and Chronic Kidney Disease, pp. 691-700 (PDF p. 721). Elsevier; 2020.',
        sourceType: 'Tratado Internacional de Medicina Interna Veterinária',
        url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-59004-4',
        evidenceLevel: 'Tratado Padrão Ouro Internacional',
      },
      {
        id: 'ref-sheffler-2025-toxicity',
        citationText:
          'Sheffler R, Karpf S, Rebolloso S, Miksicek V, Buchweitz JP, Puschner B, et al. Serum aluminum in 176 feline patients with application to the diagnostic approach to a tremoring patient with kidney disease receiving aluminum hydroxide therapy. BMC Vet Res. 2025;21:327. doi: 10.1186/s12917-025-04788-8. PMID: 40336076.',
        sourceType: 'Estudo de Farmacovigilância Observacional e Série Clínica Felina',
        url: 'https://bmcvetres.biomedcentral.com/articles/10.1186/s12917-025-04788-8',
        evidenceLevel: 'Nível 2b (Farmacovigilância e Relato de Toxicidade Contemporâneo 2025)',
      },
      {
        id: 'ref-segev-2008-canine',
        citationText:
          'Segev G, Bandt C, Francey T, Cowgill LD. Aluminum toxicity following administration of aluminum-based phosphate binders in 2 dogs with renal failure. J Vet Intern Med. 2008;22(6):1432-1435. doi: 10.1111/j.1939-1676.2008.0206.x. PMID: 19000253.',
        sourceType: 'Relato de Casos de Toxicidade Farmacológica em Cães',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19000253/',
        evidenceLevel: 'Nível 2b (Série Clínica de Farmacovigilância Canina)',
      },
      {
        id: 'ref-barber-1999',
        citationText:
          'Barber PJ, Rawlings JM, Markwell PJ, Elliott J. Effect of dietary phosphate restriction on renal secondary hyperparathyroidism in the cat. J Small Anim Pract. 1999;40(2):62-70. doi: 10.1111/j.1748-5827.1999.tb03039.x. PMID: 10088085.',
        sourceType: 'Ensaio Clínico Prospectivo em Felinos com DRC',
        url: 'https://pubmed.ncbi.nlm.nih.gov/10088085/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Prospectivo Controlado)',
      },
      {
        id: 'ref-beita-2024-ajvr',
        citationText:
          'Beita KG, Lourenço BN, Rehagen M, Schmiedt CW. Effect of aluminum hydroxide on serum phosphate and fibroblast growth factor 23 concentrations in young adult cats with surgically induced chronic kidney disease. Am J Vet Res. 2024;85(10):ajvr.24.04.0123. doi: 10.2460/ajvr.24.04.0123. PMID: 39137806.',
        sourceType: 'Ensaio Clínico Experimental Prospectivo Randomizado em Gatos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/39137806/',
        evidenceLevel: 'Nível 1b (Ensaio Randomizado Controlado 2024)',
      },
      {
        id: 'ref-marks-2018-acvim',
        citationText:
          'Marks SL, Kook PH, Papich MG, Tolbert MK, Willard MD. ACVIM consensus statement: Support for rational administration of gastrointestinal protectants to dogs and cats. J Vet Intern Med. 2018;32(6):1823-1840. doi: 10.1111/jvim.15337. PMID: 30378711.',
        sourceType: 'Diretriz de Consenso de Especialistas do ACVIM',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6271318/',
        evidenceLevel: 'Consenso Internacional Padrão Ouro ACVIM 2018',
      },
    ],

    genericBrandsNote:
      'Em medicina veterinária no Brasil, a apresentação preferencial e mais segura é o Gel Seco de Hidróxido de Alumínio USP em pó puro sem sabor preparado por farmácias de manipulação veterinária idôneas, dosado em sachês individuais pesados em miligramas (mg) para mistura homogênea na alimentação úmida. Apresentações comerciais de farmácia humana são encontradas na forma de suspensão oral a 6% (60 mg/mL ou 61,5 mg/mL), registradas como medicamentos de notificação simplificada da Anvisa (MIP/baixo risco). Atenção: muitas formulações humanas líquidas contêm aromatizantes de menta e adoçantes que provocam aversão alimentar intensa e sialorreia em gatos, devendo-se priorizar o pó puro manipulado. O medicamento é isento de receita de controle especial.',

    // 13. Avisos Clínicos Importantes Específicos (Banner de Destaque)
    clinicalWarningItems: [
      {
        label: 'Administrar SEMPRE com o Alimento:',
        text: 'O hidróxido de alumínio age por contato físico com o fósforo alimentar no intestino. A dose diária DEVE ser dividida e homogeneizada entre todas as refeições do dia. Administrar em jejum anula o propósito da quelação.',
      },
      {
        label: 'Toxicidade por Alumínio em Cães e Gatos:',
        text: 'A absorção crônica em pacientes com baixa filtração renal leva ao acúmulo sistêmico do metal. Sheffler et al. (2025) e Segev et al. (2008) comprovaram neurotoxicidade com tremores, mioclonia, fraqueza e microcitose eritrocitária. Respeitar o teto de 100 mg/kg/dia e monitorar VCM e sinais neurológicos.',
      },
      {
        label: 'Proibição com Citrato e Separação de 2 Horas:',
        text: 'NUNCA associar com Citrato de Potássio (o citrato multiplica a absorção de alumínio). Além disso, o alumínio quela e anula outros medicamentos orais (enrofloxacina, doxiciclina, ferro, gabapentina); manter separação obrigatória de pelo menos 2 horas.',
      },
    ],

    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const hidroxidoDeAluminioMedicationRecord = hidroxidoDeAluminioMedicationsSeed[0];
