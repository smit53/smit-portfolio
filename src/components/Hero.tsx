import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RotatingPhrase from './RotatingPhrase'
import TextScramble from './TextScramble'

interface HeroProps {
  visitorName: string | null
}

const Hero: React.FC<HeroProps> = ({ visitorName }) => {
  const [showRotatingPhrase, setShowRotatingPhrase] = useState(false)

  const welcomeLine = visitorName
    ? `${visitorName} — glad you're here.`
    : "Glad you're here."

  return (
    <div className="relative z-10 w-full">
      {/* Ambient background */}
      <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-brand-500/[0.06] dark:bg-brand-400/[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-zinc-400/[0.04] dark:bg-zinc-500/[0.04] blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col">
        {/* Monogram: subtle, not the main focus */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span className="inline-flex items-baseline gap-1 font-display text-sm font-semibold tracking-[0.35em] uppercase text-brand-500 dark:text-brand-400">
            Smit Borasaniya
          </span>
        </motion.div>

        {/* Hero line: name + hook */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <p className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.15] tracking-tight max-w-3xl">
            <TextScramble
              text={welcomeLine}
              triggerOnMount
              delay={300}
              speed={16}
            />
          </p>
        </motion.div>

        {/* Three lines: same format and size */}
        <div className="space-y-5 max-w-2xl mb-20 sm:mb-28">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            <TextScramble
              text="I'm a software engineer building AI-powered solutions at Intuit. I care about clean systems, thoughtful design, and shipping with impact."
              triggerOnMount
              delay={800}
              speed={12}
            />
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            <TextScramble
              text="I believe in clean code, thoughtful design, and systems that grow with care."
              triggerOnMount
              delay={1400}
              speed={12}
            />
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            <TextScramble
              text="When I'm not shipping features, I'm exploring new tech, traveling, or diving into "
              triggerOnMount
              delay={2200}
              speed={12}
              onComplete={() => setShowRotatingPhrase(true)}
            />
            <AnimatePresence>
              {showRotatingPhrase && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline"
                >
                  <RotatingPhrase />.
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
