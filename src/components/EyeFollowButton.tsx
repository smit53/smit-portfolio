/**
 * EyeFollowButton — two eyes that track the cursor globally.
 *
 * variant="button"  — pill CTA (e.g. "Let's talk")
 * variant="heading" — bare heading with eyes grouped on the right, text on the left
 */

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Eye({
  mouseX,
  mouseY,
  size,
}: {
  mouseX: number
  mouseY: number
  size: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const irisSize = size * 0.62
  const pupilSize = irisSize * 0.52
  const maxOffset = size * 0.18

  useEffect(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const angle = Math.atan2(mouseY - cy, mouseX - cx)
    const dist = Math.hypot(mouseX - cx, mouseY - cy)
    const offset = Math.min(dist * 0.1, maxOffset)
    setPupil({ x: Math.cos(angle) * offset, y: Math.sin(angle) * offset })
  }, [mouseX, mouseY, maxOffset])

  return (
    // Sclera — white ball with a subtle rim shadow for definition
    <div
      ref={ref}
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: '#f0ede8',
        boxShadow: 'inset 0 1.5px 4px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(0,0,0,0.12)',
      }}
    >
      {/* Iris + pupil layer — moves as a unit */}
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: irisSize,
          height: irisSize,
          background: 'radial-gradient(circle at 38% 38%, #6b7a5e, #2d3526)',
          boxShadow: `0 0 0 ${size * 0.018}px rgba(0,0,0,0.35)`,
        }}
        animate={{ x: pupil.x, y: pupil.y }}
        transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.35 }}
      >
        {/* Pupil */}
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            background: 'radial-gradient(circle at 35% 30%, #1a1a1a, #000)',
          }}
        />
        {/* Specular highlights */}
        <span
          className="absolute rounded-full"
          style={{
            width: size * 0.1,
            height: size * 0.1,
            background: 'rgba(255,255,255,0.85)',
            top: '14%',
            right: '18%',
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            width: size * 0.05,
            height: size * 0.05,
            background: 'rgba(255,255,255,0.5)',
            bottom: '22%',
            left: '20%',
          }}
        />
      </motion.div>
    </div>
  )
}

interface EyeFollowButtonProps {
  label?: string
  href?: string
  onClick?: () => void
  variant?: 'button' | 'heading'
}

export default function EyeFollowButton({
  label = "Let's talk",
  href = 'mailto:smit.borasaniya@gmail.com',
  onClick,
  variant = 'button',
}: EyeFollowButtonProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── HEADING variant ── */
  if (variant === 'heading') {
    return (
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="font-display font-bold tracking-tight text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          {label}
        </span>
        {/* Eyes grouped together on the right */}
        <span className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Eye mouseX={mouse.x} mouseY={mouse.y} size={64} />
          <Eye mouseX={mouse.x} mouseY={mouse.y} size={64} />
        </span>
      </div>
    )
  }

  /* ── BUTTON variant ── */
  const inner = (
    <motion.span
      className="inline-flex items-center gap-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full px-6 py-3 font-bold text-base sm:text-lg select-none"
      whileHover={{ scale: 1.04, backgroundColor: '#FF6B00' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
    >
      <Eye mouseX={mouse.x} mouseY={mouse.y} size={32} />
      <span className="px-1">{label}</span>
      <Eye mouseX={mouse.x} mouseY={mouse.y} size={32} />
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block cursor-pointer">
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className="inline-block cursor-pointer">
      {inner}
    </button>
  )
}
