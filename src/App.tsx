import { HashRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VisitorProvider, useVisitor } from './context/VisitorContext'
import { SectionProvider, useSection } from './context/SectionContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Interests from './components/Interests'
import Capabilities from './components/Capabilities'
import WorkEthic from './components/WorkEthic'
import Work from './components/Work'
import KeepInTouch from './components/KeepInTouch'
import Footer from './components/Footer'
import PageSection from './components/PageSection'
import CosmicBackground from './components/CosmicBackground'
import SectionProgress from './components/SectionProgress'
import WelcomeGate from './components/WelcomeGate'

function PortfolioContent() {
  const { visitorName, setVisitorName, hasVisited } = useVisitor()
  const { activeSection } = useSection()

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasVisited ? (
          <WelcomeGate key="gate" onEnter={setVisitorName} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 h-screen overflow-hidden flex flex-col"
          >
            <Navbar />
            <SectionProgress />
            <main className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeSection === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full min-h-0 flex flex-col items-center justify-center py-24 px-6 sm:px-12 lg:px-24 overflow-y-auto"
                  >
                    <div className="w-full max-w-5xl flex flex-col items-center">
                      <Hero visitorName={visitorName} />
                    </div>
                  </motion.div>
                )}
                {activeSection === 'interests' && (
                  <PageSection key="interests" id="interests" title="Interests" subtitle="What drives me beyond the screen.">
                    <Interests />
                  </PageSection>
                )}
                {activeSection === 'capabilities' && (
                  <PageSection key="capabilities" id="capabilities" title="Capabilities" subtitle="Technologies and tools I work with.">
                    <Capabilities />
                  </PageSection>
                )}
                {activeSection === 'work-ethic' && (
                  <PageSection key="work-ethic" id="work-ethic" title="Work ethic" subtitle="How I approach problems and partnerships.">
                    <WorkEthic />
                  </PageSection>
                )}
                {activeSection === 'work' && (
                  <PageSection key="work" id="work" title="Work" subtitle="Experience and selected projects.">
                    <Work />
                  </PageSection>
                )}
                {activeSection === 'contact' && (
                  <PageSection key="contact" id="contact" title="Keep in touch" subtitle="Open to opportunities and conversations.">
                    <KeepInTouch />
                  </PageSection>
                )}
              </AnimatePresence>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <Router>
      <VisitorProvider>
        <SectionProvider>
          <div className="min-h-screen h-screen bg-zinc-950 text-zinc-100 overflow-hidden [perspective:1200px]">
            <CosmicBackground />
            <PortfolioContent />
          </div>
        </SectionProvider>
      </VisitorProvider>
    </Router>
  )
}

export default App
