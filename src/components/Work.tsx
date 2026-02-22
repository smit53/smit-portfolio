import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

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

const projects = [
  {
    title: 'Retail Sales Analysis & Forecasting for Walmart',
    context: 'ML • Time series',
    description: 'LSTM, Prophet, ARIMA, LightGBM on historical sales. 15% forecast accuracy gain; seasonality and category insights; 8% predicted sales increase from optimized product combinations.',
  },
  {
    title: 'DineWise Restaurant Recommendation',
    context: 'Azure • Django • Python',
    description: 'Cloud-based ML recommendation system. 80% relevance improvement via data refinement; NLTK + TF-IDF content-based filtering; 40% faster data retrieval.',
  },
  {
    title: 'CampusHub — Event Discovery Platform',
    context: 'Full-stack • React • FastAPI / Node.js',
    description: 'Event discovery, groups, and collaboration for students. Responsive React UI; scalable REST backend; PostgreSQL schema/query optimization (~30% search performance); ML recommendation (Python, TF-IDF) for events and groups.',
  },
  {
    title: 'Stock Market Time Series Platform',
    context: 'Django • BSE',
    description: 'Real-time stock analytics with ARIMA. 20% predictive accuracy improvement; 95% latency reduction; charts and candle graphs.',
  },
]

const Work: React.FC = () => {
  return (
    <div className="space-y-16 pb-8">
      <div className="space-y-12">
        {workItems.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-medium text-zinc-100 text-lg">{item.role}</h3>
                <p className="text-amber-400/90 text-sm">{item.company}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{item.location}</p>
              </div>
              <span className="text-zinc-600 text-sm tabular-nums shrink-0">{item.period}</span>
            </div>
            <ul className="space-y-2">
              {item.highlights.map((h, i) => (
                <li key={i} className="text-zinc-500 text-sm flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1.5 shrink-0">·</span>
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
              transition={{ duration: 0.4, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-zinc-100 group-hover:text-amber-400/90 transition-colors">{project.title}</h4>
                  <p className="text-zinc-600 text-xs mt-1">{project.context}</p>
                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{project.description}</p>
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
