import { useState, useEffect, useRef } from 'react'

interface UseCounterOptions {
  target: number
  duration?: number
  start?: boolean
}

export function useCounter({ target, duration = 2000, start = false }: UseCounterOptions): number {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()

    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * ease))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update)
      }
    }

    frameRef.current = requestAnimationFrame(update)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, start])

  return count
}
