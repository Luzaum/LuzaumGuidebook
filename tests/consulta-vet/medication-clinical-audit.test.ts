import assert from 'node:assert/strict';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_MEDICATION_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PLUMBS_10_MONOGRAPH_AUDIT } from '../../modules/consulta-vet/data/plumbs10MedicationAudit';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import {
  getMedicationTherapeuticClassIds,
  MEDICATION_THERAPEUTIC_CLASSES,
} from '../../modules/consulta-vet/utils/medicationTherapeuticClasses';

const bySlug = new Map(medicationsSeed.map((medication) => [medication.slug, medication]));

test('toda opção pública é uma molécula, possui dose e recebe classificação terapêutica', () => {
  assert.equal(CONSULTA_VET_PUBLIC_MEDICATION_SLUGS.includes('betabloqueadores' as never), false);

  for (const slug of CONSULTA_VET_PUBLIC_MEDICATION_SLUGS) {
    const medication = bySlug.get(slug);
    assert.ok(medication, `${slug}: monografia ausente no seed editorial`);
    assert.ok(medication.doses.length > 0, `${slug}: nenhuma faixa posológica cadastrada`);
    assert.ok(getMedicationTherapeuticClassIds(medication).length > 0, `${slug}: sem classe terapêutica`);
    const medicationReferenceIds = new Set((medication.references || []).map((reference) => reference.id));

    for (const dose of medication.doses) {
      assert.ok(Number.isFinite(dose.doseMin) && dose.doseMin > 0, `${slug}/${dose.id}: dose mínima inválida`);
      assert.ok(dose.doseMax === undefined || dose.doseMax >= dose.doseMin, `${slug}/${dose.id}: faixa invertida`);
      assert.ok(dose.route.trim(), `${slug}/${dose.id}: via ausente`);
      assert.ok(dose.frequency.trim(), `${slug}/${dose.id}: frequência ausente`);
      assert.ok(dose.referenceIds?.length, `${slug}/${dose.id}: dose sem referência vinculada`);
      for (const referenceId of dose.referenceIds || []) {
        assert.ok(medicationReferenceIds.has(referenceId), `${slug}/${dose.id}: referência inexistente (${referenceId})`);
      }
    }
  }
});

test('taxonomia separa AINEs, glicocorticoides, analgésicos e antídotos', () => {
  const aines = MEDICATION_THERAPEUTIC_CLASSES.find((item) => item.slug === 'aines');
  assert.ok(aines, 'a categoria AINEs deve existir mesmo sem molécula pública atual');
  assert.equal(aines.medicationSlugs.includes('dipirona'), false, 'dipirona não deve ser rotulada como AINE');
  assert.deepEqual(getMedicationTherapeuticClassIds(bySlug.get('prednisolona')!), ['glicocorticoides']);
  assert.deepEqual(getMedicationTherapeuticClassIds(bySlug.get('pregabalina')!), ['neurologicos-anticonvulsivantes']);
  assert.deepEqual(getMedicationTherapeuticClassIds(bySlug.get('atropina')!), ['antiarritmicos', 'antidotos-toxicologia']);
});

test('todas as moléculas presentes no Plumb’s 10 têm referência de monografia e dose vinculada', () => {
  for (const [slug, audit] of Object.entries(PLUMBS_10_MONOGRAPH_AUDIT)) {
    const medication = bySlug.get(slug);
    assert.ok(medication, `${slug}: ausente`);
    const referenceId = `ref-plumbs-10-audit-${slug}`;
    assert.ok(medication.references?.some((reference) => reference.id === referenceId), `${slug}: referência do Plumb’s ausente`);
    assert.ok(
      medication.doses.some((dose) => audit.doseIds.includes(dose.id) && dose.referenceIds?.includes(referenceId)),
      `${slug}: nenhuma dose ligada à monografia`,
    );
  }
});

test('correções clínicas críticas permanecem protegidas contra regressão', () => {
  const nac = bySlug.get('n-acetilcisteina')!;
  assert.equal(nac.doses.find((dose) => dose.id === 'dose-nac-oxidative-iv-loading')?.doseMin, 140);
  assert.equal(nac.doses.find((dose) => dose.id === 'dose-nac-oxidative-po-loading')?.doseMin, 280);
  assert.equal(nac.doses.find((dose) => dose.id === 'dose-nac-oxidative-maintenance')?.doseMin, 70);

  const budesonideCat = bySlug.get('budesonida')!.doses.find((dose) => dose.id === 'dose-budesonida-cat-enteropathy');
  assert.deepEqual([budesonideCat?.doseMin, budesonideCat?.doseMax, budesonideCat?.frequency], [0.5, 0.75, 'q24h']);

  const amoxDog = bySlug.get('amoxicilina-clavulanato')!.doses.find((dose) => dose.id === 'dose-amox-clav-dog-geral');
  assert.deepEqual([amoxDog?.doseMin, amoxDog?.doseMax, amoxDog?.calculatorEnabled], [13.75, 13.75, false]);

  const bezafibrate = bySlug.get('benzafibrato')!;
  assert.deepEqual(bezafibrate.species, ['dog']);
  assert.deepEqual(
    [bezafibrate.doses[0].doseMin, bezafibrate.doses[0].doseMax],
    [4, 10],
  );
  assert.equal(bezafibrate.references?.some((reference) => reference.id === 'ref-plumb-fibrates'), false);
});
