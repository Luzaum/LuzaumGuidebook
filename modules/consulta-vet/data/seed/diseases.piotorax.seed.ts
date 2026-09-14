import type { DiseaseRecord } from '../../types/disease';
import type { EditorialClinicalFigure } from '../../types/common';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Piotórax em Cães e Gatos — síntese editorial e clínica Vetius.
 * Padrão editorial estruturado rigorosamente alinhado às diretrizes de excelência acadêmica:
 * integração de literatura contemporânea (Johnson et al., 2023; Heier et al., 2022; Sim et al., 2021;
 * Eiras-Diaz et al., 2021; Krämer et al., 2021; Zhang & Grobman, 2025; Jang et al., 2025; Stillion & Letendre, 2015;
 * Lappin et al., 2017 - ISCAID Guidelines), cruzamento com Nelson & Couto 6ª ed., Ettinger 9ª ed.,
 * Feline Emergency and Critical Care Medicine 2ª ed. (2023), Manual of Small Animal Emergency and Critical Care Medicine 2ª ed.,
 * BSAVA Guide to Procedures in Small Animal Practice 3ª ed. (2024), Veterinary Emergency and Critical Care Procedures 3ª ed.,
 * e Plumb's Veterinary Drug Handbook 10ª ed.
 * Figuras clínicas abertas integradas, sistema visual sem marcadores de asterisco duplo.
 */

const figura1RadiografiaSim2021: EditorialClinicalFigure = {
  kind: "clinicalFigure",
  src: "/consulta-vet/piotorax/radiografia-piotorax-felino-sim2021.jpg",
  alt: "Radiografias ventrodorsais de gatos com piotórax exibindo efusão unilateral e bilateral",
  caption: "Figura 1 — Radiografias torácicas ventrodorsais de felinos com piotórax. À esquerda, efusão pleural purulenta predominantemente unilateral com opacificação homogênea do hemitórax esquerdo; à direita, efusão pleural bilateral com extensa retração dos lobos pulmonares da parede costal e apagamento das silhuetas cardíaca e diafragmática. A presença de exsudato séptico volumoso acarreta atelectasia compressiva grave, descompasso ventilação-perfusão (V/Q) e restrição ventilatória mecânica crítica. Fonte: Sim et al. (2021), Animals (CC BY 4.0).",
  display: "wide",
};

const figura2CitologiaSim2021: EditorialClinicalFigure = {
  kind: "clinicalFigure",
  src: "/consulta-vet/piotorax/citologia-piotorax-felino-sim2021.jpg",
  alt: "Citopatologia de exsudato séptico pleural demonstrando neutrófilos degenerados e bactérias intracelulares fagocitadas",
  caption: "Figura 2 — Citopatologia do líquido pleural em felino com piotórax (coloração de Wright, aumento de 1000x sob imersão). Observa-se fundo proteico amorfo repleto de neutrófilos marcadamente degenerados com lise celular, tumefação hidrópica nuclear e cariólise, além de múltiplas bactérias bacilares intracelulares fagocitadas ativamente. A identificação citológica de bactérias no interior do citoplasma de neutrófilos confirma processo séptico ativo in vivo (padrão ouro confirmatório imediato), diferenciando infecção verdadeira de contaminação iatrogênica acidental. Fonte: Sim et al. (2021), Animals (CC BY 4.0).",
  display: "wide",
};

const figura3DrenoHeier2022: EditorialClinicalFigure = {
  kind: "clinicalFigure",
  src: "/consulta-vet/piotorax/dreno-toracico-6f-heier2022.jpg",
  alt: "Sistema de tubo de toracostomia de pequeno calibre de 6 French wire-guided com bainha e dilatador",
  caption: "Figura 3 — Conjunto de toracostomia torácica de pequeno calibre (tubo multiperfurado de 6 French, fio-guia metálico em J, dilatador e bainha vascular descartável) utilizado no manejo minimamente invasivo de piotórax felino. Heier et al. (2022) comprovaram que a técnica de inserção guiada por fio (Seldinger) com dreno fino de 6 F é altamente eficaz para drenagem e lavagem pleural na espécie felina, apresentando taxa de complicação de apenas 4% e sobrevida de 94% em 1 ano, desmistificando o dogma de que o pus exige compulsoriamente trocartes rígidos e tubos de grande calibre. Fonte: Heier et al. (2022), Animals (CC BY 4.0).",
  display: "wide",
};

const figura4RadiografiaGraveJang2025: EditorialClinicalFigure = {
  kind: "clinicalFigure",
  src: "/consulta-vet/piotorax/radiografia-piotorax-grave-jang2025.jpg",
  alt: "Radiografias torácicas laterolateral e ventrodorsal de felino com piotórax grave bilateral e colapso lobar",
  caption: "Figura 4 — Radiografia torácica pré-tratamento de felino em insuficiência respiratória restritiva aguda decorrente de piotórax purulento bilateral extenso. Nota-se acentuada radiopacidade de tecidos moles preenchendo o espaço pleural, linhas de fissuras interlobares espessadas e perda completa da definição das margens cardíacas e da cúpula diafragmática (sinal da silhueta positivo). O colapso compressivo dos lobos pulmonares caudais ilustra o risco fatal de submeter o paciente ao decúbito forçado antes da toracocentese de alívio emergencial. Fonte: Jang et al. (2025), Animals (CC BY 4.0).",
  display: "wide",
};

const figura5TomografiaJang2025: EditorialClinicalFigure = {
  kind: "clinicalFigure",
  src: "/consulta-vet/piotorax/tomografia-piotorax-mediastinal-jang2025.jpg",
  alt: "Tomografia computadorizada torácica contrastada demonstrando empiema mediastinal, espessamento pleural e loculações",
  caption: "Figura 5 — Tomografia computadorizada torácica com contraste iodado intravenoso em plano transversal de felino com empiema pleural complicado e empiema mediastinal paraesofágico. Observam-se espessamento e realce marcante dos folhetos pleurais parietal e mediastinal, múltiplos bolsões loculados herméticos com líquido purulento de alta densidade e linfadenopatia mediastinal associada. O exame é essencial para identificar causas estruturais que impedem o controle médico por drenos, tais como abscessos mediastinais, corpos estranhos vegetais e fístulas esofágicas, orientando o planejamento cirúrgico desbridante por toracotomia. Fonte: Jang et al. (2025), Animals (CC BY 4.0).",
  display: "wide",
};

