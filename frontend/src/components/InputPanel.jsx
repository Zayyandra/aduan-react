import { useState, useRef } from "react";

const CONTOH = [
  "Aplikasi Mobile JKN error terus, tidak bisa cek status BPJS",
  "PPDB online bermasalah, anak saya tidak bisa daftar sekolah negeri",
  "KRL selalu telat dan penuh sesak setiap pagi hari kerja",
];

const MIN_LEN = 8;

export default function InputPanel({ onSubmit, loading }) {
  const [teks, setTeks] = useState("");
  const [shake, setShake] = useState(false);
  const taRef = useRef(null);

  const tooShort = teks.trim().length > 0 && teks.trim().length < MIN_LEN;
  const empty = teks.trim().length === 0;

  const submit = () => {
    if (empty || tooShort) {
      setShake(true);
      taRef.current?.focus();
      setTimeout(() => setShake(false), 420);
      return;
    }
    onSubmit(teks.trim());
  };
  const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit(); };

  return (
    <div className="card" style={{ padding: 24 }}>
      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <label style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-3)" }}>
          Teks Aduan
        </label>
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: tooShort ? "var(--danger)" : "var(--text-2)",
          background: tooShort ? "var(--danger-bg)" : "var(--surface-2)",
          padding: "4px 9px", borderRadius: 6,
          border: `1px solid ${tooShort ? "#fecaca" : "var(--border)"}`,
        }}>
          {teks.length} karakter
        </span>
      </div>

      {/* Textarea */}
      <textarea
        ref={taRef}
        value={teks}
        onChange={(e) => setTeks(e.target.value)}
        onKeyDown={onKey}
        placeholder="Ketik atau tempel teks aduan layanan publik di sini…"
        rows={6}
        className="analyze-textarea"
        style={{
          borderColor: shake ? "var(--danger)" : undefined,
          animation: shake ? "shakeX 0.4s ease" : undefined,
        }}
      />
      {tooShort && (
        <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, fontWeight: 500 }}>
          Teks terlalu pendek — minimal {MIN_LEN} karakter agar model dapat menganalisis konteks.
        </div>
      )}

      {/* Contoh */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-3)", marginBottom: 9, textTransform: "uppercase", letterSpacing: ".06em" }}>
          Contoh aduan
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {CONTOH.map((c, i) => (
            <button
              key={i}
              onClick={() => setTeks(c)}
              style={{
                textAlign: "left", fontSize: 13, color: "var(--brand)",
                background: "var(--brand-pale)", border: "1px solid var(--brand-border)",
                borderRadius: 9, padding: "9px 12px", cursor: "pointer",
                lineHeight: 1.45, transition: "background 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-muted)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--brand-pale)"; }}
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
        style={{
          marginTop: 20, width: "100%",
          background: empty ? "var(--border-2)" : "var(--brand)",
          color: "#fff", border: "none", borderRadius: "var(--r-lg)",
          padding: "13px 0", fontSize: 15, fontWeight: 700,
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.6 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
          boxShadow: empty ? "none" : "0 4px 14px -4px rgba(15,118,110,0.4)",
          transition: "all 0.18s ease",
        }}
        onMouseEnter={e => { if (!empty && !loading) e.currentTarget.style.background = "var(--brand-dark)"; }}
        onMouseLeave={e => { if (!empty && !loading) e.currentTarget.style.background = "var(--brand)"; }}
      >
        {loading ? (
          <>
            <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} className="animate-spin" />
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
      <div style={{ marginTop: 11, fontSize: 12, color: "var(--text-2)", textAlign: "center", fontWeight: 500 }}>
        Ctrl + Enter untuk klasifikasi cepat
      </div>

      <style>{`
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}