# Rundown Resmi Workshop — DESIGN TO UI/UX

Dokumen ini menyimpan seluruh jadwal resmi (**Rundown**) yang ada di dalam kode sumber **Design Playground**, beserta penjelasan lokasi penyimpanan data dan mengapa halaman rundown tidak lagi muncul di menu navigasi aplikasi.

---

## 1. Di Mana Rundown Berada & Kenapa Tidak Muncul di Aplikasi?

- **Status di Menu UI Aplikasi:**
  - Halaman UI dedicated untuk jadwal workshop (`src/pages/WorkshopOverview.tsx` pada rute `/overview`, yang dulunya menampilkan komponen *Official Rundown 09:00 – 16:30*) **dihapus pada pembaruan `v2.9`** (commit `8d79f54` — tercatat di `docs/DEVELOPMENT_LOG.md` baris 225 agar rundown didistribusikan terpisah sebagai dokumen Markdown).
  - Saat ini di [`src/App.tsx`](../src/App.tsx) dan [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx), menu utama hanya menampilkan: **`Module` (`/hub`)**, **`Figma Guide` (`/figma`)**, **`Challenges` (`/challenges`)**, **`Assets` (`/assets`)**, **`Quiz` (`/quiz`)**, dan tombol **`Present`**. Kunjungan langsung ke `/overview` otomatis dialihkan kembali ke `/`.
- **Lokasi Data Rundown di Kode Sumber:**
  1. [`src/content/schedule/workshopSchedule.ts`](../src/content/schedule/workshopSchedule.ts) (`WORKSHOP_SCHEDULE`) — Rundown kurikulum penuh **09:00 – 16:30 (13 blok)**. Saat ini masih dipakai di balik layar oleh `PresentationOverlay.tsx` (untuk tombol `Buka Modul`), `LearningModule.tsx`, dan `Challenges.tsx`.
  2. [`src/content/presentation/craftDeckData.ts`](../src/content/presentation/craftDeckData.ts) (`CRAFT_SLIDES`) — Timeline khusus **Deck Presentasi CRAFT 12:30 – 17:00 (8 Bagian / 38 Slide)** yang ditampilkan pada bar footer **Present Page**.
  3. [`docs/CURRICULUM.md`](./CURRICULUM.md) — Ringkasan silabus pagi-sore sesuai jam `09:00 – 16:30`.

> **Catatan Sinkronisasi:** Di dalam proyek ini terdapat **2 format timeline** sesuai sumber kode aslinya: (A) Rundown Workshop Full-Day `09:00–16:30` pada `workshopSchedule.ts`, dan (B) Timeline Deck Presentasi CRAFT `12:30–17:00` pada `craftDeckData.ts`. Keduanya dijabarkan lengkap di bawah ini agar mudah disesuaikan dengan jam pelaksanaan kelasmu.

---

## 2. Rundown A — Kurikulum Full-Day Workshop (`09:00 – 16:30`)

*Sumber kode: `src/content/schedule/workshopSchedule.ts` (`WORKSHOP_SCHEDULE`) — total 13 sesi & istirahat (7,5 jam).*

