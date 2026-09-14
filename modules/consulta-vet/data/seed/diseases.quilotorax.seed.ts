import type { DiseaseRecord } from '../../types/disease';
import type { EditorialClinicalFigure } from '../../types/common';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Quilotórax em Gatos e Cães — síntese editorial e clínica de padrão ouro Vetius.
 * Padrão editorial estruturado e rigorosamente fundamentado:
 * Cruzamento das diretrizes de excelência e literatura de ponta:
 * - Severac, Juette & Conversy (2026, JAVMA): Etiologia cardíaca em 57% dos felinos com quilotórax, LA:Ao mediano 2,4 vs < 1,4.
 * - Reeves et al. (2020, Vet Surg): Revisão sistemática GRADE comprovando ausência de superioridade entre técnicas cirúrgicas e fragilidade do tratamento conservador isolado.
 * - Hawker & Singh (2024, Vet Clin North Am): Avanços em CT-linfangiografia e fluorescência intraoperatória com indocianina verde (NIR).
 * - Dickson et al. (2024, Vet Surg): Videotoracoscopia (VATS) em felinos e taxas de morbimortalidade em centros especializados.
 * - Stockdale et al. (2018, JAVMA): Comparação entre TDL + pericardiectomia com ou sem ablação da cisterna do quilo (CCA sem benefício em sobrevida).
 * - Chiang et al. (2022, AJVR): CT-linfangiografia interdigital revelando 72% dos ramos do ducto torácico no hemitórax direito em gatos.
 * - Fossum et al. (2004, JVIM) & Fossum et al. (1991, JAVMA): Séries históricas de ligadura do ducto torácico e pericardiectomia.
 * - Waddle & Giger (1990, Vet Clin Pathol): Eletroforese de lipoproteínas, validação de TGpleural > TGsérico e limitações da relação C:TG em gatos (50% falso-positivo).
 * - Terai et al. (2025, Vet Sci / PMC12737564): Anomalia linfática complexa comparada à classificação ISSVA humana.
 * - Thompson, Cohn & Jordan (1999, JAVMA): Avaliação crítica do uso empírico de rutina em felinos (n=4).
 * - Nelson & Couto (6ª ed., Caps. 23 e 24), Ettinger 9ª ed., Feline Emergency and Critical Care Medicine (2ª ed., 2023, Caps. 10 e 32),
 *   Manual of Small Animal Emergency and Critical Care Medicine (2ª ed.), Withrow & MacEwen (6ª ed.),
 *   Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice (4ª ed.), BSAVA Guide to Procedures (3ª ed., 2024),
 *   Veterinary Emergency and Critical Care Procedures (3ª ed., 2025) e Plumb's Veterinary Drug Handbook (10ª ed.).
 * Ausência absoluta de marcadores literais de asteriscos.
 */

const figura1AspectoMacroscopicoTerai2025: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/quilotorax/aspecto-macroscopico-quilo-terai2025.jpg',
  alt: 'Aspecto macroscópico de efusão pleural quilosa felina em seringa e tubo estéril',
  caption: 'Figura 1 — Aspecto macroscópico característico do quilo pleural em felino doméstico com quilotórax. O líquido apresenta coloração branco-leitosa, opalescente e turva, decorrente da alta concentração de quilomícrons e triglicerídeos intestinais absorvidos. Embora a aparência macroscópica seja fortemente sugestiva, ela NÃO é patognomônica nem suficiente para fechar o diagnóstico: pacientes anoréxicos ou em jejum prolongado podem apresentar quilo límpido ou translúcido pela escassez de quilomícrons pós-prandiais, enquanto derrames purulentos celulares (piotórax) ou neoplásicos podem mimetizar visualmente o aspecto leitoso. O diagnóstico definitivo exige obrigatoriamente a comprovação bioquímica de triglicerídeos pleurais superiores aos triglicerídeos séricos simultâneos. Fonte: Terai et al. (2025), Veterinary Sciences / MDPI (CC BY 4.0).',
  display: 'wide',
};

const figura2CtLinfangiografiaTerai2025: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/quilotorax/ct-linfangiografia-vazamento-terai2025.jpg',
  alt: 'Tomografia computadorizada com linfangiografia felina demonstrando extravasamento ativo e dilatações linfáticas anormais',
  caption: 'Figura 2 — Linfangiografia por tomografia computadorizada (CT-linfangiografia) com contraste iodado hidrossolúvel em felino jovem com quilotórax espontâneo. Observa-se a opacificação da cisterna do quilo e do ducto torácico com extravasamento ativo de linfa contrastada no espaço pleural cranial e dorsal, associada a ectasia e ramificações linfáticas atípicas plexiformes (anomalia linfática complexa comparada à classificação ISSVA humana). Essa imagem ilustra o conceito biomecânico fundamental de que o quilotórax resulta de hipertensão linfática retrógrada e linfangiectasia com permeabilidade aumentada dos vasos pleurais, e raramente de laceração traumática pura do ducto. Fonte: Terai et al. (2025), Veterinary Sciences / MDPI (CC BY 4.0).',
  display: 'wide',
};

const figura3AnatomiaDuctoWellcome: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/quilotorax/anatomia-ducto-toracico-wellcome.jpg',
  alt: 'Prancha anatômica do ducto torácico, cisterna do quilo e confluência venosa crânio-cervical',
  caption: 'Figura 3 — Representação anatômica dos troncos linfáticos principais, destacando a cisterna do quilo no abdome cranial, o trajeto do ducto torácico através do hiato aórtico diafragmático no mediastino dorsal e sua desembocadura na confluência venosa jugulossubclávia (ângulo venoso cranial). Em gatos e cães, qualquer obstáculo à drenagem venosa cranial (como cardiomiopatias com hipertensão atrial, massas mediastinais por linfoma ou trombose da veia cava cranial) reduz o gradiente pressórico e impede o escoamento da linfa, desencadeando contrapressão retrógrada, dilatação linfangiectásica e extravasamento transmural de quilo para a cavidade pleural. Fonte: Wellcome Collection, London (CC BY 4.0).',
  display: 'default',
};

const figura4HistopatologiaTerai2025: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/quilotorax/histopatologia-canais-linfaticos-terai2025.jpg',
  alt: 'Fotomicrografia histopatológica evidenciando proliferação desordenada de canais linfáticos endoteliais ectásicos no tecido mediastinal',
  caption: 'Figura 4 — Fotomicrografia histopatológica (coloração por Hematoxilina e Eosina) de tecido conjuntivo mediastinal e pleural em felino portador de anomalia linfática crônica. Observa-se intensa ectasia e proliferação desordenada de canais vasculares de paredes delgadas revestidos por monocamada endotelial fenestrada contendo fluido linfático proteico acelular e linfócitos maduros, sem atipias nucleares neoplásicas. A histopatologia corrobora a presença de displasias e anomalias congênitas ou adquiridas da arquitetura vascular linfática subjacentes a muitos casos previamente catalogados como idiopáticos. Fonte: Terai et al. (2025), Veterinary Sciences / MDPI (CC BY 4.0).',
  display: 'wide',
};

const figura5Reconstrucao3dTerai2025: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/quilotorax/linfangiografia-reconstrucao-terai2025.jpg',
  alt: 'Reconstrução tomográfica tridimensional em volume rendering destacando os trajetos vasculares linfáticos do ducto torácico',
  caption: 'Figura 5 — Reconstrução tomográfica tridimensional (3D Volume Rendering) de CT-linfangiografia toracoabdominal felina. O mapeamento volumétrico de alta resolução revela a tortuosidade, bifurcações colaterais aberrantes e a assimetria topográfica dos ramos do ducto torácico. Conforme documentado por Chiang et al. (2022), até 72% dos ramos do ducto torácico felino localizam-se no hemitórax direito, contrariando descrições antigas de livros humanos e justificando por que ligaduras cirúrgicas cegas podem falhar se colaterais aberrantes persistirem pérvios. Fonte: Terai et al. (2025), Veterinary Sciences / MDPI (CC BY 4.0).',
  display: 'wide',
};

