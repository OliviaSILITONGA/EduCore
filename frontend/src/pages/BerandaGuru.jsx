import React from "react";
import { useNavigate } from "react-router-dom";

// IMPORT GAMBAR SESUAI FILE DI DALAM FOLDER
import mtk from "../assets/images/mtk.jpg";
import indo from "../assets/images/B.indo.jpg";
import inggris from "../assets/images/B.inggris.jpg";
import biologi from "../assets/images/biologi.jpg";
import kimia from "../assets/images/kimia.jpg";
import fisika from "../assets/images/fisika.jpg";
import geografi from "../assets/images/geografi.jpg";
import ekonomi from "../assets/images/ekonomi.jpg";
import sejarah from "../assets/images/sejarah.jpg";
import utamaGuru from "../assets/images/utama_guru.jpg";

export default function BerandaGuru() {
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

  // Function untuk handle klik card
  const handleCardClick = (subjectTitle) => {
    navigate(`/mata-pelajaran/${subjectTitle.toLowerCase()}`);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <img src={utamaGuru} alt="guru" style={styles.profileImg} />
        <h2 style={styles.name}>Halo, Guru!</h2>

        <button style={styles.menuBtn}>Dashboard</button>
        <button style={styles.menuBtn}>Data Siswa</button>
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
    background: "#808080",
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

  name: { fontSize: "22px", marginBottom: "20px" },

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
    padding: "25px 40px",
    overflowY: "auto",
  },

  title: { fontSize: "28px", fontWeight: "700", marginBottom: "20px" },

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