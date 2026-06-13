export default function Navbar({ onModal }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d4e5e2] bg-white/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm select-none">
            A
          </span>
          <div>
            <div className="font-extrabold text-[15px] text-[#0f1f1d] leading-none">AduanNLP</div>
            <div className="text-[10px] text-[#5a7975] mt-0.5 leading-none">Klasifikasi Pengaduan · IndoBERT</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[["cara","Cara Kerja"],["faq","FAQ"],["tentang","Tentang"]].map(([id,label]) => (
            <button
              key={id}
              onClick={() => onModal(id)}
              className="text-[13px] text-[#5a7975] hover:text-[#0f766e] px-3 py-2 rounded-lg hover:bg-[#e6f7f5] transition-colors font-medium"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Badge akurasi */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#e6f7f5] border border-[#ccefeb] rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0f766e] animate-pulse-soft" />
            <span className="text-[11px] font-semibold font-mono text-[#0f766e]">akurasi 99.71%</span>
          </div>
          <a
            href="#app-section"
            className="bg-[#0f766e] text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#0d5c56] transition-colors"
          >
            Mulai
          </a>
        </div>

      </div>
    </header>
  );
}