import { useEffect, useRef } from 'react'
import { ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react'
import { REFERENCE_GROUPS, getSourceEntry } from '../data-v2/references'
import { listVersionedSources } from '../data-v2/sourceRegistry'
import type { ReferenceDomain, SourceEntryV2 } from '../model/institutional'
import type { VersionedInstitutionalSource } from '../model/versionedSource'
import type { AbvInstitutionalFocus, AbvTab } from '../types'

interface ReferencesPageProps {
  setPage: (tab: AbvTab) => void
  institutionalFocus: AbvInstitutionalFocus | null
  onConsumedInstitutionalFocus: () => void
}

const DOMAIN_LABELS: Record<ReferenceDomain, string> = {
  clinical_v2: 'Literatura clínica',
  molecules_v2: 'Farmacologia dos antimicrobianos',
  microbiology_v2: 'Microbiologia clínica',
  hospital_institutional_pending: 'Controle de infecção hospitalar',
  institutional_versioned: 'Diretriz institucional',
}

const SOURCE_COPY: Record<string, { title: string; description: string }> = {
  'ref_registry.institutional_ccih_2024': {
    title: 'Guia de controle de infecção hospitalar — 2024',
    description:
      'Diretriz institucional para prevenção de infecções e uso racional de antimicrobianos.',
  },
  'ref_registry.clinical_syndromes_v2': {
    title: 'Síndromes infecciosas e terapia antimicrobiana',
    description:
      'Raciocínio por foco infeccioso, gravidade, coleta de cultura e desescalonamento.',
  },
  'ref_registry.molecules_v2_sheets': {
    title: 'Monografias de antimicrobianos',
    description:
      'Espectro, farmacocinética, farmacodinâmica, doses, cautelas e monitorização.',
  },
  'ref_registry.microbiology_v2_general': {
    title: 'Microbiologia clínica e resistência',
    description:
      'Princípios para interpretar agentes prováveis, resistência e resposta ao tratamento.',
  },
  'ref_registry.microbiology_v2_resistance': {
    title: 'Mecanismos de resistência bacteriana',
    description:
      'Bases microbiológicas para reconhecer resistência e orientar a escolha do antimicrobiano.',
  },
  'ref_registry.microbiology_v2_sampling': {
    title: 'Coleta e interpretação de culturas',
    description:
      'Boas práticas de amostragem, transporte, cultura, antibiograma e interpretação clínica.',
  },
  'ref_registry.hospital_culture_timing': {
    title: 'Momento da cultura e início do antimicrobiano',
    description:
      'Como conciliar coleta adequada, gravidade clínica e início oportuno da terapia.',
  },
  'ref_registry.hospital_stewardship_core': {
    title: 'Uso racional de antimicrobianos',
    description:
      'Seleção, reavaliação, desescalonamento e duração do tratamento com foco em segurança.',
  },
  'ref_registry.hospital_institutional_pending': {
    title: 'Prevenção e controle de infecção hospitalar',
    description:
      'Medidas institucionais de vigilância, isolamento, higiene e prevenção de transmissão.',
  },
  'ref_registry.textbook_nelson_couto_siim_6': {
    title: 'Nelson & Couto — Medicina Interna de Pequenos Animais, 6ª edição',
    description:
      'Referência de medicina interna para raciocínio clínico, diagnóstico e tratamento.',
  },
  'ref_registry.textbook_cunningham_physiology_6': {
    title: 'Cunningham — Tratado de Fisiologia Veterinária, 6ª edição',
    description:
      'Referência para fundamentos fisiológicos e mecanismos relacionados às doenças.',
  },
  'ref_registry.textbook_neuro_practical_3': {
    title: 'Neurologia de Cães e Gatos — Abordagem Prática, 3ª edição',
    description:
      'Referência de neurologia clínica para localização, investigação e conduta.',
  },
}

function sourceAnchorId(sourceKey: string): string {
  return `source-${sourceKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`
}

function SourceCard({ entry }: { entry: SourceEntryV2 }) {
  const copy = SOURCE_COPY[entry.key] ?? {
    title: entry.title,
    description: 'Referência utilizada para fundamentação clínica.',
  }

  return (
    <article
      id={sourceAnchorId(entry.key)}
      className="scroll-mt-24 border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-800">
          <BookOpen className="h-3.5 w-3.5" />
          Fonte clínica
        </span>
        <span className="bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
          {DOMAIN_LABELS[entry.domain]}
        </span>
      </div>

      <h3 className="text-lg font-black text-slate-900">{copy.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.description}</p>
    </article>
  )
}

function VersionedSourceCard({ source }: { source: VersionedInstitutionalSource }) {
  return (
    <article
      id={sourceAnchorId(source.sourceId)}
      className="scroll-mt-24 border border-emerald-200 bg-emerald-50/50 p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 bg-emerald-700 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-white">
          <ShieldCheck className="h-3.5 w-3.5" />
          Diretriz institucional
        </span>
        <span className="bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-900">
          {source.versionLabel}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-black text-slate-950">{source.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
        Referência para prevenção e controle de infecções, vigilância epidemiológica e uso
        responsável de antimicrobianos.
      </p>
      {source.publicationDate ? (
        <p className="mt-3 text-xs font-bold text-slate-500">
          Publicação: {source.publicationDate}
        </p>
      ) : null}
    </article>
  )
}

export function ReferencesPage({
  setPage,
  institutionalFocus,
  onConsumedInstitutionalFocus,
}: ReferencesPageProps) {
  const versionedSources = listVersionedSources()
  const consumedFocusRef = useRef<string | null>(null)

  useEffect(() => {
    if (!institutionalFocus || institutionalFocus.kind !== 'reference') return
    if (consumedFocusRef.current === institutionalFocus.key) return

    consumedFocusRef.current = institutionalFocus.key
    const timer = window.setTimeout(() => {
      document
        .getElementById(sourceAnchorId(institutionalFocus.key))
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      onConsumedInstitutionalFocus()
    }, 120)

    return () => window.clearTimeout(timer)
  }, [institutionalFocus, onConsumedInstitutionalFocus])

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => setPage('home')}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
          Referências clínicas
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
          Fontes e diretrizes
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Literatura utilizada para fundamentar a escolha do antimicrobiano, a coleta de
          culturas, a interpretação microbiológica e as medidas de controle de infecção.
        </p>
      </header>

      {versionedSources.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-black text-slate-900">Diretriz institucional</h2>
          <div className="grid gap-4">
            {versionedSources.map((source) => (
              <VersionedSourceCard key={source.sourceId} source={source} />
            ))}
          </div>
        </section>
      ) : null}

      {REFERENCE_GROUPS.filter((group) => group.domain !== 'institutional_versioned').map(
        (group) => {
          const entries = group.sourceKeys
            .map((sourceKey) => getSourceEntry(sourceKey))
            .filter((entry): entry is SourceEntryV2 => Boolean(entry))
            .filter((entry) => entry.key !== 'ref_registry.pathophysiology_excluded_pathologic_basis')

          if (entries.length === 0) return null

          return (
            <section key={group.domain} className="mt-10">
              <h2 className="mb-4 text-xl font-black text-slate-900">
                {DOMAIN_LABELS[group.domain]}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {entries.map((entry) => (
                  <SourceCard key={entry.key} entry={entry} />
                ))}
              </div>
            </section>
          )
        },
      )}
    </main>
  )
}

export default ReferencesPage
