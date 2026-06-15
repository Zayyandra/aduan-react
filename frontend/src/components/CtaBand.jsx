export default function CtaBand({ onStart }) {
  return (
    <section className="pb-[78px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="reveal relative overflow-hidden rounded-3xl text-center px-6 py-[58px] bg-gradient-to-br from-[#0f766e] to-[#14b8a6]">
          <div className="absolute w-[340px] h-[340px] rounded-full bg-white/10 -top-[120px] -left-[80px]" />
          <div className="absolute w-[280px] h-[280px] rounded-full bg-white/[0.08] -bottom-[130px] -right-[60px]" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize:"20px 20px" }} />
          <h2 className="relative text-white text-[33px] font-extrabold tracking-[-0.02em]">Coba klasifikasikan ulasan Anda</h2>
          <p className="relative text-white/90 text-[16px] mt-3 mb-[30px]">Gratis, langsung, ditenagai IndoBERT yang dilatih dari 21.145 ulasan nyata aplikasi layanan publik.</p>
          <button onClick={onStart}
            className="relative bg-white text-[#0f766e] font-semibold text-[15px] px-6 py-3.5 rounded-xl inline-flex items-center gap-2.5 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
            Mulai Analisis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
