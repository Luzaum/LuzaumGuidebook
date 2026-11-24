import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const asmaFelinaRecord: DiseaseRecord = {
  id: 'disease-asma-felina',
  slug: 'asma-felina',
  title: 'Asma felina',
  subtitle:
    'Doença inflamatória crônica das vias aéreas inferiores de gatos, caracterizada por hiperresponsividade brônquica, broncoconstrição predominantemente reversível, hipersecreção de muco e risco de remodelamento brônquico.',
  synonyms: [
    'Asma brônquica felina',
    'Bronquite alérgica felina',
    'Doença inflamatória das vias aéreas inferiores felina',
    'Broncopneumopatia alérgica do gato',
  ],
  species: ['cat'],
  category: 'respiratorio',
  categories: ['respiratorio', 'clinica-medica', 'medicina-felina', 'urgencia-emergencia'],
  tags: [
    'Gatos',
    'Inflamação Eosinofílica',
    'Broncoespasmo',
    'Fluticasona Inalatória',
    'Terbutalina',
    'Lavado Broncoalveolar',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['asma-felina'],

  quickSummary:
    'Doença inflamatória crônica das vias aéreas inferiores felinas associada principalmente à hipersensibilidade contra alérgenos inalados, com inflamação eosinofílica, broncoconstrição reversível e produção excessiva de muco. Cursa desde tosse crônica intermitente (muitas vezes confundida com tentativa de vomitar bola de pelo) até broncoespasmo grave com risco de morte. Exige exclusão de verminoses pulmonares e outros diferenciais, controle anti-inflamatório contínuo e broncodilatadores restritos ao resgate.',

  quickDecisionStrip: [
    'Crise grave (boca aberta, cianose, exaustão ou queda súbita do esforço respiratório): é emergência imediata — oferte oxigênio com estresse mínimo antes de qualquer exame.',
    'Ausculta normal ou redução de sons ("tórax silencioso") não exclui asma: entre crises o exame pode ser normal, e na obstrução extrema o baixo fluxo reduz os sibilos.',
    'Radiografia não confirma sozinha: padrão brônquico e hiperinsuflação apoiam a suspeita, mas não diferenciam asma de bronquite crônica ou verminose pulmonar.',
    'Eosinófilos no lavado broncoalveolar (LBA) favorecem o fenótipo eosinofílico, mas também ocorrem em parasitoses pulmonares — investigue Aelurostrongylus e dirofilariose.',
    'Broncodilatador (salbutamol/terbutalina) abre o brônquio no resgate, mas nunca substitui o glicocorticoide no controle da inflamação crônica.',
    'Melhora clínica não significa cura: suspender o anti-inflamatório precocemente favorece recaídas e remodelamento estrutural das vias aéreas.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Na prática clínica felina, o diagnóstico da asma resulta da ==integração entre histórico de tosse ou sibilos expiratórios, imagem torácica, exclusão rigorosa de verminoses pulmonares e caracterização inflamatória das vias aéreas==. O tratamento eficaz separa dois alvos distintos: ==broncodilatadores de ação rápida para reverter broncoespasmo agudo== e ==glicocorticoides contínuos (preferencialmente inalatórios com espaçador na manutenção) para conter a inflamação e prevenir remodelamento== {{ref:ref-gareis-schulz-2026}} {{ref:ref-barchilon-reinero-2023}}.',
    leadHighlights: [
      'integração entre histórico de tosse ou sibilos expiratórios, imagem torácica, exclusão rigorosa de verminoses pulmonares e caracterização inflamatória das vias aéreas',
      'broncodilatadores de ação rápida para reverter broncoespasmo agudo',
      'glicocorticoides contínuos (preferencialmente inalatórios com espaçador na manutenção) para conter a inflamação e prevenir remodelamento',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico de Plantão — Suspeita de Asma Felina',
      steps: [
        {
          label: '1. Estabilidade respiratória antes de manipular',
          timing: 'Minutos 0 a 10',
          detail:
            'Observar padrão expiratório, respiração de boca aberta, cianose e nível de consciência à distância; em desconforto importante, ofertar oxigênio antes de radiografar ou colher sangue.',
        },
        {
          label: '2. Caracterização clínica e exclusão de vômito/bola de pelo',
          timing: 'Anamnese dirigida',
          detail:
            'Confirmar tosse verdadeira (idealmente por vídeo do tutor), investigar sibilos, frequência das crises, exposição à fumaça, poeira de areia sanitária, fragrâncias e acesso à rua.',
        },
        {
          label: '3. Imagem torácica e triagem de mimetizadores',
          timing: 'Após estabilização',
          detail:
            'Realizar radiografia torácica (ou ultrassonografia à beira do leito se dispneia indiferenciada), além de investigação parasitológica (Baermann seriado/PCR fecal) e cardiovascular conforme contexto.',
        },
        {
          label: '4. Lavado broncoalveolar (LBA) e revisão da resposta',
          timing: 'Paciente estável',
          detail:
            'Considerar LBA com citologia e cultura quando seguro para distinguir fenótipo eosinofílico de neutrofílico; reavaliar diagnóstico e técnica se a resposta ao tratamento for insatisfatória {{ref:ref-grotheer-2020}}.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Crise Aguda e Controle Contínuo',
      steps: [
        {
          label: '1. Resgate imediato na crise (oxigênio + broncodilatação)',
          timing: 'Minutos 0 a 30',
          detail:
            'Caixa de oxigênio com estresse mínimo, broncodilatador de ação rápida (terbutalina parenteral se não tolerar máscara, ou salbutamol inalatório via espaçador) e dexametasona injetável se suspeita consistente.',
        },
        {
          label: '2. Indução anti-inflamatória oral',
          timing: 'Primeiras 1 a 2 semanas',
          detail:
            'Em pacientes com sinais frequentes ou em transição para via inalatória, iniciar prednisolona oral (que não depende de ativação hepática) e reduzir gradualmente após controle clínico {{ref:ref-verschoor-2021}}.',
        },
        {
          label: '3. Transição para corticoterapia inalatória e ambiente',
          timing: 'Manutenção prolongada',
          detail:
            'Manter propionato de fluticasona via câmara espaçadora com máscara bem vedada (7–10 respirações após o jato), associado à eliminação de fumaça, aerossóis e areia pulverulenta {{ref:ref-barchilon-reinero-2023}}.',
        },
        {
          label: '4. Monitoramento e restrição do resgate',
          timing: 'Acompanhamento contínuo',
          detail:
            'Acompanhar tosse, frequência respiratória em repouso, peso, glicemia e técnica inalatória; necessidade frequente de salbutamol indica inflamação mal controlada, nunca motivo para mantê-lo isoladamente.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Consulta rápida (30–60 segundos) — Pontos decisivos na asma felina',
      headers: ['Pergunta clínica', 'Conduta objetiva baseada em evidência'],
      rows: [
        [
          'Crise aguda grave?',
          'Oxigênio com mínimo estresse, ==terbutalina parenteral ou salbutamol inalatório== e dexametasona; adiar radiografias e lavado até estabilizar.',
        ],
        [
          'Radiografia normal exclui?',
          '==Não.== Quadros leves ou intermitentes podem cursar com radiografia normal, embora alterações ocorram na maioria dos casos sintomáticos {{ref:ref-grotheer-2020}}.',
        ],
        [
          'Eosinófilos no LBA fecham asma alérgica?',
          '==Não isoladamente.== Apontam inflamação eosinofílica, mas verminoses pulmonares e dirofilariose precisam ser descartadas {{ref:ref-fagundes-moreira-2023}}.',
        ],
        [
          'Qual a base da manutenção?',
          '==Glicocorticoide contínuo== (preferencialmente fluticasona inalatória com espaçador após indução ou adaptação) + controle ambiental rigoroso {{ref:ref-gareis-schulz-2026}}.',
        ],
        [
          'Salbutamol pode ficar sozinho?',
          '==Não.== Relaxa a musculatura brônquica sem controlar a inflamação; uso frequente do racêmico pode inclusive agravar a reatividade das vias aéreas {{ref:ref-barchilon-reinero-2023}}.',
        ],
      ],
    },
  },

  etiology: {
    afConceitoEDiferenciacaoFlad:
      'A doença inflamatória das vias aéreas inferiores felinas engloba principalmente a ==asma felina== (tipicamente alérgica e eosinofílica) e a ==bronquite crônica felina== (frequentemente neutrofílica não séptica), além de bronquiectasias, bronquiolites e processos infecciosos ou parasitários. Embora compartilhem tosse, ruídos pulmonares e alterações radiográficas, seus mecanismos e grau de reversibilidade diferem.\n\n' +
      'Uma distinção conceitual essencial é que ==inflamação eosinofílica representa um padrão citológico, e não prova automática de alergia==: verminoses pulmonares e dirofilariose felina produzem exatamente o mesmo perfil celular. Na coorte de Grotheer et al. (2020) com 97 gatos, sinais clínicos e achados radiográficos sobrepuseram-se amplamente entre asma e bronquite crônica, confirmando a necessidade de integrar história, imagem, parasitologia e citologia brônquica {{ref:ref-grotheer-2020}}.',
    afTabelaAsmaVsBronquite: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Comparação entre asma felina e bronquite crônica felina',
      headers: ['Característica', 'Asma felina', 'Bronquite crônica felina'],
      rows: [
        [
          'Processo predominante',
          'Hiperresponsividade brônquica e broncoespasmo agudo, frequentemente alérgico',
          'Inflamação brônquica persistente com alteração estrutural progressiva',
        ],
        [
          'Inflamação citológica típica',
          'Eosinofílica (por vezes mista)',
          'Neutrofílica não séptica',
        ],
        [
          'Reversibilidade da obstrução',
          'Alta no componente funcional inicial (responde a broncodilatadores)',
          'Variável; fibrose e alterações estruturais costumam predominar',
        ],
        [
          'Principais desencadeadores',
          'Aeroalérgenos e irritantes inalados',
          'Irritantes ambientais, lesão epitelial e infecções prévias',
        ],
        [
          'Remodelamento brônquico',
          'Pode ocorrer se a inflamação não for controlada, reduzindo a reversibilidade',
          'Frequente ao longo da cronicidade',
        ],
        [
          'Resposta aos glicocorticoides',
          'Geralmente expressiva',
          'Variável conforme o grau inflamatório e de fibrose instalada',
        ],
      ],
    },
    afCausasEDesencadeadoresEContagio:
      'A etiologia é multifatorial e envolve três etapas distintas: ==predisposição individual== (suscetibilidade imunológica), ==sensibilização== (desenvolvimento de resposta específica contra um alérgeno) e ==desencadeamento== (nova exposição ou irritante inespecífico que dispara broncoespasmo).\n\n' +
      '- ==Irritantes não são necessariamente alérgenos==: fumaça de cigarro, incensos e perfumes ativam terminações nervosas sensoriais, provocam estresse oxidativo e estimulam muco mesmo sem participação de anticorpos IgE; da mesma forma, um teste alérgico positivo não comprova por si só que aquele alérgeno cause o quadro pulmonar.\n' +
      '- ==Não é doença contagiosa==: a asma alérgica não se transmite entre gatos nem para humanos. Contudo, como infecções e parasitas respiratórios causam tosse semelhante e possuem transmissão própria, todo gato com tosse requer investigação antes de receber esse diagnóstico.',
    afTabelaGatilhosEFatores: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Aeroalérgenos, irritantes e fatores associados à asma felina',
      headers: ['Grupo', 'Exemplos comuns', 'Papel clínico'],
      rows: [
        [
          'Aeroalérgenos',
          'Ácaros domésticos, pólens, fungos ambientais e partículas orgânicas',
          'Potenciais agentes de sensibilização imunológica (resposta IgE/Th2).',
        ],
        [
          'Irritantes inalados',
          'Fumaça de cigarro, incenso, velas aromáticas, perfumes, sprays e produtos de limpeza',
          'Desencadeiam broncoconstrição e hipersecreção mesmo sem alergia específica.',
        ],
        [
          'Substratos sanitários',
          'Areia sanitária muito pulverulenta ou perfumada',
          'Exposição diária repetida das vias aéreas durante o uso da caixa.',
        ],
        [
          'Fatores individuais',
          'Predisposição imunológica individual ou familiar presumida',
          'Modula o risco de desenvolver resposta brônquica exagerada.',
        ],
        [
          'Infecções respiratórias prévias',
          'Lesão epitelial e alteração da modulação imune local',
          'Podem contribuir para doença brônquica crônica; causalidade direta para asma não comprovada.',
        ],
        [
          'Obesidade',
          'Acúmulo adiposo torácico/abdominal com maior demanda ventilatória',
          'Agravante mecânico funcional, embora não seja causa alérgica primária.',
        ],
      ],
    },
  },

  epidemiology: {
    afEpidemiologiaERacas:
      'A prevalência estimada da asma felina situa-se classicamente entre ==1% e 5% dos gatos== {{ref:ref-cornell-asthma}}, devendo ser interpretada com cautela porque estudos antigos agrupam asma e bronquite crônica sob critérios variados. Costuma surgir em gatos jovens a de meia-idade, mas pode ser diagnosticada em idosos. Embora raças orientais (como Siamês e Himalaio) sejam historicamente citadas, um gato sem raça definida pode desenvolver crises fatais e a raça não serve como critério diagnóstico individual.\n\n' +
      '- ==Dados comparativos em doença espontânea==: no estudo de Grotheer et al. (2020) com 97 gatos (73 asmáticos eosinofílicos e 24 bronquíticos neutrofílicos), as medianas etárias foram de 6 anos e 7,5 anos respectivamente, sem diferença estatística {{ref:ref-grotheer-2020}}. Já Lee et al. (2020), avaliando 49 gatos por broncoscopia, encontraram média menor no grupo eosinofílico (4,4 ± 3,3 anos) frente ao neutrofílico (8,0 ± 5,6 anos) e misto (7,5 ± 4,0 anos; P = 0,03), mas com ampla sobreposição que impede usar a idade para separar fenótipos isoladamente {{ref:ref-lee-2020}}.\n' +
      '- ==Via aérea unida (vias superiores e orelha média)==: em análise tomográfica de 549 gatos, Wetzels et al. (2025) documentaram alterações concomitantes de vias aéreas inferiores em 338 animais, com associação estatística à rinite (OR 1,62), nasofaringite (OR 1,46), otite média (OR 1,46) e à combinação de rinite e otite média (OR 2,27) — reforçando o valor de examinar sinais nasais e otológicos em gatos respiratórios crônicos, sem estabelecer relação causal {{ref:ref-wetzels-2025}}.',
  },

  pathogenesisTransmission: {
    afAusenciaContagioEExposicaoAmbiental:
      'Por se tratar de doença inflamatória não infecciosa mediada por hipersensibilidade e hiperresponsividade brônquica, a asma felina não envolve agente transmissível. O determinante epidemiológico prático está na ==carga contínua de alérgenos e irritantes em ambientes internos fechados== e na ==exposição parasitária regional==.\n\n' +
      '- ==Atenção aos falsos positivos clínicos no Brasil==: gatos com acesso à rua, caça de lesmas, caramujos, lagartixas, aves ou roedores (ou expostos a mosquitos transmissores de *Dirofilaria immitis*) podem apresentar tosse e inflamação eosinofílica indistinguíveis clinicamente da asma alérgica {{ref:ref-fagundes-moreira-2023}}.\n' +
      '- ==Fármacos associados a tosse brônquica==: na revisão de histórico medicamentoso em gatos, lembrar que agentes como o brometo de potássio (utilizado historicamente em crises convulsivas) associam-se ao desenvolvimento de doença brônquica eosinofílica/neutrofílica e tosse grave na espécie felina.',
  },

  pathophysiology: {
    afAnatomiaEFisiologiaDaExpiracao:
      'O ar percorre narinas, faringe, laringe, traqueia e brônquios (sustentados por cartilagem) até alcançar os bronquíolos, que não possuem anéis cartilaginosos e dependem da tração do tecido pulmonar ao redor e do tônus muscular liso para permanecerem abertos. Na parede brônquica normal, o muco retém partículas e os cílios varrem o material em direção à garganta (esteira mucociliar), enquanto macrófagos alveolares (~75% das células do lavado saudável) mantêm a defesa local.\n\n' +
      '- ==Por que o ar entra melhor do que sai (Lei de Poiseuille)==: em fluxo laminar simplificado, a resistência é inversamente proporcional à quarta potência do raio do brônquio (`R = 8ηL / πr⁴`). Assim, reduzir o raio brônquico para ==70% do normal eleva a resistência teórica em cerca de 4,2 vezes== (e uma queda de 50% no diâmetro elevaria a resistência teórica em 16 vezes no modelo laminar). Na inspiração, a pressão negativa dentro do tórax puxa e dilata as vias aéreas; na expiração, a pressão pleural fica menos negativa ou positiva durante o esforço, comprimindo ainda mais bronquíolos já estreitados por espasmo, edema e muco.\n' +
      '- ==Consequência mecânica==: o ar não consegue sair por completo antes da inspiração seguinte → ocorre ==aprisionamento aéreo e hiperinsuflação pulmonar== → o diafragma fica achatado em posição desfavorável → o gato precisa recrutar a musculatura abdominal no fim da expiração (esforço expiratório marcado).',
    afRespostaImuneTh2EEosinofilos:
      'A forma alérgica clássica envolve polarização de linfócitos auxiliares tipo 2 (Th2) e ativação em três fases:\n\n' +
      '- ==1. Sensibilização==: alérgenos inalados atravessam a mucosa respiratória e são apresentados por células dendríticas aos linfócitos T. Sob perfil Th2, citocinas como ==IL-4 e IL-13== estimulam linfócitos B a produzir imunoglobulina E (IgE) — que se fixa a mastócitos locais — e estimulam muco e hiperreatividade, enquanto a ==IL-5== promove maturação e sobrevida de eosinófilos.\n' +
      '- ==2. Reexposição==: ao inalar novamente o alérgeno, ocorre ligação às moléculas de IgE nos mastócitos, desencadeando liberação rápida de histamina, serotonina (mediador importante no broncoespasmo felino), leucotrienos e citocinas — gerando broncoconstrição imediata, edema de mucosa e hipersecreção.\n' +
      '- ==3. Ciclo eosinofílico crônico==: eosinófilos atraídos para a mucosa liberam proteínas granulares citotóxicas e espécies reativas de oxigênio que lesam o epitélio respiratório. Sem a barreira epitelial íntegra, terminações nervosas sensitivas ficam mais expostas, perpetuando a hiperresponsividade mesmo entre exposições maiores.',
    afBroncoconstricaoMucoERemodelamento:
      'Três processos estruturais explicam o comportamento agudo e crônico da doença:\n\n' +
      '- ==Broncoconstrição e origem dos sibilos==: a acetilcolina em receptores muscarínicos eleva o cálcio celular e contrai o músculo liso brônquico, enquanto agonistas β₂-adrenérgicos (como salbutamol e terbutalina) aumentam AMP cíclico (AMPc) e promovem relaxamento rápido. O fluxo aéreo acelerado atravessando tubos estreitados gera vibrações audíveis como sibilos expiratórios — mas ==relaxar o músculo não apaga a inflamação da mucosa==.\n' +
      '- ==Hipersecreção e tampões de muco==: glândulas submucosas e células secretoras hipertrofiam enquanto os cílios perdem eficiência. Tampões espessos podem bloquear brônquios inteiros, fazendo o ar distal ser absorvido e causando colapso pulmonar localizado (classicamente ==atelectasia do lobo médio direito==).\n' +
      '- ==Remodelamento e inflamação subclínica==: com inflamação prolongada, alterações da parede brônquica tornam parte da obstrução irreversível. Em estudo clínico de gatos tratados com prednisolona oral que ficaram totalmente sem sinais respiratórios, ==7 de 10 ainda exibiam inflamação ativa no lavado broncoalveolar== {{ref:ref-cocayne-2011}} — reforçando o alerta de Barchilon e Reinero (2023) de que ausência de tosse não equivale a vias aéreas saudáveis {{ref:ref-barchilon-reinero-2023}}.\n' +
      '- ==Trocas gasosas e fadiga==: regiões mal ventiladas continuam recebendo sangue (desequilíbrio ventilação/perfusão), causando hipoxemia precoce. No início da crise, o gato hiperventila e derruba o CO₂ (PaCO₂ baixa); quando entra em fadiga muscular, a ventilação cai e ==a PaCO₂ passa a subir (acidose respiratória) — uma PaCO₂ normal ou alta em um gato com esforço intenso é sinal de falência ventilatória iminente==.',
    afTabelaRemodelamentoEstrutural: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Remodelamento estrutural brônquico e suas consequências clínicas',
      headers: ['Alteração estrutural', 'Consequência funcional'],
      rows: [
        [
          'Hipertrofia e hiperplasia do músculo liso',
          'Maior força contrátil e estreitamento basal das vias aéreas.',
        ],
        [
          'Hiperplasia de células secretoras e glândulas mucosas',
          'Excesso de muco espesso, formação de tampões e atelectasias.',
        ],
        [
          'Espessamento de parede e fibrose subepitelial',
          'Redução fixa do calibre brônquico e perda progressiva de resposta total a broncodilatadores.',
        ],
        [
          'Lesão epitelial persistente e perda ciliar',
          'Maior penetração de irritantes, depuração deficiente e hiperresponsividade contínua.',
        ],
        [
          'Bronquiectasias em doença avançada',
          'Dilatação irreversível com retenção crônica de secreções e predisposição a infecção bacteriana secundária.',
        ],
      ],
    },
  },

  clinicalSignsPathophysiology: {
    afFenotiposClinicosApresentacao:
      'A apresentação varia conforme o peso entre broncoespasmo agudo, edema inflamatório, muco e remodelamento prévio:\n\n' +
      '- ==Forma intermitente==: episódios ocasionais de tosse ou sibilos com exame físico completamente normal nos intervalos.\n' +
      '- ==Forma persistente==: tosse frequente, intolerância ao esforço e episódios recorrentes de dificuldade expiratória, exigindo anti-inflamatório contínuo.\n' +
      '- ==Exacerbação aguda e estado de mal asmático==: broncoespasmo súbito e intenso com dispneia grave, risco de hipóxia e falência ventilatória quando refratário ao manejo inicial (categorias úteis à beira do leito, embora não exista um sistema universal validado de estadiamento em gatos).',
    afTabelaSinaisClinicosEMecanismos: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Sinais clínicos, postura da tosse, ausculta silenciosa e mecanismos',
      headers: ['Achado clínico', 'Frequência / Relevância', 'Mecanismo', 'Implicação prática'],
      rows: [
        [
          'Tosse seca ou improdutiva',
          'Muito comum',
          'Estimulação de receptores da tosse por inflamação e muco',
          'Tutores confundem frequentemente com tentativa de vomitar bola de pelo (gato agachado com pescoço estendido sem expelir vômito).',
        ],
        [
          'Sibilos expiratórios',
          'Característicos, não obrigatórios',
          'Vibração da parede ao passar ar por brônquios estreitados',
          'Apoia obstrução brônquica, mas pode estar ausente entre episódios.',
        ],
        [
          'Expiração prolongada e esforço abdominal',
          'Moderada a grave',
          'Aumento da resistência ao esvaziamento pulmonar e recrutamento abdominal',
          'Direciona imediatamente para obstrução intratorácica.',
        ],
        [
          'Respiração de boca aberta e cianose',
          'Emergência máxima',
          'Hipoxemia grave e incapacidade de manter ventilação nasal confortável',
          'Parar manipulação imediatamente e ofertar oxigênio.',
        ],
        [
          'Redução de sons pulmonares ("tórax silencioso")',
          'Altamente perigoso',
          'Fluxo aéreo mínimo por broncoespasmo extremo ou hiperinsuflação maciça',
          'Jamais confundir sumiço de sibilos com melhora clínica se o esforço e a letargia persistirem.',
        ],
        [
          'Agitação ou prostração com redução do esforço',
          'Sinal de alerta crítico',
          'Sensação de asfixia seguida de fadiga muscular e acúmulo de CO₂',
          'Bradipneia em gato previamente dispneico anuncia parada respiratória iminente.',
        ],
        [
          'Febre, perda de peso ou anorexia persistente',
          'Atípicos na asma isolada',
          'Sugerem infecção, parasitose grave, neoplasia ou cardiopatia sistêmica',
          'Obriga revisar diagnósticos diferenciais prioritariamente.',
        ],
      ],
    },
    findingsBySystem: [
      {
        system: 'respiratory',
        findings: [
          {
            finding: 'Tosse paroxística, sibilos expiratórios, expiração prolongada e esforço abdominal',
            mechanism: 'Inflamação brônquica eosinofílica, contração do músculo liso e aprisionamento aéreo pela Lei de Poiseuille.',
            clinicalMeaning: 'Indica obstrução de vias aéreas inferiores; normalidade entre crises não descarta a doença.',
          },
          {
            finding: 'Respiração de boca aberta, cianose ou redução abrupta dos ruídos respiratórios',
            mechanism: 'Hipoxemia severa, desequilíbrio ventilação/perfusão ou exaustão ventilatória com fluxo aéreo crítico.',
            clinicalMeaning: '==Emergência imediata==: oxigênio e broncodilatador antes de qualquer radiografia ou exame.',
          },
        ],
      },
      {
        system: 'general',
        findings: [
          {
            finding: 'Apetite e temperatura normais fora das crises (ausência de sinais sistêmicos)',
            mechanism: 'Processo inflamatório restrito às vias aéreas inferiores.',
            clinicalMeaning: 'Febre, emagrecimento ou anorexia sustentada sugerem pneumonia, parasitose grave, neoplasia ou doença cardíaca.',
          },
        ],
      },
    ],
    physicalExamFindings: [
      'Primeiro observe à distância (na caixa de transporte ou câmara de oxigênio): avalie postura (pescoço estendido, decúbito esternal, cotovelos abduzidos), frequência, padrão expiratório vs. inspiratório, mucosas e grau de alerta antes de conter o animal.',
      'Diferenciação pelo padrão respiratório: esforço expiratório acentuado aponta para obstrução intratorácica (asma/bronquite); estridor inspiratório direciona para vias aéreas superiores; respiração rápida e superficial com sons reduzidos ventralmente sugere doença do espaço pleural.',
      'Ausculta após estabilização: pesquisar sibilos expiratórios, roncos por secreções centrais, estertores (que sugerem alteração parenquimatosa associada) e ausculta cardíaca cuidadosa (sopros, galope ou arritmias).',
      'Sinais vitais completos: temperatura retal (somente se estável), hidratação, escore corporal e busca de sinais nasais ou otológicos concomitantes {{ref:ref-wetzels-2025}}.',
    ],
    particularidadesCaninasEFelinas:
      '- Gatos: constituem a espécie exclusiva desta síndrome clínica. Apresentam elevada reatividade simpática e parassimpática ao estresse e forte tendência a broncoespasmo e laringoespasmo agudos.\n' +
      '- Cães: embora apresentem bronquite crônica e broncopneumopatia eosinofílica, a síndrome de asma alérgica felina com crises graves de broncoespasmo reversível não deve ser extrapolada diretamente para a espécie canina.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico passo a passo — Da triagem à fenotipagem',
      subtitle: 'Expanda cada etapa para visualizar prioridades de segurança, limitações dos testes e critérios diferenciais.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Minutos 0–10 · Triagem vital',
          speciesTag: 'cat',
          title: 'O gato está respirando com segurança para ser examinado?',
          quickSummary:
            'Avalie padrão ventilatório, respiração de boca aberta, cianose e fadiga antes de manipular ou conter para exames.',
          quickFacts: [
            { label: 'Regra de ouro', value: 'Estabilizar antes de radiografar' },
            { label: 'Sinal crítico', value: 'Bradipneia em gato exausto' },
          ],
          details: [
            {
              label: 'Por que adiar exames na crise?',
              content:
                'Contenção forçada para coleta de sangue ou posicionamento em mesa de raios X pode desencadear broncoespasmo fatal e parada cardiorrespiratória em gatos hipoxêmicos {{ref:ref-trzil-2020}}.',
              tone: 'danger',
            },
            {
              label: 'Papel da ultrassonografia à beira do leito',
              content:
                'Quando há dúvida se a dispneia é brônquica, cardíaca ou pleural, uma varredura ultrassonográfica rápida sem decúbito dorsal ajuda a descartar derrame pleural ou pneumotórax sem atrasar o oxigênio.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Anamnese · Padrão clínico',
          speciesTag: 'cat',
          title: 'Confirmar síndrome brônquica e separar de vômito/bola de pelo',
          quickSummary:
            'Investigue tosse verdadeira (solicite vídeo ao tutor), sibilos, irritantes domésticos, acesso à rua e histórico de medicações.',
          quickFacts: [
            { label: 'Armadilha comum', value: 'Confundir tosse com bola de pelo' },
            { label: 'Ambiente', value: 'Fumaça, areia com pó e sprays' },
          ],
          details: [
            {
              label: 'Diferenciação clínica de vômito',
              content:
                'Na tosse felina o gato se agacha, estica o pescoço paralelo ao chão e realiza movimentos expiratórios seguidos, sem expulsar conteúdo gástrico ou tricobezoares.',
              tone: 'default',
            },
            {
              label: 'Histórico epidemiológico brasileiro',
              content:
                'Pergunte sobre caça, acesso à rua, ambiente rural ou litorâneo e profilaxia antiparasitária para dimensionar risco de Aelurostrongylus abstrusus e dirofilariose {{ref:ref-fagundes-moreira-2023}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Após estabilização · Exclusões',
          speciesTag: 'cat',
          title: 'Radiografia torácica e exclusão de mimetizadores tratáveis',
          quickSummary:
            'Obtenha radiografias torácicas ortogonais, avalie hemograma/bioquímica e investigue parasitas pulmonares e cardiopatia.',
          quickFacts: [
            { label: 'Padrão radiográfico', value: 'Trilhos de trem, donuts e hiperinsuflação' },
            { label: 'Sensibilidade', value: 'Exame normal não exclui asma' },
          ],
          details: [
            {
              label: 'Verminose pulmonar no Brasil',
              content:
                'Amostra única de Baermann negativo não descarta Aelurostrongylus abstrusus (sensibilidade de 56,25% frente à PCR fecal em coorte brasileira de gatos respiratórios); prefira coletas seriadas ou PCR fecal {{ref:ref-fagundes-moreira-2023}}.',
              tone: 'evidence',
            },
            {
              label: 'Triagem cardíaca e dirofilariose',
              content:
                'Na presença de sopro, galope, taquipneia restritiva ou área endêmica de dirofilariose, associe ecocardiograma, peptídeo natriurético (quando indicado) e testes de antígeno/anticorpo para Dirofilaria.',
              tone: 'default',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Paciente estável · Fenotipagem',
          speciesTag: 'cat',
          title: 'Lavado broncoalveolar (LBA) ou lavado endotraqueal quando indicado',
          quickSummary:
            'Colha amostra das vias aéreas inferiores para citologia e cultura apenas quando o paciente estiver estável para anestesia.',
          quickFacts: [
            { label: 'Contraindicação', value: 'Asma instável ou hipoxemia grave' },
            { label: 'Achado típico', value: 'Eosinofilia brônquica (sem bactérias)' },
          ],
          details: [
            {
              label: 'Cuidados anestésicos e risco de broncoespasmo',
              content:
                'Pré-oxigene, aplique lidocaína tópica laríngea antes de intubar (aguardando dessensibilização para evitar laringoespasmo) e considere broncodilatador prévio em pacientes suscetíveis, mantendo oximetria contínua.',
              tone: 'warning',
            },
            {
              label: 'Heterogeneidade espacial e cultura',
              content:
                'Diferentes lobos pulmonares podem mostrar perfis celulares distintos {{ref:ref-lee-2020}}, e a presença de DNA bacteriano ou Mycoplasma isolado sem inflamação séptica não prova infecção causal {{ref:ref-werner-2023}}.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Seguimento · Integração',
          speciesTag: 'cat',
          title: 'Integrar achados e auditar resposta terapêutica',
          quickSummary:
            'Classifique o fenótipo mais provável, institua terapia anti-inflamatória e reavalie diagnóstico e técnica inalatória se não houver controle.',
          quickFacts: [
            { label: 'Diretrizes atuais', value: 'Diagnóstico clínico e de exclusão' },
            { label: 'Falha terapêutica', value: 'Checar técnica, ambiente e diferenciais' },
          ],
          details: [
            {
              label: 'Limites da radiografia no controle',
              content:
                'Alterações radiográficas estruturais podem persistir em quase 80% dos gatos mesmo após grande melhora clínica aos 60 dias; o ajuste baseia-se sobretudo na clínica, não em normalizar o raio X {{ref:ref-gareis-2023}}.',
              tone: 'evidence',
            },
            {
              label: 'Quando investigar vias superiores ou fazer tomografia',
              content:
                'Casos refratários, atípicos ou com sinais nasais/otológicos justificam tomografia computadorizada para investigar bronquiectasia, massas, corpos estranhos, rinite ou otite média associadas {{ref:ref-wetzels-2025}}.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    afHematologiaBioquimicaEGasometria:
      'Exames sanguíneos não confirmam asma, mas rastreiam comorbidades, estabelecem base antes de corticoides e avaliam o risco respiratório nas crises:\n\n' +
      '- ==Hemograma==: eosinofilia sanguínea ocorre em apenas cerca de 40% dos gatos asmáticos (e em ~27% dos bronquíticos) {{ref:ref-grotheer-2020}}, portanto ==hemograma normal é frequente e não discrimina fenótipos==. Eritrocitose discreta pode surgir na hipoxemia crônica (diferenciar de desidratação), enquanto anemia não faz parte da asma simples e exige investigar outra doença.\n' +
      '- ==Bioquímica e eletrólitos==: ureia, creatinina e enzimas hepáticas avaliam segurança pré-anestésica e corticoterapia. Atenção à ==hiperglicemia de estresse== em gatos em crise (não confundi-la com diabetes sem dosar frutosamina ou confirmar persistência), bem como à ==queda de potássio e elevação de lactato== após doses repetidas de agonistas β₂-adrenérgicos ou esforço extremo.\n' +
      '- ==Gasometria arterial na crise==: a oximetria de pulso estima oxigenação, mas ==não mede gás carbônico (PaCO₂)==. Um gato sob oxigênio pode apresentar saturação aceitável enquanto retém CO₂ perigosamente por fadiga muscular.',
    afTabelaGasometriaCrise: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Padrões esperados na hemogasometria durante a crise asmática',
      headers: ['Situação clínica', 'pH', 'PaCO₂', 'PaO₂', 'Interpretação'],
      rows: [
        [
          'Asma estável',
          'Normal',
          'Normal',
          'Normal',
          'Gasometria normal não exclui inflamação brônquica crônica.',
        ],
        [
          'Crise inicial com hiperventilação efetiva',
          'Normal ou elevado',
          'Diminuída',
          'Normal ou diminuída',
          'Tendência à alcalose respiratória; desigualdade V/Q já pode reduzir PaO₂ antes de reter CO₂.',
        ],
        [
          'Obstrução grave com fadiga ventilatória',
          'Diminuído',
          'Elevada',
          'Diminuída',
          'Acidose respiratória: sinal de falência ventilatória iminente (PaCO₂ normal ou alta sob grande esforço já é alarme crítico).',
        ],
        [
          'Crise prolongada com choque ou exaustão extrema',
          'Baixo',
          'Normal ou alta',
          'Diminuída',
          'Distúrbio misto (acidose respiratória somada à acidose metabólica lática).',
        ],
      ],
    },
    afImagemToracicaRxTcEPocus:
      'A avaliação por imagem deve aguardar a estabilização respiratória, exceto pela varredura ultrassonográfica rápida no paciente crítico:\n\n' +
      '- ==Radiografia torácica==: achados clássicos incluem ==padrão brônquico== (paredes espessadas em cortes longitudinais — "trilhos de trem" — e transversais — "rosquinhas/donuts"), ==hiperinsuflação pulmonar== (pulmões mais escuros e volumosos, diafragma achatado e deslocado caudalmente com maior espaço entre coração e diafragma) e possível ==atelectasia do lobo médio direito== por tampão mucoso. Embora Grotheer et al. (2020) tenham observado radiografias alteradas em 94% dos asmáticos e 91% dos bronquíticos de uma amostra hospitalar selecionada, ==radiografia normal não exclui asma leve ou intermitente== {{ref:ref-grotheer-2020}}.\n' +
      '- ==Tomografia computadorizada (TC)==: indicada sob anestesia controlada em casos refratários, achados atípicos ou planejamento de broncoscopia; detecta espessamento fino, tampões de muco, bronquiectasias, nódulos bronquiolares ramificados e massas focais não visíveis ao raio X, sem haver um padrão tomográfico exclusivo para asma.\n' +
      '- ==Ultrassonografia torácica à beira do leito==: não visualiza diretamente brônquios aerados (exame normal não afasta asma), mas diferencia rapidamente derrame pleural, pneumotórax, consolidações periféricas e alterações cardíacas grosseiras na emergência.\n' +
      '- ==Atlas radiográfico e tomográfico externo==: exemplos ilustrativos externos de radiografia brônquica lateral e padrão bronquiolar tomográfico em "árvore em brotamento" encontram-se citados nas referências ao final da página para consulta visual (não incorporados diretamente por ausência de licença aberta verificada) {{ref:ref-san-pancrazio-rx}} {{ref:ref-vetrad-tc}}.',
    afBroncoscopiaLavadoEMicrobioma:
      'O lavado broncoalveolar (LBA) e a broncoscopia caracterizam o tipo de inflamação e investigam infecções secundárias, mas exigem critério rigoroso de segurança:\n\n' +
      '- ==Contraindicações absolutas ou momentâneas==: nunca realizar LBA ou broncoscopia em gato com asma instável, hipoxemia grave, instabilidade anestésica, coagulopatia, obstrução parcial de traqueia ou hipertensão pulmonar; o procedimento predispõe a laringoespasmo e broncoespasmo agudo e deve aguardar estabilização.\n' +
      '- ==Heterogeneidade e falsos negativos==: macrófagos alveolares representam cerca de 75% das células do LBA felino normal, enquanto estudos citam cortes operacionais ≥ 17% a 20% de eosinófilos para classificar inflamação eosinofílica (não sendo limite diagnóstico absoluto). Além disso, Lee et al. (2020) mostraram que 6 de 14 gatos com inflamação mista tinham perfis celulares diferentes entre lobos lavados {{ref:ref-lee-2020}}, e corticoterapia prévia pode mascarar a inflamação.\n' +
      '- ==Microbioma respiratório vs. infecção real==: no estudo de Werner et al. (2023) por sequenciamento 16S em 22 gatos (15 asmáticos e 7 bronquíticos), a diversidade bacteriana global não diferiu entre os grupos (Bray-Curtis P = 0,785), e sequências de *Mycoplasma* surgiram mesmo com PCR convencional negativa — provando que ==DNA bacteriano ou cultura leve isolada no LBA não justificam antibioticoterapia automática== {{ref:ref-werner-2023}}.',
    afTabelaCitologiaLba: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Interpretação citológica do lavado broncoalveolar e suas limitações',
      headers: ['Achado citológico no LBA', 'Interpretação principal', 'Limitação / Cuidado'],
      rows: [
        [
          'Predomínio de macrófagos alveolares (~75%)',
          'População esperada em vias aéreas saudáveis',
          'Não descarta doença focal, fase intermitente ou tratamento prévio com corticoide.',
        ],
        [
          'Eosinofilia acentuada (ex.: ≥ 17–20% em estudos)',
          'Sustenta fenótipo inflamatório eosinofílico (como asma)',
          'Não confirma alergia isoladamente — verminose pulmonar e dirofilariose causam o mesmo achado.',
        ],
        [
          'Neutrofilia não degenerativa sem bactérias',
          'Compatível com bronquite crônica não séptica ou fase mista',
          'Pode coexistir em diferentes lobos de um mesmo gato {{ref:ref-lee-2020}}.',
        ],
        [
          'Neutrófilos degenerados com bactérias intracelulares',
          'Forte indício de infecção bacteriana secundária ativa',
          'Correlacionar com crescimento em cultura quantitativa e clínica.',
        ],
        [
          'Muco abundante e espirais mucosas',
          'Hipersecreção glandular e falha na limpeza ciliar',
          'Inespecífico para diferenciar asma de bronquite.',
        ],
        [
          'Células atípicas ou larvas/ovos parasitários',
          'Suspeita neoplásica ou confirmação direta de parasitose',
          'Ausência de larvas no LBA não exclui verminose pulmonar {{ref:ref-fagundes-moreira-2023}}.',
        ],
      ],
    },
    afFiguraMicrobiomaWerner2023: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/asma-felina/werner-2023-microbioma-lba.webp',
      alt: 'Gráficos comparando a abundância relativa de táxons bacterianos no lavado broncoalveolar de gatos com asma felina e bronquite crônica',
      shortCaption: 'Fig. 1 — Microbioma bacteriano no LBA de gatos com asma vs. bronquite crônica (Werner et al., 2023).',
      caption:
        'Figura 1 — Abundância relativa dos grupos bacterianos identificados por sequenciamento 16S rRNA em amostras de lavado broncoalveolar de gatos com asma felina e bronquite crônica. A ampla sobreposição e variabilidade individual demonstram que a presença de DNA bacteriano nas vias aéreas inferiores não equivale à infecção bacteriana ativa nem justifica antibioticoterapia empírica rotineira. Fonte: Werner et al. (2023), Frontiers in Veterinary Science 10:1148849, Fig. 3 (CC BY 4.0).',
      display: 'default',
    },
    afTabelaDesempenhoTestesEVerminosesBr: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Desempenho dos testes específicos e relevância de Aelurostrongylus abstrusus no Brasil',
      headers: ['Exame específico', 'O que investiga', 'Resultado positivo vs. negativo', 'Limites e relevância brasileira'],
      rows: [
        [
          'Baermann fecal vs. PCR fecal (Aelurostrongylus abstrusus)',
          'Larvas vivas (Baermann) ou DNA parasitário (PCR) nas fezes',
          'Positivo confirma parasitose pulmonar; ==único Baermann negativo não exclui==.',
          'Em 43 gatos brasileiros sintomáticos, PCR detectou 32/43 (74%) contra 18/43 (41%) no Baermann (sensibilidade de 56,25%) e 0 larvas em 21 LBAs {{ref:ref-fagundes-moreira-2023}}.',
        ],
        [
          'Dirofilariose felina (antígeno e anticorpo)',
          'Antígeno de fêmeas adultas ou anticorpos de exposição',
          'Antígeno positivo reforça infecção; anticorpo indica exposição (incluindo doença respiratória associada a larvas imaturas).',
          'Em gatos a carga parasitária costuma ser baixa, tornando falsos negativos de antígeno frequentes.',
        ],
        [
          'Cultura bacteriana e PCR para Mycoplasma no LBA',
          'Bactérias viáveis ou DNA de Mycoplasma',
          'Deve ser interpretado junto à citologia (neutrófilos degenerados/fagocitose).',
          'Colonização normal e contaminação orofaríngea ocorrem com frequência {{ref:ref-werner-2023}}.',
        ],
        [
          'Testes alérgicos séricos ou intradérmicos',
          'Sensibilização por IgE a alérgenos ambientais específicos',
          'Positivo não prova que o alérgeno cause os sinais pulmonares.',
          'Não validados para diagnosticar asma; úteis apenas para formular imunoterapia específica em casos selecionados {{ref:ref-santoro-2021}}.',
        ],
        [
          'Testes de função pulmonar (pletismografia)',
          'Resistência das vias aéreas e hiperresponsividade',
          'Sustenta obstrução funcional brônquica.',
          'Ferramenta sobretudo acadêmica/pesquisa; não substitui a investigação clínica de rotina.',
        ],
      ],
    },
    afTabelaDiferenciaisAsma: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Principais diagnósticos diferenciais na rotina clínica',
      headers: ['Diferencial', 'Semelhança clínica', 'Pistas diferenciadoras', 'Como investigar'],
      rows: [
        [
          'Bronquite crônica felina',
          'Tosse crônica, sibilos e padrão brônquico',
          'Inflamação neutrofílica persistente no LBA e menor reversibilidade.',
          'LBA citológico/microbiológico após exclusão de parasitas.',
        ],
        [
          'Verminoses pulmonares (Aelurostrongylus, Troglostrongylus, Eucoleus)',
          'Tosse, broncopatia e eosinofilia intensa no LBA',
          'Acesso externo, caça, alterações nodulares ou intersticiais.',
          'Baermann fecal seriado (3 dias) e PCR fecal quando disponível {{ref:ref-fagundes-moreira-2023}}.',
        ],
        [
          'Dirofilariose / Doença respiratória associada à dirofilária',
          'Tosse, crises súbitas de dispneia e infiltrado pulmonar',
          'Região endêmica, exposição a mosquitos e artérias pulmonares tortuosas.',
          'Antígeno + anticorpo para Dirofilaria, radiografia e ecocardiograma.',
        ],
        [
          'Insuficiência cardíaca congestiva (cardiomiopatias)',
          'Taquipneia e dispneia aguda',
          'Sopro, galope, hipotermia, edema pulmonar alveolar ou derrame pleural (tosse é bem menos comum que na asma).',
          'Ultrassonografia rápida de tórax, ecocardiograma, radiografia e NT-proBNP.',
        ],
        [
          'Derrame pleural ou pneumotórax',
          'Dispneia acentuada e esforço abdominal',
          'Padrão respiratório restritivo rápido e superficial, com sons abafados ventral ou dorsalmente.',
          'Ultrassonografia torácica imediata e toracocentese estabilizadora antes do raio X.',
        ],
        [
          'Pneumonia bacteriana, neoplasia, corpo estranho ou fibrose',
          'Tosse refratária e dispneia progressiva',
          'Febre e emagrecimento (pneumonia/neoplasia), início agudo unilateral (corpo estranho) ou padrão intersticial crônico.',
          'Hemograma, radiografia, tomografia computadorizada, broncoscopia e biópsia.',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico passo a passo — Da emergência à manutenção',
      subtitle: 'Expanda cada etapa para conferir prioridades imediatas, transição oral–inalatória e técnica com espaçador.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Minutos 0–30 · Emergência',
          speciesTag: 'cat',
          title: 'Oxigênio com mínimo estresse e reversão rápida do broncoespasmo',
          quickSummary:
            'Reduza o trabalho respiratório imediatamente com oxigênio enriquecido e broncodilatador de ação rápida, associando corticoide sistêmico em crises moderadas a graves.',
          quickFacts: [
            { label: 'Broncodilatador SC/IM/IV', value: 'Terbutalina 0,01 mg/kg' },
            { label: 'Broncodilatador inalatório', value: 'Salbutamol 90–100 µg/jato' },
          ],
          details: [
            {
              label: 'Escolha entre via injetável e inalatória na crise',
              content:
                'Se o gato rejeitar máscara facial sobre o focinho, não insista: aplique terbutalina parenteral (0,01 mg/kg IV, IM ou SC) em gaiola de oxigênio; se tolerar espaçador, o salbutamol inalatório pode ser associado ou repetido sob monitorização clínica.',
              tone: 'tip',
            },
            {
              label: 'Papel da dexametasona na emergência',
              content:
                'O fosfato sódico de dexametasona (0,1–0,2 mg/kg IV ou IM; via SC pode ter absorção errática na desidratação) combate a inflamação, mas leva horas para agir por via genômica — nunca substitui a broncodilatação imediata.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Refratariedade · Alerta crítico',
          speciesTag: 'cat',
          title: 'Reavaliar se não houver melhora inicial e proteger a ventilação',
          quickSummary:
            'Falta de resposta rápida exige buscar causas alternativas de dispneia (derrame, edema cardiogênico, pneumotórax, tampão mucoso) e preparar via aérea avançada se surgir fadiga.',
          quickFacts: [
            { label: 'Não fazer na crise', value: 'Fluticasona isolada, fluidos excessivos ou LBA' },
            { label: 'Ventilação mecânica', value: 'Garantir tempo expiratório longo' },
          ],
          details: [
            {
              label: 'Cuidado na ventilação invasiva obstrutiva',
              content:
                'Aumentar demais a frequência respiratória na ventilação mecânica encurta a expiração e agrava o aprisionamento aéreo (hiperinsuflação dinâmica e autopressão positiva ao final da expiração); priorize tempo expiratório prolongado.',
              tone: 'danger',
            },
            {
              label: 'Adrenalina e fluidos na crise',
              content:
                'Fluidoterapia não dilata brônquios e exige cautela pelo risco cardíaco oculto; adrenalina fica restrita a situações extremas com risco iminente de morte pelos fortes efeitos α e β1.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Dias 1–14 · Indução e transição',
          speciesTag: 'cat',
          title: 'Controlar a inflamação oral e transicionar para via inalatória',
          quickSummary:
            'Induza controle com prednisolona oral (preferida à prednisona em gatos) enquanto treina o espaçador, mantendo sobreposição de 7–14 dias ao iniciar fluticasona.',
          quickFacts: [
            { label: 'Prednisolona inicial', value: '0,5–1 mg/kg VO q12h (desmamar após controle)' },
            { label: 'Início da fluticasona', value: 'Efeito pleno após 7–10 dias' },
          ],
          details: [
            {
              label: 'Por que não parar a prednisolona no 1º dia de bombinha?',
              content:
                'A fluticasona inalatória demanda cerca de 7 a 10 dias para atingir ação anti-inflamatória brônquica relevante; interromper o corticoide oral de imediato precipita recaída precoce e risco de insuficiência adrenal após uso prolongado {{ref:ref-verschoor-2021}}.',
              tone: 'warning',
            },
            {
              label: 'Por que prednisolona e não corticoide de depósito?',
              content:
                'Gatos convertem mal prednisona em prednisolona no fígado; já o acetato de metilprednisolona injetável impede ajuste fino de dose, agrava risco de diabetes e falência cardíaca e permite recidiva inflamatória entre aplicações — devendo ser última exceção.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Longo prazo · Manutenção',
          speciesTag: 'cat',
          title: 'Manutenção com fluticasona inalatória, manejo ambiental e vigilância',
          quickSummary:
            'Ajuste a menor dose eficaz (tipicamente 110–220 µg q12h até reduzir a 44–110 µg conforme resposta), elimine irritantes e monitore parâmetros clínicos.',
          quickFacts: [
            { label: 'Técnica do espaçador', value: 'Máscara vedada por 7–10 respirações' },
            { label: 'Resgate em casa', value: 'Salbutamol apenas em crise pontual' },
          ],
          details: [
            {
              label: 'Riscos locais e sistêmicos mesmo na via inalatória',
              content:
                'Embora reduza muito a exposição sistêmica frente aos comprimidos, glicocorticoides inalatórios podem causar irritação facial ou demodicose localizada na área da máscara — e a budesonida já demonstrou supressão adrenal em parte dos gatos tratados {{ref:ref-galler-2013}}.',
              tone: 'evidence',
            },
            {
              label: 'Sinal de descontrole na manutenção',
              content:
                'Necessidade frequente de salbutamol ou retorno da tosse indicam falha de técnica inalatória, gatilho ambiental persistente ou inflamação subtratada {{ref:ref-barchilon-reinero-2023}}.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    afManejoCriseEOxigenoterapia:
      'Na crise asmática aguda, preservar a oxigenação e reduzir o trabalho respiratório vêm antes de qualquer investigação:\n\n' +
      '- ==Oxigenoterapia com estresse mínimo==: a ==gaiola ou caixa de oxigênio== (40–100% conforme necessidade, evitando manter frações > 60% por mais de 8–12 h quando dispensável) é a melhor escolha por dispensar contenção física. Máscaras faciais devem ser usadas apenas se toleradas sem agitação.\n' +
      '- ==Broncodilatadores de ação rápida==: ==terbutalina== (0,01 mg/kg IV, IM ou SC, podendo repetir em 15–30 min sob monitoramento de frequência cardíaca e arritmias) é ideal quando o gato não aceita máscara. O ==salbutamol inalatório== (90–100 µg por jato via espaçador) pode ser repetido a cada 15–30 minutos em crises sob supervisão (intervalos variam entre protocolos de 15 e 30 min sem ensaio provando superioridade entre eles) {{ref:ref-barchilon-reinero-2023}}.\n' +
      '- ==O que NÃO fazer na crise==: não tentar controlar crise aguda com fluticasona isolada (não é broncodilatadora), não conter para radiografias ou LBA, não infundir fluidos em bolus sem hipovolemia documentada (fluidoterapia não dilata brônquios) e não usar adrenalina como primeira linha rotineira.',
    afManutencaoCorticoidesETecnicaInalatoria:
      'Os glicocorticoides atuam ligando-se a receptores intracelulares e reduzindo a transcrição de mediadores pró-inflamatórios (como vias NF-κB e AP-1) e o recrutamento de eosinófilos — atacando a causa inflamatória do remodelamento:\n\n' +
      '- ==Prednisolona oral vs. fluticasona inalatória==: no ensaio piloto randomizado de Verschoor-Kirss et al. (2021) com 9 gatos, tanto prednisolona oral quanto fluticasona inalatória (110 µg q12h com 7 dias iniciais de prednisolona) eliminaram os sinais clínicos e reduziram eosinófilos no LBA em 8 semanas {{ref:ref-verschoor-2021}}. Barchilon e Reinero (2023) sugerem iniciar com 220 µg q12h e titular para 110 ou 44 µg q12h conforme controle, mantendo preferência pela via inalatória sobretudo em gatos diabéticos, obesos ou cardiopatas {{ref:ref-barchilon-reinero-2023}}.\n' +
      '- ==Protocolo de adaptação progressiva à máscara (6 passos)==: (1) deixar o espaçador próximo ao pote de alimento por alguns dias; (2) recompensar com petiscos e carinho toda aproximação; (3) treinar encostar a máscara vazia suavemente sobre o focinho; (4) garantir vedação confortável sem pressionar os olhos; (5) agitar o inalador dosimetrado acoplado, disparar 1 jato na câmara e aguardar ==7 a 10 incursões respiratórias== (observando a válvula móvel); (6) recompensar imediatamente. Nota: inaladores em pó seco dependentes de inspiração profunda humana **não** substituem dispositivos pressurizados com espaçador, e o frasco de 1 jato 2×/dia dura cerca de 2 meses.\n' +
      '- ==Efeitos adversos a vigiar==: na corticoterapia oral prolongada, vigiar aumento de apetite e peso, sede e urina excessivas, diabetes mellitus, fragilidade cutânea e descompensação cardíaca; na via inalatória, limpar ou inspecionar o focinho pelo risco eventual de irritação local ou demodicose facial.\n' +
      '- ==Referência didática externa==: material fotográfico educativo demonstrando posicionamento de espaçador e máscara facial encontra-se listado nas referências finais {{ref:ref-nerdy-vet-inhaler}}.',
    afBroncodilatadoresAntimicrobianosETerapiasLimitadas:
      '- ==Por que nunca usar salbutamol contínuo isolado==: a formulação comum é racêmica (mistura de R-salbutamol broncodilatador e S-salbutamol); o uso frequente e repetido do racêmico foi associado experimentalmente ao agravamento da inflamação brônquica {{ref:ref-barchilon-reinero-2023}}. Reserve o salbutamol ao resgate pontual.\n' +
      '- ==Divergência na dose de terbutalina oral e limitações da teofilina==: existem duas faixas publicadas na literatura para terbutalina oral em gatos (~0,31–0,63 mg/gato equivalendo a 1/8–1/4 de comprimido de 2,5 mg versus 1,25–2,5 mg/gato q8–12h). Como a faixa maior eleva risco de taquicardia, tremores e descompensação em cardiopatas ocultos, a decisão deve priorizar avaliação cardiovascular rigorosa. Já a teofilina de liberação prolongada possui janela terapêutica estreita (nível sérico alvo 10–20 µg/mL), metabolismo errático entre fabricantes e efeitos adversos (excitação, vômitos e arritmias), perdendo espaço para a terapia inalatória.\n' +
      '- ==Antibióticos somente com infecção comprovada==: asma não é infecção bacteriana; não prescreva antibiótico empírico apenas por padrão brônquico ou presença de DNA de *Mycoplasma* sem citologia séptica {{ref:ref-werner-2023}}. Quando doxiciclina for realmente necessária em gatos, administrar sempre com água ou alimento pastoso logo em seguida para evitar esofagite e estenose esofágica.\n' +
      '- ==Terapias de evidência limitada ou contraindicadas (revisão Gareis & Schulz, 2026)==: ciclosporina (reduziu remodelamento apenas em modelo experimental), imunoterapia alérgeno-específica (limitada pela dificuldade de provar alérgenos causais), anti-histamínicos, cipro-heptadina (não atenuou inflamação eosinofílica em ensaio clínico), antileucotrienos, lidocaína inalatória e inibidores de tirosina-quinase não possuem evidência clínica suficiente para substituir glicocorticoides {{ref:ref-gareis-schulz-2026}}. Já a ==N-acetilcisteína nebulizada é contraindicada rotineiramente== pelo risco de desencadear broncoespasmo reflexo grave em gatos hiperreativos.',
    afTabelaAuditoriaDosesAsma: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Auditoria de doses dos principais fármacos na asma felina',
      headers: ['Fármaco', 'Indicação', 'Dose de referência', 'Via e intervalo', 'Alertas farmacológicos'],
      rows: [
        [
          'Terbutalina injetável',
          'Resgate de broncoespasmo agudo',
          '0,01 mg/kg',
          'IV, IM ou SC (pode repetir em 15–30 min se necessário)',
          'Monitorar frequência cardíaca, ritmo e tremores; cautela em hipertensão e cardiopatia.',
        ],
        [
          'Salbutamol (albuterol) inalatório',
          'Resgate em crise aguda',
          '90–100 µg (1–2 jatos)',
          'Inalatória com espaçador; até q15–30 min em crise sob supervisão',
          '==Nunca usar continuamente em monoterapia== (risco pró-inflamatório do S-enantiômero) {{ref:ref-barchilon-reinero-2023}}.',
        ],
        [
          'Dexametasona fosfato sódico',
          'Inflamação em crise moderada/grave',
          '0,1–0,2 mg/kg',
          'IV ou IM (q12h se necessário na fase aguda)',
          'Não substitui broncodilatador rápido; absorção SC errática na desidratação.',
        ],
        [
          'Prednisolona oral',
          'Indução de controle inflamatório',
          '0,5–1 mg/kg (até 1–2 mg/kg em quadros mais intensos)',
          'VO a cada 12 h; desmamar até menor dose eficaz (ex.: 0,5 mg/kg em dias alternados)',
          'Preferida à prednisona em gatos; evitar suspensão abrupta após uso prolongado.',
        ],
        [
          'Propionato de fluticasona',
          'Manutenção anti-inflamatória crônica',
          '44–220 µg/jato (frequente: 110–220 µg)',
          'Inalatória via espaçador a cada 12 h (7–10 respirações)',
          'Efeito pleno após 7–10 dias (sobrepor prednisolona oral na transição) {{ref:ref-verschoor-2021}}.',
        ],
        [
          'Budesonida inalatória',
          'Alternativa inalatória de manutenção',
          '400 µg/gato',
          'Inalatória a cada 12 h',
          'Estudo em doença natural mostrou melhora funcional, porém supressão do eixo adrenal em 3/15 gatos {{ref:ref-galler-2013}}.',
        ],
        [
          'Salmeterol',
          'Adjuvante de longa duração selecionado',
          '50 µg/jato',
          'Inalatória a cada 12 h (sempre associado a corticoide)',
          'Evidência felina limitada; ==nunca usar para resgate agudo nem isoladamente==.',
        ],
        [
          'Terbutalina oral',
          'Adjuvante em broncoespasmo recorrente',
          'Faixas divergentes: ~0,31–0,63 mg/gato vs. 1,25–2,5 mg/gato',
          'VO a cada 8–12 h (individualizado)',
          'Falta equivalência de segurança entre faixas; maior dose eleva risco de taquicardia em cardiopatas.',
        ],
        [
          'Teofilina de liberação prolongada',
          'Adjuvante refratário selecionado',
          '15–19 mg/kg',
          'VO a cada 24 h (à noite)',
          'Índice terapêutico estreito (alvo 10–20 µg/mL), variabilidade entre marcas e risco de arritmia.',
        ],
      ],
    },
    afCondutaPorCenarioPlantao:
      'Organização prática na rotina hospitalar conforme a gravidade clínica:\n\n' +
      '- ==Cenário A — Gato com tosse crônica, estável no momento==: confirmar tosse verdadeira (vídeo do tutor), checar fumaça/areia/sprays, realizar exame físico completo, radiografias torácicas e investigação parasitológica (Baermann seriado/PCR fecal). Se indicar doença brônquica sem sinais sistêmicos, avaliar segurança do LBA quando mudar a conduta e iniciar controle anti-inflamatório + manejo ambiental.\n' +
      '- ==Cenário B — Gato com tosse e dispneia expiratória moderada==: minimizar estresse, ofertar oxigênio, iniciar broncodilatador e corticoide compatível com a gravidade e adiar radiografias para após melhora do esforço respiratório; ampliar investigação imediatamente se não responder.\n' +
      '- ==Cenário C — Gato com boca aberta, cianose ou exaustão==: tratar como emergência vital — oxigênio em gaiola sem manipulação forçada, broncodilatação parenteral + corticoide venoso/muscular, vigilância para fadiga muscular/bradipneia e preparo para intubação se evoluir para falência ventilatória; nenhum exame estressante antes de estabilizar.',
    afTabelaMonitoramentoEControversias: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Monitoramento contínuo, consenso científico e revisão de paradigmas',
      headers: ['Abordagem antiga ou ponto controverso', 'Interpretação atual baseada em evidência'],
      rows: [
        [
          'Todo gato com tosse e padrão brônquico tem asma alérgica',
          'O padrão exige descartar verminoses pulmonares, dirofilariose, bronquite neutrofílica e cardiopatia {{ref:ref-grotheer-2020}} {{ref:ref-fagundes-moreira-2023}}.',
        ],
        [
          'Existe um consenso formal da ACVIM específico para asma felina',
          'Não há consenso institucional exclusivo da ACVIM intitulado para asma felina; as recomendações apoiam-se em diretrizes alérgicas felinas {{ref:ref-santoro-2021}} e revisões especializadas {{ref:ref-gareis-schulz-2026}}.',
        ],
        [
          'A radiografia deve normalizar após desaparecer a tosse',
          'Em coorte prospectiva (60 dias), o escore clínico caiu de 5,5 para 1,5 (P < 0,001), mas ==19/24 gatos (~79%) mantiveram padrão brônquico== {{ref:ref-gareis-2023}}.',
        ],
        [
          'É obrigatório repetir LBA em todo gato assintomático',
          'Embora inflamação citológica possa persistir sem tosse {{ref:ref-cocayne-2011}}, não há indicação rotineira de repetir anestesia e LBA quando o controle clínico é bom.',
        ],
        [
          'Monitorar apenas tosse relata se há controle',
          'Acompanhar frequência de tosse, crises, respiração dormindo, quantas vezes exigiu salbutamol, vedação da máscara e peso/glicemia sob corticoide.',
        ],
        [
          'Testes alérgicos fecham o diagnóstico ou dieta hipoalergênica testa asma',
          'Testes alérgicos medem sensibilização, não causalidade pulmonar; dieta de eliminação só tem indicação quando coexistem sinais dermatológicos ou digestórios {{ref:ref-santoro-2021}}.',
        ],
      ],
    },
  },

  prevention: {
    afControleAmbientalEDieta:
      'Não existe vacina nem método para curar a predisposição imunológica da asma felina; a prevenção concentra-se em ==reduzir gatilhos respiratórios, evitar recidivas e manter peso saudável==, sempre como complemento (e nunca substituto) do anti-inflamatório quando há inflamação ativa:\n\n' +
      '- ==Qualidade do ar doméstico==: eliminar totalmente fumaça de cigarro, incensos e lareiras; abolir aromatizadores, perfumes e sprays perto do gato; realizar limpeza doméstica com o gato em outro cômodo até ventilar bem; corrigir umidade e mofo; trocar areia sanitária empoeirada ou perfumada por substrato de baixa poeira e sem fragrância.\n' +
      '- ==Filtros de ar, peso e parasitas==: purificadores de ar com filtro HEPA ajudam a reduzir partículas suspensas, mas não substituem medicação anti-inflamatória. Controlar a obesidade reduz a carga mecânica sobre o tórax. Manter profilaxia antiparasitária e evitar acesso à caça reduz verminoses mimetizadoras.\n' +
      '- ==Relação com alimentação==: embora a síndrome atópica felina possa associar manifestações cutâneas, digestórias e respiratórias {{ref:ref-santoro-2021}}, dieta hipoalergênica, suplementos ou probióticos não tratam isoladamente a asma nem servem como teste diagnóstico sem sinais gastrointestinais ou dermatológicos concomitantes.',
  },

  complications: {
    afTabelaComplicacoesUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Complicações respiratórias graves e conduta imediata em terapia intensiva',
      headers: ['Complicação', 'Mecanismo e sinais precoces', 'Conduta imediata', 'Impacto prognóstico'],
      rows: [
        [
          'Hipoxemia grave',
          'Desequilíbrio ventilação/perfusão; agitação, boca aberta e cianose tardia',
          'Oxigênio com estresse mínimo, broncodilatador rápido e vigilância contínua',
          'Risco rápido de falência orgânica e óbito.',
        ],
        [
          'Insuficiência ventilatória hipercápnica e exaustão',
          'Fadiga muscular com queda da ventilação alveolar e subida da PaCO₂',
          'Preparar intubação endotraqueal e ventilação mecânica assistida',
          'Sinal de descompensação iminente.',
        ],
        [
          'Hiperinsuflação dinâmica',
          'Aprisionamento progressivo de ar entre ciclos respiratórios curtos',
          'Reverter broncoespasmo e ajustar tempo expiratório longo se ventilado',
          'Reduz retorno venoso e piora trabalho respiratório.',
        ],
        [
          'Atelectasia por tampão mucoso',
          'Bloqueio brônquico completo (frequentemente lobo médio direito)',
          'Estabilizar inflamação, manter hidratação adequada e investigar se refratário',
          'Agrava hipoxemia por efeito shunt.',
        ],
        [
          'Pneumotórax secundário',
          'Ruptura parenquimatosa rara sob pressão expiratória elevada',
          'Ultrassonografia torácica e toracocentese descompressiva imediata',
          'Emergência independente que impede melhora apenas com broncodilatador.',
        ],
        [
          'Bronquiectasia e infecção bacteriana secundária',
          'Dano estrutural crônico com acúmulo permanente de secreções',
          'Imagem (TC), cultura brônquica direcionada e antibiótico apenas se confirmado',
          'Dificulta controle prolongado.',
        ],
      ],
    },
    afReconhecimentoDeFadigaEPrognostico:
      'Reconhecer a transição de esforço intenso para fadiga salva vidas no plantão:\n\n' +
      '- ==O perigo da "falsa melhora"==: um gato que apresentava taquipneia vigorosa e agitação e passa a respirar mais devagar, com menor amplitude de movimento, fraqueza e perda de alerta pode estar em ==falência ventilatória por esgotamento muscular e acúmulo de CO₂== (e não melhorando).\n' +
      '- ==Prognóstico realista==: na maioria dos pacientes com diagnóstico bem conduzido, controle anti-inflamatório mantido, boa técnica inalatória e redução de irritantes ambientais, o prognóstico é ==favorável para boa qualidade de vida== — sabendo que a doença é controlável, porém crônica e sem cura definitiva {{ref:ref-wsu-asthma-2026}}. Não há estimativa populacional única robusta para mortalidade global em 5 anos, pois a evolução ambulatorial difere muito das crises graves admitidas em terapia intensiva.',
  },

  relatedConsensusSlugs: ['sindrome-atopica-felina'],
  relatedDiseaseSlugs: [
    'bronquite-cronica-caes-gatos',
    'sindrome-cutanea-atopica-felina',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'quilotorax',
    'piotorax',
  ],
  relatedMedicationSlugs: [
    'propionato-de-fluticasona',
    'prednisolona',
    'salbutamol',
    'dexametasona',
    'budesonida',
    'fluticasona-salmeterol',
    'ciclosporina',
    'ciproeptadina',
  ],

  references: [
    {
      id: 'ref-gareis-schulz-2026',
      authors: 'Gareis H, Schulz B',
      title: 'Feline Asthma—Update on Diagnosis and Treatment Recommendations',
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      year: 2026,
      volume: '56(4)',
      pages: '971–993',
      doi: '10.1016/j.cvsm.2026.03.009',
      url: 'https://doi.org/10.1016/j.cvsm.2026.03.009',
      sourceType: 'Revisão especializada',
    },
    {
      id: 'ref-barchilon-reinero-2023',
      authors: 'Barchilon M, Reinero CR',
      title: 'Breathe easy: inhalational therapy for feline inflammatory airway disease',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2023,
      volume: '25(9)',
      doi: '10.1177/1098612X231193054',
      url: 'https://doi.org/10.1177/1098612X231193054',
      sourceType: 'Revisão especializada',
    },
    {
      id: 'ref-santoro-2021',
      authors: 'Santoro D, Pucheu-Haston CM, Prost C, Mueller RS, Jackson H',
      title: 'Clinical signs and diagnosis of feline atopic syndrome: detailed guidelines for a correct diagnosis',
      journal: 'Veterinary Dermatology',
      year: 2021,
      volume: '32(1)',
      pages: '26–e6',
      doi: '10.1111/vde.12935',
      url: 'https://doi.org/10.1111/vde.12935',
      sourceType: 'Diretriz ICADA',
    },
    {
      id: 'ref-trzil-2020',
      authors: 'Trzil JE',
      title: 'Feline asthma: diagnostic and treatment update',
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      year: 2020,
      volume: '50(2)',
      pages: '375–391',
      doi: '10.1016/j.cvsm.2019.10.002',
      url: 'https://doi.org/10.1016/j.cvsm.2019.10.002',
      sourceType: 'Revisão especializada',
    },
    {
      id: 'ref-grotheer-2020',
      authors: 'Grotheer M, Hirschberger J, Hartmann K, Castelletti N, Schulz B',
      title: 'Comparison of signalment, clinical, laboratory and radiographic parameters in cats with feline asthma and chronic bronchitis',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2020,
      doi: '10.1177/1098612X19872428',
      url: 'https://doi.org/10.1177/1098612X19872428',
      sourceType: 'Estudo clínico retrospectivo (n = 97)',
    },
    {
      id: 'ref-lee-2020',
      authors: 'Lee EA, Johnson LR, Johnson EG, Vernau W',
      title: 'Clinical features and radiographic findings in cats with eosinophilic, neutrophilic, and mixed airway inflammation (2011–2018)',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2020,
      volume: '34(3)',
      pages: '1291–1299',
      doi: '10.1111/jvim.15772',
      url: 'https://doi.org/10.1111/jvim.15772',
      sourceType: 'Estudo clínico retrospectivo (n = 49)',
    },
    {
      id: 'ref-verschoor-2021',
      authors: 'Verschoor-Kirss M, Rozanski E, Sharp CR, Oura TJ, Shaw SP',
      title: 'Treatment of naturally occurring asthma with inhaled fluticasone or oral prednisolone: A randomized pilot trial',
      journal: 'Canadian Journal of Veterinary Research',
      year: 2021,
      volume: '85(1)',
      pages: '61–67',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7747657/',
      sourceType: 'Ensaio clínico piloto randomizado (n = 9)',
    },
    {
      id: 'ref-gareis-2023',
      authors: 'Gareis H, Hörner-Schmid L, Zablotski Y, Palić J, Schulz B',
      title: 'Correlation of clinical and radiographic variables in cats with lower airway disease',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2023,
      volume: '37(6)',
      pages: '2443–2452',
      doi: '10.1111/jvim.16874',
      url: 'https://doi.org/10.1111/jvim.16874',
      sourceType: 'Estudo clínico prospectivo (n = 24)',
    },
    {
      id: 'ref-werner-2023',
      authors: 'Werner M, Weeger J, Hörner-Schmid L, Weber K, Palić J, Shih J, Suchodolski JS, Pilla R, Schulz B',
      title: 'Comparison of the respiratory bacterial microbiome in cats with feline asthma and chronic bronchitis',
      journal: 'Frontiers in Veterinary Science',
      year: 2023,
      volume: '10',
      pages: '1148849',
      doi: '10.3389/fvets.2023.1148849',
      url: 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2023.1148849/full',
      sourceType: 'Estudo observacional (CC BY 4.0 · fonte da Fig. 1)',
    },
    {
      id: 'ref-fagundes-moreira-2023',
      authors: 'Fagundes-Moreira R, et al.',
      title: 'Comparative analysis of diagnostic methods and risk factors for Aelurostrongylus abstrusus infection in Brazilian cats',
      journal: 'Journal of Helminthology',
      year: 2023,
      volume: '97',
      pages: 'e91',
      doi: '10.1017/S0022149X23000755',
      url: 'https://doi.org/10.1017/S0022149X23000755',
      sourceType: 'Estudo prospectivo brasileiro (n = 43)',
    },
    {
      id: 'ref-wetzels-2025',
      authors: 'Wetzels B, et al.',
      title: 'Computed Tomographic Evidence for United Airway Disease in Cats: Concurrent Middle Ear, Upper and Lower Airway Disease',
      journal: 'Veterinary Radiology & Ultrasound',
      year: 2025,
      volume: '66',
      pages: 'e70032',
      doi: '10.1111/vru.70032',
      url: 'https://doi.org/10.1111/vru.70032',
      sourceType: 'Estudo tomográfico retrospectivo (n = 549)',
    },
    {
      id: 'ref-galler-2013',
      authors: 'Galler AI, Shibly S, Bilek A, Hirt RA',
      title: 'Inhaled budesonide therapy in cats with naturally occurring chronic bronchial disease (feline asthma and chronic bronchitis)',
      journal: 'Journal of Small Animal Practice',
      year: 2013,
      doi: '10.1111/jsap.12133',
      url: 'https://doi.org/10.1111/jsap.12133',
      sourceType: 'Estudo clínico (n = 43 / 19 reavaliados)',
    },
    {
      id: 'ref-cocayne-2011',
      authors: 'Cocayne CG, Reinero CR, DeClue AE',
      title: 'Subclinical airway inflammation despite high-dose oral corticosteroid therapy in cats with lower airway disease',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2011,
      volume: '13(8)',
      pages: '558–563',
      sourceType: 'Estudo clínico',
    },
    {
      id: 'ref-cornell-asthma',
      authors: 'Cornell Feline Health Center',
      title: 'Feline Asthma: A Risky Business for Many Cats',
      journal: 'Cornell University College of Veterinary Medicine',
      year: 2024,
      url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-asthma-risky-business-many-cats',
      sourceType: 'Fonte institucional',
    },
    {
      id: 'ref-wsu-asthma-2026',
      authors: 'Washington State University Veterinary Teaching Hospital',
      title: 'Feline asthma',
      journal: 'WSU College of Veterinary Medicine',
      year: 2026,
      url: 'https://hospital.vetmed.wsu.edu/2026/10/28/feline-asthma/',
      sourceType: 'Fonte institucional',
    },
    {
      id: 'ref-msd-asma-felina',
      authors: 'Manual MSD Veterinário',
      title: 'Asma brônquica felina',
      journal: 'MSD Veterinary Manual',
      year: 2025,
      url: 'https://www.msdvetmanual.com/pt/respiratory-system/doen%C3%A7as-respirat%C3%B3rias-em-animais-de-pequeno-porte/asma-br%C3%B4nquica-felina',
      sourceType: 'Referência clínica institucional',
    },
    {
      id: 'ref-san-pancrazio-rx',
      authors: 'Veterinaria San Pancrazio',
      title: 'Asma felina: cosa c’è da sapere — Radiografia torácica lateral',
      year: 2021,
      url: 'https://veterinariasanpancrazio.it/asma-felina-cosa-ce-da-sapere/',
      sourceType: 'Referência externa visual (radiografia)',
    },
    {
      id: 'ref-vetrad-tc',
      authors: 'VetRad',
      title: 'Tree in bud (knospender Baum) — Padrão bronquiolar em tomografia felina',
      url: 'https://vetrad.de/portfolio/tree-in-bud-knospender-baum/',
      sourceType: 'Referência externa visual (TC)',
    },
    {
      id: 'ref-nerdy-vet-inhaler',
      authors: 'Nerdy Vet Nurse',
      title: 'Common Treatments for Feline Asthma — Demonstração de técnica com espaçador e máscara',
      url: 'https://www.nerdyvetnurse.com/therapeutic/-common-treatments-for-feline-asthma-',
      sourceType: 'Referência externa visual (técnica inalatória)',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 21 (Disorders of the Trachea and Bronchi)',
      journal: 'Elsevier',
      year: 2020,
      pages: 'pp. 328–332',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-drobatz-feline-ecc-2ed',
      authors: 'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (In: Johnson LR, King LG)',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition) — Cap. 12 (Lower Airway Disease)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 119–129',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Monografias de Fluticasona e Terbutalina",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 552–554, 1213–1215',
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-bsava-formulary-10ed',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition) — Fluticasona',
      journal: 'BSAVA',
      year: 2020,
      pages: 'p. 174',
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-bsava-procedures-3ed',
      authors: 'Bexfield N, Riggs J (eds.)',
      title: 'BSAVA Guide to Procedures in Small Animal Practice (3rd Edition) — Bronchoalveolar Lavage',
      journal: 'BSAVA',
      year: 2024,
      pages: 'pp. 107–108',
      sourceType: 'Livro-texto de procedimentos (acervo local)',
    },
    {
      id: 'ref-macintire-ecc-2ed',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Cap. 9 (Respiratory Emergencies)',
      journal: 'Wiley-Blackwell',
      year: 2012,
      pages: 'pp. 139–191',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-dibartola-4ed',
      authors: 'DiBartola SP',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Edition) — Respiratory Acid-Base Disorders',
      journal: 'Elsevier Saunders',
      year: 2012,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-hackett-procedures-3ed',
      authors: 'Hackett TB, Mazzaferro EM',
      title: 'Veterinary Emergency and Critical Care Procedures (3rd Edition) — Cap. 3 (Oxygen Supplementation and Respiratory Sampling)',
      journal: 'Wiley-Blackwell',
      year: 2025,
      pages: 'pp. 121–137',
      sourceType: 'Livro-texto de procedimentos (acervo local)',
    },
  ],
};
