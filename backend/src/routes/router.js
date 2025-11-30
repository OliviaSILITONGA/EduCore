// routes/router.js
const router = require("express").Router();

// Controllers
const controller = require("../controllers/controller");

// Middleware
const checkLogin = require("../middlewares/check-login");

// Security utils (opsional tapi direkomendasikan untuk tetap aman)
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// ───────────── GLOBAL SECURITY ─────────────
router.use(helmet()); // hardening HTTP header
router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 120
}));

// ───────────── AUTH ROUTES ─────────────
router.post("/login-siswa", controller.loginSiswa);
router.post("/login-guru", controller.loginGuru);
router.post("/register-siswa", controller.registerSiswa);
router.post("/register-guru", controller.registerGuru);

// ───────────── PROTECTED PROFIL ─────────────
router.get("/profil-siswa", checkLogin, controller.getProfilSiswa);
router.put("/edit-profil-siswa", checkLogin, controller.putProfilSiswa);
router.get("/profil-guru", checkLogin, controller.getProfilGuru);
router.put("/edit-profil-guru", checkLogin, controller.putProfilGuru);

// ───────────── MATA PELAJARAN ─────────────
router.get("/matpel", checkLogin, controller.getMatpel);

// Ambil kelas yang diikuti siswa pada suatu mapel
router.get("/materi-siswa/:subject/kelas", checkLogin, controller.getKelasMapelSiswa);

// Materi berdasarkan mapel (query: ?kelas=xxx)
router.get("/materi-siswa/:subject/materi", checkLogin, controller.getMateriBySubject);

// ───────────── MATERI CRUD (GURU) ─────────────
router.post("/materi", checkLogin, controller.postMateri);
router.put("/materi/:id", checkLogin, controller.putMateri);
router.delete("/materi/:id", checkLogin, controller.delMateri);

// ───────────── BELAJAR ─────────────
router.get("/belajar/:subject/:materiId", checkLogin, controller.getDetailMateri);

// Tandai selesai
router.post("/materi/selesai", checkLogin, controller.doneMateriSiswa);

// Cek status selesai
router.get("/materi/:idMateri/selesai", checkLogin, controller.cekStatusMateri);

module.exports = router;
