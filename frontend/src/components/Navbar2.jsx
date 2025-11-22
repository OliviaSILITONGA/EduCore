// src/components/Navbar2.jsx
import { Link } from "react-router-dom";

export default function Navbar2({ title }) {
  return (
    <div className="w-full bg-[#21A5D8] text-white p-4 text-xl font-bold flex items-center gap-2">
      <Link to="/beranda-siswa" className="text-white text-lg">
        &lt; kembali
      </Link>
      <span className="ml-2">{title}</span>
    </div>
  );
}
