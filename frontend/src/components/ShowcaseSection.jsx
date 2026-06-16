import { useState, useEffect, useRef } from "react";

const TABS = [
  {
    key: "kesehatan", label: "Kesehatan",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: "#be123c", bg: "#fff1f3", border: "#fda4af",
    app: "Mobile JKN",
    teks: "Antrian di puskesmas lama banget, padahal sudah daftar online lewat Mobile JKN. Sistem e-puskesmas-nya sering down dan tidak responsif.",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    conf: 76,
    highlight: ["puskesmas", "Mobile JKN", "e-puskesmas", "daftar online"],
    dist: [
      { l: "Kesehatan", v: 76 }, { l: "Administrasi", v: 13 },
      { l: "Infrastruktur", v: 6 }, { l: "Pendidikan", v: 3 },
      { l: "Transportasi", v: 1 }, { l: "Kebersihan", v: 1 },
    ],
  },
  {
    key: "pendidikan", label: "Pendidikan",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    color: "#b45309", bg: "#fffbeb", border: "#fcd34d",
    app: "PPDB Online",
    teks: "PPDB online tahun ini sangat bermasalah. Server down saat jam pendaftaran puncak, anak saya tidak bisa submit berkas tepat waktu.",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    conf: 91,
    highlight: ["PPDB", "Server down", "pendaftaran", "submit berkas"],
    dist: [
      { l: "Pendidikan", v: 91 }, { l: "Administrasi", v: 5 },
      { l: "Infrastruktur", v: 2 }, { l: "Kesehatan", v: 1 },
      { l: "Transportasi", v: 1 },
    ],
  },
  {
    key: "transportasi", label: "Transportasi",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    color: "#2563eb", bg: "#eff6ff", border: "#93c5fd",
    app: "KRL Access",
    teks: "KRL Access sangat membantu pantau jadwal kereta real-time. Tidak perlu antri beli tiket fisik lagi. Sangat memudahkan commuter harian.",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    conf: 80,
    highlight: ["KRL Access", "jadwal kereta", "tiket", "commuter"],
    dist: [
      { l: "Transportasi", v: 80 }, { l: "Administrasi", v: 10 },
      { l: "Infrastruktur", v: 6 }, { l: "Kesehatan", v: 3 },
      { l: "Pendidikan", v: 1 },
    ],
  },
  {
    key: "administrasi", label: "Administrasi",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    color: "#0f766e", bg: "#f0fdfa", border: "#5eead4",
    app: "Identitas Kependudukan",
    teks: "Urus KTP digital lewat aplikasi Identitas Kependudukan sangat mudah dan cepat. Tidak perlu antre ke kantor Disdukcapil sama sekali.",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    conf: 74,
    highlight: ["KTP digital", "Identitas Kependudukan", "Disdukcapil", "antre"],
    dist: [
      { l: "Administrasi", v: 74 }, { l: "Kesehatan", v: 12 },
      { l: "Pendidikan", v: 9 }, { l: "Infrastruktur", v: 4 },
      { l: "Transportasi", v: 1 },
    ],
  },
];

function hlTeks(teks, words, color) {
  if (!words.length) return teks;
  const re = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return teks.split(re).map((p, i) =>
    re.test(p)
      ? <mark key={i} style={{ background: color + "22", color, fontWeight: 700, borderRadius: 3, padding: "1px 2px" }}>{p}</mark>
      : p
  );
}

function Bar({ label, value, color, isTop, delay }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(value), 60 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, width: 90, flexShrink: 0, fontWeight: isTop ? 700 : 500, color: isTop ? "var(--color-ink)" : "var(--color-text-muted)" }}>{label}</span>
      <div style={{ flex: 1, height: 7, background: "var(--color-surface-3)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", borderRadius: 99, background: isTop ? color : color + "55", transition: "width 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: isTop ? 800 : 500, color: isTop ? color : "var(--color-text-muted)", width: 32, textAlign: "right" }}>{value}%</span>
    </div>
  );
}

