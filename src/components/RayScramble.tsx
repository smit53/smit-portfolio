/**
 * Radial rays from center — bend and flicker near cursor. Direction / principles feel.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

const RAY_COUNT = 64
const RAY_LENGTH = 1200
const DISTORTION_RADIUS = 180
const BEND_STRENGTH = 0.4
const LERP = 0.08

function getRayColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.11)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.13)'
    : 'rgba(255, 107, 0, 0.11)'
}

export default function RayScramble() {
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

    const rays: { angle: number; currentAngle: number; bend: number; currentBend: number }[] = []
    for (let i = 0; i < RAY_COUNT; i++) {
      rays.push({
        angle: (Math.PI * 2 * i) / RAY_COUNT,
        currentAngle: (Math.PI * 2 * i) / RAY_COUNT,
        bend: 0,
        currentBend: 0,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mousePos.current.x
      const my = mousePos.current.y
      ctx.strokeStyle = getRayColor()
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      rays.forEach((r) => {
        const rayCx = cx + Math.cos(r.currentAngle) * 80
        const rayCy = cy + Math.sin(r.currentAngle) * 80
        const distToMouse = Math.hypot(mx - rayCx, my - rayCy)
        if (distToMouse < DISTORTION_RADIUS) {
          const f = 1 - distToMouse / DISTORTION_RADIUS
          const mouseAngle = Math.atan2(my - cy, mx - cx)
          let delta = mouseAngle - r.angle
          while (delta > Math.PI) delta -= Math.PI * 2
          while (delta < -Math.PI) delta += Math.PI * 2
          r.bend = delta * BEND_STRENGTH * f
        } else {
          r.bend = 0
        }
        r.currentAngle += (r.angle + r.bend - r.currentAngle) * LERP
        r.currentBend += (r.bend - r.currentBend) * LERP

        const endX = cx + Math.cos(r.currentAngle) * RAY_LENGTH
        const endY = cy + Math.sin(r.currentAngle) * RAY_LENGTH
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(endX, endY)
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
