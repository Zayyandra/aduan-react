import { useEffect, useState } from "react";

export default function Navbar({ onModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const brandLinkStyle = {
    display: "flex", alignItems: "center", gap: 12, textDecoration: "none"
  };

  const logoStyle = {
    width: 38, height: 38, borderRadius: 10,
    background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800,
    fontSize: 16, userSelect: "none",
    boxShadow: "0 4px 14px -4px rgba(15,118,110,0.55)",
  };

  const mulaiStyle = {
    fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600,
    background: "var(--color-brand)", color: "#fff",
    padding: "9px 20px", borderRadius: "var(--r-md)",
    textDecoration: "none", display: "inline-flex", alignItems: "center",
    border: "none", cursor: "pointer",
    transition: "background 0.15s ease",
  };

  return (
    <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">

        {/* Brand */}
        <a href="/" style={brandLinkStyle}>
          <div style={logoStyle}>A</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--color-ink)", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
              AduanNLP
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.2 }}>
              Klasifikasi Pengaduan · IndoBERT
            </div>
          </div>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center" style={{ gap: 4 }}>
          {[["cara", "Cara Kerja"], ["faq", "FAQ"], ["tentang", "Tentang"]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => onModal(id)}
              style={{
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500,
                color: "var(--color-text)", padding: "7px 14px",
                borderRadius: "var(--r-md)", background: "transparent",
                border: "none", cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--color-surface-2)";
                e.currentTarget.style.color = "var(--color-brand)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-text)";
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* Akurasi badge */}
          <div
            className="hidden sm:flex items-center"
            style={{
              gap: 7,
              background: "var(--color-brand-muted)",
              border: "1px solid #b6e3dc",
              borderRadius: 99,
              padding: "6px 14px",
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--color-brand)",
              animation: "pulseSoft 2s ease infinite",
              display: "inline-block",
            }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "#0b5a54" }}>
              Akurasi 74,50%
            </span>
          </div>

          {/* Tombol Mulai */}
          <button
            onClick={() => {
              const el = document.getElementById("app-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={mulaiStyle}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--color-brand-dark)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--color-brand)"; }}
          >
            Mulai
          </button>

        </div>
      </div>
    </nav>
  );
}