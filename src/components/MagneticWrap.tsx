import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticWrapProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

const MagneticWrap: React.FC<MagneticWrapProps> = ({
  children,
  className = '',
  strength = 6,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { damping: 20, stiffness: 300 })
  const y = useSpring(0, { damping: 20, stiffness: 300 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength
        x.set(dx * factor / maxDist)
        y.set(dy * factor / maxDist)
      } else {
        x.set(0)
        y.set(0)
      }
    },
    [x, y, strength]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default MagneticWrap
