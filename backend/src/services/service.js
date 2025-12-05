// services/service.js
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const pool = require("../config/db");

function validateEmail(email) {
  return typeof email === "string" && /\S+@\S+\.\S+/.test(email);
}
function validatePassword(pw) {
  return typeof pw === "string" && pw.length >= 8;
}
function validateRole(role) {
  return role === "siswa" || role === "guru";
}

async function handleLogin(data, role) {
  const { email, password } = data;
  console.log(`handleLogin called - email=${email}, role=${role}`);
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateRole(role)
  ) {
    throw new Error("Invalid input");
  }

  let client;
  try {
    client = await pool.connect();
  } catch (connectErr) {
    console.error("Database connection error:", connectErr.message);
    throw new Error(
      "Database connection failed. Please check database configuration."
    );
  }

  try {
    const q = `SELECT id, email, password, role FROM akun WHERE email = $1 AND role = $2 LIMIT 1`;
    const res = await client.query(q, [email, role]);
    console.log("login query result rows:", res.rows.length);
    if (res.rows.length === 0) return null;

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const token = crypto.randomBytes(32).toString("hex");
    console.log("generated token for user id", user.id);
    await client.query(
      `INSERT INTO sesi (token, id_akun, waktu_berakhir) VALUES ($1, $2, DEFAULT)`,
      [token, user.id]
    );

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  } catch (err) {
    console.error("Login service error:", err.message);
    throw err;
  } finally {
    if (client) client.release();
  }
}

async function handleRegister(data, role) {
  const { email, password } = data;
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateRole(role)
  ) {
    throw new Error("Invalid input");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const cek = `SELECT id FROM akun WHERE email = $1 LIMIT 1`;
    const sudah = await client.query(cek, [email]);
    if (sudah.rows.length > 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const hashed = await bcrypt.hash(password, 10);
    const ins = `INSERT INTO akun (email, password, role, foto_profil) VALUES ($1,$2,$3,$4) RETURNING id,email,role,foto_profil`;
    const res = await client.query(ins, [
      email,
      hashed,
      role,
      data.fotoProfil || null,
    ]);
    const newUser = res.rows[0];

    if (role === "siswa") {
      await client.query(
        `INSERT INTO siswa (id_akun, tingkat, ortu_wali, telp_ortu_wali, nama) VALUES ($1,$2,$3,$4,$5)`,
        [newUser.id, data.tingkat, data.ortuWali, data.telpOrtuWali, data.nama]
      );
    } else if (role === "guru") {
      await client.query(
        `INSERT INTO guru (id_akun, nama, alamat, provinsi_alamat, kota_alamat) VALUES ($1,$2,$3,$4,$5)`,
        [
          newUser.id,
          data.nama,
          data.alamat || null,
          data.provinsi || null,
          data.kota || null,
        ]
      );
    } else {
      await client.query("ROLLBACK");
      throw new Error("Unknown role");
    }

    await client.query("COMMIT");
    return newUser;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Register service error");
    throw err;
  } finally {
    client.release();
  }
}

async function tampilkanProfil(idAkun, role) {
  if (!idAkun || !validateRole(role)) return null;
  const q =
    role === "siswa"
      ? `SELECT * FROM siswa WHERE id_akun = $1 LIMIT 1`
      : `SELECT * FROM guru WHERE id_akun = $1 LIMIT 1`;

  const res = await pool.query(q, [idAkun]);
  return res.rows[0] || null;
}

async function tampilkanMatpel() {
  const res = await pool.query("SELECT * FROM matpel ORDER BY nama ASC");
  return res.rows;
}

async function tampilkanKelas(idSiswa, subject) {
  if (!idSiswa || !subject) return null;
  const q = `
    SELECT k.nama AS kelas, dk.progres
    FROM detail_kelas dk
    JOIN kelas k ON dk.id_kelas = k.id
    JOIN matpel mp ON dk.id_matpel = mp.id
    WHERE dk.id_siswa = $1 AND LOWER(mp.nama) = LOWER($2)
    ORDER BY dk.tgl_masuk DESC
  `;
  const res = await pool.query(q, [idSiswa, subject]);
  return res.rows;
}

