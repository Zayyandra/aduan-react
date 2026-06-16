import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01", tag: "Data Source", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe",
    h: "Play Store",
    detail: "Google Play Store",
    p: "21.145 ulasan dari 14 aplikasi layanan publik pemerintah berbahasa Indonesia.",
    sub: "play-store-scraper",
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    ),
  },
  {
    num: "02", tag: "Scraping", color: "#b45309", bg: "#fffbeb", border: "#fde68a",
    h: "Scraping",
    detail: "14 Aplikasi Pemerintah",
    p: "Mobile JKN, KRL Access, PPDB, PLN Mobile, M-Paspor. Filter review pendek & duplikat.",
    sub: "google-play-scraper",
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    num: "03", tag: "Preprocessing", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0",
    h: "Preprocessing",
    detail: "Filter + Label Sentimen",
    p: "Dedup, filter teks generik. Label sentimen otomatis dari rating bintang (★1–2=negatif, ★3=netral, ★4–5=positif).",
    sub: "rating → label",
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
  },
  {
    num: "04", tag: "Fine-tuning", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe",
    h: "IndoBERT",
    detail: "Fine-tuned Model",
    p: "Fine-tune indobert-base-p1. GPU T4 Colab, 3 epoch, batch 16. Akurasi 74,50% pada data uji.",
    sub: "indobert-base-p1",
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    num: "05", tag: "Deployment", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4",
    h: "Web App",
    detail: "React + FastAPI",
    p: "Inferensi real-time. Frontend Vercel, backend HuggingFace Spaces. Klasifikasi + sentimen sekaligus.",
    sub: "vercel · hf spaces",
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
];

function StepCard({ step, idx, total }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ${idx * 0.1}s ease, transform 0.5s ${idx * 0.1}s cubic-bezier(0.22,1,0.36,1)`,
        flex: 1, minWidth: 0,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? step.bg : "#fff",
          border: `1.5px solid ${hovered ? step.border : "var(--border)"}`,
          borderTop: `3px solid ${step.color}`,
          borderRadius: "var(--r-xl)",
          padding: "20px 18px",
          height: "100%",
          cursor: "default",
          transition: "all 0.22s ease",
          boxShadow: hovered
            ? `0 8px 24px rgba(0,0,0,0.07), 0 0 0 3px ${step.color}15`
            : "var(--shadow-sm)",
          transform: hovered ? "translateY(-3px)" : "none",
        }}
      >
        {/* Step number + icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: step.color,
            background: step.bg, border: `1px solid ${step.border}`,
            padding: "3px 8px", borderRadius: 5,
          }}>
            {step.num}
          </span>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: hovered ? "#fff" : step.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.22s ease",
          }}>
            {step.icon(step.color)}
          </div>
        </div>

        {/* Content */}
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 4 }}>{step.tag}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", marginBottom: 3, letterSpacing: "-.02em" }}>{step.h}</div>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: step.color, marginBottom: 10 }}>{step.detail}</div>
        <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.65, margin: 0 }}>{step.p}</p>

        {/* Sub tag */}
        <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 5,
          background: "var(--surface-2)", border: "1px solid var(--border)",
          padding: "3px 9px", borderRadius: 5 }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: step.color, display: "inline-block" }} />
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-2)" }}>{step.sub}</span>
        </div>
      </div>
    </div>
  );
}

export default function PipelineSection() {
  const [noteVis, setNoteVis] = useState(false);
  const noteRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNoteVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (noteRef.current) obs.observe(noteRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pipeline" className="zone-soft" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,32px)" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 52px" }}>
          <div className="reveal badge-eyebrow">Arsitektur Sistem</div>
          <h2 className="reveal" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 10, transitionDelay: ".07s" }}>
            Pipeline Klasifikasi
          </h2>
          <p className="reveal" style={{ fontSize: 14.5, color: "var(--text)", lineHeight: 1.72, transitionDelay: ".14s" }}>
            Lima tahap membangun sistem klasifikasi aduan layanan publik berbasis NLP.
          </p>
        </div>

        {/* Horizontal stepper */}
        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <div style={{
            position: "absolute", top: 30, left: "calc(10% + 20px)", right: "calc(10% + 20px)",
            height: 2,
            background: `linear-gradient(to right, #2563eb, #b45309, #15803d, #7c3aed, #0f766e)`,
            opacity: 0.25, pointerEvents: "none",
            borderRadius: 99,
          }} />

          {/* Step cards */}
          <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.num} step={s} idx={i} total={STEPS.length} />
            ))}
          </div>
        </div>

        {/* Flow indicator below */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, margin: "16px 0 36px", opacity: 0.5 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              {i < STEPS.length - 1 && (
                <div style={{ width: 60, height: 1.5, background: `linear-gradient(to right, ${s.color}, ${STEPS[i+1].color})` }} />
              )}
            </div>
          ))}
        </div>

        {/* Catatan metodologis */}
        <div
          ref={noteRef}
          style={{
            background: "linear-gradient(135deg, #fffdf0, #fefce8)",
            border: "1.5px solid #fde68a",
            borderRadius: "var(--r-xl)",
            padding: "18px 22px",
            display: "flex", gap: 14, alignItems: "flex-start",
            opacity: noteVis ? 1 : 0,
            transform: noteVis ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#fef3c7", color: "#b45309",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, flexShrink: 0,
          }}>!</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#92400e", marginBottom: 5 }}>
              Catatan Metodologis — Transparansi Akurasi
            </div>
            <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.72, margin: 0 }}>
              Akurasi <strong>74,50%</strong> adalah angka jujur dari dataset Play Store tanpa keyword scraping.{" "}
              <em>Keyword-stripped evaluation</em> menunjukkan 73,6% pada 96% test set — model belajar dari konteks teks, bukan menghafal kata kunci.
              Sentimen dilabeli otomatis dari rating bintang (★1–2 negatif, ★3 netral, ★4–5 positif), bukan model terpisah.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <style>{`
        @media (max-width: 900px) {
          #pipeline .step-row { flex-direction: column !important; }
          #pipeline .connector-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}