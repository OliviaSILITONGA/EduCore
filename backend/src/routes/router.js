const express = require("express");
const router = express.Router();
const {
  handlerLoginSiswa,
  handlerLoginGuru,
  handlerRegisterSiswa,
  handlerRegisterGuru,
  handlerBerandaSiswa,
  handlerBerandaGuru,
  handlerMapel,
  handlerMapelSiswa,
  handlerKelas,
  handlerMateri
} = require("../controllers/controller");

// Router login
router.post("/login-siswa", handlerLoginSiswa);
router.post("/login-guru", handlerLoginGuru);

// Router register
router.post("/register-siswa", handlerRegisterSiswa);
router.post("/register-guru", handlerRegisterGuru);

// Router beranda
router.get("/beranda-siswa", handlerBerandaSiswa);
router.get("/beranda-guru", handlerBerandaGuru);

// Router mapel
router.get("/mata-pelajaran/:subject", handlerMapel);
router.get("/mata-pelajaran-siswa/:subject", handlerMapelSiswa);

// Router manajemen kelas
router.get("/manajemen-kelas/:matpel", handlerKelas);

// Router materi siswa
router.get("/materi-siswa/:subject", handlerMateri);
router.get("/belajar/:subject/:materiId", handlerBelajar);

module.exports = router;