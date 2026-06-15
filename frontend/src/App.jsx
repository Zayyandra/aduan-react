import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InputPanel from "./components/InputPanel";
import ResultCard from "./components/ResultCard";
import HistoryPanel from "./components/HistoryPanel";
import InfoStrip from "./components/InfoStrip";
import PipelineSection from "./components/PipelineSection";
import ShowcaseSection from "./components/ShowcaseSection";
import CtaBand from "./components/CtaBand";
import InfoModal from "./components/InfoModal";
import RevealObserver from "./components/RevealObserver";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/predict`
  : "http://127.0.0.1:8000/predict";

export default function App() {
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [riwayat, setRiwayat] = useState([]);
  const [modal, setModal] = useState(null);

  const scrollToApp = () =>
    document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });

  const klasifikasi = async (teks) => {
    setLoading(true); setHasil(null);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teks }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      setHasil(data);
      setRiwayat((prev) => [{ teks, kategori: data.kategori, confidence: data.confidence }, ...prev]);
    } catch {
      alert("Gagal terhubung ke server. Pastikan backend FastAPI sudah jalan.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      {/* Observer global — mount sekali */}
      <RevealObserver />

      <Navbar onModal={setModal} />

      <HeroSection onStart={scrollToApp} />

      {/* Classifier */}
      <section id="app-section" className="max-w-[1180px] w-full mx-auto px-6 py-16">
        <div className="reveal mb-10 text-center">
          <span className="inline-block text-[13px] font-semibold tracking-[0.1em] text-[#1e3a5f] bg-[#eef2f7] border border-[#dde5ef] px-4 py-2 rounded-full mb-4 uppercase font-mono">
            Klasifikasi Otomatis
          </span>
          <h2 className="text-3xl font-extrabold text-[#14233b] mb-2">Analisis Aduan Masyarakat</h2>
          <p className="text-[#3d5068] max-w-xl mx-auto text-[15px] font-medium">
            Masukkan teks aduan berbahasa Indonesia. Sistem akan menentukan kategori layanan publik dan sentimen secara otomatis.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 items-start">
          <div className="reveal-left"><InputPanel onSubmit={klasifikasi} loading={loading} /></div>
          <div className="reveal-right" style={{ transitionDelay:"0.1s" }}><ResultCard hasil={hasil} teksInput={riwayat[0]?.teks} /></div>
        </div>

        <HistoryPanel riwayat={riwayat} onClear={() => setRiwayat([])} />

        <div id="dataset-section"><InfoStrip /></div>
      </section>

      <PipelineSection />

      <div className="bg-white border-y border-[#dde5ef]">
        <ShowcaseSection />
      </div>

      <CtaBand onStart={scrollToApp} />

      <footer className="border-t border-[#dde5ef] bg-white py-8">
        <div className="max-w-[1180px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-[15px]">A</span>
            <div>
              <div className="font-bold text-[15px] text-[#14233b]">AduanNLP</div>
              <div className="text-[12px] text-[#6b7f96]">Sistem Klasifikasi Aduan · IndoBERT</div>
            </div>
          </div>
          <div className="text-[13.5px] text-[#6b7f96] text-center">© 2025/2026 · Project Akhir Praktikum NLP · Politeknik Caltex Riau · Kelompok 3</div>
          <div className="flex gap-4 text-[14px] text-[#3d5068]">
            <button onClick={() => setModal("cara")} className="hover:text-[#1e3a5f]">Cara Kerja</button>
            <button onClick={() => setModal("faq")} className="hover:text-[#1e3a5f]">FAQ</button>
            <button onClick={() => setModal("tentang")} className="hover:text-[#1e3a5f]">Tentang</button>
          </div>
        </div>
      </footer>

      {modal && <InfoModal jenis={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
