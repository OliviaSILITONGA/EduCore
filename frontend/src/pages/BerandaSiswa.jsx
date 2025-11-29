import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Educore_Logo_White.png";
import Button from "../components/Button";
import useStudentProfile from "../hooks/useStudentProfile";

// IMPORT GAMBAR
import Aki from "../assets/images/Ellipse_15.png";
import mtk from "../assets/images/mtk.jpg";
import indo from "../assets/images/B.indo.jpg";
import inggris from "../assets/images/B.inggris.jpg";
import biologi from "../assets/images/biologi.jpg";
import kimia from "../assets/images/kimia.jpg";
import fisika from "../assets/images/fisika.jpg";
import geografi from "../assets/images/geografi.jpg";
import ekonomi from "../assets/images/ekonomi.jpg";
import sejarah from "../assets/images/sejarah.jpg";

export default function BerandaSiswa() {
  const navigate = useNavigate();
  const { profile } = useStudentProfile();

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
    navigate(`/mata-pelajaran-siswa/${subjectTitle.toLowerCase()}`);
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 min-h-screen">
        <img src={Logo} className="h-25 left-10" />

        <button
          onClick={() => navigate("/profil-siswa")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Aki}
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Temanku!!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-siswa")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Mata Pelajaran</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {subjects.map((item, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(item.title)}
              className="bg-white rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition p-4 flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              <p className="mt-3 text-lg font-bold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
