import { Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, ChartCard, IntroCard, PageHeader } from '../components/ChartUI'
import { RAZONES_MAP, applyMap, topN, hBarOpts } from '../chartHelpers'

export function BarrerasPage() {
  const { loading, porRazonNoDenuncia } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const razonesMapped = topN(applyMap(porRazonNoDenuncia, RAZONES_MAP), 8)
  const razonesBar = {
    labels: Object.keys(razonesMapped),
    datasets: [{
      data: Object.values(razonesMapped),
      backgroundColor: [
        '#d45472', '#e06c3a', '#e8a020', '#5baa3f',
        '#0891b2', '#3b82c4', '#8741b3', '#2ea8a0',
      ],
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Barreras para Denunciar"
        subtitle="Razón principal por la que las mujeres no denuncian una agresión sexual"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '22px' }}>
        <IntroCard>
          A pesar de la gravedad de los hechos, la denuncia formal sigue siendo una opción minoritaria.
          Las encuestadas señalan el <strong>miedo al agresor</strong> como la razón principal para no
          denunciar, seguido del temor a no ser creídas y la vergüenza. El <strong>estigma social</strong> y
          la culpabilización continúan siendo obstáculos determinantes. Abordar estas barreras es
          imprescindible para mejorar el acceso a la justicia.
        </IntroCard>

        <ChartCard title="Razones para no denunciar — razón más citada" tall>
          <Bar data={razonesBar} options={hBarOpts} />
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}
