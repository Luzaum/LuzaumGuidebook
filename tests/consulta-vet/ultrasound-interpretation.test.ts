import assert from 'node:assert/strict';
import test from 'node:test';
import { ULTRASOUND_ORGANS } from '../../modules/consulta-vet/data/ultrasoundReferenceData';
import { getUltrasoundReportPatterns, ULTRASOUND_REPORT_PATTERNS, ultrasoundPatternSource } from '../../modules/consulta-vet/data/ultrasoundInterpretationData';

test('todos os órgãos oferecem interpretações completas e páginas válidas do livro', () => {
  assert.deepEqual(Object.keys(ULTRASOUND_REPORT_PATTERNS).sort(), ULTRASOUND_ORGANS.map(organ => organ.id).sort());
  const rows = Object.values(ULTRASOUND_REPORT_PATTERNS).flat();
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length);
  for (const organ of ULTRASOUND_ORGANS) {
    assert.ok(ULTRASOUND_REPORT_PATTERNS[organ.id].length > 0);
    for (const row of ULTRASOUND_REPORT_PATTERNS[organ.id]) {
      for (const field of ['term', 'meaning', 'mechanism', 'differentials', 'consider'] as const) assert.ok(row[field].trim().length > 0);
      if (row.pages) {
      assert.match(row.pages, /^\d+(?:–\d+)?(?:; \d+(?:–\d+)?)*$/);
      for (const page of row.pages.match(/\d+/g)!) assert.ok(Number(page) >= 1 && Number(page) <= 196);
      } else { assert.ok(row.books && row.books.length > 0); }
      assert.ok(row.species.length > 0);
      if (row.pages) assert.ok(ultrasoundPatternSource(row.pages).includes('PDF'));
    }
  }
});

test('busca sem acentos encontra termos e diferenciais respeitando espécie', () => {
  assert.equal(getUltrasoundReportPatterns('liver', 'dog', 'grosseiro').length, 1);
  assert.ok(getUltrasoundReportPatterns('liver', 'cat', 'fibrose').length > 0);
  assert.deepEqual(getUltrasoundReportPatterns('kidneys', 'cat', 'CÓRTEX'), getUltrasoundReportPatterns('kidneys', 'cat', 'cortex'));
  assert.equal(getUltrasoundReportPatterns('gallbladder', 'cat', 'kiwi').length, 0);
  assert.ok(getUltrasoundReportPatterns('gallbladder', 'dog', 'kiwi').some(row => row.id === 'gallbladder-1'));
  assert.equal(getUltrasoundReportPatterns('liver', 'dog', 'termo inexistente xyz').length, 0);
});

test('paginação converte página impressa em PDF preservando intervalos separados', () => {
  assert.equal(ultrasoundPatternSource('3–6; 86–92'), 'BSAVA Ultrasonography, 1ª ed. · p. 3–6; 86–92 · PDF 15–18; 98–104');
});

test('sinais de comprometimento agudo permanecem identificáveis na consulta', () => {
  for (const organ of ['ureters', 'bladder', 'small-intestine', 'eyes', 'heart'] as const) assert.ok(getUltrasoundReportPatterns(organ, 'dog').some(row => row.urgent));
});
