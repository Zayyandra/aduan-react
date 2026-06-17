import { useState } from "react";
import { KATEGORI, keywordPemicu } from "./categories";

function EmptyState() {
  return (
    <div className="result-empty" style={{ minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--border-3)" strokeWidth="1.6" style={{ marginBottom: 16 }}>
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/>
      </svg>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Belum ada hasil</div>
      <p style={{ fontSize: 14, color: "var(--text)", maxWidth: 260, lineHeight: 1.6, margin: 0 }}>
        Masukkan teks aduan dan klik "Klasifikasikan" untuk melihat prediksi.
      </p>
    </div>
  );
}

const LOW = 0.6;

const SENTIMEN_CONFIG = {
  positif: { label: "Positif", bg: "var(--success-bg)", color: "var(--success)", dot: "#22c55e" },
  negatif: { label: "Negatif", bg: "var(--danger-bg)", color: "var(--danger)", dot: "#ef4444" },
  netral:  { label: "Netral",  bg: "var(--surface-2)", color: "var(--text-2)", dot: "var(--text-3)" },
};

function SentimenBadge({ sentimen, detail }) {
  const [showDetail, setShowDetail] = useState(false);
  const cfg = SENTIMEN_CONFIG[sentimen] || SENTIMEN_CONFIG.netral;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ink-3)", marginBottom: 9 }}>
        Sentimen
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => setShowDetail(v => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            borderRadius: 99, padding: "8px 14px", fontSize: 14, fontWeight: 700,
            background: cfg.bg, color: cfg.color, border: "none", cursor: "pointer",
          }}
          title="Klik untuk lihat detail"
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
          {cfg.label}
        </button>
        <span style={{ fontSize: 12.5, color: "var(--text)", fontWeight: 500 }}>
          +{detail.skor_positif} positif · -{detail.skor_negatif} negatif
        </span>
      </div>

      {showDetail && (detail.kata_positif.length > 0 || detail.kata_negatif.length > 0) && (
        <div style={{ marginTop: 11, borderRadius: 10, border: "1px solid var(--border)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {detail.kata_positif.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text)", width: 56, flexShrink: 0 }}>Positif:</span>
              {detail.kata_positif.map(k => (
                <span key={k} style={{ fontSize: 12, borderRadius: 5, padding: "2px 8px", background: "var(--success-bg)", color: "var(--success)" }}>{k}</span>
              ))}
            </div>
          )}
          {detail.kata_negatif.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text)", width: 56, flexShrink: 0 }}>Negatif:</span>
              {detail.kata_negatif.map(k => (
                <span key={k} style={{ fontSize: 12, borderRadius: 5, padding: "2px 8px", background: "var(--danger-bg)", color: "var(--danger)" }}>{k}</span>
              ))}
            </div>
          )}
        </div>
      )}

      <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 8, lineHeight: 1.6 }}>
        Dideteksi otomatis berbasis leksikon · Klik badge untuk detail kata
      </p>
    </div>
  );
}

export default function ResultCard({ hasil, teksInput }) {
  const [salin, setSalin] = useState(false);
  if (!hasil) return <EmptyState />;

  const meta = KATEGORI[hasil.kategori] || { warna: "var(--brand)", desc: "" };
  const entries = Object.entries(hasil.semua_skor).sort((a, b) => b[1] - a[1]);
  const ragu = hasil.confidence < LOW;
  const pemicu = keywordPemicu(teksInput, hasil.kategori);

  const doSalin = () => {
    const t =
      `Kategori: ${hasil.kategori} (${(hasil.confidence * 100).toFixed(1)}%)\n` +
      `Sentimen: ${hasil.sentimen}\n` +
      entries.map(([l, s]) => `  ${l}: ${(s * 100).toFixed(1)}%`).join("\n");
    navigator.clipboard.writeText(t);
    setSalin(true);
    setTimeout(() => setSalin(false), 1500);
  };

  return (
    <div className="result-card">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, paddingBottom: 20, borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ink-3)", marginBottom: 5 }}>
            Hasil Prediksi
          </div>
          <div style={{ fontWeight: 800, fontSize: 28, textTransform: "capitalize", lineHeight: 1, color: meta.warna }}>
            {hasil.kategori}
          </div>
          <div style={{ fontSize: 14, color: "var(--text)", marginTop: 8 }}>
            {(hasil.confidence * 100).toFixed(1)}% yakin · {meta.desc}
          </div>
        </div>
        <button
          onClick={doSalin}
          style={{
            fontSize: 13, border: `1.5px solid ${salin ? meta.warna : "var(--border)"}`,
            borderRadius: 8, padding: "8px 14px", background: "transparent",
            color: salin ? meta.warna : "var(--text)",
            cursor: "pointer", flexShrink: 0, fontWeight: 600, transition: "all 0.15s ease",
          }}
        >
          {salin ? "Tersalin!" : "Salin"}
        </button>
      </div>

      {hasil.sentimen && hasil.sentimen_detail && (
        <SentimenBadge sentimen={hasil.sentimen} detail={hasil.sentimen_detail} />
      )}

      {ragu && (
        <div style={{ marginBottom: 20, display: "flex", gap: 11, alignItems: "flex-start", background: "var(--brand-pale)", border: "1px solid var(--brand-border)", borderRadius: 10, padding: 14 }}>
          <span style={{ color: "var(--brand)", fontWeight: 800, lineHeight: 1, marginTop: 1, fontSize: 18 }}>!</span>
          <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ fontWeight: 700 }}>Keyakinan rendah.</strong> Teks mungkin di luar 6 kategori atau ambigu. Sebaiknya diverifikasi manual.
          </p>
        </div>
      )}

      {pemicu.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ink-3)", marginBottom: 9 }}>
            Kata kunci terdeteksi
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {pemicu.map(k => (
              <span key={k} style={{ fontSize: 13, borderRadius: 7, padding: "5px 11px", fontWeight: 600, background: meta.warna + "1a", color: meta.warna }}>{k}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ink-3)", marginBottom: 13 }}>
        Distribusi probabilitas
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {entries.map(([label, skor]) => {
          const m = KATEGORI[label] || { warna: "#999" };
          const top = label === hasil.kategori;
          return (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "110px 1fr 56px", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13.5, textTransform: "capitalize", color: top ? "var(--ink)" : "var(--text-2)", fontWeight: top ? 700 : 400 }}>{label}</span>
              <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 99, overflow: "hidden" }}>
                <div className="bar-animate" style={{ height: "100%", borderRadius: 99, width: `${skor * 100}%`, background: m.warna, opacity: top ? 1 : 0.4, transition: "width 0.7s ease-out" }} />
              </div>
              <span style={{ fontSize: 12.5, color: "var(--text-2)", textAlign: "right" }}>{(skor * 100).toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}