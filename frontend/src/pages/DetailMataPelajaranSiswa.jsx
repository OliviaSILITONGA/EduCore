import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import Aki from "../assets/images/Ellipse_15.png";
import Button from "../components/Button";
import useStudentProfile from "../hooks/useStudentProfile";
import { useState } from "react";

export default function DetailMataPelajaranSiswa() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { profile } = useStudentProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const kelasList = [
    { id: 1, name: "KELAS 1" },
    { id: 2, name: "KELAS 2" },
    { id: 3, name: "KELAS 3" },
    { id: 4, name: "KELAS 4" },
    { id: 5, name: "KELAS 5" },
    { id: 6, name: "KELAS 6" },
    { id: 7, name: "KELAS 7" },
    { id: 8, name: "KELAS 8" },
    { id: 9, name: "KELAS 9" },
    { id: 10, name: "KELAS 10" },
    { id: 11, name: "KELAS 11" },
    { id: 12, name: "KELAS 12" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`bg-[#27B4E3] text-white flex flex-col items-center pt-6
          fixed md:relative top-0 left-0 h-full w-[250px] z-50
          transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <img src={Logo} alt="EduCore Logo" className="h-20 md:h-28 mb-6" />

        <button
          onClick={() => navigate("/profil-siswa")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Aki}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          Halo, {profile.nama || "My friends!!"}!
        </h2>

        <div className="flex md:flex-col gap-3 mb-4 w-full px-4">
          <Button
            variant="menu"
            onClick={() => navigate("/beranda-siswa")}
            className="w-full"
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* TOGGLE BUTTON MOBILE */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden absolute top-4 left-4 bg-[#27B4E3] text-white px-3 py-2 rounded-md shadow-md z-50"
      >
        ☰
      </button>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/beranda-siswa")}
            variant="link"
            className="text-blue-700 font-semibold"
          >
            Kembali
          </Button>

          <h1 className="text-2xl sm:text-3xl font-bold">
            {subject?.toUpperCase()}
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {kelasList.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{kelas.name}</h3>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() =>
                    navigate(`/materi-siswa/${subject}/${kelas.id}`)
                  }
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg"
                >
                  {kelas.ujian ? "Tes" : "Pelajari"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
