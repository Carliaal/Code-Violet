import { useDatos } from '../hooks/useDatos' 

export function Dashboard() {
  const { 
    loading, 
    totalSurveyed, 
    porcentajeVictimas, 
    trabajan, 
    vivenSolas 
  } = useDatos()

  if (loading) return <p>Cargando datos del CSV...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Resultados</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1sfr)', gap: '10px' }}>
        <Card title="Total Encuestadas" value={totalSurveyed} />
        <Card title="Porcentaje Víctimas" value={`${porcentajeVictimas}%`} />
        <Card title="Mujeres que Trabajan" value={trabajan} />
        <Card title="Viven Solas" value={vivenSolas} />
      </div>

    </div>
  )
}

function Card({ title, value }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}