import TextScramble from './TextScramble'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  sectionStyle?: React.CSSProperties
}

const PageSection: React.FC<PageSectionProps> = ({ id, title, subtitle, children, sectionStyle }) => {
  return (
    <section
      id={id}
      className="relative min-h-screen flex flex-col items-center pt-20 pb-28 sm:pt-24 sm:pb-32 px-6 sm:px-12 lg:px-24 shrink-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm"
      style={{ ...sectionStyle, scrollMarginTop: 0 }}
    >
      {/* Subtle top edge: section separator */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-60" aria-hidden />
      <div className="w-full max-w-6xl flex flex-col items-center flex-1">
        <div className="w-full flex justify-center mb-12 sm:mb-16 shrink-0">
          <div className="text-center">
            <TextScramble
              text={title}
              as="h2"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
              speed={18}
            />
            {subtitle && (
              <p className="text-zinc-600 dark:text-zinc-400 text-lg mt-3">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="w-full max-w-6xl self-center min-h-0">
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageSection
