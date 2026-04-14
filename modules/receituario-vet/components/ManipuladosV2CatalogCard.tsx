import React from 'react'
import type { CompoundedMedicationV2 } from '../compoundedV2'
import { getCompoundedBadgeMeta, getCompoundedCatalogSubtitle, getCompoundedCatalogTitle } from '../compoundedV2Render'

interface ManipuladosV2CatalogCardProps {
  item: CompoundedMedicationV2
  active?: boolean
  onClick?: () => void
}

const TONE_CLASS: Record<string, string> = {
  green: 'border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] text-[color:color-mix(in_srgb,var(--rxv-primary)_72%,#e2e8f0)]',
  red: 'border-red-500/30 bg-red-500/10 text-red-300',
  blue: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
  slate: 'border-slate-700 bg-slate-900/40 text-slate-300',
}

export function ManipuladosV2CatalogCard({ item, active = false, onClick }: ManipuladosV2CatalogCardProps) {
  const badges = getCompoundedBadgeMeta(item)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[22px] border px-4 py-3.5 text-left transition ${
        active
          ? 'border-[color:color-mix(in_srgb,var(--rxv-primary)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,var(--rxv-surface))] shadow-[0_0_18px_rgba(59, 130, 246,0.10)]'
          : 'border-slate-800/90 bg-black/25 hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_20%,transparent)] hover:bg-black/35'
      }`}
    >
      <p className="text-[13px] font-black uppercase italic leading-5 text-white">{getCompoundedCatalogTitle(item)}</p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{getCompoundedCatalogSubtitle(item) || item.formula.short_description || 'Sem resumo clínico.'}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <span
            key={`${item.formula.id}-${badge.label}`}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${TONE_CLASS[badge.tone] || TONE_CLASS.slate}`}
          >
            {badge.label}
          </span>
        ))}
        {!item.formula.is_active ? (
          <span className="rounded-full border border-slate-700 bg-slate-900/50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Inativo
          </span>
        ) : null}
      </div>
    </button>
  )
}

export default ManipuladosV2CatalogCard
