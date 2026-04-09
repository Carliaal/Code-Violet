import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav style={{ 
      padding: '10px 20px', 
      background: '#a97ec4', 
      marginBottom: '20px',
      display: 'flex',              
      justifyContent: 'space-between', 
      alignItems: 'center'         
    }}>
      
      <img 
        src="/logo.png" 
        alt="cinta morada" 
        style={{ maxWidth: '40px', borderRadius: '100%' }} 
      />

      <div>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Inicio</Link> 
        <span style={{ margin: '0 10px', color: 'white' }}>|</span>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/dashboard">Dashboard</Link> 
      </div>

    </nav>
  );
}