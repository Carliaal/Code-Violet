import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export const PURPLE       = '#8741b3'
export const LIGHT_PURPLE = '#a97ec4'

export const PALETTE = [
  '#8741b3', '#0891b2', '#e06c3a', '#5baa3f', '#d45472',
  '#e8a020', '#3b82c4', '#2ea8a0', '#6b60b8', '#a3522e',
]

export const C_VICTIM  = '#d45472'
export const C_NO      = '#e5e7eb'
export const C_YES     = '#5baa3f'
export const C_NO_DEN  = '#e06c3a'
export const C_PRIV    = '#8741b3'
export const C_PUB     = '#0891b2'
export const C_VIR     = '#e8a020'

export const AGE_ORDER = [
  'De 16 a 24 años','De 25 a 34 años','De 35 a 44 años',
  'De 45 a 54 años','De 55 a 64 años','65 años o más',
]
export const AGE_LABELS = {
  'De 16 a 24 años':'16-24','De 25 a 34 años':'25-34','De 35 a 44 años':'35-44',
  'De 45 a 54 años':'45-54','De 55 a 64 años':'55-64','65 años o más':'65+',
}

export const LUGAR_MAP = {
  'En el espacio privado':'Espacio privado',
  'En el espacio público':'Espacio público',
  'En el espacio virtual':'Espacio virtual',
}

export const RELACION_MAP = {
  'Compañero de trabajo y/o estudios':'Compañero/a de trabajo',
  'Jefe o superior jerárquico':'Jefe o superior',
  'Varios de los anteriores':'Varios',
}

export const RAZONES_MAP = {
  'Por miedo al agresor':'Miedo al agresor',
  'Por miedo a que no la crean':'Temor a no ser creída',
  'Por vergüenza':'Vergüenza',
  'Por miedo a ser considerada culpable de lo sucedido':'Culpabilización',
  'Por el señalamiento/ rechazo o consecuencias a nivel social o familiar':'Señalamiento social',
  'Por el desgaste emocional':'Desgaste emocional',
  'Por falta de información adecuada':'Falta de información',
  'Por el coste económico que conlleva':'Coste económico',
}

export const MEDIDAS_MAP = {
  'Facilitar información general sobre qué hacer y a qué lugares acudir en caso desufrir violencia sexual':'Facilitar información',
  'Campañas de sensibilización e información contra la violencia sexual':'Campañas de sensibilización',
}

export const OPCION_MAP = {
  'Educar a los hombres a no agredir (sexualmente)':'Educar a los hombres',
  'Enseñar a las mujeres a evitar situaciones de riesgo':'Enseñar autoprotección',
}

export const CONVIVENCIA_MAP = {
  'En pareja con hijos/as':'Con pareja e hijos',
  'En pareja sin hijos/as':'Con pareja (sin hijos)',
  'Con familiares (familia extensa)':'Con familiares',
  'Con compañeros/as de priso (no familiares)':'Compañeros/as de piso',
  'Sola con hijos/as':'Sola con hijos',
}

export function applyMap(obj, map) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [map[k] ?? k, v])
  )
}

export function topN(obj, n = 8) {
  return Object.fromEntries(
    Object.entries(obj).sort(([,a],[,b]) => b - a).slice(0, n)
  )
}

export function buildBar(obj) {
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

export function buildDonut(obj, colors = PALETTE) {
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

export const donutOpts = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 14, usePointStyle: true } },
  },
  cutout: '68%',
}

export const barOpts = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 } } },
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
}

export const hBarOpts = {
  responsive: true,
  indexAxis: 'y',
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 } } },
    y: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
}
