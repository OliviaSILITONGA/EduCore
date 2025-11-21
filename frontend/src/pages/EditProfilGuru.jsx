import React from "react";

export default function EditProfilGuru() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="bg-sky-500 text-white p-4 font-bold text-2xl flex items-center">
        <span className="mr-2 text-xl">&lt; kembali</span> Educore
      </div>

      <div className="p-4 space-y-6">
        {/* DETAIL PROFIL */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4">Detail profil</h2>

          <label className="block font-semibold">Nama Lengkap</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Jenis Kelamin</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Nomor Telepon</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <div className="flex items-center gap-3 mt-4">
            <img
              src="/guru-avatar.png"
              className="w-20 h-20 rounded-full border"
            />
            <button className="text-blue-700 font-semibold">
              Ganti foto profil
            </button>
          </div>
        </div>

        {/* DETAIL ALAMAT */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4">Detail alamat</h2>

          <label className="block font-semibold">Provinsi</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Kota</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Alamat</label>
          <input className="w-full bg-blue-100 p-2 rounded" />
        </div>

        {/* DETAIL SEKOLAH */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4">Detail sekolah</h2>

          <label className="block font-semibold">Provinsi</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Kota</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Nama Sekolah</label>
          <input className="w-full bg-blue-100 p-2 rounded mb-4" />

          <label className="block font-semibold">Tingkat</label>
          <input className="w-full bg-blue-100 p-2 rounded" />
        </div>

        {/* BUTTON */}
        <button className="w-full bg-blue-200 text-blue-900 font-bold py-3 rounded-xl mt-4">
          Simpan
        </button>
      </div>
    </div>
  );
}
