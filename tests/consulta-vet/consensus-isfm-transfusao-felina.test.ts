import assert from 'node:assert/strict';
import test from 'node:test';

import { consensosSeed } from '../../modules/consulta-vet/data/seed/consensos.seed';
import { getConsensusDocumentOverride } from '../../modules/consulta-vet/utils/consensusDocumentOverrides';

const slug = 'isfm-transfusao-felina-2021';

test('cadastra o consenso ISFM 2021 de transfusao felina com resumo clinico', () => {
  const record = consensosSeed.find((item) => item.slug === slug);

  assert.ok(record);
  assert.equal(record.species, 'cat');
  assert.equal(record.category, 'hematologia');
  assert.equal(record.year, 2021);
  assert.match(record.summary, /gatilho universal/i);
  assert.match(record.keyPointsText, /0,5 ml\/kg\/h por 15 min/i);
  assert.match(record.keyPointsText, /cada 5 min por 30-60 min/i);
  assert.match(record.practicalApplicationText, /uma única transfusão/i);
  assert.match(record.practicalApplicationText, /repetir sangue canino pode causar anafilaxia grave e morte/i);
  assert.match(record.references[0].citationText, /10\.1177\/1098612X211007071/i);
});

test('resolve o PDF local visualizavel do consenso', () => {
  const document = getConsensusDocumentOverride(slug);

  assert.ok(document);
  assert.equal(document.fileUrl, '/documents/consulta-vet/consensos/isfm-transfusao-felina-2021.pdf');
  assert.equal(document.fileName, 'isfm-transfusao-felina-2021.pdf');
});
