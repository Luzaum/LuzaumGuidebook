import { formatStructuredConcentration } from './rxConcentration'
import { PharmacyType, PrescriptionItem, PrescriptionState, RouteGroup } from './rxTypes'

export interface ProfileSettings {
  adminId: string
  fullName: string
  crmv: string
  uf: string
  specialty: string
  clinicName: string
  clinicCnpj: string
  clinicAddress: string
  clinicPhone: string
  clinicLogoDataUrl: string
  signatureDataUrl: string
  mapaSignatureDataUrl: string
}

export interface PrescriberProfile extends ProfileSettings {
  id: string
  profileName: string
  createdAt: string
  updatedAt: string
}

export interface CatalogPresentation {
  id: string
  name: string
  concentration: string
  secondaryConcentration?: string
  concentrationValue?: string
  concentrationUnit?: string
  concentrationPerValue?: string
  concentrationPerUnit?: string
  unitLabel: string
  commercialName?: string
  averagePrice?: string
  pharmacyTags: PharmacyType[]
}

export interface CatalogDrug {
  id: string
  name: string
  speciesTargets: string[]
  controlled: boolean
  pharmacyType: 'humana' | 'veterinaria' | 'manipulacao'
  routeGroup: RouteGroup
  doseUnit: string
  notes: string
  presentations: CatalogPresentation[]
  updatedAt: string
}

export interface PatientRecord {
  id: string
  name: string
  species: string
  breed: string
  sex: string
  ageText: string
  weightKg: string
  tutorName: string
  tutorPhone: string
  tutorAddress: string
  updatedAt: string
}

export interface ClientAnimalRecord {
  id: string
  name: string
  species: string
  breed: string
  coat: string
  sex: string
  reproductiveStatus: string
  ageText: string
  weightKg: string
  weightDate: string
  anamnesis: string
  notes: string
  weightHistory: Array<{
    id: string
    date: string
    weightKg: string
    source: 'manual' | 'prescription'
  }>
  updatedAt: string
}

export interface ClientRecord {
  id: string
  fullName: string
  cpf: string
  rg: string
  phone: string
  email: string
  addressStreet: string
  addressNumber: string
  addressComplement: string
  addressDistrict: string
  addressCity: string
  addressState: string
  addressZip: string
  notes: string
  animals: ClientAnimalRecord[]
  updatedAt: string
}

export interface HistoryRecord {
  id: string
  prescriptionId: string
  createdAt: string
  patientName: string
  tutorName: string
  patientId?: string
  tutorId?: string
}

export type ProtocolSpecies = 'Caes' | 'Gatos' | 'Geral'

export interface RxProtocolFolder {
  id: string
  name: string
  color: string
  icon: string
  sortOrder: number
}

export interface RxProtocol {
  id: string
  name: string
  summary: string
  folderId: string
  requiresSpecialControl: boolean
  species: ProtocolSpecies
  active: boolean
  tags: string[]
  durationLabel: string
  items: PrescriptionItem[]
  recommendations: string[]
  exams: string[]
  examReasons: string[]
  createdAt: string
  updatedAt: string
}

export interface RxTemplateStyle {
  id: string
  name: string
  documentKindTarget: 'standard' | 'special-control'
  fontFamily: string
  fontSizePt: number
  headingSizePt: number
  lineHeight: number
  accentColor: string
  textColor: string
  paperBg: string
  paperSize: 'A4' | 'A5'
  showLetterhead: boolean
  showSignature: boolean
  showMapaSignature: boolean
  showTimestamp: boolean
  extraNotes: string
  zoneStyles: Partial<Record<TemplateZoneKey, TemplateZoneStyle>>
  updatedAt: string
}

export type TemplateZoneKey = 'header' | 'patient' | 'body' | 'recommendations' | 'signature'

export interface TemplateZoneStyle {
  fontFamily?: string
  fontSizePt?: number
  textColor?: string
  accentColor?: string
  fontWeight?: 'normal' | 'medium' | 'bold'
  italic?: boolean
  underline?: boolean
}

export interface RxDatabase {
  profile: ProfileSettings
  prescriberProfiles: PrescriberProfile[]
  catalog: CatalogDrug[]
  patients: PatientRecord[]
  clients: ClientRecord[]
  history: HistoryRecord[]
  protocolFolders: RxProtocolFolder[]
  protocols: RxProtocol[]
  templates: RxTemplateStyle[]
  activeTemplateId: string
}

const LEGACY_DB_KEY = 'receituario-vet:db:v1'

function getCurrentUserDbKey(): string {
  let userId = 'anon'
  try {
    const rawUser = localStorage.getItem('luzaum-user')
    if (rawUser) {
      const parsed = JSON.parse(rawUser) as { id?: string }
      const id = String(parsed?.id || '').trim()
      if (id) userId = id
    }
  } catch {
    // noop
  }
  return `${LEGACY_DB_KEY}:${userId}`
}

