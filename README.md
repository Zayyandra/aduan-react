# Sistem Klasifikasi Aduan Layanan Publik (React + FastAPI)

Web app klasifikasi aduan masyarakat ke 6 kategori (kesehatan, pendidikan,
infrastruktur, administrasi, kebersihan, transportasi) menggunakan IndoBERT.
Backend Python (FastAPI) + Frontend React (Vite + Tailwind), terpisah.

## Struktur Project

```
aduan-react/
├── backend/
│   ├── main.py                  # API FastAPI (load IndoBERT, endpoint /predict)
│   ├── requirements.txt
│   └── model/
│       └── indobert-aduan/      # <-- TARUH FOLDER MODEL DI SINI
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── InputPanel.jsx
    │   │   ├── ResultCard.jsx
    │   │   └── HistoryPanel.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Apa yang didownload dari Colab

Download **seluruh folder `indobert-aduan`** dari panel Files Colab. Isinya harus
lengkap 5 file ini:
- `config.json`
- `model.safetensors`
- `special_tokens_map.json`
- `tokenizer_config.json`
- `vocab.txt`

Tips: di Colab jalankan `!zip -r indobert-aduan.zip indobert-aduan` lalu download
zip-nya, biar tidak ada file yang ketinggalan. Setelah download, extract dan taruh
folder `indobert-aduan` di `backend/model/`.

## Langkah 1 — Backend (Python)

```bash
cd backend
python -m venv venv

# aktifkan venv:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Berhasil kalau muncul `Model siap. Label: {...}` dan server di `http://127.0.0.1:8000`.

> Install pertama lama (~2GB: torch + transformers). Loading model saat startup
> juga beberapa detik. Sabar.

## Langkah 2 — Frontend (React)

Buka terminal **baru** (biarkan backend tetap jalan di terminal pertama):

```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

> `npm install` butuh Node.js terpasang. Cek dengan `node -v`. Kalau belum ada,
> install dari https://nodejs.org (versi LTS).

## Cara pakai

Ketik teks aduan, klik "Klasifikasikan" (atau Ctrl+Enter). Sistem menampilkan
kategori prediksi, tingkat keyakinan, skor semua kategori, dan riwayat.

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `OSError: ... model/indobert-aduan` | Folder model belum dicopy / tidak lengkap |
| Frontend "Gagal terhubung ke server" | Backend belum jalan di port 8000 |
| `npm: command not found` | Node.js belum terpasang |
| Tailwind tidak jalan (tampilan polos) | Pastikan `npm install` sukses & `npm run dev` dijalankan dari folder frontend |
| `ModuleNotFoundError: torch` | venv belum aktif / `pip install` belum dijalankan |

## Catatan untuk laporan

- Arsitektur **client-server terpisah**: backend FastAPI serve model via REST API
  (`POST /predict`), frontend React konsumsi API tersebut lewat `fetch`.
- Frontend dibangun komponen-based (Header, InputPanel, ResultCard, HistoryPanel)
  — mudah dirawat dan dikembangkan.
- Fungsi `text_light` di backend **identik** dengan preprocessing saat training.
  Kalau beda, hasil prediksi melenceng.
- Model di-load sekali saat startup, bukan tiap request, supaya respons cepat.
