import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import utamaGuru from "../assets/images/utama_guru.jpg";
import Logo from "../assets/images/Educore_Logo_White.png";

export default function Navbar_guru() {
  const navigate = useNavigate();
  return (
    <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 h-screen fixed">
      <img src={Logo} alt="EduCore Logo" className="h-25 left-10" />
      <button
        onClick={() => navigate("/profil-guru")}
        className="focus:outline-none hover:opacity-80 transition"
      >
        <img
          src={utamaGuru}
          alt="Profil Guru"
          className="w-32 h-32 rounded-full mb-3 object-cover"
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
  );
}
