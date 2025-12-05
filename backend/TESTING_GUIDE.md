# 🧪 Testing Guide - EduCore Backend API

## Prerequisites

- Backend server berjalan di `http://localhost:3000`
- Database PostgreSQL sudah di-setup dengan `educore-new-tables.sql`
- Gunakan Postman, Thunder Client, atau cURL untuk testing

---

## 📋 Test Scenario

### Step 1: Register Akun Guru

**Request:**

```http
POST http://localhost:3000/api/register-guru
Content-Type: application/json

{
  "email": "guru1@educore.com",
  "password": "password123",
  "nama": "Ibu Ratna Sari",
  "alamat": "Jl. Pendidikan No. 45",
  "provinsi": "Jawa Barat",
  "kota": "Bandung"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Akun dibuat",
  "data": {
    "id": 1,
    "email": "guru1@educore.com",
    "role": "guru"
  }
}
```

---

### Step 2: Register Akun Siswa

**Request:**

```http
POST http://localhost:3000/api/register-siswa
Content-Type: application/json

{
  "email": "siswa1@educore.com",
  "password": "password123",
  "nama": "Budi Santoso",
  "tingkat": "SMA",
  "ortuWali": "Bapak Santoso",
  "telpOrtuWali": "081234567890"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Akun dibuat",
  "data": {
    "id": 2,
    "email": "siswa1@educore.com",
    "role": "siswa"
  }
}
```

**Register Siswa Kedua:**

```http
POST http://localhost:3000/api/register-siswa
Content-Type: application/json

{
  "email": "siswa2@educore.com",
  "password": "password123",
  "nama": "Siti Aminah",
  "tingkat": "SMP",
  "ortuWali": "Ibu Aminah",
  "telpOrtuWali": "082345678901"
}
```

---

### Step 3: Login sebagai Guru

**Request:**

```http
POST http://localhost:3000/api/login-guru
Content-Type: application/json

{
  "email": "guru1@educore.com",
  "password": "password123"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Masuk berhasil",
  "data": {
    "token": "abc123xyz789defghijklmnop...",
    "user": {
      "id": 1,
      "email": "guru1@educore.com",
      "role": "guru"
    },
    "id_userProfil": 1
  }
}
```

**⚠️ PENTING: Simpan `token` untuk request selanjutnya!**

---

### Step 4: Login sebagai Siswa

**Request:**

```http
POST http://localhost:3000/api/login-siswa
Content-Type: application/json

{
  "email": "siswa1@educore.com",
  "password": "password123"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Masuk berhasil",
  "data": {
    "token": "xyz789abc123...",
    "user": {
      "id": 2,
      "email": "siswa1@educore.com",
      "role": "siswa"
    },
    "id_userProfil": 1
  }
}
```

---

### Step 5: Guru Melihat Daftar Siswa Terdaftar

**Request:**

```http
GET http://localhost:3000/api/guru/siswa
Authorization: Bearer <GURU_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Daftar semua siswa",
  "data": [
    {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "siswa1@educore.com",
      "tingkat": "SMA",
      "nama_sekolah": null,
      "kota_sekolah": null,
      "provinsi_sekolah": null,
      "tanggal_daftar": "2025-12-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "nama": "Siti Aminah",
      "email": "siswa2@educore.com",
      "tingkat": "SMP",
      "nama_sekolah": null,
      "kota_sekolah": null,
      "provinsi_sekolah": null,
      "tanggal_daftar": "2025-12-05T10:35:00.000Z"
    }
  ]
}
```

---

### Step 6: Guru Melihat Siswa yang Sedang Login

**Request:**

```http
GET http://localhost:3000/api/guru/siswa-login
Authorization: Bearer <GURU_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Daftar siswa yang sedang login",
  "data": [
    {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "siswa1@educore.com",
      "tingkat": "SMA",
      "sesi_berakhir": "2025-12-12T10:40:00.000Z"
    }
  ]
}
```

---

### Step 7: Guru Menambahkan Materi

**Prasyarat:** Harus ada data di tabel `matpel` dan `kelas`. Jika belum ada, insert manual:

