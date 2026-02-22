import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const workItems = [
  { role: 'Software Development Engineer', company: 'Intuit', period: '2024 – Present', highlights: ['AI agent testing with Playwright automation', 'Incident prevention via AI monitoring (Prometheus, CloudWatch)', 'Microservices infrastructure & on-call support', 'CI/CD pipelines for deployments & disaster recovery'] },
  { role: 'Associate Director', company: 'IU Ride, Fleet Services', period: '2023 – 2024', highlights: ['Analytical dashboards on Tableau → 15% user engagement increase', 'Social media revamp → 4x service growth in 4 months'] },
  { role: 'Data Scientist Intern', company: 'Infosense', period: '2022', highlights: ['1000x data cleaning speedup with Pymongo', 'Dashboard migration (Sisense → Tableau/Power BI)'] },
]

const projects = [
  { title: 'Retail Sales Analysis & Forecasting', context: 'Walmart • ML', description: 'LSTM, Prophet, ARIMA, LightGBM. 15% forecast accuracy improvement.' },
  { title: 'DineWise Restaurant Recommendation', context: 'Azure • Django', description: 'Content-based filtering. 80% relevance improvement, 40% faster retrieval.' },
  { title: 'Stock Market Time Series Platform', context: 'Django • BSE', description: 'Real-time analytics, ARIMA. 20% predictive accuracy gain, 95% latency reduction.' },
]

const Work: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="space-y-12">
        {workItems.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-medium text-zinc-100 text-lg">{item.role}</h3>
                <p className="text-amber-400/90 text-sm">{item.company}</p>
              </div>
              <span className="text-zinc-600 text-sm tabular-nums">{item.period}</span>
            </div>
            <ul className="space-y-2">
              {item.highlights.map((h, i) => (
                <li key={i} className="text-zinc-500 text-sm flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1.5">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="font-display text-lg font-medium text-zinc-300 mb-6">Selected projects</h3>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href="#"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-zinc-100 group-hover:text-amber-400/90 transition-colors">{project.title}</h4>
                  <p className="text-zinc-600 text-xs mt-1">{project.context}</p>
                  <p className="text-zinc-500 text-sm mt-2">{project.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400/90 shrink-0 mt-1 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
