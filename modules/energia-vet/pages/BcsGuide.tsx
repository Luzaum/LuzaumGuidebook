import { Scale, ZoomIn } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { SpeciesPortrait } from '@/components/SpeciesPortraitCards'

const DOG_IMAGE = '/ecc-cao-2025.jpg'
const CAT_IMAGE = '/ecc-gato-2025.jpg'

const WEIGHT_RULES = [
  { bcs: 1, change: '+40%', direction: 'gain' },
  { bcs: 2, change: '+30%', direction: 'gain' },
  { bcs: 3, change: '+20%', direction: 'gain' },
  { bcs: 4, change: '+15%', direction: 'gain' },
  { bcs: 5, change: 'Ideal', direction: 'ideal' },
  { bcs: 6, change: '−15%', direction: 'loss' },
  { bcs: 7, change: '−20%', direction: 'loss' },
  { bcs: 8, change: '−30%', direction: 'loss' },
  { bcs: 9, change: '−40%', direction: 'loss' },
] as const

function SpeciesPanel({ species, imgSrc, imgAlt }: { species: 'Cão' | 'Gato'; imgSrc: string; imgAlt: string }) {
  const speciesId = species === 'Cão' ? 'dog' : 'cat'
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm"><SpeciesPortrait species={speciesId} decorative className="h-full w-full" /></span>
          <div><h2 className="text-base font-semibold text-foreground">Escore corporal — {species}</h2><p className="mt-0.5 text-xs text-muted-foreground">Escala visual de 1 a 9</p></div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">Ideal: 4–5</span>
      </div>

      <div className="p-4 sm:p-5">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted/30 outline-none transition-colors duration-200 hover:border-primary/35 focus-visible:ring-3 focus-visible:ring-ring/25">
              <img src={imgSrc} alt={imgAlt} className="h-auto w-full object-contain" />
              <span className="absolute bottom-3 right-3 flex h-10 items-center gap-2 rounded-xl bg-card/95 px-3 text-xs font-semibold text-foreground shadow-lg backdrop-blur"><ZoomIn className="h-4 w-4" /> Ampliar</span>
            </button>
          </DialogTrigger>
          <DialogContent className="flex h-[92vh] w-[min(96vw,1500px)] max-w-[1500px] flex-col overflow-hidden border-border bg-card p-0 sm:max-w-[1500px]">
            <div className="flex items-center justify-between border-b border-border px-5 py-3"><p className="font-semibold text-foreground">{imgAlt}</p></div>
            <div className="min-h-0 flex-1 overflow-auto bg-muted/40 p-4"><img src={imgSrc} alt={`${imgAlt} ampliado`} className="mx-auto min-w-[900px] object-contain" /></div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default function BcsGuide() {
  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div><p className="nutrition-eyebrow">Avaliação corporal</p><h1>Guia de ECC</h1><p>Use a referência visual para selecionar o escore e orientar o peso-alvo no cálculo nutricional.</p></div>
        <Button variant="outline" className="pointer-events-none w-full gap-2 sm:w-auto"><Scale className="h-4 w-4 text-primary" /> Escala de 1 a 9</Button>
      </header>

      <section className="rounded-[1.5rem] border border-border bg-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 lg:flex-1"><h2 className="text-base font-semibold text-foreground">Como o escore orienta a meta</h2><p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">Escores abaixo do ideal sugerem ganho planejado; escores acima orientam redução proporcional. A decisão clínica permanece ajustável na etapa Meta.</p></div>
          <div className="grid w-full grid-cols-5 gap-1.5 sm:grid-cols-9 lg:w-[52%] lg:max-w-[680px] lg:shrink-0">
            {WEIGHT_RULES.map((rule) => (
              <div key={rule.bcs} className={`flex h-14 min-w-0 flex-col items-center justify-center rounded-xl ${rule.direction === 'ideal' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200' : rule.direction === 'loss' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200'}`}>
                <span className="text-xs font-bold">{rule.bcs}</span><span className="mt-0.5 text-[9px] font-medium">{rule.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <SpeciesPanel species="Cão" imgSrc={DOG_IMAGE} imgAlt="Guia de escore corporal canino" />
        <SpeciesPanel species="Gato" imgSrc={CAT_IMAGE} imgAlt="Guia de escore corporal felino" />
      </div>
    </div>
  )
}
