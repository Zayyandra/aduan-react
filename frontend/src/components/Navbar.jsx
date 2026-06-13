export default function Navbar({ onModal }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d4e5e2] bg-[#f4faf9]/90 backdrop-blur-md">
      <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center font-extrabold text-[16px] select-none shadow-[0_6px_16px_-6px_rgba(15,118,110,0.5)]">
            A
          </span>
          <div>
            <div className="font-extrabold text-[16px] text-[#0f1f1d] leading-tight">AduanNLP</div>
            <div className="text-[12px] text-[#5a7975] leading-tight">Klasifikasi Pengaduan · IndoBERT</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[["cara", "Cara Kerja"], ["faq", "FAQ"], ["tentang", "Tentang"]].map(([id, label]) => (
            <button key={id} onClick={() => onModal(id)}
              className="text-[14px] text-[#41514d] hover:text-[#0f766e] px-3.5 py-2 rounded-lg hover:bg-[#e6f7f5] transition-colors font-medium">
              {label}
            </button>
          ))}
        </nav>

        {/* Badge + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#e6f7f5] border border-[#ccefeb] rounded-full px-3.5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#0f766e] animate-pulse-soft" />
            <span className="text-[12.5px] font-semibold font-mono text-[#0f766e]">akurasi 90,52%</span>
          </div>
          <a href="#app-section"
            className="bg-[#0f766e] text-white text-[14px] font-semibold px-[18px] py-2.5 rounded-lg hover:bg-[#0d5c56] transition-colors">
            Mulai
          </a>
        </div>
      </div>
    </header>
  );
}