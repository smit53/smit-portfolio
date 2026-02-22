import { motion } from 'framer-motion'

const categories = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'Go', 'R', 'SQL', 'Groovy', 'Bash'],
  },
  {
    label: 'Infrastructure & Cloud',
    items: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Argo CD', 'CI/CD', 'Jenkins'],
  },
  {
    label: 'Data & ML',
    items: ['TensorFlow', 'MLflow', 'Airflow', 'MongoDB', 'PostgreSQL', 'Neo4j', 'Cassandra', 'MySQL'],
  },
  {
    label: 'Observability & Ops',
    items: ['Prometheus', 'Grafana', 'Wavefront', 'Splunk', 'Datadog', 'PagerDuty', 'JIRA'],
  },
  {
    label: 'Analytics & BI',
    items: ['Tableau', 'Power BI', 'Qlik Sense'],
  },
  {
    label: 'Tools & Practices',
    items: ['Playwright', 'GitLab', 'REST API', 'Redis'],
  },
]

const Capabilities: React.FC = () => {
  return (
    <div className="space-y-10">
      <p className="text-zinc-500 text-base leading-relaxed max-w-2xl">
        A mix of languages, platforms, and tools I use day to day—and a few I keep sharp for the right problem.
      </p>
      <div className="space-y-8">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-zinc-400 text-sm font-medium mb-3">{cat.label}</h3>
            <div className="flex flex-wrap gap-3">
              {cat.items.map((item, itemIndex) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: catIndex * 0.05 + itemIndex * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-medium hover:border-zinc-600 hover:text-zinc-200 transition-all duration-300"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Capabilities
