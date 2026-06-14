import { useEffect } from "react";

/**
 * Mount sekali di App.jsx.
 * Mengamati semua .reveal, .reveal-left, .reveal-right
 * → tambah .revealed saat masuk viewport, hapus saat keluar (re-trigger).
 */
export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // langsung tampilkan semua tanpa animasi
      document.querySelectorAll(".reveal,.reveal-left,.reveal-right")
        .forEach(el => el.classList.add("revealed"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("revealed");
          else e.target.classList.remove("revealed"); // re-trigger pas scroll balik
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const attach = () => {
      document.querySelectorAll(".reveal,.reveal-left,.reveal-right")
        .forEach(el => obs.observe(el));
    };

    attach();
    // Re-attach kalau ada konten late-mount (HistoryPanel muncul setelah submit)
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}