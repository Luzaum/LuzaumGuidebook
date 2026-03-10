import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import { assertValidMedicationCatalogBundle } from '../src/lib/medicationCatalog'

// Server-side only: this script must run in Node with a secret/service key.
// In Supabase, service_role bypasses RLS. The policies on global catalog tables
// document the intended access model, but the real enforcement for imports is
// keeping this script off the browser and using a server-side secret key.

type GlobalMedicationInsert = {
  slug: string
  name: string
  active_ingredient: string | null
  is_controlled: boolean
  is_active: boolean
  notes: string | null
  tags: string[] | null
  species: string[] | null
  routes: string[] | null
  metadata: Record<string, unknown>
  updated_at: string
}

function usage(): never {
  throw new Error('Uso: tsx scripts/import-global-catalog.ts [caminho-json]')
}

async function loadCatalogFromDisk(filePath: string) {
  const resolved = path.resolve(process.cwd(), filePath)
  const raw = await readFile(resolved, 'utf8')
  return assertValidMedicationCatalogBundle(JSON.parse(raw))
}

function getSupabaseAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('O importador global só pode rodar server-side em Node. Nunca execute este script no browser.')
  }
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error('Defina SUPABASE_URL (ou VITE_SUPABASE_URL) e SUPABASE_SERVICE_ROLE_KEY antes de rodar o importador server-side.')
  }
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } })
}

async function upsertMedication(
  supabase: ReturnType<typeof createClient>,
  medication: GlobalMedicationInsert
) {
  const { data, error } = await supabase
    .from('global_medications')
    .upsert(medication, { onConflict: 'slug' })
    .select('id,slug')
    .single()

  if (error) throw error
  return data as { id: string; slug: string }
}

async function pruneMissingRows(
  supabase: ReturnType<typeof createClient>,
  table: 'global_medication_presentations' | 'global_medication_recommended_doses',
  globalMedicationId: string,
  keepSlugs: string[]
) {
  if (!keepSlugs.length) {
    const { error } = await supabase.from(table).delete().eq('global_medication_id', globalMedicationId)
    if (error) throw error
    return
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('global_medication_id', globalMedicationId)
    .not('slug', 'in', `(${keepSlugs.map((slug) => `"${slug}"`).join(',')})`)

  if (error) throw error
}

async function main() {
  const filePath = process.argv[2] || 'src/data/globalMedicationCatalog.json'
  if (process.argv.includes('--help')) usage()

  const catalog = await loadCatalogFromDisk(filePath)
  if (catalog.catalog_scope !== 'global') {
    throw new Error(`Este importador aceita apenas catalog_scope=global. Recebido: ${catalog.catalog_scope}`)
  }

  const supabase = getSupabaseAdminClient()
  const now = new Date().toISOString()

  for (const medication of catalog.medications) {
    const medicationRow = await upsertMedication(supabase, {
      slug: medication.slug,
      name: medication.name,
      active_ingredient: medication.active_ingredient || null,
      is_controlled: !!medication.is_controlled,
      is_active: medication.is_active !== false,
      notes: medication.notes || null,
      tags: medication.tags || null,
      species: medication.species || null,
      routes: medication.routes || null,
      metadata: medication.metadata || {},
      updated_at: now,
    })

    const presentationRows = (medication.presentations || []).map((presentation) => ({
      global_medication_id: medicationRow.id,
      slug: presentation.slug,
      pharmaceutical_form: presentation.pharmaceutical_form || null,
      concentration_text: presentation.concentration_text || null,
      additional_component: presentation.additional_component || null,
      presentation_unit: presentation.presentation_unit || null,
      commercial_name: presentation.commercial_name || null,
      value: presentation.value ?? null,
      value_unit: presentation.value_unit || null,
      per_value: presentation.per_value ?? null,
      per_unit: presentation.per_unit || null,
      package_quantity: presentation.package_quantity ?? null,
      package_unit: presentation.package_unit || null,
      avg_price_brl: presentation.avg_price_brl ?? null,
      pharmacy_veterinary: presentation.pharmacy_veterinary !== false,
      pharmacy_human: !!presentation.pharmacy_human,
      pharmacy_compounding: !!presentation.pharmacy_compounding,
      metadata: presentation.metadata || {},
      updated_at: now,
    }))

    if (presentationRows.length) {
      const { error } = await supabase
        .from('global_medication_presentations')
        .upsert(presentationRows, { onConflict: 'global_medication_id,slug' })
      if (error) throw error
    }
    await pruneMissingRows(supabase, 'global_medication_presentations', medicationRow.id, presentationRows.map((entry) => entry.slug))

    const doseRows = (medication.recommended_doses || []).map((dose) => ({
      global_medication_id: medicationRow.id,
      slug: dose.slug || `${medication.slug}-${dose.species}-${dose.route}-${dose.dose_value}-${dose.dose_unit}`.toLowerCase().replace(/\s+/g, '-'),
      species: dose.species,
      route: dose.route,
      dose_value: dose.dose_value,
      dose_unit: dose.dose_unit,
      frequency: dose.frequency || null,
      notes: dose.notes || null,
      metadata: dose.metadata || {},
      is_active: true,
      updated_at: now,
    }))

    if (doseRows.length) {
      const { error } = await supabase
        .from('global_medication_recommended_doses')
        .upsert(doseRows, { onConflict: 'global_medication_id,slug' })
      if (error) throw error
    }
    await pruneMissingRows(supabase, 'global_medication_recommended_doses', medicationRow.id, doseRows.map((entry) => entry.slug))
  }

  console.log(`[import-global-catalog] OK - ${catalog.medications.length} medicamentos processados de ${filePath}`)
}

main().catch((error) => {
  console.error('[import-global-catalog] FAIL')
  console.error(error)
  process.exit(1)
})
