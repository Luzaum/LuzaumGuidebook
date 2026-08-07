import assert from 'node:assert/strict';
import test from 'node:test';
import {
  stripEditorialSubsectionPrefix,
  translateEditorialSubsectionKey,
  translateSystemGroupTitle,
} from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('remove prefixo tc dos títulos gerados', () => {
  assert.equal(translateEditorialSubsectionKey('tcMecanismoImune'), 'Mecanismo imune');
  assert.equal(translateEditorialSubsectionKey('tcGatilhosComuns'), 'Gatilhos comuns');
  assert.equal(translateEditorialSubsectionKey('tcHistoriaEFisico'), 'História e exame físico');
});

test('não exibe "Tc" no início do título', () => {
  const label = translateEditorialSubsectionKey('tcRemodelamento');
  assert.ok(!label.startsWith('Tc '), `esperava título sem "Tc ", recebeu: ${label}`);
  assert.equal(label, 'Remodelamento brônquico');
});

test('stripEditorialSubsectionPrefix remove tc e normaliza camelCase', () => {
  assert.equal(stripEditorialSubsectionPrefix('tcMecanismoImune'), 'mecanismoImune');
  assert.equal(stripEditorialSubsectionPrefix('tcHistoriaEFisico'), 'historiaEFisico');
});

test('chaves com rótulo explícito mantêm acentuação editorial', () => {
  assert.equal(translateEditorialSubsectionKey('tcDefinicaoOperacional'), 'Definição operacional');
  assert.equal(translateEditorialSubsectionKey('tcPrevencaoDeRecidiva'), 'Prevenção de recidiva');
});

test('translateSystemGroupTitle traduz sistemas compostos e chaves em inglês', () => {
  assert.equal(translateSystemGroupTitle('general/dog'), 'Geral · Cão');
  assert.equal(translateSystemGroupTitle('general/cat'), 'Geral · Gato');
  assert.equal(translateSystemGroupTitle('general'), 'Geral');
  assert.equal(translateSystemGroupTitle('effusion'), 'Efusão');
  assert.equal(translateSystemGroupTitle('biochemical'), 'Bioquímico');
  assert.equal(translateSystemGroupTitle('oncologic'), 'Oncológico');
});
