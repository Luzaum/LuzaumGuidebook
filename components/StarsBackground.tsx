import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  s: number
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w: number
    let h: number

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      s: Math.random() * 0.3 + 0.1,
    }))

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'white'

      stars.forEach((star) => {
        star.y += star.s
        if (star.y > h) star.y = 0

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas
      id="stars"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at bottom, #020617, #000)',
        zIndex: -1,
      }}
    />
  )
}
