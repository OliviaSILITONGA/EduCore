import React from "react";
import { useNavigate } from "react-router-dom";

// IMPORT GAMBAR
import mtk from "../assets/images/gambar_beranda/beranda_siswa/mtk.jpg";
import indo from "../assets/images/gambar_beranda/beranda_siswa/B.indo.jpg";
import inggris from "../assets/images/gambar_beranda/beranda_siswa/B.inggris.jpg";
import biologi from "../assets/images/gambar_beranda/beranda_siswa/biologi.jpg";
import ekonomi from "../assets/images/gambar_beranda/beranda_siswa/ekonomi.jpg";
import fisika from "../assets/images/gambar_beranda/beranda_siswa/fisika.jpg";
import geografi from "../assets/images/gambar_beranda/beranda_siswa/geografi.jpg";
import kimia from "../assets/images/gambar_beranda/beranda_siswa/kimia.jpg";
import sejarah from "../assets/images/gambar_beranda/beranda_siswa/sejarah.jpg";
import siswaImg from "../assets/images/gambar_beranda/beranda_siswa/utama_siswa.jpg";

export default function BerandaSiswa() {
  const navigate = useNavigate();

  const subjects = [
    { title: "Matematika", img: mtk },
    { title: "Bahasa Indonesia", img: indo },
    { title: "Bahasa Inggris", img: inggris },
    { title: "Biologi", img: biologi },
    { title: "Kimia", img: kimia },
    { title: "Fisika", img: fisika },
    { title: "Geografi", img: geografi },
    { title: "Ekonomi", img: ekonomi },
    { title: "Sejarah", img: sejarah },
  ];

  const handleCardClick = (subjectTitle) => {
    navigate(`/mata-pelajaran-siswa/${subjectTitle.toLowerCase()}`);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <img src={siswaImg} alt="siswa" style={styles.profileImg} />
        <h2 style={styles.name}>Halo, Siswa!</h2>

        <button style={styles.menuBtn}>Dashboard</button>
        <button style={styles.menuBtn}>Tugas</button>
        <button style={styles.menuBtn}>Materi</button>
        <button style={styles.menuBtn}>Pengaturan</button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h1 style={styles.title}>Mata Pelajaran</h1>

        <div style={styles.grid}>
          {subjects.map((item, i) => (
            <div 
              key={i} 
              style={styles.card}
              onClick={() => handleCardClick(item.title)}
            >
              <img src={item.img} style={styles.cardImg} alt={item.title} />
              <p style={styles.cardText}>{item.title}</p>
            </div>
          ))}
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
  },

  sidebar: {
    width: "250px",
    background: "#003cbd",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
  },

  profileImg: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
  },

  name: { fontSize: "22px", marginBottom: "20px", color: "white" },

  menuBtn: {
    width: "80%",
    padding: "12px",
    background: "white",
    color: "#003cbd",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "600",
  },

  content: {
    flex: 1,
    padding: "25px 40px",
    overflowY: "auto",
  },

  title: { 
    fontSize: "28px", 
    fontWeight: "700", 
    marginBottom: "20px",
    color: "#000"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  // CARD
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "210px",
    cursor: "pointer",
  },

  cardImg: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  cardText: {
    marginTop: "10px",
    fontWeight: "700",
    fontSize: "18px",
    color: "#000",
  },
};