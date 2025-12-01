import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/images/Educore_Logo_White.png";

export default function LoginGuru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login validation
  const handleLogin = () => {
    // Validasi jika field kosong
    if (!formData.username.trim() || !formData.password.trim()) {
      alert("Harap isi nama pengguna/email dan kata sandi terlebih dahulu!");
      return;
    }

    // Validasi minimal panjang password (opsional)
    if (formData.password.length < 6) {
      alert("Kata sandi harus minimal 6 karakter!");
      return;
    }

    // Jika semua validasi passed, lanjutkan login
    navigate("/beranda-guru");
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center px-12 bg-gradient-to-b from-[#27B4E3] to-[#0029A2] text-white">
        <img src={Logo} alt="Educore Logo" className="h-auto w-auto" />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center px-12 max-w-md mx-auto w-full">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Masuk</h2>

        {/* INPUT EMAIL */}
        <input
          type="text"
          name="username"
          placeholder="Nama pengguna atau email"
          className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg"
          value={formData.username}
          onChange={handleInputChange}
        />

        {/* INPUT PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Kata sandi"
          className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg mt-4"
          value={formData.password}
          onChange={handleInputChange}
        />

        {/* FORGOT PASSWORD */}
        <Link
          to="/lupasandi-guru"
          className="text-blue-700 text-sm font-semibold mt-2 block"
        >
          Lupa kata sandi?
        </Link>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-blue-200 text-blue-800 font-bold text-xl mt-6 hover:bg-blue-300 transition-colors"
        >
          Masuk
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-700 text-sm mt-4">
          Tidak punya akun?{" "}
          <Link to="/register-guru" className="text-blue-700 font-semibold">
            Buat akun
          </Link>
        </p>
      </div>
    </div>
  );
}
