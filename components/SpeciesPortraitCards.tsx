import { SPECIES_IMAGE_CANINE, SPECIES_IMAGE_FELINE } from '@/lib/speciesImages';
import { cn } from '@/lib/utils';

export type SpeciesPortraitVariant = 'teal' | 'purple' | 'indigo' | 'rose' | 'gold' | 'slate';

const VARIANT_STYLES: Record<
  SpeciesPortraitVariant,
  { active: string; ring: string; pillActive: string; fallbackGradient: string }
> = {
  teal: {
    active:
      'border-teal-500/60 bg-teal-50/90 shadow-[0_0_0_1px_rgba(20,184,166,0.35),0_24px_56px_rgba(20,184,166,0.14)] dark:bg-teal-950/40 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_24px_56px_rgba(20,184,166,0.18)]',
    ring: 'shadow-[0_0_0_3px_rgba(20,184,166,0.45),0_0_32px_10px_rgba(20,184,166,0.22)]',
    pillActive:
      'bg-teal-500/20 text-teal-900 ring-1 ring-teal-500/35 dark:bg-teal-500/15 dark:text-teal-100',
    fallbackGradient: 'from-teal-900/80 via-teal-950/90 to-neutral-950',
  },
  purple: {
    active:
      'border-purple-400/60 bg-purple-50/90 shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_24px_56px_rgba(147,51,234,0.14)] dark:bg-purple-950/35 dark:shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_24px_56px_rgba(147,51,234,0.2)]',
    ring: 'shadow-[0_0_0_3px_rgba(168,85,247,0.45),0_0_32px_10px_rgba(147,51,234,0.22)]',
    pillActive:
      'bg-purple-500/20 text-purple-900 ring-1 ring-purple-500/35 dark:bg-purple-500/15 dark:text-purple-100',
    fallbackGradient: 'from-purple-900/80 via-purple-950/90 to-neutral-950',
  },
  indigo: {
    active:
      'border-indigo-400/60 bg-indigo-50/90 shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_24px_56px_rgba(79,70,229,0.14)] dark:bg-indigo-950/35 dark:shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_24px_56px_rgba(79,70,229,0.2)]',
    ring: 'shadow-[0_0_0_3px_rgba(99,102,241,0.45),0_0_32px_10px_rgba(79,70,229,0.22)]',
    pillActive:
      'bg-indigo-500/20 text-indigo-900 ring-1 ring-indigo-500/35 dark:bg-indigo-500/15 dark:text-indigo-100',
    fallbackGradient: 'from-indigo-900/80 via-indigo-950/90 to-neutral-950',
  },
  rose: {
    active:
      'border-rose-400/60 bg-rose-50/90 shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_24px_56px_rgba(244,63,94,0.14)] dark:bg-rose-950/35 dark:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_24px_56px_rgba(244,63,94,0.2)]',
    ring: 'shadow-[0_0_0_3px_rgba(251,113,133,0.45),0_0_32px_10px_rgba(244,63,94,0.22)]',
    pillActive:
      'bg-rose-500/20 text-rose-900 ring-1 ring-rose-500/35 dark:bg-rose-500/15 dark:text-rose-100',
    fallbackGradient: 'from-rose-900/80 via-rose-950/90 to-neutral-950',
  },
  gold: {
    active:
      'border-amber-400/60 bg-amber-50/90 shadow-[0_0_0_1px_rgba(245,197,66,0.45),0_24px_56px_rgba(245,197,66,0.16)] dark:bg-amber-950/25 dark:shadow-[0_0_0_1px_rgba(245,197,66,0.4),0_24px_56px_rgba(245,197,66,0.12)]',
    ring: 'shadow-[0_0_0_3px_rgba(245,197,66,0.5),0_0_32px_10px_rgba(245,197,66,0.25)]',
    pillActive:
      'bg-amber-500/20 text-amber-950 ring-1 ring-amber-500/40 dark:bg-amber-500/15 dark:text-amber-100',
    fallbackGradient: 'from-amber-900/80 via-amber-950/90 to-neutral-950',
  },
  slate: {
    active:
      'border-teal-500/55 bg-white shadow-[0_0_0_1px_rgba(20,184,166,0.4),0_24px_56px_rgba(13,148,136,0.12)] dark:bg-slate-900/80 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_24px_56px_rgba(13,148,136,0.2)]',
    ring: 'shadow-[0_0_0_3px_rgba(20,184,166,0.4),0_0_32px_10px_rgba(13,148,136,0.18)]',
    pillActive:
      'bg-teal-600/15 text-teal-900 ring-1 ring-teal-600/30 dark:bg-teal-500/20 dark:text-teal-100',
    fallbackGradient: 'from-slate-700/80 via-slate-900/90 to-neutral-950',
  },
};

