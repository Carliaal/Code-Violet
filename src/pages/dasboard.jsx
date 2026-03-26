import { useDatos } from '../hooks/useDatos'

export function Dashboard() {
  const { 
    loading, 
    totalSurveyed, 
    porcentajeVictimas, 
    trabajan, 
    vivenSolas 
  } = useDatos()

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ color: '#8741b3', fontSize: '1.5rem', fontWeight: 'bold' }}>Cargando datos del CSV...</p>
    </div>
  )

  return (
    <div style={{ 
      backgroundColor: '#f8f4ff', 
      minHeight: '100vh', 
      padding: '60px 10%',
      marginTop: '-25px' 
    }}>
      <header style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ color: '#8741b3', fontSize: '35px', fontWeight: 'bold', marginBottom: '10px' }}>
          Panel de Resultados
        </h1>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#a97ec4', margin: '0 auto' }}></div>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px' 
      }}>
        <Card title="Total Encuestadas" value={totalSurveyed} />
        <Card title="Porcentaje Víctimas" value={`${porcentajeVictimas}%`} />
        <Card title="Mujeres que Trabajan" value={trabajan} />
        <Card title="Viven Solas" value={vivenSolas} />
      </div>

      <section style={{ marginTop: '60px', textAlign: 'center', color: '#555' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          * Datos actualizados basados en el análisis de registros de La Comunidad de Madrid.
        </p>
      </section>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '30px', 
      borderRadius: '20px', 
      boxShadow: '0 10px 25px rgba(135, 65, 179, 0.1)',
      textAlign: 'center',
      border: '1px solid rgba(169, 126, 196, 0.2)',
      transition: 'transform 0.3s ease'
    }}>
      <h3 style={{ 
        color: '#666', 
        fontSize: '1.1rem', 
        marginBottom: '15px',
        fontWeight: '500' 
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: '42px', 
        fontWeight: 'bold', 
        color: '#8741b3',
        margin: '0'
      }}>
        {value}
      </p>
    </div>
  )
}