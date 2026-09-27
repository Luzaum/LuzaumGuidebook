import fs from 'fs';
import path from 'path';

const dir = 'modules/consulta-vet/data/seed';
const files = fs.readdirSync(dir).filter(f => f.startsWith('diseases.') && f.endsWith('.seed.ts'));
const slugs = [
  'sindrome-cushing-caes',
  'leishmaniose-visceral-canina',
  'erliquiose-monocitica-canina',
  'asma-felina',
  'bronquite-cronica-caes-gatos',
  'granuloma-eosinofilico-felino',
  'doenca-renal-cronica-caes-gatos',
  'hipertensao-arterial-sistemica-caes-gatos',
  'doenca-valvar-mitral-degenerativa-caes',
  'cardiomiopatia-hipertrofica-caes-gatos',
  'cardiomiopatia-dilatada-caes-gatos',
  'arritmias-cardiacas-caes-gatos',
  'hipoadrenocorticismo-addison',
  'diabetes-mellitus-canina',
  'diabetes-mellitus-felina',
  'hipotireoidismo-adquirido-caes-gatos',
  'tumores-mamarios-caes-gatos',
  'miastenia-gravis-caes-gatos',
  'leucemia-viral-felina',
  'peritonite-infecciosa-felina',
  'imunodeficiencia-felina-fiv',
  'insuficiencia-pancreatica-exocrina-caes-gatos',
  'giardiase-caes-gatos',
  'coccidiose-caes-gatos',
  'hiperparatireoidismo-caes-gatos',
  'insulinoma-caes-gatos',
  'cetoacidose-diabetica-caes-gatos',
  'prostatite-caes-gatos',
  'gengivoestomatite-cronica-felina',
  'doenca-periodontal-caes',
  'doenca-periodontal-gatos'
];

for (const slug of slugs) {
  let found = null;
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf-8');
    if (content.includes(`slug: '${slug}'`)) {
      found = f;
      break;
    }
  }
  console.log(`${slug} => ${found}`);
}
