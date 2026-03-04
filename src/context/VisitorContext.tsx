import { createContext, useContext, useState, useEffect } from 'react'

export type Persona = 'recruiter' | 'engineer' | 'founder' | null

interface VisitorContextType {
  visitorName: string | null
  setVisitorName: (name: string) => void
  hasVisited: boolean
  persona: Persona
  setPersona: (p: Persona) => void
  isReturning: boolean
  resetVisitor: () => void
}

const STORAGE_KEY = 'smit-portfolio-visitor'

function clearStored() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
}

const VisitorContext = createContext<VisitorContextType | null>(null)

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  // No persistence: every load/refresh starts from the beginning (welcome gate).
  const [visitorName, setVisitorNameState] = useState<string | null>(null)
  const [persona, setPersonaState] = useState<Persona>(null)
  const [hasVisited, setHasVisited] = useState(false)
  const [isReturning] = useState(false)

  useEffect(() => {
    clearStored()
  }, [])

  const setVisitorName = (name: string) => {
    const trimmed = name.trim()
    if (trimmed) {
      setVisitorNameState(trimmed)
    }
  }

  const setPersona = (p: Persona) => {
    setPersonaState(p)
    if (p) setHasVisited(true)
  }

  const resetVisitor = () => {
    clearStored()
    setVisitorNameState(null)
    setPersonaState(null)
    setHasVisited(false)
  }

  return (
    <VisitorContext.Provider value={{
      visitorName,
      setVisitorName,
      hasVisited,
      persona,
      setPersona,
      isReturning,
      resetVisitor,
    }}>
      {children}
    </VisitorContext.Provider>
  )
}

export function useVisitor() {
  const ctx = useContext(VisitorContext)
  if (!ctx) throw new Error('useVisitor must be used within VisitorProvider')
  return ctx
}
