import type { MedicationRecord } from '../../types/medication';

export const enrofloxacinaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-enrofloxacina',
    slug: 'enrofloxacina',
    title: 'Enrofloxacina',
    activeIngredient: 'Enrofloxacina / Enrofloxacino',
    pharmacologicClass:
      'Antibacteriano bactericida da classe das fluoroquinolonas (inibidor da DNA-girase e topoisomerase IV); ação concentração-dependente',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Enrofloxacina',
      'Enrofloxacino',
      'Fluoroquinolonas',
      'Baytril',
      'Zelotril',
      'Flotril',
      'Pielonefrite',
      'Prostatite Canina',
      'Pseudomonas',
      'ISCAID',
      'Retinotoxicidade Felina',
      'Bactericida Concentração-Dependente',
    ],
    tradeNames: [
      'Baytril® Flavour Comprimidos 15 mg, 50 mg, 150 mg e 250 mg (Elanco Saúde Animal)',
      'Baytril® Injetável 5% (50 mg/mL) (Elanco Saúde Animal)',
      'Zelotril® Comprimidos Palatáveis 50 mg e 150 mg (Agener União)',
      'Flotril® Comprimidos 50 mg e 150 mg / Injetável (MSD Saúde Animal)',
      'Enropet® Comprimidos 50 mg e 150 mg (Ceva Saúde Animal)',
      'Chemitril® Comprimidos 50 mg e 150 mg / Injetável (Chemitec)',
    ],
    officialSiteUrl: 'https://vet.elanco.com/br/produtos/baytril',
    leafletUrl: 'https://vet.elanco.com/br/produtos/baytril',
    mechanismOfAction:
      'A enrofloxacina é uma fluoroquinolona bactericida sintética de segunda geração que penetra nas células bacterianas através de porinas de membrana externa e difusão passiva. No citoplasma bacteriano, atua ligando-se e estabilizando o complexo intermediário clivado formado entre o DNA bacteriano e as enzimas topoisomerases tipo II (DNA-girase, composta pelas subunidades GyrA e GyrB) e tipo IV (subunidades ParC e ParE). Ao impedir a religação das fitas de DNA após a clivagem fisiológica necessária para aliviar as tensões de superenrolamento durante a replicação e transcrição, a enrofloxacina induz quebras cromossômicas irreversíveis em fita dupla. Isso paralisa as forquilhas de replicação, interrompe a síntese de RNA mensageiro e proteínas, desencadeia a resposta SOS bacteriana descontrolada e culmina na fragmentação letal do cromossomo bacteriano em 20 a 30 minutos de exposição. Nas bactérias Gram-negativas, o alvo primário mais suscetível é a DNA-girase, enquanto na maioria dos cocos Gram-positivos a topoisomerase IV atua como alvo primário ou concorrente. A morte celular é estritamente concentração-dependente, apresentando índices farmacodinâmicos preditores de eficácia clínica correlacionados à relação Cmax/MIC (idealmente entre 8 e 12) e à área sob a curva nas 24 horas sobre a MIC (AUC24/MIC superior a 100 a 125 para bacilos Gram-negativos). Apresenta ainda expressivo efeito pós-antibiótico (PAE), suprimindo a retomada do crescimento bacteriano residual mesmo após a concentração sérica declinar temporariamente abaixo da MIC.',
    plainLanguageSummary:
      'A enrofloxacina é um antibiótico veterinário bactericida potente, pertencente à família das fluoroquinolonas, especialmente indicado para infecções bacterianas graves causadas por germes Gram-negativos (como Escherichia coli, Proteus, Klebsiella e Pseudomonas) e bactérias intracelulares como Mycoplasma. Ela tem excelente penetração em tecidos difíceis, alcançando altas concentrações em rins, próstata, pulmões e pele. PONTOS CRÍTICOS DE PLANTÃO: 1) TETO MÁXIMO INEGOCIÁVEL EM GATOS: A dose em felinos NUNCA deve ultrapassar 5 mg/kg por dia. Doses mais altas causam toxicidade na retina com cegueira aguda que pode ser irreversível. Se notar pupilas dilatadas (midríase) no gato, suspenda o medicamento imediatamente. 2) PROIBIDO EM FILHOTES EM CRESCIMENTO: Causa lesões e erosões na cartilagem das articulações em filhotes de cães (evitar até 8 meses em portes pequenos/médios, até 12 meses em portes grandes e até 18 meses em raças gigantes). 3) AÇÃO CONCENTRAÇÃO-DEPENDENTE: O antibiótico funciona pela força da dose máxima diária em relação à bactéria; a administração uma vez ao dia (q24h) é a mais recomendada farmacologicamente, e subdosar é contraproducente. 4) NÃO COBRE BACTÉRIAS ANAERÓBIAS NEM ENTEROCOCOS: Não deve ser usada como antibiótico universal para qualquer infecção. 5) SEPARAR DE MINERAIS POR 2 HORAS: Antiácidos, suplementos de cálcio, ferro, zinco, magnésio e sucralfato grudam na enrofloxacina no estômago e impedem sua absorção.',

    indications: [
      'Pielonefrite bacteriana aguda e crônica em cães e gatos, sobretudo diante de isolados de enterobactérias Gram-negativas comprovadamente suscetíveis em cultura urinária.',
      'Prostatite bacteriana canina aguda e crônica e abscessos prostáticos, devido à alta penetração e aprisionamento no parênquima prostático através da barreira hemato-prostática.',
      'Infecções graves do trato respiratório inferior (pneumonias bacterianas e broncopneumonias graves por Gram-negativos e Mycoplasma spp.), frequentemente associada a beta-lactâmicos para cobertura de anaeróbios.',
      'Infecções cutâneas profundas graves, piodermites complicadas, celulites e otites médias/internas associadas a Pseudomonas aeruginosa ou bacilos Gram-negativos multirresistentes a antibióticos de primeira linha.',
      'Colite ulcerativa histiocítica / granulomatosa associada a cepas invasivas intramucosas de Escherichia coli em cães (particularmente em raças predispostas como Boxer e Bulldog Francês).',
      'Infecções sistêmicas e febre associada a bacteremia por patógenos Gram-negativos suscetíveis em ambiente de internação ou emergência.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida à enrofloxacina, ciprofloxacina ou a qualquer antibacteriano da classe das fluoroquinolonas.',
      'Uso em gatos em doses superiores a 5 mg/kg/dia (risco iminente de degeneração fotorreceptora da retina, retinopatia tóxica e cegueira permanente).',
      'Cães jovens durante a fase de crescimento esquelético rápido: contraindicado em portes pequeno e médio até 8 meses de idade; portes grandes até 12 meses; raças gigantes até 18 meses de idade (risco de artropatia cartilagínea bolhosa e erosões articulares permanentes).',
      'Infecções comprovadas ou suspeitas por Streptococcus canis (contraindicação formal pela literatura e pelo Plumb devido ao risco de precipitação de fasceíte necrosante fatal induzida pelo fármaco).',
      'Monoterapia empírica em infecções bacterianas causadas primariamente por bactérias anaeróbias estritas (como Bacteroides spp. e Clostridium spp.) ou Enterococcus spp., nas quais a enrofloxacina não apresenta atividade clínica útil.',
      'Uso profilático rotineiro ou em cistites bacterianas simples esporádicas não complicadas onde antimicrobianos de espectro direcionado de primeira escolha (como amoxicilina ou sulfas) forem adequados.',
    ],

    cautions: [
      'Vigilância oftálmica rigorosa em felinos: orientar o tutor a inspecionar diariamente o diâmetro pupilar. Midríase persistente, perda de reflexo pupilar à luz ou esbarrões em obstáculos exigem suspensão imediata e avaliação oftalmológica emergencial.',
      'Pacientes epilépticos ou com histórico de crises convulsivas: as fluoroquinolonas atuam como antagonistas fracos dos receptores GABA no sistema nervoso central, reduzindo o limiar convulsivo, especialmente se associadas a AINEs.',
      'Manter hidratação e volemia adequadas durante todo o curso terapêutico para prevenir risco teórico de cristalúria e deposição tubular.',
      'Separação posológica de pelo menos 2 horas em relação a quelantes de fósforo, antiácidos com alumínio/magnésio, carbonato de cálcio, sulfato ferroso, sucralfato e sais de zinco.',
      'A enrofloxacina injetável comercial possui pH fortemente alcalino (~11); injeções intramusculares ou subcutâneas podem causar dor intensa, reação inflamatória e necrose tecidual estéril.',
      'A via intravenosa não deve ser administrada em bólus rápido nem diluída indiscriminadamente em soluções cristaloides sem técnica asséptica em linha exclusiva, pelo risco de incompatibilidade física e formação de microprecipitados.',
    ],

    adverseEffects: [
      'Distúrbios gastrintestinais comuns (vômito, anorexia, náusea e diarreia), secundários à irritação direta da mucosa ou disbiose entérica.',
      'Degeneração retiniana aguda com midríase e cegueira em felinos, associada a doses elevadas (> 5 mg/kg/dia) ou susceptibilidade individual exacerbada.',
      'Dor acentuada, tumefação, eritema e necrose estéril no sítio de injeção parenteral de formulações alcalinas.',
      'Artropatia articular em cães em fase de crescimento rápido, manifestada por claudicação, dor articular e derrames sinoviais decorrentes de vesículas na cartilagem epifisária.',
      'Manifestações neuroexcitatórias raras (tremores, agitação psicomotora, ataxia e despolarizações epileptiformes em pacientes predispostos).',
      'Elevação transitória e reversível de enzimas hepáticas (ALT, fosfatase alcalina) e raros relatos de hipersensibilidade cutânea ou cristalúria.',
    ],

    routes: ['oral', 'im', 'sc', 'iv'],

    doses: [
      {
        id: 'dose-enrofloxacina-cao-padrao',
        species: 'dog',
        indication:
          'Infecções bacterianas sistêmicas gerais suscetíveis em cães (pele, tecidos moles, trato respiratório)',
        doseMin: 5,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '7 a 14 dias (manter por pelo menos 2 a 3 dias após remissão clínica completa)',
        notes:
          'Administrar preferencialmente em jejum; se houver vômito, fornecer com pequena quantidade de alimento não lácteo. A dose pode ser ajustada conforme gravidade e MIC.',
        clinicalContext:
          'Uso direcionado com base em cultura e antibiograma, respeitando os princípios de uso racional de antimicrobianos críticos.',
        monitoring:
          'Monitorar resolução dos sinais clínicos inflamatórios e tolerância gastrintestinal. Em tratamentos > 14 dias, acompanhar enzimas hepáticas e função renal.',
        calculatorEnabled: true,
        referenceIds: ['plumb-enrofloxacin-10ed', 'bsava-formulary-enrofloxacin-10ed'],
        evidenceLevel: 'Bula Oficial MAPA / Padrão-Ouro Farmacológico Plumb 10ª ed.',
      },
      {
        id: 'dose-enrofloxacina-cao-profundo',
        species: 'dog',
        indication:
          'Pielonefrite bacteriana, prostatite crônica, infecções por Pseudomonas aeruginosa e colite granulomatosa canina',
        doseMin: 10,
        doseMax: 20,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: 'Pielonefrite: 10 a 14 dias | Prostatite: 4 a 6 semanas | Colite: até 8 semanas',
        notes:
          'A faixa superior de 10 a 20 mg/kg q24h é necessária em cães para garantir relação Cmax/MIC e AUC/MIC adequadas em tecidos com barreira ou patógenos de maior MIC.',
        clinicalContext:
          'ISCAID recomenda doses elevadas no extremo superior para prostatite e pielonefrite canina, assegurando bactericidia profunda.',
        monitoring:
          'Urocultura seriada, urinálise, ultrassonografia prostática/renal e acompanhamento hematológico e bioquímico.',
        calculatorEnabled: true,
        referenceIds: ['iscaid-uti-guidelines-2019', 'plumb-enrofloxacin-10ed', 'westropp-2012-enro'],
        evidenceLevel: 'Diretriz de Consenso Internacional ISCAID 2019',
      },
      {
        id: 'dose-enrofloxacina-gato-teto',
        species: 'cat',
        indication:
          'Infecções bacterianas sistêmicas suscetíveis em felinos (pele, trato urinário superior, sistema respiratório)',
        doseMin: 5,
        doseMax: 5,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Oral',
        frequency: 'A cada 24 horas (q24h)',
        duration: '7 a 14 dias (conforme resposta clínica e foco)',
        notes:
          'TETO MÁXIMO ABSOLUTO DE SEGURANÇA: 5 mg/kg por dia. NUNCA ultrapassar essa dose em gatos. Se o patógeno apresentar MIC que exija doses maiores, trocar de classe antimicrobiana (ex.: pradofloxacina).',
        clinicalContext:
          'Reservar para situações onde antibiograma demonstre suscetibilidade exclusiva ou falha documentada de classes de menor risco.',
        monitoring:
          'Inspeção diária do diâmetro pupilar e acuidade visual do felino. Suspender imediatamente se houver midríase.',
        calculatorEnabled: true,
        referenceIds: ['gelatt-2001-retinal', 'ford-2007-enro-cat', 'ramirez-2011-abcg2'],
        evidenceLevel: 'Consenso Internacional de Segurança Felina / Plumb 10ª ed.',
      },
      {
        id: 'dose-enrofloxacina-injetavel-hospitalar',
        species: 'both',
        indication:
          'Terapia antimicrobiana injetável de início rápido em pacientes internados (sepse por Gram-negativos)',
        doseMin: 5,
        doseMax: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intramuscular ou Intravenosa Lenta',
        frequency: 'A cada 24 horas (q24h) [Gatos estritamente 5 mg/kg]',
        duration: 'Fase inicial parenteral até estabilização para via oral',
        notes:
          'Injetável 5% (50 mg/mL). A via IM pode causar dor. Se IV: administrar em linha separada com infusão lenta; NUNCA misturar com fluidos contendo cálcio ou magnésio.',
        clinicalContext:
          'Em sepse grave, associar com aminopenicilina potencializada ou clindamicina para garantir espectro anaeróbio e Gram-positivo.',
        monitoring:
          'Pressão arterial sistêmica, ausência de flebite ou dor no local e estabilização de parâmetros hemodinâmicos.',
        calculatorEnabled: true,
        referenceIds: ['plumb-enrofloxacin-10ed', 'bsava-formulary-enrofloxacin-10ed'],
        evidenceLevel: 'Prática de Medicina Intensiva e Formulário BSAVA',
      },
    ],

    presentations: [
      {
        id: 'pres-enrofloxacina-comp-50mg',
        label: 'Comprimidos Palatáveis 50 mg (Baytril / Zelotril / Flotril / Enropet)',
        form: 'Comprimidos orais palatáveis bissulcados',
        concentrationValue: 50,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 a 20 comprimidos palatáveis',
        route: 'Oral',
        scoringInfo: 'Comprimido com vinco central facilitando divisão precisa em duas metades de 25 mg',
        channel: 'veterinary',
      },
      {
        id: 'pres-enrofloxacina-comp-150mg',
        label: 'Comprimidos Palatáveis 150 mg (Baytril / Zelotril / Flotril / Enropet)',
        form: 'Comprimidos orais palatáveis sulcados',
        concentrationValue: 150,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 comprimidos palatáveis para cães médios e grandes',
        route: 'Oral',
        scoringInfo: 'Bissulcado em 4 partes de 37,5 mg ou sulco simples em duas metades de 75 mg',
        channel: 'veterinary',
      },
      {
        id: 'pres-enrofloxacina-comp-15mg',
        label: 'Baytril® Flavour Comprimidos 15 mg (Uso Veterinário para Cães Pequenos e Gatos)',
        form: 'Comprimidos orais aromatizados',
        concentrationValue: 15,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 comprimidos de 15 mg',
        route: 'Oral',
        scoringInfo: 'Comprimido de baixa dosagem ideal para gatos de 3 kg e cães miniatura',
        channel: 'veterinary',
      },
      {
        id: 'pres-enrofloxacina-comp-250mg',
        label: 'Baytril® Flavour Comprimidos 250 mg (Uso Veterinário para Cães Grandes)',
        form: 'Comprimidos orais aromatizados',
        concentrationValue: 250,
        concentrationUnit: 'mg',
        packInfo: 'Cartucho com 10 comprimidos de 250 mg',
        route: 'Oral',
        scoringInfo: 'Ideal para cães de grande porte (> 25 a 50 kg)',
        channel: 'veterinary',
      },
      {
        id: 'pres-enrofloxacina-inj-50mg-ml',
        label: 'Enrofloxacina Solução Injetável 5% (50 mg/mL) (Baytril / Flotril / Chemitril)',
        form: 'Solução injetável estéril translúcida',
        concentrationValue: 50,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco-ampola de vidro âmbar com 10 mL, 20 mL ou 50 mL',
        route: 'Injetável (IM / IV lenta)',
        scoringInfo: 'Líquido para aspiração em seringa graduada (1 mL = 50 mg de enrofloxacina)',
        channel: 'veterinary',
      },
    ],

    // 1. Pilares Terapêuticos Fundamentais
    pillars: [
      {
        title: 'Bactericidia Concentração-Dependente',
        icon: 'Zap',
        desc: 'A eficácia antimicrobiana e a erradicação bacteriana relacionam-se diretamente à magnitude do pico plasmático (Cmax/MIC) e à exposição total (AUC24/MIC), favorecendo posologias de dose diária única (q24h). Subdosar seleciona resistência.',
      },
      {
        title: 'Penetração Tecidual Ampla e Intracelular',
        icon: 'Layers',
        desc: 'Alta lipofilia, comportamento zwitteriônico e baixo peso molecular permitem excelente difusão para parênquima renal, tecido prostático através de barreiras biológicas, líquido epitelial pulmonar, macrófagos e pele.',
      },
      {
        title: 'Espectro Gram-Negativo Potente com Lacunas Críticas',
        icon: 'ShieldAlert',
        desc: 'Altamente eficaz contra Enterobacterales e Pseudomonas suscetíveis. Não possui cobertura contra bactérias anaeróbias estritas e apresenta ação ineficaz contra Enterococcus spp. e muitos Streptococcus spp.',
      },
      {
        title: 'Teto Posológico Felino Inegociável (5 mg/kg/dia)',
        icon: 'EyeOff',
        desc: 'Particularidades moleculares no transportador ABCG2 da barreira hematorretiniana felina reduzem o efluxo de enrofloxacina, levando a acúmulo foto-reativo na retina, estresse oxidativo e degeneração retiniana irreversível com cegueira.',
      },
    ],

    quickSummaryHighlights: [
      'Fluoroquinolona bactericida de 2ª geração',
      'Ação concentração-dependente (Cmax/MIC)',
      'Metabólito ativo: Ciprofloxacina (10-40%)',
      'Teto máximo felino: 5 mg/kg/dia inegociável',
      'Risco de cegueira e midríase em gatos',
      'Contraindicado em filhotes em crescimento rápido',
      'Proibido em infecções por Streptococcus canis',
      'Cães: 5 a 20 mg/kg q24h conforme foco e MIC',
      'Excelente penetração em próstata e rins',
      'Incompatível IV com fluidos contendo Ca e Mg',
      'Separar 2 horas de minerais e antiácidos orais',
    ],

    // 2. Indicações Rápidas
    quickIndications: [
      {
        condition: 'Pielonefrite Bacteriana Canina (ISCAID)',
        species: 'dog',
        doseSummary: '10 a 20 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '10 a 14 dias',
        clinicalContext:
          'Opção de primeira linha em cães com envolvimento de parênquima renal por enterobactérias, ajustando após antibiograma.',
      },
      {
        condition: 'Prostatite Bacteriana Canina Aguda e Crônica',
        species: 'dog',
        doseSummary: '10 a 20 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '4 a 6 semanas',
        clinicalContext:
          'Ultrapassa a barreira hemato-prostática em virtude de sua lipofilia e pKa, mantendo níveis bactericidas no parênquima.',
      },
      {
        condition: 'Pneumonia Bacteriana Grave por Gram-Negativos',
        species: 'both',
        doseSummary: 'Cão: 5 a 20 mg/kg q24h | Gato: máximo 5 mg/kg q24h',
        route: 'Oral ou Injetável',
        duration: '7 a 14 dias',
        clinicalContext:
          'Associar com beta-lactâmico ou clindamicina para garantir espectro sobre anaeróbios e Gram-positivos.',
      },
      {
        condition: 'Colite Granulomatosa / Histiocítica em Cães',
        species: 'dog',
        doseSummary: '10 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        duration: '8 semanas',
        clinicalContext:
          'Específico para cepas invasivas intramucosas de E. coli em cães Boxer e Bulldog Francês com remissão histológica.',
      },
    ],

    // 3. Indicações Detalhadas
    detailedIndications: [
      {
        id: 'ind-enro-pielonefrite',
        indication: 'Pielonefrite bacteriana aguda e crônica em pequenos animais',
        clinicalContext:
          'A infecção do parênquima e da pelve renal exige fármacos que alcancem altas concentrações não apenas na luz urinária, mas no interstício medular e cortical renal. A maioria das pielonefrites decorre de infecção ascendente por bacilos Gram-negativos da família Enterobacteriaceae (principalmente E. coli e Klebsiella spp.). O consenso internacional da ISCAID preconiza o uso de fluoroquinolonas como base empírica imediata enquanto se aguarda urocultura por cistocentese.',
        species: 'both',
        dose: 'Cão: 10 a 20 mg/kg VO q24h | Gato: estritamente 5 mg/kg VO q24h',
        route: 'Oral (ou injetável no início hospitalar)',
        frequency: 'A cada 24 horas (dose única diária concentração-dependente)',
        duration: '10 a 14 dias em cursos não complicados',
        mechanismOfAction:
          'Inibição da DNA-girase e topoisomerase IV bacterianas, interrompendo a replicação do cromossomo e provocando morte celular bactericida rápida com amplo efeito pós-antibiótico.',
        clinicalRationale:
          'A enrofloxacina concentra-se no tecido renal em níveis muito superiores aos plasmáticos e é ativamente excretada por filtração glomerular e secreção tubular, promovendo esterilização rápida do parênquima e do trato urinário coletor.',
        monitoring:
          'Hemograma completo, ureia, creatinina e urinálise. Reavaliação clínica mandatória em 72 horas (se persistir febre ou piora da azotemia, suspeitar de resistência bacteriana ou obstrução ureteral). Urocultura de controle 7 a 14 dias após término da antibioticoterapia.',
        referenceIds: ['iscaid-uti-guidelines-2019', 'plumb-enrofloxacin-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional Padrão-Ouro ISCAID 2019',
      },
      {
        id: 'ind-enro-prostatite',
        indication: 'Prostatite bacteriana canina aguda e crônica e abscessos prostáticos',
        clinicalContext:
          'A próstata canina é protegida pela barreira hemato-prostática, formada por junções endoteliais intercelulares oclusivas. Embora a inflamação aguda aumente a permeabilidade, na prostatite crônica ou durante a melhora clínica a barreira restabelece sua integridade, impedindo a penetração de antibióticos hidrofílicos ou ionizados. A enrofloxacina, por ser altamente lipofílica e atuar como zwitterion neutro em pH fisiológico, atravessa a barreira e atinge concentrações prostáticas superiores às séricas.',
        species: 'dog',
        dose: '10 a 20 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: 'Aguda: 4 semanas | Crônica: 4 a 6 semanas',
        mechanismOfAction:
          'Bloqueio enzimático da síntese de DNA bacteriano no ácino e interstício prostático.',
        clinicalRationale:
          'É considerada por consensos de infectologia e reprodução como uma das melhores opções terapêuticas para erradicação de bacilos Gram-negativos intraprostáticos. Em machos não castrados, o manejo deve ser acompanhado de castração eletiva ou bloqueio hormonal de hiperplasia prostática benigna de base para evitar recidiva bacteriana.',
        monitoring:
          'Ultrassonografia prostática periódica, citologia e cultura de líquido prostático ou urina colhida por cateterismo pós-massagem prostática.',
        referenceIds: ['plumb-enrofloxacin-10ed', 'bsava-formulary-enrofloxacin-10ed'],
        evidenceLevel: 'Compêndio de Farmacologia Padrão-Ouro Plumb 10ª ed.',
      },
      {
        id: 'ind-enro-colite-histiocitica',
        indication: 'Colite granulomatosa / histiocítica invasiva associada a E. coli em cães',
        clinicalContext:
          'Doença inflamatória crônica e debilitante do cólon de cães das raças Boxer e Bulldog Francês caracterizada por infiltração intramucosa intensa de macrófagos contendo bactérias PAS-positivas (cepas aderentes e invasivas de Escherichia coli - AIEC). A remissão clínica depende da erradicação bacteriana intracelular.',
        species: 'dog',
        dose: '10 mg/kg VO a cada 24 horas (q24h)',
        route: 'Oral',
        frequency: 'A cada 24 horas',
        duration: '8 semanas contínuas',
        mechanismOfAction:
          'A enrofloxacina concentra-se maciçamente no interior de macrófagos e fagócitos teciduais, atingindo concentrações intracelulares letais para as bactérias invasoras protegidas no citoplasma.',
        clinicalRationale:
          'É o único tratamento clínico capaz de induzir remissão duradoura e cicatrização da mucosa colônica nessa enfermidade genética. É fundamental confirmar a suscetibilidade da cepa de E. coli por biópsia colônica antes de iniciar ou logo no início da terapia para evitar falhas por resistência adquirida.',
        monitoring:
          'Escore de consistência fecal, ganho de peso, resolução de hematoquezia e muco nas fezes.',
        referenceIds: ['plumb-enrofloxacin-10ed'],
        evidenceLevel: 'Estudos Clínicos Específicos em Cães de Raça e Plumb 10ª ed.',
      },
    ],

    // 4. Farmacocinética Comparativa
    pharmacokineticsData: {
      absorption:
        'Excelente absorção entérica após administração oral em cães, com biodisponibilidade sistêmica de aproximadamente 80% (cerca de duas vezes superior à absorção oral errática da ciprofloxacina na mesma espécie). O pico de concentração plasmática (Cmax) ocorre dentro de 1 hora, alcançando 50% do pico em cerca de 15 minutos. A presença de alimento comum no estômago reduz ligeiramente a velocidade de absorção (aumentando o Tmax), mas não diminui a extensão total absorvida (AUC inalterada). Em gatos adultos hígidos que recebem 5 mg/kg VO, o Cmax sérico médio atinge cerca de 2,9 mcg/mL com AUC de aproximadamente 21,4 mcg h/mL. A presença de cátions divalentes e trivalentes (cálcio, magnésio, alumínio, ferro) inibe a absorção de forma severa por quelação intraluminal insolúvel.',
      distribution:
        'Volume de distribuição aparente elevado (Vd de 2,5 a 4,0 L/kg em cães), refletindo extraordinária capacidade de penetração e acúmulo tissular e intracelular. Baixa taxa de ligação a proteínas plasmáticas (aproximadamente 27% em cães e 36% em gatos), mantendo alta fração livre ativa disponível para difusão biológica. Atinge concentrações teciduais que superam as concentrações séricas no parênquima renal, tecido prostático, líquido epitelial alveolar pulmonar, fígado, bile e dentro de macrófagos e polimorfonucleares. Penetra moderadamente a barreira hematoencefálica, atingindo cerca de 6% a 10% da concentração sérica no líquor de animais hígidos, aumentando significativamente na presença de meningite inflamatória.',
      metabolism:
        'Metabolização hepática primária por enzimas microssomais com desidrogenação e desalquilação. Seu metabólito principal é a ciprofloxacina, que é antimicrobianamente ativa e dotada de perfil bactericida potente. Cerca de 10% a 40% da enrofloxacina circulante é biotransformada em ciprofloxacina em cães e gatos, gerando uma exposição antimicrobiana bactericida conjunta (enrofloxacina mais ciprofloxacina). Importante: a ciprofloxacina humana comercial não é intercambiável miligrama por miligrama em cães e gatos, devido à biodisponibilidade oral errática e baixa da ciprofloxacina pura em carnívoros.',
      elimination:
        'Eliminação mista equilibrada: renal (por filtração glomerular e secreção tubular ativa) e hepatobiliar/fecal. Cerca de 15% a 50% do fármaco é excretado inalterado na urina, garantindo concentrações urinárias massivas e altamente terapêuticas contra uropatógenos. A meia-vida de eliminação plasmática terminal (t1/2) é de 2 a 5 horas em cães e aproximadamente 6 horas em gatos. Apesar da meia-vida curta, a ação bactericida concentração-dependente e o marcante efeito pós-antibiótico (PAE) sustentam o sucesso clínico de intervalos posológicos de 24 horas (q24h).',
      cnsPenetration:
        'Penetração moderada a boa no parênquima cerebral e líquor (6% a 10% dos níveis séricos basais, com incremento importante em quadros de meningoencefalite bacteriana inflamatória).',
      plasmaBinding:
        'Baixa ligação proteica: cerca de 27% em cães e 36% em gatos, majoritariamente ligada à albumina plasmática.',
      halfLife:
        'Meia-vida de eliminação plasmática de 2 a 5 horas no cão e aproximadamente 6 horas no gato.',
    },

    // 5. Informações Gerais
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (comprimidos palatáveis ou solução oral)',
          technique:
            'Administrar preferencialmente em jejum estomacal para maximizar a velocidade de absorção e o pico sérico (Cmax). Caso o paciente apresente vômito ou intolerância gástrica, pode ser administrado junto com pequena quantidade de alimento não lácteo (sem queijos, leite ou iogurte). Separar por pelo menos 2 horas de qualquer suplemento mineral ou protetor gástrico.',
          nursingCare:
            'Confirmar a deglutição completa do comprimido. Em gatos, administrar pequeno volume de água (2 a 3 mL) logo após a cápsula ou comprimido para prevenir retenção esofágica. Monitorar apetite e fezes.',
          limitations:
            'Proibido fracionar doses de comprimidos de forma imprecisa em animais muito pequenos; utilizar apresentações de 15 mg ou formulações líquidas manipuladas idôneas.',
        },
        {
          route: 'Intramuscular (IM) e Subcutânea (SC)',
          technique:
            'A solução injetável de enrofloxacina é fortemente alcalina (pH ~11). Se administrada por via IM, aplicar profundamente em musculatura volumosa (quadríceps ou epaxiais), alternando os sítios anatômicos a cada injeção. A via SC é aceita apenas quando expressamente autorizada pela bula da formulação comercial específica, devido ao risco de celulite e necrose cutânea estéril.',
          nursingCare:
            'Observar rigidez local, edema, claudicação e dor à palpação pós-aplicação. Nunca injetar volumes superiores a 2,5 a 5 mL no mesmo sítio.',
          limitations:
            'Evitar injeções repetidas por mais de 3 dias consecutivos pelo risco de abcessos estéreis e necrose muscular.',
        },
        {
          route: 'Intravenosa Lenta (IV)',
          technique:
            'USO HOSPITALAR COM EXTREMA CAUTELA: Incompatível fisicamente com diluições 1:1 em Cloreto de Sódio 0,9%, Ringer Lactato, Plasma-Lyte A e HES 6%. O contato com soluções contendo cálcio ou magnésio gera microprecipitados insolúveis descritos como causa de morbidade e mortalidade por embolia pulmonar microvascular. Se a via IV for indispensável: utilizar linha venosa exclusiva ou infundir lentamente ao longo de 30 a 45 minutos em carreador compatível estrito.',
          nursingCare:
            'Infundir em velocidade muito lenta, monitorando frequência cardíaca e pressão arterial. A injeção em bólus rápido deflagra hipotensão severa, colapso circulatório e desgranulação de mastócitos com liberação massiva de histamina.',
          limitations:
            'Proibido bólus intravenoso rápido em qualquer espécie animal.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: 'Fluoroquinolona sintética derivada do ácido nalidíxico',
        chemicalClassDescription:
          'Composto heterocíclico fluorado apresentando núcleo central 4-quinolona com flúor na posição C6 e anel piperazinil na posição C7, conferindo lipofilia, anfoterismo e ação contra Gram-negativos.',
        therapeuticClass: 'Antibacteriano bactericida sistêmico concentração-dependente',
        therapeuticClassDescription:
          'Agente quimioterápico bactericida de amplo espectro direcionado primariamente a bacilos Gram-negativos aeróbios e Mycoplasma.',
        detailedTargets: [
          {
            target: 'DNA-girase bacteriana (Topoisomerase II bacteriana - GyrA/GyrB)',
            action: 'Estabilização do complexo de clivagem DNA-enzima impedindo religação',
            clinicalSignificance:
              'Alvo principal em bactérias Gram-negativas; provoca quebras duplas irreversíveis no cromossomo bacteriano.',
          },
          {
            target: 'Topoisomerase IV bacteriana (ParC/ParE)',
            action: 'Interferência na decatenação e segregação das moléculas-filhas de DNA circular',
            clinicalSignificance:
              'Alvo primário ou cooperante em bactérias Gram-positivas, impedindo a divisão bacteriana.',
          },
          {
            target: 'Transportador ABCG2 na barreira hematorretiniana felina',
            action: 'Substituições aminoacídicas reduzem o efluxo fisiológico do fármaco para fora da retina',
            clinicalSignificance:
              'Mecanismo molecular da retinotoxicidade e cegueira específica em gatos expostos a doses acima de 5 mg/kg.',
          },
        ],
      },
      prescriptionType: {
        category: 'Receituário Veterinário Simples (Medicamento de Tarja Vermelha sob Prescrição)',
        ordinanceOrLaw: 'Legislação MAPA para Medicamentos Veterinários Antimicrobianos',
        retentionRequired: false,
        guidelines:
          'Medicamentos veterinários à base de enrofloxacina aprovados pelo MAPA são prescritos em Receituário Veterinário Simples em uma via entregue ao tutor. A regra de retenção de receita em 2 vias na farmácia (RDC Anvisa 471/2021) aplica-se exclusivamente a antibacterianos de linha humana dispensados em drogarias comunitárias.',
      },
      speciesPeculiarities: [
        {
          species: 'cat',
          title: 'Retinotoxicidade Espécie-Específica e o Teto Inegociável de 5 mg/kg/dia',
          description:
            'Gatos possuem quatro mutações pontuais evolutivas na sequência de aminoácidos do transportador de efluxo ABCG2 localizado nas células endoteliais da barreira hematorretiniana. Isso torna o transportador ineficiente em bombear a enrofloxacina de volta para o sangue. Como a enrofloxacina é uma molécula foto-reativa, seu acúmulo na retina sob iluminação ambiente gera espécies reativas de oxigênio (ROS), peroxidação lipídica e necrose coagulativa dos fotorreceptores (cones e bastonetes) da camada nuclear externa. Doses superiores a 5 mg/kg/dia ou terapia em felinos geriátricos/debilitados podem deflagrar midríase aguda, cegueira bilateral e degeneração tapetal difusa irreversível.',
          clinicalImplications:
            'NUNCA prescrever mais que 5 mg/kg a cada 24 horas para gatos. Se houver falha terapêutica ou MIC bacteriana elevada, migrar para outra fluoroquinolona mais segura em felinos (como a pradofloxacina) ou trocar de classe antibacteriana. Orientar o tutor a suspender o tratamento ao primeiro sinal de dilatação pupilar mantida.',
        },
        {
          species: 'dog',
          title: 'Artropatia e Toxicidade Cartilagínea em Animais em Crescimento',
          description:
            'Em cães jovens que passam pelo estirão de crescimento esquelético rápido, as fluoroquinolonas formam quelatos de magnésio na matriz cartilaginosa em proliferação, inibindo a síntese de colágeno e proteoglicanos pelos condrócitos. Isso resulta na formação de vesículas e lesões bolhosas na cartilagem articular de superfícies que suportam carga, levando a erosões permanentes, artralgia e claudicação incapacitante.',
          clinicalImplications:
            'Contraindicado formalmente em cães até 8 meses (portes miniatura, pequeno e médio), até 12 meses (porte grande) e até 18 meses (raças gigantes). Em cães adultos, respeitar a faixa posológica de 5 a 20 mg/kg q24h conforme a MIC e o foco infeccioso.',
        },
      ],
    },

    // 6. Atenção, Precauções e Interações
    attentionData: {
      attentionSubtitle:
        'Vigilância de Retinotoxicidade Felina, Danos Articulares em Jovens e Incompatibilidades Parenterais',
      precautions: [
        {
          condition: 'Gatos recebendo doses superiores a 5 mg/kg/dia',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'O acúmulo retiniano decorrente da deficiência funcional do transportador ABCG2 causa degeneração oxidativa fototóxica irreversível dos fotorreceptores da retina.',
          clinicalAction:
            'Contraindicação absoluta. Limitar estritamente a 5 mg/kg/dia. Se houver suspeita de toxicidade (midríase, reflexo fotomotor ausente), descontinuar imediatamente e avaliar fundo de olho.',
        },
        {
          condition: 'Cães jovens em fase de crescimento esquelético',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Quelação de magnésio na cartilagem epifisária articular em proliferação induz necrose de condrócitos, formação de bolhas cartilaginosas e erosões articulares irreversíveis.',
          clinicalAction:
            'Contraindicado em cães < 8 meses (pequeno/médio porte), < 12 meses (grande porte) e < 18 meses (raças gigantes). Selecionar classes alternativas seguras (como aminopenicilinas ou cefalosporinas).',
        },
        {
          condition: 'Infecção por Streptococcus canis (ou suspeita clínica)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Relatos consolidados na literatura e advertência explícita no compêndio Plumb associam o uso de enrofloxacina em infecções por Streptococcus canis ao desencadeamento de fasceíte necrosante fulminante induzida pelo fármaco.',
          clinicalAction:
            'Contraindicado. Em infecções cutâneas ou de tecidos moles estreptocócicas, utilizar beta-lactâmicos (ampicilina, amoxicilina-clavulanato) ou clindamicina.',
        },
        {
          condition: 'Epilepsia e distúrbios neurológicos convulsivos',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A enrofloxacina e seus metabólitos exercem antagonismo competitivo sobre os receptores inibitórios GABA no SNC, reduzindo o limiar convulsivo.',
          clinicalAction:
            'Usar com cautela em epilépticos estáveis; evitar associação concomitante com anti-inflamatórios não esteroidais (AINEs), que potencializam a inibição GABAérgica.',
        },
        {
          condition: 'Administração intravenosa rápida ou diluição incorreta',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Injeção IV rápida causa liberação súbita de histamina, colapso hemodinâmico, hipotensão profunda e arritmias. O contato com soluções cristaloides contendo cálcio ou magnésio gera microprecipitados insolúveis pulmonares.',
          clinicalAction:
            'Nunca administrar em bólus IV rápido. Não diluir em Ringer Lactato ou fluidos contendo cálcio/magnésio. Administrar em infusão lenta em linha exclusiva.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Degeneração retiniana aguda com cegueira (felinos)',
          frequency: 'rare',
          mechanism:
            'Disfunção do efluxo ABCG2 na retina felina gerando acúmulo de fluoroquinolona foto-reativa e morte celular oxidativa de cones e bastonetes.',
          clinicalManagement:
            'Suspensão imediata e irrevogável da enrofloxacina ao primeiro sinal de midríase ou cegueira. Encaminhar para eletrorretinograma e fundo de olho. Não há antídoto.',
        },
        {
          effect: 'Vômito, anorexia e desconforto gastrintestinal',
          frequency: 'common',
          mechanism:
            'Irritação química direta da mucosa gástrica e estimulação da zona deflagradora quimiorreceptora (CTZ) central.',
          clinicalManagement:
            'Administrar junto a uma pequena refeição não láctea para amortecer o contato gástrico, ou associar antiemético (maropitant ou ondansetrona).',
        },
        {
          effect: 'Reação tecidual estéril e dor no local de injeção',
          frequency: 'common',
          mechanism:
            'O pH alcalino (~11) das soluções injetáveis comerciais provoca irritação química aguda e miosite/paniculite estéril.',
          clinicalManagement:
            'Alternar rigorosamente os sítios de injeção; aplicar profundamente; migrar para via oral o mais rápido possível.',
        },
        {
          effect: 'Neurotoxicidade e convulsões',
          frequency: 'rare',
          mechanism:
            'Bloqueio alostérico dos receptores GABAA centrais, facilitando descargas elétricas neuronais paroxísticas.',
          clinicalManagement:
            'Controlar crises com benzodiazepínicos (diazepam/midazolam) e descontinuar o antimicrobiano, substituindo por classe sem neurotoxicidade.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Renal Crônica em Cães (Estágios 3 e 4 IRIS)',
          recommendedAdjustment:
            'Como há eliminação mista (renal e biliar), casos moderados não exigem redução automática de dose; em disfunção renal grave com anúria/oligúria, aumentar o intervalo para q36h ou q48h em vez de reduzir a dose do pico.',
          physiologicalRationale:
            'Por ser um antimicrobiano concentração-dependente, diminuir a dose unitária compromete a relação Cmax/MIC e seleciona resistência bacteriana. Ajustar o intervalo preserva o pico bactericida.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica em Felinos (DRC Felina)',
          recommendedAdjustment:
            'Manter estritamente a dose máxima de 5 mg/kg a cada 24 horas; estudo de 2023 comprovou que o clearance corporal total não é diminuído na azotemia felina, mas nunca superar 5 mg/kg.',
          physiologicalRationale:
            'Estudo prospectivo com 34 gatos azotêmicos demonstrou que o clearance de fluoroquinolonas totais permaneceu estável (~441 mL/kg/h). Subdosar gera falha e resistência.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Grave com Encefalopatia',
          recommendedAdjustment:
            'Avaliar redução de dose ou substituição; monitorar o paciente rigorosamente para sinais de acúmulo neurotóxico.',
          physiologicalRationale:
            'A conversão hepática em ciprofloxacina e a eliminação biliar ficam lentificadas, prolongando a exposição sistêmica.',
        },
        {
          clinicalCondition: 'Conclusão do Protocolo Antimicrobiano (Desmame)',
          recommendedAdjustment:
            'Não requer e não deve sofrer desmame gradual. Completar o tempo previsto (ex.: 10-14 dias) e suspender integralmente.',
          physiologicalRationale:
            'O desmame decrescente de antibacterianos expõe patógenos residuais a concentrações subinibitórias, atuando como o principal acelerador de resistência bacteriana.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Quelantes de Fósforo e Minerais (Cálcio, Alumínio, Magnésio, Ferro, Zinco)',
          severity: 'major',
          clinicalEffect:
            'Redução drástica da absorção gastrointestinal da enrofloxacina, levando à falha do tratamento antimicrobiano.',
          pharmacologicalMechanism:
            'Formação de quelatos insolúveis estequiométricos entre os cátions metálicos bivalentes/trivalentes e o anel quinolônico no lúmen gástrico. Separar por pelo menos 2 horas.',
        },
        {
          drugOrClass: 'Teofilina e Aminofilina',
          severity: 'major',
          clinicalEffect:
            'Elevação acentuada (30% a 50%) das concentrações plasmáticas de teofilina, com risco iminente de taquiarritmias, tremores musculares e convulsões.',
          pharmacologicalMechanism:
            'Inibição competitiva do citocromo CYP1A2 hepático pela enrofloxacina e ciprofloxacina, reduzindo o clearance da teofilina.',
        },
        {
          drugOrClass: 'Anti-inflamatórios Não Esteroidais (AINEs)',
          severity: 'moderate',
          clinicalEffect:
            'Aumento do risco de excitabilidade central, tremores e convulsões, particularmente em animais predispostos.',
          pharmacologicalMechanism:
            'Potencialização sinérgica do bloqueio de receptores inibitórios GABA no sistema nervoso central.',
        },
        {
          drugOrClass: 'Ciclosporina Sistêmica',
          severity: 'moderate',
          clinicalEffect:
            'Possível elevação dos níveis séricos de ciclosporina e agravamento potencial de nefrotoxicidade.',
          pharmacologicalMechanism:
            'Inibição de enzimas metabólicas hepáticas e transportadores de efluxo tubulares renais.',
        },
        {
          drugOrClass: 'Anticoagulantes Orais (Varfarina)',
          severity: 'moderate',
          clinicalEffect:
            'Potencialização do efeito anticoagulante com prolongamento do tempo de protrombina (TP) e risco hemorrágico.',
          pharmacologicalMechanism:
            'Deslocamento de sítios de ligação proteica e inibição de biotransformação enzimática microssomal.',
        },
      ],
    },

    // 7. Estudos Clínicos e de Segurança Comentados
    clinicalStudiesCommented: [
      {
        title:
          'Pharmacokinetics of enrofloxacin and its metabolite ciprofloxacin after intravenous and oral administration of enrofloxacin in dogs',
        authorsYear: 'Küng K, Riond JL, Wanner M. 1993',
        journal: 'J Vet Pharmacol Ther. 16(4):462-468. doi: 10.1111/j.1365-2885.1993.tb00212.x. PMID: 8126763',
        studyDesign:
          'Estudo farmacocinético cruzado (crossover) em 4 cães recebendo 5 mg/kg de enrofloxacina por via oral e intravenosa, determinando concentrações séricas e conversão em ciprofloxacina.',
        sampleSize: '4 cães hígidos',
        mainFindings:
          'Demonstrou biodisponibilidade oral de 80% e formação sistêmica de ciprofloxacina correspondendo a cerca de 40% da exposição à molécula-mãe. O pico sérico ocorreu em ~1 hora com meia-vida de 2,4 horas.',
        clinicalTakeaway:
          'Marco farmacológico que consolidou a compreensão de que a eficácia bactericida in vivo da enrofloxacina em cães decorre da ação somada da molécula original e de seu metabólito ativo ciprofloxacina.',
        referenceId: 'kung-1993-pharmacokinetics',
      },
      {
        title:
          'Evaluation of the efficacy and safety of high dose short duration enrofloxacin treatment regimen for uncomplicated urinary tract infections in dogs',
        authorsYear: 'Westropp JL, Sykes JE, Irom S, et al. 2012',
        journal: 'J Vet Intern Med. 26(3):506-512. doi: 10.1111/j.1939-1676.2012.00914.x. PMID: 22486931',
        studyDesign:
          'Ensaio clínico prospectivo, randomizado, duplo-cego e multicêntrico em 68 cães com cistite bacteriana esporádica não complicada, comparando enrofloxacina em alta dose curta (18 a 20 mg/kg q24h por 3 dias) versus amoxicilina-clavulanato (13,75 a 25 mg/kg q12h por 14 dias).',
        sampleSize: '68 cães com ITU não complicada',
        mainFindings:
          'A taxa de cura microbiológica foi de 77,1% no grupo enrofloxacina (3 dias) e 81,2% no grupo amoxicilina-clavulanato (14 dias). A cura clínica atingiu 88,6% vs 87,9%. A terapia curta de alta dose foi comprovadamente não inferior.',
        clinicalTakeaway:
          'Prova de conceito farmacodinâmica definitiva do padrão concentração-dependente da enrofloxacina em cães. Contudo, as diretrizes de stewardship da ISCAID preconizam reservar as fluoroquinolonas para infecções resistentes, evitando seu uso empírico banal em cistite simples.',
        referenceId: 'westropp-2012-enro',
      },
      {
        title: 'Enrofloxacin-associated retinal degeneration in cats',
        authorsYear: 'Gelatt KN, van der Woerdt A, Ketring KL, et al. 2001',
        journal: 'Vet Ophthalmol. 4(2):99-106. doi: 10.1046/j.1463-5224.2001.00182.x. PMID: 11422990',
        studyDesign:
          'Estudo retrospectivo clínico e anatomopatológico de 17 gatos que desenvolveram degeneração retiniana e cegueira aguda após antibioticoterapia com enrofloxacina em doses variadas.',
        sampleSize: '17 gatos com cegueira tóxica',
        mainFindings:
          'Todos os gatos apresentaram midríase bilateral não responsiva à luz, hiperrefletividade tapetal difusa e atenuação de vasos retinianos. O eletrorretinograma revelou perda profunda da onda b e a histopatologia confirmou necrose e destruição seletiva da camada fotorreceptora externa.',
        clinicalTakeaway:
          'Estudo seminal que determinou a revisão internacional da bula e a fixação do limite máximo estrito de 5 mg/kg/dia para felinos em todo o mundo.',
        referenceId: 'gelatt-2001-retinal',
      },
      {
        title:
          'Ocular and systemic manifestations after oral administration of a high dose of enrofloxacin in cats',
        authorsYear: 'Ford MM, Dubielzig RR, Giuliano EA, Moore CP, Narfström KL. 2007',
        journal: 'Am J Vet Res. 68(2):190-202. doi: 10.2460/ajvr.68.2.190. PMID: 17269886',
        studyDesign:
          'Estudo experimental controlado em 24 gatos jovens sadios expostos a 50 mg/kg VO q24h de enrofloxacina (10x a dose) por 3, 5 ou 7 dias com eletrorretinografia seriada e histopatologia.',
        sampleSize: '24 gatos experimentais',
        mainFindings:
          'A degeneração dos fotorreceptores e a diminuição da amplitude das ondas no ERG foram detectadas precocemente logo ao 3º dia de exposição, antes mesmo do surgimento de alterações fundoscópicas óbvias ao oftalmoscópio.',
        clinicalTakeaway:
          'Evidencia que o dano retiniano felino é agudo, rápido e exposição-dependente. A midríase é um biomarcador clínico precoce que exige parada imediata do fármaco.',
        referenceId: 'ford-2007-enro-cat',
      },
      {
        title: 'Molecular genetic basis for fluoroquinolone-induced retinal degeneration in cats',
        authorsYear: 'Ramirez CJ, Minch JD, Gay JM, et al. 2011',
        journal: 'Pharmacogenet Genomics. 21(2):66-75. doi: 10.1097/FPC.0b013e3283425f44. PMID: 21150813',
        studyDesign:
          'Estudo genético e funcional comparativo do gene do transportador ABCG2 (proteína de efluxo da barreira hematorretiniana) em gatos versus cães e humanos.',
        sampleSize: 'Análise molecular e funcional in vitro',
        mainFindings:
          'Identificou quatro mutações aminoacídicas conservadas exclusivas dos felinos que comprometem a função de efluxo do ABCG2. A retenção da enrofloxacina na retina em contato com a luz ambiente gera radicais livres e morte dos fotorreceptores.',
        clinicalTakeaway:
          'Esclarece a base farmacogenética da suscetibilidade única dos felinos, confirmando a necessidade de respeito irrestrito ao teto de 5 mg/kg/dia.',
        referenceId: 'ramirez-2011-abcg2',
      },
    ],

    // 8. Tabela Prática de Peso e Conversão de Doses
    practicalWeightTable: {
      standardDoseText:
        'Cães e Gatos: Dose-base de 5 mg/kg a cada 24 horas (VO). Em cães com infecções profundas (próstata/rim), a dose pode atingir 10 a 20 mg/kg q24h. Em gatos, o teto diário de 5 mg/kg NUNCA deve ser ultrapassado.',
      headers: [
        'Peso do Paciente',
        'Dose Total (5 mg/kg)',
        'Comprimido 50 mg',
        'Comprimido 150 mg',
        'Líquido Injetável 5% (50 mg/mL)',
      ],
      rows: [
        {
          weight: '2 kg (Gato ou Cão Mini)',
          totalDose: '10 mg q24h',
          col1: '1/5 comp. (preferir comp. 15 mg ou líquido)',
          col2: 'Inadequado para 2 kg',
          col3: '0,2 mL (injetável 50 mg/mL)',
        },
        {
          weight: '3 kg (Gato Padrão)',
          totalDose: '15 mg q24h',
          col1: '1 comp. de 15 mg (ou 1/3 comp. 50 mg)',
          col2: 'Inadequado para 3 kg',
          col3: '0,3 mL (injetável 50 mg/mL)',
        },
        {
          weight: '4 kg (Gato Adulto)',
          totalDose: '20 mg q24h (TETO FELINO)',
          col1: 'Aproximadamente 1/2 comp. de 50 mg',
          col2: 'Inadequado para 4 kg',
          col3: '0,4 mL (injetável 50 mg/mL)',
        },
        {
          weight: '5 kg (Gato Grande / Cão Mini)',
          totalDose: '25 mg q24h (TETO FELINO)',
          col1: '1/2 comprimido de 50 mg',
          col2: 'Inadequado para 5 kg',
          col3: '0,5 mL (injetável 50 mg/mL)',
        },
        {
          weight: '10 kg (Cão Pequeno)',
          totalDose: '50 mg q24h',
          col1: '1 comprimido de 50 mg',
          col2: '1/3 comprimido de 150 mg',
          col3: '1,0 mL (injetável 50 mg/mL)',
        },
        {
          weight: '15 kg (Cão Médio)',
          totalDose: '75 mg q24h',
          col1: '1 e 1/2 comprimido de 50 mg',
          col2: '1/2 comprimido de 150 mg',
          col3: '1,5 mL (injetável 50 mg/mL)',
        },
        {
          weight: '20 kg (Cão Médio)',
          totalDose: '100 mg q24h',
          col1: '2 comprimidos de 50 mg',
          col2: 'Aproximadamente 2/3 comp. 150 mg',
          col3: '2,0 mL (injetável 50 mg/mL)',
        },
        {
          weight: '30 kg (Cão Grande)',
          totalDose: '150 mg q24h',
          col1: '3 comprimidos de 50 mg',
          col2: '1 comprimido de 150 mg',
          col3: '3,0 mL (injetável 50 mg/mL)',
        },
        {
          weight: '40 kg (Cão Gigante)',
          totalDose: '200 mg q24h',
          col1: '4 comprimidos de 50 mg',
          col2: '1 comp. 150 mg + 1 comp. 50 mg',
          col3: '4,0 mL (injetável 50 mg/mL)',
        },
      ],
    },

    // 9. Modelo Pronto de Prescrição Veterinária
    samplePrescriptionText:
      'RECEITUÁRIO SIMPLES — USO VETERINÁRIO\\n\\n1. Enrofloxacina Comprimidos Palatáveis 50 mg\\n   - Posologia: Administrar [inserir número de comprimidos] por via oral, a cada 24 horas, durante [inserir número de dias] dias consecutivos.\\n\\nOrientações e Cuidados ao Tutor:\\n- Administrar preferencialmente no mesmo horário todos os dias, de preferência em jejum ou com pequena quantidade de alimento não lácteo se houver desconforto gástrico.\\n- NUNCA associar no mesmo horário com suplementos minerais de cálcio, ferro, zinco ou protetores estomacais (manter intervalo obrigatório de pelo menos 2 horas).\\n- Manter água fresca potável continuamente à disposição do animal para garantir hidratação ideal.\\n- ATENÇÃO ESPECIAL EM GATOS: A dose prescrita respeita o teto de segurança da espécie. Caso note pupilas dilatadas que não fecham na luz, desorientação ou perda visual súbita, suspenda o medicamento imediatamente e procure o hospital veterinário.\\n- Não interromper o tratamento antes do prazo estipulado, mesmo que os sintomas desapareçam, para evitar retorno da infecção e surgimento de bactérias resistentes.',

    // 10. Referências Científicas Completas
    references: [
      {
        id: 'plumb-enrofloxacin-10ed',
        title: 'Enrofloxacin: Veterinary Systemic Fluoroquinolone Monograph',
        authors: 'Plumb DC, Budde J',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 450-455",
        citation:
          "Plumb DC. Enrofloxacin. In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. p. 450-455.",
        sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
        evidenceLevel: 'Referência Mundial em Terapêutica Veterinária',
      },
      {
        id: 'bsava-formulary-enrofloxacin-10ed',
        title: 'Enrofloxacin: Canine and Feline Formulary Monograph',
        authors: 'Ramsey I (ed.)',
        year: 2020,
        journal: 'BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition, pp. 147-148',
        citation:
          'British Small Animal Veterinary Association. Enrofloxacin. In: BSAVA Small Animal Formulary, Part A. 10th ed. Gloucester: BSAVA; 2020. p. 147-148.',
        sourceType: 'Formulário Britânico de Animais de Companhia',
        evidenceLevel: 'Consenso Britânico de Medicina Veterinária',
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
      {
        id: 'westropp-2012-enro',
        title:
          'Evaluation of the efficacy and safety of high dose short duration enrofloxacin treatment regimen for uncomplicated urinary tract infections in dogs',
        authors: 'Westropp JL, Sykes JE, Irom S, et al.',
        year: 2012,
        journal: 'Journal of Veterinary Internal Medicine. 26(3):506-512',
        citation:
          'Westropp JL, Sykes JE, Irom S, et al. Evaluation of the efficacy and safety of high dose short duration enrofloxacin treatment regimen for uncomplicated urinary tract infections in dogs. J Vet Intern Med. 2012;26(3):506-512. doi: 10.1111/j.1939-1676.2012.00914.x. PMID: 22486931.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego em Cães',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3565442/',
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado Nível 1',
      },
      {
        id: 'gelatt-2001-retinal',
        title: 'Enrofloxacin-associated retinal degeneration in cats',
        authors: 'Gelatt KN, van der Woerdt A, Ketring KL, et al.',
        year: 2001,
        journal: 'Veterinary Ophthalmology. 4(2):99-106',
        citation:
          'Gelatt KN, van der Woerdt A, Ketring KL, et al. Enrofloxacin-associated retinal degeneration in cats. Vet Ophthalmol. 2001;4(2):99-106. doi: 10.1046/j.1463-5224.2001.00182.x. PMID: 11422990.',
        sourceType: 'Estudo Clínico e Histopatológico de Retinotoxicidade Felina',
        url: 'https://pubmed.ncbi.nlm.nih.gov/11422990/',
        evidenceLevel: 'Estudo Observacional e Toxicológico Padrão-Ouro',
      },
      {
        id: 'ford-2007-enro-cat',
        title:
          'Ocular and systemic manifestations after oral administration of a high dose of enrofloxacin in cats',
        authors: 'Ford MM, Dubielzig RR, Giuliano EA, Moore CP, Narfström KL',
        year: 2007,
        journal: 'American Journal of Veterinary Research. 68(2):190-202',
        citation:
          'Ford MM, Dubielzig RR, Giuliano EA, Moore CP, Narfström KL. Ocular and systemic manifestations after oral administration of a high dose of enrofloxacin in cats. Am J Vet Res. 2007;68(2):190-202. doi: 10.2460/ajvr.68.2.190. PMID: 17269886.',
        sourceType: 'Ensaio Experimental Controlado com Eletrorretinografia',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17269886/',
        evidenceLevel: 'Ensaio Experimental Fisiopatológico Controlado',
      },
      {
        id: 'ramirez-2011-abcg2',
        title: 'Molecular genetic basis for fluoroquinolone-induced retinal degeneration in cats',
        authors: 'Ramirez CJ, Minch JD, Gay JM, et al.',
        year: 2011,
        journal: 'Pharmacogenetics and Genomics. 21(2):66-75',
        citation:
          'Ramirez CJ, Minch JD, Gay JM, et al. Molecular genetic basis for fluoroquinolone-induced retinal degeneration in cats. Pharmacogenet Genomics. 2011;21(2):66-75. doi: 10.1097/FPC.0b013e3283425f44. PMID: 21150813.',
        sourceType: 'Estudo Farmacogenético Molecular de Barreira Hematorretiniana',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21150813/',
        evidenceLevel: 'Investigação Farmacogenômica Translacional',
      },
      {
        id: 'kung-1993-pharmacokinetics',
        title:
          'Pharmacokinetics of enrofloxacin and its metabolite ciprofloxacin after intravenous and oral administration of enrofloxacin in dogs',
        authors: 'Küng K, Riond JL, Wanner M',
        year: 1993,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 16(4):462-468',
        citation:
          'Küng K, Riond JL, Wanner M. Pharmacokinetics of enrofloxacin and its metabolite ciprofloxacin after intravenous and oral administration of enrofloxacin in dogs. J Vet Pharmacol Ther. 1993;16(4):462-468. doi: 10.1111/j.1365-2885.1993.tb00212.x. PMID: 8126763.',
        sourceType: 'Estudo Farmacocinético Canino Crossover',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8126763/',
        evidenceLevel: 'Ensaio Farmacocinético Canino',
      },
    ],

    genericBrandsNote:
      'A enrofloxacina é amplamente disponível no mercado veterinário brasileiro em formulações comerciais consagradas (como Baytril®, Zelotril®, Flotril®, Enropet® e Chemitril®) nas apresentações de comprimidos palatáveis sulcados de 15 mg, 50 mg, 150 mg e 250 mg, além de soluções injetáveis a 5% (50 mg/mL) e 10% (100 mg/mL). Produtos veterinários com registro no MAPA são dispensados sob Receituário Veterinário Simples de uma via. A substituição por ciprofloxacina de farmácia humana não é recomendada devido à absorção oral errática e baixa biodisponibilidade da ciprofloxacina em pequenos animais.',

    clinicalWarningItems: [
      {
        label: 'Teto Absoluto em Gatos (Máximo 5 mg/kg/dia):',
        text: 'Em felinos, NUNCA ultrapassar 5 mg/kg em 24 horas. Mutações funcionais no transportador ABCG2 na retina felina causam acúmulo da droga e degeneração fotorreceptora tóxica aguda com midríase e cegueira permanente. Se notar dilatação pupilar mantida, suspenda imediatamente.',
      },
      {
        label: 'Contraindicação em Cães em Crescimento:',
        text: 'Não prescrever para cães jovens durante a fase de crescimento rápido (até 8 meses em portes pequenos/médios, até 12 meses em portes grandes e até 18 meses em raças gigantes), devido à formação de vesículas e erosões articulares irreversíveis na cartilagem de suporte.',
      },
      {
        label: 'Ação Concentração-Dependente e Interações:',
        text: 'A eficácia clínica depende do pico sérico em relação à MIC (Cmax/MIC). Administrar a dose total a cada 24 horas. Manter separação estrita de pelo menos 2 horas de antiácidos, quelantes de fósforo, cálcio, ferro e sucralfato, que inativam a absorção por quelação intraluminal.',
      },
    ],

    relatedDiseaseSlugs: [
      'doencas-trato-urinario-inferior-felino-dtuif',
      'prostatite-caes-gatos',
      'doenca-renal-cronica-caes-gatos',
      'bronquite-cronica-caes-gatos',
    ],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const enrofloxacinaMedicationRecord = enrofloxacinaMedicationsSeed[0];