function nowIso() {
  return new Date().toISOString()
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const NUMERIC_ID_PATTERN = /^\d{5}$/

function isNumericRecordId(value: string | null | undefined): boolean {
  return NUMERIC_ID_PATTERN.test(String(value || '').trim())
}

function nextNumericRecordId(existingIds: string[]): string {
  let max = 0
  existingIds.forEach((rawId) => {
    const id = String(rawId || '').trim()
    if (!isNumericRecordId(id)) return
    const n = Number(id)
    if (Number.isFinite(n) && n > max) max = n
  })
  return String(max + 1).padStart(5, '0')
}

function allocateClientId(db: RxDatabase, currentId?: string): string {
  const id = String(currentId || '').trim()
  if (isNumericRecordId(id)) return id
  return nextNumericRecordId(db.clients.map((entry) => entry.id))
}

function allocateAnimalId(db: RxDatabase, currentId?: string, reserved: Set<string> = new Set()): string {
  const id = String(currentId || '').trim()
  if (isNumericRecordId(id) && !reserved.has(id)) {
    reserved.add(id)
    return id
  }
  const pool = db.clients.flatMap((entry) => entry.animals.map((animal) => animal.id))
  let next = nextNumericRecordId(pool)
  while (reserved.has(next)) {
    const seed = [...pool, ...Array.from(reserved)]
    next = nextNumericRecordId(seed)
  }
  reserved.add(next)
  return next
}

const PHARMACY_TYPE_VALUES: PharmacyType[] = ['humana', 'veterinaria', 'manipulacao']

function normalizePharmacyTags(
  tags: unknown,
  fallback: PharmacyType = 'veterinaria'
): PharmacyType[] {
  if (!Array.isArray(tags)) return [fallback]
  const normalized = tags
    .map((value) => String(value || '').trim().toLowerCase())
    .filter((value): value is PharmacyType => PHARMACY_TYPE_VALUES.includes(value as PharmacyType))
  return normalized.length ? Array.from(new Set(normalized)) : [fallback]
}

function repairMojibake(value: string): string {
  if (!value) return ''
  const hasReplacementChar = value.includes('\uFFFD')
  const hasCommonMojibakeMarkers = /[ÃÂâ]/.test(value)
  if (!hasReplacementChar && !hasCommonMojibakeMarkers) return value

  const replacements: Record<string, string> = {
    'ï¿½': '-',
    '\\uFFFD': '-',
    'â€¢': '-',
    'â€“': '-',
    'â€”': '-',
    'â€œ': '"',
    'â€': '"',
    'â€˜': "'",
    'â€™': "'",
    'Â ': ' ',
  }

  try {
    let decoded = decodeURIComponent(escape(value))
    for (const [from, to] of Object.entries(replacements)) {
      decoded = decoded.replaceAll(from, to)
    }
    return decoded
  } catch {
    let cleaned = value
    for (const [from, to] of Object.entries(replacements)) {
      cleaned = cleaned.replaceAll(from, to)
    }
    return cleaned
  }
}

const defaultProfile: ProfileSettings = {
  adminId: 'ADMIN',
  fullName: 'Dr. Silva',
  crmv: '12345',
  uf: 'SP',
  specialty: 'Clínica Médica de Pequenos Animais',
  clinicName: 'CLÍNICA VETERINÁRIA VETIUS',
  clinicCnpj: '',
  clinicAddress: 'Rua das Flores, 123 - Jardins, São Paulo - SP',
  clinicPhone: '(11) 99999-8888',
  clinicLogoDataUrl: '',
  signatureDataUrl: '',
  mapaSignatureDataUrl: '',
}

function seedCatalog(): CatalogDrug[] {
  const now = nowIso()
  return [
    {
      id: uid('drug'),
      name: 'Apoquel',
      speciesTargets: ['Caes'],
      controlled: false,
      pharmacyType: 'veterinaria',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Antipruriginoso.',
      updatedAt: now,
      presentations: [
        { id: uid('pres'), name: 'Comprimido', concentration: '16 mg/comprimido', unitLabel: 'comprimido', pharmacyTags: ['veterinaria'] },
        { id: uid('pres'), name: 'Comprimido', concentration: '5.4 mg/comprimido', unitLabel: 'comprimido', pharmacyTags: ['veterinaria'] },
      ],
    },
    {
      id: uid('drug'),
      name: 'Dipirona Sódica',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: false,
      pharmacyType: 'humana',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Analgésico e antipirético.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Gotas', concentration: '500 mg/mL', unitLabel: 'mL', pharmacyTags: ['humana'] }],
    },
    {
      id: uid('drug'),
      name: 'Amoxicilina + Clavulanato',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: false,
      pharmacyType: 'veterinaria',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Antibiótico de amplo espectro.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Comprimido', concentration: '250 mg/comprimido', unitLabel: 'comprimido', pharmacyTags: ['veterinaria', 'humana'] }],
    },
    {
      id: uid('drug'),
      name: 'Meloxicam',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: false,
      pharmacyType: 'veterinaria',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'AINE.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Suspensão Oral', concentration: '0.2 mg/mL', unitLabel: 'mL', pharmacyTags: ['veterinaria'] }],
    },
    {
      id: uid('drug'),
      name: 'Tramadol',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: true,
      pharmacyType: 'humana',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Uso controlado.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Cápsula', concentration: '50 mg/cápsula', unitLabel: 'cápsula', pharmacyTags: ['veterinaria', 'humana', 'manipulacao'] }],
    },
    {
      id: uid('drug'),
      name: 'Cefalexina',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: false,
      pharmacyType: 'veterinaria',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Antibiótico oral.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Comprimido', concentration: '500 mg/comprimido', unitLabel: 'comprimido', pharmacyTags: ['veterinaria', 'humana'] }],
    },
    {
      id: uid('drug'),
      name: 'Omeprazol',
      speciesTargets: ['Caes', 'Gatos'],
      controlled: false,
      pharmacyType: 'humana',
      routeGroup: 'ORAL',
      doseUnit: 'mg/kg',
      notes: 'Protetor gástrico.',
      updatedAt: now,
      presentations: [{ id: uid('pres'), name: 'Cápsula', concentration: '20 mg/cápsula', unitLabel: 'cápsula', pharmacyTags: ['humana'] }],
    },
  ]
}

const PRESET_PROTOCOL_FOLDERS: Array<Omit<RxProtocolFolder, 'sortOrder'>> = [
  { id: 'folder-pos-operatorio', name: 'PÓS-OPERATÓRIO', color: '#22c55e', icon: 'healing' },
  { id: 'folder-dermatologia', name: 'DERMATOLOGIA', color: '#f59e0b', icon: 'dermatology' },
  { id: 'folder-cardiologia', name: 'CARDIOLOGIA', color: '#ef4444', icon: 'cardiology' },
  { id: 'folder-pneumologia', name: 'PNEUMOLOGIA', color: '#38bdf8', icon: 'respiratory_rate' },
  { id: 'folder-nefrologia', name: 'NEFROLOGIA', color: '#8b5cf6', icon: 'water_drop' },
  { id: 'folder-urologia', name: 'UROLOGIA', color: '#06b6d4', icon: 'urology' },
  { id: 'folder-ortopedia', name: 'ORTOPEDIA', color: '#f97316', icon: 'orthopedics' },
  { id: 'folder-gastro', name: 'GASTROENTEROLOGIA', color: '#a3e635', icon: 'gastroenterology' },
]

function seedProtocolFolders(): RxProtocolFolder[] {
  return PRESET_PROTOCOL_FOLDERS.map((folder, index) => ({
    ...folder,
    sortOrder: index + 1,
  }))
}

function createProtocolTemplateItem(partial: Partial<PrescriptionItem>): PrescriptionItem {
  const now = nowIso()
  return {
    id: partial.id || uid('item'),
    category: partial.category || 'medication',
    controlled: partial.controlled ?? false,
    catalogDrugId: partial.catalogDrugId || '',
    name: partial.name || '',
    presentation: partial.presentation || '',
    concentration: partial.concentration || '',
    commercialName: partial.commercialName || '',
    pharmacyType: partial.pharmacyType || 'veterinaria',
    packageType: partial.packageType || 'caixa',
    pharmacyName: partial.pharmacyName || '',
    observations: partial.observations || '',
    routeGroup: partial.routeGroup || 'ORAL',
    doseValue: partial.doseValue || '',
    doseUnit: partial.doseUnit || 'mg/kg',
    autoInstruction: partial.autoInstruction ?? true,
    frequencyType: partial.frequencyType || 'timesPerDay',
    frequencyToken: partial.frequencyToken || '',
    timesPerDay: partial.timesPerDay || '2',
    everyHours: partial.everyHours || '',
    durationDays: partial.durationDays || '7',
    untilFinished: partial.untilFinished ?? false,
    continuousUse: partial.continuousUse ?? false,
    instruction: partial.instruction || '',
    manualEdited: partial.manualEdited ?? false,
    titleBold: partial.titleBold ?? false,
    titleUnderline: partial.titleUnderline ?? false,
    cautions: Array.isArray(partial.cautions) ? partial.cautions : [],
    createdAt: partial.createdAt || now,
    updatedAt: partial.updatedAt || now,
  }
}

function firstCatalogHit(catalog: CatalogDrug[], query: string): CatalogDrug | undefined {
  const needle = query.toLowerCase()
  return catalog.find((drug) => drug.name.toLowerCase().includes(needle))
}

function createProtocolItemFromCatalog(
  catalog: CatalogDrug[],
  query: string,
  fallbackName: string,
  overrides?: Partial<PrescriptionItem>
): PrescriptionItem {
  const drug = firstCatalogHit(catalog, query)
  const presentation = drug?.presentations?.[0]
  const defaultPharmacyType = presentation?.pharmacyTags?.[0] || drug?.pharmacyType || 'veterinaria'
  return createProtocolTemplateItem({
    name: drug?.name || fallbackName,
    catalogDrugId: drug?.id || '',
    controlled: !!drug?.controlled,
    presentation: presentation?.name || 'Comprimido',
    concentration: presentation?.concentration || '',
    commercialName: presentation?.commercialName || '',
    pharmacyType: overrides?.pharmacyType || defaultPharmacyType,
    routeGroup: overrides?.routeGroup || drug?.routeGroup || 'ORAL',
    doseUnit: overrides?.doseUnit || drug?.doseUnit || 'mg/kg',
    ...overrides,
  })
}

