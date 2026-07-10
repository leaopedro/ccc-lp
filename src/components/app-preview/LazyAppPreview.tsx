import { useEffect, useRef, useState } from 'react'
import AppPreview from './AppPreview'
import { GOLD, CREAM, dim } from './types'

// Real (unscaled) footprint of the phone bezel — screen 844 + 12px padding each side.
const PHONE_W = 414
const PHONE_H = 868
const MAX_SCALE = 0.78

/** Phone-shaped skeleton shown before the live prototype mounts. */
function Placeholder() {
  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        background: 'linear-gradient(150deg,#48484e,#141416 42%,#08080a)',
        borderRadius: 62,
        padding: 12,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <img
          src="/assets/app/lockup-cream.png"
          alt=""
          loading="lazy"
          style={{ height: 34, width: 'auto', opacity: 0.5, animation: 'ccShimmer 1.8s ease-in-out infinite' }}
        />
        <span style={{ fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', color: dim(0.3) }}>
          Carregando protótipo
        </span>
      </div>
    </div>
  )
}

/**
 * Gates the live app prototype behind an IntersectionObserver so it only mounts
 * when the section nears the viewport. On touch devices a dimmed overlay sits on
 * top until the visitor taps, so swiping over the phone scrolls the page instead
 * of getting trapped in the app's internal scroll.
 */
export default function LazyAppPreview() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(MAX_SCALE)
  const [isTouch, setIsTouch] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Mount the prototype once the section is close to the viewport.
  useEffect(() => {
    const el = outerRef.current
    if (!el || mounted) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mounted])

  // Fit the phone to the available column width (never larger than MAX_SCALE).
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      setScale(Math.min(MAX_SCALE, (w - 8) / PHONE_W))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const showOverlay = isTouch && mounted && !active

  return (
    <div ref={outerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: PHONE_W * scale, height: PHONE_H * scale }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: PHONE_W,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.7))',
            // While the overlay is up, let touches fall through to page scroll.
            pointerEvents: showOverlay ? 'none' : 'auto',
          }}
        >
          {mounted ? <AppPreview /> : <Placeholder />}
        </div>

        {showOverlay && (
          <div
            onClick={() => setActive(true)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              background: 'rgba(10,10,10,.28)',
              borderRadius: 62 * scale,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 26,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 16px',
                border: `1px solid ${GOLD}`,
                borderRadius: 100,
                background: 'rgba(10,10,10,.7)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                fontFamily: "'Jost', sans-serif",
                fontSize: 11.5,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: CREAM,
              }}
            >
              Toque para interagir
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
