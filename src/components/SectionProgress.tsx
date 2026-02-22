import { motion } from 'framer-motion'
import { useSection } from '../context/SectionContext'
import { SECTIONS } from '../context/SectionContext'

const SectionProgress: React.FC = () => {
  const { activeSection, setActiveSection } = useSection()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => setActiveSection(id)}
          className="group flex items-center gap-2"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
              activeSection === id ? 'bg-amber-400/90' : 'bg-zinc-600 group-hover:bg-amber-400/80'
            }`}
          />
          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {id.replace(/-/g, ' ')}
          </span>
        </button>
      ))}
    </div>
  )
}

export default SectionProgress