export const piotoraxRecord: DiseaseRecord = {
  id: "disease-piotorax-caes-gatos",
  slug: "piotorax-caes-gatos",
  title: "Piotórax em Cães e Gatos",
  subtitle: "Empiema Pleural, Fisiopatogenia Séptica de Espaço Fechado, Drenagem Torácica e Terapia Antimicrobiana Racional",
  synonyms: [
    "Empiema Pleural",
    "Empiema Torácico",
    "Pleurite Purulenta Séptica",
    "Pyothorax",
    "Septic Pleural Effusion",
  ],
  species: [
    "cat",
    "dog",
  ],
  category: "urgencia-emergencia",
  categories: [
    "urgencia-emergencia",
    "pneumologia",
    "infectologia",
    "terapia-intensiva",
    "cirurgia",
  ],
  tags: [
    "piotórax",
    "empiema pleural",
    "toracocentese",
    "dreno torácico",
    "lavagem pleural",
    "ISCAID",
    "sepsis",
    "ampicilina-sulbactam",
    "enrofloxacina",
    "corpo estranho vegetal",
    "anaeróbios",
    "pneumologia",
    "emergência",
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['piotorax-caes-gatos'],
  quickSummary: "O piotórax (ou empiema pleural) é uma infecção bacteriana supurativa de espaço fechado caracterizada pelo acúmulo de exsudato séptico e fibrinocelular entre os folhetos pleurais parietal e visceral. Não constitui apenas uma infecção passível de resolução farmacológica isolada: o material purulento denso, a deposição contínua de fibrina e a compartimentalização em lojas anatômicas herméticas impedem a penetração eficaz de antibióticos sistêmicos e perpetuam a atelectasia compressiva pulmonar. Na espécie felina, evidências contemporâneas (Johnson et al., 2023) desmistificaram a clássica visão de doença idiopática, comprovando trauma penetrante por mordeduras em até 76% dos casos, com predomínio marcante de infecções polimicrobianas e anaeróbios estritos (Fusobacterium, Prevotella, Bacteroides, Clostridium). Na espécie canina, a etiologia associa-se predominantemente a corpos estranhos vegetais migratórios (espiguetas e gramíneas), traumas perfurantes ou extensão de pneumopatias necrotizantes. A abordagem inicial exige a regra de ouro emergencial: toracocentese diagnóstica e terapêutica imediata guiada por POCUS/T-FAST antes de radiografias estressantes, prevenindo parada cardiorrespiratória iatrogênica por exaustão diafragmática. O diagnóstico confirmatório definitivo repousa na citopatologia do líquido pleural, demonstrando neutrófilos degenerados com cariólise e bactérias intracelulares fagocitadas. A cultura bacteriana aeróbia e anaeróbia é mandatória, embora culturas negativas não excluam o diagnóstico. O tripé terapêutico inegociável compreende: estabilização hemodinâmica e ventilatória intensiva; controle mecânico estrito de foco (source control) mediante toracostomia com dreno torácico (onde tubos 6 F wire-guided demonstraram excelente tolerabilidade e taxa de complicação de apenas 4% em felinos - Heier et al., 2022) e lavagem pleural com cristalóide isotônico aquecido (recuperação obrigatória ≥ 75%); e antibioticoterapia parenteral empírica inicial de quatro quadrantes (ampicilina-sulbactam associada a fluoroquinolona, respeitando o teto estrito de 5 mg/kg/dia para enrofloxacina em gatos para evitar retinotoxicidade irreversível). Casos associados a corpos estranhos vegetais, abscessos parenquimatosos ou falha de drenagem após 48 a 72 horas demandam tomografia computadorizada contrastada de urgência e resolução cirúrgica desbridante por toracotomia ou videocirurgia (VATS).",
  quickDecisionStrip: [
    "Toracocentese antes de radiografia: Em paciente com dispneia restritiva grave e sons abafados ventralmente, o decúbito e estresse da radiografia podem desencadear parada cardiorrespiratória por colapso ventilatório. Drene primeiro, estabilize e radiografe depois.",
    "Piotórax é infecção de espaço fechado: O antibiótico sistêmico não penetra eficazmente em lojas de pus espesso, fibrina e tecido necrótico. O controle mecânico de foco com drenagem ampla é tão vital quanto o antimicrobiano.",
    "Bactéria intracelular em neutrófilo degenerado é o marco confirmatório: Presença inquestionável de fagocitose ativa in vivo. Bactéria extracelular isolada pode ser contaminação; contudo, ausência de bactéria visível NÃO descarta piotórax (Johnson 2023; Sim 2021).",
    "Cultura negativa NÃO exclui piotórax: Antibioticoterapia prévia, anaeróbios estritos suscetíveis ao oxigênio ambiente ou patógenos fastidiosos (Actinomyces, Nocardia) geram altas taxas de falso-negativo. Mantenha cobertura empírica de 4 quadrantes.",
    "Gatos são polimicrobianos e anaeróbios: Ao contrário do antigo mito idiopático, Johnson et al. (2023) demonstraram trauma penetrante em ~76% e 73% de isolados anaeróbios (Fusobacterium, Prevotella, Bacteroides, Clostridium). Fluoroquinolona isolada é conduta errônea.",
    "Cães exigem busca ativa de corpo estranho vegetal migratório: Espiguetas e gramíneas transmitem infecção pleural e piogranulomas. Se houver falha de resposta, derrame loculado ou pneumotórax associado, TC contrastada de urgência e intervenção cirúrgica são prioritárias (Eiras-Diaz 2021).",
    "Dreno torácico 6 F wire-guided é seguro e altamente eficaz em felinos: Heier et al. (2022) comprovaram taxa de complicação de apenas 4% e sobrevida de 94% em 1 ano com dreno fino bem conduzido, desmistificando a obrigatoriedade de drenos calibrosos traumáticos.",
    "Lavagem pleural com cristalóide isotônico aquecido (10 a 20 mL/kg): Deve-se recuperar obrigatoriamente ≥ 75% do volume infundido. Não adicione antibióticos intrapleurais (contraindicado pela ISCAID) nem heparina rotineira.",
    "Enrofloxacina em gatos tem teto estrito de 5 mg/kg/dia: Doses elevadas (≥ 15-20 mg/kg) causam degeneração retiniana aguda difusa e cegueira irreversível mediada por acúmulo retiniano em felinos.",
    "Duração da antibioticoterapia exige 3 a 6 semanas e transição oral planejada: Desescalonar para amoxicilina com clavulanato após controle de foco e resolução citológica, monitorando estritamente para prevenir recidivas crônicas.",
  ],
  quickSummaryRich: {
    lead: "O piotórax é uma emergência respiratória e potencialmente séptica resultante do acúmulo de exsudato purulento na cavidade pleural. Como infecção de espaço fechado, a terapia medicamentosa isolada é invariavelmente insuficiente: o controle mecânico do foco infeccioso (source control) através de toracocentese imediata de alívio, inserção de dreno torácico e lavagem pleural seriada é tão determinante para a sobrevida quanto a seleção racional de antimicrobianos intravenosos de amplo espectro.",
    leadHighlights: [
      "Infecção de Espaço Fechado",
      "Controle Mecânico de Foco (Source Control)",
      "Toracocentese Prévia à Radiografia",
      "Bactérias Intracelulares em Neutrófilos Degenerados",
      "Trauma Penetrante e Flora Anaeróbia em Felinos",
      "Corpo Estranho Vegetal Migratório em Caninos",
      "Dreno Torácico 6 F Wire-Guided em Felinos",
      "Lavagem Pleural com Recuperação Mínima de 75%",
    ],
    pillars: [
      {
        title: "Fisiopatologia de Espaço Fechado e Restrição Pleural",
        body: "O acúmulo de exsudato purulento entre as pleuras visceral e parietal anula a pressão intrapleural negativa, provocando atelectasia compressiva pulmonar, perda da capacidade residual funcional e grave desequilíbrio V/Q com shunt intrapulmonar. A exsudação contínua de fibrinogênio gera septações e loculações herméticas que isolam colônias bacterianas e barram a difusão de fármacos sistêmicos.",
        highlights: [
          "Atelectasia compressiva",
          "Desequilíbrio V/Q e shunt",
          "Loculações de fibrina",
          "Barreira à difusão",
        ],
      },
      {
        title: "Emergência na Admissão: Toracocentese Pré-Radiográfica",
        body: "Pacientes admitidos em padrão respiratório restritivo e sons pulmonares ventralmente abafados não toleram o estresse físico e posicionamento do exame radiográfico. A conduta mandatória prioriza oxigenoterapia passiva com contenção mínima (\"hands-off\"), confirmação rápida por POCUS/T-FAST e toracocentese terapêutica imediata para descompressão pulmonar e alívio ventilatório.",
        highlights: [
          "Oxigênio passivo imediato",
          "Contenção mínima hands-off",
          "POCUS confirmatório",
          "Toracocentese de alívio prévia",
        ],
      },
      {
        title: "Controle Mecânico de Foco (Source Control) e Lavagem Pleural",
        body: "A evacuação do espaço pleural exige implantação de dreno torácico sob técnica asséptica estrita. Em gatos, tubos 6 F wire-guided (Seldinger) oferecem excelente drenagem com apenas 4% de complicações. A lavagem com cristalóide isotônico aquecido (10 a 20 mL/kg) dilui debris e mobiliza fibrina, exigindo recuperação aspirativa mandatória de pelo menos 75% do volume infundido.",
        highlights: [
          "Toracostomia com dreno",
          "Tubo 6 F wire-guided",
          "Lavagem isotônica 10-20 mL/kg",
          "Recuperação aspirativa ≥ 75%",
        ],
      },
      {
        title: "Antimicrobianoterapia Racional de Quatro Quadrantes e Suporte Séptico",
        body: "A terapia empírica de primeira linha preconizada pela ISCAID associa aminopenicilina potencializada (ampicilina-sulbactam 22-30 mg/kg IV q6-8h) a uma fluoroquinolona parenteral (enrofloxacina até 5 mg/kg/dia em gatos ou marbofloxacina). Suporte intensivo inclui fluidoterapia cautelosa titulada, analgesia multimodal com opioides puros e desescalonamento guiado por cultura bacteriana.",
        highlights: [
          "ISCAID: Ampicilina-Sulbactam + Fluoroquinolona",
          "Teto de 5 mg/kg enrofloxacina em felinos",
          "Culturas aeróbia e anaeróbia",
          "Analgesia com opioides puros",
        ],
      },
    ],
    diagnosticFlow: {
      title: "Fluxograma Diagnóstico Sequencial e Triagem Crítica no Piotórax",
      steps: [
        {
          label: "Passo 1: Triagem e Oxigenoterapia Passiva Imediata",
          timing: "Minutos 0 a 5",
          detail: "Acomodação imediata em gaiola de oxigênio (FiO2 40-50%) ou oxigênio em fluxo livre (\"blow-by\"). Avaliação visual rápida do padrão respiratório (taquipneia superficial, esforço abdominal, ortopneia, boca aberta em gatos). Evitar qualquer estresse, contenção forçada ou coleta de sangue antes da estabilização ventilatória inicial.",
        },
        {
          label: "Passo 2: POCUS / T-FAST e Identificação de Efusão",
          timing: "Minutos 5 a 10",
          detail: "Varredura ultrassonográfica rápida à beira-leito nos pontos torácicos (CTS, PCS, DH). Identificação de anecoicidade/hipoecoicidade pleural entre parede torácica e parênquima pulmonar retraído, espessamento pleural, debris flutuantes e septações de fibrina. Confirmação do melhor sítio e lado para punção.",
        },
        {
          label: "Passo 3: Toracocentese Diagnóstica e Terapêutica de Alívio",
          timing: "Minutos 10 a 20",
          detail: "Tricotomia e antissepsia rápida no 7º ou 8º espaço intercostal cranioventral. Punção com cateter 20-22G na borda cranial da costela acoplado a torneira de 3 vias e seringa. Esvaziamento gradual do líquido purulento até alívio do padrão respiratório. Separação de alíquotas estéreis para análise laboratorial imediata.",
        },
        {
          label: "Passo 4: Análise Citopatológica Imediata e Culturas [PADRÃO OURO]",
          timing: "Minutos 20 a 40",
          detail: "Confecção de esfregaços frescos e coloração rápida tipo Wright/Diff-Quik. Identificação de neutrófilos degenerados e pesquisa minuciosa de bactérias intracelulares fagocitadas (cocos, bacilos ou filamentos). Inoculação em frasco estéril para cultura aeróbia com antibiograma e meio de transporte anaeróbio obrigatório.",
        },
        {
          label: "Passo 5: Radiografia Torácica Pós-Drenagem e Descompressão",
          timing: "Horas 1 a 2 pós-alívio",
          detail: "Realização de radiografias torácicas ortogonais (laterolateral e ventrodorsal ou dorsoventral) somente após o alívio respiratório efetivo. Avaliação de consolidações alveolares, pneumonia bacteriana subjacente, abscessos pulmonares, pneumotórax secundário, efusões residuais não drenadas e corpos estranhos radioopacos.",
        },
        {
          label: "Passo 6: Tomografia Computadorizada Contrastada de Tórax (TC)",
          timing: "Horas 24 a 48 ou casos refratários",
          detail: "Indicada precocemente em cães com suspeita de espigueta/corpo estranho vegetal, e em gatos ou cães que apresentam loculações graves, pneumotórax sob tensão persistente, abscesso mediastinal ou ausência de melhora clínica e laboratorial após 48 a 72 horas de drenagem torácica adequada.",
        },
      ],
    },
    treatmentFlow: {
      title: "Fluxograma Terapêutico Integrado e Escalonado da UTI ao Domicílio",
      steps: [
        {
          label: "Fase 1: Estabilização de Emergência e Drenagem de Alívio",
          timing: "Hora 0 (Emergência)",
          detail: "Oxigenoterapia contínua, toracocentese esvaziadora de emergência, analgesia parenteral inicial com metadona (0,1-0,2 mg/kg IV) ou buprenorfina (0,01-0,02 mg/kg IV em gatos). Acesso vascular e expansão fracionada com cristalóide isotônico em pacientes hipotensos/hipoperfundidos, monitorando sinais de sobrecarga volêmica.",
        },
        {
          label: "Fase 2: Implantação de Dreno Torácico e Lavagem Pleural",
          timing: "Horas 1 a 4 pós-estabilização",
          detail: "Inserção de tubo de toracostomia sob sedação profunda ou anestesia geral de curta duração. Em gatos e cães pequenos, preferência por tubo 6 F a 10 F wire-guided (Seldinger); em cães médios e grandes, tubos 14 F a 24 F conforme viscosidade do pus. Início de lavagem pleural com salina isotônica morna (10 a 20 mL/kg), garantindo recuperação aspirativa de ≥ 75%.",
        },
        {
          label: "Fase 3: Antimicrobianoterapia Parenteral Empírica de Amplo Espectro",
          timing: "Imediato (primeira hora)",
          detail: "Início de ampicilina + sulbactam (22 a 30 mg/kg IV q6-8h, Plumb 10ª ed.) associada a fluoroquinolona parenteral (enrofloxacina 10-20 mg/kg IV q24h em cães; em gatos, não ultrapassar 5 mg/kg IV q24h devido a retinotoxicidade; ou marbofloxacina 2,75-5,5 mg/kg IV q24h). Manter cobertura estrita para anaeróbios em todos os casos.",
        },
        {
          label: "Fase 4: Manejo Intensivo em UTI e Monitoramento Seriados",
          timing: "Dias 1 a 5 de internação",
          detail: "Drenagem torácica ativa intermitente a cada 4 a 6 horas ou sucção contínua (10-15 cmH2O). Lavagem pleural 2 vezes ao dia. Monitoramento seriado de débito de líquido, citologia do fluido drenado a cada 24 horas, lactato sérico, hematócrito e proteína plasmática. Nutrição enteral precoce assim que o padrão ventilatório estabilizar.",
        },
        {
          label: "Fase 5: Desescalonamento, Retirada do Dreno e Step-Down Oral",
          timing: "Dias 4 a 7 (Hospitalar) até Semanas 3 a 6 (Domiciliar)",
          detail: "Remoção do dreno torácico após critérios objetivos: produção < 2 a 3 mL/kg/dia, ausência citológica de bactérias e neutrófilos degenerados, e resolução clínica/radiográfica. Transição para antibioticoterapia oral guiada por cultura (frequentemente amoxicilina-clavulanato 11-13,75 mg/kg cão / 12,5 mg/kg gato q8-12h), mantida por período prolongado de 3 a 6 semanas.",
        },
      ],
    },
  },
  etiology: {
    definicaoEConceitoDeEspacoFechado: "O piotórax, também denominado empiema torácico ou empiema pleural, define-se pelo acúmulo de exsudato inflamatório purulento e séptico no interior da cavidade pleural. Diferencia-se categoricamente de pleurites não sépticas ou de outros exsudatos pleurais (como na peritonite infecciosa felina, neoplasias pleurais ou quilotórax) pela presença ativa de microrganismos viáveis e pelo recrutamento massivo de neutrófilos que sofrem degeneração hidrópica e necrose induzida por toxinas bacterianas. A cavidade pleural é um espaço virtual fechado revestido por células mesoteliais com mínima película de fluido seroso lubrificante (cerca de 0,1 a 0,3 mL/kg). Uma vez inoculadas bactérias nesse microambiente hermético e vascularizado, desencadeia-se uma intensa resposta inflamatória aguda. O espaço fechado atua como uma armadilha biológica: a formação rápida de fibrina e detritos necróticos gera uma barreira física espessa que isola as bactérias e impede a penetração eficaz de concentrações terapêuticas de antibióticos administrados por via sistêmica. Dessa forma, o piotórax comporta-se fisiopatologicamente como um abscesso intratorácico de grandes dimensões, no qual o controle mecânico estrito de foco (source control através de drenagem e lavagem) constitui requisito prévio e inegociável para a cura.",
    mecanismosDeInoculacaoPorEspecie: "As rotas de inoculação bacteriana na cavidade pleural variam de maneira substancial entre a espécie canina e a felina, refletindo seus diferentes hábitos comportamentais, exposições ecológicas e anatomia patológica:\n\n1. Espécie Canina:\n- Corpos Estranhos Vegetais Migratórios: As espiguetas de gramíneas (grass awns, Hordeum spp.) representam o mecanismo etiológico primordial em cães esportivos, de caça, pastoreio ou que transitam por áreas de vegetação alta durante períodos secos. A estrutura em flecha unidirecional da espigueta favorece a migração transmural contínua a partir das vias aéreas profundas (brônquios e parênquima pulmonar) ou através da parede torácica e diafragma em direção ao espaço pleural e retroperitônio, carreando uma microbiota mista contendo Actinomyces spp., Nocardia spp. e anaeróbios.\n- Traumas Perfurantes e Feridas por Mordedura: Lesões penetrantes na parede torácica decorrentes de brigas, mordeduras intercaninas ou empalamento iatrogênico inoculam diretamente patógenos da pele e da cavidade oral.\n- Ruptura de Abscessos Pulmonares ou Necrose Pneumônica: Consolidações bacterianas graves e broncopneumonias necrotizantes complicadas que rompem a pleura visceral diretamente para o espaço pleural.\n- Perfuração Esofágica: Perfuração transmural do esôfago torácico causada pela retenção e necrose por ossos ou corpos estranhos pontiagudos ingeridos, permitindo a inundação imediata do mediastino e cavidade pleural com flora orofaríngea mista e refluxo gástrico.\n- Disseminação Hematógena ou Linfática: Rota secundária menos comum, associada a quadros de endocardite bacteriana ou sepse generalizada.\n\n2. Espécie Felina:\n- Trauma Penetrante por Mordeduras (Flora Oral Felina): Tradicionalmente, livros-texto antigos rotulavam a maioria dos casos felinos de piotórax como \"idiopáticos\". Entretanto, estudos clínicos e patológicos modernos (Johnson, Epstein & Reagan, 2023) desmistificaram essa visão, demonstrando que o dano penetrante está implicado em aproximadamente 76% dos gatos acometidos. Brigas e disputas territoriais com gatos portadores de flora orofaríngea rica em anaeróbios causam ferimentos puntiformes diminutos causados por dentes caninos na parede torácica. As perfurações puntiformes cicatrizam rapidamente na epiderme devido à elevada elasticidade da pele felina, mas selam colônias bacterianas virulentas no espaço subcutâneo e intercostal que progridem através da fáscia até penetrar a pleura parietal.\n- Microtraumas e Extensão Respiratória: Propagação contígua a partir de infecções do trato respiratório superior crônicas, abscessos paraesofágicos e broncopneumonias associadas a corpos estranhos ou neoplasias pulmonares ulceradas.\n- Gatos com Acesso à Rua e Não Castrados: Constituem a população de risco clássica na espécie felina, devido à elevada prevalência de interações agressivas e brigas territoriais noturnas.",
    microbiologiaComparadaTabela: {
      kind: "clinicalTable",
      title: "Tabela Comparativa — Microbiologia e Perfil Clínico do Piotórax em Cães versus Gatos",
      headers: [
        "Parâmetro Biológico e Clínico",
        "Espécie Felina (Gatos)",
        "Espécie Canina (Cães)",
        "Implicação Clínica e Terapêutica",
      ],
      rows: [
        [
          "Etiologia Primária Predominante",
          "Trauma penetrante por mordeduras (76%; Johnson 2023); inoculação de flora orofaríngea de felinos.",
          "Corpos estranhos vegetais migratórios (espiguetas; Eiras-Diaz 2021), traumas penetrantes e perfurações esofágicas.",
          "Gatos exigem histórico estrito de brigas e vida externa; cães exigem varredura por TC para localização de corpos estranhos vegetais.",
        ],
        [
          "Perfil da Infecção",
          "Predominantemente polimicrobiana (mediana de 3 isolados bacterianos por paciente).",
          "Mais frequentemente monomicrobiana ou oligomicrobiana (mediana de 1 isolado por paciente).",
          "A terapia empírica felina deve cobrir obrigatoriamente múltiplos patógenos simultâneos e sinérgicos.",
        ],
        [
          "Prevalência de Anaeróbios Estritos",
          "Altíssima: isolados em cerca de 73% dos pacientes felinos (Johnson 2023).",
          "Moderada a alta: isolados em cerca de 45% dos pacientes caninos.",
          "Cobrir anaeróbios com penicilinas potencializadas ou clindamicina é imperativo na rotina, especialmente em felinos.",
        ],
        [
          "Patógenos Anaeróbios Típicos",
          "Fusobacterium spp., Prevotella spp., Porphyromonas spp., Bacteroides spp., Peptostreptococcus spp., Clostridium spp.",
          "Fusobacterium spp., Bacteroides spp., Peptostreptococcus spp., Clostridium spp., Actinomyces spp.",
          "Anaeróbios orais produzem odor fétido pronunciado e induzem lise neutrofílica exuberante com pus viscoso acastanhado.",
        ],
        [
          "Patógenos Aeróbios e Facultativos Típicos",
          "Pasteurella multocida (muito comum em mordeduras), Streptococcus spp., Staphylococcus spp., Mycoplasma spp.",
          "Enterobacterales (Escherichia coli, Klebsiella pneumoniae), Pasteurella spp., Staphylococcus spp., Pseudomonas spp.",
          "Cães apresentam maior incidência de bacilos Gram-negativos entéricos, exigindo cobertura bactericida com fluoroquinolonas.",
        ],
        [
          "Bactérias Intracelulares na Citologia",
          "93% dos gatos apresentam bactérias fagocitadas visíveis na citologia de admissão (Johnson 2023).",
          "73% dos cães apresentam bactérias fagocitadas visíveis na citologia de admissão.",
          "A citologia imediata tem sensibilidade superior no gato; contudo, a ausência de bactérias visíveis não descarta piotórax em nenhuma espécie.",
        ],
      ],
    },
    patogenosEspeciaisActinomycesENocardia: "As infecções causadas por bactérias filamentosas ramificadas — principalmente Actinomyces spp. e Nocardia spp. — ocupam lugar de destaque na medicina interna e cirurgia torácica de cães e gatos:\n\n1. Actinomyces spp.:\n- Bacilos Gram-positivos anaeróbios facultativos a anaeróbios estritos, que fazem parte da microbiota comensal da cavidade oral e faringe dos carnívoros.\n- Fortemente associados a traumas perfurantes por corpos estranhos vegetais migratórios (espiguetas) em cães e mordeduras penetrantes em gatos.\n- Caracterizam-se pela formação de uma reação inflamatória piogranulomatosa crônica com fibrose tecidual exuberante, aderências pleurais densas e produção dos clássicos \"grânulos de enxofre\" (sulfur granules) macroscópicos — aglomerados de filamentos bacterianos mineralizados com proteínas do hospedeiro dispersos no exsudato purulento avermelhado ou achocolatado.\n- Desafio Laboratorial: Seu cultivo é fastidioso e moroso, requerendo atmosfera de anaerobiose ou microaerofilia e tempo de incubação de pelo menos 7 a 14 dias. A terapia exige cursos ultraprolongados com penicilinas em altas doses (amoxicilina com clavulanato ou ampicilina) por 2 a 4 meses para evitar recidivas.\n\n2. Nocardia spp.:\n- Bactérias aeróbias estritas, saprófitas de solo e vegetação, que apresentam morfologia de filamentos ramificados finos que se fragmentam em formas cocóides ou bacilares.\n- Diferenciam-se do Actinomyces pela positividade na coloração de Kinyoun ou Ziehl-Neelsen modificado (parcialmente álcool-ácido resistentes devido à presença de ácidos micólicos na parede celular).\n- Apresentam perfil de resistência intrínseca às penicilinas convencionais. O tratamento preconizado requer sulfonamidas potencializadas (sulfadiazina-trimetoprima em cães ou trimetoprima-sulfametoxazol) ou fluoroquinolonas combinadas a macrolídeos por vários meses.\n\nRegra Laboratorial de Ouro: Diante do achado citológico de bactérias filamentosas ramificadas, o médico veterinário não deve relatar apenas \"presença de bactérias bacilares\". É imperativo notificar o microbiologista para estender a incubação microbiológica em meios específicos por até 21 dias e realizar a coloração álcool-ácido resistente modificada.",
    desmistificacaoDoPiotoraxIdiopatico: "Durante décadas, a literatura clássica repetiu a asserção de que a ampla maioria dos casos de piotórax em gatos seria de natureza \"idiopática\", pela ausência de evidências visíveis de feridas externas na pele durante o exame físico. O estudo de referência de Johnson, Epstein & Reagan (2023) revisou sistematicamente 29 felinos e 60 caninos com piotórax, reconstruindo a etiologia mediante cruzamento de anamnese com histórico ambiental, imagem multimodal, broncoscopia, achados cirúrgicos e histopatologia. Os resultados demonstraram que o trauma penetrante (mordeduras em gatos e corpos estranhos ou mordeduras em cães) esteve diretamente implicado em 76% dos gatos e 75% a 77% dos cães, restando apenas 2 gatos e 1 cão com etiologia verdadeiramente indeterminada. Essa quebra de paradigma demonstra que a pele elástica do gato fecha rapidamente sobre as lesões puntiformes causadas por dentes caninos de outros animais, mascarando a porta de entrada. Portanto, todo gato com piotórax deve ser considerado vítima em potencial de inoculação traumática profunda por mordedura até prova em contrário.",
  },
  epidemiology: {
    perfilEpidemiologicoCaninoETrabalho: "Na espécie canina, o piotórax manifesta-se predominantemente em cães jovens a adultos de meia-idade (mediana de 3 a 6 anos), com forte super-representação de raças esportivas, de caça, pastoreio e cães de trabalho que frequentam ambientes rurais, campos de gramíneas secas e matas fechadas (como cães das raças Labrador Retriever, Golden Retriever, Border Collie, Springer Spaniel e cães de pastoreio). Cães machos intactos frequentemente exibem maior propensão estatística associada a comportamentos errantes e brigas intercaninas. Em áreas urbanas, os casos caninos secundários a traumas penetrantes, atropelamentos com perfuração costal e perfuração esofágica por ossos cozidos e espinhas de peixe ganham maior proporção. O padrão sazonal coincide estritamente com os períodos de estiagem e maturação das sementes de gramíneas no final da primavera e verão.",
    perfilEpidemiologicoFelinoEComportamento: "Nos gatos, a enfermidade atinge principalmente indivíduos jovens a adultos (mediana de 2 a 5 anos), acometendo com maior frequência machos não castrados ou gatos com histórico de vida livre ou semi-domiciliada com acesso à rua. Gatos que convivem em residências multicat com dinâmica de tensão social, introdução recente de animais não adaptados ou abrigos de resgate apresentam risco ampliado de agressões físicas com inoculação de saliva contaminada. Não há predisposição racial documentada em felinos domésticos; no entanto, animais de pelo curto e indivíduos sem raça definida (SRD) compõem a imensa maioria dos casos admitidos em hospitais veterinários públicos e universitários. O piotórax pode ocorrer em gatos de qualquer condição sorológica para retrovírus (FeLV/FIV), embora animais imunossuprimidos possam apresentar evolução séptica mais rápida e desfechos desfavoráveis.",
    dadosMulticentricosInternacionais: "Estudos multicêntricos e coortes internacionais recentes delineiam o comportamento da doença na rotina veterinária global:\n1. Johnson et al. (2023, JVIM): Avaliação de 29 gatos e 60 cães demonstrou trauma penetrante em ~76% de ambas as espécies, destacando infecção polimicrobiana com múltiplos anaeróbios na espécie felina.\n2. Eiras-Diaz et al. (2021, JSAP): Investigou 101 cães com piotórax submetidos a tomografia computadorizada contrastada em até 48 horas da admissão. Achados: espessamento pleural em 84,1%, pannus inflamatório em 67,3%, pneumotórax associado em 61,4%, efusão mediastinal em 28,7%, abscesso pulmonar em 13,8% e presença confirmada de corpo estranho em 7,9%. Revelou que 86,6% das mortes caninas concentraram-se nas primeiras 48 horas da internação.\n3. Heier et al. (2022, Animals): Coorte com 45 gatos tratados exclusivamente com tubos de toracostomia de pequeno calibre (6 French), registrando taxa mínima de complicações mecânicas de 4% e sobrevida de 94% em um ano para os pacientes que receberam alta hospitalar.\n4. Krämer et al. (2021, JSAP): Coorte com 55 gatos com piotórax submetidos a tratamento clínico intensivo; sobrevida em 14 dias de 72% e taxa de recidiva a longo prazo de apenas 6% entre os sobreviventes acompanhados.",
  },
  pathogenesisTransmission: {
    cascata: [
      "1. Inoculação primária de bactérias patogênicas na cavidade pleural estéril por ferimento penetrante de mordedura, migração transmural de corpo estranho vegetal (espigueta), perfuração esofágica ou ruptura de abscesso pulmonar.",
      "2. Reconhecimento imunológico imediato pelas células mesoteliais e macrófagos pleurais residentes através de receptores Toll-like (TLR), desencadeando liberação maciça de mediadores pró-inflamatórios (IL-1beta, TNF-alfa, IL-6, IL-8 e leucotrieno B4).",
      "3. Aumento drástico da permeabilidade da microvasculatura pleural com extravasamento profuso de líquido rico em proteínas plasmáticas, fibrinogênio e células do complemento para o espaço interpleural.",
      "4. Recrutamento em massa de neutrófilos a partir da circulação sistêmica; fagocitose bacteriana intensa seguida de degranulação enzimática, liberação de espécies reativas de oxigênio (ROS), lise neutrofílica e liberação de armadilhas extracelulares de DNA (NETs).",
      "5. Formação de exsudato purulento espesso e viscoso composto por bactérias viáveis e mortas, neutrófilos degenerados cariolíticos, detritos celulares necróticos e proteínas precipitadas.",
      "6. Ativação concomitante da cascata de coagulação pleural e inibição da fibrinólise local mediada por PAI-1; o fibrinogênio converte-se em fibrina polimerizada, formando filamentos, bandas e pseudomembranas adesivas que unem as pleuras visceral e parietal.",
      "7. Compartimentalização do espaço pleural comunicante em múltiplos bolsões e lojas herméticas não comunicantes (loculação pleural), impedindo a drenagem simples por agulha e isolando as bactérias da ação de antimicrobianos sistêmicos.",
      "8. Compressão mecânica extrínseca sobre o parênquima pulmonar com atelectasia compressiva difusa dos lobos pulmonares dependentes, anulação da pressão transpulmonar negativa e colapso ventilatório restritivo com grave desequilíbrio V/Q e hipoxemia arterial.",
      "9. Absorção sistêmica de endotoxinas bacterianas (LPS) e mediadores pró-inflamatórios para a circulação vascular, culminando em síndrome da resposta inflamatória sistêmica (SIRS), vasodilatação microvascular, hipotensão, choque séptico distributivo e disfunção de múltiplos órgãos (MODS).",
    ],
    transmissao: "O piotórax não é uma enfermidade contagiosa por contato casual ou transmissão ambiental indireta entre animais saudáveis. A propagação ocorre estritamente por inoculação direta de agentes bacterianos na cavidade pleural decorrente de brigas territoriais e agressões físicas com mordeduras caninas ou felinas, ou pela inalação de corpos estranhos vegetais no ambiente. Gatos mantidos exclusivamente em ambiente domiciliar protegido (indoor) e castrados apresentam risco próximo a zero de inoculação por mordedura.",
  },
  pathophysiology: {
    mecanicaVentilatoriaEEfusaoPleural: "O espaço pleural normal mantém uma pressão intrapleural negativa (oscilando entre -5 cmH2O no repouso expiratório e -10 cmH2O no pico inspiratório), decorrente da tendência intrínseca elástica do pulmão de retrair-se para dentro contraposta à força elástica da caixa torácica de expandir-se para fora. Quando um volume expressivo de exsudato purulento (frequentemente entre 50 a 300 mL dependendo do porte do paciente) ocupa esse espaço:\n1. O líquido purulento afasta os folhetos pleurais parietal e visceral, abolindo a pressão negativa e desacoplando mecanicamente o tórax do parênquima pulmonar.\n2. A perda da pressão transpulmonar efetiva causa atelectasia compressiva mecânica imediata, especialmente nos lobos pulmonares ventrais e craniais dependentes da gravidade.\n3. A complacência pulmonar e torácica global sofre uma redução abrupta; o paciente precisa gerar um trabalho respiratório imenso para vencer a rigidez mecânica da caixa torácica e ventilar alvéolos colabados.\n4. Para minimizar o gasto energético e prevenir fadiga precoce do diafragma, o sistema nervoso central altera o padrão ventilatório para respiração rápida, superficial e com forte componente muscular abdominal compensatório (padrão respiratório restritivo clássico).\n5. Se a efusão progredir sem alívio, instala-se a assincronia toracoabdominal com respiração paradoxal (o abdômen se expande enquanto a caixa torácica afunda durante a inspiração), sinal fidedigno de fadiga iminente da musculatura diafragmática que precede o colapso respiratório fatal.",
    barreiraDeFibrinaELoculacao: "A fibrina desempenha um papel patológico central no piotórax. O influxo maciço de fibrinogênio plasmático associado à liberação tecidual de tromboplastina pelas células mesoteliais inflamadas ativa a trombina na cavidade pleural. Simultaneamente, a liberação de inibidor do ativador do plasminogênio tipo 1 (PAI-1) bloqueia a dissolução enzimática da fibrina. O resultado é a deposição descontrolada de filamentos de fibrina que rapidamente evoluem para pseudomembranas densas recobrindo as superfícies pleurais (pleurite fibrinosa).\nConsequências Fisiopatológicas:\n- Compartimentalização (Loculação): A cavidade pleural, anatomicamente ampla e comunicante através do mediastino fenestrado em cães e gatos, é segmentada em múltiplos compartimentos herméticos isolados. Um dreno torácico pode desobstruir perfeitamente o compartimento no qual sua extremidade está situada, mas permanecer incapaz de aspirar líquido dos compartimentos adjacentes isolados por septações de fibrina.\n- Restrição Pulmonar Crônica (Fibrotórax / Encarceramento Pulmonar): Se a infecção persistir por semanas, fibroblastos proliferam ao longo da malha de fibrina, depositando colágeno maduro. Forma-se uma casca fibrosa inelástica (peel pleural) sobre o parênquima pulmonar que impede permanentemente a reexpansão pulmonar elástica, exigindo decorticação cirúrgica aberta.",
    "sepseSistêmicaEConsequenciasHemodinamicas": "O piotórax transcende a cavidade torácica: trata-se de uma doença com potencial sistêmico devastador. A vasta superfície absortiva da pleura visceral e parietal permite a passagem contínua de endotoxinas bacterianas (lipopolissacarídeo - LPS de bactérias Gram-negativas, peptideoglicanos e exotoxinas de anaeróbios) para o leito capilar sistêmico.\nCascata da Sepse:\n- Ativação endotelial difusa com superexpressão de óxido nítrico sintase induzível (iNOS), culminando em perda do tônus vascular arteriolar periférico, vasodilatação descontrolada e choque séptico distributivo.\n- Aumento da permeabilidade capilar generalizada com extravasamento de plasma e hipoalbuminemia acentuada por perda de macromoléculas para o terceiro espaço e consumo metabólico agudo.\n- Hipoperfusão tecidual sistêmica e isquemia celular decorrentes de hipotensão, má distribuição microcirculatória e coagulopatia de consumo secundária à ativação da coagulação intravascular disseminada (CID).\n- Disfunção Renal Aguda (LRA) e falência de múltiplos órgãos: O paciente séptico pode ir a óbito por falência circulatória e choque séptico mesmo após o esvaziamento cirúrgico de todo o líquido torácico.",
    cineticaDoLactatoEHipoperfusao: "A dosagem seriada de lactato sanguíneo à beira-leito reflete o grau de hipoperfusão tecidual periférica, glicólise anaeróbia tecidual acelerada e hiperestimulação adrenérgica endógena. Zhang & Grobman (2025) demonstraram em estudo retrospectivo com 43 cães e 8 gatos que a elevação do lactato sérico na admissão exibe correlação moderada com a mortalidade em cães com piotórax, onde cada aumento de 1 mmol/L elevou a razão de chances (odds ratio) de óbito. Entretanto, o lactato não deve ser utilizado de forma isolada para definir eutanásia ou prognóstico fatal, mas sim como biomarcador dinâmico de resposta hemodinâmica à fluidoterapia titulada e à drenagem cirúrgica de foco.",
  },
  clinicalSignsPathophysiology: [
    {
      system: "respiratory",
      findings: [
        {
          finding: "Taquipneia marcante com respiração rápida, superficial e esforço muscular abdominal compensatório",
          mechanism: "Atelectasia compressiva dos lobos pulmonares caudais e ventrais causada pelo volume purulento intrapleural; o paciente eleva a frequência respiratória para compensar a drástica redução no volume corrente efetivo sem despender trabalho elástico excessivo contra a caixa rígida.",
          clinicalMeaning: "Padrão respiratório restritivo clássico indicativo de afecção do espaço pleural; exige alívio descompressivo antes de exames laboratoriais ou radiográficos.",
          priority: "emergency",
        },
        {
          finding: "Sons pulmonares ausentes ou marcadamente diminuídos na ausculta dos campos pulmonares ventrais",
          mechanism: "O líquido purulento e espesso acumula-se ventralmente por gravidade no paciente em estação ou decúbito esternal, funcionando como isolante acústico que atenua a transmissão das vibrações sonoras do fluxo aéreo alveolar até a parede costal.",
          clinicalMeaning: "Achado semiológico crucial que localiza a afecção no espaço pleural ventral e orienta o sítio de toracocentese no 7º ou 8º espaço intercostal cranioventral.",
          priority: "common",
        },
        {
          finding: "Postura ortopneica com extensão de pescoço, cotovelos abduzidos e respiração de boca aberta em felinos",
          mechanism: "Mecanismo postural reflexo para maximizar a abertura das vias aéreas superiores, otimizar a excursão da musculatura intercostal externa e aliviar a pressão do diafragma contra vísceras abdominais durante hipoxemia extrema.",
          clinicalMeaning: "Sinal de exaustão respiratória iminente; em gatos, a respiração de boca aberta é um alerta vermelho de risco de óbito em poucos minutos se não instituída oxigenoterapia e punção de alívio.",
          priority: "emergency",
        },
        {
          finding: "Respiração paradoxal toracoabdominal (afundamento costal com protrusão abdominal inspiratória)",
          mechanism: "Fadiga e dissociação mecânica entre os músculos diafragmático e intercostais decorrente da sobrecarga de trabalho respiratório crônica contra pulmões inelásticos colabados.",
          clinicalMeaning: "Indicação mandatória de toracocentese de emergência imediata e vigilância contínua para necessidade de ventilação mecânica invasiva.",
          priority: "emergency",
        },
      ],
    },
    {
      system: "cardiovascular",
      findings: [
        {
          finding: "Abafamento pronunciado das bulhas cardíacas na ausculta torácica ventral bilateral",
          mechanism: "Interposição da coluna de líquido exsudativo inflamatório entre o miocárdio e a parede costal, dissipando as ondas sonoras do fechamento valvar atrioventricular e semilunar.",
          clinicalMeaning: "Confirma acúmulo de efusão pericárdica ou pleural pericárdica/mediastinal anterior; orienta punção esvaziadora.",
          priority: "common",
        },
        {
          finding: "Taquicardia compensatória ou bradicardia paradoxal em gatos sépticos hipotérmicos",
          mechanism: "A taquicardia decorre de ativação simpática reflexa por hipoxemia, dor torácica e hipovolemia. A bradicardia em gatos decorre do desarranjo hemodinâmico do choque séptico terminal felino mediado por hipotermia profunda e falência nodal.",
          clinicalMeaning: "Gatos sépticos com bradicardia e hipotermia apresentam altíssima mortalidade imediata, demandando aquecimento gradual ativo e suporte inotrópico em UTI.",
          priority: "emergency",
        },
        {
          finding: "Hipotensão arterial sistêmica (PAS < 90 mmHg) e tempo de preenchimento capilar prolongado ou hiperêmico",
          mechanism: "Vasodilatação periférica descontrolada induzida por óxido nítrico endotelial (sepse distributiva) e diminuição do retorno venoso (pré-carga) pelo aumento da pressão positiva intratorácica compressiva.",
          clinicalMeaning: "Evidência de choque séptico circulatório; exige fluidoterapia guiada por metas (respeitando limites pulmonares) e suporte vasopressor.",
          priority: "emergency",
        },
      ],
    },
    {
      system: "general",
      findings: [
        {
          finding: "Pirexia/febre de início agudo (> 39,5 °C) ou hipotermia profunda (< 37,5 °C em felinos)",
          mechanism: "Liberação de pirógenos endógenos (IL-1, TNF-alfa, prostaglandina E2 hipotalâmica) pelas colônias bacterianas e neutrófilos ativados. A hipotermia resulta do colapso metabólico e falência da termorregulação na sepse avançada.",
          clinicalMeaning: "A febre sinaliza processo infeccioso séptico ativo; a hipotermia é marcador prognóstico crítico de choque séptico descompensado em gatos.",
          priority: "common",
        },
        {
          finding: "Prostração, adipsia, anorexia profunda e letargia severa",
          mechanism: "Ação de citocinas inflamatórias circulantes sobre o centro de saciedade hipotalâmico associada ao imenso consumo energético despendido pelo esforço respiratório.",
          clinicalMeaning: "Sinaliza debilidade sistêmica e risco rápido de desidratação e perda muscular, justificando suporte nutricional precoce pós-estabilização.",
          priority: "common",
        },
        {
          finding: "Emagrecimento progressivo, perda de massa magra e pelagem opaca sem brilho na forma crônica insidiosa",
          mechanism: "Instalação insidiosa da infecção bacteriana por anaeróbios estritos de baixa virulência aguda ou Actinomyces spp., promovendo caquexia inflamatória crônica com sequestro de proteínas.",
          clinicalMeaning: "Comum em felinos que compensam a efusão pleural por semanas até atingirem o limiar de colapso ventilatório mecânico.",
          priority: "systemic",
        },
      ],
    },
    {
      system: "gastrointestinal",
      findings: [
        {
          finding: "Náusea, sialorreia, regurgitação e disfagia",
          mechanism: "Compressão extrínseca do esôfago torácico por empiema mediastinal, abscesso paraesofágico ou linfadenomegalia mediastinal cranial volumosa.",
          clinicalMeaning: "Alerta para a possibilidade de corpo estranho esofágico perfurante ou empiema mediastinal associado; exige investigação tomográfica/endoscópica.",
          priority: "common",
        },
        {
          finding: "Dor à palpação cranial do abdômen e hiporexia reflexa",
          mechanism: "Hiperatividade espástica e fadiga da musculatura diafragmática que se estende por contiguidade aos pilares diafragmáticos e peritônio parietal cranial.",
          clinicalMeaning: "Pode induzir erroneamente à suspeita de abdômen agudo primário (como pancreatite ou peritonite), desviando a atenção do foco torácico.",
          priority: "common",
        },
      ],
    },
    {
      system: "musculoskeletal",
      findings: [
        {
          finding: "Intolerância absoluta ao exercício e relutância persistente ao decúbito lateral",
          mechanism: "O decúbito lateral agrava a atelectasia do pulmão dependente e comprime a caixa torácica contralateral; o animal adota decúbito esternal rígido ou senta-se continuamente para permitir excursão torácica bilateral.",
          clinicalMeaning: "Nunca forçar o animal ao decúbito lateral para contenção ou radiografia; o estresse mecânico pode desencadear PCR imediata.",
          priority: "emergency",
        },
        {
          finding: "Presença de crostas puntiformes, aumento de volume subcutâneo ou trajetos fistulosos intercostais",
          mechanism: "Cicatrizes puntiformes de dentes caninos por brigas em gatos ou fístulas drenantes causadas por migração de espigueta vegetal em cães.",
          clinicalMeaning: "Achado patognomônico da porta de entrada traumática penetrante; orienta o sítio de dissecção cirúrgica e cultivo microbiológico.",
          priority: "common",
        },
      ],
    },
    {
      system: "metabolic",
      findings: [
        {
          finding: "Hiperlactatemia tecidual (> 2,5 a 4,0 mmol/L) e acidose metabólica ou mista",
          mechanism: "Metabolismo anaeróbio tecidual induzido por hipoxemia arterial grave, má perfusão periférica na sepse e acidose respiratória por retenção de CO2 decorrente de hipoventilação alveolar.",
          clinicalMeaning: "Biomarcador dinâmico de gravidade; Zhang & Grobman (2025) demonstraram que a hiperlactatemia correlaciona-se com maior risco de óbito canino, exigindo ressuscitação volêmica guiada.",
          priority: "emergency",
        },
        {
          finding: "Hipoalbuminemia moderada a grave (< 2,0 g/dL) com hiperglobulinemia policlonal",
          mechanism: "Extravasamento maciço de albumina plasmática para o exsudato purulento do espaço pleural e comportamento da albumina como proteína de fase aguda negativa na sepse, associada a produção policlonal de imunoglobulinas na inflamação crônica (65,4% dos gatos em Sim et al., 2021).",
          clinicalMeaning: "Reduz a pressão oncótica plasmática favorecendo edema periférico e agrava a hipovolemia intravascular.",
          priority: "systemic",
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: "Triagem Emergencial, Avaliação Fisiológica e Oxigenoterapia Imediata",
      purpose: "Estabilizar o suporte ventilatório do paciente em insuficiência respiratória restritiva aguda e prevenir a parada cardiorrespiratória induzida por estresse ou contenção forçada na sala de emergência.",
      description: "Triagem visual sem manipulação física agressiva (\"hands-off\"). Acomodação imediata em gaiola com oxigênio enriquecido a 40-50% (ou fluxo contínuo de oxigênio de 3-5 L/min próximo às narinas). Avaliação da frequência respiratória, amplitude do movimento costal, sincronia toracoabdominal, presença de respiração de boca aberta em felinos, postura ortopneica e coloração de mucosas. Evitar estritamente venopunção, tricotomia ampla ou posicionamento em decúbito neste primeiro momento.",
      interpretation: "Identificação do padrão respiratório restritivo (taquipneia rápida e superficial com esforço abdominal marcado), sugerindo fortemente doença de espaço pleural que requer alívio descompressivo antes de qualquer exame de imagem convencional.",
      limitations: "A oxigenoterapia isolada não reverte a atelectasia compressiva pulmonar se o espaço pleural estiver repleto de líquido purulento sob tensão.",
    },
    {
      stepNumber: 2,
      title: "Ultrassonografia Torácica Focalizada à Beira-Leito (POCUS / T-FAST)",
      purpose: "Confirmar em tempo real a presença, localização e características ecográficas da efusão pleural e guiar com segurança a toracocentese emergencial.",
      description: "Exame ultrassonográfico rápido com transdutor microconvexo ou linear colocado com o animal em repouso esternal ou na posição ortopneica que melhor tolere. Varredura nos pontos bilateralmente: Ponto Tórax-Dorsal (CTS), Ponto Tórax-Ventral/Cardíaco (PCS) e Ponto Diafragmático-Hepático (DH). Identificação do espaço anecoico ou hipoecoico entre pleura parietal e visceral, retração dos bordos pulmonares caudais, presença de bandas e filamentos ecogênicos flutuantes de fibrina e loculações herméticas.",
      interpretation: "A presença de líquido heterogêneo com grumos celulares ecogênicos e septações de fibrina sugere fortemente exsudato séptico purulento (piotórax). O POCUS identifica se o derrame é unilateral ou bilateral e indica o espaço intercostal exato com maior coluna de fluido segura para punção.",
      limitations: "O POCUS confirma efusão pleural e sugere exsudato, mas não substitui a citopatologia para distinguir piotórax de quilotórax, hemotórax ou peritonite infecciosa felina (PIF).",
    },
    {
      stepNumber: 3,
      title: "Toracocentese Diagnóstica e Terapêutica de Emergência",
      purpose: "Aliviar imediatamente a compressão torácica mecânica, restaurar a pressão transpulmonar para permitir expansão alveolar e obter amostras para análise laboratorial e microbiológica.",
      description: "Com o paciente em esternal sob oxigênio, realiza-se antissepsia rápida no 7º ou 8º espaço intercostal cranioventral (guiado por POCUS ou ausculta). Introdução de agulha 20-22G ou cateter sobre agulha (ou cateter borboleta acoplado a torneira de 3 vias e seringa) junto à borda cranial da costela para evitar laceração do feixe vasculonervoso intercostal. Drenagem gradual e contínua do líquido purulento com tração suave da seringa para evitar colapso tecidual contra o orifício da agulha. Fracionamento imediato em tubos com EDTA (citologia), tubos secos estéreis (bioquímica e cultura aeróbia) e frasco de transporte para anaeróbios.",
      interpretation: "Aspecto macroscópico do líquido: tipicamente opaco, turvo, viscoso, com coloração variando de amarelada, acastanhada a sanguinolenta (\"leite achocolatado\") e odor frequentemente fétido pungente característico de bactérias anaeróbias. A melhora clínica da mecânica respiratória é imediata.",
      limitations: "Se o exsudato for excessivamente espesso e repleto de grumos de fibrina, a agulha de toracocentese pode obstruir repetidamente, exigindo conversão rápida para tubo de toracostomia de lúmen contínuo.",
    },
    {
      stepNumber: 4,
      title: "Análise Citopatológica do Líquido Pleural e Pesquisa de Bactérias Fagocitadas",
      purpose: "Estabelecer o diagnóstico confirmatório definitivo de piotórax à beira-leito, classificar a reação inflamatória e diferenciar exsudato séptico de outras afecções pleurais.",
      description: "Confecção de esfregaços diretos e após centrifugação suave do líquido com EDTA. Coloração rápida de Wright, Diff-Quik ou Giemsa e coloração de Gram. Avaliação sob microscopia óptica em aumento de 100x a 1000x sob imersão de óleo. Avaliação da morfologia neutrofílica (degeneração hidrópica, tumefação nuclear, perda de segmentação e cariólise) e pesquisa minuciosa de bactérias no citoplasma dos neutrófilos (bactérias intracelulares fagocitadas).",
      interpretation: "Diagnóstico Padrão Ouro Imediato: A identificação de neutrófilos degenerados contendo bactérias intracelulares confirma processo séptico ativo in vivo. Podem ser observados cocos aos pares/cadeias (Streptococcus/Enterococcus), pequenos bacilos (Enterobacterales/Pasteurella/anaeróbios) ou filamentos bacterianos ramificados (Actinomyces/Nocardia). A presença de bactérias extracelulares isoladas sem neutrófilos degenerados exige cautela para afastar contaminação acidental de coleta.",
      limitations: "A ausência de bactérias observadas na citologia NÃO exclui piotórax: no estudo de Johnson et al. (2023), 7% dos gatos e 27% dos cães com piotórax não exibiam bactérias visíveis na citologia inicial; em Sim et al. (2021), apenas 47,4% apresentavam bactérias visíveis ao microscópio.",
      isGoldStandard: true,
    },
    {
      stepNumber: 5,
      title: "Cultura Microbiológica Quantitativa Aeróbia e Anaeróbia com Antibiograma",
      purpose: "Identificar os agentes etiológicos específicos causadores da infecção e traçar o perfil de sensibilidade e resistência aos antimicrobianos para direcionamento e desescalonamento terapêutico.",
      description: "Envio imediato de alíquotas do líquido pleural recém-coletado em seringa vedada sem bolhas de ar ou inoculação direta em meio de transporte estéril específico para anaeróbios (ex: frascos com tioglicolato ou meio Port-A-Cul). Solicitação explícita ao laboratório de cultura aeróbia, cultura anaeróbia estrita e cultura prolongada (14 a 21 dias) para Actinomyces spp. e Nocardia spp. se houver filamentos na citologia.",
      interpretation: "Crescimento bacteriano isolado ou polimicrobiano com determinação da Concentração Inibitória Mínima (MIC). Em felinos, isolamento comum de Fusobacterium, Prevotella, Bacteroides, Pasteurella multocida e Streptococcus. Em cães, isolamento frequente de Actinomyces, E. coli, Klebsiella e anaeróbios.",
      limitations: "Culturas negativas ocorrem com frequência (até 20-30% dos casos) devido ao uso prévio de antibióticos, exposição de anaeróbios estritos ao ar durante a coleta/transporte ou falha na incubação de organismos fastidiosos. Cultura negativa jamais descarta piotórax se houver exsudato purulento degenerativo.",
    },
    {
      stepNumber: 6,
      title: "Exame Radiográfico Torácico Pós-Drenagem e Descompressão",
      purpose: "Avaliar a anatomia intratorácica sem a sobreposição da efusão opaca, detectando pneumopatias primárias, pneumonia bacteriana, corpos estranhos, pneumotórax e consolidações.",
      description: "Realização de projeções radiográficas ortogonais (laterolateral direita, laterolateral esquerda e ventrodorsal ou dorsoventral) executadas estritamente APÓS a drenagem terapêutica de alívio da efusão pleural e recuperação clínica estável do paciente.",
      interpretation: "Identificação de pneumonia por aspiração, consolidação lobar, abscessos pulmonares escavados, torção de lobo pulmonar secundária, pneumotórax sob tensão, espessamento da pleura visceral, persistência de efusão encapsulada residual e corpos estranhos radiopacos (chumbinhos, fragmentos ósseos).",
      limitations: "Espiguetas de gramíneas e corpos estranhos vegetais são radiotransparentes e invisíveis no raio-X convencional, exibindo apenas sinais indiretos de reação inflamatória focal.",
    },
    {
      stepNumber: 7,
      title: "Tomografia Computadorizada Contrastada de Tórax (TC)",
      purpose: "Mapear tridimensionalmente a arquitetura pleural, detectar loculações herméticas, abscesso mediastinal paraesofágico e trajetos de corpos estranhos vegetais migratórios indicando cirurgia.",
      description: "Varredura tomográfica helicoidal de alta resolução antes e após administração de meio de contraste iodado intravenoso (600 a 700 mg de iodo/kg), realizada sob anestesia geral e ventilação mecânica controlada com paciente clinicamente estável.",
      interpretation: "Eiras-Diaz et al. (2021) demonstraram em 101 cães que a TC identifica com precisão: espessamento pleural (84,1%), pannus inflamatório (67,3%), pneumotórax associado (61,4%), abscesso pulmonar (13,8%), abscesso mediastinal (7,9%) e corpos estranhos vegetais ou trajetos fistulosos (14,8%). Todos os cães com corpo estranho identificado na TC foram encaminhados para intervenção cirúrgica com sucesso.",
      limitations: "Requer anestesia geral e estabilização hemodinâmica prévia; não deve ser realizada na admissão em pacientes em choque séptico ou dispneia descompensada.",
    },
  ],
  treatment: {
    metaPrimaria: "A meta terapêutica primária e inegociável no piotórax canino e felino consiste na tríade integrada: 1. Estabilização cardiorrespiratória e hemodinâmica intensiva; 2. Controle mecânico estrito de foco (source control) mediante toracostomia com dreno e lavagem pleural seriada para desbridamento de pus, fibrina e toxinas bacterianas; 3. Erradicação bacteriana por antibioticoterapia parenteral de quatro quadrantes de amplo espectro, seguida de transição para via oral mantida até resolução citológica e radiográfica completa (3 a 6 semanas).",
    estabilizacaoEmergencialOxigenoterapia: "O manejo da admissão exige protocolo \"hands-off\" estrito:\n1. Oxigenoterapia Passiva Imediata: Acomodação em incubadora/gaiola de oxigênio enriquecido a 40-50% com fluxo contínuo ou máscara facial sem vedação agressiva (\"blow-by\" a 3-5 L/min).\n2. Analgesia Parenteral de Resgate: A pleura parietal é densamente inervada por fibras somáticas nociceptivas sensíveis à distensão e inflamação aguda. A dor agrava a taquipneia restritiva e o consumo metabólico de O2. Administrar metadona (0,1 a 0,2 mg/kg IV ou IM lenta) ou buprenorfina (0,01 a 0,02 mg/kg IV, IM ou transmucosa oral em gatos). Evitar AINEs na fase de choque séptico.\n3. Ressuscitação Volêmica Cautelosa: Em pacientes hipotensos (PAS < 90 mmHg), com tempo de preenchimento capilar alterado ou hiperlactatemia, instituir expansão com cristalóide isotônico (Ringer Lactato ou NaCl 0,9%) em alíquotas conservadoras (bolus de 10 a 15 mL/kg em cães e 3 a 5 mL/kg em gatos infundidos em 15 a 20 minutos), monitorando rigorosamente ausculta pulmonar e pressão venosa central para prevenir sobrecarga hídrica e edema pulmonar em parênquima inflamado.",
    toracocenteseDeAlivio: "Procedimento simultaneamente diagnóstico e terapêutico que deve ser realizado imediatamente após confirmação de efusão por POCUS em paciente dispneico:\n- Técnica: Animal mantido em decúbito esternal sob oxigênio. Puncionar o 7º ou 8º espaço intercostal cranioventral junto à borda cranial da costela utilizando agulha 20-22G ou cateter borboleta conectado a torneira de 3 vias e seringa de 20 a 60 mL.\n- Aspiração Esvaziadora: Aspirar o maior volume possível de líquido purulento até que haja resistência do êmbolo ou tosse decorrente da reexpansão pleural.\n- Regra de Ouro: Toracocenteses intermitentes repetidas NÃO constituem terapia definitiva para piotórax estabelecido. Nelson & Couto (6ª ed.) enfatiza que a punção repetida por agulha traumatiza repetidamente a pleura, não mantém a cavidade limpa, obstrui com grumos e apresenta taxa de falha proibitiva em relação à drenagem por tubo contínuo.",
    drenagemToracicaToracostomia: "Após a estabilização ventilatória inicial, a colocação de tubo de toracostomia é mandatória em todos os pacientes com piotórax:\n1. Seleção do Calibre do Dreno:\n- Gatos e Cães Pequenos: Evidências modernas (Heier et al., 2022) comprovaram que drenos pequenos de 6 French a 10 French implantados pela técnica wire-guided (Seldinger) são altamente eficazes para drenar exsudatos purulentos e realizar lavagens pleurais na espécie felina, apresentando taxa mínima de complicações mecânicas de apenas 4% (3/67 tubos) e excelente sobrevida em 1 ano (94%). Essa evidência desmistifica a crença tradicional de que gatos com pus exigem compulsoriamente drenos traumáticos calibrosos (> 14 F).\n- Cães Médios e Grandes: Tubos de 14 F a 24 F são indicados conforme a viscosidade do exsudato e presença de detritos de fibrina.\n2. Unilateral versus Bilateral:\n- Não colocar dreno bilateral sistematicamente por dogma. Embora a efusão seja bilateral em mais de 65% dos pacientes, a cavidade pleural de cães e gatos frequentemente apresenta fenestrações mediastinais que permitem a drenagem de ambos os hemitórax por um único dreno bem posicionado.\n- Conduta Prática: Instalar o primeiro dreno no hemitórax com maior volume. Após a aspiração inicial, reavaliar o hemitórax contralateral com ultrassonografia (POCUS). Se persistir volume significativo não comunicado, indicar a inserção de um segundo dreno no lado oposto (BSAVA Guide to Procedures, 2024; Heier et al., 2022).\n3. Técnica e Posicionamento:\n- Inserção típica através da pele no 9º ou 10º espaço intercostal, criando túnel subcutâneo cranial de 2 a 3 espaços para penetrar a cavidade pleural no 7º ou 8º espaço intercostal (borda cranial da costela), avançando o tubo em direção cranioventral.\n- Fixação cutânea segura em \"sandália romana\" (Chinese finger trap) com fio inabsorvível (nylon ou polipropileno 2-0 ou 0), curativo estéril compressivo leve de três camadas e uso obrigatório inegociável de colar elisabetano.",
    lavagemPleuralIsotonica: "A lavagem pleural dilui o pus denso, dissolve fibrina solúvel, remove citocinas inflamatórias livres e bactérias viáveis, restabelecendo a mobilidade pulmonar:\n- Protocolo Operacional (BSAVA 2024; Feline ECC 2023):\n1. Instilação de 10 a 20 mL/kg de solução de NaCl 0,9% estéril ou Ringer simples aquecida à temperatura corpórea (38 °C a 38,5 °C).\n2. Infusão lenta por gravidade ou seringa ao longo de 5 a 10 minutos, monitorando atentamente a frequência respiratória e o esforço do paciente.\n3. Permitir que o líquido permaneça em repouso intrapleural por 10 a 15 minutos; se tolerado, realizar rotação suave de decúbito do paciente para distribuir o líquido pelos recessos pleurais.\n4. Aspiração ativa cuidadosa com seringa ou sistema de vácuo, medindo rigorosamente o volume recuperado.\n- Regra Vital da Recuperação (≥ 75%): Deve-se recuperar obrigatoriamente pelo menos 75% do volume instilado (ex: infundidos 100 mL, recuperar no mínimo 75 mL). Se a recuperação for inferior a 75%, suspender novas lavagens imediatamente: o líquido retido aumenta a compressão pulmonar e indica obstrução de fenestras do dreno, dobra mecânica do tubo ou aprisionamento em lojas herméticas não comunicantes.\n- Proibições Formais: A ISCAID (Lappin et al., 2017) declara formalmente a ausência de dados favoráveis e NÃO recomenda a adição intrapleural de antibióticos (risco de pleurite química severa, dor intensa e absorção sistêmica imprevisível). Da mesma forma, Heier et al. (2022) demonstraram que a adição de heparina (10 UI/mL) à solução de lavagem não confere benefício de sobrevida.",
    antimicrobianosEmpiricosIniciais: "A escolha antimicrobiana inicial deve ser iniciada imediatamente após a obtenção das amostras de toracocentese (ou antes se o paciente estiver em choque séptico refratário), cobrindo quatro quadrantes (Gram-positivos, Gram-negativos e bactérias anaeróbias estritas):\n1. Ampicilina + Sulbactam (Primeira Escolha):\n- Dose de Referência (Plumb 10ª ed.): 22 a 30 mg/kg IV a cada 6 a 8 horas (calculada pelo peso combinado ampicilina+sulbactam).\n- Justificativa: Penicilina potencializada por inibidor suicida de beta-lactamases; excelente ação bactericida contra Gram-positivos e anaeróbios estritos orais (Fusobacterium, Prevotella, Peptostreptococcus), com excelente penetração e concentração no líquido pleural inflamado.\n2. Associação com Fluoroquinolona Parenteral (Cobertura de Gram-negativos entéricos):\n- Em Cães: Enrofloxacina na dose de 10 a 20 mg/kg IV ou SC a cada 24 horas (diluída em salina e administrada em infusão lenta de 20 minutos).\n- Em Gatos — ALERTA FARMACOLÓGICO ABSOLUTO: A dose de enrofloxacina em felinos NUNCA deve ultrapassar 5,0 mg/kg IV ou SC a cada 24 horas. Doses iguais ou superiores a 15-20 mg/kg desencadeiam degeneração aguda difusa de fotorreceptores da retina mediada por defeito na depuração do fármaco pelo transportador ABCG2, causando cegueira permanente e midríase irreversível em felinos.\n- Alternativa Segura para Gram-negativos em Gatos e Cães: Marbofloxacina na dose de 2,75 a 5,5 mg/kg IV ou VO a cada 24 horas (excelente biodisponibilidade e ausência de risco retinotóxico nas doses preconizadas; ciente de que não possui cobertura para anaeróbios).\n3. Clindamicina (Alternativa para Anaeróbios / Gram-positivos):\n- Cães: 10 mg/kg IV a cada 12 horas; Gatos: 10 a 15 mg/kg IV a cada 12 horas (sempre diluída em solução glicosada ou salina e infundida em 20 minutos; nunca em bolus rápido pelo risco de colapso hemodinâmico e arritmias). Indicada quando há hipersensibilidade a penicilinas, com a ressalva de que algumas cepas de Bacteroides fragilis exibem resistência.",
    ajustePorCulturaEStewardship: "Regras de Stewardship Antimicrobiano e Desescalonamento:\n- Assim que os resultados da cultura aeróbia e anaeróbia e antibiograma estiverem disponíveis (geralmente entre 48 a 96 horas), o esquema antimicrobiano deve ser reavaliado.\n- Se o patógeno isolado for altamente suscetível e o paciente apresentar resposta clínica e citológica favorável, desescalonar para monoterapia direcionada.\n- Regra de Ouro da ISCAID para Anaeróbios: Diante de cultura anaeróbia negativa em um paciente que responde bem e possui forte suspeita de mordedura ou corpo estranho, NUNCA suspender a cobertura anaeróbia. As bactérias anaeróbias morrem com extrema facilidade por toxicidade do oxigênio durante a coleta e transporte rotineiros ao laboratório.\n- Step-Down Oral: Quando o dreno for retirado, o paciente tolerar via oral e a inflamação estiver em resolução, transicionar para Amoxicilina com Clavulanato de potássio:\n  * Cães: 11 a 13,75 mg/kg VO a cada 8 a 12 horas (Nelson & Couto 6ª ed.; Plumb 10ª ed.).\n  * Gatos: 12,5 mg/kg VO a cada 8 a 12 horas.\n- Duração Total: Manter antibioticoterapia por 3 a 6 semanas completas, monitorando radiografias torácicas de controle para prevenir recidivas crônicas e empiemas tardios.",
    terapiaAnalgesicaMultimodal: "O controle álgico contínuo é imperativo para reduzir o estresse, melhorar a excursão ventilatória e tolerar o dreno torácico:\n- Opioides Puros em UTI: Metadona na dose de 0,1 a 0,3 mg/kg IV ou IM a cada 4 a 6 horas, ou Fentanil em infusão contínua (CRI) a 2 a 5 mcg/kg/hora após dose de ataque de 1 a 2 mcg/kg IV.\n- Felinos Estabilizados: Buprenorfina na dose de 0,01 a 0,02 mg/kg IV, IM ou via transmucosa oral a cada 6 a 8 horas.\n- Bloqueio Anestésico Intercostal Local: Bloqueio perineural do feixe intercostal no espaço da toracostomia e em um espaço cranial e caudal utilizando bupivacaína 0,5% sem vasoconstritor (1 a 2 mg/kg no cão; 0,5 a 1 mg/kg no gato, dividida entre os sítios), proporcionando analgesia de até 6 a 8 horas.\n- Contraindicação Formal de AINEs: Anti-inflamatórios não esteroidais (como meloxicam, carprofeno, cetoprofeno) são expressamente contraindicados na fase inicial aguda de piotórax devido ao risco inaceitável de precipitar lesão renal aguda isquêmica (LRA), hipotensão refratária e úlceras gastrointestinais perfurantes em pacientes desidratados ou sépticos.",
    indicacoesTomografiaECirurgia: "A cirurgia torácica (toracotomia intercostal, esternotomia mediana ou videocirurgia - VATS) deixa de ser último recurso e torna-se primeira escolha quando o dreno torácico não consegue resolver o foco infeccioso subjacente:\n1. Indicações Formais Absolutas:\n- Presença de corpo estranho vegetal migratório ou fragmento estranho identificado em TC ou radiografia (Eiras-Diaz et al., 2021 comprovaram que 100% dos cães com corpo estranho identificados na TC foram curados após abordagem cirúrgica).\n- Abscesso pulmonar cavitário volumoso com necrose parenquimatosa exigindo lobectomia pulmonar parcial ou total.\n- Abscesso mediastinal cranial ou paraesofágico encapsulado (como documentado em Jang et al., 2025).\n- Perfuração transmural do esôfago torácico.\n- Fístula broncopleural persistente com grande vazamento aéreo contínuo e pneumotórax sob tensão.\n- Torção de lobo pulmonar secundária ao processo inflamatório pleural.\n2. Indicações Relativas e Falha Terapêutica Médica:\n- Persistência de grande volume de produção purulenta, febre séptica contínua e leucocitose com desvio à esquerda após 48 a 72 horas de drenagem funcional e antibioticoterapia adequada.\n- Presença de múltiplas lojas e loculações herméticas não drenáveis associadas a espessamento pleural inelástico (fibrotórax / encarceramento pulmonar), exigindo desbridamento e decorticação pleural aberta.",
    terapiasInadequadasEMitos: "Erros Clínicos Críticos e Mitos Frequentes na Rotina de Plantão:\n1. Mito \"Primeiro preciso fazer radiografia torácica antes de qualquer procedimento\": Erro potencialmente fatal. Em pacientes com dispneia restritiva severa e abafamento auscultatório, a contenção para raio-X em decúbito precipita parada cardiorrespiratória por exaustão diafragmática. A conduta correta é: oxigênio, POCUS e toracocentese imediata; radiografar somente após estabilização.\n2. Mito \"Antibiótico intrapleural melhora o resultado\": A ISCAID contraindica formalmente a instilação intrapleural de antibióticos. A droga causa irritação química direta na pleura, agrava a formação de aderências e não substitui a drenagem mecânica.\n3. Mito \"Adicionar heparina à lavagem pleural aumenta a sobrevida\": Heier et al. (2022) avaliaram o uso de heparina (10 UI/mL) na lavagem pleural felina e constataram ausência de qualquer benefício clínico ou de sobrevida em comparação à salina isotônica pura.\n4. Mito \"O dreno torácico deve ser retirado logo que o animal respire melhor\": A melhora clínica nas primeiras 24 horas decorre apenas do alívio ventilatório. Retirar o dreno precocemente com pus residual leva a reacúmulo rápido, organização fibrosa e necessidade de intervenção cirúrgica de resgate.\n5. Mito \"Se o paciente não melhora em 48 horas, troque imediatamente o antibiótico\": Na maioria das vezes, a falha terapêutica precoce não é resistência antimicrobiana, mas sim falha mecânica de controle de foco (source control): dreno dobrado, orifícios obstruídos por fibrina, bolsões loculados não drenados ou corpo estranho vegetal residual.",
    monitoramentoCriticoECriteriosRetiradaDreno: "Parâmetros de Monitoramento Contínuo em UTI e Critérios para Remoção Segura do Dreno:\n1. Monitoramento Clínico-Laboratorial Seriados:\n- Frequência respiratória e esforço ventilatório avaliados a cada 1 a 2 horas.\n- Ausculta pulmonar e cardíaca e controle rigoroso de dor torácica.\n- Temperatura central e pressão arterial a cada 4 horas.\n- Citopatologia seriada do líquido pleural drenado a cada 24 horas: monitorar a regressão do número de neutrófilos, o desaparecimento das bactérias intracelulares e a transição para aspecto serossanguinolento claro com macrófagos espumosos.\n- Hematócrito, proteínas totais, lactato sérico e contagem de leucócitos a cada 24 a 48 horas.\n2. Critérios Objetivos para Retirada do Dreno Torácico:\n- Volume drenado inferior a 2 a 3 mL/kg/dia (BSAVA 2024; Manual of Small Animal ECC 2ª ed.): lembrar que a presença mecânica do próprio dreno de toracostomia atua como corpo estranho irritativo e induz a produção basal de 1 a 2 mL/kg/dia de líquido seroso reativo estéril.\n- Resolução Citológica: Ausência absoluta de bactérias intra e extracelulares na citologia do fluido drenado por pelo menos 48 horas consecutivas, com predomínio de neutrófilos íntegros e células mononucleares sem degeneração cariolítica.\n- Ausência de febre há mais de 48 horas e recuperação do apetite voluntário.\n- Reavaliação por POCUS e Radiografia Torácica confirmando reexpansão pulmonar completa e ausência de bolsões residuais de fluido.",
    casoClinicoFelinoPiotoraxSubagudo: "Caso Clínico 1 (Medicina Felina) — Piotórax subagudo por mordedura em gato jovem com dreno 6 F:\nGato macho de 3 anos, castrado, com histórico de vida semidomiciliada e episódio de briga territorial há 12 dias. Foi admitido no setor de emergência em quadro de prostração profunda, hiporexia há 5 dias e dispneia restritiva grave com respiração de boca aberta e abdução dos cotovelos. Ao exame físico inicial: temperatura central de 37,1 °C (hipotermia de sepse felina), tempo de preenchimento capilar de 2,5 segundos, mucosas hipocoradas e ausculta torácica revelando abafamento completo de sons pulmonares e bulhas cardíacas nos dois terços ventrais.\nConduta Imediata: O paciente foi imediatamente colocado em fluxo livre de oxigênio (\"hands-off\"). A ultrassonografia rápida (POCUS/T-FAST) evidenciou grande volume de efusão pleural bilateral com partículas ecogênicas e espessamento pleural. Realizada toracocentese bilateral de alívio sem contenção estressante, recuperando 160 mL de líquido purulento avermelhado turvo de odor fétido. A citopatologia imediata revelou exsudato séptico clássico com milhares de neutrófilos degenerados cariolíticos e múltiplos bacilos Gram-negativos e cocos fagocitados (padrão ouro).\nManejo Hospitalar: Iniciada ressuscitação volêmica aquecida com Ringer Lactato (alíquotas fracionadas de 5 mL/kg), metadona (0,15 mg/kg IV) e antimicrobianos intravenosos: ampicilina-sulbactam (25 mg/kg IV a cada 8 horas) associada a marbofloxacina (3 mg/kg IV a cada 24 horas). Sob sedação suave com cetamina e midazolam, foi implantado um dreno torácico 6 French wire-guided (sistema Seldinger) no hemitórax direito, com comunicação pleural contralateral comprovada pelo POCUS de controle. Foram realizadas drenagens ativas a cada 4 horas e lavagens pleurais duas vezes ao dia com salina morna a 15 mL/kg (recuperação média de 85% do volume). Ao 4º dia de UTI, o volume drenado reduziu para 1,8 mL/kg/dia, a citologia tornou-se negativa para bactérias e o animal recuperou apetite vigoroso. O dreno foi removido com sucesso no 5º dia. O paciente recebeu alta com amoxicilina-clavulanato oral por 4 semanas, mantendo remissão e função pulmonar normal no acompanhamento de 6 meses.",
    casoClinicoCaninoCorpoEstranhoVegetal: "Caso Clínico 2 (Medicina Canina) — Piotórax unilateral em cão por corpo estranho vegetal e resolução cirúrgica:\nCão da raça Border Collie de 4 anos, macho, utilizado para pastoreio em fazenda durante o período de estiagem. Apresentava histórico de tosse seca há 3 semanas, febre intermitente refratária a tratamentos orais empíricos e evolução para prostração intensa e relutância em movimentar-se. Ao exame físico de emergência: temperatura de 40,1 °C, taquipneia restritiva com 68 movimentos por minuto e hipofonese acentuada no hemitórax direito. O hemograma revelou leucocitose marcante (38.500 leucócitos/mcL) com desvio nuclear à esquerda (3.200 bastonetes/mcL) e toxicidade citoplasmática 3+.\nInvestigação e Conduta: A toracocentese diagnóstica no 7º espaço intercostal direito drenou 220 mL de exsudato purulento espesso contendo pequenos grânulos acastanhados (\"grânulos de enxofre\"). A citologia demonstrou neutrófilos degenerados e agregados de bactérias filamentosas ramificadas compatíveis com Actinomyces spp. Instalado dreno torácico calibroso 18 F e instituída terapia parenteral com ampicilina-sulbactam (30 mg/kg IV q6h) e enrofloxacina (10 mg/kg IV q24h).\nIndicação de Imagem Avançada e Cirurgia: Após 48 horas de drenagem e lavagens, o paciente mantinha drenagem persistente de pus (> 8 mL/kg/dia) e febre de 39,6 °C. Foi submetido a tomografia computadorizada contrastada de tórax (TC), que revelou abscesso focal no lobo pulmonar cranial direito com trajeto fistuloso transmural e imagem de corpo estranho linear hipoatenuante de 2,2 cm (espigueta de gramínea). O cão foi imediatamente encaminhado para toracotomia lateral direita exploratória, sendo realizada lobectomia pulmonar cranial parcial e desbridamento do leito pleural fibrinoso. A cultura confirmou Actinomyces viscosus e Bacteroides spp. O animal evoluiu com resolução completa da efusão, retirada do dreno no 4º dia pós-operatório e alta hospitalar sob amoxicilina-clavulanato por 8 semanas, retornando plenamente às atividades de pastoreio.",
    prognosticoEEvidenciaCientifica: "O prognóstico do piotórax canino e felino é tradicionalmente reservado nas primeiras 24 a 48 horas da admissão hospitalar, período no qual se concentram mais de 80% das mortes associadas à insuficiência respiratória restritiva e ao choque séptico sistêmico (Eiras-Diaz et al., 2021). No entanto, para os pacientes que sobrevivem a essa fase crítica inicial e recebem controle mecânico de foco eficaz por toracostomia, lavagem pleural e terapia antimicrobiana prolongada, o prognóstico a longo prazo é classificado como BOM a EXCELENTE:\n- Sobrevida Felina Global: Krämer et al. (2021) registraram sobrevida em 14 dias de 72% e taxa de recidiva de apenas 6% em gatos tratados clinicamente. Heier et al. (2022) relataram sobrevida de 94% em um ano para os pacientes felinos que receberam alta após tratamento com dreno 6 F.\n- Sobrevida Canina Global: Eiras-Diaz et al. (2021) reportaram sobrevida global de 72,4% no manejo médico exclusivo e 90,2% na coorte selecionada para intervenção cirúrgica com remoção de corpos estranhos.\n- Fatores de Mau Prognóstico no Plantão: Hipotermia profunda na admissão (< 37,2 °C em gatos), bradicardia associada a choque séptico, hiperlactatemia grave refratária, presença de pneumotórax sob tensão associado, necrose esofágica e incapacidade de drenar o espaço pleural por loculações herméticas sem conversão cirúrgica.",
  },
  complications: {
    principaisComplicacoesClinicasECirurgicas: "As complicações clínicas e cirúrgicas associadas ao piotórax e ao uso de drenos torácicos exigem vigilância intensiva contínua em ambiente de internação:\n1. Complicações Infecciosas e Sistêmicas: Choque séptico distributivo refratário, coagulação intravascular disseminada (CID), lesão renal aguda isquêmica (LRA), abscessos metastáticos no sistema nervoso central ou miocárdio e peritonite séptica por migração transdiafragmática de espiguetas vegetais.\n2. Complicações Mecânicas do Espaço Pleural:\n- Pneumotórax Iatrogênico: Ocasionado por desconexão acidental do sistema de drenagem, falha na vedação de torneiras de 3 vias ou remoção intempestiva do dreno pelo próprio paciente na ausência de colar elisabetano.\n- Obstrução do Lúmen do Dreno: Formação de trombos de fibrina e grumos purulentos espessos bloqueando os orifícios fenestrados, impedindo a drenagem e retendo líquido sob tensão.\n- Laceração Pulmonar e Hemotórax: Lesão da pleura visceral e parênquima pulmonar decorrente de toracocentese realizada às cegas sem guia ultrassonográfico ou avanço forçado de trocartes rígidos.\n- Enfisema Subcutâneo Extenso: Dissecção de ar do espaço pleural ou orifício de entrada do dreno para o tecido subcutâneo cervical e torácico.\n- Fibrotórax e Encarceramento Pulmonar: Proliferação de tecido conjuntivo fibroso inelástico (peel pleural) sobre o pulmão em casos crônicos arrastados, provocando restrição ventilatória permanente que exige decorticação cirúrgica aberta.\n3. Complicações Toxicológicas Iatrogênicas: Retinotoxicidade aguda irreversível com cegueira permanente em felinos tratados com doses excessivas de enrofloxacina (> 5 mg/kg/dia).",
  },
  prevention: {
    pilaresDePrevencaoEControleDomiciliar: "A prevenção do piotórax baseia-se no controle estrito dos fatores de risco ambientais e comportamentais de cada espécie:\n1. Espécie Felina:\n- Manejo Indoor Exclusivo: Manter gatos em ambiente doméstico estrito telado e enriquecido, eliminando completamente o acesso desacompanhado à rua e prevenindo brigas territoriais noturnas com gatos errantes.\n- Castração Precoce: A orquiectomia e ovarioisterectomia reduzem substancialmente comportamentos de demarcação territorial e agressividade intergatos.\n- Manejo da Dinâmica Social Multicat: Evitar superlotação de felinos, garantir recursos distribuídos em padrão N+1 (comedouros, bebedouros, caixas de areia e arranhadores) e promover integração lenta e gradual de novos animais com apoio de feromônios sintéticos (Feliway).\n- Inspeção Atenta de Feridas Cutâneas: Após qualquer altercação física entre animais, realizar tricotomia e limpeza antisséptica imediata de ferimentos puntiformes na pele, instituindo avaliação veterinária antes do selamento subcutâneo.\n2. Espécie Canina:\n- Prevenção de Exposição a Gramíneas Secas: Evitar passeios ou trabalhos com cães em campos de pastoreio com vegetação alta durante os períodos de estiagem e floração de espiguetas (primavera e verão).\n- Toalete e Inspeção Pós-Trabalho: Em cães de caça e pastoreio, inspecionar minuciosamente a pelagem, espaços interdigitais, condutos auditivos e região axilar/torácica ao retornar do campo, removendo sementes presas antes de sua penetração transmural.\n- Prevenção de Corpos Estranhos Esofágicos: Proibir rigorosamente o fornecimento de ossos cozidos, restos de carcaças ou brinquedos pontiagudos passíveis de fragmentação e perfuração da parede do esôfago torácico.\n3. Cuidados de Biossegurança e Conexão na UTI:\n- Fixação em sandália romana e bandagem estéril do dreno torácico trocada diariamente com inspeção do sítio de inserção.\n- Uso compulsório contínuo de colar elisabetano bem ajustado durante todo o período em que o dreno permanecer instalado.",
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    "linfoma-mediastinal-caes-gatos",
    "coagulacao-intravascular-disseminada-caes-gatos",
  ],
  relatedMedicationSlugs: [
    "ampicilina-sulbactam",
    "amoxicilina-clavulanato",
  ],
  figures: [
    figura1RadiografiaSim2021,
    figura2CitologiaSim2021,
    figura3DrenoHeier2022,
    figura4RadiografiaGraveJang2025,
    figura5TomografiaJang2025,
  ],
  references: [
    {
      citationText: "LAPPIN, M. R.; BLONDEAU, J.; BOOTHE, D.; BREITSCHWERDT, E. B.; GUARDABASSI, L.; LLOYD, D. H.; PAPICH, M. G.; RANKIN, S. C.; SYKES, J. E.; TURNIDGE, J.; WEESE, J. S. Antimicrobial use Guidelines for Treatment of Respiratory Tract Disease in Dogs and Cats: Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases (ISCAID). Journal of Veterinary Internal Medicine, v. 31, n. 2, p. 279-294, 2017. DOI: 10.1111/jvim.14627.",
      sourceType: "guideline",
      url: "https://doi.org/10.1111/jvim.14627",
      notes: "Guideline oficial de prática clínica da ISCAID vigente em 2026. Preconiza drenagem torácica como medida prioritária e esquema empírico inicial combinando fluoroquinolona parenteral com penicilinas ou clindamicina, com cultura aeróbia e anaeróbia mandatória e contraindicação formal a antibióticos intrapleurais.",
    },
    {
      citationText: "JOHNSON, L. R.; EPSTEIN, S. E.; REAGAN, K. L. Pyothorax in dogs and cats: 89 cases (2010–2019). Journal of Veterinary Internal Medicine, v. 37, n. 3, p. 963-971, 2023. DOI: 10.1111/jvim.16699.",
      sourceType: "primary",
      url: "https://doi.org/10.1111/jvim.16699",
      notes: "Estudo seminal que desmistificou o piotórax felino idiopático, comprovando dano penetrante em cerca de 76% dos gatos e cães. Demonstrou que gatos apresentam maior taxa de anaeróbios (73%), infecções polimicrobianas (mediana de 3 isolados) e 93% de bactérias intracelulares na citologia.",
    },
    {
      citationText: "HEIER, E.; WURTINGER, G.; HASSDENTEUFEL, E.; SCHNEIDER, M. Therapy of pyothorax in cats via small-bore thoracostomy tube in terms of efficacy, complications and outcomes. Animals, v. 12, n. 1, art. 107, 2022. DOI: 10.3390/ani12010107.",
      sourceType: "primary",
      url: "https://doi.org/10.3390/ani12010107",
      notes: "Coorte avaliando 45 gatos e 67 tubos de toracostomia de pequeno calibre (6 French wire-guided). Comprovou que drenos finos são seguros e altamente eficazes (complicações mecânicas de apenas 4% e sobrevida em 1 ano de 94%), além de demonstrar que heparina na lavagem não traz benefício.",
    },
    {
      citationText: "SIM, J. J.; LAU, S. F.; OMAR, S.; WATANABE, M.; ASLAM, M. W. A retrospective study on bacteriology, clinicopathologic and radiographic features in 28 cats diagnosed with pyothorax. Animals, v. 11, n. 8, art. 2286, 2021. DOI: 10.3390/ani11082286.",
      sourceType: "primary",
      url: "https://doi.org/10.3390/ani11082286",
      notes: "Caracterizou alterações hematológicas, radiográficas e citológicas em 28 gatos com piotórax. Forneceu imagens radiográficas abertas e citopatologia demonstrando neutrófilos degenerados e fagocitose bacteriana (CC BY 4.0).",
    },
    {
      citationText: "EIRAS-DIAZ, A.; FRYKENSTRAND, C.; CORBETTA, D.; LLEWELLYN, E.; CRONIN, A.; CRAWFORD, A. Retrospective evaluation of contrast-enhanced computed tomography findings in 101 dogs with pyothorax. Journal of Small Animal Practice, v. 62, n. 11, p. 977-985, 2021. DOI: 10.1111/jsap.13374.",
      sourceType: "primary",
      url: "https://doi.org/10.1111/jsap.13374",
      notes: "Maior coorte canina avaliada por TC contrastada torácica precoce (101 cães). Demonstrou que 86,6% das mortes ocorreram nas primeiras 48h e que a TC identificou corpos estranhos vegetais, abscessos e fístulas orientando cirurgia com 90,2% de sobrevida cirúrgica.",
    },
    {
      citationText: "KRÄMER, F.; RAINER, J.; BALI, M. S. Clinical findings and outcome in 55 cats with pyothorax. Journal of Small Animal Practice, v. 62, n. 7, p. 556-562, 2021. DOI: 10.1111/jsap.13327.",
      sourceType: "primary",
      url: "https://doi.org/10.1111/jsap.13327",
      notes: "Avaliou 55 gatos tratados clinicamente com drenos e antibióticos; sobrevida em 14 dias de 72% e taxa de recidiva a longo prazo de apenas 6% entre os sobreviventes acompanhados.",
    },
    {
      citationText: "STILLION, J. R.; LETENDRE, J. A. A clinical review of the pathophysiology, diagnosis, and treatment of pyothorax in dogs and cats. Journal of Veterinary Emergency and Critical Care, v. 25, n. 1, p. 113-129, 2015. DOI: 10.1111/vec.12274.",
      sourceType: "review",
      url: "https://doi.org/10.1111/vec.12274",
      notes: "Revisão narrativa abrangente de referência detalhando fisiopatologia do espaço pleural fechado, dinâmica de fluidos, indicação de drenagem torácica e antibióticos na emergência e terapia intensiva.",
    },
    {
      citationText: "ZHANG, L.; GROBMAN, M. Blood lactate and glucose concentrations as prognostic indicators in dogs and cats with pyothorax: a retrospective study. Frontiers in Veterinary Science, v. 12, art. 1581701, 2025. DOI: 10.3389/fvets.2025.1581701.",
      sourceType: "primary",
      url: "https://doi.org/10.3389/fvets.2025.1581701",
      notes: "Investigou valor prognóstico do lactato e glicose de admissão em 43 cães e 8 gatos com piotórax. Demonstrou capacidade prognóstica moderada do lactato em cães, ressaltando que não deve ser usado isoladamente para indicar eutanásia.",
    },
    {
      citationText: "JANG, H.; KIM, Y.; JUNG, J.; CHOI, M.; YOON, J. Successful management of recurrent pyothorax in a cat: clinical findings with medical and surgical approaches. Animals, v. 15, n. 9, art. 1253, 2025. DOI: 10.3390/ani15091253.",
      sourceType: "primary",
      url: "https://doi.org/10.3390/ani15091253",
      notes: "Relato de caso detalhado de piotórax felino recorrente com empiema mediastinal paraesofágico, tomografia contrastada, lavagens prolongadas e intervenção cirúrgica com decorticação (CC BY 4.0).",
    },
    {
      citationText: "NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6. ed. St. Louis: Elsevier, 2020. Cap. 23 (Clinical Manifestations and Diagnostic Tests of Pleural Cavity and Mediastinal Disease, p. 360-370) e Cap. 24 (Disorders of the Pleural Cavity and Mediastinum, p. 371-373).",
      sourceType: "classic",
      notes: "Tratado fundamental de medicina interna. Define piotórax como exsudato séptico de espaço pleural, destaca que cultura negativa não exclui a afecção e contraindica toracocentese repetida como substituto de tubo de toracostomia.",
    },
    {
      citationText: "ETTINGER, S. J.; FELDMAN, E. C.; CÔTÉ, E. Textbook of Veterinary Internal Medicine. 9. ed. Philadelphia: Saunders Elsevier, 2024.",
      sourceType: "classic",
      notes: "Referência abrangente para fisiopatologia da mecânica ventilatória do espaço pleural, equilíbrio de Starling, choque séptico e diretrizes de suporte intensivo.",
    },
    {
      citationText: "DROBATZ, K. J.; COSTELLO, M. F. Feline Emergency and Critical Care Medicine. 2. ed. Hoboken: Wiley-Blackwell, 2023. Cap. 10 (Respiratory Emergencies and Pleural Space Disease, p. 93-108).",
      sourceType: "classic",
      notes: "Manual de referência em emergência felina. Detalha técnica de lavagem pleural morna com 15 a 20 mL/kg, monitoramento de dreno em UTI e condutas cirúrgicas em felinos críticos.",
    },
    {
      citationText: "BSAVA. BSAVA Guide to Procedures in Small Animal Practice. 3. ed. Gloucester: British Small Animal Veterinary Association, 2024. Cap. Thoracocentesis / Thoracostomy tube placement, p. 259-273.",
      sourceType: "classic",
      notes: "Guia oficial de procedimentos da BSAVA. Descreve técnica de implantação de tubos pequenos wire-guided, lavagem pleural isotônica a 10-20 mL/kg com recuperação obrigatória ≥ 75% e manejo de complicações.",
    },
    {
      citationText: "PLUMB, D. C. Plumb’s Veterinary Drug Handbook. 10. ed. Ames: Wiley-Blackwell, 2023. Monografias: Ampicillin/Sulbactam (p. 68-70), Enrofloxacin (p. 398-403), Marbofloxacin (p. 675-678) e Amoxicillin/Clavulanate (p. 61-64).",
      sourceType: "classic",
      notes: "Compêndio farmacológico de referência com doses exatas em mg/kg, intervalos, vias e toxicidades críticas, incluindo alerta de retinotoxicidade da enrofloxacina em gatos (> 5 mg/kg).",
    },
  ],
};
