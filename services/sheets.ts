export type SheetUser = {
  email?: string;
  phone?: string;
  name?: string;
  passwordHash?: string;
};

const SHEET_ID = '1NppH95Yc4-lS0BlZ-F8Zq25jZE98kRaceB59xEoQ68Y';
const SHEET_NAME = 'Users';

const GVIZ_ENDPOINT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

function parseGvizJson(text: string): any {
  // gviz returns something like: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Invalid GViz response');
  const json = text.slice(start, end + 1);
  return JSON.parse(json);
}

export async function fetchUsersFromSheet(): Promise<SheetUser[]> {
  const res = await fetch(GVIZ_ENDPOINT, { cache: 'no-store' });
  const text = await res.text();
  const data = parseGvizJson(text);
  const cols = data.table.cols.map((c: any) => (c.label || c.id || '').toString().trim().toLowerCase());
  const rows = (data.table.rows || []) as any[];
  const users: SheetUser[] = rows.map((r) => {
    const obj: any = {};
    cols.forEach((key: string, idx: number) => {
      const v = r.c[idx]?.v ?? r.c[idx]?.f ?? null;
      obj[key] = typeof v === 'string' ? v.trim() : v;
    });
    // Normalize expected keys
    return {
      email: obj.email || obj.gmail || undefined,
      phone: normalizePhone(obj.phone || obj.telefone),
      name: obj.name || obj.nome || undefined,
      passwordHash: obj.passwordhash || obj.senha_hash || obj.senha || undefined,
    } as SheetUser;
  });
  return users;
}

export function normalizePhone(input?: string): string | undefined {
  if (!input) return undefined;
  const digits = (input.match(/\d/g) || []).join('');
  return digits.length >= 10 ? digits : undefined;
}

export async function verifyCredentials(identifier: string, passwordHash: string): Promise<SheetUser | null> {
  const users = await fetchUsersFromSheet();
  const needlePhone = normalizePhone(identifier);
  const found = users.find((u) => {
    const byEmail = u.email && identifier && u.email.toLowerCase() === identifier.toLowerCase();
    const byPhone = u.phone && needlePhone && u.phone === needlePhone;
    return (byEmail || byPhone) && !!u.passwordHash && u.passwordHash === passwordHash;
  });
  return found || null;
}

// Optional: append via Google Apps Script web app (POST)
export async function appendUserViaAppsScript(user: SheetUser): Promise<boolean> {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined;
  if (!url) return false;
  const payload = {
    sheet: SHEET_NAME,
    data: {
      timestamp: new Date().toISOString(),
      email: user.email || '',
      phone: user.phone || '',
      name: user.name || '',
      passwordHash: user.passwordHash || '',
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}


