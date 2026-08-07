import type { FeatureCard as FeatureCardType } from './content'

export default function FeatureCard({ title, description, iconSvg }: FeatureCardType) {
  return (
    <article className="feature-card">
      <div
        style={{ color: '#C19A5C', marginBottom: 18 }}
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
