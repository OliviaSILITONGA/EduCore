import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/images/Educore_Logo_White.png";
import utamaGuru from "../assets/images/utama_guru.jpg";
import useStudentProfile from "../hooks/useStudentProfile";

export default function MateriSayaSiswa() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const { profile } = useStudentProfile();

  const [materiList] = useState([
    {
      id: 1,
      judul: "Aljabar Dasar",
      deskripsi: "Materi pengenalan aljabar untuk pemula",
      durasi: "30 menit",
      level: "Pemula",
      tanggal: "2024-01-15",
    },
    {
      id: 2,
      judul: "Geometri Bangun Datar",
      deskripsi: "Memahami bentuk-bentuk geometri dasar",
      durasi: "45 menit",
      level: "Pemula",
      tanggal: "2024-01-20",
    },
    {
      id: 3,
      judul: "Trigonometri",
      deskripsi: "Konsep sinus, cosinus, dan tangent",
      durasi: "60 menit",
      level: "Menengah",
      tanggal: "2024-01-25",
    },
  ]);

  const handleMulaiBelajar = (materiId) => {
    navigate(`/belajar/${subject}/${materiId}`);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 min-h-screen">
        <img src={Logo} className="h-20 mb-6" alt="Logo Educore" />

        <button
          onClick={() => navigate("/profil-siswa")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile?.foto || utamaGuru}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Temanku!!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-siswa")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="text-blue-700 text-lg font-semibold hover:underline"
          >
            Kembali
          </Button>

          <h1 className="text-3xl font-bold ml-4">
            Materi {subject ? subject.toUpperCase() : ""}
          </h1>
        </div>

        {/* INFO CARD */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold">Selamat Belajar! 🎓</h2>
          <p className="text-base opacity-90 mt-1">
            Di sini kamu bisa mempelajari semua materi{" "}
            <strong>{subject}</strong>. Pilih materi yang ingin dipelajari dan
            mulai perjalanan belajarmu!
          </p>
        </div>

        {/* LIST MATERI */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-5">Materi Pembelajaran</h2>

          <div className="flex flex-col gap-4">
            {materiList.map((materi) => (
              <div
                key={materi.id}
                className="flex justify-between p-5 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-xl font-bold">{materi.judul}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {materi.deskripsi}
                  </p>

                  <div className="text-xs text-gray-500 mt-2">
                    📅 {materi.tanggal}
                  </div>
                </div>

                <button
                  onClick={() => handleMulaiBelajar(materi.id)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 text-sm md:text-base rounded-md shadow-sm"
                >
                  Mulai
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
