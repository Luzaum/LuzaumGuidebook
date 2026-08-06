import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, ExternalLink, FileText, Pill, Share2, ShoppingBag, Stethoscope } from 'lucide-react';
import { ConsultaVetSurface } from '../components/layout/ConsultaVetSurface';
import { DoseCalculatorCard } from '../components/medication/DoseCalculatorCard';
import { MedicationQuickSummaryPanel } from '../components/medication/MedicationQuickSummaryPanel';
import { MedicationSectionFrame } from '../components/medication/MedicationSectionFrame';
import { MedicationStructuredBlocks } from '../components/medication/MedicationStructuredBlocks';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { ReferencesList } from '../components/shared/ReferencesList';
import { SectionAnchorNav, type SectionAnchorEntry } from '../components/shared/SectionAnchorNav';
import { TagPills } from '../components/shared/TagPills';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationPresentation, MedicationRecord, MedicationSupplyChannel } from '../types/medication';
import type { EditorialReference } from '../types/common';
import { formatSpeciesList } from '../utils/navigation';
import { cn } from '../../../lib/utils';
import { buildDoseSummaryLabel, formatDoseSpeciesLabel } from '../utils/medicationRules';
import { medicationPharmacologyBlockIcons } from '../utils/editorialSubsectionIcons';
import { getMedicationSectionVisual } from '../utils/medicationSectionVisual';
import { sanitizeHTML } from '../../../utils/sanitize';
import { commercialOticProductsSeed } from '../data/commercialOticProducts.seed';
import { commercialProductImageAssets } from '../data/commercialProductImageAssets';
import type { CommercialMedicationProduct } from '../types/commercialMedication';
import { getCommercialProductsForMedication } from '../utils/commercialMedicationLinks';

type ResumeLocationState = {
  sectionId?: string;
};

const UI_TEXT = {
  home: 'Início',
  medications: 'Medicamentos',
  backToMedications: 'Voltar para Medicamentos',
  copyLink: 'Copiar link',
  loadErrorTitle: 'Erro ao abrir medicamento',
  loadErrorFallback: 'Falha ao carregar medicamento.',
  notFoundTitle: 'Medicamento não encontrado',
  notFoundBody: 'Não foi possível localizar o conteúdo solicitado.',
  doseCalculator: 'Calculadora de dose',
  quickSummary: 'Resumo rápido',
  doseCalculatorLead: 'Peso, espécie, regime e apresentação em um cálculo só.',
  regimens: 'Doses por espécie e regime',
  regimensLead:
    'Compare indicação, dose, via, intervalo, duração e evidência em uma única leitura.',
  pharmacology: 'Informações farmacológicas',
  pharmacologyLead: 'Leitura clínica organizada por uso, alertas críticos, monitoramento e interações.',
  clinicalNotes: 'Observações clínicas',
  clinicalNotesLead: 'Texto corrido para leitura prática, com boa largura de linha.',
  references: 'Referências',
  related: 'Relacionados',
  activeIngredient: 'Princípio ativo',
  pharmacologicClass: 'Classe farmacológica',
  tradeNames: 'Nomes comerciais',
  presentations: 'Apresentações',
  officialSite: 'Site oficial',
  leaflet: 'Bula',
  productImageAlt: 'Imagem comercial do medicamento',
  priceReference: 'Preço online de referência',
  priceCheckedAt: 'Checado em',
  priceSource: 'Ver fonte',
  mechanismOfAction: 'Como esse fármaco funciona',
  indications: 'Quando usar',
  contraindications: 'Quando evitar',
  cautions: 'Cautelas importantes',
  adverseEffects: 'Efeitos adversos relevantes',
  interactions: 'Interações que mudam conduta',
  routes: 'Vias',
  relatedContent: 'Conteúdo relacionado',
  relatedLead: 'Materiais associados como apoio à consulta, sem competir com o conteúdo principal.',
  relatedDiseases: 'Doenças relacionadas',
  relatedConsensos: 'Consensos relacionados',
  organizationFallback: 'Organização não informada',
  noTradeName: 'Sem nome comercial de referência',
  presentationInfo: 'Cada apresentação continua disponível para cálculo e comparação, mas em um layout mais limpo.',
} as const;

function formatSupplyChannel(channel?: MedicationSupplyChannel): string {
  if (channel === 'human_pharmacy') return 'Farmácia humana';
  if (channel === 'compounded') return 'Manipulado';
  return 'Medicina veterinária';
}

