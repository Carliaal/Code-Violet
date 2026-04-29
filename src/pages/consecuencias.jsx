import { Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, ChartCard, IntroCard, PageHeader } from '../components/ChartUI'
import { hBarOpts } from '../chartHelpers'

const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '22px' }

export function ConsecuenciasPage() {
  const { loading, secuelas, apoyoBuscado } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const secuelasBar = {
    labels: Object.keys(secuelas),
    datasets: [{
      data: Object.values(secuelas),
      backgroundColor: ['#0891b2', '#d45472', '#e06c3a'],
      borderRadius: 6,
      borderSkipped: false,
    }],
  }
  const apoyoBar = {
    labels: Object.keys(apoyoBuscado),
    datasets: [{
      data: Object.values(apoyoBuscado),
      backgroundColor: ['#d45472', '#8741b3', '#0891b2', '#3b82c4'],
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Consecuencias e Impacto"
        subtitle="Secuelas sufridas por las víctimas y redes de apoyo activadas tras el episodio"
      />

      <div style={grid2}>
        <IntroCard>
          Las consecuencias son principalmente de naturaleza <strong>psicológica</strong>. Ante estos
          episodios, las mujeres tienden a buscar apoyo en su entorno más cercano antes que en instituciones
          o servicios especializados. Las <strong>amigas y familiares mujeres</strong> son las figuras de
          apoyo más frecuentes, lo que refleja la importancia de las redes de cuidado informal y la
          desconfianza hacia los canales formales de atención.
        </IntroCard>

        <ChartCard title="Tipo de secuelas" note="Víctimas que sufrieron secuelas tras el episodio">
          <Bar data={secuelasBar} options={hBarOpts} />
        </ChartCard>

        <ChartCard title="¿A quién buscó apoyo?" note="Personas del entorno a quienes se acudió">
          <Bar data={apoyoBar} options={hBarOpts} />
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}
