import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import InfraFlow, { type FlowConfig } from './InfraFlow'

const workItems = [
  {
    role: 'Software Development Engineer',
    company: 'Intuit (Aerolens, LLC)',
    location: 'Mountain View, CA',
    period: 'June 2024 – Present',
    highlights: [
      'Playwright automations to test AI agents on QuickBooks',
      'Incident prevention using AI on Prometheus and CloudWatch metrics',
      'Environment drift reporting utility for microservices analytics',
      'On-call support for QuickBooks Time and Payroll infrastructure',
      'CI/CD pipelines for infrastructure, deployments, rollbacks, and disaster recovery',
    ],
  },
  {
    role: 'Associate Director',
    company: 'IU Ride, Fleet Services',
    location: 'Bloomington, IN',
    period: 'June 2023 – May 2024',
    highlights: [
      'Tableau dashboards → 35% increase in user engagement',
      'Revamped social media outreach → quadrupled service in 4 months',
    ],
  },
  {
    role: 'Data Scientist Intern',
    company: 'Infosense Pvt. Ltd.',
    location: 'Gandhinagar, India',
    period: 'January 2022 – July 2022',
    highlights: [
      '1000x data cleaning speedup with Pymongo',
      'Dashboard migration from SISENSE to Tableau and Power BI',
    ],
  },
]

interface ProjectCaseStudy {
  title: string
  context: string
  description: string
  problem: string
  metrics: { label: string; value: string }[]
  tradeoffs: string
  flow: FlowConfig
}

const projects: ProjectCaseStudy[] = [
  {
    title: 'Retail Sales Analysis & Forecasting for Walmart',
    context: 'ML • Time series',
    description: 'LSTM, Prophet, ARIMA, LightGBM on historical sales.',
    problem: 'Walmart needed accurate demand forecasting across thousands of store-product combinations.',
    metrics: [
      { label: 'Forecast accuracy gain', value: '15%' },
      { label: 'Predicted sales increase', value: '8%' },
    ],
    tradeoffs: 'Chose ensemble of LSTM + LightGBM over single-model approach.',
    flow: {
      nodes: [
        { id: 'data', label: 'Historical Data', x: 10, y: 80 },
        { id: 'clean', label: 'Data Pipeline', x: 160, y: 80 },
        { id: 'lstm', label: 'LSTM', x: 310, y: 30 },
        { id: 'prophet', label: 'Prophet', x: 310, y: 80 },
        { id: 'arima', label: 'ARIMA', x: 310, y: 130 },
        { id: 'ensemble', label: 'Ensemble', x: 470, y: 80 },
        { id: 'dash', label: 'Dashboard', x: 630, y: 80 },
      ],
      edges: [
        { from: 'data', to: 'clean' },
        { from: 'clean', to: 'lstm' },
        { from: 'clean', to: 'prophet' },
        { from: 'clean', to: 'arima' },
        { from: 'lstm', to: 'ensemble' },
        { from: 'prophet', to: 'ensemble' },
        { from: 'arima', to: 'ensemble' },
        { from: 'ensemble', to: 'dash' },
      ],
    },
  },
  {
    title: 'DineWise Restaurant Recommendation',
    context: 'Azure • Django • Python',
    description: 'Cloud-based ML recommendation system.',
    problem: 'Users struggled to find relevant restaurants; no personalization or intelligent ranking.',
    metrics: [
      { label: 'Relevance improvement', value: '80%' },
      { label: 'Data retrieval speedup', value: '40%' },
    ],
    tradeoffs: 'TF-IDF over collaborative filtering due to cold-start; Azure ML for scaling.',
    flow: {
      nodes: [
        { id: 'user', label: 'User Query', x: 10, y: 80 },
        { id: 'api', label: 'Django API', x: 160, y: 80 },
        { id: 'azure', label: 'Azure ML', x: 320, y: 40 },
        { id: 'nlp', label: 'NLTK / TF-IDF', x: 320, y: 120 },
        { id: 'rank', label: 'Ranked Results', x: 500, y: 80 },
        { id: 'ui', label: 'Restaurant UI', x: 660, y: 80 },
      ],
      edges: [
        { from: 'user', to: 'api' },
        { from: 'api', to: 'azure' },
        { from: 'api', to: 'nlp' },
        { from: 'azure', to: 'rank' },
        { from: 'nlp', to: 'rank' },
        { from: 'rank', to: 'ui' },
      ],
    },
  },
  {
    title: 'CampusHub — Event Discovery Platform',
    context: 'Full-stack • React • FastAPI',
    description: 'Event discovery, groups, and collaboration for students.',
    problem: 'No centralized way to discover campus events or get personalized recommendations.',
    metrics: [
      { label: 'Search perf gain', value: '~30%' },
      { label: 'Stack', value: 'React + FastAPI' },
    ],
    tradeoffs: 'FastAPI for async; PostgreSQL for relational event-group data.',
    flow: {
      nodes: [
        { id: 'react', label: 'React UI', x: 10, y: 80 },
        { id: 'gateway', label: 'FastAPI', x: 170, y: 80 },
        { id: 'pg', label: 'PostgreSQL', x: 340, y: 40 },
        { id: 'ml', label: 'ML Recommender', x: 340, y: 120 },
        { id: 'feed', label: 'Event Feed', x: 520, y: 80 },
      ],
      edges: [
        { from: 'react', to: 'gateway' },
        { from: 'gateway', to: 'pg' },
        { from: 'gateway', to: 'ml' },
        { from: 'pg', to: 'feed' },
        { from: 'ml', to: 'feed' },
      ],
    },
  },
  {
    title: 'Stock Market Time Series Platform',
    context: 'Django • BSE',
    description: 'Real-time stock analytics with ARIMA.',
    problem: 'Retail investors lacked accessible real-time analytics and predictive tools.',
    metrics: [
      { label: 'Accuracy improvement', value: '20%' },
      { label: 'Latency reduction', value: '95%' },
    ],
    tradeoffs: 'ARIMA for short-term patterns; Django Channels for real-time feeds.',
    flow: {
      nodes: [
        { id: 'bse', label: 'BSE Live Feed', x: 10, y: 80 },
        { id: 'ingest', label: 'Django Ingestion', x: 180, y: 80 },
        { id: 'arima', label: 'ARIMA Model', x: 370, y: 80 },
        { id: 'charts', label: 'Real-time Charts', x: 540, y: 40 },
        { id: 'alerts', label: 'Alert System', x: 540, y: 120 },
      ],
      edges: [
        { from: 'bse', to: 'ingest' },
        { from: 'ingest', to: 'arima' },
        { from: 'arima', to: 'charts' },
        { from: 'arima', to: 'alerts' },
      ],
    },
  },
]

