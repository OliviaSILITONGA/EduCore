// File: Footer.jsx
import React from "react";

const PRIMARY_COLOR = "#6C2BDD"; 

export default function Footer() {
  return (
    <footer 
      className="footer"
      style={{
        background: '#fff', 
        borderTop: '1px solid #eee', 
        padding: '30px 0',
        color: '#666', 
        marginTop: '50px'
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: '15px' 
        }}
      >
        <div style={{ fontSize: '0.95rem' }}>
            © 2025 **EduCore**. Hak Cipta Dilindungi.
        </div>
        <div>
          Hubungi kami: 
          <a 
            href="mailto:support@educore.id" 
            style={{ 
                color: PRIMARY_COLOR, 
                textDecoration: "none", 
                fontWeight: 600,
                marginLeft: '5px'
            }}
          >
            support@educore.id
          </a>
        </div>
      </div>
    </footer>
  );
}

