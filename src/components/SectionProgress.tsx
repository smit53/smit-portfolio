import { useSection, SECTIONS } from '../context/SectionContext'

const SectionProgress: React.FC = () => {
  const { currentSection, scrollToSection } = useSection()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group flex items-center gap-2"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
              currentSection === id ? 'bg-brand-500' : 'bg-zinc-300 group-hover:bg-brand-500/80'
            }`}
          />
          <span className="text-[10px] text-zinc-500 group-hover:text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {id.replace(/-/g, ' ')}
          </span>
        </button>
      ))}
    </div>
  )
}

export default SectionProgress
