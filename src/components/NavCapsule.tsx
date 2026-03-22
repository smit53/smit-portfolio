import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useSection, SECTIONS } from '../context/SectionContext'
import { useConsole } from '../context/ConsoleContext'
import ThemeToggle from './ThemeToggle'

const SECTION_LABELS: Record<(typeof SECTIONS)[number], string> = {
  home: 'Home',
  interests: 'Interests',
  capabilities: 'Capabilities',
  'work-ethic': 'How I work',
  work: 'Work',
  contact: 'Keep in Touch',
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
}

const item = {
  hidden: { opacity: 0, x: 8 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 4 },
}

const NavCapsule: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { currentSection, scrollToSection } = useSection()
  const { setOpen: setConsoleOpen } = useConsole()
  const ref = useRef<HTMLDivElement>(null)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setOpen(false), 180)
  }

  const handleSection = (id: (typeof SECTIONS)[number]) => {
    scrollToSection(id)
    setOpen(false)
  }

  const handleAssistant = () => {
    setConsoleOpen(true)
    setOpen(false)
  }

  return (
    <div
      ref={ref}
      className="fixed z-50 flex flex-col items-end"
      style={{
        top: 'max(1rem, env(safe-area-inset-top, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      onMouseEnter={() => {
        clearLeaveTimer()
        setOpen(true)
      }}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative w-14 h-14 min-w-[44px] min-h-[44px] rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl shadow-lg border border-white/30 dark:border-zinc-600/60 flex items-center justify-center text-zinc-600 dark:text-zinc-200 hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 touch-manipulation active:scale-95"
        style={{ transformPerspective: 600 }}
        whileHover={{ scale: 1.08, rotate: 12 }}
        whileTap={{ scale: 0.95 }}
      >
        <Compass className="w-6 h-6" strokeWidth={1.8} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, rotateX: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, rotateX: 6, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            style={{
              transformPerspective: 800,
              transformOrigin: 'top right',
            }}
            className="absolute top-full right-0 mt-3 sm:mt-4 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/60 dark:bg-zinc-800/70 backdrop-blur-2xl border border-white/25 dark:border-zinc-600/60 shadow-xl py-2.5 px-2 w-[200px] max-h-[min(70vh,400px)] overflow-y-auto"
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {SECTIONS.map((id) => (
                <motion.button
                  key={id}
                  variants={item}
                  type="button"
                  onClick={() => handleSection(id)}
                  className={`relative w-full text-left py-2.5 px-4 rounded-[1.25rem] text-[13px] font-medium transition-colors duration-200 truncate ${
                    currentSection === id
                      ? 'bg-brand-500/15 dark:bg-brand-500/25 text-brand-600 dark:text-brand-300'
                      : 'text-zinc-600 dark:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-50'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {SECTION_LABELS[id]}
                </motion.button>
              ))}
              <motion.div variants={item} className="my-1.5 mx-2 border-t border-zinc-200/80 dark:border-zinc-600" />
              <motion.div
                variants={item}
                className="flex items-center justify-between px-4 py-2"
              >
                <span className="text-[13px] text-zinc-500 dark:text-zinc-400">Theme</span>
                <ThemeToggle />
              </motion.div>
              <motion.button
                variants={item}
                type="button"
                onClick={handleAssistant}
                className="w-full text-left py-2.5 px-4 rounded-[1.25rem] text-[13px] text-zinc-600 dark:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
              >
                Try the assistant
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavCapsule
