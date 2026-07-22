import { useState, useEffect } from 'react'
import { navLinks } from '../data/content'

export default function Header() {
  // Default to the desktop layout so build-time (SSG) rendering never touches
  // `window`; the real value is resolved on mount in the effect below.
  const [wide, setWide] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 880px)')
    setWide(mq.matches)
    const fn = (e: MediaQueryListEvent) => setWide(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px clamp(20px,5vw,56px)',
        background: 'rgba(10,10,10,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
      }}
    >
      <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 13, color: 'inherit', flexShrink: 0 }}>
        <img src="/assets/badge.png" alt="Casa Car Club" style={{ width: 42, height: 42, borderRadius: '50%' }} />
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, letterSpacing: '0.28em', fontSize: 14, color: '#F2E8D8' }}>
            CASA CAR CLUB
          </span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.44em', fontSize: 9, color: '#D4AF37' }}>
            CURITIBA
          </span>
        </span>
      </a>

      {wide && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 12.5,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#c7bfb1',
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <a
        href="#waitlist"
        className="btn-outline-gold"
        style={{ padding: '11px 22px', fontSize: 11.5, whiteSpace: 'nowrap', flexShrink: 0 }}
      >
        Lista de Espera
      </a>
    </header>
  )
}
