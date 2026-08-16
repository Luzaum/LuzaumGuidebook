import type { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/giardiase-caes-gatos';

/**
 * Giardíase em cães e gatos — síntese editorial ConsultaVET.
 * Prioridade: ESCCAP GL6 2025 > CAPC 2025 > ABCD 2025 > BSAVA Gastroenterology/Formulary >
 * Nelson & Couto 2020 > Plumb's 2023 > Barrera 2024 > Ciuca 2021 > Kaufmann 2022 >
 * Allain & Buret 2017 > CDC/DPDx > Fonseca 2026 > Greene > Tizard (vacina).
 */
export const giardiaseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-giardiase-caes-gatos',
  slug: 'giardiase-caes-gatos',
  title: 'Giardíase em cães e gatos',
  subtitle:
    'Protozoose intestinal flagelada — diagnóstico coproparasitológico e manejo clínico-ambiental',
  synonyms: [
    'Giardiose',
    'Infecção por Giardia duodenalis',
    'Giardia intestinalis',
    'Giardia lamblia',
    'Giardiasis',
    'Enteropatia por Giardia',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: ['infectologia', 'parasitologia'],
  tags: [
    'Giardia',
    'Protozoo',
    'Diarreia',
    'Coproscopia',
    'Fenbendazol',
    'Metronidazol',
    'ZnSO4',
    'Zoonose',
    'ELISA',
    'PCR',
    'Tritrichomonas',
    'Higiene ambiental',
    'ESCCAP',
  ],
  vinReferencePending: true,
  quickSummary:
    'Giardíase é infecção intestinal por *Giardia duodenalis* (assemblages caninos e felinos), frequentemente assintomática ou associada a diarreia aguda/crônica, esteatorreia e perda ponderal. O achado coproparasitológico positivo não prova causalidade isolada — comorbidades (parasitas, IBD, IPE, dietas) são comuns. Diagnóstico: três amostras fecais em dias alternados com flutuação em sulfato de zinco (ZnSO₄) ou imunoensaio/PCR conforme disponibilidade; ELISA/PCR aumentam sensibilidade, mas não substituem reavaliação clínica pós-tratamento. Tratamento de primeira linha: fenbendazol 50 mg/kg VO q24h por 5 dias em cães e gatos; metronidazol é alternativa, não preferencial. Higiene ambiental rigorosa (remoção de fezes, desinfecção, banho no último dia) é tão importante quanto o antiparasitário — reinfecção por ambiente contaminado é causa frequente de falha aparente. (3)(4)(5)',
  quickDecisionStrip: [
    'Positivo em fezes ≠ causa única da diarreia — integrar clínica, coproparasitológico ampliado e comorbidades antes de rotular “só Giardia”. (3)(4)(6)',
    'Flutuação em sulfato de zinco (ZnSO₄ 33% + água destilada) permanece método de referência coproparasitológico — técnica e concentração importam. (3)(10)',
    'Solicitar ≥3 amostras fecais em dias alternados (idealmente 5–7 dias) — excreção cística é intermitente; amostra única subestima sensibilidade. (3)(4)(10)',
    'Fenbendazol 50 mg/kg VO q24h por 5 dias consecutivos — primeira linha em cães e gatos (ESCCAP GL6; CAPC). (3)(4)(8)',
    'Metronidazol 25 mg/kg q12h por 5–7 dias é alternativa, não primeira linha; eficácia variável e resistência descrita — reservar quando fenbendazol indisponível/contraindicado. (3)(7)(11)',
    'Não prescrever albendazol, tinidazol ou “vermífugo genérico” como tratamento padrão — esquemas não consensuais e risco de efeitos adversos. (3)(4)(7)',
    'ELISA coproantígeno e PCR aumentam detecção, mas positividade não define cura nem indica tratamento isolado em assintomático de baixo risco. (3)(4)(10)',
    'Higiene ambiental: remover fezes diariamente, desinfetar superfícies (hipoclorito diluído), lavar camas, banhar animal no último dia do tratamento — essencial para evitar reinfecção. (3)(4)(14)',
    'Gato com diarreia crônica jovem: diferenciar Giardia de *Tritrichomonas foetus* (PCR fecal, não flutuação ZnSO₄) — condutas distintas. (3)(9)(12)',
    'Zoonose: risco humano existe, mas baixo na prática doméstica com higiene — orientar lavar mãos, evitar contato fecal, grupos imunossuprimidos. (3)(14)',
    'Não tratar automaticamente contactantes assintomáticos — avaliar risco (criatório, abrigo, filhotes); tratar sintomáticos e reforçar ambiente. (3)(4)',
    'Falha terapêutica: confirmar adesão, repetir coproscopia/ELISA após ≥7–14 dias, revisar ambiente e considerar segunda linha — antes de rotular resistência. (3)(11)',
  ],
  quickSummaryRich: {
    lead:
      'Giardíase combina parasitologia, fisiopatologia intestinal e manejo ambiental: o protozoário adere ao epitélio duodenojejunal, altera absorção e microbiota, mas o teste positivo isolado não fecha o diagnóstico etiológico. Três amostras fecais, técnica adequada (ZnSO₄ ou imunoensaio/PCR) e fenbendazol 50 mg/kg por 5 dias formam o núcleo prático — metronidazol é reserva. Sem higiene rigorosa, reinfecção mimetiza falha terapêutica. (3)(4)(5)(6)',
    leadHighlights: ['positivo ≠ causa', '3 amostras', 'fenbendazol 50 mg/kg', 'higiene ambiental'],
    pillars: [
      {
        title: 'Positivo não é sinônimo de culpado',
        body:
          'eliminação subclínica assintomático é comum; diarreia pode ter múltiplas causas (IBD, IPE, dietas, helmintos, *Tritrichomonas* em gatos). Positividade laboratorial exige correlação clínica antes de tratar, especialmente em assintomáticos de baixo risco. (3)(4)(6)',
        highlights: ['eliminação subclínica', 'comorbidades', 'correlação clínica'],
      },
      {
        title: 'Diagnóstico = amostragem + método',
        body:
          'Excreção de cistos é intermitente — mínimo três amostras em dias alternados. ZnSO₄ 33% (Sheather) para visualização de cistos; ELISA/PCR aumentam sensibilidade em populações de risco ou diarreia persistente. Nenhum teste isolado prova cura. (3)(10)(12)',
        highlights: ['intermitente', 'ZnSO₄', 'ELISA', 'PCR'],
      },
      {
        title: 'Fenbendazol como primeira linha',
        body:
          '50 mg/kg VO q24h por 5 dias em cães e gatos — perfil de segurança favorável, eficácia documentada (Ciuca et al., 2021; ESCCAP GL6). Metronidazol é alternativa quando fenbendazol indisponível; albendazol não é recomendado. (3)(4)(8)(11)',
        highlights: ['50 mg/kg', '5 dias', 'metronidazol alternativa'],
      },
      {
        title: 'Ambiente manda na reinfecção',
        body:
          'Cistos são resistentes no ambiente úmido/fresco por semanas. Remover fezes, desinfetar, banhar no último dia do tratamento e manejar contactantes conforme risco — sem isso, recidiva é esperada mesmo com fármaco correto. (3)(4)(14)',
        highlights: ['cistos resistentes', 'desinfecção', 'banho'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem clínica e diferencial',
          timing: 'Primeira consulta',
          detail:
            'Idade, dieta, vacinação, ambiente (criatório/abrigo), sinais sistêmicos, desidratação, dor abdominal. Em gatos jovens com diarreia crônica, incluir *Tritrichomonas foetus* no diferencial. (3)(6)(9)(12)',
        },
        {
          label: 'Três amostras fecais seriadas',
          timing: 'Dias alternados (5–7 dias)',
          detail:
            'Coletar amostra fresca (≤30 min), refrigerar se atraso, evitar solo/areia contaminada. Excreção cística intermitente — amostra única tem sensibilidade limitada. (3)(4)(10)',
          reassess: 'Três negativos com alta suspeita → ELISA/PCR ou repetir série.',
        },
        {
          label: 'Flutuação ZnSO₄ (Sheather)',
          timing: 'Laboratório qualificado',
          detail:
            'Sulfato de zinco 33% + água destilada; cobrir lamínula com xilol ou lugol diluído. Método de referência para visualização de cistos — técnica e microscopista importam. (3)(10)',
          limitations: 'Sensibilidade depende de carga parasitária e número de amostras.',
        },
        {
          label: 'ELISA coproantígeno / imunofluorescência',
          timing: 'Diarreia persistente ou triagem em grupo',
          detail:
            'Maior sensibilidade que exame direto isolado; detecta antígeno, não viabilidade. Positivo não prova causalidade nem indica cura automática pós-tratamento. (3)(4)(10)',
        },
        {
          label: 'PCR fecal (qPCR)',
          timing: 'Casos refratários, surtos, pesquisa de assemblage',
          detail:
            'Alta sensibilidade; pode detectar DNA residual — interpretar com clínica. Útil para diferenciar comorbidades e monitorar surtos em abrigos. (10)(12)',
          limitations: 'Resultado depende de população estudada; não substitui reavaliação clínica.',
        },
        {
          label: 'Excluir comorbidades',
          timing: 'Paralelo ou após primeira linha',
          detail:
            'Coproparasitológico ampliado (helmintos, *Cystoisospora*), TLI/cobalamina se esteatorreia, trial dietético, considerar *Tritrichomonas* (PCR) em gatos. (3)(6)(9)',
        },
        {
          label: 'Reavaliação pós-tratamento',
          timing: '≥7–14 dias após fim do esquema',
          detail:
            'Nova série fecal ou ELISA se diarreia persiste. Melhora clínica precede negativação laboratorial — não tratar teste isolado em paciente assintomático recuperado. (3)(4)(11)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Fenbendazol — primeira linha',
          detail:
            '50 mg/kg VO q24h por 5 dias consecutivos em cães e gatos. Administrar com alimento se vômito. Esquema respaldado por ESCCAP GL6, CAPC e estudos clínicos. (3)(4)(8)(11)',
          dose: 'Fenbendazol 50 mg/kg VO q24h × 5 dias (cão e gato).',
          duration: '5 dias consecutivos.',
          reassess: 'Reavaliar clínica e fezes em 7–14 dias; repetir esquema apenas se persistência com confirmação.',
        },
        {
          label: 'Metronidazol — alternativa',
          detail:
            '25 mg/kg q12h VO por 5–7 dias quando fenbendazol indisponível ou contraindicado. Eficácia variável; evitar como rotina em filhotes/gravidez sem justificativa. Não combinar indiscriminadamente sem evidência de benefício. (3)(7)(11)',
          dose: 'Metronidazol 25 mg/kg q12h VO × 5–7 dias.',
          reassess: 'Neurotoxicidade (ataxia, nistagmo) — suspender e reavaliar dose.',
        },
        {
          label: 'Higiene ambiental simultânea',
          detail:
            'Remover fezes ≤24 h, desinfetar superfícies (hipoclorito 1:32), lavar camas/ brinquedos, banhar animal no último dia do tratamento. Manejar contactantes conforme risco (sintomáticos, filhotes, abrigos). (3)(4)(14)',
          duration: 'Durante e ≥1 semana após tratamento.',
        },
        {
          label: 'Falha / recidiva — algoritmo',
          detail:
            '1) Confirmar adesão e dose; 2) Revisar ambiente e contactantes; 3) Repetir coproscopia/ELISA; 4) Investigar IBD, IPE, *Tritrichomonas*, dietas; 5) Segundo curso fenbendazol ou combinação conforme especialista — evitar albendazol. (3)(6)(11)(12)',
          reassess: 'Duas falhas documentadas → enteropatia crônica, não “Giardia resistente” automática.',
        },
        {
          label: 'Assintomático — tratar ou não?',
          detail:
            'Filhotes, animais imunossuprimidos, surtos em abrigos/criatórios: tratar. Adulto saudável isolado positivo em triagem: individualizar — foco em higiene e monitorização; tratamento massivo sem sinais nem risco epidemiológico não é consenso universal. (3)(4)(9)',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable' as const,
      title: 'Decisão clínica rápida — giardíase',
      headers: ['Situação', 'Conduta', 'Armadilha'],
      rows: [
        ['Diarreia aguda + Giardia + filhote', 'Fenbendazol 5 d + higiene + reavaliar', 'Tratar só vermífugo de bula 3 d sem ambiente'],
        ['Assintomático positivo em adulto saudável', 'Individualizar; higiene; repetir amostras se dúvida', 'Tratar automaticamente todo positivo'],
        ['Diarreia crônica felina jovem', 'Fenbendazol + PCR *Tritrichomonas*', 'Confundir com Giardia isolada'],
        ['Esteatorreia + perda ponderal', 'Tratar Giardia + investigar IPE/IBD', 'Rotular “só parasita”'],
        ['Falha após fenbendazol', 'Ambiente + adesão + comorbidades antes de 2ª linha', 'Albendazol ou tinidazol empírico'],
        ['Surto em abrigo', 'Tratar sintomáticos + desinfecção + amostragem seriada', 'Tratar todos indiscriminadamente sem plano ambiental'],
        ['Positivo ELISA pós-tratamento, assintomático', 'Observar; repetir em 2–4 sem se dúvida', 'Ciclos repetidos de metronidazol'],
        ['Gestante/lactante', 'Fenbendazol preferível; evitar metronidazol 1º trimestre', 'Albendazol'],
      ],
    },
  },

  etiology: {
    pontosChave: [
      'Agente: *Giardia duodenalis* (sin. *G. intestinalis*, *G. lamblia*) — flagelado binucleado com formas trofozoítas móveis e cistos ambientalmente resistentes. (3)(6)',
      'Assemblages A–H definem hospedeiros preferenciais — cães: predominantemente C/D; gatos: F; zoonóticos A/B em casos selecionados. (3)(12)(14)',
      'Transmissão fecal-oral por ingestão de poucos cistos (≥10 podem infectar) — água, solo, fômites, auto-limpeza, contactantes. (3)(4)(14)',
      'Excreção cística intermitente — amostra única falsamente negativa é regra, não exceção. (3)(10)',
      'Positivo laboratorial ≠ diarreia causada exclusivamente por Giardia — comorbidades gastrointestinais são frequentes. (3)(4)(6)',
      'eliminação subclínica assintomático sustenta reservatório ambiental em abrigos, criatórios e parques caninos. (3)(4)(15)',
      'Cistos sobrevivem semanas a meses em ambiente úmido/fresco; sensíveis a dessecação e desinfecção adequada. (3)(14)',
      'Trofozoítas aderem ao epitélio duodenojejunal via disco adesivo ventral — não invadem profundamente, mas alteram função de barreira. (13)',
      'Hospedeiro imunocompetente frequentemente controla carga; filhotes, imunossuprimidos e stressores ambientais descompensam. (3)(6)(16)',
      'Metronidazol e fenbendazol têm eficácia documentada, mas resistência/compliance ambiental explicam falhas — não presuma resistência precocemente. (11)(3)',
      'Vacinas comerciais existem em alguns mercados, mas não substituem higiene nem são consenso universal de rotina. (17)',
      'Zoonose documentada (assemblages A/B), porém risco doméstico baixo com higiene — orientação ao tutor é parte do plano. (3)(14)',
    ],
    taxonomiaAssemblages: {
      kind: 'clinicalTable' as const,
      title: 'Assemblages de *Giardia duodenalis* (A–H)',
      headers: ['Assemblage', 'Hospedeiros principais', 'Relevância clínica / zoonótica'],
      rows: [
        ['A', 'Humanos, cães, gatos, outros', 'Potencial zoonótico — “genótipo antropofílico” em surtos humanos; cães/gatos podem participar em focos. (12)(14)'],
        ['B', 'Humanos, cães, gatos, outros', 'Zoonótico — associado a diarreia humana; vigilância em ambientes mistos. (12)(14)'],
        ['C', 'Cães (domésticos e silvestres)', 'Assemblage canino clássico — diarreia em cães, raramente zoonose. (3)(12)'],
        ['D', 'Cães', 'Predominante em cães — eliminação subclínica e diarreia; diferenciação C/D por PCR em pesquisa. (3)(12)'],
        ['E', 'Artiodáctilos (suínos, bovinos, cervídeos)', 'Não relevante em clínica de cães/gatos de companhia — evitar confusão em ambientes rurais. (12)'],
        ['F', 'Gatos', 'Assemblage felino clássico — diarreia felina; específico do hospedeiro na prática clínica. (3)(9)(12)'],
        ['G', 'Roedores', 'Reservatório silvestre — risco em cães de caça/barn cats; raro em clínica urbana. (12)'],
        ['H', 'Focas, mustelídeos', 'Silvestre — sem relevância rotineira em clínica de companhia. (12)'],
      ],
    },
    agente:
      '*Giardia duodenalis* é protozoário flagelado com dois núcleos, oito flagelos e disco adesivo ventral. Ciclo direto com duas formas: trofozoíta (replicação intestinal, motil) e cisto (forma infectante excretada, resistente ao ambiente). Nomenclatura taxonômica consolidada como *G. duodenalis* com assemblages genéticas A–H definindo ecologia de hospedeiro. (3)(6)(12)',
    cicloBiologico:
      'Ingestão de cistos maduros → excistamento no duodeno/jejuno → 2 trofozoítas por cisto → adesão ao epitélio via disco adesivo → multiplicação por divisão binária assexuada → trofozoítas descamam ou formam cistos pré-císticos → cistos excretados nas fezes. Ciclo completo ~5–14 dias. Trofozoítas não sobrevivem longamente fora do hospedeiro; cistos persistem em ambiente úmido/fresco por semanas a meses. (3)(4)(14)',
    alertaPositivoNaoCausa:
      '⚠️ ALERTA CLÍNICO: teste positivo para Giardia não fecha etiologia isolada. Diarreia crônica exige investigação paralela de IBD, IPE, dietas, helmintos, *Tritrichomonas foetus* (gatos), enteropatias infecciosas e disbiose. Tratar Giardia sem reavaliar comorbidades perpetua recidivas “parasitárias”. (3)(4)(6)(9)',
  },

  epidemiology: {
    caes:
      'Prevalência extremamente variável: 0–45% em coproparasitológicos de cães de companhia conforme região, idade e setting (domicílio vs abrigo). Filhotes, cães de abrigo/criatório, canis com alta densidade e animais com enteropatia crônica concentram maior carga. Assemblages C e D predominam em cães domésticos; A e B aparecem em subset com implicação zoonótica potencial. (3)(4)(15)',
    gatos:
      'Prevalência também heterogênea (≈4–20% em clínica geral; até >30% em abrigos/gatos jovens). Assemblage F é específico do hospedeiro felina na maioria dos casos. Diarreia crônica em gatos jovens exige diferencial com *Tritrichomonas foetus* — coinfecção ou diagnóstico errôneo ocorre quando só se busca Giardia. (3)(9)(12)(15)',
    ambiente:
      'Cistos concentram-se em fezes, solo contaminado, água estagnada, superfícies úmidas e pelagem durante auto-limpeza. Abrigos, creches, parques caninos e domicílios com vários gatos são focos de transmissão cíclica. Desinfecção (hipoclorito diluído, amônia quaternária conforme superfície), remoção diária de fezes e banho terminal reduzem reinfecção — componente tão crítico quanto antiparasitário. (3)(4)(14)',
    atualizacaoBrasil2026:
      'Fonseca et al. (2026) revisaram dados brasileiros de *Giardia* spp. em cães e gatos: prevalência reportada varia de ~7% a >50% conforme região, método diagnóstico (microscopia vs ELISA/PCR) e população (domicílio vs rua/abrigo). Não existe estimativa nacional única confiável — comparações entre estudos exigem cautela metodológica. Mensagem prática: tratar prevalência como dado local/contextual, não como número fixo nacional; reforçar triagem coproparasitológica em filhotes, surtos e diarreia crônica. (15)',
  },

  pathogenesisTransmission: {
    transmissao:
      'Via fecal-oral exclusiva: ingestão de cistos viáveis presentes em fezes, água contaminada, ambiente, pelagem (auto-limpeza ou auto-limpeza social) e fômites. Não requer hospedeiro intermediário. Poucos cistos (~10) podem estabelecer infecção em hospedeiro suscetível. (3)(4)(14)',
    cascata: [
      'Ingestão de cistos → excistamento no lúmen proximal delgado → trofozoítas aderem ao epitélio via disco adesivo ventral. (3)(13)',
      'Adesão apical a enterócitos duodenojejunais → alteração de microvilosidades e junções intercelulares apicais → aumento de permeabilidade paracellular. (13)',
      'Maldigestão/malabsorção de carboidratos e gorduras → diarreia osmótica/secretória e esteatorreia em casos mais graves. (3)(6)(13)',
      'Resposta imune local (IgA, linfócitos intraepiteliais) controla carga em imunocompetentes; falha → excreção cística persistente. (16)(17)',
      'Excreção de cistos nas fezes → contaminação ambiental → reinfecção do mesmo hospedeiro ou contactantes (ciclo fechado sem higiene). (3)(4)(14)',
    ],
  },

  pathophysiology: {
    adesaoMucosa:
      'Trofozoítas aderem à superfície apical de enterócitos duodenojejunais mediante disco adesivo ventral — não invadem tecido submucoso, mas permanecem em contato íntimo com epitélio, desencadeando resposta inflamatória leve a moderada. (13)',
    microvilosidades:
      'Alteração morfológica e funcional das microvilosidades (atenuação, disorganização) reduz superfície absortiva — contribui para diarreia e má absorção de nutrientes. (13)',
    maldigestao:
      'Deficiência relativa de dissacaridases borda em escova (ex.: lactase) por dano epitelial → intolerância a lactose/carboidratos complexos em subset de pacientes — pode persistir brevemente após eliminação parasitária. (3)(6)(13)',
    malabsorcao:
      'Perda de absorção de gorduras, vitaminas lipossolúveis e vitamina B12 em casos prolongados — esteatorreia e perda ponderal sugerem carga alta ou comorbidade (IPE, IBD). (3)(6)',
    tightJunctions:
      'Disrupção de junctional complexes (occludina, claudinas, ZO-1) aumenta permeabilidade paracellular — modelo “aumento de permeabilidade intestinal” documentado experimentalmente; relevância clínica individual varia. (13)',
    microbiota:
      'Giardia altera composição da microbiota intestinal (disbiose relativa) — interação bidirecional: disbiose pré-existente pode facilitar colonização e gravidade de sinais. (3)(13)',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Diarreia aguda ou crônica (aquosa, mucoide, ocasionalmente esteatorreica)',
          mechanism:
            'Malabsorção, maldigestão, aumento de permeabilidade paracellular e resposta inflamatória leve no duodeno/jejuno.',
          clinicalMeaning:
            'Gravidade não correlaciona linearmente com contagem de cistos — investigar comorbidades se persistente.',
          priority: 'common',
        },
        {
          finding: 'Fezes mal cheirosas, gordurosas ou volumosas',
          mechanism: 'Esteatorreia por disfunção absortiva proximal e acelerada trânsito.',
          clinicalMeaning: 'Sugerir IPE/IBD concomitante se não responder a antigiardíase + higiene.',
          priority: 'common',
        },
        {
          finding: 'Perda ponderal, apetite preservado ou polifagia',
          mechanism: 'Perda líquida fecal + má absorção calórica apesar de ingestão mantida.',
          clinicalMeaning: 'Filhotes descompensam rapidamente — priorizar hidratação e nutrição.',
          priority: 'common',
        },
        {
          finding: 'Vômito (menos frequente que diarreia)',
          mechanism: 'Inflamação proximal, gastrite associada ou comorbidade — não patognomônico.',
          clinicalMeaning: 'Não atribuir exclusivamente a Giardia sem avaliar dietas e outras enteropatias.',
          priority: 'uncommon',
        },
        {
          finding: 'Flatulência, borborigmos, desconforto abdominal',
          mechanism: 'Fermentação de carboidratos mal absorvidos e disbiose relativa.',
          clinicalMeaning: 'Melhora com tratamento antigiardíase + dieta digestível; persistência → IBD.',
          priority: 'common',
        },
        {
          finding: 'Assintomático (eliminação subclínica)',
          mechanism: 'Controle imune parcial ou carga subclínica — excreção cística intermitente.',
          clinicalMeaning: 'Positivo em triagem não obriga tratamento em todo adulto saudável — avaliar risco.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Desidratação leve a moderada em filhotes',
          mechanism: 'Perdas entéricas líquidas desproporcionais à reserva hídrica.',
          clinicalMeaning: 'Fluidoterapia conforme grau; não atrasar por aguardar resultado parasitológico.',
          priority: 'emergency',
        },
        {
          finding: 'Pelagem opaca, unhas quebradiças (casos prolongados)',
          mechanism: 'Deficiências nutricionais secundárias a má absorção crônica.',
          clinicalMeaning: 'Investigar IPE, cobalamina e enteropatia crônica além de Giardia.',
          priority: 'systemic',
        },
        {
          finding: 'Sinais sistêmicos graves (febre, hematoquezia profusa)',
          mechanism: 'Improvável como efeito isolado de Giardia — sugere coinfecção ou diagnóstico alternativo.',
          clinicalMeaning: 'Expandir investigação: parvovírus, salmonela, IBD severa, obstrução.',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'História clínica dirigida',
        purpose: 'Estratificar risco e diferenciais.',
        description:
          'Idade, dieta, ambiente (abrigo, parque, multi-pet), duração da diarreia, sinais sistêmicos, tratamentos prévios, contactantes sintomáticos. Em gatos jovens: incluir *Tritrichomonas*. (3)(6)(9)',
        interpretation: 'Diarreia crônica >3 semanas exige plano ampliado além de parasitológico.',
        limitations: 'História incompleta superestima “Giardia como única causa”.',
      },
      {
        stepNumber: 2,
        title: 'Exame físico e hidratação',
        purpose: 'Determinar urgência de suporte.',
        description:
          'TPC, turgor cutâneo, peso, condição corporal, dor abdominal, temperatura. Filhotes desidratam rapidamente. (6)',
        interpretation: 'Desidratação moderada-grave → fluidoterapia antes de investigação prolongada.',
        limitations: 'Exame normal não exclui enteropatia significativa.',
      },
      {
        stepNumber: 3,
        title: 'Três amostras fecais seriadas',
        purpose: 'Maximizar sensibilidade coproparasitológica.',
        description:
          'Coletar amostra fresca em dias alternados (mínimo 3 em 5–7 dias); refrigerar se atraso ≤24 h. Excreção cística intermitente. (3)(4)(10)',
        interpretation: 'Um positivo confirma exposição/infecção; três negativos reduzem mas não zeram suspeita.',
        limitations: 'Amostra única: sensibilidade subótima documentada.',
      },
      {
        stepNumber: 4,
        title: 'Flutuação ZnSO₄ (Sheather)',
        purpose: 'Visualizar cistos — método de referência clássico.',
        description:
          'ZnSO₄ 33% + água destilada; centrifugação; lamínula com lugol/xilol. Técnica laboratorial padronizada. (3)(10)',
        interpretation: 'Cistos ovalados 8–12 × 7–10 µm, 4 núcleos — identificação morfológica.',
        limitations: 'Depende de microscopista, carga parasitária e número de amostras.',
        isGoldStandard: true,
      },
      {
        stepNumber: 5,
        title: 'ELISA coproantígeno / imunofluorescência direta',
        purpose: 'Aumentar sensibilidade em diarreia persistente ou triagem em grupo.',
        description:
          'Detecta antígeno de Giardia — útil quando microscopia repetidamente negativa com alta suspeita. (3)(4)(10)',
        interpretation: 'Positivo confirma presença de antígeno; não diferencia trofozoíta viável vs DNA residual sozinho.',
        limitations: 'Positivo pós-tratamento pode persistir — correlacionar com clínica.',
      },
      {
        stepNumber: 6,
        title: 'PCR fecal (qPCR)',
        purpose: 'Alta sensibilidade; surtos; tipagem de assemblage.',
        description:
          'Detecta DNA de Giardia — performance depende de população (ver Barrera 2024 em cães de rua). (10)(12)',
        interpretation: 'Útil em abrigos e falhas terapêuticas; interpretar com cautela pós-tratamento.',
        limitations: 'Não disponível universalmente; cutoff e população influenciam VPP/VPN.',
      },
      {
        stepNumber: 7,
        title: 'Excluir comorbidades e diferenciais',
        purpose: 'Evitar rotular causa única.',
        description:
          'Helmintos, *Cystoisospora*, TLI/folato/cobalamina, trial dietético, PCR *Tritrichomonas* (gatos), PLI se indicado. (3)(6)(9)(12)',
        interpretation: 'Múltiplos positivos são comuns — tratar conforme prioridade clínica.',
        limitations: 'Painel completo nem sempre necessário na diarreia aguda autolimitada.',
      },
      {
        stepNumber: 8,
        title: 'Reavaliação pós-tratamento',
        purpose: 'Confirmar resolução clínica e parasitológica quando indicado.',
        description:
          'Nova amostragem ≥7–14 dias após fim do esquema se diarreia persiste ou contexto de surto. (3)(4)(11)',
        interpretation: 'Melhora clínica é endpoint primário; negativação laboratorial pode ser tardia.',
        limitations: 'PCR/ELISA positivos residuais não exigem retratamento automático se assintomático.',
      },
    ],
    tabelaDiagnosticosCompleta: {
      kind: 'clinicalTable' as const,
      title: 'Métodos diagnósticos — comparativo prático',
      headers: ['Método', 'Detecta', 'Sensibilidade*', 'Especificidade*', 'Vantagens', 'Limitações'],
      rows: [
        [
          'Exame direto (salina/Lugol)',
          'Cistos/trofozoítas',
          'Baixa–moderada',
          'Alta',
          'Rápido, baixo custo',
          'Amostra única; trofozoítas instáveis',
        ],
        [
          'Flutuação ZnSO₄ (Sheather)',
          'Cistos',
          'Moderada (↑ com 3 amostras)',
          'Alta',
          'Padrão coproparasitológico clássico',
          'Técnica-dependent; intermitência',
        ],
        [
          'IFAT (imunofluorescência)',
          'Cistos',
          'Moderada–alta',
          'Alta',
          'Visualização clara de cistos',
          'Custo; disponibilidade',
        ],
        [
          'ELISA coproantígeno',
          'Antígeno',
          'Alta',
          'Moderada–alta',
          'Triagem; diarreia crônica',
          'Positivo pós-tratamento; não prova viabilidade',
        ],
        [
          'PCR / qPCR',
          'DNA',
          'Muito alta',
          'Alta',
          'Surtos; assemblage; baixa carga',
          'DNA residual; população-específico (10)',
        ],
        [
          'Cultura (raro)',
          'Viabilidade',
          'Baixa',
          'Alta',
          'Pesquisa',
          'Não clínica de rotina',
        ],
      ],
    },
    tabelaDesempenhoBarrera2024: {
      kind: 'clinicalTable' as const,
      title: 'Desempenho diagnóstico — Barrera et al., 2024 (cães de rua, Brasil)',
      headers: ['Teste', 'Sensibilidade', 'Especificidade', 'Notas'],
      rows: [
        [
          'Microscopia (MIF)',
          'Referência combinada',
          '—',
          'População específica: cães de rua; não extrapolar automaticamente a clínica de companhia. (10)',
        ],
        [
          'Teste rápido imunocromatográfico',
          'Variável vs MIF',
          'Variável vs MIF',
          'Conveniente em campo; performance inferior a qPCR na série. (10)',
        ],
        [
          'qPCR fecal',
          'Superior a MIF e rápido',
          'Alta',
          'Melhor detecção em baixa carga; interpretar pós-tratamento com cautela. (10)',
        ],
      ],
    },
    tabelaComparacaoGiardiaTritrichomonas: {
      kind: 'clinicalTable' as const,
      title: 'Giardia vs *Tritrichomonas foetus* — gatos',
      headers: ['Característica', 'Giardia', 'Tritrichomonas foetus'],
      rows: [
        ['Agente', 'Protozoário flagelado *G. duodenalis*', 'Flagelado *T. foetus*'],
        ['Faixa etária típica', 'Todas; filhotes/abrigos', 'Gatos jovens (<2 anos)'],
        ['Fezes', 'Aquosas, mucoides, esteatorreia possível', 'Semicoliformes, mal cheirosas, sangue/muco'],
        ['Diagnóstico', 'ZnSO₄, ELISA, PCR Giardia', 'PCR fecal específico — NÃO flutuação ZnSO₄'],
        ['Tratamento', 'Fenbendazol 50 mg/kg ×5 d', 'Ronidazol (fora da bula); NÃO fenbendazol como cura'],
        ['Resposta', 'Boa com higiene + fenbendazol', 'Frequentemente crônica; manejo prolongado'],
        ['Zoonose', 'Baixo risco doméstico (A/B raros)', 'Não zoonótico'],
      ],
    },
    sensibilidadeEspecificidadeDidatica:
      'Sensibilidade (Se): proporção de verdadeiros positivos — teste “pega” quem tem Giardia. Especificidade (Sp): proporção de verdadeiros negativos — teste exclui quem não tem. VPP: probabilidade de doença real dado teste positivo (depende da prevalência local). VPN: probabilidade de ausência dado teste negativo. Em baixa prevalência (adulto saudável), VPP cai — positivo isolado exige confirmação clínica. Três amostras aumentam Se global do protocolo, não de um teste isolado. ELISA/PCR elevam Se em diarreia crônica, mas pós-tratamento podem permanecer positivos sem infecção ativa — não interpretar como falha automática. (3)(10)',
    giardiaVsTritrichomonasGatos:
      'Em gatos com diarreia crônica, especialmente jovens de domicílios com vários gatos ou criatórios, solicitar PCR para *Tritrichomonas foetus* paralelamente à investigação de Giardia. Flutuação ZnSO₄ não detecta tricomoníade; fenbendazol não trata *Tritrichomonas*. Confundir os dois perpetua diarreia “refratária a Giardia”. (3)(9)(12)',
    algoritmoDiagnostico:
      '1) Diarreia aguda filhote/abrigo: 3 fezes + ZnSO₄; tratar se positivo + sintomático; higiene simultânea. 2) Diarreia persistente: ELISA/PCR + painel comorbidades (TLI, cobalamina, helmintos, *Tritrichomonas* em gatos). 3) Assintomático positivo: avaliar risco epidemiológico — tratar filhotes/imunossuprimidos/surtos; adulto saudável → higiene + observação. 4) Pós-tratamento: clínica manda; repetir teste só se sinais persistem. (3)(4)(6)(9)',
    apresentacaoClinicaTabela: {
      kind: 'clinicalTable' as const,
      title: 'Apresentação clínica — categorias (não estadiamento)',
      headers: ['Categoria', 'Perfil', 'Conduta orientadora'],
      rows: [
        [
          'eliminação subclínica assintomático',
          'Positivo em triagem; BCS normal; fezes formadas',
          'Individualizar tratamento; higiene; monitorar contactantes de risco. (3)(4)',
        ],
        [
          'Diarreia aguda autolimitada',
          'Filhote/adulto; diarreia <7–14 d; sem desidratação grave',
          'Fenbendazol 5 d + higiene; suporte sintomático; reavaliar se persiste. (3)(4)',
        ],
        [
          'Diarreia persistente / subcategoria crônica',
          '≥3 semanas ou recidiva; possível esteatorreia',
          'Antigiardíase + investigar IBD, IPE, *Tritrichomonas*, dietas. (3)(6)(9)',
        ],
        [
          'Surto / setting de grupo',
          'Abrigo, criatório, canil; múltiplos positivos',
          'Tratar sintomáticos; desinfecção ambiental; amostragem seriada; não tratamento em massa indiscriminado. (3)(4)(15)',
        ],
      ],
    },
  },

  treatment: {
    fenbendazolCaesGatos:
      'Fenbendazol 50 mg/kg VO q24h por 5 dias consecutivos — primeira linha em cães e gatos (ESCCAP GL6; CAPC 2025). Administrar com alimento se intolerância gástrica. Esquema respaldado por estudos clínicos (Ciuca et al., 2021) e formulários veterinários (BSAVA Formulary; Plumb\'s). Repetir ciclo apenas com confirmação de persistência clínica/laboratorial — não “vermífugo de rotina” trimestral sem indicação. (3)(4)(8)(11)',
    metronidazolAlerta:
      '⚠️ Metronidazol 25 mg/kg q12h VO por 5–7 dias: alternativa quando fenbendazol indisponível/contraindicado — NÃO primeira linha. Eficácia variável; resistência descrita; neurotoxicidade em doses altas ou prolongadas (ataxia, nistagmo). Evitar rotina em gestantes (1º trimestre) e filhotes muito jovens sem justificativa. Não associar empiricamente a fenbendazol como “protocolo duplo” universal — evidência limitada para benefício incremental. (3)(7)(11)',
    naoRecomendar: [
      'Albendazol — não recomendado para giardíase em cães/gatos; risco de mielotoxicidade e esquema não consensual. (3)(4)(7)',
      'Tinidazol / secnidazol — sem rotina aprovada em veterinária de companhia; extrapolação humana inadequada. (3)(7)',
      'Vermífugos de bula “3 dias para Giardia” sem dose mg/kg documentada — frequentemente subdosados ou sem manejo ambiental. (3)(4)',
      'Tratamento repetido de contactantes assintomáticos adultos saudáveis em domicílio — foco em higiene. (3)(4)',
      'ELISA positivo pós-tratamento em paciente assintomático recuperado — não indicar ciclos adicionais automaticamente. (3)(10)',
    ],
    tratarAssintomatico: {
      kind: 'clinicalTable' as const,
      title: 'Tratar assintomático positivo?',
      headers: ['Contexto', 'Recomendação', 'Racional'],
      rows: [
        ['Filhote (<6 meses)', 'Tratar + higiene', 'Maior carga, imaturidade imune, risco ambiental. (3)(4)'],
        ['Imunossuprimido / comorbidade grave', 'Tratar + higiene', 'Risco de descompensação e excreção prolongada. (3)(16)'],
        ['Abrigo / surto / criatório', 'Tratar sintomáticos; considerar contactantes jovens', 'Controle de foco ambiental. (3)(4)(15)'],
        ['Adulto saudável domicílio isolado', 'Individualizar; higiene prioritária', 'eliminação subclínica comum; benefício terapêutico incerto. (3)(4)'],
        ['Gestante', 'Fenbendazol preferível; evitar metronidazol precoce', 'Segurança relativa documentada para benzimidazóis. (3)(8)'],
      ],
    },
    monitoramentoPosTratamento: [
      'Reavaliação clínica em 7–14 dias — endpoint primário: fezes formadas, peso estável, apetite normal.',
      'Repetir coproscopia/ELISA apenas se diarreia persiste ou contexto de surto/controle de abrigo.',
      'Orientar tutor sobre sinais de recidiva (diarreia aquosa, flatulência) e manutenção de higiene ≥1 semana pós-fármaco.',
      'Documentar adesão e dose — subdosagem por apresentação comercial incorreta é causa frequente de “falha”. (3)(11)',
      'Se persistência: investigar IBD, IPE, *Tritrichomonas*, disbiose — antes de rotular resistência. (3)(6)(9)',
    ],
    falhaReinfecaoAlgoritmo: [
      '1. Confirmar dose mg/kg real (não “comprimido inteiro” sem cálculo).',
      '2. Confirmar 5 dias consecutivos completos + higiene ambiental (fezes, desinfecção, banho terminal).',
      '3. Revisar contactantes — tratar sintomáticos; banho coletivo em abrigos se protocolo local.',
      '4. Repetir amostragem fecal seriada ou ELISA/PCR conforme disponibilidade.',
      '5. Investigar comorbidades: helmintos, IPE (TLI), IBD, dietas, *Tritrichomonas* (gatos).',
      '6. Segundo curso fenbendazol 50 mg/kg ×5 d OU combinação fenbendazol + metronidazol conforme especialista — evidência limitada para combo universal. (11)',
      '7. Evitar albendazol/tinidazol; encaminhar enteropatia crônica se segunda falha documentada com ambiente controlado.',
    ],
    farmacos: {
      kind: 'clinicalTable' as const,
      title: 'Fármacos antigiardíase — doses e contexto',
      headers: [
        'Fármaco',
        'Espécie',
        'Dose',
        'Via',
        'Duração',
        'Contexto',
        'Contraindicações / cautelas',
        'Monitorização',
        'Fonte',
      ],
      rows: [
        [
          'Fenbendazol',
          'Cão',
          '50 mg/kg q24h',
          'VO',
          '5 dias',
          'Primeira linha — diarreia/carga documentada',
          'Evitar em hepatopatia grave (cautela relativa)',
          'Clínica; fezes; peso',
          '(3)(4)(8)(11)',
        ],
        [
          'Fenbendazol',
          'Gato',
          '50 mg/kg q24h',
          'VO',
          '5 dias',
          'Primeira linha — ABCD/CAPC',
          'Administrar com alimento se vômito',
          'Clínica; fezes',
          '(3)(4)(9)(11)',
        ],
        [
          'Metronidazol',
          'Cão',
          '25 mg/kg q12h',
          'VO',
          '5–7 dias',
          'Alternativa — fenbendazol indisponível',
          'Neurotoxicidade; hepatopatia; gestação precoce',
          'Ataxia, anorexia',
          '(3)(7)(11)',
        ],
        [
          'Metronidazol',
          'Gato',
          '25 mg/kg q12h',
          'VO',
          '5–7 dias',
          'Alternativa — usar com parcimônia',
          'Idem cão; gatos sensíveis a doses altas',
          'Neurológico',
          '(3)(7)(9)',
        ],
        [
          'Fenbendazol + metronidazol',
          'Cão/gato',
          'Doses acima simultâneas',
          'VO',
          '5 dias',
          'Falha documentada — especialista',
          'Evidência limitada; não rotina',
          'Clínica + adverse effects',
          '(11)(3)',
        ],
        [
          'Albendazol',
          '—',
          'NÃO recomendado',
          '—',
          '—',
          'Evitar — mielotoxicidade',
          'Contraindicado rotina giardíase',
          '—',
          '(3)(4)(7)',
        ],
        [
          'Ronidazol',
          'Gato',
          '30 mg/kg q24h',
          'VO',
          '14 dias',
          '*Tritrichomonas*, NÃO Giardia',
          'fora da bula; hepatotoxicidade possível',
          'ALT; apetite',
          '(9)(12)',
        ],
      ],
    },
    figuraCiuca2021: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/ciuca-2021-efficacy-table.jpg`,
      alt: 'Tabela de eficácia de antigiardíase em cães — estudo Ciuca et al., 2021 comparando fenbendazol e metronidazol.',
      caption:
        'Eficácia comparativa fenbendazol vs metronidazol em cães — Ciuca et al., Front Vet Sci 2021 (CC BY 4.0). DOI: 10.3389/fvets.2021.626424. (11)',
      display: 'wide',
    },
    errosComuns: [
      'Tratar todo positivo como causa única da diarreia — ignorar IBD, IPE, *Tritrichomonas*, dietas. (3)(6)(9)',
      'Uma amostra fecal negativa “exclui” Giardia — excreção intermitente exige série. (3)(10)',
      'Metronidazol como primeira linha por hábito — fenbendazol tem perfil preferencial. (3)(4)(11)',
      'Albendazol ou vermífugo genérico 3 dias — esquema inadequado e risco desnecessário. (3)(4)(7)',
      'Ignorar higiene ambiental — reinfecção mimetiza resistência. (3)(4)(14)',
      'Repetir ELISA/PCR em assintomático recuperado e prescrever ciclos extras — falso positivo pós-tratamento. (10)',
      'Tratar contactantes adultos assintomáticos indiscriminadamente — foco em ambiente. (3)(4)',
      'Confundir Giardia com *Tritrichomonas* em gatos — PCR específico necessário. (9)(12)',
      'Subdosar fenbendazol por erro de apresentação comercial (mg/comprimido). (8)(11)',
      'Rotular “Giardia resistente” na primeira recidiva sem auditar ambiente e adesão. (3)(11)',
    ],
    perolasClinicas: [
      'Três amostras em dias alternados aumentam sensibilidade mais que trocar método na mesma amostra única. (3)(10)',
      'ZnSO₄ 33% com água destilada — técnica Sheather ainda referência coproparasitológica clássica. (3)(10)',
      'Fenbendazol 50 mg/kg ×5 d funciona em cães e gatos — simplifica prescrição multi-species household. (3)(4)(11)',
      'Banho completo no último dia do tratamento remove cistos da pelagem — detalhe frequentemente esquecido. (3)(4)(14)',
      'Diarreia crônica felina jovem = Giardia + *Tritrichomonas* até prova em contrário (PCR). (9)(12)',
      'Positivo ELISA com melhora clínica pós-fenbendazol — não exigir negativação laboratorial para alta. (3)(10)',
      'Esteatorreia persistente pós-giardíase → TLI/cobalamina — pensar IPE, não repetir vermífugo. (6)',
      'Surto em abrigo: desinfecção + remoção fecal > tratamento em massa de assintomáticos adultos. (3)(4)(15)',
      'Metronidazol: neurotoxicidade reversível se reconhecida precocemente — evitar doses altas prolongadas. (7)',
      'Assemblage F em gatos — específico do hospedeiro; zoonose felina doméstica é exceção, não regra. (9)(12)',
      'Vacina anti-Giardia disponível em alguns países — não substitui higiene; evidência de rotina universal limitada. (17)',
      'Prevalência brasileira heterogênea (Fonseca 2026) — não usar número único nacional em conselho clínico. (15)',
    ],
    zoonoseCard:
      'Zoonose: assemblages A e B infectam humanos — transmissão cão/gato → pessoa documentada, porém risco doméstico é baixo com higiene adequada (lavar mãos após manipular fezes, desparasitar conforme indicação, evitar contato crianças/imunossuprimidos com fezes frescas). Não alarmar tutores desnecessariamente; orientar medidas práticas. Referência ilustrativa CDC: https://www.cdc.gov/parasites/giardia/prevention-control-prevention.html (14)',
    vacinaNota:
      'Vacinas comerciais anti-Giardia existem em mercados selecionados — estimulam resposta imune mas não substituem controle ambiental nem são consenso de rotina universal (ESCCAP/CAPC). Evidência de benefício populacional limitada vs manejo higiênico + fenbendazol em surtos. Contexto imunológico: Tizard — resposta IgA mucosa relevante; vacinação não elimina necessidade de diagnóstico coproparasitológico. (17)(3)',
    preclinica: [
      'Filhotes de abrigo/criatório: coproparasitológico seriado na intake; higiene preemptiva do ambiente. (3)(4)(15)',
      'Assintomático positivo em triagem de baixo risco: higiene + observação; tratar se desenvolver sinais ou risco epidemiológico. (3)(4)',
      'Multi-pet household com caso index sintomático: tratar sintomático + higiene global; contactantes assintomáticos — individualizar. (3)(4)',
    ],
    aguda: [
      'Diarreia aguda + Giardia confirmada + desidratação leve: fenbendazol 50 mg/kg ×5 d + fluidoterapia oral/SC conforme grau + higiene imediata. (3)(4)(6)',
      'Filhote com diarreia aquosa profusa: priorizar hidratação; iniciar fenbendazol quando tolerando VO; monitorar glicemia em toy breeds. (6)',
      'Evitar antidiarreicos opióides de rotina — mascarar enteropatia grave ou parvovírus. (6)',
    ],
    cronica: [
      'Diarreia ≥3 semanas: fenbendazol + investigação IBD/IPE/*Tritrichomonas*/dietas — não múltiplos ciclos de metronidazol isolados. (3)(6)(9)(12)',
      'Trial dietético altamente digestível durante/ após antigiardíase — reduz carga sobre mucosa recuperando. (3)(6)',
      'Enteropatia crônica refractária após Giardia tratada e ambiente controlado → biópsia/endoscopia conforme indicação. (6)(16)',
    ],
  },

  prevention: {
    higiene: [
      'Remover fezes do ambiente ≤24 h — interrompe ciclo de contaminação. (3)(4)(14)',
      'Desinfetar superfícies (hipoclorito de sódio 1:32, contato ≥5–10 min) e lavar camas/brinquedos em água quente quando possível. (3)(14)',
      'Banhar animal no último dia do tratamento; tosar pelagem perianal se contaminada. (3)(4)',
      'Evitar compartilhamento de potes em surtos; fornecer água fresca limpa; controlar roedores. (3)(14)',
      'Abrigos: protocolo de limpeza diária, separação de filhotes, amostragem de intake. (3)(4)(15)',
    ],
    zoonose:
      'Risco zoonótico baixo em domicílios com higiene — orientar lavar mãos, supervisão crianças, evitar contato com fezes, consultar médico humano se diarreia familiar coincidente. Assemblages A/B são os genótipos de maior preocupação em ambientes mistos. CDC: https://www.cdc.gov/parasites/giardia/ (14)',
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'insuficiencia-pancreatica-exocrina-caes-gatos',
    'peritonite-infecciosa-felina',
    'erliquiose-monocitica-canina',
  ],
  relatedMedicationSlugs: ['fenbendazol', 'metronidazol'],
  references: [
    {
      id: 'ref-vin-giardia-canine-2023',
      citationText: 'Reconciliação editorial interna — Giardíase canina (2023).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-vin-giardia-feline-2023',
      citationText: 'Reconciliação editorial interna — Giardíase felina (2023).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-esccap-gl6-2025',
      citationText:
        'ESCCAP. Guideline 06: Control of Intestinal Protozoa in Dogs and Cats. 3rd ed. ESCCAP, 2025.',
      sourceType: 'Diretriz',
      url: 'https://www.esccap.org/link-document/32/',
      evidenceLevel: 'Alta',
      notes: 'Primeira linha fenbendazol; amostragem seriada; higiene ambiental.',
    },
    {
      id: 'ref-capc-giardia-2025',
      citationText: 'CAPC. Giardia Guidelines. Companion Animal Parasite Council, 2025.',
      sourceType: 'Diretriz',
      url: 'https://capcvet.org/guidelines/giardia/',
      evidenceLevel: 'Alta',
      notes: 'Diagnóstico, tratamento e manejo de contactantes.',
    },
    {
      id: 'ref-bsava-gastro-2020',
      citationText:
        'Allenspach K, Garden OA (eds.). BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. BSAVA, 2020.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Enteropatias infecciosas e abordagem da diarreia crônica.',
    },
    {
      id: 'ref-nelson-couto-2020',
      citationText:
        'Simpson KW, Jergens AE. Gastrointestinal Parasites. In: Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier, 2020.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Giardíase — clínica, diagnóstico e comorbidades.',
    },
    {
      id: 'ref-plumbs-2023',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley, 2023.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Fenbendazol, metronidazol — doses e interações.',
    },
    {
      id: 'ref-bsava-formulary-2020',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA, 2020.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Monografias antiparasitárias e benzimidazóis.',
    },
    {
      id: 'ref-abcd-giardiasis-2025',
      citationText: 'ABCD. Giardiasis in Cats. Advisory Board on Cat Diseases, 2025.',
      sourceType: 'Diretriz',
      url: 'https://www.abcdcatsvets.org/',
      evidenceLevel: 'Alta',
      notes: 'Abordagem felina — diferencial tricomoníade, tratamento.',
    },
    {
      id: 'ref-barrera-2024',
      citationText:
        'Barrera JD, et al. Diagnostic performance of microscopy, rapid test and qPCR for Giardia detection in stray dogs. BMC Vet Res. 2024. DOI: 10.1186/s12917-024-04297-0.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1186/s12917-024-04297-0',
      evidenceLevel: 'Moderada',
      notes: 'Desempenho MIF vs rápido vs qPCR — população cães de rua Brasil.',
    },
    {
      id: 'ref-ciuca-2021',
      citationText:
        'Ciuca L, et al. Efficacy of fenbendazole and metronidazole for Giardia infection in dogs. Front Vet Sci. 2021. DOI: 10.3389/fvets.2021.626424.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.3389/fvets.2021.626424',
      evidenceLevel: 'Moderada',
      notes: 'Comparativo fenbendazol vs metronidazol — CC BY 4.0.',
    },
    {
      id: 'ref-kaufmann-2022',
      citationText:
        'Kaufmann H, et al. Giardia and Tritrichomonas in cats — diagnostic and clinical update. Parasite. 2022. PMC9621113.',
      sourceType: 'Revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9621113/',
      evidenceLevel: 'Moderada',
      notes: 'Diferencial felino Giardia vs Tritrichomonas; assemblages.',
    },
    {
      id: 'ref-allain-buret-2017',
      citationText:
        'Allain T, Buret AG. Pathogenesis and post-infectious manifestations of Giardia in humans and animals. Tissue Barriers. 2017.',
      sourceType: 'Revisão fisiopatologia',
      url: 'https://doi.org/10.1080/21688370.2017.1363944',
      evidenceLevel: 'Moderada',
      notes: 'Adesão, junções intercelulares apicais, microvilosidades, disbiose.',
    },
    {
      id: 'ref-cdc-giardia',
      citationText:
        'CDC. Giardia and Pets; DPDx — Giardiasis. Centers for Disease Control and Prevention.',
      sourceType: 'Saúde pública',
      url: 'https://www.cdc.gov/parasites/giardia/',
      evidenceLevel: 'Referência',
      notes: 'Prevenção, zoonose, ciclo biológico — imagens externas CDC.',
    },
    {
      id: 'ref-fonseca-2026',
      citationText:
        'Fonseca ABM, et al. Giardia spp. in dogs and cats in Brazil — systematic review. Front Parasitology. 2026. DOI: 10.3389/fpara.2026.1895842.',
      sourceType: 'Revisão sistemática',
      url: 'https://doi.org/10.3389/fpara.2026.1895842',
      evidenceLevel: 'Moderada',
      notes: 'Prevalência heterogênea Brasil — sem estimativa nacional única.',
    },
    {
      id: 'ref-greene-infectious',
      citationText:
        'Greene CE (ed.). Infectious Diseases of the Dog and Cat. 4th ed. Elsevier.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Referência de suporte — enteropatias parasitárias.',
    },
    {
      id: 'ref-tizard-immunology',
      citationText:
        'Tizard IR. Veterinary Immunology. 10th ed. Elsevier.',
      sourceType: 'Imunologia',
      url: null,
      evidenceLevel: 'Didático',
      notes: 'Contexto vacinal e resposta IgA mucosa — não indica vacina de rotina.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
