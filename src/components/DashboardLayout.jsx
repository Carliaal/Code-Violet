import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/dashboard', label: 'Resumen', end: true },
  { to: '/dashboard/demografia', label: 'Demografía' },
  { to: '/dashboard/episodio', label: 'El Episodio' },
  { to: '/dashboard/consecuencias', label: 'Consecuencias' },
  { to: '/dashboard/barreras', label: 'Barreras' },
  { to: '/dashboard/recursos', label: 'Recursos' },
]

export function DashboardLayout({ children }) {
  return (
    <div>
      <div style={{
        background: 'white',
        borderBottom: '1px solid rgba(169,126,196,0.2)',
        boxShadow: '0 2px 10px rgba(107,45,139,0.07)',
        position: 'sticky',
        top: '60px',
        zIndex: 90,
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', padding: '0 7%', gap: '2px', minWidth: 'max-content' }}>
          {tabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              style={({ isActive }) => ({
                padding: '13px 18px',
                textDecoration: 'none',
                color: isActive ? '#8741b3' : '#777',
                fontWeight: isActive ? '600' : '400',
                fontSize: '0.88rem',
                borderBottom: isActive ? '2px solid #8741b3' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                letterSpacing: '0.2px',
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f4ff', minHeight: '100vh', padding: '48px 7%' }}>
        {children}
      </div>
    </div>
  )
}
