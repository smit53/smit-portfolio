import { useSection, SECTIONS } from '../context/SectionContext'

const SECTION_LABELS: Record<(typeof SECTIONS)[number], string> = {
  home: 'Home',
  interests: 'Interests',
  capabilities: 'Capabilities',
  'work-ethic': 'How I work',
  work: 'Work',
  contact: 'Contact',
}

/**
 * Minimal side panel: vertical dots to jump to any page. Left side, low visual weight.
 */
export default function SideNav() {
  const { currentSection, scrollToSection } = useSection()

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3"
      aria-label="Page navigation"
    >
      {SECTIONS.map((id) => {
        const isActive = currentSection === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            title={SECTION_LABELS[id]}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-full"
            aria-label={`Go to ${SECTION_LABELS[id]}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                isActive
                  ? 'bg-zinc-800 dark:bg-zinc-200'
                  : 'bg-zinc-400 dark:bg-zinc-500 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-400'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