async function tampilkanMateri(idKelas) {
  if (!idKelas) return null;
  const q = `SELECT * FROM materi WHERE id_kelas = $1 ORDER BY tanggal_pembuatan DESC`;
  const res = await pool.query(q, [idKelas]);
  return res.rows;
}

// Ambil daftar siswa yang menandai materi selesai untuk guru tertentu
async function getSiswaSelesaiByGuru(idGuru) {
  if (!idGuru) return [];
  const q = `
    SELECT p.id AS pembelajaran_id,
           s.id AS id_siswa,
           s.nama AS nama_siswa,
           mp.nama AS nama_matpel,
           m.id_kelas AS kelas
    FROM pembelajaran p
    JOIN siswa s ON p.id_siswa = s.id
    JOIN materi m ON p.id_materi = m.id
    JOIN matpel mp ON m.id_matpel = mp.id
    WHERE p.selesai = true AND m.id_guru = $1
    ORDER BY p.id DESC
  `;
  const res = await pool.query(q, [idGuru]);
  return res.rows;
}

async function tampilkanDetailMateri(id) {
  if (!id) return null;
  const q = `SELECT * FROM materi WHERE id = $1 LIMIT 1`;
  const res = await pool.query(q, [id]);
  return res.rows[0] || null;
}

// Ambil daftar semua siswa yang terdaftar (untuk guru)
async function getDaftarSiswa() {
  const q = `
    SELECT 
      s.id,
      s.nama,
      a.email,
      s.tingkat,
      s.nama_sekolah,
      s.kota_sekolah,
      s.provinsi_sekolah,
      a.created_at AS tanggal_daftar
    FROM siswa s
    JOIN akun a ON s.id_akun = a.id
    ORDER BY a.created_at DESC
  `;
  const res = await pool.query(q);
  return res.rows;
}

// Ambil daftar siswa yang login ke sistem (memiliki sesi aktif)
async function getSiswaLogin() {
  const q = `
    SELECT 
      s.id,
      s.nama,
      a.email,
      s.tingkat,
      se.waktu_berakhir AS sesi_berakhir
    FROM siswa s
    JOIN akun a ON s.id_akun = a.id
    JOIN sesi se ON a.id = se.id_akun
    WHERE se.waktu_berakhir > NOW()
    ORDER BY se.waktu_berakhir DESC
  `;
  const res = await pool.query(q);
  return res.rows;
}

