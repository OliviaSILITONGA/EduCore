// src/pages/ProfilSiswa.jsx
import siswaImg from "../assets/images/utama_siswa.jpg";
import { Link } from "react-router-dom";

export default function ProfilSiswa() {
  return (
    <div className="min-h-screen bg-[#D9D9D9]">
      <div className="p-4 space-y-6">
        {/* Data Profil */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src={siswaImg}
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
            />

            <div>
              <p className="font-bold text-lg">Murid 1</p>
              <p className="text-gray-700">emailmurid1@gmail.com</p>
              <p className="text-gray-700">081234567890</p>

              <Link
                to="/edit-profil"
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
          <p className="mb-2">Tokyo</p>

          <p className="font-semibold">Kota</p>
          <p className="mb-2">Tokyo</p>

          <p className="font-semibold">Alamat</p>
          <p>Jl. Tokyo No.31</p>
        </div>

        {/* Detail Sekolah */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-3">Detail sekolah</h2>

          <p className="font-semibold">Provinsi</p>
          <p className="mb-2">Tokyo</p>

          <p className="font-semibold">Kota</p>
          <p className="mb-2">Tokyo</p>

          <p className="font-semibold">Nama Sekolah</p>
          <p className="mb-2">SMA Tokyo</p>

          <p className="font-semibold">Tingkat</p>
          <p>SMA</p>
        </div>

        {/* Kontak Ortu */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto mb-8">
          <h2 className="font-bold text-xl mb-3">Kontak orangtua/wali</h2>

          <p className="font-semibold">Nama Orangtua/Wali</p>
          <p className="mb-2">Ortu 1</p>

          <p className="font-semibold">Nomor Telepon</p>
          <p>08</p>
        </div>
      </div>
    </div>
  );
}
