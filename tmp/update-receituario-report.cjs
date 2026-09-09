const fs = require('fs');
const p = 'docs/receituario-ui-additions-2026-09-07.json';
const data = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const testCase = {
  species: 'gato',
  dose: 'Intoxicação por paracetamol — dose de ataque • 140–140 mg/kg',
  presentation: 'Fluimucil® injetável 100 mg/mL — ampola 3 mL — Solução injetável — 100 mg/mL',
  inserted: true,
  block: 'ACETILCISTEÍNA — FLUIMUCIL® INJETÁVEL 100 MG/ML — AMPOLA 3 ML — 100 mg/mL — Solução injetável\nAdministrar 5,6 mL, por via intravenosa ou por via oral, dose de ataque, em dose única.\nEm seguida, administrar 2,8 mL, por via intravenosa ou por via oral, a cada 6 horas, durante 7 administrações; ajustar conforme evolução e protocolo hospitalar.',
  invalidNumber: false,
};
const resolved = {
  id: 'med-n-acetilcisteina', title: 'N-acetilcisteína (NAC)', query: 'N-acetilcisteína',
  cases: [testCase], selected: 'Acetilcisteína — N-acetilcisteína (NAC)',
  evidence: 'tmp/nac-final2-inserted.yml',
};
data.date = '2026-09-08';
data.scope = 'Interações nos componentes reais isolados, com pacientes, frequência e duração fictícios e sem emissão clínica. Combinações incompatíveis foram bloqueadas. O fluxo autenticado foi validado separadamente.';
data.medicationsAttempted = 52;
data.cases = 815;
data.insertions = 250;
data.invalidNumbers = 0;
data.unresolved = [];
data.results = (data.results || []).map(item => item.id === resolved.id ? resolved : item);
data.resolvedRetests = [resolved];
fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
