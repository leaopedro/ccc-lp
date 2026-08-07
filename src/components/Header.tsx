import { useState, useEffect } from 'react'
import { navLinks, mobileNavLinks } from '../data/content'
import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/links'
import { track } from '../lib/analytics'

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.2A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.9 8.4c-1 .4-1.4 1.5-1.1 2.6a7.4 7.4 0 0 0 5.4 5.3c1.1.3 2.2-.2 2.6-1.3l-1.7-.9-1 1.2" />
    </svg>
  )
}

export default function Header() {
  // Default to the desktop layout so build-time (SSG) rendering never touches
  // `window`; the real value is resolved on mount in the effect below.
  const [wide, setWide] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)')
    setWide(mq.matches)
    const fn = (e: MediaQueryListEvent) => {
      setWide(e.matches)
      // Crossing back to desktop closes the mobile menu.
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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
          gap: 18,
          padding: '12px clamp(16px,4vw,56px)',
          background: 'rgba(10,10,10,0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(193,154,92,0.14)',
        }}
      >
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'inherit', flexShrink: 0 }}>
          <img
            src="/assets/lp/lockup-horizontal.png"
            alt="CASA CAR CLUB Curitiba"
            width={1220}
            height={440}
            style={{ width: 'auto', height: 'clamp(38px, 5vw, 46px)' }}
          />
        </a>

        {wide && (
          <nav aria-label="Navegação principal" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,1.7vw,28px)' }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <a href={INSTAGRAM_URL} aria-label="Instagram da CASA CAR CLUB" className="icon-btn">
            <InstagramIcon />
          </a>
          <a
            href={WHATSAPP_URL}
            aria-label="Grupo de WhatsApp da CASA CAR CLUB"
            className="icon-btn"
            onClick={() => track('whatsapp_group_click')}
          >
            <WhatsAppIcon />
          </a>
          <a
            href="#pre-venda"
            onClick={() => track('casa_box_preorder_cta_click')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '11px 20px',
              border: '1px solid rgba(193,154,92,0.5)',
              borderRadius: 2,
              color: '#C19A5C',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontSize: 11,
              whiteSpace: 'nowrap',
            }}
            className="btn-outline-gold"
          >
            Acesso à pré-venda
          </a>
          {!wide && (
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="icon-btn"
            >
              <span aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 17 }}>
                <span style={{ display: 'block', height: 1, background: 'currentColor' }} />
                <span style={{ display: 'block', height: 1, background: 'currentColor' }} />
                <span style={{ display: 'block', height: 1, background: 'currentColor' }} />
              </span>
            </button>
          )}
        </div>
      </header>

      {!wide && menuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação"
          style={{
            position: 'fixed',
            top: 67,
            left: 0,
            right: 0,
            zIndex: 49,
            background: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(193,154,92,0.18)',
            padding: '8px clamp(16px,4vw,56px) 22px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {mobileNavLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="menu-link">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  )
}