function seedProtocols(catalog: CatalogDrug[]): RxProtocol[] {
  const now = nowIso()
  return [
    {
      id: uid('protocol'),
      name: 'Pós-Castração Cães',
      summary: 'Controle de dor, anti-inflamatório e antimicrobiano para pós-operatório de tecidos moles.',
      folderId: 'folder-pos-operatorio',
      requiresSpecialControl: false,
      species: 'Caes',
      active: true,
      tags: ['Cirurgia', 'Dor', 'Antimicrobiano'],
      durationLabel: '5-7 dias',
      items: [
        createProtocolItemFromCatalog(catalog, 'meloxicam', 'Meloxicam', {
          doseValue: '0.1',
          doseUnit: 'mg/kg',
          frequencyType: 'timesPerDay',
          timesPerDay: '1',
          durationDays: '5',
          cautions: ['Administrar após alimentação.'],
        }),
        createProtocolItemFromCatalog(catalog, 'dipirona', 'Dipirona Sódica', {
          doseValue: '25',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '8',
          durationDays: '3',
        }),
        createProtocolItemFromCatalog(catalog, 'amoxicilina', 'Amoxicilina + Clavulanato', {
          doseValue: '12.5',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '12',
          durationDays: '7',
        }),
      ],
      recommendations: [
        'Manter repouso relativo por 7 dias.',
        'Retornar em 48 horas para avaliação da ferida cirúrgica.',
      ],
      exams: ['Hemograma completo'],
      examReasons: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uid('protocol'),
      name: 'Otite Externa Canina',
      summary: 'Tratamento padrão para otite externa aguda com anti-inflamatório e analgesia.',
      folderId: 'folder-dermatologia',
      requiresSpecialControl: false,
      species: 'Caes',
      active: true,
      tags: ['Otológico', 'Dermatologia'],
      durationLabel: '10-14 dias',
      items: [
        createProtocolItemFromCatalog(catalog, 'dipirona', 'Dipirona Sódica', {
          doseValue: '20',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '12',
          durationDays: '4',
        }),
        createProtocolItemFromCatalog(catalog, 'meloxicam', 'Meloxicam', {
          doseValue: '0.1',
          doseUnit: 'mg/kg',
          frequencyType: 'timesPerDay',
          timesPerDay: '1',
          durationDays: '5',
        }),
      ],
      recommendations: [
        'Realizar limpeza auricular diária antes da medicação tópica.',
        'Retornar em 7 dias para reavaliação otoscópica.',
      ],
      exams: ['Citologia'],
      examReasons: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uid('protocol'),
      name: 'Dermatite Atópica',
      summary: 'Controle de prurido e inflamação com monitoramento de resposta clínica.',
      folderId: 'folder-dermatologia',
      requiresSpecialControl: false,
      species: 'Caes',
      active: true,
      tags: ['Prurido', 'Dermatologia'],
      durationLabel: '14 dias',
      items: [
        createProtocolItemFromCatalog(catalog, 'apoquel', 'Apoquel', {
          doseValue: '0.6',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '12',
          durationDays: '14',
        }),
      ],
      recommendations: [
        'Reforçar controle ambiental e higiene da cama.',
        'Reavaliar dose após 14 dias conforme resposta ao prurido.',
      ],
      exams: ['Citologia'],
      examReasons: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uid('protocol'),
      name: 'Gastroenterite Aguda',
      summary: 'Suporte inicial com analgesia, protetor gástrico e dieta leve.',
      folderId: 'folder-gastro',
      requiresSpecialControl: false,
      species: 'Geral',
      active: true,
      tags: ['Gastro', 'Suporte'],
      durationLabel: '3-5 dias',
      items: [
        createProtocolItemFromCatalog(catalog, 'omeprazol', 'Omeprazol', {
          doseValue: '1',
          doseUnit: 'mg/kg',
          frequencyType: 'timesPerDay',
          timesPerDay: '1',
          durationDays: '5',
        }),
        createProtocolItemFromCatalog(catalog, 'dipirona', 'Dipirona Sódica', {
          doseValue: '25',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '12',
          durationDays: '3',
        }),
      ],
      recommendations: [
        'Ofertar dieta gastrointestinal fracionada a cada 8 horas.',
        'Manter hidratação oral monitorada.',
      ],
      exams: ['Bioquímica sérica', 'Hemograma completo'],
      examReasons: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uid('protocol'),
      name: 'Suporte Cardiológico Básico',
      summary: 'Exemplo de protocolo base para pacientes crônicos com ajuste individual.',
      folderId: 'folder-cardiologia',
      requiresSpecialControl: true,
      species: 'Geral',
      active: true,
      tags: ['Cardio', 'Cronico'],
      durationLabel: 'Uso contínuo',
      items: [
        createProtocolItemFromCatalog(catalog, 'tramadol', 'Tramadol', {
          doseValue: '2',
          doseUnit: 'mg/kg',
          frequencyType: 'everyHours',
          everyHours: '12',
          continuousUse: true,
          durationDays: '',
          cautions: ['Monitorar sedação e ajustar conforme necessidade.'],
        }),
      ],
      recommendations: [
        'Monitorar frequência respiratória em repouso diariamente.',
        'Reavaliação cardiológica em 30 dias.',
      ],
      exams: ['Bioquímica sérica', 'Urinálise', 'Ultrassonografia abdominal'],
      examReasons: [],
      createdAt: now,
      updatedAt: now,
    },
  ]
}

export function createDefaultTemplateStyle(id = 'rx_br_v1_clean', name = 'rx_br_v1_clean'): RxTemplateStyle {
  return {
    id,
    name,
    documentKindTarget: 'standard',
    fontFamily: 'Manrope, Arial, sans-serif',
    fontSizePt: 12,
    headingSizePt: 18,
    lineHeight: 1.45,
    accentColor: '#1d4ed8',
    textColor: '#1f2937',
    paperBg: '#ffffff',
    paperSize: 'A4',
    showLetterhead: true,
    showSignature: true,
    showMapaSignature: false,
    showTimestamp: true,
    extraNotes: '',
    zoneStyles: {},
    updatedAt: nowIso(),
  }
}

function defaultDb(): RxDatabase {
  const catalog = seedCatalog()
  const now = nowIso()
  const defaultPrescriberProfile: PrescriberProfile = {
    ...defaultProfile,
    id: 'default',
    profileName: 'Perfil Padrão',
    createdAt: now,
    updatedAt: now,
  }
  return {
    profile: defaultProfile,
    prescriberProfiles: [defaultPrescriberProfile],
    catalog,
    patients: [],
    clients: [],
    history: [],
    protocolFolders: seedProtocolFolders(),
    protocols: seedProtocols(catalog),
    templates: [createDefaultTemplateStyle(), createSpecialControlTemplateStyle()],
    activeTemplateId: 'rx_br_v1_clean',
  }
}

export function createSpecialControlTemplateStyle(): RxTemplateStyle {
  return {
    ...createDefaultTemplateStyle('rx_br_control_special', 'rx_br_control_special'),
    documentKindTarget: 'special-control',
    accentColor: '#b45309',
    showMapaSignature: true,
    extraNotes: '',
  }
}

