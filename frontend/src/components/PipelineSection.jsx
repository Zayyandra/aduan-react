const STEPS = [
  { num: "01", tag: "Data Source", sub: "play store", h: "Google Play Store", p: "Ulasan aplikasi layanan publik pemerintah berbahasa Indonesia.", c: "#1d4ed8", bg: "#eff6ff" },
  { num: "02", tag: "Scraping", sub: "google-play-scraper", h: "14 Aplikasi", p: "google-play-scraper, filter review pendek, bahasa Inggris, dan spam.", c: "#b45309", bg: "#fffbeb" },
  { num: "03", tag: "Preprocessing", sub: "rating → label", h: "Filter + Label", p: "Dedup, filter teks generik, label sentimen otomatis dari rating bintang.", c: "#15803d", bg: "#f0fdf4" },
  { num: "04", tag: "Pemodelan", sub: "transformer", h: "IndoBERT", p: "Fine-tune indobert-base-p1, GPU T4, 3 epoch, 21.067 data latih.", c: "#6d28d9", bg: "#f5f3ff" },
  { num: "05", tag: "Web App", sub: "live demo", h: "React + FastAPI", p: "Inferensi real-time, deploy Vercel (frontend) + HuggingFace Spaces (backend).", c: "#0f766e", bg: "#f0fdfa" },
];

export default function PipelineSection() {
  return (
    <section id="pipeline" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto mb-12">
          <div className="reveal font-mono text-[13px] tracking-[0.1em] uppercase font-bold text-[#0b5a54]">Arsitektur Sistem</div>
          <h2 className="reveal text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3" style={{ transitionDelay:"0.08s" }}>Pipeline Klasifikasi</h2>
          <p className="reveal text-[#475467] text-[16px] font-medium" style={{ transitionDelay:"0.16s" }}>Lima tahap dari pengumpulan ulasan Play Store hingga inferensi, dengan catatan metodologi yang transparan.</p>
        </div>

        {/* Cards — alternate reveal kiri & kanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {STEPS.map((s, i) => (
            <div key={s.num}
              className={`${i % 2 === 0 ? "reveal-left" : "reveal-right"} card-lift bg-white border border-[#d4e5e2] rounded-2xl p-[22px] shadow-sm h-full flex flex-col`}
              style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="font-mono font-semibold text-[14px] text-[#94b5b0]">{s.num}</div>
              <span className="font-mono text-[12px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md inline-block my-2.5 self-start" style={{ background: s.bg, color: s.c }}>{s.tag}</span>
              <h3 className="text-[16px] font-bold mb-2 text-[#0f1f1d]">{s.h}</h3>
              <p className="text-[#41514d] text-[14px] leading-relaxed">{s.p}</p>
              <div className="font-mono text-[12px] font-semibold mt-auto pt-3" style={{ color: s.c }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Catatan — reveal */}
        <div className="reveal mt-6 flex gap-3.5 items-start bg-[#fffaf0] border border-[#fbe6c4] rounded-2xl px-5 py-5" style={{ transitionDelay:"0.3s" }}>
          <div className="flex-shrink-0 w-9 h-9 rounded-[9px] bg-[#fef0d6] text-[#b45309] grid place-items-center font-extrabold text-[18px]">!</div>
          <div>
            <b className="text-[#92400e] text-[15px]">Catatan metodologis</b>
            <p className="text-[#6b4e1f] text-[15px] leading-relaxed mt-1">
              Akurasi 74,50% adalah angka jujur dari dataset Play Store tanpa keyword scraping. <b>Keyword-stripped evaluation:</b> akurasi 73,6% pada 96% test set tanpa kata kunci domain — model belajar dari konteks teks, bukan menghafal kata kunci.
              Sentimen dilabeli dari rating bintang (★1–2 = negatif, ★3 = netral, ★4–5 = positif), bukan model terlatih terpisah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
