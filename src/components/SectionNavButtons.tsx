import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSection } from '../context/SectionContext'

const navButtonClass =
  'w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900'

/**
 * Back and forward section controls grouped together bottom-right for easy access.
 */
export default function SectionNavButtons() {
  const { goToPrevSection, goToNextSection } = useSection()

  return (
    <motion.nav
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 p-1 shadow-sm border border-zinc-200/80 dark:border-zinc-700/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.25 }}
      aria-label="Page navigation"
    >
      <button
        type="button"
        onClick={goToPrevSection}
        className={navButtonClass}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={goToNextSection}
        className={navButtonClass}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" aria-hidden />
      </button>
    </motion.nav>
  )
}
