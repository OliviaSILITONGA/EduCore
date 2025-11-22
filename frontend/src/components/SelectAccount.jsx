import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
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
        <Button
          onClick={() => navigate("/login-guru")}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <img src={gambarGuru} alt="Guru" style={styles.icon} />
          <span>Untuk Guru</span>
        </Button>

        {/* SISWA */}
        <Button
          variant="menu"
          onClick={() => navigate("/login-siswa")}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <img src={gambarSiswa} alt="Siswa" style={styles.icon} />
          <span>Untuk Siswa</span>
        </Button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    background: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    textAlign: "center",
    width: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#000",
  },

  sub: { marginTop: "-5px", color: "#666" },

  choose: {
    marginTop: "20px",
    marginBottom: "18px",
    color: "#000",
    fontSize: "18px",
    fontWeight: "600",
  },

  btn: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    borderRadius: "10px",
    background: "white",
    border: "1px solid #e0e0e0",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "600",
    color: "#A52A2A",
  },

  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};
