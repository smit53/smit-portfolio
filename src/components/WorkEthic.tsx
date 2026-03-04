import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, RefreshCw, Users, Zap, Shield, type LucideIcon } from 'lucide-react'
import { useTextScramble } from '../hooks/useTextScramble'

const principles: {
  word: string
  description: string
  image?: string
  Icon: LucideIcon
}[] = [
  { word: 'IMPACT', description: 'I prioritize work that moves the needle. Clear goals, lean execution, measurable outcomes. I ask "what changes if we ship this?" before diving in.', Icon: Target },
  { word: 'ITERATIONS', description: 'Done is better than perfect. I ship often, gather feedback, improve continuously. Small, testable steps beat big-bang releases.', Icon: RefreshCw },
  { word: 'COLLABORATE', description: 'Strong ideas, loosely held. I listen first, disagree thoughtfully, build trust. I assume good intent and give credit where it\'s due.', Icon: Users },
  { word: 'ACTION', description: 'When something\'s unclear or blocked, I try the smallest useful step instead of waiting. Experiments and prototypes often unblock faster than long discussions.', Icon: Zap },
  { word: 'RELIABILITY', description: 'I treat on-call, incident response, and security as part of the job. Reliable systems and safe practices are non-negotiable—I document, automate, and improve them.', Icon: Shield },
]

function HoverReveal({
  word,
  description,
  image,
  Icon,
  isActive,
  onHover,
  onLeave,
}: {
  word: string
  description: string
  image?: string
  Icon: LucideIcon
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const { displayText } = useTextScramble({ text: description, trigger: isActive, speed: 12, scrambleWidth: 3 })
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-4 sm:py-6 px-4 sm:px-5 rounded-xl bg-white/25 dark:bg-zinc-950/35 backdrop-blur-xl mb-3 last:mb-0 cursor-default"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 400, damping: 25 }}
      whileHover={{ y: -2 }}
    >
      {/* Image/visual area per principle */}
      <motion.div
        className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/30 dark:bg-zinc-800/50 backdrop-blur-xl flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-500/5 dark:bg-brand-500/15 group-hover:bg-brand-500/10 dark:group-hover:bg-brand-500/20 transition-colors">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-brand-500/70 dark:text-brand-400/80" strokeWidth={1.5} />
          </div>
        )}
      </motion.div>
      <div className="flex-1 min-w-0">
        <span
          className={`font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter shrink-0 transition-colors duration-300 block ${
            isActive ? 'text-brand-500 dark:text-brand-400' : 'text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
          }`}
          style={{ lineHeight: 0.9, letterSpacing: '-0.02em' }}
        >
          {word}
        </span>
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl pt-1 sm:pt-2"
            >
              {displayText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const WorkEthic: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      <p className="text-zinc-600 dark:text-zinc-400 text-sm uppercase tracking-widest mb-10 max-w-xl rounded-xl bg-white/35 dark:bg-zinc-950/45 backdrop-blur-xl px-5 py-3 inline-block">
        How I show up day to day — principles I lean on.
      </p>
      <div className="flex flex-col">
        {principles.map((item, index) => (
          <HoverReveal
            key={item.word}
            word={item.word}
            description={item.description}
            image={item.image}
            Icon={item.Icon}
            isActive={activeIndex === index}
            onHover={() => setActiveIndex(index)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkEthic
