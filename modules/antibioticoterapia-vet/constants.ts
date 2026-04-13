import { ClassStyle, DiseaseExplanation, LifeStage, LifeStageKey, ComorbidityState } from './types';

// Explicações para modal "?"
export const DZ_EXPLAIN: { [key: string]: DiseaseExplanation } = {
  "Abscesso Cerebral / Empiema Intracraniano": {
    physio: "Infecção polimicrobiana (inclui **[color:purple-700]anaeróbios[/color]** orofaríngeos); pode surgir de otite, sinusite, mordeduras, ou foco hematogênico. Anaeróbios são comuns em infecções de SNC.",
    why: "Requer cobertura para cocos gram-positivos e anaeróbios. Esquemas empíricos incluem: **[bg:blue-100]Ceftriaxona + Metronidazol[/bg]** ou **[bg:blue-100]Ampicilina + Metronidazol + Fluoroquinolona[/bg]** (se suspeita de Gram-negativos).",
    signs: "Febre, dor cervical/cabeça, déficit focal/convulsões, sinais de hipertensão intracraniana. **[bg:yellow-100]RM/TC com anel captante[/bg]** é o padrão-ouro. Coletar hemocultura.",
    adjuncts: "Tratamento de **6 a 8 semanas**, ajustado por imagem/clínica. [alert:warning]A drenagem/neurocirurgia é crucial quando a coleção é grande ou loculada.[/alert]"
  },
  "Abscesso Cutâneo/Subcutâneo": {
    physio: "Inoculação por mordedura/arranhadura, resultando em infecção polimicrobiana com **[color:purple-700]anaeróbios[/color]** e **[color:rose-700]bastonetes gram-negativos[/color]**.",
    why: "[alert:danger]**Drenagem e desbridamento são os pilares do tratamento**.[/alert] O antibiótico sistêmico trata a celulite adjacente e deve ter cobertura para anaeróbios e gram-negativos.",
    signs: "Dor, flutuação, febre. A citologia/cultura do exsudato orienta a terapia.",
    adjuncts: "Lavagem da cavidade, colocação de dreno se necessário, e analgesia são essenciais."
  },
  "Abscesso Espinhal / Empiema Epidural": {
    physio: "Infecção semelhante à craniana (polimicrobiana, anaeróbios); pode originar-se de discospondilite ou infecções cutâneas.",
    why: "[alert:danger]**A descompressão cirúrgica urgente é indicada se houver déficit neurológico.**[/alert] A terapia empírica é semelhante à do SNC até a cultura.",
    signs: "Dor espinhal aguda com déficit neurológico progressivo. **[bg:yellow-100]RM é o padrão-ouro[/bg]**; hemocultura e cultura cirúrgica são úteis.",
    adjuncts: "Duração do tratamento de **6 a 8 semanas**. O atraso na descompressão piora o prognóstico."
  },
  "Abscesso Hepático": {
    physio: "Bacteremia ou infecção ascendente do trato biliar leva a focos supurativos no fígado.",
    why: "Antibióticos sistêmicos e **drenagem/ablação** da coleção quando indicado são necessários.",
    signs: "Febre, dor abdominal, elevação de ALT/ALP. Ultrassom ou TC revela a cavidade; a cultura é obtida por aspiração.",
    adjuncts: "Terapia de suporte e antibióticos guiados por cultura. Tratar o foco biliar/entérico associado."
  },
  "Abscesso Prostático": {
    physio: "Evolução de prostatite bacteriana crônica quando o antibiótico não penetra ou erradica o foco. **[color:rose-700]E. coli[/color]** é comum. Antibióticos ácidos (penicilinas, cefalosporinas de 1ª geração) aliviam os sinais, mas **não curam** e favorecem a formação de abscessos.",
    why: "Requer **drenagem** mais antibiótico com boa penetração prostática ([bg:blue-100]trimetoprim-sulfa, fluoroquinolonas[/bg]), guiado por cultura. O tratamento deve ser prolongado.",
    signs: "Dor pélvica, febre, disúria, descarga uretral. O ultrassom mostra cavidades hipoecoicas; pode haver sepse.",
    adjuncts: "[alert:warning]Estabilização, drenagem (ex: omentalização) mais antibiótico por **4-6+ semanas**. Castração é recomendada.[/alert] Reavaliar com cultura (D+7 e D+28)."
  },
  "Abscesso Pulmonar": {
    physio: "Coleção focal de pus no parênquima pulmonar. Pode romper e causar piotórax ou persistir como um foco séptico. Avaliar a presença de corpo estranho/migração.",
    why: "Infecção de 'tecido profundo' com risco de recidiva. Requer antibióticos de longa duração e, se associado a piotórax, drenagem e eventual abordagem cirúrgica.",
    signs: "Tosse, febre, taquipneia. **[bg:yellow-100]Radiografia/TC mostra lesão cavitária/nodular[/bg]**. Coletar cultura por lavado traqueal/broncoalveolar (antes do ATB).",
    adjuncts: "Oxigenoterapia se houver hipoxemia; nebulização e coupage para higiene brônquica. Considerar toracotomia/toracoscopia se houver falha no tratamento."
  },
  "Abscesso Renal": {
    physio: "Pode complicar a pielonefrite, causando dor lombar, febre e sinais de LRA.",
    why: "Terapia empírica com **[bg:blue-100]fluoroquinolona[/bg]** (boa penetração renal) enquanto se aguarda a cultura. Ajustar e tratar por 14 dias, reavaliando (tendência a cursos mais curtos com boa resposta).",
    signs: "Ultrassom mostra dilatação pélvica, detritos, papila romba. [alert:info]Considerar **nefropielocentese** para cultura se a cultura da bexiga for negativa.[/alert]",
    adjuncts: "Se a coleção estiver organizada, considerar drenagem percutânea guiada por imagem para resolver o foco séptico."
  },
  "Abscesso Retrobulbar / Celulite Orbital": {
    physio: "Infecção no espaço retrobulbar por extensão de infecção dentária, corpo estranho ou ferida penetrante, levando a inflamação/coleção purulenta que comprime o globo ocular.",
    why: "Requer **descompressão/drenagem** quando há coleção, mais antibiótico sistêmico de amplo espectro guiado por cultura, pois infecções orbitárias têm risco de progressão e causam dor intensa.",
    signs: "**[color:red-700]Dor à abertura da boca[/color]**, exoftalmia, protrusão da terceira pálpebra. Exame oftálmico completo (STT, fluoresceína) é mandatório; TC/RM pode ser necessário.",
    adjuncts: "Analgesia adequada, antibiótico IV inicial, e drenagem quando acessível. Suporte com colírios lubrificantes até a resolução."
  },
  "Actinomicose Sistémica": {
    physio: "Infecção pela flora orofaríngea (Actinomyces spp.), frequentemente associada a abscessos, mordeduras ou corpos estranhos migrantes. Frequentemente ocorre com **[color:purple-700]anaeróbios[/color]**.",
    why: "Tratamento com **Penicilina/Ampicilina + Clindamicina** (para cobrir anaeróbios) e drenagem. Ajustar com base na cultura.",
    signs: "Exsudato com '**[bg:yellow-100]grânulos de enxofre[/bg]**'. Solicitar cultura para anaeróbios, pois crescem mal em rotinas.",
    adjuncts: "Duração de 4-8 semanas (prolongar se houver envolvimento ósseo/torácico). [alert:info]Sempre explorar o foco (drenagem/lavagem).[/alert]"
  },
  "Artrite Séptica (canina)": {
    physio: "Introdução de bactérias na articulação por inoculação direta ou via hematogênica, levando a sinovite purulenta e destruição da cartilagem.",
    why: "**[bg:blue-100]Lavagem articular[/bg]** (artroscopia/artrotomia) mais antibiótico direcionado por Gram/cultura. Iniciar empiricamente enquanto aguarda os resultados.",
    signs: "Claudicação aguda, dor articular, efusão. **[bg:yellow-100]Artrocentese com citologia (neutrófilos degenerados e bactérias)[/bg]** confirma o diagnóstico.",
    adjuncts: "Controle da dor, imobilização relativa, e curso de antibióticos por **4-6 semanas** com reavaliações."
  },
  "Babesiose (Babesia gibsoni)": {
    physio: "Infecção por protozoário que causa anemia hemolítica e trombocitopenia. A transfusão sanguínea é um fator de risco.",
    why: "A combinação de **[bg:green-100]atovaquona e azitromicina[/bg]** aumenta a taxa de negativação molecular. Imidocarb tem menor taxa de cura.",
    signs: "Anemia hemolítica, trombocitopenia.",
    adjuncts: "Terapia de suporte conforme necessário."
  },
  "Balanopostite Grave": {
    physio: "Supercrescimento da flora prepucial (às vezes Pseudomonas), causando inflamação crônica com hiperplasia folicular.",
    why: "O tratamento é conservador. Antibióticos sistêmicos são usados apenas em casos refratários ou complicados.",
    signs: "Corrimento purulento e lambedura excessiva. É necessário examinar até o fórnice para excluir corpo estranho ou neoplasia.",
    adjuncts: "Higiene local com clorexidina diluída, antibacteriano tópico ± corticoide por um curto período. Investigar prostatite/uretrite se a descarga persistir."
  },
  "Bartonelose": {
    physio: "Doença transmitida por pulgas/carrapatos com um espectro clínico amplo e conhecimento ainda limitado. Pode haver imunossupressão crônica e coinfecções.",
    why: "A resposta terapêutica pode ajudar no diagnóstico. Considerar coinfecções se o paciente não responder ao tratamento.",
    signs: "Serologia tem alto VPN, mas baixo VPP. PCR/cultura são variáveis; amostrar sangue/tecidos quando indicado.",
    adjuncts: "Controle rígido de ectoparasitas e tratamento de coinfecções. É uma **[color:red-700]zoonose[/color]** (doença da arranhadura do gato)."
  },
  "Borreliose (Doença de Lyme)": {
    physio: "Infecção por Borrelia burgdorferi transmitida por carrapatos do gênero Ixodes, causando uma doença inflamatória multissistêmica.",
    why: "**[bg:green-100]Doxiciclina[/bg]** é a primeira linha para doenças transmitidas por carrapatos.",
    signs: "Sorologia (C6/ELISA) é o método mais sensível para detecção de exposição. Soroconversão entre as fases aguda e convalescente melhora a acurácia.",
    adjuncts: "Prevenção com controle de carrapatos. Anti-inflamatórios quando necessário."
  },
  "Botulismo (Infecções Secundárias)": {
    physio: "Ingestão de toxina pré-formada que causa bloqueio de acetilcolina e **[color:red-700]paralisia flácida ascendente[/color]**.",
    why: "O tratamento é de suporte. A antitoxina precoce pode ajudar. Antibióticos são indicados se houver ferida contaminada.",
    signs: "Paralisia flácida ascendente. Diagnóstico clínico e por bioensaio para a toxina. Descartar outras neuropatias.",
    adjuncts: "Cuidados intensivos de suporte."
  },
  "Bronquite Bacteriana Crônica": {
    physio: "Inflamação crônica das vias aéreas que leva a hiperprodução de muco e tosse. Bactérias podem atuar como oportunistas.",
    why: "O objetivo é aliviar a tosse e reduzir a carga bacteriana quando documentada por cultura e citologia do lavado traqueal.",
    signs: "Tosse crônica 'seca/estridente', com ou sem bronquiectasias na imagem. O **[bg:yellow-100]lavado traqueal para citologia/cultura[/bg]** direciona a terapia.",
    adjuncts: "Nebulização e coupage. Broncodilatadores em caso de hiper-reatividade. Antibióticos apenas com evidência de infecção (cultura positiva)."
  },
  "Demodicose com Sobreinfecção Bacteriana (Foliculite/Furunculose)": {
    physio: "Proliferação excessiva do ácaro Demodex spp. (normalmente presente em pequenas quantidades) causa ruptura folicular e permite colonização bacteriana secundária. A imunossupressão (juvenil, endócrina, iatrogênica) é o fator predisponente principal.",
    why: "O tratamento acaricida (isoxazolinas) é essencial para resolver a causa primária. Antibióticos tratam a sobreinfecção bacteriana, mas não curam a demodicose. A escolha deve cobrir Staphylococcus spp. e, em casos profundos, Gram-negativos.",
    signs: "Alopecia multifocal, pápulas/pústulas, comedões, fístulas com exsudato purulento, odor fétido. **[bg:yellow-100]Raspados profundos positivos para Demodex[/bg]** confirmam o diagnóstico. Citologia mostra neutrófilos e bactérias.",
    adjuncts: "Tratamento acaricida até 2 raspados negativos mensais. Banhos de clorexidina 2-4%. Investigar e tratar comorbidades (hipotireoidismo, hiperadrenocorticismo). Evitar quinolonas empíricas sem evidência de bastonetes."
  },
  "Furunculose Pós-Banho (Post-grooming Furunculosis)": {
    physio: "Infecção cutânea profunda aguda causada por Pseudomonas aeruginosa contaminando produtos de grooming ou água. O trauma da tosa facilita a penetração bacteriana, resultando em foliculite/furunculose rapidamente progressiva.",
    why: "Pseudomonas aeruginosa é resistente a beta-lactâmicos simples. Quinolonas (marbofloxacina, enrofloxacina) são a primeira escolha. Piperacilina/tazobactam para casos graves hospitalizados.",
    signs: "Início súbito 24-48h pós-banho, dor intensa dorsal, pústulas/pápulas, tractos drenantes, febre, letargia. **[bg:yellow-100]Citologia mostra bastonetes Gram-negativos[/bg]**. Cultura e MIC são essenciais.",
    adjuncts: "Coletar cultura ANTES de iniciar antibiótico. Banhos antissépticos suaves, analgesia/opioides conforme dor. Evitar cefalexina/amoxi-clav como monoterapia empírica (ineficazes vs Pseudomonas)."
  },
  "Foliculite por Pseudomonas Pós-Natação ('Hot-tub')": {
    physio: "Exposição a água contaminada por Pseudomonas aeruginosa (piscinas, banheiras, lagos) causa foliculite superficial a profunda. O microambiente úmido e o trauma da natação facilitam a colonização bacteriana.",
    why: "Pseudomonas aeruginosa é resistente a beta-lactâmicos simples. Marbofloxacina é a primeira escolha. Ajustar por MIC quando possível.",
    signs: "Pápulas pustulosas dorsais, prurido/dor variável, possível febre em casos extensos. **[bg:yellow-100]Citologia mostra bastonetes Gram-negativos[/bg]**. Cultura/MIC confirma a sensibilidade.",
    adjuncts: "Suspender natação até cura completa. Antissépticos tópicos. Evitar beta-lactâmicos simples empíricos."
  },
  "Celulite Pré‑septal (Palpebral) Bacteriana": {
    physio: "Infecção tecidual anterior ao septo orbital (pálpebras), distinta da celulite orbital. Causada por trauma, mordeduras, ou extensão de infecções locais. A barreira do septo orbital previne extensão para o espaço retrobulbar.",
    why: "Amoxicilina/clavulanato oferece boa cobertura para Staphylococcus spp. e Streptococcus spp. Cefalexina é alternativa eficaz. A cobertura para anaeróbios raramente é necessária.",
    signs: "Edema/dor palpebral, eritema, sem proptose ou dor ocular intensa. **[bg:yellow-100]Citologia/aspirado[/bg]** confirma infecção bacteriana. Descartar abscesso orbital.",
    adjuncts: "Compressas mornas, antibióticos tópicos se blefarite associada. Monitorar sinais de extensão orbital (proptose, oftalmoplegia, dor ocular intensa)."
  },
  "Infecção de Cateter Venoso Periférico (phlebitis séptica)": {
    physio: "Colonização bacteriana do sítio e/ou lúmen de cateter periférico com inflamação local e bacteremia ocasional. Staphylococcus spp. são os patógenos mais comuns, seguidos por enterobactérias. A técnica asséptica inadequada e tempo prolongado de cateterização são fatores de risco.",
    why: "Remoção imediata do cateter é essencial. Antibióticos sistêmicos são indicados apenas se houver celulite extensa ou sinais sistêmicos. Amoxicilina/clavulanato oferece boa cobertura empírica.",
    signs: "Eritema, edema, dor no sítio do cateter, febre, leucocitose. **[bg:yellow-100]Cultura da ponta do cateter[/bg]** e hemoculturas se febre/bacteremia. Avaliar extensão por ultrassom.",
    adjuncts: "Remover cateter imediatamente, inserir novo em local distinto sob técnica asséptica rigorosa. Compressas mornas, curativos estéreis. Monitorar sinais de tromboflebite ou extensão."
  },
  "Infecção de Cateter Venoso Central (CVC)": {
    physio: "Infecção do lúmen/sítio de CVC com risco de bacteremia e fungemia. Staphylococcus spp. (coagulase-positivos e negativos) são os patógenos mais comuns. Enterobactérias e Pseudomonas podem ocorrer em infecções hospitalares. A colonização do hub do cateter é a via mais comum.",
    why: "Ampicilina/sulbactam oferece cobertura para Staphylococcus spp. e enterobactérias. Marbofloxacina adiciona cobertura para Pseudomonas. A escolha deve ser guiada por cultura e sensibilidade.",
    signs: "Febre, calafrios, sinais de sepse. **[bg:yellow-100]Hemoculturas[/bg]** e cultura da ponta após retirada. Ultrassom para avaliar trombose associada.",
    adjuncts: "Remoção do CVC, novo acesso em local distinto. Terapia prolongada (10-14d para bacteremia, 4-6 semanas se endocardite). Monitorar função renal com aminoglicosídeos."
  },
  "Bacteremia Relacionada a Cateter (CRBSI)": {
    physio: "Hemocultura positiva associada a infecção de cateter. Staphylococcus spp. são os patógenos mais comuns. O risco de endocardite é significativo, especialmente com Staphylococcus aureus. A colonização do cateter pode persistir mesmo após remoção.",
    why: "Terapia empírica de amplo espectro até identificação do patógeno. Ampicilina/sulbactam + marbofloxacina oferece boa cobertura inicial. Desescalar baseado em cultura e sensibilidade.",
    signs: "Febre, calafrios, sinais de sepse. **[bg:yellow-100]≥2 hemoculturas[/bg]** positivas. Ecocardiograma se sopro ou septicemia persistente.",
    adjuncts: "Remover fonte (cateter) imediatamente. Suporte hemodinâmico se necessário. Monitorar sinais de endocardite ou metástases sépticas."
  },
  "SSI após Enterotomia/Gastrotomia": {
    physio: "Infecção de incisão abdominal após enterotomia/gastrotomia devido à contaminação fecal/estomacal. Enterobactérias, anaeróbios e Enterococcus spp. são os patógenos mais comuns. A técnica cirúrgica inadequada e tempo prolongado de cirurgia são fatores de risco.",
    why: "Ampicilina/sulbactam oferece cobertura para enterobactérias e anaeróbios. Metronidazol adiciona cobertura anaeróbia robusta. Step-down para amoxicilina/clavulanato quando clinicamente estável.",
    signs: "Eritema, edema, dor na incisão, febre, leucocitose. **[bg:yellow-100]Cultura de secreção[/bg]** e ultrassom para avaliar coleções. Avaliar deiscência.",
    adjuncts: "Drenagem/desbridamento se coleção. Suporte nutricional. Monitorar sinais de peritonite ou sepse."
  },
  "Piometra de Coto Uterino (Stump Pyometra)": {
    physio: "Infecção purulenta do coto uterino após ovariohisterectomia por exposição residual a progesterona ou tecido remanescente. E. coli é o patógeno mais comum. O tecido endometrial remanescente pode responder a progesterona endógena ou exógena.",
    why: "Ampicilina/sulbactam oferece boa cobertura para E. coli e outras enterobactérias. Step-down para amoxicilina/clavulanato quando clinicamente estável. A remoção cirúrgica do coto é curativa.",
    signs: "Corrimento vaginal, letargia, polidipsia/poliúria, dor abdominal. **[bg:yellow-100]Ultrassom mostra coto distendido[/bg]**, hemograma com leucocitose. Cultura uterina intraoperatória.",
    adjuncts: "Reoperação para remoção do coto e ovários remanescentes. Suporte hemodinâmico. Investigar fonte de progesterona (ovários ectópicos, terapia hormonal)."
  },
  "Abscesso Retrofaringeo": {
    physio: "Coleção purulenta nos espaços retrofaríngeos, geralmente causada por corpo estranho oral, trauma por 'graveto' ou extensão de infecção dentária. A flora orofaríngea mista (aeróbios e anaeróbios) é inoculada, resultando em abscesso que pode comprometer a via aérea.",
    why: "Ampicilina/sulbactam oferece cobertura para flora orofaríngea mista e anaeróbios. Metronidazol adiciona cobertura anaeróbia se houver odor fétido ou necrose. Step-down para amoxicilina/clavulanato quando clinicamente estável.",
    signs: "Dor cervical, sialorreia, disfagia, febre, estridor em casos graves. **[bg:yellow-100]Ultrassom/TC cervical[/bg]** mostra coleção. Aspiração para citologia e cultura aeróbios/anaeróbios.",
    adjuncts: "Drenagem cirúrgica/escareação é essencial. Analgesia, suporte de via aérea se necessário. Monitorar sinais de extensão para mediastino."
  },
  "Traqueíte Pós‑Intubação com Sobreinfecção Bacteriana": {
    physio: "Inflamação da traqueia após intubação endotraqueal com colonização bacteriana secundária. O trauma da intubação e a presença do tubo endotraqueal comprometem a defesa mucociliar, permitindo colonização por Staphylococcus spp., enterobactérias e Pseudomonas em ambiente hospitalar.",
    why: "Amoxicilina/clavulanato oferece boa cobertura para Staphylococcus spp. e enterobactérias. Marbofloxacina é indicada se houver suspeita de Gram-negativos nosocomiais. A escolha deve ser guiada por cultura.",
    signs: "Tosse áspera pós-operatória, secreção traqueal purulenta, febre em casos graves. **[bg:yellow-100]Endoscopia/LBA[/bg]** para citologia e cultura. Radiografia torácica se pneumonia.",
    adjuncts: "Nebulização e fisioterapia respiratória. Controle da dor/antitussígenos quando indicado. Monitorar sinais de pneumonia ou sepse."
  },
  "Pneumonia Bacteriana Nosocomial": {
    physio: "Infecção pulmonar adquirida no hospital (pós-cirúrgica, ventilação mecânica). Pseudomonas aeruginosa, enterobactérias (E. coli, Klebsiella) e Staphylococcus aureus/MRSP são os patógenos mais comuns. A intubação endotraqueal e ventilação mecânica comprometem as defesas pulmonares.",
    why: "Piperacilina/tazobactam oferece cobertura para Pseudomonas aeruginosa e enterobactérias. Amicacina adiciona cobertura para Gram-negativos resistentes. A escolha deve ser guiada por cultura e MIC.",
    signs: "Febre, taquipneia, tosse, hipoxemia. **[bg:yellow-100]Radiografia/TC[/bg]** mostra infiltrados. LBA protegido para cultura/MIC (padrão ouro).",
    adjuncts: "Ventilação protetora, fisioterapia, manejo de secreções. Monitorar função renal com aminoglicosídeos. Desescalar baseado em cultura e sensibilidade."
  },
  "Pneumonia por Pseudomonas em Paciente Ventilado": {
    physio: "Infecção por Pseudomonas aeruginosa em paciente sob ventilação mecânica. Alto risco de resistência devido à exposição prévia a antibióticos e ambiente hospitalar. Pseudomonas aeruginosa pode formar biofilmes no tubo endotraqueal.",
    why: "Piperacilina/tazobactam + amicacina oferece cobertura para Pseudomonas aeruginosa. Desescalar baseado em MIC. Marbofloxacina pode ser considerada se sensível e via oral viável.",
    signs: "Febre, taquipneia, hipoxemia, secreção traqueal purulenta. **[bg:yellow-100]LBA protegido[/bg]** com cultura/MIC confirma o diagnóstico.",
    adjuncts: "Aspiração traqueal/broncoscopia terapêutica. Suporte ventilatório. Monitorar sinais de sepse ou falha terapêutica."
  },
  "Pneumonia por Corpo Estranho Aspirado": {
    physio: "Broncopneumonia secundária à aspiração de corpo estranho vegetal/partículas. A presença do corpo estranho compromete a defesa pulmonar e permite colonização bacteriana. Flora mista (aeróbios e anaeróbios) é comum.",
    why: "Ampicilina/sulbactam oferece cobertura para flora mista e anaeróbios. Metronidazol adiciona cobertura anaeróbia. Step-down para amoxicilina/clavulanato quando clinicamente estável.",
    signs: "Tosse, febre, taquipneia. **[bg:yellow-100]Radiografia/TC[/bg]** pode mostrar o corpo estranho. Broncoscopia para remoção e LBA/cultura.",
    adjuncts: "Remoção do corpo estranho é essencial. Fisioterapia respiratória. Monitorar sinais de abscesso pulmonar ou empiema."
  },
  "ITU Complicada Associada a Diabetes Mellitus": {
    physio: "Infecção urinária com hiperglicemia e glicosúria favorecendo crescimento bacteriano. A glicosúria fornece substrato para bactérias, enquanto a imunossupressão do diabetes compromete as defesas. E. coli, Klebsiella spp. e Staphylococcus spp. são os patógenos mais comuns.",
    why: "Amoxicilina/clavulanato oferece boa cobertura para enterobactérias e Staphylococcus spp. A escolha deve ser guiada por cultura e sensibilidade. O controle glicêmico é essencial.",
    signs: "Poliúria, polidipsia, disúria, febre. **[bg:yellow-100]Urocultura por cistocentese[/bg]** confirma infecção. Controle glicêmico concomitante.",
    adjuncts: "Controle do diabetes mellitus é essencial. Hidratação adequada. Monitorar função renal. Investigar complicações do diabetes."
  },
  "Sepse Bacteriana Neonatal (Cães e Gatos)": {
    physio: "Bacteremia/septicemia em neonatos por falha de transferência de imunidade, contaminação umbilical ou mamária. O sistema imunológico imaturo e a falha na transferência passiva de anticorpos via colostro predispõem à infecção. E. coli, Streptococcus spp. e Staphylococcus spp. são os patógenos mais comuns.",
    why: "Ampicilina + amicacina oferece cobertura para enterobactérias e cocos Gram-positivos. A dose deve ser ajustada para a função renal imatura. Cautela com aminoglicosídeos.",
    signs: "Hipotermia, hipoglicemia, letargia, recusa alimentar, febre ou hipotermia. **[bg:yellow-100]Hemocultura[/bg]** confirma bacteremia. Avaliar foco (onfalite, pneumonia).",
    adjuncts: "Suporte térmico e glicêmico essenciais. Fluidoterapia cuidadosa. Nutrição enteral/parenteral. Tratar falha de transferência passiva."
  },
  "Bronquite Parasitária (Sobreinfecção Bacteriana)": {
    physio: "Parasitas (ex: Angiostrongylus vasorum) lesam a mucosa respiratória e comprometem a defesa mucociliar, permitindo infecção bacteriana secundária.",
    why: "É necessário tratar o parasita e a pneumonia bacteriana associada, quando presente.",
    signs: "Tosse/dispneia. Radiografia com padrão bronco-intersticial/alveolar. Exame de fezes/testes específicos e lavado traqueal para cultura.",
    adjuncts: "Antiparasitário específico, antibiótico empírico de amplo espectro até a cultura, oxigenoterapia se houver hipoxemia, nebulização/coupage."
  },
  "Brucelose (Brucella canis)": {
    physio: "Zoonose que causa problemas reprodutivos: aborto/morte embrionária em fêmeas; epididimite/orquite e infertilidade em machos.",
    why: "A erradicação é difícil. A decisão de manejo inclui afastar o animal da reprodução e tomar medidas sanitárias.",
    signs: "Nenhum teste único tem 100% de sensibilidade. Triagem com RSAT/TAT e confirmação com AGID (AgPC), cultura ou PCR. **[color:red-700]Alto risco de falso-positivo na sorologia.[/color]**",
    adjuncts: "[alert:danger]Não iniciar antibióticos antes de coletar amostras (pode negativar cultura/serologia).[/alert] A castração reduz a eliminação, mas não cura."
  },
  "Campylobacteriose": {
    physio: "Infecção intestinal que causa diarreia.",
    why: "Casos leves são autolimitantes. Em casos moderados/graves, usar macrolídeos (azitromicina) ou fluoroquinolonas quando necessário.",
    signs: "Diarreia. PCR é mais sensível/específico que a cultura. Interpretar com o quadro clínico, pois existem portadores assintomáticos.",
    adjuncts: "Terapia de suporte com fluidos e probióticos."
  },
  "Celulite": {
    physio: "Disseminação de infecção no tecido subcutâneo por cocos gram-positivos e flora mista.",
    why: "Antibiótico sistêmico direcionado e controle do foco. Cultura indicada em caso de falha terapêutica.",
    signs: "Eritema, calor, dor, febre. Citologia e cultura orientam o tratamento.",
    adjuncts: "Elevação e repouso da área afetada. Reavaliação em 48-72 horas."
  },
  "Ceratite Ulcerativa Infecciosa": {
    physio: "Defeito epitelial da córnea com colonização bacteriana. Risco de '**[color:red-700]melting[/color]**' (ceratomalácia) devido a colagenases.",
    why: "Antibióticos tópicos frequentes (a cada 2-6 horas), controle da dor e, em úlceras profundas/descemetoceles, intervenção cirúrgica.",
    signs: "Blefaroespasmo, epífora, fotofobia. A **[bg:yellow-100]fluoresceína confirma o defeito[/bg]**. Cultura/citologia podem orientar a escolha do antibiótico tópico.",
    adjuncts: "Colar elizabetano, lágrimas artificiais, analgésicos e reavaliações seriadas."
  },
  "Cistite Bacteriana Esporádica (ITU)": {
    physio: "Infecção ascendente da uretra/vesícula pela microbiota perineal/intestinal. O diagnóstico requer evidência de bacteriúria e piúria em uma amostra de urina adequadamente coletada, geralmente por **[color:rose-700]E. coli[/color]**.",
    why: "[alert:success]As diretrizes da ISCAID recomendam **cursos de tratamento curtos (3 a 5 dias)**.[/alert] Isto é eficaz, reduz custos, efeitos adversos e a pressão de seleção para resistência.\n\n##💡 Pontos-Chave##\n[map]\nAbordagem da ITU Esporádica\n  **💊 Tratamento**\n    **1ª Linha:** [bg:green-100]Amoxicilina (11-15 mg/kg q8h)[/bg] ou [bg:green-100]TMS (15 mg/kg q12h)[/bg].\n    **Alternativa:** Amoxicilina-clavulanato se houver suspeita de resistência. Evitar ampicilina oral (baixa biodisponibilidade).\n    **Evitar:** Fluoroquinolonas devem ser reservadas para infecções mais graves (pielonefrite, prostatite).\n  **🕒 Duração**\n    **3 a 5 dias:** Suficiente para resolução. Cursos longos não oferecem benefícios e aumentam a resistência.\n  **✅ Acompanhamento**\n    **Urocultura pós-tratamento:** Não é necessária se os sinais clínicos resolverem.\n[/map]",
    signs: "Disúria, polaciúria, hematúria. O diagnóstico é baseado em urinálise (piúria, bacteriúria). A ausência de bactérias no sedimento não exclui ITU, pois a sensibilidade da microscopia é baixa. O teste de esterase leucocitária tem baixa sensibilidade em cães e baixa especificidade em gatos, sendo pouco fiável.",
    adjuncts: "Analgésicos podem proporcionar alívio. Aumentar a ingestão de água ajuda a 'lavar' a bexiga. Educar o tutor sobre a importância de uma coleta de urina limpa e o reconhecimento de sinais de recorrência é fundamental."
  },
  "Cistite Enfisematosa": {
    physio: "Produção de gás intramural e/ou intraluminal por bactérias fermentadoras de glicose (principalmente **[color:rose-700]E. coli[/color]** e **[color:purple-700]Clostridium spp.[/color]**). Está fortemente associada a comorbidades como **diabetes mellitus**, mas pode ocorrer em animais não diabéticos.",
    why: "O tratamento requer a erradicação da infecção bacteriana e, crucialmente, o controlo da doença subjacente que predispõe à infecção (especialmente o controlo glicémico em diabéticos).",
    signs: "Sinais de ITU inferior (disúria, hematúria). O diagnóstico é por imagem: **[bg:yellow-100]radiografias mostram lucências curvilíneas na parede da bexiga[/bg]**, e o ultrassom revela artefactos de reverberação ('dirty shadowing') associados ao gás. A urocultura confirma o agente.",
    adjuncts: "[alert:warning]O controlo rigoroso da glicemia é essencial para a resolução em pacientes diabéticos.[/alert] Fluidoterapia e monitorização para complicações raras, como a perfuração da bexiga, são importantes. A terapia antibiótica é guiada pela cultura e sensibilidade."
  },
  "Citozoonose (Cytauxzoon felis)": {
    physio: "Protozoário que causa doença em gatos, com febre alta, icterícia e dispneia. Alta letalidade sem terapia.",
    why: "A combinação de **[bg:green-100]atovaquona e azitromicina[/bg]** melhora a sobrevida em comparação com o imidocarb.",
    signs: "Febre alta, icterícia, dispneia.",
    adjuncts: "[alert:danger]Terapia de suporte agressiva é essencial para a sobrevivência.[/alert]"
  },
  "Colangite Linfocítica Felina (Sobreinfecção)": {
    physio: "Doença imunomediada crônica que pode ter sobreinfecção bacteriana secundária.",
    why: "Tratamento com imunomoduladores (ex: prednisolona) e antibióticos apenas se a cultura for positiva.",
    signs: "Icterícia crônica, enzimas colestáticas elevadas. A biópsia define o padrão linfocítico.",
    adjuncts: "Suporte nutricional, ácido ursodesoxicólico. Monitorar e ajustar conforme a resposta."
  },
  "Colangite Neutrofílica (Felina)": {
    physio: "Infecção ascendente do trato biliar por bactérias (enterógena), causando inflamação neutrofílica.",
    why: "Antibiótico guiado por **[bg:yellow-100]cultura de bile/vesícula[/bg]**, mais suporte biliar com ácido ursodesoxicólico.",
    signs: "Icterícia, dor, febre. Ultrassom biliar e citologia/biópsia confirmam o padrão neutrofílico.",
    adjuncts: "Antibióticos por **4-6+ semanas**. Tratar pancreatite/IBD associadas (tríade felina)."
  },
  "Colecistite / Colangite Bacteriana (Canina)": {
    physio: "Infecção ascendente da vesícula biliar e ductos biliares, com risco de desenvolvimento de mucocele ou peritonite biliar.",
    why: "Antibiótico sistêmico guiado por cultura (bile/parede) e **colecistectomia** se houver mucocele ou ruptura.",
    signs: "Dor abdominal cranial direita, febre, aumento de ALP/GGT. O ultrassom biliar é a principal ferramenta de diagnóstico.",
    adjuncts: "Suporte, analgesia, e cirurgia quando indicado."
  },
  "Colite por Clostridium perfringens": {
    physio: "Supercrescimento de Clostridium perfringens e produção de enterotoxina causam diarreia de cólon.",
    why: "Tratamento com dieta e fibra. Antibióticos (amoxicilina/tilosina) por um curto período em casos documentados.",
    signs: "Diarreia mucoide com hematoquezia. Testes para a toxina podem confirmar.",
    adjuncts: "Probióticos e fibra. Tratar gatilhos."
  },
  "Colite Ulcerativa Histiocítica (Associada a E. coli)": {
    physio: "Invasão de Escherichia coli aderente no cólon de Boxers e outras raças, causando lesões ulcerativas com macrófagos.",
    why: "Tratamento com **[bg:blue-100]fluoroquinolonas[/bg]** (ex: enrofloxacina) com base na sensibilidade, pois a E. coli intramucosa responde a este tratamento.",
    signs: "Diarreia crônica com perda de peso. **Biópsia com FISH** ou cultura da mucosa confirma o diagnóstico.",
    adjuncts: "Dieta hipoalergênica de suporte. Re-biopsiar se houver recidiva."
  },
  "Complexo Respiratório Infeccioso Canino (CRIC; \"Tosse dos Canis\")": {
    physio: "Síndrome multietiológica (vírus + **Bordetella bronchiseptica** + Mycoplasma). B. bronchiseptica paralisa os cílios e aumenta a produção de muco.",
    why: "[alert:info]A maioria dos casos não complicados é autolimitante e **não requer antibióticos**.[/alert] Antibióticos são indicados apenas quando há suspeita de infecção por Bordetella ou o curso da doença é arrastado.",
    signs: "Tosse seca que piora com a palpação traqueal ('sinal do gatilho'). História de exposição recente (2-7 dias).",
    adjuncts: "Doxiciclina ou fluoroquinolona em adultos. Antitussígenos selecionados. [alert:warning]Evitar o uso rotineiro de corticoides.[/alert] A vacinação é a melhor profilaxia."
  },
  "Conjuntivite Bacteriana Primária": {
    physio: "Inflamação da conjuntiva por agentes bacterianos. É crucial avaliar e excluir causas não bacterianas (olho seco, úlcera) com **STT e fluoresceína** antes de iniciar antibióticos.",
    why: "Antibiótico tópico guiado por citologia/cultura quando a secreção mucopurulenta é importante. Higiene palpebral é fundamental.",
    signs: "Hiperemia conjuntival, secreção mucopurulenta, prurido. Testes básicos como STT e fluoresceína são necessários. Citologia pode mostrar neutrófilos e cocos/bacilos.",
    adjuncts: "Lavagem com solução ocular estéril. Orientar sobre higiene e retorno precoce se houver piora."
  },
  "Dacriocistite": {
    physio: "Obstrução ou infecção do ducto nasolacrimal, resultando em epífora e secreção.",
    why: "**Lavagem do ducto** (canulação) para desobstruir e coletar material para cultura quando possível. Antibióticos conforme os achados.",
    signs: "Epífora, secreção no canto medial do olho, dor leve. Prova de Jones e sondagem/lavagem do ducto confirmam o diagnóstico.",
    adjuncts: "Higiene palpebral, anti-inflamatório tópico conforme necessidade, e reavaliação."
  },
  "Discoespondilite": {
    physio: "Infecção bacteriana ou fúngica do disco intervertebral e das placas terminais vertebrais, geralmente de origem hematogênica.",
    why: "Antibióticos que atingem bem o osso, frequentemente por **6-12 semanas**. [alert:warning]Considerar **Brucella** nos diferenciais e adequar a escolha do antibiótico.[/alert]",
    signs: "Dor espinhal, febre, déficit neurológico em casos avançados. Radiografia/RM confirmam. Hemocultura, urocultura ou cultura de lesões quando possível.",
    adjuncts: "Restrição de atividade, analgesia. Cirurgia indicada em casos de instabilidade ou compressão medular."
  },
  "Doença de Chagas (Complicações)": {
    physio: "Infecção por Trypanosoma cruzi que pode levar a miocardite e dilatação cardíaca, resultando em insuficiência cardíaca e arritmias.",
    why: "As opções de tratamento são limitadas. O manejo é focado no suporte cardiológico e tratamento da insuficiência cardíaca e arritmias.",
    signs: "Sinais de insuficiência cardíaca, arritmias.",
    adjuncts: "Terapia de suporte cardiológico."
  },
  "Ehrlichiose/Anaplasmose": {
    physio: "Infecção por patógenos intracelulares sanguíneos que causam trombocitopenia e outras citopenias.",
    why: "**[bg:green-100]Doxiciclina[/bg]** é o tratamento de escolha para cães e gatos. Ter cuidado com o risco de esofagite em gatos.",
    signs: "**[bg:yellow-100]Trombocitopenia[/bg]** é um achado comum. Sorologia/PCR são usados para diagnóstico. Considerar coinfecções.",
    adjuncts: "Controle de carrapatos e suporte hematológico quando necessário."
  },
  "Encefalopatia Hepática": {
    physio: "Aumento de amônia no sangue devido à sua produção pela microbiota intestinal. O manejo visa reduzir a produção e absorção de amônia.",
    why: "Tratamento adjuvante com **lactulose** e antibióticos intestinais (ex: amoxicilina, metronidazol) em cães e gatos.",
    signs: "Sinais neurológicos associados à disfunção hepática.",
    adjuncts: "Manejo da doença hepática subjacente."
  },
  "Endocardite Bacteriana": {
    physio: "Bacteremia com adesão de bactérias às valvas cardíacas, levando à formação de vegetações, insuficiência valvar e possíveis êmbolos sépticos.",
    why: "Antibióticos **bactericidas** por tempo prolongado (**semanas**) e terapia de suporte são necessários.",
    signs: "Febre intermitente, novos sopros cardíacos, claudicação, sinais de insuficiência cardíaca. **[bg:yellow-100]Ecocardiograma mostra vegetações[/bg]**. Hemoculturas seriadas podem isolar o agente.",
    adjuncts: "Tratar a insuficiência cardíaca congestiva e arritmias. Reavaliar com ecocardiograma e cultura."
  },
  "Endoftalmite Bacteriana": {
    physio: "Infecção intraocular secundária a trauma, cirurgia ou disseminação hematogênica, causando uveíte intensa e **[color:red-700]risco de perda do globo ocular[/color]**.",
    why: "Antibióticos sistêmicos que penetrem bem nos tecidos oculares, analgesia e, em casos graves, vitrectomia ou enucleação.",
    signs: "Dor ocular acentuada, **hipópio** (pus na câmara anterior), flare, visão reduzida. Exame completo e imagem quando disponível.",
    adjuncts: "[alert:danger]Controle agressivo da dor e da uveíte.[/alert] Proteção do olho contralateral."
  },
  "Enterite Necrosante (Clostridium perfringens NetF+)": {
    physio: "Lesão da mucosa intestinal por toxinas (NetF), causando diarreia hemorrágica súbita e hemoconcentração.",
    why: "**[bg:blue-100]Fluidoterapia agressiva[/bg]** é o pilar. Antibióticos indicados apenas em caso de toxemia ou sepse.",
    signs: "Diarreia hemorrágica aguda, hematócrito elevado. Testes específicos para a toxina NetF são limitados.",
    adjuncts: "Cristaloides/coloides, antieméticos, nutrição precoce e monitoramento da perfusão."
  },
  "Enteropatia Responsiva a Antibióticos (ARE / Disbiose)": {
    physio: "Disbiose intestinal em um subconjunto de pacientes com diarreia crônica responsiva a imunossupressores (DRCI), que responde a antimicrobianos.",
    why: "Curso terapêutico de prova (ex: **[bg:green-100]tilosina[/bg]** por 6-8 semanas ou metronidazol), sempre associado a dieta e suplementação de B12.",
    signs: "Diarreia crônica sem causa definida. O diagnóstico é retrospectivo, baseado na resposta ao tratamento.",
    adjuncts: "Reduzir/cessar o antibiótico após a remissão. Evitar o uso indiscriminado."
  },
  "Faringite/Tonsilite Bacteriana Primária": {
    physio: "Inflamação da faringe e das amígdalas, que pode ser primária ou uma extensão do Complexo Respiratório Infeccioso Canino (CRIC).",
    why: "Alívio da dor, hidratação e antibióticos quando a citologia/cultura sustentarem a infecção.",
    signs: "Odinofagia (dor ao engolir), sialorreia, tosse. Inspeção orofaríngea e cultura faríngea/tonsilar.",
    adjuncts: "Analgesia, amolecer o alimento. Antibiótico direcionado (padrões semelhantes aos do CRIC)."
  },
  "Fasceíte Necrosante": {
    physio: "Infecção fulminante das fáscias por estreptococos ou anaeróbios, levando a trombose microvascular e necrose.",
    why: "[alert:danger]É uma emergência cirúrgica.[/alert] Requer **desbridamento agressivo** e antibióticos IV de amplo espectro, incluindo cobertura para anaeróbios.",
    signs: "**[color:red-700]Dor desproporcional à lesão[/color]**, crepitação, necrose. Cultura de tecido para guiar a terapia.",
    adjuncts: "Estabilização hemodinâmica, analgesia multimodal, e curativos frequentes."
  },
  "Febre Maculosa (Rickettsia rickettsii)": {
    physio: "Vasculite causada pela replicação de Rickettsia em células endoteliais, com trombocitopenia por componente imune.",
    why: "[alert:danger]Iniciar **doxiciclina imediatamente** em caso de suspeita clínica, sem esperar pela confirmação.[/alert]",
    signs: "Febre, petéquias, sinais neurológicos, hipoalbuminemia. Sorologia com reações cruzadas exige soroconversão aguda/convalescente. PCR em sangue/tecido antes do antibiótico.",
    adjuncts: "Controle ambiental de carrapatos e suporte hemodinâmico."
  },
  "Febre Q (Coxiella burnetii)": {
    physio: "Zoonose associada a gatos no periparto ou que sofreram aborto. A importância zoonótica é maior que a clínica em cães e gatos.",
    why: "O foco é na **biossegurança e notificação**.",
    signs: "Doença clínica rara em animais de estimação. Testes são indicados quando há exposição ocupacional.",
    adjuncts: "Uso de EPI e higiene rigorosa no manejo de parturientes e abortos."
  },
  "Ferida por Mordedura": {
    physio: "Inoculação polimicrobiana (anaeróbios e gram-negativos) nos tecidos.",
    why: "**Lavagem copiosa e desbridamento** são essenciais. Antibiótico empírico com cobertura para anaeróbios e enterobactérias.",
    signs: "Bolsas subcutâneas ocultas, dor. Cultura indicada se a infecção estiver estabelecida.",
    adjuncts: "Uso de drenos e reavaliação em 24-48 horas."
  },
  "Fístulas Perianais": {
    physio: "Doença primariamente **imunomediada** com infecção secundária.",
    why: "O tratamento principal é com **[bg:purple-100]ciclosporina[/bg]**. Antibióticos são adjuvantes quando há infecção bacteriana associada.",
    signs: "Fístulas na região perianal.",
    adjuncts: "Manejo da dor e higiene local."
  },
  "Gastroenterite Hemorrágica (com sepse)": {
    physio: "Lesão da mucosa por toxinas (NetF de Clostridium perfringens) causa diarreia hemorrágica súbita e hemoconcentração.",
    why: "O pilar do tratamento é a **[bg:blue-100]fluidoterapia IV agressiva[/bg]**. Antibióticos são indicados apenas se houver toxemia ou sepse.",
    signs: "Diarreia hemorrágica aguda, hematócrito elevado. Testes específicos (toxina NetF) ainda são limitados.",
    adjuncts: "Cristaloides/coloides, antieméticos, nutrição precoce e monitoramento da perfusão."
  },
  "Gengivoestomatite Crônica Felina (GECF)": {
    physio: "Inflamação crônica **imunomediada** da cavidade oral. A infecção bacteriana é secundária.",
    why: "O tratamento é focado no controle da dor, odontologia (**extração parcial/total**) e imunomoduladores. Antibióticos são usados como coadjuvantes em surtos secundários.",
    signs: "Dor oral severa, halitose, salivação excessiva, dificuldade em comer.",
    adjuncts: "Manejo multimodal da dor."
  },
  "Hemoplasmose Canina": {
    physio: "Infecção por Mycoplasma haemocanis causa anemia regenerativa, mais grave em cães esplenectomizados ou imunossuprimidos.",
    why: "**PCR** é altamente sensível e útil para monitorar portadores. Tratar e reavaliar. Rastrear coinfecções (Ehrlichia/Babesia).",
    signs: "Anemia. A visualização em esfregaço sanguíneo é possível, mas o PCR confirma e detecta assintomáticos.",
    adjuncts: "Controle de carrapatos e suporte transfusional se necessário."
  },
  "Hemoplasmose Felina (Anemia Infecciosa Felina)": {
    physio: "Infecção por Mycoplasma haemofelis causa anemia hemolítica grave. M. haemominutum geralmente cursa de forma subclínica.",
    why: "**PCR** é o teste de eleição. Muitos gatos tornam-se portadores crônicos. Rastrear FeLV/FIV.",
    signs: "Letargia, febre, icterícia. O esfregaço sanguíneo pode mostrar os organismos, mas tem menor sensibilidade que o PCR.",
    adjuncts: "Suporte (transfusão se indicado) e controle de ectoparasitas."
  },
  "Hepatite Bacteriana": {
    physio: "Infecção do fígado, geralmente por bactérias entéricas.",
    why: "Tratamento com antibióticos guiado por cultura de bile/tecido quando possível. Cobertura empírica para entéricos gram-negativos e anaeróbios é razoável.",
    signs: "Sinais vagos, como letargia, vômito, febre. Elevação de enzimas hepáticas.",
    adjuncts: "Terapia de suporte."
  },
  "Hepatite Infecciosa Canina (Complicações)": {
    physio: "Doença viral (Adenovírus Canino tipo 1).",
    why: "Manejar complicações secundárias (ex: sobreinfecção bacteriana) caso ocorram, sempre guiado por sinais clínicos e exames laboratoriais. Evitar antibióticos sem evidência de infecção.",
    signs: "Sinais de doença hepática, febre, letargia.",
    adjuncts: "Terapia de suporte intensiva."
  },
  "Hepatozoonose (Hepatozoon americanum)": {
    physio: "Infecção por protozoário que causa febre, dor muscular e periostite.",
    why: "**Terapia tripla** (clindamicina + potencializadores como TMS/pirimetamina) para a crise aguda. Decoquinato crônico reduz a recidiva.",
    signs: "Febre, dor muscular, leucocitose marcante, periostite.",
    adjuncts: "Manejo da dor."
  },
  "Infeção de Implante Ortopédico": {
    physio: "Formação de **[color:purple-700]biofilme[/color]** bacteriano em superfícies de implantes, levando à persistência e recidiva da infecção.",
    why: "Desbridamento e **remoção do implante** quando a estabilidade óssea permite, associado a antibioticoterapia prolongada.",
    signs: "Dor, calor, deiscência ou drenagem no local da cirurgia. Cultura profunda orienta a escolha do antibiótico.",
    adjuncts: "Curativos, controle da dor, e considerar trocas de implante ou estabilização alternativa."
  },
  "Infecção por Helicobacter spp.": {
    physio: "Bactérias espiraladas gástricas. Muitos animais são portadores assintomáticos. A doença ocorre quando há gastrite ou úlcera associada.",
    why: "**Terapia tripla** (IBP + dois antimicrobianos) apenas em pacientes sintomáticos. A confirmação diagnóstica aumenta o valor preditivo positivo do tratamento.",
    signs: "Vômitos crônicos, dor abdominal. Histologia + urease/IMC + PCR aumentam a sensibilidade diagnóstica.",
    adjuncts: "IBP, antimicrobianos conforme protocolo, e reavaliação clínica."
  },
  "Infecções Odontogênicas": {
    physio: "Penetração bacteriana via canal radicular ou periodonto, causando celulite ou fístula (ex: abscesso do dente carnassial superior leva a tumefação infra-orbitária).",
    why: "**Drenagem e tratamento do dente** (exodontia/endodontia) mais antibióticos quando indicado.",
    signs: "Inchaço facial, drenagem. Radiografia intraoral é necessária para avaliar a raiz e descartar corpos estranhos.",
    adjuncts: "Analgesia, antibióticos se houver celulite, e tratamento da causa dentária."
  },
  "Infecções por Micobactérias Atípicas": {
    physio: "Infecção por micobactérias não tuberculosas, mais comum em gatos que em cães.",
    why: "Requer terapia com **múltiplos fármacos** (macrolídeo + fluoroquinolona + rifampicina) por meses. Ressecar lesões quando possível.",
    signs: "Nódulos subcutâneos, fístulas, celulite granulomatosa.",
    adjuncts: "Tratamento prolongado e, se possível, cirúrgico."
  },
  "ITU Reincidente (recorrente)": {
    physio: "Definida como ≥3 episódios de ITU em 12 meses, ou ≥2 em 6 meses. Pode ser uma **recidiva** (mesmo patógeno, sugerindo um foco profundo ou biofilme) ou uma **reinfecção** (novo patógeno, sugerindo fatores do hospedeiro).",
    why: "[alert:warning]O sucesso do tratamento a longo prazo depende criticamente da **identificação e manejo dos fatores predisponentes**.[/alert] O tratamento deve ser estritamente guiado pela cultura. Estratégias não antibióticas, como o uso de cranberry, têm evidências limitadas ou negativas.",
    signs: "Sinais de ITU inferior (disúria, polaciúria, hematúria) que recorrem após a terapia. A investigação deve ser exaustiva, incluindo imagem do trato urinário superior e inferior e, idealmente, cistoscopia com biópsia da mucosa para histopatologia e cultura de tecido profundo.",
    adjuncts: "[alert:danger]**🔬 Urocultura por cistocentese é OBRIGATÓRIA** antes de iniciar cada tratamento.[/alert] A terapia é guiada pela C&S por um período mais longo (e.g., 4 semanas). Imagem (ultrassom, radiografias de contraste) é frequentemente necessária para investigar a causa subjacente.\n\n[alert:info]**Dica de Interpretação:** Utilize sempre pontos de corte de sensibilidade veterinários (CLSI) e evite extrapolações da medicina humana (e.g., uso de ciprofloxacina).[/alert]"
  },
  "Leptospirose (Aguda e Portador)": {
    physio: "Penetração da espiroqueta por mucosas ou pele, levando a leptospiremia com tropismo por rins, fígado, SNC e olhos. A bactéria persiste nos túbulos renais, criando um estado de portador.",
    why: "**Doxiciclina** é o tratamento de escolha para eliminar o estado de portador e a excreção urinária crônica.",
    signs: "Amostrar sangue e urina para MAT, PCR e (quando possível) cultura. A excreção é intermitente e a cultura é lenta e difícil. Coletar amostras antes do antibiótico.",
    adjuncts: "Biossegurança (**[color:red-700]urina é zoonótica[/color]**), fluidoterapia, suporte renal/hepático, e desinfecção com iodóforos."
  },
  "Mastite": {
    physio: "Infecção ascendente da glândula mamária pelo teto em fêmeas lactantes, com risco de septicemia neonatal.",
    why: "Antibióticos seguros para os neonatos, analgesia e esvaziamento da glândula.",
    signs: "Glândula mamária quente e dolorida, secreção anormal. Cultura do leite pode identificar o agente.",
    adjuncts: "Ordenha frequente, compressas mornas, e antibióticos orientados por cultura."
  },
  "Meningite/Meningoencefalite Bacteriana": {
    physio: "Infecção bacteriana do SNC, seja por via hematogênica ou por contiguidade. Requer antibióticos que atinjam altas concentrações no líquido cefalorraquidiano (LCR).",
    why: "Iniciar precocemente antibióticos com **[bg:blue-100]boa penetração no LCR[/bg]** (ex: ceftriaxona, doxiciclina, amoxicilina).",
    signs: "Febre, dor cervical, letargia, déficits neurológicos. Análise do LCR mostra **[bg:yellow-100]pleocitose neutrofílica e proteína elevada[/bg]**.",
    adjuncts: "Analgesia, controle de edema (se indicado), e investigação do foco primário da infecção."
  },
  "Metrite Pós-parto": {
    physio: "Contaminação uterina no pós-parto com potencial para endotoxemia.",
    why: "Antibióticos sistêmicos de amplo espectro, fluidos e suporte. Esvaziamento uterino quando necessário.",
    signs: "Febre, secreção vaginal fétida, apatia. Ultrassom e hemograma auxiliam no diagnóstico. Cultura quando possível.",
    adjuncts: "Hospitalização se houver toxemia. Suporte intensivo, antibióticos guiados por cultura, e OHE em caso de falha terapêutica."
  },
  "Miosite Bacteriana (Piomiosite)": {
    physio: "Infecção focal do músculo, frequentemente secundária a inoculação ou infecção **[color:purple-700]anaeróbia[/color]**, resultando em dor e coleção de pus.",
    why: "Antibióticos sistêmicos que cubram anaeróbios e gram-positivos, mais drenagem da coleção quando presente.",
    signs: "Mialgia localizada, febre. CK pode estar elevada. Ultrassom ou TC para localizar o abscesso. Aspiração para cultura.",
    adjuncts: "Drenagem, analgesia. A duração do tratamento depende da resposta clínica."
  },
  "Neutropenia Febril": {
    physio: "Queda de neutrófilos circulantes com febre, resultando em alto risco de bacteremia e septicemia (gram-negativos e anaeróbios). Avaliar a medula óssea quando há citopenias persistentes.",
    why: "[alert:danger]Cobertura empírica IV **imediata** de amplo espectro (incluindo Pseudomonas) e suporte hemodinâmico, até a cultura.[/alert] O tratamento precoce e adequado melhora o desfecho.",
    signs: "Febre, letargia, hipotensão. Hemograma com neutropenia. Hemoculturas antes do antibiótico. Considerar punção de medula óssea.",
    adjuncts: "Suporte volêmico, barreiras de assepsia, e reavaliação do antibiótico em 48-72 horas com base na cultura."
  },
  "Nocardiose Sistémica": {
    physio: "Infecção por bactéria aeróbia filamentosa (Nocardia spp.), causando piotórax, lesões cutâneas e podendo disseminar. Cresce com dificuldade em cultura, sendo necessário avisar o laboratório.",
    why: "Iniciar com terapia de amplo espectro (ex: quinolona + ampicilina/sulbactam) até a cultura. Depois, preferir **[bg:green-100]sulfonamidas[/bg]** por longo prazo se Nocardia for confirmada.",
    signs: "Citologia com filamentos ramificados, coloração modificada álcool-ácido resistente.",
    adjuncts: "Tratamento de **6-12 semanas** (ou mais, dependendo do órgão afetado)."
  },
  "Orquite/Epididimite bacteriana": {
    physio: "Pode ser causada por **[color:red-700]Brucella canis[/color]** ou outras bactérias, causando inflamação do testículo/epidídimo com risco de infertilidade (calor, autoanticorpos).",
    why: "Antibióticos baseados em cultura, considerando a penetração prostática e duração mínima de 2-8 semanas.",
    signs: "Escroto doloroso e aumentado. O ultrassom escrotal é muito útil para diferenciar de neoplasia, dermatite ou hematocele.",
    adjuncts: "Analgesia, AINEs, colar elizabetano. Antibioticoterapia prolongada. Tratar brucelose se positivo. A fertilidade tem prognóstico reservado."
  },
  "Osteomielite": {
    physio: "Infecção óssea por Staphylococcus, Streptococcus, gram-negativos ou anaeróbios, de difícil erradicação.",
    why: "Antibióticos que penetrem bem no osso (**[bg:blue-100]clindamicina, cefalosporinas de 1ª ger.[/bg]**) por no mínimo 2 semanas após a resolução radiográfica. Desbridamento quando necessário.",
    signs: "Dor localizada, fístula. Radiografias seriadas e **[bg:yellow-100]cultura de tecido profundo[/bg]** confirmam o diagnóstico.",
    adjuncts: "Imobilização, controle da dor, e troca/retirada de implantes infectados quando aplicável."
  },
  "Otite Externa Bacteriana": {
    physio: "Infecção do conduto auditivo externo, frequentemente secundária a alergia, umidade ou corpos estranhos.",
    why: "[alert:info]O tratamento sistêmico é raramente indicado.[/alert] O tratamento é **tópico**, baseado na citologia (cocos vs. bastonetes; presença de Malassezia). Limpeza adequada do canal.",
    signs: "Prurido, otalgia, exsudato. A **citologia do ouvido** é o exame de eleição para guiar a terapia. Otoscopia para avaliar o conduto e a membrana timpânica.",
    adjuncts: "Limpeza regular e rechecagem citológica para avaliar a resposta. Identificar e tratar a causa primária (alergia, ácaros)."
  },
  "Otite Média/Interna (suspeita bacteriana)": {
    physio: "Extensão de otite externa ou infecção via tuba auditiva, causando infecção do ouvido médio/interno.",
    why: "**[bg:yellow-100]Miringotomia[/bg]** para coleta de cultura e drenagem. Antibiótico sistêmico empírico (amoxicilina-clavulanato, cefalosporina de 1ª geração, clindamicina, quinolona) ajustado pela cultura.",
    signs: "Dor, inclinação da cabeça (head tilt), nistagmo, paralisia facial. Otoscopia e imagem quando indicado.",
    adjuncts: "Controle da dor, limpeza controlada, e considerar abordagem cirúrgica (osteotomia da bula) em casos refratários."
  },
  "Pancreatite com colangite": {
    physio: "A conexão anatômica entre duodeno, trato biliar e pâncreas em gatos facilita a ocorrência de doença combinada (IBD + colangite + pancreatite), conhecida como **tríade felina**.",
    why: "O tratamento é de suporte (analgesia, nutrição enteral precoce). Antibióticos são indicados se a colangite bacteriana for documentada.",
    signs: "Dor, icterícia, aumento de lipase/ALT. Ultrassom compatível. Considerar aspiração de bile por agulha fina (FNA).",
    adjuncts: "Nutrição enteral, analgesia, antieméticos. Tratar cada componente da tríade."
  },
  "Pancreatite Necrosante Infeccionada": {
    physio: "Necrose pancreática colonizada por bactérias, levando a sepse.",
    why: "Antibióticos indicados apenas quando a infecção é confirmada ou há forte suspeita (gás, febre, cultura positiva). Suporte intensivo é vital.",
    signs: "Dor intensa, choque, aumento de lipase, ultrassom/TC com gás ou coleções. Cultura por FNA quando seguro.",
    adjuncts: "Analgesia potente, fluidoterapia, nutrição. Drenagem ou cirurgia quando indicado."
  },
  "Peritonite Biliar": {
    physio: "Ruptura das vias biliares ou da vesícula (ex: mucocele, trauma) com extravasamento de bile estéril ou infectada, causando peritonite química com ou sem componente séptico.",
    why: "**[bg:blue-100]Cirurgia[/bg]** para controlar a fonte e antibióticos se houver infecção.",
    signs: "Dor abdominal, icterícia. O líquido peritoneal tem **[bg:yellow-100]bilirrubina muito mais alta que o soro[/bg]**.",
    adjuncts: "Estabilização, antibióticos, e cirurgia (colecistectomia) quando indicado."
  },
  "Peritonite Infecciosa Felina (PIF) (Complicações)": {
    physio: "Doença viral.",
    why: "Evitar antibióticos empíricos em felinos imunossuprimidos sem sinais objetivos de infecção bacteriana secundária.",
    signs: "Variados, dependendo da forma (seca ou úmida).",
    adjuncts: "Terapia antiviral e de suporte."
  },
  "Peritonite Séptica": {
    physio: "Translocação bacteriana ou perfuração leva a contaminação peritoneal, **[color:red-700]hiperlactatemia e choque séptico[/color]**.",
    why: "[alert:danger]Bundle Séptico é crucial: **controle cirúrgico da fonte** + **antibiótico empírico precoce de amplo espectro**. Ajustar com base na cultura.[/alert]",
    signs: "Fluido peritoneal com células degeneradas e bactérias. [bg:yellow-100]A diferença de glicose e lactato entre o fluido peritoneal e o sangue[/bg] auxilia no diagnóstico rápido.",
    adjuncts: "Fluidoterapia agressiva, vasopressores se necessário, analgesia potente, cirurgia para controlar a fonte, e drenagem peritoneal quando indicada."
  },
  "Peste (Yersinia pestis)": {
    physio: "Zoonose importante, mais comum em gatos que em cães. Contágio por pulgas ou ingestão de roedores.",
    why: "Tratamento com doxiciclina, fluoroquinolona, cloranfenicol ou aminoglicosídeos. Terapia parenteral na fase bacterêmica. Animais tendem a não ser contagiosos após ~4 dias de antibiótico.",
    signs: "Febre, linfoadenite supurativa (**bubões**). Formas bubônica, septicêmica ou pneumônica.",
    adjuncts: "[alert:danger]Isolamento e controle de pulgas. Notificação obrigatória.[/alert]"
  },
  "Pielonefrite": {
    physio: "Infecção ascendente do trato urinário superior, com colonização preferencial da medula renal, onde o ambiente (hiperosmolar, pH baixo, baixo fluxo sanguíneo) reduz as defesas locais. A adesão bacteriana ao epitélio pélvico/tubular desencadeia uma resposta inflamatória que pode levar a isquemia e **[color:red-700]lesão renal aguda (LRA) e sepse[/color]**.",
    why: "O objetivo é proteger o parênquima renal. Requer antibióticos que atinjam altas concentrações no tecido renal. As diretrizes da ISCAID sugerem **fluoroquinolonas** como uma boa escolha empírica enquanto se aguarda a cultura, devido à sua excelente penetração.",
    signs: "Sinais incluem dor lombar/flanco, febre, letargia, desidratação e vômito. A urinálise pode mostrar piúria e **[bg:yellow-100]cilindros leucocitários[/bg]** (forte sugestão de origem renal). O ultrassom pode revelar dilatação pélvica e debris. Sempre realizar urocultura com antibiograma.",
    adjuncts: "[alert:warning]Cultura de urina é obrigatória. Os resultados devem ser interpretados usando pontos de corte de sensibilidade sistêmicos (plasma), não urinários.[/alert] Fluidoterapia IV é frequentemente necessária. Cursos de tratamento de 7 a 14 dias podem ser eficazes, com reavaliação. Evite ciprofloxacina devido a questões de PK/PD em veterinária."
  },
  "Piodermite Profunda": {
    physio: "Infecção que envolve a derme e o tecido subcutâneo, frequentemente com formação de **[color:purple-700]biofilme[/color]**, dificultando a penetração de antibióticos.",
    why: "Antibióticos sistêmicos por tempo prolongado são necessários. Clindamicina é útil para pele, ossos e articulações, quando sensível.",
    signs: "Fístulas, nódulos, drenagem. **[bg:yellow-100]Cultura e antibiograma são essenciais.[/bg]**",
    adjuncts: "Desbridamento de tecidos desvitalizados e controle de comorbidades."
  },
  "Piodermite Superficial": {
    physio: "Barreira cutânea íntegra + microbiota residente controlada pelo manto lipídico e imunidade inata. Quebra da barreira (alergia, endocrinopatia) → supercrescimento de **[color:green-700]Staphylococcus pseudintermedius[/color]** e inflamação folicular.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h (cão) ou 15-25 mg/kg VO q8-12h (gato) e Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h (cão) ou 12,5-20 mg/kg VO q12h (gato) oferecem boa cobertura. Cefpodoxima 5-10 mg/kg VO q24h e Clindamicina 5,5-10 mg/kg VO q12h são alternativas.",
    signs: "Pápulas, pústulas, crostas, prurido. **[bg:yellow-100]Citologia por fita/acetato (neutrófilos + cocos)[/bg]** confirma infecção. Pesquisar doença de base (atopia, pulgas, endócrino).",
    adjuncts: "Banhos de clorexidina 2-4% 2-3x/sem, controle do prurido, controle de pulgas, dieta/atopia. Duração: 14-21 dias (tratar até cura clínica + ~7 dias). Cultura se recidiva/falha."
  },
  "Piotórax": {
    physio: "Exsudato purulento no espaço pleural, muito comum em gatos. Infecção polimicrobiana, incluindo **[color:purple-700]anaeróbios[/color]**. Pode ser causado por feridas penetrantes, abscessos pulmonares ou corpos estranhos.",
    why: "Infecção de cavidade fechada que necessita de **[bg:blue-100]drenagem[/bg]** e antibióticos IV de amplo espectro, ajustados pela cultura. Duração de **2-3 meses**.",
    signs: "Dispneia, febre, perda de peso. Toracocentese diagnóstica com envio para cultura de aeróbios e anaeróbios.",
    adjuncts: "Colocação de dreno torácico até a drenagem ser <5 mL/kg/dia. Técnica asséptica, lavagem com soro fisiológico morno em casos selecionados. Considerar toracoscopia/toracotomia se refratário."
  },
  "Pneumonia Aspirativa": {
    physio: "Aspiração de conteúdo orofaríngeo causa inflamação química rápida, seguida de colonização bacteriana em poucas horas. Tratar como pneumonia bacteriana. Padrão radiográfico **[bg:yellow-100]cranioventral[/bg]**.",
    why: "Iniciar antibióticos de amplo espectro enquanto se aguarda a cultura. Suporte ventilatório conforme a gasometria.",
    signs: "Tosse, febre, dispneia após um evento de aspiração. Radiografia com padrão típico. Considerar hemogasometria.",
    adjuncts: "Oxigenoterapia, nebulização e coupage. Broncodilatadores (ex: terbutalina) em caso de broncoconstrição aguda. Evitar o uso rotineiro de corticoides."
  },
  "Pneumonia Bacteriana (ambulatorial)": {
    physio: "Inalação ou aspiração de patógenos, com padrão radiográfico cranioventral. Flora frequentemente gram-negativa e polimicrobiana.",
    why: "Coletar cultura antes de iniciar o antibiótico. Iniciar terapia empírica e ajustar depois. Terapia oral em casos leves, IV se houver hypoxemia ou febre.",
    signs: "Tosse produtiva, febre. **[bg:yellow-100]Lavado traqueal ou broncoalveolar[/bg]** para citologia e cultura.",
    adjuncts: "Nebulização e coupage. Oxigenoterapia se necessário. Considerar combinações como ampicilina + aminoglicosídeo ou fluoroquinolona."
  },
  "Pneumonia Fúngica (Sobreinfecção Bacteriana)": {
    physio: "Pneumonias por Histoplasma, Blastomyces ou Coccidioides. O dano pulmonar predispõe a infecção bacteriana secundária.",
    why: "Tratamento com **[bg:purple-100]antifúngico específico[/bg]**. Antibióticos apenas se houver evidência de sobreinfecção (cultura/citologia).",
    signs: "Padrões radiográficos intersticiais ou nodulares. Sorologia, detecção de antígeno, citologia ou biópsia.",
    adjuncts: "Suporte ventilatório e manejo de complicações como a hipoxemia."
  },
  "Profilaxia Cirúrgica": {
    physio: "Contaminação intraoperatória por flora cutânea, entérica ou ambiental.",
    why: "**[bg:green-100]Cefazolina[/bg]** perioperatória é prática comum em procedimentos ortopédicos e de tecidos moles. O objetivo é atingir concentração tecidual **no momento da incisão**.",
    signs: "Não se aplica (profilaxia). A avaliação é baseada na classificação da ferida (limpa, limpa-contaminada, etc.).",
    adjuncts: "[alert:info]**Timing é Tudo**[/alert]\n[flow]30-60 min ANTES da incisão -> Administrar 1ª dose de Cefazolina -> Cirurgia -> Redosar a cada 90-120 min -> Fim da Cirurgia -> Descontinuar antibiótico[/flow]\nHigiene e técnica asséptica são a base da prevenção."
  },
  "Prostatite Bacteriana": {
    physio: "Infecção ascendente do trato urinário; **[color:rose-700]E. coli[/color]** predomina. Na prostatite aguda, antibióticos ácidos podem 'melhorar' os sinais, mas não esterilizam o tecido, levando à cronificação.",
    why: "Escolher um fármaco **[bg:blue-100]lipofílico/alcalino[/bg]** (TMP-sulfa, fluoroquinolonas) e manter por no mínimo **6 semanas** (crônica).",
    signs: "Febre, dor prostática, piúria. Cultura de urina ou fluido prostático. Ultrassom auxilia no diagnóstico.",
    adjuncts: "Antibióticos guiados por cultura. Evitar penicilinas e cefalosporinas de 1ª geração. Controlar comorbidades. Considerar a castração em casos de recidiva."
  },
  "Rinite Fúngica (Sobreinfecção Bacteriana)": {
    physio: "Doença nasal causada por fungos (ex: Cryptococcus em gatos). As bactérias são geralmente secundárias.",
    why: "Tratamento com **[bg:purple-100]antifúngico direcionado[/bg]**. Antibióticos indicados quando a cultura mostra infecção secundária.",
    signs: "Espirros, descarga nasal. Rinoscopia e biópsia são mais diagnósticas que a cultura. TC auxilia no planejamento.",
    adjuncts: "Lavagem nasal terapêutica para desobstrução. Analgesia e higiene nasal."
  },
  "Rinite/Sinusite Bacteriana": {
    physio: "Frequentemente **secundária** a outras condições (polipose, corpo estranho, doença dentária, sequelas virais). A cultura ajuda a escolher o antibiótico, mas não resolve se a causa primária não for tratada.",
    why: "Descartar e tratar doenças primárias. Antibióticos direcionados por cultura quando indicado.",
    signs: "Descarga mucopurulenta. Rinoscopia, biópsia e TC são úteis. As amostras podem não ser diagnósticas.",
    adjuncts: "Higiene nasal, anti-inflamatórios quando apropriado, e tratamento da causa de base."
  },
  "Saculite Anal / Abscesso de Saco Anal": {
    physio: "Infecção do saco anal que pode evoluir para celulite ou abscesso. Muito comum em cães.",
    why: "Expressão e lavagem do saco anal. Em caso de abscesso, drenagem, lavagem e antibióticos sistêmicos.",
    signs: "'Scooting' (arrastar o ânus no chão), dor, febre. Tratos de drenagem podem ser visíveis.",
    adjuncts: "Compressas quentes, reavaliação. Saculectomia em casos de recidiva."
  },
  "Salmonelose (Sistémica)": {
    physio: "Infecção por enterobactéria invasiva que pode levar a bacteremia e sepse, especialmente em animais jovens ou imunossuprimidos. É uma **[color:red-700]zoonose[/color]**.",
    why: "Suporte intensivo. Antibióticos em pacientes sistêmicos (baseado em cultura/sensibilidade), pois o tratamento em portadores pode prolongar a eliminação.",
    signs: "Diarreia, febre, leucocitose. Hemocultura, coprocultura ou PCR confirmam.",
    adjuncts: "Isolamento, bioproteção, hidratação. Notificar o tutor sobre o risco zoonótico."
  },
  "Sepse de Origem Desconhecida": {
    physio: "Grande parte é infecciosa, mas o diagnóstico diferencial inclui doenças imunomediadas e neoplasias. Exames gerais (hemograma, bioquímico, urinálise, imagem) ajudam mais que testes específicos inicialmente.",
    why: "Após investigação inicial sem diagnóstico, pode-se tentar um curso de **[bg:blue-100]ampicilina + enrofloxacino[/bg]** por 5-7 dias como teste terapêutico.",
    signs: "Febre de origem desconhecida, letargia, sinais de disfunção orgânica.",
    adjuncts: "Terapia de suporte agressiva e busca contínua pela fonte."
  },
  "Tétano (Clostridium tetani)": {
    physio: "Infecção por Clostridium tetani, geralmente através de feridas, que produz uma neurotoxina.",
    why: "O objetivo é eliminar a fonte bacteriana da toxina. O tratamento de suporte é a base da terapia.",
    signs: "Rigidez muscular, trismo (dificuldade de abrir a boca), 'risus sardonicus', postura de cavalete ('sawhorse stance').",
    adjuncts: "Cuidados intensivos, **[bg:green-100]metronidazol[/bg]** (preferido) ou penicilina/amoxicilina-clavulanato, controle de espasmos e desbridamento da ferida."
  },
  "Tifo Murino (Rickettsia typhi)": {
    physio: "Zoonose transmitida por pulgas de roedores. A doença clínica em cães é rara.",
    why: "Tratamento com doxiciclina empírica na suspeita. Controle de vetores é essencial.",
    signs: "Sinais geralmente ausentes ou leves. Sorologia/PCR quando a exposição é compatível. Considerar reações cruzadas.",
    adjuncts: "Controle de pulgas e roedores."
  },
  "Toxoplasmose/Neosporose": {
    physio: "Infecções por protozoários. Toxoplasma em gatos pode causar uveíte, sinais neurológicos ou respiratórios. Neospora em cães causa doença neuromuscular.",
    why: "**[bg:green-100]Clindamicina[/bg]** é a primeira linha para ambas as condições.",
    signs: "Variados. Uveíte, sinais neurológicos, miosite.",
    adjuncts: "O prognóstico é reservado em casos avançados."
  },
  "Tromboflebite Séptica": {
    physio: "Inflamação e trombo infeccioso associado a um cateter venoso, geralmente por técnica asséptica inadequada ou tempo de permanência excessivo.",
    why: "**[bg:red-100]Retirada imediata do cateter suspeito[/bg]**, cultura da ponta e do sítio, e antibióticos guiados por cultura.",
    signs: "Dor, calor, 'cordão' venoso palpável, secreção no sítio do cateter, febre.",
    adjuncts: "Compressas mornas, analgesia, novos acessos em local distinto. A prevenção é feita com protocolos de manutenção de cateter."
  },
  "Intertrigo Mamário (Dobra Mamária) – Infectado": {
    physio: "Dermatite de dobras mamárias com microambiente úmido e hipóxico que favorece o crescimento de **[color:green-700]Staphylococcus pseudintermedius[/color]**, Gram-negativos e anaeróbios. Comum em cadelas com múltiplas gestações e dobras mamárias proeminentes.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h por 14-21d ou Amoxi/Clav 12,5-25 mg/kg VO q12h por 14-21d oferecem boa cobertura para cocos Gram+ e Gram-. Higiene local é fundamental.",
    signs: "Eritema, odor, secreção nas dobras mamárias. **[bg:yellow-100]Citologia (neutrófilos + cocos/bastonetes)[/bg]** confirma infecção. Cultura se recidiva.",
    adjuncts: "Higiene local com clorexidina 2-4%, secagem adequada, antissépticos tópicos. Perda de peso se necessário. Duração: 14-21d (tratar até cura clínica + ~7 dias)."
  },
  "Dermatite de Dobras (Intertrigo) - Expandida": {
    physio: "Microambiente úmido e hipóxico favorece cocos e anaeróbios. Quebra da barreira cutânea por umidade excessiva, trauma ou obesidade. **[color:green-700]Staphylococcus pseudintermedius[/color]**, Gram-negativos oportunistas e Anaeróbios (Bacteroides, Fusobacterium).",
    why: "Cefalexina 22-30 mg/kg VO q8-12h por 14-21d ou Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h. Cefpodoxima 5-10 mg/kg VO q24h e Clindamicina 5,5-10 mg/kg VO q12h são alternativas.",
    signs: "Eritema, odor, secreção nas dobras. **[bg:yellow-100]Citologia (neutrófilos + cocos/bastonetes)[/bg]** confirma infecção. Cultura se recidiva.",
    adjuncts: "Priorizar terapia tópica e higiene; sistêmico se foliculite/celulite/recorrência. Duração: Superficiais: 14-21d; profundas: 3-4 sem (tratar até resolução clínica +1-2 sem conforme profundidade)."
  },
  "Dermatite Piotraumática (Hot Spot) - Expandida": {
    physio: "Lesão aguda por autotrauma que pode progredir para foliculite/celulite. Quebra da barreira cutânea por trauma mecânico (lambedura, coçadura) com colonização bacteriana secundária. **[color:green-700]Staphylococcus pseudintermedius[/color]** e Gram-negativos oportunistas.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h ou Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h. Antibiótico sistêmico só se a infecção for além da superfície.",
    signs: "Lesão aguda, úmida, dolorosa, com bordas bem definidas. **[bg:yellow-100]Citologia (neutrófilos + cocos)[/bg]** confirma infecção.",
    adjuncts: "Tratar fator primário para evitar recidiva. Duração: 10-14d se superficial; se evoluir para profunda, seguir esquema de 3-4 sem."
  },
  "Acne Felina com Sobreinfecção Bacteriana": {
    physio: "Disfunção folicular no mento com risco de foliculite/furunculose secundária. Alteração da queratinização folicular com obstrução e colonização bacteriana. **[color:green-700]Staphylococcus spp.[/color]** e Gram-negativos oportunistas.",
    why: "Clindamicina 5,5-10 mg/kg VO q12h por 14d ou Amoxicilina/Clavulanato 12,5-20 mg/kg VO q12h por 14d. Tópicos antibacterianos como 1ª linha; sistêmicos apenas em moderada-grave.",
    signs: "Pápulas, pústulas, crostas no mento. **[bg:yellow-100]Citologia (neutrófilos + cocos)[/bg]** confirma infecção.",
    adjuncts: "Higiene do queixo, antissépticos (clorexidina), trocar comedouro. Duração: Reavaliar em 14d; prolongar se deep."
  },
  "Pododermatite Bacteriana / Furunculose Interdigital": {
    physio: "Ruptura folicular com reação piogranulomatosa e infecção profunda; pode haver corpo estranho (awns). Trauma repetitivo ou corpo estranho migratório. **[color:green-700]Staphylococcus pseudintermedius[/color]** e Gram-negativos (Pseudomonas/Proteus).",
    why: "Cefalexina 22-30 mg/kg VO q8-12h ou Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h. Marbofloxacina 2,75-5,5 mg/kg q24h (cão); 2-5 mg/kg q24h (gato) se bastonetes.",
    signs: "Nódulos, fístulas, dor interdigital. **[bg:yellow-100]Citologia (cocos ± bastonetes)[/bg]**. Cultura + MIC sempre que possível.",
    adjuncts: "Tópicos antissépticos, bandagem almofadada, analgesia, remover corpo estranho, tratar comorbidades. Duração: Deep: 6-8 (até 12) semanas; +2 semanas após cura clínica."
  },
  "Paroníquia / Onicite Bacteriana": {
    physio: "Infecção do leito ungueal após avulsão/trauma. Quebra da barreira cutânea periungueal com colonização bacteriana. **[color:green-700]Staphylococcus pseudintermedius[/color]** e Gram− oportunistas.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h ou Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h. Clindamicina 5,5-10 mg/kg q12h ou Marbofloxacina se bastonetes/documentação.",
    signs: "Dor, edema, secreção periungueal. **[bg:yellow-100]Citologia/cultura[/bg]**, RX se osteíte distal.",
    adjuncts: "Limpeza/antissépticos, analgesia, desbridamento/onychectomia em crônicos dolorosos. Duração: 6-8 semanas; +2 semanas após cura clínica."
  },
  "Lesão por Lambedura (Lick Granuloma) Infectada": {
    physio: "Lesão autoinfligida crônica que frequentemente evolui para foliculite/furunculose. Trauma repetitivo com quebra da barreira cutânea e colonização bacteriana. **[color:green-700]Staphylococcus pseudintermedius[/color]** e Gram-negativos oportunistas.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h, Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h ou Clindamicina 5,5-10 mg/kg q12h. Guiado por cultura; esquemas de pele profunda.",
    signs: "Nódulo firme, ulcerado, com bordas elevadas. **[bg:yellow-100]Citologia (neutrófilos + cocos/bastonetes)[/bg]** confirma infecção.",
    adjuncts: "Controle de dor/ansiedade, colar elizabetano, terapia comportamental. Duração: Superficial: 3-4 semanas +1 semana após cura clínica; Deep: ≥6-8 semanas +2 semanas após cura clínica."
  },
  "Blefarite Bacteriana / Hordeolo (terçol) / Meibomite": {
    physio: "Inflamação/infeção das pálpebras (margem palpebral/folículos/Glândulas de Meibômio). Obstrução das glândulas de Meibômio com colonização bacteriana. **[color:green-700]Staphylococcus pseudintermedius[/color]**, Streptococcus canis, Gram-negativos oportunistas (casos crônicos).",
    why: "Tobramicina 0,3% 1 gota/pomada q6-8h por 7-10d ou Cloranfenicol 0,5% q6-8h por 7-10d. Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h por 10-14d ou Cefalexina 22-30 mg/kg VO q8-12h por 10-14d se sistêmico necessário.",
    signs: "Eritema, edema palpebral, secreção. **[bg:yellow-100]Exame oftálmico completo[/bg]** (STT, fluoresceína) é mandatório.",
    adjuncts: "Compressas mornas e higiene palpebral, remoção de cílio distíquio/corpo estranho se presente. Duração: 7-10d tópico; 10-14d sistêmico se necessário."
  },
  "Impetigo do Filhote (Pustulose Juvenil) – com sobreinfecção": {
    physio: "Piodermite superficial de filhotes, geralmente não pruriginosa no início; pode complicar e exigir antibiótico sistêmico. Imaturidade do sistema imune e barreira cutânea. **[color:green-700]Staphylococcus pseudintermedius[/color]**.",
    why: "Cefalexina 22-30 mg/kg VO q8-12h por 14-21d ou Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h por 14-21d. Clindamicina 5,5-10 mg/kg VO q12h ou Cefpodoxima 5-10 mg/kg VO q24h (cães) são alternativas.",
    signs: "Pústulas superficiais, crostas, geralmente não pruriginosas. **[bg:yellow-100]Citologia (neutrófilos + cocos)[/bg]** confirma infecção.",
    adjuncts: "Banhos antissépticos (clorexidina 2-4%) 2-3x/semana, controle de umidade e higiene do ambiente. Duração: 14-21d."
  },
  "Foliculite Mucocutânea (lábios, plano nasal, mucosas) – infectada": {
    physio: "Inflamação crônica em junções mucocutâneas com sobreinfecção bacteriana secundária. Quebra da barreira cutânea em áreas de transição mucosa-pele. **[color:green-700]Staphylococcus pseudintermedius[/color]** e Anaeróbios locais (quando odor fétido).",
    why: "Amoxicilina/Clavulanato 12,5-25 mg/kg VO q12h por 3-4 sem. Cefalexina 22-30 mg/kg (cão) / 15-25 mg/kg (gato) VO q8-12h, Clindamicina 5,5-10 mg/kg VO q12h ou Metronidazol 10-15 mg/kg VO q12h são alternativas.",
    signs: "Eritema, crostas, ulcerações nas junções mucocutâneas. **[bg:yellow-100]Citologia (neutrófilos + cocos/bastonetes)[/bg]** confirma infecção.",
    adjuncts: "Higiene oral, tópicos antissépticos labiais, controlar alergia primária. Duração: 3-4 sem."
  },
  "Piodermite Profunda / Furunculose": {
    physio: "Folículo íntegro profundo com boa perfusão dérmica. Ruptura folicular → reação piogranulomatosa + bactérias profundas. **[color:green-700]S. pseudintermedius[/color]** e Gram− oportunistas (Pseudomonas/Proteus).",
    why: "Cefalexina 22-30 mg/kg VO q8-12h ou Amoxi/Clav 12,5-25 mg/kg q12h (cão); Amoxi/Clav 12,5-20 mg/kg q12h (gato). Considerar Marbo 2,75-5,5 mg/kg q24h se bastonetes. Clindamicina 5,5-10 mg/kg q12h e Cefpodoxima 5-10 mg/kg q24h (cão) são alternativas.",
    signs: "Fístulas, nódulos, drenagem, dor. **[bg:yellow-100]Citologia (cocos ± bastonetes)[/bg]**. Cultura + MIC sempre que possível.",
    adjuncts: "Banhos antissépticos, bandagem almofadada conforme lesão. Duração: 6-8 (até 10-12) semanas; +2 semanas após cura clínica. Cultura/MIC em todos os casos profundos."
  },
  "Abscesso por Mordedura": {
    physio: "Pele íntegra, microbiota oral e cutânea isoladas. Inoculação de flora oral + anaeróbios em bolsão subcutâneo hipóxico. Anaeróbios (Bacteroides, Fusobacterium), Pasteurella multocida (gatos), Streptococcus, Staphylococcus, Enterobactérias.",
    why: "Ampicilina/Sulbactam 22-30 mg/kg IV q6-8h → Amoxi/Clav 12,5-25 mg/kg VO q12h (cão); Amoxi/Clav 12,5-20 mg/kg VO q12h (gato). Adicionar Metronidazol 10-15 mg/kg q12h se odor fétido/necrose.",
    signs: "Dor, edema, febre, secreção purulenta. **[bg:yellow-100]Exploração e drenagem (padrão-ouro)[/bg]**. Citologia (bacilos/cocos), cultura aeróbios/anaeróbios.",
    adjuncts: "Drenagem ampla, curativos por fases, analgesia. Duração: 7-14 dias após drenagem adequada. ATB cobre anaeróbios."
  },
  "Celulite Bacteriana (não necrosante)": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Eritema, edema, dor, febre. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Otite Externa Bacteriana (moderada/grave)": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Dor, secreção, odor. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Otite Média/Interna Bacteriana": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Dor, secreção, alterações neurológicas. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Pneumonia Bacteriana (Comunitária)": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Tosse, febre, dispneia. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Pneumonia Aspirativa com Sobreinfecção Bacteriana": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Tosse, febre, dispneia. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Cistite Bacteriana Esporádica (não complicada)": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Poliúria, polidipsia, disúria. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "ITU Recorrente/Complicada": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Poliúria, polidipsia, disúria. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Pielonefrite Bacteriana": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Poliúria, polidipsia, disúria, febre. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },
  "Prostatite Bacteriana / Abscesso Prostático": {
    physio: "Desbalanço das defesas locais → colonização, invasão e inflamação; risco de biofilme/anaerobiose dependendo do sítio. Patógenos típicos do sítio.",
    why: "Esquema 1ª linha conforme sítio (ex.: Amoxi/Clav 12,5-25 mg/kg q12h; alternativas conforme patógeno e MIC). Fluoroquinolona quando Gram− e sensibilidade, Clindamicina para Gram+ sensíveis, Metronidazol para anaeróbios.",
    signs: "Dor pélvica, disúria, febre. **[bg:yellow-100]Exame dirigido + cultura/MIC[/bg]** quando possível. Imagem conforme necessidade.",
    adjuncts: "Controle de foco (drenagem/cirurgia), suporte, higiene/curativos, fisioterapia quando indicado. Duração: conforme sítio: curto (3-5 d) até prolongado (6-8 sem)."
  },

  "Tularemia (Francisella tularensis)": {
    physio: "Zoonose grave transmitida por carrapatos ou contato com animais infectados.",
    why: "Tratamento rápido com aminoglicosídeos, doxiciclina ou fluoroquinolonas, conforme a gravidade e epidemiologia.",
    signs: "Gatos frequentemente apresentam linfoadenopatia generalizada e abscessos viscerais.",
    adjuncts: "[alert:danger]Risco para a equipe veterinária. Requer biossegurança.[/alert]"
  },
  "Uretrite Bacteriana": {
    physio: "Inflamação da uretra, muitas vezes associada a ITU vesical. Pode coexistir com prostatite em machos.",
    why: "O tratamento com antibióticos deve ser dirigido pela cultura para evitar terapia empírica prolongada e ineficaz.",
    signs: "Disúria, estrangúria, polaciúria, secreção uretral. O exame físico deve ser direcionado (exteriorização do pênis, palpação testicular, exame vaginal). Se a imagem inicial não for conclusiva, a **[bg:yellow-100]cistouretroscopia[/bg]** é a ferramenta ideal para avaliação direta da mucosa.",
    adjuncts: "Tratamento de comorbidades, como a prostatite, é crucial, lembrando que esta pode evoluir para abscessos que podem romper. A cultura de urina é recomendada para guiar a terapia."
  },
  "Vaginite Bacteriana (Adulta)": {
    physio: "Geralmente multifatorial; a vaginite 'primária bacteriana' é rara. Frequentemente associada a dermatite perivulvar, corpos estranhos ou ITU crônica. A antibioticoterapia prévia pode distorcer a flora.",
    why: "Tratar a causa de base. Antibióticos apenas quando a cultura comprova um patógeno deslocando a flora normal.",
    signs: "Vulvite, folículos linfoides visíveis na vaginoscopia. A cultura pode mostrar gram-negativos atípicos, Pseudomonas ou Mycoplasma após antibioticoterapia.",
    adjuncts: "Higiene local, analgesia/AINEs. Corrigir anomalias (ex: dobras vulvares) cirurgicamente quando indicado."
  },

  // NEW ENTRIES
  "Piopericárdio (Pericardite Bacteriana)": {
    physio: "Infecção do saco pericárdico, geralmente por **migração de corpo estranho** (espiguetas), extensão de piotórax, ou bacteremia. A flora é **[color:purple-700]mista[/color]** (anaeróbios, Actinomyces, Nocardia, estafilos, estreptos). O exsudato purulento limita o enchimento diastólico, levando a **[color:red-700]tamponamento cardíaco[/color]**.",
    why: "Requer cobertura ampla. Iniciar terapia empírica com **[bg:blue-100]Ampicilina/sulbactam + Marbofloxacina[/bg]** após a coleta de amostras. [alert:danger]**NUNCA** iniciar antibiótico antes da pericardiocentese para cultura.[/alert] A terapia é prolongada (**4-6 semanas** ou mais).",
    signs: "Sinais de tamponamento: **sons cardíacos abafados**, dispneia, pulso fraco, distensão jugular. **[bg:yellow-100]ECO confirma a efusão[/bg]**. A pericardiocentese guiada para citologia e cultura aeróbia/anaeróbia é diagnóstica e terapêutica.",
    adjuncts: "A **drenagem efetiva** é crucial. Em casos recorrentes ou organizados, a **[bg:green-100]pericardiectomia subtotal[/bg]** é o tratamento de escolha para prevenir a pericardite constritiva."
  },
  "Piopericárdio (Felino)": {
    physio: "Raro em gatos, geralmente associado à **extensão de piotórax**. A fisiopatologia é semelhante à dos cães, com risco de tamponamento.",
    why: "A cobertura antibiótica é semelhante à dos cães: **[bg:blue-100]Ampicilina/sulbactam + Marbofloxacina[/bg]** (usar doses seguras para gatos para evitar retinopatia).",
    signs: "Diagnóstico baseado em **[bg:yellow-100]ECO e pericardiocentese[/bg]**. Os sinais clínicos são de insuficiência cardíaca congestiva direita.",
    adjuncts: "Drenagem e manejo de suporte são os pilares do tratamento. Tratar a causa subjacente (piotórax) é fundamental."
  },
  "Infecção de Sítio Cirúrgico (tecidos moles, sem implante)": {
    physio: "Contaminação da ferida por **flora cutânea (Staphylococcus)** ou entérica. O atraso no debridamento pode levar à formação de **[color:purple-700]biofilme[/color]** e aprofundamento da infecção.",
    why: "A antibioticoterapia é adjuvante ao tratamento local. Iniciar com **[bg:green-100]Amoxi-clav[/bg]** após a coleta de cultura do tecido. [alert:warning]Evitar profilaxia terapêutica prolongada sem o controle adequado do foco.[/alert]",
    signs: "Sinais clássicos de inflamação: **dor, eritema, calor, exsudato**. A cultura deve ser do **tecido profundo**, não do exsudato superficial.",
    adjuncts: "**[bg:blue-100]Desbridamento cirúrgico[/bg]**, lavagem e drenagem são essenciais para a resolução. A terapia com curativos adequados acelera a cicatrização."
  },
  "Sialoadenite/Abscesso de glândula salivar": {
    physio: "Infecção de glândula salivar, geralmente secundária a **trauma ou sialocele infectado**. A flora é oral e mista.",
    why: "Antibióticos como **[bg:green-100]Amoxi-clav[/bg]** com ou sem **[bg:blue-100]Metronidazol[/bg]** para cobrir anaeróbios. A duração é de 10-14 dias, estendendo se houver coleção.",
    signs: "Edema doloroso na região submandibular ou parotídea, disfagia. **[bg:yellow-100]US confirma coleção heterogênea[/bg]**. Punção por agulha fina para citologia e cultura.",
    adjuncts: "**Drenagem** ou **remoção cirúrgica da glândula/sialocele** é frequentemente necessária. Analgesia é importante."
  },
  "Linfadenite Supurativa Bacteriana (cervical/mandibular)": {
    physio: "Infecção de linfonodos por extensão de processos **orais ou cutâneos**. Agentes comuns incluem **Streptococcus canis** e **Staphylococcus pseudintermedius**.",
    why: "O tratamento com **[bg:green-100]Amoxi-clav[/bg]** ou **[bg:blue-100]Clindamicina[/bg]** geralmente é eficaz. A duração é de 14-21 dias.",
    signs: "Aumento de volume doloroso e flutuante. A **[bg:yellow-100]citologia do aspirado mostra inflamação supurativa[/bg]**. Cultura para guiar terapia definitiva.",
    adjuncts: "**Drenagem** da coleção quando houver flutuação acelera a resolução. Investigar e tratar a fonte primária (doença dentária, dermatite)."
  },
  "Tenossinovite Séptica": {
    physio: "Infecção da bainha tendínea por **feridas puntiformes**. A infecção é polimicrobiana e a formação de **[color:purple-700]biofilme[/color]** dentro da bainha é comum.",
    why: "Antibioticoterapia isolada é insuficiente. O tratamento requer **[bg:blue-100]lavagem cirúrgica precoce[/bg]** e ATB sistêmico (ex: **Ampicilina/sulbactam**). Duração de 3-4 semanas.",
    signs: "Claudicação aguda e severa, com dor intensa à palpação da bainha tendínea. O **[bg:yellow-100]US pode mostrar coleção fluida[/bg]**.",
    adjuncts: "[alert:danger]A lavagem e o desbridamento cirúrgico são **fundamentais** e impactam diretamente o desfecho.[/alert] Atraso no tratamento pode levar a aderências e perda de função."
  },
  "ITU Associada a Cateter (CAUTI) - Sintomática": {
    physio: "Formação de **[color:purple-700]biofilme[/color]** no cateter urinário, que serve como um nicho para bactérias. A bacteriúria assintomática associada a cateter **não deve ser tratada**.",
    why: "[alert:info]Diretriz ISCAID:[/alert] Em pacientes sintomáticos, **remover ou trocar o cateter**, coletar cultura e tratar com um **curso curto (3-5 dias)** de antibióticos.",
    signs: "Diagnóstico por **[bg:yellow-100]urocultura de urina coletada por um novo cateter estéril ou cistocentese[/bg]**. Sinais clínicos incluem febre, disúria, desconforto.",
    adjuncts: "[alert:danger]**NÃO** usar antibióticos como profilaxia durante a cateterização.[/alert] A higiene rigorosa do sistema de coleta fechado é a melhor prevenção."
  },
  "Sepse Neonatal": {
    physio: "Neonatos são vulneráveis devido à **imunidade imatura** e dependência de colostro (**falha de transferência passiva - FPT**). A infecção geralmente se origina do umbigo, trato GI ou respiratório.",
    why: "Antibioticoterapia empírica de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam + Aminoglicosídeo[/bg]**) deve ser iniciada imediatamente após a coleta de amostras.",
    signs: "Sinais inespecíficos: **hipotermia**, letargia, sucção fraca, cianose, hipoglicemia. **[bg:yellow-100]Hemocultura é o padrão-ouro[/bg]** (se viável), hemograma e glicemia são úteis.",
    adjuncts: "[alert:danger]O tratamento de suporte agressivo é tão importante quanto os antibióticos:[/alert] aquecimento, correção de hipoglicemia, fluidos, e tratamento da FPT com plasma ou colostro."
  },
  "Tireoidite Bacteriana": {
    physio: "Infecção rara da glândula tireoide, geralmente de origem **hematogênica** ou por extensão de infecção cervical profunda.",
    why: "Antibioticoterapia prolongada (**4-6 semanas**) com **[bg:green-100]Amoxi-clav[/bg]** ou **[bg:blue-100]Clindamicina[/bg]** para garantir a erradicação no tecido profundo.",
    signs: "Massa cervical dolorosa. **[bg:yellow-100]US/TC e punção para cultura[/bg]** confirmam o diagnóstico. A função tireoidiana geralmente é normal.",
    adjuncts: "**Drenagem** se houver formação de abscesso. A literatura é escassa, e o manejo é baseado em princípios de infecção profunda."
  },
  "Abscesso Retrofaríngeo / Celulite Cervical Profunda": {
    physio: "Comumente causado por **corpos estranhos penetrantes (gravetos)** que inoculam flora oral mista (aeróbios e anaeróbios) nos planos fasciais profundos do pescoço, com risco de disseminação para o mediastino.",
    why: "Requer cobertura para **[color:purple-700]anaeróbios[/color]**. **[bg:blue-100]Ampicilina/sulbactam[/bg]** IV é uma excelente escolha inicial. A terapia é prolongada (3-4 semanas).",
    signs: "**[color:red-700]Dor extrema ao abrir a boca ou palpar o pescoço[/color]**, disfagia, febre. **[bg:yellow-100]TC é ideal[/bg]** para localizar a coleção e o corpo estranho.",
    adjuncts: "[alert:danger]A **remoção do corpo estranho e a drenagem cirúrgica** são cruciais para a resolução.[/alert] O manejo da via aérea pode ser necessário se houver compressão."
  },
  "Mediastinite / Abscesso Mediastinal": {
    physio: "Infecção grave do mediastino, geralmente por **perfuração esofágica** (corpo estranho) ou extensão de infecção cervical. O mediastino tem poucas barreiras, facilitando a disseminação.",
    why: "Antibioticoterapia IV de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam + Metronidazol[/bg]**) e terapia prolongada (**4-6 semanas**).",
    signs: "Febre, taquipneia, dor torácica, efusão pleural/mediastinal. **[bg:yellow-100]TC de tórax é a imagem de escolha[/bg]** para delimitar a coleção.",
    adjuncts: "[alert:danger]**Controle cirúrgico da fonte** (reparo da perfuração, drenagem do abscesso) é o pilar do tratamento.[/alert] Suporte nutricional (sonda de esofagostomia) é frequentemente necessário."
  },
  "Onfalite / Onfaloflebite Neonatal": {
    physio: "Infecção do coto umbilical (onfalite) que pode se estender para os vasos umbilicais (onfaloflebite), com risco de **abscessos hepáticos e sepse**.",
    why: "Antibioticoterapia de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam + Aminoglicosídeo[/bg]**) para cobrir flora mista (pele, entéricos). A duração varia com a profundidade (10-14 dias para superficial, 3-4 semanas para profunda).",
    signs: "Coto umbilical quente, edemaciado, com secreção purulenta; febre, letargia. **[bg:yellow-100]US abdominal é essencial[/bg]** para avaliar a extensão vascular.",
    adjuncts: "Suporte neonatal agressivo (aquecimento, fluidos, glicose) e tratamento da **falha de transferência passiva (FPT)**."
  },
  "Abscesso de Músculo Iliopsoas / Hipaxiais": {
    physio: "Frequentemente causado por **corpos estranhos vegetais migratórios (espiguetas)** que carregam flora polimicrobiana e criam um foco de infecção profunda.",
    why: "A terapia com antibióticos (**[bg:blue-100]Ampicilina/sulbactam[/bg]**) é adjuvante. [alert:danger]A **remoção cirúrgica do corpo estranho** é a chave para a cura; sem ela, a recidiva é a regra.[/alert]",
    signs: "Claudicação, dor na região lombo-pélvica, febre. **[bg:yellow-100]TC é a melhor modalidade de imagem[/bg]** para localizar a coleção e a espigueta.",
    adjuncts: "Drenagem cirúrgica do abscesso junto com a remoção do corpo estranho."
  },
  "Abscesso Esplênico": {
    physio: "Infecção rara, geralmente de origem **hematogênica** (bacteremia de outro foco, como endocardite) ou por extensão de peritonite.",
    why: "Antibioticoterapia de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam ± Metronidazol[/bg]**), mas [alert:danger]a **esplenectomia é geralmente curativa** e necessária para o controle do foco.[/alert]",
    signs: "Febre, letargia, dor abdominal. **[bg:yellow-100]US/TC abdominal mostra massa cística/complexa[/bg]**. O diagnóstico definitivo é muitas vezes intraoperatório.",
    adjuncts: "Investigar e tratar o foco primário da bacteremia. Diferenciar de neoplasias como hemangiossarcoma pode ser um desafio."
  },
  "Piómetra de Coto Uterino (\"Stump Pyometra\")": {
    physio: "Infecção do coto uterino remanescente sob **estímulo de progesterona** (de tecido ovariano remanescente). O agente mais comum é **[color:rose-700]E. coli[/color]**.",
    why: "Antibióticos são perioperatórios para tratar a sepse. [alert:danger]O tratamento definitivo **NÃO** é o antibiótico, mas sim a **remoção cirúrgica do coto infectado e do ovário remanescente**.[/alert]",
    signs: "Corrimento vaginal purulento em uma fêmea castrada, letargia, PU/PD. **[bg:yellow-100]US abdominal confirma o diagnóstico[/bg]**.",
    adjuncts: "Estabilização pré-operatória e cirurgia são os pilares. A antibioticoterapia sem cirurgia levará à recidiva."
  },
  "ICSRC / CRBSI — Infecção de Corrente Sanguínea Relacionada a Cateter (venoso)": {
    physio: "Bacteremia originada da colonização da ponta de um cateter venoso (CVC ou periférico) por **[color:purple-700]biofilme[/color]**. A flora cutânea (Staphylococcus) é a mais comum.",
    why: "O tratamento requer antibióticos sistêmicos (**[bg:blue-100]Ampicilina/sulbactam[/bg]** ou similar) e, crucialmente, a **remoção do cateter infectado**. A duração é de 7-14 dias após a primeira hemocultura negativa.",
    signs: "Febre, flebite no sítio do cateter, secreção purulenta. Diagnóstico por **[bg:yellow-100]hemoculturas pareadas (cateter e periférica) e cultura da ponta do cateter[/bg]**.",
    adjuncts: "[alert:danger]**NÃO** tentar 'salvar' o cateter em um paciente com choque séptico.[/alert] A prevenção através de técnica asséptica e protocolos de manutenção é fundamental."
  },
  "VAP / Pneumonia Associada à Ventilação (e Pneumonia nosocomial)": {
    physio: "Pneumonia que se desenvolve ≥48h após intubação. A intubação bypassa as defesas das vias aéreas superiores, e o biofilme no tubo endotraqueal serve como reservatório. Os patógenos são frequentemente **[color:red-700]multirresistentes[/color]** (Pseudomonas, Enterobacterales).",
    why: "Iniciar antibioticoterapia de amplo espectro (**[bg:blue-100]Piperacilina/tazobactam[/bg]** ou **[bg:blue-100]Meropenem[/bg]**) após a coleta de amostras e **[bg:green-100]descalonar[/bg]** com base na cultura.",
    signs: "Nova febre, piora da hipoxemia, secreção traqueal purulenta, novos infiltrados na radiografia. Diagnóstico por **[bg:yellow-100]lavado broncoalveolar com cultura quantitativa[/bg]**.",
    adjuncts: "Higiene brônquica, elevação da cabeça, e protocolos de desmame da ventilação são medidas preventivas importantes."
  },
  "Bursite Séptica": {
    physio: "Infecção de uma bursa sinovial (ex: olécrano) por **trauma repetitivo ou ferida penetrante**. Os agentes mais comuns são **Staphylococcus spp.**.",
    why: "Tratamento com **[bg:green-100]Amoxi-clav[/bg]** ou **[bg:blue-100]Cefalexina[/bg]**. A duração é de 10-14 dias.",
    signs: "Tumefação flutuante, dolorosa e quente sobre uma proeminência óssea. **[bg:yellow-100]Aspiração do líquido bursal para citologia e cultura[/bg]** confirma o diagnóstico.",
    adjuncts: "**Aspirações seriadas ou drenagem** são importantes para a resolução. [alert:warning]Evitar injeções de corticoide se houver suspeita de infecção.[/alert]"
  },
  "Abscesso Retroperitoneal (não-muscular)": {
    physio: "Coleção purulenta no espaço retroperitoneal, geralmente por **perfuração GI, ruptura do trato urinário ou corpo estranho migratório**. A flora é polimicrobiana.",
    why: "Requer antibioticoterapia de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam + Metronidazol[/bg]**) e terapia prolongada (**3-4 semanas**).",
    signs: "Dor lombar, febre, anorexia. **[bg:yellow-100]TC abdominal é a melhor imagem[/bg]** para delimitar a coleção e identificar a origem.",
    adjuncts: "[alert:danger]**Controle da fonte** (cirurgia para reparar perfuração, drenagem do abscesso) é essencial para a cura.[/alert]"
  },
  "Pileflebitite Séptica (Trombose Séptica da Veia Porta)": {
    physio: "Trombose da veia porta secundária a um foco infeccioso abdominal (colangite, enterite, abscesso). O trombo infectado serve como um nicho para bactérias.",
    why: "Antibioticoterapia de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam + Metronidazol[/bg]**) e de longa duração (**4-6 semanas**).",
    signs: "Febre, dor abdominal, icterícia. **[bg:yellow-100]US Doppler ou angio-TC confirmam o trombo[/bg]**. Hemoculturas podem ser positivas.",
    adjuncts: "Tratamento do foco primário e **anticoagulação** (avaliar caso a caso). O prognóstico é reservado."
  },
  "Estomatite Necrosante Bacteriana": {
    physio: "Infecção necrosante da mucosa oral, análoga à GUNA humana, dominada por **[color:purple-700]anaeróbios estritos[/color]** (Fusobacterium, Prevotella).",
    why: "Requer excelente cobertura anaeróbia. Um esquema com **[bg:green-100]Amoxi-clav + Metronidazol[/bg]** é uma boa escolha. Duração de 10-14 dias.",
    signs: "Dor oral intensa, halitose fétida, úlceras necróticas na gengiva. O diagnóstico é clínico.",
    adjuncts: "Debridamento suave, higiene oral (clorexidina), analgesia e tratamento de qualquer doença periodontal subjacente."
  },
  "Paroníquia / Abscesso Digital (inclui furunculose interdigital)": {
    physio: "Infecção do leito ungueal ou do espaço interdigital, frequentemente por **trauma, umidade ou corpo estranho**. O agente principal é **Staphylococcus pseudintermedius**.",
    why: "Tratamento com **[bg:green-100]Amoxi-clav[/bg]** ou **[bg:blue-100]Cefalexina[/bg]** por 10-14 dias.",
    signs: "Claudicação, lambedura compulsiva, dor, secreção. A **citologia** confirma a infecção bacteriana.",
    adjuncts: "Drenagem do abscesso, remoção de corpo estranho e manutenção da área limpa e seca são importantes."
  },
  "Infecção de Fratura Exposta (sem implante)": {
    physio: "Contaminação da fratura com flora do ambiente (solo, água) ou da pele, com alto risco de desenvolvimento de **osteomielite** e **[color:purple-700]biofilme[/color]**.",
    why: "Antibioticoterapia IV precoce e de amplo espectro (**[bg:blue-100]Ampicilina/sulbactam[/bg]** ou **[bg:blue-100]Cefazolina[/bg]**), seguida por terapia oral prolongada (**4-6 semanas**).",
    signs: "Diagnóstico baseado na exposição óssea. Coletar **[bg:yellow-100]cultura de tecido profundo[/bg]** durante o desbridamento.",
    adjuncts: "[alert:danger]**Desbridamento cirúrgico agressivo, lavagem copiosa e estabilização da fratura** são os pilares do tratamento e mais importantes que apenas o antibiótico.[/alert]"
  },
  "Dermatite de Dobras (Intertrigo)": {
    physio: "Maceração e fricção em dobras cutâneas (faciais, caudais, vulvares) criam um ambiente úmido que favorece o **supercrescimento de bactérias (Staphylococcus)** e leveduras (Malassezia).",
    why: "[alert:info]A terapia **tópica** é a primeira linha.[/alert] Antibióticos sistêmicos (ex: **Cefalexina**) são reservados para casos com foliculite/celulite profunda.",
    signs: "Odor, eritema, exsudato na dobra. **[bg:yellow-100]Citologia por fita de acetato[/bg]** é diagnóstica.",
    adjuncts: "Higiene diária com **lenços de clorexidina** e manutenção da área seca. Em casos graves ou recorrentes (ex: cauda em parafuso), a **correção cirúrgica (queiloplastia, caudectomia)** é curativa."
  },
  "Dermatite Piotraumática (\"Hot Spot\")": {
    physio: "Lesão aguda, úmida e exsudativa causada por **autotrauma intenso**, geralmente sobre um gatilho de prurido ou dor (alergia, otite, dor articular).",
    why: "Antibióticos sistêmicos **NÃO** são indicados se a infecção for superficial. O tratamento é local.",
    signs: "Placa eritematosa, úmida, bem demarcada e muito dolorosa. O diagnóstico é clínico.",
    adjuncts: "[alert:danger]Pilares do tratamento:[/alert] **1) Tosa ampla** da lesão e área adjacente. **2) Limpeza** com antisséptico. **3) Corticoide de curta ação** (tópico ou sistêmico) para quebrar o ciclo de prurido. **4) Identificar e tratar a causa de base**."
  },
  "Acne Felina (com sobreinfecção)": {
    physio: "Distúrbio de queratinização dos folículos pilosos do mento, levando à formação de **comedões ('cravos')**. A infecção bacteriana (foliculite/furunculose) é secundária.",
    why: "A terapia sistêmica (**[bg:blue-100]Clindamicina[/bg]**) é reservada para casos com furunculose. A maioria dos casos responde à terapia tópica.",
    signs: "Comedões, pápulas e pústulas no queixo. A **[bg:yellow-100]citologia[/bg]** confirma a presença de infecção.",
    adjuncts: "Higiene local com **clorexidina**. Trocar comedouros de plástico por cerâmica ou metal pode ajudar. Investigar causas de base (alergias)."
  },
  "Sinusite Odontogênica (PM4 superior)": {
    physio: "Abscesso na raiz do **quarto pré-molar superior** que drena para o seio maxilar, causando descarga nasal purulenta e unilateral.",
    why: "[alert:danger]O antibiótico (**Amoxi-clav**, **Clindamicina**) é apenas um **adjuvante**.[/alert] Não é curativo. A resolução requer tratamento dentário.",
    signs: "Descarga nasal purulenta unilateral, edema facial abaixo do olho. **[bg:yellow-100]Radiografia intraoral ou TC[/bg]** confirma o abscesso periapical.",
    adjuncts: "O tratamento definitivo é a **extração do dente afetado** ou terapia de canal radicular."
  },
  "Úlcera de Decúbito Infectada": {
    physio: "Necrose isquêmica da pele sobre proeminências ósseas devido à pressão prolongada. A infecção (celulite, osteomielite) é uma complicação.",
    why: "Antibióticos sistêmicos (**[bg:green-100]Amoxi-clav[/bg]**) são indicados apenas quando há evidência de infecção profunda (celulite).",
    signs: "Diagnóstico clínico. A **[bg:yellow-100]cultura de tecido profundo[/bg]** (não do exsudato) é indicada se houver suspeita de osteomielite.",
    adjuncts: "[alert:danger]O pilar do tratamento é o **manejo da ferida**:[/alert] alívio da pressão (colchões especiais, mudança de decúbito), desbridamento de tecido necrótico e curativos adequados."
  },
  "Conjuntivite por Chlamydia felis": {
    physio: "Infecção pela bactéria intracelular Chlamydia felis, causando **conjuntivite folicular intensa**, quemose e secreção mucopurulenta.",
    why: "O tratamento de escolha é **[bg:green-100]Doxiciclina oral por 4 semanas[/bg]**. Cursos mais curtos podem levar à recidiva.",
    signs: "Diagnóstico por **[bg:yellow-100]PCR de suabe conjuntival[/bg]**. A resposta terapêutica à doxiciclina também é sugestiva.",
    adjuncts: "[alert:danger]Tratar **TODOS** os gatos em contato.[/alert] Administrar doxiciclina em comprimido com um pouco de água ou alimento para prevenir o risco de esofagite."
  },
  "Bronquiectasia (exacerbação infecciosa)": {
    physio: "Dilatação brônquica irreversível que leva à estase de muco e disfunção mucociliar, resultando em **infecções bacterianas recorrentes**.",
    why: "Antibióticos (**[bg:green-100]Doxiciclina[/bg]** ou **[bg:green-100]Amoxi-clav[/bg]**) são usados para tratar **exacerbações agudas**, idealmente guiados por cultura.",
    signs: "Tosse crônica produtiva. **[bg:yellow-100]TC de tórax é o padrão-ouro para o diagnóstico[/bg]**. Cultura de lavado broncoalveolar identifica o patógeno.",
    adjuncts: "[alert:warning]**NÃO** usar antibióticos cronicamente.[/alert] Fisioterapia respiratória (nebulização, coupage) e broncodilatadores são adjuvantes importantes."
  },
  "Piodermite por Staphylococcus pseudintermedius Resistente à Meticilina (MRSP)": {
    physio: "Infecção de pele por cepas de Staphylococcus que adquiriram resistência a todos os antibióticos beta-lactâmicos (penicilinas, cefalosporinas).",
    why: "[alert:danger]**CULTURA E ANTIBIOGRAMA SÃO OBRIGATÓRIOS**.[/alert] O tratamento sistêmico deve ser **estritamente guiado pelo resultado da cultura**. Nunca usar quinolonas empiricamente.",
    signs: "Piodermite que não responde à terapia empírica padrão (cefalexina, amoxi-clav).",
    adjuncts: "[alert:info]Priorizar **terapia tópica com clorexidina 2-4%** sempre que possível.[/alert] O controle da doença de base (alergia) é fundamental para prevenir recidivas."
  }
};

