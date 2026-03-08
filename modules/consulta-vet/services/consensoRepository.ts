import { consensoFeatureFlags } from '../config/consensoFeatureFlags';
import type { ConsensoRepository } from './repositories/consenso.repository';
import { localConsensoRepository } from './adapters/local/localConsensoRepository';
import { supabaseConsensoRepository } from './adapters/supabase/supabaseConsensoRepository';

function hasSupabaseEnv(): boolean {
  const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
  const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  return Boolean(url && key && !key.includes('...'));
}

export function getConsensoRepository(): ConsensoRepository {
  const wantsSupabase = consensoFeatureFlags.dataSource === 'supabase';
  if (wantsSupabase && hasSupabaseEnv()) {
    return supabaseConsensoRepository;
  }
  return localConsensoRepository;
}

export function isSupabaseConsensoEnabled(): boolean {
  return getConsensoRepository() === supabaseConsensoRepository;
}
