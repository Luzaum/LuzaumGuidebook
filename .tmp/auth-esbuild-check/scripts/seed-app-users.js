// scripts/seed-app-users.ts
import { readFileSync } from "node:fs";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { APPROVED_APP_LOGINS } from "../src/lib/appAccess";
import { resolveSupabaseAuthEmail } from "../src/lib/authIdentifier";
function loadEnvLocal() {
  const values = {};
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const text = line.trim();
      if (!text || text.startsWith("#")) continue;
      const separator = text.indexOf("=");
      if (separator <= 0) continue;
      const key = text.slice(0, separator).trim();
      let value = text.slice(separator + 1).trim();
      if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      values[key] = value;
    }
  } catch {
  }
  return values;
}
function requiredValue(name, fileValues) {
  const value = String(process.env[name] || fileValues[name] || "").trim();
  if (!value) throw new Error(`Defina ${name} antes de executar.`);
  return value;
}
async function main() {
  const fileValues = loadEnvLocal();
  const url = String(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || fileValues.VITE_SUPABASE_URL || "").trim();
  const serviceRole = requiredValue("SUPABASE_SERVICE_ROLE_KEY", fileValues);
  if (!url) throw new Error("Defina SUPABASE_URL ou VITE_SUPABASE_URL antes de executar.");
  const users = APPROVED_APP_LOGINS.map((login) => ({
    login,
    email: resolveSupabaseAuthEmail(login),
    password: requiredValue(`APP_USER_${login.toUpperCase()}_PASSWORD`, fileValues)
  }));
  const admin = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1e3 });
  if (listError) throw listError;
  for (const row of users) {
    const existing = data.users.find((user) => user.email?.toLowerCase() === row.email);
    const appMetadata = {
      ...existing?.app_metadata || {},
      app_access: true
    };
    const userMetadata = {
      ...existing?.user_metadata || {},
      login: row.login,
      username: row.login,
      full_name: row.login.charAt(0).toUpperCase() + row.login.slice(1)
    };
    if (existing) {
      const { error } = await admin.auth.admin.updateUserById(existing.id, {
        password: row.password,
        email_confirm: true,
        app_metadata: appMetadata,
        user_metadata: userMetadata
      });
      if (error) throw error;
      console.log(`[OK] Atualizado: ${row.login}`);
    } else {
      const { error } = await admin.auth.admin.createUser({
        email: row.email,
        password: row.password,
        email_confirm: true,
        app_metadata: appMetadata,
        user_metadata: userMetadata
      });
      if (error) throw error;
      console.log(`[OK] Criado: ${row.login}`);
    }
  }
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
