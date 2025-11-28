import { useNavigate } from "react-router-dom";
import Makima from "../assets/images/Ellipse_14.png";
import Aki from "../assets/images/Ellipse_15.png";
import Logo from "../components/Logo";

export default function SelectAccount() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#27B4E3] to-[#0029A2] text-white p-8 flex flex-col">
      <Logo />

      {/* Card */}
      <div className="max-w-xl mx-auto w-full text-center mt-4">
        <h2 className="text-3xl font-extrabold mb-6">Pilih Tipe Akun</h2>

        {/* Guru */}
        <button
          onClick={() => navigate("/login-guru")}
          className="w-full flex items-center gap-4 bg-[#27B4E3] hover:bg-[#BAD6EB] transition text-white text-xl font-semibold px-6 py-4 rounded-2xl mb-6 shadow-lg"
        >
          <img
            src={Makima}
            alt="Guru"
            className="w-16 h-16 rounded-full object-cover"
          />
          Untuk Guru
        </button>

        {/* Siswa */}
        <button
          onClick={() => navigate("/login-siswa")}
          className="w-full flex items-center gap-4 bg-[#27B4E3] hover:bg-[#BAD6EB] transition text-white text-xl font-semibold px-6 py-4 rounded-2xl shadow-lg"
        >
          <img
            src={Aki}
            alt="Siswa"
            className="w-16 h-16 rounded-full object-cover"
          />
          Untuk Siswa
        </button>
      </div>
    </div>
  );
}
