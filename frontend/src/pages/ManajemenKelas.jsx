import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";
import useTeacherProfile from "../hooks/useTeacherProfile";

export default function ManajemenKelas() {
  const navigate = useNavigate();
  const { matpel } = useParams();
  const { profile } = useTeacherProfile();

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8">
        <img src={Logo} alt="EduCore Logo" className="h-25 left-10" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Guru!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-guru")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Data Siswa
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.header}>
          <Button
            onClick={() => navigate(-1)}
            style={styles.backButton}
            variant="link"
          >
            Kembali
          </Button>
          <h1 style={styles.title}>Manajemen Kelas {matpel}</h1>
        </div>

        <div style={styles.card}>
          <h2>Selamat datang di Manajemen Kelas!</h2>
          <p>
            Mata Pelajaran: <strong>{matpel}</strong>
          </p>
          <p>Di sini Anda bisa mengelola materi dan daftar murid.</p>

          <div style={styles.buttonContainer}>
            <Button style={styles.primaryButton}>Lihat Materi</Button>
            <Button style={styles.primaryButton}>Lihat Daftar Murid</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  profilePlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
    background: "#ccc",
  },
  name: {
    fontSize: "22px",
    marginBottom: "20px",
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
    padding: "25px 40px",
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
    color: "#3498db",
    fontSize: "16px",
    cursor: "pointer",
    marginRight: "15px",
    padding: "8px 12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  primaryButton: {
    padding: "12px 24px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
