import { createContext, useContext, useState, useCallback } from 'react'

export const SECTIONS = ['home', 'interests', 'capabilities', 'work-ethic', 'work', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

interface SectionContextType {
  currentSection: SectionId
  setSection: (id: SectionId) => void
  scrollToSection: (id: SectionId) => void
  goToNextSection: () => void
  goToPrevSection: () => void
}

const SectionContext = createContext<SectionContextType | null>(null)

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionId>('home')

  const scrollToSection = useCallback((id: SectionId) => {
    setCurrentSection(id)
  }, [])

  const goToNextSection = useCallback(() => {
    setCurrentSection((current) => {
      const index = SECTIONS.indexOf(current)
      const nextIndex = index < SECTIONS.length - 1 ? index + 1 : 0
      return SECTIONS[nextIndex]
    })
  }, [])

  const goToPrevSection = useCallback(() => {
    setCurrentSection((current) => {
      const index = SECTIONS.indexOf(current)
      const prevIndex = index > 0 ? index - 1 : SECTIONS.length - 1
      return SECTIONS[prevIndex]
    })
  }, [])

  return (
    <SectionContext.Provider value={{ currentSection, setSection: setCurrentSection, scrollToSection, goToNextSection, goToPrevSection }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const ctx = useContext(SectionContext)
  if (!ctx) throw new Error('useSection must be used within SectionProvider')
  return ctx
}
