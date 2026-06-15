import { useState } from "react";

const CONTOH = [
  "Aplikasi Mobile JKN error terus, tidak bisa cek status BPJS",
  "PPDB online bermasalah, anak saya tidak bisa daftar sekolah negeri",
  "KRL selalu telat dan penuh sesak setiap pagi hari kerja",
];

export default function InputPanel({ onSubmit, loading }) {
  const [teks, setTeks] = useState("");

  const submit = () => {
    if (!teks.trim()) { alert("Masukkan teks aduan dulu."); return; }
    onSubmit(teks.trim());
  };
  const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit(); };

  return (
    <div className="bg-white border border-[#d4e5e2] rounded-2xl p-6 shadow-sm">
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3a4a46]">
          Teks Aduan
        </label>
        <span className="text-[12.5px] text-[#41514d] font-mono font-medium bg-[#f4faf9] px-2.5 py-1 rounded border border-[#d4e5e2]">
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
        className="w-full resize-y border border-[#d4e5e2] rounded-xl p-4 text-[15.5px] bg-[#f4faf9] text-[#0f1f1d] leading-relaxed outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 transition placeholder-[#6b827d]"
      />

      {/* Contoh */}
      <div className="mt-4">
        <div className="text-[13px] text-[#3a4a46] font-semibold mb-2 uppercase tracking-[0.06em]">
          Contoh aduan:
        </div>
        <div className="flex flex-col gap-1.5">
          {CONTOH.map((c, i) => (
            <button
              key={i}
              onClick={() => setTeks(c)}
              className="text-left text-[13px] text-[#0f766e] bg-[#f0fdfa] hover:bg-[#ccefeb] border border-[#ccefeb] rounded-lg px-3 py-2 transition-colors leading-snug"
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
        className="mt-5 w-full bg-[#0f766e] hover:bg-[#0d5c56] disabled:opacity-50 text-white rounded-xl py-3.5 text-[15px] font-semibold transition-colors flex items-center justify-center gap-2.5 shadow-md shadow-[#0f766e]/20"
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
      <div className="mt-3 text-[12.5px] text-[#5a7975] font-medium text-center">
        Ctrl + Enter untuk klasifikasi cepat
      </div>
    </div>
  );
}