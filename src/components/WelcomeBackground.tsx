/**
 * Welcome: Constellation / connection field.
 * Drifting nodes connect with lines when close; cursor pulls nodes gently and brightens nearby connections.
 * Unlike every other page (dots, grid, hex, rays, flow, ripples) — this is a living network.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

const NODE_COUNT = 90
const CONNECT_DIST = 140
const CURSOR_RADIUS = 180
const CURSOR_PULL = 0.028
const DRIFT_SPEED = 0.22
const LINE_OPACITY = 0.08
const LINE_OPACITY_NEAR_CURSOR = 0.22
const NODE_RADIUS = 1.2

function getLineColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.12)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.14)'
    : 'rgba(255, 107, 0, 0.12)'
}

function getNodeColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.35)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.4)'
    : 'rgba(255, 107, 0, 0.35)'
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  phase: number
}

export default function WelcomeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const nodesRef = useRef<Node[]>([])
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
    const w = size.w
    const h = size.h
    if (w <= 0 || h <= 0) return

    nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2 + (i * 0.7)
      const radius = Math.min(w, h) * (0.25 + (i % 7) * 0.06) * (0.7 + Math.sin(i) * 0.2)
      return {
        baseX: w / 2 + Math.cos(angle) * radius,
        baseY: h / 2 + Math.sin(angle) * radius,
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        phase: i * 0.4,
      }
    })
  }, [size.w, size.h])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = size.w
    const h = size.h
    canvas.width = w
    canvas.height = h

    let rafId: number
    const timeRef = { t: 0 }

    const tick = () => {
      timeRef.t += 1
      const t = timeRef.t * 0.016
      const mx = mousePos.current.x
      const my = mousePos.current.y
      const nodes = nodesRef.current

      ctx.clearRect(0, 0, w, h)

      // Drift nodes around their base position (soft organic motion)
      nodes.forEach((n) => {
        n.x = n.baseX + Math.sin(t + n.phase) * 24 + Math.sin(t * 0.7 + n.phase * 1.3) * 16
        n.y = n.baseY + Math.cos(t * 0.8 + n.phase * 0.9) * 20 + Math.cos(t * 0.5 + n.phase) * 12
        n.x += n.vx * DRIFT_SPEED
        n.y += n.vy * DRIFT_SPEED
        n.baseX += n.vx * 0.15
        n.baseY += n.vy * 0.15
        if (n.baseX < 0 || n.baseX > w) n.vx *= -1
        if (n.baseY < 0 || n.baseY > h) n.vy *= -1

        const dx = mx - n.x
        const dy = my - n.y
        const dist = Math.hypot(dx, dy)
        if (dist < CURSOR_RADIUS && mx > -500) {
          const f = (1 - dist / CURSOR_RADIUS) * CURSOR_PULL
          n.x += dx * f
          n.y += dy * f
        }
      })

      // Draw connections (lines between nearby nodes)
      ctx.strokeStyle = getLineColor()
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(b.x - a.x, b.y - a.y)
          if (d > CONNECT_DIST) continue
          const midX = (a.x + b.x) / 2
          const midY = (a.y + b.y) / 2
          const distToCursor = Math.hypot(mx - midX, my - midY)
          const nearCursor = distToCursor < CURSOR_RADIUS && mx > -500
          const alpha = nearCursor
            ? LINE_OPACITY_NEAR_CURSOR * (1 - d / CONNECT_DIST)
            : LINE_OPACITY * (1 - d / CONNECT_DIST) * 0.9
          ctx.globalAlpha = alpha
          ctx.lineWidth = nearCursor ? 1.4 : 0.9
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      // Draw nodes (tiny, so the focus is on the connections)
      ctx.fillStyle = getNodeColor()
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      })

      rafId = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(rafId)
  }, [size.w, size.h])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      mousePos.current = { x: -1000, y: -1000 }
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
