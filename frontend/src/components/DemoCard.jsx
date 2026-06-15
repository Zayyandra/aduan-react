import { useState, useEffect, useRef } from "react";

const CASES = [
  { t: "Aplikasi BPJS sering error pas mau bayar iuran", cat: "Kesehatan", color: "#be123c", conf: 76, senti: "NEGATIF", sc: "#b91c1c", sb: "#fef2f2" },
  { t: "Jalan depan kantor kecamatan berlubang parah", cat: "Infrastruktur", color: "#15803d", conf: 83, senti: "NEGATIF", sc: "#b91c1c", sb: "#fef2f2" },
  { t: "Petugas sampah rajin setiap hari, lingkungan bersih", cat: "Kebersihan", color: "#6d28d9", conf: 72, senti: "POSITIF", sc: "#15803d", sb: "#f0fdf4" },
  { t: "KRL selalu telat dan penuh sesak setiap pagi", cat: "Transportasi", color: "#1d4ed8", conf: 80, senti: "NEGATIF", sc: "#b91c1c", sb: "#fef2f2" },
];

export default function DemoCard() {
  const [typed, setTyped] = useState("");
  const [show, setShow] = useState(false);
  const [conf, setConf] = useState(0);
  const [idx, setIdx] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const c = CASES[idx];
    const push = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); return id; };
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (reduce) {
      setTyped(c.t); setShow(true); setConf(c.conf);
      push(() => setIdx((idx + 1) % CASES.length), 4200);
      return () => timers.current.forEach(clearTimeout);
    }

    setTyped(""); setShow(false); setConf(0);
    let j = 0;
    const type = () => {
      if (j <= c.t.length) { setTyped(c.t.slice(0, j)); j++; push(type, 32); }
      else {
        setShow(true);
        push(() => setConf(c.conf), 120);
        push(() => setIdx((idx + 1) % CASES.length), 3600);
      }
    };
    push(type, 350);
    return () => timers.current.forEach(clearTimeout);
  }, [idx]);

  const c = CASES[idx];

  return (
    <div className="bg-white border border-[#d4e5e2] rounded-[18px] shadow-[0_30px_60px_-34px_rgba(15,33,30,0.28),0_2px_6px_rgba(15,33,30,0.04)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#d4e5e2] bg-[#fbfdfc]">
        <span className="flex items-center gap-2 font-mono text-[13px] font-semibold text-[#1a2e2a]">
          <span className="w-2 h-2 rounded-full bg-[#0f766e] shadow-[0_0_0_3px_#e6f7f5] animate-pulse-soft" />
          Demo Langsung
        </span>
        <span className="ml-auto font-mono text-[11.5px] font-semibold tracking-[0.08em] text-[#0f766e] bg-[#e6f7f5] border border-[#ccefeb] px-2.5 py-1 rounded-md">
          IndoBERT · Play Store
        </span>
      </div>

      <div className="p-6">
        <div className="text-[#516662] font-mono text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-2.5">Ulasan aplikasi</div>
        <div className="text-[#0f1f1d] text-[16px] leading-relaxed min-h-[54px] bg-[#f4faf9] border border-[#d4e5e2] border-l-[3px] border-l-[#0f766e] rounded-[10px] px-4 py-3.5">
          {typed}
          <span className="inline-block w-2 h-[18px] bg-[#14b8a6] ml-0.5 align-[-3px] animate-pulse-soft" />
        </div>

        <div className={`mt-5 transition-all duration-[450ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-2 font-bold text-[16px] text-white px-4 py-2 rounded-[10px]" style={{ background: c.color }}>
              <span className="w-2 h-2 rounded-full bg-white/90" />
              {c.cat}
            </span>
            <span className="font-mono text-[12px] font-semibold px-3 py-1.5 rounded-md tracking-[0.04em]" style={{ color: c.sc, background: c.sb }}>
              {c.senti}
            </span>
          </div>
          <div className="flex justify-between text-[#5a7975] font-mono text-[12.5px] mb-2">
            <span>confidence</span><b className="text-[#0f1f1d] text-[14px]">{conf}%</b>
          </div>
          <div className="h-2 rounded-[4px] bg-[#f4faf9] overflow-hidden">
            <i className="block h-full rounded-[4px] transition-[width] duration-[900ms] ease-out" style={{ width: `${conf}%`, background: c.color }} />
          </div>
        </div>
      </div>
    </div>
  );
}