export const NAME_ALIASES: { [key: string]: string } = {
  // Amoxicilina + Clavulanato variations
  'Amoxicilina-clavulanato': 'Amoxicilina + Clavulanato',
  'Amoxi-Clav': 'Amoxicilina + Clavulanato',
  'Amox Clav': 'Amoxicilina + Clavulanato',
  'Amoxi/Clav': 'Amoxicilina + Clavulanato',
  'Amoxicilina/Clavulanato': 'Amoxicilina + Clavulanato',
  'Amoxicilina-Clavulanato': 'Amoxicilina + Clavulanato',
  
  // Beta-lactam IV drugs
  'Cefazolina': 'Cefazolina (IV)',
  'Ampicilina': 'Ampicilina (IV)',
  
  // Piperacilina + Tazobactam variations
  'Piperacilina-tazobactam': 'Piperacilina + Tazobactam (IV)',
  'Piperacilina + Tazobactam': 'Piperacilina + Tazobactam (IV)',
  'Pip/Tazo': 'Piperacilina + Tazobactam (IV)',
  'Piperacilina/Tazobactam': 'Piperacilina + Tazobactam (IV)',
  
  // Ticarcilina variations
  'Ticarcilina-Clavulanato': 'Ticarcilina + Clavulanato (Tópico/IV)',
  'Ticarcilina/Clavulanato': 'Ticarcilina + Clavulanato (Tópico/IV)',
  
  // Fluoroquinolonas abbreviations
  'Cipro': 'Ciprofloxacina',
  'Enro': 'Enrofloxacina',
  'Marbo': 'Marbofloxacina',
  'Marboflox': 'Marbofloxacina',
  'Marbofloxacina': 'Marbofloxacina',
  'Enrofloxacina': 'Enrofloxacina',
  
  // Sulfonamidas variations
  'TMP-SMX': 'Trimetoprim + Sulfa',
  'TMP/SMX': 'Trimetoprim + Sulfa',
  'TMS': 'Trimetoprim + Sulfa',
  'Trimetoprim-Sulfonamida': 'Trimetoprim + Sulfa',
  'Trimetoprim + Sulfa': 'Trimetoprim + Sulfa',
  'Trimetoprim/Sulfa': 'Trimetoprim + Sulfa',
  'Sulfa': 'Trimetoprim + Sulfa',
  
  // Aminoglicosídeos
  'Gentamicina': 'Gentamicina (parenteral)',
  'Genta': 'Gentamicina (parenteral)',
  'Amicacina': 'Amicacina (parenteral)',
  'Tobramicina': 'Tobramicina',
  
  // Ampicilina + Sulbactam variations
  'Ampicilina/Sulbactam': 'Ampicilina + Sulbactam',
  'Ampi/Sulba': 'Ampicilina + Sulbactam',
  'Ampicilina + Sulbactam': 'Ampicilina + Sulbactam',
  'Ampicilina-Sulbactam': 'Ampicilina + Sulbactam',
  'Sulbactam': 'Ampicilina + Sulbactam',
  
  // Lincosamidas
  'Clindamicina': 'Clindamicina',
  'Clinda': 'Clindamicina',
  
  // Tetraciclinas
  'Doxiciclina': 'Doxiciclina',
  'Doxi': 'Doxiciclina',
  'Minociclina': 'Minociclina',
  'Oxitetraciclina': 'Oxitetraciclina',
  
  // Anaeróbios
  'Metronidazol': 'Metronidazol',
  'Metro': 'Metronidazol',
  
  // Macrolídeos
  'Azitromicina': 'Azitromicina',
  'Tilosina': 'Tilosina',
  
  // Cefalosporinas
  'Cefpodoxima': 'Cefpodoxima',
  'Cefalexina': 'Cefalexina',
  'Ceftriaxona': 'Ceftriaxona (IV)',
  'Ceftriaxona (IV)': 'Ceftriaxona (IV)',
  'Cefovecina': 'Cefovecina (Convenia®)',
  'Convenia': 'Cefovecina (Convenia®)',
  
  // Aliases específicos para os antibióticos mencionados
  'Cefalexina 22–30 mg/kg VO q8–12h por 14–21d': 'Cefalexina',
  'Amoxicilina/Clavulanato 12,5–25 mg/kg VO q12h': 'Amoxicilina + Clavulanato',
  'Cefpodoxima 5–10 mg/kg VO q24h': 'Cefpodoxima',
  'Clindamicina 5,5–10 mg/kg VO q12h': 'Clindamicina',
  
  // Anfenicóis  
  'Cloranfenicol': 'Cloranfenicol',
  'Florfenicol': 'Florfenicol',
  
  // Carbapenêmicos
  'Meropenem': 'Meropenem',
  'Imipenem-Cilastatina': 'Imipenem + Cilastatina',
  'Imipenem/Cilastatina': 'Imipenem + Cilastatina',
  
  // Others
  'Penicilina G': 'Penicilina G',
  'Cefoxitina': 'Cefoxitina',
  'Neomicina': 'Neomicina',
  'Atovaquona': 'Atovaquona',
  'Pirimetamina': 'Pirimetamina',
  'Decoquinato': 'Decoquinato',
  'Omeprazol': 'Omeprazol',
  'Ciclosporina': 'Ciclosporina',
  'Ciclosporina A': 'Ciclosporina',
  'Rifampicina': 'Rifampicina',
  'Rifampicina (IV)': 'Rifampicina',
  'Rifampicina (VO)': 'Rifampicina',
  'Fosfomicina': 'Fosfomicina',
  'Fosfomicina (IV)': 'Fosfomicina',
  'Fosfomicina (VO)': 'Fosfomicina',
  'Vancomicina': 'Vancomicina',
  'Vancomicina (IV)': 'Vancomicina',
  'Teicoplanina': 'Teicoplanina',
  'Teicoplanina (IV)': 'Teicoplanina',
  'Linezolida': 'Linezolida',
  'Linezolida (IV)': 'Linezolida',
  'Linezolida (VO)': 'Linezolida',
  'Daptomicina': 'Daptomicina',
  'Daptomicina (IV)': 'Daptomicina',
  'Tigeciclina': 'Tigeciclina',
  'Tigeciclina (IV)': 'Tigeciclina',
  'Colistina': 'Colistina',
  'Colistina (IV)': 'Colistina',
  'Colistina (VO)': 'Colistina',
  'Polimixina B': 'Polimixina B',
  'Polimixina B (IV)': 'Polimixina B',
  'Polimixina B (Tópico)': 'Polimixina B',
  'Bacitracina': 'Bacitracina',
  'Bacitracina (Tópico)': 'Bacitracina',
  'Ácido Fusídico': 'Ácido Fusídico',
  'Ácido Fusídico (Tópico)': 'Ácido Fusídico',
  'Ofloxacina': 'Ofloxacina',
  'Ofloxacina (Tópico)': 'Ofloxacina',
  'Ciprofloxacina': 'Ciprofloxacina',
  'Ciprofloxacina (Tópico)': 'Ciprofloxacina',
  'Norfloxacina': 'Norfloxacina',
  'Norfloxacina (Tópico)': 'Norfloxacina',
  'Levofloxacina': 'Levofloxacina',
  'Levofloxacina (Tópico)': 'Levofloxacina',
  'Moxifloxacina': 'Moxifloxacina',
  'Moxifloxacina (Tópico)': 'Moxifloxacina',
  'Eritromicina': 'Eritromicina',
  'Eritromicina (Tópico)': 'Eritromicina',
  'Roxitromicina': 'Roxitromicina',
  'Roxitromicina (Tópico)': 'Roxitromicina',
  'Espiramicina': 'Espiramicina',
  'Espiramicina (Tópico)': 'Espiramicina',
  'Tilmicosina': 'Tilmicosina',
  'Tilmicosina (Tópico)': 'Tilmicosina',
  'Gamitromicina': 'Gamitromicina',
  'Gamitromicina (Tópico)': 'Gamitromicina',
  'Tulatromicina': 'Tulatromicina',
  'Tulatromicina (Tópico)': 'Tulatromicina',
  'Tacrolimus': 'Tacrolimus',
  // Aliases adicionais para melhorar associação (apenas os que não existem)
  'Amox+Clav': 'Amoxicilina + Clavulanato',
  'Amoxi Clav': 'Amoxicilina + Clavulanato',
  'Ampi': 'Ampicilina (IV)',
  'Ampi+Sulba': 'Ampicilina + Sulbactam',
  'Ampi Sulba': 'Ampicilina + Sulbactam',
  'Ampicilina Sódica': 'Ampicilina (IV)',
  'Ampicilina Sodica': 'Ampicilina (IV)',
  'Pip+Tazo': 'Piperacilina + Tazobactam (IV)',
  'Pip Tazo': 'Piperacilina + Tazobactam (IV)',
  'Enroflox': 'Enrofloxacina',
  'Imipinem + Cilastatina': 'Imipenem + Cilastatina',
  'Imipinem-Cilastatina': 'Imipenem + Cilastatina',
  'Trimetropim + Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Trimetropim/Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Trimetropim-Sulfametoxazol': 'Trimetoprim + Sulfa',
  'Doxicic': 'Doxiciclina',
  'Clindamic': 'Clindamicina',
  'Metronid': 'Metronidazol',
  'Azitro': 'Azitromicina',
  'Azitromic': 'Azitromicina',
  'Cefalex': 'Cefalexina',
  'Cefpodo': 'Cefpodoxima',
  'Cefpodox': 'Cefpodoxima',
  'Cefaz': 'Cefazolina (IV)',
  'Ceftriax': 'Ceftriaxona (IV)',
  'Tobra': 'Tobramicina',
  'Tobramic': 'Tobramicina',
  'Cloram': 'Cloranfenicol',
  'Cloranfen': 'Cloranfenicol',
  'Tilos': 'Tilosina',
  'Oxitetra': 'Oxitetraciclina',
  'Oxitetracic': 'Oxitetraciclina',
  'Prado': 'Pradofloxacina',
  'Pradoflox': 'Pradofloxacina',
  'Minocic': 'Minociclina',
  'Claritro': 'Claritromicina',
  'Claritromic': 'Claritromicina',
  'Tetra': 'Tetraciclina',
  'Tetracic': 'Tetraciclina',
  'Pen G': 'Penicilina G',
  'Mero': 'Meropenem',
  'Meropen': 'Meropenem',
  'Imipenem': 'Imipenem-Cilastatina',
  'Cefox': 'Cefoxitina',
  'Amica': 'Amicacina',
  'Amicac': 'Amicacina',
  'Gent': 'Gentamicina (parenteral)',
  'Gentamic': 'Gentamicina (parenteral)',
  'Estrepto': 'Estreptomicina',
  'Estreptomic': 'Estreptomicina',
  'Neo': 'Neomicina',
  'Neomic': 'Neomicina',
  'Atova': 'Atovaquona',
  'Atovaqu': 'Atovaquona',
  'Pirimet': 'Pirimetamina',
  'Pirimetam': 'Pirimetamina',
  'Decoqui': 'Decoquinato',
  'Decoquin': 'Decoquinato',
  'Ome': 'Omeprazol',
  'Omepra': 'Omeprazol',
  'Ciclo': 'Ciclosporina',
  'Ciclospor': 'Ciclosporina',
  'Rifam': 'Rifampicina',
  'Rifampic': 'Rifampicina',
  'Fosfo': 'Fosfomicina',
  'Fosfomic': 'Fosfomicina',
  'Vanco': 'Vancomicina',
  'Vancomic': 'Vancomicina',
  'Teico': 'Teicoplanina',
  'Teicoplan': 'Teicoplanina',
  'Linez': 'Linezolida',
  'Linezol': 'Linezolida',
  'Dapto': 'Daptomicina',
  'Daptomic': 'Daptomicina',
  'Tige': 'Tigeciclina',
  'Tigecic': 'Tigeciclina',
  'Colist': 'Colistina',
  'Polimix': 'Polimixina B',
  'Bacitrac': 'Bacitracina',
  'Fusídico': 'Ácido Fusídico',
  'Oflox': 'Ofloxacina',
  'Ofloxac': 'Ofloxacina',
  'Ciproflox': 'Ciprofloxacina',
  'Norflox': 'Norfloxacina',
  'Norfloxac': 'Norfloxacina',
  'Levoflox': 'Levofloxacina',
  'Levofloxac': 'Levofloxacina',
  'Moxiflox': 'Moxifloxacina',
  'Moxifloxac': 'Moxifloxacina',
  'Eritro': 'Eritromicina',
  'Eritromic': 'Eritromicina',
  'Roxitro': 'Roxitromicina',
  'Roxitromic': 'Roxitromicina',
  'Espira': 'Espiramicina',
  'Espiramic': 'Espiramicina',
  'Tilmi': 'Tilmicosina',
  'Tilmic': 'Tilmicosina',
  'Gamitro': 'Gamitromicina',
  'Gamitromic': 'Gamitromicina',
  'Tulat': 'Tulatromicina',
  'Tulatromic': 'Tulatromicina',
  'Tacrol': 'Tacrolimus',
  // Aliases adicionais para resolver problemas de normalização
  'amoxi + clav': 'Amoxicilina + Clavulanato',
  'amoxi clav': 'Amoxicilina + Clavulanato',
  'amox clav': 'Amoxicilina + Clavulanato',
  'ampi + sulba': 'Ampicilina + Sulbactam',
  'ampi sulba': 'Ampicilina + Sulbactam',
  'pip + tazo': 'Piperacilina + Tazobactam (IV)',
  'pip tazo': 'Piperacilina + Tazobactam (IV)',
  'trimetoprim + sulfa': 'Trimetoprim + Sulfa',
  'trimetoprim sulfa': 'Trimetoprim + Sulfa',
  'tmp + sulfa': 'Trimetoprim + Sulfa',
  'tmp sulfa': 'Trimetoprim + Sulfa',
  'tms + sulfa': 'Trimetoprim + Sulfa',
  'tms sulfa': 'Trimetoprim + Sulfa'
};

