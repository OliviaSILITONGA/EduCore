// controllers/controller.js
const {
  handleLogin,
  handleRegister,
  tampilkanProfil,
  updateProfil,
  tampilkanMatpel,
  tampilkanKelas,
  tampilkanMateri,
  tampilkanDetailMateri,
  tambahMateri,
  updateMateri,
  deleteMateri,
  tandaiMateriSelesai,
} = require("../services/service");

const { success, error } = require("../utils/response");

// Utility role validation
const validateRole = (r) => ["siswa", "guru"].includes(r);

/* ───────────── AUTH ───────────── */

/**
 * LOGIN SISWA
 * POST /login-siswa
 */
async function loginSiswa(req, res) {
  try {
    const user = await handleLogin(req.body, "siswa");
    if (!user) return error(res, 401, "Masuk gagal");
    success(res, 200, "Masuk berhasil", user);
  } catch (e) {
    error(res, 500, "Masuk mengalami gangguan");
  }
}

/**
 * LOGIN GURU
 * POST /login-guru
 */
async function loginGuru(req, res) {
  try {
    const user = await handleLogin(req.body, "guru");
    if (!user) return error(res, 401, "Masuk gagal");
    success(res, 200, "Masuk berhasil", user);
  } catch (e) {
    error(res, 500, "Masuk mengalami gangguan");
  }
}

/**
 * REGISTER SISWA
 * POST /register-siswa
 */
async function registerSiswa(req, res) {
  try {
    const user = await handleRegister(req.body, "siswa");
    success(res, 201, "Akun dibuat", user);
  } catch (e) {
    error(res, 500, "Registrasi tertunda");
  }
}

/**
 * REGISTER GURU
 * POST /register-guru
 */
async function registerGuru(req, res) {
  try {
    const user = await handleRegister(req.body, "guru");
    success(res, 201, "Akun dibuat", user);
  } catch (e) {
    error(res, 500, "Registrasi tertunda");
  }
}

/* ───────────── PROFIL ───────────── */

/**
 * GET PROFIL SISWA (berdasarkan sesi login)
 * GET /profil-siswa
 */
async function getProfilSiswa(req, res) {
  try {
    const profil = await tampilkanProfil(req.id_akun, "siswa");
    if (!profil) return error(res, 404, "Profil tidak ada");
    success(res, 200, "Profil ditemukan", profil);
  } catch (e) {
    error(res, 500, "Gagal memuat profil");
  }
}

/**
 * UPDATE PROFIL SISWA
 * PUT /edit-profil-siswa
 */
async function putProfilSiswa(req, res) {
  try {
    const profil = await updateProfil(req.id_akun, "siswa", req.body);
    if (!profil) return error(res, 404, "Profil tidak ada");
    success(res, 200, "Profil disimpan", profil);
  } catch (e) {
    error(res, 500, "Perubahan profil tertunda");
  }
}

/**
 * GET PROFIL GURU
 * GET /profil-guru
 */
async function getProfilGuru(req, res) {
  try {
    const profil = await tampilkanProfil(req.id_akun, "guru");
    if (!profil) return error(res, 404, "Profil tidak ada");
    success(res, 200, "Profil ditemukan", profil);
  } catch (e) {
    error(res, 500, "Gagal memuat profil");
  }
}

/**
 * UPDATE PROFIL GURU
 * PUT /edit-profil-guru
 */
async function putProfilGuru(req, res) {
  try {
    const profil = await updateProfil(req.id_akun, "guru", req.body);
    if (!profil) return error(res, 404, "Profil tidak ada");
    success(res, 200, "Profil disimpan", profil);
  } catch (e) {
    error(res, 500, "Perubahan profil tertunda");
  }
}

/* ───────────── MATA PELAJARAN ───────────── */

/**
 * GET daftar mata pelajaran
 * GET /matpel
 */
async function getMatpel(req, res) {
  try {
    const data = await tampilkanMatpel();
    success(res, 200, "Daftar mata pelajaran", data);
  } catch (e) {
    error(res, 500, "Gagal memuat daftar");
  }
}

/**
 * GET kelas siswa pada suatu mapel
 * GET /materi-siswa/:subject
 */
async function getKelasMapelSiswa(req, res) {
  try {
    const subject = req.params.subject.toLowerCase();
    const data = await tampilkanKelas(req.id_userProfil, subject);
    if (!data) return error(res, 404, "Kelas tidak ada");
    success(res, 200, "Kelas", data);
  } catch (e) {
    error(res, 500, "Gagal memuat kelas");
  }
}

