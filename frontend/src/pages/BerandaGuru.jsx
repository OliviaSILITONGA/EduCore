import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useTeacherProfile from "../hooks/useTeacherProfile";

// IMPORT GAMBAR
import mtk from "../assets/images/mtk.jpg";
import indo from "../assets/images/B.indo.jpg";
import inggris from "../assets/images/B.inggris.jpg";
import biologi from "../assets/images/biologi.jpg";
import kimia from "../assets/images/kimia.jpg";
import fisika from "../assets/images/fisika.jpg";
import geografi from "../assets/images/geografi.jpg";
import ekonomi from "../assets/images/ekonomi.jpg";
import sejarah from "../assets/images/sejarah.jpg";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";

export default function BerandaGuru() {
  const navigate = useNavigate();
  const { profile } = useTeacherProfile();
  const [openMenu, setOpenMenu] = useState(false);

  const subjects = [
    { title: "Matematika", img: mtk },
    { title: "Bahasa Indonesia", img: indo },
    { title: "Bahasa Inggris", img: inggris },
    { title: "Biologi", img: biologi },
    { title: "Kimia", img: kimia },
    { title: "Fisika", img: fisika },
    { title: "Geografi", img: geografi },
    { title: "Ekonomi", img: ekonomi },
    { title: "Sejarah", img: sejarah },
  ];

  const handleCardClick = (subjectTitle) => {
    navigate(`/mata-pelajaran/${subjectTitle.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      {/* NAVBAR MOBILE */}
      <div className="md:hidden flex items-center justify-between bg-[#27B4E3] text-white px-4 py-3">
        <img src={Logo} alt="Logo" className="h-10" />
        <button onClick={() => setOpenMenu(!openMenu)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* SIDEBAR DESKTOP & MOBILE DROPDOWN */}
      <div
        className={`bg-[#27B4E3] text-white flex-col items-center pt-6
        md:flex md:w-[250px] transition-all duration-300 
        ${openMenu ? "flex w-full" : "hidden md:flex"}`}
      >
        <img src={Logo} alt="EduCore Logo" className="h-20 md:h-28 mb-6" />

        {/* FOTO PROFIL */}
        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-3 object-cover"
          />
        </button>

        {/* UBAHAN DI SINI */}
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          Halo, {(profile?.nama || "Tuan").split(" ")[0]}.
        </h2>

        <div className="flex md:flex-col gap-3 mb-4 w-full px-4">
          <Button
            variant="menu"
            onClick={() => navigate("/beranda-guru")}
            className="w-full"
          >
            Dashboard
          </Button>

          <Button variant="menu" className="w-full">
            Data Siswa
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
          Mata Pelajaran
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {subjects.map((item, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(item.title)}
              className="bg-white rounded-xl shadow-md cursor-pointer 
                         hover:scale-[1.03] transition p-3 sm:p-4 flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-28 sm:h-40 object-cover rounded-lg"
              />
              <p className="mt-3 text-sm sm:text-lg font-semibold text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
