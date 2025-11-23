import { useNavigate } from "react-router-dom";
import gambarGuru from "../assets/images/gambar_guru.jpg";
import gambarSiswa from "../assets/images/gambar_siswa.jpg";

export default function SelectAccount() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#27B4E3] to-[#0029A2] text-white p-8 flex flex-col">
      {/* Header */}
      <h1 className="text-4xl font-extrabold">Educore</h1>
      <p className="-mt-1 text-xl mb-8">Belajar cerdas, bukan lebih keras</p>

      {/* Card */}
      <div className="max-w-xl mx-auto w-full text-center mt-4">
        <h2 className="text-3xl font-extrabold mb-6">Pilih Tipe Akun</h2>

        {/* Guru */}
        <button
          onClick={() => navigate("/login-guru")}
          className="w-full flex items-center gap-4 bg-[#27B4E3] hover:bg-[#BAD6EB] transition text-white text-xl font-semibold px-6 py-4 rounded-2xl mb-6 shadow-lg"
        >
          <img
            src={gambarGuru}
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
            src={gambarSiswa}
            alt="Siswa"
            className="w-16 h-16 rounded-full object-cover"
          />
          Untuk Siswa
        </button>
      </div>
    </div>
  );
}
