import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

export default function MateriSayaSiswa() {
  const navigate = useNavigate();
  const { subject } = useParams();

  // Data dummy materi
  const [materiList] = useState([
    { 
      id: 1, 
      judul: "Aljabar Dasar", 
      deskripsi: "Materi pengenalan aljabar untuk pemula",
      durasi: "30 menit",
      level: "Pemula",
      tanggal: "2024-01-15"
    },
    { 
      id: 2, 
      judul: "Geometri Bangun Datar", 
      deskripsi: "Memahami bentuk-bentuk geometri dasar",
      durasi: "45 menit", 
      level: "Pemula",
      tanggal: "2024-01-20"
    },
    { 
      id: 3, 
      judul: "Trigonometri", 
      deskripsi: "Konsep sinus, cosinus, dan tangent",
      durasi: "60 menit",
      level: "Menengah",
      tanggal: "2024-01-25"
    }
  ]);

  const handleMulaiBelajar = (materiId) => {
    // Navigate to lesson page
    navigate(`/belajar/${subject}/${materiId}`);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.profileSection}>
          <div style={styles.profileCircle}></div>
          <h2 style={styles.name}>Halo, Siswa!</h2>
        </div>
        <Button variant="menu" onClick={() => navigate("/beranda-siswa")}>Dashboard</Button>
        <Button variant="menu">Tugas</Button>
        <Button variant="menu">Materi</Button>
        <Button variant="menu">Pengaturan</Button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {/* HEADER */}
        <div style={styles.header}>
          <Button onClick={() => navigate(-1)} style={styles.backButton} variant="link">Kembali</Button>
          <h1 style={styles.title}>Materi {subject ? subject.toUpperCase() : ""}</h1>
        </div>

        {/* INFO MATA PELAJARAN */}
        <div style={styles.infoCard}>
          <h2 style={styles.infoTitle}>Selamat Belajar! 🎓</h2>
          <p style={styles.infoText}>
            Di sini kamu bisa mempelajari semua materi <strong>{subject}</strong>. 
            Pilih materi yang ingin dipelajari dan mulai perjalanan belajarmu!
          </p>
        </div>

        {/* DAFTAR MATERI */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Materi Pembelajaran</h2>
          
          <div style={styles.materiList}>
            {materiList.map(materi => (
              <div key={materi.id} style={styles.materiCard}>
                <div style={styles.materiContent}>
                  <div style={styles.materiHeader}>
                    <h3 style={styles.materiTitle}>{materi.judul}</h3>
                  </div>
                  
                  <p style={styles.materiDeskripsi}>{materi.deskripsi}</p>
                  
                  <div style={styles.materiMeta}>
                    <span style={styles.metaItem}>📅 {materi.tanggal}</span>
                  </div>
                </div>
                
                <Button style={styles.pelajariButton} onClick={() => handleMulaiBelajar(materi.id)}>
                  Mulai Belajar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== STYLE ==============
const styles = {
  page: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    background: "#808080",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
  },
  profileSection: {
    textAlign: "center",
    marginBottom: "30px",
  },
  profileCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#4dd0e1",
    margin: "0 auto 10px",
  },
  name: {
    fontSize: "18px",
    margin: 0,
    fontWeight: "600",
  },
  menuBtn: {
    width: "80%",
    padding: "12px",
    background: "white",
    color: "#A52A2A",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: "30px 40px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#003cbd",
    fontSize: "16px",
    cursor: "pointer",
    marginRight: "15px",
    padding: "8px 12px",
  },
  title: { 
    fontSize: "28px", 
    fontWeight: "700",
    color: "#000",
    margin: 0
  },
  infoCard: {
    background: "linear(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  infoTitle: {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#000",
  },
  infoText: {
    fontSize: "16px",
    margin: 0,
    opacity: 0.9,
    color: "#000",
  },
  section: {
    background: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#000",
  },
  materiList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  materiCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    background: "#fafafa",
  },
  materiContent: {
    flex: 1,
  },
  materiHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  materiTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
    margin: 0,
  },
  levelBadge: {
    display: "none",
  },
  materiDeskripsi: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 10px 0",
  },
  materiMeta: {
    display: "flex",
    gap: "15px",
  },
  metaItem: {
    fontSize: "12px",
    color: "#888",
  },
  pelajariButton: {
    background: "#4dd0e1",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    width: "36%",
    margin: 0,
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    alignSelf: "center",
    justifyContent: "center",
  },
};