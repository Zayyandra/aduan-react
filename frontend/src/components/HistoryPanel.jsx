import { KATEGORI } from "./categories";

export default function HistoryPanel({ riwayat, onClear }) {
  if (riwayat.length === 0) return null;
  const hitung = {};
  riwayat.forEach(r => { hitung[r.kategori] = (hitung[r.kategori] || 0) + 1; });
  const terbanyak = Object.entries(hitung).sort((a, b) => b[1] - a[1])[0];
  const avg = riwayat.reduce((s, r) => s + r.confidence, 0) / riwayat.length;

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-2)" }}>
          Riwayat Klasifikasi ({riwayat.length})
        </div>
        <button
          onClick={onClear}
          style={{ fontSize: 13, color: "var(--danger)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          Hapus
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
        {[["Total", riwayat.length], ["Terbanyak", terbanyak[0]], ["Rata² yakin", `${(avg * 100).toFixed(1)}%`]].map(([l, v]) => (
          <div key={l} className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-2)" }}>{l}</div>
            <div style={{
              fontWeight: 800, fontSize: 21, marginTop: 5,
              textTransform: "capitalize", lineHeight: 1.2,
              color: l === "Terbanyak" ? (KATEGORI[v] || {}).warna || "var(--ink)" : "var(--ink)",
            }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {riwayat.map((item, i) => {
          const m = KATEGORI[item.kategori] || { warna: "#999" };
          return (
            <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: m.warna, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "var(--ink)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.teks}</span>
              <span style={{ fontSize: 13, textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: 700, color: m.warna }}>
                {item.kategori} · {(item.confidence * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}