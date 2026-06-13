import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InputPanel from "./components/InputPanel";
import ResultCard from "./components/ResultCard";
import HistoryPanel from "./components/HistoryPanel";
import InfoStrip from "./components/InfoStrip";
import PipelineSection from "./components/PipelineSection";
import InfoModal from "./components/InfoModal";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/predict`
  : "http://127.0.0.1:8000/predict";
export default function App() {
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [riwayat, setRiwayat] = useState([]);
  const [modal, setModal] = useState(null);

  const klasifikasi = async (teks) => {
    setLoading(true);
    setHasil(null);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teks }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      setHasil(data);
      setRiwayat((prev) => [
        { teks, kategori: data.kategori, confidence: data.confidence },
        ...prev,
      ]);
    } catch {
      alert(
        "Gagal terhubung ke server. Pastikan backend FastAPI sudah jalan di port 8000.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4faf9]">
      <Navbar onModal={setModal} />

      {/* ── Hero ── */}
      <HeroSection
        onStart={() =>
          document
            .getElementById("app-section")
            .scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* ── Classifier App ── */}
      <section
        id="app-section"
        className="max-w-[1200px] w-full mx-auto px-6 py-16"
      >
        <div className="mb-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal bg-[#e6f7f5] px-4 py-1.5 rounded-full mb-4 uppercase">
            Klasifikasi Otomatis
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f1f1d] mb-2">
            Analisis Aduan Masyarakat
          </h2>
          <p className="text-[#5a7975] max-w-xl mx-auto text-sm">
            Masukkan teks aduan berbahasa Indonesia. Sistem akan menentukan
            kategori layanan publik dan sentimen secara otomatis.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 items-start">
          <InputPanel onSubmit={klasifikasi} loading={loading} />
          <ResultCard hasil={hasil} teksInput={riwayat[0]?.teks} />
        </div>

        <HistoryPanel riwayat={riwayat} onClear={() => setRiwayat([])} />
        <div id="dataset-section">
          <InfoStrip />
        </div>
      </section>

      {/* ── Pipeline ── */}
      <PipelineSection />

      {/* ── Footer ── */}
      <footer className="border-t border-[#d4e5e2] bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm">
              A
            </span>
            <div>
              <div className="font-bold text-sm text-[#0f1f1d]">AduanNLP</div>
              <div className="text-[11px] text-[#5a7975]">
                Sistem Klasifikasi Aduan · IndoBERT
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#5a7975] text-center">
            © 2025/2026 · Project Akhir Praktikum NLP · Politeknik Caltex Riau ·
            Kelompok 3
          </div>
          <div className="flex gap-4 text-[12px] text-[#5a7975]">
            <button
              onClick={() => setModal("cara")}
              className="hover:text-[#0f766e] transition-colors"
            >
              Cara Kerja
            </button>
            <button
              onClick={() => setModal("faq")}
              className="hover:text-[#0f766e] transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => setModal("tentang")}
              className="hover:text-[#0f766e] transition-colors"
            >
              Tentang
            </button>
          </div>
        </div>
      </footer>

      {modal && <InfoModal jenis={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
