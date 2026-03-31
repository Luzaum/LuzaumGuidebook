import { supabase } from '../../../src/lib/supabaseClient'
import type { AdapterDataSource, DataAdapter } from './DataAdapter'
import { LocalAdapter } from './LocalAdapter'
import { SupabaseAdapter } from './SupabaseAdapter'

export type CreateRxDataAdapterOptions = {
  source: AdapterDataSource
  clinicId?: string | null
}

export function resolveRxDataSource(rawValue: unknown): AdapterDataSource {
  const normalized = String(rawValue || '')
    .trim()
    .toLowerCase()
  return normalized === 'supabase' ? 'supabase' : 'local'
}

export function createRxDataAdapter(options: CreateRxDataAdapterOptions): DataAdapter {
  if (options.source === 'supabase') {
    return new SupabaseAdapter({
      supabase,
      getClinicId: () => options.clinicId,
    })
  }

  return new LocalAdapter()
}

export * from './DataAdapter'
export * from './LocalAdapter'
export * from './SupabaseAdapter'
