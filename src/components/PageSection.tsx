import { motion } from 'framer-motion'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

const PageSection: React.FC<PageSectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-h-0 flex flex-col items-center justify-center py-24 px-6 sm:px-12 lg:px-24 overflow-y-auto"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Centered title - like Hero welcome */}
        <div className="w-full flex justify-center mb-16 sm:mb-20">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-500 text-lg mt-3">{subtitle}</p>
            )}
          </div>
        </div>
        {/* Left-aligned content */}
        <div className="w-full max-w-5xl self-start">
          {children}
        </div>
      </div>
    </motion.section>
  )
}

export default PageSection
