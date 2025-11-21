// LoginSiswa.jsx - UPDATE DENGAN CONSOLE LOG
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginSiswa() {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("🟢 LOGIN SISWA: Navigasi ke /beranda-siswa");
    navigate("/beranda-siswa");
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <h1 style={styles.brand}>Educore</h1>
        <p style={styles.tagline}>Belajar cerdas, bukan lebih keras</p>
      </div>

      <div style={styles.right}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Login Siswa</h2>

          <Input type="email" placeholder="Email" style={styles.input} />
          <Input type="password" placeholder="Password" style={styles.input} />

          <Button onClick={handleLogin}>Login</Button>

          <p style={styles.registerText}>
            Belum punya akun?{" "}
            <span
              style={styles.registerLink}
              onClick={() => navigate("/register-siswa")}
            >
              Daftar
            </span>
          </p>
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
  },

  /* KIRI */
  left: {
    width: "50%",
    background: "#808080",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  brand: { fontSize: "50px", fontWeight: "bold" },

  tagline: { marginTop: "-10px" },

  /* KANAN */
  right: {
    width: "50%",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formBox: {
    width: "70%",
  },

  title: {
    fontSize: "32px",
    marginBottom: "25px",
    fontWeight: "600",
    color: "#000",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    background: "#003cbd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "600",
  },

  registerText: { 
  marginTop: 15, 
  color: "black",        // 🔥 Tambah warna teks biar terlihat
},
registerLink: { 
  color: "blue", 
  cursor: "pointer",
  fontWeight: "bold" 
},

};


