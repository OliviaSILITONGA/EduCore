import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function RegisterGuru() {
  const navigate = useNavigate();

  return (
    <div style={stylesGuru.page}>
      {/* KIRI */}
      <div style={stylesGuru.left}>
        <h1 style={stylesGuru.brand}>Educore</h1>
        <p style={stylesGuru.tagline}>Belajar cerdas, bukan lebih keras</p>
      </div>

      {/* KANAN */}
      <div style={stylesGuru.right}>
        <div style={stylesGuru.formBox}>
          <h2 style={stylesGuru.title}>Register Guru</h2>

          <Input type="text" placeholder="Nama Lengkap" style={stylesGuru.input} />
          <Input type="email" placeholder="Email" style={stylesGuru.input} />
          <Input type="password" placeholder="Password" style={stylesGuru.input} />
          <Input type="password" placeholder="Konfirmasi Password" style={stylesGuru.input} />

          <Button>Daftar</Button>

          <p style={stylesGuru.registerText}>
            Sudah punya akun?{" "}
            <span
              style={stylesGuru.registerLink}
              onClick={() => navigate("/login-guru")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const stylesGuru = {
  page: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },

  left: {
    flex: 1,
    background: "#808080",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  brand: { fontSize: "50px", fontWeight: "bold" },
  tagline: { marginTop: "-10px" },

  right: {
    flex: 1,
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formBox: { width: "70%" },

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
