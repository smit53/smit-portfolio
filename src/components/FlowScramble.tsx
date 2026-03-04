/**
 * Flowing streamlines — horizontal curves that displace vertically near cursor. Work / flow feel.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

const LINE_COUNT = 24
const SEGMENTS = 80
const AMPLITUDE = 35
const FREQ = 0.012
const DISTORTION_RADIUS = 160
const DISPLACE_STRENGTH = 50
const LERP = 0.09

function getFlowColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.1)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.12)'
    : 'rgba(255, 107, 0, 0.1)'
}

export default function FlowScramble() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const [size, setSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 800,
    h: typeof window !== 'undefined' ? window.innerHeight : 600,
  })

  useLayoutEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.w <= 0 || size.h <= 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = size.w
    const h = size.h
    canvas.width = w
    canvas.height = h

    const baseLines: { offset: number; phase: number }[] = []
    for (let i = 0; i < LINE_COUNT; i++) {
      baseLines.push({
        offset: (h / (LINE_COUNT + 1)) * (i + 1),
        phase: (i / LINE_COUNT) * Math.PI * 2,
      })
    }

    const displaceY: number[] = new Array(SEGMENTS + 1).fill(0)
    const currentDisplace: number[] = new Array(SEGMENTS + 1).fill(0)

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mousePos.current.x
      const my = mousePos.current.y

      for (let s = 0; s <= SEGMENTS; s++) {
        const x = (w / SEGMENTS) * s
        const dist = Math.hypot(x - mx, 0)
        const infl = dist < DISTORTION_RADIUS ? (1 - dist / DISTORTION_RADIUS) * DISPLACE_STRENGTH * Math.sign(my - h / 2) : 0
        displaceY[s] = infl
        currentDisplace[s] += (displaceY[s] - currentDisplace[s]) * LERP
      }

      ctx.strokeStyle = getFlowColor()
      ctx.lineWidth = 1.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      baseLines.forEach((line, li) => {
        ctx.beginPath()
        for (let s = 0; s <= SEGMENTS; s++) {
          const x = (w / SEGMENTS) * s
          const wave = Math.sin(x * FREQ + line.phase) * AMPLITUDE
          const y = line.offset + wave + currentDisplace[s] * (0.3 + (li / LINE_COUNT) * 0.7)
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [size.w, size.h])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mousePos.current = { x: -1000, y: -1000 } }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} width={size.w} height={size.h} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
