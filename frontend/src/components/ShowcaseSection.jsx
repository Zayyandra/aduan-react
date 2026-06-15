const ITEMS = [
  { q: "Aplikasi PLN Mobile sering error waktu mau bayar tagihan, tolong diperbaiki.", cat: "Infrastruktur", conf: 83, cc: "#15803d", cbg: "#f0fdf4", senti: "Negatif", scol: "#dc2626", sbg: "#fef2f2" },
  { q: "Antrian di puskesmas lama banget, padahal sudah daftar online lewat Mobile JKN.", cat: "Kesehatan", conf: 76, cc: "#be123c", cbg: "#fff1f3", senti: "Negatif", scol: "#dc2626", sbg: "#fef2f2" },
  { q: "KRL Access sangat membantu pantau jadwal kereta, tidak perlu antri beli tiket.", cat: "Transportasi", conf: 80, cc: "#1d4ed8", cbg: "#eff6ff", senti: "Positif", scol: "#16a34a", sbg: "#f0fdf4" },
  { q: "Urus KTP digital lewat aplikasi Identitas Kependudukan mudah dan cepat, tidak perlu ke kantor.", cat: "Administrasi", conf: 74, cc: "#0f766e", cbg: "#f0fdfa", senti: "Positif", scol: "#16a34a", sbg: "#f0fdf4" },
];

export default function ShowcaseSection() {
  return (
    <section id="contoh" className="py-[78px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto mb-12">
          <div className="reveal font-mono text-[13px] tracking-[0.1em] uppercase font-bold text-[#0b5a54]">Contoh Hasil</div>
          <h2 className="reveal text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3" style={{ transitionDelay:"0.08s" }}>Seperti Apa Hasilnya?</h2>
          <p className="reveal text-[#475467] text-[16px] font-medium" style={{ transitionDelay:"0.16s" }}>Ulasan nyata dari aplikasi layanan publik beserta prediksi kategori dan sentimen dari model.</p>
        </div>

        <div className="stagger-parent grid md:grid-cols-2 gap-4">
          {ITEMS.map((it, i) => (
            <div key={i}
              className="reveal card-lift bg-white border border-[#d4e5e2] rounded-[15px] p-5 border-l-4 shadow-sm"
              style={{ borderLeftColor: it.cc, transitionDelay: `${i * 0.1}s` }}>
              <p className="text-[15.5px] leading-relaxed text-[#0f1f1d] mb-4">"{it.q}"</p>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="font-mono text-[12.5px] font-semibold px-3 py-1.5 rounded-md" style={{ background:it.cbg, color:it.cc }}>{it.cat} · {it.conf}%</span>
                <span className="font-mono text-[12.5px] font-semibold px-3 py-1.5 rounded-md" style={{ background:it.sbg, color:it.scol }}>{it.senti}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
