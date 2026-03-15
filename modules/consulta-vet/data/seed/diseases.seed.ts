import { DiseaseRecord } from '../../types/disease';

export const diseasesSeed: DiseaseRecord[] = [
  {
    id: 'dis-cinomose-canina',
    slug: 'cinomose-canina',
    title: 'Cinomose Canina',
    synonyms: ['Distemper canino'],
    species: ['dog'],
    category: 'infecciosas',
    tags: ['Viral', 'Neurol\u00f3gica', 'Vacina\u00e7\u00e3o', 'Filhotes'],
    quickSummary:
      'Doen\u00e7a viral sist\u00eamica com acometimento respirat\u00f3rio, gastrointestinal e neurol\u00f3gico. A prova de conceito do m\u00f3dulo prioriza reconhecimento cl\u00ednico, suporte intensivo e controle de complica\u00e7\u00f5es secund\u00e1rias.',
    thirtySecondView: [
      'Pense em cinomose em c\u00e3o jovem, n\u00e3o vacinado, com sinais multissist\u00eamicos.',
      'Mioclonia, hiperqueratose de coxins e progress\u00e3o neurol\u00f3gica t\u00eam alto peso cl\u00ednico.',
      'N\u00e3o existe antiviral curativo de rotina: o diferencial \u00e9 suporte, isolamento e monitoriza\u00e7\u00e3o precoce.',
    ],
    doNotForget: [
      'Sinais neurol\u00f3gicos podem surgir dias ou semanas ap\u00f3s a fase respirat\u00f3ria ou digestiva.',
      'Resultados negativos em teste r\u00e1pido n\u00e3o excluem a doen\u00e7a em paciente muito sugestivo.',
      'Isolamento \u00e9 parte do tratamento e protege outros pacientes internados.',
    ],
    whenToSuspect: [
      'Filhote ou adulto jovem sem protocolo vacinal completo.',
      'Secre\u00e7\u00e3o ocular ou nasal, tosse e apatia associados a v\u00f4mito ou diarreia.',
      'Mioclonia, convuls\u00f5es, ataxia ou d\u00e9ficits proprioceptivos em conjunto com hist\u00f3rico compat\u00edvel.',
    ],
    initialConduct: [
      'Isolar o paciente e estabilizar hidrata\u00e7\u00e3o, perfus\u00e3o e controle de v\u00f4mito.',
      'Coletar PCR ou teste espec\u00edfico antes de antibi\u00f3tico quando poss\u00edvel, sem atrasar suporte.',
      'Tratar complica\u00e7\u00f5es bacterianas e neurol\u00f3gicas de acordo com apresenta\u00e7\u00e3o cl\u00ednica.',
    ],
    highYieldTests: [
      'RT-PCR em swab conjuntival, secre\u00e7\u00e3o nasal, urina ou sangue.',
      'Hemograma para leucopenia, linfopenia e avalia\u00e7\u00e3o de infec\u00e7\u00e3o secund\u00e1ria.',
      'Radiografia tor\u00e1cica quando houver tosse, crepita\u00e7\u00f5es ou suspeita de broncopneumonia.',
    ],
    commonMistakes: [
      'Esperar confirma\u00e7\u00e3o laboratorial para iniciar suporte em paciente claramente inst\u00e1vel.',
      'Subestimar mioclonia e sinais discretos de d\u00e9ficit neurol\u00f3gico.',
      'Usar antibi\u00f3tico de forma indiscriminada sem justificar infec\u00e7\u00e3o bacteriana secund\u00e1ria.',
    ],
    redFlags: [
      'Convuls\u00f5es, mioclonia persistente ou altera\u00e7\u00e3o aguda do estado mental.',
      'Hipoxemia, esfor\u00e7o respirat\u00f3rio ou broncopneumonia com suspeita de sepse secund\u00e1ria.',
      'Desidrata\u00e7\u00e3o importante com recusa alimentar e evolu\u00e7\u00e3o r\u00e1pida.',
      'Filhote n\u00e3o vacinado com leucopenia acentuada e piora progressiva.',
    ],
    clinicalPearls: [
      'Mioclonia em c\u00e3o jovem n\u00e3o vacinado tem alto valor sugestivo no contexto correto.',
      'A cinomose pode simular doen\u00e7a respirat\u00f3ria ou gastroenterite nos primeiros dias.',
      'O progn\u00f3stico piora muito quando o acometimento neurol\u00f3gico j\u00e1 \u00e9 estabelecido.',
    ],
    introduction:
      'A cinomose canina \u00e9 uma enfermidade infecciosa altamente contagiosa, de grande impacto em filhotes e em pacientes com baixa cobertura vacinal. O v\u00edrus pode produzir quadro multissist\u00eamico, com intensidade vari\u00e1vel entre formas leves e encefalomielite progressiva.',
    etiology:
      'Causada pelo canine distemper virus (CDV), um Morbillivirus envelopado, sens\u00edvel a desinfetantes usuais, mas altamente transmiss\u00edvel em popula\u00e7\u00f5es suscet\u00edveis.',
    transmission: [
      'Contato direto com secre\u00e7\u00f5es respirat\u00f3rias, oculares, saliva, urina ou fezes de animais infectados.',
      'Aerossois em locais com alta densidade de c\u00e3es, como abrigos, creches e interna\u00e7\u00f5es.',
      'Elimina\u00e7\u00e3o viral pode persistir por semanas mesmo ap\u00f3s melhora cl\u00ednica parcial.',
    ],
    pathophysiology: {
      'Resposta imune e progress\u00e3o': [
        'Ap\u00f3s replicar em tonsilas e linfonodos regionais, o v\u00edrus induz imunossupress\u00e3o transit\u00f3ria com linfopenia.',
        'Se a resposta imune \u00e9 insuficiente, ocorre dissemina\u00e7\u00e3o para epit\u00e9lios, pele e sistema nervoso central.',
        'O acometimento neurol\u00f3gico envolve inflama\u00e7\u00e3o, desmieliniza\u00e7\u00e3o e les\u00e3o viral direta.',
      ],
      'Sistemas acometidos': [
        'Respirat\u00f3rio: rinite, secre\u00e7\u00e3o ocular ou nasal, tosse e broncopneumonia.',
        'Gastrointestinal: v\u00f4mito, diarreia, anorexia e perda de peso.',
        'Cut\u00e2neo: hiperqueratose de coxins e plano nasal em fases tardias.',
        'Neurol\u00f3gico: ataxia, paresia, mioclonia, convuls\u00f5es e altera\u00e7\u00f5es comportamentais.',
      ],
    },
    epidemiology:
      'Mais frequente em c\u00e3es jovens entre 3 e 6 meses, especialmente sem vacina\u00e7\u00e3o prim\u00e1ria completa. Surtos ainda ocorrem em cen\u00e1rios de baixa ades\u00e3o vacinal e alta rotatividade de animais.',
    clinicalPresentation: {
      'Fase inicial': [
        'Febre, apatia e queda do apetite.',
        'Secre\u00e7\u00e3o ocular e nasal serosa evoluindo para mucopurulenta.',
        'Tosse, espirros e sinais de bronquite ou pneumonia.',
      ],
      'Fase digestiva': [
        'V\u00f4mito e diarreia com risco de desidrata\u00e7\u00e3o e desequil\u00edbrio eletrol\u00edtico.',
        'Perda ponderal r\u00e1pida em pacientes com anorexia persistente.',
      ],
      'Fase neurol\u00f3gica': [
        'Mioclonia focal ou generalizada.',
        'Ataxia, tetraparesia, d\u00e9ficits proprioceptivos e hiperestesia.',
        'Convuls\u00f5es e altera\u00e7\u00e3o do estado mental.',
      ],
    },
    physicalExam: [
      'Avaliar hidrata\u00e7\u00e3o, temperatura, padr\u00e3o respirat\u00f3rio e secre\u00e7\u00f5es oculares ou nasais.',
      'Inspecionar coxins plantares e plano nasal em busca de hiperqueratose.',
      'Realizar exame neurol\u00f3gico completo sempre que houver mioclonia, tremores ou ataxia.',
      'Auscultar t\u00f3rax e palpar linfonodos perif\u00e9ricos.',
    ],
    differentialDiagnoses: [
      'Traqueobronquite infecciosa canina e outras doen\u00e7as respirat\u00f3rias infecciosas.',
      'Parvovirose ou outras gastroenterites infecciosas em filhotes.',
      'Meningoencefalites infecciosas ou inflamat\u00f3rias.',
      'Toxoplasmose, neosporose e intoxica\u00e7\u00f5es em pacientes neurol\u00f3gicos.',
    ],
    diagnostics: {
      'Exames laboratoriais': [
        'Hemograma pode revelar leucopenia, linfopenia e leucocitose tardia por infec\u00e7\u00e3o bacteriana secund\u00e1ria.',
        'Bioqu\u00edmica ajuda a avaliar hidrata\u00e7\u00e3o, eletr\u00f3litos e fun\u00e7\u00f5es hep\u00e1tica e renal.',
      ],
      'Testes espec\u00edficos': [
        'RT-PCR em swab conjuntival, secre\u00e7\u00e3o nasal, sangue ou urina tem bom rendimento nas fases iniciais.',
        'Imunocromatografia r\u00e1pida pode ajudar na triagem, mas n\u00e3o exclui a doen\u00e7a quando negativa.',
        'Citologia de conjuntiva ou sedimento urin\u00e1rio pode mostrar corp\u00fasculos de inclus\u00e3o, com sensibilidade limitada.',
      ],
      'Imagem e suporte': [
        'Radiografia tor\u00e1cica \u00e9 \u00fatil quando h\u00e1 suspeita de broncopneumonia.',
        'L\u00edquor e imagem avan\u00e7ada entram em casos neurol\u00f3gicos selecionados.',
      ],
    },
    diagnosticApproach:
      'Priorizar hist\u00f3rico vacinal, idade, ambiente, evolu\u00e7\u00e3o cl\u00ednica e sinais multissist\u00eamicos. Em paciente suspeito, coletar exame espec\u00edfico precocemente, corrigir desidrata\u00e7\u00e3o e tratar complica\u00e7\u00f5es concomitantes.',
    treatment: {
      'Conduta de suporte': [
        'Fluidoterapia e corre\u00e7\u00e3o de dist\u00farbios hidroeletrol\u00edticos.',
        'Controle de v\u00f4mito, suporte nutricional e manejo intensivo de pacientes anorexicos.',
        'Nebuliza\u00e7\u00e3o, fisioterapia respirat\u00f3ria e oxigenioterapia quando indicadas.',
      ],
      'Controle de complica\u00e7\u00f5es': [
        'Antimicrobiano apenas quando houver evid\u00eancia ou forte suspeita de infec\u00e7\u00e3o bacteriana secund\u00e1ria.',
        'Anticonvulsivantes conforme o padr\u00e3o de acometimento neurol\u00f3gico.',
        'Cuidados de enfermagem e preven\u00e7\u00e3o de les\u00f5es por dec\u00fabito.',
      ],
      Monitorizacao: [
        'Reavaliar hidrata\u00e7\u00e3o, estado mental, frequ\u00eancia de crises e progress\u00e3o respirat\u00f3ria.',
        'Alinhar com tutor que o tratamento \u00e9 de suporte e o progn\u00f3stico depende principalmente do SNC.',
      ],
    },
    prognosis:
      'Vari\u00e1vel. Casos com apresenta\u00e7\u00e3o respirat\u00f3ria ou digestiva leve podem evoluir bem com suporte adequado. J\u00e1 pacientes com acometimento neurol\u00f3gico progressivo t\u00eam progn\u00f3stico reservado a desfavor\u00e1vel.',
    complications: [
      'Broncopneumonia bacteriana secund\u00e1ria.',
      'Encefalomielite e sequelas neurol\u00f3gicas permanentes.',
      'Desnutri\u00e7\u00e3o, les\u00f5es de dec\u00fabito e infec\u00e7\u00f5es oportunistas em interna\u00e7\u00e3o prolongada.',
    ],
    prevention: [
      'Vacina\u00e7\u00e3o essencial com protocolo prim\u00e1rio completo e refor\u00e7os conforme risco individual.',
      'Isolamento rigoroso de pacientes suspeitos ou confirmados.',
      'Higieniza\u00e7\u00e3o ambiental e controle de circula\u00e7\u00e3o em abrigos e cl\u00ednicas.',
      'Orienta\u00e7\u00e3o intensiva a tutores de filhotes e pacientes de risco.',
    ],
    references: [
      {
        citationText: 'MSD Veterinary Manual. Canine Distemper.',
        sourceType: 'Manual',
        url: 'https://www.msdvetmanual.com',
        notes: 'Vis\u00e3o geral cl\u00ednica, transmiss\u00e3o e diagn\u00f3stico de cinomose canina.',
      },
    ],
    relatedConsensusSlugs: [],
    relatedMedicationSlugs: ['maropitant', 'fenobarbital', 'amoxicilina-clavulanato'],
  },
  {
    id: 'dis-leishmaniose-visceral-canina',
    slug: 'leishmaniose-visceral-canina',
    title: 'Leishmaniose Visceral Canina',
    synonyms: ['LVC', 'Calazar canino'],
    species: ['dog'],
    category: 'infecciosas',
    tags: ['Zoonose', 'Vetor', 'Cr\u00f4nica'],
    quickSummary:
      'Doen\u00e7a infecciosa sist\u00eamica causada por Leishmania infantum, com evolu\u00e7\u00e3o cr\u00f4nica, impacto cut\u00e2neo, renal e hematolinf\u00e1tico e forte relev\u00e2ncia em sa\u00fade p\u00fablica.',
    redFlags: [
      'Azotemia em progress\u00e3o ou protein\u00faria importante.',
      'Epistaxe intensa, uve\u00edte grave ou sangramentos espont\u00e2neos.',
      'Perda de peso marcada com comprometimento sist\u00eamico avan\u00e7ado.',
    ],
    clinicalPearls: [
      'Nem todo c\u00e3o infectado \u00e9 clinicamente doente; o estadiamento muda a conduta.',
      'UPC e perfil renal s\u00e3o decisivos antes e durante o tratamento.',
      'Controle vetorial continua obrigat\u00f3rio mesmo com melhora cl\u00ednica.',
    ],
    introduction:
      'A leishmaniose visceral canina combina manifesta\u00e7\u00f5es dermatol\u00f3gicas, renais, oculares e hematol\u00f3gicas em intensidade vari\u00e1vel. O c\u00e3o \u00e9 um reservat\u00f3rio urbano relevante, e o manejo exige vis\u00e3o cl\u00ednica e epidemiol\u00f3gica.',
    etiology:
      'Causada por Leishmania infantum, protozo\u00e1rio intracelular obrigat\u00f3rio com replica\u00e7\u00e3o em macr\u00f3fagos.',
    transmission: [
      'Picada de flebotom\u00edneos infectados em \u00e1reas end\u00eamicas.',
      'Transmiss\u00e3o vertical e ven\u00e9rea s\u00e3o descritas, por\u00e9m menos frequentes.',
    ],
    pathophysiology:
      'Resposta imune ineficaz favorece alta carga parasit\u00e1ria, forma\u00e7\u00e3o de imunocomplexos e les\u00e3o org\u00e2nica progressiva, sobretudo glomerulonefrite, vasculite e inflama\u00e7\u00e3o cut\u00e2nea cr\u00f4nica.',
    epidemiology:
      'End\u00eamica em diversas regi\u00f5es do Brasil, com maior impacto em \u00e1reas de circula\u00e7\u00e3o vetorial e baixa prote\u00e7\u00e3o ambiental.',
    clinicalPresentation: [
      'Linfadenomegalia, emagrecimento e hiporexia.',
      'Dermatopatias cr\u00f4nicas, alopecia periocular, descama\u00e7\u00e3o e \u00falceras.',
      'Onicogrifose, epistaxe, uve\u00edte e sinais compat\u00edveis com doen\u00e7a renal.',
    ],
    physicalExam: [
      'Palpar linfonodos, ba\u00e7o e avaliar condi\u00e7\u00e3o corporal.',
      'Inspecionar pele, unhas, mucosas e olhos.',
      'Pesquisar desidrata\u00e7\u00e3o, perfus\u00e3o e sinais de sangramento.',
    ],
    differentialDiagnoses: [
      'Ehrlichiose e outras hemoparasitoses.',
      'Doen\u00e7as autoimunes.',
      'Dermatopatias infecciosas ou parasit\u00e1rias cr\u00f4nicas.',
    ],
    diagnostics: {
      Sorologia: [
        'DPP como teste inicial conforme protocolo de triagem.',
        'ELISA como confirma\u00e7\u00e3o, interpretado com contexto cl\u00ednico.',
      ],
      'Parasitologia e molecular': [
        'Citologia de linfonodo, medula ou les\u00e3o cut\u00e2nea pode mostrar amastigotas.',
        'PCR auxilia em casos duvidosos e em amostras espec\u00edficas.',
      ],
      'Avalia\u00e7\u00e3o complementar': [
        'Hemograma, bioqu\u00edmica, urin\u00e1lise e UPC s\u00e3o obrigat\u00f3rios para estadiamento.',
      ],
    },
    diagnosticApproach:
      'Confirmar a suspeita com testes espec\u00edficos e sempre estadiar o paciente antes da terapia. Avalia\u00e7\u00e3o renal e protein\u00faria s\u00e3o mandat\u00f3rias.',
    treatment: {
      'Base terap\u00eautica': [
        'Miltefosina e alopurinol s\u00e3o combina\u00e7\u00f5es frequentes no manejo cl\u00ednico.',
        'Tratar complica\u00e7\u00f5es renais, oculares e cut\u00e2neas em paralelo.',
      ],
      Seguimento: [
        'Monitorar UPC, creatinina, hemograma e resposta cl\u00ednica em intervalos regulares.',
        'Refor\u00e7ar repel\u00eancia e medidas ambientais para reduzir transmiss\u00e3o.',
      ],
    },
    prognosis:
      'Depende principalmente do est\u00e1gio cl\u00ednico e do comprometimento renal. Casos precoces podem permanecer compensados por longos per\u00edodos; pacientes com doen\u00e7a renal avan\u00e7ada t\u00eam progn\u00f3stico reservado.',
    complications: [
      'Doen\u00e7a renal cr\u00f4nica progressiva.',
      'Hiperviscosidade por hiperglobulinemia importante.',
      'Recidiva cl\u00ednica ap\u00f3s melhora inicial.',
    ],
    prevention: [
      'Repelentes t\u00f3picos e coleiras com efic\u00e1cia vetorial.',
      'Vacina\u00e7\u00e3o conforme indica\u00e7\u00e3o e protocolo vigente.',
      'Manejo ambiental e prote\u00e7\u00e3o nos hor\u00e1rios de maior atividade do vetor.',
    ],
    references: [
      {
        citationText: 'Brasileish. Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina (2020).',
        sourceType: 'Consenso',
        url: 'https://www.brasileish.com.br/wp-content/uploads/2020/12/Diretrizes-Brasileish-2020.pdf',
        notes: 'Base para diagn\u00f3stico, estadiamento e tratamento da LVC no Brasil.',
      },
      {
        citationText: 'LeishVet Group. Practical management of canine leishmaniosis.',
        sourceType: 'Guideline',
        url: 'https://www.leishvet.org',
        notes: 'Diretrizes internacionais para manejo cl\u00ednico e seguimento.',
      },
    ],
    relatedConsensusSlugs: ['leishmaniose-brasileiro-2020'],
    relatedMedicationSlugs: ['miltefosina', 'alopurinol'],
  },
  {
    id: 'dis-doenca-renal-cronica',
    slug: 'doenca-renal-cronica',
    title: 'Doen\u00e7a Renal Cr\u00f4nica',
    synonyms: ['DRC', 'IRC'],
    species: ['dog', 'cat'],
    category: 'nefrologia',
    tags: ['IRIS', 'Protein\u00faria', 'Hipertens\u00e3o'],
    quickSummary:
      'Perda progressiva e irrevers\u00edvel da fun\u00e7\u00e3o renal, com impacto em hidrata\u00e7\u00e3o, excre\u00e7\u00e3o de toxinas, press\u00e3o arterial e qualidade de vida de c\u00e3es e gatos.',
    redFlags: [
      'Crise ur\u00eamica com v\u00f4mito incoerc\u00edvel, letargia intensa e \u00falceras orais.',
      'Hipertens\u00e3o grave com risco ocular ou neurol\u00f3gico.',
      'Olig\u00faria, an\u00faria ou piora abrupta sobre quadro cr\u00f4nico.',
    ],
    clinicalPearls: [
      'SDMA pode identificar redu\u00e7\u00e3o de filtra\u00e7\u00e3o antes da creatinina em alguns pacientes.',
      'Dieta renal \u00e9 uma das interven\u00e7\u00f5es com maior impacto na progress\u00e3o.',
      'Protein\u00faria e press\u00e3o arterial devem ser avaliadas em todo paciente com DRC.',
    ],
    introduction:
      'A doen\u00e7a renal cr\u00f4nica \u00e9 frequente em pacientes geri\u00e1tricos e exige abordagem longitudinal. O diagn\u00f3stico n\u00e3o se resume \u00e0 creatinina elevada: envolve densidade urin\u00e1ria, biomarcadores, protein\u00faria, imagem e press\u00e3o arterial.',
    etiology:
      'Frequentemente idiop\u00e1tica, mas tamb\u00e9m associada a les\u00f5es renais agudas pr\u00e9vias, nefrites cr\u00f4nicas, glomerulopatias, anomalias cong\u00eanitas e nefrolit\u00edase.',
    transmission: 'N\u00e3o se aplica. Trata-se de doen\u00e7a n\u00e3o infecciosa.',
    pathophysiology:
      'A perda de n\u00e9frons gera hiperfiltra\u00e7\u00e3o compensat\u00f3ria nos remanescentes, por\u00e9m \u00e0 custa de maior les\u00e3o glomerular e progress\u00e3o estrutural. O resultado \u00e9 reten\u00e7\u00e3o de toxinas ur\u00eamicas, dist\u00farbios do f\u00f3sforo, anemia e altera\u00e7\u00f5es press\u00f3ricas.',
    epidemiology:
      'Mais comum em animais idosos, especialmente gatos. A preval\u00eancia aumenta com a idade e com a presen\u00e7a de comorbidades sist\u00eamicas.',
    clinicalPresentation: [
      'Poli\u00faria e polidipsia persistentes.',
      'Perda de peso, hiporexia, letargia e pelagem opaca.',
      'N\u00e1usea, v\u00f4mito, halitose ur\u00eamica e desidrata\u00e7\u00e3o recorrente.',
      'Em alguns pacientes, cegueira s\u00fabita por hipertens\u00e3o sist\u00eamica.',
    ],
    physicalExam: [
      'Avaliar hidrata\u00e7\u00e3o, condi\u00e7\u00e3o corporal e massa muscular.',
      'Mensurar press\u00e3o arterial sist\u00f3lica.',
      'Palpar rins e pesquisar dor, assimetria ou tamanho reduzido.',
      'Inspecionar fundo de olho quando houver suspeita de hipertens\u00e3o.',
    ],
    differentialDiagnoses: [
      'Les\u00e3o renal aguda.',
      'Diabetes mellitus e outras causas de poli\u00faria e polidipsia.',
      'Hipertireoidismo em gatos.',
      'Doen\u00e7as hep\u00e1ticas e endocrinopatias com repercuss\u00e3o sist\u00eamica.',
    ],
    diagnostics: {
      Laboratorio: [
        'Creatinina, ureia, SDMA, f\u00f3sforo e pot\u00e1ssio conforme est\u00e1gio.',
        'Hemograma para anemia arregenerativa e avalia\u00e7\u00e3o inflamat\u00f3ria.',
      ],
      Urinalise: [
        'Densidade urin\u00e1ria inadequadamente concentrada.',
        'UPC para subestadiamento e tomada de decis\u00e3o terap\u00eautica.',
      ],
      'Imagem e monitorizacao': [
        'Ultrassonografia renal para arquitetura, tamanho e exclus\u00e3o de obstru\u00e7\u00e3o.',
        'Press\u00e3o arterial sist\u00f3lica como parte obrigat\u00f3ria do estadiamento.',
      ],
    },
    diagnosticApproach:
      'Confirmar persist\u00eancia do quadro, excluir inj\u00faria aguda isolada e classificar conforme diretrizes IRIS. O estadiamento orienta dieta, controle press\u00f3rico, manejo de f\u00f3sforo e acompanhamento.',
    treatment: {
      'Medidas centrais': [
        'Dieta renal, controle de f\u00f3sforo e corre\u00e7\u00e3o de desidrata\u00e7\u00e3o.',
        'Controle de protein\u00faria e hipertens\u00e3o com terapia espec\u00edfica.',
        'Manejo de n\u00e1usea, v\u00f4mito, anorexia e constipa\u00e7\u00e3o quando presentes.',
      ],
      Seguimento: [
        'Reavalia\u00e7\u00f5es seriadas com creatinina, SDMA, f\u00f3sforo, UPC e press\u00e3o arterial.',
        'Ajuste terap\u00eautico conforme progress\u00e3o cl\u00ednica e laboratorial.',
      ],
    },
    prognosis:
      'Vari\u00e1vel e diretamente relacionado ao est\u00e1gio IRIS, \u00e0 presen\u00e7a de protein\u00faria, hipertens\u00e3o e \u00e0 ades\u00e3o ao tratamento. Casos leves podem permanecer est\u00e1veis por longos per\u00edodos.',
    complications: [
      'Hipertens\u00e3o arterial sist\u00eamica.',
      'Crise ur\u00eamica.',
      'Anemia de doen\u00e7a renal cr\u00f4nica.',
      'Progress\u00e3o para est\u00e1gios terminais com perda importante de qualidade de vida.',
    ],
    prevention: [
      'Check-ups regulares em pacientes maduros e geri\u00e1tricos.',
      'Acesso amplo \u00e0 \u00e1gua e monitoramento precoce de altera\u00e7\u00f5es urin\u00e1rias.',
      'Uso criterioso de f\u00e1rmacos potencialmente nefrot\u00f3xicos.',
    ],
    references: [
      {
        citationText: 'International Renal Interest Society (IRIS). IRIS Staging of CKD modified 2023.',
        sourceType: 'Guideline',
        url: 'http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf',
        notes: 'Estadiamento de DRC em c\u00e3es e gatos com subestadiamento por protein\u00faria e press\u00e3o arterial.',
      },
      {
        citationText: 'International Renal Interest Society (IRIS). Treatment Recommendations for CKD.',
        sourceType: 'Guideline',
        url: 'http://www.iris-kidney.com',
        notes: 'Recomenda\u00e7\u00f5es terap\u00eauticas e de monitoriza\u00e7\u00e3o longitudinal.',
      },
    ],
    relatedConsensusSlugs: ['iris-drc-2023'],
    relatedMedicationSlugs: ['amlodipina', 'maropitant'],
  },
];
