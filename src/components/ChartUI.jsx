import { PURPLE, LIGHT_PURPLE } from '../chartHelpers'

export function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ color: PURPLE, fontSize: '1rem', fontWeight: '600', marginTop: '16px' }}>
          Cargando datos...
        </p>
      </div>
    </div>
  )
}

export function StatCard({ title, value, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '22px 18px',
      boxShadow: '0 4px 20px rgba(135,65,179,0.08)',
      borderTop: `4px solid ${color}`,
      textAlign: 'center',
    }}>
      <p style={{
        color: '#999', fontSize: '0.72rem', fontWeight: '600',
        margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.6px',
      }}>{title}</p>
      <p style={{ color, fontSize: '2.1rem', fontWeight: '800', margin: 0 }}>{value}</p>
    </div>
  )
}

export function ChartCard({ title, note, children, tall }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '22px',
      boxShadow: '0 4px 20px rgba(135,65,179,0.08)',
      border: '1px solid rgba(169,126,196,0.15)',
      minHeight: tall ? '340px' : undefined,
    }}>
      <h3 style={{
        color: '#666', fontSize: '0.78rem', fontWeight: '700',
        margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.8px',
      }}>{title}</h3>
      {note && <p style={{ color: '#bbb', fontSize: '0.72rem', margin: '0 0 16px' }}>{note}</p>}
      {!note && <div style={{ height: '16px' }} />}
      {children}
    </div>
  )
}

export function IntroCard({ children }) {
  return (
    <div style={{
      gridColumn: '1 / -1',
      background: 'white',
      borderRadius: '16px',
      padding: '22px 28px',
      boxShadow: '0 4px 20px rgba(135,65,179,0.08)',
      border: '1px solid rgba(169,126,196,0.15)',
      borderLeft: `4px solid ${LIGHT_PURPLE}`,
    }}>
      <p style={{ color: '#555', fontSize: '0.93rem', lineHeight: '1.85', margin: 0 }}>
        {children}
      </p>
    </div>
  )
}

export function PageHeader({ title, subtitle }) {
  return (
    <header style={{ marginBottom: '36px' }}>
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #f3eaf9, #ede0f7)',
        color: PURPLE,
        fontSize: '0.72rem',
        fontWeight: '700',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        padding: '5px 14px',
        borderRadius: '20px',
        marginBottom: '14px',
        border: '1px solid rgba(169,126,196,0.3)',
      }}>
        Análisis · Comunidad de Madrid
      </div>
      <h1 style={{
        color: '#4a1a63',
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: '800',
        margin: '0 0 10px',
        lineHeight: '1.2',
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: '#888', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>
          {subtitle}
        </p>
      )}
      <div style={{
        width: '50px', height: '4px',
        background: `linear-gradient(to right, ${PURPLE}, ${LIGHT_PURPLE})`,
        marginTop: '16px', borderRadius: '2px',
      }} />
    </header>
  )
}
