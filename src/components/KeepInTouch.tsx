import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, FileDown } from 'lucide-react'
import MagneticWrap from './MagneticWrap'

const BASE = import.meta.env.BASE_URL

const links = [
  { icon: Mail, label: 'Email', href: 'mailto:smit.borasaniya@gmail.com', value: 'smit.borasaniya@gmail.com' },
  { icon: MapPin, label: 'Location', href: null, value: 'Mountain View, CA' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/smitborasaniya', value: 'linkedin.com/in/smitborasaniya' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/smit53', value: 'github.com/smit53' },
  { icon: FileDown, label: 'Resume', href: `${BASE}Smit_Borasaniya_Resume.pdf`, value: 'Download Resume', download: true },
]

const KeepInTouch: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-6">
        {links.map((link, index) => (
          <MagneticWrap key={link.label}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {link.href ? (
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...('download' in link && link.download ? { download: '' } : {})}
                className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:border-brand-500/30 dark:hover:border-brand-500/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/20 dark:border-brand-500/30 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                  <link.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">{link.label}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">{link.value}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                  <link.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">{link.label}</p>
                  <p className="text-zinc-900 dark:text-zinc-100">{link.value}</p>
                </div>
              </div>
            )}
          </motion.div>
          </MagneticWrap>
        ))}
      </div>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Whether it's a project, collaboration, or just a hello — I'd love to hear from you.</p>
    </div>
  )
}

export default KeepInTouch
