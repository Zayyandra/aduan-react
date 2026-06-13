export default function HeroSection({ onStart }) {
  const stats = [
    { nilai: "12.248", label: "Data Aduan" },
    { nilai: "99.71%", label: "Akurasi IndoBERT" },
    { nilai: "6",      label: "Kategori Layanan" },
    { nilai: "3",      label: "Label Sentimen" },
  ];

  const scrollToDataset = () => {
    document.getElementById("dataset-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#0d1a18]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0f766e]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#14b8a6]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-[#14b8a6]/30 bg-[#14b8a6]/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
            <span className="text-[12px] font-semibold text-[#14b8a6] tracking-wide uppercase">
              Praktikum NLP · Politeknik Caltex Riau
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Klasifikasi Aduan{" "}
            <span className="text-[#14b8a6]">Masyarakat</span>{" "}
            <br className="hidden md:block" />
            Berbasis IndoBERT
          </h1>

          <p className="text-[#8eaaa7] text-lg leading-relaxed mb-10 max-w-2xl">
            Sistem NLP berbahasa Indonesia yang mengklasifikasikan aduan layanan publik ke 6 kategori dan mendeteksi sentimen secara otomatis menggunakan model transformer IndoBERT.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onStart}
              className="bg-[#0f766e] hover:bg-[#0d5c56] text-white font-semibold px-7 py-3.5 rounded-xl text-[15px] transition-colors flex items-center gap-2 shadow-lg shadow-[#0f766e]/30"
            >
              Coba Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={scrollToDataset}
              className="border border-[#2d4a47] text-[#8eaaa7] hover:text-white hover:border-[#14b8a6]/50 px-7 py-3.5 rounded-xl text-[15px] font-medium transition-colors"
            >
              Lihat Dataset
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ nilai, label }) => (
            <div key={label} className="border border-[#1e3532] bg-[#0f1f1d]/60 rounded-xl p-5 backdrop-blur-sm">
              <div className="text-2xl font-extrabold text-white font-mono mb-1">{nilai}</div>
              <div className="text-[12px] text-[#5a7975] font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}