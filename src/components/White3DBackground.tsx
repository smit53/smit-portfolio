import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useSection, SECTIONS } from '../context/SectionContext'

const White3DBackground: React.FC = () => {
  const { currentSection } = useSection()
  const sectionProgress = useMotionValue(
    SECTIONS.indexOf(currentSection) / Math.max(1, SECTIONS.length - 1)
  )

  useEffect(() => {
    sectionProgress.set(SECTIONS.indexOf(currentSection) / Math.max(1, SECTIONS.length - 1))
  }, [currentSection, sectionProgress])

  const rotateY1 = useTransform(sectionProgress, [0, 0.25, 0.5], [0, 12, 5])
  const rotateX1 = useTransform(sectionProgress, [0, 0.3], [0, -8])
  const y1 = useTransform(sectionProgress, [0, 0.4], [0, 80])
  const rotateY2 = useTransform(sectionProgress, [0.2, 0.5, 0.8], [-5, 15, -10])
  const y2 = useTransform(sectionProgress, [0.2, 0.6], [0, -60])
  const rotateY3 = useTransform(sectionProgress, [0.4, 0.7, 1], [8, -12, 5])
  const scale3 = useTransform(sectionProgress, [0.4, 0.75], [1, 1.15])
  const y3 = useTransform(sectionProgress, [0.5, 1], [0, 100])
  const opacityGrid = useTransform(sectionProgress, [0, 0.15], [0, 0.04])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
      {/* Subtle grid that fades in with section */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: opacityGrid,
          backgroundImage: `
            linear-gradient(rgba(255,107,0,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Floating 3D-style shapes */}
      <motion.div
        style={{ rotateY: rotateY1, rotateX: rotateX1, y: y1 }}
        className="absolute top-[15%] left-[10%] w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-brand-500/10 to-brand-600/5 border border-brand-500/10 shadow-lg"
      />
      <motion.div
        style={{ rotateY: rotateY2, y: y2 }}
        className="absolute top-[55%] right-[8%] w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-brand-500/[0.08] border border-brand-500/10"
      />
      <motion.div
        style={{ rotateY: rotateY3, scale: scale3, y: y3 }}
        className="absolute bottom-[25%] left-[15%] w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-brand-500/5 border border-brand-500/10 rotate-12"
      />
      <motion.div
        style={{ rotateY: useTransform(sectionProgress, [0.1, 0.6], [15, -10]) }}
        className="absolute top-[70%] left-[60%] w-16 h-16 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/40 border border-zinc-300/50 dark:border-zinc-600/50 -rotate-6"
      />
      <motion.div
        style={{ rotateX: useTransform(sectionProgress, [0.3, 0.8], [0, 12]) }}
        className="absolute top-[20%] right-[25%] w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80"
      />
    </div>
  )
}

export default White3DBackground
