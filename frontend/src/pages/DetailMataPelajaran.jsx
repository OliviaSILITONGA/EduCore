import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";
import useTeacherProfile from "../hooks/useTeacherProfile";

export default function DetailMataPelajaran() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { profile } = useTeacherProfile();

  const kelasList = [
    { id: 1, name: "KELAS 1", pelajaran: "", status: "Tambah" },
    { id: 2, name: "KELAS 2", pelajaran: "", status: "Tambah" },
    { id: 3, name: "KELAS 3", pelajaran: "", status: "Tambah" },
    { id: 4, name: "KELAS 4", pelajaran: "", status: "Tambah" },
    { id: 5, name: "KELAS 5", pelajaran: "", status: "Tambah" },
    { id: 6, name: "KELAS 6", pelajaran: "", status: "Tambah" },
    { id: 7, name: "KELAS 7", pelajaran: "", status: "Tambah" },
    { id: 8, name: "KELAS 8", pelajaran: "", status: "Tambah" },
    { id: 9, name: "KELAS 9", pelajaran: "", status: "Tambah" },
    { id: 10, name: "KELAS 10", pelajaran: "", status: "Tambah" },
    { id: 11, name: "KELAS 11", pelajaran: "", status: "Tambah" },
    { id: 12, name: "KELAS 12", pelajaran: "", status: "Tambah" },
  ];

  const handleKelasClick = (kelasId, e) => {
    e.stopPropagation();
    navigate(`/manajemen-kelas/${subject}`);
  };

  return (
    <div className="flex w-screen h-screen bg-[#f4f4f4] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8">
        <img src={Logo} alt="EduCore Logo" className="h-25 mb-6" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Guru!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-guru")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Data Siswa
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center gap-5 mb-10">
          <Button
            variant="link"
            onClick={() => navigate("/beranda-guru")}
            className="text-blue-700 font-semibold text-lg"
          >
            Kembali
          </Button>

          <h1 className="text-4xl font-bold">
            {subject ? subject.toUpperCase() : "MATA PELAJARAN"}
          </h1>
        </div>

        {/* GRID KELAS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {kelasList.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-5 h-40 flex flex-col justify-between cursor-pointer"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{kelas.name}</h3>

                {kelas.pelajaran && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold text-gray-600">
                    {kelas.pelajaran}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-3">
                {kelas.pelajaran && kelas.pelajaran !== "UJIAN" && (
                  <span className="text-xs text-gray-600 italic">
                    Tambahkan
                  </span>
                )}

                <Button
                  className="bg-[#003cbd] text-white px-4 py-2 rounded-md text-sm font-semibold"
                  onClick={(e) => handleKelasClick(kelas.id, e)}
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
