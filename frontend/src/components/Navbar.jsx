export default function Navbar({ onModal }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dde5ef] bg-white/95 backdrop-blur-md">
      <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-[40px] h-[40px] rounded-[9px] bg-[#1e3a5f] text-white flex items-center justify-center select-none shadow-[0_4px_12px_-4px_rgba(30,58,95,0.5)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
              <path d="M9 13.5h6M9 10h6M12 17V8.5" />
            </svg>
          </span>
          <div>
            <div className="font-extrabold text-[16px] text-[#14233b] leading-tight">AduanNLP</div>
            <div className="text-[12px] text-[#5a6b80] leading-tight">Klasifikasi Pengaduan · IndoBERT</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[["cara", "Cara Kerja"], ["faq", "FAQ"], ["tentang", "Tentang"]].map(([id, label]) => (
            <button key={id} onClick={() => onModal(id)}
              className="text-[14px] text-[#3a4a60] hover:text-[#1e3a5f] px-3.5 py-2 rounded-lg hover:bg-[#eef2f7] transition-colors font-medium">
              {label}
            </button>
          ))}
        </nav>

        {/* Badge + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#fbf4e0] border border-[#efdca8] rounded-full px-3.5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#d4a017]" />
            <span className="text-[13px] font-semibold font-mono text-[#8a6608]">akurasi 90,52%</span>
          </div>
          <a href="#app-section"
            className="bg-[#1e3a5f] text-white text-[14px] font-semibold px-[18px] py-2.5 rounded-lg hover:bg-[#15293f] transition-colors">
            Mulai
          </a>
        </div>
      </div>
    </header>
  );
}
