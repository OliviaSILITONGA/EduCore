-- Insert sample mata pelajaran (with conflict handling)
INSERT INTO matpel (nama, url_gambar) VALUES
  ('Matematika', '/assets/images/matematika.png'),
  ('Bahasa Indonesia', '/assets/images/bahasa-indo.png'),
  ('Bahasa Inggris', '/assets/images/bahasa-eng.png'),
  ('IPA', '/assets/images/ipa.png'),
  ('IPS', '/assets/images/ips.png')
ON CONFLICT DO NOTHING;

-- Insert sample kelas (with conflict handling)
INSERT INTO kelas (id, nama, no_kelas, tingkat) VALUES
  ('K1_SD', 'Kelas 1', 1, 'SD'),
  ('K2_SD', 'Kelas 2', 2, 'SD'),
  ('K3_SD', 'Kelas 3', 3, 'SD'),
  ('K1_SMP', 'Kelas 1', 1, 'SMP'),
  ('K2_SMP', 'Kelas 2', 2, 'SMP'),
  ('K3_SMP', 'Kelas 3', 3, 'SMP')
ON CONFLICT DO NOTHING;

-- Check if guru already exists, if not insert
INSERT INTO akun (email, password, role) VALUES
  ('guru1@educore.com', '$2a$10$0mLV.bGOsHlOcqp8Gkp6k.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'guru'),
  ('guru2@educore.com', '$2a$10$0mLV.bGOsHlOcqp8Gkp6k.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'guru')
ON CONFLICT (email) DO NOTHING;

-- Insert sample profil guru
INSERT INTO guru (id_akun, nama, provinsi_alamat, kota_alamat)
SELECT 1, 'Ibu Siti', 'DKI Jakarta', 'Jakarta Pusat'
WHERE NOT EXISTS (SELECT 1 FROM guru WHERE id_akun = 1);

INSERT INTO guru (id_akun, nama, provinsi_alamat, kota_alamat)
SELECT 2, 'Pak Budi', 'Jawa Barat', 'Bandung'
WHERE NOT EXISTS (SELECT 1 FROM guru WHERE id_akun = 2);

-- Insert sample akun siswa
INSERT INTO akun (email, password, role) VALUES
  ('siswa1@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa'),
  ('siswa2@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa'),
  ('siswa3@educore.com', '$2a$10$YVjvz0z.K6c9jj6lZ6z6l.Oa4L2y6rj1cJmJhz.vZZeJxK4K8ZCZO', 'siswa')
ON CONFLICT (email) DO NOTHING;

-- Insert sample profil siswa
INSERT INTO siswa (id_akun, nama, tingkat, ortu_wali, telp_ortu_wali)
SELECT 3, 'Andi Pratama', 'SD', 'Bapak Ahmad', '081234567890'
WHERE NOT EXISTS (SELECT 1 FROM siswa WHERE id_akun = 3);

INSERT INTO siswa (id_akun, nama, tingkat, ortu_wali, telp_ortu_wali)
SELECT 4, 'Siti Nurhaliza', 'SD', 'Ibu Nuri', '081234567891'
WHERE NOT EXISTS (SELECT 1 FROM siswa WHERE id_akun = 4);

INSERT INTO siswa (id_akun, nama, tingkat, ortu_wali, telp_ortu_wali)
SELECT 5, 'Randi Wijaya', 'SMP', 'Bapak Wijay', '081234567892'
WHERE NOT EXISTS (SELECT 1 FROM siswa WHERE id_akun = 5);

-- Insert detail_kelas
INSERT INTO detail_kelas (id_siswa, id_matpel, id_kelas, progres) VALUES
  (1, 1, 'K1_SD', 50),
  (1, 2, 'K1_SD', 60),
  (2, 1, 'K1_SD', 40),
  (2, 2, 'K1_SD', 55),
  (3, 1, 'K1_SMP', 70),
  (3, 3, 'K1_SMP', 65)
ON CONFLICT DO NOTHING;

-- Insert sample materi
INSERT INTO materi (id_guru, id_matpel, id_kelas, nama, deskripsi, url_media) VALUES
  (1, 1, 'K1_SD', 'Bab 1: Penjumlahan Dasar', 'Pelajaran tentang penjumlahan angka 1-10', '/uploads/materi1.pdf'),
  (1, 1, 'K1_SD', 'Bab 2: Pengurangan Dasar', 'Pelajaran tentang pengurangan angka 1-10', '/uploads/materi2.pdf'),
  (2, 2, 'K1_SD', 'Bab 1: Membaca dan Menulis', 'Materi dasar membaca dan menulis huruf', '/uploads/materi3.pdf')
ON CONFLICT DO NOTHING;
