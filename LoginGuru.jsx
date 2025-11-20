import { useNavigate } from "react-router-dom";

export default function LoginGuru() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* BAGIAN KIRI */}
      <div style={styles.left}>
        <h1 style={styles.brand}>Educore</h1>
        <p style={styles.tagline}>Belajar cerdas, bukan lebih keras</p>
      </div>

      {/* BAGIAN KANAN */}
      <div style={styles.right}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Login Guru</h2>

          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />

          <button
  style={styles.btn}
  onClick={() => navigate("/beranda-guru")}
>
  Login
</button>


          <p style={styles.registerText}>
            Belum punya akun?{" "}
            <span
              style={styles.registerLink}
              onClick={() => navigate("/register-guru")}
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
    background: "linear-gradient(180deg, #49c7f0, #003cbd)",
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
