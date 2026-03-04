/**
 * Hexagon grid — cells shift and scale near cursor. Tech / capability feel.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

const HEX_RADIUS = 28
const DISTORTION_RADIUS = 140
const PUSH_STRENGTH = 18
const SCALE_STRENGTH = 0.25
const LERP = 0.1

function getStrokeColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.15)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.18)'
    : 'rgba(255, 107, 0, 0.15)'
}

function hexCorners(cx: number, cy: number, r: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    out.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) })
  }
  return out
}

export default function HexScramble() {
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

    const dx = HEX_RADIUS * Math.sqrt(3)
    const dy = HEX_RADIUS * 1.5
    const cols = Math.ceil(w / dx) + 2
    const rows = Math.ceil(h / dy) + 2

    const centers: { ox: number; oy: number; cx: number; cy: number; scale: number; targetScale: number }[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ox = col * dx + (row % 2) * (dx / 2)
        const oy = row * dy
        centers.push({
          ox,
          oy,
          cx: ox,
          cy: oy,
          scale: 1,
          targetScale: 1,
        })
      }
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mousePos.current.x
      const my = mousePos.current.y
      ctx.strokeStyle = getStrokeColor()
      ctx.lineWidth = 1.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      centers.forEach((c) => {
        const dx = mx - c.ox
        const dy = my - c.oy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < DISTORTION_RADIUS) {
          const f = 1 - dist / DISTORTION_RADIUS
          const push = f * PUSH_STRENGTH
          const angle = Math.atan2(dy, dx)
          c.cx += (c.ox + Math.cos(angle) * push - c.cx) * LERP
          c.cy += (c.oy + Math.sin(angle) * push - c.cy) * LERP
          c.targetScale = 1 + f * SCALE_STRENGTH
        } else {
          c.cx += (c.ox - c.cx) * LERP
          c.cy += (c.oy - c.cy) * LERP
          c.targetScale = 1
        }
        c.scale += (c.targetScale - c.scale) * LERP

        const r = HEX_RADIUS * c.scale
        const pts = hexCorners(c.cx, c.cy, r)
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y))
        ctx.closePath()
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
