import { useState } from "react";
import { Link } from "react-router-dom";
import { EmergencyCard } from "../components/EmergencyCard";
import { ShapeDivider } from "../components/ShapeDivider";

export function Home() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const getHelpButtonStyle = {
    backgroundColor: isButtonHovered ? "#8c5ca5" : "#a97ec4",
    color: "white",
    padding: "15px 30px",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    boxShadow: isButtonHovered
      ? "0 6px 20px rgba(135, 65, 179, 0.6)"
      : "0 4px 15px rgba(169, 126, 196, 0.4)",
    display: "inline-block",
    transition: "all 0.3s ease",
    transform: isButtonHovered ? "scale(1.1)" : "scale(1)",
    cursor: "pointer",
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/fondo.png')",
          marginTop: "-25px",
          padding: "0",
          backgroundSize: "cover",
        }}
      >
        <section style={{ paddingLeft: "10%" }}>
          <h1 style={{ color: "#8741b3", paddingTop: "15%", fontSize: "35px" }}>
            YOU ARE NOT ALONE
          </h1>
          <h3 style={{ fontSize: "20px" }}>
            We are here to listen and support you
          </h3>
        </section>
        <section style={{ paddingLeft: "10%", paddingBottom: "7%" }}>
          <Link
            to="/ayuda"
            style={getHelpButtonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            GET HELP NOW
          </Link>
        </section>
      </div>

      <div
        style={{
          display: "flex",
          padding: "80px 10%",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: '#a97ec4'
        }}
      >
        <section style={{ width: "60%", maxWidth: "800px", textAlign: "left", backgroundColor: "#ffffff", borderRadius: "15px", padding: "2%" }}>
          <h1
            style={{
              color: "#8741b3",
              fontSize: "28px",
              marginBottom: "25px",
              fontWeight: "bold",
            }}
          >
            What is Code Violet?
          </h1>
          <blockquote
            style={{
              fontStyle: "italic",
              borderLeft: "4px solid #a97ec4",
              paddingLeft: "20px",
              marginBottom: "25px",
              color: "#555",
              fontSize: "1.1rem",
              lineHeight: "1.5",
            }}
          >
            "You are not alone. There is a whole support system designed to
            protect and accompany you every step of the way."
            <cite
              style={{
                color: "#8741b3",
                display: "block",
                marginTop: "8px",
                fontStyle: "normal",
                fontWeight: "bold",
              }}
            >
              — Code Violet Team
            </cite>
          </blockquote>
          <p style={{ lineHeight: "1.8", color: "#333", fontSize: "1.05rem" }}>
            We were born with the mission to break the silence through digital
            innovation. We combine statistical analysis of social reality with
            direct access to emergency resources, creating a space where
            technology serves women's safety.
          </p>
        </section>

        <section style={{ textAlign: "right", width: "35%" }}>
          <img
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            src="/violencia.jpg"
            alt="stop violence"
          />
        </section>
      </div>

      <ShapeDivider topColor="#a97ec4" bottomColor="#ffffff" />

      <div
        style={{
          padding: "80px 10%",
          textAlign: "center",
          backgroundImage: "url('/fondo_2.png')",
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
          backgroundColor: "#ffffff"
        }}
      >
        <h2
          style={{ color: "#8741b3", marginBottom: "40px", fontSize: "28px" }}
        >
          Immediate Resources
        </h2>
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <EmergencyCard
            number="016"
            description="Free and confidential 24/7 helpline"
          />
          <EmergencyCard
            number="112"
            description="Emergency services and law enforcement"
          />
          <EmergencyCard
            number="WhatsApp"
            description="Text-only support: +34 600 000 016"
          />
        </div>
      </div>

      <footer
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        <p>© 2026 Code Violet - Technology with Purpose</p>
      </footer>
    </>
  );
}