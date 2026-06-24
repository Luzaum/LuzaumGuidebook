import { CommercialMedicationProduct } from '../types/commercialMedication';

const PRICE_SOURCE_DATE = '2026-05-16';
const ECTO_PRICE_SOURCE_DATE = '2026-05-24';
const OMEGA_PRICE_SOURCE_DATE = '2026-05-16';

const OMEGA3_PLUMBS_CONTEXT =
  'Ômega 3 deve ser calculado pela soma EPA + DHA, não pelo peso total da cápsula ou do óleo. Plumb’s descreve uso como adjuvante em dermatopatias inflamatórias, DRC, osteoartrite, doença cardiovascular, hiperlipidemia e outras condições, com resposta em semanas a meses.';

const OMEGA3_SAFETY_ALERT =
  'Usar com cautela em pancreatite prévia, diarreia crônica, coagulopatias, trombocitopenia ou uso de AINEs, antiagregantes e anticoagulantes. Evitar óleo de fígado de bacalhau para dose terapêutica e não usar óleo de linhaça como substituto de EPA/DHA em gatos.';

const DENTAL_PRICE_SOURCE_DATE = '2026-05-25';

const DENTAL_HYGIENE_CONTEXT =
  'Halitose não é diagnóstico. Doença periodontal exige exame oral, profilaxia com raspagem supra/subgengival e polimento, podendo exigir radiografia odontológica, extrações e tratamento da causa. Higienizadores, sprays, géis e aditivos são adjuvantes.';

const DENTAL_HYGIENE_ALERT =
  'Produto oral não remove cálculo mineralizado aderido. Se houver dor, sangramento, mobilidade dentária, fístula, abscesso, fratura, raiz exposta ou halitose persistente, indicar avaliação odontológica.';

const DENTAL_ANTIBIOTIC_ALERT =
  'Antibiótico odontológico não substitui profilaxia, drenagem, extração, radiografia ou tratamento da causa. Usar com diagnóstico, dose por peso e reavaliação.';

const CARDIO_PRICE_SOURCE_DATE = '2026-05-25';

const CARDIOLOGY_CONTEXT =
  'Cardiologia não deve ser tratada como uma categoria única: separar doença estrutural, congestão, pressão arterial, risco tromboembólico, hipertensão pulmonar e arritmia. Em cães com DMVM, o consenso ACVIM 2019 recomenda pimobendan em B2 com cardiomegalia e, no estágio C, geralmente pimobendan + diurético de alça, com modulação do SRAA conforme estabilidade.';

const CARDIO_RENAL_MONITORING_ALERT =
  'Exigir monitoramento de pressão arterial, hidratação, ureia, creatinina e eletrólitos quando houver diurético, IECA, ARB ou espironolactona. Cuidado em hipotensão, azotemia, desidratação, hipercalemia ou DRC/IRA instável.';

const CARDIO_DIURETIC_ALERT =
  'Diurético de alça trata congestão, não a causa estrutural. Usar a menor dose eficaz e monitorar desidratação, azotemia pré-renal, hipocalemia, hipocloremia, hiponatremia, alcalose metabólica, pressão arterial e interação com AINE.';

export const commercialOticProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'epiotic-sis-virbac',
    slug: 'epiotic-sis',
    name: 'Epiotic SIS',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/epiotic',
    imageUrl: 'https://br.virbac.com/files/live/sites/virbac-br/files/predefined-files/banners/Dogs/Epiotic%20SIS.png',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'moderate',
    presentations: ['Frasco 100 mL'],
    activeComponents: [
      'ácido salicílico 0,2%',
      'agentes tensoativos ceruminolíticos e mucolíticos 2%',
      'extratos vegetais 0,2%',
      'monossacarídeos 0,15%',
      'dioctil sulfossuccinato de sódio',
      'EDTA dissódico',
      'cloroxilenol',
    ],
    labelCompositionSummary:
      'Composição publicada por 100 mL: ácido salicílico 200 mg, agentes tensoativos ceruminolíticos e mucolíticos 2%, extratos vegetais 0,2%, monossacarídeos 0,15% e veículo q.s.p. A Virbac também descreve DSS, EDTA dissódico e cloroxilenol.',
    labelDirections:
      'Uso tópico otológico: aplicar no conduto auditivo, massagear a base da orelha e remover excesso. Frequência conforme orientação veterinária.',
    plumbsContext:
      'Limpador ceruminolítico/mucolítico com antisséptico leve; útil 10 a 15 minutos antes da limpeza quando houver cerúmen ou secreção.',
    clinicalUse:
      'Higiene, pré-tratamento de otites, manutenção e limpeza antes de medicação otológica em cães e gatos.',
    reassessment:
      'Reavaliar se houver dor, secreção purulenta, odor persistente, prurido intenso ou recorrência.',
    prescriptionExample:
      'Aplicar quantidade suficiente no conduto auditivo, massagear a base da orelha e remover excesso com algodão/gaze. Usar conforme orientação veterinária.',
    safetyAlert:
      'Evitar uso sem avaliação quando houver dor intensa, sinais vestibulares ou suspeita de tímpano rompido.',
    price: {
      averageLabel: 'R$ 100,00 a R$ 125,00',
      rangeLabel: 'Petz em torno de R$ 124,99 e assinatura R$ 112,49; Cobasi em torno de R$ 124,00 e compra programada R$ 99,20',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://br.virbac.com/products/dermatologicos/epiotic',
    },
  },
  {
    id: 'clean-up-agener-uniao',
    slug: 'clean-up-solucao-otologica',
    name: 'Clean-up Solução Otológica',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/clean-up/',
    imageUrl: 'https://aguiaveterinaria.fbitsstatic.net/img/p/clean-up-solucao-otologica-100ml-agener-uniao-71891/258752.jpg?w=600&h=600&v=no-change&qs=ignore',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'moderate',
    presentations: ['Frasco 100 mL'],
    activeComponents: ['Tris-EDTA', 'ácido salicílico', 'glicerina', 'aloe vera', 'calêndula', 'docusato de sódio'],
    labelCompositionSummary:
      'A página da Agener/Vetsmart publica Tris-EDTA, ácido salicílico, glicerina, extrato de aloe vera, óleo de calêndula, dioctil sulfossuccinato de sódio, glicerol, essência e água. Concentrações não publicadas na fonte oficial aberta.',
    labelDirections:
      'Higiene rotineira 1 a 2 vezes por semana, ou conforme critério veterinário. Pode ser usado antes de tratamentos otológicos.',
    plumbsContext:
      'Encaixa como ceruminolítico/adjuvante de limpeza; aplicar antes da limpeza aumenta contato com cerúmen. Evitar se tímpano não foi avaliado.',
    clinicalUse:
      'Pré-tratamento de otite e remoção de cerúmen/crostas. O diferencial é Tris-EDTA + ácido salicílico + DSS, com perfil mais clínico que limpadores cosméticos simples.',
    reassessment:
      'Reavaliar se dor, eritema, prurido, secreção ou odor persistirem após poucos dias, ou antes se houver piora.',
    prescriptionExample:
      'Aplicar no conduto auditivo, massagear a base da orelha e remover excesso. Usar 1 a 2 vezes por semana ou antes da medicação otológica, conforme orientação.',
    safetyAlert:
      'Verificar integridade timpânica; suspender se houver piora de dor, eritema, prurido ou irritação.',
    price: {
      averageLabel: 'R$ 61,52 a R$ 76,99',
      rangeLabel: 'Petlove/Cobasi em torno de R$ 61,52 em promoção ou recorrência; Petz em torno de R$ 76,99 cheio e R$ 61,52 assinatura',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://agener.com.br/produtos/pequenos-animais/dermatologicos/clean-up/',
    },
  },
  {
    id: 'septclean-oto-agener-uniao',
    slug: 'septclean-oto',
    name: 'SeptClean Oto',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/septclean-oto/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2023/08/sept-clean-oto.jpg',
    species: ['dog', 'cat'],
    roles: ['pre_treatment'],
    strength: 'moderate',
    presentations: ['Frasco 100 mL'],
    activeComponents: ['Tris-EDTA', 'clorexidina'],
    labelCompositionSummary:
      'A página oficial aberta informa Tris-EDTA e clorexidina, sem porcentagem ou quantidade por 100 mL. Cadastrar concentração como não publicada.',
    labelDirections:
      'Usar a cada 12 ou 24 horas por pelo menos 14 dias, ou sob orientação veterinária. Em animais predispostos a otite, pode ser usado 1 a 2 vezes por semana por tempo indeterminado.',
    plumbsContext:
      'Não é ceruminolítico puro; funciona melhor como limpador antisséptico com Tris-EDTA e clorexidina antes de terapias direcionadas.',
    clinicalUse:
      'Higiene dos condutos auditivos, remoção de cerúmen e secreções, controle de odor e uso antes de agentes terapêuticos.',
    reassessment:
      'Reavaliar se odor, secreção ou prurido persistirem após limpeza, pois pode haver otite bacteriana, Malassezia ou doença de base.',
    prescriptionExample:
      'Aplicar no conduto auditivo, massagear a base da orelha e remover excesso. Usar a cada 12-24 h por pelo menos 14 dias ou conforme orientação.',
    safetyAlert:
      'Por conter clorexidina e Tris-EDTA, evitar uso agressivo em canal ulcerado, dor intensa ou tímpano não avaliado.',
    price: {
      averageLabel: 'R$ 72,74 a R$ 96,99',
      rangeLabel: 'Petz em torno de R$ 96,99 e assinatura R$ 72,74; Cobasi em torno de R$ 96,90 e programada R$ 77,52; Petlove em torno de R$ 72,74',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://agener.com.br/produtos/pequenos-animais/dermatologicos/septclean-oto/',
    },
  },
  {
    id: 'aurivet-clean-vetnil',
    slug: 'aurivet-clean',
    name: 'Aurivet Clean',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://vetnil.com.br/produto/aurivet-r-clean',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/aurivet-r-clean.webp',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'strong',
    presentations: ['50 mL', '120 mL'],
    activeComponents: ['ácido lático 2,9%', 'melaleuca 1,0%', 'alantoína 1,0%', 'docusato de sódio 1,95%', 'ácido salicílico 0,1%', 'glicerina 50,4%', 'aloe vera 41,03%'],
    labelCompositionSummary:
      'Composição quantitativa publicada pela Vetnil em página internacional/espelhada por 100 g: ácido lático 2,9 g, melaleuca 1,0 g, alantoína 1,0 g, DSS 1,95 g, ácido salicílico 0,1 g, glicerina 50,4 g, aloe vera 41,03 g e excipientes q.s.p.',
    labelDirections:
      'Pavilhão com algodão embebido. Conduto: 2 gotas por orelha a cada 5 kg, máximo 10 gotas; massagear cerca de 1 minuto. Usar 1 a 2 vezes por semana e antes de produto terapêutico.',
    plumbsContext:
      'Docusato de sódio é descrito como ceruminolítico potente; ácidos e agentes de limpeza reforçam perfil de remoção de cerúmen/oleosidade.',
    clinicalUse:
      'Um dos melhores candidatos para cerúmen moderado a intenso, por combinar DSS 1,95%, ácido lático 2,9%, ácido salicílico 0,1% e glicerina.',
    reassessment:
      'Reavaliar otoscopia e citologia quando houver otite ativa, recorrência ou secreção persistente.',
    prescriptionExample:
      'Aplicar 2 gotas por orelha para cada 5 kg, sem exceder 10 gotas, massagear a base por 1 minuto e remover excesso. Frequência conforme indicação clínica.',
    safetyAlert:
      'Cautela em canal ulcerado, muito dolorido ou com tímpano não avaliado, especialmente em gatos.',
    price: {
      averageLabel: 'R$ 57,99 a R$ 81,99',
      rangeLabel: '50 mL em torno de R$ 57,99; 120 mL em torno de R$ 81,99; assinatura de 50 mL em torno de R$ 52,19',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://vetnil.com.br/produto/aurivet-r-clean',
    },
  },
  {
    id: 'aurivet-clean-ph-neutro-vetnil',
    slug: 'aurivet-clean-ph-neutro',
    name: 'Aurivet Clean pH Neutro',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://vetnil.com.br/produto/aurivet-r-clean-ph-neutro/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2025/11/Packshot_Aurivet-Clean-pH-Neutro_site_selo_V1.png',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner', 'sensitive_ear', 'pre_treatment'],
    strength: 'mild',
    presentations: ['50 mL', '120 mL'],
    activeComponents: ['EDTA', 'docusato de sódio', 'esqualano', 'Tris base', 'óleo de argan', 'calêndula', 'vitamina E'],
    labelCompositionSummary:
      'Fabricante/Vetsmart listam EDTA, docusato de sódio, esqualano, Tris base, óleo de argan, amêndoas doces, calêndula, oleoil polioxilglicerídeos, vitamina E, ácido cítrico, hidróxido de sódio, água, conservantes e emulsionantes. Concentrações não publicadas na fonte aberta.',
    labelDirections:
      'Pavilhão com algodão. Conduto: preencher com o produto, massagear a base da orelha e retirar excesso. Pode ser usado diariamente ou junto a produtos terapêuticos.',
    plumbsContext:
      'Esqualano é ceruminolítico oleoso e costuma ser mais tolerável; ainda assim não substitui avaliação timpânica.',
    clinicalUse:
      'Limpador/ceruminolítico mais suave para uso frequente, orelha sensível e terapia concomitante. Esqualano é diferencial por ser ceruminolítico oleoso menos agressivo.',
    reassessment:
      'Reavaliar se a limpeza diária for necessária por muitos dias, pois isso sugere doença de base não controlada.',
    prescriptionExample:
      'Preencher o conduto, massagear a base da orelha e remover excesso com algodão. Usar conforme orientação, inclusive como adjuvante durante terapia.',
    safetyAlert:
      'Apesar do pH neutro, contém docusato, EDTA e emulsionantes; evitar uso indiscriminado em dor intensa, ulceração ou suspeita de otite média.',
    price: {
      averageLabel: 'R$ 56,43 a R$ 96,03',
      rangeLabel: '50 mL em torno de R$ 56,43 a R$ 66,39; 120 mL em torno de R$ 90,70 a R$ 96,03',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://vetnil.com.br/produto/aurivet-r-clean-ph-neutro/',
    },
  },
  {
    id: 'phisioderm-virbac',
    slug: 'phisioderm-limpador-auricular',
    name: 'Phisioderm Limpador Auricular',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://br.virbac.com/products/skin-hygiene/phisiodermr-limpador-auricular',
    imageUrl: 'https://br.virbac.com/files/live/sites/virbac-br/files/everydaycare/Skin&Hygiene/images/Phisioderm%20Limpador%20auricular%20100mL-07A.png',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner'],
    strength: 'mild',
    presentations: ['100 mL'],
    activeComponents: ['polissorbato 20 3,5%', 'triglicerídeos 0,1%', 'trietanolamina 0,085%', 'cloreto de sódio', 'EDTA'],
    labelCompositionSummary:
      'Fabricante descreve polissorbato, triglicérides cáprico-caprílicos, cloreto de sódio, Preserval PE, EDTA, trietanolamina, aroma e água. Vetsmart detalha por 100 mL: polissorbato 20 3,50 g, triglicerídeos 0,10 g, trietanolamina 0,085 g, excipientes 1,35 g e água q.s.p.',
    labelDirections:
      'Preencher o conduto com o produto, massagear a base da orelha e enxugar pavilhão com algodão umedecido. Manutenção 1 a 2 vezes por semana.',
    plumbsContext:
      'Perfil de ceruminólise suave; melhor para manutenção do que para cerúmen impactado.',
    clinicalUse:
      'Limpador de manutenção, isotônico, pH fisiológico, ceruminolítico coloidal não espumante. Melhor para cerúmen leve a moderado, não para ceruminólise forte.',
    reassessment:
      'Se houver exsudato, eritema importante ou dor, investigar otite em vez de intensificar limpeza domiciliar.',
    prescriptionExample:
      'Aplicar até umedecer o conduto, massagear a base da orelha e remover excesso. Usar 1 a 2 vezes por semana.',
    safetyAlert:
      'Secreção purulenta, dor, meneios cefálicos ou alteração neurológica não devem ser tratados como higiene simples.',
    price: {
      averageLabel: 'R$ 67,00 a R$ 84,00',
      rangeLabel: 'R$ 67,12 a R$ 83,90',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://br.virbac.com/products/skin-hygiene/phisiodermr-limpador-auricular',
    },
  },
  {
    id: 'oto-clean-up-pet-society',
    slug: 'oto-clean-up-soft-care',
    name: 'Oto Clean Up',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://softcare.com.br/linha-dermato-veterinaria/oto-clean-up',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Oto-Clean-Up-1024x634.png',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner'],
    strength: 'mild',
    presentations: ['100 mL'],
    activeComponents: ['pantenol 0,5%', 'ácido glicirrízico 0,2%', 'ácido lático 0,2%', 'óleo essencial de menta 0,03%', 'óleo essencial de camomila 0,02%', 'glicerina', 'cocoanfoacetato de sódio'],
    labelCompositionSummary:
      'Composição publicada por 100 mL: pantenol 0,50 g, ácido glicirrízico 0,20 g, ácido lático 0,20 g, óleo essencial de menta 0,03 g e óleo essencial de camomila 0,02 g. Composição completa inclui água, glicerina, cocoanfoacetato de sódio e conservantes.',
    labelDirections:
      'Instilar no conduto, massagear e retirar excesso da parte externa com algodão ou gaze. Uso semanal ou conforme orientação.',
    plumbsContext:
      'Ceruminólise leve por glicerina/tensoativos; não equivale a produto com docusato ou Tris-EDTA.',
    clinicalUse:
      'Limpador de rotina mais suave, sem Tris-EDTA, DSS forte ou ácido salicílico. Melhor para manutenção, cerúmen leve e limpeza semanal.',
    reassessment:
      'Reavaliar se odor ou prurido persistirem, pois pode haver Malassezia, bactéria, ácaro ou doença alérgica.',
    prescriptionExample:
      'Instilar no conduto, massagear a base e remover excesso com algodão/gaze. Usar semanalmente ou conforme orientação.',
    safetyAlert:
      'Óleos essenciais podem irritar pacientes sensíveis; suspender se houver piora de eritema ou prurido.',
    price: {
      averageLabel: 'R$ 55,00 a R$ 60,00',
      rangeLabel: 'R$ 50,99 a R$ 59,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://softcare.com.br/linha-dermato-veterinaria/oto-clean-up',
    },
  },
  {
    id: 'propcalm-otologico-pet-society',
    slug: 'propcalm-otologico',
    name: 'PROPCALM Otológico',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://softcare.com.br/produtos/dermato/propcalm-otologico/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Propcalm-Otologico-1024x634.png',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner', 'sensitive_ear'],
    strength: 'mild',
    presentations: ['90 mL ou 100 mL conforme fornecedor'],
    activeComponents: ['extrato de própolis 1,0%', 'ácido glicirrízico 0,2%', 'óleo essencial de menta 0,03%', 'óleo essencial de camomila 0,02%'],
    labelCompositionSummary:
      'Composição publicada por 100 mL: extrato de própolis 1,00 g, ácido glicirrízico 0,20 g, óleo essencial de menta 0,03 g e óleo essencial de camomila 0,02 g.',
    labelDirections:
      'Aplicar 1 mL em cada conduto, massagear a base da orelha, deixar o animal balançar a cabeça e remover excesso. Uso semanal conforme orientação.',
    plumbsContext:
      'Limpador suave; não é ceruminolítico de alta potência.',
    clinicalUse:
      'Limpador suave para higiene, cerúmen leve e controle de odor. Não é o melhor para cerúmen denso/impactado.',
    reassessment:
      'Persistência de odor ou secreção deve levar a citologia e otoscopia.',
    prescriptionExample:
      'Aplicar 1 mL em cada conduto auditivo, massagear, permitir que o paciente balance a cabeça e remover excesso. Usar semanalmente.',
    safetyAlert:
      'Contém própolis e óleos essenciais; cautela em pacientes com histórico de hipersensibilidade.',
    price: {
      averageLabel: 'R$ 50,00 a R$ 55,00',
      rangeLabel: 'R$ 48,23 a R$ 64,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://softcare.com.br/produtos/dermato/propcalm-otologico/. Confirmar 90 a 100 mL conforme fornecedor.',
    },
  },
  {
    id: 'k-treat-oto-micelar-pet-society',
    slug: 'k-treat-oto-micelar',
    name: 'K-TREAT Oto Micelar',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://softcare.com.br/produtos/dermato/k-treat-oto-micelar/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/K-Treat-Oto-Micelar-1024x634.png',
    species: ['dog', 'cat'],
    roles: ['sensitive_ear', 'maintenance_cleaner'],
    strength: 'mild',
    presentations: ['100 mL'],
    activeComponents: ['pantenol 0,5%', 'aloe vera 0,5%', 'Mentha piperita 0,5%', 'baobá 0,5%', 'fitoesfingosina 0,02%', 'glicerina', 'lauramidopropil betaína'],
    labelCompositionSummary:
      'Composição publicada por 100 mL: pantenol 0,50 g, aloe vera 0,50 g, Mentha piperita 0,50 g, Adansonia digitata hidrolisada/baobá 0,50 g e fitoesfingosina 0,02 g. Composição completa inclui água, glicerina, lauramido-propil betaína e conservantes.',
    labelDirections:
      'Instilar até preencher o conduto, massagear e remover excesso. Pode ser aplicado diariamente conforme critério veterinário.',
    plumbsContext:
      'Mais voltado a limpeza/tolerabilidade do que a ceruminólise intensa.',
    clinicalUse:
      'Limpador micelar para orelha sensível/sensibilizada, mais voltado à barreira cutânea e conforto do que à ceruminólise potente.',
    reassessment:
      'Uso diário prolongado deve ser reavaliado; procurar causa primária da produção de cerúmen/irritação.',
    prescriptionExample:
      'Preencher o conduto, massagear a base e remover excesso com algodão/gaze. Frequência conforme orientação veterinária.',
    safetyAlert:
      'Menta e tensoativos podem arder em ouvido ulcerado.',
    price: {
      averageLabel: 'R$ 55,00 a R$ 65,00',
      rangeLabel: 'R$ 51,99 a R$ 64,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://softcare.com.br/produtos/dermato/k-treat-oto-micelar/',
    },
  },
  {
    id: 'dermogen-oto-agener-uniao',
    slug: 'dermogen-oto',
    name: 'Dermogen Oto',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/dermogen-oto-4/',
    imageUrl: 'https://io.convertiez.com.br/m/petcamp/shop/products/images/1840/medium/limpador-auricular-equilibrio-dermogen-oto-100-ml-15477_54076.png',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner', 'sensitive_ear'],
    strength: 'mild',
    presentations: ['100 mL'],
    activeComponents: ['ácido lático', 'alantoína', 'aloe vera', 'trolamina', 'polissorbato'],
    labelCompositionSummary:
      'Agener/Vetsmart publicam ácido lático, alantoína, aloe vera, trolamina, polissorbato, cloreto de sódio, conservantes, fenoxietanol/parabenos e água purificada, sem quantidades por 100 mL.',
    labelDirections:
      'Aplicar diretamente no pavilhão auricular e no conduto, 1 a 2 vezes por semana ou conforme orientação.',
    plumbsContext:
      'Limpador suave/hidratante; ceruminólise leve.',
    clinicalUse:
      'Limpador/hidratante auricular para higiene frequente, manutenção e limpeza leve. Não é produto de ceruminólise forte.',
    reassessment:
      'Em otite ativa, usar apenas como adjuvante e reavaliar resposta ao tratamento principal.',
    prescriptionExample:
      'Aplicar no pavilhão e conduto auditivo, massagear a base e remover excesso. Usar 1 a 2 vezes por semana.',
    safetyAlert:
      'Não vender como tratamento principal de otite ativa.',
    price: {
      averageLabel: 'R$ 46,00 a R$ 62,00',
      rangeLabel: 'R$ 46,49 promocional/assinante a R$ 61,99 cheio',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://agener.com.br/produtos/pequenos-animais/dermatologicos/dermogen-oto-4/',
    },
  },
  {
    id: 'ouvipet-dermocalmante-ibasa',
    slug: 'ouvipet-dermocalmante',
    name: 'Ouvipet Dermocalmante',
    manufacturer: 'Ibasa',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://www.ibasa.com.br/ouvipet-dermocalmante-caes-gatos-ibasa-30ml',
    imageUrl: 'https://ibasa.cdn.orangestore.cc/l1fhYC7JuDZ2XNyqUE8lu90hRVc=/fit-in/200x200/filters:quality(95):fill(ffffff,1)/n49shopv2_ibasa/images/products/697112b8aea8f/ouvipet_dermocalmante_ibasa_30ml_higienizador_de_ouvidos_para_caes_e_gatos_com_fitoesfingosina-697112b8aec2f.jpg',
    species: ['dog', 'cat'],
    roles: ['sensitive_ear', 'maintenance_cleaner'],
    strength: 'mild',
    presentations: ['30 mL'],
    activeComponents: ['fitoesfingosina 0,015%', 'cocoato de glicerila 0,6%', 'polissorbato 3,5%', 'trietanolamina 0,07%'],
    labelCompositionSummary:
      'Ibasa lista água purificada, polissorbato 80, cocoato de glicerila, cloreto de sódio, diazolidinil ureia, trietanolamina, fitoesfingosina e ácido cítrico. Vetsmart/varejos técnicos detalham por 100 mL: fitoesfingosina 15 mg, cocoato de glicerila 600 mg, polissorbato 3500 mg, trietanolamina 70 mg e excipientes q.s.p.',
    labelDirections:
      'Aplicar 5 a 10 gotas no conduto e massagear cerca de 1 minuto. Para pavilhão, aplicar com algodão. Frequência a critério veterinário.',
    plumbsContext:
      'Ceruminolítico leve/limpeza suave.',
    clinicalUse:
      'Limpador suave e dermocalmante para cerúmen leve, hidratação e suporte de barreira por conter fitoesfingosina.',
    reassessment:
      'Se usado em protocolo de otite, acompanhar por citologia/otoscopia e não por aparência do cerúmen apenas.',
    prescriptionExample:
      'Aplicar 5 a 10 gotas no conduto auditivo, massagear por cerca de 1 minuto e remover excesso. Frequência conforme orientação.',
    safetyAlert:
      'Evidência de suporte comercial/caso deve ser classificada como baixa; não substituir avaliação clínica.',
    price: {
      averageLabel: 'R$ 38,00 a R$ 42,00',
      rangeLabel: 'R$ 34,50 a R$ 48,99; loja oficial Ibasa em torno de R$ 42,90 e R$ 41,61 no Pix',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.ibasa.com.br/ouvipet-dermocalmante-caes-gatos-ibasa-30ml',
    },
    evidenceLevel: 'baixo',
  },
  {
    id: 'oto-top-clean-chemitec',
    slug: 'oto-top-clean',
    name: 'Oto-Top Clean',
    manufacturer: 'Chemitec',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://chemitec.com.br/produtos-por-animal/solucao-otologica-oto-top-clean/',
    imageUrl: 'https://chemitec.com.br/wp-content/uploads/2020/11/OtoTop_Mockup-1.png',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'moderate',
    presentations: ['100 mL'],
    activeComponents: ['ácido salicílico', 'ácido lático', 'ácido bórico', 'glicerina', 'propilenoglicol'],
    labelCompositionSummary:
      'Página/PDF da Chemitec listam ácido salicílico, ácido lático, ácido bórico, glicerina líquida, propilenoglicol e essência de pêssego, sem quantidades ou porcentagens por 100 mL.',
    labelDirections:
      'Agitar. Para pavilhão, usar algodão embebido. Para conduto, aplicar 5 a 10 gotas, massagear, permitir agitação da cabeça e remover excesso. Uso pelo menos semanal e após banho.',
    plumbsContext:
      'Ácidos, glicerina e propilenoglicol sustentam uso como ceruminolítico/queratolítico.',
    clinicalUse:
      'Limpador emoliente, queratolítico e acidificante, interessante para cerúmen/oleosidade e pré-limpeza.',
    reassessment:
      'Reavaliar rapidamente se houver dor importante, ulceração ou piora após aplicação.',
    prescriptionExample:
      'Aplicar 5 a 10 gotas em cada ouvido, massagear a base, permitir que o paciente balance a cabeça e remover excesso. Usar conforme orientação.',
    safetyAlert:
      'Contém ácido bórico e propilenoglicol; cautela em ouvido ulcerado, gatos sensíveis e tímpano não avaliado.',
    price: {
      averageLabel: 'R$ 27,00 a R$ 33,99',
      rangeLabel: 'Agrofarmed em torno de R$ 27,00; Agrotela em torno de R$ 27,99, com disponibilidade variável',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://chemitec.com.br/produtos-por-animal/solucao-otologica-oto-top-clean/. Bula: https://www.chemitec.com.br/bulas/solucao-otologica-oto-top-clean.pdf',
    },
  },
  {
    id: 'cerumisyn-konig',
    slug: 'cerumisyn-locao-gel',
    name: 'Cerumisyn Loção/Gel',
    manufacturer: 'König',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://konigbrasil.com.br/produtos/shampoo/dermato/cerumisyn-50-ml/',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1056484-368-368/Cerumisyn-200ml-para-caes-e-gatos.png?v=638491339420500000',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'moderate',
    presentations: ['Loção 50 mL', 'Loção 200 mL', 'Loção 1 L', 'Gel 50 mL', 'Gel 200 mL'],
    activeComponents: ['propilenoglicol 3,0%', 'extrato de camomila 1,0% v/v', 'cocoamidopropilbetaína 6,0%', 'ácido lático 2,4%', 'ácido salicílico 0,1%'],
    labelCompositionSummary:
      'Composição König por 100 mL: propilenoglicol 3,00 g, extrato de camomila 1,00 mL, cocoamidopropilbetaína 6,00 g, ácido lático 2,40 g, ácido salicílico 0,10 g e veículo q.s.p.',
    labelDirections:
      'Agitar. Limpar áreas acessíveis com algodão embebido; instilar 5 a 10 gotas no conduto, massagear, permitir agitação da cabeça e limpar externamente.',
    plumbsContext:
      'Produto com perfil clássico de ceruminólise, com propilenoglicol e ácidos orgânicos.',
    clinicalUse:
      'Ceruminolítico real, com boa formulação para cerúmen, oleosidade e pré-limpeza. Útil antes de Otosyn ou outros medicamentos otológicos.',
    reassessment:
      'Em recorrência, investigar dermatopatia/alergia, conformação, otite média e microrganismos por citologia.',
    prescriptionExample:
      'Instilar 5 a 10 gotas no conduto auditivo, massagear a base, permitir agitação da cabeça e limpar excesso externo.',
    safetyAlert:
      'Cautela em canal ulcerado ou tímpano incerto por conter propilenoglicol e ácidos.',
    price: {
      averageLabel: 'R$ 55,00 a R$ 61,00',
      rangeLabel: '200 mL por R$ 54,81 a R$ 60,90',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Links oficiais: https://konigbrasil.com.br/produtos/shampoo/dermato/cerumisyn-50-ml/ e https://konigbrasil.com.br/produtos/shampoo/dermato/cerumisyn-gel-50-ml/',
    },
  },
  {
    id: 'ototix-vetzam-dermatic',
    slug: 'ototix',
    name: 'Ototix',
    manufacturer: 'Vetzam / Dermatic',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://www.vetzam.com.br/ototix.html',
    imageUrl: 'https://www.vetzam.com.br/img/ototix%20large.jpg',
    species: ['dog', 'cat'],
    roles: ['maintenance_cleaner', 'pre_treatment'],
    strength: 'moderate',
    presentations: ['120 mL'],
    activeComponents: ['melaleuca', 'propylene glycol', 'polysorbate 20', 'aloe vera', 'álcool cereal', 'EDTA'],
    labelCompositionSummary:
      'Empresa/Vetsmart listam Melaleuca alternifolia oil, propylene glycol, polysorbate 20, aloe vera, cereal alcohol, disodium EDTA e purified water, sem quantidades ou porcentagens por 100 mL.',
    labelDirections:
      'Agitar. Embeber algodão e limpar toda a área acessível da orelha; seguir orientação veterinária.',
    plumbsContext:
      'Pode atuar como removedor de cerúmen e pré-medicação; EDTA pode ser útil como adjuvante.',
    clinicalUse:
      'Removedor de cerúmen e limpador pré-medicação. Atenção por conter álcool cereal, propilenoglicol e melaleuca.',
    reassessment:
      'Se houver ardor, dor ou piora inflamatória, suspender e reavaliar canal/tímpano.',
    prescriptionExample:
      'Embeber algodão com o produto e limpar áreas acessíveis da orelha. Não introduzir hastes no conduto.',
    safetyAlert:
      'Aviso forte para gatos sensíveis e tímpano incerto, principalmente por álcool e óleo de melaleuca.',
    price: {
      averageLabel: 'R$ 60,00 a R$ 68,00',
      rangeLabel: 'R$ 61,19 a R$ 67,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.vetzam.com.br/ototix.html',
    },
  },
  {
    id: 'otiflex-l-labyes',
    slug: 'otiflex-limpiador-otiflex-l',
    name: 'Otiflex Limpiador / Otiflex L',
    manufacturer: 'Labyes',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    commercialSubclasses: ['otic_ceruminolytic'],
    productPageUrl: 'https://labyes.com/productos/otiflex-limpiador/',
    imageUrl: 'https://amepettatix.vtexassets.com/arquivos/ids/187516/7798176420205.png?v=638544388726630000',
    species: ['dog', 'cat'],
    roles: ['ceruminolytic', 'pre_treatment'],
    strength: 'strong',
    presentations: ['25 mL', '100 mL conforme alguns fornecedores'],
    activeComponents: ['DMSO 5,0% v/v', 'ácido salicílico 2,0%', 'ácido bórico 2,5%', 'bórax 0,4%'],
    labelCompositionSummary:
      'Labyes publica por 100 mL: DMSO 5,0 mL, ácido salicílico 2,0 g, ácido bórico 2,5 g, bórax 0,4 g e excipientes q.s.p. Alguns varejos brasileiros citam laurilsulfato de sódio 0,08 g; confirmar lote/bula nacional.',
    labelDirections:
      'Aplicar 1 a 2 pulsações em cada ouvido conforme tamanho/profundidade do conduto, massagear a base. Para higiene habitual, usar 1 vez por semana; pode ser usado com maior frequência por critério profissional.',
    plumbsContext:
      'Ceruminolítico/acidificante mais agressivo; deve ser tratado como pré-tratamento com critério.',
    clinicalUse:
      'Ceruminolítico/acidificante mais forte para cerúmen aderido e pré-tratamento de otite, não para limpeza casual.',
    reassessment:
      'Reavaliar cedo em gato, dor intensa, ulceração ou qualquer sinal vestibular.',
    prescriptionExample:
      'Aplicar 1 a 2 doses no conduto auditivo, massagear a base e remover excesso. Usar somente conforme orientação veterinária.',
    safetyAlert:
      'Cuidado máximo em gato, canal inflamado, dor intensa ou tímpano incerto. DMSO pode aumentar penetração de substâncias e irritação.',
    price: {
      averageLabel: 'R$ 56,99 a R$ 67,00',
      rangeLabel: 'PetHere a partir de R$ 56,99; Império Rações em torno de R$ 67,00 e R$ 60,30 no Pix',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://labyes.com/productos/otiflex-limpiador/',
    },
  },
  {
    id: 'easotic-virbac',
    slug: 'easotic',
    name: 'easOtic',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/easotic',
    imageUrl: 'https://br.virbac.com/files/live/sites/virbac-br/files/predefined-files/products/News%20Packshoots/83746705+83746805-Easotic%2010ML-BR_WEB_210X210_right.png',
    species: ['dog'],
    strength: 'strong',
    presentations: ['Frasco 10 mL'],
    activeComponents: ['aceponato de hidrocortisona', 'gentamicina', 'nitrato de miconazol'],
    labelCompositionSummary:
      'Por 100 mL: aceponato de hidrocortisona 111 mg, sulfato de gentamicina 150.500 UI, nitrato de miconazol 1.510 mg e veículo q.s.p. 100 mL.',
    labelDirections:
      'Aplicar 1 mL por orelha, 1 vez ao dia, por no mínimo 5 dias consecutivos. Limpar o conduto se necessário, aplicar e massagear a base da orelha.',
    plumbsContext:
      'Produto otológico com antifúngico azólico, antibiótico aminoglicosídeo e anti-inflamatório. Exigir tímpano íntegro antes de aminoglicosídeo.',
    clinicalUse:
      'Otite externa canina bacteriana ou fúngica por microrganismos sensíveis, incluindo Malassezia pachydermatis.',
    reassessment:
      'Reavaliar se não houver melhora clínica em poucos dias, se houver dor intensa ou recorrência.',
    prescriptionExample:
      'Aplicar 1 mL no conduto auditivo afetado, SID, por pelo menos 5 dias consecutivos. Massagear a base após aplicação.',
    safetyAlert:
      'Somente cães. Não usar em gatos. Alerta forte para perfuração timpânica por conter gentamicina.',
    price: {
      averageLabel: 'R$ 190,00 a R$ 240,00',
      rangeLabel: 'Promocional/assinatura em torno de R$ 169,39; preço cheio em torno de R$ 241,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://br.virbac.com/products/dermatologicos/easotic',
    },
  },
  {
    id: 'aurigen-ourofino',
    slug: 'aurigen',
    name: 'Aurigen',
    manufacturer: 'Ourofino',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/aurigen/',
    imageUrl: 'https://www.ourofinopet.com/media/uploads/produtos/apresentacao/2023/20231025164726.png',
    species: ['dog'],
    strength: 'moderate',
    presentations: ['Bisnaga 15 g com cânula otológica'],
    activeComponents: ['gentamicina', 'dipropionato de betametasona', 'miconazol'],
    labelCompositionSummary:
      'Por 100 g: gentamicina 300 mg, dipropionato de betametasona 122 mg, miconazol 1.000 mg e excipiente q.s.p. 100 g.',
    labelDirections:
      'Cães até 15 kg: 4 gotas a cada 12 h. Cães com 15 kg ou mais: 8 gotas a cada 12 h. Tratar por 7 a 9 dias ou a critério veterinário.',
    plumbsContext:
      'Combina azólico, aminoglicosídeo e corticoide; usar com diagnóstico de otite externa e avaliação timpânica.',
    clinicalUse:
      'Otites agudas ou crônicas causadas por bactérias e/ou fungos em cães, incluindo Malassezia pachydermatis.',
    reassessment:
      'Reavaliar citologia após tratamento ou antes se houver piora, dor ou secreção persistente.',
    prescriptionExample:
      'Aplicar 4 gotas (<15 kg) ou 8 gotas (>=15 kg) no conduto afetado, BID, por 7 a 9 dias. Massagear a base.',
    safetyAlert:
      'Somente cães. Contém gentamicina; exigir tímpano íntegro.',
    price: {
      averageLabel: 'R$ 75,00 a R$ 85,00',
      rangeLabel: 'R$ 63,90 a R$ 99,90',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.ourofinopet.com/produtos/medicamentos/aurigen/',
    },
  },
  {
    id: 'aurivet-vetnil',
    slug: 'aurivet',
    name: 'Aurivet',
    manufacturer: 'Vetnil',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://vetnil.com.br/produto/aurivet-r',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/aurivet-r.png',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Bisnaga 13 g'],
    activeComponents: ['clotrimazol', 'gentamicina', 'betametasona', 'benzocaína'],
    labelCompositionSummary:
      'Por 100 g: clotrimazol 1,0 g, gentamicina 0,846 g, betametasona 0,151 g, benzocaína 2,0 g e excipientes.',
    labelDirections:
      'Cães até 15 kg e gatos: 4 gotas a cada 12 h por 15 dias. Cães acima de 15 kg: 8 gotas a cada 12 h por 15 dias. Fazer limpeza prévia.',
    plumbsContext:
      'Azólico + aminoglicosídeo + corticoide + anestésico; diferenciar otite por Malassezia/bactéria por citologia.',
    clinicalUse:
      'Otite externa aguda e crônica de cães e gatos, com espectro para Malassezia pachydermatis e Candida albicans.',
    reassessment:
      'Reavaliar citologia se sinais persistirem ao final do tratamento ou se houver recorrência.',
    prescriptionExample:
      'Após limpeza, aplicar 4 gotas (gatos e cães até 15 kg) ou 8 gotas (cães >15 kg), BID, por 15 dias.',
    safetyAlert:
      'Contém gentamicina; usar apenas com tímpano íntegro.',
    price: {
      averageLabel: 'R$ 100,00 a R$ 108,00',
      rangeLabel: 'Petz listando R$ 107,99, com assinatura menor',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://vetnil.com.br/produto/aurivet-r',
    },
  },
  {
    id: 'auritop-ourofino',
    slug: 'auritop',
    name: 'Auritop',
    manufacturer: 'Ourofino',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.ourofinopet.com/produtos/Dermatol%C3%B3gicos/auritop/',
    imageUrl: 'https://www.ourofinopet.com/media/uploads/produtos/apresentacao/2024/20240614085709_eVJhBYz.png',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Frasco/bisnaga 15 g'],
    activeComponents: ['ciprofloxacina', 'cetoconazol', 'fluocinolona', 'lidocaína'],
    labelCompositionSummary:
      'Por 100 g: ciprofloxacina 0,30 g, cetoconazol 1,00 g, acetonido de fluocinolona 0,02 g, lidocaína 2,00 g e excipientes.',
    labelDirections:
      'Aplicar no canal auditivo externo após limpeza. Dose detalhada deve ser confirmada na bula/material do fabricante.',
    plumbsContext:
      'Cetoconazol + fluoroquinolona + corticoide + anestésico; reservar fluoroquinolona para indicação racional.',
    clinicalUse:
      'Otites agudas ou crônicas por fungos e/ou bactérias em cães e gatos.',
    reassessment:
      'Idealmente acompanhar por citologia, especialmente em otite crônica, bastonetes ou falha terapêutica.',
    prescriptionExample:
      'Aplicar no conduto auditivo afetado após limpeza, conforme dose da bula e orientação veterinária.',
    safetyAlert:
      'Contém fluoroquinolona; evitar uso empírico indiscriminado em otites simples.',
    price: {
      averageLabel: 'R$ 62,00 a R$ 83,00',
      rangeLabel: 'Preço cheio em torno de R$ 82,99; assinatura/promocional em torno de R$ 62,24',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.ourofinopet.com/produtos/Dermatol%C3%B3gicos/auritop/',
    },
  },
  {
    id: 'otocalm-agener-uniao',
    slug: 'otocalm',
    name: 'Otocalm',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/otocalm/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2023/01/7773B_AGE22_Pack_Frasco_Otocalm.png',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Frasco 14 mL'],
    activeComponents: ['gentamicina', 'tiabendazol', 'betametasona', 'lidocaína'],
    labelCompositionSummary:
      'Por 100 mL: gentamicina 300 mg, tiabendazol 4.000 mg, betametasona 95 mg, lidocaína 2.000 mg e veículo.',
    labelDirections:
      'Menos de 15 kg: 4 gotas por orelha, BID, por 7 dias. Cães acima de 15 kg: 6 gotas por orelha, BID, por 7 dias.',
    plumbsContext:
      'Tiabendazol antifúngico associado a aminoglicosídeo, corticoide e anestésico local.',
    clinicalUse:
      'Otites externas bacterianas e fúngicas agudas e crônicas de cães e gatos.',
    reassessment:
      'Reavaliar se dor, secreção ou prurido persistirem após 7 dias.',
    prescriptionExample:
      'Aplicar 4 gotas por orelha (<15 kg) ou 6 gotas (>15 kg), BID, por 7 dias, ou conforme orientação.',
    safetyAlert:
      'Contém gentamicina; usar somente com tímpano íntegro.',
    price: {
      averageLabel: 'R$ 100,00 a R$ 115,00',
      rangeLabel: 'Cerca de R$ 96,99 a R$ 118,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://agener.com.br/produtos/pequenos-animais/dermatologicos/otocalm/',
    },
  },
  {
    id: 'otodex-ucbvet',
    slug: 'otodex',
    name: 'Otodex',
    manufacturer: 'UCBVET',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://ucbvet.com/produto/otodex/',
    imageUrl: 'https://ucbvet.com/wp-content/uploads/2024/10/Otodex-30-mL-new.webp',
    species: ['dog', 'cat'],
    strength: 'strong',
    presentations: ['Frasco plástico com cânula otológica 30 mL'],
    activeComponents: ['enrofloxacina', 'clotrimazol', 'betametasona'],
    labelCompositionSummary:
      'Por mL: enrofloxacina HCl 2,33 mg/mL, clotrimazol 10 mg/mL, betametasona 1,32 mg/mL e veículo.',
    labelDirections:
      'Cães até 7 kg: 1 borrifada BID. 7 a 14 kg: 2 borrifadas BID. >14 kg: 3 borrifadas BID. Gatos até 7 kg: 1 borrifada BID; >7 kg: 2 borrifadas BID.',
    plumbsContext:
      'Fluoroquinolona + azólico + corticoide; usar com critério, preferindo citologia.',
    clinicalUse:
      'Otites agudas ou crônicas de cães e gatos por fungos e/ou bactérias com inflamação.',
    reassessment:
      'Reavaliar em otites crônicas, bastonetes, falha de resposta ou necessidade de uso prolongado.',
    prescriptionExample:
      'Aplicar borrifadas conforme peso a cada 12 horas até melhora, com acompanhamento veterinário.',
    safetyAlert:
      'Contém fluoroquinolona; não usar como primeira escolha empírica sem citologia em otites simples.',
    price: {
      averageLabel: 'R$ 145,99',
      rangeLabel: 'Petz listando R$ 145,99 e assinatura em torno de R$ 131,39',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://ucbvet.com/produto/otodex/',
    },
  },
  {
    id: 'otoguard-cepav',
    slug: 'otoguard',
    name: 'Otoguard',
    manufacturer: 'CEPAV',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.cepav.com.br/wp-content/uploads/2018/03/OTOGUARD-logonovo12_20180222_SGF_1129.pdf',
    imageUrl: 'https://www.petlove.com.br/images/products/172245/product/7898146300213.jpg?1770446695',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Frasco conta-gotas 20 mL'],
    activeComponents: ['cetoconazol', 'tobramicina', 'dexametasona', 'lidocaína'],
    labelCompositionSummary:
      'Por 100 mL: cetoconazol 1,0 g, sulfato de tobramicina 0,38 g, dexametasona 0,132 g, lidocaína 1,9 g e veículo.',
    labelDirections:
      'Dose precisa necessita confirmação manual na bula completa/embalagem; PDF público consultado trouxe fórmula e indicação.',
    plumbsContext:
      'Cetoconazol + aminoglicosídeo + corticoide + anestésico; atenção a tímpano íntegro.',
    clinicalUse:
      'Otites externas agudas e crônicas bacterianas ou micóticas em cães e gatos.',
    reassessment:
      'Confirmar dose antes da prescrição e reavaliar citologia se sinais persistirem.',
    prescriptionExample:
      'Confirmar posologia na bula completa antes de prescrever.',
    safetyAlert:
      'DoseNeedsManualConfirmation: confirmar posologia. Contém tobramicina; exigir tímpano íntegro.',
    price: {
      averageLabel: 'R$ 135,00 a R$ 150,00',
      rangeLabel: 'Agrosolo em torno de R$ 135,90; Agro Meyer em torno de R$ 149,90',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'PDF oficial: https://www.cepav.com.br/wp-content/uploads/2018/03/OTOGUARD-logonovo12_20180222_SGF_1129.pdf',
    },
  },
  {
    id: 'otosyn-konig',
    slug: 'otosyn',
    name: 'Otosyn',
    manufacturer: 'König',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://konigbrasil.com.br/produtos/otologico/otosyn-15-ml/',
    imageUrl: 'https://admin.casadoprodutor.com.br/media/catalog/product/t/n/tn500-medicamento-otosyn-15-ml-koing-500x500_1_1.jpg',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Frasco 15 mL'],
    activeComponents: ['tiabendazol', 'triancinolona', 'neomicina'],
    labelCompositionSummary:
      'Por 100 mL: tiabendazol 4,0 g, acetonida de triancinolona 0,10 g, sulfato de neomicina 0,28 g e veículo.',
    labelDirections:
      'Limpar antes, aplicar 4 a 8 gotas no conduto, 2 vezes ao dia, até desaparecimento dos sintomas, com acompanhamento veterinário.',
    plumbsContext:
      'Tiabendazol + neomicina + corticoide; atenção especial a gatos e membrana timpânica.',
    clinicalUse:
      'Dermatites e otites externas causadas por bactérias e fungos, com dor e/ou prurido.',
    reassessment:
      'Reavaliar em 7 dias ou antes se houver dor intensa, sinais vestibulares ou piora.',
    prescriptionExample:
      'Aplicar 4 a 8 gotas no conduto auditivo afetado, BID, até resolução dos sinais, conforme acompanhamento.',
    safetyAlert:
      'Contém neomicina; exigir tímpano íntegro, principalmente em gatos.',
    price: {
      averageLabel: 'R$ 110,00 a R$ 125,00',
      rangeLabel: 'Cerca de R$ 99,90 a R$ 123,07',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://konigbrasil.com.br/produtos/otologico/otosyn-15-ml/',
    },
  },
  {
    id: 'otodermin-bravet',
    slug: 'otodermin',
    name: 'Otodermin',
    manufacturer: 'Bravet',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.bravet.com.br/otodermin',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/800507/Otodermin.jpg?v=638150197485300000',
    species: ['dog', 'cat'],
    strength: 'moderate',
    presentations: ['Frasco conta-gotas 20 mL'],
    activeComponents: ['tiabendazol', 'neomicina', 'dexametasona'],
    labelCompositionSummary:
      'Por 100 mL: tiabendazol 4 g, neomicina 0,533 g, dexametasona 0,1 g e veículo.',
    labelDirections:
      'Otite externa: 5 a 15 gotas em cada ouvido afetado, 2 a 3 vezes ao dia. Dermatoses: umedecer área lesionada 2 vezes ao dia.',
    plumbsContext:
      'Opção antiga e mais acessível com tiabendazol, neomicina e corticoide.',
    clinicalUse:
      'Otite externa pruriginosa ou supurada em cães e gatos por bactérias e agentes micóticos.',
    reassessment:
      'Reavaliar em otite ulcerativa, crônica, suspeita de tímpano rompido ou gato com sinais vestibulares.',
    prescriptionExample:
      'Aplicar 5 a 15 gotas no ouvido afetado, 2 a 3 vezes ao dia, conforme gravidade e orientação.',
    safetyAlert:
      'Contém neomicina e corticoide; cautela em otite ulcerativa, crônica ou tímpano incerto.',
    price: {
      averageLabel: 'R$ 45,00 a R$ 50,00',
      rangeLabel: 'Lojas entre R$ 42,90 e R$ 49,90',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.bravet.com.br/otodermin',
    },
  },
  {
    id: 'otomax-msd',
    slug: 'otomax',
    name: 'Otomax',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/otomax/',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/otomax-e1594207637831.png',
    species: ['dog'],
    strength: 'moderate',
    presentations: ['12,5 g/14 mL ou 15 g conforme fornecedor'],
    activeComponents: ['gentamicina', 'betametasona', 'clotrimazol'],
    labelCompositionSummary:
      'Por 100 g: gentamicina 300 mg, valerato de betametasona 122 mg, clotrimazol 1.000 mg e excipiente.',
    labelDirections:
      'Cães <15 kg: 4 gotas BID por 7 dias. Cães >=15 kg: 8 gotas BID por 7 dias. Limpar e secar o ouvido antes.',
    plumbsContext:
      'Clássico cão: gentamicina + betametasona + clotrimazol; não usar em gatos.',
    clinicalUse:
      'Otite externa aguda e crônica de cães por fungos e bactérias sensíveis.',
    reassessment:
      'Reavaliar se não houver melhora em 7 dias ou se houver recorrência.',
    prescriptionExample:
      'Aplicar 4 gotas (<15 kg) ou 8 gotas (>=15 kg) no ouvido afetado, BID, por 7 dias.',
    safetyAlert:
      'Somente cães. Contém gentamicina; exigir tímpano íntegro.',
    price: {
      averageLabel: 'R$ 85,00 a R$ 110,00',
      rangeLabel: 'Cerca de R$ 84,79 a R$ 122,50',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.msd-saude-animal.com.br/produto/otomax/',
    },
  },
  {
    id: 'posatex-msd',
    slug: 'posatex',
    name: 'Posatex',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/posatex/',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/posatex.jpg',
    species: ['dog'],
    strength: 'strong',
    presentations: ['Frasco 17,5 mL/15 g conforme fornecedor'],
    activeComponents: ['orbifloxacino', 'mometasona', 'posaconazol'],
    labelCompositionSummary:
      'Por mL: orbifloxacino 8,5 mg/mL, furoato de mometasona 0,9 mg/mL, posaconazol 0,9 mg/mL e veículo.',
    labelDirections:
      '<2 kg: 2 gotas SID. 2 a 15 kg: 4 gotas SID. >=15 kg: 8 gotas SID. Duração: 7 dias consecutivos.',
    plumbsContext:
      'Produto forte e prático com fluoroquinolona, corticoide e posaconazol.',
    clinicalUse:
      'Otite externa aguda e exacerbações de otite recorrente por bactérias sensíveis ao orbifloxacino e fungos sensíveis ao posaconazol.',
    reassessment:
      'Reavaliar uso em otites recorrentes e evitar repetição sem citologia/cultura quando indicado.',
    prescriptionExample:
      'Agitar; limpar e secar o canal. Aplicar dose por peso SID por 7 dias consecutivos.',
    safetyAlert:
      'Somente cães. Contém orbifloxacino; usar com critério e evitar banalização de fluoroquinolona.',
    price: {
      averageLabel: 'R$ 130,00 a R$ 153,00',
      rangeLabel: 'Cerca de R$ 129,99 a R$ 152,99',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://www.msd-saude-animal.com.br/produto/posatex/',
    },
  },
  {
    id: 'cipro-otic-syntec',
    slug: 'cipro-otic',
    name: 'Cipro-Otic',
    manufacturer: 'Syntec',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_antifungal',
    commercialSubclasses: ['otic_antifungal', 'otic_antibacterial', 'otic_corticosteroid'],
    productPageUrl: 'https://syntec.com.br/produtos/cipro-otic-pomada-otologica-syntec',
    imageUrl: 'https://syntec.com.br/storage/produtos/cipro-otic-15-59-01.webp',
    species: ['dog'],
    strength: 'moderate',
    presentations: ['Bisnaga 15 g'],
    activeComponents: ['ciprofloxacina', 'clotrimazol', 'betametasona'],
    labelCompositionSummary:
      'Por 100 g: ciprofloxacina base 0,5 g, clotrimazol 1,0 g, betametasona 0,172 g e veículo.',
    labelDirections:
      'Cães até 15 kg: 5 gotas em cada ouvido a cada 12 h. Cães acima de 15 kg: 10 gotas a cada 12 h. Otite aguda: 7 a 10 dias; crônica: 21 dias.',
    plumbsContext:
      'Ciprofloxacina + clotrimazol + betametasona, semelhante em lógica a produtos com fluoroquinolona/azólico.',
    clinicalUse:
      'Otite externa aguda e crônica em cães causada por bactérias, fungos e leveduras.',
    reassessment:
      'Em otite crônica, acompanhar com citologia e considerar cultura se bastonetes/falha.',
    prescriptionExample:
      'Aplicar 5 gotas (<15 kg) ou 10 gotas (>15 kg) em cada ouvido afetado, BID. Duração conforme aguda/crônica.',
    safetyAlert:
      'Somente cães. Contém fluoroquinolona; usar com critério.',
    price: {
      averageLabel: 'R$ 75,00 a R$ 85,00',
      rangeLabel: 'Varejos em torno de R$ 79,90 a R$ 80,50',
      sourceDate: PRICE_SOURCE_DATE,
      notes: 'Link oficial: https://syntec.com.br/produtos/cipro-otic-pomada-otologica-syntec',
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/apoquel',
    productPageUrl: 'https://www.zoetis.com.br/nossos-produtos/caes/apoquel.aspx',
    id: 'apoquel-zoetis',
    slug: 'apoquel-oclacitinib',
    name: 'Apoquel',
    manufacturer: 'Zoetis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1089500/Apoquel-16-mg---Tratamento-para-coceira-em-Caes.webp?v=638974316343630000',
    species: ['dog'],
    presentations: ['Comprimidos 3,6 mg', 'Comprimidos 5,4 mg', 'Comprimidos 16 mg'],
    activeComponents: ['maleato de oclacitinib'],
    labelCompositionSummary:
      'Antipruriginoso sistêmico inibidor de Janus quinase, principalmente JAK1. Apresentações comerciais de 3,6 mg, 5,4 mg e 16 mg.',
    labelDirections:
      '0,4 a 0,6 mg/kg VO a cada 12 horas por até 14 dias; depois 0,4 a 0,6 mg/kg VO a cada 24 horas para manutenção. Pode ser administrado com ou sem alimento.',
    plumbsContext:
      'Boa opção para controle rápido de prurido alérgico em cães. Uso contínuo BID é extra bula e aumenta preocupação com imunossupressão.',
    clinicalUse:
      'Prurido associado a dermatite alérgica e manifestações clínicas de dermatite atópica canina, especialmente em crise pela rapidez de ação.',
    reassessment:
      'Reavaliar se resposta for incompleta, investigando pulgas, Malassezia, piodermite, otite, alergia alimentar, escabiose e demodicose.',
    prescriptionExample:
      'Administrar 0,4-0,6 mg/kg VO BID por até 14 dias; depois reduzir para SID conforme controle clínico.',
    safetyAlert:
      'Somente cães. Não usar em cães com menos de 12 meses, neoplasia, demodicose, infecção grave ou imunossupressão importante. Não aprovado para gatos.',
    price: {
      averageLabel: 'R$ 185,00 a R$ 450,00',
      rangeLabel: '3,6 mg cerca de R$ 185-210; 5,4 mg cerca de R$ 205-230; 16 mg cerca de R$ 410-450',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/cytopoint',
    productPageUrl: 'https://www.zoetis.com.br/nossos-produtos/caes/cytopoint.aspx',
    id: 'cytopoint-zoetis',
    slug: 'cytopoint-lokivetmab',
    name: 'Cytopoint',
    manufacturer: 'Zoetis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl:
      'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Dermatologia/Cytopoint/_assets/cytopoint-bottles.png',
    species: ['dog'],
    presentations: ['10 mg/mL', '20 mg/mL', '30 mg/mL', '40 mg/mL', 'Frascos de 1 mL dose única'],
    activeComponents: ['lokivetmab'],
    labelCompositionSummary:
      'Anticorpo monoclonal caninizado anti-interleucina 31, em frascos de 1 mL por dose.',
    labelDirections:
      'Dose mínima de 2 mg/kg SC. Repetir a cada 4 a 8 semanas conforme resposta individual. Combinar frascos conforme peso quando necessário.',
    plumbsContext:
      'Neutraliza IL-31, citocina importante na via da coceira. Pode ser útil quando se quer evitar comprimidos ou corticoide.',
    clinicalUse:
      'Dermatite atópica canina, especialmente em controle mensal em clínica ou quando há dificuldade de administração oral.',
    reassessment:
      'Se não houver resposta, procurar infecção secundária, pulgas, Malassezia, otite, alergia alimentar e falha de controle ambiental antes de trocar droga.',
    prescriptionExample:
      'Aplicar no mínimo 2 mg/kg por via SC e repetir a cada 4-8 semanas conforme necessidade clínica.',
    safetyAlert:
      'Somente cães. Não usar em gatos. Não trata piodermite, Malassezia, pulgas ou otite secundária.',
    price: {
      averageLabel: 'R$ 250,00 a R$ 700,00',
      rangeLabel: '10 mg cerca de R$ 250-350; 20 mg R$ 300-450; 30 mg R$ 400-550; 40 mg R$ 500-700, variando por aplicação/clínica',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/cyclavance',
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/cyclavance',
    id: 'cyclavance-virbac',
    slug: 'cyclavance-ciclosporina',
    name: 'Cyclavance',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    commercialSubclasses: ['skin_atopy', 'skin_pruritus'],
    imageUrl:
      'https://vet-uk.virbac.com/files/live/sites/virbac-b2b-uk/files/pictures/Packshots/Cyclavance/84023601-83928702_CYLAVANCE-15ML-UK-IE_WEB_600X600_face.png',
    species: ['dog'],
    presentations: ['15 mL', '30 mL', '50 mL', 'Solução oral 100 mg/mL'],
    activeComponents: ['ciclosporina 100 mg/mL'],
    labelCompositionSummary:
      'Ciclosporina 100 mg/mL em solução oral. No Brasil, a página comercial consultada está direcionada a cães.',
    labelDirections:
      '0,05 mL/kg VO a cada 24 horas, equivalente a 5 mg/kg VO SID. Administrar 2 horas antes ou 2 horas depois da alimentação. Duração usual 30 a 90 dias conforme avaliação.',
    plumbsContext:
      'Para cães: 5 mg/kg VO SID por cerca de 30 dias, depois tentar reduzir para dias alternados e, se possível, duas vezes por semana. Benefício completo pode levar 4 a 6 semanas.',
    clinicalUse:
      'Dermatite atópica crônica, manutenção e redução de dependência de corticoide. Não é melhor escolha para alívio imediato.',
    reassessment:
      'Reavaliar em 4 a 6 semanas, controlando infecções secundárias e ajustando para menor frequência eficaz quando possível.',
    prescriptionExample:
      'Administrar 5 mg/kg VO SID, longe da alimentação, por 30 dias; depois tentar reduzir frequência conforme resposta.',
    safetyAlert:
      'Evitar em neoplasia, infecção ativa importante ou imunossupressão. Atenção a vômito, diarreia, hiperplasia gengival, papilomatose, vacinação e interações com azóis/macrolídeos.',
    price: {
      averageLabel: 'R$ 425,00 a R$ 1.085,00',
      rangeLabel: '15 mL cerca de R$ 425-530; 30 mL R$ 700-850; 50 mL R$ 995-1.085',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/cortavance',
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/cortavance',
    id: 'cortavance-virbac',
    slug: 'cortavance-aceponato-hidrocortisona',
    name: 'Cortavance',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl:
      'https://vet-uk.virbac.com/files/live/sites/virbac-b2b-uk/files/pictures/Packshots/Cortavance/308794-CORTAVANCE-31ML-VGB_PACKSHOT_WEB_600X600_face.png',
    species: ['dog'],
    presentations: ['Spray 76 mL'],
    activeComponents: ['aceponato de hidrocortisona 0,05842%'],
    labelCompositionSummary:
      'Cada 100 mL contém aceponato de hidrocortisona 0,05842 g.',
    labelDirections:
      'Aplicação tópica sobre área afetada, em geral 1 vez ao dia por 7 dias, conforme bula e avaliação veterinária. Evitar olhos, mucosas e uso prolongado em áreas extensas.',
    plumbsContext:
      'Glicocorticoide tópico útil para lesões localizadas e estratégia poupadora de corticoide sistêmico.',
    clinicalUse:
      'Prurido e inflamação em cães por DAPP, dermatite úmida aguda, dermatite alérgica de contato e dermatite atópica.',
    reassessment:
      'Reavaliar se houver infecção secundária, lesão extensa, recorrência rápida ou necessidade de cursos repetidos.',
    prescriptionExample:
      'Aplicar uma vez ao dia sobre as áreas afetadas por até 7 dias, evitando olhos e mucosas.',
    safetyAlert:
      'Somente cães. Não usar cronicamente sem pausas. Pode causar atrofia cutânea se usado em excesso; não usar sozinho em infecção sem tratá-la.',
    price: {
      averageLabel: 'R$ 190,00 a R$ 275,00',
      rangeLabel: 'Petz cerca de R$ 274,99 e R$ 192,49 assinatura; Petlove cerca de R$ 274,90 e R$ 247,41 recorrência',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/cortotic',
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/cortotic',
    id: 'cortotic-virbac',
    slug: 'cortotic-aceponato-hidrocortisona-otologico',
    name: 'Cortotic',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_corticosteroid',
    commercialSubclasses: ['otic_corticosteroid', 'skin_pruritus'],
    imageUrl:
      'https://www.petlove.com.br/images/products/277889/product/cortotic2.jpg?1771058128',
    species: ['dog'],
    presentations: ['Solução otológica para cães'],
    activeComponents: ['aceponato de hidrocortisona 0,584 mg/mL'],
    labelCompositionSummary:
      'Solução otológica com aceponato de hidrocortisona 0,584 mg/mL.',
    labelDirections:
      'Instilar 2 borrifadas por orelha acometida a cada 24 horas, por 7 a 14 dias consecutivos. Recomenda-se a limpeza do canal auditivo externo antes da primeira aplicação.',
    plumbsContext:
      'Corticosteroide otológico tópico para inflamação/prurido de otite externa não purulenta; não substitui citologia quando há secreção, dor ou suspeita infecciosa.',
    clinicalUse:
      'Otite externa não purulenta em cães, especialmente eritematosa/pruriginosa sem citologia infecciosa relevante.',
    reassessment:
      'Fazer citologia quando possível e reavaliar se houver secreção, dor, microrganismos abundantes ou suspeita de otite média.',
    prescriptionExample:
      'Instilar 2 borrifadas de Cortotic na orelha afetada a cada 24 horas, por 7 a 14 dias consecutivos.',
    safetyAlert:
      'Somente cães. Não usar em animais com menos de 4 meses. Não administrar em casos de perfuração da membrana timpânica, lesões ulceradas, otite purulenta ou parasitária.',
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Confirmar varejo/estoque',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/prediderm-5-mg',
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/prediderm/',
    id: 'prediderm-ourofino',
    slug: 'prediderm-prednisolona',
    name: 'Prediderm',
    manufacturer: 'Ourofino',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1043759/Prediderm-20mg-para-caes.png?v=638146729978430000',
    species: ['dog'],
    presentations: ['Comprimidos 5 mg', 'Comprimidos 20 mg'],
    activeComponents: ['prednisolona 5 mg', 'prednisolona 20 mg'],
    labelCompositionSummary:
      'Glicocorticoide sistêmico anti-inflamatório/antipruriginoso. Cada comprimido contém prednisolona 5 mg ou 20 mg conforme apresentação.',
    labelDirections:
      'Para prurido/alergia em cães: 0,5 a 1 mg/kg VO SID, podendo dividir BID por curto período em crise; depois reduzir gradualmente para menor dose efetiva.',
    plumbsContext:
      'Útil como ponte curta e barata em crise inflamatória, enquanto se investiga a causa do prurido.',
    clinicalUse:
      'Crise alérgica, DAPP, dermatite úmida aguda, hipersensibilidade e prurido intenso em curto prazo.',
    reassessment:
      'Reavaliar rapidamente se precisar manter ou repetir cursos; investigar causa primária e infecções secundárias.',
    prescriptionExample:
      'Administrar 0,5-1 mg/kg VO SID por poucos dias; reduzir gradualmente conforme resposta e plano clínico.',
    safetyAlert:
      'Não associar a AINE. Evitar/cautela em diabetes, DRC descompensada, infecção ativa, úlcera GI, pancreatite e hiperadrenocorticismo.',
    price: {
      averageLabel: 'R$ 20,00 a R$ 62,00',
      rangeLabel: '5 mg cerca de R$ 20-25; 20 mg cerca de R$ 55-62',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://consultaremedios.com.br/prednisolona/bula',
    productPageUrl: 'https://consultaremedios.com.br/prednisolona/bula',
    id: 'prednisolona-humana',
    slug: 'prednisolona-humana-predsim-genericos',
    name: 'Prednisolona humana',
    manufacturer: 'Predsim / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl:
      'https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/88/98/88983_prednisolona-3mg-ml-60ml-p62822_m1_638277834246078138.webp',
    species: ['dog', 'cat'],
    presentations: ['Solução oral 3 mg/mL', 'Solução oral 1 mg/mL', 'Comprimidos conforme fabricante'],
    activeComponents: ['prednisolona'],
    labelCompositionSummary:
      'Produto humano usado extra bula em cães e gatos. Formulações variam por concentração e excipientes.',
    labelDirections:
      'Cães: 0,5 a 1 mg/kg VO SID, podendo dividir BID em crise por poucos dias. Gatos: 0,55 a 2,2 mg/kg VO a cada 24 horas, em uma ou duas administrações, conforme gravidade.',
    plumbsContext:
      'Em gatos, preferir prednisolona em vez de prednisona quando for usar glicocorticoide oral.',
    clinicalUse:
      'Terapia curta para prurido alérgico em cães e gatos; útil em gatos por permitir ajuste fino em solução.',
    reassessment:
      'Evitar transformar em solução crônica barata sem diagnóstico. Reavaliar doença de base e efeitos adversos.',
    prescriptionExample:
      'Administrar prednisolona por curto período na dose anti-inflamatória apropriada à espécie; reduzir conforme resposta.',
    safetyAlert:
      'Checar excipientes de soluções humanas, incluindo açúcar, aroma, álcool, conservantes ou xilitol. Em gato obeso, considerar peso magro.',
    price: {
      averageLabel: 'R$ 20,00 a R$ 60,00',
      rangeLabel: 'Variável conforme concentração, marca e volume',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/azium-comprimidos',
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/azium-comprimidos/',
    id: 'azium-msd',
    slug: 'azium-dexametasona',
    name: 'Azium',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://www.petlove.com.br/images/products/190889/product/Azium-3-4.jpg?1770533102',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos 0,5 mg', 'Solução injetável 2 mg/mL'],
    activeComponents: ['dexametasona'],
    labelCompositionSummary:
      'Glicocorticoide sistêmico potente. Comprimidos com acetato de dexametasona 0,5 mg; injetável com dexametasona 2 mg/mL conforme apresentação.',
    labelDirections:
      'Para prurido alérgico, não é primeira escolha. Quando usado, considerar dose anti-inflamatória baixa, geralmente em torno de 0,05 a 0,1 mg/kg conforme caso.',
    plumbsContext:
      'Mais potente e com maior supressão adrenal que prednisolona. Melhor reservado para resgate curto.',
    clinicalUse:
      'Crises muito agudas, reação alérgica intensa ou necessidade de ação rápida quando não há contraindicação.',
    reassessment:
      'Reavaliar em poucos dias; não usar como manutenção de dermatite atópica.',
    prescriptionExample:
      'Usar apenas em curso curto e dose anti-inflamatória baixa, ajustada ao caso.',
    safetyAlert:
      'Evitar em diabetes, infecção ativa, úlcera, DRC descompensada, pancreatite e associação com AINE.',
    price: {
      averageLabel: 'R$ 30,00 a R$ 40,00',
      rangeLabel: 'Comprimidos 20 unidades em varejos menores; injetável variável/uso hospitalar',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://consultaremedios.com.br/hixizine/bula',
    productPageUrl: 'https://consultaremedios.com.br/hixizine/bula',
    id: 'hixizine-hidroxizina',
    slug: 'hixizine-hidroxizina',
    name: 'Hixizine / hidroxizina',
    manufacturer: 'Uso humano / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/webp/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/1211460d1b/dicloridrato-de-hidroxizina-25mg-com-30-comprimidos-generico-ems_jpg.webp',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos 25 mg', 'Xarope 2 mg/mL 120 mL'],
    activeComponents: ['dicloridrato de hidroxizina'],
    labelCompositionSummary:
      'Anti-histamínico H1 de primeira geração usado extra bula em cães e gatos.',
    labelDirections:
      'Cães: 2 mg/kg VO a cada 12 horas, podendo haver uso de 3 mg/kg BID. Gatos: 5 a 10 mg/gato VO a cada 12 horas, ou 2 mg/kg VO a cada 12 horas.',
    plumbsContext:
      'Anti-histamínico não é substituto de Apoquel/Cytopoint. Resposta em atopia ativa é modesta e individual; funciona melhor em quadros leves/prevenção.',
    clinicalUse:
      'Prurido leve, urticária, hipersensibilidade a picada de inseto e adjuvante em atopia leve.',
    reassessment:
      'Se não houver resposta, investigar infecção, parasitas, alergia alimentar e atopia moderada/grave.',
    prescriptionExample:
      'Administrar 2 mg/kg VO BID em cães; em gatos, 5-10 mg/gato BID ou 2 mg/kg BID.',
    safetyAlert:
      'Pode causar sedação, boca seca, retenção urinária e constipação. Cuidado com opioides, trazodona, gabapentina e outros sedativos.',
    price: {
      averageLabel: 'R$ 15,00 a R$ 50,00',
      rangeLabel: 'Comprimidos cerca de R$ 15-35; xarope cerca de R$ 25-50',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://consultaremedios.com.br/polaramine/bula',
    productPageUrl: 'https://consultaremedios.com.br/polaramine/bula',
    id: 'dexclorfeniramina-polaramine-polaren',
    slug: 'dexclorfeniramina-polaramine-polaren',
    name: 'Dexclorfeniramina',
    manufacturer: 'Polaramine / Polaren / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl:
      'https://www.drogasil.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F3553641.webp&w=3840&q=40',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos 2 mg', 'Xarope 0,4 mg/mL 100 mL'],
    activeComponents: ['maleato de dexclorfeniramina'],
    labelCompositionSummary:
      'Anti-histamínico H1 de primeira geração usado extra bula em pequenos animais.',
    labelDirections:
      'Cães: 0,2 a 0,4 mg/kg VO a cada 8 a 12 horas. Gatos: 1 a 2 mg/gato VO a cada 12 horas.',
    plumbsContext:
      'Adjuvante para alergias leves; eficácia ruim quando prurido é por infecção, sarna, pulga ativa ou atopia moderada/grave.',
    clinicalUse:
      'Urticária, picada de inseto, prurido leve e alergias leves.',
    reassessment:
      'Checar formulação humana e concentração, especialmente xarope.',
    prescriptionExample:
      'Cães: 0,2-0,4 mg/kg VO a cada 8-12 h. Gatos: 1-2 mg/gato VO BID.',
    safetyAlert:
      'Sedação e efeitos anticolinérgicos. Cuidado em glaucoma, retenção urinária, constipação, cardiopatas e pacientes em múltiplos sedativos.',
    price: {
      averageLabel: 'R$ 15,00 a R$ 35,00',
      rangeLabel: 'Comprimidos cerca de R$ 15-30; xarope cerca de R$ 15-35',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://consultaremedios.com.br/difenidrin/bula',
    productPageUrl: 'https://consultaremedios.com.br/difenidrin/bula',
    id: 'difenidramina-difenidrin',
    slug: 'difenidramina-difenidrin',
    name: 'Difenidramina',
    manufacturer: 'Difenidrin / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/119285c043/lenix-cloridrato-de-difenidramina-50mg-com-14-comprimidos-apsen.jpg',
    species: ['dog', 'cat'],
    presentations: ['Solução injetável 50 mg/mL ampola 1 mL'],
    activeComponents: ['cloridrato de difenidramina'],
    labelCompositionSummary:
      'Anti-histamínico H1 de primeira geração, mais usado em reação alérgica aguda do que em atopia crônica.',
    labelDirections:
      'Cães e gatos: 2 a 4 mg/kg VO a cada 8 a 12 horas. Injetável: 0,5 a 2 mg/kg IM, SC ou IV; IV lentamente.',
    plumbsContext:
      'Adjuvante em reação alérgica aguda; não substitui adrenalina em anafilaxia.',
    clinicalUse:
      'Urticária, reação alérgica, angioedema, reação vacinal/transfusional, picada de inseto e adjuvante em anafilaxia junto com suporte adequado.',
    reassessment:
      'Para prurido crônico alérgico, costuma ser fraco; buscar diagnóstico dermatológico.',
    prescriptionExample:
      'Administrar 2-4 mg/kg VO a cada 8-12 h, ou 0,5-2 mg/kg por via parenteral conforme urgência.',
    safetyAlert:
      'Pode sedar bastante. Cuidado com retenção urinária, glaucoma, constipação e associação com opioides/sedativos.',
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Compra hospitalar ou farmácia humana',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/alergovet-c-07-mg',
    productPageUrl: 'https://www.coveli.com.br/produtos/alergovet-c/',
    id: 'alergovet-c-coveli',
    slug: 'alergovet-c-clemastina',
    name: 'Alergovet C',
    manufacturer: 'Coveli',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://coveli.com.br/wp-content/uploads/sites/29/2021/03/alergovet-c.jpg',
    species: ['dog', 'cat'],
    presentations: ['0,7 mg', '1,4 mg'],
    activeComponents: ['fumarato de clemastina 0,7 mg', 'fumarato de clemastina 1,4 mg'],
    labelCompositionSummary:
      'Anti-histamínico veterinário. Apresentação 0,7 mg para cães e gatos até 15 kg; 1,4 mg para cães acima de 15 kg.',
    labelDirections:
      'Dose de bula: 0,07 mg/kg, podendo dividir a dose diária em duas administrações a cada 12 horas, com tabela por peso.',
    plumbsContext:
      'Opção veterinária com tabela de peso; eficácia limitada em atopia moderada/grave, melhor para prurido leve.',
    clinicalUse:
      'Prurido, urticária, dermatite alérgica, picada de inseto e estados alérgicos.',
    reassessment:
      'Se não houver melhora, investigar causa primária e infecções secundárias.',
    prescriptionExample:
      'Administrar 0,07 mg/kg/dia, podendo dividir BID, seguindo apresentação adequada ao peso.',
    safetyAlert:
      'Pode sedar e ter efeitos anticolinérgicos; resposta é variável.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço variável por apresentação e estoque',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/aliv-pet-50-mg',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/aliv-pet/',
    id: 'aliv-pet-agener-uniao',
    slug: 'aliv-pet-pea',
    name: 'Aliv Pet',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl: 'https://agener.com.br/wp-content/uploads/2024/09/aliv-pet-1.jpg',
    species: ['dog', 'cat'],
    presentations: ['50 mg com 40 comprimidos', '150 mg com 40 comprimidos'],
    activeComponents: ['palmitoiletanolamida 50 mg', 'palmitoiletanolamida 150 mg'],
    labelCompositionSummary:
      'Suplemento dermatológico com PEA, palmitoiletanolamida, para suporte de pele e bem-estar.',
    labelDirections:
      '50 mg: 1 comprimido para cada 5 kg VO SID. 150 mg: 1 comprimido para cada 15 kg VO SID.',
    plumbsContext:
      'Adjuvante de suporte antipruriginoso/anti-inflamatório. Não é equivalente a Apoquel, Cytopoint ou corticoide.',
    clinicalUse:
      'Suporte multimodal em prurido leve, manutenção e tentativa de reduzir necessidade de fármacos em alguns pacientes.',
    reassessment:
      'Reavaliar se usado isoladamente em prurido moderado/grave, pois pode ser insuficiente.',
    prescriptionExample:
      'Administrar 1 comprimido de 50 mg/5 kg ou 1 comprimido de 150 mg/15 kg VO SID.',
    safetyAlert:
      'Classificar como adjuvante; não usar como resgate de crise intensa.',
    price: {
      averageLabel: 'R$ 140,00 a R$ 205,00',
      rangeLabel: '50 mg cerca de R$ 140,99; 150 mg cerca de R$ 204,90',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/ograx-derme-10',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-derme-10',
    id: 'ograx-derme-avert',
    slug: 'ograx-derme',
    name: 'Ograx Derme',
    manufacturer: 'Avert',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    commercialSubclasses: ['skin_atopy', 'skin_pruritus'],
    imageUrl:
      'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-derme-10-30cpl-309g-packshot.png',
    species: ['dog', 'cat'],
    presentations: ['Ograx Derme 10 cápsulas'],
    activeComponents: ['óleo de peixe', 'óleo de borragem', 'vitamina E', 'EPA', 'DHA', 'GLA'],
    labelCompositionSummary:
      'Suplemento de ácidos graxos para suporte de barreira cutânea e inflamação. Ograx Derme 10: DHA mínimo 8,6 mg, EPA mínimo 12,9 mg e GLA mínimo 105 mg por cápsula.',
    labelDirections:
      'Gatos: 1 cápsula VO SID por no mínimo 4 semanas. Cães: 1 cápsula para cada 10 kg VO SID por no mínimo 4 semanas.',
    plumbsContext:
      'Adjuvante de barreira cutânea; não é resgate de coceira.',
    clinicalUse:
      'Pele e pelagem, dermatite atópica, pele seca, descamação e manutenção de barreira.',
    reassessment:
      'Esperar semanas para efeito; em atopia moderada/grave, sozinho costuma ser insuficiente.',
    prescriptionExample:
      'Administrar 1 cápsula/10 kg em cães ou 1 cápsula/gato VO SID por pelo menos 4 semanas.',
    safetyAlert:
      'Adjuvante nutricional; não substitui controle de pulgas, infecção secundária ou terapia antipruriginosa de crise.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço variável conforme apresentação e estoque',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'cloresten-shampoo-agener-uniao',
    slug: 'cloresten-shampoo',
    name: 'Cloresten Shampoo',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_antifungal_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/cloresten/',
    imageUrl: 'https://files.terrazoo.com.br/uploads/2017/08/65277.jpg',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 200 mL', 'Shampoo 500 mL'],
    activeComponents: ['gluconato de clorexidina 2%', 'nitrato de miconazol aproximadamente 2,5%'],
    labelCompositionSummary:
      'Cada 100 mL contém nitrato de miconazol 2,53 g, gluconato de clorexidina solução a 20% 10 mL, essência herbal 0,20 g e veículo q.s.p. 100 mL.',
    labelDirections:
      'Banhar o corpo todo, massagear, deixar agir por 10 minutos antes do enxágue e repetir 1 a 2 vezes por semana, ou conforme critério veterinário.',
    plumbsContext:
      'Associação antisséptica e antifúngica compatível com o uso tópico de clorexidina em piodermite superficial e dermatite por Malassezia.',
    clinicalUse:
      'Malasseziose cutânea, piodermite superficial com componente fúngico, dermatite seborreica infectada e dermatofitose como adjuvante.',
    reassessment:
      'Reavaliar em 2 a 4 semanas com citologia quando possível, ajustando frequência conforme melhora clínica e controle de recidiva.',
    prescriptionExample:
      'Dar banho com Cloresten, manter contato por 10 minutos e enxaguar completamente. Usar 1 a 2 vezes por semana.',
    safetyAlert:
      'Evitar contato com olhos, boca e mucosas; suspender se houver irritação intensa. Não substitui antibiótico sistêmico quando houver piodermite profunda.',
    price: {
      averageLabel: 'R$ 90,00 a R$ 120,00',
      rangeLabel: '200 mL em torno de R$ 90,99 a R$ 119,46',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'cloreximicol-shampoo-cepav',
    slug: 'cloreximicol-shampoo',
    name: 'Cloreximicol Shampoo',
    manufacturer: 'CEPAV',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_antifungal_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://cepav.com.br/produtos/cloreximicol/',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/877481-194-194/cloreximicol-shampoo-cepav.jpg?v=638158016651830000',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 230 mL'],
    activeComponents: ['clorexidina como gluconato 1,14 g/100 mL', 'miconazol como nitrato 2 g/100 mL'],
    labelCompositionSummary:
      'Cada 100 mL contém clorexidina como gluconato 1,14 g, equivalente informado de 5,7% de gluconato de clorexidina, miconazol como nitrato 2 g e veículo q.s.p.',
    labelDirections:
      'Umedecer a pelagem, aplicar até espuma abundante, massagear, deixar agir por 10 a 15 minutos e enxaguar. No início, usar 2 a 3 vezes por semana; depois 1 vez por semana, ou conforme critério veterinário.',
    plumbsContext:
      'Combina clorexidina tópica com azólico, útil quando há componente bacteriano e leveduriforme na citologia.',
    clinicalUse:
      'Piodermite superficial, dermatite com Malassezia, seborreia infectada, intertrigo e dermatofitose como adjuvante.',
    reassessment:
      'Reavaliar sinais e citologia após 2 a 4 semanas; reduzir para manutenção quando houver controle clínico.',
    prescriptionExample:
      'Dar banho com Cloreximicol, manter contato por 10 a 15 minutos e enxaguar. Usar 2 a 3 vezes por semana inicialmente.',
    safetyAlert:
      'Classificar como terapêutico forte; evitar uso como shampoo cosmético contínuo sem reavaliação.',
    price: {
      averageLabel: 'R$ 120,00 a R$ 180,00',
      rangeLabel: 'Variação grande entre Petz, Petlove e varejos especializados',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'clorexiderm-4-shampoo-cepav',
    slug: 'clorexiderm-4-shampoo',
    name: 'Clorexiderm 4% Shampoo',
    manufacturer: 'CEPAV',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://www.cobasi.com.br/shampoo-clorexiderm-4--230-ml-cepav-3326178/p',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/178383-194-194/Shampoo-Clorexderme.jpg?v=638143031321200000',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 230 mL'],
    activeComponents: ['gluconato de clorexidina 4%'],
    labelCompositionSummary:
      'Shampoo com gluconato de clorexidina 4%, conforme nome comercial e descrições de varejo. Veículo não detalhado nas fontes abertas consultadas.',
    labelDirections:
      'Umedecer a pelagem, aplicar até espuma abundante, massagear, deixar agir por 10 a 15 minutos e enxaguar. Usar 2 a 3 vezes por semana até melhora e depois 1 vez por semana, conforme orientação.',
    plumbsContext:
      'Clorexidina tópica em concentração alta para redução de carga bacteriana cutânea.',
    clinicalUse:
      'Piodermite superficial, foliculite bacteriana, dermatite úmida, pododermatite bacteriana, intertrigo e controle de carga bacteriana.',
    reassessment:
      'Reavaliar se não houver melhora em 2 semanas ou se houver crostas extensas, dor, exsudação ou suspeita de piodermite profunda.',
    prescriptionExample:
      'Dar banho com Clorexiderm 4%, manter contato por 10 a 15 minutos e enxaguar completamente. Usar 2 a 3 vezes por semana inicialmente.',
    safetyAlert:
      'Evitar uso de shampoos, sabonetes ou sabões comuns antes/depois, pois podem interferir com a clorexidina.',
    price: {
      averageLabel: 'R$ 120,00 a R$ 165,00',
      rangeLabel: 'Cobasi mostrou cerca de R$ 164,90; outros varejos em torno de R$ 120,51 a R$ 140,00',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'hexadene-spherulites-virbac',
    slug: 'hexadene-spherulites',
    name: 'Hexadene Spherulites',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://br.virbac.com/products/dermatologicos/hexadene-spherulites',
    imageUrl:
      'https://br.virbac.com/files/live/sites/virbac-br/files/predefined-files/products/News%20Packshoots/4408-R0+4995-R4_ROTULO%20HEXADENE%20250+500ml-packshot_WEB_600X600_left.png',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 500 mL, conforme disponibilidade'],
    activeComponents: ['clorexidina como gluconato 3%', 'sistema Spherulites'],
    labelCompositionSummary:
      'Cada 100 mL contém clorexidina como gluconato 3 g e veículo q.s.p. 100 mL. A descrição comercial cita microcápsulas Spherulites com liberação gradual.',
    labelDirections:
      'Molhar a pelagem, aplicar, massagear até formar espuma, enxaguar e repetir a aplicação deixando o produto agir por 10 minutos antes do enxágue final.',
    plumbsContext:
      'Clorexidina 3% é concentração intermediária/alta para controle tópico de bactérias e leveduras.',
    clinicalUse:
      'Piodermite superficial, dermatite bacteriana e dermatite por leveduras, especialmente quando se busca ação residual/prolongada.',
    reassessment:
      'Reavaliar resposta em 2 a 4 semanas e reduzir frequência quando houver controle clínico.',
    prescriptionExample:
      'Dar banho com Hexadene, repetir a aplicação e manter contato por 10 minutos antes do enxágue final.',
    safetyAlert:
      'Evitar contato com olhos e mucosas; não usar como única terapia em infecção profunda ou sistêmica.',
    price: {
      averageLabel: 'R$ 180,00 a R$ 210,00',
      rangeLabel: '500 mL em varejo especializado, disponibilidade variável',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'clorexsyn-shampoo-konig',
    slug: 'clorexsyn-shampoo',
    name: 'Clorexsyn Shampoo',
    manufacturer: 'König',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://konigbrasil.com.br/produtos/shampoo/dermato/clorexsyn-1-l/',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1056477-194-194/Clorexsyn-Shampoo-200ml-para-caes-e-gatos.png?v=638491322564200000',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 200 mL', 'Shampoo 1 L'],
    activeComponents: ['digluconato de clorexidina 0,5%', 'glicerina 5%'],
    labelCompositionSummary:
      'Cada 100 mL contém digluconato de clorexidina 0,50 g, glicerina 5,00 g, branqueador óptico 0,05 g e veículo q.s.p. 100 mL.',
    labelDirections:
      'Molhar o pelo, aplicar e massagear até espuma abundante, deixar agir por 10 minutos e enxaguar. Para uso preventivo, aplicar a cada 15 dias.',
    plumbsContext:
      'Clorexidina em baixa concentração, mais adequada para manutenção e controle leve do que para infecção intensa.',
    clinicalUse:
      'Manutenção, seborreia seca, recidivas leves e higiene antisséptica.',
    reassessment:
      'Se houver pústulas, colarinhos epidérmicos, exsudação ou odor intenso persistente, preferir citologia e produto terapêutico mais forte.',
    prescriptionExample:
      'Dar banho com Clorexsyn, manter contato por 10 minutos e enxaguar. Usar semanalmente ou a cada 15 dias conforme recidiva.',
    safetyAlert:
      'Não considerar equivalente a shampoos com clorexidina 2% a 4% em piodermite importante.',
    price: {
      averageLabel: 'R$ 56,00 a R$ 150,00',
      rangeLabel: '200 mL cerca de R$ 56 a R$ 66; 1 L cerca de R$ 145 a R$ 150',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/megatrat-clorexidina',
    id: 'megatrat-clorexidina-centagrovet',
    slug: 'megatrat-clorexidina',
    name: 'Megatrat Clorexidina',
    manufacturer: 'CentagroVet',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://www.centagro.com.br/produtos/megatrat-clorexidina/',
    imageUrl: 'https://www.centagro.com.br/wp-content/uploads/2018/11/MEGATRAT.png',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 250 mL'],
    activeComponents: ['clorexidina como gluconato 0,51%'],
    labelCompositionSummary:
      'Cada 100 mL contém clorexidina como gluconato 0,51 g e veículo q.s.p. 100 mL.',
    labelDirections:
      'Umedecer a pelagem com água morna. Aplicar quantidade suficiente para formar espuma abundante, friccionando todo o corpo (especialmente dobras e lesões). Deixar agir por 10 a 15 minutos e enxaguar bem. Repetir se necessário. Inicialmente usar 2 a 3 vezes por semana; após melhora, reduzir para 1 vez por semana ou a critério do médico-veterinário.',
    plumbsContext:
      'Clorexidina em baixa concentração para banho antisséptico de manutenção/adjuvante; efeito depende de contato adequado e enxágue completo.',
    clinicalUse:
      'Controle de dermatoses, seborreia, prurido, exsudação leve, prevenção de recidivas e piodermites leves.',
    reassessment:
      'Reavaliar se não controlar odor, crostas ou lesões em 2 semanas; pode ser insuficiente para infecção importante.',
    prescriptionExample:
      'Dar banho com Megatrat Clorexidina, manter contato por 10 a 15 minutos e enxaguar completamente. Usar 2 a 3 vezes por semana inicialmente.',
    safetyAlert:
      'Evitar contato com olhos, nariz e boca do animal. Recomenda-se o uso de luvas impermeáveis durante a aplicação.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço confiável não confirmado em grande varejo na consulta',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/megatrat-clorexidina-4',
    id: 'megatrat-clorexidina-4-centagrovet',
    slug: 'megatrat-clorexidina-4',
    name: 'Megatrat Clorexidina 4%',
    manufacturer: 'CentagroVet',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://www.centagro.com.br/produtos/megatrat-clorexidina-4/',
    imageUrl: 'https://www.centagro.com.br/wp-content/uploads/2018/11/MEGATRAT4-1.png',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 250 mL'],
    activeComponents: ['digluconato de clorexidina 4%', 'D-pantenol, quantidade não informada'],
    labelCompositionSummary:
      'Cada 100 mL contém digluconato de clorexidina 20% 20 g, equivalente a clorexidina 4%, e veículo q.s.p. 100 mL. A descrição comercial destaca D-pantenol.',
    labelDirections:
      'Umedecer a pelagem com água morna. Aplicar quantidade suficiente para formar espuma abundante, friccionando todo o corpo (especialmente dobras e lesões). Deixar agir por 10 a 15 minutos e enxaguar bem. Repetir se necessário. Inicialmente usar 2 a 3 vezes por semana; após melhora, reduzir para 1 vez por semana ou a critério do médico-veterinário.',
    plumbsContext:
      'Clorexidina 4% é concentração terapêutica para controle tópico de bactérias/leveduras em piodermites superficiais e dermatites com sobrecrescimento microbiano.',
    clinicalUse:
      'Piodermite superficial, dermatite bacteriana, pododermatite e dermatite com odor/crostas.',
    reassessment:
      'Reavaliar em 2 a 4 semanas e reduzir frequência conforme resposta e ressecamento cutâneo.',
    prescriptionExample:
      'Dar banho com Megatrat Clorexidina 4%, manter contato por 10 a 15 minutos e enxaguar completamente. Usar 2 a 3 vezes por semana inicialmente.',
    safetyAlert:
      'Evitar contato com olhos, nariz e boca do animal. Pode ressecar ou irritar; ajustar frequência em pele sensível. Recomenda-se o uso de luvas impermeáveis durante a aplicação.',
    price: {
      averageLabel: 'R$ 50,00 a R$ 65,00',
      rangeLabel: '250 mL em varejos como PettFarma',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'micodine-shampoo-syntec',
    slug: 'micodine-shampoo',
    name: 'Micodine Shampoo',
    manufacturer: 'Syntec',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_antifungal_shampoo',
    commercialSubclasses: ['skin_antifungal_shampoo', 'skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://syntec.com.br/produtos/micodine-cetoconazol-syntec',
    imageUrl: 'https://syntec.com.br/storage/produtos/Micodine-15-33-56.webp',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 225 mL'],
    activeComponents: ['cetoconazol 2%', 'clorexidina 0,5%'],
    labelCompositionSummary:
      'Cada 100 mL contém cetoconazol 2,0 g, clorexidina 0,5 g e veículo q.s.p. 100 mL.',
    labelDirections:
      'Uso tópico: aplicar na pele molhada em quantidade suficiente, massagear e espalhar pelo corpo. Fontes técnicas descrevem deixar agir 3 a 5 minutos, enxaguar e repetir se necessário.',
    plumbsContext:
      'Produto com foco antifúngico pelo cetoconazol 2%, com clorexidina em baixa concentração como antisséptico associado.',
    clinicalUse:
      'Malassezia, dermatofitose como adjuvante e dermatites mistas bacterianas/fúngicas.',
    reassessment:
      'Reavaliar citologia e lesões em 2 a 4 semanas, especialmente se prurido/odor persistirem.',
    prescriptionExample:
      'Dar banho com Micodine, manter contato por 3 a 5 minutos ou conforme prescrição, enxaguar e repetir conforme necessidade clínica.',
    safetyAlert:
      'A clorexidina é 0,5%; se a necessidade principal for piodermite bacteriana intensa, considerar clorexidina 2% a 4%.',
    price: {
      averageLabel: 'R$ 72,00 a R$ 120,00',
      rangeLabel: 'Petlove em torno de R$ 72,30; Agrosolo em torno de R$ 119,50',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'douxo-s3-pyo-shampoo-ceva',
    slug: 'douxo-s3-pyo-shampoo',
    name: 'DOUXO S3 PYO Shampoo',
    manufacturer: 'Ceva / Douxo',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_antifungal_shampoo', 'skin_pyoderma', 'skin_atopy'],
    productPageUrl: 'https://www.douxo.com/pt/douxo-s3-solucoes/douxo-s3-pyo/pyo-champo',
    imageUrl: 'https://us.douxo.com/cdn/shop/files/Douxo_S3_US_ATF_Shp-200_PYO_Tile_1.jpg?v=1770916975&width=1024',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 200 mL, conforme disponibilidade'],
    activeComponents: ['digluconato de clorexidina 3%', 'Ophytrium 0,5%'],
    labelCompositionSummary:
      'Composição descrita: digluconato de clorexidina 3% e Ophytrium 0,5%, com fórmula de limpeza suave e fragrância hipoalergênica.',
    labelDirections:
      'A linha recomenda shampoo como etapa de limpeza e associação com mousse para maior tempo de contato, conforme orientação veterinária.',
    plumbsContext:
      'Clorexidina 3% com proposta de suporte de barreira cutânea; útil para desequilíbrio bacteriano/fúngico superficial.',
    clinicalUse:
      'Piodermite superficial, Malassezia e manutenção de barreira cutânea em pacientes com recidiva dermatológica.',
    reassessment:
      'Reavaliar disponibilidade nacional e resposta clínica; associar mousse ou reduzir frequência conforme tolerância.',
    prescriptionExample:
      'Dar banho com DOUXO S3 PYO conforme rótulo, enxaguar completamente e associar produtos leave-on da linha quando indicado.',
    safetyAlert:
      'Disponibilidade brasileira variável; confirmar fornecedor antes de prescrever com marca específica.',
    price: {
      averageLabel: 'Confirmar disponibilidade',
      rangeLabel: 'Preço fixo nacional não confirmado; disponibilidade brasileira variável',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'shampoo-clorexidina-manipulado-petfarma',
    slug: 'shampoo-clorexidina-manipulado',
    name: 'Shampoo Clorexidina 2% ou 3% Manipulado',
    manufacturer: 'Petfarma / manipulado veterinário',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo', 'skin_pyoderma'],
    productPageUrl: 'https://www.petfarmaonline.com.br/shampoos-hipoalergenicos/shampoo-clorexidina-2-250ml',
    imageUrl:
      'https://images.tcdn.com.br/img/img_prod/1183927/shampoo_clorexidina_2_250ml_69_1_bd916a20e03288982970b5c1e01b42e2.jpg',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 200 a 250 mL, conforme farmácia'],
    activeComponents: ['clorexidina 2%', 'clorexidina 3%', 'base shampoo hipoalergênica q.s.p.'],
    labelCompositionSummary:
      'Manipulado com clorexidina 2% ou 3% em base shampoo hipoalergênica, conforme prescrição e farmácia.',
    labelDirections:
      'Aplicar no pelo molhado, deixar agir por 10 a 15 minutos e enxaguar, retirando todo o produto.',
    plumbsContext:
      'Permite ajustar concentração e custo, mas depende da qualidade da farmácia e da prescrição individual.',
    clinicalUse:
      'Piodermite superficial, manutenção de recidivas e situações em que se deseja concentração específica ou menor custo.',
    reassessment:
      'Reavaliar resposta e tolerância em 2 a 4 semanas; confirmar concentração dispensada no rótulo.',
    prescriptionExample:
      'Manipular shampoo de clorexidina 2% ou 3%. Aplicar, manter contato por 10 a 15 minutos e enxaguar. Usar conforme prescrição.',
    safetyAlert:
      'Produto manipulado deve ser tratado como apresentação dependente de prescrição, concentração e farmácia específica.',
    price: {
      averageLabel: 'R$ 69,00 a R$ 79,00',
      rangeLabel: 'Clorexidina 2% cerca de R$ 69 a R$ 75; 3% cerca de R$ 79',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'x-dine-shampoo-clorexidina-lavizoo',
    slug: 'x-dine-shampoo-clorexidina',
    name: 'X-Dine Shampoo Clorexidina',
    manufacturer: 'Lavizoo',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo'],
    productPageUrl: 'https://www.cuidamaispet.com.br/x-dine-shampoo-clorexidina-lavizoo-para-caes-e-gatos-500ml',
    imageUrl: 'https://www.lavizoo.com.br/var/userfiles/arquivos516/produtocatalogo/1456/96ec44d54cc2faed1f360e09892637c2.png',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 500 mL'],
    activeComponents: ['clorexidina, concentração não informada', 'tea tree', 'extrato de cúrcuma'],
    labelCompositionSummary:
      'Fonte comercial descreve clorexidina associada a tea tree e extrato de cúrcuma, sem concentração de clorexidina na fonte aberta consultada.',
    labelDirections:
      'Aplicar no pelo molhado, massagear até formar espuma, deixar agir por 5 minutos e enxaguar; repetir se necessário.',
    plumbsContext:
      'Fonte de composição com confiança baixa a moderada; não equiparar a shampoos terapêuticos com concentração declarada.',
    clinicalUse:
      'Produto popular de higiene dermatológica e adjuvante, não primeira escolha quando é necessária prescrição técnica com concentração definida.',
    reassessment:
      'Se usado para piodermite, reavaliar cedo e trocar por produto com concentração confirmada se resposta for insuficiente.',
    prescriptionExample:
      'Usar conforme rótulo, mantendo contato por 5 minutos e enxaguando completamente.',
    safetyAlert:
      'Concentração de clorexidina não confirmada em fonte oficial aberta; evitar como equivalente terapêutico a Cloresten, Hexadene ou Clorexiderm.',
    price: {
      averageLabel: 'R$ 42,00 a R$ 51,00',
      rangeLabel: '500 mL em varejo popular',
      sourceDate: PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Fonte comercial; concentração de clorexidina não confirmada.',
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/shampoo-condicionador-dugs-clorexidina-antisseptico',
    productPageUrl: 'https://www.worldveterinaria.com.br/produtos/dugs-shampoo-clorexidina/',
    id: 'world-dugs-shampoo-clorexidina',
    slug: 'world-dugs-shampoo-clorexidina',
    name: 'World Veterinária / Dug’s Shampoo Clorexidina',
    manufacturer: 'World Veterinária / Dug’s',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_chlorhexidine_shampoo',
    commercialSubclasses: ['skin_chlorhexidine_shampoo'],
    imageUrl: 'https://cdn.awsli.com.br/800x800/2760/2760299/produto/342018471/6e73ac3860d02e24eaa0d183f3e4ad2f-evrwawqcdz.jpg',
    species: ['dog', 'cat'],
    presentations: ['Shampoo 500 mL'],
    activeComponents: ['gluconato de clorexidina','óleo de jojoba'],
    labelCompositionSummary:
      'Shampoo antisséptico e condicionador com gluconato de clorexidina e óleo de jojoba para cães e gatos.',
    labelDirections:
      'Molhar bem a pelagem do animal com água (preferencialmente morna). Aplicar o shampoo por todo o corpo massageando a pelagem até obter espuma abundante. Deixar agir por 3 a 5 minutos (ou de 5 a 10 minutos para maior eficácia) e enxaguar bem. Repetir se necessário. Indicado para cães e gatos a partir de 60 dias de vida.',
    plumbsContext:
      'Shampoo antisséptico com clorexidina descrito em fonte comercial; usar como adjuvante e confirmar concentração quando a intenção for tratar piodermite.',
    clinicalUse:
      'Higiene antisséptica geral de cães e gatos, adjuvante em infecções bacterianas leves na pele.',
    reassessment:
      'Se houver lesão ativa, odor, crostas ou pústulas persistentes, reavaliar e considerar migração para produto terapêutico de maior concentração.',
    prescriptionExample:
      'Molhar o pelo com água morna, aplicar o shampoo Dug’s Clorexidina, massagear bem, deixar agir por 5 minutos e enxaguar abundantemente.',
    safetyAlert:
      'Evitar contato com os olhos, mucosas e ferimentos. Indicado para cães e gatos com idade a partir de 60 dias.',
    price: {
      averageLabel: 'R$ 18,00 a R$ 36,00',
      rangeLabel: 'Variação em marketplaces e varejos populares',
      sourceDate: PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Fonte comercial; concentração e bula oficial não confirmadas.',
  },
  {
    id: 'nexgard-caes-boehringer',
    slug: 'nexgard-caes-afoxolaner',
    name: 'NexGard Cães',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_isoxazoline_dog',
    commercialSubclasses: ['parasite_oral_isoxazoline_dog'],
    productPageUrl: 'https://nexgardbrasil.com.br/cachorro/produtos/nexgard',
    labelUrl: 'https://nexgardbrasil.com.br/sites/default/files/2024-01/Bula_NexGard.pdf',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1101149/Antipulgas-e-Carrapatos-de-41-a-10kg-para-Caes-Frontal.webp?v=639130781516770000',
    species: ['dog'],
    presentations: [
      '2 a 4 kg: afoxolaner 11,3 mg',
      '4,1 a 10 kg: afoxolaner 28,3 mg',
      '10,1 a 25 kg: afoxolaner 68 mg',
      '25,1 a 50 kg: afoxolaner 136 mg',
    ],
    activeComponents: ['afoxolaner'],
    labelCompositionSummary:
      'Ectoparasiticida oral da classe das isoxazolinas. A bula informa dose mínima em torno de 2,5 mg/kg de afoxolaner.',
    labelDirections:
      'Administrar 1 tablete mastigável inteiro por via oral, uma vez ao mês, conforme faixa de peso da embalagem.',
    plumbsContext:
      'Isoxazolina oral para controle mensal de pulgas e carrapatos. A classe exige cautela em pacientes com histórico neurológico.',
    clinicalUse:
      'Controle mensal de pulgas e carrapatos em cães. Útil quando o tutor prefere comprimido mastigável em vez de tópico.',
    reassessment:
      'Reavaliar infestação ambiental, adesão mensal e exposição a carrapatos. Se houver prurido persistente, investigar DAPP, piodermite e Malassezia.',
    prescriptionExample:
      'Administrar 1 tablete de NexGard correspondente ao peso do cão, VO, a cada 30 dias.',
    safetyAlert:
      'Não usar em gatos. Usar com cautela em cães com histórico de convulsões, tremores, ataxia ou doença neurológica.',
    price: {
      averageLabel: 'R$ 170,00 a R$ 300,00 por tablete',
      rangeLabel:
        'Estimativa por faixa de peso: cerca de R$ 171,50 para 2-4 kg, R$ 219,50 para 4,1-10 kg, R$ 256,50 para 10,1-25 kg e R$ 301,50 para 25,1-50 kg em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
      notes: 'Bula oficial NexGard consultada.',
    },
  },
  {
    id: 'nexgard-spectra-caes-boehringer',
    slug: 'nexgard-spectra-caes',
    name: 'NexGard Spectra Cães',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_endectocide_dog',
    commercialSubclasses: [
      'parasite_oral_endectocide_dog',
      'parasite_oral_isoxazoline_dog',
      'parasite_dewormer_dog',
      'parasite_heartworm_prevention',
    ],
    productPageUrl: 'https://nexgardbrasil.com.br/cachorro/produtos/nexgard-spectra',
    labelUrl: 'https://www.disprovel.com.br/uploads/produtos/Bula-NexGard-Spectra.pdf',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1101225/Nexgard_spectra_Antipulgas-e-Vermifugo-3-tabletes_FRENTE.webp?v=639131649123030000',
    species: ['dog'],
    presentations: [
      '2 a 3,5 kg: afoxolaner 9,4 mg + milbemicina oxima 1,9 mg',
      '3,6 a 7,5 kg: afoxolaner 18,8 mg + milbemicina oxima 3,8 mg',
      '7,6 a 15 kg: afoxolaner 37,5 mg + milbemicina oxima 7,5 mg',
      '15,1 a 30 kg: afoxolaner 75 mg + milbemicina oxima 15 mg',
      '30,1 a 60 kg: afoxolaner 150 mg + milbemicina oxima 30 mg',
    ],
    activeComponents: ['afoxolaner', 'milbemicina oxima'],
    labelCompositionSummary:
      'Endectocida oral com isoxazolina e lactona macrocíclica. Dose mínima descrita: 2,5 mg/kg de afoxolaner e 0,5 mg/kg de milbemicina oxima.',
    labelDirections:
      'Administrar 1 tablete inteiro por via oral, uma vez ao mês, conforme faixa de peso. Não fracionar sem respaldo de bula.',
    plumbsContext:
      'Opção mensal ampla quando se deseja cobrir ectoparasitas, nematódeos e prevenção de dirofilariose.',
    clinicalUse:
      'Cães com necessidade de cobertura mensal para pulgas, carrapatos, ácaros, vermes gastrointestinais e prevenção de Dirofilaria quando indicada.',
    reassessment:
      'Antes de prevenção de dirofilariose em animal de risco, avaliar histórico regional e status do paciente. Reavaliar controle ambiental de pulgas.',
    prescriptionExample:
      'Administrar 1 tablete de NexGard Spectra correspondente ao peso, VO, a cada 30 dias.',
    safetyAlert:
      'Não usar em gatos. Cautela neurológica por conter afoxolaner; avaliar uso de lactona macrocíclica em pacientes com suspeita de dirofilariose.',
    price: {
      averageLabel: 'R$ 80,00 a R$ 335,00 por tablete',
      rangeLabel:
        'Estimativa conforme faixa e promoção: Petlove exibiu faixas menores perto de R$ 80-92 no clube; Cobasi exibiu 15,1-30 kg perto de R$ 333,50 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'nexgard-combo-gatos-boehringer',
    slug: 'nexgard-combo-gatos',
    name: 'NexGard Combo Gatos',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_isoxazoline_cat',
    commercialSubclasses: ['parasite_topical_isoxazoline_cat', 'parasite_topical_endectocide', 'parasite_dewormer_cat'],
    productPageUrl: 'https://nexgardbrasil.com.br/gato/produto/nexgard-combo',
    labelUrl: 'https://www.boehringer-ingelheim.com/br/pdf/nexgard-combo',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1101297/Nexgard Combo Antipulgas com 3_frente.webp?v=639131550986000000',
    species: ['cat'],
    presentations: ['Aplicadores tópicos mensais por faixa de peso, a partir de 2 meses e 0,8 kg'],
    activeComponents: ['esafoxolaner', 'eprinomectina', 'praziquantel'],
    labelCompositionSummary:
      'Endectocida tópico felino combinando isoxazolina, lactona macrocíclica e cestocida.',
    labelDirections:
      'Aplicar 1 aplicador tópico na pele, conforme faixa de peso, uma vez ao mês.',
    plumbsContext:
      'Produto felino de amplo espectro para ectoparasitas e vermes, útil quando há risco misto ou administração oral difícil.',
    clinicalUse:
      'Pulgas, sarna de ouvido e vermes redondos/chatos em gatos, especialmente pacientes com acesso externo ou risco parasitário combinado.',
    reassessment:
      'Reavaliar controle de pulgas e vermes; em Dipylidium, associar controle ambiental e de pulgas.',
    prescriptionExample:
      'Aplicar 1 pipeta de NexGard Combo correspondente ao peso do gato, tópica, a cada 30 dias.',
    safetyAlert:
      'Não usar em cães. Evitar lambedura após aplicação e cautela em gatos debilitados ou com histórico neurológico.',
    price: {
      averageLabel: 'R$ 113,00 a R$ 167,00 por pipeta',
      rangeLabel:
        'Estimativa conforme faixa e loja: Petlove exibiu 2,5-7,5 kg perto de R$ 113,00 no clube; Cobasi exibiu 0,8-2,5 kg perto de R$ 162,50 e 2,5-7,5 kg perto de R$ 166,90 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'bravecto-caes-msd',
    slug: 'bravecto-comprimido-caes',
    name: 'Bravecto Comprimido Mastigável',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_isoxazoline_dog',
    commercialSubclasses: ['parasite_oral_isoxazoline_dog'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/bravecto/',
    labelUrl: 'https://cobasiblog.blob.core.windows.net/production-ofc/2024/07/bula_bravecto_compressed.pdf',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1068318/Bravecto-Caes-Comp-1000mg-2.png?v=638756777568700000',
    species: ['dog'],
    presentations: [
      '2 a 4,5 kg: fluralaner 112,5 mg',
      '>4,5 a 10 kg: fluralaner 250 mg',
      '>10 a 20 kg: fluralaner 500 mg',
      '>20 a 40 kg: fluralaner 1000 mg',
      '>40 a 56 kg: fluralaner 1400 mg',
    ],
    activeComponents: ['fluralaner'],
    labelCompositionSummary:
      'Isoxazolina oral com dose de bula de 25 a 56 mg/kg de fluralaner, conforme faixa de peso.',
    labelDirections:
      'Administrar 1 comprimido por via oral a cada 12 semanas. Não administrar em intervalo menor que 8 semanas.',
    plumbsContext:
      'Fluralaner oferece controle prolongado de ectoparasitas; por ser isoxazolina, manter alerta neurológico.',
    clinicalUse:
      'Pulgas e carrapatos com proteção prolongada em cães; também usado em sarnas conforme indicação de bula/fabricante.',
    reassessment:
      'Reavaliar exposição a carrapatos e resposta clínica antes do próximo ciclo de 12 semanas.',
    prescriptionExample:
      'Administrar 1 comprimido de Bravecto correspondente ao peso, VO, a cada 12 semanas.',
    safetyAlert:
      'Não usar em gatos na apresentação canina. Cautela em histórico de convulsão, tremores ou ataxia.',
    price: {
      averageLabel: 'R$ 158,00 a R$ 282,00 por comprimido',
      rangeLabel:
        'Estimativa por faixa: 2-4,5 kg cerca de R$ 157,90; 4,5-10 kg R$ 190,50; 10-20 kg R$ 224,50; 20-40 kg R$ 257,90; 40-56 kg R$ 281,90',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'bravecto-transdermal-gatos-msd',
    slug: 'bravecto-transdermal-gatos',
    name: 'Bravecto Transdermal Gatos',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_isoxazoline_cat',
    commercialSubclasses: ['parasite_topical_isoxazoline_cat'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/bravecto-transdermal-gatos/',
    labelUrl: 'https://consultaremedios.com.br/antipulgas-bravecto-transdermal-para-gatos/bula',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2021/06/transdermal-gatos.png',
    species: ['cat'],
    presentations: [
      '1,2 a 2,8 kg: 0,4 mL, fluralaner 112,5 mg',
      '>2,8 a 6,25 kg: 0,89 mL, fluralaner 250 mg',
      '>6,25 a 12,5 kg: 1,79 mL, fluralaner 500 mg',
    ],
    activeComponents: ['fluralaner'],
    labelCompositionSummary: 'Isoxazolina tópica felina à base de fluralaner.',
    labelDirections:
      'Aplicar topicamente na pele conforme faixa de peso, com intervalo de proteção de até 12 semanas.',
    plumbsContext:
      'Opção tópica felina de longa duração contra pulgas. Não confundir com Bravecto Plus, que inclui moxidectina.',
    clinicalUse:
      'Controle de pulgas em gatos por período prolongado, quando não é necessária cobertura para vermes.',
    reassessment:
      'Reavaliar se houver pulgas no ambiente; considerar produto endectocida se houver risco de vermes ou ácaros.',
    prescriptionExample:
      'Aplicar 1 pipeta correspondente ao peso do gato, tópica, a cada 12 semanas.',
    safetyAlert:
      'Produto para gatos. Cautela neurológica por conter fluralaner; evitar lambedura e aplicação em pele lesionada.',
    price: {
      averageLabel: 'R$ 150,00 a R$ 200,00 por pipeta',
      rangeLabel: 'Estimativa por faixa: 1,2-2,8 kg cerca de R$ 149,90; 2,8-6,25 kg R$ 168,50; 6,25-12,5 kg R$ 199,90',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'bravecto-plus-gatos-msd',
    slug: 'bravecto-plus-gatos',
    name: 'Bravecto Plus Gatos',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_isoxazoline_cat',
    commercialSubclasses: ['parasite_topical_isoxazoline_cat', 'parasite_topical_endectocide', 'parasite_dewormer_cat'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/bravecto-plus-gatos/',
    labelUrl: 'https://cobasiblog.blob.core.windows.net/production-ofc/2024/07/bula_bravecto_plus_gatos_compressed.pdf',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2021/06/bravecto-gatos.png',
    species: ['cat'],
    presentations: [
      '1,2 a 2,8 kg: 0,4 mL, fluralaner 112,5 mg + moxidectina 5,6 mg',
      '>2,8 a 6,25 kg: 0,89 mL, fluralaner 250 mg + moxidectina 12,5 mg',
      '>6,25 a 12,5 kg: 1,79 mL, fluralaner 500 mg + moxidectina 25 mg',
    ],
    activeComponents: ['fluralaner', 'moxidectina'],
    labelCompositionSummary:
      'Endectocida tópico felino com fluralaner e moxidectina; bula descreve 40 a 94 mg/kg de fluralaner e 2 a 4,7 mg/kg de moxidectina.',
    labelDirections:
      'Aplicar topicamente conforme faixa de peso. Usar quando houver ou houver risco de infestação mista.',
    plumbsContext:
      'Cobre pulgas e alguns endoparasitas/ácaros, mas não substitui produto com praziquantel quando o alvo for cestódeo.',
    clinicalUse:
      'Gatos com risco de pulgas, nematódeos gastrointestinais e ácaro de ouvido.',
    reassessment:
      'Se houver suspeita de Dipylidium ou Taenia, considerar cestocida específico e controle de pulgas.',
    prescriptionExample:
      'Aplicar 1 pipeta de Bravecto Plus correspondente ao peso do gato, tópica, conforme bula.',
    safetyAlert:
      'Não cobre cestódeos como produtos com praziquantel. Cautela neurológica por fluralaner.',
    price: {
      averageLabel: 'R$ 166,00 a R$ 220,00 por pipeta',
      rangeLabel: 'Estimativa por faixa: 1,2-2,8 kg cerca de R$ 165,90; 2,8-6,25 kg R$ 185,90; 6,25-12,5 kg R$ 219,90',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'simparic-caes-zoetis',
    slug: 'simparic-caes-sarolaner',
    name: 'Simparic Cães',
    manufacturer: 'Zoetis',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_isoxazoline_dog',
    commercialSubclasses: ['parasite_oral_isoxazoline_dog'],
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/caes/antipulgas-e-outros-parasitas/simparic/',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Simparic/pdf/bula-simparic.pdf',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1089387/Antipulgas-Simparic-80mg-para-Caes-20-a-40kg.webp?v=639107572824830000',
    species: ['dog'],
    presentations: [
      '1,3 a 2,5 kg: sarolaner 5 mg',
      '2,6 a 5 kg: sarolaner 10 mg',
      '5,1 a 10 kg: sarolaner 20 mg',
      '10,1 a 20 kg: sarolaner 40 mg',
      '20,1 a 40 kg: sarolaner 80 mg',
      '40,1 a 60 kg: sarolaner 120 mg',
    ],
    activeComponents: ['sarolaner'],
    labelCompositionSummary: 'Isoxazolina oral mensal à base de sarolaner.',
    labelDirections:
      'Administrar por via oral, 1 comprimido conforme faixa de peso, mensalmente. Informações técnicas indicam efeito sustentado por até 35 dias.',
    plumbsContext:
      'Isoxazolina mensal para ectoparasitas e sarnas; manter cautela em pacientes com histórico neurológico.',
    clinicalUse:
      'Pulgas, carrapatos, sarna sarcóptica, otodécica e demodécica em cães, conforme bula/fabricante.',
    reassessment:
      'Reavaliar lesões de sarna e controle de carrapatos após o primeiro mês; investigar ambiente se houver reinfestação.',
    prescriptionExample:
      'Administrar 1 comprimido de Simparic correspondente ao peso, VO, a cada 30 dias.',
    safetyAlert:
      'Não usar em gatos. Cautela em histórico de convulsão, tremores ou ataxia.',
    price: {
      averageLabel: 'R$ 84,00 a R$ 130,00 por comprimido',
      rangeLabel: 'Estimativa conforme faixa de peso e caixa; Petlove exibiu 2,6-5 kg perto de R$ 93,59 por comprimido',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'simparic-trio-caes-zoetis',
    slug: 'simparic-trio-caes',
    name: 'Simparic Trio Cães',
    manufacturer: 'Zoetis',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_endectocide_dog',
    commercialSubclasses: [
      'parasite_oral_endectocide_dog',
      'parasite_oral_isoxazoline_dog',
      'parasite_dewormer_dog',
      'parasite_heartworm_prevention',
    ],
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/caes/antipulgas-e-outros-parasitas/simparic-trio',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Bulario/_assets/Simparic-TRIO.pdf',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1099304/antipulgas-simparic-trio-72mg-para-caes-40-1-a-60kg-1comp.webp?v=639110722024300000',
    species: ['dog'],
    presentations: [
      '1,25 a 2,5 kg: sarolaner 3 mg + moxidectina 0,06 mg + pirantel 12,5 mg',
      '2,6 a 5 kg: sarolaner 6 mg + moxidectina 0,12 mg + pirantel 25 mg',
      '5,1 a 10 kg: sarolaner 12 mg + moxidectina 0,24 mg + pirantel 50 mg',
      '10,1 a 20 kg: sarolaner 24 mg + moxidectina 0,48 mg + pirantel 100 mg',
      '20,1 a 40 kg: sarolaner 48 mg + moxidectina 0,96 mg + pirantel 200 mg',
      '40,1 a 60 kg: sarolaner 72 mg + moxidectina 1,44 mg + pirantel 300 mg',
    ],
    activeComponents: ['sarolaner', 'moxidectina', 'pamoato de pirantel'],
    labelCompositionSummary:
      'Endectocida oral com isoxazolina, lactona macrocíclica e pirantel para cobertura de ectoparasitas, nematódeos e dirofilariose.',
    labelDirections:
      'Administrar 1 comprimido por via oral, uma vez ao mês, conforme faixa de peso.',
    plumbsContext:
      'Produto mensal amplo para cães; útil quando se deseja reduzir múltiplas medicações preventivas em uma tomada.',
    clinicalUse:
      'Pulgas, carrapatos, nematódeos gastrointestinais, prevenção de dirofilariose e prevenção de Angiostrongylus vasorum conforme bula.',
    reassessment:
      'Testar/avaliar Dirofilaria em regiões de risco antes de iniciar preventivo em paciente suspeito. Reavaliar fezes quando há diarreia persistente.',
    prescriptionExample:
      'Administrar 1 comprimido de Simparic Trio correspondente ao peso, VO, a cada 30 dias.',
    safetyAlert:
      'Não usar em gatos. Segurança em reprodução/prenhez/lactação deve ser avaliada; cautela neurológica por sarolaner.',
    price: {
      averageLabel: 'R$ 111,00 a R$ 168,00 por comprimido',
      rangeLabel: 'Estimativa conforme faixa: 5,1-10 kg perto de R$ 111,05 e 20,1-40 kg perto de R$ 168,00 em Petlove',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'credeli-caes-elanco',
    slug: 'credeli-caes-lotilaner',
    name: 'Credeli Cães',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_isoxazoline_dog',
    commercialSubclasses: ['parasite_oral_isoxazoline_dog'],
    productPageUrl: 'https://meupet.elanco.com/br/nossos-produtos/credeli',
    labelUrl: 'https://meupet.elanco.com/br/nossos-produtos/credeli',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1082144/Antipulgas Credeli 225mg Caes 5,5 a 11kg 3 comprimidos.webp?v=638899140307630000',
    species: ['dog'],
    presentations: ['Comprimidos mastigáveis por faixa de peso'],
    activeComponents: ['lotilaner'],
    labelCompositionSummary:
      'Isoxazolina oral à base de lotilaner. Dose mínima referenciada em Plumb’s: 20 mg/kg VO mensal com alimento.',
    labelDirections:
      'Administrar por via oral uma vez ao mês, com alimento ou logo após refeição, conforme faixa de peso.',
    plumbsContext:
      'Lotilaner é isoxazolina; administrar com alimento melhora exposição. Manter cautela neurológica.',
    clinicalUse:
      'Controle mensal de pulgas e carrapatos em cães.',
    reassessment:
      'Reavaliar adesão com alimento, controle ambiental de pulgas e exposição a carrapatos.',
    prescriptionExample:
      'Administrar 1 comprimido de Credeli correspondente ao peso, VO, mensalmente com alimento.',
    safetyAlert:
      'Não usar em gatos na apresentação canina. Cautela em pacientes com histórico neurológico.',
    price: {
      averageLabel: 'R$ 85,00 a R$ 100,00 por comprimido',
      rangeLabel: 'Estimativa em caixa com 3 comprimidos; exemplo 450 mg para 11-22 kg perto de R$ 261,45, cerca de R$ 87,15 por comprimido',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'credeli-gatos-elanco',
    slug: 'credeli-gatos-lotilaner',
    name: 'Credeli Gatos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_antifleas_cat',
    commercialSubclasses: ['parasite_oral_antifleas_cat'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/credeli-gatos',
    labelUrl:
      'https://assets-us-01.kc-usercontent.com/0cec44ed-3eaa-0009-2029-666567e7e4de/15c9b7b3-72a4-4559-ad2f-7507d0b50450/bula-credeli-gatos.pdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1050427/Credeli-gatos-48mg.png?v=638306661277100000',
    species: ['cat'],
    presentations: [
      '0,9 a 2,0 kg: lotilaner 12 mg',
      '2,1 a 8,0 kg: lotilaner 48 mg',
      '>=8,1 kg: combinação adequada conforme peso',
    ],
    activeComponents: ['lotilaner'],
    labelCompositionSummary:
      'Isoxazolina oral felina à base de lotilaner para controle de pulgas por 30 dias.',
    labelDirections:
      'Administrar 1 comprimido por via oral mensalmente, por faixa de peso, preferencialmente com alimento.',
    plumbsContext:
      'Opção oral felina antipulgas; não cobre carrapatos, ácaros ou vermes como produtos endectocidas.',
    clinicalUse:
      'Controle mensal de pulgas em gatos quando se deseja evitar aplicação tópica.',
    reassessment:
      'Se houver sinais de vermes, ácaro de ouvido ou acesso externo, considerar produto de espectro maior.',
    prescriptionExample:
      'Administrar 1 comprimido de Credeli Gatos correspondente ao peso, VO, a cada 30 dias com alimento.',
    safetyAlert:
      'Usar somente apresentação felina. Cautela neurológica por lotilaner.',
    price: {
      averageLabel: 'R$ 80,00 a R$ 130,00 por comprimido',
      rangeLabel: 'Estimativa conforme dose de 12 mg ou 48 mg e disponibilidade da loja',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'revolution-zoetis',
    slug: 'revolution-selamectina',
    name: 'Revolution 6%/12%',
    manufacturer: 'Zoetis',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_endectocide',
    commercialSubclasses: ['parasite_topical_endectocide', 'parasite_heartworm_prevention'],
    productPageUrl: 'https://www.zoetis.com.br/especies/animais-de-companhia/revolution.aspx',
    labelUrl: 'https://www.zoetis.com.br/global-assets/private/revolution-6.pdf',
    imageUrl: 'https://www.zoetis.com.br/_locale-assets/img/animais-de-companhia/fotos-produtos/revolution-pack-1-pipeta-a-zoetis.jpg',
    species: ['dog', 'cat'],
    presentations: ['Revolution 6% e 12%, pipetas por espécie e peso'],
    activeComponents: ['selamectina'],
    labelCompositionSummary:
      'Endectocida tópico à base de selamectina; dose mínima de bula de 6 mg/kg.',
    labelDirections:
      'Aplicar topicamente uma vez ao mês, conforme espécie, concentração e faixa de peso.',
    plumbsContext:
      'Lactona macrocíclica tópica útil em gatos para pulgas e ácaro de ouvido; não é a opção mais forte para carrapatos.',
    clinicalUse:
      'Pulgas, DAPP, dirofilariose, sarna de ouvido, sarna sarcóptica em cães, vermes intestinais e piolhos conforme espécie/bula.',
    reassessment:
      'Reavaliar resposta em otite por Otodectes e risco de dirofilariose; confirmar apresentação correta 6% ou 12%.',
    prescriptionExample:
      'Aplicar 1 pipeta de Revolution correspondente ao peso, tópica, mensalmente.',
    safetyAlert:
      'Confirmar espécie, concentração e peso. Avaliar status de dirofilariose quando indicado regionalmente.',
    price: {
      averageLabel: 'R$ 95,00 a R$ 130,00 por pipeta',
      rangeLabel: 'Estimativa conforme espécie/faixa; Petlove exibiu Revolution 6% até 2,5 kg perto de R$ 94,85 a unidade',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'advocate-elanco',
    slug: 'advocate-caes-gatos',
    name: 'Advocate Cães e Gatos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_endectocide',
    commercialSubclasses: ['parasite_topical_endectocide', 'parasite_heartworm_prevention'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/advocate',
    labelUrl: 'https://www.bayer.com/sites/default/files/2020-11/AdvocateCao.pdf',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/798dbb9f-252c-41be-8399-ed8c24603bd6/Pack-Advocate.png?w=828&q=75&auto=format',
    species: ['dog', 'cat'],
    presentations: ['Pipetas por espécie e faixa de peso'],
    activeComponents: ['imidacloprida', 'moxidectina'],
    labelCompositionSummary:
      'Endectocida tópico com neonicotinoide e lactona macrocíclica. Apresentações são separadas para cães e gatos.',
    labelDirections:
      'Aplicar topicamente uma vez ao mês, conforme espécie e faixa de peso.',
    plumbsContext:
      'Boa opção tópica quando se deseja cobertura contra pulgas, sarnas/nematódeos e prevenção de Dirofilaria.',
    clinicalUse:
      'Pulgas, vermes, sarnas e prevenção de Dirofilaria immitis em cães e gatos conforme apresentação.',
    reassessment:
      'Confirmar apresentação correta para espécie; avaliar risco regional de dirofilariose.',
    prescriptionExample:
      'Aplicar 1 pipeta de Advocate correspondente ao peso e espécie, tópica, a cada 30 dias.',
    safetyAlert:
      'Não trocar apresentação cão/gato sem conferir bula. Evitar lambedura e aplicar em pele íntegra.',
    price: {
      averageLabel: 'R$ 115,00 a R$ 220,00 por pipeta/caixa',
      rangeLabel: 'Estimativa conforme espécie e faixa; Cobasi exibiu Advocate Gatos 4-8 kg perto de R$ 114,75 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'advantage-elanco',
    slug: 'advantage-caes-gatos',
    name: 'Advantage Cães e Gatos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://www.cobasi.com.br/antipulgas-advantage-caes-gatos-ate-4kg-elanco-3940267/p',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/Bula-Advantage-para-Caes-e-Gatos-Paciente-Consulta-Remedios.pdf',
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/210453-368-368/Antipulgas-Advantage-Caes-e-Gatos-04ml-ate-4kg-Bayer.jpg?v=638455256431530000',
    species: ['dog', 'cat'],
    presentations: ['Pipetas tópicas por faixa de peso'],
    activeComponents: ['imidacloprida'],
    labelCompositionSummary:
      'Ectoparasiticida tópico à base de imidacloprida para prevenção e tratamento de infestações por pulgas.',
    labelDirections:
      'Aplicar topicamente, mensalmente, conforme faixa de peso e bula.',
    plumbsContext:
      'Produto antipulgas simples; não cobre carrapatos nem vermes.',
    clinicalUse:
      'Controle de pulgas em cães e gatos quando não há necessidade de espectro mais amplo.',
    reassessment:
      'Se houver carrapatos, ácaros ou vermes, escolher outro espectro. Em DAPP, controlar ambiente e contactantes.',
    prescriptionExample:
      'Aplicar 1 pipeta de Advantage correspondente ao peso, tópica, mensalmente.',
    safetyAlert:
      'Não usar como cobertura para carrapatos ou vermes. Evitar contato com olhos e lambedura do local.',
    price: {
      averageLabel: 'R$ 45,00 a R$ 90,00',
      rangeLabel: 'Estimativa conforme espécie, faixa de peso e quantidade de pipetas; disponibilidade varia bastante',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'advantage-max3-caes-elanco',
    slug: 'advantage-max3-caes',
    name: 'Advantage Max3 Cães',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_vector_repellent_dog',
    commercialSubclasses: ['parasite_vector_repellent_dog', 'parasite_topical_classic'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/advantage-max3',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/Bula-Advantage-Max3-para-Caes-Paciente-Consulta-Remedios.pdf',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/d20d50b4-c66f-40e4-a91a-cd262a734033/Pack_Max3.png?w=828&q=75&auto=format',
    species: ['dog'],
    presentations: ['Pipetas tópicas mensais por faixa de peso'],
    activeComponents: ['imidacloprida', 'permetrina'],
    labelCompositionSummary:
      'Ectoparasiticida tópico com imidacloprida 100 mg/mL e permetrina 500 mg/mL conforme bula reproduzida.',
    labelDirections:
      'Aplicar topicamente uma vez ao mês, conforme faixa de peso do cão.',
    plumbsContext:
      'Produto com permetrina, útil como repelente vetorial em cães, mas perigoso para gatos.',
    clinicalUse:
      'Pulgas, carrapatos, piolhos e mosquitos em cães, especialmente quando há necessidade de repelência.',
    reassessment:
      'Reavaliar exposição a vetores e presença de gatos contactantes no domicílio.',
    prescriptionExample:
      'Aplicar 1 pipeta de Advantage Max3 correspondente ao peso do cão, tópica, mensalmente.',
    safetyAlert:
      'Alerta vermelho: não usar em gatos e evitar contato de gatos com cães recém-tratados até secagem completa.',
    price: {
      averageLabel: 'R$ 142,00 a R$ 221,00 por caixa com 3 pipetas',
      rangeLabel: 'Estimativa conforme faixa: até 4 kg perto de R$ 142,11; 10-25 kg perto de R$ 210,50; acima de 25 kg perto de R$ 220,95',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'seresto-elanco',
    slug: 'seresto-coleira',
    name: 'Seresto Coleira',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_collar',
    commercialSubclasses: ['parasite_collar'],
    productPageUrl: 'https://meupet.elanco.com/br/nossos-produtos/seresto/seresto-caes',
    labelUrl: 'https://products-info-public.s3-sa-east-1.amazonaws.com/bulas/bayer/B%2B-%2B86136708-LF%2BSERESTO%2BCOLLAR_SAC.pdf',
    imageUrl:
      'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/04eb16f8-ce93-4c58-9721-f7aa0510f938/Embalagens_Seresto%202025.png?w=1920&q=75&auto=format',
    species: ['dog', 'cat'],
    presentations: ['Coleira para cães até 8 kg/gatos', 'Coleira para cães acima de 8 kg'],
    activeComponents: ['imidacloprida', 'flumetrina'],
    labelCompositionSummary:
      'Coleira de liberação contínua com imidacloprida e flumetrina.',
    labelDirections:
      'Colocar 1 coleira ajustada ao pescoço e substituir conforme período de proteção indicado, até 8 meses.',
    plumbsContext:
      'Útil para adesão prolongada; risco prático importante é produto falsificado ou irritação local.',
    clinicalUse:
      'Controle prolongado de pulgas e carrapatos em cães; em gatos, modelo indicado para proteção contra pulgas conforme bula/modelo.',
    reassessment:
      'Verificar ajuste, irritação local, validade, autenticidade e eficácia em ambiente com alta infestação.',
    prescriptionExample:
      'Colocar 1 coleira Seresto apropriada para espécie/peso e substituir no prazo indicado pelo fabricante.',
    safetyAlert:
      'Confirmar modelo para cão/gato e procedência. Suspender se houver dermatite de contato importante.',
    price: {
      averageLabel: 'R$ 150,00 a R$ 250,00',
      rangeLabel: 'Estimativa conforme modelo/tamanho; Cobasi exibiu cães e gatos até 8 kg perto de R$ 150,50 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'scalibor-msd',
    slug: 'scalibor-coleira-caes',
    name: 'Scalibor Coleira',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_vector_repellent_dog',
    commercialSubclasses: ['parasite_vector_repellent_dog', 'parasite_collar'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/scalibor/',
    labelUrl: 'https://www.msd-saude-animal.com.br/produto/scalibor/',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/scalibor-e1594307847267.jpg',
    species: ['dog'],
    presentations: ['Coleira 48 cm', 'Coleira 65 cm'],
    activeComponents: ['deltametrina'],
    labelCompositionSummary:
      'Coleira ectoparasiticida/repelente à base de deltametrina.',
    labelDirections:
      'Colocar 1 coleira no pescoço do cão, ajustar e cortar a sobra conforme orientação do fabricante.',
    plumbsContext:
      'Piretroide canino com foco vetorial; não usar em gatos.',
    clinicalUse:
      'Prevenção de exposição a flebótomos em áreas de leishmaniose e auxílio no controle de mosquitos, moscas, carrapatos e pulgas.',
    reassessment:
      'Verificar ajuste, irritação local e estratégia de prevenção de leishmaniose conforme risco regional.',
    prescriptionExample:
      'Colocar 1 coleira Scalibor do tamanho adequado no cão e substituir conforme período de proteção do fabricante.',
    safetyAlert:
      'Não usar em gatos. Atenção a domicílios com gatos contactantes e a irritação local.',
    price: {
      averageLabel: 'R$ 90,00 a R$ 180,00',
      rangeLabel: 'Estimativa conforme tamanho e loja; Petlove descreveu proteção por até 6 meses em apresentações da linha',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'vectra-3d-caes-ceva',
    slug: 'vectra-3d-caes',
    name: 'Vectra 3D Cães',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_vector_repellent_dog',
    commercialSubclasses: ['parasite_vector_repellent_dog', 'parasite_topical_classic'],
    productPageUrl: 'https://www.vectrapet.com/br/',
    labelUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/927800/antipulgas-vectra-3d-caes-10-a-25-kg-ceva-36-ml.jpg?v=638421324517470000',
    species: ['dog'],
    presentations: ['Pipetas tópicas por faixa de peso'],
    activeComponents: ['permetrina', 'dinotefuran', 'piriproxifen'],
    labelCompositionSummary:
      'Tópico canino com permetrina, dinotefuran e piriproxifen.',
    labelDirections:
      'Aplicar pipeta tópica conforme faixa de peso e bula Ceva.',
    plumbsContext:
      'Produto repelente/ectoparasiticida para cães com permetrina; alerta vermelho para gatos.',
    clinicalUse:
      'Cães expostos a pulgas, carrapatos, flebótomos e mosquitos.',
    reassessment:
      'Reavaliar risco vetorial, presença de gatos contactantes e eficácia em carrapatos.',
    prescriptionExample:
      'Aplicar 1 pipeta de Vectra 3D correspondente ao peso do cão, tópica, conforme bula.',
    safetyAlert:
      'Não usar em gatos por conter permetrina. Evitar contato com gatos até secagem completa.',
    price: {
      averageLabel: 'R$ 77,00 a R$ 145,00 por pipeta',
      rangeLabel: 'Estimativa conforme faixa: Cobasi exibiu 4-10 kg perto de R$ 76,90; Petlove exibiu faixas maiores perto de R$ 132,30 a R$ 143,33',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'vectra-gatos-ceva',
    slug: 'vectra-gatos',
    name: 'Vectra Gatos',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://www.vectrapet.com/br/',
    labelUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/927801/antipulgas-vectra-gatos-ate-10-kg-ceva-1-ml.jpg?v=638421322197230000',
    species: ['cat'],
    presentations: ['Pipetas tópicas para gatos'],
    activeComponents: ['dinotefuran', 'piriproxifen'],
    labelCompositionSummary:
      'Ectoparasiticida tópico felino com adulticida e regulador de crescimento de pulgas.',
    labelDirections:
      'Aplicar pipeta tópica conforme faixa de peso e bula Ceva.',
    plumbsContext:
      'Produto felino para pulgas, sem cobertura para vermes ou ácaros como Revolution/NexGard Combo.',
    clinicalUse:
      'Controle de pulgas adultas e formas imaturas em gatos.',
    reassessment:
      'Se houver otite por ácaro ou verminose, escolher produto de espectro maior.',
    prescriptionExample:
      'Aplicar 1 pipeta de Vectra Gatos correspondente ao peso, tópica, conforme bula.',
    safetyAlert:
      'Usar apenas apresentação felina. Não substituir por Vectra 3D, que é canino e contém permetrina.',
    price: {
      averageLabel: 'R$ 60,00 a R$ 90,00 por pipeta',
      rangeLabel: 'Estimativa conforme varejo e estoque para apresentação felina',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'frontline-plus-boehringer',
    slug: 'frontline-plus-caes-gatos',
    name: 'Frontline Plus Cães/Gatos',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://www.boehringer-ingelheim.com/br/saude-animal/produtos/frontline-plus-caes-p',
    labelUrl: 'https://integracao.bartofil.com.br/manual-bula/Frontline_Plus_C%C3%A3o_M_10a20kg_97849.pdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1011408/941514--1-.jpg?v=638138072976430000',
    species: ['dog', 'cat'],
    presentations: ['Pipetas tópicas separadas por espécie e faixa de peso'],
    activeComponents: ['fipronil', 'S-metopreno'],
    labelCompositionSummary:
      'Ectoparasiticida tópico com fipronil e regulador de crescimento S-metopreno.',
    labelDirections:
      'Aplicar 1 pipeta tópica conforme espécie e faixa de peso, seguindo intervalo de bula.',
    plumbsContext:
      'Tópico clássico com ação em adultos e fases ambientais de pulgas; menos abrangente que endectocidas modernos.',
    clinicalUse:
      'Pulgas, carrapatos, piolhos mastigadores e auxílio no controle ambiental por ovos/larvas de pulgas.',
    reassessment:
      'Reavaliar infestação ambiental e uso em todos contactantes; falhas costumam envolver ambiente ou banho inadequado.',
    prescriptionExample:
      'Aplicar 1 pipeta de Frontline Plus correta para espécie/peso, tópica, conforme bula.',
    safetyAlert:
      'Não trocar apresentação cão/gato sem conferir bula. Não cobre vermes.',
    price: {
      averageLabel: 'R$ 54,00 a R$ 120,00 por pipeta',
      rangeLabel: 'Estimativa conforme espécie/faixa; Cobasi exibiu Frontline Plus Gatos perto de R$ 54,00 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'frontline-topspot-boehringer',
    slug: 'frontline-topspot-caes-gatos',
    name: 'Frontline TopSpot Cães/Gatos',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://frontline.com.br/produtos/gatos/frontline-topspot',
    labelUrl: 'https://www.boehringer-ingelheim.com/br/pdf/frontline-topspot-gatospdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1011400/920681--1-.jpg?v=638137317579700000',
    species: ['dog', 'cat'],
    presentations: ['Pipetas tópicas por espécie e faixa de peso'],
    activeComponents: ['fipronil'],
    labelCompositionSummary:
      'Ectoparasiticida tópico clássico à base de fipronil.',
    labelDirections:
      'Aplicar 1 pipeta tópica conforme espécie e peso, no intervalo definido em bula.',
    plumbsContext:
      'Fipronil tópico para ectoparasitas; sem ação contra vermes.',
    clinicalUse:
      'Pulgas, carrapatos, piolhos mastigadores e DAPP conforme espécie e bula.',
    reassessment:
      'Reavaliar banho, aplicação correta e carga ambiental se houver reinfestação.',
    prescriptionExample:
      'Aplicar 1 pipeta de Frontline TopSpot correta para espécie/peso, tópica, conforme bula.',
    safetyAlert:
      'Não cobre vermes. Confirmar apresentação correta e evitar lambedura.',
    price: {
      averageLabel: 'R$ 33,00 a R$ 80,00 por pipeta',
      rangeLabel: 'Estimativa conforme espécie/faixa; Cobasi exibiu TopSpot Gatos 0,5 mL perto de R$ 33,21 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'frontline-spray-boehringer',
    slug: 'frontline-spray-caes-gatos',
    name: 'Frontline Spray Cães/Gatos',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://frontline.com.br/',
    labelUrl: 'https://frontline.com.br/',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1011402/929603--1-.jpg?v=639130713224070000',
    species: ['dog', 'cat'],
    presentations: ['Spray 100 mL', 'Spray 250 mL'],
    activeComponents: ['fipronil'],
    labelCompositionSummary:
      'Fenilpirazol em apresentação spray para cães e gatos. A dose depende do volume e do número de borrifadas por kg descrito na bula da apresentação.',
    labelDirections:
      'Aplicar conforme número de borrifadas indicado na bula para o peso do animal, contra o sentido do pelo, evitando olhos, boca e mucosas.',
    plumbsContext:
      'Spray de fipronil pode ser útil em pacientes pequenos/filhotes quando a apresentação é indicada e o cálculo de borrifadas é feito corretamente.',
    clinicalUse:
      'Controle de pulgas e carrapatos em cães e gatos, especialmente quando a apresentação spray é mais adequada que pipeta.',
    reassessment:
      'Reavaliar controle ambiental, contactantes e técnica de aplicação. Conferir se o tutor consegue aplicar com luvas e evitar mucosas.',
    prescriptionExample:
      'Frontline Spray: aplicar conforme número de borrifadas por kg indicado na bula, usando luvas, evitando olhos, boca e mucosas. Deixar secar naturalmente e repetir conforme orientação veterinária.',
    safetyAlert:
      'Não aplicar em olhos, boca ou mucosas. Usar luvas e seguir exatamente a bula da apresentação comprada para número de borrifadas por kg.',
    price: {
      averageLabel: 'R$ 135,00 a R$ 210,00',
      rangeLabel: 'Estimativa conforme volume: Cobasi exibiu 100 mL perto de R$ 135,00 e 250 mL perto de R$ 210,39 em compra programada',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'drontal-plus-caes-elanco',
    slug: 'drontal-plus-caes',
    name: 'Drontal Plus Cães',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_giardia'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/drontal',
    labelUrl:
      'https://products-info-public.s3-sa-east-1.amazonaws.com/bulas/bayer/81350779_V9_Leaflet_DRONTAL%2BPL_bula-SAC.pdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1077297/DrontalPlus-Sabor_10kg-2cps-1.webp?v=638862988851730000',
    species: ['dog'],
    presentations: ['Comprimidos por faixa de peso'],
    activeComponents: ['praziquantel', 'pamoato de pirantel', 'febantel'],
    labelCompositionSummary:
      'Vermífugo oral amplo para cães, combinando cestocida, nematocida e febantel.',
    labelDirections:
      'Em geral, 1 comprimido por 10 kg em dose única para verminoses; para Giardia spp., administrar por 3 dias consecutivos conforme bula.',
    plumbsContext:
      'Boa opção para nematódeos, cestódeos e indicação de Giardia por bula, lembrando que giardíase exige manejo ambiental.',
    clinicalUse:
      'Vermes redondos, vermes chatos e Giardia em cães conforme indicação de bula.',
    reassessment:
      'Em Giardia, reavaliar fezes/sinais, higiene ambiental, banho e contactantes.',
    prescriptionExample:
      'Administrar Drontal Plus conforme peso em dose única; em Giardia, repetir por 3 dias consecutivos conforme bula.',
    safetyAlert:
      'Não usar em gatos na apresentação canina. Giardia não é vermifugação comum: exige diagnóstico e manejo ambiental.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'drontal-gatos-comprimidos-elanco',
    slug: 'drontal-gatos-comprimidos',
    name: 'Drontal Gatos Comprimidos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_cat',
    commercialSubclasses: ['parasite_dewormer_cat'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/drontal',
    labelUrl: 'https://vet.elanco.com/br/produtos/drontal',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1004506/Drontal-Gatos-4-comprimidos.jpg?v=638866303578270000',
    species: ['cat'],
    presentations: ['Comprimidos para gatos por faixa de peso'],
    activeComponents: ['praziquantel', 'pamoato de pirantel'],
    labelCompositionSummary:
      'Vermífugo oral felino para cestódeos e nematódeos.',
    labelDirections:
      'Administrar comprimido por faixa de peso conforme bula da apresentação adquirida.',
    plumbsContext:
      'Opção oral para vermes redondos e chatos em gatos; não cobre pulgas, ácaros ou dirofilariose.',
    clinicalUse:
      'Vermifugação felina quando há alvo de nematódeos e cestódeos.',
    reassessment:
      'Se houver Dipylidium, controlar pulgas; se gato não aceita comprimido, considerar apresentação tópica.',
    prescriptionExample:
      'Administrar Drontal Gatos conforme peso e bula da apresentação comprada.',
    safetyAlert:
      'Confirmar peso e apresentação. Não substitui controle de pulgas em Dipylidium.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'drontal-gatos-spoton-elanco',
    slug: 'drontal-gatos-spoton',
    name: 'Drontal Gatos SpotOn',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_cat',
    commercialSubclasses: ['parasite_dewormer_cat'],
    productPageUrl: 'https://meupet.elanco.com/br/nossos-produtos/drontal/drontal-gatos-spoton',
    labelUrl:
      'https://assets-us-01.kc-usercontent.com/0cec44ed-3eaa-0009-2029-666567e7e4de/6e7e5ad4-b244-45ce-9831-25103aa3fa96/bula-drontal-gatos-spoton.pdf',
    imageUrl:
      'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/1df3ee4c-219e-4ebe-9a73-2f601535f86d/drontal_gatos_spoton_elanco-removebg-preview.png',
    species: ['cat'],
    presentations: ['Pipetas tópicas por faixa de peso'],
    activeComponents: ['praziquantel', 'emodepsida'],
    labelCompositionSummary:
      'Vermífugo tópico felino com praziquantel e emodepsida.',
    labelDirections:
      'Aplicar todo o conteúdo da pipeta diretamente sobre a pele seca na nuca, conforme faixa de peso.',
    plumbsContext:
      'Alternativa tópica útil quando o gato não aceita comprimido.',
    clinicalUse:
      'Vermes intestinais redondos e achatados em gatos, em dose única conforme bula.',
    reassessment:
      'Reavaliar reinfecção, pulgas e contactantes; repetir conforme risco e orientação veterinária.',
    prescriptionExample:
      'Aplicar 1 pipeta de Drontal Gatos SpotOn correspondente ao peso, tópica, em dose única.',
    safetyAlert:
      'Evitar lambedura após aplicação. Aplicar na pele, não sobre o pelo.',
    price: {
      averageLabel: 'Variável por faixa de peso',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'profender-gatos-elanco',
    slug: 'profender-spoton-gatos',
    name: 'Profender SpotOn Gatos',
    manufacturer: 'Elanco/Bayer',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_cat',
    commercialSubclasses: ['parasite_dewormer_cat'],
    productPageUrl: 'https://yourpetandyou.elanco.com/us/our-products/profender-for-cats',
    labelUrl: 'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/1f993677-46a0-433f-8338-9cc45cd4b668/Profender.pdf',
    imageUrl:
      'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/290e150a-3eec-4fb0-ab13-d39775118369/profender-packshot-desktop-632x375-update.jpg',
    species: ['cat'],
    presentations: ['Pipetas tópicas 0,35 mL, 0,70 mL e 1,12 mL conforme peso'],
    activeComponents: ['emodepsida', 'praziquantel'],
    labelCompositionSummary:
      'Vermífugo tópico felino para nematódeos e cestódeos. Bula técnica descreve dose mínima de 3 mg/kg de emodepsida e 12 mg/kg de praziquantel.',
    labelDirections:
      'Aplicar 0,14 mL/kg ou pipeta correspondente ao peso, diretamente na pele da nuca.',
    plumbsContext:
      'Produto tópico para vermes em gatos, útil em pacientes de difícil administração oral.',
    clinicalUse:
      'Tratamento e controle de verminoses mistas por cestódeos e nematódeos em gatos.',
    reassessment:
      'Controlar pulgas quando houver Dipylidium e reavaliar exposição ambiental.',
    prescriptionExample:
      'Aplicar 1 pipeta de Profender correspondente ao peso do gato, tópica, em dose única conforme bula.',
    safetyAlert:
      'Evitar lambedura e contato ocular. Usar com cautela em gatos debilitados; confirmar peso mínimo e apresentação.',
    price: {
      averageLabel: 'Variável por faixa de peso',
      rangeLabel: 'Confirmar disponibilidade e preço no Brasil',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'milbemax-elanco',
    slug: 'milbemax-caes-gatos',
    name: 'Milbemax Cães e Gatos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_dewormer_cat', 'parasite_heartworm_prevention'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/milbemax',
    labelUrl: 'https://vet.elanco.com/br/produtos/milbemax',
    imageUrl:
      'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/8b787fc9-0b65-4f94-a4e2-19e88ab38315/Milbemax_Familia_SKUs.png?w=828&q=75&auto=format',
    species: ['dog', 'cat'],
    presentations: ['Minicomprimidos por espécie e peso'],
    activeComponents: ['milbemicina oxima', 'praziquantel'],
    labelCompositionSummary:
      'Vermífugo oral com milbemicina oxima e praziquantel, com apresentações separadas para cães e gatos.',
    labelDirections:
      'Administrar por faixa de peso conforme bula; mensal quando o objetivo for prevenção de dirofilariose.',
    plumbsContext:
      'Combina vermífugo para redondos/chatos com prevenção de Dirofilaria quando usado mensalmente.',
    clinicalUse:
      'Vermes redondos, vermes achatados e prevenção de dirofilariose em cães e gatos conforme apresentação.',
    reassessment:
      'Avaliar risco regional de Dirofilaria e status do paciente antes de protocolo preventivo em animal de risco.',
    prescriptionExample:
      'Administrar Milbemax correspondente à espécie/peso conforme bula; para dirofilariose, usar mensalmente quando indicado.',
    safetyAlert:
      'Não cobre pulgas/carrapatos. Confirmar apresentação para espécie e peso.',
    price: {
      averageLabel: 'R$ 40,00 a R$ 68,00 por pipeta',
      rangeLabel: 'Estimativa conforme espécie/faixa; Cobasi exibiu Fiprolex Gatos 0,5 mL perto de R$ 57,50 e Petlove exibiu cães acima de 41 kg perto de R$ 60,75',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'endogard-caes-virbac',
    slug: 'endogard-caes',
    name: 'Endogard Cães',
    manufacturer: 'Virbac',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_heartworm_prevention', 'parasite_giardia'],
    productPageUrl: 'https://br.virbac.com/products/antiparasitarios-internos/endogard',
    labelUrl: 'https://br.virbac.com/files/live/sites/virbac-br/files/predefined-files/products/Bula%20Endogar.pdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1062543/Vermifugo-Endogard-Caes-ate-10kg-2-comprimidos.png?v=638647061240100000',
    species: ['dog'],
    presentations: ['Comprimidos para 2,5 kg', '10 kg', '30 kg'],
    activeComponents: ['pamoato de pirantel', 'praziquantel', 'febantel', 'ivermectina'],
    labelCompositionSummary:
      'Vermífugo oral amplo para cães com pirantel, praziquantel, febantel e ivermectina.',
    labelDirections:
      'Administrar conforme faixa de peso e bula. Programas de dirofilariose devem seguir orientação veterinária.',
    plumbsContext:
      'Produto amplo para vermes intestinais, Giardia e prevenção de verme do coração conforme bula/programa.',
    clinicalUse:
      'Cães com necessidade de cobertura contra nematódeos, cestódeos, Giardia e prevenção de Dirofilaria conforme risco.',
    reassessment:
      'Em Giardia, associar higiene ambiental e reavaliação. Em dirofilariose, avaliar risco e testagem.',
    prescriptionExample:
      'Administrar Endogard na apresentação correspondente ao peso, conforme bula e objetivo clínico.',
    safetyAlert:
      'Não usar em gatos. Atenção a raças/pacientes com risco MDR1 por conter ivermectina.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'canex-premium-caes-ceva',
    slug: 'canex-premium-caes',
    name: 'Canex Premium Cães',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_heartworm_prevention'],
    productPageUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    labelUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/924447/vermifugo-canex-premium-caes-ate-40kg-nova-embalagem.jpg?v=638133010331200000',
    species: ['dog'],
    presentations: ['Comprimidos por faixa de peso'],
    activeComponents: ['ivermectina', 'pamoato de pirantel', 'febantel', 'praziquantel'],
    labelCompositionSummary:
      'Vermífugo oral amplo canino com ivermectina, pirantel, febantel e praziquantel.',
    labelDirections:
      'Administrar conforme faixa de peso e bula Ceva. Alguns varejos listam apresentação de 1 comprimido para até 40 kg.',
    plumbsContext:
      'Cobre nematódeos, cestódeos e larvas de Dirofilaria conforme bula, mas exige cautela por ivermectina.',
    clinicalUse:
      'Vermífugo amplo para cães, incluindo contexto de prevenção/controle de formas larvais de Dirofilaria conforme indicação.',
    reassessment:
      'Avaliar risco de dirofilariose e repetir exames/protocolo conforme plano preventivo.',
    prescriptionExample:
      'Administrar Canex Premium conforme faixa de peso e bula da apresentação adquirida.',
    safetyAlert:
      'Não usar em gatos. Alerta para raças MDR1 e uso responsável de ivermectina.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'canex-giardia-caes-ceva',
    slug: 'canex-giardia-caes',
    name: 'Canex Giárdia Cães',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_giardia',
    commercialSubclasses: ['parasite_giardia', 'parasite_dewormer_dog'],
    productPageUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    labelUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1050424/Vermifugo-Canex-Giardia-30-comprimidos.jpg?v=638306597921800000',
    species: ['dog'],
    presentations: ['Comprimidos por faixa de peso'],
    activeComponents: ['pamoato de pirantel', 'febantel', 'praziquantel'],
    labelCompositionSummary:
      'Vermífugo oral palatável para cães com pirantel, febantel e praziquantel.',
    labelDirections:
      'Administrar conforme faixa de peso e esquema de bula, incluindo protocolo específico para Giardia quando indicado.',
    plumbsContext:
      'Febantel dá suporte à indicação para Giardia por bula, mas giardíase exige diagnóstico e manejo ambiental.',
    clinicalUse:
      'Nematódeos, cestódeos e Giardia spp. em cães conforme bula.',
    reassessment:
      'Em diarreia recorrente, confirmar diagnóstico, banho, limpeza ambiental, contactantes e reavaliação clínica.',
    prescriptionExample:
      'Administrar Canex Giárdia conforme peso e esquema de bula para o alvo clínico.',
    safetyAlert:
      'Não tratar Giardia como vermifugação comum isolada; exige higiene ambiental e reavaliação.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'canex-original-ceva',
    slug: 'canex-original-caes-gatos',
    name: 'Canex Original Cães e Gatos',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_dewormer_cat'],
    productPageUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    labelUrl: 'https://www.ceva.com.br/content/download/2818/file/Bula%20-%20Canex%20Original.pdf?version=1',
    imageUrl: 'https://www.ceva.com.br/var/site/storage/images/_aliases/large/5/1/5/4/44515-1-por-BR/e5cc68db56b6-CANEX-ORIGINAL.webp',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos'],
    activeComponents: ['pamoato de pirantel'],
    labelCompositionSummary:
      'Anti-helmíntico oral à base de pamoato de pirantel; bula Ceva lista 145 mg de pamoato de pirantel por comprimido.',
    labelDirections:
      'Bula reproduzida informa 1 comprimido para cada 10 kg em cães e 1 comprimido para cada 2,5 kg em gatos.',
    plumbsContext:
      'Vermífugo mais simples para nematódeos; não cobre cestódeos como produtos com praziquantel.',
    clinicalUse:
      'Vermífugo simples para cães e gatos quando o alvo são vermes sensíveis ao pirantel.',
    reassessment:
      'Se houver suspeita de Dipylidium/Taenia, escolher produto com praziquantel e controlar pulgas.',
    prescriptionExample:
      'Administrar Canex Original conforme peso e bula: cães 1 comp/10 kg; gatos 1 comp/2,5 kg.',
    safetyAlert:
      'Não cobre cestódeos; evitar escolha automática quando há segmentos de tênia ou pulgas.',
    price: {
      averageLabel: 'Variável por apresentação',
      rangeLabel: 'Confirmar preço atual no varejo',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'fiprolex-drop-spot-ceva',
    slug: 'fiprolex-drop-spot',
    name: 'Fiprolex Drop Spot',
    manufacturer: 'Ceva',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    commercialSubclasses: ['parasite_topical_classic'],
    productPageUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    labelUrl: 'https://www.ceva.com.br/solucoes-e-inovacoes/animais-de-companhia/nossos-produtos-para-animais-de-companhia',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/184349/Antipulgas-Fiprolex-Drop-Spot-0.67ml-ate-10kg-Caes-Ceva--2-.jpg?v=638152836343300000',
    species: ['dog', 'cat'],
    presentations: ['Pipetas tópicas por espécie e peso'],
    activeComponents: ['fipronil'],
    labelCompositionSummary:
      'Ectoparasiticida tópico à base de fipronil, com apresentações específicas para cães e gatos.',
    labelDirections:
      'Aplicar pipeta tópica conforme espécie e faixa de peso, seguindo bula Ceva.',
    plumbsContext:
      'Alternativa tópica clássica à base de fipronil; não cobre vermes.',
    clinicalUse:
      'Pulgas e carrapatos em cães; pulgas em gatos, conforme bula/apresentação.',
    reassessment:
      'Reavaliar aplicação, banho e ambiente se houver falha de controle.',
    prescriptionExample:
      'Aplicar 1 pipeta de Fiprolex correta para espécie/peso, tópica, conforme bula.',
    safetyAlert:
      'Confirmar apresentação para espécie. Não cobre vermes nem dirofilariose.',
    price: {
      averageLabel: 'R$ 40,00 a R$ 68,00 por pipeta',
      rangeLabel:
        'Estimativa conforme espécie/faixa; Cobasi exibiu Fiprolex Gatos 0,5 mL perto de R$ 57,50 e Petlove exibiu cães acima de 41 kg perto de R$ 60,75',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'capstar-elanco',
    slug: 'capstar-caes-gatos-nitenpiram',
    name: 'Capstar Cães/Gatos',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_adulticide_flea',
    commercialSubclasses: ['parasite_oral_adulticide_flea'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/capstar',
    labelUrl: 'https://integracao.bartofil.com.br/manual-bula/Capstar_Elanco_Pet_57mg_Para_Caes_de_11%2C5kg_a_57kg_124731.pdf',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1042272/capstar-57-mg-frente.jpg?v=638918952347000000',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos 11,4 mg', 'Comprimidos 57 mg'],
    activeComponents: ['nitenpiram'],
    labelCompositionSummary:
      'Neonicotinoide oral adulticida contra pulgas. Apresentações usuais de 11,4 mg e 57 mg conforme peso/espécie.',
    labelDirections:
      'Administrar por via oral em dose única, com ou sem alimento. Pode repetir após 24 horas se indicado, conforme bula e avaliação veterinária.',
    plumbsContext:
      'Produto para derrubar pulgas adultas rapidamente; não tem duração mensal/trimestral e deve ser associado a estratégia preventiva quando há risco de reinfestação.',
    clinicalUse:
      'Eliminação rápida de pulgas adultas em cães e gatos; também há indicação de bula para miíase por Cochliomyia hominivorax em cães.',
    reassessment:
      'Se usado em DAPP ou infestação intensa, associar controle ambiental, contactantes e produto residual mensal/trimestral.',
    prescriptionExample:
      'Capstar 11,4 mg ou 57 mg conforme peso: dar 1 comprimido por via oral, dose única, para eliminação rápida de pulgas adultas. Pode repetir após 24 horas se necessário, conforme orientação veterinária.',
    safetyAlert:
      'Não usar como único controle de pulgas em ambiente infestado. Associar produto residual e controle ambiental para prevenir reinfestação.',
    price: {
      averageLabel: 'R$ 80,00 a R$ 100,00 por caixa com 6 comprimidos',
      rangeLabel: 'Estimativa conforme apresentação; varejos exibiram Capstar 57 mg com 6 comprimidos perto de R$ 80-100',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'banni-caes-ourofino',
    slug: 'banni-caes-fipronil-moxidectina',
    name: 'Banni Cães',
    manufacturer: 'Ourofino',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_endectocide',
    commercialSubclasses: ['parasite_topical_endectocide', 'parasite_topical_classic', 'parasite_dewormer_dog'],
    productPageUrl: 'https://www.ourofinopet.com/produtos/prevencao-e-protecao/banni/',
    labelUrl: 'https://ourofino.com/wp-content/uploads/2024/10/BUL_50006142_0624_OF00_BANNI-BD.pdf',
    imageUrl:
      'https://www.ourofinopet.com/media/uploads/produtos/apresentacao/2024/20241001082550_5bF8oeM.png',
    species: ['dog'],
    presentations: [
      'Até 5 kg: flaconete 0,31 mL',
      '5,1 a 10 kg: flaconete 0,67 mL',
      '10,1 a 20 kg: flaconete 1,34 mL',
      '20,1 a 40 kg: flaconete 2,68 mL',
      '40,1 a 60 kg: flaconete 4,02 mL',
    ],
    activeComponents: ['fipronil 12,5%', 'moxidectina 3%'],
    labelCompositionSummary:
      'Cada 100 mL contém fipronil 12,500 g, moxidectina 3,000 g e veículo q.s.p. 100,000 mL.',
    labelDirections:
      'Aplicar 1 flaconete por via tópica, conforme faixa de peso, diretamente sobre a pele seca entre a nuca e as escápulas. Aplicar todo o conteúdo e não fracionar.',
    plumbsContext:
      'Associação tópica de fenilpirazol com lactona macrocíclica. Útil quando se deseja ectoparasiticida com cobertura adicional para helmintos gastrintestinais em cães.',
    clinicalUse:
      'Tratamento de infestações por pulgas, carrapatos e helmintos gastrintestinais como Ancylostoma spp., Toxocara spp. e Trichuris vulpis em cães.',
    reassessment:
      'Reavaliar controle ambiental de pulgas, exposição a carrapatos e parasitismo intestinal. Em Dipylidium ou DAPP, controlar pulgas em contactantes e ambiente.',
    prescriptionExample:
      'Banni Cães [faixa de peso correta], aplicar 1 flaconete por via tópica, diretamente sobre a pele seca, afastando os pelos na região entre a nuca e as escápulas. Aplicar todo o conteúdo. Não fracionar. Evitar banho por 48 horas após a aplicação. Repetir conforme protocolo indicado pelo médico-veterinário e bula. Não usar em gatos.',
    safetyAlert:
      'Não usar em gatos. Confirmar peso atual e apresentação correta; não fracionar flaconete de outra faixa de peso.',
    price: {
      averageLabel: 'R$ 42,00 a R$ 98,00 por flaconete',
      rangeLabel:
        'Estimativa por faixa: 0,31 mL R$ 47-67; 0,67 mL R$ 50-71; 1,34 mL R$ 52-75; 2,68 mL R$ 42-84; 4,02 mL R$ 69-98',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
      notes: 'Preços variam bastante por promoção/recorrência; salvar como faixa estimada.',
    },
  },
  {
    id: 'banni-3-gatos-ourofino',
    slug: 'banni-3-gatos-fipronil-moxidectina-praziquantel',
    name: 'Banni 3 Gatos',
    manufacturer: 'Ourofino',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_endectocide',
    commercialSubclasses: ['parasite_topical_endectocide', 'parasite_topical_classic', 'parasite_dewormer_cat'],
    productPageUrl: 'https://www.ourofinopet.com/produtos/prevencao-e-protecao/banni-3/',
    labelUrl: 'https://ourofino.com/wp-content/uploads/2024/07/COMBO-BANNI-3_BULA.pdf',
    imageUrl: 'https://www.ourofinopet.com/media/uploads/produtos/apresentacao/2023/20231025164840.png',
    species: ['cat'],
    presentations: [
      'Até 2,5 kg: flaconete 0,3 mL',
      '2,6 a 7,5 kg: flaconete 0,9 mL',
      'Acima de 7,5 kg: combinação de flaconetes conforme peso',
    ],
    activeComponents: ['praziquantel 8,3%', 'moxidectina 0,83%', 'fipronil 12,5%'],
    labelCompositionSummary:
      'Cada 100 mL contém praziquantel 8,300 g, moxidectina 0,830 g, fipronil 12,500 g e veículo q.s.p. 100,000 mL.',
    labelDirections:
      'Aplicar 1 flaconete por via tópica diretamente sobre a pele seca da nuca, próximo à base do crânio, afastando bem os pelos. Aplicar todo o conteúdo em um único ponto.',
    plumbsContext:
      'Endectocida tópico felino com cobertura combinada para ectoparasitas, nematódeos e cestódeos. A presença de praziquantel diferencia de produtos que cobrem apenas nematódeos.',
    clinicalUse:
      'Gatos filhotes e adultos com ou em risco de infestações por pulgas, nematódeos gastrintestinais, cestódeos, ácaro da sarna otodécica e piolhos.',
    reassessment:
      'Reavaliar risco de reinfestação por pulgas e Dipylidium. Em gatos acima de 7,5 kg, calcular combinação de flaconetes conforme bula e peso atual.',
    prescriptionExample:
      'Banni 3 Gatos [faixa de peso correta], aplicar 1 flaconete por via tópica, diretamente sobre a pele seca da nuca, próximo à base do crânio, afastando bem os pelos para garantir contato com a pele. Aplicar todo o conteúdo em um único ponto. Não fracionar. Evitar banho ou lambedura da região até secagem completa. Repetir conforme protocolo indicado, respeitando a bula.',
    safetyAlert:
      'Produto felino. Evitar lambedura até secagem completa. Para gatos acima de 7,5 kg, usar combinação de flaconetes conforme peso e bula.',
    price: {
      averageLabel: 'R$ 52,00 a R$ 112,00',
      rangeLabel:
        'Estimativa: 0,3 mL até 2,5 kg R$ 52-58; 0,9 mL 2,6-7,5 kg R$ 52-67; combo com 3 pipetas 0,9 mL R$ 95-112',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
      notes: 'Intervalo de proteção contra pulgas informado em varejo/fonte comercial: até 49 dias.',
    },
  },
  {
    id: 'vetmax-plus-comprimido-vetnil',
    slug: 'vetmax-plus-comprimido',
    name: 'Vetmax Plus Comprimido',
    manufacturer: 'Vetnil',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_dewormer_cat', 'parasite_giardia'],
    productPageUrl: 'https://vetnil.com.br/produto/vetmax-r-plus/',
    labelUrl: 'https://vetnil.com.br/produto/vetmax-r-plus/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/Vetmax-Plus-4-comp_site_V3.png',
    species: ['dog', 'cat'],
    presentations: ['Caixa com 4 comprimidos de 700 mg'],
    activeComponents: ['fembendazol 200 mg/comprimido', 'pamoato de pirantel 144 mg/comprimido', 'praziquantel 50 mg/comprimido'],
    labelCompositionSummary:
      'Cada comprimido de 700 mg contém fembendazol 200 mg, pamoato de pirantel 144 mg, praziquantel 50 mg e excipiente q.s.p. 700 mg.',
    labelDirections:
      'Verminose comum: dose única VO conforme peso. Giardíase: 1 comprimido para cada 4 kg, VO, a cada 24 horas, por 3 dias consecutivos.',
    plumbsContext:
      'Associação de benzimidazol, pirantel e praziquantel para nematódeos e cestódeos. Em Giardia, protocolo de bula exige 3 dias e manejo ambiental.',
    clinicalUse:
      'Tratamento de infecções por Ancylostoma spp., Toxocara spp., Trichuris spp., Dipylidium caninum e Giardia spp. em cães e gatos.',
    reassessment:
      'Repetir em 15 a 30 dias quando indicado. Em Dipylidium caninum, tratar pulgas no animal, contactantes e ambiente. Em giardíase, reavaliar fezes, higiene ambiental e contactantes.',
    prescriptionExample:
      'Vetmax Plus 700 mg, administrar por via oral, dose única, conforme peso: até 5 kg, 1/2 comprimido; 6 a 10 kg, 1 comprimido; 11 a 20 kg, 2 comprimidos; 21 a 30 kg, 3 comprimidos; 31 a 40 kg, 4 comprimidos; acima de 40 kg, 1 comprimido para cada 10 kg. Para giardíase: 1 comprimido para cada 4 kg, VO, a cada 24 horas, durante 3 dias consecutivos.',
    safetyAlert:
      'Ajustar dose pelo peso atual. Para Giardia, associar higiene ambiental, remoção de fezes, banho no último dia quando indicado e manejo dos contactantes.',
    price: {
      averageLabel: 'R$ 46,00 a R$ 66,00 por caixa com 4 comprimidos',
      rangeLabel: 'Petlove/Cobasi perto de R$ 52-58; anúncios em marketplace variando cerca de R$ 46-66',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'vetmax-plus-suspensao-vetnil',
    slug: 'vetmax-plus-suspensao-oral',
    name: 'Vetmax Plus Suspensão Oral',
    manufacturer: 'Vetnil',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_dewormer_cat'],
    productPageUrl: 'https://vetnil.com.br/produto/vetmax-r-plus-suspensao/',
    labelUrl: 'https://vetnil.com.br/produto/vetmax-r-plus-suspensao/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/vetmax-r-plus-suspensao.webp',
    species: ['dog', 'cat'],
    presentations: ['Frasco 30 mL com seringa dosadora'],
    activeComponents: ['fembendazol 200 mg/5 mL', 'pamoato de pirantel 144 mg/5 mL', 'praziquantel 50 mg/5 mL'],
    labelCompositionSummary:
      'Cada 5 mL contém fembendazol 200 mg, pamoato de pirantel 144 mg, praziquantel 50 mg e excipiente q.s.p. 5 mL.',
    labelDirections:
      'Administrar por via oral, em dose única, puro ou misturado a pequena quantidade de alimento, sem necessidade de jejum. Pode repetir após 15 ou 30 dias se indicado.',
    plumbsContext:
      'Mesma associação anti-helmíntica do comprimido em apresentação líquida, útil para pacientes pequenos, filhotes ou dificuldade de administração de comprimidos.',
    clinicalUse:
      'Vermífugo de amplo espectro contra nematódeos e cestódeos de cães e gatos, incluindo Ancylostoma spp., Toxocara spp., Trichuris vulpis, Dipylidium caninum, Taenia spp. e outros conforme bula.',
    reassessment:
      'Reavaliar carga parasitária, coproparasitológico e necessidade de repetição em 15 a 30 dias. Em cestódeos associados a pulgas, tratar pulgas junto.',
    prescriptionExample:
      'Vetmax Plus Suspensão Oral, administrar por via oral, dose única, conforme peso: até 5 kg, 2,5 mL; 6 a 10 kg, 5 mL; 11 a 20 kg, 10 mL; 21 a 30 kg, 15 mL; 31 a 40 kg, 20 mL; acima de 40 kg, 5 mL para cada 10 kg. Pode ser oferecido puro ou misturado a pequena quantidade de alimento. Repetir em 15 a 30 dias se indicado.',
    safetyAlert:
      'Agitar antes do uso quando aplicável e medir com seringa dosadora. Ajustar pelo peso atual para evitar subdose.',
    price: {
      averageLabel: 'R$ 58,00 a R$ 80,00 por frasco 30 mL',
      rangeLabel: 'Cobasi perto de R$ 79,90, Petlove perto de R$ 65,61 em recorrência e varejos menores perto de R$ 57,99',
      sourceDate: ECTO_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-3-500-avert',
    slug: 'ograx-3-500',
    name: 'Ograx-3 500',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-3-500-30-capsulas',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-3-500_1733927824.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas twist-off de 500 mg, frasco com 30 cápsulas'],
    activeComponents: ['EPA 162 mg/cápsula', 'DHA 108 mg/cápsula', 'EPA + DHA 270 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 162 mg e DHA 108 mg, totalizando EPA + DHA 270 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 9 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação geral de EPA/DHA em cães e gatos; adjuvante em pele, pelagem e condições inflamatórias quando indicado.',
    reassessment: 'Reavaliar resposta clínica após 8 a 12 semanas e ajustar pela meta de EPA + DHA conforme objetivo clínico.',
    prescriptionExample:
      'Ograx-3 500 mg, administrar 1 cápsula para cada 9 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação. A cápsula pode ser oferecida inteira ou aberta e misturada ao alimento.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 98,00 a R$ 109,00',
      rangeLabel: 'Cobasi listou perto de R$ 108,90 e compra programada perto de R$ 98,01',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-3-1000-avert',
    slug: 'ograx-3-1000',
    name: 'Ograx-3 1000',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-3-1000',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-3-1000_1733935288.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas de 1000 mg'],
    activeComponents: ['EPA 324 mg/cápsula', 'DHA 216 mg/cápsula', 'EPA + DHA 540 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 324 mg e DHA 216 mg, totalizando EPA + DHA 540 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 18 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação geral de EPA/DHA em cães e gatos; entrega cerca de 30 mg/kg de EPA + DHA na dose de rótulo.',
    reassessment: 'Reavaliar em 8 a 12 semanas; para osteoartrite, DRC, cardiopatia ou hiperlipidemia, calcular EPA + DHA individualmente.',
    prescriptionExample:
      'Ograx-3 1000 mg, administrar 1 cápsula para cada 18 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 138,00 a R$ 154,00',
      rangeLabel: 'Petlove/Cobasi em torno de R$ 153,90 e recorrência perto de R$ 138,51',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-3-1500-avert',
    slug: 'ograx-3-1500',
    name: 'Ograx-3 1500',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-3-1500',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-3-1500_1733935306.jpg',
    species: ['dog'],
    presentations: ['Cápsulas de 1500 mg'],
    activeComponents: ['EPA 605 mg/cápsula', 'DHA 462 mg/cápsula', 'EPA + DHA 1067 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 605 mg e DHA 462 mg, totalizando EPA + DHA 1067 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 33 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Opção mais concentrada para cães de maior porte quando se deseja suplementação de EPA/DHA com menor número de cápsulas.',
    reassessment: 'Reavaliar em 8 a 12 semanas e recalcular dose se o objetivo for renal, articular, cardiovascular ou hiperlipidemia.',
    prescriptionExample:
      'Ograx-3 1500 mg, administrar 1 cápsula para cada 33 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'Preço variável / confirmar varejo',
      rangeLabel: 'Não foi encontrado preço estável em grandes varejos no trecho pesquisado',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-plus-5-avert',
    slug: 'ograx-plus-5',
    name: 'Ograx Plus 5',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-plus-5',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-plus-5-1746g-30cpl-packshot-500px.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas palatáveis'],
    activeComponents: ['EPA 200 mg/cápsula', 'DHA 80 mg/cápsula', 'EPA + DHA 280 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 200 mg e DHA 80 mg, totalizando EPA + DHA 280 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 5 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Dose de rótulo entrega cerca de 56 mg/kg de EPA + DHA; opção mais concentrada que Ograx-3 para suporte anti-inflamatório moderado.',
    reassessment: 'Reavaliar pele, prurido, articulações ou objetivo clínico em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Plus 5, administrar 1 cápsula para cada 5 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 118,00 a R$ 131,00',
      rangeLabel: 'Petz/Cobasi em torno de R$ 130,90 e recorrência/assinatura perto de R$ 117,81 a R$ 117,89',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-plus-15-avert',
    slug: 'ograx-plus-15',
    name: 'Ograx Plus 15',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-plus-15',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-plus-15-4909g-30cpl-packshot-500px_1757074554.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas palatáveis'],
    activeComponents: ['EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Página oficial informa dose por peso, mas o trecho público consultado não exibiu EPA e DHA por cápsula. Confirmar rótulo do lote antes de cálculo terapêutico.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 15 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de ômega 3 para cães e gatos; usar como dose de rótulo até confirmar EPA/DHA por cápsula.',
    reassessment: 'Antes de usar para meta terapêutica de EPA + DHA, preencher concentração confirmada no app.',
    prescriptionExample:
      'Ograx Plus 15, administrar 1 cápsula para cada 15 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 167,00 a R$ 186,00',
      rangeLabel: 'Petlove/Cobasi em torno de R$ 185,90 e recorrência perto de R$ 167,31',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Dose de rótulo confirmada; EPA/DHA por cápsula pendente de rótulo oficial aberto.',
  },
  {
    id: 'ograx-gatos-avert',
    slug: 'ograx-gatos',
    name: 'Ograx Gatos',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-gatos',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-gatos_1733935430.jpg',
    species: ['cat'],
    presentations: ['Frasco com 30 cápsulas'],
    activeComponents: ['EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Página oficial informa óleo de peixe, glicerina, gelatina e água, mas o trecho público consultado não mostrou EPA e DHA por cápsula.',
    labelDirections: 'Dose de rótulo: 1 cápsula ao dia para gatos até 5 kg, por via oral.',
    plumbsContext:
      'Em gatos, fontes marinhas são preferíveis para EPA/DHA. Se o óleo reduzir aceitação alimentar, especialmente em cardiopata, renal ou caquético, suspender ou trocar estratégia.',
    clinicalUse: 'Suplementação felina de ômega 3 para pele, pelagem e suporte nutricional conforme avaliação.',
    reassessment: 'Monitorar aceitação alimentar e fezes; confirmar EPA/DHA por cápsula antes de dose terapêutica calculada.',
    prescriptionExample:
      'Ograx Gatos, administrar 1 cápsula por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação. Pode abrir a cápsula e misturar pequena quantidade ao alimento, se o gato aceitar o sabor.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 86,00 a R$ 115,00',
      rangeLabel: 'Petlove/Cobasi listaram perto de R$ 114,90 e recorrência/clube em torno de R$ 86,18 a R$ 103,41',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Dose de rótulo confirmada; EPA/DHA por cápsula pendente de rótulo oficial aberto.',
  },
  {
    id: 'ograx-baby-avert',
    slug: 'ograx-baby',
    name: 'Ograx Baby',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-baby',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-baby-mudanca.png',
    species: ['dog', 'cat'],
    presentations: ['Frasco 30 mL com seringa dosadora'],
    activeComponents: ['DHA 200 mg/mL', 'EPA 46 mg/mL', 'EPA + DHA 246 mg/mL', 'vitamina E 14,8 UI/mL'],
    labelCompositionSummary: 'Cada mL contém DHA 200 mg, EPA 46 mg, total EPA + DHA 246 mg/mL, além de vitamina E 14,8 UI/mL.',
    labelDirections: 'Dose de rótulo: 0,1 mL para cada 0,5 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte de desenvolvimento, crescimento, pele/pelagem e aporte de DHA em filhotes de cães e gatos.',
    reassessment: 'Ajustar pela evolução do peso do filhote; não é primeira escolha para metas terapêuticas altas em adultos.',
    prescriptionExample:
      'Ograx Baby, administrar 0,1 mL para cada 0,5 kg, por via oral, a cada 24 horas, junto à alimentação, usando a seringa dosadora, conforme peso atual.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 110,00 a R$ 122,00',
      rangeLabel: 'Cobasi listou perto de R$ 121,90 e compra programada perto de R$ 109,71',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-derme-10-avert',
    slug: 'ograx-derme-10',
    name: 'Ograx Derme 10',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    commercialSubclasses: ['nutra_omega3', 'skin_pruritus', 'skin_atopy'],
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/dermatologia/ograx-derme-10',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-derme-10-30cpl-309g-packshot.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas dermatológicas'],
    activeComponents: ['óleo de peixe', 'óleo de borragem', 'vitamina E', 'EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Produto dermatológico multimodal com óleo de peixe, óleo de borragem e vitamina E. EPA/DHA por cápsula deve ser confirmado no rótulo para cálculo terapêutico.',
    labelDirections: 'Dose de rótulo: cães, 1 cápsula para cada 10 kg SID; gatos, 1 cápsula SID; por no mínimo 4 semanas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Adjuvante dermatológico para pele, pelagem, prurido leve e barreira cutânea, com ômega 3 + GLA/ômega 6.',
    reassessment: 'Reavaliar resposta dermatológica em 4 a 8 semanas; não substituir controle de pulgas, piodermite, Malassezia ou terapia anti-inflamatória quando indicada.',
    prescriptionExample:
      'Ograx Derme 10, administrar 1 cápsula para cada 10 kg em cães, ou 1 cápsula ao dia em gatos, por via oral, a cada 24 horas, por no mínimo 4 a 8 semanas, junto à alimentação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 125,00 a R$ 139,00',
      rangeLabel: 'Cobasi listou perto de R$ 138,90 e compra programada perto de R$ 125,01',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Produto dermatológico com composição geral confirmada; EPA/DHA por cápsula pendente no trecho aberto.',
  },
  {
    id: 'ograx-artro-10-avert',
    slug: 'ograx-artro-10',
    name: 'Ograx Artro 10',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    commercialSubclasses: ['nutra_omega3', 'ortho_joint_support'],
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/articular/ograx-artro-10',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-artro-10-30cpl-3067g-packshot-660-x-540.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas articulares'],
    activeComponents: ['EPA 200 mg/cápsula', 'DHA 150 mg/cápsula', 'EPA + DHA 350 mg/cápsula', 'UC-II 40 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 200 mg, DHA 150 mg, total EPA + DHA 350 mg, além de UC-II 40 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 10 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte articular com ômega 3 e UC-II em cães e gatos; útil em plano multimodal de osteoartrite.',
    reassessment: 'Reavaliar dor, mobilidade e tolerância gastrointestinal em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Artro 10, administrar 1 cápsula para cada 10 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação ortopédica.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 210,00 a R$ 262,00',
      rangeLabel: 'Petz/Cobasi em torno de R$ 261,90 e promoção/recorrência perto de R$ 209,50',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-artro-20-avert',
    slug: 'ograx-artro-20',
    name: 'Ograx Artro 20',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    commercialSubclasses: ['nutra_omega3', 'ortho_joint_support'],
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/articular/ograx-artro-20',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-artro-20-30cpl-5377g-packshot-660x540.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas articulares'],
    activeComponents: ['EPA 400 mg/cápsula', 'DHA 300 mg/cápsula', 'EPA + DHA 700 mg/cápsula', 'UC-II 40 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 400 mg, DHA 300 mg, total EPA + DHA 700 mg, além de UC-II 40 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 20 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte articular para pacientes de maior porte, combinando ômega 3 e UC-II.',
    reassessment: 'Reavaliar dor, mobilidade e tolerância gastrointestinal em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Artro 20, administrar 1 cápsula para cada 20 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas, ou conforme reavaliação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'Preço variável / confirmar varejo',
      rangeLabel: 'Não foi encontrado preço estável em grandes varejos no trecho pesquisado',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-cell-5-avert',
    slug: 'ograx-cell-5',
    name: 'Ograx Cell 5',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-cell-5',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-cell-5.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas'],
    activeComponents: ['EPA 45 mg/cápsula', 'DHA 150 mg/cápsula', 'EPA + DHA 195 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 45 mg e DHA 150 mg, totalizando EPA + DHA 195 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 5 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte celular/neurológico/geriátrico conforme avaliação, com maior proporção de DHA.',
    reassessment: 'Reavaliar objetivo clínico e aceitação em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Cell 5, administrar 1 cápsula para cada 5 kg, por via oral, a cada 24 horas, junto à alimentação, pelo período recomendado conforme objetivo clínico.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 68,00 a R$ 76,00',
      rangeLabel: 'Petlove listou perto de R$ 75,90 e recorrência perto de R$ 68,31',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-cell-15-avert',
    slug: 'ograx-cell-15',
    name: 'Ograx Cell 15',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-cell-15',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-cell-15.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas'],
    activeComponents: ['EPA 135 mg/cápsula', 'DHA 450 mg/cápsula', 'EPA + DHA 585 mg/cápsula'],
    labelCompositionSummary: 'Cada cápsula contém EPA 135 mg e DHA 450 mg, totalizando EPA + DHA 585 mg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 15 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte com maior aporte de DHA; pode ser escolhido quando esse perfil é desejado.',
    reassessment: 'Reavaliar objetivo clínico e tolerância em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Cell 15, administrar 1 cápsula para cada 15 kg, por via oral, a cada 24 horas, junto à alimentação, conforme objetivo clínico e reavaliação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 204,00 a R$ 227,00',
      rangeLabel: 'Cobasi/Petlove em torno de R$ 226,90 e recorrência perto de R$ 204,21',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-senior-5-avert',
    slug: 'ograx-senior-5',
    name: 'Ograx Senior 5',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-senior-5',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/senior-senior-5.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas sênior'],
    activeComponents: ['DHA 130 mg/cápsula', 'EPA 39 mg/cápsula', 'EPA + DHA 169 mg/cápsula', 'vitamina E 120 UI', 'selênio 30 mcg'],
    labelCompositionSummary: 'Cada cápsula contém DHA 130 mg, EPA 39 mg, vitamina E 120 UI e selênio 30 mcg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 5 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte geriátrico com DHA predominante, vitamina E e selênio.',
    reassessment: 'Reavaliar objetivo geriátrico, apetite e fezes em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Senior 5, administrar 1 cápsula para cada 5 kg, por via oral, a cada 24 horas, junto à alimentação, conforme protocolo de suporte geriátrico.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 88,00 a R$ 98,00',
      rangeLabel: 'Cobasi listou perto de R$ 97,90 e compra programada perto de R$ 88,11',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'ograx-senior-10-avert',
    slug: 'ograx-senior-10',
    name: 'Ograx Senior 10',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/omegas/ograx-senior-10',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/seniox-senior-10.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas sênior'],
    activeComponents: ['DHA 260 mg/cápsula', 'EPA 78 mg/cápsula', 'EPA + DHA 338 mg/cápsula', 'vitamina E 240 UI', 'selênio 60 mcg'],
    labelCompositionSummary: 'Cada cápsula contém DHA 260 mg, EPA 78 mg, vitamina E 240 UI e selênio 60 mcg.',
    labelDirections: 'Dose de rótulo: 1 cápsula para cada 10 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suporte geriátrico com DHA predominante, vitamina E e selênio.',
    reassessment: 'Reavaliar objetivo geriátrico, apetite e fezes em 8 a 12 semanas.',
    prescriptionExample:
      'Ograx Senior 10, administrar 1 cápsula para cada 10 kg, por via oral, a cada 24 horas, junto à alimentação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 175,00 a R$ 195,00',
      rangeLabel: 'Petlove/Cobasi em torno de R$ 194,90 e recorrência perto de R$ 175,41',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-se-550-vetnil',
    slug: 'omega-3-se-550',
    name: 'Ômega 3 + SE 550',
    manufacturer: 'Vetnil',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://vetnil.com.br/produto/omega-3-se-r-550-e-1100/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/omega-3-se-r-550-e-1100_63e6671811039.webp',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas de 550 mg'],
    activeComponents: ['DHA 121 mg/cápsula', 'EPA 181,5 mg/cápsula', 'EPA + DHA 302,5 mg/cápsula', 'selênio 0,06 mg', 'vitamina E 50 UI'],
    labelCompositionSummary: 'Cada cápsula contém DHA 121 mg, EPA 181,5 mg, selênio 0,06 mg e vitamina E 50 UI.',
    labelDirections: 'Dose de rótulo: 1 cápsula ao dia para animais até 8 kg.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de EPA/DHA com selênio e vitamina E para cães e gatos pequenos.',
    reassessment: 'Reavaliar em 8 a 12 semanas; calcular EPA e DHA se objetivo for cardiopatia, DRC, osteoartrite ou hiperlipidemia.',
    prescriptionExample:
      'Ômega 3 + SE 550, administrar 1 cápsula por via oral, a cada 24 horas, para animais até 8 kg, junto à alimentação. Pode administrar inteira ou abrir e misturar ao alimento, conforme aceitação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 90,00 a R$ 125,00',
      rangeLabel: 'Petlove/Mercado Livre variando nessa faixa para 550 mg',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-se-1100-vetnil',
    slug: 'omega-3-se-1100',
    name: 'Ômega 3 + SE 1100',
    manufacturer: 'Vetnil',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://vetnil.com.br/produto/omega-3-se-r-550-e-1100/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/omega-3-se-r-550-e-1100_63e6671811039.webp',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas de 1100 mg'],
    activeComponents: ['DHA 242 mg/cápsula', 'EPA 363 mg/cápsula', 'EPA + DHA 605 mg/cápsula', 'selênio 0,12 mg', 'vitamina E 100 UI'],
    labelCompositionSummary: 'Cada cápsula contém DHA 242 mg, EPA 363 mg, selênio 0,12 mg e vitamina E 100 UI.',
    labelDirections: 'Dose de rótulo: 1 cápsula ao dia para animais de 8 a 16 kg.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de EPA/DHA com selênio e vitamina E para cães e gatos de 8 a 16 kg.',
    reassessment: 'Reavaliar em 8 a 12 semanas; calcular EPA e DHA se objetivo for cardiopatia, DRC, osteoartrite ou hiperlipidemia.',
    prescriptionExample:
      'Ômega 3 + SE 1100, administrar 1 cápsula por via oral, a cada 24 horas, para animais de 8 a 16 kg, junto à alimentação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 145,00 a R$ 185,00',
      rangeLabel: 'Petlove perto de R$ 184,71; Agromeyer/Semeve entre R$ 144,90 e R$ 166,49',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-dog-500-organnact',
    slug: 'omega-3-dog-500-organnact',
    name: 'Omega 3 Dog 500 mg',
    manufacturer: 'Organnact',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://organnact.com.br/caes/suplemento-para-caes/omega-3-dog/',
    imageUrl: 'https://organnact.com.br/wp-content/uploads/2020/04/OMEGA-3-DOG_TODAS-1.png',
    species: ['dog'],
    presentations: ['500 mg com 30 ou 90 cápsulas'],
    activeComponents: ['EPA ~90 mg/cápsula', 'DHA ~60 mg/cápsula', 'EPA + DHA ~150 mg/cápsula'],
    labelCompositionSummary:
      'Composição por kg: DHA 120 g/kg, EPA 180 g/kg, ômega 3 total 350 g/kg e vitamina E 20.000 UI/kg; cápsula 500 mg equivale aproximadamente a EPA 90 mg + DHA 60 mg.',
    labelDirections: 'Dose de rótulo: 1 a 2 cápsulas ao dia para cada 10 kg.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação canina de EPA/DHA; 2 cápsulas/10 kg se aproximam de dose de manutenção de 30 mg/kg de EPA + DHA.',
    reassessment: 'Reavaliar em 8 a 12 semanas e calcular EPA/DHA para metas terapêuticas.',
    prescriptionExample:
      'Omega 3 Dog 500 mg, administrar 1 a 2 cápsulas para cada 10 kg, por via oral, a cada 24 horas, junto à alimentação, conforme orientação veterinária.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 190,00 a R$ 195,00 para 90 cápsulas',
      rangeLabel: 'Cobasi listou 90 cápsulas perto de R$ 193,90',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-dog-1000-organnact',
    slug: 'omega-3-dog-1000-organnact',
    name: 'Omega 3 Dog 1000 mg',
    manufacturer: 'Organnact',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://organnact.com.br/caes/suplemento-para-caes/omega-3-dog/',
    imageUrl: 'https://organnact.com.br/wp-content/uploads/2020/04/OMEGA-3-DOG_TODAS-1.png',
    species: ['dog'],
    presentations: ['1000 mg com 30 ou 90 cápsulas'],
    activeComponents: ['EPA ~180 mg/cápsula', 'DHA ~120 mg/cápsula', 'EPA + DHA ~300 mg/cápsula'],
    labelCompositionSummary:
      'Pela concentração por kg do produto, cápsula de 1000 mg equivale aproximadamente a EPA 180 mg + DHA 120 mg.',
    labelDirections: 'Dose de rótulo: 1 a 2 cápsulas ao dia para cada 20 kg.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação canina de EPA/DHA; 2 cápsulas/20 kg se aproximam de dose de manutenção de 30 mg/kg de EPA + DHA.',
    reassessment: 'Reavaliar em 8 a 12 semanas e calcular EPA/DHA para metas terapêuticas.',
    prescriptionExample:
      'Omega 3 Dog 1000 mg, administrar 1 a 2 cápsulas para cada 20 kg, por via oral, a cada 24 horas, junto à alimentação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 109,00 a R$ 235,00',
      rangeLabel: 'Varia conforme 30 ou 90 cápsulas; Petlove mostrou 30 cápsulas perto de R$ 108,93 e 90 cápsulas perto de R$ 234,90',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-6-d-cat-organnact',
    slug: 'omega-3-6-d-cat',
    name: 'Omega 3+6+D Cat',
    manufacturer: 'Organnact',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://organnact.com.br/gatos/suplemento-para-gatos/omega-36d-cat/',
    imageUrl: 'https://organnact.com.br/wp-content/uploads/2020/04/OMEGA-3-CAT_CONJUNTO-1-1024x976.png',
    species: ['cat'],
    presentations: ['Líquido 30 mL'],
    activeComponents: ['DHA 48 g/kg', 'EPA 72 g/kg', 'ácido linolênico 140 g/kg', 'ácido linoleico 34 g/kg', 'vitamina D3 130.000 UI/kg', 'vitamina E 2.500 UI/kg'],
    labelCompositionSummary:
      'Produto líquido com ômega 3, ômega 6 e vitamina D3. Composição por kg: DHA 48 g, EPA 72 g, ácido linolênico 140 g, ácido linoleico 34 g, vitamina D3 130.000 UI e vitamina E 2.500 UI.',
    labelDirections: 'Dose de rótulo: gatos até 10 kg, 1 mL SID; acima de 10 kg, 1,5 mL SID.',
    plumbsContext:
      'Em gatos, fontes marinhas são preferíveis para EPA/DHA, mas este produto também contém ômega 6 e vitamina D3; evitar perseguir doses altas sem cálculo e monitoramento.',
    clinicalUse: 'Suplementação felina líquida de pele/pelagem e suporte nutricional com ômega 3, ômega 6 e vitamina D.',
    reassessment: 'Monitorar palatabilidade, apetite, fezes e necessidade de uso prolongado.',
    prescriptionExample:
      'Omega 3+6+D Cat, administrar 1 mL por via oral, a cada 24 horas, para gatos até 10 kg, junto à alimentação. Para gatos acima de 10 kg, administrar 1,5 mL a cada 24 horas.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'Preço variável / confirmar varejo',
      rangeLabel: 'Não foi localizado preço estável em grandes varejos no trecho pesquisado',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'omega-3-vet-botupharma',
    slug: 'omega-3-vet-botupharma',
    name: 'Omega 3 Vet',
    manufacturer: 'Botupharma Pet',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://botupharmapet.com.br/omega-3-vet/',
    imageUrl:
      'https://tb1663.vtexassets.com/arquivos/ids/172034/Suplemento-Botupharma--mega-3-Vet-para-C-es-e-Gatos-1000mg---Cont-m-60-c-psulas-0.jpg?v=638732492896630000',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas de 500 mg e 1000 mg, frascos com 30 ou 60 cápsulas'],
    activeComponents: ['óleo de peixe ultrapuro', 'relação EPA:DHA 1,5:1', 'EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Óleo de peixe ultrapuro com relação EPA:DHA 1,5:1. A página aberta não informou EPA e DHA exatos por cápsula.',
    labelDirections: 'Dose técnica encontrada: animais até 10 kg podem receber 1 a 3 cápsulas ao dia, conforme orientação veterinária.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de EPA/DHA em cães e gatos; confirmar teor por cápsula antes de cálculo terapêutico.',
    reassessment: 'Reavaliar em 8 a 12 semanas; preencher EPA/DHA do rótulo se for calcular dose alvo.',
    prescriptionExample:
      'Omega 3 Vet [500 mg ou 1000 mg], administrar conforme peso e objetivo clínico, por via oral, a cada 24 horas, junto à alimentação. Dose usual de rótulo/técnica: 1 a 3 cápsulas ao dia para animais até 10 kg, ajustando conforme orientação veterinária.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 69,00 a R$ 120,00',
      rangeLabel: '500 mg em torno de R$ 69-77; 1000 mg com 60 cápsulas perto de R$ 120',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Relação EPA:DHA confirmada; EPA/DHA exatos por cápsula pendentes de rótulo.',
  },
  {
    id: 'omegatop-3-500-agener',
    slug: 'omegatop-3-500',
    name: 'OmegaTop 3 500 mg',
    manufacturer: 'Agener União',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://vetsmart.com.br/cg/produto/5330/omegatop-3',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/933089/suplemento-para-caes-e-gatos-omega-top-3-500-mg.jpg?v=638134522113030000',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas 500 mg, frasco com 40 cápsulas'],
    activeComponents: ['EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Suplemento com EPA e DHA. Não foi encontrada página oficial aberta da Agener com rótulo completo; confirmar EPA/DHA por cápsula antes de cálculo terapêutico.',
    labelDirections: 'Dose comercial: 1 cápsula para cada 9 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de EPA/DHA em cães e gatos, com fonte comercial/técnica pendente de rótulo oficial completo.',
    reassessment: 'Reavaliar em 8 a 12 semanas; anexar rótulo oficial antes de habilitar cálculo terapêutico fino.',
    prescriptionExample:
      'OmegaTop 3 500 mg, administrar 1 cápsula para cada 9 kg, por via oral, a cada 24 horas, junto à alimentação, por no mínimo 8 a 12 semanas.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 83,00 a R$ 104,00',
      rangeLabel: 'Cobasi listou perto de R$ 103,90 e compra programada perto de R$ 82,90',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Fonte técnica/comercial; concentração EPA/DHA não confirmada em bula oficial aberta.',
  },
  {
    id: 'omegatop-3-1000-agener',
    slug: 'omegatop-3-1000',
    name: 'OmegaTop 3 1000 mg',
    manufacturer: 'Agener União',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    productPageUrl: 'https://vetsmart.com.br/cg/produto/5330/omegatop-3',
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/799317/omega_top_3_1000_mg_40_caps_8847_1_954feafa716aebeb6a3378b0cd792f21.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cápsulas 1000 mg, frasco com 40 cápsulas'],
    activeComponents: ['EPA/DHA por cápsula não confirmado em fonte aberta'],
    labelCompositionSummary:
      'Suplemento com EPA e DHA. Não foi encontrada página oficial aberta da Agener com rótulo completo; confirmar EPA/DHA por cápsula antes de cálculo terapêutico.',
    labelDirections: 'Dose comercial: 1 cápsula para cada 18 kg, por via oral, a cada 24 horas.',
    plumbsContext: OMEGA3_PLUMBS_CONTEXT,
    clinicalUse: 'Suplementação de EPA/DHA em cães e gatos, com fonte comercial/técnica pendente de rótulo oficial completo.',
    reassessment: 'Reavaliar em 8 a 12 semanas; anexar rótulo oficial antes de habilitar cálculo terapêutico fino.',
    prescriptionExample:
      'OmegaTop 3 1000 mg, administrar 1 cápsula para cada 18 kg, por via oral, a cada 24 horas, junto à alimentação.',
    safetyAlert: OMEGA3_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 128,00 a R$ 160,00',
      rangeLabel: 'Cobasi indicou produto de 1000 mg/40 cápsulas em torno de R$ 159,90 e compra programada perto de R$ 127,90',
      sourceDate: OMEGA_PRICE_SOURCE_DATE,
    },
    evidenceLevel: 'Fonte técnica/comercial; concentração EPA/DHA não confirmada em bula oficial aberta.',
  },
  {
    id: 'periovet-spray-vetnil',
    slug: 'periovet-spray',
    name: 'Periovet Spray',
    manufacturer: 'Vetnil',
    commercialClass: 'dental',
    commercialSubclass: 'dental_chlorhexidine',
    productPageUrl: 'https://vetnil.com.br/produto/periovet-r/',
    labelUrl: 'https://vetsmart.com.br/cg/produto/309/periovet',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/periovet-r_66df50a074248.webp',
    species: ['dog', 'cat'],
    presentations: ['Spray 100 mL'],
    activeComponents: ['digluconato de clorexidina 0,12%'],
    labelCompositionSummary: 'Higienizador bucal veterinário à base de digluconato de clorexidina; varejo técnico lista clorexidina 0,12% para o spray.',
    labelDirections: 'Aplicar para atingir superfícies dentárias e gengivais; gazes ou escovas podem facilitar a aplicação. Pode ser usado antes, durante e após avaliações/procedimentos orais.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Rotina pós-limpeza, higiene oral, controle de halitose leve e suporte antisséptico oral em cães e gatos.',
    reassessment: 'Reavaliar gengivite, halitose, cálculo e adesão à escovação. Se houver cálculo mineralizado, indicar profilaxia.',
    prescriptionExample: 'Periovet Spray, aplicar diretamente sobre dentes e gengivas, de modo a atingir toda a superfície dentária e gengival, 1 a 2 vezes ao dia ou conforme orientação veterinária. Pode ser aplicado com auxílio de gaze, dedeira ou escova macia. Não é necessário enxaguar.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 48,00 a R$ 55,00', rangeLabel: 'Spray 100 mL; Cobasi e varejos próximos de R$ 48-55', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'periovet-gel-vetnil',
    slug: 'periovet-gel',
    name: 'Periovet Gel',
    manufacturer: 'Vetnil',
    commercialClass: 'dental',
    commercialSubclass: 'dental_chlorhexidine',
    commercialSubclasses: ['dental_chlorhexidine', 'dental_toothpaste_gel', 'dental_gum_support'],
    productPageUrl: 'https://vetnil.com.br/produto/periovet-r/',
    labelUrl: 'https://vetsmart.com.br/cg/produto/309/periovet',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/941845',
    species: ['dog', 'cat'],
    presentations: ['Gel 25 g'],
    activeComponents: ['clorexidina'],
    labelCompositionSummary: 'Gel higienizador bucal veterinário à base de clorexidina.',
    labelDirections: 'Aplicar diretamente em dentes e gengivas, com gaze, dedeira ou escova macia, conforme orientação veterinária.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Contato local mais prolongado em gengiva/dentes, especialmente pós-profilaxia ou quando o responsável consegue manipular a boca.',
    reassessment: 'Reavaliar resposta gengival, halitose e tolerância à aplicação. Se houver cálculo, dor ou sangramento, investigar doença periodontal.',
    prescriptionExample: 'Periovet Gel, aplicar pequena quantidade diretamente sobre dentes e gengivas, com gaze, dedeira ou escova macia, 1 a 2 vezes ao dia ou conforme orientação veterinária. Não enxaguar. Evitar alimento e água por cerca de 20 a 30 minutos após aplicação quando possível.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 65,00 a R$ 75,00', rangeLabel: 'Gel 25 g; Cobasi/Mercado Livre em torno de R$ 68-70', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'oralclin-spray-agener',
    slug: 'oralclin-spray',
    name: 'Oralclin Spray',
    manufacturer: 'Agener União',
    commercialClass: 'dental',
    commercialSubclass: 'dental_chlorhexidine',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/oralclin/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2026/03/oralclin_spray.png',
    species: ['dog', 'cat'],
    presentations: ['Spray 120 mL'],
    activeComponents: ['gliconato de clorexidina', 'óleo de mamona', 'sorbitol', 'glicerol', 'ácido lático', 'trolamina'],
    labelCompositionSummary: 'Ingredientes publicados: óleo de mamona, sorbitol, aroma tutti-frutti, glicerol, gliconato de clorexidina, sucralose, ácido lático e trolamina.',
    labelDirections: 'Borrifar diretamente nos dentes e gengiva quando necessário; pode ser usado antes, durante e após avaliações/procedimentos orais.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Higienizador oral com clorexidina para cães e gatos; concorrente direto do Periovet spray.',
    reassessment: 'Reavaliar halitose, gengivite e adesão à escovação; não tratar cálculo como apenas mau hálito.',
    prescriptionExample: 'Oralclin Spray, borrifar diretamente sobre dentes e gengivas, quando necessário, preferencialmente após escovação ou manipulação oral. Não é necessário enxaguar. Usar conforme orientação veterinária.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 57,00 a R$ 68,00', rangeLabel: 'Spray 120 mL; Mercado Livre/Lupipet nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'oralclin-gel-agener',
    slug: 'oralclin-gel',
    name: 'Oralclin Gel',
    manufacturer: 'Agener União',
    commercialClass: 'dental',
    commercialSubclass: 'dental_chlorhexidine',
    commercialSubclasses: ['dental_chlorhexidine', 'dental_toothpaste_gel', 'dental_gum_support'],
    productPageUrl: 'https://www.uniaoquimica.com.br/produtos/agener/pequenos-animais/especialidades/oralclin-gel/',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1101484/Oralclin-Gel-para-higiene-Bucal--1-.webp?v=639136092848970000',
    species: ['dog', 'cat'],
    presentations: ['Gel 25 g'],
    activeComponents: ['gliconato de clorexidina', 'óleo de mamona', 'carbômero', 'sacarina sódica', 'monoetanolamina'],
    labelCompositionSummary: 'Ingredientes publicados pela União Química: óleo de mamona, carbômero, aroma tutti-frutti, gliconato de clorexidina, sacarina sódica e monoetanolamina.',
    labelDirections: 'Aplicar o gel diretamente nos dentes e gengiva quando necessário.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Gel bucal com clorexidina para aplicação direta em cães e gatos.',
    reassessment: 'Reavaliar gengiva, halitose e necessidade de profilaxia odontológica.',
    prescriptionExample: 'Oralclin Gel, aplicar pequena quantidade diretamente sobre dentes e gengivas, quando necessário, com gaze, dedeira ou escova macia. Não enxaguar. Usar conforme orientação veterinária.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 50,00 a R$ 65,00', rangeLabel: 'Disponibilidade variável por lançamento; Lupipet/DogCatCompany nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'solucao-bucal-ibasa',
    slug: 'solucao-bucal-ibasa',
    name: 'Solução Bucal Ibasa',
    manufacturer: 'Ibasa',
    commercialClass: 'dental',
    commercialSubclass: 'dental_chlorhexidine',
    productPageUrl: 'https://www.ibasa.com.br/solucao-bucal-caes-gatos-ibasa-100ml',
    imageUrl: 'https://ibasa.cdn.orangestore.cc/dLCE9lKZT92XG0SMNW5iSkwGRX0=/fit-in/0x0/filters:quality(95):fill(ffffff,1)/n49shopv2_ibasa/images/products/6971044309bea/solucao_bucal_100ml-6971044309c9f.jpg',
    species: ['dog', 'cat'],
    presentations: ['Frasco 100 mL'],
    activeComponents: ['digluconato de clorexidina', 'gluconato de zinco', 'eritritol'],
    labelCompositionSummary: 'Composição publicada: água purificada, eritritol, gluconato de zinco, aroma e digluconato de clorexidina.',
    labelDirections: 'Aplicar diretamente na boca ou com gaze/escova, atingindo dentes e gengivas; uso recomendado duas vezes ao dia.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Manutenção da saúde bucal, halitose e refrescância do hálito; composição combina clorexidina, zinco e eritritol.',
    reassessment: 'Reavaliar halitose e sinais periodontais; não usar como substituto de escovação/profilaxia.',
    prescriptionExample: 'Solução Bucal Ibasa, aplicar diretamente sobre dentes e gengivas ou com auxílio de gaze/escova, 2 vezes ao dia. Evitar contato com olhos. Não enxaguar, salvo orientação específica.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 42,00 a R$ 57,00', rangeLabel: 'Cobasi/loja oficial Ibasa nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'espuma-bucal-ibasa',
    slug: 'espuma-bucal-ibasa',
    name: 'Espuma Bucal Ibasa',
    manufacturer: 'Ibasa',
    commercialClass: 'dental',
    commercialSubclass: 'dental_gum_support',
    commercialSubclasses: ['dental_gum_support', 'dental_plaque_supplement'],
    productPageUrl: 'https://www.ibasa.com.br/espuma-bucal-caes-gatos-ibasa-50ml',
    imageUrl: 'https://ibasa.cdn.orangestore.cc/6kdcmUZW8I5UtDFjz2NpdL7p1rg=/fit-in/0x0/filters:quality(95):fill(ffffff,1)/n49shopv2_ibasa/images/products/697103ed30b61/espuma_bucal-697103ed30c01.png',
    species: ['dog', 'cat'],
    presentations: ['Frasco 50 mL'],
    activeComponents: ['própolis', 'aroma de menta'],
    labelCompositionSummary: 'Produto higienizante bucal descrito com própolis e aroma de menta.',
    labelDirections: 'Aplicar diretamente na cavidade oral sobre dentes e gengivas conforme rótulo/fabricante.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Controle de halitose e suporte de higiene quando o responsável tem dificuldade com gel/escova.',
    reassessment: 'Se halitose persistir, investigar periodontite, fratura, abscesso, estomatite ou doença sistêmica.',
    prescriptionExample: 'Espuma Bucal Ibasa, aplicar diretamente na cavidade oral, sobre dentes e gengivas, conforme orientação do rótulo/fabricante, 1 vez ao dia ou conforme necessidade para controle de halitose. Não enxaguar.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 57,00 a R$ 77,00', rangeLabel: 'Cobasi e Mercado Livre/kits variáveis', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'cet-pasta-enzimatica-virbac',
    slug: 'cet-pasta-enzimatica',
    name: 'C.E.T. Pasta Enzimática',
    manufacturer: 'Virbac',
    commercialClass: 'dental',
    commercialSubclass: 'dental_toothpaste_gel',
    productPageUrl: 'https://br.virbac.com/products/linha-dental/kit-saude-oral-1',
    labelUrl: 'https://vetsmart.com.br/cg/produto/9',
    imageUrl: 'https://drogariasp.vteximg.com.br/arquivos/ids/585826-1000-1000/7502010420524.jpg?v=637842561371400000',
    species: ['dog', 'cat'],
    presentations: ['Pasta 70 g, geralmente em kit com escova e/ou dedeira'],
    activeComponents: ['pasta enzimática'],
    labelCompositionSummary: 'Pasta enzimática para higiene oral de cães e gatos.',
    labelDirections: 'Aplicar em escova/dedeira umedecida e escovar na junção gengiva-dente com movimentos a 45°. Não precisa enxaguar.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Rotina de escovação domiciliar; a ação mecânica da escovação é a parte principal.',
    reassessment: 'Reavaliar adesão e sangramento gengival; tentar aumentar frequência para diária quando possível.',
    prescriptionExample: 'C.E.T. Pasta Enzimática, aplicar pequena quantidade em escova ou dedeira própria para pets e escovar dentes e margem gengival 1 vez ao dia, ou no mínimo 3 vezes por semana. Não enxaguar após o uso.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 108,00 a R$ 173,00', rangeLabel: 'Varia conforme pasta avulsa ou kit; Amazon/Agrosolo nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'aquadent-fr3sh-virbac',
    slug: 'aquadent-fr3sh',
    name: 'Aquadent FR3SH',
    manufacturer: 'Virbac',
    commercialClass: 'dental',
    commercialSubclass: 'dental_water_additive',
    productPageUrl: 'https://br.virbac.com/products/linha-dental/aquadent-fr3sh',
    imageUrl: 'https://cobasi.vtexassets.com/arquivos/ids/1099420/Solucao-Oral-Aquadent-Fresh-Vibarc-250ml.png?v=639111911784430000',
    species: ['dog', 'cat'],
    presentations: ['Frasco 250 mL'],
    activeComponents: ['eritritol'],
    labelCompositionSummary: 'Solução para higiene oral diária; página Virbac informa eritritol por 100 mL e foco em combate ao mau hálito.',
    labelDirections: 'Diluir na água de bebida conforme rótulo e trocar a solução a cada 24 horas.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Aditivo para água em tutores que não conseguem manipular a boca; depende da ingestão hídrica.',
    reassessment: 'Monitorar consumo de água; se o paciente reduzir ingestão, suspender ou trocar estratégia.',
    prescriptionExample: 'Aquadent FR3SH, diluir na água de bebida conforme rótulo do fabricante e trocar a solução a cada 24 horas. Manter água fresca disponível e não usar como substituto da escovação dentária.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 145,00 a R$ 170,00', rangeLabel: 'Petlove, Cobasi e Agrosolo nessa faixa para 250 mL', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'dental-splash-softcare',
    slug: 'dental-splash',
    name: 'Dental Splash',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dental',
    commercialSubclass: 'dental_water_additive',
    productPageUrl: 'https://softcare.com.br/produtos/odonto/dental-splash/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Dental-Splash-1024x634.png',
    species: ['dog', 'cat'],
    presentations: ['Frasco 240 mL'],
    activeComponents: ['dióxido de cloro estabilizado 0,1%', 'bicarbonato de sódio', 'EDTA tetrassódico'],
    labelCompositionSummary: 'Cada 100 mL contém dióxido de cloro estabilizado 0,1%; composição completa inclui água purificada, bicarbonato de sódio, sorbato de potássio, EDTA tetrassódico, benzoato de sódio e metilparabeno.',
    labelDirections: 'Diluir 5 mL em 250 mL de água fresca e limpa; descartar a solução após 24 horas.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Aditivo para água para controle de halitose e suporte de higiene oral diária.',
    reassessment: 'Monitorar consumo hídrico e resposta de halitose.',
    prescriptionExample: 'Dental Splash, diluir 5 mL em 250 mL de água fresca e limpa, oferecer como água de bebida e trocar a solução a cada 24 horas. Usar diariamente. Manter escovação dentária regular.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 90,00 a R$ 154,00', rangeLabel: 'Cobasi mostrou preço cheio perto de R$ 153,90 e promoção/compra programada perto de R$ 91,90', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'dental-splash-spray-softcare',
    slug: 'dental-splash-spray',
    name: 'Dental Splash Spray',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dental',
    commercialSubclass: 'dental_plaque_supplement',
    productPageUrl: 'https://softcare.com.br/produtos/odonto/dental-splashspray/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Dental-Splash-Spray-1024x634.png',
    species: ['dog', 'cat'],
    presentations: ['Spray 100 mL'],
    activeComponents: ['dióxido de cloro estabilizado'],
    labelCompositionSummary: 'Spray bucal com dióxido de cloro estabilizado, voltado a compostos sulfurados voláteis associados à halitose.',
    labelDirections: 'Borrifar diretamente sobre dentes e gengivas conforme rótulo e necessidade.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Mau hálito leve e higiene bucal; não tratar como removedor de tártaro.',
    reassessment: 'Se halitose persistir, fazer exame oral completo.',
    prescriptionExample: 'Dental Splash Spray, borrifar diretamente sobre dentes e gengivas, 1 vez ao dia ou conforme necessidade para controle de halitose. Não enxaguar. Manter escovação regular.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 53,00 a R$ 60,00', rangeLabel: 'Amazon/Mercado Livre próximos dessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'dental-guard-suave-abrasao-softcare',
    slug: 'dental-guard-suave-abrasao',
    name: 'Dental Guard Suave Abrasão',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dental',
    commercialSubclass: 'dental_toothpaste_gel',
    productPageUrl: 'https://softcare.com.br/produtos/odonto/dental-guard-suave-abrasao/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Dental-Guard-1024x634.png',
    species: ['dog', 'cat'],
    presentations: ['Creme dental, geralmente 40 g'],
    activeComponents: ['carbonato de cálcio', 'bicarbonato de sódio', 'sílica', 'glicirrizinato dipotássico'],
    labelCompositionSummary: 'Composição publicada inclui água, carbonato de cálcio, sorbitol, glicerina, bicarbonato de sódio, sílica, glicirrizinato dipotássico, conservantes e aroma tutti-frutti.',
    labelDirections: 'Aplicar em escova ou dedeira e escovar dentes/margem gengival.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Rotina preventiva por escovação e abrasão suave.',
    reassessment: 'Reavaliar adesão; idealmente usar diariamente ou ao menos 3 vezes por semana.',
    prescriptionExample: 'Dental Guard Suave Abrasão, aplicar pequena quantidade em escova ou dedeira e escovar dentes e margem gengival 1 vez ao dia, ou no mínimo 3 vezes por semana. Não usar escova humana dura. Não enxaguar.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 27,00 a R$ 45,00', rangeLabel: 'Varia conforme produto avulso ou kit', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'dental-special-care-softcare',
    slug: 'dental-special-care',
    name: 'Dental Special Care',
    manufacturer: 'Soft Care / Pet Society',
    commercialClass: 'dental',
    commercialSubclass: 'dental_gum_support',
    productPageUrl: 'https://softcare.com.br/produtos/odonto/dental-special-care/',
    imageUrl: 'https://softcare.com.br/wp-content/uploads/2025/01/Dental-Special-Care-1024x634.png',
    species: ['dog', 'cat'],
    presentations: ['Gel bucal'],
    activeComponents: ['extrato de própolis', 'ácido hialurônico', 'glicirrizinato dipotássico'],
    labelCompositionSummary: 'Composição publicada: água, glicerina, hidroxietilcelulose, extrato de própolis, ácido hialurônico, glicirrizinato dipotássico e conservantes.',
    labelDirections: 'Aplicar fina camada na gengiva 3 a 5 vezes ao dia, massageando com dedos limpos ou escova macia.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Gengiva sensível, pós-profilaxia e suporte local; não é pasta dental convencional.',
    reassessment: 'Reavaliar inflamação gengival e dor; investigar doença periodontal se persistente.',
    prescriptionExample: 'Dental Special Care, aplicar fina camada diretamente na gengiva, 3 a 5 vezes ao dia, massageando suavemente com dedo limpo, gaze ou escova de cerdas macias, conforme orientação veterinária.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 45,00 a R$ 70,00', rangeLabel: 'Varia conforme loja', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'good-care-creme-dental-mundo-animal',
    slug: 'good-care-creme-dental',
    name: 'Good Care Creme Dental',
    manufacturer: 'Mundo Animal',
    commercialClass: 'dental',
    commercialSubclass: 'dental_toothpaste_gel',
    productPageUrl: 'https://www.mundoanimal.vet.br/',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1066825/Creme-Dental-Good-Care-Mundo-Animal-60-g.png.png?v=638725534161370000',
    species: ['dog', 'cat'],
    presentations: ['Creme dental 60 g, conforme versão'],
    activeComponents: ['sorbitol', 'componentes abrasivos/aromatizantes'],
    labelCompositionSummary: 'Fonte comercial informa creme/gel dental sem flúor e próprio para ingestão pelo pet; composição completa oficial não localizada no trecho aberto.',
    labelDirections: 'Introduzir gradualmente o hábito de escovação; usar pelo menos duas vezes por semana, idealmente diariamente.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Creme dental de escovação para rotina preventiva em cães e gatos.',
    reassessment: 'Reavaliar adesão e melhorar frequência se possível.',
    prescriptionExample: 'Good Care Creme Dental, aplicar pequena quantidade em escova ou dedeira e escovar os dentes pelo menos 2 vezes por semana, idealmente diariamente, conforme tolerância do animal. Não usar creme dental humano.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 30,00 a R$ 50,00', rangeLabel: 'Estimativa conforme varejo', sourceDate: DENTAL_PRICE_SOURCE_DATE },
    evidenceLevel: 'Fonte comercial; página oficial específica com bula completa não localizada.',
  },
  {
    id: 'good-care-haliclean-gel-mundo-animal',
    slug: 'good-care-haliclean-gel',
    name: 'Good Care Haliclean Gel',
    manufacturer: 'Mundo Animal',
    commercialClass: 'dental',
    commercialSubclass: 'dental_toothpaste_gel',
    commercialSubclasses: ['dental_toothpaste_gel', 'dental_gum_support'],
    productPageUrl: 'https://www.petlove.com.br/gel-dental-mundo-animal-good-care-haliclean-para-caes-e-gatos/p',
    imageUrl: 'https://cdn.awsli.com.br/970/970252/produto/335921877/10007230000507-1-hxcpdgvoxb.jpg',
    species: ['dog', 'cat'],
    presentations: ['Gel dental 100 g'],
    activeComponents: ['timol', 'menthol', 'chá verde', 'hexametafosfato de sódio'],
    labelCompositionSummary: 'Fontes comerciais listam timol, menthol, chá verde e hexametafosfato de sódio.',
    labelDirections: 'Aplicar 1 vez ao dia sobre superfície dentária e gengivas com dedeira/gaze; evitar água ou comida por 30 minutos; após 30 dias, manutenção 2 vezes por semana.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Gel dental de aplicação direta para higiene oral e halitose.',
    reassessment: 'Se halitose persistir ou houver cálculo, indicar avaliação odontológica.',
    prescriptionExample: 'Good Care Haliclean Gel, aplicar 1 vez ao dia sobre dentes e gengivas com gaze ou dedeira. Evitar alimento e água por 30 minutos após a aplicação. Após 30 dias, usar 2 vezes por semana para manutenção.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 50,00 a R$ 65,00', rangeLabel: 'Shopee/Mercado Livre e varejos nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
    evidenceLevel: 'Fonte comercial; imagem específica Haliclean conferida contra varejo com nome do produto.',
  },
  {
    id: 'maxiguard-oral-cleansing-gel-bioctal',
    slug: 'maxiguard-oral-cleansing-gel',
    name: 'MAXI/GUARD Oral Cleansing Gel',
    manufacturer: 'Bioctal',
    commercialClass: 'dental',
    commercialSubclass: 'dental_gum_support',
    commercialSubclasses: ['dental_gum_support', 'dental_plaque_supplement'],
    productPageUrl: 'https://www.cobasi.com.br/solucao-oral-maxi-guard-cleansing-gel-bioctal-3973939/p',
    labelUrl: 'https://vetsmart.com.br/cg/produto/4065/maxi-guard-oral-cleansing-gel',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1091577/Embalagem-e-frasco-da-Solucao-Oral-Maxi-Guard-Cleansing-Gel-Bioctal-e-frasco-de-vitamina-C.webp?v=638990052478230000',
    species: ['dog', 'cat'],
    presentations: ['118 mL, com frasco secundário de vitamina C para ativação'],
    activeComponents: ['gluconato de zinco', 'ácido ascórbico', 'taurina'],
    labelCompositionSummary: 'Composição: gluconato de zinco, ácido ascórbico, taurina, goma xantana, metilparabeno, propilparabeno, corante FD&C Blue #1 e água.',
    labelDirections: 'Misturar o frasco secundário ao principal. Aplicar nas gengivas dos molares superiores 1 vez ao dia; até 10 kg, 1 gota em cada lado; acima de 10 kg, 1 a 2 gotas em cada lado.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Higiene oral/pre e pós-profilaxia, especialmente em cães/gatos difíceis ou quando escovação é inviável.',
    reassessment: 'Reavaliar aceitação e gengivite; manter acompanhamento odontológico.',
    prescriptionExample: 'MAXI/GUARD Oral Cleansing Gel, preparar conforme rótulo misturando o frasco secundário ao frasco principal. Aplicar 1 vez ao dia nas gengivas dos molares superiores de cada lado. Até 10 kg, aplicar 1 gota em cada lado; acima de 10 kg, aplicar 1 a 2 gotas em cada lado.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 222,00 a R$ 296,00', rangeLabel: 'Cobasi listou R$ 296,50 e compra programada R$ 266,85; faixa varia por loja', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'maxiguard-orazn-bioctal',
    slug: 'maxiguard-orazn',
    name: 'MAXI/GUARD OraZn',
    manufacturer: 'Bioctal',
    commercialClass: 'dental',
    commercialSubclass: 'dental_gum_support',
    commercialSubclasses: ['dental_gum_support', 'dental_plaque_supplement'],
    productPageUrl: 'https://www.cobasi.com.br/gel-oral-maxiguard-orazn-bioctal-3973947/p',
    labelUrl: 'https://vetsmart.com.br/pr/produto/3731/maxi-guard-orazn',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1091576/Frasco-contendo-59-ml-e-embalagem-do-Gel-Oral-Maxiguard-Orazn-Bioctal.webp?v=638990088610470000',
    species: ['dog', 'cat'],
    presentations: ['Gel oral 59 mL'],
    activeComponents: ['gluconato de zinco', 'taurina'],
    labelCompositionSummary: 'Gel oral com gluconato de zinco e taurina, pH neutro.',
    labelDirections: 'Aplicar nas gengivas dos molares superiores 1 vez ao dia; até 10 kg, 1 gota em cada lado; acima de 10 kg, 1 a 2 gotas em cada lado.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Higiene oral com zinco/taurina, interessante em gato e paciente que não aceita produtos aromáticos.',
    reassessment: 'Reavaliar gengivite, halitose e necessidade de profilaxia.',
    prescriptionExample: 'MAXI/GUARD OraZn, aplicar 1 vez ao dia nas gengivas dos molares superiores de cada lado. Animais até 10 kg: 1 gota em cada lado; acima de 10 kg: 1 a 2 gotas em cada lado. Não enxaguar.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 200,00 a R$ 223,00', rangeLabel: 'Cobasi listou R$ 222,90 e compra programada R$ 200,61', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'orozyme-gel-inovet',
    slug: 'orozyme-gel',
    name: 'Orozyme Gel',
    manufacturer: 'Inovet',
    commercialClass: 'dental',
    commercialSubclass: 'dental_toothpaste_gel',
    commercialSubclasses: ['dental_toothpaste_gel', 'dental_plaque_supplement'],
    productPageUrl: 'https://ino.vet/produto/orozime/',
    labelUrl: 'https://vetsmart.com.br/CG/produto/450/orozyme',
    imageUrl: 'https://ino.vet/wp-content/uploads/2019/02/orozime-1-scaled.jpg',
    species: ['dog', 'cat'],
    presentations: ['Gel oral 70 g'],
    activeComponents: ['complexo enzimático'],
    labelCompositionSummary: 'Gel oral palatável com complexo enzimático para higiene bucodentária.',
    labelDirections: 'Administrar 1 vez ao dia: gatos/cães pequenos ~1 cm; cães até 20 kg ~2 cm; cães acima de 20 kg ~5 cm. Pode aplicar na boca, alimento ou pata dianteira em gatos.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Prevenção de placa/cálculo e mau hálito; útil em felinos difíceis.',
    reassessment: 'Se misturado ao alimento, pode reduzir contato local; reavaliar resultado e adesão.',
    prescriptionExample: 'Orozyme Gel, aplicar 1 vez ao dia. Gatos e cães pequenos: aproximadamente 1 cm de gel; cães até 20 kg: aproximadamente 2 cm; cães acima de 20 kg: aproximadamente 5 cm. Aplicar diretamente na boca, nos dentes, ou em pequena quantidade de alimento; em gatos, pode aplicar na pata dianteira para lambedura.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 140,00 a R$ 225,00', rangeLabel: 'Petfarma/Cobasi nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'aqualitus-blue-inovet',
    slug: 'aqualitus-blue',
    name: 'Aqualitus Blue',
    manufacturer: 'Inovet',
    commercialClass: 'dental',
    commercialSubclass: 'dental_water_additive',
    productPageUrl: 'https://ino.vet/produto/aqualitus/',
    labelUrl: 'https://vetsmart.com.br/cg/produto/2623/aqua-bianchi-solucao-para-higiene-bucal-de-caes-e-gatos',
    imageUrl: 'https://ino.vet/wp-content/uploads/2019/02/aqualitus-1-scaled.jpg',
    species: ['dog', 'cat'],
    presentations: ['100 mL e 250 mL, conforme varejo'],
    activeComponents: ['extrato de cúrcuma', 'eritritol', 'zinco'],
    labelCompositionSummary: 'Página Inovet cita extrato de cúrcuma, eritritol e zinco; algumas listagens comerciais variam a descrição.',
    labelDirections: 'Diluir na água de bebida; referência comercial: 1 jato do bico dosador para cada 125 mL de água, ou 4 jatos para 500 mL. Trocar a cada 24 horas.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Aditivo de água para higiene oral diária e halitose.',
    reassessment: 'Monitorar consumo de água e confirmar rótulo da versão adquirida.',
    prescriptionExample: 'Aqualitus Blue, adicionar 1 jato do bico dosador para cada 125 mL de água potável. Oferecer como água de bebida e trocar a solução a cada 24 horas. Usar diariamente.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 100,00 a R$ 131,00', rangeLabel: 'Estimativa para 250 mL em varejos', sourceDate: DENTAL_PRICE_SOURCE_DATE },
    evidenceLevel: 'Composição varia em descrições comerciais; confirmar rótulo final.',
  },
  {
    id: 'plaqueoff-animal-inovet',
    slug: 'plaqueoff-animal',
    name: 'PlaqueOff Animal',
    manufacturer: 'Inovet / ProDen',
    commercialClass: 'dental',
    commercialSubclass: 'dental_plaque_supplement',
    productPageUrl: 'https://ino.vet/produto/plaque-off/',
    imageUrl: 'https://ino.vet/wp-content/uploads/2019/02/plaque-off-1-scaled.jpg',
    species: ['dog', 'cat'],
    presentations: ['Pó 40 g'],
    activeComponents: ['alga marinha'],
    labelCompositionSummary: 'Suplemento/pó oral derivado de alga marinha para auxiliar placa, cálculo e halitose.',
    labelDirections: 'Administrar misturado ao alimento 1 vez ao dia, conforme dose do medidor/rótulo para o peso.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Auxiliar na redução de halitose, placa bacteriana e tártaro; uso diário.',
    reassessment: 'Reavaliar resultado em 4 a 8 semanas e manter escovação/profilaxia quando indicada.',
    prescriptionExample: 'PlaqueOff Animal, administrar misturado ao alimento, 1 vez ao dia, conforme dose do medidor/rótulo para o peso do paciente. Não usar em pacientes com hipertireoidismo ou em tratamento para tireoide sem avaliação veterinária.',
    safetyAlert: 'Não usar em pacientes com hipertireoidismo ou em tratamento para tireoide sem avaliação veterinária. Produto não remove cálculo estabelecido como profilaxia.',
    price: { averageLabel: 'R$ 172,00 a R$ 213,00', rangeLabel: 'Mercado Livre/Petfarma nessa faixa', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'bocahelp-pet-help',
    slug: 'bocahelp',
    name: 'BocaHelp',
    manufacturer: 'Pet Help',
    commercialClass: 'dental',
    commercialSubclass: 'dental_water_additive',
    commercialSubclasses: ['dental_water_additive', 'dental_chlorhexidine'],
    productPageUrl: 'https://www.pethelpoficial.com.br/bocahelp/',
    imageUrl: 'https://www.pethelpoficial.com.br/wp-content/uploads/2024/04/9-1-1024x1024.png',
    species: ['dog', 'cat'],
    presentations: ['Solução concentrada; rendimento anunciado até 25 L'],
    activeComponents: ['gluconato de clorexidina', 'eritritol', 'aloe vera', 'menta', 'EDTA dissódico'],
    labelCompositionSummary: 'Composição em varejo: água purificada, glicerina, sorbitol, eritritol, aloe vera, menta, gluconato de clorexidina, polissorbato 20, EDTA dissódico e conservantes.',
    labelDirections: 'Diluir na água de bebida conforme rótulo do fabricante e trocar a solução a cada 24 horas.',
    plumbsContext: DENTAL_HYGIENE_CONTEXT,
    clinicalUse: 'Aditivo/solução para halitose e suporte de higiene oral.',
    reassessment: 'Monitorar consumo hídrico e resposta; confirmar composição do lote.',
    prescriptionExample: 'BocaHelp, diluir na água de bebida conforme rótulo do fabricante, oferecer diariamente e trocar a solução a cada 24 horas. Não usar como substituto da escovação e da avaliação odontológica.',
    safetyAlert: DENTAL_HYGIENE_ALERT,
    price: { averageLabel: 'R$ 79,90', rangeLabel: 'Amazon/Shopee listaram próximo de R$ 79,90', sourceDate: DENTAL_PRICE_SOURCE_DATE },
    evidenceLevel: 'Fonte oficial promocional; composição detalhada veio de varejo.',
  },
  {
    id: 'oralguard-cepav',
    slug: 'oralguard-clindamicina',
    name: 'Oralguard',
    manufacturer: 'CEPAV / Castel Pharma',
    commercialClass: 'dental',
    commercialSubclass: 'dental_antibiotic',
    productPageUrl: 'https://cepav.com.br/produtos/oralguard/',
    labelUrl: 'https://cepav.com.br/wp-content/uploads/2018/03/ORALGUARD-50-MG-logonovo12_20180222_SGF_1127.pdf',
    imageUrl: 'https://cepav.com.br/wp-content/uploads/2021/02/Oralguard-e1615841063653.png',
    species: ['dog', 'cat'],
    presentations: ['Oralguard 50 mg com 14 comprimidos', 'Oralguard 150 mg com 14 comprimidos'],
    activeComponents: ['clindamicina 50 mg/comprimido', 'clindamicina 150 mg/comprimido'],
    labelCompositionSummary: 'Antibiótico sistêmico odontológico à base de clindamicina, apresentações de 50 mg e 150 mg.',
    labelDirections: 'Cães infecções dentárias/tecidos moles: 5 mg/kg VO a cada 12 h por 7 a 14 dias. Cães osteomielite: 10 mg/kg VO a cada 12 h por no mínimo 28 dias. Gatos: 10 a 20 mg/kg VO a cada 24 h usando Oralguard 50 mg.',
    plumbsContext: 'Clindamicina é útil contra bactérias aeróbias e anaeróbias susceptíveis em infecções dentárias, feridas, abscessos e osteomielite, mas deve acompanhar tratamento da causa.',
    clinicalUse: 'Antibiótico sistêmico para infecções dentárias, tecidos moles e osteomielite conforme espécie/apresentação.',
    reassessment: 'Reavaliar em 7 a 14 dias; em gatos, evitar comprimido seco sem água/alimento para reduzir risco esofágico.',
    prescriptionExample: 'Oralguard [50 mg ou 150 mg], administrar clindamicina 5 mg/kg por via oral, a cada 12 horas, por 7 a 14 dias em cães com infecção dentária simples. Para gatos: Oralguard 50 mg, clindamicina 10 a 20 mg/kg VO a cada 24 horas, conforme severidade e reavaliação.',
    safetyAlert: DENTAL_ANTIBIOTIC_ALERT,
    price: { averageLabel: 'R$ 79,00 a R$ 130,00', rangeLabel: '50 mg cerca de R$ 79-90; 150 mg cerca de R$ 117-130', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'stomorgyl-boehringer',
    slug: 'stomorgyl',
    name: 'Stomorgyl',
    manufacturer: 'Boehringer Ingelheim / Merial',
    commercialClass: 'dental',
    commercialSubclass: 'dental_antibiotic',
    productPageUrl: 'https://www.boehringer-ingelheim.com/br/saude-animal/produtos/stomorgyl-2',
    labelUrl: 'https://www.disprovel.com.br/uploads/produtos/Bula-Stomorgyl-2.pdf',
    imageUrl: 'https://cdn.awsli.com.br/800x800/1999/1999267/produto/114740848/3dcc2181f7.jpg',
    species: ['dog', 'cat'],
    presentations: ['Stomorgyl 2', 'Stomorgyl 10', 'Stomorgyl 20'],
    activeComponents: ['espiramicina', 'metronidazol'],
    labelCompositionSummary: 'Associação sistêmica de espiramicina + metronidazol para afecções bucodentárias.',
    labelDirections: 'Dose de bula: 75.000 UI/kg de espiramicina + 12,5 mg/kg de metronidazol VO a cada 24 h, por 5 a 10 dias, mantendo por 48 h após desaparecimento dos sintomas. Equivalências: Stomorgyl 2, 1 drágea/2 kg; Stomorgyl 10, 1 drágea/10 kg; Stomorgyl 20, 1 drágea/20 kg.',
    plumbsContext: 'Associação antibiótica para estomatites, gengivites, glossites, periodontites e piorreias. A bula recomenda associar remoção de tártaro e limpeza oral meticulosa.',
    clinicalUse: 'Antimicrobiano odontológico sistêmico quando há indicação clínica e necessidade de cobertura anaeróbia.',
    reassessment: 'Reavaliar em 5 a 10 dias; manter por 48 h após melhora conforme bula e tratar causa odontológica.',
    prescriptionExample: 'Stomorgyl [2, 10 ou 20, conforme peso], administrar por via oral, a cada 24 horas, por 5 a 10 dias. Dose de referência: 1 drágea de Stomorgyl 2 para cada 2 kg, ou 1 drágea de Stomorgyl 10 para cada 10 kg, ou 1 drágea de Stomorgyl 20 para cada 20 kg. Manter por 48 horas após melhora dos sinais, conforme bula e reavaliação.',
    safetyAlert: DENTAL_ANTIBIOTIC_ALERT,
    price: { averageLabel: 'R$ 118,00 a R$ 256,00', rangeLabel: 'Stomorgyl 2 R$ 118-132; Stomorgyl 10/20 R$ 230-256', sourceDate: DENTAL_PRICE_SOURCE_DATE },
  },
  {
    id: 'cerenia-zoetis',
    slug: 'cerenia',
    name: 'Cerenia',
    manufacturer: 'Zoetis',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    productPageUrl: 'https://www.zoetis.com.br/pesquisa-de-produtos/produtos/cerenia%C2%A0comprimidos.aspx',
    labelUrl: 'https://www.zoetis.com.br/global-assets/private/cerenia_comprimidos.pdf',
    species: ['dog'],
    presentations: ['Cerenia 16 mg', 'Cerenia 24 mg', 'Cerenia 60 mg', 'Cerenia 160 mg'],
    activeComponents: ['citrato de maropitant'],
    labelCompositionSummary: 'Maropitant 16, 24, 60 ou 160 mg por comprimido. Antiemético NK1 para cães.',
    labelDirections: 'Cães: vômito agudo 2 mg/kg VO a cada 24 h por até 5 dias. Enjoo por movimento: dose mínima de 8 mg/kg VO cerca de 2 h antes da viagem, por até 2 dias.',
    dosageGuidance: { labelDose: 'Cães: 2 mg/kg VO SID para vômito; 8 mg/kg VO antes de viagem.', plumbs: { dog: [{ title: 'Vômito agudo', dose: '2 mg/kg VO SID por até 5 dias', note: 'Dose de bula oral domiciliar.' }, { title: 'Cinetose', dose: '8 mg/kg VO 2 h antes da viagem', note: 'Não usar para mascarar vômito persistente sem diagnóstico.' }] } },
    plumbsContext: 'Maropitant é antiemético central/periférico por bloqueio NK1. Dose oral de casa para cães é maior que a dose injetável hospitalar.',
    clinicalUse: 'Vômito agudo, cinetose, gastroenterite, pancreatite como antiemético adjuvante e vômito associado a medicações.',
    reassessment: 'Reavaliar se vômito persistir, houver sangue, melena, dor abdominal, apatia, desidratação ou suspeita de corpo estranho.',
    prescriptionExample: 'Cerenia [16, 24, 60 ou 160 mg], administrar por via oral na dose calculada, a cada 24 horas, pelo período prescrito.',
    safetyAlert: 'Cautela em hepatopatas. Não trata obstrução, corpo estranho, sepse, intoxicação ou pancreatite grave sozinho.',
    price: { averageLabel: 'R$ 123 a R$ 283', rangeLabel: '24 mg/60 mg/160 mg variam conforme apresentação e varejo', sourceDate: '2026-05-28' },
    imageUrl: 'https://www.zoetis.com.br/pesquisa-de-produtos/images/caes/cerenia-comprimidos-embalagens.png'
  },
  {
    id: 'vonau-vet-avert',
    slug: 'vonau-vet',
    name: 'Vonau Vet',
    manufacturer: 'Avert',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos/vonau-vet',
    labelUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/vonau.pdf',
    species: ['dog'],
    presentations: ['Vonau Vet solução oral 5 mg/mL (30 mL)'],
    activeComponents: ['cloridrato de ondansetrona di-hidratado'],
    labelCompositionSummary: 'Ondansetrona 5 mg/mL em solução oral veterinária.',
    labelDirections: 'Cães: 0,5 a 1 mg/kg VO a cada 12 h, por até 5 dias, conforme bula/rótulo.',
    dosageGuidance: { labelDose: 'Cães: 0,5 a 1 mg/kg VO q12h por até 5 dias.', plumbs: { dog: [{ title: 'Náusea/vômito', dose: '0,5 a 1 mg/kg VO q12h', note: 'BSAVA também cita 0,5 a 1 mg/kg VO q12-24h em cães e gatos.' }] } },
    plumbsContext: 'Ondansetrona é antagonista 5-HT3 útil para náusea forte e vômito refratário; pode reduzir a efetividade do tramadol e exige cautela em hepatopatas e risco de QT.',
    clinicalUse: 'Náusea, vômito refratário ao maropitant, uremia, gastroenterite, quimioterapia e paciente nauseado sem vômito evidente.',
    reassessment: 'Monitorar constipação, salivação, apatia, piora do vômito, dor abdominal e hidratação.',
    prescriptionExample: 'Vonau Vet 5 mg/mL, administrar por via oral na dose calculada, a cada 12 horas, por até 5 dias ou conforme prescrição.',
    safetyAlert: 'Contraindicar em obstrução intestinal suspeita. Cautela em hepatopatia, arritmias, prolongamento de QT, hipocalemia/hipomagnesemia e uso com fármacos serotonérgicos ou que prolongam QT.',
    price: { averageLabel: 'R$ 76 a R$ 102', rangeLabel: 'Vonau Vet 30 mL: Petlove R$ 101,90; recorrência/promocional R$ 76,43 no trecho capturado', sourceDate: '2026-06-07' },
    imageUrl: 'https://amepettatix.vtexassets.com/arquivos/ids/188344-800-450?v=638559755954400000&width=800&height=450&aspect=true'
  },
  {
    id: 'vonau-flash-biolab',
    slug: 'vonau-flash',
    name: 'Vonau Flash',
    manufacturer: 'Biolab',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    productPageUrl: 'https://www.drogasil.com.br/vonau-flash-4mg-10-comprimidos-orodisperciveis.html',
    labelUrl: 'https://static-webv8.jet.com.br/drogaosuper/Bulas/7896241296400.pdf',
    species: ['dog', 'cat'],
    presentations: ['Vonau Flash 4 mg', 'Vonau Flash 8 mg'],
    activeComponents: ['ondansetrona'],
    labelCompositionSummary: 'Ondansetrona humana em comprimido orodispersível de 4 mg ou 8 mg.',
    labelDirections: 'Uso humano extra-bula em cães e gatos; usar dose veterinária, não a bula humana.',
    dosageGuidance: { labelDose: 'Cães e gatos: 0,1 a 1 mg/kg VO q8-12h conforme literatura.', plumbs: { dog: [{ title: 'Náusea/vômito', dose: '0,1 a 1 mg/kg VO q8-12h', note: 'Extra-bula com produto humano.' }], cat: [{ title: 'Náusea/vômito', dose: '0,1 a 1 mg/kg VO q8-12h', note: 'Extra-bula; cautela em hepatopatas e arritmias.' }] } },
    plumbsContext: 'A bula humana não orienta dose veterinária. Ondansetrona pode ser útil quando náusea persiste apesar de controle do vômito.',
    clinicalUse: 'Alternativa oral humana quando ondansetrona veterinária não está disponível.',
    reassessment: 'Reavaliar se vômito persistente, constipação, apatia ou dor abdominal.',
    prescriptionExample: 'Vonau Flash [4 mg ou 8 mg], administrar por via oral na dose calculada, a cada 8 a 12 horas, conforme prescrição.',
    safetyAlert: 'Conferir excipientes. Cautela em hepatopatia, arritmias e fármacos que prolongam QT.',
    price: { averageLabel: 'R$ 35 a R$ 47', rangeLabel: 'Vonau Flash 4 mg 10 comp. em varejo humano', sourceDate: '2026-05-28' },
    imageUrl: 'https://pfarma.com.br/images/noticias/vonau-flash-biolab-usp.jpg'
  },
  {
    id: 'nausetrat-oral-ucbvet',
    slug: 'nausetrat-oral',
    name: 'Nausetrat Oral',
    manufacturer: 'UCBVET',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_prokinetic',
    productPageUrl: 'https://ucbvet.com/produto/nausetrat-oral/',
    labelUrl: 'https://ucbvet.com/wp-content/uploads/2024/11/IS12A790-Bula-Nausetrat-Oral-Encartuchadeira-curvas.pdf',
    species: ['dog', 'cat'],
    presentations: ['Nausetrat Oral solução 20 mL'],
    activeComponents: ['cloridrato de metoclopramida'],
    labelCompositionSummary: 'Metoclopramida oral para cães e gatos.',
    labelDirections: 'Administrar por via oral. Referência de bula/página: 1 a 4 gotas/kg, equivalente a 0,1 a 0,4 mg/kg, podendo repetir conforme prescrição.',
    dosageGuidance: { labelDose: 'Cães e gatos: 0,1 a 0,4 mg/kg VO, geralmente q8h.', plumbs: { dog: [{ title: 'Procinético/antiemético', dose: '0,1 a 0,5 mg/kg VO q6-8h', note: 'Usar quando houver componente de hipomotilidade.' }], cat: [{ title: 'Procinético/antiemético', dose: '0,1 a 0,5 mg/kg VO q6-8h', note: 'Eficácia antiemética felina pode ser limitada.' }] } },
    plumbsContext: 'Metoclopramida é mais útil em hipomotilidade, refluxo/regurgitação e retardo de esvaziamento gástrico.',
    clinicalUse: 'Náusea/vômito com suspeita de estase gástrica, refluxo e gastroparesia selecionada.',
    reassessment: 'Suspender e reavaliar se houver tremores, agitação, sonolência intensa, piora do vômito ou suspeita de obstrução.',
    prescriptionExample: 'Nausetrat Oral, administrar por via oral na dose calculada, a cada 8 horas ou conforme prescrição.',
    safetyAlert: 'Contraindicado em obstrução/perfuração/hemorragia gastrointestinal e epilepsia.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado em grandes varejos', sourceDate: '2026-05-28', notes: 'Dados incompletos' },
    imageUrl: 'https://ucbvet.com/wp-content/uploads/2025/10/nausetrat-or-20.png'
  },
  {
    id: 'drasil-vansil',
    slug: 'drasil',
    name: 'Drasil',
    manufacturer: 'Vansil / Mundo Animal',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_prokinetic',
    productPageUrl: 'https://vetsmart.com.br/cg/produto/165/drasil',
    imageUrl: 'https://parse.vetsmart.com.br/parse/files/XhI4EJ09WGTwlYIT8kpQDrsVEsCjwatFNHDHQOEi/8a9188792230657486ed5acd79356355_imageInputImg.png',
    labelUrl: 'https://consultaremedios.com.br/drasil-para-caes-e-gatos/bula',
    species: ['dog', 'cat'],
    presentations: ['Drasil solução oral 4 mg/mL'],
    activeComponents: ['cloridrato de metoclopramida'],
    labelCompositionSummary: 'Metoclopramida 400 mg/100 mL, equivalente a 4 mg/mL.',
    labelDirections: 'Cães e gatos: fonte comercial descreve 1 a 2 gotas/kg VO a cada 8 horas. Converter gotas com cautela conforme frasco.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 a 2 gotas/kg q8h por bula; literatura 0,1 a 0,5 mg/kg q6-8h.', plumbs: { dog: [{ title: 'Hipomotilidade/vômito', dose: '0,1 a 0,5 mg/kg VO q6-8h', note: 'Evitar se obstrução.' }], cat: [{ title: 'Hipomotilidade/vômito', dose: '0,1 a 0,5 mg/kg VO q6-8h', note: 'Usar com cautela em gatos.' }] } },
    plumbsContext: 'Mesma lógica da metoclopramida: procinético, não antiemético universal.',
    clinicalUse: 'Procinético/antiemético domiciliar quando não há suspeita de obstrução e existe hipomotilidade.',
    reassessment: 'Monitorar sinais extrapiramidais, sedação, agitação e piora clínica.',
    prescriptionExample: 'Drasil solução oral 4 mg/mL, administrar por via oral conforme dose calculada, a cada 8 horas.',
    safetyAlert: 'Evitar em obstrução, perfuração, hemorragia GI, convulsões e uso com fenotiazínicos sem cautela.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-05-28', notes: 'Dados incompletos' }
  },
  {
    id: 'gaviz-v-agener',
    slug: 'gaviz-v',
    name: 'Gaviz V',
    manufacturer: 'Agener União',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_gastric_protector',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/gastro/gaviz-v/',
    labelUrl: 'https://agener.com.br/wp-content/uploads/2020/01/4034938-Gaviz-V.pdf',
    species: ['dog', 'cat'],
    presentations: ['Gaviz V 5 mg', 'Gaviz V 10 mg', 'Gaviz V 20 mg'],
    activeComponents: ['omeprazol'],
    labelCompositionSummary: 'Omeprazol 5, 10 ou 20 mg por comprimido.',
    labelDirections: 'Cães e gatos: aproximadamente 0,7 a 1 mg/kg VO a cada 24 h; 5 mg/5 kg, 10 mg/10 kg ou 20 mg/20 kg, por 10 a 14 dias ou conforme bula/prescrição.',
    dosageGuidance: { labelDose: 'Cães e gatos: ~1 mg/kg VO SID por bula.', plumbs: { dog: [{ title: 'Úlcera/esofagite', dose: '1 mg/kg VO SID; em casos graves pode ser BID', note: 'Não triturar pellets gastroresistentes quando aplicável.' }], cat: [{ title: 'Úlcera/esofagite', dose: '0,7 a 1 mg/kg VO SID', note: 'Usar dose de bula e reavaliar resposta.' }] } },
    plumbsContext: 'IBP mais potente que bloqueadores H2 para elevar pH gástrico; esofagite grave/úlcera ativa pode exigir BID e reavaliação.',
    clinicalUse: 'Esofagite, úlcera, gastrite erosiva, refluxo e lesão ácido-péptica.',
    reassessment: 'Retornar se melena, hematêmese, apatia intensa, dor abdominal ou vômito persistente.',
    prescriptionExample: 'Gaviz V [5, 10 ou 20 mg], administrar por via oral na dose calculada, a cada 24 horas, antes da alimentação.',
    safetyAlert: 'Interage com fármacos dependentes de pH ácido e pode afetar absorção de cetoconazol, itraconazol, ferro e outros.',
    price: { averageLabel: 'R$ 16 a R$ 184', rangeLabel: 'Varia conforme apresentação e número de comprimidos', sourceDate: '2026-05-28' },
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/novo-gaviz-1.jpg'
  },
  {
    id: 'sucrafilm-sucralfato',
    slug: 'sucrafilm-sucralfato',
    name: 'Sucrafilm / Sucralfato',
    manufacturer: 'EMS / similares humanos',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_gastric_protector',
    productPageUrl: 'https://www.drogasil.com.br/sucrafilm-1-g-30-comprimido-mastigavel.html',
    labelUrl: 'https://img.drogaraia.com.br/raiadrogasil_bula/72722.pdf',
    species: ['dog', 'cat'],
    presentations: ['Sucrafilm 1 g comprimido mastigável', 'Sucralfato suspensão 200 mg/mL conforme produto'],
    activeComponents: ['sucralfato'],
    labelCompositionSummary: 'Sucralfato humano; protetor local de mucosa.',
    labelDirections: 'Bula humana não define dose veterinária. Dissolver a fração em água e separar de outros medicamentos por pelo menos 2 horas.',
    dosageGuidance: { labelDose: 'Cães: 500 mg a 2 g por dose; gatos: 250 mg por dose, q8-12h.', plumbs: { dog: [{ title: 'Até 20 kg', dose: '500 mg/cão VO q6-8h', note: 'Dissolver em água.' }, { title: '>20 kg', dose: '1 a 2 g/cão VO q6-8h', note: 'Separar de antibióticos e outros fármacos.' }], cat: [{ title: 'Úlcera/esofagite', dose: '250 mg/gato VO q8-12h', note: 'Dissolver em água antes de administrar.' }] } },
    plumbsContext: 'Barreira local para mucosa ulcerada; reduz absorção de vários fármacos orais.',
    clinicalUse: 'Úlcera/erosão gástrica, duodenal ou esofágica, esofagite por refluxo e lesão por comprimido.',
    reassessment: 'Monitorar constipação, melena, hematêmese e apetite.',
    prescriptionExample: 'Sucralfato 1 g, dissolver a fração prescrita em pequena quantidade de água e administrar por via oral em jejum.',
    safetyAlert: 'Separar por pelo menos 2 h de fluoroquinolonas, tetraciclinas, digoxina, levotiroxina, azitromicina e outros.',
    price: { averageLabel: 'Cerca de R$ 77', rangeLabel: 'Sucrafilm 1 g 30 comprimidos', sourceDate: '2026-05-28' },
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/1207345861/sucrafilm-sucralfato-200mg-ml-suspensao-oral-200ml-e-1-seringa-dosadora-ems.jpg'
  },
  {
    id: 'famox-famotidina',
    slug: 'famox-famotidina',
    name: 'Famox / Famotidina',
    manufacturer: 'Aché / genéricos humanos',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_gastric_protector',
    productPageUrl: 'https://www.drogasil.com.br/famox-20mg-30-comprimidos.html',
    labelUrl: 'https://www.ache.com.br/wp-content/uploads/application/pdf/Bula-Famox.pdf',
    species: ['dog', 'cat'],
    presentations: ['Famox 20 mg', 'Famox 40 mg'],
    activeComponents: ['famotidina'],
    labelCompositionSummary: 'Famotidina humana 20 mg ou 40 mg por comprimido.',
    labelDirections: 'Bula humana não orienta dose veterinária; usar literatura veterinária.',
    dosageGuidance: { labelDose: 'Cães e gatos: 0,5 a 1 mg/kg VO q12-24h.', plumbs: { dog: [{ title: 'Redutor de acidez', dose: '0,5 a 1 mg/kg VO q12-24h', note: 'Menos potente que IBP.' }], cat: [{ title: 'Redutor de acidez', dose: '0,5 a 1 mg/kg VO q12-24h', note: 'Ajustar/cautela em DRC.' }] } },
    plumbsContext: 'Bloqueador H2. Pode ter tolerância com uso contínuo e menor potência que omeprazol.',
    clinicalUse: 'Gastrite/refluxo leve, alternativa quando PPI não é desejado.',
    reassessment: 'Reavaliar se vômito, melena, dor abdominal ou falta de resposta.',
    prescriptionExample: 'Famotidina [20 ou 40 mg], administrar por via oral na dose calculada, a cada 12 a 24 horas.',
    safetyAlert: 'Ajustar/cautela em DRC; separar de sucralfato quando usado junto.',
    price: { averageLabel: 'R$ 62 a R$ 107', rangeLabel: 'Famox 20/40 mg 30 comprimidos', sourceDate: '2026-05-28' },
    imageUrl: 'https://dmvfarma.vtexassets.com/arquivos/ids/245603/FAMOX-40MG-SUSP-50ML.jpg?v=638561466532030000'
  },
  {
    id: 'lactulose-lactulona-colact',
    slug: 'lactulose-lactulona-colact',
    name: 'Lactulose / Lactulona / Colact',
    manufacturer: 'Humano / manipulado',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_laxative',
    productPageUrl: 'https://www.drogasil.com.br/lactulona-xarope-ameixa-120-ml.html',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/Lactulona-Daiichi.pdf',
    species: ['dog', 'cat'],
    presentations: ['Lactulose 667 mg/mL 120 mL', 'Colact 120 mL', 'Manipulado'],
    activeComponents: ['lactulose'],
    labelCompositionSummary: 'Lactulose 667 mg/mL em xarope humano ou manipulado.',
    labelDirections: 'Bula humana não define dose veterinária; titular por efeito fecal.',
    dosageGuidance: { labelDose: 'Cães: 0,5 a 1 mL/kg q8-12h. Gatos: 0,5 a 5 mL/gato q8-12h.', plumbs: { dog: [{ title: 'Constipação / HE', dose: '0,5 a 1 mL/kg VO q8-12h', note: 'Ajustar para 2 a 3 fezes macias/dia.' }], cat: [{ title: 'Constipação / HE', dose: '0,5 a 5 mL/gato VO q8-12h', note: 'Ajustar por consistência fecal.' }] } },
    plumbsContext: 'Laxante osmótico e redutor de amônia; evitar em obstrução intestinal.',
    clinicalUse: 'Constipação, megacólon selecionado e encefalopatia hepática crônica.',
    reassessment: 'Reduzir se diarreia, cólica, distensão, desidratação ou alteração eletrolítica.',
    prescriptionExample: 'Lactulose 667 mg/mL, administrar por via oral na dose calculada, a cada 8 a 12 horas, ajustando para fezes macias.',
    safetyAlert: 'Bloquear em obstrução intestinal ou risco de perfuração. Cautela em diabéticos e desidratados.',
    price: { averageLabel: 'R$ 15 a R$ 58', rangeLabel: 'Lactulona/Colact 120 mL conforme marca', sourceDate: '2026-05-28' },
    imageUrl: 'https://product-data.raiadrogasil.io/images/13519332.webp'
  },
  {
    id: 'enterex-vetnil',
    slug: 'enterex',
    name: 'Enterex',
    manufacturer: 'Vetnil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antidiarrheal',
    productPageUrl: 'https://vetnil.com.br/produto/enterex-r-pet/',
    labelUrl: 'https://consultaremedios.com.br/enterex-uso-veterinario/bula',
    species: ['dog', 'cat'],
    presentations: ['Enterex sachê 8 g'],
    activeComponents: ['adsorvente intestinal'],
    labelCompositionSummary: 'Adsorvente oral em sachê para diluição em água.',
    labelDirections: 'Diluir 1 sachê em 40 mL de água. Diarreia/gastroenterite até 20 kg: 40 mL q8-12h. Intoxicações até 20 kg: 80 mL q4-6h até melhora clínica.',
    dosageGuidance: { labelDose: 'Até 20 kg: 40 mL q8-12h para diarreia; 80 mL q4-6h em intoxicações.', plumbs: { dog: [{ title: 'Diarreia/gastroenterite', dose: '1 sachê em 40 mL; administrar 40 mL q8-12h', note: 'Dose de bula.' }], cat: [{ title: 'Diarreia/gastroenterite', dose: '1 sachê em 40 mL; administrar 40 mL q8-12h', note: 'Dose de bula para animais até 20 kg.' }] } },
    plumbsContext: 'Produto sem monografia Plumb’s própria; seguir dose de bula como adsorvente intestinal.',
    clinicalUse: 'Diarreia aguda leve/moderada, toxinas entéricas, ingestão alimentar inadequada e suporte em intoxicação oral orientada.',
    reassessment: 'Reavaliar se vômito persistente, sangue, melena, febre, dor abdominal ou desidratação.',
    prescriptionExample: 'Enterex sachê 8 g, diluir em 40 mL de água e administrar conforme prescrição, separando de outros medicamentos.',
    safetyAlert: 'Pode reduzir absorção de outros fármacos; separar por pelo menos 2 horas.',
    price: { averageLabel: 'R$ 17 a R$ 20', rangeLabel: 'Sachê 8 g', sourceDate: '2026-05-28' },
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/enterex-r-pet.webp'
  },
  {
    id: 'florentero-act-bioctal',
    slug: 'florentero-act',
    name: 'Florentero ACT',
    manufacturer: 'Bioctal / Candioli',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_probiotic',
    productPageUrl: 'https://www.cobasi.com.br/florentero-10-comprimidos-bioctal-3857971/p',
    labelUrl: 'https://vetsmart.com.br/cg/produto/3473/florentero-act',
    species: ['dog', 'cat'],
    presentations: ['Florentero ACT comprimidos', 'Florentero pasta 12 g'],
    activeComponents: ['probióticos', 'FOS', 'MOS', 'vitaminas do complexo B', 'eletrólitos'],
    labelCompositionSummary: 'Simbiótico com cepas probióticas, prebióticos FOS/MOS, vitaminas B e eletrólitos.',
    labelDirections: 'Comprimidos: 1 comprimido/10 kg/dia, dividido em 2 administrações, por pelo menos 10 dias.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 comp/10 kg/dia dividido BID por pelo menos 10 dias.', plumbs: { dog: [{ title: 'Disbiose/diarreia leve', dose: '1 comp/10 kg/dia dividido BID', note: 'Dose de fabricante.' }], cat: [{ title: 'Disbiose/diarreia leve', dose: 'Dose proporcional por peso; dividir em 2 administrações', note: 'Usar como adjuvante.' }] } },
    plumbsContext: 'Probióticos dependem de cepa, UFC e qualidade do produto; não há dose Plumb’s universal.',
    clinicalUse: 'Diarreia leve, disbiose, pós-antibiótico, troca alimentar e suporte em enteropatia crônica.',
    reassessment: 'Reavaliar fezes, apetite, hidratação e sinais sistêmicos.',
    prescriptionExample: 'Florentero ACT, administrar por via oral conforme peso, dividindo a dose diária em duas administrações.',
    safetyAlert: 'Adjuvante; cautela em imunossupressão intensa, sepse ou barreira intestinal gravemente comprometida.',
    price: { averageLabel: 'R$ 58 a R$ 65', rangeLabel: '10 comprimidos ou pasta 12 g', sourceDate: '2026-05-28' },
    imageUrl: 'https://acdn-us.mitiendanube.com/stores/006/374/568/products/1683827141132-2ne8fc33tj-c130f0a98a625825b417606716205317-1024-1024.webp'
  },
  {
    id: 'probiotico-vetnil',
    slug: 'probiotico-vetnil',
    name: 'Probiótico Vetnil',
    manufacturer: 'Vetnil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_probiotic',
    productPageUrl: 'https://vetnil.com.br/produto/probiotico-r-vetnil-caes-e-gatos/',
    labelUrl: 'https://vetnil.com.br/produto/probiotico-r-vetnil-caes-e-gatos/',
    species: ['dog', 'cat'],
    presentations: ['Probiótico Vetnil pasta 14 g'],
    activeComponents: ['Bifidobacterium bifidum', 'Enterococcus faecium', 'Lactobacillus acidophilus', 'Lactobacillus plantarum', 'Saccharomyces cerevisiae'],
    labelCompositionSummary: 'Pasta probiótica/simbiótica com bactérias benéficas, levedura e excipientes.',
    labelDirections: 'Dose de fabricante: pequenos recém-nascidos 1 g; pequenos adultos 2 g; grandes recém-nascidos 2 g; grandes adultos 4 g.',
    dosageGuidance: { labelDose: '1 a 4 g VO SID conforme porte e idade.', plumbs: { dog: [{ title: 'Microbiota/diarreia leve', dose: '2 a 4 g VO SID conforme porte', note: 'Dose de fabricante.' }], cat: [{ title: 'Microbiota/diarreia leve', dose: '1 a 2 g VO SID conforme porte/idade', note: 'Dose de fabricante.' }] } },
    plumbsContext: 'Produto probiótico; efeito depende de cepa, UFC e qualidade. Usar como adjuvante.',
    clinicalUse: 'Diarreia leve, disbiose, pós-antibiótico, mudança alimentar e suporte intestinal.',
    reassessment: 'Reavaliar resposta fecal em 3 a 5 dias ou antes se sinais sistêmicos.',
    prescriptionExample: 'Probiótico Vetnil pasta, administrar por via oral conforme porte e idade, uma vez ao dia, por 5 a 10 dias.',
    safetyAlert: 'Não substitui tratamento de parvovirose, AHDS grave, giardíase, sepse ou desidratação.',
    price: { averageLabel: 'Cerca de R$ 67', rangeLabel: 'Pasta 14 g', sourceDate: '2026-05-28' },
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/probiotico-r-vetnil-caes-e-gatos.webp'
  },
  {
    id: 'organew-pet-vetnil',
    slug: 'organew-pet',
    name: 'Organew Pet',
    manufacturer: 'Vetnil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_probiotic',
    productPageUrl: 'https://vetnil.com.br/produto/organew-r-pet/',
    labelUrl: 'https://vetnil.com.br/produto/organew-r-pet/',
    species: ['dog', 'cat'],
    presentations: ['Organew Pet pó'],
    activeComponents: ['vitaminas', 'aminoácidos', 'FOS', 'MOS', 'leveduras vivas'],
    labelCompositionSummary: 'Suplemento nutricional/prebiótico com vitaminas, aminoácidos, FOS, MOS e leveduras.',
    labelDirections: 'Cães: 2,5 g/10 kg SID misturado ao alimento. Gatos: 1 g SID.',
    dosageGuidance: { labelDose: 'Cães: 2,5 g/10 kg SID. Gatos: 1 g SID.', plumbs: { dog: [{ title: 'Suporte digestivo', dose: '2,5 g/10 kg VO SID', note: 'Misturar ao alimento.' }], cat: [{ title: 'Suporte digestivo', dose: '1 g/gato VO SID', note: 'Misturar ao alimento.' }] } },
    plumbsContext: 'Suplemento adjuvante; não há dose Plumb’s universal para a marca.',
    clinicalUse: 'Suporte de digestibilidade, microbiota, troca alimentar e convalescença.',
    reassessment: 'Reavaliar fezes e aceitação alimentar.',
    prescriptionExample: 'Organew Pet, misturar ao alimento uma vez ao dia conforme peso/espécie.',
    safetyAlert: 'Suplemento, não tratamento único para diarreia grave ou doença sistêmica.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-05-28', notes: 'Dados incompletos' },
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/Organew_100g_site_V2.png'
  },
  {
    id: 'giardicid-cepav',
    slug: 'giardicid',
    name: 'Giardicid',
    manufacturer: 'Cepav',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiprotozoal',
    productPageUrl: 'https://cepav.com.br/produtos/giardicid/',
    labelUrl: 'https://consultaremedios.com.br/giardicid-para-caes-e-gatos-cepav/bula',
    species: ['dog', 'cat'],
    presentations: ['Giardicid suspensão 50 mL', 'Giardicid 50', 'Giardicid 500'],
    activeComponents: ['metronidazol', 'sulfadimethoxina'],
    labelCompositionSummary: 'Metronidazol + sulfadimethoxina em suspensão ou comprimidos.',
    labelDirections: 'Comprimidos: 12,5 a 25 mg/kg de cada ativo q12h por 5 dias; Giardicid 500 em cães usualmente 25 mg/kg q12h. Suspensão: cães 0,5 mL/kg q12h; gatos 0,5 a 1 mL/2 kg q12h por 5 dias.',
    dosageGuidance: { labelDose: 'Cães/gatos: q12h por 5 dias conforme apresentação.', plumbs: { dog: [{ title: 'Giardíase/protozoários', dose: '12,5 a 25 mg/kg de cada ativo VO q12h por 5 dias', note: 'Evitar uso prolongado.' }], cat: [{ title: 'Giardíase/protozoários', dose: '12,5 a 25 mg/kg de cada ativo VO q12h por 5 dias', note: 'Monitorar neurotoxicidade.' }] } },
    plumbsContext: 'Metronidazol tem risco de neurotoxicidade em doses altas/prolongadas; reduzir muito em hepatopatia importante.',
    clinicalUse: 'Giardíase, coccidiose/protozoários e infecções entéricas sensíveis quando há diagnóstico ou forte suspeita.',
    reassessment: 'Suspender e reavaliar se ataxia, tremores, nistagmo, vômitos persistentes ou apatia importante.',
    prescriptionExample: 'Giardicid [suspensão, 50 ou 500], administrar por via oral conforme peso, a cada 12 horas, por 5 dias.',
    safetyAlert: 'Não usar como antidiarreico genérico. Cautela em hepatopatas, gestantes, filhotes jovens e pacientes neurológicos.',
    price: { averageLabel: 'R$ 88 a R$ 191', rangeLabel: 'Giardicid 50/500 conforme apresentação', sourceDate: '2026-05-28' },
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/1087789/giardicid_suspensao_50ml_71_2_13642f5a6f1b02fa5d45a5edbdf77bbf.jpg'
  },
  {
    id: 'metronidazol-flagyl',
    slug: 'metronidazol-flagyl',
    name: 'Metronidazol / Flagyl',
    manufacturer: 'Humano / manipulado',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiprotozoal',
    productPageUrl: 'https://consultaremedios.com.br/flagyl-comprimido/bula',
    labelUrl: 'https://consultaremedios.com.br/flagyl-comprimido/bula',
    species: ['dog', 'cat'],
    presentations: ['Flagyl 250 mg', 'Suspensão humana conforme produto', 'Metronidazol manipulado'],
    activeComponents: ['metronidazol'],
    labelCompositionSummary: 'Nitroimidazol humano/manipulado; antibacteriano anaeróbio e antiprotozoário.',
    labelDirections: 'Bula humana não orienta dose veterinária; usar literatura e diagnóstico.',
    dosageGuidance: { labelDose: 'Cães e gatos: 7 a 15 mg/kg VO q12-24h conforme indicação.', plumbs: { dog: [{ title: 'Anaeróbios/protozoários', dose: '7 a 15 mg/kg VO q12-24h', note: 'Evitar doses altas/prolongadas.' }], cat: [{ title: 'Anaeróbios/protozoários', dose: '7 a 15 mg/kg VO q12-24h', note: 'Sabor ruim; considerar manipulado.' }] } },
    plumbsContext: 'Pode causar neurotoxicidade mesmo em doses moderadas/prolongadas; sinais incluem ataxia e nistagmo.',
    clinicalUse: 'Giardíase selecionada, anaeróbios e colite específica quando há indicação.',
    reassessment: 'Suspender se ataxia, nistagmo, tremores, convulsões, hipersalivação, apatia ou vômitos persistentes.',
    prescriptionExample: 'Metronidazol [concentração], administrar por via oral na dose calculada, pelo intervalo e duração prescritos.',
    safetyAlert: 'Não usar como remédio genérico para diarreia. Evitar/cautela em hepatopatia grave, encefalopatia hepática, gestação e pacientes neurológicos.',
    price: { averageLabel: 'Variável', rangeLabel: 'Depende de concentração, marca e manipulação', sourceDate: '2026-05-28' },
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/320696f8b/metronidazol-250-mg-c-20-comprimidos.jpg'
  },
  {
    id: 'creon-pancreatina',
    slug: 'creon-pancreatina',
    name: 'Pancreatina / Creon',
    manufacturer: 'Abbott / manipulado',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_pancreatic_enzyme',
    productPageUrl: 'https://www.drogasil.com.br/creon-25000-ui-frasco-30-capsulas.html',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/CREON.pdf',
    species: ['dog', 'cat'],
    presentations: ['Creon 10.000', 'Creon 25.000', 'Pancreatina/pancrelipase manipulada'],
    activeComponents: ['pancreatina', 'pancrelipase'],
    labelCompositionSummary: 'Enzimas pancreáticas de origem suína: lipase, protease e amilase.',
    labelDirections: 'Produto humano; dose veterinária deve ser individualizada e administrada junto a todas as refeições.',
    dosageGuidance: { labelDose: 'Cães e gatos: individualizar; administrar junto a todas as refeições.', plumbs: { dog: [{ title: 'Insuficiência pancreática exócrina', dose: 'Junto a todas as refeições; preferir pó não entérico em muitos cães', note: 'Ajustar por fezes, peso e resposta.' }], cat: [{ title: 'Insuficiência pancreática exócrina', dose: 'Junto a todas as refeições; individualizar formulação', note: 'Atenção a aceitação e risco esofágico.' }] } },
    plumbsContext: 'Produtos humanos entéricos não são diretamente intercambiáveis com pó pancreático veterinário; enzimas podem irritar boca/esôfago e vias respiratórias.',
    clinicalUse: 'Insuficiência pancreática exócrina com emagrecimento, polifagia e fezes volumosas/esteatorreicas.',
    reassessment: 'Monitorar ganho de peso, fezes, apetite e irritação oral/esofágica.',
    prescriptionExample: 'Pancreatina/pancrelipase, administrar misturada a todas as refeições, conforme dose prescrita.',
    safetyAlert: 'Contraindicado em hipersensibilidade a produtos suínos. Evitar inalar pó; lavar mãos após manipulação.',
    price: { averageLabel: 'R$ 75 a R$ 185', rangeLabel: 'Creon 10.000/25.000 conforme apresentação', sourceDate: '2026-05-28' },
    imageUrl: 'https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/96/41/96418_creon-25-000-c-30-cps-p125745_m1_638290674672574982.webp'
  },
  {
    id: 'ursacol-udca',
    slug: 'ursacol-udca',
    name: 'Ursacol / Ácido ursodesoxicólico',
    manufacturer: 'Humano',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_hepatobiliary',
    productPageUrl: 'https://www.drogasil.com.br/ursacol-300-mg-30-comprimidos.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/ursacol',
    species: ['dog', 'cat'],
    presentations: ['Ursacol 50 mg', 'Ursacol 150 mg', 'Ursacol 300 mg'],
    activeComponents: ['ácido ursodesoxicólico'],
    labelCompositionSummary: 'Ácido biliar hidrofílico humano para uso veterinário extra-bula.',
    labelDirections: 'Bula humana não orienta dose veterinária.',
    dosageGuidance: { labelDose: 'Cães e gatos: 10 a 15 mg/kg VO SID ou dividido.', plumbs: { dog: [{ title: 'Colestase/hepatobiliar', dose: '10 a 15 mg/kg VO SID', note: 'Não usar se obstrução biliar.' }], cat: [{ title: 'Colestase/hepatobiliar', dose: '10 a 15 mg/kg VO SID', note: 'Adjuvante; investigar causa.' }] } },
    plumbsContext: 'UDCA é citoprotetor/colerético em colestase sem obstrução; antiácidos com alumínio reduzem eficácia.',
    clinicalUse: 'Colestase sem obstrução, lama biliar/mucocele selecionada sem obstrução, colangite/colangio-hepatite como adjuvante.',
    reassessment: 'Reavaliar se piora de vômito, dor abdominal, icterícia ou suspeita de obstrução.',
    prescriptionExample: 'Ácido ursodesoxicólico [50, 150 ou 300 mg], administrar por via oral na dose calculada, a cada 24 horas.',
    safetyAlert: 'Bloquear se suspeita de obstrução biliar. Cautela com antiácidos contendo alumínio e ciclosporina.',
    price: { averageLabel: 'R$ 114 a R$ 225', rangeLabel: 'Ursacol 150/300 mg 30 comprimidos', sourceDate: '2026-05-28' },
    imageUrl: 'https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/92/62/92623_ursacol-50mg-c-30cpr-p122480_m1_638375493666484706.webp'
  },
  {
    id: 'hepvet-vetnil',
    slug: 'hepvet',
    name: 'Hepvet',
    manufacturer: 'Vetnil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_hepatobiliary',
    productPageUrl: 'https://vetnil.com.br/produto/hepvet-r/',
    labelUrl: 'https://vetnil.com.br/produto/hepvet-r/',
    species: ['dog', 'cat'],
    presentations: ['Hepvet comprimidos/mastigáveis', 'Hepvet suspensão 60 mL'],
    activeComponents: ['arginina', 'cisteína', 'colina', 'silimarina', 'taurina', 'vitaminas B', 'zinco', 'selênio'],
    labelCompositionSummary: 'Suplemento hepatoprotetor/metabólico com aminoácidos, colina, silimarina, vitaminas e minerais.',
    labelDirections: 'Comprimidos: cães 1 comp/10 kg/dia; gatos filhotes 1/4 comp/dia; gatos adultos 1/2 comp/dia. Suspensão: cães e gatos 0,2 mL/kg/dia.',
    dosageGuidance: { labelDose: 'Cães: 1 comp/10 kg SID ou 0,2 mL/kg SID. Gatos: 1/4 a 1/2 comp SID ou 0,2 mL/kg SID.', plumbs: { dog: [{ title: 'Suporte hepático', dose: '1 comp/10 kg SID ou 0,2 mL/kg SID', note: 'Dose de fabricante.' }], cat: [{ title: 'Suporte hepático', dose: 'Filhote 1/4 comp; adulto 1/2 comp SID; ou 0,2 mL/kg SID', note: 'Dose de fabricante.' }] } },
    plumbsContext: 'Produto sem dose Plumb’s própria; antioxidantes/hepatoprotetores são adjuvantes e não substituem diagnóstico.',
    clinicalUse: 'Suporte em hepatopatias leves/moderadas, colestase em conjunto com tratamento principal e convalescença.',
    reassessment: 'Reavaliar enzimas, apetite, vômito, icterícia, dor abdominal e coagulopatia conforme caso.',
    prescriptionExample: 'Hepvet [comprimido ou suspensão], administrar por via oral conforme peso e apresentação, uma vez ao dia.',
    safetyAlert: 'Não manejar icterícia, vômito persistente, dor abdominal ou suspeita de obstrução só com hepatoprotetor.',
    price: { averageLabel: 'R$ 104 a R$ 138', rangeLabel: 'Suspensão 60 mL; comprimidos cerca de R$ 127', sourceDate: '2026-05-28' },
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/hepvet-r_63e664a52d752.webp'
  },
  {
    id: 'hep-same-pet-tabs-soft-care',
    slug: 'hep-same-pet-tabs',
    name: 'HEP SAMe Pet Tabs',
    manufacturer: 'Soft Care',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_hepatobiliary',
    productPageUrl: 'https://softcare.com.br/produtos/nutri/hep-same-pet-tabs/',
    labelUrl: 'https://softcare.com.br/produtos/nutri/hep-same-pet-tabs/',
    species: ['dog', 'cat'],
    presentations: ['HEP SAMe Pet Tabs'],
    activeComponents: ['SAMe', 'silimarina', 'vitamina E'],
    labelCompositionSummary: 'Suplemento hepatoprotetor/antioxidante com SAMe, silimarina e vitamina E.',
    labelDirections: 'Cães e gatos: 1 tablete para cada 10 kg SID, idealmente 1 h antes do alimento ou 2 h após.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 tablete/10 kg VO SID em jejum.', plumbs: { dog: [{ title: 'Suporte hepático', dose: '1 tablete/10 kg VO SID', note: 'Dose de fabricante.' }], cat: [{ title: 'Suporte hepático', dose: '1 tablete/10 kg VO SID', note: 'Dose de fabricante; ajustar aceitação.' }] } },
    plumbsContext: 'SAMe e antioxidantes são adjuvantes hepatobiliares; tratar causa de base.',
    clinicalUse: 'Suporte antioxidante em hepatopatias, colestase/hepatite e elevação de enzimas com plano diagnóstico.',
    reassessment: 'Reavaliar enzimas, icterícia, vômito, apetite e adesão.',
    prescriptionExample: 'HEP SAMe Pet Tabs, administrar 1 tablete para cada 10 kg, uma vez ao dia, preferencialmente em jejum.',
    safetyAlert: 'Suplemento, não substitui investigação de vômito persistente, icterícia, coagulopatia ou obstrução biliar.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-05-28', notes: 'Dados incompletos' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1095021/Soft-Care-Hep-Same-Pet-Tabs.webp?v=639013955217900000'
  },
  {
    id: 'mirtz-agener',
    slug: 'mirtz',
    name: 'Mirtz',
    manufacturer: 'Agener União',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_orexigenic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/mirtz/',
    labelUrl: 'https://consultaremedios.com.br/mirtz-para-gatos-agener-uniao/bula',
    species: ['cat'],
    presentations: ['Mirtz 2 mg (12 comprimidos)'],
    activeComponents: ['mirtazapina'],
    labelCompositionSummary: 'Mirtazapina 2 mg por comprimido para gatos.',
    labelDirections: 'Gatos: 1 comprimido VO a cada 48 horas, por até 3 semanas ou conforme critério veterinário.',
    dosageGuidance: { labelDose: 'Gatos: 2 mg/gato VO q48h por até 3 semanas.', plumbs: { cat: [{ title: 'Hiporexia/anorexia', dose: '2 mg/gato VO q48h', note: 'Apresentação felina evita superdosagem de comprimidos humanos.' }] } },
    plumbsContext: 'Mirtazapina é orexígena e pode auxiliar náusea; gatos modernos usam doses menores/intervalos maiores que protocolos antigos, especialmente em DRC/hepatopatia.',
    clinicalUse: 'Gato hiporéxico/anoréxico após controlar náusea, dor, desidratação e causa primária.',
    reassessment: 'Monitorar vocalização, agitação, tremores, taquicardia, vômitos, salivação e comportamento.',
    prescriptionExample: 'Mirtz 2 mg, administrar 1 comprimido por via oral a cada 48 horas, por até 3 semanas ou conforme prescrição.',
    safetyAlert: 'Não usar como atalho em gato instável, desidratado, obstruído ou com dor/náusea sem controle. Cautela em hepatopatas, nefropatas e serotonérgicos.',
    price: { averageLabel: 'R$ 74 a R$ 120', rangeLabel: 'Mirtz 2 mg 12 comprimidos', sourceDate: '2026-05-28' },
    imageUrl: 'https://www.petlove.com.br/images/products/251641/product/Orex%C3%ADgeno_Mirtz_Mirtazapina_Agener_Uni%C3%A3o_para_Gatos_-_12_Comprimidos.jpg?1770885088'
  },
  {
    id: 'vetmedin-boehringer',
    slug: 'vetmedin-pimobendan',
    name: 'Vetmedin',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_inotrope',
    productPageUrl: 'https://www.boehringer-ingelheim.com/br/saude-animal/produtos/vetmedin',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/Bula-Vetmedin-para-Caes-Boehringer-Ingelheim-Consulta-Remedios.pdf',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/282235/Vetmedin-Boehringer-Ingelheim-50-comprimidos-125mg.jpg?v=638127636716930000',
    species: ['dog'],
    presentations: ['1,25 mg, 50 comprimidos mastigáveis', '5 mg, 50 comprimidos mastigáveis'],
    activeComponents: ['pimobendan 1,25 mg/comprimido', 'pimobendan 5 mg/comprimido'],
    labelCompositionSummary: 'Comprimidos mastigáveis sulcados para cães contendo pimobendan 1,25 mg ou 5 mg por comprimido.',
    labelDirections: 'Plumb’s: cães com ICC por DCM/DMVM, 0,5 mg/kg/dia VO dividido em 2 administrações, arredondando para a apresentação mais próxima; em B2/DMVM, estudos usam 0,4 a 0,6 mg/kg/dia dividido a cada 12 h. Em gatos, uso extra-bula e seletivo, geralmente associado a furosemida e/ou IECA quando indicado.',
    dosageGuidance: {
      labelDose: 'Cães: 0,5 mg/kg/dia VO, dividido em 2 administrações, preferencialmente cerca de 1 hora antes do alimento.',
      plumbs: {
        dog: [
          { title: 'ICC por DCM/DMVM', dose: '0,5 mg/kg/dia VO dividido a cada 12 h', note: 'Arredondar para a apresentação mais próxima.' },
          { title: 'DMVM estágio B2', dose: '0,4 a 0,6 mg/kg/dia VO dividido a cada 12 h', note: 'Faixa usada em estudos como EPIC.' },
        ],
      },
    },
    plumbsContext: CARDIOLOGY_CONTEXT,
    clinicalUse: 'Fármaco central em cães com DMVM estágio B2 com cardiomegalia e em ICC por DMVM ou cardiomiopatia dilatada. Não usar como tônico cardíaco sem diagnóstico.',
    reassessment: 'Monitorar frequência respiratória em repouso, tosse, disposição, apetite, pressão arterial, função renal, eletrólitos e evolução ecocardiográfica conforme cardiologia.',
    prescriptionExample: 'Vetmedin [1,25 mg ou 5 mg], administrar por via oral, na dose calculada pelo peso, a cada 12 horas, preferencialmente cerca de 1 hora antes da alimentação, uso contínuo conforme acompanhamento cardiológico.',
    safetyAlert: 'Evitar em cardiomiopatia hipertrófica obstrutiva, estenose aórtica importante, hipotensão grave ou ausência de diagnóstico cardíaco. Em gatos é extra-bula e exige seleção criteriosa.',
    price: { averageLabel: 'R$ 185,00 a R$ 490,00', rangeLabel: '1,25 mg cerca de R$ 154-219; 5 mg cerca de R$ 431-567', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'cardalis-ceva',
    slug: 'cardalis',
    name: 'Cardalis',
    manufacturer: 'Ceva',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    commercialSubclasses: ['cardio_raas_aldosterone', 'cardio_antihypertensive'],
    productPageUrl: 'https://www.ceva.pt/Produtos/Lista-de-Produtos/CARDALIS',
    labelUrl: 'https://www.ceva.com.br/content/download/2825/file/Bula%20-%20Cardalis.pdf?version=1',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/209023/Cardalis-para-Caes-de-5-a-10kg-Ceva-30-comprimidos.jpg?v=638143142880900000',
    species: ['dog'],
    presentations: ['2,5 mg/20 mg para 5 a 10 kg', '5 mg/40 mg para 10 a 20 kg', '10 mg/80 mg para 20 a 40 kg'],
    activeComponents: ['cloridrato de benazepril', 'espironolactona'],
    labelCompositionSummary: 'Associação fixa: benazepril 2,5/5/10 mg + espironolactona 20/40/80 mg por comprimido, conforme apresentação.',
    labelDirections: 'Plumb’s: Cardalis em cães com ICC por AVVI/DMVM, espironolactona 2 mg/kg + benazepril 0,25 mg/kg VO a cada 24 h. Administrar com alimento e monitorar função renal, eletrólitos e pressão.',
    dosageGuidance: {
      labelDose: 'Cães: espironolactona 2 mg/kg + benazepril 0,25 mg/kg VO a cada 24 h, junto ao alimento.',
      plumbs: {
        dog: [
          { title: 'ICC por AVVI/DMVM', dose: 'espironolactona 2 mg/kg + benazepril 0,25 mg/kg VO SID', note: 'Dose da associação fixa Cardalis.' },
        ],
      },
      notes: ['Monitorar pressão arterial, creatinina, ureia e eletrólitos, principalmente potássio.'],
    },
    plumbsContext: CARDIOLOGY_CONTEXT,
    clinicalUse: 'ICC por doença degenerativa crônica valvular em cães quando a associação IECA + espironolactona é desejada, com suporte diurético conforme necessário.',
    reassessment: 'Reavaliar ureia, creatinina, potássio, sódio, pressão arterial, apetite, vômitos, diarreia, letargia e frequência respiratória em repouso.',
    prescriptionExample: 'Cardalis [apresentação conforme peso], administrar [1/2 ou 1 comprimido] por via oral a cada 24 horas, junto ao alimento, uso contínuo conforme acompanhamento cardiológico.',
    safetyAlert: CARDIO_RENAL_MONITORING_ALERT,
    price: { averageLabel: 'R$ 175,00 a R$ 300,00', rangeLabel: '2,5/20 mg cerca de R$ 132,90-205,99; 5/40 mg cerca de R$ 284,69-316,32', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'upcard-vetoquinol',
    slug: 'upcard-torasemida',
    name: 'UpCard',
    manufacturer: 'Vetoquinol',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_loop_diuretic',
    productPageUrl: 'https://www.vetoquinol.com.br/products/upcard',
    labelUrl: 'https://www.vetoquinol.com/sites/brcountry/files/guia-upcard.pdf',
    imageUrl: 'https://www.albet.es/cdnassets/UpCard-075-mg-30-comp-Vetoquinol_l.png',
    species: ['dog'],
    presentations: ['0,75 mg, 30 comprimidos', '3 mg, 30 comprimidos', '7,5 mg, 100 comprimidos', '18 mg, conforme RCM europeu'],
    activeComponents: ['torasemida 0,75 mg/comprimido', 'torasemida 3 mg/comprimido', 'torasemida 7,5 mg/comprimido', 'torasemida 18 mg/comprimido'],
    labelCompositionSummary: 'Diurético de alça oral à base de torasemida, comprimidos palatáveis divisíveis conforme apresentação.',
    labelDirections: 'Plumb’s: cães/gatos, dose inicial 0,1 a 0,3 mg/kg VO a cada 24 h. Ao substituir furosemida, iniciar com cerca de 5% a 10% da dose diária total de furosemida, pois torasemida é aproximadamente 10 a 20 vezes mais potente.',
    dosageGuidance: {
      labelDose: 'Cães: seguir bula/apresentação veterinária e titular pela resposta congestiva; confirmar apresentação disponível antes de prescrever.',
      plumbs: {
        dog: [
          { title: 'Dose inicial', dose: '0,1 a 0,3 mg/kg VO SID', note: 'Útil especialmente quando a resposta à furosemida é insuficiente.' },
          { title: 'Troca da furosemida', dose: '5% a 10% da dose diária total de furosemida', note: 'Torasemida é cerca de 10 a 20 vezes mais potente.' },
        ],
      },
    },
    plumbsContext: CARDIOLOGY_CONTEXT,
    clinicalUse: 'Controle de sinais congestivos, edema e derrame relacionados à ICC em cães; útil em congestão refratária ou substituição planejada de furosemida.',
    reassessment: 'Reavaliar desde 24-48 h após início ou ajuste de dose quando possível: hidratação, pressão arterial, ureia, creatinina, eletrólitos, apetite, vômitos e diarreia.',
    prescriptionExample: 'UpCard [0,75 mg, 3 mg ou 7,5 mg], administrar por via oral na dose calculada pelo peso, a cada 24 horas, conforme prescrição. Usar a menor dose eficaz para manter conforto respiratório e controle de congestão.',
    safetyAlert: 'Não associar automaticamente a outro diurético de alça. Evitar em insuficiência renal grave, anúria, desidratação grave, hipovolemia, hipotensão ou distúrbio eletrolítico não corrigido.',
    price: { averageLabel: 'R$ 100,00 a R$ 180,00', rangeLabel: 'Faixa inicial para 0,75 a 3 mg; preço brasileiro com confiança moderada/baixa', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'furolisin-vetnil',
    slug: 'furolisin-furosemida',
    name: 'Furolisin',
    manufacturer: 'Vetnil',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_loop_diuretic',
    productPageUrl: 'https://vetnil.com.br/produto/furolisin-r/',
    labelUrl: 'https://consultaremedios.com.br/furolisin-para-caes-e-gatos-vetnil/bula',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/pack_furolisin_individual_site_V2.png',
    species: ['dog', 'cat'],
    presentations: ['10 mg/comprimido', '20 mg/comprimido', '40 mg/comprimido', '80 mg/comprimido'],
    activeComponents: ['furosemida'],
    labelCompositionSummary: 'A página oficial informa furosemida 10 g/100 g; apresentações equivalentes a 10, 20, 40 e 80 mg por comprimido conforme peso do comprimido.',
    labelDirections: 'Plumb’s: cães, edema/ICC 2,2 a 5,5 mg/kg VO, IV ou IM 1 a 2 vezes ao dia, ajustando resposta; edema cardiogênico grave 1 a 3 mg/kg IV/IM/SC, repetir a cada 1 a 2 h até melhorar respiração e reduzir fortemente depois. Gatos em CHF oral variam muito: menor dose eficaz, de 1 mg/kg VO a cada 2 a 3 dias até 2 mg/kg VO a cada 8 a 12 h na maioria dos casos.',
    dosageGuidance: {
      labelDose: 'Cães e gatos: bula veterinária varia por apresentação; usar a menor dose eficaz e titular conforme congestão, hidratação e eletrólitos.',
      plumbs: {
        dog: [
          { title: 'Edema / ICC', dose: '2,2 a 5,5 mg/kg VO, IV ou IM 1 a 2x/dia', note: 'Ajustar à resposta do paciente.' },
          { title: 'Edema cardiogênico grave', dose: '1 a 3 mg/kg IV/IM/SC; repetir a cada 1 a 2 h', note: 'Reduzir fortemente quando a respiração começar a melhorar.' },
        ],
        cat: [
          { title: 'CHF oral', dose: '1 mg/kg VO a cada 2 a 3 dias até 2 mg/kg VO a cada 8 a 12 h', note: 'A maioria fica dentro desse intervalo; buscar menor dose eficaz.' },
        ],
      },
    },
    plumbsContext: CARDIOLOGY_CONTEXT,
    clinicalUse: 'Base do controle de congestão cardiogênica, edema pulmonar cardiogênico e derrame/congestão por ICC. Não trata a valva nem fortalece o coração.',
    reassessment: 'Monitorar frequência respiratória em repouso, tosse, cansaço, apetite, ingestão hídrica, urina, hidratação, ureia, creatinina, potássio, sódio e cloro.',
    prescriptionExample: 'Furolisin [10 mg, 20 mg, 40 mg ou 80 mg], administrar por via oral na dose calculada pelo peso, conforme frequência prescrita, para controle de congestão.',
    safetyAlert: CARDIO_DIURETIC_ALERT,
    price: { averageLabel: 'Dados veterinários incompletos', rangeLabel: 'Preço de Furolisin online não ficou estável; furosemida humana 40 mg costuma ser barata, mas não é a apresentação veterinária', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'semintra-boehringer',
    slug: 'semintra-telmisartana',
    name: 'Semintra',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    commercialSubclasses: ['cardio_raas_aldosterone', 'cardio_antihypertensive'],
    productPageUrl: 'https://www.boehringer-ingelheim.com/br/saude-animal/produtos/semintra',
    labelUrl: 'https://www.boehringer-ingelheim.com/br/pdf/semintra-4mgpdf',
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1071662/Semintra-Solucao-Oral-para-Gatos-30ml.webp.webp?v=638926913454170000',
    species: ['cat'],
    presentations: ['Solução oral 4 mg/mL, frasco 30 mL com seringa dosadora'],
    activeComponents: ['telmisartana 4 mg/mL'],
    labelCompositionSummary: 'Solução oral para gatos contendo telmisartana 4 mg/mL.',
    labelDirections: 'Plumb’s: gatos hipertensos, 1,5 mg/kg VO a cada 12 h por 14 dias, depois 2 mg/kg VO a cada 24 h, reduzindo em incrementos de 0,5 mg/kg se houver hipotensão; proteinúria por DRC em gatos, 1 mg/kg VO a cada 24 h. Cães com proteinúria/hipertensão: 1 mg/kg VO a cada 24 h, podendo titular até 3 mg/kg SID em proteinúria persistente.',
    dosageGuidance: {
      labelDose: 'Semintra 4 mg/mL: dose conforme indicação registrada/local; medir com seringa dosadora e agitar antes do uso.',
      plumbs: {
        cat: [
          { title: 'Hipertensão sistêmica', dose: '1,5 mg/kg VO BID por 14 dias; depois 2 mg/kg VO SID', note: 'Reduzir em 0,5 mg/kg se houver hipotensão.' },
          { title: 'Proteinúria por DRC', dose: '1 mg/kg VO SID', note: 'Pode administrar direto na boca ou sobre pequena quantidade de alimento.' },
        ],
      },
    },
    plumbsContext: 'ARB para redução de proteinúria associada à DRC em gatos e interface cardiorrenal. Não é cardiotônico; em hipertensão clinicamente relevante, amlodipina costuma ser primeira linha.',
    clinicalUse: 'Gatos com DRC/proteinúria e cenários cardiorrenais selecionados, com monitoramento de pressão e função renal.',
    reassessment: 'Monitorar pressão arterial, apetite, peso, hidratação, ureia, creatinina, potássio e relação proteína:creatinina urinária.',
    prescriptionExample: 'Semintra 4 mg/mL, administrar por via oral na dose calculada pelo peso, a cada 24 horas, conforme prescrição. Agitar antes do uso e medir com seringa dosadora.',
    safetyAlert: CARDIO_RENAL_MONITORING_ALERT,
    price: { averageLabel: 'R$ 260,00 a R$ 285,00', rangeLabel: 'Frasco 30 mL; Petlove/Cobasi em torno de R$ 242-302 conforme promoção', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'benazepril-manipulado',
    slug: 'benazepril',
    name: 'Benazepril manipulado ou humano',
    manufacturer: 'Manipulado / uso humano',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    commercialSubclasses: ['cardio_raas_aldosterone', 'cardio_antihypertensive'],
    productPageUrl: 'https://vetsmart.com.br/cg/produto/1916/benazepril',
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/935384/benazepril_5mg_1_20250912122644_4b94b778ed53.png',
    species: ['dog', 'cat'],
    presentations: ['Cápsula/comprimido 5 mg', 'Cápsula/comprimido 10 mg', 'Suspensão manipulada com concentração variável'],
    activeComponents: ['cloridrato de benazepril'],
    labelCompositionSummary: 'IECA de uso humano ou manipulado veterinário; concentração varia conforme farmácia/prescrição.',
    labelDirections: 'Plumb’s: cães, iniciar 0,25 a 0,5 mg/kg VO a cada 24 h; em ICC pode ser usado com furosemida, pimobendan e espironolactona, e alguns casos usam divisão a cada 12 h. Proteinúria em cães: 0,5 mg/kg VO SID, titulando conforme UPC até cerca de 2 mg/kg/dia. Gatos hipertensos/proteinúricos: pode ser adjuvante, incluindo 0,5 mg/kg VO a cada 12 h quando amlodipina isolada não controla ou há proteinúria.',
    dosageGuidance: {
      labelDose: 'Sem bula veterinária brasileira única para manipulado/uso humano; prescrever como uso extra-bula, ajustado por indicação e monitoramento.',
      plumbs: {
        dog: [
          { title: 'Início / cardiologia', dose: '0,25 a 0,5 mg/kg VO SID', note: 'Em ICC pode compor terapia com furosemida, pimobendan e espironolactona.' },
          { title: 'Proteinúria', dose: '0,5 mg/kg VO SID; titular até cerca de 2 mg/kg/dia', note: 'Titulando conforme UPC; dose diária pode ser dividida a cada 12 h.' },
        ],
        cat: [
          { title: 'Hipertensão/proteinúria adjuvante', dose: '0,5 mg/kg VO a cada 12 h', note: 'Quando amlodipina isolada não controla ou há proteinúria concorrente.' },
        ],
      },
    },
    plumbsContext: CARDIOLOGY_CONTEXT,
    clinicalUse: 'Adjuvante em ICC em cães, proteinúria/glomerulopatia, hipertensão sistêmica como terapia combinada e DRC/proteinúria em gatos selecionados.',
    reassessment: 'Checar pressão arterial, ureia, creatinina e potássio após início e ajustes, especialmente se houver diurético, espironolactona ou ARB.',
    prescriptionExample: 'Benazepril [concentração], administrar por via oral na dose calculada pelo peso, a cada 24 horas ou conforme prescrição, com monitoramento de pressão arterial, ureia, creatinina e potássio.',
    safetyAlert: CARDIO_RENAL_MONITORING_ALERT,
    price: { averageLabel: 'Variável', rangeLabel: 'Manipulado varia por concentração, forma farmacêutica e farmácia; não usar média automática sem cotação local', sourceDate: CARDIO_PRICE_SOURCE_DATE },
    evidenceLevel: 'Produto manipulado/uso humano; imagem ilustrativa CC0 de benazepril veterinário 5 mg, não de marca brasileira industrial.',
  },
  {
    id: 'anlodipino-humano-manipulado',
    slug: 'anlodipino-amlodipina',
    name: 'Anlodipino / Amlodipina',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_antihypertensive',
    productPageUrl: 'https://www.drogaraia.com.br/besilato-de-anlodipino-5-mg-medley-generico-30-comprimidos.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/anlodipino',
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/222173764/pressat-2-5-mg-c-30-comprimidos.jpg',
    species: ['dog', 'cat'],
    presentations: ['Genérico humano 5 mg', 'Pressat 2,5 mg', 'Manipulado veterinário com concentração variável'],
    activeComponents: ['besilato de anlodipino / amlodipina'],
    labelCompositionSummary: 'Bloqueador de canal de cálcio diidropiridínico; apresentações humanas comuns de 2,5 mg e 5 mg, além de manipulado para doses pequenas.',
    labelDirections: 'Plumb’s: cães hipertensos, 0,1 a 0,25 mg/kg VO a cada 24 h, iniciando no limite baixo; emergência hipertensiva 0,2 a 0,4 mg/kg VO a cada 24 h, podendo chegar a 0,6 mg/kg com monitoramento. Gatos hipertensos: iniciar 0,625 mg/gato VO SID; usual 0,625 a 1,25 mg/gato SID, podendo aumentar até 2,5 mg/gato SID se PA seguir elevada.',
    dosageGuidance: {
      labelDose: 'Sem dose veterinária em bula humana; uso veterinário extra-bula. Formular/manipular quando o comprimido humano não permitir dose segura.',
      plumbs: {
        dog: [
          { title: 'Hipertensão sistêmica', dose: '0,1 a 0,25 mg/kg VO SID', note: 'Iniciar no limite baixo; geralmente após IECA.' },
          { title: 'Emergência hipertensiva', dose: '0,2 a 0,4 mg/kg VO SID', note: 'Pode chegar a 0,6 mg/kg com monitoramento rigoroso.' },
        ],
        cat: [
          { title: 'Hipertensão sistêmica', dose: '0,625 mg/gato VO SID para iniciar', note: 'Usual 0,625 a 1,25 mg/gato SID.' },
          { title: 'Titulação', dose: 'até 2,5 mg/gato VO SID', note: 'Se PA permanecer elevada e adesão estiver confirmada.' },
        ],
      },
    },
    plumbsContext: 'Anti-hipertensivo arterial, frequentemente primeira escolha em hipertensão sistêmica felina, especialmente com lesão de órgão-alvo.',
    clinicalUse: 'Hipertensão sistêmica em gatos e cães, com maior uso prático em gatos hipertensos.',
    reassessment: 'Reavaliar pressão arterial em 7 a 14 dias ou antes se houver apatia, fraqueza, síncope, anorexia ou sinais de hipotensão.',
    prescriptionExample: 'Anlodipino [2,5 mg, 5 mg ou manipulado], administrar por via oral na dose prescrita, a cada 24 horas, para controle da pressão arterial. Reavaliar pressão arterial em 7 a 14 dias.',
    safetyAlert: 'Cuidado com hipotensão, especialmente associado a telmisartana, IECA, diurético ou beta-bloqueador. Pode causar letargia, ataxia, edema periférico e hiperplasia gengival.',
    price: { averageLabel: 'R$ 9,00 a R$ 39,00', rangeLabel: 'Genérico 5 mg 30 comprimidos cerca de R$ 8,79-9,55; Pressat 2,5 mg cerca de R$ 37,79-38,99', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'clopidogrel-humano-manipulado',
    slug: 'clopidogrel',
    name: 'Clopidogrel',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_antithrombotic',
    productPageUrl: 'https://www.drogariasaopaulo.com.br/bissulfato-de-clopidogrel-75mg-generico-medley-28-comprimidos/p',
    labelUrl: 'https://www.drogaraia.com.br/bulas/clopidogrel',
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/webp/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/585554d47/bissulfato-de-clopidogrel-75mg-com-28-comprimidos-generico-nova-quimica_jpg.webp',
    species: ['dog', 'cat'],
    presentations: ['Genérico humano 75 mg/comprimido', 'Plavix 75 mg/comprimido', 'Manipulado veterinário com concentração variável'],
    activeComponents: ['bissulfato de clopidogrel 75 mg/comprimido'],
    labelCompositionSummary: 'Antiagregante plaquetário P2Y12, apresentação humana comum de 75 mg; em gatos geralmente exige fracionamento ou manipulação.',
    labelDirections: 'Plumb’s: cães antiagregante, 1 a 4 mg/kg VO a cada 24 h; pode considerar dose de ataque de 4 a 10 mg/kg no primeiro dia. Gatos com ATE: ataque 37,5 a 75 mg/gato VO uma vez após diagnóstico; manutenção 18,75 mg/gato VO a cada 24 h. Sabor muito amargo, considerar cápsula gelatinosa.',
    dosageGuidance: {
      labelDose: 'Sem dose veterinária em bula humana; uso extra-bula como antiagregante. Em gatos, fracionar/manipular para evitar erro de dose.',
      plumbs: {
        dog: [
          { title: 'Antiagregante', dose: '1 a 4 mg/kg VO SID', note: 'Pode considerar ataque de 4 a 10 mg/kg no primeiro dia.' },
        ],
        cat: [
          { title: 'ATE - ataque', dose: '37,5 a 75 mg/gato VO uma vez', note: 'Após diagnóstico, conforme avaliação clínica.' },
          { title: 'Manutenção', dose: '18,75 mg/gato VO SID', note: 'Equivale a 1/4 de comprimido de 75 mg; sabor muito amargo.' },
        ],
      },
    },
    plumbsContext: 'Pode reduzir recorrência de tromboembolismo arterial cardiogênico em gatos; evidência prática favorece clopidogrel sobre aspirina em prevenção secundária de ATE felino.',
    clinicalUse: 'Prevenção secundária de tromboembolismo arterial em gatos cardiopatas, especialmente após ATE; uso em cães conforme risco trombótico específico.',
    reassessment: 'Observar vômitos, inapetência, sangramentos, melena, hematúria, equimoses e necessidade de pausa antes de cirurgia.',
    prescriptionExample: 'Clopidogrel 75 mg, administrar 1/4 de comprimido por via oral a cada 24 horas, uso contínuo conforme acompanhamento cardiológico. Observar sinais de sangramento.',
    safetyAlert: 'Não usar em sangramento ativo, alto risco hemorrágico, doença de Von Willebrand, trombocitopenia grave sem avaliação, úlcera gastrointestinal ativa ou cirurgia iminente sem planejamento.',
    price: { averageLabel: 'R$ 40,00 a R$ 87,00', rangeLabel: 'Genéricos 75 mg variam conforme laboratório e quantidade; 14-28 comprimidos em varejo online', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'sildenafila-humano-manipulado',
    slug: 'sildenafila',
    name: 'Sildenafila',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_pulmonary_vasodilator',
    productPageUrl: 'https://www.drogariasaopaulo.com.br/citrato-de-sildenafilna-generico-25mg-ems-4-capsulas/p',
    labelUrl: 'https://consultaremedios.com.br/citrato-de-sildenafila/bula',
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/webp/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/751863340/citrato-de-sildenafila-25mg-generico-4-comprimidos-revestidos_jpg.webp',
    species: ['dog', 'cat'],
    presentations: ['Genérico humano 25 mg', 'Genérico humano 50 mg', 'Genérico humano 100 mg', 'Manipulado com concentração variável'],
    activeComponents: ['citrato de sildenafila'],
    labelCompositionSummary: 'Inibidor de fosfodiesterase tipo 5, vasodilatador pulmonar; apresentações humanas comuns 25, 50 e 100 mg.',
    labelDirections: 'Plumb’s: cães com hipertensão pulmonar, iniciar 0,5 a 1 mg/kg VO a cada 8 h e titular conforme sinais clínicos até 3 mg/kg VO a cada 8 h. Gatos: evidência limitada a casos selecionados, com relato de 0,25 a 1,6 mg/kg VO a cada 12 h para hipertensão pulmonar associada a síndrome de Eisenmenger.',
    dosageGuidance: {
      labelDose: 'Sem dose veterinária em bula humana; uso extra-bula. Não prescrever como medicação para sopro sem hipertensão pulmonar confirmada ou fortemente suspeita.',
      plumbs: {
        dog: [
          { title: 'Hipertensão pulmonar', dose: '0,5 a 1 mg/kg VO a cada 8 h para iniciar', note: 'Titular conforme sinais clínicos.' },
          { title: 'Teto citado', dose: 'até 3 mg/kg VO a cada 8 h', note: 'Exige monitoramento de pressão e tolerância.' },
        ],
        cat: [
          { title: 'Casos selecionados', dose: '0,25 a 1,6 mg/kg VO a cada 12 h', note: 'Evidência limitada; relato em hipertensão pulmonar com síndrome de Eisenmenger.' },
        ],
      },
    },
    plumbsContext: 'Vasodilatador pulmonar para hipertensão pulmonar confirmada ou fortemente suspeita por ecocardiografia; não é medicação para sopro.',
    clinicalUse: 'Hipertensão pulmonar em cães, especialmente com síncope, intolerância ao exercício ou cor pulmonale, após investigação da causa.',
    reassessment: 'Monitorar pressão arterial, síncopes, tolerância ao exercício, frequência respiratória, vômitos, apatia e sinais de hipotensão.',
    prescriptionExample: 'Sildenafila [concentração], administrar por via oral na dose calculada pelo peso, a cada 8 a 12 horas conforme prescrição, para manejo de hipertensão pulmonar.',
    safetyAlert: 'Bloquear associação com nitratos, como nitroglicerina ou isossorbida, por risco de hipotensão grave. Cuidado com alfa-bloqueadores, amlodipina, telmisartana, diuréticos, azóis, macrolídeos, cimetidina e fenobarbital.',
    price: { averageLabel: 'R$ 22,00 a R$ 70,00', rangeLabel: 'Genérico 25 mg com 4 comprimidos cerca de R$ 22-30; Viagra 25 mg pode ficar perto de R$ 70', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'atenolol-humano-manipulado',
    slug: 'atenolol',
    name: 'Atenolol',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_antiarrhythmic',
    commercialSubclasses: ['cardio_antiarrhythmic', 'cardio_antihypertensive'],
    productPageUrl: 'https://www.domifarma.com.br/atenolol-25-mg-c-60-cp-p64835-p90019',
    labelUrl: 'https://consultaremedios.com.br/atenolol/bula',
    imageUrl: 'https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/90/01/90019_atenolol-25-mg-c-60-cp-p64835_t1_638284645847741626.webp',
    species: ['dog', 'cat'],
    presentations: ['Genérico humano 25 mg', 'Genérico humano 50 mg', 'Genérico humano 100 mg', 'Manipulado veterinário com concentração variável'],
    activeComponents: ['atenolol'],
    labelCompositionSummary: 'Beta-bloqueador beta-1 seletivo de uso humano/manipulado em cães e gatos conforme indicação cardiológica.',
    labelDirections: 'Plumb’s: cães, beta-bloqueio para taquiarritmias/doença obstrutiva 0,25 a 1,5 mg/kg VO a cada 12 h, iniciando baixo e titulando. Boxer cardiomyopathy/ARVC: 0,3 a 0,6 mg/kg VO a cada 12 h associado a mexiletina. Gatos: iniciar 6,25 mg/gato VO a cada 12 h e titular; hipertireoidismo com taquicardia 1 a 2 mg/kg VO a cada 12 h. Ajustar em DRC felina conforme estágio IRIS.',
    dosageGuidance: {
      labelDose: 'Sem dose veterinária em bula humana; uso extra-bula guiado por ECG, ecocardiograma, frequência cardíaca e pressão arterial.',
      plumbs: {
        dog: [
          { title: 'Taquiarritmia / obstrução', dose: '0,25 a 1,5 mg/kg VO a cada 12 h', note: 'Iniciar baixo e titular.' },
          { title: 'ARVC / boxer cardiomyopathy', dose: '0,3 a 0,6 mg/kg VO a cada 12 h', note: 'Associado a mexiletina 5 a 8 mg/kg VO a cada 8 h.' },
        ],
        cat: [
          { title: 'Beta-bloqueio geral', dose: '6,25 mg/gato VO a cada 12 h para iniciar', note: 'Titular, por exemplo, 12,5 mg pela manhã e 6,25 mg à noite quando indicado.' },
          { title: 'Hipertireoidismo com taquicardia', dose: '1 a 2 mg/kg VO a cada 12 h', note: 'Ajustar em DRC felina conforme estágio IRIS.' },
        ],
      },
    },
    plumbsContext: 'Beta-bloqueador para taquiarritmias supraventriculares, controle de frequência e obstrução dinâmica selecionada. Não iniciar em ICC descompensada ou baixo débito sem cardiologia.',
    clinicalUse: 'Arritmias, HCM obstrutiva felina selecionada, taquicardia/hipertensão em cenários específicos e sempre com monitoramento.',
    reassessment: 'Monitorar frequência cardíaca, pressão arterial, prostração, síncope, fraqueza, dispneia e piora de congestão.',
    prescriptionExample: 'Atenolol [25 mg ou manipulado], administrar por via oral na dose prescrita, a cada 12 ou 24 horas conforme orientação cardiológica. Monitorar frequência cardíaca e pressão arterial.',
    safetyAlert: 'Bloquear/alertar em ICC descompensada, bradicardia, hipotensão, bloqueio atrioventricular, baixo débito e paciente sem ECG/eco. Pode piorar congestão se iniciado no momento errado.',
    price: { averageLabel: 'R$ 3,00 a R$ 10,00', rangeLabel: 'Atenolol 25 mg com 30 comprimidos em varejo humano varia conforme laboratório e promoção', sourceDate: CARDIO_PRICE_SOURCE_DATE },
  },
  {
    id: 'maxicam-ourofino',
    slug: 'maxicam',
    name: 'Maxicam',
    manufacturer: 'Ourofino',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/maxicam/',
    labelUrl: 'https://www.ourofinopet.com/produtos/medicamentos/maxicam/90/',
    species: ['dog', 'cat'],
    presentations: [
      'Maxicam 0,5 mg comprimidos (10 comp.)',
      'Maxicam 2 mg comprimidos (10 comp.)',
      'Maxicam solução oral 0,1% (frasco)',
      'Maxicam injetável 0,2% (frasco)'
    ],
    activeComponents: ['meloxicam'],
    labelCompositionSummary: 'Meloxicam. Comprimidos: 0,5 mg ou 2,0 mg por comprimido. Solução oral 0,1%: 1 mg/mL. Injetável 0,2%: 2 mg/mL.',
    labelDirections: 'Comprimidos cães: 0,2 mg/kg no 1º dia, depois 0,1 mg/kg SID por 5 a 7 dias (agudo) ou até 28 dias (crônico). Comprimidos gatos: 0,1 mg/kg SID por até 4 dias. Solução oral cães: 1º dia 0,2 mL/kg, depois 0,1 mL/kg SID. Solução oral gatos: 1º dia 0,1 mL/kg, depois 0,05 mL/kg SID.',
    dosageGuidance: {
      labelDose: 'Cães: 1º dia 0,2 mg/kg, depois 0,1 mg/kg SID. Gatos: 0,1 mg/kg SID, geralmente até 4 dias.',
      plumbs: {
        dog: [
          { title: 'Dor/inflamação aguda', dose: '0,2 mg/kg VO no 1º dia, depois 0,1 mg/kg VO SID', note: 'Usualmente por 5 a 7 dias.' },
          { title: 'Uso contínuo (osteartrite)', dose: '0,1 mg/kg VO SID', note: 'Procurar menor dose efetiva em uso prolongado.' }
        ],
        cat: [
          { title: 'Dor/inflamação aguda', dose: '0,1 mg/kg VO SID por até 4 dias', note: 'Uso de curta duração conforme bula.' },
          { title: 'Osteoartrite crônica (Plumb\'s)', dose: '0,05 mg/kg VO SID', note: 'Usar com cautela máxima e monitoramento renal.' }
        ]
      }
    },
    plumbsContext: 'AINE classicamente usado para controle de inflamação e dor musculoesquelética. Gatos possuem maior risco com AINEs, exigindo hidratação adequada e monitoramento renal.',
    clinicalUse: 'Analgésico, anti-inflamatório e antiexsudativo para artrites, osteoartrites, displasias coxofemorais, reparação de fraturas e pós-operatório ortopédico.',
    reassessment: 'Monitorar sinais de vômito, diarreia, fezes escuras, inapetência, redução de urina ou piora clínica.',
    prescriptionExample: 'Maxicam [0,5 mg ou 2 mg], administrar por via oral na dose calculada pelo peso, a cada 24 horas, preferencialmente junto ou logo após alimento, pelo período prescrito. Não associar com outro anti-inflamatório, corticoide ou AINE sem orientação.',
    safetyAlert: 'Evitar em desidratação, hipovolemia, hipotensão, DRC/IRA, hepatopatia importante, ulceração gastrointestinal, gestação/lactação ou associação com corticoide.',
    price: { averageLabel: 'R$ 37,72 a R$ 59,50', rangeLabel: 'Maxicam 0,5 mg 10 comp: R$ 37,72-37,90; Maxicam 2 mg 10 comp: R$ 59,18-59,50 (Cobasi/varejo online)', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1055787/maxicam-0_5-mg-ourofino-10-comprimidos.jpg'
  },
  {
    id: 'maxicam-plus-ourofino',
    slug: 'maxicam-plus',
    name: 'Maxicam Plus',
    manufacturer: 'Ourofino',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    commercialSubclasses: ['ortho_joint_support', 'ortho_antiinflammatory'],
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/maxicam-plus/',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/Bula-Maxicam-Plus-Ourofino-Paciente-Consulta-Remedios.pdf',
    species: ['dog', 'cat'],
    presentations: [
      'Maxicam Plus 0,5 mg comprimidos (8 comp.)',
      'Maxicam Plus 2 mg comprimidos (8 comp.)'
    ],
    activeComponents: ['meloxicam', 'sulfato de condroitina A'],
    labelCompositionSummary: 'Composição por comprimido: Meloxicam + sulfato de condroitina A. 0,5 mg (meloxicam 0,5 mg + condroitina 100 mg); 2 mg (meloxicam 2 mg + condroitina 400 mg).',
    labelDirections: 'Cães: 1º dia: 2 comprimidos para cada 5 kg (0,5 mg) ou 20 kg (2 mg) SID. 2º dia em diante: 1 comprimido para cada 5 kg ou 20 kg SID. Gatos (0,5 mg): 1 comprimido para cada 5 kg SID.',
    dosageGuidance: {
      labelDose: 'Cães: 1º dia dose dupla (0,2 mg/kg meloxicam), depois dose simples (0,1 mg/kg) SID. Gatos: 1 comp/5 kg SID.',
      plumbs: {
        dog: [
          { title: 'AINE + Condroprotetor', dose: '1º dia 0,2 mg/kg, depois 0,1 mg/kg VO SID', note: 'Condroitina associada como adjuvante de suporte estrutural.' }
        ],
        cat: [
          { title: 'AINE + Condroprotetor', dose: '1 comprimido de 0,5 mg para cada 5 kg VO SID', note: 'Uso curto com cautela devido ao componente meloxicam.' }
        ]
      }
    },
    plumbsContext: 'O efeito analgésico vem do meloxicam. A condroitina é um adjuvante de suporte estrutural/articular sem efeito imediato de reparação.',
    clinicalUse: 'Analgésico, anti-inflamatório e regenerador articular para osteoartrites, artrites, displasias coxofemorais e discopatias em cães e gatos.',
    reassessment: 'Mesmo monitoramento do meloxicam. A presença de condroitina não protege contra a toxicidade renal ou gástrica do AINE.',
    prescriptionExample: 'Maxicam Plus [0,5 mg ou 2 mg], administrar por via oral conforme o peso, a cada 24 horas, pelo período prescrito. Administrar junto ou após o alimento.',
    safetyAlert: 'A presença de condroitina não reduz o risco de toxicidade renal ou gástrica do meloxicam. Contraindicado em renais, desidratados ou com úlcera.',
    price: { averageLabel: 'Variável', rangeLabel: 'Menor transparência de preço online; cotação direta no carrinho recomendada', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://http2.mlstatic.com/D_Q_NP_624717-MLB51087903448_082022-O.webp'
  },
  {
    id: 'meloxivet-duprat',
    slug: 'meloxivet',
    name: 'Meloxivet',
    manufacturer: 'Duprat',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www.cobasi.com.br/meloxivet-10-comprimidos-duprat-3326615/p',
    labelUrl: 'https://consultaremedios.com.br/meloxivet-para-caes-e-gatos/bula',
    species: ['dog', 'cat'],
    presentations: [
      'Meloxivet 1 mg (10 comp.)',
      'Meloxivet 2 mg (10 comp.)',
      'Meloxivet 6 mg (10 comp.)'
    ],
    activeComponents: ['meloxicam'],
    labelCompositionSummary: 'Meloxicam. Comprimidos contendo 1 mg, 2 mg ou 6 mg de ingrediente ativo.',
    labelDirections: 'Seguir tabela por peso do fabricante. Dose inicial de ataque no primeiro dia (0,2 mg/kg) e dose menor nos dias seguintes (0,1 mg/kg SID), com tratamento curto em gatos.',
    dosageGuidance: {
      labelDose: 'Cães: 1º dia 0,2 mg/kg, depois 0,1 mg/kg SID. Gatos: dose curta e menor dose efetiva com cautela.',
      plumbs: {
        dog: [
          { title: 'Osteoartrite / Dor aguda', dose: '1º dia 0,2 mg/kg VO, depois 0,1 mg/kg VO SID', note: 'Utilizar comprimidos de 1 mg, 2 mg ou 6 mg de acordo com o peso.' }
        ],
        cat: [
          { title: 'Analgésico e anti-inflamatório', dose: '0,1 mg/kg VO SID por tempo curto', note: 'Gatos têm risco elevado de toxicidade com AINEs se houver DRC ou desidratação.' }
        ]
      }
    },
    plumbsContext: 'Meloxicam. anti-inflamatório musculoesquelético de inibição COX. Unificar com outros meloxicams na avaliação de interações.',
    clinicalUse: 'Tratamento e alívio da dor e inflamação em patologias agudas ou crônicas do sistema musculoesquelético de cães e gatos.',
    reassessment: 'Observar vômitos, diarreia, inapetência, fezes escurecidas e monitorar parâmetros renais em uso continuado.',
    prescriptionExample: 'Meloxivet [1 mg, 2 mg ou 6 mg], administrar por via oral conforme peso, a cada 24 horas, pelo período prescrito, preferencialmente junto ou após alimento.',
    safetyAlert: 'Mesmos alertas do meloxicam. Evitar uso prolongado em gatos sem plano formal de monitoramento renal e pressão.',
    price: { averageLabel: 'R$ 49,31 a R$ 90,90', rangeLabel: '1 mg 10 comp: R$ 49,31-74,90; 2 mg 10 comp: R$ 73,35-81,50; 6 mg 10 comp: R$ 81,81-90,90', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1008690/Meloxivet-1g.jpg?v=638398973097000000'
  },
  {
    id: 'carproflan-agener-uniao',
    slug: 'carproflan',
    name: 'Carproflan',
    manufacturer: 'Agener União',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/linha-dor/carproflan/',
    labelUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/4021986-BU-CARPROFLAN-25MG.pdf',
    species: ['dog'],
    presentations: [
      'Carproflan 25 mg (14 comp.)',
      'Carproflan 75 mg (14 comp.)',
      'Carproflan 100 mg (14 comp.)'
    ],
    activeComponents: ['carprofeno'],
    labelCompositionSummary: 'Carprofeno. Comprimidos contendo 25 mg, 75 mg ou 100 mg de ingrediente ativo.',
    labelDirections: 'Carproflan 25 mg: 1 comp/10 kg VO a cada 12 h ou 1 comp/6 kg VO a cada 24 h. Carproflan 75 mg: 1 comp/30 kg VO a cada 12 h ou 1 comp/17 kg VO a cada 24 h. Carproflan 100 mg: 1 comp/40 kg VO a cada 12 h ou 1 comp/22 kg VO a cada 24 h.',
    dosageGuidance: {
      labelDose: 'Cães: dose diária aproximada de 4,4 mg/kg, podendo ser dividida a cada 12 horas ou administrada em dose única a cada 24 horas.',
      plumbs: {
        dog: [
          { title: 'Dor/inflamação musculoesquelética', dose: '4,4 mg/kg VO SID ou 2,2 mg/kg VO BID', note: 'Administrar com alimento. Bloquear uso em gatos para fins domésticos.' }
        ]
      }
    },
    plumbsContext: 'Carprofeno em cães é classicamente usado a 4,4 mg/kg/dia. Em gatos tem meia-vida muito longa e não é escolha domiciliar rotineira.',
    clinicalUse: 'Anti-inflamatório, analgésico e antitérmico para cães, indicado em osteoartrite, processos degenerativos articulares e pós-operatórios.',
    reassessment: 'Checar função hepática e renal em tratamentos prolongados. Suspender se inapetência, vômitos ou melena.',
    prescriptionExample: 'Carproflan [25 mg, 75 mg ou 100 mg], administrar por via oral conforme o peso, a cada 12 ou 24 horas, com alimento, pelo período recomendado.',
    safetyAlert: 'Contraindicado em cães com desordens coagulatórias, renais/hepáticos, desidratação e hipovolemia. Evitar em gatos.',
    price: { averageLabel: 'R$ 72,00 a R$ 108,90', rangeLabel: '25 mg 14 comp em torno de R$ 72,00; 75/100 mg 14 comp em torno de R$ 108,90', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1053256/Carproflan-25.png?v=638436005468530000'
  },
  {
    id: 'previcox-boehringer-ingelheim',
    slug: 'previcox',
    name: 'Previcox',
    manufacturer: 'Boehringer Ingelheim',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www.boehringer-ingelheim.com/br/saude-animal/produtos/previcox',
    labelUrl: 'https://www.disprovel.com.br/uploads/produtos/Bula-Previcox.pdf',
    species: ['dog'],
    presentations: [
      'Previcox 57 mg (10 comp.)',
      'Previcox 227 mg (10 comp.)'
    ],
    activeComponents: ['firocoxib'],
    labelCompositionSummary: 'Firocoxib. Comprimidos mastigáveis e sulcados contendo 57 mg ou 227 mg de firocoxib.',
    labelDirections: 'Cães: 5 mg/kg por via oral, a cada 24 horas. Administrar apenas a cães conforme peso clínico.',
    dosageGuidance: {
      labelDose: 'Cães: 5 mg/kg VO a cada 24 horas. Administrar de acordo com a faixa de peso indicada.',
      plumbs: {
        dog: [
          { title: 'Osteoartrite e pós-operatório', dose: '5 mg/kg VO SID', note: 'Inibidor altamente seletivo de COX-2. Evitar uso em gatos.' }
        ]
      }
    },
    plumbsContext: 'Firocoxib é inibidor seletivo de COX-2 (COXib). Oferece menor interferência em COX-1, mas ainda requer cuidados de rim, fígado e trato gastrointestinal.',
    clinicalUse: 'Auxiliar no tratamento da osteoartrite canina, com alívio da dor e inflamação. Também indicado em cirurgias ortopédicas e tecidos moles.',
    reassessment: 'Avaliar a eficácia na locomoção e dor. Suspender se inapetência, diarreia ou vômito ativos.',
    prescriptionExample: 'Previcox [57 mg ou 227 mg], administrar por via oral na dose calculada pelo peso, a cada 24 horas, pelo período determinado.',
    safetyAlert: 'Não usar em gatos no app como prescrição domiciliar. Evitar em doentes renais, hepáticos ou com desidratação.',
    price: { averageLabel: 'R$ 174,60 a R$ 284,00', rangeLabel: 'Previcox 57 mg 10 comp: R$ 174,60-194,00; Previcox 227 mg 10 comp: R$ 255,60-284,00', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1068010/previcox-57mg-10-comprimidos.png.png?v=638751300200100000'
  },
  {
    id: 'galliprant-elanco',
    slug: 'galliprant',
    name: 'Galliprant',
    manufacturer: 'Elanco',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://vet.elanco.com/br/produtos/galliprant',
    labelUrl: 'https://ec.europa.eu/health/documents/community-register/2018/20180525141118/anx_141118_pt.pdf',
    species: ['dog'],
    presentations: [
      'Galliprant 20 mg (7 ou 30 comp.)',
      'Galliprant 60 mg (7 ou 30 comp.)',
      'Galliprant 100 mg (7 ou 30 comp.)'
    ],
    activeComponents: ['grapiprant'],
    labelCompositionSummary: 'Grapiprant. Comprimidos contendo 20 mg, 60 mg ou 100 mg de ingrediente ativo.',
    labelDirections: 'Cães: 2 mg/kg por via oral, a cada 24 horas (uma vez ao dia). Indicado para osteoartrite leve a moderada.',
    dosageGuidance: {
      labelDose: 'Cães: 2 mg/kg VO a cada 24 horas. Dose única diária.',
      plumbs: {
        dog: [
          { title: 'Osteoartrite canina', dose: '2 mg/kg VO SID', note: 'Atua bloqueando o receptor EP4 da prostaglandina E2.' }
        ]
      }
    },
    plumbsContext: 'Piprant, antagonista seletivo do receptor EP4. Diferencia-se de COXibs por não inibir a síntese de prostaglandinas, apresentando perfil de segurança renal/gástrico favorável.',
    clinicalUse: 'Manejo da dor associada à osteoartrite leve a moderada em cães, indicado para tratamento continuado sob avaliação periódica.',
    reassessment: 'Monitorar tolerância e reações gastrointestinais ocasionais (como vômito ou fezes amolecidas).',
    prescriptionExample: 'Galliprant [20 mg, 60 mg ou 100 mg], administrar por via oral na dose calculada pelo peso, a cada 24 horas, para controle de dor da osteoartrite.',
    safetyAlert: 'Não usar em gatos. Não usar em animais gestantes, lactantes ou destinados à reprodução. Cautela em hipoproteinêmicos.',
    price: { averageLabel: 'R$ 85,41 a R$ 256,90', rangeLabel: '20 mg 7 comp: R$ 85,41-94,90; 20 mg 30 comp: cerca de R$ 256,90; 60 mg 7 comp: cerca de R$ 169,09', sourceDate: '2026-05-25' },
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/e337329f-90c4-4ca4-9d80-d057f985e745/Galliprant%20image%20-%20Wed%20May%2024%202023'
  },
  {
    id: 'onsior-elanco',
    slug: 'onsior',
    name: 'Onsior',
    manufacturer: 'Elanco',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://vet.elanco.com/br/produtos/onsior',
    labelUrl: 'https://consultaremedios.com.br/onsior-elanco/bula',
    species: ['dog', 'cat'],
    presentations: [
      'Onsior 6 mg para gatos (6 comp.)',
      'Onsior 10 mg para cães (7 comp.)',
      'Onsior 20 mg para cães (7 comp.)',
      'Onsior 40 mg para cães (7 comp.)'
    ],
    activeComponents: ['robenacoxib'],
    labelCompositionSummary: 'Robenacoxib. Comprimidos contendo 6 mg (gatos); 10 mg, 20 mg ou 40 mg (cães).',
    labelDirections: 'Gatos: 1 a 2,4 mg/kg VO a cada 24 horas. Cães: 1 a 2 mg/kg VO a cada 24 horas. Não administrar com alimentos para melhor biodisponibilidade.',
    dosageGuidance: {
      labelDose: 'Gatos (>2,5 kg e >4 meses): 1 a 2,4 mg/kg SID. Cães (>2,5 kg e >3 meses): 1 a 2 mg/kg SID.',
      plumbs: {
        dog: [
          { title: 'Dor e osteoartrite canina', dose: '1 a 2 mg/kg VO SID', note: 'Inibidor altamente seletivo de COX-2. Administrar comprimido inteiro.' }
        ],
        cat: [
          { title: 'Osteoartrite crônica / Dor aguda', dose: '1 comprimido de 6 mg VO SID', note: 'Bula nacional permite uso para dor crônica. Exige cautela em cardiopatas e renais.' }
        ]
      }
    },
    plumbsContext: 'Robenacoxib é inibidor seletivo de COX-2. Permanece por menor tempo na circulação sistêmica e mais tempo nos tecidos inflamados. Em gatos idosos ou com DRC, usar com cautela e monitoramento.',
    clinicalUse: 'Controle de dor e inflamação decorrentes de osteoartrites, cirurgias ortopédicas ou cirurgias de tecidos moles em cães e gatos.',
    reassessment: 'Em felinos sob terapia crônica, reavaliar rotineiramente creatinina, ureia, eletrólitos, peso e hidratação.',
    prescriptionExample: 'Onsior [6, 10, 20 ou 40 mg], administrar por via oral conforme peso, a cada 24 horas, de preferência em jejum ou longe das refeições, pelo período prescrito.',
    safetyAlert: 'Respeitar peso mínimo (2,5 kg) e idade mínima de 3 meses (cães) e 4 meses (gatos). Cautela em doentes renais.',
    price: { averageLabel: 'R$ 75,15 a R$ 160,50', rangeLabel: 'Gatos 6 mg 6 comp: R$ 80,01-88,90; Cães 10 mg: R$ 75,15-83,50; Cães 20 mg: R$ 84,68-112,90; Cães 40 mg: R$ 120,38-160,50', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1004624/Novo-Projeto--10-.jpg?v=637955580183770000'
  },
  {
    id: 'ketojet-agener-uniao',
    slug: 'ketojet',
    name: 'Ketojet',
    manufacturer: 'Agener União',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/linha-dor/ketojet/',
    labelUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/4008297-BU-KETOJET-20MG.pdf',
    species: ['dog', 'cat'],
    presentations: [
      'Ketojet 5 mg (10 comp.)',
      'Ketojet 20 mg (10 comp.)'
    ],
    activeComponents: ['cetoprofeno'],
    labelCompositionSummary: 'Cetoprofeno. Comprimidos contendo 5 mg ou 20 mg de ingrediente ativo.',
    labelDirections: 'Cães e gatos: 1 comprimido de 5 mg para cada 5 kg VO a cada 24 horas; ou 1 comprimido de 20 mg para cada 20 kg VO a cada 24 horas. Tratar por 3 a 5 dias.',
    dosageGuidance: {
      labelDose: 'Cães e gatos: 1 mg/kg VO a cada 24 horas, por no máximo 3 a 5 dias.',
      plumbs: {
        dog: [
          { title: 'Dor inflamatória aguda', dose: '1 mg/kg VO SID por 3 a 5 dias', note: 'AINE clássico de uso curto, não seletivo.' }
        ],
        cat: [
          { title: 'Trauma / Analgesia aguda', dose: '1 mg/kg VO SID por 3 a 5 dias', note: 'Não recomendado para uso de longo prazo em felinos.' }
        ]
      }
    },
    plumbsContext: 'Cetoprofeno é um anti-inflamatório não seletivo (AINE clássico). Oferece boa analgesia aguda e antitérmica, mas tem risco gástrico e renal superior em uso crônico.',
    clinicalUse: 'Processos dolorosos e inflamatórios agudos, claudicação por traumas, entorses, luxações e controle de edema pós-operatório curto.',
    reassessment: 'Avaliar a ocorrência de sinais gástricos. Evitar prorrogar o tratamento além de 5 dias sem reavaliação.',
    prescriptionExample: 'Ketojet [5 mg ou 20 mg], administrar por via oral conforme peso, a cada 24 horas, junto com alimento, por 3 a 5 dias.',
    safetyAlert: 'Evitar em renais, cardiopatas, desidratados, hipovolêmicos ou histórico de úlceras. Gatos exigem tempo restrito.',
    price: { averageLabel: 'R$ 54,89 a R$ 60,99', rangeLabel: 'Ketojet 20 mg 10 comp: R$ 54,89-60,99 (Petlove/varejo online)', sourceDate: '2026-05-25' },
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/novo-ketojet-1.jpg'
  },
  {
    id: 'nulli-ourofino',
    slug: 'nulli',
    name: 'Nulli',
    manufacturer: 'Ourofino',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/nulli/',
    labelUrl: 'https://consultaremedios.com.br/nulli/bula',
    species: ['dog', 'cat'],
    presentations: ['Nulli solução oral 40 mg/mL (frasco 10 mL)'],
    activeComponents: ['cloridrato de tramadol'],
    labelCompositionSummary: 'Cloridrato de tramadol 40 mg/mL. Analgésico opioide oral.',
    labelDirections: 'Cães e gatos: dose geral de 1 a 4 mg/kg VO a cada 8 a 12 horas. Medicação sob controle especial.',
    dosageGuidance: {
      labelDose: 'Cães e gatos: 1 a 4 mg/kg VO a cada 8 ou 12 horas conforme grau de dor.',
      plumbs: {
        dog: [
          { title: 'Dor musculoesquelética (adjuvante)', dose: '2 a 5 mg/kg VO a cada 8 ou 12 horas', note: 'Opioide fraco. Eficácia de metabolização variável. Associar a AINE se viável.' }
        ],
        cat: [
          { title: 'Analgesia multimodal / Dor aguda', dose: '2 a 4 mg/kg VO a cada 12 horas', note: 'Atenção à baixa palatabilidade, salivação e efeitos comportamentais.' }
        ]
      }
    },
    plumbsContext: 'Opioide de ação central. A eficiência analgésica isolada em cães com dor inflamatória é considerada limitada devido à rápida depuração. Atua melhor como adjuvante multimodal.',
    clinicalUse: 'Analgésico opioide para controle de dor aguda ou crônica musculoesquelética leve a moderada de forma multimodal.',
    reassessment: 'Monitorar sonolência, salivação (especialmente felinos), constipação, náusea ou inapetência.',
    prescriptionExample: 'Nulli solução oral, administrar por via oral na dose calculada pelo peso, a cada 8 a 12 horas, conforme prescrição. Medicamento controlado.',
    safetyAlert: 'Medicamento controlado. Cautela na coadministração com serotonérgicos, trazodona, antidepressivos e sedativos.',
    price: { averageLabel: 'Variável', rangeLabel: 'Frasco 10 mL; preço público sujeito a variações regionais e de estoque; checar no carrinho', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/953490/nulli_10ml_5281_1_fadf860680493dda2e6afd5e8ec21e36.jpg'
  },
  {
    id: 'sindolor-caes-avert',
    slug: 'sindolor-caes',
    name: 'Sindolor Cães',
    manufacturer: 'Avert',
    commercialClass: 'analgesic',
    commercialSubclass: 'analgesic_opioid_combo',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos/sindolor-25020-mg',
    labelUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/me272566-sindolor.pdf',
    species: ['dog'],
    presentations: [
      'Sindolor 250/20 mg - dipirona sódica 250 mg + cloridrato de tramadol 20 mg (10 comp. bissulcados)',
      'Sindolor 750/60 mg - dipirona sódica 750 mg + cloridrato de tramadol 60 mg (10 comp. bissulcados)'
    ],
    activeComponents: ['dipirona sódica', 'cloridrato de tramadol'],
    labelCompositionSummary: 'Associação analgésica oral de dipirona sódica + cloridrato de tramadol. Apresentações caninas: 250/20 mg e 750/60 mg.',
    labelDirections: 'Cães: 25 mg/kg de dipirona sódica + 2 mg/kg de cloridrato de tramadol VO a cada 8 horas, por até 7 dias. Sindolor 250/20 mg: 1 comp/10 kg; Sindolor 750/60 mg: 1 comp/30 kg.',
    dosageGuidance: {
      labelDose: 'Cães: 25 mg/kg dipirona + 2 mg/kg tramadol VO q8h por até 7 dias.',
      plumbs: {
        dog: [
          { title: 'Sindolor 250/20 mg', dose: 'A cada 8 h: 2,5 kg = 1/4 comp | 5 kg = 1/2 comp | 10 kg = 1 comp | 20 kg = 2 comp', note: 'Dose de bula equivalente a 25 mg/kg de dipirona + 2 mg/kg de tramadol. Melhor para cães menores.' },
          { title: 'Sindolor 750/60 mg', dose: 'A cada 8 h: 7,5 kg = 1/4 comp | 15 kg = 1/2 comp | 30 kg = 1 comp | 60 kg = 2 comp', note: 'Dose de bula equivalente a 25 mg/kg de dipirona + 2 mg/kg de tramadol. Melhor para cães maiores.' },
          { title: 'Leitura Plumb’s', dose: 'Tramadol em cães: 4 a 10 mg/kg VO q8h. Dipirona: referência parenteral de 25 mg/kg em analgesia perioperatória.', note: 'A dose de Sindolor é a dose de bula do produto; Plumb’s reforça que tramadol isolado em cães tem eficácia variável.' }
        ]
      },
      notes: [
        'Indicação de bula: dor aguda pós-operatória em cães.',
        'Não associar com outros opioides, AINEs/corticoides ou serotonérgicos sem avaliação do risco.'
      ]
    },
    plumbsContext: 'Plumb’s descreve tramadol como agonista opioide parcial com ação serotoninérgica/noradrenérgica; em cães, a evidência de analgesia isolada é conflitante. Dipirona é descrita como analgésico/antipirético com potencial utilidade em cães e gatos, mas com cautela hematológica, renal/hepática e de coagulação.',
    clinicalUse: 'Analgésico multimodal oral para dor aguda pós-operatória em cães, especialmente quando se deseja associação dipirona + tramadol em dose padronizada por peso.',
    reassessment: 'Reavaliar dor, sedação, salivação, vômito, constipação, ataxia, agitação, tremores, apetite e sinais gastrointestinais durante o uso.',
    prescriptionExample: 'Sindolor Cães [250/20 mg ou 750/60 mg], administrar por via oral conforme faixa de peso, a cada 8 horas, por até 7 dias ou conforme prescrição.',
    safetyAlert: 'Medicamento controlado com tramadol. Evitar como único analgésico em dor severa. Cautela em convulsões, obstrução gastrointestinal, hepatopatia, nefropatia, geriátricos e uso com trazodona, fluoxetina, clomipramina, selegilina, mirtazapina ou outros serotonérgicos.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Sindolor 250/20 mg apareceu em Cobasi, mas sem preço estável capturado', sourceDate: '2026-06-07', notes: 'Dados incompletos' },
    imageUrl: 'https://femalepet.vteximg.com.br/arquivos/ids/169583-412-412/sindolor-caes-250mg-10-comprimidos_0.png?v=638791299915730000'
  },
  {
    id: 'sindolor-gatos-avert',
    slug: 'sindolor-gatos',
    name: 'Sindolor Gatos',
    manufacturer: 'Avert',
    commercialClass: 'analgesic',
    commercialSubclass: 'analgesic_opioid_combo',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos/sindolor-gatos',
    labelUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/sindolor-gatos.pdf',
    species: ['cat'],
    presentations: [
      'Sindolor Gatos 50/8 mg - dipirona 50 mg + cloridrato de tramadol 8 mg (10 comp. bissulcados)'
    ],
    activeComponents: ['dipirona', 'cloridrato de tramadol'],
    labelCompositionSummary: 'Associação analgésica oral felina de dipirona 50 mg + cloridrato de tramadol 8 mg por comprimido.',
    labelDirections: 'Gatos: 12,5 mg/kg de dipirona + 2 mg/kg de cloridrato de tramadol VO a cada 12 horas, por até 7 dias. Equivalência: 1 comprimido para 4 kg.',
    dosageGuidance: {
      labelDose: 'Gatos: 12,5 mg/kg dipirona + 2 mg/kg tramadol VO q12h por até 7 dias.',
      plumbs: {
        cat: [
          { title: 'Bula - 50/8 mg', dose: '1/4 comp/1 kg; 1/2 comp/2 kg; 3/4 comp/3 kg; 1 comp/4 kg; 1,5 comp/6 kg VO q12h', note: 'Comprimido bissulcado para ajuste por faixa de peso.' },
          { title: 'Leitura Plumb’s', dose: 'Tramadol em gatos: geralmente 1 a 2 mg/kg VO q12h; alguns casos usam até 4 mg/kg', note: 'Plumb’s ressalta sabor desagradável e efeitos neurológicos/opioides, especialmente geriátricos acima de 2 mg/kg.' },
          { title: 'Dipirona no Plumb’s', dose: 'Relatos de analgesia felina parenteral: 25 mg/kg IV q24h ou 12,5 mg/kg IV q12h', note: 'Sindolor Gatos usa dose oral de bula; monitorar salivação, vômito e tolerância.' }
        ]
      },
      notes: [
        'Indicação de bula: dor aguda pós-operatória em gatos.',
        'Não extrapolar apresentação canina para gatos.'
      ]
    },
    plumbsContext: 'Plumb’s descreve tramadol como mais consistente em gatos do que em cães, mas com palatabilidade ruim e risco de efeitos neurológicos/opioides. Para dipirona, cita utilidade analgésica em gatos, com cautela por efeitos hematológicos, gastrointestinais e de coagulação.',
    clinicalUse: 'Analgésico multimodal oral para dor aguda pós-operatória em gatos, usando apresentação felina específica para evitar erro de dose.',
    reassessment: 'Monitorar sedação, euforia/disforia, midríase, salivação, vômito, constipação, ataxia, apetite e controle real da dor.',
    prescriptionExample: 'Sindolor Gatos 50/8 mg, administrar por via oral conforme faixa de peso, a cada 12 horas, por até 7 dias ou conforme prescrição.',
    safetyAlert: 'Medicamento controlado com tramadol. Não usar apresentação canina em gatos. Evitar em hipersensibilidade a opioides/dipirona, obstrução gastrointestinal, convulsões importantes, hepatopatia/nefropatia grave e uso com serotonérgicos sem avaliação.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço confiável não localizado em Petlove, Cobasi ou Petz nesta rodada', sourceDate: '2026-06-07', notes: 'Dados incompletos' },
    imageUrl: 'https://petcaesecia.fbitsstatic.net/img/p/analgesico-avert-sindolor-gatos-50-8-mg-85721/270637.jpg?w=1200&h=1200&v=202603120918&qs=ignore'
  },
  {
    id: 'gabapentina-humana-manipulada',
    slug: 'gabapentina',
    name: 'Gabapentina',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory', 'neuro_pain'],
    productPageUrl: 'https://www.drogasil.com.br/bulas/gabapentina',
    labelUrl: 'https://www.drogasil.com.br/bulas/gabapentina',
    species: ['dog', 'cat'],
    presentations: [
      'Cápsulas humanas 300 mg',
      'Cápsulas humanas 400 mg',
      'Fórmulas manipuladas sob medida (cápsula ou suspensão oral)'
    ],
    activeComponents: ['gabapentina'],
    labelCompositionSummary: 'Gabapentina. Concentrações comerciais humanas comuns de 300 e 400 mg. Fórmulas veterinárias manipuláveis com dosagens sob medida.',
    labelDirections: 'Uso extra-bula / literatura veterinária. Dor crônica: cães e gatos, 5 a 15 mg/kg por via oral, a cada 8 a 12 horas, titulando de acordo com a tolerância e grau de sedação.',
    dosageGuidance: {
      labelDose: 'Sem dose em bula humana. Dor crônica: 5 a 15 mg/kg VO a cada 8 ou 12 horas. Iniciar com dose baixa e titular.',
      plumbs: {
        dog: [
          { title: 'Dor crônica / Neuropática', dose: '5 a 15 mg/kg VO a cada 8 ou 12 horas', note: 'Iniciar baixo (ex: 5 mg/kg) e subir gradualmente para evitar ataxia grave.' }
        ],
        cat: [
          { title: 'Dor crônica / Osteoartrite', dose: '5 a 10 mg/kg VO a cada 12 ou 24 horas', note: 'Adjuvante excelente em gatos idosos com restrição a AINE.' },
          { title: 'Ansiedade situacional (ex: clínica)', dose: '50 a 100 mg/gato VO dose única', note: 'Fornecer 2 a 3 horas antes da viagem ou procedimento.' }
        ]
      }
    },
    plumbsContext: 'Gabapentinoide. Modulador dos canais de cálcio dependentes de voltagem. Excelente adjuvante para dor de osteoartrite quando há sensibilização central e hiperalgesia.',
    clinicalUse: 'Manejo de dor neuropática, dor crônica persistente de osteoartrite (em associação com AINE ou Librela/Solensia) e espasticidade ou dor de coluna.',
    reassessment: 'Monitorar relaxamento muscular, sedação ou ataxia nas primeiras 72 horas. Evitar suspender abruptamente.',
    prescriptionExample: 'Gabapentina [concentração manipulada], administrar por via oral na dose calculada pelo peso, a cada 12 horas, pelo período recomendado.',
    safetyAlert: 'Ajustar em DRC progressiva. Atenção: soluções orais comerciais humanas podem conter xilitol, que é altamente tóxico para cães.',
    price: { averageLabel: 'Variável', rangeLabel: 'Genéricos humanos e manipulados variam de acordo com dosagem e fornecedor local', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/webp/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/294918bf3/gabapentina-300mg-c-30-capsulas_jpg.webp'
  },
  {
    id: 'amantadina-humana-manipulada',
    slug: 'amantadina',
    name: 'Amantadina',
    manufacturer: 'Uso humano / manipulado veterinário',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://vetsmart.com.br/cg/produto/1679/amantadina',
    labelUrl: 'https://vetsmart.com.br/cg/produto/1679/amantadina',
    species: ['dog', 'cat'],
    presentations: [
      'Amantadina humana 100 mg (comprimido)',
      'Amantadina manipulada em dosagens veterinárias customizadas'
    ],
    activeComponents: ['cloridrato de amantadina'],
    labelCompositionSummary: 'Cloridrato de amantadina. Comprimidos humanos de 100 mg ou manipulado em doses sob medida.',
    labelDirections: 'Uso extra-bula / literatura veterinária. Cães e gatos: 3 a 5 mg/kg por via oral, a cada 24 horas (uma vez ao dia), por no mínimo 28 dias para avaliação de eficácia.',
    dosageGuidance: {
      labelDose: 'Uso extra-bula. Literatura: 3 a 5 mg/kg VO a cada 24 horas. Utilizar associado a AINE ou gabapentina.',
      plumbs: {
        dog: [
          { title: 'Dor crônica refratária (artrose)', dose: '3 a 5 mg/kg VO a cada 12 ou 24 horas', note: 'Atua bloqueando a sensibilização central. Utilizar associado a AINE.' }
        ],
        cat: [
          { title: 'Dor crônica persistente', dose: '3 a 5 mg/kg VO a cada 24 horas', note: 'Adjuvante seguro em felinos com dor crônica.' }
        ]
      }
    },
    plumbsContext: 'Antagonista dos receptores NMDA. Auxilia na reversão da sensibilização central ("wind-up"). Não é analgésico de resgate imediato; necessita semanas de uso.',
    clinicalUse: 'Adjuvante na dor crônica severa refratária de osteoartrites, dor neuropática de coluna ou dores oncológicas espinhais persistentes.',
    reassessment: 'Reavaliar após 28 dias de uso contínuo para julgar a eficácia analgésica. Monitorar diarreia ou agitação.',
    prescriptionExample: 'Amantadina [concentração manipulada], administrar por via oral na dose calculada pelo peso, a cada 24 horas, por pelo menos 28 dias.',
    safetyAlert: 'Ajustar dosagem em nefropatas crônicos. Não administrar isoladamente em quadros de dor aguda excruciante.',
    price: { averageLabel: 'Variável', rangeLabel: 'Genéricos humanos e manipulados veterinários sob orçamento direto', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/91643239a/mantidan-100mg-com-30-comprimidos-momenta.jpg'
  },
  {
    id: 'pregabalina-humana-manipulada',
    slug: 'pregabalina',
    name: 'Pregabalina',
    manufacturer: 'Genéricos humanos / manipulado veterinário',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://consultaremedios.com.br/pregabalina/bula',
    labelUrl: 'https://consultaremedios.com.br/pregabalina/bula',
    species: ['dog', 'cat'],
    presentations: [
      'Pregabalina humana 25 mg, 50 mg, 75 mg e 150 mg',
      'Fórmulas manipuladas sob medida (cápsula ou suspensão oral)'
    ],
    activeComponents: ['pregabalina'],
    labelCompositionSummary: 'Pregabalina. Cápsulas comerciais humanas comuns (25 mg, 50 mg, 75 mg, 150 mg) ou manipulação customizada.',
    labelDirections: 'Uso extra-bula / literatura veterinária. Cães e gatos: 1 a 2 mg/kg por via oral, a cada 12 horas (duas vezes ao dia), conforme tolerância e grau de sedação.',
    dosageGuidance: {
      labelDose: 'Uso extra-bula. Literatura: 1 a 2 mg/kg VO a cada 12 horas. Alternativa à gabapentina.',
      plumbs: {
        dog: [
          { title: 'Dor neuropática / Sensibilização', dose: '1 a 2 mg/kg VO a cada 12 horas', note: 'Iniciar no limite baixo e titular. Tem perfil de absorção mais previsível que gabapentina.' }
        ],
        cat: [
          { title: 'Dor crônica de osteoartrite', dose: '1 a 2 mg/kg VO a cada 12 ou 24 horas', note: 'Acompanhar sedação e ataxia. Útil quando há má aceitação da gabapentina.' }
        ]
      }
    },
    plumbsContext: 'Gabapentinoide com ligação de alta afinidade aos canais de cálcio voltagem-dependentes. Pode propiciar absorção mais linear que gabapentina em alguns indivíduos.',
    clinicalUse: 'Adjuvante avançado na dor neuropática severa, dor crônica de osteoartrite com sensibilização central e dores em coluna com radiculopatias.',
    reassessment: 'Monitorar letargia, ataxia ou fraqueza pélvica. Não suspender o uso prolongado de forma abrupta.',
    prescriptionExample: 'Pregabalina [concentração], administrar por via oral na dose calculada pelo peso, a cada 12 horas, pelo período determinado.',
    safetyAlert: 'Ajustar a dose em portadores de disfunção renal progressiva. Monitorar a coadministração com outros agentes sedativos.',
    price: { averageLabel: 'Variável', rangeLabel: 'Genéricos humanos e manipulados veterinários variam sob consulta local', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/92197694f/dorene-liquido-25mg-ml-solucao-oral-60ml-ache.jpg'
  },
  {
    id: 'librela-zoetis',
    slug: 'librela',
    name: 'Librela',
    manufacturer: 'Zoetis',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/dor-e-inflamacao/librela/',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Dor-e-inflamacao/Librela/_assets/Bula-Librela-v3-080221.pdf',
    species: ['dog'],
    presentations: [
      'Librela 5 mg / 1 mL (frasco)',
      'Librela 10 mg / 1 mL (frasco)',
      'Librela 15 mg / 1 mL (frasco)',
      'Librela 20 mg / 1 mL (frasco)',
      'Librela 30 mg / 1 mL (frasco)'
    ],
    activeComponents: ['bedinvetmab'],
    labelCompositionSummary: 'Bedinvetmab. Solução injetável contendo 5 mg, 10 mg, 15 mg, 20 mg ou 30 mg de bedinvetmab por frasco de 1 mL.',
    labelDirections: 'Cães: 0,5 a 1,0 mg/kg por via subcutânea, uma vez ao mês (a cada 30 dias). Administrar o conteúdo inteiro do frasco correspondente à faixa de peso.',
    dosageGuidance: {
      labelDose: 'Cães: 0,5 a 1 mg/kg SC mensal. Faixas de peso: 5-10kg (5mg), 10.1-20kg (10mg), 20.1-30kg (15mg), 30.1-40kg (20mg), 40.1-60kg (30mg).',
      plumbs: {
        dog: [
          { title: 'Dor associada à osteoartrite', dose: '0,5 a 1 mg/kg SC mensal', note: 'Anticorpo monoclonal caninizado que neutraliza o NGF. Não depende de metabolismo hepático ou renal convencional.' }
        ]
      }
    },
    plumbsContext: 'Bedinvetmab é um anticorpo monoclonal caninizado anti-NGF (Fator de Crescimento Nervoso). NGF está superregulado na osteoartrite e estimula a via de dor. Excelente opção para renais e cardiopatas.',
    clinicalUse: 'Alívio e controle da dor crônica associada à osteoartrite em cães de todas as idades (acima de 12 meses).',
    reassessment: 'Avaliar a resposta clínica em mobilidade, comportamento e dor após 1 a 2 aplicações consecutivas.',
    prescriptionExample: 'Librela [apresentação conforme peso], aplicação subcutânea mensal de 1 frasco por via subcutânea executada por médico-veterinário.',
    safetyAlert: 'Não usar em cães com menos de 12 meses de idade. Não indicado para gestantes, lactantes ou animais de reprodução. Risco de formação de anticorpos secundários.',
    price: { averageLabel: 'Variável', rangeLabel: 'Uso clínico exclusivo; valores por ampola sob consulta em clínicas ou distribuidores', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://www.veterinaria-atual.pt/wp-content/uploads/sites/4/2021/04/Librela-All-Sizes-Carton-Beauty-Shot-White-Background-UK-IE-LV-LT-ET-PNG-Image-Global-e1618506384851.jpg'
  },
  {
    id: 'solensia-zoetis',
    slug: 'solensia',
    name: 'Solensia',
    manufacturer: 'Zoetis',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/dor-e-inflamacao/solensia/',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Bulario/_assets/Solensia.pdf',
    species: ['cat'],
    presentations: ['Solensia 7 mg / 1 mL (frasco)'],
    activeComponents: ['frunevetmab'],
    labelCompositionSummary: 'Frunevetmab 7 mg por mL. Anticorpo monoclonal felinizado anti-NGF.',
    labelDirections: 'Gatos: 1 a 2,8 mg/kg por via subcutânea, uma vez ao mês (a cada 30 dias). Dose: gatos de 2,5 a 7,0 kg recebem 1 frasco de 1 mL; gatos de 7,1 a 14,0 kg recebem 2 frascos.',
    dosageGuidance: {
      labelDose: 'Gatos: 1 a 2,8 mg/kg SC mensal. Gatos de 2,5 a 7 kg: 1 frasco (7mg). Gatos de 7,1 a 14 kg: 2 frascos (14mg).',
      plumbs: {
        cat: [
          { title: 'Dor associada à osteoartrite felina', dose: '1 frasco (7 mg) SC a cada 30 dias para gatos até 7 kg', note: 'Anticorpo monoclonal felinizado anti-NGF. Reduz drasticamente a alodinia e sensibilização sem toxicidade renal.' }
        ]
      }
    },
    plumbsContext: 'Frunevetmab é um anticorpo monoclonal felinizado anti-NGF. Oferece controle analgésico revolucionário para osteoartrite felina crônica, especialmente em gatos geriátricos com DRC.',
    clinicalUse: 'Tratamento e controle da dor crônica associada à osteoartrite felina, promovendo ganho rápido de mobilidade e vitalidade.',
    reassessment: 'Avaliar o comportamento, capacidade de saltar e qualidade de vida do felino a cada aplicação mensal.',
    prescriptionExample: 'Solensia 7 mg/mL, aplicar 1 frasco por via subcutânea a cada 30 dias. Aplicação realizada em ambiente clínico por médico-veterinário.',
    safetyAlert: 'Não usar em gatos com menos de 12 meses de idade ou com peso inferior a 2,5 kg. Contraindicado em gestação, lactação e reprodução.',
    price: { averageLabel: 'Variável', rangeLabel: 'Produto hospitalar/clínico; cotação por frasco em clínicas cadastradas', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://rbldistribuidora.agilecdn.com.br/80969.jpg'
  },
  {
    id: 'cartrophen-vet-biopharm',
    slug: 'cartrophen',
    name: 'Cartrophen Vet',
    manufacturer: 'Biopharm / Covetrus',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://cartrophen.com.br/cartrophen-caes-2/',
    labelUrl: 'https://abasevet.com.br/wp-content/uploads/2022/05/CARTROPHEN_CAES_FOLHETO-A4_PDF_email.pdf',
    species: ['dog'],
    presentations: ['Cartrophen Vet 10% (frasco 10 mL)'],
    activeComponents: ['pentosano polissulfato sódico'],
    labelCompositionSummary: 'Pentosano polissulfato sódico 100 mg/mL. DMOAD injetável.',
    labelDirections: 'Cães: 3 mg/kg por via subcutânea, em intervalos de 5 a 7 dias, completando ciclo de 4 aplicações. Protocolo executado por médico-veterinário.',
    dosageGuidance: {
      labelDose: 'Cães: 3 mg/kg por via subcutânea, completando ciclo de 4 aplicações com intervalo semanal.',
      plumbs: {
        dog: [
          { title: 'Doença articular degenerativa (DMOAD)', dose: '3 mg/kg SC semanal por 4 semanas', note: 'Droga modificadora da osteoartrite (DMOAD). Pode repetir o ciclo após alguns meses conforme avaliação.' }
        ]
      }
    },
    plumbsContext: 'Pentosano polissulfato sódico (PPS) estimula a síntese de cartilagem e ácido hialurônico, além de atenuar enzimas degradativas. Possui atividade anticoagulante/fibrinolítica leve.',
    clinicalUse: 'Tratamento de osteoartrites, osteocondrose, traumas articulares e pós-operatórios de procedimentos intra-articulares em cães.',
    reassessment: 'Acompanhar claudicação e grau de dor durante e após a conclusão do ciclo de 4 semanas.',
    prescriptionExample: 'Cartrophen Vet 10%, aplicação de 3 mg/kg por via subcutânea, uma vez por semana, por 4 semanas consecutivas. Aplicação clínica.',
    safetyAlert: 'Contraindicado em cães com coagulopatias, trombocitopenia, hemorragia ativa ou cirurgia de grande porte planejada. Não associar com aspirina ou outros anticoagulantes.',
    price: { averageLabel: 'Variável', rangeLabel: 'Frasco 10 mL de uso clínico exclusivo; preço sob consulta direta no distribuidor', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://cdn.awsli.com.br/2500x2500/2643/2643862/produto/2466679626b21b83904.jpg'
  },
  {
    id: 'condroplex-avert',
    slug: 'condroplex',
    name: 'CondroPlex',
    manufacturer: 'Avert',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://www.avertsaudeanimal.com.br/linhas/articular/condroplex-500-capsulas',
    labelUrl: 'https://avertsaudeanimal.com.br/linhas/articular/condroplex-lb',
    species: ['dog', 'cat'],
    presentations: [
      'CondroPlex 500 cápsulas (60 cáps.)',
      'CondroPlex 1000 cápsulas (60 cáps.)',
      'CondroPlex LB comprimidos (60 comp.)',
      'CondroPlex Pasta (bisnaga 60 g)',
      'CondroPlex Sticks (sachê 315 g)'
    ],
    activeComponents: ['sulfato de condroitina', 'sulfato de glicosamina', 'colágeno hidrolisado', 'zinco', 'manganês'],
    labelCompositionSummary: 'Nutrientes articulares. Contém sulfato de condroitina, sulfato de glicosamina, colágeno hidrolisado, zinco e manganês queratados.',
    labelDirections: 'Suplementação inicial por 42 dias: CondroPlex 500: 1 cápsula/5 kg de peso SID. CondroPlex 1000: 1 cápsula/10 kg de peso SID. CondroPlex LB: 1 comprimido/25 kg de peso SID. CondroPlex Pasta gatos: 1 g para cada 5 kg SID.',
    dosageGuidance: {
      labelDose: 'Suplementação inicial por 42 dias na dosagem do fabricante; depois iniciar dose de manutenção (geralmente metade ou em dias alternados).',
      plumbs: {
        dog: [
          { title: 'Suplementação articular', dose: 'CondroPlex 1000: 1 cápsula para cada 10 kg VO SID', note: 'Glucosamina e condroitina atuam como precursores de cartilagem.' }
        ],
        cat: [
          { title: 'Suporte articular felino', dose: 'CondroPlex 500 ou Pasta: 1 cápsula ou 1 g para cada 5 kg VO SID', note: 'Altamente palatável. Ajuda na manutenção de cartilagem e viscosidade sinovial.' }
        ]
      }
    },
    plumbsContext: 'Glucosamina e condroitina são suplementos nutricionais. Atuam como blocos de construção para glicosaminoglicanos. Eficácia clínica individual é variável; resposta lenta (2 a 6 semanas).',
    clinicalUse: 'Suplemento alimentar com nutrientes articulares, indicado como adjuvante em osteoartrites, displasias coxofemorais, pós-operatórios ortopédicos e animais sob exercício intenso.',
    reassessment: 'Avaliar o conforto e a mobilidade do animal após o período inicial de 42 dias para decidir sobre a manutenção.',
    prescriptionExample: 'CondroPlex 1000, administrar 1 cápsula por via oral a cada 24 horas, inicialmente por 42 dias consecutivos ou conforme prescrição.',
    safetyAlert: 'Suplemento. Usar com cautela em animais diabéticos ou com histórico de hipersensibilidade gastrointestinal aos componentes.',
    price: { averageLabel: 'R$ 59,90 a R$ 222,90', rangeLabel: '500 comp: R$ 59,90-74,90; 1000 comp: R$ 87,90-109,90; LB: R$ 160,50-200,90; Sticks: R$ 177,90-222,90; Pasta gatos: R$ 107,90-134,90', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1008541/condroplex-1000-60-comprimidos-caes-avert-Principal.jpg?v=638132740118630000'
  },
  {
    id: 'condromax-pet-ourofino',
    slug: 'condromax-pet',
    name: 'Condromax Pet',
    manufacturer: 'Ourofino',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://www.ourofinopet.com/produtos/suplementos/condromax-pet/',
    labelUrl: 'https://www.ourofinopet.com/produtos/suplementos/condromax-pet/304/',
    species: ['dog', 'cat'],
    presentations: ['Condromax Pet tabletes mastigáveis (30 ou 90 tabletes)'],
    activeComponents: ['sulfato de condroitina', 'glucosamina', 'cobre', 'manganês', 'zinco'],
    labelCompositionSummary: 'Mucopolissacarídeos (condroitina e glucosamina), cobre quelatado, manganês quelatado, zinco quelatado.',
    labelDirections: 'Cães e gatos: administrar por via oral, uma vez ao dia antes das refeições, por no mínimo 30 dias. Dose inicial: Até 10 kg: 1/2 tablete; De 11 a 20 kg: 1 tablete; De 21 a 40 kg: 2 tabletes; Acima de 40 kg: 3 tabletes.',
    dosageGuidance: {
      labelDose: 'Cães e gatos: Administrar 1 vez ao dia antes das refeições por 30 dias consecutivos. Dose conforme faixas de peso.',
      plumbs: {
        dog: [
          { title: 'Condroproteção e suporte mineral', dose: '11 a 20 kg: 1 tablete mastigável VO SID', note: 'Fornece mucopolissacarídeos e minerais essenciais à saúde da cartilagem.' }
        ],
        cat: [
          { title: 'Condroproteção em gatos', dose: 'Gatos até 10 kg: 1/2 tablete mastigável VO SID', note: 'Altamente palatável. Tabletes podem ser oferecidos diretamente ou misturados ao alimento.' }
        ]
      }
    },
    plumbsContext: 'Nutrientes e glicosaminoglicanos que dão suporte à estrutura da matriz cartilaginosa e do líquido sinovial. Bem tolerados por via oral.',
    clinicalUse: 'Suplementação de condroitina, glucosamina e minerais em cães e gatos sob constante exercício físico, crescimento ou osteoartrites.',
    reassessment: 'Reavaliar após o primeiro ciclo de 30 dias para decidir sobre suspensão ou manutenção.',
    prescriptionExample: 'Condromax Pet tabletes, administrar 1/2 tablete por via oral a cada 24 horas, antes da refeição, por no mínimo 30 dias.',
    safetyAlert: 'Suplemento mineral com condroitina e glucosamina. Usar com cautela em portadores de diabetes mellitus ou alergia a crustáceos.',
    price: { averageLabel: 'R$ 67,41 a R$ 180,00', rangeLabel: 'Frasco 30 tabletes: R$ 67,41 a R$ 74,90; Frasco 90 tabletes: R$ 162,00 a R$ 180,00', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1097756/Suplemento-para-Caes-e-Gatos-Condromax-Pet-30-comp.webp?v=639078082419630000'
  },
  {
    id: 'condroton-vetnil',
    slug: 'condroton',
    name: 'Condroton',
    manufacturer: 'Vetnil',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://vetnil.com.br/produto/condroton-r/',
    labelUrl: 'https://consultaremedios.com.br/condroton-uso-veterinario/bula',
    species: ['dog'],
    presentations: ['Condroton 500 mg (60 comp.)', 'Condroton 1000 mg (60 comp.)', 'Condroton injetável 10 mL'],
    activeComponents: ['sulfato de condroitina A'],
    labelCompositionSummary: 'Condroprotetor à base de sulfato de glicosamina + sulfato de condroitina, em comprimidos de 500 mg ou 1000 mg.',
    labelDirections: 'Uso oral em cães. Condroton 500 mg: até 5 kg, 1 comp SID na dose inicial e 1 comp em dias alternados na manutenção; 5 a 10 kg, 1 comp BID inicialmente e 1 comp SID na manutenção. Condroton 1000 mg: 10 a 15 kg, 1 comp BID inicialmente e 1 comp SID na manutenção; 15 a 25 kg, 1,5 comp BID inicialmente e 1 comp SID na manutenção; 25 a 50 kg, 2 comp BID inicialmente e 2 comp SID na manutenção; acima de 50 kg, 3 comp BID inicialmente e 2 comp SID na manutenção.',
    dosageGuidance: {
      labelDose: 'Cães: dose por faixa de peso e apresentação. Usar dose inicial mais intensa e reduzir para manutenção conforme bula e resposta clínica.',
      plumbs: {
        dog: [
          { title: 'Até 10 kg - Condroton 500 mg', dose: 'Até 5 kg: 1 comp SID; 5 a 10 kg: 1 comp BID', note: 'Manutenção: até 5 kg em dias alternados; 5 a 10 kg, 1 comp SID.' },
          { title: '10 a 25 kg - Condroton 1000 mg', dose: '10 a 15 kg: 1 comp BID; 15 a 25 kg: 1,5 comp BID', note: 'Manutenção usual: 1 comp SID.' },
          { title: 'Acima de 25 kg - Condroton 1000 mg', dose: '25 a 50 kg: 2 comp BID; >50 kg: 3 comp BID', note: 'Manutenção: 2 comp SID; pode reduzir conforme resposta e orientação.' }
        ]
      }
    },
    plumbsContext: 'Condroitina/glucosamina são suplementos/condroprotetores com evidência variável. Usar como adjuvante, não como substituto de analgesia, controle de peso e reabilitação.',
    clinicalUse: 'Suporte em osteoartrite, displasia, pós-operatório articular e animais com esforço físico, como parte de manejo multimodal.',
    reassessment: 'Reavaliar dor, claudicação e mobilidade após 4 a 8 semanas; ajustar o plano se não houver ganho funcional.',
    prescriptionExample: 'Condroton [500 mg ou 1000 mg], administrar por via oral conforme faixa de peso e orientação do fabricante, pelo período prescrito.',
    safetyAlert: 'Suplemento/condroprotetor. Não substitui AINE, anticorpo monoclonal, reabilitação ou cirurgia quando indicados.',
    price: { averageLabel: 'R$ 177,90 a R$ 304,90', rangeLabel: 'Condroton 500 mg 60 comp. cerca de R$ 177,90-204,90; 1000 mg 60 comp. cerca de R$ 267,90-304,90', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1056588/condroton-500mg-vetnil-60-comprimidos.jpg'
  },
  {
    id: 'flexadin-advanced-vetoquinol',
    slug: 'flexadin-advanced',
    name: 'Flexadin Advanced',
    manufacturer: 'Vetoquinol',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://www.vetoquinol.com.br/products/flexadinr-advanced-caes',
    labelUrl: 'https://www.vetoquinol.com.br/products/flexadinr-advanced-caes',
    species: ['dog'],
    presentations: ['Flexadin Advanced Cães tabletes mastigáveis'],
    activeComponents: ['UC-II', 'colágeno tipo II não desnaturado', 'ômega 3', 'vitamina E'],
    labelCompositionSummary: 'Suplemento articular com colágeno tipo II não desnaturado, ômega 3 e vitamina E.',
    labelDirections: 'Cães: oferecer 1 tablete por via oral, uma vez ao dia, independentemente do tamanho do cão. Uso inicial recomendado por 3 meses.',
    dosageGuidance: {
      labelDose: 'Cães: 1 tablete VO SID, independentemente do peso, por período inicial de 3 meses ou conforme prescrição.',
      plumbs: {
        dog: [
          { title: 'Suporte articular com UC-II', dose: '1 tablete VO SID conforme fabricante', note: 'Adjuvante para mobilidade; não é analgésico de resgate.' }
        ]
      }
    },
    plumbsContext: 'UC-II e suplementos articulares são adjuvantes; benefício depende do produto e do paciente, com resposta lenta.',
    clinicalUse: 'Suporte de mobilidade e flexibilidade em cães com risco articular ou osteoartrite, junto a controle de peso e reabilitação.',
    reassessment: 'Reavaliar mobilidade e conforto após 4 a 8 semanas.',
    prescriptionExample: 'Flexadin Advanced Cães, administrar 1 tablete por via oral, uma vez ao dia, diretamente na boca ou misturado ao alimento, pelo período prescrito.',
    safetyAlert: 'Suplemento. Cautela em alergia a frango/aves ou componentes da fórmula. Não prometer efeito imediato.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado nesta rodada', sourceDate: '2026-05-25', notes: 'Dados incompletos' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/307150/FLEXADIN.jpg?v=638265190104100000'
  },
  {
    id: 'osteosyn-konig',
    slug: 'osteosyn',
    name: 'Osteosyn',
    manufacturer: 'König',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://www.cobasi.com.br/osteosyn-60-comprimidos-konig-3627836/p',
    labelUrl: 'https://www.cobasi.com.br/osteosyn-60-comprimidos-konig-3627836/p',
    species: ['dog', 'cat'],
    presentations: ['Osteosyn 660 mg (60 comp.)', 'Osteosyn 2000 mg (60 comp.)'],
    activeComponents: ['sulfato de condroitina', 'glucosamina', 'aminoácidos', 'ômega 3', 'vitamina E', 'probióticos'],
    labelCompositionSummary: 'Suplemento articular com condroitina, glucosamina, aminoácidos, ômega 3, vitamina E e probióticos, conforme descrição comercial.',
    labelDirections: 'Dose diária recomendada conforme peso: até 10 kg, 1 comprimido de 660 mg SID; 10,1 a 20 kg, 2 comprimidos de 660 mg SID; 20,1 a 30 kg, 1 comprimido de 2000 mg SID; acima de 30,1 kg, 2 comprimidos de 2000 mg SID. Pode fracionar no período de 24 horas conforme orientação veterinária.',
    dosageGuidance: {
      labelDose: 'Cães e gatos: dose por faixa de peso. Até 20 kg usar apresentação 660 mg; acima de 20 kg usar 2000 mg.',
      plumbs: {
        dog: [
          { title: 'Até 20 kg', dose: 'Até 10 kg: 1 comp 660 mg SID; 10,1 a 20 kg: 2 comp 660 mg SID', note: 'Pode ser administrado direto na boca ou misturado ao alimento.' },
          { title: 'Acima de 20 kg', dose: '20,1 a 30 kg: 1 comp 2000 mg SID; >30,1 kg: 2 comp 2000 mg SID', note: 'Suplemento adjuvante; avaliar resposta em 4 a 8 semanas.' }
        ],
        cat: [
          { title: 'Até 10 kg', dose: '1 comp 660 mg VO SID', note: 'Usar como suporte articular adjuvante, não como analgesia de resgate.' }
        ]
      }
    },
    plumbsContext: 'Suplemento articular. Condroitina/glucosamina são adjuvantes com benefício individual variável.',
    clinicalUse: 'Suporte articular em cães e gatos, como adjuvante em degeneração cartilaginosa/óssea e osteoartrite.',
    reassessment: 'Reavaliar em 4 a 8 semanas; não usar como substituto de analgesia em paciente doloroso.',
    prescriptionExample: 'Osteosyn [660 mg ou 2000 mg], administrar por via oral conforme faixa de peso, a cada 24 horas, diretamente na boca ou misturado ao alimento, pelo período prescrito.',
    safetyAlert: 'Suplemento, não analgésico de resgate. Cautela em intolerância gastrointestinal ou alergia alimentar.',
    price: { averageLabel: 'R$ 148,95 a R$ 247,90', rangeLabel: 'Osteosyn 660 mg cerca de R$ 148,95-165,50; 2000 mg cerca de R$ 198,32-247,90', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/942433/suplemento-alimentar-osteosyn-60-comprimidos-660-mg.jpg?v=638157174133000000'
  },
  {
    id: 'gerioox-labyes',
    slug: 'gerioox',
    name: 'Gerioox',
    manufacturer: 'Labyes',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://labyes.com/pt-br/productos/gerioox/',
    labelUrl: 'https://consultaremedios.com.br/gerioox-para-caes-e-gatos/bula',
    species: ['dog', 'cat'],
    presentations: ['Gerioox 30 comprimidos'],
    activeComponents: ['ômega 3', 'antioxidantes', 'condroprotetores'],
    labelCompositionSummary: 'Suplemento/medicamento geriátrico com ácidos graxos ômega 3, antioxidantes e componentes condroprotetores.',
    labelDirections: 'Cães e gatos até 10 kg: 1/2 comprimido SID. Cães 10 a 25 kg: 1 comprimido SID. Cães acima de 25 kg: 2 comprimidos SID.',
    dosageGuidance: {
      labelDose: 'Até 10 kg: 1/2 comp VO SID; cães 10-25 kg: 1 comp VO SID; cães >25 kg: 2 comp VO SID.',
      plumbs: {
        dog: [
          { title: 'Suporte geriátrico/articular', dose: '10 a 25 kg: 1 comprimido VO SID', note: 'Adjuvante com ômega 3, antioxidantes e condroprotetores.' }
        ],
        cat: [
          { title: 'Suporte geriátrico/articular', dose: 'até 10 kg: 1/2 comprimido VO SID', note: 'Adjuvante; confirmar aceitação e tolerância gastrointestinal.' }
        ]
      }
    },
    plumbsContext: 'Produto adjuvante geriátrico. Para ômega 3 terapêutico, calcular EPA + DHA quando o rótulo estiver disponível.',
    clinicalUse: 'Suporte em pacientes idosos, artrose, doença degenerativa, nefropatas/cardiopatas crônicos e convalescentes, sem substituir tratamento específico.',
    reassessment: 'Reavaliar mobilidade, disposição, escore corporal, fezes e apetite após 4 a 8 semanas.',
    prescriptionExample: 'Gerioox, administrar por via oral conforme faixa de peso, a cada 24 horas, como adjuvante no manejo geriátrico/articular.',
    safetyAlert: 'Adjuvante. Se houver dose relevante de ômega 3, cautela em pancreatite, coagulopatias e uso com anticoagulantes/antiagregantes.',
    price: { averageLabel: 'R$ 375,45 a R$ 441,50', rangeLabel: 'Gerioox 30 comprimidos em varejo online nessa faixa', sourceDate: '2026-05-25' },
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/224922/gerioox_x30_BRASIL_2019_-1-.jpg?v=638814678959230000'
  },
  {
    id: 'elura-elanco',
    slug: 'elura',
    name: 'Elura',
    manufacturer: 'Elanco',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_orexigenic',
    productPageUrl: 'https://vet.elanco.com/br/produtos/elura',
    labelUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/685da15e-09cf-49da-a5f8-cee645a035d8/lamina%20dosagem%20Web.pdf',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/691d310f-e23e-48bb-a69d-a845f67bf346/Asset15%20%281%29.png',
    species: ['cat'],
    presentations: ['Elura 20 mg/mL (solução oral 15 mL)'],
    activeComponents: ['capromorelina'],
    labelCompositionSummary: 'Capromorelina 20 mg/mL em solução oral para gatos.',
    labelDirections: 'Administrar 2 mg/kg (0,1 mL/kg) por via oral, uma vez ao dia (SID), utilizando a seringa dosadora fornecida.',
    dosageGuidance: {
      labelDose: 'Gatos: 2 mg/kg (0,1 mL/kg) VO SID.',
      plumbs: {
        cat: [
          { title: 'Estímulo de apetite / DRC', dose: '2 mg/kg (0,1 mL/kg) VO SID', note: 'Administrar com seringa dosadora; preferencialmente com o estômago vazio para melhor absorção (30 min antes da refeição).' }
        ]
      }
    },
    plumbsContext: 'Agonista seletivo do receptor de grelina. Estimula a liberação de hormônio do crescimento e o apetite.',
    clinicalUse: 'Estímulo de apetite e controle da perda de peso em gatos com Doença Renal Crônica (DRC).',
    reassessment: 'Monitorar peso corporal, consumo alimentar, hidratação, comportamento e glicemia (principalmente em diabéticos).',
    prescriptionExample: 'Elura 20 mg/mL, administrar por via oral na dose de 0,1 mL para cada kg de peso (2 mg/kg), uma vez ao dia, utilizando a seringa dosadora.',
    safetyAlert: 'Contraindicado em gatos com hipersensibilidade à capromorelina. Usar com cautela em gatos com disfunção hepática grave, doença cardíaca grave ou diabetes mellitus (pode elevar a glicemia transitoriamente). Segurança não avaliada em filhotes com menos de 5 meses, gatas gestantes ou lactantes.',
    price: { averageLabel: 'R$ 290 a R$ 480', rangeLabel: 'Frasco de 15 mL', sourceDate: '2026-05-28' }
  },
  {
    id: 'rimadyl-comprimidos-zoetis',
    slug: 'rimadyl-comprimidos',
    name: 'Rimadyl Comprimidos Mastigáveis',
    manufacturer: 'Zoetis',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/dor-e-inflamacao/rimadyl-comprimidos-mastigaveis/',
    labelUrl: 'https://www.zoetis.com.br/_locale-assets/arquivos/animais-de-companhia/bula-rim-chew.pdf',
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/1385194/rimadyl_100mg_anti_inflamatorio_14_comprimidos_zoetis_197_1_eb92a54c9658abee37303356f5cf86af.jpg',
    species: ['dog'],
    presentations: ['Rimadyl 25 mg', 'Rimadyl 75 mg', 'Rimadyl 100 mg'],
    activeComponents: ['carprofeno'],
    labelCompositionSummary: 'Carprofeno em comprimidos mastigáveis de 25, 75 e 100 mg para cães.',
    labelDirections: 'Cães: 4,4 mg/kg VO a cada 24 h ou 2,2 mg/kg VO a cada 12 h. Para dor cirúrgica, pode ser administrado cerca de 2 h antes do procedimento conforme bula.',
    dosageGuidance: {
      labelDose: 'Cães: 4,4 mg/kg VO SID ou 2,2 mg/kg VO BID.',
      plumbs: { dog: [{ title: 'Dor/inflamação ortopédica', dose: '4,4 mg/kg/dia VO, em SID ou dividido BID', note: 'Dose clássica de carprofeno em cães.' }] }
    },
    plumbsContext: 'Carprofeno é AINE usado em cães para osteoartrite e dor pós-operatória. Não extrapolar para gatos como rotina domiciliar.',
    clinicalUse: 'Osteoartrite, dor e inflamação musculoesquelética e controle de dor associada a cirurgias ortopédicas/tecidos moles.',
    reassessment: 'Reavaliar dor, apetite, vômitos, diarreia, melena, função renal/hepática e necessidade de continuidade.',
    prescriptionExample: 'Rimadyl [25, 75 ou 100 mg], administrar por via oral na dose calculada, a cada 12 ou 24 horas conforme prescrição.',
    safetyAlert: 'Não usar em gatos. Não associar com corticoide ou outro AINE. Cautela em DRC, hepatopatia, desidratação, hipovolemia e doença gastrointestinal.',
    price: { averageLabel: 'R$ 78 a R$ 144', rangeLabel: '25/75/100 mg conforme apresentação', sourceDate: '2026-06-07' }
  },
  {
    id: 'rimadyl-injetavel-zoetis',
    slug: 'rimadyl-injetavel',
    name: 'Rimadyl Injetável',
    manufacturer: 'Zoetis',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://www.zoetis.com.br/especies/animais-de-companhia/rimadyl-solucao-injetavel.aspx',
    imageUrl: 'https://www.zoetis.com.br/_locale-assets/img/animais-de-companhia/fotos-produtos/rimadyl-solucao-injetavel-zoetis.jpg',
    labelUrl: 'https://www.zoetis.com.br/global-assets/private/rimadyl_2.pdf',
    species: ['dog'],
    presentations: ['Rimadyl solução injetável 20 mL'],
    activeComponents: ['carprofeno'],
    labelCompositionSummary: 'Carprofeno em apresentação injetável para uso clínico em cães.',
    labelDirections: 'Uso clínico/hospitalar. Aplicação por médico-veterinário conforme bula e protocolo perioperatório.',
    dosageGuidance: { labelDose: 'Uso hospitalar: seguir bula e protocolo anestésico/analgésico.', plumbs: { dog: [{ title: 'Perioperatório / hospitalar', dose: 'Dose conforme bula/protocolo do carprofeno injetável', note: 'Não é medicação domiciliar.' }] } },
    plumbsContext: 'Mesmos cuidados farmacológicos do carprofeno; risco renal, gastrointestinal e hepático aumenta em hipovolemia/hipotensão.',
    clinicalUse: 'Dor e inflamação associadas à osteoartrite, cirurgias ortopédicas e tecidos moles em cães, em ambiente clínico.',
    reassessment: 'Monitorar dor, hidratação, perfusão, vômitos, melena e parâmetros laboratoriais quando indicado.',
    prescriptionExample: 'Rimadyl injetável: uso e aplicação exclusivamente por médico-veterinário em ambiente clínico.',
    safetyAlert: 'Não usar em gatos. Evitar em hipovolemia, hipotensão, DRC/IRA, hepatopatia, sangramento GI e associação com corticoide/outro AINE.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra clínica/hospitalar', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'revolution-plus-zoetis',
    slug: 'revolution-plus',
    name: 'Revolution Plus',
    manufacturer: 'Zoetis',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_isoxazoline_cat',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/',
    imageUrl: 'https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt6087128bb7c9084b/686fec6f3486028655c9c3a9/img-revolution-plus-product-update.webp',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Bulario/_assets/Revolution-Plus.pdf',
    species: ['cat'],
    presentations: ['Pipetas para gatos por faixa de peso'],
    activeComponents: ['selamectina', 'sarolaner'],
    labelCompositionSummary: 'Endectocida tópico felino com selamectina + sarolaner.',
    labelDirections: 'Gatos: aplicação tópica mensal conforme tabela de peso; bula cita dose mínima de selamectina e sarolaner por faixa.',
    dosageGuidance: { labelDose: 'Gatos: 1 pipeta tópica mensal conforme peso.', plumbs: { cat: [{ title: 'Antiparasitário mensal felino', dose: 'Selamectina mínimo 6 mg/kg + sarolaner mínimo 1 mg/kg, tópico mensal', note: 'Usar pipeta correta por faixa de peso.' }] } },
    plumbsContext: 'Associação de lactona macrocíclica com isoxazolina. Manter alerta neurológico por sarolaner.',
    clinicalUse: 'Controle mensal de pulgas, carrapatos, ácaros e vermes conforme bula felina.',
    reassessment: 'Reavaliar infestação, prurido, tolerância cutânea e exposição ambiental mensalmente.',
    prescriptionExample: 'Revolution Plus, aplicar 1 pipeta correspondente ao peso do gato, topicamente, a cada 30 dias.',
    safetyAlert: 'Somente gatos. Evitar ingestão oral; cautela em histórico neurológico e em gestantes/lactantes, pois segurança pode não estar estabelecida.',
    price: { averageLabel: 'Cerca de R$ 110 por pipeta', rangeLabel: 'Varia conforme faixa de peso e varejo', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'proheart-sr12-zoetis',
    slug: 'proheart-sr12',
    name: 'ProHeart SR-12',
    manufacturer: 'Zoetis',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_heartworm_prevention',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/antiparasitarios/proheart-sr-12/',
    imageUrl: 'https://dailymed.nlm.nih.gov/dailymed/image.cfm?name=proheart-12-3.jpg&setid=e856da36-f717-4645-8841-27460cf87d91&type=img',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Bulario/_assets/proheart2.pdf',
    species: ['dog'],
    presentations: ['ProHeart SR-12 solução injetável reconstituída'],
    activeComponents: ['moxidectina'],
    labelCompositionSummary: 'Moxidectina de longa ação para prevenção anual de dirofilariose em cães.',
    labelDirections: 'Cães: 0,05 mL/kg SC da suspensão reconstituída, equivalente a 1 mL/20 kg e 0,5 mg/kg de moxidectina.',
    dosageGuidance: { labelDose: 'Cães: 0,05 mL/kg SC, aplicação anual em clínica.', plumbs: { dog: [{ title: 'Prevenção de dirofilariose', dose: '0,5 mg/kg SC (0,05 mL/kg) a cada 12 meses', note: 'Uso clínico; testar conforme risco regional.' }] } },
    plumbsContext: 'Moxidectina é lactona macrocíclica/endectocida. Produto de longa ação, não domiciliar.',
    clinicalUse: 'Prevenção anual de Dirofilaria immitis e auxílio em ancilostomídeos conforme bula.',
    reassessment: 'Registrar aplicação, peso, local e status de teste de dirofilariose quando indicado.',
    prescriptionExample: 'ProHeart SR-12: aplicação subcutânea anual por médico-veterinário, na dose calculada pelo peso.',
    safetyAlert: 'Não aplicar em cães abaixo da idade mínima de bula. Testar dirofilariose conforme risco; não elimina adultos/microfilárias antigas.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra/aplicação clínica', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'convenia-zoetis',
    slug: 'convenia',
    name: 'Convenia',
    manufacturer: 'Zoetis',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/antimicrobianos/convenia/',
    imageUrl: 'https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blte020c9971433448d/6356ae009853316e58f4d28a/img_convenia-product-break-image_m.jpg',
    labelUrl: 'https://www.zoetis.com.br/_locale-assets/arquivos/animais-de-companhia/bula-convenia.pdf',
    species: ['dog', 'cat'],
    presentations: ['Convenia solução injetável 4 mL', 'Convenia solução injetável 10 mL'],
    activeComponents: ['cefovecina sódica'],
    labelCompositionSummary: 'Cefovecina 80 mg/mL após reconstituição; cefalosporina de terceira geração de longa ação.',
    labelDirections: 'Cães e gatos: 8 mg/kg SC, equivalente a 1 mL/10 kg, aplicação por médico-veterinário.',
    dosageGuidance: { labelDose: 'Cães e gatos: 8 mg/kg SC (1 mL/10 kg), uso clínico.', plumbs: { dog: [{ title: 'Infecção sensível', dose: '8 mg/kg SC dose única', note: 'Antimicrobiano de longa ação; usar com critério.' }], cat: [{ title: 'Infecção sensível', dose: '8 mg/kg SC dose única', note: 'Confirmar indicação e alergia a beta-lactâmicos.' }] } },
    plumbsContext: 'Antimicrobiano de longa ação; não deve ser usado por conveniência sem diagnóstico adequado.',
    clinicalUse: 'Infecções de pele e trato urinário em cães e gatos; em cães também auxiliar em terapia periodontal cirúrgica/mecânica.',
    reassessment: 'Reavaliar resposta clínica, cultura quando possível e sinais de reação alérgica.',
    prescriptionExample: 'Convenia: aplicação subcutânea por médico-veterinário na dose calculada, conforme diagnóstico.',
    safetyAlert: 'Cautela/evitar em alergia a beta-lactâmicos. Longa duração dificulta retirada se houver reação adversa.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra/aplicação clínica', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'palladia-zoetis',
    slug: 'palladia',
    name: 'Palladia',
    manufacturer: 'Zoetis',
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_tki',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/oncologia/palladia/',
    imageUrl: 'https://dailymed.nlm.nih.gov/dailymed/image.cfm?name=palladia-2.jpg&id=648030',
    labelUrl: 'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Oncologia/Palladia/_assets/palladia-informac%C3%B5es-de-tratamento-para-vets.pdf',
    species: ['dog'],
    presentations: ['Palladia 10 mg', 'Palladia 15 mg', 'Palladia 50 mg'],
    activeComponents: ['fosfato de toceranib'],
    labelCompositionSummary: 'Toceranib em comprimidos de 10, 15 e 50 mg; inibidor de tirosina quinase.',
    labelDirections: 'Cães: dose inicial de 3,25 mg/kg VO em dias alternados, com ajustes por protocolo oncológico e tolerância.',
    dosageGuidance: { labelDose: 'Cães: 3,25 mg/kg VO em dias alternados.', plumbs: { dog: [{ title: 'Mastocitoma canino', dose: '3,25 mg/kg VO EOD', note: 'Uso oncológico; ajustar por toxicidade/resposta.' }] } },
    plumbsContext: 'Terapia alvo oncológica. Prescrição e monitoramento devem seguir protocolo oncológico.',
    clinicalUse: 'Mastocitomas cutâneos caninos recidivantes grau II ou III, com ou sem linfonodo regional.',
    reassessment: 'Monitorar hemograma, ALT/FA, creatinina, urinálise/proteinúria, pressão, sinais GI e resposta tumoral.',
    prescriptionExample: 'Palladia [10, 15 ou 50 mg], administrar por via oral em dias alternados conforme protocolo oncológico.',
    safetyAlert: 'Manipular com luvas. Risco de vômitos, diarreia, neutropenia, hepatotoxicidade, proteinúria, hipertensão, tromboembolismo e perfuração GI.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Alto custo; geralmente sob encomenda', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'dexdomitor-zoetis',
    slug: 'dexdomitor',
    name: 'Dexdomitor',
    manufacturer: 'Zoetis',
    commercialClass: 'emergency',
    commercialSubclass: 'sedative_anesthetic',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/',
    imageUrl: 'https://ar.zoetis.com/_locale-assets/mcm-portal-assets/productos/publishingimages/dexdomitor.png',
    species: ['dog', 'cat'],
    presentations: ['Dexdomitor injetável'],
    activeComponents: ['dexmedetomidina'],
    labelCompositionSummary: 'Sedativo alfa-2 agonista injetável para cães e gatos.',
    labelDirections: 'Uso hospitalar. Dose varia por espécie, via, objetivo de sedação/analgesia e protocolo anestésico.',
    dosageGuidance: { labelDose: 'Uso hospitalar: calcular por protocolo anestésico.', plumbs: { dog: [{ title: 'Sedação/analgesia', dose: 'Dose conforme protocolo, via e estado do paciente', note: 'Monitorar cardiovascular/respiratório.' }], cat: [{ title: 'Sedação/analgesia', dose: 'Dose conforme protocolo, via e estado do paciente', note: 'Uso clínico com monitoramento.' }] } },
    plumbsContext: 'Alfa-2 agonistas produzem sedação/analgesia, mas podem causar bradicardia, vasoconstrição e depressão cardiorrespiratória.',
    clinicalUse: 'Sedação, contenção química, analgesia e composição de protocolos anestésicos em ambiente clínico.',
    reassessment: 'Monitorar FC, ritmo, pressão, perfusão, temperatura, ventilação e profundidade anestésica.',
    prescriptionExample: 'Dexdomitor: uso exclusivo hospitalar conforme protocolo anestésico do médico-veterinário.',
    safetyAlert: 'Cautela em cardiopatas, choque, hipovolemia, doença respiratória e pacientes debilitados.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra clínica/hospitalar', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'antisedan-zoetis',
    slug: 'antisedan',
    name: 'Antisedan',
    manufacturer: 'Zoetis',
    commercialClass: 'emergency',
    commercialSubclass: 'sedative_anesthetic',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/',
    imageUrl: 'https://www.shopmedvet.com/images/RXANTISEDAN-10_1.png?resizeid=3&resizeh=600&resizew=600',
    species: ['dog', 'cat'],
    presentations: ['Antisedan injetável'],
    activeComponents: ['atipamezol'],
    labelCompositionSummary: 'Antagonista alfa-2 para reversão de medetomidina/dexmedetomidina.',
    labelDirections: 'Uso hospitalar. Dose e via dependem do alfa-2 usado, espécie e protocolo.',
    dosageGuidance: { labelDose: 'Uso hospitalar: reversão de alfa-2 conforme protocolo.', plumbs: { dog: [{ title: 'Reversão alfa-2', dose: 'Dose conforme dexmedetomidina/medetomidina administrada', note: 'Monitorar recidiva de sedação.' }], cat: [{ title: 'Reversão alfa-2', dose: 'Dose conforme protocolo', note: 'Uso clínico com monitoramento.' }] } },
    plumbsContext: 'Reversor de alfa-2 agonistas; analgesia também é revertida, podendo haver retorno de dor.',
    clinicalUse: 'Reversão de sedação por dexmedetomidina/medetomidina em cães e gatos.',
    reassessment: 'Monitorar despertar, dor, FC, pressão e comportamento após reversão.',
    prescriptionExample: 'Antisedan: uso exclusivo hospitalar conforme protocolo de reversão.',
    safetyAlert: 'Não usar como rotina sem avaliar dor e estabilidade; pode haver excitação, taquicardia ou retorno de dor.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra clínica/hospitalar', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'telazol-zoetis',
    slug: 'telazol',
    name: 'Telazol',
    manufacturer: 'Zoetis',
    commercialClass: 'emergency',
    commercialSubclass: 'sedative_anesthetic',
    productPageUrl: 'https://www2.zoetis.com.br/especies/caes-e-gatos/veterinario/',
    imageUrl: 'https://dailymed.nlm.nih.gov/dailymed/image.cfm?name=telazol-1.jpg',
    species: ['dog', 'cat'],
    presentations: ['Telazol injetável'],
    activeComponents: ['tiletamina', 'zolazepam'],
    labelCompositionSummary: 'Anestésico dissociativo com benzodiazepínico para cães e gatos.',
    labelDirections: 'Uso hospitalar. Dose depende de espécie, via, contenção/anestesia e associação com outros fármacos.',
    dosageGuidance: { labelDose: 'Uso hospitalar: dose por protocolo anestésico.', plumbs: { dog: [{ title: 'Contenção/anestesia', dose: 'Dose conforme protocolo e via', note: 'Monitorar recuperação e depressão respiratória.' }], cat: [{ title: 'Contenção/anestesia', dose: 'Dose conforme protocolo e via', note: 'Uso clínico com monitoramento.' }] } },
    plumbsContext: 'Associação dissociativa/benzodiazepínica usada em contenção e anestesia; recuperação pode variar conforme espécie e dose.',
    clinicalUse: 'Contenção química e anestesia em procedimentos clínicos/cirúrgicos.',
    reassessment: 'Monitorar plano anestésico, temperatura, ventilação, analgesia e recuperação.',
    prescriptionExample: 'Telazol: uso exclusivo hospitalar conforme protocolo anestésico.',
    safetyAlert: 'Uso hospitalar. Cautela em cardiopatas, hepatopatas, nefropatas, debilitados e associação com depressores do SNC.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Compra clínica/hospitalar', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'zenrelia-elanco',
    slug: 'zenrelia',
    name: 'Zenrelia',
    manufacturer: 'Elanco',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    productPageUrl: 'https://vet.elanco.com/br/produtos/zenrelia',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/c1cabf0c-a86f-4294-b7ec-892c629d7d29/Zenrelia_Embalagem_Pack_redimensionado3.png?w=828&q=75&auto=format',
    species: ['dog'],
    presentations: ['Zenrelia 4 apresentações com 30 comprimidos'],
    activeComponents: ['ilunocitinib'],
    labelCompositionSummary: 'Inibidor de JAK oral para cães com dermatite alérgica/atópica.',
    labelDirections: 'Cães: 0,6 a 0,8 mg/kg VO a cada 24 h, conforme bula.',
    dosageGuidance: { labelDose: 'Cães: 0,6 a 0,8 mg/kg VO SID.', plumbs: { dog: [{ title: 'Prurido alérgico/atopia', dose: '0,6 a 0,8 mg/kg VO SID', note: 'Não copiar dose de Apoquel.' }] } },
    plumbsContext: 'Produto novo; usar bula. Mesma família lógica de imunomodulação JAK, mas com dose própria.',
    clinicalUse: 'Prurido associado à dermatite alérgica e atópica em cães.',
    reassessment: 'Reavaliar prurido, piodermite/Malassezia, demodicose, infecções e eventos adversos.',
    prescriptionExample: 'Zenrelia, administrar por via oral na dose calculada, a cada 24 horas, conforme prescrição.',
    safetyAlert: 'Somente cães. Avaliar infecções, demodicose, neoplasia, imunossupressão e vacinação. Não misturar dose com Apoquel.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Produto novo; preço não consolidado', sourceDate: '2026-06-07' }
  },
  {
    id: 'comfortis-elanco',
    slug: 'comfortis',
    name: 'Comfortis',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_adulticide_flea',
    productPageUrl: 'https://vet.elanco.com/br/produtos/comfortis',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/dd7cdc7a-20ee-49d6-834d-3850d9eda302/Asset%20154x%20%282%29%20%281%29.png?w=828&q=75&auto=format',
    species: ['dog', 'cat'],
    presentations: ['Comfortis comprimidos por faixa de peso'],
    activeComponents: ['spinosad'],
    labelCompositionSummary: 'Antipulgas oral mensal à base de spinosad para cães e gatos.',
    labelDirections: 'Cães e gatos: administrar comprimido conforme faixa de peso, uma vez ao mês, preferencialmente com alimento.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 comprimido mensal por faixa de peso.', plumbs: { dog: [{ title: 'Pulgas adultas', dose: 'Dose por faixa de peso mensal', note: 'Não cobre carrapatos.' }], cat: [{ title: 'Pulgas adultas', dose: 'Dose por faixa de peso mensal', note: 'Confirmar peso/idade mínimos na bula.' }] } },
    plumbsContext: 'Spinosad é antipulgas oral; não é isoxazolina e não cobre carrapatos como lotilaner/sarolaner.',
    clinicalUse: 'Eliminação de pulgas e prevenção de reinfestação por cerca de um mês.',
    reassessment: 'Reavaliar infestação ambiental e resposta clínica após 30 dias.',
    prescriptionExample: 'Comfortis, administrar 1 comprimido correspondente ao peso, por via oral, mensalmente.',
    safetyAlert: 'Cautela com uso concomitante de ivermectina em doses altas; confirmar bula e espécie/peso.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Varia por faixa de peso', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'varenzin-elanco',
    slug: 'varenzin',
    name: 'Varenzin',
    manufacturer: 'Elanco',
    commercialClass: 'renal',
    commercialSubclass: 'endocrine_erythropoiesis',
    productPageUrl: 'https://vet.elanco.com/br/produtos/varenzin',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/547a86a6-d161-44d0-9dc6-f7964bf40c8a/Produto_Varenzin.png',
    species: ['cat'],
    presentations: ['Varenzin solução oral'],
    activeComponents: ['molidustat'],
    labelCompositionSummary: 'Inibidor de HIF-PH para estimular eritropoiese endógena em gatos.',
    labelDirections: 'Gatos: 5 mg/kg VO a cada 24 h por até 28 dias consecutivos; repetir ciclo apenas após pausa mínima de 7 dias e monitoramento.',
    dosageGuidance: { labelDose: 'Gatos: 5 mg/kg VO SID por até 28 dias.', plumbs: { cat: [{ title: 'Anemia por DRC', dose: '5 mg/kg VO SID por até 28 dias', note: 'Repetir só após pausa/monitoramento.' }] } },
    plumbsContext: 'Produto específico para anemia associada à DRC felina; usar bula e monitoramento hematológico.',
    clinicalUse: 'Anemia associada à doença renal crônica em gatos.',
    reassessment: 'Monitorar hematócrito/hemoglobina, pressão arterial, trombose, fósforo, potássio, hidratação e progressão da DRC.',
    prescriptionExample: 'Varenzin, administrar por via oral na dose calculada, a cada 24 horas, por até 28 dias, conforme monitoramento.',
    safetyAlert: 'Não usar sem diagnóstico de anemia por DRC. Risco de hipertensão, policitemia/trombose e piora clínica se mal monitorado.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'fortekor-elanco',
    slug: 'fortekor',
    name: 'Fortekor',
    manufacturer: 'Elanco',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    productPageUrl: 'https://vet.elanco.com/br/produtos',
    imageUrl: 'https://my-elanco.com/wp-content/uploads/2024/06/fortekor-5mg.jpg',
    species: ['dog', 'cat'],
    presentations: ['Fortekor comprimidos conforme mercado'],
    activeComponents: ['benazepril'],
    labelCompositionSummary: 'IECA à base de benazepril; apresentação comercial deve ser confirmada por bula brasileira disponível.',
    labelDirections: 'Dose veterinária usual: cães 0,25 a 0,5 mg/kg VO q12-24h; gatos 0,25 a 0,5 mg/kg VO q24h, conforme indicação e monitoramento.',
    dosageGuidance: { labelDose: 'Cães/gatos: 0,25 a 0,5 mg/kg VO q12-24h conforme indicação.', plumbs: { dog: [{ title: 'ICC/proteinúria', dose: '0,25 a 0,5 mg/kg VO q12-24h', note: 'Monitorar creatinina, K e pressão.' }], cat: [{ title: 'DRC/proteinúria', dose: '0,25 a 0,5 mg/kg VO q24h', note: 'Uso conforme avaliação renal/PA.' }] } },
    plumbsContext: 'Benazepril é IECA cardiovascular/renal; ajustar ao paciente e monitorar função renal e potássio.',
    clinicalUse: 'ICC em cães e suporte renal/proteinúria em gatos conforme indicação de mercado e literatura.',
    reassessment: 'Monitorar creatinina, ureia, potássio, pressão arterial, hidratação e sinais de hipotensão.',
    prescriptionExample: 'Fortekor [apresentação], administrar por via oral na dose calculada, conforme intervalo prescrito.',
    safetyAlert: 'Cautela em desidratação, hipotensão, DRC instável, hipercalemia e associação com espironolactona/telmisartana.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Bula/foto brasileira não consolidada', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'atopica-elanco',
    slug: 'atopica',
    name: 'Atopica',
    manufacturer: 'Elanco / Novartis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    species: ['dog', 'cat'],
    presentations: ['Atopica cápsulas/solução conforme mercado'],
    activeComponents: ['ciclosporina'],
    productPageUrl: 'https://my.elanco.com/us/atopica-dog',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/20ecde4d-45f4-4421-ae7b-0252212cb737/AtopicaDogPackaging.png',
    labelCompositionSummary: 'Ciclosporina veterinária; apresentação brasileira deve ser confirmada antes de regra automática.',
    labelDirections: 'Plumb\'s/Atopica: cães com dermatite atópica 5 mg/kg VO SID por 30 dias e depois reduzir para dias alternados/2x semana; gatos com dermatite alérgica 7 mg/kg VO SID.',
    dosageGuidance: { labelDose: 'Cães: 5 mg/kg VO SID por 30 dias; depois reduzir frequência. Gatos: 7 mg/kg VO SID para dermatite alérgica.', plumbs: { dog: [{ title: 'Dermatite atópica', dose: '5 mg/kg VO SID por 30 dias', note: 'Depois reduzir para dias alternados ou 2x/semana na menor frequência eficaz.' }], cat: [{ title: 'Dermatite alérgica felina', dose: '7 mg/kg VO SID', note: 'Após controle, tentar reduzir para dias alternados ou 2x/semana; testar FeLV/FIV e evitar carne crua/caça.' }] } },
    plumbsContext: 'Ciclosporina é inibidor de calcineurina imunomodulador/imunossupressor; há interações relevantes com azóis e outros fármacos.',
    clinicalUse: 'Dermatite atópica canina e doença alérgica/inflamatória selecionada conforme espécie/apresentação.',
    reassessment: 'Reavaliar prurido, infecções secundárias, vômitos/diarreia, hiperplasia gengival e necessidade de associação terapêutica.',
    prescriptionExample: 'Atopica [apresentação], administrar por via oral na dose calculada: cães 5 mg/kg SID; gatos 7 mg/kg SID, com reavaliação para reduzir frequência.',
    safetyAlert: 'Cautela com neoplasia, infecção sistêmica, demodicose, vacinas vivas, azóis e hepatopatia.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Fonte brasileira/foto não consolidada', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'surosolve-elanco',
    slug: 'surosolve',
    name: 'Surosolve',
    manufacturer: 'Elanco',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_ceruminolytic',
    productPageUrl: 'https://vet.elanco.com/br/produtos/surosolve',
    imageUrl: 'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/e82b6028-a1e0-42ab-8b1b-c0fd936b2446/Asset%20164x%20%281%29.png?w=828&q=75&auto=format',
    species: ['dog', 'cat'],
    presentations: ['Surosolve solução otológica'],
    activeComponents: ['limpador auricular'],
    labelCompositionSummary: 'Limpador auricular/ceruminolítico de suporte otológico; composição quantitativa pendente de bula completa.',
    labelDirections: 'Aplicar no conduto auditivo conforme orientação do fabricante e necessidade clínica; não é dose mg/kg.',
    dosageGuidance: { labelDose: 'Cães e gatos: aplicar no ouvido conforme bula/orientação clínica.', plumbs: { dog: [{ title: 'Higiene auricular', dose: 'Aplicar quantidade suficiente, massagear e remover excesso', note: 'Não substitui tratamento de otite.' }], cat: [{ title: 'Higiene auricular', dose: 'Aplicar com cautela e conforto do paciente', note: 'Avaliar tímpano se houver otite/dor.' }] } },
    plumbsContext: 'Produto de suporte local; não é antibiótico, antifúngico ou antiparasitário.',
    clinicalUse: 'Higiene de conduto auditivo, remoção de cerúmen/oleosidade, redução de odor e suporte em rotina otológica.',
    reassessment: 'Reavaliar citologia, dor, odor, secreção e integridade timpânica em otites recorrentes.',
    prescriptionExample: 'Surosolve, aplicar no conduto auditivo conforme orientação, massagear a base da orelha e remover excesso.',
    safetyAlert: 'Não usar se houver suspeita de ruptura timpânica sem avaliação. Não substitui otoscopia/citologia e tratamento específico.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'vetoryl-dechra',
    slug: 'vetoryl',
    name: 'Vetoryl',
    manufacturer: 'Dechra',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_adrenal',
    productPageUrl: 'https://www.dechra.com.py/endocrinologia/195/vetoryl-10-mg',
    imageUrl: 'https://www.dechra.com.py/common/uploads/produtos/vetoryl-10mg-esp1813.jpg',
    species: ['dog'],
    presentations: ['Vetoryl 5 mg', 'Vetoryl 10 mg', 'Vetoryl 30 mg', 'Vetoryl 60 mg'],
    activeComponents: ['trilostano'],
    labelCompositionSummary: 'Trilostano em cápsulas para hiperadrenocorticismo canino.',
    labelDirections: 'Plumb\'s: cães, iniciar baixo em 0,5-1 mg/kg VO q12h ou cerca de 2 mg/kg VO SID com alimento; ajustar por sinais clínicos e teste ACTH/cortisol.',
    dosageGuidance: { labelDose: 'Cães: 0,5-1 mg/kg VO q12h ou ~2 mg/kg VO SID com alimento; ajustar por ACTH/cortisol e sinais.', plumbs: { dog: [{ title: 'Hiperadrenocorticismo', dose: '0,5-1 mg/kg VO q12h', note: 'Esquema BID de dose menor pode reduzir eventos adversos; monitoramento obrigatório.' }, { title: 'Alternativa SID', dose: '~2 mg/kg VO SID com alimento', note: 'Titular lentamente pela menor dose que controla sinais.' }] } },
    plumbsContext: 'Trilostano inibe síntese adrenal; risco de hipoadrenocorticismo iatrogênico se dose excessiva.',
    clinicalUse: 'Hiperadrenocorticismo hipófise-dependente ou adrenal-dependente em cães.',
    reassessment: 'Monitorar sinais clínicos, Na/K, ureia/creatinina, cortisol/ACTH e sinais de crise addisoniana.',
    prescriptionExample: 'Vetoryl [força], administrar com alimento na dose calculada, iniciando 0,5-1 mg/kg q12h ou ~2 mg/kg SID conforme plano endocrinológico.',
    safetyAlert: 'Não usar em doença hepática primária, insuficiência renal importante, gestantes/lactantes/reprodução. Risco de hipercalemia, vômitos, diarreia e colapso.',
    price: { averageLabel: 'R$ 315 a R$ 420', rangeLabel: 'Vetoryl 10 mg 30 cápsulas em varejo citado', sourceDate: '2026-06-07' }
  },
  {
    id: 'felimazole-dechra',
    slug: 'felimazole',
    name: 'Felimazole',
    manufacturer: 'Dechra',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_thyroid',
    productPageUrl: 'https://www.dechra-us.com/our-products/us/companion-animal/cat/prescription/felimazole-coated-tablets-methimazole-tablets',
    imageUrl: 'https://www.dechra-us.com/Files/Images/Ecom/Products/US/C220130-Felimazole-Updated-25-mg-Pack-Shot-new.jpg',
    species: ['cat'],
    presentations: ['Felimazole 2,5 mg', 'Felimazole 5 mg'],
    activeComponents: ['tiamazol', 'metimazol'],
    labelCompositionSummary: 'Metimazol/tiamazol em comprimidos revestidos para gatos.',
    labelDirections: 'Gatos: dose inicial comum 5 mg/dia, ajustada por T4 total, sinais clínicos e tolerância.',
    dosageGuidance: { labelDose: 'Gatos: dose inicial usual 5 mg/dia, ajustar por T4 e exames.', plumbs: { cat: [{ title: 'Hipertireoidismo felino', dose: '5 mg/dia inicial; ajustar por T4', note: 'Pode dividir BID conforme tolerância/protocolo.' }] } },
    plumbsContext: 'Antitireoidiano felino; controlar T4 pode desmascarar DRC.',
    clinicalUse: 'Estabilização pré-tireoidectomia e tratamento de longo prazo do hipertireoidismo felino.',
    reassessment: 'Monitorar T4 total, creatinina/ureia, ALT, hemograma, peso, apetite, vômitos e prurido facial.',
    prescriptionExample: 'Felimazole [2,5 ou 5 mg], administrar por via oral conforme dose prescrita e reavaliar T4/exames.',
    safetyAlert: 'Suspender/reavaliar em prurido facial intenso, hepatopatia, citopenias, vômitos intensos ou piora renal.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não visível de forma confiável', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'zycortal-dechra',
    slug: 'zycortal',
    name: 'Zycortal',
    manufacturer: 'Dechra',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_adrenal',
    productPageUrl: 'https://www.lojaonet.com.br/product-page/zycortal-25mg-ml-dechra',
    imageUrl: 'https://static.wixstatic.com/media/76c3f8_47d130158b314cbf9649f0f616d29e71~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
    species: ['dog'],
    presentations: ['Zycortal 25 mg/mL suspensão injetável'],
    activeComponents: ['pivalato de desoxicorticosterona', 'DOCP'],
    labelCompositionSummary: 'DOCP 25 mg/mL, mineralocorticoide de reposição injetável.',
    labelDirections: 'Plumb\'s/Zycortal: cães, DOCP 2,2 mg/kg IM ou SC a cada 25 dias inicialmente; ajustar dose/intervalo por sódio, potássio, hidratação e resposta.',
    dosageGuidance: { labelDose: 'Cães: 2,2 mg/kg IM/SC a cada 25 dias inicialmente; ajustar por Na/K e resposta clínica.', plumbs: { dog: [{ title: 'Hipoadrenocorticismo primário', dose: '2,2 mg/kg IM ou SC a cada 25 dias', note: 'DOCP não tem ação glicocorticoide; associar prednisolona quando indicado e monitorar Na/K.' }] } },
    plumbsContext: 'DOCP repõe mineralocorticoide, mas não substitui glicocorticoide quando necessário.',
    clinicalUse: 'Hipoadrenocorticismo primário canino com deficiência mineralocorticoide.',
    reassessment: 'Monitorar Na, K, hidratação, pressão arterial, ureia/creatinina e sinais de Addison.',
    prescriptionExample: 'Zycortal 25 mg/mL: aplicar 2,2 mg/kg IM ou SC inicialmente a cada 25 dias; ajustar por eletrólitos e resposta.',
    safetyAlert: 'Uso clínico. Não substitui prednisolona em pacientes que precisam reposição glicocorticoide.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Produto de alto custo/uso clínico', sourceDate: '2026-06-07' }
  },
  {
    id: 'sedalex-dechra',
    slug: 'sedalex',
    name: 'Sedalex',
    manufacturer: 'Dechra',
    commercialClass: 'analgesic',
    commercialSubclass: 'sedative_anesthetic',
    species: ['dog', 'cat'],
    presentations: ['Sedalex 2% frasco-ampola 10 mL'],
    activeComponents: ['cloridrato de xilazina 2,3% (equivalente a xilazina base 2%)'],
    productPageUrl: 'https://www.dechra.com.br/medicamentos/134/sedalex',
    imageUrl: 'https://www.dechra.com.br/common/uploads/produtos/sedalex-1200x73802.jpg',
    labelCompositionSummary: 'Xilazina 2% para cães e gatos; sedativo, analgésico e relaxante muscular de uso clínico.',
    labelDirections: 'Bula/rótulo Sedalex: sedação e relaxamento 1 mg/kg IM (0,425 mL/10 kg). Analgesia: 0,5 mg/kg IV (0,213 mL/10 kg) precedida de 1 mg/kg IM e associada à cetamina.',
    dosageGuidance: { labelDose: 'Cães/gatos: sedação 1 mg/kg IM (0,425 mL/10 kg). Analgesia: 0,5 mg/kg IV (0,213 mL/10 kg) após 1 mg/kg IM + cetamina.', plumbs: { dog: [{ title: 'Sedação/relaxamento', dose: '1 mg/kg IM', note: 'Uso clínico; monitorar bradicardia, arritmias, vômitos e depressão respiratória.' }, { title: 'Analgesia em protocolo', dose: '0,5 mg/kg IV após 1 mg/kg IM', note: 'Usar em associação à cetamina conforme protocolo anestésico.' }], cat: [{ title: 'Sedação/relaxamento', dose: '1 mg/kg IM', note: 'Uso clínico; vômitos e bradicardia são relevantes em gatos.' }, { title: 'Analgesia em protocolo', dose: '0,5 mg/kg IV após 1 mg/kg IM', note: 'Associar à cetamina e monitorar.' }] } },
    plumbsContext: 'Xilazina é agonista alfa-2; exige monitoramento cardiovascular/respiratório e cautela em idosos, debilitados, cardiopatas, braquicefálicos e gestantes.',
    clinicalUse: 'Analgésico, sedativo e relaxante muscular conforme descrição preliminar.',
    reassessment: 'Monitorar frequência cardíaca, ritmo, pressão, respiração, temperatura, vômitos e recuperação.',
    prescriptionExample: 'Sedalex 2%: sedação 1 mg/kg IM (0,425 mL/10 kg), em ambiente clínico e com monitoramento.',
    safetyAlert: 'Uso clínico com retenção de receita. Evitar em neonatos, obstrução esofágica, torção gástrica, hérnia diafragmática e reduzir dose em idosos/debilitados.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Bula/foto não consolidadas', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'doxiven-dechra',
    slug: 'doxiven',
    name: 'Doxiven 100 mg',
    manufacturer: 'Dechra',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://www.dechra.com.br/medicamentos/12/doxiven-100-mg',
    imageUrl: 'https://www.dechra.com.br/common/uploads/produtos/doxiven-100mg-1200x73950.jpg',
    species: ['dog'],
    presentations: ['Doxiven 100 mg'],
    activeComponents: ['doxiciclina'],
    labelCompositionSummary: 'Doxiciclina 100 mg por comprimido para cães.',
    labelDirections: 'Cães: 1 comprimido/20 kg, equivalente a 5 mg/kg VO a cada 12 h, por 7 dias ou a critério do médico-veterinário.',
    dosageGuidance: { labelDose: 'Cães: 5 mg/kg VO q12h.', plumbs: { dog: [{ title: 'Infecção sensível', dose: '5 mg/kg VO q12h', note: 'Separar de cátions/sucralfato.' }] } },
    plumbsContext: 'Doxiciclina tem absorção reduzida por sucralfato, ferro, zinco, cálcio, magnésio e alumínio.',
    clinicalUse: 'Infecções bacterianas sensíveis em cães, conforme diagnóstico.',
    reassessment: 'Reavaliar resposta, cultura quando possível, vômitos, esofagite e adesão.',
    prescriptionExample: 'Doxiven 100 mg, administrar por via oral conforme peso, a cada 12 horas, pelo período prescrito.',
    safetyAlert: 'Antibiótico. Não usar sem diagnóstico. Dar com água/alimento; separar de sucralfato, ferro, cálcio, zinco e antiácidos.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço variou por varejo', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'enrofloxacina-dechra-comprimidos',
    slug: 'enrofloxacina-dechra',
    name: 'Enrofloxacina Dechra',
    manufacturer: 'Dechra',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Enrofloxacina 50 mg', 'Enrofloxacina 150 mg'],
    activeComponents: ['enrofloxacina'],
    productPageUrl: 'https://www.dechra.com.br/medicamentos/31/enrofloxacina-50-mg',
    imageUrl: 'https://www.dechra.com.br/common/uploads/produtos/enrofloxacina-50mg-1200x78127.jpg',
    labelCompositionSummary: 'Fluoroquinolona oral em comprimidos; apresentação/espécie deve ser confirmada pela bula específica.',
    labelDirections: 'Plumb\'s: cães 5-20 mg/kg VO q24h para infecções sensíveis; gatos 5 mg/kg VO q24h ou dividido q12h, sem exceder 5 mg/kg/dia.',
    dosageGuidance: { labelDose: 'Cães: 5-20 mg/kg VO q24h. Gatos: 5 mg/kg/dia VO (preferir q24h; máximo 5 mg/kg/dia).', plumbs: { dog: [{ title: 'Infecção sensível', dose: '5-20 mg/kg VO q24h', note: 'Reservar para indicação/cultura; reavaliar se sem melhora em 5 dias.' }], cat: [{ title: 'Infecção sensível', dose: '5 mg/kg/dia VO', note: 'Não exceder 5 mg/kg/dia por risco de toxicidade retiniana.' }] } },
    plumbsContext: 'Fluoroquinolona crítica; usar cultura/antibiograma quando possível e evitar uso empírico indiscriminado.',
    clinicalUse: 'Infecções urinárias, dermatológicas, respiratórias, gastrointestinais e por bactérias sensíveis.',
    reassessment: 'Reavaliar cultura, resposta, efeitos neurológicos, GI e dose em nefropatas/gatos.',
    prescriptionExample: 'Enrofloxacina Dechra [50 ou 150 mg]: calcular por peso; cães 5-20 mg/kg VO q24h; gatos máximo 5 mg/kg/dia.',
    safetyAlert: 'Cautela em filhotes em crescimento, gatos, epilepsia, DRC e uso com cátions/sucralfato.',
    price: { averageLabel: 'R$ 21,90 a R$ 49,43', rangeLabel: 'Estimativa para 50/150 mg em varejo', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'enrofloxacino-dechra-injetavel',
    slug: 'enrofloxacino-dechra-injetavel',
    name: 'Enrofloxacino Dechra Injetável 2,5%',
    manufacturer: 'Dechra',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Enrofloxacino 2,5% injetável 20 mL'],
    activeComponents: ['enrofloxacina'],
    productPageUrl: 'https://www.dechra.com.br/medicamentos/33/enrofloxacino-2-5-',
    imageUrl: 'https://www.dechra.com.br/common/uploads/produtos/enroflaxacino-25-1200x76315.jpg',
    labelCompositionSummary: 'Enrofloxacina 2,5% injetável para uso clínico.',
    labelDirections: 'Plumb\'s: cães, solução injetável 2,27% 2,5 mg/kg IM uma vez, seguida de enrofloxacina oral; extra-label 10-20 mg/kg q24h IM/SC diluída ou IV lenta. Gatos: até 5 mg/kg/dia IM/IV.',
    dosageGuidance: { labelDose: 'Cães: 2,5 mg/kg IM dose única e seguir VO; extra-label 10-20 mg/kg q24h. Gatos: até 5 mg/kg/dia IM/IV.', plumbs: { dog: [{ title: 'Injetável rotulado/ponte para VO', dose: '2,5 mg/kg IM dose única', note: 'Depois seguir com enrofloxacina oral; usar cultura quando possível.' }, { title: 'Uso hospitalar extra-label', dose: '10-20 mg/kg q24h IM/SC diluída ou IV lenta', note: 'Ajustar por sítio, gravidade e susceptibilidade.' }], cat: [{ title: 'Uso parenteral felino', dose: '5 mg/kg/dia ou menos IM/IV', note: 'Não exceder 5 mg/kg/dia; monitorar midríase/retina.' }] } },
    plumbsContext: 'Mesma lógica de fluoroquinolona; dose incorreta em gatos pode ser grave.',
    clinicalUse: 'Infecções bacterianas sensíveis em ambiente clínico/hospitalar.',
    reassessment: 'Revisar bula, cultura, função renal e tolerância antes de liberar posologia.',
    prescriptionExample: 'Enrofloxacino injetável: cães 2,5 mg/kg IM dose única e seguir VO; gatos não exceder 5 mg/kg/dia.',
    safetyAlert: 'Dose bloqueada por dados incompletos. Não usar empiricamente sem critério.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'invicto-dechra',
    slug: 'invicto',
    name: 'Invicto',
    manufacturer: 'Dechra',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_oral_adulticide_flea',
    productPageUrl: 'https://www.invictopet.com.br/',
    imageUrl: 'https://www.invictopet.com.br/common/default/img/img-produtos-todos.png',
    species: ['dog', 'cat'],
    presentations: ['Invicto 11,4 mg', 'Invicto 57 mg'],
    activeComponents: ['nitenpiram'],
    labelCompositionSummary: 'Nitenpiram oral de ação rápida contra pulgas adultas.',
    labelDirections: 'Administrar comprimido conforme espécie/peso; efeito rápido, sem proteção residual mensal prolongada.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 comprimido conforme peso; repetir conforme bula/orientação.', plumbs: { dog: [{ title: 'Pulgas adultas', dose: 'Dose por faixa de peso', note: 'Knockdown rápido, sem efeito mensal prolongado.' }], cat: [{ title: 'Pulgas adultas', dose: 'Dose por faixa de peso', note: 'Confirmar apresentação felina/baixo peso.' }] } },
    plumbsContext: 'Nitenpiram elimina pulgas adultas rapidamente; não substitui controle ambiental e preventivo residual.',
    clinicalUse: 'Infestação por pulgas adultas e necessidade de redução rápida da carga parasitária.',
    reassessment: 'Reavaliar controle ambiental, reinfestação e necessidade de produto residual.',
    prescriptionExample: 'Invicto [11,4 ou 57 mg], administrar por via oral conforme peso e espécie.',
    safetyAlert: 'Pode haver prurido/agitação transitória pela morte das pulgas. Não confundir com isoxazolina mensal.',
    price: { averageLabel: 'R$ 68 a R$ 237', rangeLabel: 'Varia por apresentação/display', sourceDate: '2026-06-07', notes: 'Sem imagem direta confiável encontrada.' }
  },
  {
    id: 'cosacthen-dechra',
    slug: 'cosacthen',
    name: 'Cosacthen',
    manufacturer: 'Dechra',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_diagnostic',
    productPageUrl: 'https://dechra.co.nz/cosacthen/',
    imageUrl: 'https://dechra.co.nz/wp-content/uploads/2024/06/Prod_img_Cosacthen.png',
    species: ['dog'],
    presentations: ['Cosacthen injetável'],
    activeComponents: ['tetracosactida', 'cosintropina'],
    labelCompositionSummary: 'ACTH sintético para teste de estimulação adrenal.',
    labelDirections: 'Produto diagnóstico, não terapêutico domiciliar. Usar conforme protocolo de teste endócrino.',
    dosageGuidance: { labelDose: 'Cães: dose conforme protocolo de teste ACTH.', plumbs: { dog: [{ title: 'Teste ACTH', dose: 'Dose/protocolo diagnóstico conforme laboratório e referência', note: 'Coletar tempos corretos.' }] } },
    plumbsContext: 'Cosintropina/tetracosactida é usada para avaliar função adrenocortical.',
    clinicalUse: 'Diagnóstico/monitoramento de insuficiência adrenocortical e avaliação adrenal conforme protocolo.',
    reassessment: 'Interpretar com cortisol basal/pós, sinais clínicos, eletrólitos e histórico de fármacos.',
    prescriptionExample: 'Cosacthen: uso diagnóstico em clínica conforme protocolo de teste de estimulação por ACTH.',
    safetyAlert: 'Não é medicação domiciliar. Resultado depende de dose, via, tempos de coleta e interpretação laboratorial.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Uso clínico/diagnóstico', sourceDate: '2026-06-07' }
  },
  {
    id: 'mellis-vet-avert',
    slug: 'mellis-vet',
    name: 'Mellis Vet',
    manufacturer: 'Avert',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/mellis05_1642164604.png',
    species: ['dog', 'cat'],
    presentations: ['Mellis Vet 0,2 mg', 'Mellis Vet 0,5 mg', 'Mellis Vet 2 mg', 'Mellis Vet 3 mg', 'Mellis Vet 4 mg'],
    activeComponents: ['meloxicam'],
    labelCompositionSummary: 'Meloxicam em comprimidos veterinários; AINE preferencial COX-2.',
    labelDirections: 'Cães: 0,2 mg/kg no primeiro dia, depois 0,1 mg/kg VO a cada 24 h. Gatos: usar apresentação felina e por tempo curto conforme bula/prescrição.',
    dosageGuidance: { labelDose: 'Cães: 0,2 mg/kg D1, depois 0,1 mg/kg SID. Gatos: apresentação felina, tempo curto.', plumbs: { dog: [{ title: 'Dor/inflamação', dose: '0,2 mg/kg D1, depois 0,1 mg/kg VO SID', note: 'Dose clássica de meloxicam em cães.' }], cat: [{ title: 'Uso felino curto', dose: 'Dose de bula/apresentação felina, pelo menor tempo efetivo', note: 'Cautela renal máxima.' }] } },
    plumbsContext: 'Meloxicam é AINE com maior risco em gatos idosos, desidratados ou nefropatas; monitorar como qualquer AINE.',
    clinicalUse: 'Dor e inflamação musculoesquelética, osteoartrite, inflamação aguda e dor pós-operatória leve a moderada.',
    reassessment: 'Reavaliar dor, hidratação, vômitos, diarreia, melena, apetite e função renal/hepática quando indicado.',
    prescriptionExample: 'Mellis Vet [força], administrar por via oral conforme peso e espécie, a cada 24 horas, pelo período prescrito.',
    safetyAlert: 'Não associar com corticoide ou outro AINE. Evitar em DRC/IRA, desidratação, hipovolemia, hipotensão, vômitos/diarreia ativos, melena, úlcera GI, hepatopatia importante e gatos sem monitoramento.',
    price: { averageLabel: 'R$ 18 a R$ 45', rangeLabel: 'Estimativa por apresentação; Mellis Vet 0,5 mg citado perto de R$ 34,90', sourceDate: '2026-06-07' }
  },
  {
    id: 'becordil-avert',
    slug: 'becordil',
    name: 'Becordil',
    manufacturer: 'Avert',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/becordil-5mg-30cpr-packshot_1778782805.png',
    species: ['dog'],
    presentations: ['Becordil'],
    activeComponents: ['IECA - princípio ativo pendente de bula'],
    labelCompositionSummary: 'Cardiovascular IECA listado pela Avert; princípio ativo não confirmado no texto-base.',
    labelDirections: 'Cães: 0,5 mg/kg VO a cada 24 h, conforme dado de página oficial citado. Ativo pendente de confirmação por bula.',
    dosageGuidance: { labelDose: 'Cães: 0,5 mg/kg VO SID; ativo pendente de confirmação.', plumbs: { dog: [{ title: 'IECA / SRAA', dose: '0,5 mg/kg VO SID', note: 'Dose bloqueada para cálculo final até confirmar ativo.' }] } },
    plumbsContext: 'IECAs como benazepril/enalapril exigem monitoramento de pressão arterial, ureia, creatinina e potássio.',
    clinicalUse: 'Bloqueio do SRAA em cardiopatas ou nefropatas/proteinúricos, dependendo do ativo confirmado.',
    reassessment: 'Monitorar pressão arterial, hidratação, creatinina, ureia, potássio e sinais de hipotensão.',
    prescriptionExample: 'Becordil: confirmar bula/princípio ativo antes de gerar receita automática.',
    safetyAlert: 'Não usar sem saber princípio ativo confirmado. Alertar em hipotensão, desidratação, DRC instável, hipercalemia, hiponatremia e associação com diurético, AINE, espironolactona ou telmisartana.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07', notes: 'Composição pendente de bula.' }
  },
  {
    id: 'torzemin-avert',
    slug: 'torzemin',
    name: 'Torzemin',
    manufacturer: 'Avert',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_loop_diuretic',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos/torzemin-20-mg',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/torzemin2mg.png',
    labelUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/bula-torzemin.pdf',
    species: ['dog'],
    presentations: ['Torzemin 2 mg', 'Torzemin 4 mg', 'Torzemin 8 mg'],
    activeComponents: ['torasemida'],
    labelCompositionSummary: 'Torasemida em comprimidos; diurético de alça para cães.',
    labelDirections: 'Cães: 0,2 mg/kg VO a cada 12 h por 14 dias, conforme bula/rótulo citado.',
    dosageGuidance: { labelDose: 'Cães: 0,2 mg/kg VO q12h por 14 dias.', plumbs: { dog: [{ title: 'Congestão/ICC', dose: 'Bula: 0,2 mg/kg VO q12h', note: 'Plumb’s sugere iniciar 0,1 a 0,3 mg/kg q24h em muitos cenários.' }, { title: 'Troca de furosemida', dose: 'Iniciar em torno de 5% a 10% da dose diária total de furosemida', note: 'Torasemida é cerca de 10 a 20 vezes mais potente.' }] } },
    plumbsContext: 'Torasemida é diurético de alça mais potente que furosemida; excesso pode causar azotemia e distúrbios eletrolíticos.',
    clinicalUse: 'Congestão/edema cardiogênico, especialmente quando há necessidade de diurético mais potente ou refratariedade à furosemida.',
    reassessment: 'Monitorar ureia, creatinina, potássio, sódio, cloro, hidratação, pressão arterial, peso e frequência respiratória em repouso.',
    prescriptionExample: 'Torzemin [2, 4 ou 8 mg], administrar por via oral na dose calculada, conforme protocolo cardiológico.',
    safetyAlert: 'Não usar em desidratação, anúria, hipovolemia, hipotensão, distúrbios eletrolíticos graves ou DRC/IRA instável. Monitorar glicemia em diabéticos.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Produto localizado sem preço estável', sourceDate: '2026-06-07' }
  },
  {
    id: 'decrise-avert',
    slug: 'decrise',
    name: 'Decrise',
    manufacturer: 'Avert',
    commercialClass: 'behavioral',
    commercialSubclass: 'neuro_pain',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/medicamentos/decrise-50-mg',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/grupo-de-mascara-38.png',
    species: ['cat'],
    presentations: ['Decrise 50 mg', 'Decrise 100 mg', 'Decrise 200 mg'],
    activeComponents: ['gabapentina'],
    labelCompositionSummary: 'Gabapentina para gatos; composição deve ser confirmada por bula em cada apresentação.',
    labelDirections: 'Decrise 50 mg: 50 a 100 mg/gato VO em dose única, cerca de 1 h 30 min antes do evento estressor; duração citada de até 3 h.',
    dosageGuidance: { labelDose: 'Gatos: 50 a 100 mg/gato VO, dose única, 1 h 30 min antes do evento.', plumbs: { cat: [{ title: 'Evento estressor', dose: '50 a 100 mg/gato VO dose única', note: 'Dose de bula/rótulo do produto para contenção/transporte.' }] } },
    plumbsContext: 'Gabapentina em gatos é usada como ansiolítico situacional e adjuvante analgésico; ajustar/cautela em DRC.',
    clinicalUse: 'Contenção, transporte, manipulação, coleta de material e exames em gatos estressados.',
    reassessment: 'Monitorar sedação, ataxia, prostração, fraqueza e recuperação após o evento.',
    prescriptionExample: 'Decrise [50, 100 ou 200 mg], administrar por via oral conforme prescrição, antes do evento estressor.',
    safetyAlert: 'Cautela em DRC e associação com opioides, trazodona, benzodiazepínicos e outros depressores do SNC.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'beneflora-vet-avert',
    slug: 'beneflora-vet',
    name: 'Beneflora Vet',
    manufacturer: 'Avert',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_probiotic',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/cuidados-especiais/beneflora-vet',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/beneflora.png',
    species: ['dog', 'cat'],
    presentations: ['Beneflora Vet seringa graduada 14 g'],
    activeComponents: ['probiótico', 'prebiótico', 'zinco', 'vitamina E'],
    labelCompositionSummary: 'Probiótico + prebiótico + zinco + vitamina E em pasta/seringa graduada.',
    labelDirections: 'Bula/rótulo Avert: administrar por via oral usando a seringa graduada; cães e gatos recebem dose por graduação conforme peso e condição, seguindo o rótulo.',
    dosageGuidance: { labelDose: 'Cães/gatos: administrar VO pela seringa graduada, na graduação correspondente ao peso no rótulo.', plumbs: { dog: [{ title: 'Disbiose/diarreia leve', dose: 'Usar a graduação da seringa correspondente ao peso', note: 'Não há dose Plumb’s universal para probiótico; seguir rótulo do produto.' }], cat: [{ title: 'Disbiose/diarreia leve', dose: 'Usar a graduação da seringa correspondente ao peso', note: 'Produto adjuvante; reavaliar diarreia persistente.' }] } },
    plumbsContext: 'Probióticos dependem de cepa, UFC e formulação; seguir rótulo do produto.',
    clinicalUse: 'Disbiose, diarreia leve, pós-antibiótico, transição alimentar e suporte de microbiota.',
    reassessment: 'Reavaliar se diarreia persiste, há sangue, vômitos, desidratação, febre ou apatia.',
    prescriptionExample: 'Beneflora Vet, administrar por via oral conforme graduação da seringa e orientação veterinária.',
    safetyAlert: 'Adjuvante; não substitui investigação de parvovirose, AHDS, giardíase, parasitismo, obstrução, sepse ou desidratação. Cautela em imunossuprimidos graves.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'kalium-vet-avert',
    slug: 'kalium-vet',
    name: 'Kalium Vet',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_mineral_vitamin',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/cuidados-especiais/kalium-vet',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/kalium_1638206873.png',
    species: ['dog', 'cat'],
    presentations: ['Kalium Vet 30 comprimidos bissulcados'],
    activeComponents: ['potássio'],
    labelCompositionSummary: 'Suplemento mineral repositor de potássio.',
    labelDirections: 'Cães e gatos: 1 comprimido/10 kg VO a cada 12 h ou conforme orientação nutricional/veterinária.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 comp/10 kg VO q12h.', plumbs: { dog: [{ title: 'Hipocalemia', dose: '1 comp/10 kg VO q12h', note: 'Ajustar por potássio sérico.' }], cat: [{ title: 'Hipocalemia', dose: '1 comp/10 kg VO q12h', note: 'Útil especialmente em gatos renais hipocalêmicos, com monitoramento.' }] } },
    plumbsContext: 'Reposição de potássio deve ser guiada por potássio sérico, função renal, estado ácido-base e perdas.',
    clinicalUse: 'Hipocalemia leve a moderada em paciente estável, gatos renais, perdas gastrointestinais/urinárias ou uso de diurético.',
    reassessment: 'Monitorar potássio sérico, função renal, ECG quando necessário, hidratação e resposta clínica.',
    prescriptionExample: 'Kalium Vet, administrar 1 comprimido para cada 10 kg por via oral, a cada 12 horas, ou conforme ajuste laboratorial.',
    safetyAlert: 'Não usar em hipercalemia, obstrução urinária, anúria/oligúria grave, DRC descompensada sem controle ou uso de IECA/ARB/espironolactona sem monitoramento.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'foli-b-avert',
    slug: 'foli-b',
    name: 'Foli B',
    manufacturer: 'Avert',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_mineral_vitamin',
    productPageUrl: 'https://avertsaudeanimal.com.br/linhas/cuidados-especiais/foli-b',
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/folib.png',
    species: ['dog', 'cat'],
    presentations: ['Foli B solução oral'],
    activeComponents: ['tiamina', 'riboflavina', 'nicotinamida', 'ácido pantotênico', 'piridoxina', 'ácido fólico', 'cianocobalamina'],
    labelCompositionSummary: 'Suplemento de complexo B com sucralose, aroma de cacau e baunilha.',
    labelDirections: 'Cães e gatos: 0,5 mL VO para cada 5 kg, uma vez ao dia, ou conforme orientação nutricional/veterinária.',
    dosageGuidance: { labelDose: 'Cães e gatos: 0,5 mL/5 kg VO SID.', plumbs: { dog: [{ title: 'Suporte vitamínico', dose: '0,5 mL/5 kg VO SID', note: 'Dose de rótulo.' }], cat: [{ title: 'Suporte vitamínico', dose: '0,5 mL/5 kg VO SID', note: 'Dose de rótulo.' }] } },
    plumbsContext: 'Não há dose Plumb’s para o produto; individualizar vitaminas do complexo B conforme doença e suporte nutricional.',
    clinicalUse: 'Suporte em inapetência, enteropatias, hepatopatias, nefropatias, convalescença e risco de deficiência de vitaminas hidrossolúveis.',
    reassessment: 'Reavaliar apetite, peso, fezes, doença de base e necessidade de suporte continuado.',
    prescriptionExample: 'Foli B, administrar 0,5 mL para cada 5 kg por via oral, uma vez ao dia, pelo período prescrito.',
    safetyAlert: 'Suplemento; não substitui investigação da causa de anorexia, perda de peso ou diarreia. Atenção a aroma de cacau em pacientes sensíveis.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'agemoxi-cl-agener',
    slug: 'agemoxi-cl',
    name: 'Agemoxi CL',
    manufacturer: 'Agener União',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos/agemoxi-cl/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_antimicrobianos_agemoxi.jpg',
    species: ['dog', 'cat'],
    presentations: ['Agemoxi CL 50 mg', 'Agemoxi CL 250 mg'],
    activeComponents: ['amoxicilina', 'clavulanato de potássio'],
    labelCompositionSummary: 'Aminopenicilina + inibidor de beta-lactamase em comprimidos palatáveis bissulcados.',
    labelDirections: '50 mg: 1 a 2 comp/4 kg VO q12h. 250 mg: 1 a 2 comp/20 kg VO q12h.',
    dosageGuidance: { labelDose: 'Cães e gatos: 12,5 a 25 mg/kg VO q12h.', plumbs: { dog: [{ title: 'Infecção sensível', dose: '12,5 a 25 mg/kg VO q12h', note: 'Faixa prática equivalente à bula.' }], cat: [{ title: 'Infecção sensível', dose: '12,5 a 25 mg/kg VO q12h', note: 'Monitorar tolerância GI.' }] } },
    plumbsContext: 'Amoxicilina-clavulanato é usada para pele/tecidos moles, oral, urinária e respiratória conforme sensibilidade.',
    clinicalUse: 'Feridas, abscessos, mordeduras, infecção oral/periodontal, pele/tecidos moles, ITU sensível e algumas respiratórias.',
    reassessment: 'Reavaliar resposta, vômitos/diarreia e necessidade de cultura em recorrência, profundidade, falha ou infecção hospitalar.',
    prescriptionExample: 'Agemoxi CL [50 ou 250 mg], administrar por via oral conforme peso, a cada 12 horas, pelo período prescrito.',
    safetyAlert: 'Não usar em hipersensibilidade a penicilinas/cefalosporinas. Antibiótico não deve ser usado sem diagnóstico.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'ceftrat-agener',
    slug: 'ceftrat',
    name: 'Ceftrat',
    manufacturer: 'Agener União',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos/ceftrat/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2023/01/8463B_AGE22_Pack-3D_Ceftrat-100mg.png',
    species: ['dog'],
    presentations: ['Ceftrat 100 mg', 'Ceftrat 200 mg'],
    activeComponents: ['cefpodoxima'],
    labelCompositionSummary: 'Cefalosporina oral em comprimidos palatáveis e bissulcados para cães.',
    labelDirections: 'Cães: 5 a 10 mg/kg VO a cada 24 h.',
    dosageGuidance: { labelDose: 'Cães: 5 a 10 mg/kg VO SID.', plumbs: { dog: [{ title: 'Piodermite/tecidos moles', dose: '5 a 10 mg/kg VO SID', note: 'Cultura em recorrência/falha.' }] } },
    plumbsContext: 'Cefpodoxima é útil quando se deseja posologia SID em infecções sensíveis de cães.',
    clinicalUse: 'Piodermite, tecidos moles, feridas/abscessos e infecções sensíveis em cães.',
    reassessment: 'Reavaliar resposta clínica e indicar cultura em piodermite recorrente/profunda ou falha.',
    prescriptionExample: 'Ceftrat [100 ou 200 mg], administrar por via oral na dose calculada, a cada 24 horas.',
    safetyAlert: 'Hipersensibilidade a beta-lactâmicos; cautela em DRC grave. Não usar sem diagnóstico.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'clinbacter-agener',
    slug: 'clinbacter',
    name: 'Clinbacter',
    manufacturer: 'Agener União',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos/clinbacter/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/05/clinbacter_foto.png',
    species: ['dog', 'cat'],
    presentations: ['Clinbacter 75 mg', 'Clinbacter 150 mg'],
    activeComponents: ['cloridrato de clindamicina'],
    labelCompositionSummary: 'Clindamicina oral, lincosamida para cães e gatos.',
    labelDirections: 'Dose deve seguir bula/indicação. Usar com diagnóstico e duração definida.',
    dosageGuidance: { labelDose: 'Cães e gatos: usar dose de bula conforme indicação.', plumbs: { dog: [{ title: 'Pele/oral/anaeróbios', dose: 'Dose por bula/indicação', note: 'Antibiótico; evitar uso empírico longo.' }], cat: [{ title: 'Pele/oral/anaeróbios', dose: 'Dose por bula/indicação', note: 'Monitorar tolerância GI.' }] } },
    plumbsContext: 'Clindamicina é lincosamida para anaeróbios e cocos Gram-positivos sensíveis; pode causar vômitos/diarreia.',
    clinicalUse: 'Infecções orais, pele/tecidos moles, feridas, abscessos e anaeróbios conforme sensibilidade.',
    reassessment: 'Reavaliar resposta e tolerância gastrointestinal; cultura em falha/recorrência.',
    prescriptionExample: 'Clinbacter [75 ou 150 mg], administrar por via oral conforme bula e peso, pelo período prescrito.',
    safetyAlert: 'Antibiótico. Não usar sem diagnóstico; cautela em doença GI importante.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'doxitrat-agener',
    slug: 'doxitrat',
    name: 'Doxitrat',
    manufacturer: 'Agener União',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos/doxitrat/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/novo-doxi-1-3.jpg',
    species: ['dog', 'cat'],
    presentations: ['Doxitrat conforme apresentação'],
    activeComponents: ['doxiciclina'],
    labelCompositionSummary: 'Doxiciclina veterinária; tetraciclina oral.',
    labelDirections: 'Dose deve seguir bula/apresentação; separar de cátions e sucralfato.',
    dosageGuidance: { labelDose: 'Cães e gatos: dose por bula; literatura usual 5 a 10 mg/kg q12-24h.', plumbs: { dog: [{ title: 'Infecção sensível', dose: '5 a 10 mg/kg VO q12-24h conforme indicação', note: 'Separar de sucralfato/cátions.' }], cat: [{ title: 'Infecção sensível', dose: '5 a 10 mg/kg VO q12-24h conforme indicação', note: 'Dar água/alimento para reduzir lesão esofágica.' }] } },
    plumbsContext: 'Doxiciclina interage com sucralfato, ferro, zinco, cálcio, magnésio e alumínio.',
    clinicalUse: 'Infecções sensíveis, hemoparasitoses/respiratórias e outras indicações conforme diagnóstico.',
    reassessment: 'Reavaliar resposta, vômitos, esofagite, aderência e necessidade de cultura/testes.',
    prescriptionExample: 'Doxitrat [apresentação], administrar conforme bula e diagnóstico, separando de quelantes.',
    safetyAlert: 'Antibiótico. Em gatos, administrar com água/alimento para reduzir risco de esofagite.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'zelotril-agener',
    slug: 'zelotril',
    name: 'Zelotril',
    manufacturer: 'Agener União',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antimicrobianos/zelotril/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_antimicrobianos_zelotril.jpg',
    species: ['dog', 'cat'],
    presentations: ['Zelotril conforme apresentação'],
    activeComponents: ['enrofloxacina'],
    labelCompositionSummary: 'Fluoroquinolona veterinária; apresentação/dose deve ser conferida por bula direta.',
    labelDirections: 'Referência Plumb\'s para enrofloxacina: cães 5-20 mg/kg VO q24h; gatos 5 mg/kg/dia VO, sem exceder 5 mg/kg/dia.',
    dosageGuidance: { labelDose: 'Cães: 5-20 mg/kg VO q24h. Gatos: 5 mg/kg/dia VO (máximo 5 mg/kg/dia).', plumbs: { dog: [{ title: 'Infecção sensível', dose: '5-20 mg/kg VO q24h', note: 'Usar com cultura/antibiograma quando possível.' }], cat: [{ title: 'Infecção sensível', dose: '5 mg/kg/dia VO', note: 'Evitar doses altas; risco de toxicidade retiniana.' }] } },
    plumbsContext: 'Enrofloxacina exige uso criterioso, idealmente com cultura, e cautela em gatos/doses altas.',
    clinicalUse: 'Infecções sensíveis urinárias, respiratórias, dermatológicas, gastrointestinais e sistêmicas conforme diagnóstico.',
    reassessment: 'Reavaliar cultura, resposta, efeitos neurológicos/GI e risco ocular em gatos.',
    prescriptionExample: 'Zelotril/enrofloxacina: calcular por peso; cães 5-20 mg/kg VO q24h; gatos máximo 5 mg/kg/dia.',
    safetyAlert: 'Não usar empiricamente sem critério. Cautela em filhotes, gatos, epilepsia, DRC e uso com cátions/sucralfato.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'flamavet-agener',
    slug: 'flamavet',
    name: 'Flamavet',
    manufacturer: 'Agener União',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_antiinflammatory',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/linha-dor/flamavet/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_linhador_flamavet.jpg',
    species: ['dog', 'cat'],
    presentations: ['Flamavet 0,5 mg cães', 'Flamavet 2 mg cães', 'Flamavet 0,2 mg gatos', 'Flamavet 0,2% injetável'],
    activeComponents: ['meloxicam'],
    labelCompositionSummary: 'AINE à base de meloxicam em comprimidos/injetável para cães e gatos, conforme apresentação.',
    labelDirections: 'Bula Agener: cães VO D1 0,2 mg/kg SID e depois 0,1 mg/kg SID; gatos VO D1 0,1 mg/kg SID e depois 0,05 mg/kg SID. Injetável: cães 0,2/0,1 mg/kg IV ou SC; gatos 0,1/0,05 mg/kg SC.',
    dosageGuidance: { labelDose: 'Cães: D1 0,2 mg/kg SID, depois 0,1 mg/kg SID. Gatos: D1 0,1 mg/kg SID, depois 0,05 mg/kg SID.', plumbs: { dog: [{ title: 'Dor/inflamação', dose: '0,2 mg/kg D1; depois 0,1 mg/kg q24h', note: 'VO; injetável IV/SC conforme apresentação.' }], cat: [{ title: 'Dor/inflamação felina', dose: '0,1 mg/kg D1; depois 0,05 mg/kg q24h', note: 'VO/SC conforme apresentação; usar pelo menor tempo e com cautela renal.' }] } },
    plumbsContext: 'Meloxicam/AINE exige cautela renal, hepática e gastrointestinal; não associar com corticoide ou outro AINE.',
    clinicalUse: 'Dor e inflamação ortopédica/tecidual conforme indicação de bula e avaliação clínica.',
    reassessment: 'Monitorar dor, vômitos, diarreia, melena, apetite e função renal/hepática quando indicado.',
    prescriptionExample: 'Flamavet/meloxicam: cães D1 0,2 mg/kg q24h e depois 0,1 mg/kg q24h; gatos D1 0,1 mg/kg e depois 0,05 mg/kg q24h.',
    safetyAlert: 'Não associar com corticoide ou outro AINE. Evitar em DRC/IRA, desidratação, úlcera GI e hepatopatia importante.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Dados de dose/preço não consolidados', sourceDate: '2026-06-07' }
  },
  {
    id: 'cronidor-agener',
    slug: 'cronidor',
    name: 'Cronidor',
    manufacturer: 'Agener União',
    commercialClass: 'analgesic',
    commercialSubclass: 'analgesic_opioid_combo',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/linha-dor/cronidor/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_linhador_cronidor.jpg',
    species: ['dog', 'cat'],
    presentations: ['Cronidor 12 mg', 'Cronidor 40 mg', 'Cronidor 80 mg', 'Cronidor 2% injetável'],
    activeComponents: ['cloridrato de tramadol'],
    labelCompositionSummary: 'Tramadol oral/injetável veterinário para cães e gatos.',
    labelDirections: 'Cães e gatos: 2 mg/kg VO a cada 8 h, por até 4 dias, conforme bula citada.',
    dosageGuidance: { labelDose: 'Cães e gatos: 2 mg/kg VO q8h por até 4 dias.', plumbs: { dog: [{ title: 'Dor leve/moderada', dose: '2 mg/kg VO q8h', note: 'Tramadol isolado em cães tem eficácia variável.' }], cat: [{ title: 'Dor leve/moderada', dose: '2 mg/kg VO q8h', note: 'Monitorar sedação/disforia.' }] } },
    plumbsContext: 'Tramadol é mais consistente como parte de analgesia multimodal; cautela com serotonérgicos e convulsões.',
    clinicalUse: 'Dor leve a moderada, pós-operatório curto e analgesia adicional quando AINE não pode ser usado.',
    reassessment: 'Reavaliar dor, sedação, constipação, vômitos, apetite e comportamento.',
    prescriptionExample: 'Cronidor [12, 40 ou 80 mg], administrar por via oral na dose calculada, a cada 8 horas, por até 4 dias.',
    safetyAlert: 'Substância controlada. Evitar em obstrução GI, histórico convulsivo e uso com SSRIs, selegilina, trazodona, mirtazapina ou outros serotonérgicos.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'emedron-agener',
    slug: 'emedron',
    name: 'Emedron',
    manufacturer: 'Agener União',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/gastro/emedron/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/08/emedron.jpg',
    species: ['dog', 'cat'],
    presentations: ['Emedron comprimidos', 'Emedron 1% injetável'],
    activeComponents: ['ondansetrona'],
    labelCompositionSummary: 'Ondansetrona veterinária oral/injetável.',
    labelDirections: 'Cães e gatos: 0,5 a 1 mg/kg VO a cada 8 h por 5 dias ou conforme critério veterinário.',
    dosageGuidance: { labelDose: 'Cães e gatos: 0,5 a 1 mg/kg VO q8h por 5 dias.', plumbs: { dog: [{ title: 'Náusea/vômito', dose: '0,5 a 1 mg/kg VO q8h', note: 'Bula; BSAVA cita intervalos q12-24h em alguns contextos.' }], cat: [{ title: 'Náusea/vômito', dose: '0,5 a 1 mg/kg VO q8h', note: 'Cautela em hepatopatia/QT.' }] } },
    plumbsContext: 'Ondansetrona pode reduzir efetividade do tramadol e exige cautela em QT longo/alterações eletrolíticas.',
    clinicalUse: 'Náusea/vômito, quimioterapia, uremia, gastroenterite ou antiemético adicional.',
    reassessment: 'Reavaliar hidratação, dor abdominal, obstrução, constipação e persistência do vômito.',
    prescriptionExample: 'Emedron [apresentação], administrar por via oral na dose calculada, a cada 8 horas, por até 5 dias.',
    safetyAlert: 'Contraindicar em obstrução intestinal suspeita. Cautela em hepatopatia grave, arritmias, QT longo, hipocalemia/hipomagnesemia e fármacos que prolongam QT.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'helfine-plus-caes-agener',
    slug: 'helfine-plus-caes',
    name: 'Helfine Plus Cães',
    manufacturer: 'Agener União',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antiparasitarios/helfine-plus-caes/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/novo-hel2-1.jpg',
    species: ['dog'],
    presentations: ['Helfine Plus Cães 4 comprimidos'],
    activeComponents: ['praziquantel', 'pamoato de pirantel', 'febantel'],
    labelCompositionSummary: 'Vermífugo oral palatável e bissulcado para cães.',
    labelDirections: 'Cães: 1 comp/10 kg em dose única; repetir após 15 dias. Giardia: 1 comp/10 kg q24h por 3 dias.',
    dosageGuidance: { labelDose: 'Cães: 1 comp/10 kg dose única; Giardia: SID por 3 dias.', plumbs: { dog: [{ title: 'Vermifugação', dose: '1 comprimido/10 kg VO dose única; repetir em 15 dias', note: 'Dose de bula.' }, { title: 'Giardia', dose: '1 comprimido/10 kg VO SID por 3 dias', note: 'Associar higiene ambiental.' }] } },
    plumbsContext: 'Associação de praziquantel, pirantel e febantel cobre cestódeos/nematódeos e protocolo de giardíase conforme produto.',
    clinicalUse: 'Vermifugação de rotina, cestódeos/nematódeos e giardíase conforme diagnóstico/suspeita.',
    reassessment: 'Reavaliar fezes, reinfecção, higiene ambiental e necessidade de coproparasitológico.',
    prescriptionExample: 'Helfine Plus Cães, administrar 1 comprimido para cada 10 kg por via oral conforme protocolo.',
    safetyAlert: 'Seguir idade/peso mínimos. Em Giardia, tratar ambiente, banho e potes; não tratar diarreia crônica só com vermífugo sem diagnóstico.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'helfine-plus-gatos-agener',
    slug: 'helfine-plus-gatos',
    name: 'Helfine Plus Gatos',
    manufacturer: 'Agener União',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_cat',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antiparasitarios/helfine-plus-gatos/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/novo-hel-1.jpg',
    species: ['cat'],
    presentations: ['Helfine Plus Gatos 2 comprimidos'],
    activeComponents: ['praziquantel', 'pamoato de pirantel'],
    labelCompositionSummary: 'Vermífugo oral felino com praziquantel e pamoato de pirantel.',
    labelDirections: 'Bula Agener: gatos, 1 comprimido/4 kg VO em dose única; repetir após 15 dias. Até 1 kg: 1/4 comp; 1,1-2 kg: 1/2 comp; 2,1-3 kg: 3/4 comp; 3,1-4 kg: 1 comp.',
    dosageGuidance: { labelDose: 'Gatos: 1 comp/4 kg VO dose única; repetir após 15 dias.', plumbs: { cat: [{ title: 'Vermifugação felina', dose: '1 comprimido/4 kg VO dose única', note: 'Até 1 kg: 1/4 comp; 1,1-2 kg: 1/2; 2,1-3 kg: 3/4; 3,1-4 kg: 1 comp.' }] } },
    plumbsContext: 'Antiparasitários felinos devem respeitar ativo, peso, idade e segurança por espécie.',
    clinicalUse: 'Vermifugação felina conforme espectro do produto.',
    reassessment: 'Reavaliar fezes, peso, idade, risco ambiental e coproparasitológico.',
    prescriptionExample: 'Helfine Plus Gatos: administrar 1 comprimido para cada 4 kg VO em dose única; repetir em 15 dias.',
    safetyAlert: 'Não usar dose canina em gatos. Confirmar peso, idade e estado clínico antes de vermifugar.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Dose/preço não consolidados', sourceDate: '2026-06-07' }
  },
  {
    id: 'mectimax-agener',
    slug: 'mectimax',
    name: 'Mectimax',
    manufacturer: 'Agener União',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antiparasitarios/mectimax/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/mectmax-novo-1.jpg',
    species: ['dog', 'cat'],
    presentations: ['Mectimax 3 mg', 'Mectimax 12 mg'],
    activeComponents: ['ivermectina'],
    labelCompositionSummary: 'Ivermectina oral em comprimidos.',
    labelDirections: 'Cães: 0,2 mg/kg q7d por 2 a 4 administrações para sarna sarcóptica/otodécica/carrapatos/nematódeos; demodicose 0,6 mg/kg q24h por 2 a 3 meses. Gatos: sarna otodécica 0,3 mg/kg q7d por 2 a 4 administrações.',
    dosageGuidance: { labelDose: 'Cães/gatos: dose por indicação; demodicose canina exige alerta máximo.', plumbs: { dog: [{ title: 'Sarna/nematódeos', dose: '0,2 mg/kg VO q7d, 2 a 4 administrações', note: 'Dose de bula.' }, { title: 'Demodicose', dose: '0,6 mg/kg VO q24h por 2 a 3 meses', note: 'Não liberar sem alerta MDR1/toxicidade.' }], cat: [{ title: 'Sarna otodécica', dose: '0,3 mg/kg VO q7d, 2 a 4 administrações', note: 'Monitorar neurotoxicidade.' }] } },
    plumbsContext: 'Ivermectina em doses altas pode causar toxicidade neurológica, especialmente em cães MDR1/ABCB1.',
    clinicalUse: 'Sarnas e parasitoses sensíveis; demodicose exige cautela e hoje compete com alternativas mais seguras.',
    reassessment: 'Monitorar tremores, ataxia, midríase, cegueira, depressão, hipersalivação e resposta parasitológica.',
    prescriptionExample: 'Mectimax [3 ou 12 mg], administrar conforme espécie, peso e indicação, com alertas de segurança.',
    safetyAlert: 'Alerta máximo em Collie, Pastor de Shetland, Australian Shepherd, Border Collie e mestiços MDR1; pacientes neurológicos; filhotes; uso com spinosad, macrolídeos, azóis e inibidores de P-gp.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'ectocid-agener',
    slug: 'ectocid',
    name: 'Ectocid',
    manufacturer: 'Agener União',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_topical_classic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/antiparasitarios/ectocid/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2024/04/ECTOCID-familia-e-pipetas.png',
    species: ['dog'],
    presentations: ['Ectocid 0,67 mL', 'Ectocid 1,34 mL', 'Ectocid 2,68 mL', 'Ectocid 4,02 mL'],
    activeComponents: ['fipronil 13%'],
    labelCompositionSummary: 'Ectoparasiticida tópico spot-on para cães à base de fipronil 13%.',
    labelDirections: 'Bula Agener: dose única tópica. Até 10 kg: pipeta 0,67 mL; 10-20 kg: 1,34 mL; 20-40 kg: 2,68 mL; acima de 40 kg: 4,02 mL.',
    dosageGuidance: { labelDose: 'Cães: dose única spot-on por peso: até 10 kg 0,67 mL; 10-20 kg 1,34 mL; 20-40 kg 2,68 mL; >40 kg 4,02 mL.', plumbs: { dog: [{ title: 'Pulgas/carrapatos', dose: '1 pipeta tópica conforme peso', note: 'Até 10 kg 0,67 mL; 10-20 kg 1,34 mL; 20-40 kg 2,68 mL; >40 kg 4,02 mL.' }] } },
    plumbsContext: 'Fipronil tópico para cães; evitar exposição de gatos ao produto recém-aplicado até secagem e seguir intervalo de reaplicação da bula.',
    clinicalUse: 'Tratamento e controle de pulgas e carrapatos em cães.',
    reassessment: 'Reavaliar infestação, reação cutânea e risco de exposição de gatos ao produto.',
    prescriptionExample: 'Ectocid: aplicar 1 pipeta spot-on conforme peso do cão, afastando os pelos e depositando sobre a pele.',
    safetyAlert: 'Produto para cães. Não aplicar em gatos. Evitar lambedura e contato com gatos até secagem completa.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Composição/dose/preço não consolidados', sourceDate: '2026-06-07' }
  },
  {
    id: 'petpril-agener',
    slug: 'petpril',
    name: 'Petpril',
    manufacturer: 'Agener União',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_raas_aldosterone',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/cardio-e-equilibrio/petpril/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_linhacardio_petpril.jpg',
    species: ['dog', 'cat'],
    presentations: ['Petpril 5 mg', 'Petpril 10 mg'],
    activeComponents: ['maleato de enalapril'],
    labelCompositionSummary: 'Enalapril oral palatável e bissulcado para cães e gatos.',
    labelDirections: 'Cães: 5 mg 1 comp/10 kg q12-24h; 10 mg 1 comp/20 kg q12-24h. Gatos: Petpril 5 mg, 1/4 a 1/2 comp/5 kg q12-24h.',
    dosageGuidance: { labelDose: 'Cães/gatos: dose por faixa; monitorar renal/K/PA.', plumbs: { dog: [{ title: 'ICC/hipertensão/proteinúria', dose: '0,5 mg/kg VO q12-24h aproximadamente', note: 'Conforme apresentação de bula.' }], cat: [{ title: 'Cardiorrenal', dose: '1/4 a 1/2 comp 5 mg/5 kg q12-24h', note: 'Monitorar pressão e função renal.' }] } },
    plumbsContext: 'Enalapril é IECA cardiovascular/vasodilatador; monitorar pressão, função renal e potássio.',
    clinicalUse: 'Insuficiência cardíaca, hipertensão e proteinúria/doença renal conforme diagnóstico.',
    reassessment: 'Monitorar PA, creatinina, ureia, potássio, hidratação, apetite e sinais de hipotensão.',
    prescriptionExample: 'Petpril [5 ou 10 mg], administrar por via oral conforme peso, a cada 12 ou 24 horas, com monitoramento.',
    safetyAlert: 'Cautela em hipotensão, desidratação, hipercalemia, DRC/IRA instável e uso com AINEs, diuréticos, espironolactona, telmisartana ou outros vasodilatadores.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'sec-lac-agener',
    slug: 'sec-lac',
    name: 'Sec Lac',
    manufacturer: 'Agener União',
    commercialClass: 'reproductive',
    commercialSubclass: 'repro_antigalactogenic',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/sec-lac/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_especialidades_sec-lac.jpg',
    species: ['dog', 'cat'],
    presentations: ['Sec Lac 5 (0,5 mg)', 'Sec Lac 20 (2 mg)'],
    activeComponents: ['metergolina'],
    labelCompositionSummary: 'Metergolina em comprimidos palatáveis e bissulcados.',
    labelDirections: 'Cadelas: Sec Lac 5, 1 comp/5 kg q12h por 4 a 8 dias; Sec Lac 20, 1 comp/20 kg q12h por 4 a 8 dias. Gatas: Sec Lac 5, 1 comp/4 kg q12h por 4 a 8 dias.',
    dosageGuidance: { labelDose: 'Cadelas/gatas: q12h por 4 a 8 dias conforme apresentação/peso.', plumbs: { dog: [{ title: 'Pseudociese/lactação', dose: 'Sec Lac 5: 1 comp/5 kg q12h; Sec Lac 20: 1 comp/20 kg q12h', note: 'Por 4 a 8 dias.' }], cat: [{ title: 'Interrupção lactação', dose: 'Sec Lac 5: 1 comp/4 kg q12h', note: 'Por 4 a 8 dias.' }] } },
    plumbsContext: 'Metergolina deve seguir dose de bula do produto comercial.',
    clinicalUse: 'Pseudociese e interrupção de lactação em cadelas e gatas quando clinicamente indicado.',
    reassessment: 'Excluir gestação real, mastite, piometra e neoplasia mamária; monitorar resposta e vômitos.',
    prescriptionExample: 'Sec Lac [5 ou 20], administrar por via oral conforme espécie e peso, a cada 12 horas, por 4 a 8 dias.',
    safetyAlert: 'Não usar quando lactação deve ser mantida. Cautela em vômitos, alterações comportamentais e pacientes debilitadas.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'prednon-agener',
    slug: 'prednon',
    name: 'Prednon',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/prednon/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2023/01/IMG-20220914-WA0072.jpg',
    species: ['dog'],
    presentations: ['Prednon 4 mg/mL solução oral 30 mL'],
    activeComponents: ['prednisolona'],
    labelCompositionSummary: 'Prednisolona 4 mg/mL em solução oral para cães.',
    labelDirections: 'Cães: 0,5 a 1 mg/kg VO a cada 24 h ou conforme critério médico-veterinário.',
    dosageGuidance: { labelDose: 'Cães: 0,5 a 1 mg/kg VO SID.', plumbs: { dog: [{ title: 'Anti-inflamatório esteroidal', dose: '0,5 a 1 mg/kg VO SID', note: 'Dose depende do objetivo; desmamar quando indicado.' }] } },
    plumbsContext: 'Prednisolona tem dose dependente do objetivo anti-inflamatório, imunossupressor ou substitutivo.',
    clinicalUse: 'Inflamação/alergia, doença imune e protocolos específicos em cães conforme diagnóstico.',
    reassessment: 'Monitorar PU/PD, polifagia, vômitos/diarreia, infecção, glicemia e necessidade de desmame.',
    prescriptionExample: 'Prednon 4 mg/mL, administrar por via oral na dose calculada, a cada 24 horas, conforme prescrição.',
    safetyAlert: 'Nunca associar com AINE. Cautela em diabetes, hiperadrenocorticismo, pancreatite, úlcera GI, infecção ativa, cardiopatia, DRC, hipertensão e uso prolongado.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'pro-cart-agener',
    slug: 'pro-cart',
    name: 'Pro Cart / Pro Cart 25',
    manufacturer: 'Agener União',
    commercialClass: 'orthopedic',
    commercialSubclass: 'ortho_joint_support',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/pro-cart/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/procart_novaimagem-scaled.jpg',
    species: ['dog', 'cat'],
    presentations: ['Pro Cart', 'Pro Cart 25'],
    activeComponents: ['condroitina', 'glicosamina', 'extrato de Yucca', 'minerais'],
    labelCompositionSummary: 'Suplemento articular com condroitina, glicosamina, Yucca e minerais.',
    labelDirections: 'Pro Cart: 1 comp/10 kg VO q24h. Pro Cart 25: 1 comp/25 kg VO q24h; Pro Cart 25 indicado para cães.',
    dosageGuidance: { labelDose: 'Pro Cart: 1 comp/10 kg SID. Pro Cart 25: 1 comp/25 kg SID para cães.', plumbs: { dog: [{ title: 'Suporte articular', dose: 'Pro Cart 1 comp/10 kg SID ou Pro Cart 25 1 comp/25 kg SID', note: 'Adjuvante; efeito lento.' }], cat: [{ title: 'Suporte articular', dose: 'Pro Cart 1 comp/10 kg SID', note: 'Não usar Pro Cart 25 em gatos sem indicação.' }] } },
    plumbsContext: 'Glucosamina/condroitina são suplementos adjuvantes; qualidade e formulação variam entre produtos.',
    clinicalUse: 'Suporte articular em osteoartrite, displasia, geriatria e alta demanda articular.',
    reassessment: 'Reavaliar mobilidade, dor, peso e tolerância gastrointestinal em 4 a 8 semanas.',
    prescriptionExample: 'Pro Cart, administrar por via oral conforme peso, a cada 24 horas, como suporte articular.',
    safetyAlert: 'Suplemento; não substitui analgesia, controle de peso, fisioterapia ou tratamento da causa. Cautela em diabéticos e intolerância gastrointestinal.',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não localizado com segurança', sourceDate: '2026-06-07' }
  },
  {
    id: 'optivet-tears-vetnil',
    slug: 'optivet-tears',
    name: 'Optivet Tears Pet',
    manufacturer: 'Vetnil',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['Frasco conta-gotas 10 mL'],
    activeComponents: ['hialuronato de sódio 0,2%', 'carboximetilcelulose 0,3%'],
    labelCompositionSummary: 'Hialuronato de sódio 200 mg/100 mL e carboximetilcelulose 300 mg/100 mL.',
    labelDirections: '1 gota em cada olho, no mínimo 3 vezes ao dia, ou a critério do médico-veterinário.',
    dosageGuidance: { labelDose: 'Cães e gatos: 1 gota em cada olho, no mínimo TID.' },
    plumbsContext: 'Lubrificantes oculares não têm dose única universal no Plumb’s; frequência depende de produto, gravidade e resposta.',
    clinicalUse: 'Ressecamento leve, secreção ocular não infecciosa, suporte em ceratoconjuntivite seca, braquicefálicos e irritação ambiental.',
    reassessment: 'Reavaliar se houver blefaroespasmo, dor, opacidade corneana, secreção purulenta, olho azul ou suspeita de úlcera/glaucoma/uveíte.',
    prescriptionExample: 'Optivet Tears, aplicar 1 gota em cada olho a cada 8 horas, por tempo conforme resposta clínica.',
    safetyAlert: 'Não substitui fluoresceína, Schirmer, tonometria ou investigação de úlcera/glaucoma/uveíte.',
    productPageUrl: 'https://vetnil.com.br/produto/optivetr-r-tears-pet/',
    imageUrl: 'https://vetnil.com.br/wp-content/uploads/2023/12/Optivet-R-Tears_603009170db3a.webp',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Preço aberto não confirmado no trecho consultado', sourceDate: '2026-06-17' }
  },
  {
    id: 'lacri-agener-uniao',
    slug: 'lacri',
    name: 'Lacri',
    manufacturer: 'Agener União',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['Frasco 15 mL'],
    activeComponents: ['carboximetilcelulose sódica'],
    labelCompositionSummary: 'Colírio lubrificante ocular à base de carboximetilcelulose sódica.',
    labelDirections: '1 gota em cada olho afetado, 4 vezes ao dia, por 7 dias; pode prolongar até 31 dias conforme avaliação.',
    dosageGuidance: { labelDose: 'Cães: 1 gota no(s) olho(s) afetado(s) QID por 7 dias; até 31 dias se indicado.', notes: ['Gatos: uso sob orientação/extra-label até confirmar bula felina oficial.'] },
    plumbsContext: 'Sem dose Plumb’s específica para a marca; lubrificantes são ajustados conforme necessidade clínica.',
    clinicalUse: 'Adjuvante em ceratoconjuntivite seca, irritação por ressecamento, exposição corneana e braquicefálicos.',
    reassessment: 'Reavaliar antes de prolongar e investigar causa quando houver dor, secreção, úlcera ou opacidade.',
    prescriptionExample: 'Lacri colírio, aplicar 1 gota no(s) olho(s) afetado(s) a cada 6 horas por 7 dias; reavaliar.',
    safetyAlert: 'Lubrificante não trata infecção, úlcera, uveíte ou glaucoma. Evitar uso sem orientação em lesão corneana/infeção ativa.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/especialidades-pt/lacri/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/img_pet_especialidades_lacri.jpg',
    labelUrl: 'https://agener.com.br/wp-content/uploads/2020/03/4014830-Lacri.pdf',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Petlove/Mercado Livre sem preço confiável no trecho', sourceDate: '2026-06-17' }
  },
  {
    id: 'lacrifilm-genom',
    slug: 'lacrifilm',
    name: 'Lacrifilm',
    manufacturer: 'Genom',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['10 mL', '15 mL'],
    activeComponents: ['carmelose sódica 5 mg/mL'],
    labelCompositionSummary: 'Lágrima artificial humana com carmelose sódica, geralmente 5 mg/mL conforme apresentação.',
    labelDirections: 'Bula humana: 1 a 2 gotas no(s) olho(s) afetado(s), conforme necessidade.',
    dosageGuidance: { labelDose: 'Extra-label: 1 gota no(s) olho(s) afetado(s) q6-8h ou conforme necessidade.' },
    plumbsContext: 'Sem dose Plumb’s específica por marca; lubrificantes são ajustados à superfície ocular e resposta.',
    clinicalUse: 'Lágrima artificial acessível para ressecamento leve, suporte em KCS, braquicefálicos e irritação ambiental.',
    reassessment: 'Reavaliar se precisar de uso muito frequente ou se houver dor, secreção, úlcera ou opacidade.',
    prescriptionExample: 'Lacrifilm colírio, aplicar 1 gota no(s) olho(s) afetado(s) a cada 6-8 horas.',
    safetyAlert: 'Produto humano extra-label. Não substitui ciclosporina/tacrolimus em KCS imunomediada nem antibiótico em úlcera infectada.',
    productPageUrl: 'https://www.genom.com.br/wp-content/uploads/2020/02/Lacrifilm.pdf',
    imageUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/novo-lacri-10.jpg',
    price: { averageLabel: 'R$ 34,39', rangeLabel: 'Drogasil 10 mL: R$ 34,39', sourceDate: '2026-06-17' }
  },
  {
    id: 'hyabak-genom-thea',
    slug: 'hyabak-015',
    name: 'Hyabak 0,15%',
    manufacturer: 'Genom/Thea',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['Frasco multidose ABAK 10 mL'],
    activeComponents: ['hialuronato de sódio 0,15%'],
    labelCompositionSummary: 'Lubrificante ocular humano sem conservantes com hialuronato de sódio 0,15%.',
    labelDirections: 'Bula/rótulo humano: 1 gota no olho conforme necessidade.',
    dosageGuidance: { labelDose: 'Extra-label: 1 gota no(s) olho(s) afetado(s) q6-8h ou conforme necessidade.' },
    plumbsContext: 'Hialuronato lubrificante é usado conforme gravidade do olho seco e resposta; sem dose Plumb’s por marca.',
    clinicalUse: 'Opção sem conservantes para uso frequente, olho seco crônico, superfície ocular sensível e braquicefálicos.',
    reassessment: 'Reavaliar Schirmer/superfície ocular em uso crônico ou se houver desconforto persistente.',
    prescriptionExample: 'Hyabak 0,15%, aplicar 1 gota no(s) olho(s) afetado(s) a cada 6-8 horas ou conforme necessidade.',
    safetyAlert: 'Produto humano extra-label. Não substitui imunomodulador em KCS imunomediada nem antibiótico em úlcera infectada.',
    productPageUrl: 'https://www.genom.com.br/hyabak/',
    imageUrl: 'https://farma22.vtexassets.com/arquivos/ids/192484/comprar-na-farma22-hyabak-colirio-10ml.jpg?v=639057001145470000',
    price: { averageLabel: 'R$ 75,00 aprox.', rangeLabel: 'R$ 68,65 a R$ 87,45', sourceDate: '2026-06-17' }
  },
  {
    id: 'systane-ultra-alcon',
    slug: 'systane-ul-ultra',
    name: 'Systane UL / Systane Ultra',
    manufacturer: 'Alcon',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['Systane UL 10 mL', 'Systane UL 15 mL', 'Systane Ultra 10 mL'],
    activeComponents: ['lubrificantes variáveis conforme versão'],
    labelCompositionSummary: 'Composição varia por versão; cadastrar Systane UL, Ultra, Complete ou Hidratação separadamente quando necessário.',
    labelDirections: 'Uso humano conforme necessidade; em veterinária usar conforme prescrição.',
    dosageGuidance: { labelDose: 'Extra-label: 1 gota no(s) olho(s) afetado(s) q6-8h ou conforme necessidade.' },
    plumbsContext: 'Sem dose Plumb’s específica por marca; lágrimas artificiais são prescritas conforme necessidade clínica.',
    clinicalUse: 'Lubrificante para olho seco leve a moderado, irritação ambiental e suporte de superfície ocular.',
    reassessment: 'Reavaliar se houver dor, secreção purulenta, úlcera, uveíte ou glaucoma.',
    prescriptionExample: 'Systane [versão], aplicar 1 gota no(s) olho(s) afetado(s) a cada 6-8 horas ou conforme orientação.',
    safetyAlert: 'Produto humano extra-label. Não usar como único tratamento em dor ocular, úlcera, uveíte ou glaucoma.',
    productPageUrl: 'https://systane.myalcon.com/br/products/systane-ultra/',
    imageUrl: 'https://systane.myalcon.com/br/sites/g/files/rbvwei2856/files/2022-12/col-right%20%281%29.png',
    price: { averageLabel: 'R$ 95,00 aprox.', rangeLabel: 'R$ 80,24 a R$ 110,48', sourceDate: '2026-06-17' }
  },
  {
    id: 'optive-abbvie-allergan',
    slug: 'optive-optive-advance',
    name: 'Optive / Optive Advance',
    manufacturer: 'Allergan/AbbVie',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_lubricant',
    species: ['dog', 'cat'],
    presentations: ['Optive 10 mL', 'Optive 15 mL', 'Optive Advance conforme apresentação'],
    activeComponents: ['carmelose', 'glicerina', 'hialuronato conforme versão'],
    labelCompositionSummary: 'Composição depende da versão; combina lubrificantes e osmoprotetores conforme apresentação.',
    labelDirections: 'Bula/rótulo humano: aplicar conforme necessidade.',
    dosageGuidance: { labelDose: 'Extra-label: 1 gota no(s) olho(s) afetado(s) q6-8h ou conforme necessidade.' },
    plumbsContext: 'Sem dose Plumb’s específica por marca; usar como lubrificante adjuvante.',
    clinicalUse: 'Lubrificante mais encorpado em alguns pacientes com olho seco e superfície ocular irritada.',
    reassessment: 'Reavaliar dor, secreção, opacidade, úlcera ou necessidade de imunomodulador.',
    prescriptionExample: 'Optive [versão], aplicar 1 gota no(s) olho(s) afetado(s) a cada 6-8 horas ou conforme necessidade.',
    safetyAlert: 'Produto humano extra-label. Não substitui avaliação oftálmica em dor, secreção purulenta, úlcera ou opacidade corneana.',
    productPageUrl: 'https://www.abbvie.com.br/content/dam/abbvie-com2/br/documents/Optive-UD.pdf',
    imageUrl: 'https://precopopular.vtexassets.com/arquivos/ids/237323/751939-colirio-optive-advance-solucao-oftalmica-10ml-1.jpg?v=639004684376770000',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Preço aberto instável nos trechos consultados', sourceDate: '2026-06-17' }
  },
  {
    id: 'optimmune-msd',
    slug: 'optimmune',
    name: 'Optimmune',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_immunomodulator',
    species: ['dog'],
    presentations: ['Pomada oftálmica 3,5 g'],
    activeComponents: ['ciclosporina A 0,2%'],
    labelCompositionSummary: 'Ciclosporina A 7 mg em 3,5 g, equivalente a aproximadamente 0,2%.',
    labelDirections: 'Aplicar fina camada de cerca de 0,5 cm no olho afetado, geralmente a cada 12 horas; confirmar rótulo vigente.',
    dosageGuidance: { labelDose: 'Cães: cerca de 0,5 cm no olho afetado q12h.' },
    plumbsContext: 'Ciclosporina oftálmica é aprovada para KCS em cães; não respondedores à pomada 0,2% podem exigir concentrações manipuladas maiores.',
    clinicalUse: 'Ceratoconjuntivite seca imunomediada canina, pannus/ceratite superficial crônica e ceratites imunomediadas selecionadas.',
    reassessment: 'Acompanhar com teste de Schirmer e exame oftálmico; ajustar se não houver resposta em semanas.',
    prescriptionExample: 'Optimmune pomada oftálmica, aplicar camada de aproximadamente 0,5 cm no(s) olho(s) afetado(s) a cada 12 horas.',
    safetyAlert: 'Não usar como substituto de tratamento de infecção ocular ativa. Cautela em úlcera infectada; pode causar irritação local.',
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/optimmune/',
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/optimmune.jpg',
    price: { averageLabel: 'R$ 275,00 aprox.', rangeLabel: 'Magazine Luiza: R$ 274,90', sourceDate: '2026-06-17' }
  },
  {
    id: 'tobrasyn-syntec',
    slug: 'tobrasyn',
    name: 'Tobrasyn',
    manufacturer: 'Syntec',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Frasco conta-gotas 5 mL'],
    activeComponents: ['tobramicina 0,3%'],
    labelCompositionSummary: 'Colírio veterinário à base de sulfato de tobramicina 0,3% (3 mg/mL).',
    labelDirections: 'Plumb\'s: infecções de superfície ocular sensíveis, 1 gota no olho afetado 4-6x ao dia; infecções importantes podem exigir aplicação a cada 30-60 min sob monitoramento.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota no olho afetado 4-6x/dia; casos importantes podem exigir q30-60 min sob monitoramento oftálmico.',
      plumbs: {
        dog: [{ title: 'Infecção ocular sensível', dose: '1 gota no olho afetado 4-6x/dia', note: 'Em infecção importante pode exigir q30-60 min; reavaliar superfície ocular e cultura quando indicado.' }],
        cat: [{ title: 'Infecção ocular sensível', dose: '1 gota no olho afetado 4-6x/dia', note: 'Mesma leitura extra-label; acompanhar resposta e tolerância local.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve tobramicina oftálmica para infecções de superfície ocular por bactérias sensíveis; ajustar frequência por gravidade, citologia/cultura e presença de úlcera.',
    clinicalUse: 'Infecções oculares bacterianas e suporte em úlceras infectadas por microrganismos sensíveis.',
    reassessment: 'Reavaliar rapidamente se não houver melhora, se houver úlcera, dor ou secreção purulenta.',
    prescriptionExample: 'Tobrasyn colírio: instilar 1 gota no olho afetado 4-6 vezes ao dia; ajustar para casos graves apenas com monitoramento oftálmico.',
    safetyAlert: 'Não usar empiricamente em olho doloroso sem fluoresceína. Investigar úlcera profunda, corpo estranho e perfuração.',
    productPageUrl: 'https://syntec.com.br/produtos/tobrasyn-tobramicina-syntec',
    imageUrl: 'https://syntec.com.br/storage/produtos/Tobrasyn-5-mL-15-53-26.webp',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'tobrex-tobramicina',
    slug: 'tobrex-tobramicina',
    name: 'Tobramicina / Tobrex',
    manufacturer: 'Alcon / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 0,3% 5 mL'],
    activeComponents: ['tobramicina 0,3%'],
    labelCompositionSummary: 'Colírio humano de tobramicina 3 mg/mL usado extra-label em veterinária.',
    labelDirections: 'Plumb\'s: infecções de superfície ocular sensíveis, 1 gota no olho afetado 4-6x ao dia; infecções importantes podem exigir q30-60 min sob monitoramento.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota no olho afetado 4-6x/dia; casos importantes podem exigir q30-60 min sob monitoramento oftálmico.',
      plumbs: {
        dog: [{ title: 'Infecção ocular sensível', dose: '1 gota no olho afetado 4-6x/dia', note: 'Dose extra-label; ajustar por gravidade, cultura/citologia e evolução.' }],
        cat: [{ title: 'Infecção ocular sensível', dose: '1 gota no olho afetado 4-6x/dia', note: 'Dose extra-label; reavaliar se dor, secreção ou piora.' }]
      }
    },
    plumbsContext: 'Aminoglicosídeo tópico citado no Plumb\'s para infecções oculares sensíveis; escolha e intervalo dependem da citologia, cultura, úlcera e resposta clínica.',
    clinicalUse: 'Alternativa humana de tobramicina para infecção bacteriana ocular sensível.',
    reassessment: 'Reavaliar em 24-72 h ou antes se piora, dor ou úlcera.',
    prescriptionExample: 'Tobramicina/Tobrex 0,3%: instilar 1 gota no olho afetado 4-6 vezes ao dia, com reavaliação conforme gravidade.',
    safetyAlert: 'Produto humano extra-label. Não tratar olho vermelho doloroso sem descartar úlcera, uveíte, glaucoma e corpo estranho.',
    productPageUrl: 'https://consultaremedios.com.br/tobrex/bula',
    imageUrl: 'https://imgcdn.mckesson.com/CumulusWeb/Images/High_Res/256058.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/ciprovet',
    id: 'ciprovet-labyes',
    slug: 'ciprovet-colirio',
    name: 'Ciprovet',
    manufacturer: 'Labyes',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Frasco 5 mL'],
    activeComponents: ['ciprofloxacino oftálmico','sulfato de condroitina a 20%'],
    labelCompositionSummary: 'Colírio veterinário com ciprofloxacina (antibiótico fluoroquinolona) e sulfato de condroitina a 20% (cicatrizante e hidratante corneano).',
    labelDirections: 'Instilar 1 gota no olho afetado a cada 24 horas. Em casos graves de infecção ocular, iniciar com 1 gota a cada 12 horas e seguir com a frequência de 24 horas, ou conforme critério do médico-veterinário.',
    dosageGuidance: {
      labelDose: 'Bula Ciprovet: 1 gota no olho afetado q24h; em casos graves, iniciar q12h e depois q24h conforme critério veterinário.',
      plumbs: {
        dog: [{ title: 'Ciprofloxacino oftálmico', dose: '1 gota no olho afetado q2-8h', note: 'Referência Plumb\'s para conjuntivite/ceratite bacteriana sensível; o rótulo do Ciprovet traz esquema próprio q24h/q12h.' }],
        cat: [{ title: 'Ciprofloxacino oftálmico', dose: '1 gota no olho afetado q2-8h', note: 'Referência Plumb\'s extra-label; comparar com bula veterinária do produto e gravidade.' }]
      }
    },
    plumbsContext: 'Fluoroquinolona tópica ocular; Plumb\'s lista ciprofloxacino q2-8h para conjuntivite/ceratite sensível, enquanto o rótulo veterinário do Ciprovet usa posologia própria.',
    clinicalUse: 'Infecções oculares bacterianas sensíveis, conjuntivite bacteriana, ceratite seca contaminada, déficit de lágrimas e adjuvante em cicatrização de úlceras de córnea.',
    reassessment: 'Reavaliar resposta e superfície corneana; considerar cultura em casos graves/recorrentes.',
    prescriptionExample: 'Instilar 1 gota de Ciprovet no olho afetado a cada 24 horas.',
    safetyAlert: 'Não usar como substituto de avaliação de úlcera, glaucoma ou uveíte. Stewardship antimicrobiano obrigatório. Evitar tocar o bico dosador no olho.',
    productPageUrl: 'https://labyes.com/pt-br/producto/ciprovet-colirio/',
    imageUrl: 'https://agroline.fbitsstatic.net/img/p/ciprovet-colirio-5-ml-labyes-104744/280156.jpg?w=420&h=420&v=no-change&qs=ignore',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'ciloxan-ciprofloxacino',
    slug: 'ciloxan-ciprofloxacino',
    name: 'Ciloxan / Ciprofloxacino oftálmico',
    manufacturer: 'Alcon / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 0,3% 5 mL'],
    activeComponents: ['ciprofloxacino 0,3%'],
    labelCompositionSummary: 'Produto humano de ciprofloxacino oftálmico usado extra-label em cães e gatos.',
    labelDirections: 'Plumb\'s: conjuntivite ou ceratite bacteriana sensível, 1 gota no olho afetado a cada 2-8 horas.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota no olho afetado q2-8h para conjuntivite/ceratite bacteriana sensível.',
      plumbs: {
        dog: [{ title: 'Conjuntivite/ceratite bacteriana sensível', dose: '1 gota no olho afetado q2-8h', note: 'Dose extra-label; considerar citologia/cultura e reavaliar resposta.' }],
        cat: [{ title: 'Conjuntivite/ceratite bacteriana sensível', dose: '1 gota no olho afetado q2-8h', note: 'Dose extra-label; acompanhar dor, secreção e superfície corneana.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve ciprofloxacino oftálmico para conjuntivite/ceratite por bactérias sensíveis; evitar uso sem diagnóstico e reavaliar se não houver resposta.',
    clinicalUse: 'Opção extra-label para infecção ocular bacteriana sensível.',
    reassessment: 'Reavaliar cedo em úlcera, dor ou ausência de resposta.',
    prescriptionExample: 'Ciloxan/ciprofloxacino 0,3%: instilar 1 gota no olho afetado a cada 2-8 horas conforme gravidade e reavaliação.',
    safetyAlert: 'Produto humano extra-label. Evitar uso sem diagnóstico; considerar cultura em casos graves/recorrentes.',
    productPageUrl: 'https://consultaremedios.com.br/ciloxan-solucao-oftalmica/bula',
    imageUrl: 'https://d163axztg8am2h.cloudfront.net/static/img/82/d6/738534207368db5396e1ef1b3fd9.webp',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'vigamox-moxifloxacino',
    slug: 'vigamox-moxifloxacino',
    name: 'Vigamox / Moxifloxacino oftálmico',
    manufacturer: 'Alcon / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 5 mL'],
    activeComponents: ['moxifloxacino oftálmico'],
    labelCompositionSummary: 'Fluoroquinolona oftálmica humana usada extra-label em veterinária.',
    labelDirections: 'Plumb\'s: conjuntivite, 1 gota no olho afetado q2-8h; ceratite, 1 gota ou 0,1 mL via cateter SPL q2-8h.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: conjuntivite 1 gota q2-8h; ceratite 1 gota ou 0,1 mL via SPL q2-8h.',
      plumbs: {
        dog: [
          { title: 'Conjuntivite bacteriana sensível', dose: '1 gota no olho afetado q2-8h', note: 'Uso extra-label; idealmente guiado por citologia/cultura e resposta clínica.' },
          { title: 'Ceratite bacteriana sensível', dose: '1 gota ou 0,1 mL via cateter SPL q2-8h', note: 'Reavaliar se blefaroespasmo, uveíte, piora de úlcera ou ausência de melhora.' }
        ],
        cat: [
          { title: 'Conjuntivite bacteriana sensível', dose: '1 gota no olho afetado q2-8h', note: 'Uso extra-label; confirmar indicação para fluoroquinolona.' },
          { title: 'Ceratite bacteriana sensível', dose: '1 gota ou 0,1 mL via cateter SPL q2-8h', note: 'Monitorar dor, úlcera e resposta; considerar cultura.' }
        ]
      }
    },
    plumbsContext: 'Plumb\'s descreve moxifloxacino oftálmico para conjuntivite/ceratite bacteriana confirmada ou sensível; evitar profilaxia e não misturar diretamente com outros colírios.',
    clinicalUse: 'Conjuntivite ou ceratite bacteriana por microrganismos sensíveis quando há indicação clínica para fluoroquinolona.',
    reassessment: 'Reavaliar citologia/cultura e resposta; se não houver melhora em até 7 dias ou houver piora/dor, rever diagnóstico e suscetibilidade.',
    prescriptionExample: 'Vigamox/moxifloxacino oftálmico: instilar 1 gota no olho afetado a cada 2-8 horas conforme indicação e gravidade.',
    safetyAlert: 'Produto humano extra-label. Não usar para olho vermelho sem exame, fluoresceína e avaliação de PIO quando indicado.',
    productPageUrl: 'https://www.drogasil.com.br/bulas/vigamox',
    imageUrl: 'https://drogaseconomicas.com/cdn/shop/files/46673_1_VIGAMOX_5MG_ML05_SOL_OFT_FCO_X_5ML.webp?v=1723131034',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'regencel-cristalia-latinofarma',
    slug: 'regencel',
    name: 'Regencel',
    manufacturer: 'Cristália/Latinofarma',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_epithelial',
    species: ['dog', 'cat'],
    presentations: ['Pomada oftálmica 3,5 g'],
    activeComponents: ['acetato de retinol 10.000 UI/g', 'aminoácidos 25 mg/g', 'metionina 5 mg/g', 'cloranfenicol 5 mg/g'],
    labelCompositionSummary: 'Pomada oftálmica humana com acetato de retinol, aminoácidos, metionina e cloranfenicol; usada extra-label como epitelizante com antibiótico.',
    labelDirections: 'Bula Regencel: aplicar cerca de 1 cm da pomada no saco conjuntival inferior, 3-4x ao dia, de acordo com a indicação.',
    dosageGuidance: {
      labelDose: 'Bula Regencel: 1 cm da pomada no saco conjuntival inferior 3-4x/dia.',
      plumbs: {
        dog: [{ title: 'Adjuvante epitelizante com antibiótico', dose: '1 cm no saco conjuntival inferior 3-4x/dia', note: 'Dose de bula humana; em veterinária, usar após diagnóstico da lesão e controle da causa.' }],
        cat: [{ title: 'Adjuvante epitelizante com antibiótico', dose: '1 cm no saco conjuntival inferior 3-4x/dia', note: 'Dose de bula humana; acompanhar tolerância e resposta corneana.' }]
      }
    },
    plumbsContext: 'Regencel não substitui antibiótico sistêmico/tópico dirigido, analgesia ou tratamento da causa em úlcera; o cloranfenicol exige evitar uso prolongado sem reavaliação.',
    clinicalUse: 'Suporte epitelizante/lubrificante em alterações superficiais selecionadas sob acompanhamento.',
    reassessment: 'Reavaliar cicatrização corneana com fluoresceína quando houver lesão.',
    prescriptionExample: 'Regencel pomada oftálmica: aplicar cerca de 1 cm no saco conjuntival inferior 3-4 vezes ao dia, com reavaliação da cicatrização.',
    safetyAlert: 'Produto humano extra-label com cloranfenicol. Não usar como tratamento único em úlcera infectada, profunda, melting ou perfuração.',
    productPageUrl: 'https://consultaremedios.com.br/regencel/bula',
    imageUrl: 'https://m.media-amazon.com/images/I/41IYvlaugBS.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'atropina-oftalmica',
    slug: 'atropina-oftalmica-1',
    name: 'Atropina 1% oftálmica',
    manufacturer: 'diversos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_mydriatic',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 1% 5 mL'],
    activeComponents: ['atropina 1%'],
    labelCompositionSummary: 'Antimuscarínico midriático/cicloplégico humano usado extra-label em cães e gatos.',
    labelDirections: 'Plumb\'s: midríase/cicloplegia, inicialmente 1 gota ou faixa de 1/4-1/2 pol no olho afetado 2-3x/dia; depois SID ou em dias alternados para manter efeito.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota ou faixa de 1/4-1/2 pol 2-3x/dia inicialmente; depois SID ou em dias alternados para manter midríase.',
      plumbs: {
        dog: [{ title: 'Uveíte anterior / espasmo ciliar', dose: '1 gota ou faixa de 1/4-1/2 pol no olho afetado 2-3x/dia inicialmente', note: 'Depois reduzir para SID ou dias alternados conforme midríase e conforto; evitar em glaucoma.' }],
        cat: [{ title: 'Uveíte anterior / espasmo ciliar', dose: '1 gota ou faixa de 1/4-1/2 pol no olho afetado 2-3x/dia inicialmente', note: 'Depois reduzir; salivação pode ocorrer pelo gosto amargo. Evitar em glaucoma.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve atropina oftálmica para reverter miose e tratar espasmo do corpo ciliar na uveíte anterior; não é tratamento para glaucoma e pode reduzir produção lacrimal.',
    clinicalUse: 'Dor/cicloplegia em uveíte anterior e espasmo ciliar quando indicado após exame.',
    reassessment: 'Reavaliar PIO, dor e resposta; evitar se glaucoma/suspeita de glaucoma.',
    prescriptionExample: 'Atropina 1% oftálmica: instilar 1 gota no olho afetado 2-3 vezes ao dia inicialmente; reduzir para SID ou dias alternados após midríase adequada.',
    safetyAlert: 'Contraindicada/evitar em glaucoma ou suspeita de glaucoma. Pode piorar olho seco; exige diagnóstico.',
    productPageUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/Atropina.pdf',
    imageUrl: 'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/14695c6f/atropina-1-solucao-oftalmica-esteril-5ml.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'dorzolamida-trusopt',
    slug: 'dorzolamida-trusopt',
    name: 'Dorzolamida 2% / Trusopt',
    manufacturer: 'Mundipharma/Merck / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_glaucoma',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 2%'],
    activeComponents: ['cloridrato de dorzolamida 2%'],
    labelCompositionSummary: 'Inibidor tópico da anidrase carbônica usado extra-label para reduzir produção de humor aquoso.',
    labelDirections: 'Plumb\'s: glaucoma, 1 gota no olho afetado q8-12h; alternativa via cateter SPL 0,1 mL q8-12h.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota no olho afetado q8-12h para glaucoma; alternativa 0,1 mL via SPL q8-12h.',
      plumbs: {
        dog: [{ title: 'Glaucoma/hipertensão ocular', dose: '1 gota no olho afetado q8-12h', note: 'Ajustar por tonometria, dor e resposta clínica.' }],
        cat: [{ title: 'Glaucoma/hipertensão ocular', dose: '1 gota no olho afetado q8-12h', note: 'Monitorar PIO, conforto ocular e doença primária.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve dorzolamida oftálmica como inibidor tópico da anidrase carbônica para glaucoma, com monitoramento de PIO, eficácia clínica e edema corneano.',
    clinicalUse: 'Glaucoma/hipertensão ocular quando se busca reduzir produção de humor aquoso.',
    reassessment: 'Reavaliar PIO, dor, visão e causa primária; glaucoma é urgência.',
    prescriptionExample: 'Dorzolamida 2%, aplicar 1 gota no olho afetado a cada 8-12 horas conforme PIO e reavaliação.',
    safetyAlert: 'Produto humano extra-label. Não iniciar sem tonometria quando possível; dor ocular/glaucoma exige avaliação urgente.',
    productPageUrl: 'https://www.drogasil.com.br/bulas/cloridrato-de-dorzolamida-20-mg-ml',
    imageUrl: 'https://media.naheed.pk/catalog/product/cache/ff36c7bc52e2e5dbc63cd67fba513679/1/0/1003071-1.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'cosopt-dorzolamida-timolol',
    slug: 'cosopt-dorzolamida-timolol',
    name: 'Cosopt / Dorzolamida + Timolol',
    manufacturer: 'Mundipharma/Merck / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_glaucoma',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 5 mL'],
    activeComponents: ['dorzolamida 2%', 'timolol 0,5%'],
    labelCompositionSummary: 'Associação humana de inibidor da anidrase carbônica + betabloqueador tópico.',
    labelDirections: 'Base Plumb\'s dos componentes: dorzolamida 1 gota q8-12h e timolol 1 gota BID; na associação, ajustar por PIO e risco cardiorrespiratório.',
    dosageGuidance: {
      labelDose: 'Referência Plumb\'s dos componentes: dorzolamida 1 gota q8-12h; timolol 1 gota BID. Para Cosopt, ajustar por PIO e risco sistêmico.',
      plumbs: {
        dog: [
          { title: 'Dorzolamida componente', dose: '1 gota no olho afetado q8-12h', note: 'Monitorar PIO e conforto ocular.' },
          { title: 'Timolol componente', dose: '1 gota no olho afetado BID', note: 'Avaliar frequência cardíaca, respiração e contraindicações.' }
        ],
        cat: [
          { title: 'Dorzolamida componente', dose: '1 gota no olho afetado q8-12h', note: 'Monitorar PIO e doença primária.' },
          { title: 'Timolol componente', dose: '1 gota no olho afetado BID', note: 'Maior cautela com efeitos sistêmicos, especialmente cardiorrespiratórios.' }
        ]
      }
    },
    plumbsContext: 'Cosopt combina dorzolamida e timolol; Plumb\'s traz as doses dos componentes para glaucoma. Timolol tópico pode causar bradicardia, hipotensão e broncoespasmo.',
    clinicalUse: 'Glaucoma/hipertensão ocular quando combinação é indicada e segura para o paciente.',
    reassessment: 'Monitorar PIO, frequência cardíaca, pressão arterial, respiração e dor ocular.',
    prescriptionExample: 'Cosopt: usar a partir das doses dos componentes (dorzolamida q8-12h; timolol BID) e ajustar por PIO, frequência cardíaca e respiração.',
    safetyAlert: 'Cautela/evitar em bradicardia, bloqueios, ICC descompensada, asma/broncoespasmo e pacientes debilitados.',
    productPageUrl: 'https://br.mundipharma.com/sites/mundi-pharma-brazil/files/2025-07/cosopt%20bula%20profissional%20ve0125.pdf',
    imageUrl: 'https://unidrogas.vtexassets.com/arquivos/ids/364073/3556610000208.jpg?v=638891185271200000',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'latanoprosta-xalatan',
    slug: 'latanoprosta-xalatan',
    name: 'Latanoprosta / Xalatan',
    manufacturer: 'Pfizer / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_glaucoma',
    species: ['dog'],
    presentations: ['Solução oftálmica 0,005% 2,5 mL'],
    activeComponents: ['latanoprosta 0,005%'],
    labelCompositionSummary: 'Análogo de prostaglandina humano que aumenta drenagem uveoescleral; uso extra-label.',
    labelDirections: 'Plumb\'s: cães com glaucoma primário/hipertensão ocular, 1 gota no olho afetado 1-2x ao dia.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: cães, 1 gota no olho afetado SID-BID para glaucoma primário/hipertensão ocular.',
      plumbs: {
        dog: [{ title: 'Glaucoma primário/hipertensão ocular', dose: '1 gota no olho afetado SID-BID', note: 'Monitorar PIO rapidamente; evitar quando uveíte/inflamação ou bloqueio pupilar forem risco.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve latanoprosta principalmente para cães com glaucoma primário/hipertensão ocular; geralmente não é indicada para a maioria dos glaucomas felinos, que costumam ser secundários.',
    clinicalUse: 'Glaucoma canino selecionado, especialmente quando se busca redução rápida de PIO por drenagem.',
    reassessment: 'Reavaliar PIO rapidamente e tratar como urgência quando há dor/visão ameaçada.',
    prescriptionExample: 'Latanoprosta/Xalatan: em cães, instilar 1 gota no olho afetado 1-2 vezes ao dia com controle de PIO.',
    safetyAlert: 'Produto humano extra-label. Pode ser inadequado em uveíte anterior/luxação de lente e tem resposta felina variável.',
    productPageUrl: 'https://www.drogasil.com.br/latanoprosta-0-005-mg-ems-genericos-2-5-ml.html',
    imageUrl: 'https://product-data.raiadrogasil.io/images/16452984.webp',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'pred-fort-prednisolona',
    slug: 'pred-fort-prednisolona-oftalmica',
    name: 'Pred Fort / Acetato de prednisolona 1%',
    manufacturer: 'Allergan / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_corticosteroid',
    species: ['dog', 'cat'],
    presentations: ['Suspensão oftálmica 1% 5 mL'],
    activeComponents: ['acetato de prednisolona 1%'],
    labelCompositionSummary: 'Corticosteroide oftálmico humano usado extra-label em cães e gatos.',
    labelDirections: 'Plumb\'s: conjuntivite/ceratite/uveíte anterior, 1 gota ou faixa de 1/4 pol no olho afetado q6h até melhora; depois reduzir gradualmente.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota ou faixa de 1/4 pol q6h até melhora; reduzir gradualmente. Usar só com fluoresceína negativa.',
      plumbs: {
        dog: [{ title: 'Inflamação ocular não ulcerativa', dose: '1 gota ou faixa de 1/4 pol no olho afetado q6h', note: 'Após melhora, reduzir gradualmente; monitorar PIO e superfície ocular.' }],
        cat: [{ title: 'Inflamação ocular não ulcerativa', dose: '1 gota ou faixa de 1/4 pol no olho afetado q6h', note: 'Monitorar PIO, superfície ocular e risco infeccioso/herpesvírus.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve prednisolona oftálmica para conjuntivite, ceratite e uveíte anterior não ulcerativas; contraindicar se houver úlcera ou infecção ocular não controlada.',
    clinicalUse: 'Uveíte anterior e inflamação ocular não ulcerativa sob acompanhamento.',
    reassessment: 'Reavaliar fluoresceína, PIO e resposta inflamatória; monitorar risco infeccioso.',
    prescriptionExample: 'Pred Fort/prednisolona acetato 1%: instilar 1 gota no olho afetado q6h até melhora, depois reduzir, apenas com fluoresceína negativa.',
    safetyAlert: 'Bloquear se úlcera/suspeita de úlcera, trauma, perfuração, infecção não controlada ou herpesvírus felino ativo suspeito.',
    productPageUrl: 'https://www.drogasil.com.br/bulas/acetato-de-prednisolona',
    imageUrl: 'https://static.salcobrandonline.cl/spree/products/122904/large/215350.jpg?1727969790',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'tobradex-alcon',
    slug: 'tobradex',
    name: 'Tobradex',
    manufacturer: 'Alcon',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic_steroid',
    commercialSubclasses: ['ophthalmic_antibiotic_steroid', 'ophthalmic_antibiotic', 'ophthalmic_corticosteroid'],
    species: ['dog', 'cat'],
    presentations: ['Suspensão oftálmica 5 mL'],
    activeComponents: ['tobramicina 0,3%', 'dexametasona 0,1%'],
    labelCompositionSummary: 'Associação humana de antibiótico aminoglicosídeo + corticosteroide usada extra-label.',
    labelDirections: 'Plumb\'s: combinação tobramicina + glicocorticoide, 1 gota ou faixa de 1/4-1/2 pol no olho afetado 3-4x/dia; reduzir após controle.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota ou faixa de 1/4-1/2 pol 3-4x/dia; reduzir após controle. Exige fluoresceína negativa.',
      plumbs: {
        dog: [{ title: 'Combinação tobramicina + corticoide', dose: '1 gota ou faixa de 1/4-1/2 pol no olho afetado 3-4x/dia', note: 'Reduzir após controle; usar somente sem úlcera corneana.' }],
        cat: [{ title: 'Combinação tobramicina + corticoide', dose: '1 gota ou faixa de 1/4-1/2 pol no olho afetado 3-4x/dia', note: 'Cautela com herpesvírus/infecção; exigir fluoresceína negativa.' }]
      }
    },
    plumbsContext: 'Plumb\'s traz posologia para combinação tobramicina + glicocorticoide; o componente corticoide torna obrigatório descartar úlcera corneana.',
    clinicalUse: 'Inflamação ocular não ulcerativa com necessidade de cobertura antibiótica tópica, quando indicado.',
    reassessment: 'Reavaliar em curto prazo; monitorar PIO e sinais de úlcera/infeção.',
    prescriptionExample: 'Tobradex: instilar 1 gota no olho afetado 3-4 vezes ao dia, reduzindo após controle, apenas com fluoresceína negativa.',
    safetyAlert: 'Corticoide tópico é contraindicado em úlcera de córnea ou suspeita. Produto humano extra-label.',
    productPageUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/Tobradex.pdf',
    imageUrl: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dwfc1fa545/images/large/68023-tobradex-gotas-solucion-oftalmica-5-ml-tobramicina-03.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'maxitrol-alcon',
    slug: 'maxitrol',
    name: 'Maxitrol',
    manufacturer: 'Alcon',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic_steroid',
    commercialSubclasses: ['ophthalmic_antibiotic_steroid', 'ophthalmic_antibiotic', 'ophthalmic_corticosteroid'],
    species: ['dog', 'cat'],
    presentations: ['Suspensão oftálmica 5 mL'],
    activeComponents: ['dexametasona', 'neomicina', 'polimixina B'],
    labelCompositionSummary: 'Associação humana de corticosteroide + antibióticos usada extra-label em veterinária.',
    labelDirections: 'Base Plumb\'s para dexametasona oftálmica: 1 gota ou faixa de 1/4 pol até q2h inicialmente em inflamação não ulcerativa; reduzir após melhora.',
    dosageGuidance: {
      labelDose: 'Plumb\'s dexametasona: 1 gota ou faixa de 1/4 pol até q2h inicialmente; reduzir após melhora. Exige fluoresceína negativa.',
      plumbs: {
        dog: [{ title: 'Inflamação ocular não ulcerativa', dose: '1 gota ou faixa de 1/4 pol no olho afetado até q2h inicialmente', note: 'Reduzir gradualmente após melhora; não usar em úlcera ou infecção não controlada.' }],
        cat: [{ title: 'Inflamação ocular não ulcerativa', dose: '1 gota ou faixa de 1/4 pol no olho afetado até q2h inicialmente', note: 'Cautela com herpesvírus e monitorar PIO/superfície ocular.' }]
      }
    },
    plumbsContext: 'Maxitrol combina antibióticos com dexametasona; Plumb\'s descreve a dose da dexametasona oftálmica e reforça contraindicação em úlcera ou infecção ocular não controlada.',
    clinicalUse: 'Inflamação ocular não ulcerativa com cobertura antibiótica selecionada.',
    reassessment: 'Reavaliar superfície ocular, PIO e resposta em curto prazo.',
    prescriptionExample: 'Maxitrol: instilar 1 gota no olho afetado conforme intensidade inflamatória, podendo iniciar até q2h e reduzir após melhora, apenas com fluoresceína negativa.',
    safetyAlert: 'Bloquear em úlcera/suspeita de úlcera, trauma, perfuração ou infecção viral/fúngica não controlada.',
    productPageUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/MaxitrolColirio.pdf',
    imageUrl: 'https://siman.vtexassets.com/arquivos/ids/4695327/image-3195141f37d64906af252bac24996d87.jpg?v=638307497774870000',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'acular-ls-cetorolaco',
    slug: 'acular-ls-cetorolaco',
    name: 'Acular LS / Cetorolaco 0,4%',
    manufacturer: 'Allergan / genéricos',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_nsaid',
    species: ['dog', 'cat'],
    presentations: ['Solução oftálmica 0,4% 5 mL'],
    activeComponents: ['cetorolaco trometamol 0,4%'],
    labelCompositionSummary: 'AINE oftálmico humano usado extra-label em cães e gatos.',
    labelDirections: 'Plumb\'s: conjuntivite alérgica ou inflamação de segmento anterior, 1 gota no olho afetado 2-4x/dia; analgesia pós-operatória 1 gota 2-4x/dia.',
    dosageGuidance: {
      labelDose: 'Plumb\'s: 1 gota no olho afetado 2-4x/dia para conjuntivite alérgica/inflamação anterior; pós-op 2-4x/dia.',
      plumbs: {
        dog: [{ title: 'Inflamação/alergia ocular', dose: '1 gota no olho afetado 2-4x/dia', note: 'Monitorar dor, fluoresceína e cicatrização corneana.' }],
        cat: [{ title: 'Inflamação/alergia ocular', dose: '1 gota no olho afetado 2-4x/dia', note: 'Usar com avaliação de superfície ocular e reavaliação curta.' }]
      }
    },
    plumbsContext: 'Plumb\'s descreve cetorolaco oftálmico para conjuntivite alérgica, inflamação de segmento anterior e analgesia pós-operatória; monitorar cicatrização e superfície ocular.',
    clinicalUse: 'Inflamação/dor ocular selecionada, especialmente quando corticoide tópico é contraindicado ou indesejado.',
    reassessment: 'Reavaliar dor, fluoresceína e resposta; suspender se houver piora corneana.',
    prescriptionExample: 'Acular LS/cetorolaco 0,4%: instilar 1 gota no olho afetado 2-4 vezes ao dia conforme indicação e reavaliação.',
    safetyAlert: 'Produto humano extra-label. Cautela em úlcera, olho seco importante e cicatrização corneana comprometida.',
    productPageUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/AcularAlergan.pdf',
    imageUrl: 'https://www.farmaciasahumada.cl/on/demandware.static/-/Sites-ahumada-master-catalog/default/dw03de2a7d/images/products/47817/47817.jpg',
    price: { averageLabel: 'Dados incompletos', rangeLabel: 'Preço não consolidado no trecho anexado', sourceDate: '2026-06-17' }
  },
  {
    id: 'hydrapet-xampu-agener',
    slug: 'hydrapet-xampu',
    name: 'Hydrapet Xampu',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_hydration',
    commercialSubclasses: ['skin_hydration', 'skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Frasco conforme linha comercial'],
    activeComponents: ['fitoesfingosina', 'ureia', 'óleo de macadâmia', 'queratina', 'lipossomas', 'ácido lático'],
    labelCompositionSummary: 'Dermocosmético hidratante com componentes de suporte de barreira; composição resumida conforme pesquisa comercial.',
    labelDirections: 'Aplicar no banho, respeitar tempo de contato de 10 minutos e enxaguar. Frequência usual 1-2 vezes por semana.',
    dosageGuidance: { labelDose: 'Uso tópico: tempo de contato de 10 minutos; 1-2x/semana conforme caso.' },
    plumbsContext: 'Sem dose Plumb’s. Xampus hidratantes são adjuvantes de barreira e não substituem diagnóstico dermatológico.',
    clinicalUse: 'Pele seca, dermatite atópica, descamação, manutenção de barreira cutânea e suporte em pacientes com banhos terapêuticos.',
    reassessment: 'Reavaliar se houver pústulas, crostas, alopecia progressiva, prurido intenso, mau cheiro, otite ou lesões úmidas.',
    prescriptionExample: 'Hydrapet Xampu, aplicar durante o banho, deixar agir por 10 minutos e enxaguar bem. Usar 1-2 vezes por semana.',
    safetyAlert: 'Adjuvante dermatológico. Evitar olhos e mucosas; não substitui controle de pulgas, dieta, antimicrobiano, antifúngico ou tratamento de atopia.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/hidrapet-xampu/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2021/10/hidrapet_xampu-scaled.jpg',
    labelUrl: 'https://agener.com.br/wp-content/uploads/2021/11/4026844-Hidrapet-Xampu.pdf',
    price: { averageLabel: 'R$ 162,00 aprox.', rangeLabel: 'Preço médio informado na tabela resumida', sourceDate: '2026-06-17' }
  },
  {
    id: 'hydrapet-creme-agener',
    slug: 'hydrapet-creme',
    name: 'Hydrapet Creme',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_hydration',
    commercialSubclasses: ['skin_hydration', 'skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Creme hidratante 100 g'],
    activeComponents: ['óleo de macadâmia', 'ceramida', 'silicones'],
    labelCompositionSummary: 'Creme hidratante pós-banho com óleo de macadâmia, ceramida e silicones conforme fontes comerciais.',
    labelDirections: 'Aplicar após o banho, espalhar na pele/pelagem e não enxaguar.',
    dosageGuidance: { labelDose: 'Uso tópico pós-banho, sem enxágue.' },
    plumbsContext: 'Sem dose Plumb’s. Hidratantes tópicos são adjuvantes de barreira.',
    clinicalUse: 'Hidratação pós-banho, pele/pelagem ressecadas, dermatite atópica e suporte de barreira.',
    reassessment: 'Reavaliar se ressecamento vier com infecção, prurido intenso, crostas, alopecia ou odor.',
    prescriptionExample: 'Hydrapet Creme, aplicar após o banho sobre pele e pelagem, massageando suavemente. Não enxaguar.',
    safetyAlert: 'Evitar olhos, mucosas e feridas abertas. Não substitui tratamento da dermatopatia de base.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/hidrapet/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2020/01/hidrapet-1.jpg',
    price: { averageLabel: 'R$ 158,00 aprox.', rangeLabel: 'Preço médio informado na tabela resumida', sourceDate: '2026-06-17' }
  },
  {
    id: 'hydrapet-skin-on-agener',
    slug: 'hydrapet-skin-on',
    name: 'Hydrapet Skin On',
    manufacturer: 'Agener União',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_barrier',
    commercialSubclasses: ['skin_barrier', 'skin_hydration'],
    species: ['dog', 'cat'],
    presentations: ['Frasco borrifador 20 mL'],
    activeComponents: ['ceramidas 2,5 g/100 mL', 'fitoesfingosina 0,1 g/100 mL', 'colesterol 2,5 g/100 mL', 'ácidos graxos 11,4 g/100 mL', 'óleo de macadâmia 0,2 g/100 mL', 'aloe vera 5 g/100 mL'],
    labelCompositionSummary: 'Spray de barreira cutânea com ceramidas, fitoesfingosina, colesterol, ácidos graxos, macadâmia e aloe vera.',
    labelDirections: 'Borrifar nas áreas indicadas, massagear suavemente até espalhar e não enxaguar.',
    dosageGuidance: { labelDose: 'Uso tópico por borrifação; frequência conforme orientação veterinária.' },
    plumbsContext: 'Sem dose Plumb’s. Produto adjuvante de restauração de barreira cutânea.',
    clinicalUse: 'Uso entre banhos em pele seca, dermatite atópica, descamação e áreas localizadas de ressecamento.',
    reassessment: 'Reavaliar se houver lesões infectadas, prurido intenso, otite, mau cheiro ou piora das áreas.',
    prescriptionExample: 'Hydrapet Skin On, borrifar sobre áreas ressecadas/sensíveis da pele e pelagem, massageando suavemente. Não enxaguar.',
    safetyAlert: 'Evitar olhos, mucosas e feridas abertas. Em contato ocular acidental, lavar com água corrente abundante.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/dermatologicos/hidrapet-skin-on/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2021/07/MicrosoftTeams-image-34-1.png',
    price: { averageLabel: 'R$ 78,90', rangeLabel: 'Amazon: R$ 78,90', sourceDate: '2026-06-17' }
  },
  {
    labelUrl: 'https://www.vetsmart.com.br/pequenos-animais/produto/hidrapet-omega',
    id: 'hydrapet-omega-agener',
    slug: 'hydrapet-omega',
    name: 'Hydrapet Ômega',
    manufacturer: 'Agener União',
    commercialClass: 'nutraceutical',
    commercialSubclass: 'nutra_omega3',
    commercialSubclasses: ['nutra_omega3', 'skin_hydration', 'skin_barrier'],
    species: ['dog', 'cat'],
    presentations: ['Frasco com 60 cápsulas moles saborosas'],
    activeComponents: ['ômega 3 (EPA e DHA) e ômega 6 (ácido linoleico), biotina, zinco quelatado, vitaminas A e E'],
    labelCompositionSummary: 'Suplemento mineral vitamínico com ácidos graxos essenciais (Ômega 3 e 6), biotina, zinco quelatado e vitaminas A e E.',
    labelDirections: 'Administrar 1 cápsula ao dia para cães e gatos de até 10 kg de peso. A cápsula pode ser administrada inteira ou o conteúdo oferecido misturado ao alimento. Acima de 10 kg, administrar a critério do médico-veterinário.',
    dosageGuidance: {'labelDose':'1 cápsula ao dia para cães e gatos de até 10 kg de peso.'},
    plumbsContext: 'Suplemento dermatológico com ácidos graxos e micronutrientes; não equivale automaticamente a dose terapêutica calculada de EPA + DHA.',
    clinicalUse: 'Suporte de pele/pelagem/barreira cutânea como adjuvante em dermatite atópica, xerose e pelagem seca, após confirmar composição.',
    reassessment: 'Reavaliar tolerância gastrointestinal, dieta, triglicérides e resposta dermatológica em semanas.',
    prescriptionExample: 'Administrar 1 cápsula de Hydrapet Ômega por via oral a cada 24 horas, misturada ao alimento ou inteira.',
    safetyAlert: 'Cautela em pancreatite, hiperlipidemia, dietas muito gordurosas, vômitos/diarreia com gordura e uso com anticoagulantes/antiagregantes em dose alta.',
    productPageUrl: 'https://agener.com.br/produtos/pequenos-animais/suplementos/hidrapet-omega/',
    imageUrl: 'https://agener.com.br/wp-content/uploads/2021/11/hidra-1.jpg',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Preço não localizado', sourceDate: '2026-06-17' }
  }
];
