import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const { pathname } = useLocation()

  const linkStyle = (path) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '7px 16px',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '0.92rem',
    backgroundColor: pathname === path ? 'rgba(255,255,255,0.22)' : 'transparent',
    transition: 'background 0.2s ease',
    letterSpacing: '0.2px',
  })

  return (
    <nav style={{
      padding: '12px 28px',
      background: 'linear-gradient(135deg, #6b2d8b 0%, #a97ec4 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 16px rgba(107,45,139,0.35)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
      >
        <img
          src="/logo.png"
          alt="Code Violet logo"
          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <span style={{ color: 'white', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.3px' }}>
          Code Violet
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle("/")}>Inicio</Link>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
      </div>
    </nav>
  )
}
