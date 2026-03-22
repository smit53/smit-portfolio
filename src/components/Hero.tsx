import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TextScramble from './TextScramble'
import RotatingPhrase from './RotatingPhrase'
import ParticleText from './ParticleText'
import { useSection } from '../context/SectionContext'

interface HeroProps {
  visitorName: string | null
}

const Hero: React.FC<HeroProps> = ({ visitorName }) => {
  const { goToNextSection } = useSection()
  const [p1Done, setP1Done] = useState(false)
  const [p2Done, setP2Done] = useState(false)
  const [p3Done, setP3Done] = useState(false)
  const [showRotatingPhrase, setShowRotatingPhrase] = useState(false)

  const welcomeLine = visitorName
    ? `${visitorName} — glad you're here.`
    : "Glad you're here."

  const scrambleSpeed = 28
  const scrambleWidth = 2

  return (
    <div className="relative z-10 w-full">
      {/* SMIT — particle hero name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="mb-4 sm:mb-6"
      >
        <ParticleText
          text="SMIT"
          fontWeight="900"
          fontFamily="Syne, sans-serif"
          particleSize={2.5}
          particleGap={4}
          repulsionRadius={140}
          repulsionStrength={8}
          returnSpeed={0.09}
          damping={0.87}
          maxFontSize={420}
        />
      </motion.div>

      {/* Personalized sub-line */}
      <motion.p
        className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35 }}
      >
        {welcomeLine}
      </motion.p>

      {/* Accent divider */}
      <motion.div
        className="flex items-center gap-2 mb-8 sm:mb-10"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-px w-10 bg-brand-500" />
        <div className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
        <div className="h-px w-20 bg-zinc-200 dark:bg-zinc-800" />
      </motion.div>

      {/* Description paragraphs — TextScramble */}
      <motion.div
        className="space-y-4 sm:space-y-5 mb-10 sm:mb-14"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
        }}
      >
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.45]"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <TextScramble
            text="I'm a software engineer building AI-powered solutions at Intuit. I care about clean systems, thoughtful design, and shipping with impact."
            triggerOnMount
            delay={900}
            speed={scrambleSpeed}
            scrambleWidth={scrambleWidth}
            onComplete={() => setP1Done(true)}
            className={p1Done ? 'fluid-text' : 'text-black dark:text-white'}
          />
        </motion.p>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.45]"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <TextScramble
            text="I believe in clean code, thoughtful design, and systems that grow with care."
            triggerOnMount
            delay={3600}
            speed={scrambleSpeed}
            scrambleWidth={scrambleWidth}
            onComplete={() => setP2Done(true)}
            className={p2Done ? 'fluid-text' : 'text-black dark:text-white'}
          />
        </motion.p>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.45]"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <TextScramble
            text="When I'm not shipping features, I'm exploring new tech, traveling, or diving into "
            triggerOnMount
            delay={6000}
            speed={scrambleSpeed}
            scrambleWidth={scrambleWidth}
            onComplete={() => {
              setP3Done(true)
              setShowRotatingPhrase(true)
            }}
            className={p3Done ? 'fluid-text' : 'text-black dark:text-white'}
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

      {/* Scroll hint */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <button
          onClick={goToNextSection}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200 group cursor-pointer"
        >
          scroll
          <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
        </button>
      </motion.div>
    </div>
  )
}

export default Hero
