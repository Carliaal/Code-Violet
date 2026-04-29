import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export function Navbar() {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith('/dashboard')

  const isActive = (path) => path === '/dashboard' ? isDashboard : pathname === path

  return (
    <nav style={{
      padding: '0 32px',
      background: 'linear-gradient(135deg, #5c1f80 0%, #9b6bbf 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 20px rgba(92,31,128,0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '60px',
    }}>
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
      >
        <img
          src="/logo.png"
          alt="Code Violet logo"
          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }}
        />
        <span style={{ color: 'white', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.3px' }}>
          Code Violet
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {[
          { to: '/', label: 'Inicio' },
          { to: '/dashboard', label: 'Dashboard' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              fontWeight: isActive(to) ? '600' : '400',
              fontSize: '0.9rem',
              backgroundColor: isActive(to) ? 'rgba(255,255,255,0.18)' : 'transparent',
              borderBottom: isActive(to) ? '2px solid rgba(255,255,255,0.6)' : '2px solid transparent',
              transition: 'all 0.2s ease',
              letterSpacing: '0.2px',
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
