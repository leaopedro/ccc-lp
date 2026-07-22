import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header'
import Hero from './components/Hero'
import Concept from './components/Concept'
import ClubFeatures from './components/ClubFeatures'
import TheHouse from './components/TheHouse'
import FoundingMembers from './components/FoundingMembers'
import Partners from './components/Partners'
import AppSection from './components/AppSection'
import WaitlistForm from './components/WaitlistForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden', background: '#0A0A0A' }}>
      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9,
          pointerEvents: 'none',
          mixBlendMode: 'soft-light',
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Header />
      <main>
        <Hero />
        <Concept />
        <ClubFeatures />
        <TheHouse />
        <FoundingMembers />
        <Partners />
        <AppSection />
        <WaitlistForm />
        <FinalCTA />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
