const bcrypt = require("bcryptjs");
const pool = require("../config/db");

async function handlerLoginSiswa(data) {
  const { nama, email, password } = data;

  const result = await pool.query(
    "SELECT password_siswa FROM siswa WHERE nama_siswa = $1 OR email_siswa = $2",
    [nama, email]
  );
  if (result.rows.length === 0) return null; // user tidak ditemukan

  const hashed = result.rows[0].password_siswa;
  const match = await bcrypt.compare(password, hashed);
  return match;
}

async function handlerLoginGuru(data) {
  const { nama, email, password } = data;

  const result = await pool.query(
    "SELECT password_guru FROM guru WHERE nama_guru = $1 OR email_guru = $2",
    [nama, email]
  );
  if (result.rows.length === 0) return null; // user tidak ditemukan

  const hashed = result.rows[0].password_guru;
  const match = await bcrypt.compare(password, hashed);
  return match;
}

async function handlerRegisterSiswa(data) {
  const { nama, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO siswa (nama_siswa, email_siswa, password_siswa) VALUES
     ($1, $2, $3) RETURNING *`,
    [nama, email, hashedPassword]
  );

  return result.rows[0];
}

async function handlerRegisterGuru(data) {
  const { nama, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO guru (nama_guru, email_guru, password_guru) VALUES
     ($1, $2, $3) RETURNING *`,
    [nama, email, hashedPassword]
  );

  return result.rows[0];
}

async function handlerBerandaSiswa(id) {
  const info = await pool.query(
    "SELECT id_siswa, nama_siswa, email_siswa FROM siswa WHERE id_siswa = $1",
    [id]
  );

  const kelas = await pool.query(
    `SELECT k.id_kelas, k.nama_kelas, mp.nama_mapel
     FROM enrollment e
     JOIN kelas k ON e.id_kelas = k.id_kelas
     JOIN mata_pelajaran mp ON k.id_mapel = mp.id_mapel
     WHERE e.id_siswa = $1`,
    [id]
  );

  return {
    info: info.rows[0],
    kelas: kelas.rows
  };
}

async function handlerBerandaGuru(id) {
  const info = await pool.query(
    "SELECT id_guru, nama_guru, email_guru FROM guru WHERE id_guru = $1",
    [id]
  );

  const kelas = await pool.query(
    `SELECT k.id_kelas, k.nama_kelas, mp.nama_mapel
     FROM kelas k
     JOIN mata_pelajaran mp ON k.id_mapel = mp.id_mapel
     WHERE k.id_guru = $1`,
    [id]
  );

  return {
    info: info.rows[0],
    kelas: kelas.rows
  };
}

async function handlerMapel(subject) {
  const result = await pool.query(
    "SELECT * FROM mata_pelajaran WHERE LOWER(nama_mapel) = LOWER($1)",
    [subject]
  );

  return result.rows[0];
}

async function handlerMapelSiswa(subject) {
  const result = await pool.query(
    `SELECT p.id_pelajaran,
            p.nama_pelajaran,
            k.nama_kelas,
            mp.nama_mapel
     FROM pelajaran p
     JOIN kelas k ON p.id_kelas = k.id_kelas
     JOIN mata_pelajaran mp ON k.id_mapel = mp.id_mapel
     WHERE LOWER(mp.nama_mapel) = LOWER($1)`,
    [subject]
  );

  return result.rows;
}

async function handlerKelas(id_mapel) {
  const result = await pool.query(
    `SELECT k.id_kelas, k.nama_kelas, k.jenjang, g.nama_guru
     FROM kelas k
     JOIN guru g ON k.id_guru = g.id_guru
     WHERE k.id_mapel = $1`,
    [id_mapel]
  );

  return result.rows;
}

async function handlerMateri(subject) {
  const result = await pool.query(
    `SELECT p.id_pelajaran,
            p.nama_pelajaran,
            k.nama_kelas,
            mp.nama_mapel
     FROM pelajaran p
     JOIN kelas k ON p.id_kelas = k.id_kelas
     JOIN mata_pelajaran mp ON k.id_mapel = mp.id_mapel
     WHERE LOWER(mp.nama_mapel) = LOWER($1)`,
    [subject]
  );

  return result.rows.map((row) => ({
    id: row.id_pelajaran,
    judul: row.nama_pelajaran,
    deskripsi: "Deskripsi masih dummy",
    durasi: "30 menit",
    level: "Pemula",
    tanggal: "2024-01-01",
    kelas: row.nama_kelas,
    mapel: row.nama_mapel
  }));
}

module.exports = {
  handlerLoginSiswa,
  handlerLoginGuru,
  handlerRegisterSiswa,
  handlerRegisterGuru,
  handlerBerandaSiswa,
  handlerBerandaGuru,
  handlerMapel,
  handlerMapelSiswa,
  handlerKelas,
  handlerMateri,
};
