import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Sparkles, Clock } from 'lucide-react'
import { useConsole } from '../context/ConsoleContext'

const footerLinks = [
  { href: 'https://github.com/smit53', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/smitborasaniya', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:smit.borasaniya@gmail.com', label: 'Email', icon: Mail },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

const Footer: React.FC = () => {
  const { setOpen } = useConsole()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.footer
      className="shrink-0 border-t border-white/20 dark:border-zinc-800/60 py-10 px-4 sm:px-6 min-h-[14vh] flex items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
        {/* Copyright + clock */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
            © {now.getFullYear()} Smit Borasaniya
          </p>
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Clock className="w-4 h-4 text-brand-500 dark:text-brand-400 shrink-0" aria-hidden />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 tabular-nums">
                {formatTime(now)}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {formatDate(now)}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Links + assistant CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {footerLinks.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm font-medium transition-colors relative group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 group-hover:border-brand-500/40 dark:group-hover:border-brand-500/40"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </motion.span>
                <span>{link.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full group-hover:w-full"
                  transition={{ duration: 0.25 }}
                  style={{ bottom: -2 }}
                />
              </motion.a>
            )
          })}
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm font-medium transition-colors relative group"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.33 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 dark:border-brand-500/30"
              whileHover={{ rotate: [0, 12, -12, 0], transition: { duration: 0.35 } }}
            >
              <Sparkles className="w-4 h-4 text-brand-500 dark:text-brand-400" aria-hidden />
            </motion.span>
            <span>Open the assistant</span>
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full group-hover:w-full"
              transition={{ duration: 0.25 }}
              style={{ bottom: -2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
