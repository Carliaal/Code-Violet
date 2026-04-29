import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, StatCard, PageHeader } from '../components/ChartUI'
import { PURPLE, LIGHT_PURPLE } from '../chartHelpers'

const sections = [
  {
    to: '/dashboard/demografia',
    title: 'Perfil Demográfico',
    desc: 'Edad, distrito, situación laboral, estado civil y convivencia de las encuestadas.',
    color: '#8741b3',
    borderColor: 'rgba(135,65,179,0.15)',
    charts: '6 gráficos',
  },
  {
    to: '/dashboard/episodio',
    title: 'El Episodio',
    desc: 'Dónde ocurrió, relación con el agresor y si se presentó denuncia.',
    color: '#b03070',
    borderColor: 'rgba(176,48,112,0.15)',
    charts: '3 gráficos',
  },
  {
    to: '/dashboard/consecuencias',
    title: 'Consecuencias e Impacto',
    desc: 'Secuelas físicas y psicológicas, y redes de apoyo activadas.',
    color: '#2e7d6b',
    borderColor: 'rgba(46,125,107,0.15)',
    charts: '2 gráficos',
  },
  {
    to: '/dashboard/barreras',
    title: 'Barreras para Denunciar',
    desc: 'Razones por las que las víctimas no presentan denuncia formal.',
    color: '#c05030',
    borderColor: 'rgba(192,80,48,0.15)',
    charts: '1 gráfico',
  },
  {
    to: '/dashboard/recursos',
    title: 'Recursos y Prevención',
    desc: 'A dónde acudirían y qué medidas preventivas consideran más eficaces.',
    color: '#5e5ea8',
    borderColor: 'rgba(94,94,168,0.15)',
    charts: '3 gráficos',
  },
]

function SectionCard({ to, title, desc, color, borderColor, charts }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: hovered
            ? '0 12px 32px rgba(135,65,179,0.15)'
            : '0 4px 20px rgba(135,65,179,0.08)',
          border: `1px solid ${hovered ? color : borderColor}`,
          borderTop: `4px solid ${color}`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3 style={{ color: '#4a1a63', fontSize: '1rem', fontWeight: '700', margin: 0, lineHeight: '1.3' }}>
            {title}
          </h3>
          <span style={{
            color: color,
            fontSize: '0.7rem',
            fontWeight: '700',
            background: `${color}18`,
            padding: '3px 10px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            marginLeft: '8px',
            flexShrink: 0,
          }}>
            {charts}
          </span>
        </div>
        <p style={{ color: '#777', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 16px' }}>
          {desc}
        </p>
        <p style={{ color: color, fontSize: '0.82rem', fontWeight: '600', margin: 0 }}>
          Ver análisis →
        </p>
      </div>
    </Link>
  )
}

export function Dashboard() {
  const {
    loading,
    totalSurveyed, victims, porcentajeVictimas,
    trabajan, tienenApoyo, sientenSegura,
  } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const stats = [
    { title: 'Total encuestadas',    value: totalSurveyed.toLocaleString(), color: PURPLE },
    { title: 'Víctimas directas',    value: `${porcentajeVictimas}%`,       color: '#b03070' },
    { title: 'Con apoyo cercano',    value: tienenApoyo.toLocaleString(),   color: '#2e7d6b' },
    { title: 'Trabajan actualmente', value: trabajan.toLocaleString(),      color: '#5e5ea8' },
    { title: 'Se sienten seguras',   value: sientenSegura.toLocaleString(), color: '#c47a00' },
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="Panel de Resultados"
        subtitle="Análisis de encuestas sobre violencia sexual — Comunidad de Madrid"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: '16px',
        marginBottom: '48px',
      }}>
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <h2 style={{ color: '#4a1a63', fontSize: '1.15rem', fontWeight: '700', margin: 0 }}>
          Explorar por sección
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'rgba(169,126,196,0.25)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '18px' }}>
        {sections.map(sec => <SectionCard key={sec.to} {...sec} />)}
      </div>

      <p style={{
        textAlign: 'center', color: '#bbb', fontSize: '0.78rem',
        marginTop: '60px', fontStyle: 'italic',
      }}>
        * Datos basados en el análisis de encuestas realizadas en la Comunidad de Madrid.
      </p>
    </DashboardLayout>
  )
}
