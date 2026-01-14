import React from 'react'

export default function SplineBackground() {
  // Respeitar preferência de movimento reduzido
  const reduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (reduceMotion) return null

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <iframe
        src="https://my.spline.design/glowingplanetparticles-nhVHji30IRoa5HBGe8yeDiTs"
        className="h-full w-full scale-105 opacity-50"
        frameBorder="0"
        title="Spline Background"
        aria-hidden="true"
      />
    </div>
  )
}
