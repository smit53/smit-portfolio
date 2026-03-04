/**
 * Concentric ripples / rings — radii and position displace near cursor. Contact / reach-out feel.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

const RING_COUNT = 14
const BASE_STEP = 48
const DISTORTION_RADIUS = 200
const RADIUS_PUSH = 25
const CENTER_PULL = 12
const LERP = 0.07

function getRippleColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.1)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.12)'
    : 'rgba(255, 107, 0, 0.1)'
}

export default function RippleScramble() {
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
    const cx = w / 2
    const cy = h / 2

    const rings: { baseR: number; r: number; targetR: number; offsetX: number; offsetY: number; targetX: number; targetY: number }[] = []
    for (let i = 1; i <= RING_COUNT; i++) {
      const baseR = i * BASE_STEP
      rings.push({
        baseR,
        r: baseR,
        targetR: baseR,
        offsetX: 0,
        offsetY: 0,
        targetX: 0,
        targetY: 0,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mousePos.current.x
      const my = mousePos.current.y

      ctx.strokeStyle = getRippleColor()
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'

      rings.forEach((ring) => {
        const mouseDistFromCenter = Math.hypot(mx - cx, my - cy)
        const distFromCenter = ring.baseR
        if (mouseDistFromCenter < distFromCenter + DISTORTION_RADIUS && mouseDistFromCenter > distFromCenter - DISTORTION_RADIUS) {
          const f = 1 - Math.abs(mouseDistFromCenter - distFromCenter) / DISTORTION_RADIUS
          const angle = Math.atan2(my - cy, mx - cx)
          ring.targetR = ring.baseR + Math.cos(angle) * RADIUS_PUSH * f
          ring.targetX = Math.cos(angle) * CENTER_PULL * f
          ring.targetY = Math.sin(angle) * CENTER_PULL * f
        } else {
          ring.targetR = ring.baseR
          ring.targetX = 0
          ring.targetY = 0
        }
        ring.r += (ring.targetR - ring.r) * LERP
        ring.offsetX += (ring.targetX - ring.offsetX) * LERP
        ring.offsetY += (ring.targetY - ring.offsetY) * LERP

        const drawCx = cx + ring.offsetX
        const drawCy = cy + ring.offsetY
        ctx.beginPath()
        ctx.arc(drawCx, drawCy, Math.max(0, ring.r), 0, Math.PI * 2)
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
