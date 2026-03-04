import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const HEADING_HOLD_MS = 700
const HEADING_MOVE_DURATION = 0.55
const CONTENT_REVEAL_DELAY = 0.2

interface HeadingRevealLayoutProps {
  heading: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Heading appears centered first, then the heading block shrinks to top and content flows below (no overlap).
 * All elements are in document flow so layout stays flexible and professional.
 */
export default function HeadingRevealLayout({ heading, children, className = '' }: HeadingRevealLayoutProps) {
  const [phase, setPhase] = useState<'center' | 'reveal'>('center')

  useEffect(() => {
    const t = setTimeout(() => setPhase('reveal'), HEADING_HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`flex flex-col min-h-full w-full ${className}`}>
      {/* Heading block: in flow. When center = tall and centered; when reveal = compact at top. */}
      <motion.div
        className="flex w-full justify-start shrink-0"
        style={{ alignItems: phase === 'center' ? 'center' : 'flex-start' }}
        initial={{ minHeight: '65vh' }}
        animate={{ minHeight: phase === 'center' ? '65vh' : '8rem' }}
        transition={{ duration: HEADING_MOVE_DURATION, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full pt-0 sm:pt-6">
          {heading}
        </div>
      </motion.div>

      {/* Content: always in flow below heading, fades in when revealed */}
      <motion.div
        className="flex-1 min-h-0 w-full flex flex-col text-left mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: phase === 'reveal' ? 1 : 0,
          y: phase === 'reveal' ? 0 : 16,
        }}
        transition={{
          duration: 0.45,
          delay: phase === 'reveal' ? CONTENT_REVEAL_DELAY : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
