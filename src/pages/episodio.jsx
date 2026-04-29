import { Doughnut, Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'
import { DashboardLayout } from '../components/DashboardLayout'
import { Loader, ChartCard, IntroCard, PageHeader, StatCard } from '../components/ChartUI'
import {
  PURPLE,
  C_YES, C_NO_DEN, C_PRIV, C_PUB, C_VIR,
  LUGAR_MAP, RELACION_MAP,
  applyMap, buildDonut, buildBar, topN,
  donutOpts, hBarOpts,
} from '../chartHelpers'

const grid3 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px' }

export function EpisodioPage() {
  const {
    loading, victims, porcentajeVictimas,
    porLugarHechos, porRelacionAgresor, porDenuncia,
  } = useDatos()

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>

  const lugarDonut = buildDonut(
    applyMap(porLugarHechos, LUGAR_MAP),
    [C_PRIV, C_PUB, C_VIR]
  )
  const relacionBar   = buildBar(topN(applyMap(porRelacionAgresor, RELACION_MAP), 7))
  const denunciaDonut = buildDonut(
    applyMap(porDenuncia, { 'Sí': 'Sí, denunció', 'No': 'No denunció' }),
    [C_YES, C_NO_DEN]
  )

  const pctDenuncia = porDenuncia['Sí'] && victims > 0
    ? `${((porDenuncia['Sí'] / victims) * 100).toFixed(0)}%`
    : 'N/D'
  const pctNoDenuncia = porDenuncia['No'] && victims > 0
    ? `${((porDenuncia['No'] / victims) * 100).toFixed(0)}%`
    : 'N/D'

  return (
    <DashboardLayout>
      <PageHeader
        title="El Episodio"
        subtitle={`Datos referidos únicamente a las ${victims.toLocaleString()} víctimas directas (${porcentajeVictimas}% del total)`}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <StatCard title="Víctimas directas" value={victims.toLocaleString()} color="#b03070" />
        <StatCard title="Porcentaje del total" value={`${porcentajeVictimas}%`} color={PURPLE} />
        <StatCard title="Sí denunciaron" value={pctDenuncia} color="#2e7d6b" />
        <StatCard title="No denunciaron" value={pctNoDenuncia} color="#c05030" />
      </div>

      <div style={grid3}>
        <IntroCard>
          Los episodios ocurren mayoritariamente en <strong>espacios privados</strong> y, en la mayoría de
          los casos, <strong>el agresor era conocido</strong> por la víctima. La ex-pareja es el perfil más
          frecuente, seguida de compañeros de trabajo o estudios. Estos datos cuestionan el estereotipo del
          agresor desconocido. A pesar de ello, una proporción significativa de víctimas
          <strong> no denunció</strong> los hechos.
        </IntroCard>

        <ChartCard title="¿Dónde ocurrió?" note="Espacio donde tuvieron lugar los hechos">
          <Doughnut data={lugarDonut} options={donutOpts} />
        </ChartCard>

        <ChartCard title="Relación con el agresor" note="Vínculo previo entre víctima y agresor">
          <Bar data={relacionBar} options={hBarOpts} />
        </ChartCard>

        <ChartCard title="¿Denunció los hechos?" note="Del total de víctimas directas">
          <Doughnut data={denunciaDonut} options={donutOpts} />
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}
