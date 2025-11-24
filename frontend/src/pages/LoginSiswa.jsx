import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import FACEBOOK_LOGO from "../assets/images/FB.png";
import GOOGLE_LOGO from "../assets/images/GOOGLE.png";

export default function LoginSiswa() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center px-12 bg-gradient-to-b from-[#27B4E3] to-[#0029A2] text-white">
        <img src={Logo} alt="Educore Logo" className="h-110 w-auto" />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center px-12 max-w-md mx-auto w-full">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-900 mb-6">masuk</h2>

        {/* FACEBOOK BUTTON */}
        <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md flex items-center justify-center gap-3 hover:bg-blue-700">
          <img src={FACEBOOK_LOGO} alt="Facebook Logo" className="w-8 h-8" />
          Masuk dengan Facebook
        </button>

        {/* GOOGLE BUTTON */}
        <button className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-lg flex items-center justify-center gap-3 shadow-sm mt-4 hover:bg-gray-50">
          <img src={GOOGLE_LOGO} alt="Google Logo" className="w-8 h-8" />
          Masuk dengan Google
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-semibold">ATAU</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

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

        {/* KEEP ME LOGGED IN */}
        <label className="flex items-start gap-3 text-sm text-gray-600 mt-3 leading-tight">
          <input type="checkbox" className="mt-1 w-4 h-4" />
          <div>
            Biarkan saya tetap masuk <br />
            <span className="text-xs text-gray-400">
              Jangan centang kotak ini jika komputer atau perangkat kamu
              digunakan oleh orang lain
            </span>
          </div>
        </label>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/beranda-siswa")}
          className="w-full py-3 rounded-xl bg-blue-200 text-blue-800 font-bold text-xl mt-6 hover:bg-blue-300"
        >
          masuk
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
