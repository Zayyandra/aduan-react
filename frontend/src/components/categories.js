export const KATEGORI = {
  kesehatan:     { warna: "#be123c", desc: "Layanan kesehatan, fasilitas medis",
                   keywords: ["berobat","kesehatan","obat","nakes","antri","puskesmas","bpjs","dokter","klinik","mobile jkn","satusehat"] },
  pendidikan:    { warna: "#b45309", desc: "Pendidikan, sekolah, biaya",
                   keywords: ["sekolah","pendidikan","biaya","daftar","guru","zonasi","murid","ppdb","beasiswa","rumah pendidikan"] },
  infrastruktur: { warna: "#15803d", desc: "Jalan, jembatan, lampu, listrik",
                   keywords: ["jalan","got","lampu","banjir","drainase","trotoar","rusak","pln","listrik","tagihan","token","mati lampu","mypertamina","bbm","pertamina"] },
  administrasi:  { warna: "#0f766e", desc: "Surat, kelurahan, pelayanan publik",
                   keywords: ["surat","kelurahan","dokumen","pungli","birokrasi","pelayanan","antri","paspor","ktp","dukcapil","imigrasi","m-paspor","identitas kependudukan"] },
  kebersihan:    { warna: "#6d28d9", desc: "Sampah, selokan, lingkungan",
                   keywords: ["sampah","kotor","selokan","got","bersih","lingkungan","bau","lapor","sp4n","sipongi"] },
  transportasi:  { warna: "#1d4ed8", desc: "Angkutan umum, kemacetan",
                   keywords: ["angkutan","telat","macet","bus","halte","kendaraan","penuh","krl","transjakarta","kereta","mrt","damri","kai","busway","stasiun","krl access"] },
};

export function keywordPemicu(teks, kategori) {
  const meta = KATEGORI[kategori];
  if (!meta) return [];
  const lower = (teks || "").toLowerCase();
  return meta.keywords.filter((k) => lower.includes(k));
}