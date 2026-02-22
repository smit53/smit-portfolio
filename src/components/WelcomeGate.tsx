import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface WelcomeGateProps {
  onEnter: (name: string) => void
}

const WelcomeGate: React.FC<WelcomeGateProps> = ({ onEnter }) => {
  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      onEnter(trimmed)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(250,204,21,0.03),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-400/[0.02] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 text-amber-400/80 text-sm font-medium tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            Welcome
          </motion.div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tight mb-4 leading-tight">
            I'm glad you're here
          </h1>
          <p className="text-zinc-500 text-lg max-w-sm mx-auto">
            Before we begin — I'd love to know who I'm sharing this with.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Your name"
              className="w-full px-5 py-4 bg-zinc-900/60 border rounded-2xl text-zinc-100 placeholder-zinc-600 text-lg focus:outline-none transition-all duration-300"
              style={{
                borderColor: isFocused ? 'rgba(250, 204, 21, 0.3)' : 'rgba(39, 39, 42, 0.8)',
                boxShadow: isFocused ? '0 0 0 1px rgba(250, 204, 21, 0.2)' : 'none',
              }}
              autoFocus
            />
          </div>
          <motion.button
            type="submit"
            disabled={!name.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-zinc-100 text-zinc-900 font-semibold text-base rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white disabled:hover:bg-zinc-100"
            whileHover={name.trim() ? { scale: 1.01 } : {}}
            whileTap={name.trim() ? { scale: 0.99 } : {}}
          >
            Continue
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-zinc-600 text-sm mt-10"
        >
          Software Engineer • Indiana University
        </motion.p>
      </motion.div>
    </div>
  )
}

export default WelcomeGate
