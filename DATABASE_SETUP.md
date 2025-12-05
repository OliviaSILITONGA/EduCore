# 🗄️ Setup Database PostgreSQL - EduCore

## Langkah 1: Buka pgAdmin

1. Buka **pgAdmin 4** di laptop Anda
2. Login dengan password PostgreSQL Anda

## Langkah 2: Buat Database Baru

1. Di sidebar kiri, klik kanan pada **Databases**
2. Pilih **Create** → **Database...**
3. Di tab **General**:
   - **Database name**: `educore`
   - **Owner**: postgres
4. Klik **Save**

## Langkah 3: Jalankan SQL Script

### Cara 1: Lewat pgAdmin (Recommended)

1. Klik kanan pada database **educore** yang baru dibuat
2. Pilih **Query Tool**
3. Buka file: `D:\EDUCOREEE\minggu4\EduCore\setup-database.sql`
4. Copy semua isi file tersebut
5. Paste ke Query Tool
6. Klik tombol **Execute** (⚡ icon) atau tekan **F5**
7. Tunggu sampai muncul "Database setup completed successfully!"

### Cara 2: Lewat Command Line

```bash
# Buka PowerShell dan jalankan:
cd "C:\Program Files\PostgreSQL\17\bin"
.\psql -U postgres -d educore -f "D:\EDUCOREEE\minggu4\EduCore\setup-database.sql"
```

## Langkah 4: Verifikasi Database

Di pgAdmin Query Tool, jalankan:

```sql
-- Cek semua tabel sudah dibuat
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Cek data sample
SELECT * FROM matpel;
SELECT * FROM kelas;
```

Seharusnya muncul 9 tabel:
- akun
- sesi
- siswa
- guru
- matpel (ada 5 data)
- kelas (ada 5 data)
- materi
- pembelajaran
- detail_kelas

## Langkah 5: Update Password di .env

1. Buka file `.env`:
   ```bash
   notepad D:\EDUCOREEE\minggu4\EduCore\backend\.env
   ```

2. Ganti `DB_PASSWORD` dengan password PostgreSQL Anda:
   ```env
   DB_USER=postgres
   DB_PASSWORD=password_postgres_anda
   DB_HOST=localhost
   DB_NAME=educore
   DB_PORT=5432
   PORT=5000
   ```

3. Save (Ctrl+S)

## Langkah 6: Restart Backend

```bash
# Di terminal backend, ketik:
rs

# Atau restart manual:
# Ctrl+C untuk stop, lalu:
npm run dev
```

## ✅ Selesai!

Jika berhasil, di terminal backend akan muncul:

```
✅ Database tables and indexes created successfully
✅ API routes loaded successfully

🚀 Backend berjalan di port 5000
📡 API Base URL: http://localhost:5000/api
📁 Uploads URL: http://localhost:5000/uploads
```

## 🔍 Troubleshooting

### Error: "database educore does not exist"
- Pastikan sudah membuat database `educore` di pgAdmin

### Error: "password authentication failed"
- Cek password di file `.env` sudah benar
- Password ini adalah password PostgreSQL Anda, bukan password database

### Error: "role user_role already exists"
- Database sudah pernah di-setup sebelumnya
- Aman untuk dijalankan ulang (script sudah ada DROP TABLE)

## 📌 Catatan Penting

- Password PostgreSQL biasanya diset saat pertama install PostgreSQL
- Jika lupa password, bisa reset lewat pgAdmin
- Database `educore` harus dibuat dulu sebelum jalankan script SQL
- File `setup-database.sql` sudah include sample data untuk testing

---

**Setelah selesai setup, ketik "sudah" dan saya akan test koneksi backend ke database!**
