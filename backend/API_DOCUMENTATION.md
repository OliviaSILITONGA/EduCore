# 📚 EduCore Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

**Note:** Port 5000 adalah default. Sesuaikan dengan PORT di file `.env` Anda.

---

## 🔐 Authentication

Semua endpoint yang memerlukan autentikasi harus menyertakan token di header:

```
Authorization: Bearer <token>
```

---

## 1️⃣ REGISTRASI & LOGIN

### 1.1 Register Siswa

**Endpoint:** `POST /register-siswa`

**Request Body:**

```json
{
  "email": "siswa@example.com",
  "password": "password123",
  "nama": "Nama Siswa",
  "tingkat": "SMA",
  "ortuWali": "Nama Orang Tua",
  "telpOrtuWali": "081234567890"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Akun dibuat",
  "data": {
    "id": 1,
    "email": "siswa@example.com",
    "role": "siswa"
  }
}
```

---

### 1.2 Register Guru

**Endpoint:** `POST /register-guru`

**Request Body:**

```json
{
  "email": "guru@example.com",
  "password": "password123",
  "nama": "Nama Guru",
  "alamat": "Alamat Lengkap",
  "provinsi": "Jawa Barat",
  "kota": "Bandung"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Akun dibuat",
  "data": {
    "id": 2,
    "email": "guru@example.com",
    "role": "guru"
  }
}
```

---

### 1.3 Login Siswa

**Endpoint:** `POST /login-siswa`

**Request Body:**

```json
{
  "email": "siswa@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Masuk berhasil",
  "data": {
    "token": "abc123xyz789...",
    "user": {
      "id": 1,
      "email": "siswa@example.com",
      "role": "siswa"
    },
    "id_userProfil": 1
  }
}
```

---

### 1.4 Login Guru

**Endpoint:** `POST /login-guru`

**Request Body:**

```json
{
  "email": "guru@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Masuk berhasil",
  "data": {
    "token": "xyz789abc123...",
    "user": {
      "id": 2,
      "email": "guru@example.com",
      "role": "guru"
    },
    "id_userProfil": 1
  }
}
```

---

### 1.5 Logout

**Endpoint:** `POST /logout`  
**Auth Required:** ✅ (Siswa atau Guru)

**Headers:**

```
Authorization: <token>
```

**Request Body:** (Tidak perlu)

**Response (200 OK):**

```json
{
  "status": "success",
  "code": 200,
  "message": "Logout berhasil",
  "data": null
}
```

**Response (401 Unauthorized):**

```json
{
  "status": "error",
  "code": 401,
  "message": "Tidak ada token"
}
```

---

## 2️⃣ MANAJEMEN KELAS (GURU)

### 2.1 Tambah Materi

**Endpoint:** `POST /materi`  
**Auth Required:** ✅ Guru

**Request Body:**

```json
{
  "matpelId": 1,
  "kelasId": "10A",
  "nama": "Pengenalan Python",
  "deskripsi": "Materi dasar pemrograman Python",
  "isi": "Konten materi lengkap...",
  "catatan": "Catatan tambahan untuk siswa",
  "urlMedia": "/uploads/materi/python-intro.pdf"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Materi dibuat",
  "data": {
    "id": 1,
    "id_guru": 1,
    "id_matpel": 1,
    "id_kelas": "10A",
    "nama": "Pengenalan Python",
    "deskripsi": "Materi dasar pemrograman Python",
    "isi": "Konten materi lengkap...",
    "catatan": "Catatan tambahan untuk siswa",
    "url_media": "/uploads/materi/python-intro.pdf",
    "tanggal_pembuatan": "2025-12-05"
  }
}
```

---

### 2.2 Update Materi

**Endpoint:** `PUT /materi/:id`  
**Auth Required:** ✅ Guru

**Request Body:**

```json
{
  "matpelId": 1,
  "kelasId": "10A",
  "nama": "Pengenalan Python (Updated)",
  "deskripsi": "Materi dasar pemrograman Python (revisi)",
  "isi": "Konten materi yang diperbarui...",
  "catatan": "Catatan baru",
  "urlMedia": "/uploads/materi/python-intro-v2.pdf"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Materi disimpan",
  "data": {
    "id": 1,
    "nama": "Pengenalan Python (Updated)",
    ...
  }
}
```

---

### 2.3 Delete Materi

**Endpoint:** `DELETE /materi/:id`  
**Auth Required:** ✅ Guru

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Materi dihapus",
  "data": {
    "id": 1,
    "nama": "Pengenalan Python"
  }
}
```

---

### 2.4 Upload File Materi

**Endpoint:** `POST /uploads/upload`  
**Auth Required:** ✅ (Recommended: Guru only)

**Request (Form-Data):**

```
folderName: "materi-python"
file: [file binary]
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "File diupload",
  "data": {
    "folder": "materi-python",
    "file": "python-intro.pdf"
  }
}
```

---

### 2.5 List Folders

**Endpoint:** `GET /uploads/folders`

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Folders",
  "data": ["materi-python", "materi-matematika", "materi-fisika"]
}
```

