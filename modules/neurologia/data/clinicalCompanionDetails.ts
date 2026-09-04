export type ClinicalCompanionDetail = {
  clinicalLinks?: string[]
  diagnosticPriorities?: string[]
  assessment?: string[]
  monitoring?: string[]
  treatment?: string[]
  allowedDrugs?: string[]
  avoidDrugs?: string[]
  references?: string[]
}

export const CLINICAL_COMPANION_DETAILS: Record<string, ClinicalCompanionDetail> = {
  ddx_001: {
    clinicalLinks: [
      'Epilepsia idiopatica fica mais confortavel quando o exame interictal e realmente normal e a idade de inicio não e geriatrica.',
      'Convulsao de inicio tardio, cegueira central, pares cranianos alterados ou deficits posturais afastam a zona de conforto da epilepsia idiopatica.',
    ],
    diagnosticPriorities: [
      'ALTA | Glicemia, eletrolitos e bioquimica basica | rendimento alto | Estimativa qualitativa | Devem ser normais ou não explicar o quadro para manter epilepsia idiopatica no topo. Espera-se triagem metabólica sem causa suficiente para as crises.',
      'MEDIA | RM e liquor se houver red flags, idade atipica ou exame interictal alterado | rendimento alto | Estimativa qualitativa | Servem para excluir epilepsia estrutural quando o caso foge do padrão classico. Espera-se exame normal na epilepsia idiopatica verdadeira.',
    ],
    assessment: [
      'Confirmar se houve recuperacao completa entre crises e se os deficits visuais, posturais ou de pares cranianos não persistem fora do periodo pos-ictal.',
    ],
    monitoring: [
      'Registrar numero, duração, gatilhos e intervalo entre crises para diferenciar epilepsia intermitente de progressao estrutural.',
    ],
    treatment: [
      'Se o fenotipo for mesmo idiopatico, o objetivo passa a ser controle de crises e educacao do tutor, não investigacao estrutural ampla em toda recaida isolada.',
    ],
    allowedDrugs: [
      'Levetiracetam e uma boa ponte no plantao; a manutenção depende de frequencia das crises e do perfil do paciente.',
    ],
    avoidDrugs: [
      'Evitar rotular como epilepsia idiopatica antes de excluir causas metabolicas e estruturais num paciente geriatrico.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'ACVIM Consensus - Seizure Management in Dogs',
    ],
  },
  ddx_002: {
    clinicalLinks: [
      'Epilepsia estrutural deve ser lida como sindrome de lesao prosencefalica ate localizar a causa: neoplasia, inflamatoria, infecciosa, vascular ou malformativa.',
    ],
    diagnosticPriorities: [
      'ALTA | RM de encefalo com contraste | rendimento alto | Estimativa qualitativa | E o exame que mais muda conduta quando ha crise focal, cegueira central, alteração comportamental ou deficits interictais. Espera-se lesao prosencefalica focal ou multifocal.',
      'ALTA | Pressão arterial, hemograma, bioquimica, glicemia e eletrolitos | rendimento alto | Estimativa qualitativa | Ajudam a separar mimetizadores metabolicos e vascular/metabólico concomitante. Espera-se fatores predisponentes ou exclusao de causas sistemicas.',
    ],
    treatment: [
      'Controlar crises e depois decidir a direcao diagnostica da lesao cerebral; o anticonvulsivante sozinho não resolve a causa de base.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_003: {
    clinicalLinks: [
      'Encefalopatia hepática sobe muito na lista quando o paciente tem hepatopatia, sinais encefalicos flutuantes, crises, colapso ou piora em surtos.',
      'No plantao, o raciocinio precisa procurar precipitantes: constipacao, sangramento gastrointestinal, infeccao, alcalose, hipocalemia, dieta inadequada e desidratacao.',
    ],
    diagnosticPriorities: [
      'ALTA | Bioquimica hepática, ureia, glicemia, eletrolitos, amonia e ácidos biliares quando disponiveis | rendimento alto | Estimativa qualitativa | Confirmam descompensacao hepática e ajudam a explicar a encefalopatia. Espera-se alteracoes hepatobiliares, hiperamonemia ou pistas de insuficiencia funcional.',
      'ALTA | Gasometria, lactato, oximetria e avaliação de perfusão | rendimento moderado-alto | Estimativa qualitativa | Identificam hipoxemia, acidobase e fatores que agravam o SNC. Espera-se disturbios que contribuam para rebaixamento ou crise.',
      'MEDIA | Ultrassom abdominal e investigacao de shunt/hipertensao portal | rendimento moderado | Estimativa qualitativa | Importantes quando a historia sugere insuficiencia hepática ou shunt. Espera-se alteração estrutural hepática ou vascular.',
    ],
    assessment: [
      'Checar se a alteração neurologica flutua com alimentacao, evacuacao, infeccao ou queda do estado geral, porque isso reforca encefalopatia metabólica.',
      'Procurar sinais de aspiração, desidratacao, melena ou distensão abdominal que mudem conduta imediata.',
    ],
    monitoring: [
      'Monitorar mentacao, frequencia de crises, glicemia, potássio, volemia, diurese e tolerancia a lactulose ao longo das primeiras horas.',
    ],
    treatment: [
      'Corrigir precipitantes, proteger via aérea, titular lactulose conforme resposta clínica e evitar agravar desidratacao por excesso de catartico.',
      'Se houver crise, preferir anticonvulsivante com perfil mais amigavel para hepatopata e reavaliar a necessidade de sedação a cada nova dose.',
    ],
    allowedDrugs: [
      'Levetiracetam costuma ser mais confortavel que fenobarbital em hepatopatas.',
      'Lactulose e, quando indicado, antibiotico intestinal entram cedo no plano se o paciente tolera via oral ou enema.',
    ],
    avoidDrugs: [
      'Evitar sedação acumulativa, fenobarbital sem necessidade clara e sobrecarga de fluidos em paciente que tambem seja renopata.',
    ],
    references: [
      'Merck Veterinary Manual - Hepatic Encephalopathy in Small Animals',
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_004: {
    clinicalLinks: [
      'Hipoglicemia precisa ser tratada antes de ser discutida: convulsao, fraqueza, colapso e alteração de consciencia podem se resolver completamente após correção.',
    ],
    diagnosticPriorities: [
      'ALTA | Glicemia imediata e seriada | rendimento muito alto | Estimativa qualitativa | E o exame que mais rapidamente confirma ou afasta a hipotese no plantao. Espera-se hipoglicemia ou grande variacao após suporte.',
      'MEDIA | Perfil hepatico, insulina, imagem abdominal e endocrino conforme contexto | rendimento moderado | Estimativa qualitativa | Servem para buscar insulinoma, hepatopatia ou causa sistêmica da hipoglicemia. Espera-se alteracoes dependentes da etiologia.',
    ],
    monitoring: [
      'Depois do bolus inicial, repetir glicemia em curto intervalo para não perder recorrencia ou hiperglicemia iatrogenica.',
    ],
    treatment: [
      'Corrigir glicose de forma controlada e depois investigar a causa, porque a melhora neurologica pode mascarar o problema de base.',
    ],
    allowedDrugs: [
      'Dextrose titulada e anticonvulsivante se crise persistir apesar da correção glicemica.',
    ],
    avoidDrugs: [
      'Evitar considerar alta apenas porque a crise cessou sem documentar tendência da glicemia e causa provável.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_005: {
    clinicalLinks: [
      'Distúrbio eletrolitico sobe no ranking quando ha tremores, fraqueza, mioclonia, alteração de ECG ou contexto renal/endocrino; sem isso, ele não deve dominar sozinho o caso.',
    ],
    diagnosticPriorities: [
      'ALTA | Sódio, potássio, cálcio ionizado, magnesio e gasometria | rendimento alto | Estimativa qualitativa | Detectam causas trataveis de crise, fraqueza e alteração difusa do SNC. Espera-se disnatremia, hipocalcemia ou hipocalemia clinicamente relevantes.',
      'MEDIA | ECG e monitorização continua durante correção | rendimento moderado | Estimativa qualitativa | Importantes quando potássio ou cálcio estao alterados. Espera-se arritmia ou resposta eletrica a correção.',
    ],
    treatment: [
      'A correção precisa ser guiada por repeticao laboratorial e ECG; a pressa pode ser mais perigosa que a doença.',
    ],
    allowedDrugs: [
      'Reposicao dirigida e monitorizada de cálcio, potássio ou sódio conforme o distúrbio identificado.',
    ],
    avoidDrugs: [
      'Evitar correcoes rapidas de sódio, bolus de cálcio sem ECG e reposicao agressiva de potássio em paciente oliguirico.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_006: {
    clinicalLinks: [
      'Ivermectina e moxidectina costumam produzir ataxia, midriase, tremores, depressao e sinais de tronco/forebrain após exposicao, especialmente em pacientes MDR1 suscetiveis.',
    ],
    diagnosticPriorities: [
      'ALTA | Historia de exposicao, revisao de medicacoes e exame pupilar/respiratório | rendimento alto | Estimativa qualitativa | O contexto de exposicao e o principal ponto de ancoragem. Espera-se relato de antiparasitarios, fórmula inadequada ou dose excessiva.',
      'MEDIA | Hemograma, bioquimica, glicemia e gasometria | rendimento moderado | Estimativa qualitativa | Servem para monitorar complicacoes e afastar mimetizadores metabolicos. Espera-se exames inespecificos ou alteracoes secundarias.',
    ],
    treatment: [
      'Suporte ventilatorio, controle de temperatura e anticonvulsivante sao mais importantes que perseguir confirmatorio laboratorial.',
    ],
    avoidDrugs: [
      'Evitar sedação desnecessaria sem suporte ventilatorio disponível quando o paciente ja esta hipoventilando.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_007: {
    clinicalLinks: [
      'Metaldeido costuma ter instalacao aguda com tremores intensos, hipertermia e crise, entao a anamnese ambiental muda muito a prioridade.',
    ],
    diagnosticPriorities: [
      'ALTA | Anamnese toxicologica dirigida, temperatura, acidobase e CK/lactato | rendimento alto | Estimativa qualitativa | O quadro clínico e o contexto costumam sustentar a hipotese. Espera-se hipertermia, acidose e dano muscular secundario.',
    ],
    treatment: [
      'Descontaminacao quando segura, controle agressivo de tremores/crises, temperatura e perfusão antes de qualquer refinamento etiologico.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_008: {
    clinicalLinks: [
      'MUO encaixa melhor quando ha sinais multifocais progressivos envolvendo prosencefalo, tronco ou cerebelo, especialmente com dor cervical ou pares cranianos alterados.',
      'Nos livros, o ponto-chave e lembrar que MUO e diagnóstico sindromico sustentado por RM/LCR após reduzir a chance de infecciosa.',
    ],
    diagnosticPriorities: [
      'ALTA | RM de encefalo e juncao craniocervical | rendimento alto | Estimativa qualitativa | E o melhor exame para demonstrar lesoes multifocais, edema e realce meningeo ou parenquimatoso. Espera-se lesoes inflamatorias assimetricas ou multifocais.',
      'ALTA | Liquor após imagem segura | rendimento alto | Estimativa qualitativa | Ajuda a confirmar inflamacao e a separar infecciosa de imunomediada. Espera-se pleocitose mononuclear/mista e proteína elevada.',
      'MEDIA | Painel infeccioso dirigido por especie/região antes de imunossupressao plena | rendimento moderado | Estimativa qualitativa | Importante para não mascarar infecciosa tratavel. Espera-se resultado negativo se MUO pura.',
    ],
    assessment: [
      'Mensurar dor cervical, progresso entre turnos, pares cranianos e sinais de hipertensao intracraniana antes de decidir LCR.',
    ],
    monitoring: [
      'Monitorar resposta neurologica nas primeiras 24 a 72 horas e vigiar piora do sensório, aspiração e necessidade de UTI.',
    ],
    treatment: [
      'Controlar crise, proteger via aérea e estabilizar para RM/LCR. Imunossupressao faz mais sentido depois de uma exclusao infecciosa razoavel.',
    ],
    allowedDrugs: [
      'Levetiracetam, analgesia cuidadosa e protecao gastrointestinal podem acompanhar o paciente ate a confirmacao etiologica.',
    ],
    avoidDrugs: [
      'Evitar corticoide ou imunossupressor as cegas quando infecciosa ainda e uma possibilidade forte.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_009: {
    clinicalLinks: [
      'Encefalites infecciosas precisam permanecer vivas no diferencial multifocal, sobretudo com imunossupressao, febre, mialgia, pares cranianos e progressao subaguda.',
    ],
    diagnosticPriorities: [
      'ALTA | RM, liquor e sorologia/PCR direcionados para Toxoplasma, Neospora e outros agentes pertinentes | rendimento alto | Estimativa qualitativa | Conectam topografia, inflamacao e agente provável. Espera-se liquor inflamatorio e testes dirigidos conforme o agente.',
      'MEDIA | Hemograma, bioquimica e pesquisa de foco sistemico | rendimento moderado | Estimativa qualitativa | Procuram infeccao concomitante e limitacoes para terapia. Espera-se inflamacao sistêmica variavel.',
    ],
    treatment: [
      'Idealmente colher exames antes de terapia definitiva, mas sem sacrificar estabilizacao ou controle de crise.',
    ],
    avoidDrugs: [
      'Evitar imunossupressao plena antes de esclarecer infeccao quando o quadro clínico ainda sustenta essa via.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_010: {
    clinicalLinks: [
      'Meningite ou meningoencefalite bacteriana costuma ganhar peso com dor cervical, febre, depressao e contexto sistemico; a ausencia de febre não zera a hipotese.',
    ],
    diagnosticPriorities: [
      'ALTA | Hemograma, bioquimica, hemocultura quando possível e imagem antes de LCR | rendimento alto | Estimativa qualitativa | Procuram infeccao sistêmica e segurança para coleta de liquor. Espera-se inflamacao sistêmica e risco de foco primário.',
      'ALTA | Liquor após imagem segura | rendimento alto | Estimativa qualitativa | Ajuda a sustentar inflamação purulenta e direcionar cultura/PCR. Espera-se pleocitose neutrofilica ou inflamação intensa.',
    ],
    treatment: [
      'Se a suspeita clínica for forte e o paciente estiver grave, discutir antimicrobiano empirico após coleta minima segura de exames.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_011: {
    clinicalLinks: [
      'Meningioma e classico em paciente geriatrico com crise de inicio tardio, mudanca comportamental, cegueira central e progressao mais lenta.',
    ],
    diagnosticPriorities: [
      'ALTA | RM de encefalo com contraste | rendimento alto | Estimativa qualitativa | Define lesao extra-axial, edema e efeito de massa. Espera-se massa compatvel com meningioma e edema vasogenico.',
      'MEDIA | Estadiamento toracico/abdominal e avaliação anestesica | rendimento moderado | Estimativa qualitativa | Importantes para planejamento de cirurgia, radioterapia ou paliacao. Espera-se ausencia de metastase em muitos primarios.',
    ],
    monitoring: [
      'Vigiar anisocoria, piora do sensório e padrão respiratório sugestivo de hipertensao intracraniana enquanto a imagem e organizada.',
    ],
    treatment: [
      'No plantao, a prioridade e controlar crises e efeito de massa; a discussao definitiva e cirurgia, radioterapia ou paliacao conforme acesso e objetivo.',
    ],
    allowedDrugs: [
      'Levetiracetam e medidas antiedema protocoladas sao mais uteis que sedação inespecifica.',
    ],
    avoidDrugs: [
      'Evitar subestimar efeito de massa em paciente ainda alerta; a deterioracao pode ser abrupta.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'MRI differentiation of neoplastic, inflammatory and cerebrovascular brain disease in dogs',
    ],
  },
  ddx_012: {
    clinicalLinks: [
      'Glioma pode mimetizar meningioma, mas tende a ser intra-axial e tambem entra forte em crise focal ou sinais de tronco quando a massa e mais profunda.',
    ],
    diagnosticPriorities: [
      'ALTA | RM de encefalo com contraste | rendimento alto | Estimativa qualitativa | E o principal exame para diferenciar massa intra-axial, edema e herniacao. Espera-se lesao infiltrativa ou expansiva intra-axial.',
    ],
    treatment: [
      'Manejo agudo semelhante ao de outras massas: crise, perfusão, oxigenação e controle de efeito de massa ate definir oncologia/neurocirurgia.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_013: {
    clinicalLinks: [
      'Evento vascular encefalico fica mais convincente quando o déficit e realmente peragudo/agudo, assimetrico e não progressivo após as primeiras horas.',
      'Doença renal, hipertensao e endocrinopatias sao coadjuvantes importantes, mas não substituem a cronologia do caso.',
    ],
    diagnosticPriorities: [
      'ALTA | Pressão arterial repetida, fundo de olho, hemograma/coagulograma e RM | rendimento alto | Estimativa qualitativa | Permitem sustentar AVC e procurar predisponentes trataveis. Espera-se hipertensao, proteinuria/coagulopatia ou lesao vascular em RM.',
    ],
    assessment: [
      'Confirmar se houve inicio abrupto maximo no comeco, porque piora progressiva sustentada enfraquece AVC isolado.',
    ],
    treatment: [
      'Suporte, oxigenação e correção de fator predisponente sao mais importantes que medicacao neuroespecifica empirica.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'MRI differentiation of neoplastic, inflammatory and cerebrovascular brain disease in dogs',
    ],
  },
  ddx_040: {
    clinicalLinks: [
      'Hipertensao intracraniana e herniacao não sao diagnosticos finais, mas sindromes de risco imediato que podem coexistir com neoplasia, inflamatória, trauma ou encefalopatia grave.',
    ],
    diagnosticPriorities: [
      'ALTA | Estabilizar primeiro, depois RM/TC quando o transporte for seguro | rendimento alto | Estimativa qualitativa | O exame de imagem so entra depois de proteger via aérea, perfusão e perfis de crise. Espera-se efeito de massa, edema ou herniacao.',
    ],
    treatment: [
      'Cabeca elevada, oxigenação, controle de crises e discussao rapida de terapia antiedema sao as medidas que mudam desfecho imediato.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_041: {
    clinicalLinks: [
      'Encefalopatia hipertensiva deve ser lembrada em paciente renal ou endocrino com cegueira aguda, crise, colapso e sinais prosencefalicos ou multifocais.',
    ],
    diagnosticPriorities: [
      'ALTA | Pressão arterial repetida, fundoscopia, proteinuria e perfil renal | rendimento alto | Estimativa qualitativa | A combinacao documenta orgao-alvo e contexto vascular. Espera-se hipertensao significativa e possíveis lesoes retinianas/renais.',
    ],
    treatment: [
      'Controlar pressão sem derrubar perfusão cerebral e rever a causa primária da hipertensao antes de expandir demais o diagnóstico neurologico.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_045: {
    clinicalLinks: [
      'PIF neurologica precisa entrar cedo em gato jovem ou adulto com sinais multifocais e exame de imagem/LCR inflamatorio, mesmo sem febre exuberante.',
    ],
    diagnosticPriorities: [
      'ALTA | RM, liquor e painel infeccioso/análise de coronavirus conforme disponibilidade | rendimento alto | Estimativa qualitativa | Procuram quadro inflamatório encefalomedular compatvel. Espera-se liquor com proteína alta e imagem multifocal.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_046: {
    clinicalLinks: [
      'Criptococose do SNC deve ser lembrada principalmente em gatos e pacientes com sinais multifocais ou de prosencefalo com possível componente nasal/ocular.',
    ],
    diagnosticPriorities: [
      'ALTA | Antigeno criptococico, RM e liquor | rendimento alto | Estimativa qualitativa | A combinacao ajuda a sustentar a etiologia fungica e a extensao do SNC. Espera-se antigeno positivo e padrão inflamatorio/infiltrativo.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_014: {
    clinicalLinks: [
      'Mielopatia degenerativa encaixa quando há paraparesia progressiva simétrica, ausência de dor espinhal marcante e resposta fraca ou nula a corticoide em cão de raça predisposta.',
      'IVDD e FCE precisam ser razoavelmente excluídos antes de fechar o diagnóstico — especialmente se o curso for peragudo ou houver dor.',
    ],
    diagnosticPriorities: [
      'ALTA | RM ou mielografia quando disponível | rendimento alto | Estimativa qualitativa | Confirma compressão ausente e padrão compatível com degeneração. Espera-se atrofia medular e sinal intramedular crônico.',
      'MEDIA | Teste genético SOD1 em raças elegíveis | rendimento moderado | Estimativa qualitativa | Apoia etiologia hereditária quando o fenótipo é típico. Espera-se homozigose/at-risk conforme raça.',
    ],
    assessment: [
      'Documentar simetria, progressão lenta, ausência de dor e resposta (ou não) a anti-inflamatório — isso separa DM de compressivo agudo.',
    ],
    monitoring: [
      'Reavaliar escala de marcha e função urinária a cada consulta; progressão acelerada sugere reabrir diferencial compressivo.',
    ],
    treatment: [
      'Fisioterapia, manejo de peso e suporte urinário/fecal costumam ser o núcleo do plano; corticoide não deve ser a única resposta se a história não sustenta inflamação.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_015: {
    clinicalLinks: [
      'Hérnia de disco (Hansen I/II) permanece no topo quando há dor espinhal, início agudo/subagudo, raça condrodistrófica e déficit UMN ou LMN compatível com o segmento.',
      'Dor profunda ausente em paraplegia aguda eleva urgência e muda conversa de prognóstico — não é sinônimo automático de “irreversível”, mas exige decisão rápida.',
    ],
    diagnosticPriorities: [
      'ALTA | RM ou mielografia | rendimento muito alto | Estimativa qualitativa | Localiza compressão, grau e lateralização. Espera-se extrusão/protrusão e possível compressão medular.',
      'ALTA | Dor profunda seriada e escala neurológica documentada | rendimento alto | Estimativa qualitativa | Marcadores prognósticos e de urgência. Espera-se estabilidade ou piora nas primeiras horas.',
      'MEDIA | Radiografia ou TC se RM indisponível | rendimento moderado | Estimativa qualitativa | Triagem e planejamento cirúrgico inicial. Espera-se mineralização discal ou colapso compatível.',
    ],
    assessment: [
      'Registrar horas desde perda ambulatória e status de dor profunda; Schiff–Sherrington indica lesão toracolombar cranial à intumescência lombossacra, não mau prognóstico isolado.',
    ],
    monitoring: [
      'Repetir dor profunda e função motora em intervalos definidos (ex.: 4–8 h nas primeiras 24 h em casos graves).',
    ],
    treatment: [
      'Analgesia multimodal, repouso estrito e decisão precoce sobre descompressão quando indicada pelo grau neurológico e tempo de evolução.',
    ],
    avoidDrugs: [
      'Evitar manipulação cervical vigorosa ou posturais agressivas se houver suspeita de instabilidade ou dor cervical intensa.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'ACVIM Consensus Statement on IVDD',
    ],
  },
  ddx_016: {
    clinicalLinks: [
      'Embolia fibrocartilaginosa (FCE) entra forte com déficit peragudo, frequentemente lateralizado, dor espinhal leve ou ausente e possível redução transitória de reflexos (choque medular).',
    ],
    diagnosticPriorities: [
      'ALTA | RM medular | rendimento alto | Estimativa qualitativa | Pode mostrar hiperintensidade intramedular compatível com infarto. Espera-se lesão focal sem compressão extradural dominante.',
      'MEDIA | Reavaliação neurológica seriada nas primeiras 48 h | rendimento alto | Estimativa qualitativa | Diferencia evolução típica de FCE vs compressivo progressivo. Espera-se estabilização ou melhora parcial.',
    ],
    assessment: [
      'Confirmar início máximo no primeiro exame e lateralização; piora contínua após 24–48 h favorece compressivo ou neoplasia.',
    ],
    monitoring: [
      'Fisioterapia precoce quando estável; vigiar úlcera de decúbito e bexiga neurogênica.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_017: {
    clinicalLinks: [
      'Mielite ou discospondilite devem ser lembradas com dor espinhal, febre, rigidez, curso subagudo e possível origem hematogênica (infecciosa) ou imunomediada.',
    ],
    diagnosticPriorities: [
      'ALTA | RM + hemocultura/PCR conforme suspeita + liquor após imagem | rendimento alto | Estimativa qualitativa | Confirma inflamação/infecciosa vertebral ou medular. Espera-se realce discal/vertebral ou mielite.',
      'MEDIA | Hemograma, proteína C reativa e bioquímica | rendimento moderado | Estimativa qualitativa | Sustentam processo infeccioso/inflamatório sistêmico. Espera-se inflamação variável.',
    ],
    treatment: [
      'Antimicrobiano direcionado ou imunossupressão dependem da etiologia — estabilizar dor e função antes de terapia prolongada.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_047: {
    clinicalLinks: [
      'Raiva e uma hipotese epidemiologica e de biosseguranca; quando plausivel, muda primeiro a conduta da equipe e so depois o restante da investigacao.',
    ],
    diagnosticPriorities: [
      'ALTA | Protocolo de saude publica e isolamento | rendimento muito alto | Estimativa qualitativa | O objetivo principal e reduzir risco ocupacional e cumprir fluxo legal. Espera-se decisão imediata de biosseguranca.',
    ],
    treatment: [
      'A prioridade e biosseguranca e notificacao, não aprofundamento hospitalar convencional.',
    ],
    avoidDrugs: [
      'Evitar manipular sem EPI e sem discutir exposicao da equipe.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
}
