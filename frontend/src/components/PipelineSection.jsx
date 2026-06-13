const STEPS = [
  {
    no: "01",
    judul: "Data Source",
    sub: "Twitter / X",
    desc: "Cuitan aduan publik berbahasa Indonesia dikumpulkan dari platform X.",
    warna: "#1d4ed8",
    bg: "#eff6ff",
  },
  {
    no: "02",
    judul: "Pengumpulan",
    sub: "tweet-harvest",
    desc: "Scraping berbasis kata kunci domain dengan filter anchor regex.",
    warna: "#b45309",
    bg: "#fffbeb",
  },
  {
    no: "03",
    judul: "Preprocessing",
    sub: "Filter + Label",
    desc: "Deduplikasi, anchor filter, dan pelabelan sentimen berbasis leksikon.",
    warna: "#15803d",
    bg: "#f0fdf4",
  },
  {
    no: "04",
    judul: "Pemodelan",
    sub: "IndoBERT",
    desc: "Fine-tuning indobert-base-p1 di Google Colab GPU T4, 3 epoch.",
    warna: "#6d28d9",
    bg: "#f5f3ff",
  },
  {
    no: "05",
    judul: "Web App",
    sub: "React + FastAPI",
    desc: "Antarmuka klasifikasi dengan visualisasi probabilitas dan sentimen.",
    warna: "#0f766e",
    bg: "#f0fdfa",
  },
];

export default function PipelineSection() {
  return (
    <section className="bg-white border-t border-[#d4e5e2] py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#0f766e] bg-[#e6f7f5] px-4 py-1.5 rounded-full mb-4 uppercase">
            Arsitektur Sistem
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1f1d] mb-3">
            Pipeline Klasifikasi
          </h2>
          <p className="text-[#5a7975] text-sm max-w-lg mx-auto">
            Dari pengumpulan data Twitter hingga prediksi real-time, setiap tahap dirancang untuk akurasi dan transparansi.
          </p>
        </div>

        {/* Pipeline horizontal */}
        <div className="flex flex-col md:flex-row gap-0 items-stretch">
          {STEPS.map((s, i) => (
            <div key={s.no} className="flex md:flex-col items-start md:items-center flex-1 relative">
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <>
                  {/* desktop: horizontal arrow */}
                  <div className="hidden md:block absolute right-0 top-[52px] w-1/2 h-px bg-[#d4e5e2] z-0" />
                  <div className="hidden md:block absolute left-1/2 top-[52px] w-1/2 h-px bg-[#d4e5e2] z-0" />
                  {/* desktop: chevron */}
                  <div className="hidden md:flex absolute right-0 top-[46px] z-10 items-center justify-center w-5 h-5 translate-x-1/2">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M2 1l6 5-6 5" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </>
              )}

              {/* Card */}
              <div
                className="relative z-10 w-full md:w-auto flex md:flex-col items-center gap-4 md:gap-3 p-5 md:p-6 rounded-xl border m-2"
                style={{ borderColor: s.warna + "30", background: s.bg }}
              >
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-extrabold shrink-0 font-mono"
                  style={{ background: s.warna, color: "#fff" }}
                >
                  {s.no}
                </div>
                <div className="text-center md:text-center">
                  <div className="font-bold text-[#0f1f1d] text-sm">{s.judul}</div>
                  <div
                    className="text-[11px] font-semibold font-mono mt-0.5"
                    style={{ color: s.warna }}
                  >
                    {s.sub}
                  </div>
                  <p className="text-[11px] text-[#5a7975] mt-1.5 leading-relaxed hidden md:block">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keterbatasan note */}
        <div className="mt-12 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5 flex gap-4 items-start">
          <div className="w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center shrink-0 mt-0.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2v3M5 7.5v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-[#92400e] text-sm mb-1">Catatan Metodologis</div>
            <p className="text-[#78350f] text-[13px] leading-relaxed">
              Akurasi 99,71% pada data uji bersifat inflated akibat <strong>feature leakage</strong> — label berkorelasi dengan kata kunci scraping.
              Pada teks tanpa kata domain, akurasi turun ke 93,0% (gap 6,8pp).
              Sentimen menggunakan metode leksikon (<em>weak labeling</em>), bukan model terlatih.
              Didokumentasikan sebagai keterbatasan metodologis dalam laporan penelitian.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}