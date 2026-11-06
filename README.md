# Vibe Coding Bootcamp — Batch 4

Repository ini berisi seluruh materi presentasi interaktif untuk program **[Vibe Coding Bootcamp Batch 4](https://www.codepolitan.com/p/page-vibecoding)** oleh **[CODEPOLITAN](https://www.codepolitan.com/)**.

Presentasi dibangun menggunakan arsitektur **OpenSlide** berbasis React 19 dan TypeScript, dengan visual storytelling bergaya *Swiss-Japanese Minimalism* yang responsif dan interaktif.

---

## 🌐 Live Presentation

Seluruh materi slide telah dideploy dan dapat diakses langsung secara online:

👉 **[https://vibe-coding-batch-4.edgeone.cool](https://vibe-coding-batch-4.edgeone.cool)**

### Akses Cepat per Modul:
| Sesi | Topik Materi | Link Presentasi |
| :--- | :--- | :--- |
| **Sesi 1 — Part 1** | *Intro to Vibe Coding, Prompt Engineering & AI Workflow* | [Buka Slide →](https://vibe-coding-batch-4.edgeone.cool/s/vibe-coding-sesi-1-part-1) |
| **Sesi 1 — Part 2** | *Studi Kasus Prompt Engineering UrbanStore* | [Buka Slide →](https://vibe-coding-batch-4.edgeone.cool/s/vibe-coding-sesi-1-part-2) |
| **Sesi 2 — Part 1** | *Product Planning: Dari Ide Menjadi Blueprint Produk* | [Buka Slide →](https://vibe-coding-batch-4.edgeone.cool/s/vibe-coding-sesi-2-part-1) |
| **Sesi 2 — Part 2** | *Product Requirement Document (PRD) for AI-Ready Specs* | [Buka Slide →](https://vibe-coding-batch-4.edgeone.cool/s/vibe-coding-sesi-2-part-2) |

---

## 📚 Struktur & Cakupan Materi

Presentasi dirancang membimbing peserta memahami alur pengembangan software modern berbasis AI (*Vibe Coding*) dari hulu ke hilir:

1. **Foundations & Mindset:** Memahami paradigma Vibe Coding dan peran manusia sebagai *Product Manager* & *System Architect*, bukan sekadar juru ketik kode.
2. **Product Planning (Canvas):** Menentukan Target Persona, Problem Statement, Value Proposition, Product Goals, dan Scope MVP yang terukur.
3. **Product Requirement Document (PRD):** Menerjemahkan keputusan produk makro ke dokumen spesifikasi teknis berbasis Markdown (`.md`) yang mencakup User Stories, Functional Requirements (FR), Business Rules, dan Acceptance Criteria (BDD).
4. **AI Agent Orchestration:** Mempersiapkan handoff spesifikasi bersih ke AI coding tool (Claude Code / Antigravity / Cursor) untuk eksekusi tanpa celah asumsi (*zero guessing*).

---

## 🛠️ Tech Stack & Desain

- **Runtime & Presentation Engine:** [`@open-slide/core`](https://github.com/open-slide/open-slide) (Vite + React 19 + TypeScript)
- **Design System:** Swiss-Japanese Minimalism (Clean typography Inter, Newsreader italic serif, JetBrains Mono code elements, hand-drawn vector doodle engine)
- **Canvas Resolution:** Fixed 1920 × 1080px (Crisp presentation ratio)
- **Deployment Platform:** Tencent EdgeOne (EdgeOne Makers Global Static CDN dengan SPA fallback routing)

---

## 🚀 Menjalankan Project Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm atau pnpm

### Langkah Instalasi
1. **Clone repository:**
   ```bash
   git clone https://github.com/adityafakhrii/slide-vcb-batch4.git
   cd slide-vcb-batch4
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Akses `http://localhost:5173` di browser Anda.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   Hasil build static akan berada di direktori `dist/`.

---

## ⌨️ Kontrol Navigasi Presenter

Saat membuka presentasi:
- `→` / `Space` / `PageDown`: Pindah ke slide berikutnya
- `←` / `PageUp`: Pindah ke slide sebelumnya
- `F`: Masuk ke mode Fullscreen play mode
- `Esc`: Keluar dari mode Fullscreen

---

## 🏢 Tentang Penyelenggara

Materi ini disusun khusus untuk program edukasi teknologi intensif oleh:
- **Penyelenggara:** [CODEPOLITAN](https://www.codepolitan.com/)
- **Program:** [Vibe Coding Bootcamp](https://www.codepolitan.com/p/page-vibecoding)
