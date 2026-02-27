import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Code2, Rocket } from 'lucide-react'
import { useVisitor, Persona } from '../context/VisitorContext'

const personas: { id: Persona; label: string; tagline: string; icon: typeof BarChart3 }[] = [
  { id: 'recruiter', label: 'Recruiter', tagline: 'Show me impact and scale', icon: BarChart3 },
  { id: 'engineer', label: 'Engineer', tagline: 'Show me architecture and code', icon: Code2 },
  { id: 'founder', label: 'Founder', tagline: 'Show me product thinking', icon: Rocket },
]

const WelcomeGate: React.FC = () => {
  const { visitorName, setVisitorName, isReturning, setPersona, resetVisitor } = useVisitor()
  const [nameInput, setNameInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [step, setStep] = useState<'name' | 'persona' | 'returning'>(isReturning ? 'returning' : 'name')

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (trimmed) {
      setVisitorName(trimmed)
      setStep('persona')
    }
  }

  const handleContinueReturning = () => setStep('persona')
  const handleStartFresh = () => {
    resetVisitor()
    setNameInput('')
    setStep('name')
  }
  const handlePersonaSelect = (p: Persona) => setPersona(p)

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 overflow-hidden" style={{ boxSizing: 'border-box' }}>
      {/* Abstract background shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[80vmax] h-[80vmax] rounded-full bg-brand-500/[0.06] dark:bg-brand-500/[0.1] blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[60vmax] h-[60vmax] rounded-full bg-brand-600/[0.05] dark:bg-brand-600/[0.08] blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full border border-brand-500/10 dark:border-brand-500/20" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full border border-zinc-300/50 dark:border-zinc-600/50" />
      </div>

      <div className="relative z-10 min-h-full flex flex-col px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {step === 'returning' && (
            <motion.div
              key="returning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col min-h-full"
            >
              <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter text-left max-w-4xl">
                Welcome back,
              </h1>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-sans text-4xl sm:text-6xl font-bold text-brand-500 dark:text-brand-400 mt-4 block"
              >
                {visitorName}.
              </motion.span>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-12 max-w-sm">
                Pick up where you left off?
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleContinueReturning}
                  className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                <button
                  onClick={handleStartFresh}
                  className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm"
                >
                  Not {visitorName}? Start fresh
                </button>
              </div>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col min-h-full"
            >
              {/* Asymmetric: huge type left, form bottom-right */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-500 dark:text-brand-400 font-display text-sm font-semibold tracking-[0.3em] uppercase block mb-6"
                  >
                    Welcome
                  </motion.span>
                  <h1 className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter text-left max-w-5xl">
                    Let's get started.
                  </h1>
                </div>

                <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
                  <p className="text-zinc-500 dark:text-zinc-400 text-xl sm:text-2xl font-medium max-w-md order-2 sm:order-1">
                    What should I call you?
                  </p>
                  <motion.form
                    onSubmit={handleNameSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 sm:items-end order-1 sm:order-2 w-full sm:w-auto sm:min-w-[320px]"
                  >
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Your name"
                      className="flex-1 px-6 py-4 bg-transparent border-b-2 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-xl font-medium focus:outline-none transition-colors"
                      style={{
                        borderColor: isFocused ? 'rgba(255, 107, 0, 0.6)' : undefined,
                      }}
                      autoFocus
                    />
                    <motion.button
                      type="submit"
                      disabled={!nameInput.trim()}
                      className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 dark:hover:bg-white transition-colors"
                      whileHover={nameInput.trim() ? { scale: 1.02 } : {}}
                      whileTap={nameInput.trim() ? { scale: 0.98 } : {}}
                    >
                      Continue
                    </motion.button>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'persona' && (
            <motion.div
              key="persona"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col min-h-full"
            >
              <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter text-left leading-[0.9] max-w-3xl">
                How would you like to explore?
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-6 max-w-md text-lg">
                Choose a path — this tailors the experience.
              </p>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
                {personas.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    onClick={() => handlePersonaSelect(p.id)}
                    className="group p-6 rounded-3xl border-2 border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/90 hover:border-brand-500/50 dark:hover:border-brand-500/40 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 text-left transition-all duration-300"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-700 group-hover:bg-brand-500/10 dark:group-hover:bg-brand-500/20 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors mb-4">
                      <p.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg">{p.label}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{p.tagline}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WelcomeGate