function formatPresentationConcentration(presentation: MedicationPresentation): string {
  if (presentation.concentrationOptions?.length) {
    return presentation.concentrationOptions
      .map((option) => `${option.label} (${option.concentrationValue} ${option.concentrationUnit})`)
      .join(', ');
  }
  if (presentation.concentrationValue) {
    return `${presentation.concentrationValue} ${presentation.concentrationUnit}`;
  }
  return '—';
}

function MetaStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-l border-border/70 pl-4 first:border-l-0 first:pl-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <div className="mt-2 text-sm leading-6 text-foreground">{value}</div>
    </div>
  );
}

function ProductResourceLink({ href, label }: { href?: string | null; label: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <ExternalLink className="h-4 w-4" />
      {label}
    </a>
  );
}

function formatCheckedAt(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(parsed);
}

function PriceReferenceCard({ medication }: { medication: MedicationRecord }) {
  const price = medication.priceReference;
  if (!price) return null;

  return (
    <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-2xl bg-emerald-500/12 p-2 text-emerald-700 dark:text-emerald-300">
          <ShoppingBag className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700/80 dark:text-emerald-300/80">
            {UI_TEXT.priceReference}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{price.label}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{price.presentation}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{price.sourceName}</span>
            <span aria-hidden>•</span>
            <span>
              {UI_TEXT.priceCheckedAt} {formatCheckedAt(price.checkedAt)}
            </span>
          </div>
          {price.notes ? <p className="mt-3 text-xs leading-5 text-muted-foreground">{price.notes}</p> : null}
          <a
            href={price.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-300"
          >
            <ExternalLink className="h-4 w-4" />
            {UI_TEXT.priceSource}
          </a>
        </div>
      </div>
    </div>
  );
}

function BulletList({
  items,
  bulletDotClass,
  className = '',
}: {
  items: string[];
  bulletDotClass: string;
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <ul className={`space-y-3.5 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
          <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${bulletDotClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PharmacologyBlock({
  title,
  items,
  bulletDotClass,
  className = '',
  tone = 'neutral',
  icon: Icon,
}: {
  title: string;
  items: string[];
  bulletDotClass: string;
  className?: string;
  tone?: 'neutral' | 'critical' | 'caution' | 'info' | 'success';
  /** Ícone minimalista alinhado ao tema do bloco */
  icon?: LucideIcon;
}) {
  if (!items.length) return null;

  return (
    <article className={`border-l-4 px-5 py-4 ${tone === 'critical' ? 'border-rose-500 bg-rose-500/[0.07]' : tone === 'caution' ? 'border-amber-400 bg-amber-400/[0.08]' : tone === 'info' ? 'border-sky-500 bg-sky-500/[0.06]' : tone === 'success' ? 'border-emerald-500 bg-emerald-500/[0.06]' : 'border-border bg-muted/[0.10]'} ${className}`.trim()}>
      <h3 className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] ${tone === 'critical' ? 'text-rose-700 dark:text-rose-300' : tone === 'caution' ? 'text-amber-800 dark:text-amber-300' : tone === 'info' ? 'text-sky-800 dark:text-sky-300' : tone === 'success' ? 'text-emerald-800 dark:text-emerald-300' : 'text-muted-foreground'}`}>
        {Icon ? <Icon className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden /> : null}
        <span>{title}</span>
      </h3>
      <div className="mt-4">
        <BulletList items={items} bulletDotClass={bulletDotClass} />
      </div>
    </article>
  );
}

function DoseReferenceLinks({ doseReferenceIds, references }: { doseReferenceIds?: string[]; references?: EditorialReference[] }) {
  if (!references?.length) return <span className="text-muted-foreground">Sem fonte cadastrada</span>;
  const indexes = doseReferenceIds?.length
    ? references.map((reference, index) => (reference.id && doseReferenceIds.includes(reference.id) ? index : -1)).filter((index) => index >= 0)
    : references
        .map((reference, index) => ({ index, linked: Boolean(reference.url) }))
        .sort((a, b) => Number(b.linked) - Number(a.linked))
        .map((item) => item.index);
  const visible = indexes.slice(0, 3);
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" aria-label="Referências deste regime">
      {visible.map((index) => (
        <a
          key={index}
          href={`#${references[index].id || `reference-${index + 1}`}`}
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06] px-2 text-xs font-bold text-primary hover:bg-primary/[0.12]"
          title={references[index].citationText}
        >
          {index + 1}
        </a>
      ))}
      {indexes.length > visible.length ? <span className="text-xs text-muted-foreground">+{indexes.length - visible.length}</span> : null}
    </span>
  );
}

