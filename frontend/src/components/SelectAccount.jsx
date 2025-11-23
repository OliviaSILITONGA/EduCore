import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import gambarGuru from "../assets/images/gambar_guru.jpg";
import gambarSiswa from "../assets/images/gambar_siswa.jpg";

export default function SelectAccount() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-sky-300 to-blue-700 text-white p-8 flex flex-col">
      {/* Header */}
      <h1 className="text-4xl font-extrabold">Educore</h1>
      <p className="-mt-1 mb-8">Belajar cerdas, bukan lebih keras</p>

      {/* Back */}
      <button className="text-white mb-6 text-lg" onClick={() => navigate(-1)}>
        &lt; kembali
      </button>

      {/* Card */}
      <div className="max-w-xl mx-auto w-full text-center mt-4">
        <h2 className="text-3xl font-extrabold mb-6">Pilih Tipe Akun</h2>

        {/* Guru */}
        <Button
          onClick={() => navigate("/login-guru")}
          className="w-full flex items-center gap-4 bg-sky-400 hover:bg-sky-500 transition text-white text-xl font-semibold px-6 py-4 rounded-2xl mb-6 shadow-lg"
        >
          <img
            src={gambarGuru}
            alt="Guru"
            className="w-16 h-16 rounded-full object-cover"
          />
          Untuk Guru
        </Button>

        {/* Siswa */}
        <Button
          onClick={() => navigate("/login-siswa")}
          className="w-full flex items-center gap-4 bg-blue-200 hover:bg-blue-300 transition text-white text-xl font-semibold px-6 py-4 rounded-2xl shadow-lg"
        >
          <img
            src={gambarSiswa}
            alt="Siswa"
            className="w-16 h-16 rounded-full object-cover"
          />
          Untuk Siswa
        </Button>
      </div>
    </div>
  );
}
