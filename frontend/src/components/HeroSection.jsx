import DemoCard from "./DemoCard";

export default function HeroSection({ onStart }) {
  const stats = [
    { n: "12.279", l: "Data aduan" },
    { n: "90,52%", l: "Akurasi IndoBERT" },
    { n: "88,47%", l: "Akurasi jujur", l2: "tanpa kata kunci", hl: true },
    { n: "6", l: "Bidang layanan" },
  ];

  return (
    <header className="relative overflow-hidden bg-[#f4faf9]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(680px 320px at 12% 0%, rgba(20,184,166,0.10), transparent 60%), radial-gradient(560px 300px at 96% 8%, rgba(15,118,110,0.07), transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(15,118,110,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "linear-gradient(180deg,#000,transparent 75%)", maskImage: "linear-gradient(180deg,#000,transparent 75%)" }} />

      <div className="relative max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-[70px] lg:py-[80px]">
        <div>
          <div className="inline-flex items-center gap-2 border border-[#ccefeb] bg-[#e6f7f5] rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
            <span className="text-[#0f766e] text-[12px] font-semibold tracking-[0.16em] uppercase font-mono">
              Praktikum NLP · Politeknik Caltex Riau
            </span>
          </div>

          <h1 className="text-[#0f1f1d] text-[40px] md:text-[53px] leading-[1.06] tracking-[-0.025em] font-extrabold mb-5">
            Klasifikasi Aduan<br />
            <span className="text-[#0f766e]">Layanan Publik</span> Otomatis
          </h1>

          <p className="text-[#516662] text-[17px] leading-relaxed max-w-[510px] mb-[30px]">
            Sistem NLP berbahasa Indonesia yang memetakan cuitan pengaduan ke 6 bidang layanan publik
            dan mendeteksi sentimennya — ditenagai transformer IndoBERT.
          </p>

          <div className="flex flex-wrap gap-3.5 mb-10">
            <button onClick={onStart}
              className="bg-[#0f766e] hover:bg-[#0d5c56] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2.5 shadow-[0_14px_28px_-12px_rgba(15,118,110,0.6)] hover:-translate-y-px">
              Coba Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="#pipeline"
              className="bg-white text-[#1a2e2a] border border-[#d4e5e2] hover:border-[#14b8a6] hover:text-[#0f766e] font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-colors">
              Lihat Pipeline
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ n, l, l2 }) => (
              <div key={l} className="bg-white border border-[#d4e5e2] rounded-[13px] px-4 py-4 shadow-[0_1px_2px_rgba(15,33,30,0.03)]">
                <div className="text-[#0f766e] font-mono font-semibold text-[23px] tracking-[-0.02em]">{n}</div>
                <div className="text-[#516662] text-[13px] font-medium mt-1 leading-[1.35]">
                  {l}{l2 && <span className="block text-[#7d918d] font-normal text-[12px]">{l2}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DemoCard />
      </div>
    </header>
  );
}