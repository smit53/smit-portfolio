import { createContext, useContext, useState } from 'react'

export const SECTIONS = ['home', 'interests', 'capabilities', 'work-ethic', 'work', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

interface SectionContextType {
  activeSection: SectionId
  setActiveSection: (id: SectionId) => void
}

const SectionContext = createContext<SectionContextType | null>(null)

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const ctx = useContext(SectionContext)
  if (!ctx) throw new Error('useSection must be used within SectionProvider')
  return ctx
}
