# DCS Rent Car Mobile (Web App to Play Store)

Aplikasi Web Mobile-First untuk bisnis rental mobil harian di Jabodetabek (DCS Rent Car). Didesain khusus untuk di-deploy ke **Vercel** dan dibungkus menjadi **Aplikasi Google Play Store (TWA / Capacitor)**.

---

## 🌟 Fitur Utama (Bukan Sekadar Etalase)

1. **3 Paket Layanan Utama**:
   - 🔑 **Lepas Kunci (Self-Drive)**: Hitungan sewa per 24 jam bebas kemana saja, tarif mulai Rp 280.000/hari.
   - 👨‍✈️ **Dengan Sopir**: Sopir ramah & hafal jalanan Jabodetabek, standby 12 jam/hari.
   - ✨ **Paket All-In**: Paket bebas repot (Mobil + Sopir + BBM Jabodetabek + Tol/Parkir).

2. **Kalkulator Biaya Sewa Cerdas (Cost Estimator & WhatsApp Pre-filler)**:
   - Pilih mobil, durasi sewa (harian / mingguan), tanggal & jam penjemputan.
   - Pilihan metode: Antar ke Lokasi (se-Jabodetabek) atau Ambil di Pool Cinere (Gratis).
   - Menghitung total estimasi biaya otomatis.
   - **One-Click WhatsApp Booking**: Men-generate format pemesanan rapi yang langsung terisi ke WhatsApp CS tanpa admin perlu tanya-tanya ulang!

3. **Self-Verification Checklist (Cek Kelayakan Berkas)**:
   - Calon penyewa bisa mengecek kesiapan dokumen (e-KTP, SIM A, ID Kerja/Medsos, Deposit).
   - Indikator kesiapan berkas & tombol kirim status kelayakan langsung ke WA CS.

4. **Kunjungan Pool / Ambil di Tempat (O2O)**:
   - Terintegrasi langsung dengan link rute **Google Maps** ke pool pusat DCS di Cinere, Depok.
   - Informasi jam operasional 24 jam untuk transaksi atau cek unit fisik di tempat.

5. **Hotline & Bantuan Darurat 24 Jam (Roadside Support)**:
   - Fitur retensi untuk penyewa aktif yang membutuhkan bantuan mekanik, ban bocor, atau kendala darurat di jalan.

6. **Coverage Jabodetabek**:
   - Pemilihan area coverage: Jakarta Selatan, Timur, Pusat, Barat, Utara, Depok/Cinere, Tangsel/BSD, Bekasi, Bogor, serta Bandara Soetta & Halim.

---

## 🚀 Cara Deploy ke Vercel

### Opsi A: Lewat Vercel CLI (Super Cepat)
1. Buka terminal di folder `Mobile`:
   ```bash
   cd Mobile
   npx vercel
   ```
2. Ikuti instruksi di layar (Link to existing project: No, Project Name: `dcs-rent-car-mobile`).
3. Selesai! Web app langsung live di domain `https://dcs-rent-car-mobile.vercel.app`.

### Opsi B: Lewat GitHub / Vercel Dashboard
1. Push folder ini ke repository GitHub.
2. Buka dashboard [Vercel](https://vercel.com) -> **Add New Project**.
3. Pilih repository tersebut, tentukan Root Directory: `Mobile`.
4. Framework Preset: **Vite**, lalu klik **Deploy**.

---

## 📱 Cara Memasukkan ke Google Play Store

Karena aplikasi ini dibuat 100% Mobile-First dengan Manifest PWA, cara paling optimal dan rekomendasi Google adalah menggunakan **TWA (Trusted Web Activity)**:

### Langkah TWA (Menggunakan Bubblewrap CLI resmi dari Google):
1. Pastikan web app sudah live di domain Vercel (misal: `https://dcs-rent-car.vercel.app`).
2. Install Bubblewrap di terminal:
   ```bash
   npm i -g @bubblewrap/cli
   ```
3. Inisialisasi dari URL Vercel Anda:
   ```bash
   bubblewrap init --manifest="https://dcs-rent-car.vercel.app/manifest.json"
   ```
4. Build file `.aab` (Android App Bundle):
   ```bash
   bubblewrap build
   ```
5. File `.aab` yang dihasilkan siap langsung di-upload ke Google Play Console!
6. **Kelebihan utama**: Setiap kali Anda update harga atau armada di web Vercel, **aplikasi di HP pengguna Play Store langsung otomatis ter-update** tanpa perlu upload ulang ke Play Store!
