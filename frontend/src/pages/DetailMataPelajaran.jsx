// pages/DetailMataPelajaran.jsx - UPDATE DENGAN DESAIN GAMBAR
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function DetailMataPelajaran() {
  const { subject } = useParams();
  const navigate = useNavigate();

  // Data kelas sesuai gambar
  const kelasList = [
    { id: 1, name: "KELAS 1", pelajaran: "", status: "Tambah" },
    { id: 2, name: "KELAS 2", pelajaran: "", status: "Tambah" },
    { id: 3, name: "KELAS 3", pelajaran: "", status: "Tambah" },
    { id: 4, name: "KELAS 4", pelajaran: "", status: "Tambah" },
    { id: 5, name: "KELAS 5", pelajaran: "", status: "Tambah" },
    { id: 6, name: "KELAS 6", pelajaran: "", status: "Tambah" },
    { id: 7, name: "KELAS 7", pelajaran: "", status: "Tambah" },
    { id: 8, name: "KELAS 8", pelajaran: "", status: "Tambah" },
    { id: 9, name: "KELAS 9", pelajaran: "", status: "Tambah" },
    { id: 10, name: "KELAS 10", pelajaran: "", status: "Tambah" },
    { id: 11, name: "KELAS 11", pelajaran: "", status: "Tambah" },
    { id: 12, name: "KELAS 12", pelajaran: "", status: "Tambah" },
  ];

  const handleKelasClick = (kelasId, e) => {
    e.stopPropagation(); // Mencegah event bubbling
    console.log("Kelas diklik:", kelasId);
    // Navigate ke halaman ManajemenKelas
    navigate(`/manajemen-kelas/${subject}`);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.profileSection}>
          <div style={styles.profileCircle}></div>
          <h2 style={styles.name}>Halo, Guru!</h2>
        </div>

        <Button variant="menu" onClick={() => navigate("/beranda-guru")}>Dashboard</Button>
        <Button variant="menu">Data Siswa</Button>
        <Button variant="menu">Materi</Button>
        <Button variant="menu">Pengaturan</Button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {/* HEADER */}
        <div style={styles.header}>
          <Button onClick={() => navigate("/beranda-guru")} style={styles.backBtn} variant="link">Kembali</Button>
          <h1 style={styles.subjectTitle}>{subject ? subject.toUpperCase() : "MATA PELAJARAN"}</h1>
        </div>

        {/* GRID KELAS - SESUAI GAMBAR */}
        <div style={styles.grid}>
          {kelasList.map((kelas) => (
            <div 
              key={kelas.id} 
              style={styles.kelasCard}
            >
              <div style={styles.kelasHeader}>
                <h3 style={styles.kelasName}>{kelas.name}</h3>
                {kelas.pelajaran && (
                  <span style={styles.pelajaranText}>{kelas.pelajaran}</span>
                )}
              </div>
              
              <div style={styles.kelasFooter}>
                {kelas.pelajaran && kelas.pelajaran !== "UJIAN" && (
                  <span style={styles.tambahText}>Tambahkan</span>
                )}
                <Button
                  style={styles.statusBtn}
                  onClick={(e) => handleKelasClick(kelas.id, e)}
                >
                  {kelas.status}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// STYLES - UPDATE SESUAI GAMBAR
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
    background: "#ccc",
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
    marginBottom: "30px",
    gap: "20px",
  },
  
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#003cbd",
    fontWeight: "600",
    padding: "8px 0",
  },
  
  subjectTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#000",
    margin: 0,
  },
  
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  
  kelasCard: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "140px",
    border: "2px solid #e0e0e0",
  },
  
  kelasHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  
  kelasName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
  },
  
  pelajaranText: {
    fontSize: "12px",
    color: "#666",
    background: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  
  kelasFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  
  tambahText: {
    fontSize: "12px",
    color: "#666",
    fontStyle: "italic",
  },
  
  statusBtn: {
    background: "#003cbd",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
};