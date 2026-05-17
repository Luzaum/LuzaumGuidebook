import { CommercialMedicationProduct } from '../types/commercialMedication';

const PRICE_SOURCE_DATE = '2026-05-16';

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
];
