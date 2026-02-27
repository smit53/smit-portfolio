import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Layers, BarChart3 } from 'lucide-react'
import InfraFlow, { FlowConfig } from './InfraFlow'

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
      'Automated thread-dump capture across pods for debugging',
      'On-call support for QuickBooks Time and Payroll infrastructure',
      'Remediated security vulnerabilities per Intuit standards',
      'MySQL database cost footprint reduction via application vulnerability analysis',
      'CI/CD pipelines for infrastructure changes, deployments, rollbacks, and disaster recovery',
      'Responded to incidents from preventing production outages to resolving system anomalies',
    ],
  },
  {
    role: 'Associate Director',
    company: 'IU Ride, Fleet Services',
    location: 'Bloomington, IN',
    period: 'June 2023 – May 2024',
    highlights: [
      'Tableau dashboards using user data → 35% increase in user engagement',
      'Revamped social media outreach → quadrupled service in 4 months',
      'Reports for service expansion with IDS and Auxiliary services; mass and targeted campaigns',
    ],
  },
  {
    role: 'Data Scientist Intern',
    company: 'Infosense Pvt. Ltd.',
    location: 'Gandhinagar, India',
    period: 'January 2022 – July 2022',
    highlights: [
      '1000x data cleaning speedup with Pymongo (MongoDB → DataFrame in Python)',
      'Dashboard migration from SISENSE to Tableau and Power BI; automated report generation',
      'Data filtering, sorting, and sampling aligned with Data Robot, Dataiku, H2O.ai → 2x faster cleaning',
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
    problem: 'Walmart needed accurate demand forecasting across thousands of store-product combinations to optimize inventory and reduce waste.',
    metrics: [
      { label: 'Forecast accuracy gain', value: '15%' },
      { label: 'Predicted sales increase', value: '8%' },
      { label: 'Models evaluated', value: '4' },
    ],
    tradeoffs: 'Chose ensemble of LSTM + LightGBM over single-model approach. ARIMA handled seasonality well but failed on non-linear trends.',
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
    problem: 'Users struggled to find relevant restaurants. Existing search was keyword-only with no personalization or intelligent ranking.',
    metrics: [
      { label: 'Relevance improvement', value: '80%' },
      { label: 'Data retrieval speedup', value: '40%' },
    ],
    tradeoffs: 'TF-IDF was chosen over collaborative filtering due to cold-start constraints. Azure ML provided managed scaling but added vendor lock-in.',
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
    problem: 'Students had no centralized way to discover campus events, form interest groups, or get personalized recommendations.',
    metrics: [
      { label: 'Search perf gain', value: '~30%' },
      { label: 'Stack', value: 'React + FastAPI' },
    ],
    tradeoffs: 'FastAPI was chosen over Express for async performance. PostgreSQL beat MongoDB due to relational event-group data.',
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
    problem: 'Retail investors lacked accessible real-time analytics tools. Existing platforms were slow and lacked predictive capabilities.',
    metrics: [
      { label: 'Accuracy improvement', value: '20%' },
      { label: 'Latency reduction', value: '95%' },
    ],
    tradeoffs: 'ARIMA was sufficient for short-term patterns but struggled with sudden market shifts. Django Channels handled real-time feeds.',
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

function ExperienceReveal({
  item,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  item: (typeof workItems)[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-5 sm:py-6 border-b border-zinc-200 dark:border-zinc-700 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ transformPerspective: 800 }}
      whileHover={{ x: 4 }}
    >
      <motion.div
        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-600 bg-gradient-to-br from-brand-500/10 to-brand-600/5 dark:from-brand-500/20 dark:to-brand-600/10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-brand-500 dark:text-brand-400" strokeWidth={1.5} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <span
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight block transition-colors duration-300 ${
            isActive ? 'text-brand-500 dark:text-brand-400' : 'text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
          }`}
          style={{ lineHeight: 1.1 }}
        >
          {item.role}
        </span>
        <p className="text-brand-500 dark:text-brand-400 text-sm sm:text-base mt-0.5">{item.company}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">{item.period} · {item.location}</p>
        <AnimatePresence>
          {isActive && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {item.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base flex items-start gap-2"
                >
                  <span className="text-brand-500 dark:text-brand-400 shrink-0">·</span>
                  <span>{h}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function ProjectReveal({
  project,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  project: ProjectCaseStudy
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-5 sm:py-6 border-b border-zinc-200 dark:border-zinc-700 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ transformPerspective: 800 }}
      whileHover={{ x: 4 }}
    >
      <motion.div
        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-600 bg-gradient-to-br from-brand-500/10 to-brand-600/5 dark:from-brand-500/20 dark:to-brand-600/10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-brand-500 dark:text-brand-400" strokeWidth={1.5} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <span
          className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight block transition-colors duration-300 ${
            isActive ? 'text-brand-500 dark:text-brand-400' : 'text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
          }`}
          style={{ lineHeight: 1.15 }}
        >
          {project.title}
        </span>
        <p className="text-brand-500 dark:text-brand-400 text-xs sm:text-sm mt-0.5">{project.context}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 line-clamp-1">{project.description}</p>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 space-y-4 overflow-hidden"
            >
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.problem}</p>
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 text-xs font-medium"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {m.label}: {m.value}
                  </span>
                ))}
              </div>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed italic">{project.tradeoffs}</p>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-600">
                <p className="text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wider mb-2">Flow</p>
                <InfraFlow config={project.flow} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const Work: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<number | null>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <div className="space-y-16 pb-8">
      <div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest mb-8 max-w-xl">
          Where I've built — roles and impact.
        </p>
        <div className="flex flex-col">
          {workItems.map((item, index) => (
            <ExperienceReveal
              key={item.company}
              item={item}
              index={index}
              isActive={activeExperience === index}
              onHover={() => setActiveExperience(index)}
              onLeave={() => setActiveExperience(null)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest mb-8 max-w-xl">
          Selected projects — problem, metrics, and flow.
        </p>
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectReveal
              key={project.title}
              project={project}
              index={index}
              isActive={activeProject === index}
              onHover={() => setActiveProject(index)}
              onLeave={() => setActiveProject(null)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
