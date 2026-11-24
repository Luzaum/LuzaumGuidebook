import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import { MedicationAttentionTab } from '../../modules/consulta-vet/components/medication/MedicationAttentionTab';
import { applyMedicationBookFoundations } from '../../modules/consulta-vet/data/medicationBookFoundations';

test('rótulos clínicos compartilhados são inteiramente em português', () => {
  assert.equal(translateEditorialSubsectionKey('findingsBySystem'), 'Sinais clínicos por sistema');
  assert.equal(translateEditorialSubsectionKey('physicalExamFindings'), 'Achados do exame físico');
  for (const key of ['redFlagsInternacao', 'desbridamentoCirurgicoLavagemSemH2O2', 'portasDeEntradaECorrecionAoVinPeroxidoDeHidrogenio', 'viasBidirecionaisTopDownEBottomUp', 'pocusToracoAbdominalEImaginologia']) {
    assert.doesNotMatch(translateEditorialSubsectionKey(key), /red flags|wound care|top-down|bottom-up|point-of-care/i);
  }
});

test('cinomose mantém os sete sistemas, mecanismos, alertas e imagens sem segunda tabela de sinais', () => {
  const disease = diseasesSeed.find(d => d.slug === 'cinomose-canina')!;
  const section = disease.clinicalSignsPathophysiology as Record<string, unknown>;
  assert.equal(section.findingsBySystem, undefined);
  for (const key of ['cdvManifestacoesGerais', 'cdvManifestacoesGastrointestinais', 'cdvManifestacoesRespiratoriasEOculares', 'cdvManifestacoesOftalmologicas', 'cdvManifestacoesDermatologicas', 'cdvManifestacoesOdontologicas', 'cdvManifestacoesNeurologicas']) assert.ok(section[key], key);
  const text = JSON.stringify(section);
  for (const pattern of [/hipoglicemia/, /parvovirose simultânea/, /perda de água e eletrólitos/, /oximetria/, /imagem torácica/, /Schirmer/, /fluoresceína/, /medalhão/, /pupilar/, /não confirma sozinha nem sua ausência afasta/, /esmalte maduro não se regenera/, /perda de mielina/, /células gliais/, /refratárias/, /sono/, /deglutição/, /natimortos/]) assert.match(text, pattern);
  assert.ok(section.cdvFiguraOculonasalSistemica);
  assert.ok(section.cdvFiguraHipoplasiaEsmalte);
  assert.ok(section.physicalExamFindings);
});

test('perfil epidemiológico da obstrução funcional permanece inteiro somente na epidemiologia', () => {
  const disease = diseasesSeed.find(d => d.slug === 'obstrucao-funcional-fluxo-urinario-caes')!;
  const etiology = disease.etiology as Record<string, unknown>;
  const epidemiology = disease.epidemiology as Record<string, unknown>;
  for (const key of ['epidemiologiaPerfilPredisposicao', 'diferenciacaoCriticaCaesVsGatos']) {
    assert.equal(etiology[key], undefined);
    assert.ok(typeof epidemiology[key] === 'string' && epidemiology[key].length > 500);
  }
  assert.match(String(epidemiology.epidemiologiaPerfilPredisposicao), /88,6%/);
  assert.ok(etiology.tabelaComparativaCaesVsGatosFoo);
});

test('precaução remota duplicada aparece uma vez; mecanismo e conduta exclusivos continuam acessíveis', () => {
  const medication = { ...medicationsSeed[0], attentionData: { precautions: [
    { condition: 'Condição exclusiva de teste', physiologicalExplanation: 'Condição exclusiva de teste', clinicalAction: '', alertLevel: 'caution' as const },
    { condition: 'Outra condição', physiologicalExplanation: 'Mecanismo específico preservado', clinicalAction: 'Conduta específica preservada', alertLevel: 'warning' as const },
  ] } };
  const html = renderToStaticMarkup(<MedicationAttentionTab medication={medication} />);
  assert.equal(html.split('Condição exclusiva de teste').length - 1, 1);
  assert.match(html, /Mecanismo específico preservado/);
  assert.match(html, /Conduta específica preservada/);
  assert.equal((html.match(/Entender o mecanismo/g) || []).length, 1);
  assert.equal((html.match(/Conduta Clínica:/g) || []).length, 1);
});

test('gerador de evidências preserva resultados e limitações sem duplicar resultados na narrativa', () => {
  const source = medicationsSeed.find(m => m.slug === 'acetilcisteina')!;
  const original = source.clinicalStudiesCommented![0];
  const study = { ...original, methodology: undefined, mainFindings: 'Resultado exclusivo preservado.', limitations: 'Limitação exclusiva preservada.', clinicalTakeaway: 'Interpretação exclusiva preservada.' };
  const updated = applyMedicationBookFoundations({ ...source, clinicalFoundationsData: undefined, clinicalStudiesCommented: [study] });
  const topic = updated.clinicalFoundationsData!.find(t => t.studies?.some(s => s.referenceId === study.referenceId))!;
  assert.ok(topic);
  assert.doesNotMatch(topic.narrative, /Resultado exclusivo/);
  assert.match(topic.studies![0].summaryText, /Resultado exclusivo preservado/);
  assert.match(topic.studies![0].summaryText, /Limitação exclusiva preservada/);
  assert.equal(topic.studies![0].clinicalConclusion, study.clinicalTakeaway);
});
