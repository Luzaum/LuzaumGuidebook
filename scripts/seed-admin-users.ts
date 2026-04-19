/**
 * Cria utilizadores Supabase Auth com perfil de administrador (app_metadata).
 * Recomendado: SUPABASE_SERVICE_ROLE_KEY (Dashboard → Settings → API → service_role).
 * Sem service role, tenta signUp com anon (só funciona se "Sign ups" estiver permitido no projeto).
 *
 * Uso: npx tsx scripts/seed-admin-users.ts
 */
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import process from 'node:process'
import { resolveSupabaseAuthEmail } from '../src/lib/authIdentifier'

function loadEnvLocal(): Record<string, string> {
  const out: Record<string, string> = {}
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i <= 0) continue
      const key = t.slice(0, i).trim()
      let val = t.slice(i + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      out[key] = val
    }
  } catch {
    // .env.local opcional se vars já estão no ambiente
  }
  return out
}

function mergeEnv() {
  const file = loadEnvLocal()
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || file.VITE_SUPABASE_URL
  const anon = process.env.VITE_SUPABASE_ANON_KEY || file.VITE_SUPABASE_ANON_KEY
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || file.SUPABASE_SERVICE_ROLE_KEY
  return { url, anon, service }
}

/**
 * O campo de login da UI é "email" — Supabase Auth não aceita só "rani" sem domínio.
 * Ajuste os emails em código ou defina ADMIN_RANI_EMAIL / ADMIN_LUISHCDS_EMAIL.
 */
function resolveAdmins(): { login: string; email: string; password: string }[] {
  const p1 = process.env.ADMIN_RANI_PASSWORD?.trim()
  const p2 = process.env.ADMIN_LUISHCDS_PASSWORD?.trim()
  if (!p1 || !p2) {
    throw new Error(
      'Defina ADMIN_RANI_PASSWORD e ADMIN_LUISHCDS_PASSWORD no ambiente (ou na linha de comando) antes de executar.'
    )
  }
  return [
    {
      login: 'rani',
      email: process.env.ADMIN_RANI_EMAIL?.trim() || resolveSupabaseAuthEmail('rani'),
      password: p1,
    },
    {
      login: 'luishcds',
      email: process.env.ADMIN_LUISHCDS_EMAIL?.trim() || resolveSupabaseAuthEmail('luishcds'),
      password: p2,
    },
  ]
}

async function createViaServiceRole(
  url: string,
  serviceKey: string,
  admins: { login: string; email: string; password: string }[]
) {
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })

  const { data: userPage } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const existingUsers = userPage?.users ?? []

  for (const row of admins) {
    const found = existingUsers.find((u) => u.email?.toLowerCase() === row.email.toLowerCase())

    if (found) {
      const { data, error } = await admin.auth.admin.updateUserById(found.id, {
        password: row.password,
        app_metadata: { ...((found.app_metadata || {}) as object), is_admin: true, role: 'admin' },
        user_metadata: { ...((found.user_metadata || {}) as object), login: row.login },
        email_confirm: true,
      })
      if (error) throw error
      console.log(`[OK] Atualizado: ${row.email} (id=${data.user?.id})`)
    } else {
      const { data, error } = await admin.auth.admin.createUser({
        email: row.email,
        password: row.password,
        email_confirm: true,
        app_metadata: { is_admin: true, role: 'admin' },
        user_metadata: { login: row.login },
      })
      if (error) throw error
      console.log(`[OK] Criado: ${row.email} (id=${data.user?.id})`)
    }
  }
}

async function createViaAnonSignup(
  url: string,
  anonKey: string,
  admins: { login: string; email: string; password: string }[]
) {
  const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  for (const row of admins) {
    const { data, error } = await client.auth.signUp({
      email: row.email,
      password: row.password,
      options: {
        data: { login: row.login },
      },
    })
    if (error) {
      console.error(`[ERRO] ${row.email}:`, error.message)
      continue
    }
    console.log(
      `[OK?] signUp ${row.email} — se o projeto exige confirmação por email, confirme no Dashboard ou desative em Auth → Providers. user=${data.user?.id ?? 'n/a'}`
    )
  }
}

async function main() {
  const admins = resolveAdmins()
  const { url, anon, service } = mergeEnv()
  if (!url || (!service && !anon)) {
    console.error(
      'Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY, ou SUPABASE_SERVICE_ROLE_KEY (preferido), no .env.local ou no ambiente.'
    )
    process.exit(1)
  }

  console.log('Contas (na UI use só o utilizador, ou o email completo):')
  for (const r of admins) {
    console.log(`  - ${r.login}  (interno: ${r.email})`)
  }
  console.log('')

  if (service) {
    await createViaServiceRole(url, service, admins)
    console.log('\nConcluído. app_metadata: is_admin=true, role=admin')
    return
  }

  console.warn(
    'AVISO: SUPABASE_SERVICE_ROLE_KEY não encontrada — a usar signUp (anon). Para marcar is_admin no JWT, adicione a service_role e volte a executar este script.'
  )
  await createViaAnonSignup(url, anon!, admins)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
