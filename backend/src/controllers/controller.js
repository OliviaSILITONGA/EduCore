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
const path = require("path");
const fs = require("fs");
const pool = require("../config/db");


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
    // Fetch siswa profile id
    const profilRes = await pool.query(
      `SELECT id FROM siswa WHERE id_akun = $1 LIMIT 1`,
      [user.user.id]
    );
    const id_userProfil = profilRes.rows[0]?.id || null;
    success(res, 200, "Masuk berhasil", { ...user, id_userProfil });
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
    // Fetch guru profile id
    const profilRes = await pool.query(
      `SELECT id FROM guru WHERE id_akun = $1 LIMIT 1`,
      [user.user.id]
    );
    const id_userProfil = profilRes.rows[0]?.id || null;
    success(res, 200, "Masuk berhasil", { ...user, id_userProfil });
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
    if (!user) return error(res, 400, "Email sudah terdaftar");
    success(res, 201, "Akun dibuat", user);
  } catch (e) {
    console.error("Register Siswa Error:", e.message);
    error(res, 500, e.message || "Registrasi tertunda");
  }
}

/**
 * REGISTER GURU
 * POST /register-guru
 */
async function registerGuru(req, res) {
  try {
    const user = await handleRegister(req.body, "guru");
    if (!user) return error(res, 400, "Email sudah terdaftar");
    success(res, 201, "Akun dibuat", user);
  } catch (e) {
    console.error("Register Guru Error:", e.message);
    error(res, 500, e.message || "Registrasi tertunda");
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

/**
 * GURU: ambil daftar siswa yang telah menandai materi selesai (sidebar)
 * GET /guru/selesai
 */
async function getSiswaSelesai(req, res) {
  try {
    // cari id guru dari akun yang sedang login
    const r = await pool.query(`SELECT id FROM guru WHERE id_akun = $1 LIMIT 1`, [req.id_akun]);
    if (r.rows.length === 0) return error(res, 403, "Akun bukan guru atau profil guru belum dibuat");
    const idGuru = r.rows[0].id;
    const data = await getSiswaSelesaiByGuru(idGuru);
    success(res, 200, "Siswa selesai", data);
  } catch (e) {
    console.error("getSiswaSelesai error:", e.message);
    error(res, 500, "Gagal memuat data siswa selesai");
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

/**
 * DOWNLOAD MATERI (FILE)
 * GET /materi/:id/download
 */
async function downloadMateri(req, res) {
  try {
    const id = req.params.id;
    const data = await tampilkanDetailMateri(id);
    if (!data) return error(res, 404, "Materi tidak ada");

    const url = data.url_media;
    if (!url) return error(res, 404, "Tidak ada file untuk diunduh");

    // If url is an absolute http(s) link, redirect
    if (/^https?:\/\//i.test(url)) {
      return res.redirect(url);
    }

    // Otherwise treat url as relative path under project (e.g., /uploads/filename)
    // Resolve to backend root
    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const requestedPath = path.normalize(
      path.join(uploadsDir, url.replace(/^\//, ""))
    );

    // Security: ensure requestedPath is inside uploadsDir
    if (!requestedPath.startsWith(uploadsDir)) {
      return error(res, 403, "Akses file ditolak");
    }

    if (!fs.existsSync(requestedPath))
      return error(res, 404, "File tidak ditemukan");

    return res.download(requestedPath);
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal mengunduh file");
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
    console.log(`doneMateriSiswa called - idSiswa=${idSiswa}, idMateri=${idMateri}`);
    const data = await tandaiMateriSelesai(idSiswa, idMateri);
    console.log("tandaiMateriSelesai returned:", data);
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

/* ───────────── FILES / UPLOAD MANAGEMENT ───────────── */

// List folders under uploads
async function listFolders(req, res) {
  try {
    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadsDir)) return success(res, 200, "Folders", []);

    const items = fs.readdirSync(uploadsDir, { withFileTypes: true });
    const folders = items
      .filter((it) => it.isDirectory() && it.name !== "_tmp")
      .map((d) => d.name);
    success(res, 200, "Folders", folders);
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal memuat daftar folder");
  }
}

// List files in a folder
async function listFiles(req, res) {
  try {
    const folder = req.params.folder;
    if (!folder) return error(res, 400, "Folder wajib");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const folderPath = path.join(uploadsDir, folder);

    if (!folderPath.startsWith(uploadsDir)) return error(res, 403, "Akses ditolak");
    if (!fs.existsSync(folderPath)) return error(res, 404, "Folder tidak ditemukan");

    const files = fs.readdirSync(folderPath).filter((f) => fs.statSync(path.join(folderPath, f)).isFile());
    success(res, 200, "Files", files);
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal memuat file folder");
  }
}

// Upload handler: expects multer to have stored the file in tmp; move to uploads/<folderName>/originalname
async function uploadFile(req, res) {
  try {
    const folderName = req.body.folderName || req.body.folder || "default";
    const file = req.file;
    if (!file) return error(res, 400, "File wajib diupload");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const targetDir = path.join(uploadsDir, folderName);
    if (!targetDir.startsWith(uploadsDir)) return error(res, 403, "Akses ditolak");
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, file.originalname);

    // Move file from temp to target
    fs.renameSync(file.path, targetPath);

    success(res, 201, "File diupload", { folder: folderName, file: file.originalname });
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal mengupload file");
  }
}

// Download a file inside an uploads folder
async function downloadFolderFile(req, res) {
  try {
    const folder = req.params.folder;
    const file = req.params.file;
    if (!folder || !file) return error(res, 400, "Folder dan file wajib");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const requestedPath = path.normalize(path.join(uploadsDir, folder, file));

    if (!requestedPath.startsWith(uploadsDir)) return error(res, 403, "Akses file ditolak");
    if (!fs.existsSync(requestedPath)) return error(res, 404, "File tidak ditemukan");

    return res.download(requestedPath);
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal mengunduh file");
  }
}

// Delete a single file
async function deleteFile(req, res) {
  try {
    const folder = req.params.folder;
    const file = req.params.file;
    if (!folder || !file) return error(res, 400, "Folder dan file wajib");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const targetPath = path.normalize(path.join(uploadsDir, folder, file));
    if (!targetPath.startsWith(uploadsDir)) return error(res, 403, "Akses ditolak");
    if (!fs.existsSync(targetPath)) return error(res, 404, "File tidak ditemukan");

    fs.unlinkSync(targetPath);
    success(res, 200, "File dihapus");
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal menghapus file");
  }
}

// Delete a folder recursively
async function deleteFolder(req, res) {
  try {
    const folder = req.params.folder;
    if (!folder) return error(res, 400, "Folder wajib");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const targetDir = path.normalize(path.join(uploadsDir, folder));
    if (!targetDir.startsWith(uploadsDir)) return error(res, 403, "Akses ditolak");
    if (!fs.existsSync(targetDir)) return error(res, 404, "Folder tidak ditemukan");

    // recursive delete
    fs.rmSync(targetDir, { recursive: true, force: true });
    success(res, 200, "Folder dihapus");
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal menghapus folder");
  }
}

// Download by query path ?path=relative/path
async function downloadFile(req, res) {
  try {
    const q = req.query.path;
    if (!q) return error(res, 400, "Query path wajib");

    const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");
    const requestedPath = path.normalize(path.join(uploadsDir, q.replace(/^\//, "")));

    if (!requestedPath.startsWith(uploadsDir)) return error(res, 403, "Akses file ditolak");
    if (!fs.existsSync(requestedPath)) return error(res, 404, "File tidak ditemukan");

    return res.download(requestedPath);
  } catch (e) {
    console.error(e);
    error(res, 500, "Gagal mengunduh file");
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
  // file management
  listFolders,
  listFiles,
  uploadFile,
  downloadFolderFile,
  deleteFile,
  deleteFolder,
  downloadFile,
  downloadMateri,
};
