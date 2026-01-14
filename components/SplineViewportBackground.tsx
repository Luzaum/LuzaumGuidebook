import React from 'react'

export default function SplineViewportBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <iframe
        src="https://my.spline.design/glowingplanetparticles-nhVHji30IRoa5HBGe8yeDiTs"
        title="Spline Background"
        className="h-full w-full"
        frameBorder="0"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/35" />
    </div>
  )
}