function normalizeCatalogPresentation(
  raw: Partial<CatalogPresentation>,
  fallbackPharmacyType: PharmacyType = 'veterinaria'
): CatalogPresentation {
  const concentrationValue = repairMojibake(raw.concentrationValue || '')
  const concentrationUnit = repairMojibake(raw.concentrationUnit || '')
  const concentrationPerValue = repairMojibake(raw.concentrationPerValue || '1')
  const concentrationPerUnit = repairMojibake(raw.concentrationPerUnit || '')
  const structuredConcentration = formatStructuredConcentration({
    value: concentrationValue,
    unit: concentrationUnit,
    perValue: concentrationPerValue,
    perUnit: concentrationPerUnit,
  })
  const rawConcentration = repairMojibake(raw.concentration || '')

  return {
    id: raw.id || uid('pres'),
    name: repairMojibake(raw.name || 'Comprimido'),
    concentration: rawConcentration || structuredConcentration,
    secondaryConcentration: repairMojibake((raw as Partial<CatalogPresentation>).secondaryConcentration || ''),
    concentrationValue,
    concentrationUnit,
    concentrationPerValue,
    concentrationPerUnit,
    unitLabel: repairMojibake(raw.unitLabel || 'comprimido'),
    commercialName: repairMojibake(raw.commercialName || ''),
    averagePrice: repairMojibake(raw.averagePrice || ''),
    pharmacyTags: normalizePharmacyTags((raw as Partial<CatalogPresentation>).pharmacyTags, fallbackPharmacyType),
  }
}

function normalizeCatalogDrug(raw: Partial<CatalogDrug>): CatalogDrug {
  const normalizedPharmacyType = raw.pharmacyType || 'veterinaria'
  return {
    id: raw.id || uid('drug'),
    name: repairMojibake(raw.name || ''),
    speciesTargets: Array.isArray(raw.speciesTargets) ? raw.speciesTargets.filter(Boolean) : [],
    controlled: !!raw.controlled,
    pharmacyType: normalizedPharmacyType,
    routeGroup: raw.routeGroup || 'ORAL',
    doseUnit: repairMojibake(raw.doseUnit || 'mg/kg'),
    notes: repairMojibake(raw.notes || ''),
    presentations: Array.isArray(raw.presentations)
      ? raw.presentations.map((entry) => normalizeCatalogPresentation(entry, normalizedPharmacyType))
      : [],
    updatedAt: raw.updatedAt || nowIso(),
  }
}

function normalizeProtocolFolder(raw: Partial<RxProtocolFolder>, index: number): RxProtocolFolder {
  return {
    id: raw.id || uid('folder'),
    name: repairMojibake(raw.name || `PASTA ${index + 1}`),
    color: raw.color || '#39ff14',
    icon: raw.icon || 'folder_open',
    sortOrder: raw.sortOrder || index + 1,
  }
}

function normalizeProtocol(raw: Partial<RxProtocol>, fallbackFolderId: string): RxProtocol {
  const now = nowIso()
  const items = Array.isArray(raw.items) ? raw.items.map((item) => createProtocolTemplateItem(item)) : []
  const hasControlledItems = items.some((item) => !!item.controlled)
  return {
    id: raw.id || uid('protocol'),
    name: repairMojibake(raw.name || 'Novo Protocolo'),
    summary: repairMojibake(raw.summary || ''),
    folderId: raw.folderId || fallbackFolderId,
    requiresSpecialControl: raw.requiresSpecialControl ?? hasControlledItems,
    species: raw.species || 'Geral',
    active: raw.active !== false,
    tags: Array.isArray(raw.tags) ? raw.tags.filter(Boolean).map((item) => repairMojibake(item)) : [],
    durationLabel: repairMojibake(raw.durationLabel || ''),
    items,
    recommendations: Array.isArray(raw.recommendations) ? raw.recommendations.filter(Boolean).map((line) => repairMojibake(line)) : [],
    exams: Array.isArray(raw.exams) ? raw.exams.filter(Boolean).map((line) => repairMojibake(line)) : [],
    examReasons: Array.isArray(raw.examReasons) ? raw.examReasons.filter(Boolean).map((line) => repairMojibake(line)) : [],
    createdAt: raw.createdAt || now,
    updatedAt: raw.updatedAt || now,
  }
}

function normalizeTemplate(raw: Partial<RxTemplateStyle>): RxTemplateStyle {
  const base = createDefaultTemplateStyle(raw.id || uid('template'), raw.name || 'Template')
  const sourceZoneStyles = typeof raw.zoneStyles === 'object' && raw.zoneStyles ? raw.zoneStyles : {}
  const zoneStyles: RxTemplateStyle['zoneStyles'] = {}
  ;(['header', 'patient', 'body', 'recommendations', 'signature'] as TemplateZoneKey[]).forEach((key) => {
    const style = sourceZoneStyles[key]
    if (!style) return
    zoneStyles[key] = {
      fontFamily: style.fontFamily ? repairMojibake(style.fontFamily) : undefined,
      fontSizePt: typeof style.fontSizePt === 'number' ? style.fontSizePt : undefined,
      textColor: style.textColor || undefined,
      accentColor: style.accentColor || undefined,
      fontWeight: style.fontWeight || undefined,
      italic: typeof style.italic === 'boolean' ? style.italic : undefined,
      underline: typeof style.underline === 'boolean' ? style.underline : undefined,
    }
  })

  return {
    ...base,
    ...raw,
    id: raw.id || base.id,
    name: repairMojibake(raw.name || base.name),
    documentKindTarget: raw.documentKindTarget === 'special-control' ? 'special-control' : (raw.id === 'rx_br_control_special' ? 'special-control' : 'standard'),
    fontFamily: repairMojibake(raw.fontFamily || base.fontFamily),
    accentColor: raw.accentColor || base.accentColor,
    textColor: raw.textColor || base.textColor,
    paperBg: raw.paperBg || base.paperBg,
    paperSize: raw.paperSize === 'A5' ? 'A5' : 'A4',
    showLetterhead: raw.showLetterhead ?? base.showLetterhead,
    showSignature: raw.showSignature ?? base.showSignature,
    showMapaSignature: raw.showMapaSignature ?? (raw.id === 'rx_br_control_special' ? true : base.showMapaSignature),
    showTimestamp: raw.showTimestamp ?? base.showTimestamp,
    extraNotes: repairMojibake(raw.extraNotes || base.extraNotes),
    zoneStyles: Object.keys(zoneStyles).length ? zoneStyles : base.zoneStyles,
    updatedAt: raw.updatedAt || nowIso(),
  }
}

