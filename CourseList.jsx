// File: CourseList.jsx (Revisi Lengkap dengan Fitur Limit)
import React, { useState } from "react";

const PRIMARY_COLOR = "#6C2BDD"; 
const INITIAL_LIMIT = 4; // Batasan tampilan awal

export default function CourseList() {
  const [filterJurusan, setFilterJurusan] = useState("semua");
  const [searchMatkul, setSearchMatkul] = useState("");
  // State baru untuk mengontrol tampilan semua kelas
  const [showAll, setShowAll] = useState(false); 

  const courses = [
    { id: 1, title: "Kalkulus Dasar", jurusan: "teknik", img: "/assets/img/course-1.svg", desc: "Matematika - 12 pertemuan" },
    { id: 2, title: "Pemrograman Dasar", jurusan: "teknik", img: "/assets/img/course-2.svg", desc: "Ilmu Komputer - 20 pertemuan" },
    { id: 3, title: "Ekonomi Mikro", jurusan: "ekonomi", img: "/assets/img/course-3.svg", desc: "Ekonomi - 10 pertemuan" },
    { id: 4, title: "Biologi Sel", jurusan: "kedokteran", img: "/assets/img/course-4.svg", desc: "Kedokteran - 8 pertemuan" },
    { id: 5, title: "Desain Grafis Fundamental", jurusan: "seni", img: "/assets/img/course-5.svg", desc: "Seni & Desain - 15 pertemuan" },
    { id: 6, title: "Fisika Modern", jurusan: "teknik", img: "/assets/img/course-6.svg", desc: "Fisika - 18 pertemuan" },
    { id: 7, title: "Akuntansi Pengantar", jurusan: "ekonomi", img: "/assets/img/course-7.svg", desc: "Akuntansi - 14 pertemuan" },
    { id: 8, title: "Anatomi Manusia", jurusan: "kedokteran", img: "/assets/img/course-8.svg", desc: "Biologi - 25 pertemuan" },
  ];

  // 1. Filter data berdasarkan input dan jurusan
  const filtered = courses.filter(
    (c) =>
      (filterJurusan === "semua" || c.jurusan === filterJurusan) &&
      c.title.toLowerCase().includes(searchMatkul.toLowerCase())
  );
  
  // 2. Tentukan data yang akan ditampilkan (4 item awal atau semua)
  const coursesToDisplay = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);

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

      <h2 style={{ marginBottom: 24, fontSize: '2rem' }}>Semua Kelas</h2> 

      {/* Filter dan Search (Tidak Berubah) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
          flexWrap: "wrap",
          gap: 15,
        }}
      >
        <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
          <select
            value={filterJurusan}
            onChange={(e) => setFilterJurusan(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 10, 
              border: "1px solid #ddd",
              fontFamily: "inherit",
              background: "#fff",
              color: "#333",
            }}
          >
            <option value="semua">Semua Jurusan</option>
            <option value="teknik">Teknik</option>
            <option value="ekonomi">Ekonomi</option>
            <option value="kedokteran">Kedokteran</option>
            <option value="seni">Seni & Desain</option>
          </select>
          <input
            placeholder="Cari kelas..."
            value={searchMatkul}
            onChange={(e) => setSearchMatkul(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 10, 
              border: "1px solid #ddd",
              fontFamily: "inherit",
              minWidth: "200px",
              background: "#fff",
              color: "#333",
            }}
          />
        </div>
      </div>

      {/* Grid Kartu Mata Kuliah - Menggunakan coursesToDisplay */}
      <div className="card-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
      }}>
        {coursesToDisplay.map((course) => ( // Menggunakan coursesToDisplay
          <article 
            key={course.id} 
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
                src={course.img} 
                alt={course.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: PRIMARY_COLOR }}>{course.title}</h3>
              <p className="muted" style={{ color: '#666', fontSize: '0.95rem', marginBottom: '15px' }}>{course.desc}</p>
              <div className="meta">
                <span 
                  className="chip"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(108, 43, 221, 0.1)', 
                    color: PRIMARY_COLOR,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  Terbaru
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 40, color: '#999' }}>
          Tidak ada kelas yang cocok dengan filter Anda.
        </p>
      )}

      {/* Tombol "Lihat Semua Kelas" */}
      {filtered.length > INITIAL_LIMIT && !showAll && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              background: 'none',
              color: PRIMARY_COLOR,
              padding: '12px 25px',
              borderRadius: '12px',
              border: `2px solid ${PRIMARY_COLOR}`,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1.0rem'
            }}
          >
            Lihat Semua Kelas ({filtered.length})
          </button>
        </div>
      )}
    </main>
  );
}