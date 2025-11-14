// File: Kelas.jsx
import React, { useContext } from "react";
import { NavigationContext } from "../App";

const PRIMARY_COLOR = "#6C2BDD"; 

export default function Kelas() {
  const { setCurrentPage } = useContext(NavigationContext);

  const kelasData = [
    {
      id: 1,
      nama: "Pemrograman Dasar",
      dosen: "Dr. Budi Santoso",
      mahasiswa: 120, // Tetap menggunakan key 'mahasiswa' secara internal
      materi: 15,
      thumb: "/assets/img/course-1.svg",
    },
    {
      id: 2,
      nama: "Struktur Data",
      dosen: "Prof. Andi Wijaya",
      mahasiswa: 95,
      materi: 20,
      thumb: "/assets/img/course-2.svg",
    },
    {
      id: 3,
      nama: "Basis Data",
      dosen: "Dr. Siti Nurhaliza",
      mahasiswa: 110,
      materi: 18,
      thumb: "/assets/img/course-3.svg",
    },
    {
      id: 4,
      nama: "Web Development",
      dosen: "Mr. Ricky Chen",
      mahasiswa: 85,
      materi: 22,
      thumb: "/assets/img/course-4.svg",
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

      <h2 style={{ marginBottom: 32, fontSize: '2rem' }}>Semua Kelas Aktif</h2>

      <div 
        className="card-grid" 
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px',
        }}
      >
        {kelasData.map((kelas) => (
          <div 
            key={kelas.id} 
            className="card"
            style={{
              background: '#fff',
              borderRadius: '16px', 
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="thumb" style={{ height: '180px', overflow: 'hidden' }}>
              <img 
                src={kelas.thumb} 
                alt={kelas.nama} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: PRIMARY_COLOR }}>{kelas.nama}</h3>
              <p style={{ fontSize: "0.95rem", color: "#666" }}>
                Guru: <strong style={{ color: '#333' }}>{kelas.dosen}</strong>
              </p>
              <div
                className="meta"
                style={{
                  marginTop: 15,
                  paddingTop: 15,
                  borderTop: "1px solid #eee", 
                  display: "flex",
                  gap: 15,
                  fontSize: '0.9rem'
                }}
              >
                {/* Mengganti Mahasiswa menjadi Murid */}
                <span 
                  className="chip"
                  style={{ color: '#666' }}
                >
                  👥 {kelas.mahasiswa} Murid
                </span>
                <span 
                  className="chip"
                  style={{ color: '#666' }}
                >
                  📚 {kelas.materi} Materi
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}