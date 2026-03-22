import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Code2, Rocket, Sparkles } from 'lucide-react'
import { useVisitor, Persona } from '../context/VisitorContext'
import MotionButton from './ui/MotionButton'
import WelcomeBackground from './WelcomeBackground'
import GridHoverEffect from './GridHoverEffect'

const spring = { type: 'spring' as const, stiffness: 380, damping: 28 }
const springBounce = { type: 'spring' as const, stiffness: 320, damping: 24 }
const stagger = { staggerChildren: 0.07, delayChildren: 0.12 }

const pageTransition = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.99, y: -6 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

const nameStepVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}
const nameStepTitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
const nameStepSubVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const personas: {
  id: Persona
  label: string
  headline: string
  description: string
  icon: typeof BarChart3
}[] = [
  {
    id: 'recruiter',
    label: "I'm a recruiter",
    headline: 'Show me the impact',
    description:
      "I want to see results, scale, and how you'd fit our team. Skip the fluff — show me what matters.",
    icon: BarChart3,
  },
  {
    id: 'engineer',
    label: "I'm an engineer",
    headline: 'Show me the craft',
    description:
      "I'm curious about how you build: architecture, tradeoffs, and the code behind the product.",
    icon: Code2,
  },
  {
    id: 'founder',
    label: "I'm a founder",
    headline: 'Show me the thinking',
    description:
      'I care about product sense, user focus, and how you turn ideas into something people love.',
    icon: Rocket,
  },
]

const WelcomeGate: React.FC = () => {
  const { visitorName, setVisitorName, isReturning, setPersona, resetVisitor } = useVisitor()
  const [nameInput, setNameInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [step, setStep] = useState<'who' | 'name' | 'persona'>(
    isReturning ? 'who' : 'name'
  )

  const handleWhoContinue = () => setStep('persona')
  const handleWhoSomeoneElse = () => {
    resetVisitor()
    setNameInput('')
    setStep('name')
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (trimmed) {
      setVisitorName(trimmed)
      setStep('persona')
    }
  }

  const handlePersonaSelect = (p: Persona) => setPersona(p)

  return (
    <div
      className="fixed inset-0 z-[100] bg-white dark:bg-black overflow-auto overscroll-none"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        boxSizing: 'border-box',
      }}
    >
      <WelcomeBackground />
      <div className="absolute inset-0 z-[1]">
        <GridHoverEffect
          gridSize={22}
          backgroundColor="transparent"
          borderColor="rgba(255,255,255,0.05)"
          borderWidth={1}
          showCursor={false}
        />
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-4 sm:px-10 lg:px-16 py-12 sm:py-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {step === 'who' && visitorName && (
            <motion.div
              key="who"
              {...pageTransition}
              className="w-full max-w-xl mx-auto flex flex-col items-center text-center pointer-events-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.1 }}
                className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight"
              >
                Welcome back, {visitorName}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.2 }}
                className="text-zinc-500 dark:text-zinc-400 text-lg mt-6"
              >
                Good to see you again. Still you, or is someone else taking a look?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.3 }}
                className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <MotionButton variant="primary" onClick={handleWhoContinue}>
                  Yep, that's me
                </MotionButton>
                <MotionButton variant="outline" onClick={handleWhoSomeoneElse}>
                  Someone else
                </MotionButton>
              </motion.div>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div
              key="name"
              {...pageTransition}
              className="w-full max-w-2xl mx-auto flex flex-col items-center pointer-events-auto"
            >
              <motion.div
                variants={{ visible: { transition: stagger } }}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                <motion.span
                  variants={nameStepVariants}
                  transition={spring}
                  className="inline-flex items-center gap-2 text-brand-500 dark:text-brand-400 font-medium text-sm tracking-wide uppercase mb-5"
                >
                  <Sparkles className="w-4 h-4" />
                  Hey there
                </motion.span>
                <motion.h1
                  variants={nameStepTitleVariants}
                  transition={spring}
                  className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.08] max-w-2xl"
                >
                  What's your name?
                </motion.h1>
                <motion.p
                  variants={nameStepSubVariants}
                  transition={spring}
                  className="text-zinc-500 dark:text-zinc-400 text-lg mt-5 max-w-md"
                >
                  First name's all I need — I'll make this feel a little more personal.
                </motion.p>
              </motion.div>

              <motion.form
                onSubmit={handleNameSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.45 }}
                className="mt-14 w-full max-w-md flex flex-col sm:flex-row gap-4 sm:items-center justify-center"
              >
                <motion.input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="e.g. Alex"
                  className="flex-1 min-w-0 px-5 py-4 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border-2 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-lg font-medium focus:outline-none focus:border-brand-500/50 dark:focus:border-brand-400/50 transition-colors shadow-sm"
                  style={{
                    borderColor: isFocused ? 'rgba(255, 107, 0, 0.5)' : undefined,
                  }}
                  autoFocus
                  whileFocus={{ scale: 1.02 }}
                  transition={spring}
                />
                <MotionButton type="submit" disabled={!nameInput.trim()}>
                  Let's go
                </MotionButton>
              </motion.form>
            </motion.div>
          )}

          {step === 'persona' && (
            <motion.div
              key="persona"
              {...pageTransition}
              className="w-full max-w-5xl mx-auto flex flex-col items-center py-6 pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.08 }}
                className="text-center max-w-xl mb-4"
              >
                <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.15]">
                  Nice to meet you! What brings you here?
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg">
                  No wrong answer — just helps me show you the most relevant stuff first.
                </p>
              </motion.div>

              <motion.div
                className="mt-10 sm:mt-12 w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-3xl"
              >
                {personas.map((p, i) => {
                  return (
                  <motion.button
                    key={p.id}
                    type="button"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springBounce, delay: 0.18 + i * 0.08 }}
                    onClick={() => handlePersonaSelect(p.id)}
                    className="group flex-1 text-left px-6 py-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/60 hover:border-brand-500/60 dark:hover:border-brand-500/40 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 transition-all duration-200 focus:outline-none backdrop-blur-sm"
                    whileHover={{ y: -4, transition: springBounce }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p.icon className="w-5 h-5 text-zinc-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors mb-3" strokeWidth={1.5} />
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                      {p.label}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </motion.button>
                  )
                })}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8 text-zinc-400 dark:text-zinc-500 text-sm text-center"
              >
                You can always explore everything freely after.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WelcomeGate
