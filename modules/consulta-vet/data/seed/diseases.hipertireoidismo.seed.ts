import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/** 
 * Hipertireoidismo Felino — Conteúdo Editorial Clínico de Padrão Ouro.
 * Embasamento: AAHA 2023 Guidelines > AAFP 2016 Feline Guidelines > Geddes & Aguiar 2022 (Renal Interplay) >
 * Stammeleer et al. 2024 (Hypertension) > Peterson & Rishniw 2021 (I-131 Individualized) > Ettinger 9ª ed. 2024 >
 * Nelson & Couto 6ª ed. > BSAVA Manual of Feline Endocrinology 5ª ed.
 */
export const hipertireoidismoFelinoRecord: DiseaseRecord = {
  id: 'disease-hipertireoidismo-felino',
  slug: 'hipertireoidismo-felino',
  title: 'Hipertireoidismo felino',
  subtitle: 'Guia clínico integral: diagnóstico de alta sensibilidade, tireotoxicose cardiovascular, desmascaramento da DRC, radioiodoterapia personalizada e controle farmacológico',
  synonyms: [
    'Hipertireoidismo em gatos',
    'Tireotoxicose felina',
    'Bócio tóxico nodular felino',
    'Feline hyperthyroidism',
    'Adenoma tireoidiano funcional felino'
  ],
  species: ['cat'],
  category: 'endocrinologia',
  categories: ['endocrinologia', 'clinica-medica', 'cardiologia', 'nefrologia', 'medicina-felina'],
  tags: [
    'Tireoide',
    'T4 total',
    'T4 livre',
    'TSH felino',
    'Metimazol',
    'Tiamazol',
    'I-131',
    'Cintilografia tireoidiana',
    'DRC mascarada',
    'Hipertensao arterial sistemica',
    'Cardiomiopatia tireotoxica',
    'AAHA 2023',
    'AAFP'
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipertireoidismo-felino'],

  quickSummary:
    'Endocrinopatia mais comum em felinos idosos (> 8 anos) caracterizada por hipermetabolismo multissistêmico:\n\n' +
    '- Etiopatogenia primária: hiperplasia adenomatosa multinodular ou adenoma benigno autônomo em >98% dos casos; carcinomas foliculares respondem por apenas 1 a 2%.\n' +
    '- Manifestações clínicas capitais: perda ponderal progressiva com polifagia voraz, taquicardia sinusal marcante, hiperatividade, vômitos e nódulo tireoidiano palpável (thyroid slip).\n' +
    '- Repercussões hemodinâmicas: cardiomiopatia tireotóxica com hipertrofia concêntrica e hipertensão arterial sistêmica (PAS >= 160 mmHg) em 25 a 30% dos gatos.\n' +
    '- Eixo nefrorrenal e DRC mascarada: a tireotoxicose induz hiperfiltração glomerular e sarcopenia, mascarando Doença Renal Crônica subjacente em até 40% dos pacientes.\n' +
    '- Confirmação laboratorial: T4 total sérico elevado como triagem; T4 livre por diálise de equilíbrio e TSH suprimido para casos limítrofes; cintilografia com 99mTc como padrão-ouro anatômico.\n' +
    '- Estratégia terapêutica: Radioiodoterapia (I-131) como padrão-ouro curativo definitivo; metimazol e restrição nutricional de iodo como controle farmacológico ou dietético de manutenção.',

  quickDecisionStrip: [
    'Gato idoso emagrecendo com apetite voraz + taquicardia (>220 bpm) + nódulo tireoidiano palpável = suspeita máxima; palpação cuidadosa em "pinça" do sulco jugular identifica o nódulo em >80-85% dos casos.',
    'T4 total sérico elevado em laboratório de referência confirma o diagnóstico na grande maioria dos pacientes com sinais clínicos compatíveis.',
    'T4 total normal NÃO exclui hipertireoidismo: ~5-10% têm doença inicial, flutuações hormonais ou supressão transitória por doença não tireoidiana grave (síndrome do eutireoideo doente).',
    'T4 livre elevada (fT4 elevada) isolada NÃO confirma a doença: apresenta falso-positivo em até 12% dos gatos eutetireoideos doentes; deve SEMPRE ser interpretada em conjunto com T4 total e TSH (Brassard et al., 2026).',
    'TSH felino suprimido (<0,03 ng/mL) reforça hipertireoidismo; TSH normal ou alto exclui quase categoricamente a doença não tratada.',
    'O hipertireoidismo mascara a Doença Renal Crônica: a hiperfiltração glomerular e a perda de massa muscular reduzem a creatinina; nunca tolerar ou manter gato hipertireoideo com medo de elevar creatinina, o objetivo primordial é sempre restaurar o eutireoidismo (Geddes & Aguiar, 2022).',
    'NUNCA deixe o gato intencionalmente hipertireoideo com medo de elevar a creatinina: o hipertireoidismo não tratado perpetua lesão glomerular, proteinúria, hipertensão e necrose miocárdica.',
    'Aferir a Pressão Arterial Sistólica (PAS) por Doppler antes e 2 a 4 semanas após atingir o eutireoidismo: 25-30% são hipertensos no diagnóstico e outros desenvolvem hipertensão de novo pós-tratamento.',
    'Metimazol NÃO cura e NÃO impede o crescimento do tumor tireoidiano: a dose inicial deve ser calculada por gato (1,25 a 2,5 mg/gato q12-24h), NUNCA por mg/kg.',
    'Radioiodoterapia (I-131) é a terapia curativa definitiva de eleição (>95% de sucesso); o cálculo da dose deve ser individualizado com base no tamanho nodular e captação cintilográfica, e não em dose fixa universal.',
    'Dieta y/d exige exclusividade nutricional absoluta (100% dos alimentos e petiscos); não destrói o tumor e é contraindicada em animais com DRC azotêmica avançada IRIS 3-4.',
    'Em caso de apatia extrema, anorexia e prostração ("hipertireoidismo apático", 5-10%), investigar imediatamente insuficiência cardíaca congestiva descompensada ou sepse/DRC avançada associada.'
  ],

  quickSummaryRich: {
    lead:
      'Condição multissistêmica hipermetabólica e hiperadrenérgica em felinos geriátricos:\n\n' +
      '- Impacto cardiovascular e renal: repercussões hemodinâmicas profundas no miocárdio e na microcirculação glomerular.\n' +
      '- Meta clínica primordial: restaurar o eutireoidismo sustentado sem induzir colapso da filtração renal ou hipotireoidismo iatrogênico.',
    leadHighlights: [
      'Hiperplasia adenomatosa autônoma (>98%)',
      'Desmascaramento da DRC pós-eutireoidismo',
      'Cardiomiopatia tireotóxica e hipertensão arterial',
      'T4 total inicial + T4 livre/TSH para limítrofes',
      'Cintilografia 99mTc como padrão-ouro de imagem',
      'I-131 curativo definitivo vs Metimazol de manutenção'
    ],
    pillars: [
      {
        title: 'Pilar 1: Diagnóstico Laboratorial Estruturado e Armadilhas',
        body:
          'Abordagem diagnóstica estratificada e conduta em casos limítrofes:\n\n' +
          '- Triagem obrigatória: T4 total sérico elevado em pacientes geriátricos com nódulo palpável e sinais clínicos consolida o diagnóstico.\n' +
          '- Casos duvidosos ou comorbidades (eutireoideo doente): dosagem de T4 livre por diálise em equilíbrio e TSH felino profundamente suprimido confirmam a secreção autônoma.',
        highlights: ['T4 total como triagem obrigatória', 'T4 livre por diálise para casos limítrofes', 'TSH indetectável/suprimido']
      },
      {
        title: 'Pilar 2: Inter-relação Nefrorrenal (DRC Mascarada)',
        body:
          'Mecanismos de hiperfiltração e manejo nefrorrenal rigoroso:\n\n' +
          '- Hemodinâmica glomerular: a vasodilatação renal mediada por T3/T4 e a sarcopenia catabólica reduzem artificialmente a creatinina sérica.\n' +
          '- Desmascaramento de DRC: a restauração do eutireoidismo reduz a TFG e revela nefropatia prévia em até 40% dos gatos.\n' +
          '- Princípio inegociável: o objetivo terapêutico é sempre o eutireoidismo estável, sendo contraindicado manter tireotoxicose ativa sob pretexto de preservar a filtração renal.',
        highlights: ['Hiperfiltração e creatinina falsamente reduzida', 'Desmascaramento em 15-40% pós-tratamento', 'Manter eutireoidismo sem hipotireoidismo']
      },
      {
        title: 'Pilar 3: Cardiomiopatia Tireotóxica e Risco Vascular',
        body:
          'Efeitos hemodinâmicos da estimulação adrenérgica crônica:\n\n' +
          '- Sobrecarga cardíaca: taquicardia severa, aumento de contratilidade e elevação pressórica induzem hipertrofia concêntrica reversível do ventrículo esquerdo.\n' +
          '- Manejo sintomático: betabloqueadores (atenolol) controlam arritmias e reduzem o consumo miocárdico de oxigênio durante a estabilização antitireoidiana.',
        highlights: ['Hipertrofia concêntrica reversível', 'Risco de edema pulmonar agudo e efusão pleural', 'Atenolol e controle da PAS por Doppler']
      },
      {
        title: 'Pilar 4: Escolha Terapêutica Racional (Curativa vs Manutenção)',
        body:
          'Estratificação entre terapia curativa e estabilização de longo prazo:\n\n' +
          '- Modalidade curativa de escolha: Radioiodoterapia com I-131, com taxa de sucesso superior a 95% em dose única sem lesão de paratireoides.\n' +
          '- Terapia farmacológica e nutricional: metimazol e dieta hipoiódica controlam reversivelmente a secreção hormonal quando a cura definitiva não é acessível.',
        highlights: ['I-131 padrão-ouro curativo', 'Metimazol com titulação por gato', 'Cuidado com hipotireoidismo pós-terapia']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial do Hipertireoidismo Felino (AAHA 2023 / AAFP)',
      steps: [
        {
          label: 'Passo 1: Reconhecimento Clínico e Palpação Cervical em Pinça',
          detail:
            'Identificação clínica em pacientes geriátricos (> 8 anos):\n\n' +
            '- Sinais cardinais: perda de peso progressiva com polifagia, taquicardia (> 220 bpm), arritmias, hiperatividade e vômitos.\n' +
            '- Palpação em pinça: deslizar polegar e indicador ao longo do sulco jugular até a entrada torácica; nódulo móvel (thyroid slip) palpável em 80-85% dos casos.'
        },
        {
          label: 'Passo 2: Dosagem de T4 Total Sérico em Laboratório de Referência',
          detail: 'Triagem mandatória. Se TT4 > 4,0 mcg/dL (ou acima do intervalo de referência) em gato com sinais clínicos e/ou nódulo palpável: diagnóstico de hipertireoidismo CONFIRMADO. Prosseguir para avaliação de comorbidades.'
        },
        {
          label: 'Passo 3: Investigação de Casos Limítrofes ou Eutireoideo Doente',
          detail:
            'Conduta perante TT4 limítrofe (2,5 a 4,0 mcg/dL) ou doença concorrente:\n\n' +
            '- Painel hormonal avançado: mensurar TT4, T4 livre por diálise em equilíbrio (fT4ed) e TSH endógeno felino após 2 a 4 semanas de estabilização.\n' +
            '- Critério de confirmação: combinação de TT4 limítrofe com fT4ed elevado e TSH suprimido (< 0,03 ng/mL) fecha o diagnóstico de hipertireoidismo.'
        },
        {
          label: 'Passo 4: Avaliação Nefrorrenal, Pressórica e Sistêmica Basal',
          detail:
            'Estadiamento basal e triagem de comorbidades pré-tratamento:\n\n' +
            '- Perfil laboratorial: urinálise (USG basal), creatinina, ureia, SDMA, eletrólitos, ALT, FA e hemograma.\n' +
            '- Hemodinâmica e estadiamento IRIS: aferição da PAS por Doppler e classificação prévia para monitorar o impacto da correção hormonal.'
        },
        {
          label: 'Passo 5: Cintilografia Tireoidiana com Tecnécio-99m (Padrão-Ouro de Imagem)',
          detail:
            'Mapeamento cintilográfico padrão-ouro com Tecnécio-99m:\n\n' +
            '- Distribuição anatômica: diferenciação precisa entre afecção unilateral e bilateral (presente em 70% dos gatos).\n' +
            '- Rastreio de ectopia e malignidade: identifica tecido ectópico intratorácico (3-5%) e sinais de carcinoma funcional invasivo ou metastático.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Protocolo Terapêutico e Titulação Escalonada',
      steps: [
        {
          label: 'Fase 1: Estabilização Inicial e Teste Terapêutico de Função Renal',
          detail:
            'Teste terapêutico reversível com Metimazol por 4 semanas:\n\n' +
            '- Posologia inicial: 1,25 a 2,5 mg/gato VO q12h ou q24h, visando restauração gradual do eutireoidismo.\n' +
            '- Monitoramento nefrorrenal: observação rigorosa da creatinina sérica e da densidade urinária para desmascaramento seguro de DRC sem gerar hipotireoidismo.'
        },
        {
          label: 'Fase 2: Escolha da Modalidade Terapêutica Definitiva',
          detail:
            'Definição da conduta definitiva após estabilização renal:\n\n' +
            '- Função renal compensada: indicação de Radioiodoterapia (I-131) como primeira escolha curativa definitiva.\n' +
            '- Alternativas de manutenção: manutenção contínua de metimazol, tireoidectomia intracapsular modificada ou dieta restrita em iodo (Hill\'s y/d).'
        },
        {
          label: 'Fase 3: Titulação Hormonal e Metas Terapêuticas',
          detail:
            'Protocolo de titulação laboratorial posológica:\n\n' +
            '- Intervalo de reavaliação: dosar TT4, creatinina, ureia e hemograma a cada 2 a 4 semanas após ajustes de dose.\n' +
            '- Alvo hormonal: manter T4 total no terço inferior da referência (1,0 a 2,5 mcg/dL), com TSH normal e função renal estável.'
        },
        {
          label: 'Fase 4: Manejo da Tireotoxicose Cardiovascular e Hipertensão',
          detail: 'Se houver taquicardia severa sustentada (>220 bpm) ou arritmias ventriculares: associar Atenolol 6,25 a 12,5 mg/gato VO q12-24h até o controle tireoidiano. Se PAS >= 160 mmHg persistente: associar Anlodipino 0,625 a 1,25 mg/gato VO q24h.'
        },
        {
          label: 'Fase 5: Monitoramento Crônico Longitudinal',
          detail:
            'Acompanhamento pós-terapêutico longitudinal:\n\n' +
            '- Pacientes tratados com I-131: controle de TT4, TSH e função renal aos 30, 90 e 180 dias, e semestralmente após para triar hipotireoidismo tardio.\n' +
            '- Pacientes em manejo crônico: reavaliação laboratorial e aferição de PAS por Doppler a cada 3 a 6 meses continuamente.'
        }
      ]
    }
  },

  etiology: {
    definicao:
      'Síndrome clínica e metabólica resultante da tireotoxicose crônica:\n\n' +
      '- Mecanismo central: hipersecreção autônoma de tiroxina (T4) e tri-iodotironina (T3) por células foliculares tireoidianas mutadas.\n' +
      '- Perda do eixo hipofisário: produção hormonal desregulada e completamente independente do controle trófico pelo TSH.',
    lesaoPredominante:
      'Padrões histopatológicos dominantes no parênquima tireoidiano:\n\n' +
      '- Lesões benignas (> 98%): hiperplasia adenomatosa multinodular e adenomas foliculares funcionais bem delimitados.\n' +
      '- Carcinomas funcionais (1 a 2%): adenocarcinomas invasivos raros no diagnóstico inicial, mas que podem surgir por progressão clonal em gatos sob manejo clínico de longa data (> 4 a 5 anos com metimazol).',
    distribuicaoAnatomica:
      'Distribuição topográfica e prevalência de tecido ectópico:\n\n' +
      '- Padrão bilateral (65 a 75%): envolvimento de ambos os lobos tireoidianos, frequentemente assimétrico.\n' +
      '- Padrão unilateral (25 a 30%): acometimento de um único lobo no momento do diagnóstico.\n' +
      '- Tecido ectópico mediastinal (3 a 5%): migração anômala ao longo do ducto tireoglosso desde o forame cego até o pericárdio cranial e mediastino anterior, detectável por cintilografia.',
    fatoresDeRisco:
      'Fatores ambientais, nutricionais e disruptores endócrinos associados:\n\n' +
      '- Fatores dietéticos e embalagens: consumo prolongado de rações úmidas enlatadas (revestimentos com bisfenol A e resinas epóxi) e presença de fitoestrógenos de soja.\n' +
      '- Flutuações nos teores de iodo: ciclos alternados de deficiência e sobrecarga de iodo na dieta, estimulando autonomia folicular proliferativa.\n' +
      '- Disruptores químicos domésticos: exposição crônica a retardantes de chama bromados (PBDEs em poeira e estofados), areias sanitárias aromatizadas e vida estritamente indoor.',
    baseGenetica:
      'Mutações somáticas e desregulação da cascata de sinalização folicular:\n\n' +
      '- Alvos moleculares: mutações constitutivas nos genes da subunidade alfa da proteína G estimulatória (Gs-alfa) e do receptor de TSH (TSHR).\n' +
      '- Hiperativação autônoma: ativação sustentada do eixo adenilil-ciclase e AMP cíclico, promovendo replicação celular e secreção hormonal perpétua sem dependência do TSH.',
  },

  epidemiology: {
    prevalenciaEIdade:
      'Epidemiologia, prevalência clínica e faixa etária característica:\n\n' +
      '- Frequência na rotina: endocrinopatia mais diagnosticada na clínica de felinos mundialmente, acometendo 6 a 10% dos gatos acima de 10 anos.\n' +
      '- Idade ao diagnóstico: mediana de 12 a 13 anos de idade; mais de 95% dos casos ocorrem após os 8 anos, sendo excepcional antes dos 5 anos (< 0,5%).',
    predisposicaoRacial:
      'Distribuição por sexo e proteção genética racial:\n\n' +
      '- Ausência de predisposição sexual: machos e fêmeas castrados ou inteiros são igualmente acometidos.\n' +
      '- Proteção em raças puras: gatos Siamês, Himalaio, Birmanês e Tonquinês possuem incidência expressivamente menor e risco relativo reduzido frente a gatos sem raça definida (SRD), sugerindo polimorfismos protetores.',
    comparacaoCanina:
      'Diferenças etiológicas fundamentais na espécie canina:\n\n' +
      '- Raridade de adenomas benignos: hipertireoidismo espontâneo primário ocorre em menos de 1% das endocrinopatias em cães.\n' +
      '- Principais causas no cão: carcinomas tireoidianos invasivos de grandes dimensões altamente secretantes ou tireotoxicose alimentar por ingestão de tecidos glandulares cervicais em dietas cruas comerciais.',
  },

  pathogenesisTransmission: {
    autonomiaFolicular:
      'Mecanismos de hipersecreção e sinalização celular autônoma:\n\n' +
      '- Liberação hormonal descontrolada: proliferação clonal de células foliculares que secretam tiroxina (T4) e tri-iodotironina (T3) de modo contínuo.\n' +
      '- Ação genômica ubíqua: a T3 livre liga-se aos receptores nucleares TR-alfa e TR-beta em praticamente todas as linhagens celulares, acelerando a transcrição metabólica basal.',
    eixoHPT:
      'Desregulação do eixo hipotálamo-hipófise-tireoide (HPT):\n\n' +
      '- Retroalimentação negativa potente: concentrações elevadas de T4 e T3 livres inibem fortemente os neurônios de TRH hipotalâmicos e os tireotrofos hipofisários.\n' +
      '- Supressão de TSH: níveis séricos de TSH tornam-se profundamente suprimidos ou indetectáveis (< 0,03 ng/mL em ensaios específicos).\n' +
      '- Atrofia do tecido normal: a ausência de estímulo pelo TSH induz quiescência funcional e atrofia dos folículos tireoidianos não neoplásicos remanescentes.',
    progressaoTecidual:
      'Natureza proliferativa contínua e evolução tumoral:\n\n' +
      '- Falha antiproliferativa das terapias médicas: o metimazol e a dieta com restrição de iodo controlam a hormonogênese, mas não cessam a mitose clonal neoplásica.\n' +
      '- Progressão anatômica: nódulos mantidos apenas sob bloqueio farmacológico sofrem expansão volumétrica contínua, acometimento bilateral secundário e eventual transformação maligna em carcinoma.',
  },

  pathophysiology: {
    tabelaComparacaoTratamentos: {
      kind: 'clinicalTable',
      caption: 'Comparação de Modalidades Terapêuticas no Hipertireoidismo Felino',
      headers: ['Modalidade', 'Eficácia Curativa', 'Vantagens Primordiais', 'Desvantagens / Riscos', 'Custo Relativo'],
      rows: [
        ['Iodo-131 (Radioiodoterapia)', 'Curativa (>95% em dose única)', 'Não invasiva, sem anestesia geral, atua em tecido ectópico e carcinomas', 'Disponibilidade restrita a centros especializados, isolamento', 'Investimento inicial alto, baixo custo cumulativo'],
        ['Metimazol / Tiamazol', 'Controle médico reversível (não curativo)', 'Universalmente disponível, titulação precisa, permite avaliar DRC', 'Administração contínua vitalícia, efeitos colaterais idiossincráticos, tumor continua crescendo', 'Baixo custo inicial, alto a longo prazo'],
        ['Tireoidectomia Cirúrgica', 'Potencialmente curativa', 'Excisão tecidual imediata', 'Risco cirúrgico/anestésico geriátrico, risco de hipocalcemia grave, não remove ectópico', 'Moderado'],
        ['Dieta com Restrição de Iodo (y/d)', 'Controle clínico reversível', 'Manejo exclusivamente nutricional', 'Exclusividade estrita absoluta (0% petiscos), não impede expansão tumoral, contraindicada em DRC IRIS 3-4', 'Custo contínuo de dieta terapêutica']
      ]
    },
    cardiopatiaTireotoxica:
      'Fisiopatologia da cardiomiopatia tireotóxica e estado hemodinâmico hiperdinâmico:\n\n' +
      '- Ações miocárdicas diretas: a T3 promove up-regulation de alfa-miosina e da bomba SERCA2 do retículo sarcoplasmático, elevando a força contrátil e a velocidade de relaxamento diastólico.\n' +
      '- Hipersensibilidade adrenérgica: proliferação na densidade de receptores beta-1 miocárdicos, potencializando a resposta às catecolaminas circulantes.\n' +
      '- Ativação neuro-humoral periférica: vasodilatação sistêmica e queda da RVP deflagram o SRAA, gerando retenção hídrica, hipervolemia e sobrecarga de pré e pós-carga.\n' +
      '- Remodelamento e falência cardíaca: instalação de hipertrofia ventricular concêntrica (fenocópia de CMH), dilatação atrial esquerda, taquiarritmias e risco de insuficiência cardíaca congestiva (edema pulmonar e efusão pleural).',
    eixoRenalHiperfiltracao:
      'Hemodinâmica glomerular e mecanismos da Doença Renal Crônica mascarada:\n\n' +
      '- Hiperfiltração glomerular: vasodilatação da arteríola aferente renal associada ao alto débito cardíaco eleva a taxa de filtração glomerular (TFG) em 30 a 50%.\n' +
      '- Sarcopenia catabólica: proteólise muscular severa reduz a geração endógena de fosfocreatina, deprimindo a síntese basal de creatinina sérica.\n' +
      '- Subestimação laboratorial: a soma de hiperfiltração com baixa massa muscular gera valores falsamente baixos de creatinina e ureia no sangue.\n' +
      '- Desmascaramento da nefropatia: a resolução da tireotoxicose reajusta a TFG aos níveis basais reais, revelando azotemia e DRC oculta em 15 a 40% dos felinos tratados.',
    metabolismoECatabolismo:
      'Hipermetabolismo celular acelerado e consumo de reservas teciduais:\n\n' +
      '- Termogênese e gasto energético: estimulação da Na+/K+ ATPase com alto consumo de ATP, gerando intolerância ao calor e hipertermia relativa.\n' +
      '- Catabolismo de substratos: ativação intensa de glicogenólise, gliconeogênese, lipólise e proteólise muscular esquelética, deflagrando emaciação progressiva com polifagia compensatória.\n' +
      '- Remodelamento esquelético: estímulo osteoclástico direto pela T3, induzindo reabsorção óssea com hipercalciúria e hiperfosfatúria secundárias.',
    comprometimentoGastrointestinalEHepatico:
      'Repercussões digestivas e disfunção enzimática hepática:\n\n' +
      '- Hipermotilidade gastrointestinal: trânsito entérico acelerado provocando má digestão, esteatorreia e fezes volumosas de consistência pastosa.\n' +
      '- Emese crônica: vômitos secundários à ingestão alimentar voraz excessiva (ingurgitamento gástrico) e estímulo bulbar direto da zona de gatilho quimiorreceptora.\n' +
      '- Elevação enzimática hepática: aumento de ALT, FA e AST em 75 a 90% dos gatos por hipóxia centrolobular relativa decorrente da alta demanda de O2 e efeito tireotóxico celular direto.',
    hipertensaoArterialSistemica:
      'Hipertensão arterial sistêmica e lesão em órgãos-alvo (LOA):\n\n' +
      '- Gênese hemodinâmica: tônus simpático exacerbado, rigidez vascular e ativação do SRAA produzem PAS >= 160 mmHg em 25 a 30% dos pacientes.\n' +
      '- Danos de órgãos-alvo: retinopatia hipertensiva com hemorragia e descolamento de retina (cegueira súbita), encefalopatia e aceleração da proteinúria renal.',
    formaApatica:
      'Apresentação clínica atípica de hipertireoidismo apático (5 a 10% dos casos):\n\n' +
      '- Sinais divergentes: ausência de polifagia e agitação; os animais apresentam anorexia marcada, adipsia, letargia profunda e caquexia.\n' +
      '- Sintomas neurológicos e comorbidades: fraqueza muscular com ventroflexão cervical por hipocalemia ou miopatia tireotóxica, habitualmente associados a ICC descompensada ou DRC terminal.',
  },

  clinicalSignsPathophysiology: {
    sinaisClassicos: [
      'Perda de peso progressiva (presente em 85-92% dos casos) associada a polifagia intensa e ingestão voraz de alimento decorrente do estado hipermetabólico acelerado.',
      'Nódulo tireoidiano palpável ("thyroid slip") no exame físico da região ventral do pescoço, identificável em mais de 80% a 85% dos pacientes mediante técnica de palpação cuidadosa.',
      'Taquicardia sinusal persistente com frequência cardíaca superior a 220-240 bpm, sopro sistólico carotídeo/mitral (graus I a III/VI) e ritmo de galope (S3 ou S4 audíveis).',
      'Hiperatividade, inquietude, agressividade, comportamento arisco, deambulação contínua e vocalização noturna excessiva por superestimulação do sistema nervoso central.',
      'Poliúria e polidipsia (PU/PD) em 40-60% dos pacientes, provocadas por hiperfluxo renal medular com lavagem do interstício medular renal, psicogênica primária ou DRC associada.',
      'Pelagem opaca, eriçada, desidratada, com tufos de pelos emaranhados e áreas de alopecia por autolimpeza excessiva (overgrooming) gerada pelo estresse hiperadrenérgico.',
      'Vômitos intermitentes (por comer rápido demais ou estímulo central) e fezes volumosas/diarreia frequente decorrente de hipermotilidade intestinal.',
      'Intolerância ao calor e busca ativa por pisos frios ou banheiros decorrente da termogênese desacoplada excessiva.'
    ],
    sinaisApatiaEOutros: [
      'Forma Apática (5-10%): depressão profunda, recusa alimentar (anorexia), caquexia extrema e fraqueza muscular grave.',
      'Ventroflexão de pescoço: incapacidade de sustentar a cabeça em decorrência de fraqueza miopática ou hipocalemia secundária.',
      'Cegueira súbita bilateral e midríase arreativa com hifema decorrente de descolamento de retina por crise hipertensiva sistêmica (PAS >= 180 mmHg).',
      'Dispneia, taquipneia e ortopneia decorrentes de efusão pleural e edema pulmonar cardiogênico induzidos pela cardiomiopatia tireotóxica descompensada.'
    ]
  },

  diagnosis: {
    tabelaGruposAAHA: {
      kind: 'clinicalTable',
      caption: 'Categorização Diagnóstica do Hipertireoidismo Felino (Diretrizes AAHA / AAFP)',
      headers: ['Grupo', 'Quadro Clínico', 'T4 Total', 'fT4 por Diálise', 'TSH Felino', 'Conduta Médica'],
      rows: [
        ['Grupo 1 (Clássico)', 'Sinais clínicos típicos e nódulo tireoidiano palpável', 'Elevado (>4,0 mcg/dL)', 'Elevado', 'Suprimido (<0,03 ng/mL)', 'Hipertireoidismo confirmado; iniciar tratamento imediato'],
        ['Grupo 2 (Subclínico / Precoce)', 'Perda de peso sutil ou assintomático', 'Metade superior do normal (2,5 a 4,0)', 'Normal a limítrofe', 'Baixo ou normal', 'Monitorar clinicamente e retestar em 30 a 60 dias'],
        ['Grupo 3 (Doença Não Tireoidiana)', 'Sinais de hipertireoidismo mascarados por comorbidade (DRC, IBD)', 'Normal a limítrofe (eutireoideo doente)', 'Elevado (falso-positivo)', 'Normal a detectável', 'Tratar a comorbidade primária e reavaliar T4 total após estabilização'],
        ['Grupo 4 (Excluído / Eutireoideo)', 'Sinais inespecíficos', 'Normal baixo (<2,0 mcg/dL)', 'Normal', 'Normal', 'Hipertireoidismo altamente improvável; investigar diferenciais']
      ]
    },
    raciocinioClinico:
      'Abordagem diagnóstica estruturada e avaliação sistêmica simultânea:\n\n' +
      '- Confirmação laboratorial: demonstração inequívoca da secreção autônoma tireoidiana através de dosagens hormonais séricas em laboratório de referência.\n' +
      '- Rastreio de órgãos-alvo: avaliação concomitante das repercussões clínicas e hemodinâmicas nos rins, miocárdio e circulação retiniana, evitando decisões baseadas em testes isolados.',
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Dosagem de Tiroxina Total Sérica (T4 Total / TT4)',
        description:
          'Primeira linha diagnóstica e teste de triagem padrão. Mede a fração livre e a fração ligada a proteínas plasmáticas.',
        purpose: 'Triagem e confirmação da maioria dos casos clínicos.',
        interpretation:
          'Critérios de interpretação para T4 total:\n\n' +
          '- Valores francamente elevados: fecham o diagnóstico quando associados a sinais clínicos compatíveis ou nódulo tireoidiano palpável.\n' +
          '- Valores limítrofes (2,5 a 4,0 mcg/dL): ocorrem em 5 a 10% dos casos devido à fase inicial precoce, flutuação hormonal circadiana ou supressão por comorbidade grave (eutireoideo doente), exigindo painel complementar.',
        limitations:
          'Não exclui a doença se o resultado estiver normal em gato com forte suspeita clínica ou comorbidade grave.',
        isGoldStandard: false
      },
      {
        stepNumber: 2,
        title: 'Dosagem de T4 Livre por Diálise em Equilíbrio (fT4ed)',
        description:
          'Mede exclusivamente a fração livre metabolicamente ativa do hormônio não ligada a proteínas, utilizando método de diálise em equilíbrio.',
        purpose: 'Esclarecimento de casos duvidosos ou com TT4 normal-alto.',
        interpretation:
          'Sensibilidade analítica e armadilhas de especificidade do fT4ed:\n\n' +
          '- Alta sensibilidade (> 98%): elevação consistente em praticamente todos os felinos hipertireoideos ativos.\n' +
          '- Risco de falso-positivo: especificidade menor que o TT4, com falsos-positivos em 10 a 12% dos felinos eutetireoideos geriátricos com afecções não tireoidianas graves.',
        limitations:
          'NUNCA deve ser interpretado isoladamente sem a dosagem de TT4. Um fT4 alto com TT4 no terço inferior da normalidade aponta para doença não tireoidiana, e NÃO hipertireoidismo.',
        isGoldStandard: false
      },
      {
        stepNumber: 3,
        title: 'Dosagem de TSH Felino Endógeno',
        description:
          'Mensuração do hormônio tireoestimulante por imunoensaio validado específico para a espécie felina.',
        purpose: 'Diferenciação hormonal refinada de casos borderline e monitoramento.',
        interpretation:
          'Padrão de secreção do TSH no hipertireoidismo felino:\n\n' +
          '- Supressão profunda (< 0,03 ng/mL): feedback hipofisário negativo persistente na doença ativa não tratada.\n' +
          '- Painel confirmatório limítrofe: combinação de TT4 normal-alto com fT4ed elevado e TSH indetectável confirma doença precoce com máxima especificidade.\n' +
          '- Exclusão diagnóstica: TSH mensurável ou elevado (> 0,05 ng/mL) afasta a hipótese de hipertireoidismo virgem de tratamento com altíssima probabilidade.',
        limitations:
          'Alguns ensaios comerciais caninos não possuem sensibilidade analítica suficiente no limite inferior para distinguir concentrações muito baixas em felinos.',
        isGoldStandard: false
      },
      {
        stepNumber: 4,
        title: 'Cintilografia Tireoidiana com Pertecnetato de Tecnécio (99mTcO4-)',
        description:
          'Exame de imagem nuclear de alta resolução que avalia o parênquima funcional da tireoide em comparação com a captação das glândulas salivares zigomáticas e mandibulares.',
        purpose: 'Mapeamento anatômico, quantificação funcional e identificação de tecido ectópico ou malignidade.',
        interpretation:
          'Padrão-ouro em medicina nuclear diagnóstica:\n\n' +
          '- Critério quantitativo: razão de captação tireoide:glândula salivar > 1,0 confirma tecido hiperfuncionante autônomo.\n' +
          '- Mapeamento anatômico de precisão: revela doença bilateral em 70% dos gatos (mesmo com nódulo palpável único) e localiza ectopias funcionais no mediastino anterior (3 a 5%).\n' +
          '- Detecção de carcinomas: identifica massas expansivas com captação heterogênea, invasão local e focos metastáticos torácicos.',
        limitations:
          'Disponibilidade restrita a centros universitários e hospitais veterinários terciários autorizados para medicina nuclear.',
        isGoldStandard: true
      },
      {
        stepNumber: 5,
        title: 'Avaliação da Função Renal e Estadiamento IRIS Basal',
        description:
          'Urinálise completa por cistocentese com mensuração da densidade urinária (USG) por refratometria, associada a dosagens séricas de creatinina, ureia, SDMA e fósforo.',
        purpose: 'Identificação de lesão renal preexistente e estabelecimento do baseline antes da intervenção.',
        interpretation:
          'Avaliação funcional e identificação de DRC subclínica:\n\n' +
          '- Interpretação da densidade urinária: USG < 1,035 com creatinina na faixa de referência (ex.: 1,2 mg/dL) sugere fortemente DRC estágio IRIS 2 a 3 preexistente.\n' +
          '- Rastreio de desmascaramento: a reversão da hiperfiltração pós-tratamento revelará a azotemia renal basal oculta.',
        limitations:
          'A creatinina sérica isolada subestima severamente o déficit funcional em razão da hiperfiltração e da sarcopenia.',
        isGoldStandard: false
      },
      {
        stepNumber: 6,
        title: 'Mensuração da Pressão Arterial Sistólica (PAS) por Doppler Vascular',
        description:
          'Aferição metódica da pressão arterial sistólica utilizando técnica Doppler periférica (artéria radial ou coccígea) em ambiente calmo após aclimatação.',
        purpose: 'Detecção precoce de hipertensão arterial sistêmica secundária.',
        interpretation:
          'Estratificação de risco e emergência hipertensiva por Doppler:\n\n' +
          '- Risco moderado de LOA: PAS entre 160 e 179 mmHg demanda intervenção farmacológica e monitoramento contínuo.\n' +
          '- Risco severo de LOA (PAS >= 180 mmHg): emergência hipertensiva com perigo iminente de descolamento de retina, cegueira bilateral e encefalopatia vascular.',
        limitations:
          'Estresse de contenção (efeito do avental branco) pode inflar a PAS; realizar 5 a 7 aferições consecutivas descartando a primeira.',
        isGoldStandard: false
      }
    ]
  },

  treatment: {
    tabelaMetimazol: {
      kind: 'clinicalTable',
      caption: 'Protocolo de Titulação e Metas Terapêuticas com Metimazol',
      headers: ['Fase do Manejo', 'Dose Inicial por Gato', 'Intervalo de Reavaliação', 'Parâmetros Laboratoriais', 'Meta Terapêutica'],
      rows: [
        ['Iniciação Terapêutica', '1,25 a 2,5 mg/gato VO q12h (ou 2,5 mg q24h)', 'A cada 2 a 3 semanas', 'T4 total sérico, creatinina, ureia, hemograma, PAS Doppler', 'T4 total no terço inferior (1,0 a 2,5 mcg/dL) com creatinina estável'],
        ['Titulação Escalonada', 'Incrementos de 1,25 mg/gato/dia conforme resposta', 'A cada 3 a 4 semanas', 'T4 total, TSH felino, SDMA, urinálise', 'Evitar hipotireoidismo iatrogênico e monitorar função renal'],
        ['Manutenção Longitudinal', 'Dose individualizada mínima eficaz', 'A cada 3 a 6 meses', 'T4 total, creatinina, enzimas hepáticas, PAS', 'Eutireoidismo estável e bem-estar clínico duradouro']
      ]
    },
    drcConcomitante:
      'Diretrizes de manejo na nefropatia crônica concomitante (Geddes & Aguiar, 2022):\n\n' +
      '- REGRA DE OURO: Nunca manter hipertireoidismo intencionalmente em gatos com Doença Renal Crônica sob alegação de sustentar hiperfiltração glomerular.\n' +
      '- Danos da tireotoxicose mantida: indução progressiva de glomeruloesclerose, proteinúria patológica, hipertensão e necrose miocárdica que aceleram a perda irreversível de néfrons funcionais.\n' +
      '- Meta clínica: restaurar o eutireoidismo de forma gradual e controlada, prevenindo rigorosamente o hipotireoidismo iatrogênico.',
    iodoRadioativo:
      'Radioiodoterapia com Iodo-131 (I-131) como terapia curativa definitiva de eleição:\n\n' +
      '- Dosimetria contemporânea (Peterson & Rishniw, 2021): cálculo de dose estritamente individualizada (mediana ~1,90 mCi; faixa de 0,95 a 10,6 mCi) baseada no escore clínico, tamanho nodular e captação cintilográfica.\n' +
      '- VETO FARMACOLÓGICO: conduta contraindica dose empírica universal ou NÃO fixa sem planejamento individualizado.\n' +
      '- Eficácia comprovada: taxas de remissão curativa superiores a 95% em dose única, com incidência mínima de hipotireoidismo iatrogênico tardio.',
    objetivosTerapeuticos: [
      'Restaurar o estado de eutireoidismo sustentado de forma segura e progressiva.',
      'Evitar a indução de hipotireoidismo iatrogênico permanente, o qual reduz abruptamente a TFG e acelera a progressão da azotemia renal.',
      'Controlar a cardiomiopatia tireotóxica e a hipertensão arterial sistêmica, prevenindo danos vasculares e insuficiência cardíaca congestiva.',
      'Monitorar longitudinalmente e tratar a Doença Renal Crônica desmascarada após o controle da tireotoxicose.'
    ],
    modalidadesPrincipais: [
      {
        drug: 'Radioiodoterapia com Iodo-131 (I-131)',
        indication: 'Terapia curativa definitiva de primeira escolha para hipertireoidismo felino benigno e maligno.',
        dose: 'Individualizada com base na cintilografia e tamanho nodular (Peterson & Rishniw 2021: mediana ~1,90 mCi; faixa 0,95 a 10,6 mCi SC em dose única); doses de 10 a 30 mCi para carcinomas.',
        mechanism:
          'Captação e emissão beta citotóxica localizada:\n\n' +
          '- Transporte ativo: o radioisótopo I-131 é incorporado pelas células foliculares autônomas via simporte sódio-iodeto (NIS).\n' +
          '- Citotoxicidade seletiva: radiação beta de curto alcance (2 mm) destrói o tecido hiperativo, preservando paratireoides e folículos normais atróficos.',
        notes: 'Taxa de cura >95% com dose única. Não requer anestesia geral. Exige isolamento radiológico hospitalar regulamentado por 3 a 7 dias até decaimento da radiação ambiental. Trata tecido tireoidiano ectópico e intratorácico inacessível à cirurgia.',
        contraindications: 'Gatos com DRC descompensada estágio IRIS 4 ou azotemia grave não controlada, onde a queda irreversível da TFG pós-cura possa desencadear uremia terminal refratária.'
      },
      {
        drug: 'Metimazol / Tiamazol (Terapia Médica Reversível)',
        indication: 'Controle médico crônico contínuo ou estabilização prévia ("ensaio terapêutico renal") antes de I-131 ou tireoidectomia cirúrgica.',
        dose:
          'Esquema posológico padronizado por felino (AAHA 2023):\n\n' +
          '- Via oral: 1,25 a 2,5 mg/gato VO a cada 12 horas ou 2,5 mg/gato VO a cada 24 horas.\n' +
          '- Gel transdérmico: mesma posologia aplicada na face interna da concha auricular com luvas descartáveis em gel lipossomal (PLO).',
        frequency: 'q12h ou q24h',
        duration: 'Vitalício (ou até intervenção curativa)',
        mechanism: 'Inibe competitivamente a enzima tireoperoxidase (TPO), bloqueando a oxidação do iodeto e o acoplamento das iodotirosinas para formação de T4 e T3. Não causa morte celular nem remove o adenoma, que permanece crescendo.',
        reassess: 'Reavaliar TT4, creatinina, ureia, hemograma completo e enzimas hepáticas a cada 2 a 4 semanas até estabilização da dose e meta terapêutica (T4 total entre 1,0 e 2,5 mcg/dL); após, monitorar a cada 3 a 6 meses.',
        cautions: 'Efeitos adversos leves e transitórios (vômitos, hiporexia, letargia em 10-15% dos gatos) melhoram com administração junto ao alimento ou conversão para transdérmico.',
        contraindications:
          'Critérios de suspensão definitiva imediata (interromper e nunca reintroduzir):\n\n' +
          '- Toxicidade dermatológica: escoriações faciais graves por prurido automutilante necrosante.\n' +
          '- Toxicidade hepática: hepatite medicamentosa aguda colestática com icterícia clínica.\n' +
          '- Discrasias hematológicas: agranulocitose, neutropenia severa, trombocitopenia ou anemia hemolítica imunomediada induzida pelo fármaco.'
      },
      {
        drug: 'Carbimazol',
        indication: 'Alternativa ao metimazol oral com menor taxa de intolerância gastrointestinal em países onde está registrado.',
        dose: '5 mg/gato VO q12h a q24h.',
        mechanism: 'Pró-fármaco absorvido no trato digestivo e enzimaticamente convertido in vivo em metimazol ativo na circulação.',
        contraindications: 'Pacientes com histórico de hipersensibilidade prévia grave ao metimazol (reação cruzada total).'
      },
      {
        drug: 'Alimento Terapêutico com Restrição Estrita de Iodo (Hill\'s Prescription Diet y/d)',
        indication: 'Opção conservadora não medicamentosa para gatos de difícil manipulação onde o I-131 e a cirurgia são inviáveis.',
        dose: 'Alimentação exclusiva ad libitum ou calculada para a necessidade energética basal.',
        mechanism: 'Contém teores de iodo ultra-baixos (<0,2 ppm ou mg/kg na matéria seca). Priva as células foliculares tireoidianas do substrato indispensável para a síntese molecular de T4 e T3, reduzindo os níveis circulantes em 4 a 12 semanas.',
        cautions: 'Exige adesão e exclusividade alimentar ABSOLUTA de 100%. Qualquer ingestão acidental de petiscos, leite, restos de comida, água com cloro/iodo ou presas caçadas no ambiente anula a eficácia do tratamento.',
        contraindications: 'Contraindicado em gatos com Doença Renal Crônica azotêmica evidente (estágios IRIS 3 e 4), pois a dieta y/d não possui a restrição proteica e de fósforo nem a densidade calórica adequadas para nefropatas avançados.'
      },
      {
        drug: 'Tireoidectomia Cirúrgica (Técnica Intracapsular Modificada)',
        indication: 'Remoção cirúrgica do(s) lobo(s) acometido(s) quando há disponibilidade de cirurgião experiente e o I-131 não está disponível.',
        mechanism: 'Excisão física do adenoma preservando a glândula paratireoide externa/caudal e sua vascularização carotídea.',
        cautions:
          'Cuidados perioperatórios e prevenção de hipocalcemia tetânica:\n\n' +
          '- Estabilização prévia: eutiroidismo farmacológico com metimazol por 3 a 4 semanas antes da intervenção cirúrgica.\n' +
          '- Monitoramento de cálcio ionizado: aferição a cada 12 horas nas primeiras 72 horas pós-operatórias em procedimentos bilaterais pelo risco de hipoparatireoidismo iatrogênico agudo.'
      }
    ],
    terapiaSintomaticaCardiovascular: [
      {
        drug: 'Atenolol',
        dose: '6,25 a 12,5 mg/gato VO a cada 12 a 24 horas.',
        indication: 'Controle de taquicardia sinusal severa (>220 bpm), arritmias ventriculares hiperadrenérgicas, hipertensão e sintomas de tireotoxicose miocárdica até que o antitireoidiano reduza os níveis hormonais.',
        cautions:
          'Ações farmacodinâmicas e contraindicações formais:\n\n' +
          '- Mecanismo: betabloqueador beta-1 seletivo que reduz a frequência cardíaca, o inotropismo e o consumo miocárdico de O2.\n' +
          '- Contraindicações: insuficiência cardíaca descompensada ativa com edema pulmonar, derrame pleural grave ou bradiarritmias.'
      },
      {
        drug: 'Besilato de Anlodipino',
        dose: '0,625 a 1,25 mg/gato VO a cada 24 horas.',
        indication: 'Hipertensão arterial sistêmica secundária (PAS persistente >= 160 mmHg) para proteção contra lesões vasculares e descolamento retiniano.'
      }
    ],
    manejoDaDRCConcomitante:
      'Abordagem terapêutica escalonada perante desmascaramento de DRC pós-eutireoidismo:\n\n' +
      '- Reestadiamento IRIS sistemático: mensurar creatinina, SDMA, razão proteína:creatinina urinária (UPC) e aferir PAS por Doppler.\n' +
      '- Conduta em azotemia leve (IRIS Estágio 2, creatinina 1,6 a 2,8 mg/dL): manter eutireoidismo rigoroso e associar medidas nefroprotetoras padrão (dieta renal, quelantes entéricos de fósforo e hidratação parenteral/oral assistida).\n' +
      '- Ajuste em azotemia moderada a severa (IRIS Estágio 3 a 4 ou aumento abrupto de creatinina > 1,0 mg/dL): reduzir discretamente a dose de metimazol para situar o T4 total no terço superior da normalidade (2,5 a 4,0 mcg/dL), restabelecendo nível seguro de perfusão glomerular para preservar a sobrevida.',
  },

  complications: {
    iatrogenicasETerapeuticas: [
      'Hipotireoidismo Iatrogênico: complicação frequente pós-I-131, pós-tireoidectomia bilateral ou por superdosagem de metimazol. Caracteriza-se por T4 total subnormal com TSH sérico elevado. O hipotireoidismo iatrogênico é nefrodestrutivo: reduz a TFG de maneira acentuada e correlaciona-se diretamente com o desenvolvimento acelerado de azotemia grave e menor tempo de sobrevida. Gatos com hipotireoidismo iatrogênico e azotemia exigem reposição imediata com Levotiroxina sódica oral (10 a 20 mcg/kg VO q24h ou 50 mcg/gato q24h) com alvo de restaurar o eutireoidismo laboratorial.',
      'Desmascaramento de Azotemia Renal (Masked CKD): redução da TFG com aumento de creatinina e ureia 2 a 8 semanas após a normalização do T4. Ocorre em 15% a 40% dos pacientes.',
      'Hipocalcemia Aguda Grave pós-Tireoidectomia: necrose isquêmica ou remoção inadvertida das quatro glândulas paratireoides provoca queda do cálcio ionizado, tetania muscular, tremores de cabeça, fasciculações e convulsões nas primeiras 24 a 72 horas pós-cirurgia.',
      'Reações adversas graves idiossincráticas ao Metimazol: escoriações cutâneas graves por prurido facial automutilante (2-3%), hepatopatia tóxica aguda colestática com necrose hepática (1-2%), e agranulocitose/trombocitopenia imunomediada (1%). Exigem suspensão permanente do fármaco.'
    ],
    sistemicasECardiovasculares: [
      'Tempestade Tireotóxica (Thyroid Storm): crise endócrina aguda com risco iminente de óbito, desencadeada por estresse agudo, cirurgia, palpação tireoidiana vigorosa, infecções intercorrentes ou abandono abrupto de tratamento. Caracterizada por hipertermia severa (>41°C), taquicardia extrema (>260 bpm), colapso cardiovascular hiperdinâmico, hipotensão terminal, arritmias ventriculares fatais e convulsões.',
      'Emergência Hipertensiva e Cegueira Aguda: lesão retiniana aguda com hemorragia de câmara anterior (hifema), edema retiniano, hemorragias em chama de vela e descolamento seroso total da retina por picos de PAS > 180-200 mmHg, resultando em cegueira bilateral irreversível se não tratada em poucas horas.',
      'Insuficiência Cardíaca Congestiva (ICC) e Tromboembolismo Aórtico (FATE): efusão pleural bilateral e edema pulmonar agudo gerados pela cardiomiopatia tireotóxica grave; estase sanguínea e dilatação atrial aumentam o risco de formação de trombos no átrio esquerdo com embolização para o canal aórtico trifurcado (paraplegia aguda dos membros pélvicos dolorosa, ausência de pulso femoral e coxins cianóticos).'
    ],
    prognostico:
      'Expectativa de sobrevida e fatores prognósticos determinantes:\n\n' +
      '- Sobrevida global esperada: excelente a muito boa em adenomas tratados com I-131 ou metimazol estabilizado, com mediana de 2 a 4 anos pós-diagnóstico.\n' +
      '- Fatores prognósticos desfavoráveis: severidade da DRC preexistente ou desmascarada (IRIS 3 ou 4), hipotireoidismo iatrogênico persistente com azotemia, insuficiência cardíaca descompensada e carcinomas tireoidianos indiferenciados com invasão local ou metástases.',
  },

  prevention: {
    rastreamentoGeriátrico:
      'Estratégias de vigilância clínica e detecção precoce em pacientes senis:\n\n' +
      '- Palpação cervical sistemática: exame do sulco jugular em todas as consultas clínicas de felinos com idade >= 7 anos (rastreio de thyroid slip).\n' +
      '- Painel laboratorial preventivo: dosagem anual ou semestral de T4 total sérico em gatos acima de 8 a 9 anos integrando o check-up geriátrico de rotina.\n' +
      '- Monitoramento ponderal seriado: pesagens rigorosas em balanças pediátricas de alta sensibilidade para identificar perda ponderal insidiosa precocemente.',
    planoDomiciliarEMonitoramento: [
      'Monitoramento semanal do peso corporal do felino em balança digital pediátrica ou veterinária.',
      'Mensuração rotineira da Frequência Respiratória em Repouso (FRR) durante o sono profundo do gato: valores persistentemente superiores a 30 movimentos por minuto sinalizam descompensação cardiovascular iminente (edema pulmonar ou efusão pleural) e demandam avaliação clínica de urgência.',
      'Aferição seriada da Pressão Arterial Sistólica a cada 3 a 6 meses para prevenir descolamentos silenciosos de retina.',
      'Caso o tutor utilize metimazol em gel transdérmico, exigir expressamente o uso de luvas descartáveis durante a aplicação na orelha, com revezamento diário da pina auricular e higienização prévia para remover resíduos, evitando toxicidade tireoidiana no próprio tutor e farmacodermia no paciente.',
      'Se o tratamento for realizado exclusivamente com dieta restrita em iodo (y/d), reforçar ao tutor a impossibilidade de oferecer qualquer outro petisco, alimento caseiro, sachê convencional ou suplemento vitamínico.'
    ],
    errosComuns: [
      'Acreditar que um T4 total dentro da faixa de referência normal descarta categoricamente o hipertireoidismo em um felino com clínica evidente.',
      'Interpretar uma dosagem isolada de T4 livre por diálise elevada como confirmação diagnóstica sem considerar a presença de doenças não tireoidianas concomitantes.',
      'Suspender ou manter deliberadamente o gato hipertireoideo com objetivo de preservar uma creatinina artificialmente baixa, negligenciando a destruição de néfrons e o estresse cardiovascular da tireotoxicose.',
      'Prescrever metimazol em doses calculadas por quilograma de peso corporal (mg/kg), o que resulta em sobredosagem tóxica grave em gatos caquéticos; a dose é padronizada POR GATO.',
      'Assumir que a melhora clínica e laboratorial com metimazol significa cura biológica; a suspensão do fármaco gera recaída clínica em poucos dias e o tumor folicular permanece em crescimento.',
      'Deixar de monitorar cálcio ionizado sérico nas primeiras 72 horas pós-tireoidectomia bilateral.'
    ],
    redFlags: [
      'Surgimento súbito de cegueira bilateral com midríase e hifema (urgência hipertensiva absoluta).',
      'Taquipneia, padrão respiratório restritivo abdominal e ortopneia (insuficiência cardíaca descompensada / efusão pleural).',
      'Febre extrema (>40,5°C), desidratação severa e colapso circulatório (tempestade tireotóxica emergencial).',
      'Prurido facial excruciante com lacerações e escoriações crostosas em cabeça e pescoço (reação adversa grave ao metimazol exigindo suspensão imediata).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-canina',
    'hipertensao-arterial-sistemica-caes-gatos',
    'diabetes-mellitus-felina',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'hipotireoidismo-adquirido-caes-gatos'
  ],
  relatedMedicationSlugs: ['metimazol', 'atenolol', 'anlodipino', 'benazepril', 'levotiroxina'],
  references: [
    {
      id: 'ref-ht-aaha-2023',
      title: '2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines',
      citationText: 'Bugbee A, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135.',
      authors: 'Bugbee A, et al.',
      year: 2023,
      journal: 'Journal of the American Animal Hospital Association',
      volume: '59',
      pages: '113-135',
      sourceType: 'Diretriz de Consenso AAHA',
      url: 'https://doi.org/10.5326/JAAHA-MS-7297',
      doi: '10.5326/JAAHA-MS-7297',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-aafp-2016',
      title: '2016 AAFP Guidelines for the Management of Feline Hyperthyroidism',
      citationText: 'Carney HC, Ward CR, Bailey SJ, et al. 2016 AAFP Guidelines for the Management of Feline Hyperthyroidism. J Feline Med Surg. 2016;18(5):400-416.',
      authors: 'Carney HC, Ward CR, Bailey SJ, et al.',
      year: 2016,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '18',
      pages: '400-416',
      sourceType: 'Diretriz de Consenso AAFP',
      url: 'https://doi.org/10.1177/1098612X15627226',
      doi: '10.1177/1098612X15627226',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-geddes-2022',
      title: 'Interactions between feline hyperthyroidism and chronic kidney disease',
      citationText: 'Geddes RF, Aguiar J. Interactions between feline hyperthyroidism and chronic kidney disease: A review. J Feline Med Surg. 2022;24(7):641-650.',
      authors: 'Geddes RF, Aguiar J.',
      year: 2022,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '24',
      pages: '641-650',
      sourceType: 'Revisão Sistemática',
      url: 'https://doi.org/10.1177/1098612X221090390',
      doi: '10.1177/1098612X221090390',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-stammeleer-2024',
      title: 'Blood pressure and prevalence of systemic hypertension in cats with hyperthyroidism before and after radioiodine therapy',
      citationText: 'Stammeleer L, et al. Blood pressure and prevalence of systemic hypertension in cats with hyperthyroidism before and after radioiodine therapy. J Vet Intern Med. 2024;38(3):1359-1369.',
      authors: 'Stammeleer L, et al.',
      year: 2024,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '38',
      pages: '1359-1369',
      sourceType: 'Estudo Prospectivo',
      url: 'https://doi.org/10.1111/jvim.17032',
      doi: '10.1111/jvim.17032',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-ht-peterson-i131-2021',
      title: 'Individualized radioiodine treatment of cats with hyperthyroidism',
      citationText: 'Peterson ME, Rishniw M. Individualized radioiodine treatment of cats with hyperthyroidism: Evaluation of an algorithm based on thyroid volume and scintigraphic uptake. J Vet Intern Med. 2021;35(5):2140-2151.',
      authors: 'Peterson ME, Rishniw M.',
      year: 2021,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '35',
      pages: '2140-2151',
      sourceType: 'Estudo Clínico',
      url: 'https://doi.org/10.1111/jvim.16228',
      doi: '10.1111/jvim.16228',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-ht-ettinger-2024',
      title: 'Disorders of the Thyroid Gland: Feline Hyperthyroidism',
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1820-1845.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-nelson-couto-2020',
      title: 'Endocrine Disorders: Feline Hyperthyroidism',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:785-804.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-bsava-endo-2020',
      title: 'BSAVA Manual of Canine and Feline Endocrinology',
      citationText: 'Mooney CT, Peterson ME. BSAVA Manual of Canine and Feline Endocrinology. 5th ed. Gloucester: British Small Animal Veterinary Association; 2020.',
      authors: 'Mooney CT, Peterson ME.',
      year: 2020,
      journal: 'BSAVA Manual of Canine and Feline Endocrinology (5th ed)',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-plumb-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed)",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:692-696 (Methimazole).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ht-brassard-2026',
      title: 'Evaluation of canine and feline thyroid-stimulating hormone assays in hyperthyroid cats',
      citationText: 'Brassard C, et al. Evaluation of canine and feline thyroid-stimulating hormone assays in hyperthyroid cats. J Feline Med Surg. 2026;28(1):1098612X251398915.',
      authors: 'Brassard C, et al.',
      year: 2026,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '28',
      pages: 'e251398915',
      sourceType: 'Estudo Clínico',
      url: 'https://doi.org/10.1177/1098612X251398915',
      doi: '10.1177/1098612X251398915',
      evidenceLevel: 'B'
    }
  ]
};
