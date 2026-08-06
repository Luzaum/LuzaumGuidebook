import assert from 'node:assert/strict';
import test from 'node:test';
import { appendInlineCitation, composeFlowStepDetail } from '../../modules/consulta-vet/utils/clinicalFlowText';

test('appendInlineCitation adiciona citação no fim do parágrafo', () => {
  const result = appendInlineCitation(
    'Radiografia normal não exclui asma.',
    'Dye et al., 1996',
  );
  assert.equal(result, 'Radiografia normal não exclui asma. (Dye et al., 1996).');
});

test('appendInlineCitation não duplica citação já presente', () => {
  const text = 'Achado clássico (Dye et al., 1996).';
  assert.equal(appendInlineCitation(text, 'Dye et al., 1996'), text);
});

test('composeFlowStepDetail prioriza detail com evidence legado', () => {
  const result = composeFlowStepDetail({
    label: 'Teste',
    detail: 'Texto clínico.',
    evidence: 'Nelson & Couto, 6ª ed.',
  });
  assert.equal(result, 'Texto clínico. (Nelson & Couto, 6ª ed.).');
});
