import { useEffect, useRef } from "react";
import { KATEGORI } from "./categories";

// Data Play Store hasil scraping final (dataset_aduan_playstore.csv)
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
  { label: "Negatif",  n: 11537, pct: 54.6, c: "#dc2626" },
  { label: "Positif",  n: 8470,  pct: 40.1, c: "#16a34a" },
  { label: "Netral",   n: 1138,  pct: 5.4,  c: "#94a3b8" },
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
    <div className="h-2.5 rounded-[5px] bg-[#eef4f2] overflow-hidden">
      <div ref={ref} className="h-full rounded-[5px] opacity-90 transition-[width] duration-[900ms] ease-out bar-animate" style={{ width: "0%", background: color }} />
    </div>
  );
}

export default function InfoStrip() {
  return (
    <div className="mt-12">
      <div className="text-center max-w-[620px] mx-auto mb-12">
        <div className="reveal font-mono text-[13px] tracking-[0.1em] uppercase font-bold text-[#0b5a54]">Statistik Dataset</div>
        <h2 className="reveal text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3" style={{ transitionDelay:"0.08s" }}>Mengenal Data Pelatihan</h2>
        <p className="reveal text-[#475467] text-[16px] font-medium" style={{ transitionDelay:"0.16s" }}>Dikumpulkan dari ulasan Google Play Store aplikasi layanan publik pemerintah, diberi label sentimen otomatis dari rating bintang.</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5">
        <div className="reveal-left card-lift bg-white border border-[#d4e5e2] rounded-[18px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#41514d] font-semibold">Distribusi per Kategori</div>
            <div className="font-mono text-[12px] text-[#7d918d]">n = 21.145</div>
          </div>
          <div className="flex flex-col gap-3">
            {Object.entries(DIST).sort((a,b)=>b[1]-a[1]).map(([label, jml]) => {
              const warna = KATEGORI[label]?.warna || "#0f766e";
              const pct = ((jml/TOTAL)*100).toFixed(1);
              return (
                <div key={label} className="grid grid-cols-[110px_1fr_96px] items-center gap-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium capitalize text-[#0f1f1d]">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: warna }} />{label}
                  </div>
                  <AnimatedBar pct={pct} color={warna} />
                  <div className="text-right font-mono text-[13px] text-[#7d918d]">
                    <b className="text-[#0f1f1d]">{jml.toLocaleString("id-ID")}</b> · {pct.replace(".",",")}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal-right card-lift bg-white border border-[#d4e5e2] rounded-[18px] p-6 shadow-sm" style={{ transitionDelay:"0.12s" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#41514d] font-semibold">Distribusi Sentimen</div>
            <div className="font-mono text-[12px] text-[#7d918d]">rating bintang</div>
          </div>
          <div className="flex h-3 rounded-[6px] overflow-hidden my-2 mb-5">
            {SENTI.map((s) => <i key={s.label} className="block h-full" style={{ width:`${s.pct}%`, background:s.c }} />)}
          </div>
          <div className="flex flex-col gap-3">
            {SENTI.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0f1f1d]">
                  <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background:s.c }} />{s.label}
                </div>
                <div className="font-mono text-[12.5px] text-[#516662]"><b className="text-[#0f1f1d]">{s.n.toLocaleString("id-ID")}</b> · {s.pct.toString().replace(".",",")}%</div>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-[#e6f7f5] border border-[#ccefeb] rounded-[11px] px-4 py-3.5 text-[14px] text-[#0c5b54] leading-snug">
            <b className="text-[#0d5c56]">Label otomatis:</b> sentimen dari rating bintang Play Store — ★1–2 negatif, ★3 netral, ★4–5 positif.
          </div>
        </div>
      </div>
    </div>
  );
}
