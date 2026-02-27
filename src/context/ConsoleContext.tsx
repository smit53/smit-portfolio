import { createContext, useContext, useState } from 'react'

interface ConsoleContextType {
  open: boolean
  setOpen: (v: boolean) => void
}

const ConsoleContext = createContext<ConsoleContextType | null>(null)

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <ConsoleContext.Provider value={{ open, setOpen }}>
      {children}
    </ConsoleContext.Provider>
  )
}

export function useConsole() {
  const ctx = useContext(ConsoleContext)
  if (!ctx) throw new Error('useConsole must be used within ConsoleProvider')
  return ctx
}
