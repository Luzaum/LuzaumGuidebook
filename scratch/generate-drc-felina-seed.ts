import * as fs from 'fs';
import * as path from 'path';

const targetPath = path.resolve('modules/consulta-vet/data/seed/diseases.doenca-renal-cronica-felina.seed.ts');

const code = `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Doença Renal Crônica em Felinos (DRC Felina) — Monografia Clínica Padrão Ouro.
 * Atualizado com base em:
 * - Diretrizes e Consensos Oficiais Internacionais:
 *   Taylor S et al. / iCatCare (2026 - iCatCare consensus guidelines on the diagnosis and management of chronic kidney disease in cats, JFMS 28(9):1098612X261466553, DOI 10.1177/1098612X261466553),
 *   International Renal Interest Society / IRIS (2026 - Guidelines on CKD Staging and Management of Anemia and Hypertension in Cats),
 * - Ensaios clínicos randomizados e estudos prospectivos contemporâneos:
 *   Ross SJ et al. (2006 - Ensaio clínico randomizado, duplo-cego de dieta renal na DRC felina, JAVMA 229:949-957),
 *   Elliott J et al. (2000 - Sobrevida na nefropatia crônica felina sob manejo dietético, JSAP 41:235-242),
 *   Syme HM et al. (2006 - Associação prognóstica da proteinúria com mortalidade em gatos com DRC, JVIM 20:528-535),
 *   Sent U et al. (2015 - Ensaio randomizado de não inferioridade com telmisartana vs benazepril na DRC felina, JVIM 29:1479-1487),
 *   Charles S et al. (2024 - Ensaio controlado de molidustat / HIF-PHI na anemia renal felina, JVIM 38:197-204),
 *   Le Corre E et al. (2026 - Estudo multicêntrico de bacteriúria subclínica e sobrevida na DRC felina, JVIM 40, DOI 10.1093/jvimsj/aalag064),
 *   Quimby JM et al. (2011 - Farmacocinética e segurança da mirtazapina na DRC felina, JFMS 13:729-735),
 *   Coleman AE et al. (2019 - Eficácia anti-hipertensiva da amlodipina em gatos com DRC, JVIM 33:1734-1743)
 * - Livros-texto do acervo:
 *   Nelson & Couto 6ª ed. (cap. 41 - Insuficiência Renal Crônica em Cães e Gatos, pp. 692-703),
 *   DiBartola (Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice 5ª ed., cap. 22 - Fluidoterapia e Distúrbios Eletrolíticos na Falência Renal, pp. 544-550),
 *   Plumb's Veterinary Drug Handbook 10ª ed. (monografias de telmisartana, amlodipina, molidustat, darbepoetina, mirtazapina, maropitant e quelantes),
 *   BSAVA Small Animal Formulary 10ª ed. (posologia de telmisartana e amlodipina na espécie felina)
 */
export const doencaRenalCronicaFelinaRecord: DiseaseRecord = {
  id: 'disease-doenca-renal-cronica-felina',
  slug: 'doenca-renal-cronica-felina',
  title: 'Doença renal crônica em felinos (DRC felina)',
  subtitle:
    'Monografia clínica padrão-ouro: diretrizes de consenso iCatCare 2026 e IRIS 2026, rastreamento geriátrico a partir de 7 anos, controle estrito de fósforo e hipercalcemia ionizada (iCa), nutrição renal e preservação de massa muscular, telmisartana (ARB) para proteinúria e hipertensão, molidustat e darbepoetina para anemia, desmistificação de fluidos SC e stewardship antimicrobiano',
  synonyms: [
    'DRC felina',
    'Doença renal crônica em gatos',
    'Insuficiência renal crônica felina',
    'Nefropatia crônica felina',
    'Feline chronic kidney disease',
    'Feline CKD',
    'Doença tubulointersticial renal felina',
  ],
  species: ['cat'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'clinica-medica',
    'nutricao-clinica',
    'farmacologia-terapeutica',
    'diagnostico-por-imagem',
  ],
  tags: [
    'DRC Felina',
    'Doença Renal Crônica',
    'iCatCare 2026',
    'IRIS 2026',
    'Fósforo e Dieta Renal',
    'Cálcio Ionizado',
    'Telmisartana',
    'Amlodipina',
    'Molidustat',
    'Darbepoetina',
    'Bacteriúria Subclínica',
    'Nelson & Couto',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['doenca-renal-cronica-felina'],

  quickSummary:
    'A doença renal crônica em gatos é uma síndrome irreversível e progressiva caracterizada por perda estrutural e funcional de néfrons com duração superior a três meses, cuja abordagem foi substancialmente redefinida pelo consenso iCatCare 2026 e IRIS 2026:\\n\\n' +
    '- Mudança de paradigma no rastreamento: recomendação de screening renal anual a partir de 7 anos e semestral acima de 10 anos, monitorando curva de peso e massa muscular anos antes da azotemia.\\n' +
    '- Foco no fósforo e cálcio ionizado (iCa): a restrição de fósforo dietético é a intervenção disease-modifying mais sólida, acompanhada de vigilância estrita de hipercalcemia iatrogênica pós-dieta renal.\\n' +
    '- Telmisartana como padrão antiproteinúrico e anti-hipertensivo: bloqueador AT1 com superioridade na comodidade e excelente controle de proteinúria (UPC >0,4).\\n' +
    '- Novas fronteiras na anemia e desmistificação de rotinas: incorporação de molidustat (HIF-PHI) ao IRIS 2026 (gatilho HCT <25%), abandono de antibióticos para bacteriúria subclínica e veto ao uso rotineiro de omeprazol e fluidoterapia SC indiscriminada.',

  quickDecisionStrip: [
    'Rastreamento regular a partir dos 7 anos (anual entre 7–10 anos; semestral acima de 10 anos) avaliando peso, MCS, PA, creatinina e urina.',
    'Estadiamento IRIS deve ser realizado exclusivamente em gatos euvolêmicos e estáveis; nunca estadiar durante desidratação ou ACKD no plantão.',
    'A restrição dietética de fósforo é a intervenção de maior impacto em sobrevida; iniciar dieta renal em estágios IRIS 2 a 4 sem sacrificar calorias.',
    'Monitorar cálcio ionizado (iCa); aproximadamente 20% já têm hipercalcemia no diagnóstico e a dieta renal pode elevar o cálcio em pacientes suscetíveis.',
    'Telmisartana (1 mg/kg q24h) é primeira escolha para proteinúria renal persistente (UPC >0,4) em gatos hidratados; vetada na desidratação.',
    'Anemia renal tratada com HCT <25% ou sintomas; molidustat (5 mg/kg q24h x 28 dias) ou darbepoetina com suplementação de ferro parenteral.',
    'Bacteriúria subclínica não exige antibiótico; estudo de 2026 comprovou ausência de impacto na sobrevida e risco de seleção bacteriana.',
    'Fluidoterapia subcutânea não deve ser automática para todo renal; priorizar hidratação enteral e monitorar risco de sobrecarga em cardiopatas.',
    'Supressores de ácido gástrico (omeprazol) reservados apenas para ulceração comprovada ou forte suspeita, não para náusea ou hiporexia rotineiras.',
  ],

  quickSummaryRich: {
    lead:
      'A abordagem moderna da doença renal crônica felina superou o empirismo de estadiar pela creatinina isolada e prescrever soro e antibiótico:\\n\\n' +
      '- Reconhecimento precoce e trajetória temporal: rastreamento ativo em idosos (>=7 anos) avaliando escore de massa muscular (MCS) e estabilidade da taxa de filtração glomerular ao longo do tempo (estável vs progressiva).\\n' +
      '- Controle mineral refinado: o fósforo é o principal nutriente modificador de sobrevida, exigindo vigilância concomitante do cálcio ionizado (iCa) para prevenir nefrocalcinose acelerada.\\n' +
      '- Farmacoterapia guiada por evidências: telmisartana para proteinúria/PA, HIF-PHI (molidustat) ou darbepoetina para anemia e proteção da microbiota com stewardship antimicrobiano rigoroso.',
    pillars: [
      {
        title: 'Pilar 1: Paradigma iCatCare 2026 e Rastreamento Precoce (>=7 Anos)',
        body:
          'Superação do diagnóstico reativo e valorização da composição corporal:\\\n\\\n' +
          '- Rastreio sistemático a partir dos 7 anos: anual entre 7–10 anos e semestral acima de 10 anos, permitindo flagrar DRC subclínica que atinge 28% a 81% dos gatos senis.\\\n' +
          '- Curva de peso e sarcopenia: a perda ponderal detectável inicia até 3 anos antes da azotemia (mediana de -8,9% no ano pré-diagnóstico); a atrofia muscular mascara a creatinina sérica.\\\n' +
          '- Desmistificação do SDMA: correlação comparável à creatinina para GFR; útil na sarcopenia, mas influenciado por hipertireoidismo e doenças não renais.',
        highlights: ['Rastreio aos 7 anos', 'Perda de peso precoce', 'Massa muscular mascara creatinina'],
      },
      {
        title: 'Pilar 2: Fisiopatologia do Néfron Remanescente, P e Hipercalcemia (iCa)',
        body:
          'Mecanismos de progressão, hiperfiltração e distúrbio mineral-ósseo:\\\n\\\n' +
          '- Ciclo de hiperfiltração e hipertensão glomerular: vasoconstrição eferente por Ang II eleva pressão intraglomerular, induzindo podocitopatia, proteinúria e esclerose.\\\n' +
          '- Fósforo sérico e mortalidade: cada aumento de 1 mg/dL de P eleva o risco de óbito em ~11,8%; FGF23 e PTH mantêm fosfatúria compensatória inicial à custa de CKD-MBD severo.\\\n' +
          '- Alerta de hipercalcemia ionizada: ~20% já apresentam iCa alto no diagnóstico e dietas hipofosfatadas podem precipitar hipercalcemia e nefrocalcinose acelerada.',
        highlights: ['Hiperfiltração glomerular', 'Meta estrita de fósforo', 'Hipercalcemia ionizada (iCa)'],
      },
      {
        title: 'Pilar 3: Estadiamento IRIS Estável, Subestadiamento e Diagnóstico',
        body:
          'Critérios rigorosos de estadiamento e diferenciação de descompensações agudas:\\\n\\\n' +
          '- Estadiar somente após euvolemia: jamais classificar gatos desidratados ou com ACKD no plantão; hidratar e reavaliar para definir o verdadeiro patamar basal.\\\n' +
          '- Subestadiamento de proteinúria (UPC): <0,2 não proteinúrico, 0,2–0,4 borderline, >0,4 proteinúrico (risco de morte quadruplicado se >0,4 conforme Syme et al.).\\\n' +
          '- Subestadiamento pressórico (PAS): alvo <140 mmHg (ou <160 mmHg); amlodipina e telmisartana previnem lesões irreversíveis em retina, encéfalo e rins.',
        highlights: ['Estadiar apenas euvolêmico', 'UPC >0,4 exige bloqueio', 'Alvo PAS <140-160 mmHg'],
      },
      {
        title: 'Pilar 4: Terapia de Precisão, Manejo Nutricional e Stewardship Antimicrobiano',
        body:
          'Intervenções baseadas em evidências sólidas e abandono de condutas empíricas:\\\n\\\n' +
          '- Protagonismo da dieta renal: ensaio randomizado de Ross et al. comprovou 0% de crises urêmicas no grupo renal vs 26% no controle; regra de ouro de fornecer >=50% das calorias como renal.\\\n' +
          '- Anemia e molidustat (HIF-PHI): nova opção oral incorporada ao IRIS 2026 para HCT <25%, estimulando eritropoiese endógena sem o risco de aplasia pura por anticorpos.\\\n' +
          '- Stewardship estrito: bacteriúria subclínica não acelera progressão nem afeta sobrevida (Le Corre et al., 2026); vetar antibióticos empíricos, soroterapia SC automática e omeprazol de rotina.',
        highlights: ['Dieta renal comprovada', 'Molidustat / HIF-PHI para anemia', 'Veto a antibióticos em bacteriúria'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Estadiamento da DRC Felina (iCatCare / IRIS 2026)',
      steps: [
        {
          label: 'Passo 1: Triagem Geriátrica e Avaliação de Composição Corporal',
          detail:
            'Screening anual (7–10 anos) ou semestral (>10 anos) avaliando peso, escore de condição corporal (BCS) e muscular (MCS). Investigar histórico de PU/PD sutil e apetite.',
          timing: 'Triagem geriátrica de rotina ou queixa de emagrecimento',
          limitations: 'A perda ponderal precede a azotemia em até 3 anos; creatinina pode permanecer no intervalo de referência se houver perda muscular severa.',
        },
        {
          label: 'Passo 2: Estabilização Volêmica e Exclusão de ACKD / Obstrução',
          detail:
            'Gatos desidratados, com choque hipovolêmico ou oligúria devem ser estabilizados com cristaloides balanceados IV e avaliados por USG para descartar obstrução ureteral ou pielonefrite.',
          timing: 'Admissão emergencial ou gato descompensado',
          reassess: 'Reavaliar creatinina após 24 a 48 horas de euvolemia antes de qualquer tentativa de estadiamento formal.',
        },
        {
          label: 'Passo 3: Estadiamento Renal Basal (Creatinina Sérica e SDMA)',
          detail:
            'Estadiar paciente estável e hidratado segundo critérios IRIS: Estágio 1 (Cr <1,6 mg/dL, SDMA <18); Estágio 2 (Cr 1,6–2,8, SDMA 18–25); Estágio 3 (Cr 2,9–5,0, SDMA 26–38); Estágio 4 (Cr >5,0, SDMA >38).',
          timing: 'Ambulatorial eletivo pós-estabilização',
          reassess: 'Confirmar em 2 a 4 semanas para documentar estabilidade temporal.',
        },
        {
          label: 'Passo 4: Urinálise Completa, Densidade (USG) e Urocultura',
          detail:
            'Avaliação de USG por refratômetro, sedimento (cilindros, leucócitos) e urocultura por cistocentese. Lembrar que gatos com DRC podem reter capacidade concentradora com USG >1,035.',
          timing: 'Diagnóstico inicial e reavaliações periódicas',
          limitations: 'Bacteriúria isolada em gato assintomático representa bacteriúria subclínica e não deve receber antibióticos.',
        },
        {
          label: 'Passo 5: Subestadiamento de Proteinúria (UPC) e Pressão Arterial (PAS)',
          detail:
            'Mensuração seriada de PAS via Doppler vascular em ambiente tranquilo (alvo <140 mmHg) e determinação de UPC em urina sem sedimento ativo (classificar em <0,2, 0,2–0,4 e >0,4).',
          timing: 'Obrigatório em todo paciente diagnosticado',
          reassess: 'Confirmar UPC em 2 amostras com intervalo de 2 semanas.',
        },
        {
          label: 'Passo 6: Perfil Mineral Avançado (Fósforo, Cálcio Ionizado e Hematócrito)',
          detail:
            'Dosagem sérica de fósforo contra as metas de estágio IRIS, mensuração de cálcio ionizado (iCa) para flagrar hipercalcemia oculta e hemograma para rastreio de anemia não regenerativa.',
          timing: 'Definição do plano terapêutico inicial',
          reassess: 'Reavaliar iCa e fósforo 4 semanas após introdução da dieta renal.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Integrado e Manejo Multimodal (iCatCare 2026)',
      steps: [
        {
          label: 'Fase 1: Transição Nutricional para Dieta Renal e Manejo do Fósforo',
          detail:
            'Introdução gradual de alimento renal (restrição de P para 80–130 mg/100 kcal) em casa ao longo de 1 a 2 semanas. Se rejeitado, manter >=50% das calorias como renal.',
          dose: 'Meta calórica de 1,2 a 1,4 x RER (RER = 70 x peso^0,75)',
          duration: 'Contínuo por toda a vida',
          reassess: 'Reavaliar fósforo sérico e cálcio ionizado em 4 a 6 semanas.',
        },
        {
          label: 'Fase 2: Adição de Quelantes Entéricos de Fósforo (se P acima da meta)',
          detail:
            'Se o fósforo sérico permanecer acima do alvo (IRIS 2: >4,5; IRIS 3: >5,0; IRIS 4: >6,0 mg/dL), adicionar quelante misturado obrigatoriamente com a refeição. Preferir hidróxido de alumínio ou sevelamer.',
          dose: 'Hidróxido de alumínio 30 a 100 mg/kg/dia dividido nas refeições; Sevelamer 30 a 50 mg/kg/dia',
          reassess: 'Dosar fósforo a cada 4 semanas até atingir o alvo.',
          limitations: 'Evitar quelantes à base de cálcio em gatos com cálcio ionizado elevado ou alto-normal.',
        },
        {
          label: 'Fase 3: Bloqueio do SRAA e Controle Antiproteinúrico com Telmisartana',
          detail:
            'Indicada para gatos com proteinúria renal persistente (UPC >0,4) que estejam estáveis e hidratados. Bloqueio seletivo AT1 reduz pressão intraglomerular e dano podocitário.',
          dose: 'Telmisartana oral 1 mg/kg VO a cada 24 horas',
          reassess: 'Checar creatinina, potássio e PA em 1–2 semanas; checar UPC em 4 semanas.',
          limitations: 'Suspender temporariamente se o gato desidratar ou desenvolver azotemia pré-renal.',
        },
        {
          label: 'Fase 4: Controle Anti-Hipertensivo Escalonado (Amlodipina e Combinações)',
          detail:
            'Para PAS persistentemente >=160 mmHg ou evidência de TOD ocular/neurológico. Besilato de amlodipina é a primeira escolha, associado a telmisartana em casos refratários.',
          dose: 'Amlodipina 0,125 a 0,25 mg/kg (ou 0,625 a 1,25 mg/gato) VO q24h; Telmisartana 2 mg/kg VO q24h (se monoterapia) ou <=1 mg/kg se associada',
          reassess: 'Aferir PAS em 7 a 14 dias; meta <140 mmHg (ou <160 mmHg sem TOD).',
        },
        {
          label: 'Fase 5: Tratamento da Anemia Renal (Molidustat ou Darbepoetina Alfa)',
          detail:
            'Indicado para hematócrito <25% ou gatos com anemia entre 25–28% clinicamente comprometidos. Molidustat (HIF-PHI oral) ou darbepoetina com suporte de ferro parenteral.',
          dose: 'Molidustat 5 mg/kg VO q24h por 28 dias (pausa de 7 dias); Darbepoetina 0,75 a 1,0 mcg/kg SC a cada 7 dias até PCV ~30%; Ferro dextrano 50 mg/gato IM a cada 3–4 semanas',
          reassess: 'Monitorar hematócrito e pressão arterial semanalmente durante a indução.',
        },
        {
          label: 'Fase 6: Controle de Náusea, Suporte Nutricional Enteral e Hidratação Racional',
          detail:
            'Abordagem multimodal de sintomas gastrointestinais e hiporexia: maropitant, ondansetrona e mirtazapina. Considerar sonda de esofagostomia precoce e hidratação enteral antes de fluidos SC.',
          dose: 'Maropitant 1 mg/kg VO/SC q24h; Ondansetrona 0,5–1 mg/kg VO q8-12h; Mirtazapina 2 mg/gato VO/transdérmica q24-48h',
          reassess: 'Monitorar aceitação alimentar, hidratação e escore corporal a cada 2–4 semanas.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualDRCFelina:
      'Conceito operacional contemporâneo segundo as diretrizes iCatCare 2026:\\\n\\\n' +
      '- Definição temporal e funcional: presença de anormalidade estrutural ou comprometimento funcional renal persistente por um período aproximado igual ou superior a três meses.\\\n' +
      '- Intervenção clínica imediata sem espera: o médico-veterinário não deve aguardar a passagem de três meses para intervir terapeuticamente quando houver evidências inequívocas de cronicidade (ex.: rins pequenos e irregulares ao ultrassom, perda de diferenciação corticomedular, azotemia persistente com histórico compatível ou proteinúria renal).\\\n' +
      '- Repetição confirmatória rápida: em pacientes recém-apresentados, a reavaliação da azotemia e urinálise em cerca de duas semanas após correção da hidratação permite firmar o diagnóstico e antecipar medidas nefroprotetoras cruciais.',
    diferenciacaoDRCVsInsuficienciaRenal:
      'Distinção fisiopatológica essencial entre doença estrutural e falência funcional:\\\n\\\n' +
      '- Doença Renal Crônica (DRC): abrange todo o espectro patológico renal de curso crônico, existindo mesmo na ausência completa de azotemia ou redução mensurável da filtração glomerular. Um felino com cistos de PKD ao ultrassom ou proteinúria renal persistente com creatinina de 1,2 mg/dL é portador de DRC (Estágio IRIS 1).\\\n' +
      '- Insuficiência Renal: termo reservado para a perda funcional substancial da taxa de filtração glomerular (geralmente perda superior a 66% a 75% dos néfrons), momento em que os mecanismos compensatórios falham em sustentar as funções excretórias, depurativas e hormonais, resultando em azotemia, retenção de solutos osmóticos, hiperfosfatemia e síndrome urêmica.',
    causasGeneticasEPolidistrofiaPKD:
      'Etiologias hereditárias e congênitas na espécie felina:\\\n\\\n' +
      '- Doença Renal Policística Felina (PKD): desordem autossômica dominante causada pela mutação no gene PKD1, com alta prevalência histórica na raça Persa e raças derivadas (Exótico, Himalaio, British Shorthair). Cistos epiteliais múltiplos aumentam progressivamente de volume, comprimindo o parênquima renal adjacente, causando isquemia focal, fibrose e perda gradual de néfrons.\\\n' +
      '- Amiloidose Renal Familiar: deposição medular ou glomerular de proteína amiloide A sérica, descrita com maior frequência em gatos Abissínios, Orientais e Siameses, frequentemente cursando com proteinúria e insuficiência medular.\\\n' +
      '- Displasia Renal e Hipoplasia Congênita: falha do desenvolvimento embrionário do metanefro, manifestando-se com azotemia precoce e rins diminutos em gatos jovens.',
    continuumAKIDRCEInjuriasAdquiridas:
      'Etiologias adquiridas e o continuum entre lesão aguda e progressão crônica:\\\n\\\n' +
      '- Nefrite Túbulo-Intersticial Crônica Idiopática: o achado histopatológico terminal mais prevalente em felinos idosos; representa um endpoint inespecífico de agressões inflamatórias, isquêmicas e imunomediadas prévias não identificadas.\\\n' +
      '- Continuum LRA-DRC (Acute-on-Chronic Kidney Disease - ACKD): episódios de injúria renal aguda (LRA isquêmica, pielonefrite subclínica, nefrotoxinas como lírios ou AINEs) que evoluem com reparo incompleto deixam fibrose residual que culmina em DRC. Inversamente, gatos com DRC estável apresentam fragilidade nefronal extrema, descompensando com insultos menores.\\\n' +
      '- Ureterolitíase Obstrutiva e Nefrolitíase: cálculos de oxalato de cálcio geram obstruções intraluminais transitórias ou completas, provocando atrofia por hidronefrose e perda silenciosa de néfrons.\\\n' +
      '- Neoplasias e Infiltrados: linfoma renal bilateral e peritonite infecciosa felina (PIF com lesão piogranulomatosa renal) representam causas infiltrativas graves.',
    tabelaEtiologiaEPredisposicoesFelinas: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Etiologias, Predisposições Genéticas e Continuum AKI-DRC em Felinos',
      headers: ['Categoria Etiológica', 'Exemplos e Mecanismos Primários', 'População em Risco e Pistas Diagnósticas', 'Reversibilidade e Impacto Clínico'],
      rows: [
        ['Hereditária / Genética', 'PKD (mutação PKD1 autossômica dominante); compressão parenquimatosa por cistos', 'Persas, Exóticos, Himalaios; histórico familiar e cistos anecoicos ao USG', 'Irreversível; progressão lenta modulada por controle de complicações'],
        ['Hereditária / Amiloidose', 'Deposição tecidual de amiloide sérico no interstício medular e glomérulos', 'Abissínios e Siameses jovens a adultos; histórico de febre intermitente', 'Irreversível; evolução agressiva com perda de néfrons e fibrose'],
        ['Continuum LRA-DRC', 'Reparo desregulado pós-insulto isquêmico ou tóxico; transição epitélio-mesênquima', 'Gatos senis com desidratação, cirurgias prévias ou ingestão de toxinas', 'Prevenível no insulto agudo; fibrose residual torna-se progressiva'],
        ['Infecciosa / Pielonefrite', 'Infecção ascendente por uropatógenos (E. coli); inflamação túbulo-intersticial', 'Fêmeas idosas, gatos com DTUIF ou nefrolitíase; pielectasia ao USG', 'Parcialmente reversível com antimicrobiano adequado; risco de cicatriz'],
        ['Obstrutiva / Urolitíase', 'Ureterólitos de oxalato de cálcio provocando hidronefrose e sobrepressão', 'Gatos idosos; rins assimétricos (Big Kidney Little Kidney) ao exame', 'Urgência obstrutiva reversível com descompressão cirúrgica/SUB precoce'],
        ['Idiopática / Intersticial', 'Nefrite túbulo-intersticial crônica com fibrose difusa e atrofia tubular', 'Felinos geriátricos (>7 a 10 anos) sem histórico causal definido', 'Irreversível; principal indicação de terapia protetora multimodal'],
      ],
    },
  },

  epidemiology: {
    prevalenciaIdadeEIdososAssintomaticos:
      'Epidemiologia geriátrica e prevalência de DRC oculta:\\\n\\\n' +
      '- Elevadíssima prevalência etária: a idade é o preditor isolado mais consistente de DRC felina. Estudos populacionais demonstram prevalências que oscilam entre 28% e 81% em felinos com mais de 12 anos.\\\n' +
      '- DRC subclínica em gatos aparentemente saudáveis: estudos prospectivos revelam que cerca de 8% dos gatos senis considerados assintomáticos já preenchem critérios para IRIS Estágio >=2. Em coortes acompanhadas por dois anos, 24% dos gatos com >=11 anos e 8% dos gatos entre 7 e 10 anos desenvolveram azotemia espontânea manifesta.\\\n' +
      '- Ausência de predileção sexual: machos e fêmeas são acometidos com frequências semelhantes em causas não genéticas.',
    curvaPonderalPerdaPrecoceDeMassa:
      'A perda de peso insidiosa como biomarcador clínico cardinal:\\\n\\\n' +
      '- Detecção precoce anos antes do diagnóstico: análise de coorte com mais de 500 gatos demonstrou que a perda ponderal clinicamente significativa tem início até 3 anos antes do diagnóstico formal de DRC, atingindo mediana de redução de 8,9% do peso corporal no ano imediatamente anterior à confirmação da azotemia.\\\n' +
      '- Importância do Escore de Massa Muscular (MCS): a atrofia dos músculos epaxiais e cintura pélvica decorrente de proteólise induzida por acidose e citocinas urêmicas reduz a produção endógena de creatinina, mascarando o declínio da taxa de filtração glomerular.',
    comorbidadesFrequentesHipertireoidismoEArtropatias:
      'Interação epidemiológica com comorbidades geriátricas:\\\n\\\n' +
      '- Hipertireoidismo concomitante: aproximadamente 15% a 51% dos felinos hipertireóideos apresentam DRC subjacente. A hiperfiltração induzida pelo excesso de hormônios tireoidianos eleva falsamente a GFR, mascarando a creatinina até que o hipertireoidismo seja tratado.\\\n' +
      '- Osteoartrite e Dor Crônica: mais de 80% dos gatos acima de 12 anos apresentam doença articular degenerativa, complicando a locomoção até a caixa de areia e bebedouro e exigindo analgesia cuidadosa.',
  },

  pathogenesisTransmission: {
    teoriaDoNefronRemanescenteEHiperfiltracao:
      'A teoria do néfron remanescente e o paradoxo da hiperfiltração glomerular:\\\n\\\n' +
      '- Perda de massa nefronal e adaptação inicial: diante da destruição de uma fração de néfrons, os remanescentes aumentam sua filtração individual (aumento da Single Nephron GFR - SNGFR) para manter a taxa global de excreção de solutos.\\\n' +
      '- Hemodinâmica glomerular desregulada: ocorre vasodilatação expressiva da arteríola aferente combinada a vasoconstrição da arteríola eferente mediada pela Angiotensina II, elevando a pressão hidrostática intraglomerular de forma persistente.\\\n' +
      '- Estresse mecânico e esclerose: a sobrepressão nos capilares glomerulares impõe tensão tangencial severa sobre a membrana basal e podócitos, deflagrando descolamento podocitário, hiperpermeabilidade a macromoléculas e glomeruloesclerose acelerada, perpetuando a destruição de novos néfrons.',
    eixoSRAAHipertensaoIntraglomerularETelmisartana:
      'Ativação neuro-humoral e o papel do Sistema Renina-Angiotensina-Aldosterona (SRAA):\\\n\\\n' +
      '- Ciclo patológico da Angiotensina II: a hipoperfusão nefronal local ativa a liberação de renina, gerando Ang II tecidual em níveis excessivos. A Ang II atua em receptores AT1, perpetuando a hipertensão intraglomerular, estimulando aldosterona (retenção de sódio e fibrose miocárdica/renal) e ativando vias de estresse oxidativo.\\\n' +
      '- Sinalização profibrótica mediada por receptores AT1: a estimulação AT1 ativa a transcrição de fatores de crescimento profibróticos, promovendo infiltração inflamatória mononuclear e expansão da matriz mesangial.\\\n' +
      '- Alvo da Telmisartana: o bloqueio seletivo dos receptores AT1 reduz a resistência da arteríola eferente, normalizando a pressão glomerular e atenuando o estímulo inflamatório.',
    fibroseTubulointersticialTGFBetaEHipoxia:
      'Fibrose túbulo-intersticial crônica como via final comum da falência nefronal:\\\n\\\n' +
      '- Transição epitélio-mesênquima e TGF-beta: a agressão contínua aos túbulos renais induz liberação maciça de Fator de Transformação do Crescimento beta (TGF-beta), transformando células epiteliais tubulares e pericitos em miofibroblastos produtores de colágeno tipos I e III.\\\n' +
      '- Rarefação capilar peritubular e hipóxia medular: a expansão fibrótica no interstício comprime e oblitera a rede capilar peritubular originada da arteríola eferente, gerando isquemia crônica e hipóxia tecidual profunda, que amplifica a apoptose tubular e acelera a perda funcional.',
    proteinuriaComoMediadaEDanoTubular:
      'A proteinúria glomerular como causadora ativa de lesão tubular:\\\n\\\n' +
      '- Sobrecarga endocítica no túbulo proximal: a passagem anormal de albumina e transferrina pela barreira glomerular permeabilizada força os túbulos proximais a reabsorverem proteínas além de sua capacidade lisossomal máxima.\\\n' +
      '- Ativação inflamatória e apoptose: o excesso de proteína intraluminal estimula as células tubulares a sintetizarem quimiocinas (MCP-1) e citocinas pró-inflamatórias, deflagrando influxo de macrófagos para o interstício e necrose tubular secundária.',
  },

  pathophysiology: {
    mecanismoDaPUPDEDiureseOsmotica:
      'Fisiopatologia da perda de concentração urinária e síndrome PU/PD:\\\n\\\n' +
      '- Diurese osmótica por néfron remanescente: para depurar a carga metabólica diária obrigatória de ureia, sulfatos e eletrólitos com uma população nefronal reduzida, cada néfron restante deve filtrar e excretar uma carga proporcionalmente massiva de solutos, impedindo a reabsorção adequada de água.\\\n' +
      '- Colapso do gradiente osmótico medular: a destruição da arquitetura tubular e da alça de Henle reduz a deposição de sódio e ureia no interstício medular, dissipando a hipertonicidade necessária para o transporte passivo de água nos ductos coletores.\\\n' +
      '- Resistência ao Hormônio Antidiurético (ADH): células dos ductos coletores apresentam menor densidade de aquaporinas-2 e menor resposta ao ADH circulante, gerando poliúria e polidipsia compensatória com desidratação crônica recorrente.',
    disturbioMineralEOsseoCKDMBDEFGF23:
      'Fisiopatologia do distúrbio mineral e ósseo (CKD-MBD) e eixo FGF23-PTH:\\\n\\\n' +
      '- Retenção oculta de fósforo e elevação de FGF23: a queda precoce da filtração glomerular reduz a excreção de fósforo. Os osteócitos respondem liberando Fator de Crescimento de Fibroblastos 23 (FGF23), que atua no túbulo proximal aumentando a fosfatúria fracionada para manter o fósforo sérico normal nos estágios 1 e 2.\\\n' +
      '- Supressão da 1-alfa-hidroxilase e queda de calcitriol: o FGF23 inibe a enzima renal responsável pela síntese de calcitriol (vitamina D ativa). Com menos calcitriol e resistência esquelética, os níveis de cálcio ionizado tendem a cair, desreprimindo as paratireoides.\\\n' +
      '- Hiperparatireoidismo Renal Secundário (2HPT): os níveis de Paratormônio (PTH) disparam para manter a fosfatúria e mobilizar cálcio do esqueleto, causando osteodistrofia fibrosa ("mandíbula de borracha"), mineralização tecidual e cardiotoxicidade urêmica.',
    fisiopatologiaDaHipercalcemiaECalcioIonizado:
      'A nova compreensão da hipercalcemia ionizada (iCa) na DRC felina:\\\n\\\n' +
      '- Elevada prevalência inicial: as diretrizes iCatCare 2026 destacam que aproximadamente 20% dos gatos azotêmicos já apresentam hipercalcemia ionizada no momento do diagnóstico, e mais 26% desenvolvem elevação sustentada no primeiro ano.\\\n' +
      '- Fenômeno iatrogênico pós-dieta renal: cerca de metade dos felinos apresenta aumento progressivo do cálcio ionizado após o início de dietas com restrição extrema de fósforo, devido à diminuição da quelação intestinal de cálcio e aumento de sua absorção passiva.\\\n' +
      '- Efeitos nefrotóxicos da hipercalcemia: o excesso de cálcio ionizado causa vasoconstrição arteriolar renal direta (queda aguda da GFR), promove precipitação de fosfato de cálcio no parênquima (nefrocalcinose irreversível) e estimula urolitíase por oxalato de cálcio (CaOx).',
    desequilibrioEletroliticoHipocalemiaEAcidose:
      'Distúrbios hidroeletrolíticos e ácido-base associados:\\\n\\\n' +
      '- Hipocalemia e depleção corporal de potássio: ocorre em 20% a 30% dos gatos renais devido à perda urinária excessiva (poliúria e hiperaldosteronismo secundário), baixa ingestão alimentar e vômitos. Manifesta-se por fraqueza neuromuscular profunda, ventroflexão cervical, ataxia e piora da função renal.\\\n' +
      '- Acidose metabólica por falha de amoniagênese: a redução da massa de túbulos proximais limita a síntese renal de amônio (NH4+) e a excreção de ácidos fixos, gerando retenção de prótons H+ e queda de bicarbonato sérico (<16 mmol/L), o que estimula catabolismo muscular esquelético e osteólise.',
    tabelaMetabolismoMineralEHipercalcemia: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Distúrbio Mineral-Ósseo (CKD-MBD), Fósforo e Hipercalcemia Ionizada na DRC Felina',
      headers: ['Parâmetro Mineral', 'Fisiopatologia e Mecanismo Compensatório', 'Meta Terapêutica / Alvo Clínico', 'Armadilhas e Condutas Recomendadas'],
      rows: [
        ['Fósforo Sérico (IRIS 2)', 'Filtrado em menor quantidade; mantido normal precocemente por ação de FGF23 e PTH', 'Alvo: 2,5 a 4,5 mg/dL (manter na metade inferior do intervalo)', 'Fósforo normal não exclui retenção; introduzir dieta renal precoce'],
        ['Fósforo Sérico (IRIS 3)', 'Esgotamento da reserva tubular; hiperfosfatemia manifesta acelera fibrose', 'Alvo: 2,5 a 5,0 mg/dL', 'Cada aumento de 1 mg/dL eleva mortalidade em ~11,8%; usar quelante com comida'],
        ['Fósforo Sérico (IRIS 4)', 'Retenção grave; produto Ca x P elevado induz precipitação mineral generalizada', 'Alvo: 2,5 a 6,0 mg/dL', 'Adicionar quelantes entéricos potentes (hidróxido de alumínio ou sevelamer)'],
        ['Cálcio Ionizado (iCa)', 'Fração ativa livre; hipercalcemia causa vasoconstrição renal e nefrocalcinose', 'Alvo: 1,15 a 1,40 mmol/L (evitar hipercalcemia >1,45 mmol/L)', 'Cálcio total é discordante; dosar obrigatoriamente cálcio ionizado'],
        ['Hipercalcemia pós-dieta', 'Dieta hipofosfatada aumenta absorção intestinal passiva de cálcio livre', 'Prevenir nefrocalcinose e urolitíase por oxalato de cálcio', 'Se iCa subir: selecionar dieta com Ca <=200 mg/100 kcal e Ca:P <1,4:1'],
        ['FGF23', 'Hormônio osteocítico fosfatúrico; sobe antes do PTH e do fósforo sérico', 'Marcador prognóstico e de sobrecarga mineral', 'Não recomendado como teste de screening precoce isolado para DRC'],
      ],
    },
  },

  clinicalSignsPathophysiology: {
    sinaisIniciaisPerdaMuscularEEsquecimento:
      'Sinais clínicos precoces e alterações sutis da composição corporal:\\\n\\\n' +
      '- Emagrecimento insidioso e sarcopenia: perda progressiva de peso corpóreo e massa muscular nos membros pélvicos e musculatura epaxial, frequentemente negligenciada pelos tutores como "envelhecimento normal".\\\n' +
      '- Poliúria e polidipsia sutis: aumento na frequência de idas à caixa de areia, formação de torrões maiores de urina e preferência por beber água corrente de torneiras.\\\n' +
      '- Pelo opaco e desidratação subclínica: redução do brilho da pelagem devido à perda do comportamento de higiene ("grooming") e perda de elasticidade cutânea decorrente de balanço hídrico negativo crônico.',
    sindromeUremicaNauseaEHiporexia:
      'Apresentação clínica da síndrome urêmica e sinais sutis de náusea:\\\n\\\n' +
      '- Náusea felina sem vômito aberto: a uremia gera manifestações comportamentais peculiares: o gato aproxima-se com fome da tigela de comida, cheira o alimento, lambe os lábios repetidamente, saliba e recua sem ingerir nada (aversão alimentar urêmica).\\\n' +
      '- Vômitos e estomatite urêmica: episódios de êmese intermitente de líquido claro ou bilioso, halitose fétida com odor amoniacal característico e ulcerações na mucosa oral ou margens linguais em fases avançadas.',
    manifestacoesAvancadasAnemiaEHipertensao:
      'Achados sistêmicos da doença avançada:\\\n\\\n' +
      '- Anemia e letargia grave: mucosas pálidas ou porcelânicas, intolerância ao mínimo esforço, taquipneia compensatória e sopro cardíaco sistólico funcional por redução da viscosidade sanguínea.\\\n' +
      '- Hipertensão Arterial Sistêmica e Lesão em Órgão-Alvo (TOD): hemorragias retinianas, descolamento bolhoso de retina com cegueira súbita e midríase arreativa, hipema, tortuosidade dos vasos retinianos e encefalopatia hipertensiva (convulsões, desorientação e estupor).\\\n' +
      '- Fraqueza neuromuscular por hipocalemia: ventroflexão cervical clássica (incapacidade de erguer a cabeça por paresia dos músculos cervicais), fraqueza generalizada e marcha plantígrada.',
    armadilhasClinicasUSGEHairballMimetismo:
      'Erros e mimetizadores frequentes na rotina clínica felina:\\\n\\\n' +
      '- O mito do "vômito normal de bola de pelo": tutores atribuem vômitos crônicos à eliminação de bolas de pelo, postergando o diagnóstico da DRC por meses ou anos.\\\n' +
      '- A pegadinha da urina concentrada (USG >1,035): felinos com DRC moderada a avançada podem preservar a capacidade de gerar urina com densidade entre 1,025 e 1,060 em razão de alta carga osmótica tubular e particularidades anatômicas da medula renal felina. Portanto, densidade >1,035 NÃO exclui DRC felina.\\\n' +
      '- Confundir ACKD com IRIS Estágio 4 terminal: gato prostrado com creatinina de 8,0 mg/dL no plantão pode ter doença basal IRIS 2 com desidratação severa ou pielonefrite sobreposta; o estadiamento só tem validade após hidratação e estabilização plena.',
    tabelaCorrelacaoClinicaSinaisEArmadilhas: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Manifestações Clínicas, Mimetizadores e Armadilhas Diagnósticas no Gato Renal',
      headers: ['Sinal Clínico Observado', 'Fisiopatologia de Origem', 'Erro Frequente / Mimetizador no Plantão', 'Conduta Correta Recomendada'],
      rows: [
        ['Gato cheira comida e vai embora', 'Náusea urêmica por toxinas centrais e periféricas', 'Classificar apenas como gato "enjoado" e trocar rações', 'Instituir antiemético (maropitant/ondansetrona) e mirtazapina'],
        ['Perda de peso progressiva', 'Acidose metabólica, proteólise muscular e anorexia', 'Considerar parte natural da velhice do felino', 'Rastreio renal com MCS, creatinina, SDMA e urinálise imediata'],
        ['Cegueira súbita com midríase', 'Retinopatia hipertensiva com descolamento de retina', 'Suspeitar primariamente de doença intracraniana', 'Aferir PAS urgente com Doppler; iniciar amlodipina imediata'],
        ['Ventroflexão cervical aguda', 'Hipocalemia severa (<3,0 mmol/L) com paresia muscular', 'Confundir com polineuropatia, miastenia ou trauma cervical', 'Dosar potássio sérico urgente e repor via oral ou parenteral'],
        ['Constipação / Fezes ressecadas', 'Desidratação crônica com absorção colônica de água', 'Prescrever laxantes ou fibras sem hidratar o paciente', 'Restaurar euvolemia, corrigir hipocalemia e usar PEG 3350'],
        ['Urina com USG de 1,038', 'Alta concentração de solutos osmóticos por néfron', 'Excluir DRC e rotular falsamente como azotemia pré-renal', 'Avaliar imagem renal, SDMA e histórico de cronicidade'],
      ],
    },
  },

  diagnosis: {
    protocoloDiagnosticoEletivoEIntegrado:
      'Abordagem diagnóstica integrada segundo as diretrizes iCatCare 2026:\\\n\\\n' +
      '- Não existe um único teste diagnóstico absoluto: a identificação e confirmação de DRC no felino exige a síntese de histórico detalhado, exame físico com escore corporal/muscular, avaliação laboratorial seriada (creatinina, SDMA, urinálise, eletrólitos, perfil mineral), mensuração da pressão arterial e exame de imagem renal.\\\n' +
      '- Documentação de cronicidade: confirmada por alterações estruturais ultrassonográficas crônicas, persistência de azotemia ou proteinúria em medidas separadas por pelo menos 2 a 4 semanas em pacientes estáveis.\\\n' +
      '- Protocolo de rastreamento geriátrico ativo: gatos de 7 a 10 anos devem ser rastreados anualmente; gatos com mais de 10 anos devem ser avaliados semestralmente.',
    avaliacaoCriticaDeCreatininaESDMA:
      'Interpretação clínica contextualizada dos marcadores de filtração glomerular:\\\n\\\n' +
      '- Creatinina sérica e o fator massa muscular: marcador bem estabelecido, porém derivado diretamente da massa muscular. Felinos com sarcopenia severa podem apresentar creatinina normal ou falsamente baixa mesmo na presença de queda importante da GFR.\\\n' +
      '- SDMA (Dimetilarginina Simétrica): marcador independente da massa muscular, com correlação com a GFR comparável à creatinina. Não é específico exclusivo do rim e pode ser influenciado por hipertireoidismo, neoplasias e diabetes.\\\n' +
      '- Limiar diagnóstico refinado: o consenso iCatCare 2026 propõe valor de corte de SDMA >=18 mcg/dL para felinos idosos (em vez do corte padrão comercial de 14 mcg/dL), aumentando a especificidade e evitando falsos positivos.\\\n' +
      '- Discrepâncias entre Cr e SDMA: se os marcadores indicarem estágios IRIS diferentes, repetir os exames em 2 a 4 semanas. Se a discrepância persistir, adotar o estágio mais avançado para fins de manejo terapêutico.',
    analiseUrinariaUSGEArmadilhaConcentracao:
      'Urinálise completa e avaliação microscópica mandatória:\\\n\\\n' +
      '- Coleta preferencial por cistocentese guiada por ultrassom: técnica mais segura que previne contaminações bacterianas do trato genital inferior.\\\n' +
      '- Densidade urinária (USG): USG repetidamente <1,035 sugere perda da capacidade de concentração, devendo ser interpretada em conjunto com o estado de hidratação. Reitera-se que valores >1,035 não excluem a doença.\\\n' +
      '- Sedimentoscopia obrigatória: avaliação rigorosa de leucócitos, hemácias e cilindros granulares (marcadores de lesão tubular ativa). Fundamental para descartar causas inflamatórias pós-renais antes da solicitação de UPC.',
    subestadiamentoDeProteinuriaUPCEPAS:
      'Subestadiamento oficial IRIS de proteinúria e pressão arterial:\\\n\\\n' +
      '- Razão Proteína:Creatinina Urinária (UPC):\\\n' +
      '  * Não proteinúrico: UPC <0,2;\\\n' +
      '  * Borderline (limítrofe): UPC 0,2 a 0,4;\\\n' +
      '  * Proteinúrico: UPC >0,4.\\\n' +
      '  * Relevância prognóstica: estudo clássico de Syme et al. comprovou risco de morte 2,9 vezes maior para gatos com UPC 0,2–0,4 e 4,0 vezes maior para UPC >0,4 em relação a <0,2. Confirmar em pelo menos 2 amostras com intervalo de 2 semanas.\\\n' +
      '- Pressão Arterial Sistólica (PAS) e Risco de TOD:\\\n' +
      '  * Normotenso: PAS <140 mmHg (risco mínimo de lesão em órgão-alvo);\\\n' +
      '  * Pré-hipertenso: PAS 140 a 159 mmHg (baixo risco de TOD);\\\n' +
      '  * Hipertenso: PAS 160 a 179 mmHg (risco moderado de TOD);\\\n' +
      '  * Hipertensão grave: PAS >=180 mmHg (alto risco de TOD; exige intervenção urgente).',
    imagemUltrassonograficaEAvaliacaoEstrutural:
      'Ultrassonografia abdominal e diagnóstico por imagem:\\\n\\\n' +
      '- Achados compatíveis com DRC: rins de dimensões diminuídas, margens capsulares irregulares, perda ou atenuação da diferenciação corticomedular, hiperecogenicidade cortical difusa, cistos parenquimatosos e infartos renais antigos.\\\n' +
      '- Descarte de etiologias cirúrgicas reversíveis: essencial para afastar ureterolitíase obstrutiva (pielectasia >2 a 3 mm, ureter ectásico), nefrolitíase, pseudocistos perirrenais e neoplasias renais.\\\n' +
      '- Ultrassom normal não exclui DRC: rins com ecogenicidade e arquitetura preservadas não descartam perda funcional nefronal precoce.',
    abordagemCriticaDaBiopsiaRenalFelina:
      'Indicações restritas da biópsia renal em felinos:\\\n\\\n' +
      '- Não indicada na DRC geriátrica típica: o laudo de nefrite túbulo-intersticial crônica com fibrose difusa não altera o manejo clínico de suporte e expõe o paciente senil ao risco de anestesia e hemorragia renal.\\\n' +
      '- Indicações selecionadas: reservada exclusivamente para suspeita de glomerulopatia primária imunomediada (proteinúria maciça com UPC >2,0 e síndrome nefrótica), suspeita de amiloidose ou massas infiltrativas/linfoma com diagnóstico inconclusivo por citologia guiada.',
    tabelaEstadiamentoIRIS2026Felina: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Estadiamento IRIS 2026 e Metas Terapêuticas na DRC Felina',
      headers: ['Estágio IRIS', 'Creatinina Sérica (mg/dL)', 'SDMA Sérica (mcg/dL)', 'Meta de Fósforo (mg/dL)', 'Significado Clínico e Conduta Central'],
      rows: [
        ['Estágio 1', '<1,6', '<18', 'Sem meta definida', 'DRC não azotêmica com alteração estrutural ou UPC persistente; triar causa'],
        ['Estágio 2', '1,6 a 2,8', '18 a 25', '2,5 a 4,5', 'Azotemia renal leve; introduzir dieta renal precoce e monitorar iCa e PA'],
        ['Estágio 3', '2,9 a 5,0', '26 a 38', '2,5 a 5,0', 'Azotemia moderada; dieta renal estrita, quelantes de P, tratar anemia se HCT <25%'],
        ['Estágio 4', '>5,0', '>38', '2,5 a 6,0', 'Azotemia grave com alto risco urêmico; suporte intensivo e controle de náusea'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Triagem Geriátrica e Avaliação de Composição Corporal (>=7 Anos)',
        description:
          'Avaliação clínica semestral ou anual em gatos acima de 7 anos com pesagem seriada, registro de escore de condição corporal (BCS) e muscular (MCS). Investigar histórico de PU/PD e apetite.',
        isGoldStandard: false,
      },
      {
        stepNumber: 2,
        title: 'Estabilização Volêmica e Exclusão de ACKD / Emergência Obstrutiva',
        description:
          'Em gatos descompensados, corrigir desidratação com cristaloides balanceados antes de estadiar. Avaliar USG abdominal para afastar ureterolitíase obstrutiva ou pielonefrite aguda.',
        isGoldStandard: false,
      },
      {
        stepNumber: 3,
        title: 'Dosagem Concomitante de Creatinina Sérica e SDMA',
        description:
          'Mensuração em paciente hidratado e estável. Interpretar valores considerando a massa muscular do felino e adotar corte de SDMA >=18 mcg/dL para maior especificidade em idosos.',
        isGoldStandard: false,
      },
      {
        stepNumber: 4,
        title: 'Urinálise Completa por Cistocentese e Densidade Urinária (USG)',
        description:
          'Coleta estéril com refratometria e sedimentoscopia completa. Descartar hematúria ou piúria ativa antes de avaliar proteinúria. Não excluir DRC com USG >1,035.',
        isGoldStandard: false,
      },
      {
        stepNumber: 5,
        title: 'Subestadiamento de Proteinúria Renal (Razão UPC Seriada)',
        description:
          'Determinação de UPC em urina inativa (<0,2, 0,2–0,4 ou >0,4). Confirmar em 2 a 3 coletas separadas por 2 semanas para guiar indicação de bloqueio do SRAA.',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Aferição Hemodinâmica Seriada da Pressão Arterial Sistólica (PAS)',
        description:
          'Medição padronizada por Doppler vascular em ambiente silencioso, com manguito de 30% a 40% da circunferência do membro. Realizar exame de fundo de olho para screening de TOD.',
        isGoldStandard: true,
      },
      {
        stepNumber: 7,
        title: 'Painel Mineral Especializado: Fósforo Sérico e Cálcio Ionizado (iCa)',
        description:
          'Comparar o fósforo sérico com as metas do estágio IRIS e dosar obrigatoriamente cálcio ionizado para flagrar hipercalcemia inicial ou pós-dieta renal.',
        isGoldStandard: true,
      },
      {
        stepNumber: 8,
        title: 'Ultrassonografia Renal e Trato Urinário Completo',
        description:
          'Avaliação dimensional, ecotextura cortical, diferenciação corticomedular, pesquisa de cistos de PKD, dilatações da pelve renal (pielectasia) e litíase ureteral.',
        isGoldStandard: false,
      },
      {
        stepNumber: 9,
        title: 'Urocultura Quantitativa por Cistocentese e Interpretação Crítica',
        description:
          'Cultura bacteriana e antibiograma. Se positiva sem sinais de cistite ou pielonefrite, classificar como bacteriúria subclínica e NÃO prescrever antimicrobianos rotineiramente.',
        isGoldStandard: false,
      },
    ],
  },

  treatment: {
    protagonismoDaDietaRenalERestricaoFosforo:
      'A dieta renal terapêutica como pilar central modificador de sobrevida:\\\n\\\n' +
      '- Evidência clínica nível I (Ross et al., 2006): ensaio clínico prospectivo, randomizado e duplo-cego com 45 gatos em estágios 2 e 3 comprovou 0% de crises urêmicas no grupo de dieta renal versus 26% no grupo de manutenção, além de redução estatisticamente significativa na mortalidade renal.\\\n' +
      '- Restrição estrita de fósforo: o teor de fósforo é reduzido para 80 a 130 mg/100 kcal (comparado a 400–600 mg em rações comuns), aliviando o estímulo ao hiperparatireoidismo e à calcificação metastática.\\\n' +
      '- Proteína e a regra de ouro da preservação de massa muscular: o teor protéico é moderadamente restrito para diminuir solutos nitrogenados, mas NÃO se deve impor restrição severa que precipite sarcopenia. Manter aporte calórico e massa muscular é mais importante que baixar a ureia a qualquer custo.\\\n' +
      '- Regra do 50% de ingestão calórica: caso o felino recuse a transição exclusiva para dieta renal, fornecer pelo menos 50% das calorias diárias sob a forma de dieta renal (ex.: 70% renal + 30% alimento palatável habitual) confere benefício comprovado em sobrevida.\\\n' +
      '- Transição gradual e cuidadosa: transição em domicílio ao longo de 1 a 2 semanas quando o gato estiver clinicamente estável, jamais durante internação ou náusea ativa.',
    manejoNutricionalDaHipercalcemia:
      'Conduta nutricional diante da hipercalcemia ionizada pós-dieta renal:\\\n\\\n' +
      '- Alerta do consenso iCatCare 2026: dietas com restrição acentuada de fósforo podem descompensar a homeostase do cálcio, gerando hipercalcemia ionizada em até 50% dos gatos em acompanhamento.\\\n' +
      '- Seleção de dietas específicas: para gatos renais que desenvolverem hipercalcemia, selecionar dietas formuladas com cálcio <=200 mg/100 kcal e relação Ca:P <1,4:1, normalizando o cálcio ionizado em séries clínicas recentes.\\\n' +
      '- Veto a quelantes de cálcio: jamais prescrever quelantes de fósforo contendo carbonato ou acetato de cálcio em felinos com hipercalcemia ou cálcio alto-normal.',
    quelantesEntericosDeFosforoUsoCorreto:
      'Indicação e regras de administração de quelantes de fósforo:\\\n\\\n' +
      '- Quando introduzir: após 4 a 6 semanas de dieta renal exclusiva, se o fósforo sérico permanecer acima da meta IRIS (Estágio 2: >4,5; Estágio 3: >5,0; Estágio 4: >6,0 mg/dL).\\\n' +
      '- Regra inegociável de mistura com o alimento: os quelantes atuam ligando-se ao fósforo da dieta no lúmen gastrointestinal, formando complexos insolúveis não absorvíveis. Administrar longe das refeições anula completamente sua eficácia clínica.\\\n' +
      '- Opções farmacológicas preferenciais:\\\n' +
      '  * Hidróxido de alumínio: 30 a 100 mg/kg/dia VO dividido e homogeneizado na comida; altamente eficaz e palatável em pó;\\\n' +
      '  * Sevelamer (cloridrato ou carbonato): 30 a 50 mg/kg/dia VO com o alimento; polímero sem alumínio nem cálcio, ideal para gatos com tendência à hipercalcemia;\\\n' +
      '  * Carbonato de lantânio: opção alternativa de alta afinidade por fosfato.',
    bloqueioDoSRAAComTelmisartanaEBenazepril:
      'Manejo antiproteinúrico e renoproteção com telmisartana:\\\n\\\n' +
      '- Indicação formal: felinos com proteinúria renal persistente comprovada (UPC >0,4) em pelo menos duas dosagens consecutivas.\\\n' +
      '- Superioridade da Telmisartana: antagonista seletivo do receptor AT1 da Angiotensina II (ARB). O estudo Sent et al. (2015) com 224 gatos comprovou não inferioridade em relação ao benazepril, com redução estatisticamente superior do UPC aos 180 dias de terapia e excelente aceitação na formulação líquida oral (Semintra).\\\n' +
      '- Posologia: 1 mg/kg VO a cada 24 horas.\\\n' +
      '- Monitoramento de segurança: dosar creatinina, potássio e PA após 1 a 2 semanas de início. Aumentos de creatinina superiores a 25% a 30% exigem revisão volêmica e ajuste de dose.\\\n' +
      '- Contraindicação crítica: NUNCA prescrever bloqueadores do SRAA em pacientes desidratados, hipovolêmicos ou hemodinamicamente instáveis, sob risco de colapso da filtração glomerular.',
    controleDaHipertensaoSistemicaAmlodipina:
      'Protocolo anti-hipertensivo escalonado em felinos:\\\n\\\n' +
      '- Primeira escolha inquestionável: Besilato de Amlodipina (bloqueador de canais de cálcio di-hidropiridínico), na dose de 0,125 a 0,25 mg/kg (ou dose fixa prática de 0,625 a 1,25 mg/gato) VO a cada 24 horas.\\\n' +
      '- Resposta pressórica esperada: a amlodipina promove redução média de 30 a 50 mmHg na PAS em 7 a 14 dias.\\\n' +
      '- Terapia combinada na hipertensão refratária: caso a PAS permaneça >=160 mmHg com amlodipina em dose plena (até 0,5 mg/kg/dia), associar Telmisartana na dose de 1 a 2 mg/kg VO q24h.',
    terapiaAtualizadaDaAnemiaMolidustatEDarbepoetina:
      'Atualização do tratamento da anemia renal segundo o IRIS 2026 e iCatCare:\\\n\\\n' +
      '- Novo gatilho terapêutico: iniciar intervenção quando o hematócrito (HCT/PCV) cair abaixo de 25%, ou entre 25% e 28% se houver sinais clínicos de apatia, taquicardia ou fraqueza.\\\n' +
      '- Molidustat (Varenzin-CA1 — HIF-PHI): inibidor oral da prolil-hidroxilase do fator induzido por hipóxia (HIF-PH). Engana as células renais simulando hipóxia tecidual, ativando a transcrição e produção de eritropoietina nativa felina e melhorando a absorção de ferro. Dose: 5 mg/kg VO a cada 24 horas por 28 dias consecutivos, seguido de pausa obrigatória de pelo menos 7 dias antes de novo ciclo.\\\n' +
      '- Darbepoetina Alfa (ESA recombinante de longa ação): alternativa injetável na dose de 0,75 a 1,0 mcg/kg SC a cada 7 dias até atingir hematócrito de ~30%, espaçando então para cada 14 a 21 dias.\\\n' +
      '- Suporte de ferro obrigatório: a estimulação eritroide rápida esgota as reservas medulares de ferro. Administrar Ferro Dextrano 50 mg/gato IM a cada 3 a 4 semanas durante o uso de ESA.',
    manejoDaNauseaApetiteEAbandonoDeAntiulcerosos:
      'Tratamento moderno dos distúrbios digestivos e desmistificação de antiácidos:\\\n\\\n' +
      '- Fim do uso rotineiro de Omeprazol e Famotidina: estudos clínicos contemporâneos demonstraram que a uremia felina não cursa com hipersecreção ácida gástrica obrigatória. Supressores de ácido estão formalmente desaconselhados na rotina e reservados exclusivamente para casos com vômito sanguinolento ou melena.\\\n' +
      '- Controle da náusea e emese: Maropitant (1 mg/kg SC ou VO q24h) e Ondansetrona (0,5 a 1,0 mg/kg VO a cada 8 a 12 horas; via oral requer doses maiores pela biodisponibilidade felina).\\\n' +
      '- Estimulantes de apetite de precisão: Mirtazapina (2 mg/gato VO ou pomada transdérmica a cada 24 horas no Estágio 2; espaçar para cada 48 horas nos Estágios 3 e 4 pela menor depuração renal).',
    fluidoterapiaRacionalVetoAoSorrismoAutomatico:
      'Desmistificação da fluidoterapia subcutânea domiciliar:\\\n\\\n' +
      '- Fluidoterapia não "lava o rim" nem regenera néfrons: a hidratação parenteral serve exclusivamente para corrigir déficits volêmicos reais e azotemia pré-renal superposta.\\\n' +
      '- Veto ao uso indiscriminado em todos os pacientes: fluidos SC não são indicados de rotina em DRC inicial ou estável. A primeira escolha deve ser sempre a hidratação enteral (alimento úmido, fontes de água corrente e água adicionada ao sachê).\\\n' +
      '- Quando indicar fluidos SC: apenas em gatos com desidratação crônica recorrente não corrigível por via oral (Estágios 3 avançado e 4), utilizando cristaloides balanceados (ex.: Ringer Lactato) na dose conservadora de 75 a 100 mL/gato SC a cada 1 a 3 dias.\\\n' +
      '- Perigo fatal em cardiopatas: contraindicação estrita em felinos com cardiomiopatia hipertrófica (HCM) ou sopro não investigado, pelo alto risco de edema pulmonar agudo iatrogênico.',
    stewardshipAntimicrobianoEBacteriuriaSubclinica:
      'Diretrizes de uso racional de antimicrobianos e bacteriúria subclínica:\\\n\\\n' +
      '- Evidência contemporânea definitiva (Le Corre et al., 2026): estudo multicêntrico com 287 gatos renais comprovou que a bacteriúria subclínica (urocultura positiva em gato sem disúria, febre ou dor lombar) NÃO reduz a sobrevida nem acelera a progressão da DRC. Além disso, o uso de antibióticos não previne a recolonização bacteriana.\\\n' +
      '- Veto a antibióticos profiláticos: NÃO prescrever antimicrobianos para urocultura positiva sem sinais clínicos manifestos de infecção ativa do trato urinário superior ou inferior.',
    controleDeHipocalemiaAcidoseEConstipacao:
      'Manejo de eletrólitos, equilíbrio ácido-base e motilidade colônica:\\\n\\\n' +
      '- Hipocalemia: Gluconato de Potássio oral (1 a 4 mEq/gato VO a cada 12 horas) até manter o potássio sérico acima de 4,0 mmol/L, aliviando a fraqueza muscular e melhorando a motilidade colônica.\\\n' +
      '- Acidose metabólica crônica: Bicarbonato de Sódio (10 a 12 mg/kg VO a cada 8 a 12 horas) ou Citrato de Potássio oral, com meta de manter o bicarbonato sérico >16 mmol/L para frear o catabolismo muscular.\\\n' +
      '- Constipação crônica: hidratação oral agressiva, correção da hipocalemia e uso de Polietilenoglicol 3350 (PEG 3350 sem eletrólitos, 1/8 a 1/4 de colher de chá misturado ao alimento a cada 12 a 24 horas).',
    suporteEnteralComSondaDeEsofagostomia:
      'Indicação precoce de sonda de esofagostomia (E-tube):\\\n\\\n' +
      '- Intervenção salvadora na anorexia persistente: gatos hiporéxicos que não atingem sua necessidade energética em repouso (RER = 70 x peso^0,75) não devem passar semanas em inanição.\\\n' +
      '- Benefícios clínicos: a sonda de esofagostomia permite administrar 100% dos requerimentos calóricos da dieta renal batida com água, hidratação líquida diária sem estresse e administração de múltiplos medicamentos sem luta contra o tutor, preservando a relação tutor-animal e a qualidade de vida.',
    tabelaProtocoloTerapeuticoPorEstagioFelino: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Protocolo Terapêutico Integrado por Estágio IRIS 2026 e Diretrizes iCatCare',
      headers: ['Estágio IRIS / Condição', 'Alvos Clínicos Principais', 'Intervenções Farmacológicas e Nutricionais', 'Monitoramento e Cautelas'],
      rows: [
        ['IRIS Estágio 1', 'Identificar causa primária; controle de proteinúria e PA', 'Dieta de manutenção de alta qualidade; telmisartana se UPC >0,4; amlodipina se PAS >=160', 'Reavaliar a cada 6 meses; monitorar USG e eletrólitos'],
        ['IRIS Estágio 2', 'Fósforo <4,5 mg/dL; PAS <140; UPC <0,4; manter peso e MCS', 'Introduzir dieta renal gradual (>=50% calorias); telmisartana se proteinúrico; monitorar iCa', 'Reavaliar a cada 3 a 6 meses; dosar iCa 4 semanas pós-dieta'],
        ['IRIS Estágio 3', 'Fósforo <5,0 mg/dL; HCT >=25%; prevenir hipocalemia e náusea', 'Dieta renal estrita; quelante de P com a comida; mirtazapina; molidustat se HCT <25%', 'Reavaliar a cada 2 a 3 meses; checar K, iCa, PA e HCT'],
        ['IRIS Estágio 4', 'Fósforo <6,0 mg/dL; suporte de náusea, calorias e conforto', 'Dieta renal; quelantes potentes; antieméticos contínuos; sonda E-tube precoce se anorexia', 'Reavaliar a cada 2 a 4 semanas; foco em qualidade de vida (QoL)'],
        ['Proteinúria Renal (UPC >0,4)', 'Reduzir UPC em pelo menos 50% ou para <0,4', 'Telmisartana 1 mg/kg VO q24h; dieta renal com ômega-3', 'Checar creatinina e PA em 1–2 semanas; suspender se desidratar'],
        ['Hipertensão (PAS >=160)', 'Reduzir PAS para <140 mmHg (ou <160 sem TOD)', 'Amlodipina 0,125 a 0,25 mg/kg VO q24h (+ telmisartana 1–2 mg/kg se refratário)', 'Aferir PAS em 7 a 14 dias; checar fundo de olho'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Dieta Renal Terapêutica Felina',
        dose: 'Meta calórica de 1,2 a 1,4 x RER (RER = 70 x peso^0,75); mínimo de 50% das calorias como renal',
        route: 'Oral ou via sonda de esofagostomia',
        frequency: 'Fracionada em múltiplas refeições ao dia',
        mechanism:
          'Restrição severa de fósforo (80–130 mg/100 kcal), teor proteico moderado com alta digestibilidade, enriquecimento com ácidos graxos ômega-3 (EPA/DHA), antioxidantes e agentes alcalinizantes; reduz crises urêmicas e prolonga sobrevida (Ross et al., 2006).',
      },
      {
        drug: 'Hidróxido de Alumínio (Quelante de Fósforo)',
        dose: '30 a 100 mg/kg/dia VO dividido entre todas as refeições (iniciar com 30–50 mg/kg/dia)',
        route: 'Oral (obrigatoriamente misturado com a comida)',
        frequency: 'A cada refeição do dia',
        mechanism:
          'Liga-se quimicamente ao fosfato inorgânico da dieta no lúmen gastrointestinal formando fosfato de alumínio insolúvel que é excretado nas fezes; impede a absorção entérica de fósforo.',
      },
      {
        drug: 'Telmisartana (Semintra)',
        dose: '1 mg/kg VO a cada 24 horas (proteinúria); 2 mg/kg VO a cada 24 horas (hipertensão em monoterapia)',
        route: 'Oral',
        frequency: 'A cada 24 horas contínuo',
        mechanism:
          'Antagonista seletivo do receptor AT1 da Angiotensina II; promove vasodilatação da arteríola eferente glomerular, reduz a pressão hidrostática capilar e diminui a proteinúria e o estímulo profibrótico.',
      },
      {
        drug: 'Besilato de Amlodipina',
        dose: '0,125 a 0,25 mg/kg VO q24h (ou 0,625 a 1,25 mg/gato q24h; até 0,5 mg/kg se hipertensão severa)',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        mechanism:
          'Bloqueador dos canais de cálcio do tipo L na musculatura lisa vascular; induz vasodilatação periférica arteriolar expressiva, reduzindo a resistência vascular sistêmica e a pressão arterial sistólica.',
      },
      {
        drug: 'Molidustat (Varenzin-CA1)',
        dose: '5 mg/kg VO a cada 24 horas por 28 dias consecutivos, com pausa obrigatória de pelo menos 7 dias',
        route: 'Oral',
        frequency: 'A cada 24 horas em ciclos de 28 dias',
        mechanism:
          'Inibidor da enzima prolil-hidroxilase do fator induzido por hipóxia (HIF-PHI); estabiliza os heterodímeros de HIF-alpha, simulando hipóxia celular nas células intersticiais renais residuais e ativando a transcrição de eritropoietina nativa felina.',
      },
      {
        drug: 'Darbepoetina Alfa',
        dose: '0,75 a 1,0 mcg/kg SC a cada 7 dias até PCV atingir ~30%; manutenção a cada 14 a 21 dias',
        route: 'Subcutânea',
        frequency: 'Semanal na indução; quinzenal na manutenção',
        mechanism:
          'Agente estimulante da eritropoiese recombinante hiperglicosilado de ação prolongada; estimula progenitores eritroides na medula óssea. Exige suplementação de ferro dextrano 50 mg/gato IM a cada 3–4 semanas.',
      },
      {
        drug: 'Maropitant (Cerenia)',
        dose: '1 mg/kg SC ou VO a cada 24 horas',
        route: 'Subcutânea ou oral',
        frequency: 'A cada 24 horas',
        mechanism:
          'Antagonista potente e altamente seletivo dos receptores de neurocinina-1 (NK-1); bloqueia a ligação da substância P nos centros eméticos bulbares e nos aferentes vagais do trato gastrointestinal.',
      },
      {
        drug: 'Mirtazapina (Mirataz)',
        dose: '2 mg/gato VO ou 0,1 mL de pomada transdérmica q24h (IRIS 2); q48h (IRIS 3 e 4)',
        route: 'Oral ou transdérmica na face interna do pavilhão auricular',
        frequency: 'A cada 24 a 48 horas conforme o estágio renal',
        mechanism:
          'Antagonista dos autorreceptores alfa-2 adrenérgicos centrais e receptores 5-HT2 e 5-HT3 de serotonina; estimula fortemente o apetite e confere propriedades antieméticas em felinos com DRC.',
      },
      {
        drug: 'Gluconato de Potássio',
        dose: '1 a 4 mEq/gato VO a cada 12 horas ajustado conforme os níveis séricos de potássio',
        route: 'Oral misturado ao alimento',
        frequency: 'A cada 12 horas',
        mechanism:
          'Reposição de potássio catiônico orgânico bem tolerada pelo trato gastrointestinal; corrige o déficit corporal total de potássio, restaura o potencial de membrana neuromuscular e alivia fraqueza e constipação.',
      },
    ],
  },

  complications: {
    descompensacaoAgudaACKDNoPlantao:
      'Descompensação aguda sobreposta a DRC (Acute-on-Chronic Kidney Disease - ACKD):\\\n\\\n' +
      '- Apresentação de emergência: gato com DRC basal que sofre desidratação aguda, evento anoréxico, infecção bacteriana ascendente ou obstrução ureteral, apresentando-se com letargia súbita, creatinina disparada e hipotermia.\\\n' +
      '- Risco de conduta fatal: rotular precocemente o paciente como portador de DRC Estágio 4 terminal e sugerir eutanásia sem avaliar a reversibilidade do componente agudo.\\\n' +
      '- Protocolo de plantão: ressuscitação volêmica cuidadosa com cristaloides balanceados, USG urgente para afastar litíase ureteral e monitoramento contínuo de débito urinário até definição do novo baseline.',
    criseHipertensivaELesaoOcularTOD:
      'Emergência hipertensiva e cegueira aguda por lesão de órgão-alvo (TOD):\\\n\\\n' +
      '- Síndrome ocular hipertensiva: a PAS elevada (>160–180 mmHg) lesa os capilares corioretinianos, causando transudação de fluido sub-retiniano, hemorragias em chama de vela e descolamento seroso de retina bilateral com cegueira súbita irreversível se não tratada em poucas horas.\\\n' +
      '- Conduta emergencial: introdução imediata de besilato de amlodipina (0,25 a 0,5 mg/kg VO) para redução gradual e controlada da pressão arterial.',
    sobrecargaCardiovascularPorFluidosEmHCM:
      'Sobrecarga volêmica iatrogênica em gatos com cardiopatia oculta concomitante:\\\n\\\n' +
      '- Risco letal de soroterapia excessiva: felinos idosos frequentemente apresentam hipertrofia concêntrica do ventrículo esquerdo (HCM associada à idade ou hipertensão). A administração agressiva de fluidos IV ou SC eleva a pressão atrial esquerda e precipita edema pulmonar agudo cardiogênico ou efusão pleural.\\\n' +
      '- Monitoramento estrito: pesagem seriada duas vezes ao dia na internação, ausculta pulmonar e avaliação de frequência respiratória em repouso.',
    nefrocalcinoseEProgressaoAcelerada:
      'Nefrocalcinose e nefrotoxicidade mineral por hipercalcemia descontrolada:\\\n\\\n' +
      '- Produto Ca x P e nefrocalcinose: quando a concentração sérica de cálcio ionizado se eleva concomitantemente à retenção de fósforo, ocorre precipitação de cristais de fosfato de cálcio na membrana basal tubular e interstício renal, deflagrando inflamação granulomatosa e perda irreversível de néfrons remanescentes.',
    hipotireoidismoIatrogenicoPosTratamento:
      'Hipotireoidismo iatrogênico após tratamento de hipertireoidismo:\\\n\\\n' +
      '- Queda da GFR: a superdosagem de metimazol que induz T4 abaixo do normal colapsa a perfusão renal, precipitando azotemia grave ou agravando drasticamente a DRC existente.',
  },

  prevention: {
    protocoloDeRastreioGeriátrico7Anos:
      'Rastreamento geriátrico e prevenção secundária de progressão:\\\n\\\n' +
      '- Idade marco de 7 anos: consulta clínica semestral ou anual com aferição de peso, escore corporal (BCS), escore de massa muscular (MCS), pressão arterial sistólica, creatinina, SDMA e urinálise por refratometria.\\\n' +
      '- Vigilância da curva ponderal: qualquer perda de peso superior a 5% em felinos idosos deve deflagrar investigação renal imediata, mesmo com creatinina no intervalo de referência.',
    protecaoHemodinamicaEEvitacaoNefrotoxicos:
      'Proteção nefronal e controle de fatores iatrogênicos:\\\n\\\n' +
      '- Evitação absoluta de nefrotoxinas domésticas: banimento de plantas do gênero Lilium (lírios) em domicílios com felinos.\\\n' +
      '- Uso criterioso de AINEs: analgésicos anti-inflamatórios não esteroidais devem ser evitados em pacientes desidratados, hipovolêmicos ou sob bloqueio do SRAA; se indispensáveis na osteoartrite estável, usar menor dose eficaz sob estrita hidratação e monitoramento renal.\\\n' +
      '- Cuidados anestésicos e cirúrgicos: fluidoterapia perioperatória obrigatória e monitoramento contínuo de pressão arterial média (PAM >60–70 mmHg) para prevenir injúria isquêmica aguda superposta.',
    engajamentoDoTutorEQualityOfLife:
      'Comunicação com o tutor e preservação da qualidade de vida:\\\n\\\n' +
      '- Enfoque em qualidade de vida (QoL): o tratamento da DRC felina visa retardar a progressão e garantir bem-estar; a sobrecarga de administração excessiva de comprimidos à força pode destruir o vínculo tutor-animal e causar aversão alimentar.\\\n' +
      '- Estímulo à hidratação espontânea: instalação de fontes de água corrente tipo cascata, múltiplos bebedouros de cerâmica ou vidro afastados da caixa de areia e fornecimento exclusivo de alimentos úmidos (sachês e latas).',
  },

  references: [
    {
      id: 'ref-icatcare-2026-guidelines',
      authors: 'Taylor S, Finch N, Caney S, Elliott J, Geddes R, Mortier F, Parker V, Quimby J, Segev G, White J',
      title:
        '2026 iCatCare consensus guidelines on the diagnosis and management of chronic kidney disease in cats',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2026,
      volume: '28',
      issue: '9',
      pages: '1098612X261466553',
      url: 'https://doi.org/10.1177/1098612X261466553',
    },
    {
      id: 'ref-iris-2026-guidelines',
      authors: 'International Renal Interest Society (IRIS)',
      title: 'IRIS Staging of CKD in Cats and Treatment Recommendations (2026 Revision)',
      journal: 'IRIS Guidelines Official Publication',
      year: 2026,
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-ross-2006-dietary-rct',
      authors: 'Ross SJ, Osborne CA, Kirk CA, Lowry SR, Koehler LA, Polzin DJ',
      title:
        'Clinical evaluation of dietary modification for treatment of spontaneous chronic kidney disease in cats: a double-blinded, randomized clinical trial',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      year: 2006,
      volume: '229',
      issue: '6',
      pages: '949-957',
      url: 'https://doi.org/10.2460/javma.229.6.949',
    },
    {
      id: 'ref-elliott-2000-survival-diet',
      authors: 'Elliott J, Rawlings JM, Markwell PJ, Barber PJ',
      title:
        'Survival of cats with naturally occurring chronic renal failure: effect of dietary management',
      journal: 'Journal of Small Animal Practice (JSAP)',
      year: 2000,
      volume: '41',
      issue: '6',
      pages: '235-242',
      url: 'https://doi.org/10.1111/j.1748-5827.2000.tb03932.x',
    },
    {
      id: 'ref-syme-2006-proteinuria-survival',
      authors: 'Syme HM, Markwell PJ, Pfeiffer D, Elliott J',
      title:
        'Survival of cats with naturally occurring chronic renal failure is related to severity of proteinuria',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      year: 2006,
      volume: '20',
      issue: '3',
      pages: '528-535',
      url: 'https://doi.org/10.1892/0891-6640(2006)20[528:socwno]2.0.co;2',
    },
    {
      id: 'ref-sent-2015-telmisartan-benazepril',
      authors: 'Sent U, Gössl R, Lang I, Bowman N, Zimmering T',
      title:
        'Comparison of efficacy of long-term oral treatment with telmisartan and benazepril in cats with chronic kidney disease: a prospective, randomized, blinded study',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      year: 2015,
      volume: '29',
      issue: '6',
      pages: '1479-1487',
      url: 'https://doi.org/10.1111/jvim.13639',
    },
    {
      id: 'ref-charles-2024-molidustat-anemia',
      authors: 'Charles S, Olin SJ, Vaden SL, Langston CE, Gisselman K, LeVine DN',
      title:
        'Use of molidustat, a hypoxia-inducible factor prolyl hydroxylase inhibitor, in chronic kidney disease-associated anemia in cats: A prospective randomized trial',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      year: 2024,
      volume: '38',
      issue: '1',
      pages: '197-204',
      url: 'https://doi.org/10.1111/jvim.16807',
    },
    {
      id: 'ref-lecorre-2026-subclinical-bacteriuria',
      authors: 'Le Corre E, Benchekroun G, Daminet S, Boucraut-Baralon C, Lavoué R',
      title:
        'Clinical outcomes and association with disease progression and survival of subclinical bacteriuria in cats with chronic kidney disease: A multicenter study',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      year: 2026,
      volume: '40',
      issue: '2',
      pages: 'aalag064',
      url: 'https://doi.org/10.1093/jvimsj/aalag064',
    },
    {
      id: 'ref-nelson-couto-6ed-ckd',
      authors: 'Nelson RW, Couto CG',
      title:
        'Small Animal Internal Medicine, 6th Edition: Chapter 41 (Acute Kidney Injury and Chronic Kidney Disease)',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      pages: '692-703',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
    },
    {
      id: 'ref-dibartola-fluid-disorders-5ed',
      authors: 'DiBartola SP',
      title:
        'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 5th Edition: Chapter 22 (Managing Fluid and Electrolyte Disorders in Renal Failure)',
      journal: 'Saunders Elsevier',
      year: 2017,
      pages: '544-550',
      url: 'https://www.elsevier.com/books/fluid-electrolyte-and-acid-base-disorders-in-small-animal-practice/dibartola/978-0-323-67693-9',
    },
    {
      id: 'ref-plumb-10ed-feline-ckd-drugs',
      authors: 'Plumb DC',
      title:
        "Plumb's Veterinary Drug Handbook, 10th Edition: Monographs for Telmisartan, Amlodipine, Molidustat, Darbepoetin, Mirtazapine, Maropitant, and Aluminum Hydroxide",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'Various',
      url: 'https://www.plumbs.com',
    },
    {
      id: 'ref-bsava-formulary-10ed-part-a',
      authors: 'BSAVA',
      title:
        'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th Edition (Monographs for Telmisartan and Amlodipine)',
      journal: 'British Small Animal Veterinary Association',
      year: 2020,
      pages: '391-392',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
    },
    {
      id: 'ref-quimby-2011-mirtazapine-ckd',
      authors: 'Quimby JM, Lunn KF',
      title:
        'Mirtazapine as an appetite stimulant and antiemetic in cats with chronic kidney disease: a masked placebo-controlled crossover study',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      year: 2011,
      volume: '13',
      issue: '10',
      pages: '729-735',
      url: 'https://doi.org/10.1016/j.jfms.2011.05.003',
    },
    {
      id: 'ref-coleman-2019-amlodipine-hypertension',
      authors: 'Coleman AE, Brown SA, Traas AM, Habing AM, King JN',
      title:
        'Safety and efficacy of amlodipine in cats with naturally occurring hypertension and chronic kidney disease',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      year: 2019,
      volume: '33',
      issue: '4',
      pages: '1734-1743',
      url: 'https://doi.org/10.1111/jvim.15541',
    },
  ],

  relatedMedicationSlugs: [
    'telmisartana',
    'amlodipino',
    'molidustat',
    'darbepoetina',
    'maropitant',
    'ondansetrona',
    'mirtazapina',
    'capromorelina',
  ],

  relatedDiseaseSlugs: [
    'doenca-renal-cronica-canina',
    'lesao-renal-aguda-felina',
    'pielonefrite-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'hipertireoidismo-felino',
  ],
};
`;

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully created diseases.doenca-renal-cronica-felina.seed.ts');
