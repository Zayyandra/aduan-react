import { useState, useEffect, useRef } from "react";

const ITEMS = [
  {
    id: "kesehatan",
    kat: "Kesehatan", color: "#be123c", bg: "#fff1f3", border: "#fda4af",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    app: "Mobile JKN", conf: 76,
    teks: "Antrian di puskesmas lama banget, padahal sudah daftar online lewat Mobile JKN. Sistem e-puskesmas sering down dan tidak responsif.",
    highlight: ["puskesmas", "Mobile JKN", "e-puskesmas", "daftar online"],
    dist: [
      { l: "Kesehatan", v: 76 }, { l: "Administrasi", v: 13 },
      { l: "Infrastruktur", v: 6 }, { l: "Pendidikan", v: 3 },
      { l: "Transportasi", v: 1 }, { l: "Kebersihan", v: 1 },
    ],
  },
  {
    id: "pendidikan",
    kat: "Pendidikan", color: "#b45309", bg: "#fffbeb", border: "#fde68a",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    app: "PPDB Online", conf: 91,
    teks: "PPDB online tahun ini sangat bermasalah. Server down saat jam pendaftaran puncak, anak saya tidak bisa submit berkas tepat waktu.",
    highlight: ["PPDB", "Server down", "pendaftaran", "submit berkas"],
    dist: [
      { l: "Pendidikan", v: 91 }, { l: "Administrasi", v: 5 },
      { l: "Infrastruktur", v: 2 }, { l: "Kesehatan", v: 1 },
      { l: "Transportasi", v: 1 },
    ],
  },
  {
    id: "transportasi",
    kat: "Transportasi", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    app: "KRL Access", conf: 80,
    teks: "KRL Access sangat membantu pantau jadwal kereta real-time. Tidak perlu antri beli tiket fisik lagi. Sangat memudahkan commuter harian.",
    highlight: ["KRL Access", "jadwal kereta", "tiket", "commuter"],
    dist: [
      { l: "Transportasi", v: 80 }, { l: "Administrasi", v: 10 },
      { l: "Infrastruktur", v: 6 }, { l: "Kesehatan", v: 3 },
      { l: "Pendidikan", v: 1 },
    ],
  },
  {
    id: "administrasi",
    kat: "Administrasi", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    app: "Identitas Kependudukan", conf: 74,
    teks: "Urus KTP digital lewat aplikasi Identitas Kependudukan sangat mudah dan cepat. Tidak perlu antre ke kantor Disdukcapil sama sekali.",
    highlight: ["KTP digital", "Identitas Kependudukan", "Disdukcapil", "antre"],
    dist: [
      { l: "Administrasi", v: 74 }, { l: "Kesehatan", v: 12 },
      { l: "Pendidikan", v: 9 }, { l: "Infrastruktur", v: 4 },
      { l: "Transportasi", v: 1 },
    ],
  },
];

function hlTeks(teks, words, color) {
  const re = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return teks.split(re).map((p, i) =>
    re.test(p)
      ? <mark key={i} style={{ background: color + "20", color, fontWeight: 700, borderRadius: 3, padding: "1px 2px" }}>{p}</mark>
      : p
  );
}

function MiniBar({ label, value, color, isTop, animKey }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(value), 80);
    return () => clearTimeout(t);
  }, [value, animKey]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
      <span style={{ fontSize: 11, width: 82, flexShrink: 0, fontWeight: isTop ? 700 : 500, color: isTop ? "var(--ink)" : "var(--text-2)" }}>{label}</span>
      <div style={{ flex: 1, height: 5, background: "var(--surface-3)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", borderRadius: 99, background: isTop ? color : color + "45", transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <span style={{ fontSize: 10.5, fontWeight: isTop ? 800 : 500, color: isTop ? color : "var(--text-2)", width: 28, textAlign: "right" }}>{value}%</span>
    </div>
  );
}

