import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Cat,
  Dog,
  ExternalLink,
  Filter,
  FlaskConical,
  PackageSearch,
  Search,
  ShoppingBag,
  Stethoscope,
  X,
} from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { commercialProductImageAssets } from '../data/commercialProductImageAssets';
import { commercialOticProductsSeed } from '../data/commercialOticProducts.seed';
import {
  CommercialMedicationClass,
  CommercialMedicationDoseEntry,
  CommercialMedicationProduct,
  CommercialMedicationSubclass,
} from '../types/commercialMedication';
import { VetSpecies } from '../types/common';

const UI_TEXT = {
  eyebrow: 'ConsultaVET',
  title: 'Apresentações Comerciais',
  body: 'Busca rápida de apresentações comerciais de medicamentos veterinários e humanos.',
  searchPlaceholder: 'Buscar por produto, fabricante, princípio ativo ou indicação...',
} as const;

const CLASS_LABELS: Record<CommercialMedicationClass, string> = {
  dermatologic: 'Dermatológicas',
  gastrointestinal: 'Gastrointestinais',
  neurologic: 'Neurológicas',
  cardiologic: 'Cardiológicos',
  pneumologic: 'Medicações pneumo',
  urologic: 'Urológicas',
  renal: 'Renais',
  orthopedic: 'Ortopédicas',
  endocrine: 'Endócrinas',
  ophthalmologic: 'Oftalmológicas',
  infectious: 'Infecciosas / antimicrobianos',
  analgesic: 'Analgésicas',
  antiinflammatory: 'Anti-inflamatórios',
  nutraceutical: 'Nutracêuticas',
  reproductive: 'Reprodutivas',
  oncologic: 'Oncológicas',
  emergency: 'Emergenciais',
  parasiticide: 'Antiparasitárias',
  behavioral: 'Comportamentais',
  dental: 'Odontológicas',
};

