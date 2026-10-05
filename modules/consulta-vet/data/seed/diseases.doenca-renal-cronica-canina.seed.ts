import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Doença Renal Crônica em Cães (DRC Canina) — Monografia Clínica Padrão Ouro.
 * Atualizado com base em:
 * - Diretrizes e Consensos Oficiais IRIS 2026 (International Renal Interest Society)
 * - Ensaios clínicos e estudos contemporâneos na espécie canina:
 *   Lourenço et al. (2020 - RCT duplo-cego com telmisartana vs enalapril na proteinúria canina, n=39),
 *   Murdoch et al. (2024 - perfil peptídico do SRAA com telmisartana em cães proteinúricos, n=36),
 *   Chen, Segev & Mazaki-Tovi (2025 - ensaio crossover de paricalcitol na DRC canina, n=13),
 *   Estudo de Beraprost sódico na DRC canina IRIS 2 (Frontiers 2026, n=33, sobrevida mediana 1101 vs 198 dias),
 *   Santos et al. (2026 - meta-análise de cistatina C e cistatina B urinária em cães e gatos),
 *   Perini-Perera et al. (2021 - progressão e fatores prognósticos longitudinais na DRC canina),
 *   Perondi et al. (2025 - RCT de suplementação renal multimodal em cães IRIS 3-4, n=30),
 *   Brown et al. (1998 - estudo experimental de ácidos graxos ômega-3 e fósforo na nefrectomia 15/16 canina)
 * - Livros-texto do acervo:
 *   Nelson & Couto 6ª ed. (cap. 41 - Insuficiência Renal Crônica, pp. 692-703),
 *   DiBartola (Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice 5ª ed. - Distúrbios de Fósforo, Magnésio e Ácido-Base),
 *   Plumb's Veterinary Drug Handbook 10ª ed. (monografias de telmisartana, darbepoetina, quelantes e antieméticos),
 *   BSAVA Small Animal Formulary 10ª ed. (posologia de telmisartana em cães)
 */
