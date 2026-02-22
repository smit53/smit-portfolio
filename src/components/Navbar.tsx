import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScroll } from '../context/ScrollContext'
import { SECTIONS } from '../context/ScrollContext'

const navItems: { name: string; id: (typeof SECTIONS)[number] }[] = [
  { name: 'Home', id: 'home' },
  { name: 'Interests', id: 'interests' },
  { name: 'Capabilities', id: 'capabilities' },
  { name: 'How I work', id: 'work-ethic' },
  { name: 'Work', id: 'work' },
  { name: 'Keep in Touch', id: 'contact' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentSection, scrollToSection } = useScroll()

  const handleNav = (id: (typeof SECTIONS)[number]) => {
    scrollToSection(id)
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end md:justify-center items-center h-16 md:h-20 relative">
          <div className="hidden md:flex items-center justify-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-[13px] tracking-wide transition-colors duration-300 ${
                  currentSection === item.id ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`block w-full text-left py-3 transition-colors ${
                    currentSection === item.id ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
