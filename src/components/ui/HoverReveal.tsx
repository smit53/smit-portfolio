import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HoverRevealProps {
  children: ReactNode
  reveal: ReactNode
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  className?: string
  revealClassName?: string
}

export function HoverReveal({
  children,
  reveal,
  isActive,
  onHover,
  onLeave,
  className = '',
  revealClassName = '',
}: HoverRevealProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group cursor-default ${className}`}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden ${revealClassName}`}
          >
            {reveal}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface HoverRevealLinkProps {
  href: string
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  download?: boolean
  className?: string
}

export function HoverRevealLink({ href, label, value, icon: Icon, download, className = '' }: HoverRevealLinkProps) {
  return (
    <motion.a
      href={href}
      download={download ? '' : undefined}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`flex items-center gap-4 p-5 rounded-2xl bg-white/30 dark:bg-zinc-800/40 backdrop-blur-xl hover:bg-brand-500/10 dark:hover:bg-brand-500/15 transition-colors duration-300 group ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.span
        className="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:text-brand-500 dark:group-hover:text-brand-400"
        whileHover={{ rotate: 4, scale: 1.02 }}
      >
        <Icon className="w-6 h-6" />
      </motion.span>
      <div>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">{label}</p>
        <p className="text-zinc-900 dark:text-zinc-100 font-medium group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
          {value}
        </p>
      </div>
    </motion.a>
  )
}
