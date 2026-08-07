import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header'
import Hero from './components/Hero'
import StatusStrip from './components/StatusStrip'
import Concept from './components/Concept'
import CasaBox from './components/CasaBox'
import PocketCasa from './components/PocketCasa'
import Community from './components/Community'
import AppSection from './components/AppSection'
import FutureVision from './components/FutureVision'
import Partners from './components/Partners'
import FoundingMembers from './components/FoundingMembers'
import WaitlistForm from './components/WaitlistForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: '#0A0A0A' }}>
      <Header />
      <main>
        <Hero />
        <StatusStrip />
        <Concept />
        <CasaBox />
        <PocketCasa />
        <Community />
        <AppSection />
        <FutureVision />
        <Partners />
        <FoundingMembers />
        <WaitlistForm />
        <FinalCTA />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
