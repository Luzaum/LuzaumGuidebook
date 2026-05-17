import { EmergencyGuide } from '../../types/emergencyGuide';

/**
 * Cartilhas de manejo emergencial — conteúdo editorial em expansão.
 * Por enquanto: previews estruturais; substituir blocos `placeholder` quando a pesquisa estiver pronta.
 */
export const emergencyGuidesSeed: EmergencyGuide[] = [
  {
    id: 'eg-cetoacidose',
    slug: 'cetoacidose-diabetica',
    title: 'Cetoacidose diabética',
    subtitle: 'CAD / DKA — cetose, acidose, hipovolemia e eletrólitos',
    description:
      'Fluxo de consulta rápida para reconhecer CAD, estabilizar perfusão, corrigir potássio/fósforo, iniciar insulina com queda glicêmica gradual e monitorar resolução.',
    tags: ['Endócrino', 'Diabetes', 'CAD', 'Eletrólitos'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'ca-p1',
        title: 'Reconhecer CAD',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro:
          'CAD é diabetes mellitus complicado por cetonas e acidose metabólica. Não trate apenas a glicose: o risco imediato costuma vir de hipovolemia, acidose, perda eletrolítica e doença concomitante.',
        blocks: [
          {
            type: 'comparison',
            title: 'CAD vs EHH em 30 segundos',
            columns: ['CAD', 'EHH'],
            rows: [
              { label: 'Problema dominante', values: ['Cetose + acidose metabólica', 'Hiperosmolalidade + desidratação grave'] },
              { label: 'Cetonas', values: ['Presentes; beta-hidroxibutirato pode predominar', 'Ausentes ou discretas'] },
              { label: 'Glicose', values: ['Alta, variável', 'Geralmente >600 mg/dL'] },
              { label: 'Neurológico', values: ['Pode ocorrer por acidose/hipoperfusão/osmolalidade', 'Comum quando osmolalidade efetiva está muito alta'] },
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Critério mental',
            text: 'Diabetes/hiperglicemia + cetonas + acidose metabólica = CAD até prova em contrário. Se o paciente está doente e cetótico, trate como CAD mesmo antes do refinamento completo.',
          },
          {
            type: 'checklist',
            title: 'Sinais que elevam suspeita',
            items: [
              'Diabetes conhecido ou história recente de PU/PD, polifagia e perda de peso.',
              'Vômito, anorexia, diarreia, letargia, fraqueza ou dor abdominal.',
              'Desidratação, hipovolemia, alteração de mentação ou respiração profunda compensatória.',
              'Hálito cetônico quando presente; ausência do odor não exclui CAD.',
              'Gatilho provável: pancreatite, ITU, sepse, hiperadrenocorticismo, cio, neoplasia ou doença renal/hepática.',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Fita urinária pode enganar',
            text: 'A fita detecta principalmente acetoacetato. Em CAD grave/inicial pode predominar beta-hidroxibutirato; quando disponível, BHB sanguíneo é melhor para gravidade e resolução.',
          },
        ],
      },
      {
        id: 'ca-p2',
        title: 'Primeiros 15 minutos',
        stepOrder: 2,
        phase: 'estabilizacao',
        intro: 'Organize o atendimento para estabilizar perfusão e coletar os dados que mudam a conduta antes de insulinizar agressivamente.',
        blocks: [
          {
            type: 'steps',
            title: 'Sequência prática',
            items: [
              'Avaliar ABC, perfusão, pressão, temperatura, hidratação, dor e estado neurológico.',
              'Acesso venoso e coleta inicial: glicemia, beta-hidroxibutirato/cetonúria, hemogasometria, Na, K, Cl, Ca, Mg, fósforo, lactato, hemograma, bioquímica, urina tipo I e urocultura.',
              'Começar fluidoterapia conforme perfusão, sódio/cloreto e risco de mudança osmótica.',
              'Corrigir potássio conforme faixa sérica antes e durante insulina.',
              'Investigar gatilho nas primeiras horas: pancreatite, ITU, sepse, cio, HAC, neoplasia, DRC/lipidose em gatos.',
            ],
          },
          {
            type: 'targetStrip',
            title: 'Metas de segurança',
            items: [
              { label: 'Insulina', value: 'Após 4-6 h', detail: 'Ou quando perfusão e K estiverem seguros.' },
              { label: 'Queda glicêmica', value: '~50 mg/dL/h', detail: 'Evitar queda osmótica brusca.' },
              { label: 'Dextrose', value: '<=250 mg/dL', detail: 'Adicionar ao fluido e continuar controle da cetose.' },
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Não normalizar glicose rápido',
            text: 'A meta inicial é estabilizar o paciente. Queda glicêmica rápida pode reduzir osmolalidade e favorecer piora neurológica/edema cerebral.',
          },
        ],
      },
      {
        id: 'ca-p3',
        title: 'Fluidoterapia',
        stepOrder: 3,
        phase: 'estabilizacao',
        intro: 'Fluido é o primeiro pilar: melhora perfusão renal, reduz glicemia por excreção urinária e ajuda a remover cetoácidos.',
        blocks: [
          {
            type: 'table',
            title: 'Escolha inicial do cristaloide',
            columns: ['Achado', 'Conduta visual'],
            rows: [
              ['Na medido <130 mEq/L', 'Considerar NaCl 0,9% inicialmente.'],
              ['Na medido >=130 mEq/L', 'Considerar solução balanceada, como Ringer lactato ou Plasma-Lyte, conforme Cl/acidose.'],
              ['Hipercloremia ou acidose hiperclorêmica', 'Evitar grandes volumes prolongados de NaCl 0,9% se alternativa balanceada for adequada.'],
              ['Hipovolemia grave', 'Priorizar restauração de perfusão com reavaliação frequente.'],
            ],
            caption: 'A escolha final depende de perfusão, sódio corrigido, cloreto, acidose, comorbidades e risco de sobrecarga.',
          },
          {
            type: 'formula',
            title: 'Déficit de desidratação',
            expression: 'Déficit (mL) = peso (kg) x 1000 x % desidratação / 100',
            variables: [
              'Somar manutenção e perdas contínuas.',
              'Reposição em 4-24 h conforme choque, perfusão, risco osmótico e comorbidades.',
              'Perdas iniciais citadas: insensíveis 20 mL/kg/dia; urinárias 20-40 mL/kg/dia, idealmente mensuradas.',
            ],
          },
          {
            type: 'formula',
            title: 'Sódio corrigido pela hiperglicemia',
            expression: 'Na corrigido = Na medido + 1,6 x [(glicose medida - glicose normal) / 100]',
            note: 'Use para diferenciar hiponatremia real de diluição por hiperglicemia.',
          },
        ],
      },
      {
        id: 'ca-p4',
        title: 'Potássio, fósforo e magnésio',
        stepOrder: 4,
        phase: 'tratamento_especifico',
        intro: 'O potássio sérico pode estar baixo, normal ou alto, mas o estoque corporal total quase sempre está reduzido. A insulina pode revelar hipocalemia grave.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Potássio antes da insulina',
            text: 'Se o K está baixo ou caindo, priorize suplementação. Insulina desloca K para o intracelular e pode precipitar hipocalemia arritmogênica.',
          },
          {
            type: 'table',
            title: 'Reposição de potássio citada',
            columns: ['K sérico', 'Taxa de K'],
            rows: [
              ['<2,0 mmol/L', '0,5 mEq/kg/h'],
              ['2,0-2,4 mmol/L', '0,4 mEq/kg/h'],
              ['2,5-2,9 mmol/L', '0,3 mEq/kg/h'],
              ['3,0-3,4 mmol/L', '0,2 mEq/kg/h'],
              ['3,5-5,0 mmol/L', '0,1 mEq/kg/h'],
            ],
            caption: 'Taxa máxima: 0,5 mEq/kg/h. KCl 19,1% = 2,56 mEq/mL; KCl 10% = 1,34 mEq/mL.',
          },
          {
            type: 'table',
            title: 'Fósforo e magnésio',
            columns: ['Eletrólito', 'Quando pensar', 'Reposição citada'],
            rows: [
              ['Fósforo', 'Sinais clínicos, hemólise ou P <1,5 mg/dL.', '0,03-0,12 mmol/kg/h; fosfato de K ou Na conforme eletrólitos. Monitorar cálcio.'],
              ['Magnésio', 'Mg total <1,0 mg/dL, ionizado <0,4 mg/dL, fraqueza, anorexia, letargia, hipoK/hipoCa refratárias.', '0,5-1 mEq/kg/dia rápida ou 0,3-0,5 mEq/kg/dia lenta; reduzir 50-70% em azotemia.'],
            ],
            caption: 'Evitar magnésio junto a soluções com bicarbonato ou cálcio. Monitorar FR e cardiovascular; gluconato de cálcio é citado para overdose.',
          },
        ],
      },
      {
        id: 'ca-p5',
        title: 'Bicarbonato',
        stepOrder: 5,
        phase: 'tratamento_especifico',
        intro: 'Bicarbonato é exceção, não rotina. A maior parte da acidose melhora com fluido, perfusão, eletrólitos e insulina.',
        blocks: [
          {
            type: 'callout',
            variant: 'warning',
            title: 'Indicação restrita',
            text: 'Considerar apenas se HCO3 <11 mEq/L ou CO2 <12, em acidose severa geralmente com sinais neurológicos. Reavaliar ventilação, potássio e risco renal.',
          },
          {
            type: 'formula',
            title: 'Cálculo citado',
            expression: 'mEq HCO3 = peso (kg) x 0,4 x (12 - HCO3 do paciente) x 0,5',
            note: 'Meta: levar HCO3 para cerca de 12 mEq/L, administrando ao longo de 6 h.',
          },
          {
            type: 'checklist',
            title: 'Riscos a checar antes',
            items: [
              'Aumento de CO2 e risco de acidose respiratória se ventilação for insuficiente.',
              'Acidose paradoxal no SNC.',
              'Piora de hipocalemia por deslocamento intracelular de K.',
              'Alcalose metabólica, especialmente em doença renal crônica.',
              'Possível prejuízo à liberação tecidual de oxigênio.',
            ],
          },
        ],
      },
      {
        id: 'ca-p6',
        title: 'Insulinoterapia',
        stepOrder: 6,
        phase: 'tratamento_especifico',
        intro: 'A insulina interrompe cetogênese, mas deve entrar com perfusão e potássio minimamente seguros. O alvo é queda gradual, não normoglicemia imediata.',
        blocks: [
          {
            type: 'targetStrip',
            title: 'Alvos durante insulina',
            items: [
              { label: 'Início usual', value: '4-6 h', detail: 'Após fluido inicial e avaliação de K.' },
              { label: 'Queda alvo', value: '~50 mg/dL/h', detail: 'Ajustar se queda mais rápida/lenta.' },
              { label: 'Faixa alvo', value: '150-300 mg/dL', detail: 'Manter com dextrose enquanto resolve cetose.' },
            ],
          },
          {
            type: 'table',
            title: 'Protocolo IM citado',
            columns: ['Etapa', 'Conduta'],
            rows: [
              ['Insulina', 'Regular IM.'],
              ['Dose inicial', 'Cerca de 0,1 UI/kg.'],
              ['Ajuste', 'Titular conforme queda glicêmica e resposta clínica.'],
              ['Dextrose', 'Adicionar SG 5% quando necessário para manter meta sem suspender controle da cetose.'],
            ],
          },
          {
            type: 'table',
            title: 'CRI de insulina regular citada',
            columns: ['Glicose', 'Fluido', 'Taxa da solução de insulina'],
            rows: [
              ['>250 mg/dL', 'NaCl 0,9%', '10 mL/h'],
              ['200-250 mg/dL', 'NaCl 0,9% + dextrose 2,5%', '7 mL/h'],
              ['150-200 mg/dL', 'NaCl 0,9% + dextrose 2,5%', '5 mL/h'],
              ['100-150 mg/dL', 'NaCl 0,9% + dextrose 5%', '5 mL/h'],
              ['<100 mg/dL', 'NaCl 0,9% + dextrose 5%', 'Suspender insulina'],
            ],
            caption: 'Preparo citado: cães 2,2 UI/kg; gatos 1,1 UI/kg. Desprezar 50 mL da solução por adesão da insulina ao plástico.',
          },
        ],
      },
      {
        id: 'ca-p7',
        title: 'Monitoramento e transição',
        stepOrder: 7,
        phase: 'monitoramento',
        intro: 'CAD muda rápido. A monitorização precisa antecipar hipoglicemia, hipoK, hipoP, mudança osmótica e persistência do gatilho.',
        blocks: [
          {
            type: 'table',
            title: 'Frequência de monitoramento',
            columns: ['Parâmetro', 'Frequência citada'],
            rows: [
              ['Glicemia', 'A cada 1-2 h.'],
              ['Eletrólitos e hemogasometria', 'A cada 4-8 h.'],
              ['Cetonas urinárias/plasmáticas', 'A cada 4-8 h.'],
              ['Hidratação, pulso e respiração', 'A cada 2-4 h.'],
              ['Pressão arterial e débito urinário', 'Seriados; mensurar urina quando possível.'],
            ],
          },
          {
            type: 'keyPoints',
            title: 'Critérios de resolução/transição',
            items: [
              'Beta-hidroxibutirato/cetonas normalizando.',
              'Perfusão, hidratação, eletrólitos e acidose corrigindo.',
              'Paciente voltando a se alimentar e sem vômitos relevantes.',
              'Desmame progressivo da insulina regular.',
              'Insulina de ação prolongada escolhida quando estável e comendo.',
              'Doença concomitante identificada e tratada.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eg-estado-hiperglicemico-hiperosmolar',
    slug: 'estado-hiperglicemico-hiperosmolar',
    title: 'Estado hiperglicêmico hiperosmolar',
    subtitle: 'EHH / HHS — hiperosmolalidade, desidratação grave e neurologia',
    description:
      'Fluxo de consulta rápida para diferenciar EHH de CAD, calcular sódio/osmolalidade, reidratar sem queda osmótica brusca, repor eletrólitos e usar insulina com cautela.',
    tags: ['Endócrino', 'Diabetes', 'EHH', 'Neurológico'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'ehh-p1',
        title: 'Reconhecer EHH',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro:
          'No EHH há insulina suficiente para limitar cetogênese, mas insuficiente para controlar a hiperglicemia. O eixo crítico é hiperosmolalidade com desidratação celular, inclusive no SNC.',
        blocks: [
          {
            type: 'comparison',
            title: 'EHH vs CAD em 30 segundos',
            columns: ['EHH', 'CAD'],
            rows: [
              { label: 'Problema dominante', values: ['Hiperosmolalidade + desidratação grave', 'Cetose + acidose metabólica'] },
              { label: 'Cetonas', values: ['Ausentes ou discretas', 'Presentes; BHB pode predominar'] },
              { label: 'Glicose', values: ['Geralmente >600 mg/dL', 'Alta, variável'] },
              { label: 'Neurológico', values: ['Frequente quando osmolalidade está muito alta', 'Pode ocorrer por acidose/hipoperfusão/osmolalidade'] },
            ],
          },
          {
            type: 'targetStrip',
            title: 'Tríade prática',
            items: [
              { label: 'Glicose', value: '>600 mg/dL', detail: 'Valor típico citado; interpretar no contexto clínico.' },
              { label: 'Osmolalidade', value: '>350 mOsm/kg', detail: 'Sinais neurológicos costumam aparecer acima de ~340.' },
              { label: 'Cetonas', value: 'ausentes/discretas', detail: 'Cetose importante sugere CAD ou quadro misto.' },
            ],
          },
          {
            type: 'checklist',
            title: 'Sinais que chamam atenção',
            items: [
              'Letargia, anorexia, vômito, fraqueza, PU/PD e desidratação intensa.',
              'Alteração neurológica, andar em círculo ou convulsões.',
              'Hiperglicemia extrema com sódio aparentemente baixo por diluição osmótica.',
              'Acidose, quando presente, tende a vir mais de uremia/lactato do que de cetose importante.',
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Não conduzir como “só glicose alta”',
            text: 'No EHH, a correção brusca de glicose/osmolalidade pode piorar o SNC. O paciente precisa de reidratação e monitoramento osmótico graduais.',
          },
        ],
      },
      {
        id: 'ehh-p2',
        title: 'Calcular sódio e osmolalidade',
        stepOrder: 2,
        phase: 'reconhecimento',
        intro: 'Esses cálculos organizam a terapia. A glicose desloca água para o extracelular e mascara a leitura do sódio.',
        blocks: [
          {
            type: 'formula',
            title: 'Sódio corrigido',
            expression: 'Na corrigido = Na medido + 1,6 x [(glicose medida - glicose normal) / 100]',
            note: 'Ajuda a diferenciar hiponatremia real de hiponatremia dilucional por hiperglicemia.',
          },
          {
            type: 'formula',
            title: 'Osmolalidade sérica calculada',
            expression: 'Osm calculada = 2 x Na + glicose/18 + ureia/2,8',
            variables: ['Referência citada: 290-310 mOsm/kg.', 'EHH: geralmente >350 mOsm/kg.'],
          },
          {
            type: 'formula',
            title: 'Osmolalidade efetiva',
            expression: 'Osm efetiva = 2 x Na + glicose/18',
            note: 'A ureia atravessa membranas com mais facilidade; por isso pesa menos no deslocamento efetivo de água entre compartimentos.',
          },
        ],
      },
      {
        id: 'ehh-p3',
        title: 'Fluidoterapia lenta e segura',
        stepOrder: 3,
        phase: 'estabilizacao',
        intro: 'A fluidoterapia é o tratamento inicial. Ela sozinha pode reduzir bastante a glicemia; por isso a insulina entra com cautela.',
        blocks: [
          {
            type: 'callout',
            variant: 'warning',
            title: 'Correção gradual',
            text: 'Evite queda abrupta de osmolalidade. A lógica é substituir progressivamente glicose por sódio enquanto restaura volume e perfusão.',
          },
          {
            type: 'table',
            title: 'Conduta inicial citada',
            columns: ['Situação', 'Conduta'],
            rows: [
              ['Primeiras horas', 'NaCl 0,9% citado como solução inicial.'],
              ['Hipovolemia', 'Restaurar perfusão com reavaliação seriada de PA, pulso, mucosas, lactato e débito urinário.'],
              ['Glicose caindo', 'Monitorar velocidade de queda; adicionar dextrose quando <250 mg/dL se insulina continuar necessária.'],
              ['Neurológico', 'Reavaliar mentação/convulsões; piora pode refletir mudança osmótica, hipoglicemia ou distúrbio eletrolítico.'],
            ],
          },
          {
            type: 'targetStrip',
            title: 'Metas de segurança',
            items: [
              { label: 'Queda glicêmica', value: '50-75 mg/dL/h', detail: 'Meta citada para EHH.' },
              { label: 'Dextrose', value: '<250 mg/dL', detail: 'Adicionar aos fluidos quando necessário.' },
              { label: 'Osmolalidade', value: 'sem queda brusca', detail: 'Recalcular em série.' },
            ],
          },
        ],
      },
      {
        id: 'ehh-p4',
        title: 'Eletrólitos',
        stepOrder: 4,
        phase: 'tratamento_especifico',
        intro: 'Diurese osmótica, desidratação e terapia com insulina expõem déficits de potássio, fósforo e magnésio.',
        blocks: [
          {
            type: 'table',
            title: 'Reposição citada',
            columns: ['Eletrólito', 'Conduta'],
            rows: [
              ['Potássio', '20-80 mEq/L de fluido, respeitando taxa máxima de 0,5 mEq/kg/h.'],
              ['Fósforo', 'Pode compor cerca de 25% da suplementação de K como fosfato de potássio; outros 75% como KCl.'],
              ['Magnésio', 'Sulfato de magnésio 0,75-1 mEq/kg em infusão contínua por 24 h.'],
            ],
            caption: 'Ajustar sempre por eletrólitos seriados, função renal e risco de hipocalcemia/hipernatremia.',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Renal e osmótico',
            text: 'EHH frequentemente cursa com azotemia/desidratação grave. Suplementação agressiva sem medidas seriadas aumenta risco de erro.',
          },
        ],
      },
      {
        id: 'ehh-p5',
        title: 'Insulina com cautela',
        stepOrder: 5,
        phase: 'tratamento_especifico',
        intro: 'Use insulina para controlar hiperglicemia persistente, mas lembre que o fluido pode derrubar glicose antes da insulina.',
        blocks: [
          {
            type: 'table',
            title: 'Protocolo IM citado',
            columns: ['Etapa', 'Conduta'],
            rows: [
              ['Dose inicial', 'Insulina regular 0,1 UI/kg IM.'],
              ['Manutenção', '0,05 UI/kg a cada 2-4 h.'],
              ['Glicemia', 'Checar a cada 4 h.'],
              ['Ajuste', 'Ajustar doses subsequentes em 25% para atingir meta.'],
              ['Dextrose', 'Adicionar quando glicose <250 mg/dL.'],
            ],
          },
          {
            type: 'table',
            title: 'CRI citada',
            columns: ['Glicose', 'Taxa da solução de insulina', 'Fluido'],
            rows: [
              ['>250 mg/dL', '10 mL/h', 'Sem dextrose.'],
              ['200-250 mg/dL', '7 mL/h', 'Adicionar dextrose 2,5%.'],
              ['150-199 mg/dL', '5 mL/h', 'Adicionar dextrose 2,5%.'],
              ['100-149 mg/dL', '5 mL/h', 'Adicionar dextrose 5%.'],
              ['<100 mg/dL', '0 mL/h', 'Manter dextrose 5%.'],
            ],
            caption: 'Preparo citado: 1 UI/kg de insulina regular em 250 mL de NaCl 0,9%; checar glicose a cada 2 h e ajustar.',
          },
        ],
      },
      {
        id: 'ehh-p6',
        title: 'Monitoramento e transição',
        stepOrder: 6,
        phase: 'monitoramento',
        intro: 'A alta ou transição só deve ser considerada quando volume, neurologia, eletrólitos e alimentação estiverem sob controle.',
        blocks: [
          {
            type: 'table',
            title: 'O que seguir em série',
            columns: ['Eixo', 'Por quê'],
            rows: [
              ['Glicemia', 'Garantir queda de 50-75 mg/dL/h e evitar hipoglicemia.'],
              ['Na corrigido e osmolalidade efetiva', 'Evitar correção osmótica brusca e correlacionar com neurologia.'],
              ['K, fósforo e Mg', 'Insulina e reidratação podem precipitar quedas rápidas.'],
              ['PA, perfusão e débito urinário', 'Guiar reidratação e risco renal/sobrecarga.'],
              ['Estado neurológico', 'Principal marcador clínico de hiperosmolalidade e complicações.'],
            ],
          },
          {
            type: 'keyPoints',
            title: 'Metas antes de transição/alta',
            items: [
              'Controle glicêmico otimizado sem queda osmótica rápida.',
              'Perfil eletrolítico estável.',
              'Alimentação normalizada ou plano nutricional seguro.',
              'Doença concomitante identificada e tratada.',
              'Dose e manejo domiciliar viáveis para o responsável.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eg-edema-pulmonar',
    slug: 'edema-pulmonar-cardiogenico',
    title: 'Manejo de edema pulmonar cardiogênico agudo',
    subtitle: 'Congestão aguda — oxigenação, redução de pré-carga e suporte',
    description:
      'Fluxo focado em oxigenar, reduzir estresse cardíaco e tratar gatilhos. Conteúdo detalhado e doses na próxima versão.',
    tags: ['Cardiologia', 'Respiratório', 'Emergência', 'ICC'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'ep-p1',
        title: 'Triagem e oxigenação',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro: 'Identificar padrão de dispneia congestiva e instalar suporte imediato.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Estabilizar respiração',
            text: 'Preview: posicionamento, oxigenoterapia, caixa de O₂ vs fluxo; quando considerar sedação leve.',
          },
          {
            type: 'checklist',
            title: 'Achados compatíveis (expandir)',
            items: [
              'Dispneia aguda com ruídos pulmonares úmidos / crackles',
              'História de cardiopatia ou murmúrio relevante',
              'Cianose ou esforço respiratório extremo = prioridade máxima',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: algoritmo imagem (rápido) vs estabilização primeiro.',
          },
        ],
      },
      {
        id: 'ep-p2',
        title: 'Tratamento farmacológico e monitorização',
        stepOrder: 2,
        phase: 'tratamento_especifico',
        blocks: [
          {
            type: 'steps',
            title: 'Eixo terapêutico (a detalhar)',
            items: [
              'Diurético de alça — dose e cautelas renais/hepáticas',
              'Vasodilatador / nitrato quando indicado no seu protocolo',
              'Opioides em estresse respiratório extremo — dose e monitoração',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Gato',
            text: 'Preview: nuances felinas (ex.: cautela com alguns vasodilatadores) — texto a incorporar.',
          },
          {
            type: 'placeholder',
            message: 'Preview: frequência de reavaliação, meta de FR, quando encaminhar UTI.',
          },
        ],
      },
    ],
  },
  {
    id: 'eg-tce',
    slug: 'traumatismo-cranioencefalico',
    title: 'Manejo de TCE',
    subtitle: 'Traumatismo cranioencefálico — neuroproteção e suporte',
    description:
      'Sequência: estabilização geral, controle de pressão intracraniana e suporte. Detalhes neuro e farmacológicos na versão completa.',
    tags: ['Neurologia', 'Trauma', 'Emergência', 'Anestesia'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'tce-p1',
        title: 'Primeiros minutos',
        stepOrder: 1,
        phase: 'estabilizacao',
        intro: 'Evitar hipóxia e hipotensão — ambas pioram desfecho neurológico.',
        blocks: [
          {
            type: 'callout',
            variant: 'critical',
            title: 'Coluna e via aérea',
            text: 'Preview: imobilização cervical quando indicado; priorizar oxigenação sem hiperventilar de rotina.',
          },
          {
            type: 'checklist',
            title: 'Avaliação neurológica rápida',
            items: [
              'Nível de consciência (escala do serviço)',
              'Pupilas e reflexos — série documentada',
              'Sinais de herniação (acionar protocolo de crise)',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: escore de coma modificado e fotos/desenho de pupilas para equipe.',
          },
        ],
      },
      {
        id: 'tce-p2',
        title: 'Medidas de suporte intracraniano',
        stepOrder: 2,
        phase: 'tratamento_especifico',
        blocks: [
          {
            type: 'steps',
            title: 'Pilares (completar com evidência)',
            items: [
              'Elevar cabeceira moderadamente quando seguro',
              'Manitol ou hipertônico — indicações e doses',
              'Evitar fator que aumente PIC (luta, vômito, hipertermia)',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Fluidoterapia',
            text: 'Preview: equilíbrio entre perfusão cerebral e edema — diretrizes do centro.',
          },
        ],
      },
      {
        id: 'tce-p3',
        title: 'Monitoramento contínuo',
        stepOrder: 3,
        phase: 'monitoramento',
        blocks: [
          {
            type: 'keyPoints',
            title: 'Série neurológica',
            items: [
              'Frequência de reavaliação nas primeiras horas',
              'Quando repetir imagem',
              'Critérios de piora que exigem escalação',
            ],
          },
          {
            type: 'placeholder',
            message: 'Preview: plano de analgesia segura, anticonvulsivante de resgate e prognóstico conversado com tutor.',
          },
        ],
      },
    ],
  },
];
