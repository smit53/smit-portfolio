import { motion } from 'framer-motion'
import { useSection, SECTIONS } from '../context/SectionContext'

const ScrollProgress: React.FC = () => {
  const { currentSection } = useSection()
  const index = SECTIONS.indexOf(currentSection)
  const progress = (index + 1) / SECTIONS.length

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block w-px h-24 bg-zinc-200 rounded-full overflow-hidden">
      <motion.div
        className="w-full bg-brand-500 rounded-full origin-top"
        initial={false}
        animate={{ scaleY: progress }}
        transition={{ type: 'spring', stiffness: 80, damping: 24 }}
      />
    </div>
  )
}

export default ScrollProgress
