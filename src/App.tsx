import { HashRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VisitorProvider, useVisitor } from './context/VisitorContext'
import { SectionProvider, useSection } from './context/SectionContext'
import { ConsoleProvider } from './context/ConsoleContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import NavCapsule from './components/NavCapsule'
import Hero from './components/Hero'
import Interests from './components/Interests'
import Capabilities from './components/Capabilities'
import WorkEthic from './components/WorkEthic'
import Work from './components/Work'
import KeepInTouch from './components/KeepInTouch'
import PageSection from './components/PageSection'
import PortfolioBackground from './components/PortfolioBackground'
import DotGridScramble from './components/DotGridScramble'
import ScrambleGrid from './components/ScrambleGrid'
import HexScramble from './components/HexScramble'
import RayScramble from './components/RayScramble'
import FlowScramble from './components/FlowScramble'
import RippleScramble from './components/RippleScramble'
import HeadingRevealLayout from './components/HeadingRevealLayout'
import SectionNavButtons from './components/SectionNavButtons'
import SideNav from './components/SideNav'
import WelcomeGate from './components/WelcomeGate'
import DevConsole from './components/DevConsole'
import CustomCursor from './components/CustomCursor'

const CONTENT_EXIT = { opacity: 0, y: 24 }
const CONTENT_INITIAL = { opacity: 0, y: 20 }
const CONTENT_ANIMATE = { opacity: 1, y: 0 }
const CONTENT_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
const BG_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

function PortfolioContent() {
  const { visitorName, hasVisited } = useVisitor()
  const { currentSection } = useSection()

  const welcomeLine = visitorName ? `${visitorName} — glad you're here.` : "Glad you're here."

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
            <PortfolioBackground />

            {/* Section-specific background (scramble effects) — slides with transition */}
            <AnimatePresence mode="wait">
              {currentSection && (
                <motion.div
                  key={currentSection}
                  className="fixed inset-0 z-[50] pointer-events-none"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={BG_TRANSITION}
                >
                  {currentSection === 'home' && <DotGridScramble />}
                  {currentSection === 'interests' && <ScrambleGrid />}
                  {currentSection === 'capabilities' && <HexScramble />}
                  {currentSection === 'work-ethic' && <RayScramble />}
                  {currentSection === 'work' && <FlowScramble />}
                  {currentSection === 'contact' && <RippleScramble />}
                </motion.div>
              )}
            </AnimatePresence>

            <NavCapsule />
            <SideNav />
            <SectionNavButtons />

            <main className="flex-1 min-h-0 w-full h-full min-h-full-dvh overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {currentSection === 'home' && (
                  <motion.section
                    key="home"
                    id="home"
                    className="relative flex flex-col justify-center flex-1 w-full min-h-full-dvh bg-white dark:bg-black overflow-y-auto overflow-x-hidden px-6 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <div className="relative z-10 w-full flex flex-col items-stretch text-left">
                      <HeadingRevealLayout
                        heading={
                          <p className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tighter text-zinc-700 dark:text-zinc-300 text-center w-full">
                            {welcomeLine}
                          </p>
                        }
                      >
                        <Hero visitorName={visitorName} skipWelcomeLine />
                      </HeadingRevealLayout>
                    </div>
                  </motion.section>
                )}

                {currentSection === 'interests' && (
                  <motion.div
                    key="interests"
                    className="flex-1 min-h-0 w-full h-full-dvh overflow-y-auto overflow-x-hidden py-8 pb-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <PageSection id="interests" title="Interests" subtitle="What drives me beyond the screen." headingReveal>
                      <Interests />
                    </PageSection>
                  </motion.div>
                )}

                {currentSection === 'capabilities' && (
                  <motion.div
                    key="capabilities"
                    className="flex-1 min-h-0 w-full h-full-dvh overflow-y-auto overflow-x-hidden py-8 pb-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <PageSection id="capabilities" title="Capabilities" subtitle="Technologies and tools I work with." headingReveal>
                      <Capabilities />
                    </PageSection>
                  </motion.div>
                )}

                {currentSection === 'work-ethic' && (
                  <motion.div
                    key="work-ethic"
                    className="flex-1 min-h-0 w-full h-full-dvh overflow-y-auto overflow-x-hidden py-8 pb-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <PageSection id="work-ethic" title="How I work" subtitle="How I approach problems and partnerships." headingReveal>
                      <WorkEthic />
                    </PageSection>
                  </motion.div>
                )}

                {currentSection === 'work' && (
                  <motion.div
                    key="work"
                    className="flex-1 min-h-0 w-full h-full-dvh overflow-y-auto overflow-x-hidden py-8 pb-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <PageSection id="work" title="Work" subtitle="Experience and selected projects." contentFullWidth headingReveal>
                      <Work />
                    </PageSection>
                  </motion.div>
                )}

                {currentSection === 'contact' && (
                  <motion.div
                    key="contact"
                    className="flex-1 min-h-0 w-full h-full-dvh overflow-y-auto overflow-x-hidden py-8 pb-16"
                    initial={CONTENT_INITIAL}
                    animate={CONTENT_ANIMATE}
                    exit={CONTENT_EXIT}
                    transition={CONTENT_TRANSITION}
                  >
                    <section
                      id="contact"
                      className="relative flex flex-col w-full min-h-full bg-white dark:bg-black px-4 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14"
                    >
                      <div className="w-full flex flex-col flex-1 min-h-0">
                        <HeadingRevealLayout
                          heading={
                            <div className="w-full text-left">
                              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Keep in touch</h2>
                              <p className="text-zinc-600 dark:text-zinc-400 text-xl sm:text-2xl mt-4 sm:mt-5 max-w-3xl">Open to opportunities and conversations.</p>
                            </div>
                          }
                        >
                          <div className="w-full min-h-0 pt-4 text-left">
                            <KeepInTouch />
                          </div>
                        </HeadingRevealLayout>
                      </div>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>
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
      className={`min-h-screen min-h-[100dvh] h-screen h-[100dvh] overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 flex flex-col ${theme === 'dark' ? 'dark' : ''}`}
      style={{
        filter: transitionState === 'inverting' ? 'invert(1)' : 'none',
        transition: 'filter 1.1s ease-in-out',
      }}
    >
      <PortfolioContent />
      <DevConsole />
      <CustomCursor />
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
