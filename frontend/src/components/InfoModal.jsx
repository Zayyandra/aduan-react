import { useState } from "react";

const CARA = [
  ["Masukkan Ulasan", "Tempel atau ketik ulasan/aduan aplikasi layanan publik berbahasa Indonesia."],
  ["Diproses IndoBERT", "Model transformer fine-tuned dari 21.145 ulasan Play Store menganalisis konteks teks secara mendalam."],
  ["Lihat Hasil", "Kategori muncul dengan tingkat keyakinan, sentimen, dan distribusi probabilitas 6 kategori."],
];

const UNGGUL = [
  ["Berbasis Transformer", "IndoBERT memahami konteks kalimat secara menyeluruh, bukan sekadar pencocokan kata kunci."],
  ["Data Play Store Nyata", "Dilatih dari 21.145 ulasan aplikasi layanan publik pemerintah di Google Play Store."],
  ["Transparan Saat Ragu", "Memberi peringatan ketika keyakinan di bawah 60% atau teks di luar 6 kategori."],
];

const FAQ = [
  ["Apakah data ulasan saya disimpan?", "Tidak. Teks hanya diproses saat itu, tidak disimpan di server manapun."],
  ["Berapa akurasi model?", "IndoBERT mencapai akurasi 74,50% (macro-F1 72,78%) pada data uji Play Store. Keyword-stripped evaluation: 73,6% pada 96% test set tanpa kata kunci domain — angka yang jujur karena tidak ada keyword scraping."],
  ["Apa itu IndoBERT?", "Model bahasa berbasis Transformer (indobenchmark/indobert-base-p1) yang dilatih khusus untuk Bahasa Indonesia, di-fine-tune 3 epoch di GPU T4."],
  ["6 kategori apa saja?", "Kesehatan, Pendidikan, Infrastruktur, Administrasi, Kebersihan, dan Transportasi."],
  ["Dari mana data pelatihan?", "21.145 ulasan dari 14 aplikasi layanan publik pemerintah di Google Play Store. Label sentimen otomatis dari rating bintang: ★1–2=negatif, ★3=netral, ★4–5=positif."],
  ["Apa itu sentimen?", "Label sentimen (positif/negatif/netral) dideteksi berbasis leksikon — bukan model terpisah. Perlu diinterpretasi dengan hati-hati."],
  ["Apakah ini sistem resmi pemerintah?", "Bukan. Ini prototipe akademik Praktikum NLP Politeknik Caltex Riau, bukan pengganti SP4N-LAPOR!."],
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
                        <div className="font-semibold text-[#0f1f1d] text-sm mb-1">{j}</div>
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

          {jenis === "faq" && <Akordeon data={FAQ} />}

          {jenis === "tentang" && (
            <div className="space-y-5">
              <p className="text-sm text-[#5a7975] leading-relaxed">
                Sistem klasifikasi ulasan layanan publik berbasis NLP yang mengelompokkan ulasan ke 6 kategori menggunakan IndoBERT fine-tuned dari data Google Play Store, dikembangkan untuk Praktikum Natural Language Processing.
              </p>
              <div className="border border-[#d4e5e2] rounded-xl p-4 bg-[#f4faf9]">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975] mb-3">Informasi Akademik</div>
                <ul className="text-sm text-[#0f1f1d] space-y-1.5">
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">Institusi</span> Politeknik Caltex Riau</li>
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">Prodi</span> Teknik Informatika</li>
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">Kelas</span> 3 TIF · Kelompok 3</li>
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">TA</span> 2025/2026</li>
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">Dataset</span> 21.145 ulasan Play Store</li>
                  <li className="flex gap-2"><span className="text-[#5a7975] w-20 shrink-0">Akurasi</span> 74,50% (macro-F1 72,78%)</li>
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
