import { useNavigate } from "react-router-dom";

export default function RegisterSiswa() {
  const navigate = useNavigate();

  return (
    <div style={stylesSiswa.page}>
      {/* KIRI */}
      <div style={stylesSiswa.left}>
        <h1 style={stylesSiswa.brand}>Educore</h1>
        <p style={stylesSiswa.tagline}>Belajar cerdas, bukan lebih keras</p>
      </div>

      {/* KANAN */}
      <div style={stylesSiswa.right}>
        <div style={stylesSiswa.formBox}>
          <h2 style={stylesSiswa.title}>Register Siswa</h2>

          <input type="text" placeholder="Nama Lengkap" style={stylesSiswa.input} />
          <input type="email" placeholder="Email" style={stylesSiswa.input} />
          <input type="password" placeholder="Password" style={stylesSiswa.input} />
          <input type="password" placeholder="Konfirmasi Password" style={stylesSiswa.input} />

          <button style={stylesSiswa.btn}>Daftar</button>

          <p style={stylesSiswa.registerText}>
            Sudah punya akun?{" "}
            <span
              style={stylesSiswa.registerLink}
              onClick={() => navigate("/login-siswa")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const stylesSiswa = {
  page: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },

  left: {
    flex: 1,
    background: "linear-gradient(180deg, #49c7f0, #003cbd)",
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
    color: "black",
  },

  registerLink: {
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
