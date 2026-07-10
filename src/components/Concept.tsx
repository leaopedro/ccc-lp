export default function Concept() {
  return (
    <section
      id="conceito"
      style={{ padding: 'clamp(80px,11vw,140px) clamp(20px,5vw,56px)', background: '#0A0A0A' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
          <span className="eyebrow-line" />
          <span className="eyebrow">O Conceito</span>
          <span className="eyebrow-line" />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: '#F2E8D8',
            fontSize: 'clamp(30px,4.6vw,56px)',
            lineHeight: 1.12,
          }}
        >
          Curitiba nunca teve
          <br />
          <span style={{ color: '#D4AF37', fontWeight: 400 }}>um clube assim.</span>
        </h2>

        <p
          style={{
            margin: '32px auto 0',
            maxWidth: 680,
            fontSize: 'clamp(15px,1.6vw,18px)',
            lineHeight: 1.75,
            color: '#c7bfb1',
          }}
        >
          Um espaço privado feito para apaixonados por carro se encontrarem, criarem, tocarem seus projetos,
          viverem eventos exclusivos e se conectarem com marcas e outros membros.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 44, flexWrap: 'wrap', alignItems: 'center' }}>
          {['Garagem', 'Cultura', 'Eventos', 'Comunidade'].map((word, i) => (
            <span key={word} style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.2em', fontSize: 12, color: '#a99f8d', textTransform: 'uppercase' }}>
                {word}
              </span>
              {i < 3 && <span style={{ color: '#D4AF37' }}>✦</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
