import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const requestedClinicalCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'apevitin-bc-xarope-ems',
    slug: 'apevitin-bc',
    name: 'Apevitin BC',
    manufacturer: 'EMS',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_orexigenic',
    commercialSubclasses: ['gi_orexigenic', 'nutra_general_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Xarope frasco com 240 mL acompanhado de copo dosador (ciproeptadina 0,8 mg/mL + vitaminas B e C)',
    ],
    activeComponents: [
      'cloridrato de ciproeptadina 0,8 mg/mL',
      'cloridrato de tiamina (vitamina B1) 0,12 mg/mL',
      'riboflavina (vitamina B2) 0,15 mg/mL',
      'cloridrato de piridoxina (vitamina B6) 0,134 mg/mL',
      'nicotinamida 1,334 mg/mL',
      'ácido ascórbico (vitamina C) 4,334 mg/mL',
    ],
    searchAliases: [
      'apevitin',
      'ciproeptadina',
      'estimulante de apetite',
      'orexigeno',
      'complexo b',
      'hiporexia felina',
      'sindrome serotoninergica',
    ],
    labelCompositionSummary:
      'Cada 5 mL de xarope contém 4,0 mg de cloridrato de ciproeptadina (0,8 mg/mL), tiamina 0,6 mg, riboflavina 0,75 mg, piridoxina 0,67 mg, nicotinamida 6,67 mg e ácido ascórbico 21,67 mg. Medicamento humano em xarope com sacarose; uso veterinário extra-label sob prescrição.',
    labelDirections:
      'Uso humano: crianças 2–6 anos 2,5–5 mL q8–12h; adultos 15 mL q8h. Uso veterinário extra-label calculado estritamente pela ciproeptadina (0,8 mg/mL). Administrar por via oral vagarosamente com seringa graduada, cerca de 30 a 60 minutos antes da refeição principal.',
    dosageGuidance: {
      labelDose:
        'Gatos: 1 a 2 mg/gato VO q12h (1,25 a 2,5 mL por gato BID). Cães: 0,1 a 0,2 mg/kg VO q12h (0,125 a 0,25 mL/kg BID) como orexígeno.',
      plumbs: {
        dog: [
          {
            title: 'Estimulação do apetite (orexígeno)',
            dose: '0,1 a 0,2 mg/kg VO q12h',
            note: 'Equivale a 0,125 a 0,25 mL/kg do xarope VO BID, 30 a 45 minutos antes da refeição.',
          },
          {
            title: 'Antipruriginoso / antialérgico H1 (off-label)',
            dose: '0,3 a 0,5 mg/kg VO q8–12h',
            note: 'Aproximadamente 0,375 a 0,625 mL/kg do xarope VO TID.',
          },
          {
            title: 'Síndrome serotoninérgica (antídoto de resgate)',
            dose: '1,0 a 1,5 mg/kg VO ou retal q8h',
            note: 'Antagonismo 5-HT2 frente à toxicidade por inibidores de recaptação de serotonina.',
          },
        ],
        cat: [
          {
            title: 'Estimulação do apetite felino (orexígeno)',
            dose: '1 a 2 mg/gato VO q12–24h',
            note: 'Dose prática fixa: 1,25 mL (1 mg) a 2,5 mL (2 mg) por gato. Iniciar com 1,25 mL para avaliar tolerância comportamental e grau de sedação.',
          },
          {
            title: 'Síndrome serotoninérgica felina',
            dose: '2 a 4 mg/gato VO ou retal q8–12h',
            note: 'Equivale a 2,5 a 5,0 mL do xarope por gato administrado por sonda ou enema.',
          },
        ],
      },
      notes: [
        'Cálculo sempre baseado no teor de ciproeptadina: concentração exata de 0,8 mg/mL (4 mg a cada 5 mL).',
        'Formulação humana em xarope com alto teor de sacarose e sorbitol: contraindicado em animais diabéticos.',
        'Em gatos, pode ocorrer sedação nos primeiros dias ou disforia paradoxal (vocalização incessante, agitação motora e miados contínuos).',
        'Orexígenos não substituem suporte nutricional enteral por sonda em felinos com anorexia estrita superior a 48 horas.',
      ],
    },
    plumbsContext:
      'A ciproeptadina atua como potente antagonista competitivo dos receptores H1 de histamina e 5-HT2 de serotonina no hipotálamo ventromedial. Ao suprimir a inibição serotoninérgica no centro da saciedade, deflagra estímulo reflexo do apetite. As vitaminas do complexo B e a vitamina C associadas fornecem cofatores enzimáticos para restauração metabólica e ciclo de Krebs em animais hiporéxicos ou convalescentes.',
    clinicalUse:
      'Estimulação do apetite em cães e gatos convalescentes, hiporéxicos ou com inapetência secundária a doenças crônicas ou pós-operatórias; antídoto de resgate em síndrome serotoninérgica. Em felinos, permanece como recurso acessível na rotina brasileira quando há falha, intolerância ou indisponibilidade de mirtazapina ou capromorelina.',
    reassessment:
      'Reavaliar peso corporal, escore de condição corporal (ECC) e consumo espontâneo de alimento a cada 48 a 72 horas. Se o animal permanecer em anorexia estrita por mais de 48 horas, suspender a monoterapia orexígena e instituir sondagem esofágica/nasoenteral para prevenir lipidose hepática.',
    prescriptionExample:
      'Apevitin BC xarope (ciproeptadina 0,8 mg/mL + vitaminas B e C): administrar ___ mL por via oral, a cada 12 horas, cerca de 30 a 45 minutos antes das principais refeições, por 5 a 7 dias consecutivos. ALERTA AO TUTOR: administrar lentamente com seringa na boca. Não forçar caso o paciente engasgue. O remédio pode causar sonolência ou miados/agitação paradoxal em gatos. Se o pet não voltar a comer espontaneamente em até 48 horas, retorne imediatamente à clínica veterinária.',
    safetyAlert:
      'ALERTA DE SEGURANÇA E PRECAUÇÕES: 1) DISFORIA PARADOXAL FELINA: miados altos contínuos, taquicardia, inquietação motora e pupilas dilatadas podem ocorrer por sensibilidade individual; se evidente, suspender a medicação; 2) CONTRAINDICADO EM DIABETES MELLITUS devido à base sacarada do xarope; 3) EFEITOS ANTICOLINÉRGICOS: contraindicado em glaucoma de ângulo fechado, íleo paralítico e retenção urinária; 4) NÃO TRATA A CAUSA DA INAPETÊNCIA: anorexia persistente em gatos exige suporte nutricional ativo para evitar lipidose hepática.',
    price: {
      averageLabel: 'R$ 28,00 a R$ 44,00 (frasco 240 mL)',
      rangeLabel: 'Varejo farmacêutico nacional / farmácias humanas convencionais',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Produto humano; uso veterinário extra-label amplamente documentado em literatura consolidada (Plumb\'s Veterinary Drug Handbook 10ª ed., Papich 5ª ed.).',
    productPageUrl: 'https://www.ems.com.br/produtos/apevitin-bc',
    labelUrl: 'https://consultaremedios.com.br/apevitin-bc/bula',
  },
  {
    id: 'cobavital-microcomprimidos-abbott',
    slug: 'cobavital',
    name: 'Cobavital®',
    manufacturer: 'Abbott',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_orexigenic',
    commercialSubclasses: ['gi_orexigenic', 'nutra_general_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Caixa com 16 microcomprimidos (cobamamida 1 mg + cloridrato de ciproeptadina 1 mg)',
      'Xarope frasco com 100 mL + envelope de pó para reconstituição (cobamamida 1 mg + ciproeptadina 1 mg por 5 mL)',
    ],
    activeComponents: [
      'cobamamida (coenzima B12) 1 mg',
      'cloridrato de ciproeptadina 1 mg',
    ],
    searchAliases: [
      'cobamamida',
      'ciproeptadina',
      'cobavital comprimidos',
      'anabolico proteico',
      'orexigeno',
      'estimulante apetite gato',
      'cobavital xarope',
    ],
    labelCompositionSummary:
      'Cada microcomprimido contém cobamamida 1 mg e cloridrato de ciproeptadina 1 mg. Cada 5 mL de xarope reconstituído contém 1 mg de cobamamida e 1 mg de ciproeptadina (0,2 mg/mL). Estimulante anabólico proteico celular e orexígeno.',
    labelDirections:
      'Uso humano: microcomprimidos ou xarope 2 a 3 vezes ao dia. Uso veterinário extra-label calculado pela ciproeptadina (1 mg/comp). Administrar os microcomprimidos inteiros, diretamente no fundo da boca ou envoltos em petisco, 30 a 60 minutos antes do alimento.',
    dosageGuidance: {
      labelDose:
        'Gatos: 0,5 a 1 microcomprimido por gato VO q12–24h. Cães: 0,1 a 0,3 mg/kg VO q12h (1 microcomprimido para cada 5 a 10 kg BID).',
      plumbs: {
        dog: [
          {
            title: 'Estimulação de apetite e anabolismo proteico',
            dose: '0,1 a 0,3 mg/kg VO q12h',
            note: 'Cães até 5 kg: 1/2 microcomprimido BID; 5–10 kg: 1 microcomprimido BID; 10–20 kg: 2 microcomprimidos BID.',
          },
        ],
        cat: [
          {
            title: 'Estimulação do apetite e ganho de massa magra',
            dose: '0,5 a 1 microcomprimido por gato VO q12–24h',
            note: 'Fornece 0,5 a 1,0 mg de ciproeptadina + cobamamida. Em felinos idosos, nefropatas ou debilitados, iniciar com 1/2 comp (0,5 mg) para testar o limiar de sedação.',
          },
        ],
      },
      notes: [
        'NUNCA esmagar ou triturar o microcomprimido: a ciproeptadina tem gosto extremamente amargo e provoca salivação reflexa intensa (sialorreia espumosa) em gatos e cães.',
        'A formulação em microcomprimidos não contém quantidade relevante de açúcares, sendo preferível aos xaropes em pacientes com restrição calórica ou glicêmica.',
        'Após reconstituição, o xarope possui validade máxima de 30 dias conservado em temperatura ambiente.',
      ],
    },
    plumbsContext:
      'Associação sinérgica entre a ciproeptadina (antagonista dos receptores 5-HT2 no hipotálamo com efeito orexígeno) e a cobamamida (adenosilcobalamina, coenzima fisiológica ativa da vitamina B12). A cobamamida promove anabolismo proteico celular, aumentando a incorporação de aminoácidos e a eritropoiese, sem apresentar propriedades hormonais androgênicas virilizantes ou toxicidade hepática de esteroides.',
    clinicalUse:
      'Estímulo de apetite, recuperação de massa magra e anabolismo proteico em cães e gatos caquéticos, geriátricos, com sarcopenia, pós-operatório ortopédico ou com hiporexia associada a doenças inflamatórias crônicas.',
    reassessment:
      'Avaliar apetite espontâneo, ganho de peso e escore corporal a cada 5 a 7 dias. Não prolongar o uso sem reavaliação clínica das patologias de base.',
    prescriptionExample:
      'Cobavital (cobamamida 1 mg + cloridrato de ciproeptadina 1 mg) — microcomprimidos: administrar [1/2 ou 1] microcomprimido por via oral, a cada [12 ou 24] horas, 45 minutos antes da refeição, por 7 a 10 dias consecutivos. ALERTA AO TUTOR: administrar o microcomprimido INTEIRO diretamente no fundo da boca. NÃO triturar nem esmagar, pois o remédio é muito amargo e causa salivação excessiva. Caso note agitação, miados contínuos ou sonolência extrema, contate o médico veterinário.',
    safetyAlert:
      'CUIDADOS CRÍTICOS E SEGURANÇA: 1) Não triturar os comprimidos para evitar salivação espumosa; 2) Disforia felina: interromper se o gato apresentar pupilas dilatadas, vocalização anormal e agitação; 3) Efeitos anticolinérgicos: contraindicado em retenção urinária, glaucoma e íleo adinâmico; 4) Não substitui o diagnóstico de doenças consuntivas graves (DRC, DII, neoplasias, PIF).',
    price: {
      averageLabel: 'R$ 24,00 a R$ 40,00 (16 microcomp.) / R$ 34,00 a R$ 52,00 (xarope 100 mL)',
      rangeLabel: 'Varejo farmacêutico nacional / farmácias humanas convencionais',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Uso empírico consagrado de longa data na rotina de pequenos animais no Brasil e América Latina; monografias veterinárias de ciproeptadina e cobamamida (Plumb\'s 10ª ed., Kirk\'s Current Veterinary Therapy).',
    productPageUrl: 'https://www.abbottbrasil.com.br/produtos/cobavital.html',
    labelUrl: 'https://consultaremedios.com.br/cobavital/bula',
  },
  {
    id: 'hep-same-pet-tabs-soft-care',
    slug: 'same-complex-pet-tabs',
    name: 'SAMe Complex Pet Tabs (HEP SAMe)',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_hepatobiliary',
    commercialSubclasses: ['gi_hepatobiliary', 'nutra_general_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Frasco com 30 tabletes palatáveis mastigáveis (SAMe 200 mg + silimarina 300 mg + vitamina E 100 UI)',
    ],
    activeComponents: [
      'S-adenosil-L-metionina (SAMe) 200 mg',
      'extrato de cardo-mariano (silimarina) 300 mg',
      'vitamina E 100 UI',
    ],
    searchAliases: [
      'same',
      'hep same',
      'pet tabs',
      'same complex',
      'soft care same',
      'silimarina',
      'cardo mariano',
      'hepatoprotetor',
      'denamarin similar',
    ],
    labelCompositionSummary:
      'Cada tablete palatável mastigável contém S-adenosil-L-metionina 200 mg, extrato seco de Silybum marianum (silimarina) 300 mg e vitamina E (DL-alfa-tocoferol) 100 UI, com palatabilizante veterinário à base de hidrolisado de fígado de frango.',
    labelDirections:
      'Cães e gatos: administrar 1 tablete para cada 10 kg de peso corporal ao dia, por via oral, preferencialmente em jejum (1 hora antes da primeira refeição). Uso sob prescrição médico-veterinária.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 1 tablete para cada 10 kg VO q24h em jejum (fornece 20 mg/kg de SAMe, 30 mg/kg de silimarina e 10 UI/kg de vitamina E).',
      plumbs: {
        dog: [
          {
            title: 'Suporte hepatobiliar antioxidante e citoprotetor',
            dose: '1 tablete/10 kg VO q24h (SID)',
            note: 'Administrar 1–2 horas antes da alimentação matinal. Cães de 5 kg: 1/2 tablete; 10 kg: 1 tablete; 20 kg: 2 tabletes.',
          },
          {
            title: 'Adjuvante contra hepatotoxicidade induzida por fármacos (lomustina/fenobarbital)',
            dose: '1 tablete/10 kg VO q24h (SID)',
            note: 'Atenua a elevação de ALT e FA durante quimioterapia com lomustina/CCNU (Skorupski et al. 2011).',
          },
        ],
        cat: [
          {
            title: 'Suporte em colangite, colestase e lipidose hepática felina',
            dose: '1/2 a 1 tablete por gato VO q24h (SID)',
            note: 'Gatos até 4 kg: 1/2 tablete ao dia (~100 mg de SAMe = ~25 mg/kg). Administrar preferencialmente em jejum.',
          },
        ],
      },
      notes: [
        'Administrar preferencialmente com o estômago vazio: a ingestão concomitante de proteínas na dieta compete pelos transportadores entéricos de aminoácidos com o SAMe.',
        'Não confundir a dose de SAMe isolado com a composição deste produto, que combina 200 mg de SAMe com 300 mg de extrato de silimarina por tablete.',
        'Tabletes palatáveis formulados para aceitação espontânea ou administrados com mínima porção de alimento não proteico.',
      ],
    },
    plumbsContext:
      'Ação sinérgica tripla de citoproteção hepatobiliar: 1) O SAMe é o principal doador fisiológico de radicais metila para fosfolipídios de membrana e precursor intracelular da glutationa reduzida (GSH), o mais potente antioxidante celular hepático; 2) A silimarina estabiliza as membranas dos hepatócitos, inibe a peroxidação lipídica e atenua a ativação miofibroblástica das células estreladas hepáticas; 3) A vitamina E atua como antioxidante lipofílico que interrompe a oxidação em cadeia das membranas canaliculares biliares. Consenso ACVIM 2019 de Hepatites Caninas enquadra terapias antioxidantes como adjuvantes celulares indispensáveis.',
    clinicalUse:
      'Suporte antioxidante e citoprotetor em hepatites crônicas, colangites, colestase, lipidose hepática felina e adjuvante na prevenção de sobrecarga hepática oxidativa induzida por drogas potencialmente hepatotóxicas (lomustina, azatioprina, fenobarbital).',
    reassessment:
      'Dosagem sérica seriada de enzimas hepáticas (ALT, FA, GGT), bilirrubinas totais e frações, albumina e ácidos biliares a cada 30 a 60 dias conforme a patologia primária.',
    prescriptionExample:
      'SAMe Complex Pet Tabs (SAMe 200 mg + Silimarina 300 mg + Vitamina E 100 UI) — tabletes palatáveis: administrar ___ tablete(s) por via oral, uma vez ao dia (a cada 24 horas), em jejum (1 hora antes do desjejum), durante 60 dias. ALERTA AO TUTOR: administrar preferencialmente com o estômago vazio. Este suplemento protege o fígado do paciente, mas não substitui a ração terapêutica nem a investigação da causa primária. Informe caso o animal apresente vômitos ou fezes amolecidas.',
    safetyAlert:
      'LIMITAÇÕES E CUIDADOS CRÍTICOS: 1) NÃO É CURA ETIOLÓGICA: SAMe e silimarina não removem depósitos de cobre patológicos (exige quelação com d-penicilamina), não desobstruem ducto colédoco (obstrução biliar mecânica ou mucocele avançada exige cirurgia) e não substituem imunossupressores em hepatite autoimune; 2) LIPIDOSE HEPÁTICA FELINA: o fornecimento de nutracêuticos JAMAIS substitui o suporte nutricional enteral ativo por sonda esofágica; 3) Monitorar com cautela em encefalopatia hepática descompensada.',
    price: {
      averageLabel: 'R$ 145,00 a R$ 230,00 (frasco com 30 tabletes)',
      rangeLabel: 'Mercado veterinário especializado nacional / lojas pet clínicas',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Consenso ACVIM de Hepatite Crônica Canina (2019); ensaio clínico randomizado com lomustina (Skorupski et al., JVIM 2011); estudos biológicos de reserva redox (Center et al., AJVR 2005).',
    catalogMedicationId: 'med-same-sadenosilmetionina',
    productPageUrl: 'https://petsociety.com.br/produtos/hep-same-pet-tabs/',
    imageUrl: '/assets/consulta-vet/commercial-products/hep-same-pet-tabs-soft-care.webp',
  },
  {
    id: 'ezetimiba-generico-humano',
    slug: 'ezetimiba',
    name: 'Ezetimiba (Zetia® / Genéricos)',
    manufacturer: 'Organon / MSD / Genéricos (EMS, Medley, Eurofarma) / Manipulação Veterinária',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_lipid_lowering',
    commercialSubclasses: ['endocrine_lipid_lowering', 'gi_hepatobiliary'],
    species: ['dog', 'cat'],
    presentations: [
      'Comprimidos convencionais de 10 mg — caixas com 10, 20 ou 30 comprimidos (farmácia humana)',
      'Cápsulas ou pastas orais manipuladas veterinárias — dosagens sob medida (1 mg, 2,5 mg, 5 mg)',
    ],
    activeComponents: ['ezetimiba 10 mg'],
    searchAliases: [
      'ezetimiba',
      'zetia',
      'hipolipemiante',
      'colesterol cao',
      'hipercolesterolemia canina',
      'npc1l1',
      'schnauzer colesterol',
      'pancreatite lipemia',
    ],
    labelCompositionSummary:
      'Cada comprimido contém 10 mg de ezetimiba. Inibidor seletivo da absorção intestinal de colesterol e fitoesteróis via bloqueio do transportador NPC1L1. Medicamento humano de referência e genéricos; uso veterinário extra-label sob prescrição médica.',
    labelDirections:
      'Bula humana: 10 mg VO uma vez ao dia. Uso canino extra-label: 0,1 a 1,0 mg/kg VO a cada 24 horas, administrado com ou sem alimento, em conjunto obrigatório com dieta terapêutica hipogordurosa.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,1 a 1,0 mg/kg VO q24h (dose inicial comum de 0,2 a 0,5 mg/kg SID; 2,5 mg para cães até 10 kg e 5 a 10 mg para cães maiores).',
      plumbs: {
        dog: [
          {
            title: 'Hipercolesterolemia primária e hiperlipidemia idiopática (Schnauzer, Shetland)',
            dose: '0,1 a 1,0 mg/kg VO q24h (SID)',
            note: 'Ponto de partida usual: 0,2 a 0,5 mg/kg SID com alimento. Cães pequenos (<10 kg): manipular cápsulas de 2,5 mg; cães médios (10–20 kg): 5 mg SID; cães grandes: 10 mg SID.',
          },
          {
            title: 'Prevenção secundária de pancreatite aguda recorrente por lipemia',
            dose: '0,2 a 0,5 mg/kg VO q24h (SID)',
            note: 'Associar obrigatoriamente à dieta ultra-low fat (<10–12% matéria seca) e titular até controle do colesterol sérico.',
          },
        ],
        cat: [
          {
            title: 'Uso experimental / casos refratários de xantomatose idiopática felina',
            dose: '0,2 a 0,5 mg/kg VO q24h (SID)',
            note: 'Dados de segurança limitados em felinos; monitorar perfil hepático com rigor.',
          },
        ],
      },
      notes: [
        'Exige associação OBRIGATÓRIA com restrição alimentar severa de gorduras (alimentos coadjuvantes com <10% a 12% de extrato etéreo na matéria seca).',
        'Não atua como redutor primário de triglicerídeos puros: se houver hipertrigliceridemia grave (>500 mg/dL), a associação com fibratos (bezafibrato) é a conduta prioritária.',
        'Em animais pequenos, a manipulação magistral é recomendada para evitar dosagens erráticas decorrentes da quebra dos comprimidos humanos de 10 mg.',
      ],
    },
    plumbsContext:
      'A ezetimiba inibe especificamente o transportador esteroide Niemann-Pick C1-Like 1 (NPC1L1) localizado na borda em escova dos enterócitos jejunais. Com isso, bloqueia a absorção do colesterol biliar e alimentar, sem prejudicar a absorção de triglicerídeos, ácidos graxos livres, ácidos biliares ou vitaminas lipossolúveis (A, D, E, K). A redução do colesterol hepático promove aumento na expressão dos receptores de LDL pelos hepatócitos, depurando o colesterol circulante da corrente sanguínea.',
    clinicalUse:
      'Tratamento da hipercolesterolemia primária ou familiar em cães (especialmente das raças Schnauzer Miniatura, Pastor de Shetland e Doberman Pinscher), hiperlipidemia mista refratária a manejo dietético isolado e prevenção de lipemia retinal, xantomas cutâneos e episódios recidivantes de pancreatite aguda necrotizante.',
    reassessment:
      'Coleta de perfil lipídico sérico completo (colesterol total, frações, triglicerídeos e aspecto visual do soro) em jejum rigoroso de 12 horas aos 30 e 60 dias de tratamento; após estabilização, a cada 3 a 6 meses. Monitorar enzimas hepáticas (ALT/FA).',
    prescriptionExample:
      'Ezetimiba [cápsulas manipuladas de X mg ou 10 mg comp]: administrar ___ mg por via oral, uma vez ao dia (a cada 24 horas), junto a uma das refeições diárias, associado estritamente à ração hipogordurosa prescrita. Uso contínuo. ALERTA AO TUTOR: o controle do colesterol depende 100% da adesão à dieta indicada. Não forneça nenhum petisco gordo, embutidos ou restos de comida. Retorno em 30 dias para coleta de exames de sangue em jejum de 12 horas.',
    safetyAlert:
      'ALERTAS E PRECAUÇÕES CLÍNICAS: 1) HEPATOPATIAS ATIVAS: a ezetimiba pode causar discretas elevações de transaminases (ALT/AST); avaliar função hepática antes e durante o tratamento; 2) NÃO REDUZ TRIGLICERÍDEOS ISOLADOS: hipertrigliceridemia grave exige bezafibrato associado; 3) INTERAÇÃO COM COLESTIRAMINA: sequestrantes biliares diminuem a absorção da ezetimiba (separar administrações por pelo menos 2 a 4 horas); 4) Investigar e tratar endocrinopatias subjacentes (hipotireoidismo, diabetes, hiperadrenocorticismo).',
    price: {
      averageLabel: 'R$ 24,00 a R$ 55,00 (genéricos 10 mg c/ 30 comp) / R$ 60,00 a R$ 110,00 (manipulado vet)',
      rangeLabel: 'Farmácias humanas convencionais e farmácias magistrais veterinárias',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Consenso ACVIM de Hiperlipidemia Canina; publicações de referência do grupo do Dr. P. Xenoulis (Veterinary Clinics of North America: Small Animal Practice, Journal of Veterinary Internal Medicine).',
    productPageUrl: 'https://organon.com/brazil/produtos/zetia/',
    labelUrl: 'https://consultaremedios.com.br/zetia/bula',
  },
  {
    id: 'benzafibrato-bezafibrato-generico',
    slug: 'benzafibrato',
    name: 'Benzafibrato / Bezafibrato (Benzalip®)',
    manufacturer: 'Roche (Benzalip®) / Genéricos (EMS, Eurofarma, Medley) / Manipulação Veterinária',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_lipid_lowering',
    commercialSubclasses: ['endocrine_lipid_lowering', 'gi_hepatobiliary'],
    species: ['dog'],
    presentations: [
      'Comprimidos revestidos de 200 mg (liberação simples) — caixas com 20 ou 30 comprimidos',
      'Benzalip Retard 400 mg comprimidos (liberação prolongada — NUNCA partir ou triturar)',
      'Cápsulas manipuladas veterinárias — dosagens personalizadas (10 mg, 25 mg, 50 mg, 75 mg)',
    ],
    activeComponents: ['bezafibrato 200 mg ou 400 mg'],
    searchAliases: [
      'bezafibrato',
      'benzafibrato',
      'benzalip',
      'cedur',
      'triglicerideos cao',
      'schnauzer triglicerideos',
      'hipolipemiante fibrato',
      'pancreatite triglicerideos',
    ],
    labelCompositionSummary:
      'Comprimidos revestidos de 200 mg (liberação simples) ou 400 mg (liberação prolongada retard). Derivado do ácido fíbrico com potente ação agonista pan-PPAR. Medicamento humano; na medicina veterinária é a droga de primeira escolha para hipertrigliceridemia grave canina.',
    labelDirections:
      'Bula humana: 200 mg TID ou 400 mg Retard SID com alimento. Uso canino extra-label: 2 a 5 mg/kg VO a cada 24 horas (ou dividido a cada 12 horas), estritamente junto a uma refeição completa.',
    dosageGuidance: {
      labelDose:
        'Cães: 2 a 5 mg/kg VO q24h (ou dividido q12h) com alimento. Pode ser titulado até 7,5–10 mg/kg/dia se refratário. Cães <10 kg exigem manipulação veterinária.',
      plumbs: {
        dog: [
          {
            title: 'Hipertrigliceridemia grave (>500–1000 mg/dL) / Hiperlipidemia idiopática do Schnauzer',
            dose: '2 a 5 mg/kg VO q24h ou dividido q12h',
            note: 'Administrar sempre com refeição. Schnauzer de 7 kg: ~20 a 30 mg ao dia (cápsulas manipuladas); cães de 10 kg: ~30 a 50 mg SID; cães grandes: frações de comp de 200 mg (NUNCA retard).',
          },
          {
            title: 'Prevenção de pancreatite aguda necrotizante e lipidose de órgãos',
            dose: '2,5 a 5 mg/kg VO q24h com alimento',
            note: 'Promove rápida depuração plasmática de quilomícrons e VLDL, clareando o soro lipêmico em 2 a 4 semanas.',
          },
        ],
      },
      notes: [
        'NUNCA partir, cortar ou triturar comprimidos Retard (400 mg): a perda da matriz de liberação controlada despeja dose tóxica imediata no estômago do cão.',
        'Administrar OBRIGATORIAMENTE com alimento: a presença de refeição maximiza a biodisponibilidade e atenua o desconforto gástrico.',
        'CONTRAINDICADO EM GATOS: ausência de perfis farmacocinéticos e toxicológicos de segurança em felinos.',
      ],
    },
    plumbsContext:
      'Agonista potente dos receptores ativados por proliferadores de peroxissomos alfa (PPAR-alfa, com modulação pan-PPAR). Aumenta significativamente a síntese e a atividade da lipoproteína lipase (LPL) no endotélio vascular periférico e reduz a apolipoproteína C-III (inibitória da LPL). Com isso, acelera o catabolismo intravascular e a depuração das lipoproteínas ricas em triglicerídeos (quilomícrons e VLDL), além de estimular a oxidação de ácidos graxos no fígado.',
    clinicalUse:
      'Tratamento de primeira escolha na hipertrigliceridemia grave canina (>500 a 1000 mg/dL), patologia hereditária comum no Schnauzer Miniatura, ou secundária a Diabetes Mellitus, Hipotireoidismo e Hiperadrenocorticismo refratários. Previne crises graves de pancreatite aguda necrotizante, lipidose de órgãos e síndrome de hiperviscosidade vascular.',
    reassessment:
      'Perfil lipídico em jejum estrito de 12 horas, ALT, FA, Creatinina e Ureia aos 30 dias de uso. Repetir perfil a cada 3 a 6 meses após a estabilização.',
    prescriptionExample:
      'Bezafibrato [cápsulas manipuladas de X mg ou comprimidos simples 200 mg]: administrar ___ mg por via oral, uma vez ao dia (a cada 24 horas), estritamente misturado à ração matinal, associado à dieta hipogordurosa. Uso contínuo. ALERTA AO TUTOR: administrar sempre junto com a comida. Nunca quebrar comprimidos Retard. Informar imediatamente se o cão apresentar dores musculares, fraqueza ao andar, vômitos ou urina escura. Retorno em 30 dias para coleta de exames em jejum de 12 horas.',
    safetyAlert:
      'ADVERTÊNCIA MÁXIMA DE SEGURANÇA E BULA (Alerta de Caixa Preta / Boxed Warning — o nível mais alto de alerta e restrição regulatória da FDA e agências de saúde): 1) HEPATOTOXICIDADE: metabolização hepática; contraindicado em hepatopatia ativa grave ou colestase severa; 2) NEFROTOXICIDADE: excreção predominantemente renal; contraindicado em DRC moderada a avançada (IRIS estágios 3–4); 3) MIOSITE E RABDOMIÓLISE: risco documentado da classe dos fibratos com fraqueza muscular e pico de Creatina Quinase (CK); 4) NÃO USAR COMPRIMIDOS RETARD (liberação prolongada) QUEBRADOS OU TRITURADOS; 5) NÃO RECOMENDADO PARA FELINOS (espécie deficiente em glucuronidação com alto risco de intoxicação fatal).',
    price: {
      averageLabel: 'R$ 30,00 a R$ 65,00 (genéricos 200 mg c/ 30 comp) / R$ 70,00 a R$ 130,00 (manipulado vet)',
      rangeLabel: 'Farmácias humanas convencionais e farmácias magistrais veterinárias',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Estudos clínicos e consensos veterinários consagrados (Xenoulis et al. JVIM 2011/2020; de Marco et al. JAVMA).',
    productPageUrl: 'https://produtos.roche.com.br/benzalip',
    labelUrl: 'https://consultaremedios.com.br/benzalip/bula',
  },
  {
    id: 'leukeran-clorambucila-aspen',
    slug: 'leukeran',
    name: 'Leukeran®',
    manufacturer: 'Aspen Pharmacare / Aspen Pharma',
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
    commercialSubclasses: ['oncologic_chemotherapy'],
    isControlled: true,
    species: ['cat', 'dog'],
    presentations: [
      'Comprimidos revestidos de 2 mg — frasco de vidro âmbar com 25 comprimidos (conservar sob refrigeração de 2°C a 8°C)',
    ],
    activeComponents: ['clorambucila (clorambucil) 2 mg'],
    searchAliases: [
      'clorambucil',
      'clorambucila',
      'leukeran',
      'quimioterapia felina',
      'linfoma alimentar felino',
      'dii felina grave',
      'leucemia linfocitica cronica',
      'alquilante',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido contém 2 mg de clorambucila. Agente antineoplásico e imunossupressor alquilante do DNA pertencente à classe das mostardas de nitrogênio. Conservação obrigatória sob refrigeração entre 2°C e 8°C. Medicamento de alta vigilância; padrão ouro no tratamento do linfoma alimentar felino de pequenas células.',
    labelDirections:
      'Bula humana: 0,1 a 0,2 mg/kg/dia para LLC e linfomas. Uso veterinário: felinos com linfoma alimentar de baixo grau recebem 2 mg por gato VO a cada 48–72h associado a prednisolona. Nunca partir, cortar ou triturar comprimidos. Manusear com luvas descartáveis.',
    dosageGuidance: {
      labelDose:
        'Gatos: 2 mg/gato VO q48–72h com prednisolona (linfoma de baixo grau / DII grave) OU 15 a 20 mg/m² VO q14d. Cães: 2 a 6 mg/m² (0,1 a 0,2 mg/kg) VO q24–48h.',
      plumbs: {
        cat: [
          {
            title: 'Linfoma alimentar felino de baixo grau (LGCLL) e DII refratária — protocolo contínuo',
            dose: '2 mg/gato VO a cada 48 a 72 horas (q48–72h)',
            note: 'Padrão ouro associado a prednisolona (1 a 2 mg/kg/dia). Gatos <3 kg: administrar preferencialmente a cada 72 horas para prevenir mielotoxicidade cumulativa.',
          },
          {
            title: 'Linfoma alimentar felino de baixo grau — protocolo pulsado intermitente',
            dose: '15 a 20 mg/m² VO a cada 14 dias (q14d)',
            note: 'Alternativa: 4 a 6 mg por gato VO a cada 3 semanas (q21d) com alimento.',
          },
          {
            title: 'Leucemia linfocítica crônica (LLC) felina',
            dose: '2 mg/gato VO q48h a q72h',
            note: 'Associado a corticoterapia de suporte.',
          },
        ],
        dog: [
          {
            title: 'Leucemia linfocítica crônica (LLC) / Linfoma indolente canino',
            dose: '2 a 6 mg/m² (0,1 a 0,2 mg/kg) VO q24–48h',
            note: 'Fase inicial diária ou dias alternados; reduzir frequência na manutenção.',
          },
          {
            title: 'Doenças imunomediadas refratárias (pênfigo foliáceo, DII canina, AHIM)',
            dose: '0,1 a 0,2 mg/kg (ou 4 a 6 mg/m²) VO q24–48h',
            note: 'Excelente alternativa quando há intolerância à azatioprina.',
          },
        ],
      },
      notes: [
        'NUNCA partir, cortar, esmagar ou triturar os comprimidos: risco de liberação de poeira citotóxica mutagênica. Administrar estritamente inteiros.',
        'Conservação obrigatória sob refrigeração entre 2°C e 8°C na geladeira.',
        'O tutor deve usar luvas descartáveis de nitrilo/látex para manuseio. Mulheres grávidas ou lactantes NÃO devem manipular o produto nem dejetos do animal.',
        'Exige monitoramento com hemograma completo e contagem de plaquetas seriados.',
      ],
    },
    plumbsContext:
      'Agente alquilante bifuncional da família das mostardas de nitrogênio. No meio intracelular, forma cátions reativos que se ligam covalentemente à posição N-7 da guanina no DNA celular, gerando pontes cruzadas intra e interfitas na dupla hélice. Essas ligações impedem a replicação do DNA e a transcrição do RNA, induzindo quebras de fita dupla e apoptose de clones linfocíticos patológicos. Na oncologia felina (linfoma de pequenas células/baixo grau), propicia taxas de remissão clínica >85–90% com excelente tolerabilidade.',
    clinicalUse:
      'Tratamento padrão ouro do Linfoma Alimentar Felino de Pequenas Células / Baixo Grau (LGCLL / EATL tipo 2) em combinação com prednisolona; Doença Inflamatória Intestinal (DII / IBD) felina refratária a corticoterapia; Leucemia Linfocítica Crônica (LLC) em cães e gatos; e doenças autoimunes graves (pênfigo foliáceo, AHIM) em cães intolerantes à azatioprina.',
    reassessment:
      'Hemograma completo com plaquetas obrigatório pré-tratamento, repetido nos dias 14 e 28 do início e, posteriormente, a cada 4 a 6 semanas durante a fase de manutenção. Avaliar ALT, FA e creatinina a cada 60 a 90 dias.',
    prescriptionExample:
      'Leukeran (clorambucila) 2 mg — comprimidos revestidos: administrar 1 comprimido por via oral a cada 48 horas (em dias alternados), fornecido INTEIRO e envolto em pequena quantidade de alimento úmido, sob acompanhamento oncológico rigoroso. REGRAS OBRIGATÓRIAS DE BIOSSEGURANÇA AO TUTOR: 1) Usar luvas descartáveis para manipular o comprimido; 2) NUNCA partir ou triturar; 3) Guardar sempre na geladeira (2°C a 8°C); 4) Gestantes e lactantes NÃO devem manusear; 5) Retorno em 14 a 21 dias para HEMOGRAMA COMPLETO OBRIGATÓRIO.',
    safetyAlert:
      'ADVERTÊNCIA MÁXIMA DE BULA E BIOSSEGURANÇA (Alerta de Tarja Preta / Boxed Warning da FDA e Consensos de Oncologia Veterinária — nível máximo de advertência contra riscos citotóxicos e letais): AGENTE CITOTÓXICO, MUTAGÊNICO E TERATOGÊNICO. 1) MIELOSSUPRESSÃO ACUMULATIVA: causa neutropenia e trombocitopenia graves. Suspender se neutrófilos < 2.000/μL ou plaquetas < 50.000 a 75.000/μL; 2) NEUROTOXICIDADE FELINA: doses cumulativas elevadas podem causar mioclonias (contrações musculares involuntárias), ataxia e convulsões; 3) ALOPECIA EM CÃES de pelagem de crescimento contínuo (Poodle, Maltês); 4) MANUSEIO OBRIGATÓRIO COM LUVAS DE NITRILO e descarte de citostáticos.',
    price: {
      averageLabel: 'Em torno de R$ 390,00 a R$ 720,00 (frasco com 25 comprimidos de 2 mg)',
      rangeLabel: 'Farmácias especializadas em oncologia / distribuição hospitalar humana',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Nível de Evidência 1 / Consensos Internacionais ACVIM e ISFM (Stein et al. JVIM 2010; Kiselow et al. JAVMA 2008; Freiche et al. JFMS 2021).',
    productPageUrl: 'https://aspenpharma.com.br/produtos/leukeran/',
    labelUrl: 'https://consultaremedios.com.br/leukeran/bula',
  },
];
