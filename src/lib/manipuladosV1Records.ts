import { supabase } from './supabaseClient'
import { sanitizeDeepText } from '../../modules/receituario-vet/textSanitizer'
import {
  buildPrintLineLeft,
  buildPrintLineRight,
  normalizeManipuladoV1,
  type ManipuladoV1Formula,
} from '../../modules/receituario-vet/manipuladosV1'

export interface ManipuladoV1Row {
  id: string
  clinic_id: string
  slug: string | null
  name: string
  species_scope: string
  pharmaceutical_form: string
  primary_route: string
  sale_classification: 'free' | 'controlled'
  is_active: boolean
  indication_summary: string | null
  description: string | null
  payload: Record<string, unknown>
  created_at?: string
  updated_at?: string
}

const LOCAL_PREFIX = 'rxv:manipulados-v1'

function localKey(clinicId: string) {
  return `${LOCAL_PREFIX}:${clinicId}`
}

function readLocal(clinicId: string): ManipuladoV1Row[] {
  try {
    const raw = localStorage.getItem(localKey(clinicId))
    if (!raw) return []
    return JSON.parse(raw) as ManipuladoV1Row[]
  } catch {
    return []
  }
}

function writeLocal(clinicId: string, rows: ManipuladoV1Row[]) {
  try {
    localStorage.setItem(localKey(clinicId), JSON.stringify(rows))
  } catch {
    // noop
  }
}

function mergeRows(remoteRows: ManipuladoV1Row[], localRows: ManipuladoV1Row[]): ManipuladoV1Row[] {
  const byId = new Map<string, ManipuladoV1Row>()
  for (const row of remoteRows) byId.set(row.id, row)
  for (const row of localRows) {
    if (!byId.has(row.id)) byId.set(row.id, row)
  }
  return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

function rowToFormula(row: ManipuladoV1Row): ManipuladoV1Formula {
  return normalizeManipuladoV1(sanitizeDeepText(row.payload as Partial<ManipuladoV1Formula>))
}

function formulaToRow(formula: ManipuladoV1Formula): ManipuladoV1Row {
  const normalized = normalizeManipuladoV1(formula)
  return {
    id: normalized.identity.id,
    clinic_id: normalized.identity.clinic_id,
    slug: normalized.identity.slug,
    name: normalized.identity.name,
    species_scope: normalized.identity.species_scope,
    pharmaceutical_form: normalized.identity.pharmaceutical_form,
    primary_route: normalized.identity.primary_route,
    sale_classification: normalized.identity.sale_classification,
    is_active: normalized.identity.is_active,
    indication_summary: normalized.identity.indication_summary || null,
    description: normalized.identity.description || null,
    // `normalized` inclui `canonical_posology` (contrato dose/protocolo) gerado em normalizeManipuladoV1.
    payload: {
      ...normalized,
      display: {
        ...normalized.display,
        print_line_left: normalized.display.auto_print_line ? buildPrintLineLeft(normalized) : normalized.display.print_line_left,
        print_line_right: normalized.display.auto_print_line ? buildPrintLineRight(normalized) : normalized.display.print_line_right,
      },
    },
  }
}

export async function listManipuladosV1(clinicId: string): Promise<ManipuladoV1Row[]> {
  const localRows = readLocal(clinicId)
  const { data, error } = await supabase
    .from('manipulados_v1_formulas')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('name', { ascending: true })

  if (!error && data) return mergeRows(data as ManipuladoV1Row[], localRows)
  return localRows
}

export async function getManipuladoV1(clinicId: string, id: string): Promise<ManipuladoV1Formula | null> {
  const local = readLocal(clinicId).find((entry) => entry.id === id)
  const { data, error } = await supabase
    .from('manipulados_v1_formulas')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('id', id)
    .maybeSingle()

  if (!error && data) return rowToFormula(data as ManipuladoV1Row)
  return local ? rowToFormula(local) : null
}

export async function saveManipuladoV1(formula: ManipuladoV1Formula, userId?: string | null): Promise<ManipuladoV1Formula> {
  const row = formulaToRow(formula)
  const payload = { ...row, created_by: userId || null }
  const { data, error } = await supabase
    .from('manipulados_v1_formulas')
    .upsert(payload, { onConflict: 'id' })
    .select('*')
    .single()

  const local = readLocal(row.clinic_id)
  const persistedRow = !error && data ? (data as ManipuladoV1Row) : row
  const next = [...local.filter((entry) => entry.id !== persistedRow.id), persistedRow].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  writeLocal(row.clinic_id, next)
  return rowToFormula(persistedRow)
}

export async function deleteManipuladoV1(clinicId: string, id: string): Promise<void> {
  const { error } = await supabase
    .from('manipulados_v1_formulas')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('id', id)

  writeLocal(clinicId, readLocal(clinicId).filter((entry) => entry.id !== id))
  if (!error) return
}