export const DISEASE_ALIASES: { [key: string]: string } = {
  'piotorax': 'Piotórax',
  'colangite neutrofilica': 'Colangite Neutrofílica (Felina)',
  'uti esporadica': 'Cistite Bacteriana Esporádica (ITU)',
  'uti esporádica': 'Cistite Bacteriana Esporádica (ITU)',
  'gastroenterite hemorragica': 'Gastroenterite Hemorrágica (com sepse)',
  'gastroenterite hemorrágica': 'Gastroenterite Hemorrágica (com sepse)',
  'cric': 'Complexo Respiratório Infeccioso Canino (CRIC; "Tosse dos Canis")',
  'tosse dos canis': 'Complexo Respiratório Infeccioso Canino (CRIC; "Tosse dos Canis")',
  'colite do boxer': 'Colite Ulcerativa Histiocítica (Associada a E. coli)'
};


export const CLASS_STYLE: { [key: string]: ClassStyle } = {
  penicilina: {emoji:'🧪', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.5)'},
  cefalosporina: {emoji:'🧫', bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.5)'},
  carbapenemico: {emoji:'🟣', bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.5)'},
  fluoro: {emoji:'🔵', bg:'rgba(30,64,175,0.12)', border:'rgba(30,64,175,0.5)'},
  lincosamida: {emoji:'🟩', bg:'rgba(5,150,105,0.12)', border:'rgba(5,150,105,0.5)'},
  tetraciclina: {emoji:'🟥', bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.5)'},
  aminoglico: {emoji:'🟧', bg:'rgba(234,88,12,0.12)', border:'rgba(234,88,12,0.5)'},
  nitro: {emoji:'⚙️', bg:'rgba(107,114,128,0.12)', border:'rgba(107,114,128,0.5)'},
  sulfa: {emoji:'🌸', bg:'rgba(236,72,153,0.12)', border:'rgba(236,72,153,0.5)'},
  macrolideo: {emoji:'🟠', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.5)'},
  anfenicol: {emoji:'👁️', bg:'rgba(100,116,139,0.12)', border:'rgba(100,116,139,0.5)'},
  glicopeptideo: {emoji:'⚕️', bg:'rgba(217, 70, 239, 0.12)', border:'rgba(217, 70, 239, 0.5)'},
  rifamicina: {emoji:'🧯', bg:'rgba(220, 38, 38, 0.12)', border:'rgba(220, 38, 38, 0.5)'},
  fosfonato: {emoji:'💧', bg:'rgba(14, 165, 233, 0.12)', border:'rgba(14, 165, 233, 0.5)'},
  imunossupressor: {emoji:'🛡️', bg:'rgba(168, 85, 247, 0.12)', border:'rgba(168, 85, 247, 0.5)'}
};

