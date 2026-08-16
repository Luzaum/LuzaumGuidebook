import test from 'node:test';
import assert from 'node:assert/strict';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'colapso-traqueal-canino';

test('Colapso traqueal existe em diseasesSeed', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.equal(record?.title, 'Colapso Traqueal — Cães');
  assert.deepEqual(record?.species, ['dog']);
  assert.equal(record?.category, 'respiratorio');
});

test('Colapso traqueal está no catálogo público', () => {
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG));
  assert.ok(PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === SLUG));
});

test('Colapso traqueal tem estrutura editorial mínima', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(record);
  assert.ok(record!.quickDecisionStrip.length >= 10);
  assert.ok(record!.references && record!.references.length >= 14);
  assert.ok(record!.plainLanguage || DISEASE_PLAIN_LANGUAGE[SLUG]);
  assert.ok(record!.quickSummaryRich?.diagnosticFlow?.steps.length >= 5);
  assert.ok(record!.quickSummaryRich?.treatmentFlow?.steps.length >= 5);
});

test('Colapso traqueal documenta cinco pontos-chave e VIN 2026', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const etiology = record?.etiology as Record<string, unknown> | undefined;
  const pontos = etiology?.pontosChave as string[] | undefined;
  assert.ok(Array.isArray(pontos) && pontos.length >= 5);
  const strip = record?.quickDecisionStrip.join(' ') ?? '';
  assert.match(strip, /inspiração/i);
  assert.match(strip, /expiração/i);
  assert.match(strip, /Radiografia normal não exclui/i);
  assert.match(strip, /Wolfe et al\., VIN 2026/);
});

test('Colapso traqueal inclui seções clínicas e figuras SVG', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const etiology = record?.etiology as Record<string, unknown> | undefined;
  const diagnosis = record?.diagnosis as Record<string, unknown> | undefined;
  const patho = record?.pathogenesisTransmission as Record<string, unknown> | undefined;
  const treatment = record?.treatment as Record<string, unknown> | undefined;

  assert.ok(etiology?.consultaRapidaTable);
  assert.ok(etiology?.geneticaZfyve16);
  assert.ok(diagnosis?.tabelaGrauI_IV);
  assert.ok(diagnosis?.alertaRxNormal);
  assert.ok(diagnosis?.kim2024);
  assert.ok(diagnosis?.robin2024);
  assert.ok(patho?.figuraPressoes);
  assert.ok(treatment?.tabelaFarmacologica);
  assert.ok(treatment?.fenotiposCards);
  assert.ok(treatment?.escoreControleConsultaVet);

  const figGraus = diagnosis?.figuraGraus as { src?: string };
  assert.match(figGraus?.src ?? '', /graus-colapso-i-iv\.svg/);
});

test('Colapso traqueal não recomenda broncodilatador como primeira linha na linguagem simples', () => {
  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  const text = [plain.whatIsIt, ...plain.keyPoints].join(' ');
  assert.match(text, /peitoral/i);
  assert.match(text, /antitussígeno/i);
  assert.doesNotMatch(text, /broncodilatador/i);
});

test('Colapso traqueal documenta erros comuns e nota dexametasona', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const treatment = record?.treatment as Record<string, unknown> | undefined;
  const erros = treatment?.errosComuns as string[] | undefined;
  assert.ok(Array.isArray(erros) && erros.length >= 10);
  const nota = treatment?.notaDexametasona as string;
  assert.match(nota, /dexametasona|Discrepância/i);
});

test('Colapso traqueal referências incluem IDs obrigatórios', () => {
  const record = diseasesSeed.find((d) => d.slug === SLUG);
  const ids = new Set(record?.references?.map((r) => r.id));
  for (const id of [
    'ref-vin-2026',
    'ref-johnson-resp-2020',
    'ref-drobatz-emerg-2019',
    'ref-lumb-jones-6',
    'ref-bsava-emergency',
    'ref-nelson-2020',
    'ref-kim-2024',
    'ref-robin-2024',
    'ref-congiusta-2021',
    'ref-suematsu-2025',
    'ref-weisse-2026',
    'ref-talavera-2023',
    'ref-acvs',
    'ref-suematsu-2026-w',
    'ref-toone-2024',
    'ref-jung-2024',
  ]) {
    assert.ok(ids.has(id), `missing reference ${id}`);
  }
  const kim = record?.references?.find((r) => r.id === 'ref-kim-2024');
  assert.ok(kim?.url?.includes('frontiersin.org'));
});
