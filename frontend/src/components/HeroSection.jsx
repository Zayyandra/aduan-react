import { useEffect, useRef, useState } from "react";

function parseID(str) {
  const clean = str.replace(/[^0-9,]/g, "");
  return parseFloat(clean.replace(",", ".")) || 0;
}

function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = target; return; }
    const hasPct = target.includes("%");
    const hasComma = target.includes(",");
    const hasDot = /\d\.\d{3}/.test(target);
    const num = parseID(target);
    const dec = hasComma ? 2 : 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = num * ease;
        let d;
        if (hasDot && !hasComma) d = Math.round(val).toLocaleString("id-ID");
        else if (hasComma) d = val.toFixed(dec).replace(".", ",");
        else d = Math.round(val).toString();
        if (hasPct) d += "%";
        el.textContent = d;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return ref;
}

const DEMOS = [
  {
    id: 0,
    teks: "Aplikasi Mobile JKN error terus, tidak bisa cek riwayat klaim BPJS saya.",
    kat: "Kesehatan", conf: 88,
    kc: "#be123c", kb: "#fff1f3",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    bars: [
      { l: "Kesehatan", v: 88, c: "#be123c" },
      { l: "Administrasi", v: 7, c: "#0f766e" },
      { l: "Infrastruktur", v: 3, c: "#2563eb" },
      { l: "Transportasi", v: 2, c: "#7c3aed" },
    ],
  },
  {
    id: 1,
    teks: "PPDB online bermasalah, server down saat jam pendaftaran. Anak saya gagal daftar.",
    kat: "Pendidikan", conf: 91,
    kc: "#b45309", kb: "#fffbeb",
    senti: "Negatif", sc: "#dc2626", sb: "#fef2f2",
    bars: [
      { l: "Pendidikan", v: 91, c: "#b45309" },
      { l: "Administrasi", v: 6, c: "#0f766e" },
      { l: "Infrastruktur", v: 2, c: "#2563eb" },
      { l: "Kesehatan", v: 1, c: "#be123c" },
    ],
  },
  {
    id: 2,
    teks: "KRL Access sangat membantu pantau jadwal kereta real-time. Tidak perlu antri tiket.",
    kat: "Transportasi", conf: 80,
    kc: "#2563eb", kb: "#eff6ff",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    bars: [
      { l: "Transportasi", v: 80, c: "#2563eb" },
      { l: "Administrasi", v: 11, c: "#0f766e" },
      { l: "Infrastruktur", v: 6, c: "#7c3aed" },
      { l: "Kesehatan", v: 3, c: "#be123c" },
    ],
  },
  {
    id: 3,
    teks: "KTP digital via Identitas Kependudukan mudah sekali, tidak perlu ke Disdukcapil.",
    kat: "Administrasi", conf: 74,
    kc: "#0f766e", kb: "#f0fdfa",
    senti: "Positif", sc: "#16a34a", sb: "#f0fdf4",
    bars: [
      { l: "Administrasi", v: 74, c: "#0f766e" },
      { l: "Kesehatan", v: 13, c: "#be123c" },
      { l: "Pendidikan", v: 9, c: "#b45309" },
      { l: "Infrastruktur", v: 4, c: "#2563eb" },
    ],
  },
];

