-- Insert sample mata pelajaran
INSERT INTO matpel (nama, url_gambar) VALUES
  ('Matematika', '/assets/images/matematika.png'),
  ('Bahasa Indonesia', '/assets/images/bahasa-indo.png'),
  ('Bahasa Inggris', '/assets/images/bahasa-eng.png'),
  ('IPA', '/assets/images/ipa.png'),
  ('IPS', '/assets/images/ips.png');

-- Insert sample kelas
INSERT INTO kelas (id, nama, no_kelas, tingkat) VALUES
  ('K1_SD', 'Kelas 1', 1, 'SD'),
  ('K2_SD', 'Kelas 2', 2, 'SD'),
  ('K3_SD', 'Kelas 3', 3, 'SD'),
  ('K1_SMP', 'Kelas 1', 1, 'SMP'),
  ('K2_SMP', 'Kelas 2', 2, 'SMP'),
  ('K3_SMP', 'Kelas 3', 3, 'SMP');

-- Insert sample akun guru (password: Guru123456)
-- Password di-hash dengan bcrypt: $2a$10$0mLV.bGOsHlOcqp8Gkp6k.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO
INSERT INTO akun (email, password, role) VALUES
  ('guru1@educore.com', '$2a$10$0mLV.bGOsHlOcqp8Gkp6k.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'guru'),
  ('guru2@educore.com', '$2a$10$0mLV.bGOsHlOcqp8Gkp6k.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'guru');

-- Insert sample profil guru
INSERT INTO guru (id_akun, nama, provinsi_alamat, kota_alamat) VALUES
  (1, 'Ibu Siti', 'DKI Jakarta', 'Jakarta Pusat'),
  (2, 'Pak Budi', 'Jawa Barat', 'Bandung');

-- Insert sample akun siswa (password: Siswa123456)
-- Password di-hash dengan bcrypt: $2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO
INSERT INTO akun (email, password, role) VALUES
  ('siswa1@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa'),
  ('siswa2@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa'),
  ('siswa3@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa');

-- Insert sample profil siswa
INSERT INTO siswa (id_akun, nama, tingkat, ortu_wali, telp_ortu_wali) VALUES
  (3, 'Andi Pratama', 'SD', 'Bapak Ahmad', '081234567890'),
  (4, 'Siti Nurhaliza', 'SD', 'Ibu Nuri', '081234567891'),
  (5, 'Randi Wijaya', 'SMP', 'Bapak Wijay', '081234567892');

-- Insert detail_kelas (siswa masuk ke kelas dan mata pelajaran tertentu)
INSERT INTO detail_kelas (id_siswa, id_matpel, id_kelas, progres) VALUES
  (3, 1, 'K1_SD', 50),
  (3, 2, 'K1_SD', 60),
  (4, 1, 'K1_SD', 40),
  (4, 2, 'K1_SD', 55),
  (5, 1, 'K1_SMP', 70),
  (5, 3, 'K1_SMP', 65);

-- Insert sample materi yang diupload guru
INSERT INTO materi (id_guru, id_matpel, id_kelas, nama, deskripsi, url_media) VALUES
  (1, 1, 'K1_SD', 'Bab 1: Penjumlahan Dasar', 'Pelajaran tentang penjumlahan angka 1-10', '/uploads/materi1.pdf'),
  (1, 1, 'K1_SD', 'Bab 2: Pengurangan Dasar', 'Pelajaran tentang pengurangan angka 1-10', '/uploads/materi2.pdf'),
  (2, 2, 'K1_SD', 'Bab 1: Membaca dan Menulis', 'Materi dasar membaca dan menulis huruf', '/uploads/materi3.pdf');
