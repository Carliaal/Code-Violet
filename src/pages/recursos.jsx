import { Doughnut, Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, ChartCard, IntroCard, PageHeader } from '../components/ChartUI'
import { MEDIDAS_MAP, OPCION_MAP, applyMap, buildDonut, donutOpts, hBarOpts } from '../chartHelpers'

const grid3 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px' }

export function RecursosPage() {
  const { loading, adondeAcudiria, porMedidasPrev, porOpcionPrev } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const adondeBar = {
    labels: Object.keys(adondeAcudiria),
    datasets: [{
      data: Object.values(adondeAcudiria),
      backgroundColor: ['#3b82c4', '#8741b3', '#0891b2', '#d45472', '#e8a020'],
      borderRadius: 6,
      borderSkipped: false,
    }],
  }
  const medidasDonut = buildDonut(
    applyMap(porMedidasPrev, MEDIDAS_MAP),
    ['#8741b3', '#0891b2', '#e06c3a']
  )
  const opcionDonut = buildDonut(
    applyMap(porOpcionPrev, OPCION_MAP),
    ['#8741b3', '#2ea8a0']
  )

  return (
    <DashboardLayout>
      <PageHeader
        title="Recursos y Prevención"
        subtitle="Qué harían las encuestadas y qué medidas consideran más efectivas"
      />

      <div style={grid3}>
        <IntroCard>
          Ante un episodio de violencia sexual, la mayoría de las mujeres acudiría a la
          <strong> policía o la guardia civil</strong>, aunque los centros especializados y los
          hospitales también tienen respaldo significativo. En cuanto a la prevención, la
          <strong> educación afectivo-sexual</strong> en las escuelas es considerada la medida más eficaz.
          La mayoría prioriza <strong>educar a los hombres para que no agredan</strong> sobre enseñar
          autoprotección a las mujeres, lo que refleja que la responsabilidad debe recaer en quien agrede.
        </IntroCard>

        <ChartCard title="¿A dónde acudiría?" note="Primera respuesta ante un episodio de violencia sexual">
          <Bar data={adondeBar} options={hBarOpts} />
        </ChartCard>

        <ChartCard title="Medida de prevención prioritaria" note="Opción más importante para prevenir la violencia sexual">
          <Doughnut data={medidasDonut} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Entre dos opciones de prevención" note="Educar a los hombres vs. enseñar autoprotección a las mujeres">
          <Doughnut data={opcionDonut} options={donutOpts} />
        </ChartCard>
      </div>

      <p style={{ textAlign: 'center', color: '#bbb', fontSize: '0.78rem', marginTop: '60px', fontStyle: 'italic' }}>
        * Datos basados en el análisis de encuestas realizadas en la Comunidad de Madrid.
      </p>
    </DashboardLayout>
  )
}
