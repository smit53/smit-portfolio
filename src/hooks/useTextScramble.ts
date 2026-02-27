import { useState, useEffect, useRef, useCallback } from 'react'

const CHAR_SET = '!<>-_\\/[]{}=+*^?#@&$%~'

interface UseTextScrambleOptions {
  text: string
  trigger: boolean
  speed?: number
  scrambleWidth?: number
  onComplete?: () => void
}

export function useTextScramble({
  text,
  trigger,
  speed = 30,
  scrambleWidth = 4,
  onComplete,
}: UseTextScrambleOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number>(0)
  const cursorRef = useRef(0)
  const lastTimeRef = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const randomChar = useCallback(() => {
    return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
  }, [])

  useEffect(() => {
    if (!trigger) {
      setDisplayText('')
      cursorRef.current = 0
      return
    }

    setIsAnimating(true)
    cursorRef.current = 0
    lastTimeRef.current = 0

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const elapsed = time - lastTimeRef.current

      if (elapsed >= speed) {
        lastTimeRef.current = time
        cursorRef.current += 1
      }

      const cursor = cursorRef.current
      const chars: string[] = []

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          chars.push(' ')
        } else if (i < cursor - scrambleWidth) {
          chars.push(text[i])
        } else if (i < cursor) {
          chars.push(randomChar())
        } else {
          chars.push('\u00A0')
        }
      }

      setDisplayText(chars.join(''))

      if (cursor - scrambleWidth >= text.length) {
        setDisplayText(text)
        setIsAnimating(false)
        onCompleteRef.current?.()
        return
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [trigger, text, speed, scrambleWidth, randomChar])

  return { displayText: displayText || (trigger ? '' : text), isAnimating }
}

export function useTextScrambleSwap({
  textA,
  textB,
  active,
  speed = 25,
  scrambleWidth = 3,
}: {
  textA: string
  textB: string
  active: boolean
  speed?: number
  scrambleWidth?: number
}) {
  const target = active ? textB : textA
  const maxLen = Math.max(textA.length, textB.length)
  const [displayText, setDisplayText] = useState(textA)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number>(0)
  const cursorRef = useRef(0)
  const lastTimeRef = useRef(0)
  const prevActiveRef = useRef(active)

  const randomChar = useCallback(() => {
    return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
  }, [])

  useEffect(() => {
    if (prevActiveRef.current === active) return
    prevActiveRef.current = active

    setIsAnimating(true)
    cursorRef.current = 0
    lastTimeRef.current = 0

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const elapsed = time - lastTimeRef.current

      if (elapsed >= speed) {
        lastTimeRef.current = time
        cursorRef.current += 1
      }

      const cursor = cursorRef.current
      const chars: string[] = []

      for (let i = 0; i < maxLen; i++) {
        const tc = target[i]
        if (!tc) {
          if (i < cursor - scrambleWidth) {
            chars.push('')
          } else if (i < cursor) {
            chars.push(randomChar())
          } else {
            chars.push(randomChar())
          }
          continue
        }
        if (tc === ' ') {
          chars.push(' ')
        } else if (i < cursor - scrambleWidth) {
          chars.push(tc)
        } else if (i < cursor) {
          chars.push(randomChar())
        } else {
          chars.push(randomChar())
        }
      }

      const result = chars.join('').trimEnd()
      setDisplayText(result)

      if (cursor - scrambleWidth >= maxLen) {
        setDisplayText(target)
        setIsAnimating(false)
        return
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [active, target, maxLen, speed, scrambleWidth, randomChar])

  return { displayText, isAnimating }
}
