import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import utamaGuru from "../assets/images/utama_guru.jpg"; // ✅ pastikan ini ada
import Button from "../components/Button";
import useStudentProfile from "../hooks/useStudentProfile";

const TOTAL_MATERI = 3;

function getCompletedCount(subject, kelasId) {
  try {
    const raw = localStorage.getItem(
      `completed::${subject || "unknown"}::kelas-${kelasId}`
    );
    if (!raw) return 0;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.length : 0;
  } catch (e) {
    return 0;
  }
}

export default function DetailMataPelajaranSiswa() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { profile } = useStudentProfile();

  const kelasList = [
    { id: 1, name: "KELAS 1", pelajaran: "", status: "Pelajari" },
    { id: 2, name: "KELAS 2", pelajaran: "", status: "Pelajari" },
    { id: 3, name: "KELAS 3", pelajaran: "", status: "Pelajari" },
    { id: 4, name: "KELAS 4", pelajaran: "", status: "Pelajari" },
    { id: 5, name: "KELAS 5", pelajaran: "", status: "Pelajari" },
    { id: 6, name: "KELAS 6", pelajaran: "", status: "Pelajari" },
    { id: 7, name: "KELAS 7", pelajaran: "", status: "Pelajari" },
    { id: 8, name: "KELAS 8", pelajaran: "", status: "Pelajari" },
    { id: 9, name: "KELAS 9", pelajaran: "", status: "Pelajari" },
    { id: 10, name: "KELAS 10", pelajaran: "", status: "Pelajari" },
    { id: 11, name: "KELAS 11", pelajaran: "", status: "Pelajari" },
    { id: 12, name: "KELAS 12", pelajaran: "", status: "Pelajari" },
    { id: 13, name: "UJIAN", pelajaran: "UJIAN", status: "Tes" },
  ];

  const handlePelajariClick = (kelasId, e) => {
    e.stopPropagation();
    navigate(`/materi-siswa/${subject}`);
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 min-h-screen">
        <img src={Logo} className="h-20 mb-6" alt="Logo Educore" />

        <button
          onClick={() => navigate("/profil-siswa")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || utamaGuru}
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
        <div className="flex items-center gap-5 mb-10">
          <Button
            variant="link"
            onClick={() => navigate("/beranda-siswa")}
            className="text-blue-700 font-semibold text-lg"
          >
            Kembali
          </Button>

          <h1 className="text-4xl font-bold text-black">
            {subject ? subject.toUpperCase() : "MATA PELAJARAN"}
          </h1>
        </div>

        {/* GRID KELAS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {kelasList.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-white rounded-xl shadow p-5 border-2 border-gray-200 flex flex-col justify-between h-40"
            >
              {/* HEADER KELAS */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{kelas.name}</h3>

                {kelas.pelajaran && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold text-gray-600">
                    {kelas.pelajaran}
                  </span>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                {/* Progress Section */}
                <div className="flex flex-col">
                  {kelas.pelajaran && kelas.pelajaran !== "UJIAN" && (
                    <span className="text-xs italic text-gray-600">
                      Mulai belajar
                    </span>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-36 h-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-cyan-300 rounded"
                        style={{
                          width: `${Math.round(
                            (getCompletedCount(subject, kelas.id) /
                              TOTAL_MATERI) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <span className="text-xs font-semibold text-gray-600">
                      {Math.round(
                        (getCompletedCount(subject, kelas.id) / TOTAL_MATERI) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>

                <Button
                  className={`px-4 py-2 text-sm font-semibold rounded ${
                    kelas.pelajaran === "UJIAN"
                      ? "bg-red-500 text-white"
                      : "bg-cyan-400 text-white shadow"
                  }`}
                  onClick={(e) => handlePelajariClick(kelas.id, e)}
                >
                  {kelas.status}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
