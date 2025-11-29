import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";
import useTeacherProfile from "../hooks/useTeacherProfile";

export default function ManajemenKelas() {
  const navigate = useNavigate();
  const { matpel } = useParams();
  const { profile } = useTeacherProfile();

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8">
        <img src={Logo} alt="EduCore Logo" className="h-24 mb-6" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-32 h-32 rounded-full mb-3 object-cover border-4 border-white shadow-lg"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Guru!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-guru")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Data Siswa
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="text-blue-600 text-base"
          >
            Kembali
          </Button>
          <h1 className="text-3xl font-bold ml-3">Manajemen Kelas {matpel}</h1>
        </div>

        {/* CARD */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">
            Selamat datang di Manajemen Kelas!
          </h2>

          <p className="text-gray-700">
            Mata Pelajaran: <strong>{matpel}</strong>
          </p>

          <p className="text-gray-600 mt-1">
            Di sini Anda bisa mengelola materi dan daftar murid.
          </p>

          <div className="flex gap-4 mt-6">
            <Button className="w-fit px-6">Lihat Materi</Button>
            <Button className="w-fit px-6">Lihat Daftar Murid</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
