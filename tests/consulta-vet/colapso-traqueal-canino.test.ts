import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { RECEITUARIO_PROTOCOL_MODELS } from '../../modules/consulta-vet/data/receituarioProtocolModels';

const SLUG = 'colapso-traqueal-canino';

function getRecord() {
  const record = diseasesSeed.find((disease) => disease.slug === SLUG);
  assert.ok(record, 'a ficha canônica deve existir');
  return record;
}

test('mantém uma única ficha canônica e um único cartão público', () => {
  const records = diseasesSeed.filter((disease) => disease.slug === SLUG);
  const cards = PUBLIC_CATALOG_DISEASE_CARD_STUBS.filter((card) => card.slug === SLUG);

  assert.equal(records.length, 1);
  assert.equal(cards.length, 1);
  assert.equal(records[0].id, cards[0].id);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(cards[0].quickSummary.length < 500, 'o cartão deve ser um resumo, não uma segunda monografia');
});

test('organiza resumo e rotas clínicas sem repetição excessiva', () => {
  const record = getRecord();

  assert.equal(record.title, 'Colapso Traqueal — Cães');
  assert.deepEqual(record.species, ['dog']);
  assert.equal(record.category, 'respiratorio');
  assert.equal(record.quickDecisionStrip.length, 5);
  assert.equal(record.quickSummaryRich?.diagnosticFlow?.steps.length, 5);
  assert.equal(record.quickSummaryRich?.treatmentFlow?.steps.length, 5);
  assert.ok(record.quickSummary.length < 700);
});

test('oferece protocolos acionáveis com dose, mecanismo, duração e reavaliação', () => {
  const record = getRecord();
  const treatment = record.treatment as Record<string, unknown>;
  const text = JSON.stringify(treatment);

  assert.match(text, /Butorfanol — crise obstrutiva/);
  assert.match(text, /0,05–0,2 mg\/kg/);
  assert.match(text, /Hidrocodona — antitussígeno oral/);
  assert.match(text, /0,2–0,5 mg\/kg/);
  assert.match(text, /Codeína — antitussígeno oral \(alternativa\)/);
  assert.match(text, /1–2 mg\/kg/);
  assert.match(text, /biodisponibilidade oral em cães é muito baixa/i);
  assert.match(text, /não associar empiricamente butorfanol, hidrocodona e codeína/i);
  assert.match(text, /Fluticasona — corticosteroide inalatório/);
  assert.match(text, /100 µg\/cão q8h/);
  assert.match(text, /Terbutalina — teste terapêutico selecionado/);
  assert.match(text, /Teofilina de liberação prolongada/);
  assert.match(text, /mechanism/);
  assert.match(text, /reassess/);
  assert.ok(treatment.planoDeReavaliacao);
});

test('mantém a codeína coerente entre a ficha clínica e o receituário', () => {
  const template = RECEITUARIO_PROTOCOL_MODELS.find((item) => item.id === 'seed-colapso-traqueia-cao');
  assert.ok(template, 'o protocolo de receituário deve existir');

  const text = JSON.stringify(template);
  assert.match(text, /Codeína/);
  assert.match(text, /"min":1,"max":2/);
  assert.match(text, /a cada 6 a 12 horas/);
  assert.match(text, /reavaliação em 48 a 72 horas/i);
  assert.match(text, /Não associar a hidrocodona, butorfanol ou outro antitussígeno opioide/);
});

test('mostra as opções farmacológicas dentro da ordem de prioridade', () => {
  const treatment = getRecord().treatment as Record<string, unknown>;
  const priorities = treatment.ordemDePrioridadeEstruturada as Array<Record<string, unknown>>;
  const text = JSON.stringify(priorities);

  assert.match(text, /Antitussígeno — escolher apenas um/);
  assert.match(text, /butorfanol 0,55 mg\/kg VO q6–12h/i);
  assert.match(text, /hidrocodona 0,2–0,5 mg\/kg VO q6–12h/i);
  assert.match(text, /codeína 1–2 mg\/kg VO q6–12h/i);
  assert.match(text, /fluticasona 110–220 µg\/puff/i);
  assert.match(text, /terbutalina 0,625–5 mg\/cão VO q8–12h/i);
  assert.match(text, /teofilina de liberação prolongada 10 mg\/kg VO q12h/i);
});

