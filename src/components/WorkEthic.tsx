import { motion } from 'framer-motion'
import { Target, Zap, Heart } from 'lucide-react'

const principles = [
  { icon: Target, title: 'Focus on impact', description: 'I prioritize work that moves the needle. Clear goals, lean execution, measurable outcomes.' },
  { icon: Zap, title: 'Ship iteratively', description: 'Done is better than perfect. I ship often, gather feedback, and improve continuously.' },
  { icon: Heart, title: 'Collaborate with care', description: 'Strong ideas, loosely held. I listen first, disagree thoughtfully, and build trust.' },
]

const WorkEthic: React.FC = () => {
  return (
    <div className="space-y-8">
      {principles.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-6 items-start py-6 border-b border-zinc-800/50 last:border-0"
        >
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-amber-400/90">
            <item.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-zinc-100 text-lg mb-2">{item.title}</h3>
            <p className="text-zinc-500 leading-relaxed">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default WorkEthic
