-- Masing-masing masukkan dulu ke pgAdmin, nama databasenya "educore" (gk pake petik)

-- Password pake hash nantinya
CREATE TABLE siswa (
	id_siswa SERIAL PRIMARY KEY,
	nama_siswa VARCHAR(100) NOT NULL,
	email_siswa VARCHAR(100) UNIQUE NOT NULL,
	password_siswa VARCHAR(255) NOT NULL
);

-- Password pake hash nantinya
CREATE TABLE guru (
	id_guru SERIAL PRIMARY KEY,
	nama_guru VARCHAR(100) NOT NULL,
	email_guru VARCHAR(100) UNIQUE NOT NULL,
	password_guru VARCHAR(255) NOT NULL
);

-- Contoh id_mapel: MTK (Matematika), FIS (Fisika), BIO (Biologi)
CREATE TABLE mata_pelajaran (
	id_mapel CHAR(3) PRIMARY KEY,
	nama_mapel VARCHAR(100)
);

-- Contoh id_kelas: MTK1 (Matematika Kelas 1), FIS12 (Fisika Kelas 12)
CREATE TABLE kelas (
	id_kelas VARCHAR(5) PRIMARY KEY,
	id_mapel CHAR(3) REFERENCES mata_pelajaran (id_mapel),
	id_guru SERIAL REFERENCES guru (id_guru),
	nama_kelas VARCHAR(100),
	jenjang VARCHAR(3)
);

-- Contoh id_pelajaran: MTK1-2 (Pelajaran 2 Matematika Kelas 1)
CREATE TABLE pelajaran (
	id_pelajaran VARCHAR(7) PRIMARY KEY,
	id_kelas VARCHAR(5) REFERENCES kelas (id_kelas),
	nama_pelajaran VARCHAR(100),
	durasi VARCHAR(20),
	level VARCHAR(20),
	deskripsi TEXT,
	tanggal DATE DEFAULT CURRENT_DATE
);

CREATE TABLE enrollment (
	id_enrollment SERIAL PRIMARY KEY,
	id_siswa SERIAL REFERENCES siswa (id_siswa),
	id_kelas VARCHAR(5) REFERENCES kelas (id_kelas),
	tgl_enrollment DATE DEFAULT CURRENT_DATE,
	progres DECIMAL(1, 2) DEFAULT 0.00,
	nilai_ujian INT CHECK (nilai_ujian >= 0 AND nilai_ujian <= 100)
);

CREATE TABLE pembelajaran (
	id_pembelajaran SERIAL PRIMARY KEY,
	id_enrollment SERIAL REFERENCES enrollment (id_enrollment),
	id_pelajaran VARCHAR(7) REFERENCES pelajaran (id_pelajaran),
	nilai_latihan INT CHECK (nilai_latihan >= 0 AND nilai_latihan <= 100)
);