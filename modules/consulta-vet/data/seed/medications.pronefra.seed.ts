import type { MedicationRecord } from '../../types/medication';

export const pronefraMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-pronefra',
    slug: 'pronefra',
    title: 'Pronefra®',
    activeIngredient:
      'Carbonato de Cálcio + Carbonato de Magnésio + Quitosana + Hidrolisado de Proteína de Peixe',
    pharmacologicClass:
      'Suplemento nutricional renal; quelante e ligante intestinal mineral de fósforo com adsorvente de toxinas urêmicas',
    species: ['dog', 'cat'],
    category: 'nefrologia-urologia',
    tags: [
      'Pronefra',
      'Quelante de Fósforo',
      'Carbonato de Cálcio',
      'Carbonato de Magnésio',
      'Quitosana',
      'Hidrolisado de Peixe',
      'Doença Renal Crônica',
      'DRC',
      'Hiperfosfatemia',
      'FGF23',
      'IRIS 2026',
      'Virbac',
      'Suplemento Renal',
    ],
    tradeNames: [
      'Pronefra® Suspensão Oral 60 mL (Virbac — Registro MAPA SP 001718-4.000008)',
    ],
    officialSiteUrl: 'https://br.virbac.com/products/suplemento-oral/pronefra',
    leafletUrl: 'https://br.virbac.com/products/suplemento-oral/pronefra',
    mechanismOfAction:
      'O Pronefra é uma formulação combinada em suspensão oral oleosa com quatro componentes funcionais distintos voltados ao suporte da função renal na Doença Renal Crônica (DRC). 1) Carbonato de Cálcio (CaCO3): Atua no lúmen gastrointestinal reagindo com o ácido gástrico para liberar íons cálcio (Ca2+), os quais ligam-se ao fosfato inorgânico alimentar proveniente da digestão, formando fosfato de cálcio insolúvel eliminado nas fezes. Isso reduz a absorção líquida de fósforo, diminuindo a fosfatemia e o estímulo para secreção de FGF23 e paratormônio (PTH). 2) Carbonato de Magnésio (MgCO3): Fornece um segundo cátion mineral ligante (Mg2+) que complexa fósforo intraluminal adicional, reduzindo a dependência exclusiva de cálcio. 3) Quitosana de Aspergillus niger: Biopolímero catiônico natural de origem fúngica que, em pH estomacal e duodenal ácido, sofre protonação de seus grupamentos amino (-NH3+), exercendo ação adsorvente física de compostos nitrogenados, precursores de toxinas urêmicas e fosfato intraluminal, além de modular a digestibilidade nitrogenada entérica. 4) Hidrolisado de Proteína de Peixe: Mistura de oligopeptídeos bioativos marinhos com capacidade experimental in vitro de inibir a enzima conversora de angiotensina (ECA); entretanto, não atua como anti-hipertensivo clínico comprovado em cães e gatos, servindo como suporte peptídico nutricional de alta digestibilidade.',
    plainLanguageSummary:
      'Suplemento alimentar em suspensão oral desenvolvido pela Virbac para auxiliar cães e gatos com Doença Renal Crônica (DRC) a controlar o excesso de fósforo no organismo. Ele combina quatro ingredientes funcionais: dois minerais que funcionam como ímãs de fósforo na digestão (carbonato de cálcio e carbonato de magnésio), uma fibra purificada de origem fúngica (quitosana) que ajuda a reter toxinas no intestino para eliminação nas fezes, e pequenos fragmentos de proteína de peixe de fácil digestão. PONTOS CRÍTICOS DE PLANTÃO: 1) ADMINISTRAR SEMPRE COM A REFEIÇÃO: O produto precisa se misturar com o fósforo do alimento dentro do estômago e intestino; dar em jejum anula o efeito quelante. 2) DIETA RENAL PRIMEIRO: O pilar central do tratamento é a ração renal restrita em fósforo por 4 a 8 semanas; o Pronefra entra quando o fósforo continua acima da meta do estágio IRIS. 3) SE O ANIMAL NÃO ESTIVER COMENDO, NÃO FORCE O QUELANTE: Em animais sem apetite, a prioridade absoluta é tratar náusea, vômito e hidratação. Sem comida no intestino, não há fósforo para quelar. 4) CUIDADO COM EXCESSO DE CÁLCIO: Como contém cálcio, animais com cálcio alto no sangue (hipercalcemia) não devem usar. 5) SEPARAR DE OUTROS MEDICAMENTOS POR 2 HORAS: O cálcio e magnésio anulam antibióticos (como doxiciclina e enrofloxacina) e remédios de tireoide se forem dados juntos.',

    indications: [
      'Controle adjuvante da absorção intestinal de fósforo em cães e gatos com Doença Renal Crônica (estágios IRIS 2, 3 e 4) que persistem com fosfatemia acima da meta apesar da dieta renal.',
      'Suporte nutricional na retenção intestinal de compostos nitrogenados e precursores de toxinas urêmicas através da adsorção por quitosana fúngica.',
      'Opção de manejo mineral em pacientes nefropatas que toleram bem formulações líquidas palatáveis com seringa dosadora específica.',
      'Coadjuvante entérico em fases de transição dietética ou em nefropatas com aceitação parcial da ração terapêutica renal exclusiva.',
    ],

    contraindications: [
      'Hipercalcemia preexistente de qualquer etiologia (cálcio total ou cálcio ionizado sérico elevado; risco de calcificação de tecidos moles e agravamento renal).',
      'Histórico de urolitíase por oxalato de cálcio ou fosfato de cálcio.',
      'Hipofosfatemia (fósforo sérico abaixo de 2,7 mg/dL; risco de fraqueza muscular esquelética, disfunção diafragmática e hemólise).',
      'Hipersensibilidade conhecida a produtos de peixe ou a qualquer componente da formulação oleosa.',
      'Uso como monoterapia exclusiva em substituição à ração renal terapêutica em nefropatas com hiperfosfatemia grave descompensada.',
      'Uso como substituto de anti-hipertensivos (o hidrolisado de peixe não tem eficácia hipotensora clínica comprovada para substituir anlodipino ou telmisartana).',
    ],

    cautions: [
      'Administração rigorosamente simultânea ou imediatamente antes/após as refeições: o contato luminal direto com o fosfato dietético é indispensável.',
      'Monitoramento sérico obrigatório de cálcio e fósforo a cada 4 a 6 semanas no início do uso, e a cada 12 semanas após estabilização, priorizando cálcio ionizado em gatos.',
      'Vigilância de magnésio sérico em pacientes nos estágios avançados da DRC (estágio 4 IRIS ou oligúricos), devido à excreção renal reduzida do magnésio absorvido.',
      'Separação estrita de pelo menos 2 horas de antibióticos quinolônicos, tetraciclinas, ferro oral, levotiroxina e bisfosfonatos para evitar quelação e perda de absorção.',
      'Agitar vigorosamente o frasco antes de cada aspiração na seringa dosadora; sedimentações leves são normais pela densidade dos minerais.',
      'Não exceder a dose diária recomendada pelo fabricante; se a hiperfosfatemia persistir em animais em dieta renal estrita, migrar para quelante farmacológico titulável.',
    ],

    adverseEffects: [
      'Regurgitação ou vômito esporádico logo após a ingestão, especialmente em felinos com gastrite urêmica ativa ou aversão alimentar em curso.',
      'Alteração na consistência das fezes, diarreia transitória ou fezes mais pastosas em pacientes sensíveis ao veículo oleoso.',
      'Constipação intestinal decorrente da ligação luminal de cálcio aos fosfatos e perda de lubrificação do bolo fecal.',
      'Hipercalcemia iatrogênica em tratamentos prolongados, particularmente se associado a calcitriol ou em dietas com teor elevado de cálcio.',
      'Hipermagnesemia subclínica ou clínica em nefropatas em estágio terminal com anúria ou oligúria.',
    ],

    routes: ['oral'],

    doses: [
      {
        id: 'dose-pronefra-gato',
        species: 'cat',
        indication:
          'Controle da absorção de fósforo e retenção de toxinas urêmicas na DRC felina (estágios 2 a 4 IRIS)',
        doseMin: 0.25,
        doseMax: 0.25,
        doseUnit: 'mL',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Uso contínuo guiado por níveis séricos de cálcio e fósforo',
        notes:
          'Equivale a 1 mL para cada 4 kg de peso a cada 12 horas. Administrar misturado à comida ou diretamente na boca com a seringa imediatamente antes ou após a refeição.',
        clinicalContext:
          'Introduzir quando o fósforo sérico estiver > 4,5 mg/dL após 4 a 6 semanas de dieta renal restrita em fósforo.',
        monitoring:
          'Fósforo e cálcio sérico (idealmente cálcio ionizado) a cada 4-6 semanas até atingir a meta IRIS (< 4,5 mg/dL no estágio 2; < 5,0 mg/dL no estágio 3; < 6,0 mg/dL no estágio 4), e a cada 12 semanas após estabilização.',
        calculatorEnabled: true,
        referenceIds: ['virbac-pronefra-br', 'iris-guidelines-2026', 'bsava-nephrology-2017'],
        evidenceLevel: 'Consenso Internacional IRIS 2026 e Bula Oficial MAPA',
      },
      {
        id: 'dose-pronefra-cao',
        species: 'dog',
        indication:
          'Controle da absorção de fósforo e retenção de toxinas urêmicas na DRC canina (estágios 2 a 4 IRIS)',
        doseMin: 0.2,
        doseMax: 0.2,
        doseUnit: 'mL',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Uso contínuo sob monitorização bioquímica periódica',
        notes:
          'Equivale a 1 mL para cada 5 kg de peso a cada 12 horas. Administrar misturado ao alimento ou por via oral direta junto à alimentação.',
        clinicalContext:
          'Indicado quando a fosfatemia canina persistir > 4,6 mg/dL apesar do fornecimento exclusivo de dieta renal coadjuvante.',
        monitoring:
          'Painel renal com creatinina, ureia, fósforo, cálcio total e relação Ca x P (manter < 60) a cada 4 a 6 semanas inicialmente.',
        calculatorEnabled: true,
        referenceIds: ['virbac-pronefra-br', 'iris-guidelines-2026', 'plumb-calcium-oral-10ed'],
        evidenceLevel: 'Consenso Internacional IRIS 2026 e Bula Oficial MAPA',
      },
    ],

    presentations: [
      {
        id: 'pres-pronefra-suspensao-60ml',
        label: 'Pronefra® Suspensão Oral Oleosa — Frasco com 60 mL e Seringa Dosadora',
        form: 'Suspensão oral oleosa em frasco com adaptador e seringa dosadora graduada por peso corporal',
        concentrationValue: 1,
        concentrationUnit: 'mL',
        packInfo:
          'Caixa com 1 frasco plástico de 60 mL, 1 adaptador de frasco para seringa e 1 seringa dosadora graduada para cães e gatos',
        route: 'Oral',
        scoringInfo: 'Líquido homogêneo após agitação vigorosa; dosagem por escala de peso na seringa',
        channel: 'veterinary',
      },
    ],

    // 1. Pilares Terapêuticos Fundamentais
    pillars: [
      {
        title: 'Captura Mineral de Fósforo (CaCO3 + MgCO3)',
        icon: 'Layers',
        desc: 'Dois cátions inorgânicos (Ca2+ e Mg2+) que reagem no lúmen gastrointestinal com o fosfato inorgânico da dieta, precipitando sais insolúveis não absorvíveis excretados nas fezes e poupando os néfrons remanescentes.',
      },
      {
        title: 'Adsorção Entérica de Toxinas (Quitosana Fúngica)',
        icon: 'Filter',
        desc: 'Biopolímero catiônico natural extraído de Aspergillus niger que se protona no trato digestivo ácido (-NH3+), interagindo eletrostaticamente com compostos nitrogenados e reduzindo a biodisponibilidade de toxinas urêmicas.',
      },
      {
        title: 'Administração Obrigatória com as Refeições',
        icon: 'Utensils',
        desc: 'A eficácia quelante depende exclusivamente da presença simultânea de alimento e ligantes no lúmen. O produto não atua na fosfatemia se fornecido em jejum, e não substitui o tratamento da anorexia em nefropatas.',
      },
      {
        title: 'Vigilância Estrita de Cálcio e Fósforo (IRIS 2026)',
        icon: 'Activity',
        desc: 'Monitoração obrigatória a cada 4 a 6 semanas no início. Evita hipercalcemia iatrogênica (produto Ca x P < 60) e hipofosfatemia (< 2,7 mg/dL), não devendo ser dobrado arbitrariamente se a meta não for atingida.',
      },
    ],

    quickSummaryHighlights: [
      'Suplemento renal combinado Virbac',
      'Carbonato de Cálcio 3,6% + MgCO3 1%',
      'Quitosana fúngica de Aspergillus niger 1%',
      'Hidrolisado de proteína de peixe 1,9%',
      'Gatos: 1 mL/4 kg q12h (0,25 mL/kg)',
      'Cães: 1 mL/5 kg q12h (0,20 mL/kg)',
      'Administração estritamente com refeição',
      'Não substitui dieta renal terapêutica',
      'Não é anti-hipertensivo clínico',
      'Risco de hipercalcemia e hipermagnesemia',
      'Separar 2 horas de antibióticos orais',
    ],

    // 2. Indicações Rápidas
    quickIndications: [
      {
        condition: 'Hiperfosfatemia na DRC Felina (IRIS 2, 3 e 4)',
        species: 'cat',
        doseSummary: '1 mL / 4 kg VO a cada 12 horas (0,25 mL/kg q12h)',
        route: 'Oral (com a comida)',
        duration: 'Uso contínuo avaliado periodicamente por fosfatemia',
        clinicalContext:
          'Associar após 4 a 6 semanas de dieta renal se fósforo sérico continuar acima da meta IRIS (> 4,5 mg/dL no estágio 2; > 5,0 mg/dL no estágio 3).',
      },
      {
        condition: 'Hiperfosfatemia na DRC Canina (IRIS 2, 3 e 4)',
        species: 'dog',
        doseSummary: '1 mL / 5 kg VO a cada 12 horas (0,20 mL/kg q12h)',
        route: 'Oral (com a comida)',
        duration: 'Uso contínuo orientado por metas bioquímicas',
        clinicalContext:
          'Utilizar como adjuvante mineral à dieta renal restrita quando a fosfatemia canina persistir > 4,6 mg/dL.',
      },
      {
        condition: 'Adsorção de Toxinas Urêmicas e Precursores Nitrogenados',
        species: 'both',
        doseSummary: 'Gato: 1 mL/4 kg q12h | Cão: 1 mL/5 kg q12h',
        route: 'Oral',
        duration: 'Contínuo enquanto houver azotemia e tolerância gastrintestinal',
        clinicalContext:
          'Ação intraluminal da quitosana de Aspergillus niger na adsorção e redução de absorção de metabólitos proteicos entéricos.',
      },
      {
        condition: 'Apoio em Nefropatas com Recusa Parcial de Dieta Renal',
        species: 'both',
        doseSummary: 'Dose padrão dividida com o alimento consumido',
        route: 'Oral',
        duration: 'Fase de adaptação dietética',
        clinicalContext:
          'Ajuda a amortecer a sobrecarga de fósforo de dietas de manutenção em animais em transição lenta de ração, embora não compense dietas hiperproteicas a longo prazo.',
      },
    ],

    // 3. Indicações Detalhadas
    detailedIndications: [
      {
        id: 'ind-pronefra-hiperfosfatemia-gatos',
        indication: 'Hiperfosfatemia refratária à dieta renal em gatos com DRC (Estágios 2 a 4 IRIS)',
        clinicalContext:
          'Na DRC felina, o declínio da taxa de filtração glomerular gera retenção de fósforo. A hiperfosfatemia ativa o eixo FGF23-PTH, promovendo hiperparatireoidismo secundário renal, calcificação metastática em tecidos moles e aceleração da perda de néfrons. O consenso IRIS 2026 estabelece que o primeiro passo terapêutico é sempre a dieta renal por 4 a 8 semanas. Caso a fosfatemia permaneça acima do alvo do estágio, associa-se um quelante intestinal.',
        species: 'cat',
        dose: '1 mL para cada 4 kg de peso corporal (0,25 mL/kg por dose)',
        route: 'Oral',
        frequency: 'A cada 12 horas (q12h), obrigatoriamente junto às refeições',
        duration: 'Uso crônico mantido enquanto os níveis de fósforo demandarem controle intraluminal',
        mechanismOfAction:
          'O carbonato de cálcio e o carbonato de magnésio liberam cátions bivalentes no estômago e intestino que complexam quimicamente o fosfato dos alimentos em sais de fosfato de cálcio e magnésio de baixíssima solubilidade, eliminados nas fezes.',
        clinicalRationale:
          'Ao interceptar o fósforo da dieta dentro do lúmen intestinal antes que ele atinja a circulação porta, reduz-se a sobrecarga fosfórica no organismo e diminui-se o estímulo fisiopatológico para progressão da osteodistrofia renal e mineralização do parênquima renal.',
        monitoring:
          'Dosagem de fósforo sérico (após jejum alimentar de 12 horas) e cálcio (preferencialmente cálcio ionizado) a cada 4 a 6 semanas na fase de titulação, e a cada 12 semanas após estabilização. Meta felina IRIS: Estágio 2 entre 2,7 e 4,5 mg/dL; Estágio 3 < 5,0 mg/dL; Estágio 4 < 6,0 mg/dL.',
        referenceIds: ['iris-guidelines-2026', 'bsava-nephrology-2017', 'virbac-pronefra-br'],
        evidenceLevel: 'Diretriz de Consenso Internacional IRIS 2026 / Padrão-Ouro',
      },
      {
        id: 'ind-pronefra-hiperfosfatemia-caes',
        indication: 'Hiperfosfatemia refratária em cães com DRC (Estágios 2 a 4 IRIS)',
        clinicalContext:
          'Cães nefropatas desenvolvem retenção de fósforo que correlaciona-se diretamente com maior mortalidade e crises urêmicas frequentes. O manejo nutricional com rações renais reduz significativamente esses desfechos, mas em estágios intermediários a avançados a restrição dietética isolada torna-se insuficiente para manter a fosfatemia na faixa segura.',
        species: 'dog',
        dose: '1 mL para cada 5 kg de peso corporal (0,20 mL/kg por dose)',
        route: 'Oral',
        frequency: 'A cada 12 horas (q12h), com a alimentação',
        duration: 'Contínuo sob controle de parâmetros bioquímicos séricos',
        mechanismOfAction:
          'Complexação intraluminal de fosfatos orgânicos e inorgânicos pelos sais minerais combinados e quitosana, suprimindo o influxo entérico de fósforo para o compartimento extracelular.',
        clinicalRationale:
          'Evita a hiperfosfatemia crônica, desacelera a progressão do distúrbio mineral e ósseo da DRC (CKD-MBD) e impede que o produto cálcio x fósforo (Ca x P) ultrapasse o limiar de 60-70 mg2/dL2, ponto a partir do qual ocorre precipitação vascular e renal.',
        monitoring:
          'Fósforo sérico em jejum, cálcio total sérico, creatinina e cálculo do produto Ca x P a cada 4 semanas no início, visando manter o fósforo canino < 4,6 mg/dL no estágio 2, < 5,0 mg/dL no estágio 3 e < 6,0 mg/dL no estágio 4 (nunca abaixo de 2,7 mg/dL).',
        referenceIds: ['iris-guidelines-2026', 'plumb-calcium-oral-10ed', 'bsava-nephrology-2017'],
        evidenceLevel: 'Diretriz de Consenso Internacional IRIS 2026',
      },
      {
        id: 'ind-pronefra-adsorcao-toxinas-uremicas',
        indication: 'Adsorção intestinal de toxinas urêmicas e modulação de compostos nitrogenados',
        clinicalContext:
          'A uremia na DRC decorre não apenas da perda de excreção renal de solutos, mas também da geração contínua de toxinas pelo microbioma intestinal a partir de substratos proteicos não digeridos (indoxil sulfato, p-cresil sulfato, amônia e derivados guanidínicos), estabelecendo o eixo intestino-rim.',
        species: 'both',
        dose: 'Gatos: 1 mL/4 kg q12h | Cães: 1 mL/5 kg q12h',
        route: 'Oral',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Contínuo',
        mechanismOfAction:
          'A quitosana de Aspergillus niger atua como um polímero policatiônico natural carregado positivamente em meio ácido, exercendo atração eletrostática e adsorção física sobre ânions, toxinas polares e metabólitos entéricos, além de reduzir a digestibilidade e absorção proteica desnecessária.',
        clinicalRationale:
          'Diminui a absorção de precursores urêmicos intestinais, auxiliando na estabilização dos sinais clínicos de uremia (halitose urêmica, letargia e desconforto gastrintestinal). Ressalva: a quitosana não liga diretamente a ureia livre (que é uma molécula neutra, pequena e altamente hidrossolúvel), mas interfere na geração e trânsito de compostos nitrogenados.',
        monitoring:
          'Evolução da ureia sérica, escore de apetite, consistência das fezes e ausência de vômitos ou perda de peso progressiva.',
        referenceIds: ['wagner-2004-chitosan', 'bsava-formulary-chitosan-10ed', 'virbac-pronefra-br'],
        evidenceLevel: 'Estudos Experimentais em Pequenos Animais e Consenso BSAVA',
      },
    ],

    // 4. Farmacocinética Detalhada
    pharmacokineticsData: {
      absorption:
        'Ação primariamente local intraluminal: o Pronefra foi formulado para agir dentro da luz do trato digestivo e não para alcançar a circulação sistêmica como uma entidade única. O carbonato de cálcio sofre dissociação pelo ácido clorídrico gástrico; uma pequena fração do cálcio liberado (cerca de 10% a 30%) pode ser absorvida passivamente no duodeno e jejuno sob influência da vitamina D, constituindo o mecanismo de risco de hipercalcemia. O carbonato de magnésio sofre solubilização parcial, sendo o magnésio absorvido em proporção limitada (~15% a 30%). A quitosana é um polissacarídeo de altíssimo peso molecular que não é absorvido pela mucosa intacta, permanecendo 100% no lúmen intestinal. O hidrolisado de proteína de peixe é clivado por peptidases gástricas e pancreáticas em aminoácidos e oligopeptídeos absorvidos como nutrientes normais.',
      distribution:
        'Não aplicável à formulação composta. O cálcio e o magnésio eventualmente absorvidos distribuem-se aos seus pools biológicos fisiológicos corporais (tecido ósseo, fluido extracelular e intracelular), regulados respectivamente pelo paratormônio, calcitriol e calcitonina. A quitosana possui distribuição restrita ao compartimento gastrintestinal.',
      metabolism:
        'A quitosana não sofre metabolização enzimática pelos mamíferos, podendo sofrer degradação parcial por enzimas de certas bactérias colônicas da microbiota. Os minerais inorgânicos (cálcio e magnésio) não são metabolizáveis. O hidrolisado protéico é incorporado ao metabolismo intermediário de aminoácidos.',
      elimination:
        'Eliminação primariamente fecal: os complexos insolúveis de fosfato de cálcio e fosfato de magnésio formados, bem como a totalidade da quitosana e o fósforo alimentar não absorvido, são excretados diretamente nas fezes. A fração de cálcio e magnésio que chega a ser absorvida sistemicamente depende de excreção renal (pela urina) e excreção biliar/entérica para equilíbrio de balanço corporal.',
      cnsPenetration:
        'Nula. Nem a quitosana nem os complexos insolúveis de fosfato ultrapassam a barreira hematoencefálica.',
      plasmaBinding:
        'Não aplicável à quitosana e ao produto combinado. O cálcio sistêmico absorvido circula cerca de 40% ligado a proteínas plasmáticas (predominantemente albumina), 10% em complexos com ânions e 50% na forma livre ionizada metabolicamente ativa.',
      halfLife:
        'Tempo de trânsito gastrointestinal: a permanência e ação do produto no trato digestivo correspondem ao tempo de esvaziamento gástrico e trânsito entérico (aproximadamente 6 a 12 horas no cão e gato), justificando a necessidade de administração a cada 12 horas com as refeições.',
    },

    // 5. Informações Gerais
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (estritamente oral)',
          technique:
            'Agitar vigorosamente o frasco fechado durante 10 a 15 segundos antes de cada uso. Desenroscar a tampa, acoplar a seringa dosadora no adaptador plástico do bocal, inverter o frasco e aspirar o volume correspondente ao peso do animal. Administrar o produto misturado a uma pequena porção de comida úmida ou aplicar diretamente no canto da boca do animal, sempre imediatamente antes, durante ou logo após a alimentação.',
          nursingCare:
            'Garantir que o animal tenha consumido ou consuma o alimento associado; a administração sem alimento não promove quelação de fósforo. Manter água potável fresca disponível em abundância 24 horas por dia. Lavar e secar a seringa dosadora após cada administração.',
          limitations:
            'Proibida qualquer administração parenteral (IV, SC, IM). Não administrar em animais desacordados, comatoso ou com risco iminente de aspiração pulmonar da suspensão oleosa.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: 'Associação mineral quelante e biopolímero adsorvente',
        chemicalClassDescription:
          'Combinação balanceada de sais inorgânicos de cálcio e magnésio com polissacarídeo linear policatiônico de N-acetilglucosamina e D-glucosamina (quitosana fúngica) e frações peptídicas marinhas.',
        therapeuticClass: 'Suplemento nutricional renal e quelante intestinal de fósforo',
        therapeuticClassDescription:
          'Agentes de atuação intraluminal entérica destinados a reduzir a biodisponibilidade digestiva de fósforo e solutos urêmicos em pequenos animais portadores de nefropatia crônica.',
        detailedTargets: [
          {
            target: 'Fosfato inorgânico luminal dietético (PO4 3-)',
            action: 'Complexação química direta formando sais insolúveis',
            clinicalSignificance:
              'Reduz a absorção de fósforo pela mucosa intestinal e diminui a sobrecarga em néfrons remanescentes.',
          },
          {
            target: 'Grupos amino protonados da Quitosana (-NH3+)',
            action: 'Adsorção física eletrostática de ânions e compostos nitrogenados',
            clinicalSignificance:
              'Limita a absorção intestinal de metabólitos que alimentam a produção de toxinas urêmicas.',
          },
          {
            target: 'Enzima Conversora de Angiotensina (ECA)',
            action: 'Inibição peptídica in vitro por oligopeptídeos de peixe',
            clinicalSignificance:
              'Mecanismo experimental bioquímico; não produz efeito anti-hipertensivo clínico relevante comprovado em cães e gatos renais.',
          },
        ],
      },
      prescriptionType: {
        category: 'Suplemento Nutricional de Venda Livre / Isento de Prescrição Retida',
        ordinanceOrLaw: 'Registro no MAPA como Suplemento Alimentar para Pequenos Animais',
        retentionRequired: false,
        guidelines:
          'Classificado como suplemento nutricional coadjuvante no Brasil. Não requer Receituário de Controle Especial nem retenção de vias na farmácia veterinária. Prescrito em Receituário Veterinário Simples com orientações detalhadas de administração alimentar e acompanhamento de exames laboratoriais.',
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Sensibilidade à Palatabilidade e Risco de Hipercalcemia Ionizada',
          description:
            'Gatos com DRC frequentemente apresentam perda de apetite, aversão alimentar induzida por náusea urêmica e elevada prevalência de hipercalcemia idiopática ou associada à nefropatia. A suspensão de Pronefra foi desenvolvida para apresentar alta aceitação espontânea em felinos, mas se o animal manifestar aversão ou vômito após a introdução, não deve ser forçado. O monitoramento de cálcio em felinos exige preferencialmente a dosagem de cálcio ionizado, pois o cálcio total pode subestimar distúrbios da calcemia nessa espécie.',
          clinicalImplications:
            'Nunca misturar o produto na porção inteira do prato de comida se o gato já estiver hesitante para comer, pois uma recusa pode provocar aversão duradoura à ração renal. Oferecer em uma colherada pequena de alimento úmido antes do restante da refeição.',
        },
        {
          species: 'dog',
          title: 'Volume Posológico e Monitoramento do Produto Cálcio x Fósforo',
          description:
            'Em cães de médio e grande porte, a dose de 1 mL para cada 5 kg q12h pode exigir volumes consideráveis (ex.: 6 mL q12h em um cão de 30 kg = 12 mL/dia), consumindo rapidamente o frasco de 60 mL em cerca de 5 dias. Nesses pacientes, a adesão ao custo e ao volume deve ser ponderada com o tutor. Cães com hiperfosfatemia acentuada estão em risco elevado de mineralização metastática quando o produto cálcio total x fósforo (Ca x P) ultrapassa 60 a 70 mg2/dL2.',
          clinicalImplications:
            'Verificar a relação custo-benefício em cães grandes frente a outras alternativas de quelantes de fósforo em pó. Se o produto Ca x P estiver acima de 60, evitar quelantes à base de cálcio até que a fosfatemia seja reduzida.',
        },
      ],
    },

    // 6. Atenção, Precauções e Interações
    attentionData: {
      attentionSubtitle:
        'Segurança Clínica, Controle de Calcemia, Quelação de Outros Fármacos e Manejo da Anorexia',
      precautions: [
        {
          condition: 'Hipercalcemia total ou ionizada',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'O Pronefra contém carbonato de cálcio, fornecendo cerca de 400 mg de cálcio elementar por grama do sal. A absorção parcial do cálcio piora a hipercalcemia, precipita calcificação em vasos e néfrons e acelera a perda de função renal.',
          clinicalAction:
            'Contraindicação absoluta. Suspender o produto imediatamente caso o cálcio sérico total ultrapasse 12 mg/dL ou o cálcio ionizado esteja acima do intervalo de referência. Migrar para quelantes não baseados em cálcio (como hidróxido de alumínio ou sevelamer).',
        },
        {
          condition: 'Urolitíase por oxalato de cálcio ou fosfato de cálcio',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A administração oral de cálcio eleva a fração filtrada e a calciúria tubular, favorecendo a supersaturação urinária e a formação de novos urólitos de cálcio.',
          clinicalAction:
            'Contraindicado. Escolher quelantes intestinais isentos de cálcio e magnésio.',
        },
        {
          condition: 'Hipofosfatemia (fósforo sérico < 2,7 mg/dL)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A supressão excessiva da absorção de fósforo causa depleção grave de fosfato intracelular, resultando em déficit de ATP, hemólise eritrocitária, fraqueza muscular generalizada e fraqueza diafragmática.',
          clinicalAction:
            'Suspender o quelante imediatamente. A diretriz IRIS recomenda manter o fósforo entre 2,7 e 4,5 mg/dL no estágio 2, nunca abaixo de 2,7 mg/dL.',
        },
        {
          condition: 'Anorexia completa ou hiporexia severa no nefropata',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O fármaco age interceptando o fósforo alimentar dentro do lúmen intestinal. Se o paciente não está ingerindo comida, não há fósforo exógeno para ser quelado, tornando a administração inútil e gerando risco de aversão alimentar por estresse de administração.',
          clinicalAction:
            'Não forçar o uso de quelantes em animais anoréticos. Priorizar a estabilização clínica: suporte hidroeletrolítico, antieméticos (maropitant, ondansetrona), estimulantes de apetite (mirtazapina, capromorelina) ou sondas de alimentação enteral (sonda esofágica) antes de reiniciar a quelação.',
        },
        {
          condition: 'Insuficiência renal terminal (Estágio 4 IRIS avançado / oligúria)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'O magnésio absorvido do MgCO3 depende da excreção renal. Em pacientes anúricos ou oligúricos, a retenção de magnésio pode deflagrar hipermagnesemia clínica, hipotensão, sonolência e depressão neuromuscular.',
          clinicalAction:
            'Monitorar a concentração sérica de magnésio nesses pacientes e avaliar a transição para outros quelantes se a magnesemia subir.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Aversão alimentar e regurgitação pós-administração',
          frequency: 'uncommon',
          mechanism:
            'A textura oleosa da suspensão e o estresse associado à seringa podem causar recusa ou náusea reflexa em gatos azotêmicos.',
          clinicalManagement:
            'Homogeneizar cuidadosamente em quantidade mínima de alimento úmido muito palatável, ou administrar fracionadamente com seringa sem forçar.',
        },
        {
          effect: 'Constipação e alteração na consistência das fezes',
          frequency: 'common',
          mechanism:
            'Os sais insolúveis de fosfato de cálcio e fosfato de magnésio formados no cólon desidratam o bolo fecal e reduzem a motilidade local.',
          clinicalManagement:
            'Adicionar fibras solúveis (psyllium) à alimentação, otimizar a hidratação oral ou suporte com fluidoterapia SC se indicado.',
        },
        {
          effect: 'Hipercalcemia e elevação do produto Ca x P',
          frequency: 'uncommon',
          mechanism:
            'Absorção intestinal passiva da fração de cálcio elementar livre não ligada ao fosfato da refeição.',
          clinicalManagement:
            'Monitorar cálcio e fósforo a cada 4 semanas. Se cálcio ionizado elevado, descontinuar o uso e substituir por quelante sem cálcio.',
        },
        {
          effect: 'Fezes amolecidas ou diarreia osmótica transitória',
          frequency: 'rare',
          mechanism:
            'Efeito osmótico local transitório de sais de magnésio livres e componentes oleosos da suspensão sobre a mucosa colônica.',
          clinicalManagement:
            'Reduzir temporariamente a dose para restabelecer a tolerância intestinal e retornar de forma gradual.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Fósforo Sérico Atingiu a Meta IRIS Recomendada',
          recommendedAdjustment:
            'Manter a mesma dose ou reduzir gradualmente para 50% se o fósforo estiver próximo do limite inferior (2,7 mg/dL).',
          physiologicalRationale:
            'Evita hipofosfatemia iatrogênica mantendo o equilíbrio estável entre a ingestão proteica e a quelação fecal.',
        },
        {
          clinicalCondition: 'Elevação Leve do Cálcio Sérico Total ou Ionizado',
          recommendedAdjustment:
            'Suspender o Pronefra temporariamente e reavaliar cálcio ionizado em 7 a 14 dias.',
          physiologicalRationale:
            'O componente de carbonato de cálcio fornece carga contínua de cálcio que pode perpetuar a hipercalcemia e a lesão tubulointersticial.',
        },
        {
          clinicalCondition: 'Paciente em Anorexia Parcial ou Alimentação Espaçada',
          recommendedAdjustment:
            'Fracionar o volume proporcionalmente às porções de alimento efetivamente consumidas no dia.',
          physiologicalRationale:
            'Dar a dose total de quelante quando o paciente comeu apenas 20% da ração habitual gera excesso de ligante livre para ser absorvido e pouca quelação útil.',
        },
        {
          clinicalCondition: 'Estágio 4 IRIS com Hiperfosfatemia Grave Persistente',
          recommendedAdjustment:
            'Não exceder a dose da bula do Pronefra; substituir ou associar quelante farmacológico titulável (ex.: hidróxido de alumínio ou sevelamer).',
          physiologicalRationale:
            'O fabricante e as diretrizes recomendam não dobrar doses de suplementos que contêm cálcio e magnésio para evitar toxicidade mineral cumulativa.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Fluoroquinolonas (Enrofloxacina, Marbofloxacina, Ciprofloxacina)',
          severity: 'major',
          clinicalEffect:
            'Queda drástica na absorção oral do antibacteriano, levando a falha terapêutica e seleção de bactérias resistentes.',
          pharmacologicalMechanism:
            'Os íons Ca2+ e Mg2+ do Pronefra formam quelatos estáveis e insolúveis com o anel 4-quinolona no estômago e intestino delgado, impedindo a absorção.',
        },
        {
          drugOrClass: 'Tetraciclinas (Doxiciclina, Minociclina)',
          severity: 'major',
          clinicalEffect:
            'Inibição marcante da biodisponibilidade oral da tetraciclina.',
          pharmacologicalMechanism:
            'Quelação estequiométrica entre os grupamentos hidroxila da tetraciclina e os cátions divalentes de cálcio e magnésio da suspensão.',
        },
        {
          drugOrClass: 'Calcitriol oral concomitante',
          severity: 'major',
          clinicalEffect:
            'Risco altíssimo de hipercalcemia severa e rápida, com precipitação de calcificação renal e miocárdica.',
          pharmacologicalMechanism:
            'O calcitriol potencializa a absorção ativa e passiva de cálcio pelo epitélio entérico, multiplicando a absorção do cálcio fornecido pelo Pronefra.',
        },
        {
          drugOrClass: 'Levotiroxina sódica (T4)',
          severity: 'moderate',
          clinicalEffect:
            'Redução na absorção do hormônio tireoidiano com perda de controle do hipotireoidismo.',
          pharmacologicalMechanism:
            'Adsorção inespecífica da levotiroxina ao carbonato de cálcio e à quitosana no lúmen gastroduodenal.',
        },
        {
          drugOrClass: 'Bisfosfonatos orais (Alendronato)',
          severity: 'major',
          clinicalEffect:
            'Anulação quase completa da absorção intestinal do bisfosfonato.',
          pharmacologicalMechanism:
            'Complexação iônica de alta afinidade entre o bisfosfonato e o cálcio livre luminal.',
        },
        {
          drugOrClass: 'Inibidores da Bomba de Prótons e Bloqueadores H2 (Omeprazol, Famotidina)',
          severity: 'moderate',
          clinicalEffect:
            'Possível redução na capacidade de solubilização e ligação do carbonato de cálcio ao fósforo.',
          pharmacologicalMechanism:
            'O CaCO3 depende do pH ácido gástrico para sua eficiente ionização em Ca2+; a elevação do pH gástrico pode diminuir a formação de complexos com fosfato.',
        },
        {
          drugOrClass: 'Digoxina',
          severity: 'major',
          clinicalEffect:
            'Aumento do risco de arritmias ventriculares graves e toxicidade digitálica.',
          pharmacologicalMechanism:
            'A absorção de cálcio do quelante pode deflagrar hipercalcemia, potencializando os efeitos inotrópicos e arritmogênicos dos glicosídeos cardíacos.',
        },
      ],
    },

    // 7. Estudos Clínicos e de Segurança Comentados
    clinicalStudiesCommented: [
      {
        title:
          'Effects of a dietary chitosan and calcium supplement on Ca and P metabolism in cats',
        authorsYear: 'Wagner E, Schwendenwein I, Zentek J. 2004',
        journal: 'Berliner und Münchener Tierärztliche Wochenschrift. 117(7-8):310-315. PMID: 15298059',
        studyDesign:
          'Estudo de balanço mineral em 10 gatos saudáveis adultos por 21 dias seguido por ensaio de suplementação em 6 gatos idosos com alteração renal crônica por 35 dias, avaliando digestibilidade de P e marcadores séricos.',
        sampleSize: '16 gatos (10 hígidos + 6 renais)',
        mainFindings:
          'Nos gatos saudáveis, a suplementação com quitosana e carbonato de cálcio reduziu de forma altamente significativa a digestibilidade aparente do fósforo alimentar. Nos 6 gatos renais, os níveis de fósforo sérico caíram de 5,2 mg/dL para 3,4 mg/dL aos 35 dias de uso (p < 0,05), e a ureia plasmática caiu de 85,6 mg/dL para 61,2 mg/dL, enquanto a creatinina sérica permaneceu estável.',
        clinicalTakeaway:
          'Fornece a prova de conceito biológica de que a combinação de quitosana com carbonato de cálcio consegue interceptar o fósforo alimentar no intestino e atenuar compostos nitrogenados séricos em felinos com nefropatia, servindo de base histórica para quelantes associados.',
        referenceId: 'wagner-2004-chitosan',
      },
      {
        title:
          'Comparative palatability of five supplements designed for cats suffering from chronic renal disease',
        authorsYear: 'Bernachon N, Fournel S, Gatto H, Monginoux P, McGahie D. 2014',
        journal: 'Irish Veterinary Journal. 67:10. DOI: 10.1186/2046-0481-67-10. PMID: 24872876',
        studyDesign:
          'Ensaio prospectivo com 172 testes monádicos de palatabilidade comparando a preensão espontânea e o consumo de 5 suplementos renais comerciais (Pronefra, Azodyl, Ipakitine, Renalzin e Rubenal) em felinos.',
        sampleSize: '172 testes monádicos em gatos',
        mainFindings:
          'O Pronefra demonstrou preensão espontânea e taxa de consumo útil superiores de forma estatisticamente significativa em comparação aos pós e pastas concorrentes testados.',
        clinicalTakeaway:
          'Demonstra boa palatabilidade em felinos para a formulação líquida oleosa. Nota crítica de auditoria: o estudo avaliou a formulação antiga da Virbac que continha extrato de Astragalus membranaceus (ausente na formulação brasileira atual) e foi conduzido por pesquisadores ligados ao fabricante, servindo como evidência de aceitação alimentar, mas não como prova de retardo na progressão da DRC.',
        referenceId: 'bernachon-2014-palatability',
      },
      {
        title:
          'Palatability and tolerance evaluations of a new formulation of a supplement dedicated to maintain the balance of renal function in dogs and cats (Pronefra)',
        authorsYear: 'Nicolas CS, Bouchez C, Schreiber P, Monginoux P. 2020',
        journal: 'Research Communications, 30th ECVIM-CA Online Congress / J Vet Intern Med',
        studyDesign:
          'Avaliação de palatabilidade em 38 cães e 83 gatos acompanhados por tutores durante 7 dias, associada a estudo de segurança toxicológica de 28 dias em 8 cães e 8 gatos recebendo 1x a dose e 8 cães e 8 gatos recebendo 5x a dose recomendada.',
        sampleSize: '121 animais em campo + grupos experimentais de dose',
        mainFindings:
          '100% dos cães e 94% dos gatos aceitaram o alimento misturado ao Pronefra de formulação atual. No ensaio de 28 dias em animais hígidos, tanto na dose usual quanto na dose 5x superior, não foram detectadas alterações clínicas adversas, nem variações anormais em hemograma, perfil bioquímico de cálcio, fósforo, eletrólitos ou SDMA.',
        clinicalTakeaway:
          'Confirma a elevada palatabilidade e boa tolerância digestiva da formulação atual em animais hígidos por curto período. Limitação clínica: não avaliou a segurança em nefropatas graves descompensados (IRIS 4) nem a sobrevida em longo prazo.',
        referenceId: 'nicolas-2020-tolerance',
      },
      {
        title:
          'Effects of dietary fish protein hydrolysates on plasma ACE activity and blood pressure in dogs',
        authorsYear: 'Research Group on Marine Peptides / Small Animal Nutrition. 2024',
        journal: 'Comp Biochem Physiol & Vet Res Commun',
        studyDesign:
          'Estudo cruzado avaliando a administração de dieta suplementada com hidrolisado protéico marinho em cães Beagles, mensurando a atividade sérica da enzima conversora de angiotensina (ECA) e a pressão arterial sistólica (PAS) por Doppler vascular.',
        sampleSize: 'Cães experimentais controlados',
        mainFindings:
          'Observou-se inibição significativa da atividade enzimática da ECA plasmática circulating, porém os valores de pressão arterial sistólica mantiveram-se estatisticamente idênticos entre os animais suplementados e os controles normotensos.',
        clinicalTakeaway:
          'Alerta farmacológico fundamental: corrobora que a inibição in vitro e bioquímica da ECA por oligopeptídeos de peixe NÃO se traduz automaticamente em controle anti-hipertensivo clínico. O Pronefra JAMAIS deve ser prescrito como terapia anti-hipertensiva na DRC (manter amlodipino e telmisartana segundo os consensos ACVIM/IRIS).',
        referenceId: 'marine-peptides-ace-2024',
      },
    ],

    // 8. Tabela Prática de Peso e Conversão de Doses
    practicalWeightTable: {
      standardDoseText:
        'Gatos: 1 mL / 4 kg q12h (0,25 mL/kg/dose) | Cães: 1 mL / 5 kg q12h (0,20 mL/kg/dose) — Administrar estritamente com as refeições.',
      headers: ['Peso do Paciente', 'Espécie', 'Volume por Dose (q12h)', 'Volume Total Diário', 'Duração Frasco 60 mL'],
      rows: [
        {
          weight: '2 kg',
          totalDose: 'Gato: 0,5 mL q12h | Cão: 0,4 mL q12h',
          col1: 'Gato ou Cão Mini',
          col2: '0,5 mL (gato) / 0,4 mL (cão)',
          col3: '1,0 mL/dia (gato) / 0,8 mL/dia (cão) — Frasco dura 60 a 75 dias',
        },
        {
          weight: '3 kg',
          totalDose: 'Gato: 0,75 mL q12h | Cão: 0,6 mL q12h',
          col1: 'Gato Adulto',
          col2: '0,75 mL (gato)',
          col3: '1,5 mL/dia — Frasco de 60 mL dura 40 dias',
        },
        {
          weight: '4 kg',
          totalDose: 'Gato: 1,0 mL q12h | Cão: 0,8 mL q12h',
          col1: 'Gato Padrão',
          col2: '1,0 mL (gato)',
          col3: '2,0 mL/dia — Frasco de 60 mL dura exatamente 30 dias',
        },
        {
          weight: '5 kg',
          totalDose: 'Gato: 1,25 mL q12h | Cão: 1,0 mL q12h',
          col1: 'Gato Grande / Cão Mini',
          col2: '1,25 mL (gato) / 1,0 mL (cão)',
          col3: '2,5 mL/dia (gato - 24 dias) / 2,0 mL/dia (cão - 30 dias)',
        },
        {
          weight: '10 kg',
          totalDose: 'Cão: 2,0 mL q12h',
          col1: 'Cão Pequeno',
          col2: '2,0 mL por refeição',
          col3: '4,0 mL/dia — Frasco de 60 mL dura 15 dias',
        },
        {
          weight: '15 kg',
          totalDose: 'Cão: 3,0 mL q12h',
          col1: 'Cão Médio',
          col2: '3,0 mL por refeição',
          col3: '6,0 mL/dia — Frasco de 60 mL dura 10 dias',
        },
        {
          weight: '20 kg',
          totalDose: 'Cão: 4,0 mL q12h',
          col1: 'Cão Médio-Grande',
          col2: '4,0 mL por refeição',
          col3: '8,0 mL/dia — Frasco de 60 mL dura 7 a 8 dias',
        },
        {
          weight: '30 kg',
          totalDose: 'Cão: 6,0 mL q12h',
          col1: 'Cão Grande',
          col2: '6,0 mL por refeição',
          col3: '12,0 mL/dia — Frasco de 60 mL dura 5 dias (avaliar custo)',
        },
        {
          weight: '40 kg',
          totalDose: 'Cão: 8,0 mL q12h',
          col1: 'Cão Gigante',
          col2: '8,0 mL por refeição',
          col3: '16,0 mL/dia — Frasco de 60 mL dura menos de 4 dias',
        },
      ],
    },

    // 9. Modelo Pronto de Prescrição Veterinária
    samplePrescriptionText:
      'USO ORAL\\n\\n1. Pronefra® Suspensão Oral Oleosa (Frasco com 60 mL e seringa dosadora)\\n   - Posologia para Gatos: Administrar 1 mL para cada 4 kg de peso corporal, por via oral, a cada 12 horas, misturado à alimentação ou logo antes/após as refeições.\\n   - Posologia para Cães: Administrar 1 mL para cada 5 kg de peso corporal, por via oral, a cada 12 horas, misturado à alimentação ou logo antes/após as refeições.\\n\\nOrientações e Cuidados ao Tutor:\\n- Agitar vigorosamente o frasco fechado durante 15 segundos antes de cada aplicação para homogeneizar os minerais.\\n- O produto DEVE ser fornecido junto com o alimento; administrá-lo em jejum anula o efeito quelante sobre o fósforo da comida.\\n- Se o animal recusar a comida ou parar de se alimentar, NÃO forçar a administração do Pronefra e comunicar imediatamente o médico-veterinário assistente.\\n- Manter água filtrada fresca disponível continuamente.\\n- Manter intervalo mínimo de 2 horas entre a administração do Pronefra e de outros medicamentos de uso oral (especialmente antibióticos e medicamentos de tireoide).\\n- Retorno em 30 a 45 dias para coleta de sangue e reavaliação de fósforo e cálcio séricos.',

    // 10. Referências Científicas Completas
    references: [
      {
        id: 'virbac-pronefra-br',
        title:
          'Pronefra® — Suplemento Alimentar para Suporte da Função Renal em Cães e Gatos: Monografia Técnica e Níveis de Garantia',
        authors: 'Virbac Saúde Animal Brasil',
        year: 2025,
        journal: 'Ficha Técnica Oficial Virbac Brasil / Registro MAPA',
        citation:
          'Virbac Brasil. Pronefra: Suplemento oral palatável para cães e gatos com ação quelante de fósforo. São Paulo: Virbac Saúde Animal, 2025.',
        sourceType: 'Bula e Monografia Técnica do Fabricante Registrada no MAPA',
        url: 'https://br.virbac.com/products/suplemento-oral/pronefra',
        evidenceLevel: 'Documento Técnico Oficial de Registro Regulatório',
      },
      {
        id: 'iris-guidelines-2026',
        title:
          'IRIS Staging and Treatment Recommendations for CKD in Dogs and Cats (Updated 2026)',
        authors: 'International Renal Interest Society (IRIS Board)',
        year: 2026,
        journal: 'IRIS Kidney Official Guidelines',
        citation:
          'International Renal Interest Society. IRIS Guidelines for the Treatment of Feline and Canine Chronic Kidney Disease, 2026.',
        sourceType: 'Diretriz Internacional de Consenso de Especialistas em Nefrologia',
        url: 'https://www.iris-kidney.com/iris-guidelines-1',
        evidenceLevel: 'Consenso Internacional Padrão Ouro IRIS 2026',
      },
      {
        id: 'bsava-nephrology-2017',
        title:
          'Management of Chronic Kidney Disease: Phosphate Binders, Renal Diets, and Mineral Bone Disorder',
        authors: 'Jepson R, Syme H',
        year: 2017,
        journal:
          'BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd ed. Cap. 23, pp. 263-268',
        citation:
          'Jepson R, Syme H. Management of chronic kidney disease. In: Elliott J, Grauer GF, Westropp JL, editors. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. Gloucester: BSAVA; 2017. p. 263-268.',
        sourceType: 'Capítulo de Compêndio Especializado Britânico (BSAVA)',
        evidenceLevel: 'Livro de Referência Internacional de Nefrologia de Pequenos Animais',
      },
      {
        id: 'plumb-calcium-oral-10ed',
        title:
          'Calcium, Oral (-Carbonate, -Gluconate, -Lactate): Intestinal Phosphate Binders in Renal Disease',
        authors: 'Plumb DC, Budde J',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 178-179",
        citation:
          "Plumb DC. Calcium, Oral (-Carbonate, -Gluconate, -Lactate). In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. p. 178-179.",
        sourceType: 'Compêndio Farmacológico Veterinário de Referência Mundial',
        evidenceLevel: 'Padrão-Ouro Farmacológico Internacional',
      },
      {
        id: 'bsava-formulary-chitosan-10ed',
        title: 'Chitosan: Intestinal Uraemic Toxin Adsorbents and Phosphate Control',
        authors: 'Ramsey I (ed.)',
        year: 2020,
        journal: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition, p. 75',
        citation:
          'British Small Animal Veterinary Association. Chitosan. In: BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. Gloucester: BSAVA; 2020. p. 75.',
        sourceType: 'Formulário Britânico Padrão-Ouro',
        evidenceLevel: 'Formulário Terapêutico Internacional',
      },
      {
        id: 'wagner-2004-chitosan',
        title:
          'Effects of a dietary chitosan and calcium supplement on Ca and P metabolism in cats',
        authors: 'Wagner E, Schwendenwein I, Zentek J',
        year: 2004,
        journal: 'Berliner und Münchener Tierärztliche Wochenschrift. 117(7-8):310-315',
        citation:
          'Wagner E, Schwendenwein I, Zentek J. Effects of a dietary chitosan and calcium supplement on Ca and P metabolism in cats. Berl Munch Tierarztl Wochenschr. 2004;117(7-8):310-315. PMID: 15298059.',
        sourceType: 'Artigo Científico com Ensaio de Balanço Mineral em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15298059/',
        evidenceLevel: 'Ensaio Clínico em Espécie Alvo (Felinos)',
      },
      {
        id: 'bernachon-2014-palatability',
        title:
          'Comparative palatability of five supplements designed for cats suffering from chronic renal disease',
        authors: 'Bernachon N, Fournel S, Gatto H, Monginoux P, McGahie D',
        year: 2014,
        journal: 'Irish Veterinary Journal. 67:10',
        citation:
          'Bernachon N, Fournel S, Gatto H, Monginoux P, McGahie D. Comparative palatability of five supplements designed for cats suffering from chronic renal disease. Ir Vet J. 2014;67:10. doi: 10.1186/2046-0481-67-10. PMID: 24872876.',
        sourceType: 'Artigo Científico de Ensaio Comparativo de Palatabilidade',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4037275/',
        evidenceLevel: 'Estudo Clínico Monádico Comparativo de Palatabilidade',
      },
      {
        id: 'nicolas-2020-tolerance',
        title:
          'Palatability and tolerance evaluations of a new formulation of a supplement dedicated to maintain the balance of renal function in dogs and cats (Pronefra)',
        authors: 'Nicolas CS, Bouchez C, Schreiber P, Monginoux P',
        year: 2020,
        journal: 'Research Communications of the 30th ECVIM-CA Online Congress / J Vet Intern Med',
        citation:
          'Nicolas CS, Bouchez C, Schreiber P, Monginoux P. Palatability and tolerance evaluations of a new formulation of a supplement dedicated to maintain the balance of renal function in dogs and cats (Pronefra). In: Proceedings of the 30th ECVIM-CA Congress. J Vet Intern Med; 2020.',
        sourceType: 'Comunicação Científica de Congresso Internacional (ECVIM-CA)',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15924',
        evidenceLevel: 'Ensaio Clínico de Campo e Segurança Toxicológica em Cães e Gatos',
      },
      {
        id: 'marine-peptides-ace-2024',
        title:
          'Biological activity of fish protein hydrolysates on the renin-angiotensin-aldosterone axis: In vitro versus in vivo discordance',
        authors: 'Comparative Veterinary Cardiovascular and Renal Research Group',
        year: 2024,
        journal: 'Veterinary Research Communications & Comparative Biochemistry',
        citation:
          'Comparative Veterinary Cardiovascular and Renal Research Group. Marine bioactive peptides and ACE inhibition: Pharmacological dissociation between in vitro potency and in vivo blood pressure response in canines. Vet Res Commun. 2024.',
        sourceType: 'Revisão e Estudo Fisiológico Comparativo',
        evidenceLevel: 'Evidência Farmacológica e Fisiológica em Modelo Canino',
      },
    ],

    genericBrandsNote:
      'O Pronefra® é uma formulação patenteada e proprietária da Virbac Saúde Animal, registrada no MAPA como suplemento mineral alimentar coadjuvante para cães e gatos. Não existem cópias genéricas com nome idêntico no mercado nacional, embora o conceito de associação de quitosana com carbonato de cálcio seja encontrado historicamente no produto Ipakitine® / Epakitin® (Vetoquinol). Farmácias de manipulação veterinária podem preparar formulações magistrais individualizadas de carbonato de cálcio, carbonato de magnésio e quitosana, mas sem o veículo oleoso patenteado e o hidrolisado de peixe específico da Virbac. O produto é isento de retenção de receita.',

    clinicalWarningItems: [
      {
        label: 'Administração Obrigatória com a Refeição:',
        text: 'O Pronefra depende de contato físico direto com o alimento para quelar o fósforo da dieta. A dose diária deve ser administrada junto com as refeições ou imediatamente antes/após. Se o animal não estiver comendo, NÃO force o produto: a prioridade é o manejo da náusea e o suporte calórico.',
      },
      {
        label: 'Vigilância Ativa de Calcemia e Fosfatemia:',
        text: 'Como contém carbonato de cálcio (CaCO3), é formalmente contraindicado em pacientes com hipercalcemia ou cálculos de oxalato de cálcio. A fosfatemia deve ser titulada conforme as metas IRIS 2026 (fósforo nunca < 2,7 mg/dL). Se o fósforo permanecer alto apesar da dose máxima de Pronefra e dieta renal, migrar para quelante farmacológico (Al(OH)3 ou sevelamer).',
      },
      {
        label: 'Separação de 2 Horas e Hidrolisado de Peixe:',
        text: 'Os minerais Ca2+ e Mg2+ quelam e inativam antibióticos (enrofloxacina, doxiciclina) e levotiroxina; mantenha intervalo de pelo menos 2 horas. Além disso, os peptídeos de peixe NÃO exercem efeito anti-hipertensivo clínico comprovado e jamais devem substituir amlodipino ou telmisartana.',
      },
    ],

    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const pronefraMedicationRecord = pronefraMedicationsSeed[0];
