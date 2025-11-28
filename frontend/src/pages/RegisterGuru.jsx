import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RegisterGuru() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col">
      <Navbar />
      {/* CARD */}
      <div className="flex justify-center py-10">
        <div className="bg-white w-[750px] rounded-md shadow p-10">
          <h2 className="text-center text-lg font-semibold mb-6">
            Yuk buat akun Educore kamu!
          </h2>

          {/* FORM */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold">
                <span className="text-red-500">*Wajib diisi</span> Alamat Email
              </label>
              <input
                type="email"
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
                placeholder="Masukkan Ulang Kata Sandi"
                className="w-full mt-1 border rounded-md p-3 bg-[#D8E6F2]"
              />
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-gray-700">
                Saya setuju dengan syarat dan ketentuan serta kebijakan privasi
                Educore.
              </p>
            </div>

            {/* BUTTON BUAT AKUN */}
            <button className="w-full bg-[#BBD7EC] text-[#3C6A91] py-3 rounded-md font-bold text-lg">
              Buat Akun
            </button>
          </div>

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
