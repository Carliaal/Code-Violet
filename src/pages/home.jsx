import { useState } from "react";
import { Link } from "react-router-dom";
import { EmergencyCard } from "../components/EmergencyCard";
import { ShapeDivider } from "../components/ShapeDivider";
import { useDatos } from "../hooks/useDatos";

export function Home() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const { totalSurveyed, porcentajeVictimas, tienenApoyo, loading } = useDatos();

  const getHelpButtonStyle = {
    backgroundColor: isButtonHovered ? "#6b2d8b" : "#8741b3",
    color: "white",
    padding: "16px 36px",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1.05rem",
    fontWeight: "700",
    letterSpacing: "1px",
    boxShadow: isButtonHovered
      ? "0 8px 24px rgba(107, 45, 139, 0.65)"
      : "0 4px 16px rgba(135, 65, 179, 0.45)",
    display: "inline-block",
    transition: "all 0.3s ease",
    transform: isButtonHovered ? "translateY(-3px) scale(1.04)" : "scale(1)",
    cursor: "pointer",
  };

  return (
    <>
      {/* Hero */}
      <div
        style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 10% 100px",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(255,255,255,0.85) 45%, transparent 80%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
          <p style={{
            color: "#8741b3", fontWeight: "700", fontSize: "0.85rem",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px",
          }}>
            Apoyo · Recursos · Datos
          </p>
          <h1 style={{
            color: "#4a1a63", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "900", lineHeight: "1.15", marginBottom: "20px",
          }}>
            No estás sola.<br />
            <span style={{ color: "#8741b3" }}>Estamos aquí.</span>
          </h1>
          <p style={{
            color: "#555", fontSize: "1rem", lineHeight: "1.7",
            marginBottom: "36px", maxWidth: "440px",
          }}>
            Tecnología al servicio de la seguridad de las mujeres.
            Accede a recursos de emergencia y consulta datos reales.
          </p>
          <Link
            to="/ayuda"
            style={getHelpButtonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            OBTENER AYUDA
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      {!loading && (
        <div style={{
          background: "linear-gradient(135deg, #6b2d8b 0%, #a97ec4 100%)",
          padding: "32px 10%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          {[
            { label: "Mujeres encuestadas", value: totalSurveyed },
            { label: "Reportaron violencia", value: `${porcentajeVictimas}%` },
            { label: "Cuentan con apoyo cercano", value: tienenApoyo },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", color: "white" }}>
              <p style={{ fontSize: "2rem", fontWeight: "800", margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: "0.85rem", margin: "4px 0 0", opacity: 0.85 }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* What is Code Violet */}
      <div style={{
        display: "flex",
        padding: "80px 10%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
        backgroundColor: "white",
      }}>
        <section style={{ flex: "1 1 320px", maxWidth: "600px" }}>
          <p style={{
            color: "#a97ec4", fontWeight: "700", fontSize: "0.8rem",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px",
          }}>
            Sobre nosotras
          </p>
          <h2 style={{ color: "#4a1a63", fontSize: "1.9rem", fontWeight: "800", marginBottom: "20px" }}>
            ¿Qué es Code Violet?
          </h2>
          <blockquote style={{
            borderLeft: "4px solid #a97ec4",
            paddingLeft: "20px",
            marginBottom: "24px",
            color: "#777",
            fontStyle: "italic",
            fontSize: "1.05rem",
            lineHeight: "1.6",
          }}>
            "No estás sola. Existe todo un sistema de apoyo diseñado para protegerte
            y acompañarte en cada paso del camino."
            <cite style={{
              display: "block", marginTop: "8px",
              fontStyle: "normal", fontWeight: "600", color: "#8741b3",
            }}>
              — Equipo Code Violet
            </cite>
          </blockquote>
          <p style={{ lineHeight: "1.8", color: "#555", fontSize: "1rem" }}>
            Nacimos con la misión de romper el silencio a través de la innovación digital.
            Combinamos análisis estadístico de la realidad social con acceso directo a
            recursos de emergencia, creando un espacio donde la tecnología sirve a
            la seguridad de las mujeres.
          </p>
          <Link
            to="/dashboard"
            style={{
              display: "inline-block", marginTop: "24px",
              color: "#8741b3", fontWeight: "600", fontSize: "0.95rem",
              textDecoration: "none", borderBottom: "2px solid #a97ec4",
              paddingBottom: "2px",
            }}
          >
            Ver datos del análisis →
          </Link>
        </section>

        <section style={{ flex: "1 1 280px", maxWidth: "440px" }}>
          <img
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "0 16px 40px rgba(107,45,139,0.15)",
            }}
            src="/violencia.jpg"
            alt="stop violence"
          />
        </section>
      </div>

      <ShapeDivider topColor="#ffffff" bottomColor="#f8f4ff" />

      {/* Emergency resources */}
      <div style={{
        padding: "80px 10%",
        textAlign: "center",
        backgroundColor: "#f8f4ff",
        backgroundImage: "url('/fondo_2.png')",
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
      }}>
        <p style={{
          color: "#a97ec4", fontWeight: "700", fontSize: "0.8rem",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px",
        }}>
          Líneas de emergencia
        </p>
        <h2 style={{ color: "#4a1a63", marginBottom: "12px", fontSize: "1.9rem", fontWeight: "800" }}>
          Recursos Inmediatos
        </h2>
        <p style={{ color: "#888", marginBottom: "48px", fontSize: "0.95rem" }}>
          Disponibles las 24 horas, los 7 días de la semana.
        </p>
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

      <footer style={{
        padding: "48px 10%",
        textAlign: "center",
        background: "linear-gradient(135deg, #3a1552 0%, #6b2d8b 100%)",
        color: "white",
      }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "40px", height: "40px", borderRadius: "50%", marginBottom: "16px", opacity: 0.9 }}
        />
        <p style={{ margin: 0, fontWeight: "600", fontSize: "0.95rem" }}>Code Violet</p>
        <p style={{ margin: "6px 0 0", fontSize: "0.82rem", opacity: 0.65 }}>
          © 2026 · Tecnología con Propósito
        </p>
      </footer>
    </>
  );
}
