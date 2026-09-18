import { MedicationRecord } from '../../types/medication';

export const meloxicamMedicationRecord: MedicationRecord = {
  id: 'med-meloxicam',
  slug: 'meloxicam',
  title: 'Meloxicam',
  activeIngredient:
    'Meloxicam (4-hidroxi-2-metil-N-(5-metil-2-tiazolil)-2H-1,2-benzotiazina-3-carboxamida 1,1-dióxido)',
  isControlled: false,
  tradeNames: [
    'Maxicam® 0,5 mg e 2 mg Comprimidos Palatáveis Bissulcados (Ourofino Saúde Animal — Cães e Gatos)',
    'Maxicam® Solução Oral 1 mg/mL (0,1%) Frasco 15 mL com Seringa Dosadora (Ourofino — Cães e Gatos)',
    'Maxicam® 0,2% Injetável (2 mg/mL) Frasco-ampola 20 mL (Ourofino — Cães SC/IM/IV e Gatos SC)',
    'Flamavet® 0,2 mg, 0,5 mg e 2 mg Comprimidos Palatáveis (Agener União — Uso Veterinário)',
    'Mellis Vet® 0,2 mg, 0,5 mg, 2 mg, 3 mg e 4 mg Comprimidos Palatáveis (Avert Saúde Animal)',
    'Elo-Xicam® 0,5 mg e 2 mg Comprimidos Palatáveis (Chemitril / Chemitec)',
    'Maxitec® 0,5 mg e 2 mg Comprimidos (Syntec Saúde Animal)',
    'Metacam® 1,5 mg/mL Suspensão Oral Cães / 0,5 mg/mL Gatos (Boehringer Ingelheim Animal Health)',
    'Metacam® 5 mg/mL Solução Injetável (Boehringer Ingelheim Animal Health — Referência Internacional)',
    'Movatec® 7,5 mg e 15 mg Comprimidos (Boehringer Ingelheim Humano — Não recomendado p/ titulação em pequenos)',
  ],
  officialSiteUrl: 'https://vetsmart.com.br/cg/produto/85/maxicam-comprimidos',
  leafletUrl: 'https://ourofino.com/wp-content/uploads/2024/07/MAXICAM-SOLUCAO-ORAL_BULA.pdf',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/meloxicam/PNG',
  pharmacologicClass:
    'Anti-inflamatório não esteroidal (AINE) da classe dos oxicams; inibidor preferencial da ciclo-oxigenase-2 (COX-2) com propriedades analgésicas, anti-inflamatórias e antipiréticas',
  species: ['dog', 'cat'],
  category: 'anestesia-dor',
  tags: [
    'Meloxicam',
    'AINE',
    'Anti-inflamatório Não Esteroidal',
    'Oxicam',
    'Inibidor COX-2 Preferencial',
    'Osteoartrite Canina',
    'DJD Felina',
    'Analgesia Perioperatória',
    'Dor Crônica',
    'Maxicam',
    'Flamavet',
    'Mellis Vet',
    'Metacam',
    'ISFM/AAFP 2024',
    'KuKanich 2021',
    'DRC Felina',
    'Lumb & Jones',
  ],

  mechanismOfAction:
    'O meloxicam é um anti-inflamatório não esteroidal (AINE) derivado do ácido enólico pertencente à classe dos oxicams. Seu mecanismo primário baseia-se na inibição preferencial, reversível e dose-dependente da isoenzima ciclo-oxigenase-2 (COX-2 ou PTGS2), enzima induzida em macrófagos teciduais, neutrófilos, sinoviócitos e células endoteliais por citocinas inflamatórias (como IL-1-beta e TNF-alfa). A inibição da COX-2 bloqueia a oxigenação do ácido araquidônico em prostaglandina G2 (PGG2) e a subsequente conversão em prostaglandina H2 (PGH2), precursora comum dos prostanoides pró-inflamatórios e hiperalgésicos teciduais, principalmente a prostaglandina E2 (PGE2) e a prostaciclina (PGI2). A redução dramática de PGE2 nos tecidos inflamados suprime a sensibilização periférica dos nociceptores aferentes primários (fibras C e A-delta), diminuindo a fosforilação de canais de sódio voltagem-dependentes acoplados a receptores EP2 e EP4, atenuando a transdução dolorosa, o edema inflamatório articular e a hiperalgesia central no corno dorsal medular. Em nível termorregulador, o bloqueio da síntese de PGE2 no núcleo pré-óptico hipotalâmico restabelece o ponto de ajuste térmico corporal, exercendo potente ação antipirética. Em doses terapêuticas corretas, o meloxicam poupa a ciclo-oxigenase-1 constitutiva (COX-1 ou PTGS1), preservando a síntese estomacal basal de PGE2 gastroprotetora e o tromboxano A2 (TXA2) plaquetário. Contudo, essa seletividade é relativa e não absoluta: em sobredosagens ou exposições sistêmicas prolongadas e elevadas, a COX-1 passa a ser concomitantemente inibida, acarretando perda de mucoproteção gástrica. No rim, em condições fisiológicas de euvolemia e normotensão, a taxa de filtração glomerular independe das prostaglandinas. No entanto, sob desidratação, anestesia inalatória ou choque, a vasoconstrição compensatória mediada pelo sistema renina-angiotensina e tono simpático é contrabalanceada por PGE2 e PGI2 vasodilatadoras renais; sob este estado de estresse hipoperfusional, o bloqueio de COX pelo meloxicam remove essa vasodilatação de resgate, deflagrando isquemia tubular medular e risco de lesão renal aguda (LRA).',

  plainLanguageSummary:
    'O meloxicam é um dos anti-inflamatórios não esteroidais mais prescritos e estudados na medicina veterinária de pequenos animais, pertencente à família dos oxicams e caracterizado pela inibição preferencial da ciclo-oxigenase-2 (COX-2), conferindo alívio eficaz da dor, controle da inflamação e efeito antipirético em afecções musculoesqueléticas, osteoartrite e no período perioperatório de cães e gatos. Embora apresente perfil de tolerabilidade gastrointestinal e renal superior aos AINEs não seletivos tradicionais, sua seletividade é estritamente dose-dependente e a proteção renal exige que o paciente esteja hidratado, normotenso e hemodinamicamente estável, uma vez que as prostaglandinas vasodilatadoras são vitais para preservar a filtração glomerular diante de hipovolemia ou anestesia. Na espécie felina, onde a biotransformação ocorre com sucesso por vias oxidativas fecais sem dependência crítica de glicuronidação, o uso crônico em doses baixas e individualizadas passou a ser chancelado por consensos internacionais recentes como o ISFM/AAFP 2024 e ensaios clínicos controlados, inclusive em gatos selecionados com doença renal crônica estável, desde que mantidos sob rigoroso acompanhamento laboratorial e clínico contínuo.',

  pillars: [
    {
      title: 'Inibição Preferencial de COX-2 e Supressão de PGE2',
      icon: 'ShieldCheck',
      desc: 'Bloqueia prioritariamente a enzima COX-2 induzida nos tecidos lesados, cessando a cascata do ácido araquidônico e reduzindo drasticamente as prostaglandinas inflamatórias locais.',
    },
    {
      title: 'Atenuação da Sensibilização Nociceptiva Periférica e Central',
      icon: 'ZapOff',
      desc: 'Diminui a excitabilidade dos receptores térmicos e mecânicos nas terminações periféricas das articulações e reduz a amplificação dolorosa (wind-up) na medula espinhal.',
    },
    {
      title: 'Restauração da Mobilidade e Conforto Sinovial na Osteoartrite',
      icon: 'Activity',
      desc: 'Reduz a sinovite, a efusão articular e a claudicação dolorosa, devolvendo vigor, capacidade de salto em felinos e disposição motora para passeios em cães idosos.',
    },
    {
      title: 'Efeito Antipirético Hipotalâmico de Ação Central',
      icon: 'ThermometerSnowflake',
      desc: 'Reduz a síntese de PGE2 no centro termorregulador pré-óptico hipotalâmico estimulado por pirógenos endógenos, normalizando a curva febril infecciosa ou traumática.',
    },
  ],

  quickSummaryHighlights: [
    'Anti-inflamatório não esteroidal (AINE) oxicam com inibição preferencial da COX-2 e menor agressão relativa à mucosa gástrica em doses corretas.',
    'Pilar ouro para analgesia e controle de osteoartrite (OA), espondilose, trauma de tecidos moles e perioperatório em cães e gatos.',
    'Hemodinâmica renal mandatória: nunca administrar em animais desidratados, hipovolêmicos ou hipotensos pelo risco de lesão renal aguda isquêmica.',
    'Uso crônico em gatos: chancelado pelo consenso ISFM/AAFP 2024 e KuKanich 2021 em doses ultrabaixas (0,02 mg/kg/dia) em DRC estável e euvolêmica.',
    'Associação proibida: contraindicação absoluta ao uso concomitante com corticosteroides ou outro AINE (risco grave de perfuração e hemorragia péptica).',
  ],

  clinicalWarningItems: [
    {
      label: 'Euvolemia e Perfusão Renal Obrigatórias',
      text: 'Nunca administrar meloxicam a pacientes desidratados, hipovolêmicos ou hipotensos. Sob estresse hemodinâmico, a TFG torna-se dependente de prostaglandinas vasodilatadoras compensatórias (PGE2 e PGI2); o bloqueio da COX retira esse mecanismo de resgate, precipitando isquemia medular renal e falência renal aguda imediata.',
    },
    {
      label: 'Proibição Estrita de Associação com Corticoides ou Outros AINEs',
      text: 'A administração simultânea ou sem intervalo adequado (washout de 3 a 7 dias) de meloxicam com dexametasona, prednisolona ou outros AINEs multiplica drasticamente o risco de erosão, ulceração e perfuração gástrica ou duodenal potencialmente fatal.',
    },
    {
      label: 'Manejo em Felinos e Doença Renal Crônica (DRC)',
      text: 'A FDA adverte contra doses repetidas em felinos pela bula americana. Todavia, a literatura mundial e o consenso internacional ISFM/AAFP 2024 fundamentam o uso seguro de doses ultrabaixas (0,01 a 0,02 mg/kg/dia) em gatos com DRC estável (estágios IRIS 1 a 3), desde que estejam estritamente hidratados, normotensos e com alimentação normal.',
    },
    {
      label: 'Titulação de Precisão com Formulação Líquida Oral',
      text: 'Para felinos e cães de pequeno porte, prescrever impreterivelmente formulações líquidas veterinárias de 1 mg/mL acompanhadas de seringa dosadora graduada (0,1 mL/kg para 0,1 mg/kg; 0,02 mL/kg para 0,02 mg/kg). Comprimidos humanos de 7,5 mg ou 15 mg são absolutamente contraindicados pelo alto risco de sobredose fatal por erro de partição.',
    },
  ],

  indications: [
    'Tratamento da dor crônica e inflamação associadas à osteoartrite e doença articular degenerativa (DJD) em cães.',
    'Alívio da dor e inflamação musculoesquelética aguda, sinovite, contusões e traumas ortopédicos em cães.',
    'Analgesia perioperatória em procedimentos cirúrgicos de tecidos moles e ortopedia em cães normotensos e hidratados.',
    'Controle da dor aguda pós-operatória de curta duração em gatos (ovariohisterectomia, orquiectomia, cirurgias de tecidos moles).',
    'Manejo continuado de longo prazo da osteoartrite e doença articular degenerativa em felinos em regime de dose ultrabaixa individualizada.',
  ],

  quickIndications: [
    {
      condition: 'Osteoartrite / Doença Articular Degenerativa em Cães',
      species: 'dog',
      doseSummary: '0,2 mg/kg VO no dia 1, seguido por 0,1 mg/kg VO a cada 24 horas (manutenção)',
      route: 'Oral (VO)',
      duration: 'Contínuo ou ciclos prolongados sob monitoramento semestral a anual',
      clinicalContext: 'Dor articular crônica, rigidez matinal, claudicação e redução da atividade motora.',
    },
    {
      condition: 'Dor e Inflamação Musculoesquelética Aguda em Cães',
      species: 'dog',
      doseSummary: '0,2 mg/kg VO ou SC no dia 1, seguido por 0,1 mg/kg VO a cada 24 horas',
      route: 'Oral (VO) ou Subcutânea (SC)',
      duration: '3 a 7 dias, conforme remissão dos sinais clínicos',
      clinicalContext: 'Entorses, distensões musculares, contusões traumáticas e sinovites agudas.',
    },
    {
      condition: 'Analgesia Perioperatória em Cães',
      species: 'dog',
      doseSummary: '0,2 mg/kg SC, IV lento ou IM uma vez no pré ou pós-operatório imediato',
      route: 'Subcutânea (SC), Intravenosa (IV) ou Intramuscular (IM)',
      duration: 'Dose única parenteral; continuidade oral a 0,1 mg/kg q24h por 2 a 4 dias se necessário',
      clinicalContext: 'Cirurgias ortopédicas e de tecidos moles; retardar se houver hipotensão anestésica.',
    },
    {
      condition: 'Dor Aguda Perioperatória em Gatos',
      species: 'cat',
      doseSummary: '0,2 mg/kg SC dose única no perioperatório, podendo seguir 0,05 mg/kg VO q24h por até 4 dias',
      route: 'Subcutânea (SC) / Oral (VO)',
      duration: '1 a 4 dias no máximo em regime de dor aguda',
      clinicalContext: 'Procedimentos cirúrgicos eletivos (OHE, castração, cirurgias de tecidos moles).',
    },
    {
      condition: 'Osteoartrite e DJD Crônica em Gatos (Consenso ISFM/AAFP 2024)',
      species: 'cat',
      doseSummary: '0,05 mg/kg VO q24h inicialmente, titulando progressivamente para 0,01 a 0,03 mg/kg VO q24h',
      route: 'Oral (VO)',
      duration: 'Uso continuado com titulação para a menor dose efetiva',
      clinicalContext: 'Falta de saltos, hesitação em subir móveis, relutância ao toque e irritabilidade em felinos idosos.',
    },
    {
      condition: 'Gatos com Osteoartrite e Doença Renal Crônica (DRC) Estável IRIS 1 a 3',
      species: 'cat',
      doseSummary: '0,02 mg/kg VO a cada 24 horas (regime KuKanich 2021 e ISFM/AAFP 2024)',
      route: 'Oral (VO com suspensão 1 mg/mL)',
      duration: 'Contínuo com monitoramento de PA, creatinina, SDMA e urinálise a cada 2 a 4 meses',
      clinicalContext: 'Gato hidratado, normotenso e com apetite preservado; suspender se houver desidratação.',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-oa-canina',
      indication: 'Osteoartrite e Doença Articular Degenerativa (DJD) Canina',
      clinicalContext: 'Tratamento de cães com claudicação crônica, dor à palpação articular, perda de mobilidade e relutância ao exercício físico decorrente de artrose de quadril, joelho, cotovelo ou espondilose espinhal.',
      species: 'dog',
      dose: 'Dia 1: 0,2 mg/kg VO. Dias seguintes: 0,1 mg/kg VO a cada 24 horas (ou menor dose efetiva após estabilização).',
      route: 'Oral (VO com alimento ou diretamente na boca)',
      frequency: 'A cada 24 horas (SID)',
      duration: 'Uso de longo prazo / contínuo adaptado à resposta clínica e tolerabilidade gastrointestinal.',
      mechanismOfAction: 'Inibe seletivamente a síntese de PGE2 no tecido sinovial e na cartilagem lesada, reduzindo a cascata de citocinas catabólicas articulares e elevando o limiar de ativação dos nociceptores locais.',
      clinicalRationale: 'Estudos clínicos classe 1b (Peterson & Keefe 2004) comprovam melhora estaticamente expressiva do escore de claudicação e disposição funcional frente ao placebo em 14 dias de terapia.',
      monitoring: 'Avaliação clínica aos 14 e 30 dias; hemograma, ureia, creatinina, ALT, fosfatase alcalina e urinálise semestrais em cães adultos e a cada 3-4 meses em idosos com comorbidades.',
      referenceIds: ['ref-peterson-2004', 'ref-luna-2007', 'ref-plumb-10', 'ref-bsava-10', 'ref-lumb-jones-2024'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego e Diretrizes Internacionais',
    },
    {
      id: 'ind-perioperatorio-canino',
      indication: 'Analgesia e Manejo Anti-inflamatório Perioperatório em Cães',
      clinicalContext: 'Procedimentos cirúrgicos eletivos e reconstrutivos de tecidos moles, cirurgias odontológicas e cirurgias ortopédicas de média a alta complexidade, inserido em protocolo de analgesia multimodal preventiva.',
      species: 'dog',
      dose: '0,2 mg/kg SC, IV lento ou IM em dose única pré ou pós-operatória; manutenção oral a 0,1 mg/kg q24h por 2 a 4 dias se indicado.',
      route: 'Subcutânea (SC), Intravenosa (IV lenta) ou Intramuscular (IM)',
      frequency: 'Dose única parenteral perioperatória; se necessário continuidade oral SID.',
      duration: '1 a 5 dias no pós-operatório.',
      mechanismOfAction: 'Bloqueia a liberação inicial de prostanoides mediada pela incisão cirúrgica e manipulação tecidual, inibindo a sensibilização heterossináptica espinhal dos neurônios WDR no corno dorsal.',
      clinicalRationale: 'Proporciona redução relevante no consumo intraoperatório e pós-operatório de opioides, promovendo recuperação anestésica mais suave e redução da hiperalgesia secundária ao redor da ferida.',
      monitoring: 'Pressão arterial intraoperatória mandatória (PAM acima de 65-70 mmHg); hidratação e débito urinário adequados; suspender ou postergar a aplicação para o pós-anestésico se ocorrer hipotensão prolongada.',
      referenceIds: ['ref-bsava-10', 'ref-lumb-jones-2024', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Consensos de Anestesia e Analgesia Veterinária (AAHA / WSAVA / BSAVA)',
    },
    {
      id: 'ind-perioperatorio-felino',
      indication: 'Dor Aguda Pós-Operatória em Gatos (Cirurgias de Tecidos Moles)',
      clinicalContext: 'Ovariohisterectomia (OHE), orquiectomia, exérese de nódulos cutâneos e procedimentos odontológicos limpos em felinos jovens a adultos saudáveis e euvolêmicos.',
      species: 'cat',
      dose: '0,2 mg/kg SC dose única pós-operatória; nos dias subsequentes pode-se administrar 0,05 mg/kg VO q24h por até 4 dias conforme evolução.',
      route: 'Subcutânea (SC) na intervenção; Oral (VO) com suspensão 1 mg/mL na manutenção domiciliar.',
      frequency: 'A cada 24 horas (SID)',
      duration: 'Máximo de 1 a 4 dias no regime pós-operatório agudo.',
      mechanismOfAction: 'Inibe a resposta inflamatória visceral e muscular decorrente da ligadura vascular e tração de pedículos ovarianos, reduzindo o tono nociceptivo aferente via nervos esplâncnicos.',
      clinicalRationale: 'Estudos clínicos recentes (Hillen et al. 2023) demonstram excelente eficácia analgésica pós-OHE com 72% dos tutores relatando escore de dor zero, equiparável aos coxibes veterinários mais recentes.',
      monitoring: 'Hidratação corporal rigorosa, retorno espontâneo do apetite no pós-operatório, ausência de vômitos ou diarreia e manutenção do débito urinário hígido.',
      referenceIds: ['ref-hillen-2023', 'ref-isfm-2022-pain', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado e Consenso ISFM 2022 de Dor Aguda',
    },
    {
      id: 'ind-djd-felina-cronica',
      indication: 'Doença Articular Degenerativa (DJD) e Osteoartrite Crônica Felina',
      clinicalContext: 'Felinos de meia-idade a idosos com perda de qualidade de vida, relutância em pular em locais altos, higiene pessoal deficiente, agressividade ao carinho e alterações posturais na caixa de areia.',
      species: 'cat',
      dose: 'Inicial: 0,05 mg/kg VO a cada 24 horas por 3 a 5 dias. Manutenção: titular gradualmente para 0,01 a 0,03 mg/kg VO q24h (ou em dias alternados na menor dose suficiente).',
      route: 'Oral (VO exclusivamente com solução/suspensão veterinária 1 mg/mL com seringa dosadora)',
      frequency: 'A cada 24 horas (SID) ou a cada 48 horas em manutenção muito prolongada.',
      duration: 'Tratamento de longo prazo continuado, guiado por reavaliações clínicas estruturadas.',
      mechanismOfAction: 'Combate o processo inflamatório sinovial crônico de baixa intensidade, promovendo alívio da rigidez articular e estimulando o restabelecimento dos comportamentos naturais da espécie felina.',
      clinicalRationale: 'O ensaio seminal de Gunew et al. (2008) demonstrou 85% de sucesso clínico relatado pelos tutores com incidência mínima de reações gastrointestinais (cerca de 4%) e sem lesão renal detectável na coorte.',
      monitoring: 'Exames basais prévios (creatinina, ureia, SDMA, urinálise com densidade e UPC, pressão arterial por Doppler). Reavaliação clínica aos 15-30 dias e bioquímica renal a cada 3 a 6 meses.',
      referenceIds: ['ref-gunew-2008', 'ref-isfm-aafp-2024-nsaid', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas ISFM/AAFP 2024 e Ensaios Prospectivos',
    },
    {
      id: 'ind-drc-felina-estavel',
      indication: 'Manejo de Dor Crônica em Gatos com Doença Renal Crônica Estável (IRIS 1 a 3)',
      clinicalContext: 'Gatos senis que apresentam simultaneamente osteoartrite dolorosa incapacitante e diagnóstico prévio de DRC estável nos estágios 1, 2 ou 3 da IRIS, sem episódios agudos recentes de desidratação.',
      species: 'cat',
      dose: '0,02 mg/kg VO a cada 24 horas (regime prospectivo publicado por KuKanich et al. 2021 e preconizado pelo ISFM/AAFP 2024).',
      route: 'Oral (VO com suspensão líquida 1 mg/mL e seringa milimétrica de 0,3 mL ou 1 mL)',
      frequency: 'A cada 24 horas (SID)',
      duration: 'Uso sob prescrição médica estrita e visitas laboratoriais seriadas.',
      mechanismOfAction: 'Fornece alívio analgésico articular sem atingir concentrações que anulem completamente as prostaglandinas vasodilatadoras renais basais, preservando a microcirculação medular.',
      clinicalRationale: 'O ensaio prospectivo duplo-cego placebo-controlado de KuKanich et al. (2021) em felinos com DRC IRIS 2 e 3 comprovou ausência de diferença estatística em creatinina, TFG, SDMA ou biomarcadores de lesão tubular (como clusterina urinária e cistatina B) frente ao placebo ao longo de 6 meses de uso contínuo de 0,02 mg/kg/dia.',
      monitoring: 'Obrigatoriamente: peso estável, normotensão arterial (PAS menor que 160 mmHg), densidade urinária e UPC controlados; o tutor deve suspender imediatamente a medicação se o gato apresentar hiporexia, vômito ou recusar água.',
      referenceIds: ['ref-kukanich-2021', 'ref-isfm-aafp-2024-nsaid', 'ref-bsava-nephrology-20'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Prospectivo Randomizado Placebo-Controlado (KuKanich 2021)',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Em cães, o meloxicam apresenta biodisponibilidade oral praticamente completa (próxima de 100%) e rápida absorção após administração oral ou subcutânea. A concentração plasmática máxima (Cmax) oral é atingida entre 4 e 8 horas após a ingestão em cães mantidos em jejum ou alimentados, enquanto a administração subcutânea atinge o pico mais precocemente em cerca de 2,5 horas. Em gatos, a biodisponibilidade oral é estimada em aproximadamente 80%, alcançando o pico plasmático entre 1,5 e 3 horas após administração parenteral e variável por via oral. A alimentação não interfere de maneira significativa na fração total absorvida da molécula.',
    distribution:
      'O volume de distribuição aparente (Vd) do meloxicam é relativamente pequeno em ambas as espécies: cerca de 0,26 a 0,32 L/kg em cães e 0,245 a 0,27 L/kg em gatos. Essa distribuição tecidual restrita decorre diretamente de sua extrema afinidade por proteínas plasmáticas, sobretudo a albumina sérica, onde cerca de 97% da molécula circula na forma ligada. A fração livre difunde-se eficientemente para o líquido sinovial articular, atingindo concentrações anti-inflamatórias clinicamente ativas e duradouras nas articulações inflamadas.',
    metabolism:
      'A biotransformação ocorre amplamente por via hepática. Em cães, ocorre metabolização extensa por enzimas oxidativas e conjugação, gerando metabólitos hidroxilados e carboxilados inativos farmacologicamente, com evidente circulação entero-hepática. Em felinos, o metabolismo ocorre predominantemente por oxidação e clivagem dependentes de vias alternativas, não dependendo criticamente da glicuronidação (via metabólica classicamente deficitária na espécie felina), o que possibilita um perfil de tolerabilidade favorável quando em dosagens adequadamente reduzidas.',
    elimination:
      'A eliminação do meloxicam e de seus metabólitos ocorre tanto pela via biliar/fecal quanto pela via urinária. Em gatos, estudos farmacocinéticos demonstram que aproximadamente 79% da dose é recuperada nas fezes e apenas 21% na urina, evidenciando o papel preponderante da excreção gastrointestinal biliar. A meia-vida de eliminação plasmática terminal (t1/2) é de aproximadamente 24 horas no cão (variando de 12 a 24 h conforme o protocolo e formulação) e entre 25 e 37 horas no gato (com faixas entre 15 e 37 h relatadas na literatura), justificando plenamente o intervalo de administração uma vez ao dia (q24h / SID).',
    cnsPenetration:
      'Penetração no sistema nervoso central muito restrita devido ao baixo volume de distribuição e à ligação proteica de 97%. A analgesia exercida pelo meloxicam é essencialmente mediada nos nociceptores periféricos articulares e viscerais e nas sinapses do corno dorsal da medula espinhal, sem necessidade de concentrações liquóricas elevadas.',
    plasmaBinding:
      'Aproximadamente 97% ligado a proteínas plasmáticas (albumina sérica). Hipoalbuminemia severa (menor que 2,0 g/dL) pode elevar a fração livre circulante ativa, demandando cautela e redução na dosagem.',
    halfLife:
      'Aproximadamente 24 horas em cães saudáveis; cerca de 25 a 37 horas em gatos domésticos (podendo oscilar entre 15 e 37 h conforme a formulação e o modelo farmacocinético).',
  },

  administration: [
    'Via Oral (VO): pode ser administrado diretamente na boca ou homogeneizado com pequenas porções de alimento palatável úmido.',
    'Agitação obrigatória: suspensões e soluções orais devem ser bem homogeneizadas antes de cada aplicação para garantir concentração uniforme.',
    'Utilização de seringa dosadora: sempre aspirar o volume exato utilizando seringa milimetrada ou o dispositivo dosador original calibrado por peso.',
    'Via Subcutânea (SC): amplamente empregada no pré ou pós-operatório imediato, aplicando no tecido subcutâneo da região interescapular ou dorso-lateral.',
    'Via Intravenosa (IV): permitida para apresentações injetáveis licenciadas em cães (como Maxicam 0,2%), devendo ser aplicada lentamente por via venosa sem bolus rápido.',
    'Restrição de misturas parenterais: não diluir ou misturar meloxicam em bolsas de fluidoterapia ou com outros medicamentos na mesma seringa.',
  ],

  contraindications: [
    'Pacientes desidratados, hipovolêmicos ou hipotensos (risco crítico e iminente de necrose tubular renal e lesão renal aguda).',
    'Doença ulcerativa ou erosiva gastrointestinal ativa, histórico recente de perfuração péptica, melena ou hematêmese.',
    'Uso simultâneo ou recente (período de washout inferior a 3 a 7 dias) de qualquer outro anti-inflamatório não esteroidal (AINE).',
    'Uso simultâneo ou recente de corticosteroides sistêmicos (dexametasona, prednisolona, hidrocortisona, triancinolona).',
    'Doença renal crônica terminal não compensada (IRIS estágio 4 com oligúria/anúria ou uremia severa).',
    'Coagulopatias graves, trombocitopenia acentuada ativa ou diatese hemorrágica não controlada.',
    'Insuficiência hepática descompensada com hipoalbuminemia crítica.',
    'Hipersensibilidade conhecida ao meloxicam ou a outros AINEs da classe dos oxicams.',
    'Fêmeas gestantes ou lactantes e filhotes com idade inferior a 6 semanas (segurança não estabelecida).',
  ],

  cautions: [
    'Procedimentos anestésicos cirúrgicos: monitorar rigorosamente a pressão arterial média; se ocorrer hipotensão refratária intraoperatória (PAM menor que 60 mmHg), postergar a administração do meloxicam até a estabilização pós-anestésica.',
    'Gatos com DRC estável (IRIS 1 a 3): exige prévia comprovação de euvolemia, estabilidade clínica de apetite e peso corporal, normotensão arterial e acompanhamento de microalbuminúria/UPC.',
    'Pacientes idosos em uso prolongado: manter acompanhamento laboratorial semestral ou trimestral de creatinina, ureia, SDMA, urinálise completa e enzimas hepáticas.',
    'Sinais de toxicidade digestiva: orientar tutores a suspenderem imediatamente o medicamento e buscarem atendimento se houver vômito, diarreia, fezes escuras, letargia ou hiporexia.',
    'Condições com alto risco de hipoperfusão medular: insuficiência cardíaca congestiva descompensada e uso concomitante de diuréticos de alça.',
  ],

  adverseEffects: [
    'Vômitos esporádicos e náusea (efeito comum decorrente de irritação direta da mucosa ou redução de prostanoides).',
    'Hiporexia e recusa alimentar transitória.',
    'Amolecimento fecal e diarreia leve a moderada.',
    'Melena, fezes enegrecidas e hematêmese por erosão/ulceração gastrointestinal (efeito incomum a grave; suspender imediatamente).',
    'Azotemia e elevação de ureia, creatinina e SDMA (incomum em pacientes hígidos euvolêmicos; grave em hipoperfusão).',
    'Lesão renal aguda isquêmica (associada a anestesia sem controle pressórico, desidratação prévia ou sobredosagem).',
    'Hepatite tóxica e elevação de ALT e ALP (reação idiossincrática rara descrita em cães).',
    'Letargia, sonolência e prostração inespecífica.',
  ],

  interactions: [
    'Corticosteroides (Prednisolona, Dexametasona): efeito sinérgico devastador sobre a mucosa gástrica; contraindicação absoluta.',
    'Outros AINEs (Carprofeno, Firocoxib, Robenacoxib, Dipirona em doses anti-inflamatórias contínuas): somação de toxicidade gastrointestinal e renal.',
    'Aminoglicosídeos (Gentamicina, Amicacina): potencialização marcante de nefrotoxicidade tubular renal.',
    'Diuréticos de alça (Furosemida, Torsemida): risco acentuado de hipovolemia e queda da taxa de filtração glomerular renal.',
    'Inibidores da ECA e Bloqueadores de Receptores de Angiotensina (Benazepril, Enalapril, Telmisartana): perda combinada do tônus arteriolar glomerular aferente e eferente, reduzindo a TFG.',
    'Ciclosporina: risco sinérgico de vasoconstrição arteriolar renal e elevação dos níveis séricos de creatinina.',
    'Anticoagulantes e Antiagregantes Plaquetários (Varfarina, Heparinas, Clopidogrel): aumento do risco de sangramentos e hemorragias digestivas.',
    'Metotrexato: meloxicam pode reduzir a depuração renal de metotrexato, aumentando a toxicidade hematológica e medular.',
  ],

  attentionSubtitle:
    'Euvolemia mandatória, contraindicação absoluta de sobreposição com corticoides e diretrizes de precisão para uso crônico felino.',

  attentionData: {
    precautions: [
      {
        condition: 'Hipovolemia, Desidratação e Choque Hemodinâmico',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Em condições de hipovolemia ou choque, o sistema renina-angiotensina-aldosterona e a noradrenalina induzem intensa vasoconstrição arteriolar renal. O rim preserva o fluxo sanguíneo medular através da síntese compensatória de PGE2 e PGI2 vasodilatadoras. O meloxicam inibe essa resposta de proteção, desencadeando colapso da taxa de filtração glomerular e necrose tubular isquêmica aguda.',
        clinicalAction:
          'Não administrar meloxicam sob hipótese alguma antes da completa reidratação e estabilização hemodinâmica do paciente.',
      },
      {
        condition: 'Uso Concomitante ou Sobreposto de Corticosteroides ou Outro AINE',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A associação de dois AINEs ou de um AINE com glicocorticoide inibe simultaneamente a fosfolipase A2 e as enzimas COX-1/COX-2, eliminando totalmente as prostaglandinas protetoras da barreira mucosa gástrica (muco e bicarbonato) e reduzindo a renovação epitelial celular, deflagrando ulcerações pépticas profundas e perfuração gastrointestinal.',
        clinicalAction:
          'Contraindicação formal absoluta. Respeitar um período de washout de 3 a 5 dias entre diferentes AINEs e de 5 a 7 dias após o término de corticosteroides antes de iniciar meloxicam.',
      },
      {
        condition: 'Doença Renal Crônica (DRC) Felina Descompensada ou Instável',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Gatos com DRC descompensada, azotemia progressiva, desidratação crônica ou anorexia apresentam rim altamente vulnerável a oscilações hemodinâmicas. A perda do mecanismo de vasodilatação das prostaglandinas renais pode acelerar a perda irreversível de néfrons remanescentes.',
        clinicalAction:
          'Contraindicado em DRC instável ou estágio 4 da IRIS. Reservar o uso crônico exclusivamente para gatos estáveis (IRIS 1 a 3) hidratados, normotensos e monitorados, na dose ultrabaixa de 0,02 mg/kg/dia.',
      },
      {
        condition: 'Hipotensão Intraoperatória sob Anestesia Geral Inalatória',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Anestésicos inalatórios (isoflurano e sevoflurano) provocam vasodilatação sistêmica dose-dependente e queda da pressão arterial média. Se o meloxicam for administrado antes ou durante uma hipotensão sustentada, o rim não conseguirá manter o tônus glomerular autorregulatório.',
        clinicalAction:
          'Monitorar a pressão arterial média (PAM acima de 65-70 mmHg). Em cirurgias de risco ou animais debilitados, administrar a primeira dose de meloxicam apenas no período pós-operatório imediato, após confirmação de normotensão e recuperação hemodinâmica.',
      },
      {
        condition: 'Doença Ulcerativa Gastrointestinal ou Histórico de Hemorragia Digestiva',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Mesmo sendo COX-2 preferencial, o meloxicam inibe parcialmente a COX-1 e pode prejudicar a cicatrização de úlceras preexistentes na mucosa gástrica ou duodenal, potencializando sangramentos activos.',
        clinicalAction:
          'Contraindicado na presença de úlcera gástrica ativa, melena ou vômito em borra de café. Priorizar analgésicos sem ação anti-inflamatória (como opioides, paracetamol exclusivo para cães ou dipirona com cautela).',
      },
      {
        condition: 'Hepatopatia Descompensada e Hipoalbuminemia Severa',
        alertLevel: 'caution',
        physiologicalExplanation:
          'O meloxicam liga-se em 97% à albumina plasmática e sofre depuração hepática. Em pacientes com albumina sérica menor que 2,0 g/dL ou insuficiência hepática, a fração livre circulante aumenta marcadamente, elevando a toxicidade renal e gastrointestinal.',
        clinicalAction:
          'Avaliar função hepática previamente. Em animais hipoalbuminêmicos, titular a dose para 50% do valor padrão e monitorar enzimas hepáticas e função renal precocemente.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Vômito e Irritação Gástrica',
        frequency: 'common',
        mechanism:
          'Inibição parcial da síntese basal de PGE2 na mucosa gástrica e irritação mecânica tópica do epitélio gastrointestinal.',
        clinicalManagement:
          'Suspender a medicação imediatamente. Administrar o fármaco sempre com alimento nas retomadas. Se houver vômito persistente, prescrever antieméticos (maropitant) e protetores mucosos (sucralfato/omeprazol) e reavaliar o paciente.',
      },
      {
        effect: 'Hiporexia e Anorexia',
        frequency: 'common',
        mechanism:
          'Desconforto gástrico subclínico, náusea leve e alteração da integridade da barreira mucosa digestiva.',
        clinicalManagement:
          'Orientar o tutor a nunca forçar a ingestão se o animal recusar alimento. Interromper o uso e verificar se há gastrite erosiva incipiente.',
      },
      {
        effect: 'Diarreia e Fezes Pastosas',
        frequency: 'common',
        mechanism:
          'Alteração do trânsito intestinal e perda da integridade funcional dos enterócitos por modulação de prostanoides intestinais.',
        clinicalManagement:
          'Avaliar consistência fecal. Se leve e sem sangue, monitorar e garantir hidratação. Se persistente ou com muco/sangue, suspender meloxicam.',
      },
      {
        effect: 'Melena e Hematêmese por Úlcera Gastrointestinal',
        frequency: 'rare',
        mechanism:
          'Erosão profunda da mucosa digestiva decorrente de inibição crônica de COX-1/COX-2 e microtrombose de capilares da mucosa.',
        clinicalManagement:
          'Emergência clínica. Suspender imediatamente o meloxicam. Iniciar fluidoterapia de suporte, inibidores de bomba de prótons (omeprazol IV), sucralfato e suporte transfusional se anemia hemorrágica importante.',
      },
      {
        effect: 'Lesão Renal Aguda Isquêmica e Azotemia',
        frequency: 'uncommon',
        mechanism:
          'Supressão de prostaglandinas vasodilatadoras renais (PGE2 e PGI2) em animais com perfusão renal previamente limítrofe ou desidratação.',
        clinicalManagement:
          'Suspender o AINE. Instituir fluidoterapia balanceada endovenosa para restabelecer a volemia. Monitorar débito urinário, creatinina, ureia, eletrólitos e pressão arterial a cada 24 horas.',
      },
      {
        effect: 'Hepatite Tóxica Idiossincrática',
        frequency: 'rare',
        mechanism:
          'Reação imunoalérgica ou metabólica individual não dependente da dose, desencadeando necrose hepatocelular focal.',
        clinicalManagement:
          'Suspender o meloxicam definitivamente. Monitorar ALT, AST, bilirrubinas e fornecer suporte hepatoprotetor com antioxidantes (S-adenosilmetionina e N-acetilcisteína).',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Gatos com Osteoartrite e Doença Renal Crônica Estável (IRIS 1 a 3)',
        recommendedAdjustment:
          'Não iniciar com 0,05 ou 0,1 mg/kg. Prescrever diretamente a dose ultrabaixa de 0,02 mg/kg VO a cada 24 horas (ou 48 horas conforme estabilidade), utilizando suspensão líquida 1 mg/mL.',
        physiologicalRationale:
          'Comprovado no estudo prospectivo de KuKanich et al. (2021) que 0,02 mg/kg/dia durante 6 meses não provocou elevação na creatinina ou biomarcadores de lesão tubular renal frente ao placebo em gatos IRIS 2 e 3 euvolêmicos.',
      },
      {
        clinicalCondition: 'Cães Idosos com Artrose em Terapia Prolongada de Manutenção',
        recommendedAdjustment:
          'Após o controle inicial da crise álgica com 0,1 mg/kg SID por 7 a 14 dias, titular progressivamente para 0,05 mg/kg VO a cada 24 horas ou 0,1 mg/kg em dias alternados.',
        physiologicalRationale:
          'Minimiza a exposição sistêmica crônica à inibição enzimática, mantendo a analgesia articular sinovial e reduzindo o risco acumulado de gastropatia e sobrecarga renal.',
      },
      {
        clinicalCondition: 'Hipoalbuminemia Moderada a Grave (Albumina sérica menor que 2,0 g/dL)',
        recommendedAdjustment:
          'Reduzir a dose administrada em 30% a 50% e monitorar sinais de toxicidade digestiva precocemente.',
        physiologicalRationale:
          'Com 97% de ligação proteica usual, a redução acentuada da albumina eleva a fração livre farmacologicamente ativa do meloxicam, potencializando tanto o efeito analgésico quanto os eventos adversos.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Corticosteroides (Prednisolona, Dexametasona, Triancinolona)',
        severity: 'contraindicated',
        clinicalEffect:
          'Multiplicação exponencial do risco de úlcera gástrica profunda, hemorragia digestiva maciça e perfuração intestinal.',
        pharmacologicalMechanism:
          'O corticosteroide inibe a fosfolipase A2 e o AINE inibe a COX, cessando completamente a síntese de prostaglandinas citoprotetoras e prejudicando a renovação e angiogênese epitelial.',
      },
      {
        drugOrClass: 'Outros AINEs (Carprofeno, Firocoxib, Robenacoxib, Cetoprofeno)',
        severity: 'contraindicated',
        clinicalEffect:
          'Toxicidade cumulativa digestiva e renal severa sem qualquer ganho adicional de analgesia.',
        pharmacologicalMechanism:
          'Inibição enzimática duplicada de COX-1 e COX-2 e saturação da depuração hepática e da ligação proteica.',
      },
      {
        drugOrClass: 'Antibióticos Aminoglicosídeos (Gentamicina, Amicacina)',
        severity: 'major',
        clinicalEffect: 'Risco muito elevado de necrose tubular renal aguda e insuficiência renal.',
        pharmacologicalMechanism:
          'O aminoglicosídeo acumula-se nos lisossomos das células tubulares proximais provocando citotoxicidade direta; a inibição da COX pelo meloxicam reduz o fluxo sanguíneo cortical e medular, agravando a isquemia e a toxicidade tubular.',
      },
      {
        drugOrClass: 'Diuréticos de Alça e Tiazídicos (Furosemida, Torsemida, Hidroclorotiazida)',
        severity: 'major',
        clinicalEffect: 'Queda brusca da filtração glomerular e perda da resposta diurética natriurética.',
        pharmacologicalMechanism:
          'A furosemida estimula prostaglandinas vasodilatadoras renais para exercer seu efeito pleno e pode induzir hipovolemia relativa; o meloxicam bloqueia essa via, gerando azotemia pré-renal.',
      },
      {
        drugOrClass: 'Inibidores da ECA e Bloqueadores de Receptores de Angiotensina (Benazepril, Enalapril, Telmisartana)',
        severity: 'major',
        clinicalEffect: 'Risco de colapso agudo da taxa de filtração glomerular glomerular e hipercalemia.',
        pharmacologicalMechanism:
          'O meloxicam constringe a arteríola aferente renal (por bloqueio de PGE2 vasodilatadora) enquanto o IECA/BRA dilata a arteríola eferente (bloqueando a angiotensina II). A perda combinada de tônus nas duas arteríolas abole a pressão de filtração capilar glomerular.',
      },
      {
        drugOrClass: 'Ciclosporina',
        severity: 'major',
        clinicalEffect: 'Nefrotoxicidade potencializada e elevação precoce de creatinina sérica.',
        pharmacologicalMechanism:
          'A ciclosporina induz vasoconstrição arteriolar renal direta dependente de endotelina e tono simpático; a supressão de prostanoides vasodilatadores de resgate pelo AINE potencializa a isquemia renal.',
      },
      {
        drugOrClass: 'Anticoagulantes e Antiplaquetários (Varfarina, Heparinas, Clopidogrel)',
        severity: 'major',
        clinicalEffect: 'Maior propensão a hemorragias cirúrgicas e sangramento oculto no trato gastrointestinal.',
        pharmacologicalMechanism:
          'Inibição de agregação plaquetária pela hemostasia primária combinada à irritação da mucosa digestiva.',
      },
      {
        drugOrClass: 'Metotrexato',
        severity: 'major',
        clinicalEffect: 'Mielossupressão grave, leucopenia e estomatite hemorrágica por intoxicação de metotrexato.',
        pharmacologicalMechanism:
          'Os AINEs inibem a secreção tubular renal competitiva do metotrexato e competem pela ligação a proteínas plasmáticas, elevando consideravelmente sua concentração livre sérica.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: ['Não recomendado para diluição contínua em bolsas de fluidoterapia'],
      incompatibleFluids: [
        'Soluções com eletrólitos concentrados',
        'Outros medicamentos injetáveis na mesma seringa',
      ],
      infusionRateGuidance:
        'Velocidade máxima de infusão não estabelecida clinicamente para CRI veterinário rotineiro. Administrar o produto injetável puro, por injeção intravenosa lenta em cães ou subcutânea em cães e gatos.',
      preparationNotes:
        'Não misturar meloxicam com outros fármacos na mesma seringa ou no mesmo equipo de fluidoterapia. Utilizar exclusivamente agulhas e seringas limpas e descartáveis.',
      diluentsCompatible: [],
      incompatibilities: ['Incompatibilidade física com soluções ácidas e outros fármacos injetáveis'],
      infusionRate: 'Não estabelecida para infusão contínua rotineira',
      storageRequirements:
        'Conservar em temperatura ambiente entre 15°C e 30°C, ao abrigo da luz solar e da umidade. Para suspensões orais, respeitar o prazo de validade de até 6 meses após a abertura do frasco original.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Administrar diretamente na cavidade oral ou misturado a uma pequena quantidade de alimento palatável úmido. Frascos de solução/suspensão líquida devem ser rigorosamente agitados antes da aspiração da dose.',
        nursingCare:
          'Certificar-se de que o paciente ingeriu o volume total. Oferecer água fresca à vontade e instruir o tutor a monitorar vômitos ou fezes escuras nas primeiras 24 a 48 horas.',
        limitations:
          'Não utilizar em animais com vômitos frequentes, regurgitação profusa ou suspeita de obstrução mecânica esofágica/gástrica.',
      },
      {
        route: 'Subcutânea (SC)',
        technique:
          'Elevar uma prega cutânea na região interescapular ou dorso-lateral, desinfetar com álcool a 70% e introduzir a agulha estéril com aspiração prévia negativa.',
        nursingCare:
          'Alternar os sítios de aplicação em casos de aplicações repetidas. Observar formação de rubor, nódulo inflamatório estéril ou desconforto local.',
        limitations:
          'Absorção retardada em animais profundamente desidratados ou com hipotermia severa periférica.',
      },
      {
        route: 'Intravenosa (IV)',
        technique:
          'Aplicar por via venosa direta lenta (mínimo de 60 a 90 segundos) exclusivamente com soluções injetáveis licenciadas para cães (como Maxicam 0,2%). Não aplicar em bolus rápido.',
        nursingCare:
          'Conferir a permeabilidade do acesso venoso prévio e verificar frequência cardíaca e pulso periférico durante a injeção.',
        limitations:
          'Não recomendada por via IV rotineira em gatos pela maioria das bulas veterinárias oficiais (preferir via SC em felinos).',
      },
      {
        route: 'Intramuscular (IM)',
        technique:
          'Injeção profunda na musculatura lombar epaxial ou no grupo muscular semitendíneo/semimembranoso, com tração de êmbolo para descartar vaso sanguíneo.',
        nursingCare:
          'Massagear suavemente o local da aplicação; evitar injeções repetidas na mesma massa muscular devido a desconforto mecânico.',
        limitations: 'Pode causar desconforto álgico agudo transitório no local da injeção.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Oxicam derivado do ácido enólico (1,2-benzotiazina-carboxamida)',
      chemicalClassDescription:
        'Composto orgânico caracterizado por um anel 1,2-benzotiazínico ligado a um grupo carboxamida com anel tiazólico e hidroxila enólica ácida (pKa aproximado de 4,08).',
      therapeuticClass: 'Anti-inflamatório Não Esteroidal (AINE) Inibidor Preferencial da COX-2',
      therapeuticClassDescription:
        'Agente analgésico, anti-inflamatório periférico e antipirético central que bloqueia primordialmente a ciclo-oxigenase-2 em tecidos lesados com menor bloqueio inicial de COX-1.',
      atcCode: 'QM01AC06',
      receptorTargets: [
        'Ciclo-oxigenase-2 (COX-2 / PTGS2)',
        'Ciclo-oxigenase-1 (COX-1 / PTGS1 - em doses altas)',
        'Cascata dos Receptores de Prostaglandina E2 (EP1, EP2, EP3, EP4)',
      ],
      receptorsAndSites: [
        {
          name: 'Ciclo-oxigenase-2 (COX-2 / PTGS2)',
          type: 'Enzima intracelular citoplasmática e microssomal induzida',
          action: 'Inibição catalítica preferencial reversível',
          clinicalEffect:
            'Bloqueia a síntese de PGH2 e PGE2 nos focos articulares e cirúrgicos, promovendo potente analgesia e ação anti-inflamatória.',
        },
        {
          name: 'Ciclo-oxigenase-1 (COX-1 / PTGS1)',
          type: 'Enzima constitutiva tecidual basal',
          action: 'Poupança em doses baixas; inibição parcial em altas concentrações',
          clinicalEffect:
            'Preserva em doses clínicas corretas a síntese de PGE2 gástrica e o tromboxano plaquetário; inibição indesejada desencadeia erosões pépticas.',
        },
        {
          name: 'Receptores EP2 / EP4 de Prostaglandina E2',
          type: 'Receptores acoplados a proteína Gs downstream',
          action: 'Redução indireta de ligante endógeno (PGE2)',
          clinicalEffect:
            'Diminui a concentração intracelular de cAMP em neurônios nociceptivos, reduzindo a hiperalgesia e a alodinia mecânica articular.',
        },
      ],
      detailedTargets: [
        {
          target: 'COX-2 (PTGS2)',
          action: 'Inibição preferencial reversível',
          clinicalSignificance:
            'Redução rápida de edema articular, calor local, dor inflamatória sinovial e febre hipotalâmica.',
        },
        {
          target: 'COX-1 (PTGS1)',
          action: 'Inibição concentração-dependente secundária',
          clinicalSignificance:
            'Explica o aparecimento de vômitos, gastrite e microerosões se a dose for ultrapassada ou em animais predispostos.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receituário Veterinário Simples (1 via)',
      ordinanceOrLaw: 'Venda sob prescrição e aplicação sob orientação do Médico-Veterinário (MAPA)',
      retentionRequired: false,
      guidelines:
        'Medicamento não sujeito a controle especial da Portaria SVS/MS 344/1998 nem da Portaria MAPA 837/2025. Prescrição veterinária em via única contendo identificação do paciente, espécie, posologia exata e orientações de segurança.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Excelente Tolerabilidade em Osteoartrite Crônica e Ampla Evidência Clínica',
        description:
          'O cão possui ampla validação científica para uso do meloxicam em osteoartrite crônica por períodos prolongados de meses a anos. A posologia clássica de 0,2 mg/kg no dia 1 seguida por 0,1 mg/kg a cada 24 horas proporciona alívio rápido e sustentado. A meia-vida canina de aproximadamente 24 horas permite administração cômoda em regime SID.',
        clinicalImplications:
          'Embora bem tolerado em animais hígidos, a terapia crônica exige exames laboratoriais semestrais para monitorar função renal e hepática.',
      },
      {
        species: 'cat',
        title: 'Metabolismo Oxidativo Fecal, Estreita Janela Terapêutica e Consenso ISFM 2024',
        description:
          'Diferentemente de outros fármacos, o meloxicam não é dependente de glicuronidação em gatos, sendo depurado predominantemente por oxidação hepática e eliminado 79% pelas fezes. Contudo, gatos apresentam meia-vida prolongada (25 a 37 horas) e índice terapêutico estreito. Enquanto a FDA americana mantém alerta contra repetição pela bula de 0,3 mg/kg, o consenso internacional ISFM/AAFP 2024 e ensaios clínicos modernos consolidaram o uso crônico em doses ultrabaixas (0,01 a 0,03 mg/kg/dia) com excelente segurança em gatos euvolêmicos.',
        clinicalImplications:
          'Nunca utilizar comprimidos humanos. Prescrever exclusivamente formulações líquidas veterinárias com dosador em seringa milimétrica.',
      },
    ],

    curiositiesAndHistory: [
      'Desenvolvido na década de 1980 pela Boehringer Ingelheim como parte da pesquisa de oxicams de segunda geração com maior tolerabilidade digestiva.',
      'Foi um dos primeiros AINEs veterinários a demonstrar expressiva seletividade preferencial para a COX-2 em sangue total de cães em ensaios in vitro.',
      'A controvérsia do boxed warning emitido pela FDA em 2010 decorreu de casos de falência renal felina após repetição de doses elevadas injetáveis de 0,3 mg/kg. Essa advertência motivou ensaios prospectivos mundiais que descobriram que a dose de 0,01 a 0,02 mg/kg/dia é extremamente segura e eficaz para felinos idosos.',
      'No Brasil, formulações pioneiras como Maxicam (Ourofino) e Flamavet (Agener) popularizaram a concentração de 1 mg/mL em solução oral com seringa milimetrada, simplificando o cálculo exato de 0,1 mL/kg para cães e frações milimétricas para gatos.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Dose Padrão: Cão Manutenção = 0,1 mg/kg VO q24h (Dose Dia 1 = 0,2 mg/kg, dobrar o volume). Solução Oral 1 mg/mL (1 mL = 1 mg; 0,1 mL/kg) e Comprimidos Bissulcados de 0,5 mg e 2 mg.',
    headers: [
      'Peso Corporal (kg)',
      'Dose Alvo (0,1 mg/kg)',
      'Volume Solução Oral 1 mg/mL',
      'Comprimidos de 0,5 mg',
      'Comprimidos de 2 mg',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '0,2 mg',
        col1: '0,2 mL',
        col2: 'Preferir solução líquida',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '4 kg',
        totalDose: '0,4 mg',
        col1: '0,4 mL',
        col2: 'Preferir solução líquida',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '5 kg',
        totalDose: '0,5 mg',
        col1: '0,5 mL',
        col2: '1 comprimido de 0,5 mg',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '10 kg',
        totalDose: '1,0 mg',
        col1: '1,0 mL',
        col2: '2 comprimidos de 0,5 mg',
        col3: '1/2 comprimido de 2 mg',
      },
      {
        weight: '15 kg',
        totalDose: '1,5 mg',
        col1: '1,5 mL',
        col2: '3 comprimidos de 0,5 mg',
        col3: '3/4 comprimido de 2 mg*',
      },
      {
        weight: '20 kg',
        totalDose: '2,0 mg',
        col1: '2,0 mL',
        col2: 'Inviável (muitos comprimidos)',
        col3: '1 comprimido de 2 mg',
      },
      {
        weight: '30 kg',
        totalDose: '3,0 mg',
        col1: '3,0 mL',
        col2: 'Inviável (muitos comprimidos)',
        col3: '1 e 1/2 comprimido de 2 mg',
      },
      {
        weight: '40 kg',
        totalDose: '4,0 mg',
        col1: '4,0 mL',
        col2: 'Inviável (muitos comprimidos)',
        col3: '2 comprimidos de 2 mg',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador de Precisão com Solução Oral 1 mg/mL (0,1%) para Cães e Gatos',
      concentration: '1 mg/mL (1 mL contém exatamente 1 mg de meloxicam ativo)',
      dropletRatio: 'Volume (mL) = [Peso do animal (kg) x Dose desejada (mg/kg)] / 1 mg/mL',
      practicalRule:
        'Cão Manutenção (0,1 mg/kg) = 0,1 mL por kg de peso corporal via oral a cada 24 horas. Cão Dia 1 (0,2 mg/kg) = 0,2 mL por kg. Gato Inicial (0,05 mg/kg) = 0,05 mL por kg. Gato Dose Baixa DRC Estável (0,02 mg/kg) = 0,02 mL por kg.',
      note: 'Em gatos e cães com menos de 5 kg, utilizar sempre seringa graduada milimétrica (ex.: seringa de 1 mL ou seringa de insulina de 100 UI onde cada unidade equivale a 0,01 mL), evitando a contagem de gotas livres devido à variação do diâmetro dos gotejadores.',
    },
  },

  samplePrescriptionText:
    'MODELO 1 — CÃO COM OSTEOARTRITE CRÔNICA:\nUSO ORAL\n1. MAXICAM® Solução Oral 1 mg/mL — frasco com 15 mL e seringa dosadora......... 1 frasco\nAdministrar por via oral, misturado ao alimento úmido ou diretamente na boca, conforme o seguinte cronograma:\n- Primeiro dia: administrar 0,2 mL para cada 1 kg de peso corporal (0,2 mg/kg), em dose única.\n- Do segundo dia em diante: administrar 0,1 mL para cada 1 kg de peso corporal (0,1 mg/kg), a cada 24 horas (SID), durante 14 dias consecutivos.\nReavaliação clínica e laboratorial agendada para 14 dias.\nORIENTAÇÕES AO TUTOR: Manter água fresca e limpa à vontade. Suspender a medicação imediatamente e entrar em contato com a clínica caso o animal apresente vômitos, perda de apetite, fezes pastosas, fezes escuras com aspecto de borra de café ou apatia. Não administrar simultaneamente nenhum outro anti-inflamatório ou corticosteroide.\n\n--------------------------------------------------------------------------------\n\nMODELO 2 — GATO COM DOENÇA ARTICULAR DEGENERATIVA (DOSE BAIXA CONTÍNUA):\nUSO ORAL\n1. MAXICAM® Solução Oral 1 mg/mL — frasco com 15 mL com seringa dosadora......... 1 frasco\nAdministrar por via oral, junto a um petisco úmido palatável ou diretamente na comissura labial:\n- Administrar exatamente 0,02 mL para cada 1 kg de peso corporal (dose de 0,02 mg/kg; ex.: para gato de 4 kg = 0,08 mL), a cada 24 horas (SID), pela manhã, por período contínuo sob acompanhamento veterinário.\nORIENTAÇÕES AO TUTOR: Utilizar exclusivamente a seringa dosadora de precisão milimétrica. O animal deve estar rigorosamente hidratado e comendo normalmente. Retornar para controle de pressão arterial e exames de sangue e urina a cada 3 meses. Suspender se o paciente apresentar recusa alimentar ou episódios de vômito.',

  genericBrandsNote:
    'No Brasil, o meloxicam para uso veterinário é comercializado sob marcas conceituadas como Maxicam (Ourofino Saúde Animal), Flamavet (Agener União), Mellis Vet (Avert Saúde Animal), Elo-Xicam (Chemitec) e Maxitec (Syntec), registradas junto ao MAPA sob o regime de Receituário Veterinário Simples (1 via sem retenção obrigatória). Na medicina humana, existem diversas marcas de genéricos e similares (ex.: Movatec 7,5 mg e 15 mg), contudo sua concentração elevada inviabiliza a titulação fracionada segura para cães de pequeno porte e gatos, sendo altamente desaconselhada na rotina de pequenos animais.',

  clinicalFoundationsData: [
    {
      id: 'foundations-oa-canina',
      title: 'Eficácia Analgésica e Melhora Funcional na Osteoartrite Canina',
      narrative:
        'A eficácia clínica do meloxicam no controle dos sinais de osteoartrite em cães foi comprovada em múltiplos ensaios clínicos prospectivos duplo-cegos e controlados por placebo. O estudo de Peterson & Keefe (2004) com 217 cães estabeleceu o padrão do protocolo de dose de ataque (0,2 mg/kg) seguida por manutenção diária (0,1 mg/kg), demonstrando redução altamente significativa dos escores de claudicação e dor à manipulação em comparação ao grupo controle. Adicionalmente, estudos de segurança de longo prazo como o ensaio de Luna et al. (2007) avaliaram a administração diária de meloxicam por 90 dias consecutivos em cães saudáveis, confirmando a excelente tolerabilidade hematológica, bioquímica e a integridade da mucosa digestiva quando administrado na posologia recomendada sob euvolemia.',
      narrativeHighlights: [
        'Ensaio multicêntrico de 217 cães demonstrou melhora rápida de mobilidade e claudicação em 14 dias.',
        'Estudo comparativo de 90 dias em cães (Luna et al. 2007) atestou estabilidade renal e hepática em animais sadios.',
        'Dose de ataque inicial de 0,2 mg/kg permite atingir o estado de equilíbrio (steady-state) analgésico no primeiro dia.',
      ],
      studies: [
        {
          citation:
            'Peterson KD, Keefe TJ. Effects of meloxicam on severity of lameness and other clinical signs of osteoarthritis in dogs. JAVMA 2004; 225(7): 1056-1060.',
          referenceId: 'ref-peterson-2004',
          sourceType: 'Ensaio Clínico Randomizado Controlado Duplo-Cego',
          summaryText:
            'Avaliou 217 cães portadores de osteoartrite divididos entre meloxicam (n=105) na dose de 0,2 mg/kg no dia 1 e 0,1 mg/kg q24h nos dias 2 a 14 versus placebo (n=112). Os cães tratados com meloxicam apresentaram melhora estatisticamente superior em todos os índices de claudicação, dor articular e disposição funcional.',
          summaryHighlights: [
            '217 cães avaliados em ambiente clínico multicêntrico.',
            'Redução significativa do escore de claudicação (p < 0,01) frente ao placebo.',
            'Excelente aceitação do produto em suspensão oral palatável.',
          ],
          metrics: [
            'Amostra: 217 cães com osteoartrite',
            'Duração: 14 dias',
            'Desfecho: Superioridade clínica estatisticamente comprovada frente ao placebo (p < 0,05)',
          ],
          clinicalConclusion:
            'O meloxicam oral é altamente eficaz no alívio da dor osteoartrítica e claudicação em cães no regime de 0,2 mg/kg seguido de 0,1 mg/kg a cada 24 horas.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/15515983/',
        },
        {
          citation:
            'Luna SPL, Basílio AC, Steagall PVM, et al. Evaluation of adverse effects of long-term oral administration of carprofen, etodolac, flunixin meglumine, ketoprofen, and meloxicam in dogs. AJVR 2007; 68: 258-264.',
          referenceId: 'ref-luna-2007',
          sourceType: 'Ensaio Clínico Experimental Controlado de Longo Prazo',
          summaryText:
            'Comparou os efeitos adversos da administração oral continuada de 5 AINEs durante 90 dias em 36 cães. O grupo meloxicam recebeu 0,1 mg/kg q24h e manteve parâmetros hematológicos, urinálise, bioquímica sérica renal e hepática e pesquisa de sangue oculto fecal dentro dos limites fisiológicos ao longo do estudo.',
          summaryHighlights: [
            '90 dias consecutivos de tratamento oral diário.',
            'Ausência de sangramento digestivo oculto ou lesão renal em cães hígidos euvolêmicos.',
            'Ressalta a segurança da manutenção a 0,1 mg/kg quando respeitadas as condições basais de hidratação.',
          ],
          metrics: [
            'Amostra: 36 cães saudáveis',
            'Duração: 90 dias consecutivos',
            'Tolerabilidade: Alta, sem lesões endoscópicas severas ou azotemia',
          ],
          clinicalConclusion:
            'O meloxicam administrado a 0,1 mg/kg/dia por até 90 dias apresenta elevado perfil de segurança em cães hígidos e euvolêmicos.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/17331014/',
        },
      ],
    },
    {
      id: 'foundations-djd-felina-drc',
      title: 'AINEs Crônicos em Gatos, Consenso ISFM/AAFP 2024 e o Paradigma da DRC Estável',
      narrative:
        'Historicamente, a utilização de AINEs em felinos foi cercada de receio devido ao boxed warning da FDA de 2010. Contudo, pesquisas clínicas ao longo das últimas duas décadas mudaram radicalmente esse paradigma. O estudo seminal de Gunew et al. (2008) demonstrou em 40 gatos com osteoartrite que doses de 0,01 a 0,03 mg/kg q24h conferiram melhora clínica expressiva em 85% dos animais tratados por quase 6 meses sem deterioração renal detectável. Posteriormente, o estudo prospectivo de KuKanich et al. (2021) avaliou gatos idosos com DRC confirmada (IRIS 2 e 3) recebendo 0,02 mg/kg q24h por 6 meses e não encontrou alterações significativas em creatinina, TFG, SDMA ou biomarcadores de lesão tubular precoce quando comparados ao grupo placebo. Essas evidências culminaram no recente Consenso Internacional ISFM/AAFP 2024 sobre o uso prolongado de AINEs em gatos, que chancelou o uso contínuo de doses ultrabaixas individualizadas em gatos selecionados, inclusive portadores de DRC estável, enfatizando que o fator determinante para a lesão renal não é a DRC em si, mas sim a coexistência de hipovolemia, desidratação e hipotensão.',
      narrativeHighlights: [
        'Gunew et al. (2008): 85% de eficácia em dor crônica felina com baixíssima incidência de queixas gastrointestinais (4%).',
        'KuKanich et al. (2021): 0,02 mg/kg/dia não provocou piora de creatinina, TFG ou SDMA em gatos com DRC IRIS 2-3 estáveis ao longo de 6 meses.',
        'Consenso ISFM/AAFP 2024: AINEs de baixa dose são elegíveis para gatos com DRC estável (IRIS 1 a 3) desde que normotensos e euvolêmicos.',
        'Rim desidratado depende de prostaglandinas vasodilatadoras; rim euvolêmico tolera inibição enzimática titulada.',
      ],
      studies: [
        {
          citation:
            'KuKanich K, George C, Roush JK, et al. Effects of low-dose meloxicam in cats with chronic kidney disease. JFMS 2021; 23: 138-148.',
          referenceId: 'ref-kukanich-2021',
          sourceType: 'Ensaio Clínico Prospectivo Randomizado Duplo-Cego Placebo-Controlado',
          summaryText:
            'Avaliou a segurança renal de meloxicam na dose de 0,02 mg/kg VO a cada 24 horas durante 6 meses em 21 gatos com doença renal crônica estável nos estágios 2 e 3 da IRIS. Não foram detectadas diferenças significativas entre o grupo meloxicam e o grupo placebo em creatinina, ureia, SDMA, TFG, pressão arterial ou novos biomarcadores urinários de lesão renal (clusterina e cistatina B).',
          summaryHighlights: [
            '21 gatos com DRC confirmada (IRIS 2 e 3) tratados por 6 meses.',
            'Ausência de declínio na função renal ou progressão de azotemia em relação ao placebo.',
            'Reforça que a estabilidade clínica e hidratação são os requisitos fundamentais para segurança.',
          ],
          metrics: [
            'Amostra: 21 gatos com DRC estável',
            'Dose: 0,02 mg/kg VO q24h por 6 meses',
            'Desfecho Primário: Nenhuma alteração significativa na creatinina, TFG ou biomarcadores urinários (p > 0,05)',
          ],
          clinicalConclusion:
            'Em gatos com DRC estável, normotensos e euvolêmicos, o meloxicam na dose ultrabaixa de 0,02 mg/kg/dia por 6 meses não provocou deterioração mensurável da função renal.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/32594827/',
        },
        {
          citation:
            'Gunew MN, Menrath VH, Marshall RD. Long-term safety, efficacy and palatability of oral meloxicam at 0.01-0.03 mg/kg for treatment of osteoarthritic pain in cats. JFMS 2008; 10: 235-241.',
          referenceId: 'ref-gunew-2008',
          sourceType: 'Ensaio Clínico Prospectivo de Campo Aberto',
          summaryText:
            'Acompanhou 40 gatos com dor osteoartrítica tratados com meloxicam oral na dose de 0,01 a 0,03 mg/kg q24h por uma média de 5,8 meses. Os tutores relataram melhora clínica boa a excelente em 85% dos animais, com ocorrência de distúrbios digestivos em apenas 4% e sem elevação patológica de creatinina sérica.',
          summaryHighlights: [
            '40 gatos tratados continuamente por quase 6 meses.',
            '85% de satisfação dos tutores com melhora evidente de atividade e bem-estar.',
            'Incidência mínima de reações gastrointestinais (apenas 4%).',
          ],
          metrics: [
            'Amostra: 40 gatos com osteoartrite crônica',
            'Dose: 0,01 a 0,03 mg/kg q24h',
            'Tempo médio de acompanhamento: 5,8 meses',
          ],
          clinicalConclusion:
            'O meloxicam em doses tituladas de 0,01 a 0,03 mg/kg/dia é eficaz, altamente palatável e seguro para o manejo de longo prazo da dor crônica em felinos.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/18440263/',
        },
        {
          citation:
            'Hillen F, Polson S, Yates D, Watkinson R, White K. Robenacoxib versus meloxicam following ovariohysterectomy in cats: a randomised, prospective clinical trial involving owner-based assessment of pain. Vet Rec 2023; 193: e3264.',
          referenceId: 'ref-hillen-2023',
          sourceType: 'Ensaio Clínico Randomizado Prospectivo',
          summaryText:
            'Avaliou 141 gatas submetidas à ovariohisterectomia divididas entre meloxicam 0,2 mg/kg SC (n=76) e robenacoxib 2 mg/kg SC (n=65). No domicílio, 72% dos tutores atribuíram escore de dor zero às gatas no pós-operatório, confirmando robusto controle antinociceptivo perioperatório.',
          summaryHighlights: [
            '141 felinos avaliados no pós-operatório imediato e domiciliar.',
            'Controle efetivo da dor em mais de 70% dos animais sem necessidade de resgate.',
            'Sem relatos de complicações renais agudas perioperatórias na coorte.',
          ],
          metrics: [
            'Amostra: 141 gatas pós-OHE',
            'Dose: 0,2 mg/kg SC dose única perioperatória',
            'Escore de dor domiciliar: 72% dos tutores pontuaram dor zero',
          ],
          clinicalConclusion:
            'O meloxicam parenteral na dose de 0,2 mg/kg oferece excelente analgesia pós-operatória para cirurgias eletivas em felinos saudáveis.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/37494365/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Efeitos do Meloxicam na Claudicação e Sinais Clínicos da Osteoartrite em Cães',
      authorsYear: 'Peterson KD, Keefe TJ (2004)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio multicêntrico, randomizado, duplo-cego e placebo-controlado',
      sampleSize: '217 cães com osteoartrite clínica confirmada',
      mainFindings:
        'Demonstrou superioridade estatística expressiva do meloxicam (0,2 mg/kg no dia 1 e 0,1 mg/kg q24h nos dias 2-14) frente ao placebo na redução de escores de claudicação, rigidez articular e dor durante 14 dias de tratamento.',
      clinicalTakeaway:
        'Evidência padrão-ouro nível 1b que fundamenta a posologia clássica de ataque e manutenção do meloxicam em cães com osteoartrite.',
      referenceId: 'ref-peterson-2004',
    },
    {
      title: 'Avaliação dos Efeitos Adversos da Administração Oral Prolongada de AINEs por 90 Dias em Cães',
      authorsYear: 'Luna SPL, Basílio AC, Steagall PVM, et al. (2007)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Ensaio clínico experimental randomizado e controlado',
      sampleSize: '36 cães adultos saudáveis',
      mainFindings:
        'A administração de meloxicam a 0,1 mg/kg q24h durante 90 dias não causou alterações significativas em hemograma, bioquímica sérica, urinálise ou sangue oculto nas fezes em comparação aos animais controle.',
      clinicalTakeaway:
        'Confirma que o meloxicam na dose de manutenção de 0,1 mg/kg/dia é bem tolerado em cães hígidos por períodos de até 3 meses.',
      referenceId: 'ref-luna-2007',
    },
    {
      title: 'Segurança, Eficácia e Palatabilidade a Longo Prazo do Meloxicam Oral em Baixa Dose em Gatos com Osteoartrite',
      authorsYear: 'Gunew MN, Menrath VH, Marshall RD (2008)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio clínico prospectivo de campo em gatos com dor articular',
      sampleSize: '40 gatos tratados por período médio de 5,8 meses',
      mainFindings:
        'O uso continuado de meloxicam na faixa posológica de 0,01 a 0,03 mg/kg q24h proporcionou melhora clínica classificada como boa a excelente por 85% dos tutores, com eventos adversos gástricos limitados a 4% e estabilidade da função renal.',
      clinicalTakeaway:
        'Marco na analgesia felina que demonstrou a eficácia e tolerabilidade do regime de titulação para menor dose efetiva em longo prazo.',
      referenceId: 'ref-gunew-2008',
    },
    {
      title: 'Efeitos do Meloxicam em Baixa Dose em Gatos com Doença Renal Crônica',
      authorsYear: 'KuKanich K, George C, Roush JK, et al. (2021)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e placebo-controlado',
      sampleSize: '21 gatos com DRC estável nos estágios IRIS 2 e 3',
      mainFindings:
        'O tratamento com 0,02 mg/kg VO q24h de meloxicam durante 6 meses em gatos com DRC estável não acarretou alterações significativas em creatinina, ureia, TFG, SDMA ou biomarcadores urinários de lesão renal frente ao placebo.',
      clinicalTakeaway:
        'Comprova que felinos cuidadosamente selecionados com DRC estável e euvolêmicos toleram a dose de 0,02 mg/kg/dia de meloxicam por até 6 meses sem deterioração da função renal.',
      referenceId: 'ref-kukanich-2021',
    },
    {
      title: 'Robenacoxib versus Meloxicam no Controle da Dor Pós-Ovariohisterectomia em Gatas',
      authorsYear: 'Hillen F, Polson S, Yates D, Watkinson R, White K (2023)',
      journal: 'Veterinary Record',
      studyDesign: 'Ensaio clínico randomizado, prospectivo e cego',
      sampleSize: '141 gatas submetidas à cirurgia eletiva de OHE',
      mainFindings:
        'A dose de 0,2 mg/kg SC de meloxicam promoveu controle analgésico pós-operatório completo em 72% das gatas avaliadas pelos tutores no ambiente doméstico, sem intercorrências renais ou digestivas agudas.',
      clinicalTakeaway:
        'Sustenta a indicação do meloxicam como opção segura e eficiente para analgesia perioperatória imediata em cirurgias de tecidos moles em felinos saudáveis.',
      referenceId: 'ref-hillen-2023',
    },
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citation:
        'Plumb DC. Plumb’s Veterinary Drug Handbook, 10th edition. Wiley-Blackwell, 2023. Monografia Meloxicam, pp. 825–829.',
    },
    {
      id: 'ref-bsava-10',
      citation:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition. BSAVA, 2020. Monografia Meloxicam, pp. 250–252.',
    },
    {
      id: 'ref-bsava-nephrology-20',
      citation:
        'Elliott J, Grauer GF, Westropp JL. BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd edition. BSAVA, 2017. Chapter 20: Effects of non-steroidal anti-inflammatory drug treatment on the kidney, pp. 232–245.',
    },
    {
      id: 'ref-lumb-jones-2024',
      citation:
        'Grimm KA, Lamont LA, Tranquilli WJ, Robertson SA, Lovelace SA. Lumb & Jones Veterinary Anesthesia and Analgesia, 6th edition. Wiley-Blackwell, 2024. Chapter 24: Non-Steroidal Anti-Inflammatory Drugs, pp. 450–475.',
    },
    {
      id: 'ref-isfm-aafp-2024-nsaid',
      citation:
        'Sparkes AH, Heiene R, Lascelles BDX, et al. 2024 ISFM and AAFP Consensus Guidelines on the Long-Term Use of NSAIDs in Cats. Journal of Feline Medicine and Surgery 2024; 26: 1098612X241241951.',
    },
    {
      id: 'ref-kukanich-2021',
      citation:
        'KuKanich K, George C, Roush JK, et al. Effects of low-dose meloxicam in cats with chronic kidney disease. Journal of Feline Medicine and Surgery 2021; 23(2): 138–148.',
    },
    {
      id: 'ref-peterson-2004',
      citation:
        'Peterson KD, Keefe TJ. Effects of meloxicam on severity of lameness and other clinical signs of osteoarthritis in dogs. Journal of the American Veterinary Medical Association 2004; 225(7): 1056–1060.',
    },
    {
      id: 'ref-luna-2007',
      citation:
        'Luna SPL, Basílio AC, Steagall PVM, et al. Evaluation of adverse effects of long-term oral administration of carprofen, etodolac, flunixin meglumine, ketoprofen, and meloxicam in dogs. American Journal of Veterinary Research 2007; 68(3): 258–264.',
    },
    {
      id: 'ref-gunew-2008',
      citation:
        'Gunew MN, Menrath VH, Marshall RD. Long-term safety, efficacy and palatability of oral meloxicam at 0.01–0.03 mg/kg for treatment of osteoarthritic pain in cats. Journal of Feline Medicine and Surgery 2008; 10(3): 235–241.',
    },
    {
      id: 'ref-hillen-2023',
      citation:
        'Hillen F, Polson S, Yates D, Watkinson R, White K. Robenacoxib versus meloxicam following ovariohysterectomy in cats: a randomised, prospective clinical trial involving owner-based assessment of pain. Veterinary Record 2023; 193(7): e3264.',
    },
    {
      id: 'ref-isfm-2022-pain',
      citation:
        'Robertson SA, Gogolski SM, Pascoe P, et al. AAFP Feline Anesthesia Guidelines and ISFM Consensus Guidelines on Acute Pain Management. Journal of Feline Medicine and Surgery 2022; 24(1): 4–30.',
    },
  ],

  presentations: [
    {
      id: 'pres-maxicam-comp-05',
      name: 'Maxicam® Comprimidos 0,5 mg',
      brand: 'Ourofino Saúde Animal',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 0.5,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 1 blister com 10 comprimidos bissulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido com vinco central (bissulcado), divisível em 2 partes iguais de 0,25 mg',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos palatáveis de 0,5 mg',
    },
    {
      id: 'pres-maxicam-comp-2',
      name: 'Maxicam® Comprimidos 2,0 mg',
      brand: 'Ourofino Saúde Animal',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 2.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 1 blister com 10 comprimidos bissulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido com vinco em cruz (quadrisulcado), divisível em 4 partes iguais de 0,5 mg',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos palatáveis de 2 mg',
    },
    {
      id: 'pres-maxicam-sol-1',
      name: 'Maxicam® Solução Oral 1 mg/mL (0,1%)',
      brand: 'Ourofino Saúde Animal',
      form: 'Solução oral líquida em gotas / frasco dosador',
      concentrationValue: 1.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco conta-gotas de 15 mL com seringa dosadora graduada de precisão',
      route: 'Oral (VO)',
      scoringInfo: 'Líquido homogêneo; 1 mL contém 1 mg de meloxicam (0,1 mL para cada 1 kg em cães a 0,1 mg/kg)',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Frasco plástico de 15 mL com seringa dosadora milimetrada',
    },
    {
      id: 'pres-maxicam-inj-02',
      name: 'Maxicam® 0,2% Injetável (2 mg/mL)',
      brand: 'Ourofino Saúde Animal',
      form: 'Solução injetável estéril',
      concentrationValue: 2.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola de vidro âmbar com 20 mL',
      route: 'Subcutânea (SC), Intravenosa (IV) ou Intramuscular (IM)',
      scoringInfo: 'Líquido injetável estéril (1 mL contém 2 mg de meloxicam)',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Frasco-ampola de 20 mL de solução injetável a 0,2%',
    },
    {
      id: 'pres-flamavet-02',
      name: 'Flamavet® 0,2 mg Comprimidos',
      brand: 'Agener União Saúde Animal',
      form: 'Comprimido palatável',
      concentrationValue: 0.2,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível, ideal para titulação em pequenos felinos e cães miniatura',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho contendo 10 comprimidos de 0,2 mg',
    },
    {
      id: 'pres-flamavet-05',
      name: 'Flamavet® 0,5 mg Comprimidos',
      brand: 'Agener União Saúde Animal',
      form: 'Comprimido palatável',
      concentrationValue: 0.5,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido bissulcado divisível em duas partes de 0,25 mg',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos de 0,5 mg',
    },
    {
      id: 'pres-flamavet-2',
      name: 'Flamavet® 2,0 mg Comprimidos',
      brand: 'Agener União Saúde Animal',
      form: 'Comprimido palatável',
      concentrationValue: 2.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível para cães médios e grandes',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos de 2,0 mg',
    },
    {
      id: 'pres-mellis-02',
      name: 'Mellis Vet® 0,2 mg Comprimidos Palatáveis',
      brand: 'Avert Saúde Animal',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 0.2,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido divisível especialmente formulado para a espécie felina',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos de 0,2 mg',
    },
    {
      id: 'pres-mellis-05',
      name: 'Mellis Vet® 0,5 mg Comprimidos Palatáveis',
      brand: 'Avert Saúde Animal',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 0.5,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido bissulcado divisível',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos de 0,5 mg',
    },
    {
      id: 'pres-mellis-2',
      name: 'Mellis Vet® 2,0 mg Comprimidos Palatáveis',
      brand: 'Avert Saúde Animal',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 2.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 10 comprimidos palatáveis',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido bissulcado divisível para cães',
      channel: 'veterinary',
      commercialType: 'Veterinário Oficial (MAPA)',
      packageDescription: 'Cartucho com 10 comprimidos de 2 mg',
    },
  ],

  doses: [
    {
      id: 'dose-melox-dog-oa-oral',
      species: 'dog',
      indication: 'Osteoartrite e Dor Musculoesquelética Crônica (Canina)',
      clinicalContext: 'Tratamento de osteoartrite, espondilose e afecções articulares crônicas em cães.',
      doseMin: 0.2,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'Dose única de ataque no Dia 1; a partir do Dia 2, seguir com dose de manutenção.',
      duration: 'Dia 1 com dose de ataque; continuidade conforme plano terapêutico.',
      notes:
        'No primeiro dia de tratamento administrar a dose de ataque de 0,2 mg/kg VO com alimento. A partir do segundo dia, transicionar para 0,1 mg/kg VO a cada 24 horas.',
      monitoring: 'Avaliação clínica ortopédica aos 14 dias; acompanhamento semestral de bioquímica sérica renal e hepática.',
      referenceIds: ['ref-peterson-2004', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-sol-1',
      followUpPhases: [
        {
          doseValue: 0.1,
          frequency: 'A cada 24 horas (q24h)',
          duration: 'Manutenção contínua ou até reavaliação clínica',
          route: 'Oral (VO)',
        },
      ],
    },
    {
      id: 'dose-melox-dog-acute-oral',
      species: 'dog',
      indication: 'Dor e Inflamação Musculoesquelética Aguda / Trauma (Canina)',
      clinicalContext: 'Sinovites agudas, entorses, contusões musculares e trauma ortopédico fechado.',
      doseMin: 0.2,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h)',
      duration: '3 a 7 dias',
      notes:
        'Administrar 0,2 mg/kg VO no Dia 1 seguido por 0,1 mg/kg VO q24h nos dias 2 a 5. Suspender assim que os sinais clínicos regredirem.',
      monitoring: 'Monitorar vômitos, consistência fecal e apetite durante o ciclo curto.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Literatura Farmacológica Padrão',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-comp-05',
      followUpPhases: [
        {
          doseValue: 0.1,
          frequency: 'A cada 24 horas (q24h)',
          duration: '3 a 5 dias adicionais',
          route: 'Oral (VO)',
        },
      ],
    },
    {
      id: 'dose-melox-dog-periop-sc',
      species: 'dog',
      indication: 'Analgesia Perioperatória em Cães (Pré ou Pós-operatório)',
      clinicalContext: 'Cirurgias de tecidos moles e procedimentos ortopédicos sob anestesia geral e normotensão.',
      doseMin: 0.2,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Subcutânea (SC) ou Intravenosa (IV lenta)',
      frequency: 'Dose única perioperatória',
      duration: 'Dose única parenteral',
      notes:
        'Aplicar 0,2 mg/kg SC ou IV lento. Se o paciente apresentar hipotensão intraoperatória (PAM menor que 65 mmHg), retardar a administração para o término do procedimento quando o animal estiver recuperado e normotenso.',
      monitoring: 'Pressão arterial intraoperatória mandatória; débito urinário.',
      referenceIds: ['ref-bsava-10', 'ref-lumb-jones-2024'],
      evidenceLevel: 'Nível 1a — Consensos Internacionais de Anestesia e Analgesia Veterinária',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-inj-02',
    },
    {
      id: 'dose-melox-cat-acute-periop',
      species: 'cat',
      indication: 'Analgesia Perioperatória e Pós-Operatória em Gatos',
      clinicalContext: 'Cirurgias eletivas de tecidos moles (OHE, orquiectomia) em gatos hígidos e hidratados.',
      doseMin: 0.2,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Subcutânea (SC)',
      frequency: 'Dose única perioperatória',
      duration: 'Dose única parenteral; se necessário, continuidade oral a 0,05 mg/kg por até 4 dias.',
      notes:
        'Aplicar 0,2 mg/kg SC em dose única pré ou pós-operatória imediata. Manter estrita hidratação corporal. Nos dias seguintes, se indicado, prescrever suspensão oral a 0,05 mg/kg VO q24h por no máximo 4 dias.',
      monitoring: 'Retorno do apetite, ausência de vômitos, hidratação e micção normal.',
      referenceIds: ['ref-hillen-2023', 'ref-isfm-2022-pain', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado e Consenso ISFM 2022',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-inj-02',
      followUpPhases: [
        {
          doseValue: 0.05,
          frequency: 'A cada 24 horas (q24h)',
          duration: 'Até 4 dias consecutivos',
          route: 'Oral (VO)',
        },
      ],
    },
    {
      id: 'dose-melox-cat-djd-chronic',
      species: 'cat',
      indication: 'Osteoartrite e Doença Articular Degenerativa (DJD) Crônica em Felinos',
      clinicalContext: 'Felinos de meia-idade a idosos com dor articular crônica, perda de mobilidade e relutância ao salto.',
      doseMin: 0.05,
      doseMax: 0.05,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h) nos primeiros 3 a 5 dias; após, titular para a menor dose efetiva.',
      duration: 'Uso continuado com titulação descendente',
      notes:
        'Iniciar com 0,05 mg/kg VO a cada 24 horas nos primeiros 3 a 5 dias. Reduzir progressivamente para 0,01 a 0,03 mg/kg VO a cada 24 horas (ou dias alternados) buscando a menor dose que sustente o bem-estar e a mobilidade do gato.',
      monitoring: 'Exames basais prévios; reavaliação aos 15-30 dias; bioquímica renal e urinálise a cada 3 a 6 meses.',
      referenceIds: ['ref-gunew-2008', 'ref-isfm-aafp-2024-nsaid'],
      evidenceLevel: 'Nível 1a — Consenso Internacional ISFM/AAFP 2024 e Ensaios Prospectivos',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-sol-1',
      followUpPhases: [
        {
          doseValue: 0.02,
          frequency: 'A cada 24 horas (q24h)',
          duration: 'Manutenção de longo prazo na menor dose eficaz',
          route: 'Oral (VO)',
        },
      ],
    },
    {
      id: 'dose-melox-cat-ckd-lowdose',
      species: 'cat',
      indication: 'Gatos com Osteoartrite e Doença Renal Crônica (DRC) Estável IRIS 1 a 3',
      clinicalContext: 'Gatos com DRC estável (IRIS 1, 2 ou 3) euvolêmicos, normotensos e com apetite preservado.',
      doseMin: 0.02,
      doseMax: 0.02,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h) ou a cada 48 horas',
      duration: 'Uso contínuo sob acompanhamento semestral a trimestral',
      notes:
        'Regime preconizado por KuKanich et al. (2021) e chancelado pelo Consenso ISFM/AAFP 2024. Administrar 0,02 mg/kg VO q24h utilizando exclusivamente seringa milimétrica com solução oral 1 mg/mL (0,02 mL/kg). Não usar se o animal estiver desidratado, hiporexo ou hipotenso.',
      monitoring: 'Pressão arterial (PAS menor que 160 mmHg), creatinina, SDMA, urinálise, densidade e UPC a cada 2 a 4 meses.',
      referenceIds: ['ref-kukanich-2021', 'ref-isfm-aafp-2024-nsaid', 'ref-bsava-nephrology-20'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Prospectivo Randomizado Duplo-Cego (KuKanich 2021)',
      calculatorEnabled: true,
      presentationId: 'pres-maxicam-sol-1',
    },
  ],

  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
    'doenca-renal-cronica-caes-gatos',
    'cistite-idiopatica-felina',
  ],
};
