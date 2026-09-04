import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Doença do Disco Intervertebral (DDIV) — Gatos — Ficha clínica estruturada ConsultaVET.
 * Fontes: VINcyclopedia Feline 2023 > Fowler et al. JFMS 2022 > De Decker et al. JFMS 2017 > Taylor-Brown & De Decker JFMS 2017 > Crawford et al. VCOT 2018 > Coates 2012 > Dewey & da Costa 3ª ed. > Plumb's 10ª ed.
 */
export const doencaDoDiscoIntervertebralGatosRecord: DiseaseRecord = {
  id: 'disease-doenca-do-disco-intervertebral-gatos',
  slug: 'doenca-do-disco-intervertebral-gatos',
  title: 'Doença do Disco Intervertebral — Gatos',
  synonyms: [
    'DDIV felina',
    'IVDD em gatos',
    'Hérnia de disco felina',
    'Extrusão discal felina',
    'Protrusão discal felina',
    'ANNPE felina',
    'Discopatia felina',
  ],
  species: ['cat'],
  category: 'neurologia',
  categories: ['cirurgia-neurologica'],
  tags: [
    'DDIV felina',
    'IVDD',
    'Hansen I felino',
    'Hansen II felino',
    'ANNPE felina',
    'JFMS 2022',
    'Lombossacra',
    'Gabapentina',
    'Hemilaminectomia felina',
    'Ventral Slot felino',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['doenca-do-disco-intervertebral-gatos'],
  quickSummary:
    'A doença do disco intervertebral (DDIV) clinicamente manifesta é consideravelmente menos frequente em gatos que em cães (prevalência em séries históricas entre 0,02% e 0,12%), porém pode acarretar dor intensa, paraparesia, tetraparesia e retenção urinária. A evidência científica felina é substancialmente menor que a canina, baseando-se em séries retrospectivas e relatos de caso; portanto, NÃO SE DEVE extrapolar automaticamente o Consenso ACVIM 2022 canino aos felinos. Acomete felinos de meia-idade a idosos (média ~9 anos para extrusões e ~12 anos para doença lombossacra). Protrusões Hansen Tipo II ocorrem frequentemente como achado incidental assintomático em gatos idosos, exigindo cautela no diagnóstico. A Ressonância Magnética é o exame de escolha para descartar os principais mimetizadores felinos (linfoma espinhal, PIF, meningomielite e embolia fibrocartilaginosa - FCE). O tratamento combina suporte conservador com analgésicos adaptados ao perfil felino (Gabapentina com ajuste renal) ou descompressão cirúrgica (hemilaminectomia ou ventral slot) em lesões compressivas com déficit grave (1F,2,4,9–11,14,15,19).',
  quickDecisionStrip: [
    '⚠️ NÃO EXTRAPOLAR O CONSENSO CANINO ACVIM 2022: O consenso foi formulado especificamente para cães com TL-IVDE. A literatura felina baseia-se em estudos retrospectivos com populações reduzidas (1F,2,9,10).',
    'EVIDÊNCIA FELINA LIMITADA: A DDIV em gatos é menos frequente (0,02% a 0,12%). A presença de protrusão em imagem de gato idoso é frequentemente achado incidental (1F,4,10).',
    'DESPERTA RESPEITO DE NEUROLOCALIZAÇÃO: Gatos mascaram dor e déficits leves. Relutância em saltar, cauda baixa e constipação costumam sinalizar doença lombossacra (4,10).',
    'MIMETIZADORES FELINOS PRIORITÁRIOS: Antes de indicar cirurgia discal, excluir Linfoma Espinhal, Peritonite Infecciosa Felina (PIF), Meningomielite bacteriana/protozoária e Embolia Fibrocartilaginosa (FCE) por RM (1F,4).',
    'FAIXA ETÁRIA TÍPICA: Hansen I afeta gatos de meia-idade (média 9 anos; variação 1,5–17 anos); lesões lombossacras afetam felinos ainda mais idosos (~12 anos) (4,10).',
    'ANNPE FELINA: Extrusão hiperaguda não compressiva durante salto/exercício. Pouca dor pós-inicial, déficit assimétrico e sem compressão residual na RM. Tratar com suporte e fisioterapia (11).',
    'GABAPENTINA FELINA: Dose inicial 5–10 mg/kg PO q8–12h (14,15). Como a depuração é predominantemente renal, atentar para sedação excessiva em felinos com Doença Renal Crônica (DRC) (14,15).',
    'AINES EM GATOS: Utilizar exclusivamente produtos com indicação e registro felino local (ex: meloxicam em dose única ou robenacoxib), sob rigorosa checagem de hidratação e função renal (14,15).',
    'DESCOMPRESSÃO CIRÚRGICA FELINA: Hemilaminectomia para lesões toracolombares/lombares ou Ventral Slot para lesões cervicais. Estudos de 2022 apontam prognóstico favorável quando a dor profunda é preservada (9,19).',
    'BEXIGA NEUROGÊNICA FELINA: Avaliar tono e palpar a bexiga. Evitar manipulação brusca devido ao risco de rotura vesical sob grande tensão (1F,4).',
  ],
  quickSummaryRich: {
    lead:
      'A doença do disco intervertebral em gatos é uma condição neurológica de baixa prevalência epidemiológica, porém de relevante gravidade clínica quando produz compressão medular ou de cauda equina. Diferenciando-se da síndrome canina por uma apresentação em idades mais avançadas e por uma expressiva taxa de protrusões incidentais assintomáticas, o diagnóstico felino exige um diagnóstico diferencial rigoroso contra neoplasias e doenças infecciosas.',
    leadHighlights: ['baixa prevalência', 'idades mais avançadas', 'protrusões incidentais', 'diagnóstico diferencial rigoroso'],
    pillars: [
      {
        title: 'Epidemiologia & Biomecânica Felina',
        body: 'Sem a mutação CDDY nos níveis caninos, a DDIV felina é senil (~9–12 anos). A biomecânica dos saltos de alta força impõe estresse predominante nos segmentos toracolombares e lombares caudais (L4-S1).',
        highlights: ['sem CDDY', 'senil (9-12 anos)', 'saltos de alta força', 'L4-S1'],
      },
      {
        title: 'Diagnósticos Diferenciais Críticos',
        body: 'RM é indispensável para diferenciar a DDIV de Linfoma Espinhal, PIF neurológica, Embolia Fibrocartilaginosa (FCE) e ANNPE. Protrusões não devem ser operadas sem confirmação de causabilidade.',
        highlights: ['Linfoma Espinhal', 'PIF neurológica', 'FCE', 'ANNPE'],
      },
      {
        title: 'Farmacologia & Prognóstico',
        body: 'Gabapentina (5-10 mg/kg) com ajuste para função renal; AINEs com autorização felina estrita. A cirurgia descompressiva (Fowler 2022) apresenta prognóstico muito bom em felinos com nocicepção mantida.',
        highlights: ['Gabapentina 5-10 mg/kg', 'AINEs felinos', 'Fowler 2022'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico',
      steps: [
        {
          label: '1. Suspeita clínica felina',
          detail:
            'Relutância em saltar, cauda baixa, dor epaxial lombossacra, constipação ou déficit motor. Gatos mascaram dor leve (Fowler et al., 2022).',
        },
        {
          label: '2. Exame neurológico',
          detail:
            'Neurolocalização, nocicepção profunda consciente vs reflexo, palpação vesical delicada. NÃO extrapolar graduação ACVIM canina automaticamente.',
        },
        {
          label: '3. RM (exame de escolha)',
          detail:
            'Obrigatória antes de cirurgia. Diferenciar DDIV compressiva de linfoma espinhal, PIF neurológica, meningomielite, FCE e ANNPE (De Decker et al., 2017).',
          limitations: 'Protrusão em gato idoso pode ser achado incidental assintomático.',
        },
        {
          label: '4. Correlacionar imagem + clínica',
          detail:
            'Confirmar que a lesão explica a neurolocalização antes de indicar descompressão. Hansen II assintomática é frequente em felinos idosos (~12 anos).',
        },
        {
          label: '5. Classificar forma',
          detail:
            'Extrusão Hansen I (~9 anos), protrusão Hansen II incidental ou lombossacra, ANNPE pós-salto com contusão sem compressão residual.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico',
      steps: [
        {
          label: '1. Dor leve / suspeita lombossacra',
          detail:
            'Repouso relativo, gabapentina 5–10 mg/kg PO q8–12h (ajustar se DRC), AINE felino autorizado localmente (meloxicam/robenacoxib) com hidratação e função renal verificadas.',
          reassess: 'Reavaliar em 7–14 dias.',
        },
        {
          label: '2. ANNPE felina',
          detail:
            'Suporte, analgesia, fisioterapia. Sem cirurgia se RM sem compressão residual (Crawford et al., 2018).',
        },
        {
          label: '3. Compressão com déficit grave',
          detail:
            'Hemilaminectomia (TL/lombar) ou ventral slot (cervical). Prognóstico favorável com nocicepção preservada (Fowler et al., 2022).',
        },
        {
          label: '4. Bexiga neurogênica',
          detail:
            'Palpar bexiga; esvaziamento manual delicado q6–8h se retenção. Evitar manipulação brusca — risco de rotura vesical.',
        },
        {
          label: '5. Reabilitação',
          detail:
            'Fisioterapia, controle de peso, modificar ambiente (rampas, reduzir saltos). Monitorar micção e pele por decúbito.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'A DDIV felina compreende as manifestações degenerativas e compressivas dos discos intervertebrais em felinos domésticos, apresentando-se como extrusão (Hansen I), protrusão (Hansen II), extrusão não compressiva (ANNPE) ou doença discal lombossacra (1F,4,9–11).',
    diferencasEpidemiologicasEGenetica:
      'Diferente do cão, os gatos não possuem a forte determinação da mutação condrodistrófica 12-FGF4RG como causa primária epidêmica. A degeneração discal é predominantemente relacionada ao envelhecimento fisiológico e ao estresse mecânico de salto (4,10). A prevalência de protrusão em gatos assintomáticos necropsiados ou submetidos a RM por outros motivos é alta, reforçando que o achado de imagem deve obrigatoriamente se correlacionar com a neurolocalização (4,10).',
    classificacaoFelina:
      'Hansen Tipo I: Extrusão do núcleo pulposo em canal vertebral, prevalente em segmentos toracolombares e lombares (T11-T12 a L1-L2, L4-L5) (4,10). Hansen Tipo II: Protrusão anular crônica, comum em gatos idosos (~12 anos) nas regiões cervical e lombossacra (4,10). ANNPE Felina: Extrusão peraguda não compressiva de alta velocidade durante impactos/saltos (11).',
  },
  epidemiology: {
    prevalencia:
      'Frequência clínica estimada entre 0,02% e 0,12% dos atendimentos felinos (4,10). Idade média de acometimento em torno de 9 anos para extrusões de coluna móvel e de 12 anos para a síndrome lombossacra (4,10). Sem forte predisposição por raça ou sexo nas grandes séries (10).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Degeneração gradual da matriz proteica do disco discal com o envelhecimento fisiológico e microtraumas repetitivos de salto (4,10).',
      'Fissuração anular dorsal submetida a estresse biomecânico de flexão e extensão lombar (4).',
      'Herniação discal com compressão de medula, cauda equina ou raízes nervosas emergentes (1F,4,9).',
      'Contusão mecânica e edema medular focal provocando paralisia e ataxia (1F,4).',
      'Resposta inflamatória e dor radicular ou dor à palpação epaxial (1F,4).',
    ],
    transmissao:
      'Enfermidade endógena não contagiosa.',
  },
  pathophysiology:
    'A fisiopatologia no gato combina compressão mecânica extradural e contusão medular decorrente da velocidade de herniação. Devido à grande flexibilidade da coluna felina e ao diâmetro relativo do canal em certos segmentos, muitas protrusões evoluem de forma indolente e assintomática. Contudo, na junção toracolombar e na região lombar caudal (L4-S1), extrusões agudas reduzem o fluxo sanguíneo local e geram esquemia e edema intramedular, resultando em tetraparesia, paraplegia ou disfunção esfincteriana anal e vesical (1F,4,9,10).',
  clinicalSignsPathophysiology: [
    {
      system: 'neurologico',
      findings: [
        {
          finding: 'Relutância em Saltar e Dor à Palpação Epaxial Lombossacra',
          mechanism:
            'Compressão de raízes nervosas de cauda equina ou de nociceptores do ânulo discal submetidos à extensão lombar no salto (4,10).',
          clinicalMeaning: 'Sinal inicial característico de DDIV lombar caudal ou lombossacra felina (4,10).',
          priority: 'common',
        },
        {
          finding: 'Paraparesia / Paraplegia com Incontinência ou Retenção Urinária',
          mechanism:
            'Compressão de tratos motores medulares na região T11-L5 interrompendo as vias descendentes de sustentação de peso (1F,4,9).',
          clinicalMeaning: 'Manifestação de extrusão discal toracolombar/lombar grave (4,9).',
          priority: 'common',
        },
        {
          finding: 'Cauda Caída e Atonia Anal / Constipação',
          mechanism:
            'Comprometimento dos segmentos sacrais e caudais (S1-S3 e nervos pudendo/pelvicos) na região lombossacra (4).',
          clinicalMeaning: 'Síndrome da cauda equina felina por lesão discal L7-S1 (4).',
          priority: 'common',
        },
        {
          finding: 'Tetraparesia / Rigidês Cervical com Dor ao Movimento da Cabeça',
          mechanism:
            'Extrusão ou protrusão discal no segmento C1-C5 ou C6-T2 comprimindo tratos ascendentes e descendentes cervicais (1F,19).',
          clinicalMeaning: 'DDIV Cervical felina (1F,19).',
          priority: 'rare',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'Exame neurológico felino rigoroso + Ressonância Magnética (modalidade de escolha) + Exclusão de neoplasias (Linfoma) e doenças infecciosas (PIF) (1F,4,9).',
    diferenciacaoRM:
      'A RM é indispensável em gatos para distinguir a DDIV de Linfoma Espinhal (massa intramedular/extradural com forte realce), Peritonite Infecciosa Felina (leptomeningite hiperintensa em T2 com realce ependimário), Embolia Fibrocartilaginosa (FCE - hiperintensidade focal T2 não compressiva) e ANNPE (extrusão hiperaguda não compressiva) (1F,4,11).',
    radiografiaETomografia:
      'Radiografias simples detectam mineralização discal e espondilose, mas não comprovam a compressão nem descartam mimetizadores macios. TC é útil para mineralizações, porém menos conclusiva no gato que no cão (4,10).',
  },
  treatment: {
    decisaoInicial:
      'Diferenciar lesões cirúrgicas compressivas de casos de manejo conservador ou condições não compressivas (ANNPE). Garantir analgesia adaptada aos felinos (1F,4,9,11,14).',
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Estabilização & Exclusão de Mimetizadores Felinos',
        summary:
          'Manter gato em ambiente calmo e restrito. Realizar RM para confirmar a presença e o local de compressão discal antes de qualquer procedimento cirúrgico (1F,4,9).',
      },
      {
        priority: 2,
        title: 'Descompressão Cirúrgica Felina (Fowler 2022 & Crawford 2018)',
        summary:
          'Hemilaminectomia (toracolombar/lombar) ou Ventral Slot (cervical) indicados em gatos não ambulatórios ou com compressão severa (9,19). Estudos recentes (Fowler et al., 2022) demonstram excelente taxa de recuperação funcional na maioria dos gatos operados com nocicepção preservada (9).',
      },
      {
        priority: 3,
        title: 'Manejo Conservador & Restrição de Espaço',
        summary:
          'Indicado para dor isolada ou paresia leve. Confinamento em cômodo pequeno/gaiola sem superfícies para salto por 4 a 6 semanas (1F,4).',
      },
      {
        priority: 4,
        title: 'Analgesia Multimodal Felina Individualizada',
        summary:
          'Gabapentina 5–10 mg/kg PO q8–12h como analgésico de escolha para dor neuropática e dor à palpação (14,15). Reduzir dose em gatos com DRC ou sedação marcada (14,15). Metocarbamol 20–45 mg/kg PO q8h para espasmo muscular (14). AINEs felinos licenciados (ex: Meloxicam ou Robenacoxib em doses felinas de bula) apenas se função renal/hidratação normais (14,15).',
      },
      {
        priority: 5,
        title: 'Cuidados de Enfermagem & Manejo Vesical Felino',
        summary:
          'Monitorar micção e realizar palpação vesical delicada q6–8h. Esvaziamento vesical manual com extrema cautela para evitar rotura (1F,4). Alojamento limpo e seco para prevenir dermatites de contato (4).',
      },
    ],
    protocoloTerapeutico:
      'Em gato com dor e paraparesia leve: Confinamento em área restrita sem opção de saltos por 4 a 6 semanas + Gabapentina 5–7,5 mg/kg PO q12h + Meloxicam felino (dose de bula 0,05 mg/kg q24h por curto período se hidratação e rins normais). Em gato com paraplegia por extrusão compressiva confirmada em RM: descompressão por hemilaminectomia cirúrgica rápida (4,9,14,15).',
    monitoramento: [
      'Avaliar capacidade de micção e volume urinário residual pós-esvaziamento (1F,4).',
      'Monitorar resposta consciente de dor profunda em dígitos pélvicos e cauda (1F,4,9).',
      'Acompanhar grau de sedação ou ataxia pela Gabapentina, ajustando a dose se necessário (14,15).',
    ],
  },
  complications: {
    retençaoOUlceraVesical:
      'Disfunção do esfíncter uretral e atonia do detrusor levando a distensão vesical extrema e risco de rotura em manobras intempestivas (1F,4).',
    constipaçãoESecreçãoFecalStasis:
      'Imobilidade e dor Lombossacra interferindo com a postura defecatória. Exige adequação de dieta e laxantes suaves (4).',
  },
  figures: [
    {
      kind: 'clinicalFigure',
      id: 'fig-feline-cervical-ivdd',
      src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/feline-spine-mri-scan-science-photo-library.jpg',
      alt: 'Ressonância Magnética de DDIV cervical em gato',
      caption:
        'RM sagital T2 de coluna cervical felina evidenciando extrusão discal ventral com compressão focal da medula espinhal (PMC10829150 / Lu et al.).',
      display: 'wide',
    },
  ],
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'peritonite-infecciosa-felina',
    'leucemia-viral-felina',
  ],
  relatedMedicationSlugs: [
    'prednisolona',
    'pregabalina',
  ],
  references: [
    {
      id: 'ref-vin-ivdd-cat-2023',
      citationText:
        'Fingeroth JM, Katherman AE, Shell L, Marioni-Henry K. Intervertebral Disk Disease (Feline). VINcyclopedia of Diseases. Revised July 12, 2023.',
      sourceType: 'Enciclopédia Clínica VIN 2023 Felina',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-acvim-consensus-ivde-2022-catnote',
      citationText:
        'Olby NJ, Moore SA, Brisson B, et al. ACVIM consensus statement on diagnosis and management of acute canine thoracolumbar intervertebral disc extrusion. J Vet Intern Med. 2022;36(5):1570–1596. (Nota: Específico para cães; não extrapolar automaticamente para gatos).',
      sourceType: 'Consenso ACVIM 2022 (Referência Canina)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9511077/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-dewey-dacosta-neurology-2016-cat',
      citationText:
        'Dewey CW, da Costa RC. Practical Guide to Canine and Feline Neurology. 3rd ed. Wiley-Blackwell; 2016. Chapter 13: Myelopathies, pp. 329–398.',
      sourceType: 'Tratado de Neurologia Veterinária',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-coates-acute-disc-2012-cat',
      citationText:
        'Coates JR. Acute Disc Disease. In: Platt SR, Garosi LS. Small Animal Neurological Emergencies. Manson Publishing; 2012. Chapter 22: Feline IVDD, pp. 414–416.',
      sourceType: 'Tratado de Emergências Neurológicas',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fowler-feline-ivdd-2022',
      citationText:
        'Fowler KM, Pancotto TE, Werre SR, et al. Outcome of thoracolumbar surgical feline intervertebral disc disease. J Feline Med Surg. 2022;24(6):473–483.',
      sourceType: 'Estudo Clínico Cirúrgico Felino 2022',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-dedecker-feline-predisposition-2017',
      citationText:
        'De Decker S, Warner A, Volk HA. Prevalence and breed predisposition for thoracolumbar intervertebral disc disease in cats. J Feline Med Surg. 2017;19(4):419–423.',
      sourceType: 'Estudo Epidemiológico Felino 2017',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-taylor-brown-annpe-cat-2017',
      citationText:
        'Taylor-Brown FE, De Decker S. Presumptive acute non-compressive nucleus pulposus extrusion in 11 cats: clinical features, diagnostic imaging findings, treatment and outcome. J Feline Med Surg. 2017;19(1):21–26.',
      sourceType: 'Série de Casos Felina ANNPE 2017',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-crawford-feline-cervical-2018',
      citationText:
        'Crawford AH, Cappello R, Alexander A, et al. Ventral Slot Surgery to Manage Cervical Intervertebral Disc Disease in Three Cats. Vet Comp Orthop Traumatol. 2018;31(1):71–76.',
      sourceType: 'Série de Casos Ventral Slot Felino 2018',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-bsava-formulary-10th-cat',
      citationText:
        'Allerton F, ed. BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA; 2020. Gabapentin, Methocarbamol, NSAIDs feline monographs.',
      sourceType: 'Formulário Terapêutico BSAVA 2020',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumbs-drug-handbook-10th-cat',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley; 2023. Monografias farmacológicas felinas.',
      sourceType: 'Guia Farmacológico Plumb\'s 10ª ed.',
      evidenceLevel: 'A',
    },
  ],
  isPublished: true,
  source: 'seed',
};
