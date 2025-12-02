CREATE TYPE user_role AS ENUM ('siswa','guru');

CREATE TABLE akun (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  foto_profil TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sesi (
  token TEXT PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id),
  waktu_berakhir TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '7 days'
);

CREATE TABLE siswa (
  id SERIAL PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id),
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

CREATE TABLE guru (
  id SERIAL PRIMARY KEY,
  id_akun INT NOT NULL REFERENCES akun(id),
  nama VARCHAR(100) UNIQUE NOT NULL,
  provinsi_alamat VARCHAR(100),
  kota_alamat VARCHAR(100),
  alamat TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE matpel (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  url_gambar TEXT
);

CREATE TABLE kelas (
  id VARCHAR(100) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  no_kelas INT CHECK (no_kelas BETWEEN 1 AND 12),
  tingkat VARCHAR(3) NOT NULL
);

CREATE TABLE materi (
  id SERIAL PRIMARY KEY,
  id_guru INT NOT NULL REFERENCES guru(id),
  id_matpel INT NOT NULL REFERENCES matpel(id),
  id_kelas VARCHAR(100) NOT NULL REFERENCES kelas(id),
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  isi TEXT,
  catatan TEXT,
  url_media TEXT,
  tanggal_pembuatan DATE DEFAULT CURRENT_DATE
);

CREATE TABLE pembelajaran (
  id SERIAL PRIMARY KEY,
  id_siswa INT NOT NULL REFERENCES siswa(id),
  id_materi INT NOT NULL REFERENCES materi(id),
  selesai BOOLEAN DEFAULT false,
  UNIQUE (id_siswa, id_materi)
);

CREATE TABLE detail_kelas (
  id SERIAL PRIMARY KEY,
  id_siswa INT NOT NULL REFERENCES siswa(id),
  id_matpel INT NOT NULL REFERENCES matpel(id),
  id_kelas VARCHAR(100) NOT NULL REFERENCES kelas(id),
  tgl_masuk DATE DEFAULT CURRENT_DATE,
  progres INT CHECK (progres BETWEEN 0 AND 100)
);

/**
 * INDEX untuk performance
 */
CREATE INDEX idx_akun_email ON akun(email);
CREATE INDEX idx_sesi_id_akun ON sesi(id_akun);
CREATE INDEX idx_detail_kelas_siswa ON detail_kelas(id_siswa);
CREATE INDEX idx_materi_kelas ON materi(id_kelas);
CREATE INDEX idx_pembelajaran_siswa ON pembelajaran(id_siswa);
