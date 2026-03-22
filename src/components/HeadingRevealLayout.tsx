import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CONTENT_DELAY_MS = 500

interface HeadingRevealLayoutProps {
  heading: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Heading slides in at the top, then content fades in below it.
 * No center-then-move transition — clean and predictable layout.
 */
export default function HeadingRevealLayout({ heading, children, className = '' }: HeadingRevealLayoutProps) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), CONTENT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`flex flex-col min-h-full w-full ${className}`}>
      {/* Heading — slides in once from below, stays at top */}
      <motion.div
        className="w-full shrink-0 pt-0 sm:pt-6"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {heading}
      </motion.div>

      {/* Content — fades in after a short delay */}
      <motion.div
        className="flex-1 min-h-0 w-full flex flex-col text-left mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: revealed ? 1 : 0,
          y: revealed ? 0 : 18,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
