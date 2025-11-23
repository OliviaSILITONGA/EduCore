// src/pages/EditProfilSiswa.jsx

import siswaImg from "../assets/images/utama_siswa.jpg";
export default function EditProfilSiswa() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#D9D9D9]">
=======
    <div className="min-h-screen bg-gray-200">
      <div className="bg-sky-500 text-white p-4 font-bold text-2xl flex items-center">
        <span className="mr-2 text-xl">Kembali</span> Educore
      </div>

>>>>>>> c89e39c5b657a36f4afecd2c3f80b764e982dd96
      <div className="p-4 space-y-6">
        {/* Detail Profil */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail profil</h2>

          <p className="font-semibold">Nama Lengkap</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Jenis Kelamin</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Nomor Telepon</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <div className="flex items-center gap-4">
            <img
              src={siswaImg}
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
            />
            <button className="text-blue-600 font-semibold underline">
              Ganti foto profil
            </button>
          </div>
        </div>

        {/* Detail Alamat */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail alamat</h2>

          <p className="font-semibold">Provinsi</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Kota</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Alamat</p>
          <input className="w-full bg-blue-100 p-2 rounded" />
        </div>

        {/* Detail Sekolah */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail sekolah</h2>

          <p className="font-semibold">Provinsi</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Kota</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Nama Sekolah</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Tingkat</p>
          <input className="w-full bg-blue-100 p-2 rounded" />
        </div>

        {/* Detail Kontak Ortu */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">
            Detail kontak orangtua/wali
          </h2>

          <p className="font-semibold">Nama Orang Tua/Wali</p>
          <input className="w-full bg-blue-100 p-2 rounded mb-3" />

          <p className="font-semibold">Nomor Telepon</p>
          <input className="w-full bg-blue-100 p-2 rounded" />
        </div>

        <div className="max-w-xl mx-auto pb-10">
          <button className="w-full bg-blue-300 py-3 rounded-xl text-blue-900 font-bold text-lg">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
