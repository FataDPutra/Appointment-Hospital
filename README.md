# Panduan Instalasi Appointment System Rumah Sakit

## Pendahuluan

Sistem penjadwalan janji atau **Appointment System** adalah mekanisme yang dirancang untuk mengelola pengalokasian sumber daya secara efisien, seperti tenaga kerja atau waktu layanan, dalam berbagai konteks, terutama dalam layanan kesehatan. Sistem ini bertujuan untuk:

-   Meminimalkan waktu tunggu pasien.
-   Mengoptimalkan jadwal penyedia layanan.
-   Meningkatkan kepuasan pengguna layanan kesehatan.

Aplikasi **Appointment System Rumah Sakit** menyediakan fitur lengkap untuk mengatur jadwal janji temu pasien, memilih poli berdasarkan keluhan, memilih dokter berdasarkan jadwal yang tersedia, dan mendapatkan nomor antrean secara otomatis.

---

## Prasyarat

Pastikan perangkat Anda telah terpasang aplikasi berikut:

1. **PHP** (>= 8.2)
2. **Composer** (versi terbaru)
3. **Node.js** (>= 20.x) dan **npm** atau **yarn**
4. **PostgreSQL** atau basis data lain yang didukung
5. **Git**
6. **Laravel CLI**

---

## Langkah Instalasi

### 1. Kloning Repository

Kloning repository dari platform kontrol versi (contoh: GitHub):

```bash
git clone https://github.com/FataDPutra/Appointment-Hospital.git
```

Masuk ke direktori proyek:

```bash
cd sistem_jadwal_rumahsakit
```

---

### 2. Atur Variabel Lingkungan

Salin file `.env.example` untuk membuat file `.env` baru:

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi lokal Anda. Perbarui bagian berikut:

-   **Konfigurasi Database:**

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=rumahsakit
DB_USERNAME=root
DB_PASSWORD=your_password
```

---

### 3. Instalasi Dependensi

Instal dependensi PHP:

```bash
composer install
```

Instal dependensi JavaScript:

```bash
npm install
```

Atau, jika Anda menggunakan yarn:

```bash
yarn install
```

---

### 4. Generate Application Key

Generate kunci aplikasi untuk Laravel:

```bash
php artisan key:generate
```

---

### 5. Migrasi dan Seeder Database

Jalankan migrasi untuk membuat tabel di database:

```bash
php artisan migrate
```

Isi database dengan data awal:

```bash
php artisan db:seed --class=UserSeeder
```

Setelah menjalankan seeder, akun berikut akan tersedia:

-   **Admin:**

    -   Email: admin@email.com
    -   Password: password

-   **Dokter:**
    -   Email: dokter@email.com
    -   Password: password

---

### 6. Kompilasi Aset Frontend

Kompilasi aset frontend dengan salah satu perintah berikut:

Untuk pengembangan:

```bash
npm run dev
```

Untuk produksi:

```bash
npm run build
```

---

### 7. Jalankan Aplikasi

Jalankan aplikasi menggunakan server pengembangan Laravel:

```bash
php artisan serve
```

Secara default, aplikasi dapat diakses di [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Anda Sudah Siap!

Aplikasi **Appointment System Rumah Sakit** kini siap digunakan. Jika Anda mengalami kendala, silakan hubungi tim pengembang atau merujuk pada dokumentasi.
