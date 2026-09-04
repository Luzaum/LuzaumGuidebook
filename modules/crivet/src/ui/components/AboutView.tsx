import React from 'react';
import { Info, BookOpen, ShieldAlert, ActivitySquare } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { ACERVO_BOOKS, ACERVO_PATH } from '../../lib/acervo';

export const AboutView: React.FC = () => (
  <div className="mx-auto w-full max-w-4xl space-y-6">
    <PageHeader
      icon={Info}
      title="Referências e segurança"
      description="Escopo clínico, acervo bibliográfico e limites de uso"
    />

    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
          <ActivitySquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Escopo clínico</h2>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Infusões contínuas e preparo hospitalar</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Cálculos de CRI, diluições e prescrições práticas para uso veterinário. Doses e protocolos foram
        alinhados ao acervo local, com prioridade para{' '}
        <strong>Lumb &amp; Jones</strong> (anestesia), <strong>Plumb&apos;s 10ª ed.</strong> (fármacos) e{' '}
        <strong>Ettinger 9ª ed.</strong> (medicina interna, linha Nelson &amp; Couto).
      </p>
    </div>

    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-500/30 dark:bg-rose-500/10">
      <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-rose-800 dark:text-rose-300">
        <ShieldAlert className="h-5 w-5" /> Aviso legal
      </h3>
      <p className="text-sm leading-relaxed text-rose-900/90 dark:text-rose-100/90">
        Ferramenta auxiliar — não substitui julgamento clínico. Conferir doses, compatibilidades e
        prescrição final antes de administrar.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
        <BookOpen className="h-5 w-5 text-emerald-600" /> Acervo bibliográfico
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        PDFs consultados em: <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">{ACERVO_PATH}</code>
      </p>
      <div className="space-y-3">
        {ACERVO_BOOKS.sort((a, b) => a.priority - b.priority).map((book) => (
          <div
            key={book.id}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="font-semibold text-slate-900 dark:text-white">
                {book.priority === 1 && '★ '}
                {book.shortLabel}
              </p>
              <span className="text-xs text-slate-500">{book.edition}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{book.title}</p>
            {book.note && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{book.note}</p>
            )}
            <p className="mt-2 font-mono text-[11px] text-slate-400">{book.filename}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Nelson &amp; Couto não está no acervo local; Ettinger 9ª ed. é utilizado como referência equivalente
        de medicina interna.
      </p>
    </div>
  </div>
);
