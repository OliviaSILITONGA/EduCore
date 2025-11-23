import React from "react";

export default function ProfilGuru() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-sky-500 text-white p-4 font-bold text-2xl flex items-center">
        <span className="mr-2 text-xl">Kembali</span> Educore
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow flex gap-4 items-center">
          <img src="/guru-avatar.png" className="w-20 h-20 rounded-full" />

          <div>
            <h2 className="text-xl font-bold">Guru 1</h2>
            <p>emailguru1@gmail.com</p>
            <p>080987654321</p>
            <button className="text-blue-700 font-semibold">Edit Profil</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl">Detail alamat</h2>

          <p className="font-semibold mt-4">Provinsi</p>
          <p>Tokyo</p>

          <p className="font-semibold mt-2">Kota</p>
          <p>Tokyo</p>

          <p className="font-semibold mt-2">Alamat</p>
          <p>Jl.Tokyo No.13</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl">Detail sekolah</h2>

          <p className="font-semibold mt-4">Provinsi</p>
          <p>Tokyo</p>

          <p className="font-semibold mt-2">Kota</p>
          <p>Tokyo</p>

          <p className="font-semibold mt-2">Nama Sekolah</p>
          <p>SMA Tokyo</p>

          <p className="font-semibold mt-2">Tingkat</p>
          <p>Guru SMA</p>
        </div>
      </div>
    </div>
  );
}