function DemoCard() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [barKey, setBarKey] = useState(0);
  const timer = useRef(null);

  const advance = () => {
    setVisible(false);
    setTimeout(() => {
      setIdx((i) => (i + 1) % DEMOS.length);
      setBarKey((k) => k + 1);
      setVisible(true);
    }, 220);
  };

  const go = (next) => {
    clearInterval(timer.current);
    setVisible(false);
    setTimeout(() => {
      setIdx(next);
      setBarKey((k) => k + 1);
      setVisible(true);
    }, 220);
    timer.current = setInterval(advance, 3600);
  };

  useEffect(() => {
    timer.current = setInterval(advance, 3600);
    return () => clearInterval(timer.current);
  }, []);

  const d = DEMOS[idx];

  return (
    <div className="demo-card">
      {/* Header */}
      <div className="demo-card-header">
        <div className="demo-card-live">
          <span className="demo-card-live-dot" />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "#0b5a54", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Demo Langsung
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ background: "#ddf3ef", color: "#0b5a54", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6, fontFamily: "var(--font-display)" }}>
            IndoBERT
          </span>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>
            · Play Store
          </span>
        </div>
      </div>

      {/* Input area */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", marginBottom: 8 }}>
          Ulasan Aplikasi
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1.5px solid var(--color-border)",
            borderRadius: "var(--r-lg)",
            padding: "12px 14px",
            fontSize: 13.5,
            fontFamily: "var(--font-body)",
            color: "var(--color-ink)",
            lineHeight: 1.55,
            fontWeight: 500,
            minHeight: 60,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}
        >
          {d.teks}
        </div>
      </div>

      {/* Result area */}
      <div
        style={{
          padding: "12px 16px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.28s ease 0.06s, transform 0.28s ease 0.06s",
        }}
      >
        {/* Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ background: d.kb, color: d.kc, fontSize: 13, fontWeight: 700, padding: "6px 12px", borderRadius: 10, fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.kc, display: "inline-block" }} />
            {d.kat}
          </span>
          <span style={{ background: d.sb, color: d.sc, fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 8, fontFamily: "var(--font-display)" }}>
            {d.senti}
          </span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, color: d.kc }}>
            {d.conf}%
          </span>
        </div>

        {/* Probability bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {d.bars.map((b) => (
            <div key={b.l + barKey} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: "var(--color-text)", width: 86, flexShrink: 0, fontFamily: "var(--font-body)" }}>
                {b.l}
              </span>
              <div style={{ flex: 1, height: 5, background: "var(--color-surface-3)", borderRadius: 99, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${b.v}%`, height: "100%",
                    background: b.c, opacity: 0.75, borderRadius: 99,
                    animation: "barGrow 0.7s cubic-bezier(0.22,1,0.36,1) both",
                  }}
                />
              </div>
              <span style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-text-muted)", width: 28, textAlign: "right" }}>
                {b.v}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 14, paddingTop: 4 }}>
        {DEMOS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Demo ${i + 1}`}
            style={{
              height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
              width: i === idx ? 22 : 6,
              background: i === idx ? "var(--color-brand)" : "var(--color-border-mid)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ n, l, delay }) {
  const ref = useCountUp(n);
  return (
    <div className="stat-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div ref={ref} className="stat-card-num">{n}</div>
      <div className="stat-card-label">{l}</div>
    </div>
  );
}

export default function HeroSection({ onStart }) {
  const stats = [
    { n: "21.145", l: "Ulasan Play Store" },
    { n: "74,50%", l: "Akurasi IndoBERT" },
    { n: "72,78%", l: "Macro-F1 Score" },
    { n: "6", l: "Kategori Layanan" },
  ];

  return (
    <header className="zone-hero relative overflow-hidden" style={{ paddingTop: 68 }}>
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="hero-blob-3" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(15,118,110,0.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent 82%)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent 82%)",
        }}
      />

      {/* Main grid */}
      <div
        className="relative"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(48px,6vw,80px) clamp(16px,4vw,32px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
        }}
      >
        {/* LEFT col */}
        <div>
          {/* Badge */}
          <div
            className="reveal badge-brand"
            style={{ display: "inline-flex", marginBottom: 20 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-brand)", display: "inline-block" }} />
            Praktikum NLP · Politeknik Caltex Riau
          </div>

          {/* H1 */}
          <h1
            className="reveal"
            style={{
              fontSize: "clamp(34px,4.8vw,60px)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              marginBottom: 18,
              transitionDelay: "0.07s",
            }}
          >
            Klasifikasi Aduan
            <br />
            <span style={{ color: "var(--color-brand)" }}>Layanan Publik</span>
            <br />
            <span style={{ color: "var(--color-ink-3)" }}>Otomatis</span>
          </h1>

          {/* Lead paragraph */}
          <p
            className="reveal"
            style={{
              fontSize: "clamp(14px,1.3vw,17px)",
              fontFamily: "var(--font-body)",
              color: "var(--color-text)",
              lineHeight: 1.72,
              maxWidth: 500,
              marginBottom: 28,
              transitionDelay: "0.14s",
            }}
          >
            Sistem NLP berbahasa Indonesia yang mengklasifikasikan ulasan aplikasi
            layanan publik ke{" "}
            <strong style={{ color: "var(--color-brand)", fontWeight: 700 }}>6 bidang</strong>
            {" "}dan mendeteksi sentimennya — ditenagai IndoBERT fine-tuned dari
            21.145 ulasan Google Play Store.
          </p>

          {/* CTA buttons */}
          <div
            className="reveal"
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36, transitionDelay: "0.2s" }}
          >
            <button
              onClick={onStart}
              className="btn btn-primary ping-ring"
              style={{ fontSize: 15, padding: "13px 28px" }}
            >
              Coba Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#pipeline" className="btn btn-ghost" style={{ fontSize: 15 }}>
              Lihat Pipeline
            </a>
          </div>

          {/* Stats grid */}
          <div
            className="stagger-parent"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}
          >
            {stats.map(({ n, l }, i) => (
              <StatCard key={l} n={n} l={l} delay={i * 0.09} />
            ))}
          </div>
        </div>

        {/* RIGHT col — Demo card */}
        <div className="reveal-right">
          <DemoCard />
        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 768px) {
          header .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </header>
  );
}