---

### 2.6 List Files in Folder

**Endpoint:** `GET /uploads/files/:folder`

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Files",
  "data": ["python-intro.pdf", "python-advanced.pdf"]
}
```

---

### 2.7 Download File

**Endpoint:** `GET /uploads/download/:folder/:file`

**Response:** File download

---

### 2.8 Delete File

**Endpoint:** `DELETE /uploads/delete/:folder/:file`

**Response (200 OK):**

```json
{
  "success": true,
  "message": "File dihapus"
}
```

---

### 2.9 Delete Folder

**Endpoint:** `DELETE /uploads/delete-folder/:folder`

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Folder dihapus"
}
```

---

## 3️⃣ DATA SISWA (GURU)

### 3.1 Lihat Semua Siswa Terdaftar

**Endpoint:** `GET /guru/siswa`  
**Auth Required:** ✅ Guru

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Daftar semua siswa",
  "data": [
    {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "budi@example.com",
      "tingkat": "SMA",
      "nama_sekolah": "SMAN 1 Jakarta",
      "kota_sekolah": "Jakarta",
      "provinsi_sekolah": "DKI Jakarta",
      "tanggal_daftar": "2025-12-01T10:00:00.000Z"
    },
    {
      "id": 2,
      "nama": "Siti Aminah",
      "email": "siti@example.com",
      "tingkat": "SMP",
      "nama_sekolah": "SMPN 5 Bandung",
      "kota_sekolah": "Bandung",
      "provinsi_sekolah": "Jawa Barat",
      "tanggal_daftar": "2025-12-03T14:30:00.000Z"
    }
  ]
}
```

---

### 3.2 Lihat Siswa yang Sedang Login

**Endpoint:** `GET /guru/siswa-login`  
**Auth Required:** ✅ Guru

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Daftar siswa yang sedang login",
  "data": [
    {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "budi@example.com",
      "tingkat": "SMA",
      "sesi_berakhir": "2025-12-12T10:00:00.000Z"
    },
    {
      "id": 2,
      "nama": "Siti Aminah",
      "email": "siti@example.com",
      "tingkat": "SMP",
      "sesi_berakhir": "2025-12-10T14:30:00.000Z"
    }
  ]
}
```

---

### 3.3 Lihat Siswa yang Menyelesaikan Materi

**Endpoint:** `GET /guru/selesai`  
**Auth Required:** ✅ Guru

**Response (200 OK):**

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

## 4️⃣ PROFIL USER

### 4.1 Get Profil Siswa

**Endpoint:** `GET /profil-siswa`  
**Auth Required:** ✅ Siswa

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profil ditemukan",
  "data": {
    "id": 1,
    "id_akun": 1,
    "nama": "Budi Santoso",
    "provinsi_alamat": "DKI Jakarta",
    "kota_alamat": "Jakarta Selatan",
    "alamat": "Jl. Contoh No. 123",
    "tingkat": "SMA",
    "ortu_wali": "Bapak Santoso",
    "telp_ortu_wali": "081234567890"
  }
}
```

---

### 4.2 Update Profil Siswa

**Endpoint:** `PUT /edit-profil-siswa`  
**Auth Required:** ✅ Siswa

**Request Body:**

```json
{
  "nama": "Budi Santoso",
  "provinsiAlamat": "DKI Jakarta",
  "kotaAlamat": "Jakarta Selatan",
  "alamat": "Jl. Contoh No. 123",
  "tingkat": "SMA",
  "ortuWali": "Bapak Santoso",
  "telpOrtuWali": "081234567890",
  "provinsiSekolah": "DKI Jakarta",
  "kotaSekolah": "Jakarta",
  "namaSekolah": "SMAN 1 Jakarta"
}
```

---

### 4.3 Get Profil Guru

**Endpoint:** `GET /profil-guru`  
**Auth Required:** ✅ Guru

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profil ditemukan",
  "data": {
    "id": 1,
    "id_akun": 2,
    "nama": "Ibu Ratna",
    "provinsi_alamat": "Jawa Barat",
    "kota_alamat": "Bandung",
    "alamat": "Jl. Guru No. 45"
  }
}
```

---

### 4.4 Update Profil Guru

**Endpoint:** `PUT /edit-profil-guru`  
**Auth Required:** ✅ Guru

**Request Body:**

```json
{
  "nama": "Ibu Ratna",
  "provinsiAlamat": "Jawa Barat",
  "kotaAlamat": "Bandung",
  "alamat": "Jl. Guru No. 45"
}
```

---

## 5️⃣ MATA PELAJARAN & MATERI

### 5.1 Get Daftar Mata Pelajaran

