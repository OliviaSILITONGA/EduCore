import { useNavigate } from "react-router-dom";
import Navbar_siswa from "../components/Navbar_siswa";
import useStudentProfile from "../hooks/useStudentProfile";
import { useState } from "react";
import siswaImg from "../assets/images/utama_siswa.jpg"; // ✅ PERBAIKAN PENTING

export default function EditProfilSiswa() {
  const navigate = useNavigate();
  const { profile, saveProfile } = useStudentProfile();

  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, foto: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveProfile(form);
    navigate("/profil-siswa");
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9]">
      <Navbar_siswa />
      <div className="p-4 space-y-6">
        {/* DETAIL PROFIL */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail profil</h2>

          <p className="font-semibold">Nama Lengkap</p>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Jenis Kelamin</p>
          <input
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Nomor Telepon</p>
          <input
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <div className="flex items-center gap-4">
            <img
              src={form.foto || siswaImg} // ✅ SUDAH AMAN
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
            />

            <label className="text-blue-600 font-semibold underline cursor-pointer">
              Ganti foto profil
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
          </div>
        </div>

        {/* DETAIL ALAMAT */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail alamat</h2>

          <p className="font-semibold">Provinsi</p>
          <input
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Kota</p>
          <input
            name="kota"
            value={form.kota}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Alamat</p>
          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
          />
        </div>

        {/* DETAIL SEKOLAH */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">Detail sekolah</h2>

          <p className="font-semibold">Provinsi</p>
          <input
            name="sekolahProvinsi"
            value={form.sekolahProvinsi}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Kota</p>
          <input
            name="sekolahKota"
            value={form.sekolahKota}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Nama Sekolah</p>
          <input
            name="namaSekolah"
            value={form.namaSekolah}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Tingkat</p>
          <input
            name="tingkat"
            value={form.tingkat}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
          />
        </div>

        {/* ORANG TUA */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="font-bold text-xl mb-4">
            Detail kontak orangtua/wali
          </h2>

          <p className="font-semibold">Nama Orang Tua/Wali</p>
          <input
            name="ortuNama"
            value={form.ortuNama}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Nomor Telepon</p>
          <input
            name="ortuTelepon"
            value={form.ortuTelepon}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
          />
        </div>

        <div className="max-w-xl mx-auto pb-10">
          <button
            onClick={handleSave}
            className="w-full bg-blue-300 py-3 rounded-xl text-blue-900 font-bold text-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
