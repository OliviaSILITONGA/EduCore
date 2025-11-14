// File: Dosen.jsx
import React, { useContext } from "react";
import { NavigationContext } from "../App";

const PRIMARY_COLOR = "#6C2BDD"; 

export default function Dosen() {
  const { setCurrentPage } = useContext(NavigationContext);

  const dosenData = [
    // Data dummy tetap sama (hanya menampilkan sebagai Guru)
    {
      id: 1,
      nama: "Dr. Budi Santoso",
      email: "budi.santoso@educore.ac.id",
      hp: "+62 812-3456-7890",
      spesialisasi: "Pemrograman & Algoritma",
      kantor: "Gedung A, Ruang 201",
      jam: "Senin-Jumat: 13.00-17.00",
      kelas: ["Pemrograman Dasar", "Struktur Data"],
    },
    {
      id: 2,
      nama: "Prof. Andi Wijaya",
      email: "andi.wijaya@educore.ac.id",
      hp: "Tersedia saat jam konsultasi", 
      spesialisasi: "Basis Data & Sistem Informasi",
      kantor: "Gedung B, Ruang 105",
      jam: "Selasa-Kamis: 14.00-16.00",
      kelas: ["Basis Data", "Database Design"],
    },
    {
        id: 3,
        nama: "Dr. Siti Nurhaliza",
        email: "siti.nurhaliza@educore.ac.id",
        hp: "+62 812-1111-2222",
        spesialisasi: "Ekonomi dan Bisnis Digital",
        kantor: "Gedung C, Ruang 305",
        jam: "Rabu-Jumat: 10.00-12.00",
        kelas: ["Ekonomi Mikro", "Pengantar Bisnis"],
    },
  ];

  return (
    <main className="container" style={{ padding: "60px 0", color: '#333' }}>
      <button
        onClick={() => setCurrentPage("home")}
        style={{
          marginBottom: 24,
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

      {/* Teks Judul diubah menjadi Direktori Guru */}
      <h2 style={{ marginBottom: 32, fontSize: '2rem' }}>Direktori Guru</h2> 
      <p style={{ marginBottom: 40, color: '#666' }}>
        Temukan informasi kontak dan spesialisasi semua Guru di EduCore.
      </p>

      <div
        className="dosen-grid" // Tetap menggunakan nama class dosen-grid secara internal
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}
      >
        {dosenData.map((dosen) => (
          <div
            key={dosen.id}
            className="dosen-card"
            style={{
              background: '#fff',
              borderRadius: '16px', 
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', 
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Header dan Spesialisasi */}
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '4px', color: PRIMARY_COLOR }}>
                {dosen.nama}
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Bidang: <strong style={{ color: '#333' }}>{dosen.spesialisasi}</strong>
              </p>
            </div>

            {/* Detail Kontak */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                fontSize: '0.9rem',
                color: '#666'
              }}
            >
              <div>
                <strong>✉️ Email:</strong>
                <br />
                <a 
                  href={`mailto:${dosen.email}`} 
                  style={{ color: PRIMARY_COLOR, textDecoration: 'none' }}
                >
                  {dosen.email}
                </a>
              </div>
              <div>
                <strong>🏢 Kantor:</strong>
                <br />
                {dosen.kantor}
              </div>
              <div>
                <strong>⏰ Konsultasi:</strong>
                <br />
                {dosen.jam}
              </div>
              <div>
                <strong>📱 HP/WA:</strong>
                <br />
                {dosen.hp}
              </div>
            </div>

            {/* Kelas yang Diajar */}
            <div>
              <h4 style={{ marginBottom: 12, fontSize: "1.0rem", color: '#333' }}>
                Mengajar Kelas:
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {dosen.kelas.map((kl, idx) => (
                  <span
                    key={idx}
                    className="chip"
                    style={{
                      padding: "8px 12px",
                      background: 'rgba(108, 43, 221, 0.1)', 
                      color: PRIMARY_COLOR,
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600
                    }}
                  >
                    {kl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}