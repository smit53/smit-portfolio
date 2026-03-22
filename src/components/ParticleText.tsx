/**
 * ParticleText — canvas-based particle text that:
 *  - assembles from scattered dots on mount
 *  - repels particles on mouse/touch hover
 *  - matches the 2.5px dot size of DotGridScramble background
 *
 * Two modes:
 *  - Auto-fit (no `fontSize` prop): fills container width with single-line text (e.g. "SMIT")
 *  - Multiline (`fontSize` prop set): wraps text at container width, height auto-expands
 */

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
}

interface ParticleTextProps {
  text: string
  fontWeight?: string
  fontFamily?: string
  /** Override particle color. Defaults to zinc-900/zinc-100 per theme. */
  color?: string
  particleSize?: number
  particleGap?: number
  repulsionRadius?: number
  repulsionStrength?: number
  returnSpeed?: number
  damping?: number
  /** Cap font size on very wide screens (auto-fit mode only) */
  maxFontSize?: number
  /** If set, uses this fixed font size and wraps text across multiple lines */
  fontSize?: number
  /** Line height multiplier for multiline mode */
  lineHeightMult?: number
  className?: string
}

export default function ParticleText({
  text,
  fontWeight = '900',
  fontFamily = 'Syne, sans-serif',
  color,
  particleSize = 2.5,
  particleGap = 4,
  repulsionRadius = 130,
  repulsionStrength = 7,
  returnSpeed = 0.09,
  damping = 0.87,
  maxFontSize = 420,
  fontSize,
  lineHeightMult = 1.5,
  className = '',
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let particles: Particle[] = []
    let mouse = { x: -9999, y: -9999 }
    let raf = 0
    let particleColor = ''

    function resolveColor() {
      if (color) return color
      return document.documentElement.classList.contains('dark')
        ? 'rgba(244,244,245,0.92)'
        : 'rgba(24,24,27,0.88)'
    }

    /* ── Auto-fit mode: scale font to fill container width ── */
    function fitFontSize(W: number): number {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d')!
      const target = W * 0.94
      let lo = 12
      let hi = Math.min(Math.floor(W * 0.6), maxFontSize)
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1
        octx.font = `${fontWeight} ${mid}px ${fontFamily}`
        if (octx.measureText(text).width <= target) lo = mid
        else hi = mid
      }
      return lo
    }

    /* ── Multiline mode: word-wrap at container width ── */
    function wrapLines(W: number, fs: number): string[] {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d')!
      octx.font = `${fontWeight} ${fs}px ${fontFamily}`
      const maxW = W - 4
      const words = text.split(' ')
      const lines: string[] = []
      let line = ''
      for (const word of words) {
        const test = line ? line + ' ' + word : word
        if (octx.measureText(test).width > maxW && line) {
          lines.push(line)
          line = word
        } else {
          line = test
        }
      }
      if (line) lines.push(line)
      return lines
    }

    function build() {
      const W = canvas!.offsetWidth
      if (W < 10) return

      const off = document.createElement('canvas')
      const octx = off.getContext('2d')!

      let H: number

      if (fontSize) {
        /* ── Multiline ── */
        const fs = fontSize
        const lh = Math.ceil(fs * lineHeightMult)
        const lines = wrapLines(W, fs)
        H = Math.ceil(lines.length * lh + 6)

        off.width = W
        off.height = H
        octx.fillStyle = '#fff'
        octx.font = `${fontWeight} ${fs}px ${fontFamily}`
        octx.textBaseline = 'top'
        octx.textAlign = 'left'
        lines.forEach((l, i) => octx.fillText(l, 2, 3 + i * lh))
      } else {
        /* ── Auto-fit single line ── */
        const fs = fitFontSize(W)
        H = Math.ceil(fs * 1.22)

        off.width = W
        off.height = H
        octx.fillStyle = '#fff'
        octx.font = `${fontWeight} ${fs}px ${fontFamily}`
        octx.textBaseline = 'middle'
        octx.textAlign = 'left'
        octx.fillText(text, 2, H / 2)
      }

      canvas!.width = W
      canvas!.height = H
      canvas!.style.height = H + 'px'

      const { data } = octx.getImageData(0, 0, W, H)
      const next: Particle[] = []
      for (let y = 0; y < H; y += particleGap) {
        for (let x = 0; x < W; x += particleGap) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            next.push({
              x: Math.random() * W,
              y: Math.random() * H,
              ox: x,
              oy: y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
            })
          }
        }
      }
      particles = next
      particleColor = resolveColor()
    }

    function tick() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx.fillStyle = particleColor
      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < repulsionRadius * repulsionRadius) {
          const d = Math.sqrt(d2) || 1
          const f = (1 - d / repulsionRadius) * repulsionStrength
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx += (p.ox - p.x) * returnSpeed
        p.vy += (p.oy - p.y) * returnSpeed
        p.vx *= damping
        p.vy *= damping
        p.x += p.vx
        p.y += p.vy
        ctx.beginPath()
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    document.fonts.ready.then(() => {
      build()
      raf = requestAnimationFrame(tick)
    })

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse = { x: -9999, y: -9999 } }
    const onTouch = (e: TouchEvent) => {
      const r = canvas!.getBoundingClientRect()
      const t = e.touches[0]
      mouse = { x: t.clientX - r.left, y: t.clientY - r.top }
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    canvas.addEventListener('touchend', onLeave)

    const ro = new ResizeObserver(() => build())
    ro.observe(canvas)

    const mo = new MutationObserver(() => { particleColor = resolveColor() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchmove', onTouch)
      canvas.removeEventListener('touchend', onLeave)
      ro.disconnect()
      mo.disconnect()
    }
  }, [text, fontWeight, fontFamily, color, particleSize, particleGap, repulsionRadius, repulsionStrength, returnSpeed, damping, maxFontSize, fontSize, lineHeightMult])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full block cursor-crosshair ${className}`}
    />
  )
}
