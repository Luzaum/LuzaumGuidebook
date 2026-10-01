import type { EditorialReference } from '../types/common';
import type { MedicationRecord } from '../types/medication';
import { repairMedicationReferences } from './medicationReferenceCorrections';
import { applyMedicationClinicalCorrections } from './medicationClinicalCorrections';

/**
 * Sínteses editoriais próprias fundamentadas nos quatro tratados de referência:
 * 1. Plumb’s Veterinary Drug Handbook (10ª ed.)
 * 2. BSAVA Small Animal Formulary, Part A: Canine and Feline (10ª ed.)
 * 3. Nelson & Couto: Medicina Interna de Pequenos Animais (6ª ed.)
 * 4. Ettinger's Textbook of Veterinary Internal Medicine (9ª ed., 2024)
 */
interface BookFoundation {
  plumbs?: { monograph: string; pages: string };
  bsava?: { monograph: string; pages: string };
  nelsonCouto?: { chapter: string; pages: string };
  ettinger?: { chapter: string; pages: string };
  productSource?: string;
  topics: Array<{ title: string; narrative: string }>;
}

export const MEDICATION_BOOK_FOUNDATIONS: Record<string, BookFoundation> = {
  acetilcisteina: {
    plumbs: { monograph: 'Acetylcysteine', pages: '12–15' },
    bsava: { monograph: 'Acetylcysteine', pages: '3–4' },
    nelsonCouto: { chapter: 'Cap. 35: Hepatobiliary Diseases in the Cat (Acetaminophen Toxicity) & Cap. 36: Hepatobiliary Diseases in the Dog', pages: '575–580, 595–600' },
    ettinger: { chapter: 'Cap. 269: Acute Toxic and Other Parenchymal Liver Disease (Acetaminophen Hepatotoxicity and Free Radical Scavengers)', pages: '1612–1618' },
    topics: [
      {
        title: 'Do antioxidante ao antídoto: bases farmacodinâmicas da reposição de glutationa',
        narrative:
          'A acetilcisteína (N-acetilcisteína ou NAC) atua como precursora direta da L-cisteína, aminoácido limitante na biossíntese da glutationa reduzida (GSH), o principal sistema antioxidante e nucleofílico intracelular hepático. Na intoxicação por paracetamol (acetaminofeno), a saturação das vias de glicuronidação e sulfatação desvia o metabolismo para o citocromo P450, gerando o metabólito altamente reativo NAPQI (N-acetil-p-benzoquinona imina). A NAC fornece substrato para conjugar e neutralizar o NAPQI antes que ocorra ligação covalente a macromoléculas dos hepatócitos e oxidação da hemoglobina a metemoglobina, fenômeno especialmente grave na espécie felina devido à deficiência constitucional de glicuroniltransferase e presença de 8 grupos sulfidrila reativos na hemoglobina. Ettinger (2024) e Nelson & Couto (6ª ed.) enfatizam que a eficácia protetora máxima é alcançada quando o tratamento é instituído nas primeiras 8 a 16 horas pós-ingestão, embora protocolos tardios ainda ofereçam benefício antioxidante adjuvante.',
      },
      {
        title: 'Vias de administração, formulações e farmacocinética clínica',
        narrative:
          'A via de administração define estritamente o efeito terapêutico e o perfil de segurança da acetilcisteína. Por via inalatória/nebulização, a NAC atua localmente rompendo pontes dissulfeto de mucoproteínas, reduzindo a viscosidade do muco brônquico; contudo, pode deflagrar broncoespasmo reflexo grave em pacientes com vias aéreas reativas (asma felina e bronquite crônica canina), exigindo pré-tratamento ou associação concomitante com broncodilatadores. Para ação antídoto sistêmica, utilizam-se as vias oral (VO) ou intravenosa (IV). A administração intravenosa deve utilizar solução estéril compatível, devidamente diluída em solução glicosada a 5% ou cloreto de sódio a 0,9% e infundida ao longo de 15 a 60 minutos através de filtro estéril para evitar reações anafilactoides e flebite. A formulação oral tem odor e sabor sulfúreo desagradável que frequentemente precipita êmese; a diluição prévia em suco ou água e o fracionamento reduzem esse impacto.',
      },
      {
        title: 'Protocolos de monitoramento, interações com carvão ativado e segurança',
        narrative:
          'No manejo emergencial da intoxicação por paracetamol, a descontaminação gastrintestinal com carvão ativado atrai e adsorve a NAC oral se administrados simultaneamente no trato digestivo. Plumb’s (10ª ed.) e BSAVA (10ª ed.) recomendam respeitar um intervalo mínimo de 1 a 2 horas entre a administração do carvão ativado e a NAC oral, ou optar preferencialmente pela via intravenosa para contornar essa quelação entérica. O monitoramento laboratorial rigoroso abrange a dosagem seriada de ALT, AST, fosfatase alcalina, bilirrubinas totais e frações, tempo de protrombina (TP), gasometria venosa e avaliação macroscópica e espectrofotométrica da presença de metemoglobinemia e corpúsculos de Heinz ao esfregaço sanguíneo, sobretudo em gatos.',
      },
    ],
  },

  alopurinol: {
    plumbs: { monograph: 'Allopurinol', pages: '37–39' },
    bsava: { monograph: 'Allopurinol', pages: '11–12' },
    nelsonCouto: { chapter: 'Cap. 40: Disorders of Micturition and Urolithiasis & Cap. 89: Protozoal Infections (Leishmaniasis)', pages: '660–666, 1378–1384' },
    ettinger: { chapter: 'Cap. 195: Canine and Feline Leishmaniosis & Cap. 286: Canine Urolithiasis', pages: '1120–1128, 1750–1758' },
    topics: [
      {
        title: 'Inibição da xantina-oxidase e o paradoxo urolítico da xantina',
        narrative:
          'O alopurinol atua como análogo da hipoxantina e inibidor competitivo e suicida da xantina-oxidase (XO/XOR), sendo oxidado pela própria enzima em oxipurinol (aloxantina), cujo complexo inibitório estável reduz acentuadamente a conversão de hipoxantina em xantina e de xantina em ácido úrico. Em cães hiperuricosúricos por defeito genético no transportador hepático e renal de urato (mutações no gene SLC2A9 em Dálmatas, Bulldogs Ingleses e outras raças), o fármaco diminui a excreção de urato urinário para dissolver e prevenir cálculos de urato de amônio. Contudo, tanto Ettinger (2024) quanto Nelson & Couto (6ª ed.) destacam o paradoxo farmacológico urolítico: ao interromper a cascata catabólica, ocorre acúmulo a montante de xantina, substância ainda menos solúvel que o urato em urina ácida ou neutra. Se a dieta não for rigorosamente restrita em purinas e o manejo hídrico for insuficiente, a precipitação de urólitos iatrogênicos de xantina torna-se iminente, os quais são radiotransparentes e insensíveis à dissolução médica química, exigindo intervenção cirúrgica ou endoscópica.',
      },
      {
        title: 'Mecanismo antiparasitário na leishmaniose: captação seletiva e salvamento de purinas',
        narrative:
          'Diferentemente dos vertebrados superiores, os protozoários do gênero Leishmania não sintetizam anéis purínicos por via de novo, dependendo estritamente do salvamento de purinas do hospedeiro mamífero. O alopurinol é transportado ativamente para o interior dos amastigotas e metabolizado pelas enzimas fosforribosiltransferases parasitárias (HGPRT e XPRT) em ribonucleotídeos anormais de pirazolopirimidina, em especial o monofosfato de alopurinol-ribosídeo. Esses nucleotídeos atípicos inibem enzimas-chave como a IMP-desidrogenase e a GMP-redutase, esgotando o pool intracelular de nucleotídeos de adenina e guanina, além de serem incorporados diretamente às fitas de RNA mensageiro parasitário, bloqueando a síntese proteica e inviabilizando a divisão celular do parasito. Conforme as diretrizes consensuais LeishVet (2024–2025) e Ettinger (2024), essa atividade é leishmaniostática e não leishmanicida esterilizante, justificando protocolos prolongados de 6 a 12 meses associados a agentes leishmanicidas de ataque (miltefosina ou antimoniato de meglumina).',
      },
      {
        title: 'Interações metabólicas críticas com azatioprina e manejo clínico em nefropatas',
        narrative:
          'A xantina-oxidase é uma das principais vias de inativação oxidativa da 6-mercaptopurina, metabólito ativo e citotóxico da azatioprina. O bloqueio concomitante da enzima pelo alopurinol desvia o metabolismo das tiopurinas exclusivamente para a rota das enzimas hipoxantina-guanina fosforribosiltransferase (HGPRT) e tiopurina metiltransferase (TPMT), resultando em hiperconcentração de nucleotídeos 6-tioguanina (6-TGN) com aplasia medular fulminante, trombocitopenia e pancitopenia fatal. Plumb’s (10ª ed.) e BSAVA (10ª ed.) advertem que a coadministração com azatioprina é estritamente contraindicada na prática geral, ou exige redução mandatória de 66% a 75% da dose do imunossupressor com monitoramento hematológico semanal. Além disso, tanto o alopurinol quanto o oxipurinol são depurados predominantemente pelos rins; em cães e gatos com doença renal crônica ou glomerulonefrite secundária à leishmaniose, a meia-vida do metabólito ativo dobra ou triplica, exigindo titulação cautelosa e redução da dose inicial (5 mg/kg q12h) para evitar toxicidade sistêmica e necrose tubular.',
      },
    ],
  },

  amitriptilina: {
    plumbs: { monograph: 'Amitriptyline', pages: '59–60' },
    bsava: { monograph: 'Amitriptyline', pages: '22–23' },
    nelsonCouto: { chapter: 'Cap. 64: Neuromuscular Diseases and Pain Management & Cap. 41: Disorders of the Micturition and Feline Idiopathic Cystitis', pages: '980–988, 672–678' },
    ettinger: { chapter: 'Cap. 43: Pain Assessment and Management & Cap. 288: Feline Lower Urinary Tract Diseases', pages: '240–248, 1782–1790' },
    topics: [
      {
        title: 'Farmacologia multirreceptorial: inibição de monoaminas, analgesia espinhal e efeitos colaterais',
        narrative:
          'A amitriptilina é uma amina terciária tricíclica que inibe a recaptação neuronal de serotonina (SERT) e noradrenalina (NET) na fenda sináptica, sendo extensamente biotransformada no fígado em nortriptilina, metabólito ativo dotado de potente atividade inibidora sobre a recaptação de noradrenalina. Essa potencialização monoaminérgica estimula as vias inibitórias descendentes que se projetam da substância cinzenta periaquedutal até o corno dorsal da medula espinhal, ativando receptores alfa-2 adrenérgicos e serotoninérgicos que reduzem a transmissão nociceptiva em dores neuropáticas e estados de sensibilização central. Contudo, seu perfil farmacológico amplo envolve antagonismo competitivo dos receptores histaminérgicos H1 (induzindo sedação acentuada inicial e estímulo de apetite), bloqueio muscarínico colinérgico (provocando boca seca, constipação e relaxamento detrusor com risco de retenção urinária) e antagonismo alfa-1 adrenérgico (hipotensão). Em superdosagens, o bloqueio dos canais rápidos de sódio miocárdicos lentifica a condução intraventricular, configurando risco de arritmias ventriculares graves.',
      },
      {
        title: 'O paradoxo da Cistite Idiopática Felina: ineficácia na crise aguda versus papel adjuvante crônico',
        narrative:
          'O emprego da amitriptilina na Cistite Idiopática Felina (FIC) passou por profunda reavaliação nas últimas duas décadas, consolidada pelas diretrizes internacionais do iCatCare (2025). Ensaios clínicos randomizados duplo-cegos controlados por placebo (Kruger et al. 2003 e Kraijer et al. 2003) comprovaram que cursos curtos de amitriptilina (7 dias) durante a crise aguda de FIC não aceleram a resolução clínica e podem inclusive aumentar a frequência de recorrências precoces. Além disso, sua potente atividade anticolinérgica relaxa a musculatura do detrusor vesical, tornando o fármaco formalmente contraindicado em gatos obstruídos ou com atonia vesical. Seu nicho de utilidade clínica reside exclusivamente como terapia coadjuvante em casos de FIC crônica, grave e recidivante que falharam ao enriquecimento ambiental multimodal (MEMO) e controle hídrico, conforme demonstrado no estudo prospectivo de longo prazo de Chew et al. (1998).',
      },
      {
        title: 'Segurança, toxicologia e reversão cardiológica da superdose com bicarbonato de sódio',
        narrative:
          'A margem terapêutica da amitriptilina é estreita, e a ingestão acidental de comprimidos comerciais humanos de 25 mg ou 75 mg por cães e gatos constitui uma emergência toxicológica grave. A toxicidade manifesta-se pela tríade de depressão do SNC (ou hiperexcitabilidade paradoxal com tremores e convulsões), sinais anticolinérgicos exuberantes (midríase, taquicardia sinusal e íleo) e cardiotoxicidade por bloqueio de canais de sódio voltagem-dependentes, evidenciada no eletrocardiograma pelo alargamento do complexo QRS e taquicardia ventricular. O tratamento específico da cardiotoxicidade baseia-se na administração intravenosa lenta de bicarbonato de sódio a 8,4% (2 a 3 mEq/kg IV), cuja alcalinização sérica e sobrecarga de sódio extracelular diminuem a ligação do fármaco aos canais miocárdicos, restaurando a condução elétrica normal. O uso de fisostigmina é contraindicado pelo risco de precipitar assistolia e convulsões. Tratamentos crônicos superiores a 4 semanas exigem desmame progressivo ao longo de 2 a 3 semanas para prevenir síndrome de descontinuação.',
      },
    ],
  },

  'amoxicilina-clavulanato': {
    plumbs: { monograph: 'Amoxicillin/Clavulanate', pages: '70–73' },
    bsava: { monograph: 'Co-amoxiclav', pages: '98–101' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Potentiated Aminopenicillins)', pages: '1436–1442' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 184: Laboratory Diagnosis of Infectious Disease', pages: '45–52, 1010–1018' },
    topics: [
      {
        title: 'Mecanismo de ação bactericida e inibição suicida de beta-lactamases',
        narrative:
          'A amoxicilina é uma aminopenicilina semissintética de ação bactericida dependente do tempo, que se liga covalentemente às proteínas ligadoras de penicilina (PBPs), inibindo a transpeptidação terminal da síntese da parede celular de peptidoglicano e ativando autolisinas endógenas que culminam na lise bacteriana osmótica. O ácido clavulânico atua como um inibidor suicida progressivo e irreversível de beta-lactamases das classes funcionais de Ambler A (incluindo penicilinases estafilocócicas e beta-lactamases de espectro ampliado de Gram-negativos). Ao ligar-se ao sítio ativo da enzima bacteriana, o clavulanato é hidrolisado e forma um intermediário acil-enzima estável que inativa a defesa bacteriana, protegendo a integridade da molécula de amoxicilina e restaurando a sensibilidade em cepas de Staphylococcus pseudintermedius, Escherichia coli e Klebsiella spp.',
      },
      {
        title: 'Farmacodinâmica tempo-dependente e a regra farmacológica de 50% T > CIM',
        narrative:
          'Como antimicrobiano beta-lactâmico clássico, o índice farmacodinâmico determinante da eficácia clínica e bacteriológica da amoxicilina-clavulanato é a porcentagem do intervalo entre as doses durante a qual a concentração plasmática da droga livre excede a Concentração Inibitória Mínima do patógeno (% T > CIM). Tratados internacionais de farmacologia clínica (Ettinger 2024, Plumb’s 10ª ed.) determinam que a exposição ótima para betalactâmicos requer T > CIM de pelo menos 40% a 50% do intervalo posológico para cães e gatos. Por essa razão, intervalos prolongados de 24 horas são inadequados na rotina clínica de pequenos animais, devendo-se rigorosamente manter o fracionamento a cada 12 horas (q12h) para tecidos moles e trato urinário, ou a cada 8 horas (q8h) em sepse e infecções respiratórias graves.',
      },
      {
        title: 'Tolerância gastrintestinal, apresentações comerciais e stewardship antimicrobiano',
        narrative:
          'O ácido clavulânico estimula a motilidade gastrintestinal por ação agonista direta sobre receptores da motilina, sendo a êmese e a diarreia osmótica transitória os efeitos adversos mais frequentemente relatados. A administração imediatamente antes ou junto com uma refeição reduz sensivelmente o desconforto gástrico sem comprometer a biodisponibilidade sistêmica. Na medicina veterinária, formulações orais veterinárias possuem proporção fixa de amoxicilina para clavulanato de 4:1, enquanto certas apresentações humanas utilizam proporções distintas (7:1 ou 8:1); a intercambialidade não deve ser feita sem ajuste rigoroso da dose de clavulanato para evitar toxicidade digestiva ou subdose. Dentro das diretrizes de Antimicrobial Stewardship da ISCAID, a amoxicilina-clavulanato é classificada como antibiótico de primeira linha essencial, devendo ser indicada com base em citologia e cultura/antibiograma.',
      },
    ],
  },

  'ampicilina-sulbactam': {
    plumbs: { monograph: 'Ampicillin/Sulbactam', pages: '82–84' },
    bsava: { monograph: 'Ampicillin (e aminopenicilinas associadas)', pages: '27–28' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy & Cap. 25: Emergency Management of Respiratory Distress', pages: '1436–1442, 312–325' },
    ettinger: { chapter: 'Cap. 128: Sepsis and the Systemic Inflammatory Response Syndrome & Cap. 7: Antimicrobial Stewardship', pages: '642–650, 45–52' },
    topics: [
      {
        title: 'Espectro bactericida parenteral e papel fundamental na sepse hospitalar',
        narrative:
          'A associação parenteral ampicilina-sulbactam (proporção 2:1) combina uma aminopenicilina bactericida de amplo espectro a um inibidor sintético de beta-lactamases da classe das sulfonas penicilânicas. O sulbactam protege a ampicilina contra a inativação enzimática por cepas produtoras de beta-lactamases de Staphylococcus spp., anaeróbios estritos (Bacteroides fragilis, Clostridium spp.) e enterobactérias selecionadas, além de exercer atividade antibacteriana intrínseca direta contra determinadas espécies de Acinetobacter. Essa formulação é indispensável na terapia intensiva veterinária para o manejo empírico inicial de sepse de origem abdominal (peritonite séptica, colecistite bacteriana), broncopneumonia bacteriana aspirativa e infecções de tecidos moles profundos onde a absorção gastrintestinal está abolida.',
      },
      {
        title: 'Farmacocinética de eliminação renal, ajuste na azotemia e estabilidade',
        narrative:
          'Tanto a ampicilina quanto o sulbactam são amplamente distribuídos pelo líquido extracelular e eliminados de forma predominante por filtração glomerular e secreção tubular renal ativa na forma inalterada. Em cães e gatos com insuficiência renal aguda ou disfunção renal avançada (estágios IRIS 3 e 4), a meia-vida de eliminação plasmática prolonga-se substancialmente (atingindo cerca de 3,9 horas em cães azotêmicos). Nesses pacientes, Ettinger (2024) e Nelson & Couto (6ª ed.) preconizam estender o intervalo posológico de q8h para q12h em azotemia moderada a severa, preservando a magnitude da dose individual para garantir o pico bactericida. A solução aquosa reconstituída apresenta estabilidade química limitada, devendo ser administrada imediatamente após o preparo.',
      },
      {
        title: 'Preparo, velocidade de infusão intravenosa e monitoramento de hipersensibilidade',
        narrative:
          'A administração intravenosa direta em bólus rápido deve ser evitada devido ao risco de náusea reflexa, salivação, excitação central transitória e irritação endotelial vascular local. Recomenda-se diluir o frasco reconstituído em solução de cloreto de sódio a 0,9% e infundir lentamente ao longo de 15 a 30 minutos. Reações de hipersensibilidade imunomediada (tipo I mediada por IgE, com prurido facial, angioedema, urticária e broncoespasmo, ou anemia hemolítica imunomediada tardia) são contraindicações formais ao reuso de qualquer penicilina.',
      },
    ],
  },

  buprenorfina: {
    plumbs: { monograph: 'Buprenorphine', pages: '150–154' },
    bsava: { monograph: 'Buprenorphine', pages: '53–55' },
    nelsonCouto: { chapter: 'Cap. 28: General Therapeutic Principles & Cap. 69: Disorders of the Joints (Analgesic Protocols)', pages: '425–432, 1105–1112' },
    ettinger: { chapter: 'Cap. 40: Pain Management and Analgesic Protocols (Partial Mu-Opioid Agonists in Small Animals)', pages: '188–192' },
    topics: [
      {
        title: 'Farmacologia do agonista parcial mu: alta afinidade e cinética de dissociação lenta',
        narrative:
          'A buprenorfina é um opioide semissintético lipofílico derivado da tebaína classificado farmacologicamente como agonista parcial do receptor opioide mu e antagonista/agonista fraco dos receptores kappa e delta. Apresenta afinidade de ligação extremamente elevada (Ki submolar) pelo receptor mu, mas atividade intrínseca submáxima comparada a agonistas plenos como morfina e metadona. Essa propriedade confere um efeito teto analgésico e teto depressor respiratório para a substância isolada. Uma vez ancorada ao receptor mu, a buprenorfina dissocia-se muito lentamente, conferindo longa duração de ação antinociceptiva (6 a 8 horas) que ultrapassa suas baixas concentrações plasmáticas circulantes.',
      },
      {
        title: 'Particularidades da absorção pela via oral transmucosa (OTM) na espécie felina',
        narrative:
          'Em gatos, o pH da mucosa oral (aproximadamente 8,0 a 9,0) favorece a forma não ionizada e altamente lipofílica da buprenorfina, permitindo excelente absorção pela via oral transmucosa (OTM) com biodisponibilidade clínica de quase 100%, idêntica à via intravenosa. Esse perfil consagrou a via OTM como rota de escolha não invasiva para analgesia pós-operatória e ambulatorial em felinos. A administração deve ser depositada diretamente na mucosa oral ou bochecha, sem deglutição forçada. Em cães, a biodisponibilidade OTM é significativamente inferior e errática (30% a 45%), sendo as vias intravenosa e intramuscular as recomendadas na espécie canina.',
      },
      {
        title: 'Estratégias de resgate analgésico, reversão com naloxona e analgesia multimodal',
        narrative:
          'Em virtude de sua altíssima afinidade de ligação ao receptor mu, a tentativa de resgate analgésico subsequente ou a reversão de depressão clínica exigem planejamento farmacológico específico. Caso o paciente manifeste dor transoperatória intensa que ultrapasse o teto analgésico da buprenorfina, a administração de agonistas plenos (como metadona, fentanil ou hidromorfona) pode exigir doses escalonadas para superar a ocupação do receptor. Da mesma forma, episódios de sobredose exigem doses repetidas ou infusão contínua de naloxona, pois uma dose única convencional pode não deslocar a molécula ancorada ao receptor. Dentro do conceito de analgesia multimodal preventiva (AAHA/ISFM), a buprenorfina atinge sinergismo excelente quando associada a AINEs.',
      },
    ],
  },

  capromorelina: {
    plumbs: { monograph: 'Capromorelin', pages: '182–184' },
    bsava: { monograph: 'Capromorelin', pages: '61–62' },
    nelsonCouto: { chapter: 'Cap. 41: Acute Kidney Injury and Chronic Kidney Disease (Management of Inappetence and Cachexia)', pages: '685–692' },
    ettinger: { chapter: 'Cap. 301: Chronic Kidney Disease & Cap. 158: Nutritional Management of Renal Disease', pages: '1995–2010, 880–888' },
    topics: [
      {
        title: 'Agonismo do receptor secretagogo do hormônio do crescimento (GHS-R1a)',
        narrative:
          'A capromorelina é uma molécula sintética inovadora que atua como agonista seletivo do receptor do secretagogo do hormônio do crescimento (GHS-R1a), mimetizando com precisão a ação da grelina, o "hormônio endógeno da fome". Ao ativar os receptores no hipotálamo ventromedial e no núcleo arqueado, a capromorelina estimula os neurônios orexígenos NPY/AgRP e inibe os neurônios anorexígenos POMC/CART, desencadeando um estímulo potente e imediato do apetite. Simultaneamente, ativa o eixo somatotrófico na adeno-hipófise, promovendo liberação pulsátil do hormônio do crescimento (GH) e consequente produção hepática de IGF-1 (Fator de Crescimento Semelhante à Insulina tipo 1), auxiliando no anabolismo proteico e na atenuação da sarcopenia e caquexia na doença crônica.',
      },
      {
        title: 'Diferenças de indicação, formulação e dosagem entre cães (Entyce) e gatos (Elura)',
        narrative:
          'A capromorelina possui registros e formulações veterinárias completamente distintas para cada espécie: a solução oral canina (Entyce® 30 mg/mL) destina-se ao estímulo rápido do apetite na dose de 3 mg/kg SID, enquanto a solução oral felina (Elura® 20 mg/mL) foi desenvolvida e aprovada especificamente para o controle da perda de peso involuntária e manutenção da massa corporal em gatos com Doença Renal Crônica (DRC) na dose de 2 mg/kg SID. A ingestão alimentar concomitante reduz moderadamente a absorção em felinos, recomendando-se administrar a dose felina aproximadamente 30 minutos antes da refeição ou sob estômago vazio para otimizar o ganho ponderal.',
      },
      {
        title: 'Efeitos hormonais e hemodinâmicos: vigilância glicêmica e circulatória',
        narrative:
          'A elevação do hormônio do crescimento induzida pela capromorelina reduz a sensibilidade periférica à insulina e estimula a glicogenólise hepática, podendo deflagrar hiperglicemia transitória ou descompensação clínica em pacientes diabéticos prévios ou gatos com acromegalia (hipersomatotropismo). Em felinos, o agonismo dos receptores de grelina centrais e autonômicos pode causar hipotensão arterial transitória, bradicardia sinusal e letargia. Ettinger (2024) enfatiza o controle seriado da pressão arterial sistêmica, frequência cardíaca, frutosamina e glicemia de jejum em gatos idosos ou com DRC avançada em uso de capromorelina.',
      },
    ],
  },

  ceftriaxona: {
    plumbs: { monograph: 'Ceftriaxone', pages: '230–231' },
    bsava: { monograph: 'Cephalosporins (Cefalosporinas parenterais)', pages: '68–72' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy & Cap. 101: Disorders of the Nervous System', pages: '1436–1442, 1600–1608' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 128: Sepsis and Systemic Inflammatory Response Syndrome', pages: '45–52, 642–650' },
    topics: [
      {
        title: 'Mecanismo bactericida tempo-dependente, acilação de PBPs e farmacodinâmica de fT > MIC',
        narrative:
          'A ceftriaxona é uma cefalosporina de 3ª geração bactericida que atua inibindo a síntese de peptidoglicano da parede celular bacteriana através da acilação covalente do sítio catalítico das proteínas ligadoras de penicilina (PBPs), com elevada afinidade pelas PBP-2 e PBP-3 de bacilos Gram-negativos. A desestabilização da parede, combinada com a atividade lítica desregulada de autolisinas bacterianas, deflagra lise osmótica rápida celular. Por ser um beta-lactâmico clássico, seu índice farmacodinâmico determinante de erradicação clínica é o tempo em que a concentração plasmática livre da droga excede a Concentração Inibitória Mínima (% fT > MIC). Diferentemente de antimicrobianos concentração-dependentes, a elevação desmedida da concentração de pico não compensa intervalos posológicos excessivamente espaçados, exigindo manutenção de concentrações séricas eficazes durante a maior parte do intervalo terapêutico.',
      },
      {
        title: 'Divergência farmacocinética entre espécies: por que a ceftriaxona não é "SID" em cães e gatos',
        narrative:
          'Em medicina humana, a ceftriaxona consagrou-se pela comodidade de administração em dose única diária (a cada 24 horas) em virtude de sua prolongada meia-vida de eliminação (6 a 11 horas), decorrente de uma ligação extremamente elevada à albumina plasmática (~90% a 95%). Em contraste marcante, ensaios farmacológicos clássicos em cães (Popick et al., 1987; Rebuelto et al., 2002) demonstraram que a ligação proteica canina é baixa e saturável (~25% caindo para 2% em altas doses), conferindo uma depuração renal acelerada e meia-vida de apenas aproximadamente 0,9 a 1,7 horas. Em felinos (Albarellos et al., 2007), a meia-vida plasmática terminal é de cerca de 1,73 horas. Essa acentuada diferença de depuração torna o regime humano de 24 horas inadequado e subinibitório para infecções graves em pequenos animais, justificando plenamente o fracionamento posológico a cada 12 horas (q12h) em sepse, infecções profundas ou isolados com MIC moderada.',
      },
      {
        title: 'Incompatibilidade físico-química com cálcio, Ringer Lactato e princípios de stewardship da WOAH',
        narrative:
          'A ceftriaxona apresenta uma das incompatibilidades físico-químicas mais críticas e bem documentadas da farmacologia hospitalar: a complexação estequiométrica com íons divalentes de cálcio, formando precipitados microvasculares insolúveis que podem induzir embolia letal, falência renal aguda e bloqueio de equipos. É terminantemente contraindicada sua mistura na mesma bolsa, seringa ou administração simultânea em Y-site com Solução de Ringer com Lactato, Hartmann ou qualquer eletrólito com cálcio. Se o paciente em choque séptico necessitar de Ringer Lactato contínuo, deve-se pausar a infusão, proceder a lavagem vigorosa do cateter ("flush") com cloreto de sódio 0,9%, administrar a ceftriaxona em carreador compatível, repetir o flush e somente então religar a fluidoterapia. Sob a perspectiva da Organização Mundial de Saúde Animal (WOAH 2024-2025), as cefalosporinas de 3ª geração constituem classe de importância veterinária e humana crítica, devendo ser reservadas estritamente para infecções bacterianas graves e sepse com base em cultura e antibiograma.',
      },
    ],
  },

  clindamicina: {
    plumbs: { monograph: 'Clindamycin', pages: '282–286' },
    bsava: { monograph: 'Clindamycin', pages: '91–93' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Lincosamides) & Cap. 98: Polysystemic Protozoal Infections (Toxoplasmosis and Neosporosis)', pages: '1440–1444, 1548–1554' },
    ettinger: { chapter: 'Cap. 197: Systemic Protozoal Diseases (Toxoplasmosis and Neosporosis) & Cap. 7: Antimicrobial Stewardship', pages: '1025–1032, 45–52' },
    topics: [
      {
        title: 'Inibição ribossomal 50S, bloqueio de toxinas estafilocócicas e ação antiprotozoária',
        narrative:
          'A clindamicina é um antimicrobiano da classe das lincosamidas que se liga especificamente e de forma reversível à subunidade ribossomal 50S bacteriana (sobrepondo-se parcialmente aos sítios dos macrolídeos e cloranfenicol), inibindo a reação de peptidil-transferase e bloqueando a translocação do RNA transportador. Essa ação interrompe a síntese de proteínas nas bactérias e suprime precocemente a liberação de exotoxinas e fatores de virulência de Staphylococcus pseudintermedius e Streptococcus canis. Em protozoários intracelulares como Toxoplasma gondii e Neospora caninum, a clindamicina penetra o apicoplasto parasitário, inibindo a replicação de taquizoítos e controlando quadros de miosite, polirradiculoneurite e uveíte.',
      },
      {
        title: 'Distribuição óssea profunda, biofilmes e particularidade esofágica felina',
        narrative:
          'A clindamicina possui elevada lipofilicidade e grande volume de distribuição (Vd > 1,5 L/kg), acumulando-se ativamente em leucócitos polimorfonucleares e macrófagos, os quais transportam a droga diretamente para o foco infeccioso inflamatório. Essa propriedade confere excelente penetração no tecido ósseo cortical e trabecular (atingindo 30% a 50% dos níveis séricos), consolidando a droga como primeira escolha para osteomielite bacteriana canina e infecções periodontais profundas. Na espécie felina, a retenção de comprimidos secos no esôfago distal induz esofagite química cáustica grave e subsequente estenose esofágica cicatricial estenosante (dry-pilling); a administração deve ser acompanhada obrigatoriamente por pelo menos 3 a 5 mL de água ou alimento pastoso.',
      },
      {
        title: 'Monitoramento digestivo, hepatotoxicidade e interações neuromusculares',
        narrative:
          'O tratamento prolongado (como nos cursos de 4 a 8 semanas para osteomielite ou toxoplasmose sistêmica) exige acompanhamento clínico da tolerância gastrintestinal e monitoramento laboratorial de ALT, AST e fosfatase alcalina, devido ao metabolismo hepático predominantemente oxidativo via CYP3A4. A clindamicina possui efeito intrínseco bloqueador neuromuscular aditivo, podendo potencializar a ação de agentes anestésicos curarizantes e agravar fraqueza muscular em pacientes com miastenia grave.',
      },
    ],
  },

  dipirona: {
    plumbs: { monograph: 'Dipyrone (Metamizole)', pages: '413–415' },
    bsava: { monograph: 'Metamizole', pages: '252–253' },
    nelsonCouto: { chapter: 'Cap. 28: General Therapeutic Principles (Antipyretics and Analgesics in Dogs and Cats)', pages: '422–428' },
    ettinger: { chapter: 'Cap. 40: Pain Management and Analgesic Protocols (Non-Opioid Analgesics and Antipyretics in Small Animals)', pages: '185–195' },
    topics: [
      {
        title: 'Pró-fármaco de hidrólise pré-sistêmica imediata em metabólitos ativos (4-MAA)',
        narrative:
          'A dipirona (metamizol sódico ou magnésico) comporta-se como um pró-fármaco que, logo após a administração oral ou parenteral, sofre clivagem hidrolítica pré-sistêmica não enzimática quase instantânea em seu metabólito ativo primário: o 4-metilaminoantipirina (4-MAA). Estudos farmacocinéticos rigorosos demonstraram que a molécula-mãe é indetectável no plasma em pequenos animais, sendo o 4-MAA e seus derivados secundários (4-aminoantipirina [4-AA] e 4-formilaminoantipirina [4-FAA]) os agentes farmacologicamente responsáveis pela analgesia e antipirese. O mecanismo antinociceptivo é multimodal e predominantemente central: atua inibindo variantes centrais da ciclo-oxigenase (COX-3/COX-1b) e ativando vias endocanabinoides (receptores CB1) no corno dorsal medular e substância cinzenta periaquedutal, sem exercer a inibição anti-inflamatória periférica intensa dos AINEs convencionais.',
      },
      {
        title: 'Espasmólise visceral e a farmacocinética diferencial entre cães e gatos',
        narrative:
          'Além da analgesia somática e visceral, a dipirona inibe canais de cálcio dependentes de voltagem nas células musculares lisas entéricas e urogenitais, exercendo ação espasmolítica clinicamente valiosa em gastroenterites agudas, pancreatites, cólicas biliares e obstruções uretrais sem causar paralisia do peristaltismo fisiológico. No cão, o 4-MAA apresenta meia-vida plasmática de 4 a 6 horas, justificando plenamente o regime de administração a cada 8 horas (TID). No gato, o clearance sistêmico de 4-MAA é significativamente mais lento devido às limitações constitucionais na glicuronidação e vias metabólicas alternativas; por essa razão fundamental, as diretrizes de farmacologia felina determinam intervalos posológicos de 12 a 24 horas (BID ou SID), prevenindo o acúmulo de metabólitos.',
      },
      {
        title: 'Segurança gastrointestinal, infusão lenta intravenosa e vigilância hemodinâmica',
        narrative:
          'Ao contrário dos AINEs clássicos, a dipirona preserva a síntese fisiológica de prostaglandinas citoprotetoras na mucosa gástrica e na circulação renal, conferindo perfil de segurança digestiva e renal superior em animais euvolêmicos. Contudo, a administração intravenosa rápida em bólus pode desencadear hipotensão arterial transitória mediada por vasodilatação periférica reflexa e liberação transitória de histamina. A injeção IV deve ser realizada lentamente ao longo de 2 a 5 minutos, preferencialmente diluída em solução fisiológica a 0,9%. Em felinos, a administração de gotas líquidas orais puras deflagra salivação profusa imediata por amargor reflexo, recomendando-se encapsulamento, diluição ou formulações palatáveis.',
      },
    ],
  },

  enrofloxacina: {
    plumbs: { monograph: 'Enrofloxacin', pages: '450–454' },
    bsava: { monograph: 'Enrofloxacin', pages: '147–149' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Fluoroquinolones and Retinal Toxicity in Cats)', pages: '1442–1446' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 184: Laboratory Diagnosis of Infectious Disease', pages: '48–52, 1012–1016' },
    topics: [
      {
        title: 'Inibição bactericida da DNA girase (topoisomerase II) e topoisomerase IV',
        narrative:
          'A enrofloxacina é uma fluoroquinolona veterinária de segunda geração que exerce ação bactericida rápida dependente da concentração ao inibir as enzimas bacterianas essenciais DNA girase (topoisomerase II) em bactérias Gram-negativas e topoisomerase IV em bactérias Gram-positivas. Ao impedir a clivagem e o reenrolamento das fitas do cromossomo bacteriano durante a replicação e transcrição, induz danos cromossômicos irreversíveis e morte do microorganismo. Seu espectro abrange patógenos entéricos e urológicos Gram-negativos (Escherichia coli, Klebsiella, Proteus, Enterobacter, Pseudomonas aeruginosa), Mycoplasma spp. e certas cepas estafilocócicas, sendo ineficaz contra bactérias anaeróbias estritas.',
      },
      {
        title: 'O índice farmacodinâmico Cmax/CIM e a toxicidade retiniana aguda na espécie felina',
        narrative:
          'O índice farmacodinâmico determinante da atividade bactericida e da prevenção da emergência de cepas mutantes resistentes para a enrofloxacina é a razão Cmax/CIM (pico plasmático dividido pela CIM), que deve idealmente atingir 8 a 10, associada a uma AUC24/CIM superior a 100–125 para bacilos Gram-negativos. Na espécie felina, a enrofloxacina apresenta um risco toxicológico peculiar grave: a deficiência congênita no transportador ABCG2 (proteína de efluxo da barreira hematorretiniana) e a oxidação fototóxica na retina resultam em degeneração retiniana aguda, midríase fixa irreversível e cegueira permanente. Plumb’s (10ª ed.), BSAVA (10ª ed.) e Ettinger (2024) determinam que a dose felina NUNCA deve ultrapassar o teto estrito de 5 mg/kg a cada 24 horas.',
      },
      {
        title: 'Interações com cátions polivalentes, cartilagem articular em crescimento e epilepsia',
        narrative:
          'A administração concomitante de enrofloxacina com compostos contendo cátions bivalentes ou trivalentes (como antiácidos à base de alumínio ou magnésio, carbonato de cálcio, suplementos de ferro ou quelantes de fósforo entéricos) provoca quelação química insolúvel no lúmen gastrintestinal, anulando a absorção oral do antibiótico. Deve-se assegurar um intervalo mínimo de 2 horas entre as administrações. A enrofloxacina quela o magnésio nas cartilagens articulares em desenvolvimento, podendo causar artropatia e erosão cartilagínea bolhosa em filhotes de raças grandes durante a fase de crescimento rápido. Além disso, antagoniza fracamente receptores GABA no sistema nervoso central, devendo ser utilizada com cautela em animais epilépticos.',
      },
    ],
  },

  fenobarbital: {
    plumbs: { monograph: 'Phenobarbital', pages: '1006–1011' },
    bsava: { monograph: 'Phenobarbital', pages: '314–317' },
    nelsonCouto: { chapter: 'Cap. 62: Seizures and Other Paroxysmal Events (Canine and Feline Idiopathic Epilepsy)', pages: '1000–1012' },
    ettinger: { chapter: 'Cap. 247: Epilepsy (First-Line Anticonvulsant Therapy and Therapeutic Drug Monitoring)', pages: '1520–1532' },
    topics: [
      {
        title: 'Potencialização alostérica da neurotransmissão inibitória GABAérgica (GABA-A)',
        narrative:
          'O fenobarbital é o anticonvulsivante de primeira escolha de maior respaldo científico internacional para o manejo a longo prazo da epilepsia idiopática em cães e gatos. Seu mecanismo de ação reside na modulação alostérica positiva do complexo receptor GABA-A no sistema nervoso central: ao ligar-se a um sítio específico no canal iônico, prolonga o tempo de abertura do canal de cloreto em resposta à ativação pelo GABA. O influxo massivo de íons cloreto hiperpolariza a membrana pós-sináptica, elevando o limiar de despolarização neuronal e suprimindo tanto o foco epileptógeno primário quanto a propagação transináptica de descargas paroxísticas.',
      },
      {
        title: 'Farmacocinética de autoindução microssomal hepática e monitoramento terapêutico (TDM)',
        narrative:
          'Após o início da terapia ou ajuste posológico, o fenobarbital atinge o estado de equilíbrio dinâmico (steady-state) plasmático em 10 a 14 dias em cães (meia-vida de 40 a 90 horas) e 8 a 12 dias em gatos (meia-vida de 35 a 50 horas). No cão, o fenobarbital é um potente indutor das enzimas do citocromo microssomal hepático (CYP2C, CYP3A), provocando autoindução enzimática ao longo de semanas de uso; isso acelera sua própria depuração e reduz progressivamente os níveis séricos circulantes. Por essa razão fundamental, o Consenso ACVIM sobre Epilepsia determina o Monitoramento Terapêutico de Medicamentos (TDM): mensurar a concentração sérica no 14º e 45º dia após início, a cada 6 meses e sempre após recidiva de crises, visando à faixa terapêutica ideal de 15 a 35 µg/mL.',
      },
      {
        title: 'Hepatotoxicidade intrínseca, discrasias sanguíneas e perigo da retirada abrupta',
        narrative:
          'A indução enzimática hepática eleva fisiologicamente a fosfatase alcalina (FA) e a ALT séricas sem que isso represente dano hepatocelular grave; contudo, níveis séricos de fenobarbital acima de 35 a 40 µg/mL associam-se a estresse oxidativo e hepatopatia medicamentosa crônica, exigindo avaliação de ácidos biliares pré e pós-prandiais e albumina. Em felinos, discrasias sanguíneas imunomediadas (leucopenia, trombocitopenia e anemia não regenerativa) e dermatite pruriginosa facial podem ocorrer de forma idiossincrática. A interrupção abrupta da medicação é estritamente contraindicada: deflagra crise convulsiva rebote maciça e status epilepticus refratário potencialmente fatal, devendo o desmame ser gradual ao longo de meses.',
      },
    ],
  },

  'hidroxido-de-aluminio': {
    plumbs: { monograph: 'Aluminum Hydroxide', pages: '44–46' },
    bsava: { monograph: 'Aluminium antacids (and intestinal phosphate binders)', pages: '13–15' },
    nelsonCouto: { chapter: 'Cap. 41: Acute Kidney Injury and Chronic Kidney Disease (Management of Hyperphosphatemia and Enteric Binders)', pages: '688–695' },
    ettinger: { chapter: 'Cap. 301: Chronic Kidney Disease & Cap. 158: Nutritional Management of Renal Disease', pages: '1998–2008, 882–886' },
    topics: [
      {
        title: 'Mecanismo de quelação entérica de fosfato na luz gastrintestinal',
        narrative:
          'O hidróxido de alumínio [Al(OH)3] atua como um quelante inorgânico de fosfato de primeira linha no manejo da Doença Renal Crônica (DRC) avançada em cães e gatos. No lúmen do estômago e intestino delgado superior, os íons de alumínio reagem quimicamente com o fosfato inorgânico proveniente da dieta alimentar e das secreções digestivas endógenas, formando fosfato de alumínio [AlPO4], um sal insolúvel e não absorvível que é excretado diretamente nas fezes. Ao impedir a absorção intestinal do fosfato, reduz a sobrecarga sistêmica de fósforo e freia a cascata patológica do hiperparatireoidismo secundário renal, calcificação metastática de tecidos moles e progressão da lesão tubulointersticial renal.',
      },
      {
        title: 'Diretrizes das metas da IRIS e titulação posológica pelas refeições',
        narrative:
          'O International Renal Interest Society (IRIS) preconiza alvos estritos para a fosfatemia sérica conforme o estágio da DRC: < 4,5 mg/dL no estágio 2; < 5,0 mg/dL no estágio 3; e < 6,0 mg/dL no estágio 4. A restrição dietética com rações renais específicas constitui o primeiro passo obrigatório; quando a dieta restrita é insuficiente ou rejeitada, o quelante entérico é adicionado. Como o mecanismo depende do contato físico direto com o alimento na luz entérica, a dose diária de hidróxido de alumínio deve ser obrigatoriamente fracionada e misturada a cada porção de alimento oferecida ao paciente.',
      },
      {
        title: 'Constipação intestinal, risco de acúmulo de alumínio e espaçamento de fármacos',
        narrative:
          'O principal efeito adverso clínico do hidróxido de alumínio é a constipação intestinal severa, especialmente frequente em gatos desidratados ou com mobilidade colônica reduzida. Embora a absorção sistêmica de alumínio seja mínima em animais com integridade de mucosa, o uso prolongado de doses elevadas em pacientes anúricos ou oligúricos pode levar a acúmulo tecidual crônico de alumínio. Além disso, os cátions de alumínio formam quelatos insolúveis com antibióticos (fluoroquinolonas, tetraciclinas) e prejudicam a absorção de ferro e hormônios tireoidianos, exigindo espaçamento obrigatório de pelo menos 2 horas entre as administrações orais.',
      },
    ],
  },

  levetiracetam: {
    plumbs: { monograph: 'Levetiracetam', pages: '746–748' },
    bsava: { monograph: 'Levetiracetam', pages: '227–229' },
    nelsonCouto: { chapter: 'Cap. 62: Seizures and Other Paroxysmal Events (Add-on Anticonvulsants and Pulse Therapy)', pages: '1005–1014' },
    ettinger: { chapter: 'Cap. 247: Epilepsy (Second-Generation Anticonvulsant Therapy and Refractory Seizure Management)', pages: '1525–1535' },
    topics: [
      {
        title: 'Modulação da proteína vesicular sináptica 2A (SV2A) e liberação de neurotransmissores',
        narrative:
          'O levetiracetam possui um mecanismo de ação singular e altamente inovador que difere de todos os anticonvulsivantes clássicos: liga-se de forma estereoespecífica e saturável à proteína da vesícula sináptica 2A (SV2A), uma glicoproteína transmembrana presente nas vesículas pré-sinápticas de neurônios do sistema nervoso central. A proteína SV2A coordena a exocitose e a fusão vesicular de neurotransmissores; a ligação do levetiracetam modula a liberação de neurotransmissores excitatórios (como o glutamato) durante trens repetitivos de alta frequência característicos das crises epilépticas, sem suprimir a neurotransmissão basal fisiológica. Esse mecanismo confere excelente eficácia com mínima sedação.',
      },
      {
        title: 'Eliminação predominantemente renal, pulsoterapia e o efeito "lua de mel"',
        narrative:
          'O levetiracetam não sofre metabolização oxidativa extensa pelo citocromo hepático P450, sendo cerca de 70% a 90% da dose excretada inalterada por via renal através de filtração glomerular em pequenos animais. Essa farmacocinética confere excelente segurança hepática, permitindo seu uso tranquilo em animais com shunt portossistêmico ou hepatopatias prévias. Contudo, sua meia-vida de eliminação plasmática é relativamente curta em cães saudáveis (cerca de 3 a 4 horas), exigindo administração rigorosa a cada 8 horas na formulação de liberação imediata. Na pulsoterapia ("pulse therapy") para crises em salvas (cluster seizures), administra-se uma dose de ataque oral extra após a primeira crise para abortar a sequência.',
      },
      {
        title: 'Formulação de liberação prolongada (XR), interação com fenobarbital e tolerância',
        narrative:
          'Para contornar o inconveniente do intervalo q8h da formulação padrão, o levetiracetam de liberação prolongada (XR) permite administração a cada 12 horas (q12h) em cães; contudo, os comprimidos XR nunca devem ser triturados, partidos ou mastigados, pois a violação da matriz polimérica destrói o mecanismo de liberação lenta, despejando a dose de forma instantânea. Um aspecto farmacocinético crucial enfatizado por Ettinger (2024) é que o fenobarbital concomitante acelera a depuração renal do levetiracetam em cães, podendo reduzir suas concentrações plasmáticas pela metade e exigindo doses mais elevadas (20 a 30 mg/kg q8h).',
      },
    ],
  },

  meloxicam: {
    plumbs: { monograph: 'Meloxicam', pages: '825–828' },
    bsava: { monograph: 'Meloxicam', pages: '250–252' },
    nelsonCouto: { chapter: 'Cap. 28: General Therapeutic Principles & Cap. 69: Disorders of the Joints (NSAIDs in Dogs and Cats)', pages: '422–428, 1105–1115' },
    ettinger: { chapter: 'Cap. 40: Pain Management and Analgesic Protocols (Nonsteroidal Anti-Inflammatory Drugs in Small Animal Practice)', pages: '180–186' },
    topics: [
      {
        title: 'Inibição preferencial da ciclo-oxigenase-2 (COX-2) e controle da cascata inflamatória',
        narrative:
          'O meloxicam é um anti-inflamatório não esteroidal (AINE) pertencente à classe química do ácido enólico (oxicam) que exerce inibição seletiva preferencial da isoenzima ciclo-oxigenase-2 (COX-2) em relação à ciclo-oxigenase-1 (COX-1) nas doses terapêuticas recomendadas em cães e gatos. A COX-2 é constitutivamente expressa em níveis baixos, mas sua expressão é fortemente induzida por citocinas pró-inflamatórias (IL-1, TNF-alfa) e endotoxinas no tecido lesado, sintetizando prostaglandina E2 (PGE2) e prostaciclina (PGI2), mediadores responsáveis por hiperalgesia periférica, vasodilatação e edema. Ao bloquear a síntese desses eicosanoides, o meloxicam atenua a sensibilização dos nociceptores e interrompe a amplificação da dor musculoesquelética e cirúrgica.',
      },
      {
        title: 'Euvolemia, perfusão renal transoperatória e segurança na espécie felina',
        narrative:
          'Em condições de hipovolemia, hipotensão ou desidratação (comuns durante anestesia geral ou choque), a perfusão da arteríola aferente renal passa a depender criticamente da vasodilatação mediada por prostaglandinas sintetizadas tanto pela COX-1 quanto pela COX-2 na medula renal. O bloqueio de COX sob hipotensão deflagra vasoconstrição arteriolar isquêmica aguda e necrose papilar renal. Por essa razão fundamental, o Consenso da ISFM sobre AINEs Felinos e Ettinger (2024) contraindicam formalmente o uso de meloxicam no pré-operatório imediato de cirurgias sem suporte hemodinâmico, exigindo pressão arterial média estável (> 60 mmHg) e fluidoterapia venosa contínua antes de sua aplicação.',
      },
      {
        title: 'Toxicidade gastrintestinal, associações proibidas e período de washout obrigatório',
        narrative:
          'A associação concomitante de meloxicam com outros AINEs (carprofeno, cetoprofeno, firocoxib) ou com qualquer corticosteroide (prednisolona, dexametasona) multiplica exponencialmente o risco de erosão, ulceração perfurante gastroduodenal e insuficiência renal aguda. A troca entre AINEs ou a transição para corticosteroide exige um período de depuração ("washout") obrigatório de 3 a 5 dias para fármacos de meia-vida curta e até 10 a 14 dias para fármacos de meia-vida longa. Vômitos persistentes, fezes escuras com aspecto de borra de café (melena) ou apatia profunda exigem interrupção imediata da medicação e instituição de suporte com gastroprotetores e fluidoterapia.',
      },
    ],
  },

  metadona: {
    plumbs: { monograph: 'Methadone', pages: '842–846' },
    bsava: { monograph: 'Methadone', pages: '254–256' },
    nelsonCouto: { chapter: 'Cap. 28: General Therapeutic Principles (Full Mu-Opioid Agonists in Acute and Perioperative Pain)', pages: '426–432' },
    ettinger: { chapter: 'Cap. 40: Pain Management and Analgesic Protocols (Full Mu-Opioid Agonists and NMDA Antagonism)', pages: '188–193' },
    topics: [
      {
        title: 'Mecanismo de ação triplo: agonismo mu pleno, antagonismo NMDA e inibição de monoaminas',
        narrative:
          'A metadona é um opioide sintético de estrutura difenil-heptânica que se destaca por um perfil farmacodinâmico multifacetado único: atua como agonista pleno de alta eficácia intrínseca sobre os receptores opioides mu centrais e espinhais, promovendo analgesia potente sem apresentar o teto analgésico dos agonistas parciais. Simultaneamente, o enantiômero dextrorrotatório (d-metadona) atua como antagonista não competitivo dos receptores N-metil-D-aspartato (NMDA) no corno dorsal da medula espinhal, bloqueando a entrada excessiva de cálcio neuronal que desencadeia a sensibilização central ("wind-up") e a cronificação da dor neuropática. Adicionalmente, inibe a recaptação de serotonina e noradrenalina nas vias descendentes inibitórias da dor.',
      },
      {
        title: 'Ausência de liberação de histamina e particularidades da absorção transmucosa felina',
        narrative:
          'Diferentemente da morfina e da meperidina, a administração intravenosa de metadona não estimula a degranulação direta de mastócitos e a liberação maciça de histamina. Essa característica confere uma estabilidade hemodinâmica superior no período transoperatório, prevenindo hipotensão abrupta e broncoconstrição, o que a torna a droga de escolha para procedimentos em pacientes críticos, politraumatizados e cardiopatas estáveis. Na espécie felina, a via oral transmucosa (OTM) alcança boa absorção clínica e analgesia confiável, permitindo manipulação com menor estresse comparado a punções repetidas.',
      },
      {
        title: 'Depressão respiratória, bradicardia vagal mediada e protocolos de reversão',
        narrative:
          'Como todo agonista mu pleno, a metadona reduz a sensibilidade do centro respiratório bulbar ao dióxido de carbono e estimula o núcleo motor dorsal do nervo vago no tronco encefálico, podendo deflagrar bradicardia sinusal dose-dependente. A bradicardia responde prontamente a anticolinérgicos (atropina ou glicopirrolato) caso comprometa a pressão arterial ou o débito cardíaco. Em casos de hipotermia grave, sedação excessiva ou depressão respiratória acentuada, a naloxona atua como antagonista competitivo específico; contudo, a administração de naloxona deve ser cuidadosamente titulada em microdoses para reverter a depressão respiratória sem suprimir de forma abrupta a analgesia pós-operatória.',
      },
    ],
  },

  marbofloxacina: {
    plumbs: { monograph: 'Marbofloxacin', pages: '796–798' },
    bsava: { monograph: 'Marbofloxacin', pages: '242–244' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Fluoroquinolones in Small Animals)', pages: '1438–1444' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 277: Urinary Tract Infections and Pyelonephritis', pages: '46–50, 1980–1986' },
    topics: [
      {
        title: 'Mecanismo bactericida dependente da concentração e os alvos DNA girase e topoisomerase IV',
        narrative:
          'A marbofloxacina é uma fluoroquinolona sintética bactericida desenvolvida exclusivamente para medicina veterinária. Atua estabilizando os complexos de clivagem DNA–topoisomerase após o corte transitório das fitas de DNA bacteriano, impedindo sua religação. Nas bactérias Gram-negativas, o alvo primário predominante é a DNA girase (subunidade GyrA), enquanto em cocos Gram-positivos a topoisomerase IV (ParC/ParE) atua como alvo concorrente ou prioritário. A incapacidade de religação cromossômica provoca acúmulo letal de quebras em dupla fita, bloqueio das forquilhas de replicação e morte bactericida célere em 20 a 30 minutos de exposição. Seu perfil PK/PD é governado pelos índices concentração-dependentes Cmax/MIC (alvo ideal entre 8 e 10 a 12) e AUC24/MIC (ou fAUC24/MIC > 72 a 125), justificando farmacodinamicamente a administração da dose total em tomada única diária (q24h).',
      },
      {
        title: 'Princípios de stewardship, diretrizes ISCAID e atualização crítica de doses',
        narrative:
          'A marbofloxacina é um antimicrobiano de segunda/terceira linha que deve ser rigorosamente reservado para infecções respaldadas por testes de cultura e suscetibilidade (AST), sendo contraindicada a prescrição empírica para cistite simples ou piodermite superficial. O consenso ISCAID 2025 para piodermite canina revolucionou a abordagem clínica ao definir que infecções superficiais devem receber terapia tópica de primeira escolha; quando houver piodermite profunda por Staphylococcus pseudintermedius justificando marbofloxacina, a dose mandatória mínima é de 5,5 mg/kg q24h (a dose antiga de 2 mg/kg pode ser subinibitória e selecionar mutantes resistentes). De forma análoga, o consenso ISCAID 2019 de infecções urinárias estabeleceu cursos curtos de 3 a 5 dias para cistite bacteriana esporádica e 10 a 14 dias para pielonefrite, superando as recomendações de 4 a 6 semanas presentes em bulas históricas.',
      },
      {
        title: 'Farmacocinética de alta biodisponibilidade, nefropatias, LVC e tolerância felina',
        narrative:
          'Apresenta biodisponibilidade oral quase completa (~94% a 100% em cães e ~99% em gatos), com baixa ligação proteica (~7% a 22%) e extensa penetração no parênquima renal, tecido prostático, líquido epitelial alveolar e interior de macrófagos e neutrófilos. Cerca de 40% da dose é eliminada na urina de cães na forma inalterada ativa. Estudos controlados em cães com comprometimento renal leve a moderado demonstraram ausência de acúmulo tóxico significativo, não justificando subdosagem automática. Na espécie felina, a marbofloxacina não possui relação causal com toxicidade retiniana aguda em doses terapêuticas (diferindo da enrofloxacina), atuando como excelente resgate para Mycoplasma haemofelis resistente à doxiciclina (ABCD 2026). No Brasil, possui indicação oficial registrada para leishmaniose visceral canina (2 mg/kg q24h por 28 dias), promovendo remissão clínica e queda de carga parasitária, embora recaídas ocorram a médio prazo sem esterilização da infecção.',
      },
    ],
  },

  pradofloxacina: {
    plumbs: { monograph: 'Pradofloxacin', pages: '1048–1050' },
    bsava: { monograph: 'Pradofloxacin', pages: '335–337' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Advanced 8-Cyano-Fluoroquinolones and Retinal Safety)', pages: '1442–1448' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 205: Feline Upper Respiratory Infections', pages: '48–52, 1120–1126' },
    topics: [
      {
        title: 'Estrutura de 8-metoxi fluoroquinolona e o mecanismo de duplo alvo simultâneo',
        narrative:
          'A pradofloxacina é uma fluoroquinolona veterinária avançada de terceira geração que apresenta uma inovação estrutural decisiva: a incorporação de um grupo metóxi na posição C-8 e de um substituinte bicíclico pirrolidino-piperidina na posição C-7. Essa configuração química única confere capacidade de inibição com afinidade equipotente sobre ambos os alvos bacterianos essenciais: a DNA girase (topoisomerase II) e a topoisomerase IV em bactérias Gram-negativas e Gram-positivas. Esse mecanismo de "duplo alvo" simultâneo exige que uma bactéria desenvolva duas mutações genéticas independentes e concomitantes para expressar resistência clínica, reduzindo de forma drástica a probabilidade de mutações de escape durante o tratamento.',
      },
      {
        title: 'Segurança ocular felina comprovada e espectro estendido contra anaeróbios',
        narrative:
          'A pradofloxacina foi desenhada especificamente para superar a barreira da toxicidade retiniana felina que limita o uso da enrofloxacina. Estudos oftalmológicos, eletrorretinográficos e histopatológicos de segurança demonstraram que mesmo sob doses até 10 vezes superiores à dose clínica terapêutica recomendada (até 30 a 50 mg/kg), a pradofloxacina não causa degeneração de fotorreceptores, perda de visão ou danos na retina de gatos. Além disso, seu espectro antibacteriano é sensivelmente superior ao das fluoroquinolonas anteriores, abrangendo com eficácia anaeróbios da cavidade oral e respiratória (Bacteroides, Prevotella), micoplasmas respiratórios e hemotróficos (Mycoplasma felis, Mycoplasma haemofelis) e Staphylococcus pseudintermedius.',
      },
      {
        title: 'Apresentações farmacêuticas veterinárias, adesão e acompanhamento hematológico',
        narrative:
          'A suspensão oral veterinária (Veraflox® 25 mg/mL) foi desenvolvida com alta palatabilidade para aceitação espontânea em felinos, eliminando o estresse da manipulação oral forçada e o risco de estenose esofágica. Em cães, a pradofloxacina é comercializada na forma de comprimidos palatáveis; contudo, a formulação canina não deve ser administrada a filhotes em crescimento rápido nem a cães com menos de 12 meses (ou 18 meses em raças gigantes) devido à quelação de magnésio na cartilagem epifisária articular. Em tratamentos muito prolongados, monitorar contagem hematológica de plaquetas e leucócitos conforme as diretrizes internacionais de bula.',
      },
    ],
  },

  prednisolona: {
    plumbs: { monograph: 'PrednisoLONE/Prednisone/PrednisoLONE Sodium Succinate', pages: '1058–1063' },
    bsava: { monograph: 'Prednisolone', pages: '339–342' },
    nelsonCouto: { chapter: 'Cap. 72: Treatment of Primary Immune-Mediated Diseases & Cap. 50: Disorders of the Adrenal Gland', pages: '1150–1162, 835–848' },
    ettinger: { chapter: 'Cap. 174: Immune-Mediated Hemolytic Anemia & Cap. 296: Hypoadrenocorticism', pages: '920–930, 1850–1862' },
    topics: [
      {
        title: 'Mecanismo genômico nuclear: transrepressão pró-inflamatória e transativação metabólica',
        narrative:
          'A prednisolona é um glicocorticoide semissintético de ação intermediária que se difunde passivamente através da membrana plasmática celular e liga-se a receptores glicocorticoides específicos citoplasmáticos (GR). O complexo fármaco-receptor ativado sofre translocação para o núcleo celular, exercendo dois mecanismos moleculares principais: a transrepressão gênica (onde se liga a fatores de transcrição inflamatórios como NF-kB e AP-1, bloqueando a transcrição de citocinas inflamatórias, quimiocinas, COX-2, óxido nítrico sintase induzível e moléculas de adesão) e a transativação gênica (onde se liga a elementos de resposta a glicocorticoides no DNA, induzindo a síntese de lipocortina-1/anexitina, que inibe a fosfolipase A2 e estanca na origem a cascata de prostaglandinas e leucotrienos).',
      },
      {
        title: 'A preferência absoluta da prednisolona sobre a prednisona na espécie felina',
        narrative:
          'A prednisona é um pró-fármaco inativo que necessita obrigatoriamente de redução hepática enzimática pela 11-beta-hidroxiesteroide desidrogenase tipo 1 para ser convertida na molécula ativa prednisolona. Ensaios farmacocinéticos em felinos demonstraram que a biodisponibilidade e a taxa de conversão hepática de prednisona para prednisolona em gatos é extremamente deficiente e errática, atingindo níveis séricos clinicamente ineficazes na maioria dos animais. Por essa razão categórica, o consenso de medicina interna felina (Ettinger 2024, Nelson & Couto 6ª ed.) determina que a prednisolona ativa deve ser sempre a molécula de escolha para gatos.',
      },
      {
        title: 'Estratificação de doses terapêuticas, efeitos adversos e o protocolo de desmame gradual',
        narrative:
          'A dosagem de prednisolona é estritamente escalonada de acordo com o objetivo fisiopatológico: dose de reposição fisiológica (0,2 a 0,3 mg/kg/dia no hipoadrenocorticismo), dose anti-inflamatória (0,5 a 1,0 mg/kg/dia para dermatite alérgica e asma) e dose imunossupressora (2 a 4 mg/kg/dia na AHIM, trombocitopenia imunomediada e pênfigo). O tratamento contínuo suprime o eixo hipotálamo-hipófise-adrenal (HHA), induzindo atrofia das zonas fasciculada e reticular do córtex adrenal. A interrupção súbita após semanas de uso precipita crise hipoadrenocortical aguda iatrogênica (colapso, hipotensão, letargia e hipoglicemia). O desmame ("tapering") deve ser rigorosamente gradual, reduzindo a dose em 25% a 50% a cada 2 a 3 semanas.',
      },
    ],
  },

  pronefra: {
    plumbs: { monograph: 'Calcium, Oral / Chitosan (Intestinal Phosphate Binders)', pages: '178–180' },
    bsava: { monograph: 'Chitosan / Calcium Carbonate', pages: '75–76' },
    productSource: 'https://br.virbac.com/products/suplemento-oral/pronefra',
    nelsonCouto: { chapter: 'Cap. 41: Acute Kidney Injury and Chronic Kidney Disease (Enteric Phosphate Binders and Uremic Sorbents)', pages: '688–695' },
    ettinger: { chapter: 'Cap. 301: Chronic Kidney Disease & Cap. 158: Nutritional Management of Renal Disease', pages: '1998–2008, 882–886' },
    topics: [
      {
        title: 'Composição química sinérgica de adsorção entérica 4 em 1',
        narrative:
          'O Pronefra® é uma suspensão oral veterinária patenteada desenvolvida especificamente para o suporte nutricional de cães e gatos com Doença Renal Crônica (DRC). Sua formulação exclusiva integra quatro ingredientes ativos com propriedades complementares: o carbonato de cálcio e o carbonato de magnésio, que atuam como quelantes inorgânicos de fosfato no trato gastrintestinal, ligando-se ao fósforo da dieta e impedindo sua absorção sistêmica; a quitosana (polissacarídeo derivado de carapaças de crustáceos), que atua como um polímero quelante de toxinas urêmicas (indoxil sulfato e p-cresil sulfato) na luz colônica; e o hidrolisado de peixe (oligopeptídeos marinhos), que auxilia na manutenção da integridade da barreira microvascular renal e pressão arterial.',
      },
      {
        title: 'Papel adjuvante no manejo conservador da nefropatia crônica (Estágios IRIS 2 a 4)',
        narrative:
          'O papel clínico do Pronefra reside no controle precoce e sustentado da hiperfosfatemia e na atenuação do acúmulo de toxinas urêmicas circulantes que aceleram a perda progressiva de néfrons remanescentes na DRC. A retenção crônica de fosfato desencadeia o hiperparatireoidismo secundário renal e a elevação do FGF-23 (Fator de Crescimento de Fibroblastos 23), biomarcador associado à morbimortalidade cardiovascular e progressão da lesão renal em felinos. A intervenção precoce com quelantes entéricos palatáveis permite atingir as metas da IRIS mesmo em animais relutantes à ingestão de dietas renais exclusivas.',
      },
      {
        title: 'Administração com alimentos, monitoramento de eletrólitos e aceitabilidade em gatos',
        narrative:
          'Para garantir eficácia máxima na quelação entérica de fosfato, a suspensão deve ser agitada vigorosamente antes do uso e administrada diretamente sobre o alimento ou imediatamente antes das principais refeições, garantindo contato físico íntimo com os nutrientes no bolo alimentar. O monitoramento clínico semestral deve incluir dosagem sérica de cálcio total, cálcio ionizado, magnésio sérico e fósforo inorgânico, assegurando que o produto cálcio x fósforo (Ca x P) permaneça abaixo de 55–60 para prevenir calcificação ectópica mineral.',
      },
    ],
  },

  'sulfametoxazol-trimetoprima': {
    plumbs: { monograph: 'Sulfa-/Trimethoprim', pages: '1193–1196' },
    bsava: { monograph: 'Trimethoprim/Sulphonamide', pages: '418–420' },
    nelsonCouto: { chapter: 'Cap. 92: Practical Antimicrobial Chemotherapy (Potentiated Sulfonamides and Idiosyncratic Hypersensitivity)', pages: '1444–1448' },
    ettinger: { chapter: 'Cap. 7: Antimicrobial Stewardship & Cap. 307: Lower Urinary Tract Infections', pages: '48–52, 2060–2068' },
    topics: [
      {
        title: 'Mecanismo de duplo bloqueio sequencial e sinérgico da síntese de ácido fólico',
        narrative:
          'A associação sulfametoxazol-trimetoprima (proporção fixa 5:1) representa o exemplo clássico de sinergismo farmacológico bactericida por bloqueio sequencial de vias metabólicas. As sulfonamidas atuam como análogos estruturais competitivos do ácido para-aminobenzoico (PABA), inibindo a enzima di-hidropteroato sintase, a primeira etapa da síntese de folato nas bactérias e protozoários suscetíveis. A trimetoprima inibe de forma potente a enzima subsequente, a di-hidrofolato redutase, impedindo a conversão de di-hidrofolato em tetra-hidrofolato funcional. Isoladamente bacteriostáticos, os dois fármacos em associação produzem um efeito bactericida rápido e letal ao paralisar a síntese de purinas, pirimidinas e ácidos nucleicos bacterianos.',
      },
      {
        title: 'Espectro estendido, infecções urinárias e inativação pelo pus e detritos celulares',
        narrative:
          'As sulfas potencializadas possuem espectro amplo que inclui Gram-positivos (Staphylococcus pseudintermedius, Streptococcus), Gram-negativos e protozoários (Coccídios, Toxoplasma, Pneumocystis carinii). Apresentam excelente eliminação renal com concentrações urinárias elevadas, sendo úteis em cistites bacterianas complicadas e prostatites em cães. Contudo, um limite farmacológico crucial deve ser considerado: a atividade antibacteriana das sulfas é gravemente inibida na presença de pus, exsudato purulento, tecidos necróticos e sangue. O pus contém quantidades massivas de timina, purinas e PABA livres liberados pela lise celular, os quais contornam o bloqueio metabólico e conferem resistência fenotípica local.',
      },
      {
        title: 'Reações idiossincráticas imunomediadas: KCS, hepatite aguda, poliartrite e hipotireoidismo',
        narrative:
          'A espécie canina, e muito especialmente a raça Doberman Pinscher, apresenta suscetibilidade genética a reações adversas imunomediadas graves e idiossincráticas às sulfas. Os metabólitos reativos de hidroxilamina ligam-se a proteínas teciduais, atuando como haptenos e deflagrando hipersensibilidade do tipo III e IV: ceratoconjuntivite seca (KCS) por toxicidade sobre as glândulas lacrimais, necrose hepática aguda fulminante, poliartrite asséptica imunomediada, anemia hemolítica, trombocitopenia e eritema multiforme. O Teste de Schirmer basal e seriado é mandatório durante tratamentos prolongados. Além disso, as sulfonamidas inibem a tireoide peroxidase, podendo causar hipotireoidismo iatrogênico reversível.',
      },
    ],
  },

  tramadol: {
    plumbs: { monograph: 'Tramadol', pages: '1261–1264' },
    bsava: { monograph: 'Tramadol', pages: '410–412' },
    nelsonCouto: { chapter: 'Cap. 28: General Therapeutic Principles & Cap. 69: Disorders of the Joints (Atypical Opioids and Multimodal Analgesia)', pages: '425–432, 1108–1116' },
    ettinger: { chapter: 'Cap. 40: Pain Management and Analgesic Protocols (Atypical Opioids and Dual-Action Analgesics)', pages: '194–198' },
    topics: [
      {
        title: 'Farmacodinâmica de duplo mecanismo: agonismo mu e inibição da recaptação de monoaminas',
        narrative:
          'O cloridrato de tramadol é um analgésico de ação central atípico constituído por uma mistura racêmica de dois enantiômeros que exercem mecanismos de ação sinérgicos e complementares. O enantiômero (+)-tramadol e especialmente seu metabólito ativo M1 (O-desmetiltramadol) atuam como agonistas de receptores opioides mu, inibindo a transmissão nociceptiva ascendente no corno dorsal medular. Simultaneamente, o enantiômero (+)-tramadol inibe a recaptação neuronal de serotonina (5-HT), enquanto o enantiômero (-)-tramadol inibe a recaptação neuronal de noradrenalina e ativa autorreceptores alfa-2 adrenérgicos pré-sinápticos, amplificando as vias inibitórias descendentes da dor na substância cinzenta periaquedutal.',
      },
      {
        title: 'A controvérsia farmacocinética do metabólito M1: por que cães e gatos respondem de modo oposto',
        narrative:
          'A afinidade do tramadol original pelo receptor mu é fraca (cerca de 6.000 vezes menor que a da morfina); o efeito opioide depende criticamente da biotransformação hepática via CYP2D15 no metabólito ativo M1 (O-desmetiltramadol), cuja afinidade mu é 200 a 300 vezes superior à droga-mãe. Estudos farmacocinéticos comparativos demonstraram que cães produzem quantidades mínimas e fugazes de M1, com meia-vida plasmática inferior a 1,5–2 horas; ensaios clínicos randomizados duplo-cegos (Budsberg et al. 2018) comprovaram ausência de eficácia analgésica do tramadol em osteoartrite canina crônica. Em contrapartida, gatos metabolizam eficientemente o tramadol em M1 com concentrações elevadas e sustentadas, conferindo analgesia excelente, porém associada a sabor amargo com hipersalivação, disforia e midríase.',
      },
      {
        title: 'Risco de síndrome serotoninérgica, limiar convulsivo e produtos comerciais associados',
        narrative:
          'Devido à inibição da recaptação de serotonina, a associação concomitante de tramadol com outros fármacos serotoninérgicos (como antidepressivos inibidores da recaptação de serotonina [fluoxetina], antidepressivos tricíclicos [amitriptilina, clomipramina] ou inibidores da MAO [selegilina]) pode precipitar a Síndrome Serotoninérgica, caracterizada por hipertermia severa, tremores, rigidez muscular, taquicardia e convulsões. Além disso, o tramadol reduz o limiar convulsivo, devendo ser evitado em animais epilépticos. Na rotina farmacêutica humana, existem apresentações combinadas de tramadol com paracetamol (ex.: Ultracet®); essas formulações são estritamente proibidas e letais para gatos devido à toxicidade do paracetamol.',
      },
    ],
  },
  'micofenolato-mofetila': {
    plumbs: { monograph: 'Mycophenolate', pages: '920–922' },
    bsava: { monograph: 'Mycophenolate mofetil', pages: '278–279' },
    nelsonCouto: { chapter: 'Cap. 72: Treatment of Primary Immune-Mediated Diseases (Immunosuppressive Drugs: Mycophenolate)', pages: '1240–1244' },
    ettinger: { chapter: 'Cap. 116: Immunosuppressive Therapy in Small Animal Medicine (Purine Synthesis Inhibitors: Mycophenolic Acid)', pages: '870–875' },
    topics: [
      {
        title: 'Seletividade linfocitária e bloqueio da IMPDH tipo II versus reaproveitamento somático',
        narrative:
          'O micofenolato de mofetila (MMF) atua como um pró-fármaco desprovido de atividade direta que é rapidamente hidrolisado a ácido micofenólico (MPA). O MPA liga-se de forma potente e reversível à inosina-monofosfato-desidrogenase (IMPDH), inibindo a oxidação de IMP a XMP, etapa limitante da síntese de novo de nucleotídeos de guanina (GMP, GDP, GTP e dGTP). Enquanto granulócitos e células somáticas regeneram purinas pela via de reaproveitamento da HGPRT, linfócitos B e T proliferativos dependem criticamente da via de novo e expressam a isoforma induzível IMPDH-II, cinco vezes mais sensível ao MPA. A depleção de guanina paralisa o ciclo celular na fase S, conferindo imunossupressão citostática seletiva com menor mielossupressão comparado à azatioprina.',
      },
      {
        title: 'Incompatibilidade farmacoterapêutica com micofenolato sódico e toxicidade enterocolítica',
        narrative:
          'O MMF e o micofenolato sódico de liberação retardada (EC-MPS, Myfortic®) não são bioequivalentes nem intercambiáveis miligrama por miligrama em cães e gatos. Ensaios em modelos caninos demonstraram que a formulação gastrorresistente de micofenolato sódico provoca enterocolite e diarreia secretória mais severas do que o MMF, desmistificando o mito de que o revestimento entérico humano protegeria o trato digestivo dos carnívoros domésticos. A toxicidade gastrointestinal por MMF decorre da dependência dos enterócitos da síntese de novo de purinas e da desconjugação do metabólito glicuronídeo (MPAG) pela microbiota cólica. Em casos de sobredosagem ou diarreia com desidratação, a administração de colestiramina (resina quelante) interrompe o ciclo entero-hepático e reduz a exposição ao MPA em aproximadamente 40%, servindo como antídoto ligante no lúmen intestinal.',
      },
      {
        title: 'Confronto clínico com consensos ACVIM, IRIS e a evidência prospectiva de 2024 na IMHA',
        narrative:
          'A aplicabilidade do micofenolato de mofetila varia radicalmente conforme a patologia imunomediada. Nas glomerulonefrites por imunocomplexos em cães, o Consenso Internacional IRIS recomenda o MMF como agente poupador de glicocorticoide de escolha inicial ou adjuvante para controle de proteinúria (UPC). Em meningoencefalomielite de etiologia desconhecida (MUE) canina, Song et al. (2020) demonstraram controle neurológico equivalente à ciclosporina com menor risco de hipertricose e hiperplasia gengival. Na trombocitopenia imunomediada (ITP), o Consenso ACVIM 2024 o posiciona como segundo agente aceitável (7 a 10 mg/kg q12h). Entretanto, na anemia hemolítica imunomediada (IMHA) canina, o ensaio clínico prospectivo randomizado de Agnoli et al. (JVIM, 2024) não evidenciou benefício adicional à metilprednisolona e registrou mortalidade superior aos 60 e 365 dias no braço MMF em relação à ciclosporina, reforçando que o MMF não deve ser indicado de modo empírico irrestrito em IMHA.',
      },
    ],
  },
  ciclosporina: {
    plumbs: { monograph: 'Cyclosporine (Systemic) & Cyclosporine Ophthalmic', pages: '322–328, 1357–1360' },
    bsava: { monograph: 'Ciclosporin', pages: '83–85' },
    nelsonCouto: { chapter: 'Cap. 72: Treatment of Primary Immune-Mediated Diseases (Immunosuppressive Drugs: Cyclosporine)', pages: '1244–1248' },
    ettinger: { chapter: 'Cap. 116: Immunosuppressive Therapy in Small Animal Medicine (Calcineurin Inhibitors: Cyclosporine)', pages: '875–880' },
    topics: [
      {
        title: 'Bases moleculares da inibição da calcineurina e preservação da medula óssea',
        narrative:
          'A ciclosporina atua através da ligação intracelular à imunofilina ciclofilina A, gerando um complexo que bloqueia estericamente o sítio catalítico da fosfatase dependente de cálcio-calmodulina calcineurina. Essa inibição impede a desfosforilação citoplasmática do fator nuclear de células T ativadas (NFAT), obstando sua translocação para o núcleo e a consequente indução da transcrição de citocinas vitais para a expansão clonal de linfócitos T, em especial a interleucina-2 (IL-2). Ao contrário de agentes alquilantes ou antimetabólitos que bloqueiam a replicação de ácidos nucleicos ou lesionam o DNA de precursores multipotentes hematopoiéticos, a ciclosporina exerce imunomodulação funcional sem citotoxicidade medular dose-limitante direta, preservando neutrófilos e plaquetas.',
      },
      {
        title: 'Formulações microemulsificadas versus oleosas e a cinética de absorção enteral',
        narrative:
          'A tecnologia farmacêutica da ciclosporina define estritamente o seu perfil de exposição e eficácia. As formulações originais não modificadas em base oleosa (Sandimmune) exibiam absorção altamente errática dependente da presença intraluminal de bile e lipídios dietéticos, com biodisponibilidade reduzida (20% a 25%) e enorme variabilidade intraindividual. As formulações modificadas contemporâneas (Atopica, Cyclavance, Sandimmun Neoral) utilizam um sistema auto-microemulsionante que dispersa gotículas lipídicas nanométricas espontaneamente no fluido digestivo aquoso, elevando a biodisponibilidade para 36% a 45% em cães e conferindo perfis de concentração sanguínea muito mais previsíveis. A substituição cega entre essas classes farmacêuticas mantendo o mesmo miligrama por quilo acarreta grave risco de falência imunossupressora ou sobredosagem.',
      },
      {
        title: 'Manejo espécie-específico: o risco crítico de toxoplasmose sistêmica em felinos',
        narrative:
          'Na espécie felina, a modulação profunda da imunidade celular T e o consequente decréscimo na síntese de interferon-gama removem a principal barreira imunológica do hospedeiro contra o protozoário intracelular Toxoplasma gondii. Gatos soronegativos que sofrem primoinfecção sob terapia crônica com ciclosporina tornam-se incapazes de encistar os taquizoítos, desenvolvendo disseminação hematogênica fulminante com acometimento necrótico pulmonar e encefálico fatal (Lappin et al. 2015). A prescrição de ciclosporina em gatos exige triagem sorológica criteriosa, confinamento domiciliar estrito sem predação de roedores ou pássaros e a proibição absoluta do fornecimento de carnes cruas ou vísceras não cozidas.',
      },
    ],
  },
  sucralfato: {
    plumbs: { monograph: 'Sucralfate', pages: '1189–1190' },
    bsava: { monograph: 'Sucralfate', pages: '387–388' },
    nelsonCouto: { chapter: 'Cap. 27: Clinical Manifestations of Gastrointestinal Disease & Cap. 28: Diagnostic Tests for the Gastrointestinal Tract', pages: '412–418, 430–435' },
    ettinger: { chapter: 'Cap. 248: Diseases of the Esophagus & Cap. 253: Gastric Ulcerative Disease', pages: '1480–1488, 1520–1528' },
    topics: [
      {
        title: 'Bases físico-químicas da polimerização ácida e afinidade eletrostática por úlceras',
        narrative:
          'O sucralfato atua como um protetor mecânico e químico puramente local e intraluminal. Em ambiente com pH inferior a 4,0, o complexo de sacarose octassulfatada com hidróxido de alumínio dissocia-se e polimeriza-se em uma pasta viscosa e insolúvel fortemente polianiônica. As cargas negativas dos grupamentos sulfato atraem-se eletrostaticamente pelas proteínas catiônicas ricas em resíduos básicos (como albumina e fibrinogênio) expostas no leito desnudo das erosões e úlceras, formando uma barreira física duradoura por até 6 horas que bloqueia a retrodifusão de íons H+, inativa estericamente a pepsina proteolítica e adsorve ácidos biliares citotóxicos regurgitados.',
      },
      {
        title: 'Uso racional conforme o Consenso ACVIM versus o mito do protetor universal',
        narrative:
          'O Consenso Internacional ACVIM sobre Protetores Gastrointestinais (Marks et al. 2018) estabelece diretrizes rigorosas contra o uso indiscriminado do sucralfato como gastroprotetor empírico em gastrites não erosivas, pancreatites sem sangramento ou profilaxia rotineira em pacientes sob corticoterapia isolada. Em úlceras e erosões gastroduodenais, os inibidores da bomba de prótons (IBPs, como omeprazol) demonstraram superioridade inequívoca na cicatrização da lesão ácido-péptica, e a adição rotineira de sucralfato ao IBP não confere ganho clínico demonstrável. O papel de eleição do sucralfato concentra-se nas esofagites erosivas por refluxo, nas quais a administração na forma de suspensão líquida fluida (slurry) banha fisicamente a mucosa esofágica lesionada.',
      },
      {
        title: 'Evidências de ineficácia como quelante de fósforo na DRC e risco de descompensação felina',
        narrative:
          'A extrapolação histórica do sucralfato como quelante entérico de fósforo devido ao seu conteúdo de alumínio foi refutada em ensaio clínico veterinário prospectivo conduzido por Quimby & Lappin (2016). Em gatos saudáveis e com Doença Renal Crônica, 500 mg q8h de sucralfato não promoveram redução significativa do fósforo sérico ou da fosfatúria. Ademais, 60% dos felinos nefropatas apresentaram descompensação clínica grave caracterizada por vômitos frequentes, inapetência, constipação severa e agravamento da azotemia. O sucralfato não deve ser utilizado como quelante de fósforo, devendo ser reservado para lesões gastroesofágicas comprovadas com vigilância contra acúmulo de alumínio em nefropatas.',
      },
    ],
  },

  clorambucil: {
    plumbs: { monograph: 'Chlorambucil', pages: '243–245' },
    bsava: { monograph: 'Chlorambucil', pages: '76–77' },
    nelsonCouto: { chapter: 'Cap. 72: Chronic Enteropathies and Protein-Losing Enteropathies in Dogs & Cap. 82: Feline Alimentary Lymphoma', pages: '1150–1158, 1280–1288' },
    ettinger: { chapter: 'Cap. 250: Chronic Enteropathies in the Dog & Cap. 317: Lymphoma in the Cat', pages: '1540–1548, 1980–1988' },
    topics: [
      {
        title: 'Mecanismo molecular de alquilação bifuncional, cross-links e citotoxicidade celular',
        narrative:
          'O clorambucil é uma mostarda nitrogenada aromática bifuncional que sofre reação de ciclização intramolecular gerando o carbocátion cíclico reativo íon aziridínio. Esse intermediário ataca nucleófilos celulares com grande avidez, promovendo a alquilação covalente da posição N7 da guanina em ambas as fitas de DNA. A presença de dois grupamentos 2-cloroetil na molécula permite a formação de ligações cruzadas interfita e intrafita. As pontes interfita impedem mecanicamente a abertura das fitas duplas pelas helicases durante as fases de replicação e transcrição gênica, deflagrando o colapso da forquilha de replicação e ativando a resposta a dano no DNA mediada por ATM/ATR, o que culmina em parada do ciclo celular e apoptose. Embora seja classificado como agente ciclo celular inespecífico (CCNS), sua letalidade biológica é máxima em linhagens de rápida divisão — tais como precursores hematopoiéticos da medula óssea, enterócitos e linfócitos neoplásicos.',
      },
      {
        title: 'O nicho de excelência no linfoma intestinal felino de pequenas células versus linfoma de alto grau',
        narrative:
          'Na oncologia felina, o clorambucil associado à prednisolona representa a terapia padrão-ouro do linfoma alimentar de células pequenas / baixo grau (Small-Cell Alimentary Lymphoma, predominantemente de imunofenótipo T CD3+ mucosal). Por tratar-se de uma neoplasia indolente de baixa fração proliferativa, ela responde extraordinariamente bem à alquilação metronômica de baixa intensidade em regimes orais (2 mg por gato a cada 48 a 72 horas), alcançando taxas de remissão clínica global de 85% a 96% e sobrevidas medianas documentadas entre 700 e mais de 1300 dias (Kiselow et al. 2008, Stein et al. 2010, Pope et al. 2015). Em contraste marcante, o linfoma multicêntrico de alto grau (linfoma de grandes células) possui evolução fulminante e não deve ser manejado com monoterapia de clorambucil, exigindo protocolos combinados intensivos do tipo CHOP (com ciclofosfamida, doxorrubicina, vincristina e prednisona).',
      },
      {
        title: 'Bases da recomendação forte do Consenso ACVIM 2026 em PLE canina e segurança hematológica',
        narrative:
          'O Consenso Internacional ACVIM sobre Enteropatia Inflamatória Crônica Canina (2026) estabeleceu uma recomendação clínica forte para a introdução do clorambucil (2 a 4 mg/m² VO q24h) associado à prednisolona em cães acometidos por enteropatia perdedora de proteínas (PLE) refratários à dieta hidrolisada e corticosteroides. Essa diretriz fundamenta-se nos achados de Dandrieux et al. (2013), nos quais o esquema contendo clorambucil promoveu ganho sustentado de peso corporal, elevação mais expressiva da albumina sérica e maior sobrevida em comparação com o protocolo baseado em azatioprina. O principal órgão limitante do clorambucil é a medula óssea, exigindo monitoramento rigoroso do hemograma para detecção de neutropenia e trombocitopenia (interromper se neutrófilos < 2.000/µL ou plaquetas < 50.000/µL), vigilância de enzimas hepáticas e urinálise periódica em felinos para rastreio de Síndrome de Fanconi adquirida (glicosúria normoglicêmica).',
      },
    ],
  },

  mirtazapina: {
    plumbs: { monograph: 'Mirtazapine', pages: '893–896' },
    bsava: { monograph: 'Mirtazapine', pages: '270–271' },
    nelsonCouto: { chapter: 'Cap. 27: Manifestations of Gastrointestinal Disease (Anorexia) & Cap. 42: Chronic Kidney Disease', pages: '438–442, 698–704' },
    ettinger: { chapter: 'Cap. 40: Anorexia, Nausea, and Vomiting & Cap. 282: Chronic Kidney Disease in Dogs and Cats', pages: '215–222, 1720–1728' },
    topics: [
      {
        title: 'Eixo orexígeno e antiemético: desinibição monoaminérgica e antagonismo dos receptores 5-HT3 e H1',
        narrative:
          'A mirtazapina ocupa uma posição singular na terapêutica de pequenos animais por congregar, em uma única molécula, potente estímulo central do apetite e ação antiemética e antináusea direta. Essa sinergia decorre de seu perfil farmacodinâmico complexo como antidepressivo tetracíclico atípico da classe NaSSA. No sistema nervoso central, o fármaco antagoniza os autorreceptores e heterorreceptores alfa-2 adrenérgicos pré-sinápticos, suprimindo a alça inibitória de retroalimentação negativa e deflagrando liberação líquida aumentada de noradrenalina e serotonina na fenda sináptica. A noradrenalina livre atua sobre receptores pós-sinápticos ativadores da busca alimentar no hipotálamo ventromedial e lateral. Simultaneamente, a mirtazapina bloqueia com alta afinidade os receptores 5-HT2C (que transmitem sinais inibitórios de saciedade) e os receptores histaminérgicos H1 centrais, resultando em ativação robusta da fome. De forma complementar decisiva, o antagonismo seletivo sobre os receptores 5-HT3 na zona disparadora dos quimiorreceptores (CTZ) da área postrema e nas terminações sensitivas vagais periféricas mimetiza a ação da ondansetrona, suprimindo o enjoo visceral e a aversão alimentar que frequentemente perpetuam a anorexia em pacientes com insuficiência renal, gastroenterites e neoplasias.',
      },
      {
        title: 'Farmacocinética comparada, não linearidade felina e o princípio da menor dose eficaz',
        narrative:
          'A farmacocinética comparada da mirtazapina ilustra uma das diferenças interespécies mais marcantes da farmacologia veterinária. Em cães Beagles hígidos, o fármaco exibe cinética linear com depuração corporal rápida (~1193 mL/kg/hora) e meia-vida plasmática curta de aproximadamente 6,2 horas, permitindo regimes diários consistentes de 0,5 a 1,3 mg/kg q24h. Em contraste, a espécie felina apresenta deficiência constitucional em vias microssomais de glicuronidação hepática e uma cinética acentuadamente não linear. No estudo seminal de Quimby et al. (2011), a duplicação da dose de 1,88 mg para 3,75 mg/gato elevou a meia-vida plasmática terminal de 9,2 para 15,9 horas e saturou a depuração. Clinicamente, 1,88 mg e 3,75 mg promoveram consumo voluntário de alimento equivalente, mas a dose de 3,75 mg desencadeou alterações comportamentais adversas severas em mais da metade dos animais (vocalização contínua em 56%, agitação em 31%, taquicardia e tremores). Na Doença Renal Crônica felina (Quimby & Lunn 2013), o clearance oral cai para 0,6 L/h/kg e a meia-vida aumenta para 15,2 horas, fundamentando o intervalo de 48 horas (q48h). Em gatos com doença hepatobiliar (Fitzpatrick et al. 2018), a meia-vida plasmática atinge mediana de 13,8 horas e até 61,4 horas em animais ictéricos, demandando espaçamento das doses para 48 a 72 horas.',
      },
      {
        title: 'Regulamentação, segurança ocupacional da via transdérmica e manejo do resgate de intoxicação',
        narrative:
          'No cenário regulatório brasileiro, a mirtazapina requer atenção especial: formulações humanas (comprimidos simples e orodispersíveis) enquadram-se na Lista C1 da Portaria SVS/MS nº 344/1998, exigindo Receita de Controle Especial em duas vias branca com retenção da primeira via. Já a formulação veterinária de referência registrada no MAPA (Mirtz 2 mg da Agener União, comprimidos palatáveis para gatos) submete-se às regras da Portaria MAPA nº 837/2025, exigindo emissão de Notificação de Receita Veterinária via SIPEAGRO em duas vias. No âmbito toxicológico, a mirtazapina não deve jamais ser associada a inibidores da monoamina oxidase (IMAO, como selegilina e amitraz), exigindo período mínimo de washout de 14 dias pelo risco crítico de Síndrome Serotoninérgica fatal. Na ocorrência de superdosagem acidental ou toxicidade severa com hipertermia, tremores e vocalização contínua, a ciproeptadina (antagonista 5-HT2) atua como antídoto específico de resgate na dose de 2 a 4 mg por gato por via oral ou retal (Ferguson et al. 2016). Para formulações transdérmicas auriculares (Mirataz), o uso de luvas pelo aplicador e o isolamento de contato físico por 2 horas são mandatórios para prevenir absorção ocupacional humana.',
      },
    ],
  },

  gabapentina: {
    plumbs: { monograph: 'Gabapentin', pages: '568–570' },
    bsava: { monograph: 'Gabapentin', pages: '179–180' },
    nelsonCouto: { chapter: 'Cap. 62: Seizures and Other Paroxysmal Events & Cap. 64: Neuromuscular Diseases and Pain Management', pages: '1008–1014, 1032–1038' },
    ettinger: { chapter: 'Cap. 43: Pain Assessment and Management & Cap. 247: Epilepsy and Brain Disorders', pages: '242–248, 1482–1488' },
    topics: [
      {
        title: 'Bases neurofarmacológicas: modulação da subunidade alfa-2-delta dos VGCC e ausência de ação gabaérgica direta',
        narrative:
          'Embora sintetizada como análogo lipofílico do ácido gama-aminobutírico (GABA), a gabapentina não exibe afinidade pelos receptores GABA-A ou GABA-B, não é metabolizada em GABA ativo, não inibe a enzima GABA-transaminase e não altera os mecanismos de recaptação neuronal desse transmissor inibitório. Sua eficácia terapêutica apoia-se na ligação estéreo-específica de alta afinidade à subunidade auxiliar alfa-2-delta-1 (α2δ-1) dos canais de cálcio dependentes de voltagem (VGCCs tipos N e P/Q) expressos nos terminais pré-sinápticos de neurônios nociceptivos primários no corno dorsal da medula espinhal, hipocampo e neocórtex. Tanto Ettinger (2024) quanto Nelson & Couto (6ª ed.) destacam que estados patológicos de lesão nervosa periférica ou central e inflamação crônica persistente desencadeiam upregulation maciça da expressão dessa subunidade alfa-2-delta. A gabapentina impede a ancoragem e o tráfego anterógrado dessas subunidades para a membrana axonal pré-sináptica, reduzindo o influxo de cálcio dependente de despolarização e silenciando a exocitose de neurotransmissores excitatórios primários, tais como L-glutamato, substância P e CGRP. Essa inibição quebra os circuitos de retroalimentação positiva espinhal que mantêm a hiperexcitabilidade central (wind-up) e alodinia mecânica, fornecendo a base mecanística para seu emprego como analgésico adjuvante.',
      },
      {
        title: 'Farmacocinética comparada, superação do mito de meia-vida canina e individualização na DRC felina',
        narrative:
          'A farmacocinética comparada da gabapentina revela nuances cruciais entre cães e gatos que ditam o sucesso ou a falha do regime posológico. Historicamente, diversas fontes veterinárias secundárias perpetuaram o dado errôneo de que a meia-vida canina seria de aproximadamente 9 horas. Ensaios farmacocinéticos rigorosos de KuKanich & Cohen (2011) demonstraram que a meia-vida de eliminação plasmática terminal em cães situa-se estritamente entre 3,3 e 3,4 horas, com pico sérico rápido (Tmax de 1,3 a 1,5 horas) e biodisponibilidade oral decrescente de ~80% para doses baixas (10 mg/kg) até ~60% para doses mais altas devido à saturação do transportador de aminoácidos neutros L-type (LAT1) no epitélio intestinal. Em decorrência dessa eliminação acelerada, esquemas a cada 12 horas geram vales plasmáticos acentuados com perda do controle analgésico, sendo a frequência a cada 8 horas (q8h) farmacocineticamente indispensável para analgesia crônica no cão. Ademais, o cão metaboliza 30% a 40% da dose no fígado em N-metil-gabapentina, enquanto o gato não exibe metabolização mensurável e depende quase que integralmente (100%) da depuração renal por filtração glomerular. No felino hígido, a biodisponibilidade oral atinge 95% com meia-vida de 3,6 a 4,0 horas (Adrian et al. 2018), enquanto formulações transdérmicas em gel PLO apresentam absorção errática e concentrações subclínicas ineficazes. Conforme demonstrado por Quimby et al. (2022), gatos com Doença Renal Crônica (DRC estágios IRIS 2 a 4) exibem redução substancial do clearance com aumento proporcional da concentração sérica e da meia-vida de eliminação, tornando imperativa a redução da dose pré-visita para aproximadamente 10 mg/kg para prevenir ataxia motora grave, hipotermia e decúbito prolongado.',
      },
      {
        title: 'Consolidação da ansiólise Fear Free, alerta toxicológico ao xilitol e manejo seguro de descontinuação',
        narrative:
          'A gabapentina consolidou-se como a intervenção farmacológica de escolha para o manejo do estresse agudo em gatos durante o transporte e consultas veterinárias (protocolo Fear Free), respaldada por ensaios clínicos controlados (van Haaften et al. 2017). A administração de uma dose única oral de 50 a 100 mg por gato administrada 90 a 120 minutos antes do evento sonoro ou deslocamento reduz drasticamente a agressividade e a reatividade ao exame, permitindo intervenções sem contenção física traumática. No entanto, Plumb (10ª ed.) e BSAVA (10ª ed.) enfatizam que o fármaco não atua como analgésico de resgate para dor cirúrgica aguda ou nocicepção inflamatória severa (Wagner et al. 2010), não devendo substituir opioides ou bloqueios anestésicos locais. No campo da segurança toxicológica, impõe-se um alerta inflexível contra o uso de formulações líquidas comerciais de humanos em cães: a grande maioria das soluções orais pediátricas humanas contém teores elevados de xilitol (frequentemente 300 mg/mL), que provocam liberação massiva e imediata de insulina no cão com choque hipoglicêmico refratário e necrose hepática aguda com coagulopatia intravascular fatal. Caso seja necessária formulação líquida em cães ou gatos, esta deve ser exclusivamente manipulada em farmácia veterinária autorizada com veículo hidrossolúvel isento de xilitol. Por fim, a suspensão de terapias crônicas para dor ou epilepsia deve ser realizada sob desmame escalonado ao longo de 2 a 3 semanas para prevenir crises convulsivas de rebote e exacerbação dolorosa.',
      },
    ],
  },

  ciproeptadina: {
    plumbs: { monograph: 'Cyproheptadine', pages: '327–329' },
    bsava: { monograph: 'Cyproheptadine', pages: '103–104' },
    nelsonCouto: { chapter: 'Cap. 27: Manifestations of Gastrointestinal Disease (Anorexia) & Cap. 35: Hepatobiliary Diseases in the Cat', pages: '438–442, 575–582' },
    ettinger: { chapter: 'Cap. 40: Anorexia, Nausea, and Vomiting & Cap. 129: Drug Toxicities (Antidepressants and Serotonin Syndrome)', pages: '215–222, 590–596' },
    topics: [
      {
        title: 'Farmacodinâmica multialvo: agonismo inverso H1, antagonismo 5-HT2 e o duplo papel clínico',
        narrative:
          'A ciproeptadina exibe um perfil farmacodinâmico complexo e polifuncional caracterizado por quatro ações moleculares primárias. Em primeiro lugar, atua como agonista inverso dos receptores histaminérgicos H1, estabilizando ativamente a conformação inativa do receptor. Sua elevada lipofilicidade permite cruzar livremente a barreira hematoencefálica, silenciando neurônios histaminérgicos de vigília no hipotálamo posterior, o que explica a sedação marcante como seu principal efeito adverso. Em segundo lugar, exerce potente antagonismo competitivo sobre receptores serotoninérgicos 5-HT2, com destaque para os subtipos 5-HT2A e 5-HT2C. Essa propriedade constitui a base biológica de suas duas grandes utilidades contemporâneas: no núcleo arqueado do hipotálamo, o bloqueio de 5-HT2C suprime os sinais de saciedade mediados por neurônios anorexígenos POMC, favorecendo vias orexígenas (NPY/AgRP); por outro lado, no córtex e na medula, o bloqueio de 5-HT2A interrompe a hiperexcitabilidade neuromuscular e autonômica característica da Síndrome Serotoninérgica decorrente de sobredosagens de antidepressivos, tramadol ou 5-HTP. Em terceiro e quarto planos, apresenta afinidade antimuscarínica (M3) e discreto bloqueio de canais de cálcio com estabilização de membrana neuronal.',
      },
      {
        title: 'Farmacocinética felina, variabilidade interindividual e o imperativo da nutrição enteral',
        narrative:
          'O perfil farmacocinético no gato hígido, estabelecido por Norris et al. (1998), revela absorção oral virtualmente completa (biodisponibilidade aparente de 101 ± 36%) e volume de distribuição extraordinariamente elevado (~106 L/kg), decorrente da difusão tecidual maciça do fármaco. A meia-vida de eliminação plasmática terminal é prolongada (12,8 ± 9,9 horas), com grande variabilidade individual que justifica posologias conservadoras a cada 12 a 24 horas para evitar sedação cumulativa profunda. Contudo, tanto Ettinger (2024) quanto as diretrizes consensuais da ISFM (2022) alertam para a distinção crítica entre plausibilidade biológica e eficácia clínica: faltam ensaios clínicos randomizados contemporâneos demonstrando que a ciproeptadina reverta de forma duradoura o deficit energético em gatos hospitalizados criticamente doentes. A estimulação do apetite jamais deve preceder o controle de náusea e dor (sob risco de aversão alimentar aprendida) nem postergar a passagem de sondas enterais de alimentação em felinos sob jejum superior a 48 a 72 horas em risco iminente de lipidose hepática.',
      },
      {
        title: 'Resgate da Síndrome Serotoninérgica, vias não enterais e revisão de indicações históricas',
        narrative:
          'Na toxicologia de pequenos animais, a ciproeptadina atua como fármaco essencial de intervenção no manejo da Síndrome Serotoninérgica (Plumb 10ª ed., Manual Merck). Diante de pacientes apresentando hipertermia, tremores, rigidez muscular, taquicardia e hiperreflexia, a dose de 1,1 mg/kg em cães e 2 a 4 mg por gato pode ser administrada por via oral ou, em animais com depressão do sensório ou emese incoercível, por via retal (PR) através da maceração dos comprimidos em solução fisiológica estéril. Concomitantemente, a literatura moderna consolidou o descarte de antigas indicações históricas: ensaios experimentais controlados (Schooley et al. 2007) comprovaram que a ciproeptadina falha em reduzir o infiltrado eosinofílico das vias aéreas em gatos com asma, devendo ser abandonada como monoterapia respiratória; de forma idêntica, estudos clínicos em cães com hiperadrenocorticismo hipófise-dependente (Stolp et al. 1984) demonstraram ausência de resposta terapêutica endocrinológica.',
      },
    ],
  },
};

