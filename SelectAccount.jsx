import { useNavigate } from "react-router-dom";
import gambarGuru from "../assets/images/gambar_guru.jpg";
import gambarSiswa from "../assets/images/gambar_siswa.jpg";

export default function SelectAccount() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Educore</h1>
        <p style={styles.sub}>Belajar cerdas, bukan lebih keras</p>

        <h2 style={styles.choose}>Pilih Tipe Akun</h2>

        {/* GURU */}
        <button style={styles.btn} onClick={() => navigate("/login-guru")}>
          <img src={gambarGuru} alt="Guru" style={styles.icon} />
          <span>Untuk Guru</span>
        </button>

        {/* SISWA */}
        <button
          style={{ ...styles.btn, background: "#bbdefb" }}
          onClick={() => navigate("/login-siswa")}
        >
          <img src={gambarSiswa} alt="Siswa" style={styles.icon} />
          <span>Untuk Siswa</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(180deg, #49c7f0, #003cbd)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    textAlign: "center",
    width: "400px",
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
  },

  sub: { marginTop: "-5px", color: "#fff" },

  choose: {
    marginTop: "25px",
    marginBottom: "20px",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
  },

  btn: {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "12px",
    background: "#4dd0e1",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontWeight: "600",
    color: "#003c47",
  },

  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};
