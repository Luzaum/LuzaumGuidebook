/**
 * AdministrationBasisEditor
 * Shared component for Catalogo, Manipulados and Protocolos.
 */
import React from 'react'
import { RxvField, RxvInput, RxvSelect, RxvToggle } from '../../../src/components/receituario/RxvComponents'
import {
  ADMINISTRATION_BASIS_OPTIONS,
  ADMINISTRATION_TARGET_OPTIONS,
  ADMINISTRATION_UNIT_OPTIONS,
  AdministrationBasis,
  AdministrationBasisAny,
  buildSharedAdministrationText,
  isApplicationSiteBasis,
  isCustomAdministrationBasis,
  normalizeAdministrationBasis,
} from '../vetPosologyShared'

interface AdministrationBasisEditorProps {
  administrationBasis?: AdministrationBasisAny
  administrationAmount?: number | string | null
  administrationUnit?: string | null
  administrationTarget?: string | null
  onBasisChange: (value: AdministrationBasis) => void
  onAmountChange: (value: string) => void
  onUnitChange: (value: string) => void
  onTargetChange: (value: string) => void
  className?: string
}

export function AdministrationBasisEditor({
  administrationBasis,
  administrationAmount,
  administrationUnit,
  administrationTarget,
  onBasisChange,
  onAmountChange,
  onUnitChange,
  onTargetChange,
  className = '',
}: AdministrationBasisEditorProps) {
  const normalizedBasis = normalizeAdministrationBasis(administrationBasis)
  const isCustomBasis = isCustomAdministrationBasis(administrationBasis)
  const isSite = isApplicationSiteBasis(administrationBasis)

  const previewText = isCustomBasis
    ? buildSharedAdministrationText({
      administrationBasis: normalizedBasis,
      administrationAmount,
      administrationUnit,
      administrationTarget,
    })
    : ''

  return (
    <div className={className}>
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <RxvToggle
          checked={isCustomBasis}
          onChange={(checked) => onBasisChange(checked ? 'per_animal' : 'weight_based')}
          label="Administracao por unidade / sitio"
        />
        {isCustomBasis && previewText ? (
          <span className="rounded-full border border-[color:var(--rxv-primary)]/30 bg-[color:var(--rxv-primary)]/8 px-3 py-0.5 text-[11px] font-semibold text-[color:var(--rxv-primary)]">
            {previewText}
          </span>
        ) : null}
      </div>

      {isCustomBasis ? (
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <RxvField label="Modo de administracao">
            <RxvSelect
              value={normalizedBasis || 'per_animal'}
              onChange={(e) => onBasisChange(normalizeAdministrationBasis(e.target.value))}
              options={ADMINISTRATION_BASIS_OPTIONS.filter((o) => o.value !== 'weight_based') as unknown as { value: string; label: string }[]}
            />
          </RxvField>

          <RxvField label="Quantidade">
            <RxvInput
              type="number"
              min="0.5"
              step="0.5"
              value={administrationAmount ?? ''}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="Ex: 1"
            />
          </RxvField>

          <RxvField label="Unidade de administracao">
            <RxvSelect
              value={administrationUnit || ''}
              onChange={(e) => onUnitChange(e.target.value)}
              options={[
                { value: '', label: 'Selecionar unidade' },
                ...(ADMINISTRATION_UNIT_OPTIONS as unknown as { value: string; label: string }[]),
              ]}
            />
          </RxvField>

          <RxvField label={isSite ? 'Local de aplicacao' : 'Alvo'}>
            <RxvSelect
              value={administrationTarget || (isSite ? 'sobre a lesao' : 'por animal')}
              onChange={(e) => onTargetChange(e.target.value)}
              options={
                isSite
                  ? ADMINISTRATION_TARGET_OPTIONS.filter((o) => o.value !== 'por animal') as unknown as { value: string; label: string }[]
                  : [{ value: 'por animal', label: 'por animal' }]
              }
            />
          </RxvField>
        </div>
      ) : null}
    </div>
  )
}

export default AdministrationBasisEditor