async function tambahMateri(data) {
  const { guruId, matpelId, kelasId, nama, deskripsi, isi, catatan, urlMedia } =
    data;
  if (!guruId || !matpelId || !kelasId || !nama)
    throw new Error("Missing required fields");
  const q = `INSERT INTO materi (id_guru,id_matpel,id_kelas,nama,deskripsi,isi,catatan,url_media) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const res = await pool.query(q, [
    guruId,
    matpelId,
    kelasId,
    nama,
    deskripsi || null,
    isi || null,
    catatan || null,
    urlMedia || null,
  ]);
  return res.rows[0];
}

async function updateProfil(idAkun, role, data) {
  if (!idAkun || !validateRole(role)) {
    throw new Error("Invalid parameters");
  }

  const {
    nama,
    provinsiAlamat,
    kotaAlamat,
    alamat,
    tingkat,
    ortuWali,
    telpOrtuWali,
    provinsiSekolah,
    kotaSekolah,
    namaSekolah,
    fotoProfil,
  } = data;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    if (role === "siswa") {
      const q = `
        UPDATE siswa
        SET nama = $1,
            provinsi_alamat = $2,
            kota_alamat = $3,
            alamat = $4,
            tingkat = $5,
            ortu_wali = $6,
            telp_ortu_wali = $7,
            provinsi_sekolah = $8,
            kota_sekolah = $9,
            nama_sekolah = $10,
            updated_at = NOW()
        WHERE id_akun = $11
        RETURNING *
      `;
      const res = await client.query(q, [
        nama,
        provinsiAlamat || null,
        kotaAlamat || null,
        alamat || null,
        tingkat,
        ortuWali,
        telpOrtuWali,
        provinsiSekolah || null,
        kotaSekolah || null,
        namaSekolah || null,
        idAkun,
      ]);

      if (res.rows.length === 0) {
        await client.query("ROLLBACK");
        return null;
      }

      if (fotoProfil) {
        const q2 = `UPDATE akun SET foto_profil = $1, updated_at = NOW() WHERE id = $2`;
        await client.query(q2, [fotoProfil, idAkun]);
      }

      await client.query("COMMIT");
      return res.rows[0];
    }

    if (role === "guru") {
      const q = `
        UPDATE guru
        SET nama = $1,
            provinsi_alamat = $2,
            kota_alamat = $3,
            alamat = $4,
            updated_at = NOW()
        WHERE id_akun = $5
        RETURNING *
      `;
      const res = await client.query(q, [
        nama,
        provinsiAlamat || null,
        kotaAlamat || null,
        alamat || null,
        idAkun,
      ]);

      if (res.rows.length === 0) {
        await client.query("ROLLBACK");
        return null;
      }

      if (fotoProfil) {
        const q2 = `UPDATE akun SET foto_profil = $1, updated_at = NOW() WHERE id = $2`;
        await client.query(q2, [fotoProfil, idAkun]);
      }

      await client.query("COMMIT");
      return res.rows[0];
    }

    await client.query("COMMIT");
    return null;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Update profil error");
    throw err;
  } finally {
    client.release();
  }
}

async function updateMateri(id, data) {
  if (!id) return null;
  const q = `UPDATE materi SET id_matpel=$1,id_kelas=$2,nama=$3,deskripsi=$4,isi=$5,catatan=$6,url_media=$7 WHERE id=$8 RETURNING *`;
  const res = await pool.query(q, [
    data.matpelId,
    data.kelasId,
    data.nama,
    data.deskripsi,
    data.isi,
    data.catatan,
    data.urlMedia,
    id,
  ]);
  return res.rows[0] || null;
}

async function deleteMateri(id) {
  if (!id) return null;
  const q = `DELETE FROM materi WHERE id = $1 RETURNING *`;
  const res = await pool.query(q, [id]);
  return res.rows[0] || null;
}

async function tandaiMateriSelesai(idSiswa, idMateri) {
  if (!idSiswa || !idMateri) throw new Error("Missing parameters");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Pastikan materi ada
    const cekMateri = await client.query(
      `SELECT * FROM materi WHERE id = $1 LIMIT 1`,
      [idMateri]
    );
    if (cekMateri.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    // Cek apakah siswa ini ada dan valid
    const cekSiswa = await client.query(
      `SELECT * FROM siswa WHERE id = $1 LIMIT 1`,
      [idSiswa]
    );
    if (cekSiswa.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    // Tandai selesai / upsert
    const q = `
      INSERT INTO pembelajaran (id_siswa, id_materi, selesai)
      VALUES ($1, $2, TRUE)
      ON CONFLICT (id_siswa, id_materi)
      DO UPDATE SET selesai = TRUE
      RETURNING *
    `;

    const res = await client.query(q, [idSiswa, idMateri]);
    await client.query("COMMIT");

    return res.rows[0];
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Tandai materi selesai error");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  handleLogin,
  handleRegister,
  tampilkanProfil,
  tampilkanMatpel,
  tampilkanKelas,
  tampilkanMateri,
  tampilkanDetailMateri,
  tambahMateri,
  updateProfil,
  updateMateri,
  deleteMateri,
  tandaiMateriSelesai,
  getDaftarSiswa,
  getSiswaLogin,
  getSiswaSelesaiByGuru,
};
