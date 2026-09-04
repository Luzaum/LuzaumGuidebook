/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const PLACEHOLDER_SUPABASE_URL = 'https://placeholder.local.supabase.co';
const PLACEHOLDER_SUPABASE_ANON_KEY = 'public-anon-key';

function readSupabaseConfig() {
  const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
  const anonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  const looksConfigured =
    Boolean(url && anonKey) &&
    !url.includes('your-project-id') &&
    anonKey !== 'sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  return {
    url: looksConfigured ? url : PLACEHOLDER_SUPABASE_URL,
    anonKey: looksConfigured ? anonKey : PLACEHOLDER_SUPABASE_ANON_KEY,
    isConfigured: looksConfigured,
  };
}

const config = readSupabaseConfig();

export const isSupabaseConfigured = config.isConfigured;

export const supabase: SupabaseClient = createClient(config.url, config.anonKey);
