// File: RoleSelection.jsx
import React, { useContext } from "react";
import { NavigationContext } from "../App";

const PRIMARY_COLOR = "#6C2BDD"; 
const TEXT_COLOR = "#333";
const CARD_BG = "#fff";
const BORDER_RADIUS = "16px";

export default function RoleSelection() {
  const { setCurrentPage } = useContext(NavigationContext);

  const handleRoleSelect = (role) => {
    localStorage.setItem("userRole", role);
    setCurrentPage("loginRegister");
  };

  return (
    <main className="container" style={{ padding: "60px 0", minHeight: "80vh", color: TEXT_COLOR }}>
      <button
        onClick={() => setCurrentPage("home")}
        style={{
          marginBottom: 40,
          padding: "8px 16px",
          background: "none",
          border: "1px solid #ddd",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          color: "#666",
        }}
      >
        ← Kembali ke Beranda
      </button>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 10, fontSize: '2rem' }}>
          Selamat Datang
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 50,
            fontSize: "1.0rem",
          }}
        >
          Silakan pilih peran Anda untuk melanjutkan ke halaman login/daftar.
        </p>

        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
            flexWrap: 'wrap'
          }}
        >
          {/* Card MURID */}
          <div
            onClick={() => handleRoleSelect("mahasiswa")}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: 30,
              border: `1px solid #eee`,
              borderRadius: BORDER_RADIUS,
              background: CARD_BG,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", 
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(108, 43, 221, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
            <h3 style={{ marginBottom: 8, fontSize: "1.3rem", color: PRIMARY_COLOR }}>
              Murid
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: 20 }}>
              Akses materi, kerjakan kuis, dan pantau progres belajar Anda.
            </p>
            <button
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                background: PRIMARY_COLOR,
                color: '#fff',
                border: 'none',
                fontWeight: 600
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect("mahasiswa");
              }}
            >
              Masuk sebagai Murid
            </button>
          </div>

          {/* Card GURU */}
          <div
            onClick={() => handleRoleSelect("dosen")}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: 30,
              border: `1px solid #eee`,
              borderRadius: BORDER_RADIUS,
              background: CARD_BG,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(108, 43, 221, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍🏫</div>
            <h3 style={{ marginBottom: 8, fontSize: "1.3rem", color: PRIMARY_COLOR }}>
              Guru
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: 20 }}>
              Kelola kelas, buat kuis, dan pantau progres murid.
            </p>
            <button
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                background: PRIMARY_COLOR,
                color: '#fff',
                border: 'none',
                fontWeight: 600
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelect("dosen");
              }}
            >
              Masuk sebagai Guru
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}