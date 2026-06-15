import { useState } from "react";
import { KATEGORI, keywordPemicu } from "./categories";
import { IconClock } from "./icons";

function EmptyState() {
  return (
    <div className="bg-card border border-dashed border-line rounded-xl p-6 h-full min-h-[320px] flex flex-col items-center justify-center text-center">
      <IconClock width={44} height={44} className="text-[#9fb1ca] mb-4" />
      <div className="text-[16px] font-semibold text-ink mb-1.5">Belum ada hasil</div>
      <p className="text-[14.5px] text-[#5a6b80] max-w-[260px] leading-relaxed">Masukkan teks aduan dan klik "Klasifikasikan" untuk melihat prediksi.</p>
    </div>
  );
}

const LOW = 0.6;

const SENTIMEN_CONFIG = {
  positif: { label: "Positif", bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  negatif: { label: "Negatif", bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  netral: { label: "Netral", bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
};

function SentimenBadge({ sentimen, detail }) {
  const [showDetail, setShowDetail] = useState(false);
  const cfg = SENTIMEN_CONFIG[sentimen] || SENTIMEN_CONFIG.netral;

  return (
    <div className="mb-5">
      <div className="text-[12.5px] uppercase tracking-[0.1em] text-[#6b7f96] font-semibold mb-2">Sentimen</div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowDetail((v) => !v)}
          className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] font-semibold transition-opacity hover:opacity-80"
          style={{ background: cfg.bg, color: cfg.color }}
          title="Klik untuk lihat detail"
        >
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.dot }} />
          {cfg.label}
        </button>
        <span className="text-[12.5px] text-[#3d5068] font-medium">
          +{detail.skor_positif} positif · -{detail.skor_negatif} negatif
        </span>
      </div>

      {showDetail && (detail.kata_positif.length > 0 || detail.kata_negatif.length > 0) && (
        <div className="mt-3 rounded-lg border border-line p-3 flex flex-col gap-2">
          {detail.kata_positif.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[12px] text-[#3d5068] w-14 shrink-0">Positif:</span>
              {detail.kata_positif.map((k) => (
                <span key={k} className="text-[12px] rounded px-2 py-0.5" style={{ background: "#dcfce7", color: "#15803d" }}>{k}</span>
              ))}
            </div>
          )}
          {detail.kata_negatif.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[12px] text-[#3d5068] w-14 shrink-0">Negatif:</span>
              {detail.kata_negatif.map((k) => (
                <span key={k} className="text-[12px] rounded px-2 py-0.5" style={{ background: "#fee2e2", color: "#b91c1c" }}>{k}</span>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-[12px] text-[#6b7f96] mt-2 leading-relaxed">
        Dideteksi otomatis berbasis leksikon · Klik badge untuk detail kata
      </p>
    </div>
  );
}

export default function ResultCard({ hasil, teksInput }) {
  const [salin, setSalin] = useState(false);
  if (!hasil) return <EmptyState />;

  const meta = KATEGORI[hasil.kategori] || { warna: "#0f766e", desc: "" };
  const entries = Object.entries(hasil.semua_skor).sort((a, b) => b[1] - a[1]);
  const ragu = hasil.confidence < LOW;
  const pemicu = keywordPemicu(teksInput, hasil.kategori);

  const doSalin = () => {
    const t =
      `Kategori: ${hasil.kategori} (${(hasil.confidence * 100).toFixed(1)}%)\n` +
      `Sentimen: ${hasil.sentimen}\n` +
      entries.map(([l, s]) => `  ${l}: ${(s * 100).toFixed(1)}%`).join("\n");
    navigator.clipboard.writeText(t);
    setSalin(true);
    setTimeout(() => setSalin(false), 1500);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-line mb-5">
        <div className="min-w-0">
          <div className="text-[12.5px] uppercase tracking-[0.1em] text-[#6b7f96] font-semibold mb-1">Hasil Prediksi</div>
          <div className="font-extrabold text-3xl capitalize leading-none" style={{ color: meta.warna }}>
            {hasil.kategori}
          </div>
          <div className="text-[14px] text-[#3d5068] mt-2">
            {(hasil.confidence * 100).toFixed(1)}% yakin · {meta.desc}
          </div>
        </div>
        <button
          onClick={doSalin}
          className="text-[13px] border rounded-md px-3.5 py-2 transition-colors shrink-0 font-medium"
          style={{ borderColor: salin ? meta.warna : "#dde5ef", color: salin ? meta.warna : "#3d5068" }}
        >
          {salin ? "Tersalin!" : "Salin"}
        </button>
      </div>

      {/* Sentimen */}
      {hasil.sentimen && hasil.sentimen_detail && (
        <SentimenBadge sentimen={hasil.sentimen} detail={hasil.sentimen_detail} />
      )}

      {/* Warning */}
      {ragu && (
        <div className="mb-5 flex gap-3 items-start bg-[#fbf4e0] border border-[#efdca8] rounded-lg p-3.5">
          <span className="text-[#b8860f] font-bold leading-none mt-0.5 text-[18px]">!</span>
          <p className="text-[14px] text-ink leading-relaxed">
            <span className="font-semibold">Keyakinan rendah.</span> Teks mungkin di luar 6 kategori atau ambigu. Sebaiknya diverifikasi manual.
          </p>
        </div>
      )}

      {/* Kata kunci */}
      {pemicu.length > 0 && (
        <div className="mb-5">
          <div className="text-[12.5px] uppercase tracking-[0.1em] text-[#6b7f96] font-semibold mb-2">Kata kunci terdeteksi</div>
          <div className="flex flex-wrap gap-2">
            {pemicu.map((k) => (
              <span key={k} className="text-[13px] rounded-md px-2.5 py-1 font-medium" style={{ background: meta.warna + "1a", color: meta.warna }}>{k}</span>
            ))}
          </div>
        </div>
      )}

      {/* Distribusi probabilitas */}
      <div className="text-[12.5px] uppercase tracking-[0.1em] text-[#6b7f96] font-semibold mb-3">Distribusi probabilitas</div>
      <div className="flex flex-col gap-3">
        {entries.map(([label, skor]) => {
          const m = KATEGORI[label] || { warna: "#999" };
          const top = label === hasil.kategori;
          return (
            <div key={label} className="grid grid-cols-[110px_1fr_56px] items-center gap-3">
              <span className={`text-[13.5px] capitalize ${top ? "text-ink font-semibold" : "text-[#6b7f96]"}`}>{label}</span>
              <div className="h-2.5 bg-[#eef2f7] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${skor * 100}%`, background: m.warna, opacity: top ? 1 : 0.4 }} />
              </div>
              <span className="text-[12.5px] text-[#6b7f96] text-right font-mono">{(skor * 100).toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
