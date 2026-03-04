import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextScramble from './TextScramble'
import RotatingPhrase from './RotatingPhrase'

interface HeroProps {
  visitorName: string | null
  /** When true, do not render the welcome line (used when HeadingRevealLayout shows it). */
  skipWelcomeLine?: boolean
}

const Hero: React.FC<HeroProps> = ({ visitorName, skipWelcomeLine }) => {
  const [welcomeDone, setWelcomeDone] = useState(false)
  const [p1Done, setP1Done] = useState(false)
  const [p2Done, setP2Done] = useState(false)
  const [p3Done, setP3Done] = useState(false)
  const [showRotatingPhrase, setShowRotatingPhrase] = useState(false)

  const welcomeLine = visitorName
    ? `${visitorName} — glad you're here.`
    : "Glad you're here."

  /* Slower scramble: speed = ms per character (higher = calmer). Stagger delays so each line finishes before the next. */
  const scrambleSpeed = 28
  const scrambleWidth = 2

  return (
    <div className="relative z-10 w-full">
      <motion.div
        className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-brand-500/[0.06] dark:bg-brand-400/[0.06] blur-[100px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-zinc-400/[0.04] dark:bg-zinc-500/[0.04] blur-[80px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />

      <div className="relative flex flex-col w-full">
        {!skipWelcomeLine && (
          <motion.p
            className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[1.05] tracking-tighter mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextScramble
              text={welcomeLine}
              triggerOnMount
              delay={400}
              speed={scrambleSpeed}
              scrambleWidth={scrambleWidth}
              onComplete={() => setWelcomeDone(true)}
              className={welcomeDone ? 'fluid-text' : 'text-zinc-700 dark:text-zinc-300'}
            />
          </motion.p>
        )}

        <motion.div
          className="space-y-8 sm:space-y-10 lg:space-y-12 mb-16 sm:mb-24"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18, delayChildren: 0.8 },
            },
          }}
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.35] font-bold"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextScramble
              text="I'm a software engineer building AI-powered solutions at Intuit. I care about clean systems, thoughtful design, and shipping with impact."
              triggerOnMount
              delay={1200}
              speed={scrambleSpeed}
              scrambleWidth={scrambleWidth}
              onComplete={() => setP1Done(true)}
              className={p1Done ? 'fluid-text' : 'text-zinc-600 dark:text-zinc-400'}
            />
          </motion.p>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.35] font-bold"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextScramble
              text="I believe in clean code, thoughtful design, and systems that grow with care."
              triggerOnMount
              delay={3800}
              speed={scrambleSpeed}
              scrambleWidth={scrambleWidth}
              onComplete={() => setP2Done(true)}
              className={p2Done ? 'fluid-text' : 'text-zinc-600 dark:text-zinc-400'}
            />
          </motion.p>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.35] font-bold"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextScramble
              text="When I'm not shipping features, I'm exploring new tech, traveling, or diving into "
              triggerOnMount
              delay={6400}
              speed={scrambleSpeed}
              scrambleWidth={scrambleWidth}
              onComplete={() => {
                setP3Done(true)
                setShowRotatingPhrase(true)
              }}
              className={p3Done ? 'fluid-text' : 'text-zinc-600 dark:text-zinc-400'}
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
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
