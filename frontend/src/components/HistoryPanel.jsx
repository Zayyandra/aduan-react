import { KATEGORI } from "./categories";

export default function HistoryPanel({ riwayat, onClear }) {
  if (riwayat.length === 0) return null;
  const hitung = {}; riwayat.forEach((r) => { hitung[r.kategori] = (hitung[r.kategori]||0)+1; });
  const terbanyak = Object.entries(hitung).sort((a,b) => b[1]-a[1])[0];
  const avg = riwayat.reduce((s,r) => s+r.confidence, 0) / riwayat.length;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-wider text-muted">Riwayat Klasifikasi ({riwayat.length})</div>
        <button onClick={onClear} className="text-xs text-muted hover:text-teal transition-colors">Hapus</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[["Total", riwayat.length],["Terbanyak", terbanyak[0]],["Rata² yakin", `${(avg*100).toFixed(1)}%`]].map(([l,v]) => (
          <div key={l} className="bg-card border border-line rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted">{l}</div>
            <div className="font-extrabold text-xl mt-1 capitalize" style={{ color: l==="Terbanyak" ? (KATEGORI[v]||{}).warna : "#1a2e2a" }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {riwayat.map((item, i) => {
          const m = KATEGORI[item.kategori] || { warna: "#999" };
          return (
            <div key={i} className="flex items-center gap-3 bg-card border border-line rounded-lg px-4 py-3">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: m.warna }}/>
              <span className="text-sm text-ink truncate flex-1">{item.teks}</span>
              <span className="text-xs capitalize whitespace-nowrap font-medium" style={{ color: m.warna }}>{item.kategori} · {(item.confidence*100).toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
