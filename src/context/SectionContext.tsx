import { createContext, useContext, useRef, useState, useCallback } from 'react'

export const SECTIONS = ['home', 'interests', 'capabilities', 'work-ethic', 'work', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

interface SectionContextType {
  scrollRef: React.RefObject<HTMLElement | null>
  currentSection: SectionId
  setSection: (id: SectionId) => void
  scrollToSection: (id: SectionId) => void
}

const SectionContext = createContext<SectionContextType | null>(null)

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null)
  const [currentSection, setCurrentSection] = useState<SectionId>('home')

  const scrollToSection = useCallback((id: SectionId) => {
    const index = SECTIONS.indexOf(id)
    if (index >= 0 && scrollRef.current) {
      const h = scrollRef.current.clientHeight
      scrollRef.current.scrollTo({ top: index * h, behavior: 'smooth' })
    }
    setCurrentSection(id)
  }, [])

  return (
    <SectionContext.Provider value={{ scrollRef, currentSection, setSection: setCurrentSection, scrollToSection }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const ctx = useContext(SectionContext)
  if (!ctx) throw new Error('useSection must be used within SectionProvider')
  return ctx
}
