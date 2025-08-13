import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate software engineer with expertise in cloud infrastructure, machine learning, and scalable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Who I Am</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  I'm a Software Development Engineer with a passion for creating innovative solutions 
                  that solve real-world problems. With expertise in cloud infrastructure, machine learning, 
                  and scalable architectures, I help organizations build robust and efficient systems.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  My journey in technology has been driven by curiosity and a desire to make a meaningful 
                  impact through code. I believe in writing clean, maintainable code and staying up-to-date 
                  with the latest industry trends and best practices.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Experience</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-800">Software Development Engineer</h5>
                      <p className="text-gray-600 text-sm">Building scalable cloud solutions</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Machine Learning Engineer</h5>
                      <p className="text-gray-600 text-sm">Developing AI/ML solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 