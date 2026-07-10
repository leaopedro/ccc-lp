import { houseFeatures } from '../data/content'

const galleryItems = [
  { src: '/assets/bar-cafe.png', alt: 'Bar e café', caption: 'Bar & Café' },
  { src: '/assets/media-hub.png', alt: 'Media hub', caption: 'Media Hub & Estúdio' },
  { src: '/assets/event-hall.png', alt: 'Salão de eventos', caption: 'Salão & Simulador' },
]

export default function TheHouse() {
  return (
    <section
      id="casa"
      style={{ padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)', background: '#0A0A0A' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(30px,5vw,64px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow">O Endereço</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                color: '#F2E8D8',
                fontSize: 'clamp(28px,4.2vw,50px)',
                lineHeight: 1.12,
              }}
            >
              Uma casa de verdade sendo transformada no clubhouse automotivo privado de Curitiba.
            </h2>
            <p style={{ margin: '26px 0 30px', fontSize: 15.5, lineHeight: 1.75, color: '#c7bfb1', maxWidth: 520 }}>
              Cada ambiente foi pensado para viver carros de um jeito diferente: do café à garagem,
              do estúdio ao churrasco. Espaço para carros, conteúdo e comunidade.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14 }}>
              {houseFeatures.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14.5, color: '#c7bfb1' }}>
                  <span style={{ color: '#D4AF37' }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              position: 'relative',
              border: '1px solid rgba(212,175,55,0.20)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <img src="/assets/hero-house.png" alt="Fachada Casa Car Club" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            marginTop: 44,
          }}
        >
          {galleryItems.map((item) => (
            <figure
              key={item.src}
              className="gallery-item"
              style={{
                margin: 0,
                position: 'relative',
                borderRadius: 6,
                overflow: 'hidden',
                border: '1px solid rgba(212,175,55,0.20)',
              }}
            >
              <img src={item.src} alt={item.alt} className="gallery-img" />
              <figcaption
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '16px 18px',
                  background: 'linear-gradient(transparent, rgba(10,10,10,0.9))',
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontSize: 12,
                  color: '#F2E8D8',
                }}
              >
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