/**
 * GET daftar materi per kelas
 * GET /manajemen-kelas/:matpel  (guru view, nanti bisa filter)
 */
async function getMateriBySubject(req, res) {
  try {
    const matpel = req.params.matpel.toLowerCase();
    const kelas = req.query.kelas || null;
    const data = await tampilkanMateri(kelas);
    success(res, 200, "Materi", data);
  } catch (e) {
    error(res, 500, "Materi tertunda");
  }
}

/* ───────────── MATERI (CRUD guru) ───────────── */

/**
 * GURU: Tambah materi
 * POST /mata-pelajaran/:subject/materi
 */
async function postMateri(req, res) {
  try {
    const payload = { ...req.body, guruId: req.id_userProfil };
    const data = await tambahMateri(payload);
    success(res, 201, "Materi dibuat", data);
  } catch (e) {
    error(res, 500, "Gagal menyimpan materi");
  }
}

/**
 * GURU: Update materi
 * PUT /materi/:id
 */
async function putMateri(req, res) {
  try {
    const data = await updateMateri(req.params.id, req.body);
    if (!data) return error(res, 404, "Materi tidak ada");
    success(res, 200, "Materi disimpan", data);
  } catch (e) {
    error(res, 500, "Gagal merubah materi");
  }
}

/**
 * GURU: Delete materi
 * DELETE /materi/:id
 */
async function delMateri(req, res) {
  try {
    const data = await deleteMateri(req.params.id);
    if (!data) return error(res, 404, "Materi tidak ada");
    success(res, 200, "Materi dihapus", data);
  } catch (e) {
    error(res, 500, "Gagal menghapus materi");
  }
}

/**
 * GET detail materi untuk siswa/guru
 * GET /belajar/:subject/:materiId
 */
async function getDetailMateri(req, res) {
  try {
    const data = await tampilkanDetailMateri(req.params.materiId);
    if (!data) return error(res, 404, "Materi tidak ada");
    success(res, 200, "Detail materi", data);
  } catch (e) {
    error(res, 500, "Gagal memuat detail");
  }
}

/* ───────────── PEMBELAJARAN SISWA ───────────── */

/**
 * SISWA: tandai materi selesai
 * POST /materi/selesai
 * body: { idMateri }
 */
async function doneMateriSiswa(req, res) {
  try {
    let idMateri = req.body.idMateri;
    if (!idMateri) return error(res, 400, "ID materi wajib");

    const resProfil = await pool.query(
      `SELECT id FROM siswa WHERE id_akun = $1 LIMIT 1`,
      [req.id_akun]
    );
    if (resProfil.rows.length === 0) return error(res, 403, "Akun bukan siswa");

    const idSiswa = resProfil.rows[0].id;

    const data = await tandaiMateriSelesai(idSiswa, idMateri);
    if (!data) return error(res, 404, "Gagal menandai");

    success(res, 200, "Status belajar disimpan", data);
  } catch (e) {
    error(res, 500, "Gagal menandai materi");
  }
}

/**
 * GET status selesai materi 1 user 1 materi
 * GET /materi/:idMateri/selesai
 */
async function cekStatusMateri(req, res) {
  try {
    const idMateri = req.params.idMateri;
    const resProfil = await pool.query(
      `SELECT id FROM siswa WHERE id_akun = $1 LIMIT 1`,
      [req.id_akun]
    );
    if (resProfil.rows.length === 0) return error(res, 403, "Akun bukan siswa");

    const idSiswa = resProfil.rows[0].id;
    const r = await pool.query(
      `SELECT selesai FROM pembelajaran WHERE id_siswa = $1 AND id_materi = $2 LIMIT 1`,
      [idSiswa, idMateri]
    );

    success(res, 200, "Status selesai", {
      selesai: r.rows[0]?.selesai || false,
    });
  } catch (e) {
    error(res, 500, "Gagal cek status");
  }
}

module.exports = {
  loginSiswa,
  loginGuru,
  registerSiswa,
  registerGuru,
  getProfilSiswa,
  putProfilSiswa,
  getProfilGuru,
  putProfilGuru,
  getMatpel,
  getKelasMapelSiswa,
  getMateriBySubject,
  postMateri,
  putMateri,
  delMateri,
  getDetailMateri,
  doneMateriSiswa,
  cekStatusMateri,
};
