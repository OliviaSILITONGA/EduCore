import Makima from "../assets/images/Ellipse_14.png";
import { Link } from "react-router-dom";
import Navbar_guru from "../components/Navbar_guru";

export default function ProfilGuru() {
  return (
    <div className="min-h-screen bg-[#D9D9D9]">
      <Navbar_guru />

      <div className="p-4 space-y-6">
        {/* Data Profil */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src={Makima}
              className="w-20 h-20 rounded-full object-cover border-gray-300"
            />

            <div>
              <p className="font-bold text-lg">Guru 1</p>
              <p className="text-gray-700">emailguru@gmail.com</p>
              <p className="text-gray-700">080987654321</p>

              <Link
                to="/edit-profil-guru"
                className="text-blue-600 font-semibold underline text-sm"
              >
                Edit Profil
              </Link>
            </div>
          </div>
        </div>

        {/* Detail Alamat */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-3">Detail alamat</h2>
          <p className="font-semibold">Provinsi</p>
          <p className="mb-2"></p>

          <p className="font-semibold">Kota</p>
          <p className="mb-2"></p>

          <p className="font-semibold">Alamat</p>
          <p></p>
        </div>

        {/* Detail Sekolah */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-3">Detail sekolah</h2>

          <p className="font-semibold">Provinsi</p>
          <p className="mb-2"></p>

          <p className="font-semibold">Kota</p>
          <p className="mb-2"></p>

          <p className="font-semibold">Nama Sekolah</p>
          <p className="mb-2"></p>

          <p className="font-semibold">Tingkat</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
