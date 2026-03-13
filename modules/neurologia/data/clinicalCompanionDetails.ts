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
      'Epilepsia idiopatica fica mais confortavel quando o exame interictal e realmente normal e a idade de inicio nao e geriatrica.',
      'Convulsao de inicio tardio, cegueira central, pares cranianos alterados ou deficits posturais afastam a zona de conforto da epilepsia idiopatica.',
    ],
    diagnosticPriorities: [
      'ALTA | Glicemia, eletrolitos e bioquimica basica | rendimento alto | Estimativa qualitativa | Devem ser normais ou nao explicar o quadro para manter epilepsia idiopatica no topo. Espera-se triagem metabolica sem causa suficiente para as crises.',
      'MEDIA | RM e liquor se houver red flags, idade atipica ou exame interictal alterado | rendimento alto | Estimativa qualitativa | Servem para excluir epilepsia estrutural quando o caso foge do padrao classico. Espera-se exame normal na epilepsia idiopatica verdadeira.',
    ],
    assessment: [
      'Confirmar se houve recuperacao completa entre crises e se os deficits visuais, posturais ou de pares cranianos nao persistem fora do periodo pos-ictal.',
    ],
    monitoring: [
      'Registrar numero, duracao, gatilhos e intervalo entre crises para diferenciar epilepsia intermitente de progressao estrutural.',
    ],
    treatment: [
      'Se o fenotipo for mesmo idiopatico, o objetivo passa a ser controle de crises e educacao do tutor, nao investigacao estrutural ampla em toda recaida isolada.',
    ],
    allowedDrugs: [
      'Levetiracetam e uma boa ponte no plantao; a manutencao depende de frequencia das crises e do perfil do paciente.',
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
      'ALTA | RM de encefalo com contraste | rendimento alto | Estimativa qualitativa | E o exame que mais muda conduta quando ha crise focal, cegueira central, alteracao comportamental ou deficits interictais. Espera-se lesao prosencefalica focal ou multifocal.',
      'ALTA | Pressao arterial, hemograma, bioquimica, glicemia e eletrolitos | rendimento alto | Estimativa qualitativa | Ajudam a separar mimetizadores metabolicos e vascular/metabolico concomitante. Espera-se fatores predisponentes ou exclusao de causas sistemicas.',
    ],
    treatment: [
      'Controlar crises e depois decidir a direcao diagnostica da lesao cerebral; o anticonvulsivante sozinho nao resolve a causa de base.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_003: {
    clinicalLinks: [
      'Encefalopatia hepatica sobe muito na lista quando o paciente tem hepatopatia, sinais encefalicos flutuantes, crises, colapso ou piora em surtos.',
      'No plantao, o raciocinio precisa procurar precipitantes: constipacao, sangramento gastrointestinal, infeccao, alcalose, hipocalemia, dieta inadequada e desidratacao.',
    ],
    diagnosticPriorities: [
      'ALTA | Bioquimica hepatica, ureia, glicemia, eletrolitos, amonia e acidos biliares quando disponiveis | rendimento alto | Estimativa qualitativa | Confirmam descompensacao hepatica e ajudam a explicar a encefalopatia. Espera-se alteracoes hepatobiliares, hiperamonemia ou pistas de insuficiencia funcional.',
      'ALTA | Gasometria, lactato, oximetria e avaliacao de perfusao | rendimento moderado-alto | Estimativa qualitativa | Identificam hipoxemia, acidobase e fatores que agravam o SNC. Espera-se disturbios que contribuam para rebaixamento ou crise.',
      'MEDIA | Ultrassom abdominal e investigacao de shunt/hipertensao portal | rendimento moderado | Estimativa qualitativa | Importantes quando a historia sugere insuficiencia hepatica ou shunt. Espera-se alteracao estrutural hepatica ou vascular.',
    ],
    assessment: [
      'Checar se a alteracao neurologica flutua com alimentacao, evacuacao, infeccao ou queda do estado geral, porque isso reforca encefalopatia metabolica.',
      'Procurar sinais de aspiração, desidratacao, melena ou distensao abdominal que mudem conduta imediata.',
    ],
    monitoring: [
      'Monitorar mentacao, frequencia de crises, glicemia, potassio, volemia, diurese e tolerancia a lactulose ao longo das primeiras horas.',
    ],
    treatment: [
      'Corrigir precipitantes, proteger via aerea, titular lactulose conforme resposta clinica e evitar agravar desidratacao por excesso de catartico.',
      'Se houver crise, preferir anticonvulsivante com perfil mais amigavel para hepatopata e reavaliar a necessidade de sedacao a cada nova dose.',
    ],
    allowedDrugs: [
      'Levetiracetam costuma ser mais confortavel que fenobarbital em hepatopatas.',
      'Lactulose e, quando indicado, antibiotico intestinal entram cedo no plano se o paciente tolera via oral ou enema.',
    ],
    avoidDrugs: [
      'Evitar sedacao acumulativa, fenobarbital sem necessidade clara e sobrecarga de fluidos em paciente que tambem seja renopata.',
    ],
    references: [
      'Merck Veterinary Manual - Hepatic Encephalopathy in Small Animals',
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_004: {
    clinicalLinks: [
      'Hipoglicemia precisa ser tratada antes de ser discutida: convulsao, fraqueza, colapso e alteracao de consciencia podem se resolver completamente apos correcao.',
    ],
    diagnosticPriorities: [
      'ALTA | Glicemia imediata e seriada | rendimento muito alto | Estimativa qualitativa | E o exame que mais rapidamente confirma ou afasta a hipotese no plantao. Espera-se hipoglicemia ou grande variacao apos suporte.',
      'MEDIA | Perfil hepatico, insulina, imagem abdominal e endocrino conforme contexto | rendimento moderado | Estimativa qualitativa | Servem para buscar insulinoma, hepatopatia ou causa sistemica da hipoglicemia. Espera-se alteracoes dependentes da etiologia.',
    ],
    monitoring: [
      'Depois do bolus inicial, repetir glicemia em curto intervalo para nao perder recorrencia ou hiperglicemia iatrogenica.',
    ],
    treatment: [
      'Corrigir glicose de forma controlada e depois investigar a causa, porque a melhora neurologica pode mascarar o problema de base.',
    ],
    allowedDrugs: [
      'Dextrose titulada e anticonvulsivante se crise persistir apesar da correcao glicemica.',
    ],
    avoidDrugs: [
      'Evitar considerar alta apenas porque a crise cessou sem documentar tendencia da glicemia e causa provavel.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_005: {
    clinicalLinks: [
      'Disturbio eletrolitico sobe no ranking quando ha tremores, fraqueza, mioclonia, alteracao de ECG ou contexto renal/endocrino; sem isso, ele nao deve dominar sozinho o caso.',
    ],
    diagnosticPriorities: [
      'ALTA | Sodio, potassio, calcio ionizado, magnesio e gasometria | rendimento alto | Estimativa qualitativa | Detectam causas trataveis de crise, fraqueza e alteracao difusa do SNC. Espera-se disnatremia, hipocalcemia ou hipocalemia clinicamente relevantes.',
      'MEDIA | ECG e monitorizacao continua durante correcao | rendimento moderado | Estimativa qualitativa | Importantes quando potassio ou calcio estao alterados. Espera-se arritmia ou resposta eletrica a correcao.',
    ],
    treatment: [
      'A correcao precisa ser guiada por repeticao laboratorial e ECG; a pressa pode ser mais perigosa que a doenca.',
    ],
    allowedDrugs: [
      'Reposicao dirigida e monitorizada de calcio, potassio ou sodio conforme o disturbio identificado.',
    ],
    avoidDrugs: [
      'Evitar correcoes rapidas de sodio, bolus de calcio sem ECG e reposicao agressiva de potassio em paciente oliguirico.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_006: {
    clinicalLinks: [
      'Ivermectina e moxidectina costumam produzir ataxia, midriase, tremores, depressao e sinais de tronco/forebrain apos exposicao, especialmente em pacientes MDR1 suscetiveis.',
    ],
    diagnosticPriorities: [
      'ALTA | Historia de exposicao, revisao de medicacoes e exame pupilar/respiratorio | rendimento alto | Estimativa qualitativa | O contexto de exposicao e o principal ponto de ancoragem. Espera-se relato de antiparasitarios, formula inadequada ou dose excessiva.',
      'MEDIA | Hemograma, bioquimica, glicemia e gasometria | rendimento moderado | Estimativa qualitativa | Servem para monitorar complicacoes e afastar mimetizadores metabolicos. Espera-se exames inespecificos ou alteracoes secundarias.',
    ],
    treatment: [
      'Suporte ventilatorio, controle de temperatura e anticonvulsivante sao mais importantes que perseguir confirmatorio laboratorial.',
    ],
    avoidDrugs: [
      'Evitar sedacao desnecessaria sem suporte ventilatorio disponivel quando o paciente ja esta hipoventilando.',
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
      'ALTA | Anamnese toxicologica dirigida, temperatura, acidobase e CK/lactato | rendimento alto | Estimativa qualitativa | O quadro clinico e o contexto costumam sustentar a hipotese. Espera-se hipertermia, acidose e dano muscular secundario.',
    ],
    treatment: [
      'Descontaminacao quando segura, controle agressivo de tremores/crises, temperatura e perfusao antes de qualquer refinamento etiologico.',
    ],
    references: [
      'Platt & Garosi - Small Animal Neurological Emergencies',
    ],
  },
  ddx_008: {
    clinicalLinks: [
      'MUO encaixa melhor quando ha sinais multifocais progressivos envolvendo prosencefalo, tronco ou cerebelo, especialmente com dor cervical ou pares cranianos alterados.',
      'Nos livros, o ponto-chave e lembrar que MUO e diagnostico sindromico sustentado por RM/LCR apos reduzir a chance de infecciosa.',
    ],
    diagnosticPriorities: [
      'ALTA | RM de encefalo e juncao craniocervical | rendimento alto | Estimativa qualitativa | E o melhor exame para demonstrar lesoes multifocais, edema e realce meningeo ou parenquimatoso. Espera-se lesoes inflamatorias assimetricas ou multifocais.',
      'ALTA | Liquor apos imagem segura | rendimento alto | Estimativa qualitativa | Ajuda a confirmar inflamacao e a separar infecciosa de imunomediada. Espera-se pleocitose mononuclear/mista e proteina elevada.',
      'MEDIA | Painel infeccioso dirigido por especie/regiao antes de imunossupressao plena | rendimento moderado | Estimativa qualitativa | Importante para nao mascarar infecciosa tratavel. Espera-se resultado negativo se MUO pura.',
    ],
    assessment: [
      'Mensurar dor cervical, progresso entre turnos, pares cranianos e sinais de hipertensao intracraniana antes de decidir LCR.',
    ],
    monitoring: [
      'Monitorar resposta neurologica nas primeiras 24 a 72 horas e vigiar piora do sensório, aspiração e necessidade de UTI.',
    ],
    treatment: [
      'Controlar crise, proteger via aerea e estabilizar para RM/LCR. Imunossupressao faz mais sentido depois de uma exclusao infecciosa razoavel.',
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
      'ALTA | RM, liquor e sorologia/PCR direcionados para Toxoplasma, Neospora e outros agentes pertinentes | rendimento alto | Estimativa qualitativa | Conectam topografia, inflamacao e agente provavel. Espera-se liquor inflamatorio e testes dirigidos conforme o agente.',
      'MEDIA | Hemograma, bioquimica e pesquisa de foco sistemico | rendimento moderado | Estimativa qualitativa | Procuram infeccao concomitante e limitacoes para terapia. Espera-se inflamacao sistemica variavel.',
    ],
    treatment: [
      'Idealmente colher exames antes de terapia definitiva, mas sem sacrificar estabilizacao ou controle de crise.',
    ],
    avoidDrugs: [
      'Evitar imunossupressao plena antes de esclarecer infeccao quando o quadro clinico ainda sustenta essa via.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_010: {
    clinicalLinks: [
      'Meningite ou meningoencefalite bacteriana costuma ganhar peso com dor cervical, febre, depressao e contexto sistemico; a ausencia de febre nao zera a hipotese.',
    ],
    diagnosticPriorities: [
      'ALTA | Hemograma, bioquimica, hemocultura quando possivel e imagem antes de LCR | rendimento alto | Estimativa qualitativa | Procuram infeccao sistemica e seguranca para coleta de liquor. Espera-se inflamacao sistemica e risco de foco primario.',
      'ALTA | Liquor apos imagem segura | rendimento alto | Estimativa qualitativa | Ajuda a sustentar inflamação purulenta e direcionar cultura/PCR. Espera-se pleocitose neutrofilica ou inflamação intensa.',
    ],
    treatment: [
      'Se a suspeita clinica for forte e o paciente estiver grave, discutir antimicrobiano empirico apos coleta minima segura de exames.',
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
      'MEDIA | Estadiamento toracico/abdominal e avaliacao anestesica | rendimento moderado | Estimativa qualitativa | Importantes para planejamento de cirurgia, radioterapia ou paliacao. Espera-se ausencia de metastase em muitos primarios.',
    ],
    monitoring: [
      'Vigiar anisocoria, piora do sensório e padrao respiratorio sugestivo de hipertensao intracraniana enquanto a imagem e organizada.',
    ],
    treatment: [
      'No plantao, a prioridade e controlar crises e efeito de massa; a discussao definitiva e cirurgia, radioterapia ou paliacao conforme acesso e objetivo.',
    ],
    allowedDrugs: [
      'Levetiracetam e medidas antiedema protocoladas sao mais uteis que sedacao inespecifica.',
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
      'Manejo agudo semelhante ao de outras massas: crise, perfusao, oxigenacao e controle de efeito de massa ate definir oncologia/neurocirurgia.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_013: {
    clinicalLinks: [
      'Evento vascular encefalico fica mais convincente quando o deficit e realmente peragudo/agudo, assimetrico e nao progressivo apos as primeiras horas.',
      'Doenca renal, hipertensao e endocrinopatias sao coadjuvantes importantes, mas nao substituem a cronologia do caso.',
    ],
    diagnosticPriorities: [
      'ALTA | Pressao arterial repetida, fundo de olho, hemograma/coagulograma e RM | rendimento alto | Estimativa qualitativa | Permitem sustentar AVC e procurar predisponentes trataveis. Espera-se hipertensao, proteinuria/coagulopatia ou lesao vascular em RM.',
    ],
    assessment: [
      'Confirmar se houve inicio abrupto maximo no comeco, porque piora progressiva sustentada enfraquece AVC isolado.',
    ],
    treatment: [
      'Suporte, oxigenacao e correcao de fator predisponente sao mais importantes que medicacao neuroespecifica empirica.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
      'MRI differentiation of neoplastic, inflammatory and cerebrovascular brain disease in dogs',
    ],
  },
  ddx_040: {
    clinicalLinks: [
      'Hipertensao intracraniana e herniacao nao sao diagnosticos finais, mas sindromes de risco imediato que podem coexistir com neoplasia, inflamatória, trauma ou encefalopatia grave.',
    ],
    diagnosticPriorities: [
      'ALTA | Estabilizar primeiro, depois RM/TC quando o transporte for seguro | rendimento alto | Estimativa qualitativa | O exame de imagem so entra depois de proteger via aerea, perfusao e perfis de crise. Espera-se efeito de massa, edema ou herniacao.',
    ],
    treatment: [
      'Cabeca elevada, oxigenacao, controle de crises e discussao rapida de terapia antiedema sao as medidas que mudam desfecho imediato.',
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
      'ALTA | Pressao arterial repetida, fundoscopia, proteinuria e perfil renal | rendimento alto | Estimativa qualitativa | A combinacao documenta orgao-alvo e contexto vascular. Espera-se hipertensao significativa e possiveis lesoes retinianas/renais.',
    ],
    treatment: [
      'Controlar pressao sem derrubar perfusao cerebral e rever a causa primaria da hipertensao antes de expandir demais o diagnostico neurologico.',
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
      'ALTA | RM, liquor e painel infeccioso/analise de coronavirus conforme disponibilidade | rendimento alto | Estimativa qualitativa | Procuram quadro inflamatório encefalomedular compatvel. Espera-se liquor com proteina alta e imagem multifocal.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
  ddx_046: {
    clinicalLinks: [
      'Criptococose do SNC deve ser lembrada principalmente em gatos e pacientes com sinais multifocais ou de prosencefalo com possivel componente nasal/ocular.',
    ],
    diagnosticPriorities: [
      'ALTA | Antigeno criptococico, RM e liquor | rendimento alto | Estimativa qualitativa | A combinacao ajuda a sustentar a etiologia fungica e a extensao do SNC. Espera-se antigeno positivo e padrao inflamatorio/infiltrativo.',
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
      'ALTA | Protocolo de saude publica e isolamento | rendimento muito alto | Estimativa qualitativa | O objetivo principal e reduzir risco ocupacional e cumprir fluxo legal. Espera-se decisao imediata de biosseguranca.',
    ],
    treatment: [
      'A prioridade e biosseguranca e notificacao, nao aprofundamento hospitalar convencional.',
    ],
    avoidDrugs: [
      'Evitar manipular sem EPI e sem discutir exposicao da equipe.',
    ],
    references: [
      'Dewey & da Costa - Practical Guide to Canine and Feline Neurology',
    ],
  },
}
