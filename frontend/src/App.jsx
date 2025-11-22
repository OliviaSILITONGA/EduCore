// App.jsx - PASTIKAN ROUTE BERANDA SISWA ADA
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilSiswa from "./pages/ProfilSiswa";
import EditProfilSiswa from "./pages/EditProfilSiswa";

// Import semua halaman
import SelectAccount from "./components/SelectAccount";
import LoginSiswa from "./pages/LoginSiswa";
import LoginGuru from "./pages/LoginGuru";
import RegisterSiswa from "./pages/RegisterSiswa";
import RegisterGuru from "./pages/RegisterGuru";
import BerandaSiswa from "./pages/BerandaSiswa";
import BerandaGuru from "./pages/BerandaGuru";
import DetailMataPelajaran from "./pages/DetailMataPelajaran";
import DetailMataPelajaranSiswa from "./pages/DetailMataPelajaranSiswa";
import ManajemenKelas from "./pages/ManajemenKelas";
import MateriSayaSiswa from "./pages/MateriSayaSiswa";
import Belajar from "./pages/Belajar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectAccount />} />

        {/* LOGIN */}
        <Route path="/login-siswa" element={<LoginSiswa />} />
        <Route path="/login-guru" element={<LoginGuru />} />

        {/* REGISTER */}
        <Route path="/register-siswa" element={<RegisterSiswa />} />
        <Route path="/register-guru" element={<RegisterGuru />} />

        {/* BERANDA - PASTIKAN ADA */}
        <Route path="/beranda-siswa" element={<BerandaSiswa />} />
        <Route path="/beranda-guru" element={<BerandaGuru />} />

        {/* DETAIL MATA PELAJARAN */}
        <Route
          path="/mata-pelajaran/:subject"
          element={<DetailMataPelajaran />}
        />
        <Route
          path="/mata-pelajaran-siswa/:subject"
          element={<DetailMataPelajaranSiswa />}
        />
        {/* manajemen kelas */}
        <Route path="/manajemen-kelas/:matpel" element={<ManajemenKelas />} />
        {/* materi siswa */}
        <Route path="/materi-siswa/:subject" element={<MateriSayaSiswa />} />
        <Route path="/belajar/:subject/:materiId" element={<Belajar />} />

        <Route path="/profil" element={<ProfilSiswa />} />
        <Route path="/edit-profil" element={<EditProfilSiswa />} />
      </Routes>
    </BrowserRouter>
  );
}
