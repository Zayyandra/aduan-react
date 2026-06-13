export default function CtaBand({ onStart }) {
  return (
    <section className="pb-[78px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl text-center px-6 py-[54px] bg-gradient-to-br from-[#0f766e] to-[#14b8a6]">
          <div className="absolute w-[340px] h-[340px] rounded-full bg-white/10 -top-[120px] -left-[80px]" />
          <div className="absolute w-[280px] h-[280px] rounded-full bg-white/[0.08] -bottom-[130px] -right-[60px]" />
          <h2 className="relative text-white text-[33px] font-extrabold tracking-[-0.02em]">Coba klasifikasikan aduan Anda</h2>
          <p className="relative text-white/90 text-[16px] mt-3 mb-[26px]">Gratis, langsung, dan berjalan di atas model IndoBERT yang sudah dilatih.</p>
          <button onClick={onStart}
            className="relative bg-white text-[#0f766e] font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-px hover:shadow-[0_16px_34px_-14px_rgba(0,0,0,0.3)] inline-flex items-center gap-2.5">
            Mulai Analisis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}