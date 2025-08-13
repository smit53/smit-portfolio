import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: "Software Development Engineer",
      company: "Intuit (Aerolens, LLC)",
      location: "Mountain View, CA",
      period: "June 2024 - Present",
      description: "Working on AI-powered applications for QuickBooks, focusing on automation, monitoring, and infrastructure support.",
      achievements: [
        "Participated in test jams for writing playwright automations to test AI agents on QuickBooks",
        "Indulged in incident prevention techniques by leveraging AI, on monitoring Prometheus and CloudWatch matrices",
        "Created a utility for environment drift reporting for further analytics on microservices",
        "Automated taking thread dump on pods across multiple microservices for analysis",
        "Providing on-call support for QuickBooks Time and Payroll infrastructure",
        "Remediated multiple security vulnerabilities as per Intuit security standards",
        "Implemented various CI-CD pipelines for testing infrastructure changes, deployments, rollbacks, and for improving disaster recovery capabilities"
      ],
      technologies: ["Playwright", "AI/ML", "Prometheus", "CloudWatch", "Kubernetes", "CI/CD", "Security"]
    },
    {
      title: "Associate Director",
      company: "IU Ride, Fleet Services",
      location: "Bloomington, IN",
      period: "June 2023 - May 2024",
      description: "Led analytical initiatives and marketing strategies for campus transportation services.",
      achievements: [
        "Created analytical dashboards on Tableau using user data, strategically improving marketing practices, and leading to a 15% increase in user engagement",
        "Revamped social media platform outreach, thus quadrupling the service within 4 months",
        "Developed and analyzed reports for service expansion, collaborating with IDS and Auxiliary services at IU to execute impactful advertising and marketing campaigns across campus"
      ],
      technologies: ["Tableau", "Data Analytics", "Marketing", "Social Media", "Reporting"]
    },
    {
      title: "Data Scientist Intern",
      company: "Infosense Pvt. Ltd.",
      location: "Gandhinagar, India",
      period: "January 2022 - July 2022",
      description: "Worked on data cleaning, dashboard migration, and automation projects.",
      achievements: [
        "Achieved an outstanding 1000x acceleration in data cleaning speed by using Pymongo, allowing direct queries from MongoDB to Dataframe in Python",
        "Collaborated in the migration of dashboards from SISENSE to Tableau and Power BI while automating report generations",
        "Engineered robust data filtering, sorting, and sampling solutions, aligning with industry leaders like Data Robot, Dataiku, and H2O.ai to achieve 2x faster data cleaning speeds"
      ],
      technologies: ["Python", "MongoDB", "Tableau", "Power BI", "Pymongo", "Data Cleaning"]
    },
    {
      title: "Research Intern",
      company: "BISAG-N",
      location: "Gandhinagar, India",
      period: "June 2021 - September 2021",
      description: "Conducted time series analysis and developed real-time stock market analytics platform.",
      achievements: [
        "Spearheaded a comprehensive Time Series Analysis project on Stock Market Values of BSE, achieving a 20% improvement in predictive accuracy by using Django, MySQL, and Python with a sophisticated ARIMA algorithm",
        "Crafted an innovative Django-based online platform, fed with real-time stock market data, achieving a latency reduction of 95% and delivering real-time analytics through visually appealing charts like bar charts and candle graphs"
      ],
      technologies: ["Django", "MySQL", "Python", "ARIMA", "Time Series Analysis", "Real-time Data"]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My professional journey from research intern to software development engineer
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {exp.location}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 