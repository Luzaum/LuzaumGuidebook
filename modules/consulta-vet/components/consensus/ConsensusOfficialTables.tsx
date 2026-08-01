import React from 'react';
import { Info } from 'lucide-react';

type ConsensusTable = {
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

type ConsensusTableSet = {
  intro?: string;
  tables: ConsensusTable[];
  notes?: string[];
};

const TABLES_BY_SLUG: Record<string, ConsensusTableSet> = {
  'acvim-mmvd-canina-2019': {
    intro: 'Matriz clínica adaptada do estadiamento ACVIM 2019.',
    tables: [
      {
        title: 'Estadiamento da doença valvar mitral',
        columns: ['Critério', 'A', 'B1', 'B2', 'C', 'D'],
        rows: [
          ['Perfil', 'Predisposto', 'Doença estrutural', 'Doença estrutural avançada', 'ICC atual ou prévia', 'ICC refratária'],
          ['Remodelamento', 'Ausente', 'Ausente ou abaixo dos critérios de B2', 'AE e VE aumentados', 'Variável; cardiopatia com congestão', 'Avançado'],
          ['Sinais de ICC', 'Não', 'Não', 'Não', 'Sim, atuais ou prévios', 'Persistentes apesar do padrão'],
          ['Conduta central', 'Rastrear', 'Reavaliar; sem fármaco rotineiro', 'Pimobendan', 'Tratar ICC aguda/crônica', 'Estratégia avançada'],
        ],
      },
      {
        title: 'Critérios clássicos para estágio B2',
        columns: ['Parâmetro', 'Critério', 'Interpretação'],
        rows: [
          ['Sopro mitral', '≥ 3/6', 'Apoia regurgitação hemodinamicamente relevante'],
          ['LA/Ao', '≥ 1,6', 'Aumento atrial esquerdo'],
          ['LVIDDN', '≥ 1,7', 'Aumento ventricular esquerdo normalizado'],
          ['VHS', '> 10,5 ajustado à raça', 'Idealmente integrar aos critérios ecocardiográficos'],
        ],
        note: 'Idealmente, todos os critérios devem ser atendidos antes de iniciar tratamento pré-clínico permanente.',
      },
    ],
  },
  'acvim-cardiomiopatias-felinas-2020': {
    tables: [
      {
        title: 'Fenótipos de cardiomiopatia felina',
        columns: ['Fenótipo', 'Característica predominante', 'Exclusões importantes'],
        rows: [
          ['Hipertrófico', 'Espessamento ventricular', 'Hipertensão, hipertireoidismo, acromegalia e sobrecarga'],
          ['Restritivo', 'Disfunção de enchimento com átrios aumentados', 'Doença pericárdica e causas infiltrativas'],
          ['Dilatado', 'Dilatação e disfunção sistólica', 'Deficiência nutricional, toxinas e miocardite'],
          ['Arritmogênico de VD', 'Predomínio de alterações no ventrículo direito', 'Sobrecarga direita e doença congênita'],
          ['Não específico', 'Alteração que não preenche outro fenótipo', 'Doenças sistêmicas e secundárias'],
        ],
      },
      {
        title: 'Estágios clínicos ACVIM',
        columns: ['Critério', 'A', 'B1', 'B2', 'C', 'D'],
        rows: [
          ['Estado', 'Predisposto', 'Subclínico; baixo risco', 'Subclínico; maior risco', 'ICC/ATE atual ou prévio', 'Refratário'],
          ['Átrio/trombose', 'Sem fenótipo', 'Sem marcadores maiores', 'AE importante, SEC, trombo ou disfunção atrial', 'Complicação manifesta', 'Complicação persistente'],
          ['Foco', 'Rastrear', 'Acompanhar', 'Estratificar tromboprofilaxia', 'Tratar complicações', 'Individualizar/paliar'],
        ],
      },
    ],
    notes: ['A morfologia descreve o fenótipo e não deve ser tratada automaticamente como etiologia.'],
  },
  'acvim-hipertensao-pulmonar-canina-2020': {
    tables: [
      {
        title: 'Probabilidade ecocardiográfica de hipertensão pulmonar',
        columns: ['Velocidade da RT', 'Sítios com sinais adicionais', 'Probabilidade'],
        rows: [
          ['≤ 3,0 m/s ou não mensurável', '0–1', 'Baixa'],
          ['≤ 3,0 m/s ou não mensurável', '2', 'Intermediária'],
          ['3,0–3,4 m/s', '0–1', 'Intermediária'],
          ['> 3,4 m/s', '0', 'Intermediária'],
          ['≤ 3,0 m/s ou não mensurável', '3', 'Alta'],
          ['3,0–3,4 m/s', '≥ 2', 'Alta'],
          ['> 3,4 m/s', '≥ 1', 'Alta'],
        ],
        note: 'Os três sítios são ventrículos, artéria pulmonar e átrio direito/veia cava caudal.',
      },
      {
        title: 'Grupos clínicos',
        columns: ['Grupo', 'Mecanismo/doença predominante'],
        rows: [
          ['1', 'Hipertensão arterial pulmonar'],
          ['2', 'Doença cardíaca esquerda'],
          ['3', 'Doença respiratória ou hipóxia'],
          ['4', 'Embolia, trombo ou tromboembolismo pulmonar'],
          ['5', 'Doença parasitária'],
          ['6', 'Mecanismo multifatorial ou incerto'],
        ],
      },
    ],
  },
  'esvc-dcm-canina-2003': {
    tables: [
      {
        title: 'Quadro diagnóstico do fenótipo DCM',
        columns: ['Domínio', 'Achado esperado', 'Interpretação'],
        rows: [
          ['Dimensão', 'Dilatação ventricular esquerda', 'Interpretar por porte, raça e método'],
          ['Função', 'Redução sistólica', 'Confirmar com medidas consistentes'],
          ['Geometria', 'Aumento da esfericidade', 'Integra o fenótipo manifesto'],
          ['Complicações', 'Dilatação atrial, arritmia, ICC ou baixo débito', 'Aumentam relevância clínica'],
          ['Exclusões', 'Valvar/congênita, taquicardiomiopatia, nutrição, toxina e miocardite', 'Necessárias antes de rotular DCM idiopática'],
        ],
      },
    ],
  },
  'esvc-dcm-dobermann-2017': {
    tables: [
      {
        title: 'Classificação pelo Holter de 24 horas',
        columns: ['VPCs/24 h', 'Classificação', 'Próximo passo'],
        rows: [
          ['< 50 isoladas', 'Geralmente compatível com normalidade', 'Manter rastreamento anual'],
          ['50–300', 'Faixa intermediária', 'Repetir; duas avaliações em um ano sustentam DCM oculta'],
          ['> 300', 'Compatível com DCM oculta', 'Investigar e acompanhar mesmo com eco simultâneo normal'],
        ],
      },
      {
        title: 'Programa de rastreamento',
        columns: ['Componente', 'Quando', 'Papel'],
        rows: [
          ['Holter 24 h', 'Anual a partir de ~3 anos', 'Detectar fenótipo arrítmico'],
          ['Ecocardiograma', 'Anual a partir de ~3 anos', 'Detectar dilatação/disfunção'],
          ['Biomarcadores', 'Conforme risco', 'Apoiam triagem; não substituem Holter e eco'],
        ],
      },
    ],
  },
  'dcm-screening-caes-2022': {
    tables: [
      {
        title: 'Modalidades de rastreamento de DCM',
        columns: ['Ferramenta', 'Detecta melhor', 'Limite prático'],
        rows: [
          ['Ecocardiografia', 'Fenótipo estrutural e sistólico', 'Usar método e medidas consistentes'],
          ['Holter', 'Fenótipo arrítmico', 'Limiares específicos da raça prevalecem'],
          ['NT-proBNP', 'Sobrecarga/risco cardíaco', 'Não substitui imagem'],
          ['Troponina', 'Lesão miocárdica', 'Não confirma DCM isoladamente'],
          ['Exame seriado', 'Tendência longitudinal', 'Um exame normal não exclui doença futura'],
        ],
      },
    ],
  },
  'curative-risco-trombotico-2022': {
    tables: [
      {
        title: 'Situações cardiovasculares de risco trombótico',
        columns: ['População/situação', 'Marcadores de maior preocupação', 'Uso clínico'],
        rows: [
          ['Cardiomiopatia felina', 'AE aumentado, SEC, trombo ou ATE prévio', 'Estratificar risco arterial'],
          ['Tromboembolismo pulmonar', 'Doença predisponente e suspeita clínica', 'Avaliar risco venoso/pulmonar'],
          ['Dirofilariose', 'Doença vascular pulmonar', 'Integrar ao mecanismo e ao tratamento de base'],
          ['Cateter/circuito extracorpóreo', 'Dispositivo intravascular', 'Ponderar trombose e sangramento'],
          ['Marca-passo transvenoso', 'Material endovascular', 'Decisão individualizada'],
        ],
      },
    ],
    notes: ['Associação com trombose não significa indicação automática do mesmo protocolo para todos.'],
  },
  'curative-antitromboticos-2019': {
    tables: [
      {
        title: 'Estratégia conforme o mecanismo predominante',
        columns: ['Tipo de trombo', 'Composição predominante', 'Estratégia principal'],
        rows: [
          ['Arterial', 'Rico em plaquetas', 'Antiplaquetário'],
          ['Venoso/pulmonar', 'Rico em fibrina', 'Anticoagulante'],
          ['Risco excepcionalmente alto', 'Mecanismo misto ou recorrência', 'Associação apenas após ponderar sangramento'],
        ],
      },
      {
        title: 'Definição do objetivo terapêutico',
        columns: ['Objetivo', 'Situação', 'Pergunta-chave'],
        rows: [
          ['Prevenção primária', 'Sem trombo/evento prévio', 'O benefício supera o sangramento?'],
          ['Prevenção secundária', 'Evento trombótico prévio', 'Qual risco de recorrência?'],
          ['Tratamento', 'Trombo documentado', 'Qual mecanismo, extensão e urgência?'],
        ],
      },
    ],
  },
  'consenso-cardiorrenal-2015': {
    tables: [
      {
        title: 'Classificação dos distúrbios cardiovasculares–renais',
        columns: ['Eixo', 'Direção da interação', 'Exemplo de repercussão'],
        rows: [
          ['CvRD-H', 'Cardiovascular → renal', 'Congestão, baixo débito ou terapia afetando o rim'],
          ['CvRD-K', 'Renal → cardiovascular', 'Hipertensão, volume e toxinas urêmicas afetando o coração'],
          ['CvRD-O', 'Processo comum → ambos', 'Doença, toxina ou fármaco sistêmico'],
        ],
        note: 'Cada apresentação ainda deve ser descrita como estável ou instável.',
      },
    ],
  },
  'acvim-valvular-canina-2009': {
    tables: [
      {
        title: 'Estadiamento histórico ACVIM',
        columns: ['Critério', 'A', 'B1', 'B2', 'C', 'D'],
        rows: [
          ['Perfil', 'Sob risco', 'Estrutural sem remodelamento relevante', 'Estrutural com remodelamento', 'ICC atual/prévia', 'ICC refratária'],
          ['Sinais', 'Ausentes', 'Ausentes', 'Ausentes', 'Presentes ou prévios', 'Persistentes'],
          ['Uso atual', 'Conceito mantido', 'Confrontar 2019', 'Critérios/tratamento revisados', 'Confrontar 2019', 'Confrontar 2019'],
        ],
      },
    ],
    notes: ['Documento histórico: decisões contemporâneas devem seguir a atualização ACVIM 2019.'],
  },
  'aaha-diabetes-felino-2026': {
    tables: [
      {
        title: 'Seleção inicial da terapia',
        columns: ['Perfil do gato', 'SGLT2', 'Direção preferencial'],
        rows: [
          ['Recém-diagnosticado, estável, hidratado e alimentando-se', 'Pode ser candidato', 'Avaliar cetonas e critérios completos'],
          ['Hiporéxico, desidratado ou clinicamente doente', 'Não iniciar/manter', 'Avaliar insulina e complicações'],
          ['Cetose relevante ou suspeita de CAD', 'Contraindicado', 'Insulina, fluidos e manejo intensivo'],
          ['Diabetes já tratado com insulina', 'Não é seleção automática', 'Individualizar e evitar troca insegura'],
        ],
      },
      {
        title: 'Cronograma inicial com SGLT2',
        columns: ['Momento', 'Avaliar', 'Alerta'],
        rows: [
          ['Dias 2–3', 'Estado clínico, alimentação, hidratação e β-hidroxibutirato', 'Detectar cetose precoce'],
          ['Dia 7', 'Repetir avaliação clínica/metabólica', 'Não esperar hiperglicemia intensa para agir'],
          ['Dias 14 e 30', 'Resposta, peso, cetonas e eventos adversos', 'Revisar elegibilidade'],
          ['Depois', 'Em geral, a cada 3 meses', 'Antecipar diante de sinais'],
        ],
      },
    ],
  },
  'icatcare-diabetes-felino-2025': {
    tables: [
      {
        title: 'Fenótipos e situações de maior complexidade',
        columns: ['Situação', 'Pista clínica', 'Investigação/conduta'],
        rows: [
          ['Fenótipo tipo 2', 'Obesidade ou perda de peso com hiperglicemia', 'Controle glicêmico, dieta e comorbidades'],
          ['Hipersomatotropismo', 'Controle difícil, ganho de peso, organomegalia ou estridor', 'IGF-1 no contexto; investigar hipófise'],
          ['Resistência aparente', 'Dose crescente sem resposta', 'Revisar aplicação, adesão e armazenamento primeiro'],
          ['Possível remissão', 'Necessidade de insulina em queda', 'Monitorar e confirmar ≥4 semanas sem insulina'],
        ],
      },
    ],
  },
  'aaha-endocrinopatias-caes-gatos-2023': {
    tables: [
      {
        title: 'Abordagem diagnóstica por endocrinopatia',
        columns: ['Doença', 'Quando suspeitar', 'Teste/integração central'],
        rows: [
          ['Hipotireoidismo canino', 'Sinais compatíveis; evitar rastreio por T4 isolado', 'T4 total/livre, TSH, doença não tireoidiana e fármacos'],
          ['Hipercortisolismo canino', 'Síndrome clínica compatível', 'Confirmar antes de localizar origem'],
          ['Hipoadrenocorticismo canino', 'Sinais/eletrolitos compatíveis', 'Cortisol basal >2 µg/dL torna diagnóstico improvável; baixo pede ACTH'],
          ['Hipertireoidismo felino', 'Perda de peso, hiperatividade, alterações cardiovasculares', 'T4 e contexto; monitorar rim, PA e massa muscular'],
          ['Hiperaldosteronismo felino', 'Hipocalemia, fraqueza/ventroflexão e hipertensão', 'Aldosterona integrada à imagem adrenal'],
        ],
      },
    ],
  },
  'aaha-diabetes-caes-gatos-2018-2022': {
    tables: [
      {
        title: 'Diferenças práticas entre cães e gatos',
        columns: ['Domínio', 'Cão', 'Gato'],
        rows: [
          ['Curso típico', 'Insulinoterapia geralmente permanente', 'Remissão pode ocorrer'],
          ['Insulina inicial clássica', 'Lente suína ~0,25 U/kg q12h', 'Escolha conforme protocolo e paciente'],
          ['Reprodução', 'Castrar cadelas inteiras por resistência do diestro', 'Sem equivalente direto'],
          ['Monitorização', 'Sinais, peso, água e curvas/CGM', 'Preferir monitorização domiciliar e evitar estresse'],
          ['Antes de chamar resistência', 'Revisar seringa, concentração, aplicação, dieta e horários', 'Mesma revisão técnica e busca de comorbidades'],
        ],
      },
    ],
  },
  'aafp-hipertireoidismo-felino-2016': {
    tables: [
      {
        title: 'Seis grupos diagnósticos AAFP',
        columns: ['Grupo', 'Apresentação', 'Próximo passo'],
        rows: [
          ['1', 'Sinais clássicos + T4 total elevado', 'Confirmar diagnóstico e planejar tratamento'],
          ['2', 'Sinais compatíveis + T4 total normal', 'Repetir T4 e investigar doença concorrente/T4 livre'],
          ['3', 'Sem sinais + T4 total elevado', 'Repetir e excluir interferências/erro laboratorial'],
          ['4', 'Doença não tireoidiana + T4 total elevado', 'Interpretar contexto e confirmar persistência'],
          ['5', 'Hipertireoidismo tratado + T4 adequado', 'Monitorar rim, pressão, peso e massa muscular'],
          ['6', 'Hipertireoidismo tratado + T4 baixo', 'Avaliar hipotireoidismo iatrogênico e DRC'],
        ],
      },
    ],
  },
  'acvim-hipercortisolismo-canino-2012': {
    tables: [
      {
        title: 'Escolha dos testes no hipercortisolismo',
        columns: ['Etapa', 'Teste/ação', 'Interpretação prática'],
        rows: [
          ['Selecionar paciente', 'Testar somente com suspeita clínica', 'Reduz falso-positivo em doença não adrenal'],
          ['Triagem sensível', 'Supressão com baixa dose de dexametasona', 'Boa sensibilidade; padrões podem ajudar na origem'],
          ['Confirmação funcional', 'Estimulação com ACTH', 'Útil em contextos específicos e monitorização'],
          ['Não recomendado como triagem isolada', 'ACTH endógeno/localização', 'Usar após confirmar hipercortisolismo'],
        ],
      },
    ],
  },
  'alive-diabetes-cycle-1-2022': {
    tables: [
      {
        title: 'Definições padronizadas ALIVE para diabetes',
        columns: ['Termo', 'Definição clínica resumida', 'Uso'],
        rows: [
          ['Diabetes mellitus', 'Hiperglicemia persistente com manifestações compatíveis', 'Diagnóstico'],
          ['Controle clínico', 'Redução de poliúria/polidipsia e estabilidade de peso', 'Meta terapêutica'],
          ['Hipoglicemia', 'Glicose baixa com ou sem sinais', 'Evento adverso a prevenir'],
          ['Resistência insulínica', 'Resposta inadequada após excluir problemas técnicos', 'Caracterização, não rótulo precoce'],
          ['Remissão', 'Independência sustentada de insulina conforme critérios', 'Desfecho, especialmente felino'],
        ],
      },
    ],
  },
  'alive-adrenais-cycle-2-2025': {
    tables: [
      {
        title: 'Terminologia adrenal padronizada',
        columns: ['Eixo', 'Termo', 'Aplicação'],
        rows: [
          ['Excesso de cortisol', 'Síndrome de Cushing / hipercortisolismo', 'Separar síndrome clínica, teste e etiologia'],
          ['Origem hipofisária', 'Hipercortisolismo dependente da hipófise', 'Classificação etiológica após confirmação'],
          ['Origem adrenal', 'Tumor adrenocortical funcional', 'Integrar imagem e função'],
          ['Deficiência de cortisol', 'Hipoadrenocorticismo', 'Distinguir apresentação típica, atípica e crise'],
        ],
      },
    ],
  },
  'alive-tireoide-cycle-3-2026': {
    tables: [
      {
        title: 'Terminologia tireoidiana e metabólica',
        columns: ['Condição', 'Definição padronizada', 'Cuidado de interpretação'],
        rows: [
          ['Hipertireoidismo', 'Excesso funcional de hormônios tireoidianos', 'Separar resultado laboratorial de síndrome clínica'],
          ['Hipotireoidismo', 'Deficiência funcional tireoidiana', 'Excluir doença não tireoidiana e efeito medicamentoso'],
          ['Eutireoidismo doente', 'Alteração hormonal por doença sistêmica', 'Não confundir com doença primária'],
          ['CAD', 'Diabetes com cetose e acidose metabólica', 'Emergência'],
          ['CAD euglicêmica', 'CAD sem hiperglicemia marcada', 'Especial atenção com SGLT2'],
        ],
      },
    ],
  },
  'hipertensao-sistemica': {
    tables: [
      {
        title: 'Classificação pela pressão arterial sistólica',
        columns: ['PAS (mmHg)', 'Categoria', 'Risco de lesão em órgão-alvo'],
        rows: [
          ['< 140', 'Normotenso', 'Mínimo'],
          ['140–159', 'Pré-hipertenso', 'Baixo'],
          ['160–179', 'Hipertenso', 'Moderado'],
          ['≥ 180', 'Gravemente hipertenso', 'Alto'],
        ],
      },
    ],
    notes: ['Confirmar com técnica padronizada e múltiplas medidas, salvo lesão de órgão-alvo que exija ação imediata.'],
  },
  'isfm-diabetes-felino-2015': {
    tables: [
      {
        title: 'Princípios úteis e atualização necessária',
        columns: ['Princípio de 2015', 'Permanece válido?', 'Atualização contemporânea'],
        rows: [
          ['Controlar sinais, não buscar curva perfeita', 'Sim', 'Integrar CGM e qualidade de vida'],
          ['Evitar hipoglicemia', 'Sim', 'Plano domiciliar explícito'],
          ['Monitorizar em casa', 'Sim', 'CGM ampliou essa estratégia'],
          ['Investigar comorbidades', 'Sim', 'Maior atenção ao hipersomatotropismo'],
          ['Buscar remissão', 'Sim', 'Usar critérios ALIVE e diretrizes 2025–2026'],
          ['Protocolos terapêuticos', 'Parcial', 'Documento antecede SGLT2 e CAD euglicêmica'],
        ],
      },
    ],
  },
  'iris-lra-2026': {
    tables: [
      {
        title: 'Graduação IRIS da lesão renal aguda',
        columns: ['Marcador', 'Grau I', 'Grau II', 'Grau III', 'Grau IV', 'Grau V'],
        rows: [
          ['Creatinina (mg/dL)', '< 1,6', '1,7–2,5', '2,6–5,0', '5,1–10,0', '> 10,0'],
          ['Creatinina (µmol/L)', '< 140', '141–220', '221–439', '440–880', '> 880'],
          ['Gravidade', 'Não azotêmica', 'Leve', 'Moderada', 'Grave', 'Falência grave'],
          ['Subgrau possível', 'NO / O / RRT', 'NO / O / RRT', 'NO / O / RRT', 'NO / O / RRT', 'NO / O / RRT'],
        ],
        note: 'O = oligoanúrico (<1 mL/kg/h ou anúria por 6 h); NO = não oligúrico; RRT = requer terapia renal substitutiva.',
      },
    ],
  },
  'iscaid-itu-caes-gatos-2019': {
    tables: [
      {
        title: 'Classificação clínica das infecções urinárias',
        columns: ['Apresentação', 'Definição prática', 'Direção diagnóstica'],
        rows: [
          ['Cistite bacteriana esporádica', 'Episódio baixo em paciente estável', 'Urinálise; cultura conforme contexto; terapia curta'],
          ['Cistite recorrente', 'Novos episódios após aparente resolução', 'Distinguir reinfecção, recaída e persistência'],
          ['Bacteriúria subclínica', 'Cultura positiva sem sinais urinários', 'Em geral, não tratar'],
          ['Pielonefrite', 'Infecção alta com repercussão renal/sistêmica', 'Cultura e fármaco com penetração tecidual'],
          ['ITU complicada/predisposta', 'Alteração anatômica, funcional ou doença de base', 'Investigar e corrigir predisposição'],
        ],
      },
    ],
  },
  'acvim-urolitiase-caes-gatos-2016': {
    tables: [
      {
        title: 'Decisão por tipo e situação do urólito',
        columns: ['Situação', 'Dissolução?', 'Conduta preferencial'],
        rows: [
          ['Estruvita em paciente selecionado', 'Sim', 'Dissolução médica; controlar infecção quando presente'],
          ['Urato', 'Pode ser considerada', 'Tentar dissolução antes da remoção em casos adequados'],
          ['Cistina', 'Pode ser considerada', 'Dissolução/controle metabólico em casos adequados'],
          ['Oxalato de cálcio', 'Não', 'Remoção quando indicada, preferindo técnica minimamente invasiva'],
          ['Cistólito assintomático, baixo risco obstrutivo', 'Não se aplica', 'Monitorização pode ser aceitável'],
          ['Obstrução ureteral', 'Raramente eficaz', 'Atendimento imediato e intervenção especializada'],
        ],
      },
    ],
  },
  'acvim-incontinencia-urinaria-canina-2024': {
    tables: [
      {
        title: 'Padrão clínico e mecanismo provável',
        columns: ['Padrão', 'Mecanismo a considerar', 'Avaliação direcionada'],
        rows: [
          ['Escape no sono/repouso', 'Incompetência do mecanismo esfincteriano', 'História, urinálise/cultura e exclusões'],
          ['Gotejamento contínuo desde jovem', 'Ureter ectópico/anomalia', 'Imagem avançada ou cistoscopia'],
          ['Bexiga grande + resíduo elevado', 'Retenção/transbordamento', 'Neurológico, resíduo e fluxo'],
          ['Poliúria com acidentes', 'Doença sistêmica/produção excessiva', 'Bioquímica, urina e endocrinopatias'],
          ['Urgência/polaciúria', 'Inflamação, ITU ou urolitíase', 'Urina, cultura e imagem'],
          ['Mobilidade reduzida', 'Incapacidade funcional de acesso', 'Ortopedia, neurologia e ambiente'],
        ],
      },
    ],
  },
  'iris-doenca-glomerular-canina-2013': {
    tables: [
      {
        title: 'Estratificação da proteinúria glomerular',
        columns: ['Etapa', 'Avaliação', 'Decisão'],
        rows: [
          ['Confirmar', 'UPC persistente em amostra adequada', 'Não classificar por medição isolada'],
          ['Localizar', 'Sedimento e exclusão pré/pós-renal', 'Atribuir origem renal somente após exclusões'],
          ['Buscar causa', 'Infecção, inflamação, neoplasia e imunocomplexos', 'Tratar doença de base'],
          ['Graduar risco', 'Albumina, PA, azotemia, edema e trombose', 'Define urgência e suporte'],
          ['Biopsiar', 'Quando histologia mudar terapia/prognóstico', 'Avaliar sangramento e processamento especializado'],
          ['Monitorar', 'UPC, albumina, função renal e PA', 'Medir resposta e progressão'],
        ],
      },
    ],
  },
  'isfm-drc-felina-2016': {
    tables: [
      {
        title: 'Plano de acompanhamento da DRC felina',
        columns: ['Domínio', 'O que acompanhar', 'Aplicação'],
        rows: [
          ['Estágio', 'Creatinina/SDMA, UPC e PA', 'Usar versão IRIS vigente'],
          ['Nutrição', 'Ingestão, peso e massa muscular', 'Transição renal sem provocar anorexia'],
          ['Hidratação', 'Água, alimento úmido e estado volêmico', 'Fluido SC não é automático'],
          ['Mineral/eletrólitos', 'Fósforo, potássio e bicarbonato', 'Tratar conforme estágio e exame'],
          ['Sintomas', 'Náusea, vômito, constipação, dor e apetite', 'Preservar bem-estar e ingestão'],
          ['Hematologia', 'Hematócrito e sinais de anemia', 'Investigar e tratar quando indicado'],
        ],
      },
    ],
  },
  'terminologia-infeccoes-urinarias-2026': {
    tables: [
      {
        title: 'Elementos para nomear corretamente o episódio',
        columns: ['Elemento', 'Registrar', 'Evitar'],
        rows: [
          ['Sinais clínicos', 'Presentes ou ausentes', 'Confundir bacteriúria com infecção clínica'],
          ['Localização', 'Bexiga, trato alto ou indeterminada', 'Usar “ITU” como rótulo inespecífico'],
          ['Método de coleta', 'Cistocentese, cateter ou micção', 'Ignorar risco de contaminação'],
          ['Microbiologia', 'Espécie, contagem e sensibilidade', 'Interpretar cultura sem contexto'],
          ['Recorrência', 'Relação temporal e microbiológica', 'Agrupar recaída, persistência e reinfecção'],
          ['Predisposição', 'Anatomia, função e comorbidades', 'Repetir antimicrobiano sem investigar causa'],
        ],
      },
    ],
  },
  'acvim-proteinuria-caes-gatos-2005': {
    tables: [
      {
        title: 'Localização conceitual da proteinúria',
        columns: ['Origem', 'Pistas', 'Próximo passo'],
        rows: [
          ['Pré-renal', 'Proteínas circulantes anormais/excesso filtrado', 'Investigar doença sistêmica'],
          ['Renal glomerular', 'UPC persistente, sedimento inativo; magnitude variável', 'Quantificar, graduar risco e investigar causa'],
          ['Renal tubular', 'Perda de reabsorção tubular, geralmente menor magnitude', 'Avaliar tubulopatia e função renal'],
          ['Pós-renal', 'Inflamação, hemorragia ou contaminação urinária', 'Resolver/identificar trato urinário antes de interpretar UPC'],
          ['Transitória/funcional', 'Febre, exercício ou evento agudo', 'Confirmar persistência'],
        ],
      },
    ],
    notes: ['Os limiares terapêuticos contemporâneos devem seguir a versão IRIS vigente.'],
  },
  'icatcare-dtuif-felina-2025': {
    tables: [
      {
        title: 'Diferenciais dos sinais urinários inferiores',
        columns: ['Causa', 'Pista principal', 'Confirmação/conduta'],
        rows: [
          ['Obstrução uretral', 'Tentativas improdutivas e bexiga grande/dolorosa', 'Emergência: estabilidade, potássio, ECG e desobstrução'],
          ['Cistite idiopática felina', 'Recorrente; diagnóstico de exclusão', 'Analgesia, água, dieta e modificação ambiental'],
          ['Urolitíase', 'Imagem compatível', 'Composição do cristal não confirma o urólito'],
          ['Infecção urinária', 'Mais provável com idade/comorbidade/instrumentação', 'Cultura quando indicada'],
          ['Alteração anatômica/neoplasia', 'Padrão persistente ou atípico', 'Imagem e investigação direcionada'],
        ],
      },
      {
        title: 'Doses citadas no consenso',
        columns: ['Indicação', 'Fármaco', 'Regime citado'],
        rows: [
          ['Analgesia/sedação', 'Metadona', '0,2 mg/kg IV ou IM'],
          ['Sedação associada', 'Midazolam', '0,25 mg/kg IV ou IM'],
          ['Bloqueio lombossacro', 'Bupivacaína ± morfina', '0,22 mg/kg ± 0,1 mg/kg'],
          ['Hipercalemia — temporização', 'Terbutalina', '0,01 mg/kg IV lenta ou IM'],
          ['Dor neuropática', 'Gabapentina / pregabalina', '5–10 mg/kg q8–12h / 1–3 mg/kg q8–12h'],
          ['Atonia com uretra patente', 'Betanecol', '1,25–5 mg/gato VO q12h'],
        ],
      },
    ],
  },
  'leishmaniose-brasileiro-2020': {
    tables: [
      {
        title: 'Integração clínica e renal antes do tratamento',
        columns: ['Domínio', 'Avaliar', 'Impacto'],
        rows: [
          ['Confirmação', 'Clínica, epidemiologia e teste específico', 'Evita tratar exposição isolada como doença'],
          ['Gravidade sistêmica', 'Hemograma, albumina/proteínas, fígado e olhos', 'Define suporte e prognóstico'],
          ['Rim', 'Creatinina/SDMA, urinálise, UPC e PA', 'Modifica estágio, protocolo e prognóstico'],
          ['Controle parasitário', 'Leishmanicida + leishmaniostático conforme caso', 'Reduz sinais/carga; não garante cura'],
          ['Prevenção', 'Repelente/coleira e ambiente', 'Reduz exposição vetorial'],
          ['Seguimento', 'Clínica, rim, fígado, proteínas, UPC e urina', 'Detecta resposta, toxicidade e recidiva'],
        ],
      },
      {
        title: 'Regimes citados',
        columns: ['Fármaco', 'Dose', 'Duração/cuidado'],
        rows: [
          ['Miltefosina', '2 mg/kg VO q24h', '28 dias; preferencialmente com alimento'],
          ['Alopurinol', '10 mg/kg VO q12h', '6–12 meses; monitorar xantina/cristalúria'],
        ],
      },
    ],
  },
  'acvim-cie-caes-2026': {
    tables: [
      {
        title: 'Fenótipos por resposta terapêutica',
        columns: ['Fenótipo', 'Definição', 'Implicação'],
        rows: [
          ['Responsiva à dieta', 'Melhora/remissão com teste dietético adequado', 'Primeira estratégia no cão estável'],
          ['Responsiva a antimicrobiano', 'Resposta em categoria de exceção', 'Recidiva e resistência limitam uso'],
          ['Responsiva a imunossupressor', 'Falha de dieta/exclusões; resposta a imunomodulação', 'Usar após revisão diagnóstica'],
          ['Não responsiva', 'Persistência apesar da abordagem adequada', 'Rever diagnóstico, adesão, histologia e comorbidades'],
          ['Enteropatia perdedora de proteína', 'Hipoalbuminemia e maior risco sistêmico', 'Priorizar nutrição, eletrólitos, efusões e trombose'],
        ],
      },
      {
        title: 'Regimes citados no consenso',
        columns: ['Fármaco', 'Regime citado', 'Observação'],
        rows: [
          ['Prednisona/prednisolona', '1–2 mg/kg VO q24h', 'Indução; reduzir após resposta'],
          ['Budesonida', '1–5 mg/cão VO q24h', 'Casos selecionados; pode suprimir adrenal'],
          ['Ciclosporina', '3–5 mg/kg VO q12–24h', 'Por pelo menos 6 semanas'],
          ['Tilosina', '25 mg/kg q24h por 7 dias', 'Categoria antimicrobiana de exceção'],
          ['Metronidazol', '10–15 mg/kg q12h por 21 dias', 'Não usar empiricamente'],
          ['Rifaximina', '25 mg/kg q12h por 21 dias', 'Considerar evidência e disponibilidade'],
          ['Oxitetraciclina', '10 mg/kg q8h por 4 semanas', 'Estudos antigos/específicos'],
        ],
      },
    ],
  },
};

const HEADER_TONES = [
  'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100',
  'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100',
  'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100',
  'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100',
  'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100',
  'border-violet-300 bg-violet-50 text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100',
] as const;

function ClinicalTable({ table }: { table: ConsensusTable }) {
  const minWidth = Math.max(560, table.columns.length * 135);

  return (
    <section aria-label={table.title} className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground">{table.title}</h4>
        {table.description && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{table.description}</p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background/70">
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse text-left text-sm"
            style={{ minWidth: `${minWidth}px` }}
          >
            <caption className="sr-only">{table.title}</caption>
            <thead>
              <tr>
                {table.columns.map((column, index) => (
                  <th
                    key={`${column}-${index}`}
                    scope="col"
                    className={`border-b border-r px-4 py-3 text-xs font-bold uppercase tracking-wide last:border-r-0 ${
                      HEADER_TONES[index % HEADER_TONES.length]
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr
                  key={`${table.title}-${rowIndex}`}
                  className="border-b border-border/70 align-top last:border-b-0"
                >
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th
                        key={`${rowIndex}-${cellIndex}`}
                        scope="row"
                        className="border-r border-border/70 bg-muted/25 px-4 py-3 font-semibold leading-relaxed text-foreground"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className="border-r border-border/70 px-4 py-3 leading-relaxed text-foreground/90 last:border-r-0"
                      >
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {table.note && (
        <p className="text-xs leading-relaxed text-muted-foreground">{table.note}</p>
      )}
    </section>
  );
}

export function hasConsensusOfficialTables(slug: string): boolean {
  return Boolean(TABLES_BY_SLUG[slug]);
}

export function ConsensusOfficialTables({ slug }: { slug: string }) {
  const set = TABLES_BY_SLUG[slug];
  if (!set) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-sm leading-relaxed text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            {set.intro ||
              'Quadros clínicos adaptados da estrutura e das recomendações da publicação original.'}
          </p>
        </div>
      </div>

      {set.tables.map((table) => (
        <ClinicalTable key={table.title} table={table} />
      ))}

      {set.notes && set.notes.length > 0 && (
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
          {set.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
