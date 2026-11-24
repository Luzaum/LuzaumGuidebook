import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'sindrome-chiari-like-caes-gatos';

function collectValues(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectValues(v, out));
  } else if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((v) => collectValues(v, out));
  }
  return out;
}

test('Síndrome de Chiari-like existe em ficha única sincronizada entre seed, catálogo público e stub de card', () => {
  const matching = diseasesSeed.filter((item) => item.slug === SLUG);
  assert.equal(matching.length, 1, 'deve existir exatamente uma ficha canônica para sindrome-chiari-like-caes-gatos');
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG), 'slug deve estar no catálogo público');
  const stubs = PUBLIC_CATALOG_DISEASE_CARD_STUBS.filter((item) => item.slug === SLUG);
  assert.equal(stubs.length, 1, 'deve existir exatamente um stub de cartão público');

  const record = matching[0];
  assert.equal(record.isPublished, true);
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.deepEqual(record.tags, ['Cães e Gatos']);
  assert.ok(record.quickDecisionStrip.length >= 6);
  assert.ok(record.plainLanguage?.whatIsIt);
  assert.ok((record.plainLanguage?.keyPoints?.length ?? 0) >= 5);
});

test('Síndrome de Chiari-like mapeia todas as chaves de subseção editorial em FULL_KEY_LABELS', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const sections = [
    record.etiology,
    record.epidemiology,
    record.pathogenesisTransmission,
    record.pathophysiology,
    record.clinicalSignsPathophysiology,
    record.diagnosis,
    record.treatment,
    record.prevention,
    record.complications,
  ];
  const builtinKeys = new Set([
    'findingsBySystem',
    'physicalExamFindings',
    'particularidadesCaninasEFelinas',
    'algoritmoDiagnosticoInterativo',
    'algoritmoTratamentoInterativo',
  ]);
  for (const sec of sections) {
    if (!sec || typeof sec !== 'object') continue;
    for (const key of Object.keys(sec as Record<string, unknown>)) {
      if (builtinKeys.has(key)) continue;
      assert.ok(
        Boolean(FULL_KEY_LABELS[key]),
        `Chave de subseção "${key}" deve estar mapeada em FULL_KEY_LABELS`
      );
    }
  }
});

test('Síndrome de Chiari-like possui todas as 4 figuras clínicas locais salvas em public/ com fallbackSrc', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const figs = [
    (record.pathophysiology as Record<string, { src?: string; fallbackSrc?: string }>).chiariFiguraMorfometriaRusbridge2018,
    (record.pathophysiology as Record<string, { src?: string; fallbackSrc?: string }>).chiariFiguraProgressaoRusbridge2018,
    (record.diagnosis as Record<string, { src?: string; fallbackSrc?: string }>).chiariFiguraRmPlanosAnimals2022,
    (record.treatment as Record<string, { src?: string; fallbackSrc?: string }>).chiariFiguraVpsFernandezCid2026,
  ];
  assert.equal(figs.filter((f) => f?.src).length, 4, 'deve conter as 4 figuras clínicas de RM');
  for (const fig of figs) {
    assert.ok(fig?.fallbackSrc?.startsWith('https://'), `fallbackSrc ausente em ${fig?.src}`);
    const absPath = path.join(process.cwd(), 'public', fig!.src!.replace(/^\//, ''));
    assert.ok(fs.existsSync(absPath), `Arquivo de imagem ausente em disco: ${absPath}`);
    assert.ok(fs.statSync(absPath).size > 20_000, `Arquivo de imagem suspeito/vazio: ${absPath}`);
  }
});

test('Síndrome de Chiari-like cobre atualizações de 2026 (FDA Liavium-CA1, CHASE, Park, Fernandez Cid) e diferenciais', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const fullText = JSON.stringify(record);
  assert.match(fullText, /Liavium-CA1/);
  assert.match(fullText, /5–10 mg\/kg/);
  assert.match(fullText, /10–20 mg\/kg/);
  assert.match(fullText, /CHASE/);
  assert.match(fullText, /fictive scratching/i);
  assert.match(fullText, /PSOM/);
  assert.match(fullText, /BVA/);
  assert.match(fullText, /Parker/);
  assert.match(fullText, /Thøfner/);
  assert.match(fullText, /Sanchis-Mora/);
  assert.match(fullText, /ter Maat/);
  assert.match(fullText, /Park/);
  assert.match(fullText, /Fernandez Cid/);
  assert.match(fullText, /Minato/);
  assert.ok(record.references.length >= 20);
});

test('Síndrome de Chiari-like não contém marcadores literais de asterisco duplo (**)', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const allStrings = collectValues(record);
  const bad = allStrings.filter((s) => s.includes('**'));
  assert.deepEqual(bad, [], `Encontrados marcadores ** literais: ${bad.slice(0, 3).join(' | ')}`);
});
