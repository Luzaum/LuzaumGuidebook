import React, { useEffect, useRef, useState } from 'react'

/** Paleta alinhada ao tema do módulo (tokens visuais) — não afeta engine. */
const pillColors = [
  { primary: '#34a85a', secondary: '#ffffff' },
  { primary: '#33cc33', secondary: '#e8f5e9' },
  { primary: '#66d9ef', secondary: '#ffffff' },
  { primary: '#6495ed', secondary: '#f0f5ff' },
  { primary: '#ff99cc', secondary: '#fff5f9' },
  { primary: '#ddd9c4', secondary: '#f9f9fa' },
]

interface AnimatedBackgroundProps {
  pillCount?: number
}

interface Pill {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  color: number
  rotation: number
  opacity: number
  scale: number
}

let globalPills: Pill[] = []
let isGlobalInitialized = false
let nextPillId = 0

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ pillCount = 120 }) => {
  const [pills, setPills] = useState<Pill[]>([])
  const animationRef = useRef<number>()
  const lastPillTimeRef = useRef<number>(Date.now())
  const count = Math.min(Math.max(pillCount, 24), 160)

  useEffect(() => {
    if (!isGlobalInitialized) {
      const initialPills: Pill[] = []
      for (let i = 0; i < count; i++) {
        const seed1 = i * 9973
        const seed2 = i * 7919
        const seed3 = i * 6421
        const seed5 = i * 3571
        initialPills.push({
          id: nextPillId++,
          x: Math.random() * window.innerWidth,
          y: ((seed3 * 41) % 140) - 20,
          delay: 0,
          duration: ((seed2 * 61) % 54) + 13.5,
          color: Math.floor(((seed1 % 1000) / 1000) * pillColors.length),
          rotation: (seed2 * 137) % 360,
          opacity: ((seed5 * 29) % 20) / 100 + 0.05,
          scale: ((seed1 * 47) % 20) / 10 + 0.4,
        })
      }
      globalPills = initialPills
      isGlobalInitialized = true
    }
    setPills([...globalPills])
  }, [count])

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now()
      const elapsed = (currentTime - lastPillTimeRef.current) / 1000

      setPills((prevPills) => {
        let newPills = [...prevPills]
        newPills = newPills
          .map((pill) => {
            const speed = window.innerWidth / (pill.duration * 60)
            const newX = pill.x - speed
            if (newX < -100) return null
            return { ...pill, x: newX }
          })
          .filter(Boolean) as Pill[]

        if (elapsed > 0.5) {
          const seed1 = Math.random() * 10000
          const seed2 = Math.random() * 10000
          const seed3 = Math.random() * 10000
          const seed5 = Math.random() * 10000
          newPills.push({
            id: nextPillId++,
            x: window.innerWidth + 100,
            y: ((seed3 * 41) % 140) - 20,
            delay: 0,
            duration: ((seed2 * 61) % 54) + 13.5,
            color: Math.floor(((seed1 % 1000) / 1000) * pillColors.length),
            rotation: (seed2 * 137) % 360,
            opacity: ((seed5 * 29) % 20) / 100 + 0.05,
            scale: ((seed1 * 47) % 20) / 10 + 0.4,
          })
          lastPillTimeRef.current = currentTime
        }
        globalPills = newPills
        return newPills
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="abv-pill-layer" aria-hidden>
      {pills.map((pill) => {
        const color = pillColors[pill.color]
        return (
          <div
            key={pill.id}
            className="absolute will-change-transform"
            style={{
              top: `${pill.y}%`,
              left: `${pill.x}px`,
              opacity: pill.opacity,
              transform: `rotate(${pill.rotation}deg) scale(${pill.scale})`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24H48C54.627 24 60 18.627 60 12C60 5.373 54.627 0 48 0H12Z"
                fill={color.primary}
              />
              <path
                d="M30 0H12C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24H30V0Z"
                fill={color.secondary}
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default AnimatedBackground
