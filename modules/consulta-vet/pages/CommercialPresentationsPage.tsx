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
import { commercialOticProductsSeed } from '../data/commercialOticProducts.seed';
import {
  CommercialMedicationClass,
  CommercialMedicationProduct,
  CommercialMedicationSubclass,
} from '../types/commercialMedication';
import { VetSpecies } from '../types/common';

const UI_TEXT = {
  eyebrow: 'Catálogo comercial',
  title: 'Apresentações comerciais',
  body: 'Comparação clínica de apresentações comerciais por classe, subclasse, espécie e uso prático.',
  searchPlaceholder: 'Buscar produto, fabricante, ativo ou uso clínico...',
} as const;

const CLASS_LABELS: Record<CommercialMedicationClass, string> = {
  dermatologic: 'Dermatológicos',
  gastrointestinal: 'Trato gastrointestinal',
  neurologic: 'Neurológicos',
  cardiologic: 'Cardiológicos',
  pneumologic: 'Medicações pneumo',
  urologic: 'Urológicas',
  renal: 'Renais',
  orthopedic: 'Ortopédicas',
  endocrine: 'Endócrinas',
  ophthalmologic: 'Oftalmológicas',
  infectious: 'Infecciosas / antimicrobianos',
  analgesic: 'Analgésicas',
  anesthetic: 'Anestésicas',
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
  skin_pruritus: 'Prurido de pele',
  skin_pyoderma: 'Piodermites',
  skin_atopy: 'Dermatite atópica',
  skin_chlorhexidine_shampoo: 'Shampoo antisséptico com clorexidina',
  skin_antifungal_shampoo: 'Shampoo antifúngico/antisséptico',
  skin_wound_healing: 'Feridas e cicatrização',
  skin_seborrhea: 'Seborreia',
  gi_antiemetic: 'Antieméticos',
  gi_antidiarrheal: 'Antidiarreicos',
  gi_gastric_protector: 'Protetores gástricos',
  gi_probiotic: 'Probióticos',
  neuro_anticonvulsant: 'Anticonvulsivantes',
  neuro_pain: 'Dor neuropática',
  cardio_inotrope: 'Inotrópicos',
  cardio_antiarrhythmic: 'Antiarrítmicos',
  cardio_antihypertensive: 'Anti-hipertensivos',
  pneumo_bronchodilator: 'Broncodilatadores',
  pneumo_antitussive: 'Antitussígenos',
  uro_urinary_support: 'Suporte urinário',
  renal_ckd_support: 'Doença renal crônica',
  ortho_joint_support: 'Suporte articular',
  ortho_antiinflammatory: 'Anti-inflamatórios ortopédicos',
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
    'skin_chlorhexidine_shampoo',
    'skin_antifungal_shampoo',
    'skin_wound_healing',
    'skin_seborrhea',
  ],
  gastrointestinal: ['gi_antiemetic', 'gi_antidiarrheal', 'gi_gastric_protector', 'gi_probiotic'],
  neurologic: ['neuro_anticonvulsant', 'neuro_pain'],
  cardiologic: ['cardio_inotrope', 'cardio_antiarrhythmic', 'cardio_antihypertensive'],
  pneumologic: ['pneumo_bronchodilator', 'pneumo_antitussive'],
  urologic: ['uro_urinary_support'],
  renal: ['renal_ckd_support'],
  orthopedic: ['ortho_joint_support', 'ortho_antiinflammatory'],
  endocrine: [],
  ophthalmologic: [],
  infectious: [],
  analgesic: [],
  anesthetic: [],
  nutraceutical: [],
  reproductive: [],
  oncologic: [],
  emergency: [],
  parasiticide: [],
  behavioral: [],
  dental: [],
};

const classOptions = Object.entries(CLASS_LABELS).map(([value, label]) => ({
  value: value as CommercialMedicationClass,
  label,
}));

const speciesOptions: Array<{ value: 'all' | VetSpecies; label: string }> = [
  { value: 'all', label: 'Cão e gato' },
  { value: 'dog', label: 'Cão' },
  { value: 'cat', label: 'Gato' },
];

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

function ProductImage({
  product,
  onZoom,
}: {
  product: CommercialMedicationProduct;
  onZoom: (product: CommercialMedicationProduct) => void;
}) {
  if (product.imageUrl) {
    return (
      <button
        type="button"
        onClick={() => onZoom(product)}
        className="group h-24 w-24 shrink-0 rounded-xl border border-border bg-white p-2 transition-colors hover:border-cyan-500/45 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        aria-label={`Ampliar foto de ${product.name}`}
      >
        <img
          src={product.imageUrl}
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
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-4">
        <FieldBlock label="Apresentação">{product.presentations.join(', ')}</FieldBlock>
        <FieldBlock label="Preço médio">
          <span className="font-semibold text-foreground">{product.price.averageLabel}</span>
          <span className="block text-xs text-muted-foreground">
            {product.price.rangeLabel} - {product.price.sourceDate}
          </span>
        </FieldBlock>
        <FieldBlock label="Ativos">{product.activeComponents.join(', ')}</FieldBlock>
        <FieldBlock label="Uso por bula">{product.labelDirections}</FieldBlock>
      </div>

      <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="text-sm leading-6 text-amber-900">{product.safetyAlert}</p>
        </div>
      </div>

      <details className="mt-4 rounded-xl border border-border bg-background/65">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-foreground marker:hidden">
          Ver leitura clínica, Plumb&apos;s e receita
        </summary>
        <div className="grid gap-5 border-t border-border px-4 py-4 lg:grid-cols-2">
          <FieldBlock label="Composição">{product.labelCompositionSummary}</FieldBlock>
          <FieldBlock label="Leitura Plumb's">{product.plumbsContext}</FieldBlock>
          <FieldBlock label="Indicação prática">{product.clinicalUse}</FieldBlock>
          <FieldBlock label="Reavaliar">{product.reassessment}</FieldBlock>
          <div className="lg:col-span-2">
            <FieldBlock label="Como escrever na receita">{product.prescriptionExample}</FieldBlock>
          </div>
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

  const availableSubclasses = commercialClass ? SUBCLASSES_BY_CLASS[commercialClass] : [];

  const products = useMemo(() => {
    if (!commercialClass) return [];

    const normalized = query.trim().toLowerCase();
    return commercialOticProductsSeed.filter((product) => {
      const productSubclasses = product.commercialSubclasses || [product.commercialSubclass];
      const matchesClass = product.commercialClass === commercialClass;
      const matchesSubclass = commercialSubclass === 'all' || productSubclasses.includes(commercialSubclass);
      const matchesSpecies = species === 'all' || product.species.includes(species);
      const matchesQuery =
        !normalized ||
        [
          product.name,
          product.manufacturer,
          product.labelCompositionSummary,
          product.clinicalUse,
          product.activeComponents.join(' '),
          productSubclasses.map((subclass) => SUBCLASS_LABELS[subclass]).join(' '),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalized);

      return matchesClass && matchesSubclass && matchesSpecies && matchesQuery;
    });
  }, [commercialClass, commercialSubclass, query, species]);

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
            {commercialClass ? `${products.length} resultado(s)` : 'Aguardando classe'}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <FlaskConical className="h-4 w-4" />
            {commercialClass ? CLASS_LABELS[commercialClass] : 'Produtos comerciais'}
          </h2>
        </div>

        {!commercialClass ? (
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

      {zoomedProduct?.imageUrl ? (
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
                src={zoomedProduct.imageUrl}
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
