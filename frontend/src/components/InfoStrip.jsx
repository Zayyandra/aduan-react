import { KATEGORI } from "./categories";

const DIST = {
  infrastruktur: 2661,
  pendidikan:    2571,
  administrasi:  2183,
  kebersihan:    1753,
  transportasi:  1561,
  kesehatan:     1549,
};

const META = [
  { nilai: "12.248", label: "Total Aduan",     sub: "setelah dedup + filter" },
  { nilai: "99.71%", label: "Akurasi IndoBERT", sub: "macro-F1 99.68%" },
  { nilai: "6",      label: "Kategori",         sub: "layanan publik" },
  { nilai: "3",      label: "Label Sentimen",   sub: "weak-label leksikon" },
];

export default function InfoStrip() {
  return (
    <div className="mt-10 space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {META.map(({ nilai, label, sub }) => (
          <div key={label} className="bg-white border border-[#d4e5e2] rounded-xl p-4 text-center shadow-sm">
            <div className="text-xl font-extrabold text-[#0f766e] font-mono leading-none">{nilai}</div>
            <div className="text-[12px] font-semibold text-[#0f1f1d] mt-1">{label}</div>
            <div className="text-[11px] text-[#5a7975] mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Distribusi kategori */}
      <div className="bg-white border border-[#d4e5e2] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#5a7975]">
            Distribusi Dataset per Kategori
          </div>
          <div className="text-[11px] text-[#5a7975] font-mono">n = 12.248</div>
        </div>
        <div className="flex flex-col gap-2.5">
          {Object.entries(DIST)
            .sort((a, b) => b[1] - a[1])
            .map(([label, jml]) => {
              const m   = KATEGORI[label] || { warna: "#999" };
              const pct = ((jml / 12248) * 100).toFixed(1);
              return (
                <div key={label} className="grid grid-cols-[100px_1fr_70px] items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.warna }} />
                    <span className="text-[12px] capitalize text-[#0f1f1d] font-medium">{label}</span>
                  </div>
                  <div className="h-2 bg-[#f4faf9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: `${pct}%`, background: m.warna, opacity: 0.8 }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#5a7975] font-mono">{jml.toLocaleString("id-ID")}</span>
                    <span className="text-[10px] text-[#94b5b0] ml-1">({pct}%)</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}