**Endpoint:** `GET /matpel`  
**Auth Required:** ✅

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Daftar mata pelajaran",
  "data": [
    {
      "id": 1,
      "nama": "Matematika",
      "url_gambar": "/images/matematika.png"
    },
    {
      "id": 2,
      "nama": "Fisika",
      "url_gambar": "/images/fisika.png"
    }
  ]
}
```

---

### 5.2 Get Materi by Subject

**Endpoint:** `GET /materi-siswa/:subject/materi?kelas=10A`  
**Auth Required:** ✅

**Response (200 OK):**

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
      "nama": "Pengenalan Python",
      "deskripsi": "Materi dasar pemrograman Python",
      "isi": "Konten materi...",
      "catatan": "Catatan tambahan",
      "url_media": "/uploads/materi/python-intro.pdf",
      "tanggal_pembuatan": "2025-12-05"
    }
  ]
}
```

---

### 5.3 Get Detail Materi

**Endpoint:** `GET /belajar/:subject/:materiId`  
**Auth Required:** ✅

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Detail materi",
  "data": {
    "id": 1,
    "nama": "Pengenalan Python",
    "deskripsi": "Materi dasar pemrograman Python",
    "isi": "Konten materi lengkap...",
    "catatan": "Catatan tambahan",
    "url_media": "/uploads/materi/python-intro.pdf"
  }
}
```

---

### 5.4 Download Materi

**Endpoint:** `GET /materi/:id/download`  
**Auth Required:** ✅

**Response:** File download

---

## 6️⃣ PEMBELAJARAN SISWA

### 6.1 Tandai Materi Selesai

**Endpoint:** `POST /materi/selesai`  
**Auth Required:** ✅ Siswa

**Request Body:**

```json
{
  "idMateri": 1
}
```

**Response (200 OK):**

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

### 6.2 Cek Status Selesai Materi

**Endpoint:** `GET /materi/:idMateri/selesai`  
**Auth Required:** ✅ Siswa

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Status selesai",
  "data": {
    "selesai": true
  }
}
```

---

## 📝 Error Responses

**401 Unauthorized:**

```json
{
  "success": false,
  "message": "Masuk gagal"
}
```

**403 Forbidden:**

```json
{
  "success": false,
  "message": "Akses ditolak: Hanya guru yang dapat melihat data ini"
}
```

**404 Not Found:**

```json
{
  "success": false,
  "message": "Data tidak ditemukan"
}
```

**500 Internal Server Error:**

```json
{
  "success": false,
  "message": "Terjadi kesalahan server"
}
```

---

## 🚀 Cara Menjalankan Backend

1. **Install Dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Setup Database:**

   - Buat database PostgreSQL bernama `educore`
   - Jalankan script SQL: `educore-new-tables.sql`

3. **Konfigurasi Environment:**

   - Copy `.env.example` menjadi `.env`
   - Sesuaikan konfigurasi database:
     ```env
     DB_USER=postgres
     DB_PASSWORD=your_password
     DB_HOST=localhost
     DB_NAME=educore
     DB_PORT=5432
     ```

4. **Jalankan Server:**
   ```bash
   npm run dev
   ```

Server akan berjalan di `http://localhost:3000`

---

## ✅ Fitur yang Sudah Diimplementasikan

### ✅ Registrasi

- Register Siswa (`POST /api/register-siswa`)
- Register Guru (`POST /api/register-guru`)

### ✅ Login

- Login Siswa (`POST /api/login-siswa`)
- Login Guru (`POST /api/login-guru`)

### ✅ Manajemen Kelas (Guru)

- Tambah Materi (`POST /api/materi`)
- Update Materi (`PUT /api/materi/:id`)
- Delete Materi (`DELETE /api/materi/:id`)
- Upload File Materi (`POST /api/uploads/upload`)
- Data materi tersimpan di database (tabel `materi`)

### ✅ Data Siswa (Guru)

- Lihat semua siswa terdaftar (`GET /api/guru/siswa`)
- Lihat siswa yang sedang login (`GET /api/guru/siswa-login`)
- Lihat siswa yang menyelesaikan materi (`GET /api/guru/selesai`)

---

## 🔧 Testing dengan Postman/Thunder Client

### Test Login Guru:

```bash
POST http://localhost:3000/api/login-guru
Content-Type: application/json

{
  "email": "guru@example.com",
  "password": "password123"
}
```

### Test Lihat Daftar Siswa (dengan token):

```bash
GET http://localhost:3000/api/guru/siswa
Authorization: Bearer <token_from_login>
```

---

## 📊 Database Schema

Tabel yang digunakan:

- `akun` - Data akun user (email, password, role)
- `sesi` - Token login
- `siswa` - Profil siswa
- `guru` - Profil guru
- `matpel` - Mata pelajaran
- `kelas` - Data kelas
- `materi` - Data materi yang diupload guru
- `pembelajaran` - Progress siswa (materi selesai)
- `detail_kelas` - Relasi siswa-kelas-mapel

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan hubungi tim developer EduCore.
