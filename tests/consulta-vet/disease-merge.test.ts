import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { DiseaseRecord } from '../../modules/consulta-vet/types/disease';
import { mergeDiseaseRecordsBySlug } from '../../modules/consulta-vet/utils/mergeDiseaseRecords';

function buildDisease(slug: string, quickSummary: string): DiseaseRecord {
  return {
    id: `disease-${slug}`,
    slug,
    title: slug,
    synonyms: [],
    species: ['dog'],
    category: 'respiratorio',
    tags: [],
    quickSummary,
    quickDecisionStrip: [],
    etiology: '',
    epidemiology: '',
    pathogenesisTransmission: '',
    pathophysiology: '',
    clinicalSignsPathophysiology: '',
    diagnosis: '',
    treatment: '',
    prevention: '',
    relatedConsensusSlugs: [],
    relatedMedicationSlugs: [],
  };
}

describe('mergeDiseaseRecordsBySlug', () => {
  it('prefere conteúdo editorial do seed quando o slug existe no Supabase', () => {
    const seed = [
      buildDisease('asma-felina', 'Resumo atualizado no seed'),
    ];
    const remote = [
      {
        ...buildDisease('asma-felina', 'Resumo antigo no Supabase'),
        source: 'supabase' as const,
        relatedMedicationSlugs: ['fluticasona'],
      },
    ];

    const merged = mergeDiseaseRecordsBySlug(seed, remote);
    const record = merged.find((item) => item.slug === 'asma-felina');

    assert.ok(record);
    assert.equal(record.quickSummary, 'Resumo atualizado no seed');
    assert.equal(record.source, 'seed');
    assert.deepEqual(record.relatedMedicationSlugs, ['fluticasona']);
  });

  it('mantém doenças exclusivas de cada origem', () => {
    const seed = [buildDisease('only-seed', 'seed-only')];
    const remote = [buildDisease('only-remote', 'remote-only')];

    const merged = mergeDiseaseRecordsBySlug(seed, remote);

    assert.equal(merged.length, 2);
    assert.ok(merged.some((item) => item.slug === 'only-seed' && item.source === 'seed'));
    assert.ok(merged.some((item) => item.slug === 'only-remote' && item.source === 'supabase'));
  });
});
