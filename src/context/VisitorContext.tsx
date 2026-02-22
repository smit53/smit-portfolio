import { createContext, useContext, useState, useEffect } from 'react'

const VISITOR_KEY = 'portfolio-visitor-name'

interface VisitorContextType {
  visitorName: string | null
  setVisitorName: (name: string) => void
  hasVisited: boolean
}

const VisitorContext = createContext<VisitorContextType | null>(null)

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [visitorName, setVisitorNameState] = useState<string | null>(null)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(VISITOR_KEY)
    if (stored?.trim()) {
      setVisitorNameState(stored.trim())
      setHasVisited(true)
    }
  }, [])

  const setVisitorName = (name: string) => {
    const trimmed = name.trim()
    if (trimmed) {
      sessionStorage.setItem(VISITOR_KEY, trimmed)
      setVisitorNameState(trimmed)
      setHasVisited(true)
    }
  }

  return (
    <VisitorContext.Provider value={{ visitorName, setVisitorName, hasVisited }}>
      {children}
    </VisitorContext.Provider>
  )
}

export function useVisitor() {
  const ctx = useContext(VisitorContext)
  if (!ctx) throw new Error('useVisitor must be used within VisitorProvider')
  return ctx
}
