import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHRASES = [
  'a good book',
  'binging a TV series',
  'cooking something new',
  'exploring a new city',
  'building side projects',
  'learning something random',
  'finding a new coffee shop',
  'tinkering with code',
]

const RotatingPhrase: React.FC = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline text-brand-500 dark:text-brand-400 font-medium italic underline decoration-brand-500/40 dark:decoration-brand-400/50 decoration-2 underline-offset-2"
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default RotatingPhrase
