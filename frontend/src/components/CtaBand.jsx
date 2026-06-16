export default function CtaBand({ onStart }) {
  return (
    <section className="cta-band" style={{ padding: "var(--space-16) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 99, padding: "5px 14px",
            fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
            color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 18,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulseSoft 1.8s ease infinite" }} />
          Model Aktif · HuggingFace Spaces
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em",
            marginBottom: 12, lineHeight: 1.1,
          }}
        >
          Coba Klasifikasikan Ulasan Anda
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)", fontSize: 16,
            color: "rgba(255,255,255,0.7)", marginBottom: 32, lineHeight: 1.65,
          }}
        >
          Gratis, langsung, ditenagai IndoBERT yang dilatih dari 21.145 ulasan nyata aplikasi layanan publik.
        </p>

        <button
          onClick={onStart}
          className="btn"
          style={{
            background: "rgba(255,255,255,0.95)",
            color: "var(--color-brand)",
            fontSize: 15,
            fontWeight: 700,
            padding: "13px 32px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Mulai Analisis
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}