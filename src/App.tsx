import { useCallback, useEffect, useState } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VisitorProvider, useVisitor } from './context/VisitorContext'
import { SectionProvider, useSection, SECTIONS } from './context/SectionContext'
import { ConsoleProvider } from './context/ConsoleContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import NavCapsule from './components/NavCapsule'
import Hero from './components/Hero'
import Interests from './components/Interests'
import Capabilities from './components/Capabilities'
import WorkEthic from './components/WorkEthic'
import Work from './components/Work'
import KeepInTouch from './components/KeepInTouch'
import Footer from './components/Footer'
import PageSection from './components/PageSection'
import PortfolioBackground from './components/PortfolioBackground'
import WelcomeGate from './components/WelcomeGate'
import DevConsole from './components/DevConsole'
import CustomCursor from './components/CustomCursor'

const PANEL_COUNT = 6 // home, interests, capabilities, work-ethic, work, contact

function PortfolioContent() {
  const { visitorName, hasVisited } = useVisitor()
  const { scrollRef, setSection } = useSection()
  const [scrollProgress, setScrollProgress] = useState(0)
  const initialViewport = typeof window !== 'undefined' ? window.innerHeight : 600
  const [spacerHeight, setSpacerHeight] = useState((PANEL_COUNT - 1) * initialViewport)
  const [viewportHeight, setViewportHeight] = useState(initialViewport)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const maxScroll = scrollHeight - clientHeight
    setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
    const index = Math.min(
      Math.floor(scrollTop / clientHeight),
      PANEL_COUNT - 1
    )
    setSection(SECTIONS[index])
  }, [scrollRef, setSection])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const updateSpacer = () => {
      if (scrollRef.current) {
        const h = scrollRef.current.clientHeight || initialViewport
        setViewportHeight(h)
        setSpacerHeight((PANEL_COUNT - 1) * h)
      }
    }
    updateSpacer()
    handleScroll()
    el.addEventListener('scroll', handleScroll, { passive: true })
    const ro = new ResizeObserver(updateSpacer)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', handleScroll)
      ro.disconnect()
    }
  }, [handleScroll, scrollRef, initialViewport])

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasVisited ? (
          <WelcomeGate key="gate" />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 h-full flex flex-col"
          >
            <PortfolioBackground scrollProgress={scrollProgress} />
            <CustomCursor />
            <NavCapsule />
            <main
              ref={scrollRef as React.LegacyRef<HTMLElement>}
              onScroll={handleScroll}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth w-full touch-pan-y"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Spacer: vertical scroll height so one "scroll step" = one panel */}
              <div style={{ height: spacerHeight }}
              >
                {/* Sticky viewport: stays in place while content scrolls */}
                <div
                  className="sticky top-0 left-0 w-full overflow-hidden"
                  style={{ height: viewportHeight }}
                >
                  {/* Horizontal strip: moves left as user scrolls down; fixed height so panels fill viewport */}
                  <div
                    className="flex flex-nowrap"
                    style={{
                      width: `${PANEL_COUNT * 100}vw`,
                      height: viewportHeight,
                      transform: `translateX(-${scrollProgress * (PANEL_COUNT - 1) * 100}vw)`,
                    }}
                  >
                    <section
                      id="home"
                      className="flex flex-col items-center justify-center py-24 px-6 sm:px-12 lg:px-24 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm shrink-0"
                      style={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}
                    >
                      <div className="w-full max-w-5xl flex flex-col items-center">
                        <Hero visitorName={visitorName} />
                      </div>
                    </section>
                    <PageSection id="interests" title="Interests" subtitle="What drives me beyond the screen." sectionStyle={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}>
                      <Interests />
                    </PageSection>
                    <PageSection id="capabilities" title="Capabilities" subtitle="Technologies and tools I work with." sectionStyle={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}>
                      <Capabilities />
                    </PageSection>
                    <PageSection id="work-ethic" title="How I work" subtitle="How I approach problems and partnerships." sectionStyle={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}>
                      <WorkEthic />
                    </PageSection>
                    <PageSection id="work" title="Work" subtitle="Experience and selected projects." sectionStyle={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}>
                      <Work />
                    </PageSection>
                    <section
                      id="contact"
                      className="relative flex flex-col items-center pt-20 pb-28 sm:pt-24 sm:pb-32 px-6 sm:px-12 lg:px-24 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm shrink-0"
                      style={{ width: '100vw', minWidth: '100vw', height: viewportHeight, minHeight: viewportHeight }}
                    >
                      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-60" aria-hidden />
                      <div className="w-full max-w-6xl flex flex-col items-center flex-1">
                        <div className="w-full flex justify-center mb-12 sm:mb-16 shrink-0">
                          <div className="text-center">
                            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Keep in touch</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg mt-3">Open to opportunities and conversations.</p>
                          </div>
                        </div>
                        <div className="w-full max-w-6xl self-center min-h-0">
                          <KeepInTouch />
                        </div>
                      </div>
                      <Footer />
                    </section>
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AppShell() {
  const { theme, transitionState } = useTheme()
  return (
    <div
      className={`min-h-screen h-screen overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 ${theme === 'dark' ? 'dark' : ''}`}
      style={{
        filter: transitionState === 'inverting' ? 'invert(1)' : 'none',
        transition: 'filter 1.1s ease-in-out',
      }}
    >
      <PortfolioContent />
      <DevConsole />
    </div>
  )
}

function App() {
  return (
    <Router>
      <VisitorProvider>
        <ThemeProvider>
          <SectionProvider>
            <ConsoleProvider>
              <AppShell />
            </ConsoleProvider>
          </SectionProvider>
        </ThemeProvider>
      </VisitorProvider>
    </Router>
  )
}

export default App
