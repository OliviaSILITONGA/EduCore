import React, { useState, useContext, useEffect } from "react";
import { NavigationContext } from "../App";

export default function LoginRegister() {
  const { setCurrentPage } = useContext(NavigationContext);
  const [userRole, setUserRole] = useState("mahasiswa");
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Membaca peran yang dipilih dari RoleSelection
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email wajib diisi";
    if (!password) newErrors.password = "Password wajib diisi";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulasikan Login Berhasil
    alert(`Login berhasil: ${email} (${userRole})`);
    
    setEmail("");
    setPassword("");
    setErrors({});
    localStorage.removeItem("userRole");

    // NAVIGASI BERHASIL KE DASHBOARD
    setCurrentPage("dashboard"); 
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = "Nama wajib diisi";
    if (!email) newErrors.email = "Email wajib diisi";
    if (!password) newErrors.password = "Password wajib diisi";
    if (userRole === "dosen" && !nip) newErrors.nip = "NIP/ID wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulasikan Registrasi Berhasil
    alert(`Pendaftaran berhasil: ${name} (${userRole})`);

    // Reset Form
    setName("");
    setEmail("");
    setPassword("");
    setNip("");
    setErrors({});
    
    // Pindah ke tab Login setelah pendaftaran
    setActiveTab("login");
  };

  const isDosen = userRole === "dosen";

  return (
    <main className="container" style={{ padding: "60px 0" }}>
      <button
        onClick={() => setCurrentPage("home")}
        style={{
          marginBottom: 40,
          padding: "8px 16px",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          color: "var(--text)",
        }}
      >
        ← Kembali ke Beranda
      </button>

      <div style={{ maxWidth: 400, margin: "0 auto", color: "var(--text)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 8 }}>
          {activeTab === "login" ? "Masuk" : "Daftar"} Sebagai {isDosen ? "Guru" : "Murid"}
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            marginBottom: 32,
            fontSize: "0.95rem",
          }}
        >
          Silakan {activeTab === "login" ? "masuk" : "daftar"} untuk mengakses dasbor Anda.
        </p>

        {/* Tab Selector */}
        <div
          style={{
            display: "flex",
            marginBottom: 32,
            borderRadius: "var(--radius)",
            background: "rgba(255, 255, 255, 0.08)",
            padding: 4,
          }}
        >
          <button
            onClick={() => setActiveTab("login")}
            style={{
              flex: 1,
              padding: "10px 0",
              background: activeTab === "login" ? "var(--primary)" : "transparent",
              color: "var(--text)",
              border: "none",
              borderRadius: "var(--radius)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Masuk
          </button>
          <button
            onClick={() => setActiveTab("register")}
            style={{
              flex: 1,
              padding: "10px 0",
              background: activeTab === "register" ? "var(--primary)" : "transparent",
              color: "var(--text)",
              border: "none",
              borderRadius: "var(--radius)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Daftar
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <section>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: errors.email ? "var(--accent)" : "rgba(255, 255, 255, 0.15)",
                }}
              />
              {errors.email && (
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    marginTop: "-7px",
                  }}
                >
                  {errors.email}
                </div>
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: errors.password
                    ? "var(--accent)"
                    : "rgba(255, 255, 255, 0.15)",
                  marginTop: errors.email ? 8 : 0,
                }}
              />
              {errors.password && (
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    marginTop: "-7px",
                  }}
                >
                  {errors.password}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Masuk
              </button>
            </form>
          </section>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <section>
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderColor: errors.name ? "var(--accent)" : "rgba(255, 255, 255, 0.15)",
                }}
              />
              {errors.name && (
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    marginTop: "-7px",
                  }}
                >
                  {errors.name}
                </div>
              )}

              {isDosen && (
                <>
                  <input
                    type="text"
                    placeholder="NIP/ID Guru"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    style={{
                      borderColor: errors.nip ? "var(--accent)" : "rgba(255, 255, 255, 0.15)",
                    }}
                  />
                  {errors.nip && (
                    <div
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.85rem",
                        marginBottom: 8,
                        marginTop: "-7px",
                      }}
                    >
                      {errors.nip}
                    </div>
                  )}
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: errors.email ? "var(--accent)" : "rgba(255, 255, 255, 0.15)",
                }}
              />
              {errors.email && (
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    marginTop: "-7px",
                  }}
                >
                  {errors.email}
                </div>
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: errors.password
                    ? "var(--accent)"
                    : "rgba(255, 255, 255, 0.15)",
                  marginTop: errors.email ? 8 : 0,
                }}
              />
              {errors.password && (
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                    marginBottom: 8,
                    marginTop: "-7px",
                  }}
                >
                  {errors.password}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Daftar
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}