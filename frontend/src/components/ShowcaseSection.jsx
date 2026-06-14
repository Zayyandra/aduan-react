const ITEMS = [
  { q: "Jalan di depan rumah berlubang parah, udah berbulan-bulan belum diperbaiki.", cat: "Infrastruktur", conf: 99, cc: "#15803d", cbg: "#f0fdf4", senti: "Negatif", scol: "#dc2626", sbg: "#fef2f2" },
  { q: "Antrian BPJS di puskesmas lama banget, pelayanannya bikin capek.", cat: "Kesehatan", conf: 85, cc: "#be123c", cbg: "#fff1f3", senti: "Negatif", scol: "#dc2626", sbg: "#fef2f2" },
  { q: "Bus transjakarta penuh sesak tiap pagi, susah dapat tempat.", cat: "Transportasi", conf: 99, cc: "#1d4ed8", cbg: "#eff6ff", senti: "Negatif", scol: "#dc2626", sbg: "#fef2f2" },
  { q: "Petugas kebersihan rajin angkut sampah tiap hari, lingkungan jadi bersih.", cat: "Kebersihan", conf: 96, cc: "#6d28d9", cbg: "#f5f3ff", senti: "Positif", scol: "#16a34a", sbg: "#f0fdf4" },
];

export default function ShowcaseSection() {
  return (
    <section id="contoh" className="py-[78px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto mb-12">
          <div className="reveal font-mono text-[13px] tracking-[0.1em] uppercase font-bold text-[#0b5a54]">Contoh Hasil</div>
          <h2 className="reveal text-[35px] font-extrabold tracking-[-0.02em] text-[#0f1f1d] my-3" style={{ transitionDelay:"0.08s" }}>Seperti Apa Hasilnya?</h2>
          <p className="reveal text-[#475467] text-[16px] font-medium" style={{ transitionDelay:"0.16s" }}>Beberapa aduan nyata beserta kategori dan sentimen yang diprediksi sistem.</p>
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