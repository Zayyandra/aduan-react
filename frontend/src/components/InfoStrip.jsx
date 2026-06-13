import { KATEGORI } from "./categories";

const DIST = {
  infrastruktur: 2661,
  pendidikan: 2571,
  administrasi: 2183,
  kebersihan: 1753,
  transportasi: 1561,
  kesehatan: 1549,
};
const TOTAL = 12279;

const SENTI = [
  { label: "Netral", n: 9169, pct: 74.7, c: "#94b5b0" },
  { label: "Negatif", n: 2486, pct: 20.2, c: "#dc2626" },
  { label: "Positif", n: 623, pct: 5.1, c: "#16a34a" },
];

export default function InfoStrip() {
  return (
    <div className="mt-12">
      <div className="text-center max-w-[620px] mx-auto mb-12">
        <div className="font-mono text-[12px] tracking-[0.18em] uppercase font-semibold text-[#0f766e]">Statistik Dataset</div>
        <h2 className="text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3">Mengenal Data Pelatihan</h2>
        <p className="text-[#516662] text-[16px]">Dikumpulkan mandiri dari X (Twitter) via tweet-harvest, lalu disaring bertingkat dan dilabeli leksikon.</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5">
        {/* Distribusi kategori */}
        <div className="bg-white border border-[#d4e5e2] rounded-[18px] p-6 shadow-[0_1px_2px_rgba(15,33,30,0.03)]">
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#41514d] font-semibold">Distribusi per Kategori</div>
            <div className="font-mono text-[12px] text-[#7d918d]">n = 12.279</div>
          </div>
          <div className="flex flex-col gap-3">
            {Object.entries(DIST).sort((a, b) => b[1] - a[1]).map(([label, jml]) => {
              const warna = KATEGORI[label]?.warna || "#0f766e";
              const pct = ((jml / TOTAL) * 100).toFixed(1);
              return (
                <div key={label} className="grid grid-cols-[110px_1fr_96px] items-center gap-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-medium capitalize text-[#0f1f1d]">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: warna }} />
                    {label}
                  </div>
                  <div className="h-2.5 rounded-[5px] bg-[#eef4f2] overflow-hidden">
                    <div className="h-full rounded-[5px] opacity-90 transition-[width] duration-700 ease-out" style={{ width: `${pct}%`, background: warna }} />
                  </div>
                  <div className="text-right font-mono text-[13px] text-[#516662]">
                    <b className="text-[#0f1f1d] text-[13px]">{jml.toLocaleString("id-ID")}</b> · {pct.replace(".", ",")}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribusi sentimen */}
        <div className="bg-white border border-[#d4e5e2] rounded-[18px] p-6 shadow-[0_1px_2px_rgba(15,33,30,0.03)]">
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#41514d] font-semibold">Distribusi Sentimen</div>
            <div className="font-mono text-[12px] text-[#7d918d]">leksikon</div>
          </div>
          <div className="flex h-3 rounded-[6px] overflow-hidden my-2 mb-4">
            {SENTI.map((s) => <i key={s.label} className="block h-full" style={{ width: `${s.pct}%`, background: s.c }} />)}
          </div>
          <div className="flex flex-col gap-3">
            {SENTI.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0f1f1d]">
                  <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: s.c }} />{s.label}
                </div>
                <div className="font-mono text-[12.5px] text-[#516662]"><b className="text-[#0f1f1d]">{s.n.toLocaleString("id-ID")}</b> · {s.pct.toString().replace(".", ",")}%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#e6f7f5] border border-[#ccefeb] rounded-[11px] px-4 py-4 text-[14px] text-[#0c5b54] leading-snug">
            <b className="text-[#0d5c56]">Catatan jujur:</b> sentimen sangat timpang ke netral — konsekuensi pelabelan leksikon post-scraping, jadi salah satu keterbatasan utama proyek.
          </div>
        </div>
      </div>
    </div>
  );
}