import type { MedicationRecord } from '../../types/medication';

export const pradofloxacinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-pradofloxacina',
    slug: 'pradofloxacina',
    title: 'Pradofloxacina',
    activeIngredient: 'Pradofloxacina / Pradofloxacino',
    pharmacologicClass:
      'Antibacteriano bactericida da classe das 8-ciano-fluoroquinolonas de 3ª geração (duplo inibidor da DNA-girase e topoisomerase IV); ação concentração-dependente',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Pradofloxacina',
      'Pradofloxacino',
      'Veraflox',
      'Fluoroquinolonas',
      '8-Ciano-fluoroquinolona',
      'Bactericida Concentração-Dependente',
      'Segurança Retiniana Felina',
      'Piodermite Canina',
      'Mycoplasma haemofelis',
      'ISCAID',
      'Elanco',
      'Descontinuado Comercial Brasil',
    ],
    tradeNames: [
      'Veraflox® Comprimidos Palatáveis 15 mg, 60 mg e 120 mg (Elanco Saúde Animal — Uso Veterinário Oficial / Descontinuado no Brasil em 2026)',
      'Veraflox® Suspensão Oral 25 mg/mL (2,5%) com Seringa Dosadora Graduada (Elanco Saúde Animal — Uso Felino / Descontinuado no Brasil em 2026)',
    ],
    officialSiteUrl: 'https://vet.elanco.com/br/produtos/veraflox',
    leafletUrl: 'https://vet.elanco.com/br/produtos/veraflox',
    mechanismOfAction:
      'A pradofloxacina é uma 8-ciano-fluoroquinolona bactericida sintética de 3ª geração, sintetizada no enantiômero opticamente puro S,S. Diferencia-se quimicamente das fluoroquinolonas clássicas pela introdução de um grupo ciano na posição C-8 e de um anel bicíclico pirrolidino-piperidínico na posição C-7, conferindo formato zwitteriônico em pH fisiológico e afinidade balanceada extraordinária por dois alvos moleculares bacterianos essenciais: a DNA-girase (topoisomerase II bacteriana, subunidades GyrA e GyrB) e a topoisomerase IV (subunidades ParC e ParE). O fármaco penetra nas bactérias através de porinas de membrana externa e difusão hidrofóbica passiva, intercalando-se no complexo binário DNA-topoisomerase no momento exato em que a enzima promove o corte fisiológico transitório das duas fitas de DNA para liberar as tensões de superenrolamento cromossômico. A pradofloxacina estabiliza irreversivelmente o complexo clivado intermediário e impede a reação subsequente de religação das fitas. Essa falha catalítica provoca acúmulo maciço de quebras cromossômicas em dupla fita, colapso imediato das forquilhas de replicação e transcrição, parada da síntese de RNA e proteínas, ativação descontrolada da via de reparo SOS bacteriana e morte celular bactericida rápida em 20 a 30 minutos de exposição. Devido ao mecanismo de bloqueio duplo equilibrado (DNA-girase e topoisomerase IV), a barreira genética para desenvolvimento de resistência é muito superior à de fluoroquinolonas mais antigas, exigindo mutações pontuais simultâneas em múltiplos genes para que ocorra perda expressiva de sensibilidade. Sua atividade bactericida é estritamente concentração-dependente, sendo governada pelos índices farmacodinâmicos Cmax/MIC (alvo ideal por volta de 10) e AUC24/MIC (ou fAUC24/MIC), associados a expressivo efeito pós-antibiótico (PAE). Seu espectro inclui bacilos Gram-negativos aeróbios (Escherichia coli, Pasteurella multocida, Klebsiella spp., Proteus spp.), cocos Gram-positivos (Staphylococcus pseudintermedius, Staphylococcus aureus, Staphylococcus felis, Streptococcus canis), patógenos anaeróbios selecionados (Porphyromonas spp., Prevotella spp., Bacteroides spp.) e bactérias intracelulares atípicas (Mycoplasma haemofelis, Mycoplasma felis, Bartonella spp.). Apresenta atividade fraca contra Enterococcus spp. e os estafilococos resistentes à meticilina (MRSP) exibem resistência cruzada frequente.',
    plainLanguageSummary:
      'A pradofloxacina é um antibiótico veterinário moderno e potente da classe das fluoroquinolonas avançadas, desenvolvido especificamente para cães e gatos e comercializado mundialmente sob o nome Veraflox. Ela combate bactérias de forma rápida matando os microrganismos através do bloqueio de duas enzimas vitais para a reprodução bacteriana. DIFERENCIAIS E PONTOS CRÍTICOS DE PLANTÃO: 1) SEGURANÇA RETINIANA TOTAL EM GATOS: Ao contrário da enrofloxacina antiga, a pradofloxacina comprovadamente NÃO provoca cegueira súbita nem destruição da retina em gatos, mesmo quando testada em doses até 10 vezes superiores à recomendada. Trata-se de uma fluoroquinolona altamente segura para a espécie felina. 2) SITUAÇÃO COMERCIAL NO BRASIL: O Veraflox foi descontinuado comercialmente no Brasil pela fabricante Elanco por razões estratégicas e de mercado, e não por falhas de eficácia ou segurança. Frascos e cartuchos remanescentes dentro do prazo de validade podem continuar sendo utilizados clinicamente. 3) AÇÃO CONCENTRAÇÃO-DEPENDENTE: O antibiótico atua pela força do pico de concentração no sangue em relação à bactéria; deve ser administrado em dose única diária (a cada 24 horas), e nunca deve ser subdosado. 4) EFEITO DOS ALIMENTOS EM GATOS: Nos gatos, fornecer o medicamento junto com refeições reduz a absorção no sangue em cerca de 25% a 50%; deve ser administrado preferencialmente com estômago vazio ou sempre com a mesma rotina. 5) NÃO USAR EM FILHOTES EM CRESCIMENTO: Como todas as quinolonas, pode danificar a cartilagem das articulações em filhotes (evitar em cães abaixo de 12 meses, ou 18 meses em raças gigantes; e em gatos com menos de 6 a 12 semanas). 6) CUIDADO EM EPILÉPTICOS: Contraindicado em cães e gatos com histórico de convulsões ou epilepsia. 7) SEPARAR DE MINERAIS POR 2 HORAS: Antiácidos com alumínio e magnésio, protetores como sucralfato, leite, queijos e suplementos com ferro, cálcio ou zinco colapsam a absorção do antibiótico no intestino.',

    indications: [
      'Piodermite superficial e profunda canina associada a cepas suscetíveis de Staphylococcus pseudintermedius, particularmente quando há refratariedade ou intolerância a antimicrobianos de primeira escolha respaldada por cultura e antibiograma.',
      'Infecções de feridas cutâneas contaminadas e abscessos de tecidos moles em gatos (incluindo infecções por Pasteurella multocida, Streptococcus canis, Staphylococcus felis e anaeróbios suscetíveis).',
      'Infecções bacterianas do trato urinário inferior (cistite bacteriana) e superior (pielonefrite) em cães e gatos causadas por Escherichia coli e outros uropatógenos suscetíveis, reservada para situações de resistência comprovada a drogas de primeira linha.',
      'Infecções bacterianas agudas graves do trato respiratório superior em felinos causadas por Pasteurella multocida, Bordetella bronchiseptica e Mycoplasma spp.',
      'Micoplasmose hemotrópica felina (anemia infecciosa felina por Mycoplasma haemofelis) como terapia de resgate/alternativa capaz de erradicar o patógeno e negativar a carga no PCR sanguíneo em protocolos de 14 dias.',
      'Doença periodontal bacteriana severa em cães com envolvimento de anaeróbios produtores de enzimas teciduais (Porphyromonas spp. e Prevotella spp.), como terapia adjuvante à intervenção odontológica mecânica/cirúrgica.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida à pradofloxacina ou a qualquer agente antimicrobiano da classe das fluoroquinolonas.',
      'Cães em fase de crescimento esquelético rápido: contraindicado em filhotes com menos de 12 meses de idade na grande maioria das raças, e com menos de 18 meses em cães de raças gigantes (risco de artropatia cartilagínea bolhosa e erosões articulares permanentes).',
      'Gatos jovens com menos de 6 semanas (conforme rótulo britânico e brasileiro histórico) ou menos de 12 semanas de vida (conforme rotulagem FDA norte-americana), devido à ausência de dados toxicológicos de cartilagem articular nessa faixa etária.',
      'Animais portadores de lesões pré-existentes ou degenerativas crônicas na cartilagem articular (risco de agravamento condral).',
      'Cães e gatos com histórico de epilepsia, convulsões ou distúrbios neurofuncionais centrais (o antagonismo competitivo aos receptores inibitórios GABA-A reduz o limiar convulsivo).',
      'Fêmeas gestantes ou lactantes (ausência de estudos controlados de segurança embriofetal; potencial risco condrotóxico ao concepto).',
      'Monoterapia empírica em infecções suspeitas ou comprovadas por estafilococos resistentes à meticilina (MRSP), que apresentam resistência cruzada frequente a todas as fluoroquinolonas.',
      'Infecções bacterianas causadas por Enterococcus spp., nas quais a pradofloxacina possui atividade microbiológica intrinsecamente fraca.',
    ],

    cautions: [
      'Princípios de Stewardship Antimicrobiano: a pradofloxacina é uma fluoroquinolona veterinária de 3ª geração categorizada pela OMS como antimicrobiano de importância crítica com prioridade máxima (CIA/HIGHEST PRIORITY); deve ser rigorosamente reservada para infecções em que testes de cultura e suscetibilidade demonstrem sensibilidade e nas quais antimicrobianos de primeira linha (como amoxicilina, cefalexina ou sulfonamidas potencializadas) sejam comprovadamente ineficazes.',
      'Monitoramento hematológico em tratamentos prolongados: embora segura nas doses terapêuticas habituais (3 a 5 mg/kg/dia), estudos toxicológicos em cães com doses maciças (27 mg/kg/dia) revelaram mielossupressão dose-dependente com trombocitopenia e leucopenia; em cursos terapêuticos superiores a 7 a 14 dias, recomenda-se realizar hemograma basal e de controle, suspendendo a medicação caso surja queda inexplicada de leucócitos, neutrófilos ou plaquetas.',
      'Efeito dos alimentos na biodisponibilidade felina: em gatos em jejum, a pradofloxacina atinge Cmax sérico médio de 2,1 mcg/mL, porém a administração concomitante com alimento reduz o pico sérico em aproximadamente 50% e a absorção sistêmica total (AUC) em cerca de 25%; recomenda-se manter padrão de administração consistente, preferencialmente afastada de refeições pesadas.',
      'Regra dos 120 minutos de quelação oral: jamais administrar em conjunto com antiácidos contendo hidróxido de alumínio ou magnésio, protetores gástricos como sucralfato, suplementos de ferro, cálcio ou zinco, quelantes de fósforo (como sevelâmer e lantanio) ou laticínios; manter intervalo mínimo de 2 horas entre as administrações para evitar inativação por quelação intraluminal.',
      'Vigilância cardiovascular em cães predispostos a arritmias: em cães, as fluoroquinolonas possuem potencial para prolongamento discreto do intervalo QT; utilizar com cautela redobrada em pacientes com cardiopatias comórbidas, bradiarritmias, hipocalemia, hipomagnesemia ou em terapia com outros fármacos que prolongam o intervalo QT (como sotalol, cisaprida e ondansetrona).',
      'Inexistência de formulação injetável veterinária comercial: a pradofloxacina veterinária disponível comercialmente foi formulada exclusivamente para administração oral (comprimidos palatáveis e suspensão oral); nunca tentar administrar as formulações orais por via intravenosa, intramuscular ou subcutânea.',
    ],

    adverseEffects: [
      'Distúrbios gastrintestinais leves e autolimitados (náusea, sialorreia, vômito ocasional, amolecimento de fezes ou diarreia transitória), decorrentes de irritação da mucosa gástrica ou modulação da microbiota intestinal comensal.',
      'Mielossupressão reversível (leucopenia, neutropenia, linfopenia e/ou trombocitopenia), relatada principalmente em cães expostos a superdosagens maciças experimentais (> 27 mg/kg/dia) ou tratamentos prolongados além de 7 a 14 dias.',
      'Condrotoxicidade articular em animais jovens em crescimento rápido (artropatia com dor articular, efusão sinovial e claudicação secundária a vesículas e erosões na matriz cartilaginosa epifisária).',
      'Manifestações neuroexcitatórias raras (agitação psicomotora, tremores musculares, ataxia ou despolarizações epileptiformes em animais epilépticos ou predispostos, exacerbadas por AINEs).',
      'Prolongamento eletrocardiográfico do intervalo QT com risco potencial proarritmogênico em cães suscetíveis ou sob polifarmácia com bloqueadores de canais de potássio cardíacos.',
      'Fotossensibilização cutânea rara em áreas despigmentadas e desprovidas de pelagem densa expostas à luz solar direta prolongada.',
      'Reações raras de hipersensibilidade imunológica (eritema cutâneo, prurido, urticária ou angioedema).',
    ],

    routes: ['oral'],

    doses: [
      {
        id: 'dose-prado-cao-piodermite',
        species: 'dog',
        indication:
          'Piodermite bacteriana superficial e profunda, infecções de feridas e tecidos moles em cães (S. pseudintermedius)',
        doseMin: 3,
        doseMax: 5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Piodermite: 14 a 21 dias (ou até 7 a 14 dias após resolução clínica completa) | Feridas: 7 dias',
        notes:
          'Bula brasileira histórica indicava 3 mg/kg q24h. O compêndio BSAVA preconiza 3 a 5 mg/kg q24h; o Plumb indica 3 a 4,5 mg/kg q24h. A extremidade superior (4,5 a 5 mg/kg) é preferível em infecções profundas com MIC bacteriana mais elevada.',
        clinicalContext:
          'Reservado para piodermites com falha comprovada de primeira linha (cefalexina, amoxicilina-clavulanato) ou laudo de cultura com perfil de suscetibilidade que justifique o uso.',
        monitoring:
          'Avaliação clínica dermatológica e citológica seriada a cada 7 a 14 dias. Em tratamentos superiores a 14 dias, realizar hemograma completo para vigilância de linhagem branca e plaquetas.',
        calculatorEnabled: true,
        referenceIds: ['plumb-pradofloxacin-10ed', 'bsava-pradofloxacin-10ed', 'mueller-2007-pyoderma'],
        evidenceLevel: 'Ensaio Clínico Randomizado Cego Multicêntrico Nível 1b / Plumb 10ª ed.',
      },
      {
        id: 'dose-prado-cao-gato-itu',
        species: 'both',
        indication:
          'Infecção do trato urinário inferior (cistite bacteriana) e pielonefrite aguda em cães e gatos (Escherichia coli e uropatógenos)',
        doseMin: 3,
        doseMax: 5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Cistite bacteriana esporádica: 3 a 5 dias (diretriz contemporânea ISCAID) | Pielonefrite: 10 a 14 dias',
        notes:
          'Em gatos, utilizar comprimidos palatáveis de 15 mg (3 a 5 mg/kg q24h) ou suspensão oral 25 mg/mL na dose de 5 mg/kg q24h (0,2 mL/kg q24h). ATENÇÃO DE STEWARDSHIP: a antiga bula indicava cursos de 18 a 21 dias para cistite, o que foi completamente superado pelas diretrizes ISCAID 2019, que preconizam cursos curtos de 3 a 5 dias para cistites simples.',
        clinicalContext:
          'Fluoroquinolonas não devem ser usadas empiricamente para cistite simples; reservar para isolados comprovadamente resistentes a aminopenicilinas e sulfonamidas, ou para pielonefrite com bacteremia associada.',
        monitoring:
          'Urinálise seriada e urocultura por cistocentese pré e pós-tratamento (7 a 14 dias após término). Monitorar ureia, creatinina e SDMA na pielonefrite.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-uti-guidelines-2019', 'litster-2007-uti-cat', 'plumb-pradofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2019 e Ensaio Clínico Felino Nível 2b',
      },
      {
        id: 'dose-prado-gato-feridas-abscessos',
        species: 'cat',
        indication:
          'Feridas contaminadas, mordeduras e abscessos subcutâneos em gatos (Pasteurella multocida, estafilococos e anaeróbios)',
        doseMin: 5,
        doseMax: 7.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (Suspensão 25 mg/mL ou Comprimido 15 mg)',
        frequency: 'A cada 24 horas (q24h)',
        duration: '7 dias consecutivos',
        notes:
          'Posologia padrão brasileira e europeia da suspensão oral 25 mg/mL: administrar exatamente 0,2 mL/kg a cada 24 horas (fornece 5 mg/kg). A rotulagem FDA norte-americana preconiza 7,5 mg/kg q24h por 7 dias. Não converter em gotas; usar sempre a seringa dosadora graduada fornecida.',
        clinicalContext:
          'Indicado em lesões polimicrobianas profundas após procedimentos cirúrgicos de desbridamento, drenagem e lavagem abundante (source control). Excelente penetração e atividade sobre anaeróbios orais felinos.',
        monitoring:
          'Inspeção diária do sítio da ferida, regressão do exsudato e fechamento tecidual por segunda intenção.',
        calculatorEnabled: true,
        referenceIds: ['plumb-pradofloxacin-10ed', 'bsava-pradofloxacin-10ed'],
        evidenceLevel: 'Bula Oficial MAPA / Aprovação Regulatória FDA e EMA',
      },
      {
        id: 'dose-prado-gato-respiratorio',
        species: 'cat',
        indication:
          'Infecção bacteriana aguda grave do trato respiratório superior felino (Mycoplasma spp., Pasteurella multocida, Bordetella bronchiseptica)',
        doseMin: 5,
        doseMax: 7.5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral (Suspensão 25 mg/mL)',
        frequency: 'A cada 24 horas (q24h)',
        duration: '5 dias consecutivos',
        notes:
          'Administrar 0,2 mL/kg da suspensão oral 25 mg/mL q24h. Em infecções com suspeita primária de Chlamydia felis (clamidiose felina), ensaio clínico controlado comprovou que a doxiciclina oral é superior à pradofloxacina na erradicação microbiológica (PCR-negativação). A pradofloxacina deve ser reservada para casos de intolerância à doxiciclina ou coinfecções graves.',
        clinicalContext:
          'A pradofloxacina atinge concentrações salivares de 6,3 mcg/mL e concentrações em lágrimas de 13,4 mcg/mL em gatos, demonstrando acúmulo no epitélio conjuntival e mucosal respiratório.',
        monitoring:
          'Resolução de espirros, secreção nasolacrimal mucopurulenta, apetite e hidratação.',
        calculatorEnabled: true,
        referenceIds: ['hartmann-2008-urtd-cat', 'plumb-pradofloxacin-10ed'],
        evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego Nível 1b',
      },
      {
        id: 'dose-prado-gato-micoplasmose-hemotropica',
        species: 'cat',
        indication:
          'Micoplasmose hemotrópica felina (anemia infecciosa felina por Mycoplasma haemofelis) - Terapia de Resgate Extra-Bula',
        doseMin: 5,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '14 dias consecutivos',
        notes:
          'Uso baseado em evidência experimental padrão-ouro (Dowers et al., 2009). Foi o primeiro antibiótico comprovado capaz de negativar a PCR e erradicar o Mycoplasma haemofelis da circulação mesmo após imunossupressão provocada. A doxiciclina permanece como primeira escolha clínica habitual; a pradofloxacina é excelente alternativa em casos de esofagite, intolerância gástrica à doxiciclina ou falha terapêutica.',
        clinicalContext:
          'Monitorar hematócrito e sinais clínicos de anemia regenerativa. Doses de 10 mg/kg são superiores à bula comercial brasileira e exigem justificativa clínica cuidadosa.',
        monitoring:
          'Hemograma seriado (hematócrito, reticulócitos), esfregaço sanguíneo e PCR quantitativo para M. haemofelis ao término do protocolo.',
        calculatorEnabled: true,
        referenceIds: ['dowers-2009-mycoplasma', 'plumb-pradofloxacin-10ed'],
        evidenceLevel: 'Ensaio Clínico Experimental Controlado Padrão-Ouro Nível 1b',
      },
      {
        id: 'dose-prado-gato-bartonelose',
        species: 'cat',
        indication:
          'Bartonelose felina (Bartonella henselae / Bartonella clarridgeiae) - Protocolo Combinado Extra-Bula',
        doseMin: 5,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '28 a 42 dias (4 a 6 semanas)',
        notes:
          'Preconizado em diretrizes de infectologia felina para erradicação de bacteremia por Bartonella em gatos doentes (febre persistente, uveíte, endocardite, poliartrite). Recomenda-se iniciar com doxiciclina e associar a fluoroquinolona após 5 a 7 dias para mitigar reações do tipo Jarisch-Herxheimer.',
        clinicalContext:
          'Eliminação do microrganismo exige cursos longos devido à localização bacteriana intraeritrocitária e intraendotelial.',
        monitoring:
          'Hemograma periódico quinzenal para vigilância de toxicidade medular em tratamentos além de 14 dias; sorologia e PCR sanguíneo serado.',
        calculatorEnabled: true,
        referenceIds: ['plumb-pradofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Farmacológico Plumb 10ª ed.',
      },
    ],

    presentations: [
      {
        id: 'pres-prado-susp-25mg-ml',
        label: 'Veraflox® Suspensão Oral 25 mg/mL (2,5%) Frasco 15 mL (Uso Veterinário para Gatos)',
        form: 'Suspensão oral homogênea bege-amarelada',
        concentrationValue: 25,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco plástico de 15 mL acompanhado de seringa dosadora graduada de 0,1 mL',
        route: 'Oral',
        scoringInfo: 'Líquido para aspiração exclusiva com a seringa dosadora graduada (0,2 mL/kg fornece 5 mg/kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-prado-comp-15mg',
        label: 'Veraflox® Comprimidos Palatáveis 15 mg (Uso Veterinário para Gatos e Cães Pequenos)',
        form: 'Comprimidos palatáveis sulcados marrom-claros sabor fígado suíno',
        concentrationValue: 15,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho blister com 7 ou 21 comprimidos de 15 mg',
        route: 'Oral',
        scoringInfo: 'Comprimido sulcado; 1 comp. para cada 3 kg (gatos a 5 mg/kg) ou 1 comp. para cada 5 kg (cães a 3 mg/kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-prado-comp-60mg',
        label: 'Veraflox® Comprimidos Palatáveis 60 mg (Uso Veterinário para Cães Médios)',
        form: 'Comprimidos palatáveis sulcados marrom-claros sabor fígado suíno',
        concentrationValue: 60,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho blister com 7 ou 21 comprimidos de 60 mg',
        route: 'Oral',
        scoringInfo: 'Comprimido birranhurado divisível em partes iguais; 1 comprimido para cada 20 kg de peso (a 3 mg/kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-prado-comp-120mg',
        label: 'Veraflox® Comprimidos Palatáveis 120 mg (Uso Veterinário para Cães Grandes)',
        form: 'Comprimidos palatáveis sulcados marrom-claros sabor fígado suíno',
        concentrationValue: 120,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho blister com 7 ou 21 comprimidos de 120 mg',
        route: 'Oral',
        scoringInfo: 'Comprimido birranhurado divisível; 1 comprimido para cada 40 kg de peso corporal (a 3 mg/kg)',
        channel: 'veterinary',
      },
    ],

    // 1. Pilares Terapêuticos Fundamentais
    pillars: [
      {
        title: 'Duplo Bloqueio das Topoisomerases',
        icon: 'Dna',
        desc: 'Inibe com elevada e equilibrada afinidade tanto a DNA-girase (GyrA/GyrB) quanto a Topoisomerase IV (ParC/ParE), estabelecendo barreira genética substancialmente mais alta contra mutantes resistentes do que quinolonas antigas.',
      },
      {
        title: 'Bactericidia Concentração-Dependente',
        icon: 'Zap',
        desc: 'A velocidade e a extensão da morte bacteriana são determinadas pelos índices Cmax/MIC e AUC24/MIC. O padrão de dose única a cada 24 horas maximiza a eficácia bactericida e reduz o tempo de permanência na janela de seleção de mutantes.',
      },
      {
        title: 'Ampla Distribuição Tissular e Acúmulo Leucocitário',
        icon: 'Layers',
        desc: 'Volume de distribuição extraordinário (> 2 L/kg em cães e > 4 L/kg em gatos) com baixa ligação proteica (30-35%). Concentra-se até 5 vezes mais em leucócitos do que no plasma, penetrando pele, trato urogenital, saliva e lágrimas.',
      },
      {
        title: 'Segurança Retiniana Felina Comprovada',
        icon: 'Eye',
        desc: 'Não apresenta a toxicidade retiniana aguda e cegueira irreversível associadas à enrofloxacina em felinos. Ensaios com doses maciças de 30 a 50 mg/kg em gatos por 23 dias mantiveram o eletrorretinograma estritamente normal.',
      },
    ],

    quickSummaryHighlights: [
      '8-Ciano-fluoroquinolona de 3ª geração',
      'Duplo bloqueio: DNA-girase e Topoisomerase IV',
      'Bactericida concentração-dependente (q24h)',
      'Segurança retiniana comprovada em gatos',
      'Atividade aprimorada sobre anaeróbios e Mycoplasma',
      'Piodermites, feridas, abscessos e ITUs resistentes',
      'Veraflox descontinuado no Brasil por decisão comercial',
      'Contraindicado em cães jovens em crescimento (< 12-18m)',
      'Contraindicado em epilépticos e convulsivos',
      'Separar 2 horas de antiácidos, sucralfato e cátions',
      'Não há formulação injetável veterinária comercial',
    ],

    // 2. Indicações Rápidas
    quickIndications: [
      {
        condition: 'Piodermite Profunda Canina e Feridas (S. pseudintermedius)',
        species: 'dog',
        doseSummary: '3 a 5 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '14 a 21 dias',
        clinicalContext:
          'Reservado para infecções resistentes a beta-lactâmicos com base em cultura e teste de sensibilidade antimicrobiana.',
      },
      {
        condition: 'Cistite Bacteriana e Pielonefrite (Cães e Gatos)',
        species: 'both',
        doseSummary: '3 a 5 mg/kg VO q24h (Gatos suspensão: 5 mg/kg = 0,2 mL/kg)',
        route: 'Oral',
        duration: 'Cistite: 3 a 5 dias | Pielonefrite: 10 a 14 dias',
        clinicalContext:
          'Conforme consenso ISCAID UTI, reservar para uropatógenos com resistência comprovada a drogas de primeira linha.',
      },
      {
        condition: 'Abscessos e Feridas Contaminadas em Felinos',
        species: 'cat',
        doseSummary: '5 mg/kg VO a cada 24 horas (0,2 mL/kg da suspensão 25 mg/mL)',
        route: 'Oral',
        duration: '7 dias consecutivos',
        clinicalContext:
          'Excelente cobertura para Pasteurella multocida e anaeróbios orais associada a desbridamento cirúrgico e drenagem.',
      },
      {
        condition: 'Micoplasmose Hemotrópica Felina (Mycoplasma haemofelis)',
        species: 'cat',
        doseSummary: '5 a 10 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '14 dias consecutivos',
        clinicalContext:
          'Terapia de resgate extra-bula capaz de induzir PCR-negativação comprovada em ensaios clínicos controlados.',
      },
    ],

    // 3. Indicações Detalhadas
    detailedIndications: [
      {
        id: 'ind-prado-piodermite',
        indication: 'Piodermite bacteriana profunda e infecções cutâneas graves no cão',
        clinicalContext:
          'Piodermites profundas envolvem foliculite bacteriana avançada, furunculose e celulite, predominantemente associadas a Staphylococcus pseudintermedius. A infecção estende-se além do folículo piloso para a derme e tecido subcutâneo profundo, gerando microabscessos, tratos fistulosos e crostas hemorrágicas. Devido ao aumento alarmante de cepas resistentes na rotina veterinária, o uso de fluoroquinolonas avançadas deve ser estritamente orientado por citologia, cultura e antibiograma, reservando a pradofloxacina para casos resistentes a cefalosporinas de primeira geração ou aminopenicilinas potencializadas.',
        species: 'dog',
        dose: '3 a 5 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral (comprimidos palatáveis)',
        frequency: 'A cada 24 horas (dose única diária)',
        duration: '14 a 21 dias (manter por 7 a 14 dias após remissão clínica completa das lesões cutâneas)',
        mechanismOfAction:
          'Duplo bloqueio da Topoisomerase IV e DNA-girase estafilocócicas, com interrupção da replicação cromossômica e bactericidia concentração-dependente rápida.',
        clinicalRationale:
          'Ensaio clínico multicêntrico randomizado duplo-cego (Mueller & Stephan, 2007) demonstrou taxa de remissão de 86% com pradofloxacina (3 mg/kg q24h) versus 73% com amoxicilina-clavulanato, sem nenhuma recidiva nas semanas subsequentes. O Vd superior a 2 L/kg e a acumulação em neutrófilos e macrófagos garantem níveis teciduais cutâneos ideais.',
        monitoring:
          'Inspeção dermatológica e citologia por decalque a cada 14 dias. Acompanhamento de hemograma completo em tratamentos que ultrapassem 14 a 21 dias contínuos.',
        referenceIds: ['mueller-2007-pyoderma', 'plumb-pradofloxacin-10ed', 'bsava-pradofloxacin-10ed'],
        evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego Nível 1b',
      },
      {
        id: 'ind-prado-itu',
        indication: 'Infecções do trato urinário inferior e pielonefrite em cães e gatos',
        clinicalContext:
          'Infecções bacterianas do trato urinário envolvem colonização urotelial por enterobactérias fecais (Escherichia coli, Proteus, Klebsiella) ou estafilococos. Na pielonefrite, há ascensão retrógrada para a pelve e parênquima renal, acompanhada de bacteremia e risco de disfunção renal aguda. A pradofloxacina atinge concentrações ativas no tecido renal e cerca de 40% da dose é excretada na urina em cães.',
        species: 'both',
        dose: 'Cão: 3 a 5 mg/kg VO q24h | Gato: 3 a 5 mg/kg VO q24h (suspensão 5 mg/kg = 0,2 mL/kg)',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: 'Cistite bacteriana esporádica: 3 a 5 dias (ISCAID) | Pielonefrite: 10 a 14 dias',
        mechanismOfAction:
          'Estabilização do complexo clivado DNA-girase nos bacilos Gram-negativos e topoisomerase IV nos cocos Gram-positivos, promovendo esterilização rápida do sistema urinário.',
        clinicalRationale:
          'Estudo clínico felino com 78 gatos (Litster et al., 2007) documentou negativação microbiológica da urina em 100% (27/27) dos gatos tratados com suspensão de pradofloxacina. O consenso ISCAID preconiza reservar fluoroquinolonas para infecções resistentes a agentes de menor espectro, com cursos curtos contemporâneos de 3 a 5 dias em cistites não complicadas.',
        monitoring:
          'Urocultura seriada e urinálise por cistocentese prévia e 7 a 14 dias após término da antibioticoterapia. Avaliação de função renal (ureia, creatinina, SDMA) na pielonefrite.',
        referenceIds: ['iscaid-uti-guidelines-2019', 'litster-2007-uti-cat', 'plumb-pradofloxacin-10ed'],
        evidenceLevel: 'Consenso Internacional ISCAID 2019 e Ensaio Clínico Felino Nível 2b',
      },
      {
        id: 'ind-prado-abscessos-respiratorio-felino',
        indication: 'Abscessos cutâneos, feridas por mordedura e infecções respiratórias em felinos',
        clinicalContext:
          'Abscessos subcutâneos decorrentes de brigas e mordeduras territoriais entre felinos são primariamente infecções polimicrobianas mistas envolvendo a microbiota oral do agressor: Pasteurella multocida, Streptococcus canis, Staphylococcus felis e anaeróbios estritos facultativos como Porphyromonas e Prevotella. No trato respiratório superior, a infecção manifesta-se por rinite, conjuntivite mucopurulenta e sinusite envolvendo Mycoplasma felis, Pasteurella e Bordetella.',
        species: 'cat',
        dose: '5 mg/kg VO a cada 24 horas (exatamente 0,2 mL/kg da suspensão oral 25 mg/mL)',
        route: 'Oral (suspensão com seringa dosadora ou comprimido 15 mg)',
        frequency: 'A cada 24 horas',
        duration: 'Feridas e abscessos: 7 dias | Trato respiratório: 5 dias consecutivos',
        mechanismOfAction:
          'Bactericidia rápida sobre patógenos respiratórios e orais felinos com excelente difusão para secreções salivares (6,3 mcg/mL) e lacrimais (13,4 mcg/mL).',
        clinicalRationale:
          'Diferente da enrofloxacina clássica, a pradofloxacina agrega atividade substancialmente maior contra anaeróbios e Gram-positivos e não apresenta risco de cegueira retinotóxica em gatos, permitindo prescrição segura em felinos quando uma fluoroquinolona se faz necessária.',
        monitoring:
          'Regressão da secreção ocular/nasal, ausência de espirros e retorno ao apetite e higienização normais.',
        referenceIds: ['hartmann-2008-urtd-cat', 'plumb-pradofloxacin-10ed', 'bsava-pradofloxacin-10ed'],
        evidenceLevel: 'Ensaios Clínicos Controlados em Felinos Nível 1b / 2b',
      },
    ],

    // 4. Farmacocinética Comparativa
    pharmacokineticsData: {
      absorption:
        'Em cães, após administração oral dos comprimidos palatáveis, a absorção é rápida e quase completa, com biodisponibilidade sistêmica próxima de 100%. O pico de concentração plasmática (Cmax) ocorre em aproximadamente 2 horas (Tmax ~2 h), atingindo cerca de 1,6 a 1,9 mcg/mL na dose terapêutica padrão de 3 mg/kg. A farmacocinética é proporcional e linear na faixa posológica de 1 a 9 mg/kg, com acúmulo sistêmico mínimo após administrações repetidas q24h. Em gatos, a absorção oral é ainda mais rápida: com a suspensão oral a 25 mg/mL ou comprimidos, o Tmax ocorre entre 0,5 e 2 horas. A biodisponibilidade oral no gato situa-se em torno de 60% a 70% para a suspensão e aproximadamente 70% ou mais para os comprimidos. Em gatos mantidos em jejum, uma dose de 5 mg/kg atinge Cmax plasmático de aproximadamente 2,1 mcg/mL. Efeito crítico da alimentação em gatos: a presença concomitante de alimento no trato gastrointestinal reduz o Cmax sérico em cerca de 50% e a exposição sistêmica total (AUC) em aproximadamente 25%. A absorção oral é gravemente inibida pela presença intraluminal de cátions bivalentes e trivalentes (cálcio, magnésio, ferro, alumínio, zinco) e sucralfato por quelação insolúvel.',
      distribution:
        'Apresenta volume de distribuição aparente extraordinariamente amplo (Vd superior a 2 L/kg em cães e superior a 4 L/kg em gatos), demonstrando penetração tecidual e celular massiva para além do compartimento plasmático vascular. Apresenta taxa de ligação a proteínas plasmáticas baixa (aproximadamente 35% no cão e 30% no gato), garantindo que cerca de 65% a 70% do fármaco circule livre e antimicrobianamente ativo. Em cães que recebem 3 mg/kg, as concentrações no líquido intersticial (Cmax de 1,55 mcg/mL) acompanham os níveis séricos e persistem ativas durante todo o intervalo de 24 horas; as concentrações intracelulares em leucócitos circulantes são cerca de 5 vezes maiores do que no plasma, favorecendo a erradicação de patógenos fagocitados. As concentrações tissulares mais elevadas são encontradas na cartilagem, fígado, rins e pele. Em felinos, alcança concentrações teciduais excepcionais em secreções superficiais da cabeça: média de 6,3 mcg/mL na saliva e 13,4 mcg/mL na secreção lacrimal após dose de 5 mg/kg. Ao contrário de outros tecidos, a penetração no parênquima cerebral e líquor (SNC) é modesta (razão líquor/plasma de aproximadamente 35%, com níveis no líquor em torno de 0,1 a 0,4 mcg/mL), não sendo droga de escolha prioritária para infecções do SNC.',
      metabolism:
        'A biotransformação ocorre primariamente por vias metabólicas hepáticas de conjugação de fase II. Em cães, as vias metabólicas predominantes são a glucuronidação e a sulfatação, gerando metabólitos polares inativos ou menos ativos. Em gatos, a principal via metabólica hepática é a glucuronidação, demonstrando de forma biologicamente fascinante que a reconhecida deficiência de glucuronidação da espécie felina para determinados fenóis simples não se aplica universalmente à pradofloxacina, sendo essa via perfeitamente funcional para a molécula. Diferente da enrofloxacina (que sofre extensa desalquilação hepática para formar ciprofloxacina ativa), a pradofloxacina não possui conversão metabólica expressiva em outros agentes quinolônicos intermediários.',
      elimination:
        'Eliminação mista equilibrada entre a rota renal e vias não renais (biliar/fecal). No cão, aproximadamente 40% da dose administrada é excretada pela urina (cerca de 40% como molécula-mãe inalterada e o restante sob a forma de metabólitos glucuronídeos), sendo que 85% de toda a fração eliminada na urina é excretada dentro das primeiras 24 horas. O clearance corporal total no cão é de aproximadamente 0,24 L/kg/h (240 mL/kg/h), e a meia-vida plasmática de eliminação terminal situa-se entre 7 e 8 horas. No gato, a fração renal inalterada é menor (cerca de 10% da dose), com predominância de eliminação hepatobiliar e metabólica não renal; o clearance total é de aproximadamente 0,27 a 0,28 L/kg/h (270 a 280 mL/kg/h), com meia-vida terminal variando entre 3 e 10 horas conforme a formulação e estudo. Não há indicação nem protocolo clínico para manipular o pH urinário como meio de alterar a taxa de eliminação da pradofloxacina.',
      cnsPenetration:
        'Penetração relativamente baixa a moderada na barreira hematoencefálica (concentrações no líquor entre 0,1 e 0,4 mcg/mL; razão líquor/plasma em torno de 35% em condições experimentais caninas). Não é antibiótico de primeira linha para meningites bacterianas.',
      plasmaBinding:
        'Baixa taxa de ligação a proteínas plasmáticas: aproximadamente 35% em cães e 30% em gatos, mantendo alta fração livre ativa.',
      halfLife:
        'Meia-vida de eliminação plasmática terminal de 7 a 8 horas no cão e cerca de 8 a 10 horas (faixa de 3 a 10 h) no gato.',
    },

    // 5. Informações Gerais
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral - Suspensão Líquida 25 mg/mL (Gatos)',
          technique:
            'Agitar vigorosamente o frasco antes de cada aspiração para ressuspender as partículas de forma homogênea. Utilizar exclusivamente a seringa dosadora graduada fornecida na embalagem original (graduação de 0,1 mL). Administrar diretamente na cavidade oral do animal, preferencialmente na comissura labial. Não converter o volume em número de gotas (densidade da suspensão difere da água e gotejadores induzem erros graves de subdosagem ou superdosagem). Enxaguar a seringa dosadora com água corrente após o uso e manter a tampa do frasco hermeticamente fechada.',
          nursingCare:
            'Orientar o tutor a manter consistência no horário de administração. Se houver regurgitação ou náusea imediata ao administrar em jejum estomacal estrito, pode ser oferecida junto com uma colher de chá de petisco macio não laticínio. Nunca misturar com leite, iogurte, queijo ou alimentos enriquecidos com minerais.',
          limitations:
            'A suspensão 25 mg/mL possui registro voltado à espécie felina. Não compartilhar a mesma seringa dosadora entre múltiplos pacientes sem esterilização rigorosa.',
        },
        {
          route: 'Oral - Comprimidos Palatáveis Sulcados (Cães e Gatos)',
          technique:
            'Administrar por via oral diretamente no fundo da boca ou oferecido espontaneamente na palma da mão (comprimidos palatáveis aromatizados com fígado suíno irradiado). Os comprimidos são sulcados/birranhurados para permitir fracionamento regular. Confirmar que o paciente deglutiu integralmente a dose prescrita.',
          nursingCare:
            'Em gatos que recebem comprimidos secos, administrar 2 a 3 mL de água logo após a deglutição por meio de seringa sem agulha, evitando aderência mecânica esofágica e risco de esofagite medicamentosa erosiva.',
          limitations:
            'Cães alérgicos a proteína suína podem teoricamente reagir ao aroma artificial de fígado suíno irradiado utilizado no veículo palatável.',
        },
        {
          route: 'Vias Parenterais (Intravenosa, Intramuscular, Subcutânea) - PROIBIDAS',
          technique:
            'NÃO HÁ APRESENTAÇÃO INJETÁVEL COMERCIAL APROVADA: A pradofloxacina não possui formulação injetável registrada no mercado veterinário para uso clínico rotineiro em pequenos animais. NUNCA tentar diluir, macerar ou adaptar comprimidos ou suspensões orais para aplicação intravenosa, subcutânea ou intramuscular (risco fatal de embolia por partículas insolúveis, infecção estéril grave e celulite necrótica).',
          nursingCare:
            'Caso o paciente internado esteja impossibilitado de utilizar a via oral por vômitos incoercíveis, sepse com íleo paralítico ou choque hemodinâmico, selecionar outra fluoroquinolona parenteral aprovada (como marbofloxacina injetável ou enrofloxacina injetável com os devidos cuidados de diluição e velocidade lenta).',
          limitations:
            'Inexistência total de compatibilidade física/química ou parâmetros de infusão hospitalar para uso injetável.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Não aplicável (medicamento estritamente formulado para uso oral em cães e gatos).',
        ],
        incompatibleFluids: [
          'Incompatibilidade física intraluminal com cátions metálicos bivalentes e trivalentes: sais de cálcio, hidróxido de magnésio, hidróxido de alumínio, sulfato ferroso, gluconato de zinco, carbonato de lantânio, sevelâmer e sucralfato.',
          'Incompatível para diluição parenteral ou mistura com qualquer solução carreadora de infusão venosa.',
        ],
        infusionRateGuidance:
          'Não aplicável (não existe formulação injetável comercial aprovada para infusão intravenosa contínua).',
        preparationNotes:
          'Comprimidos: conservar na embalagem original fechada, em temperatura ambiente entre 15 °C e 30 °C, em local seco, fresco e protegido da luz solar direta. Uma vez aberto o blister, proteger os fragmentos de comprimidos restantes de umidade e luz. Suspensão oral: armazenar em temperatura ambiente inferior a 30 °C no frasco original bem vedado. Validade pós-abertura do frasco: utilizar em até 3 meses após a primeira abertura conforme a bula oficial brasileira do MAPA (rotulagens norte-americanas FDA preconizam 60 dias). Não congelar.',
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Segurança Retiniana Comprovada e Metabolismo por Glucuronidação Efetivo',
          description:
            'A grande revolução terapêutica da pradofloxacina na clínica médica felina reside na sua segurança ocular. Ao contrário da enrofloxacina (que sofre retenção patológica na barreira hematorretiniana felina por defeito no efluxo ABCG2, causando degeneração oxidativa fotorreceptora e cegueira permanente), a pradofloxacina não induz toxicidade retiniana. Em estudos toxicológicos cegos com 40 gatos avaliados por eletrorretinografia computadorizada durante 23 dias (Messias et al., 2008), animais que receberam doses maciças de 30 mg/kg e 50 mg/kg de pradofloxacina (6 a 10 vezes a dose recomendada) não demonstraram alteração nas amplitudes das ondas retinianas no ERG nem lesões fundoscópicas, enquanto o grupo comparador com enrofloxacina desenvolveu colapso funcional severo da retina. Além disso, embora gatos apresentem vias deficientes de glucuronidação para compostos fenólicos simples, a glucuronidação da pradofloxacina é altamente eficaz, constituindo a principal via de biotransformação hepática na espécie felina. Por outro lado, a absorção oral é sensível a alimentos: gatos que ingerem a pradofloxacina com comida sofrem queda de 50% no pico plasmático (Cmax) e 25% na AUC, exigindo administração consistente.',
          clinicalImplications:
            'É a fluoroquinolona veterinária de escolha para gatos quando o uso dessa classe antimicrobiana se faz mandatário por cultura e antibiograma. A dose preconizada de 5 mg/kg q24h (0,2 mL/kg da suspensão 25 mg/mL) confere ampla margem de segurança sem receio de cegueira iatrogênica.',
        },
        {
          species: 'dog',
          title: 'Biodisponibilidade Oral de 100%, Acúmulo Leucocitário e Mielotoxicidade em Superdose',
          description:
            'No cão, os comprimidos palatáveis exibem biodisponibilidade próxima a 100% com linearidade cinética perfeita. A droga atinge concentrações no interior de neutrófilos e macrófagos cerca de 5 vezes superiores às concentrações séricas, tornando-a excepcionalmente ativa em infecções piogênicas profundas e patógenos intracelulares. Contudo, em ensaios toxicológicos pré-clínicos caninos prolongados utilizando superdosagens extremas (27 mg/kg/dia, correspondente a cerca de 6 a 9 vezes a dose terapêutica), foram documentados sinais consistentes de mielossupressão reversible, com trombocitopenia e leucopenia. Essa toxicidade de alta dose impediu a aprovação da formulação em comprimidos para cães nos Estados Unidos pela FDA, embora o medicamento tenha sido plenamente aprovado e consagrado para cães na Europa, Reino Unido e no Brasil. Em filhotes em crescimento rápido (< 12 meses na maioria das raças e < 18 meses em raças gigantes), a deposição condrocitária gera risco de artropatia cartilagínea bolhosa e claudicação.',
          clinicalImplications:
            'Em cães adultos, utilizar doses recomendadas de 3 a 5 mg/kg q24h (respeitando o teto de 5 mg/kg). Em tratamentos dermatológicos ou ortopédicos que se estendam por mais de 14 a 21 dias, solicitar hemograma periódico para vigilância das contagens de neutrófilos e plaquetas. Contraindicado em cães em fase de crescimento esquelético.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: '8-Ciano-fluoroquinolona sintética avançada de 3ª geração',
        chemicalClassDescription:
          'Derivado quinolônico fluorado bicíclico zwitteriônico, sintetizado como enantiômero opticamente puro S,S, contendo grupo 8-ciano e cadeia lateral 7-(pirrolidin-3-il-metilamina) bicíclica.',
        therapeuticClass: 'Antibacteriano bactericida sistêmico concentração-dependente',
        therapeuticClassDescription:
          'Quimioterápico bactericida de espectro ampliado com duplo bloqueio de topoisomerases tipo II, ativo contra Gram-negativos, Gram-positivos, anaeróbios e bactérias atípicas.',
        detailedTargets: [
          {
            target: 'DNA-girase bacteriana (Topoisomerase II bacteriana - subunidades GyrA e GyrB)',
            action:
              'Estabiliza irreversivelmente o complexo DNA-girase após a clivagem cromossômica, impedindo a religação das fitas duplas de DNA',
            clinicalSignificance:
              'Alvo primordial em bactérias Gram-negativas aeróbias (Enterobacterales e Pasteurella); gera quebras letais no cromossomo e morte bacteriana rápida em 20 a 30 minutos.',
          },
          {
            target: 'Topoisomerase IV bacteriana (subunidades ParC e ParE)',
            action:
              'Inibe a decatenação enzimática e a segregação dos cromossomos circulares recém-replicados durante a divisão celular',
            clinicalSignificance:
              'Alvo primordial ou cooperante simultâneo em cocos Gram-positivos (Staphylococcus pseudintermedius, Streptococcus canis) e anaeróbios; dificulta mutações de resistência de passo único.',
          },
          {
            target: 'Receptor GABA-A mamífero (alvo off-target no sistema nervoso central)',
            action:
              'Antagonismo competitivo fraco da transmissão inibitória mediada pelo ácido gama-aminobutírico (GABA) no SNC',
            clinicalSignificance:
              'Mecanismo fisiopatológico por trás do risco de excitabilidade psicomotora, tremores e convulsões em animais epilépticos ou sob uso concomitante de AINEs.',
          },
        ],
      },
      prescriptionType: {
        category: 'Receituário Veterinário Simples (1 via)',
        ordinanceOrLaw: 'Legislação do MAPA para Produtos Veterinários Antimicrobianos sob Prescrição',
        retentionRequired: false,
        guidelines:
          'Medicamentos veterinários comerciais à base de pradofloxacina (Veraflox) com registro deferido pelo MAPA são dispensados mediante Receituário Veterinário Simples emitido em uma única via entregue ao tutor. Não estão enquadrados na Portaria SVS/MS 344/98 nem na Instrução Normativa MAPA nº 35/2017 de substâncias controladas. A exigência legal de retenção de receita em duas vias com prazo de validade de 10 dias (RDC Anvisa nº 471/2021) é restrita a antibióticos de linha humana e não incide sobre formulações de uso veterinário exclusivo. NOTA DE MERCADO: a fabricante Elanco Saúde Animal descontinuou a comercialização do Veraflox no Brasil em 2026 por decisão estratégica corporativa; lotes remanescentes no mercado dentro do prazo de validade podem ser regularmente prescritos e dispensados.',
      },
    },

    // 6. Atenção, Precauções e Interações
    attentionData: {
      attentionSubtitle:
        'Stewardship Antimicrobiano, Ausência de Retinotoxicidade Felina e Vigilância de Condrotoxicidade',
      precautions: [
        {
          condition: 'Cães e gatos jovens durante a fase de crescimento esquelético rápido',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'As fluoroquinolonas promovem depleção de magnésio na matriz extracelular da cartilagem articular em replicação ativa, induzindo apoptose de condrócitos e formação de vesículas e erosões condrais em superfícies que suportam carga.',
          clinicalAction:
            'Contraindicação absoluta em cães com menos de 12 meses de vida (ou menos de 18 meses em raças gigantes) e em gatos com menos de 6 a 12 semanas. Utilizar classes antimicrobianas sem condrotoxicidade (como aminopenicilinas ou cefalosporinas).',
        },
        {
          condition: 'Epilepsia idiopática, crises convulsivas prévias ou afecções do SNC',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A pradofloxacina atua como antagonista competitivo sobre os receptores inibitórios GABA-A centrais em mamíferos, diminuindo o limiar epileptogênico e facilitando despolarizações corticais paroxísticas.',
          clinicalAction:
            'Contraindicado em pacientes neurológicos epilépticos. Evitar com extremo rigor a coadministração com anti-inflamatórios não esteroidais (AINEs), que potencializam sinergicamente o bloqueio do receptor GABA-A.',
        },
        {
          condition: 'Cães cardiopatas ou com fatores predisponentes a arritmias (QT longo)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Efeito de classe das fluoroquinolonas sobre os canais iônicos cardíacos de potássio (IKr), podendo desencadear prolongamento do intervalo QT e risco teórico de arritmias ventriculares polimórficas.',
          clinicalAction:
            'Usar com cautela em cães com cardiomiopatia dilatada, insuficiência cardíaca congestiva, hipocalemia, hipomagnesemia ou em terapia com outros fármacos arritmogênicos (sotalol, cisaprida). Monitorar eletrocardiograma se houver síncope.',
        },
        {
          condition: 'Tratamentos contínuos superiores a 14 a 21 dias em cães ou gatos debilitados',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Em doses elevadas experimentais, a exposição prolongada à pradofloxacina pode induzir citopenias reversíveis secundárias à supressão hematopoiética na medula óssea.',
          clinicalAction:
            'Solicitar hemograma completo basal pré-tratamento e repetir a cada 14 a 21 dias. Suspender imediatamente o medicamento caso seja identificada queda desproporcional de leucócitos, neutrófilos ou contagem de plaquetas.',
        },
        {
          condition: 'Uso profilático rotineiro ou em cistites bacterianas não complicadas',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A exposição desnecessária a fluoroquinolonas seleciona rapidamente mutantes com bombas de efluxo hiperexpressas e mutações cromossômicas em patógenos bacterianos comensais da microbiota.',
          clinicalAction:
            'Respeitar as diretrizes de stewardship antimicrobiano (ISCAID): reservar a pradofloxacina exclusivamente para infecções com comprovação microbiológica por cultura e antibiograma ou falha documentada de primeiras escolhas.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Desconforto gastrintestinal leve (vômito, diarreia, náusea e amolecimento fecal)',
          frequency: 'common',
          mechanism:
            'Irritação química direta da mucosa estomacal e discreta alteração disbiótica da microbiota intestinal comensal.',
          clinicalManagement:
            'Administrar junto com pequena porção de petisco não lácteo para amortecer o contato gástrico. Se o vômito persistir, avaliar prescrição de antiemético específico (como maropitant) ou descontinuar a droga.',
        },
        {
          effect: 'Mielossupressão com leucopenia, neutropenia e trombocitopenia',
          frequency: 'rare',
          mechanism:
            'Toxicidade citotóxica reversível sobre os precursores hematopoiéticos da medula óssea sob doses elevadas ou terapia prolongada.',
          clinicalManagement:
            'Vigilância hematológica com hemograma periódico em terapias que excedam 14 dias. A suspensão do fármaco resulta em pronta recuperação dos índices celulares medulares.',
        },
        {
          effect: 'Condrotoxicidade e artropatia em animais em fase de crescimento',
          frequency: 'rare',
          mechanism:
            'Depleção de íons magnésio nos condrócitos em proliferação ativa com necrose celular e erosões condrais em superfícies que suportam peso.',
          clinicalManagement:
            'Prevenção estrita respeitando as faixas etárias de contraindicação (< 12-18 meses no cão e < 6-12 semanas no gato). Se houver claudicação, suspender o fármaco imediatamente e instituir repouso e analgesia.',
        },
        {
          effect: 'Neurotoxicidade e convulsões em animais predispostos',
          frequency: 'rare',
          mechanism:
            'Bloqueio dos receptores inibitórios GABA-A no encéfalo, provocando despolarização paroxística desinibida de neurônios motores corticais.',
          clinicalManagement:
            'Tratamento imediato de crises convulsivas com benzodiazepínicos (midazolam ou diazepam IV) e suspensão permanente da pradofloxacina.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Renal Crônica em Cães (Estágios 3 e 4 IRIS)',
          recommendedAdjustment:
            'Não há algoritmo quantitativo validado de redução de dose (como cortar 25% ou 50%). Como a excreção renal no cão corresponde a cerca de 40% da dose, recomenda-se cautela, monitoramento rigoroso e ajuste do intervalo para q36h ou q48h em nefropatas graves anúricos/oligúricos, preservando o pico bactericida.',
          physiologicalRationale:
            'Por ser um bactericida concentração-dependente, reduzir a dose unitária compromete a relação Cmax/MIC e seleciona patógenos resistentes. Espaçar o intervalo mantém o pico sérico sem causar acúmulo excessivo.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica em Gatos (DRC Felina Estágios 2 a 4 IRIS)',
          recommendedAdjustment:
            'Não é recomendada redução empírica arbitrária da dose. A via renal no gato responde por apenas ~10% da eliminação do fármaco inalterado, sendo a rota hepática/glucuronidação predominante. Manter a dose usual de 5 mg/kg q24h com hidratação adequada.',
          physiologicalRationale:
            'Estudos farmacocinéticos em felinos demonstram que a eliminação corporal total depende primariamente de rotas não renais. Subdosar gatos nefropatas causa falha terapêutica sem benefício de segurança.',
        },
        {
          clinicalCondition: 'Hepatopatia Descompensada com Insuficiência Hepática',
          recommendedAdjustment:
            'Como a biotransformação ocorre primariamente por glucuronidação e sulfatação no fígado, hepatopatas graves com ascite ou icterícia devem ser manejados com extrema cautela; preferir antibacterianos alternativos.',
          physiologicalRationale:
            'A diminuição da capacidade enzimática de conjugação hepática prolonga a meia-vida sistêmica de eliminação e pode aumentar o risco de eventos adversos.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos com Comorbidades Múltiplas',
          recommendedAdjustment:
            'Não há ajuste exclusivo baseado na idade cronológica. Avaliar a função renal e hepática basais através de perfil bioquímico (creatinina, ureia, SDMA, ALT, fosfatase alcalina).',
          physiologicalRationale:
            'Animais idosos hígidos mantêm depuração farmacocinética satisfatória; ajustes devem ser ditados pelo grau de disfunção orgânica de órgãos excretores.',
        },
        {
          clinicalCondition: 'Finalização do Tratamento Antimicrobiano (Desmame)',
          recommendedAdjustment:
            'NUNCA realizar desmame decrescente ou redução escalonada de dose. Concluir integralmente o período prescrito (ex.: 5, 7, 14 ou 21 dias) e suspender a medicação de forma abrupta.',
          physiologicalRationale:
            'A redução progressiva da dose de um antimicrobiano expõe as bactérias sobreviventes a níveis subinibitórios, atuando como o principal vetor de seleção de cepas multirresistentes.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Antiácidos (Alumínio, Magnésio), Cálcio, Ferro, Zinco e Sucralfato',
          severity: 'major',
          clinicalEffect:
            'Queda drástica e colapso da absorção gastrointestinal da pradofloxacina, resultando em concentrações séricas subterapêuticas e falha do tratamento antimicrobiano.',
          pharmacologicalMechanism:
            'Formação de quelatos químicos insolúveis e farmacologicamente inabsorvíveis entre os cátions metálicos polivalentes e o anel quinolônico no lúmen gastrointestinal. Manter intervalo mínimo obrigatório de 2 horas entre as administrações.',
        },
        {
          drugOrClass: 'Teofilina e Aminofilina',
          severity: 'major',
          clinicalEffect:
            'Elevação das concentrações séricas de teofilina com risco aumentado de toxicidade clínica (taquicardia sinusal, arritmias ventriculares, náusea e convulsões).',
          pharmacologicalMechanism:
            'Inibição metabólica hepática do citocromo CYP1A2 pelas fluoroquinolonas, reduzindo o clearance corporal total da teofilina. As bulas recomendam evitar a associação ou reduzir a dose de teofilina sob monitoramento.',
        },
        {
          drugOrClass: 'Anti-inflamatórios Não Esteroidais (AINEs: Carprofeno, Meloxicam, Cetoprofeno, etc.)',
          severity: 'major',
          clinicalEffect:
            'Aumento do risco de hiperexcitabilidade central, tremores musculares involuntários e crises convulsivas, particularmente em animais com histórico neurológico.',
          pharmacologicalMechanism:
            'Potencialização farmacodinâmica sinérgica do antagonismo competitivo exercido sobre os receptores inibitórios GABA-A no sistema nervoso central.',
        },
        {
          drugOrClass: 'Ciclosporina Sistêmica e Tacrolimo',
          severity: 'moderate',
          clinicalEffect:
            'Possível elevação dos níveis séricos de ciclosporina e agravamento potencial de toxicidade renal.',
          pharmacologicalMechanism:
            'Interferência no metabolismo hepático microssomal e transporte de membrana tubular renal. O compêndio BSAVA recomenda evitar o uso concomitante até que mais dados veterinários estejam disponíveis.',
        },
        {
          drugOrClass: 'Digoxina',
          severity: 'moderate',
          clinicalEffect:
            'Possível incremento da biodisponibilidade e elevação da concentração sérica de digoxina com risco de intoxicação digitálica.',
          pharmacologicalMechanism:
            'Modulação de transportadores de efluxo enterocitários e eliminação renal de digoxina. Recomenda-se evitar o uso concomitante ou monitorar eletrocardiograma e níveis séricos de digoxina.',
        },
        {
          drugOrClass: 'Nitrofurantoína',
          severity: 'moderate',
          clinicalEffect:
            'Antagonismo do efeito bactericida da pradofloxacina no trato urinário.',
          pharmacologicalMechanism:
            'Antagonismo microbiológico demonstrado in vitro entre derivados nitrofurânicos e quinolonas. A administração concomitante não é recomendada.',
        },
        {
          drugOrClass: 'Fármacos que Prolongam o Intervalo QT (Sotalol, Cisaprida, Ondansetrona)',
          severity: 'moderate',
          clinicalEffect:
            'Potencial efeito aditivo de prolongamento da repolarização ventricular cardíaca com risco de proarritmias.',
          pharmacologicalMechanism:
            'Bloqueio sinérgico dos canais de potássio IKr miocárdicos.',
        },
      ],
    },

    // 7. Estudos Clínicos e de Segurança Comentados
    clinicalStudiesCommented: [
      {
        title:
          'Pradofloxacin in the treatment of canine deep pyoderma: a multicentred, blinded, randomized parallel trial',
        authorsYear: 'Mueller RS, Stephan B. 2007',
        journal: 'Vet Dermatol. 18(3):144-151. doi: 10.1111/j.1365-3164.2007.00584.x. PMID: 17470228',
        studyDesign:
          'Ensaio clínico multicêntrico, prospectivo, randomizado, cego e paralelo em 107 cães com piodermite profunda espontânea por Staphylococcus pseudintermedius, comparando pradofloxacina (3 mg/kg VO q24h; n=56) versus amoxicilina-clavulanato (12,5 a 25 mg/kg VO q12h; n=51).',
        sampleSize: '107 cães com piodermite profunda',
        mainFindings:
          'A taxa de remissão clínica completa ao final do tratamento foi de 86% (48/56) no grupo pradofloxacina e 73% (37/51) no grupo amoxicilina-clavulanato. Notavelmente, nenhuma recidiva precoce ocorreu no grupo pradofloxacina durante as duas semanas de acompanhamento pós-tratamento, enquanto seis recidivas foram documentadas no grupo comparador.',
        clinicalTakeaway:
          'Demonstra eficácia clínica e bacteriológica superior da pradofloxacina no tratamento de infecções cutâneas estafilocócicas profundas em cães, validando a posologia diária única de 3 mg/kg q24h.',
        referenceId: 'mueller-2007-pyoderma',
      },
      {
        title:
          'Clinical efficacy and palatability of pradofloxacin 2.5% oral suspension for the treatment of bacterial lower urinary tract infections in cats',
        authorsYear: 'Litster A, Moss S, Honnery M, Rees B, Edingloh M, Trott D. 2007',
        journal: 'J Vet Intern Med. 21(5):990-995. doi: 10.1111/j.1939-1676.2007.tb03054.x. PMID: 17939554',
        studyDesign:
          'Ensaio clínico comparativo aberto em 78 gatos com infecção do trato urinário inferior bacteriana confirmada por cultura quantitativa, avaliando pradofloxacina suspensão 2,5% (n=27), doxiciclina (n=23) e amoxicilina-clavulanato (n=28).',
        sampleSize: '78 gatos com ITU comprovada',
        mainFindings:
          'A cura microbiológica (urocultura estéril pós-tratamento) foi de 100% (27/27) nos gatos tratados com suspensão de pradofloxacina, enquanto ocorreram três falhas microbiológicas em cada um dos outros dois grupos. A palatabilidade da suspensão foi excelente, com 96% de aceitação voluntária sem estresse.',
        clinicalTakeaway:
          'Comprova a alta eficácia microbiológica e facilidade de administração da suspensão oral 25 mg/mL de pradofloxacina em felinos com infecções urinárias causadas por enterobactérias e estafilococos.',
        referenceId: 'litster-2007-uti-cat',
      },
      {
        title:
          'Use of pradofloxacin to treat experimentally induced Mycoplasma haemofelis infection in cats',
        authorsYear: 'Dowers KL, Tasker S, Radecki SV, Lappin MR. 2009',
        journal: 'Am J Vet Res. 70(1):105-111. doi: 10.2460/ajvr.70.1.105. PMID: 19119955',
        studyDesign:
          'Estudo experimental controlado em 23 gatos SPF experimentalmente inoculados com Mycoplasma haemofelis, avaliando grupos tratados com pradofloxacina (5 ou 10 mg/kg q24h por 14 dias), doxiciclina e controle não tratado, com monitoramento serado por PCR quantitativo e indução de imunossupressão farmacológica posterior.',
        sampleSize: '23 gatos SPF inoculados',
        mainFindings:
          'Ambas as doses de pradofloxacina promoveram queda maciça da carga bacteriana e recuperação do hematócrito. Notavelmente, foi a primeira droga na literatura capaz de produzir PCR persistentemente negativa em sangue, mantendo alguns animais negativos mesmo após imunossupressão induzida posteriormente.',
        clinicalTakeaway:
          'Evidência padrão-ouro de que a pradofloxacina é capaz de erradicar o Mycoplasma haemofelis em gatos, consolidando-se como terapia de resgate de eleição quando há falha ou intolerância à doxiciclina.',
        referenceId: 'dowers-2009-mycoplasma',
      },
      {
        title:
          'Efficacy of pradofloxacin in cats with feline upper respiratory tract disease due to Chlamydophila felis or Mycoplasma infections',
        authorsYear: 'Hartmann AD, Helps CR, Lappin MR, Werckenthin C, Hartmann K. 2008',
        journal: 'J Vet Intern Med. 22(1):44-52. doi: 10.1111/j.1939-1676.2007.0012.x. PMID: 18289288',
        studyDesign:
          'Ensaio clínico prospectivo, randomizado e duplo-cego em 39 gatos com infecção respiratória alta aguda comprovada por Chlamydophila felis e/ou Mycoplasma spp., comparando pradofloxacina (5 mg/kg q24h) versus doxiciclina (5 mg/kg q12h) durante 42 dias.',
        sampleSize: '39 gatos com infecção respiratória alta',
        mainFindings:
          'Ambos os antimicrobianos promoveram melhora clínica acentuada e erradicaram o Mycoplasma spp. Contudo, em relação a Chlamydophila felis, todos os gatos tratados com doxiciclina eliminaram o patógeno (PCR negativa), enquanto 4 gatos no grupo pradofloxacina permaneceram PCR-positivos ao final do estudo.',
        clinicalTakeaway:
          'Evidencia que excelente resposta clínica sintomática não equivale necessariamente a erradicação microbiológica completa. Para clamidiose felina primária, a doxiciclina permanece como tratamento de primeira escolha.',
        referenceId: 'hartmann-2008-urtd-cat',
      },
      {
        title:
          'Pharmacokinetics and pharmacodynamics of oral pradofloxacin administration in dogs',
        authorsYear: 'Boothe DM, Bush KM, Boothe HW, Davis HA. 2018',
        journal: 'Am J Vet Res. 79(12):1268-1276. doi: 10.2460/ajvr.79.12.1268. PMID: 30457901',
        studyDesign:
          'Estudo farmacocinético e farmacodinâmico compreensivo em cães hígidos após doses orais de 3, 6 e 12 mg/kg, mensurando concentrações no plasma, líquido intersticial tecidual, líquido cefalorraquidiano (líquor), líquido sinovial, humor aquoso e leucócitos isolados.',
        sampleSize: '14 cães de pesquisa',
        mainFindings:
          'Na dose terapêutica de 3 mg/kg, os índices PK-PD em leucócitos foram cerca de 5 vezes maiores do que no plasma. A exposição foi excelente no soro e líquido intersticial periférico, enquanto o líquor, o líquido sinovial e o humor aquoso apresentaram as menores taxas de penetração relativa.',
        clinicalTakeaway:
          'Fornece respaldo farmacológico exato para a extraordinária eficácia da pradofloxacina em infecções piogênicas profundas e tecidos moles, esclarecendo ao mesmo tempo por que a droga não é prioritária em infecções bacterianas do sistema nervoso central.',
        referenceId: 'boothe-2018-pkpd-dog',
      },
      {
        title:
          'Retinal safety of a new fluoroquinolone, pradofloxacin, in cats: assessment with electroretinography',
        authorsYear: 'Messias A, Gekeler F, Wegener A, Dietz K, Kohler K, Zrenner E. 2008',
        journal: 'Doc Ophthalmol. 116(3):177-191. doi: 10.1007/s10633-007-9081-x. PMID: 17909874',
        studyDesign:
          'Estudo toxicológico ocular controlado e cego em 40 gatos tratados durante 23 dias consecutivos com placebo (n=9), pradofloxacina 30 mg/kg (n=10), pradofloxacina 50 mg/kg (n=14) ou enrofloxacina 30 mg/kg (n=7), monitorados com eletrorretinografia computadorizada seriada e histopatologia da retina.',
        sampleSize: '40 gatos adultos',
        mainFindings:
          'Gatos expostos a superdosagens extremas de pradofloxacina (30 e 50 mg/kg, correspondendo a 6 a 10 vezes a dose recomendada) não apresentaram alteração estatisticamente significativa na morfologia ou amplitude das ondas a e b no eletrorretinograma, nem necrose de fotorreceptores. Em nítido contraste, a enrofloxacina a 30 mg/kg desencadeou perda profunda e irreversível da resposta retiniana com colapso tapetal.',
        clinicalTakeaway:
          'Estudo definitivo que comprovou a ampla margem de segurança retiniana da pradofloxacina em felinos, eliminando a principal complicação iatrogênica associada ao uso de fluoroquinolonas em gatos.',
        referenceId: 'messias-2008-retinal-safety',
      },
    ],

    // 8. Tabela Prática de Peso e Conversão de Doses
    practicalWeightTable: {
      standardDoseText:
        'Cães: Dose padrão de 3 mg/kg a cada 24 horas (VO) em comprimidos palatáveis (podendo atingir 4,5 a 5 mg/kg em infecções profundas). Gatos: Dose padrão de 5 mg/kg a cada 24 horas (VO), correspondente a exatamente 0,2 mL/kg da suspensão oral 25 mg/mL (ou comprimidos de 15 mg). NUNCA fracionar em gotas.',
      headers: [
        'Peso do Paciente',
        'Dose Total Diária',
        'Gatos: Suspensão 25 mg/mL (5 mg/kg)',
        'Cães: Comprimido 15 mg (3 mg/kg)',
        'Cães: Comprimido 60 mg (3 mg/kg)',
        'Cães: Comprimido 120 mg (3 mg/kg)',
      ],
      rows: [
        {
          weight: '2 kg (Gato Pequeno)',
          totalDose: '10 mg q24h (Gato)',
          col1: '0,40 mL q24h',
          col2: 'Sem fração adequada (usar suspensão)',
          col3: 'Inadequado para 2 kg',
          col4: 'Inadequado para 2 kg',
        },
        {
          weight: '3 kg (Gato Padrão)',
          totalDose: '15 mg q24h (Gato)',
          col1: '0,60 mL q24h',
          col2: '1 comprimido de 15 mg q24h',
          col3: 'Inadequado para 3 kg',
          col4: 'Inadequado para 3 kg',
        },
        {
          weight: '4 kg (Gato Adulto)',
          totalDose: '20 mg q24h (Gato)',
          col1: '0,80 mL q24h',
          col2: 'Preferir suspensão (0,8 mL)',
          col3: 'Inadequado para 4 kg',
          col4: 'Inadequado para 4 kg',
        },
        {
          weight: '5 kg (Gato Grande / Cão Mini)',
          totalDose: 'Gato: 25 mg | Cão: 15 mg',
          col1: '1,00 mL q24h (Gato)',
          col2: '1 comprimido de 15 mg q24h (Cão)',
          col3: 'Inadequado para 5 kg',
          col4: 'Inadequado para 5 kg',
        },
        {
          weight: '10 kg (Cão Pequeno)',
          totalDose: '30 mg q24h (Cão)',
          col1: 'Uso primário em gatos',
          col2: '2 comprimidos de 15 mg q24h',
          col3: '1/2 comprimido de 60 mg q24h',
          col4: 'Inadequado para 10 kg',
        },
        {
          weight: '15 kg (Cão Médio)',
          totalDose: '45 mg q24h (Cão)',
          col1: 'Uso primário em gatos',
          col2: '3 comprimidos de 15 mg q24h',
          col3: '3/4 comprimido de 60 mg (ou associar)',
          col4: 'Inadequado para 15 kg',
        },
        {
          weight: '20 kg (Cão Médio)',
          totalDose: '60 mg q24h (Cão)',
          col1: 'Uso primário em gatos',
          col2: 'Inadequado (muitos comprimidos)',
          col3: '1 comprimido de 60 mg q24h',
          col4: '1/2 comprimido de 120 mg q24h',
        },
        {
          weight: '30 kg (Cão Grande)',
          totalDose: '90 mg q24h (Cão)',
          col1: 'Uso primário em gatos',
          col2: 'Inadequado',
          col3: '1 e 1/2 comp. de 60 mg q24h',
          col4: '3/4 comprimido de 120 mg',
        },
        {
          weight: '40 kg (Cão Grande)',
          totalDose: '120 mg q24h (Cão)',
          col1: 'Uso primário em gatos',
          col2: 'Inadequado',
          col3: '2 comprimidos de 60 mg q24h',
          col4: '1 comprimido de 120 mg q24h',
        },
      ],
    },

    // 9. Modelo Pronto de Prescrição Veterinária
    samplePrescriptionText:
      'RECEITUÁRIO SIMPLES — USO VETERINÁRIO\n\nPaciente: Nino | Espécie: Felina | Raça: Siamês | Peso: 4,0 kg | Idade: 4 anos\nTutor: Mariana Albuquerque\n\nPrescrição Oral:\n1. Pradofloxacina (Veraflox®) Suspensão Oral 25 mg/mL (2,5%) ---------- 1 frasco de 15 mL\n   - Posologia: Administrar exatamente 0,8 mL (equivalente a 20 mg de pradofloxacina) por via oral, a cada 24 horas, durante 7 dias consecutivos.\n\nOrientações e Cuidados ao Tutor:\n- Agitar vigorosamente o frasco antes de cada administração para homogeneizar a suspensão.\n- Utilizar exclusivamente a seringa dosadora graduada fornecida na embalagem para medir o volume exato de 0,8 mL. NUNCA utilizar colheres domésticas ou tentar converter em gotas.\n- Administrar preferencialmente afastado de grandes refeições (preferencialmente em jejum ou sempre com o mesmo pequeno petisco de rotina, sem laticínios).\n- Jamais associar no mesmo horário com antiácidos, protetores gástricos (sucralfato), produtos lácteos ou suplementos de cálcio/ferro/zinco; manter intervalo mínimo obrigatório de pelo menos 2 horas.\n- Notificação sobre o produto: O Veraflox foi descontinuado comercialmente no Brasil pela fabricante por decisão corporativa; utilize exclusivamente frascos remanescentes dentro do prazo de validade.\n- Cumprir integralmente os 7 dias de tratamento prescritos, mesmo diante de melhora precoce dos sintomas, prevenindo a seleção de bactérias resistentes.',

    // 10. Referências Científicas Completas
    references: [
      {
        id: 'plumb-pradofloxacin-10ed',
        title: 'Pradofloxacin: Veterinary Systemic Fluoroquinolone Monograph',
        authors: 'Budde JA, McCluskey DM, Plumb DC',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 1048-1051",
        citation:
          "Budde JA, McCluskey DM, Plumb DC. Pradofloxacin. In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. p. 1048-1051.",
        sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
        evidenceLevel: 'Referência Mundial em Terapêutica Veterinária',
      },
      {
        id: 'bsava-pradofloxacin-10ed',
        title: 'Pradofloxacin: Canine and Feline Formulary Monograph',
        authors: 'Allerton F (ed.)',
        year: 2020,
        journal: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition, pp. 335-336',
        citation:
          'British Small Animal Veterinary Association. Pradofloxacin. In: BSAVA Small Animal Formulary, Part A. 10th ed. Gloucester: BSAVA; 2020. p. 335-336.',
        sourceType: 'Formulário Britânico de Animais de Companhia',
        evidenceLevel: 'Consenso Britânico de Medicina Veterinária',
      },
      {
        id: 'mueller-2007-pyoderma',
        title:
          'Pradofloxacin in the treatment of canine deep pyoderma: a multicentred, blinded, randomized parallel trial',
        authors: 'Mueller RS, Stephan B',
        year: 2007,
        journal: 'Veterinary Dermatology. 18(3):144-151',
        citation:
          'Mueller RS, Stephan B. Pradofloxacin in the treatment of canine deep pyoderma: a multicentred, blinded, randomized parallel trial. Vet Dermatol. 2007;18(3):144-151. doi: 10.1111/j.1365-3164.2007.00584.x. PMID: 17470228.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego Multicêntrico',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17470228/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1b',
      },
      {
        id: 'litster-2007-uti-cat',
        title:
          'Clinical efficacy and palatability of pradofloxacin 2.5% oral suspension for the treatment of bacterial lower urinary tract infections in cats',
        authors: 'Litster A, Moss S, Honnery M, Rees B, Edingloh M, Trott D',
        year: 2007,
        journal: 'Journal of Veterinary Internal Medicine. 21(5):990-995',
        citation:
          'Litster A, Moss S, Honnery M, Rees B, Edingloh M, Trott D. Clinical efficacy and palatability of pradofloxacin 2.5% oral suspension for the treatment of bacterial lower urinary tract infections in cats. J Vet Intern Med. 2007;21(5):990-995. doi: 10.1111/j.1939-1676.2007.tb03054.x. PMID: 17939554.',
        sourceType: 'Ensaio Clínico Prospectivo em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17939554/',
        evidenceLevel: 'Ensaio Clínico Prospectivo Nível 2b',
      },
      {
        id: 'dowers-2009-mycoplasma',
        title:
          'Use of pradofloxacin to treat experimentally induced Mycoplasma haemofelis infection in cats',
        authors: 'Dowers KL, Tasker S, Radecki SV, Lappin MR',
        year: 2009,
        journal: 'American Journal of Veterinary Research. 70(1):105-111',
        citation:
          'Dowers KL, Tasker S, Radecki SV, Lappin MR. Use of pradofloxacin to treat experimentally induced Mycoplasma haemofelis infection in cats. Am J Vet Res. 2009;70(1):105-111. doi: 10.2460/ajvr.70.1.105. PMID: 19119955.',
        sourceType: 'Ensaio Experimental Controlado com qPCR',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19119955/',
        evidenceLevel: 'Ensaio Experimental Fisiopatológico Controlado Nível 1b',
      },
      {
        id: 'hartmann-2008-urtd-cat',
        title:
          'Efficacy of pradofloxacin in cats with feline upper respiratory tract disease due to Chlamydophila felis or Mycoplasma infections',
        authors: 'Hartmann AD, Helps CR, Lappin MR, Werckenthin C, Hartmann K',
        year: 2008,
        journal: 'Journal of Veterinary Internal Medicine. 22(1):44-52',
        citation:
          'Hartmann AD, Helps CR, Lappin MR, Werckenthin C, Hartmann K. Efficacy of pradofloxacin in cats with feline upper respiratory tract disease due to Chlamydophila felis or Mycoplasma infections. J Vet Intern Med. 2008;22(1):44-52. doi: 10.1111/j.1939-1676.2007.0012.x. PMID: 18289288.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego em Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/18289288/',
        evidenceLevel: 'Ensaio Clínico Randomizado Nível 1b',
      },
      {
        id: 'boothe-2018-pkpd-dog',
        title:
          'Pharmacokinetics and pharmacodynamics of oral pradofloxacin administration in dogs',
        authors: 'Boothe DM, Bush KM, Boothe HW, Davis HA',
        year: 2018,
        journal: 'American Journal of Veterinary Research. 79(12):1268-1276',
        citation:
          'Boothe DM, Bush KM, Boothe HW, Davis HA. Pharmacokinetics and pharmacodynamics of oral pradofloxacin administration in dogs. Am J Vet Res. 2018;79(12):1268-1276. doi: 10.2460/ajvr.79.12.1268. PMID: 30457901.',
        sourceType: 'Ensaio Farmacocinético e Farmacodinâmico Canino',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30457901/',
        evidenceLevel: 'Estudo Farmacocinético / Farmacodinâmico Experimental',
      },
      {
        id: 'messias-2008-retinal-safety',
        title:
          'Retinal safety of a new fluoroquinolone, pradofloxacin, in cats: assessment with electroretinography',
        authors: 'Messias A, Gekeler F, Wegener A, Dietz K, Kohler K, Zrenner E',
        year: 2008,
        journal: 'Documenta Ophthalmologica. 116(3):177-191',
        citation:
          'Messias A, Gekeler F, Wegener A, Dietz K, Kohler K, Zrenner E. Retinal safety of a new fluoroquinolone, pradofloxacin, in cats: assessment with electroretinography. Doc Ophthalmol. 2008;116(3):177-191. doi: 10.1007/s10633-007-9081-x. PMID: 17909874.',
        sourceType: 'Estudo Toxicológico Ocular Controlado e Cego com Eletrorretinografia',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17909874/',
        evidenceLevel: 'Ensaio Toxicológico Controlado com ERG Computadorizado',
      },
      {
        id: 'iscaid-uti-guidelines-2019',
        title:
          'International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats',
        authors: 'Weese JS, Blondeau J, Boothe D, et al.',
        year: 2019,
        journal: 'The Veterinary Journal. 247:8-25',
        citation:
          'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. doi: 10.1016/j.tvjl.2019.02.008. PMID: 30971357.',
        sourceType: 'Diretriz de Consenso de Especialistas em Infectologia (ISCAID)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
        evidenceLevel: 'Consenso Internacional Padrão-Ouro ISCAID 2019',
      },
    ],

    genericBrandsNote:
      'A pradofloxacina é uma fluoroquinolona de desenvolvimento estritamente veterinário, não possuindo apresentações comercializadas na medicina humana no Brasil. Foi introduzida no mercado pela Bayer Saúde Animal (posteriormente Elanco Saúde Animal) sob a marca comercial Veraflox®, nas apresentações de comprimidos palatáveis sulcados de 15 mg, 60 mg e 120 mg e suspensão oral a 2,5% (25 mg/mL) com seringa dosadora graduada. Em 2026, a Elanco comunicou formalmente a descontinuação comercial do Veraflox no Brasil decorrente de decisão estratégica corporativa, sem qualquer vinculação a problemas de segurança ou eficácia clínica do fármaco. Unidades e lotes remanescentes distribuídos no mercado nacional dentro do prazo de validade permanecem autorizados para uso clínico sob prescrição veterinária.',

    clinicalWarningItems: [
      {
        label: 'Segurança Retiniana Comprovada em Gatos (Diferencial vs Enrofloxacina):',
        text: 'A pradofloxacina não compartilha a retinotoxicidade aguda e a cegueira irreversível causadas pela enrofloxacina em gatos. Estudos com doses até 10 vezes a dose recomendada (50 mg/kg por 23 dias) comprovaram preservação estrita do eletrorretinograma e ausência de degeneração fotorreceptora tapetal.',
      },
      {
        label: 'Contraindicação em Jovens e Animais Epilépticos:',
        text: 'Como todas as fluoroquinolonas, é contraindicada em cães jovens em crescimento rápido (< 12 meses na maioria das raças e < 18 meses em raças gigantes) e gatos com menos de 6 a 12 semanas, pelo risco de artropatia e lesões na cartilagem epifisária. Contraindicada também em pacientes com histórico de epilepsia ou convulsões devido ao antagonismo aos receptores inibitórios GABA-A.',
      },
      {
        label: 'Descontinuação Comercial e Princípios de Stewardship Antimicrobiano:',
        text: 'O produto comercial de referência (Veraflox) foi descontinuado no Brasil pela Elanco por decisão comercial. Frascos remanescentes dentro da validade podem ser empregados. Por ser uma fluoroquinolona de 3ª geração de importância crítica, deve ser reservada para infecções com diagnóstico microbiológico e antibiograma, ou quando drogas de primeira linha forem ineficazes.',
      },
    ],

    relatedDiseaseSlugs: [
      'doencas-trato-urinario-inferior-felino-dtuif',
      'prostatite-caes-gatos',
      'bronquite-cronica-caes-gatos',
      'micoplasmoses-hemotropicas',
    ],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const pradofloxacinaMedicationRecord = pradofloxacinaMedicationsSeed[0];
