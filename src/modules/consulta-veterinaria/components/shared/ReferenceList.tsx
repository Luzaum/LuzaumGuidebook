import type { ReferenceItem } from '../../types/reference'

type ReferenceListProps = {
  references: ReferenceItem[]
}

export function ReferenceList({ references }: ReferenceListProps) {
  return (
    <ul className="space-y-3">
      {references.map((reference) => (
        <li key={reference.id} className="rounded-[20px] border border-slate-200/80 bg-white/70 p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200">
          <p>{reference.citationText}</p>
          {reference.notes ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{reference.notes}</p> : null}
          {reference.url ? (
            <a href={reference.url} className="mt-2 inline-flex text-xs font-semibold text-blue-800 hover:underline dark:text-blue-200">
              Abrir link
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

