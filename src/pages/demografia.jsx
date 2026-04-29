import { Doughnut, Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, ChartCard, IntroCard, PageHeader, StatCard } from '../components/ChartUI'
import {
  PURPLE, PALETTE,
  C_VICTIM, C_NO,
  AGE_ORDER, AGE_LABELS, CONVIVENCIA_MAP,
  applyMap, buildDonut, buildBar, topN,
  donutOpts, barOpts, hBarOpts,
} from '../chartHelpers'

const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '22px' }

export function DemografiaPage() {
  const {
    loading, totalSurveyed, victims, porcentajeVictimas, trabajan, tienenApoyo,
    porTramoEdad, porDistrito, porSituacionLaboral, porEstadoCivil, porConvivencia,
  } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const victimasDonut = buildDonut(
    { 'Víctimas': victims, 'No víctimas': totalSurveyed - victims },
    [C_VICTIM, C_NO]
  )
  const edadBar = {
    labels: AGE_ORDER.map(k => AGE_LABELS[k] || k),
    datasets: [{
      data: AGE_ORDER.map(k => porTramoEdad[k] || 0),
      backgroundColor: PALETTE.slice(0, AGE_ORDER.length),
      borderRadius: 8,
      borderSkipped: false,
    }],
  }
  const empleoDonut      = buildDonut(porSituacionLaboral)
  const distritosBar     = buildBar(topN(porDistrito, 8))
  const estadoCivilDonut = buildDonut(porEstadoCivil)
  const convivenciaDonut = buildDonut(applyMap(porConvivencia, CONVIVENCIA_MAP))

  return (
    <DashboardLayout>
      <PageHeader
        title="Perfil Demográfico"
        subtitle={`Distribución de las ${totalSurveyed.toLocaleString()} mujeres encuestadas en la Comunidad de Madrid`}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <StatCard title="Total encuestadas" value={totalSurveyed.toLocaleString()} color={PURPLE} />
        <StatCard title="Víctimas directas" value={`${porcentajeVictimas}%`} color="#b03070" />
        <StatCard title="Con apoyo cercano" value={tienenApoyo.toLocaleString()} color="#2e7d6b" />
        <StatCard title="Trabajan" value={trabajan.toLocaleString()} color="#5e5ea8" />
      </div>

      <div style={grid2}>
        <IntroCard>
          La encuesta recoge datos de <strong>{totalSurveyed.toLocaleString()} mujeres</strong> residentes
          en la Comunidad de Madrid, con edades entre los 16 y 65 años o más. La muestra abarca distintos
          distritos, situaciones laborales, estados civiles y formas de convivencia.
          Un <strong>{porcentajeVictimas}%</strong> declaró haber sufrido algún episodio de violencia sexual
          directamente, lo que subraya la magnitud y transversalidad del problema.
        </IntroCard>

        <ChartCard title="¿Víctimas de violencia sexual?">
          <Doughnut data={victimasDonut} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Distribución por tramo de edad">
          <Bar data={edadBar} options={barOpts} />
        </ChartCard>

        <ChartCard title="Situación laboral">
          <Doughnut data={empleoDonut} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Top 8 distritos de residencia">
          <Bar data={distritosBar} options={hBarOpts} />
        </ChartCard>

        <ChartCard title="Estado civil">
          <Doughnut data={estadoCivilDonut} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Situación de convivencia">
          <Doughnut data={convivenciaDonut} options={donutOpts} />
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}