```sql
-- Insert mata pelajaran
INSERT INTO matpel (nama, url_gambar) VALUES
('Matematika', '/images/matematika.png'),
('Fisika', '/images/fisika.png'),
('Kimia', '/images/kimia.png');

-- Insert kelas
INSERT INTO kelas (id, nama, no_kelas, tingkat) VALUES
('10A', 'Kelas 10 A', 10, 'SMA'),
('10B', 'Kelas 10 B', 10, 'SMA'),
('11A', 'Kelas 11 A', 11, 'SMA');
```

**Request:**

```http
POST http://localhost:3000/api/materi
Authorization: Bearer <GURU_TOKEN>
Content-Type: application/json

{
  "matpelId": 1,
  "kelasId": "10A",
  "nama": "Pengenalan Aljabar",
  "deskripsi": "Materi pengenalan aljabar untuk kelas 10",
  "isi": "Aljabar adalah cabang matematika yang mempelajari struktur, relasi, dan kuantitas...",
  "catatan": "Pelajari dengan baik dan kerjakan latihan di buku halaman 45-50",
  "urlMedia": "/uploads/matematika/aljabar-intro.pdf"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Materi dibuat",
  "data": {
    "id": 1,
    "id_guru": 1,
    "id_matpel": 1,
    "id_kelas": "10A",
    "nama": "Pengenalan Aljabar",
    "deskripsi": "Materi pengenalan aljabar untuk kelas 10",
    "isi": "Aljabar adalah cabang matematika...",
    "catatan": "Pelajari dengan baik...",
    "url_media": "/uploads/matematika/aljabar-intro.pdf",
    "tanggal_pembuatan": "2025-12-05"
  }
}
```

---

### Step 8: Guru Upload File Materi

**Request (Form-Data):**

```http
POST http://localhost:3000/api/uploads/upload
Authorization: Bearer <GURU_TOKEN>
Content-Type: multipart/form-data

folderName: matematika
file: [Select File: aljabar-intro.pdf]
```

**Expected Response:**

```json
{
  "success": true,
  "message": "File diupload",
  "data": {
    "folder": "matematika",
    "file": "aljabar-intro.pdf"
  }
}
```

---

### Step 9: Guru Update Materi

**Request:**

```http
PUT http://localhost:3000/api/materi/1
Authorization: Bearer <GURU_TOKEN>
Content-Type: application/json

{
  "matpelId": 1,
  "kelasId": "10A",
  "nama": "Pengenalan Aljabar (Revisi)",
  "deskripsi": "Materi pengenalan aljabar untuk kelas 10 (Updated)",
  "isi": "Aljabar adalah cabang matematika... (konten diperbarui)",
  "catatan": "Catatan tambahan: ada quiz minggu depan",
  "urlMedia": "/uploads/matematika/aljabar-intro-v2.pdf"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Materi disimpan",
  "data": {
    "id": 1,
    "nama": "Pengenalan Aljabar (Revisi)",
    ...
  }
}
```

---

### Step 10: Siswa Melihat Daftar Materi

**Request:**

```http
GET http://localhost:3000/api/materi-siswa/matematika/materi?kelas=10A
Authorization: Bearer <SISWA_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Materi",
  "data": [
    {
      "id": 1,
      "id_guru": 1,
      "id_matpel": 1,
      "id_kelas": "10A",
      "nama": "Pengenalan Aljabar (Revisi)",
      "deskripsi": "Materi pengenalan aljabar untuk kelas 10 (Updated)",
      "tanggal_pembuatan": "2025-12-05"
    }
  ]
}
```

---

### Step 11: Siswa Melihat Detail Materi

**Request:**

```http
GET http://localhost:3000/api/belajar/matematika/1
Authorization: Bearer <SISWA_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Detail materi",
  "data": {
    "id": 1,
    "id_guru": 1,
    "id_matpel": 1,
    "id_kelas": "10A",
    "nama": "Pengenalan Aljabar (Revisi)",
    "deskripsi": "Materi pengenalan aljabar untuk kelas 10 (Updated)",
    "isi": "Aljabar adalah cabang matematika...",
    "catatan": "Catatan tambahan: ada quiz minggu depan",
    "url_media": "/uploads/matematika/aljabar-intro-v2.pdf",
    "tanggal_pembuatan": "2025-12-05"
  }
}
```

---

### Step 12: Siswa Tandai Materi Selesai

**Request:**

```http
POST http://localhost:3000/api/materi/selesai
Authorization: Bearer <SISWA_TOKEN>
Content-Type: application/json

{
  "idMateri": 1
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Status belajar disimpan",
  "data": {
    "id": 1,
    "id_siswa": 1,
    "id_materi": 1,
    "selesai": true
  }
}
```

