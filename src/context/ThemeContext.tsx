import { createContext, useContext, useState, useCallback, useEffect, useLayoutEffect } from 'react'

type Theme = 'light' | 'dark'
type TransitionState = 'idle' | 'inverting'

const STORAGE_KEY = 'portfolio-theme'

interface ThemeContextType {
  theme: Theme
  transitionState: TransitionState
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  return stored === 'dark' || stored === 'light' ? stored : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [transitionState, setTransitionState] = useState<TransitionState>('idle')

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    if (transitionState !== 'idle') return

    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

    setTransitionState('inverting')

    const holdNegative = 1100
    const timer = setTimeout(() => {
      setTheme(nextTheme)
      setTransitionState('idle')
    }, holdNegative)

    return () => clearTimeout(timer)
  }, [theme, transitionState])

  return (
    <ThemeContext.Provider value={{ theme, transitionState, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
