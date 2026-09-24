import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { CONSULTA_VET_PUBLIC_MEDICATION_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { applyMedicationBookFoundations, MEDICATION_BOOK_FOUNDATIONS } from '../../modules/consulta-vet/data/medicationBookFoundations';
import { MedicationClinicalFoundationsSection } from '../../modules/consulta-vet/components/medication/MedicationClinicalFoundationsSection';
import { MedicationQuickSummaryPanel } from '../../modules/consulta-vet/components/medication/MedicationQuickSummaryPanel';
import { MedicationPharmacologicalClassificationSection } from '../../modules/consulta-vet/components/medication/MedicationPharmacologicalClassificationSection';
import { MedicationPharmacokineticsSection } from '../../modules/consulta-vet/components/medication/MedicationPharmacokineticsSection';

test('todo medicamento público possui explicações próprias com fontes resolvíveis e estudos clínicos', () => {
  for (const slug of CONSULTA_VET_PUBLIC_MEDICATION_SLUGS) {
    const medication = medicationsSeed.find((record) => record.slug === slug);
    assert.ok(medication, slug);
    assert.ok(MEDICATION_BOOK_FOUNDATIONS[slug], slug);
    assert.ok((medication.clinicalFoundationsData?.length ?? 0) >= 4, `${slug}: deve possuir tópicos didáticos e de evidência`);
    const ids = new Set(medication.references?.map((reference) => reference.id));
    for (const topic of medication.clinicalFoundationsData ?? []) {
      assert.ok(topic.narrative.length > 100, `${slug}: explicação insuficiente`);
      for (const id of topic.referenceIds ?? []) assert.ok(ids.has(id), `${slug}: referência ${id} não encontrada`);
      for (const study of topic.studies ?? []) {
        assert.ok(ids.has(study.referenceId), `${slug}: estudo ${study.referenceId} não encontrado nas referências`);
      }
    }
    const totalStudies = (medication.clinicalFoundationsData ?? []).reduce(
      (acc, topic) => acc + (topic.studies?.length ?? 0),
      0
    );
    assert.ok(totalStudies >= 4, `${slug}: deve conter no mínimo 4 ensaios clínicos comentados (encontrados: ${totalStudies})`);

    // Verifica que livros de referência estão catalogados para a seção de Referências no rodapé
    const bookRefs = (medication.references ?? []).filter((r) => r.id?.startsWith('ref-book-foundations-'));
    assert.ok(bookRefs.length >= 2, `${slug}: deve conter obras de referência catalogadas no rodapé`);

    const html = renderToStaticMarkup(<MedicationClinicalFoundationsSection medication={medication} />);
    // Não deve conter o bloco antigo poluído com linhas completas de livros sob a narrativa
    assert.doesNotMatch(html, /Fontes da explicação/);
    // Deve renderizar os cards de evidências clínicas publicadas com seus badges
    assert.match(html, /Evidência publicada/);
    if (slug !== 'dipirona' && slug !== 'tramadol') {
      assert.doesNotMatch(html, /dipirona|metamizol|4-MAA|COX-3/i, slug);
    } else if (slug === 'tramadol') {
      assert.doesNotMatch(html, /4-MAA|COX-3/i, slug);
    }
  }
});

test('dados opcionais ausentes não injetam farmacologia de outro medicamento', () => {
  for (const record of medicationsSeed.filter((record) => record.slug !== 'dipirona')) {
    const medication = { ...record, pillars: undefined, quickSummaryHighlights: undefined, clinicalFoundationsData: undefined };
    const foundations = renderToStaticMarkup(<MedicationClinicalFoundationsSection medication={medication} />);
    assert.doesNotMatch(foundations, /dipirona|metamizol|4-MAA|COX-3/i);
    const summary = renderToStaticMarkup(<MedicationQuickSummaryPanel medication={{ ...medication, mechanismOfAction: 'Mecanismo específico de teste', cautions: [] }} />);
    assert.match(summary, /Mecanismo específico de teste/);
    assert.doesNotMatch(summary, /COX-3|4-MAA|Alta Segurança Digestiva|Antipirese Central Rápida/);
  }
});

test('classe terapêutica não inventa mecanismo ou segurança gastrointestinal', () => {
  const html = renderToStaticMarkup(<MedicationPharmacologicalClassificationSection classification={{ therapeuticClass: 'Analgésico opioide', chemicalClass: 'Composto de teste' }} />);
  assert.doesNotMatch(html, /AINE|poupador gastrointestinal|4-MAA|modulador alostérico/);
});

test('dados remotos não restauram os fundamentos antigos e aplicação é idempotente', () => {
  const source = medicationsSeed.find((record) => record.slug === 'clindamicina')!;
  const staleRemote = { ...source, clinicalFoundationsData: [{ id: 'wrong', title: 'Errado', narrative: 'Dipirona COX-3', studies: [] }] };
  const repaired = applyMedicationBookFoundations(staleRemote);
  assert.doesNotMatch(JSON.stringify(repaired.clinicalFoundationsData), /Dipirona|COX-3/);
  assert.deepEqual(applyMedicationBookFoundations(repaired), repaired);
});

test('identificadores PubMed de assuntos alheios foram retirados e vínculos internos permanecem válidos', () => {
  const wrongIds = ['28164319', '29082787', '31341103', '23714249', '32102602', '21627732', '29577327', '26316174', '24708785', '22452494', '19671109', '32666642', '20207238', '26704770', '29393736', '28403212', '18179574', '19538466', '35226750'];
  for (const medication of medicationsSeed) {
    for (const reference of medication.references ?? []) {
      for (const wrong of wrongIds) assert.ok(!reference.url?.includes(`/${wrong}/`), `${medication.slug}: ${wrong}`);
    }
    const ids = new Set(medication.references?.map((reference) => reference.id));
    for (const item of [...medication.doses, ...(medication.detailedIndications ?? [])]) {
      for (const id of item.referenceIds ?? []) assert.ok(ids.has(id), `${medication.slug}: ${id}`);
    }
  }
});

test('dipirona preserva monografia padrão-ouro completa com todas as doses, tabela de peso e prescrições', () => {
  const medication = medicationsSeed.find((record) => record.slug === 'dipirona')!;
  // Preserva todas as 5 doses clínicas detalhadas (cão pós-op, febre, cólica, gato pós-op, febre)
  assert.equal(medication.doses.length, 5);
  assert.deepEqual(medication.doses.map((d) => d.id), [
    'dose-dipirona-cao-pos-op',
    'dose-dipirona-cao-febre',
    'dose-dipirona-cao-colica',
    'dose-dipirona-gato-pos-op',
    'dose-dipirona-gato-febre',
  ]);
  // Tabela prática de conversão de peso e calibrador de gotas
  assert.ok(medication.practicalWeightTable);
  assert.ok(medication.practicalWeightTable.rows.length >= 7);
  assert.equal(medication.practicalWeightTable.dropletCalibrator?.dropletRatio, '1 gota = 25 mg');
  // Modelos de prescrição veterinária
  assert.ok(medication.samplePrescriptionText);
  assert.match(medication.samplePrescriptionText, /Novalgina® Gotas 500 mg\/mL/);
  // Preservação de referências indexadas e estudos clínicos
  const refIds = (medication.references ?? []).map((r) => r.id);
  assert.ok(refIds.includes('ref-teixeira-2013'));
  assert.ok(refIds.includes('ref-giorgi-2017'));
  assert.ok(refIds.includes('ref-giorgi-2018'));
  assert.ok(refIds.includes('ref-ferreira-2019'));
  // Evidências publicadas devidamente associadas em clinicalFoundationsData
  const studiesCount = (medication.clinicalFoundationsData ?? []).reduce(
    (acc, t) => acc + (t.studies?.length ?? 0),
    0
  );
  assert.equal(studiesCount, 4);
});

test('correções são estáveis em todas as fichas e não mudam outra molécula', () => {
  for (const record of medicationsSeed) assert.deepEqual(applyMedicationBookFoundations(record), record, record.slug);
  const unknown = { ...medicationsSeed[0], slug: 'medicamento-novo', clinicalFoundationsData: undefined };
  assert.equal(applyMedicationBookFoundations(unknown).clinicalFoundationsData, undefined);
});

test('dados das abas têm campos obrigatórios e farmacocinética renderiza todas as fichas', () => {
  for (const medication of medicationsSeed) {
    assert.ok(Array.isArray(medication.relatedDiseaseSlugs), medication.slug);
    for (const item of medication.generalInfoData?.speciesPeculiarities ?? []) assert.ok(item.description, `${medication.slug}: descrição da espécie`);
    assert.ok(medication.attentionData?.precautions.length, medication.slug);
    assert.ok(medication.generalInfoData?.routesDetailed?.length, medication.slug);
    const html = renderToStaticMarkup(<MedicationPharmacokineticsSection data={medication.pharmacokineticsData} />);
    assert.match(html, /Farmacocinética Aplicada/);
  }
});
