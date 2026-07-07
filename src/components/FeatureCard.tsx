import type { FeatureCard as FeatureCardType } from '../data/content'

export default function FeatureCard({ title, description, iconSvg }: FeatureCardType) {
  return (
    <article className="feature-card">
      <div
        style={{ color: '#D4AF37', marginBottom: 18 }}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
      <h3
        style={{
          margin: '0 0 9px',
          fontFamily: "'Jost', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: 17,
          color: '#F2E8D8',
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#a99f8d' }}>
        {description}
      </p>
    </article>
  )
}
