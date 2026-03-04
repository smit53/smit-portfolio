import TextScramble from './TextScramble'
import HeadingRevealLayout from './HeadingRevealLayout'

interface PageSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  sectionStyle?: React.CSSProperties
  sectionClassName?: string
  contentFullWidth?: boolean
  /** When true, heading appears centered first then moves up and reveals content. */
  headingReveal?: boolean
}

const headingBlock = (
  title: string,
  subtitle?: string
) => (
  <div className="w-full text-left">
    <TextScramble
      text={title}
      as="h2"
      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
      speed={18}
    />
    {subtitle && (
      <p className="text-zinc-600 dark:text-zinc-400 text-xl sm:text-2xl mt-4 sm:mt-5 max-w-3xl">
        {subtitle}
      </p>
    )}
  </div>
)

const PageSection: React.FC<PageSectionProps> = ({ id, title, subtitle, children, sectionStyle, sectionClassName, contentFullWidth, headingReveal }) => {
  const sectionClass = `relative min-h-full flex flex-col w-full px-4 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 bg-white dark:bg-black ${sectionClassName ?? ''}`

  if (headingReveal) {
    return (
      <section id={id} className={sectionClass} style={sectionStyle}>
        <div className={`w-full flex flex-col flex-1 min-h-0 ${contentFullWidth ? 'max-w-none' : 'max-w-none'}`}>
          <HeadingRevealLayout heading={headingBlock(title, subtitle)}>
            <div className={`w-full min-h-0 flex-1 flex flex-col text-left ${contentFullWidth ? 'max-w-none overflow-x-auto overflow-y-hidden scroll-smooth' : 'max-w-none'}`}>
              {children}
            </div>
          </HeadingRevealLayout>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className={sectionClass} style={sectionStyle}>
      <div className={`w-full flex flex-col flex-1 min-h-0`}>
        <div className="w-full mb-10 sm:mb-14 shrink-0">
          {headingBlock(title, subtitle)}
        </div>
        <div className={`w-full min-h-0 flex-1 flex flex-col text-left ${contentFullWidth ? 'max-w-none overflow-x-auto overflow-y-hidden scroll-smooth' : 'max-w-none'}`}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageSection
