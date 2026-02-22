import { motion } from 'framer-motion'

const categories = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'Go', 'R', 'SQL'] },
  { label: 'Infrastructure & Cloud', items: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'CI/CD'] },
  { label: 'Data & ML', items: ['TensorFlow', 'MLflow', 'Airflow', 'MongoDB', 'PostgreSQL'] },
  { label: 'Tools', items: ['Playwright', 'Prometheus', 'Tableau', 'Power BI', 'GitLab'] },
]

const Capabilities: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.flatMap((cat, catIndex) =>
          cat.items.map((item, itemIndex) => (
            <motion.span
              key={`${cat.label}-${item}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (catIndex * 4 + itemIndex) * 0.02, ease: [0.22, 1, 0.36, 1] }}
              className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-medium hover:border-zinc-600 hover:text-zinc-200 transition-all duration-300"
            >
              {item}
            </motion.span>
          ))
        )}
      </div>
    </div>
  )
}

export default Capabilities
