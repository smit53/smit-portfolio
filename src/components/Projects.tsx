import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const projects = [
    {
      title: "Retail Sales Analysis and Forecasting for Walmart",
      description: "Comprehensive analysis of Walmart's historical sales data using advanced ML models including LSTM, Prophet, ARIMA, and LightGBM. Achieved 15% improvement in sales forecast accuracy and identified key seasonal patterns.",
      achievements: [
        "Investigated crucial patterns within Walmart's historical sales datasets utilizing analytical methods like LSTM, Prophet, ARIMA, and LightGBM after comprehensive EDA",
        "Achieved a 15% improvement in sales forecast accuracy",
        "Unearthed crucial insights into seasonality and variations in sales across different product categories",
        "Contributed to the identification of trends and optimized product combinations for a notable 8% predicted increase in sales"
      ],
      technologies: ["Python", "LSTM", "Prophet", "ARIMA", "LightGBM", "EDA", "Time Series Analysis"],
      category: "Machine Learning"
    },
    {
      title: "DineWise Restaurant Recommendation",
      description: "Azure cloud-based ML recommendation system for dining using Django and Python. Achieved 80% relevance improvement through advanced data refinement and content-based filtering.",
      achievements: [
        "Architected an Azure cloud-based ML recommendation system for dining (using Django and Python)",
        "Helped achieve 80% relevance improvement through data refinement",
        "Employed advanced data cleaning with NLTK and analyzed TF-IDF in content-based filtering",
        "Resulted in a 40% reduction in data retrieval time"
      ],
      technologies: ["Azure", "Django", "Python", "NLTK", "TF-IDF", "Content-based Filtering", "ML"],
      category: "Web Application"
    },
    {
      title: "Stock Market Time Series Analysis Platform",
      description: "Django-based real-time stock market analytics platform with ARIMA algorithm implementation. Achieved 20% improvement in predictive accuracy and 95% latency reduction.",
      achievements: [
        "Spearheaded comprehensive Time Series Analysis project on Stock Market Values of BSE",
        "Achieved 20% improvement in predictive accuracy using sophisticated ARIMA algorithm",
        "Crafted innovative Django-based online platform with real-time stock market data",
        "Achieved 95% latency reduction and delivered real-time analytics through visually appealing charts"
      ],
      technologies: ["Django", "MySQL", "Python", "ARIMA", "Real-time Data", "Charts", "BSE"],
      category: "Data Science"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white/50 backdrop-blur-sm">
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
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcase of my machine learning, data science, and web development projects
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Projects 