// Gauge chart SVG
function ConfGauge({ value, color }) {
  const r = 44, cx = 56, cy = 56;
  const circ = Math.PI * r;
  const pct = value / 100;
  return (
    <svg width="112" height="72" viewBox="0 0 112 72">
      <path d={`M 12 56 A ${r} ${r} 0 0 1 100 56`} fill="none" stroke="var(--surface-3)" strokeWidth="10" strokeLinecap="round"/>
      <path d={`M 12 56 A ${r} ${r} 0 0 1 100 56`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${circ * pct} ${circ}`} style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)" }}/>
      <text x="56" y="60" textAnchor="middle" fontSize="18" fontWeight="900" fill={color} fontFamily="Inter, sans-serif">{value}%</text>
    </svg>
  );
}

// Card komponen untuk tiap item showcase (bento style)
function ShowCard({ item, isActive, onClick, animKey }) {
  const isPos = item.senti === "Positif";
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? item.bg : "#fff",
        border: `1.5px solid ${isActive ? item.border : "var(--border)"}`,
        borderRadius: "var(--r-xl)",
        padding: isActive ? 0 : "18px 16px",
        cursor: isActive ? "default" : "pointer",
        transition: "all 0.28s ease",
        boxShadow: isActive ? `0 0 0 3px ${item.color}20, var(--shadow-md)` : "var(--shadow-sm)",
        overflow: "hidden",
        height: isActive ? "auto" : undefined,
      }}
    >
      {!isActive ? (
        /* Collapsed preview */
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.kat}</span>
            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700,
              background: item.sb, color: item.sc,
              padding: "2px 7px", borderRadius: 5 }}>{item.senti}</span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            "{item.teks}"
          </p>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-2)" }}>
            via <strong style={{ fontWeight: 600 }}>{item.app}</strong> · klik untuk detail
          </div>
        </div>
      ) : (
        /* Expanded detail — bento grid layout */
        <div>
          {/* Header strip */}
          <div style={{ background: item.color, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-.01em" }}>{item.kat}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginLeft: 2 }}>· {item.app}</span>
            <span style={{ marginLeft: "auto", background: "rgba(255,255,255,.2)", color: "#fff",
              fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5 }}>{item.senti}</span>
          </div>

          <div style={{ padding: "16px 18px" }}>
            {/* Teks ulasan */}
            <blockquote style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink)", fontWeight: 500,
              borderLeft: `3px solid ${item.color}`, paddingLeft: 12, marginBottom: 14 }}>
              "{hlTeks(item.teks, item.highlight, item.color)}"
            </blockquote>

            {/* Bento 2-col */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {/* Gauge + confidence */}
              <div style={{ background: "#fff", borderRadius: "var(--r-lg)", padding: "14px 16px",
                border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 2 }}>Confidence</div>
                <ConfGauge value={item.conf} color={item.color} key={animKey} />
                <div style={{ fontSize: 11, color: "var(--text-2)", textAlign: "center" }}>Model yakin <strong style={{ color: item.color }}>{item.conf}%</strong></div>
              </div>

              {/* Keyword chips */}
              <div style={{ background: "#fff", borderRadius: "var(--r-lg)", padding: "14px 16px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 8 }}>Kata Kunci</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {item.highlight.map(w => (
                    <span key={w} style={{ background: item.bg, color: item.color, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 7, border: `1px solid ${item.border}` }}>{w}</span>
                  ))}
                </div>
                <div style={{ marginTop: 10, padding: "6px 10px", background: item.sb, borderRadius: 7, display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.sc, display: "inline-block" }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: item.sc }}>Sentimen: {item.senti}</span>
                </div>
              </div>

              {/* Distribusi - full width */}
              <div style={{ background: "#fff", borderRadius: "var(--r-lg)", padding: "14px 16px", border: "1px solid var(--border)", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>Distribusi Probabilitas</div>
                {item.dist.map((d) => (
                  <MiniBar key={d.l + animKey} label={d.l} value={d.v} color={item.color} isTop={d.l === item.kat} animKey={animKey} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef(null);

  const go = (i) => {
    clearInterval(timer.current);
    setActive(i);
    setAnimKey(k => k + 1);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive(i => (i + 1) % ITEMS.length);
      setAnimKey(k => k + 1);
    }, 5500);
  };

  useEffect(() => { startTimer(); return () => clearInterval(timer.current); }, []);

  return (
    <section id="contoh" className="zone-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,32px)" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
          <div className="reveal badge-eyebrow">Contoh Hasil</div>
          <h2 className="reveal" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 10, transitionDelay: ".07s" }}>
            Lihat Sistem Bekerja
          </h2>
          <p className="reveal" style={{ fontSize: 14.5, color: "var(--text)", lineHeight: 1.72, transitionDelay: ".14s" }}>
            Klik kartu untuk melihat detail prediksi, confidence score, dan distribusi probabilitas.
          </p>
        </div>

        {/* Bento grid — 4 cards, active one expands */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {ITEMS.map((item, i) => (
            <ShowCard
              key={item.id}
              item={item}
              isActive={i === active}
              onClick={() => go(i)}
              animKey={animKey}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 18 }}>
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(i)}
              style={{
                width: i === active ? 24 : 7, height: 7,
                borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                background: i === active ? item.color : "var(--border-2)",
                transition: "all 0.3s ease",
              }}
              aria-label={item.kat}
            />
          ))}
        </div>

        {/* Auto-cycle info */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span style={{ fontSize: 11.5, color: "var(--text-3)" }}>Berganti otomatis setiap 5 detik · Klik kartu untuk pilih manual</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #contoh .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}