import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { useDatos } from '../hooks/useDatos'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

// ── Paleta ──────────────────────────────────────────────────────────────────
const PURPLE       = '#8741b3'
const LIGHT_PURPLE = '#a97ec4'
const LIGHTEST     = '#e8d5f0'

// Colores diversos y bien diferenciados entre sí
const PALETTE = [
  '#8741b3', // violeta  (marca)
  '#0891b2', // cian
  '#e06c3a', // naranja
  '#5baa3f', // verde
  '#d45472', // rosa
  '#e8a020', // ámbar
  '#3b82c4', // azul
  '#2ea8a0', // turquesa
  '#6b60b8', // índigo
  '#a3522e', // marrón
]

// Colores semánticos para gráficos concretos
const C_VICTIM   = '#d45472'   // rosa  → víctimas
const C_NO       = '#e5e7eb'   // gris  → no víctimas
const C_YES      = '#5baa3f'   // verde → sí denunció
const C_NO_DEN   = '#e06c3a'   // naranja → no denunció
const C_PRIV     = '#8741b3'   // violeta → espacio privado
const C_PUB      = '#0891b2'   // cian    → espacio público
const C_VIR      = '#e8a020'   // ámbar   → espacio virtual

// ── Mapas de etiquetas ───────────────────────────────────────────────────────
const AGE_ORDER = [
  'De 16 a 24 años','De 25 a 34 años','De 35 a 44 años',
  'De 45 a 54 años','De 55 a 64 años','65 años o más',
]
const AGE_LABELS = {
  'De 16 a 24 años':'16-24','De 25 a 34 años':'25-34','De 35 a 44 años':'35-44',
  'De 45 a 54 años':'45-54','De 55 a 64 años':'55-64','65 años o más':'65+',
}

const LUGAR_MAP = {
  'En el espacio privado':'Espacio privado',
  'En el espacio público':'Espacio público',
  'En el espacio virtual':'Espacio virtual',
}

const RELACION_MAP = {
  'Compañero de trabajo y/o estudios':'Compañero/a de trabajo',
  'Jefe o superior jerárquico':'Jefe o superior',
  'Varios de los anteriores':'Varios',
}

const RAZONES_MAP = {
  'Por miedo al agresor':'Miedo al agresor',
  'Por miedo a que no la crean':'Temor a no ser creída',
  'Por vergüenza':'Vergüenza',
  'Por miedo a ser considerada culpable de lo sucedido':'Culpabilización',
  'Por el señalamiento/ rechazo o consecuencias a nivel social o familiar':'Señalamiento social',
  'Por el desgaste emocional':'Desgaste emocional',
  'Por falta de información adecuada':'Falta de información',
  'Por el coste económico que conlleva':'Coste económico',
}

const MEDIDAS_MAP = {
  'Facilitar información general sobre qué hacer y a qué lugares acudir en caso desufrir violencia sexual':'Facilitar información',
  'Campañas de sensibilización e información contra la violencia sexual':'Campañas de sensibilización',
}

const OPCION_MAP = {
  'Educar a los hombres a no agredir (sexualmente)':'Educar a los hombres',
  'Enseñar a las mujeres a evitar situaciones de riesgo':'Enseñar autoprotección',
}

const CONVIVENCIA_MAP = {
  'En pareja con hijos/as':'Con pareja e hijos',
  'En pareja sin hijos/as':'Con pareja (sin hijos)',
  'Con familiares (familia extensa)':'Con familiares',
  'Con compañeros/as de priso (no familiares)':'Compañeros/as de piso',
  'Sola con hijos/as':'Sola con hijos',
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function applyMap(obj, map) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [map[k] ?? k, v])
  )
}

function topN(obj, n = 8) {
  return Object.fromEntries(
    Object.entries(obj).sort(([,a],[,b]) => b-a).slice(0, n)
  )
}

