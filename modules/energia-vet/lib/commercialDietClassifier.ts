import type { FoodItem } from '../types'

export type CommercialDietType = 'healthy' | 'therapeutic'

export type MaintenanceCategory =
  | 'breed_specific'
  | 'size_specific'
  | 'growth_reproduction'
  | 'adult_maintenance'
  | 'mature_senior'
  | 'sterilised_indoor'
  | 'specific_care'
  | 'general_maintenance'

export type TherapeuticSpecialty =
  | 'renal'
  | 'gastrointestinal'
  | 'dermatology_allergy'
  | 'urinary'
  | 'hepatic'
  | 'cardiac'
  | 'obesity_satiety'
  | 'convalescence_recovery'
  | 'diabetic'
  | 'joint_mobility'
  | 'general_clinical'

export interface CommercialDietMetadata {
  food: FoodItem
  dietType: CommercialDietType
  brand: string
  lineName: string
  specialty?: TherapeuticSpecialty
  specialtyLabel?: string
  maintenanceCategory?: MaintenanceCategory
  maintenanceCategoryLabel?: string
  textureType: 'dry' | 'wet'
  textureLabel: string
  summaryPt: string
  clinicalIndications: string[]
  keyHighlights: Array<{ label: string; value: string; hint?: string }>
  caloricDensityKcalKg: number
  caloricDensityKcal100g: number
  proteinPctDm: number
  fatPctDm: number
  carbPctDm: number
  fiberPctDm: number
  moisturePct: number
  dryMatterPct: number
  calciumPctDm?: number
  phosphorusPctDm?: number
  caPRatio?: string
  sodiumPctDm?: number
  potassiumPctDm?: number
  omega3PctDm?: number
  brandTheme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    badgeBg: string
    badgeText: string
  }
}

const THERAPEUTIC_KEYWORDS: Record<TherapeuticSpecialty, string[]> = {
  renal: ['renal', 'early renal', 'renal select', 'renal special', 'k/d', 'estágios iniciais'],
  gastrointestinal: ['gastrointestinal', 'gastro intestinal', 'gastro', 'intestinal', 'i/d', 'low fat', 'fiber response'],
  dermatology_allergy: ['hypoallergenic', 'hipoalergênico', 'anallergenic', 'skin support', 'dermatosis', 'derm', 'z/d', 'dermatoses'],
  urinary: ['urinary', 'urinary so', 'c/d', 'u/d', 's/o', 'oxalati', 'struvite', 'estruvita', 'urinária'],
  hepatic: ['hepatic', 'hepático', 'hepática', 'l/d'],
  cardiac: ['cardiac', 'cardíaco', 'cardíaca', 'h/d'],
  obesity_satiety: ['obesity', 'satiety', 'obeso', 'obesidade', 'weight control', 'r/d', 'w/d', 'metabolic', 'light clínico'],
  convalescence_recovery: ['recovery', 'urgent care', 'a/d', 'critical care', 'convalescence', 'revalescence', 'alta energia'],
  diabetic: ['diabetic', 'diabético', 'diabéticos', 'w/d', 'glicêmico'],
  joint_mobility: ['mobility', 'articular', 'j/d'],
  general_clinical: ['veterinary', 'vet care', 'nutrição clínica', 'prescription diet', 'vet life'],
}

