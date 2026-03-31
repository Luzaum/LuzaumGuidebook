import { GENUTRI_REQUIREMENTS } from './genutriData'
import type { RequirementProfile, Species } from '../types'

export interface ClinicalProfileOption {
  id: string
  label: string
  description: string
  profileIds: string[]
  species: Species | 'both'
  tags: string[]
}

function sanitizeClinicalLabel(label: string | null | undefined): string {
  if (!label) return 'Perfil clinico'
  const sanitized = label
    .replace(/_/g, ' ')
    .replace(/\s*-\s*%MS/gi, '')
    .replace(/\s*MS%/gi, '')
    .replace(/\s*-\s*%Contribuição Energética/gi, '')
    .replace(/\s*-\s*%Contribuicao Energetica/gi, '')
    .replace(/\s*-\s*100 kcal/gi, '')
    .replace(/\s*%MS/gi, '')
    .replace(/\badult maintenance\b/gi, 'adulto em manutencao')
    .replace(/\bnormal activity\b/gi, 'atividade moderada')
    .replace(/\blow activity\b/gi, 'baixa atividade')
    .replace(/\bweight loss\b/gi, 'perda de peso')
    .replace(/\bgrowth\b/gi, 'crescimento')
    .replace(/\bgestation\b/gi, 'gestacao')
    .replace(/\blactation\b/gi, 'lactacao')
    .replace(/\s+/g, ' ')
    .trim()

  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

function isClinicalWorkbookProfile(profile: RequirementProfile) {
  return profile.source !== 'FEDIAF 2025'
}

function describeProfile(profile: RequirementProfile): string {
  if (profile.condition) return sanitizeClinicalLabel(profile.condition)
  if (profile.lifeStage) return sanitizeClinicalLabel(profile.lifeStage)
  return 'Ajusta a avaliacao nutricional com metas especificas da planilha clinica.'
}

export function getClinicalRequirementProfiles(species: Species): RequirementProfile[] {
  return GENUTRI_REQUIREMENTS.filter(
    (profile) =>
      isClinicalWorkbookProfile(profile) &&
      (profile.species === species || profile.species === 'both' || profile.species === 'unknown'),
  )
}

export function getClinicalProfileOptions(species: Species): ClinicalProfileOption[] {
  const grouped = new Map<string, ClinicalProfileOption>()

  for (const profile of getClinicalRequirementProfiles(species)) {
    const label = sanitizeClinicalLabel(profile.label)
    const key = `${species}:${label.toLowerCase()}`
    const speciesScope = profile.species === 'both' || profile.species === 'unknown' ? 'both' : profile.species

    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key.replace(/[^a-z0-9:-]+/gi, '-'),
        label,
        description: describeProfile(profile),
        profileIds: [profile.id],
        species: speciesScope,
        tags: [profile.basisType, profile.source ?? 'planilha'],
      })
      continue
    }

    const current = grouped.get(key)!
    if (!current.profileIds.includes(profile.id)) {
      current.profileIds.push(profile.id)
    }
    if (!current.tags.includes(profile.basisType)) {
      current.tags.push(profile.basisType)
    }
  }

  return Array.from(grouped.values()).sort((left, right) => left.label.localeCompare(right.label, 'pt-BR'))
}

export function getClinicalProfileOptionById(species: Species, optionId: string): ClinicalProfileOption | undefined {
  return getClinicalProfileOptions(species).find((option) => option.id === optionId)
}

export function getClinicalProfileIdsFromSelections(species: Species, selections: string[]): string[] {
  return selections.flatMap((selection) => getClinicalProfileOptionById(species, selection)?.profileIds ?? [])
}

export function getClinicalProfileBadges(species: Species, selections: string[]): string[] {
  return selections
    .map((selection) => getClinicalProfileOptionById(species, selection)?.label)
    .filter((label): label is string => Boolean(label))
}

export function getHumanRequirementLabel(profile?: RequirementProfile): string {
  if (!profile) return 'Perfil nutricional nao selecionado'

  if (profile.source === 'FEDIAF 2025') {
    if (profile.label.includes('adulto 110') || profile.label.includes('adulto 100')) {
      return 'Adulto Padrao'
    }
    if (profile.label.includes('adulto 95') || profile.label.includes('adulto 75')) {
      return 'Adulto Castrado / Baixa Ativ.'
    }
    if (profile.lifeStage === 'early_growth_reproduction' || profile.lifeStage === 'growth_reproduction') {
      return 'Crescimento e Reproducao'
    }
    if (profile.lifeStage === 'late_growth') {
      return 'Crescimento Tardio'
    }
    if (profile.condition === 'metabolic_reference') {
      return 'Metabolico Base'
    }
    if (profile.lifeStage && profile.condition) {
      return `${sanitizeClinicalLabel(profile.lifeStage)} ${sanitizeClinicalLabel(profile.condition)}`.trim()
    }
    return sanitizeClinicalLabel(profile.label)
  }

  return sanitizeClinicalLabel(profile.label)
}
