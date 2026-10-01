import { DiseaseRecord } from '../../types/disease';

export const megaesofagoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-megaesofago-caes-gatos',
  slug: 'megaesofago-caes-gatos',
  title: 'Megaesôfago em Cães e Gatos',
  subtitle:
    'Falha de Transporte Esofágico, Diagnóstico Etiológico, Posicionamento Vertical e Manejo de Complicações',
  synonyms: [
    'Megaesôfago canino',
    'Megaesôfago felino',
    'Ectasia esofágica',
    'Dismotilidade esofágica generalizada',
    'Megaesophagus in dogs and cats',
    'Acalásia esofágica canina',
    'Dilatação esofágica adquirida',
    'Canine megaesophagus',
    'Feline megaesophagus',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: [
    'gastroenterologia',
    'neurologia',
    'pneumologia',
    'nutricao',
    'emergencia',
    'clinica-medica',
  ],
  tags: [
    'Megaesôfago',
    'Cadeira de Bailey',
    'Pneumonia Aspirativa',
    'Miastenia Gravis',
    'AChR-Ab',
    'Sildenafil',
    'LES-AS',
    'MCHR2',
    'Pastor Alemão',
    'Disautonomia Felina',
    'Fluoroscopia VFSS',
    'Gastrostomia',
    'Pró-cinéticos',
    'Nelson & Couto',
    'BSAVA Gastroenterology',
  ],
  isPublished: true,

  quickSummary:
    'Conceito fundamental e falha de transporte:\n' +
    '- Mecanismo fisiopatológico primário:\n' +
    '  - Síndrome caracterizada por hipomotilidade ou atonia do corpo esofágico associada à dilatação luminal difusa.\n' +
    '  - Provoca retenção de alimentos, líquidos e saliva com consequente falha no transporte anterógrado até o estômago.\n' +
    '- Achado definidor e complicação mais letal:\n' +
    '  - Regurgitação passiva: expulsão retrógrada sem contração abdominal ativa ou náusea prévia.\n' +
    '  - Pneumonia aspirativa: principal determinante de óbito, diagnosticada em até 38% dos pacientes já na admissão radiográfica (McBrearty et al., 2011).\n' +
    '- Anatomia comparada e farmacologia:\n' +
    '  - Cão: esôfago 100% estriado sob inervação vagal somática; pró-cinéticos comuns (metoclopramida, cisaprida) falham e aumentam a resistência no esfíncter esofágico inferior (LES).\n' +
    '  - Gato: dois terços proximais estriados e terço distal (~30-40%) de músculo liso.\n' +
    '- Investigação etiológica e avanços recentes:\n' +
    '  - Miastenia Gravis adquirida: principal causa secundária no cão adulto (~28%), frequentemente sob forma focal sem tetraparesia.\n' +
    '  - Genética no Pastor Alemão: variante no gene MCHR2 (Bell et al., 2022); estudos de 2025 comprovaram não ser extrapolável para outras raças (ex: Pastor Branco Suíço).\n' +
    '  - Fenótipo LES-AS (acalásia funcional): relaxamento deficiente do LES na videofluoroscopia (VFSS), responsivo a sildenafila (0,5 a 1 mg/kg VO) ou miotomia de Heller.\n' +
    '- Manejo postural e suporte domiciliar vitalício:\n' +
    '  - Alimentação vertical a 80-90 graus na Cadeira de Bailey e manutenção postural por 10 a 20 minutos pós-refeição com consistência dietética individualizada.',

  quickDecisionStrip: [
    'Megaesôfago é uma síndrome de transporte: investigar sempre a causa de base antes de classificar como idiopático.',
    'No cão, o esôfago é 100% estriado: pró-cinéticos tradicionais não funcionam e podem contrair perigosamente o LES.',
    'Pneumonia aspirativa afeta até 38% no diagnóstico: avaliar o pulmão mesmo em animais sem queixa inicial de tosse.',
    'Alimentar em Cadeira de Bailey verdadeira: colocar a tigela elevada no chão NÃO substitui o eixo vertical a 90 graus.',
    'Testar Miastenia Gravis (AChR-Ab) em todo adulto: a forma focal cursa com fraqueza apenas esofágica, faríngea e laríngea.',
  ],

  quickSummaryRich: {
    lead:
      'O megaesôfago em cães e gatos é uma falha neuromuscular e mecânica grave do transporte esofágico caracterizada por dilatação atônica e estase intraluminal. O foco do atendimento deve ser a prevenção da pneumonia aspirativa, a busca meticulosa por causas reversíveis e a alimentação vertical verdadeira.',
    leadHighlights: [
      'Pneumonia aspirativa em até 38% dos pacientes já na primeira consulta radiográfica.',
      'Musculatura esofágica canina é 100% estriada: pró-cinéticos são ineficazes e podem agravar a retenção.',
      'Miastenia Gravis adquirida é a principal causa secundária no cão (~28%), mesmo sem tetraparesia.',
      'Posicionamento na Cadeira de Bailey substitui o peristaltismo ausente pela ação física da gravidade.',
    ],
    pillars: [
      {
        title: 'Mecânica do Transporte e Regurgitação Passiva',
        body:
          'Diferente do vômito, a regurgitação é um evento mecânico passivo, desprovido de ondas de náusea prévia, contração muscular abdominal ativa ou bile. O alimento não digerido e a saliva refluem por transbordamento do esôfago dilatado, oferecendo risco contínuo de inundação traqueal e pneumonia química e bacteriana.',
      },
      {
        title: 'Diferenças Anatômicas e Farmacologia Comparada',
        body:
          'O cão possui 100% de musculatura estriada em todo o corpo esofágico, enquanto o gato possui músculo estriado nos dois terços proximais e músculo liso no terço distal. Metoclopramida e cisaprida não estimulam músculo estriado e podem espasmar o esfíncter esofágico inferior (LES), piorando a estase em cães.',
      },
      {
        title: 'Busca Ativa de Causas Secundárias Reversíveis',
        body:
          'O megaesôfago nunca deve ser considerado idiopático sem a realização prévia de sorologia para Miastenia Gravis (AChR-Ab), avaliação de timoma no mediastino cranial, pesquisa de hipoadrenocorticismo (Addison), laringoscopia e exclusão de anéis vasculares congênitos (PRAA) ou corpos estranhos obstrutivos.',
      },
      {
        title: 'Posicionamento Vertical e Individualização Dietética',
        body:
          'A Cadeira de Bailey posiciona a coluna perpendicular ao solo (90°), permitindo que a gravidade drene o bolo alimentar até o estômago. O tempo na vertical (10 a 20 minutos) e a consistência da dieta (líquido, papinha ou almôndegas sólidas) devem ser individualizados, preferencialmente por videofluoroscopia (VFSS).',
      },
    ],

    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial do Megaesôfago em Cães e Gatos',
      steps: [
        {
          label: 'Passo 1 — Diferenciação Clínica entre Regurgitação e Vômito',
          detail:
            'Caracterizar o evento com o tutor. A regurgitação ocorre sem náusea, sialorreia prodrômica ou prensa abdominal ativa, eliminando muco, alimento não digerido de pH neutro e saliva. Em caso de dúvida, solicitar filmagem do episódio doméstico.',
          timing: 'Atendimento inicial (minutos 0 a 15)',
          limitations: 'Animais que deglutem novamente o conteúdo regurgitado podem mascarar o sinal, apresentando-se apenas com tosse ou pneumonia.',
        },
        {
          label: 'Passo 2 — Estudo Radiográfico Cervical e Torácico (3 Projeções)',
          detail:
            'Realizar radiografias cervicais e torácicas completas (laterais direita e esquerda e ventrodorsal). Identificar colunas de gás, ar, líquido ou alimento no esôfago, ventralização da traqueia e investigar ativamente focos cranioventrais de pneumonia aspirativa.',
          timing: 'Primeiras 2 horas',
          limitations: 'Aerofagia por dispneia ou ansiedade pode simular dilatação; esôfago temporariamente vazio pode não ser visível.',
        },
        {
          label: 'Passo 3 — Triagem de Miastenia Gravis (AChR-Ab) e Perfil Laboratorial',
          detail:
            'Colher sangue para dosagem de anticorpos contra receptor de acetilcolina (AChR-Ab), hemograma completo, bioquímica sérica, eletrólitos (relação Na:K para Addison) e urinálise. Avaliar silhueta mediastinal cranial no raio-X para afastar timoma.',
          timing: 'Dia 1 a 3',
          limitations: 'Formas focais de Miastenia Gravis podem cursar com títulos sorológicos limítrofes ou negativos no início da doença.',
        },
        {
          label: 'Passo 4 — Avaliação Funcional por Videofluoroscopia (VFSS)',
          detail:
            'Submeter o paciente estável ao estudo dinâmico da deglutição com contraste baritado em diferentes consistências (líquido ralo, pasta/slurry e almôndegas sólidas). Avaliar motilidade faríngea, relaxamento do LES e identificar síndrome tipo acalásia (LES-AS).',
          timing: 'Semana 1 a 2 (após controle da pneumonia)',
          limitations: 'Risco de broncoaspiração de bário; exige cooperação do paciente e equipamento de radioscopia dinâmica.',
        },
        {
          label: 'Passo 5 — Investigação Específica Felina e Estrutural Avançada',
          detail:
            'Em felinos, pesquisar disautonomia (Key-Gaskell), pólipos nasofaríngeos, massas laríngeas (laringomucocele) e hérnia de hiato. Em cães jovens com dilatação cranial à base cardíaca, indicar TC para confirmação de anel vascular congênito (PRAA).',
          timing: 'Semana 2 a 4',
          limitations: 'Exames avançados podem exigir sedação ou anestesia geral, momentos de risco extremo de aspiração no megaesôfago.',
        },
      ],
    },

    treatmentFlow: {
      title: 'Fluxograma de Manejo Terapêutico e Nutricional Multimodal',
      steps: [
        {
          label: 'Passo 1 — Estabilização Imediata e Manejo de Pneumonia Aspirativa',
          detail:
            'Se houver febre, taquipneia ou infiltrado alveolar pulmonar, iniciar oxigenioterapia, antibioticoterapia parenteral de amplo espectro (ex: Ampicilina-Sulbactam associada a Enrofloxacina ou Amicacina), nebulização com soro fisiológico e coupage suave.',
          dose: 'Ampicilina-Sulbactam 30 mg/kg IV q8h; Enrofloxacina 5-10 mg/kg IV q24h (respeitar limite de 5 mg/kg em gatos)',
          duration: '10 a 21 dias conforme melhora clínica e resolução radiográfica',
          reassess: 'A cada 12 a 24 horas no internamento; raio-X torácico de controle em 7 a 10 dias',
          limitations: 'Evitar antibióticos preventivos em pacientes sem evidência clínica ou radiográfica de pneumonia.',
        },
        {
          label: 'Passo 2 — Instituição da Alimentação em Cadeira de Bailey',
          detail:
            'Posicionar o paciente na vertical a 80-90 graus durante toda a ingestão de alimento e água. Manter o animal ereto na cadeira por 10 a 20 minutos após a última ingestão para garantir o esvaziamento esofágico pela força gravitacional.',
          duration: 'Manejo domiciliar contínuo e vitalício',
          reassess: 'Ajustar o tempo de permanência vertical conforme episódios residuais de regurgitação',
          limitations: 'Exige adaptação e treinamento positivo do animal e comprometimento rigoroso da família tutora.',
        },
        {
          label: 'Passo 3 — Teste e Individualização da Consistência Alimentar',
          detail:
            'Testar sistematicamente consistências: papinha homogênea (slurry), alimento úmido em almôndegas firmes (meatballs) ou pedaços secos engolidos inteiros. Conforme Haines et al. (2022), a resposta é estritamente individual e não existe consistência universal.',
          duration: 'Avaliação durante 3 a 5 dias para cada consistência',
          reassess: 'Semanalmente pelo número de episódios de regurgitação e ganho de peso',
          limitations: 'A consistência que funciona para um paciente pode provocar retenção imediata em outro.',
        },
        {
          label: 'Passo 4 — Protocolo Farmacológico com Sildenafila na Suspeita de LES-AS',
          detail:
            'Em animais com evidência fluoroscópica de hiper-resistência ou acalásia funcional do LES (LES-AS), prescrever sildenafila líquida para relaxamento do músculo liso do esfíncter por aumento de GMPc.',
          dose: '0,5 a 1,0 mg/kg VO a cada 12h, administrada 15 a 30 minutos antes da refeição vertical',
          duration: 'Teste terapêutico por 14 a 21 dias',
          reassess: 'Avaliar esvaziamento esofágico e redução da frequência de regurgitações',
          limitations: 'Estudos controlados em megaesôfago generalizado idiopático estável demonstraram benefício clínico limitado (Mehain et al., 2022).',
        },
        {
          label: 'Passo 5 — Gastrostomia (G-Tube) em Pacientes Críticos ou Refratários',
          detail:
            'Indicar colocação cirúrgica ou endoscópica de sonda de gastrostomia (PEG ou cirúrgica) em pacientes com desnutrição severa progressiva ou incapacidade de deglutição segura. Permite nutrição e hidratação sem passar pelo esôfago.',
          duration: 'Temporária (semanas a meses) ou permanente conforme a etiologia',
          reassess: 'Manutenção do estoma a cada 48 a 72h e peso semanal',
          limitations: 'A gastrostomia contorna o trânsito do alimento, mas NÃO impede a aspiração de saliva acumulada no esôfago nem o refluxo.',
        },
      ],
    },
  },

  plainLanguage: {
    whatIsIt:
      'O megaesôfago é uma condição na qual o esôfago — o tubo muscular que transporta a comida e a água da boca até o estômago — perde sua capacidade de contração (fica "flácido" ou "paralisado") e se dilata como uma bexiga frouxa. Com isso, os alimentos, líquidos e até a própria saliva que o animal engole não conseguem descer naturalmente e ficam parados acumulados dentro do esôfago. Pouco tempo depois de comer ou beber (ou mesmo horas depois), esse material retorna de forma passiva pela boca, sem esforço na barriga nem enjoo — um fenômeno chamado de regurgitação. O perigo mais grave dessa condição é que pedaços de comida, água ou saliva acumulados podem escapar para a traqueia e descer até os pulmões, provocando uma infecção grave e potencialmente fatal conhecida como pneumonia aspirativa. O megaesôfago não é uma doença única, mas sim um sinal de que algo interrompeu o funcionamento dos nervos ou músculos do esôfago. Embora existam filhotes que nascem com essa alteração (forma congênita, comum em Pastores Alemães), em cães adultos ela quase sempre tem uma causa por trás, como a Miastenia Gravis (uma doença autoimune tratável), inflamações intensas, intoxicações ou alterações hormonais. Com paciência, cadeira especial de alimentação (Cadeira de Bailey), consistência correta do alimento e vigilância contra pneumonias, muitos cães e gatos conseguem viver com excelente qualidade de vida e carinho por muitos anos.',
    keyPoints: [
      'Regurgitação não é vômito: no vômito o animal faz força com a barriga, tem náusea, saliva e passa mal antes; na regurgitação o alimento ou a água saem da boca de repente, de forma passiva, sem que o animal faça esforço abdominal.',
      'A pneumonia por aspiração é o maior perigo: quando o esôfago fica cheio de comida parada, o líquido pode escorrer para os pulmões. Tosse seca, respiração ofegante, cansaço fácil e febre são sinais de emergência que exigem atendimento veterinário imediato.',
      'Alimentação obrigatoriamente na vertical (Cadeira de Bailey): não adianta apenas colocar o pote no chão em cima de uma caixa ou tijolo. O peito e a coluna do animal precisam ficar em pé (a 90 graus do chão) como se ele estivesse sentado em uma cadeira humana, para que a gravidade empurre o alimento direto ao estômago.',
      'Permanecer em pé após a refeição: após terminar de comer, o paciente deve ficar na posição vertical por pelo menos 10 a 20 minutos para dar tempo de todo o conteúdo esvaziar para o estômago antes de ele voltar a deitar.',
      'Não existe uma textura de comida que sirva para todos: alguns animais engolem melhor almôndegas de ração úmida que escorregam inteiras, outros precisam de papinha líquida (slurry) e outros preferem ração pastosa. O veterinário ajuda a testar qual textura funciona melhor para o seu animal.',
      'Cuidado redobrado com a água: a água pura e líquida é frequentemente o elemento mais perigoso para engasgos. Pode ser necessário oferecer água gelificada, caldos espessados ou permitir que ele beba apenas dentro da cadeira vertical.',
      'Investigar sempre a causa no animal adulto: o megaesôfago pode ser o primeiro sinal de Miastenia Gravis ou doenças hormonais que possuem tratamento com remédios específicos capazes de devolver a força ao esôfago.',
      'Sonda no estômago ajuda na nutrição, mas não impede tudo: uma sonda de gastrostomia permite alimentar animais muito debilitados, mas a saliva acumulada no esôfago ainda pode causar aspiração se os cuidados posturais forem esquecidos.',
    ],
    whatIs:
      'O megaesôfago é uma dilatação flácida do esôfago provocada pela perda das contrações que empurram o alimento, gerando regurgitação passiva, risco de desnutrição e perigo de pneumonia aspirativa nos pulmões.',
    warningSigns:
      'Regurgitação frequente de comida ou água não digerida logo após comer ou ao abaixar a cabeça, tosse constante, cansaço desproporcional ao passear, respiração acelerada ou com barulho de catarro no peito, perda de peso rápida, baba espessa acumulada na boca e febre.',
    diagnosis:
      'O diagnóstico inicial é feito com radiografias do tórax e do pescoço, mostrando o esôfago largo e cheio de ar ou alimento. A causa deve ser investigada com exame de sangue para Miastenia Gravis (teste de anticorpos AChR-Ab), eletrólitos, função hormonal e, quando disponível, videofluoroscopia (um raio-x em vídeo da deglutição).',
    homeCare:
      'Alimentar o pet rigorosamente em pé na Cadeira de Bailey ou no colo em posição ereta, mantendo-o nessa postura por 15 a 20 minutos após a última mordida. Fracionar a alimentação em 3 a 5 pequenas porções ao dia. Nunca deixar potes de água livres no chão se o animal costuma engasgar; hidratar somente na posição vertical. Manter vigilância diária na respiração e temperatura, e nunca deitar o animal logo após comer ou tomar remédios.',
  },

  figures: [
    {
      id: 'fig-megaesofago-1',
      title: 'Anatomia Comparada e Farmacologia do Esôfago: Cão versus Gato',
      legend:
        'Representação esquemática da túnica muscular esofágica:\n' +
        '- Arquitetura canina:\n' +
        '  - Musculatura 100% estriada ao longo de toda a extensão visceral sob controle somático vagal; ineficácia dos pró-cinéticos tradicionais de músculo liso (metoclopramida e cisaprida).\n' +
        '- Arquitetura felina:\n' +
        '  - Dois terços proximais estriados e terço distal de músculo liso; plausibilidade teórica para fármacos serotoninérgicos no segmento distal, porém com risco de espasmo do LES.',
      url: '/consulta-vet/megaesofago-caes-gatos/fisiopatologia-esofago-cao-vs-gato-musculatura-les.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-megaesofago-2',
      title: 'Biomecânica da Cadeira de Bailey e Posicionamento Postural a 90°',
      legend:
        'Comparação biomecânica da alimentação postural:\n' +
        '- Método inadequado ("tigela elevada no chão"):\n' +
        '  - A coluna e o tórax permanecem horizontais, permitindo estase esofágica maciça e refluxo passivo para a laringe.\n' +
        '- Cadeira de Bailey (posição vertical a 90°):\n' +
        '  - Alinha o eixo esofágico à gravidade, facilitando a abertura hidrostática do esfíncter esofágico inferior e prevenindo pneumonia aspirativa.',
      url: '/consulta-vet/megaesofago-caes-gatos/posicionamento-cadeira-bailey-gravidade-esvaziamento.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-megaesofago-3',
      title: 'Algoritmo Diagnóstico Etiológico e Investigação por Videofluoroscopia',
      legend:
        'Fluxograma sequencial para investigação de megaesôfago em cães e gatos:\n' +
        '- Diagnóstico diferencial primário:\n' +
        '  - Diferenciação mandatória entre regurgitação passiva e vômito ativo.\n' +
        '- Triagem radiográfica e rastreio etiológico:\n' +
        '  - Dilatação generalizada versus segmentar cranial (sugestiva de anel vascular PRAA).\n' +
        '  - Investigação de anticorpos anti-AChR para Miastenia Gravis focal, eletrólitos para Addison, disautonomia felina e estudo dinâmico da deglutição por videofluoroscopia (VFSS).',
      url: '/consulta-vet/megaesofago-caes-gatos/algoritmo-diagnostico-etiologico-megaesofago-vfss.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-megaesofago-4',
      title: 'Manejo Terapêutico Multimodal, Sildenafila e Qualidade de Vida',
      legend:
        'Quatro pilares integrados de manejo multimodal:\n' +
        '- 1. Sildenafila no relaxamento do músculo liso do LES na síndrome tipo acalásia LES-AS.\n' +
        '- 2. Papel e limites da sonda de gastrostomia (G-tube), que assegura nutrição enteral mas não previne a aspiração de saliva.\n' +
        '- 3. Tratamento ativo e precoce da pneumonia aspirativa na UTI.\n' +
        '- 4. Sustentabilidade do plano e acolhimento da sobrecarga do tutor conforme evidências de qualidade de vida (Sinha et al., JAVMA 2026).',
      url: '/consulta-vet/megaesofago-caes-gatos/manejo-multimodal-sildenafil-nutricao-g-tube.jpg',
      aspectRatio: '3:2',
    },
  ],

  etiology: {
    classificacaoEtiologicaGeral:
      'Classificação etiológica geral do megaesôfago:\n' +
      '- Síndrome clínica e radiográfica heterogênea:\n' +
      '  - O megaesôfago não é um diagnóstico patológico definitivo, mas uma síndrome resultante de diversas causas que comprometem a função neuromuscular, integridade anatômica ou abertura do esfíncter.\n' +
      '- Quatro grandes categorias etiológicas:\n' +
      '  - 1. Congênito idiopático: manifestação precoce ao desmame em raças predispostas.\n' +
      '  - 2. Adquirido idiopático: forma mais prevalente em adultos e idosos sem causa identificável.\n' +
      '  - 3. Secundário neuromuscular e sistêmico: miastenia gravis, neuropatias, endocrinopatias e intoxicações.\n' +
      '  - 4. Secundário estrutural ou obstrutivo: anéis vasculares (PRAA), estenoses, corpos estranhos e neoplasias.',

    formaCongenitaIdiopatica:
      'Megaesôfago congênito idiopático:\n' +
      '- Período de manifestação clínica típica:\n' +
      '  - Surge ao desmame (entre 4 e 10 semanas de vida), na transição da dieta líquida materna para alimentos sólidos ou pastosos.\n' +
      '- Mecanismo patogênico subjacente:\n' +
      '  - Imaturidade ou defeito no desenvolvimento das vias aferentes e eferentes vagais e dos plexos mioentéricos esofágicos.\n' +
      '- Raças caninas com predisposição descrita:\n' +
      '  - Pastor Alemão, Dogue Alemão, Labrador Retriever, Golden Retriever, Setter Irlandês, Fox Terrier de Pelo Duro, Schnauzer Miniatura, Shar Pei, Dálmata e Dachshund.',

    geneticaMCHR2PastorAlemao:
      'Genética molecular do Pastor Alemão — Locus MCHR2 (Bell et al., 2022):\n' +
      '- Descoberta seminal no cromossomo 12:\n' +
      '  - Associação com repetições em tandem (VNTR) de 33 pares de bases na região intrônica do gene MCHR2 (melanin-concentrating hormone receptor 2).\n' +
      '- Efeito fisiopatológico do MCH:\n' +
      '  - O receptor MCHR2 atua no controle neuroendócrino da motilidade e apetite; a mutação afeta a coordenação motora esofágica.\n' +
      '- Predisposição sexual e acurácia preditiva:\n' +
      '  - Machos homozigotos apresentam o dobro do risco de fêmeas, sugerindo modulação estrogênica protetora no relaxamento do esfíncter esofágico inferior (LES).\n' +
      '  - A combinação genótipo + sexo predisse o fenótipo com mais de 75% de acurácia na coorte estudada.',

    naoExtrapolarMCHR2OutrasRacas:
      'Limitação de aplicabilidade — Não extrapolação do MCHR2 (Hytönen et al., 2025):\n' +
      '- ALERTA GENÉTICO IMPORTANTE:\n' +
      '  - O teste molecular para a mutação MCHR2 validado no Pastor Alemão NÃO possui valor informativo quando aplicado a outras raças morfologicamente aparentadas, como o Pastor Branco Suíço (Berger Blanc Suisse).\n' +
      '- Impacto na seleção reprodutiva:\n' +
      '  - Descartar reprodutores de outras raças baseado nesse teste não reduz a incidência da doença e reduz indevidamente a diversidade genética da raça.\n' +
      '  - Testes moleculares devem ser utilizados estritamente nas raças para as quais foram cientificamente validados.',

    genomicaDogueAlemao:
      'Genômica do megaesôfago congênito no Dogue Alemão (Friedenberg et al., 2023):\n' +
      '- Mapeamento genômico amplo (GWAS):\n' +
      '  - Identificou associação do megaesôfago congênito a um locus no cromossomo 1, completamente distinto do Pastor Alemão.\n' +
      '- Arquitetura genética complexa:\n' +
      '  - A ausência de variantes codificantes simples aponta para modulação por regiões regulatórias não codificantes.\n' +
      '- Conclusão biológica:\n' +
      '  - O megaesôfago congênito canino apresenta heterogeneidade genética expressiva, com bases moleculares divergentes entre diferentes raças puras.',

    congenitoFelino:
      'Megaesôfago congênito na espécie felina:\n' +
      '- Ocorrência epidemiológica:\n' +
      '  - Entidade de incidência extremamente rara na rotina médica veterinária.\n' +
      '- Raças envolvidas e herança:\n' +
      '  - A raça Siamês e seus cruzamentos concentram os relatos descritos, sugerindo provável componente hereditário autossômico na maturação neuromuscular esofágica.\n' +
      '- Status genético atual:\n' +
      '  - Nenhuma mutação causal pontual foi mapeada ou identificada na espécie felina até o momento.',

    adquiridoIdiopatico:
      'Megaesôfago adquirido idiopático em cães:\n' +
      '- Perfil epidemiológico clássico:\n' +
      '  - Forma mais comum de megaesôfago em cães adultos e idosos (idade mediana de 7 a 9 anos).\n' +
      '- Critério diagnóstico de exclusão:\n' +
      '  - Definido pela ausência de causa identificável após investigação rigorosa (sorologia AChR-Ab negativa, cortisol e eletrólitos normais, sem massas, estenoses ou toxinas).\n' +
      '- Substrato neuropatológico:\n' +
      '  - Neuropatia degenerativa focal idiopática dos axônios vagais ou dos núcleos motores ambíguo e motor dorsal no tronco encefálico.',

    secundarioNeuromuscular:
      'Megaesôfago secundário — Causas neuromusculares e sistêmicas:\n' +
      '- Junção neuromuscular e nervos periféricos:\n' +
      '  - Miastenia Gravis adquirida: principal etiologia secundária no cão (~28% dos casos adquiridos).\n' +
      '  - Polirradiculoneurite aguda (ACP/AIP) e polineuropatias desmielinizantes.\n' +
      '  - Disautonomia felina e canina (síndrome de Key-Gaskell).\n' +
      '  - Toxinas: botulismo (Clostridium botulinum), tétano e paralisia por picada de carrapato.\n' +
      '- Doenças musculares e sistêmicas:\n' +
      '  - Polimiosite imunomediada e dermatomiosite.\n' +
      '  - Distrofias musculares (distrofinopatias).\n' +
      '  - Neuropatia vagal traumática, cirúrgica ou infiltrativa neoplásica.',

    secundarioEstrutural:
      'Megaesôfago secundário — Causas estruturais e obstrutivas:\n' +
      '- Anomalias de anel vascular congênito:\n' +
      '  - Arco Aórtico Direito Persistente (PRAA): aprisiona o esôfago cranial à base cardíaca entre a aorta, tronco pulmonar e ligamento arterioso.\n' +
      '- Obstruções intraluminais e cicatriciais:\n' +
      '  - Estenoses cicatriciais pós-esofagite grave por refluxo gástrico ou pós-anestésica.\n' +
      '  - Corpos estranhos esofágicos crônicos.\n' +
      '- Neoplasias e compressões extrínsecas:\n' +
      '  - Neoplasias esofágicas parietais (carcinomas, leiomiossarcomas, granulomas por Spirocerca lupi).\n' +
      '  - Massas mediastinais compressivas (linfoma, timoma, carcinomas tireóideos ectópicos).\n' +
      '  - Hérnia de hiato esofágico deslizante ou paraesofágica.',

    tabelaClassificacaoEtiologica:
      'Tabela 1 — Classificação etiológica e etiopatogenia do megaesôfago em cães e gatos:\n\n' +
      '| Categoria Etiológica | Exemplos Clínicos Principais | Espécie Predominante | Mecanismo Fisiopatológico Subjacente |\n' +
      '| :--- | :--- | :--- | :--- |\n' +
      '| Congênito Idiopático | Pastor Alemão (MCHR2), Dogue Alemão, Labrador, Siamês | Cães (comum); Gatos (raro) | Falha no desenvolvimento/maturação de aferências ou eferências vagais no corpo esofágico. |\n' +
      '| Adquirido Idiopático | Cães adultos/idosos sem lesão neuromuscular identificada | Cães (muito frequente); Gatos (raro) | Degeneração progressiva idiopática de axônios vagais ou núcleos motores encefálicos. |\n' +
      '| Juncional / Imunomediado | Miastenia Gravis adquirida (AChR-Ab positivo) | Cães (~28% dos adquiridos); Gatos (incomum) | Autoanticorpos bloqueiam receptores nicotínicos de acetilcolina no músculo estriado esofágico. |\n' +
      '| Autonômico Generalizado | Disautonomia (Síndrome de Key-Gaskell) | Gatos (destaque clínico); Cães (raro) | Perda difusa de neurônios ganglionares autonômicos simpáticos e parassimpáticos. |\n' +
      '| Tóxico / Infeccioso | Botulismo, tétano, chumbo, picada de carrapato | Cães e Gatos | Bloqueio pré-sináptico de liberação de neurotransmissores ou desmielinização tóxica periférica. |\n' +
      '| Miopático / Inflamatório | Polimiosite, dermatomiosite, esofagite grave transmural | Cães e Gatos | Inflamação e necrose das fibras musculares estriadas ou lisas e plexos mioentéricos. |\n' +
      '| Estrutural / Anel Vascular | Arco Aórtico Direito Persistente (PRAA), hérnia hiatal | Filhotes cães (Pastor Alemão, Setter); Gatos | Constrição extrínseca focal do esôfago cranial gerando dilatação segmentar por montante. |\n' +
      '| Funcional do Esfíncter | Síndrome tipo acalásia do LES (LES-AS) | Cães jovens e Gatos (relatos recentes) | Falha no relaxamento receptivo do esfíncter esofágico inferior à chegada do bolo alimentar. |',
  },

  epidemiology: {
    prevalenciaCaninaVsFelina:
      'Prevalência comparada entre caninos e felinos:\n' +
      '- Espécie canina:\n' +
      '  - Afecção frequente na rotina médica de cães, figurando entre as principais causas de regurgitação crônica em centros terciários.\n' +
      '- Espécie felina:\n' +
      '  - Enfermidade rara a incomum.\n' +
      '  - REGRA DE OURO no gato: o diagnóstico exige busca exaustiva por causas secundárias mecânicas, cirúrgicas ou disautonômicas, visto que a forma idiopática é exceção nessa espécie.',

    predisposicoesRaciais:
      'Predisposições raciais em cães e gatos:\n' +
      '- Raças caninas de grande porte:\n' +
      '  - Pastor Alemão, Dogue Alemão, Labrador Retriever, Golden Retriever, Setter Irlandês, São Bernardo, Doberman Pinscher e Boxer.\n' +
      '- Raças caninas pequenas com herança descrita:\n' +
      '  - Schnauzer Miniatura, Fox Terrier de Pelo Duro e Dachshund.\n' +
      '- Predisposição na espécie felina:\n' +
      '  - Siamês: destaque na forma congênita.\n' +
      '  - Abissínio e Somali: maior propensão à Miastenia Gravis adquirida.',

    distribuicaoPorIdadeESexo:
      'Distribuição etária bimodal e particularidades sexuais:\n' +
      '- Padrão de distribuição etária em dois picos:\n' +
      '  - 1º Pico precoce (1 a 4 meses de idade): formas congênitas idiopáticas e anéis vasculares detectados ao desmame.\n' +
      '  - 2º Pico tardio (5 a 12 anos de vida): formas adquiridas secundárias e idiopáticas em pacientes adultos/idosos.\n' +
      '- Dimorfismo sexual dependente de raça:\n' +
      '  - Pastor Alemão com variante MCHR2: machos apresentam o dobro do risco de fêmeas.\n' +
      '  - Demais raças e formas adquiridas: distribuição homogênea entre machos e fêmeas sem predileção sexual consolidada.',

    qualidadeDeVidaTutores2026:
      'Sobrecarga do cuidador e qualidade de vida (Sinha et al., JAVMA 2026):\n' +
      '- Impacto psicossocial em 262 tutores avaliados:\n' +
      '  - O desgaste emocional e a sobrecarga contínua superam o impacto puramente financeiro do tratamento.\n' +
      '- Principais demandas e fatores estressores domiciliares:\n' +
      '  - Preocupação diária com desnutrição e perda de escore corporal.\n' +
      '  - Rotina estrita de alimentação vertical na Cadeira de Bailey (3 a 5 refeições fracionadas ao dia).\n' +
      '  - Impossibilidade de fornecer petiscos convencionais no chão e limitações para viagens familiares.\n' +
      '  - Ansiedade constante pelo risco de sufocação súbita ou pneumonia aspirativa letal.',

    tabelaAnatomiaEFarmacologiaComparada:
      'Tabela 2 — Anatomia comparada do esôfago e implicações terapêuticas entre cães e gatos:\n\n' +
      '| Parâmetro Fisiológico / Clínico | Cão (_Canis lupus familiaris_) | Gato (_Felis catus_) |\n' +
      '| :--- | :--- | :--- |\n' +
      '| Composição da Túnica Muscular | 100% Músculo Estriado (Esquelético) do esfíncter cricofaríngeo à cárdia | Dois terços proximais estriados; terço distal (~30-40%) músculo liso |\n' +
      '| Padrão Mucoso Radiográfico | Pregas longitudinais paralelas lisas | Pregas transversais em "espinha de peixe" (herringbone) no terço distal |\n' +
      '| Inervação Motora do Corpo | Fibras eferentes somáticas especiais do Nervo Vago (X) | Somática proximal; parassimpática autonômica no terço distal liso |\n' +
      '| Efeito da Metoclopramida | Sem efeito propulsivo no corpo; pode aumentar o tônus do LES | Sem efeito no corpo proximal; discreto efeito no terço distal liso |\n' +
      '| Efeito da Cisaprida | Ineficaz no corpo estriado; perigo de elevar resistência no LES | Aumenta motilidade no terço distal liso; eleva tônus do LES |\n' +
      '| Efeito da Sildenafila | Relaxa a musculatura lisa do LES (útil no fenótipo LES-AS) | Relaxa a musculatura lisa do LES (dados clínicos ainda limitados) |\n' +
      '| Miastenia Gravis Adquirida | Altamente prevalente (~28% dos megaesôfagos adquiridos) | Menos frequente, mas documentada sob formas focais e generalizadas |\n' +
      '| Disautonomia (Key-Gaskell) | Infrequente | Importante causa de megaesôfago associada a sinais autonômicos difusos |',
  },

  pathogenesisTransmission: {
    mecanicaDegluticaoNormal:
      'Mecânica fisiológica do transporte esofágico:\n' +
      '- Fases sequenciais da deglutição:\n' +
      '  - Fases oral, faríngea e esofágica.\n' +
      '- Peristaltismo primário e secundário:\n' +
      '  - A distensão mecânica pelo bolo alimentar desencadeia onda peristáltica primária (iniciada pela deglutição) e secundária (ativada por mecanorreceptores locais).\n' +
      '- Coordenação vagal:\n' +
      '  - O nervo vago coordena a contração aboral da musculatura e o relaxamento sincronizado e transitório do esfíncter esofágico inferior (LES), propiciando a entrada do alimento no estômago.',

    diferencaMuscularCaoVsGato:
      'Divergência neuromuscular entre cão e gato:\n' +
      '- Arquitetura muscular canina:\n' +
      '  - 100% de musculatura estriada (esquelética) em toda a extensão do órgão, dependente de receptores nicotínicos de acetilcolina na placa motora e inervação eferente somática vagal.\n' +
      '  - Alta suscetibilidade a afecções juncionais (Miastenia Gravis, botulismo).\n' +
      '- Arquitetura muscular felina:\n' +
      '  - Dois terços proximais estriados e terço distal (~30-40%) de músculo liso autônomo, dependente de receptores muscarínicos e plexos mioentéricos.',

    falhaDePropulsaoERetencao:
      'Ciclo vicioso biomecânico da atonia e ectasia esofágica:\n' +
      '- Sequência patogênica da dilatação:\n' +
      '  - 1. Perda da força propulsora por desnervação ou atonia muscular.\n' +
      '  - 2. Retenção mecânica de alimentos, líquidos e secreções salivares.\n' +
      '  - 3. Distensão passiva crônica da parede tubular visceral.\n' +
      '  - 4. Desalinhamento da geometria dos miofilamentos e perda de aposição das pontes de actina-miosina.\n' +
      '  - 5. Queda progressiva da complacência e eficiência contrátil residual.\n' +
      '  - 6. Dilatação atônica irreversível e estase intraluminal permanente.',

    sindromeTipoAcalasiaLESAS:
      'Síndrome tipo acalásia do esfíncter esofágico inferior (LES-AS):\n' +
      '- Defeito funcional na via de saída:\n' +
      '  - Falha no relaxamento receptivo ou hipertonia patológica do esfíncter esofágico inferior (LES) durante a fase esofágica da deglutição.\n' +
      '- Consequência mecânica retrógrada:\n' +
      '  - Barreira espástica na cárdia impede a drenagem do bolo alimentar, gerando dilatação secundária do corpo esofágico por montante, análoga à acalásia humana.\n' +
      '- Relevância terapêutica:\n' +
      '  - Subgrupo passível de resposta favorável a inibidores de PDE-5 (sildenafila) ou miotomia cirúrgica de Heller modificada.',

    armadilhaProcineticos:
      'Armadilha farmacológica dos pró-cinéticos em cães:\n' +
      '- VETO FISIOLÓGICO à metoclopramida e cisaprida no megaesôfago canino:\n' +
      '  - Fármacos como metoclopramida e cisaprida estimulam receptores 5-HT4 e dopaminérgicos D2 exclusivos da musculatura lisa.\n' +
      '- Efeito paradoxal prejudicial:\n' +
      '  - No cão (esôfago 100% estriado), esses fármacos não geram nenhum peristaltismo no corpo esofágico e contraem o músculo liso do LES, fechando a cárdia e agravando a estase alimentar.',
  },

  pathophysiology: {
    fisiopatologiaDaAspiracaoPulmonar:
      'Fisiopatologia da broncoaspiração e lesão pulmonar:\n' +
      '- Reservatório ectásico e volume salivar:\n' +
      '  - O esôfago ectásico atua como reservatório flácido de restos alimentares fermentados, microbiota bacteriana oral e saliva.\n' +
      '  - Cães de porte médio produzem até 1 a 2 litros de saliva por dia, acumulada continuamente no lúmen hipomóvel.\n' +
      '- Mecânica do transbordamento laringofaríngeo:\n' +
      '  - Quando o paciente se deita, dorme ou abaixa a cabeça, o volume estagnado transborda passivamente para a laringofaringe.\n' +
      '  - A falha dos reflexos protetores glóticos (frequente em polineuropatias concomitantes) permite a entrada na traqueia.\n' +
      '- Cascata inflamatória e necrose tecidual:\n' +
      '  - Pneumonite química imediata desencadeada pelo pH ácido gástrico refluído.\n' +
      '  - Pneumonia bacteriana necrosante grave com acometimento preferencial dos lobos cranioventrais.',

    miasteniaGravisMecanismo:
      'Mecanismo imunomediado da Miastenia Gravis na junção neuromuscular:\n' +
      '- Ataque autoimune pós-sináptico:\n' +
      '  - Autoanticorpos séricos de alta afinidade ligam-se aos receptores nicotínicos de acetilcolina (AChR) pós-sinápticos na placa motora do músculo estriado esofágico.\n' +
      '- Destruição da membrana e perda de excitabilidade:\n' +
      '  - Bloqueio estérico da fenda sináptica, ativação lítica do sistema complemento e endocitose acelerada dos receptores.\n' +
      '  - Perda progressiva da despolarização da membrana e ausência de contração peristáltica sincronizada.\n' +
      '- Apresentação focal vs generalizada:\n' +
      '  - Em 15% a 30% dos cães, a Miastenia manifesta-se sob forma focal exclusiva, comprometendo apenas o esôfago, faringe e laringe, sem qualquer fraqueza apendicular evidente.',

    disautonomiaFelinaMecanismo:
      'Degeneração neuroautonômica na síndrome de Key-Gaskell:\n' +
      '- Lesão neuronal ganglionar generalizada:\n' +
      '  - Perda e cromatólise idiopática de corpos neuronais nos gânglios autonômicos simpáticos e parassimpáticos.\n' +
      '- Falência neuromuscular esofágica:\n' +
      '  - Desnervação dos plexos mioentéricos do terço distal (músculo liso) e dos núcleos motores vagais autonômicos, gerando atonia esofágica completa.\n' +
      '- Manifestações clínicas autonômicas associadas:\n' +
      '  - Midríase fixa bilateral arrefléxica e prolapso de terceira pálpebra.\n' +
      '  - Ceratoconjuntivite seca (KCS) e xerostomia (boca seca).\n' +
      '  - Bradicardia paradoxal, atonia vesical com retenção urinária e megacólon grave.',

    obstrucoesViasAereasSuperioresFelinas:
      'Megaesôfago secundário por obstrução de vias aéreas superiores em felinos:\n' +
      '- Mecanismo da pressão intratorácica negativa (efeito de vácuo):\n' +
      '  - Obstruções respiratórias crônicas altas (pólipos nasofaríngeos, estenoses, massas laríngeas ou laringomucoceles) geram esforços inspiratórios vigorosos contra a glote ocluída.\n' +
      '  - Criação de gradiente pressórico intratorácico acentuadamente negativo durante cada ciclo inspiratório.\n' +
      '- Tração parietal e dilatação esofágica:\n' +
      '  - O vácuo intratorácico crônico traciona e ectasia passivamente a parede esofágica elástica, simulando atonia primária grave.\n' +
      '- Potencial de reversibilidade completa (Théron, 2024):\n' +
      '  - A desobstrução cirúrgica imediata da via aérea extingue a pressão negativa anômala, propiciando remissão completa do megaesôfago em poucos dias.',

    desmistificandoHipotireoidismo:
      'Reavaliação crítica da relação entre hipotireoidismo e megaesôfago canino:\n' +
      '- Evidência epidemiológica moderna (Blois et al.):\n' +
      '  - Estudos caso-controle rigorosos com 136 cães refutaram correlação causal direta ou prevalência aumentada entre hipotireoidismo e dilatação esofágica primária.\n' +
      '- Armadilha diagnóstica da Síndrome do Eutireoideo Doente (NTIS):\n' +
      '  - Concentrações séricas de T4 total suprimidas decorrem habitualmente da desnutrição profunda, caquexia ou pneumonia aspirativa bacteriana concomitante.\n' +
      '- ALERTA CLÍNICO DIAGNÓSTICO:\n' +
      '  - Jamais firmar causalidade por hipotireoidismo com base apenas em T4 total reduzido isolado.\n' +
      '  - Exige-se confirmação inequívoca por dosagem de TSH canino elevado associado a T4 livre por diálise de equilíbrio suprimido.',

    hipoadrenocorticismoEletrolitos:
      'Fisiopatologia da atonia esofágica no hipoadrenocorticismo (Doença de Addison):\n' +
      '- Deficiência corticoadrenal e distúrbios eletrolíticos:\n' +
      '  - Depleção de mineralocorticoides (aldosterona) desencadeia perda urinária de sódio e retenção de potássio (hiponatremia, hipercalemia e relação Na:K < 27).\n' +
      '  - Hipovolemia crônica e perfusão tecidual marginal.\n' +
      '- Falha de despolarização da musculatura esofágica:\n' +
      '  - A desregulação do potencial de repouso da membrana miocelular combinada à privação de cortisol abole a resposta contrátil esofágica.\n' +
      '- Reversibilidade clínica rápida:\n' +
      '  - A restauração da volemia e a reposição de mineralocorticoides (desoxicorticosterona pivalato/fludrocortisona) e glicocorticoides reverte a atonia esofágica em dias.',
  },

  clinicalSignsPathophysiology: {
    regurgitacaoVsVomito:
      'Diferenciação semiológica essencial: regurgitação versus vômito:\n' +
      '- Prevalência clínica:\n' +
      '  - Manifestação clínica primária documentada em mais de 90% dos animais acometidos.\n' +
      '- Mecânica retrógrada passiva:\n' +
      '  - Ausência de pródromos autonômicos (náusea, sialorreia prévia de angústia, lambedura insistente de lábios).\n' +
      '  - Ausência de esforço ou contração espasmódica da parede abdominal (retching).\n' +
      '- Características do conteúdo regurgitado:\n' +
      '  - Bolo alimentar intacto, frequentemente cilíndrico ou tubular, recoberto por muco espesso ou saliva espumosa.\n' +
      '  - pH neutro a alcalino (7,0 a 8,0) e ausência rotineira de pigmentos biliares (salvo refluxo duodenogástrico grave prévio).',

    apresentacaoSilenciosaEAtipica:
      'Apresentações atípicas e regurgitação silenciosa oculta:\n' +
      '- Reingestão imediata e episódios noturnos:\n' +
      '  - Pacientes regurgitam volumes discretos que são imediatamente remastigados e deglutidos antes da percepção familiar.\n' +
      '  - Ocorrência predominante em decúbito lateral durante o sono noturno por perda da barreira gravitacional.\n' +
      '- Sinais respiratórios como queixa primária (Nelson & Couto):\n' +
      '  - Microaspirações silenciosas contínuas de saliva fermentada e secreções.\n' +
      '  - Tosse seca ou produtiva crônica, engasgos ao despertar matinal e rinite mucopurulenta retrógrada por refluxo.\n' +
      '  - Síndrome febril insidiosa e apatia decorrentes de pneumonia bacteriana não diagnosticada.',

    sinaisRespiratoriosEPneumonia:
      'Comprometimento respiratório e síndrome broncoaspirativa:\n' +
      '- Prevalência em casos adquiridos:\n' +
      '  - Acometimento respiratório evidente em mais de 50% dos cães e gatos com dilatação esofágica adquirida.\n' +
      '- Achados clínicos e auscultatórios:\n' +
      '  - Tosse úmida e produtiva, taquipneia, respiração superficial com padrão restritivo e estertores crepitantes cranioventrais.\n' +
      '  - Intolerância ao esforço físico, cianose de mucosas em repouso e febre em agulha.\n' +
      '- REGRA DE OURO NO PRONTO-SOCORRO:\n' +
      '  - Todo paciente admitido com febre e taquipneia aguda deve ter o trajeto esofágico minuciosamente inspecionado na radiografia torácica.\n' +
      '  - Evita o erro letal de classificar o caso como pneumonia bacteriana comunitária primária.',

    perdaPonderalECaquexia:
      'Déficit nutricional progressivo e síndrome de emaciação:\n' +
      '- Frequência e etiologia metabólica:\n' +
      '  - Perda ponderal crônica documentada em 27% a 35% dos pacientes.\n' +
      '  - O bolo calórico e hídrico fica retido na ectasia e é expulso antes de alcançar a mucosa gástrica e entérica absortiva.\n' +
      '- Manifestações em animais adultos:\n' +
      '  - Atrofia muscular esquelética generalizada (sarcopenia), proeminência óssea e letargia por déficit energético.\n' +
      '- Manifestações em filhotes (formas congênitas):\n' +
      '  - Disparidade acentuada de peso e porte em relação aos filhotes da mesma ninhada.\n' +
      '  - Retardo no desenvolvimento esquelético e abdome acentuadamente retraído.',

    exameFisicoENeurologico:
      'Roteiro propedêutico no exame físico e neurológico minucioso:\n' +
      '- 1. Palpação cervical profunda e fossa jugular esquerda:\n' +
      '  - Pesquisa de massas compressivas, divertículos, crepitação esofágica ou flacidez tubular no sulco jugular esquerdo.\n' +
      '- 2. Avaliação sistemática de pares cranianos:\n' +
      '  - Teste de sensibilidade e reflexo palpebral (NC V e VII), reflexo de deglutição (NC IX e X), tônus e motilidade lingual (NC XII).\n' +
      '- 3. Exame neuroapendicular e teste de fatigabilidade (Miastenia Gravis):\n' +
      '  - Tônus muscular esquelético, reflexos miotáticos espinhais e indução de marcha breve para avaliar fraqueza progressiva induzida por esforço.\n' +
      '- 4. Particularidades no paciente felino (disautonomia de Key-Gaskell):\n' +
      '  - Avaliação do diâmetro e reflexo pupilar (midríase bilateral fixa arrefléxica).\n' +
      '  - Teste lacrimal de Schirmer (ceratoconjuntivite seca) e inspeção de prolapso de terceira pálpebra.',

    tabelaRegurgitacaoVsVomito:
      'Tabela 3 — Diferenciação clínica minuciosa entre regurgitação passiva e vômito ativo:\n\n' +
      '| Parâmetro Avaliado | Regurgitação Esofágica | Vômito Gástrico / Intestinal |\n' +
      '| :--- | :--- | :--- |\n' +
      '| Mecanismo Motor | Processo puramente PASSIVO por transbordamento | Processo ATIVO coordenado pelo centro do vômito |\n' +
      '| Sinais Pródrômicos (Náusea) | Raros ou ausentes; o animal é surpreendido pela saída | Frequentes: salivação excessiva, sialorreia, lambedura, ansiedade |\n' +
      '| Movimento da Parede Abdominal | Ausente; sem contração ou prensa abdominal | Presente e vigoroso: contrações rítmicas e espasmódicas (retching) |\n' +
      '| Presença de Bile | Rara (ocorre apenas se houver refluxo duodenogástrico prévio) | Frequente (coloração amarelada ou esverdeada característica) |\n' +
      '| Grau de Digestão do Alimento | Alimento não digerido, frequentemente com formato tubular | Alimento parcialmente digerido ou fluido quimificado |\n' +
      '| pH do Material Expelido | Tipicamente neutro a alcalino (pH 7,0 a 8,0) | Tipicamente ácido (pH < 5,0) por ácido clorídrico gástrico |\n' +
      '| Momento da Ocorrência | De segundos a minutos ou horas após comer ou beber | Variável: imediato a horas após a refeição |\n' +
      '| Complicação Prevalente | Risco extremo de PNEUMONIA ASPIRATIVA cranioventral | Desidratação, distúrbios hipoclorêmicos e alcalose metabólica |',
  },

  diagnosis: {
    radiografiaToracicaECervical:
      'Radiografia simples cervical e torácica em três projeções:\n' +
      '- Protocolo obrigatório de projeções:\n' +
      '  - Realização mandante de três projeções radiográficas (lateral direita, lateral esquerda e ventrodorsal ou dorsoventral).\n' +
      '- Sinais radiográficos patognomônicos:\n' +
      '  - Dilatação tubular radiolucente (gás) ou radiopaca (fluido e ingesta retida) em toda a extensão do mediastino cranial e caudal.\n' +
      '  - Linhas opacas dorsais e ventrais delimitando a parede do esôfago ectásico.\n' +
      '  - Deslocamento ventral evidente da traqueia intratorácica ("traqueia caída") e atenuação da silhueta cardíaca.\n' +
      '- Varredura cervical e base cardíaca:\n' +
      '  - Projeções cervicais para excluir divertículos, corpos estranhos esofágicos e dilatações faríngeas.\n' +
      '  - Dilatação focal restrita cranialmente à base cardíaca em filhotes é fortemente indicativa de anel vascular anômalo (PRAA).',

    videofluoroscopiaVFSS:
      'Videofluoroscopia dinâmica da deglutição (VFSS — Videofluoroscopic Swallow Study):\n' +
      '- Padrão-ouro funcional da motilidade esofágica:\n' +
      '  - Avaliação dinâmica em tempo real das fases orofaríngea, faríngea e esofágica da deglutição em cães e gatos.\n' +
      '- Parâmetros biomecânicos avaliados:\n' +
      '  - Formação e propulsão do bolo faríngeo, acalásia ou assincronia do cricofaríngeo.\n' +
      '  - Amplitude e velocidade da onda peristáltica primária e secundária.\n' +
      '  - Refluxo gastroesofágico espontâneo e relaxamento receptivo do esfíncter esofágico inferior (LES).\n' +
      '- Aplicação clínica prática (Haines et al., 2022):\n' +
      '  - Identificação de hiper-resistência ou espasmo na cárdia (síndrome tipo acalásia LES-AS).\n' +
      '  - Testagem e determinação da consistência dietética ideal para cada paciente (líquido vs slurry vs almôndegas sólidas).',

    esofagogramaContrastadoCuidados:
      'Esofagograma contrastado e segurança do uso de sulfato de bário:\n' +
      '- Indicações estritas e limitações:\n' +
      '  - Reservado para cenários onde a radiografia simples for inconclusiva ou houver suspeita fundada de estenose cicatricial, anel vascular (PRAA) ou divertículos.\n' +
      '- ALERTA DE SEGURANÇA CRÍTICO:\n' +
      '  - A administração forçada de sulfato de bário líquido convencional em um órgão atônico apresenta altíssimo risco de broncoaspiração maciça.\n' +
      '- Consequências pulmonares da aspiração por bário:\n' +
      '  - O bário na árvore respiratória desencadeia granulomas pulmonares crônicos irreversíveis e insuficiência respiratória hipoxêmica grave.\n' +
      '- Recomendações técnicas:\n' +
      '  - Caso o exame contrastado seja indispensável, utilizar pequenas quantidades misturadas a alimento ou preferir contraste iodado não iônico de baixa osmolaridade.',

    painelSorologicoAChRAb:
      'Sorologia para anticorpos anti-receptor de acetilcolina (AChR-Ab):\n' +
      '- Metodologia de referência e acurácia:\n' +
      '  - Dosagem sérica por radioimunoensaio (laboratório de referência internacional comparativa, ex: UC San Diego).\n' +
      '  - Sensibilidade de aproximadamente 98% nas formas generalizadas e cerca de 85% nas formas focais esofágicas.\n' +
      '- Critério de confirmação diagnóstica:\n' +
      '  - Título positivo fixado em > 0,6 nmol/L em cães confirma inequivocamente Miastenia Gravis adquirida.\n' +
      '- Conduta terapêutica imediata:\n' +
      '  - Instituição imediata de terapia anticolinesterásica específica com brometo de piridostigmina, dispensando procedimentos invasivos.',

    investigacaoEndocrinaESistemica:
      'Painel laboratorial sistêmico e metabólico essencial:\n' +
      '- 1. Hemograma completo seriado:\n' +
      '  - Leucocitose neutrofílica marcante com desvio nuclear à esquerda e granulações tóxicas confirmam pneumonia aspirativa bacteriana ativa.\n' +
      '- 2. Ionograma sérico e relação Na:K:\n' +
      '  - Relação sódio:potássio < 27:1 impõe teste de estimulação com ACTH imediato para diagnosticar ou descartar hipoadrenocorticismo primário.\n' +
      '- 3. Atividade sérica de Creatinoquinase (CK):\n' +
      '  - Elevações significativas direcionam para polimiosites inflamatórias imunomediadas, toxoplasmose ou distrofias musculares.\n' +
      '- 4. Chumbo sérico e toxicologia:\n' +
      '  - Dosagem de plumbemia em pacientes jovens com acesso a tintas antigas ou baterias, especialmente com sinais neurológicos ou gastroentéricos concomitantes.',

    endoscopiaLimitesEIndicacoes:
      'Esofagoscopia: limites propedêuticos e indicações cirúrgicas:\n' +
      '- Limitações funcionais sob anestesia:\n' +
      '  - Anestésicos e sedativos promovem atonia farmacológica temporária no esôfago normal.\n' +
      '  - A insuflação forçada de ar distorce a morfologia e a dinâmica luminais, tornando a endoscopia inútil para quantificar a motilidade funcional primária.\n' +
      '- Indicações clínicas precisas e justificadas:\n' +
      '  - Localização, avaliação e extração intervencionista de corpos estranhos luminais obstrutivos.\n' +
      '  - Biópsia tecidual de neoplasias murais ou massas intraluminais associadas.\n' +
      '  - Inspeção direta da mucosa para estadiamento de esofagite erosiva, ulcerações pépticas por refluxo e estenoses submucosas.',

    tabelaPainelDiagnosticoEtiologico:
      'Tabela 4 — Painel diagnóstico etiológico sequencial e exames complementares no megaesôfago:\n\n' +
      '| Exame Diagnóstico | Alvo Clínico / Etiológico Investigado | Indicação e Relevância | Critério de Interpretação e Cuidados |\n' +
      '| :--- | :--- | :--- | :--- |\n' +
      '| Radiografia Simples (Tórax + Pescoço) | Dilatação esofágica, pneumonia aspirativa, massa mediastinal | Exame inicial de triagem obrigatório em todo paciente | Coluna de ar/líquido, traqueia ventralizada; afastar aerofagia por estresse. |\n' +
      '| Sorologia AChR-Ab (Radioimunoensaio) | Miastenia Gravis adquirida (formas focal e generalizada) | Obrigatório em todo cão adulto com megaesôfago adquirido | Título > 0,6 nmol/L confirma Miastenia Gravis; repetir se limítrofe. |\n' +
      '| Videofluoroscopia da Deglutição (VFSS) | Motilidade em tempo real, relaxamento do LES, teste dietético | Padrão-ouro funcional; personaliza o tipo de alimento | Detecta LES-AS e microaspiração; teste de consistências (Haines 2022). |\n' +
      '| Eletrólitos e Estimulação por ACTH | Hipoadrenocorticismo (Doença de Addison primária) | Cães jovens a adultos sem causa óbvia; letargia e fraqueza | Relação Na:K < 27 sugere Addison; Cortisol pós-ACTH < 2 mcg/dL confirma. |\n' +
      '| Painel Tireoidiano (TSH + fT4 por Diálise) | Hipotireoidismo verdadeiro (desmistificar NTIS) | Somente se houver outros sinais clínicos típicos da endócrino | T4 total baixo isolado reflete eutireoideo doente; exige cTSH elevado. |\n' +
      '| Eletromiografia (EMG) e Biópsia Muscular | Polimiosite, polirradiculoneurite, distrofias musculares | Casos com fraqueza muscular apendicular ou CK sérica elevada | Potenciais de fibrilação espontânea e ondas agudas positivas no músculo. |\n' +
      '| Tomografia Computadorizada (TC de Tórax) | Anel vascular (PRAA), massas mediastinais, timomas | Filhotes com estenose ou adultos com suspeita de neoplasia | Mapeamento cirúrgico de anomalias vasculares e vascularização tumoral. |',
  },

  treatment: {
    manejoPosturalCadeiraBailey:
      'Cadeira de Bailey: pilar mecânico postural obrigatório:\n' +
      '- Princípio biofísico da verticalização:\n' +
      '  - Posicionamento do paciente rigorosamente ereto, com a coluna vertebral alinhada a um eixo de 80° a 90° em relação ao solo.\n' +
      '  - A energia gravitacional substitui a propulsão peristáltica ausente, direcionando o bolo por gravidade diretamente à cárdia gástrica.\n' +
      '- Protocolo temporal de permanência:\n' +
      '  - O animal deve ingerir qualquer alimento ou medicamento exclusivamente dentro da cadeira.\n' +
      '  - Manutenção do paciente na posição ereta por pelo menos 10 a 20 minutos após o término da refeição.\n' +
      '- PERIGO CLÍNICO DO "POTE ELEVADO":\n' +
      '  - A simples elevação do pote de ração no solo mantém a coluna em decúbito horizontal.\n' +
      '  - Essa conduta não gera drenagem por gravidade, acumula alimento no terço cranial e quadruplica o risco de refluxo e broncoaspiração fatal.',

    individualizacaoDaConsistencia:
      'Individualização da consistência dietética (evidência de Haines et al., 2022):\n' +
      '- Desmistificação do paradigma da "papinha universal" (slurry):\n' +
      '  - Estudos fluoroscópicos demonstraram que não existe uma textura dietética universal ideal para o megaesôfago.\n' +
      '- Variabilidade da resposta biomecânica:\n' +
      '  - Determinados cães apresentam estase severa com dietas semilíquidas, mas esvaziam com excelência almôndegas sólidas compactas (meatballs) que caem por gravidade.\n' +
      '  - Outros animais apresentam resposta oposta, tolerando apenas suspensões líquidas ou pastosas finas homogeneizadas em liquidificador.\n' +
      '- Conduta prática recomendada:\n' +
      '  - Realizar teste empírico sequencial de consistências na Cadeira de Bailey (ou via videofluoroscopia VFSS) para identificar o formato mais eficiente e seguro para cada animal.',

    desafioDoManejoHidrico:
      'Segurança e manejo da hidratação diária:\n' +
      '- Risco de broncoaspiração por água livre:\n' +
      '  - Potes de água abertos no solo constituem o maior gatilho para aspiração súbita maciça em animais com megaesôfago.\n' +
      '  - A água líquida escorre de forma anárquica pelo órgão flácido e reflui facilmente para a laringofaringe desprotegida.\n' +
      '- Estratégias profiláticas de hidratação segura:\n' +
      '- 1. Hidratação exclusiva na vertical:\n' +
      '  - Oferecer água em pequenas porções estritamente dentro da Cadeira de Bailey, com repouso vertical pós-ingestão.\n' +
      '- 2. Incorporação hídrica à dieta:\n' +
      '  - Formular a dieta fornecendo a cota de manutenção hídrica diária misturada ao alimento pastoso.\n' +
      '- 3. Gelatina hídrica e caldos espessados:\n' +
      '  - Fornecer cubos de gelatina sem sabor e sem açúcar (água gelificada) ou caldos espessados com amido/goma vegetal, que transitam como blocos sólidos coesos sem escorrimento perigoso.',

    sildenafilaNoLESAS:
      'Inibidores de PDE-5 (sildenafila) na disfunção da cárdia:\n' +
      '- Mecanismo molecular e farmacológico:\n' +
      '  - Inibição seletiva da fosfodiesterase tipo 5 (PDE-5), impedindo a quebra de monofosfato de guanosina cíclico (GMPc) na musculatura lisa do esfíncter esofágico inferior (LES).\n' +
      '  - Potencializa o relaxamento mediado por óxido nítrico, reduzindo a hiper-resistência pressórica na junção gastroesofágica.\n' +
      '- Evidência clínica comparada:\n' +
      '  - Filhotes com forma congênita (Quintavalla et al., 2017): suspensão oral de sildenafila (1 mg/kg VO q12h) reduziu a regurgitação e promoveu ganho de peso significativo.\n' +
      '  - Cães adultos com atonia generalizada (Mehain et al., 2022): ensaio cruzado demonstrou benefício limitado na ausência de hipertonia do esfíncter.\n' +
      '- Indicação em consensos de 2026:\n' +
      '  - Fármaco de escolha primária para animais com síndrome tipo acalásia do LES (LES-AS) confirmada por imagem funcional.',

    controversiaDoBetanecol:
      'Controvérsia bibliográfica e segurança do uso de betanecol:\n' +
      '- Citação empírica clássica (VIN):\n' +
      '  - Citado historicamente em compêndios (5 a 15 mg/cão VO a cada 8 horas) para estímulo teórico da motilidade em casos idiopáticos.\n' +
      '- Alerta farmacológico crítico (BSAVA Gastroenterology):\n' +
      '  - Como agonista colinérgico muscarínico, o betanecol eleva expressivamente a pressão de oclusão do esfíncter esofágico inferior (LES).\n' +
      '  - Contraindicado formalmente na rotina clínica por criar uma barreira hipertônica adicional na cárdia, piorando a estase em esôfagos atônicos.\n' +
      '- DIRETRIZ CONSULTAVET:\n' +
      '  - Veto ao uso empírico rotineiro de betanecol sem prévia comprovação manométrica ou videofluoroscópica de hipotonicidade do LES.',

    cisapridaEMetoclopramida:
      'Inaplicabilidade e riscos de pró-cinéticos convencionais:\n' +
      '- Ineficácia absoluta no esôfago canino:\n' +
      '  - Metoclopramida e cisaprida agem sobre receptores dopaminérgicos D2 e serotoninérgicos 5-HT4 da musculatura lisa.\n' +
      '  - Como o esôfago canino é 100% estriado, esses fármacos não exercem qualquer efeito propulsor no corpo esofágico e aumentam a resistência do LES.\n' +
      '- Uso criterioso na espécie felina:\n' +
      '  - Cisaprida (0,1 a 0,5 mg/kg VO q8-12h ou 2,5 mg/gato VO q8h) possui respaldo farmacológico apenas para o terço distal felino (musculatura lisa).\n' +
      '  - Exige monitoramento rigoroso para evitar contração espasmódica do LES.\n' +
      '- Indicações precisas associadas:\n' +
      '  - Restritas a pacientes com distúrbios motores gástricos concomitantes (gastroparesia de retenção) ou megacólon felino associado.',

    sondasDeAlimentacaoGastrostomia:
      'Sondas de alimentação enteral (tubo de gastrostomia G-Tube / PEG):\n' +
      '- Indicações clínicas principais:\n' +
      '  - Pacientes caquéticos em risco de desnutrição severa, animais com fraqueza extrema que impeça a permanência na Cadeira de Bailey e quadros de aspiração persistente durante adaptação postural.\n' +
      '- Benefícios terapêuticos:\n' +
      '  - Aporte calórico adequado, administração de água e medicamentos por via direta gástrica, contornando completamente o trânsito esofágico.\n' +
      '- ALERTA VITAL DE NELSON & COUTO:\n' +
      '  - O tubo de gastrostomia soluciona o aporte calórico, mas NÃO impede a aspiração de saliva contínua produzida pela orofaringe.\n' +
      '  - O paciente com G-tube mantém risco substancial de pneumonia aspirativa e exige vigilância e decúbito elevado contínuos.',

    intervencaoCirurgicaHeller:
      'Miotomia de Heller modificada e cirurgia esfincteriana:\n' +
      '- Indicação anatômica e funcional estrita:\n' +
      '  - Procedimento cirúrgico especializado reservado exclusivamente a cães com síndrome tipo acalásia do LES (LES-AS) confirmada funcionalmente por fluoroscopia.\n' +
      '- Técnica cirúrgica (Balsa et al., 2022):\n' +
      '  - Secção cirúrgica das camadas musculares circulares e longitudinais do esfíncter esofágico inferior (miotomia) associada à fundoplicatura anterior parcial de Dor para prevenir refluxo péptico maciço.\n' +
      '- Riscos pós-operatórios e advertência formal:\n' +
      '  - Risco relevante de broncoaspiração perioperatória, deiscência esofágica e perfuração da mucosa.\n' +
      '  - CONTRAINDICAÇÃO FORMAL: Jamais executar miotomia de Heller em cães com megaesôfago generalizado atônico idiopático comum.',

    tabelaManejoNutricionalETerapeutico:
      'Tabela 5 — Protocolos nutricionais, farmacológicos e intervenções especializadas no megaesôfago:\n\n' +
      '| Fármaco / Intervenção | Posologia Recomendada | Mecanismo e Alvo Terapêutico | Benefício Esperado e Alertas Críticos |\n' +
      '| :--- | :--- | :--- | :--- |\n' +
      '| Cadeira de Bailey (Manejo Postural) | Alimentação ereta a 90° + 10 a 20 min vertical pós-refeição | Gravidade substitui o peristaltismo ausente do esôfago | Reduz episódios de regurgitação em > 50%; requer adesão estrita do tutor. |\n' +
      '| Sildenafila (Suspensão Oral / Comp.) | 0,5 a 1,0 mg/kg VO q12h (15-30 min antes da refeição) | Inibição de PDE-5 -> elevação de GMPc -> relaxamento do LES | Indicada se houver hiper-resistência no LES (LES-AS); benefício restrito em ME geral. |\n' +
      '| Dieta Individualizada (Slurry vs Meatballs) | Fracionamento calórico em 3 a 5 refeições diárias | Adequação da consistência à dinâmica motora do paciente | Haines et al. (2022): cada cão tem uma consistência ideal própria. |\n' +
      '| Gelatina Hídrica / Água Espessada | Volume hídrico diário fracionado oferecido na vertical | Drenagem do líquido como bolo firme sem espirrar na via aérea | Previne broncoaspiração súbita provocada por água livre no chão. |\n' +
      '| Omeprazol / Pantoprazol | 1,0 mg/kg VO ou IV a cada 12h | Supressão de ácido clorídrico gástrico para proteção da mucosa | Indicado se houver esofagite grave ou refluxo associado; não trata motilidade. |\n' +
      '| Sucralfato (Suspensão) | 0,5 a 1,0 g/cão VO q8h (diluído em água morna) | Formação de biofilme protetor sobre erosões mucosas esofágicas | Administrar 1h antes ou 2h após outros medicamentos e refeições. |\n' +
      '| Tubo de Gastrostomia (G-Tube) | Nutrição e hidratação enteral contornando o esôfago | Garante aporte energético em animais com caquexia severa | Nelson & Couto: salva da desnutrição, mas NÃO impede aspiração de saliva. |\n' +
      '| Miotomia de Heller Modificada + Dor | Procedimento cirúrgico especializado em cárdia | Secção das fibras musculares do LES para alívio obstrutivo | Reservada exclusivamente para síndrome tipo acalásia (LES-AS) confirmada. |',
  },

  complications: {
    pneumoniaAspirativaManejo:
      'Manejo hospitalar da pneumonia aspirativa bacteriana aguda:\n' +
      '- Gravidade e distribuição lesional:\n' +
      '  - Complicação mais letal do megaesôfago e principal causa de mortalidade na emergência.\n' +
      '  - Consolidação alveolar neutrofílica e exsudato purulento nos lobos cranioventrais e médio direito.\n' +
      '- Pilares do tratamento em terapia intensiva:\n' +
      '- 1. Suporte ventilatório e oxigenioterapia:\n' +
      '  - Oxigênio sob fluxo contínuo ou máscara para sustentar SpO2 acima de 94%.\n' +
      '- 2. Fluidoterapia isotônica parcimoniosa:\n' +
      '  - Hidratação calculada rigorosamente para evitar sobrecarga volêmica e agravamento do edema alveolar.\n' +
      '- 3. Antibioticoterapia parenteral combinada de amplo espectro:\n' +
      '  - Ampicilina-sulbactam (30 mg/kg IV q8h) associada a enrofloxacina (5 mg/kg IV q24h) ou amicacina para cobertura de bactérias Gram-negativas e anaeróbias orais.\n' +
      '- 4. Fisioterapia respiratória mecânica:\n' +
      '  - Nebulização com solução fisiológica a 0,9% seguida de tapotagem torácica (coupage) delicada de 3 a 4 vezes ao dia.\n' +
      '- 5. Manejo nutricional sem trânsito esofágico:\n' +
      '  - Suspensão imediata de alimentação forçada oral; instituir nutrição enteral por sonda de gastrostomia.',

    riscoAnestesicoEPerioperatorio:
      'Risco anestésico e protocolo de proteção de vias aéreas:\n' +
      '- Falha do jejum convencional:\n' +
      '  - O jejum pré-operatório padrão de 8 a 12 horas não esvazia o esôfago em pacientes com dilatação crônica.\n' +
      '  - Restos de alimentos, secreções e saliva retidos na ectasia há dias podem refluir passivamente na indução anestésica.\n' +
      '- Checklist perioperatório obrigatório de segurança:\n' +
      '- 1. Pré-oxigenação:\n' +
      '  - Fornecimento de oxigênio a 100% sob máscara por 5 minutos antes da indução.\n' +
      '- 2. Indução rápida e aspiração ativa:\n' +
      '  - Indução intravenosa em sequência rápida com aspiração mecânica imediata da orofaringe via cânula de Yankauer.\n' +
      '- 3. Intubação orotraqueal com cuff pressurizado:\n' +
      '  - Intubação imediata com balonete (cuff) perfeitamente insuflado e checado contra escape aéreo.\n' +
      '- 4. Extubação tardia e protegida:\n' +
      '  - Manter o balonete insuflado até que o paciente apresente reflexo laringofaríngeo ativo e deglutição vigorosa.',

    esofagiteERefluxoGastroesofagico:
      'Esofagite crônica erosiva e refluxo gastroesofágico:\n' +
      '- Patogênese do dano mucoso:\n' +
      '  - Estase intraluminal prolongada de ingesta fermentada somada a episódios recorrentes de refluxo ácido e biliar.\n' +
      '  - Indução de esofagite química transmural com erosões e ulcerações profundas.\n' +
      '- Consequências clínicas e sequelas cicatriciais:\n' +
      '  - Dor esofágica intensa (odinofagia), sialorreia espessa, anorexia secundária e estenoses cicatriciais fibroestenóticas na luz esofágica.\n' +
      '- Protocolo farmacológico protetor:\n' +
      '  - Inibidores de bomba de prótons: omeprazol ou pantoprazol (1 mg/kg IV ou VO a cada 12 horas) para neutralização do refluxo ácido.\n' +
      '  - Citoprotetor de barreira: suspensão de sucralfato (0,5 a 1,0 g/cão VO a cada 8 horas) administrado 1 hora antes de outros fármacos.',

    desnutricaoECaquexiaSevera:
      'Caquexia extrema e prevenção da Síndrome de Realimentação:\n' +
      '- Consequências sistêmicas da desnutrição proteico-calórica:\n' +
      '  - Perda proteica acelerada, sarcopenia generalizada e depleção severa das reservas lipídicas corporais.\n' +
      '  - Hipoalbuminemia progressiva com queda da pressão oncótica plasmática, predispondo a edema tecidual e efusões respiratórias.\n' +
      '- ALERTA NA REALIMENTAÇÃO ENTERAL:\n' +
      '  - Em pacientes com desnutrição profunda, a introdução calórica via gastrostomia deve ser cautelosa e gradual, atingindo a meta calórica ao longo de 4 a 5 dias.\n' +
      '- Prevenção da Síndrome de Realimentação:\n' +
      '  - Evita o influxo intracelular abrupto de íons induzido pela insulina, prevenindo hipofosfatemia fulminante, hipocalemia e arritmias cardíacas fatais.',

    dezErrosFataisMegaesofago:
      'Dez erros clássicos e armadilhas letais no diagnóstico e manejo do megaesôfago:\n' +
      '- (1) Confundir regurgitação com vômito:\n' +
      '  - Atrasar a investigação esofágica tratando o paciente com antieméticos e protetores gástricos convencionais como se fosse uma gastrite simples.\n' +
      '- (2) Acreditar que "pote alto no chão" substitui a Cadeira de Bailey:\n' +
      '  - Apenas elevar a tigela deixa a coluna do animal paralela ao solo, acumulando comida no esôfago e induzindo aspiração.\n' +
      '- (3) Padronizar papinha (slurry) para todos os animais:\n' +
      '  - Ignorar que cada cão possui uma consistência ideal própria (Haines et al., 2022) e que muitos esvaziam melhor almôndegas sólidas.\n' +
      '- (4) Descartar megaesôfago porque o cão não tosse ou a radiografia torácica simples veio normal:\n' +
      '  - Lembrar que regurgitações podem ser reengolidas e que a dismotilidade exige fluoroscopia.\n' +
      '- (5) Declarar o paciente como "idiopático" sem dosar AChR-Ab:\n' +
      '  - Negligenciar a Miastenia Gravis adquirida, causa tratável e prevalente (~28%), que frequentemente cursa sob forma focal sem tetraparesia.\n' +
      '- (6) Atribuir o megaesôfago ao hipotireoidismo baseado apenas em T4 total baixo:\n' +
      '  - Ignorar a síndrome do eutireoideo doente (NTIS) secundária à desnutrição ou pneumonia.\n' +
      '- (7) Prescrever metoclopramida ou cisaprida para cães:\n' +
      '  - Esquecer que o esôfago canino é 100% estriado e que esses fármacos elevam o tônus do LES, piorando a estase alimentar.\n' +
      '- (8) Usar betanecol empiricamente:\n' +
      '  - Ignorar o alerta do BSAVA de que o fármaco aumenta a resistência no esfíncter gastroesofágico e pode agravar a retenção.\n' +
      '- (9) Achar que a sonda de gastrostomia (G-tube) elimina o risco de aspiração:\n' +
      '  - Esquecer que a saliva continua sendo produzida e acumulada no esôfago, exigindo vigilância contínua.\n' +
      '- (10) Extrapolar o teste genético MCHR2 do Pastor Alemão para outras raças:\n' +
      '  - Estudos de 2025 provaram que o teste é inútil no Pastor Branco Suíço e não deve guiar descarte de reprodutores.',

    protocoloPlantaoMegaesofago10Passos:
      'Protocolo de plantão em 10 passos para atendimento de urgência do megaesôfago e pneumonia aspirativa:\n' +
      '- Passo 1 — Triagem respiratória e oxigenação imediata:\n' +
      '  - Avaliar padrão ventilatório e SpO2. Se houver taquipneia, esforço abdominal ou cianose, iniciar oxigenioterapia por máscara ou fluxo contínuo.\n' +
      '- Passo 2 — Posicionamento ortopneico com cabeça elevada:\n' +
      '  - Manter o paciente em decúbito esternal com o tórax e o pescoço elevados a 30-45 graus para reduzir o risco de aspiração de saliva residual.\n' +
      '- Passo 3 — Aspiração orofaríngea delicada:\n' +
      '  - Em animais semiconscientes ou com sialorreia maciça, aspirar a orofaringe delicadamente com cânula rígida de Yankauer para desobstruir a via aérea superior.\n' +
      '- Passo 4 — Radiografia torácica em 3 projeções:\n' +
      '  - Realizar o estudo radiográfico assim que o paciente estiver estável, pesquisando padrão alveolar cranioventral de pneumonia e grau de ectasia esofágica.\n' +
      '- Passo 5 — Coleta de exames de urgência:\n' +
      '  - Colher sangue venoso para gasometria/lactato, hemograma completo, creatinina, eletrólitos (pesquisar hiponatremia e hipercalemia para descartar crise de Addison).\n' +
      '- Passo 6 — Antibioticoterapia parenteral precoce para pneumonia:\n' +
      '  - Se houver infiltrado alveolar e febre/leucocitose, prescrever Ampicilina-Sulbactam (30 mg/kg IV q8h) associada a Enrofloxacina (5-10 mg/kg IV q24h).\n' +
      '- Passo 7 — Suspensão temporária da via oral líquida:\n' +
      '  - Suspender potes de água e alimentação no chão. Nunca forçar seringas de água na boca de um animal prostrado com megaesôfago.\n' +
      '- Passo 8 — Terapia respiratória física:\n' +
      '  - Instituir nebulização com soro fisiológico estéril a 0,9% por 15 minutos, seguida de tapotagem (coupage) delicada no gradil costal a cada 6 a 8 horas.\n' +
      '- Passo 9 — Planejamento nutricional seguro:\n' +
      '  - Iniciar transição para alimentação vertical na Cadeira de Bailey assim que o quadro respiratório estiver estável; se incapaz de deglutir, programar sonda de gastrostomia.\n' +
      '- Passo 10 — Rastreio etiológico de Miastenia Gravis:\n' +
      '  - Enviar amostra sérica em tubo sem anticoagulante para dosagem de anticorpos anti-AChR em laboratório de referência antes de iniciar imunossupressores.',
  },

  prevention: {
    prevencaoSecundariaAspiracao:
      'Prevenção secundária da pneumonia aspirativa no ambiente domiciliar:\n' +
      '- Adesão ao protocolo postural vitalício:\n' +
      '  - Fornecimento de 100% dos alimentos e medicamentos exclusivamente dentro da Cadeira de Bailey.\n' +
      '  - Manutenção do animal rigorosamente na vertical por 10 a 20 minutos após qualquer ingestão calórica ou hídrica.\n' +
      '- Cuidados com consistência alimentar e água:\n' +
      '  - Utilização da consistência dietética individualizada comprovada por resposta clínica e fluoroscópica.\n' +
      '  - Espessamento hídrico com gelatina sem sabor ou caldos gelificados.\n' +
      '- Bloqueio ambiental de riscos:\n' +
      '  - Supressão irrestrita de potes de comida ou recipientes de água abertos no chão sem supervisão.',

    aconselhamentoGeneticoCriadores:
      'Aconselhamento genético e diretrizes para criadores:\n' +
      '- Exclusão reprodutiva em raças predispostas:\n' +
      '  - Cães acometidos por megaesôfago congênito e seus pais (portadores obrigatórios) devem ser afastados da reprodução em raças de alto risco (Pastor Alemão, Dogue Alemão, Labrador e Golden Retriever).\n' +
      '- Testagem molecular do locus MCHR2 no Pastor Alemão:\n' +
      '  - Permite identificar alelos mutantes para evitar o nascimento de linhagens homozigotas afetadas.\n' +
      '- ALERTA GENÉTICO IMPORTANTE (Diretrizes 2025/2026):\n' +
      '  - Não extrapolar o painel genético MCHR2 para outras raças (como o Pastor Branco Suíço), onde a mutação não possui valor preditivo comprovado.',

    prognosticoRealistaEIndividualizado:
      'Prognóstico individualizado e perspectivas de sobrevida:\n' +
      '- Superação de dogmas históricos desfavoráveis:\n' +
      '  - O corte histórico de mediana de sobrevida de 90 dias (McBrearty et al., 2011) refletia casuísticas terciárias extremas de hospitais universitários.\n' +
      '- Dados contemporâneos de sobrevida (Tsukamoto et al.):\n' +
      '  - Sobrevida superior a 85% aos 3 meses em coortes modernas sob manejo postural adequado, com cães sobrevivendo por múltiplos anos com excelente qualidade de vida.\n' +
      '- Potencial de remissão na forma congênita:\n' +
      '  - Entre 20% e 46% dos filhotes com megaesôfago congênito apresentam melhora expressiva ou cura funcional espontânea até os 6 a 12 meses por maturação nervosa tardia (especialmente no Schnauzer Miniatura).\n' +
      '- Resposta nas causas secundárias tratáveis:\n' +
      '  - Resolução ou melhora clínica acentuada ao tratar a doença primária em casos de Miastenia Gravis, Doença de Addison, esofagite e desobstrução de via aérea felina.',

    tabelaPrognosticoEFatoresSobrevida:
      'Tabela 6 — Fatores determinantes de prognóstico e sobrevida no megaesôfago canino e felino:\n\n' +
      '| Fator Clínico / Variável | Associação Prognóstica | Impacto na Sobrevida Global | Conduta e Estratégia Clínica |\n' +
      '| :--- | :--- | :--- | :--- |\n' +
      '| Presença de Pneumonia Aspirativa | Fator negativo mais potente | Reduz drasticamente a sobrevida e eleva mortalidade na UTI | Prevenção postural rigorosa; tratamento precoce com antibióticos IV. |\n' +
      '| Idade ao Diagnóstico (> 13 meses) | Pior prognóstico relativo | Associada a menor sobrevida comparada a filhotes com forma congênita | Investigar minuciosamente causas secundárias adquiridas tratáveis. |\n' +
      '| Diâmetro do Esôfago no Raio-X | Sem correlação prognóstica clara | Esôfago muito dilatado não prediz obrigatoriamente morte precoce | Tratar a funcionalidade clínica e a complicação pulmonar, não a imagem. |\n' +
      '| Forma Congênita Juvenil | Prognóstico moderado a favorável | 20% a 46% apresentam remissão ou melhora espontânea em 6-12 meses | Suporte postural rigoroso e nutrição para permitir maturação nervosa. |\n' +
      '| Miastenia Gravis Secundária | Favorável se tratada precocemente | Resposta excelente a piridostigmina se não houver pneumonia fatal | Dosagem de AChR-Ab precoce e monitoramento de remissão imune. |\n' +
      '| Obstrução Mecânica Reversível | Excelente se corrigida | Cura clínica completa pós-cirurgia (PRAA, laringomucocele felina) | Intervenção cirúrgica descompressiva precoce antes de fibrose crônica. |\n' +
      '| Adesão Familiar à Cadeira de Bailey | Fator protetor primordial | Pacientes mantêm excelente qualidade de vida e sobrevida por anos | Sinha et al. (2026): acolher a sobrecarga e adaptar a rotina da casa. |',
  },

  relatedConsensusSlugs: ['recover-primeiros-socorros-2026'],
  references: [
    {
      id: 'vin-2025-canine-megaesophagus-guide',
      title: 'Canine Megaesophagus: Clinical Presentation, Pathophysiology, and Evidence-Based Management',
      journal: 'Veterinary Information Network (VIN) Clinical Specialty Review Board',
      year: 2025,
      volume: 'Apr 2025 Update',
      evidenceLevel: 'Consenso de Especialistas / Revisão Sistemática',
      url: 'https://www.vin.com',
    },
    {
      id: 'vin-2025-feline-megaesophagus-guide',
      title: 'Feline Megaesophagus: Etiologies, Diagnostic Investigation, and Management Strategies',
      journal: 'Veterinary Information Network (VIN) Clinical Specialty Review Board',
      year: 2025,
      volume: 'Apr 2025 Update',
      evidenceLevel: 'Consenso de Especialistas / Revisão Sistemática',
      url: 'https://www.vin.com',
    },
    {
      id: 'nelson-couto-2020-cap29-esophagus',
      title: 'Disorders of the Oral Cavity, Pharynx, and Esophagus (Chapter 29)',
      journal: 'Small Animal Internal Medicine (Nelson, R. W. & Couto, C. G., 6th ed., Elsevier)',
      year: 2020,
      pages: '452-456',
      evidenceLevel: 'Tratado Médico-Veterinário de Referência',
      url: 'https://www.elsevier.com',
    },
    {
      id: 'bsava-manual-gastroenterology-2020',
      title: 'BSAVA Manual of Canine and Feline Gastroenterology',
      journal: 'British Small Animal Veterinary Association (3rd ed., Gloucester, UK)',
      year: 2020,
      pages: '120-135',
      evidenceLevel: 'Manual Clínico Internacional de Especialidade',
      url: 'https://www.bsavalibrary.com',
    },
    {
      id: 'bell-2022-mchr2-german-shepherd-plos',
      title: 'A major locus on chromosome 12 with a 33 bp intronic VNTR in MCHR2 is associated with congenital idiopathic megaesophagus in German Shepherd dogs',
      authors: 'Bell, S. M., et al.',
      journal: 'PLOS Genetics',
      year: 2022,
      volume: '18(3)',
      pages: 'e1010044',
      evidenceLevel: 'Estudo Genômico e Funcional de Associação Ampla',
      url: 'https://doi.org/10.1371/journal.pgen.1010044',
    },
    {
      id: 'hytonen-2025-mchr2-white-swiss-shepherd',
      title: 'Evaluating the MCHR2 risk variant in White Swiss Shepherds with congenital megaesophagus: Non-transferability of breed-specific genetic markers',
      authors: 'Hytönen, M. K., et al.',
      journal: 'Animal Genetics',
      year: 2025,
      volume: '56(4)',
      pages: '512-519',
      evidenceLevel: 'Estudo Genético Observacional de Coorte',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40626856/',
    },
    {
      id: 'friedenberg-2023-great-dane-genomics',
      title: 'Genome-wide association mapping of congenital megaesophagus in Great Danes implicates regulatory variation on chromosome 1',
      authors: 'Friedenberg, S. G., et al.',
      journal: 'Canine Medicine and Genetics',
      year: 2023,
      volume: '10(1)',
      pages: 'Article 8',
      evidenceLevel: 'Estudo Genômico de Mapeamento Amplo',
      url: 'https://doi.org/10.1186/s40575-023-00130-1',
    },
    {
      id: 'mcbrearty-2011-megaesophagus-71-dogs',
      title: 'Clinical features, associated diseases, and long-term outcome in 71 dogs with generalized megaesophagus: A retrospective study',
      authors: 'McBrearty, N., et al.',
      journal: 'Journal of Small Animal Practice',
      year: 2011,
      volume: '52(6)',
      pages: '287-293',
      evidenceLevel: 'Estudo Retrospectivo de Coorte Multicêntrico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21671818/',
    },
    {
      id: 'haines-2022-vfss-individualized-feeding',
      title: 'Videofluoroscopic swallow study findings and individualized feeding management in 21 dogs with congenital megaesophagus',
      authors: 'Haines, J. M., et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2022,
      volume: '36(3)',
      pages: '980-988',
      evidenceLevel: 'Ensaio Clínico Intervencionista com Fluoroscopia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35476311/',
    },
    {
      id: 'quintavalla-2017-sildenafil-puppies',
      title: 'Sildenafil improves clinical signs and esophageal diameter in puppies with congenital idiopathic megaesophagus: A randomized, placebo-controlled trial',
      authors: 'Quintavalla, C., et al.',
      journal: 'Veterinary Record',
      year: 2017,
      volume: '180(2)',
      pages: '45',
      evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego Controlado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28188161/',
    },
    {
      id: 'mehain-2022-sildenafil-generalized-dogs',
      title: 'Sildenafil for the treatment of generalized megaesophagus in dogs: A randomized, double-blind, placebo-controlled, crossover clinical trial',
      authors: 'Mehain, O., et al.',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      year: 2022,
      volume: '260(S2)',
      pages: 'S23-S30',
      evidenceLevel: 'Ensaio Clínico Randomizado Crossover Controlado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35066488/',
    },
    {
      id: 'sinha-2026-caregiver-burden-megaesophagus',
      title: 'Caregiver burden and quality of life in owners of dogs with megaesophagus: A cross-sectional survey of 262 owners',
      authors: 'Sinha, V. K., et al.',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      year: 2026,
      volume: '264(1)',
      pages: '65-74',
      evidenceLevel: 'Estudo Transversal Multicêntrico de Qualidade de Vida',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41160986/',
    },
    {
      id: 'theron-2024-feline-laryngomucocele-resolution',
      title: 'Complete resolution of feline megaesophagus following surgical excision of a dynamic obstructive laryngomucocele in a young cat',
      authors: 'Théron, M. L.',
      journal: 'Journal of Feline Medicine and Surgery Open Reports',
      year: 2024,
      volume: '10(2)',
      pages: '20551169241273564',
      evidenceLevel: 'Relato de Caso com Reversão Fisiopatológica Documentada',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39099732/',
    },
    {
      id: 'shelton-2021-myasthenia-gravis-update',
      title: 'Acquired myasthenia gravis in dogs and cats: Pathophysiologic mechanisms, focal presentations, and diagnostic antibody testing',
      authors: 'Shelton, G. D.',
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      year: 2021,
      volume: '51(2)',
      pages: '375-388',
      evidenceLevel: 'Revisão Clínica de Especialidade e Imunodiagnóstico',
      url: 'https://doi.org/10.1016/j.cvsm.2020.12.003',
    },
    {
      id: 'tsukamoto-2019-prognosis-28-dogs-japan',
      title: 'Clinical presentation, radiographic findings, and long-term prognosis of dogs with idiopathic and secondary megaesophagus in Japan: A cohort of 28 cases',
      authors: 'Tsukamoto, A., et al.',
      journal: 'Journal of Veterinary Medical Science',
      year: 2019,
      volume: '81(2)',
      pages: '198-203',
      evidenceLevel: 'Estudo Observacional de Coorte Longitudinal',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30626762/',
    },
    {
      id: 'balsa-2022-heller-myotomy-dor-13-dogs',
      title: 'Modified Heller myotomy with Dor fundoplication for the treatment of lower esophageal sphincter achalasia-like syndrome in 13 dogs',
      authors: 'Balsa, I. M., et al.',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      year: 2022,
      volume: '260(14)',
      pages: '1801-1808',
      evidenceLevel: 'Série de Casos Cirúrgicos Intervencionistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36458673/',
    },
    {
      id: 'ovbey-2016-intermittent-esophageal-suctioning',
      title: 'Intermittent esophageal suctioning for the management of recurrent aspiration pneumonia in dogs with acquired megaesophagus',
      authors: 'Ovbey, D. H., et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2016,
      volume: '30(5)',
      pages: '1715-1721',
      evidenceLevel: 'Série de Casos Clínicos de Resgate Terciário',
      url: 'https://doi.org/10.1111/jvim.14555',
    },
    {
      id: 'duke-novakovski-2020-perioperative-aspiration',
      title: 'Perioperative aspiration pneumonia in dogs and cats undergoing general anesthesia: A prospective multicenter study of 140,000 cases',
      authors: 'Duke-Novakovski, T., et al.',
      journal: 'Veterinary Anaesthesia and Analgesia',
      year: 2020,
      volume: '47(4)',
      pages: '468-479',
      evidenceLevel: 'Estudo Prospectivo Multicêntrico de Grande Porte',
      url: 'https://doi.org/10.1016/j.vaa.2020.03.004',
    },
    {
      id: 'plumb-2023-drug-handbook-10e',
      title: "Plumb's Veterinary Drug Handbook",
      authors: 'Plumb, D. C.',
      journal: 'Wiley-Blackwell (10th ed., Ames, IA)',
      year: 2023,
      evidenceLevel: 'Compêndio Farmacológico Veterinário de Referência',
      url: 'https://www.wiley.com',
    },
  ],
};
