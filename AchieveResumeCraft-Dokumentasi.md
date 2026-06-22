# ⚡ AchieveResumeCraft — Dokumentasi

> **Gamer CV Builder** · Versi 1.0.0  
> Dibuat oleh: Omon (noobiiefun) · Platform: Browser-based, Lokal (Tanpa Server)  
> Teknologi: HTML5, CSS3, JavaScript (Vanilla)

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Struktur File & Arsitektur](#2-struktur-file--arsitektur)
3. [Fitur Lengkap](#3-fitur-lengkap)
4. [Panduan Penggunaan](#4-panduan-penggunaan)
5. [Struktur Data (State)](#5-struktur-data-state)
6. [Komponen UI](#6-komponen-ui)
7. [Template CV](#7-template-cv)
8. [Roadmap Pengembangan](#8-roadmap-pengembangan)
9. [Troubleshooting](#9-troubleshooting)
10. [Referensi Teknis](#10-referensi-teknis)

---

## 1. Pendahuluan

AchieveResumeCraft adalah aplikasi web berbasis browser untuk membuat CV (Curriculum Vitae) prestasi gaming. Berbeda dari CV kerja konvensional, aplikasi ini dirancang khusus untuk mendokumentasikan perjalanan dan pencapaian seorang gamer — mulai dari game yang dimainkan, statistik, rank, hingga riwayat turnamen.

Aplikasi berjalan sepenuhnya di browser tanpa memerlukan server, instalasi, atau koneksi internet. Semua data tersimpan lokal di browser pengguna via `localStorage`.

### 1.1 Tujuan Aplikasi

- Menyediakan CV formal untuk gamer yang ingin mendokumentasikan prestasi mereka
- Menggantikan catatan manual dengan format yang terstruktur dan bisa dicetak
- Mempermudah pendaftaran ke turnamen atau komunitas gaming yang membutuhkan rekam jejak
- Menjadi portofolio digital prestasi gaming yang bisa di-print ke PDF

### 1.2 Target Pengguna

- Gamer kompetitif yang aktif mengikuti turnamen
- Streamer yang ingin mendokumentasikan pencapaian
- Anggota tim esports yang butuh profil resmi
- Gamer kasual yang ingin menyimpan perjalanan gaming mereka

---

## 2. Struktur File & Arsitektur

### 2.1 Struktur Direktori

```
achieveresumecraft/
├── index.html          ← Entry point utama aplikasi
├── css/
│   └── style.css       ← Semua styling (dark/light, animasi, print)
└── js/
    └── app.js          ← Seluruh logika aplikasi (state, event, render)
```

| File | Fungsi |
|---|---|
| `index.html` | Struktur HTML seluruh halaman: nav, sidebar, 6 form section, preview panel, print area |
| `css/style.css` | Design tokens, tema dark/light, komponen UI, layout, animasi, dan style CV print |
| `js/app.js` | State management, event listener, render fungsi per-section, drag & drop, autosave, localStorage |

### 2.2 Arsitektur Aplikasi

Aplikasi menggunakan arsitektur **Vanilla SPA (Single Page Application)** tanpa framework:

- **State Management** — satu objek `state` global yang menyimpan semua data
- **Rendering** — fungsi `render*()` per-section yang membangun DOM dari state
- **Persistensi** — autosave ke `localStorage` setiap kali data berubah
- **Print** — build HTML CV dari state, inject ke div tersembunyi, trigger `window.print()`

---

## 3. Fitur Lengkap

| Fitur | Status | Keterangan |
|---|---|---|
| Dark / Light Mode Toggle | ✅ Ada | Default dark, toggle di kanan atas, tersimpan di localStorage |
| Form Identitas Gamer | ✅ Ada | Nama, gamertag, platform, lokasi, role, bio, sosial media, avatar upload |
| Daftar Game Dimainkan | ✅ Ada | Nama, genre, platform, jam bermain, status aktif, tahun mulai |
| Statistik & Rank | ✅ Ada | Rank tertinggi, season, win rate, K/D ratio, stat unggulan per game |
| Achievement & Prestasi | ✅ Ada | Judul, game, tanggal, level (personal/lokal/nasional/internasional), deskripsi |
| Riwayat Turnamen | ✅ Ada | Nama, game, hasil, skala, tanggal, tim, peran, hadiah |
| Upload Screenshot | ✅ Ada | Drag & drop atau pilih file, multi-upload, caption per screenshot |
| Step-by-step Wizard | ✅ Ada | Navigasi 6 section berurutan dengan tombol Lanjut / Kembali |
| Drag & Drop Reorder | ✅ Ada | Kartu item bisa diurutkan ulang dengan drag pada semua section list |
| 3 Template CV | ✅ Ada | Classic (gold), Cyber (teal), Minimal (hitam putih bersih) |
| Preview Panel | ✅ Ada | Slide dari kanan, render CV real-time sesuai template dipilih |
| Print ke PDF | ✅ Ada | Render CV ke area print tersembunyi, trigger `window.print()` |
| Autosave | ✅ Ada | Semua data tersimpan otomatis di localStorage setiap perubahan |
| Load Data Tersimpan | ✅ Ada | Restore state lengkap saat halaman dibuka ulang |
| Toast Notifikasi | ✅ Ada | Konfirmasi aksi (tambah, hapus, load data) via toast pop-up |
| Step Indicator | ✅ Ada | Titik di sidebar berubah warna saat section sudah diisi |

---

## 4. Panduan Penggunaan

### 4.1 Cara Menjalankan

> 💡 Tidak perlu instalasi apapun. Cukup buka `index.html` di browser modern (Chrome, Firefox, Edge, Safari).

1. Download semua file dan pertahankan struktur folder (`css/` dan `js/` harus satu folder dengan `index.html`)
2. Buka file `index.html` langsung di browser (double-click atau drag ke browser)
3. Aplikasi siap digunakan — tidak perlu koneksi internet atau server lokal

### 4.2 Mengisi Section

#### Section 1 — Identitas Gamer

- Klik tombol **"Pilih Gambar"** untuk upload foto profil atau avatar gaming
- Isi **Nama Asli** dan **Gamertag** (field wajib untuk CV)
- **Platform Utama**: pilih dari dropdown (PC Steam, Mobile, PlayStation, dll.)
- Isi field opsional: Lokasi, Tahun Mulai Gaming, Role/Spesialisasi
- **Bio Singkat**: ceritakan perjalanan gaming dalam 2–3 kalimat
- Sosial media: Discord dan link streaming (Twitch/YouTube/TikTok)

#### Section 2 — Game yang Dimainkan

- Isi form di atas, lalu klik **"+ Tambah Game"**
- Setiap game muncul sebagai kartu yang bisa di-drag untuk diurutkan
- Klik ✕ pada kartu untuk menghapus game
- Status: **Aktif** (hijau), **Semi-Aktif** (emas), **Tidak Aktif** (abu)

#### Section 3 — Statistik & Rank

- Tambahkan statistik per game: rank tertinggi, season, win rate, K/D
- Field **"Stat Unggulan Lain"** bisa diisi bebas: MVP Rate, Top Server, dll.
- Bisa menambahkan beberapa entry untuk game yang sama (berbeda season)

#### Section 4 — Achievement & Prestasi

- Pilih level prestasi: **Personal**, **Lokal**, **Nasional**, atau **Internasional**
- Tambahkan deskripsi untuk menjelaskan konteks pencapaian
- Kartu bisa diurutkan dari yang paling bergengsi di atas

#### Section 5 — Riwayat Turnamen

- Isi hasil dengan jelas: `"Juara 1"`, `"Runner-Up"`, `"Top 8"`, dll.
- Field Hadiah opsional, bisa diisi nominal atau bentuk hadiah
- Skala turnamen menentukan badge yang muncul di CV

#### Section 6 — Screenshots & Bukti

- Drag & drop gambar langsung ke area abu-abu, atau klik tombol **"Pilih File"**
- Bisa upload banyak gambar sekaligus
- Klik input di bawah gambar untuk menambahkan caption
- Hover gambar lalu klik ✕ untuk menghapus screenshot

### 4.3 Preview dan Print PDF

1. Klik tombol **"👁 Preview"** di kanan atas untuk melihat hasil CV
2. Panel preview slide dari kanan menampilkan CV lengkap sesuai template
3. Ganti template di sidebar (Classic / Cyber / Minimal) — preview otomatis update
4. Klik **"🖨 Print PDF"** untuk membuka dialog print browser
5. Di dialog print, pilih **"Save as PDF"** sebagai printer/destination
6. Klik Save/Print untuk menghasilkan file PDF

> 💡 **Tips Print:** Di dialog print browser, set **Margins** ke `None` atau `Minimum` dan aktifkan **"Background graphics"** agar warna dan logo template muncul di PDF.

---

## 5. Struktur Data (State)

Seluruh data aplikasi disimpan dalam satu objek JavaScript dan dipersistensikan ke `localStorage` dengan key `arc-state`.

### 5.1 Skema State

```js
state = {
  identity: {
    realName, gamerTag, platform, location,
    startYear, role, bio, discord, stream,
    avatarDataUrl  // base64 string
  },
  games: [
    { id, name, genre, platform, hours, status, year }
  ],
  stats: [
    { id, game, rank, season, wr, kd, other }
  ],
  achievements: [
    { id, title, game, date, level, desc }
  ],
  tournaments: [
    { id, name, game, result, scale, date, team, prize, role }
  ],
  screenshots: [
    { dataUrl, caption }
  ],
  template: "classic" | "cyber" | "minimal"
}
```

### 5.2 Persistensi Data

- **Autosave** terpanggil setiap kali ada perubahan pada state (input, tambah item, hapus, reorder)
- Data avatar dan screenshot disimpan sebagai **base64 string** — bisa membuat localStorage penuh jika screenshot banyak
- Jika localStorage penuh, autosave **silent fail** (tidak ada error yang ditampilkan ke user)
- Data dimuat kembali saat halaman dibuka via `loadFromStorage()` di `DOMContentLoaded`

> ⚠️ **Perhatian:** Screenshot yang banyak dan beresolusi tinggi bisa memenuhi limit localStorage browser (~5MB). Sebaiknya kompres gambar sebelum upload jika ada banyak screenshot.

---

## 6. Komponen UI

### 6.1 Topbar / Navigation Bar

- **Brand** — nama aplikasi `⚡ AchieveResumeCraft` di kiri
- **Theme Toggle** — tombol 🌙/☀️ untuk switch dark/light mode
- **Preview Button** — buka panel CV preview dari kanan
- **Print Button** — trigger print dialog untuk export PDF

### 6.2 Sidebar

- **Step Navigator** — 6 tombol section; aktif berwarna emas, selesai berwarna teal
- **Step Dot Indicator** — titik kecil di kanan tiap step; emas saat aktif, teal saat section sudah diisi
- **Template Picker** — 3 pilihan template (Classic, Cyber, Minimal) dengan thumbnail visual

### 6.3 Form Section

- Setiap section memiliki **HUD Header**: garis vertikal emas + ikon + judul + badge nomor
- **Form Grid** — layout 2 kolom untuk input field
- **Item Cards** — kartu drag-and-drop untuk setiap item yang ditambahkan
- **Navigation Buttons** — Kembali / Lanjut di bawah setiap section

### 6.4 Item Cards

- Ikon drag (`⠿`) di kiri untuk drag-and-drop reorder
- **Item body** — judul bold + badge tag berwarna (emas, teal, merah) untuk metadata
- Tombol `✕` di kanan untuk hapus item
- Hover effect: border berubah ke warna emas

### 6.5 Preview Panel

- Slide dari sisi kanan dengan animasi CSS transition
- Merender `buildCVHtml()` yang membangun HTML CV lengkap dari state
- CV render menggunakan class `.cv-render.template-{nama}` untuk style template

---

## 7. Template CV

| Template | Deskripsi |
|---|---|
| **Classic** | Header gradient gelap ke emas. Warna aksen `#C8A84B`. Cocok untuk dokumen formal. |
| **Cyber** | Header gradient biru malam. Warna aksen `#4ECDC4`. Border bawah header teal. Kesan futuristik. |
| **Minimal** | Header putih dengan teks hitam. Border bawah header hitam tebal. Paling netral dan profesional. |

Setiap template menerapkan class berbeda pada `.cv-render` yang mengubah warna header, warna section title, dan warna badge.

### 7.1 Struktur HTML CV yang Di-render

```
.cv-render.template-{nama}
├── .cv-header          ← foto avatar, nama, gamertag, metadata, kontak
├── .cv-body
│   ├── .cv-section     ← Bio
│   ├── .cv-section     ← Game yang Dimainkan
│   ├── .cv-section     ← Statistik & Rank
│   ├── .cv-section     ← Achievement & Prestasi
│   ├── .cv-section     ← Riwayat Turnamen
│   └── .cv-section     ← Screenshots & Bukti
└── .cv-footer          ← "Generated by AchieveResumeCraft · [tanggal]"
```

---

## 8. Roadmap Pengembangan

### 8.1 Fitur yang Bisa Ditambahkan

- **Export JSON** — simpan/load state sebagai file `.json` untuk backup & restore lintas perangkat
- **Import Data** — baca file JSON state yang diekspor sebelumnya
- **Edit Item** — selain hapus, bisa edit item yang sudah ditambahkan
- **Multiple CV** — simpan beberapa profil CV berbeda (per akun game)
- **Custom Color Theme** — warna aksen CV bisa dikustomisasi sendiri
- **Embed Video** — link YouTube/Twitch highlight di section screenshots
- **QR Code** — tambahkan QR code ke halaman CV yang mengarah ke profil online
- **Node.js Server** — jadikan versi server untuk multi-user dan cloud save

### 8.2 Untuk Jadikan SaaS (Rencana Jangka Panjang)

- **Backend** — Node.js/Express dengan database PostgreSQL atau SQLite
- **Auth** — login via Google OAuth atau email
- **Cloud Storage** — simpan screenshot ke Cloudinary atau S3
- **Public CV Link** — setiap CV punya URL publik yang bisa dibagikan
- **Multi-tenant** — tiap user punya akun dan koleksi CV sendiri

---

## 9. Troubleshooting

| Masalah | Solusi |
|---|---|
| Data hilang saat refresh | Pastikan tidak menggunakan mode **Incognito**. Data tersimpan di localStorage yang diblokir di mode private. |
| Screenshot tidak muncul | Format yang didukung: JPG, PNG, GIF, WebP. Pastikan ukuran file tidak terlalu besar. |
| CV tidak berwarna saat print | Di dialog print browser, aktifkan opsi **"Background graphics"** atau **"Print background colors"**. |
| Font tidak muncul di preview | Butuh koneksi internet saat pertama buka (untuk load Google Fonts). Setelah itu bisa offline. |
| Drag & drop tidak bekerja | Pastikan menggunakan browser modern. Coba di Chrome atau Firefox terbaru. |
| localStorage penuh | Kurangi jumlah screenshot atau gunakan gambar yang lebih kecil resolusinya. |

---

## 10. Referensi Teknis

### 10.1 Browser API yang Digunakan

| API | Kegunaan |
|---|---|
| `localStorage` | Penyimpanan data permanen di browser |
| `FileReader API` | Konversi file gambar ke base64 string |
| `HTML Drag and Drop API` | Reorder kartu dan upload file via drag |
| `window.print()` | Trigger dialog print untuk export PDF |
| `CSS Custom Properties` | Theming dark/light mode via variabel CSS |

### 10.2 Fonts & External Resources

- **Google Fonts**: `Rajdhani` (display), `Inter` (body), `JetBrains Mono` (code/data)
- Semua font di-load via CDN — satu-satunya ketergantungan eksternal
- Setelah font ter-cache di browser, aplikasi bisa berjalan offline

### 10.3 Browser Support

| Browser | Dukungan |
|---|---|
| Google Chrome 90+ | ✅ Penuh |
| Mozilla Firefox 88+ | ✅ Penuh |
| Microsoft Edge 90+ | ✅ Penuh |
| Safari 14+ | ✅ Penuh |
| Opera 76+ | ✅ Penuh |
| Internet Explorer | ❌ Tidak didukung |

---

*AchieveResumeCraft v1.0.0 · github.com/noobiiefun*
