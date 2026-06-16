import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01", tag: "Data Source", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd",
    h: "Google Play Store",
    p: "Ulasan aplikasi layanan publik pemerintah berbahasa Indonesia — sumber data autentik dari 14 aplikasi pemerintah.",
    sub: "play store scraper",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    ),
  },
  {
    num: "02", tag: "Scraping", color: "#b45309", bg: "#fffbeb", border: "#fcd34d",
    h: "14 Aplikasi Pemerintah",
    p: "Mobile JKN, KRL Access, PPDB, PLN Mobile, M-Paspor dan lainnya. Filter review pendek, Inggris, dan duplikat.",
    sub: "google-play-scraper",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    num: "03", tag: "Preprocessing", color: "#15803d", bg: "#f0fdf4", border: "#86efac",
    h: "Filter + Label Otomatis",
    p: "Dedup, filter teks generik, label sentimen otomatis dari rating bintang (★1–2=negatif, ★3=netral, ★4–5=positif).",
    sub: "rating → sentimen label",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
  },
  {
    num: "04", tag: "Fine-tuning", color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd",
    h: "IndoBERT Fine-tuned",
    p: "Fine-tune indobert-base-p1 dari HuggingFace. GPU T4 Google Colab, 3 epoch, batch 16, 21.145 data latih.",
    sub: "indobert-base-p1 · T4 GPU",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: "05", tag: "Deployment", color: "#0f766e", bg: "#f0fdfa", border: "#5eead4",
    h: "React + FastAPI",
    p: "Inferensi real-time via FastAPI. Frontend React + Vite + Tailwind. Deploy Vercel (frontend) + HuggingFace Spaces (backend).",
    sub: "vercel · huggingface spaces",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

function ZCard({ step, idx }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const isLeft = idx % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cardStyle = {
    opacity: vis ? 1 : 0,
    transform: vis ? "translateX(0)" : `translateX(${isLeft ? -36 : 36}px)`,
    transition: `opacity 0.55s ${idx * 0.08}s ease, transform 0.55s ${idx * 0.08}s cubic-bezier(0.22,1,0.36,1)`,
  };

  const nodeStyle = {
    opacity: vis ? 1 : 0,
    transform: vis ? "scale(1)" : "scale(0.5)",
    transition: `opacity 0.4s ${idx * 0.08 + 0.12}s ease, transform 0.4s ${idx * 0.08 + 0.12}s cubic-bezier(0.34,1.56,0.64,1)`,
  };

  const card = (
    <div
      className="pipe-card"
      style={{
        ...cardStyle,
        borderLeft: isLeft ? `4px solid ${step.color}` : undefined,
        borderRight: !isLeft ? `4px solid ${step.color}` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {step.icon(step.color)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: step.color, marginBottom: 4 }}>
            {step.num} · {step.tag}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--color-ink)", marginBottom: 6, letterSpacing: "-0.015em" }}>
            {step.h}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text)", lineHeight: 1.65 }}>
            {step.p}
          </p>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11.5, fontWeight: 600, color: step.color, marginTop: 8 }}>
            {step.sub}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 68px 1fr", alignItems: "center" }}>
      {isLeft ? card : <div />}

      {/* Node */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            ...nodeStyle,
            width: 40, height: 40, borderRadius: "50%",
            background: step.color,
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: 14, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 0 4px white, 0 0 0 7px ${step.color}35`,
            zIndex: 2, position: "relative",
          }}
        >
          {idx + 1}
        </div>
      </div>

      {!isLeft ? card : <div />}
    </div>
  );
}

export default function PipelineSection() {
  return (
    <section id="pipeline" className="zone-soft" style={{ padding: "var(--space-20) 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>

        <div className="text-center" style={{ maxWidth: 560, margin: "0 auto 52px" }}>
          <div className="reveal badge-brand mb-3" style={{ display: "inline-flex", marginBottom: 12 }}>Arsitektur Sistem</div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, marginBottom: 12, transitionDelay: "0.07s" }}>
            Pipeline Klasifikasi
          </h2>
          <p className="reveal" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text)", lineHeight: 1.7, transitionDelay: "0.14s" }}>
            Lima tahap dari scraping ulasan Play Store hingga inferensi real-time di web app.
          </p>
        </div>

        {/* Zigzag */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{
            position: "absolute", left: "50%", top: 20, bottom: 20,
            width: 2, transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, transparent, var(--color-border-mid) 8%, var(--color-border-mid) 92%, transparent)",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {STEPS.map((s, i) => <ZCard key={s.num} step={s} idx={i} />)}
          </div>
        </div>

        {/* Metodologis note */}
        <div
          className="reveal"
          style={{
            marginTop: 40,
            background: "linear-gradient(135deg, #fffdf0 0%, #fefce8 100%)",
            border: "1.5px solid #fde68a",
            borderRadius: "var(--r-xl)",
            padding: "20px 24px",
            display: "flex", gap: 16, alignItems: "flex-start",
            transitionDelay: "0.3s",
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, flexShrink: 0 }}>!</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#92400e", marginBottom: 6 }}>Catatan Metodologis — Transparansi Akurasi</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#78350f", lineHeight: 1.7, margin: 0 }}>
              Akurasi <strong style={{ fontFamily: "var(--font-display)" }}>74,50%</strong> pada data uji adalah angka jujur dari dataset Play Store tanpa keyword scraping.{" "}
              <em>Keyword-stripped evaluation</em> menunjukkan 73,6% pada 96% test set — model belajar dari konteks teks, bukan menghafal kata kunci.
              Sentimen dilabeli otomatis dari rating bintang (★1–2 negatif, ★3 netral, ★4–5 positif), bukan model terpisah.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #pipeline .zigzag-row { grid-template-columns: 36px 1fr !important; }
          #pipeline .zigzag-row > div:last-child:not(:nth-child(2)) { display: none !important; }
          #pipeline .center-line { display: none; }
        }
      `}</style>
    </section>
  );
}