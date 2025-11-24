import React, { useState } from "react";
import utamaGuru from "../assets/images/utama_guru.jpg";
import Logo from "../assets/images/Educore_Logo_White.png";

export default function EditProfilGuru() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    provinsi: "",
    kota: "",
    alamat: "",
    sekolah: "",
    tingkat: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan data ke backend di sini
    alert("Profil guru berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar mirip Navbar_guru */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 h-screen fixed">
        <img src={Logo} alt="EduCore Logo" className="h-25 left-10" />
        <button className="focus:outline-none hover:opacity-80 transition">
          <img
            src={utamaGuru}
            alt="Profil Guru"
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Halo, Guru!</h2>
        <button className="w-[80%] bg-blue-300 text-blue-900 font-bold py-2 rounded-xl mb-2">
          Dashboard
        </button>
        <button className="w-[80%] bg-blue-300 text-blue-900 font-bold py-2 rounded-xl mb-2">
          Data Siswa
        </button>
        <button className="w-[80%] bg-blue-300 text-blue-900 font-bold py-2 rounded-xl">
          Materi
        </button>
      </div>
      {/* Form Profil Guru */}
      <div className="flex-1 p-8 ml-[250px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto space-y-4"
        >
          <h2 className="font-bold text-xl mb-4">Detail Profil Guru</h2>
          <label className="block font-semibold">Nama Lengkap</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Nomor Telepon</label>
          <input
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Provinsi</label>
          <input
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Kota</label>
          <input
            name="kota"
            value={form.kota}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Alamat</label>
          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Nama Sekolah</label>
          <input
            name="sekolah"
            value={form.sekolah}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <label className="block font-semibold">Tingkat</label>
          <input
            name="tingkat"
            value={form.tingkat}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-300 py-3 rounded-xl text-blue-900 font-bold text-lg mt-4"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
