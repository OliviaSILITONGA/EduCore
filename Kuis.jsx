// File: Kuis.jsx
import React, { useContext } from "react";
import { NavigationContext } from "../App";

const PRIMARY_COLOR = "#6C2BDD"; 

export default function Kuis() {
  const { setCurrentPage } = useContext(NavigationContext);

  const kuisData = [
    {
      id: 1,
      judul: "Kuis Pemrograman Dasar - Chapter 1",
      deskripsi: "Menguji pemahaman konsep dasar programming",
      durasi: "30 menit",
      pertanyaan: 20,
      deadline: "2025-11-20",
      status: "aktif",
    },
    {
      id: 2,
      judul: "Kuis Struktur Data - Linked List",
      deskripsi: "Evaluasi pemahaman tentang linked list dan operasinya",
      durasi: "45 menit",
      pertanyaan: 25,
      deadline: "2025-11-22",
      status: "aktif",
    },
    {
      id: 3,
      judul: "Kuis Basis Data - Normalisasi",
      deskripsi: "Mengevaluasi pemahaman normalisasi database",
      durasi: "40 menit",
      pertanyaan: 15,
      deadline: "2025-11-25",
      status: "ditutup", 
    },
    {
      id: 4,
      judul: "Kuis Web Development - HTML/CSS",
      deskripsi: "Kuis tentang HTML dan CSS fundamentals",
      durasi: "20 menit",
      pertanyaan: 10,
      deadline: "2025-11-18",
      status: "aktif",
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

      <h2 style={{ marginBottom: 32, fontSize: '2rem' }}>Kumpulan Kuis & Evaluasi</h2>
      <p style={{ marginBottom: 40, color: '#666' }}>
        Kerjakan kuis sesuai jadwal dan pantau tenggat waktu Anda.
      </p>

      <div className="kuis-list" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {kuisData.map((kuis) => (
          <div
            key={kuis.id}
            className="kuis-item"
            style={{
              background: '#fff',
              borderRadius: '16px', 
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)', 
              padding: '25px',
              borderLeft: `5px solid ${kuis.status === 'aktif' ? PRIMARY_COLOR : '#ccc'}`, 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
            onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 8, color: PRIMARY_COLOR, fontSize: '1.3rem' }}>
                {kuis.judul}
              </h3>
              <p style={{ color: "#666", marginBottom: 12, fontSize: '1.0rem' }}>
                {kuis.deskripsi}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  fontSize: "0.9rem",
                  color: "#666",
                  marginTop: 10,
                  flexWrap: 'wrap'
                }}
              >
                <span>📝 **{kuis.pertanyaan}** Pertanyaan</span>
                <span>⏱️ **{kuis.durasi}**</span>
                <span style={{ fontWeight: 600, color: kuis.status === 'aktif' ? PRIMARY_COLOR : '#d32f2f' }}>
                  📅 Tenggat Waktu: {kuis.deadline}
                </span>
              </div>
            </div>
            <span
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "0.85rem",
                fontWeight: 700,
                background:
                  kuis.status === "aktif"
                    ? 'rgba(108, 43, 221, 0.15)' 
                    : 'rgba(160, 160, 160, 0.1)', 
                color:
                  kuis.status === "aktif"
                    ? PRIMARY_COLOR
                    : '#999',
                minWidth: '100px', // Disesuaikan agar teks BUKA/TUTUP muat
                textAlign: 'center'
              }}
            >
              {/* Teks BUKA/TUTUP disesuaikan */}
              {kuis.status === "aktif" ? "✔️ BUKA" : "❌ TUTUP"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}