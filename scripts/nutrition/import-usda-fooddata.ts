#!/usr/bin/env tsx
/**
 * Importação USDA FoodData Central — execução administrativa/server-side.
 * Requer FDC_API_KEY em variável de ambiente. Nunca expor no frontend.
 */

const API_KEY = process.env.FDC_API_KEY
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

export interface UsdaImportOptions {
  dataTypes?: string[]
  pageSize?: number
  maxPages?: number
  dryRun?: boolean
}

export async function fetchUsdaFoods(query: string, options: UsdaImportOptions = {}) {
  if (!API_KEY) {
    throw new Error('FDC_API_KEY ausente. Configure a variável de ambiente antes de importar.')
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    pageSize: String(options.pageSize ?? 50),
    dataType: (options.dataTypes ?? ['Foundation', 'SR Legacy', 'Survey (FNDDS)']).join(','),
  })

  const response = await fetch(`${BASE_URL}/foods/search?${params}`)
  if (!response.ok) {
    throw new Error(`USDA API erro ${response.status}: ${await response.text()}`)
  }
  return response.json()
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  if (!API_KEY) {
    console.error('Abortado: FDC_API_KEY não configurada.')
    process.exit(1)
  }

  console.log(`USDA import ${dryRun ? '(dry-run)' : ''} — busca curada de ingredientes`)
  const sample = await fetchUsdaFoods('chicken raw', { pageSize: 5, dryRun })
  const total = sample.totalHits ?? sample.total ?? 0
  console.log(`Resultados para amostra: ${total}`)
  console.log('Importação completa requer Supabase local + map-usda-nutrients + validate-usda-import.')
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
