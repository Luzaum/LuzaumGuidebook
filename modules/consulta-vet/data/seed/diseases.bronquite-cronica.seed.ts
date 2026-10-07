import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

const ASSET_BASE = '/assets/consulta-vet/diseases/bronquite-cronica';
const BRUYETTE_SOURCE =
  'Fonte: Bruyette D. Clinical Small Animal Internal Medicine. Wiley Blackwell.';

/*
 * Bronquite Crônica em Cães e Gatos — Monografia Clínica Padrão Ouro.
 * Atualizado com base em:
 * - Literatura contemporânea e consensos internacionais:
 *   Lyssens et al. (2025 - Algoritmo ECVIM para bronquite crônica, bronquiectasia e broncomalácia em cães, Front Vet Sci 12:1686007),
 *   Chan & Johnson (2023 - Ensaio prospectivo de corticoterapia inalatória com AeroDawg em cães, JVIM 37:660-669),
 *   Barchilon & Reinero (2023 - Terapia inalatória na doença inflamatória de vias aéreas felinas, JFMS 25, DOI 10.1177/1098612X231193054),
 *   Werner et al. (2023 - Comparação do microbioma respiratório por 16S em asma e bronquite felina, Front Vet Sci 10:1148849),
 *   Hartung et al. (2023 - Testes alérgicos e FLAD em gatos, Front Vet Sci 10:1267496),
 *   Lappin et al. / ISCAID (2017/2026 - Diretrizes para uso racional de antimicrobianos no trato respiratório, JVIM 31:279-294),
 *   Peeters et al. (2000 - Culturas quantitativas e citologia em lavado broncoalveolar canino, JVIM 14:534-541),
 *   Lebastard et al. (2022 - Cultura quantitativa de BALF e necessidade de antibióticos em cães, JVIM 36:1444-1453),
 *   Cocayne et al. (2011 - Inflamação subclínica persistente em vias aéreas felinas sob corticoide, JFMS 13:558-563),
 *   Munro (2026 - Abordagem integrada à tosse crônica em cães e gatos, Vet Clin North Am Small Anim Pract 56:825-852),
 *   Gareis & Schulz (2026 - Atualização em imunopatogênese e terapia de asma felina, Vet Clin North Am Small Anim Pract 56:971-993)
 * - Livros-texto do acervo:
 *   Nelson & Couto 6ª ed. (cap. 20 - Testes diagnósticos respiratórios; cap. 21 - Afecções de traqueia e brônquios, pp. 324-333),
 *   Feline Emergency and Critical Care Medicine 2ª ed. 2023 (cap. 12 - Lower Airway Disease, pp. 119-127),
 *   Veterinary Emergency and Critical Care Procedures 3ª ed. (cap. 3 - Coleta respiratória e BAL, pp. 132-137),
 *   Plumb's Veterinary Drug Handbook 10ª ed. (monografias de fluticasona, albuterol, terbutalina, teofilina, hidrocodona e doxiciclina)
 */