export default function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const [anim, setAnim] = useState(true);
  const timer = useRef(null);

  const go = (i) => {
    if (i === active) return;
    clearInterval(timer.current);
    setAnim(false);
    setTimeout(() => { setActive(i); setAnim(true); }, 200);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setAnim(false);
      setTimeout(() => { setActive(i => (i + 1) % TABS.length); setAnim(true); }, 200);
    }, 5000);
  };

  useEffect(() => { startTimer(); return () => clearInterval(timer.current); }, []);

  const t = TABS[active];

  return (
    <section id="contoh" className="zone-white" style={{ padding: "var(--space-20) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>

        {/* Header */}
        <div className="text-center mb-10" style={{ maxWidth: 580, margin: "0 auto 40px" }}>
          <div className="reveal badge-brand mb-3" style={{ display: "inline-flex", marginBottom: 12 }}>Contoh Hasil</div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, marginBottom: 12, transitionDelay: "0.07s" }}>
            Lihat Sistem Bekerja
          </h2>
          <p className="reveal" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text)", lineHeight: 1.7, transitionDelay: "0.14s" }}>
            Empat ulasan nyata dari Play Store — distribusi probabilitas tiap kategori ditampilkan secara real-time.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal flex flex-wrap gap-2 justify-center mb-5">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => go(i)}
              className="showcase-tab"
              style={active === i ? {
                background: tab.bg, color: tab.color,
                borderColor: tab.border,
                boxShadow: `0 0 0 3px ${tab.color}18`,
              } : {}}
              aria-pressed={active === i}
            >
              <span style={{ color: active === i ? tab.color : "var(--color-text-muted)" }}>{tab.icon}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: active === i ? 700 : 600 }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: "var(--color-surface-3)", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
          <div key={active} style={{ height: "100%", background: t.color, borderRadius: 99, animation: "progressFill 5s linear forwards" }} />
        </div>

        {/* Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 16,
            opacity: anim ? 1 : 0,
            transform: anim ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}
        >
          {/* Left panel */}
          <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)", borderRadius: "var(--card-radius)", padding: 24, boxShadow: "var(--card-shadow)", borderLeft: `4px solid ${t.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ background: t.bg, color: t.color, fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 8, fontFamily: "var(--font-display)" }}>
                {t.label}
              </span>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>via {t.app}</span>
              <span style={{ marginLeft: "auto", background: t.sb, color: t.sc, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 7, fontFamily: "var(--font-display)" }}>{t.senti}</span>
            </div>

            <blockquote
              style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.7, color: "var(--color-ink)", fontWeight: 500, marginBottom: 20, paddingLeft: 14, borderLeft: `2px solid ${t.color}50` }}
            >
              "{hlTeks(t.teks, t.highlight, t.color)}"
            </blockquote>

            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", marginBottom: 10 }}>
                Kata kunci terdeteksi
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {t.highlight.map(w => (
                  <span key={w} style={{ background: t.bg, color: t.color, fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 8, fontFamily: "var(--font-display)" }}>{w}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Confidence */}
            <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)", borderRadius: "var(--card-radius)", padding: 20, boxShadow: "var(--card-shadow)" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", marginBottom: 12 }}>Prediksi Model</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: t.color, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{t.label}</span>
                <span style={{ marginLeft: "auto", fontSize: 24, fontWeight: 800, color: t.color, fontFamily: "var(--font-display)" }}>{t.conf}%</span>
              </div>
              <div style={{ height: 8, background: "var(--color-surface-3)", borderRadius: 99, overflow: "hidden" }}>
                <div className="bar-animate" style={{ width: `${t.conf}%`, height: "100%", background: t.color, borderRadius: 99 }} />
              </div>
            </div>

            {/* Distribution */}
            <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)", borderRadius: "var(--card-radius)", padding: 20, boxShadow: "var(--card-shadow)", flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", marginBottom: 14 }}>
                Distribusi Probabilitas
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {t.dist.map((d, i) => (
                  <Bar key={d.l + active} label={d.l} value={d.v} color={t.color} isTop={d.l === t.label} delay={i * 55} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contoh .grid-showcase { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}