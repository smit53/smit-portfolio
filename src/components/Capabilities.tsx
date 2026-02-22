import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'

const categories = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'Go', 'R', 'SQL', 'Groovy', 'Bash'] },
  { label: 'Infrastructure & Cloud', items: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Argo CD', 'CI/CD', 'Jenkins'] },
  { label: 'Data & ML', items: ['TensorFlow', 'MLflow', 'Airflow', 'MongoDB', 'PostgreSQL', 'Neo4j', 'Cassandra', 'MySQL'] },
  { label: 'Observability & Ops', items: ['Prometheus', 'Grafana', 'Wavefront', 'Splunk', 'Datadog', 'PagerDuty', 'JIRA'] },
  { label: 'Analytics & BI', items: ['Tableau', 'Power BI', 'Qlik Sense'] },
  { label: 'Tools & Practices', items: ['Playwright', 'GitLab', 'REST API', 'Redis'] },
]

const Capabilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const springConfig = { damping: 30, stiffness: 200 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(y * 4)
      rotateY.set(-x * 4)
    },
    [rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  let itemIndex = 0
  return (
    <div className="space-y-6">
      <p className="text-zinc-500 text-base leading-relaxed max-w-2xl">
        A mix of languages, platforms, and tools I use day to day—and a few I keep sharp for the right problem.
      </p>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
        }}
        className="min-h-[320px] rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 sm:p-8 transition-colors duration-300 hover:border-zinc-700/80"
      >
        <div className="flex flex-wrap gap-4 sm:gap-5 content-start">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col gap-2 w-full sm:w-auto">
              <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{cat.label}</span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {cat.items.map((name) => {
                  const idx = itemIndex++
                  return (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.5), ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.08, y: -6 }}
                      className="inline-flex px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-sm font-medium hover:border-amber-500/40 hover:text-zinc-200 hover:bg-zinc-800/60 cursor-default transition-colors duration-200"
                    >
                      {name}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Capabilities
