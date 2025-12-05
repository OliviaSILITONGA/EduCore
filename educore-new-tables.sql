-- Drop dan recreate to avoid conflicts
DROP TABLE IF EXISTS detail_kelas CASCADE;
DROP TABLE IF EXISTS pembelajaran CASCADE;
DROP TABLE IF EXISTS materi CASCADE;
DROP TABLE IF EXISTS kelas CASCADE;
DROP TABLE IF EXISTS matpel CASCADE;
DROP TABLE IF EXISTS guru CASCADE;
DROP TABLE IF EXISTS siswa CASCADE;
DROP TABLE IF EXISTS sesi CASCADE;
DROP TABLE IF EXISTS akun CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Buat ENUM type untuk user_role
CREATE TYPE user_role AS ENUM ('siswa', 'guru');

-- Tabel akun (login/register)
CREATE TABLE akun (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  foto_profil TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabel sesi (token login)
CREATE TABLE sesi (
  token TEXT PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id) ON DELETE CASCADE,
  waktu_berakhir TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '7 days'
);

-- Tabel siswa (profil siswa)
CREATE TABLE siswa (
  id SERIAL PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id) ON DELETE CASCADE,
  nama VARCHAR(100) UNIQUE NOT NULL,
  provinsi_alamat VARCHAR(100),
  kota_alamat VARCHAR(100),
  alamat TEXT,
  provinsi_sekolah VARCHAR(100),
  kota_sekolah VARCHAR(100),
  nama_sekolah VARCHAR(100),
  tingkat VARCHAR(3) NOT NULL,
  ortu_wali VARCHAR(100) NOT NULL,
  telp_ortu_wali VARCHAR(14) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabel guru (profil guru)
CREATE TABLE guru (
  id SERIAL PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id) ON DELETE CASCADE,
  nama VARCHAR(100) UNIQUE NOT NULL,
  provinsi_alamat VARCHAR(100),
  kota_alamat VARCHAR(100),
  alamat TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabel mata pelajaran
CREATE TABLE matpel (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  url_gambar TEXT
);

-- Tabel kelas
CREATE TABLE kelas (
  id VARCHAR(100) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  no_kelas INT CHECK (no_kelas BETWEEN 1 AND 12),
  tingkat VARCHAR(3) NOT NULL
);

-- Tabel materi (file/materi yang diupload guru)
CREATE TABLE materi (
  id SERIAL PRIMARY KEY,
  id_guru INT NOT NULL REFERENCES guru(id) ON DELETE CASCADE,
  id_matpel INT NOT NULL REFERENCES matpel(id) ON DELETE CASCADE,
  id_kelas VARCHAR(100) NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  isi TEXT,
  catatan TEXT,
  url_media TEXT,
  tanggal_pembuatan DATE DEFAULT CURRENT_DATE
);

-- Tabel pembelajaran (progress siswa di materi)
CREATE TABLE pembelajaran (
  id SERIAL PRIMARY KEY,
  id_siswa INT NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  id_materi INT NOT NULL REFERENCES materi(id) ON DELETE CASCADE,
  selesai BOOLEAN DEFAULT false,
  UNIQUE (id_siswa, id_materi)
);

-- Tabel detail_kelas (siswa di kelas mana dan mapel apa)
CREATE TABLE detail_kelas (
  id SERIAL PRIMARY KEY,
  id_siswa INT NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  id_matpel INT NOT NULL REFERENCES matpel(id) ON DELETE CASCADE,
  id_kelas VARCHAR(100) NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
  tgl_masuk DATE DEFAULT CURRENT_DATE,
  progres INT CHECK (progres BETWEEN 0 AND 100)
);

-- Buat INDEX untuk optimasi query
CREATE INDEX IF NOT EXISTS idx_akun_email ON akun(email);
CREATE INDEX IF NOT EXISTS idx_sesi_id_akun ON sesi(id_akun);
CREATE INDEX IF NOT EXISTS idx_siswa_id_akun ON siswa(id_akun);
CREATE INDEX IF NOT EXISTS idx_guru_id_akun ON guru(id_akun);
CREATE INDEX IF NOT EXISTS idx_materi_id_guru ON materi(id_guru);
CREATE INDEX IF NOT EXISTS idx_materi_id_matpel ON materi(id_matpel);
CREATE INDEX IF NOT EXISTS idx_materi_id_kelas ON materi(id_kelas);
CREATE INDEX IF NOT EXISTS idx_pembelajaran_id_siswa ON pembelajaran(id_siswa);
CREATE INDEX IF NOT EXISTS idx_pembelajaran_id_materi ON pembelajaran(id_materi);
CREATE INDEX IF NOT EXISTS idx_detail_kelas_id_siswa ON detail_kelas(id_siswa);
CREATE INDEX IF NOT EXISTS idx_detail_kelas_id_matpel ON detail_kelas(id_matpel);
