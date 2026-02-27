import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextScramble from './TextScramble'

const interests: Array<{
  title: string
  description: string
  size: 'sm' | 'md' | 'lg'
  tilt?: number
  gif?: string
}> = [
  {
    title: 'Volleyball',
    description:
      'I play for the rush of the rally—teamwork, quick decisions, and that moment when the ball finds the perfect pass.',
    size: 'lg',
    tilt: -0.5,
    gif: 'https://media1.giphy.com/media/3o7btPCcdNniyf0ArS/200w.gif',
  },
  {
    title: 'Reading',
    description:
      'Books are my reset. Fiction, tech, philosophy—every book shifts how I think about work and life.',
    size: 'md',
    gif: 'https://media1.giphy.com/media/3o85xrRijSEEDoYikg/200w.gif',
  },
  {
    title: 'Marathons',
    description:
      'Long runs teach patience, pacing, and pushing through when it gets hard—on the road and off.',
    size: 'lg',
    tilt: 0.5,
    gif: 'https://media1.giphy.com/media/l0MYt5jPR6QX5nqFO/200w.gif',
  },
  {
    title: 'Building software',
    description:
      'Crafting elegant solutions to complex problems. Flow in turning ideas into working systems.',
    size: 'md',
    tilt: 0.3,
    gif: 'https://media1.giphy.com/media/26tn33aiTi1jkl6H6/200w.gif',
  },
  {
    title: 'AI & ML',
    description:
      'Fascinated by how machines learn. I explore the intersection of automation and human intuition.',
    size: 'sm',
    gif: 'https://media1.giphy.com/media/3o7abKhOpu0NwenH3O/200w.gif',
  },
  {
    title: 'Adventure & travel',
    description:
      'New places reshape perspective. I seek experiences that challenge how I think.',
    size: 'md',
    tilt: -0.3,
    gif: 'https://media1.giphy.com/media/3o7TKsQ8MJHyTASOry/200w.gif',
  },
  {
    title: 'Continuous learning',
    description:
      'Always exploring—new tech, design, philosophy. I read, take courses, and tinker.',
    size: 'sm',
    gif: 'https://media1.giphy.com/media/3o6Zt6ML6BklvQk5fi/200w.gif',
  },
  {
    title: 'Deep work',
    description:
      'I value uninterrupted blocks for complex tasks. Calm environments and clear priorities.',
    size: 'md',
    tilt: 0.4,
    gif: 'https://media1.giphy.com/media/26u4cqiYI30juCOGY/200w.gif',
  },
  {
    title: 'Teaching & sharing',
    description:
      'I enjoy explaining ideas and helping others level up. Knowledge grows when shared.',
    size: 'sm',
    tilt: -0.2,
    gif: 'https://media1.giphy.com/media/26u4cqiYI30juCOGY/200w.gif',
  },
]

const sizeClasses = {
  sm: 'text-base sm:text-lg',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl md:text-4xl',
}

// Fallback when a topic's GIF fails to load (e.g. CORS or 404)
const FALLBACK_GIF = 'https://media1.giphy.com/media/26tn33aiTi1jkl6H6/200w.gif'

const Interests: React.FC = () => {
  const [introDone, setIntroDone] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const activeItem = interests.find((i) => i.title === active)

  return (
    <div className="space-y-12 sm:space-y-16 pb-8">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[240px] flex flex-col justify-end p-8 sm:p-10 bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-700"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,107,0,0.06),transparent)] pointer-events-none" />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-brand-500 dark:text-brand-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2"
          >
            Beyond the screen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-zinc-100 tracking-tight max-w-2xl"
          >
            <TextScramble text="What I'm into." triggerOnMount delay={1100} speed={18} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-zinc-400 dark:text-zinc-500 text-sm sm:text-base mt-3 max-w-xl"
          >
            Hover a word to see what it means to me.
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Scattered words: no grid, no cards – flex wrap, varied sizes, slight tilts; extra padding so descenders (g,y,p) aren't clipped */}
            <div className="flex flex-wrap gap-x-5 gap-y-5 sm:gap-x-8 sm:gap-y-6 justify-center sm:justify-start items-baseline overflow-visible pb-2">
              {interests.map((item, index) => (
                <motion.button
                  key={item.title}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: item.tilt ?? 0,
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.04 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setActive(item.title)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(item.title)}
                  onBlur={() => setActive(null)}
                  className={`
                    font-sans font-semibold tracking-tight text-left
                    leading-relaxed pb-1.5 pt-0.5
                    text-zinc-600 dark:text-zinc-400
                    hover:text-brand-500 dark:hover:text-brand-400
                    transition-colors duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-offset-zinc-950
                    ${sizeClasses[item.size]}
                    ${active === item.title ? 'text-brand-500 dark:text-brand-400' : ''}
                  `}
                >
                  <span className="relative inline-block pb-0.5 overflow-visible">
                    {item.title}
                    <motion.span
                      className="absolute bottom-0.5 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: active === item.title ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </motion.button>
              ))}
            </div>

            {/* One shared detail area: GIF behind when hovered, then type on top */}
            <div className="relative min-h-[140px] sm:min-h-[160px] rounded-2xl overflow-hidden flex flex-col justify-center">
              {/* GIF background when an interest is hovered */}
              <AnimatePresence mode="wait">
                {activeItem?.gif && (
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-0"
                  >
                    <img
                      src={activeItem.gif}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget
                        if (el.src !== FALLBACK_GIF) el.src = FALLBACK_GIF
                      }}
                    />
                    <div className="absolute inset-0 bg-zinc-900/75 dark:bg-zinc-950/80" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6">
                <AnimatePresence mode="wait">
                  {activeItem ? (
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="pl-0 sm:pl-1 border-l-0 sm:border-l-2 border-brand-500/50 dark:border-brand-400/50 sm:pl-5"
                    >
                      <p className="text-zinc-100 dark:text-zinc-200 text-base sm:text-lg leading-relaxed max-w-2xl drop-shadow-sm">
                        {activeItem.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-zinc-500 dark:text-zinc-500 text-sm sm:text-base italic"
                    >
                      Hover a word above to see what it means to me.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Interests
