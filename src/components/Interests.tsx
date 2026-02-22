import { motion } from 'framer-motion'
import { Code2, Sparkles, Mountain, BookOpen, Coffee, MessageCircle } from 'lucide-react'

const interests = [
  {
    icon: Code2,
    title: 'Building software',
    description: 'Crafting elegant solutions to complex problems. I find flow in turning ideas into working systems—whether it\'s a script that saves hours or an architecture that scales.',
  },
  {
    icon: Sparkles,
    title: 'AI & ML',
    description: 'Fascinated by how machines learn. I explore the intersection of automation and human intuition, from recommendation systems to intelligent monitoring.',
  },
  {
    icon: Mountain,
    title: 'Adventure & travel',
    description: 'New places reshape perspective. I seek experiences that challenge how I think and work—different cultures, landscapes, and problems outside the screen.',
  },
  {
    icon: BookOpen,
    title: 'Continuous learning',
    description: 'Always exploring—new tech, design, philosophy. I read, take courses, and tinker. Learning keeps the work fresh and the mind sharp.',
  },
  {
    icon: Coffee,
    title: 'Deep work & focus',
    description: 'I value uninterrupted blocks for complex tasks. Calm environments, clear priorities, and the occasional coffee help me do my best thinking.',
  },
  {
    icon: MessageCircle,
    title: 'Teaching & sharing',
    description: 'I enjoy explaining ideas and helping others level up. Whether it\'s pair debugging, writing docs, or sharing what I\'ve learned—knowledge grows when shared.',
  },
]

const Interests: React.FC = () => {
  return (
    <div className="space-y-8">
      <p className="text-zinc-500 text-base leading-relaxed max-w-2xl">
        Beyond my day job, these are the themes that shape how I work and what I care about.
      </p>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {interests.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-500"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-amber-400/90 group-hover:bg-amber-500/10 transition-colors duration-500">
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-zinc-100 mb-2 text-lg">{item.title}</h3>
                <p className="text-zinc-500 text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Interests
