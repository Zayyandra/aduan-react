import { useEffect, useRef } from "react";
import DemoCard from "./DemoCard";

// Parse angka format Indonesia: "12.279" → 12279, "90,52%" → 90.52
function parseID(str) {
  const clean = str.replace(/[^0-9,]/g, ""); // buang titik ribuan & suffix
  return parseFloat(clean.replace(",", ".")) || 0;
}

function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = target; return; }

    // Tentukan format output
    const hasPct   = target.includes("%");
    const hasComma = target.includes(","); // desimal Indonesia
    const hasDot   = /\d\.\d{3}/.test(target); // titik ribuan, mis 12.279
    const num = parseID(target);
    const dec = hasComma ? 2 : 0;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p    = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val  = num * ease;

        let display;
        if (hasDot && !hasComma) {
          // format ribuan pakai titik: 12.279
          display = Math.round(val).toLocaleString("id-ID");
        } else if (hasComma) {
          // desimal pakai koma: 90,52
          display = val.toFixed(dec).replace(".", ",");
        } else {
          display = Math.round(val).toString();
        }
        if (hasPct) display += "%";

        el.textContent = display;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target; // pastikan nilai akhir persis
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return ref;
}

function StatCard({ n, l, l2, delay = 0 }) {
  const ref = useCountUp(n);
  return (
    <div
      className="reveal card-lift bg-white border border-[#d4e5e2] rounded-[13px] px-4 py-5 shadow-sm text-center"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={ref}
        className="text-[#0f766e] font-mono font-semibold text-[22px] tracking-[-0.02em]"
      >
        {n}
      </div>
      <div className="text-[#516662] text-[13px] font-medium mt-1.5 leading-[1.35]">
        {l}
        {l2 && <span className="block text-[#7d918d] font-normal text-[12px]">{l2}</span>}
      </div>
    </div>
  );
}

export default function HeroSection({ onStart }) {
  const stats = [
    { n: "21.145",  l: "Ulasan Play Store" },
    { n: "74,42%",  l: "Akurasi IndoBERT" },
    { n: "73,46%",  l: "Macro-F1 Score" },
    { n: "6",       l: "Kategori layanan" },
  ];

  return (
    <header className="relative overflow-hidden bg-[#f4faf9]">
      {/* Animated blobs */}
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="hero-blob-3" />
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(15,118,110,0.055) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 80%)",
          maskImage: "linear-gradient(180deg,#000,transparent 80%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-[70px] lg:py-[84px]">
        {/* LEFT */}
        <div>
          {/* badge */}
          <div className="reveal inline-flex items-center gap-2 border border-[#ccefeb] bg-[#e6f7f5] rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
            <span className="text-[#0b5a54] text-[13px] font-semibold tracking-[0.1em] uppercase font-mono">
              Praktikum NLP · Politeknik Caltex Riau
            </span>
          </div>

          {/* heading */}
          <h1
            className="reveal text-[#0f1f1d] text-[40px] md:text-[53px] leading-[1.06] tracking-[-0.025em] font-extrabold mb-5"
            style={{ transitionDelay: "0.08s" }}
          >
            Klasifikasi Aduan<br />
            <span className="text-[#0f766e]">Layanan Publik</span> Otomatis
          </h1>

          {/* lead */}
          <p
            className="reveal text-[#475467] text-[17px] leading-relaxed max-w-[510px] mb-[30px] font-medium"
            style={{ transitionDelay: "0.16s" }}
          >
            Sistem NLP berbahasa Indonesia yang mengklasifikasikan ulasan
            aplikasi layanan publik pemerintah ke 6 bidang dan mendeteksi
            sentimennya — ditenagai IndoBERT fine-tuned dari ulasan Google Play Store.
          </p>

          {/* CTA */}
          <div
            className="reveal flex flex-wrap gap-3.5 mb-10"
            style={{ transitionDelay: "0.24s" }}
          >
            <button
              onClick={onStart}
              className="relative bg-[#0f766e] hover:bg-[#0d5c56] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2.5 shadow-[0_14px_28px_-12px_rgba(15,118,110,0.6)] hover:-translate-y-0.5 ping-ring overflow-visible"
            >
              Coba Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#pipeline"
              className="bg-white text-[#1a2e2a] border border-[#d4e5e2] hover:border-[#14b8a6] hover:text-[#0f766e] font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:-translate-y-0.5"
            >
              Lihat Pipeline
            </a>
          </div>

          {/* Stats — 2 baris di mobile, 4 kolom di desktop, center */}
          <div className="stagger-parent grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ n, l, l2 }, i) => (
              <StatCard key={l} n={n} l={l} l2={l2} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* RIGHT — Demo card reveal dari kanan */}
        <div className="reveal-right">
          <DemoCard />
        </div>
      </div>
    </header>
  );
}