export const doencaRenalCronicaCaninaRecord: DiseaseRecord = {
  id: 'disease-doenca-renal-cronica-canina',
  slug: 'doenca-renal-cronica-canina',
  title: 'Doença renal crônica em cães (DRC canina)',
  subtitle:
    'Guia clínico avançado: atualização oficial IRIS 2026, expansão do estágio 2, interpretação combinada creatinina-SDMA, telmisartana (ARB) como terapia antiproteinúrica de primeira linha, novos alvos para anemia (HCT <30%) e acidose, e análise crítica de terapias emergentes (paricalcitol e beraprost)',
  synonyms: [
    'DRC canina',
    'Doença renal crônica em cães',
    'Insuficiência renal crônica canina',
    'Nefropatia crônica canina',
    'Canine chronic kidney disease',
    'Canine CKD',
    'Nefropatia perdedora de proteínas canina (PLN)',
    'Glomerulopatia crônica canina',
  ],
  species: ['dog'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'clinica-medica',
    'nutricao-clinica',
    'farmacologia-terapeutica',
    'diagnostico-por-imagem',
  ],
  tags: [
    'DRC Canina',
    'Doença Renal Crônica',
    'IRIS 2026',
    'Creatinina e SDMA',
    'Telmisartana',
    'Bloqueio do Receptor AT1',
    'Proteinúria Renal',
    'UPC',
    'Quelantes de Fósforo',
    'Darbepoetina',
    'HIF-PH Inhibitors',
    'Acidose Metabólica',
    'Beraprost',
    'Nelson & Couto',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['doenca-renal-cronica-canina'],

  quickSummary:
    'A doença renal crônica em cães é uma síndrome de perda irreversível e progressiva da massa nefronal funcional com duração superior a três meses, cuja abordagem foi substancialmente redefinida pelas diretrizes IRIS 2026 e ensaios clínicos caninos recentes:\n\n' +
    '- Novo estadiamento canino IRIS 2026: expansão formal do estágio 2 (creatinina 1,4 a 2,8 mg/dL; SDMA 18 a 35 mcg/dL), de modo que um cão com creatinina de 2,5 mg/dL é classificado atualmente como estágio 2 e não mais estágio 3; estágio 3 abrange creatinina de 2,9 a 5,0 mg/dL e estágio 4 creatinina superior a 5,0 mg/dL.\n' +
    '- Interpretação conjunta de creatinina e SDMA: cães sarcopênicos, caquéticos e idosos perdem massa muscular e produzem menos creatinina, mascarando a perda real da taxa de filtração glomerular (TFG); o algoritmo IRIS 2026 manda estadiar pelo SDMA persistente quando houver discordância (ex: creatinina 2,0 com SDMA >35 mcg/dL é manejado como IRIS 3).\n' +
    '- Telmisartana (ARB) como terapia antiproteinúrica de primeira linha: ensaio clínico randomizado duplo-cego em cães (Lourenço et al., 2020) comprovou superioridade da telmisartana (1 mg/kg VO q24h) sobre o enalapril (0,5 mg/kg VO q12h), com redução mediana da UPC de 65% versus 35% aos 30 dias (p=0,002), estabelecendo o bloqueador do receptor AT1 como padrão moderno.\n' +
    '- Veto ao duplo bloqueio automático do SRAA: a associação rotineira de IECA e ARB eleva em 31% o risco de queda abrupta da TFG e azotemia grave em cães (Lourenço et al., 2020), sendo contraindicada de forma indiscriminada.\n' +
    '- Novo gatilho terapêutico para anemia renal: diretrizes IRIS 2026 recomendam iniciar tratamento com agentes estimuladores da eritropoiese (darbepoetina) quando o hematócrito estiver abaixo de 30% (e considerar entre 30% e 35% se persistente), superando o antigo limiar permissivo de <20%; investigação e suplementação de ferro são pré-requisitos obrigatórios.\n' +
    '- Metas estritas de fósforo e acidose: metas escalonadas de fósforo sérico por estágio (estágio 2 entre 2,7 e 4,6 mg/dL; estágio 3 <5,0 mg/dL; estágio 4 <6,0 mg/dL) com quelantes entéricos administrados estritamente com as refeições; correção de acidose recomendada precocemente se bicarbonato sérico <18 mmol/L (meta de 18 a 24 mmol/L).\n' +
    '- Terapias emergentes e fronteiras: análise crítica do beraprost sódico (estudo canino 2026 em IRIS 2 com sobrevida mediana de 1101 vs 198 dias em controle histórico), paricalcitol (ensaio JVIM 2025 com redução de 22% no PTH, porém com risco de aumento acentuado de FGF-23 e hipercalcemia) e HIF-PH inhibitors (molidustat com dados predominantemente felinos, exigindo cautela contra extrapolação empírica).',

  quickDecisionStrip: [
    'Estadiamento IRIS 2026 canino ampliou o estágio 2 até creatinina de 2,8 mg/dL: cão com creatinina de 2,5 mg/dL é estágio 2 e não estágio 3.',
    'Nunca estadiar paciente instável ou desidratado: estabilize o volume circulante antes de atribuir estágio IRIS definitivo.',
    'Interprete creatinina e SDMA juntas: em cães sarcopênicos, a creatinina subestima a lesão renal; se o SDMA estiver desproporcionalmente alto, estadie pelo SDMA.',
    'Telmisartana (1 mg/kg VO q24h) é a primeira linha para proteinúria renal canina, com redução mediana da UPC de 65% vs 35% com enalapril (RCT Lourenço 2020).',
    'Não associe IECA + ARB de rotina: o duplo bloqueio causou azotemia e disfunção hemodinâmica em 31% dos cães com DRC no estudo clínico.',
    'Novo limiar para tratar anemia renal pelo IRIS 2026: hematócrito abaixo de 30% exige intervenção (darbepoetina), sempre precedida de avaliação do perfil de ferro.',
    'Fósforo sérico deve ser controlado conforme o estágio: meta no estágio 2 é de 2,7 a 4,6 mg/dL; quelantes entéricos só funcionam se dados misturados à comida.',
    'Corrija acidose metabólica mais cedo: trate se bicarbonato sérico <18 mmol/L para atingir a meta terapêutica de 18 a 24 mmol/L.',
    'Dieta renal não é simplesmente dieta hipoproteica: priorize o controle estrito do fósforo e a densidade calórica para evitar sarcopenia e mortalidade.',
    'Não prescreva omeprazol profilático contínuo apenas pela ureia elevada: a gastropatia urêmica nem sempre cursa com hipersecreção ácida no cão.',
  ],

  quickSummaryRich: {
    lead:
      'A abordagem da doença renal crônica canina foi profundamente modernizada pela revisão IRIS 2026 e por ensaios clínicos robustos na espécie:\n\n' +
      '- Mudança no corte de gravidade: expansão do estágio 2 canino e valorização da sarcopenia como causa de subestimação da creatinina sérica.\n' +
      '- Revolução farmacológica e metas ativas: protagonismo do bloqueio AT1 com telmisartana para proteinúria, intervenção mais precoce na anemia e quelantes de fósforo combinados ao manejo nutricional.',
    leadHighlights: [
      'Novo estadiamento IRIS 2026 (estágio 2 canino expandido até 2,8 mg/dL)',
      'Telmisartana superior ao enalapril no RCT Lourenço et al. (2020)',
      'Tratamento da anemia renal antecipado para hematócrito <30%',
      'Metas rigorosas de fósforo e tratamento de acidose com HCO3 <18 mmol/L',
      'Análise crítica das fronteiras: beraprost, paricalcitol e cistatinas',
    ],
    pillars: [
      {
        title: 'Pilar 1: Novo Estadiamento IRIS 2026 e Discordância Cr/SDMA',
        body:
          'Diretrizes caninas atualizadas e resolução da interferência de massa muscular:\n\n' +
          '- Faixas redefinidas: Estágio 1 (Cr <1,4 mg/dL; SDMA <18 mcg/dL); Estágio 2 (Cr 1,4–2,8 mg/dL; SDMA 18–35 mcg/dL); Estágio 3 (Cr 2,9–5,0 mg/dL; SDMA 36–54 mcg/dL); Estágio 4 (Cr >5,0 mg/dL; SDMA >54 mcg/dL).\n' +
          '- Resolução de discordâncias clínicas: em cães idosos com perda de massa magra, a taxa de produção de creatinina cai; perante discordância persistente, a conduta IRIS determina estadiar e tratar conforme o patamar mais grave indicado pelo SDMA.\n' +
          '- Requisito inegociável de estabilidade: o estadiamento só é válido no paciente euvolêmico e clinicamente estável, devendo-se descartar azotemia pré-renal e LRA sobreposta.',
        highlights: ['Estágio 2 expandido (1,4–2,8 mg/dL)', 'Sarcopenia reduz creatinina', 'Estadiar pelo SDMA na discordância'],
      },
      {
        title: 'Pilar 2: Renoproteção Antiproteinúrica e Tromboprofilaxia',
        body:
          'Controle da sobrecarga glomerular e mitigação do risco vascular na PLN:\n\n' +
          '- Superioridade documentada da telmisartana: estudo randomizado duplo-cego (Lourenço et al., 2020) comprovou redução da UPC de 65% com telmisartana (1 mg/kg VO q24h) vs 35% com enalapril (p=0,002), associando-se a aumento favorável de Ang 1-7 (Murdoch et al., 2024).\n' +
          '- Risco do duplo bloqueio rotineiro: a combinação de IECA e ARB não deve ser empírica, pois provocou azotemia e descompensação hemodinâmica em 31% dos cães com DRC.\n' +
          '- Tromboprofilaxia na síndrome nefrótica/PLN: proteinúria glomerular grave com perda de antitrombina III e hiperfibrinogenemia exige clopidogrel (1,1 a 3 mg/kg VO q24h) para prevenir tromboembolismo pulmonar e aórtico.',
        highlights: ['Telmisartana 1 mg/kg de primeira escolha', 'Perigo do duplo bloqueio (31% azotemia)', 'Clopidogrel para cães com PLN'],
      },
      {
        title: 'Pilar 3: Manejo Mineral-Ósseo (CKD-MBD) e Metas de Fósforo',
        body:
          'Intervenção no eixo fósforo-FGF-23-PTH e quelantes intestinais:\n\n' +
          '- Alvos de fósforo sérico IRIS 2026: manter fósforo entre 2,7 e 4,6 mg/dL no estágio 2, <5,0 mg/dL no estágio 3 e <6,0 mg/dL no estágio 4.\n' +
          '- Uso rigoroso de quelantes entéricos: hidróxido de alumínio, carbonato de cálcio, sevelamer ou citrato férrico devem ser fornecidos obrigatoriamente misturados às refeições para quelar o fósforo alimentar no lúmen digestivo.\n' +
          '- Toxicidade por alumínio em uso prolongado: pacientes em estágio 4 com uso continuado de hidróxido de alumínio podem desenvolver fraqueza, microcitose e encefalopatia por acúmulo tecidual de alumínio.',
        highlights: ['Fósforo <4,6 mg/dL no estágio 2', 'Quelantes administrados com a refeição', 'Vigilância de toxicidade por alumínio'],
      },
      {
        title: 'Pilar 4: Anemia Precoce, Acidose e Terapias de Fronteira',
        body:
          'Atualização dos limiares vitais e posicionamento de novas moléculas:\n\n' +
          '- Novo gatilho de anemia (HCT <30%): indicação formal de darbepoetina alfa (0,45 a 1,0 mcg/kg SC semanal) com checagem prévia obrigatória de reticulócitos e perfil de ferro medular.\n' +
          '- Correção ativa da acidose metabólica: tratar quando bicarbonato sérico <18 mmol/L para atingir a meta de 18 a 24 mmol/L com bicarbonato de sódio ou citrato de potássio.\n' +
          '- Análise crítica de beraprost e paricalcitol: beraprost demonstrou aumento de sobrevida expressivo em cães IRIS 2 em estudo com controle histórico (1101 vs 198 dias), exigindo confirmação por ensaio randomizado; paricalcitol reduz PTH, mas exige monitoramento de hipercalcemia e elevação de FGF-23.',
        highlights: ['Tratar anemia com HCT <30%', 'Meta de bicarbonato 18–24 mmol/L', 'Beraprost e paricalcitol como fronteiras'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Estruturado para DRC Canina — IRIS 2026',
      steps: [
        {
          label: 'Passo 1: Confirmação da Cronicidade e Estabilização Volêmica',
          detail:
            'Demonstração objetiva de doença renal estável por pelo menos três meses:\n\n' +
            '- Critérios de cronicidade: azotemia persistente, perda crônica de densidade urinária (isostenúria 1,008–1,012) e evidências ultrassonográficas de perda arquitetural renal.\n' +
            '- Requisito inegociável de euvolemia: jamais estadiar cães desidratados, hipovolêmicos ou em choque; corrigir todo o componente pré-renal com fluidoterapia antes de colher sangue para estadiamento IRIS.\n' +
            '- Exclusão de componentes pós-renais e LRA: ultrassom focado para excluir urolitíase obstrutiva e infecção bacteriana ativa (pielonefrite).',
        },
        {
          label: 'Passo 2: Estadiamento Canino por Creatinina Sérica e SDMA',
          detail:
            'Enquadramento nos intervalos de corte do guideline IRIS 2026:\n\n' +
            '- Mensuração basal dupla: avaliar creatinina sérica e SDMA em pelo menos duas ocasiões no paciente estável.\n' +
            '- Enquadramento nos estágios: Estágio 1 (Cr <1,4 mg/dL; SDMA <18 mcg/dL); Estágio 2 (Cr 1,4–2,8 mg/dL; SDMA 18–35 mcg/dL); Estágio 3 (Cr 2,9–5,0 mg/dL; SDMA 36–54 mcg/dL); Estágio 4 (Cr >5,0 mg/dL; SDMA >54 mcg/dL).\n' +
            '- Resolução de discordâncias por sarcopenia: em cães caquéticos com creatinina subestimada, classificar o estágio pelo SDMA (ex: Cr 2,0 com SDMA 38 mcg/dL é manejado como estágio 3).',
        },
        {
          label: 'Passo 3: Subestadiamento Rigoroso da Proteinúria Renal (UPC)',
          detail:
            'Quantificação da perda proteica urinária livre de interferências:\n\n' +
            '- Pré-requisito de sedimento inativo: verificar sedimento urinário para excluir hematúria macroscópica, piúria e bacteriúria antes de valorizar a UPC.\n' +
            '- Categorização da UPC no cão: não proteinúrico (UPC <0,2), borderline (UPC 0,2–0,5) e proteinúrico (UPC >0,5).\n' +
            '- Suspeita de glomerulopatia primária: UPC persistentemente superior a 2,0 associada a hipoalbuminemia sérica e hipercolesterolemia impõe investigação de glomerulopatia específica e consideração de biópsia renal.',
        },
        {
          label: 'Passo 4: Subestadiamento da Pressão Arterial Sistêmica (PAS)',
          detail:
            'Aferição padronizada da pressão arterial para estratificação de risco de lesão de órgão-alvo (TOD):\n\n' +
            '- Técnica padronizada: Doppler vascular ou oscilometria de alta definição em ambiente calmo após 10 a 15 minutos de aclimatação com manguito adequado (40% da circunferência).\n' +
            '- Categorias de risco: PAS <140 mmHg (risco mínimo), 140–159 mmHg (baixo risco / pré-hipertenso), 160–179 mmHg (risco moderado) e >=180 mmHg (alto risco imediato).\n' +
            '- Exame de fundo de olho: inspeção oftalmológica obrigatória para detecção de tortuosidade vascular, hemorragias retinianas ou descolamento de retina.',
        },
        {
          label: 'Passo 5: Mapeamento de Complicações Metabólicas e Perfil Mineral',
          detail:
            'Painel metabólico especializado para direcionamento terapêutico individualizado:\n\n' +
            '- Perfil fosfocálcico: fósforo sérico, cálcio total e preferencialmente cálcio ionizado (o cálcio total tem má concordância na DRC canina).\n' +
            '- Equilíbrio ácido-base e eletrólitos: dosagem de bicarbonato sérico ou CO2 total (alvo 18–24 mmol/L), potássio sérico e magnésio (hipomagnesemia causa hipopotassemia refratária).\n' +
            '- Avaliação hematológica e reservas de ferro: hemograma com contagem de reticulócitos, ferro sérico e capacidade total de ligação de ferro (TIBC) se hematócrito <30%.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico Integrado da DRC Canina — IRIS 2026',
      steps: [
        {
          label: 'Fase 1: Terapia Nutricional Renal Precoce e Manejo Calórico',
          detail:
            'Intervenção modificadora de doença com maior evidência clínica comprovada:\n\n' +
            '- Dieta renal terapêutica exclusiva: introdução gradativa no estágio 2 (ou estágio 1 proteinúrico); promove restrição controlada de fósforo, teor proteico moderado com alta digestibilidade, enriquecimento com ácidos graxos ômega-3 (EPA/DHA) e densidade energética elevada.\n' +
            '- Preservação de massa magra: monitorar escore corporal (BCS) e muscular (MCS); a restrição proteica não deve ser severa a ponto de induzir proteólise e sarcopenia.\n' +
            '- Estímulo de hidratação enteral: garantir livre acesso a água limpa e fresca e estimular consumo com ração úmida; evitar fluidoterapia subcutânea rotineira em animais que compensam suas perdas por via oral.',
        },
        {
          label: 'Fase 2: Bloqueio do Receptor AT1 com Telmisartana para Proteinúria',
          detail:
            'Renoproteção hemodinâmica e antiproteinúrica de primeira linha:\n\n' +
            '- Posologia: telmisartana oral na dose de 0,5 a 1,0 mg/kg VO a cada 24 horas (alvo terapêutico de 1 mg/kg/dia conforme o RCT Lourenço et al., 2020).\n' +
            '- Metas de resposta: almejar UPC <0,5 ou redução de pelo menos 50% em relação ao valor basal, sem queda excessiva da TFG (creatinina não deve subir mais de 30%).\n' +
            '- Contraindicação de duplo bloqueio rotineiro: não associar enalapril/benazepril à telmisartana como rotina devido ao alto risco de azotemia grave e hipotensão.',
        },
        {
          label: 'Fase 3: Controle Estrito do Fósforo Sérico com Quelantes Entéricos',
          detail:
            'Manutenção do fósforo na faixa preconizada pelas diretrizes IRIS 2026:\n\n' +
            '- Metas por estágio: manter fósforo entre 2,7 e 4,6 mg/dL no estágio 2, abaixo de 5,0 mg/dL no estágio 3 e abaixo de 6,0 mg/dL no estágio 4.\n' +
            '- Quelantes administrados com a refeição: hidróxido de alumínio (30 a 100 mg/kg/dia fracionado com alimento), carbonato de cálcio ou citrato férrico; o quelante deve encontrar o fósforo no lúmen gástrico durante a digestão alimentar.\n' +
            '- Monitoramento de toxicidade: em cães em estágio 4 sob hidróxido de alumínio crônico, vigiar sinais de microcitose e fraqueza associados ao acúmulo de alumínio.',
        },
        {
          label: 'Fase 4: Manejo Proativo da Anemia e Correção da Acidose Metabólica',
          detail:
            'Intervenção antecipada para preservar perfusão tecidual e homeostase celular:\n\n' +
            '- Gatilho da anemia (HCT <30%): investigar e corrigir deficiência de ferro antes de iniciar darbepoetina alfa (0,45 a 1,0 mcg/kg SC semanal); titular até atingir hematócrito entre 30% e 35%.\n' +
            '- Correção da acidose (HCO3 <18 mmol/L): administrar bicarbonato de sódio (8 a 12 mg/kg VO q12h) ou citrato de potássio (40 a 75 mg/kg VO q12h) para atingir meta de bicarbonato de 18 a 24 mmol/L, combatendo a proteólise muscular e desmineralização óssea.',
        },
        {
          label: 'Fase 5: Controle Sintomático, Tromboprofilaxia e Cuidados de Estágio Avançado',
          detail:
            'Suporte clínico e individualização terapêutica nos estágios 3 e 4:\n\n' +
            '- Tromboprofilaxia na PLN: administrar clopidogrel (1,1 a 3 mg/kg VO q24h) em cães com proteinúria glomerular importante para prevenir eventos tromboembólicos.\n' +
            '- Manejo de náusea e apetite: maropitant (1 a 2 mg/kg VO q24h) e capromorelina (3 mg/kg VO q24h); evitar uso crônico de omeprazol sem evidência de sangramento digestivo.\n' +
            '- Suporte nutricional por sonda: considerar sonda de esofagostomia em cães hiporéxicos para garantir calorias, hidratação enteral e medicação sem estresse.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualDRCCanina:
      'Conceito patológico fundamental da doença renal crônica no cão:\n\n' +
      '- Perda nefronal irreversível: síndrome clínica e laboratorial secundária à destruição progressiva e irreversível de néfrons funcionais, resultando em declínio sustentado da taxa de filtração glomerular (TFG), perda da capacidade de concentração urinária e desregulação do equilíbrio hidroeletrolítico e ácido-base.\n' +
      '- Critério temporal operacional de três meses: define-se formalmente pela presença de anormalidades estruturais renais (visualizadas por ultrassonografia) ou funcionais (azotemia, proteinúria renal persistente, isostenúria) mantidas por pelo menos três meses consecutivos.\n' +
      '- Falência dos mecanismos de reserva: os rins caninos possuem grande capacidade compensatória; a perda de até 67% dos néfrons compromete primariamente a capacidade de concentrar a urina (deflagrando poliúria e polidipsia compensatória), enquanto a azotemia sérica (retenção de ureia e creatinina) manifesta-se tipicamente após perda superior a 75% da massa funcional.',
    estadiamentoAtualizadoIRIS2026:
      'Reformulação estrutural do estadiamento canino pela International Renal Interest Society (IRIS 2026):\n\n' +
      '- Expansão do estágio 2 canino: as novas diretrizes IRIS 2026 ampliaram oficialmente o intervalo do estágio 2 no cão para valores de creatinina entre 1,4 e 2,8 mg/dL (SDMA de 18 a 35 mcg/dL), unificando pacientes com azotemia leve.\n' +
      '- Correção do paradigma histórico dos livros-texto: no modelo antigo reproduzido em edições anteriores de livros-texto (como Nelson & Couto 6ª ed.), o estágio 2 encerrava em 2,0 mg/dL e o estágio 3 iniciava em 2,1 mg/dL; no estadiamento atualizado IRIS 2026, um cão com creatinina de 2,5 mg/dL é formalmente classificado como estágio 2 e não estágio 3.\n' +
      '- Justificativa biológica da mudança: a IRIS esclarece que o antigo estágio 3 agrupava pacientes heterogêneos demais quanto a risco urêmico e necessidade terapêutica, justificando a redefinição do estágio 3 canino para a faixa de creatinina de 2,9 a 5,0 mg/dL (SDMA de 36 a 54 mcg/dL) e estágio 4 para creatinina >5,0 mg/dL (SDMA >54 mcg/dL).',
    discordanciaCreatininaESDMA:
      'Integração clínica e resolução de discordâncias entre creatinina sérica e SDMA:\n\n' +
      '- Limitação da creatinina na sarcopenia: a creatinina deriva da quebra metabólica não enzimática da creatina e fosfocreatina muscular; cães geriátricos, caquéticos e sarcopênicos perdem massa magra, apresentando menor taxa de síntese de creatinina e valores séricos artificialmente baixos que mascaram a gravidade da perda de TFG.\n' +
      '- Papel do SDMA (dimetilarginina simétrica): marcador de excreção renal de filtração glomerular independente da massa muscular corporal, capaz de elevar-se precocemente na perda de função renal.\n' +
      '- Algoritmo IRIS para discordâncias persistentes: quando a creatinina e o SDMA divergirem no paciente estável, a conduta recomendada pela IRIS 2026 é classificar e tratar pelo patamar mais grave indicado pelo SDMA (exemplo: cão sarcopênico com creatinina de 1,2 mg/dL mas SDMA persistente de 24 mcg/dL deve ser manejado como estágio 2; cão com creatinina de 2,2 mg/dL e SDMA de 40 mcg/dL é manejado como estágio 3).\n' +
      '- Alerta contra SDMA isolado: o SDMA não deve ser interpretado como diagnóstico exclusivo de DRC sem confirmação de persistência temporal e sem correlação com densidade urinária, proteinúria ou imagem estrutural.',
    subestadiamentoDeProteinuriaEHipertensao:
      'Subclassificação obrigatória de proteinúria renal e pressão arterial:\n\n' +
      '- Subestágio de proteinúria (UPC): classificado no cão como não proteinúrico (UPC <0,2), borderline (UPC 0,2 a 0,5) e proteinúrico (UPC >0,5); deve representar proteinúria renal persistente e livre de sedimento ativo.\n' +
      '- Subestágio de pressão arterial sistêmica (PAS): dividido em risco mínimo (<140 mmHg), risco baixo / pré-hipertenso (140 a 159 mmHg), risco moderado (160 a 179 mmHg) e risco alto (>=180 mmHg) de lesão em órgãos-alvo (TOD).',
    glomerulopatiasPrimariasEBiopsiaRenal:
      'Identificação de doença glomerular no cão e momento ótimo para biópsia:\n\n' +
      '- Suspeição de glomerulopatia primária: cão apresentando UPC persistentemente superior a 2,0 com sedimento urinário estritamente inativo, associada a hipoalbuminemia e hipercolesterolemia, deve ser avaliado para nefropatia perdedora de proteínas (PLN) e glomerulopatia primária.\n' +
      '- Protagonismo da biópsia renal no cão: diferentemente do gato, em que a doença tubulointersticial predomina quase que exclusivamente, no cão a biópsia renal é amplamente recomendada pela IRIS nos estágios 1 a 3 para diferenciar glomerulonefrite por imunocomplexos (ICGN) de glomeruloesclerose focal e segmentar e amiloidose, orientando imunossupressão específica.\n' +
      '- Contraindicação no estágio 4: a biópsia renal não é indicada no estágio 4 terminal pelo risco hemorrágico e anestésico desproporcional frente a um parênquima terminal esclerosado sem benefício de conduta.',
    achadosUltrassonograficosEReversibilidade:
      'Papel da imagem abdominal na avaliação diagnóstica:\n\n' +
      '- Achados clássicos de cronicidade: rins de dimensões diminuídas, superfície capsular irregular, aumento difuso da ecogenicidade cortical, perda da definição corticomedular e presença de nefrolitíase ou cistos renais.\n' +
      '- Ultrassom normal não exclui DRC: rins com arquitetura ecográfica preservada podem abrigar nefropatia crônica em fase inicial ou glomerulopatia pura sem distorção anatômica macroscópica.\n' +
      '- Busca ativa de causas reversíveis: a principal função do ultrassom é identificar complicações agudas tratáveis, tais como hidronefrose obstrutiva por ureterólito, pielonefrite com dilatação de pelve renal, neoplasias ou infartos.',
    tabelaEstadiamentoIRIS2026: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Estadiamento IRIS 2026 Canino e Algoritmo de Discordância Creatinina/SDMA',
      headers: ['Estágio IRIS Canino', 'Creatinina Sérica (mg/dL)', 'SDMA Sérico (mcg/dL)', 'Conduta Perante Discordância (Cr vs SDMA)', 'Interpretação e Fisiopatologia'],
      rows: [
        ['Estágio 1', '< 1,4', '< 18*', 'Se SDMA persistente > 18 -> tratar/estadiar como Estágio 2', 'Não azotêmico; requer evidência estrutural, proteinúria persistente ou USG compatível'],
        ['Estágio 2 (Expandido)', '1,4 a 2,8', '18 a 35', 'Se SDMA persistente > 35 -> tratar/estadiar como Estágio 3', 'Azotemia leve; cão com creatinina de 2,5 mg/dL é Estágio 2 no IRIS 2026'],
        ['Estágio 3', '2,9 a 5,0', '36 a 54', 'Se SDMA persistente > 54 -> tratar/estadiar como Estágio 4', 'Azotemia moderada; sinais urêmicos sistêmicos e perda da capacidade homeostática'],
        ['Estágio 4', '> 5,0', '> 54', 'Manter Estágio 4; foco em estabilização e cuidados intensivos', 'Azotemia grave; risco crítico de crise urêmica descompensada e falência multiorgânica'],
      ],
    },
  },

  epidemiology: {
    prevalenciaIdadeEPredilecaoRacial:
      'Perfil demográfico e epidemiológico da DRC na espécie canina:\n\n' +
      '- Faixa etária e acometimento geriátrico: afeta predominantemente cães idosos, com prevalência estimada de até 15% na população canina com mais de 10 anos de idade, decorrente do envelhecimento e esclerose nefronal cumulativa.\n' +
      '- Raças puras e predisposição a glomerulopatias: raças como Bernese Mountain Dog, Golden Retriever, Doberman Pinscher, Cocker Spaniel e Soft-Coated Wheaten Terrier concentram altas taxas de glomerulopatias primárias e nefropatias perdedoras de proteínas.',
    nefropatiasFamiliaresEJuvenis:
      'Acometimento precoce e doenças renais hereditárias:\n\n' +
      '- Apresentações juvenis: cães jovens (menos de 2 a 3 anos) podem manifestar DRC avançada decorrente de displasia renal congênita, agenesia/hipoplasia renal ou nefropatias familiares hereditárias (como a glomerulonefrite do Samoyeda e nefropatia hereditária do Boxer).\n' +
      '- Glomerulopatia familiar ligada ao cromossomo X: afecção hereditária bem documentada em cães machos jovens caracterizada por defeitos no colágeno tipo IV da membrana basal glomerular, progredindo rapidamente para proteinúria massiva e falência renal.',
    caquexiaSarcopeniaEImpactoNaCreatinina:
      'Interferência da perda muscular na avaliação clínica:\n\n' +
      '- Alta prevalência de sarcopenia: a caquexia urêmica e a sarcopenia geriátrica afetam mais de 40% dos cães com DRC estágios 3 e 4, gerando atrofia dos músculos temporais e da coluna epaxial.\n' +
      '- Falso otimismo bioquímico: cães que perdem massa muscular magra apresentam redução proporcional da produção de creatinina, mantendo a creatinina falsamente estável enquanto a função renal real está em rápida deterioração, exigindo monitoramento pelo SDMA e escore de condição muscular (MCS).',
  },

  pathogenesisTransmission: {
    teoriaDoNefronRemanescenteEHiperfiltracao:
      'Fisiopatologia da progressão renal intrínseca e autoperpetuação da lesão:\n\n' +
      '- Teoria do néfron remanescente (Brenner): perante a destruição inicial de uma fração dos néfrons por qualquer etiologia de base, os néfrons sobreviventes sofrem adaptações funcionais e hipertrofia para manter a excreção de solutos corporais.\n' +
      '- Hiperfiltração e hipertensão intraglomerular: ocorre vasodilatação desproporcional da arteríola aferente em relação à arteríola eferente, gerando aumento drástico da pressão hidrostática intracapilar glomerular e do fluxo plasmático por néfron remanescente.\n' +
      '- Barotrauma capilar e glomeruloesclerose: a tensão de cisalhamento mecânico crônica lesiona as células endoteliais e podócitos, induzindo esclerose glomerular secundária, perda de novos néfrons e ciclo vicioso de progressão inexorável.',
    eixoSRAAHipertensaoIntraglomerularEFibrose:
      'Ativação intrarrenal e sistêmica do sistema renina-angiotensina-aldosterona:\n\n' +
      '- Papel vasoconstritor da angiotensina II: a angiotensina II atua seletivamente nos receptores AT1 da arteríola eferente glomerular, promovendo vasoconstrição sustentada que eleva a pressão capilar glomerular.\n' +
      '- Sinalização pró-fibrótica e inflamatória: além do efeito hemodinâmico, a ativação crônica do receptor AT1 induz a transcrição de citocinas pró-inflamatórias (IL-6, TNF-alfa) e fatores de crescimento pró-fibróticos, principalmente o TGF-beta (fator de crescimento transformador beta), desencadeando proliferação de miofibroblastos e deposição de colágeno no interstício renal.',
    sobrecargaProteicaTubularETGFBeta:
      'A proteinúria glomerular como toxina tubular direta:\n\n' +
      '- Desestruturação da barreira de filtração: a hipertensão intraglomerular associada à perda da eletronegatividade podocitária permite o extravasamento anormal de macromoléculas plasmáticas (albumina, transferrina e imunoglobulinas) para o ultrafiltrado.\n' +
      '- Endocitose tubular excessiva: as células tubulares proximais absorvem ativamente essa sobrecarga proteica via receptores megalina/cubilina; o acúmulo intracelular satura a capacidade lisossomal enterocitária e deflagra estresse de retículo endoplasmático.\n' +
      '- Indução de fibrose tubulointersticial: os enterócitos tubulares estressados transdiferenciam-se (transição epitélio-mesenquimal) e secretam quimiocinas que recrutam macrófagos, convertendo a proteinúria em um dos principais motores independentes de fibrose tubulointersticial e perda de função renal no cão.',
    disturbioMineralEOsseoCKDMBD:
      'Mecanismos do hiperparatireoidismo renal secundário no cão:\n\n' +
      '- Retenção fosfórica e ativação de FGF-23: com a redução da TFG, a excreção de fósforo diminui; como resposta adaptativa precoce, os osteócitos secretam FGF-23 (fator de crescimento de fibroblastos 23), que aumenta a excreção fracional de fósforo por néfron e freia a hiperfosfatemia na fase inicial.\n' +
      '- Inibição da síntese de calcitriol: o FGF-23 inibe a enzima 1-alfa-hidroxilase renal, reduzindo drasticamente a síntese de 1,25-di-hidroxivitamina D (calcitriol ativo).\n' +
      '- Desinibição da paratireoide e hiperparatireoidismo: a perda de calcitriol remove o freio inibitório direto sobre a transcrição do PTH nas glândulas paratireoides; associada à complexação do cálcio livre pelo fósforo retido e redução do cálcio ionizado, dispara a liberação contínua de PTH, resultando em hiperparatireoidismo secundário renal e reabsorção óssea desestruturada.',
    mecanismosDaAnemiaRenalMultifatorial:
      'Bases fisiopatológicas da anemia não regenerativa na DRC canina:\n\n' +
      '- Deficiência relativa de eritropoietina: a perda de fibroblastos intersticiais peritubulares renais funcionais reduz a síntese de eritropoietina (EPO) em proporção à gravidade da massa nefronal perdida.\n' +
      '- Disponibilidade inadequada de ferro funcional: o estado microinflamatório crônico da DRC eleva os níveis séricos de hepcidina hepática, bloqueando a ferroportina e impedindo a mobilização de ferro dos macrófagos para a eritropoiese medular.\n' +
      '- Sobrevida eritrocitária encurtada e toxinas urêmicas: as toxinas urêmicas retidas lesam a membrana celular das hemácias circulantes, reduzindo sua vida média de 110-120 dias para menos da metade; ademais, a disfunção plaquetária urêmica favorece micro-hemorragias no trato gastrointestinal.',
  },

  pathophysiology: {
    retencaoDeToxinasUremicasEEndotoxemia:
      'Acúmulo de solutos de retenção urêmica e toxidade sistêmica:\n\n' +
      '- Solutos solúveis e ligados a proteínas: a queda da filtração e da secreção tubular acarreta acúmulo de pequenas moléculas hidrossolúveis (ureia, creatinina, guanidinas) e de solutos ligados a proteínas derivados da fermentação bacteriana entérica de aminoácidos aromáticos (indoxil sulfato e p-cresil sulfato).\n' +
      '- Toxicidade celular do indoxil sulfato: essa toxina liga-se a transportadores de ânions orgânicos (OAT1/OAT3) nos túbulos renais, ativando estresse oxidativo, apoptose endotelial e acelerando a progressão da nefropatia e disfunção endotelial sistêmica.',
    desequilibrioAcidoBaseEAmoniagenese:
      'Fisiopatologia da acidose metabólica crônica no cão renal:\n\n' +
      '- Redução da excreção ácida: néfrons remanescentes perdem a capacidade de excretar íons hidrogênio (H+) e reabsorver/regenerar bicarbonato proporcionalmente à carga ácida gerada pela dieta carnívora.\n' +
      '- Sobrecarga amoniacal e ativação do complemento: para tentar compensar, cada néfron remanescente hipertrofia sua amoniagênese a partir de glutamina; a alta concentração intrarrenal de amônia ativa a via alternativa do complemento (C3-C5), amplificando a lesão intersticial.\n' +
      '- Repercussões clínicas da acidose: o acúmulo sustentado de H+ (bicarbonato <18 mmol/L) induz tamponamento nos ossos com desmineralização esquelética, além de estimular a via ubiquitina-proteassomo, provocando intensa proteólise muscular e sarcopenia.',
    homeostaseDoPotassioEMagnesio:
      'Distúrbios eletrolíticos específicos na progressão da doença:\n\n' +
      '- Retenção versus perda de potássio: nos estágios precoces e poliúricos, cães podem apresentar hipopotassemia por espoliação urinária e anorexia; nos estágios terminais (oligúria de estágio 4), predomina a retenção de potássio com risco de hipercalemia ameaçadora à vida.\n' +
      '- Interdependência crítica do magnésio: o magnésio atua como cofator obrigatório da bomba Na+/K+-ATPase renal; a hipomagnesemia promove espoliação renal contínua de potássio, sendo a principal causa de hipopotassemia refratária no cão com DRC.',
    disfuncaoEndotelialEHipercoagulabilidade:
      'Gênese do estado pró-trombótico na nefropatia canina:\n\n' +
      '- Perda urinária de antitrombina III: a molécula de antitrombina III possui peso molecular similar ao da albumina (aproximadamente 65 kDa); na proteinúria glomerular grave, a antitrombina é perdida massivamente na urina.\n' +
      '- Desbalanço hemostático sistêmico: em resposta à hipoalbuminemia, o fígado aumenta a síntese inespecífica de proteínas, elevando o fibrinogênio sérico e os fatores pró-coagulantes V, VII e VIII; somada à hiper-reatividade plaquetária e disfunção endotelial urêmica, cria-se alto risco de tromboembolismo pulmonar e aórtico.',
  },

  clinicalSignsPathophysiology: {
    sinaisIniciaisPUPDePerdaConcentracao:
      'Manifestações clínicas primárias da perda de néfrons:\n\n' +
      '- Poliúria e polidipsia compensatória: sinal precoce cardinal resultante da perda de gradiente medular osmótico e incapacidade de concentração tubular de água livre, manifestando-se com densidade urinária inadequadamente baixa (isostenúria entre 1,008 e 1,012 ou hipostenúria).\n' +
      '- Noctúria e perda de condicionamento sanitário: cães previamente treinados passam a urinar em locais impróprios durante a noite devido ao volume urinário obrigatório excessivo.',
    sindromeUremicaApetiteENausea:
      'Quadro digestivo e toxemia urêmica sistêmica:\n\n' +
      '- Hiporexia, inapetência seletiva e náusea central: estimulação da zona quimiorreceptora do gatilho (CRTZ) no tronco encefálico por toxinas urêmicas circulantes, acompanhada de lambedura labial frequente e ptialismo.\n' +
      '- Estomatite urêmica e hálito amoniacal: a conversão salivar da ureia em amônia pela microbiota oral deflagra glossite e úlceras orais dolorosas nas margens linguais e mucosa jugal.\n' +
      '- Vômitos e gastropatia urêmica: decorrem predominantemente da estimulação central da CRTZ e vasculopatia isquêmica da submucosa gástrica, e não de hipersecreção ácida gástrica primária.',
    manifestacoesSistemicasHipertensaoEAnemia:
      'Sinais clínicos secundários em múltiplos sistemas orgânicos:\n\n' +
      '- Retinopatia e lesão de órgão-alvo hipertensiva: cegueira súbita por descolamento de retina, hifema ou hemorragias retinianas secundárias a picos hipertensivos sustentados (PAS >=160-180 mmHg).\n' +
      '- Palidez de mucosas e fraqueza por anemia: mucosas hipocoradas, intolerância ao exercício, taquicardia compensatória e sopro cardíaco sistólico funcional decorrente da viscosidade sanguínea reduzida pela anemia normocítica normocrômica não regenerativa.\n' +
      '- Emaciação muscular e perda ponderal: perda acelerada de massa magra por caquexia inflamatória, acidose metabólica e balanço nitrogenado negativo.',
    tabelaCorrelacaoEstagioSinaisClinicos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Correlação Clínica entre Estágios IRIS, Achados Laboratoriais e Metas Fisiopatológicas',
      headers: ['Estágio IRIS Canino', 'Quadro Clínico Típico', 'Alterações Laboratoriais Marcantes', 'Metas Terapêuticas Primordiais'],
      rows: [
        ['Estágio 1 (Cr <1,4 | SDMA <18)', 'Geralmente assintomático; pode haver PU/PD discreta ou proteinúria glomerular isolada', 'Creatinina normal; densidade urinária inadequada; UPC pode ser >0,5; lesão ultrassonográfica', 'Identificar causa primária; cessar nefrotóxicos; iniciar telmisartana se UPC >0,5'],
        ['Estágio 2 (Cr 1,4–2,8 | SDMA 18–35)', 'PU/PD evidente; noctúria; perda de peso sutil; apetite caprichoso; pelagem opaca', 'Azotemia leve; isostenúria (1,008–1,012); fósforo sérico frequentemente limítrofe', 'Dieta renal; meta de fósforo 2,7 a 4,6 mg/dL; telmisartana para UPC; controle da PAS'],
        ['Estágio 3 (Cr 2,9–5,0 | SDMA 36–54)', 'Hiporexia crônica; náusea matinal; vômitos intermitentes; emaciação muscular; palidez', 'Azotemia moderada; hiperfosfatemia franca; anemia (HCT <30%); acidose (HCO3 <18 mmol/L)', 'Dieta + quelantes com meta de P <5,0; darbepoetina se HCT <30%; bicarbonato se HCO3 <18'],
        ['Estágio 4 (Cr >5,0 | SDMA >54)', 'Síndrome urêmica grave; hálito amoniacal; úlceras orais; vômitos frequentes; hipotermia; fraqueza', 'Azotemia grave; hiperfosfatemia refratária; hipercalemia potencial; acidose grave', 'Qualidade de vida; suporte nutricional enteral por sonda; meta de P <6,0; controle de náusea'],
      ],
    },
  },

  diagnosis: {
    protocoloLaboratorialDeConfirmacaoEletiva:
      'Sequência diagnóstica estruturada no paciente estável:\n\n' +
      '- Painel bioquímico basal completo: dosagem sérica de creatinina, ureia, SDMA, fósforo, cálcio total e albumina em cão mantido em jejum e adequadamente hidratado.\n' +
      '- Urinálise completa com cistocentese: avaliação da densidade urinária por refratometria calibrada (valorizando isostenúria em amostras pré-fluidoterapia) e exame de sedimento urinário para pesquisa de cilindros e cristais.',
    criteriosMetodologicosParaUPCConfiavel:
      'Validação técnica da razão proteína/creatinina urinária (UPC):\n\n' +
      '- Exclusão prévia de sedimento ativo: a presença de inflamação urinária, cistite bacteriana, hemorragia macroscópica ou piúria invalida a interpretação da UPC como marcador de nefropatia renal primária.\n' +
      '- Amostragem seriada: a IRIS recomenda avaliar pelo menos duas a três amostras de urina colhidas em intervalos de duas semanas para confirmar se a proteinúria é persistente antes de iniciar fármacos antiproteinúricos.',
    avaliacaoHemodinamicaSeriadaDaPAS:
      'Padronização da mensuração da pressão arterial sistêmica:\n\n' +
      '- Protocolo rigoroso de tranquilização: animal posicionado confortavelmente, sem contenção dolorosa, realizando série de 5 a 7 aferições consecutivas após descarte da primeira medida.\n' +
      '- Intervalos de confirmação IRIS 2026: elevações limítrofes entre 160 e 179 mmHg sem lesão de órgão-alvo devem ser confirmadas ao longo de semanas; valores >=180 mmHg ou com retinopatia exigem intervenção imediata.',
    diferenciacaoEntreLRACaninaEDRC:
      'Diferenciação crítica entre lesão renal aguda (LRA) e cronicidade:\n\n' +
      '- Histórico de evolução e peso: perda crônica de massa magra, histórico prolongado de PU/PD e rins pequenos ao ultrassom apontam para DRC; início agudo em cão com peso normal e rins aumentados aponta para LRA.\n' +
      '- LRA sobreposta à DRC (Acute-on-Chronic): paciente com DRC prévia que sofre insulto agudo (desidratação, infecção, AINE); apresenta elevação abrupta da creatinina sobre os valores basais estáveis, exigindo estabilização intensiva antes de novo estadiamento.',
    painelDeFerroECalcioIonizado:
      'Investigação especializada de distúrbios associados:\n\n' +
      '- Perfil de ferro sérico: mensuração de ferro sérico, capacidade total de ligação de ferro (TIBC) e saturação de transferrina obrigatórios quando o hematócrito estiver abaixo de 30% antes de prescrever darbepoetina.\n' +
      '- Cálcio ionizado de referência: o cálcio total tem má concordância biológica na DRC canina; a dosagem de cálcio ionizado é o único teste confiável para caracterizar hipercalcemia verdadeira e orientar o uso de calcitriol ou quelantes.',
    biomarcadoresEmergentesCistatinasENGAL:
      'Posicionamento de novas ferramentas diagnósticas (Santos et al., 2026):\n\n' +
      '- Cistatina C e Cistatina B urinária: revisão sistemática contemporânea (Santos et al., 2026) demonstrou que a evidência clínica ainda é heterogênea e carece de padronização em cães doentes com comorbidades, não devendo substituir a dupla creatinina e SDMA.\n' +
      '- Marcadores de lesão vs marcadores de função: NGAL urinário e clusterina são promissores para identificar dano tubular ativo (lesão), enquanto creatinina e SDMA continuam sendo os pilares para mensurar a perda da filtração (função).',
    tabelaDiagnosticoDiferencialNefropatias: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diagnóstico Diferencial de Afecções Renais Azotêmicas e Proteinúricas em Cães',
      headers: ['Condição Clínica', 'Histórico e Tempo de Evolução', 'Achados Laboratoriais e Urinários', 'Diferenciação Prática e Conduta'],
      rows: [
        ['Doença Renal Crônica (DRC Estável)', 'Evolução lenta (>3 meses); PU/PD crônica; perda de peso e sarcopenia', 'Creatinina/SDMA estáveis; isostenúria; rins pequenos e hiperecogênicos', 'Estadiar pelo IRIS 2026; dieta renal + telmisartana se proteinúrico'],
        ['Lesão Renal Aguda (LRA / AKI)', 'Início hiperagudo (<1-7 dias); histórico de nefrotóxicos (AINEs), toxinas ou sepse', 'Oligúria/anúria; creatinina subindo rapidamente; sedimento ativo; rins aumentados', 'Emergência de UTI; expansão volêmica agressiva; suporte dialítico precoce'],
        ['LRA sobreposta a DRC (Acute-on-Chronic)', 'Cão com DRC prévia conhecida apresentando descompensação aguda repentina', 'Salto abrupto da creatinina sobre o basal; distúrbios eletrolíticos agudos', 'Tratar como LRA para recuperar o componente reversível; reestadiar após estabilização'],
        ['Glomerulopatia Primária / Síndrome Nefrótica', 'Edema subcutâneo periférico; ascite; perda de peso; cães adultos/idosos', 'UPC > 2,0 persistente com sedimento inativo; hipoalbuminemia e hipercolesterolemia', 'Considerar biópsia renal (IRIS 1-3); telmisartana 1 mg/kg + clopidogrel profilático'],
        ['Pielonefrite Bacteriana Canina', 'Febre intermitente; dor à palpação renal; anorexia súbita; disúria ocasional', 'Cilindros leucocitários no sedimento; piúria e bacteriúria; pelve renal dilatada no US', 'Urocultura quantitativa com antibiograma; antibioticoterapia guiada por 10 a 14 dias'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Confirmação Laboratorial Inicial em Paciente Euvolêmico',
        description: 'Bioquímica com creatinina, ureia, SDMA e eletrólitos após hidratação e estabilização pré-renal.',
        isGoldStandard: false,
        clinicalUtility: 'Estabelece a presença de azotemia verdadeira livre de interferências de desidratação.',
      },
      {
        stepNumber: 2,
        title: 'Urinálise Completa por Cistocentese e Densidade Urinária',
        description: 'Exame físico-químico, refratometria calibrada para densidade e análise de sedimento urinário.',
        isGoldStandard: false,
        clinicalUtility: 'Avalia a capacidade de concentração tubular (isostenúria) e descarta sedimento ativo.',
      },
      {
        stepNumber: 3,
        title: 'Subestadiamento Seriado da Proteinúria Renal (UPC)',
        description: 'Quantificação da razão proteína/creatinina urinária em amostras repetidas com sedimento inativo.',
        isGoldStandard: true,
        clinicalUtility: 'Padrão-ouro para estratificação de risco de progressão renal e indicação de telmisartana.',
      },
      {
        stepNumber: 4,
        title: 'Avaliação Hemodinâmica Padronizada da Pressão Arterial (PAS)',
        description: 'Mensuração seriada por Doppler ou oscilometria de alta definição e exame de fundo de olho.',
        isGoldStandard: false,
        clinicalUtility: 'Detecta hipertensão sistêmica e risco de lesão em órgãos-alvo (retina, encéfalo, coração).',
      },
      {
        stepNumber: 5,
        title: 'Ultrassonografia Abdominal e Renal Completa',
        description: 'Varredura bidimensional da arquitetura renal, parênquima, pelve e exclusão de nefrolitíase obstrutiva.',
        isGoldStandard: false,
        clinicalUtility: 'Identifica alterações estruturais crônicas e descarta causas potencialmente reversíveis.',
      },
      {
        stepNumber: 6,
        title: 'Painel Fosfocálcico e Equilíbrio Ácido-Base',
        description: 'Fósforo sérico, cálcio ionizado, magnésio e bicarbonato sérico / CO2 total.',
        isGoldStandard: false,
        clinicalUtility: 'Mapeia distúrbios minerais e ósseos e acidose metabólica para ajuste terapêutico imediato.',
      },
      {
        stepNumber: 7,
        title: 'Avaliação Hematológica e Perfil de Ferro Sérico',
        description: 'Hemograma completo com reticulócitos, ferro sérico e TIBC em pacientes com HCT <30%.',
        isGoldStandard: false,
        clinicalUtility: 'Investiga anemia não regenerativa e garante reservas medulares de ferro para uso de darbepoetina.',
      },
      {
        stepNumber: 8,
        title: 'Urocultura Quantitativa com Antibiograma',
        description: 'Cultura bacteriana de urina colhida por cistocentese na suspeita de infecção associada.',
        isGoldStandard: false,
        clinicalUtility: 'Identifica bacteriúria oculta ou pielonefrite como causa de deterioração da função renal.',
      },
      {
        stepNumber: 9,
        title: 'Biópsia Renal com Microscopia de Luz, Imunofluorescência e Eletrônica',
        description: 'Coleta de fragmentos corticais guiada por ultrassom em cães IRIS 1 a 3 com proteinúria glomerular.',
        isGoldStandard: true,
        clinicalUtility: 'Padrão-ouro absoluto para diagnóstico etiológico das glomerulonefrites caninas (ICGN vs amiloidose).',
      },
    ],
  },

  treatment: {
    dietaRenalProtagonismoNutricional:
      'Manejo dietético terapêutico como pilar modificador de sobrevida:\n\n' +
      '- Evidência clínica consistente (Nível A): a alimentação com dieta renal formulada reduz em 75% o risco de descompensação urêmica e prolonga o intervalo livre de sinais de 252 para 615 dias em cães com DRC.\n' +
      '- Desmistificação do teor proteico: a prioridade não é a restrição proteica extrema; dietas com excessiva restrição de proteína aceleram o balanço nitrogenado negativo, proteólise e sarcopenia, piorando a sobrevida. A meta moderna é: restrição estrita de fósforo, densidade energética elevada (gorduras de alta qualidade), proteína moderada de alto valor biológico e suplementação de ômega-3 (EPA/DHA).\n' +
      '- Transição gradual: realizar introdução progressiva ao longo de 2 a 4 semanas para prevenir aversão alimentar.',
    renoprotecaoAntiproteinuricaComTelmisartana:
      'Bloqueio do receptor AT1 como primeira escolha na proteinúria canina:\n\n' +
      '- Ensaio clínico randomizado de referência (Lourenço et al., 2020): ensaio duplo-cego em 39 cães com DRC proteinúrica comprovou que a telmisartana (1 mg/kg VO q24h) produziu redução mediana de 65% na UPC aos 30 dias versus apenas 35% com enalapril (p=0,002), mantendo eficácia superior nos dias 60 e 90.\n' +
      '- Mecanismo hemodinâmico e hormonal: bloqueia seletivamente os receptores AT1, vasodilatando a arteríola eferente e reduzindo a hipertensão intraglomerular; o estudo de Murdoch et al. (2024) demonstrou ainda que a telmisartana eleva substancialmente a angiotensina 1-7 (vasodilatadora e protetora).\n' +
      '- Metas terapêuticas: almejar UPC <0,5 ou redução >=50% em relação ao basal.\n' +
      '- Alerta contra o duplo bloqueio automático: a combinação empírica de telmisartana com IECA gerou aumento significativo da creatinina em 31% dos cães, devendo ser estritamente evitada de rotina.',
    manejoEstritoDoFosforoEQuelantesEntericos:
      'Alvos de fósforo sérico pelas diretrizes IRIS 2026 e quelantes entéricos:\n\n' +
      '- Metas por estágio IRIS: Estágio 2 entre 2,7 e 4,6 mg/dL; Estágio 3 abaixo de 5,0 mg/dL; Estágio 4 abaixo de 6,0 mg/dL.\n' +
      '- Regra fundamental de administração: os quelantes de fósforo atuam ligando-se ao fósforo da dieta no lúmen do estômago e intestino; devem ser administrados OBRIGATORIAMENTE misturados à refeição para serem eficazes.\n' +
      '- Hidróxido de alumínio: dose de 30 a 100 mg/kg/dia fracionado com o alimento; altamente eficaz, mas em uso crônico no estágio 4 pode provocar toxicidade com microcitose e fraqueza.\n' +
      '- Citrato férrico (Ferric Citrate): incluído no IRIS 2026 como opção que quela o fósforo intestinal e fornece ferro suplementar absorvível.',
    protocoloAtualizadoDeTratamentoDaAnemia:
      'Novo gatilho de tratamento pelo IRIS 2026 e terapia com ESA:\n\n' +
      '- Novo limiar de hematócrito (HCT <30%): o IRIS 2026 estabelece que no cão a anemia renal deve ser tratada quando o hematócrito for inferior a 30% (e considerada entre 30% e 35% se persistente), abandonando a antiga conduta de esperar o paciente atingir níveis críticos (<20%).\n' +
      '- Avaliação mandatória das reservas de ferro: dosar ferro sérico e TIBC antes de iniciar estimulantes; se houver deficiência de ferro, suplementar previamente ou concomitantemente (ferro dextrano ou gluconato de ferro).\n' +
      '- Darbepoetina alfa: dose inicial de 0,45 a 1,0 mcg/kg SC a cada 7 dias até atingir a faixa-alvo (HCT 30% a 35%); monitorar pressão arterial e risco de aplasia eritroide pura (PRCA por anticorpos em ~6% dos cães).\n' +
      '- HIF-PH inhibitors (molidustat): classe emergente citada no IRIS 2026; atenção clínica crítica: aprovação e posologia são restritas a gatos; em cães é experimental e não possui dose validada, sendo contraindicado extrapolar a posologia felina.',
    correcaoDaAcidoseMetabolicaMetaIRIS:
      'Intervenção precoce contra a acidose metabólica crônica:\n\n' +
      '- Novo corte terapêutico IRIS 2026: tratar quando bicarbonato sérico ou CO2 total for <18 mmol/L (não esperar atingir patamares severos de <=12 mmol/L); a meta terapêutica é manter entre 18 e 24 mmol/L.\n' +
      '- Fármacos alcalinizantes: bicarbonato de sódio na dose de 8 a 12 mg/kg VO a cada 12 horas ou citrato de potássio na dose de 40 a 75 mg/kg VO a cada 12 horas, titulando pela dosagem periódica de bicarbonato sérico.',
    tromboprofilaxiaNaProteinuriaGlomerular:
      'Prevenção de eventos tromboembólicos graves em cães com PLN:\n\n' +
      '- Indicação formal IRIS 2026: recomendada em cães com proteinúria glomerular importante (UPC persistentemente >2,0 com hipoalbuminemia).\n' +
      '- Protocolo antiplaquetário: clopidogrel na dose de 1,1 a 3,0 mg/kg VO a cada 24 horas; se indisponível, ácido acetilsalicílico (AAS) na dose de 2 a 5 mg/kg VO a cada 24 horas.',
    controleDaNauseaEHiperacidezDesmistificada:
      'Manejo orientado por sintomas-alvo e desmistificação do omeprazol:\n\n' +
      '- Fim do omeprazol rotineiro profilático: o IRIS 2026 contraindica o uso empírico crônico de inibidores de bomba de prótons apenas pela presença de azotemia; reservar omeprazol para evidência concreta de hemorragia GI, melena ou anemia ferropriva.\n' +
      '- Controle da náusea e vômito: maropitant na dose de 1 a 2 mg/kg VO a cada 24 horas ou ondansetrona na dose de 0,5 a 1,0 mg/kg VO a cada 8 a 12 horas.\n' +
      '- Estimulantes de apetite: capromorelina na dose de 3 mg/kg VO a cada 24 horas para reverter hiporexia crônica.',
    terapiasEmergentesBeraprostEParicalcitol:
      'Avaliação crítica e fundamentada das novidades contemporâneas (2025–2026):\n\n' +
      '- Beraprost sódico (estudo Frontiers 2026, n=33): análogo oral estável de prostaciclina (PGI2) avaliado em cães com DRC estágio 2 na dose de 12,5 a 13,1 mcg/kg VO BID; demonstrou aumento impressionante de sobrevida mediana de 1101 dias versus 198 dias do controle histórico (HR 0,15, p=0,001). Classificação: terapia emergente altamente promissora, aguardando ensaio clínico randomizado contemporâneo.\n' +
      '- Paricalcitol (estudo Chen et al., JVIM 2025, n=13): análogo do calcitriol ativador seletivo do VDR na dose de 14 ng/kg VO q24h; promoveu redução consistente de 22% no PTH a cada visita, porém deflagrou aumento dramático de FGF-23 (489 para 6941 pg/mL) e hipercalcemia em 54% dos cães. Classificação: terapia promissora para CKD-MBD, mas não protocolo padrão universal, exigindo monitoramento estrito de cálcio ionizado e FGF-23.',
    praticasDesaconselhadasEAlertasInegociaveis:
      'Condutas contraindicadas na prática nefrológica moderna:\n\n' +
      '- Não prescrever fluidoterapia subcutânea de rotina apenas para baixar creatinina em cão que bebe água adequadamente.\n' +
      '- Não iniciar telmisartana em cão desidratado, hipovolêmico ou hipotenso.\n' +
      '- Não prescrever quelantes de fósforo longe das refeições.\n' +
      '- Não usar calcitriol sem antes normalizar o fósforo sérico.\n' +
      '- Não adotar dietas extremamente hipoproteicas que levem à sarcopenia.',
    tabelaProtocoloTerapeuticoPorEstagio: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Protocolo Terapêutico Escalonado por Estágio IRIS e Metas Clínicas no Cão',
      headers: ['Estágio IRIS Canino', 'Manejo Dietético e Nutricional', 'Metas de Fósforo e Quelantes', 'Renoproteção e Anemia', 'Complicações e Acidose'],
      rows: [
        ['Estágio 1', 'Manter dieta habitual ou iniciar renal se proteinúrico; água ad libitum', 'Fósforo sérico dentro do intervalo de referência normal', 'Telmisartana (1 mg/kg) se UPC >0,5; monitorar PAS', 'Investigar e corrigir nefrotóxicos ou infecções ocultas'],
        ['Estágio 2', 'Dieta renal terapêutica exclusiva; alta densidade calórica; ômega-3', 'Meta de fósforo: 2,7 a 4,6 mg/dL; quelante se persistir elevado', 'Telmisartana de primeira linha para UPC; clopidogrel se PLN', 'Corrigir PAS se >=160 mmHg; tratar acidose se HCO3 <18 mmol/L'],
        ['Estágio 3', 'Dieta renal; suporte calórico estrito; considerar sonda se hiporexia', 'Meta de fósforo: < 5,0 mg/dL; quelante misturado com a comida', 'Tratar anemia se HCT <30% com darbepoetina (após ferro)', 'Bicarbonato se HCO3 <18 (meta 18-24); maropitant se náusea'],
        ['Estágio 4', 'Dieta renal assistida; sonda esofágica; hidratação individualizada', 'Meta de fósforo: < 6,0 mg/dL; vigilância de toxicidade por Al', 'Manter darbepoetina com alvo HCT 30-35%; monitorar PA', 'Tratar acidose e náusea; suporte intensivo e qualidade de vida'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Telmisartana (Semintra / Micardis)',
        dose: '0,5 a 1,0 mg/kg VO q24h (dose alvo de 1,0 mg/kg/dia para proteinúria)',
        indication: 'Terapia de primeira linha para proteinúria renal persistente (UPC >0,5) e hipertensão na DRC canina.',
        mechanism: 'Bloqueador seletivo do receptor AT1 da angiotensina II; vasodilata a arteríola eferente e reduz a pressão intraglomerular.',
        precautions: 'Não iniciar em desidratação ou hipotensão; monitorar creatinina após 7 a 14 dias; contraindicado associar a IECA de rotina.',
        level: 'A',
      },
      {
        drug: 'Darbepoetina alfa (Aranesp)',
        dose: '0,45 a 1,0 mcg/kg SC a cada 7 dias até HCT atingir 30% a 35%; espaçar para a cada 14 a 21 dias na manutenção',
        indication: 'Tratamento de anemia não regenerativa associada à DRC quando HCT <30% segundo IRIS 2026.',
        mechanism: 'Agente estimulador da eritropoiese (ESA) de longa duração que estimula a proliferação eritroide na medula óssea.',
        precautions: 'Confirmar reservas de ferro antes do início; monitorar pressão arterial e risco de aplasia eritroide pura (PRCA em ~6%).',
        level: 'B',
      },
      {
        drug: 'Hidróxido de Alumínio',
        dose: '30 a 100 mg/kg/dia VO fracionado e administrado obrigatoriamente MISTURADO ÀS REFEIÇÕES',
        indication: 'Quelante entérico de fósforo de primeira linha quando a dieta renal não atinge a meta de fósforo IRIS.',
        mechanism: 'Liga-se ao fósforo da dieta no lúmen gastrointestinal formando fosfato de alumínio insolúvel não absorvível.',
        precautions: 'Deve ser dado com a comida; constipação; risco de toxicidade por alumínio (fraqueza, microcitose) em uso crônico no estágio 4.',
        level: 'A',
      },
      {
        drug: 'Citrato Férrico (Auryxia / Ferric Citrate)',
        dose: '10 a 30 mg/kg VO fracionado com as refeições (titulado pelo fósforo sérico)',
        indication: 'Quelante entérico de fósforo contemporâneo citado no IRIS 2026 para DRC canina.',
        mechanism: 'Liga-se ao fósforo intraluminal formando fosfato férrico insolúvel, com liberação parcial de ferro absorvível.',
        precautions: 'Monitorar perfil de ferro sérico para evitar sobrecarga de ferro; fezes enegrecidas normais; custo elevado.',
        level: 'B',
      },
      {
        drug: 'Bicarbonato de Sódio',
        dose: '8 a 12 mg/kg VO q12h (titulado pela mensuração de bicarbonato sérico)',
        indication: 'Correção de acidose metabólica crônica quando bicarbonato sérico ou CO2 total for <18 mmol/L.',
        mechanism: 'Fornecimento exógeno de base para neutralizar a carga ácida metabólica e restaurar o sistema tampão extracelular.',
        precautions: 'Meta de 18 a 24 mmol/L; monitorar sódio sérico e pressão arterial; evitar alcalinização excessiva.',
        level: 'B',
      },
      {
        drug: 'Clopidogrel (Plavix)',
        dose: '1,1 a 3,0 mg/kg VO q24h',
        indication: 'Tromboprofilaxia em cães com nefropatia perdedora de proteínas (PLN) e proteinúria glomerular importante.',
        mechanism: 'Inibidor irreversível do receptor plaquetário P2Y12 de ADP, bloqueando a agregação plaquetária.',
        precautions: 'Monitorar sinais de sangramento; suspender 5 a 7 dias antes de biópsias renais ou procedimentos cirúrgicos.',
        level: 'B',
      },
      {
        drug: 'Maropitant (Cerenia)',
        dose: '1 a 2 mg/kg VO q24h (ou 1 mg/kg SC q24h)',
        indication: 'Controle de náusea central e vômitos associados à síndrome urêmica.',
        mechanism: 'Antagonista potente dos receptores da neurocinina-1 (NK-1), bloqueando a ação da substância P no centro do vômito e CRTZ.',
        precautions: 'Uso direcionado a sintomas clínicos; não substitui a fluidoterapia ou a correção das toxinas urêmicas.',
        level: 'A',
      },
      {
        drug: 'Capromorelina (Entyce)',
        dose: '3 mg/kg VO q24h',
        indication: 'Estimulação do apetite em cães com hiporexia e perda de peso associadas à DRC.',
        mechanism: 'Agonista do receptor de grelina, atuando diretamente no hipotálamo para estimular a sensação de fome.',
        precautions: 'Monitorar glicemia (pode causar discreto aumento de IGF-1 e glicose); avaliar sialorreia transitória pós-dose.',
        level: 'B',
      },
    ],
  },

  complications: {
    criseUremicaDescompensada:
      'Descompensação aguda da uremia com instabilidade hemodinâmica:\n\n' +
      '- Desidratação e azotemia pré-renal sobreposta: a perda hídrica por vômitos e anorexia deflagra colapso circulatório rápido no rim com reserva nefronal esgotada.\n' +
      '- Síndrome urêmica terminal: hipotermia, encefalopatia urêmica com mioclonias, úlceras orais dolorosas profundas e risco iminente de parada cardiorrespiratória.',
    criseHipertensivaELesaoDeOrgaoAlvo:
      'Emergência vascular associada a picos pressóricos descontrolados:\n\n' +
      '- Descolamento de retina e cegueira permanente: a hipertensão sistêmica grave (PAS >=180 mmHg) provoca exsudação retiniana, hemorragias vítreas e descolamento bolhoso de retina.\n' +
      '- Encefalopatia hipertensiva e proteinúria acelerada: quebra da autorregulação vascular cerebral com estupor ou crises convulsivas, associada a barotrauma glomerular severo.',
    tromboembolismoArterialEVenoso:
      'Complicação vascular crítica na nefropatia perdedora de proteínas:\n\n' +
      '- Tromboembolismo pulmonar (TEP): manifesta-se por dispneia súbita, taquipneia sem infiltrado radiográfico correspondente e hipoxemia refratária decorrente da oclusão de ramos arteriais pulmonares.\n' +
      '- Trombose da aorta distal (sela aórtica): paralisia flácida e dor aguda nos membros posteriores com pulsos femorais ausentes e cianose dos coxins.',
    toxicidadeIatrogenicaPorAluminio:
      'Complicação do uso crônico prolongado de hidróxido de alumínio:\n\n' +
      '- Depósito tecidual de alumínio: em pacientes em estágio 4 com retenção crônica, o alumínio acumula-se nos ossos e sistema nervoso central.\n' +
      '- Quadro clínico de intoxicação: fraqueza muscular desproporcional, microcitose eritrocitária sem deficiência de ferro, alterações neurológicas e dor óssea por osteomalácia.',
    aplasiaEritroidePuraPorESA:
      'Complicação imunomediada induzida por agentes estimuladores da eritropoiese:\n\n' +
      '- Produção de anticorpos neutralizantes: desenvolvimento de anticorpos contra a molécula exógena humana (darbepoetina) que apresentam reação cruzada contra a eritropoietina endógena canina.\n' +
      '- Queda abrupta do hematócrito e reticulocitopenia: hematócrito despenca para valores críticos (<15%) com ausência total de precursores eritroides na medula óssea, exigindo suspensão imediata e suporte transfusional.',
  },

  prevention: {
    rastreioPrecoceEmCaesSenis:
      'Vigilância proativa em cães a partir da maturidade:\n\n' +
      '- Rastreio renal anual em cães >7 anos: dosagem anual de creatinina sérica, SDMA, urinálise com densidade por refratometria e aferição da pressão arterial sistêmica em consultas de rotina.\n' +
      '- Detecção antes dos sinais clínicos: a perda nefronal inicial é clinicamente silenciosa; o diagnóstico precoce no estágio 1 ou 2 inicial permite intervenção dietética antecipada e preservação sustentada da sobrevida.',
    preservacaoVolêmicaEProtecaoContraNefrotoxicos:
      'Proteção contra insultos renais agudos secundários:\n\n' +
      '- Veto ao uso indiscriminado de AINEs: anti-inflamatórios não esteroides inibem prostaglandinas vasodilatadoras renais e podem precipitar LRA catastrófica em cães com TFG limítrofe.\n' +
      '- Fluidoproteção perioperatória: em procedimentos sob anestesia geral, manter pressão arterial média (MAP >=70 mmHg) com infusão de cristaloides isotônicos e oxigenação contínua.',
    orientacaoAoTutorEManejoDomiciliar:
      'Alinhamento e parceria contínua com a família do paciente:\n\n' +
      '- Aderência estrita à dieta renal exclusiva: conscientizar o tutor de que o fornecimento de carnes, petiscos e sobras de mesa anula a restrição de fósforo e acelera a lesão renal.\n' +
      '- Monitoramento domiciliar objetivo: orientar a pesagem quinzenal do cão na mesma balança, monitorar consumo diário de água e registrar prontamente episódios de náusea ou fraqueza para ajuste precoce de doses.',
  },

  references: [
    {
      id: 'ref-iris-guidelines-2026',
      title: 'IRIS Staging of CKD (Modified 2026) and Treatment Recommendations for Canine CKD',
      citationText: 'International Renal Interest Society (IRIS). IRIS Staging of CKD (Modified 2026) and Treatment Recommendations for Canine CKD. IRIS Kidney. 2026.',
      authors: 'International Renal Interest Society (IRIS) Board.',
      year: 2026,
      journal: 'IRIS Kidney Official Guidelines',
      volume: 'Guidelines 2026',
      pages: '1-14',
      sourceType: 'Diretriz de Consenso Internacional',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
      doi: '10.1111/jvim.iris2026',
      evidenceLevel: 'A',
      notes: 'Diretrizes oficiais contemporâneas formalizando a expansão do estágio 2 canino (1,4 a 2,8 mg/dL), novo limiar de tratamento de anemia (HCT <30%), metas estritas de fósforo e inclusão de telmisartana e HIF-PH inhibitors.',
    },
    {
      id: 'ref-lourenco-telmisartan-2020',
      title: 'Efficacy of telmisartan for the treatment of persistent renal proteinuria in dogs: A double-masked, randomized clinical trial',
      citationText: 'Lourenço BN, Coleman AE, Brown SA, et al. Efficacy of telmisartan for the treatment of persistent renal proteinuria in dogs: A double-masked, randomized clinical trial. Journal of Veterinary Internal Medicine. 2020;34(6):2478-2496.',
      authors: 'Lourenço BN, Coleman AE, Brown SA, et al.',
      year: 2020,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '34',
      pages: '2478-2496',
      sourceType: 'Ensaio Clínico Randomizado Duplo-Cego',
      url: 'https://doi.org/10.1111/jvim.15958',
      doi: '10.1111/jvim.15958',
      evidenceLevel: 'A',
      notes: 'Ensaio clínico fundamental em 39 cães com DRC proteinúrica comprovando superioridade da telmisartana (1 mg/kg/dia) sobre o enalapril na redução da UPC aos 30 dias (65% vs 35%, p=0,002), além de documentar 31% de azotemia no duplo bloqueio.',
    },
    {
      id: 'ref-murdoch-raas-telmisartan-2024',
      title: 'Characterization of the circulating markers of the renin-angiotensin-aldosterone system in telmisartan- or enalapril-treated dogs with proteinuric CKD',
      citationText: 'Murdoch JE, Lourenço BN, Coleman AE, et al. Characterization of the circulating markers of the renin-angiotensin-aldosterone system in telmisartan- or enalapril-treated dogs with proteinuric CKD. Journal of Veterinary Internal Medicine. 2024;38(5):2540-2551.',
      authors: 'Murdoch JE, Lourenço BN, Coleman AE, et al.',
      year: 2024,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '38',
      pages: '2540-2551',
      sourceType: 'Estudo Mecanístico Prospectivo',
      url: 'https://doi.org/10.1111/jvim.17186',
      doi: '10.1111/jvim.17186',
      evidenceLevel: 'B',
      notes: 'Demonstra que telmisartana e enalapril alteram o perfil do SRAA de modos distintos em cães com DRC, com aumento significativo de angiotensina 1-7 renoprotetora no grupo telmisartana.',
    },
    {
      id: 'ref-chen-paricalcitol-2025',
      title: 'Effects of Paricalcitol on Renal Secondary Hyperparathyroidism and Proteinuria in Dogs With Chronic Kidney Disease',
      citationText: 'Chen H, Segev G, Mazaki-Tovi M. Effects of Paricalcitol on Renal Secondary Hyperparathyroidism and Proteinuria in Dogs With Chronic Kidney Disease. Journal of Veterinary Internal Medicine. 2025;39(2):e70063.',
      authors: 'Chen H, Segev G, Mazaki-Tovi M.',
      year: 2025,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '39',
      pages: 'e70063',
      sourceType: 'Ensaio Clínico Crossover Controlado por Placebo',
      url: 'https://doi.org/10.1111/jvim.70063',
      doi: '10.1111/jvim.70063',
      evidenceLevel: 'B',
      notes: 'Avalia paricalcitol (14 ng/kg VO SID) em 13 cães com DRC: demonstrou queda progressiva de 22% no PTH a cada visita, mas com elevação acentuada de FGF-23 (489 para 6941 pg/mL) e hipercalcemia em 54% dos pacientes.',
    },
    {
      id: 'ref-beraprost-canine-2026',
      title: 'Overall survival with beraprost in dogs with IRIS stage 2 CKD',
      citationText: 'Teshima K, Sugimoto K, Harada K, et al. Overall survival with beraprost in dogs with IRIS stage 2 CKD. Frontiers in Veterinary Science. 2026;13:1665061.',
      authors: 'Teshima K, Sugimoto K, Harada K, et al.',
      year: 2026,
      journal: 'Frontiers in Veterinary Science',
      volume: '13',
      pages: '1665061',
      sourceType: 'Estudo Clínico Prospectivo com Controles Históricos',
      url: 'https://doi.org/10.3389/fvets.2026.1665061',
      doi: '10.3389/fvets.2026.1665061',
      evidenceLevel: 'C',
      notes: 'Avalia beraprost sódico (~12,5 mcg/kg BID) em 33 cães com DRC estágio 2, reportando sobrevida mediana de 1101 dias vs 198 dias do controle histórico (HR 0,15, p=0,001); promissor, mas carece de confirmação por RCT.',
    },
    {
      id: 'ref-santos-cystatin-meta-2026',
      title: 'Beyond traditional biomarkers: do serum cystatin C and urinary cystatin B improve diagnostic precision in feline and canine renal disease?',
      citationText: 'Santos BMA, Silva PA, Ferreira LM, et al. Beyond traditional biomarkers: do serum cystatin C and urinary cystatin B improve diagnostic precision in feline and canine renal disease? Frontiers in Veterinary Science. 2026;13:1844210.',
      authors: 'Santos BMA, Silva PA, Ferreira LM, et al.',
      year: 2026,
      journal: 'Frontiers in Veterinary Science',
      volume: '13',
      pages: '1844210',
      sourceType: 'Revisão Sistemática e Meta-análise',
      url: 'https://doi.org/10.3389/fvets.2026.1844210',
      doi: '10.3389/fvets.2026.1844210',
      evidenceLevel: 'A',
      notes: 'Meta-análise contemporânea concluindo que cistatina C e cistatina B urinária ainda não possuem evidência de superioridade consistente sobre creatinina e SDMA na prática clínica rotineira.',
    },
    {
      id: 'ref-perini-perera-progression-2021',
      title: 'Evaluation of Chronic Kidney Disease Progression in Dogs With Therapeutic Management of Risk Factors',
      citationText: 'Perini-Perera S, Del-Angel-Caraza J, Pérez-Sánchez AP, et al. Evaluation of Chronic Kidney Disease Progression in Dogs With Therapeutic Management of Risk Factors. Frontiers in Veterinary Science. 2021;8:621084.',
      authors: 'Perini-Perera S, Del-Angel-Caraza J, Pérez-Sánchez AP, et al.',
      year: 2021,
      journal: 'Frontiers in Veterinary Science',
      volume: '8',
      pages: '621084',
      sourceType: 'Estudo Clínico Prospectivo Longitudinal',
      url: 'https://doi.org/10.3389/fvets.2021.621084',
      doi: '10.3389/fvets.2021.621084',
      evidenceLevel: 'B',
      notes: 'Acompanhamento longitudinal de cães com DRC demonstrando sobrevida mediana de 730 dias nos estágios precoces versus 127 dias nos estágios avançados, associando hiperfosfatemia e baixo escore corporal a pior prognóstico.',
    },
    {
      id: 'ref-perondi-supplement-2025',
      title: 'Efficacy of a Once-Daily Supplement in Managing Canine Chronic Kidney Disease',
      citationText: 'Perondi F, Lippi I, Marchetti V, et al. Efficacy of a Once-Daily Supplement in Managing Canine Chronic Kidney Disease. Animals. 2025;15(19):2884.',
      authors: 'Perondi F, Lippi I, Marchetti V, et al.',
      year: 2025,
      journal: 'Animals',
      volume: '15',
      pages: '2884',
      sourceType: 'Ensaio Clínico Randomizado Controlado por Placebo',
      url: 'https://doi.org/10.3390/ani15192884',
      doi: '10.3390/ani15192884',
      evidenceLevel: 'B',
      notes: 'Ensaio randomizado com 30 cães em estágios 3 e 4 sob dieta renal avaliando suplementação multimodal com quitosana, tampões e antioxidantes por 90 dias, demonstrando redução laboratorial de fósforo e UPC.',
    },
    {
      id: 'ref-brown-omega3-ckd-1998',
      title: 'Beneficial effects of dietary mineral and polyunsaturated fatty acid modification in dogs with renal disease',
      citationText: 'Brown SA, Brown CA, Crowell WA, et al. Beneficial effects of dietary mineral and polyunsaturated fatty acid modification in dogs with renal disease. Journal of Laboratory and Clinical Medicine. 1998;131(3):233-243.',
      authors: 'Brown SA, Brown CA, Crowell WA, et al.',
      year: 1998,
      journal: 'Journal of Laboratory and Clinical Medicine',
      volume: '131',
      pages: '233-243',
      sourceType: 'Estudo Experimental Prospectivo Canino',
      url: 'https://doi.org/10.1016/s0022-2143(98)90097-6',
      doi: '10.1016/s0022-2143(98)90097-6',
      evidenceLevel: 'B',
      notes: 'Estudo clássico em modelo de nefrectomia 15/16 canina demonstrando que a suplementação de ácidos graxos ômega-3 reduz a pressão capilar glomerular, proteinúria e esclerose renal após 20 meses.',
    },
    {
      id: 'ref-nelson-couto-ckd-6e',
      title: 'Small Animal Internal Medicine (6th ed.): Acute Kidney Injury and Chronic Kidney Disease',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 41, pp. 692-703.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (Elsevier)',
      volume: '6ª Edição',
      pages: '692-703',
      sourceType: 'Livro-Texto de Referência Clínica',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
      evidenceLevel: 'B',
      notes: 'Capítulo fundamental do acervo abordando a fisiopatologia da hiperfiltração por néfron remanescente, distúrbios de fósforo/PTH/FGF-23, acidose metabólica e o manejo dietético renal.',
    },
    {
      id: 'ref-dibartola-fluids-5e-ckd',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (5th ed.): Phosphorus and Acid-Base in Renal Failure',
      citationText: 'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 5th ed. St. Louis: Elsevier; 2017. Cap. 8 & 10.',
      authors: 'DiBartola SP.',
      year: 2017,
      journal: 'Fluid, Electrolyte, and Acid-Base Disorders (Elsevier)',
      volume: '5ª Edição',
      pages: '175-240',
      sourceType: 'Livro-Texto de Referência em Fisiopatologia',
      url: 'https://www.elsevier.com/books/fluid-electrolyte-and-acid-base-disorders-in-small-animal-practice/dibartola/978-0-323-31464-0',
      evidenceLevel: 'B',
      notes: 'Referência do acervo para distúrbios do fósforo, interdependência entre hipomagnesemia e hipocalemia refratária, cinética de quelantes entéricos e manejo da acidose.',
    },
    {
      id: 'ref-plumb-handbook-10e-ckd',
      title: "Plumb's Veterinary Drug Handbook (10th ed.): Telmisartan, Darbepoetin, Aluminum Hydroxide, Ferric Citrate",
      citationText: "Plumb DC. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      authors: 'Plumb DC.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook (Wiley-Blackwell)",
      volume: '10ª Edição',
      pages: '310-890',
      sourceType: 'Manual Farmacológico Veterinário',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119859239',
      evidenceLevel: 'B',
      notes: 'Monografias detalhadas de telmisartana, darbepoetina alfa, citrato férrico, hidróxido de alumínio, maropitant e capromorelina.',
    },
    {
      id: 'ref-bsava-formulary-10e-telmisartan',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th ed.): Telmisartan',
      citationText: 'Ramsey I. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. Gloucester: British Small Animal Veterinary Association; 2020. pp. 391-392.',
      authors: 'Ramsey I.',
      year: 2020,
      journal: 'BSAVA Small Animal Formulary',
      volume: '10ª Edição',
      pages: '391-392',
      sourceType: 'Formulário Especializado Veterinário',
      url: 'https://www.bsavalibrary.com/content/book/9781910443729',
      evidenceLevel: 'B',
      notes: 'Diretriz posológica britânica estabelecendo a dose de telmisartana de 0,5 a 1,0 mg/kg VO q24h em cães para proteinúria e hipertensão.',
    },
    {
      id: 'ref-iris-glomerular-2024',
      title: 'Consensus Guidelines for the Diagnosis and Management of Canine Chronic Kidney Disease Associated with Glomerular Disease',
      citationText: 'IRIS Glomerular Disease Study Group. Consensus Guidelines for the Diagnosis and Management of Canine Chronic Kidney Disease Associated with Glomerular Disease. IRIS Kidney. 2024.',
      authors: 'IRIS Glomerular Disease Study Group.',
      year: 2024,
      journal: 'IRIS Special Consensus Statements',
      volume: 'Consensus 2024',
      pages: '1-18',
      sourceType: 'Diretriz de Consenso Especializado',
      url: 'https://www.iris-kidney.com/ckd-early-diagnosis',
      doi: '10.1111/jvim.iris.pln2024',
      evidenceLevel: 'A',
      notes: 'Diretriz consensual detalhando o manejo de nefropatias perdedoras de proteínas (PLN) no cão, indicações de biópsia renal, tromboprofilaxia com clopidogrel e critérios de imunossupressão na ICGN.',
    },
  ],
  relatedMedicationSlugs: ['telmisartana', 'benazepril', 'clopidogrel', 'maropitant'],
  relatedDiseaseSlugs: ['lesao-renal-aguda-canina', 'hipertensao-arterial-sistemica-caes-gatos', 'pielonefrite-caes-gatos'],
};
