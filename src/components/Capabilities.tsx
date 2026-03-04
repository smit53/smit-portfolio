import { useRef, useCallback, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

interface CategoryProof {
  bullets: string[]
  depth: 'familiar' | 'proficient' | 'expert'
}

interface Category {
  label: string
  items: string[]
  proof: CategoryProof
}

const categories: Category[] = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'Go', 'R', 'SQL', 'Groovy', 'Bash'],
    proof: {
      bullets: [
        'Python is my primary language for ML pipelines, automation scripts, and backend services',
        'JavaScript/TypeScript across React frontends and Node.js microservices',
        'Go for performance-critical CLI tooling and Kubernetes operators',
      ],
      depth: 'expert',
    },
  },
  {
    label: 'Infrastructure & Cloud',
    items: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Argo CD', 'CI/CD', 'Jenkins'],
    proof: {
      bullets: [
        'Managed CI/CD for 12+ microservices at Intuit with GitLab and Jenkins',
        'Automated disaster recovery and rollback pipelines for production K8s clusters',
        'Cost-optimized MySQL footprint through vulnerability and usage analysis',
      ],
      depth: 'expert',
    },
  },
  {
    label: 'Data & ML',
    items: ['TensorFlow', 'MLflow', 'Airflow', 'MongoDB', 'PostgreSQL', 'Neo4j', 'Cassandra', 'MySQL'],
    proof: {
      bullets: [
        'Built LSTM + ensemble forecasting pipelines with TensorFlow for Walmart data',
        'MLflow for experiment tracking and model versioning across team projects',
        'PostgreSQL query optimization yielding ~30% search performance gains',
      ],
      depth: 'proficient',
    },
  },
  {
    label: 'Observability & Ops',
    items: ['Prometheus', 'Grafana', 'Wavefront', 'Splunk', 'Datadog', 'PagerDuty', 'JIRA'],
    proof: {
      bullets: [
        'AI-powered incident prevention using Prometheus and CloudWatch metric analysis',
        'On-call support and incident response for QuickBooks Time and Payroll',
        'Built environment drift detection and reporting for microservices analytics',
      ],
      depth: 'expert',
    },
  },
  {
    label: 'Tools & Practices',
    items: ['Playwright', 'GitLab', 'REST API', 'Redis'],
    proof: {
      bullets: [
        'Playwright end-to-end test suites for AI agent validation on QuickBooks',
        'GitLab CI/CD pipelines for automated testing, deployment, and rollback',
      ],
      depth: 'proficient',
    },
  },
  {
    label: 'Analytics & BI',
    items: ['Tableau', 'Power BI', 'Qlik Sense'],
    proof: {
      bullets: [
        'Tableau dashboards that drove 35% user engagement increase at IU Ride',
        'Dashboard migration from SISENSE to Tableau and Power BI with automated reports',
      ],
      depth: 'familiar',
    },
  },
]

const depthLabels: Record<string, { label: string; width: string }> = {
  familiar: { label: 'Familiar', width: 'w-1/3' },
  proficient: { label: 'Proficient', width: 'w-2/3' },
  expert: { label: 'Expert', width: 'w-full' },
}

const Capabilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const springConfig = { damping: 30, stiffness: 200 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })
  const [showGlow, setShowGlow] = useState(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(y * 4)
      rotateY.set(-x * 4)
      setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setShowGlow(true)
    },
    [rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    setShowGlow(false)
  }, [rotateX, rotateY])

  const handleCategoryEnter = useCallback((label: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setExpandedCat(label)
  }, [])

  const handleCategoryLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setExpandedCat(null), 200)
  }, [])

  let itemIndex = 0
  return (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed max-w-2xl rounded-xl bg-white/35 dark:bg-zinc-950/45 backdrop-blur-xl px-5 py-4">
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
        className="relative min-h-[320px] rounded-2xl bg-white/30 dark:bg-zinc-800/40 backdrop-blur-xl shadow-sm p-6 sm:p-8 transition-colors duration-300 overflow-hidden"
      >
        {showGlow && (
          <div
            className="absolute pointer-events-none z-0 transition-opacity duration-300"
            style={{
              left: glowPos.x - 150,
              top: glowPos.y - 150,
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
            }}
          />
        )}
        <div className="relative z-10 flex flex-wrap gap-4 sm:gap-5 content-start">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col gap-2 w-full sm:w-auto"
              onMouseEnter={() => handleCategoryEnter(cat.label)}
              onMouseLeave={handleCategoryLeave}
            >
              <div
                className={`text-xs font-medium uppercase tracking-wider text-left transition-colors duration-200 ${
                  expandedCat === cat.label ? 'text-brand-500 dark:text-brand-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {cat.label} {expandedCat === cat.label ? '▾' : '▸'}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {cat.items.map((name) => {
                  const idx = itemIndex++
                  return (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: Math.min(idx * 0.02, 0.5), duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="inline-flex px-4 py-2.5 rounded-xl bg-white/40 dark:bg-zinc-700/50 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/70 cursor-default transition-colors duration-200"
                    >
                      {name}
                    </motion.span>
                  )
                })}
              </div>
              <AnimatePresence>
                {expandedCat === cat.label && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden w-full"
                  >
                    <div className="pt-3 pb-1 pl-1 space-y-3">
                      <ul className="space-y-1.5">
                        {cat.proof.bullets.map((b, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.3 }}
                            className="text-zinc-600 dark:text-zinc-400 text-xs flex items-start gap-2"
                          >
                            <span className="text-brand-500 dark:text-brand-400 mt-0.5 shrink-0">→</span>
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-600 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-brand-500 dark:bg-brand-400 ${depthLabels[cat.proof.depth].width}`}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          {depthLabels[cat.proof.depth].label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Capabilities
