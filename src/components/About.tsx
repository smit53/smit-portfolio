import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skills = {
    languages: ['Python', 'R', 'JavaScript', 'Go', 'Groovy', 'Bash'],
    tools: ['Rest API', 'Redis', 'GitLab', 'TensorFlow', 'JIRA', 'PagerDuty', 'Grafana', 'Wavefront', 'Splunk'],
    databases: ['SQL/PLSQL', 'PostgreSQL', 'NoSQL', 'MongoDB', 'Neo4j', 'Cassandra', 'MySQL'],
    platforms: ['Tableau', 'Power BI', 'Qlik Sense', 'Airflow', 'MLflow', 'Docker', 'Kubernetes', 'Argo CD', 'Datadog', 'AWS', 'Azure']
  }

  return (
    <section id="about" className="py-20 bg-white/50 backdrop-blur-sm">
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
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Software Development Engineer at Intuit with expertise in cloud infrastructure, machine learning, and scalable solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800">Indiana University Bloomington</h4>
                  <p className="text-gray-600 text-sm">Master's in Computer Science</p>
                  <p className="text-gray-600 text-sm">GPA: 3.85/4.0 • 2022-2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Indus University</h4>
                  <p className="text-gray-600 text-sm">B. Tech in Information Technology</p>
                  <p className="text-gray-600 text-sm">GPA: 9.72/10 • 2018-2022</p>
                </div>
              </div>
            </motion.div>

            {/* Current Role */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Role</h3>
              <div>
                <h4 className="font-semibold text-gray-800">Software Development Engineer</h4>
                <p className="text-blue-600 font-medium">Intuit (Aerolens, LLC)</p>
                <p className="text-gray-600 text-sm mb-4">Mountain View, CA • June 2024 - Present</p>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• AI agent testing with Playwright automation</li>
                  <li>• Incident prevention using AI monitoring</li>
                  <li>• Microservices infrastructure support</li>
                  <li>• CI/CD pipeline implementation</li>
                </ul>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Platforms & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.platforms.slice(0, 8).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What I Do</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              I'm a Software Development Engineer at Intuit, where I work on building and maintaining 
              AI-powered applications for QuickBooks. My expertise spans cloud infrastructure, machine learning, 
              and scalable solutions that drive business innovation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a Master's in Computer Science from Indiana University and experience in data science, 
              I bring a unique blend of theoretical knowledge and practical skills to solve complex technical challenges. 
              I'm passionate about creating robust, efficient systems that make a real impact.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 