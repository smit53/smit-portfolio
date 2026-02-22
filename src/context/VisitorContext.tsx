import { createContext, useContext, useState } from 'react'

interface VisitorContextType {
  visitorName: string | null
  setVisitorName: (name: string) => void
  hasVisited: boolean
}

const VisitorContext = createContext<VisitorContextType | null>(null)

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [visitorName, setVisitorNameState] = useState<string | null>(null)
  const [hasVisited, setHasVisited] = useState(false)

  const setVisitorName = (name: string) => {
    const trimmed = name.trim()
    if (trimmed) {
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
