import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

export const SECTIONS = ['home', 'interests', 'capabilities', 'work-ethic', 'work', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLElement | null>
  currentSection: SectionId
  scrollToSection: (id: SectionId) => void
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null)
  const [currentSection, setCurrentSection] = useState<SectionId>('home')

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id)
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const main = scrollRef.current
    if (!main) return

    const handleScroll = () => {
      const mainRect = main.getBoundingClientRect()
      const viewMid = mainRect.top + main.clientHeight / 2
      let active: SectionId = 'home'
      let minDist = Infinity

      SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elMid = rect.top + rect.height / 2
        const dist = Math.abs(elMid - viewMid)
        if (dist < minDist) {
          minDist = dist
          active = id
        }
      })
      setCurrentSection(active)
    }

    main.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => main.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollRef, currentSection, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider')
  return ctx
}