export const LIFE_STAGES: { [key in LifeStageKey]: LifeStage } = {
    filhote: {
      label:'Filhote', 
      warn:'⚠️ Fluoroquinolonas (risco de artropatia) e Tetraciclinas (manchas nos dentes) são contraindicadas.',
      warn_why: 'Artropatia por Fluoroquinolonas: O mecanismo proposto envolve a quelação de íons de magnésio na cartilagem, o que interfere na função das integrinas na superfície dos condrócitos. Essa disfunção prejudica a adesão celular, induz a apoptose (morte celular programada) e leva à degradação da matriz cartilaginosa, resultando em danos articulares permanentes.\n\nManchas por Tetraciclinas: As tetraciclinas quelam o cálcio e são depositadas de forma irreversível nos ossos e dentes em desenvolvimento (dentina e esmalte), causando uma coloração permanente (amarelo-marrom) e hipoplasia do esmalte.'
    },
    adulto: {label:'Adulto'},
    gestante: {
      label:'Gestante', 
      warn:'⚠️ Evitar Fluoroquinolonas, Tetraciclinas, Aminoglicosídeos e Metronidazol.',
      warn_why: 'O primeiro trimestre (organogênese) é o de maior risco para efeitos teratogênicos. Fármacos lipossolúveis e de baixo peso molecular atravessam a placenta mais facilmente. Beta-lactâmicos, macrolídeos e lincosamidas são geralmente considerados seguros.'
    },
    lactante: {
      label:'Lactante', 
      warn:'⚠️ Evitar Fluoroquinolonas e Tetraciclinas.',
      warn_why: 'Fármacos podem ser excretados no leite. Embora a dose transferida seja pequena, os sistemas metabólicos imaturos do neonato podem levar ao acúmulo. A segurança para a mãe e o filhote é crucial. Amoxicilina, amoxi-clav e cefalexina são consideradas seguras.'
    },
    idoso: {
      label:'Idoso', 
      warn:'ℹ️ Iniciar na ponta baixa do intervalo; considerar função renal/hepática.',
      warn_why: 'Animais geriátricos frequentemente apresentam um declínio gradual da função orgânica (depuração renal, capacidade metabólica hepática), alterando o manejo dos fármacos. Uma abordagem de "começar com dose baixa e progredir lentamente" é prudente.'
    }
  };