| Waktu | Durasi | Judul Sesi | Fase | Rute Terkait | Poin Kunci Fasilitator / Materi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **09:00 – 09:20** | 20 min | **Opening & Ice Breaking** | `opening` | `/` | Sambutan *DESIGN TO UI/UX* (*From Visual Thinking to Digital Interface*), menyamakan lingkup pemula, alur `Understand -> Explore -> Create -> Review`, serta pemanasan membandingkan desain yang jelas vs membingungkan. |
| **09:20 – 09:50** | 30 min | **Module 01: Introduction to Design** | `phase-01` | `/learn/chapter-01` | Desain sebagai komunikasi visual & pemecahan masalah (bukan sekadar dekorasi/seni), *Design vs Art*, mengenali target audiens, dan aturan *2-second notice*. |
| **09:50 – 10:15** | 25 min | **Module 02: Elements of Design** | `phase-01` | `/learn/chapter-02` | 7 elemen visual dasar penyusun tata letak: `Line`, `Shape`, `Form`, `Color`, `Texture`, `Space` (positif & negatif), dan kontras `Value` (gelap-terang). |
| **10:15 – 10:30** | 15 min | **Module 03: Principles of Design** | `phase-01` | `/learn/chapter-03` | Pembahasan ringkas 5 prinsip utama (**Contrast, Balance, Visual Hierarchy, Alignment, Proximity**) + 4 prinsip pendukung (*Emphasis, Repetition, Rhythm, Unity*) serta cara membaca kesalahan layout umum. |
| **10:30 – 10:45** | 15 min | **Morning Break** | `break` | — | Peregangan, minum kopi/air, dan tanya jawab informal. |
| **10:45 – 11:20** | 35 min | **Module 04: Typography & Color Theory** | `phase-01` | `/learn/chapter-04` | *Typeface vs font*, Serif/Sans/Display, mengatur ukuran/ketebalan/*tracking* (`-0.02em` judul)/*line-height* (`~1.55` isi), roda warna, harmoni, kontras WCAG AA/AAA, serta pemahaman makna warna secara kontekstual. |
| **11:20 – 11:45** | 25 min | **Module 05: Layout & Composition** | `phase-01` | `/learn/chapter-05` | Margin luar frame, padding, kolom, *gutter*, *whitespace*, pola baca `Z-pattern` vs `F-pattern`, dan pengenalan **Swiss Editorial** (jelas, berbasis grid, asimetris, dan tetap memakai warna berani). |
| **11:45 – 12:30** | 45 min | **Lunch Break** | `break` | — | Istirahat siang dan pengecekan browser/laptop peserta agar Figma siap dibuka. |
| **12:30 – 13:05** | 35 min | **Module 06: Figma Essentials** | `phase-02` | `/learn/chapter-06` | Tur antarmuka Figma (`Toolbar`, `Layers`, `Assets`, `Canvas`, `Properties`, `Pages`), perbedaan **Frame (`F`) vs Group (`Cmd/Ctrl+G`)**, bentuk vektor & Pen dasar, Text/Fill/Stroke/Export, serta latihan 8 shortcut utama (`V, F, R, O, T, P, Shift+A, Ctrl/Cmd+G`). |
| **13:05 – 13:40** | 35 min | **Module 07: Figma for Interface Design (+ Mini Exercise)** | `phase-02` | `/learn/chapter-07` | Frame sebagai kontainer layar, dasar **Auto Layout (`Shift + A`)**, pengenalan Components sederhana, Constraints pemula (`Hug / Fill / Fixed`), jarak kelipatan `8px`, prototipe klik dasar, dan **Mini Exercise** (`1 Frame + 1 Headline + 1 Subheading + 2 Shapes + 1 CTA`). |
| **13:40 – 14:25** | 45 min | **Challenge 01: Poster Design — CREATIVE FREQUENCY** | `phase-03` | `/challenges/creative-frequency-poster` | Brief desain poster A3 Portrait (`297 × 420 mm` / `842 × 1191 px` di Figma) acara *CREATIVE FREQUENCY Bandung (20 Desember 2026)* menggunakan hirarki Swiss Editorial, starter assets (`/assets`), dan struktur Mid-Fidelity. |
| **14:25 – 14:40** | 15 min | **Afternoon Break** | `break` | — | Istirahat singkat sebelum proyek akhir website hero. |
| **14:40 – 15:40** | 60 min | **Challenge 02: Personal Portfolio Website Hero Design** | `phase-03` | `/challenges/personal-portfolio-hero` | Desain Hero Website *above-the-fold* desktop (`1440 × 1024 px`, opsional mobile `390 × 844 px`) untuk profil desainer fiktif *Alex Morgan* dengan Auto Layout, navbar sejajar (`Home · About · Projects · Contact`), CTA utama/kedua, dan Portfolio Assets. |
| **15:40 – 16:30** | 50 min | **Presentation, Design Critique, Feedback & Closing** | `closing` | `/quiz` | Presentasi karya peserta (*show-and-tell*) sambil menjelaskan alasan pemilihan grid/huruf/warna, kritik membangun berbasis rubrik berbobot, dan kuis penutup (`Knowledge Check` 14 soal di `/quiz`). |

---

## 3. Rundown B — Timeline Deck Presentasi CRAFT (`12:30 – 17:00`)

*Sumber kode: `src/content/presentation/craftDeckData.ts` (`CRAFT_SLIDES`) & `PresentationOverlay.tsx` — jadwal yang tertera di footer slide **Present Page** untuk sesi workshop siang-sore (`4,5 Jam`, `38 Slide`).*

| Waktu | Durasi | Bagian | Slide | Tahap CRAFT | Topik & Aktivitas Utama |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **12:30 – 12:40** | 10 min | **Bagian 01 · Pembukaan & Pengenalan** | `01 – 03` | `01 Pahami` | Sampul `CRAFT — DESAIN KE UI/UX`, target hasil hari ini, dan *Voting Kelas Langsung* ("Apa yang membuat desain bagus?"). |
| **12:40 – 13:00** | 20 min | **Bagian 02 · Memahami Desain** | `04 – 06` | `01 Pahami` | Membedakan hiasan vs desain (demo toggle), peran 4 elemen komunikasi visual (`CRAFT STUDIO NIGHT`), dan alur Masalah -> Solusi Visual. |
| **13:00 – 14:10** | 70 min | **Bagian 03 · Pondasi Desain Visual** | `07 – 17` | `02 Susun` | **Sub-bagian A:** Grid & Peta Ruang (`Margin, Padding, Gutter, Alignment, Whitespace`) + Switchboard Grid (`Slide 08–10`).<br>**Sub-bagian B:** Tipografi, H1–Label, & Switchboard Hirarki Huruf (`Slide 11–13`).<br>**Sub-bagian C:** Roda Warna Interaktif, Rasio `60 / 30 / 10`, & Simulasi Kontras WCAG (`Slide 14–16`).<br>**Rangkuman:** Penggabungan Grid + Tipografi + Warna (`Slide 17`). |
| *14:10 – 14:20* | *10 min* | *(Jeda Transisi / Istirahat Singkat)* | — | — | *Selisih waktu jeda antara akhir Bagian 03 (`14:10`) dan mulai Bagian 04 (`14:20`) pada metadata deck.* |
| **14:20 – 14:40** | 20 min | **Bagian 04 · Dari Desain ke UI/UX** | `18 – 21` | `03 Terjemahkan` | Terjemahan 5 prinsip visual ke antarmuka digital, bedanya UI vs UX, Inspektor 7 komponen Hero Website (`FORM / STUDIO`), dan Simulasi perbaikan 3 kesalahan UI/UX. |
| **14:40 – 15:10** | 30 min | **Bagian 05 · Panduan Figma** | `22 – 28` | `03 Terjemahkan` | 7 bagian praktis Figma: pengenalan & layar `iCraft`, 4 area kerja, 6 alat wajib (`V, F, R, O, T, Shift+A`), 6 properti desain + Layers, Auto Layout (`Tanpa vs Dengan`), simulasi 6 langkah + `Sandbox Hero`, dan 3-kolom Cheat Sheet. |
| **15:10 – 16:20** | 70 min | **Bagian 06 · Tantangan Praktik** | `29 – 33` | `04 Buat & Review` | Pembuatan Hero Website studio kreatif fiktif (`1440 × 900 px` · contoh `FORM / STUDIO`) dengan pembagian waktu 6 tahap pada Slide 32 (`10m` pahami brief + `10m` frame & grid + `15m` judul/teks + `15m` warna/visual + `15m` cek jarak/tombol + `5m` siap presentasi) dan Checklist Mandiri 6 pertanyaan (`Slide 33`). |
| **16:20 – 16:45** | 25 min | **Bagian 07 · Review & Masukan** | `34 – 35` | `04 Buat & Review` | Evaluasi karya menggunakan kerangka 4 pertanyaan konstruktif (`Slide 34`) dan Rubrik Penilaian 100% (`25% Hirarki Tipografi · 20% Grid · 20% Warna & Kontras · 20% Kejelasan · 15% Konsistensi`, `Slide 35`). |
| **16:45 – 17:00** | 15 min | **Bagian 08 · Refleksi & Penutup** | `36 – 38` | `04 Buat & Review` | Kilas balik 6 poin belajar hari ini (`Slide 36`), pemikiran akhir *"Desain yang baik bukan hasil kebetulan"* (`Slide 37`), manifesto penutup & tautan langsung ke Kuis (`/quiz`) + Challenges (`/challenges`) (`Slide 38`). |

