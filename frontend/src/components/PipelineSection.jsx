const STEPS = [
  { num: "01", tag: "Data Source", sub: "cuitan publik", h: "Twitter / X", p: "Cuitan aduan publik berbahasa Indonesia.", c: "#1d4ed8", bg: "#eff6ff" },
  { num: "02", tag: "Pengumpulan", sub: "regex anchor", h: "tweet-harvest", p: "Scraping per kata kunci domain + filter anchor.", c: "#b45309", bg: "#fffbeb" },
  { num: "03", tag: "Preprocessing", sub: "weak-label", h: "Filter + Label", p: "Dedup, anchor filter, sentimen leksikon.", c: "#15803d", bg: "#f0fdf4" },
  { num: "04", tag: "Pemodelan", sub: "transformer", h: "IndoBERT", p: "Fine-tune indobert-base-p1, GPU T4, 3 epoch.", c: "#6d28d9", bg: "#f5f3ff" },
  { num: "05", tag: "Web App", sub: "live demo", h: "React + FastAPI", p: "Inferensi real-time + visualisasi probabilitas.", c: "#0f766e", bg: "#f0fdfa" },
];

export default function PipelineSection() {
  return (
    <section id="pipeline" className="py-[78px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto mb-12">
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase font-semibold text-[#0f766e]">Arsitektur Sistem</div>
          <h2 className="text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3">Pipeline Klasifikasi</h2>
          <p className="text-[#516662] text-[16px]">Lima tahap dari pengumpulan data X hingga inferensi, dengan catatan metodologi yang transparan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {STEPS.map((s) => (
            <div key={s.num}
              className="bg-white border border-[#d4e5e2] rounded-2xl p-[22px] shadow-[0_1px_2px_rgba(15,33,30,0.03)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_38px_-22px_rgba(15,118,110,0.35)]">
              <div className="font-mono font-semibold text-[14px] text-[#94b5b0]">{s.num}</div>
              <span className="font-mono text-[12px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md inline-block my-2.5" style={{ background: s.bg, color: s.c }}>{s.tag}</span>
              <h3 className="text-[16px] font-bold mb-2 text-[#0f1f1d]">{s.h}</h3>
              <p className="text-[#41514d] text-[14px] leading-relaxed">{s.p}</p>
              <div className="font-mono text-[12px] font-semibold mt-1.5" style={{ color: s.c }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3.5 items-start bg-[#fffaf0] border border-[#fbe6c4] rounded-2xl px-5 py-5">
          <div className="flex-shrink-0 w-9 h-9 rounded-[9px] bg-[#fef0d6] text-[#b45309] grid place-items-center font-extrabold text-[18px]">!</div>
          <div>
            <b className="text-[#92400e] text-[15px]">Catatan metodologis</b>
            <p className="text-[#6b4e1f] text-[15px] leading-relaxed mt-1">
              Akurasi 90,52% pada data uji bersifat <i>inflated</i> akibat <b>feature leakage</b> — label berkorelasi langsung dengan kata kunci scraping.
              Pada teks tanpa kata domain akurasi turun ke 88,47% (gap 7,3 pp). Sentimen memakai metode leksikon (weak labeling), bukan model terlatih.
              Keterbatasan ini didokumentasikan, bukan disembunyikan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}