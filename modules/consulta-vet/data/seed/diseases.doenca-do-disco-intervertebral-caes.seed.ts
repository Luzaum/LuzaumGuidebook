import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Doença do Disco Intervertebral (DDIV) — Cães — Ficha clínica estruturada ConsultaVET.
 * Fontes: Consenso ACVIM 2022 (Olby et al.) > VINcyclopedia 2023 > Dewey & da Costa 3ª ed. > Coates 2012 > Galban & Wood 2019 > Genetics (Brown 2017, Batcher 2019) > Plumb's 10ª ed. / BSAVA Formulary.
 */
export const doencaDoDiscoIntervertebralCaesRecord: DiseaseRecord = {
  id: 'disease-doenca-do-disco-intervertebral-caes',
  slug: 'doenca-do-disco-intervertebral-caes',
  title: 'Doença do Disco Intervertebral — Cães',
  synonyms: [
    'DDIV',
    'IVDD',
    'IVDH',
    'Hérnia de disco',
    'Hérnia discal',
    'Extrusão discal',
    'Protrusão discal',
    'Ruptura de disco intervertebral',
    'Doença discal cervical',
    'Doença discal toracolombar',
    'Hansen I',
    'Hansen II',
    'ANNPE',
    'HNPE',
  ],
  species: ['dog'],
  category: 'neurologia',
  tags: [
    'DDIV',
    'IVDD',
    'Hansen I',
    'Hansen II',
    'ANNPE',
    'HNPE',
    'ACVIM 2022',
    'FGF4',
    'CDDY',
    'Dachshund',
    'Hemilaminectomia',
    'Ventral Slot',
    'Mielomalácia',
    'Nocicepção Profunda',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['doenca-do-disco-intervertebral-caes'],
  quickSummary:
    'A doença do disco intervertebral (DDIV) canina é um conjunto de alterações degenerativas discias capazes de produzir dor espinhal, compressão radicular e lesão medular por contusão e compressão. A extrusão aguda do núcleo pulposo (Hansen Tipo I) é altamente frequente em raças condrodistróficas portadoras da mutação 12-FGF4RG/CDDY (Dachshund, Bulldog Francês, Beagle). A protrusão (Hansen Tipo II) é crônica e fibroide. Formas não compressivas incluem a extrusão não compressiva de alta velocidade (ANNPE) e a extrusão de núcleo hidratado (HNPE). O diagnóstico definitivo exige Ressonância Magnética (sensibilidade >98,5%) ou Tomografia Computadorizada. A nocicepção profunda consciente é o marcador prognóstico central: a perda da dor profunda por mais de 24–48h NÃO inviabiliza a cirurgia (Consenso ACVIM 2022). O tratamento varia desde restrição rigorosa de atividade (4–6 semanas) e analgesia multimodal até descompressão cirúrgica de urgência (hemilaminectomia ou ventral slot) (1–8,12,13,16,17).',
  quickDecisionStrip: [
    '🚨 EMERGÊNCIA NEUROLÓGICA: Piora rápida, perda de deambulação, paraplegia, tetraplegia, hipoventilação ou perda de nocicepção profunda exigem avaliação neurológica e imagem imediata (2,4,5,6).',
    'NOCICEPÇÃO PROFUNDA ≠ REFLEXO DE RETIRADA: A puxada do membro é um arco reflexo espinhal segmentar. Percepção consciente de dor exige resposta comportamental (virar a cabeça, vocalizar) (5).',
    'REGRA DOS 24/48 HORAS É MITO: O Consenso ACVIM 2022 reafirma que a ausência de dor profunda por mais de 48h não elimina a indicação nem a chance de recuperação cirúrgica (2,3).',
    'GENÉTICA 12-FGF4RG (CDDY): A degeneração precoce discal é fortemente ligada ao retrogene FGF4 no cromossomo 12 (CDDY); a mutação no cromossomo 18 isolada não causa a doença discal (1,7,8).',
    'ACVIM 2022 — CORTICOIDES NÃO SÃO NEUROPROETORES: Uso rotineiro de corticoides como neuroprotetor não é recomendado e eleva o risco de complicações gastrointestinais (2,3,16).',
    'PROIBIDO COMBINAR AINE + CORTICOIDE: A associação aumenta severamente o risco de ulceração e perfuração gastrointestinal (2,14,15).',
    'RADIOGRAFIA SIMPLES NÃO BASTA: O RX simples não avalia a medula nem mede a compressão medular (acurácia 51–61%); não serve para planejar cirurgia isoladamente (2,5).',
    'RESSONÂNCIA MAGNÉTICA É O PADRÃO OURO: Sensibilidade >98,5% para extrusão discal toracolombar (TL-IVDE) e superior na diferenciação de ANNPE, HNPE, tumores e mielite (2,3).',
    'ALERTA DE MIELOMALÁCIA PROGRESSIVA: Ocorre em 11–17,5% dos cães paraplégicos graves sem dor profunda. Sinalizada por subida do reflexo cutâneo do tronco, flacidez e perda anal (1,2,4,6).',
    'SCHIFF-SHERRINGTON NÃO É LESÃO CERVICAL: Extensão rígida dos membros torácicos decorre da perda de inibição de border cells lombares por lesão T3-L3 grave; não dita prognóstico isoladamente (1,5).',
  ],
  quickSummaryRich: {
    lead:
      'A doença do disco intervertebral (DDIV) no cão compreende desde discopatia dolorosa focal até quadros pleoplégicos hiperagudos por herniação discal. A biologia da degradação discal é condicionada geneticamente pelo retrogene 12-FGF4RG, resultando em condroidificação e mineralização precoce em raças predispostas. A tomada de decisão clínica fundamenta-se no exame neurológico seriado, na neurolocalização precisa e na indicação oportuna de imagem avançada (RM/TC) para conduta conservadora ou descompressão cirúrgica.',
    leadHighlights: ['12-FGF4RG', 'condroidificação', 'exame neurológico seriado', 'imagem avançada (RM/TC)', 'descompressão cirúrgica'],
    pillars: [
      {
        title: 'Genética & Hansen Tipo I vs II',
        body: 'Em raças CDDY (Dachshund, Frenchie, Beagle), a mutação no cromossomo 12 causa desidratação e extrusão explosiva do núcleo pulposo (Hansen I). A protrusão (Hansen II) é crônica e senil.',
        highlights: ['CDDY', 'extrusão explosiva', 'Hansen I', 'Hansen II'],
      },
      {
        title: 'Graduação Neurológica & Prognóstico',
        body: 'Do Grau 1 (dor isolada) ao Grau 5 (paraplegia sem dor profunda). A preservação da nocicepção consciente garante prognóstico excelente pós-cirurgia (>90-95%), enquanto a perda da dor profunda torna o prognóstico reservado (~50%).',
        highlights: ['Grau 1 ao Grau 5', 'nocicepção consciente', 'dor profunda'],
      },
      {
        title: 'Consenso ACVIM 2022 & Terapias',
        body: 'Direcionado para TL-IVDE. Restrição estrita de gaiola (4-6 sem) e analgesia multimodal no conservador; hemilaminectomia ou ventral slot no cirúrgico. Proibido uso rotineiro de corticoides neuroprotetores ou combinação AINE+corticoide.',
        highlights: ['ACVIM 2022', 'restrição estrita', 'hemilaminectomia', 'ventral slot'],
      },
    ],
  },
  etiology: {
    definicao:
      'A DDIV em cães envolve alterações degenerativas estruturais da matriz extracelular do disco intervertebral, caracterizadas por perda de proteoglicanos, desidratação e substituição de células notocordais por fibrocartilagem, podendo resultar em extrusão ou protrusão do material discal para o canal vertebral ou forame (1,3).',
    geneticaFGF4:
      'O retrogene FGF4 no cromossomo 12 (12-FGF4RG / CDDY) é o principal determinante genético da condrodistrofia e da degeneração discal precoce em cães. Provoca calcificação prematura do núcleo pulposo e multiplica o risco de extrusão discal Hansen Tipo I (7,8). O retrogene FGF4 no cromossomo 18 (18-FGF4RG) isoladamente causa nanismo de membros, mas NÃO aumenta o risco de DDIV (1,8).',
    classificacaoHansenEFormasEspeciais:
      'Hansen Tipo I (Extrusão): Ruptura aguda do ânulo fibroso com expulsão do núcleo pulposo mineralizado para o canal (1,4). Hansen Tipo II (Protrusão): Abaulamento gradual e crônico do ânulo fibroso espessado (1,3). ANNPE (Extrusão Aguda Não Compressiva): Expulsão em altíssima velocidade de pequena quantidade de núcleo hidratado, causando contusão medular severa sem compressão residual relevante (4,6). HNPE (Extrusão de Núcleo Hidratado): Extrusão de material fluido/gelatinoso com padrão de sinal semelhando a líquido na RM, muito comum no segmento cervical (1).',
  },
  epidemiology: {
    prevalencia:
      'Extremamente comum em raças condrodistróficas (Dachshund, Bulldog Francês, Beagle, Cocker Spaniel, Pekinês, Shih-tzu, Corgi) com pico de acometimento entre 3 e 6 anos de idade (1,4). Em raças não condrodistróficas (Labrador, Pastor Alemão, Doberman), predomina o Tipo II e surge em cães de meia-idade a idosos (≥6–8 anos) (4). O segmento toracolombar (T11–L1) responde por 75–80% das herniações agudas (1).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Degeneração condroide do núcleo pulposo com perda de proteoglicanos e água mediada pela expressão de 12-FGF4RG (1,7,8).',
      'Fissuras transversais e radiais no ânulo fibroso submetido a cargas estáticas e dinâmicas (1,3).',
      'Ruptura anular com extrusão (Hansen I) ou deformação progressiva com protrusão (Hansen II) para a região dorsal/dorsolateral (1,4).',
      'Lesão Medular Primária: Impacto cinético (contusão), compressão mecânica focal e laceração microvascular com isquemia imediata (1,4).',
      'Lesão Medular Secundária: Edema vasogênico/citotóxico, peroxidação lipídica por ROS, liberação de glutamato (excitotoxicidade), apoptose glial e degeneração axonal ascendente/descendente (1,4).',
    ],
    transmissao:
      'Enfermidade endógena metabólico-degenerativa com forte determinação genética hereditária.',
  },
  pathophysiology:
    'A lesão medular na DDIV é bifásica. A fase primária decorre da energia cinética transferida durante a colisão do material discal contra o parênquima medular e da compressão estática persistente (1,4). A fase secundária envolve uma cascata neurodestrutiva auto-amplificada: colapso microvascular epidural/intramedular, formação de radicais livres, edema, hipotensão local, apoptose de oligodendrócitos e perda da condução axonal (1,4). Na região cervical, a amplitude do canal vertebral minimiza déficits motores graves iniciais, tornando a dor neuropática e radicular o sinal predominante (1,3). Na transição toracolombar (T11-L1), a estreiteza do canal e a ausência do ligamento conjugado intercostal potencializam contusões graves que culminam em paraplegia e risco de mielomalácia progressiva (1,2,4,6).',
  clinicalSignsPathophysiology: [
    {
      system: 'neurologico',
      findings: [
        {
          finding: 'Dor Cervical Intensíssima com Cabeça Baixa e Rigidez Muscular',
          mechanism:
            'Estiramento de fibras nociceptivas do ânulo fibroso exterior, compressão do ligamento longitudinal dorsal e de raízes nervosas cervicais sensíveis (1,3).',
          clinicalMeaning: 'Padrão clássico de DDIV Cervical (C1-C5 / C6-T2) (1,3).',
          priority: 'common',
        },
        {
          finding: 'Claudicação de Membro Torácico ("Root Signature" / Assinatura de Raiz)',
          mechanism:
            'Compressão ou aprisionamento de uma raiz nervosa ventral ou dorsal nos forames intervertebrais de C6-T2 (1,3,5).',
          clinicalMeaning: 'Manifestação radicular lateralizada de hérnia cervical (1,5).',
          priority: 'common',
        },
        {
          finding: 'Paraparesia / Paraplegia com Sinais de Neurônio Motor Superior (NMS) nos Membros Pélvicos',
          mechanism:
            'Interrupção dos tratos corticospinais e reticulospinais descendentes na medula toracolombar (T3-L3) mantendo arcos reflexos pélvicos intactos (1,3,5).',
          clinicalMeaning: 'Típico de neurolocalização T3-L3 com patelar hiperreflexico e tônus aumentado (1,5).',
          priority: 'common',
        },
        {
          finding: 'Paraparesia / Paraplegia com Sinais de Neurônio Motor Inferior (NMI) e Hipotonia Pélvica',
          mechanism:
            'Compressão direta dos intumescimentos medulares lombares (L4-S3) ou raízes da cauda eqüina destruindo os neurônios motores periféricos (1,3,5).',
          clinicalMeaning: 'Lesão L4-S3 com reflexo patelar/retirada diminuído ou ausente e bexiga flácida (3,5).',
          priority: 'common',
        },
        {
          finding: 'Postura de Schiff-Sherrington (Hipertonia de Membros Torácicos com Paraplegia Pélvica)',
          mechanism:
            'Lesão grave T3-L3 que destrói as células de borda lombares ("border cells"), interrompendo a inibição ascendente aos interneurônios dos membros torácicos (1,5).',
          clinicalMeaning: 'Indica lesão toracolombar grave, mas NÃO significa lesão cervical nem prognóstico nulo (1,5).',
          priority: 'common',
        },
        {
          finding: 'Síndrome do Cordão Central Cervical',
          mechanism:
            'Compressão ventral focal que afeta a substância cinzenta central e tratos mediais destinados aos membros torácicos antes das vias periféricas pélvicas (5).',
          clinicalMeaning: 'Membros torácicos mais fracos que os pélvicos em hérnia cervical (5).',
          priority: 'rare',
        },
        {
          finding: 'Mielomalácia Progressiva Ascendente/Descendente',
          mechanism:
            'Necrose hemorrágica isquêmica difusa e autopropagada da medula espinhal que avança craniocaudalmente (1,2,4,6).',
          clinicalMeaning: 'Complicação fatal caracterizada por subida da linha do reflexo cutâneo do tronco, perda anal e insuficiência respiratória (2,4,6).',
          priority: 'rare',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'História clínica + Exame neurológico minucioso com neurolocalização precisa + Imagem avançada (Ressonância Magnética ou Tomografia Computadorizada) (2,3).',
    graduacaoNeurologicaToracolombar:
      'Escala de 1 a 5 (2,3,4): Grau 1 = Dor espinhal apenas (sem déficit de marcha ou propriocepção); Grau 2 = Paraparesia ambulatória (ataxia e propriocepção alterada, mas caminha sem apoio); Grau 3 = Paraparesia não ambulatória (movimento voluntário presente, porém incapaz de sustentar o corpo); Grau 4 = Paraplegia com nocicepção profunda preservada (ausência de movimento funcional, dor consciente presente); Grau 5 = Paraplegia sem nocicepção profunda consciente (perda da percepção dolorosa cerebral).',
    testeDeNocicepcaoProfunda:
      'Aplicar forte compressão na falange distal com pinça hemostática. O reflexo de retirada (puxar a pata) é apenas um arco reflexo espinhal local. Para confirmar dor profunda consciente, é OBRIGATÓRIO observar reação cerebral: vocalização, virar o focinho, dilatação pupilar ou tentativa de mordida (3,5).',
    imagemAvançadaRMvsTC:
      'Ressonância Magnética (RM): Padrão-ouro (sensibilidade >98,5%). Permite delimitar parênquima medular, edema, necrose, ANNPE, HNPE e neoplasias (2,3). Tomografia Computadorizada (TC): Excelente em cães condrodistróficos com extrusão mineralizada aguda (Hansen I); rápida e com ótima definição óssea, porém inferior na avaliação do parênquima medular (2). Radiografia Simples: Não avalia a medula nem a compressão (acurácia 51-61%); serve apenas para descartar fraturas óbvias ou neoplasia lítica (2,5).',
  },
  treatment: {
    decisaoInicial:
      'Classificar se o paciente é candidato ao manejo conservador (Grau 1 e Grau 2 estáveis) ou à descompressão cirúrgica de urgência (Graus 3, 4 e 5, dor incontrolável ou piora progressiva) (2,3).',
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Triagem de Urgência & Restrição de Movimento',
        summary:
          'Imobilização imediata em caixa/gaiola de transporte. Avaliar nocicepção consciente e padrão respiratório. Evitar manobras de flexão da coluna (2,4).',
      },
      {
        priority: 2,
        title: 'Descompressão Cirúrgica de Urgência (ACVIM 2022)',
        summary:
          'Indicada em não ambulatórios (Graus 3–5), piora neurológica, dor refratária ou falha conservadora (2,3). Toracolombar: Hemilaminectomia lateral (2,4). Cervical: Ventral Slot (12,13). Não recusar cirurgia por limite arbitrário de 24/48h após perda da dor profunda (2,3). Fenestração discal associada reduz risco de recidiva (2).',
      },
      {
        priority: 3,
        title: 'Manejo Conservador & Restrição Estrita de Atividade',
        summary:
          'Restrição rigorosa em gaiola/cercado por 4 a 6 semanas (2,3,16). Saídas curtas apenas em guia curta para micção/defecação. Proibido saltar, subir escadas ou andar em pisos escorregadios (2,3).',
      },
      {
        priority: 4,
        title: 'Analgesia Multimodal Controlada',
        summary:
          'AINEs veterinários em doses terapêuticas de bula (se função renal/GI íntegra) OR Opioides parenterais em dor aguda severa (2,14,15). Gabapentina 10–20 mg/kg PO q6–8h em dor neuropática/radicular (14,15). Metocarbamol 20–45 mg/kg PO q8h para espasmo muscular (14,15). PROIBIDO associar AINE + Corticoide (2,14).',
      },
      {
        priority: 5,
        title: 'Manejo Vesical, Enfermagem & Reabilitação',
        summary:
          'Palpação e esvaziamento vesical manual a cada 6-8h ou cateterismo intermitente em atonia (2,4). Colchão macio, rotação de decúbito q4h para prevenir escaras (2,16). Fisioterapia passiva e reabilitação guiada pós-aguda (2).',
      },
    ],
    protocoloTerapeutico:
      'Em cão ambulatório com dor (Grau 1/2): Confinamento estrito em gaiola por 4-6 semanas + Carprofeno 2,2 mg/kg PO q12h (ou Meloxicam 0,1 mg/kg q24h) por 7-10 dias + Gabapentina 10-15 mg/kg PO q8h + Metocarbamol 30 mg/kg PO q8h se espasmo. Em caso de piora para paraparesia não ambulatória ou paraplegia: realizar RM/TC imediata e descompressão por hemilaminectomia/ventral slot (2,3,12,14,15).',
    monitoramento: [
      'Avaliar resposta consciente à dor profunda e movimento voluntário diariamente em internados (2,3).',
      'Monitorar a linha cutânea do tronco e tônus anal q6h para detectar mielomalácia progressiva (2,4,6).',
      'Medir volume residual vesical pós-micção ou pós-expressão manual (2,4).',
      'Vigiar febre, apatia ou melena (efeitos adversos digestivos de AINEs) (2,14).',
    ],
  },
  complications: {
    mielomalaciaProgressiva:
      'Necrose medular ascendente e descendente fatal ocorrendo em 11–17,5% dos cães com paraplegia profunda grau 5 (1,2,4,6).',
    infeccaoDoTratoUrinario:
      'ITU secundária à retenção urinária e cateterismo prolongado. Requer urocultura com antibiograma (2,4).',
    ulcerasDeDecubitoEEscaldaduraUrinaria:
      'Lesões de pele por imobilidade prolongada e contato com urina. Exigem colchonete higiênico e rotação de decúbito (2,16).',
  },
  figures: [
    {
      kind: 'clinicalFigure',
      id: 'fig-mri-tl-extrusion',
      src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/canine-intervertebral-disc-disease-mri-scan-science-photo-library.jpg',
      alt: 'Ressonância Magnética mostrando extrusão discal toracolombar em cão',
      caption:
        'RM T2 em plano sagital de cão com extrusão discal toracolombar (Hansen I). Nota-se o material extradural hipointenso comprimindo a medula e o edema intramedular hiperintenso secundário (Consenso ACVIM 2022, PMC7725764).',
      display: 'wide',
    },
    {
      kind: 'clinicalFigure',
      id: 'fig-extrusion-vs-protrusion',
      src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/intervertebral-disc-herniation-types-diagram-science-photo-library.jpg',
      alt: 'Diagrama comparativo entre Extrusão Hansen I e Protrusão Hansen II',
      caption:
        'Esquema comparativo entre Extrusão Hansen I (ruptura anular com extravasamento do núcleo) e Protrusão Hansen II (abaulamento anular crônico). Fonte: Dewey & da Costa 2016 / Coates 2012.',
      display: 'inline',
    },
  ],
  relatedConsensusSlugs: ['consensual-neurologia-acvim-tl-ivde-2022'],
  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-gatos',
    'fistula-perianal-furunculose-anal',
    'sindrome-cushing-caes',
  ],
  relatedMedicationSlugs: [
    'prednisolona',
    'pregabalina',
    'maropitant',
    'dipirona',
  ],
  references: [
    {
      id: 'ref-vin-ivdd-dog-2023',
      citationText:
        'Fingeroth JM, Katherman AE, Shell L. Intervertebral Disk Disease, Thoracolumbar/Cervical (Canine). VINcyclopedia of Diseases. Revised July 7, 2023.',
      sourceType: 'Enciclopédia Clínica VIN 2023',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-acvim-consensus-ivde-2022',
      citationText:
        'Olby NJ, Moore SA, Brisson B, et al. ACVIM consensus statement on diagnosis and management of acute canine thoracolumbar intervertebral disc extrusion. J Vet Intern Med. 2022;36(5):1570–1596.',
      sourceType: 'Consenso ACVIM 2022 (Diretriz Principal)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9511077/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-dewey-dacosta-neurology-2016',
      citationText:
        'Dewey CW, da Costa RC. Practical Guide to Canine and Feline Neurology. 3rd ed. Wiley-Blackwell; 2016. Chapter 13: Myelopathies, pp. 329–398.',
      sourceType: 'Tratado de Neurologia Veterinária',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-coates-acute-disc-2012',
      citationText:
        'Coates JR. Acute Disc Disease. In: Platt SR, Garosi LS. Small Animal Neurological Emergencies. Manson Publishing; 2012. Chapter 22, pp. 399–416.',
      sourceType: 'Tratado de Emergências Neurológicas',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-galban-wood-ivdd-2019',
      citationText:
        'Galban EM, Wood JH. Intervertebral Disk Disease. In: Drobatz KJ, et al. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019. Chapter 25, pp. 154–160.',
      sourceType: 'Tratado de Medicina de Emergência',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-neurology-6th',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier. Part IX: Nervous System Disorders, pp. 1135–1141.',
      sourceType: 'Tratado de Medicina Interna',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-brown-fgf4-pnas-2017',
      citationText:
        'Brown EA, Dickinson PJ, Mansour T, et al. FGF4 retrogene on CFA12 is responsible for chondrodystrophy and intervertebral disc disease in dogs. Proc Natl Acad Sci USA. 2017;114(43):11476–11481.',
      sourceType: 'Estudo Genético PNAS 2017',
      url: 'https://www.pnas.org/doi/10.1073/pnas.1709082114',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-batcher-fgf4-genes-2019',
      citationText:
        'Batcher K, Dickinson P, Giuffrida M, et al. Phenotypic effects of FGF4 retrogenes on intervertebral disc disease in dogs. Genes. 2019;10(6):435.',
      sourceType: 'Estudo Genômico Genes 2019',
      url: 'https://www.mdpi.com/2073-4425/10/6/435',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bach-ventral-slot-2022',
      citationText:
        'Bach FS, Mai W, Weber LFS, et al. Association between spinal cord compression ratio in magnetic resonance imaging, initial neurological status, and recovery after ventral slot in 57 dogs with cervical disc extrusion. Front Vet Sci. 2022;9:1029127.',
      sourceType: 'Estudo Clínico Front Vet Sci 2022',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9715042/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-guo-cervical-slot-2020',
      citationText:
        'Guo S, Lu D, Pfeiffer S, et al. Non-ambulatory dogs with cervical intervertebral disc herniation: single versus multiple ventral slot decompression. Aust Vet J. 2020;98(4):148–155.',
      sourceType: 'Estudo Clínico Australiano 2020',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-bsava-formulary-10th',
      citationText:
        'Allerton F, ed. BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA; 2020. Gabapentin, Methocarbamol, Carprofen monographs.',
      sourceType: 'Formulário Terapêutico BSAVA 2020',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-drug-handbook-10th',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley; 2023. Monografias de analgésicos e miorrelaxantes.',
      sourceType: 'Guia Farmacológico Plumb\'s 10ª ed.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bsava-canine-practice',
      citationText:
        'Hutchinson T, Robinson K, eds. BSAVA Manual of Canine Practice: A Foundation Manual. BSAVA. Chapter 16: Paralysis and spinal pain.',
      sourceType: 'Manual Prático BSAVA',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-brisson-ivdd-review-2010',
      citationText:
        'Brisson BA. Intervertebral disc disease in dogs. Vet Clin North Am Small Anim Pract. 2010;40(5):829–858.',
      sourceType: 'Revisão Sistemática 2010',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-dickinson-genetics-2020',
      citationText:
        'Dickinson PJ, Bannasch DL. Current understanding of the genetics of intervertebral disc degeneration. Front Vet Sci. 2020;7:431.',
      sourceType: 'Revisão de Genética Canina 2020',
      evidenceLevel: 'A',
    },
  ],
  isPublished: true,
  source: 'seed',
};
