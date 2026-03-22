import { useEffect, useRef, useState, useCallback } from 'react'

const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#@&$%~01'

interface FlickerTextProps {
  text: string
  className?: string
  /** Whether to flicker continuously (idle) or only on hover */
  idle?: boolean
  /** How many chars flicker simultaneously during idle */
  idleIntensity?: number
  /** ms between idle flicker ticks */
  idleInterval?: number
  /** Trigger a full-sweep flicker (like TextScramble) on mount */
  sweepOnMount?: boolean
  sweepDelay?: number
  sweepSpeed?: number
}

export default function FlickerText({
  text,
  className = '',
  idle = false,
  idleIntensity = 2,
  idleInterval = 120,
  sweepOnMount = false,
  sweepDelay = 0,
  sweepSpeed = 22,
}: FlickerTextProps) {
  const [chars, setChars] = useState<(string | null)[]>(() => text.split(''))
  const idleRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const sweepRef  = useRef<ReturnType<typeof requestAnimationFrame>>(0)
  const mountedRef = useRef(false)
  const textRef   = useRef(text)
  textRef.current = text

  const randomChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]

  // ── Idle flicker: a few random chars briefly become noise then snap back ──
  const startIdle = useCallback(() => {
    if (idleRef.current) return
    idleRef.current = setInterval(() => {
      const t = textRef.current
      const indices: number[] = []
      while (indices.length < idleIntensity) {
        const i = Math.floor(Math.random() * t.length)
        if (t[i] !== ' ' && !indices.includes(i)) indices.push(i)
      }
      setChars(t.split('').map((c, i) => (indices.includes(i) ? randomChar() : c)))
      // snap back after one frame
      setTimeout(() => setChars(t.split('')), 80)
    }, idleInterval)
  }, [idleIntensity, idleInterval])

  const stopIdle = useCallback(() => {
    if (idleRef.current) {
      clearInterval(idleRef.current)
      idleRef.current = null
    }
    setChars(textRef.current.split(''))
  }, [])

  // ── Sweep flicker: progressive reveal with noise, like TextScramble ──
  const startSweep = useCallback((delay: number) => {
    const t = textRef.current
    let cursor = 0
    let lastTime = 0

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      if (time - lastTime >= sweepSpeed) {
        lastTime = time
        cursor++
      }
      setChars(
        t.split('').map((c, i) => {
          if (c === ' ') return ' '
          if (i < cursor - 3) return c
          if (i < cursor)    return randomChar()
          return null
        })
      )
      if (cursor - 3 >= t.length) {
        setChars(t.split(''))
        return
      }
      sweepRef.current = requestAnimationFrame(animate)
    }

    const tid = setTimeout(() => {
      sweepRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(tid)
      cancelAnimationFrame(sweepRef.current)
    }
  }, [sweepSpeed])

  useEffect(() => {
    if (sweepOnMount && !mountedRef.current) {
      mountedRef.current = true
      return startSweep(sweepDelay)
    }
  }, [sweepOnMount, sweepDelay, startSweep])

  useEffect(() => {
    if (idle) startIdle()
    return stopIdle
  }, [idle, startIdle, stopIdle])

  // ── Hover handlers ──
  const handleEnter = useCallback(() => {
    stopIdle()
    startSweep(0)
    if (idle) setTimeout(startIdle, text.length * sweepSpeed + 200)
  }, [idle, startIdle, stopIdle, startSweep, text.length, sweepSpeed])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(sweepRef.current)
    setChars(text.split(''))
    if (idle) startIdle()
  }, [idle, startIdle, text])

  return (
    <span
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={text}
    >
      {chars.map((c, i) =>
        c === null ? (
          <span key={i} className="opacity-0">{text[i]}</span>
        ) : (
          <span
            key={i}
            className={
              c !== text[i] && c !== ' '
                ? 'text-brand-500 dark:text-brand-400'
                : undefined
            }
          >
            {c}
          </span>
        )
      )}
    </span>
  )
}
