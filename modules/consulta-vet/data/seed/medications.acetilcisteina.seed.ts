import { MedicationRecord } from '../../types/medication';

export const acetilcisteinaMedicationRecord: MedicationRecord = {
  id: 'med-acetilcisteina',
  slug: 'acetilcisteina',
  title: 'Acetilcisteína',
  activeIngredient: 'Acetilcisteína (N-Acetilcisteína / NAC)',
  isControlled: false,
  tradeNames: [
    'Fluimucil® 100 mg/mL Solução Injetável / Inalatória (Zambon — Referência Humana)',
    'Acetilcisteína 100 mg/mL Solução Injetável (União Química, Eurofarma, Genéricos — Ampolas 3 mL)',
    'Fluimucil® 200 mg e 600 mg Granulado / Comprimido Efervescente (Zambon)',
    'Acetilcisteína 20 mg/mL e 40 mg/mL Xarope Pediátrico / Adulto (Genéricos)',
    'Acetadote® / Mucomyst® 200 mg/mL (Marcas de Referência Históricas Internacionais)',
  ],
  officialSiteUrl: 'https://fluimucil.com.br/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetylcysteine/PNG',
  pharmacologicClass:
    'Antídoto específico; doador de sulfidrila e precursor da síntese de glutationa (GSH); mucolítico químico e agente redox',
  species: ['dog', 'cat'],
  category: 'emergencia-intensivismo',
  tags: [
    'Acetilcisteína',
    'N-Acetilcisteína',
    'NAC',
    'Fluimucil',
    'Antídoto',
    'Intoxicação por Paracetamol',
    'Acetaminofeno',
    'Metemoglobinemia',
    'Glutationa',
    'GSH',
    'Hepatotoxicidade',
    'Mucolítico',
    'Melting Corneano',
    'Emergência Veterinária',
    'Hospitalar',
  ],

  mechanismOfAction:
    'A acetilcisteína (N-acetil-L-cisteína / NAC) é um derivado N-acetilado do aminoácido natural L-cisteína, atuando através de múltiplos mecanismos dependentes de seu grupamento sulfidrila livre (-SH). Farmacodinâmica central: 1) Reposição de Glutationa (GSH): Após absorção celular, sofre rápida deacetilação enzimática citoplasmática liberando L-cisteína livre, o substrato limitante essencial para a biossíntese da glutationa reduzida (GSH) mediada pela enzima glutamato-cisteína ligase. A restauração dos níveis intracelulares de GSH permite a conjugação eletrofílica direta e desintoxicação do metabólito altamente tóxico e reativo do paracetamol, a N-acetil-p-benzoquinonaimina (NAPQI), impedindo sua ligação covalente a macromoléculas hepatocelulares vitais e necrose centrolobular. 2) Ação Protetora Eritrocitária e Hemoglobínica: Em felinos, espécie que possui hemoglobina singularmente rica em resíduos de cisteína reativos (8 grupos sulfidrila livres) e baixa capacidade hepática de glicuronidação, os metabólitos oxidantes do paracetamol (como o para-aminofenol / PAP) oxidam rapidamente o ferro ferroso (Fe2+) da hemoglobina para o estado férrico (Fe3+), gerando metemoglobina incapaz de transportar oxigênio e condensação de corpos de Heinz com hemólise intravascular e extravascular. A NAC reativa o sistema redox GSH/GSSG eritrocitário, acelerando a redução enzimática da metemoglobina (encurtando sua meia-vida de 10 para 5 horas) e neutralizando radicais livres derivados de oxigênio. 3) Mucólise Química por Troca Tiol-Dissulfeto: O grupamento sulfidrila reativo interage diretamente com as mucoproteínas do muco respiratório, rompendo as pontes dissulfeto (-S-S-) intermoleculares que unem as subunidades poliméricas da mucina. Essa clivagem despolimeriza as longas cadeias glicoproteicas em fragmentos menores e menos elásticos, reduzindo drasticamente a viscosidade do exsudato purulento ou mucoide e facilitando sua depuração pelo transporte mucociliar ou aspiração traqueal. 4) Modulação de Proteases e Inibição de Metaloproteinases Corneanas: Em nível oftálmico estromal, a NAC inibe a atividade degradativa de colagenases e metaloproteinases de matriz (MMP-9), tanto por ação redutora direta sobre pontes dissulfeto da estrutura enzimática quanto pela quelação reversível de cátions bivalentes essenciais (Zn2+ e Ca2+) no sítio ativo das enzimas, freando a liquefação estromal (melting).',

  plainLanguageSummary:
    'A acetilcisteína é um antídoto hospitalar essencial e agente mucolítico consagrado na medicina veterinária, atuando primariamente como fornecedora de cisteína para a biossíntese de glutationa intracelular e neutralização de metabólitos tóxicos. Constitui a intervenção terapêutica padrão-ouro insubstituível para a intoxicação por paracetamol em cães e especialmente em gatos, espécie altamente vulnerável ao desenvolvimento precoce de metemoglobinemia e lesão oxidativa eritrocitária grave. Em procedimentos respiratórios, atua fragmentando quimicamente o muco espesso; contudo, sua inalação é formalmente desaconselhada em felinos asmáticos pelo risco documentado de broncoespasmo grave e aumento da resistência de vias aéreas.',

  pillars: [
    {
      title: 'Reposição de Glutationa & Detoxificação de NAPQI',
      icon: 'Shield',
      desc: 'Fornece cisteína biodisponível para a síntese intracelular acelerada de glutationa (GSH), conjugando e neutralizando o metabólito reativo letal do paracetamol antes que ocorra necrose hepatocelular irreversível.',
    },
    {
      title: 'Proteção Eritrocitária contra Metemoglobinemia',
      icon: 'HeartPulse',
      desc: 'Restaura o equilíbrio redox dos eritrócitos felinos e caninos, encurtando a meia-vida da metemoglobina pela metade e freando a formação destrutiva de corpúsculos de Heinz e hemólise.',
    },
    {
      title: 'Mucólise Química por Ruptura Dissulfeto',
      icon: 'Wind',
      desc: 'Cliva diretamente as pontes dissulfeto (-S-S-) das mucoproteínas oligoméricas brônquicas, fluidificando secreções viscosas densas e viabilizando sua expectoração mecânica ou aspiração traqueal.',
    },
    {
      title: 'Inibição de Metaloproteinases Corneanas (Antimelting)',
      icon: 'Eye',
      desc: 'Quelatiza cátions de zinco e cálcio e reduz dissulfetos de colagenases e MMP-9 estromais, interrompendo a degradação e perfuração em úlceras corneanas de liquefação rápida.',
    },
  ],

  quickSummaryHighlights: [
    'Antídoto Padrão-Ouro Paracetamol',
    'Reduz Meia-Vida da Metemoglobina de 10h para 5h',
    'Biodisponibilidade Oral Felina de Apenas 19%',
    'Carga IV 140 mg/kg Diluída a 5% em 20 min',
    'Manutenção 70 mg/kg IV/VO q6h (Mínimo 7 doses)',
    'Contraindicada Nebulização em Asma Felina',
    'Mucomucil Pet Atual Contém Carbocisteína e Não NAC',
    'Receituário Simples sem Controle Especial',
  ],

  quickIndications: [
    {
      condition: 'Intoxicação Aguda por Paracetamol (Gatos)',
      species: 'cat',
      doseSummary: 'Carga: 140–180 mg/kg IV lenta (20 min); Manutenção: 70 mg/kg IV ou VO q6h',
      route: 'Intravenosa diluída (preferencial) ou oral via sonda',
      duration: 'Carga inicial + no mínimo 7 doses q6h (até 17 doses em ingestão maciça)',
      clinicalContext: 'Emergência crítica com metemoglobinemia, cianose, edema facial e dispneia',
    },
    {
      condition: 'Intoxicação por Paracetamol e Hepatotoxinas Oxidativas (Cães)',
      species: 'dog',
      doseSummary: 'Carga: 140 mg/kg IV lenta diluída a 5%; Manutenção: 70 mg/kg IV/VO q6h',
      route: 'Intravenosa lenta em bomba/gotejador ou oral',
      duration: 'Carga inicial + 7 doses a cada 6 horas guiadas por enzimas e coagulação',
      clinicalContext: 'Ingestão superior a 50-75 mg/kg com risco de falência hepática aguda',
    },
    {
      condition: 'Mucólise Brônquica em Doença Respiratória Secretiva (Cães)',
      species: 'dog',
      doseSummary: '50 mg diluídos em SF 0,9% para solução a 2% administrados por nebulização',
      route: 'Inalatória por nebulização ultrassônica ou pneumática',
      duration: 'Sessões de 30 a 60 minutos a cada 8 a 12 horas sob monitoramento',
      clinicalContext: 'Broncopneumonia ou traqueobronquite com tampões mucosos espessos não responsivos à hidratação',
    },
    {
      condition: 'Úlcera Corneana com Colagenólise Ativa / Melting (Cão e Gato)',
      species: 'both',
      doseSummary: '1 a 2 gotas de solução oftálmica estéril a 5% tópica ocular a cada 4 a 6 horas',
      route: 'Tópica oftálmica estéril',
      duration: 'Durante a fase ativa de digestão estromal até a estabilização da ceratomalácia',
      clinicalContext: 'Úlcera estromal profunda ou perfurante com atividade colagenolítica bacteriana',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-nac-paracetamol',
      indication: 'Intoxicação por Paracetamol (Acetaminofeno) em Cães e Gatos',
      clinicalContext: 'Emergência toxicológica aguda com risco de asfixia tecidual e necrose hepática fulminante',
      species: 'both',
      dose: 'Carga: 140 a 180 mg/kg IV lenta (ou 280 mg/kg VO por sonda); Manutenção: 70 mg/kg IV ou VO a cada 6 horas',
      route: 'Intravenosa lenta (diluída a 5%) ou oral via sonda esofágica/gástrica',
      frequency: 'Carga única imediata seguida de administrações a cada 6 horas',
      duration: 'Mínimo de 7 doses de manutenção (podendo atingir até 17 doses em sobrecargas severas)',
      mechanismOfAction:
        'A NAC fornece cisteína para a regeneração rápida de GSH hepático e eritrocitário. Em felinos, o para-aminofenol (PAP) e a NAPQI esgotam os estoques de glutationa dos eritrócitos, promovendo rápida oxidação da molécula de hemoglobina em metemoglobina (incapaz de ligar oxigênio) e precipitação em corpos de Heinz. Em cães, a ingestão acima de 75-100 mg/kg satura as vias de sulfatação e glicuronidação, desviando o fármaco para o citocromo P450, gerando excesso de NAPQI que liga covalentemente a proteínas de hepatócitos. A NAC restaura a depuração de metabólitos por conjugação atóxica de ácido mercaptúrico e acelera a reversão da metemoglobinemia.',
      clinicalRationale:
        'A intervenção precoce (preferencialmente dentro das primeiras 2 a 8 horas pós-ingestão) reduz a mortalidade em felinos de mais de 40-50% para menos de 5-10%. Em gatos graves com cianose, hipotermia e vômitos, a via intravenosa lenta é a escolha mandatória, dado que a absorção oral é retardada e possui biodisponibilidade de apenas 19%.',
      monitoring:
        'Co-oximetria ou dosagem de metemoglobina sérica, hemograma seriado (contagem de corpos de Heinz, hematócrito e sinais de hemólise), ALT, AST, bilirrubinas totais e frações, glicemia, coagulograma (TP/TTPA) e pressão arterial.',
      referenceIds: ['ref-stomer-1980', 'ref-ettinger-2024', 'ref-plumbs-10ed', 'ref-bsava-10ed'],
      evidenceLevel: 'Padrão-ouro toxicológico veterinário internacional (Evidência A)',
    },
    {
      id: 'ind-nac-hepatopatia-oxidativa',
      indication: 'Hepatotoxicidade Aguda Adjuvante & Lesão Oxidativa Hepática',
      clinicalContext: 'Insuficiência hepática aguda tóxica por xilitol, cogumelos hepatotóxicos, cicas ou agentes antineoplásicos',
      species: 'both',
      dose: '140 mg/kg IV lenta diluída no primeiro dia, seguido por 70 mg/kg IV ou VO a cada 8 a 12 horas',
      route: 'Intravenosa lenta diluída em SF 0,9% ou SG 5%',
      frequency: 'A cada 8 a 12 horas',
      duration: '3 a 5 dias até a estabilização das enzimas hepáticas e função sintética',
      mechanismOfAction:
        'Estimula a regeneração de estoques de cisteína e glutationa intracelulares, neutraliza espécies reativas de oxigênio secundárias à peroxidação lipídica e melhora a microcirculação sinusoidal hepática por modular a via do óxido nítrico endotelial.',
      clinicalRationale:
        'Empregada como adjuvante em toxicidades graves que cursam com colapso do sistema de defesa antioxidante hepático. Deve ser associada a suporte hemodinâmico, reposição de vitamina K1 em coagulopatias e manejo de encefalopatia.',
      monitoring:
        'Painel hepático completo (ALT, FA, GGT, bilirrubinas, albumina), lactato sérico, glicemia e tempo de protrombina.',
      referenceIds: ['ref-plumbs-10ed', 'ref-toth-2026', 'ref-viviano-2013'],
      evidenceLevel: 'Uso clínico adjuvante fundamentado em formularies (Evidência B/C)',
    },
    {
      id: 'ind-nac-melting-corneano',
      indication: 'Úlcera de Córnea com Degradação Colagenolítica Estromal (Melting Corneano)',
      clinicalContext: 'Ceratomalácia estromal progressiva por infecção bacteriana ativa (Pseudomonas, Streptococcus) ou inflamação neutrofílica intensa',
      species: 'both',
      dose: '1 gota da solução oftálmica a 5% (com ou sem hipromelose 0,35%) no olho afetado',
      route: 'Tópica oftálmica estéril',
      frequency: 'A cada 4 a 6 horas (podendo ser aplicada a cada 2 horas nas primeiras 24 horas)',
      duration: 'Até a interrupção macroscópica da colagenólise e estabilização do estroma corneano',
      mechanismOfAction:
        'Inibição de colagenases e metaloproteinases teciduais (MMP-9) por quelação de íons cálcio e zinco essenciais e redução química de pontes dissulfeto estruturais.',
      clinicalRationale:
        'Impede a perfuração rápida do globo ocular em ceratites ulcerativas graves, atuando em sinergia com soro autólogo tópico e antimicrobianos bactericidas tópicos apropriados.',
      monitoring:
        'Teste de fluoresceína seriado, biomicroscopia em lâmpada de fenda e avaliação diária da espessura estromal remanescente.',
      referenceIds: ['ref-plumbs-ophth-10ed', 'ref-bsava-10ed'],
      evidenceLevel: 'Recomendação consolidada em oftalmologia veterinária (Evidência B)',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Apresenta absorção gastrointestinal variável após administração oral. Em felinos saudáveis, a biodisponibilidade oral é baixa, estimada em 19,3 ± 4,4% (Buur et al., 2013), devido ao acentuado metabolismo pré-sistêmico de primeira passagem hepática e intestinal, resultando em menor exposição plasmática em comparação à via intravenosa. Em cães, a biodisponibilidade oral da formulação aquosa convencional ainda não foi extensivamente quantificada em estudos farmacocinéticos formais, porém a absorção entérica é suficiente para elevar os níveis sistêmicos de cisteína. Por via inalatória (nebulização) ou intratraqueal, a maior fração da molécula reage localmente com os grupamentos dissulfeto do muco brônquico, sendo a fração remanescente absorvida pela vasculatura pulmonar.',
    distribution:
      'Distribui-se prontamente nos compartimentos extracelulares e tecidos com alta vascularização, atingindo concentrações relevantes no parênquima hepático, rins, epitélio alveolar brônquico e estroma corneano (após instilação tópica). O volume aparente de distribuição não possui valor de referência padronizado para cães, apresentando modelo bicompartimental de disposição em felinos. A penetração através da barreira hematoencefálica intacta para o líquido cefalorraquidiano é baixa a intermediária, não sendo indicada primariamente para afecções neurológicas centrais.',
    metabolism:
      'Sofre rápida e extensa metabolização intracelular primariamente no fígado e tecidos periféricos. O principal mecanismo catabólico consiste na deacetilação enzimática da N-acetilcisteína em L-cisteína livre. A cisteína liberada é incorporada ao ciclo biossintético da glutationa intracelular (GSH) ou oxidada a cistina, taurina e sulfatos inorgânicos. Na circulação sanguínea, a NAC coexiste em equilíbrio dinâmico sob quatro formas principais: NAC livre reduzida monomérica, dissulfetos de NAC, dissulfetos mistos ligados a proteínas plasmáticas e frações incorporadas a peptídeos tiólicos.',
    elimination:
      'A depuração plasmática é mista, envolvendo biotransformação tecidual rápida em metabólitos sulfurados e excreção renal. Cerca de 20% a 30% da dose administrada é eliminada de forma inalterada ou conjugada pela urina através de filtração glomerular. A meia-vida de eliminação plasmática em gatos é curta, correspondendo a aproximadamente 0,78 ± 0,16 horas após injeção intravenosa e 1,34 ± 0,24 horas após administração oral.',
    cnsPenetration:
      'Permeabilidade restrita pela barreira hematoencefálica íntegra; concentrações liquóricas são substancialmente inferiores às concentrações plasmáticas livres.',
    plasmaBinding:
      'A ligação a proteínas plasmáticas varia de 50% a 80%, ocorrendo majoritariamente através de ligações covalentes dissulfeto reversíveis entre o grupamento -SH da NAC e os resíduos de cisteína da albumina sérica.',
    halfLife:
      'Gatos: 0,78 ± 0,16 horas (IV) e 1,34 ± 0,24 horas (VO) | Cães: meia-vida curta estimada em 1 a 2 horas para o fármaco livre circulante.',
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa Lenta Diluída (IV Hospitalar — Via de Escolha)',
        technique:
          'Diluir a solução injetável de acetilcisteína (originalmente a 10% / 100 mg/mL ou 20% / 200 mg/mL) para uma concentração final de 5% (50 mg/mL) utilizando Glicose 5% (SG 5%), Cloreto de Sódio 0,45% ou Água Estéril para Injeção. Na dose de ataque (140 a 180 mg/kg), infundir lentamente por via endovenosa ao longo de 15 a 20 minutos (velocidade aproximada de 7 a 9 mg/kg/minuto), preferencialmente com equipo provido de filtro bacteriológico de 0,2 mícron para reter eventuais micropartículas.',
        nursingCare:
          'A infusão rápida em bólus direto é contraindicada pelo risco iminente de reações anafilactoides histamino-símiles, hipotensão arterial súbita, eritema cutâneo difuso e broncoespasmo reflexo. Monitorar pressão arterial, frequência cardíaca, frequência respiratória e coloração de mucosas durante os 30 minutos subsequentes ao início da infusão. Em caso de reações de intolerância, pausar imediatamente a infusão, administrar anti-histamínicos ou suporte volêmico e reiniciar em velocidade reduzida.',
        limitations:
          'Requer preparo asséptico rigoroso e diluição obrigatória. A solução a 20% pura é altamente hiperosmolar e causa flebite endotelial severa se aplicada pura na veia.',
      },
      {
        route: 'Oral / Sonda Esofágica ou Gástrica (VO)',
        technique:
          'A solução oral de acetilcisteína deve ser diluída em água filtrada ou suco/caldo palatável para concentração de no máximo 5% (50 mg/mL) a fim de mascarar o sabor e odor fortemente sulfuroso (ovo cozido/enxofre). Em pacientes com náusea, prostração, vômitos ou intoxicação aguda por paracetamol, recomenda-se a administração via sonda nasoesofágica, esofagostomia ou gavagem lenta.',
        nursingCare:
          'A administração oral de volumes concentrados frequentemente deflagra êmese reflexa incoercível. Recomenda-se pré-tratamento com antiemético central potente (maropitant ou ondansetrona) cerca de 30 a 45 minutos antes da tomada. Nunca forçar deglutição em animais com depressão do nível de consciência pelo risco grave de aspiração pulmonar com necrose química da árvore traqueobrônquica.',
        limitations:
          'Biodisponibilidade oral reduzida em felinos (~19%). Não deve ser administrada simultaneamente na mesma tomada com carvão ativado oral, devendo-se manter intervalo mínimo de 2 horas entre eles.',
      },
      {
        route: 'Inalatória / Nebulização (Uso Restrito e Cauteloso)',
        technique:
          'Utilizar solução a 2% (obtida diluindo 1 mL de acetilcisteína 10% em 4 mL de SF 0,9% estéril). Nebulizar através de máscara ajustada ou caixa de nebulização com fluxo de oxigênio durante 30 a 60 minutos.',
        nursingCare:
          'Manter vigilância visual contínua para sinais de desconforto respiratório, taquipneia, tosse paroxística ou sibilos auscultatórios. ALERTA MÁXIMO EM GATOS: A nebulização de acetilcisteína é contraindicada em felinos portadores de asma brônquica ou hiper-reatividade de vias aéreas, pois deflagra broncoespasmo agudo severo por irritação tiólica direta (Reinero et al., 2011). Ter pronto salbutamol inalatório e terbutalina injetável.',
        limitations:
          'Pode provocar excesso de fluidificação com inundação alveolar em pacientes que não conseguem tossir eficazmente ou sem reflexo de tosse.',
      },
      {
        route: 'Tópica Oftálmica (Colírio Estéril Manipulado)',
        technique:
          'Instilar 1 a 2 gotas da solução oftálmica estéril a 5% diretamente no fundo de saco conjuntival do olho afetado a cada 4 a 6 horas.',
        nursingCare:
          'Manter o colírio sob refrigeração entre 2°C e 8°C após aberto e descartar no prazo de 7 a 14 dias para evitar contaminação microbiana. Lavar previamente o olho com solução salina fisiológica para remoção de muco purulento antes da instilação.',
        limitations:
          'Pode provocar leve ardência ocular transitória nos primeiros segundos após a instilação.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Solução de Glicose a 5% (SG 5%) — DILUENTE DE ESCOLHA INTERNACIONAL',
        'Solução de Cloreto de Sódio a 0,45% (Meia Salina / NaCl 0,45%)',
        'Água Estéril para Injeção (para reconstituição e diluição primária)',
        'Solução de Cloreto de Sódio a 0,9% (SF 0,9% — amplamente utilizada na rotina clínica veterinária)',
      ],
      incompatibleFluids: [
        'Soluções e medicamentos com agentes oxidantes (inativam quimicamente o grupo sulfidrila -SH)',
        'Ampicilina Sódica (incompatibilidade físico-química com inativação mútua em mistura direta)',
        'Anfotericina B (precipitação imediata em mesma linha ou solução)',
        'Eritromicina Lactobionato e Tetraciclinas / Oxitetraciclina injetáveis',
        'Peróxido de Hidrogênio (Água Oxigenada) e Soluções de Tripsina',
        'Materiais contendo ferro, cobre ou borracha vulcanizada (libera gás sulfídrico H2S e adquire coloração roxa intensa)',
      ],
      infusionRateGuidance:
        'A velocidade de infusão intravenosa na dose de carga (140 mg/kg diluída a 5%) deve ser controlada para transcorrer ao longo de pelo menos 15 a 20 minutos (velocidade média de 7 a 9 mg/kg por minuto). Em pacientes hipovolêmicos ou hipotensos, preferir 20 a 30 minutos com infusão em bomba volumétrica ou seringa infusora.',
      preparationNotes:
        'A solução injetável de acetilcisteína possui odor sulfuroso característico (semelhante a enxofre). Após abertura da ampola ou perfuração da borracha, o líquido pode adquirir tonalidade discretamente rosada ou arroxeada devido à reação do tiol com traços de oxigênio ou metais atmosféricos; essa leve alteração cromática não compromete a potência química nem a segurança farmacológica imediata. Soluções diluídas para infusão devem ser mantidas protegidas de calor excessivo e utilizadas em até 24 horas. Para administração intravenosa a partir de ampolas de solução inalatória/oral humana, utilizar obrigatoriamente filtro de linha de 0,2 mícron.',
      storageRequirements:
        'Frascos e ampolas lacrados devem ser conservados em temperatura ambiente (15°C a 30°C), protegidos da umidade e luz solar direta. Ampolas de uso injetável abertas sem conservantes são de uso único imediato e o volume remanescente deve ser descartado.',
    },

    speciesPeculiarities: [
      {
        species: 'cat',
        title: 'Extrema Vulnerabilidade ao Paracetamol & Baixa Biodisponibilidade Oral',
        description:
          'Os felinos apresentam deficiência constitucional congênita na enzima hepática glicuronil-transferase (UGT1A6/UGT1A9), possuindo capacidade mínima de glicuronidação de xenobióticos. Além disso, a hemoglobina felina contém 8 resíduos livres de sulfidrila (em comparação com 4 no cão e apenas 2 no ser humano), tornando os eritrócitos dos gatos excepcionalmente suscetíveis à oxidação por para-aminofenol (PAP) e NAPQI. Míseros 10 mg/kg de paracetamol já desencadeiam metemoglobinemia fulminante, formação maciça de corpúsculos de Heinz, cianose cor de chocolate, edema facial característico e colapso respiratório. Paralelamente, estudos farmacocinéticos (Buur et al., 2013) comprovaram que a absorção oral de NAC em gatos atinge apenas 19% de biodisponibilidade, exigindo que a primeira dose de carga seja feita rigorosamente pela via intravenosa em animais sintomáticos.',
        clinicalImplications:
          'Paracetamol é contraindicado em felinos em qualquer dose. Diante de suspeita ou confirmação de ingestão, iniciar imediatamente NAC 140 mg/kg IV lenta diluída sem esperar surgimento de cianose ou alterações laboratoriais.',
      },
      {
        species: 'dog',
        title: 'Hepatotoxicidade Predominante por Acúmulo Centrolobular de NAPQI',
        description:
          'Em cães, a via metabólica preferencial de eliminação do paracetamol em doses terapêuticas é a sulfatação e glicuronidação. Contudo, em superdosagens agudas (superiores a 50 a 75 mg/kg), essas vias saturam-se rapidamente, canalizando grande fração do fármaco para o citocromo P450 microssomal (CYP2E1), com produção excessiva de NAPQI. O esgotamento do pool hepático de glutationa permite que o NAPQI ligue-se covalentemente aos grupamentos sulfidrila de proteínas estruturais e mitocondriais dos hepatócitos centrolobulares, deflagrando necrose hepática aguda grave, coagulopatia e encefalopatia em 24 a 48 horas pós-exposição. Metemoglobinemia em cães ocorre secundariamente, habitualmente exigindo doses mais elevadas (>200 mg/kg).',
        clinicalImplications:
          'Em cães expostos a doses superiores a 50 mg/kg de paracetamol, a administração precoce de NAC previne a cascata de necrose centrolobular e insuficiência hepática aguda fatal.',
      },
    ],

    prescriptionType: {
      category: 'Receituário Veterinário Simples (1 via)',
      ordinanceOrLaw: 'Isento de controle especial pela Portaria SVS/MS nº 344/1998 e Portaria MAPA nº 837/2025',
      retentionRequired: false,
      guidelines:
        'Medicamento de venda sob prescrição médica ou veterinária simples. No Brasil, não está sujeito a retenção de receita especial nem a Notificação de Receita. Para a solução injetável de uso humano (100 mg/mL) aplicada em ambiente ambulatorial ou hospitalar veterinário, prescreve-se sob receituário simples com orientações clínicas detalhadas.',
    },

    pharmacologicalClassification: {
      chemicalClass: 'Derivado N-acetilado de aminoácido tiólico (Ácido (2R)-2-acetamido-3-sulfanilpropanoico)',
      chemicalClassDescription:
        'Composto monotiol sintético hidrossolúvel de baixo peso molecular (163,20 g/mol), portador de uma carboxila ácida (pKa 3,24), uma amida acetilada e uma sulfidrila ionizável (pKa 9,52) altamente redutora.',
      therapeuticClass: 'Antídoto hospitalar específico de intoxicação por paracetamol e agente mucolítico',
      therapeuticClassDescription:
        'Fármaco doador de grupamentos sulfidrila que restaura as concentrações intracelulares de cisteína e glutationa (GSH), reverte estados de estresse oxidativo severo e despolimeriza mucoproteínas por quebra de ligações dissulfeto.',
      detailedTargets: [
        {
          target: 'Pool Intracelular de Cisteína / Glutationa-Cisteína Ligase',
          action: 'Fornecimento de substrato deacetilado limitante para a biossíntese enzimática de glutationa (GSH)',
          clinicalSignificance:
            'Acelera a restauração do principal antioxidante intracelular endógeno nos hepatócitos e eritrócitos.',
        },
        {
          target: 'Metabólito Reativo NAPQI (N-acetil-p-benzoquinonaimina)',
          action: 'Conjugação nucleofílica via GSH restaurado com formação de derivados atóxicos de mercapturato',
          clinicalSignificance:
            'Interrompe a ligação covalente eletrofílica a macromoléculas celulares, prevenindo necrose centrolobular do fígado.',
        },
        {
          target: 'Fe3+ da Metemoglobina Eritrocitária',
          action: 'Restauração da capacidade redutora do sistema redox GSH/GSSG',
          clinicalSignificance:
            'Reduz a meia-vida da metemoglobina de 10 horas para 5 horas em gatos, restaurando o transporte tecidual de O2.',
        },
        {
          target: 'Pontes Dissulfeto (-S-S-) de Mucoproteínas Brônquicas',
          action: 'Redução e clivagem química intermolecular em pH neutro a levemente alcalino',
          clinicalSignificance:
            'Fluidifica o muco espesso viscoso e facilita sua depuração mecânica pela via aérea.',
        },
        {
          target: 'Metaloproteinases de Matriz Estromal Corneana (MMP-9 / Colagenases)',
          action: 'Quelação de íons Zn2+ e Ca2+ e inibição da degradação colágena',
          clinicalSignificance:
            'Freia a liquefação e perfuração da córnea em quadros de ceratomalácia aguda (melting).',
        },
      ],
    },
  },

  attentionData: {
    attentionSubtitle:
      'Vigilância de reações anafilactoides por infusão IV rápida, monitoramento seriado de metemoglobinemia e contraindicação formal inalatória em felinos asmáticos',
    precautions: [
      {
        condition: 'Asma Felina & Doença Brônquica Hiper-reativa Felina',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A administração inalatória (nebulização) de acetilcisteína em gatos com hiper-reatividade de vias aéreas induz irritação química direta nos mastócitos brônquicos, disparando reflexo colinérgico vagal com aumento significativo da resistência das vias aéreas (P = 0,0007), broncoespasmo agudo severo, tosse espasmódica e cianose (Reinero et al., 2011).',
        clinicalAction:
          'Contraindicação formal da via inalatória/nebulização em gatos com histórico ou suspeita de asma felina ou bronquite crônica. Para mucólise brônquica em gatos, priorizar hidratação sistêmica e nebulização exclusiva com salina fisiológica estéril pura.',
      },
      {
        condition: 'Administração Intravenosa em Bólus Rápido ou sem Diluição',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Soluções concentradas a 10% ou 20% são hiperosmolares e provocam flebite química endotelial intensa. Além disso, a infusão IV rápida estimula desgranulação histaminérgica direta não mediada por IgE (reação pseudoalérgica anafilactoide), provocando hipotensão sistêmica súbita, vasodilatação periférica com eritema/flushing e colapso circulatório.',
        clinicalAction:
          'Sempre diluir a formulação injetável para concentração máxima de 5% (50 mg/mL) em SG 5% ou NaCl 0,45% e infundir a dose de carga lentamente em pelo menos 15 a 20 minutos sob monitoramento hemodinâmico estrito.',
      },
      {
        condition: 'Administração Oral Simultânea com Carvão Ativado',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O carvão ativado possui alta capacidade de adsorção física intraluminal e pode ligar-se à molécula de acetilcisteína administrada por via oral, diminuindo sua absorção sistêmica e comprometendo a eficácia antidotal.',
        clinicalAction:
          'Em casos de intoxicação grave em que a descontaminação entérica com carvão ativado é mandatória, priorizar a administração da acetilcisteína por via intravenosa (que contorna completamente a interação entérica). Se ambas as drogas forem orais, respeitar intervalo de pelo menos 2 a 3 horas entre o carvão e a NAC.',
      },
      {
        condition: 'Intoxicação por Paracetamol em Gatos Diagnosticada Tardiamente (>24 Horas)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Após 24 a 48 horas de exposição sem intervenção precoce, a lesão oxidativa eritrocitária já desencadeou destruição maciça de hemácias (hemólise intravascular e extravascular severa), choque hipóxico grave e colapso cardiovascular refratário.',
        clinicalAction:
          'A NAC ainda deve ser administrada imediatamente para neutralizar metabólitos residuais, porém deve ser associada obrigatoriamente a suporte ventilatório com oxigênio enriquecido e transfusão de sangue total ou concentrado de hemácias compatível para restaurar a capacidade carreadora de O2.',
      },
      {
        condition: 'Confusão com o Produto Comercial Mucomucil® Pet Atual (Vetnil)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O produto veterinário Mucomucil® Xarope Pet comercializado atualmente pela Vetnil teve sua fórmula alterada pelo fabricante e é composto por L-carbocisteína (20 g/100 mL = 200 mg/mL), e NÃO por acetilcisteína. A carbocisteína não atua como precursora doadora de sulfidrila equivalente à NAC na intoxicação por paracetamol.',
        clinicalAction:
          'Nunca utilizar o Mucomucil Pet atual como antídoto para intoxicação por paracetamol. Empregar exclusivamente acetilcisteína injetável hospitalar humana (100 mg/mL) diluída para o tratamento de emergência toxicológica.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Náusea, Salivação Intensa (Ptialismo) e Vômitos após Via Oral',
        frequency: 'common',
        mechanism:
          'Irritação direta da mucosa gástrica e reflexo emetogênico desencadeado pelo odor e sabor sulfuroso acre e fortemente acre dos grupamentos tiol livres da molécula.',
        clinicalManagement:
          'Pré-tratar com antieméticos centrais (maropitant 1 mg/kg SC ou ondansetrona 0,5 mg/kg IV lenta) 30 minutos antes. Fracionar e diluir a solução para concentração de no máximo 5% administrando por sonda esofágica ou gástrica.',
      },
      {
        effect: 'Eritema Cutâneo, Flushing Facial e Prurido Transitório',
        frequency: 'uncommon',
        mechanism:
          'Liberação histaminérgica inespecífica transitória estimulada pela infusão de tióis livres na circulação venosa em velocidade moderada a rápida.',
        clinicalManagement:
          'Reduzir temporariamente a velocidade da infusão em 50%. Se houver urticária evidente ou desconforto do paciente, administrar anti-histamínico H1 (difenidramina 1 a 2 mg/kg IM).',
      },
      {
        effect: 'Hipotensão Arterial Sistêmica Transitória durante Infusão IV',
        frequency: 'uncommon',
        mechanism:
          'Vasodilatação periférica reflexa e potencialização de vias de óxido nítrico endotelial durante infusão de altas cargas de doadores de sulfidrila.',
        clinicalManagement:
          'Monitorar a pressão arterial sistólica por Doppler. Caso a PAS caia abaixo de 90 mmHg, pausar a infusão por 10 a 15 minutos, ofertar bólus de fluidoterapia balanceada e reiniciar em velocidade mais lenta.',
      },
      {
        effect: 'Broncoespasmo Agudo e Aumento da Resistência Aérea por Nebulização em Felinos',
        frequency: 'rare',
        mechanism:
          'Espasmo da musculatura lisa traqueobrônquica desencadeado por irritação tiólica direta em animais com reatividade brônquica exacerbada.',
        clinicalManagement:
          'Suspender imediatamente a nebulização. Fornecer fluxo contínuo de oxigênio a 100% e administrar agonista beta-2 inalatório (salbutamol 1 a 2 jatos com espaçador felino) ou terbutalina (0,01 mg/kg SC/IV).',
      },
      {
        effect: 'Reação Anafilactoide Grave com Colapso Circulatório',
        frequency: 'very_rare',
        mechanism:
          'Desgranulação mastocitária maciça e ativação de cininas por injeção intravenosa excessivamente veloz ou hipersensibilidade individual idiossincrática.',
        clinicalManagement:
          'Interromper imediatamente a infusão. Instituir suporte hemodinâmico agressivo com fluidoterapia de choque, epinefrina (0,01 mg/kg IV ou traqueal em PCR iminente) e corticosteroide de ação rápida.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Insuficiência Hepática Grave Pré-existente ou Induzida pelo Tóxico',
        recommendedAdjustment:
          'Não reduzir a dose na intoxicação aguda por paracetamol. Manter a dose plena de 140 mg/kg na carga e 70 mg/kg q6h na manutenção.',
        physiologicalRationale:
          'A insuficiência hepática decorre justamente da depleção crítica de glutationa e acúmulo de metabólitos tóxicos. A NAC é o antídoto de resgate necessário para repor os pools de cisteína e viabilizar a recuperação hepatocelular.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica (DRC) — Estágios IRIS 1 a 4',
        recommendedAdjustment:
          'Não há redução percentual rotineira padronizada na intoxicação por paracetamol. Em terapias prolongadas além de 7 doses, monitorar clearance e balanço hídrico.',
        physiologicalRationale:
          'Cerca de 20% a 30% da dose de NAC é eliminada por excreção renal. Em nefropatas, a meia-vida pode apresentar leve prolongamento, porém o risco de subdosagem do antídoto na intoxicação aguda supera o potencial de toxicidade por acúmulo.',
      },
      {
        clinicalCondition: 'Exacerbação Aguda de Doença Renal Crônica Felina (Acute-on-Chronic IRIS 2-4)',
        recommendedAdjustment:
          'Uso investigacional/emergente conforme ensaio clínico controlado de 2026: 70 mg/kg IV diluída em salina uma vez ao dia (a cada 24 horas) por 7 dias associada à fluidoterapia.',
        physiologicalRationale:
          'Reduz marcadores de estresse oxidativo renal, associando-se a quedas significativas de creatinina, ureia sérica, SDMA e relação proteína:creatinina urinária (UPC) em modelo de dano isquêmico agudo sobreposto.',
      },
      {
        clinicalCondition: 'Pacientes Geriátricos ou com Cardiopatia / Sobrecarga de Volume',
        recommendedAdjustment:
          'Manter a dose em mg/kg de acetilcisteína, porém restringir o volume total de diluente ao mínimo necessário (diluir a 5% estrito) e estender o tempo de infusão para 30 a 45 minutos.',
        physiologicalRationale:
          'Previne descompensação hemodinâmica ou edema pulmonar cardiogênico induzido por infusão rápida de volume adicional em animais cardiopatas instáveis.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Carvão Ativado Oral',
        severity: 'moderate',
        clinicalEffect:
          'Adsorção física da acetilcisteína no lúmen gastrointestinal com acentuada redução da sua biodisponibilidade oral.',
        pharmacologicalMechanism:
          'A molécula de NAC possui alta afinidade pelos poros microscópicos do carvão ativado, sendo carreada e eliminada nas fezes antes de sofrer absorção entérica.',
      },
      {
        drugOrClass: 'Nitroglicerina & Nitratos Vasodilatadores',
        severity: 'major',
        clinicalEffect:
          'Potencialização acentuada do efeito hipotensor e risco de colapso cardiovascular agudo.',
        pharmacologicalMechanism:
          'A acetilcisteína atua como doadora de grupamentos sulfidrila necessários para a bioativação e tolerância aos nitratos, potencializando a formação de S-nitrosotióis e liberação massiva de óxido nítrico na musculatura vascular lisa.',
      },
      {
        drugOrClass: 'Antibióticos Beta-Lactâmicos (Ampicilina Sódica, Penicilinas) em Mesma Solução',
        severity: 'major',
        clinicalEffect:
          'Inativação química direta dos antibióticos se misturados na mesma seringa, frasco ou equipo intravenoso.',
        pharmacologicalMechanism:
          'O grupamento sulfidrila reativo livre da acetilcisteína reage quimicamente com o anel beta-lactâmico, induzindo hidrólise e precipitação in vitro.',
      },
      {
        drugOrClass: 'Tetraciclinas & Oxitetraciclina Parenterais',
        severity: 'major',
        clinicalEffect:
          'Incompatibilidade físico-química com quelação e perda de atividade antimicrobiana.',
        pharmacologicalMechanism:
          'Formação de quelatos insolúveis in vitro com precipitação de partículas no frasco de infusão.',
      },
      {
        drugOrClass: 'Agentes Antitussígenos Centrais (Butorfanol, Codeína) em Doença Respiratória',
        severity: 'moderate',
        clinicalEffect:
          'Inundação da árvore respiratória com retenção obstrutiva de secreções e risco de insuficiência ventilatória.',
        pharmacologicalMechanism:
          'A NAC fluidifica grande volume de muco brônquico que requer mecanismo fisiológico de tosse preservado para expectoração; suprimir a tosse retém exsudato nas vias distais.',
      },
    ],
  },

  clinicalStudiesCommented: [
    {
      title: 'Eficácia da Acetilcisteína no Tratamento da Intoxicação Experimental por Paracetamol no Gato',
      authorsYear: 'St Omer VV, McKnight ED (1980)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico experimental controlado em felinos domésticos',
      sampleSize: '10 gatos sob indução controlada de toxicose por paracetamol',
      mainFindings:
        'A administração precoce de acetilcisteína na dose inicial de 140 mg/kg por via oral seguida de doses de manutenção resultou em sobrevida de 100% (5/5) no primeiro grupo tratado, enquanto o grupo controle não tratado apresentou mortalidade de 40% (2/5) com metemoglobinemia superior a 50% e corpos de Heinz maciços. A NAC promoveu clareamento acelerado da metemoglobina.',
      clinicalTakeaway:
        'Constitui a evidência experimental pioneira e fundacional que estabeleceu a acetilcisteína como terapia antidotal mandatória e salvadora de vidas na toxicose por paracetamol em gatos.',
      referenceId: 'ref-stomer-1980',
    },
    {
      title: 'Suplementação de N-Acetilcisteína sobre Glutationa Intracelular, Escore Clínico e Sobrevida em Cães Hospitalizados',
      authorsYear: 'Viviano KR, VanderWielen B (2013)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e placebo-controlado',
      sampleSize: '60 cães gravemente enfermos internados (30 NAC vs 30 Placebo) + 14 controles sadios',
      mainFindings:
        'A administração de NAC na dose de 140 mg/kg seguida por 70 mg/kg IV q6h aumentou significativamente a cisteína plasmática (de 8,67 para 15,1 micromol/L, P < 0,0001) e preservou os níveis de glutationa eritrocitária. Entretanto, não demonstrou redução significativa no escore de severidade da doença (APPLE score) nem melhora na taxa global de sobrevida em comparação ao placebo.',
      clinicalTakeaway:
        'Estudo divisor de águas: prova que a reposição de biomarcadores antioxidantes não se traduz automaticamente em melhora de desfechos clínicos gerais. A NAC não deve ser utilizada indiscriminadamente como protetor universal em todo cão crítico.',
      referenceId: 'ref-viviano-2013',
    },
    {
      title: 'Farmacocinética da N-Acetilcisteína após Administração Oral e Intravenosa em Gatos Saudáveis',
      authorsYear: 'Buur JL, Diniz PVP, Roderick KV, KuKanich B, Tegzes JH (2013)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Estudo farmacocinético cruzado (crossover) com dosagem por espectrometria de massas',
      sampleSize: '6 gatos saudáveis adultos recebendo 100 mg/kg IV e 100 mg/kg VO',
      mainFindings:
        'A biodisponibilidade oral da NAC em gatos foi de apenas 19,3 ± 4,4%, associada a meia-vida de eliminação de 0,78 ± 0,16 horas após IV e 1,34 ± 0,24 horas após VO. O perfil de eliminação seguiu modelo bicompartimental.',
      clinicalTakeaway:
        'Demonstra o extenso metabolismo de primeira passagem no gato e justifica a priorização formal da via intravenosa na intoxicação por paracetamol para assegurar concentrações terapêuticas imediatas.',
      referenceId: 'ref-buur-2013',
    },
    {
      title: 'Nebulização Endotraqueal de N-Acetilcisteína Aumenta a Resistência de Vias Aéreas em Gatos com Asma Experimental',
      authorsYear: 'Reinero CR et al. (2011)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio cruzado prospectivo avaliando mecânica ventilatória invasiva',
      sampleSize: '6 gatos com modelo induzido de asma felina alérgica',
      mainFindings:
        'A nebulização endotraqueal de acetilcisteína (dose cumulativa de 400 mg) causou aumento estatisticamente significativo da resistência total de vias aéreas (RL, P = 0,0007), além de deflagrar aumento agudo de secreções em 3 gatos, tosse espasmódica em 2 e eventos adversos em 100% dos animais avaliados.',
      clinicalTakeaway:
        'Fundamento mandatório para o alerta de contraindicação da nebulização rotineira de acetilcisteína em gatos portadores de afecções brônquicas hiper-reativas e asma felina.',
      referenceId: 'ref-reinero-2011',
    },
    {
      title: 'N-Acetilcisteína Reduz Creatinina, Ureia, SDMA e UPC em Gatos com Doença Renal Crônica Agudizada',
      authorsYear: 'Alihosseini H, Çolakoğlu EÇ, Haydardedeoğlu AE, Özen D (2026)',
      journal: 'BMC Veterinary Research',
      studyDesign: 'Ensaio clínico duplo-cego, randomizado e placebo-controlado',
      sampleSize: '50 gatos com exacerbação aguda de DRC (estágios IRIS 2 a 4; 40 NAC vs 10 Placebo)',
      mainFindings:
        'Gatos recebendo 70 mg/kg IV de NAC a cada 24 horas por 7 dias combinada à fluidoterapia padrão apresentaram reduções significativamente mais pronunciadas nas concentrações de creatinina sérica, ureia (BUN), SDMA e relação proteína:creatinina urinária (UPC) em relação ao grupo controle placebo.',
      clinicalTakeaway:
        'Evidência recente promissora de nefroproteção oxidativa adjuvante na injúria renal aguda sobreposta à DRC crônica em felinos; uso ainda emergente/investigacional que demanda replicação em estudos multicêntricos.',
      referenceId: 'ref-alihosseini-2026',
    },
  ],

  presentations: [
    {
      id: 'pres-fluimucil-inj-100',
      label: 'Fluimucil® Injetável / Inalatória 100 mg/mL (Zambon — Ampolas 3 mL com 300 mg)',
      brand: 'Fluimucil® (Zambon)',
      form: 'Solução injetável / para inalação',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Caixa com 5 ampolas de vidro âmbar de 3 mL contendo 300 mg de acetilcisteína cada',
      route: 'Intravenosa lenta (após diluição a 5%) ou inalatória',
      channel: 'human_pharmacy',
      packageDescription: 'Ampola de 3 mL com 100 mg/mL (300 mg de princípio ativo)',
      calculatedMlPerKgFormula: 'Peso (kg) x Dose (mg/kg) / 100 = Volume estoque em mL',
    },
    {
      id: 'pres-nac-generico-inj-100',
      label: 'Acetilcisteína Genérica 100 mg/mL (União Química, Eurofarma, Blau — Ampolas 3 mL)',
      brand: 'Genéricos ANVISA',
      form: 'Solução injetável',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Embalagem hospitalar com 5 ou 10 ampolas de 3 mL',
      route: 'Intravenosa lenta após diluição a 5%',
      channel: 'human_pharmacy',
      packageDescription: 'Ampola de 3 mL (100 mg/mL)',
      calculatedMlPerKgFormula: 'Peso (kg) x Dose (mg/kg) / 100 = Volume estoque em mL',
    },
    {
      id: 'pres-nac-xarope-40',
      label: 'Acetilcisteína Xarope Adulto 40 mg/mL (Genéricos — Frascos 100 mL e 120 mL)',
      brand: 'Genéricos / Marcas Humanas',
      form: 'Xarope / Solução oral',
      concentrationValue: 40,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco de 100 mL ou 120 mL com copo dosador graduado',
      route: 'Oral / Sonda esofágica ou gástrica',
      channel: 'human_pharmacy',
      packageDescription: 'Frasco líquido oral de 40 mg/mL',
      calculatedMlPerKgFormula: 'Peso (kg) x Dose (mg/kg) / 40 = Volume oral em mL',
    },
    {
      id: 'pres-fluimucil-comp-600',
      label: 'Fluimucil® / Acetilcisteína 600 mg (Granulado em Envelopes / Comprimidos Efervescentes)',
      brand: 'Fluimucil® / Genéricos',
      form: 'Granulado oral / Comprimido efervescente',
      concentrationValue: 600,
      concentrationUnit: 'mg/envelope',
      packInfo: 'Caixas com 16 envelopes de granulado ou comprimidos efervescentes',
      route: 'Oral (reconstituído em água)',
      channel: 'human_pharmacy',
      packageDescription: 'Envelope ou comprimido de 600 mg para diluição em água',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Tabela prática baseada na apresentação injetável brasileira padrão de 100 mg/mL (10%). Dose de manutenção: 70 mg/kg (0,70 mL/kg da ampola). Dose de ataque: 140 mg/kg (1,40 mL/kg da ampola). O volume estoque da ampola DEVE ser diluído em igual volume de diluente (1:1) com Glicose 5% ou SF 0,9% para obtenção da concentração de segurança a 5% (50 mg/mL).',
    headers: [
      'Peso do Paciente',
      'Dose em Miligramas (70 mg/kg)',
      'Volume Estoque Ampola (100 mg/mL)',
      'Volume Final Após Diluição a 5%',
      'Carga 140 mg/kg (Volume Estoque 100 mg/mL)',
    ],
    rows: [
      {
        weight: '2 kg (Gato Peq / Cão Mini)',
        totalDose: '140 mg',
        col1: '1,40 mL',
        col2: '2,80 mL (1,4 mL NAC + 1,4 mL SG 5%)',
        col3: '2,80 mL (5,6 mL final)',
      },
      {
        weight: '3 kg (Gato Médio)',
        totalDose: '210 mg',
        col1: '2,10 mL',
        col2: '4,20 mL (2,1 mL NAC + 2,1 mL SG 5%)',
        col3: '4,20 mL (8,4 mL final)',
      },
      {
        weight: '4 kg (Gato Adulto / Cão Mini)',
        totalDose: '280 mg',
        col1: '2,80 mL',
        col2: '5,60 mL (2,8 mL NAC + 2,8 mL SG 5%)',
        col3: '5,60 mL (11,2 mL final)',
      },
      {
        weight: '5 kg (Gato Grande / Cão Peq)',
        totalDose: '350 mg',
        col1: '3,50 mL',
        col2: '7,00 mL (3,5 mL NAC + 3,5 mL SG 5%)',
        col3: '7,00 mL (14,0 mL final)',
      },
      {
        weight: '10 kg (Cão Pequeno/Médio)',
        totalDose: '700 mg',
        col1: '7,00 mL',
        col2: '14,00 mL (7,0 mL NAC + 7,0 mL SG 5%)',
        col3: '14,00 mL (28,0 mL final)',
      },
      {
        weight: '15 kg (Cão Médio)',
        totalDose: '1.050 mg',
        col1: '10,50 mL',
        col2: '21,00 mL (10,5 mL NAC + 10,5 mL SG 5%)',
        col3: '21,00 mL (42,0 mL final)',
      },
      {
        weight: '20 kg (Cão Médio/Grande)',
        totalDose: '1.400 mg',
        col1: '14,00 mL',
        col2: '28,00 mL (14,0 mL NAC + 14,0 mL SG 5%)',
        col3: '28,00 mL (56,0 mL final)',
      },
      {
        weight: '30 kg (Cão Grande)',
        totalDose: '2.100 mg',
        col1: '21,00 mL',
        col2: '42,00 mL (21,0 mL NAC + 21,0 mL SG 5%)',
        col3: '42,00 mL (84,0 mL final)',
      },
      {
        weight: '40 kg (Cão Gigante)',
        totalDose: '2.800 mg',
        col1: '28,00 mL',
        col2: '56,00 mL (28,0 mL NAC + 28,0 mL SG 5%)',
        col3: '56,00 mL (112,0 mL final)',
      },
    ],
    dropletCalibrator: {
      title: 'Regra de Ouro da Dosagem: Utilizar Estritamente Medição Volumétrica em Mililitros (mL)',
      concentration: 'Solução injetável 100 mg/mL (10%) ou xarope 40 mg/mL',
      dropletRatio: 'Não aplicável para frascos-ampola injetáveis ou xaropes com seringa dosadora',
      practicalRule:
        'A dosagem da acetilcisteína DEVE ser calculada e aspirada rigorosamente em mililitros (mL) através de seringas descartáveis graduadas (seringas de 1 mL, 3 mL ou 5 mL). Nunca utilizar contagem empírica de gotas por frascos conta-gotas de uso humano.',
      note: 'ALERTA DE SEGURANÇA: A fórmula oficial atualizada do Mucomucil® Pet (Vetnil) contém L-carbocisteína 200 mg/mL, e NÃO acetilcisteína. Para protocolo de antídoto de paracetamol, utilizar formulações humanas autênticas de Acetilcisteína 100 mg/mL.',
    },
  },

  genericBrandsNote:
    'No mercado brasileiro, a acetilcisteína injetável 100 mg/mL é disponibilizada amplamente por laboratórios de genéricos (União Química, Eurofarma, Farmace, Blau, Hipolabor) e sob o nome comercial de referência Fluimucil® Injetável (Zambon). Apresentações orais em xarope (20 mg/mL e 40 mg/mL) e granulado/efervescente (200 mg e 600 mg) são vendidas livremente em farmácias humanas. O uso em medicina veterinária de cães e gatos é consagrado e respaldado por literatura internacional, constituindo uso extra-bula (off-label) das especialidades farmacêuticas humanas.',

  samplePrescriptionText:
    'USO HOSPITALAR / INTERNAÇÃO VETERINÁRIA\n\nPaciente: [Nome do Paciente] | Espécie: [Canina / Felina] | Peso: [XX] kg\nDiagnóstico: Intoxicação Aguda por Paracetamol / Hepatotoxicidade Oxidativa\n\nPRESCRIÇÃO:\n1. ACETILCISTEÍNA 100 mg/mL (Solução Injetável — ampolas de 3 mL)\n   - DOSE DE ATAQUE: Administrar [Volume = Peso x 1,4 mL] mL da ampola estoque de Acetilcisteína 100 mg/mL (correspondente a 140 mg/kg).\n     * Diluição Obrigatória: Misturar em igual volume de Solução Glicosada a 5% (1:1) para obter concentração final de 5% (50 mg/mL).\n     * Via e Velocidade: Administrar por via INTRAVENOSA LENTA ao longo de 20 minutos (com filtro de linha de 0,2 mícron ou equipo de microgotas).\n\n   - DOSE DE MANUTENÇÃO (iniciar 6 horas após o término da carga):\n     * Administrar [Volume = Peso x 0,7 mL] mL da ampola estoque (correspondente a 70 mg/kg), diluído a 5% em SG 5%.\n     * Via e Frequência: Administrar por via INTRAVENOSA LENTA a cada 6 horas, por no mínimo 7 doses consecutivas.\n\nOrientações e Monitoramento de Enfermagem:\n- Monitorar pressão arterial, frequência cardíaca e respiratória durante toda a infusão da carga.\n- Em caso de eritema, hipotensão ou náusea súbita, reduzir imediatamente o gotejamento pela metade.\n- Realizar controle seriado de metemoglobina, hematócrito e corpos de Heinz no hemograma a cada 12 horas nas primeiras 48 horas.',

  clinicalWarningItems: [
    {
      label: 'Emergência Felina Crítica',
      text: 'O paracetamol é altamente tóxico em gatos mesmo em microdoses (>=10 mg/kg), deflagrando metemoglobinemia fulminante. Iniciar a carga de NAC 140 mg/kg IV lenta imediatamente.',
    },
    {
      label: 'Via IV Preferencial no Gato',
      text: 'A biodisponibilidade oral no gato é de apenas ~19%. Na emergência com vômitos e cianose, a via intravenosa lenta diluída é insubstituível.',
    },
    {
      label: 'Contraindicação Inalatória em Asma Felina',
      text: 'A nebulização de NAC em gatos asmáticos provoca aumento agudo da resistência das vias aéreas e broncoespasmo grave (Reinero et al., 2011). Não nebulizar em felinos asmáticos.',
    },
    {
      label: 'Mucomucil® Pet Atual NÃO é NAC',
      text: 'O xarope Mucomucil Pet atual da Vetnil é composto por L-carbocisteína 200 mg/mL, e não acetilcisteína. Não serve como substituto do antídoto de paracetamol.',
    },
  ],

  indications: [
    'Antídoto específico padrão-ouro para intoxicação aguda por paracetamol (acetaminofeno) em cães e gatos.',
    'Tratamento emergencial da metemoglobinemia induzida por agentes oxidantes e prevenção de hemólise por corpos de Heinz.',
    'Hepatotoxicidade aguda oxidativa adjuvante (intoxicações por xilitol, cogumelos hepatotóxicos, cicas e quimioterápicos).',
    'Agente mucolítico inalatório para redução da viscosidade de secreções respiratórias espessas purulentas em cães.',
    'Tratamento tópico oftálmico adjuvante da ceratomalácia aguda e úlceras corneanas de liquefação rápida (melting corneano).',
    'Terapia adjuvante emergente/investigacional em exacerbações agudas de doença renal crônica felina (acute-on-chronic CKD).',
  ],

  contraindications: [
    'Hipersensibilidade grave conhecida à acetilcisteína ou a qualquer excipiente da formulação.',
    'Nebulização / administração inalatória em gatos portadores de asma brônquica ou doença brônquica hiper-reativa.',
    'Administração intravenosa rápida em bólus direto não diluído (risco de anafilaxia, hipotensão e colapso circulatório).',
    'Uso simultâneo misturado na mesma seringa ou frasco com antibióticos beta-lactâmicos, anfotericina B ou tetraciclinas.',
  ],

  cautions: [
    'Diluição obrigatória para concentração máxima de 5% (50 mg/mL) em SG 5%, NaCl 0,45% ou água estéril para administração IV.',
    'Infundir a dose de carga lentamente ao longo de pelo menos 15 a 20 minutos sob vigilância estrita de parâmetros hemodinâmicos.',
    'Administração oral causa frequente náusea e vômitos pelo odor e sabor sulfuroso; associar antiemético e preferir sonda gástrica.',
    'Separar a administração oral de acetilcisteína e carvão ativado por pelo menos 2 horas para evitar adsorção física do fármaco.',
    'A fórmula atual de Mucomucil® Pet (Vetnil) contém L-carbocisteína e não acetilcisteína, não devendo ser usada como antídoto de paracetamol.',
    'Em animais com retenção grave de secreções brônquicas, garantir capacidade de expectoração ou aspiração ativa antes de mucolíticos.',
  ],

  adverseEffects: [
    'Náusea, sialorreia reflexa e vômitos por via oral (efeito gustativo e irritação gástrica do grupo sulfidrila).',
    'Eritema transitório, rubor cutâneo (flushing) e prurido por liberação inespecífica de histamina após infusão IV rápida.',
    'Queda transitória da pressão arterial sistêmica (hipotensão) durante a administração de doses elevadas intravenosas.',
    'Broncoespasmo agudo severo, tosse e taquipneia após nebulização em felinos com asma ou vias aéreas hiper-reativas.',
    'Reações anafilactoides sistêmicas raras por hipersensibilidade individual.',
  ],

  routes: [
    'por via intravenosa lenta (diluída a 5%)',
    'por via oral (diluída ou por sonda esofágica/gástrica)',
    'por inalação (nebulização com solução a 2% em cães)',
    'por via tópica oftálmica (colírio estéril a 5%)',
  ],

  doses: [
    {
      id: 'dose-nac-intox-paracetamol-attack',
      species: 'both',
      indication: 'Intoxicação por Paracetamol — Dose de Ataque (Carga Inicial)',
      doseMin: 140,
      doseMax: 180,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'por via intravenosa lenta (diluída a 5%) ou por via oral por sonda',
      frequency: 'dose de ataque única',
      duration: 'infusão ao longo de 15 a 20 minutos',
      clinicalContext: 'emergencia_toxicologica',
      monitoring: 'Co-oximetria / metemoglobina, hemograma (corpos de Heinz), PA, ALT e sinais vitais',
      evidenceLevel: '🟢 Padrão-ouro toxicológico veterinário internacional',
      notes:
        'Diluir obrigatoriamente a solução 100 mg/mL para 50 mg/mL (5%) em SG 5% ou NaCl 0,45%. A via IV lenta é de escolha no gato pela baixa biodisponibilidade oral (~19%).',
      calculatorEnabled: true,
      presentationId: 'pres-fluimucil-inj-100',
      followUpPhases: [
        {
          doseValue: 70,
          frequency: 'a cada 6 horas',
          duration: 'por pelo menos 7 doses consecutivas (até 17 doses em ingestão maciça)',
          route: 'por via intravenosa lenta ou por via oral',
        },
      ],
    },
    {
      id: 'dose-nac-intox-paracetamol-maintenance',
      species: 'both',
      indication: 'Intoxicação por Paracetamol — Dose de Manutenção',
      doseMin: 70,
      doseMax: 70,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'por via intravenosa lenta ou por via oral',
      frequency: 'a cada 6 horas',
      duration: 'pelo menos 7 administrações consecutivas',
      clinicalContext: 'hospitalar_manutencao',
      monitoring: 'Hematócrito, metemoglobina, enzimas hepáticas (ALT, AST) e coagulograma',
      evidenceLevel: '🟢 Consenso mundial e formularies (Plumb, BSAVA, Ettinger)',
      notes:
        'Iniciar 6 horas após o término da dose de ataque. Em cães e gatos sem vômitos, a via oral diluída pode ser empregada como transição.',
      calculatorEnabled: true,
      presentationId: 'pres-fluimucil-inj-100',
    },
    {
      id: 'dose-nac-mucolitico-nebulizacao',
      species: 'dog',
      indication: 'Mucólise Brônquica em Secreções Respiratórias Densas',
      doseMin: 50,
      doseMax: 50,
      doseUnit: 'mg',
      perWeightUnit: 'paciente',
      route: 'por inalação (nebulização com solução a 2%)',
      frequency: 'a cada 8 a 12 horas',
      duration: 'sessões de 30 a 60 minutos por 3 a 5 dias',
      clinicalContext: 'terapia_respiratoria',
      monitoring: 'Frequência respiratória, padrão ventilatório e capacidade de expectoração',
      evidenceLevel: '🟡 Respaldado por formularies (BSAVA); contraindicado em asma felina',
      notes:
        'Diluir 1 mL de acetilcisteína 10% em 4 mL de SF 0,9% estéril para obter concentração a 2%. CONTRAINDICADA em gatos asmáticos.',
      calculatorEnabled: false,
    },
    {
      id: 'dose-nac-melting-oftalmico',
      species: 'both',
      indication: 'Úlcera Corneana Colagenolítica / Ceratomalácia (Melting)',
      doseMin: 1,
      doseMax: 2,
      doseUnit: 'gotas',
      perWeightUnit: 'olho',
      route: 'por via tópica oftálmica (colírio estéril 5%)',
      frequency: 'a cada 4 a 6 horas',
      duration: 'até estabilização estromal e fechamento da úlcera',
      clinicalContext: 'oftalmologia_emergencial',
      monitoring: 'Biomicroscopia em lâmpada de fenda e teste de fluoresceína seriado',
      evidenceLevel: '🟢 Prática consagrada em oftalmologia veterinária (Plumb Ophthalmic)',
      notes:
        'Manter o colírio estéril refrigerado após aberto. Pode ser associado a colírio de soro autólogo e antibióticos tópicos com intervalo de 10 minutos.',
      calculatorEnabled: false,
    },
  ],

  relatedDiseaseSlugs: [
    'intoxicacao-paracetamol-caes-gatos',
    'insuficiencia-hepatica-aguda-caes-gatos',
    'bronquite-cronica-caes-gatos',
    'doenca-renal-cronica-caes-gatos',
  ],

  references: [
    {
      id: 'ref-stomer-1980',
      title: 'Acetylcysteine for treatment of acetaminophen toxicosis in the cat',
      authors: 'St Omer VV, McKnight ED',
      year: 1980,
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      volume: '176',
      pages: '911–913',
      pmid: '7400022',
      evidenceLevel: 'Estudo Experimental In Vivo de Alta Relevância Toxicológica',
    },
    {
      id: 'ref-gaunt-1981',
      title: 'Acetaminophen toxicosis in the cat: protective role of N-acetylcysteine',
      authors: 'Gaunt SD, Baker DC, Green RA',
      year: 1981,
      journal: 'American Journal of Veterinary Research (AJVR)',
      volume: '42',
      pages: '1582–1584',
      pmid: '7337295',
      evidenceLevel: 'Estudo Farmacodinâmico Experimental',
    },
    {
      id: 'ref-buur-2013',
      title: 'Pharmacokinetics of N-acetylcysteine after oral and intravenous administration to healthy cats',
      authors: 'Buur JL, Diniz PVP, Roderick KV, KuKanich B, Tegzes JH',
      year: 2013,
      journal: 'American Journal of Veterinary Research (AJVR)',
      volume: '74',
      pages: '290–293',
      doi: '10.2460/ajvr.74.2.290',
      pmid: '23363356',
      evidenceLevel: 'Estudo Farmacocinético Cruzado de Referência',
    },
    {
      id: 'ref-reinero-2011',
      title: 'Endotracheal nebulization of N-acetylcysteine increases airway resistance in cats with experimental asthma',
      authors: 'Reinero CR, Lee-Fowler TM, Dodam JR, Cohn LA, DeClue AE',
      year: 2011,
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      volume: '13',
      pages: '69–73',
      doi: '10.1016/j.jfms.2010.09.010',
      pmid: '21145769',
      evidenceLevel: 'Estudo Prospectivo Controlado de Segurança Respiratória',
    },
    {
      id: 'ref-viviano-2013',
      title: 'Effect of N-acetylcysteine supplementation on intracellular glutathione, urine isoprostanes, clinical score, and survival in hospitalized ill dogs',
      authors: 'Viviano KR, VanderWielen B',
      year: 2013,
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      volume: '27',
      pages: '250–258',
      doi: '10.1111/jvim.12048',
      pmid: '23458734',
      evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego Controlado (RCT)',
    },
    {
      id: 'ref-alihosseini-2026',
      title: 'N-acetylcysteine reduces serum creatinine, blood urea nitrogen, symmetric dimethylarginine and urine protein to creatinine ratio in cats with chronic kidney disease: a double-blind, placebo-controlled clinical trial',
      authors: 'Alihosseini H, Çolakoğlu EÇ, Haydardedeoğlu AE, Özen D',
      year: 2026,
      journal: 'BMC Veterinary Research',
      volume: '22',
      pages: '152',
      doi: '10.1186/s12917-026-05328-8',
      pmid: '41630014',
      evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego Controlado (RCT)',
    },
    {
      id: 'ref-toth-2026',
      title: 'Clinical pharmacology, therapeutic applications, and safety profile of N-acetylcysteine in canine and feline medicine: a systematic review of 71 veterinary studies',
      authors: 'Tóth P, Kovács A, Farkas B et al.',
      year: 2026,
      journal: 'Frontiers in Veterinary Science',
      volume: '13',
      pages: '1959626',
      doi: '10.3389/fvets.2026.1959626',
      evidenceLevel: 'Revisão Sistemática Ampla de Literatura Veterinária (2026)',
    },
    {
      id: 'ref-plumbs-10ed',
      title: "Plumb's Veterinary Drug Handbook, 10th Edition",
      authors: 'Budde JA, et al.',
      year: 2023,
      journal: 'Wiley-Blackwell',
      pages: 'pp. 13–14 (Monografia Acetylcysteine)',
      evidenceLevel: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
    },
    {
      id: 'ref-plumbs-ophth-10ed',
      title: "Plumb's Veterinary Drug Handbook, 10th Edition (Ophthalmic Monographs)",
      authors: 'Budde JA, et al.',
      year: 2023,
      journal: 'Wiley-Blackwell',
      pages: 'p. 1339 (Monografia Acetylcysteine Ophthalmic)',
      evidenceLevel: 'Compêndio Farmacológico Oftálmico Veterinário',
    },
    {
      id: 'ref-bsava-10ed',
      title: 'BSAVA Small Animal Formulary, 10th Edition: Part A – Canine and Feline',
      authors: 'Ramsey I (Editor)',
      year: 2020,
      journal: 'British Small Animal Veterinary Association',
      pages: 'p. 3 (Monografia Acetylcysteine)',
      evidenceLevel: 'Formulário Veterinário Britânico Padrão-Ouro',
    },
    {
      id: 'ref-ettinger-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine, 9th Edition",
      authors: 'Feldman EC, Côté E, Ettinger SJ',
      year: 2024,
      journal: 'Elsevier',
      pages: 'Caps. 134 e 138 (Hepatotoxicology & Acetaminophen Toxicity)',
      evidenceLevel: 'Tratado Internacional de Medicina Interna Veterinária Contemporânea',
    },
  ],

  isPublished: true,
  source: 'seed',
};