export const COMORB_HELP_TEXT = `##Ajuste em Insuficiência Renal##
-- [bg:yellow-100]Estratégia:[/bg] Para fármacos com eliminação renal (beta-lactâmicos, cefalosporinas, TMS), prefira manter a dose (mg/kg) e **estender o intervalo** (ex: q8h → q12-24h). Isso é adequado para fármacos tempo-dependentes com ampla margem de segurança.
-- [bg:red-100]Evitar:[/bg] **Aminoglicosídeos** são diretamente nefrotóxicos. Se o uso for inevitável, opte por dose única diária, garanta hidratação adequada e monitore a função renal (creatinina, urinálise seriada).

##Ajuste em Insuficiência Hepática##
-- [bg:yellow-100]Estratégia:[/bg] Inicie com a dose mais baixa do intervalo para fármacos com metabolismo hepático (clindamicina, doxiciclina, macrolídeos, metronidazol) e considere ampliar o intervalo.
-- [bg:red-100]Alerta:[/bg] Sinais neurológicos com metronidazol sugerem toxicidade e requerem suspensão ou redução da dose.

##Ajuste no Paciente Séptico##
-- [bg:yellow-100]Farmacocinética Alterada:[/bg] A sepse causa vasodilatação e extravasamento de fluidos, aumentando o volume de distribuição (Vd) de fármacos hidrofílicos. A ressuscitação com fluidos agrava essa diluição.
-- [bg:green-100]Estratégia:[/bg] Para beta-lactâmicos e aminoglicosídeos (hidrofílicos), considere uma **dose de ataque (~1.25-1.5x a dose padrão)** para atingir rapidamente concentrações terapêuticas. A **infusão contínua (CRI)** para beta-lactâmicos também é uma excelente estratégia para otimizar o parâmetro T>MIC. Reavaliar sempre com cultura e antibiograma.

##Ajuste no Cardiopata##
-- [bg:yellow-100]Estratégia:[/bg] Cuidado com o balanço hídrico e sobrecarga de sódio/potássio de preparações IV (e.g., penicilinas sódicas/potássicas, cefazolina sódica).
-- [bg:red-100]Alerta:[/bg] Alguns fármacos podem afetar a pressão arterial ou ter efeitos arritmogênicos (e.g., certas fluoroquinolonas). A avaliação de interações medicamentosas com a terapia cardíaca em curso é crucial.`;

