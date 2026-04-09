import { useState } from "react";

export function EmergencyCard({ number, description }) {
  const [isHover, setIsHover] = useState(false);

  const defaultPurple = "#a97ec4"; 
  const darkPurple = "#8741b3";    

  const cardStyle = {
    flex: "1 1 280px", 
    maxWidth: "350px", 
    padding: "50px 30px", 
    textAlign: "center",
    borderRadius: "20px",
    backgroundColor: "white",
    
    border: `2px solid ${isHover ? darkPurple : "#eee"}`,
    
    boxShadow: isHover 
      ? `0 20px 40px rgba(135, 65, 179, 0.25)` 
      : "0 10px 20px rgba(0,0,0,0.08)",       
    
    transform: isHover ? "translateY(-12px)" : "translateY(0)",
    
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    
    cursor: "pointer",
    position: "relative" 
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        width: '80%',
        height: '4px',
        backgroundColor: darkPurple,
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        opacity: isHover ? 1 : 0.6,
        transition: 'all 0.3s ease'
      }}></div>

      <h2 style={{ 
        color: darkPurple,
        fontSize: "42px",  
        fontWeight: "800",
        marginBottom: "15px",
        marginTop: '10px'
      }}>{number}</h2>
      
      <p style={{ 
        color: "#555", 
        fontSize: "17px", 
        lineHeight: "1.5", 
        margin: 0,
        fontWeight: "500"
      }}>{description}</p>
    </div>
  );
}