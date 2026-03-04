/**
 * Interactive Dot Grid — canvas-based, scrambles near cursor.
 * Uses fixed positioning and explicit dimensions so the grid is always visible.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

interface Dot {
  originalX: number
  originalY: number
  currentX: number
  currentY: number
  randomOffsetX: number
  randomOffsetY: number
  isRandomized: boolean
  col: number
  row: number
}

const DOT_SPACING = 22
const DOT_RADIUS = 2.5
const DISTORTION_RADIUS = 100
const DISTORTION_STRENGTH = 26
const LERP = 0.14

function getDotColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.2)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.28)'
    : 'rgba(255, 107, 0, 0.2)'
}

export default function DotGridScramble() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<Dot[]>([])
  const needsUpdateRef = useRef(true)
  const rafRef = useRef<number>()
  const [size, setSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 800, h: typeof window !== 'undefined' ? window.innerHeight : 600 })

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

    const cols = Math.ceil(w / DOT_SPACING)
    const rows = Math.ceil(h / DOT_SPACING)
    dotsRef.current = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * DOT_SPACING + DOT_SPACING / 2
        const y = row * DOT_SPACING + DOT_SPACING / 2
        dotsRef.current.push({
          originalX: x,
          originalY: y,
          currentX: x,
          currentY: y,
          randomOffsetX: 0,
          randomOffsetY: 0,
          isRandomized: false,
          col,
          row,
        })
      }
    }
    needsUpdateRef.current = true
  }, [size.w, size.h])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      if (!needsUpdateRef.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mousePos.current.x
      const my = mousePos.current.y
      const mouseCol = Math.floor(mx / DOT_SPACING)
      const mouseRow = Math.floor(my / DOT_SPACING)
      const checkR = Math.ceil(DISTORTION_RADIUS / DOT_SPACING) + 1

      ctx.fillStyle = getDotColor()
      let hasMoving = false

      dotsRef.current.forEach((dot) => {
        const colDiff = Math.abs(dot.col - mouseCol)
        const rowDiff = Math.abs(dot.row - mouseRow)
        let targetX: number
        let targetY: number

        if (colDiff <= checkR && rowDiff <= checkR) {
          const dx = mx - dot.originalX
          const dy = my - dot.originalY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < DISTORTION_RADIUS) {
            if (!dot.isRandomized) {
              dot.randomOffsetX = (Math.random() - 0.5) * DISTORTION_STRENGTH * 2
              dot.randomOffsetY = (Math.random() - 0.5) * DISTORTION_STRENGTH * 2
              dot.isRandomized = true
            }
            targetX = dot.originalX + dot.randomOffsetX
            targetY = dot.originalY + dot.randomOffsetY
          } else {
            if (dot.isRandomized) dot.isRandomized = false
            targetX = dot.originalX
            targetY = dot.originalY
          }
        } else {
          if (dot.isRandomized) dot.isRandomized = false
          targetX = dot.originalX
          targetY = dot.originalY
        }

        dot.currentX += (targetX - dot.currentX) * LERP
        dot.currentY += (targetY - dot.currentY) * LERP
        if (Math.abs(dot.currentX - targetX) > 0.05 || Math.abs(dot.currentY - targetY) > 0.05) hasMoving = true

        ctx.beginPath()
        ctx.arc(dot.currentX, dot.currentY, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      })

      needsUpdateRef.current = hasMoving
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [size.w, size.h])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      needsUpdateRef.current = true
    }
    const onLeave = () => {
      mousePos.current = { x: -1000, y: -1000 }
      needsUpdateRef.current = true
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
    </div>
  )
}
