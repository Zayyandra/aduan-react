import { useState } from "react";

const CONTOH = [
  "Sudah sebulan tidak ada petugas yang datang bersihin got",
  "Anakku tidak bisa daftar sekolah padahal nilainya bagus",
  "Setiap pagi macet parah, angkutan umum tidak memadai",
];

export default function InputPanel({ onSubmit, loading }) {
  const [teks, setTeks] = useState("");

  const submit = () => {
    if (!teks.trim()) { alert("Masukkan teks aduan dulu."); return; }
    onSubmit(teks.trim());
  };
  const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit(); };

  return (
    <div className="bg-white border border-[#dde5ef] rounded-2xl p-6 shadow-sm">
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3a4a60]">
          Teks Aduan
        </label>
        <span className="text-[12.5px] text-[#3a4a60] font-mono font-medium bg-[#f5f8fc] px-2.5 py-1 rounded border border-[#dde5ef]">
          {teks.length} karakter
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={teks}
        onChange={(e) => setTeks(e.target.value)}
        onKeyDown={onKey}
        placeholder="Ketik atau tempel teks aduan layanan publik di sini…"
        rows={6}
        className="w-full resize-y border border-[#dde5ef] rounded-xl p-4 text-[15.5px] bg-[#f5f8fc] text-[#14233b] leading-relaxed outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15 transition placeholder-[#8493a8]"
      />

      {/* Contoh */}
      <div className="mt-4">
        <div className="text-[13px] text-[#3a4a60] font-semibold mb-2 uppercase tracking-[0.06em]">
          Contoh aduan:
        </div>
        <div className="flex flex-col gap-1.5">
          {CONTOH.map((c, i) => (
            <button
              key={i}
              onClick={() => setTeks(c)}
              className="text-left text-[13px] text-[#1e3a5f] bg-[#eef2f7] hover:bg-[#dde7f3] border border-[#ccd8e8] rounded-lg px-3 py-2 transition-colors leading-snug"
            >
              "{c}"
            </button>
          ))}
        </div>
      </div>

      {/* Tombol */}
      <button
        onClick={submit}
        disabled={loading}
        className="mt-5 w-full bg-[#1e3a5f] hover:bg-[#15293f] disabled:opacity-50 text-white rounded-xl py-3.5 text-[15px] font-semibold transition-colors flex items-center justify-center gap-2.5 shadow-md shadow-[#1e3a5f]/20"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Menganalisis…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Klasifikasikan
          </>
        )}
      </button>
      <div className="mt-3 text-[12.5px] text-[#5a6b80] font-medium text-center">
        Ctrl + Enter untuk klasifikasi cepat
      </div>
    </div>
  );
}