const SUBCLASS_LABELS: Record<CommercialMedicationSubclass, string> = {
  otic_ceruminolytic: 'Otológico ceruminolítico',
  otic_antifungal: 'Otológico antifúngico',
  otic_antibacterial: 'Otológico antibacteriano',
  otic_corticosteroid: 'Corticóide otológico',
  ophthalmic_lubricant: 'Oftálmico lubrificante',
  ophthalmic_immunomodulator: 'Oftálmico imunomodulador',
  ophthalmic_antibiotic: 'Oftálmico antibiótico',
  ophthalmic_epithelial: 'Oftálmico reparador/epitelizante',
  ophthalmic_mydriatic: 'Oftálmico midriático/cicloplégico',
  ophthalmic_glaucoma: 'Glaucoma / pressão intraocular',
  ophthalmic_corticosteroid: 'Corticóide oftálmico',
  ophthalmic_antibiotic_steroid: 'Oftálmico antibiótico + corticóide',
  ophthalmic_nsaid: 'AINE oftálmico',
  skin_pruritus: 'Prurido de pele',
  skin_pyoderma: 'Piodermites',
  skin_atopy: 'Dermatite atópica',
  skin_hydration: 'Hidratação cutânea',
  skin_barrier: 'Barreira cutânea',
  skin_chlorhexidine_shampoo: 'Shampoo antisséptico com clorexidina',
  skin_antifungal_shampoo: 'Shampoo antifúngico/antisséptico',
  skin_wound_healing: 'Feridas e cicatrização',
  skin_seborrhea: 'Seborreia',
  parasite_oral_isoxazoline_dog: 'Isoxazolina oral para cão',
  parasite_oral_endectocide_dog: 'Endectocida oral para cão',
  parasite_topical_isoxazoline_cat: 'Isoxazolina tópica para gato',
  parasite_oral_antifleas_cat: 'Antipulgas oral para gato',
  parasite_oral_adulticide_flea: 'Adulticida oral para pulgas',
  parasite_topical_classic: 'Tópicos clássicos',
  parasite_topical_endectocide: 'Tópicos endectocidas',
  parasite_collar: 'Coleiras antiparasitárias',
  parasite_vector_repellent_dog: 'Repelentes vetoriais para cães',
  parasite_dewormer_dog: 'Vermífugos para cães',
  parasite_dewormer_cat: 'Vermífugos para gatos',
  parasite_heartworm_prevention: 'Prevenção de dirofilariose',
  parasite_giardia: 'Giardia',
  gi_antiemetic: 'Antieméticos',
  gi_prokinetic: 'Procinéticos',
  gi_antidiarrheal: 'Antidiarreicos',
  gi_gastric_protector: 'Protetores gástricos',
  gi_laxative: 'Laxantes / encefalopatia hepática',
  gi_probiotic: 'Probióticos',
  gi_antiprotozoal: 'Antiprotozoários gastrointestinais',
  gi_pancreatic_enzyme: 'Enzimas pancreáticas',
  gi_hepatobiliary: 'Hepatobiliares',
  gi_orexigenic: 'Orexígenos',
  analgesic_opioid_combo: 'Analgésicos multimodais',
  sedative_anesthetic: 'Sedativos / anestesia clínica',
  neuro_anticonvulsant: 'Anticonvulsivantes',
  neuro_pain: 'Dor neuropática',
  cardio_inotrope: 'Inotrópicos',
  cardio_loop_diuretic: 'Diuréticos de alça',
  cardio_raas_aldosterone: 'SRAA / aldosterona',
  cardio_antithrombotic: 'Antitrombóticos',
  cardio_pulmonary_vasodilator: 'Vasodilatadores pulmonares',
  cardio_antiarrhythmic: 'Antiarrítmicos',
  cardio_antihypertensive: 'Anti-hipertensivos',
  pneumo_bronchodilator: 'Broncodilatadores',
  pneumo_antitussive: 'Antitussígenos',
  uro_urinary_support: 'Suporte urinário',
  renal_ckd_support: 'Doença renal crônica',
  nutra_general_support: 'Suporte nutricional geral',
  nutra_mineral_vitamin: 'Vitaminas / minerais',
  endocrine_adrenal: 'Adrenais',
  endocrine_thyroid: 'Tireoide',
  endocrine_erythropoiesis: 'Eritropoiese / DRC',
  endocrine_diagnostic: 'Diagnóstico endócrino',
  infectious_antibiotic: 'Antimicrobianos sistêmicos',
  oncologic_tki: 'Inibidores de tirosina quinase',
  repro_antigalactogenic: 'Antigalactogênicos',
  ortho_joint_support: 'Suporte articular',
  ortho_antiinflammatory: 'Anti-inflamatórios ortopédicos',
  nutra_omega3: 'Ômega 3 / EPA + DHA',
  dental_chlorhexidine: 'Antissépticos bucais com clorexidina',
  dental_water_additive: 'Aditivos para água',
  dental_toothpaste_gel: 'Pasta, gel e escovação',
  dental_gum_support: 'Gengiva sensível / pós-procedimento',
  dental_plaque_supplement: 'Suporte contra placa e halitose',
  dental_antibiotic: 'Antibióticos odontológicos',
};

