import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, FileDown, Sparkles } from 'lucide-react'
import { useConsole } from '../context/ConsoleContext'

const BASE = import.meta.env.BASE_URL

function formatTime24(d: Date) {
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  const s = d.getSeconds().toString().padStart(2, '0')
  const ms = d.getMilliseconds().toString().padStart(3, '0')
  return `${h}:${m}:${s}.${ms}`
}

const links = [
  { icon: Mail, href: 'mailto:smit.borasaniya@gmail.com', label: 'smit.borasaniya@gmail.com' },
  { icon: MapPin, href: null, label: 'Mountain View, CA' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/smitborasaniya', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/smit53', label: 'GitHub' },
  { icon: FileDown, href: `${BASE}Smit_Borasaniya_Resume.pdf`, label: 'Resume', download: true },
]

const KeepInTouch: React.FC = () => {
  const { setOpen } = useConsole()
  const [t, setT] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 50)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {links.map((item, i) => {
          const Icon = item.icon
          const node = (
            <span className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-500 shrink-0" aria-hidden />
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={item.download ? '' : undefined}
                  className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          )
          return (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
            >
              {node}
              {i < links.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-600" aria-hidden> · </span>
              )}
            </motion.span>
          )
        })}
      </div>
      <motion.p
        className="mt-8 text-lg text-zinc-500 dark:text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Projects, collaboration, or a quick hello — I'd love to hear from you.
      </motion.p>

      <div className="mt-12 flex flex-wrap items-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
        <span className="font-mono tabular-nums tracking-tight" aria-label="Current time (24h)">
          {formatTime24(t)}
        </span>
        <span aria-hidden>·</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
        >
          <Sparkles className="w-4 h-4" aria-hidden />
          Assistant
        </button>
      </div>
    </motion.div>
  )
}

export default KeepInTouch