export function classifyCommercialDiet(food: FoodItem): CommercialDietMetadata {
  const nameLower = (food.name || '').toLowerCase()
  const catLower = (food.category || '').toLowerCase()
  const presLower = (food.presentation || '').toLowerCase()

  // 1. Identify Brand
  let brand = 'Marca Selecionada'
  let lineName = 'Linha Comercial'
  let brandTheme = {
    primaryColor: '#e11d48',
    secondaryColor: '#be123c',
    accentColor: '#ffe4e6',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeText: 'text-rose-700 dark:text-rose-300',
  }

  if (nameLower.includes('royal canin')) {
    brand = 'Royal Canin'
    lineName = nameLower.includes('veterinary') || nameLower.includes('clinical') ? 'Veterinary Diet' : 'Fisiológica / Raças'
    brandTheme = {
      primaryColor: '#dc2626',
      secondaryColor: '#991b1b',
      accentColor: '#fee2e2',
      badgeBg: 'bg-red-50 dark:bg-red-950/40',
      badgeText: 'text-red-700 dark:text-red-300',
    }
  } else if (nameLower.includes('premier') || nameLower.includes('premiêr') || nameLower.includes('golden')) {
    brand = nameLower.includes('golden') ? 'Golden (PremierPet)' : 'PremierPet'
    lineName = nameLower.includes('nutrição clínica') || nameLower.includes('clinica') ? 'Nutrição Clínica' : nameLower.includes('nattu') ? 'Nattu' : 'Super Premium'
    brandTheme = {
      primaryColor: '#0f766e',
      secondaryColor: '#115e59',
      accentColor: '#ccfbf1',
      badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
      badgeText: 'text-teal-700 dark:text-teal-300',
    }
  } else if (nameLower.includes('vet life') || nameLower.includes('vetlife') || nameLower.includes('farmina') || nameLower.includes('n&d')) {
    brand = 'Farmina Vet Life'
    lineName = nameLower.includes('n&d') ? 'N&D Prime / Ocean' : 'Vet Life Terapêutica'
    brandTheme = {
      primaryColor: '#1e3a8a',
      secondaryColor: '#172554',
      accentColor: '#dbeafe',
      badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
      badgeText: 'text-blue-700 dark:text-blue-300',
    }
  } else if (nameLower.includes('hill') || nameLower.includes('hills') || nameLower.includes('prescription diet')) {
    brand = "Hill's Prescription Diet"
    lineName = nameLower.includes('science diet') ? 'Science Diet' : 'Prescription Diet'
    brandTheme = {
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      accentColor: '#eff6ff',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
    }
  } else if (nameLower.includes('pro plan') || nameLower.includes('purina')) {
    brand = 'Purina Pro Plan'
    lineName = nameLower.includes('veterinary') ? 'Veterinary Diets' : 'Super Premium'
    brandTheme = {
      primaryColor: '#7c3aed',
      secondaryColor: '#5b21b6',
      accentColor: '#f3e8ff',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
      badgeText: 'text-purple-700 dark:text-purple-300',
    }
  } else if (nameLower.includes('equilibrio') || nameLower.includes('equilíbrio')) {
    brand = 'Equilíbrio Veterinary'
    lineName = 'Veterinary Diets'
    brandTheme = {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#d1fae5',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
    }
  } else if (nameLower.includes('biofresh')) {
    brand = 'Biofresh'
    lineName = 'Super Premium Natural'
    brandTheme = {
      primaryColor: '#16a34a',
      secondaryColor: '#15803d',
      accentColor: '#dcfce7',
      badgeBg: 'bg-green-50 dark:bg-green-950/40',
      badgeText: 'text-green-700 dark:text-green-300',
    }
  }

  // 2. Identify Texture (Dry vs Wet)
  const isWet =
    presLower.includes('sachê') ||
    presLower.includes('sache') ||
    presLower.includes('lata') ||
    presLower.includes('patê') ||
    presLower.includes('pate') ||
    presLower.includes('mousse') ||
    presLower.includes('ensopado') ||
    catLower.includes('sachê') ||
    catLower.includes('lata') ||
    catLower.includes('patê') ||
    catLower.includes('ensopado') ||
    (food.nutrientsAsFed.moisturePct != null && food.nutrientsAsFed.moisturePct > 45)

  const textureType: 'dry' | 'wet' = isWet ? 'wet' : 'dry'
  const textureLabel = isWet
    ? presLower.includes('sachê') || nameLower.includes('sachê')
      ? 'Úmida (Sachê)'
      : presLower.includes('patê') || nameLower.includes('patê')
      ? 'Úmida (Patê)'
      : presLower.includes('mousse') || nameLower.includes('mousse')
      ? 'Úmida (Mousse)'
      : 'Úmida (Lata)'
    : 'Seca (Extrusada)'

  // 3. Identify Therapeutic Specialty vs Healthy
  let specialty: TherapeuticSpecialty | undefined = undefined
  let specialtyLabel: string | undefined = undefined

  for (const [spec, keywords] of Object.entries(THERAPEUTIC_KEYWORDS) as Array<[TherapeuticSpecialty, string[]]>) {
    if (keywords.some((kw) => nameLower.includes(kw) || catLower.includes(kw))) {
      specialty = spec
      break
    }
  }

  const dietType: CommercialDietType = specialty ? 'therapeutic' : 'healthy'

  const SPECIALTY_LABELS: Record<TherapeuticSpecialty, string> = {
    renal: 'Suporte Renal (DRC / IRIS)',
    gastrointestinal: 'Gastrointestinal & Low Fat',
    dermatology_allergy: 'Dermatológica & Hipoalergênica',
    urinary: 'Trato Urinário & Dissolução de Cálculos',
    hepatic: 'Hepatologia & Suporte Hepático',
    cardiac: 'Cardiologia & Baixo Sódio',
    obesity_satiety: 'Manejo de Obesidade & Saciedade',
    convalescence_recovery: 'Recuperação, UTI & Alta Densidade',
    diabetic: 'Endocrinologia & Controle Glicêmico',
    joint_mobility: 'Articular & Suporte Osteoarticular',
    general_clinical: 'Coadjuvante Clínica',
  }

  if (specialty) {
    specialtyLabel = SPECIALTY_LABELS[specialty]
  }

  let maintenanceCategory: MaintenanceCategory | undefined
  let maintenanceCategoryLabel: string | undefined

  if (dietType === 'healthy') {
    const searchableName = ` ${nameLower.replace(/[-_/]+/g, ' ')} `
    const breedTerms = [
      'bulldog', 'pug', 'persian', 'persa', 'maine coon', 'boxer', 'dachshund', 'teckel',
      'french bulldog', 'bulldog francês', 'german shepherd', 'pastor alemão', 'golden retriever',
      'labrador', 'maltese', 'maltês', 'schnauzer', 'pomeranian', 'spitz', 'poodle', 'rottweiler',
      'shih tzu', 'yorkshire', 'siamese', 'siamês', 'bengal', 'sphynx', 'ragdoll',
    ]
    const sizeTerms = ['x-small', 'x small', 'mini ', 'medium ', 'maxi ', 'giant ', 'porte pequeno', 'porte médio', 'porte grande', 'porte gigante']
    const growthTerms = ['puppy', 'kitten', 'filhote', 'junior', 'starter', 'mother', 'babycat', 'babydog', 'gestação', 'lactação']
    const seniorTerms = ['senior', 'sênior', 'mature', 'maduro', 'ageing', 'aging', '7+', '8+', '10+', '12+', 'idoso']
    const lifestyleTerms = ['sterilised', 'sterilized', 'castrado', 'indoor', 'ambiente interno']
    const careTerms = [
      'care', 'sensible', 'sensível', 'sensitive', 'exigent', 'fit 32', 'light', 'hairball',
      'hair & skin', 'hair skin', 'coat', 'dental', 'relax', 'appetite control', 'controle do apetite',
    ]

    if (breedTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'breed_specific'
      maintenanceCategoryLabel = 'Raças específicas'
    } else if (lifestyleTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'sterilised_indoor'
      maintenanceCategoryLabel = 'Castrados & vida indoor'
    } else if (careTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'specific_care'
      maintenanceCategoryLabel = 'Cuidados específicos'
    } else if (growthTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'growth_reproduction'
      maintenanceCategoryLabel = 'Filhotes, gestação & lactação'
    } else if (seniorTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'mature_senior'
      maintenanceCategoryLabel = 'Maduros & idosos'
    } else if (sizeTerms.some((term) => searchableName.includes(term))) {
      maintenanceCategory = 'size_specific'
      maintenanceCategoryLabel = 'Porte específico'
    } else if (searchableName.includes('adult') || searchableName.includes('adulto')) {
      maintenanceCategory = 'adult_maintenance'
      maintenanceCategoryLabel = 'Adultos — manutenção diária'
    } else {
      maintenanceCategory = 'general_maintenance'
      maintenanceCategoryLabel = 'Manutenção geral'
    }
  }

  // 4. Extract Nutrients
  const moisturePct = food.nutrientsAsFed.moisturePct ?? (isWet ? 78 : 10)
  const dryMatterPct = food.nutrientsAsFed.dryMatterPct ?? (100 - moisturePct)
  const caloricDensityKcal100g = food.nutrientsAsFed.energyKcalPer100g ?? (isWet ? 95 : 380)
  const caloricDensityKcalKg = Math.round(caloricDensityKcal100g * 10)

  const proteinPctDm = food.nutrientsDryMatter.crudeProteinPct ?? ((food.nutrientsAsFed.crudeProteinPct ?? 0) / (dryMatterPct / 100))
  const fatPctDm = food.nutrientsDryMatter.etherExtractPct ?? ((food.nutrientsAsFed.etherExtractPct ?? 0) / (dryMatterPct / 100))
  const fiberPctDm = food.nutrientsDryMatter.crudeFiberPct ?? ((food.nutrientsAsFed.crudeFiberPct ?? 0) / (dryMatterPct / 100))
  const carbPctDm = food.nutrientsDryMatter.nitrogenFreeExtractPct ?? Math.max(0, 100 - (proteinPctDm + fatPctDm + fiberPctDm + (food.nutrientsDryMatter.ashPct ?? 6)))

  const calciumPctDm = food.nutrientsDryMatter.calciumPct ?? undefined
  const phosphorusPctDm = food.nutrientsDryMatter.phosphorusPct ?? undefined
  const caPRatio =
    calciumPctDm && phosphorusPctDm && phosphorusPctDm > 0
      ? `${(calciumPctDm / phosphorusPctDm).toFixed(2)} : 1`
      : undefined

  const sodiumPctDm = food.nutrientsDryMatter.sodiumPct ?? undefined
  const potassiumPctDm = food.nutrientsDryMatter.potassiumPct ?? undefined
  const omega3PctDm = food.nutrientsDryMatter.omega3Pct ?? undefined

  // 5. Build Summary & Clinical Indications
  const speciesLabel = food.speciesScope === 'dog' ? 'cães' : food.speciesScope === 'cat' ? 'gatos' : 'cães e gatos'

  let summaryPt = `Alimento comercial completo e balanceado formulado especificamente para ${speciesLabel}, fornecendo perfil nutricional alinhado às diretrizes FEDIAF e NRC.`
  const clinicalIndications: string[] = []

  if (dietType === 'therapeutic' && specialty) {
    switch (specialty) {
      case 'renal':
        summaryPt = `Dieta clínica coadjuvante de precisão para ${speciesLabel} com doença renal crônica (DRC), formulada com teores rigorosamente controlados de fósforo e sódio.`
        clinicalIndications.push('Restrição de fósforo para desacelerar a progressão da nefropatia.')
        clinicalIndications.push('Proteínas de alto valor biológico para reduzir o acúmulo de metabólitos nitrogenados e minimizar a azotemia.')
        clinicalIndications.push('Enriquecimento com ácidos graxos ômega-3 (EPA/DHA) para suporte hemodinâmico renal.')
        clinicalIndications.push('Alta densidade calórica para prevenir caquexia e perda de escore corporal (ECC).')
        break
      case 'gastrointestinal':
        summaryPt = `Fórmula altamente digestível e balanceada para ${speciesLabel} com distúrbios digestivos agudos ou crônicos, gastrites e enteropatias.`
        clinicalIndications.push('Ingredientes de altíssima digestibilidade para reduzir a sobrecarga osmótica intestinal.')
        clinicalIndications.push('Perfil lipídico moderado ou baixo (Low Fat) para redução de esteatorreia e estímulo pancreático.')
        clinicalIndications.push('Fibras prebióticas (FOS/MOS) para modulação da microbiota e suporte à barreira mucosa.')
        clinicalIndications.push('Eletrólitos ajustados para reposição de perdas em vômitos e diarreias.')
        break
      case 'dermatology_allergy':
        summaryPt = `Dieta terapêutica hipoalergênica para ${speciesLabel} com reações adversas ao alimento (RAA), dermatite atópica ou alergias cutâneas.`
        clinicalIndications.push('Proteína hidrolisada ou fonte proteica nobre/novel para evitar reações imunomediadas.')
        clinicalIndications.push('Elevada concentração de ácidos graxos essenciais (ômega-3 e ômega-6) para barreira cutânea.')
        clinicalIndications.push('Fonte purificada de carboidratos com digestibilidade superior.')
        clinicalIndications.push('Complexo sinérgico de antioxidantes e vitaminas para regeneração da derme e pelos.')
        break
      case 'urinary':
        summaryPt = `Alimento formulado para manejo das afecções do trato urinário inferior em ${speciesLabel}, auxiliando na dissolução e prevenção de recidivas de urólitos.`
        clinicalIndications.push('Controle estrito de magnésio, fósforo e precursores de cálculos de estruvita e oxalato.')
        clinicalIndications.push('Manejo do RSS (Relative Super Saturation) e modulação do pH urinário.')
        clinicalIndications.push('Estímulo ao aumento do volume urinário e diluição de solutos litogênicos.')
        break
      case 'hepatic':
        summaryPt = `Dieta coadjuvante com restrição controlada de cobre e densidade energética otimizada para suporte à insuficiência hepática e hepatopatias.`
        clinicalIndications.push('Restrição estrita de cobre e suplementação de zinco como quelante natural.')
        clinicalIndications.push('Proteína altamente digestível de fontes vegetais ou lácteas para prevenir encefalopatia hepática.')
        clinicalIndications.push('Alta densidade energética para combater o catabolismo proteico em hepatopatas.')
        break
      case 'cardiac':
        summaryPt = `Fórmula cardioprotetora para ${speciesLabel} com cardiopatias e insuficiência cardíaca congestiva (ICC), estágios B2, C e D.`
        clinicalIndications.push('Restrição precoce e ativa de sódio para redução da sobrecarga volêmica.')
        clinicalIndications.push('Suplementação de taurina e L-carnitina para otimização da contratilidade miocárdica.')
        clinicalIndications.push('Elevada concentração de EPA/DHA para combate à caquexia cardíaca mediada por citocinas.')
        break
      case 'obesity_satiety':
        summaryPt = `Alimento terapêutico com alta densidade proteica e complexo de fibras para perda segura de massa gorda em ${speciesLabel} com sobrepeso ou obesidade.`
        clinicalIndications.push('Alta relação proteína/caloria para preservar 100% da massa muscular (EMC) no emagrecimento.')
        clinicalIndications.push('Mix balanceado de fibras solúveis e insolúveis para saciedade prolongada pós-prandial.')
        clinicalIndications.push('Baixo índice glicêmico para estabilidade da curva de glicose e insulina.')
        break
      case 'convalescence_recovery':
        summaryPt = `Dieta hipercalórica e de alta palatabilidade desenvolvida para suporte nutricional intensivo, internação e alimentação assistida por sonda.`
        clinicalIndications.push('Altíssima densidade energética (RER suprido em volumes reduzidos).')
        clinicalIndications.push('Textura macia/pastosa compatível com seringa e sondas enterais (esofagostomia / nasoesofágica).')
        clinicalIndications.push('Alto teor proteico para cicatrização, suporte imunológico e anabolismo.')
        break
      case 'diabetic':
        summaryPt = `Fórmula para manejo dietético do Diabetes Mellitus em ${speciesLabel}, auxiliando na regulação da glicemia e controle ponderal.`
        clinicalIndications.push('Carboidratos complexos de liberação lenta para evitar picos glicêmicos pós-prandiais.')
        clinicalIndications.push('Teor proteico elevado para sustentação de massa magra e controle de saciedade.')
        break
      case 'joint_mobility':
        summaryPt = `Alimento formulado para suporte ao metabolismo articular em osteoartrite e pós-operatório ortopédico de ${speciesLabel}.`
        clinicalIndications.push('Altas doses de EPA/DHA para inibição de mediadores pró-inflamatórios articulares.')
        clinicalIndications.push('Sulfato de condroitina e glicosamina para proteção da matriz cartilaginosa.')
        break
      default:
        summaryPt = `Dieta clínica veterinária coadjuvante desenvolvida para fornecer suporte específico a pacientes sob tratamento médico.`
        clinicalIndications.push('Suporte nutricional sob prescrição e acompanhamento do médico-veterinário.')
        break
    }
  } else {
    if (nameLower.includes('filhote') || nameLower.includes('puppy') || nameLower.includes('kitten')) {
      summaryPt = `Alimento super premium balanceado para a fase de crescimento rápido de ${speciesLabel} filhotes, garantindo desenvolvimento osteomuscular e imunológico.`
      clinicalIndications.push('Relação cálcio/fósforo e densidade energética ideais para suporte ao crescimento esquelético saudável.')
      clinicalIndications.push('Enriquecido com DHA para suporte ao desenvolvimento cognitivo, visual e neurológico.')
      clinicalIndications.push('Prebióticos e polpa de beterraba para formação de fezes firmes e equilíbrio intestinal.')
    } else if (nameLower.includes('senior') || nameLower.includes('sênior') || nameLower.includes('idoso')) {
      summaryPt = `Fórmula especializada para ${speciesLabel} em idade madura/sênior, com antioxidantes naturais e proteção articular.`
      clinicalIndications.push('Níveis adaptados de fósforo e sódio para proteção das funções renal e cardíaca do paciente idoso.')
      clinicalIndications.push('Complexo antioxidante (Vitamina E, C e Selênio) para proteção celular contra envelhecimento precoce.')
      clinicalIndications.push('Proteínas nobres de fácil absorção para prevenção da sarcopenia da idade.')
    } else if (nameLower.includes('castrado') || nameLower.includes('neutered') || nameLower.includes('indoor') || nameLower.includes('gatos')) {
      summaryPt = `Fórmula com controle calórico e suporte ao trato urinário desenvolvida para ${speciesLabel} castrados ou de ambiente interno.`
      clinicalIndications.push('L-carnitina e calorias moderadas para prevenção do ganho de peso pós-castração.')
      clinicalIndications.push('Minerais balanceados para manter o pH urinário adequado e prevenir urólitos.')
      clinicalIndications.push('Fibras especiais e extrato de Yucca para redução do odor e volume das fezes.')
    } else {
      summaryPt = `Alimento nutricionalmente completo para ${speciesLabel} adultos, fornecendo energia metabolizável estável e nutrientes essenciais.`
      clinicalIndications.push('Equilíbrio de macronutrientes conforme parâmetros de referência FEDIAF 2025.')
      clinicalIndications.push('Ácidos graxos ômega-3 e ômega-6 para manutenção da barreira cutânea e pelagem brilhante.')
      clinicalIndications.push('Proteínas de alto valor biológico com excelente digestibilidade aparente.')
    }
  }

  const keyHighlights = [
    { label: 'Energia Metabolizável', value: `${caloricDensityKcal100g.toFixed(0)} kcal/100g`, hint: `${caloricDensityKcalKg} kcal/kg` },
    { label: 'Proteína Bruta (MS)', value: `${proteinPctDm.toFixed(1)}%`, hint: `${(food.nutrientsAsFed.crudeProteinPct ?? 0).toFixed(1)}% na MN` },
    { label: 'Extrato Etéreo (MS)', value: `${fatPctDm.toFixed(1)}%`, hint: `${(food.nutrientsAsFed.etherExtractPct ?? 0).toFixed(1)}% na MN` },
    { label: 'Carboidratos (ENN)', value: `${carbPctDm.toFixed(1)}%`, hint: 'Estimativa Atwater' },
  ]

  return {
    food,
    dietType,
    brand,
    lineName,
    specialty,
    specialtyLabel,
    maintenanceCategory,
    maintenanceCategoryLabel,
    textureType,
    textureLabel,
    summaryPt,
    clinicalIndications,
    keyHighlights,
    caloricDensityKcalKg,
    caloricDensityKcal100g,
    proteinPctDm,
    fatPctDm,
    carbPctDm,
    fiberPctDm,
    moisturePct,
    dryMatterPct,
    calciumPctDm,
    phosphorusPctDm,
    caPRatio,
    sodiumPctDm,
    potassiumPctDm,
    omega3PctDm,
    brandTheme,
  }
}
