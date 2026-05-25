import { CommercialMedicationProduct } from '../types/commercialMedication';

const PRICE_SOURCE_DATE = '2026-05-16';
const ECTO_PRICE_SOURCE_DATE = '2026-05-24';
const OMEGA_PRICE_SOURCE_DATE = '2026-05-16';

const OMEGA3_PLUMBS_CONTEXT =
  'Ômega 3 deve ser calculado pela soma EPA + DHA, não pelo peso total da cápsula ou do óleo. Plumb’s descreve uso como adjuvante em dermatopatias inflamatórias, DRC, osteoartrite, doença cardiovascular, hiperlipidemia e outras condições, com resposta em semanas a meses.';

const OMEGA3_SAFETY_ALERT =
  'Usar com cautela em pancreatite prévia, diarreia crônica, coagulopatias, trombocitopenia ou uso de AINEs, antiagregantes e anticoagulantes. Evitar óleo de fígado de bacalhau para dose terapêutica e não usar óleo de linhaça como substituto de EPA/DHA em gatos.';

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
    id: 'apoquel-zoetis',
    slug: 'apoquel-oclacitinib',
    name: 'Apoquel',
    manufacturer: 'Zoetis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1089500-280-280/Apoquel-16-mg---Tratamento-para-coceira-em-Caes.webp?v=638974316343630000',
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
    id: 'cytopoint-zoetis',
    slug: 'cytopoint-lokivetmab',
    name: 'Cytopoint',
    manufacturer: 'Zoetis',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl: 'https://www.zoetis.com.br/produtos-e-servicos/animais-de-companhia/cytopoint/img/home/hero.png',
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
    id: 'cyclavance-virbac',
    slug: 'cyclavance-ciclosporina',
    name: 'Cyclavance',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    commercialSubclasses: ['skin_atopy', 'skin_pruritus'],
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1087866-280-280/Solucao-Oral-Cyclavance-para-Caes-Virbac.webp?v=638966620486470000',
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
    id: 'ciclosporina-gatos-atopica',
    slug: 'ciclosporina-gatos-atopica',
    name: 'Ciclosporina microemulsão para gatos',
    manufacturer: 'Referência: Atopica for Cats / manipulado',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    commercialSubclasses: ['skin_atopy', 'skin_pruritus'],
    imageUrl: 'https://media.scahealth.com/product/atopica-cat-_33_03_b_330309.jpg',
    species: ['cat'],
    presentations: ['Ciclosporina oral microemulsão', 'Produto veterinário felino pode ter disponibilidade limitada no Brasil'],
    activeComponents: ['ciclosporina'],
    labelCompositionSummary:
      'Referência conceitual para gatos. Produto clássico internacional: Atopica for Cats. No Brasil, pode depender de disponibilidade, uso criterioso de produto veterinário para cães ou manipulação.',
    labelDirections:
      'Dose inicial referenciada em gatos: 7 mg/kg VO a cada 24 horas por pelo menos 4 a 6 semanas ou até remissão clínica; depois reduzir para dias alternados ou duas vezes por semana quando possível.',
    plumbsContext:
      'Imunomodulador útil em dermatite alérgica crônica felina. Preferir avaliação individual, testagem e monitoramento.',
    clinicalUse:
      'Gatos com prurido alérgico crônico quando se busca manutenção poupadora de corticoide.',
    reassessment:
      'Monitorar vômito, anorexia, perda de peso, infecções, otite, piodermite e alterações hepáticas.',
    prescriptionExample:
      'Considerar 7 mg/kg VO SID por 4-6 semanas; reduzir frequência quando houver controle, conforme avaliação veterinária.',
    safetyAlert:
      'Testar FIV/FeLV quando possível e avaliar risco de toxoplasmose, especialmente em gatos caçadores ou alimentados com carne crua.',
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Depende de produto disponível, importação/manipulação e volume',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'cortavance-virbac',
    slug: 'cortavance-aceponato-hidrocortisona',
    name: 'Cortavance',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1062562-194-194/Cortavance-Spray.png?v=638647070191670000',
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
    id: 'cortotic-virbac',
    slug: 'cortotic-aceponato-hidrocortisona-otologico',
    name: 'Cortotic',
    manufacturer: 'Virbac',
    commercialClass: 'dermatologic',
    commercialSubclass: 'otic_corticosteroid',
    commercialSubclasses: ['otic_corticosteroid', 'skin_pruritus'],
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1061129-194-194/cortotic-solucao-otologica-virbac.png?v=638618540029970000',
    species: ['dog'],
    presentations: ['Solução otológica para cães'],
    activeComponents: ['aceponato de hidrocortisona 0,584 mg/mL'],
    labelCompositionSummary:
      'Solução otológica com aceponato de hidrocortisona 0,584 mg/mL.',
    labelDirections:
      'Uso otológico conforme bula e avaliação. Produto voltado a inflamação/prurido em otite externa não purulenta.',
    plumbsContext:
      'Anti-inflamatório otológico sem antibiótico, útil para reduzir uso desnecessário de combinações antibiótico + antifúngico + corticoide.',
    clinicalUse:
      'Otite externa não purulenta em cães, especialmente eritematosa/pruriginosa sem citologia infecciosa relevante.',
    reassessment:
      'Fazer citologia quando possível e reavaliar se houver secreção, dor, microrganismos abundantes ou suspeita de otite média.',
    prescriptionExample:
      'Aplicar no ouvido afetado conforme bula e orientação veterinária após avaliação otológica.',
    safetyAlert:
      'Somente cães. Não usar sozinho em otite purulenta, Malassezia intensa, bastonetes, cocos abundantes ou otite média.',
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Confirmar varejo/estoque',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'prediderm-ourofino',
    slug: 'prediderm-prednisolona',
    name: 'Prediderm',
    manufacturer: 'Ourofino',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/1043759-194-194/Prediderm-20mg-para-caes.png?v=638146729978430000',
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
    id: 'prednisolona-humana',
    slug: 'prednisolona-humana-predsim-genericos',
    name: 'Prednisolona humana',
    manufacturer: 'Predsim / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://www.sansilfarma.com.br/BACKOFFICE/Uploads/Produto/Ampliada/2_fml_.jpg',
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
    id: 'azium-msd',
    slug: 'azium-dexametasona',
    name: 'Azium',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://www.msd-saude-animal.com.br/wp-content/uploads/sites/55/2020/07/azium-e1594733976611.jpg',
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
    id: 'hixizine-hidroxizina',
    slug: 'hixizine-hidroxizina',
    name: 'Hixizine / hidroxizina',
    manufacturer: 'Uso humano / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://www.farmaciareal.com.br/uploads/farmaciareal/produtos_imagens/referencia1593695589119435312.jpg',
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
    id: 'cetirizina-zyrtec-genericos',
    slug: 'cetirizina-zyrtec-genericos',
    name: 'Cetirizina',
    manufacturer: 'Zyrtec / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://cdn1.staticpanvel.com.br/produtos/15/generico.jpg',
    species: ['dog', 'cat'],
    presentations: ['Comprimidos 10 mg', 'Solução oral 1 mg/mL'],
    activeComponents: ['dicloridrato de cetirizina'],
    labelCompositionSummary:
      'Anti-histamínico H1 de segunda geração, menos sedativo, usado extra bula.',
    labelDirections:
      'Cães: geralmente 1 mg/kg VO a cada 24 horas. Gatos: 1 mg/kg VO a cada 24 horas é faixa usada em estudos, com resposta variável.',
    plumbsContext:
      'Pode ser útil em condições histamínicas, mas não parece efetiva para crises agudas ou crônicas de dermatite atópica canina; estudo felino não mostrou diferença estatística contra placebo em 14 dias.',
    clinicalUse:
      'Urticária, picada de inseto, prurido leve, rinite/conjuntivite alérgica e prevenção em pacientes leves.',
    reassessment:
      'Não usar como monoterapia para atopia moderada/grave.',
    prescriptionExample:
      'Administrar 1 mg/kg VO SID, observando resposta individual.',
    safetyAlert:
      'Pode causar vômito, hipersalivação ou sonolência. Melhor preventivo diário em quadro leve, não resgate de crise forte.',
    price: {
      averageLabel: 'R$ 15,00 a R$ 40,00',
      rangeLabel: 'Genéricos; marca pode ser mais cara',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
    id: 'dexclorfeniramina-polaramine-polaren',
    slug: 'dexclorfeniramina-polaramine-polaren',
    name: 'Dexclorfeniramina',
    manufacturer: 'Polaramine / Polaren / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://cdn.ultrafarma.com.br/static/produtos/20875/large-637673297645372593-20875_4.jpg',
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
    id: 'difenidramina-difenidrin',
    slug: 'difenidramina-difenidrin',
    name: 'Difenidramina',
    manufacturer: 'Difenidrin / genéricos',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus'],
    imageUrl: 'https://precisionhospitalar.com.br/wp-content/uploads/2026/02/Ampola-scaled.png',
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
    id: 'ograx-derme-avert',
    slug: 'ograx-derme',
    name: 'Ograx Derme',
    manufacturer: 'Avert',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_atopy',
    commercialSubclasses: ['skin_atopy', 'skin_pruritus'],
    imageUrl:
      'https://cobasi.vteximg.com.br/arquivos/ids/1078887-280-280/Suplemento-para-Caes-Ograx-Derme-20-Avert.webp?v=638849924660830000',
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
      'https://br.virbac.com/files/live/sites/virbac-br/files/predefined-files/products/News%20Packshoots/Hexadene%20500mL%20BR-22B.png',
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
      'Modo de uso detalhado não informado na página oficial aberta. Usar conforme prescrição; como shampoo medicamentoso, manter contato por cerca de 10 minutos antes do enxágue quando indicado.',
    plumbsContext:
      'Clorexidina baixa, perfil mais compatível com manutenção e recidivas leves.',
    clinicalUse:
      'Controle de dermatoses, seborreia, prurido, exsudação leve, prevenção de recidivas e piodermites leves.',
    reassessment:
      'Reavaliar se não controlar odor, crostas ou lesões em 2 semanas; pode ser insuficiente para infecção importante.',
    prescriptionExample:
      'Aplicar como shampoo dermatológico, manter contato conforme orientação veterinária e enxaguar completamente.',
    safetyAlert:
      'Página oficial aberta não trouxe protocolo detalhado; evitar prescrição sem orientar tempo de contato e frequência.',
    price: {
      averageLabel: 'Confirmar varejo',
      rangeLabel: 'Preço confiável não confirmado em grande varejo na consulta',
      sourceDate: PRICE_SOURCE_DATE,
    },
  },
  {
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
      'Modo de uso completo não informado na página oficial aberta. Orientação clínica: aplicar como shampoo medicamentoso, manter contato por 10 minutos e enxaguar, 2 a 3 vezes por semana na fase inicial.',
    plumbsContext:
      'Clorexidina 4% é opção tópica forte para redução de carga bacteriana.',
    clinicalUse:
      'Piodermite superficial, dermatite bacteriana, pododermatite e dermatite com odor/crostas.',
    reassessment:
      'Reavaliar em 2 a 4 semanas e reduzir frequência conforme resposta e ressecamento cutâneo.',
    prescriptionExample:
      'Dar banho com Megatrat Clorexidina 4%, manter contato por 10 minutos e enxaguar completamente. Usar 2 a 3 vezes por semana inicialmente.',
    safetyAlert:
      'Pode ressecar ou irritar; ajustar frequência em pele sensível.',
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
    activeComponents: ['clorexidina, concentração não confirmada', 'óleo de jojoba citado em descrições comerciais'],
    labelCompositionSummary:
      'Produto popular com clorexidina citada em varejos e agregadores, mas sem bula oficial robusta ou concentração confirmada na fonte aberta consultada.',
    labelDirections:
      'Modo de uso deve seguir rótulo do produto adquirido. Para prescrição técnica, preferir produto com concentração documentada.',
    plumbsContext:
      'Baixa confiança de fonte para decisão terapêutica; não usar como referência principal em piodermite ou Malassezia.',
    clinicalUse:
      'Baixo custo e higiene geral quando o objetivo não exige concentração documentada de clorexidina.',
    reassessment:
      'Se houver lesão ativa, odor, crostas ou pústulas, reavaliar e migrar para produto com composição confirmada.',
    prescriptionExample:
      'Usar conforme rótulo se escolhido para higiene geral. Para piodermite, preferir shampoo com clorexidina em concentração definida.',
    safetyAlert:
      'Concentração não confirmada e fonte oficial insuficiente; manter em seção de baixo custo/baixa confiança, não como terapêutico equivalente.',
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
    imageUrl: 'https://www.bartofil.com.br/media/catalog/product/1/1/115499_a.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=800&width=800&canvas=800:800',
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
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/babyox.png',
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
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-cell-5-30cpl-packshot-500px.png',
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
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-cell-15-30cpl-packshot-500px.png',
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
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-senior-5-30cpl-packshot-500px.png',
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
    imageUrl: 'https://avertsaudeanimal.com.br/images/uploads/posts/ograx-senior-10-30cpl-packshot-500px.png',
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
    imageUrl: 'https://botupharmapet.com.br/wp-content/uploads/2024/02/omega_3_vet_junto_novo-1024x1024.webp',
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
    imageUrl: 'https://cobasi.vteximg.com.br/arquivos/ids/933089-368-368/suplemento-para-caes-e-gatos-omega-top-3-500-mg.jpg?v=638134522113030000',
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
];
