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

function loadStored(): { name: string; persona: Persona } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data?.name) return { name: data.name, persona: data.persona ?? null }
  } catch { /* ignore corrupt data */ }
  return null
}

function saveStored(name: string, persona: Persona) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, persona }))
  } catch { /* storage full / disabled */ }
}

function clearStored() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
}

const VisitorContext = createContext<VisitorContextType | null>(null)

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const stored = loadStored()
  const [visitorName, setVisitorNameState] = useState<string | null>(stored?.name ?? null)
  const [persona, setPersonaState] = useState<Persona>(stored?.persona ?? null)
  // Always show welcome gate on load; hasVisited becomes true only after they complete it this session
  const [hasVisited, setHasVisited] = useState(false)
  const [isReturning] = useState(!!stored?.name)

  useEffect(() => {
    if (visitorName && persona) {
      saveStored(visitorName, persona)
    }
  }, [visitorName, persona])

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