const SUBCLASSES_BY_CLASS: Record<CommercialMedicationClass, CommercialMedicationSubclass[]> = {
  dermatologic: [
    'otic_ceruminolytic',
    'otic_antifungal',
    'otic_antibacterial',
    'otic_corticosteroid',
    'skin_pruritus',
    'skin_pyoderma',
    'skin_atopy',
    'skin_hydration',
    'skin_barrier',
    'skin_chlorhexidine_shampoo',
    'skin_antifungal_shampoo',
    'skin_wound_healing',
    'skin_seborrhea',
  ],
  gastrointestinal: [
    'gi_antiemetic',
    'gi_prokinetic',
    'gi_gastric_protector',
    'gi_antidiarrheal',
    'gi_laxative',
    'gi_probiotic',
    'gi_antiprotozoal',
    'gi_pancreatic_enzyme',
    'gi_hepatobiliary',
    'gi_orexigenic',
  ],
  neurologic: ['neuro_anticonvulsant', 'neuro_pain'],
  cardiologic: [
    'cardio_inotrope',
    'cardio_loop_diuretic',
    'cardio_raas_aldosterone',
    'cardio_antihypertensive',
    'cardio_antithrombotic',
    'cardio_pulmonary_vasodilator',
    'cardio_antiarrhythmic',
  ],
  pneumologic: ['pneumo_bronchodilator', 'pneumo_antitussive'],
  urologic: ['uro_urinary_support'],
  renal: ['renal_ckd_support', 'endocrine_erythropoiesis'],
  orthopedic: ['ortho_joint_support', 'ortho_antiinflammatory'],
  endocrine: ['endocrine_adrenal', 'endocrine_thyroid', 'endocrine_erythropoiesis', 'endocrine_diagnostic'],
  ophthalmologic: [
    'ophthalmic_lubricant',
    'ophthalmic_immunomodulator',
    'ophthalmic_antibiotic',
    'ophthalmic_epithelial',
    'ophthalmic_mydriatic',
    'ophthalmic_glaucoma',
    'ophthalmic_corticosteroid',
    'ophthalmic_antibiotic_steroid',
    'ophthalmic_nsaid',
  ],
  infectious: ['infectious_antibiotic'],
  analgesic: ['analgesic_opioid_combo', 'neuro_pain', 'sedative_anesthetic'],
  antiinflammatory: ['ortho_antiinflammatory'],
  nutraceutical: ['nutra_omega3', 'nutra_general_support', 'nutra_mineral_vitamin', 'gi_probiotic'],
  reproductive: ['repro_antigalactogenic'],
  oncologic: ['oncologic_tki'],
  emergency: ['sedative_anesthetic', 'endocrine_diagnostic'],
  parasiticide: [
    'parasite_oral_isoxazoline_dog',
    'parasite_oral_endectocide_dog',
    'parasite_topical_isoxazoline_cat',
    'parasite_oral_antifleas_cat',
    'parasite_oral_adulticide_flea',
    'parasite_topical_classic',
    'parasite_topical_endectocide',
    'parasite_collar',
    'parasite_vector_repellent_dog',
    'parasite_dewormer_dog',
    'parasite_dewormer_cat',
    'parasite_heartworm_prevention',
    'parasite_giardia',
  ],
  behavioral: [],
  dental: [
    'dental_chlorhexidine',
    'dental_water_additive',
    'dental_toothpaste_gel',
    'dental_gum_support',
    'dental_plaque_supplement',
    'dental_antibiotic',
  ],
};

const classOptions = Object.entries(CLASS_LABELS)
  .map(([value, label]) => ({
    value: value as CommercialMedicationClass,
    label,
  }))
  .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

const speciesOptions: Array<{ value: 'all' | VetSpecies; label: string }> = [
  { value: 'all', label: 'Cão e gato' },
  { value: 'dog', label: 'Cão' },
  { value: 'cat', label: 'Gato' },
];

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function SpeciesBadges({ species }: { species: VetSpecies[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {species.includes('dog') ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-800">
          <Dog className="h-3.5 w-3.5" />
          Cão
        </span>
      ) : null}
      {species.includes('cat') ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-800">
          <Cat className="h-3.5 w-3.5" />
          Gato
        </span>
      ) : null}
    </div>
  );
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="mt-2 text-sm leading-6 text-foreground/86">{children}</div>
    </div>
  );
}

