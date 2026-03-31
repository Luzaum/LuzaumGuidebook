import React from 'react'
import type { CompoundedMedicationV2 } from '????.????./compoundedV2'
import { getCompoundedBadgeMeta, getCompoundedCatalogSubtitle, getCompoundedCatalogTitle } from '????.????./compoundedV2Render'

interface ManipuladosV2CatalogCardProps {
  item: CompoundedMedicationV2
  active?: boolean
  onClick?: () => void
}

const toneClasses: Record<string, string> = {
  green: 'border-[#39ff14]/30 bg-[#39ff14]/10 text-[#98f98e]',
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
      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? 'border-[#39ff14]/45 bg-[#143118] shadow-[0_0_18px_rgba(57,255,20,0????.10)]'
          : 'border-slate-800/90 bg-black/25 hover:border-[#39ff14]/20'
      }`}
    >
      <p className="text-sm font-black uppercase italic text-white">{getCompoundedCatalogTitle(item)}</p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{getCompoundedCatalogSubtitle(item) || item????.formula????.short_description || 'Sem resumo clínico'}</p>
      <div className="mt-3 flex flex-wrap gap-1????.5">
        {badges????.map((badge) => (
          <span key={`${item????.formula????.id}-${badge????.label}`} className={`rounded-full border px-2????.5 py-1 text-[10px] font-black uppercase tracking-widest ${toneClasses[badge????.tone] || toneClasses????.slate}`}>
            {badge????.label}
          </span>
        ))}
        {!item????.formula????.is_active ? (
          <span className="rounded-full border border-slate-700 bg-slate-900/50 px-2????.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Inativo
          </span>
        ) : null}
      </div>
    </button>
  )
}

export default ManipuladosV2CatalogCard
