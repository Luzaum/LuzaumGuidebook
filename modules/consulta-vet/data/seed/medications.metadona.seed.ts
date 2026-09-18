import type { MedicationRecord } from '../../types/medication';

export const metadonaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-metadona',
    slug: 'metadona',
    title: 'Metadona (Cloridrato de Metadona)',
    activeIngredient: 'Cloridrato de Metadona',
    isControlled: true,
    pharmacologicClass:
      'Analgésico opioide potente; agonista pleno de receptores mu-opioides (MOR), antagonista não competitivo do receptor NMDA e inibidor da recaptação de noradrenalina',
    species: ['dog', 'cat'],
    category: 'anestesia-dor',
    tags: [
      'Metadona',
      'Cloridrato de Metadona',
      'Opioide Agonista Pleno',
      'Agonista Mu Completo',
      'Mytedom',
      'Comfortan',
      'Synthadon',
      'Antagonismo NMDA',
      'Sensibilização Central',
      'Dor Perioperatória',
      'Dor Ortopédica',
      'Infusão Contínua (CRI)',
      'Via Transmucosa Oral (OTM)',
      'Portaria MAPA 837/2025',
      'Notificação de Receita A VET',
      'Controle Especial Lista A1',
      'AAHA 2022',
      'BSAVA 10ª ed.',
      'Plumb 10ª ed.',
    ],
    tradeNames: [
      'Mytedom® 10 mg/mL Solução Injetável em Ampolas de 1 mL (Cristália — Linha Humana sob Notificação de Receita A VET / Uso Hospitalar)',
      'Comfortan® 10 mg/mL Solução Injetável (Dechra — Referência Veterinária Oficial Europeia / UK)',
      'Synthadon® 10 mg/mL Solução Injetável (Animalcare — Referência Veterinária Oficial Europeia)',
      'Dolophine® / Methadose® 10 mg/mL Injetável e Comprimidos 5 mg e 10 mg (Referência Internacional)',
      'Mytedom® Comprimidos 5 mg e 10 mg (Cristália — Linha Humana; Uso Oral Ineficaz e Desaconselhado na Rotina Veterinária)',
      'Cloridrato de Metadona Solução Injetável 10 mg/mL (Preparações Magistrais Veterinárias Hospitalares sob Notificação)',
    ],
    officialSiteUrl: 'https://www.gov.br/agricultura/pt-br',
    leafletUrl: 'https://www.cristalia.com.br/produto/127/bula-profissional',
    mechanismOfAction:
      'A metadona é uma fenilheptilamina / difenilheptanona sintética de estrutura lipofílica, comercializada clinicamente como uma mistura racêmica balanceada dos enantiômeros R(-)/levometadona e S(+)/dextrometadona. Seu perfil farmacodinâmico único diferencia-se da morfina clássica por atuar simultaneamente sobre três alvos biológicos centrais na nocicepção: 1) Agonismo pleno sobre receptores mu-opioides (MOR): mediado majoritariamente pelo enantiômero R(-), que possui potência agonista mu até 50 vezes superior ao enantiômero S(+). A ligação ao receptor MOR acoplado à proteína Gi/o inibe a enzima adenilato ciclase intracelular, reduzindo a síntese de cAMP e a ativação da proteína quinase A (PKA). No terminal pré-sináptico dos neurônios nociceptivos primários do corno dorsal da medula e do tronco encefálico, isso culmina no fechamento de canais de cálcio voltagem-dependentes (especialmente dos tipos N e P/Q), bloqueando o influxo de Ca2+ necessário para a exocitose vesicular de neurotransmissores excitatórios da dor (como glutamato, substância P e CGRP). No terminal pós-sináptico, ativa canais retificadores de potássio acoplados à proteína G (GIRK), promovendo extravasamento maciço de K+ e hiperpolarização de membrana, o que suprime a deflagração de potenciais de ação nas vias ascendentes espinotalâmicas. Por ser agonista pleno, a metadona não apresenta o efeito teto analgésico inerente aos agonistas parciais, permitindo excelente escalabilidade para dor severa. 2) Antagonismo não competitivo do receptor NMDA (N-metil-D-aspartato): compartilhado por ambos os enantiômeros R(-) e S(+), esse bloqueio impede o influxo sustentado de cálcio e a hiperexcitabilidade neuronal no corno dorsal medular, prevenindo os fenômenos de amplificação dolorosa conhecidos como wind-up, hiperalgesia secundária e sensibilização central, além de atenuar o desenvolvimento de tolerância aos opioides. 3) Inibição da recaptação de monoaminas: a metadona inibe o transportador de recaptação de noradrenalina (NET), reforçando as vias inibitórias descendentes da dor originadas no locus coeruleus, que ativam receptores alfa-2 adrenérgicos medulares para amortecer ainda mais a transmissão nociceptiva. Além disso, ao contrário da morfina, a metadona possui mínima propensão à liberação sistêmica de histamina após injeção intravenosa, mantendo maior estabilidade na resistência vascular periférica.',
    plainLanguageSummary:
      'A metadona é um analgésico opioide pleno potente e de referência na medicina veterinária, amplamente indicado para o controle de dor aguda moderada a grave em cães e gatos, especialmente no período perioperatório de cirurgias ortopédicas e abdominais complexas. Além de seu potente efeito analgésico sem teto clínico, atua bloqueando receptores NMDA e modulando a noradrenalina, o que ajuda a frear a sensibilização dolorosa da medula espinhal. Destaca-se frente à morfina por provocar significativamente menos episódios de vômito e mínima liberação de histamina. Em cães, a via oral comum é ineficaz pela rápida degradação hepática, enquanto em gatos a aplicação transmucosa oral (na bochecha) é uma via comprovada e segura. Seu uso é predominantemente hospitalar e exige monitoramento atento da frequência cardíaca e respiratória.',
    indications: [
      'Analgesia perioperatória e pós-operatória para procedimentos cirúrgicos com dor aguda moderada a intensa em cães e gatos (cirurgias ortopédicas complexas, osteossínteses, osteotomias corretivas, artroplastias, cirurgias da coluna vertebral, laparotomias exploratórias extensas, toracotomias e amputações).',
      'Componente opioide preferencial na Medicação Pré-Anestésica (MPA) multimodal, proporcionando sedação sinérgica e potente efeito poupador da Concentração Alveolar Mínima (CAM) dos anestésicos inalatórios (isoflurano e sevoflurano) e do consumo de indutores intravenosos (propofol/alfaxalona).',
      'Infusão contínua intravenosa (CRI) em cães e gatos hospitalizados em unidades de terapia intensiva para controle sustentado de dor somática ou visceral grave (pancreatite necrosante aguda, politraumatismo, peritonite séptica após controle de foco e pós-operatório ortopédico imediato).',
      'Analgesia epidural e locorregional lombossacra combinada a anestésicos locais (ropivacaína, bupivacaína ou lidocaína), proporcionando até 8 a 18 horas de analgesia cirúrgica e pós-operatória prolongada com estabilidade hemodinâmica.',
      'Analgesia ambulatorial e hospitalar felina pela via oral transmucosa (OTM), aproveitando a absorção bucal favorável para pacientes em que a via injetável repetida seja estressante ou contraindicada.',
      'Terapia analgésica de resgate imediato para pacientes que apresentem falha analgésica precoce ou escape sob opioides agonistas parciais (como buprenorfina) ou fracos (como tramadol).',
    ],
    contraindications: [
      'Hipersensibilidade conhecida ao cloridrato de metadona ou a qualquer um dos excipientes da fórmula comercial.',
      'Depressão respiratória grave pré-existente descompensada, hipoventilação alveolar aguda sem suporte ventilatório mecânico ou obstrução grave não estabilizada de vias aéreas superiores.',
      'Traumatismo cranioencefálico com hipertensão intracraniana descompensada ou coma (a hipoventilação induz hipercapnia arterial, promovendo vasodilatação cerebral reflexa e pico potencialmente fatal de pressão intracraniana).',
      'Bradicardia sinusal severa ou bloqueios atrioventriculares avançados descompensados sem marcapasso prévio, em virtude do forte estímulo vagal central da metadona.',
      'Administração concomitante com inibidores da monoamina oxidase (IMAOs, como selegilina, amitraz ou linezolida), devido ao risco crítico de desencadeamento de síndrome serotoninérgica hiperpirética fatal.',
      'Uso pré-operatório imediato em cesarianas antes do clampeamento do cordão umbilical (atravessa a placenta com facilidade e induz grave depressão respiratória neonatal nos filhotes).',
      'Acidentes por picada de escorpiões do gênero Centruroides (contraindicação toxicológica formal dos opioides pela potencialização de efeitos neurotóxicos do veneno).',
    ],
    cautions: [
      'Ineficácia da via oral convencional: em cães e gatos, a ingestão oral comum sofre extenso metabolismo hepático de primeira passagem, gerando biodisponibilidade plasmática ínfima; comprimidos orais não são recomendados para analgesia aguda de rotina.',
      'Acentuada estimulação vagal e bradicardia: a metadona reduz a frequência cardíaca de forma mais pronunciada que a morfina (quedas de 32% a 46% documentadas); monitorar eletrocardiograma e débito cardíaco, mantendo anticolinérgicos (atropina ou glicopirrolato) prontamente acessíveis.',
      'Particularidade farmacocinética da raça Greyhound: cães da raça Greyhound apresentam depuração hepática acelerada da metadona, necessitando de doses 1,5 a 2 vezes superiores às usuais (1,0 a 1,5 mg/kg a cada 3 a 4 horas) para sustentar concentrações plasmáticas terapêuticas alvo de 40 ng/mL.',
      'Interações metabólicas via CYP2B11: a coadministração de inibidores potentes do CYP2B11 canino (como fluconazol e cloranfenicol) prolonga acentuadamente a meia-vida e a exposição sistêmica da metadona, exigindo espaçamento dos intervalos para evitar intoxicação e sedação excessiva.',
      'Salivação e aversão gustativa na via OTM felina: apresentações injetáveis contendo conservantes ou pH ácido podem desencadear salivação intensa e estresse se aplicadas na mucosa oral de gatos; preferir formulações sem conservantes e depositar o volume lentamente.',
      'Absorção subcutânea errática: a administração subcutânea (SC) apresenta maior variabilidade interindividual de pico plasmático e meia-vida de absorção prolongada (até 11 horas), não sendo a via de escolha quando se busca início analgésico rápido e previsível em pacientes agudos.',
      'Reversão criteriosa por naloxona: em casos de depressão respiratória grave induzida por metadona, administrar naloxona titulada em doses baixas para reverter a hipoventilação sem anular subitamente toda a analgesia em animais com dor cirúrgica intensa.',
    ],
    adverseEffects: [
      'Bradicardia sinusal dose-dependente mediada por estimulação vagal central (comum; tratável com anticolinérgicos se houver repercussão sobre o débito cardíaco).',
      'Depressão respiratória com hipoventilação alveolar e bradipneia (comum em doses elevadas ou sob anestesia geral combinada; decorrente da menor sensibilidade dos centros bulbares ao CO2).',
      'Sedação profunda dose-dependente (comum; clinicamente desejável no perioperatório, mas exige monitoramento de vias aéreas e saturação de oxigênio).',
      'Hipotermia (comum; por depressão do limiar hipotalâmico termorregulador, vasodilatação periférica e redução do tônus muscular).',
      'Panting ou respiração ofegante superficial em cães (incomum a comum; alteração transitória no ponto de ajuste de termorregulação central).',
      'Salivação transitória, deglutição atípica e discreta náusea (incomum; frequência de êmese pré-operatória é expressivamente menor que com morfina ou hidromorfona).',
      'Midríase pupilar bilateral pronunciada e prolongada em gatos (comum; persiste frequentemente após o término da antinocicepção).',
      'Disforia, vocalização branda ou inquietação psicomotora na recuperação anestésica (incomum; responde a microdoses de dexmedetomidina ou ajuste ambiental).',
      'Redução da motilidade gastrointestinal e constipação em administrações repetidas ou infusões contínuas (comum em terapias prolongadas).',
      'Retenção urinária por aumento do tônus do esfíncter vesical interno (incomum; monitorar repleção da bexiga em pacientes sob infusão contínua).',
    ],
    routes: ['iv', 'im', 'sc', 'oral'],
    doses: [
      {
        id: 'dose-metadona-cao-analgesia-aguda',
        species: 'dog',
        indication:
          'Analgesia perioperatória e dor aguda moderada a intensa em cães (cirurgias ortopédicas, abdominais e trauma)',
        doseMin: 0.1,
        doseMax: 0.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa (IV lenta) ou Intramuscular (IM)',
        frequency: 'A cada 3 a 4 horas (q3-4h) ou conforme reavaliação de escalas de dor',
        duration: 'Conforme avaliação álgica clínica diária (geralmente 24 a 72 horas pós-operatórias)',
        notes:
          'Dose de referência habitual mais utilizada em cães estáveis: 0,2 a 0,3 mg/kg IV lenta ou IM. Para dor ortopédica severa, doses de 0,4 a 0,5 mg/kg IM apresentam comprovação em ensaios clínicos randomizados. Em cães da raça Greyhound, doses de 1,0 a 1,5 mg/kg podem ser necessárias devido à depuração hepática acelerada. Na via IV, aplicar de forma lenta ao longo de 2 a 3 minutos, monitorando frequência cardíaca e ventilação.',
        calculatorEnabled: true,
        evidenceLevel: 'Consenso Internacional / Ensaios Clínicos Randomizados (Nível 1b)',
        referenceIds: ['plumbs-10ed', 'bsava-10ed', 'lumb-jones-6ed', 'hunt-2013-ortho'],
      },
      {
        id: 'dose-metadona-cao-cri',
        species: 'dog',
        indication:
          'Infusão contínua intravenosa (CRI) para dor aguda sustentada em cães hospitalizados (UTI, politrauma, pós-op ortopédico severo)',
        doseMin: 0.1,
        doseMax: 0.12,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa contínua (CRI)',
        frequency: 'Por hora de infusão contínua (mg/kg/h)',
        duration: '12 a 72 horas sob monitoramento contínuo em bomba de infusão',
        notes:
          'Protocolo clássico: administrar dose de ataque de 0,1 a 0,2 mg/kg IV lenta, seguida imediatamente por infusão contínua de 0,10 a 0,12 mg/kg/h. Diluição didática padronizada: adicionar 60 mg de metadona HCl (6 mL da solução 10 mg/mL) em 500 mL de solução salina 0,9% ou Ringer com Lactato (concentração final de 0,12 mg/mL); quando infundido a 1 mL/kg/h em bomba volumétrica, entrega exatamente 0,12 mg/kg/h. Monitorar frequência cardíaca, sedação e ocorrência de regurgitação.',
        calculatorEnabled: true,
        evidenceLevel: 'Estudos Farmacocinéticos e Clínicos Controlados (Nível 2a)',
        referenceIds: ['plumbs-10ed', 'amon-2021-cri', 'lumb-jones-6ed'],
      },
      {
        id: 'dose-metadona-gato-analgesia-aguda',
        species: 'cat',
        indication:
          'Analgesia perioperatória para dor aguda moderada a grave em gatos (OHE, tecidos moles, trauma e odontologia)',
        doseMin: 0.1,
        doseMax: 0.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intramuscular (IM) ou Intravenosa lenta (IV)',
        frequency: 'A cada 3 a 6 horas conforme escore de dor (Feline Grimace Scale ou Glasgow CMPS-F)',
        duration: '1 a 3 dias na fase aguda hospitalar',
        notes:
          'Dose de referência habitual mais equilibrada: 0,2 a 0,3 mg/kg IV lenta ou IM. No protocolo QUAD para OHE felina, a dose estudada é de 5 mg/m2 IM (área de superfície corporal). Promove analgesia mais consistente e menor necessidade de resgate pós-operatório que buprenorfina em cirurgias dolorosas (Shah et al., 2019). Monitorar midríase e frequência cardíaca.',
        calculatorEnabled: true,
        evidenceLevel: 'Ensaios Clínicos Randomizados Cegos em Felinos (Nível 1b)',
        referenceIds: ['bsava-10ed', 'shah-2019-quad', 'plumbs-10ed'],
      },
      {
        id: 'dose-metadona-gato-otm',
        species: 'cat',
        indication:
          'Analgesia ambulatorial e hospitalar felina pela via oral transmucosa (OTM)',
        doseMin: 0.4,
        doseMax: 0.6,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral Transmucosa (OTM / bucal)',
        frequency: 'A cada 4 a 6 horas',
        duration: '1 a 3 dias conforme evolução clínica',
        notes:
          'A via OTM em gatos apresenta biodisponibilidade sistêmica de aproximadamente 44%, com pico plasmático em cerca de 2 horas e efeito antinociceptivo sustentado por 4 horas ou mais (Ferreira et al., 2011). Dose de referência: 0,6 mg/kg OTM (BSAVA e compêndios). Aplicar o pequeno volume diretamente no espaço gengivolabial ou bochecha do felino, evitando deglutição imediata. Usar seringas de precisão (1 mL). Pode ocorrer salivação por aversão ao sabor da solução injetável comercial.',
        calculatorEnabled: true,
        evidenceLevel: 'Estudos Farmacocinéticos e Farmacodinâmicos Crossover (Nível 2a)',
        referenceIds: ['bsava-10ed', 'ferreira-2011-otm', 'plumbs-10ed'],
      },
      {
        id: 'dose-metadona-epidural',
        species: 'both',
        indication:
          'Analgesia neuroaxial / epidural lombossacra em cães e gatos (cirurgias de membros pélvicos, períneo e abdômen caudal)',
        doseMin: 0.1,
        doseMax: 0.3,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Epidural lombossacra (L7-S1)',
        frequency: 'Dose única intraoperatória',
        duration: 'Proporciona 8 a 18 horas de analgesia pós-operatória',
        notes:
          'Em cães: 0,1 a 0,3 mg/kg epidural (isolada ou combinada a ropivacaína 1,65 mg/kg ou bupivacaína 0,5% 1 mg/kg). Em gatos: 0,2 a 0,3 mg/kg epidural (frequentemente associada a lidocaína 2% 4 mg/kg para cirurgias abdominais/pélvicas, com analgesia superior a 18 horas). Exige técnica asséptica estrita e formulações sem conservantes neurotóxicos.',
        calculatorEnabled: false,
        evidenceLevel: 'Estudos Clínicos e Compêndios Padrão-Ouro (Nível 2b)',
        referenceIds: ['bsava-10ed', 'plumbs-10ed', 'lumb-jones-6ed'],
      },
    ],
    presentations: [
      {
        id: 'pres-mytedom-injetavel',
        name: 'Mytedom® Solução Injetável 10 mg/mL (Cristália)',
        brand: 'Cristália Produtos Químicos Farmacêuticos',
        form: 'Solução Injetável',
        concentrationValue: 10,
        concentrationUnit: 'mg/mL',
        packInfo: 'Caixas com 10 ou 25 ampolas de vidro transparente de 1 mL (sem conservantes)',
        route: 'Intravenosa (IV lenta), Intramuscular (IM), Subcutânea (SC), Epidural e OTM Felina',
        channel: 'human_pharmacy',
        packageDescription: 'Ampola de 1 mL com 10 mg de cloridrato de metadona (10 mg/mL)',
        calculatedMlPerKgFormula: 'dose_mg_kg / 10',
      },
      {
        id: 'pres-comfortan-vet',
        name: 'Comfortan® / Synthadon® 10 mg/mL Solução Injetável (Veterinário Internacional)',
        brand: 'Dechra / Animalcare',
        form: 'Solução Injetável',
        concentrationValue: 10,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frascos-ampola multidose de 5 mL, 10 mL ou 20 mL com rolha perfurável',
        route: 'Intravenosa (IV lenta), Intramuscular (IM) e Subcutânea (SC)',
        channel: 'veterinary',
        packageDescription: 'Frasco de 10 mg/mL aprovado para uso veterinário exclusivo no Reino Unido e Europa',
        calculatedMlPerKgFormula: 'dose_mg_kg / 10',
      },
    ],
    pillars: [
      {
        title: 'Agonismo Mu-Opioide Pleno e Potente',
        icon: 'ShieldCheck',
        desc: 'Atua como agonista completo de receptores mu no SNC sem efeito teto de eficácia na analgesia clínica, fornecendo alívio analgésico robusto e previsível para dor somática e visceral de grau moderado a severo em cães e gatos.',
      },
      {
        title: 'Antagonismo NMDA e Modulação Monoaminérgica',
        icon: 'Brain',
        desc: 'Bloqueia de forma não competitiva os receptores pós-sinápticos de NMDA no corno dorsal medular e inibe a recaptação de noradrenalina, abortando a cascata de wind-up, sensibilização central e hiperalgesia secundária pós-traumática.',
      },
      {
        title: 'Efeito Poupador de Anestésicos e Perfil Hemodinâmico',
        icon: 'HeartPulse',
        desc: 'Reduz substancialmente a Concentração Alveolar Mínima (CAM) de isoflurano e sevoflurano (em 30% a 40%) e o consumo de indutores sem promover a hipotensão por desgranulação de histamina que caracteriza a morfina.',
      },
      {
        title: 'Mínima Emetogênese e Alta Titulabilidade',
        icon: 'Syringe',
        desc: 'Apresenta incidência expressivamente menor de vômito pré-operatório que a morfina ou hidromorfona, com duração clínica típica de 3 a 4 horas e reversão rápida e completa por naloxona em caso de superdosagem acidental.',
      },
    ],
    quickSummaryHighlights: [
      'Agonista mu pleno',
      'Antagonismo NMDA',
      'Inibição de recaptação de noradrenalina',
      'Dor moderada a intensa',
      'Sem liberação histamínica relevante',
      'Menor emetogênese que morfina',
      'Bradicardia vagal',
      'Duração de 3 a 4 horas',
      'CRI em cães',
      'Via OTM felina',
      'Reversão por naloxona',
      'Notificação de Receita A VET',
    ],
    quickIndications: [
      {
        condition: 'Dor Ortopédica e Traumatológica em Cães',
        species: 'dog',
        doseSummary: '0,2 a 0,5 mg/kg IV lenta ou IM',
        route: 'IV / IM',
        duration: 'q3-4h conforme avaliação álgica',
        clinicalContext: 'Pós-operatório imediato de fraturas, osteotomias e artroplastias',
      },
      {
        condition: 'Analgesia Perioperatória em Procedimentos de Tecidos Moles (Cães e Gatos)',
        species: 'both',
        doseSummary: '0,2 a 0,3 mg/kg IV lenta ou IM',
        route: 'IV / IM',
        duration: 'q4-6h conforme dor',
        clinicalContext: 'OHE, mastectomias, cistotomias e cirurgias gastrointestinais',
      },
      {
        condition: 'Infusão Contínua Intravenosa (CRI) para Dor Sustentada em Cães',
        species: 'dog',
        doseSummary: 'Ataque 0,1 a 0,2 mg/kg IV + 0,10 a 0,12 mg/kg/h',
        route: 'IV Contínua (Bomba)',
        duration: '12 a 72 horas hospitalares',
        clinicalContext: 'Politraumatismo, peritonite séptica, pancreatite grave e UTI',
      },
      {
        condition: 'Analgesia Ambulatorial e Hospitalar em Felinos por Via Transmucosa',
        species: 'cat',
        doseSummary: '0,4 a 0,6 mg/kg OTM',
        route: 'Oral Transmucosa (bucal)',
        duration: 'q4-6h conforme dor',
        clinicalContext: 'Manejo hospitalar e domiciliar minimizando estresse de injeções',
      },
    ],
    detailedIndications: [
      {
        id: 'ind-metadona-ortopedia-canina',
        indication: 'Analgesia Perioperatória para Cirurgia Ortopédica e Trauma Esquelético Grave em Cães',
        clinicalContext: 'Pré-operatório imediato, intraoperatório e pós-operatório agudo de fraturas, TPLO, artrodeses e amputações',
        species: 'dog',
        dose: '0,2 a 0,5 mg/kg (dose usual de 0,3 a 0,4 mg/kg na MPA e 0,2 a 0,3 mg/kg na manutenção pós-operatória)',
        route: 'Intramuscular (IM) ou Intravenosa lenta (IV ao longo de 2 a 3 minutos)',
        frequency: 'A cada 3 a 4 horas ou sob demanda titulada por escores de dor (Glasgow CMPS-SF)',
        duration: 'Geralmente 24 a 48 horas nas primeiras etapas de dor aguda severa',
        mechanismOfAction:
          'O estímulo nociceptivo ósseo e periosteal intenso deflagra bombardeamento maciço de impulsos pelas fibras A-delta e C sobre o corno dorsal da medula. A metadona atua no corno dorsal promovendo agonismo pleno de receptores mu pré-sinápticos (inibindo a liberação de glutamato e substância P) e pós-sinápticos (promovendo hiperpolarização celular por efluxo de K+). Simultaneamente, o bloqueio dos receptores NMDA impede a amplificação do sinal no corno dorsal, mitigando o fenômeno de wind-up e a sensibilização central desencadeados pelo dano esquelético e muscular.',
        clinicalRationale:
          'No ensaio clínico randomizado de Hunt et al. (2013), cães submetidos a cirurgias ortopédicas pré-medicados com metadona 0,5 mg/kg IM apresentaram escores globais de dor pós-operatória significativamente menores e menor incidência de necessidade de analgesia de resgate nas primeiras 8 horas quando comparados à buprenorfina (42% de resgate com metadona vs 79% com buprenorfina). Seu uso garante estabilidade anestésica e excelente recuperação funcional imediata.',
        monitoring: 'Monitorar frequência cardíaca (bradicardia sinusal vagal), frequência e padrão respiratório, saturação de oxigênio (SpO2) e aplicar a escala de dor curta de Glasgow (CMPS-SF) a cada 2 a 3 horas.',
        referenceIds: ['plumbs-10ed', 'hunt-2013-ortho', 'lumb-jones-6ed'],
        evidenceLevel: 'Ensaio Clínico Randomizado Cego (Nível 1b)',
      },
      {
        id: 'ind-metadona-felina-perioperatoria',
        indication: 'Analgesia Cirúrgica e Manejo de Dor Visceral Aguda em Felinos Domésticos',
        clinicalContext: 'Ovariohisterectomia, cistite idiopática aguda grave, pancreatite felina e cirurgias de tecidos moles',
        species: 'cat',
        dose: '0,2 a 0,3 mg/kg IV lenta ou IM; ou 0,4 a 0,6 mg/kg por via Oral Transmucosa (OTM)',
        route: 'Intravenosa (IV), Intramuscular (IM) ou Oral Transmucosa (OTM)',
        frequency: 'A cada 4 a 6 horas conforme escore clínico de dor',
        duration: '1 a 3 dias durante a fase de dor aguda ativa',
        mechanismOfAction:
          'A ativação dos receptores mu na substância cinzenta periaquedutal e no corno dorsal inibe as vias polissinápticas viscerais nociceptivas. Nos gatos, a via OTM apresenta excelente lipossolubilidade e absorção transepitelial pela mucosa oral (biodisponibilidade de cerca de 44%), evitando a degradação do fármaco pela circulação porta e garantindo concentrações séricas ativas que mantêm antinocicepção mecânica e térmica durante 4 horas.',
        clinicalRationale:
          'O estudo randomizado de Shah et al. (2019) com 120 gatas submetidas a OHE demonstrou que a metadona no protocolo anestésico reduziu expressivamente a dor nas primeiras 6 horas e cortou quase pela metade a taxa de resgate analgésico em relação à buprenorfina (18 de 60 gatas no grupo metadona vs 29 de 60 no grupo buprenorfina). Além disso, a via OTM é uma alternativa viável para manter a analgesia sem necessidade de injeções repetidas e estressantes na internação ou na alta imediata.',
        monitoring: 'Monitorar dilatação pupilar (midríase fisiológica felina), temperatura retal, ronronar/postura e escores de dor utilizando a Feline Grimace Scale (FGS) ou a escala de Glasgow felina (CMPS-F).',
        referenceIds: ['shah-2019-quad', 'ferreira-2011-otm', 'bsava-10ed'],
        evidenceLevel: 'Ensaios Clínicos Randomizados em Gatos (Nível 1b / 2a)',
      },
      {
        id: 'ind-metadona-cri-hospitalar',
        indication: 'Infusão Contínua Intravenosa (CRI) para Analgesia Sustentada em Pacientes Hospitalizados Críticos',
        clinicalContext: 'Pacientes em UTI com dor somática/visceral severa, politraumatismo, peritonite séptica ou pós-operatório ortopédico',
        species: 'dog',
        dose: 'Bolus de ataque: 0,1 a 0,2 mg/kg IV lenta; seguido de taxa de infusão de 0,10 a 0,12 mg/kg/hora em infusão contínua',
        route: 'Intravenosa contínua (CRI)',
        frequency: 'Infusão contínua ininterrupta regulada em bomba volumétrica ou seringa infusora',
        duration: '12 a 72 horas conforme estabilização clínica',
        mechanismOfAction:
          'A administração em bolus intermitentes de metadona resulta em oscilações cíclicas de concentração plasmática com picos associados a bradicardia e sedação excessiva, seguidos de vales nos quais a dor de escape pode surgir. A infusão contínua mantém a concentração sérica em platô estável acima do limiar antinociceptivo de 17 a 40 ng/mL, bloqueando continuamente a nocicepção e o wind-up medular.',
        clinicalRationale:
          'No estudo experimental de Amon et al. (2021), a infusão contínua de metadona a 0,1 mg/kg/h após bolus de 0,2 mg/kg manteve elevação sustentada dos limiares térmicos e mecânicos em cães por até 72 horas, com persistência do efeito analgésico residual por 2 horas após a interrupção. O protocolo proporciona analgesia homogênea sem oscilações álgicas bruscas em pacientes com dor cirúrgica ou traumática intratável.',
        monitoring: 'Vigilância contínua em bomba de infusão; monitorar frequência cardíaca a cada hora, temperatura corporal (prevenção de hipotermia com colchões térmicos), apetite e sinais de regurgitação/refluxo.',
        referenceIds: ['plumbs-10ed', 'amon-2021-cri', 'lumb-jones-6ed'],
        evidenceLevel: 'Estudo Farmacocinético e Farmacodinâmico Controlado (Nível 2a)',
      },
    ],
    pharmacokineticsData: {
      absorption:
        'A metadona apresenta absorção dependente de forma crítica da via de administração e da espécie animal. Por via oral convencional deglutida, a molécula sofre extenso metabolismo de primeira passagem no epitélio intestinal e nos hepatócitos de cães e gatos, resultando em biodisponibilidade sistêmica insignificante e imprevisível; por essa razão, a via oral com comprimidos é amplamente desaconselhada para analgesia aguda na rotina veterinária. Por via intramuscular (IM), a absorção é rápida e altamente previsível, com biodisponibilidade de cerca de 90% no cão e pico plasmático (Tmax) ocorrendo entre 5 e 15 minutos (cerca de 20 minutos no gato). Por via subcutânea (SC), a biodisponibilidade é de aproximadamente 80%, mas o pico plasmático é mais tardio (cerca de 1 hora) e com maior dispersão individual. Diferencial felino marcante: nos gatos, a administração pela via oral transmucosa (OTM / bucal) apresenta biodisponibilidade de aproximadamente 44%, com absorção direta pelo epitélio oral sem passar de imediato pela veia porta hepática, atingindo concentrações plasmáticas máximas em cerca de 2 horas (81,2 ng/mL) e conferindo antinocicepção mecânica e térmica prolongada de cerca de 4 horas.',
      distribution:
        'A metadona possui elevada lipossolubilidade (coeficiente de partição octanol/água logP aproximado de 3,9) e caráter de base fraca (pKa em torno de 9,2). Apresenta um volume de distribuição no estado de equilíbrio (Vdss) muito elevado no cão, tipicamente entre 5 e 6 L/kg (podendo atingir cerca de 10 L/kg em infusões contínuas prolongadas), o que reflete intensa penetração tecidual e acúmulo extravascular. A taxa de ligação a proteínas plasmáticas varia de 60% a 90% em cães, ligando-se preferencialmente à alfa-1-glicoproteína ácida e à albumina. Sua pronunciada lipofilia garante transposição rápida da barreira hematoencefálica com distribuição imediata aos sítios receptores do sistema nervoso central (substância cinzenta periaquedutal, tálamo e corno dorsal medular); no entanto, não há percentual clínico padronizado de penetração líquor/plasma formalmente validado para cães e gatos na literatura.',
      metabolism:
        'A biotransformação da metadona é quase exclusivamente hepática, processando-se através de vias oxidativas de N-desmetilação seguidas de ciclização espontânea para gerar os metabólitos inativos primários 2-etilideno-1,5-dimetil-3,3-difenilpirrolidina (EDDP) e 2-etil-5-metil-3,3-difenilpirrolina (EMDP). Em cães, estudos farmacocinéticos demonstram participação preponderante de isoformas do citocromo P450, em especial a enzima canina CYP2B11 e isoenzimas da subfamília CYP3A. A coadministração de inibidores potentes do CYP2B11 (como fluconazol e cloranfenicol) bloqueia a depuração hepática da metadona em cães, aumentando expressivamente a área sob a curva (AUC) e prolongando a duração da analgesia e dos efeitos sedativos. Em gatos, o metabolismo oxidativo é plenamente funcional; a deficiência felina fisiológica de glucuronidação (UGT1A6) não compromete o clearance da metadona de forma clinicamente restritiva, uma vez que a via principal de depuração é a desmetilação oxidativa microssomal.',
      elimination:
        'Em cães, a meia-vida de eliminação terminal (t1/2) após administração intravenosa é de aproximadamente 1,75 a 4 horas, com depuração corporal total (clearance) elevada, oscilando entre 25 e 50 mL/kg/min. Após injeção intramuscular no cão, a meia-vida é de cerca de 1 a 2 horas. Quando administrada por via subcutânea, a meia-vida aparente de eliminação pode atingir até 11 horas, reflexo de uma absorção tecidual lenta e contínua a partir do depósito subcutâneo. Em gatos sadios submetidos a 0,6 mg/kg IM, a depuração sistêmica média é de cerca de 9,1 mL/kg/min, garantindo janela analgésica de 3 a 4 horas. A excreção dos metabólitos ocorre de modo misto: cerca de 70% é excretada por via biliar e fecal, e cerca de 30% por via renal na forma de metabólitos inativos conjugados.',
      cnsPenetration:
        'Extensa e imediata no sistema nervoso central devido ao logP elevado (~3,9); percentual quantitativo de concentração no líquido cefalorraquidiano (LCR) versus plasma não estabelecido especificamente para cães e gatos.',
      plasmaBinding:
        '60% a 90% em cães (ligação predominante à alfa-1-glicoproteína ácida e albumina sérica).',
      halfLife:
        'Cães: 1,75 a 4 horas (IV); 1 a 2 horas (IM); até 11 horas de meia-vida aparente de absorção (SC). Gatos: cerca de 2 a 4 horas dependendo da via.',
    },
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Intravenosa (IV lenta)',
          technique:
            'Administrar exclusivamente através de cateter venoso pérvio de forma lenta ao longo de 2 a 3 minutos, podendo ser diluída em solução salina 0,9% para titulação precisa.',
          nursingCare:
            'Monitorar rigorosamente a frequência cardíaca (ausculta ou ECG contínuo), saturação periférica de oxigênio (SpO2) e frequência respiratória imediatamente após a injeção. Ter atropina disponível caso ocorra bradicardia acentuada com repercussão hemodinâmica.',
          limitations:
            'A injeção em bolus rápido eleva o risco de picos de depressão respiratória transitória e bradicardia sinusal aguda acentuada.',
        },
        {
          route: 'Intramuscular (IM)',
          technique:
            'Injetar profundamente em grandes massas musculares (musculatura epaxial lombar ou quadríceps femoral), alternando os sítios anatômicos em aplicações repetidas.',
          nursingCare:
            'Observar o paciente nos primeiros 10 a 15 minutos pós-injeção para verificar o início suave da sedação e analgesia. Desconforto local transitório à picada pode ocorrer.',
          limitations:
            'Volume máximo recomendado por sítio muscular no cão: 2 a 3 mL; no gato: 0,5 a 1 mL.',
        },
        {
          route: 'Oral Transmucosa Felina (OTM)',
          technique:
            'Utilizar seringa de pequeno volume (1 mL) para depositar a solução líquida comercial diretamente no espaço entre a gengiva e a bochecha (mucosa jugal) ou sob a língua do felino, sem forçar a cabeça para trás.',
          nursingCare:
            'Orientar o tutor a não misturar o medicamento no alimento e não forçar o animal a engolir o líquido, pois o objetivo é o contato transepitelial direto com a mucosa oral.',
          limitations:
            'Formulações injetáveis comerciais com conservantes ou pH ácido podem causar sialorreia e aversão gustativa temporária no gato.',
        },
        {
          route: 'Infusão Contínua Intravenosa (CRI)',
          technique:
            'Administrar através de bomba de infusão volumétrica ou seringa de infusão contínua dedicada em via venosa exclusiva, após o fornecimento do bolus de ataque intravenoso.',
          nursingCare:
            'Checar a permeabilidade do acesso venoso e a taxa horária de infusão a cada 1 ou 2 horas. Avaliar a temperatura retal do paciente e manter suporte térmico ativo para prevenir hipotermia.',
          limitations:
            'Exige vigilância profissional ininterrupta em regime de internação hospitalar; desaconselhada em ambientes sem monitoramento contínuo.',
        },
        {
          route: 'Epidural Lombossacra (L7-S1)',
          technique:
            'Procedimento realizado sob anestesia geral e rigorosa assepsia cirúrgica no espaço lombossacro (L7-S1) utilizando agulha de Tuohy ou hipodérmica espinhal com teste da gota pendente ou perda de resistência.',
          nursingCare:
            'Utilizar exclusivamente apresentações de metadona sem conservantes e diluídas em cloreto de sódio 0,9% estéril. Avaliar a recuperação motora dos membros pélvicos e a micção espontânea pós-operatória.',
          limitations:
            'Exige treinamento técnico anestesiológico avançado; contraindicada em infecções cutâneas locais, coagulopatias e fraturas pélvicas/sacrais instáveis.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Cloreto de Sódio 0,9% (Solução Fisiológica)',
          'Ringer Simples e Ringer com Lactato',
          'Glicose 5% (Dextrose em Água)',
        ],
        incompatibleFluids: [
          'Anfotericina B convencional',
          'Meloxicam injetável',
          'Tiopental sódico',
          'Pentobarbital sódico',
          'Sulfametoxazol + Trimetoprima',
          'Piperacilina + Tazobactam',
          'Alopurinol injetável',
        ],
        infusionRateGuidance:
          'Protocolo de diluição didática clássico do Plumb: adicionar 60 mg de metadona HCl (6 mL da apresentação 10 mg/mL) em 500 mL de solução fisiológica 0,9% ou Ringer com Lactato, resultando em uma concentração final de 0,12 mg/mL. Quando infundida na taxa padrão de 1 mL/kg/hora em bomba de infusão, essa solução entrega rigorosamente a taxa analgésica de 0,12 mg/kg/hora. Ajustes finos de taxa podem ser realizados entre 0,08 e 0,15 mg/kg/h conforme resposta álgica individual.',
        preparationNotes:
          'A solução diluída para CRI mantém estabilidade físico-química por 24 horas em temperatura ambiente (20 a 25 °C) sob proteção da luz solar direta. Identificar o frasco de infusão com etiqueta vermelha destacando Medicamento Sujeito a Controle Especial - Metadona, data, hora, volume adicionado e identificação do paciente.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Cinética e Sensibilidade em Cães: Particularidade da Raça Greyhound e Tônus Vagal',
          description:
            'Nos cães, a metadona fornece analgesia previsível e potente pelas vias parenteral e de infusão contínua, mas é praticamente inútil por via oral comum deglutida devido à primeira passagem hepática massiva. Uma peculiaridade marcante da espécie canina reside na raça Greyhound: estudos demonstraram que Greyhounds apresentam uma depuração hepática expressivamente mais rápida da metadona do que Beagles, exigindo doses de 1,5 a 2 vezes maiores (1,0 a 1,5 mg/kg q3-4h) para manter níveis plasmáticos terapêuticos de 40 ng/mL. Além disso, a depressão da frequência cardíaca por estimulação vagal central é mais evidente no cão do que com morfina, exigindo monitoramento hemodinâmico atento.',
          clinicalImplications:
            'Não prescrever comprimidos orais de rotina para analgesia de cães. Na raça Greyhound, reavaliar precocemente a dor e considerar ajuste posológico superior se houver escape álgico precoce. Ter anticolinérgicos disponíveis para bradicardias sintomáticas.',
        },
        {
          species: 'cat',
          title: 'Eficiência da Via OTM, Midríase Prolongada e Resposta Comportamental Felina',
          description:
            'Ao contrário dos cães, os gatos conseguem absorver a metadona pela mucosa oral (via OTM) com biodisponibilidade de cerca de 44%, atingindo concentrações terapêuticas que mantêm antinocicepção mecânica e térmica durante 4 horas. Os gatos frequentemente manifestam midríase pupilar bilateral pronunciada após o uso de metadona, a qual tende a persistir por várias horas além da duração clínica da analgesia (não devendo ser usada como parâmetro isolado de que o animal ainda está anestesiado). Comportamento eufórico leve (ronronar compulsivo, fricção corporal e carinho) é comum; excitação marcante com disforia é incomum nas doses usuais recomendadas.',
          clinicalImplications:
            'A via OTM é uma ferramenta valiosa no manejo da dor felina ambulatorial ou hospitalar sem estresse. Orientar os tutores e a equipe de enfermagem que a dilatação das pupilas é um efeito colateral benigno e esperado nos gatos.',
        },
      ],
      prescriptionType: {
        category: 'Medicamento Controlado - Lista A1 (Entorpecentes)',
        ordinanceOrLaw: 'Portaria MAPA nº 837/2025 e Portaria SVS/MS nº 344/1998 (Notificação de Receita A VET)',
        retentionRequired: true,
        guidelines:
          'No Brasil, a metadona é classificada como substância entorpecente da Lista A1. Para aquisição e prescrição no âmbito veterinário de produtos registrados no MAPA, deve ser emitida Notificação de Receita Veterinária oficial em 2 vias brancas (ou 3 vias no caso de preparações magistrais manipuladas). Quando for utilizado produto comercial da linha humana (como o Mytedom® Cristália), a prescrição veterinária deve seguir o modelo oficial Notificação de Receita A VET (modelo versão 2 obrigatório para impressões desde maio de 2026), com notificação amarela retida pela farmácia dispensadora. A receita tem validade máxima de 30 dias contados a partir da emissão e o quantitativo é restrito a até 5 ampolas ou tratamento de até 30 dias.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Fenilheptilamina / Difenilheptanona sintética (mistura racêmica)',
        chemicalClassDescription:
          'Derivado sintético difenilheptano com anéis aromáticos, amina terciária dimetilada e grupo funcional cetona, conferindo caráter lipofílico (logP 3,9) e pKa de 9,2.',
        therapeuticClass: 'Analgésico opioide pleno potente e modulador de sensibilização central',
        therapeuticClassDescription:
          'Agonista completo de receptores mu-opioides acoplado à proteína Gi/o, bloqueador de receptores glutamatérgicos NMDA e inibidor da recaptação de noradrenalina.',
        detailedTargets: [
          {
            target: 'Receptores Mu-Opioides (MOR / OPRM1) Pré-Sinápticos',
            action: 'Agonismo pleno nanomolar acoplado a proteína Gi/o com fechamento de canais de Ca2+ voltagem-dependentes (N e P/Q)',
            clinicalSignificance:
              'Inibição potente da liberação de glutamato, substância P e CGRP no corno dorsal medular, bloqueando a transmissão aferente primária da dor.',
          },
          {
            target: 'Receptores Mu-Opioides (MOR / OPRM1) Pós-Sinápticos',
            action: 'Abertura de canais retificadores internos de potássio (GIRK) acoplados à proteína G',
            clinicalSignificance:
              'Extravasamento de K+ e hiperpolarização da membrana pós-sináptica, impedindo a geração de potenciais de ação ascendentes na via espinotalâmica.',
          },
          {
            target: 'Receptores NMDA (N-metil-D-aspartato)',
            action: 'Antagonismo não competitivo do canal iônico glutamatérgico compartilhado por ambos os enantiômeros R(-) e S(+)',
            clinicalSignificance:
              'Prevenção do influxo excessivo de cálcio associado ao fenômeno de wind-up, hiperalgesia secundária e sensibilização central medular.',
          },
          {
            target: 'Transportador de Noradrenalina (NET / SLC6A2)',
            action: 'Inibição da recaptação neuronal de noradrenalina nas sinapses centrais',
            clinicalSignificance:
              'Potencialização das vias descendentes inibitórias da dor mediadas por receptores alfa-2 adrenérgicos no corno dorsal da medula.',
          },
          {
            target: 'Centro Vagal Central (Núcleo Motor Dorsal do Vago)',
            action: 'Estimulação central do tônus colinérgico vagal',
            clinicalSignificance:
              'Desencadeia bradicardia sinusal dose-dependente mais proeminente que com morfina, exigindo vigilância hemodinâmica.',
          },
          {
            target: 'Centro Respiratório Bulbar',
            action: 'Redução da sensibilidade dos quimiorreceptores centrais ao dióxido de carbono (CO2)',
            clinicalSignificance:
              'Induz hipoventilação alveolar e bradipneia em doses elevadas ou quando combinada com anestésicos gerais inalatórios.',
          },
        ],
      },
    },
    attentionData: {
      attentionSubtitle:
        'Monitoramento contínuo de frequência cardíaca, ventilação e sedação; contraindicação absoluta de associação com IMAOs e vigilância rigorosa com serotoninérgicos.',
      precautions: [
        {
          condition: 'Depressão Respiratória Grave ou Hipoventilação Não Assistida',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A metadona diminui a responsividade dos quimiorreceptores bulbares ao acúmulo de CO2 arterial, agravando a hipercapnia e a hipoxemia em pacientes que já apresentam insuficiência ventilatória descompensada sem intubação.',
          clinicalAction:
            'Contraindicada em pacientes com falência respiratória sem ventilação mecânica assistida. Em animais anestesiados, fornecer ventilação com pressão positiva intermitente (IPPV) e manter suporte de oxigênio a 100%.',
        },
        {
          condition: 'Bradicardia Sinusal Severa ou Bloqueios Atrioventriculares Avançados',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A metadona induz estimulação vagal central significativa, provocando quedas de 32% a 46% na frequência cardíaca, o que pode comprometer criticamente o débito cardíaco e a pressão de perfusão em cardiopatas vulneráveis.',
          clinicalAction:
            'Realizar monitoramento eletrocardiográfico contínuo. Tratar quedas expressivas de frequência cardíaca com anticolinérgicos (atropina 0,02 a 0,04 mg/kg IV/IM ou glicopirrolato 0,01 mg/kg IV/IM) quando houver repercussão sobre a pressão arterial.',
        },
        {
          condition: 'Traumatismo Cranioencefálico (TCE) com Hipertensão Intracraniana',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A hipoventilação induz retenção de CO2 (hipercapnia arterial), que desencadeia vasodilatação arteriolar cerebral reflexa maciça, expansão do volume sanguíneo intracraniano e elevação crítica e fatal da PIC.',
          clinicalAction:
            'Evitar como agente isolado em TCE grave. Se a analgesia potente for indispensável, garantir via aérea protegida com tubo orotraqueal e ventilar mecanicamente mantendo a EtCO2 rigorosamente entre 35 e 40 mmHg.',
        },
        {
          condition: 'Administração Concomitante com Inibidores da MAO (Selegilina, Amitraz)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A metadona inibe a recaptação de serotonina e noradrenalina. A associação com IMAOs impede a degradação dessas aminas, desencadeando acúmulo sináptico fulminante e síndrome serotoninérgica hiperpirética.',
          clinicalAction:
            'Contraindicação estrita. Respeitar período de intervalo (washout) de pelo menos 14 dias após a descontinuação de selegilina ou exposição ao amitraz antes de administrar metadona.',
        },
        {
          condition: 'Uso Pré-Operatório em Cesarianas antes do Parto / Clampeamento',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A metadona atravessa prontamente a barreira placentária por difusão facilitada pela lipossolubilidade, provocando grave depressão respiratória e bradicardia nos recém-nascidos.',
          clinicalAction:
            'Postergar a administração da metadona até a extração completa e o clampeamento dos cordões umbilicais de todos os fetos. Se aplicada inadvertidamente antes, preparar naloxona diluída sublingual para os neonatos.',
        },
        {
          condition: 'Insuficiência Hepática Descompensada',
          alertLevel: 'caution',
          physiologicalExplanation:
            'A metadona depende de biotransformação oxidativa hepática extensiva. Pacientes com insuficiência hepatocelular grave apresentam depuração diminuída, prolongamento da meia-vida e acúmulo plasmático.',
          clinicalAction:
            'Utilizar a extremidade inferior da faixa posológica (0,1 a 0,2 mg/kg) e estender o intervalo entre administrações (q6-8h), titulando as doses estritamente por escalas validadas de dor.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Bradicardia Sinusal de Origem Vagal',
          frequency: 'common',
          mechanism:
            'Estimulação farmacológica direta dos núcleos vagais no tronco encefálico, aumentando o efluxo parassimpático colinérgico sobre o nó sinusal cardíaco.',
          clinicalManagement:
            'Monitorar ausculta cardíaca e traçado de ECG. Se a frequência cardíaca cair abaixo de limites críticos para a espécie/porte acompanhada de hipotensão (PAM menor que 60 mmHg), administrar atropina (0,02 a 0,04 mg/kg IV/IM).',
        },
        {
          effect: 'Depressão Respiratória e Hipoventilação Alveolar',
          frequency: 'common',
          mechanism:
            'Agonismo mu nos quimiorreceptores do centro respiratório bulbar, deslocando a curva de sensibilidade ao dióxido de carbono para a direita.',
          clinicalManagement:
            'Monitorar SpO2 e capnografia (EtCO2). Em procedimentos cirúrgicos sob anestesia geral, instituir ventilação com pressão positiva intermitente (IPPV). Em casos graves fora da anestesia, administrar oxigênio e titular naloxona.',
        },
        {
          effect: 'Sedação Profunda e Hipotermia',
          frequency: 'common',
          mechanism:
            'Depressão da neurotransmissão nas vias tálamo-corticais e alteração no ponto de ajuste do centro termorregulador hipotalâmico, com vasodilatação periférica e menor tônus muscular.',
          clinicalManagement:
            'Manter o paciente em ambiente aquecido com colchões térmicos de circulação de água morna ou mantas forçadas de ar aquecido. Evitar bolsas de água quente direta pelo risco de queimaduras térmicas.',
        },
        {
          effect: 'Panting / Taquipneia Superficial em Cães',
          frequency: 'uncommon',
          mechanism:
            'Alteração opioide transitória no ponto de ajuste de termorregulação central hipotalâmica sem aumento real da temperatura corporal central.',
          clinicalManagement:
            'Diferenciar panting opioide benigno de dor ou hipóxia por meio de oximetria de pulso e avaliação de escores de dor. Manter o animal em temperatura ambiente confortável; o efeito cessa espontaneamente.',
        },
        {
          effect: 'Midríase Pupilar Persistente em Gatos',
          frequency: 'common',
          mechanism:
            'Efeito autonômico central característico dos opioides agonistas plenos na espécie felina, com alteração no tônus do núcleo de Edinger-Westphal e predominância simpática pupilar.',
          clinicalManagement:
            'Efeito colateral autolimitado e benigno. Proteger os olhos da luz intensa direta mantendo o gatil em iluminação suave indireta até a regressão total.',
        },
        {
          effect: 'Constipação e Redução da Motilidade Gastrointestinal',
          frequency: 'common',
          mechanism:
            'Agonismo mu nos neurônios dos plexos mioentéricos de Auerbach e Meissner, diminuindo o peristaltismo propulsivo e aumentando o tônus dos esfíncteres digestivos.',
          clinicalManagement:
            'Em terapias hospitalares prolongadas ou CRI superior a 48 horas, monitorar ausculta de ruídos hidroaéreos e consistência das fezes. Fornecer hidratação intravenosa adequada e procinéticos se clinicamente justificado.',
        },
        {
          effect: 'Disforia e Vocalização na Recuperação Anestésica',
          frequency: 'uncommon',
          mechanism:
            'Perturbação na modulação dopaminérgica e monoaminérgica das vias límbicas decorrente do efeito central opioide.',
          clinicalManagement:
            'Diferenciar disforia de dor cirúrgica. Em animais disfóricos (que não respondem ao estímulo e apresentam vocalização e agitação psicomotora desprovida de foco), microdoses de dexmedetomidina (0,5 a 1,0 mcg/kg IV) ou midazolam promovem alívio rápido.',
        },
        {
          effect: 'Apneia e Colapso por Superdosagem Acidental',
          frequency: 'overdose',
          mechanism:
            'Supressão quase total do comando autonômico respiratório central bulbar associada a hipotonia muscular e hipotensão extrema.',
          clinicalManagement:
            'Intubação orotraqueal imediata e ventilação mecânica com oxigênio a 100%. Administrar naloxona (0,015 a 0,04 mg/kg IV lenta ou IM), repetindo em pequenos incrementos a cada 15 a 30 minutos até o restabelecimento da ventilação espontânea.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Hepática Compensada a Moderada',
          recommendedAdjustment: 'Reduzir a dose inicial para 0,1 a 0,2 mg/kg e estender os intervalos para q6-8h, titulando estritamente por escalas de dor.',
          physiologicalRationale:
            'A depuração hepática da metadona está reduzida devido à menor atividade microssomal do citocromo P450, aumentando o risco de acúmulo plasmático e sedação prolongada.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica Avançada (DRC estágios 3 e 4 IRIS)',
          recommendedAdjustment: 'Utilizar doses conservadoras de 0,1 a 0,2 mg/kg IV/IM; redosar com base na resposta clínica álgica individual.',
          physiologicalRationale:
            'Embora a eliminação renal do fármaco inalterado seja secundária, pacientes urêmicos apresentam menor ligação proteica por hipoalbuminemia, desequilíbrio acidobásico e maior sensibilidade do SNC aos opioides.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos ou Severamente Debilitados',
          recommendedAdjustment: 'Iniciar na faixa inferior de 0,1 a 0,15 mg/kg IV/IM lenta; monitorar ventilação e temperatura corporal.',
          physiologicalRationale:
            'Animais idosos apresentam menor reserva cardiovascular, menor taxa de filtração glomerular e menor massa hepática funcional, com resposta sedativa e hipotensora acentuada.',
        },
        {
          clinicalCondition: 'Cães da Raça Greyhound e Assemelhados',
          recommendedAdjustment: 'Doses 1,5 a 2 vezes superiores (1,0 a 1,5 mg/kg a cada 3 a 4 horas) podem ser necessárias para alcançar concentrações antinociceptivas eficazes.',
          physiologicalRationale:
            'Estudos farmacocinéticos comprovaram depuração hepática expressivamente acelerada da metadona nessa raça em comparação com Beagles, resultando em menor área sob a curva e menor duração analgésica se utilizada a dose convencional.',
        },
        {
          clinicalCondition: 'Coadministração com Inibidores de CYP2B11 (Fluconazol, Cloranfenicol)',
          recommendedAdjustment: 'Reduzir a dose de metadona em 30% a 50% ou estender os intervalos entre doses para q8-12h.',
          physiologicalRationale:
            'O bloqueio enzimático de CYP2B11 inibe a principal via de depuração oxidativa da metadona no cão, triplicando a exposição plasmática e prolongando a analgesia por até 12 a 24 horas.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Inibidores da Monoamina Oxidase (Selegilina, Amitraz, Linezolida)',
          severity: 'contraindicated',
          clinicalEffect: 'Risco crítico de Síndrome Serotoninérgica grave, colapso autonômico, hipertermia maligna e convulsões fatais.',
          pharmacologicalMechanism:
            'A metadona inibe a recaptação de noradrenalina e serotonina; o bloqueio concomitante da sua degradação enzimática pela MAO provoca acúmulo descontrolado de serotonina sináptica no SNC.',
        },
        {
          drugOrClass: 'Tramadol (Cloridrato de Tramadol)',
          severity: 'major',
          clinicalEffect: 'Aumento expressivo do risco de neurotoxicidade serotoninérgica sem ganho analgésico justificado.',
          pharmacologicalMechanism:
            'Ambos compartilham potente inibição da recaptação de serotonina e noradrenalina. Como a metadona já fornece agonismo mu pleno muito superior, a adição de tramadol apenas eleva o risco serotoninérgico sem benefício analgésico.',
        },
        {
          drugOrClass: 'Inibidores Seletivos de Recaptação de Serotonina (Fluoxetina, Sertralina) e Trazodona',
          severity: 'major',
          clinicalEffect: 'Potenciação do tônus serotoninérgico com risco de tremores, disforia e síndrome serotoninérgica; aumento dos níveis plasmáticos de metadona.',
          pharmacologicalMechanism:
            'Efeito sinérgico sobre os receptores serotoninérgicos centrais. Adicionalmente, a fluoxetina inibe enzimas do citocromo P450 canino, aumentando a biodisponibilidade e a AUC da metadona.',
        },
        {
          drugOrClass: 'Anestésicos Gerais Inalatórios (Isoflurano, Sevoflurano) e Indutores (Propofol, Alfaxalona)',
          severity: 'major',
          clinicalEffect: 'Marcante efeito poupador de anestésico (redução de CAM em 30% a 40%); risco de apneia profunda e hipotensão se as doses não forem reduzidas.',
          pharmacologicalMechanism:
            'Sinergismo analgésico e depressor central sobre os neurônios corticais e subcorticais. Exige redução proativa da taxa do vaporizador e da dose indutora.',
        },
        {
          drugOrClass: 'Agonistas Alfa-2 Adrenérgicos (Dexmedetomidina, Medetomidina)',
          severity: 'major',
          clinicalEffect: 'Sedação cirúrgica profunda e potente analgesia, acompanhadas de risco de bradicardia acentuada e hipoxemia em respiração com ar ambiente.',
          pharmacologicalMechanism:
            'Ação aditiva nos cornos dorsais da medula e tronco encefálico. A vasoconstrição periférica da alfa-2 somada à estimulação vagal da metadona exige suplementação de oxigênio e monitoramento de débito.',
        },
        {
          drugOrClass: 'Agonistas Parciais e Agonistas-Antagonistas Opioides (Buprenorfina, Butorfanol)',
          severity: 'moderate',
          clinicalEffect: 'Atenuação ou reversão parcial da analgesia mu plena fornecida pela metadona.',
          pharmacologicalMechanism:
            'Devido à afinidade extremamente alta da buprenorfina ou ao antagonismo mu do butorfanol, esses fármacos podem deslocar competitivamente a metadona dos receptores MOR, limitando a eficácia máxima.',
        },
        {
          drugOrClass: 'Fármacos Antifúngicos Azóis (Fluconazol, Cetoconazol) e Cloranfenicol',
          severity: 'moderate',
          clinicalEffect: 'Aumento significativo das concentrações plasmáticas e prolongamento da duração analgésica e sedativa da metadona no cão.',
          pharmacologicalMechanism:
            'Inibição potente da isoforma microssomal hepática canina CYP2B11, diminuindo o clearance corporal total da metadona e elevando a AUC.',
        },
        {
          drugOrClass: 'Antiarrítmicos de Classes I e III (Amiodarona, Quinidina, Sotalol)',
          severity: 'moderate',
          clinicalEffect: 'Risco potencial de prolongamento do intervalo QT e precipitação de arritmias ventriculares.',
          pharmacologicalMechanism:
            'Embora a metadona cause pouco prolongamento de QT em cães sadios, em pacientes predispostos ou sob antiarrítmicos que bloqueiam canais de potássio IKr, o risco arritmogênico cumulativo é aumentado.',
        },
      ],
    },
    clinicalStudiesCommented: [
      {
        title: 'Comparison of premedication with buprenorphine or methadone with meloxicam for postoperative analgesia in dogs undergoing orthopaedic surgery',
        authorsYear: 'Hunt JR, Attenburrow PM, Slingsby LS, Murrell JC (2013)',
        journal: 'Journal of Small Animal Practice, 54(8):418-424',
        studyDesign: 'Ensaio clínico randomizado, cego, controlado com 38 cães submetidos a cirurgias ortopédicas de grande porte',
        sampleSize: '38 cães de clientes submetidos a procedimentos ortopédicos',
        mainFindings:
          'Os cães foram pré-medicados com acepromazina (0,03 mg/kg IM) associada a buprenorfina (20 mcg/kg IM) ou metadona (0,5 mg/kg IM), recebendo meloxicam (0,2 mg/kg) na indução. O grupo tratado com metadona apresentou escores globais de dor significativamente mais baixos na escala de Glasgow nas primeiras 8 horas de pós-operatório. A necessidade de analgesia de resgate foi de 42% no grupo metadona contra 79% no grupo buprenorfina (P = 0,04).',
        clinicalTakeaway:
          'Demonstra categoricamente que para procedimentos com dor óssea e ortopédica aguda severa, um agonista mu pleno como a metadona proporciona analgesia pós-operatória precoce superior à buprenorfina, reduzindo substancialmente a taxa de resgates.',
        referenceId: 'hunt-2013-ortho',
      },
      {
        title: 'Plasma concentrations and behavioral, antinociceptive, and physiologic effects of methadone after intravenous and oral transmucosal administration in cats',
        authorsYear: 'Ferreira TH, Rezende ML, Mama KR, Hudachek SF, Aguiar AJA (2011)',
        journal: 'American Journal of Veterinary Research, 72(6):764-771',
        studyDesign: 'Estudo experimental randomizado, controlado, crossover com 8 gatos adultos saudáveis',
        sampleSize: '8 gatos adultos hígidos',
        mainFindings:
          'Comparou-se a administração de metadona a 0,3 mg/kg IV versus 0,6 mg/kg pela via oral transmucosa (OTM). A via OTM apresentou biodisponibilidade sistêmica média de 44%, com pico de concentração plasmática em 2 horas (81,2 ng/mL) versus 10 minutos na via IV (112,9 ng/mL). A via OTM manteve elevação significativa dos limiares térmicos nociceptivos durante pelo menos 4 horas (enquanto a via IV durou cerca de 2 horas). Ambos os tratamentos induziram midríase que persistiu além da antinocicepção.',
        clinicalTakeaway:
          'Comprova a legitimidade farmacocinética e clínica da via oral transmucosa (OTM) em gatos na dose de 0,6 mg/kg, constituindo uma excelente alternativa para analgesia hospitalar e ambulatorial sustentada sem injeções.',
        referenceId: 'ferreira-2011-otm',
      },
      {
        title: 'Plasma levels of a methadone constant rate infusion and their corresponding effects on thermal and mechanical nociceptive thresholds in dogs',
        authorsYear: 'Amon T, Kästner SBR, Kietzmann M, Tünsmeyer J (2021)',
        journal: 'BMC Veterinary Research, 17(1):35',
        studyDesign: 'Estudo experimental randomizado, cego, placebo-controlado, crossover com infusão contínua por 72 horas',
        sampleSize: '7 cães Beagles hígidos',
        mainFindings:
          'Os cães receberam bolus intravenoso de metadona a 0,2 mg/kg seguido de infusão contínua (CRI) a 0,1 mg/kg/h durante 72 horas consecutivas. A CRI atingiu concentrações plasmáticas médias em estado de equilíbrio entre 17 e 40 ng/mL, as quais sustentaram elevação consistente dos limiares nociceptivos mecânicos e térmicos ao longo de todos os 3 dias. O efeito residual persistiu por 2 a 3 horas após o desligamento da bomba. Efeitos adversos observados incluíram bradicardia estável, hipotermia moderada, sedação e episódios de regurgitação em 4 dos 7 animais.',
        clinicalTakeaway:
          'Valida a segurança e eficácia da infusão contínua de metadona (0,1 a 0,12 mg/kg/h) em cães para dor severa prolongada, ressaltando a necessidade de suporte térmico ativo e monitoramento gastrointestinal.',
        referenceId: 'amon-2021-cri',
      },
      {
        title: 'Comparison between methadone and buprenorphine within the QUAD protocol for perioperative analgesia in cats undergoing ovariohysterectomy',
        authorsYear: 'Shah M, Yates D, Hunt J, Murrell J (2019)',
        journal: 'Journal of Feline Medicine and Surgery, 21(8):723-731',
        studyDesign: 'Ensaio clínico randomizado, cego, prospectivo com 120 gatas submetidas a OHE eletiva',
        sampleSize: '120 gatas hígidas',
        mainFindings:
          'Gatas foram submetidas ao protocolo anestésico QUAD contendo metadona (5 mg/m2 IM) ou buprenorfina (180 mcg/m2 IM) associadas a medetomidina, cetamina e midazolam. O grupo metadona apresentou escores de dor (CMPS-F) significativamente menores ao longo do tempo (P = 0,04) e uma taxa de resgate analgésico pós-operatório expressivamente inferior (18 de 60 gatas no grupo metadona contra 29 de 60 gatas no grupo buprenorfina; P = 0,028). Todos os resgates ocorreram nas primeiras 6 horas.',
        clinicalTakeaway:
          'Evidência robusta de padrão-ouro demonstrando que a metadona fornece proteção analgésica perioperatória superior à buprenorfina em cirurgias de ovariohisterectomia felina, diminuindo em cerca de 40% a necessidade de resgate pós-cirúrgico.',
        referenceId: 'shah-2019-quad',
      },
      {
        title: 'A dose titration study into the effects of diazepam or midazolam on the propofol dose requirements for induction of general anaesthesia in client owned dogs, premedicated with methadone and acepromazine',
        authorsYear: 'Robinson R, Borer-Weir K (2013)',
        journal: 'Veterinary Anaesthesia and Analgesia, 40(5):455-463',
        studyDesign: 'Ensaio clínico prospectivo de titulação posológica em 60 cães de rotina cirúrgica',
        sampleSize: '60 cães de clientes',
        mainFindings:
          'Avaliou a resposta anestésica de cães pré-medicados com metadona e acepromazina antes da indução por propofol. A inclusão da metadona proporcionou excelente sedação e reduziu expressivamente a dose de propofol necessária para intubação orotraqueal suave, promovendo estabilidade hemodinâmica pré-anestésica e ausência de episódios eméticos.',
        clinicalTakeaway:
          'Confirma a eficácia da metadona na MPA canina como componente analgésico e sinérgico que poupa o consumo de anestésicos de indução, minimizando a depressão cardiovascular associada a doses elevadas de propofol.',
        referenceId: 'robinson-2013-propofol',
      },
    ],
    practicalWeightTable: {
      standardDoseText:
        'Calibrador Posológico Prático Hospitalar da Solução Injetável 10 mg/mL com Dose de Referência de 0,2 mg/kg (Volume calculado: 0,02 mL por kg de peso vivo)',
      headers: ['Peso Corporal', 'Dose Total (mg)', 'Solução Injetável 10 mg/mL (mL)', 'Tipo de Seringa Recomendada', 'Via Oral Comprimidos'],
      rows: [
        { weight: '1 kg', totalDose: '0,2 mg', col1: '0,02 mL', col2: 'Seringa de Insulina 100 UI / 1 mL (2 unidades)', col3: 'Não recomendado (inoperante)' },
        { weight: '2 kg', totalDose: '0,4 mg', col1: '0,04 mL', col2: 'Seringa de Insulina 100 UI / 1 mL (4 unidades)', col3: 'Não recomendado (inoperante)' },
        { weight: '3 kg', totalDose: '0,6 mg', col1: '0,06 mL', col2: 'Seringa de Insulina 100 UI / 1 mL (6 unidades)', col3: 'Não recomendado (inoperante)' },
        { weight: '4 kg', totalDose: '0,8 mg', col1: '0,08 mL', col2: 'Seringa de Insulina 100 UI / 1 mL (8 unidades)', col3: 'Não recomendado (inoperante)' },
        { weight: '5 kg', totalDose: '1,0 mg', col1: '0,10 mL', col2: 'Seringa de 1 mL de precisão (graduada em 0,01 mL)', col3: 'Não recomendado (inoperante)' },
        { weight: '7,5 kg', totalDose: '1,5 mg', col1: '0,15 mL', col2: 'Seringa de 1 mL de precisão (graduada em 0,01 mL)', col3: 'Não recomendado (inoperante)' },
        { weight: '10 kg', totalDose: '2,0 mg', col1: '0,20 mL', col2: 'Seringa de 1 mL ou 3 mL de precisão', col3: 'Não recomendado (inoperante)' },
        { weight: '15 kg', totalDose: '3,0 mg', col1: '0,30 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
        { weight: '20 kg', totalDose: '4,0 mg', col1: '0,40 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
        { weight: '25 kg', totalDose: '5,0 mg', col1: '0,50 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
        { weight: '30 kg', totalDose: '6,0 mg', col1: '0,60 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
        { weight: '35 kg', totalDose: '7,0 mg', col1: '0,70 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
        { weight: '40 kg', totalDose: '8,0 mg', col1: '0,80 mL', col2: 'Seringa de 1 mL ou 3 mL', col3: 'Não recomendado (inoperante)' },
      ],
      dropletCalibrator: {
        title: 'Alerta Crítico: Proibição Estrita de Medição em Gotas',
        concentration: 'Solução Injetável 10 mg/mL (1%)',
        dropletRatio: 'Não aplicável (medicamento estéril em ampolas)',
        practicalRule:
          'A solução injetável de metadona NÃO deve jamais ser administrada ou calculada sob contagem de gotas. Ampolas de vidro não possuem bico gotejador padronizado e a densidade da solução induz variações perigosas no volume de cada gota, criando risco crítico de subdosagem ou superdosagem fatal.',
        note:
          'Utilizar exclusivamente seringas estéreis de precisão de 1 mL graduadas em centésimos (ou seringas de insulina graduadas em unidades) para aspirar e conferir o volume exato antes de qualquer administração.',
      },
    },
    genericBrandsNote:
      'No Brasil, a metadona comercialmente disponível para pronta aquisição hospitalar é o Mytedom® (Cristália Produtos Químicos Farmacêuticos), comercializado em ampolas estéreis de 1 mL a 10 mg/mL sem conservantes, além de apresentações orais em comprimidos de 5 mg e 10 mg (desaconselhadas para a rotina analgésica de cães e gatos). Internacionalmente, formulações licenciadas exclusivamente para uso veterinário incluem o Comfortan® (Dechra) e o Synthadon® (Animalcare), fornecidos em frascos-ampola multidose de 10 mg/mL.',
    samplePrescriptionText:
      'USO HOSPITALAR / AMBULATORIAL INSTITUCIONALIZADO\n\nPaciente: Canino / Felino  |  Peso: ___ kg  |  Data: __/__/2026\n\nPrescrição sob Notificação de Receita A VET (Portaria MAPA 837/2025 - Lista A1 / Portaria SVS/MS 344/98):\n\n1. Cloridrato de Metadona 10 mg/mL Solução Injetável (Mytedom® Cristália - Ampola de 1 mL)\n   - Administrar a dose de ___ mg/kg (equivalente a ___ mL), por via Intravenosa lenta (ao longo de 2 a 3 minutos) ou Intramuscular profunda.\n   - Frequência: a cada 3 a 4 horas (cão) ou 4 a 6 horas (gato), ou conforme avaliação periódica da dor por escalas validadas (Glasgow CMPS-SF no cão ou Feline Grimace Scale no gato).\n   - Quantidade: ___ ampolas de 1 mL para uso exclusivo hospitalar durante o período de internação.\n\nOrientações e Cuidados de Enfermagem Veterinária:\n- Não aplicar em bolus intravenoso rápido; aplicar lentamente em 2 a 3 minutos.\n- Monitorar a frequência cardíaca (FC), frequência respiratória (FR), oximetria de pulso (SpO2) e nível de sedação antes e 15 a 30 minutos após a aplicação.\n- Em caso de bradicardia severa com queda de pressão arterial, comunicar o médico-veterinário para avaliar indicação de atropina.\n- Manter suporte térmico ativo (colchão térmico) para prevenir hipotermia.\n- Em caso de depressão respiratória grave persistente ou apneia, iniciar ventilação com oxigênio e manter naloxona injetável (0,02 a 0,04 mg/kg IV) imediatamente acessível para reversão emergencial.\n\nAssinatura e Carimbo do Médico-Veterinário\nCRMV-XX nº XXXXX',
    clinicalWarningItems: [
      {
        label: 'Bradicardia Vagal Acentuada',
        text: 'A metadona estimula intensamente o núcleo vagal central, reduzindo a frequência cardíaca em 32% a 46% (superior à morfina). Monitorar ECG e ter atropina pronta em pacientes anestesiados ou com depressão de débito.',
      },
      {
        label: 'Inoperância da Via Oral em Cães',
        text: 'A metadona oral sofre destruição de primeira passagem quase total pelo fígado canino. Não prescrever comprimidos orais para analgesia aguda de rotina em cães.',
      },
      {
        label: 'OTM Felina Eficaz com 0,6 mg/kg',
        text: 'Em gatos, a absorção transmucosa oral bucal apresenta biodisponibilidade de 44% e antinocicepção por 4 horas. Pode causar salivação temporária se a solução contiver conservantes.',
      },
      {
        label: 'Antagonismo NMDA Protetor',
        text: 'Ambos os enantiômeros bloqueiam receptores NMDA no corno dorsal, prevenindo o fenômeno de wind-up e a sensibilização central decorrentes de cirurgias ortopédicas ou traumas graves.',
      },
      {
        label: 'Interação Serotoninérgica Fatal com IMAOs',
        text: 'Contraindicada categoricamente com selegilina, amitraz ou linezolida. Evitar associação fútil com tramadol pelo risco aditivo de toxicidade serotoninérgica.',
      },
      {
        label: 'Reversão por Naloxona',
        text: 'Em superdosagem ou apneia acidental, reverter com naloxona (0,015 a 0,04 mg/kg IV/IM titulada) associada a oxigênio e ventilação assistida.',
      },
    ],
    relatedDiseaseSlugs: [
      'doenca-do-disco-intervertebral-caes',
      'doenca-do-disco-intervertebral-gatos',
      'cistite-idiopatica-felina',
      'coagulacao-intravascular-disseminada-caes-gatos',
    ],
    references: [
      {
        id: 'plumbs-10ed',
        citation: "Plumb's Veterinary Drug Handbook, 10th edition (2023). Methadone monograph, pp. 842-846. Wiley-Blackwell.",
        relevance: 'Compêndio farmacológico de referência com dados completos de farmacodinâmica, farmacocinética comparada, protocolos de CRI, interações e doses.',
      },
      {
        id: 'bsava-10ed',
        citation: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th Edition (2020). Methadone, pp. 254-255. British Small Animal Veterinary Association.',
        relevance: 'Formulário padrão-ouro britânico com diretrizes de analgesia perioperatória, via OTM felina, administração epidural e segurança em hepatopatas.',
      },
      {
        id: 'lumb-jones-6ed',
        citation: 'Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones (2024). Chapter 23: Opioids, Methadone section, pp. 377-378. Wiley.',
        relevance: 'Tratado clássico de anestesiologia detalhando o perfil NMDA e monoaminérgico, efeitos sobre frequência cardíaca, farmacocinética em Beagles vs Greyhounds e CRI.',
      },
      {
        id: 'hunt-2013-ortho',
        citation: 'Hunt JR, Attenburrow PM, Slingsby LS, Murrell JC (2013). Comparison of premedication with buprenorphine or methadone with meloxicam for postoperative analgesia in dogs undergoing orthopaedic surgery. Journal of Small Animal Practice, 54(8):418-424. DOI: 10.1111/jsap.12103. PMID: 23859702.',
        relevance: 'Ensaio clínico randomizado demonstrando superioridade da metadona sobre a buprenorfina em dor ortopédica canina aguda.',
      },
      {
        id: 'ferreira-2011-otm',
        citation: 'Ferreira TH, Rezende ML, Mama KR, Hudachek SF, Aguiar AJA (2011). Plasma concentrations and behavioral, antinociceptive, and physiologic effects of methadone after intravenous and oral transmucosal administration in cats. American Journal of Veterinary Research, 72(6):764-771. DOI: 10.2460/ajvr.72.6.764. PMID: 21627522.',
        relevance: 'Ensaio crossover seminal estabelecendo a farmacocinética e eficácia analgésica de 4 horas da metadona OTM em felinos.',
      },
      {
        id: 'amon-2021-cri',
        citation: 'Amon T, Kästner SBR, Kietzmann M, Tünsmeyer J (2021). Plasma levels of a methadone constant rate infusion and their corresponding effects on thermal and mechanical nociceptive thresholds in dogs. BMC Veterinary Research, 17(1):35. DOI: 10.1186/s12917-020-02735-3. PMID: 33461553.',
        relevance: 'Estudo experimental controlado demonstrando sustentação dos limiares antinociceptivos durante CRI de 72 horas em cães.',
      },
      {
        id: 'shah-2019-quad',
        citation: 'Shah M, Yates D, Hunt J, Murrell J (2019). Comparison between methadone and buprenorphine within the QUAD protocol for perioperative analgesia in cats undergoing ovariohysterectomy. Journal of Feline Medicine and Surgery, 21(8):723-731. DOI: 10.1177/1098612X18798840. PMID: 30215269.',
        relevance: 'Ensaio randomizado em 120 gatas comprovando menores escores de dor e menor taxa de resgate pós-operatório com metadona vs buprenorfina.',
      },
      {
        id: 'robinson-2013-propofol',
        citation: 'Robinson R, Borer-Weir K (2013). A dose titration study into the effects of diazepam or midazolam on the propofol dose requirements for induction of general anaesthesia in client owned dogs, premedicated with methadone and acepromazine. Veterinary Anaesthesia and Analgesia, 40(5):455-463. DOI: 10.1111/vaa.12046. PMID: 23551528.',
        relevance: 'Estudo demonstrando o potente efeito poupador de indutor e estabilidade pré-anestésica da metadona na MPA canina.',
      },
      {
        id: 'aaha-pain-2022',
        citation: '2022 AAHA Pain Management Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association. DOI: 10.5326/JAAHA-MS-7292.',
        relevance: 'Diretriz internacional recomendando analgesia multimodal preemptiva, uso racional de opioides plenos hospitalares e desaconselhamento de opioides orais crônicos em cães.',
      },
    ],
  },
];

export const metadonaMedicationRecord = metadonaMedicationsSeed[0];
