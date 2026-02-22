import { motion } from 'framer-motion'
import RotatingPhrase from './RotatingPhrase'

interface HeroProps {
  visitorName: string | null
}

const Hero: React.FC<HeroProps> = ({ visitorName }) => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      {/* Welcome - centered */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex justify-center mb-24 sm:mb-32"
      >
        <p className="text-zinc-400 text-2xl sm:text-3xl leading-relaxed tracking-tight text-center">
          Welcome{visitorName ? `, ${visitorName}` : ''}. It's nice to connect with you.
        </p>
      </motion.div>

      {/* Content - 3 lines with generous spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl self-start space-y-4"
      >
        <p className="text-zinc-500 text-xl sm:text-2xl leading-relaxed">
          I build AI-powered solutions at Intuit, where elegance meets scale.
        </p>
        <p className="text-zinc-500 text-xl sm:text-2xl leading-relaxed">
          I believe in clean code, thoughtful design, and systems that grow with care.
        </p>
        <p className="text-zinc-500 text-xl sm:text-2xl leading-relaxed">
          When I'm not shipping features, I'm exploring new tech, traveling, or diving into <RotatingPhrase />.
        </p>
      </motion.div>
    </div>
  )
}

export default Hero