function buildBar(obj) {
  const entries = Object.entries(obj)
  return {
    labels: entries.map(([k]) => k),
    datasets: [{
      data: entries.map(([,v]) => v),
      backgroundColor: entries.map((_, i) => PALETTE[i % PALETTE.length]),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }
}

function buildDonut(obj, colors = PALETTE) {
  const entries = Object.entries(obj)
  return {
    labels: entries.map(([k]) => k),
    datasets: [{
      data: entries.map(([,v]) => v),
      backgroundColor: colors.slice(0, entries.length),
      borderColor: 'white',
      borderWidth: 3,
    }],
  }
}

// ── Opciones de Chart.js ─────────────────────────────────────────────────────
const donutOpts = {
  responsive: true,
  plugins: {
    legend: { position:'bottom', labels:{ font:{size:12}, padding:14, usePointStyle:true } },
  },
  cutout: '68%',
}

const barOpts = {
  responsive: true,
  plugins: { legend:{ display:false } },
  scales: {
    y: { beginAtZero:true, grid:{ color:'rgba(0,0,0,0.05)' }, ticks:{ font:{size:11} } },
    x: { grid:{ display:false }, ticks:{ font:{size:11} } },
  },
}

const hBarOpts = {
  responsive: true, indexAxis:'y',
  plugins: { legend:{ display:false } },
  scales: {
    x: { beginAtZero:true, grid:{ color:'rgba(0,0,0,0.05)' }, ticks:{ font:{size:11} } },
    y: { grid:{ display:false }, ticks:{ font:{size:11} } },
  },
}

// ── Componentes UI ───────────────────────────────────────────────────────────
function StatCard({ title, value, color }) {
  return (
    <div style={{
      background:'white', borderRadius:'16px', padding:'22px 18px',
      boxShadow:'0 4px 20px rgba(135,65,179,0.08)',
      borderTop:`4px solid ${color}`, textAlign:'center',
    }}>
      <p style={{ color:'#999', fontSize:'0.72rem', fontWeight:'600', margin:'0 0 8px',
        textTransform:'uppercase', letterSpacing:'0.6px' }}>{title}</p>
      <p style={{ color, fontSize:'2.1rem', fontWeight:'800', margin:0 }}>{value}</p>
    </div>
  )
}

function ChartCard({ title, note, children, tall }) {
  return (
    <div style={{
      background:'white', borderRadius:'16px',
      padding:'22px', boxShadow:'0 4px 20px rgba(135,65,179,0.08)',
      border:'1px solid rgba(169,126,196,0.15)',
      minHeight: tall ? '340px' : undefined,
    }}>
      <h3 style={{ color:'#666', fontSize:'0.78rem', fontWeight:'700',
        margin:'0 0 4px', textTransform:'uppercase', letterSpacing:'0.8px' }}>{title}</h3>
      {note && <p style={{ color:'#bbb', fontSize:'0.72rem', margin:'0 0 16px' }}>{note}</p>}
      {!note && <div style={{ height:'16px' }} />}
      {children}
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ margin:'60px 0 12px', borderLeft:`4px solid ${LIGHT_PURPLE}`, paddingLeft:'16px' }}>
      <h2 style={{ color:'#4a1a63', fontSize:'1.2rem', fontWeight:'800', margin:0 }}>{title}</h2>
      {subtitle && <p style={{ color:'#aaa', fontSize:'0.8rem', margin:'4px 0 0' }}>{subtitle}</p>}
    </div>
  )
}

