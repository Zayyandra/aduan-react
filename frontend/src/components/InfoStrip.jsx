import { useEffect, useRef } from "react";
import { KATEGORI } from "./categories";

const DIST = {
  infrastruktur: 2661, pendidikan: 2571, administrasi: 2183,
  kebersihan: 1753, transportasi: 1561, kesehatan: 1549,
};
const TOTAL = 12279;
const SENTI = [
  { label: "Netral",   n: 9169, pct: 74.7, c: "#94a3b8" },
  { label: "Negatif",  n: 2486, pct: 20.2, c: "#dc2626" },
  { label: "Positif",  n: 623,  pct: 5.1,  c: "#16a34a" },
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
    <div className="h-2.5 rounded-[5px] bg-[#eef2f7] overflow-hidden">
      <div ref={ref} className="h-full rounded-[5px] opacity-90 transition-[width] duration-[900ms] ease-out bar-animate" style={{ width: "0%", background: color }} />
    </div>
  );
}

export default function InfoStrip() {
  return (
    <div className="mt-12">
      <div className="text-center max-w-[620px] mx-auto mb-12">
        <div className="reveal font-mono text-[13px] tracking-[0.1em] uppercase font-bold text-[#b8860f]">Statistik Dataset</div>
        <h2 className="reveal text-[35px] font-extrabold tracking-[-0.02em] text-[#14233b] my-3" style={{ transitionDelay:"0.08s" }}>Mengenal Data Pelatihan</h2>
        <p className="reveal text-[#3d5068] text-[16px] font-medium" style={{ transitionDelay:"0.16s" }}>Dikumpulkan mandiri dari X (Twitter) via tweet-harvest, lalu disaring bertingkat dan dilabeli leksikon.</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5">
        <div className="reveal-left card-lift bg-white border border-[#dde5ef] rounded-[18px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#3d5068] font-semibold">Distribusi per Kategori</div>
            <div className="font-mono text-[12px] text-[#6b7f96]">n = 12.279</div>
          </div>
          <div className="flex flex-col gap-3">
            {Object.entries(DIST).sort((a,b)=>b[1]-a[1]).map(([label, jml]) => {
              const warna = KATEGORI[label]?.warna || "#0f766e";
              const pct = ((jml/TOTAL)*100).toFixed(1);
              return (
                <div key={label} className="grid grid-cols-[110px_1fr_96px] items-center gap-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium capitalize text-[#14233b]">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: warna }} />{label}
                  </div>
                  <AnimatedBar pct={pct} color={warna} />
                  <div className="text-right font-mono text-[13px] text-[#6b7f96]">
                    <b className="text-[#14233b]">{jml.toLocaleString("id-ID")}</b> · {pct.replace(".",",")}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal-right card-lift bg-white border border-[#dde5ef] rounded-[18px] p-6 shadow-sm" style={{ transitionDelay:"0.12s" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#3d5068] font-semibold">Distribusi Sentimen</div>
            <div className="font-mono text-[12px] text-[#6b7f96]">leksikon</div>
          </div>
          <div className="flex h-3 rounded-[6px] overflow-hidden my-2 mb-5">
            {SENTI.map((s) => <i key={s.label} className="block h-full" style={{ width:`${s.pct}%`, background:s.c }} />)}
          </div>
          <div className="flex flex-col gap-3">
            {SENTI.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#14233b]">
                  <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background:s.c }} />{s.label}
                </div>
                <div className="font-mono text-[12.5px] text-[#6b7f96]"><b className="text-[#14233b]">{s.n.toLocaleString("id-ID")}</b> · {s.pct.toString().replace(".",",")}%</div>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-[#eef2f7] border border-[#dde5ef] rounded-[11px] px-4 py-3.5 text-[14px] text-[#3d5068] leading-snug">
            <b className="text-[#1e3a5f]">Catatan jujur:</b> sentimen sangat timpang ke netral — konsekuensi pelabelan leksikon post-scraping.
          </div>
        </div>
      </div>
    </div>
  );
}
