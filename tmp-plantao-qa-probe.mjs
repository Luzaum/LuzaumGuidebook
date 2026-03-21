import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
await context.addInitScript(() => {
  const nowIso = new Date().toISOString();
  const fakeUser = { id:'qa-user', aud:'authenticated', role:'authenticated', email:'qa.plantaovet@gmail.com', email_confirmed_at:nowIso, confirmed_at:nowIso, last_sign_in_at:nowIso, phone:'', app_metadata:{ provider:'email', providers:['email'] }, user_metadata:{ name:'QA PlantaoVet' }, identities:[], created_at:nowIso, updated_at:nowIso };
  const fakeSession = { access_token:'qa-access-token', token_type:'bearer', expires_in:3600, expires_at:Math.floor(Date.now()/1000)+3600, refresh_token:'qa-refresh-token', user:fakeUser };
  localStorage.setItem('vetius:active-clinic-id', 'qa-clinic');
  Object.defineProperty(window, 'supabase', { configurable:true, set(value){ value.auth.getSession = async()=>({ data:{ session: fakeSession }, error:null }); value.auth.onAuthStateChange = ()=>({ data:{ subscription:{ unsubscribe(){} } } }); value.from = (table)=>({ select(){ return this; }, order(){ return Promise.resolve({ data: table==='memberships' ? [{ id:'mem-1', user_id:'qa-user', clinic_id:'qa-clinic', role:'owner', created_at:nowIso, clinics:{ id:'qa-clinic', name:'Clinica QA', created_at:nowIso } }] : [], error:null }); } }); value.rpc = async(fn)=>({ data: fn==='bootstrap_clinic' ? { clinic_id:'qa-clinic', clinic_name:'Clinica QA', role:'owner' } : null, error:null }); window.__supabase = value; }, get(){ return window.__supabase; } });
});
const page = await context.newPage();
await page.goto('http://127.0.0.1:4173/plantao-vet/dashboard', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Criar plantão' }).click();
await page.waitForTimeout(800);
console.log((await page.textContent('body'))?.slice(0, 2500));
await browser.close();
