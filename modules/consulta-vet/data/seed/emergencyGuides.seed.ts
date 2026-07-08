import { EmergencyGuide } from '../../types/emergencyGuide';

/** Cartilhas de manejo emergencial em fluxo único para consulta rápida de plantão. */
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
        title: 'Diagnóstico e gravidade',
        stepOrder: 2,
        phase: 'reconhecimento',
        intro:
          'Depois de suspeitar de CAD, confirme a tríade e estime gravidade. A função deste passo é responder rápido: é diabetes? tem cetose? tem acidose? se sim, trate como CAD enquanto investiga o gatilho.',
        blocks: [
          {
            type: 'targetStrip',
            title: 'CAD fecha quando os 3 eixos estão presentes',
            items: [
              { label: 'Diabetes/hiperglicemia', value: '>200 cão / >300 gato', detail: 'Com sinais clínicos e glicosúria; gato exige cuidado com hiperglicemia de estresse.' },
              { label: 'Cetose', value: 'BHB >=2,4-3,8 mmol/L', detail: 'Faixa compatível com CAD conforme espécie/estudo; quanto maior, maior suspeita.' },
              { label: 'Acidose', value: 'pH <7,30 ou HCO3 <15', detail: 'Fecha o “A” da CAD e separa cetose diabética de cetoacidose.' },
            ],
          },
          {
            type: 'steps',
            title: 'Como usar no plantão',
            items: [
              'Se glicose alta + BHB alto/cetonúria moderada a intensa + pH/HCO3 baixos: trate como CAD.',
              'Se glicose alta + cetose, mas pH/HCO3 normais: é cetose diabética; monitorar de perto porque pode evoluir.',
              'Se acidose grave sem cetose importante: procure lactato, uremia, choque, toxinas e outras causas de acidose metabólica.',
              'Se gato tem glicose alta sem cetose/acidose: diferenciar estresse de diabetes com glicosúria persistente, frutosamina e sinais clínicos.',
              'Se paciente está chocado, hipovolêmico ou com K crítico: estabilize antes de esperar todos os resultados.',
            ],
          },
          {
            type: 'table',
            title: 'Diabetes/hiperglicemia: valores de referência prática',
            columns: ['Marcador', 'Valor', 'Interpretação'],
            rows: [
              ['Glicemia normal esperada', '~80-120 mg/dL', 'Varia por laboratório e contexto; use como referência mental, não como único critério.'],
              ['Limiar renal cão', '~180-220 mg/dL', 'Acima disso tende a aparecer glicosúria.'],
              ['Limiar renal gato', '~250-300 mg/dL', 'Gatos podem ter hiperglicemia de estresse; glicosúria persistente pesa mais.'],
              ['Diabetes provável em cão', '>200 mg/dL persistente + glicosúria + PU/PD/perda de peso', 'Repetir/confirmar se o paciente estiver estável.'],
              ['Diabetes provável em gato', '>300 mg/dL + glicosúria + sinais clínicos', 'Se dúvida por estresse, repetir e/ou dosar frutosamina.'],
              ['CAD euglicêmica', 'Glicose normal ou pouco alta + BHB alto + acidose', 'Rara; considerar com terapia prévia ou inibidor de SGLT2.'],
            ],
            caption: 'A CAD clássica costuma cursar com hiperglicemia, mas a definição crítica é diabetes/deficiência de insulina + cetose + acidose metabólica.',
          },
          {
            type: 'table',
            title: 'Cetose: BHB sanguíneo e cetonúria',
            columns: ['Teste', 'Valor', 'Interpretação prática'],
            rows: [
              ['BHB', '<0,6 mmol/L', 'Normal ou cetose improvável; se há acidose, procurar outra causa.'],
              ['BHB', '0,6-1,5 mmol/L', 'Cetose leve/jejum/doença inicial; repetir se paciente diabético está doente.'],
              ['BHB', '1,6-2,3 mmol/L', 'Zona de alerta; checar pH/HCO3 e monitorar evolução.'],
              ['BHB', '>=2,4 mmol/L', 'Compatível com CAD em gatos quando há diabetes/hiperglicemia e acidose.'],
              ['BHB', '>3,0 mmol/L', 'Forte suspeita de CAD em cão/gato doente; confirmar acidose e eletrólitos.'],
              ['BHB', '>3,8 mmol/L', 'Cutoff estudado para CAD canina por medidor portátil; alta suspeita.'],
              ['Cetonúria', 'Negativa', 'Não exclui CAD, porque a fita não mede bem BHB.'],
              ['Cetonúria', 'Traços / 1+', 'Cetose leve; cruzar com glicose, sinais e gasometria.'],
              ['Cetonúria', '2+', 'Cetose clinicamente relevante; investigar acidose imediatamente.'],
              ['Cetonúria', '3+ / 4+', 'Cetose intensa; em diabético doente, tratar como alto risco de CAD.'],
            ],
            caption: 'BHB é melhor para diagnóstico e resolução. A fita urinária detecta principalmente acetoacetato e pode subestimar CAD grave/inicial.',
          },
          {
            type: 'table',
            title: 'Acidose: pH e bicarbonato',
            columns: ['pH / HCO3', 'Interpretação', 'Implicação prática'],
            rows: [
              ['pH >=7,35 e HCO3 normal', 'Sem acidose metabólica', 'Diabetes + cetose sem acidose = cetose diabética, não CAD completa.'],
              ['pH 7,30-7,34 ou HCO3 15-18', 'Acidose leve/limítrofe', 'Pode ser CAD inicial ou acidose mista; repetir gasometria.'],
              ['pH 7,20-7,29 ou HCO3 10-14', 'CAD moderada', 'Fluido, eletrólitos e insulina gradual com monitorização intensiva.'],
              ['pH 7,10-7,19 ou HCO3 5-9', 'CAD grave', 'Maior risco de choque, alteração mental e hipocalemia durante tratamento.'],
              ['pH <7,10 ou HCO3 <5', 'Acidose crítica', 'Reavaliar perfusão, ventilação, K, lactato e renal; considerar UTI.'],
              ['HCO3 <11 ou CO2 total <12', 'Faixa para considerar bicarbonato', 'Não é automático; pesar riscos, ventilação, K e resposta ao tratamento.'],
            ],
            caption: 'CAD típica: acidose metabólica com anion gap aumentado. Lactato, uremia e hipercloremia podem somar ou confundir a interpretação.',
          },
          {
            type: 'table',
            title: 'Exames que fecham o raciocínio',
            columns: ['Eixo', 'O que pedir', 'Como interpretar'],
            rows: [
              ['Glicose', 'Glicemia seriada', 'Confirma hiperglicemia e permite monitorar queda. Queda rápida demais aumenta risco osmótico.'],
              ['Cetonas', 'Beta-hidroxibutirato sanguíneo se disponível; cetonúria como triagem', 'Fita urinária detecta mais acetoacetato e pode subestimar CAD grave com BHB predominante.'],
              ['Ácido-base', 'Hemogasometria venosa ou arterial, HCO3, pH, CO2, anion gap quando possível', 'CAD típica: acidose metabólica com HCO3 baixo; lactato/uremia podem somar acidose.'],
              ['Eletrólitos', 'Na, K, Cl, fósforo, Mg, Ca', 'K pode parecer normal/alto apesar de déficit corporal; insulina pode precipitar hipocalemia. Fósforo e Mg caem durante tratamento.'],
              ['Renal/perfusão', 'Ureia, creatinina, lactato, débito urinário, densidade urinária', 'Azotemia pode ser pré-renal, renal ou mista; perfusão define fluido e segurança da insulina.'],
              ['Gatilhos', 'Hemograma, bioquímica, urinálise, urocultura, imagem conforme caso, avaliação pancreática quando indicado', 'ITU, pancreatite, sepse, cio, HAC, neoplasia, DRC e lipidose em gatos são causas que mantêm CAD.'],
            ],
          },
          {
            type: 'comparison',
            title: 'Gravidade e quadro misto',
            columns: ['CAD menos grave', 'CAD grave', 'CAD + EHH/misto'],
            rows: [
              {
                label: 'Mentação',
                values: ['Alerta ou deprimido leve', 'Deprimido, estupor, choque ou respiração compensatória marcada', 'Alteração neurológica desproporcional à acidose'],
              },
              {
                label: 'Osmolalidade',
                values: ['Aumentada, mas sem predomínio neurológico', 'Pode estar aumentada junto de hipovolemia importante', 'Muito aumentada; risco maior se glicose extrema e Na corrigido alto'],
              },
              {
                label: 'Prioridade',
                values: ['Fluido, eletrólitos, insulina gradual', 'Perfusão e K antes de insulina; monitorização intensiva', 'Reidratação e queda osmótica ainda mais lentas'],
              },
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Não espere todos os exames para estabilizar',
            text: 'Se há hipovolemia, choque, alteração de consciência ou K crítico, trate enquanto confirma. A coleta inicial deve acontecer cedo, mas não deve atrasar oxigenação, acesso venoso, perfusão e correção eletrolítica segura.',
          },
        ],
      },
      {
        id: 'ca-p3',
        title: 'Primeiros 15 minutos',
        stepOrder: 3,
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
        id: 'ca-p4',
        title: 'Fluidoterapia',
        stepOrder: 4,
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
        id: 'ca-p5',
        title: 'Potássio, fósforo e magnésio',
        stepOrder: 5,
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
        id: 'ca-p6',
        title: 'Bicarbonato',
        stepOrder: 6,
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
        id: 'ca-p7',
        title: 'Insulinoterapia',
        stepOrder: 7,
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
        id: 'ca-p8',
        title: 'Monitoramento e transição',
        stepOrder: 8,
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
            title: 'Sinais que chamam aténção',
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
        intro: 'A fluidoterapia é o tratamento inicial. Ela sozinhá pode reduzir bastante a glicemia; por isso a insulina entra com cautela.',
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
    slug: 'edema-pulmonar-cardiogênico',
    title: 'Manejo de edema pulmonar cardiogênico agudo',
    subtitle: 'Congestão aguda — oxigenação, redução de pré-carga e suporte',
    description:
      'Fluxo focado em oxigenar, reduzir estresse cardiorrespiratório, aliviar congestão e monitorar resposta sem precipitar piora renal ou respiratória.',
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
            text: 'Dispneia grave deve ser estabilizada antes de radiografia. Priorize mínimo estresse, posição confortável, oxigênio por método tolerado e sedação leve quando a ansiedade piora o trabalho respiratório.',
          },
          {
            type: 'checklist',
            title: 'Achados compatíveis',
            items: [
              'Dispneia aguda com ruídos pulmonares úmidos / crackles',
              'História de cardiopatia ou murmúrio relevante',
              'Cianose ou esforço respiratório extremo = prioridade máxima',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Imagem depois da estabilizacao',
            text: 'Se o paciente piora com manipulação, adie radiografia e trate primeiro a hipoxemia. Use POCUS/eco focado quando disponível e seguro.',
          },
        ],
      },
      {
        id: 'ep-p2',
        title: 'Tratamento fármacológico e monitorização',
        stepOrder: 2,
        phase: 'tratamento_especifico',
        blocks: [
          {
            type: 'steps',
            title: 'Eixo terapêutico',
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
            text: 'Gato dispneico descompensa com contenção. Oxigênio, ambiente quieto, dose cautelosa de diurético e reavaliação frequente costumam valer mais que exames completos imediatos.',
          },
          {
            type: 'targetStrip',
            title: 'Monitorização prática',
            items: [
              { label: 'FR/esforço', value: 'q15-30 min', detail: 'Até reduzir esforço e ansiedade.' },
              { label: 'Perfusão/renal', value: 'seriado', detail: 'Diuretico e vasodilatador exigem vigilância.' },
              { label: 'Escalar', value: 'hipoxemia persistente', detail: 'Considerar UTI, suporte ventilatório ou diagnóstico alternativo.' },
            ],
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
      'Sequência para reduzir lesão secundária: oxigenação, perfusão, avaliação neurológica seriada, controle de pressão intracraniana quando indicado e monitorização intensiva.',
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
            text: 'Presuma trauma cervical quando o mecanismo permitir. Imobilize com bom senso, priorize oxigenação e perfusão, e evite hiperventilação de rotina.',
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
            type: 'table',
            title: 'Série neurológica mínima',
            columns: ['Eixo', 'Registrar'],
            rows: [
              ['Consciência', 'Alerta, deprimido, estupor ou coma; usar escala do serviço quando houver.'],
              ['Pupilas', 'Tamanho, simetria e PLR; repetir em série.'],
              ['Motor', 'Postura, paresia, lateralização e dor espinhal quando avaliável.'],
            ],
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
            title: 'Pilares de suporte intracraniano',
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
            text: 'A prioridade e manter perfusão cerebral sem piorar edema. Hipotensão e hipoxemia são inimigas imediatas; osmoterapia entra quando há sinais de hipertensão intracraniana ou herniação iminente.',
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
            type: 'checklist',
            title: 'Plano de continuidade',
            items: [
              'Analgesia que não comprometa avaliação neurológica ou ventilação.',
              'Anticonvulsivante de resgaté disponível se crise ocorrer.',
              'Reavaliação seriada de pupilas, consciência, respiração, temperatura e pressão.',
              'Conversa objetiva com tutor sobre risco de deterioração nas primeiras horas.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eg-hipertensão-sistêmica-grave',
    slug: 'hipertensão-sistêmica-grave',
    title: 'Hipertensão arterial sistêmica grave',
    subtitle: 'Crise hipertensiva em cães e gatos - olho, SNC, rim e coração',
    description:
      'Guia de plantão para confirmar PAS real, diferenciar urgência de emergência hipertensiva, reconhecer lesão em órgão-alvo, reduzir pressão sem derrubar perfusão e transicionar para tratamento oral.',
    tags: ['Cardiorrenal', 'UTI', 'Pressão arterial', 'Oftalmo'],
    species: ['dog', 'cat'],
    isPublished: true,
    pages: [
      {
        id: 'has-p1',
        title: 'Definir gravidade',
        stepOrder: 1,
        phase: 'reconhecimento',
        intro:
          'A emergência hipertensiva não e definida apenas pelo número. O ponto decisivo é PAS muito alta associada a lesão aguda ou progressiva em órgão-alvo, principalmente retina, SNC, rim ou coração.',
        blocks: [
          {
            type: 'table',
            title: 'Classificação prática por PAS',
            columns: ['PAS/SBP', 'Interpretação', 'Risco de lesão em órgão-alvo'],
            rows: [
              ['<140-150 mmHg', 'Normotenso ou baixo risco', 'Mínimo'],
              ['150-159 mmHg', 'Limítrofe', 'Baixo'],
              ['160-179 mmHg', 'Hipertensão', 'Moderado'],
              ['>=180 mmHg', 'Hipertensão grave', 'Alto'],
            ],
          },
          {
            type: 'comparison',
            title: 'Urgência vs emergência hipertensiva',
            columns: ['Urgência', 'Emergência'],
            rows: [
              {
                label: 'Definição',
                values: ['PAS muito alta sem lesão progressiva evidente', 'PAS geralmente >=180 + lesão aguda/progressiva em órgão-alvo'],
              },
              {
                label: 'Tempo de ação',
                values: ['Confirmar, iniciar VO e reavaliar em dias', 'Internar e reduzir em horas com monitorização'],
              },
              {
                label: 'Exemplo',
                values: ['Gato calmo PAS 190 sem sinais oculares, neuro, cardíacos ou renais agudos', 'PAS 190 + cegueira súbita, hifema, convulsão, edema pulmonar ou piora renal aguda'],
              },
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Regra mental do plantão',
            text: 'PAS >=180 mmHg com cegueira súbita, hifema, descolamento de retina, convulsão, alteração mental, sinal vestibular central, edema pulmonar ou piora renal aguda deve ser tratada como emergência hipertensiva.',
          },
        ],
      },
      {
        id: 'has-p2',
        title: 'Confirmar que a PAS é real',
        stepOrder: 2,
        phase: 'reconhecimento',
        intro:
          'Antes de terapia agressiva, reduza artefato de estresse, dor, manguito inadequado e técnica inconsistente. A medida isolada não deve comandar todo o caso.',
        blocks: [
          {
            type: 'steps',
            title: 'Técnica de mensuração',
            items: [
              'Ambiente calmo, tutor presente se ajudar, e 5-10 minutos de aclimatação; em gatos muito estressados, prolongar.',
              'Medir antes de procedimentos dolorosos, coleta, contenção intensa ou manipulação.',
              'Usar mesmo método, mesmo local, mesma posição e manguito de largura aproximada de 30-40% da circunferência do membro ou cauda.',
              'Descartar a primeira medida, obter 5-7 leituras, remover valores muito discrepantes e registrar a média.',
              'Registrar método, local do manguito, posição, comportamento e operador para comparação seriada.',
            ],
          },
          {
            type: 'comparison',
            title: 'Método de pressão',
            columns: ['Melhor uso', 'Limitação'],
            rows: [
              {
                label: 'Doppler',
                values: ['Gatos e cães pequenos; muito útil em clínica', 'Fornece principalmente PAS; PAD pouco confiável'],
              },
              {
                label: 'Oscilométrico/HDO',
                values: ['Monitorização seriada ou automática', 'Pode falhar com gato, cão pequeno, arritmia, tremor, vasoconstrição ou choque'],
              },
              {
                label: 'Invasiva arterial',
                values: ['Padrão-ouro para CRI de vasodilatador potente', 'Exige catéter arterial, monitor e equipe treinada'],
              },
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Não trate o número isolado',
            text: 'Interprete PAS junto com pulso, perfusão, TPC, lactato, dor, estresse, consciência, frequência cardíaca e consistência das leituras.',
          },
        ],
      },
      {
        id: 'has-p3',
        title: 'Procurar órgão-alvo',
        stepOrder: 3,
        phase: 'reconhecimento',
        intro:
          'A busca ativa por lesão em órgão-alvo transforma a decisão. Olho e SNC costumam denunciar a crise, mas rim e coração definem risco e monitorização.',
        blocks: [
          {
            type: 'table',
            title: 'Checklist de TOD',
            columns: ['Órgão', 'O que procurar', 'Como muda a conduta'],
            rows: [
              ['Olho', 'Ameaça, PLR, fundoscopia, hifema, hemorragia, edema, tortuosidade, papiledema, descolamento de retina', 'Cegueira súbita + PAS alta = emergência; prognóstico visual depende da duração e severidade'],
              ['SNC', 'Mentação, convulsão, ataxia, head tilt, nistagmo central, anisocoria, paresia, cegueira central', 'Sugere encefalopatia hipertensiva; preferir controle titulável se grave'],
              ['Rim', 'Ureia, creatinina, SDMA se disponível, eletrólitos, fósforo, urinálise, densidade, sedimento, UPC e débito urinário', 'DRC/AKI pode ser causa e consequência; UPC muda prognóstico e terapia'],
              ['Coração', 'Sopro, galope, arritmia, ECG, radiografia se dispneia, eco quando possível, sinais de edema pulmonar', 'Hipertensão aumenta pós-carga; dispneia muda prioridade para oxigênio e descongestão'],
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Cuidado com hipertensão compensatória',
            text: 'Se houver suspeita de aumento de pressão intracraniana por TCE, massa, edema cerebral ou reflexo de Cushing, a hipertensão pode estar mantendo perfusão cerebral. Não reduza agressivamente sem avaliar o contexto.',
          },
        ],
      },
      {
        id: 'has-p4',
        title: 'Algoritmo de conduta',
        stepOrder: 4,
        phase: 'estabilizacao',
        intro:
          'A redução deve ser gradual. Em hipertensão crônica, cérebro e rim se adaptam a pressão alta; queda brusca pode causar hipoperfusão, síncope, piora renal e colapso.',
        blocks: [
          {
            type: 'table',
            title: 'Decisão por faixa e TOD',
            columns: ['Cenário', 'Classificação', 'Conduta'],
            rows: [
              ['PAS 160-179 sem TOD', 'Hipertensão / risco moderado', 'Repetir técnica, investigar causa, hemograma, bioquímica, urinálise, UPC e fundoscopia; tratar base'],
              ['PAS >=180 sem TOD aguda', 'Urgência hipertensiva', 'Confirmar se estável, iniciar VO, reavaliar em dias e procurar causa primária'],
              ['PAS >=180 + TOD aguda/progressiva', 'Emergência hipertensiva', 'Internar, acesso venoso, monitorizar PAS frequente e reduzir em horas'],
            ],
          },
          {
            type: 'targetStrip',
            title: 'Metas iniciais',
            items: [
              { label: 'Primeiras 2-4 h', value: '-20 a -25%', detail: 'Ou trazer PAS para cerca de 160-170 mmHg.' },
              { label: 'Depois', value: '<160 mmHg', detail: 'Se perfusão, rim e SNC tolerarem.' },
              { label: 'Evitar', value: '<120 mmHg', detail: 'Fraqueza/síncope com PAS <120 sugere hipotensão clínica.' },
            ],
          },
          {
            type: 'steps',
            title: 'Emergência verdadeira',
            items: [
              'Internar e minimizar estresse.',
              'Instalar acesso venoso; considerar catéter arterial se usar vasodilatador potente.',
              'PAS a cada 5-15 min em fármaco IV titulável; depois a cada 30-60 min conforme estabilidade.',
              'Escolher fármaco pela espécie, gravidade, possibilidade de VO, comorbidades e capacidade de monitorização.',
              'Transicionar para anti-hipertensivo VO assim que seguro.',
            ],
          },
        ],
      },
      {
        id: 'has-p5',
        title: 'Escolher o fármaco',
        stepOrder: 5,
        phase: 'tratamento_especifico',
        intro:
          'A escolhá depende do fenótipo. Gatos com lesão ocular e VO possível frequentemente respondem a amlodipina; encefalopatia, convulsão, edema pulmonar ou crise catécolaminergica podem exigir terapia IV titulável.',
        blocks: [
          {
            type: 'table',
            title: 'Doses rápidas',
            columns: ['Fármaco', 'Cão', 'Gato', 'Observação'],
            rows: [
              ['Amlodipina', '0,1-0,3 mg/kg VO SID; até 0,5 mg/kg/dia', '0,625 mg/gato SID ou 0,1-0,2 mg/kg SID; casos graves podem precisar 1,25 mg/gato SID/BID', 'Base em gato; em cao renal/proteinúrico, considerar associar bloqueio RAAS'],
              ['Amlodipina ataque felino', '-', '0,1-0,2 mg/kg VO q2h até PAS <170 ou máximo cumulativo 1 mg/kg', 'Apenas com monitorização próxima; risco de hipotensão tardia'],
              ['Nitroprussiato', 'Iniciar 0,5-1 mcg/kg/min IV CRI; titular; algumas fontes até 5-10/15', 'Iniciar 0,5-1 mcg/kg/min; geralmente até 2-5', 'UTI, bomba, proteger da luz, D5W, nunca bolus'],
              ['Hidralazina bolus', '0,1-0,2 mg/kg IV/IM q2h se necessário', '1-2,5 mg/gato SC; pode repetir em 15-30 min', 'Resposta menos previsível que nitroprussiato'],
              ['Hidralazina CRI', 'Bolus 0,1 mg/kg IV + 1,5-5 mcg/kg/min', 'Similar, com cautela', 'Monitorar PAS e FC'],
              ['Esmolol', 'Bolus 250-500 mcg/kg; depois 25-200 mcg/kg/min CRI', 'Similar', 'Útil se componente simpático/taquicárdico; não e universal'],
              ['Fentolamina', '0,02-0,1 mg/kg IV bolus + CRI a efeito', 'Similar', 'Crise por feocromocitoma/catécolaminas'],
              ['Fenoxibenzamina', '0,25-0,5 mg/kg VO BID; titular até 1-2 mg/kg BID', 'Pouco usada', 'Preparo/controle de feocromocitoma'],
            ],
            caption: 'Doses devem ser individualizadas por perfusão, função renal/hepática, resposta pressórica e capacidade de monitorização.',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Feocromocitoma',
            text: 'Se suspeitar de feocromocitoma, não use beta-bloqueador isolado. Alfa-bloqueio deve vir antes para evitar vasoconstrição alfa sem oposição.',
          },
        ],
      },
      {
        id: 'has-p6',
        title: 'Nitroprussiato e CRI',
        stepOrder: 6,
        phase: 'tratamento_especifico',
        intro:
          'Nitroprussiato e rápido, potente e titulável. Ele é excelente para emergência real quando existe bomba e monitorização intensiva, mas perigoso se usado como bolus ou sem vigilância.',
        blocks: [
          {
            type: 'checklist',
            title: 'Cuidados obrigatórios',
            items: [
              'Usar bomba de infusão e linhá dedicada quando possível.',
              'Diluir preferencialmente em glicose 5%/D5W e proteger da luz.',
              'Não administrar em bolus e não flushar a linha.',
              'Idealmente monitorar pressão arterial invasiva; se indireta, medir muito frequentemente.',
              'Evitar uso prolongado e vigiar acidose metabólica, renal/hepático grave e sinais de toxicidade por cianeto/tiocianato.',
            ],
          },
          {
            type: 'formula',
            title: 'Fórmula universal para mcg/kg/min',
            expression: 'mL/h = dose (mcg/kg/min) x peso (kg) x 60 / concentração (mcg/mL)',
            variables: ['Exemplo: solução 100 mcg/mL -> mL/h = dose x peso x 0,6.', 'Exemplo: 10 kg a 0,5 mcg/kg/min em 100 mcg/mL = 3 mL/h.'],
          },
          {
            type: 'formula',
            title: 'Preparo prático 100 mcg/mL',
            expression: '50 mg em volume final de 500 mL = 100 mcg/mL',
            note: '50 mg = 50.000 mcg; 50.000 mcg / 500 mL = 100 mcg/mL.',
          },
          {
            type: 'formula',
            title: 'Preparo prático 200 mcg/mL',
            expression: '50 mg em volume final de 250 mL = 200 mcg/mL',
            note: 'Para pacientes maiores ou restrição de volume; recalcular sempre a taxa.',
          },
        ],
      },
      {
        id: 'has-p7',
        title: 'Cenários de plantão',
        stepOrder: 7,
        phase: 'tratamento_especifico',
        intro:
          'Use o fenótipo para não tratar todos os hipertensos iguais. A mesma PAS pode pedir amlodipina VO, CRI titulável, controle cardiorrespiratório ou bloqueio alfa.',
        blocks: [
          {
            type: 'table',
            title: 'Conduta por apresentação',
            columns: ['Cenário', 'Raciocínio', 'Conduta prática'],
            rows: [
              ['Gato PAS 220 + cegueira/descolamento de retina', 'Emergência hipertensiva ocular; DRC/hipertireoidismo comuns', 'Amlodipina 0,625-1,25 mg/gato VO se estável; reavaliar PAS em 2-4 h; se encefalopatia/convulsão, considerar nitroprussiato CRI'],
              ['Cão DRC + proteinúria + PAS 200 sem TOD aguda', 'Urgência grave com componente renal/glomerular', 'Bloqueio RAAS conforme caso; adicionar amlodipina 0,1-0,2 mg/kg VO SID se PAS muito alta; recheck 3-7 dias se instável'],
              ['Cão massa adrenal + PAS 260 + taquicardia paroxística', 'Suspeita de feocromocitoma', 'ECG e PAS seriada; crise com nitroprussiato ou fentolamina se disponível; preparo com fenoxibenzamina; beta apenas após alfa'],
              ['Hipertensão + dispneia/edema pulmonar', 'Pós-carga alta e congestão podem piorar troca gasosa', 'Oxigênio, mínima contenção, furosemida se edema cardiogênico, considerar nitroprussiato se monitorável; evitar fluidos automáticos'],
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Prescrição hospitalar quando há UTI',
            text: 'Nitroprussiato 0,5 mcg/kg/min IV CRI, aumentar 0,5-1 mcg/kg/min a cada 5-10 min até redução progressiva. Meta: queda de 20-25% em 2-4 h. Associar VO quando possível: gato com amlodipina; cão com IECA/ARB +/- amlodipina conforme renal/proteinúria.',
          },
        ],
      },
      {
        id: 'has-p8',
        title: 'Exames complementares',
        stepOrder: 8,
        phase: 'monitoramento',
        intro:
          'Os exames procuram causa primária, lesão secundária e limitadores de tratamento. Hipertensão grave sem investigação vira tratamento cego.',
        blocks: [
          {
            type: 'table',
            title: 'Painel inicial e interpretação',
            columns: ['Exame', 'Achados úteis'],
            rows: [
              ['Hemograma', 'Anemia não regenerativa sugere DRC; policitemia pode aumentar viscosidade; leucograma de estresse pode aparecer em dor, HAC ou estresse'],
              ['Bioquímica', 'Ureia/creatinina/fósforo para DRC/AKI; ALT/FA em HAC/hepatopatia; colesterol/triglicérides em endocrinopatias; glicose para DM/estresse'],
              ['Eletrólitos', 'Hipocalemia em hiperaldosteronismo felino, DRC ou diurético; hipernatremia + hipocalemia aumenta suspeita de mineralocorticoide'],
              ['Urinálise + UPC', 'Densidade baixa, sedimento e proteinúria; UPC é indispensável no hipertenso renal/proteinúrico'],
              ['T4 total em gato', 'Hipertireoidismo e causa importante de hipertensão felina'],
            ],
          },
          {
            type: 'table',
            title: 'Imagem e cardiologia',
            columns: ['Método', 'Quando ajuda'],
            rows: [
              ['Ultrassom abdominal', 'Rins crúnicos/AKI, alterações adrenais, massa adrenal, trombo ou invasão vascular em suspeita de feocromocitoma'],
              ['Radiografia torácica', 'Dispneia, tosse, sopro, crepitação ou suspeita de edema pulmonar'],
              ['Ecocardiograma', 'Hipertrofia ventricular esquerda, alteração diastólica, átrio esquerdo, cardiomiopatia primária vs hipertensão secundária'],
              ['Fundoscopia', 'Documenta retinopatia hipertensiva e urgência de controle pressórico'],
            ],
          },
        ],
      },
      {
        id: 'has-p9',
        title: 'Monitorizar e ajustar',
        stepOrder: 9,
        phase: 'monitoramento',
        intro:
          'A fase perigosa e tanto a pressão persistente quanto a redução excessiva. Ajuste pelo paciente, não por uma meta numérica rígida.',
        blocks: [
          {
            type: 'table',
            title: 'Frequência em terapia titulável',
            columns: ['Parâmetro', 'Frequência prática'],
            rows: [
              ['PAS/PAM', 'A cada 5-10 min até dose efetiva; depois 15-30 min; estável, a cada 1 h'],
              ['ECG e FC', 'Contínuo se possível, especialmente com vasodilatador, esmolol ou arritmia'],
              ['Perfusão', 'Pulso, TPC, extremidades, lactato quando crítico'],
              ['Neurológico', 'Mentação, convulsão, pupilas, vestibular e resposta visual'],
              ['Renal', 'Débito urinário, creatinina, ureia e eletrólitos seriados'],
            ],
          },
          {
            type: 'checklist',
            title: 'Sinais de queda excessiva',
            items: [
              'Fraqueza, síncope ou colapso.',
              'Pulso fraco, extremidades frias, TPC prolongado.',
              'Bradicardia ou taquicardia reflexa.',
              'Oligúria ou piora de creatinina.',
              'Alteração mental após redução pressórica.',
              'PAS <120 mmHg, especialmente se sintomática.',
            ],
          },
        ],
      },
      {
        id: 'has-p10',
        title: 'Resumo de bolso',
        stepOrder: 10,
        phase: 'monitoramento',
        intro:
          'Use este bloco quando precisar decidir rápido. Depois volte aos detalhes para dose, preparo, exames e transição.',
        blocks: [
          {
            type: 'keyPoints',
            title: 'Essenciais',
            items: [
              'Hipertensão grave: PAS >=180 mmHg.',
              'Emergência hipertensiva: PAS >=180 + lesão ocular, neurológica, cardíaca ou renal aguda/progressiva.',
              'Confirmar técnica: ambiente calmo, manguito correto, 5-7 medidas e média registrada.',
              'Olho, cérebro, rim e coração são os órgãos-alvo que mudam urgência e prognóstico.',
              'Meta inicial: reduzir 20-25% em 2-4 h ou para 160-170 mmHg; não normalizar de uma vez.',
              'Gato: amlodipina é base; crise neurológica pode exigir nitroprussiato.',
              'Cão renal/proteinúrico: pensar em bloqueio RAAS +/- amlodipina; crise com TOD pede fármaco IV titulável.',
              'Nitroprussiato: excelente, mas exige bomba, proteção da luz, D5W e monitorização intensa; nunca bolus ou flush.',
            ],
          },
          {
            type: 'callout',
            variant: 'critical',
            title: 'Frase de segurança',
            text: 'O objetivo não e transformar PAS 220 em PAS 120 rapidamente; é interromper lesão em órgão-alvo mantendo perfusão cerebral e renal.',
          },
        ],
      },
    ],
  },
];