export function applyMedicationBookFoundations(medication: MedicationRecord): MedicationRecord {
  medication = repairMedicationReferences(medication);
  medication = applyMedicationClinicalCorrections(medication);
  const entry = MEDICATION_BOOK_FOUNDATIONS[medication.slug];
  if (!entry) return medication;

  const bookReferences: EditorialReference[] = [];

  if (entry.plumbs) {
    bookReferences.push({
      id: `ref-book-foundations-plumbs-${medication.slug}`,
      citationText: `Plumb’s Veterinary Drug Handbook, 10ª edição. Monografia: ${entry.plumbs.monograph}. p. ${entry.plumbs.pages}.`,
      sourceType: 'Formulário farmacológico',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Fonte de referência farmacológica, doses e intervalos para cães e gatos.',
    });
  }

  if (entry.bsava) {
    bookReferences.push({
      id: `ref-book-foundations-bsava-${medication.slug}`,
      citationText: `BSAVA Small Animal Formulary, Part A: Canine and Feline, 10ª edição. Monografia: ${entry.bsava.monograph}. p. ${entry.bsava.pages}.`,
      sourceType: 'Formulário farmacológico',
      notes: 'Diretrizes britânicas de posologia e segurança em pequenos animais.',
    });
  }

  if (entry.nelsonCouto) {
    bookReferences.push({
      id: `ref-book-foundations-nelson-couto-${medication.slug}`,
      citationText: `Nelson RW, Couto CG. Medicina Interna de Pequenos Animais, 6ª edição. Guanabara Koogan / Elsevier. ${entry.nelsonCouto.chapter}. p. ${entry.nelsonCouto.pages}.`,
      sourceType: 'Tratado de Medicina Interna',
      notes: 'Referência clínica de fisiopatologia, conduta diagnóstica e protocolos terapêuticos.',
    });
  }

  if (entry.ettinger) {
    bookReferences.push({
      id: `ref-book-foundations-ettinger-${medication.slug}`,
      citationText: `Ettinger SJ, Feldman EC, Côté É. Textbook of Veterinary Internal Medicine, 9ª edição (2024). Elsevier. ${entry.ettinger.chapter}. p. ${entry.ettinger.pages}.`,
      sourceType: 'Tratado de Medicina Interna',
      notes: 'Diretrizes internacionais e farmacoterapia avançada em medicina interna de cães e gatos.',
    });
  }

  if (entry.productSource) {
    bookReferences.push({
      id: `ref-book-foundations-product-${medication.slug}`,
      citationText: 'Virbac Brasil. Pronefra: composição e modo de usar. Consultado em 19/09/2026.',
      sourceType: 'Informação do fabricante',
      url: entry.productSource,
    });
  }

  const bookRefIds = bookReferences.map((reference) => reference.id!);

  // Preservar todas as referências existentes excluindo apenas as de livros que serão substituídas de forma idempotente
  const existingRefs = (medication.references ?? []).filter(
    (reference) => !bookRefIds.includes(reference.id ?? '')
  );
  const updatedReferences = [...existingRefs, ...bookReferences];
  const fallbackDoseReferenceId = entry.plumbs
    ? `ref-book-foundations-plumbs-${medication.slug}`
    : updatedReferences.find((reference) => reference.id)?.id;
  const doses = medication.doses.map((dose) => (
    dose.referenceIds?.length || !fallbackDoseReferenceId
      ? dose
      : { ...dose, referenceIds: [fallbackDoseReferenceId] }
  ));

  // 1. Tópicos didáticos dos 4 livros de referência (básico ao avançado)
  // Não injetamos os IDs de livros nos tópicos para não poluir o visual com blocos de texto sob o parágrafo.
  // Os livros ficam integrados no texto e catalogados oficialmente na seção de Referências Bibliográficas no final da página.
  const bookTopics = entry.topics.map((topic, index) => ({
    id: `${medication.slug}-book-foundation-${index + 1}`,
    ...topic,
    referenceIds: [],
    studies: [],
  }));

  // 2. Tópicos de evidências e ensaios clínicos publicados
  // Filtrar tópicos que não sejam book-foundation para evitar duplicações em chamadas repetidas (idempotência)
  const priorFoundations = (medication.clinicalFoundationsData ?? [])
    .filter(
      (t) =>
        !t.id?.includes('book-foundation-') &&
        (medication.slug === 'dipirona' ||
          medication.slug === 'tramadol' ||
          !/dipirona|metamizol|4-MAA|COX-3/i.test(`${t.title} ${t.narrative}`))
    )
    .map((topic) => ({
      ...topic,
      referenceIds:
        topic.referenceIds && topic.referenceIds.length > 0
          ? topic.referenceIds
          : (topic.studies?.map((s) => s.referenceId).filter(Boolean) as string[]) ?? [],
    }));
  const priorHasStudies = priorFoundations.some((t) => t.studies && t.studies.length > 0);

  let clinicalFoundationsData: typeof medication.clinicalFoundationsData;

  if (priorHasStudies) {
    clinicalFoundationsData = [...bookTopics, ...priorFoundations];
  } else if (medication.clinicalStudiesCommented && medication.clinicalStudiesCommented.length > 0) {
    // Converter clinicalStudiesCommented em tópicos estruturados com EvidenceFindingBlock completos
    const studyTopics = medication.clinicalStudiesCommented.map((study, idx) => ({
      id: `${medication.slug}-study-topic-${study.referenceId || idx + 1}`,
      title: `${study.title} (${study.authorsYear.split('(')[0].trim()})`,
      narrative: `${study.studyDesign}. ${study.mainFindings}`,
      narrativeHighlights: [study.sampleSize, study.journal].filter(Boolean),
      referenceIds: [study.referenceId].filter(Boolean),
      studies: [
        {
          citation: `${study.authorsYear}. ${study.title}. ${study.journal}.`,
          referenceId: study.referenceId,
          sourceType: study.studyDesign,
          summaryText: study.mainFindings,
          summaryHighlights: [study.sampleSize, study.journal].filter(Boolean),
          metrics: [study.sampleSize].filter(Boolean),
          clinicalConclusion: study.clinicalTakeaway,
        },
      ],
    }));
    clinicalFoundationsData = [...bookTopics, ...studyTopics];
  } else {
    clinicalFoundationsData = bookTopics;
  }

  return {
    ...medication,
    doses,
    references: updatedReferences,
    clinicalFoundationsData,
  };
}
