import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  COMORBIDITY_OPTIONS,
  getComorbidityLabel,
  getSelectableComorbidities,
} from '../../modules/energia-vet/lib/canonical/comorbidityCatalog'
import { resolveProfileIdsFromComorbidities } from '../../modules/energia-vet/lib/canonical/comorbidityMapping'
import { resolveTherapeuticProfilesV3 } from '../../modules/energia-vet/lib/canonical/therapeuticProfilesV3'
import { mapStoreToCanonicalInput, resolveTherapeuticConflicts } from '../../modules/energia-vet/lib/canonical'

describe('Catálogo de comorbidades', () => {
  it('filtra opções por espécie', () => {
    const dogOptions = getSelectableComorbidities('dog')
    const catOptions = getSelectableComorbidities('cat')
    assert.ok(dogOptions.some((option) => option.id === 'hepatopatia_cobre_cao'))
    assert.ok(!catOptions.some((option) => option.id === 'hepatopatia_cobre_cao'))
    assert.ok(catOptions.some((option) => option.id === 'diabetes_sglt2'))
  })

  it('cada comorbidade aponta para perfis terapêuticos válidos', () => {
    for (const option of COMORBIDITY_OPTIONS) {
      for (const profileId of option.therapeuticProfileIds) {
        const resolved = resolveProfileIdsFromComorbidities('dog', [option.id])
        const resolvedCat = resolveProfileIdsFromComorbidities('cat', [option.id])
        if (option.species.includes('dog')) {
          assert.ok(
            resolved.length > 0 || option.therapeuticProfileIds.every((id) => id.includes('cat')),
            `Comorbidade ${option.id} não resolve perfil para cão`,
          )
        }
        if (option.species.includes('cat')) {
          assert.ok(resolvedCat.length > 0, `Comorbidade ${option.id} não resolve perfil para gato`)
        }
        assert.ok(profileId.length > 0)
      }
    }
  })

  it('rótulos legíveis para badges', () => {
    assert.equal(getComorbidityLabel('diabetes_mellitus'), 'Diabetes mellitus')
  })

  it('seleção renal ativa perfil terapêutico', () => {
    const input = mapStoreToCanonicalInput({
      patient: { species: 'dog', comorbidityIds: ['insuficiencia_renal_estagio_2'] },
    })
    const profiles = resolveTherapeuticProfilesV3(input)
    assert.ok(profiles.some((profile) => profile.id === 'ckd_dog_iris_2'))
  })

  it('conflito estruvita vs oxalato é sinalizado', () => {
    const input = mapStoreToCanonicalInput({
      patient: {
        species: 'dog',
        comorbidityIds: ['urolitiase_estruvita_dissolucao', 'urolitiase_oxalato'],
      },
    })
    const resolution = resolveTherapeuticConflicts(input)
    assert.ok(resolution.unresolvedConflicts.length > 0)
  })
})
