import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="text-6xl font-bold text-white mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          SB
        </motion.div>
        
        <motion.div
          className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.p
          className="text-white/80 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Loading amazing things...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen 