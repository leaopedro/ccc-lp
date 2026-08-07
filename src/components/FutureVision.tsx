import { conceptRenders } from '../data/content'

export default function FutureVision() {
  return (
    <section id="visao-futura" style={{ padding: 'clamp(72px,10vw,132px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Jost', sans-serif", letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', color: '#C19A5C' }}>
          <span aria-hidden="true" style={{ display: 'block', width: 26, height: 1, background: '#C19A5C' }} />
          Visão de futuro
        </span>
        <h2 style={{ margin: '20px 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(30px,4.6vw,52px)', lineHeight: 1.07, letterSpacing: '-0.015em', color: '#F2E8D8' }}>
          A futura sede <span style={{ color: '#D4B584', fontWeight: 400 }}>da CASA CAR CLUB.</span>
        </h2>
        <p style={{ margin: '22px 0 0', maxWidth: 640, fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.62, color: '#a99f8d', textWrap: 'pretty' }}>
          Estamos desenvolvendo o projeto de uma sede definitiva: garagem, cultura, eventos e comunidade no
          mesmo endereço. É o próximo passo do clube, ainda não um espaço em operação.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(14px,1.6vw,20px)', marginTop: 'clamp(38px,4.5vw,56px)' }}>
          {conceptRenders.map((render) => (
            <figure key={render.caption} style={{ margin: 0 }}>
              <img
                src={render.image}
                alt={render.alt}
                width={2200}
                height={1650}
                loading="lazy"
                style={{ width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 3, filter: 'saturate(0.9)' }}
              />
              <figcaption style={{ marginTop: 10, fontFamily: "'Jost', sans-serif", fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#7d7466' }}>
                {render.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ margin: '20px 0 0', fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#7d7466' }}>
          Imagens conceituais da futura sede · Espaço ainda não inaugurado
        </p>

        <p style={{ margin: 'clamp(28px,3.4vw,40px) 0 0', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 'clamp(18px,2.4vw,24px)', lineHeight: 1.4, color: '#C19A5C' }}>
          Uma CASA se constrói de dentro para fora.
        </p>
      </div>
    </section>
  )
}
