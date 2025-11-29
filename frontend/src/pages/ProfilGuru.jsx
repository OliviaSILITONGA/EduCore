import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import Button from "../components/Button";
import useTeacherProfile from "../hooks/useTeacherProfile";
import Makima from "../assets/images/Ellipse_14.png";

export default function ProfilGuru() {
  const navigate = useNavigate();
  const { profile } = useTeacherProfile();

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 min-h-screen">
        <img src={Logo} className="h-25 left-10" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
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
      </aside>

      {/* KONTEN */}
      <main className="flex-1 p-6 flex flex-col items-center space-y-6">
        {/* DATA PROFIL */}
        <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow">
          <div className="flex items-center gap-4">
            <img
              src={profile.foto || Makima}
              className="w-20 h-20 rounded-full object-cover border-gray-300"
            />
            <div>
              <p className="font-bold text-lg">
                {profile.nama || "Nama belum diisi"}
              </p>
              <p>{profile.gender}</p>
              <p>{profile.telepon}</p>
              <Link
                to="/edit-profil-guru"
                className="text-blue-600 underline text-sm font-semibold"
              >
                Edit Profil
              </Link>
            </div>
          </div>
        </div>

        {/* DETAIL ALAMAT */}
        <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow">
          <h2 className="font-bold text-xl mb-3">Detail alamat</h2>
          <p className="font-semibold">Provinsi</p>
          <p>{profile.provinsi}</p>
          <p className="font-semibold">Kota</p>
          <p>{profile.kota}</p>
          <p className="font-semibold">Alamat</p>
          <p>{profile.alamat}</p>
        </div>

        {/* DETAIL SEKOLAH */}
        <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow">
          <h2 className="font-bold text-xl mb-3">Detail sekolah</h2>
          <p className="font-semibold">Provinsi</p>
          <p>{profile.sekolahProvinsi}</p>
          <p className="font-semibold">Kota</p>
          <p>{profile.sekolahKota}</p>
          <p className="font-semibold">Nama Sekolah</p>
          <p>{profile.namaSekolah}</p>
          <p className="font-semibold">Tingkat</p>
          <p>{profile.tingkat}</p>
        </div>
      </main>
    </div>
  );
}