function IntroCard({ children }) {
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
      <p style={{ color:'#555', fontSize:'0.93rem', lineHeight:'1.85', margin:0 }}>
        {children}
      </p>
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export function Dashboard() {
  const {
    loading,
    totalSurveyed, victims, porcentajeVictimas,
    trabajan, tienenApoyo, sientenSegura,
    porTramoEdad, porDistrito, porSituacionLaboral, porEstadoCivil, porConvivencia,
    porLugarHechos, porRelacionAgresor, porDenuncia,
    secuelas, apoyoBuscado,
    adondeAcudiria, porRazonNoDenuncia, porMedidasPrev, porOpcionPrev,
  } = useDatos()

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'80vh' }}>
      <div style={{ textAlign:'center' }}>
        <div className="spinner" />
        <p style={{ color:PURPLE, fontSize:'1rem', fontWeight:'600', marginTop:'16px' }}>
          Cargando datos...
        </p>
      </div>
    </div>
  )

  const grid2 = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))', gap:'22px' }
  const grid3 = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'22px' }

  // ── Datos de gráficos ────────────────────────────────────────────────────

  // Sección 1 – Perfil demográfico
  const victimasDonut = buildDonut(
    { 'Víctimas': victims, 'No víctimas': totalSurveyed - victims },
    [C_VICTIM, C_NO]
  )
  const edadBar = {
    labels: AGE_ORDER.map(k => AGE_LABELS[k] || k),
    datasets: [{
      data: AGE_ORDER.map(k => porTramoEdad[k] || 0),
      backgroundColor: PALETTE.slice(0, AGE_ORDER.length),
      borderRadius: 8, borderSkipped: false,
    }],
  }
  const empleoDonut   = buildDonut(porSituacionLaboral)
  const distritosBar  = buildBar(topN(porDistrito, 8))
  const estadoCivilDonut = buildDonut(porEstadoCivil)
  const convivenciaDonut = buildDonut(applyMap(porConvivencia, CONVIVENCIA_MAP))

  // Sección 2 – El episodio
  const lugarDonut = buildDonut(
    applyMap(porLugarHechos, LUGAR_MAP),
    [C_PRIV, C_PUB, C_VIR]
  )
  const relacionBar   = buildBar(topN(applyMap(porRelacionAgresor, RELACION_MAP), 7))
  const denunciaDonut = buildDonut(
    applyMap(porDenuncia, { 'Sí':'Sí, denunció', 'No':'No denunció' }),
    [C_YES, C_NO_DEN]
  )

  // Sección 3 – Consecuencias
  const secuelasBar = {
    labels: Object.keys(secuelas),
    datasets: [{
      data: Object.values(secuelas),
      backgroundColor: ['#0891b2', '#d45472', '#e06c3a'],
      borderRadius: 6, borderSkipped: false,
    }],
  }
  const apoyoBar = {
    labels: Object.keys(apoyoBuscado),
    datasets: [{
      data: Object.values(apoyoBuscado),
      backgroundColor: ['#d45472', '#8741b3', '#0891b2', '#3b82c4'],
      borderRadius: 6, borderSkipped: false,
    }],
  }

  // Sección 4 – Barreras para denunciar
  const razonesBar = {
    ...buildBar(topN(applyMap(porRazonNoDenuncia, RAZONES_MAP), 8)),
    datasets: [{
      data: Object.values(topN(applyMap(porRazonNoDenuncia, RAZONES_MAP), 8)),
      backgroundColor: [
        '#d45472','#e06c3a','#e8a020','#5baa3f',
        '#0891b2','#3b82c4','#8741b3','#2ea8a0',
      ],
      borderRadius: 6, borderSkipped: false,
    }],
  }

  // Sección 5 – Recursos y prevención
  const adondeBar = {
    labels: Object.keys(adondeAcudiria),
    datasets: [{
      data: Object.values(adondeAcudiria),
      backgroundColor: ['#3b82c4','#8741b3','#0891b2','#d45472','#e8a020'],
      borderRadius: 6, borderSkipped: false,
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

  const stats = [
    { title:'Total encuestadas',      value: totalSurveyed,             color: PURPLE },
    { title:'Víctimas directas',       value: `${porcentajeVictimas}%`, color: '#b03070' },
    { title:'Con apoyo cercano',       value: tienenApoyo,              color: '#2e7d6b' },
    { title:'Trabajan actualmente',    value: trabajan,                  color: '#5e5ea8' },
    { title:'Se sienten seguras',      value: sientenSegura,            color: '#c47a00' },
  ]

  return (
    <div style={{ backgroundColor:'#f8f4ff', minHeight:'100vh', padding:'50px 7%' }}>

      {/* Cabecera */}
      <header style={{ marginBottom:'40px', textAlign:'center' }}>
        <h1 style={{ color:PURPLE, fontSize:'2rem', fontWeight:'800', margin:0 }}>
          Panel de Resultados
        </h1>
        <p style={{ color:'#999', fontSize:'0.9rem', margin:'10px 0 0' }}>
          Análisis de encuestas sobre violencia sexual — Comunidad de Madrid
        </p>
        <div style={{ width:'50px', height:'4px',
          background:`linear-gradient(to right,${PURPLE},${LIGHT_PURPLE})`,
          margin:'16px auto 0', borderRadius:'2px' }} />
      </header>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'16px', marginBottom:'10px' }}>
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      {/* ── 1. Perfil demográfico ──────────────────────────────── */}
      <SectionHeader title="Perfil demográfico" subtitle={`Distribución de las ${totalSurveyed.toLocaleString()} mujeres encuestadas`} />
      <div style={grid2}>
        <IntroCard>
          La encuesta recoge los datos de <strong>{totalSurveyed.toLocaleString()} mujeres</strong> residentes
          en la Comunidad de Madrid, con edades comprendidas entre los 16 y los 65 años o más. La muestra
          abarca distintos distritos, situaciones laborales, estados civiles y formas de convivencia,
          lo que ofrece una imagen representativa de la diversidad de las mujeres madrileñas.
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

      {/* ── 2. El episodio ─────────────────────────────────────── */}
      <SectionHeader
        title="El episodio"
        subtitle={`Datos referidos únicamente a las ${victims} víctimas directas`}
      />
      <div style={grid3}>
        <IntroCard>
          Los episodios de violencia sexual ocurren mayoritariamente en <strong>espacios privados</strong> —
          el hogar o entornos cerrados — y, en la gran mayoría de los casos, <strong>el agresor era
          una persona conocida</strong> por la víctima. La ex-pareja es el perfil más frecuente, seguida
          de compañeros de trabajo o estudios y amigos. Estos datos cuestionan el estereotipo del agresor
          desconocido y evidencian que la violencia sexual se produce, sobre todo, dentro de relaciones
          de confianza. A pesar de ello, una proporción significativa de víctimas <strong>no denunció</strong> los hechos.
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

      {/* ── 3. Consecuencias e impacto ─────────────────────────── */}
      <SectionHeader
        title="Consecuencias e impacto"
        subtitle="Secuelas sufridas y redes de apoyo activadas"
      />
      <div style={grid2}>
        <IntroCard>
          Las consecuencias de la violencia sexual son principalmente de naturaleza <strong>psicológica</strong>:
          la mayoría de las víctimas reportó secuelas emocionales o mentales, en muchos casos combinadas con
          daño físico. Ante estos episodios, las mujeres tienden a buscar apoyo en su entorno más cercano
          antes que en instituciones o servicios especializados. Las <strong>amigas y familiares mujeres</strong> son
          las figuras de apoyo más frecuentes, lo que refleja la importancia de las redes de cuidado informal
          y la desconfianza hacia los canales formales de atención.
        </IntroCard>
        <ChartCard title="Tipo de secuelas" note="Víctimas que sufrieron secuelas tras el episodio">
          <Bar data={secuelasBar} options={hBarOpts} />
        </ChartCard>
        <ChartCard title="¿A quién buscó apoyo?" note="Personas del entorno a quienes se acudió">
          <Bar data={apoyoBar} options={hBarOpts} />
        </ChartCard>
      </div>

      {/* ── 4. Barreras para denunciar ─────────────────────────── */}
      <SectionHeader
        title="Barreras para denunciar"
        subtitle="Razón principal por la que las mujeres no denuncian una agresión sexual (todos los encuestados)"
      />
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'22px' }}>
        <IntroCard>
          A pesar de la gravedad de los hechos, la denuncia formal sigue siendo una opción minoritaria.
          Las encuestadas señalan el <strong>miedo al agresor</strong> como la razón principal para no
          denunciar, seguido del temor a no ser creídas y la vergüenza. Estos datos revelan que el
          sistema judicial todavía genera desconfianza entre las víctimas, y que el <strong>estigma social</strong> y
          la culpabilización continúan siendo obstáculos determinantes. Abordar estas barreras es
          imprescindible para mejorar el acceso a la justicia.
        </IntroCard>
        <ChartCard title="Razones para no denunciar (ranking 1 — razón más citada)" tall>
          <Bar data={razonesBar} options={hBarOpts} />
        </ChartCard>
      </div>

      {/* ── 5. Recursos y prevención ───────────────────────────── */}
      <SectionHeader
        title="Recursos y prevención"
        subtitle="Qué harían las encuestadas y qué medidas consideran más efectivas"
      />
      <div style={grid3}>
        <IntroCard>
          Ante un episodio de violencia sexual, la mayoría de las mujeres acudiría en primer lugar a la
          <strong> policía o la guardia civil</strong>, aunque los centros especializados en violencia sexual
          y los hospitales también cuentan con un respaldo significativo. En cuanto a la prevención,
          la <strong>educación afectivo-sexual</strong> en las escuelas es considerada la medida más eficaz
          por encima de las campañas de sensibilización. Y cuando se plantea elegir entre dos enfoques,
          la mayoría prioriza <strong>educar a los hombres para que no agredan</strong> sobre enseñar
          a las mujeres estrategias de autoprotección, lo que refleja que la responsabilidad debe recaer
          en quien agrede, no en quien sufre la agresión.
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

      <p style={{ textAlign:'center', color:'#bbb', fontSize:'0.78rem', marginTop:'60px', fontStyle:'italic' }}>
        * Datos basados en el análisis de encuestas realizadas en la Comunidad de Madrid.
      </p>
    </div>
  )
}
