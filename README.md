# 🎓 EduCore - Platform Pembelajaran Online

Platform pembelajaran berbasis web untuk guru dan siswa dengan fitur manajemen kelas, materi pembelajaran, dan tracking progress.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [API Documentation](#-api-documentation)
- [Database Setup](#-database-setup)
- [Troubleshooting](#-troubleshooting)

## ✨ Fitur

### Untuk Guru:
- ✅ Manajemen kelas dan mata pelajaran
- ✅ Upload dan distribusi materi pembelajaran
- ✅ Monitoring progress siswa
- ✅ Lihat daftar siswa yang aktif
- ✅ Manajemen profil

### Untuk Siswa:
- ✅ Akses materi pembelajaran per mata pelajaran
- ✅ Tracking progress belajar
- ✅ Tandai materi sebagai selesai
- ✅ Download materi
- ✅ Manajemen profil

## 🛠 Teknologi

### Backend:
- **Node.js** v22.x
- **Express.js** v5.1.0
- **PostgreSQL** v17
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **Multer** - File uploads

### Frontend:
- **React** v19.2.0
- **Vite** v7.2.4
- **React Router** v7.9.6
- **Tailwind CSS** v4.1.17
- **Lucide React** - Icons
- **Axios** v1.13.2

### Database:
- **PostgreSQL** v17

## 📦 Prasyarat

Pastikan sudah terinstall:

1. **Node.js** >= 22.x
   ```bash
   node --version
   ```

2. **PostgreSQL** >= 17
   ```bash
   psql --version
   ```

3. **npm** atau **yarn**
   ```bash
   npm --version
   ```

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/OliviaSILITONGA/EduCore.git
cd EduCore
```

### 2. Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

## ⚙️ Konfigurasi

### 1. Setup Database PostgreSQL

#### a) Buat Database:
```bash
# Login ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE educore;
\q
```

#### b) Jalankan Script Database:
```bash
# Dari root directory EduCore
psql -U postgres -d educore -f setup-database.sql
```

Atau lewat pgAdmin:
1. Buka pgAdmin
2. Klik kanan pada database `educore` → Query Tool
3. Open file `setup-database.sql`
4. Execute (F5)

### 2. Setup Environment Variables

#### Backend `.env`:

Buat file `.env` di folder `backend/`:

```bash
cd backend
cp .env.example .env
```

Edit file `.env`:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_postgresql_password_here
DB_HOST=localhost
DB_NAME=educore
DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=development
```

**⚠️ PENTING:** Ganti `your_postgresql_password_here` dengan password PostgreSQL Anda!

### 3. Verifikasi Database

```bash
# Test koneksi database
cd backend
node test-db.js
```

Jika berhasil, akan muncul:
```
DB OK: { now: 2024-12-05T... }
```

## 🏃 Menjalankan Aplikasi

### Development Mode:

#### 1. Jalankan Backend (Terminal 1):
```bash
cd backend
npm run dev
```

Backend akan berjalan di: `http://localhost:5000`

#### 2. Jalankan Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

### Production Build:

#### Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Struktur Proyek

```
EduCore/
├── backend/
│   ├── src/
│   │   ├── app.js              # Entry point
│   │   ├── config/
│   │   │   └── db.js           # Database connection
│   │   ├── controllers/
│   │   │   └── controller.js   # Request handlers
│   │   ├── middlewares/
│   │   │   └── check-login.js  # Authentication middleware
│   │   ├── routes/
│   │   │   └── router.js       # API routes
│   │   ├── services/
│   │   │   └── service.js      # Business logic
│   │   ├── database/
│   │   │   └── create-database.js  # Database setup
│   │   └── utils/
│   │       └── response.js     # Response helpers
│   ├── uploads/                # Uploaded files
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/
│   │   │   └── api.js          # API calls
│   │   ├── hooks/              # Custom hooks
│   │   └── styles/             # CSS files
│   ├── public/                 # Static assets
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── setup-database.sql          # Database initialization
├── advanced-features.sql       # Triggers & views
├── DATABASE_SETUP.md           # Database setup guide
├── API_DOCUMENTATION.md        # API documentation
└── README.md                   # This file
```

## 📚 API Documentation

Dokumentasi lengkap API tersedia di: [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)

### Base URL:
```
http://localhost:5000/api
```

### Contoh Endpoints:

#### Authentication:
- `POST /api/login-siswa` - Login siswa
- `POST /api/login-guru` - Login guru
- `POST /api/register-siswa` - Register siswa
- `POST /api/register-guru` - Register guru
- `POST /api/logout` - Logout

#### Protected Routes (butuh token):
- `GET /api/profil-siswa` - Get profil siswa
- `GET /api/profil-guru` - Get profil guru
- `GET /api/matpel` - Get semua mata pelajaran
- `POST /api/materi` - Tambah materi (guru)
- `GET /api/materi/:id` - Get detail materi

## 🗄️ Database Setup

### Schema Tabel:

1. **akun** - User accounts (siswa & guru)
2. **sesi** - Session management
3. **siswa** - Student profiles
4. **guru** - Teacher profiles
5. **matpel** - Subjects (Mata Pelajaran)
6. **kelas** - Classes
7. **materi** - Learning materials
8. **pembelajaran** - Student-material relationship
9. **detail_kelas** - Student class enrollment

### Sample Data:

Database sudah include sample data:
- 6 Mata Pelajaran (Matematika, Fisika, Kimia, dll)
- 5 Kelas (10A, 10B, 11A, 11B, 12A)

## 🔧 Troubleshooting

### 1. Backend tidak bisa connect ke database

**Error:** `Database connection failed`

**Solusi:**
```bash
# Cek PostgreSQL running
# Windows:
Get-Service -Name postgresql*

# Pastikan .env sudah benar
# Cek password PostgreSQL
```

### 2. Port 5000 sudah digunakan

**Error:** `EADDRINUSE: address already in use :::5000`

**Solusi:**
```bash
# Windows - Cari process di port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Atau ganti PORT di .env
PORT=5001
```

### 3. Frontend tidak bisa akses backend

**Error:** `Failed to fetch` atau `CORS error`

**Solusi:**
- Pastikan backend running di `http://localhost:5000`
- Cek `API_BASE_URL` di `frontend/src/services/api.js`
- CORS sudah enabled di backend

### 4. Password validation error

**Error:** `Password must be at least 8 characters`

**Solusi:**
- Password minimal 8 karakter
- Harus ada huruf besar
- Harus ada angka
- Harus ada karakter khusus

### 5. Upload file gagal

**Solusi:**
- Cek folder `backend/uploads/` ada dan writable
- Cek file size tidak melebihi limit (default 10MB)

## 👥 Default Accounts

### Test Account (jika sudah register):
- **Email:** test@guru.com
- **Password:** password123
- **Role:** Guru

## 🤝 Contributing

1. Fork repository
2. Buat branch baru (`git checkout -b feature-nama-fitur`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push ke branch (`git push origin feature-nama-fitur`)
5. Buat Pull Request

## 📝 License

This project is for educational purposes.

## 📧 Contact

- **Repository:** https://github.com/OliviaSILITONGA/EduCore
- **Issues:** https://github.com/OliviaSILITONGA/EduCore/issues

## 🔄 Version History

- **v1.0.0** - Initial release
  - Basic authentication
  - Material management
  - Student progress tracking
  
- **v1.1.0** - Bug fixes & improvements
  - Fixed password validation (min 8 chars)
  - Added error logging
  - Improved security

---

**Happy Coding! 🚀**
