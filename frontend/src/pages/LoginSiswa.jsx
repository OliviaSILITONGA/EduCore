import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import { loginSiswa } from "../services/api";

export default function LoginSiswa() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginSiswa(email, password);
      navigate("/beranda-siswa");
    } catch (err) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center px-12 bg-linear-to-b from-[#27B4E3] to-[#0029A2] text-white">
        <img src={Logo} alt="Educore Logo" className="h-110 w-auto" />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center px-12 max-w-md mx-auto w-full">
        <form onSubmit={handleLogin}>
          {/* Title */}
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Masuk</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* INPUT EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg"
          />

          {/* INPUT PASSWORD */}
          <input
            type="password"
            placeholder="Kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg mt-4"
          />

          {/* FORGOT PASSWORD */}
          <a href="#" className="text-blue-700 text-sm font-semibold mt-2 block">
            Lupa kata sandi?
          </a>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-200 text-blue-800 font-bold text-xl mt-6 hover:bg-blue-300 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-700 text-sm mt-4">
          Tidak punya akun?{" "}
          <Link to="/register-siswa" className="text-blue-700 font-semibold">
            Buat akun
          </Link>
        </p>
      </div>
    </div>
  );
}
