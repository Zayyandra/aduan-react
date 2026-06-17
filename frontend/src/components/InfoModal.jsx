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
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map(([q, a], i) => (
        <div key={i} className={`faq-item${buka === i ? " open" : ""}`}>
          <button onClick={() => setBuka(buka === i ? null : i)} className="faq-q" style={{ width: "100%", border: "none", background: "transparent" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{q}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="faq-a">{a}</div>
        </div>
      ))}
    </div>
  );
}

export default function InfoModal({ jenis, onClose }) {
  const judul = { cara: "Cara Kerja", faq: "Pertanyaan Umum", tentang: "Tentang Sistem" }[jenis];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        background: "rgba(12,30,28,0.5)", backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", border: "1px solid var(--border)", borderRadius: 20,
          maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid var(--border)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "20px 20px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--brand-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--brand)", fontWeight: 800, fontSize: 14 }}>
                {jenis === "cara" ? "?" : jenis === "faq" ? "≡" : "i"}
              </span>
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: "var(--ink)" }}>{judul}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, color: "var(--text-2)", background: "transparent", border: "none",
              cursor: "pointer", fontSize: 22, fontWeight: 300,
            }}
          >×</button>
        </div>

        <div style={{ padding: 24 }}>
          {jenis === "cara" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", marginBottom: 12 }}>Tiga Langkah</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {CARA.map(([j, d], i) => (
                    <div key={j} style={{ display: "flex", gap: 14, border: "1px solid var(--border)", borderRadius: 12, padding: 14, background: "var(--surface-2)" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 14, marginBottom: 3 }}>{j}</div>
                        <p style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", marginBottom: 12 }}>Keunggulan</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {UNGGUL.map(([j, d]) => (
                    <div key={j} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
                      <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 14, marginBottom: 3 }}>✓ {j}</div>
                      <p style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {jenis === "faq" && <Akordeon data={FAQ} />}

          {jenis === "tentang" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.7 }}>
                Sistem klasifikasi ulasan layanan publik berbasis NLP yang mengelompokkan ulasan ke 6 kategori menggunakan IndoBERT fine-tuned dari data Google Play Store, dikembangkan untuk Praktikum Natural Language Processing.
              </p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 16, background: "var(--surface-2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", marginBottom: 12 }}>Informasi Akademik</div>
                <ul style={{ fontSize: 13.5, color: "var(--ink)", display: "flex", flexDirection: "column", gap: 7, listStyle: "none" }}>
                  {[["Institusi", "Politeknik Caltex Riau"], ["Prodi", "Teknik Informatika"], ["Kelas", "3 TIF · Kelompok 3"], ["TA", "2025/2026"], ["Dataset", "21.145 ulasan Play Store"], ["Akurasi", "74,50% (macro-F1 72,78%)"]].map(([k, v]) => (
                    <li key={k} style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--text-2)", width: 78, flexShrink: 0 }}>{k}</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", marginBottom: 12 }}>Anggota Tim</div>
                <ul style={{ fontSize: 13.5, color: "var(--ink)", display: "flex", flexDirection: "column", gap: 7, listStyle: "none" }}>
                  {["Dion", "Muhammad Zidane", "Zayyandra Rajel Ahsan"].map(n => (
                    <li key={n} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "var(--warning-bg)", border: "1px solid #fde68a", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#92400e", marginBottom: 8 }}>Bukan Sistem Resmi</div>
                <p style={{ fontSize: 12.5, color: "#78350f", lineHeight: 1.6, margin: 0 }}>
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