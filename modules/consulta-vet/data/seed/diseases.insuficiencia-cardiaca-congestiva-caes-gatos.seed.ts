import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const insuficienciaCardiacaCongestivaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-insuficiencia-cardiaca-congestiva-caes-gatos',
  slug: 'insuficiencia-cardiaca-congestiva-caes-gatos',
  title: 'Insuficiência cardíaca congestiva (ICC) em cães e gatos',
  subtitle:
    'Síndrome clínica de elevação patológica das pressões de enchimento cardíaco e congestão venosa pulmonar ou sistêmica, secundária a cardiopatias estruturais ou funcionais distintas. Exige diferenciar cardiomegalia de congestão ativa, caracterizar o fenótipo hemodinâmico (esquerda, direita, biventricular e perfil de perfusão) e individualizar o manejo entre cães e gatos.',
  synonyms: [
    'ICC',
    'Congestive heart failure (CHF)',
    'Insuficiência cardíaca esquerda',
    'Insuficiência cardíaca direita',
    'Insuficiência cardíaca biventricular',
    'Edema pulmonar cardiogênico',
    'Descompensação cardíaca congestiva',
  ],
  species: ['dog', 'cat'],
  category: 'cardiologia',
  categories: ['cardiologia', 'emergencia', 'clinica-medica', 'respiratorio'],
  tags: ['Cães e Gatos'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['insuficiencia-cardiaca-congestiva-caes-gatos'],

  quickSummary:
    'A insuficiência cardíaca congestiva (ICC) é uma síndrome clínica — e não uma doença primária isolada — em que uma alteração estrutural ou funcional do coração eleva as pressões de enchimento e provoca extravasamento de líquido nos pulmões (ICC esquerda: edema pulmonar e, em gatos, frequentemente efusão pleural) ou na circulação sistêmica (ICC direita: ascite, hepatomegalia congestiva e distensão jugular). Cardiomegalia ou sopro não comprovam ICC, e fração de ejeção normal ou elevada não a exclui (como na disfunção diastólica felina e na regurgitação mitral). Na emergência, estabilização com oxigênio, mínima manipulação, POCUS torácico/cardíaco, furosemida IV para edema cardiogênico e toracocentese imediata na efusão pleural volumosa precedem exames estressantes. Na manutenção, utiliza-se a menor dose eficaz de diurético associada à terapia específica da cardiopatia e espécie, monitorando frequência respiratória durante o sono (< 30 irpm), peso, pressão arterial, função renal e eletrólitos.',

  quickDecisionStrip: [
    'ICC não é sinônimo de cardiomegalia: cardiopatia estrutural com aumento atrial (ex.: DMVM estágio B2) ainda não é ICC se não houver congestão venosa/edema.',
    'Fração de ejeção normal ou elevada NÃO exclui ICC: tanto a disfunção diastólica (CMH felina) quanto cardiopatias regurgitativas (DMVM) podem causar edema pulmonar grave com FE preservada.',
    'Na emergência dispneica, estabilize primeiro: oxigênio, mínima manipulação e POCUS à beira do leito precedem radiografias sob contenção; efusão pleural volumosa exige toracocentese antes de escalonar diurético.',
    'Nunca replique o protocolo canino no gato: gatos com ICC frequentemente não tossem, podem não ter sopro, apresentam edema multifocal/ventral ou efusão pleural e exigem excluir LVOTO antes de considerar pimobendan.',
    'Tamponamento cardíaco e choque cardiogênico (perfil frio e úmido) não se resolvem apenas subindo furosemida: tamponamento exige pericardiocentese e baixo débito exige avaliação hemodinâmica intensiva.',
    'Na manutenção, a frequência respiratória durante o sono (< 30 irpm no controle adequado) é a ferramenta domiciliar mais sensível para antecipar recorrência antes da dispneia franca.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'A insuficiência cardíaca congestiva representa o ponto de convergência hemodinâmica de múltiplas doenças valvares, miocárdicas, vasculares pulmonares, congênitas e pericárdicas, mas jamais deve receber um protocolo único. Um cão com edema pulmonar por degeneração mixomatosa da valva mitral, um gato com cardiomiopatia hipertrófica obstrutiva e efusão pleural e um cão com ascite por hipertensão pulmonar ou tamponamento cardíaco pertencem a fenótipos distintos e respondem de forma oposta a intervenções como inodilatadores, vasodilatadores pulmonares, toracocentese ou fluidoterapia. O raciocínio clínico seguro começa separando emergência respiratória e hipoperfusão, confirmando a congestão por evidência convergente e ajustando cada fármaco à espécie, à etiologia e ao equilíbrio cardiorrenal.',
    leadHighlights: [
      'jamais deve receber um protocolo único',
      'fenótipos distintos e respondem de forma oposta',
      'confirmando a congestão por evidência convergente',
      'ajustando cada fármaco à espécie, à etiologia e ao equilíbrio cardiorrenal',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Da Estabilização Emergencial à Identificação Etiológica',
      steps: [
        {
          label: '1. Triagem de estabilidade e via de emergência imediata',
          timing: 'Minutos iniciais',
          detail:
            'Identificar dispneia grave, ortopneia, respiração com boca aberta em gatos, cianose, colapso, hipotensão/hipoperfusão ou suspeita de tamponamento cardíaco. Fornecer oxigênio sem estresse, reduzir manipulação ao mínimo e jamais forçar radiografias em paciente instável.',
        },
        {
          label: '2. Exame físico dirigido e POCUS torácico/cardíaco à beira do leito',
          timing: 'Beira do leito',
          detail:
            'Diferenciar edema pulmonar provável (B-lines difusas + átrio esquerdo aumentado), efusão pleural clinicamente relevante (priorizar toracocentese diagnóstica e terapêutica), ascite com congestão venosa sistêmica (jugular/veia cava caudal/veias hepáticas) ou efusão pericárdica com tamponamento.',
        },
        {
          label: '3. Confirmação convergente da congestão e biomarcadores',
          timing: 'Após estabilidade inicial',
          detail:
            'Integrar radiografia torácica (quando tolerada, respeitando padrões distintos de cães e gatos), análise de líquido cavitário quando coletado e NT-proBNP rápido em gatos se POCUS indisponível (sem atrasar tratamento aguardando ensaio quantitativo). Quando faltarem critérios claros, classificar como diagnóstico incerto e ampliar investigação.',
        },
        {
          label: '4. Caracterização etiológica, estadiamento e avaliação sistêmica',
          timing: 'Estabilizado',
          detail:
            'Realizar ecocardiografia completa (LA/Ao, LVIDDN, função sistólica e diastólica, LVOTO em gatos, probabilidade de hipertensão pulmonar, trombo/contraste atrial), ECG, pressão arterial sistêmica, painel renal, eletrólitos (Na⁺, K⁺, Cl⁻), urinálise e triagem de causas secundárias (T4 em gatos geriátricos, dirofilariose, anemia).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Descongestão Fenotípica, Manutenção e Vigilância',
      steps: [
        {
          label: '1. Intervir conforme o fenótipo agudo (edema × efusão × ascite × baixo débito)',
          timing: 'Emergência',
          detail:
            'Edema pulmonar canino: O₂ + furosemida 2 mg/kg IV (repetir conforme resposta até 8 mg/kg em 4 h ou CRI 0,66–1 mg/kg/h) + pimobendan VO quando seguro. Edema felino: O₂ + mínimo estresse + furosemida em bolus 1–2 mg/kg IV. Efusão pleural grave: toracocentese imediata. Tamponamento: pericardiocentese. Perfil frio e úmido: avaliação hemodinâmica em UTI antes de escalonar diuréticos ou vasodilatadores.',
        },
        {
          label: '2. Estruturar terapia crônica específica por espécie e cardiopatia',
          timing: 'Estágio C estabilizado',
          detail:
            'Cães com DMVM: menor dose eficaz de furosemida VO + pimobendan (0,25–0,3 mg/kg q12h) + IECA (enalapril ou benazepril) + espironolactona (2 mg/kg/dia), monitorando rim, K⁺ e PA. Gatos: furosemida (0,5–2 mg/kg q8–12h) + clopidogrel (18,75 mg/gato q24h) se risco tromboembólico; pimobendan apenas individualizado fora de LVOTO relevante; taurina se disfunção sistólica global.',
        },
        {
          label: '3. Investigar refratariedade antes de escalonar diuréticos',
          timing: 'Estágio D / Recorrência',
          detail:
            'Confirmar se há congestão ativa real, checar adesão, dose/unidade, ingestão de sódio, absorção intestinal, função renal e progressão estrutural. Apenas após essa auditoria considerar furosemida SC pontual, transição cuidadosa para torsemida (regra inicial 5–10% da dose diária total de furosemida, nunca 1:1), bloqueio sequencial com tiazídico ou encaminhamento para reparação mitral.',
        },
        {
          label: '4. Seguimento precoce e monitorização domiciliar da FR em repouso',
          timing: '3–7 dias pós-alta e rotina',
          detail:
            'Reavaliar peso, pressão arterial, ureia/creatinina e eletrólitos em 3–7 dias após alta ou ajustes. Treinar o tutor a registrar a frequência respiratória durante o sono (estável tipicamente < 30 irpm; reavaliar em aumentos persistentes > 30–35 irpm; emergência diante de esforço respiratório ou boca aberta em gato).',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Resumo rápido em 60 segundos: eixos decisórios da ICC em cães e gatos',
      headers: ['Eixo clínico', 'Diretriz prática imediata'],
      rows: [
        [
          'Definição e mecanismo central',
          'Elevação patológica das pressões de enchimento cardíaco que ultrapassa a capacidade de drenagem linfática, gerando extravasamento de líquido nos pulmões (ICC esquerda) ou na circulação sistêmica (ICC direita).',
        ],
        [
          'ICC esquerda',
          'Elevação da pressão atrial esquerda e venosa pulmonar → edema pulmonar cardiogênico; em gatos, frequentemente produz também (ou predominantemente) efusão pleural.',
        ],
        [
          'ICC direita',
          'Elevação da pressão atrial direita e venosa sistêmica → ascite (frequentemente transudato modificado), hepatomegalia congestiva, distensão jugular e, em casos avançados, efusão pleural ou edema periférico.',
        ],
        [
          'Diagnóstico prioritário',
          'Estabilização primeiro; exame físico dirigido, POCUS torácico/cardíaco à beira do leito, radiografia apenas se o paciente tolerar, ecocardiografia completa, ECG, pressão arterial, função renal, eletrólitos e NT-proBNP quando indicado.',
        ],
        [
          'Tratamento agudo',
          'Oxigenoterapia sem estresse e mínima manipulação; furosemida IV na congestão pulmonar; toracocentese prioritária na efusão pleural dispneica; pericardiocentese no tamponamento; suporte hemodinâmico individualizado em choque cardiogênico.',
        ],
        [
          'Tratamento crônico e seguimento',
          'Menor dose eficaz de diurético associada a fármacos definidos pela cardiopatia, espécie e evidência (ACVIM 2019/2020); monitorar FR durante o sono (< 30 irpm), peso, massa muscular, PA, função renal e eletrólitos.',
        ],
      ],
    },
  },

  etiology: {
    iccPrimeiraDistincaoFundamental:
      'O primeiro passo para evitar erros diagnósticos e prescrições iatrogênicas em cardiologia veterinária é separar rigorosamente três conceitos que frequentemente são misturados na rotina clínica:\n\n' +
      '- ==ICC não é sinônimo de cardiomegalia nem de sopro==: um animal pode apresentar cardiopatia estrutural avançada e ainda não estar congesto. Um cão com degeneração mixomatosa da valva mitral (DMVM) pode exibir sopro intenso, dilatação atrial esquerda e remodelamento ventricular esquerdo importantes (estágio B2 da classificação ACVIM 2019) sem possuir edema pulmonar {{ref:ref-acvim-mmvd-2019}}. Inversamente, um gato com cardiomiopatia restritiva pode desenvolver elevação severa das pressões atriais e efusão pleural volumosa apresentando cardiomegalia discreta ou pouco expressiva na radiografia {{ref:ref-acvim-fcm-2020}}.\n' +
      '- ==Fração de ejeção normal ou elevada não exclui ICC==: essa armadilha é crítica tanto na disfunção diastólica (como na cardiomiopatia hipertrófica felina, em que o ventrículo rígido relaxa mal apesar de contrair vigorosamente) quanto nas cardiopatias regurgitativas (na DMVM canina, parte substancial do volume ventricular reflui para o átrio esquerdo de baixa pressão, fazendo a fração de ejeção parecer hiperdinâmica enquanto o débito anterógrado sistêmico está reduzido e a pressão venosa pulmonar dispara).\n' +
      '- ==ICC é uma síndrome final comum, nunca um diagnóstico etiológico completo==: reconhecer congestão apenas abre a investigação — identificar qual câmara falha, se o mecanismo é valvar, miocárdico, pericárdico, arrítmico ou vascular pulmonar e se há fatores precipitantes reversíveis (como hipertireoidismo, hipertensão sistêmica, anemia grave com hematócrito < 22% ou fluidoterapia excessiva) é o que define a terapêutica correta.',

    iccTabelaTresConceitos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Separação conceitual obrigatória: cardiopatia estrutural, insuficiência cardíaca e ICC',
      headers: ['Conceito', 'Significado clínico e hemodinâmico', 'Implicação prática imediata'],
      rows: [
        [
          'Cardiopatia estrutural',
          'Presença de alteração anatômica ou funcional do coração (valvar, miocárdica, congênita ou pericárdica), com ou sem sinais clínicos',
          'Não autoriza iniciar diuréticos rotineiramente; exige estadiamento e definição de risco (ex.: DMVM B1/B2 ou CMH B1/B2).',
        ],
        [
          'Insuficiência cardíaca',
          'Incapacidade da bomba cardíaca de atender às demandas metabólicas periféricas, ou manutenção do débito apenas mediante elevação patológica das pressões de enchimento',
          'Pode manifestar-se por intolerância ao exercício e síndrome de baixo débito antes mesmo de grandes acúmulos cavitários.',
        ],
        [
          'Insuficiência cardíaca congestiva (ICC)',
          'Elevação sustentada das pressões de enchimento que ultrapassa a drenagem linfática e produz edema pulmonar, efusões cavitárias ou congestão venosa sistêmica clinicamente relevantes',
          'Indica necessidade de descongestão dirigida ao fenótipo e manejo da cardiopatia subjacente (estágio C ou D).',
        ],
      ],
    },

    iccCausasEstruturaisEFuncionais:
      'Virtualmente qualquer afecção que comprometa o enchimento diastólico, a contratilidade sistólica, a competência valvar, a pós-carga vascular ou o ritmo cardíaco sustentado pode culminar em ICC. Além das cardiopatias primárias, ==doenças sistêmicas e fatores precipitantes== (como hipertireoidismo felino, hipertensão arterial sistêmica, deficiência de taurina, miocardite, cardiotoxicidade por doxorrubicina, taquicardiomiopatia, anemia severa e sobrecarga iatrogênica de fluidos ou corticosteroides) devem ser ativamente pesquisados, pois podem produzir remodelamento secundário ou descompensar uma cardiopatia previamente silenciosa.\n\n' +
      '- ==Destaque crítico — Tamponamento cardíaco==: embora produza ascite, distensão jugular e hipoperfusão semelhantes às da ICC direita, trata-se de uma ==síndrome hemodinâmica obstrutiva== na qual o líquido sob pressão no saco pericárdico impede o enchimento diastólico ventricular. Escalonar diuréticos reduz ainda mais a pré-carga e pode precipitar colapso cardiovascular; o tratamento prioritário diante de comprometimento hemodinâmico é a ==pericardiocentese descompressiva==.\n' +
      '- ==Destaque felino — Espessamento miocárdico transitório (TMT)==: gatos jovens ou adultos após evento estressante antecedente (anestesia, trauma, doença infecciosa ou cirurgia) podem desenvolver hipertrofia ventricular esquerda reversível que mimetiza perfeitamente CMH com ICC aguda, porém com normalização estrutural e excelente prognóstico nos meses seguintes — reforçando a importância da reavaliação ecocardiográfica seriada após a estabilização.',

    iccTabelaEtiologiaCompleta: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Principais doenças que levam à ICC em cães e gatos, mecanismo e território congesto',
      headers: ['Doença de base', 'Espécie mais relevante', 'Mecanismo hemodinâmico predominante', 'Congestão esperada'],
      rows: [
        [
          'Degeneração mixomatosa da valva mitral (DMVM)',
          'Cães (especialmente pequeno porte e geriátricos)',
          'Regurgitação mitral progressiva com sobrecarga volumétrica de AE e VE e hipertrofia excêntrica',
          'Esquerda; eventualmente biventricular se hipertensão pulmonar secundária ou doença tricúspide associada',
        ],
        [
          'Cardiomiopatia dilatada (CMD)',
          'Cães (médio/grande porte, variações raciais); gatos (ex.: deficiência de taurina)',
          'Disfunção sistólica primária ou secundária, dilatação ventricular e insuficiência valvar funcional',
          'Esquerda ou biventricular (com alto risco de baixo débito e arritmias)',
        ],
        [
          'Cardiomiopatia hipertrófica (CMH)',
          'Gatos (fenótipo predominante)',
          'Hipertrofia concêntrica, rigidez ventricular, disfunção diastólica e elevação da pressão atrial esquerda (± LVOTO dinâmica)',
          'Esquerda, com edema pulmonar, efusão pleural ou ambos',
        ],
        [
          'Cardiomiopatia restritiva (CMR)',
          'Gatos',
          'Fibrose endomiocárdica/miocárdica com grave restrição ao enchimento diastólico e dilatação atrial desproporcional',
          'Esquerda, direita ou biventricular (frequentemente com efusão pleural/ascite sem cardiomegalia radiográfica marcante)',
        ],
        [
          'Cardiomiopatia não específica / não classificada',
          'Gatos',
          'Fenótipos estruturais e funcionais mistos ou transitórios que não preenchem critérios clássicos isolados',
          'Variável (esquerda, direita ou biventricular)',
        ],
        [
          'Cardiomiopatia arritmogênica (ARVC)',
          'Cães (especialmente Boxer); gatos menos frequentemente',
          'Substituição fibrogordurosa miocárdica, disfunção ventricular direita/biventricular e arritmias ventriculares graves',
          'Direita ou biventricular',
        ],
        [
          'Displasia tricúspide',
          'Cães e gatos',
          'Regurgitação tricúspide congênita com sobrecarga volumétrica e dilatação importante de AD e VD',
          'Direita (ascite e congestão venosa sistêmica)',
        ],
        [
          'Estenose pulmonar grave',
          'Principalmente cães',
          'Obstrução à ejeção direita com sobrecarga pressórica crônica e hipertrofia concêntrica do VD',
          'Direita em fases avançadas ou diante de regurgitação tricúspide secundária',
        ],
        [
          'Hipertensão pulmonar (HP)',
          'Cães e gatos',
          'Elevação da resistência vascular ou pressão venosa pulmonar aumentando a pós-carga do VD (6 grupos ACVIM 2020)',
          'Direita em casos avançados; atenção ao Grupo 2 associado à cardiopatia esquerda',
        ],
        [
          'Dirofilariose cardiopulmonar',
          'Cães (e apresentações respiratórias/vasculares distintas em gatos)',
          'Endarterite proliferativa, tromboembolismo parasitário e hipertensão pulmonar pré-capilar',
          'Direita, sobretudo em cães',
        ],
        [
          'Cardiopatias congênitas complexas (PCA, CIV, CIA, estenose aórtica)',
          'Cães e gatos',
          'Shunts esquerda-direita com hiperfluxo pulmonar, shunts reversos ou sobrecargas pressóricas severas',
          'Variável conforme o defeito (ex.: esquerda na PCA clássica)',
        ],
        [
          'Doença pericárdica restritiva (pericardite constritiva)',
          'Cães e gatos',
          'Saco pericárdico rígido impedindo a expansão diastólica das câmaras',
          'Congestão predominantemente venosa sistêmica (ascite, efusão pleural)',
        ],
        [
          'Tamponamento cardíaco',
          'Cães e gatos',
          'Compressão cardíaca extrínseca por líquido pericárdico sob pressão com colapso do enchimento diastólico',
          'Síndrome hemodinâmica obstrutiva: simula ICC direita, porém exige pericardiocentese imediata (não diurético isolado)',
        ],
      ],
    },
  },

  epidemiology: {
    iccDiferencasEpidemiologicasEspecies:
      'A distribuição etiológica e a forma como a ICC emerge na clínica diferem profundamente entre cães e gatos, orientando desde a anamnese inicial até a seleção de exames complementares:\n\n' +
      '- ==Cães==: a ==degeneração mixomatosa da valva mitral (DMVM)== é a causa amplamente dominante de ICC esquerda em cães de porte pequeno a médio e geriátricos (com predisposição marcada em raças como Cavalier King Charles Spaniel, Poodle, Dachshund, Shih Tzu, Maltês e Yorkshire), frequentemente precedida por anos de sopro sistólico audível antes da primeira descompensação {{ref:ref-acvim-mmvd-2019}}. Já a ==cardiomiopatia dilatada (CMD)== concentra-se em cães de médio a grande porte e gigantes (como Dobermann, Boxer, Dogue Alemão, Irish Wolfhound e Cocker Spaniel), podendo cursar com fase oculta arrítmica ou hipocinética silenciosa e morte súbita {{ref:ref-protect-2012}}. Doenças tricúspides, congênitas, pericárdicas, dirofilariose e hipertensão pulmonar assumem papel central nos quadros de ICC direita {{ref:ref-acvim-ph-2020}}.\n' +
      '- ==Gatos==: as ==cardiomiopatias miocárdicas== (com claro predomínio do fenótipo hipertrófico — CMH, seguido de CMR, CMD e fenótipos não específicos) superam largamente as valvopatias degenerativas {{ref:ref-acvim-fcm-2020}} {{ref:ref-kittleson-cote-2021}}. Embora raças como Maine Coon, Ragdoll, Sphynx, British Shorthair e Norwegian Forest tenham predisposição genética reconhecida (e Maine Coon/Sphynx possam manifestar doença mais jovens), a ==grande maioria dos gatos atendidos em ICC não possui raça definida (SRD)==, com discreto predomínio de machos. Ao contrário dos cães, muitos gatos chegam ao primeiro atendimento já em edema pulmonar grave, efusão pleural ou tromboembolismo arterial sem histórico prévio conhecido de cardiopatia.\n' +
      '- ==Gatilhos precipitantes e causas secundárias em gatos==: eventos antecedentes recentes como ==estresse agudo, contenção, anestesia, fluidoterapia intravenosa "de rotina" ou administração de corticosteroides== (especialmente formulações de depósito) podem precipitar descompensação súbita de uma cardiomiopatia subclínica. Além disso, ==hipertireoidismo e hipertensão arterial sistêmica== devem ser sistematicamente investigados em gatos adultos/geriátricos com hipertrofia ventricular, pois geram remodelamento secundário ou agravam a cardiomiopatia primária {{ref:ref-acvim-fcm-2020}}.',
  },

  pathogenesisTransmission: {
    iccDuasBombasEmSerieEHemodinamica:
      'Para compreender por que a congestão ocorre e como cada medicamento atua, é indispensável visualizar o coração como ==duas bombas musculares operando em série==, interligadas pela circulação pulmonar e pela circulação sistêmica:\n\n' +
      '- ==Circuito em série==: o coração direito (átrio direito → ventrículo direito → artérias pulmonares) recebe o retorno venoso sistêmico e impulsiona o sangue aos pulmões; o coração esquerdo (átrio esquerdo → ventrículo esquerdo → aorta) recebe o sangue oxigenado das veias pulmonares e o ejeta na circulação sistêmica. Como os dois circuitos estão em série, o débito ejetado por uma bomba precisa ser acomodado pela outra.\n' +
      '- ==Transmissão retrógrada das pressões (*backward failure*)==: quando o coração esquerdo falha em receber ou ejetar sangue sem elevar anormalmente sua pressão diastólica, o sangue encontra resistência para deixar as veias pulmonares, transmitindo a hipertensão diretamente aos capilares pulmonares. Quando o coração direito não acomoda o retorno venoso sistêmico, a pressão eleva-se retrogradamente nas veias cavas, jugulares, hepáticas e leitos venosos sistêmicos.\n' +
      '- ==Falência anterógrada (*forward failure*) e determinantes do débito cardíaco==: o débito cardíaco é definido pela relação ==DC = FC × VS== (em que *DC* é o débito cardíaco, *FC* é a frequência cardíaca e *VS* é o volume sistólico ejetado por batimento). O volume sistólico depende da interação entre três variáveis fundamentais — além do tempo diastólico de enchimento ditado pela própria frequência cardíaca:\n' +
      '  - ==Pré-carga==: estiramento das fibras miocárdicas ao final da diástole, determinado pelo volume/pressão de enchimento e pela complacência ventricular. Pela relação de Frank-Starling, elevar a pré-carga aumenta inicialmente a força contrátil; contudo, no coração insuficiente (parte plana da curva), retenção adicional de líquido eleva pouco o débito cardíaco enquanto dispara perigosamente as pressões venosas, gerando congestão sem corrigir a perfusão.\n' +
      '  - ==Pós-carga==: carga hemodinâmica contra a qual o ventrículo ejeta (resistência vascular, pressão arterial e geometria parietal). O VE enfrenta a circulação sistêmica e o VD enfrenta a circulação pulmonar — razão pela qual a hipertensão arterial sistêmica sobrecarrega o VE e a hipertensão pulmonar sobrecarrega o VD.\n' +
      '  - ==Contratilidade==: capacidade intrínseca do miocárdio de gerar força independentemente de pré-carga e pós-carga. Está reduzida na CMD, mas frequentemente preservada ou hiperdinâmica na CMH felina e na DMVM compensada.',

    iccTabelaSistolicaVsDiastolica: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Disfunção sistólica versus disfunção diastólica: ambas causam ICC',
      headers: ['Característica', 'Disfunção sistólica', 'Disfunção diastólica'],
      rows: [
        ['Problema mecânico central', 'Dificuldade de contrair e ejetar sangue adequadamente', 'Dificuldade de relaxar ativamente ou acomodar o volume sanguíneo sob baixas pressões'],
        ['Exemplo clínico típico', 'Cardiomiopatia dilatada (CMD)', 'Cardiomiopatia hipertrófica felina (CMH) e cardiomiopatia restritiva (CMR)'],
        ['Fração de ejeção (FE)', 'Frequentemente diminuída', 'Pode estar normal ou elevada'],
        ['Pressão de enchimento ventricular', 'Eleva-se com a dilatação e retenção hídrica', 'Eleva-se expressivamente por rigidez parietal e redução do tempo diastólico'],
        ['Causa congestão (edema / efusão)?', 'Sim', 'Sim — o determinante da congestão é a pressão venosa a montante, não a FE baixa'],
        ['Implicação terapêutica central', 'Suporte inotrópico/inodilatador (ex.: pimobendan) frequentemente benéfico conforme caso', 'Evitar taquicardia sustentada (encurta a diástole), hipovolemia excessiva e inotrópicos indiscriminados (especialmente com LVOTO)'],
      ],
    },

    iccStarlingGlicocalixEComplacenciaVascular:
      'A formação de edema e efusões obedece ao equilíbrio microvascular das ==forças de Starling==, refinado pela fisiologia endotelial moderna:\n\n' +
      '- ==Equação clássica e revisão pelo glicocálix endotelial==: ==Jv = Kf[(Pc − Pi) − σ(πc − πi)]==, onde *Jv* é o fluxo líquido transcapilar, *Kf* é a condutância hidráulica da barreira, *Pc* e *Pi* são as pressões hidrostáticas capilar e intersticial, *σ* é o coeficiente de reflexão proteica e *πc* e *πi* são as pressões oncóticas. Na fisiologia contemporânea, o ==glicocálix endotelial== e o espaço subglicocálix regulam o verdadeiro gradiente oncótico local, limitando a reabsorção venular direta e conferindo papel decisivo à ==drenagem linfática== na remoção do filtrado intersticial.\n' +
      '- ==Mecanismo dominante na ICC==: o gatilho principal é a elevação da ==pressão hidrostática capilar (Pc)== secundária à hipertensão venosa (pulmonar > ~20 mmHg ou venosa central > 10–12 cmH₂O). Inicialmente, o aumento do fluxo linfático impede o acúmulo tecidual; quando a taxa de filtração ultrapassa a capacidade linfática, o líquido extravasa para o interstício, alvéolos ou cavidades serosas. A ==hipoalbuminemia concomitante== agrava o processo ao permitir que o edema se forme sob pressões venosas mais baixas.\n' +
      '- ==Por que a fluidoterapia "de manutenção" precipita edema e por que a PVC não protege o pulmão==: a complacência vascular da circulação pulmonar é muito menor que a da circulação sistêmica. Assim, expansões súbitas de volume plasmático (ou eventos agudos sem retenção prévia de sódio, como ruptura de cordoalha tendínea mitral no cão ou taquicardia por estresse no gato com CMH) elevam abruptamente a pressão venosa pulmonar mesmo sem ganho de peso prévio. Por esse mesmo motivo, a ==pressão venosa central (PVC) não reflete com segurança a pressão de enchimento esquerda== — um animal pode apresentar edema pulmonar fulminante com PVC normal ou baixa.',
  },

  pathophysiology: {
    iccRemodelamentoENeurohormonios:
      'A queda relativa do débito cardíaco efetivo ou da pressão de perfusão arterial desencadeia cascatas compensatórias destinadas a sustentar a perfusão cerebral e coronariana, mas que, mantidas cronicamente, tornam-se ==mal-adaptativas== e aceleram a progressão da ICC:\n\n' +
      '- ==Ativação simpática e perda do freio barorreceptor==: barorreceptores arteriais e atriais perdem sensibilidade na ICC crônica, reduzindo o tônus parassimpático inibitório e perpetuando taquicardia, vasoconstrição periférica e maior consumo miocárdico de oxigênio. A exposição prolongada a catecolaminas promove *downregulation* seletivo de receptores β₁-adrenérgicos, enquanto receptores β₂ e α₁ persistem alimentando remodelamento patológico e arritmogênese.\n' +
      '- ==Sistema renina–angiotensina–aldosterona (SRAA) e vasopressina (ADH)==: menor pressão de perfusão renal, estímulo β-adrenérgico renal e menor entrega de Na⁺ à mácula densa liberam renina. A angiotensina II gera vasoconstrição sistêmica, sede, aumento da vasopressina (retenção de água livre → hiponatremia dilucional nos estágios avançados) e vasoconstrição preferencial da arteríola eferente glomerular — o que ajuda a sustentar a filtração glomerular sob baixo débito, porém eleva a fração de filtração e potencializa a reabsorção proximal de sódio e água. Paralelamente, a aldosterona promove retenção tubular distal de sódio, perda de potássio/magnésio e ==fibrose miocárdica e vascular==.\n' +
      '- ==Remodelamento cardíaco estrutural==: estresse parietal crônico, neuro-hormônios (angiotensina II, aldosterona, norepinefrina, endotelina) e citocinas pró-inflamatórias (como TNF-α) induzem hipertrofia miocárdica excêntrica ou concêntrica, apoptose celular, fibrose intersticial e ativação de metaloproteinases/colagenases com deslizamento entre miócitos (*myocyte slippage*), distorcendo progressivamente a geometria das câmaras e agravando a insuficiência valvar funcional.',

    iccFisiopatogeniaEsquerda:
      'Na ==insuficiência cardíaca congestiva esquerda==, a cadeia fisiopatológica evolui em estágios progressivos:\n\n' +
      'Doença da valva mitral ou do ventrículo esquerdo → elevação da pressão de enchimento esquerda → hipertensão atrial esquerda e venosa pulmonar → aumento da pressão hidrostática capilar pulmonar → ==edema intersticial== (espessamento septal, perda de complacência pulmonar e taquipneia precoce) → ==edema alveolar== (preenchimento dos espaços aéreos, desequilíbrio ventilação/perfusão [V/Q], efeito *shunt* e hipoxemia).\n\n' +
      '- ==Por que a frequência respiratória aumenta antes da dispneia exuberante?== O acúmulo inicial de líquido no interstício pulmonar enrijece mecanicamente o parênquima (reduz a complacência pulmonar). Para manter a ventilação minuto com menor gasto elástico por ciclo, o animal adota respirações mais rápidas e superficiais — frequentemente perceptíveis apenas durante o sono profundo, sem esforço abdominal evidente. Somente com o avanço para preenchimento alveolar surgem hipoxemia acentuada, ortopneia, intolerância ao decúbito e insuficiência respiratória. É essa sequência fisiológica que fundamenta a ==contagem domiciliar da frequência respiratória durante o sono== como marcador precoce de descompensação {{ref:ref-acvim-mmvd-2019}}.',

    iccFisiopatogeniaDireitaEBiventricular:
      'Na ==insuficiência cardíaca congestiva direita==, a disfunção do ventrículo direito, doença tricúspide, doença pericárdica ou hipertensão pulmonar elevam a pressão atrial direita e congestionam as veias cavas e toda a drenagem venosa sistêmica:\n\n' +
      '- ==Fígado congestivo e por que a ascite cardíaca é rica em proteínas==: os sinusoides hepáticos possuem endotélio amplamente fenestrado. O aumento da pressão venosa hepática causa distensão sinusoidal, hepatomegalia e produção exuberante de linfa hepática com teor proteico elevado (frequentemente > 3,5 g/dL na ascite). Quando a filtração supera a drenagem linfática, o líquido extravasa para o peritônio, explicando por que a ascite cardiogênica classicamente se comporta como ==transudato modificado== (podendo variar conforme cronicidade, diuréticos e comorbidades).\n' +
      '- ==Lesão hepática congestiva versus hepatite primária==: a estase venosa crônica compromete principalmente os hepatócitos centrolobulares por hipóxia relativa e compressão sinusoidal, podendo levar a elevações moderadas de transaminases/enzimas colestáticas e, em fases prolongadas, fibrose cardíaca ("cirrose cardíaca"). Esse processo é hemodinâmico e não deve ser confundido nem tratado automaticamente como hepatite inflamatória primária.\n' +
      '- ==Congestão esplâncnica e perda proteica==: o edema de parede intestinal e a linfangiectasia secundária à hipertensão venosa sistêmica prejudicam a absorção de nutrientes e de diuréticos orais (furosemida), contribuindo para hiporexia, hipoalbuminemia e caquexia cardíaca.\n' +
      '- ==Por que ICC esquerda e direita coexistem (ICC biventricular)?== Uma cardiopatia inicialmente esquerda (como a DMVM) gera hipertensão venosa pulmonar sustentada que pode evoluir com vasoconstrição e remodelamento vascular pulmonar adicional (hipertensão pulmonar pós-capilar combinada / Grupo 2), elevando a pós-carga do VD até desencadear dilatação direita e ascite. No sentido oposto, uma insuficiência direita grave reduz o retorno sanguíneo através dos pulmões para o coração esquerdo (além de deslocar o septo interventricular para a esquerda), diminuindo o enchimento do VE e precipitando baixo débito sistêmico {{ref:ref-acvim-ph-2020}}.',
  },

  clinicalSignsPathophysiology: {
    iccTabelaComparacaoFenotipos: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Comparação clínica dos fenótipos de ICC: esquerda, direita e biventricular',
      headers: ['Característica', 'ICC esquerda', 'ICC direita', 'ICC biventricular'],
      rows: [
        ['Principal território congesto', 'Circulação pulmonar (veias e capilares pulmonares)', 'Circulação venosa sistêmica (cavas, fígado, abdome)', 'Territórios pulmonar e sistêmico simultaneamente'],
        ['Manifestação clássica', 'Edema pulmonar cardiogênico', 'Ascite e congestão hepática', 'Edema pulmonar associado a ascite/efusões'],
        ['Taquipneia', 'Muito comum (inclusive precoce durante o sono)', 'Pode ocorrer por efusão pleural, compressão diafragmática por ascite volumosa ou pneumopatia associada', 'Muito comum'],
        ['Dispneia / ortopneia', 'Frequente na descompensação aguda', 'Variável (intensa se efusão pleural ou ascite tensa)', 'Frequente e grave'],
        ['Distensão / pulso jugular', 'Não é característica de ICC esquerda isolada', 'Sugestiva de pressão atrial direita elevada', 'Pode ocorrer'],
        ['Hepatomegalia congestiva', 'Incomum isoladamente', 'Frequente em casos moderados a avançados', 'Possível'],
        ['Efusão pleural', 'Possível — manifestação muito frequente em gatos', 'Possível (drenagem pleural parietal/sistêmica)', 'Possível e frequentemente volumosa'],
        ['Sopro cardíaco', 'Depende da cardiopatia (pode faltar em gatos e na CMD)', 'Depende da cardiopatia (pode faltar em HP ou tamponamento)', 'Depende da cardiopatia'],
        ['Hipoperfusão / baixo débito', 'Pode ocorrer', 'Pode ocorrer', 'Risco elevado'],
        ['Prioridade imediata', 'Descongestionar pulmões e sustentar oxigenação', 'Reduzir congestão sistêmica e corrigir/tratar causa direita (excluir tamponamento)', 'Manejo conjunto com vigilância rigorosa do débito cardíaco e do equilíbrio hidroeletrolítico'],
      ],
    },

    iccApresentacaoEsquerdaCao:
      'Na ==ICC esquerda canina==, a evolução varia do quadro subclínico inicial à insuficiência respiratória aguda potencialmente fatal:\n\n' +
      '- ==Estágios iniciais ou transição para descompensação==: aumento gradual da frequência respiratória durante o sono, redução da tolerância ao exercício, inquietação noturna (dificuldade em permanecer deitado em decúbito lateral) e apatia. Na DMVM, o sopro sistólico apical esquerdo geralmente existe anos antes do primeiro episódio de edema {{ref:ref-acvim-mmvd-2019}}.\n' +
      '- ==A armadilha da tosse na DMVM==: tosse crônica em cães cardiopatas de raças pequenas frequentemente decorre de doença brônquica/colapso traqueal concomitante ou compressão mecânica do brônquio principal esquerdo pelo átrio esquerdo aumentado — ==tosse isolada em um cão cardiopata NÃO comprova edema pulmonar== e não justifica prescrição automática de furosemida sem evidência de congestão.\n' +
      '- ==Descompensação aguda==: taquipneia marcante, ortopneia (cotovelos abduzidos, pescoço estendido, recusa em deitar), ansiedade respiratória, esforço inspiratório/expiratório e hipoxemia. Crepitações pulmonares audíveis à inspiração apoiam o diagnóstico, mas podem estar ausentes nas fases intersticiais. Em edema alveolar fulminante, pode surgir secreção espumosa rósea pelas vias aéreas. A ==cianose é um sinal tardio e ominoso== — jamais se deve aguardá-la para iniciar oxigenoterapia.',

    iccFiguraCaoEsquerdaMmvd: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/radiografia-eco-cao-icc-esquerda-mmvd-2026.webp',
      fallbackSrc: 'https://cdn.ncbi.nlm.nih.gov/pmc/blobs/1abb/13283187/afbe1fc50bf2/11259_2026_11358_Fig1_HTML.webp',
      alt: 'Radiografias torácicas e painel ecocardiográfico de cão com degeneração mixomatosa da valva mitral e ICC esquerda mostrando cardiomegalia, edema pulmonar perihilar/caudodorsal, aumento atrial esquerdo LA/Ao 2,34 e padrão transmitral restritivo',
      shortCaption: 'Fig. 1 — Cão com DMVM e ICC esquerda: radiografias (a, b) com cardiomegalia/edema e ecocardiografia (c–g) demonstrando LA/Ao 2,34, FE preservada (93%) e fluxo restritivo E/A 2,93.',
      caption:
        'Figura 1 — Integração radiográfica e ecocardiográfica em cão com degeneração mixomatosa da valva mitral (DMVM) e insuficiência cardíaca congestiva esquerda. (a, b) Radiografias torácicas lateral e ventrodorsal evidenciando cardiomegalia acentuada, aumento atrial esquerdo com deslocamento dorsal da traqueia e padrão intersticial-alveolar compatível com congestão/edema pulmonar. (c, d) Folhetos mitrais espessados com regurgitação mitral importante ao Doppler contínuo. (e) Modo M ilustrando dilatação ventricular excêntrica com fração de ejeção elevada (93%) — reforçando que FE normal/alta não exclui ICC em cardiopatias regurgitativas. (f) Corte paraesternal direito eixo curto mostrando aumento atrial esquerdo severo (LA/Ao = 2,34). (g) Doppler transmitral com padrão restritivo (E = 2,20 m/s; E/A = 2,93; DecT = 75 ms), indicando elevação das pressões de enchimento. Fonte: *Veterinary Research Communications*, 2026 (PMC13283187), Figura 1 (DOI: 10.1007/s11259-026-11358-2). Licença: CC BY 4.0.',
      display: 'wide',
    },

    iccApresentacaoDireitaEParticularidadesFelinas:
      'Enquanto a ICC direita tende a instalar-se de forma mais insidiosa, a ICC felina frequentemente irrompe como emergência respiratória abrupta com sinais enganosos:\n\n' +
      '- ==ICC direita==: aumento progressivo do volume abdominal (ascite com balotamento positivo), desconforto ao deitar, redução do apetite, perda progressiva de massa muscular (caquexia cardíaca), hepatomegalia palpável, distensão e/ou pulso jugular anormal e, eventualmente, efusão pleural ou edema subcutâneo em áreas pendentes. A congestão venosa gastrointestinal causa náuseas, hiporexia e redução da biodisponibilidade oral de diuréticos. ==Atenção==: ascite sem distensão venosa sistêmica, sem alterações cardíacas direitas ou sem evidência de pressões de enchimento elevadas não deve ser rotulada automaticamente como cardíaca.\n' +
      '- ==Particularidades clínicas felinas==: diferentemente do cão, ==a tosse é incomum na ICC felina== (tosse crônica no gato direciona primariamente para asma/bronquite ou parasitoses pulmonares). Um gato pode portar cardiomiopatia grave com ==ausculta cardíaca sem sopro==; por outro lado, detectar ==ritmo de galope (S4)==, arritmia, hipotermia ou hipoperfusão em gato dispneico eleva fortemente a probabilidade de ICC. Além disso, gatos em ICC podem apresentar ==taquicardia, frequência cardíaca normal ou até bradicardia== (contrastando com cães, que tipicamente chegam taquicárdicos). A ==respiração com boca aberta em gato é sinal de falência respiratória iminente== e impõe redução imediata de contenção e oxigenoterapia calma. Na ICC esquerda felina, tanto ==edema pulmonar de distribuição variável== quanto ==efusão pleural== (ou ambos simultaneamente) são apresentações corriqueiras {{ref:ref-acvim-fcm-2020}} {{ref:ref-kittleson-cote-2021}}.',

    iccFiguraGatoKittleson2021: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/radiografia-gato-icc-kittleson-cote-2021.jpg',
      fallbackSrc: 'https://journals.sagepub.com/cms/10.1177/1098612X211021819/asset/01474752-2690-4411-8ec8-dba919bac7bf/assets/images/large/10.1177_1098612x211021819-fig4.jpg',
      alt: 'Radiografias torácicas comparativas de apresentações distintas de insuficiência cardíaca felina mostrando efusão pleural severa e cardiomegalia com aumento biatrial',
      shortCaption: 'Fig. 2 — Apresentações radiográficas da ICC felina: efusão pleural volumosa (a, b) versus cardiomegalia acentuada com dilatação atrial (c, d) (Kittleson & Côté, 2021).',
      caption:
        'Figura 2 — Apresentações radiográficas distintas de insuficiência cardíaca congestiva em gatos com cardiomiopatia. (a, b) Projeções lateral e ventrodorsal demonstrando efusão pleural volumosa obliterando a silhueta cardíaca e retraindo os lobos pulmonares — cenário em que a toracocentese terapêutica precede exames prolongados. (c, d) Cardiomegalia severa com alargamento acentuado da base cardíaca/átrios ("silhueta alargada") evidenciando o remodelamento avançado. Ilustra por que a ICC felina pode manifestar-se por efusão pleural, edema pulmonar ou combinação de ambos. Fonte: Kittleson MD, Côté E (2021), *Journal of Feline Medicine and Surgery*, 23:1009–1027 (PMC8723176), Figura 4 (DOI: 10.1177/1098612X211021819). Acesso aberto PMC.',
      display: 'wide',
    },

    iccBaixoDebitoEPerfisHemodinamicos:
      'Um dos pilares do raciocínio clínico avançado é ==separar congestão (pressão de enchimento elevada) de hipoperfusão (baixo débito anterógrado)==:\n\n' +
      '- Um paciente pode apresentar edema pulmonar intenso e ainda manter pressão arterial sistólica normal ou elevada (perfil quente e úmido), enquanto outro chega em choque cardiogênico profundo com hipotensão, extremidades frias, pulsos filiformes, obnubilação mental, oligúria, hiperlactatemia e colapso, apresentando pouca ou muita congestão.\n' +
      '- Na prática de emergência, a adaptação clínica dos ==quatro perfis hemodinâmicos== (originários da cardiologia humana; úteis como linguagem operacional à beira do leito, embora não constituam escore prognóstico formalmente validado em cães e gatos) previne condutas perigosas:\n' +
      '- ==Alerta máximo no perfil "Frio e úmido" (congestão + choque/hipoperfusão)==: nem escalonar furosemida de forma cega nem administrar bolus agressivo de cristaloide é conduta universal segura. A prioridade absoluta é identificar a causa mecânica ou elétrica da hipoperfusão (ex.: disfunção sistólica severa na CMD, taquiarritmia/bradiarritmia maligna, tamponamento cardíaco, LVOTO ou tromboembolismo) e conduzir estabilização hemodinâmica monitorada em terapia intensiva.',

    iccTabelaPerfisHemodinamicos: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Perfis hemodinâmicos à beira do leito: separando perfusão de congestão',
      headers: ['Perfil hemodinâmico', 'Perfusão periférica', 'Congestão (edema / efusão)', 'Interpretação clínica e alerta'],
      rows: [
        ['Quente e seco', 'Preservada', 'Ausente', 'Estável / compensado — manter monitorização e terapia de base sem escalonar diuréticos.'],
        ['Quente e úmido', 'Preservada', 'Presente', 'ICC congestiva clássica sem choque evidente — foco em descongestão controlada, oxigênio e redução de pós-carga quando indicada.'],
        ['Frio e seco', 'Reduzida', 'Ausente ou discreta', 'Baixo débito sem sobrecarga hídrica evidente — investigar hipovolemia excessiva por diurético, arritmia, disfunção sistólica ou tamponamento antes de qualquer diurese.'],
        ['Frio e úmido', 'Reduzida', 'Presente', 'Congestão + hipoperfusão (alto risco / choque cardiogênico) — UTI, ECG, PA e ecocardiografia rápida; evitar escalada cega de furosemida ou bolus indiscriminado de fluidos.'],
      ],
    },
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico interativo — Triagem de emergência, confirmação convergente e classificação por espécie',
      subtitle:
        'Regras 1–4 e 7 do raciocínio clínico guiado: estabilização prioritária antes de radiografias, diferenciação de múltiplos fenótipos simultâneos, reconhecimento explícito de incerteza diagnóstica e separação entre critérios caninos e felinos.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Regra 1 · Triagem',
          speciesTag: 'both',
          title: 'Há instabilidade grave ou emergência respiratória/hemodinâmica?',
          quickSummary:
            'Dispneia importante, ortopneia, respiração com boca aberta em gatos, cianose, colapso, hipotensão/hipoperfusão grave ou suspeita de tamponamento interrompem o fluxo eletivo de exames.',
          quickFacts: [
            { label: 'SE SIM', value: 'Oxigênio, mínima manipulação e POCUS à beira do leito' },
            { label: 'SE NÃO', value: 'Seguir para anamnese, exame físico dirigido e imagem programada' },
          ],
          details: [
            {
              label: 'Por que essa decisão vem antes de qualquer radiografia?',
              content:
                'Pacientes com edema pulmonar severo ou efusão pleural volumosa — especialmente gatos — podem sofrer parada cardiorrespiratória durante contenção para radiografias ortogonais ou ecocardiografia prolongada. Estabilizar primeiro salva vidas e não impede o diagnóstico.',
              tone: 'danger',
            },
            {
              label: 'Conduta imediata e alternativa sem POCUS',
              content:
                'Fornecer O₂ com mínimo estresse (gaiola/fluxo), manter decúbito esternal, considerar ansiólise leve (butorfanol) e realizar POCUS torácico/cardíaco rápido. Se POCUS não estiver disponível em gato instável com alta suspeita, considerar dose empírica criteriosa de furosemida IM/IV ou toracocentese se sinais clássicos de efusão (sons pulmonares abafados ventralmente) e NT-proBNP rápido assim que seguro {{ref:ref-acvim-fcm-2020}}.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Regra 7 · Obstrutivo',
          speciesTag: 'both',
          title: 'Excluir tamponamento cardíaco antes de rotular ICC direita',
          quickSummary:
            'Diante de ascite, distensão jugular, bulhas cardíacas abafadas, pulso paradoxal ou colapso, checar imediatamente o espaço pericárdico no POCUS.',
          quickFacts: [
            { label: 'SE SIM (tamponamento)', value: 'Emergência pericárdica → pericardiocentese imediata' },
            { label: 'Armadilha fatal', value: 'Diuréticos reduzem pré-carga e agravam o colapso' },
          ],
          details: [
            {
              label: 'Fisiopatologia da emergência pericárdica',
              content:
                'A compressão externa das câmaras direitas impede o enchimento diastólico; o paciente depende criticamente da pressão venosa para manter algum débito. Escalonar furosemida sem drenar o pericárdio precipita choque refratário.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Regra 2 · Fenótipo',
          speciesTag: 'both',
          title: 'Qual(is) território(s) de congestão estão presentes? (Permite fenótipos simultâneos)',
          quickSummary:
            'Identificar se há edema pulmonar provável, efusão pleural clinicamente importante, ascite com congestão venosa sistêmica, combinação biventricular ou ausência de evidência conclusiva.',
          quickFacts: [
            { label: 'Edema pulmonar', value: 'Ramo ICC esquerda → avaliar átrio esquerdo e descongestão' },
            { label: 'Efusão pleural dispneica', value: 'Priorizar toracocentese + investigar etiologia' },
            { label: 'Ascite + jugular/CVC', value: 'Ramo ICC direita → ecocardiografia e causa de base' },
            { label: 'Indeterminado', value: 'Não iniciar protocolo automático de ICC; ampliar diferenciais' },
          ],
          details: [
            {
              label: 'Múltiplos fenótipos no mesmo paciente',
              content:
                'Um gato com CMH frequentemente combina edema pulmonar e efusão pleural; um cão com DMVM avançada e hipertensão pulmonar pode apresentar edema pulmonar e ascite simultaneamente (ICC biventricular). Cada compartimento exige conduta coordenada.',
              tone: 'tip',
            },
            {
              label: 'O valor do estado "Diagnóstico incerto / Indeterminado"',
              content:
                'Exemplo clássico: gato com B-lines focais e suspeita de pneumonia, mas sem aumento atrial esquerdo. B-lines sozinhas NÃO comprovam edema cardiogênico; o caminho correto é listar o que falta (ecocardiografia, radiografia pós-estabilização, NT-proBNP, citologia/hemograma) em vez de presumir ICC {{ref:ref-ward-2018}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Regra 4 · Convergência',
          speciesTag: 'both',
          title: 'A congestão cardiogênica está sustentada por evidências convergentes?',
          quickSummary:
            'Separar rigorosamente "evidências de cardiopatia estrutural" (sopro, aumento atrial, remodelamento) de "evidências de congestão ativa" (edema alveolar/intersticial, veias pulmonares distendidas, B-lines difusas + AE dilatado, efusão cardiogênica ou congestão venosa sistêmica).',
          quickFacts: [
            { label: 'Cão com sopro + tosse + AE aumentado, SEM edema', value: 'Cardiopatia presente; ICC NÃO confirmada' },
            { label: 'POCUS felino (Ward 2018)', value: '> 1 ponto com > 3 B-lines: S 78,8% | E 83,3%' },
          ],
          details: [
            {
              label: 'Prevenindo o maior erro ambulatorial na DMVM',
              content:
                'Um cão pequeno com sopro mitral e tosse crônica frequentemente tem broncomalácia, colapso traqueal ou compressão brônquica sem edema pulmonar. Confirmar ausência de congestão evita uso desnecessário de furosemida em estágio B2 e direciona para pimobendan preventivo quando critérios preenchidos {{ref:ref-acvim-mmvd-2019}}.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Regra 3 · Espécie e Estágio',
          speciesTag: 'both',
          title: 'Definir cardiopatia específica e estadiamento próprio da espécie',
          quickSummary:
            'Aplicar ACVIM 2019 (A–D + critérios EPIC para B2) em cães com DMVM; aplicar ACVIM 2020 de cardiomiopatias felinas (incluindo LVOTO e risco tromboembólico) em gatos; aplicar protocolos próprios em CMD, cardiopatias congênitas e hipertensão pulmonar.',
          quickFacts: [
            { label: 'Cão DMVM B2 (EPIC)', value: 'LA/Ao ≥ 1,6 | LVIDDN ≥ 1,7 | VHS > 10,5 | sem ICC' },
            { label: 'Gato CMH/CMR', value: 'Não usar cortes caninos do EPIC; checar LVOTO e contraste atrial' },
          ],
          details: [
            {
              label: 'Investigação complementar obrigatória após estabilização',
              content:
                'Completar ecocardiografia detalhada, ECG (arritmias), pressão arterial sistêmica, ureia/creatinina, Na⁺/K⁺/Cl⁻, urinálise e exames etiológicos conforme espécie (T4 total em gatos ≥ 6–7 anos, pesquisa de dirofilariose em áreas endêmicas, taurina em fenótipo CMD) {{ref:ref-acvim-mmvd-2019}} {{ref:ref-acvim-fcm-2020}} {{ref:ref-acvim-ph-2020}}.',
              tone: 'tip',
            },
          ],
        },
      ],
    },

    iccExameFisicoDirigido:
      'A avaliação clínica inicial deve ser sistemática, rápida e adaptada à tolerância respiratória do paciente. Cada achado do exame físico responde a uma pergunta fisiopatológica específica — nunca deve ser interpretado isoladamente:',

    iccTabelaExameFisico: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Exame físico dirigido na suspeita de ICC: o que procurar e como interpretar',
      headers: ['Parâmetro avaliado', 'Achados pesquisados', 'Interpretação clínica'],
      rows: [
        ['Frequência respiratória', 'Taquipneia persistente em repouso ou sono', 'Sugere congestão pulmonar precoce, mas também ocorre em dor, febre, anemia e pneumopatia primária.'],
        ['Esforço respiratório', 'Ortopneia, extensão cervical, abdução de cotovelos, respiração abdominal ou boca aberta em gato', 'Quantifica gravidade e urgência de estabilização — não define sozinho a etiologia.'],
        ['Ausculta pulmonar', 'Crepitações inspiratórias, abafamento de sons ventrais (efusão), sibilos', 'Crepitações sugerem edema/pneumopatia; abafamento ventral sugere efusão pleural; ausculta normal não exclui ICC felina.'],
        ['Ausculta cardíaca', 'Sopro (localização/intensidade), ritmo de galope (S3/S4), arritmia, bulhas abafadas', 'Orienta cardiopatia e necessidade de ECG/eco; galope em gato dispneico é altamente sugestivo de cardiopatia, enquanto ausência de sopro não exclui CMH.'],
        ['Perfusão periférica', 'Qualidade do pulso femoral, mucosas, temperatura de extremidades, TPC, nível de consciência', 'Detecta síndrome de baixo débito e choque cardiogênico (perfis frios).'],
        ['Pressão arterial sistêmica', 'Hipotensão (PAS < 90 mmHg) ou hipertensão (PAS ≥ 160 mmHg)', 'Direciona segurança de vasodilatadores, IECA e diuréticos; identifica hipertrofia secundária em gatos.'],
        ['Abdome', 'Ascite (balotamento), hepatomegalia, dor/desconforto abdominal', 'Rastreia congestão venosa sistêmica (ICC direita) ou comorbidades abdominais.'],
        ['Veias jugulares', 'Distensão persistente ou pulsação jugular retrógrada acima do terço inferior do pescoço', 'Forte indicador clínico de elevação da pressão atrial direita ou obstrução pericárdica.'],
        ['Peso corporal, ECC e EMM', 'Ganho rápido por retenção hídrica ou perda de massa muscular epaxial/temporal', 'Monitora resposta à descongestão e identifica caquexia cardíaca.'],
      ],
    },

    iccRadiografiaToracicaCaesVsGatos:
      'A radiografia torácica permanece um exame fundamental para documentar edema pulmonar e cardiomegalia — ==desde que o paciente esteja estável o suficiente para tolerar o posicionamento==. Sua interpretação exige reconhecer contrastes marcantes entre cães e gatos:\n\n' +
      '- ==Cães — edema pulmonar cardiogênico==: os achados clássicos combinam cardiomegalia, aumento atrial esquerdo (elevação dorsal da traqueia distal e afastamento dos brônquios principais), distensão das veias pulmonares (mais calibrosas que as artérias correspondentes) e infiltrado intersticial progredindo para padrão alveolar com broncogramas aéreos. Na DMVM, a distribuição ==perihilar e caudodorsal== (frequentemente mais pronunciada à direita) é clássica, mas varia com decúbito, gravidade e pneumopatias concomitantes. Índices como ==VHS (*vertebral heart score*)== e ==VLAS (*vertebral left atrial size*)== auxiliam na quantificação da silhueta cardíaca respeitando referências raciais, porém ==o VHS mede tamanho cardíaco — não mede pressão de enchimento nem comprova edema pulmonar== {{ref:ref-acvim-mmvd-2019}}.\n' +
      '- ==Gatos — distribuição variável e armadilha da "regra canina" (Diana et al., 2022)==: em estudo retrospectivo de 71 gatos com cardiopatia esquerda ecocardiograficamente confirmada e edema pulmonar cardiogênico (excluindo animais com efusão pleural moderada a grave), Diana et al. (2022) observaram ==padrão intersticial puro em 57,8%==, ==padrão misto intersticial-alveolar em 38%==, ==distribuição multifocal em 84,5%== e ==simétrica em 75%== — sendo a ==localização ventral frequente==, em contraste direto com o padrão perihilar/caudodorsal clássico do cão {{ref:ref-diana-2022}}. Além disso, cardiomegalia pode ser sutil em cardiomiopatias concêntricas ou restritivas, e grandes efusões pleurais obscurecem completamente o coração até a realização da toracocentese {{ref:ref-kittleson-cote-2021}}.',

    iccFiguraGatoDiana2022: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/radiografia-gato-aumento-atrial-esquerdo-diana-2022.jpg',
      fallbackSrc: 'https://cdn.ncbi.nlm.nih.gov/pmc/blobs/6635/10812342/3d8f69a77ed7/10.1177_1098612X221121922-fig2.jpg',
      alt: 'Radiografias torácicas ventrodorsais de gatos com edema pulmonar cardiogênico destacando com linhas amarelas o aumento atrial esquerdo e a cardiomegalia',
      shortCaption: 'Fig. 3 — Aumento atrial esquerdo delineado (contorno amarelo) em gatos com edema pulmonar cardiogênico (Diana et al., 2022).',
      caption:
        'Figura 3 — Radiografias torácicas ventrodorsais de dois gatos com cardiopatia esquerda e edema pulmonar cardiogênico, ilustrando o abaulamento acentuado da aurícula/átrio esquerdo (linhas pontilhadas amarelas) e opacidades pulmonares associadas. Na espécie felina, o edema cardiogênico apresenta padrão predominantemente multifocal (84,5%) e frequentemente ventral, diferindo do padrão caudodorsal canino clássico. Fonte: Diana A et al. (2022), *Journal of Feline Medicine and Surgery*, 24:1138–1147 (PMC10812342), Figura 2 (DOI: 10.1177/1098612X221121922). Acesso aberto PMC.',
      display: 'wide',
    },

    iccPocusPulmonarECardiaco:
      'A ultrassonografia *point-of-care* (POCUS) torácica e cardíaca revolucionou a triagem de emergência por poder ser realizada ==à beira do leito, em decúbito esternal ou em estação, com mínimo estresse==:\n\n' +
      '- ==Ultrassonografia pulmonar (Vet BLUE e B-lines)==: B-lines são artefatos verticais hiperecogênicos em "cauda de cometa" que nascem na linha pleural, estendem-se até o fundo da tela sem atenuação e acompanham o deslizamento pulmonar. Surgem quando líquido ou tecido aumenta a densidade acústica dos septos interlobulares/alvéolos na interface ar–tecido. ==Regra crítica: B-lines NÃO são sinônimo de edema cardiogênico== — ocorrem também em pneumonia, edema pulmonar não cardiogênico, contusão pulmonar, fibrose intersticial e neoplasias.\n' +
      '- ==Desempenho diagnóstico em gatos dispneicos (Ward et al., 2018)==: em estudo prospectivo com 51 gatos em desconforto respiratório, a detecção de ==mais de um ponto pulmonar com mais de três B-lines por local== atingiu ==sensibilidade de 78,8%==, ==especificidade de 83,3%== e ==AUC ROC de 0,833== para diferenciar ICC de doença respiratória não cardíaca — com desempenho ainda maior quando combinado ao POCUS cardíaco (aumento atrial esquerdo e pesquisa de efusão pericárdica) e ao NT-proBNP {{ref:ref-ward-2018}}.\n' +
      '- ==POCUS cardíaco focado — seis objetivos essenciais==: (1) avaliar aumento evidente do átrio esquerdo (no corte paraesternal direito eixo curto, razão LA/Ao claramente elevada — especialmente > 2 em gatos dispneicos — apoia fortemente etiologia cardíaca); (2) observar alterações grosseiras da contratilidade sistólica; (3) checar dilatação de câmaras direitas e achatamento septal; (4) pesquisar ==efusão pericárdica== (em gatos dispneicos, mesmo uma lâmina discreta de líquido pericárdico apoia fortemente ICC; em cães/gatos com ascite, exclui tamponamento); (5) quantificar ==efusão pleural== para guiar toracocentese; e (6) rastrear sinais sugestivos de sobrecarga ventricular direita/hipertensão pulmonar. O POCUS orienta a emergência, mas ==não substitui a ecocardiografia completa==.\n' +
      '- ==Por que o tamanho atrial esquerdo é tão informativo?== A dilatação atrial reflete remodelamento frente à elevação sustentada de volume ou pressão; associada a B-lines difusas bilaterais ou efusão pleural, eleva dramaticamente a probabilidade pós-teste de ICC — porém, isoladamente, prova cardiopatia estrutural e não edema ativo.',

    iccFiguraVetBlueJanelas: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/pocus-vetblue-janelas-toracicas-smartdog-2025.webp',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/1647547/xml-images/fvets-12-1647547-g0001.webp',
      alt: 'Posicionamento das quatro janelas acústicas bilaterais do protocolo Vet BLUE em cão: caudodorsal (Cd), perihilar (Ph), média (Md) e cranial (Cr)',
      shortCaption: 'Fig. 4 — Janelas acústicas torácicas do protocolo Vet BLUE (Cd, Ph, Md e Cr) para triagem pulmonar à beira do leito (SMARTDOG, 2025).',
      caption:
        'Figura 4 — Demonstração topográfica das quatro janelas acústicas bilaterais do protocolo Vet BLUE em cada hemitórax: (1) caudodorsal (Cd), (2) perihilar (Ph), (3) média (Md) e (4) cranial (Cr). A avaliação sistematizada permite mapear a distribuição regional das B-lines sem impor contenção radiográfica ao paciente dispneico. Fonte: Estudo SMARTDOG (2025), *Frontiers in Veterinary Science*, 12:1647547, Figura 1 (DOI: 10.3389/fvets.2025.1647547). Licença: CC BY 4.0.',
      display: 'wide',
    },

    iccFiguraPocusBLines: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/pocus-pulmonar-b-lines-smartdog-2025.webp',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/1647547/xml-images/fvets-12-1647547-g0002.webp',
      alt: 'Imagens ultrassonográficas pulmonares demonstrando linha pleural entre sombras costais, B-line isolada no painel G e B-lines confluentes no painel H',
      shortCaption: 'Fig. 5 — Ultrassonografia pulmonar à beira do leito: linha pleural/costelas (C), B-line isolada (G) e B-lines confluentes compatíveis com síndrome intersticial-alveolar (H) (SMARTDOG, 2025).',
      caption:
        'Figura 5 — Exemplos ultrassonográficos de avaliação pulmonar à beira do leito destacando a linha pleural hiperecogênica entre as sombras acústicas costais (C), um artefato vertical isolado (G: *Single B Line*) e múltiplos artefatos verticais fusionados (H: *Confluent B Lines*). B-lines difusas bilaterais aumentam muito a suspeita de edema cardiogênico quando integradas ao aumento atrial esquerdo, mas não são específicas de ICC quando analisadas isoladamente. Fonte: Estudo SMARTDOG (2025), *Frontiers in Veterinary Science*, 12:1647547, Figura 2 (DOI: 10.3389/fvets.2025.1647547). Licença: CC BY 4.0.',
      display: 'wide',
    },

    iccEcocardiografiaEPressaoPulmonar:
      'A ==ecocardiografia completa com Doppler== é o exame de referência para definir a cardiopatia subjacente, classificar o estágio estrutural, identificar complicações (trombo atrial, ruptura de cordoalha, LVOTO) e orientar o plano crônico:\n\n' +
      '- ==Cautela obrigatória na estimativa da hipertensão pulmonar (ΔP = 4v²)==: a equação simplificada de Bernoulli (==ΔP = 4v²==, onde *v* é a velocidade máxima do jato de regurgitação tricúspide em m/s) estima o gradiente pressórico sistólico entre o ventrículo direito e o átrio direito — ==não mede diretamente a pressão arterial pulmonar==. Para inferir pressão sistólica pulmonar, seria necessário ausência de obstrução na via de saída do VD (estenose pulmonar) e soma da pressão atrial direita estimada. Por isso, o consenso ACVIM 2020 recomenda classificar a ==probabilidade ecocardiográfica de hipertensão pulmonar== (baixa, intermediária ou alta) integrando a velocidade do jato tricúspide com sinais anatômicos em três sítios (ventrículos, artéria pulmonar e átrio direito/veia cava caudal), em vez de diagnosticar HP a partir de uma única medida isolada {{ref:ref-acvim-ph-2020}}.',

    iccTabelaEcocardiografiaCompleta: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Parâmetros essenciais da ecocardiografia completa na ICC',
      headers: ['Parâmetro ecocardiográfico', 'Relevância clínica e decisão associada'],
      rows: [
        ['Relação LA/Ao', 'Quantifica o aumento atrial esquerdo; central no estadiamento B2 da DMVM canina (≥ 1,6) e na estratificação de risco de ICC e tromboembolismo em gatos.'],
        ['LVIDDN', 'Diâmetro diastólico ventricular esquerdo normalizado ao peso; avalia remodelamento excêntrico na DMVM (≥ 1,7 no critério EPIC) e na CMD.'],
        ['Fração de encurtamento (FEc) e fração de ejeção (FE)', 'Avaliam função sistólica, sempre interpretadas em conjunto com pré-carga, pós-carga e cardiopatia (podem estar supranormais na DMVM e na CMH).'],
        ['Anatomia da valva mitral e via de saída do VE', 'Detecta espessamento mixomatoso, prolapso, ruptura de cordoalha tendínea e movimento sistólico anterior (SAM) causando LVOTO dinâmica em gatos.'],
        ['Doppler transmitral (ondas E, A, E/A, tempo de desaceleração) e tecidual', 'Avalia relaxamento diastólico e sugere elevação das pressões de enchimento (ex.: padrão restritivo com onda E elevada e DecT curto).'],
        ['Velocidade de regurgitação tricúspide (TRPG = 4v²)', 'Contribui para estimar a probabilidade ecocardiográfica de hipertensão pulmonar quando integrada a sinais estruturais direitos.'],
        ['Dimensões de AD e VD', 'Avaliam sobrecarga volumétrica/pressórica direita e progressão para ICC direita ou biventricular.'],
        ['Geometria e movimento do septo interventricular', 'Achatamento septal diastólico/sistólico indica sobrecarga pressórica ou volumétrica importante do VD.'],
        ['Veia cava caudal e veias hepáticas', 'Dilatação e perda de colapsabilidade apoiam elevação da pressão atrial direita e congestão venosa sistêmica.'],
        ['Espaço pericárdico', 'Detecta efusão pericárdica e sinais de tamponamento (colapso diastólico do AD/VD), mudando radicalmente a conduta emergencial.'],
        ['Contraste espontâneo ("fumaça") e trombo atrial esquerdo', 'Marcadores críticos de estase sanguínea e alto risco de tromboembolismo arterial em gatos — sustentam tromboprofilaxia com clopidogrel.'],
      ],
    },

    iccPocusVeiaCavaCaudal:
      'A avaliação ultrassonográfica da ==veia cava caudal (CVC)== e das veias hepáticas complementa a investigação da congestão venosa sistêmica e do estado volêmico. Em ICC direita avançada ou tamponamento cardíaco, a elevação da pressão atrial direita promove dilatação da CVC com redução da variação respiratória de seu diâmetro e ingurgitamento das veias hepáticas ("sinal do sinal de trânsito / *tree-trunk*"). Contudo, respiração espontânea vigorosa, variações da pressão intratorácica, ventilação mecânica e comorbidades influenciam significativamente essas mensurações — ==não existe um ponto de corte único universal de diâmetro da CVC capaz de diagnosticar isoladamente ICC direita em todos os cães e gatos== {{ref:ref-boysen-2021}}.',

    iccFiguraCvcBoysen2021: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/insuficiencia-cardiaca-congestiva-caes-gatos/pocus-veia-cava-caudal-boysen-2021.webp',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/630643/xml-images/fvets-08-630643-g0007.webp',
      alt: 'Ultrassonografia POCUS da veia cava caudal (CVC), fígado e vesícula biliar comparando diâmetro colabado/normal e veia cava caudal distendida na avaliação de volume e congestão venosa',
      shortCaption: 'Fig. 6 — POCUS da veia cava caudal (CVC), fígado e vesícula biliar (GB) na avaliação da congestão venosa sistêmica (Boysen & Gommeren, 2021).',
      caption:
        'Figura 6 — Avaliação ultrassonográfica *point-of-care* da veia cava caudal (CVC) em janela subxifoide/hepática, demonstrando suas relações anatômicas com o parênquima hepático (*Liver*) e a vesícula biliar (*GB*), comparando uma CVC colapsada/estreita (A) e uma CVC dilatada/túrgida (B). Recurso valioso para complementar a avaliação de congestão venosa sistêmica na suspeita de ICC direita ou tamponamento, mas que não fecha diagnóstico isoladamente sem integração ecocardiográfica e clínica. Fonte: Boysen SR, Gommeren K (2021), *Frontiers in Veterinary Science*, 8:630643, Figura 7 (DOI: 10.3389/fvets.2021.630643). Licença: CC BY 4.0.',
      display: 'wide',
    },

    iccBiomarcadoresNtProBnpELaboratorio:
      'Os biomarcadores cardíacos e os exames laboratoriais cumprem papéis distintos: os primeiros apoiam a triagem de sobrecarga miocárdica em cenários selecionados, enquanto o painel hematobioquímico, eletrolítico e gasométrico garante segurança terapêutica e detecta complicações cardiorrenais.\n\n' +
      '- ==NT-proBNP — para que serve e para que NÃO serve==: o peptídeo natriurético tipo B (BNP) e seu fragmento N-terminal inativo (NT-proBNP) elevam-se diante de estiramento e estresse parietal miocárdico. São ==marcadores de sobrecarga estrutural/hemodinâmica, não medições diretas de pressão atrial nem de edema pulmonar==. Valores elevados aumentam a probabilidade de causa cardíaca na dispneia, mas ==falsos positivos== ocorrem em cardiopatias subclínicas coexistindo com doença respiratória primária, doença renal crônica/azotemia (menor depuração renal), hipertireoidismo e hipertensão sistêmica; ==falsos negativos== podem surgir por limitações analíticas ou níveis abaixo do ponto de corte. Em estudo multicêntrico de gatos com ==efusão pleural==, o ensaio quantitativo apresentou sensibilidade de ==95,2%== e especificidade de ==82,4%== no plasma, e sensibilidade de ==100%== com especificidade de ==76,5%== no líquido pleural (resultados específicos da população e do kit avaliado, não transferíveis automaticamente a outros ensaios) {{ref:ref-hezzell-ntprobnp-effusion}}. O consenso ACVIM 2020 recomenda considerar o ==teste rápido qualitativo (SNAP NT-proBNP)== quando POCUS não estiver disponível para diferenciar dispneia cardíaca de não cardíaca em gatos, mas ==jamais retardar o tratamento emergencial== de um paciente instável aguardando retorno de exame quantitativo laboratorial {{ref:ref-acvim-fcm-2020}}.\n' +
      '- ==Síndrome cardiorrenal (CvRD) — por que a creatinina sobe na ICC?==: a deterioração renal na ICC resulta de dois mecanismos hemodinâmicos principais — (1) ==baixo fluxo arterial efetivo== (queda do débito cardíaco reduzindo a pressão de filtração glomerular) e (2) ==congestão venosa renal== (elevação da pressão venosa transmitida ao parênquima renal encapsulado, reduzindo o gradiente transrenal de perfusão) — somados eventualmente à contração excessiva do volume plasmático por diuréticos ou doença renal prévia {{ref:ref-consenso-cardiorrenal-2015}}. Cerca de 25% dos cães já chegam azotêmicos na admissão por ICC. Portanto, ==elevação discreta da creatinina não ordena automaticamente suspender a furosemida== (se o animal continua congesto, manter a descongestão controlada é vital), tampouco autoriza manter a dose sem reavaliação: é indispensável integrar congestão ativa, perfusão, pressão arterial, hidratação e tendência laboratorial.\n' +
      '- ==Análise de líquido cavitário==: em ascite ou efusão pleural, avaliar proteínas totais, contagem celular nucleada e citologia. A ascite cardiogênica frequentemente é um ==transudato modificado== (proteína frequentemente > 2,5–3,5 g/dL), mas esse perfil é inespecífico — exigindo diferenciar hepatopatias com hipertensão portal, hipoalbuminemia, neoplasias, peritonite, obstrução vascular e doença pericárdica. Na efusão pleural, diferenciar quilotórax (que inclusive pode ser secundário à própria ICC felina), piotórax, neoplasias, hemotórax e hipoalbuminemia. ==A melhora clínica após toracocentese prova apenas que a efusão restringia a ventilação — não comprova etiologia cardíaca==.',

    iccTabelaNtProBnpEfusao: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Desempenho do NT-proBNP quantitativo em gatos com efusão pleural (estudo multicêntrico)',
      headers: ['Tipo de amostra (ensaio quantitativo)', 'Sensibilidade', 'Especificidade', 'Ressalva de interpretação'],
      rows: [
        ['Plasma', '95,2%', '82,4%', 'Elevado poder de rastreamento, porém sujeito a falsos positivos por azotemia, hipertireoidismo ou cardiopatia subclínica.'],
        ['Líquido pleural', '100%', '76,5%', 'Sensibilidade máxima no estudo original; pontos de corte e desempenho dependem estritamente do kit/laboratório utilizado.'],
      ],
    },

    iccTabelaExamesLaboratoriais: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Painel laboratorial e gasométrico na ICC: alterações esperadas e significado clínico',
      headers: ['Exame', 'Alteração possível', 'Mecanismo fisiopatológico e impacto na conduta'],
      rows: [
        ['Hemograma', 'Hemoconcentração', 'Contração do volume plasmático / desidratação secundária à diurese vigorosa ou hipodipsia.'],
        ['Hemograma', 'Anemia (atenção se Ht < 22%)', 'Reduz oferta de O₂ e eleva demanda de débito cardíaco, podendo precipitar ou agravar ICC; investigar etiologia.'],
        ['Ureia e creatinina', 'Azotemia pré-renal ou renal', 'Baixo débito, congestão venosa renal, diuréticos/IECA ou DRC/LRA concomitante; interpretar em conjunto com estado congestivo.'],
        ['Sódio (Na⁺)', 'Hiponatremia', 'Retenção de água livre mediada por vasopressina (ADH não osmótica — marcador de gravidade) e/ou efeito diurético; contraindica tiazídicos se < 130 mEq/L.'],
        ['Cloro (Cl⁻)', 'Hipocloremia', 'Perda renal tubular induzida por diuréticos de alça acompanhada frequentemente de alcalose metabólica.'],
        ['Potássio (K⁺)', 'Hipocalemia', 'Maior entrega distal de Na⁺ com troca por K⁺ sob aldosterona + hiporexia; predispõe a arritmias, intoxicação digitálica, fraqueza e queda de taurina em gatos.'],
        ['Potássio (K⁺)', 'Hipercalemia', 'Disfunção renal, IECA, espironolactona ou combinação (monitorização obrigatória após associação).'],
        ['ALT / AST', 'Elevações variáveis', 'Congestão sinusoidal hepática centrolobular, hipoperfusão ou hepatopatia concomitante (não confundir com hepatite primária).'],
        ['FA / GGT', 'Elevações leves a moderadas', 'Congestão hepatobiliar crônica ou comorbidades endócrinas/biliares.'],
        ['Albumina', 'Hipoalbuminemia', 'Caquexia cardíaca, enteropatia congestiva/linfangiectasia secundária, paracentese repetida ou proteinúria; reduz limiar pressórico para edema.'],
        ['Lactato', 'Hiperlactatemia', 'Apoia suspeita de hipoperfusão tecidual/baixo débito ou esforço muscular extremo, mas é inespecífico isoladamente.'],
        ['Troponina I cardíaca', 'Elevação', 'Reflete injúria/necrose miocárdica (miocardite, isquemia relativa por hipertrofia, taquiarritmia); ampla sobreposição em causas não cardíacas de dispneia.'],
        ['Gasometria arterial/venosa', 'Hipoxemia e hipocapnia inicial', 'Edema alveolar com desequilíbrio V/Q e shunt; hiperventilação compensatória inicial reduz PaCO₂.'],
        ['Gasometria arterial/venosa', 'Hipercapnia tardia (elevação de PaCO₂)', 'Sinal de alarme para fadiga da musculatura ventilatória ou doença de vias aéreas associada — avaliar suporte ventilatório.'],
        ['Urinálise (± UPC)', 'Densidade urinária variável, proteinúria ou sedimento', 'Furosemida impede concentração urinária (isostenúria esperada); rastrear nefropatia concomitante e orientar segurança de IECA/diuréticos.'],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico interativo — Conduta por fenótipo, espécie, refratariedade e conflitos medicamentosos',
      subtitle:
        'Regras 5, 6 e 7 aplicadas à prescrição segura: doses de referência sem automatização cega de volume, auditoria obrigatória antes da escalada diurética e barreiras automáticas de contraindicação.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Emergência · Fenótipo',
          speciesTag: 'both',
          title: 'Selecionar a via aguda conforme o fenótipo predominante',
          quickSummary:
            'Diferenciar edema pulmonar canino, edema pulmonar felino, efusão pleural dispneica, ascite/ICC direita e perfil frio e úmido (choque cardiogênico).',
          quickFacts: [
            { label: 'Edema canino (ACVIM 2019)', value: 'O₂ + Furosemida 2 mg/kg IV q1h (até 8 mg/kg/4h) + Pimobendan' },
            { label: 'Edema felino (ACVIM 2020)', value: 'O₂ + mínimo estresse + Furosemida bolus 1–2 mg/kg IV' },
            { label: 'Efusão pleural grave', value: 'Toracocentese prioritária antes de radiografias' },
            { label: 'Frio e úmido (choque)', value: 'UTI: ECG, PA, eco rápido e suporte hemodinâmico' },
          ],
          details: [
            {
              label: 'Regra 5 — Cálculo transparente de dose (exemplo prático sem prescrição automática de mL)',
              content:
                'Para um cão de 7,5 kg com edema pulmonar agudo recebendo dose de referência de furosemida IV de 2 mg/kg: 7,5 kg × 2 mg/kg = 15 mg por administração (sempre sujeito à conferência clínica). O volume em mililitros só deve ser calculado após confirmar a concentração exata da ampola disponível (ex.: 10 mg/mL → 1,5 mL), diferenciando rigorosamente dose por administração de dose total diária (mg/kg/dia).',
              tone: 'tip',
            },
            {
              label: 'Ansiólise e conforto na crise aguda',
              content:
                'Reduzir a ansiedade diminui taquicardia e consumo de oxigênio: butorfanol (0,2–0,3 mg/kg IM/IV em cães; 0,1–0,3 mg/kg IM/IV em gatos) é amplamente utilizado. Em gatos, evitar morfina rotineira na emergência respiratória (preferir butorfanol ou buprenorfina se dor por ATE).',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Regra 7 · Conflitos',
          speciesTag: 'both',
          title: 'Checar barreiras de contraindicação e interações antes de prescrever',
          quickSummary:
            'Seis conflitos terapêuticos críticos exigem bloqueio ou monitorização obrigatória no manejo da ICC.',
          quickFacts: [
            { label: 'Pimobendan + LVOTO felina', value: 'Avaliar obstrução dinâmica; proibido uso automático' },
            { label: 'Sildenafil + ICC esquerda ativa', value: 'Risco de agravar edema pulmonar agudo' },
            { label: 'IECA + Espironolactona', value: 'Monitorar K⁺, creatinina e PA obrigatoriamente' },
            { label: 'Furosemida + Torsemida', value: 'Duplicação de alça — nunca associar rotineiramente' },
          ],
          details: [
            {
              label: 'Outros bloqueios de segurança inegociáveis',
              content:
                '(1) Tamponamento cardíaco: redirecionar imediatamente para pericardiocentese, nunca protocolo convencional de diuréticos. (2) Congestão + hipotensão grave: avaliar débito e perfusão antes de escalonar diurético ou vasodilatador. (3) Betabloqueadores: não iniciar durante descompensação aguda com baixo débito. (4) AINEs + furosemida + IECA: alto risco de injúria renal aguda por perda da vasodilatação aferente mediada por prostaglandinas.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Manutenção · Espécie',
          speciesTag: 'both',
          title: 'Instituir terapia crônica individualizada após descongestão',
          quickSummary:
            'Cães com DMVM estágio C recebem terapia quádrupla individualizada (furosemida na menor dose eficaz + pimobendan + IECA + espironolactona); gatos recebem furosemida VO + clopidogrel se risco trombótico + adjuvantes conforme fenótipo.',
          quickFacts: [
            { label: 'Cão DMVM estágio C', value: 'Furosemida + Pimobendan + Enalapril/Benazepril + Espironolactona' },
            { label: 'Gato estágio C', value: 'Furosemida + Clopidogrel (se risco ATE) ± Pimobendan se sem LVOTO' },
          ],
          details: [
            {
              label: 'Introdução escalonada de IECA e proteção cardiorrenal',
              content:
                'Nem todos os fármacos crônicos precisam ser iniciados no minuto zero da emergência: IECA deve ser introduzido ou ajustado após restabelecimento da perfusão, hidratação e checagem de PA, creatinina e potássio {{ref:ref-acvim-mmvd-2019}} {{ref:ref-consenso-cardiorrenal-2015}}.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Regra 6 · Refratariedade',
          speciesTag: 'both',
          title: 'Auditar 7 pontos antes de diagnosticar Estágio D ou escalonar diuréticos',
          quickSummary:
            'Taquipneia ou recorrência de líquido em paciente tratado exige checar se há congestão real, adesão, dose/unidade, hidratação/rim, sódio/absorção, progressão estrutural e indicação cirúrgica.',
          quickFacts: [
            { label: 'Torsemida', value: 'Nunca 1:1 mg/mg; regra inicial ~5–10% da dose diária total de furosemida' },
            { label: 'Hidroclorotiazida', value: 'Bloqueio sequencial especializado; contraindicada se Na⁺ < 130 mEq/L' },
          ],
          details: [
            {
              label: 'Checklist de auditoria da refratariedade (Regra 6)',
              content:
                'Antes de trocar para torsemida ou adicionar tiazídico, responder: (1) A manifestação é congestão confirmada ou doença respiratória/arritmia concomitante? (2) O tutor administra corretamente todos os fármacos? (3) A dose diária está correta e na unidade certa? (4) Há hipovolemia, hipotensão ou piora renal? (5) Há ingestão excessiva de sódio (petiscos/água abrandada) ou congestão intestinal prejudicando absorção (avaliar furosemida SC)? (6) A cardiopatia progrediu (ex.: ruptura de cordoalha, FA, hipertensão pulmonar)? (7) Há indicação de encaminhamento cardiológico para reparação mitral cirúrgica ou TEER?',
              tone: 'warning',
            },
          ],
        },
      ],
    },

    iccCincoObjetivosEEmergenciaCanina:
      'Todo plano terapêutico na ICC organiza-se em ==cinco objetivos fisiopatológicos==: (1) ==descongestionar== (reduzir retenção de Na⁺/água e pressões venosas); (2) ==otimizar a hemodinâmica== conforme a natureza sistólica, diastólica, valvar ou vascular; (3) ==modular a ativação neuro-hormonal deletéria== (SRAA); (4) ==tratar etiologia e complicações== (arritmias, HP, tamponamento, ATE); e (5) ==prevenir iatrogenias== (hipotensão, hipovolemia, azotemia progressiva, distúrbios eletrolíticos e interações).\n\n' +
      '- ==Como a furosemida atua e por que funciona rapidamente na emergência==: a furosemida é secretada ativamente como ácido orgânico no túbulo proximal e bloqueia o ==cotransportador Na⁺/K⁺/2Cl⁻ (NKCC2)== na porção espessa ascendente da alça de Henle (onde ~25% do filtrado é reabsorvido). O bloqueio promove natriurese e clorurese intensas, impede a formação do gradiente medular hipertônico e aumenta a excreção de água, reduzindo o volume extracelular e as pressões de enchimento atrial esquerda em minutos após administração IV (além de venodilatação renal/sistêmica discreta mediada por prostaglandinas). Por via oral, a diurese inicia em ~1 h, atinge pico em 1–2 h e dura cerca de 6 h.\n' +
      '- ==Protocolo de emergência canina — Edema pulmonar por DMVM estágio C (ACVIM 2019)==: a dose repetida de furosemida IV (2 mg/kg inicial, podendo repetir 2 mg/kg aproximadamente a cada hora conforme resposta até o teto de 8 mg/kg em 4 horas, ou transição para CRI 0,66–1 mg/kg/h em edema ameaçador à vida) é um ==limite máximo guiado pela resposta respiratória== — não uma ordem para aplicar todas as doses automaticamente. Assim que a frequência e o esforço respiratório começam a cair, os intervalos são ampliados e oferece-se água livre após estabelecimento da diurese, reavaliando pressão arterial, função renal e eletrólitos {{ref:ref-acvim-mmvd-2019}}.',

    iccTabelaEmergenciaCanina: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Emergência canina: edema pulmonar cardiogênico por DMVM estágio C (ACVIM 2019)',
      headers: ['Intervenção', 'Protocolo de referência (cães)', 'Observações e critérios de segurança'],
      rows: [
        ['Oxigenoterapia', 'Método de menor estresse mantendo oxigenação adequada (gaiola, fluxo ou cateter nasal)', 'Evitar FiO₂ > 50% por mais de 24 h; manter decúbito esternal e ambiente fresco.'],
        ['Ansiólise (se ansiedade intensa)', 'Butorfanol 0,2–0,3 mg/kg IM ou IV (pode repetir conforme resposta)', 'Reduz taquipneia ansiosa, taquicardia e consumo miocárdico de O₂.'],
        ['Furosemida IV em bolus', '2 mg/kg IV inicial; repetir 2 mg/kg ~q1h conforme resposta até máximo de 8 mg/kg em 4 h', 'Titular pela queda da FR e esforço; não administrar todas as doses obrigatoriamente; monitorar PA, rim e eletrólitos.'],
        ['Furosemida em infusão contínua (CRI)', '0,66–1 mg/kg/h IV após bolus inicial (por ex. durante 4–6 h)', 'Considerar em edema pulmonar grave, potencialmente fatal ou pouco responsivo aos bolus iniciais.'],
        ['Pimobendan', '0,25–0,3 mg/kg VO q12h (ou formulação injetável quando disponível)', 'Iniciar assim que a via oral for segura e sem contraindicação; atua como inodilatador (sensibilizador de Ca²⁺ + PDE III/V) sem elevar proporcionalmente o consumo de O₂.'],
        ['Toracocentese', 'Drenagem pleural guiada quando efusão pleural significativa contribui para dispneia', 'Não trata edema alveolar; prioritária quando há componente pleural relevante.'],
        ['Vasodilatação arterial/venosa IV (casos selecionados)', 'Nitroprussiato de sódio (0,5–1 até 5 µg/kg/min em SG 5% protegido da luz, máx. 24 h) ou hidralazina VO/IV criteriosa', 'Reservada a regurgitação mitral grave com edema refratário e pressão arterial adequada (alvo PAS ~90–100 mmHg), sob monitorização intensiva contínua.'],
        ['Suporte ventilatório mecânico', 'Intubação e ventilação controlada em insuficiência respiratória refratária / fadiga ventilatória', 'Indicado diante de hipoxemia refratária, hipercapnia crescente ou esgotamento respiratório.'],
      ],
    },

    iccEmergenciaFelinaEEfusaoPleural:
      'Na ==emergência felina==, a fragilidade frente ao estresse de contenção e a elevada prevalência de efusão pleural exigem disciplina técnica específica {{ref:ref-acvim-fcm-2020}}:\n\n' +
      '- ==Sequência felina de ouro==: Oxigênio + ambiente silencioso/mínima manipulação (considerar butorfanol 0,1–0,3 mg/kg IM/IV se ansiedade) → POCUS torácico/cardíaco breve à beira do leito → identificar edema pulmonar, efusão pleural ou ambos → ==furosemida IV (ou IM se acesso venoso exigir contenção excessiva) em bolus de 1–2 mg/kg== repetidos conforme gravidade e resposta respiratória → ==toracocentese imediata== se houver efusão pleural moderada a grave → ecocardiografia completa apenas após estabilização {{ref:ref-acvim-fcm-2020}}.\n' +
      '- ==Bolus versus infusão contínua de furosemida em gatos (Ohad et al., 2018)==: em gatos com ICC aguda, a infusão contínua de furosemida não demonstrou superioridade clínica sobre bolus intermitentes e associou-se a maior risco de desidratação e azotemia — razão pela qual os ==bolus titulados pela frequência respiratória== (reduzindo nitidamente a dose assim que a FR cai para ~40 irpm) são preferidos na maioria dos cenários felinos {{ref:ref-ohad-2018}}.\n' +
      '- ==Pimobendan no gato em crise==: o consenso ACVIM 2020 permite considerá-lo em gatos com baixo débito, hipotensão ou redução da função sistólica ==desde que excluída obstrução clinicamente relevante da via de saída do ventrículo esquerdo (LVOTO)==; em estudo prospectivo randomizado em gatos com CMH e ICC, o grupo com obstrução dinâmica teve maior chance de retirada precoce ou aumento de furosemida sob pimobendan {{ref:ref-acvim-fcm-2020}}.\n' +
      '- ==Efusão pleural — por que a toracocentese supera o diurético na fase aguda?== O líquido livre no espaço pleural colapsa mecanicamente os pulmões e restringe sua expansão, disparando o trabalho respiratório. A furosemida reduz lentamente a formação futura de líquido, mas ==não remove de imediato grandes volumes já acumulados==. A toracocentese produz alívio ventilatório instantâneo e frequentemente deve preceder radiografias em gatos (e cães) dispneicos por efusão moderada a grave. Após drenar, trata-se a congestão de base para reduzir recorrências.',

    iccManejoIccDireitaEAscite:
      'O tratamento da ==ICC direita com ascite== começa confirmando que a ascite decorre de pressão venosa sistêmica elevada (e excluindo tamponamento cardíaco). Os diuréticos auxiliam a reduzir a retenção de sódio e água, porém a ==conduta etiológica== define o sucesso clínico:\n\n' +
      '- ==Displasia tricúspide==: quantificar gravidade da regurgitação, remodelamento de AD/VD, arritmias e avaliar intervenções especializadas.\n' +
      '- ==Hipertensão pulmonar==: classificar o grupo ACVIM 2020 e tratar a doença primária; quando secundária à cardiopatia esquerda (Grupo 2), otimizar rigorosamente a ICC esquerda antes de considerar qualquer vasodilatador pulmonar {{ref:ref-acvim-ph-2020}}.\n' +
      '- ==Doença pericárdica==: diferenciar tamponamento agudo (pericardiocentese imediata) de pericardite constritiva (avaliação cirúrgica especializada) — não tentar resolver apenas escalonando diuréticos.\n' +
      '- ==CMD biventricular==: combinar diurético, pimobendan e controle rigoroso de arritmias (como fibrilação atrial).\n' +
      '- ==Quando realizar abdominocentese terapêutica?== Indicada na ascite muito volumosa e tensa que causa desconforto abdominal, restrição diafragmática/dispneia ou inapetência. ==Não se deve drenar todo o líquido indiscriminadamente==: devido ao alto teor proteico da linfa hepática e ao equilíbrio dinâmico com o compartimento intravascular, drenagens totais repetidas podem induzir hipotensão e espoliação proteica severa (frequentemente limita-se a retirada controlada ao volume necessário para alívio clínico, em torno de até metade do volume estimado, monitorando perfusão e PA).',

    iccTerapiaCronicaCaesEGatos:
      'Após resolução da crise aguda, o objetivo crônico é ==manter o paciente sem congestão utilizando a menor dose diurética eficaz==, associada aos fármacos com evidência sólida para a espécie e cardiopatia:\n\n' +
      '- ==Terapia crônica em cães com DMVM estágio C (ACVIM 2019)==: baseia-se em furosemida (ajustada à menor dose eficaz), pimobendan, IECA (enalapril ou benazepril) e espironolactona {{ref:ref-acvim-mmvd-2019}}. ==Por que associar espironolactona?== Embora seja um diurético fraco em comparação à furosemida, ela antagoniza receptores mineralocorticoides (via metabólito ativo canrenona, meia-vida ~20 h), mitigando fibrose miocárdica, disfunção endotelial e remodelamento promovidos pela aldosterona. A combinação ==IECA + espironolactona exige monitorização obrigatória de potássio, creatinina e pressão arterial== (especialmente em cães com doença renal concomitante; evitar espironolactona em hipercalemia, doença de Addison, anúria ou LRA).\n' +
      '- ==Por que o tratamento crônico felino difere radicalmente do canino?== Na maioria dos gatos, o defeito dominante é ==disfunção diastólica (relaxamento/enchimento)==, e não falência contrátil; além disso, não existem grandes ensaios clínicos felinos equivalentes ao EPIC ou QUEST demonstrando ganho universal de sobrevida com pimobendan ou IECA. Em gatos com LVOTO dinâmica, aumentar contratilidade pode agravar o gradiente obstrutivo. Portanto, ==IECA, betabloqueadores e bloqueadores de canal de cálcio NÃO devem ser prescritos automaticamente a todo gato com CMH e ICC== — cada classe requer indicação fisiopatológica específica (ex.: diltiazem para controle de frequência na fibrilação atrial; atenolol selecionado em obstrução dinâmica sintomática fora da fase congestiva descompensada; taurina quando há fenótipo de CMD/disfunção sistólica global) {{ref:ref-acvim-fcm-2020}}.',

    iccTabelaCronicaCanina: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Terapia crônica de referência em cães com DMVM estágio C (ACVIM 2019)',
      headers: ['Fármaco', 'Dose canina de referência', 'Finalidade e cautelas principais'],
      rows: [
        ['Furosemida', 'Frequentemente 2 mg/kg VO q12h inicialmente; titular à menor dose eficaz (faixa habitual 1–3 mg/kg VO q8–24h)', 'Controle da congestão; monitorar FR em repouso, peso, hidratação, creatinina, Na⁺, K⁺ e Cl⁻.'],
        ['Pimobendan', '0,25–0,3 mg/kg VO q12h', 'Inodilatação e melhora hemodinâmica (evidência QUEST/EPIC); administrar de forma consistente.'],
        ['Enalapril', '0,5 mg/kg VO q12h (protocolo ACVIM estágio C)', 'Modulação do SRAA; introduzir/ajustar após confirmar perfusão, PA adequada, função renal e K⁺.'],
        ['Benazepril', '0,5 mg/kg VO q12h (protocolo ACVIM estágio C)', 'Alternativa de IECA com excreção biliar parcial; mesmas cautelas de PA, creatinina e K⁺.'],
        ['Espironolactona', '2 mg/kg VO q24h (ou dividido q12h conforme protocolo)', 'Antagonismo mineralocorticoide e bloqueio do remodelamento; monitorar K⁺ e função renal quando associada a IECA.'],
        ['Torsemida', '0,1–0,2 mg/kg VO q12–24h (casos selecionados)', 'Alternativa mais potente e de longa duração na congestão persistente/refratária; nunca converter 1:1 com furosemida; alto rigor de monitorização renal (CARPODIEM).'],
      ],
    },

    iccTabelaCronicaFelina: {
      kind: 'clinicalTable',
      caption: 'Tabela 13 — Terapia crônica de referência em gatos em estágio C (ACVIM 2020)',
      headers: ['Fármaco', 'Dose felina de referência', 'Indicação e cautelas específicas'],
      rows: [
        ['Furosemida', '0,5–2 mg/kg VO q8–12h', 'Terapia central para manter descongestão na menor dose eficaz; monitorar azotemia e hipocalemia.'],
        ['Clopidogrel', '18,75 mg/gato VO q24h', 'Tromboprofilaxia de primeira linha em gatos com risco tromboembólico (AE moderado/grave, contraste espontâneo, trombo ou ATE prévio; FAT CAT).'],
        ['Pimobendan', '0,625–1,25 mg/gato VO q12h', 'Individualizado conforme fenótipo (disfunção sistólica ou refratariedade); evitar em LVOTO clinicamente relevante.'],
        ['Torsemida', '0,1–0,2 mg/kg VO q24h', 'Considerar na refratariedade, especialmente quando a furosemida ultrapassa ~6 mg/kg/dia; monitorar função renal e eletrólitos rigorosamente.'],
        ['Espironolactona', '1–2 mg/kg VO q12–24h', 'Evidência clínica limitada em gatos; monitorar eletrólitos, creatinina e possível dermatite ulcerativa facial.'],
        ['Taurina', '250 mg/gato VO q12h', 'Especialmente indicada em fenótipo de disfunção sistólica global (CMD) enquanto deficiência nutricional não for excluída.'],
      ],
    },

    iccCmdHipertensaoPulmonarERefratariedade:
      'Cenários cardiológicos específicos exigem protocolos diferenciados além do modelo clássico da DMVM:\n\n' +
      '- ==Cardiomiopatia dilatada (CMD) canina==: exige investigar causas genéticas, nutricionais (taurina/dietas associadas), tóxicas e taquicardiomiopatias. Na fase congestiva, combina-se diurético e pimobendan (além de IECA/espironolactona conforme estabilidade). Diante de ==fibrilação atrial com resposta ventricular rápida==, o controle da frequência é essencial — podendo empregar diltiazem e/ou digoxina (janela terapêutica estreita, monitoração sérica obrigatória, risco elevado de toxicidade na azotemia e hipocalemia). ==Betabloqueadores não devem ser iniciados durante descompensação aguda com baixo débito==; sua modulação crônica requer estabilidade e avaliação cardiológica.\n' +
      '- ==Hipertensão pulmonar (ACVIM 2020) e o risco do sildenafil no Grupo 2==: a classificação em 6 grupos (1: arterial pulmonar; 2: doença cardíaca esquerda; 3: respiratória/hipóxia; 4: tromboembólica; 5: parasitária; 6: multifatorial) determina o tratamento {{ref:ref-acvim-ph-2020}}. O ==sildenafil não é um fármaco universal para toda ascite cardíaca==. Na HP secundária à cardiopatia esquerda (Grupo 2), dilatar arteríolas pulmonares aumenta o retorno venoso para um átrio esquerdo já sob alta pressão, podendo ==precipitar ou agravar edema pulmonar agudo==. Apenas em cães selecionados do Grupo 2 com HP pós-capilar combinada grave e congestão esquerda controlada o consenso descreve início cauteloso (ex.: 0,5 mg/kg VO q8h), jamais como prescrição automática.\n' +
      '- ==ICC refratária (estágio D) e mecanismos de resistência diurética==: oito fatores principais explicam a perda de resposta aos diuréticos: (1) avidez renal aumentada por sódio; (2) ativação persistente do SRAA; (3) má absorção intestinal por edema de mucosa; (4) entrega tubular reduzida por baixo débito, azotemia (competição por ácidos orgânicos) ou AINEs; (5) hipertrofia e adaptação absortiva dos segmentos distais do néfron; (6) falhas de adesão; (7) dieta/petiscos ou água abrandada ricos em sódio (> 150 ppm); e (8) progressão da cardiopatia.\n' +
      '- ==Retenção pós-diurético versus fenômeno de frenagem diurética==: a ==retenção pós-diurético== ocorre quando o efeito curto da furosemida cessa antes da próxima dose, gerando rebote ávido de reabsorção de Na⁺ no intervalo; já o ==fenômeno de frenagem (*braking phenomenon*)== reflete adaptação tubular distal estrutural e neuro-hormonal progressiva com redução da natriurese a cada dose. Estratégias avançadas (sempre após auditoria da Regra 6) incluem uso pontual de ==furosemida subcutânea== (contornando edema intestinal), transição para ==torsemida== ou ==bloqueio sequencial do néfron== com tiazídico (ex.: hidroclorotiazida em dose inicial baixa, 1–2 mg/kg VO q48h, sob vigilância rigorosa em 5–7 dias — ==contraindicada em hiponatremia < 130 mEq/L ou hipocalemia== pelo alto risco de depleção volêmica e LRA).\n' +
      '- ==Por que a torsemida NÃO pode ser convertida mg por mg?== A torsemida possui potência ==10 a 20 vezes superior à da furosemida==, biodisponibilidade oral muito alta (80–100%), efeito prolongado (~12 h, pico em ~2 h no cão e ~4 h no gato) e menor caliurese, porém maior risco de azotemia {{ref:ref-carpodiem-2020}}. A estimativa prática inicial corresponde a ==5–10% da dose diária total de furosemida== (regra farmacológica aproximada, não conversão matemática rígida). ==Exemplo crítico==: um cão recebendo 4 mg/kg/dia de furosemida ==jamais== deve receber 4 mg/kg/dia de torsemida — a dose inicial de referência ficaria em torno de 0,2–0,4 mg/kg/dia (dividida q12–24h), ajustada conforme resposta clínica e função renal.',

    iccTabelaFarmacosAtencaoEspecial: {
      kind: 'clinicalTable',
      caption: 'Tabela 14 — Fármacos cardiovasculares de atenção especial e alertas toxicológicos/hemodinâmicos',
      headers: ['Classe / Fármaco', 'Principal alerta clínico e monitorização'],
      rows: [
        ['Furosemida e torsemida', 'Hipovolemia, azotemia, hipocloremia, hiponatremia, alcalose metabólica e distúrbios de potássio; nunca associar rotineiramente dois diuréticos de alça.'],
        ['IECA (enalapril, benazepril)', 'Hipotensão, queda aguda da pressão de filtração glomerular (especialmente em depletados) e hipercalemia; evitar associação imprudente com AINEs.'],
        ['Espironolactona', 'Hipercalemia (sobretudo com IECA ou DRC) e, em gatos, possível dermatite ulcerativa facial; contraindicada em Addison, hipercalemia e anúria.'],
        ['Pimobendan', 'Cautela em obstruções dinâmicas/fixas de via de saída (LVOTO felina, estenose subaórtica) e cenários sem benefício demonstrado.'],
        ['Betabloqueadores (atenolol, carvedilol, esmolol)', 'Efeito inotrópico negativo pode agravar choque/baixo débito durante descompensação aguda; titular apenas em pacientes compensados (exceto antiarrítmico monitorado).'],
        ['Digoxina', 'Janela terapêutica estreita; toxicidade (anorexia, vômito, arritmias) acelerada por azotemia e hipocalemia; monitorar concentração sérica (quase em desuso em gatos).'],
        ['Sildenafil', 'Pode precipitar ou piorar edema pulmonar na hipertensão pulmonar secundária à cardiopatia esquerda (Grupo 2) ou doença veno-oclusiva pulmonar.'],
        ['Nitroprussiato de sódio', 'Hipotensão profunda e toxicidade por cianeto em infusões prolongadas (> 24 h); exige bomba de infusão, proteção da luz e monitorização arterial contínua.'],
        ['Antitrombóticos (clopidogrel, anticoagulantes)', 'Risco hemorrágico e interações medicamentosas; clopidogrel inibe irreversivelmente plaquetas por 3–7 dias; indicar conforme risco tromboembólico real (CURATIVE 2019/2022).'],
      ],
    },

    iccTerapiasControversasENutricao:
      'A medicina baseada em evidências exige também reconhecer condutas históricas sem suporte robusto ou extrapolações prematuras da medicina humana:\n\n' +
      '- ==Nitroglicerina tópica (pomada 2%)==: amplamente utilizada historicamente como venodilatador coadjuvante no edema pulmonar, mas a evidência clínica controlada de benefício real em cães e gatos é insuficiente para mantê-la como pilar terapêutico central.\n' +
      '- ==Corticosteroides==: não tratam edema pulmonar cardiogênico; pela atividade mineralocorticoide/expansora de volume plasmático, podem promover retenção de sódio/água e ==descompensar gatos ou cães cardiopatas==.\n' +
      '- ==Broncodilatadores==: não resolvem edema cardiogênico (e metilxantinas podem induzir taquicardia e arritmias); reservar exclusivamente a doença broncopulmonar concomitante devidamente documentada.\n' +
      '- ==Fluidoterapia intravenosa rotineira "para proteger os rins"==: erro grave e frequente. Administrar cristaloides simultaneamente a diuréticos apenas por azotemia discreta pode precipitar novo edema pulmonar devido à baixa complacência vascular pulmonar; fluidoterapia em cardiopata só se justifica mediante indicação hemodinâmica documentada (hipovolemia severa, choque hipovolêmico/anorexia com desidratação franca sem congestão ativa) sob monitorização estreita.\n' +
      '- ==Inibidores SGLT2 (dapagliflozina, empagliflozina)==: embora tenham transformado o tratamento da insuficiência cardíaca humana, ==não existe até o momento evidência clínica veterinária suficiente para incorporá-los como terapia rotineira universal da ICC em cães ou gatos==.\n' +
      '- ==Nutrição, sódio e caquexia cardíaca==: transições dietéticas devem ser graduais e iniciadas ==após estabilização da crise aguda== (nunca durante internação com hiporexia). Evitar restrição extrema de sódio em cães pré-clínicos sem ICC (pode ativar SRAA); na ICC estágios C/D, adotar restrição moderada de sódio, eliminar petiscos salgados e avaliar o teor de sódio na água de beber (> 150 ppm em água abrandada) em casos refratários. Garantir ingestão calórica e proteica adequadas para combater a ==caquexia cardíaca== (perda muscular associada a citocinas inflamatórias e pior sobrevida).',

    iccTabelaDezCenariosObrigatorios: {
      kind: 'clinicalTable',
      caption: 'Tabela 15 — Matriz de validação clínica: 10 cenários práticos de ICC e a conduta correta esperada',
      headers: ['Cenário clínico simulado', 'Saída diagnóstica / terapêutica correta'],
      rows: [
        ['1. Cão com sopro mitral e aumento atrial, mas sem edema pulmonar ou efusão', 'Cardiopatia estrutural presente; NÃO confirmar ICC automaticamente e NÃO iniciar furosemida apenas pelo sopro/tosse.'],
        ['2. Cão com DMVM estágio B2 assintomático preenchendo critérios do estudo EPIC', 'Indicar pimobendan preventivo (0,25–0,3 mg/kg VO q12h) e seguimento; sem furosemida rotineira.'],
        ['3. Cão com edema pulmonar agudo, dispneia intensa e evidência de DMVM', 'Ativar via de emergência canina: O₂ sem estresse + protocolo de furosemida IV titulado + pimobendan quando seguro + monitorização.'],
        ['4. Gato respirando com boca aberta e grande efusão pleural ao POCUS', 'Oxigenoterapia, mínima manipulação e toracocentese imediata antes de radiografias prolongadas.'],
        ['5. Gato com CMH obstrutiva (SAM/LVOTO) e suspeita de ICC', 'Avaliar gravidade da LVOTO antes de qualquer consideração de pimobendan (não prescrever inotrópico automaticamente).'],
        ['6. Cão com ascite, distensão jugular e sinais ecocardiográficos de hipertensão pulmonar', 'Investigar grupo etiológico da HP (ACVIM 2020) e causa da ICC direita; cautela extrema com sildenafil se houver componente de Grupo 2.'],
        ['7. Cão com ascite, bulhas abafadas e tamponamento cardíaco', 'Emergência pericárdica prioritária (pericardiocentese); NÃO tratar como ICC direita convencional com escalada de diuréticos.'],
        ['8. Cão em ICC com creatinina crescente após aumento recente de furosemida', 'Reavaliar se ainda há congestão ativa, perfusão, pressão arterial, hidratação e tendência renal (síndrome cardiorrenal) antes de suspender ou manter a dose.'],
        ['9. Gato dispneico com B-lines focais e suspeita de pneumonia, sem aumento atrial esquerdo', 'Evidência insuficiente para afirmar edema cardiogênico (estado indeterminado); ampliar investigação respiratória/ecocardiográfica sem presumir ICC.'],
        ['10. Cão necessitando altas doses crônicas de furosemida (≥ 8 mg/kg/dia VO)', 'Auditar adesão/comorbidades (Regra 6), classificar possível estágio D, avaliar torsemida (5–10% da dose diária), bloqueio sequencial e encaminhamento para reparação mitral.'],
      ],
    },
  },

  prevention: {
    iccEstadiamentoAcvimCaesEGatos:
      'A prevenção da descompensação aguda — ou o atraso expressivo de seu primeiro episódio — depende do ==estadiamento correto na fase pré-clínica== e de não misturar critérios de espécies ou cardiopatias diferentes:\n\n' +
      '- ==Critérios do estágio B2 na DMVM canina (estudo EPIC / ACVIM 2019)==: o início de pimobendan na fase pré-clínica atrasa significativamente a ICC quando o cão preenche o conjunto estrutural: sopro mitral ≥ 3/6, ==LA/Ao ≥ 1,6==, ==LVIDDN ≥ 1,7==, ==VHS > 10,5== (respeitando variações raciais) e ==ausência de histórico prévio de ICC== {{ref:ref-epic-2016}} {{ref:ref-acvim-mmvd-2019}}. Esses pontos de corte aplicam-se à DMVM canina e não constituem classificador universal para outras cardiopatias.\n' +
      '- ==Definição rigorosa de estágio D canino (ACVIM 2019)==: inclui a necessidade persistente de ==≥ 8 mg/kg/dia de furosemida VO== (ou dose equipotente de torsemida) para manter conforto clínico apesar de terapia convencional adequada com pimobendan, IECA e espironolactona {{ref:ref-acvim-mmvd-2019}}. Um cão que recebeu altas doses de furosemida IV apenas durante a primeira crise aguda ==não se torna automaticamente estágio D==.\n' +
      '- ==Estadiamento ACVIM 2020 das cardiomiopatias felinas==: segue a arquitetura A–D (A: predisposto sem doença; B1: subclínica de baixo risco sem aumento atrial relevante; B2: subclínica com remodelamento/aumento atrial moderado a grave elevando risco de ICC ou tromboembolismo; C: ICC ou ATE atual/prévio; D: refratária) {{ref:ref-acvim-fcm-2020}}. ==Jamais calcular o estágio B2 felino usando os cortes de LA/Ao e LVIDDN do estudo EPIC canino==.\n' +
      '- ==Rastreamento de CMD pré-clínica canina==: em raças de alto risco (especialmente Dobermann, a partir de ~3 anos anualmente com ecocardiografia e Holter 24 h), identificar a fase oculta permite iniciar pimobendan precocemente (estudo PROTECT) e atrasar ICC ou morte súbita {{ref:ref-protect-2012}}.',

    iccTabelaEstadiamentoAcvimDmvm: {
      kind: 'clinicalTable',
      caption: 'Tabela 16 — Estadiamento ACVIM 2019 da doença valvar mitral mixomatosa (DMVM) em cães',
      headers: ['Estágio ACVIM', 'Definição clínica e estrutural', 'Conduta preventiva / terapêutica central'],
      rows: [
        ['Estágio A', 'Cão sob risco racial (ex.: Cavalier), sem doença estrutural demonstrada', 'Ausculta periódica; sem medicação cardíaca preventiva indiscriminada.'],
        ['Estágio B1', 'DMVM estrutural sem sinais de ICC e sem remodelamento cardíaco suficiente para B2', 'Monitorização ecocardiográfica/radiográfica seriada (6–12 meses); NÃO iniciar furosemida pelo sopro.'],
        ['Estágio B2', 'DMVM assintomática com remodelamento avançado (critérios EPIC: LA/Ao ≥ 1,6; LVIDDN ≥ 1,7; VHS > 10,5)', 'Iniciar pimobendan (0,25–0,3 mg/kg VO q12h), orientar FR domiciliar em repouso e seguimento regular.'],
        ['Estágio C', 'ICC atual ou episódio prévio, responsiva ao tratamento convencional', 'Terapia aguda na crise; manutenção com furosemida (menor dose eficaz) + pimobendan + IECA + espironolactona.'],
        ['Estágio D', 'ICC refratária ao tratamento convencional adequadamente instituído (ex.: ≥ 8 mg/kg/dia furosemida VO persistente)', 'Auditoria completa (Regra 6), torsemida/bloqueio sequencial/furosemida SC e avaliação especializada (incl. reparação mitral).'],
      ],
    },

    iccMonitorizacaoHospitalarEDomiciliar:
      'O controle sustentado da ICC depende tanto da vigilância estruturada na internação quanto da capacitação objetiva da família no domicílio:\n\n' +
      '- ==Protocolo domiciliar da frequência respiratória durante o sono (FRR)==: (1) observar o cão ou gato dormindo profundamente em ambiente tranquilo; (2) contar os movimentos respiratórios (inspiração + expiração = 1 ciclo) por 30 segundos e multiplicar por 2; (3) registrar data e horário para comparar com a linha de base individual. Em cães e gatos com ICC bem controlada, a FR durante o sono ==frequentemente permanece abaixo de 30 irpm== (respeitando variação individual) {{ref:ref-acvim-mmvd-2019}} {{ref:ref-acvim-fcm-2020}}.\n' +
      '- ==Três estados operacionais práticos para acompanhamento== (gatilhos operacionais, não escores prognósticos validados — prevalecendo sempre a tendência individual e os sinais associados):\n' +
      '  - ==Estável==: FR durante o sono na faixa basal do paciente (tipicamente < 30 irpm), sem esforço respiratório e com apetite/disposição preservados.\n' +
      '  - ==Reavaliar==: elevação persistente acima da linha de base individual, especialmente medições repetidas > 30–35 irpm — antecipar retorno para ajuste antes da emergência.\n' +
      '  - ==Emergência==: qualquer esforço respiratório, ortopneia, respiração com boca aberta em gato, cianose, síncope ou deterioração rápida, ==independentemente do número contado==.\n' +
      '- ==Alta hospitalar e retorno precoce (3–7 dias)==: programar reavaliação precoce em 3–7 dias após estabilização ou ajustes relevantes de diuréticos, IECA ou espironolactona para checar peso, FR, pressão arterial, ureia/creatinina e Na⁺/K⁺/Cl⁻. Reforçar ao tutor que ==a melhora clínica não significa cura nem autorização para suspender os medicamentos==, mas sim manter a congestão sob controle com a menor carga farmacológica segura.',

    iccTabelaMonitorizacaoHospitalar: {
      kind: 'clinicalTable',
      caption: 'Tabela 17 — Monitorização hospitalar na descompensação aguda de ICC',
      headers: ['Variável monitorada', 'O que traduz fisiologicamente', 'Decisão clínica decorrente'],
      rows: [
        ['FR e esforço respiratório', 'Tendência da congestão pulmonar e fadiga ventilatória', 'Titular intervalos de furosemida, oxigenoterapia e necessidade de drenagem/ventilação.'],
        ['SpO₂ e/ou gasometria', 'Eficiência das trocas gasosas e ventilação alveolar', 'Intensificar suporte de O₂ ou indicar ventilação mecânica se hipoxemia refratária/hipercapnia.'],
        ['Pressão arterial sistêmica', 'Perfusão sistêmica e tolerância hemodinâmica', 'Guiar vasodilatadores, segurança do início de IECA e detecção de choque cardiogênico.'],
        ['Frequência e ritmo cardíacos (ECG)', 'Arritmias precipitantes ou secundárias e tônus simpático', 'Instituir controle específico de frequência/ritmo (ex.: FA rápida, TV, BAV).'],
        ['Peso corporal diário', 'Perda real de líquido congestivo ou perda nutricional', 'Quantificar eficácia da diurese e alertar para hipovolemia excessiva.'],
        ['Débito urinário', 'Resposta tubular ao diurético e perfusão renal', 'Identificar resistência diurética precoce ou oligúria por LRA/baixo débito.'],
        ['Ureia e creatinina', 'Balanço entre descongestão e filtração glomerular', 'Reconhecer e manejar piora cardiorrenal (CvRD).'],
        ['Sódio, potássio e cloro', 'Efeitos tubulares dos diuréticos e ativação de ADH/SRAA', 'Corrigir hipocalemia/hipercalemia e contraindicar tiazídico em hiponatremia.'],
        ['POCUS / radiografia seriada', 'Resolução objetiva do edema ou acúmulo pleural', 'Confirmar clareamento pulmonar ou pesquisar diagnósticos concorrentes na não resposta.'],
        ['Apetite e massa muscular (EMM)', 'Qualidade de vida e risco de caquexia cardíaca', 'Ajustar dieta, palatabilidade, antieméticos e evitar toxicidades (ex.: digoxina).'],
      ],
    },
  },

  complications: {
    iccComplicacoesEPrognostico:
      'A evolução clínica de longo prazo na ICC é modulada pela interação entre a cardiopatia de base e seis complicações maiores:\n\n' +
      '- ==Edema pulmonar ou efusões recorrentes==: podem sinalizar progressão estrutural (ex.: ruptura de cordoalha tendínea), dose diurética insuficiente, baixa adesão, sobrecarga de sódio ou doença respiratória concomitante.\n' +
      '- ==Síndrome cardiorrenal (CvRD)==: exige equilíbrio contínuo entre controlar a congestão pulmonar/venosa renal e evitar hipovolemia ou hipotensão excessivas {{ref:ref-consenso-cardiorrenal-2015}}.\n' +
      '- ==Arritmias cardíacas==: fibrilação atrial, taquicardia ventricular e bloqueios avançados reduzem drasticamente o tempo de enchimento ou a coordenação sistólica, causando síncope, descompensação súbita e morte súbita.\n' +
      '- ==Caquexia cardíaca==: perda progressiva de massa muscular esquelética mediada por citocinas inflamatórias, maior gasto energético e hiporexia (especialmente marcante na ICC direita/biventricular), associada a pior sobrevida.\n' +
      '- ==Tromboembolismo arterial felino (ATE) — papel do clopidogrel==: ocorre em até ~17% dos gatos com cardiomiopatia (e mais da metade dos gatos com ATE apresenta ICC concomitante). A estase sanguínea em átrios esquerdos dilatados favorece trombose e embolização (classicamente na trifurcação aórtica: dor intensa, paresia/paralisia pélvica, extremidades frias, ausência de pulso e diferença glicêmica > 30 mg/dL entre membro afetado e não afetado; hipotermia < 37,2 °C associa-se a < 50% de sobrevida até a alta). O consenso ACVIM 2020 recomenda ==clopidogrel (18,75 mg/gato VO q24h)== em gatos com fatores de risco (aumento atrial moderado a grave, contraste espontâneo ou baixa velocidade no apêndice atrial), distinguindo ==prevenção primária== (evidência direta limitada) de ==prevenção secundária pós-ATE== (comprovada no estudo FAT CAT) {{ref:ref-acvim-fcm-2020}} {{ref:ref-fatcat-2015}} {{ref:ref-curative-2019}}.\n' +
      '- ==Hipertensão pulmonar secundária==: agrava intolerância ao exercício, síncope e transição de ICC esquerda para ICC biventricular {{ref:ref-acvim-ph-2020}}.\n' +
      '- ==Prognóstico realista — nunca existe uma mediana única universal==: a expectativa de vida varia radicalmente conforme etiologia, fenótipo, presença de choque cardiogênico, resposta diurética, função renal, arritmias e acesso a intervenções estruturais. Um cão com DMVM responsiva em estágio C apresenta trajetória muito distinta de uma CMD com taquiarritmias graves ou de um gato com CMH, ATE e baixo débito.',

    iccSinteseArtigosEssenciais:
      'A conduta contemporânea na ICC veterinária apoia-se em ensaios clínicos randomizados, estudos diagnósticos prospectivos e inovações intervencionistas recentes — cuja interpretação exige atenção rigorosa à população estudada e às limitações de cada desenho:\n\n' +
      '- ==1. EPIC (Boswood et al., 2016)==: ensaio multicêntrico, randomizado, duplo-cego, controlado por placebo em ==360 cães com DMVM estágio B2==. O pimobendan prolongou o tempo mediano até ICC ou morte cardíaca de ==766 dias (placebo) para 1.228 dias (pimobendan)== — ganho de ~462 dias (HR 0,64) {{ref:ref-epic-2016}}. *Limitação*: não extrapolar para estágio B1 ou cardiopatias fora dos critérios estruturais do estudo.\n' +
      '- ==2. QUEST (Häggström et al., 2008)==: estudo prospectivo, multicêntrico, randomizado, simples-cego (260 recrutados; ==252 na análise principal==) em cães com ICC por DMVM. Tempo mediano até morte/eutanásia cardíaca ou falha terapêutica foi de ==267 dias com pimobendan versus 140 dias com benazepril== (HR 0,688; p = 0,0099) {{ref:ref-quest-2008}}. *Limitação*: comparou estratégias específicas e não demonstra que IECA seja dispensável na terapia combinada.\n' +
      '- ==3. PROTECT (Summerfield et al., 2012)==: ensaio multicêntrico, randomizado, mascarado, controlado por placebo em ==76 Dobermans com CMD pré-clínica==. Pimobendan prolongou o tempo mediano até ICC ou morte súbita de ==441 para 718 dias== e a sobrevida global mediana de ==466 para 623 dias== {{ref:ref-protect-2012}}. *Limitação*: população exclusiva de Dobermans; cautela na generalização irrestrita.\n' +
      '- ==4. BESST (Coffman et al., 2021)==: ensaio multicêntrico, duplo-cego, randomizado de superioridade em ==569 cães com ICC por DMVM== (284 espironolactona + benazepril vs. 285 benazepril, ambos com furosemida). A adição de espironolactona reduziu o risco do desfecho cardíaco composto em 360 dias {{ref:ref-besst-2021}}. *Limitação decisiva*: o protocolo ==não permitiu pimobendan==, logo não quantifica diretamente o ganho incremental da espironolactona sobre o protocolo contemporâneo completo com pimobendan.\n' +
      '- ==5. CARPODIEM (Chetboul et al., 2020)==: ensaio multicêntrico, duplo-cego, de não inferioridade em ==319 cães com ICC de início recente por DMVM== (161 torsemida vs. 158 furosemida). Eficácia no dia 14 foi de ==74,4% (torsemida) vs. 73,5% (furosemida)==, comprovando não inferioridade, porém ==eventos adversos renais não graves ocorreram em 41,6% com torsemida versus 19,0% com furosemida== {{ref:ref-carpodiem-2020}}. *Impacto*: alternativa potente e eficaz, mas exige vigilância renal rigorosa.\n' +
      '- ==6. Ward et al. (2018) — POCUS e NT-proBNP em gatos dispneicos==: estudo prospectivo em ==51 gatos== com desconforto respiratório; o critério > 1 sítio pulmonar com > 3 B-lines alcançou ==sensibilidade de 78,8%, especificidade de 83,3% e AUC 0,833==, reforçando o POCUS integrado à avaliação atrial e ao NT-proBNP como triagem à beira do leito {{ref:ref-ward-2018}}.\n' +
      '- ==7. FAT CAT (Hogan et al., 2015)==: ensaio multicêntrico, randomizado, duplo-cego em ==75 gatos sobreviventes de ATE cardiogênico==. Clopidogrel prolongou o tempo mediano até recorrência para ==443 dias versus 192 dias com aspirina== (p = 0,024) {{ref:ref-fatcat-2015}}. *Limitação*: avalia prevenção secundária, não prevenção primária universal.\n' +
      '- ==8. Buchanan, Fries & Kadotani (2025)==: estudo retrospectivo com ==125 gatos em ICC== (73 efusão pleural predominante vs. 52 edema pulmonar predominante). O grupo com ==efusão pleural== apresentou tempo mediano menor até ICC refratária (==44 dias vs. 133 dias==) e menor sobrevida mediana (==155 dias vs. 234 dias==) {{ref:ref-buchanan-2025}}. *Limitação*: estudo observacional; auxilia na estratificação prognóstica, mas jamais deve determinar isoladamente decisões de eutanásia.\n' +
      '- ==9. Reparação mitral cirúrgica e transcateter — TEER / V-Clamp (2026)==: revisão comparativa publicada em 2026 contrasta a plastia mitral aberta com circulação extracorpórea e a reparação transcateter borda a borda (TEER, incluindo dispositivo V-Clamp), propondo critérios de seleção anatômica e por estágio {{ref:ref-mitral-review-2026}}. Uma coorte prospectiva de ==111 cães submetidos a TEER== (2026) documentou ==mortalidade intra-hospitalar de 6,3% e sobrevida em três meses de 86,4%== (com seguimento ecocardiográfico de 1 ano e sobrevida de 2 anos) {{ref:ref-teer-111-2026}}. *Impacto prático*: embora ainda faltem ensaios randomizados cabeça-a-cabeça contra terapia clínica e os resultados dependam fortemente da experiência do centro e da seleção anatômica, cães com DMVM avançada ou necessidade crescente de diuréticos devem receber orientação oportuna sobre encaminhamento cardiológico para avaliação de reparação valvar.',

    iccTabelaEvidenciasChave: {
      kind: 'clinicalTable',
      caption: 'Tabela 18 — Síntese quantitativa dos estudos pivotais e atualizações 2025–2026 na ICC',
      headers: ['Estudo / Ano', 'População e desenho', 'Resultado principal', 'Limitação / Aplicação prática'],
      rows: [
        ['EPIC (2016)', '360 cães DMVM B2 (ECR duplo-cego)', '1.228 vs. 766 dias até ICC/morte cardíaca (HR 0,64)', 'Não extrapolar para B1 ou fora dos critérios estruturais.'],
        ['QUEST (2008)', '252 cães DMVM estágio C (ECR simples-cego)', '267 dias (pimobendan) vs. 140 dias (benazepril); HR 0,688', 'Não invalida o papel complementar do IECA na terapia combinada.'],
        ['PROTECT (2012)', '76 Dobermans com CMD pré-clínica (ECR)', '718 vs. 441 dias até ICC/morte súbita; sobrevida 623 vs. 466 d', 'Exclusivo de Dobermans; cautela na extrapolação racial.'],
        ['BESST (2021)', '569 cães DMVM em ICC (ECR duplo-cego)', 'Espironolactona + benazepril reduziu desfecho composto em 360 d', 'Sem pimobendan no protocolo; interpretar dentro da terapia moderna.'],
        ['CARPODIEM (2020)', '319 cães DMVM ICC inicial (não inferioridade)', 'Eficácia dia 14: 74,4% torsemida vs. 73,5% furosemida; eventos renais 41,6% vs. 19,0%', 'Alternativa eficaz, porém exige monitorização renal rigorosa.'],
        ['Ward et al. (2018)', '51 gatos dispneicos (acurácia prospectiva)', 'POCUS > 1 local com > 3 B-lines: S 78,8%, E 83,3%, AUC 0,833', 'Depende do operador; integrar ao átrio esquerdo e NT-proBNP.'],
        ['FAT CAT (2015)', '75 gatos pós-ATE cardiogênico (ECR duplo-cego)', 'Recorrência: 443 d clopidogrel vs. 192 d aspirina (p = 0,024)', 'Prevenção secundária; base principal para preferência pelo clopidogrel.'],
        ['Buchanan et al. (2025)', '125 gatos em ICC (73 efusão vs. 52 edema)', 'Refratária: 44 vs. 133 d; sobrevida: 155 vs. 234 d', 'Retrospectivo; estratifica risco, mas não define eutanásia isoladamente.'],
        ['TEER / V-Clamp (2026)', 'Coorte prospectiva n = 111 cães + revisão 2026', 'Mortalidade intra-hospitalar 6,3%; sobrevida 3 meses 86,4%', 'Sem ECR contra terapia clínica; indicar encaminhamento especializado precoce em DMVM progressiva.'],
      ],
    },
  },

  relatedConsensusSlugs: [
    'acvim-mmvd-canina-2019',
    'acvim-cardiomiopatias-felinas-2020',
    'acvim-hipertensao-pulmonar-canina-2020',
    'consenso-cardiorrenal-2015',
    'curative-risco-trombotico-2022',
    'curative-antitromboticos-2019',
    'esvc-dcm-canina-2003',
  ],
  relatedDiseaseSlugs: [
    'doenca-valvar-mitral-degenerativa-caes',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'cardiomiopatia-dilatada-caes-gatos',
    'cardiomiopatia-restritiva-felina',
    'arritmias-cardiacas-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'hipertireoidismo-felino',
    'doenca-renal-cronica-canina',
    'doenca-renal-cronica-felina',
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
    'quilotorax-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'nitroprussiato-de-sodio',
    'butorfanol',
    'buprenorfina',
    'maropitant',
    'mirtazapina',
    'capromorelina',
  ],

  references: [
    {
      id: 'ref-acvim-mmvd-2019',
      authors: 'Keene BW, Atkins CE, Bonagura JD, Fox PR, Häggström J, Fuentes VL, et al.',
      title: 'ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2019,
      volume: '33',
      pages: '1127–1140',
      doi: '10.1111/jvim.15488',
      url: 'https://doi.org/10.1111/jvim.15488',
      sourceType: 'Consenso ACVIM (2019)',
    },
    {
      id: 'ref-acvim-fcm-2020',
      authors: 'Luis Fuentes V, Abbott J, Chetboul V, Côté E, Fox PR, Häggström J, et al.',
      title: 'ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2020,
      volume: '34',
      pages: '1062–1077',
      doi: '10.1111/jvim.15745',
      url: 'https://doi.org/10.1111/jvim.15745',
      sourceType: 'Consenso ACVIM (2020)',
    },
    {
      id: 'ref-acvim-ph-2020',
      authors: 'Reinero C, Visser LC, Kellihan HB, Masseau I, Rozanski E, Clercx C, et al.',
      title: 'ACVIM consensus statement guidelines for the diagnosis, classification, treatment, and monitoring of pulmonary hypertension in dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2020,
      volume: '34',
      pages: '549–573',
      doi: '10.1111/jvim.15725',
      url: 'https://doi.org/10.1111/jvim.15725',
      sourceType: 'Consenso ACVIM (2020)',
    },
    {
      id: 'ref-consenso-cardiorrenal-2015',
      authors: 'Pouchelon JL, Atkins CE, Bussadori C, Oyama MA, Vaden SL, Bonagura JD, et al.',
      title: 'Cardiovascular–renal axis disorders in the domestic dog and cat: a veterinary consensus statement',
      journal: 'Journal of Small Animal Practice',
      year: 2015,
      volume: '56',
      pages: '537–552',
      doi: '10.1111/jsap.12387',
      url: 'https://doi.org/10.1111/jsap.12387',
      sourceType: 'Consenso interdisciplinar cardiorrenal',
    },
    {
      id: 'ref-curative-2019',
      authors: 'Blais MC, Bianco D, Goggs R, Lynch AM, Palmer L, Ralph A, Sharp CR',
      title: 'Consensus on the Rational Use of Antithrombotics in Veterinary Critical Care (CURATIVE): Domain 3—Defining antithrombotic protocols',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      year: 2019,
      volume: '29',
      pages: '60–74',
      doi: '10.1111/vec.12795',
      url: 'https://doi.org/10.1111/vec.12795',
      sourceType: 'Consenso ACVECC CURATIVE',
    },
    {
      id: 'ref-epic-2016',
      authors: 'Boswood A, Häggström J, Gordon SG, Wess G, Stepien RL, Oyama MA, et al.',
      title: 'Effect of Pimobendan in Dogs with Preclinical Myxomatous Mitral Valve Disease and Cardiomegaly: The EPIC Study—A Randomized Clinical Trial',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2016,
      volume: '30',
      pages: '1765–1779',
      doi: '10.1111/jvim.14586',
      url: 'https://doi.org/10.1111/jvim.14586',
      sourceType: 'Ensaio clínico randomizado (n = 360 · EPIC)',
    },
    {
      id: 'ref-quest-2008',
      authors: 'Häggström J, Boswood A, O’Grady M, Jöns O, Smith S, Swift S, et al.',
      title: 'Effect of pimobendan or benazepril hydrochloride on survival times in dogs with congestive heart failure caused by naturally occurring myxomatous mitral valve disease: the QUEST study',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2008,
      volume: '22',
      pages: '1124–1135',
      doi: '10.1111/j.1939-1676.2008.0150.x',
      url: 'https://doi.org/10.1111/j.1939-1676.2008.0150.x',
      sourceType: 'Ensaio clínico randomizado (n = 252 · QUEST)',
    },
    {
      id: 'ref-protect-2012',
      authors: 'Summerfield NJ, Boswood A, O’Grady MR, Gordon SG, Dukes-McEwan J, Oyama MA, et al.',
      title: 'Efficacy of pimobendan in the prevention of congestive heart failure or sudden death in Doberman Pinschers with preclinical dilated cardiomyopathy (the PROTECT Study)',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2012,
      volume: '26',
      pages: '1337–1349',
      doi: '10.1111/j.1939-1676.2012.01026.x',
      url: 'https://doi.org/10.1111/j.1939-1676.2012.01026.x',
      sourceType: 'Ensaio clínico randomizado (n = 76 · PROTECT)',
    },
    {
      id: 'ref-besst-2021',
      authors: 'Coffman M, Guillot E, Blondel T, Garelli-Paar C, Feng S, Heartsill S, et al.',
      title: 'Clinical efficacy of a benazepril and spironolactone combination in dogs with congestive heart failure due to myxomatous mitral valve disease: The BEnazepril Spironolactone STudy (BESST)',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2021,
      volume: '35',
      pages: '1673–1687',
      doi: '10.1111/jvim.16155',
      url: 'https://doi.org/10.1111/jvim.16155',
      sourceType: 'Ensaio clínico randomizado (n = 569 · BESST)',
    },
    {
      id: 'ref-carpodiem-2020',
      authors: 'Chetboul V, Pouchelon JL, Menard J, Blanc J, Desquilbet L, Petit A, et al.',
      title: 'Short-term efficacy and safety of torsemide and furosemide in 366 dogs with degenerative mitral valve disease: The TEST/CARPODIEM study',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2020,
      volume: '34',
      pages: '2247–2259',
      doi: '10.1111/jvim.15864',
      url: 'https://doi.org/10.1111/jvim.15864',
      sourceType: 'Ensaio clínico de não inferioridade (n = 319 · CARPODIEM)',
    },
    {
      id: 'ref-ward-2018',
      authors: 'Ward JL, Lisciandro GR, Ware WA, Viall AK, Atherly DD, Fowler KM, et al.',
      title: 'Evaluation of point-of-care thoracic ultrasound and NT-proBNP for the diagnosis of congestive heart failure in cats with respiratory distress',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2018,
      volume: '32',
      pages: '1530–1540',
      doi: '10.1111/jvim.15246',
      url: 'https://doi.org/10.1111/jvim.15246',
      sourceType: 'Estudo prospectivo de acurácia diagnóstica (n = 51)',
    },
    {
      id: 'ref-hezzell-ntprobnp-effusion',
      authors: 'Hezzell MJ, Rush JE, Humm K, Rozanski EA, Sargent J, Connolly DJ, et al.',
      title: 'Differentiation of cardiac from noncardiac pleural effusions in cats using second-generation quantitative and point-of-care NT-proBNP measurements',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2016,
      volume: '30',
      pages: '536–542',
      doi: '10.1111/jvim.13831',
      url: 'https://doi.org/10.1111/jvim.13831',
      sourceType: 'Estudo multicêntrico diagnóstico (efusão pleural felina)',
    },
    {
      id: 'ref-fatcat-2015',
      authors: 'Hogan DF, Fox PR, Jacob K, Keene B, Laste NJ, Rosenthal S, et al.',
      title: 'Secondary prevention of cardiogenic arterial thromboembolism in the cat: The double-blind, randomized, positive-controlled feline arterial thromboembolism; clopidogrel vs. aspirin trial (FAT CAT)',
      journal: 'Journal of Veterinary Cardiology',
      year: 2015,
      volume: '17',
      pages: 'S306–S317',
      doi: '10.1016/j.jvc.2015.10.004',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26776588/',
      sourceType: 'Ensaio clínico randomizado (n = 75 · FAT CAT)',
    },
    {
      id: 'ref-ohad-2018',
      authors: 'Ohad DG, Segev Y, Kelmer E, Aroch I, Bruchim Y, Klainbart S',
      title: 'Constant rate infusion vs. intermittent bolus administration of IV furosemide in 100 pets with acute left-sided congestive heart failure: A retrospective study',
      journal: 'The Veterinary Journal',
      year: 2018,
      volume: '238',
      pages: '70–75',
      doi: '10.1016/j.tvjl.2018.07.004',
      url: 'https://doi.org/10.1016/j.tvjl.2018.07.004',
      sourceType: 'Estudo clínico comparativo (bolus vs. CRI de furosemida)',
    },
    {
      id: 'ref-kittleson-cote-2021',
      authors: 'Kittleson MD, Côté E',
      title: 'The Feline Cardiomyopathies: 1. General concepts (incl. Figura 4, PMC8723176)',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2021,
      volume: '23',
      pages: '1009–1027',
      doi: '10.1177/1098612X211021819',
      url: 'https://doi.org/10.1177/1098612X211021819',
      sourceType: 'Revisão de referência felina (Acesso aberto PMC · Fig. 2)',
    },
    {
      id: 'ref-diana-2022',
      authors: 'Diana A, Linta N, Cipone M, Fedone V, Steiner JM, Fracassi F, Baron Toaldo M',
      title: 'Radiographic features of cardiogenic pulmonary oedema in cats with left-sided cardiac disease: 71 cases (incl. Figura 2, PMC10812342)',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2022,
      volume: '24',
      pages: '1138–1147',
      doi: '10.1177/1098612X221121922',
      url: 'https://doi.org/10.1177/1098612X221121922',
      sourceType: 'Estudo radiográfico felino (n = 71 · Fig. 3)',
    },
    {
      id: 'ref-boysen-2021',
      authors: 'Boysen SR, Gommeren K',
      title: 'Assessment of Volume Status and Fluid Responsiveness in Small Animals (incl. Figura 7, CC BY 4.0)',
      journal: 'Frontiers in Veterinary Science',
      year: 2021,
      volume: '8',
      pages: '630643',
      doi: '10.3389/fvets.2021.630643',
      url: 'https://doi.org/10.3389/fvets.2021.630643',
      sourceType: 'Revisão de POCUS hemodinâmico (CC BY 4.0 · Fig. 6)',
    },
    {
      id: 'ref-smartdog-2025',
      authors: 'SMARTDOG Study Group',
      title: 'Sonographic machine-assisted recognition and tracking of B-lines in dogs: the SMARTDOG study (incl. Figuras 1 e 2, CC BY 4.0)',
      journal: 'Frontiers in Veterinary Science',
      year: 2025,
      volume: '12',
      pages: '1647547',
      doi: '10.3389/fvets.2025.1647547',
      url: 'https://doi.org/10.3389/fvets.2025.1647547',
      sourceType: 'Estudo de POCUS pulmonar (CC BY 4.0 · Figs. 4 e 5)',
    },
    {
      id: 'ref-diuretic-responsiveness-2023',
      authors: 'Adin D, Kurtz K, Atkins C, Papich MG, Vaden S',
      title: 'Toward quantification of loop diuretic responsiveness for congestive heart failure',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2023,
      volume: '37',
      doi: '10.1111/jvim.16590',
      url: 'https://doi.org/10.1111/jvim.16590',
      sourceType: 'Estudo de farmacodinâmica diurética',
    },
    {
      id: 'ref-buchanan-2025',
      authors: 'Buchanan KM, Fries RC, Kadotani S',
      title: 'Time to refractory congestive heart failure in cats presenting with pleural effusion vs. pulmonary edema',
      journal: 'Journal of Veterinary Cardiology',
      year: 2025,
      volume: '62',
      pages: '52–59',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40882473/',
      sourceType: 'Estudo retrospectivo prognóstico felino (n = 125)',
    },
    {
      id: 'ref-teer-111-2026',
      authors: 'Journal of Veterinary Cardiology (2026)',
      title: 'One-year echocardiographic follow-up and two-year survival in 111 dogs undergoing mitral transcatheter edge-to-edge repair',
      journal: 'Journal of Veterinary Cardiology',
      year: 2026,
      doi: '10.1016/j.jvc.2025.12.002',
      url: 'https://doi.org/10.1016/j.jvc.2025.12.002',
      sourceType: 'Coorte prospectiva intervencionista (n = 111 · TEER)',
    },
    {
      id: 'ref-mitral-review-2026',
      authors: 'Frontiers in Veterinary Science (2026)',
      title: 'When to consider mitral valve surgery in dogs: a comparative review of open mitral valve repair and transcatheter edge-to-edge repair with a proposed selection framework',
      journal: 'Frontiers in Veterinary Science',
      year: 2026,
      doi: '10.3389/fvets.2026.1900762',
      url: 'https://doi.org/10.3389/fvets.2026.1900762',
      sourceType: 'Revisão comparativa cirúrgica/TEER (2026)',
    },
    {
      id: 'ref-dog-mmvd-fig1-2026',
      authors: 'Veterinary Research Communications (2026)',
      title: 'Paradoxical improvement of mitral regurgitation associated with hyperadrenocorticism-related cardiac hypertrophy in a dog with myxomatous mitral valve disease (incl. Figura 1, PMC13283187, CC BY 4.0)',
      journal: 'Veterinary Research Communications',
      year: 2026,
      doi: '10.1007/s11259-026-11358-2',
      url: 'https://doi.org/10.1007/s11259-026-11358-2',
      sourceType: 'Imagem radiográfica e ecocardiográfica (CC BY 4.0 · Fig. 1)',
    },
    {
      id: 'ref-nelson-couto-6ed-ch3-10',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 3: Management of Heart Failure (pp. 55–75); Cap. 6: Acquired Valvular and Endocardial Disease (pp. 119–140); Cap. 7: Myocardial Diseases of the Dog (pp. 141–157); Cap. 8: Myocardial Diseases of the Cat (pp. 158–173); Cap. 10: Pulmonary Hypertension and Heartworm Disease (pp. 190–210)',
      journal: 'Elsevier',
      year: 2020,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-feline-ecc-2ed-ch14-15',
      authors: 'Drobatz KJ, Reineke E, Costello MF, Culp WTN (eds.)',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition) — Cap. 14: Approach to Diagnosis and Treatment of Feline Cardiac Emergencies (pp. 143–152); Cap. 15: Management of Specific Cardiac Diseases (pp. 153–162)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Livro-texto de emergência felina (acervo local)',
    },
    {
      id: 'ref-dibartola-4ed-ch21',
      authors: 'DiBartola SP (ed.); Bonagura JD, Lehmkuhl LB, de Morais HA',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Edition) — Cap. 21: Fluid and Diuretic Therapy in Heart Failure (pp. 514–543)',
      journal: 'Elsevier',
      year: 2012,
      sourceType: 'Livro-texto de fluidoterapia e eletrólitos (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed-cardio',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Monografias de Furosemide (pp. 563–567), Pimobendan (pp. 1026–1028), Torsemide (pp. 1259–1260), Spironolactone (pp. 1175–1177), Sildenafil (pp. 1159–1161) e Clopidogrel (pp. 297–299)",
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-bsava-10ed-cardio',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition) — Monografias de Furosemide (pp. 176–177), Pimobendan (pp. 326–327), Spironolactone (pp. 385–386) e Torasemide (pp. 409–410)',
      journal: 'BSAVA',
      year: 2020,
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
  ],
};
