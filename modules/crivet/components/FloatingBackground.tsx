import React from 'react'
import { Pill, Stethoscope, Syringe, TestTube } from 'lucide-react'

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <DecorativeIcon Icon={Syringe} className="text-sky-400 w-16 h-16 top-[10%] left-[6%] rotate-12" />
      <DecorativeIcon Icon={Syringe} className="text-blue-400 w-20 h-20 top-[60%] right-[8%] -rotate-12" />
      <DecorativeIcon Icon={Pill} className="text-rose-400 w-14 h-14 top-[25%] right-[12%] rotate-6" />
      <DecorativeIcon Icon={Pill} className="text-pink-400 w-10 h-10 top-[70%] left-[25%] -rotate-12" />
      <DecorativeIcon Icon={Stethoscope} className="text-emerald-400 w-16 h-16 bottom-[20%] right-[14%]" />
      <DecorativeIcon Icon={TestTube} className="text-violet-400 w-12 h-12 top-[50%] right-[20%] rotate-6" />
    </div>
  )
}

type DecorativeIconProps = {
  Icon: typeof Syringe
  className?: string
}

function DecorativeIcon({ Icon, className = '' }: DecorativeIconProps) {
  return (
    <Icon
      className={`absolute opacity-10 blur-[0.5px] animate-float transition-opacity duration-300 ${className}`}
      aria-hidden
    />
  )
}