function normalizeClientAnimal(raw: Partial<ClientAnimalRecord>): ClientAnimalRecord {
  const weightHistory: ClientAnimalRecord['weightHistory'] = Array.isArray(raw.weightHistory)
    ? raw.weightHistory
        .map((entry) => ({
          id: entry.id || uid('w'),
          date: repairMojibake(entry.date || nowIso()),
          weightKg: repairMojibake(entry.weightKg || ''),
          source: (entry.source === 'prescription' ? 'prescription' : 'manual') as 'prescription' | 'manual',
        }))
        .filter((entry) => !!entry.weightKg.trim())
    : []

  const fallbackWeight = repairMojibake(raw.weightKg || '')
  if (!weightHistory.length && fallbackWeight) {
    weightHistory.push({
      id: uid('w'),
      date: repairMojibake(raw.weightDate || nowIso()),
      weightKg: fallbackWeight,
      source: 'manual',
    })
  }

  return {
    id: raw.id || uid('animal'),
    name: repairMojibake(raw.name || ''),
    species: repairMojibake(raw.species || 'Canina'),
    breed: repairMojibake(raw.breed || ''),
    coat: repairMojibake(raw.coat || ''),
    sex: repairMojibake(raw.sex || 'Sem dados'),
    reproductiveStatus: repairMojibake(raw.reproductiveStatus || 'Sem dados'),
    ageText: repairMojibake(raw.ageText || ''),
    weightKg: fallbackWeight,
    weightDate: repairMojibake(raw.weightDate || ''),
    anamnesis: repairMojibake(raw.anamnesis || ''),
    notes: repairMojibake(raw.notes || ''),
    weightHistory,
    updatedAt: raw.updatedAt || nowIso(),
  }
}

function normalizeClient(raw: Partial<ClientRecord>): ClientRecord {
  return {
    id: raw.id || uid('client'),
    fullName: repairMojibake(raw.fullName || ''),
    cpf: repairMojibake(raw.cpf || ''),
    rg: repairMojibake(raw.rg || ''),
    phone: repairMojibake(raw.phone || ''),
    email: repairMojibake(raw.email || ''),
    addressStreet: repairMojibake(raw.addressStreet || ''),
    addressNumber: repairMojibake(raw.addressNumber || ''),
    addressComplement: repairMojibake(raw.addressComplement || ''),
    addressDistrict: repairMojibake(raw.addressDistrict || ''),
    addressCity: repairMojibake(raw.addressCity || ''),
    addressState: repairMojibake(raw.addressState || ''),
    addressZip: repairMojibake(raw.addressZip || ''),
    notes: repairMojibake(raw.notes || ''),
    animals: Array.isArray(raw.animals) ? raw.animals.map((entry) => normalizeClientAnimal(entry)) : [],
    updatedAt: raw.updatedAt || nowIso(),
  }
}

function buildLegacyClientsFromPatients(patients: PatientRecord[]): ClientRecord[] {
  const map = new Map<string, ClientRecord>()
  patients.forEach((patient) => {
    const tutorName = repairMojibake(patient.tutorName || '').trim() || 'Tutor sem nome'
    const key = tutorName.toLowerCase()
    const existing = map.get(key)
    const animal = normalizeClientAnimal({
      id: patient.id || uid('animal'),
      name: patient.name || '',
      species: patient.species || 'Canina',
      breed: patient.breed || '',
      coat: '',
      sex: patient.sex || 'Sem dados',
      reproductiveStatus: 'Sem dados',
      ageText: patient.ageText || '',
      weightKg: patient.weightKg || '',
      weightDate: '',
      anamnesis: '',
      notes: '',
      weightHistory: patient.weightKg
        ? [{ id: uid('w'), date: patient.updatedAt || nowIso(), weightKg: patient.weightKg, source: 'manual' }]
        : [],
      updatedAt: patient.updatedAt || nowIso(),
    })
    if (!existing) {
      map.set(key, {
        id: `client-${key.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || uid('client')}`,
        fullName: tutorName,
        cpf: '',
        rg: '',
        phone: repairMojibake(patient.tutorPhone || ''),
        email: '',
        addressStreet: repairMojibake(patient.tutorAddress || ''),
        addressNumber: '',
        addressComplement: '',
        addressDistrict: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        notes: '',
        animals: [animal],
        updatedAt: patient.updatedAt || nowIso(),
      })
      return
    }
    const hasAnimal = existing.animals.some((entry) => entry.id === animal.id)
    existing.animals = hasAnimal
      ? existing.animals.map((entry) => (entry.id === animal.id ? animal : entry))
      : [...existing.animals, animal]
    if (!existing.phone && patient.tutorPhone) existing.phone = repairMojibake(patient.tutorPhone)
    if (!existing.addressStreet && patient.tutorAddress) existing.addressStreet = repairMojibake(patient.tutorAddress)
    existing.updatedAt = nowIso()
  })
  return Array.from(map.values())
}

export function loadRxDb(): RxDatabase {
  try {
    const scopedKey = getCurrentUserDbKey()
    const rawScoped = localStorage.getItem(scopedKey)
    const rawLegacy = localStorage.getItem(LEGACY_DB_KEY)
    const raw = rawScoped || rawLegacy
    if (!raw) return defaultDb()
    const parsed = JSON.parse(raw) as Partial<RxDatabase>
    const base = defaultDb()
    const protocolFolders =
      Array.isArray(parsed.protocolFolders) && parsed.protocolFolders.length > 0
        ? parsed.protocolFolders.map((entry, idx) => normalizeProtocolFolder(entry, idx))
        : base.protocolFolders
    const fallbackFolderId = protocolFolders[0]?.id || base.protocolFolders[0].id
    const templates =
      Array.isArray(parsed.templates) && parsed.templates.length > 0
        ? parsed.templates.map((entry) => normalizeTemplate(entry))
        : base.templates
    const templatesWithSpecialFlag = templates.map((template) =>
      template.id === 'rx_br_control_special'
        ? {
            ...template,
            documentKindTarget: 'special-control' as const,
            showMapaSignature: template.showMapaSignature ?? true,
          }
        : template
    )
    const templatesWithSpecial = templatesWithSpecialFlag.some((template) => template.documentKindTarget === 'special-control')
      ? templatesWithSpecialFlag
      : [...templatesWithSpecialFlag, createSpecialControlTemplateStyle()]
    const activeTemplateId =
      parsed.activeTemplateId && templatesWithSpecial.some((template) => template.id === parsed.activeTemplateId)
        ? parsed.activeTemplateId
        : templatesWithSpecial[0]?.id || base.activeTemplateId

    const normalized: RxDatabase = {
      ...base,
      ...parsed,
      profile: {
        ...base.profile,
        ...(parsed.profile || {}),
        fullName: repairMojibake(parsed.profile?.fullName || base.profile.fullName),
        specialty: repairMojibake(parsed.profile?.specialty || base.profile.specialty),
        clinicName: repairMojibake(parsed.profile?.clinicName || base.profile.clinicName),
        clinicAddress: repairMojibake(parsed.profile?.clinicAddress || base.profile.clinicAddress),
        mapaSignatureDataUrl: parsed.profile?.mapaSignatureDataUrl || base.profile.mapaSignatureDataUrl,
      },
      prescriberProfiles: Array.isArray(parsed.prescriberProfiles) && parsed.prescriberProfiles.length > 0
        ? parsed.prescriberProfiles.map((profile) => ({
            ...defaultProfile,
            ...profile,
            id: profile.id || uid('profile'),
            profileName: repairMojibake(profile.profileName || profile.clinicName || profile.fullName || 'Perfil sem nome'),
            fullName: repairMojibake(profile.fullName || ''),
            specialty: repairMojibake(profile.specialty || ''),
            clinicName: repairMojibake(profile.clinicName || ''),
            clinicAddress: repairMojibake(profile.clinicAddress || ''),
            mapaSignatureDataUrl: profile.mapaSignatureDataUrl || '',
            createdAt: profile.createdAt || nowIso(),
            updatedAt: profile.updatedAt || nowIso(),
          }))
        : base.prescriberProfiles,
      catalog: Array.isArray(parsed.catalog) ? parsed.catalog.map((entry) => normalizeCatalogDrug(entry)) : base.catalog,
      patients: Array.isArray(parsed.patients)
        ? parsed.patients.map((patient) => ({
            ...patient,
            name: repairMojibake(patient.name || ''),
            species: repairMojibake(patient.species || ''),
            breed: repairMojibake(patient.breed || ''),
            sex: repairMojibake(patient.sex || ''),
            ageText: repairMojibake(patient.ageText || ''),
            tutorName: repairMojibake(patient.tutorName || ''),
            tutorAddress: repairMojibake(patient.tutorAddress || ''),
          }))
        : base.patients,
      clients: Array.isArray(parsed.clients) && parsed.clients.length > 0
        ? parsed.clients.map((client) => normalizeClient(client))
        : buildLegacyClientsFromPatients(
            Array.isArray(parsed.patients)
              ? parsed.patients.map((patient) => ({
                  ...patient,
                  name: repairMojibake(patient.name || ''),
                  species: repairMojibake(patient.species || ''),
                  breed: repairMojibake(patient.breed || ''),
                  sex: repairMojibake(patient.sex || ''),
                  ageText: repairMojibake(patient.ageText || ''),
                  tutorName: repairMojibake(patient.tutorName || ''),
                  tutorAddress: repairMojibake(patient.tutorAddress || ''),
                }))
              : base.patients
          ),
      history: Array.isArray(parsed.history)
        ? parsed.history.map((entry) => ({
            ...entry,
            patientName: repairMojibake(entry.patientName || '-'),
            tutorName: repairMojibake(entry.tutorName || '-'),
            patientId: entry.patientId || undefined,
            tutorId: entry.tutorId || undefined,
          }))
        : base.history,
      protocolFolders,
      protocols: Array.isArray(parsed.protocols)
        ? parsed.protocols.map((entry) => normalizeProtocol(entry, fallbackFolderId))
        : base.protocols,
      templates: templatesWithSpecial,
      activeTemplateId,
    }

    // Persist one-way cleanup for legacy corrupted strings.
    if (/[ÃÂâ]/.test(raw) || raw.includes('\uFFFD')) {
      localStorage.setItem(scopedKey, JSON.stringify(normalized))
    } else if (!rawScoped && rawLegacy) {
      // Migrate legacy shared database to user-scoped key.
      localStorage.setItem(scopedKey, JSON.stringify(normalized))
    }

    return normalized
  } catch {
    return defaultDb()
  }
}

