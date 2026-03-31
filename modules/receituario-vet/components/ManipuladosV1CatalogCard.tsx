import React from 'react'
import type { ManipuladoV1Formula } from '../manipuladosV1'
import { getManipuladoV1CatalogSubtitle } from '../manipuladosV1Render'

export function ManipuladosV1CatalogCard({
  item,
  active,
  onClick,
}: {
  item: ManipuladoV1Formula
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'border-[#39ff14]/50 bg-[#143118]' : 'border-slate-800 bg-black/25 hover:border-slate-700'}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-black text-white">{item.identity.name || 'Manipulado sem nome'}</p>
        <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#98f98e]">Manipulado</span>
        {item.identity.sale_classification === 'controlled' ? (
          <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-300">Controlado</span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-400">{getManipuladoV1CatalogSubtitle(item)}</p>
    </button>
  )
}

export default ManipuladosV1CatalogCard
