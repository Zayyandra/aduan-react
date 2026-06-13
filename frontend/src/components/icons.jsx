// Ikon garis sederhana (SVG inline), pengganti emoji
const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconDoc = (p) => (<svg {...base} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>);
export const IconChip = (p) => (<svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);
export const IconChart = (p) => (<svg {...base} {...p}><path d="M3 3v18h18"/><path d="M7 16v-5M12 16V8M17 16v-3"/></svg>);
export const IconBolt = (p) => (<svg {...base} {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>);
export const IconLang = (p) => (<svg {...base} {...p}><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></svg>);
export const IconShield = (p) => (<svg {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>);
export const IconClock = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