export function saveRxDb(db: RxDatabase) {
  localStorage.setItem(getCurrentUserDbKey(), JSON.stringify(db))
}

export function updateProfile(db: RxDatabase, profile: ProfileSettings): RxDatabase {
  return { ...db, profile }
}

export function createPrescriberProfileFromSettings(
  profile: ProfileSettings,
  profileName: string,
  existingId?: string
): PrescriberProfile {
  const now = nowIso()
  return {
    ...profile,
    id: existingId || uid('profile'),
    profileName: profileName.trim() || profile.clinicName || profile.fullName || 'Perfil sem nome',
    createdAt: now,
    updatedAt: now,
  }
}

export function upsertPrescriberProfile(db: RxDatabase, profile: PrescriberProfile): RxDatabase {
  const nextProfile = { ...profile, updatedAt: nowIso() }
  const exists = db.prescriberProfiles.some((entry) => entry.id === nextProfile.id)
  const prescriberProfiles = exists
    ? db.prescriberProfiles.map((entry) => (entry.id === nextProfile.id ? nextProfile : entry))
    : [nextProfile, ...db.prescriberProfiles]
  return {
    ...db,
    profile: {
      adminId: nextProfile.adminId,
      fullName: nextProfile.fullName,
      crmv: nextProfile.crmv,
      uf: nextProfile.uf,
      specialty: nextProfile.specialty,
      clinicName: nextProfile.clinicName,
      clinicCnpj: nextProfile.clinicCnpj,
      clinicAddress: nextProfile.clinicAddress,
      clinicPhone: nextProfile.clinicPhone,
      clinicLogoDataUrl: nextProfile.clinicLogoDataUrl,
      signatureDataUrl: nextProfile.signatureDataUrl,
      mapaSignatureDataUrl: nextProfile.mapaSignatureDataUrl,
    },
    prescriberProfiles,
  }
}

export function isSpecialControlTemplate(template: Partial<RxTemplateStyle> | undefined): boolean {
  if (!template) return false
  if (template.documentKindTarget === 'special-control') return true
  return template.id === 'rx_br_control_special'
}

export function findSpecialControlTemplate(templates: RxTemplateStyle[]): RxTemplateStyle | undefined {
  return templates.find((entry) => isSpecialControlTemplate(entry))
}

export function createEmptyDrug(): CatalogDrug {
  return {
    id: uid('drug'),
    name: '',
    speciesTargets: [],
    controlled: false,
    pharmacyType: 'veterinaria',
    routeGroup: 'ORAL',
    doseUnit: 'mg/kg',
    notes: '',
    updatedAt: nowIso(),
    presentations: [{
      id: uid('pres'),
      name: 'Comprimido',
      concentration: '',
      secondaryConcentration: '',
      concentrationValue: '',
      concentrationUnit: 'mg',
      concentrationPerValue: '1',
      concentrationPerUnit: 'comprimido',
      unitLabel: 'comprimido',
      commercialName: '',
      averagePrice: '',
      pharmacyTags: ['veterinaria'],
    }],
  }
}

export function upsertDrug(db: RxDatabase, drug: CatalogDrug): RxDatabase {
  const normalizedDrug = normalizeCatalogDrug(drug)
  const normalizedPresentations = normalizedDrug.presentations.length
    ? normalizedDrug.presentations
    : [normalizeCatalogPresentation({ name: 'Comprimido', unitLabel: 'comprimido' }, normalizedDrug.pharmacyType)]
  const nextDrug: CatalogDrug = {
    ...normalizedDrug,
    pharmacyType: normalizedPresentations[0]?.pharmacyTags?.[0] || normalizedDrug.pharmacyType,
    presentations: normalizedPresentations,
    updatedAt: nowIso(),
  }
  const exists = db.catalog.some((entry) => entry.id === nextDrug.id)
  const catalog = exists
    ? db.catalog.map((entry) => (entry.id === nextDrug.id ? nextDrug : entry))
    : [...db.catalog, nextDrug]
  return { ...db, catalog }
}

export function removeDrug(db: RxDatabase, drugId: string): RxDatabase {
  const protocols = db.protocols.map((protocol) => ({
    ...protocol,
    items: protocol.items.map((item) => (item.catalogDrugId === drugId ? { ...item, catalogDrugId: '' } : item)),
    updatedAt: nowIso(),
  }))
  return {
    ...db,
    catalog: db.catalog.filter((entry) => entry.id !== drugId),
    protocols,
  }
}

