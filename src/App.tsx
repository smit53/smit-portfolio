import { HashRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VisitorProvider, useVisitor } from './context/VisitorContext'
import { ScrollProvider, useScroll } from './context/ScrollContext'
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
import ScrollProgress from './components/ScrollProgress'
import WelcomeGate from './components/WelcomeGate'

function PortfolioContent() {
  const { visitorName, setVisitorName, hasVisited } = useVisitor()
  const { scrollRef } = useScroll()

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
            className="relative z-10 h-screen flex flex-col overflow-hidden"
          >
            <Navbar />
            <SectionProgress />
            <ScrollProgress />
            <main
              ref={scrollRef as React.LegacyRef<HTMLElement>}
              className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
            >
              <section id="home" className="min-h-screen snap-start flex flex-col items-center justify-center py-24 px-6 sm:px-12 lg:px-24">
                <div className="w-full max-w-5xl flex flex-col items-center">
                  <Hero visitorName={visitorName} />
                </div>
              </section>
              <PageSection id="interests" title="Interests" subtitle="What drives me beyond the screen.">
                <Interests />
              </PageSection>
              <PageSection id="capabilities" title="Capabilities" subtitle="Technologies and tools I work with.">
                <Capabilities />
              </PageSection>
              <PageSection id="work-ethic" title="How I work" subtitle="How I approach problems and partnerships.">
                <WorkEthic />
              </PageSection>
              <PageSection id="work" title="Work" subtitle="Experience and selected projects.">
                <Work />
              </PageSection>
              <PageSection id="contact" title="Keep in touch" subtitle="Open to opportunities and conversations.">
                <KeepInTouch />
              </PageSection>
              <Footer />
            </main>
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
        <ScrollProvider>
          <div className="min-h-screen h-screen bg-zinc-950 text-zinc-100 overflow-hidden [perspective:1200px]">
            <CosmicBackground />
            <PortfolioContent />
          </div>
        </ScrollProvider>
      </VisitorProvider>
    </Router>
  )
}

export default App
