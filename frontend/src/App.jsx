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
  const [errMsg, setErrMsg] = useState(null);

  const scrollToApp = () =>
    document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });

  const klasifikasi = async (teks) => {
    setLoading(true); setHasil(null); setErrMsg(null);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teks }),
      });
      const data = await res.json();
      if (data.error) { setErrMsg(data.error); return; }
      setHasil(data);
      setRiwayat(prev => [{ teks, kategori: data.kategori, confidence: data.confidence }, ...prev]);
    } catch {
      setErrMsg("Gagal terhubung ke server. Pastikan backend FastAPI sudah jalan.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <RevealObserver />
      <Navbar onModal={setModal} />
      <HeroSection onStart={scrollToApp} />

      {/* Classifier */}
      <section id="app-section" style={{ maxWidth: 1180, width: "100%", margin: "0 auto", padding: "64px 24px" }}>
        <div className="reveal" style={{ marginBottom: 40, textAlign: "center" }}>
          <div className="badge-eyebrow">Klasifikasi Otomatis</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, margin: "10px 0" }}>Analisis Aduan Masyarakat</h2>
          <p style={{ color: "var(--text)", maxWidth: 540, margin: "0 auto", fontSize: 14.5, lineHeight: 1.7 }}>
            Masukkan teks aduan berbahasa Indonesia. Sistem akan menentukan kategori layanan publik dan sentimen secara otomatis.
          </p>
        </div>

        {errMsg && (
          <div className="reveal" style={{
            marginBottom: 20, padding: "13px 16px", borderRadius: 12,
            background: "var(--danger-bg)", border: "1px solid #fecaca",
            color: "var(--danger)", fontSize: 13.5, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
            </svg>
            {errMsg}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 20, alignItems: "start" }}>
          <div className="reveal-left"><InputPanel onSubmit={klasifikasi} loading={loading} /></div>
          <div className="reveal-right" style={{ transitionDelay: "0.1s" }}>
            <ResultCard hasil={hasil} teksInput={riwayat[0]?.teks} />
          </div>
        </div>

        <HistoryPanel riwayat={riwayat} onClear={() => setRiwayat([])} />

        <div id="dataset-section"><InfoStrip /></div>
      </section>

      <PipelineSection />

      <div style={{ background: "#fff", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <ShowcaseSection />
      </div>

      <CtaBand onStart={scrollToApp} />

      <footer style={{ borderTop: "1px solid var(--border)", background: "#fff", padding: "32px 0" }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto", padding: "0 24px",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 36, height: 36, borderRadius: 9, color: "#fff",
              background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15,
            }}>A</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>AduanNLP</div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>Sistem Klasifikasi Aduan · IndoBERT</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-2)", textAlign: "center" }}>
            © 2025/2026 · Project Akhir Praktikum NLP · Politeknik Caltex Riau · Kelompok 3
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
            {[["cara", "Cara Kerja"], ["faq", "FAQ"], ["tentang", "Tentang"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setModal(id)}
                style={{ color: "var(--text)", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--brand)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {modal && <InfoModal jenis={modal} onClose={() => setModal(null)} />}
    </div>
  );
}