import { useState } from "react"
import { Link } from "react-router-dom"
import { EmergencyCard } from "../components/EmergencyCard"
import { ShapeDivider } from "../components/ShapeDivider"
import { useDatos } from "../hooks/useDatos"

const sectionLinks = [
  { to: '/dashboard/demografia',    label: 'Perfil Demográfico',    color: '#8741b3' },
  { to: '/dashboard/episodio',      label: 'El Episodio',           color: '#b03070' },
  { to: '/dashboard/consecuencias', label: 'Consecuencias',         color: '#2e7d6b' },
  { to: '/dashboard/barreras',      label: 'Barreras',              color: '#c05030' },
  { to: '/dashboard/recursos',      label: 'Recursos y Prevención', color: '#5e5ea8' },
]

export function Home() {
  const [btnHover, setBtnHover] = useState(false)
  const { totalSurveyed, porcentajeVictimas, tienenApoyo, sientenSegura, loading } = useDatos()

  return (
    <>
      {/* Hero */}
      <div style={{
        backgroundImage: "url('/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "480px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 10% 120px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(255,255,255,0.92) 38%, rgba(248,244,255,0.7) 60%, transparent 80%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "540px" }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f3eaf9, #ede0f7)',
            color: '#8741b3',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: '20px',
            marginBottom: '18px',
            border: '1px solid rgba(169,126,196,0.35)',
          }}>
            Apoyo · Recursos · Datos
          </div>
          <h1 style={{
            color: "#4a1a63",
            fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
            fontWeight: "900",
            lineHeight: "1.12",
            marginBottom: "20px",
          }}>
            No estás sola.<br />
            <span style={{ color: "#8741b3" }}>Estamos aquí.</span>
          </h1>
          <p style={{
            color: "#666", fontSize: "1.05rem", lineHeight: "1.75",
            marginBottom: "36px", maxWidth: "440px",
          }}>
            Tecnología al servicio de la seguridad de las mujeres.
            Accede a recursos de emergencia y consulta datos reales sobre violencia sexual.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to="/dashboard"
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                backgroundColor: btnHover ? "#6b2d8b" : "#8741b3",
                color: "white",
                padding: "15px 34px",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "700",
                letterSpacing: "0.8px",
                boxShadow: btnHover
                  ? "0 8px 28px rgba(107,45,139,0.6)"
                  : "0 4px 16px rgba(135,65,179,0.4)",
                display: "inline-block",
                transition: "all 0.3s ease",
                transform: btnHover ? "translateY(-3px) scale(1.03)" : "scale(1)",
              }}
            >
              Ver datos del análisis
            </Link>
            <a
              href="#recursos"
              style={{
                color: "#8741b3", fontWeight: "600", fontSize: "0.92rem",
                textDecoration: "none", borderBottom: "2px solid #a97ec4",
                paddingBottom: "2px",
              }}
            >
              Recursos de emergencia
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      {!loading && (
        <div style={{
          background: "linear-gradient(135deg, #5c1f80 0%, #9b6bbf 100%)",
          padding: "36px 10%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          {[
            { label: "Mujeres encuestadas",   value: totalSurveyed.toLocaleString() },
            { label: "Reportaron violencia",  value: `${porcentajeVictimas}%` },
            { label: "Con apoyo cercano",     value: tienenApoyo.toLocaleString() },
            { label: "Se sienten seguras",    value: sientenSegura.toLocaleString() },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ textAlign: "center", color: "white" }}>
                <p style={{ fontSize: "2.2rem", fontWeight: "800", margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: "0.82rem", margin: "6px 0 0", opacity: 0.8, letterSpacing: '0.3px' }}>{s.label}</p>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* About */}
      <div style={{
        display: "flex",
        padding: "90px 10%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "48px",
        flexWrap: "wrap",
        backgroundColor: "white",
      }}>
        <section style={{ flex: "1 1 320px", maxWidth: "580px" }}>
          <p style={{
            color: "#a97ec4", fontWeight: "700", fontSize: "0.75rem",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px",
          }}>
            Sobre nosotras
          </p>
          <h2 style={{ color: "#4a1a63", fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: "800", marginBottom: "20px", lineHeight: '1.2' }}>
            ¿Qué es Code Violet?
          </h2>
          <blockquote style={{
            borderLeft: "4px solid #a97ec4",
            paddingLeft: "20px",
            margin: "0 0 24px",
            color: "#777",
            fontStyle: "italic",
            fontSize: "1.05rem",
            lineHeight: "1.65",
          }}>
            "No estás sola. Existe todo un sistema de apoyo diseñado para protegerte
            y acompañarte en cada paso del camino."
            <cite style={{
              display: "block", marginTop: "10px",
              fontStyle: "normal", fontWeight: "600", color: "#8741b3", fontSize: '0.9rem',
            }}>
              — Equipo Code Violet
            </cite>
          </blockquote>
          <p style={{ lineHeight: "1.85", color: "#555", fontSize: "1rem", marginBottom: "32px" }}>
            Nacimos con la misión de romper el silencio a través de la innovación digital.
            Combinamos análisis estadístico de la realidad social con acceso directo a
            recursos de emergencia, creando un espacio donde la tecnología sirve a
            la seguridad de las mujeres.
          </p>

          <p style={{ color: '#666', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Explora el análisis
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sectionLinks.map(s => (
              <Link
                key={s.to}
                to={s.to}
                style={{
                  display: 'inline-block',
                  color: s.color,
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}30`,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </section>

        <section style={{ flex: "1 1 280px", maxWidth: "420px" }}>
          <img
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "0 20px 50px rgba(107,45,139,0.18)",
              display: 'block',
            }}
            src="/violencia.jpg"
            alt="stop violence"
          />
        </section>
      </div>

      <ShapeDivider topColor="#ffffff" bottomColor="#f8f4ff" />

      {/* Emergency resources */}
      <div
        id="recursos"
        style={{
          padding: "90px 10%",
          textAlign: "center",
          backgroundColor: "#f8f4ff",
          backgroundImage: "url('/fondo_2.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p style={{
          color: "#a97ec4", fontWeight: "700", fontSize: "0.75rem",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px",
        }}>
          Líneas de emergencia
        </p>
        <h2 style={{ color: "#4a1a63", marginBottom: "12px", fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: "800" }}>
          Recursos Inmediatos
        </h2>
        <p style={{ color: "#888", marginBottom: "16px", fontSize: "0.95rem" }}>
          Disponibles las 24 horas, los 7 días de la semana.
        </p>
        <div style={{
          display: 'inline-block',
          background: '#fff3cd',
          color: '#856404',
          fontSize: '0.82rem',
          fontWeight: '600',
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '48px',
          border: '1px solid #ffc107',
        }}>
          Llamadas gratuitas y confidenciales
        </div>
        <div style={{
          display: "flex",
          gap: "28px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <EmergencyCard
            number="016"
            description="Línea gratuita y confidencial 24/7"
          />
          <EmergencyCard
            number="112"
            description="Servicios de emergencia y fuerzas del orden"
          />
          <EmergencyCard
            number="WhatsApp"
            description="Apoyo por texto: +34 600 000 016"
          />
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: "60px 10% 40px",
        background: "linear-gradient(135deg, #3a1552 0%, #6b2d8b 100%)",
        color: "white",
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }}>
          <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logo.png" alt="logo" style={{ width: '36px', height: '36px', borderRadius: '50%', opacity: 0.9 }} />
              <span style={{ fontWeight: '700', fontSize: '1rem' }}>Code Violet</span>
            </div>
            <p style={{ opacity: 0.65, fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
              Tecnología al servicio de la seguridad de las mujeres. Datos, recursos y apoyo.
            </p>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <p style={{ fontWeight: '700', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '16px' }}>
              Análisis
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sectionLinks.map(s => (
                <Link key={s.to} to={s.to} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.88rem' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <p style={{ fontWeight: '700', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '16px' }}>
              Emergencias
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: '016 — Violencia doméstica', href: 'tel:016' },
                { label: '112 — Emergencias', href: 'tel:112' },
                { label: 'WhatsApp +34 600 000 016', href: 'https://wa.me/34600000016' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.88rem' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.82rem', opacity: 0.5 }}>
            © 2026 Code Violet · Tecnología con Propósito · Comunidad de Madrid
          </p>
        </div>
      </footer>
    </>
  )
}
