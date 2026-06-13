import { useState } from "react";

const CARA = [
  ["1. Masukkan Aduan",    "Tempel atau ketik teks aduan layanan publik berbahasa Indonesia."],
  ["2. Diproses IndoBERT", "Model transformer menokenisasi teks dan menganalisis konteksnya secara mendalam."],
  ["3. Lihat Hasil",       "Kategori muncul dengan tingkat keyakinan, sentimen, dan distribusi probabilitas."],
];

const UNGGUL = [
  ["Berbasis Transformer",    "IndoBERT memahami konteks kalimat secara menyeluruh, bukan sekadar pencocokan kata."],
  ["Khusus Bahasa Indonesia", "Dilatih dari aduan nyata media sosial berbahasa Indonesia sebanyak 12.248 data."],
  ["Transparan Saat Ragu",    "Memberi peringatan ketika keyakinan rendah atau teks di luar 6 kategori."],
];

const FAQ = [
  ["Apakah data aduan saya disimpan?",   "Tidak. Teks hanya diproses saat itu, tidak disimpan di server manapun."],
  ["Berapa akurasi model?",              "IndoBERT mencapai akurasi 99,71% (macro-F1 99,68%) pada data uji. Namun perlu dicatat bahwa angka ini mengandung feature leakage akibat metode scraping berbasis keyword — akurasi pada teks tanpa kata domain eksplisit adalah 93,0%."],
  ["Apa itu IndoBERT?",                  "Model bahasa berbasis Transformer (indobenchmark/indobert-base-p1) yang dilatih khusus untuk Bahasa Indonesia."],
  ["6 kategori apa saja?",               "Kesehatan, pendidikan, infrastruktur, administrasi, kebersihan, dan transportasi."],
  ["Apa itu sentimen?",                  "Label sentimen (positif/negatif/netral) dideteksi otomatis berbasis leksikon — bukan model terpisah. Bersifat weak label dan perlu diinterpretasi dengan hati-hati."],
  ["Apakah ini sistem resmi pemerintah?","Bukan. Ini prototipe akademik Praktikum NLP Politeknik Caltex Riau, bukan pengganti SP4N-LAPOR!."],
];

function Akordeon({ data }) {
  const [buka, setBuka] = useState(null);
  return (
    <div className="flex flex-col gap-2">
      {data.map(([q, a], i) => (
        <div key={i} className="border border-[#d4e5e2] rounded-xl overflow-hidden">
          <button
            onClick={() => setBuka(buka === i ? null : i)}
            className="w-full flex justify-between gap-3 px-4 py-3.5 text-left hover:bg-[#f4faf9] transition-colors"
          >
            <span className="text-sm font-semibold text-[#0f1f1d]">{q}</span>
            <span className="text-[#0f766e] shrink-0 font-bold text-lg leading-none">{buka === i ? "−" : "+"}</span>
          </button>
          {buka === i && (
            <p className="px-4 pb-4 pt-1 text-sm text-[#5a7975] leading-relaxed border-t border-[#d4e5e2]">{a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function InfoModal({ jenis, onClose }) {
  const judul = { cara: "Cara Kerja", faq: "Pertanyaan Umum", tentang: "Tentang Sistem" }[jenis];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f1f1d]/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#d4e5e2] rounded-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#d4e5e2] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#e6f7f5] flex items-center justify-center">
              <span className="text-[#0f766e] font-bold text-sm">
                {jenis === "cara" ? "?" : jenis === "faq" ? "≡" : "i"}
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#0f1f1d]">{judul}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#5a7975] hover:text-[#0f1f1d] hover:bg-[#f4faf9] transition-colors text-xl font-light"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Cara kerja */}
          {jenis === "cara" && (
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975] mb-3">Tiga Langkah</div>
                <div className="flex flex-col gap-3">
                  {CARA.map(([j, d], i) => (
                    <div key={j} className="flex gap-4 border border-[#d4e5e2] rounded-xl p-4 bg-[#f4faf9]">
                      <div className="w-7 h-7 rounded-lg bg-[#0f766e] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-[#0f1f1d] text-sm mb-1">{j.replace(/^\d+\.\s/, "")}</div>
                        <p className="text-sm text-[#5a7975] leading-relaxed">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975] mb-3">Keunggulan</div>
                <div className="flex flex-col gap-3">
                  {UNGGUL.map(([j, d]) => (
                    <div key={j} className="border border-[#d4e5e2] rounded-xl p-4">
                      <div className="font-semibold text-[#0f1f1d] text-sm mb-1">✓ {j}</div>
                      <p className="text-sm text-[#5a7975] leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {jenis === "faq" && <Akordeon data={FAQ} />}

          {/* Tentang */}
          {jenis === "tentang" && (
            <div className="space-y-5">
              <p className="text-sm text-[#5a7975] leading-relaxed">
                Sistem klasifikasi pengaduan masyarakat berbasis NLP yang mengelompokkan aduan layanan publik ke 6 kategori menggunakan IndoBERT, dikembangkan untuk Praktikum Natural Language Processing.
              </p>
              <div className="border border-[#d4e5e2] rounded-xl p-4 bg-[#f4faf9]">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975] mb-3">Informasi Akademik</div>
                <ul className="text-sm text-[#0f1f1d] space-y-1.5">
                  <li className="flex gap-2"><span className="text-[#5a7975]">Institusi</span> Politeknik Caltex Riau</li>
                  <li className="flex gap-2"><span className="text-[#5a7975]">Prodi</span> Teknik Informatika</li>
                  <li className="flex gap-2"><span className="text-[#5a7975]">Kelas</span> 3 TIF · Kelompok 3</li>
                  <li className="flex gap-2"><span className="text-[#5a7975]">TA</span> 2025/2026</li>
                </ul>
              </div>
              <div className="border border-[#d4e5e2] rounded-xl p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975] mb-3">Anggota Tim</div>
                <ul className="text-sm text-[#0f1f1d] space-y-1.5">
                  {["Dion", "Muhammad Zidane", "Zayyandra Rajel Ahsan"].map((n) => (
                    <li key={n} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#92400e] mb-2">Bukan Sistem Resmi</div>
                <p className="text-[12px] text-[#78350f] leading-relaxed">
                  Ini adalah prototipe akademik, bukan pengganti SP4N-LAPOR! atau sistem pengaduan resmi pemerintah.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}