---

### Step 13: Guru Melihat Siswa yang Selesai Belajar

**Request:**

```http
GET http://localhost:3000/api/guru/selesai
Authorization: Bearer <GURU_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Siswa selesai",
  "data": [
    {
      "pembelajaran_id": 1,
      "id_siswa": 1,
      "nama_siswa": "Budi Santoso",
      "nama_matpel": "Matematika",
      "kelas": "10A"
    }
  ]
}
```

---

### Step 14: Guru Delete Materi

**Request:**

```http
DELETE http://localhost:3000/api/materi/1
Authorization: Bearer <GURU_TOKEN>
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Materi dihapus",
  "data": {
    "id": 1,
    "nama": "Pengenalan Aljabar (Revisi)"
  }
}
```

---

## 🧪 Testing Checklist

### ✅ Registrasi & Login

- [ ] Register Guru berhasil
- [ ] Register Siswa berhasil
- [ ] Login Guru berhasil dan dapat token
- [ ] Login Siswa berhasil dan dapat token
- [ ] Login dengan email salah = error 401
- [ ] Login dengan password salah = error 401

### ✅ Manajemen Kelas (Guru)

- [ ] Guru dapat menambah materi
- [ ] Guru dapat update materi
- [ ] Guru dapat delete materi
- [ ] Guru dapat upload file
- [ ] Data materi tersimpan di database (cek tabel `materi`)
- [ ] File upload tersimpan di folder `backend/uploads/`

### ✅ Data Siswa (Guru)

- [ ] Guru dapat melihat semua siswa terdaftar
- [ ] Guru dapat melihat siswa yang sedang login (sesi aktif)
- [ ] Guru dapat melihat siswa yang menyelesaikan materi
- [ ] Siswa tidak bisa akses endpoint guru (error 403)

### ✅ Pembelajaran Siswa

- [ ] Siswa dapat melihat daftar materi
- [ ] Siswa dapat melihat detail materi
- [ ] Siswa dapat tandai materi selesai
- [ ] Siswa dapat download file materi

---

## 🔧 Troubleshooting

### Error: "Failed to start backend (bootstrap error)"

- Pastikan PostgreSQL berjalan
- Cek konfigurasi `.env` (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT)
- Jalankan script SQL: `educore-new-tables.sql`

### Error: "Akses ditolak: Hanya guru yang dapat melihat data ini"

- Pastikan menggunakan token dari login guru
- Token mungkin kadaluarsa, coba login ulang

### Error: "Token tidak valid"

- Pastikan mengirim header: `Authorization: Bearer <token>`
- Token mungkin salah atau kadaluarsa

### Error: "Missing required fields"

- Cek semua field required sudah diisi
- Pastikan format JSON benar

---

## 📊 Database Check

Setelah testing, cek data di database:

```sql
-- Cek akun yang terdaftar
SELECT * FROM akun;

-- Cek profil siswa
SELECT * FROM siswa;

-- Cek profil guru
SELECT * FROM guru;

-- Cek materi yang dibuat
SELECT * FROM materi;

-- Cek pembelajaran siswa
SELECT * FROM pembelajaran;

-- Cek sesi login aktif
SELECT * FROM sesi WHERE waktu_berakhir > NOW();
```

---

## ✅ Expected Results

Setelah menjalankan semua test scenario:

1. ✅ Ada 1 akun guru dan 2 akun siswa terdaftar
2. ✅ Guru berhasil upload materi dan data tersimpan di tabel `materi`
3. ✅ Guru dapat melihat daftar siswa yang terdaftar
4. ✅ Guru dapat melihat siswa yang sedang login
5. ✅ Siswa dapat melihat dan belajar materi
6. ✅ Siswa dapat tandai materi selesai
7. ✅ Guru dapat melihat siswa yang menyelesaikan materi

---

## 🚀 Next Steps

1. ✅ Test semua endpoint dengan data berbeda
2. ✅ Test error handling (invalid token, missing fields, dll)
3. ✅ Test file upload dengan berbagai format file
4. ✅ Verifikasi data di database setelah setiap operasi
5. ✅ Test concurrent users (multiple siswa login bersamaan)

Selamat testing! 🎉