const ROW_GAP = 12
const spring = { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1 }

function getCardState(hoveredIndex: number | null, index: number) {
  if (hoveredIndex === null) {
    if (index === 0) return 'active'
    if (index === 1) return 'neighbor'
    return 'inactive'
  }
  if (hoveredIndex === index) return 'active'
  if (index === hoveredIndex - 1 || index === hoveredIndex + 1) return 'neighbor'
  return 'inactive'
}

const cardVariants = {
  active: { flex: 2, minHeight: 220, opacity: 1 },
  neighbor: { flex: 1, minHeight: 160, opacity: 1 },
  inactive: { flex: 1, minHeight: 120, opacity: 0.55 },
}

const detailTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

function ExperienceRow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="flex flex-row items-stretch w-full overflow-hidden rounded-2xl"
      style={{ gap: ROW_GAP, minHeight: 200 }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {workItems.map((item, i) => {
        const state = getCardState(hoveredIndex, i)
        const isActive = state === 'active'
        const initial = i === 0 ? 'active' : i === 1 ? 'neighbor' : 'inactive'

        return (
          <motion.div
            key={item.company}
            layout
            variants={cardVariants}
            initial={initial}
            animate={state}
            transition={spring}
            onMouseEnter={() => setHoveredIndex(i)}
            className="flex-shrink-0 cursor-default overflow-hidden rounded-xl px-[6px] first:pl-0 last:pr-0"
          >
            <div className="w-full h-full rounded-xl bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-sm flex flex-col justify-end p-5 sm:p-6 min-h-[180px] relative">
              <div
                className="absolute inset-0 rounded-xl z-[0] pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
                }}
              />
              <div className="relative z-10 flex flex-col items-start gap-1.5">
                <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                  {item.role}
                </h3>
                <p className="text-brand-400 text-sm">{item.company}</p>
                <p className="text-zinc-500 text-xs">{item.period} · {item.location}</p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={detailTransition}
                      className="mt-4 pt-4 border-t border-white/10 w-full overflow-hidden space-y-2"
                    >
                      {item.highlights.map((h, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="text-zinc-400 text-xs sm:text-sm flex items-start gap-2 list-none"
                        >
                          <span className="text-brand-400 shrink-0">·</span>
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function ProjectRow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="flex flex-row items-stretch w-full overflow-hidden rounded-2xl"
      style={{ gap: ROW_GAP, minHeight: 200 }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {projects.map((project, i) => {
        const state = getCardState(hoveredIndex, i)
        const isActive = state === 'active'
        const initial = i === 0 ? 'active' : i === 1 ? 'neighbor' : 'inactive'

        return (
          <motion.div
            key={project.title}
            layout
            variants={cardVariants}
            initial={initial}
            animate={state}
            transition={spring}
            onMouseEnter={() => setHoveredIndex(i)}
            className="flex-shrink-0 cursor-default overflow-hidden rounded-xl px-[6px] first:pl-0 last:pr-0"
          >
            <div className="w-full h-full rounded-xl bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-sm flex flex-col justify-end p-5 sm:p-6 min-h-[180px] relative">
              <div
                className="absolute inset-0 rounded-xl z-[0] pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
                }}
              />
              <div className="relative z-10 flex flex-col items-start gap-1.5">
                <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="text-brand-400 text-sm">{project.context}</p>
                <p className="text-zinc-500 text-xs line-clamp-2">{project.description}</p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={detailTransition}
                      className="mt-4 pt-4 border-t border-white/10 w-full overflow-hidden space-y-3"
                    >
                      <p className="text-zinc-400 text-xs leading-relaxed">{project.problem}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.metrics.map((m) => (
                          <span
                            key={m.label}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-300 text-[10px] sm:text-xs"
                          >
                            <BarChart3 className="w-3 h-3" />
                            {m.label}: {m.value}
                          </span>
                        ))}
                      </div>
                      <p className="text-zinc-500 text-[10px] sm:text-xs italic">{project.tradeoffs}</p>
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1.5">Flow</p>
                        <InfraFlow config={project.flow} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Work() {
  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-8 pb-6 overflow-y-auto">
      <ExperienceRow />
      <ProjectRow />
    </div>
  )
}