test('não expõe raciocínio editorial ou instruções internas ao clínico', () => {
  const text = JSON.stringify(getRecord());

  assert.doesNotMatch(text, /esta ficha|a ficha deve|no app|ConsultaVET|desenvolvedor|medicamentos relacionados/i);
  assert.doesNotMatch(text, /evita misturar faixas conflitantes/i);
});

test('diferencia localização, fase respiratória e limitações da radiografia', () => {
  const record = getRecord();
  const text = JSON.stringify({
    etiology: record.etiology,
    pathophysiology: record.pathophysiology,
    diagnosis: record.diagnosis,
  });

  assert.match(text, /Cervical \/ extratorácico/);
  assert.match(text, /Inspiração/);
  assert.match(text, /Intratorácico/);
  assert.match(text, /Expiração e tosse/);
  assert.match(text, /Radiografia negativa não encerra|radiografias discretas ou sem colapso/i);
  assert.match(text, /14,1%/);
});

test('separa grau anatômico de indicação terapêutica', () => {
  const record = getRecord();
  const diagnosis = record.diagnosis as Record<string, unknown>;
  const treatment = record.treatment as Record<string, unknown>;
  const combined = JSON.stringify({ diagnosis, treatment });

  assert.ok(diagnosis.graduacaoEndoscopica);
  assert.match(combined, /Não transformar a graduação em indicação automática de stent/);
  assert.match(combined, /obstrução grave refratária|obstrução respiratória importante/i);
  assert.match(combined, /Tutor compreende que tosse e medicamentos podem persistir/i);
});

test('expõe complicações pós-stent com contexto de meta-análise', () => {
  const record = getRecord();
  const complications = record.complications as Record<string, unknown>;
  const table = complications.aposStent as { caption?: string; rows?: string[][] };

  assert.match(table.caption ?? '', /Meta-análise de 15 estudos/);
  assert.ok(table.rows?.some((row) => row[0] === 'Tosse tardia clinicamente relevante' && row[1] === '52%'));
  assert.ok(table.rows?.some((row) => row[0] === 'Fratura' && row[1] === '12%'));
});

test('usa linguagem simples segura e inclui sinais de urgência', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  const text = [plain.whatIsIt, ...plain.keyPoints].join(' ');

  assert.match(text, /peitoral/i);
  assert.match(text, /Língua azulada/);
  assert.doesNotMatch(text, /broncodilatador/i);
});

test('referências distinguem livros, estudos e revisão especializada', () => {
  const record = getRecord();
  const references = record.references ?? [];
  const ids = new Set(references.map((reference) => reference.id));

  for (const id of [
    'ref-ettinger-9e',
    'ref-plumbs-10e',
    'ref-nelson-couto-6e',
    'ref-thrall-8e',
    'ref-endoscopy-2e',
    'ref-kim-2024',
    'ref-robin-2024',
    'ref-talavera-2023',
    'ref-carr-2022',
    'ref-suematsu-radiography-2025',
    'ref-suematsu-prosthesis-2026',
    'ref-weisse-2026',
    'ref-acvs',
  ]) {
    assert.ok(ids.has(id), `referência ausente: ${id}`);
  }

  assert.equal(record.relatedConsensusSlugs.length, 0, 'não existe consenso formal específico para vincular');
  assert.match(references.find((reference) => reference.id === 'ref-acvs')?.notes ?? '', /não é consenso formal/);
  assert.doesNotMatch(JSON.stringify(record), /VIN 2026|ZFYVE16|Wolfe et al/i);
});
