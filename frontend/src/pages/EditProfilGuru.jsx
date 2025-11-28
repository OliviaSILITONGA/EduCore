import { useNavigate } from "react-router-dom";
import Navbar_guru from "../components/Navbar_guru";
import useTeacherProfile from "../hooks/useTeacherProfile";
import { useState } from "react";
import Makima from "../assets/images/Ellipse_14.png"; // ✅ PERBAIKAN PENTING

export default function EditProfilGuru() {
  const navigate = useNavigate();
  const { profile, saveProfile } = useTeacherProfile();

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
    navigate("/profil-guru");
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9]">
      <Navbar_guru />
      <div className="p-4 space-y-6 mt-6">
        {/* DETAIL PROFIL */}
        <div className="bg-white p-6 rounded-xl shadow max-w-xl  mt-20 mx-auto">
          <h2 className="font-bold text-xl mb-4">
            Ayo isi data tentang diri anda!
          </h2>

          <p className="font-semibold">Nama Lengkap</p>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <p className="font-semibold">Jenis Kelamin</p>
          <div className="relative mb-3">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full bg-blue-100 p-2 rounded cursor-pointer appearance-none"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>

            <svg
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>

          <p className="font-semibold">Nomor Telepon</p>
          <input
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded mb-3"
          />

          <div className="flex items-center gap-4">
            <img
              src={form.foto || Makima}
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

          <p className="font-semibold">Kota/Kabupaten</p>
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

          <p className="font-semibold">Kota/Kabupaten</p>
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
          <div className="relative mb-3">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full bg-blue-100 p-2 rounded cursor-pointer appearance-none"
            >
              <option value="">Pilih jenis tingkat Sekolah</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>

            <svg
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
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
