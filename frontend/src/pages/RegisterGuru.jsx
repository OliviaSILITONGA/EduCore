import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function RegisterGuru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi field wajib diisi
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Tolong diisi semua field yang wajib!");
      return;
    }

    // Validasi kata sandi
    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi dan ulang kata sandi tidak sama!");
      return;
    }

    // Validasi syarat & ketentuan
    if (!formData.agreeToTerms) {
      alert("Anda harus menyetujui syarat dan ketentuan!");
      return;
    }

    // Kalau semua valid → pindah ke dashboard guru
    navigate("/beranda-guru");
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col">
      <Navbar />

      {/* CARD */}
      <div className="flex justify-center py-10 mt-[120px]">
        <div className="bg-white w-[750px] rounded-md shadow p-10">
          <h2 className="text-center text-lg font-semibold mb-6">
            Silahkan buat akun Educore anda!
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Kata Sandi"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Ulang Kata
                Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan Ulang Kata Sandi"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-700">
                Saya setuju dengan syarat dan ketentuan serta kebijakan privasi
                Educore.
              </p>
            </div>

            {/* BUTTON BUAT AKUN */}
            <button
              type="submit"
              className="w-full bg-[#BBD7EC] text-[#3C6A91] py-3 rounded-md font-bold text-lg hover:bg-[#A8C8E5] transition-colors"
            >
              Buat Akun
            </button>
          </form>

          <div className="my-10 h-[1px] bg-gray-300"></div>

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
