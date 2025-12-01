// App.jsx - PASTIKAN ROUTE BERANDA SISWA ADA
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ProfilSiswa from "./pages/ProfilSiswa";
import EditProfilSiswa from "./pages/EditProfilSiswa";
import ProfilGuru from "./pages/ProfilGuru";
import EditProfilGuru from "./pages/EditProfilGuru";
import Lupasandi_guru from "./pages/Lupasandi_guru";
import Lupasandi_siswa from "./pages/Lupasandi_siswa";
import Buatsandi_guru from "./pages/Buatsandi_guru";
import Buatsandi_siswa from "./pages/Buatsandi_siswa";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectAccount />} />

          {/* LOGIN */}
          <Route path="/login-siswa" element={<LoginSiswa />} />
          <Route path="/login-guru" element={<LoginGuru />} />

          {/* REGISTER */}
          <Route path="/register-siswa" element={<RegisterSiswa />} />
          <Route path="/register-guru" element={<RegisterGuru />} />

          {/* LUPA SANDI */}
          <Route path="/lupasandi-guru" element={<Lupasandi_guru />} />
          <Route path="/lupasandi-siswa" element={<Lupasandi_siswa />} />

          {/* BUAT SANDI */}
          <Route path="/buatsandi-guru" element={<Buatsandi_guru />} />
          <Route path="/buatsandi-siswa" element={<Buatsandi_siswa />} />

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
          <Route
            path="/materi-siswa/:subject/:kelasId"
            element={<MateriSayaSiswa />}
          />
          <Route path="/belajar/:subject/:materiId" element={<Belajar />} />

          {/* profil siswa*/}
          <Route path="/profil-siswa" element={<ProfilSiswa />} />
          <Route path="/edit-profil-siswa" element={<EditProfilSiswa />} />

          {/* profil guru*/}
          <Route path="/profil-guru" element={<ProfilGuru />} />
          <Route path="/edit-profil-guru" element={<EditProfilGuru />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