export const quilotoraxRecord: DiseaseRecord = {
  id: 'disease-quilotorax-caes-gatos',
  slug: 'quilotorax-caes-gatos',
  title: 'Quilotórax em Gatos e Cães',
  subtitle: 'Acúmulo de Linfa Pleural, Dinâmica da Cisterna do Quilo e Ducto Torácico, Cardiopatias em Felinos e Conduta Cirúrgica',
  synonyms: [
    'Quilotórax felino',
    'Quilotórax canino',
    'Derrame quiloso',
    'Chylothorax',
    'Linfotórax',
    'Efusão pleural quilosa',
  ],
  species: ['cat', 'dog'],
  category: 'urgencia-emergencia',
  categories: ['urgencia-emergencia', 'pneumologia', 'cardiologia', 'cirurgia', 'terapia-intensiva'],
  tags: [
    'quilotórax',
    'efusão pleural',
    'gatos',
    'cães',
    'ducto torácico',
    'cisterna do quilo',
    'triglicerídeos pleurais',
    'cardiomiopatia',
    'linfoma mediastinal',
    'pleurite fibrosante',
    'TDL',
    'pericardiectomia',
    'rutina',
    'dieta hipolipídica',
    'VATS',
    'Severac 2026',
    'Reeves 2020',
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['quilotorax-caes-gatos'],
  quickSummary: 'O quilotórax é uma síndrome clínica grave caracterizada pelo acúmulo patológico de quilo no interior da cavidade pleural, decorrente da perda da integridade funcional ou anatômica do sistema de transporte linfático torácico. Ao contrário do mito histórico de ruptura traumática do ducto torácico, estudos de linfangiografia demonstram que em mais de 89% dos casos espontâneos ocorre dilatação ectásica (linfangiectasia) e extravasamento transmural sob hipertensão linfática retrógrada ou aumento da pressão venosa central. Em gatos, o paradigma etiológico foi profundamente revolucionado por Severac, Juette & Conversy (2026), que comprovaram etiologia cardíaca em 57% dos casos (com razão átrio esquerdo/aorta mediano de 2,4 vs < 1,4 nos não cardíacos; P < 0,001), superando os casos idiopáticos (31%), neoplásicos (9% — linfoma e timoma) e hérnias diafragmáticas (3%). Em cães, a etiologia idiopática predomina (representando cerca de 70% dos casos, com forte super-representação de cães da raça Afghan Hound), sendo as neoplasias mediastinais e cardiopatias diferenciais subsequentes. Fisiopatologicamente, o quilotórax acarreta insuficiência ventilatória restritiva com colapso pulmonar compressivo e perda crônica devastadora de quilomícrons, linfócitos T auxiliares, imunoglobulinas, albumina e eletrólitos (desencadeando hipoproteinemia, linfopenia, hiponatremia e hipercalemia paradoxal por drenagens repetidas). A complicação tardia mais letal é a pleurite fibrosante restritiva, na qual o contato prolongado do quilo induz espessamento fibroso visceral que impede mecanicamente a reexpansão pulmonar, com mortalidade superior a 80%. A regra de ouro diagnóstica na emergência é a toracocentese diagnóstica e terapêutica imediata guiada por POCUS/TFAST ANTES de qualquer exame radiográfico estressante em animais dispneicos. O diagnóstico confirmatório exige triglicerídeos pleurais claramente superiores aos triglicerídeos séricos simultâneos (TGpleural > TGsérico); a relação colesterol:triglicerídeo < 1 apresenta sensibilidade elevada, mas especificidade precária em gatos (50% de falsos positivos em derrames não quilosos, conforme Waddle & Giger). Na abordagem terapêutica, inexiste consenso formal ACVIM/ISFM (a revisão sistemática GRADE de Reeves et al., 2020 não encontrou estudos de alta evidência). O tratamento etiológico tem prioridade máxima (controlar cardiopatia, quimioterapia para linfoma). O manejo conservador clássico com dieta hipolipídica tem benefício questionável e a rutina (50 a 100 mg/kg VO TID) possui evidência anedótica fraca (n=4 em Thompson 1999). A conduta cirúrgica contemporânea não deve aguardar arbitrariamente 1 a 3 meses sob risco de pleurite fibrosante irreversível e caquexia: a ligadura do ducto torácico (TDL) associada à pericardiectomia subfrênica constitui a base operatória, embora a ablação da cisterna do quilo (CCA) prolongue a cirurgia sem ganho de sobrevida (Stockdale et al., 2018) e procedimentos videotoracoscópicos (VATS) ainda apresentem morbimortalidade expressiva (Dickson et al., 2024).',
  quickDecisionStrip: [
    'Toracocentese antes da radiografia: Em gato com padrão respiratório restritivo e sons abafados ventralmente, o estresse da contenção para raio-X pode desencadear parada cardiorrespiratória imediata. Drene primeiro, estabilize e investigue depois.',
    'Líquido branco-leitoso NÃO fecha diagnóstico de quilotórax: Derrames purulentos ou neoplásicos podem parecer leitosos, e gatos em jejum prolongado podem apresentar quilo translúcido. Confirme comparando TG pleural e sérico.',
    'Triglicerídeos pleurais maiores que no soro (TGpleural > TGsérico) é a regra diagnóstica definitiva: A relação colesterol:triglicerídeo < 1 falha em gatos, apresentando até 50% de falsos positivos em derrames não quilosos (Waddle & Giger).',
    'Ecocardiograma é obrigatório em todo gato com quilotórax: Severac et al. (2026) demonstraram causa cardíaca em 57% dos gatos com quilotórax (LA:Ao mediano 2,4 vs < 1,4), quebrando o dogma de que a maioria é idiopática.',
    'Linfoma mediastinal é o grande diferencial oncológico: Withrow relata efusão pleural em ~50% dos linfomas mediastinais felinos, frequentemente quiloso por compressão do ducto torácico e veia cava cranial.',
    'Furosemida NÃO seca quilo: Diuréticos são indicados apenas se houver insuficiência cardíaca congestiva comprovada com aumento de pressões de enchimento; não substituem a descompressão mecânica do tórax.',
    'Drenagens repetidas causam hiponatremia, hipercalemia e caquexia: A perda crônica de quilo esgota proteínas, linfócitos e eletrólitos; monitore peso, albumina e Na+/K+ seriadamente em pacientes sob drenagens frequentes.',
    'Cuidado com a pleurite fibrosante restritiva: A inflamação crônica pelo quilo deposita fibrina e fibrose visceral que aprisiona o pulmão em casca inexpansível; suspeite se a dispneia persistir após drenagem total e pulmões permanecerem arredondados.',
    'Rutina tem evidência científica muito fraca: Dose clássica de 50 a 100 mg/kg VO TID apoia-se em série de apenas 4 gatos sem grupo controle (Thompson 1999); não atrase intervenções etiológicas ou cirúrgicas confiando na rutina.',
    'Cirurgia precoce supera a espera cega de 3 meses: A revisão de Reeves et al. (2020) não sustenta terapia clínica prolongada; encaminhe para ligadura do ducto torácico (TDL) precocemente antes que ocorra pleurite fibrosante irreversível.',
  ],
  quickSummaryRich: {
    lead: 'O quilotórax é o acúmulo de quilo no espaço pleural resultante do comprometimento funcional ou estrutural da circulação linfática torácica. A fisiopatologia envolve quase invariavelmente hipertensão linfática e linfangiectasia com transudação de fluido rico em lipídios e linfócitos para a cavidade torácica, e não simples ruptura física do ducto torácico. A abordagem contemporânea exige estabilização descompressiva precoce, rastreio rigoroso de cardiopatias em felinos (onde representam a principal causa) e tomada de decisão cirúrgica atempada antes da instalação de pleurite fibrosante restritiva fatal.',
    leadHighlights: [
      'Hipertensão Linfática e Linfangiectasia',
      'Etiologia Cardíaca em 57% dos Felinos (Severac 2026)',
      'TG Pleural Maior que Sérico (Padrão Ouro)',
      'Toracocentese Prévia à Radiografia',
      'Espoliação Linfocitária e Hipoproteinemia Crônica',
      'Pleurite Fibrosante Restritiva Pulmonar',
      'Falha Evidencial da Espera Cega de 3 Meses',
      'Ligadura do Ducto Torácico (TDL) e Pericardiectomia',
    ],
    pillars: [
      {
        title: 'Quebra de Paradigma Etiológico em Felinos',
        body: 'Historicamente rotulado como idiopático na maioria dos casos, dados contemporâneos de Severac et al. (2026) revelaram que a cardiopatia subjacente é a principal causa em gatos (57%), com relação átrio esquerdo/aorta (LA:Ao) mediana de 2,4 vs < 1,4 nos não cardíacos. O ecocardiograma tornou-se etapa obrigatória no algoritmo inicial.',
        highlights: ['Cardiopatia em 57%', 'LA:Ao > 1,4 discriminatório', 'Ecocardiograma obrigatório', 'Idiopático secundário (31%)'],
      },
      {
        title: 'Emergência na Admissão: Regra Hands-Off e Descompressão',
        body: 'Em pacientes com dispneia restritiva severa e sons torácicos abafados ventralmente, a contenção para exames radiográficos induz parada cardiorrespiratória por estresse. A conduta mandatória é oxigenoterapia imediata, confirmação ultrassonográfica por POCUS/TFAST e toracocentese de alívio pré-radiográfica.',
        highlights: ['Toracocentese antes de raio-X', 'Mínimo manuseio hands-off', 'POCUS pleural rápido', 'Prevenção de PCR iatrogênica'],
      },
      {
        title: 'Diagnóstico Bioquímico Padrão Ouro',
        body: 'A aparência leitosa do líquido é sugestiva, mas não confirmatória (quilo translúcido em jejum; piotórax ou linfoma leitosos). O diagnóstico confirmatório exige triglicerídeos pleurais maiores que no soro (TGpleural > TGsérico). A relação C:TG < 1 apresenta 50% de falsos positivos em derrames felinos não quilosos (Waddle & Giger).',
        highlights: ['TGpleural > TGsérico obrigatório', 'Aspecto leitoso não confirma', 'Falha do C:TG < 1 em gatos', 'Citologia linfocítica evolutiva'],
      },
      {
        title: 'Cirurgia Precoce e Prevenção de Pleurite Fibrosante',
        body: 'A inflamação crônica do quilo sobre os folhetos pleurais deposita fibrina densa e induz pleurite fibrosante irreversível (com mortalidade > 80%). A conduta tradicional de aguardar 1 a 3 meses sob dieta e rutina não possui respaldo em evidências robustas (Reeves et al., 2020); pacientes refratários após 7 a 14 dias devem ser encaminhados para intervenção cirúrgica (TDL).',
        highlights: ['Risco de pleurite fibrosante', 'Revisão sistemática Reeves 2020', 'Evidência fraca de rutina', 'Indicação cirúrgica precoce'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial do Quilotórax',
      steps: [
        {
          label: 'Passo 1: Estabilização e POCUS de Urgência',
          timing: 'Minutos 0 a 15',
          detail: 'Oxigenoterapia passiva em gaiola ou fluxo livre (40 a 60% FiO2) sob mínimo manuseio. Varredura ecográfica torácica focada (TFAST/POCUS) nos pontos CTS e PCS para confirmar derrame pleural anecoico livre antes de qualquer contenção.',
        },
        {
          label: 'Passo 2: Toracocentese Diagnóstica e Terapêutica',
          timing: 'Minutos 15 a 30',
          detail: 'Punção torácica no 7º ou 8º espaço intercostal no terço médio a ventral, rente à borda cranial da costela, com agulha borboleta 21-23 G ou cateter conectado a torneira de 3 vias. Aliviar a mecânica ventilatória e colher amostras em tubos com EDTA e secos.',
        },
        {
          label: 'Passo 3: Bioquímica Comparada (Líquido vs Soro)',
          timing: 'Primeiras 2 a 4 horas',
          detail: 'Dosagem simultânea de triglicerídeos e colesterol na efusão pleural e no soro do paciente (amostras homogeneizadas). Confirmação estabelecida quando TGpleural > TGsérico (frequentemente > 100 mg/dL na presença de quilomícrons pós-prandiais).',
        },
        {
          label: 'Passo 4: Citopatologia da Efusão e Diagnóstico Diferencial',
          timing: 'Primeiras 4 a 12 horas',
          detail: 'Citocentrifugação ou esfregaço direto corado por Wright/Panótico: predomínio de pequenos linfócitos maduros na fase aguda; transição para neutrófilos íntegros e macrófagos vacuolizados na fase crônica. Excluir bactérias intracelulares (piotórax) e blastos atípicos (linfoma).',
        },
        {
          label: 'Passo 5: Ecocardiograma com Doppler Obrigatório',
          timing: 'Primeiras 12 a 24 horas',
          detail: 'Avaliação da anatomia e função cardíaca: mensuração da relação LA:Ao (Severac 2026: mediana de 2,4 prediz cardiopatia em felinos), espessura diastólica do VE (HCM), restrição diastólica (RCM) e descarte de malformações congênitas ou efusão pericárdica.',
        },
        {
          label: 'Passo 6: Imagem Avançada (Radiografia Pós-Drenagem e TC/Linfangiografia)',
          timing: 'Após estabilização hemodinâmica',
          detail: 'Radiografia torácica pós-esvaziamento para avaliar mediastino e contornos pulmonares (detecção de pleurite fibrosante se margens arredondadas). Em candidatos à cirurgia, TC contrastada e CT-linfangiografia interdigital para mapear trajeto do ducto torácico e descartar massas ou trombos de veia cava.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico Escalonado do Quilotórax',
      steps: [
        {
          label: 'Emergência: Descompressão e Suporte Hemodinâmico',
          timing: 'Fase Imediata',
          detail: 'Esvaziamento pleural por toracocentese de alívio. Fluidoterapia intravenosa isotônica guiada por metas de perfusão (cautela extrema em cardiopatas para evitar sobrecarga atrial esquerda). Analgesia multimodal com opioides puros (metadona 0,1 a 0,2 mg/kg IV).',
        },
        {
          label: 'Investigação e Terapia da Doença de Base',
          timing: 'Fase Inicial (24 a 48 h)',
          detail: 'Se confirmada cardiopatia: manejo de ICC com furosemida (se congestão pulmonar), pimobendan, inibidores de ECA e profilaxia antitrombótica com clopidogrel (18,75 mg/gato VO q24h). Se linfoma mediastinal: quimioterapia sistêmica multiagente (L-CHOP/COP). Se trauma: suporte clínico expectante por 7 a 14 dias.',
        },
        {
          label: 'Drenagem Intermitente vs Dreno de Toracostomia Pigtail',
          timing: 'Fase Intermediária (Dias 2 a 7)',
          detail: 'Pacientes com reacumulação lenta e espaçada (semanal) beneficiam-se de toracocenteses intermitentes. Casos com rápida reacumulação diária exigem dreno de toracostomia de pequeno calibre (pigtail 6 F a 8,5 F ou 10 F a 14 F com selo d água) para controle do débito, evitando drenagens traumáticas repetidas.',
        },
        {
          label: 'Manejo Dietético e Adjuvantes Farmacológicos',
          timing: 'Manutenção Clínica',
          detail: 'Dieta nutricionalmente balanceada com teor moderado de gordura (nunca forçar dietas hipolipídicas não palatáveis que induzam anorexia e perda proteica no gato). Rutina oral (50 a 100 mg/kg VO TID) pode ser tentada como adjuvante de baixo risco, ciente de sua evidência científica fraca.',
        },
        {
          label: 'Decisão Cirúrgica Atempada (TDL + Pericardiectomia)',
          timing: 'Entre 7 e 21 dias de falha clínica',
          detail: 'Persistência de produção volumosa de quilo (> 10 a 20 mL/kg/dia) ou sinais de espoliação proteica/pleurite incipiente impõem indicação cirúrgica precoce. Ligadura do ducto torácico (TDL) associada à pericardiectomia subfrênica por toracotomia ou VATS guiada por CT-linfangiografia prévia.',
        },
        {
          label: 'Técnicas de Resgate e Manejo Crônico',
          timing: 'Casos Refratários Pós-Cirurgia',
          detail: 'Em caso de persistência pós-operatória: omentalização pleural, colocação de cateter de acesso pleural vascular subcutâneo (pleural port) para drenagens domiciliárias indolores pelo tutor ou derivação pleuroperitoneal em centros de referência.',
        },
      ],
    },
  },
  etiology: {
    definicaoEConceitoLinfatico: 'O quilotórax define-se pelo acúmulo patológico de quilo na cavidade pleural. O quilo representa uma forma especializada de linfa originada no leito vascular mesentérico e intestinal após a digestão e absorção lipídica. Contém quilomícrons microscópicos (gotículas de triglicerídeos insolúveis envolvidas por fosfolipídios e apolipoproteínas B-48), linfócitos maduros (principalmente células T auxiliares), imunoglobulinas, proteínas plasmáticas, eletrólitos e vitaminas lipossolúveis (A, D, E e K). Em condições fisiológicas normais, a cavidade pleural contém apenas uma película mínima de fluido seroso acelular (0,1 a 0,3 mL/kg) responsável pela lubrificação das superfícies pleurais parietal e visceral durante os ciclos de expansão pulmonar. A invasão contínua de quilo no espaço pleural transforma esse compartimento virtual hermético em um reservatório volumoso e irritante.',
    desmistificacaoDaRupturaDoDucto: 'Durante muitas décadas, ensinou-se na medicina veterinária que o quilotórax decorreria essencialmente de uma ruptura física ou laceração traumática da parede do ducto torácico. Essa visão clássica é incorreta para a vasta maioria dos casos espontâneos. Estudos seminais de linfangiografia contrastada (Kerpsack et al., 1994) em 19 gatos com quilotórax demonstraram que 17 dos 19 pacientes (89,5%) apresentavam linfangiectasia difusa, dilatação ectásica dos vasos mediastinais e extravasamento transmural multifocal de linfa, sem qualquer evidência de fenda ou laceração anatômica no ducto torácico. O extravasamento de quilo ocorre primariamente por hipertensão linfática retrógrada: quando o fluxo linfático é impedido ou a pressão venosa central eleva-se, o gradiente fisiológico que drena a linfa para as veias braquiocefálicas é anulado, gerando contrapressão retrógrada, incompetência das válvulas linfáticas e porosidade endotelial com transudação de quilo através das finas paredes dos vasos linfáticos pleurais.',
    anatomiaEFisiologiaDoDuctoToracico: 'A compreensão da anatomia da circulação linfática é indispensável para interpretar os diferentes mecanismos que produzem o quilotórax:\n\n1. Formação e Trajeto Abdominal:\nOs triglicerídeos de cadeia longa da dieta são digeridos intraluminalmente no intestino delgado por lipases pancreáticas e sais biliares, absorvidos pelos enterócitos e resintetizados no retículo endoplasmático em triglicerídeos, sendo empacotados com colesterol e apolipoproteínas para formar quilomícrons. Os quilomícrons são secretados por exocitose no espaço intersticial da lâmina própria e penetram nos vasos quilíferos centrais das vilosidades intestinais. Desses vasos quilíferos, o quilo flui através dos linfáticos mesentéricos e troncos linfáticos lombares até convergir na cisterna do quilo (cisterna chyli), uma estrutura sacular alongada situada no espaço retroperitoneal dorsal à aorta abdominal, entre a última vértebra torácica e as primeiras vértebras lombares (L1 a L4).\n\n2. Trajeto Torácico do Ducto:\nA cisterna do quilo afunila-se cranialmente para originar o ducto torácico principal, que penetra na cavidade torácica através do hiato aórtico do diafragma. No mediastino caudal, o ducto trafega dorsalmente à aorta torácica e à direita da artéria intercostal dorsal. Conforme avança cranialmente, o ducto pode manter-se à direita ou cruzar para o hemitórax esquerdo ao nível da 4ª a 6ª vértebra torácica. O ducto termina desembocando na circulação venosa sistêmica no ângulo formado pela confluência da veia jugular externa esquerda e veia subclávia (ou diretamente na veia cava cranial).\n\n3. Variações Anatômicas em Pequenos Animais:\nEstudos contemporâneos de CT-linfangiografia (Chiang et al., 2022) revelaram que o ducto torácico felino não apresenta uma rota anatômica fixa e linear única. Em uma coorte de gatos avaliados com contraste iodado interdigital, 72% dos ramos avaliados localizavam-se no hemitórax direito, com múltiplas bifurcações plexiformes colaterais aberrantes. Em cães, o ducto torácico corre classicamente pelo hemitórax direito na região caudal, cruzando para o hemitórax esquerdo próximo à 5ª ou 6ª vértebra torácica. Essa expressiva variabilidade anatômica explica por que ligaduras cirúrgicas convencionais podem falhar se ramos colaterais patentes não forem mapeados e ocluídos.',
    tresMecanismosFisiopatologicosPrimarios: 'Três mecanismos biomecânicos e vasculares fundamentais podem culminar na mesma apresentação de quilotórax:\n\n1. Obstrução Física Mecânica ao Fluxo Linfático:\nCompressão extrínseca do ducto torácico ou de grandes vasos linfáticos por massas mediastinais craniais (linfoma mediastinal, timoma, carcinomas metastáticos, granulomas fúngicos ou abscessos mediastinais), hérnias diafragmáticas (especialmente hérnia peritoneopericárdica - PPDH) ou granulomas vasculares parasitários (Spirocerca lupi em cães). A oclusão mecânica eleva a pressão intraluminal retrógrada no sistema linfático torácico, precipitando linfangiectasia e extravasamento transmural difuso de quilo.\n\n2. Hipertensão Venosa Central e Redução do Gradiente Linfático-Venoso:\nA linfa torácica depende de um gradiente pressórico favorável entre o ducto torácico de baixa pressão e a veia cava cranial para ser escoada no sistema cardiovascular. Qualquer elevação sustentada da pressão venosa central — decorrente de cardiopatias com aumento das pressões de enchimento atriais direitas e esquerdas, cardiomiopatia hipertrófica, restritiva ou dilatada, efusão ou constrição pericárdica, estenose pulmonar, dirofilariose ou trombose da veia cava cranial — anula esse gradiente. O sangue venoso hipertensivo atua como uma barreira hidráulica intransponível, gerando estase linfática, incompetência valvular e transudação de quilo para a pleura.\n\n3. Doença Primária da Arquitetura Linfática (Displasia e Linfangiectasia):\nAnomalias congênitas ou adquiridas estruturais dos próprios canais linfáticos (anomalias linfáticas complexas, displasias linfáticas generalizadas, linfangiomatose ou falha intrínseca das válvulas linfáticas). Nestes casos, o endotélio linfático é fenestrado, tortuoso e incompetente, gerando extravasamento contínuo mesmo na ausência de massas ou hipertensão venosa documentada (Terai et al., 2025).',
    revolucaoEtiologicaFelinaSeverac2026: 'Durante anos, livros-texto tradicionais afirmaram que a maioria absoluta dos casos de quilotórax em felinos era idiopática. O estudo multicêntrico seminal de Severac, Juette & Conversy (2026, JAVMA), que investigou 35 gatos diagnosticados entre 2006 e 2022 em dois centros veterinários de referência, modificou radicalmente essa interpretação clínica:\n\n- Cardiopatia Primária Subjacente: 57% dos gatos (20/35 casos).\n- Causa Verdadeiramente Idiopática: 31% dos gatos (11/35 casos).\n- Neoplasia Torácica (Linfoma/Timoma): 9% dos gatos (3/35 casos).\n- Hérnia Diafragmática Peritoneopericárdica (PPDH): 3% dos gatos (1/35 casos).\n\nAchado Ecocardiográfico Crítico: No estudo de Severac et al. (2026), os felinos com etiologia cardíaca apresentaram uma razão átrio esquerdo/aorta (LA:Ao) mediana de 2,4 (faixa interquartil de 1,9 a 2,7), enquanto os gatos pertencentes aos grupos idiopático, neoplásico e PPDH apresentaram LA:Ao mediano inferior a 1,4. Notavelmente, dentro dessa coorte, TODOS os gatos que apresentavam LA:Ao > 1,4 pertenciam ao grupo cardíaco. Embora se trate de uma coorte retrospectiva referenciada, esse trabalho estabelece que o ecocardiograma completo com Doppler deve ser considerado exame mandatório precoce em qualquer gato com quilotórax, mesmo quando a silhueta cardíaca não se mostre macroscopicamente aumentada na radiografia torácica.',
    tabelaEtiologiaComparada: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Etiologia, Prevalência e Fisiopatologia Comparada do Quilotórax em Gatos versus Cães',
      headers: [
        'Categoria Etiológica',
        'Prevalência e Achados em Gatos (Severac 2026; Fossum 1991)',
        'Prevalência e Achados em Cães (Fossum 2004; Reeves 2020)',
        'Mecanismo Íntimo e Conduta Prioritária',
      ],
      rows: [
        [
          'Cardiopatia Primária e Hipertensão Venosa',
          '57% dos casos em gatos (Severac 2026). Cardiomiopatia hipertrófica (HCM), cardiomiopatia restritiva (RCM), displasia tricúspide e efusão pericárdica. LA:Ao mediano de 2,4.',
          'Menos comum em cães (< 10%). Associada a pericardite constritiva, efusão pericárdica idiopática ou neoplásica e displasia tricúspide grave.',
          'Aumento da pressão venosa central anula a drenagem linfática no ângulo venoso jugular. Conduta: ecocardiograma precoce e controle farmacológico da doença cardíaca.',
        ],
        [
          'Idiopático (Sem Causa Identificável)',
          '31% dos casos em gatos (Severac 2026). Diagnóstico de exclusão após ecocardiograma, TC torácica e citologia normais.',
          'Aproximadamente 70% dos casos em cães. Super-representação marcante de cães da raça Afghan Hound (37,5% dos casos idiopáticos caninos).',
          'Linfangiectasia e ectasia idiopática dos linfáticos mediastinais. Conduta: intervenção cirúrgica (TDL + pericardiectomia) indicada se falha do controle conservador.',
        ],
        [
          'Neoplasias Mediastinais e Pulmonares',
          '9% a 15% dos casos em gatos. Linfoma mediastinal cranial (timo e linfonodos) é o grande diferencial; timoma e carcinomas metastáticos.',
          'Aproximadamente 15% a 20% dos casos em cães. Linfoma mediastinal, timoma, hemangiossarcoma e carcinomas metastáticos de pleura.',
          'Obstrução física direta do ducto torácico e veia cava cranial por invasão ou compressão mecânica. Conduta: citologia/biópsia de massa e quimioterapia (linfoma).',
        ],
        [
          'Anomalias Congênitas e Hérnias Diafragmáticas',
          '3% dos casos em gatos (Hérnia Peritoneopericárdica - PPDH); anomalias linfáticas complexas congênitas (Terai 2025).',
          'Raro em cães; anomalias anatômicas do ducto torácico e cistos linfáticos mediastinais.',
          'Deslocamento visceral e encarceramento transmural comprometem a dinâmica da cisterna do quilo no hiato diafragmático. Conduta: herniorrafia cirúrgica.',
        ],
        [
          'Trauma Mecânico ou Cirúrgico Agudo',
          'Incomum (< 5%). Laceração traumática por atropelamento, projétil, queda de grandes alturas ou lesão iatrogênica em cirurgias torácicas.',
          'Incomum (< 5%). Traumatismo fechado grave com fraturas de costela que laceram o ducto torácico ou cirurgias prévias.',
          'Ruptura mecânica de vasos linfáticos íntegros com saída livre de linfa. Apresenta alta taxa de cicatrização espontânea e cura clínica em 1 a 2 semanas.',
        ],
        [
          'Trombose Venosa e Dirofilariose',
          'Raro em gatos: trombose da veia cava cranial associada a cateteres vasculares venosos centrais ou nefropatia perdedora de proteínas.',
          'Raro em cães: trombose da veia cava cranial associada a síndrome nefrótica, hiperadrenocorticismo e dirofilariose crônica com hipertensão pulmonar.',
          'Oclusão intraluminal do escoamento venoso jugular impede o fluxo da linfa. Conduta: ultrassom vascular/TC, antitrombóticos e terapia da dirofilariose.',
        ],
      ],
    },
  },
  epidemiology: {
    particularidadesFelinas: 'Na espécie felina, o quilotórax atinge principalmente gatos adultos de meia-idade a idosos (idade mediana entre 7 e 9 anos em coortes contemporâneas de cardiopatias, embora gatos com anomalias congênitas ou linfoma possam apresentar-se entre 1 e 3 anos). Não há predisposição racial documentada em felinos domésticos; a maioria dos pacientes acometidos pertence à categoria de pelos curtos domésticos (SRD). Gatos siameses e orientais apresentam suscetibilidade aumentada ao linfoma mediastinal cranial, que pode manifestar-se com quilotórax secundário obstrutivo. Conforme identificado por Severac et al. (2026), idade avançada e hipotermia na admissão clínica constituem variáveis estatisticamente associadas a menor sobrevida global. A presença de sopro cardíaco ou ritmo de galope auscultatório no exame físico inicial eleva substancialmente a probabilidade de cardiopatia subjacente.',
    particularidadesCaninas: 'Na espécie canina, o quilotórax manifesta-se predominantemente em cães adultos (idade mediana de 5 a 8 anos). Há uma predisposição racial histórica clássica e amplamente documentada na literatura: os cães da raça Afghan Hound apresentam risco relativo desproporcionalmente elevado para quilotórax idiopático, representando até 37,5% dos casos idiopáticos caninos em séries seminais (Fossum et al., 1986). Outras raças caninas relatadas com frequência aumentada incluem Mastiff, Bernese Mountain Dog, São Bernardo, Basset Hound e cães de raças de grande porte e tórax profundo. Em contraste com os gatos, a etiologia idiopática permanece como o diagnóstico dominante em cães (~70%), e a resposta ao tratamento cirúrgico com ligadura do ducto torácico e pericardiectomia costuma apresentar taxas de sucesso superiores àquelas observadas em felinos na literatura veterinária (Reeves et al., 2020; Hawker & Singh, 2024).',
    dadosMulticentricosGlobais: 'Estudos multicêntricos e revisões sistemáticas consolidam o perfil epidemiológico e de desfecho do quilotórax:\n\n1. Severac, Juette & Conversy (2026, JAVMA): Coorte com 35 gatos demonstrou sobrevida mediana global de 172 dias para os gatos com causa cardíaca, 416 dias para os gatos com quilotórax idiopático, 38 dias para neoplasias e 27 dias para hérnia peritoneopericárdica. A hipotermia à admissão correlacionou-se negativamente com a sobrevida.\n\n2. Reeves et al. (2020, Veterinary Surgery): Revisão sistemática avaliando 313 artigos identificou 11 estudos elegíveis e 73 felinos avaliáveis. O trabalho concluiu que não existem estudos de alto nível de evidência (classificação GRADE) na espécie felina, e que a evidência disponível não sustenta a superioridade de nenhuma técnica cirúrgica específica nem respalda a terapia conservadora isolada.\n\n3. Dickson et al. (2024, Veterinary Surgery): Estudo retrospectivo multicêntrico em 15 gatos tratados por cirurgia videotoracoscópica (VATS) registrou mortalidade relacionada ao quilotórax de 46,6% (7/15), comprovando que o quilotórax felino permanece uma enfermidade desafiadora mesmo com tecnologias cirúrgicas minimamente invasivas de ponta.\n\n4. Stockdale et al. (2018, JAVMA): Comparação de 22 gatos submetidos a ligadura do ducto torácico com pericardiectomia subfrênica isolada (n=15) versus associada à ablação da cisterna do quilo (CCA, n=7). A adição de CCA aumentou significativamente a duração do ato operatório (mediana de 125 min vs 80 min) sem melhorar a taxa de resolução da efusão em 4 semanas (perspectiva de 3/7 vs 2/15) nem a sobrevida global mediana (380 dias vs 774 dias).',
  },
  pathogenesisTransmission: {
    cascata: [
      '1. Obstrução do fluxo linfático mediastinal (massa neoplásica, hérnia), elevação sustentada da pressão venosa central crânio-cervical (cardiomiopatia felina, pericardiopatia) ou malformação displásica congênita dos vasos linfáticos.',
      '2. Redução crítica ou anulação do gradiente de pressão hidrostática entre o ducto torácico e a confluência venosa jugulossubclávia, gerando estase e contrapressão retrógrada no sistema de drenagem linfática.',
      '3. Sobrecarga pressórica progressiva na cisterna do quilo e no ducto torácico, provocando incompetência das válvulas linfáticas intraluminais e dilatação difusa dos vasos linfáticos pleurais e mediastinais (linfangiectasia torácica).',
      '4. Aumento da porosidade e permeabilidade do endotélio dos vasos linfáticos pleurais dilatados, culminando em transudação e extravasamento transmural contínuo de quilo para o interior da cavidade pleural.',
      '5. Ocupação progressiva do espaço pleural pelo quilo, com elevação da pressão intrapleural acima do nível fisiológico negativo (-5 cmH2O), comprimindo o parênquima pulmonar e provocando atelectasia pulmonar restritiva difusa.',
      '6. Desequilíbrio severo da relação ventilação-perfusão (mismatch V/Q) com shunt intrapulmonar direito-esquerdo, hipoxemia arterial e taquipneia compensatória rápida e superficial com fadiga muscular diafragmática.',
      '7. Espoliação crônica de constituintes linfáticos para o terceiro espaço pleural: esgotamento contínuo de quilomícrons, proteínas plasmáticas (albumina e globulinas), linfócitos T auxiliares (linfopenia) e micronutrientes lipossolúveis.',
      '8. Instalação de caquexia linfática, desnutrição proteico-calórica, imunocomprometimento celular secundário, hipoalbuminemia e desequilíbrios hidroeletrolíticos (hiponatremia e hipercalemia paradoxal pós-drenagens repetidas).',
      '9. Irritação química e mecânica crônica exercida pelos quilomícrons e ácidos graxos sobre o mesotélio pleural, desencadeando pleurite inflamatória crônica com recrutamento de macrófagos e neutrófilos, deposição espessa de fibrina sobre as pleuras visceral e parietal e transição para fibrose restritiva irreversível (pleurite fibrosante ou encarceramento pulmonar).',
    ],
    transmissao: 'O quilotórax não é uma enfermidade infecciosa ou contagiosa e não possui caráter transmissível entre indivíduos. Trata-se de uma síndrome física, biomecânica e vascular secundária a cardiopatias estruturais, neoplasias torácicas obstrutivas, hérnias diafragmáticas, anomalias vasculares displásicas do desenvolvimento embrionário linfático ou quadros idiopáticos adquiridos.',
  },
  pathophysiology: {
    dinamicaDePressaoPleuralERestricao: 'A mecânica ventilatória depende estritamente da manutenção de uma pressão intrapleural negativa permanente (oscilando entre -5 cmH2O na expiração e -10 cmH2O na inspiração) gerada pelo recolhimento elástico centrípeto dos pulmões contra a expansão elástica centrífuga da parede torácica. O acúmulo de quilo no espaço interpleural anula essa pressão negativa, gerando colapso mecânico extrínseco do parênquima pulmonar dependente (atelectasia compressiva pulmonar). Como os pulmões não conseguem expandir-se no espaço ocupado pelo líquido, o volume corrente inspirado cai drasticamente. Para preservar a ventilação-minuto, o centro respiratório no tronco encefálico eleva a frequência respiratória, estabelecendo o padrão respiratório clássico restritivo: respiração rápida, curta, superficial e com recrutamento ativo da musculatura abdominal na expiração.',
    espoliacaoLinfaticaEConsequenciasMetabolicas: 'A linfa torácica que extravasa no quilotórax não é um simples transudato; é um fluido biológico complexo e rico em elementos vitais. A perda contínua e repetida de quilo através do acúmulo pleural e das toracocenteses evacuatórias desencadeia repercussões metabólicas e imunológicas profundas:\n\n1. Depleção Proteica e Hipoalbuminemia:\nO quilo contém concentração proteica significativa (geralmente superior a 2,5 a 3,0 g/dL, podendo atingir 5,0 g/dL), composta por albumina e imunoglobulinas. Drenagens torácicas volumosas e recorrentes drenam gramas de proteína do compartimento vascular, provocando hipoproteinemia progressiva, hipoalbuminemia, redução da pressão coloidosmótica oncótica plasmática e atrofia muscular generalizada (caquexia linfática).\n\n2. Depleção Celular e Imunossupressão (Linfopenia):\nO ducto torácico é a principal via de recirculação dos linfócitos entre o sistema linfóide periférico e a corrente sanguínea sistêmica. Como os pequenos linfócitos T maduros constituem a imensa maioria dos elementos celulares da linfa, o aprisionamento e descarte do quilo induz linfopenia periférica profunda, comprometendo a imunidade celular mediada por linfócitos T e predispondo o paciente a infecções oportunistas secundárias.\n\n3. Perda Lipídica e de Vitaminas Lipossolúveis:\nA incapacidade de reabsorver quilomícrons e ácidos graxos de cadeia longa absorvidos no intestino gera balanço energético negativo constante, emaciação e deficiência progressiva das vitaminas lipossolúveis A, D, E e K (com potencial impacto sobre coagulação e metabolismo ósseo).\n\n4. Distúrbios Hidroeletrolíticos Específicos (Hiponatremia e Hipercalemia):\nConforme descrito em obras de referência em nefrologia e terapia intensiva veterinária (DiBartola, 4ª ed., p. 63 e p. 110; Feline Emergency and Critical Care Medicine, Cap. 32), o quilotórax atua como um terceiro espaço patológico ativo. O extravasamento contínuo de fluido e eletrólitos somado à retirada periódica de grandes volumes por toracocentese estimula a liberação sustentada de hormônio antidiurético (ADH) em resposta à hipovolemia relativa subclínica, promovendo retenção desproporcional de água livre e hiponatremia dilucional. Concomitantemente, a perda continuada de fluidos pleurais ricos em sódio e bicarbonato aliada a alterações de troca iônica celular transmembrana pode precipitar hipercalemia paradoxal em pacientes submetidos a múltiplas drenagens torácicas seriadas.',
    pleuriteFibrosanteRestritivaEncarceramento: 'A complicação mais devastadora e potencialmente letal do quilotórax crônico é a pleurite fibrosante restritiva (também denominada pleurite constritiva ou encarceramento pulmonar fibroso). O contato prolongado e contínuo do quilo com as superfícies mesoteliais pleurais induz inflamação crônica química e mecânica. Os macrófagos pleurais fagocitam gotículas lipídicas e ativam fibroblastos locais mediante secreção contínua de fator de crescimento transformador beta (TGF-beta) e fator de crescimento derivado de plaquetas (PDGF). Ocorre deposição progressiva de densas camadas de fibrina que se organizam em tecido conjuntivo fibroso colagenoso espesso e inelástico sobre a pleura visceral pulmonar. Esse tecido fibroso forma uma verdadeira carapaça ou casca mecânica que aprisiona os lobos pulmonares, impedindo sua reexpansão elástica mesmo após a evacuação completa de todo o líquido pleural por toracocentese. Clinicamente, o paciente com pleurite fibrosante permanece taquipneico e em esforço respiratório severo após a drenagem torácica total, exibindo lobos pulmonares com bordas permanentemente arredondadas e colapsadas à radiografia torácica. O prognóstico após a instalação de pleurite fibrosante restritiva é desfavorável, com mortalidade que ultrapassa 80% dos casos documentados.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Padrão respiratório restritivo com taquipneia rápida e superficial',
          mechanism: 'Ocupação do espaço pleural pelo quilo anula a pressão intrapleural negativa e impede a expansão volumétrica pulmonar, reduzindo o volume corrente e forçando o aumento compensatório da frequência respiratória para preservar a ventilação-minuto.',
          clinicalMeaning: 'Sinal cardeal na admissão de emergência; exige conduta imediata de toracocentese de alívio prévia a qualquer radiografia.',
          priority: 'emergency',
        },
        {
          finding: 'Sons pulmonares e bulhas cardíacas abafados no terço ventral do tórax',
          mechanism: 'O quilo acumula-se por gravidade nos segmentos dependentes cranioventrais do espaço pleural, funcionando como uma barreira acústica líquida que atenua a transmissão sonora do parênquima pulmonar e das válvulas cardíacas para o estetoscópio.',
          clinicalMeaning: 'Achado clássico do exame físico que direciona a suspeita imediata para efusão pleural livre.',
          priority: 'common',
        },
        {
          finding: 'Respiração de boca aberta, ortopneia e extensão da cabeça e pescoço',
          mechanism: 'Fadiga iminente da musculatura respiratória diafragmática e intercostal decorrente de hipoxemia arterial severa por shunt intrapulmonar e redução crítica da complacência torácica.',
          clinicalMeaning: 'Emergência crítica com risco imediato de parada cardiorrespiratória por exaustão ventilatória; exige oxigênio passivo e toracocentese de alívio sem contenção forçada.',
          priority: 'emergency',
        },
        {
          finding: 'Tosse seca crônica ou paroxística',
          mechanism: 'Irritação mecânica crônica das vias aéreas de condução e brônquios lobares pela compressão da efusão pleural e inflamação química mediastinal.',
          clinicalMeaning: 'Sinal frequentemente relatado pelos tutores semanas antes do quadro de dispneia aguda (Fossum et al., 1991).',
          priority: 'common',
        },
        {
          finding: 'Dispneia persistente pós-drenagem e pulmão não reexpansível (Pleurite Fibrosante)',
          mechanism: 'Encarceramento pulmonar fibroso decorrente da organização de fibrina e proliferação colágena visceral inelástica sobre os lobos pulmonares, impedindo a complacência elástica mesmo com vácuo pleural.',
          clinicalMeaning: 'Complicação crônica gravíssima com mortalidade que ultrapassa 80%; indica dano mecânico irreversível.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Ritmo de galope (S3/S4) e sopro sistólico em felinos com quilotórax',
          mechanism: 'Disfunção miocárdica diastólica ou sistólica associada a aumento das pressões de enchimento atriais esquerdas e dereitas na cardiomiopatia felina (HCM, RCM), que eleva a pressão venosa central e impede a drenagem linfática.',
          clinicalMeaning: 'Alerta crucial em gatos: Severac et al. (2026) comprovaram cardiopatia em 57% dos gatos com quilotórax (LA:Ao mediano 2,4 vs < 1,4); impõe ecocardiograma com Doppler.',
          priority: 'emergency',
        },
        {
          finding: 'Distensão jugular persistente e refluxo hepatojugular positivo',
          mechanism: 'Hipertensão venosa central sustentada na veia cava cranial e átrio direito, impedindo o retorno venoso e o escoamento normal do ducto torácico.',
          clinicalMeaning: 'Indica causa cardíaca direita, efusão pericárdica constritiva ou compressão/trombose de veia cava cranial.',
          priority: 'common',
        },
        {
          finding: 'Hipotermia corporal à admissão hospitalar (< 37,5 °C)',
          mechanism: 'Choque cardiogênico ou hipovolêmico distributivo por third spacing com perda maciça de calor e vasoconstrição periférica severa.',
          clinicalMeaning: 'Fator preditor independente de mortalidade hospitalar comprovado na coorte felina de Severac et al. (2026).',
          priority: 'emergency',
        },
        {
          finding: 'Pulso femoral filiforme e taquicardia ou bradicardia descompassada',
          mechanism: 'Redução do volume sistólico efetivo por tamponamento pulmonar ou cardiopatia descompensada concomitante.',
          clinicalMeaning: 'Monitorar perfusão e débito cardíaco com cautela extrema na ressuscitação com fluidos.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Caquexia linfática progressiva com perda de massa muscular magra',
          mechanism: 'Espoliação continuada de quilomícrons ricos em lipídios, aminoácidos e proteínas plasmáticas carreados pelo quilo e extravasados para o espaço pleural, combinada a anorexia secundária à dispneia.',
          clinicalMeaning: 'Exige suporte nutricional precoce e indica urgência na resolução mecânica ou cirúrgica do foco.',
          priority: 'common',
        },
        {
          finding: 'Letargia profunda, fraqueza muscular e intolerância ao exercício',
          mechanism: 'Hipóxia tecidual periférica crônica e desequilíbrios eletrolíticos (hipocalemia ou hiponatremia) somados ao esgotamento energético.',
          clinicalMeaning: 'Reflete cronicidade da doença e depleção sistêmica de eletrólitos e substratos energéticos.',
          priority: 'common',
        },
        {
          finding: 'Anorexia ou hiporexia prolongada',
          mechanism: 'Desconforto respiratório mecânico durante a mastigação e deglutição, náusea associada a reflexo vagal mediastinal e aumento da pressão intratorácica.',
          clinicalMeaning: 'Gatos anoréxicos podem apresentar quilo translúcido ou atípico pela falta de quilomícrons pós-prandiais.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'immunologic',
      findings: [
        {
          finding: 'Linfopenia absoluta no hemograma periférico',
          mechanism: 'Perda maciça e crônica de linfócitos maduros (principalmente células T auxiliares) recirculantes no sistema linfático torácico, que extravasam no espaço pleural e são eliminados pelas drenagens.',
          clinicalMeaning: 'Marcador hematológico clássico da perda linfática crônica; predisposição a infecções oportunistas.',
          priority: 'systemic',
        },
        {
          finding: 'Suscetibilidade aumentada a infecções oportunistas e sepse',
          mechanism: 'Depleção simultânea de imunoglobulinas circulantes e linfócitos T de memória carreados pelo quilo, enfraquecendo a imunidade adaptativa.',
          clinicalMeaning: 'Manter rigor asséptico absoluto em procedimentos invasivos e drenos torácicos.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'metabolic',
      findings: [
        {
          finding: 'Hipoproteinemia com hipoalbuminemia progressiva',
          mechanism: 'Extravasamento contínuo de proteínas séricas ricas em albumina da circulação para a linfa e desta para o espaço pleural (terceiro espaço).',
          clinicalMeaning: 'Acompanhar albumina sérica seriadamente; valores < 1,5 g/dL reduzem a pressão oncótica e aceleram novos derrames.',
          priority: 'common',
        },
        {
          finding: 'Hiponatremia dilucional e hipercalemia paradoxal pós-drenagens repetidas',
          mechanism: 'Secreção não osmótica de ADH estimulada por hipovolemia relativa do third spacing retendo água livre (hiponatremia), associada à espoliação eletrolítica continuada por drenagens torácicas volumosas de repetição (DiBartola, 4ª ed., p. 63 e p. 110).',
          clinicalMeaning: 'Monitorar Na+ e K+ séricos em pacientes submetidos a toracocenteses frequentes antes de instituir reposições empíricas.',
          priority: 'systemic',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem de Emergência, Oxigenoterapia Passiva e Ultrassonografia POCUS/TFAST',
      purpose: 'Identificar prontamente efusão pleural livre em paciente com dispneia restritiva sem submetê-lo ao risco fatal de contenção radiográfica forçada.',
      description: 'Avaliação clínica inicial em distância ("hands-off"). Administração imediata de oxigênio a 40-60% de FiO2 (em gaiola de oxigênio ou por fluxo livre). Posicionar o transdutor ultrassonográfico (microconvexo ou linear de alta frequência) na parede torácica em estação ou decúbito esternal suave nos pontos CTS (pericárdico-cardíaco caudal) e PCS (diafragmático-hepático), confirmando anecogenicidade líquida interpleural e sinal do espaço livre.',
      interpretation: 'Visualização de fluido anecoico ou discretamente particulado separando as pleuras visceral e parietal confirma efusão pleural de urgência; autoriza intervenção descompressiva imediata.',
      limitations: 'O POCUS torácico confirma a presença de líquido, mas não determina sua composição bioquímica nem diferencia quilotórax de piotórax, hemotórax ou transudato de ICC.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Toracocentese Terapêutica e Diagnóstica de Alívio Imediato',
      purpose: 'Descomprimir mecanicamente os pulmões atelectásicos, estabilizar a ventilação e obter amostra líquida para análise bioquímica e citológica prévia a qualquer outro exame.',
      description: 'Realizada no 7º ou 8º espaço intercostal, no terço médio a ventral do tórax para efusão líquida, rente à borda cranial da costela para proteger o feixe vasculonervoso intercostal caudal. Utilizar agulha borboleta (scalp vein) de calibre 21 G a 23 G conectada a torneira de 3 vias e seringa de 20 a 50 mL. Drenar suavemente até o esvaziamento quase completo ou alívio respiratório. Alocar alíquotas em frasco com anticoagulante EDTA (para citologia e contagem celular) e frasco seco sem ativador de coágulo (para dosagem de triglicerídeos, colesterol e cultura microbiológica).',
      interpretation: 'Alívio imediato do esforço respiratório com queda da frequência respiratória comprova sucesso descompressivo. O aspecto macroscópico do líquido é registrado (branco-leitoso, rosado ou turvo).',
      limitations: 'Se o paciente permanecer dispneico após drenagem volumosa, suspeitar imediatamente de pleurite fibrosante restritiva, líquido loculado hermético ou cardiopatia associada com edema pulmonar.',
      isGoldStandard: false,
    },
    {
      stepNumber: 3,
      title: 'Análise Bioquímica Comparativa (Triglicerídeos e Colesterol Pleural versus Sérico)',
      purpose: 'Comprovar categoricamente a natureza quilosa da efusão pleural mediante comparação direta dos lípides pleurais e séricos (padrão ouro confirmatório prático).',
      description: 'Colheita simultânea de amostra de sangue venoso do paciente para obtenção de soro. Centrifugar o sangue e homogeneizar cuidadosamente o líquido pleural (uma vez que os quilomícrons lipídicos podem subir à superfície da amostra). Dosar a concentração de triglicerídeos e colesterol na efusão pleural e no soro pelo mesmo método laboratorial.',
      interpretation: 'Diagnóstico Definitivo Confirmado: Triglicerídeos na efusão pleural estritamente superiores aos triglicerídeos séricos (TGpleural > TGsérico), frequentemente excedendo 100 mg/dL na presença de quilomícrons pós-prandiais (Waddle & Giger, 1990). A relação colesterol:triglicerídeo < 1 apoia a suspeita, mas apresenta especificidade insatisfatória em felinos (até 50% de falsos positivos em derrames não quilosos).',
      limitations: 'Em pacientes anoréxicos crônicos ou sob jejum prolongado, a produção intestinal de quilomícrons cai drasticamente, podendo reduzir os triglicerídeos pleurais a valores baixos ou limítrofes; nesses casos, a alimentação prévia com refeição gordurosa ou eletroforese de lipoproteínas pode ser necessária.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Citopatologia do Líquido Pleural e Diagnóstico Diferencial Celular',
      purpose: 'Avaliar a celularidade da linfa extravasada, monitorar a evolução inflamatória e descartar peremptoriamente processos infecciosos (piotórax) ou neoplásicos (linfoma mediastinal).',
      description: 'Confecção imediata de esfregaços por compressão (squash) e citocentrifugação do líquido preservado em EDTA, corados por panótico rápido ou Wright-Giemsa. Avaliação citológica das linhagens presentes e contagem celular nucleada total (TNCC).',
      interpretation: 'Fase Aguda Recente: Predomínio marcante de pequenos linfócitos maduros íntegros normais (população linfocitária típica da linfa circulante). Fase Crônica Avançada: O contato irritativo prolongado do quilo com a pleura recruta macrófagos volumosos espumosos (lipidizados) e neutrófilos não degenerados íntegros (que podem superar os linfócitos na citologia tardia). Ausência de bactérias intracelulares diferencia do piotórax séptico. Ausência de linfoblastos atípicos descarta linfoma evidente.',
      limitations: 'O predomínio de neutrófilos no quilotórax crônico pode ser falsamente rotulado como piotórax se o veterinário não avaliar a integridade nuclear (ausência de degeneração hidrópica e cariólise) e a ausência de bactérias fagocitadas.',
      isGoldStandard: false,
    },
    {
      stepNumber: 5,
      title: 'Ecocardiografia Transtorácica com Mapeamento Doppler Completo',
      purpose: 'Investigar ativamente etiologia cardíaca subjacente, obrigatória em todos os felinos e caninos com quilotórax.',
      description: 'Exame ecocardiográfico em janelas paraesternais direita e esquerda com animal estabilizado. Mensuração do átrio esquerdo em corte transversal no nível da valva aórtica na diástole inicial (obtenção da razão LA:Ao), avaliação da espessura diastólica do septo interventricular e parede livre do VE, velocidade do fluxo miocárdico tecidual (Doppler tecidual), integridade da valva tricúspide e pesquisa de efusão ou espessamento pericárdico.',
      interpretation: 'Severac et al. (2026) demonstraram que a etiologia cardíaca acomete 57% dos gatos com quilotórax, com LA:Ao mediano de 2,4 vs < 1,4 nos não cardíacos (P < 0,001). Todo gato com LA:Ao > 1,4 deve ser considerado portador de quilotórax de origem cardíaca até prova em contrário.',
      limitations: 'O exame exige estabilidade respiratória prévia por toracocentese; líquido pleural excessivo ou pulmões em colapso acentuado podem dificultar o alinhamento das janelas acústicas.',
      isGoldStandard: false,
    },
    {
      stepNumber: 6,
      title: 'Radiografia Torácica Três Projeções Pós-Drenagem',
      purpose: 'Inspecionar o mediastino cranial, contorno cardíaco e campos pulmonares após o esvaziamento do líquido e pesquisar sinais de pleurite fibrosante restritiva.',
      description: 'Realização de projeções radiográficas laterolateral direita, laterolateral esquerda e ventrodorsal (ou dorsoventral em pacientes estressados) somente após a descompressão torácica prévia. Avaliar a presença de massas no mediastino cranial, aumento da silhueta cardíaca, hérnia diafragmática peritoneopericárdica e contorno das margens pulmonares.',
      interpretation: 'Lobos pulmonares que reexpandem até a parede costal com margens pontiagudas normais descartam encarceramento pleural. Lobos pulmonares que permanecem arredondados e afastados da parede torácica após esvaziamento confirmam pleurite fibrosante restritiva (Nelson & Couto 6ª ed.).',
      limitations: 'Radiografias realizadas antes da drenagem revelam apenas opacificação difusa de tecidos moles e sinal da silhueta com o coração, sendo incapazes de excluir massas mediastinais ou avaliar a silhueta cardíaca.',
      isGoldStandard: false,
    },
    {
      stepNumber: 7,
      title: 'Tomografia Computadorizada Contrastada e CT-Linfangiografia Interdigital',
      purpose: 'Mapeamento anatômico de alta resolução do ducto torácico e colaterais pré-cirúrgicos e descarte de trombos da veia cava cranial ou neoplasias ocultas.',
      description: 'Exame tomográfico multislice com contraste iodado intravenoso para avaliar o mediastino cranial, veias cavas e órgãos intratorácicos. Em candidatos à ligadura cirúrgica do ducto, realiza-se CT-linfangiografia interdigital (Chiang et al., 2022): injeção de contraste iodado hidrossolúvel nos coxins metatarsais ou subcutâneo interdigital dos membros pélvicos sob massagem suave, obtendo cortes seriados aos 5, 10 e 15 minutos para mapear a cisterna do quilo e o trajeto exato do ducto torácico.',
      interpretation: 'Mapeamento da rota do ducto torácico (72% dos ramos localizam-se no hemitórax direito em gatos - Chiang 2022), identificação de ramos colaterais aberrantes e visualização de sítios de linfangiectasia ou extravasamento ativo contrastado.',
      limitations: 'Requer anestesia geral e equipamento tomográfico de alta resolução em centros especializados de referência; edema transitório moderado dos membros pélvicos pode ocorrer após injeção nos coxins.',
      isGoldStandard: false,
    },
  ],
  treatment: {
    estabilizacaoDeEmergenciaERegraHandsOff: 'A abordagem inicial do paciente admitido com dispneia restritiva por efusão pleural deve seguir rigorosamente a regra do mínimo manuseio (hands-off). A oxigenoterapia imediata em gaiola de oxigênio ou por fluxo livre (40 a 60% de FiO2) deve ser instituída de imediato. A contenção física estressante para posicionamento radiográfico é terminantemente contraindicada em pacientes instáveis: gatos em colapso ventilatório submetidos à força ao decúbito para radiografia evoluem frequentemente para parada cardiorrespiratória iatrogênica irreversível por exaustão diafragmática. A toracocentese diagnóstica e terapêutica de alívio guiada por POCUS/TFAST deve preceder qualquer outro exame complementar de imagem.',
    toracocenteseVersusDrenoPermanente: 'A decisão entre realizar toracocenteses intermitentes ou inserir tubo de toracostomia permanente (dreno torácico) depende estritamente da velocidade de reacumulação do quilo e do estado clínico do paciente:\n\n1. Toracocentese Intermitente com Agulha:\nIndicada em pacientes com reacumulação lenta e progressiva, que permanecem confortáveis por dias ou semanas entre procedimentos e nos quais se aguarda a resposta ao tratamento da causa de base (por exemplo, compensação de cardiopatia ou resposta quimioterápica em linfoma). Apresenta menor custo, não exige internação permanente nem uso de colar elizabetano e evita as complicações associadas a drenos mantidos.\n\n2. Tubo de Toracostomia de Pequeno Calibre (Pigtail / Seldinger):\nIndicado em pacientes que reacumulam grandes volumes rapidamente (exigindo toracocenteses diárias repetidas), pacientes internados em UTI em fase de monitoramento quantitativo estrito do débito ou em preparo perioperatório. Recomenda-se o uso de cateteres torácicos de poliuretano com ponta em pigtail (calibre de 6 F a 8,5 F em gatos e cães pequenos, ou 10 F a 14 F em cães maiores) inseridos pela técnica guiada por fio (Seldinger). Conforme documentado no BSAVA Guide to Procedures (2024), tubos finos tipo pigtail causam menor trauma e dor tecidual, embora possam dobrar ou ocluir com fibrina caso não sejam heparinizados ou aspirados suavemente com frequência. O dreno é conectado a uma torneira de 3 vias e aspirado intermitentemente a cada 4 a 8 horas com técnica rigorosamente asséptica. A manutenção prolongada e desnecessária de drenos permanentes é contraindicada pelo risco ampliado de pleurite bacteriana iatrogênica e pela espoliação acelerada de proteínas plasmáticas e linfócitos.',
    terapiaEtiologicaDirecionada: 'A identificação e resolução da causa primária subjacente é o pilar terapêutico de maior impacto clínico no quilotórax:\n\n1. Cardiopatias em Felinos (HCM, RCM, Doença Valvar):\nConforme comprovado por Severac et al. (2026), 57% dos gatos com quilotórax são cardiopatas descompensados. O manejo farmacológico visa reduzir as pressões de enchimento atriais e normalizar a drenagem linfática venosa: Pimobendan (0,15 a 0,3 mg/kg VO BID em cardiomiopatias com disfunção sistólica ou fenótipo dilatado/restritivo); Inibidores da ECA (Enalapril 0,25 a 0,5 mg/kg VO q12-24h ou Benazepril 0,25 a 0,5 mg/kg VO q24h); Furosemida (1 a 2 mg/kg IV/IM/VO q8-12h apenas se houver congestão venosa pulmonar documentada); Profilaxia antitrombótica estrita com Clopidogrel (18,75 mg/gato VO q24h) associado a Heparina de Baixo Peso Molecular (Enoxaparina 1 mg/kg SC q8-12h) em átrios gravemente dilatados para prevenção de tromboembolismo aórtico.\n\n2. Linfoma Mediastinal e Neoplasias:\nO linfoma mediastinal em cães e gatos é altamente quimiossensível. A instituição imediata de quimioterapia sistêmica multiagente (protocolos L-CHOP ou COP com ciclofosfamida, vincristina e prednisona) promove redução tumoral rápida e descompressão do ducto torácico e veia cava cranial, com cessação completa do extravasamento de quilo sem qualquer indicação de toracotomia.\n\n3. Hérnias Diafragmáticas (PPDH):\nRedução cirúrgica eletiva dos órgãos herniados e herniorrafia com reconstituição do diafragma restabelecem a anatomia da cisterna do quilo no hiato aórtico diafragmático.\n\n4. Trauma Isolado Recente:\nCasos decorrentes de traumatismos mecânicos agudos comprovados devem ser mantidos em suporte clínico conservador por 7 a 14 dias: a cicatrização vascular natural e o selamento dos vasos linfáticos lacerados promovem cura espontânea em grande parte dos casos traumáticos verdadeiros (Nelson & Couto 6ª ed.).',
    analiseCriticaDaDietaHipolipidicaETriglicerideos: 'O manejo dietético hipolipídico é amplamente ensinado na rotina veterinária, mas seu valor clínico real deve ser compreendido com rigor científico:\n\n1. Racional Biológico e Limitações:\nA restrição lipídica na dieta diminui a formação intraluminal de quilomícrons nos enterócitos, tornando o quilo extravasado menos turvo e com menor concentração de triglicerídeos. Contudo, estudos fisiológicos e a revisão crítica de Nelson & Couto (6ª ed., p. 375) destacam que a redução da gordura alimentar NÃO diminui o volume total de linfa produzido diariamente pelo organismo (que depende fundamentalmente da reabsorção hídrica intestinal e do retorno circulatório). Portanto, uma dieta com moderado teor lipídico pode ser utilizada como medida adjuvante, mas dificilmente será capaz de promover a cura isolada de um quilotórax idiopático grave.\n\n2. Advertência Nutricional Vital em Gatos:\nNa espécie felina, o médico veterinário NUNCA deve forçar a aceitação de rações comerciais hiperrestritas em gordura se o paciente apresentar hiporexia ou relutância alimentar. Gatos portadores de quilotórax já estão em balanço calórico negativo e espoliação proteica contínua. Forçar uma dieta com baixa palatabilidade precipita lipidose hepática secundária e desnutrição grave. Prioriza-se sempre a manutenção da densidade calórica e da ingestão de proteínas de alto valor biológico.\n\n3. Contraindicação de Triglicerídeos de Cadeia Média (MCTs):\nNa medicina humana, os MCTs são utilizados porque são absorvidos diretamente na circulação portal hepática, contornando os vasos quilíferos. Todavia, Nelson & Couto (6ª ed.) adverte explicitamente que pesquisas em cães comprovaram que os MCTs penetram no ducto torácico canino, não havendo qualquer evidência de bypass linfático comprovado em gatos. A suplementação empírica de MCTs em pequenos animais não é respaldada pela literatura veterinária.',
    analiseCriticaDaRutinaEFarmacologia: 'A rutina (rutosídeo) é um fitoterápico flavonoide derivado de plantas (composto por quercetina e rutinose) amplamente prescrito na rotina clínica veterinária:\n\n1. Mecanismo Proposto e Nível de Evidência Científica:\nHistoricamente, atribui-se à rutina a capacidade de estimular a proteólise por macrófagos teciduais, acelerando a digestão enzimática de proteínas coloides acumuladas no espaço pleural e favorecendo a sua reabsorção pelos vasos linfáticos e microvasos. No entanto, esse mecanismo nunca foi cabalmente comprovado in vivo na espécie felina com quilotórax. A prescrição empírica habitual fundamenta-se primordialmente em uma série de casos publicada por Thompson, Cohn & Jordan (1999) avaliando apenas 4 gatos com quilotórax idiopático: 3 apresentaram melhora clínica e 2 obtiveram resolução completa, sem grupo controle, sem randomização e com a possibilidade concreta de remissões espontâneas. A revisão sistemática GRADE de Reeves et al. (2020) classificou o nível de evidência da rutina como fraco a muito fraco.\n\n2. Farmacologia e Ausência em Monografias Oficiais:\nNão existe monografia de rutina no Plumb s Veterinary Drug Handbook (10ª ed.) nem no BSAVA Small Animal Formulary (10ª ed.). A posologia descrita em compêndios de medicina interna (Nelson & Couto 6ª ed.; Feline ECC 2ª ed.) é de 50 a 100 mg/kg por via oral a cada 8 horas (TID).\n\n3. Recomendação Editorial Vetius:\nA rutina pode ser mantida como terapia oral adjuvante pelo seu baixo custo e perfil favorável de segurança clínica. Entretanto, o clínico NUNCA deve utilizá-la como argumento para postergar por semanas ou meses a investigação de causas de base (como cardiopatias) ou a indicação de cirurgia atempada.',
    manejoHidroeletroliticoETransfusional: 'A reposição volêmica e o suporte eletrolítico devem ser estritamente individualizados de acordo com a condição hemodinâmica do paciente:\n\n1. Cautela com Fluidoterapia em Cardiopatas:\nEm gatos com cardiomiopatia subjacente comprovada (Severac et al., 2026), a fluidoterapia intravenosa agressiva é extremamente perigosa e contraindicada, pois a sobrecarga de volume eleva abruptamente a pressão no átrio esquerdo e desencadeia edema pulmonar agudo cardiogênico fulminante. A fluidoterapia deve ser mantida apenas com cristaloides isotônicos em taxa estrita de manutenção (2 a 3 mL/kg/h) se houver desidratação clínica documentada.\n\n2. Correção de Hiponatremia e Hipercalemia de Terceiro Espaço:\nEm pacientes crônicos desidratados por drenagens repetidas, a mensuração periódica de sódio e potássio séricos é mandatória (DiBartola 4ª ed.). A hiponatremia deve ser corrigida lentamente com Ringer Lactato ou NaCl 0,9%, sem ultrapassar a variação sérica de sódio de 10 a 12 mEq/L nas primeiras 24 horas para evitar mielinólise pontina central. A hipercalemia de drenagem responde à restauração da perfusão e suspensão temporária de retenções de quilo.\n\n3. Manejo da Hipoalbuminemia Severa:\nSe a concentração de albumina sérica cair abaixo de 1,5 g/dL em virtude de perdas repetidas de quilo, a perda de pressão oncótica favorece o surgimento de ascite e edema periférico. A administração de Plasma Fresco Congelado (FFP na dose de 10 a 15 mL/kg IV lenta) ou concentrado de albumina sérica restaura a pressão oncótica e repõe fatores da coagulação e imunoglobulinas consumidos.',
    momentoOtimoDaIntervencaoCirurgica: 'Durante muito tempo, manuais antigos de cirurgia recomendavam aguardar entre 1 e 3 meses de tratamento clínico conservador antes de considerar a intervenção cirúrgica. A literatura contemporânea (Reeves et al., 2020; Hawker & Singh, 2024) superou categoricamente esse paradigma temporal rígido:\n\n1. Risco Iminente de Pleurite Fibrosante Irreversível:\nA espera cega de 3 meses expõe o paciente ao risco gravíssimo de desenvolver pleurite fibrosante restritiva (encarceramento pulmonar). Uma vez que os pulmões tornam-se encarcerados por fibrina e colágeno inelástico, mesmo uma ligadura cirúrgica perfeita do ducto torácico será incapaz de devolver a expansão pulmonar, culminando em eutanásia por insuficiência respiratória crônica.\n\n2. Critérios Modernos para Encaminhamento Cirúrgico Precoce:\nRecomenda-se a avaliação e encaminhamento cirúrgico em 7 a 21 dias nos pacientes com quilotórax idiopático que preencham um ou mais dos seguintes critérios objetivos:\n- Produção persistente de quilo superior a 10 a 20 mL/kg/dia após 7 a 14 dias de suporte médico.\n- Necessidade contínua de toracocenteses frequentes a cada 2 a 4 dias para prevenir dispneia restritiva.\n- Queda progressiva da albumina sérica (< 2,0 g/dL) ou perda de peso e escore de condição corporal (caquexia linfática).\n- Detecção radiográfica de arredondamento incipiente das bordas pulmonares, sugerindo espessamento pleural visceral precoce.',
    tecnicasCirurgicasLigaduraEPericardiectomia: 'O tratamento cirúrgico definitivo do quilotórax idiopático visa ocluir o fluxo linfático através do tórax e redirecionar a linfa para novas anastomoses linfaticovenosas abdominais saudáveis:\n\n1. Ligadura do Ducto Torácico (TDL - Thoracic Duct Ligation):\nConstitui o procedimento cirúrgico nuclear inegociável. A ligadura em massa dos tecidos mediastinais dorsais (incluindo ducto torácico, aorta e tecido adiposo retropleural) no mediastino caudal (10º ao 8º espaço intercostal) interrompe a passagem de quilo para o tórax cranial. Em gatos, o acesso por toracotomia intercostal direita caudal ou esternotomia mediana é preferido, considerando que até 72% dos ramos do ducto felino cursam pelo hemitórax direito (Chiang et al., 2022). O uso de indocianina verde (ICG) intraoperatória sob fluorescência no infravermelho próximo (NIR) permite visualizar em tempo real todos os ramos colaterais pérvios, elevando as taxas de oclusão completa (Hawker & Singh, 2024).\n\n2. Pericardiectomia Subfrênica Associada:\nA pericardiectomia remove a porção do saco pericárdico situada ventralmente aos nervos frênicos. Seu fundamento fisiopatológico baseia-se na constatação de que o quilotórax crônico induz espessamento e inflamação do pericárdio parietal, reduzindo a complacência ventricular diastólica e elevando a pressão venosa central sistêmica. A abertura do pericárdio alivia a contrapressão sobre o átrio direito e facilita a abertura de shunts linfaticovenosos funcionais no abdome (Fossum et al., 2004).\n\n3. Papel da Ablação da Cisterna do Quilo (CCA - Cisterna Chyli Ablation):\nA incisão cirúrgica e destruição da cisterna do quilo no abdome cranial foi historicamente proposta para reduzir a pressão linfática a montante. Contudo, o estudo felino controlado de Stockdale et al. (2018, JAVMA) comparou 22 gatos tratados por TDL + pericardiectomia com ou sem CCA e comprovou que a adição de CCA aumentou expressivamente o tempo cirúrgico (125 vs 80 min) sem promover nenhum benefício em termos de sobrevida mediana (380 vs 774 dias) ou taxa de resolução da efusão. Portanto, a CCA não é considerada obrigatória na espécie felina.\n\n4. Cirurgia Videotoracoscópica Minimamente Invasiva (VATS):\nA abordagem por VATS tem ganhado espaço em hospitais universitários para realização de TDL e pericardiectomia assistida por vídeo. O estudo multicêntrico de Dickson et al. (2024) com 15 gatos submetidos a VATS TDL demonstrou viabilidade técnica (taxa de conversão aberta de 13%), mas registrou mortalidade relacionada ao quilotórax de 46,6% (7/15), reiterando que a intervenção minimamente invasiva reduz o trauma parietal cirúrgico, mas não elimina a gravidade biológica intrínseca do quilotórax felino.',
    terapiasDeResgateEProcedimentosAvancados: 'Em pacientes que mantêm produção persistente de quilo após a ligadura cirúrgica do ducto torácico (falha terapêutica ou colaterais aberrantes), opções cirúrgicas e intervencionistas de resgate são descritas:\n\n1. Omentalização Pleural:\nTransposição de um pedículo vascularizado do omento maior abdominal através de uma incisão transdiafragmática até a cavidade pleural. O omento possui rica rede vascular capilar e linfática fenestrada capaz de absorver ativamente o fluido pleural remanescente.\n\n2. Cateteres Subcutâneos de Acesso Pleural (Pleural Ports):\nDispositivos implantáveis com câmara subcutânea conectada a um tubo de toracostomia multiperfurado intrapleural. Permite ao médico veterinário ou ao próprio tutor realizar toracocenteses evacuatórias domiciliares indolores e estéreis através da punção da membrana de silicone subcutânea com agulha de Huber, garantindo excelente controle paliativo da dispneia em animais inoperáveis.\n\n3. Embolização Percutânea do Ducto Torácico (Glueing):\nTécnica intervencionista radioguiada com canulação transabdominal da cisterna do quilo e injeção de cola de cianoacrilato associada a lipiodol para oclusão intraluminal direta dos ramos do ducto torácico em centros especializados.',
    terapiasInadequadasEPraticasContraindicadas: 'Condutas clínicas formalmente contraindicadas e armadilhas que devem ser evitadas:\n\n- Administrar furosemida de rotina para secar o quilo: diuréticos de alça não reduzem a permeabilidade dos linfáticos nem tratam quilotórax idiopático; são indicados unicamente se houver insuficiência cardíaca congestiva com hipertensão venosa comprovada.\n- Manter o paciente sob drenagens torácicas repetidas por meses esperando a ação da dieta e rutina: conduta negligente que induz pleurite fibrosante restritiva fatal e caquexia por espoliação proteico-linfocitária crônica.\n- Conter animais dispneicos em decúbito forçado para radiografia torácica antes da descompressão: causa frequente de óbito agudo por exaustão diafragmática em felinos.\n- Confiar exclusivamente na aparência leitosa do líquido para firmar o diagnóstico: derrames sépticos e neoplásicos podem mimetizar o aspecto leitoso, e gatos em jejum podem apresentar quilo límpido.\n- Prescrever suplementação de MCTs sem comprovação de eficácia em cães e gatos.',
    monitoramentoAmbulatorialEPrognostico: 'O monitoramento do paciente com quilotórax exige vigilância rigorosa à beira do leito e no domicílio:\n\n1. Parâmetros Ambulatoriais Domiciliares pelo Tutor:\nO parâmetro mais sensível de monitoramento domiciliar é a contagem da Frequência Respiratória em Repouso (FRR) enquanto o animal dorme profundamente. A FRR normal deve manter-se abaixo de 30 movimentos por minuto. Qualquer elevação sustentada acima de 35 a 40 mpm durante o sono sinaliza reacumulação do derrame pleural e impõe avaliação veterinária de emergência imediata.\n\n2. Monitoramento Hospitalar Seriado:\nAcompanhamento semanal a quinzenal do peso corporal, escore de condição corporal (BCS), escore de massa muscular (MCS), concentração sérica de albumina, hematócrito, linfócitos absolutos e eletrólitos (sódio e potássio).\n\n3. Prognóstico Global:\nO prognóstico do quilotórax é reservado e depende fundamentalmente da etiologia subjacente e da presença de pleurite fibrosante. Na coorte de Severac et al. (2026), a sobrevida mediana foi de 416 dias para os gatos idiopáticos, 172 dias para os gatos com causa cardíaca, 38 dias para neoplasias e 27 dias para hérnia diafragmática. A presença de hipotermia na admissão ou o desenvolvimento de pleurite fibrosante restritiva associam-se a mortalidade superior a 80%.',
  },
  complications: {
    pleuriteFibrosanteRestritiva: 'Formação de casca colágena inelástica sobre a pleura visceral que impede a expansão pulmonar após a drenagem torácica; mortalidade > 80%.',
    caquexiaLinfaticaEPerdaProteica: 'Perda maciça continuada de triglicerídeos, quilomícrons, albumina e imunoglobulinas no líquido drenado, induzindo atrofia muscular e hipoalbuminemia severa.',
    disturbiosEletroliticosTerceiroEspaco: 'Hiponatremia dilucional por retenção não osmótica de água livre mediada por ADH e hipercalemia paradoxal associada a drenagens torácicas volumosas de repetição.',
    imunossupressaoPorLinfopenia: 'Depleção crônica de linfócitos T maduros auxiliares que recirculam pelo ducto torácico, predispondo o paciente a infecções bacterianas oportunistas secundárias.',
    pneumotoraxIATROGENICOELaceracaoPulmonar: 'Pneumotórax iatrogênico por punção pulmonar durante toracocenteses repetidas ou desposicionamento acidental de tubos de toracostomia.',
    piotoraxSecundarioIatrogenico: 'Contaminação bacteriana da cavidade pleural introduzida através de drenos torácicos mantidos sem assepsia estrita ou toracocenteses repetidas.',
  },
  prevention: {
    deteccaoPrecoceDeCardiopatias: 'Realizar triagem ecocardiográfica e ausculta criteriosa em felinos com histórico de cansaço ou tosse, permitindo o diagnóstico de cardiomiopatias antes da instalação de descompensação linfática.',
    intervencaoCirurgicaOportuna: 'Encaminhar pacientes refratários ao suporte inicial precocemente para cirurgia torácica (TDL + pericardiectomia) antes da organização de fibrina e instalação de pleurite fibrosante restritiva.',
    profilaxiaAntitromboticaEmCardiopatas: 'Prescrição de clopidogrel (18,75 mg/gato VO q24h) em felinos com aumento atrial moderado a severo para prevenir tromboembolismo venoso cranial e da artéria pulmonar.',
    evitarDrenagensAgressivasDesnecessarias: 'Programar toracocenteses somente quando houver indicação ventilatória clínica clara, minimizando perdas proteicas e lesões mecânicas pleurais.',
    monitoramentoContinuoDaFRRDomiciliar: 'Capacitar os tutores na contagem diária da frequência respiratória em repouso dormindo (< 30 mpm) para intervenção imediata antes de quadros de hipoxemia crítica.',
  },
  figures: [
    figura1AspectoMacroscopicoTerai2025,
    figura2CtLinfangiografiaTerai2025,
    figura3AnatomiaDuctoWellcome,
    figura4HistopatologiaTerai2025,
    figura5Reconstrucao3dTerai2025,
  ],
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'linfoma-mediastinal-caes-gatos',
    'piotorax-caes-gatos',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'cardiomiopatia-restritiva-felina',
    'cardiomiopatia-dilatada-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'furosemida',
    'pimobendan',
    'clopidogrel',
    'enoxaparina-heparinas-baixo-peso',
    'bupivacaina',
  ],
  references: [
    {
      id: 'ref-severac-2026',
      citationText: 'SEVERAC, L.; JUETTE, T.; CONVERSY, B. Cardiac etiology is the leading cause of feline chylothorax: 35 cases (2006–2022). Journal of the American Veterinary Medical Association (JAVMA), v. 264, n. 4, p. 1-8, 2026.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.2460/javma.26.01.0029',
      notes: 'Estudo multicêntrico demonstrando que 57% dos gatos com quilotórax apresentam cardiopatia como causa primária, com razão LA:Ao mediano de 2,4 vs < 1,4 nos não cardíacos (P < 0,001), quebrando o paradigma clássico de predomínio idiopático.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-reeves-2020',
      citationText: 'REEVES, L. A. et al. Treatment of idiopathic chylothorax in dogs and cats: A systematic review. Veterinary Surgery, v. 49, n. 1, p. 70-79, 2020.',
      sourceType: 'Revisão Sistemática',
      url: 'https://doi.org/10.1111/vsu.13322',
      notes: 'Revisão sistemática de 313 artigos avaliando 73 felinos; concluiu pela ausência de estudos felinos de alto nível de evidência pelo sistema GRADE e comprovou que não há respaldo científico sustentando tratamento médico isolado ou superioridade de técnica cirúrgica específica.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-hawker-singh-2024',
      citationText: 'HAWKER, W.; SINGH, A. Advances in the Treatment of Chylothorax. Veterinary Clinics of North America: Small Animal Practice, v. 54, n. 4, p. 707-720, 2024.',
      sourceType: 'Revisão de Especialidade',
      url: 'https://doi.org/10.1016/j.cvsm.2024.02.006',
      notes: 'Revisão atualizada sobre avanços na abordagem do quilotórax em pequenos animais, destacando a CT-linfangiografia pré-operatória e o uso intraoperatório de indocianina verde (ICG) com fluorescência infravermelha para guiar a ligadura do ducto torácico.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-dickson-2024',
      citationText: 'DICKSON, R. et al. Outcome of video-assisted thoracoscopic treatment of idiopathic chylothorax in 15 cats. Veterinary Surgery, v. 53, n. 5, p. 852-859, 2024.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.1111/vsu.14098',
      notes: 'Estudo multicêntrico em 15 gatos tratados por videotoracoscopia (VATS); registrou mortalidade relacionada ao quilotórax de 46,6%, demonstrando a viabilidade da técnica minimamente invasiva, mas a persistência de prognóstico reservado no quilotórax felino.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-stockdale-2018',
      citationText: 'STOCKDALE, S. L. et al. Comparison of thoracic duct ligation plus subphrenic pericardiectomy with or without cisterna chyli ablation for treatment of idiopathic chylothorax in cats. Journal of the American Veterinary Medical Association (JAVMA), v. 252, n. 8, p. 976-981, 2018.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.2460/javma.252.8.976',
      notes: 'Avaliação comparativa de 22 gatos comprovando que a adição de ablação da cisterna do quilo (CCA) à ligadura do ducto torácico com pericardiectomia prolongou o ato cirúrgico (125 vs 80 min) sem melhorar a taxa de resolução da efusão ou a sobrevida.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-chiang-2022',
      citationText: 'CHIANG, C. et al. Computed tomography lymphangiography via intrametatarsal pad injection is feasible in cats with chylothorax. American Journal of Veterinary Research (AJVR), v. 83, n. 2, p. 133-139, 2022.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.2460/ajvr.21.10.0163',
      notes: 'Estudo demonstrando que 72% dos ramos do ducto torácico felino situam-se no hemitórax direito à CT-linfangiografia interdigital, alertando o cirurgião para variações anatômicas frequentes que determinam falhas de ligaduras cegas.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fossum-2004',
      citationText: 'FOSSUM, T. W. et al. Thoracic duct ligation and pericardectomy for treatment of idiopathic chylothorax. Journal of Veterinary Internal Medicine (JVIM), v. 18, n. 3, p. 307-310, 2004.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.1111/j.1939-1676.2004.tb02550.x',
      notes: 'Estudo seminal demonstrando a fundamentação fisiopatológica da associação da pericardiectomia à ligadura do ducto torácico para alívio de contrapressão venosa central em cães e gatos.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-waddle-giger-1990',
      citationText: 'WADDLE, J. R.; GIGER, U. Lipoprotein electrophoresis differentiation of chylous and nonchylous pleural effusions in dogs and cats. Veterinary Clinical Pathology, v. 19, n. 4, p. 121-127, 1990.',
      sourceType: 'Artigo Científico',
      url: 'https://doi.org/10.1111/j.1939-165X.1990.tb00548.x',
      notes: 'Validação da eletroforese de lipoproteínas e comprovação de que TGpleural > 100 mg/dL e TGpleural > TGsérico são critérios confiáveis, demonstrando também que a relação colesterol:triglicerídeo < 1 apresenta até 50% de falso-positivos em felinos.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-terai-2025',
      citationText: 'TERAI, K. et al. Complex Lymphatic Anomaly Presenting with Chylothorax, Chylous Ascites, and Generalized Subcutaneous Edema in a Young Cat: Comparative Insights Based on the Human ISSVA Classification. Veterinary Sciences, v. 12, n. 12, art. 1199, 2025.',
      sourceType: 'Relato de Caso e Revisão',
      url: 'https://doi.org/10.3390/vetsci12121199',
      notes: 'Demonstração por CT-linfangiografia e histopatologia de anomalia linfática complexa comparada à classificação vascular humana da ISSVA, evidenciando etiologia estrutural congênita em felino jovem com quilotórax.',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-thompson-1999',
      citationText: 'THOMPSON, M. S.; COHN, L. A.; JORDAN, R. C. Use of rutin for medical management of idiopathic chylothorax in four cats. Journal of the American Veterinary Medical Association (JAVMA), v. 215, n. 3, p. 345-348, 1999.',
      sourceType: 'Série de Casos',
      url: 'https://doi.org/10.2460/javma.1999.215.03.345',
      notes: 'Série histórica em 4 gatos que popularizou o uso da rutina (50-100 mg/kg VO TID); evidência fraca sem grupo controle, destacando a necessidade de cautela ao indicar o fármaco como terapia exclusiva.',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-kerpsack-1994',
      citationText: 'KERPSACK, S. J. et al. Evaluation of mesenteric lymphangiography and thoracic duct ligation in cats with chylothorax: 19 cases (1987-1992). Journal of the American Veterinary Medical Association (JAVMA), v. 205, n. 10, p. 1444-1447, 1994.',
      sourceType: 'Artigo Científico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/7989240/',
      notes: 'Comprovação seminal de que 17 de 19 gatos com quilotórax apresentavam linfangiectasia à linfangiografia, e nenhum apresentava evidência de ruptura do ducto torácico.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-nelson-couto-2020',
      citationText: 'NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6. ed. St. Louis: Elsevier, 2020. Cap. 23 (p. 360-363) e Cap. 24 (p. 374-376).',
      sourceType: 'Livro-Texto',
      url: null,
      notes: 'Referência fundamental para propedêutica de efusões pleurais, diferenciação laboratorial de quilo, abordagem da pleurite fibrosante e análise crítica de dietas e rutina.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-drobatz-feline-ecc-2023',
      citationText: 'DROBATZ, K. J. et al. Feline Emergency and Critical Care Medicine. 2. ed. Hoboken: Wiley-Blackwell, 2023. Cap. 10 (p. 93-107) e Cap. 32 (p. 374-381).',
      sourceType: 'Livro-Texto',
      url: null,
      notes: 'Guia de excelência para emergências respiratórias felinas, manejo de estresse na admissão, toracocentese pré-radiográfica e distúrbios de sódio e potássio no third spacing.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-dibartola-fluid-2012',
      citationText: 'DIBARTOLA, S. P. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4. ed. St. Louis: Saunders Elsevier, 2012. Cap. 3 (p. 63) e Cap. 5 (p. 110).',
      sourceType: 'Livro-Texto',
      url: null,
      notes: 'Tratado de referência que detalha a fisiopatologia da hiponatremia por perda para terceiro espaço e a hipercalemia paradoxal associada a repetidas drenagens torácicas volumosas de quilo.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-withrow-macewen-2020',
      citationText: 'VAIL, D. M.; THAMM, D. H.; LIPTAK, J. M. Withrow & MacEwen s Small Animal Clinical Oncology. 6. ed. St. Louis: Elsevier, 2020. Cap. 33 (p. 724).',
      sourceType: 'Livro-Texto',
      url: null,
      notes: 'Referência oncológica detalhando a ocorrência de efusão quilosa por compressão mecânica do ducto torácico em cerca de 50% dos felinos com linfoma mediastinal.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bsava-procedures-2024',
      citationText: 'BRITISH SMALL ANIMAL VETERINARY ASSOCIATION. BSAVA Guide to Procedures in Small Animal Practice. 3. ed. Gloucester: BSAVA, 2024. p. 259-273.',
      sourceType: 'Manual de Procedimentos',
      url: null,
      notes: 'Protocolos operacionais e ilustrados para toracocentese emergencial e inserção de tubos de toracostomia convencionais e de pequeno calibre (small-bore wire-guided).',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumb-2023',
      citationText: 'PLUMB, D. C. Plumb s Veterinary Drug Handbook. 10. ed. Ames: Wiley-Blackwell, 2023.',
      sourceType: 'Compêndio Farmacológico',
      url: null,
      notes: 'Referência toxicológica e farmacológica para dosagens, vias de administração, farmacocinética e contraindicações formais de pimobendan, furosemida, clopidogrel e enoxaparina.',
      evidenceLevel: 'A',
    },
  ],
};
