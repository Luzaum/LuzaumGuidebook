import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog'
import { ZoomIn } from 'lucide-react'

const DOG_IMAGE = '/ecc-cao-2025.jpg'
const CAT_IMAGE = '/ecc-gato-2025.jpg'

const WEIGHT_LOSS_RULES = [
  { bcs: 6, action: 'Reduzir 15%' },
  { bcs: 7, action: 'Reduzir 20%' },
  { bcs: 8, action: 'Reduzir 30%' },
  { bcs: 9, action: 'Reduzir 40%' },
]

const WEIGHT_GAIN_RULES = [
  { bcs: 4, action: 'Aumentar 15%' },
  { bcs: 3, action: 'Aumentar 20%' },
  { bcs: 2, action: 'Aumentar 30%' },
  { bcs: 1, action: 'Aumentar 40%' },
]

function SpeciesPanel({
  title,
  imgSrc,
  imgAlt,
}: {
  title: string
  imgSrc: string
  imgAlt: string
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.22)] overflow-hidden">
      <div className="border-b border-white/5 bg-[#1b1514] px-6 py-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escala BCS de 1 a 9. Escore ideal: 4–5/9.</p>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left transition-all hover:ring-2 hover:ring-orange-400/40">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                <ZoomIn className="scale-0 text-white/80 transition-transform duration-300 group-hover:scale-150" />
              </div>
              <img src={imgSrc} alt={imgAlt} className="w-full h-auto object-contain" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[min(96vw,1400px)] max-w-[1400px] sm:max-w-[1400px] h-[90vh] overflow-hidden border border-white/10 bg-[#141010] p-0">
            <div className="h-full overflow-auto p-4">
              <img src={imgSrc} alt={`${imgAlt} ampliado`} className="mx-auto min-w-[1000px] w-full h-auto object-contain" />
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#1b1514] p-4">
            <p className="text-sm font-semibold text-white">Como o app usa o ECC</p>
            <p className="mt-2 text-sm text-muted-foreground">
              O ECC define o peso-alvo e a meta nutricional. O mesmo critério é usado no novo cálculo e no modal clínico da etapa de meta.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1b1514] p-4">
            <p className="text-sm font-semibold text-white">Perda de peso</p>
            <div className="mt-3 space-y-2">
              {WEIGHT_LOSS_RULES.map((rule) => (
                <div key={rule.bcs} className="flex items-center justify-between rounded-xl border border-orange-400/20 bg-orange-500/10 px-3 py-2">
                  <span className="text-sm text-white">ECC {rule.bcs}</span>
                  <span className="text-sm font-bold text-orange-300">{rule.action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1b1514] p-4">
            <p className="text-sm font-semibold text-white">Ganho de peso</p>
            <div className="mt-3 space-y-2">
              {WEIGHT_GAIN_RULES.map((rule) => (
                <div key={rule.bcs} className="flex items-center justify-between rounded-xl border border-sky-400/20 bg-sky-500/10 px-3 py-2">
                  <span className="text-sm text-white">ECC {rule.bcs}</span>
                  <span className="text-sm font-bold text-sky-300">{rule.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BcsGuide() {
  return (
    <div className="space-y-8 w-full pb-20">
      <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-r from-orange-500/[0.10] to-transparent p-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Guia de Escore de Condição Corporal</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Referência visual para cães e gatos. O fluxo clínico usa a imagem correta por espécie: cão com arquivo canino e gato com `ecc-gato-2025.jpg`.
        </p>
      </div>

      <SpeciesPanel title="Cão" imgSrc={DOG_IMAGE} imgAlt="Guia BCS canino" />
      <SpeciesPanel title="Gato" imgSrc={CAT_IMAGE} imgAlt="Guia BCS felino" />
    </div>
  )
}