function DoseEntryList({ entries }: { entries: CommercialMedicationDoseEntry[] }) {
  return (
    <div className="mt-3 space-y-2.5">
      {entries.map((entry) => (
        <div key={`${entry.title}-${entry.dose}`} className="rounded-lg border border-border/70 bg-background/70 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{entry.title}</p>
          <p className="mt-1 text-base font-extrabold leading-6 text-foreground">{entry.dose}</p>
          {entry.note ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{entry.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

const PRACTICAL_DOSE_PATTERN =
  /(\d+(?:[,.]\d+)?\s*(?:a|-)?\s*\d*(?:[,.]\d+)?\s*(?:mg|mcg|ug|µg|m²|m2|ml|mL|UI|U|%)\s*(?:\/\s*(?:kg|m²|m2|5 kg|10 kg|20 kg|40 kg))?|\d+(?:[,.]\d+)?\s*(?:cm|min|minuto|minutos|h|hora|horas|dia|dias|semana|semanas)\b|\d+\s*(?:a|-)\s*\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|\d+\s*(?:x|vez|vezes)\s*(?:\/|por)?\s*(?:dia|semana)|(?:uma|duas|tres|três)\s+vez(?:es)?\s+(?:ao|por)\s+(?:dia|mes|mês|semana)|\b(?:q\s*\d+\s*h?|q\d+h?|sid|bid|tid|qid)\b|\b(?:a\s+)?cada\s+\d+|\d+\s*(?:gota|gotas|pipeta|pipetas|tablete|tabletes|aplicador|aplicadores|flaconete|flaconetes|comprimido|comprimidos|comp|capsula|capsulas|cápsula|cápsulas|spray|jato|jatos|borrifada|borrifadas|aplicação|aplicações|aplicacao|aplicacoes|coleira)\b|(?:preencher|instilar)\s+(?:o\s+)?conduto|quantidade\s+suficiente|fina\s+camada|faixa\s+de\s+peso|dose\s+do\s+medidor|diretamente\s+(?:na|no)|todas\s+as\s+refeições|número\s+de\s+borrifadas|(?:borrifar|borrifação|embeber\s+algodão|seringa\s+graduada|pós-banho)|(?:deixar\s+agir|tempo\s+de\s+contato|banhar|molhar|umedecer|massagear|enxaguar|aplicar\s+no\s+banho|escovar)|diariamente|semanal(?:mente)?|mensal(?:mente)?)/i;

const BLOCKED_DOSE_PATTERN =
  /(dose bloqueada|bloquear receita|conferir bula|pendente de bula|posologia de bula n[aã]o cadastrada|sem dose padr[aã]o|sem dose espec[ií]fica)/i;

function hasPracticalDoseText(dose: string | undefined): dose is string {
  if (!dose || BLOCKED_DOSE_PATTERN.test(dose)) return false;

  return PRACTICAL_DOSE_PATTERN.test(dose);
}

function hasPracticalDose(entry: CommercialMedicationDoseEntry) {
  return hasPracticalDoseText(entry.dose);
}

function SourceTextBlock({
  label,
  children,
  tone = 'default',
}: {
  label: string;
  children: React.ReactNode;
  tone?: 'default' | 'strong';
}) {
  return (
    <div className={`rounded-lg border p-3 ${tone === 'strong' ? 'border-cyan-500/25 bg-cyan-500/[0.08]' : 'border-border/70 bg-background/70'}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <div className={`mt-1 leading-6 ${tone === 'strong' ? 'text-base font-extrabold text-foreground' : 'text-sm text-foreground/86'}`}>
        {children}
      </div>
    </div>
  );
}

function getPrimaryDoseSources(product: CommercialMedicationProduct) {
  const sources: Array<{ label: string; text: string }> = [];
  const labelDose = product.dosageGuidance?.labelDose;

  if (hasPracticalDoseText(labelDose)) {
    sources.push({ label: 'Bula / rótulo', text: labelDose });
  } else if (hasPracticalDoseText(product.labelDirections)) {
    sources.push({ label: 'Modo de uso da bula', text: product.labelDirections });
  } else if (hasPracticalDoseText(product.prescriptionExample)) {
    sources.push({ label: 'Receita prática cadastrada', text: product.prescriptionExample });
  }

  return sources;
}

type SpeciesDoseGroup = {
  key: string;
  label: string;
  tone: 'shared' | 'dog' | 'cat' | 'missing';
  icon: typeof Dog;
  entries: CommercialMedicationDoseEntry[];
  missingMessage?: string;
};

function normalizeDoseEntries(entries: CommercialMedicationDoseEntry[]) {
  return entries
    .map((entry) => entry.dose.trim())
    .join('||')
    .toLocaleLowerCase('pt-BR');
}

function getSpeciesDoseGroups(product: CommercialMedicationProduct): SpeciesDoseGroup[] {
  const dogEntries = (product.dosageGuidance?.plumbs?.dog || []).filter(hasPracticalDose);
  const catEntries = (product.dosageGuidance?.plumbs?.cat || []).filter(hasPracticalDose);
  const hasDog = product.species.includes('dog') || dogEntries.length > 0 || product.species.includes('cat');
  const hasCat = product.species.includes('cat') || catEntries.length > 0 || product.species.includes('dog');

  if (hasDog && hasCat && dogEntries.length && catEntries.length && normalizeDoseEntries(dogEntries) === normalizeDoseEntries(catEntries)) {
    return [
      {
        key: 'dog-cat-shared',
        label: 'Cão e gato (mesma dosagem)',
        tone: 'shared',
        icon: Dog,
        entries: dogEntries,
      },
    ];
  }

  const groups: SpeciesDoseGroup[] = [];

  if (hasDog) {
    groups.push(
      dogEntries.length
        ? { key: 'dog', label: 'Cão', tone: 'dog', icon: Dog, entries: dogEntries }
        : {
            key: 'dog-missing',
            label: 'Cão',
            tone: 'missing',
            icon: Dog,
            entries: [],
            missingMessage: 'Sem indicação de uso para essa espécie.',
          },
    );
  }

  if (hasCat) {
    groups.push(
      catEntries.length
        ? { key: 'cat', label: 'Gato', tone: 'cat', icon: Cat, entries: catEntries }
        : {
            key: 'cat-missing',
            label: 'Gato',
            tone: 'missing',
            icon: Cat,
            entries: [],
            missingMessage: 'Sem indicação de uso para essa espécie.',
          },
    );
  }

  return groups;
}

function getProductImageUrl(product: CommercialMedicationProduct) {
  return commercialProductImageAssets[product.id] || product.imageUrl;
}

function DosageGuidance({ product }: { product: CommercialMedicationProduct }) {
  const primaryDoseSources = getPrimaryDoseSources(product);
  const speciesDoseGroups = getSpeciesDoseGroups(product);
  const notes = product.dosageGuidance?.notes || [];
  const hasPracticalDirections = hasPracticalDoseText(product.labelDirections);
  const hasPracticalPrescription = hasPracticalDoseText(product.prescriptionExample);
  const hasSpeciesDosePanel = speciesDoseGroups.length > 0;

  return (
    <>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <FieldBlock label="Apresentação">{product.presentations.join(', ')}</FieldBlock>
        <FieldBlock label="Preço médio">
          <span className="font-semibold text-foreground">{product.price.averageLabel}</span>
          <span className="block text-xs text-muted-foreground">
            {product.price.rangeLabel} - {product.price.sourceDate}
          </span>
        </FieldBlock>
        <FieldBlock label="Ativos">{product.activeComponents.join(', ')}</FieldBlock>
      </div>

      <section className="mt-5 overflow-hidden rounded-xl border border-cyan-500/25 bg-cyan-500/[0.06]">
        <div className="border-b border-cyan-500/20 bg-cyan-500/[0.08] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-100">
            Dose e uso rápido
          </p>
        </div>

        <div className={`grid gap-4 p-4 ${hasSpeciesDosePanel ? 'xl:grid-cols-[minmax(320px,1.1fr)_minmax(0,1.35fr)]' : ''}`}>
          <div className="grid gap-3">
            {primaryDoseSources.length ? (
              primaryDoseSources.map((source) => (
                <SourceTextBlock key={`${source.label}-${source.text}`} label={source.label} tone="strong">
                  {source.text}
                </SourceTextBlock>
              ))
            ) : (
              <SourceTextBlock label="Bula / rótulo" tone="strong">
                Posologia de bula não cadastrada para este produto.
              </SourceTextBlock>
            )}

            {notes.length ? (
              <SourceTextBlock label="Notas de dose">
                <ul className="space-y-1">
                  {notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </SourceTextBlock>
            ) : null}
          </div>

          {hasSpeciesDosePanel ? (
            <div className={`grid gap-3 ${speciesDoseGroups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
              {speciesDoseGroups.map(({ key, label, tone, icon: SpeciesIcon, entries, missingMessage }) => (
              <div
                key={key}
                className={`rounded-lg border p-3 ${
                  tone === 'missing' ? 'border-dashed border-border/80 bg-background/45' : 'border-border/70 bg-background/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      tone === 'dog' || tone === 'shared'
                        ? 'border-sky-500/30 bg-sky-500/15 text-sky-800 dark:text-sky-100'
                        : 'border-violet-500/30 bg-violet-500/15 text-violet-800 dark:text-violet-100'
                    }`}
                  >
                    <SpeciesIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-foreground">{label}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Plumb&apos;s / leitura clínica</p>
                  </div>
                </div>
                {entries.length ? (
                  <DoseEntryList entries={entries} />
                ) : (
                  <p className="mt-3 rounded-md border border-border/60 bg-muted/40 p-3 text-sm font-semibold text-muted-foreground">
                    {missingMessage}
                  </p>
                )}
              </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 border-t border-cyan-500/20 p-4 lg:grid-cols-2">
          <SourceTextBlock label={hasPracticalDirections ? 'Modo de uso / bula' : 'Modo de uso'}>
            {product.labelDirections}
          </SourceTextBlock>
          <SourceTextBlock label={hasPracticalPrescription ? 'Receita pronta' : 'Receita / orientação'}>
            {product.prescriptionExample}
          </SourceTextBlock>
          <div className="lg:col-span-2">
            <SourceTextBlock label="Leitura clínica e uso">
              <div className="grid gap-3 lg:grid-cols-2">
                <p>{product.plumbsContext}</p>
                <p>{product.clinicalUse}</p>
              </div>
            </SourceTextBlock>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductImage({
  product,
  onZoom,
}: {
  product: CommercialMedicationProduct;
  onZoom: (product: CommercialMedicationProduct) => void;
}) {
  const imageUrl = getProductImageUrl(product);

  if (imageUrl) {
    return (
      <button
        type="button"
        onClick={() => onZoom(product)}
        className="group h-24 w-24 shrink-0 rounded-xl border border-border bg-white p-2 transition-colors hover:border-cyan-500/45 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        aria-label={`Ampliar foto de ${product.name}`}
      >
        <img
          src={imageUrl}
          alt={`Embalagem de ${product.name}`}
          className="h-full w-full object-contain transition-transform group-hover:scale-[1.03]"
          loading="lazy"
        />
      </button>
    );
  }

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 text-center">
      <div>
        <ShoppingBag className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Foto pendente
        </p>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onZoomImage,
}: {
  product: CommercialMedicationProduct;
  onZoomImage: (product: CommercialMedicationProduct) => void;
}) {
  const productSubclasses = product.commercialSubclasses || [product.commercialSubclass];

  const isControlled =
    product.id === 'nulli-ourofino' ||
    product.id === 'gabapentina-humana-manipulada' ||
    product.id === 'pregabalina-humana-manipulada' ||
    product.activeComponents.some((comp) => {
      const norm = comp.toLowerCase();
      return norm.includes('tramadol') || norm.includes('gabapentina') || norm.includes('pregabalina');
    });

  return (
    <article className="rounded-2xl border border-border/85 bg-card p-5 shadow-sm transition-colors hover:border-primary/25">
      <div className="flex flex-col gap-4 lg:flex-row">
        <ProductImage product={product} onZoom={onZoomImage} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold leading-7 text-foreground">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.manufacturer}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {isControlled && (
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  Controle Especial (MAPA / SVS 344/98)
                </span>
              )}
              {productSubclasses.map((subclass) => (
                <span
                  key={subclass}
                  className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-800"
                >
                  {SUBCLASS_LABELS[subclass]}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SpeciesBadges species={product.species} />
            <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {CLASS_LABELS[product.commercialClass]}
            </span>
            {product.productPageUrl ? (
              <a
                href={product.productPageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] px-2.5 py-1 text-xs font-semibold text-cyan-800 transition-colors hover:bg-cyan-500/[0.14]"
              >
                Página do produto
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {product.labelUrl ? (
              <a
                href={product.labelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-500/[0.14]"
              >
                Bula
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <DosageGuidance product={product} />

      {isControlled && (
        <div className="mt-5 rounded-xl border border-red-500/25 bg-red-500/[0.07] p-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-700 dark:text-red-300" />
            <div>
              <p className="text-sm font-bold text-red-950 dark:text-red-200">Atenção: Medicamento de Controle Especial</p>
              <p className="mt-1 text-sm leading-6 text-red-900 dark:text-red-100">
                Este medicamento exige **Receita de Controle Especial em Duas Vias** com retenção obrigatória da primeira via no ato da venda.
                A prescrição e uso veterinário de produtos sob controle especial do **MAPA (Portaria 837/2025)** devem ser emitidas exclusivamente por profissional cadastrado no sistema do ministério.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
          <p className="text-sm leading-6 text-amber-900 dark:text-amber-100">{product.safetyAlert}</p>
        </div>
      </div>

      <details className="mt-4 rounded-xl border border-border bg-background/65">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-foreground marker:hidden">
          Ver composição, reavaliação e evidência
        </summary>
        <div className="grid gap-5 border-t border-border px-4 py-4 lg:grid-cols-2">
          <FieldBlock label="Composição">{product.labelCompositionSummary}</FieldBlock>
          <FieldBlock label="Reavaliar">{product.reassessment}</FieldBlock>
          {product.evidenceLevel ? <FieldBlock label="Evidência / ressalva">{product.evidenceLevel}</FieldBlock> : null}
        </div>
      </details>
    </article>
  );
}

export function CommercialPresentationsPage() {
  const [query, setQuery] = useState('');
  const [commercialClass, setCommercialClass] = useState<'' | CommercialMedicationClass>('');
  const [commercialSubclass, setCommercialSubclass] = useState<'all' | CommercialMedicationSubclass>('all');
  const [species, setSpecies] = useState<'all' | VetSpecies>('all');
  const [zoomedProduct, setZoomedProduct] = useState<CommercialMedicationProduct | null>(null);

  const availableSubclasses = useMemo(() => {
    if (!commercialClass) return [];
    const keys = SUBCLASSES_BY_CLASS[commercialClass] || [];
    return [...keys].sort((a, b) => {
      const labelA = SUBCLASS_LABELS[a] || '';
      const labelB = SUBCLASS_LABELS[b] || '';
      return labelA.localeCompare(labelB, 'pt-BR');
    });
  }, [commercialClass]);

  const normalizedQuery = normalizeSearchText(query.trim());
  const hasTextSearch = normalizedQuery.length > 0;
  const shouldShowProducts = Boolean(commercialClass) || hasTextSearch;

  const products = useMemo(() => {
    if (!commercialClass && !normalizedQuery) return [];

    const filtered = commercialOticProductsSeed.filter((product) => {
      const productSubclasses = product.commercialSubclasses || [product.commercialSubclass];
      const selectedClassSubclasses = commercialClass ? SUBCLASSES_BY_CLASS[commercialClass] || [] : [];
      const matchesClass =
        hasTextSearch ||
        !commercialClass ||
        product.commercialClass === commercialClass ||
        productSubclasses.some((subclass) => selectedClassSubclasses.includes(subclass));
      const matchesSubclass =
        hasTextSearch ||
        !commercialClass ||
        commercialSubclass === 'all' ||
        productSubclasses.includes(commercialSubclass);
      const matchesSpecies = species === 'all' || product.species.includes(species);
      const searchHaystack = [
        product.name,
        product.manufacturer,
        CLASS_LABELS[product.commercialClass],
        product.commercialClass,
        product.labelCompositionSummary,
        product.clinicalUse,
        product.activeComponents.join(' '),
        productSubclasses.join(' '),
        productSubclasses.map((subclass) => SUBCLASS_LABELS[subclass]).join(' '),
      ]
        .join(' ')
        .concat(' ortopedicos antiinflamatorios anti inflamatorios analgesicos ');
      const normalizedSearchHaystack = normalizeSearchText(searchHaystack);

      const matchesQuery = !normalizedQuery || normalizedSearchHaystack.includes(normalizedQuery);
      return matchesClass && matchesSubclass && matchesSpecies && matchesQuery;
    });

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [commercialClass, commercialSubclass, normalizedQuery, species]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI_TEXT.eyebrow}
        title={UI_TEXT.title}
        description={UI_TEXT.body}
        icon={PackageSearch}
        accent="cyan"
        aside={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={UI_TEXT.searchPlaceholder}
              className="h-12 w-full rounded-xl border border-border bg-background/90 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        }
      />

      <section className="grid gap-4 rounded-2xl border border-border bg-card p-4 md:grid-cols-4">
        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Classe comercial
          </span>
          <select
            value={commercialClass}
            onChange={(event) => {
              setCommercialClass(event.target.value as '' | CommercialMedicationClass);
              setCommercialSubclass('all');
            }}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
          >
            <option value="">Selecionar classe</option>
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Subclasse</span>
          <select
            value={commercialSubclass}
            onChange={(event) => setCommercialSubclass(event.target.value as 'all' | CommercialMedicationSubclass)}
            disabled={!commercialClass}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="all">Todas as subclasses</option>
            {availableSubclasses.map((subclass) => (
              <option key={subclass} value={subclass}>
                {SUBCLASS_LABELS[subclass]}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Espécie</span>
          <select
            value={species}
            onChange={(event) => setSpecies(event.target.value as typeof species)}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
          >
            {speciesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <div className="flex h-11 w-full items-center rounded-xl border border-border bg-muted/25 px-4 text-sm text-muted-foreground">
            <Filter className="mr-2 h-4 w-4 text-cyan-700" />
            {shouldShowProducts ? `${products.length} resultado(s)` : 'Aguardando classe'}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <FlaskConical className="h-4 w-4" />
            {commercialClass ? CLASS_LABELS[commercialClass] : hasTextSearch ? 'Resultados da busca' : 'Produtos comerciais'}
          </h2>
        </div>

        {!shouldShowProducts ? (
          <div className="rounded-2xl border border-dashed border-cyan-500/35 bg-cyan-500/[0.06] py-16 text-center">
            <PackageSearch className="mx-auto h-9 w-9 text-cyan-700" />
            <p className="mt-3 text-sm font-semibold text-cyan-900">Escolha uma classe comercial para começar.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Depois refine por subclasse, como otológico ceruminolítico, otológico antifúngico, piodermites ou prurido de pele.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onZoomImage={setZoomedProduct} />
            ))}
            {products.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card py-16 text-center">
                <Stethoscope className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">Nenhum produto encontrado com os filtros atuais.</p>
              </div>
            ) : null}
          </div>
        )}
      </section>

      {zoomedProduct && getProductImageUrl(zoomedProduct) ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada de ${zoomedProduct.name}`}
          onClick={() => setZoomedProduct(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-background p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground">{zoomedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{zoomedProduct.manufacturer}</p>
              </div>
              <button
                type="button"
                onClick={() => setZoomedProduct(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Fechar imagem ampliada"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex max-h-[72vh] items-center justify-center rounded-xl bg-white p-4">
              <img
                src={getProductImageUrl(zoomedProduct)}
                alt={`Embalagem de ${zoomedProduct.name}`}
                className="max-h-[66vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
