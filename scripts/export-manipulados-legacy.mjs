import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const clinicId = process.env.CLINIC_ID || ''

if (!supabaseUrl || !supabaseKey || !clinicId) {
  console.error('Uso: definir VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY e CLINIC_ID para exportar o legado.')
  process.exit(1)
}

const outDir = path.resolve('backups', 'receituario-vet')
fs.mkdirSync(outDir, { recursive: true })

const client = createClient(supabaseUrl, supabaseKey)

async function loadTable(table, orderBy = 'created_at') {
  const { data, error } = await client
    .from(table)
    .select('*')
    .eq('clinic_id', clinicId)
    .order(orderBy, { ascending: true })

  if (error) throw error
  return data || []
}

async function main() {
  const [medications, ingredients, regimens] = await Promise.all([
    loadTable('compounded_medications'),
    loadTable('compounded_medication_ingredients', 'sort_order'),
    loadTable('compounded_medication_regimens', 'sort_order'),
  ])

  const payload = {
    exported_at: new Date().toISOString(),
    clinic_id: clinicId,
    medications,
    ingredients,
    regimens,
  }

  const file = path.join(outDir, `manipulados-legado-${clinicId}.json`)
  fs.writeFileSync(file, JSON.stringify(payload, null, 2))
  console.log(file)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
