import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'leptospirose-caes-gatos';

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

test('Leptospirose existe em ficha única sincronizada entre seed, catálogo público e stub de card', () => {
  const matching = diseasesSeed.filter((item) => item.slug === SLUG);
  assert.equal(matching.length, 1, 'deve existir exatamente uma ficha canônica para leptospirose-caes-gatos');
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

test('Leptospirose mapeia todas as chaves de subseção editorial em FULL_KEY_LABELS', () => {
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

test('Leptospirose possui todas as 3 figuras clínicas locais salvas em public/', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const figPaths = [
    (record.etiology as Record<string, { src?: string }>).leptoFiguraMicroscopiaPutz?.src,
    (record.diagnosis as Record<string, { src?: string }>).leptoFiguraRadiografiaLphsSykes?.src,
    (record.diagnosis as Record<string, { src?: string }>).leptoFiguraHistopatologiaHilbe?.src,
  ];
  assert.equal(figPaths.filter(Boolean).length, 3, 'deve conter as 3 figuras clínicas');
  for (const relPath of figPaths) {
    const absPath = path.join(process.cwd(), 'public', relPath!.replace(/^\//, ''));
    assert.ok(fs.existsSync(absPath), `Arquivo de imagem ausente em disco: ${absPath}`);
    assert.ok(fs.statSync(absPath).size > 10_000, `Arquivo de imagem suspeito/vazio: ${absPath}`);
  }
});

test('Leptospirose cobre recomendações centrais ACVIM 2023, IRIS 2024, ABCD 2026 e dados brasileiros', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const fullText = JSON.stringify(record);
  assert.match(fullText, /5 mg\/kg VO/);
  assert.match(fullText, /14 dias/);
  assert.match(fullText, /21 dias/);
  assert.match(fullText, /20–30 mg\/kg IV/);
  assert.match(fullText, /IRIS grau IV/i);
  assert.match(fullText, /LPHS/);
  assert.match(fullText, /Esteves/);
  assert.match(fullText, /19,7%/);
  assert.match(fullText, /Lavras/);
  assert.match(fullText, /9,24%/);
  assert.match(fullText, /Vernaccini/);
  assert.match(fullText, /Hilbe/);
  assert.match(fullText, /Reagan/);
  assert.match(fullText, /Andityas/);
  assert.ok(record.references.length >= 20, 'deve conter consensos, artigos e livros do acervo nas referências finais');
  assert.ok(
    record.references.some((r) => /Greene/i.test(r.title)),
    'Greene 5ed deve constar nas referências finais'
  );
  assert.ok(
    record.references.some((r) => /Plumb/i.test(r.title)),
    'Plumb 10ed deve constar nas referências finais'
  );
});

test('Leptospirose não contém marcadores literais de asterisco duplo (**)', () => {
  const record = diseasesSeed.find((item) => item.slug === SLUG)!;
  const allStrings = collectValues(record);
  const bad = allStrings.filter((s) => s.includes('**'));
  assert.deepEqual(bad, [], `Encontrados marcadores ** literais: ${bad.slice(0, 3).join(' | ')}`);
});
