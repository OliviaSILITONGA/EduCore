import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerGuru } from "../services/api";

export default function RegisterGuru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nama: "",
    alamat: "",
    provinsi: "",
    kota: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Kata sandi tidak cocok!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Kata sandi minimal 8 karakter!");
      return;
    }

    if (!agreed) {
      setError("Anda harus menyetujui syarat dan ketentuan!");
      return;
    }

    setLoading(true);
    try {
      await registerGuru({
        email: formData.email,
        password: formData.password,
        nama: formData.nama,
        alamat: formData.alamat,
        provinsi: formData.provinsi,
        kota: formData.kota,
      });
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login-guru");
    } catch (err) {
      setError(err.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col">
      <Navbar />
      {/* CARD */}
      <div className="flex justify-center py-10">
        <div className="bg-white w-[750px] rounded-md shadow p-10">
          <h2 className="text-center text-lg font-semibold mb-6">
            Yuk buat akun Educore kamu!
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan Nama Lengkap"
                required
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Alamat Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan Alamat Email"
                required
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Kata Sandi (min 8 karakter)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Kata Sandi"
                required
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Ulang Kata Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan Ulang Kata Sandi"
                required
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Provinsi</label>
              <input
                type="text"
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                placeholder="Masukkan Provinsi"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Kota</label>
              <input
                type="text"
                name="kota"
                value={formData.kota}
                onChange={handleChange}
                placeholder="Masukkan Kota"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Masukkan Alamat Lengkap"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
                rows={3}
              />
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                className="mt-1"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <p className="text-sm text-gray-700">
                Saya setuju dengan syarat dan ketentuan serta kebijakan privasi
                Educore.
              </p>
            </div>

            {/* BUTTON BUAT AKUN */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#BBD7EC] text-[#3C6A91] py-3 rounded-md font-bold text-lg hover:bg-[#a5c8e0] disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Buat Akun"}
            </button>
          </form>

          <div className="my-10 h-px bg-gray-300"></div>

          <p className="text-center text-sm">
            Langsung{" "}
            <Link to="/login-guru" className="text-blue-600 font-semibold">
              Masuk
            </Link>{" "}
            jika sudah punya akun.
          </p>
        </div>
      </div>
    </div>
  );
}
