import { useEffect, useRef } from "react";
import { KATEGORI } from "./categories";

const DIST = {
  kesehatan:     4513,
  transportasi:  4429,
  administrasi:  4167,
  infrastruktur: 4158,
  pendidikan:    2318,
  kebersihan:    1560,
};
const TOTAL = 21145;
const SENTI = [
  { label: "Negatif", n: 11537, pct: 54.6, c: "var(--danger)" },
  { label: "Positif", n: 8470,  pct: 40.1, c: "var(--success)" },
  { label: "Netral",  n: 1138,  pct: 5.4,  c: "var(--text-3)" },
];

function AnimatedBar({ pct, color }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = `${pct}%`; obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div style={{ height: 10, borderRadius: 5, background: "var(--surface-3)", overflow: "hidden" }}>
      <div ref={ref} className="bar-animate" style={{ height: "100%", borderRadius: 5, opacity: 0.9, width: "0%", background: color, transition: "width 0.9s ease-out" }} />
    </div>
  );
}

export default function InfoStrip() {
  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 44px" }}>
        <div className="reveal badge-eyebrow">Statistik Dataset</div>
        <h2 className="reveal" style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, margin: "10px 0", transitionDelay: ".08s" }}>
          Mengenal Data Pelatihan
        </h2>
        <p className="reveal" style={{ fontSize: 14.5, color: "var(--text)", lineHeight: 1.7, transitionDelay: ".16s" }}>
          Dikumpulkan dari ulasan Google Play Store aplikasi layanan publik pemerintah, diberi label sentimen otomatis dari rating bintang.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 18 }}>
        {/* Distribusi kategori */}
        <div className="reveal-left card card-lift" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", fontWeight: 700 }}>Distribusi per Kategori</div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>n = 21.145</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(DIST).sort((a, b) => b[1] - a[1]).map(([label, jml]) => {
              const warna = KATEGORI[label]?.warna || "var(--brand)";
              const pct = ((jml / TOTAL) * 100).toFixed(1);
              return (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "110px 1fr 96px", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 500, textTransform: "capitalize", color: "var(--ink)" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: warna, flexShrink: 0 }} />
                    {label}
                  </div>
                  <AnimatedBar pct={pct} color={warna} />
                  <div style={{ textAlign: "right", fontSize: 13, color: "var(--text-3)" }}>
                    <strong style={{ color: "var(--ink)" }}>{jml.toLocaleString("id-ID")}</strong> · {pct.replace(".", ",")}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribusi sentimen */}
        <div className="reveal-right card card-lift" style={{ padding: 24, transitionDelay: ".12s" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)", fontWeight: 700 }}>Distribusi Sentimen</div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>rating bintang</div>
          </div>
          <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", margin: "8px 0 18px" }}>
            {SENTI.map(s => <div key={s.label} style={{ height: "100%", width: `${s.pct}%`, background: s.c }} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {SENTI.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: s.c }} />
                  {s.label}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>
                  <strong style={{ color: "var(--ink)" }}>{s.n.toLocaleString("id-ID")}</strong> · {s.pct.toString().replace(".", ",")}%
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: "var(--brand-muted)", border: "1px solid var(--brand-border)", borderRadius: 11, padding: "13px 15px", fontSize: 13.5, color: "#0c5b54", lineHeight: 1.6 }}>
            <strong style={{ color: "#0d5c56" }}>Label otomatis:</strong> sentimen dari rating bintang Play Store — ★1–2 negatif, ★3 netral, ★4–5 positif.
          </div>
        </div>
      </div>
    </div>
  );
}