export function createEmptyProtocol(folderId?: string): RxProtocol {
  const now = nowIso()
  return {
    id: uid('protocol'),
    name: 'Novo Protocolo',
    summary: '',
    folderId: folderId || 'folder-pos-operatorio',
    requiresSpecialControl: false,
    species: 'Geral',
    active: true,
    tags: [],
    durationLabel: '',
    items: [],
    recommendations: [],
    exams: [],
    examReasons: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function createProtocolFolder(name: string, color = '#39ff14', icon = 'folder_open'): RxProtocolFolder {
  return {
    id: uid('folder'),
    name,
    color,
    icon,
    sortOrder: Date.now(),
  }
}

export function upsertProtocol(db: RxDatabase, protocol: RxProtocol): RxDatabase {
  const normalizedItems = protocol.items.map((item) => createProtocolTemplateItem(item))
  const nextProtocol: RxProtocol = {
    ...protocol,
    requiresSpecialControl: protocol.requiresSpecialControl || normalizedItems.some((item) => !!item.controlled),
    items: normalizedItems,
    recommendations: protocol.recommendations.filter(Boolean),
    exams: protocol.exams.filter(Boolean),
    examReasons: protocol.examReasons.filter(Boolean),
    updatedAt: nowIso(),
  }
  const exists = db.protocols.some((entry) => entry.id === nextProtocol.id)
  return {
    ...db,
    protocols: exists
      ? db.protocols.map((entry) => (entry.id === nextProtocol.id ? nextProtocol : entry))
      : [nextProtocol, ...db.protocols],
  }
}

export function removeProtocol(db: RxDatabase, protocolId: string): RxDatabase {
  return { ...db, protocols: db.protocols.filter((entry) => entry.id !== protocolId) }
}

export function upsertProtocolFolder(db: RxDatabase, folder: RxProtocolFolder): RxDatabase {
  const exists = db.protocolFolders.some((entry) => entry.id === folder.id)
  const protocolFolders = exists
    ? db.protocolFolders.map((entry) => (entry.id === folder.id ? folder : entry))
    : [...db.protocolFolders, folder]
  return {
    ...db,
    protocolFolders: protocolFolders
      .map((entry, index) => ({ ...entry, sortOrder: entry.sortOrder || index + 1 }))
      .sort((a, b) => a.sortOrder - b.sortOrder),
  }
}

export function removeProtocolFolder(db: RxDatabase, folderId: string): RxDatabase {
  const protocolFolders = db.protocolFolders.filter((entry) => entry.id !== folderId)
  if (protocolFolders.length === 0) return db
  const fallbackFolderId = protocolFolders[0].id
  return {
    ...db,
    protocolFolders,
    protocols: db.protocols.map((protocol) =>
      protocol.folderId === folderId
        ? {
            ...protocol,
            folderId: fallbackFolderId,
            updatedAt: nowIso(),
          }
        : protocol
    ),
  }
}

export function upsertTemplate(db: RxDatabase, template: RxTemplateStyle): RxDatabase {
  const nextTemplate = normalizeTemplate({ ...template, updatedAt: nowIso() })
  const exists = db.templates.some((entry) => entry.id === nextTemplate.id)
  const templates = exists
    ? db.templates.map((entry) => (entry.id === nextTemplate.id ? nextTemplate : entry))
    : [nextTemplate, ...db.templates]
  return {
    ...db,
    templates,
    activeTemplateId: nextTemplate.id,
  }
}

export function removeTemplate(db: RxDatabase, templateId: string): RxDatabase {
  const templates = db.templates.filter((entry) => entry.id !== templateId)
  if (templates.length === 0) {
    const fallback = createDefaultTemplateStyle()
    return {
      ...db,
      templates: [fallback],
      activeTemplateId: fallback.id,
    }
  }

  const activeTemplateId = db.activeTemplateId === templateId ? templates[0].id : db.activeTemplateId
  return {
    ...db,
    templates,
    activeTemplateId,
  }
}

export function setActiveTemplate(db: RxDatabase, templateId: string): RxDatabase {
  if (!db.templates.some((entry) => entry.id === templateId)) return db
  return { ...db, activeTemplateId: templateId }
}

export function createEmptyClientAnimal(): ClientAnimalRecord {
  return {
    id: '',
    name: '',
    species: 'Canina',
    breed: '',
    coat: '',
    sex: 'Sem dados',
    reproductiveStatus: 'Sem dados',
    ageText: '',
    weightKg: '',
    weightDate: '',
    anamnesis: '',
    notes: '',
    weightHistory: [],
    updatedAt: nowIso(),
  }
}

export function createEmptyClient(): ClientRecord {
  return {
    id: '',
    fullName: '',
    cpf: '',
    rg: '',
    phone: '',
    email: '',
    addressStreet: '',
    addressNumber: '',
    addressComplement: '',
    addressDistrict: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    notes: '',
    animals: [createEmptyClientAnimal()],
    updatedAt: nowIso(),
  }
}

export function upsertClient(db: RxDatabase, client: ClientRecord): RxDatabase {
  const now = nowIso()
  const normalizedInput = normalizeClient({ ...client, updatedAt: now })
  const sourceId = normalizedInput.id
  const nextClientId = allocateClientId(db, normalizedInput.id)
  const reservedAnimalIds = new Set<string>()
  const nextAnimals = normalizedInput.animals.map((animal) =>
    normalizeClientAnimal({
      ...animal,
      id: allocateAnimalId(db, animal.id, reservedAnimalIds),
      updatedAt: now,
    })
  )
  const nextClient = normalizeClient({
    ...normalizedInput,
    id: nextClientId,
    animals: nextAnimals,
    updatedAt: now,
  })
  const filtered = db.clients.filter((entry) => entry.id !== nextClientId && entry.id !== sourceId)
  return {
    ...db,
    clients: [nextClient, ...filtered],
  }
}

export function removeClient(db: RxDatabase, clientId: string): RxDatabase {
  return {
    ...db,
    clients: db.clients.filter((entry) => entry.id !== clientId),
  }
}

function buildTutorAddressLine(rx: PrescriptionState): string {
  const parts = [
    rx.tutor.addressStreet || '',
    rx.tutor.addressNumber || '',
    rx.tutor.addressComplement || '',
    rx.tutor.addressDistrict || '',
    rx.tutor.addressCity || '',
    rx.tutor.addressState || '',
    rx.tutor.addressZip || '',
  ]
  return parts.filter(Boolean).join(', ')
}

function normalizeLookupText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function digitsOnlyText(value: string): string {
  return String(value || '').replace(/\D/g, '')
}

function isPlaceholderRecordId(value: string | null | undefined): boolean {
  const id = String(value || '').trim().toUpperCase()
  return !id || id === 'ADMIN' || id === 'DEFAULT' || id.startsWith('TMP-')
}

function findClientByTutorData(db: RxDatabase, rx: PrescriptionState): ClientRecord | null {
  const cpf = digitsOnlyText(rx.tutor.cpf || '')
  const phone = digitsOnlyText(rx.tutor.phone || '')
  const tutorName = normalizeLookupText(rx.tutor.name || '')

  if (cpf) {
    const byCpf = db.clients.find((entry) => digitsOnlyText(entry.cpf) === cpf)
    if (byCpf) return byCpf
  }

  if (tutorName && phone) {
    const byNameAndPhone = db.clients.find(
      (entry) =>
        normalizeLookupText(entry.fullName || '') === tutorName &&
        digitsOnlyText(entry.phone || '') === phone
    )
    if (byNameAndPhone) return byNameAndPhone
  }

  if (tutorName) {
    const byName = db.clients.find((entry) => normalizeLookupText(entry.fullName || '') === tutorName)
    if (byName) return byName
  }

  return null
}

function findAnimalInClient(client: ClientRecord | null, rx: PrescriptionState): ClientAnimalRecord | null {
  if (!client) return null
  const patientName = normalizeLookupText(rx.patient.name || '')
  const species = normalizeLookupText(rx.patient.species || '')
  if (!patientName) return null
  const byNameAndSpecies = client.animals.find(
    (entry) =>
      normalizeLookupText(entry.name || '') === patientName &&
      normalizeLookupText(entry.species || '') === species
  )
  if (byNameAndSpecies) return byNameAndSpecies
  const byName = client.animals.find((entry) => normalizeLookupText(entry.name || '') === patientName)
  return byName || null
}

export function upsertPatientFromPrescription(db: RxDatabase, rx: PrescriptionState): RxDatabase {
  const patientName = rx.patient.name.trim()
  if (!patientName) return db
  const explicitPatientId = (rx.patient.patientRecordId || '').trim()
  const normalizedPatientName = normalizeLookupText(patientName)
  const normalizedTutorName = normalizeLookupText(rx.tutor.name || '')
  const matchedByName = db.patients.find(
    (entry) =>
      normalizeLookupText(entry.name || '') === normalizedPatientName &&
      normalizeLookupText(entry.tutorName || '') === normalizedTutorName
  )
  const patientId = isNumericRecordId(explicitPatientId)
    ? explicitPatientId
    : matchedByName && isNumericRecordId(matchedByName.id)
      ? matchedByName.id
      : nextNumericRecordId(db.patients.map((entry) => entry.id))
  const nextRecord: PatientRecord = {
    id: patientId,
    name: patientName,
    species: rx.patient.species,
    breed: rx.patient.breed,
    sex: rx.patient.sex,
    ageText: rx.patient.ageText,
    weightKg: rx.patient.weightKg,
    tutorName: rx.tutor.name,
    tutorPhone: rx.tutor.phone,
    tutorAddress: buildTutorAddressLine(rx),
    updatedAt: nowIso(),
  }
  const existingRecord = db.patients.find((entry) => entry.id === patientId) || matchedByName
  return {
    ...db,
    patients: existingRecord
      ? [nextRecord, ...db.patients.filter((entry) => entry.id !== existingRecord.id && entry.id !== patientId)]
      : [nextRecord, ...db.patients],
  }
}

export function upsertClientFromPrescription(db: RxDatabase, rx: PrescriptionState): RxDatabase {
  const tutorName = (rx.tutor.name || '').trim()
  if (!tutorName) return db
  const explicitTutorId = (rx.tutor.tutorRecordId || '').trim()
  const linkedClientFromId = !isPlaceholderRecordId(explicitTutorId)
    ? db.clients.find((entry) => entry.id === explicitTutorId) || null
    : null
  const inferredClient = linkedClientFromId || findClientByTutorData(db, rx)
  const clientId = linkedClientFromId?.id || inferredClient?.id || ''

  const explicitPatientId = (rx.patient.patientRecordId || '').trim()
  const linkedAnimalFromId =
    !isPlaceholderRecordId(explicitPatientId) && inferredClient
      ? inferredClient.animals.find((entry) => entry.id === explicitPatientId) || null
      : null
  const inferredAnimal = linkedAnimalFromId || findAnimalInClient(inferredClient, rx)
  const animalId = linkedAnimalFromId?.id || inferredAnimal?.id || ''
  const now = nowIso()

  const existingClient = db.clients.find((entry) => entry.id === clientId)
  const existingAnimal = existingClient?.animals.find((entry) => entry.id === animalId)
  const currentWeight = (rx.patient.weightKg || '').trim()
  const providedWeightDate = (rx.patient.weightDate || '').trim()
  const currentWeightDate = providedWeightDate || now
  const nextWeightHistory = existingAnimal?.weightHistory ? [...existingAnimal.weightHistory] : []
  if (currentWeight) {
    const last = nextWeightHistory[nextWeightHistory.length - 1]
    if (!last || last.weightKg !== currentWeight) {
      nextWeightHistory.push({
        id: uid('w'),
        date: currentWeightDate,
        weightKg: currentWeight,
        source: 'prescription',
      })
    }
  }

  const animal: ClientAnimalRecord = normalizeClientAnimal({
    id: animalId,
    name: rx.patient.name || '',
    species: rx.patient.species || 'Canina',
    breed: rx.patient.breed || '',
    coat: rx.patient.coat || existingAnimal?.coat || '',
    sex: rx.patient.sex || 'Sem dados',
    reproductiveStatus: rx.patient.reproductiveStatus || existingAnimal?.reproductiveStatus || 'Sem dados',
    ageText: rx.patient.ageText || '',
    weightKg: currentWeight || existingAnimal?.weightKg || '',
    weightDate: providedWeightDate || existingAnimal?.weightDate || '',
    anamnesis: existingAnimal?.anamnesis || '',
    notes: rx.patient.notes || existingAnimal?.notes || '',
    weightHistory: nextWeightHistory,
    updatedAt: now,
  })

  const nextClient: ClientRecord = normalizeClient({
    ...(existingClient || {}),
    id: clientId,
    fullName: tutorName,
    cpf: rx.tutor.cpf || existingClient?.cpf || '',
    rg: rx.tutor.rg || existingClient?.rg || '',
    phone: rx.tutor.phone || existingClient?.phone || '',
    email: rx.tutor.email || existingClient?.email || '',
    addressStreet: rx.tutor.addressStreet || existingClient?.addressStreet || '',
    addressNumber: rx.tutor.addressNumber || existingClient?.addressNumber || '',
    addressComplement: rx.tutor.addressComplement || existingClient?.addressComplement || '',
    addressDistrict: rx.tutor.addressDistrict || existingClient?.addressDistrict || '',
    addressCity: rx.tutor.addressCity || existingClient?.addressCity || '',
    addressState: rx.tutor.addressState || existingClient?.addressState || '',
    addressZip: rx.tutor.addressZip || existingClient?.addressZip || '',
    notes: rx.tutor.notes || existingClient?.notes || '',
    animals: existingClient?.animals?.length
      ? existingClient.animals.some((entry) => entry.id === animal.id)
        ? existingClient.animals.map((entry) => (entry.id === animal.id ? animal : entry))
        : [animal, ...existingClient.animals]
      : [animal],
    updatedAt: now,
  })

  return upsertClient(db, nextClient)
}

export function upsertHistoryFromPrescription(db: RxDatabase, rx: PrescriptionState): RxDatabase {
  const explicitTutorId = !isPlaceholderRecordId(rx.tutor.tutorRecordId)
    ? rx.tutor.tutorRecordId
    : undefined
  const resolvedClient =
    (explicitTutorId ? db.clients.find((entry) => entry.id === explicitTutorId) : null) ||
    findClientByTutorData(db, rx)
  const tutorId = resolvedClient?.id || explicitTutorId

  const explicitPatientId = !isPlaceholderRecordId(rx.patient.patientRecordId)
    ? rx.patient.patientRecordId
    : undefined
  const resolvedAnimal =
    (explicitPatientId && resolvedClient
      ? resolvedClient.animals.find((entry) => entry.id === explicitPatientId) || null
      : null) || findAnimalInClient(resolvedClient || null, rx)
  const patientId = resolvedAnimal?.id || explicitPatientId

  const next: HistoryRecord = {
    id: rx.id,
    prescriptionId: rx.id,
    createdAt: nowIso(),
    patientName: rx.patient.name || '-',
    tutorName: rx.tutor.name || '-',
    patientId,
    tutorId,
  }
  const exists = db.history.some((entry) => entry.id === rx.id)
  const history = exists
    ? db.history.map((entry) => (entry.id === rx.id ? next : entry))
    : [next, ...db.history]
  return { ...db, history: history.slice(0, 300) }
}

export function removeHistoryRecord(db: RxDatabase, recordId: string): RxDatabase {
  return {
    ...db,
    history: db.history.filter((entry) => entry.id !== recordId),
  }
}





