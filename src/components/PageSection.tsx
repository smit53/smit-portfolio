import { motion } from 'framer-motion'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

const PageSection: React.FC<PageSectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <section
      id={id}
      className="min-h-screen snap-start flex flex-col items-center py-24 px-6 sm:px-12 lg:px-24"
    >
      <div className="w-full max-w-5xl flex flex-col items-center flex-1">
        <div className="w-full flex justify-center mb-12 sm:mb-16 shrink-0">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-500 text-lg mt-3">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="w-full max-w-5xl self-start min-h-0 pb-12">
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageSection
