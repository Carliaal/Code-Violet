import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const PURPLE = '#8741b3'
const LIGHT_PURPLE = '#a97ec4'
const LIGHTEST_PURPLE = '#e8d5f0'
const PALETTE = [
  '#8741b3', '#a97ec4', '#c4a0dc', '#6b2d8b',
  '#4a1a63', '#d4b0e8', '#7b3fa0', '#b890d0',
]

const AGE_ORDER = [
  'De 16 a 24 años',
  'De 25 a 34 años',
  'De 35 a 44 años',
  'De 45 a 54 años',
  'De 55 a 64 años',
  '65 años o más',
]

const AGE_LABELS = {
  'De 16 a 24 años': '16-24',
  'De 25 a 34 años': '25-34',
  'De 35 a 44 años': '35-44',
  'De 45 a 54 años': '45-54',
  'De 55 a 64 años': '55-64',
  '65 años o más': '65+',
}

export function Dashboard() {
  const {
    loading,
    totalSurveyed,
    victims,
    porcentajeVictimas,
    trabajan,
    tienenApoyo,
    sientenSegura,
    porDistrito,
    porTramoEdad,
    porSituacionLaboral,
  } = useDatos()

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ color: PURPLE, fontSize: '1rem', fontWeight: '600', marginTop: '16px' }}>
          Cargando datos...
        </p>
      </div>
    </div>
  )

  const sortedDistritos = Object.entries(porDistrito)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  const victimasData = {
    labels: ['Víctimas', 'No víctimas'],
    datasets: [{
      data: [victims, totalSurveyed - victims],
      backgroundColor: [PURPLE, LIGHTEST_PURPLE],
      borderColor: ['white', 'white'],
      borderWidth: 3,
    }],
  }

  const edadData = {
    labels: AGE_ORDER.map(k => AGE_LABELS[k] || k),
    datasets: [{
      label: 'Encuestadas',
      data: AGE_ORDER.map(t => porTramoEdad[t] || 0),
      backgroundColor: PALETTE.slice(0, AGE_ORDER.length),
      borderRadius: 8,
      borderSkipped: false,
    }],
  }

  const empleoData = {
    labels: Object.keys(porSituacionLaboral),
    datasets: [{
      data: Object.values(porSituacionLaboral),
      backgroundColor: PALETTE,
      borderColor: 'white',
      borderWidth: 3,
    }],
  }

  const distritosData = {
    labels: sortedDistritos.map(([k]) => k),
    datasets: [{
      label: 'Encuestadas',
      data: sortedDistritos.map(([, v]) => v),
      backgroundColor: sortedDistritos.map((_, i) =>
        `hsl(280, ${65 - i * 4}%, ${48 + i * 4}%)`
      ),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  const donutOpts = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 12 }, padding: 16, usePointStyle: true },
      },
    },
    cutout: '68%',
  }

  const barOpts = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  }

  const hBarOpts = {
    responsive: true,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  }

  const stats = [
    { title: 'Total encuestadas', value: totalSurveyed, color: PURPLE },
    { title: 'Víctimas directas', value: `${porcentajeVictimas}%`, color: '#b03070' },
    { title: 'Con apoyo cercano', value: tienenApoyo, color: '#2e7d6b' },
    { title: 'En situación laboral activa', value: trabajan, color: '#5e5ea8' },
    { title: 'Se sienten seguras', value: sientenSegura, color: '#c47a00' },
  ]

  return (
    <div style={{ backgroundColor: '#f8f4ff', minHeight: '100vh', padding: '50px 7%' }}>
      <header style={{ marginBottom: '45px', textAlign: 'center' }}>
        <h1 style={{ color: PURPLE, fontSize: '2rem', fontWeight: '800', margin: 0 }}>
          Panel de Resultados
        </h1>
        <p style={{ color: '#999', fontSize: '0.95rem', margin: '10px 0 0' }}>
          Análisis de encuestas sobre violencia sexual — Comunidad de Madrid
        </p>
        <div style={{
          width: '50px', height: '4px',
          background: `linear-gradient(to right, ${PURPLE}, ${LIGHT_PURPLE})`,
          margin: '18px auto 0', borderRadius: '2px',
        }} />
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '18px',
        marginBottom: '40px',
      }}>
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        <ChartCard title="¿Víctimas de violencia sexual?">
          <Doughnut data={victimasData} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Distribución por tramo de edad">
          <Bar data={edadData} options={barOpts} />
        </ChartCard>

        <ChartCard title="Situación laboral">
          <Doughnut data={empleoData} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Top 8 distritos de residencia">
          <Bar data={distritosData} options={hBarOpts} />
        </ChartCard>
      </div>

      <p style={{
        textAlign: 'center', color: '#bbb',
        fontSize: '0.8rem', marginTop: '50px', fontStyle: 'italic',
      }}>
        * Datos actualizados basados en el análisis de registros de La Comunidad de Madrid.
      </p>
    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px 20px',
      boxShadow: '0 4px 20px rgba(135,65,179,0.08)',
      borderTop: `4px solid ${color}`,
      textAlign: 'center',
    }}>
      <p style={{
        color: '#999',
        fontSize: '0.75rem',
        fontWeight: '600',
        margin: '0 0 10px',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
      }}>
        {title}
      </p>
      <p style={{ color, fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(135,65,179,0.08)',
      border: '1px solid rgba(169,126,196,0.15)',
    }}>
      <h3 style={{
        color: '#666',
        fontSize: '0.8rem',
        fontWeight: '700',
        margin: '0 0 20px',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}
