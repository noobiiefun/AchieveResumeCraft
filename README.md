<div align="center">

# ⚡ AchieveResumeCraft

**Bukan CV kerja. Ini CV gamer.**

Buat, susun, dan cetak CV prestasi gaming kamu — rank, turnamen, achievement, hingga screenshot bukti — langsung dari browser. Tanpa server. Tanpa instalasi.

[![Made with HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Made with CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Server Required](https://img.shields.io/badge/No%20Server-Required-brightgreen?style=flat)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat)](#)

</div>

---

## ✨ Tentang Proyek

**AchieveResumeCraft** adalah aplikasi web lokal untuk membuat **CV prestasi gaming** — bukan CV melamar kerja, tapi dokumen resmi yang membuktikan perjalanan kamu sebagai gamer.

Cocok untuk:
- Mendaftar turnamen yang butuh rekam jejak
- Bergabung dengan tim esports
- Portofolio streamer / content creator gaming
- Dokumentasi pribadi perjalanan gaming

---

## 🎮 Fitur

| | Fitur | Keterangan |
|---|---|---|
| 🌙 | **Dark / Light Mode** | Default dark, bisa toggle kapan saja |
| 🎮 | **Identitas Gamer** | Foto, nama, gamertag, platform, bio, sosial media |
| 🕹 | **Game yang Dimainkan** | Genre, platform, jam bermain, status aktif |
| 📊 | **Statistik & Rank** | Rank tertinggi, season, win rate, K/D ratio |
| 🏆 | **Achievement** | Prestasi personal, lokal, nasional, internasional |
| ⚔️ | **Riwayat Turnamen** | Hasil, skala, tim, peran, hadiah |
| 📸 | **Screenshot & Bukti** | Upload & drag-drop gambar dengan caption |
| 🎨 | **3 Template CV** | Classic · Cyber · Minimal |
| 👁 | **Preview Real-time** | Panel preview langsung dari state |
| 🖨 | **Export ke PDF** | Print langsung dari browser |
| 💾 | **Autosave** | Data tersimpan otomatis di localStorage |

---

## 🚀 Cara Pakai

Tidak ada npm install. Tidak ada server. Tidak ada setup.

```bash
# 1. Clone repo
git clone https://github.com/noobiiefun/achieveresumecraft.git

# 2. Masuk ke folder
cd achieveresumecraft

# 3. Buka di browser
# Double-click index.html, atau drag ke browser
```

> ✅ Selesai. Langsung bisa dipakai.

---

## 📁 Struktur Project

```
achieveresumecraft/
├── index.html              ← Entry point
├── css/
│   └── style.css           ← Styling + dark/light mode + CV print style
└── js/
    └── app.js              ← State, render, drag-drop, autosave, print
```

---

## 🖨 Export PDF

1. Isi semua section yang diinginkan
2. Klik **👁 Preview** untuk cek hasil
3. Klik **🖨 Print PDF** di kanan atas
4. Di dialog print browser → pilih **"Save as PDF"**
5. Aktifkan **"Background graphics"** agar warna template ikut tercetak

---

## 🎨 Template CV

<table>
<tr>
<td align="center"><b>Classic</b></td>
<td align="center"><b>Cyber</b></td>
<td align="center"><b>Minimal</b></td>
</tr>
<tr>
<td>Header gradient gelap–emas. Aksen <code>#C8A84B</code>. Formal & elegan.</td>
<td>Header biru malam. Aksen <code>#4ECDC4</code>. Futuristik & bold.</td>
<td>Header putih–hitam. Bersih, netral, paling profesional.</td>
</tr>
</table>

---

## 🗂 Struktur Data

Semua data disimpan di `localStorage` (key: `arc-state`) dalam format berikut:

```js
{
  identity: { realName, gamerTag, platform, location, startYear, role, bio, discord, stream, avatarDataUrl },
  games:        [{ id, name, genre, platform, hours, status, year }],
  stats:        [{ id, game, rank, season, wr, kd, other }],
  achievements: [{ id, title, game, date, level, desc }],
  tournaments:  [{ id, name, game, result, scale, date, team, prize, role }],
  screenshots:  [{ dataUrl, caption }],
  template: "classic" | "cyber" | "minimal"
}
```

---

## 🗺 Roadmap

- [ ] Export / Import state sebagai file `.json`
- [ ] Edit item yang sudah ditambahkan
- [ ] Multiple CV profile
- [ ] Custom warna aksen
- [ ] Embed link video highlight
- [ ] QR Code ke profil online
- [ ] Versi Node.js + Express (multi-user)
- [ ] SaaS: cloud save, public CV link, login OAuth

---

## ⚠️ Catatan

- Data **akan hilang** jika membuka di mode **Incognito** (localStorage diblokir)
- Screenshot disimpan sebagai base64 — banyak screenshot beresolusi tinggi bisa memenuhi limit ~5MB localStorage
- Font (Rajdhani, Inter, JetBrains Mono) butuh koneksi internet saat pertama buka; setelah itu bisa offline

---

## 🛠 Tech Stack

- **HTML5** — struktur dan layout
- **CSS3** — custom properties, animasi, responsive, print style
- **JavaScript (Vanilla)** — tanpa framework, tanpa dependency
- **Google Fonts** — satu-satunya resource eksternal

---

<div align="center">

Dibuat oleh **Omon** · [@noobiiefun](https://github.com/noobiiefun)

*"Level up your gaming resume."*

</div>
