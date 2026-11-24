import React, { useEffect, useId, useState } from 'react'

const durationMs = 360
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const ease = (n: number) => n * n * (3 - 2 * n)

/** Symbolic animation only: liquid geometry deliberately does not encode a clinical volume. */
export function ConversionSimulation() {
  const id = useId().replaceAll(':', '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const started = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setProgress(0)
        return
      }
      const next = clamp((now - started) / durationMs)
      setProgress(next)
      if (next < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const dissolve = ease(clamp((progress - 0.08) / 0.64))
  const fill = ease(clamp((progress - 0.28) / 0.62))
  const edge = 232 - 164 * dissolve
  const streamStart = Math.max(86, edge - 10)
  const flow = progress > 0.09 && progress < 0.91 ? Math.min(1, (progress - 0.09) * 12, (0.91 - progress) * 12) : 0
  const paint = (name: string) => `url(#${id}-${name})`
  return (
    <svg className="cc-simulation-scene" viewBox="65 80 660 155" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-pill`} x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#fff"/><stop offset=".5" stopColor="#f1f0e9"/><stop offset="1" stopColor="#a6b4bc"/></linearGradient>
        <linearGradient id={`${id}-edge`} x2="0" y2="1"><stop stopColor="#a9b4bb"/><stop offset=".5" stopColor="#e1e3df"/><stop offset="1" stopColor="#637681"/></linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d9ffff" stopOpacity=".65"/><stop offset=".18" stopColor="#8bd6eb" stopOpacity=".15"/><stop offset=".45" stopColor="#fff" stopOpacity=".04"/><stop offset=".76" stopColor="#91cee3" stopOpacity=".22"/><stop offset="1" stopColor="#defaff" stopOpacity=".7"/></linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff0b2"/><stop offset=".18" stopColor="#ffc44d"/><stop offset=".5" stopColor="#ef8b08"/><stop offset=".8" stopColor="#fba619"/><stop offset="1" stopColor="#a74703"/></linearGradient>
        <linearGradient id={`${id}-metal`} x2="0" y2="1"><stop stopColor="#f3ffff"/><stop offset=".35" stopColor="#8fa4b4"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#4f687c"/></linearGradient>
        <linearGradient id={`${id}-teal`} x2="0" y2="1"><stop stopColor="#a7fff6"/><stop offset=".3" stopColor="#20b4bd"/><stop offset=".65" stopColor="#096c81"/><stop offset="1" stopColor="#68dfe1"/></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#235b75" stopOpacity=".4"/><stop offset="1" stopColor="#020923" stopOpacity="0"/></radialGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="10"/></filter>
        <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1={edge - 14} x2={edge + 5} y1="0" y2="0"><stop stopColor="#fff"/><stop offset="1" stopColor="#000"/></linearGradient>
        <mask id={`${id}-dissolve`} maskUnits="userSpaceOnUse" x="60" y="65" width="185" height="155"><rect x="60" y="65" width="185" height="155" fill={paint('fade')}/></mask>
        <clipPath id={`${id}-barrel`}><rect x="477" y="115" width="155" height="68" rx="10"/></clipPath>
      </defs>
      <ellipse cx="380" cy="155" rx="365" ry="135" fill={paint('halo')}/>
      <ellipse cx="155" cy="223" rx={73 * (1 - dissolve)} ry="10" fill="#000" opacity=".6" filter={paint('shadow')}/>
      <ellipse cx="557" cy="225" rx="145" ry="12" fill="#000" opacity=".55" filter={paint('shadow')}/>
      <g mask={paint('dissolve')} opacity={1 - clamp((dissolve - 0.94) / 0.06)} transform={`translate(0 ${-Math.sin(progress * Math.PI) * 5})`}>
        <path d="M79 139 C79 94 223 94 223 139 L223 165 C223 215 79 215 79 165Z" fill={paint('edge')}/>
        <ellipse cx="151" cy="139" rx="72" ry="48" fill={paint('pill')} stroke="#e8f5f6" strokeWidth="1.5"/>
        <path d="M101 171 L204 110" stroke="#9a9d98" strokeWidth="7"/>
        <path d="M100 168 L202 108" stroke="#fff" strokeWidth="3"/>
        <path d="M86 132 C93 101 155 91 191 107" stroke="#fff" strokeWidth="3" opacity=".65" fill="none"/>
      </g>
      <g opacity={flow}>
        <path d={`M${streamStart} 161 C267 55 305 243 384 151`} fill="none" stroke="#a84c05" strokeWidth="18" strokeLinecap="round"/>
        <path d={`M${streamStart} 158 C267 52 305 240 384 148`} fill="none" stroke={paint('liquid')} strokeWidth="13" strokeLinecap="round"/>
        <path d={`M${streamStart + 1} 154 C267 48 305 236 383 145`} fill="none" stroke="#fff2ba" strokeWidth="2" strokeLinecap="round" opacity=".9"/>
        {Array.from({length: 14}, (_, i) => {
          const t = (progress * 2.6 + i / 14) % 1
          const x = (1-t)**3*streamStart + 3*(1-t)**2*t*267 + 3*(1-t)*t*t*305 + t**3*384
          const y = (1-t)**3*158 + 3*(1-t)**2*t*52 + 3*(1-t)*t*t*240 + t**3*148
          return <circle key={i} cx={x} cy={y + Math.sin(i * 9) * 5} r={i % 3 + 1.3} fill="#fff0bd" opacity=".65"/>
        })}
      </g>
      <path d="M381 147 L441 145 L441 151 L381 150Z" fill={paint('metal')}/>
      <rect x="438" y="137" width="33" height="24" rx="5" fill={paint('teal')} stroke="#b7f8ff" strokeOpacity=".6"/>
      <path d="M462 132 L478 118 L478 180 L462 165Z" fill={paint('glass')} stroke="#a6d6e6"/>
      <g clipPath={paint('barrel')}>
        <rect x="477" y="115" width={155 * fill} height="68" rx="8" fill={paint('liquid')}/>
        {fill > 0 && <ellipse cx={477 + 155 * fill} cy="149" rx="4" ry="32" fill="#ffdf84" opacity=".65"/>}
        <path d="M478 125 H631" stroke="#fff7d9" strokeWidth="3" opacity={fill * .75}/>
      </g>
      <g transform={`translate(${fill * 150} 0)`}>
        <rect x="483" y="136" width="72" height="26" rx="3" fill={paint('glass')} stroke="#b9f4ff" strokeOpacity=".7"/>
        <rect x="479" y="116" width="13" height="66" rx="4" fill="#273b47" stroke="#a0b7c1"/>
        <path d="M483 119 V179 M488 119 V179" stroke="#0c1828" strokeWidth="2"/>
        <rect x="551" y="119" width="10" height="61" rx="4" fill={paint('teal')} stroke="#adf5fa"/>
      </g>
      <rect x="474" y="111" width="163" height="76" rx="13" fill={paint('glass')} stroke="#c5f4fa" strokeWidth="1.8"/>
      <path d="M484 117 H624 M482 180 H628" stroke="#eeffff" strokeWidth="2" opacity=".8"/>
      {Array.from({length: 11}, (_, i) => <path key={i} d={`M${488 + i*12} 171 v${i%2 === 0 ? -13 : -7}`} stroke="#244b61" strokeWidth="1.4" opacity=".9"/>)}
      <rect x="630" y="98" width="9" height="102" rx="4" fill={paint('glass')} stroke="#c5f4fa"/>
    </svg>
  )
}