export const COMORBIDITY_WARNINGS: { [key in keyof ComorbidityState]?: { [key: string]: string } } = {
  renal: {
    aminoglico: "NEFROTÓXICO. Evitar ou usar com extremo cuidado. Requer monitoramento rigoroso e hidratação.",
    glicopeptideo: "NEFROTÓXICO. Usar com extremo cuidado e monitoramento.",
    sulfa: "Risco de precipitação nos túbulos. Garantir hidratação e fluxo urinário. Ajustar intervalo.",
    penicilina: "Eliminação renal. Estender intervalo.",
    cefalosporina: "Eliminação renal. Estender intervalo.",
    carbapenemico: "Eliminação renal. Ajustar dose/intervalo.",
    fosfonato: "Nefrotóxico e fatal em gatos. Não usar em gatos."
  },
  hepatic: {
    anfenicol: "Metabolismo hepático. Risco de toxicidade aumentado. Ajustar dose/intervalo.",
    macrolideo: "Metabolismo hepático. Usar com cautela.",
    lincosamida: "Metabolismo hepático. Usar com cautela.",
    nitro: "Metabolismo hepático. Risco de neurotoxicidade aumentado. Ajustar dose.",
    rifamicina: "HEPATOTÓXICO. Evitar se possível. Monitorar enzimas rigorosamente."
  },
  septic: {
    penicilina: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou Infusão Contínua (CRI) para otimizar T>MIC.",
    cefalosporina: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou CRI.",
    carbapenemico: "Hidrofílico. Considerar dose de ataque (~1.25x) e/ou CRI.",
    aminoglico: "Hidrofílico. Considerar dose de ataque. Sepse já é um fator de risco para Lesão Renal Aguda, monitorar de perto."
  },
  cardiac: {
    fluoro: "Pradofloxacina tem advertência da FDA sobre arritmias em cães. Usar com cautela.",
    penicilina: "Preparações IV sódicas/potássicas (Ampicilina sódica, Penicilina G potássica) podem sobrecarregar pacientes com ICC. Usar com cautela.",
    cefalosporina: "Preparações IV sódicas (Cefazolina sódica) podem sobrecarregar pacientes com ICC."
  },
  neurological: {
    fluoro: "Comorbidade neurológica: cautela com fluoroquinolonas (risco de neuroexcitação); avaliar risco-benefício.",
  },
};