/**
 * Interactive line grid — canvas-based, scrambles/bends near cursor.
 * Same distortion logic as DotGridScramble but draws lines between points.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react'

interface Point {
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

const GRID_SPACING = 36
const DISTORTION_RADIUS = 120
const DISTORTION_STRENGTH = 28
const LERP = 0.12

function getLineColor(): string {
  if (typeof document === 'undefined') return 'rgba(255, 107, 0, 0.12)'
  return document.documentElement.classList.contains('dark')
    ? 'rgba(255, 180, 100, 0.14)'
    : 'rgba(255, 107, 0, 0.12)'
}

export default function ScrambleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const pointsRef = useRef<Point[]>([])
  const needsUpdateRef = useRef(true)
  const rafRef = useRef<number>()
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

    const w = size.w
    const h = size.h
    canvas.width = w
    canvas.height = h

    const cols = Math.ceil(w / GRID_SPACING) + 1
    const rows = Math.ceil(h / GRID_SPACING) + 1
    pointsRef.current = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * GRID_SPACING
        const y = row * GRID_SPACING
        pointsRef.current.push({
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

    const points = pointsRef.current
    const cols = Math.ceil(size.w / GRID_SPACING) + 1

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
      const mouseCol = Math.floor(mx / GRID_SPACING)
      const mouseRow = Math.floor(my / GRID_SPACING)
      const checkR = Math.ceil(DISTORTION_RADIUS / GRID_SPACING) + 1

      let hasMoving = false

      points.forEach((pt) => {
        const colDiff = Math.abs(pt.col - mouseCol)
        const rowDiff = Math.abs(pt.row - mouseRow)
        let targetX: number
        let targetY: number

        if (colDiff <= checkR && rowDiff <= checkR) {
          const dx = mx - pt.originalX
          const dy = my - pt.originalY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < DISTORTION_RADIUS) {
            if (!pt.isRandomized) {
              pt.randomOffsetX = (Math.random() - 0.5) * DISTORTION_STRENGTH * 2
              pt.randomOffsetY = (Math.random() - 0.5) * DISTORTION_STRENGTH * 2
              pt.isRandomized = true
            }
            targetX = pt.originalX + pt.randomOffsetX
            targetY = pt.originalY + pt.randomOffsetY
          } else {
            if (pt.isRandomized) pt.isRandomized = false
            targetX = pt.originalX
            targetY = pt.originalY
          }
        } else {
          if (pt.isRandomized) pt.isRandomized = false
          targetX = pt.originalX
          targetY = pt.originalY
        }

        pt.currentX += (targetX - pt.currentX) * LERP
        pt.currentY += (targetY - pt.currentY) * LERP
        if (
          Math.abs(pt.currentX - targetX) > 0.05 ||
          Math.abs(pt.currentY - targetY) > 0.05
        )
          hasMoving = true
      })

      ctx.strokeStyle = getLineColor()
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      const rowCount = Math.ceil(size.h / GRID_SPACING) + 1
      for (let i = 0; i < points.length; i++) {
        const pt = points[i]
        const right = i + 1
        const down = i + cols

        if (pt.col < cols - 1 && right < points.length) {
          const next = points[right]
          ctx.beginPath()
          ctx.moveTo(pt.currentX, pt.currentY)
          ctx.lineTo(next.currentX, next.currentY)
          ctx.stroke()
        }
        if (pt.row < rowCount - 1 && down < points.length) {
          const next = points[down]
          ctx.beginPath()
          ctx.moveTo(pt.currentX, pt.currentY)
          ctx.lineTo(next.currentX, next.currentY)
          ctx.stroke()
        }
      }

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