export interface SpeciesPortraitCardsProps {
  canineSelected: boolean;
  felineSelected: boolean;
  onSelectCanine: () => void;
  onSelectFeline: () => void;
  canineLabel?: string;
  felineLabel?: string;
  canineSubtitle?: string;
  felineSubtitle?: string;
  variant: SpeciesPortraitVariant;
  size?: 'default' | 'compact';
  showHeading?: boolean;
  className?: string;
  headingClassName?: string;
}

export function SpeciesPortraitCards({
  canineSelected,
  felineSelected,
  onSelectCanine,
  onSelectFeline,
  canineLabel = 'CÃO',
  felineLabel = 'GATO',
  canineSubtitle = 'Paciente canino',
  felineSubtitle = 'Paciente felino',
  variant,
  size = 'default',
  showHeading = true,
  className,
  headingClassName,
}: SpeciesPortraitCardsProps) {
  const v = VARIANT_STYLES[variant];
  const photoBox =
    size === 'compact'
      ? 'h-[140px] w-[128px] rounded-[20px]'
      : 'h-[180px] w-[160px] rounded-[24px]';
  const titleSize = size === 'compact' ? 'text-xl' : 'text-[22px] sm:text-[26px]';

  const options = [
    {
      key: 'canine' as const,
      selected: canineSelected,
      onClick: onSelectCanine,
      title: canineLabel,
      subtitle: canineSubtitle,
      src: SPECIES_IMAGE_CANINE,
      alt: canineLabel,
    },
    {
      key: 'feline' as const,
      selected: felineSelected,
      onClick: onSelectFeline,
      title: felineLabel,
      subtitle: felineSubtitle,
      src: SPECIES_IMAGE_FELINE,
      alt: felineLabel,
    },
  ];

  return (
    <div className={cn('w-full overflow-x-hidden', className)}>
      {showHeading ? (
        <p
          className={cn(
            'mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground',
            headingClassName,
          )}
        >
          Espécie
        </p>
      ) : null}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {options.map((option) => {
          const active = option.selected;
          return (
            <button
              key={option.key}
              type="button"
              onClick={option.onClick}
              className={cn(
                'group relative flex w-full max-w-full flex-col items-center overflow-hidden rounded-[28px] border pb-5 pt-6 text-center touch-manipulation sm:pb-6 sm:pt-7',
                // Sem transform no cartão: translate/scale no pai reamostra o <img> na GPU e deixa a foto “embaçada”.
                'transition-[box-shadow,border-color,background-color] duration-300 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40',
                active
                  ? v.active
                  : 'border-border bg-card hover:border-slate-400/40 hover:shadow-md dark:border-white/10 dark:bg-[#141010] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]',
              )}
            >
              <div
                className={cn(
                  'relative mx-auto overflow-hidden transition-all duration-300',
                  photoBox,
                  active ? v.ring : 'shadow-[0_8px_28px_rgba(0,0,0,0.45)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
                )}
              >
                <div
                  className={cn(
                    'absolute inset-0 flex items-end justify-center bg-gradient-to-b pb-3 text-[56px] leading-none sm:pb-4 sm:text-[64px]',
                    v.fallbackGradient,
                  )}
                  aria-hidden
                >
                  {option.key === 'canine' ? '🐕' : '🐈'}
                </div>
                <img
                  src={option.src}
                  alt={option.alt}
                  width={1024}
                  height={1024}
                  draggable={false}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top [image-rendering:auto] [backface-visibility:hidden] [transform:translateZ(0)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/55 to-transparent sm:h-12" />
              </div>

              <p
                className={cn(
                  'mt-4 font-black tracking-[0.12em] sm:mt-5',
                  titleSize,
                  active ? 'text-foreground dark:text-white' : 'text-foreground/90 dark:text-white/80',
                )}
              >
                {option.title}
              </p>
              <p className="mx-4 mt-1 max-w-[14rem] text-[12px] leading-5 text-muted-foreground sm:mx-6 sm:text-[13px]">
                {option.subtitle}
              </p>
              <div className="mt-4 w-full px-6 sm:mt-5">
                <span
                  className={cn(
                    'block w-full rounded-full py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 sm:text-[11px]',
                    active ? v.pillActive : 'bg-muted/60 text-muted-foreground dark:bg-white/[0.07]',
                  )}
                >
                  {active ? 'Selecionado' : 'Toque para escolher'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