function DoseRegimenSection({ medication, relatedDiseases }: { medication: MedicationRecord; relatedDiseases: DiseaseRecord[] }) {
  const grouped = useMemo(() => {
    const groups = new Map<string, MedicationRecord['doses']>();
    medication.doses.forEach((dose) => {
      const label = formatDoseSpeciesLabel(dose.species);
      const current = groups.get(label) || [];
      current.push(dose);
      groups.set(label, current);
    });
    return Array.from(groups.entries());
  }, [medication.doses]);

  const [activeSpecies, setActiveSpecies] = useState(grouped[0]?.[0] || '');

  useEffect(() => {
    if (!grouped.length) return;
    if (grouped.some(([label]) => label === activeSpecies)) return;
    setActiveSpecies(grouped[0][0]);
  }, [activeSpecies, grouped]);

  const activeDoses = grouped.find(([label]) => label === activeSpecies)?.[1] || grouped[0]?.[1] || [];

  if (!medication.doses.length) return null;

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2.5">
          {grouped.map(([speciesLabel]) => (
            <button
              key={speciesLabel}
              type="button"
              onClick={() => setActiveSpecies(speciesLabel)}
              className={
                activeSpecies === speciesLabel
                  ? 'rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-2 text-sm font-semibold text-primary'
                  : 'rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {speciesLabel}
            </button>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-[26px] border border-border/80 bg-background/72 lg:block">
          <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
            <thead className="bg-muted/[0.16] text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th scope="col" className="w-[27%] px-4 py-4">Indicação e quadro</th>
                <th scope="col" className="w-[14%] px-4 py-4">Dose</th>
                <th scope="col" className="w-[16%] px-4 py-4">Via e intervalo</th>
                <th scope="col" className="w-[28%] px-4 py-4">Duração e monitoramento</th>
                <th scope="col" className="w-[15%] px-4 py-4">Fontes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {activeDoses.map((dose) => {
                const linkedDiseases = relatedDiseases.filter((disease) => dose.diseaseSlugs?.includes(disease.slug));
                return (
                  <tr key={dose.id} className="align-top transition-colors hover:bg-muted/[0.08]">
                    <td className="break-words px-4 py-5">
                      <p className="font-semibold leading-6 text-foreground">{dose.indication}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{dose.clinicalContext || activeSpecies}</p>
                      {linkedDiseases.length ? <div className="mt-3 flex flex-wrap gap-1.5">{linkedDiseases.map((disease) => <Link key={disease.slug} to={`/consulta-vet/doencas/${disease.slug}`} className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-primary hover:border-primary/30">{disease.title}</Link>)}</div> : null}
                    </td>
                    <td className="break-words px-4 py-5 text-sm leading-6 text-foreground">
                      <strong>{buildDoseSummaryLabel(dose).split(' • ').slice(2, 3).join('')}</strong>
                      {dose.maximumDose ? <p className="mt-2 text-xs text-muted-foreground">Máximo: {dose.maximumDose}</p> : null}
                    </td>
                    <td className="break-words px-4 py-5 text-sm leading-6 text-foreground">{dose.route}<br /><span className="text-muted-foreground">{dose.frequency}</span></td>
                    <td className="break-words px-4 py-5 text-sm leading-6 text-foreground">
                      {dose.duration || 'Individualizar conforme resposta.'}
                      {dose.notes ? <p className="mt-3 border-t border-border/70 pt-3 text-sm leading-6 text-foreground/85"><span className="font-bold text-primary">Base clínica:</span> {dose.notes}</p> : null}
                      {dose.monitoring ? <p className="mt-3 rounded-lg bg-amber-400/[0.10] px-3 py-2 text-sm leading-6 text-amber-900 dark:text-amber-200"><span className="font-bold">Monitoramento:</span> {dose.monitoring}</p> : null}
                    </td>
                    <td className="break-words px-4 py-5"><DoseReferenceLinks doseReferenceIds={dose.referenceIds} references={medication.references} />{dose.evidenceLevel ? <p className="mt-2 text-xs text-muted-foreground">{dose.evidenceLevel}</p> : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {activeDoses.map((dose) => (
            <article key={dose.id} className="rounded-[24px] border border-border/80 bg-background/75 p-5">
              <p className="text-base font-semibold leading-7 text-foreground">{dose.indication}</p>
              <p className="mt-1 text-sm text-muted-foreground">{dose.clinicalContext || activeSpecies}</p>
              <dl className="mt-5 grid gap-3 text-sm">
                <div><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dose</dt><dd className="mt-1 font-semibold text-foreground">{buildDoseSummaryLabel(dose).split(' • ').slice(2, 3).join('')}</dd></div>
                <div className="grid grid-cols-2 gap-4"><div><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Via</dt><dd className="mt-1">{dose.route}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Intervalo</dt><dd className="mt-1">{dose.frequency}</dd></div></div>
                <div><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duração</dt><dd className="mt-1 leading-6">{dose.duration || 'Individualizar conforme resposta.'}</dd></div>
              </dl>
              {dose.notes ? <p className="mt-4 border-t border-border/70 pt-4 text-sm leading-6 text-foreground/85"><span className="font-bold text-primary">Base clínica:</span> {dose.notes}</p> : null}
              {dose.monitoring ? <p className="mt-3 rounded-lg bg-amber-400/[0.10] px-3 py-2 text-sm leading-6 text-amber-900 dark:text-amber-200"><span className="font-bold">Monitoramento:</span> {dose.monitoring}</p> : null}
              <div className="mt-4"><DoseReferenceLinks doseReferenceIds={dose.referenceIds} references={medication.references} /></div>
            </article>
          ))}
        </div>
      </div>
  );
}

function MobilePresentationCard({ presentation }: { presentation: MedicationPresentation }) {
  return (
    <article className="rounded-[24px] border border-border/80 bg-background/75 p-5">
      <p className="text-base font-semibold text-foreground">{presentation.label}</p>
      <dl className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
        <div className="flex items-start justify-between gap-4">
          <dt className="font-medium text-foreground">Canal</dt>
          <dd className="text-right">{formatSupplyChannel(presentation.channel)}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="font-medium text-foreground">Forma</dt>
          <dd className="text-right">{presentation.form}</dd>
        </div>
        {presentation.route ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Via</dt>
            <dd className="text-right">{presentation.route}</dd>
          </div>
        ) : null}
        {formatPresentationConcentration(presentation) !== '—' ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Concentração</dt>
            <dd className="text-right">{formatPresentationConcentration(presentation)}</dd>
          </div>
        ) : null}
        {presentation.packInfo ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Apresentação</dt>
            <dd className="text-right">{presentation.packInfo}</dd>
          </div>
        ) : null}
        {presentation.scoringInfo ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-foreground">Fracionamento</dt>
            <dd className="text-right">{presentation.scoringInfo}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

function PresentationsSection({ medication }: { medication: MedicationRecord }) {
  if (!medication.presentations.length) return null;

  return (
    <>
      <p className="mb-6 max-w-[96ch] text-sm leading-7 text-muted-foreground">{UI_TEXT.presentationInfo}</p>
      <div className="hidden overflow-hidden rounded-[24px] border border-border/80 xl:block">
        <div className="grid grid-cols-[1.8fr_1.25fr_1fr_0.75fr_1.1fr_1fr_1fr] gap-4 border-b border-border/80 bg-muted/18 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span>Nome</span>
          <span>Canal</span>
          <span>Forma</span>
          <span>Via</span>
          <span>Concentração</span>
          <span>Apresentação</span>
          <span>Fracionamento</span>
        </div>

        <div className="divide-y divide-border/70">
          {medication.presentations.map((presentation) => (
            <div
              key={presentation.id}
              className="grid grid-cols-[1.8fr_1.25fr_1fr_0.75fr_1.1fr_1fr_1fr] gap-4 px-6 py-5 text-sm leading-6 text-foreground/85"
            >
              <div className="font-semibold text-foreground">{presentation.label}</div>
              <div className="text-xs text-muted-foreground">{formatSupplyChannel(presentation.channel)}</div>
              <div>{presentation.form}</div>
              <div>{presentation.route || '—'}</div>
              <div>{formatPresentationConcentration(presentation)}</div>
              <div>{presentation.packInfo || '—'}</div>
              <div>{presentation.scoringInfo || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:hidden">
        {medication.presentations.map((presentation) => (
          <MobilePresentationCard key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </>
  );
}

function getCommercialProductImage(product: CommercialMedicationProduct): string | undefined {
  return commercialProductImageAssets[product.id] || product.imageUrl;
}

function CommercialProductsSection({ products }: { products: CommercialMedicationProduct[] }) {
  if (!products.length) return null;
  return (
    <div>
      <div className="hidden overflow-x-auto rounded-[24px] border border-border/80 xl:block">
        <table className="w-full min-w-[980px] table-fixed text-left">
          <thead className="bg-muted/[0.16] text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="w-[23%] px-4 py-4">Produto</th>
              <th className="w-[20%] px-4 py-4">Composição e apresentação</th>
              <th className="w-[16%] px-4 py-4">Espécies e uso</th>
              <th className="w-[20%] px-4 py-4">Posologia e reavaliação</th>
              <th className="w-[21%] px-4 py-4">Alertas e fontes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {products.map((product) => {
              const imageUrl = getCommercialProductImage(product);
              return <tr key={product.id} className="align-top hover:bg-muted/[0.06]">
                <td className="px-4 py-4"><div className="flex gap-3"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5">{imageUrl ? <img src={imageUrl} alt={`Embalagem de ${product.name}`} className="h-full w-full object-contain" loading="lazy" /> : <ShoppingBag className="h-5 w-5 text-muted-foreground" />}</div><div><p className="font-bold leading-5 text-foreground">{product.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{product.manufacturer}</p></div></div></td>
                <td className="px-4 py-4 text-sm leading-6"><p className="font-medium text-foreground">{product.activeComponents.join(' + ')}</p><p className="mt-1 text-muted-foreground">{product.presentations.join('; ')}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{product.labelCompositionSummary}</p></td>
                <td className="px-4 py-4 text-sm leading-6"><p className="font-medium text-foreground">{formatSpeciesList(product.species)}</p><p className="mt-2 text-muted-foreground">{product.clinicalUse}</p></td>
                <td className="px-4 py-4 text-sm leading-6"><p className="font-medium text-foreground">{product.dosageGuidance?.labelDose || product.labelDirections}</p><p className="mt-2 text-muted-foreground"><span className="font-semibold text-foreground">Reavaliar:</span> {product.reassessment}</p></td>
                <td className="px-4 py-4 text-sm leading-6"><p className="rounded-md bg-rose-500/[0.09] px-2.5 py-2 text-rose-800 dark:text-rose-200">{product.safetyAlert}</p><div className="mt-3 flex flex-wrap gap-2"><ProductResourceLink href={product.labelUrl} label="Bula" /><ProductResourceLink href={product.productPageUrl} label="Fabricante" /></div></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 xl:hidden">
        {products.map((product) => {
          const imageUrl = getCommercialProductImage(product);
          return (
            <article key={product.id} className="rounded-[20px] border border-border/80 bg-background/75 p-4">
              <div className="flex min-w-0 gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-2">
                {imageUrl ? <img src={imageUrl} alt={`Embalagem de ${product.name}`} className="h-full w-full object-contain" loading="lazy" /> : <ShoppingBag className="h-6 w-6 text-muted-foreground" />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold leading-6 text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.manufacturer}</p>
              </div>
              </div>
              <dl className="mt-4 grid gap-3 text-sm leading-6"><div><dt className="font-bold text-foreground">Composição e apresentação</dt><dd className="text-muted-foreground">{product.activeComponents.join(' + ')}. {product.presentations.join('; ')}</dd></div><div><dt className="font-bold text-foreground">Uso e espécies</dt><dd className="text-muted-foreground">{formatSpeciesList(product.species)}. {product.clinicalUse}</dd></div><div><dt className="font-bold text-foreground">Dose e reavaliação</dt><dd className="text-muted-foreground">{product.dosageGuidance?.labelDose || product.labelDirections} {product.reassessment}</dd></div><div><dt className="font-bold text-rose-700 dark:text-rose-300">Alerta</dt><dd className="text-muted-foreground">{product.safetyAlert}</dd></div></dl>
              <div className="mt-4 flex flex-wrap gap-2"><ProductResourceLink href={product.labelUrl} label="Bula" /><ProductResourceLink href={product.productPageUrl} label="Fabricante" /></div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function MedicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { addRecent } = useRecents();

  const [medication, setMedication] = useState<MedicationRecord | null>(null);
  const [relatedDiseases, setRelatedDiseases] = useState<DiseaseRecord[]>([]);
  const [relatedConsensos, setRelatedConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastSavedSectionRef = useRef<string>('');
  const commercialProducts = useMemo(
    () => (medication ? getCommercialProductsForMedication(medication, commercialOticProductsSeed) : []),
    [medication],
  );
  const featuredCommercialImage = commercialProducts.map(getCommercialProductImage).find(Boolean);

  const resumeState = (location.state as ResumeLocationState | null) || null;

  const sections: SectionAnchorEntry[] = useMemo(() => {
    if (!medication) return [];
    const base: SectionAnchorEntry[] = [{ id: 'quick-summary', label: UI_TEXT.quickSummary }];
    if (medication.doses.length > 0) {
      base.push(
        { id: 'dose-calculator', label: UI_TEXT.doseCalculator, activeClassName: getMedicationSectionVisual('dose-calculator').navItemActiveClass },
        { id: 'dose-regimens', label: UI_TEXT.regimens, activeClassName: getMedicationSectionVisual('dose-regimens').navItemActiveClass }
      );
    }
    if (medication.presentations.length > 0 || commercialProducts.length > 0) {
      base.push({
        id: 'presentations',
        label: UI_TEXT.presentations,
        activeClassName: getMedicationSectionVisual('presentations').navItemActiveClass,
      });
    }
    base.push(
      { id: 'pharmacology', label: UI_TEXT.pharmacology, activeClassName: getMedicationSectionVisual('pharmacology').navItemActiveClass },
      { id: 'clinical-notes', label: UI_TEXT.clinicalNotes, activeClassName: getMedicationSectionVisual('clinical-notes').navItemActiveClass }
    );
    if (relatedDiseases.length > 0 || relatedConsensos.length > 0) {
      base.push({
        id: 'related',
        label: UI_TEXT.related,
        activeClassName: getMedicationSectionVisual('related').navItemActiveClass,
      });
    }
    if (medication.references?.length) {
      base.push({
        id: 'references',
        label: UI_TEXT.references,
        activeClassName: getMedicationSectionVisual('references').navItemActiveClass,
      });
    }
    return base;
  }, [commercialProducts.length, medication, relatedDiseases.length, relatedConsensos.length]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      if (!slug) {
        if (isMounted) {
          setMedication(null);
          setRelatedDiseases([]);
          setRelatedConsensos([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const found = await medicationRepository.getBySlug(slug);
        if (!isMounted) return;

        setMedication(found);
        if (!found) {
          setRelatedDiseases([]);
          setRelatedConsensos([]);
          setIsLoading(false);
          return;
        }

        addRecent('medication', found.id, undefined, resumeState?.sectionId);

        const [loadedDiseases, loadedConsensos] = await Promise.all([
          diseaseRepository.list(),
          consensoRepository.list(),
        ]);

        if (!isMounted) return;

        const nextRelatedDiseases = loadedDiseases.filter(
          (item) => found.relatedDiseaseSlugs.includes(item.slug) || item.relatedMedicationSlugs.includes(found.slug),
        );
        const consensusSlugSet = new Set(nextRelatedDiseases.flatMap((item) => item.relatedConsensusSlugs));

        setRelatedDiseases(nextRelatedDiseases);
        setRelatedConsensos(loadedConsensos.filter((item) => consensusSlugSet.has(item.slug)));
      } catch (loadError) {
        if (!isMounted) return;
        setError(UI_TEXT.loadErrorFallback);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [addRecent, consensoRepository, diseaseRepository, medicationRepository, resumeState?.sectionId, slug]);

  useEffect(() => {
    if (!medication || !resumeState?.sectionId) return;

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(resumeState.sectionId || '');
      element?.scrollIntoView({ block: 'start' });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [medication, resumeState?.sectionId]);

  const handleActiveSectionChange = useCallback((sectionId: string) => {
    if (!medication || !sectionId || lastSavedSectionRef.current === sectionId) return;
    lastSavedSectionRef.current = sectionId;
    addRecent('medication', medication.id, undefined, sectionId);
  }, [addRecent, medication]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // noop
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-destructive">{UI_TEXT.loadErrorTitle}</h2>
          <p className="mb-6 text-sm text-destructive/80">{error}</p>
          <Link
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToMedications}
          </Link>
        </div>
      </div>
    );
  }

  const pharmacologyVisual = getMedicationSectionVisual('pharmacology');

  if (!medication) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">{UI_TEXT.notFoundTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{UI_TEXT.notFoundBody}</p>
          <Link
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToMedications}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1840px] flex-col xl:flex-row">
      <div className="w-full min-w-0 flex-1 px-4 py-4 md:px-8 md:py-8 xl:px-10 xl:pr-8 2xl:px-12">
        <nav
          className="consulta-vet-breadcrumb mb-7 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
          aria-label="Navegação estrutural"
        >
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">
            {UI_TEXT.home}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/medicamentos" className="transition-colors hover:text-primary">
            {UI_TEXT.medications}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{medication.title}</span>
        </nav>

        <ConsultaVetSurface accent="emerald" className="p-6 shadow-md md:p-8 xl:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {formatSpeciesList(medication.species)}
                </span>
                <span className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {medication.category}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl xl:max-w-[16ch]">
                {medication.title}
              </h1>

              <p className="mt-4 max-w-[96ch] text-lg leading-8 text-muted-foreground">
                {medication.activeIngredient} • {medication.pharmacologicClass}
              </p>

              <div className="mt-5">
                <TagPills tags={medication.tags} className="gap-2" />
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-4 xl:w-[300px]">
              {medication.imageUrl || featuredCommercialImage ? (
                <div className="flex min-h-[190px] items-center justify-center rounded-[28px] border border-border/80 bg-background/70 p-5">
                  <img
                    src={medication.imageUrl || featuredCommercialImage}
                    alt={`${UI_TEXT.productImageAlt}: ${medication.title}`}
                    className="max-h-44 w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
                <ProductResourceLink href={medication.officialSiteUrl} label={UI_TEXT.officialSite} />
                <ProductResourceLink href={medication.leafletUrl} label={UI_TEXT.leaflet} />
                <button
                  className="rounded-full border border-border bg-background/80 p-3 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  title={UI_TEXT.copyLink}
                  type="button"
                  onClick={handleCopyLink}
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <FavoriteButton entityType="medication" entityId={medication.id} className="h-12 w-12 border border-border bg-background/80 p-3" />
              </div>

              <PriceReferenceCard medication={medication} />
            </div>
          </div>

          <div className="mt-8 grid gap-5 border-t border-border/70 pt-6 md:grid-cols-2 xl:grid-cols-4">
            <MetaStat label={UI_TEXT.activeIngredient} value={medication.activeIngredient} />
            <MetaStat label={UI_TEXT.pharmacologicClass} value={medication.pharmacologicClass} />
            <MetaStat
              label={UI_TEXT.tradeNames}
              value={medication.tradeNames.length > 0 ? medication.tradeNames.join(', ') : UI_TEXT.noTradeName}
            />
            <MetaStat label={UI_TEXT.presentations} value={medication.presentations.length} />
          </div>
        </ConsultaVetSurface>

        <div className="space-y-8 pb-10 pt-8 md:space-y-10">
          <MedicationQuickSummaryPanel medication={medication} relatedDiseases={relatedDiseases} />

          {medication.doses.length > 0 ? (
            <MedicationSectionFrame sectionId="dose-calculator" title={UI_TEXT.doseCalculator} lead={UI_TEXT.doseCalculatorLead}>
              <DoseCalculatorCard doses={medication.doses} presentations={medication.presentations} variant="embedded" />
            </MedicationSectionFrame>
          ) : null}

          {medication.doses.length > 0 ? (
            <MedicationSectionFrame sectionId="dose-regimens" title={UI_TEXT.regimens} lead={UI_TEXT.regimensLead}>
              <DoseRegimenSection medication={medication} relatedDiseases={relatedDiseases} />
            </MedicationSectionFrame>
          ) : null}

          {medication.presentations.length > 0 || commercialProducts.length > 0 ? (
            <MedicationSectionFrame sectionId="presentations" title={UI_TEXT.presentations}>
              <div className="space-y-9">
                <PresentationsSection medication={medication} />
                <CommercialProductsSection products={commercialProducts} />
              </div>
            </MedicationSectionFrame>
          ) : null}

          <MedicationSectionFrame sectionId="pharmacology" title={UI_TEXT.pharmacology} lead={UI_TEXT.pharmacologyLead}>
            <div className="space-y-4">
              <div className="border-l-4 border-primary bg-primary/[0.05] px-5 py-5">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Pill className={cn('h-4 w-4', pharmacologyVisual.iconClass)} />
                  {UI_TEXT.mechanismOfAction}
                </h3>
                <div className="mt-3 max-w-none">
                  <p className="max-w-[108ch] text-[15px] leading-7 text-foreground/88">{medication.mechanismOfAction}</p>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-12">
                <PharmacologyBlock
                  title={UI_TEXT.indications}
                  items={medication.indications}
                  icon={medicationPharmacologyBlockIcons.indications}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-7"
                  tone="success"
                />
                <PharmacologyBlock
                  title={UI_TEXT.contraindications}
                  items={medication.contraindications}
                  icon={medicationPharmacologyBlockIcons.contraindications}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-5"
                  tone="critical"
                />
                <PharmacologyBlock
                  title={UI_TEXT.cautions}
                  items={medication.cautions}
                  icon={medicationPharmacologyBlockIcons.cautions}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-6"
                  tone="caution"
                />
                <PharmacologyBlock
                  title={UI_TEXT.adverseEffects}
                  items={medication.adverseEffects}
                  icon={medicationPharmacologyBlockIcons.adverseEffects}
                  bulletDotClass={pharmacologyVisual.bulletDotClass}
                  className="xl:col-span-6"
                  tone="info"
                />
                {medication.interactions && medication.interactions.length > 0 ? (
                  <PharmacologyBlock
                    title={UI_TEXT.interactions}
                    items={medication.interactions}
                    icon={medicationPharmacologyBlockIcons.interactions}
                    bulletDotClass={pharmacologyVisual.bulletDotClass}
                    className="xl:col-span-8"
                    tone="caution"
                  />
                ) : null}
                {medication.routes && medication.routes.length > 0 ? (
                  <PharmacologyBlock
                    title={UI_TEXT.routes}
                    items={medication.routes}
                    icon={medicationPharmacologyBlockIcons.routes}
                    bulletDotClass={pharmacologyVisual.bulletDotClass}
                    className="xl:col-span-4"
                  />
                ) : null}
              </div>
            </div>
          </MedicationSectionFrame>

          <MedicationSectionFrame sectionId="clinical-notes" title={UI_TEXT.clinicalNotes} lead={UI_TEXT.clinicalNotesLead}>
            <div className="space-y-8">
              {medication.clinicalStructuredBlocks?.length ? (
                <MedicationStructuredBlocks blocks={medication.clinicalStructuredBlocks} />
              ) : null}
              <div
                className="prose prose-slate max-w-[108ch] text-[15px] leading-8 dark:prose-invert prose-p:my-0 prose-p:leading-8 prose-p:mb-5 prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(medication.clinicalNotesRichText) }}
              />
            </div>
          </MedicationSectionFrame>

          {(relatedDiseases.length > 0 || relatedConsensos.length > 0) && (
            <MedicationSectionFrame sectionId="related" title={UI_TEXT.relatedContent} lead={UI_TEXT.relatedLead}>
              <div className="grid gap-8 xl:grid-cols-2">
                {relatedDiseases.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <Stethoscope className="h-4 w-4" />
                      {UI_TEXT.relatedDiseases}
                    </h3>
                    <div className="space-y-3">
                      {relatedDiseases.map((disease) => (
                        <Link
                          key={disease.id}
                          to={`/consulta-vet/doencas/${disease.slug}`}
                          className="group block rounded-[22px] border border-border/80 bg-background/75 px-5 py-4 transition-all hover:border-primary/35 hover:bg-background"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{disease.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{disease.category}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {relatedConsensos.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {UI_TEXT.relatedConsensos}
                    </h3>
                    <div className="space-y-3">
                      {relatedConsensos.map((consenso) => (
                        <Link
                          key={consenso.id}
                          to={`/consulta-vet/consensos/${consenso.slug}`}
                          className="group block rounded-[22px] border border-border/80 bg-background/75 px-5 py-4 transition-all hover:border-primary/35 hover:bg-background"
                        >
                          <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{consenso.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {consenso.organization || UI_TEXT.organizationFallback}
                            {consenso.year ? ` • ${consenso.year}` : ''}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </MedicationSectionFrame>
          )}

          {medication.references && medication.references.length > 0 ? (
            <MedicationSectionFrame sectionId="references" title={UI_TEXT.references}>
              <ReferencesList references={medication.references} variant="embedded" />
            </MedicationSectionFrame>
          ) : null}
        </div>
      </div>

      <div className="hidden w-60 shrink-0 py-8 pr-6 2xl:w-64 2xl:pr-8 xl:block">
        <SectionAnchorNav sections={sections} onActiveChange={handleActiveSectionChange} className="w-60 2xl:w-64" title="Índice do medicamento" />
      </div>
    </div>
  );
}