export const bronquiteCronicaRecord: DiseaseRecord = {
  id: 'disease-bronquite-cronica-caes-gatos',
  slug: 'bronquite-cronica-caes-gatos',
  title: 'Bronquite crônica em cães e gatos',
  subtitle:
    'Monografia clínica avançada: fisiopatologia da esteira mucociliar, Lei de Poiseuille, diferenciação entre bronquite neutrofílica e asma eosinofílica (FLAD), lavado broncoalveolar (BAL), imagem torácica e broncoscopia dinâmica, algoritmo ECVIM 2025 para bronquiectasia e broncomalácia, stewardship antimicrobiano ISCAID 2026 e protocolo de emergência felina',
  synonyms: [
    'Bronquite crônica canina (CCB)',
    'Bronquite crônica felina',
    'Doença inflamatória crônica das vias aéreas inferiores',
    'Feline lower airway disease (FLAD)',
    'Chronic bronchitis in dogs and cats',
    'Traqueobronquite crônica idiopática',
  ],
  species: ['dog', 'cat'],
  category: 'respiratorio',
  categories: [
    'respiratorio',
    'clinica-medica',
    'medicina-felina',
    'farmacologia-terapeutica',
    'diagnostico-por-imagem',
    'terapia-intensiva',
  ],
  tags: [
    'Bronquite Crônica',
    'Tosse Crônica',
    'Lavado Broncoalveolar (BAL)',
    'Bronquiectasia',
    'Broncomalácia',
    'Asma Felina vs Bronquite',
    'Corticoterapia Inalatória',
    'Fluticasona',
    'ISCAID 2026',
    'Algoritmo ECVIM 2025',
    'Nelson & Couto',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['bronquite-cronica-caes-gatos'],

  quickSummary:
    'A bronquite crônica em cães e gatos é uma síndrome inflamatória crônica que acomete a árvore brônquica e compromete gravemente a depuração mucociliar, cuja abordagem clínica moderna exige diferenciação precisa entre espécies e fenótipos:\n\n' +
    '- Definição operacional no cão: tosse presente na maioria dos dias por pelo menos dois meses consecutivos no último ano, sem outra afecção de base identificável (cardiopatia, colapso traqueal primário, infecção ativa, parasitas ou neoplasia); a inflamação é predominantemente neutrofílica não séptica, com hipersecreção de muco e remodelamento estrutural que frequentemente culmina em broncomalácia e bronquiectasia.\n' +
    '- Distinção crítica no gato: bronquite crônica e asma felina integram o espectro da doença de vias aéreas inferiores felina (FLAD), mas possuem bases fisiopatológicas distintas; a bronquite crônica felina é caracterizada por dano epitelial ciliado, inflamação neutrofílica não degenerativa e remodelamento, enquanto a asma é uma reação de hipersensibilidade Th2/IgE mediada por eosinófilos com broncoespasmo agudo reversível e risco de status asthmaticus fatal.\n' +
    '- Dinâmica de fluxo e Lei de Poiseuille: a resistência da via aérea é inversamente proporcional à quarta potência do raio (1/r^4); uma redução de 50% no calibre da pequena via condutora decorrente de edema ou tampão de muco derruba o fluxo aéreo para 1/16 do valor basal, explicando o esforço expiratório intenso ("expiratory push"), o aprisionamento aéreo e a intolerância ao esforço.\n' +
    '- Padrão-ouro diagnóstico com lavado broncoalveolar (BAL): a radiografia torácica pode revelar padrão brônquico clássico ("donuts" e "tram lines") ou atelectasia de lobo médio direito em gatos, mas pode ser inteiramente normal em até 15% dos casos; a citologia de BAL é o exame central para definir o perfil inflamatório (neutrófilos >14-18% na bronquite vs eosinófilos >18-20% na asma) e pesquisar bactérias intracelulares e espirais de Curschmann.\n' +
    '- Stewardship antimicrobiano e microbioma: culturas bacterianas positivas sem bactérias intracelulares ou sem inflamação séptica refletem colonização ou microbioma pulmonar residente, e não infecção verdadeira; diretrizes ISCAID 2017/2026 vetam o uso empírico de antibióticos para tosse brônquica crônica.\n' +
    '- Pilares terapêuticos modernos: manejo ambiental rigoroso (eliminação de fumaça, fragrâncias, poeira de areia), perda de peso em obesos, indução com corticoide oral e manutenção de longo prazo com corticoide inalatório via câmara espaçadora (fluticasona via AeroDawg ou AeroKat); broncodilatadores (albuterol/terbutalina) são estritamente de resgate no broncoespasmo agudo, com veto formal ao uso frequente crônico de albuterol racêmico devido ao perfil pró-inflamatório do S-albuterol.',

  quickDecisionStrip: [
    'Tosse por mais de 2 meses consecutivos após exclusão de cardiopatia, colapso traqueal, parasitas e infecção define bronquite crônica.',
    'No cão, bronquite crônica não é asma: broncoespasmo agudo é raro e a inflamação é predominantemente neutrofílica não degenerativa.',
    'No gato, diferencie bronquite (neutrofílica/remodelamento) de asma (eosinofílica/broncoespástica com risco de status asthmaticus).',
    'Radiografia torácica normal não descarta bronquite crônica: o lavado broncoalveolar (BAL) é o exame central para caracterizar a inflamação.',
    'Cultura bacteriana positiva de via aérea não prova infecção ativa: sem bactérias intracelulares na citologia, representa colonização ou microbioma.',
    'Não prescreva antibiótico empírico para toda tosse brônquica crônica: diretrizes ISCAID exigem evidência citológica de infecção bacteriana.',
    'Corticoide inalatório (fluticasona via spacer) é a base de manutenção crônica, minimizando a toxicidade dos glicocorticoides sistêmicos.',
    'Albuterol inalatório é droga de resgate agudo para broncoespasmo: o uso diário crônico agrava a inflamação pela ação do enantiômero S-albuterol.',
    'Nebulização com N-acetilcisteína é contraindicada em gatos: induz broncoconstrição e elevação acentuada da resistência das vias aéreas.',
    'Em gato em crise respiratória aguda, estabilize antes de qualquer exame: ofereça oxigênio e broncodilatador sem estresse de contenção física.',
  ],

  quickSummaryRich: {
    lead:
      'A abordagem moderna da bronquite crônica em cães e gatos superou o antigo empirismo de prescrever antibióticos e antitussígenos para qualquer tosse persistente:\n\n' +
      '- Compreensão da falha funcional da esteira mucociliar: a agressão mecânica e inflamatória crônica destrói os cílios, hipertrofia as glândulas mucosas e gera um ciclo vicioso de hipersecreção, tosse traumática e remodelamento irreversível (bronquiectasia e broncomalácia).\n' +
      '- Fenotipagem citológica e direcionamento de precisão: uso do lavado broncoalveolar (BAL) para diferenciar processos neutrofílicos de eosinofílicos, associado ao controle ambiental, corticoterapia inalatória com espaçador facial e preservação estrita do clearance de secreções.',
    leadHighlights: [
      'Falha crônica da esteira mucociliar e ciclo vicioso inflamatório',
      'Diferenciação fenotípica no BAL (neutrófilos na bronquite vs eosinófilos na asma)',
      'Manutenção com corticoide inalatório (fluticasona via AeroDawg/AeroKat)',
      'Stewardship ISCAID contra o uso empírico indiscriminado de antibióticos',
    ],
    pillars: [
      {
        title: 'Pilar 1: Conceito Temporal e Diferenciação Canina vs Felina',
        body:
          'Definição clínica rigorosa e distinção entre espécies e espectros patológicos:\n\n' +
          '- Critério temporal operacional no cão: tosse na maioria dos dias por pelo menos 2 meses consecutivos no último ano após exclusão de outras afecções ativas.\n' +
          '- Espectro de vias aéreas inferiores no gato: separação entre bronquite crônica neutrofílica (dano epitelial e remodelamento) e asma felina (hipersensibilidade Th2 e broncoespasmo reversível).\n' +
          '- Ausência de asma verdadeira no cão: bronquite alérgica canina com broncoespasmo agudo é extremamente rara.',
        highlights: ['Critério temporal >=2 meses', 'Bronquite neutrofílica vs Asma eosinofílica', 'Asma canina é rara'],
      },
      {
        title: 'Pilar 2: Dinâmica Mecânica, Lei de Poiseuille e Ciclo Vicioso',
        body:
          'Bases anatômicas e hemodinâmicas da obstrução condutora intratorácica:\n\n' +
          '- Quebra da esteira mucociliar: lesão epitelial ciliar combinada à hipertrofia de glândulas submucosas gera hipersecreção de muco espesso com capacidade reduzida de depuração.\n' +
          '- Impacto da Lei de Poiseuille (1/r^4): pequenas reduções do raio interno pela inflamação e tampões de muco multiplicam exponencialmente a resistência aérea.\n' +
          '- Padrão expiratório obstrutivo: a pressão intratorácica positiva na expiração colapsa precocemente brônquios estreitados, gerando esforço expiratório abdominal ("expiratory push") e aprisionamento gasoso.',
        highlights: ['Lei de Poiseuille (1/r^4)', 'Falha do clearance mucociliar', 'Padrão expiratório com prensa abdominal'],
      },
      {
        title: 'Pilar 3: Diagnóstico Fenotípico e Padrão-Ouro (BAL e Imagem)',
        body:
          'Investigação estruturada de exclusão e caracterização celular profunda:\n\n' +
          '- Radiografia torácica e suas armadilhas: presença de padrão brônquico com donuts e tram lines, mas com radiografias normais em parte dos doentes; atelectasia de lobo médio direito em felinos por plug mucoso.\n' +
          '- Lavado broncoalveolar (BAL) como padrão-ouro: quantificação de neutrófilos não degenerados, identificação de espirais de Curschmann e triagem de bactérias intracelulares.\n' +
          '- Tomografia computadorizada e broncoscopia dinâmica: mapeamento superior de bronquiectasias irreversíveis e diagnóstico em tempo real de broncomalácia.',
        highlights: ['BAL padrão-ouro citológico', 'Radiografia normal não exclui', 'TC e broncoscopia para dano estrutural'],
      },
      {
        title: 'Pilar 4: Farmacoterapia de Precisão, Terapias Inalatórias e Stewardship',
        body:
          'Protocolo terapêutico escalonado sem sobrecarga de antibióticos ou opioides:\n\n' +
          '- Corticoterapia inalatória como esteio: fluticasona via câmara espaçadora com máscara (AeroDawg ou AeroKat) reduz drasticamente a toxicidade esteroidal sistêmica.\n' +
          '- Racional de broncodilatadores: albuterol inalatório restrito ao resgate de crises de broncoespasmo; veto ao uso contínuo diário que potencializa a inflamação.\n' +
          '- Diretrizes ISCAID: antibióticos apenas quando há neutrófilos degenerados e bactérias intracelulares demonstradas; contraindicação absoluta de N-acetilcisteína nebulizada em gatos.',
        highlights: ['Fluticasona via espaçador', 'Albuterol estritamente como resgate', 'Stewardship antimicrobiano ISCAID'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Estruturado para Tosse Crônica — Cães e Gatos',
      steps: [
        {
          label: 'Passo 1: Confirmação do Critério Temporal e Estabilização Inicial',
          detail:
            'Demonstração objetiva de tosse crônica e avaliação imediata de estabilidade:\n\n' +
            '- Verificação cronológica: tosse diária ou quase diária por pelo menos 2 meses no cão e >2 a 3 meses no gato.\n' +
            '- Regra de ouro da emergência felina: se houver dispneia grave com boca aberta e cianose, interromper exames estressantes, fornecer oxigênio suplementar em gaiola e administrar broncodilatador de ação rápida (terbutalina parenteral) antes de radiografias.\n' +
            '- Caracterização do som da tosse: tosse áspera e seca no cão vs acessos paroxísticos que simulam vômito de bola de pelo no gato.',
        },
        {
          label: 'Passo 2: Exclusão de Cardiopatias, Colapso Traqueal e Parasitoses',
          detail:
            'Afastamento sistemático dos principais mimetizadores de tosse crônica:\n\n' +
            '- Avaliação cardiovascular: ecocardiograma e ausculta criteriosa em cães pequenos idosos para diferenciar tosse por aumento de átrio esquerdo (DMVD) de tosse brônquica primária; lembrar que gatos com insuficiência cardíaca congestiva raramente apresentam tosse primária.\n' +
            '- Triagem de parasitas cardiopulmonares: método de Baermann seriado para Aelurostrongylus abstrusus e Troglostrongylus em felinos, e Crenosoma vulpis / Angiostrongylus vasorum em caninos, além de testes antigênicos para Dirofilaria immitis.\n' +
            '- Inspeção de traqueia cervical e intratorácica: palpação do reflexo traqueal e radiografias inspiratórias e expiratórias para colapso traqueal dinâmico.',
        },
        {
          label: 'Passo 3: Radiografia Torácica e Tomografia Computadorizada',
          detail:
            'Mapeamento imaginológico da árvore brônquica e complicações estruturais:\n\n' +
            '- Radiografia torácica em 3 projeções: busca de padrão brônquico com espessamento parietal ("donuts" em corte transversal e "tram lines" em corte longitudinal), hiperinsuflação pulmonar com diafragma retificado e atelectasia do lobo médio direito em felinos por tampão mucoso.\n' +
            '- Reconhecimento da limitação radiográfica: radiografias normais não excluem bronquite crônica nem diferenciam bronquite de asma felina.\n' +
            '- Tomografia computadorizada de tórax: indicada em pacientes refratários para caracterizar dilatação brônquica permanente (bronquiectasia) e aprisionamento aéreo focal.',
        },
        {
          label: 'Passo 4: Broncoscopia Respiratória e Lavado Broncoalveolar (BAL)',
          detail:
            'Inspeção dinâmica direta da via aérea e obtenção do padrão-ouro citológico:\n\n' +
            '- Broncoscopia visual: avaliação de hiperemia de mucosa, perda de vascularização submucosa, estrias de muco mucopurulento e colapso expiratório da luz brônquica (broncomalácia dinâmica).\n' +
            '- Técnica de coleta por BAL: infusão de alíquotas de salina estéril aquecida (1 a 2 mL/kg) com aspiração suave imediata para estudo citológico e microbiológico.\n' +
            '- Fenotipagem citológica: contagem diferencial para classificar inflamação predominantemente neutrofílica não degenerativa (>14-18%) na bronquite crônica ou eosinofílica (>18-20%) na asma felina, além de pesquisa de espirais de Curschmann.',
        },
        {
          label: 'Passo 5: Análise Microbiológica Criteriosa e Stewardship',
          detail:
            'Interpretação rigorosa de culturas e testes moleculares:\n\n' +
            '- Critérios de infecção bacteriana verdadeira: presença obrigatória de neutrófilos degenerados e fagocitose de bactérias intracelulares associada a crescimento de cultura quantitativa (>1,7 x 10^3 CFU/mL).\n' +
            '- Desmistificação de culturas positivas isoladas: crescimento bacteriano sem neutrofilia degenerada representa contaminação orofaríngea ou colonização do microbioma respiratório.\n' +
            '- Painel de PCR respiratório: pesquisa molecular dirigida de Mycoplasma cynos e Bordetella bronchiseptica em cães, interpretada sempre em conjunto com o quadro citológico.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico Integrado da Bronquite Crônica — Cães e Gatos',
      steps: [
        {
          label: 'Fase 1: Manejo Ambiental Radical e Controle Ponderal',
          detail:
            'Remoção completa de gatilhos inalados e redução da sobrecarga torácica:\n\n' +
            '- Cessação de poluentes domésticos: eliminação rigorosa de fumaça de cigarro e vaping, incensos, velas aromáticas, desinfetantes clorados voláteis, aerossóis e poeira.\n' +
            '- Manejo específico felino: transição obrigatória para areia sanitária sem perfume e de baixíssima emissão de poeira; evitar caixas sanitárias fechadas que concentrem poeira.\n' +
            '- Troca para peitoral em cães: proibir coleiras de pescoço para evitar pressão mecânica sobre a traqueia e grandes brônquios durante passeios.\n' +
            '- Programa de perda de peso: redução calórica controlada em pacientes com sobrepeso (BCS >5/9) para restaurar complacência torácica e diminuir trabalho ventilatório.',
        },
        {
          label: 'Fase 2: Corticoterapia Anti-inflamatória de Indução e Manutenção',
          detail:
            'Supressão rápida da cascata inflamatória e transição para via inalatória:\n\n' +
            '- Indução sistêmica inicial: prednisona ou prednisolona oral na dose de 0,5 a 1,0 mg/kg VO q12h em cães e 1 a 2 mg/kg/dia VO em gatos por 5 a 10 dias para rápido alívio inflamatório.\n' +
            '- Introdução precoce de corticoide inalatório: iniciar dipropionato de fluticasona via câmara espaçadora com máscara facial (AeroDawg ou AeroKat);\n' +
            '  * Cães <20 kg: 100 mcg (1 puff q12h);\n' +
            '  * Cães >20 kg: 200 mcg (2 puffs de 100 mcg q12h);\n' +
            '  * Gatos: 110 a 220 mcg q12h;\n' +
            '  * Manter 6 a 8 respirações na câmara por puff.\n' +
            '- Desmame gradual do esteroide oral: reduzir a prednisolona sistêmica após 7 a 14 dias de sobreposição com fluticasona até retirada completa ou uso em dias alternados.',
        },
        {
          label: 'Fase 3: Uso Racional e Restritivo de Broncodilatadores',
          detail:
            'Indicação seletiva para hiper-reatividade ou componente broncomalácico:\n\n' +
            '- Broncodilatador de resgate: albuterol (salbutamol) 90 mcg inalatório (1 a 2 puffs q15-30min em crises) para relaxamento rápido da musculatura lisa em broncoespasmo evidente.\n' +
            '- Veto ao albuterol diário contínuo: o racemato de albuterol contém S-albuterol, que persiste por dias nas vias aéreas e induz efeito pró-inflamatório com piora da neutrofilia e eosinofilia.\n' +
            '- Teofilina de liberação prolongada em cães: indicada quando há broncomalácia ou estase de muco (5 a 10 mg/kg VO q12h) para melhora da contratilidade diafragmática e do clearance mucociliar, com monitoramento de arritmias e toxicidade.',
        },
        {
          label: 'Fase 4: Hidratação de Vias Aéreas e Antimicrobianos Dirigidos',
          detail:
            'Manejo de secreções viscosas e stewardship antimicrobiano estrito:\n\n' +
            '- Nebulização com salina isotônica estéril: inalação de vapor de cloreto de sódio 0,9% por 10 a 15 minutos 2 vezes ao dia para hidratar muco desidratado e favorecer expectoração, especialmente na presença de bronquiectasias.\n' +
            '- CONTRAINDICAÇÃO MÁXIMA DE N-ACETILCISTEÍNA NEBULIZADA EM GATOS: a N-acetilcisteína inalada provoca broncoespasmo severo e aumento imediato da resistência pulmonar em vias aéreas felinas.\n' +
            '- Antimicrobiano apenas perante infecção confirmada: doxiciclina oral (5 mg/kg q12h ou 10 mg/kg q24h) por 7 a 10 dias enquanto aguarda cultura; gentamicina nebulizada (5% 3-5 mL BID) para Bordetella bronchiseptica persistente refratária documentada.',
        },
        {
          label: 'Fase 5: Manejo Individualizado de Antitussígenos e Emergência de Plantão',
          detail:
            'Indicação seletiva de antitussígenos no cão e protocolo de choque no gato:\n\n' +
            '- Antitussígenos restritos a tosse seca não produtiva no cão: hidrocodona (0,2 a 0,5 mg/kg VO q6-12h) para quebrar o ciclo vicioso de tosse paroxística e síncope tússica; PROIBIDO em tosse produtiva, pneumonia ou bronquiectasia com acúmulo de secreções.\n' +
            '- Protocolo de plantão para crise respiratória felina (Status Asthmaticus):\n' +
            '  * Oxigenoterapia passiva em ambiente calmo (mínima manipulação);\n' +
            '  * Terbutalina 0,01 mg/kg SC, IM ou IV lento para broncodilatação de urgência;\n' +
            '  * Fosfato dissódico de dexametasona 0,1 a 0,2 mg/kg IV ou IM para iniciar supressão inflamatória;\n' +
            '  * Reavaliar frequência e esforço respiratório antes de tentar qualquer exame radiográfico.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualECriterioTemporal:
      'Conceituação operacional fundamental e critérios temporais na bronquite crônica:\n\n' +
      '- Definição clínica canina clássica (CCB): síndrome inflamatória crônica caracterizada por tosse persistente na maioria dos dias por pelo menos dois meses consecutivos no último ano, sem etiologia específica demonstrável após investigação diagnóstica abrangente.\n' +
      '- Critério operacional felino: inflamação das vias aéreas inferiores com duração superior a dois a três meses, associada a hipersecreção de muco, danos na arquitetura ciliar e remodelamento tecidual potencialmente irreversível.\n' +
      '- Natureza como diagnóstico de exclusão: bronquite crônica não é uma entidade histológica simples ou infecção pontual, mas o resultado final comum de injúrias continuadas sobre as vias condutoras aéreas após afastar causas bacterianas puras, parasitárias, neoplásicas e insuficiência cardíaca congestiva.',
    diferenciacaoCaninaVsFelinaVsAsma:
      'Diferenciação mecanística e fenotípica entre espécies e doenças de vias aéreas:\n\n' +
      '- No cão: a bronquite crônica é primariamente um distúrbio de inflamação neutrofílica ou mista com hipersecreção de muco e falha de depuração ciliar; broncoespasmo agudo verdadeiro é raro na espécie canina, e a hiper-reatividade muscular lisa não constitui o evento central primário.\n' +
      '- No gato (espectro FLAD): a bronquite crônica felina é caracterizada por neutrófilos não degenerados, muco abundante e fibrose de parede, enquanto a asma felina é uma reação de hipersensibilidade tipo I mediada por IgE, ativação de linfócitos Th2, citocinas IL-4, IL-5 e IL-13, infiltração eosinofílica e broncoconstrição intensa reversível.\n' +
      '- Sobreposição fenotípica: embora distintas conceitualmente, na rotina clínica felina ocorrem fenótipos mistos (asma crônica evoluindo com dano epitelial e neutrofilia secundária, ou bronquite crônica associada a hiper-reatividade), exigindo abordagem citológica cuidadosa.',
    tabelaComparativaEspecieEFenotipo: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Comparação Fisiopatológica e Clínica: Cão (Bronquite Crônica) vs Gato (Bronquite Crônica) vs Gato (Asma)',
      headers: [
        'Característica Clínica e Mecanística',
        'Cão — Bronquite Crônica (CCB)',
        'Gato — Bronquite Crônica',
        'Gato — Asma Felina',
      ],
      rows: [
        ['Mecanismo Patogênico Primário', 'Inflamação crônica + muco + remodelamento', 'Inflamação crônica + muco + remodelamento', 'Hipersensibilidade Th2/IgE + broncoconstrição'],
        ['População Celular Dominante no BAL', 'Neutrófilos não degenerados / mista', 'Neutrófilos não degenerados (>14–18%)', 'Eosinófilos proeminentes (>18–20%)'],
        ['Importância do Broncoespasmo Agudo', 'Secundário / menos frequente', 'Variável / pode ocorrer secundariamente', 'Central / evento patognomônico primário'],
        ['Obstrução Reversível com Broncodilatador', 'Variável (obstrução fixa estrutural comum)', 'Variável conforme grau de remodelamento', 'Característica marcante da crise aguda'],
        ['Remodelamento de Parede e Fibrose', 'Muito comum na evolução (bronquiectasia/malácia)', 'Comum com perda de sustentação elástica', 'Ocorre tardiamente se a inflamação persistir'],
        ['Hipersecreção de Muco e Plugs', 'Extremamente importante (estiramento brônquico)', 'Muito importante (atelectasia de lobo médio)', 'Importante na formação de tampões obstrutivos'],
        ['Bronquiectasia Irreversível', 'Complicação clínica de alta prevalência', 'Possível complicação em doença tardia', 'Possível após crises crônicas graves'],
        ['Broncomalácia Dinâmica Associada', 'Muito frequente em cães pequenos/idosos', 'Incomum na espécie felina', 'Não é característica típica da asma'],
        ['Risco de Status Asthmaticus Fatal', 'Não característico (dispneia é gradual)', 'Não típico isoladamente', 'Emergência crítica potencialmente letal'],
        ['Papel dos Corticosteroides', 'Esteio anti-inflamatório (inalatório preferido)', 'Esteio anti-inflamatório (inalatório preferido)', 'Fundamental e indispensável (inalatório/oral)'],
        ['Papel dos Broncodilatadores', 'Selecionado (quando há colapso/malácia)', 'Selecionado para episódios obstrutivos', 'Fundamental para resgate de broncoespasmo'],
        ['Indicação de Antibióticos', 'Apenas quando há infecção comprovada no BAL', 'Apenas perante neutrófilos degenerados/bactérias', 'Geralmente contraindicado/desnecessário'],
      ],
    },
    gatilhosIniciaisEIdiopatia:
      'Gatilhos etiológicos e evolução para doença autoperpetuante:\n\n' +
      '- Desencadeadores iniciais comuns: episódios prévios de infecções respiratórias virais ou bacterianas (CIRDC em cães), inalação crônica de fumaça de tabaco ou vape, aerossóis domésticos, incensos, produtos clorados voláteis, poeira de reformas e microaspirações subclínicas de refluxo gastroesofágico.\n' +
      '- Autoperpetuação idiopática: após o insulto inicial desaparecer, a desestruturação do epitélio brônquico e a hipertrofia glandular sustentam um estado inflamatório crônico estéril que continua progredindo sem necessidade do estímulo agressor original.\n' +
      '- Falha de depuração mecânica: o acúmulo de secreções viscosas associado à perda dos cílios cria um meio propício para retenção de debris, mantendo a estimulação de macrófagos e neutrófilos teciduais.',
    desmistificacaoDaBronquiteAlergicaCanina:
      'Diferenciação da bronquite alérgica canina e broncopneumopatias eosinofílicas:\n\n' +
      '- Raridade da asma canina: a chamada "bronquite alérgica" com broncoespasmo paroxístico induzido por antígenos inalados é extremamente incomum em cães em comparação com gatos e humanos.\n' +
      '- Conduta perante BAL eosinofílico no cão: se o lavado broncoalveolar de um cão com tosse crônica demonstrar predomínio de eosinófilos, não se deve rotular o caso como bronquite crônica típica; deve-se investigar obrigatoriamente broncopneumopatia eosinofílica (EBP), infecções parasitárias (Dirofilaria, Crenosoma, Angiostrongylus) e micoses pulmonares sistêmicas.\n' +
      '- Hipersensibilidade secundária: exposições contínuas a aeroalérgenos podem eventualmente gerar infiltrados inflamatórios mistos em cães, mas o tratamento segue a lógica anti-inflamatória e ambiental, e não o uso de broncodilatadores isolados.',
  },

  epidemiology: {
    perfilDemograficoCaninoEComorbidades:
      'Epidemiologia e fatores de risco na espécie canina:\n\n' +
      '- Faixa etária e porte: acomete predominantemente cães de meia-idade a idosos (geralmente acima de 6 a 8 anos de idade), com sobrerrepresentação de raças pequenas e miniatura como Poodles, Yorkshire Terriers, Cockers Spaniels, West Highland White Terriers e Malteses.\n' +
      '- Coexistência com traqueobroncomalácia: cães pequenos idosos frequentemente apresentam colapso traqueal dinâmico associado a colapso de brônquios principais (traqueobroncomalácia), o que amplifica dramaticamente o estímulo mecânico de tosse.\n' +
      '- Sobreposição com cardiopatia valvar crônica: a alta prevalência de degeneração mixomatosa da valva mitral (DMVD) nessa mesma faixa etária gera enorme confusão diagnóstica entre tosse respiratória primária e edema pulmonar cardiogênico ou compressão do brônquio principal esquerdo pelo átrio esquerdo aumentado.',
    perfilEpidemiologicoFelinoEFLAD:
      'Perfil demográfico da doença inflamatória de vias aéreas em gatos:\n\n' +
      '- Distribuição etária ampla: a doença de vias aéreas inferiores felina afeta gatos jovens, adultos e idosos (faixa etária média de 2 a 8 anos), não sendo restrita a animais geriátricos.\n' +
      '- Predisposição racial: gatos da raça Siamês e outras raças orientais apresentam comprovada sobrerrepresentação genética para o espectro de asma felina e hiper-reatividade brônquica.\n' +
      '- Prevalência populacional: estima-se prevalência de 1% a 5% da população felina geral para o espectro de FLAD (asma e bronquite crônica combinadas).',
    impactoDaObesidadeComoComorbidadeMecanica:
      'Influência biomecânica e metabólica do excesso de peso corporal:\n\n' +
      '- Redução da complacência torácica: o acúmulo de tecido adiposo parietal sobre o gradil costal e o abdômen restringe a expansão torácica e desloca cranialmente a cúpula diafragmática, elevando o trabalho respiratório basal.\n' +
      '- Sobrecarga da via aérea já colapsada: em animais com broncomalácia ou bronquiectasia, a obesidade intensifica as variações de pressão transmural durante a respiração, favorecendo o colapso dinâmico dos brônquios lobares.\n' +
      '- Estado pró-inflamatório adipocitário: a secreção crônica de adipocinas pró-inflamatórias (TNF-alfa, IL-6) amplifica a resposta inflamatória tecidual das vias aéreas.',
  },

  pathogenesisTransmission: {
    anatomiaFuncionalEEsteiraMucociliar:
      'Arquitetura da via aérea e fisiologia da depuração ciliar normal:\n\n' +
      '- Estrutura da parede brônquica: revestida por epitélio colunar pseudoestratificado ciliado, células caliciformes produtoras de muco, glândulas submucosas tubuloacinares, lâmina própria rica em elastina, feixes de músculo liso e placas de cartilagem hialina nas vias condutoras maiores.\n' +
      '- O sistema da "esteira mucociliar": consiste em uma camada profunda de líquido periciliar fluido (fase sol) sobre a qual os cílios batem metadronicamente, e uma camada superficial de muco viscoso (fase gel) que aprisiona partículas inaladas e patógenos, transportando-os cranialmente em direção à faringe para deglutição silenciosa ou expectoração.\n' +
      '- Papel protetor de primeira linha: a esteira mucociliar garante a limpeza física contínua das vias aéreas inferiores, mantendo a árvore respiratória livre de estagnação de debris.',
    circuloViciosoDaFalhaMucociliar:
      'Patogênese da quebra da esteira de limpeza e progressão autoperpetuante:\n\n' +
      '- Lesão epitelial inicial: agressões crônicas (poluição, fumaça, infecção prévia) destroem os cílios e reduzem a frequência de batimento ciliar, provocando estase do muco no lúmen brônquico.\n' +
      '- Hiperplasia caliciforme e hipersecreção: estímulos inflamatórios contínuos induzem metaplasia e hiperplasia das células caliciformes e hipertrofia das glândulas submucosas, resultando em produção de muco mais espesso, viscoso e em volume excessivo.\n' +
      '- Ciclo vicioso fechado: muco retido obstrui os brônquios -> turbulência aérea e acessos violentos de tosse traumatizam a mucosa -> degranulação leucocitária libera proteases e radicais livres -> mais dano epitelial e mais retenção de muco, consolidando o remodelamento irreversível.',
    leiDePoiseuilleEResistenciaDeViasAereas:
      'Física dos fluidos e impacto geométrico da redução luminal brônquica:\n\n' +
      '- A Lei de Poiseuille: a resistência ao fluxo aéreo em tubos condutores cilíndricos é inversamente proporcional à quarta potência do raio da via aérea (R é proporcional a 1/r^4), o que equivale a dizer que o fluxo é proporcional a r^4 para um mesmo gradiente de pressão.\n' +
      '- Consequência de pequenas variações de calibre: se o raio de um pequeno brônquio reduz à metade (0,5 do raio original) por espessamento inflamatório parietal, edema ou acúmulo de muco, o fluxo resultante cai para (0,5)^4 = 0,0625, ou seja, sobra apenas 1/16 do fluxo original.\n' +
      '- Gravidade desproporcional em pequenos condutos: essa relação matemática explica por que discretos graus de infiltrado celular ou secreções provocam obstruções funcionais dramáticas e dispneia súbita, especialmente na espécie felina.',
    mecanicaDoPadraoRespiratorioExpiratorio:
      'Biomecânica das pressões intratorácicas e fechamento brônquico precoce:\n\n' +
      '- Inspiração: a pressão intratorácica torna-se negativa, exercendo tração radial sobre o parênquima pulmonar e mantendo as vias condutoras intratorácicas abertas para entrada do ar.\n' +
      '- Expiração: a pressão intratorácica eleva-se e torna-se positiva para expulsar o ar; brônquios já estreitados, amolecidos ou edemaciados sofrem compressão dinâmica extrínseca precoce antes do esvaziamento alveolar completo.\n' +
      '- Expressão clínica: fechamento prematuro das vias aéreas gera expiração prolongada, esforço expiratório abdominal ativo ("expiratory push"), sibilos expiratórios audíveis e aprisionamento aéreo que culmina em hiperinsuflação pulmonar difusa.',
    microbiomaPulmonarESequenciamento16S:
      'Quebra do paradigma da esterilidade pulmonar e biologia molecular (Werner et al., 2023):\n\n' +
      '- Fim do conceito de pulmão estéril: estudos contemporâneos de sequenciamento de DNA ribossomal 16S demonstraram que as vias aéreas inferiores de cães e gatos sadios e inflamados possuem um microbioma bacteriano próprio de baixa biomassa.\n' +
      '- Achados comparativos em gatos (Werner et al., 2023): a diversidade bacteriana global não diferiu significativamente entre gatos com asma felina e com bronquite crônica, com ampla variação individual e presença de comensais respiratórios.\n' +
      '- Significado do Mycoplasma: o sequenciamento molecular detectou DNA de Mycoplasma em gatos assintomáticos ou com PCR convencional negativo; logo, detectar DNA de Mycoplasma por biologia molecular não constitui prova automática de que o organismo seja o agente causal primário da doença.',
  },

  pathophysiology: {
    remodelamentoEstruturalEFibroseBronquica:
      'Alterações patológicas duradouras da parede condutora respiratória:\n\n' +
      '- Alterações histopatológicas: hipertrofia e hiperplasia das células do epitélio brônquico, metaplasia escamosa focal, hipertrofia do músculo liso peribronquial e espessamento da membrana basal com depósito desordenado de colágeno intersticial.\n' +
      '- Perda da complacência e elasticidade: a deposição contínua de matriz fibrótica rígida reduz a elasticidade intrínseca da árvore brônquica, impedindo a acomodação adequada aos fluxos ventilatórios dinâmicos.\n' +
      '- Obstrução fixa irreversível: enquanto o componente de muco e broncoespasmo pode ser atenuado medicamente, a fibrose parietal estabelece um componente de obstrução aérea estático que não responde a broncodilatadores.',
    patogeneseDaBronquiectasiaPermanente:
      'Origem e repercussões da destruição da arquitetura das vias aéreas:\n\n' +
      '- Definição patológica: dilatação anormal, irreversível e permanente de um ou mais brônquios condutores decorrente da destruição enzimática dos componentes musculares e elásticos da parede brônquica.\n' +
      '- Mecanismos destrutivos: o acúmulo de neutrófilos ativados libera elastase neutrofílica, metaloproteinases de matriz (MMP-8, MMP-9) e espécies reativas de oxigênio que digerem as fibras elásticas estruturais.\n' +
      '- Espiral de estase e infecção: brônquios ectásicos cilíndricos ou saculares perdem totalmente a função ciliar; formam-se verdadeiros reservatórios de muco estagnado onde bactérias colonizadoras se proliferam livremente, predispondo o paciente a episódios recorrentes de broncopneumonia purulenta.',
    fisiopatologiaDaBroncomalaciaDinamica:
      'Enfraquecimento da sustentação cartilaginosa e colapso expiratório no cão:\n\n' +
      '- Amolecimento cartilaginoso condrócito-mediado: a infiltração inflamatória transmural estende-se aos anéis e placas de cartilagem brônquica, provocando condromalácia com perda do suporte rígido natural.\n' +
      '- Colapso expiratório dinâmico: durante a fase expiratória da respiração ou paroxismos de tosse, a pressão intratorácica positiva colaba a luz do brônquio afetado em vez de mantê-lo patente.\n' +
      '- Consequências clínicas: o impacto mecânico direto entre as paredes brônquicas colabadas estimula intensamente os receptores vagais de tosse, produzindo tosse seca paroxística em "grasno de ganso" (goose-honk) que responde precariamente a anti-inflamatórios isolados.',
    reflexoDaTosseEHiperestesiaCentral:
      'Neurofisiologia do arco reflexo e perpetuação neurossensorial da tosse:\n\n' +
      '- Receptores mecânicos e químicos da tosse: localizados densamente na laringe, traqueia, carina e bifurcações dos grandes brônquios condutores, associados a fibras aferentes vagais mielinizadas e fibras C amielínicas.\n' +
      '- Sensibilização inflamatória: mediadores solúveis (bradicinina, prostaglandinas, histamina) reduzem o limiar de ativação desses mecanorreceptores, tornando-os hiper-responsivos a estímulos triviais (mudanças de temperatura, estiramento leve, correntes de ar frio).\n' +
      '- Hipersensibilidade central no tronco encefálico: a estimulação contínua do centro da tosse deflagra facilitação sináptica central; assim, o paciente pode continuar apresentando tosse seca frequente mesmo após redução substancial da carga inflamatória primária.',
    hemodinamicaPulmonarEHipertensaoSecundaria:
      'Evolução vascular pulmonar e sobrecarga cardíaca direita (Cor Pulmonale):\n\n' +
      '- Vasoconstrição pulmonar hipóxica (Mecanismo de von Euler-Liljestrand): a hipoventilação alveolar crônica decorrente de obstruções brônquicas difusas reduz a pressão parcial de oxigênio (PAO2) em amplas regiões pulmonares, deflagrando contração do músculo liso arteriolar pulmonar.\n' +
      '- Remodelamento vascular e hipertensão pré-capilar: a hipóxia contínua induz hipertrofia da camada média e fibrose da íntima das arteríolas pulmonares, elevando de forma permanente a resistência vascular pulmonar (PVR).\n' +
      '- Cor pulmonale crônico: o ventrículo direito é forçado a gerar pressões sistólicas progressivamente mais altas para perfundir o leito pulmonar espessado, evoluindo com hipertrofia ventricular concêntrica, dilatação da câmara direita e insuficiência cardíaca congestiva direita tardia.',
  },

  clinicalSignsPathophysiology: {
    apresentacaoClinicaCanina:
      'Quadro respiratório típico e sinais de progressão na espécie canina:\n\n' +
      '- Tosse crônica como manifestação cardinal: tosse áspera, paroxística, com caráter inicial episódico que evolui para diário; frequentemente desencadeada por esforço físico, excitação ao receber visitas, tração de coleira e alterações de temperatura ambiental.\n' +
      '- Percepção do tutor sobre a tosse: embora haja produção volumosa de secreções brônquicas, o tutor frequentemente a descreve como "tosse seca", pois os cães habitualmente deglutem o muco expelido na faringe ao final do paroxismo.\n' +
      '- Ausência típica de sinais sistêmicos: em cães com bronquite crônica não complicada, o estado geral, apetite e temperatura retal mantêm-se normais; a presença de febre, perda de peso acentuada ou anorexia exige investigação imediata de pneumonia bacteriana sobreposta ou neoplasia.',
    manifestacoesClinicasFelinas:
      'Apresentação clínica característica e mimetizadores na espécie felina:\n\n' +
      '- Acessos de tosse paroxística postural: o gato posiciona-se agachado próximo ao solo, com os membros fletidos, pescoço estendido e cabeça rente ao chão, emitindo tosse seca acompanhada de deglutição ao final.\n' +
      '- O clássico equívoco da "bola de pelo": a maioria dos tutores confunde a tosse felina com tentativas frustradas de vomitar bolas de pelo ("hairballs"), postergando a procura ao médico-veterinário por meses ou anos.\n' +
      '- Esforço expiratório com prensa abdominal: visualização de contração ativa e vigorosa dos músculos retos do abdômen no final de cada ciclo respiratório ("expiratory push"), associada a sibilos expiratórios audíveis à distância.',
    distincaoCriticaDoStatusAsthmaticus:
      'Reconhecimento emergencial do colapso respiratório hiper-reativo felino:\n\n' +
      '- Fisiopatologia da crise aguda fatal: enquanto a bronquite crônica cursa com declínio ventilatório gradual, a asma felina pode desencadear broncoespasmo difuso maciço com edema transmural e tampão mucoso em minutos (Status Asthmaticus).\n' +
      '- Apresentação da emergência crítica: respiração com boca aberta (sinal de falência respiratória iminente no gato), ortopneia, cianose de mucosas, olhar ansioso, taquipneia extrema e postura de relutância em deitar.\n' +
      '- Risco letal de exaustão muscular: a resistência aérea brutal esgota os estoques de glicogênio diafragmático, progredindo rapidamente para hipoventilação alveolar, hipercapnia severa, acidose respiratória mista e parada respiratória se não estabilizado imediatamente.',
    tabelaManifestacoesEErrosInterpretativos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Correlação Clínica e Armadilhas Diagnósticas nos Sinais Respiratórios',
      headers: ['Sinal Clínico Observado', 'Fisiopatologia de Origem', 'Interpretação e Erro Frequente no Plantão', 'Conduta Correta Recomendada'],
      rows: [
        ['Tosse Crônica em "Grasno" no Cão', 'Vibração de mucosa em vias com broncomalácia/colapso', 'Confundir com pneumonia bacteriana aguda e dar antibiótico', 'Documentar colapso por TC/broncoscopia e tratar inflamação'],
        ['Gato "Tentando Vomitar Hairball"', 'Tosse paroxística com deglutição terminal de muco', 'Prescrever pasta para bola de pelo sem examinar vias aéreas', 'Orientar tutor que postura agachada com pescoço estendido é tosse'],
        ['Radiografia Torácica Sem Alterações', 'Doença restrita à mucosa sem espessamento peribronquial', 'Concluir erroneamente que o paciente não tem bronquite', 'Prosseguir investigação com BAL para fenotipagem citológica'],
        ['Sibilos e Prensa Abdominal no Gato', 'Fechamento precoce da via condutora na expiração', 'Assumir que é edema pulmonar cardiogênico de rotina', 'Avaliar ecocardiograma; tosse é rara em ICC felina primária'],
        ['Síncope Imediatamente Pós-Tosse', 'Elevação da pressão intratorácica e queda do retorno venoso', 'Classificar como epilepsia primária ou síncope arrítmica pura', 'Reconhecer síncope tússica; quebrar paroxismos de tosse'],
        ['Paciente Eutóico Após Corticoide Oral', 'Melhora da hiper-reatividade e dos sinais clínicos externos', 'Assumir cura histológica e retirar medicação abruptamente', 'Manter corticoide inalatório; inflamação subclínica persiste'],
      ],
    },
  },

  diagnosis: {
    criteriosDeExclusaoSistematica:
      'Protocolo escalonado de exclusão sistemática de diferenciais:\n\n' +
      '- Avaliação cardiopulmonar direcionada: exclusão de doença cardíaca esquerda (DMVD com cardiomegalia ou ICC) por ausculta criteriosa e ecocardiograma; no cão idoso, a ausência de sopro cardíaco ou de dilatação atrial esquerda afasta edema pulmonar como causa primária da tosse.\n' +
      '- Triagem parasitológica de vias respiratórias: realização obrigatória de teste de Baermann com três amostras fecais consecutivas para pesquisa de larvas de Aelurostrongylus abstrusus e Troglostrongylus em gatos, e Crenosoma vulpis em cães, associada a teste de antígenos séricos para Dirofilaria immitis.\n' +
      '- Afastamento de agentes infecciosos primários e colapso: exclusão de pneumonia alveolar, colapso traqueal cervical extratorácico e corpos estranhos intraluminais antes de firmar diagnóstico de bronquite idiopática.',
    radiografiaToracicaPadroesELimitacoes:
      'Achados radiológicos pulmonares e reconhecimento de limitações diagnósticas:\n\n' +
      '- Padrão brônquico clássico: espessamento da parede brônquica evidenciado em perfil por linhas radiopacas paralelas ("tram lines" ou trilhos de trem) e em corte transversal por imagens em anel radiopacas com lúmen aéreo central ("donuts").\n' +
      '- Padrão broncointersticial e complicações associadas: acentuação intersticial linear peribronquial, sinais de hiperinsuflação com retificação e deslocamento caudal da cúpula diafragmática e atelectasia do lobo pulmonar médio direito em felinos secundária à obstrução por plug mucoso denso.\n' +
      '- ALERTA CLÍNICO DE RADIOGRAFIA NORMAL: em até 10% a 15% dos cães e gatos com bronquite crônica clinicamente relevante e citologia de BAL profusamente inflamatória, a radiografia torácica pode se apresentar normal; a radiografia é excelente para excluir diferenciais, mas sua normalidade não descarta bronquite crônica.',
    figuraRxPadraoBronquial: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/rx-padrao-bronquial-donuts-tramlines.png`,
      alt: 'Radiografia torácica demonstrando padrão brônquico com donuts e tram lines',
      display: 'wide',
      caption:
        'Radiografia torácica lateral demonstrando padrão bronquial difuso com imagens em anel ("donuts") e linhas paralelas radiopacas ("tram lines"). ' +
        BRUYETTE_SOURCE,
    },
    tomografiaComputadorizadaEBroncoscopia:
      'Métodos avançados de imagem e avaliação dinâmica das vias condutoras:\n\n' +
      '- Papel da tomografia computadorizada (TC) de alta resolução: método com sensibilidade substancialmente superior à radiografia para identificar bronquiectasias precoces, medir a relação diâmetro brônquico/artéria pulmonar correspondente (>1,0 a 1,2 indicando ectasia), avaliar atenuação em mosaico por aprisionamento aéreo e excluir massas ou corpos estranhos focais.\n' +
      '- Broncoscopia respiratória flexível: permite inspecionar visualmente a integridade da mucosa brônquica (hiperemia difusa, edema, granulações e perda da vascularização longitudinal nítida) e documentar estrias de muco mucopurulento estagnado.\n' +
      '- Diagnóstico em tempo real de broncomalácia dinâmica: durante a respiração espontânea ou expiração forçada, a broncoscopia permite visualizar o colapso dinâmico dorsoventral ou circunferencial da luz dos brônquios lobares e segmentares.',
    figuraTcBronquiteCronica: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/tc-torax-bronquite-cronica.png`,
      alt: 'Tomografia computadorizada torácica evidenciando espessamento brônquico e ectasia',
      display: 'wide',
      caption:
        'Tomografia computadorizada do tórax em corte transversal evidenciando espessamento concêntrico difuso de paredes brônquicas e áreas de aprisionamento gasoso. ' +
        BRUYETTE_SOURCE,
    },
    lavadoBroncoalveolarPadraoOuroCitologico:
      'Caracterização fenotípica por BAL como padrão de referência diagnóstico:\n\n' +
      '- Padrão-ouro citológico absoluto: o lavado broncoalveolar obtido por broncoscopia ou por sonda estéril transoral/endotraqueal é a única ferramenta capaz de definir com precisão o perfil inflamatório da via aérea inferior.\n' +
      '- Diferenciação quantitativa de espécies e fenótipos:\n' +
      '  * Bronquite crônica canina e felina: predomínio marcante de neutrófilos não degenerados (>14% a 18% da contagem celular diferencial total), acompanhados de macrófagos alveolares ativados e muco denso;\n' +
      '  * Asma felina: presença proeminente de eosinófilos (>18% a 20% da contagem diferencial total), compatível com reação alérgica/Th2;\n' +
      '  * Espirais de Curschmann: moldes de muco condensado de pequenas vias aéreas frequentemente observados nas lâminas citológicas.\n' +
      '- Alerta contra falso-negativos por corticoterapia prévia: o uso recente de glicocorticoides reduz expressivamente o infiltrado celular no BAL, podendo normalizar falsamente a citologia; se o paciente estiver estável, suspender corticoides 5 a 7 dias antes do procedimento.',
    figuraCitologiaCurschmann: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/citologia-curschmann-spirals.png`,
      alt: 'Citologia de lavado broncoalveolar com neutrófilos, muco e espiral de Curschmann',
      display: 'wide',
      caption:
        'Fotomicrografia de lavado broncoalveolar demonstrando infiltrado inflamatório neutrofílico não degenerado sobre fundo de muco abundante e espiral de Curschmann típica. Cortesia: Eric J. Fish, DVM, DiplACVP.',
    },
    interpretacaoMicrobiologicaECulturaQuantitativa:
      'Análise crítica das culturas respiratórias e critérios de infecção ativa:\n\n' +
      '- A falácia da cultura bacteriana positiva isolada: o crescimento bacteriano em BAL sem presença concomitante de inflamação séptica na citologia representa colonização orofaríngea ou flora comensal do microbioma pulmonar, e não infecção verdadeira.\n' +
      '- O valor das bactérias intracelulares: a visualização de microrganismos no interior de neutrófilos degenerados na citologia possui alta especificidade para infecção pulmonar verdadeira, embora sua sensibilidade seja moderada (32% a 79% em estudos).\n' +
      '- Análise do corte quantitativo clássico de Peeters (1,7 x 10^3 CFU/mL): estudos recentes (Lebastard et al., 2022; Lyssens et al., 2025) demonstraram que esse limiar numérico não deve ser seguido cegamente; cães com infecções clinicamente ativas podem apresentar contagens abaixo do corte, enquanto animais puramente colonizados podem superá-lo.',
    diagnosticoParasitarioEPainelSorologico:
      'Diferenciação de verminoses pulmonares e testes imunológicos:\n\n' +
      '- Parasitas felinos: Aelurostrongylus abstrusus e Troglostrongylus brevior induzem tosse crônica com padrão brônquico idêntico à bronquite e asma; diagnóstico por técnica de Baermann (fezes frescas coletadas em 3 dias) ou PCR fecal.\n' +
      '- Parasitas caninos: Crenosoma vulpis e Angiostrongylus vasorum provocam tosse crônica e alterações de coagulação; pesquisa em fezes e lavado transtraqueal.\n' +
      '- Testes de alergia e IgE sérica no gato (Hartung et al., 2023): testes alérgicos intradérmicos ou sorológicos de IgE não diagnosticam asma felina nem diferenciam asma de bronquite crônica; gatos com FLAD apresentam níveis de IgE semelhantes a felinos sadios, servindo tais testes apenas para selecionar antígenos se a imunoterapia for planejada.',
    gasometriaArterialEMonitoramentoVentilatorio:
      'Avaliação da troca gasosa pulmonar e sinais de exaustão mecânica:\n\n' +
      '- Desbalanço ventilação/perfusão (V/Q mismatch): tampões de muco e áreas de estreitamento brônquico geram unidades alveolares hipoventiladas com perfusão mantida, reduzindo a pressão parcial arterial de oxigênio (PaO2 <80 mmHg em ar ambiente).\n' +
      '- Ventilação inicial compensatória: a taquipneia inicial decorrente da irritação de receptores pulmonares costuma gerar hipocapnia (PaCO2 <30-35 mmHg).\n' +
      '- SINAL DE ALARME MÁXIMO DE HIPERCAPNIA: a elevação progressiva da PaCO2 (>45-50 mmHg) em um paciente com desconforto respiratório obstrutivo não indica melhora, mas exaustão da musculatura ventilatória e falência respiratória iminente (acidose respiratória hipercápnica tipo II).',
    tabelaDiagnosticoDiferencialTosseCronica: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diagnóstico Diferencial de Tosse Crônica em Cães e Gatos',
      headers: ['Condição Clínica', 'Espécie Típica', 'Pistas Diagnósticas Distintivas', 'Método Definitivo de Diferenciação'],
      rows: [
        ['Bronquite Crônica Idiopática', 'Cães e Gatos', 'Tosse >2 meses; quadro sistêmico preservado; padrão brônquico', 'BAL com neutrófilos não degenerados sem infecção'],
        ['Asma Felina / FLAD', 'Gatos', 'Crises paroxísticas com broncoespasmo reversível; sibilos', 'BAL com eosinófilos >18-20%; resposta a albuterol'],
        ['Traqueobroncomalácia / Colapso', 'Cães pequenos', 'Tosse em grasno de ganso; paroxismos induzidos por excitação', 'Fluoroscopia ou broncoscopia dinâmica em tempo real'],
        ['Cardiopatia Valvar Mitral (DMVD)', 'Cães idosos', 'Sopro holossistólico em foco mitral; cardiomegalia esquerda', 'Ecocardiograma confirmando ausência de edema pulmonar'],
        ['Parasitose Pulmonar (Aelurostrongylus)', 'Gatos (e cães)', 'Acesso à caça ou rua; infiltrado nodular/brônquico associado', 'Técnica de Baermann positiva com larvas de L1'],
        ['Broncopneumonia Bacteriana', 'Cães e Gatos', 'Febre, apatia, leucocitose com desvio; padrão alveolar em RX', 'Neutrófilos degenerados e bactérias intracelulares no BAL'],
        ['Broncopneumopatia Eosinofílica (EBP)', 'Cães jovens/adultos', 'Secreção nasal mucopurulenta profusa; infiltrado broncointersticial', 'Citologia de BAL profusamente eosinofílica no cão'],
        ['Neoplasia Pulmonar Primária/Metastática', 'Cães e Gatos idosos', 'Perda ponderal progressiva; tosse refratária; nódulos no RX/TC', 'Tomografia computadorizada e citologia/biópsia'],
        ['Corpo Estranho em Via Aérea', 'Cães (e gatos)', 'Início súbito que se cronifica; tosse assimétrica unilateral', 'Broncoscopia revelando espiga ou vegetal intraluminal'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Triagem clínica, histórico temporal e estabilização de emergência',
        isGoldStandard: false,
        description:
          'Avaliação cronológica detalhada e conduta emergencial imediata:\n\n' +
          '- Confirmação temporal: tosse diária por pelo menos 2 meses no cão e >2 a 3 meses no gato.\n' +
          '- Emergência felina: se houver dispneia com boca aberta ou ortopneia, fornecer oxigenoterapia imediata e adiar contenção para exames.',
      },
      {
        stepNumber: 2,
        title: 'Exclusão cardiovascular e palpação do reflexo traqueal',
        isGoldStandard: false,
        description:
          'Ausculta cardiopulmonar e diferenciação de afecções cardíacas:\n\n' +
          '- Exame auscultatório: pesquisa de sibilos expiratórios, estertores e sopros cardíacos.\n' +
          '- Diferenciação ecocardiográfica: afastar edema pulmonar cardiogênico em cães com sopro mitral e avaliar reflexo traqueal suave.',
      },
      {
        stepNumber: 3,
        title: 'Rastreio parasitológico respiratório e testes sorológicos',
        isGoldStandard: false,
        description:
          'Investigação fecal e sorológica de verminoses pulmonares:\n\n' +
          '- Método de Baermann seriado em 3 amostras para Aelurostrongylus abstrusus e Troglostrongylus em gatos, e Crenosoma vulpis em cães.\n' +
          '- Teste sorológico de antígeno para Dirofilaria immitis conforme risco epidemiológico.',
      },
      {
        stepNumber: 4,
        title: 'Radiografia torácica em 3 projeções (inspiratória e expiratória)',
        isGoldStandard: false,
        description:
          'Mapeamento imaginológico das vias condutoras e parênquima:\n\n' +
          '- Padrão brônquico com donuts e tram lines, broncointersticial, hiperinsuflação e atelectasia de lobo médio direito em gatos por plug mucoso.\n' +
          '- Ressalva diagnóstica crítica: radiografia normal não descarta bronquite crônica.',
      },
      {
        stepNumber: 5,
        title: 'Tomografia computadorizada torácica de alta resolução',
        isGoldStandard: false,
        description:
          'Exame de escolha para estratificação de dano estrutural permanente:\n\n' +
          '- Mensuração de dilatações brônquicas irreversíveis (bronquiectasia cilíndrica ou sacular).\n' +
          '- Mapeamento de aprisionamento gasoso em mosaico e planejamento pré-broncoscopia.',
      },
      {
        stepNumber: 6,
        title: 'Broncoscopia dinâmica sob anestesia geral controlada',
        isGoldStandard: false,
        description:
          'Inspeção visual direta da árvore brônquica:\n\n' +
          '- Avaliação de hiperemia de mucosa, perda de vascularização e estrias de muco mucopurulento.\n' +
          '- Documentação em tempo real do colapso expiratório da parede (broncomalácia dinâmica).',
      },
      {
        stepNumber: 7,
        title: 'Lavado broncoalveolar (BAL) e fenotipagem citológica diferencial',
        isGoldStandard: true,
        description:
          'Padrão-ouro citológico para caracterização da inflamação de vias aéreas:\n\n' +
          '- Contagem diferencial celular: neutrófilos não degenerados (>14-18%) na bronquite crônica vs eosinófilos (>18-20%) na asma felina.\n' +
          '- Identificação de muco denso e espirais de Curschmann.',
      },
      {
        stepNumber: 8,
        title: 'Microbiologia quantitativa, pesquisa de bactérias intracelulares e PCR',
        isGoldStandard: false,
        description:
          'Avaliação microbiológica cuidadosa conforme diretrizes ISCAID:\n\n' +
          '- Pesquisa citológica de fagocitose bacteriana intracelular e cultura quantitativa (>1,7 x 10^3 CFU/mL).\n' +
          '- PCR dirigida para Mycoplasma cynos e Bordetella bronchiseptica.',
      },
      {
        stepNumber: 9,
        title: 'Hemogasometria arterial e oximetria de pulso seriada',
        isGoldStandard: false,
        description:
          'Mensuração seriada de trocas gasosas:\n\n' +
          '- Avaliação de incompatibilidade V/Q e PaO2 em ar ambiente.\n' +
          '- Detecção precoce de hipercapnia progressiva por fadiga muscular ventilatória iminente.',
      },
    ],
  },

  treatment: {
    manejoAmbientalEControleDeGatilhos:
      'Medidas não farmacológicas primárias de redução de irritantes inalados:\n\n' +
      '- Eliminação absoluta de poluentes domiciliares: banimento total de tabaco, cigarros eletrônicos (vape), incensos, velas aromáticas, purificadores de ar ultrassônicos com óleos essenciais, produtos de limpeza contendo amônia ou cloro volátil e aerossóis no ambiente do paciente.\n' +
      '- Cuidados específicos com a caixa sanitária felina: uso estrito de substrato mineral sem fragrância e com selo de baixa emissão de poeira; recipientes abertos para prevenir retenção de poeira inalada durante a escavação pelo gato.\n' +
      '- Substituição de coleiras por peitoral anatômico em cães: abolir totalmente coleiras cervicais comuns ou enforcadores; a tração cervical deflagra colapso dinâmico das vias condutoras e traumatiza a mucosa já inflamada.\n' +
      '- Manejo dietético da obesidade: a perda gradual de 10% a 15% do peso corporal em pacientes obesos restaura a excursão diafragmática e reduz substancialmente o trabalho ventilatório e os paroxismos de tosse.',
    corticoterapiaSistemicaDeInducao:
      'Indução farmacológica anti-inflamatória com glicocorticoides orais:\n\n' +
      '- Protocolo canino de indução: prednisona ou prednisolona na dose de 0,5 a 1,0 mg/kg VO a cada 12 horas por 5 a 7 dias; após estabilização inicial do quadro clínico, reduzir gradualmente para 0,5 mg/kg VO a cada 24 horas por mais 7 dias e então tentar desmame para dias alternados.\n' +
      '- Protocolo felino de indução: prednisolona na dose de 1,0 a 2,0 mg/kg VO a cada 24 horas (ou 0,5 a 1,0 mg/kg VO q12h) por 7 a 10 dias, iniciando o desmame conforme o controle clínico dos sinais expiratória e introdução do espaçador inalatório.\n' +
      '- Riscos do uso crônico contínuo prolongado: poliúria, polidipsia, ganho de peso, esteatose hepática, fraqueza muscular ventilatória e risco de diabetes mellitus em gatos ou hiperadrenocorticismo iatrogênico em cães, justificando a transição programada para a via inalatória.',
    corticoterapiaInalatoriaComEspacador:
      'Terapia inalatória de manutenção com câmara espaçadora e máscara facial:\n\n' +
      '- Vantagens farmacológicas: a deposição tópica direta de glicocorticoide no epitélio respiratório atinge altas concentrações locais anti-inflamatórias com biodisponibilidade sistêmica mínima, eliminando grande parte dos efeitos colaterais endócrinos e musculares.\n' +
      '- Posologia com propionato de fluticasona via AeroDawg / AeroKat:\n' +
      '  * Cães <20 kg: 100 mcg (1 puff a cada 12 horas);\n' +
      '  * Cães >20 kg: 200 mcg (2 puffs de 100 mcg a cada 12 horas);\n' +
      '  * Gatos: iniciar com 110 a 220 mcg a cada 12 horas; após controle sustentado (3 a 4 semanas), titular para 110 mcg q12h e eventualmente 44 mcg q12h.\n' +
      '- Técnica de aplicação: agitar o inalador dosimetrado, acoplar à câmara espaçadora, posicionar a máscara confortavelmente sobre o focinho, disparar o puff na câmara e permitir que o paciente realize de 6 a 8 respirações espontâneas calmas.\n' +
      '- Intervalo de latência: o corticoide inalatório exige de 7 a 10 dias de uso contínuo para atingir eficácia anti-inflamatória plena; por isso, a terapia oral sistêmica deve ser mantida em sobreposição nesse intervalo inicial.',
    broncodilatadoresRacionaisEAlertas:
      'Posicionamento de broncodilatadores e alerta máximo sobre uso abusivo:\n\n' +
      '- Broncodilatadores não são anti-inflamatórios: fármacos beta-2 agonistas relaxam a musculatura lisa brônquica, mas não combatem a infiltração de neutrófilos, a hipersecreção de muco nem o remodelamento de parede.\n' +
      '- Albuterol / Salbutamol (90 mcg) como droga estritamente de resgate: indicado para alívio imediato em crises agudas de broncoespasmo (1 a 2 puffs a cada 15 a 30 minutos em emergência);\n' +
      '- ALERTA CONTRA ALBUTEROL RACÊMICO FREQUENTE: o produto racêmico contém os enantiômeros R-albuterol (broncodilatador) e S-albuterol; o S-albuterol é metabolizado lentamente, acumula-se no pulmão e exerce propriedades pró-inflamatórias, agravando a neutrofilia e a eosinofilia; uso frequente diário indica mau controle inflamatório de base e exige ajuste do corticoide.\n' +
      '- Terbutalina parenteral no plantão: 0,01 mg/kg SC, IM ou IV em gatos em crise grave com resposta broncodilatadora rápida em 15 a 30 minutos.\n' +
      '- Teofilina de liberação prolongada em cães: indicada quando há broncomalácia concomitante (5 a 10 mg/kg VO q12h); além de leve broncodilatação, melhora o clearance mucociliar e a força contrátil diafragmática; atentar para índice terapêutico estreito e interação com fluoroquinolonas (que inibem sua depuração).',
    stewardshipAntimicrobianoISCAID:
      'Uso racional de antimicrobianos segundo diretrizes ISCAID 2017/2026:\n\n' +
      '- Veto à antibioticoterapia empírica rotineira: a maioria absoluta dos casos de bronquite crônica em cães e gatos é de natureza estéril ou comensal; prescrever antibióticos diante de qualquer tosse brônquica promove disbiose e resistência bacteriana sem benefício clínico.\n' +
      '- Indicações formais de tratamento: presença simultânea de tosse crônica com neutrófilos degenerados na citologia, fagocitose de bactérias intracelulares confirmada e febre ou consolidação alveolar tomográfica.\n' +
      '- Protocolo de primeira escolha enquanto aguarda cultura: doxiciclina oral na dose de 5 mg/kg VO a cada 12 horas ou 10 mg/kg VO a cada 24 horas por 7 a 10 dias (com líquido ou alimento para prevenir esofagite no gato).\n' +
      '- Terapia inalatória com gentamicina em Bordetella refratária: em infecções brônquicas crônicas complicadas por Bordetella bronchiseptica persistente documentada em BAL, a nebulização de gentamicina 5% (3 a 5 mL nebulizados a cada 12 horas por 3 a 4 semanas) demonstrou erradicação bacteriana eficaz com absorção sistêmica negligenciável.',
    algoritmoECVIM2025ParaBronquiectasiaEBroncomalacia:
      'Algoritmo estruturado para doença com alteração irreversível (Lyssens et al., 2025):\n\n' +
      '- Estratificação diagnóstica prévia: todo cão com bronquite crônica associada a bronquiectasia ou broncomalácia deve passar por amostragem de via aérea (BAL ou escovado) para citologia e microbiologia antes da definição terapêutica.\n' +
      '- Braço com infecção documentada: se houver bactérias intracelulares e neutrófilos degenerados, iniciar doxiciclina empírica e ajustar após antibiograma; manter vigilância para Pseudomonas aeruginosa (que requer terapia específica) e suspender corticoide em doses imunossupressoras.\n' +
      '- Braço puramente inflamatório: se a citologia confirmar neutrófilos não degenerados sem bactérias intracelulares e culturas negativas, o tratamento de escolha é a corticoterapia inalatória de longo prazo combinada a nebulização salina para hidratação de secreções.',
    nebulizacaoSalinaEAlertaContraNACEmGatos:
      'Hidratação tópica de secreções brônquicas e contraindicações graves:\n\n' +
      '- Nebulização com cloreto de sódio 0,9% estéril: inalação de aerossol de salina isotônica durante 10 a 15 minutos, 2 a 3 vezes ao dia, promove a hidratação da fase sol do muco, reduz a viscosidade e facilita o transporte ciliar, especialmente em pacientes com bronquiectasia.\n' +
      '- CONTRAINDICAÇÃO FORMAL DE N-ACETILCISTEÍNA (NAC) NEBULIZADA EM FELINOS: embora a NAC seja um mucolítico clássico, estudos experimentais e clínicos em vias aéreas felinas hiper-reativas comprovaram que a NAC nebulizada causa irritação epitelial grave, broncoespasmo paradoxal e aumento expressivo da resistência das vias aéreas, sendo formalmente contraindicada.',
    antitussigenosUsoRacionalEmCaes:
      'Critérios para administração de antitussígenos na espécie canina:\n\n' +
      '- Indicação seletiva estrita: reservada para cães com tosse seca, dura, improdutiva, paroxística e exaustiva que comprometa o sono ou cause episódios de síncope pós-tússica.\n' +
      '- Fármaco de escolha: bitartarato de hidrocodona na dose de 0,22 a 0,5 mg/kg VO a cada 6 a 12 horas, titulando para a menor dose capaz de quebrar o paroxismo sem sedação excessiva.\n' +
      '- CONTRAINDICAÇÃO ABSOLUTA: nunca utilizar antitussígenos em pacientes com tosse produtiva, bronquiectasias com acúmulo de secreções purulentas ou suspeita de pneumonia bacteriana; a supressão do reflexo de tosse retém secreções infectadas no parênquima pulmonar.\n' +
      '- O papel do maropitant: estudos clínicos demonstraram que o maropitant (antagonista do receptor NK-1) pode modular o sintoma da tosse em alguns cães, mas não possui nenhum efeito redutor da inflamação brônquica no BAL, não sendo terapia modificadora de doença.',
    protocoloDeEmergenciaEmCriseRespiratoriaFelina:
      'Protocolo de plantão para paciente felino em crise respiratória aguda:\n\n' +
      '- Regra inegociável de manuseio: conduta hands-off imediata; evitar contenção física forçada, coletas de sangue e posicionamento forçado para radiografias, que frequentemente precipitam parada respiratória fatal em gatos dispneicos.\n' +
      '- Oxigenioterapia passiva: colocação imediata em gaiola de oxigênio com fração inspirada de 40% a 50% ou fluxo livre próximo às narinas com mínimo estresse.\n' +
      '- Farmacoterapia imediata de resgate:\n' +
      '  * Terbutalina: 0,01 mg/kg via subcutânea ou intramuscular (relaxamento do músculo liso brônquico mediado por AMP cíclico em 15 minutos);\n' +
      '  * Dexametasona fosfato dissódico: 0,1 a 0,2 mg/kg IV ou IM (início da supressão da transcrição de citocinas inflamatórias com efeito pleno em algumas horas);\n' +
      '  * Albuterol inalatório: 1 puff a cada 20 a 30 minutos com máscara facial se o animal tolerar a aproximação sem pânico.\n' +
      '- Reavaliação e exames complementares: apenas após redução evidente da frequência respiratória, diminuição do esforço abdominal e recuperação de coloração rósea das mucosas é permitida a realização de radiografias torácicas.',
    terapiasEmFronteiraEAbordagensDesaconselhadas:
      'Análise crítica de novas modalidades terapêuticas e condutas ineficazes:\n\n' +
      '- Imunoterapia alérgeno-específica (ASIT): indicada exclusivamente no fenótipo de asma felina com alérgenos inalados identificados e persistência de sinais; sem papel comprovado na bronquite crônica neutrofílica canina ou felina.\n' +
      '- Ciclosporina oral: relatos anedóticos em gatos com asma refratária intolerantes a corticoides (ex: diabéticos), porém com evidência clínica limitada e risco de imunossupressão.\n' +
      '- Células-tronco mesenquimais e inibidores de tirosina-quinase: demonstraram atenuação inflamatória em modelos experimentais de laboratório, mas não possuem ensaios clínicos que justifiquem seu uso como rotina veterinária contemporânea.\n' +
      '- Condutas comprovadamente ineficazes em vias aéreas felinas: anti-histamínicos orais (sem benefício em asma já instalada), zafirlukast/montelucaste (antagonistas de leucotrienos sem resposta clínica convincente) e oclacitinib.',
    tabelaProtocoloTerapeuticoEscalonado: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Protocolo Terapêutico Integrado e Farmacologia das Vias Aéreas',
      headers: ['Modalidade / Fármaco', 'Dose e Via de Administração', 'Mecanismo e Indicação Principal', 'Alertas de Segurança e Monitoramento'],
      rows: [
        ['Fluticasona (AeroDawg / AeroKat)', 'Cães <20kg: 100mcg q12h; >20kg: 200mcg q12h; Gatos: 110–220mcg q12h', 'Glicocorticoide inalatório tópico; base de manutenção crônica', 'Latência de 7 a 10 dias; requer sobreposição inicial com esteroide oral'],
        ['Prednisolona Oral (Indução)', 'Cães: 0,5–1,0 mg/kg VO q12h por 5–7d; Gatos: 1–2 mg/kg/dia VO', 'Inibição de NF-kB e citocinas; supressão rápida da inflamação', 'Desmame gradual obrigatório; vigiar ganho de peso e imunossupressão'],
        ['Albuterol (Salbutamol Inalatório)', '1 a 2 puffs de 90 mcg inalatórios com espaçador em crises', 'Beta-2 agonista de curta ação; alívio imediato do broncoespasmo', 'Estritamente resgate; uso diário crônico agrava inflamação pulmonar'],
        ['Terbutalina Parenteral', '0,01 mg/kg SC, IM ou IV lento (gatos e cães em crise)', 'Beta-2 agonista sistêmico rápido; broncodilatação na emergência', 'Monitorar taquicardia e arritmias; precaução em cardiopatas'],
        ['Teofilina Liberação Prolongada', '5 a 10 mg/kg VO a cada 12 horas (espécie canina)', 'Inibição de PDE; melhora clearance mucociliar e diafragma', 'Índice terapêutico estreito; reduzir dose se usar fluoroquinolonas'],
        ['Doxiciclina Oral (ISCAID)', '5 mg/kg VO q12h ou 10 mg/kg VO q24h por 7 a 10 dias', 'Antimicrobiano de eleição se houver infecção bacteriana no BAL', 'Nunca prescrever de rotina sem evidência de infecção citológica'],
        ['Gentamicina 5% Nebulizada', '3 a 5 mL nebulizados a cada 12 horas por 3 a 4 semanas', 'Eliminação tópica de Bordetella bronchiseptica persistente', 'Reservado a infecções refratárias comprovadas em cultura/BAL'],
        ['Hidrocodona Oral (Antitussígeno)', '0,22 a 0,5 mg/kg VO a cada 6 a 12 horas (espécie canina)', 'Opioide de ação central; quebra ciclo de tosse seca e síncope', 'PROIBIDO se houver tosse produtiva, bronquiectasia ou pneumonia'],
        ['Solução Salina 0,9% Nebulizada', '3 a 5 mL em nebulizador pneumático ou ultrassônico 2x/dia', 'Hidratação do líquido periciliar e fluidificação de secreções', 'Seguro e eficaz; jamais associar N-acetilcisteína em gatos'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Propionato de Fluticasona',
        dose: 'Cães <20 kg: 100 mcg q12h; Cães >20 kg: 200 mcg q12h; Gatos: 110 a 220 mcg q12h via espaçador',
        route: 'Inalatória via câmara espaçadora facial (AeroDawg ou AeroKat)',
        frequency: 'A cada 12 horas contínuo',
        mechanism:
          'Glicocorticoide sintético de alta afinidade e elevada seletividade tópica; inibe transcrição de citocinas pró-inflamatórias (IL-4, IL-5, IL-13, TNF-alfa) com metabolização hepática de primeira passagem quase completa em caso de deglutição.',
      },
      {
        drug: 'Prednisolona / Prednisona',
        dose: 'Cães: 0,5 a 1,0 mg/kg VO q12h; Gatos: 1,0 a 2,0 mg/kg VO q24h (indução por 5 a 10 dias com desmame)',
        route: 'Oral',
        frequency: 'A cada 12 a 24 horas inicialmente, com redução escalonada',
        mechanism:
          'Glicocorticoide sistêmico de ação intermediária; promove imunomodulação rápida, reduz edema submucoso e atenua a infiltração neutrofílica inicial durante a fase de indução até o início da ação do inalatório.',
      },
      {
        drug: 'Albuterol (Salbutamol)',
        dose: '1 a 2 puffs de 90 mcg via câmara espaçadora (repetir a cada 15 a 30 min se necessário na crise)',
        route: 'Inalatória',
        frequency: 'Estritamente sob demanda / resgate agudo de broncoespasmo',
        mechanism:
          'Agonista seletivo dos receptores beta-2 adrenérgicos da musculatura lisa brônquica; ativa adenilil ciclase e eleva AMP cíclico intracelular, inibindo a fosforilação da cadeia leve de miosina e promovendo broncodilatação em minutos.',
      },
      {
        drug: 'Terbutalina',
        dose: '0,01 mg/kg SC, IM ou IV lento',
        route: 'Subcutânea, intramuscular ou intravenosa',
        frequency: 'Em crises agudas de broncoespasmo no plantão de emergência',
        mechanism:
          'Beta-2 agonista parenteral de resgate; indicado primariamente em gatos com status asthmaticus ou crise obstrutiva severa com intolerância à máscara facial.',
      },
      {
        drug: 'Teofilina (Liberação Prolongada)',
        dose: '5 a 10 mg/kg VO a cada 12 horas (cães)',
        route: 'Oral',
        frequency: 'A cada 12 horas',
        mechanism:
          'Metilxantina; inibe não seletivamente as fosfodiesterases (PDE III e IV) e antagoniza receptores de adenosina; promove relaxamento brônquico leve, potencializa a força de contração diafragmática e melhora o transporte ciliar de secreções.',
      },
      {
        drug: 'Doxiciclina',
        dose: '5 mg/kg VO q12h ou 10 mg/kg VO q24h por 7 a 10 dias (com água/alimento)',
        route: 'Oral',
        frequency: 'A cada 12 ou 24 horas',
        mechanism:
          'Tetraciclina de segunda geração com excelente penetração no fluido do trato respiratório e atividade contra Mycoplasma cynos e Bordetella bronchiseptica; indicada apenas se houver neutrófilos degenerados e bactérias intracelulares.',
      },
      {
        drug: 'Gentamicina (Inalatória 5%)',
        dose: '3 a 5 mL de solução a 5% nebulizados a cada 12 horas por 3 a 4 semanas',
        route: 'Inalatória via nebulizador pneumático ou ultrassônico',
        frequency: 'A cada 12 horas',
        mechanism:
          'Aminoglicosídeo bactericida tópico; atinge concentrações luminais brônquicas maciças para erradicação de Bordetella bronchiseptica refratária sem risco de nefrotoxicidade sistêmica.',
      },
      {
        drug: 'Bitartarato de Hidrocodona',
        dose: '0,22 a 0,5 mg/kg VO a cada 6 a 12 horas (cães com tosse seca exaustiva)',
        route: 'Oral',
        frequency: 'A cada 6 a 12 horas conforme necessidade',
        mechanism:
          'Agonista opioide de ação central que eleva o limiar de disparo do centro da tosse no tronco encefálico; indicado para quebrar o trauma mecânico de tosse seca contínua; contraindicado em tosse produtiva ou bronquiectasia.',
      },
      {
        drug: 'Cloreto de Sódio 0,9% Estéril (Salina)',
        dose: '3 a 5 mL nebulizados por 10 a 15 minutos',
        route: 'Inalatória via nebulizador',
        frequency: 'A cada 8 a 12 horas',
        mechanism:
          'Fluidificante osmótico do muco brônquico; hidrata a camada periciliar, diminuindo a viscoelasticidade do muco e facilitando o transporte mucociliar natural em pacientes com retenção de secreções.',
      },
    ],
  },

  complications: {
    bronquiectasiaIrreversivelEPneumoniaSecundaria:
      'Dilatação parietal permanente e infecções bacterianas repetidas:\n\n' +
      '- Mecanismo destrutivo: a degranulação contínua de elastase neutrofílica e proteases associada à tosse explosiva repetida destrói a lâmina elástica e cartilagem dos brônquios lobares e segmentares.\n' +
      '- Perda do aparelho mucociliar: os brônquios ectásicos tornam-se cavidades flácidas onde secreções purulentas acumulam-se por gravidade, criando ninhos bacterianos crônicos.\n' +
      '- Risco de broncopneumonia bacteriana recorrente: episódios repetidos de consolidação pulmonar febril por Bordetella bronchiseptica, Pseudomonas aeruginosa ou coliformes entéricos, demandando cursos frequentes de cultura e antibiograma.',
    broncomalaciaDinamicaEColapsoExpiratorio:
      'Instabilidade mecânica das vias condutoras e tosse paroxística incapacitante:\n\n' +
      '- Perda de sustentação estrutural: enfraquecimento e amolecimento da cartilagem hialina de sustentação dos brônquios principais e lobares secundários à inflamação transmural.\n' +
      '- Colapso expiratório dinâmico: a pressão intratorácica positiva gerada durante a expiração e os acessos de tosse colaba a luz brônquica em até 100%, gerando contato mecânico direto entre as paredes inflamadas.\n' +
      '- Tosse em grasno de ganso e refratariedade: manifesta-se clinicamente como tosse seca estridente e dispneia expiratória que responde mal aos tratamentos medicamentosos convencionais.',
    sincopePosTussicaPorColapsoHemodinamico:
      'Eventos sincopais paroxísticos induzidos por aumento de pressão intratorácica:\n\n' +
      '- Fisiopatologia hemodinâmica da tosse violenta: acessos paroxísticos ininterruptos de tosse elevam a pressão pleural positiva a níveis extremos, colabando temporariamente as veias cavas cranial e caudal.\n' +
      '- Queda do débito cardíaco: a interrupção abrupta do retorno venoso para o átrio direito derruba o enchimento ventricular e o débito sistêmico, gerando hipoperfusão cerebral transitória.\n' +
      '- Apresentação clínica: o cão tosse violentamente por vários segundos e sofre perda súbita de tônus postural e consciência com recuperação rápida em 10 a 20 segundos; não deve ser confundida com crise epiléptica primária.',
    hipertensaoPulmonarECorPulmonale:
      'Remodelamento vascular pulmonar e sobrecarga cardíaca direita:\n\n' +
      '- Vasoconstrição pulmonar hipóxica crônica: a hipoventilação alveolar sustentada em múltiplas regiões pulmonares dispara vasoconstrição contínua das arteríolas pulmonares.\n' +
      '- Remodelamento e hipertrofia arteriolar: a longo prazo, ocorre hipertrofia da camada média vascular e perda de complacência do leito arterial pulmonar, consolidando hipertensão pré-capilar.\n' +
      '- Falência ventricular direita tardia: o aumento da pós-carga imposto ao ventrículo direito resulta em cor pulmonale crônico com hipertrofia ventricular concêntrica, dilatação atrial direita, ascite e distensão de veias jugulares.',
    fadigaMuscularRespiratoriaEInsuficienciaTipoII:
      'Exaustão ventilatória e retenção de dióxido de carbono por obstrução grave:\n\n' +
      '- Sobrecarga metabólica do trabalho ventilatório: a resistência expiratória extrema imposta pelas pequenas vias condutoras estreitadas exige esforço contínuo dos músculos retos do abdômen e intercostais.\n' +
      '- Fadiga muscular diafragmática: o esgotamento das reservas energéticas musculares diminui o volume corrente efetivo, instalando hipoventilação alveolar global.\n' +
      '- Acidose respiratória hipercápnica tipo II: retenção aguda de PaCO2 (>50-60 mmHg), narcose por dióxido de carbono, depressão do sensório e parada respiratória iminente se o paciente não for intubado e ventilado mecanicamente.',
  },

  prevention: {
    prevencaoSecundariaEControleAmbientalPrecoce:
      'Medidas profiláticas para desacelerar o dano estrutural irreversível:\n\n' +
      '- Intervenção precoce contra remodelamento: embora a bronquite crônica idiopática não tenha prevenção primária conhecida, o diagnóstico precoce e o controle rápido da inflamação epitelial impedem a evolução para bronquiectasia permanente e broncomalácia.\n' +
      '- Ambiente permanentemente livre de poluentes: a manutenção de uma casa livre de fumaça de cigarro, incensos, aromatizadores sintéticos e produtos voláteis é o fator modificador de sobrevida mais impactante a longo prazo.',
    manutencaoDoEscoreCorporalEPrevencaoDaObesidade:
      'Controle do peso e preservação da biomecânica da caixa torácica:\n\n' +
      '- Manutenção de escore de condição corporal ideal (BCS 4-5/9): o manejo nutricional estrito previne o acúmulo de gordura sobre a caixa torácica e sobre a cúpula diafragmática, mantendo complacência pulmonar normal e reduzindo a exigência ventilatória.\n' +
      '- Atividade física adaptada: caminhadas leves e controladas em horários frescos estimulam a ventilação e a drenagem natural de secreções brônquicas sem deflagrar crises de tosse exaustivas.',
    educacaoDoTutorEParceriaNoUsoDoEspacador:
      'Capacitação do tutor na administração inalatória e vigilância de exacerbações:\n\n' +
      '- Treinamento e adaptação positiva ao espaçador facial: condicionamento progressivo com reforço positivo do cão ou gato para aceitar a máscara do AeroDawg ou AeroKat sem estresse, garantindo a dose terapêutica efetiva de fluticasona.\n' +
      '- Reconhecimento precoce de infecções sobrepostas: educar a família para monitorar a frequência respiratória em repouso e procurar atendimento imediato perante febre, secreção nasal purulenta, letargia ou perda de apetite, evitando o uso empírico caseiro de antibióticos.',
  },

  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [
    'prednisolona',
    'budesonida',
    'maropitant',
    'enrofloxacina',
    'pradofloxacina',
  ],

  references: [
    {
      id: 'ref-lyssens-2025-ccb-algo',
      authors: 'Lyssens A, Roels E, Clercx C, Billen F',
      title:
        'Proposed treatment algorithms for dogs with chronic bronchitis associated with irreversible airway changes: bronchiectasis and/or bronchomalacia',
      journal: 'Frontiers in Veterinary Science',
      year: 2025,
      volume: '12',
      pages: '1686007',
      url: 'https://doi.org/10.3389/fvets.2025.1686007',
    },
    {
      id: 'ref-chan-johnson-2023-aerodawg',
      authors: 'Chan JC, Johnson LR',
      title:
        'Prospective evaluation of the efficacy of inhaled steroids administered via the AeroDawg spacing chamber in management of dogs with chronic cough',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2023,
      volume: '37',
      issue: '2',
      pages: '660-669',
      url: 'https://doi.org/10.1111/jvim.16673',
    },
    {
      id: 'ref-barchilon-reinero-2023-inhalational',
      authors: 'Barchilon M, Reinero CR',
      title:
        'Breathe easy: inhalational therapy for feline inflammatory airway disease',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2023,
      volume: '25',
      issue: '10',
      pages: '1098612X231193054',
      url: 'https://doi.org/10.1177/1098612X231193054',
    },
    {
      id: 'ref-werner-2023-microbiome-asthma-cb',
      authors: 'Werner M, Suchodolski JS, Straubinger RK, et al.',
      title:
        'Comparison of the respiratory bacterial microbiome in cats with feline asthma and chronic bronchitis',
      journal: 'Frontiers in Veterinary Science',
      year: 2023,
      volume: '10',
      pages: '1148849',
      url: 'https://doi.org/10.3389/fvets.2023.1148849',
    },
    {
      id: 'ref-hartung-2023-allergy-flad',
      authors: 'Hartung BF, Schulz BS, Weber K, et al.',
      title:
        'Reactions to environmental allergens in cats with feline lower airway disease',
      journal: 'Frontiers in Veterinary Science',
      year: 2023,
      volume: '10',
      pages: '1267496',
      url: 'https://doi.org/10.3389/fvets.2023.1267496',
    },
    {
      id: 'ref-iscaid-lappin-2017-resp',
      authors: 'Lappin MR, Blondeau J, Boothe D, et al.',
      title:
        'Antimicrobial use Guidelines for Treatment of Respiratory Tract Disease in Dogs and Cats: European and North American Veterinary Antimicrobial Stewardship',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2017,
      volume: '31',
      issue: '2',
      pages: '279-294',
      url: 'https://doi.org/10.1111/jvim.14627',
    },
    {
      id: 'ref-peeters-2000-balf-quant',
      authors: 'Peeters DE, McKiernan BC, Weisiger RM, et al.',
      title:
        'Quantitative bacterial cultures and cytological examination of bronchoalveolar lavage specimens in dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2000,
      volume: '14',
      issue: '5',
      pages: '534-541',
      url: 'https://doi.org/10.1892/0891-6640(2000)014<0534:QBCACE>2.3.CO;2',
    },
    {
      id: 'ref-lebastard-2022-balf-antibiotic',
      authors: 'Lebastard M, Roels E, Le Boedec K, et al.',
      title:
        'Association between quantitative bacterial culture of BALF and antibiotic requirement in dogs with lower respiratory signs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2022,
      volume: '36',
      issue: '4',
      pages: '1444-1453',
      url: 'https://doi.org/10.1111/jvim.16456',
    },
    {
      id: 'ref-cocayne-2011-subclinical-inflam',
      authors: 'Cocayne CG, Reinero CR, DeClue AE',
      title:
        'Subclinical airway inflammation despite high-dose oral corticosteroid therapy in cats with lower airway disease',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2011,
      volume: '13',
      issue: '8',
      pages: '558-563',
      url: 'https://doi.org/10.1016/j.jfms.2011.04.001',
    },
    {
      id: 'ref-munro-2026-chronic-cough',
      authors: 'Munro H',
      title: 'The Approach to Chronic Cough in Dogs and Cats',
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      year: 2026,
      volume: '56',
      issue: '4',
      pages: '825-852',
      url: 'https://doi.org/10.1016/j.cvsm.2026.03.004',
    },
    {
      id: 'ref-gareis-schulz-2026-feline-asthma',
      authors: 'Gareis C, Schulz BS',
      title: 'Feline Asthma: Update on Immunopathogenesis, Diagnosis, and Therapy',
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      year: 2026,
      volume: '56',
      issue: '4',
      pages: '971-993',
      url: 'https://doi.org/10.1016/j.cvsm.2026.03.009',
    },
    {
      id: 'ref-nelson-couto-6ed-ch20-21',
      authors: 'Nelson RW, Couto CG',
      title:
        'Small Animal Internal Medicine, 6th Edition: Chapter 20 (Diagnostic Tests for the Respiratory System) & Chapter 21 (Disorders of the Trachea and Bronchi)',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      pages: '298-333',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57297-2',
    },
    {
      id: 'ref-feline-ecc-2ed-ch12',
      authors: 'Drobatz KJ, Beal MW, Syring RS',
      title:
        'Feline Emergency and Critical Care Medicine, 2nd Edition: Chapter 12 (Lower Airway Disease)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: '119-127',
      url: 'https://www.wiley.com/en-us/Feline+Emergency+and+Critical+Care+Medicine%2C+2nd+Edition-p-9781119528760',
    },
    {
      id: 'ref-plumb-10ed-respiratory-drugs',
      authors: 'Plumb DC',
      title:
        "Plumb's Veterinary Drug Handbook, 10th Edition: Monographs for Fluticasone, Albuterol, Terbutaline, Theophylline, Hydrocodone, and Doxycycline",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'Various',
      url: 'https://www.plumbs.com',
    },
  ],
};
