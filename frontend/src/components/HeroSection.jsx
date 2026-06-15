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
      className="reveal bg-white/[0.06] border border-white/15 rounded-[11px] px-4 py-5 text-center backdrop-blur-sm"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={ref}
        className="text-[#f0c040] font-mono font-semibold text-[22px] tracking-[-0.02em]"
      >
        {n}
      </div>
      <div className="text-[#c5d2e3] text-[13px] font-medium mt-1.5 leading-[1.35]">
        {l}
        {l2 && <span className="block text-[#92a6c2] font-normal text-[12px]">{l2}</span>}
      </div>
    </div>
  );
}

export default function HeroSection({ onStart }) {
  const stats = [
    { n: "12.279",  l: "Data aduan" },
    { n: "90,52%",  l: "Akurasi IndoBERT" },
    { n: "88,47%",  l: "Akurasi jujur", l2: "tanpa kata kunci" },
    { n: "6",       l: "Bidang layanan" },
  ];

  return (
    <header className="relative overflow-hidden bg-[#1e3a5f]">
      {/* subtle dot grid on flat navy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 85%)",
          maskImage: "linear-gradient(180deg,#000,transparent 85%)",
        }}
      />
      {/* top gold rule — official portal cue */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#d4a017]" />

      <div className="relative max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-[70px] lg:py-[84px]">
        {/* LEFT */}
        <div>
          {/* badge */}
          <div className="reveal inline-flex items-center gap-2 border border-[#d4a017]/40 bg-[#d4a017]/12 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0c040]" />
            <span className="text-[#f0c040] text-[13px] font-semibold tracking-[0.1em] uppercase font-mono">
              Praktikum NLP · Politeknik Caltex Riau
            </span>
          </div>

          {/* heading */}
          <h1
            className="reveal text-white text-[40px] md:text-[53px] leading-[1.06] tracking-[-0.025em] font-extrabold mb-5 text-balance"
            style={{ transitionDelay: "0.08s" }}
          >
            Klasifikasi Aduan<br />
            <span className="text-[#f0c040]">Layanan Publik</span> Otomatis
          </h1>

          {/* lead */}
          <p
            className="reveal text-[#c5d2e3] text-[17px] leading-relaxed max-w-[510px] mb-[30px] font-medium"
            style={{ transitionDelay: "0.16s" }}
          >
            Sistem NLP berbahasa Indonesia yang memetakan cuitan pengaduan ke 6
            bidang layanan publik dan mendeteksi sentimennya — ditenagai
            transformer IndoBERT.
          </p>

          {/* CTA */}
          <div
            className="reveal flex flex-wrap gap-3.5 mb-10"
            style={{ transitionDelay: "0.24s" }}
          >
            <button
              onClick={onStart}
              className="bg-[#d4a017] hover:bg-[#b8860f] text-[#15293f] font-bold text-[15px] px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2.5 shadow-[0_14px_28px_-12px_rgba(212,160,23,0.7)] hover:-translate-y-0.5"
            >
              Coba Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#pipeline"
              className="bg-white/[0.08] text-white border border-white/25 hover:bg-white/[0.14] hover:border-white/40 font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all"
            >
              Lihat Pipeline
            </a>
          </div>

          {/* Stats — 2 baris di mobile, 4 kolom di desktop */}
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
