import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";

export default function LoginSiswa() {
  const navigate = useNavigate();
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
          placeholder="Nama pengguna atau email"
          className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg"
        />

        {/* INPUT PASSWORD */}
        <input
          type="password"
          placeholder="Kata sandi"
          className="w-full p-4 bg-blue-100 rounded-xl outline-none text-blue-900 placeholder-blue-400 text-lg mt-4"
        />

        {/* FORGOT PASSWORD */}
        <a href="#" className="text-blue-700 text-sm font-semibold mt-2 block">
          Lupa kata sandi?
        </a>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/beranda-siswa")}
          className="w-full py-3 rounded-xl bg-blue-200 text-blue-800 font-bold text-xl mt-6 hover:bg-blue-300"
        >
          Masuk
        </button>

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
