import type { ReactNode } from "react";

type Tile = {
  area: string;
  bg: string;
  fg: string;
  border: string;
  iconBg: string;
  sub: string;
  title: string;
  body: string;
  icon: ReactNode;
};

const svg = (children: ReactNode, size = 20) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const dark = { fg: "#FFFFFF", border: "transparent", iconBg: "rgba(255,255,255,.14)" };
const light = { bg: "#FFFFFF", fg: "#0A0A0A", border: "#E3E3E1", iconBg: "#F3F3F1", sub: "#5A5A5A" };

const tiles: Tile[] = [
  { area: "b", bg: "#0A0A0A", ...dark, sub: "#BDBDBD", title: "Enquiries & bookings", body: "Contact forms, WhatsApp and booking links on every page, so a visitor can reach you in one click.", icon: svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M9 15l2 2 4-4" /></>) },
  { area: "c", ...light, title: "Found on Google", body: "Search-ready pages so people looking up your name or studio find your portfolio first.", icon: svg(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M8 11h6M11 8v6" /></>) },
  { area: "d", bg: "#7A0620", ...dark, sub: "rgba(255,255,255,.8)", title: "Hosting & care", body: "We set up fast, secure hosting for you (hosting is paid separately) and handle backups and updates, so your portfolio stays quick and current.", icon: svg(<><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>) },
  { area: "e", ...light, title: "Personal brand & layout", body: "Colours, type and layout that make your portfolio feel like you, not a template.", icon: svg(<><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /><circle cx="11" cy="11" r="2" /></>) },
  { area: "f", bg: "#0A0A0A", ...dark, sub: "#BDBDBD", title: "Motion & interactions", body: "Scroll animations, hover previews and 3D touches that keep visitors exploring your work.", icon: svg(<><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>) },
  { area: "g", ...light, title: "Perfect on phones", body: "Galleries and project pages designed for small screens, where most people will see your work.", icon: svg(<><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>) },
  { area: "h", bg: "#D10A3B", ...dark, sub: "rgba(255,255,255,.82)", title: "Update it yourself", body: "Add new projects, photos and videos in minutes with a simple editor. No code needed.", icon: svg(<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>) },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-center gap-[18px] px-6 pt-[84px] pb-5">
      <div data-dx-head className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 max-w-[24ch] font-display text-[clamp(28px,3.2vw,46px)] leading-[1.05] font-medium tracking-[-0.045em] text-balance">
          Your business deserves a website that <span className="text-brand">people trust.</span>
        </h2>
      </div>

      <div data-dx-bento>
        <div data-dx-tile="a" className="border border-transparent bg-brand text-white" style={{ gridArea: "a" }}>
          <span
            aria-hidden
            className="pointer-events-none absolute right-[-6%] bottom-[-18%] aspect-square w-[62%] rounded-full"
            style={{ background: "radial-gradient(circle at 35% 35%,rgba(255,255,255,.22),rgba(255,255,255,0) 62%)" }}
          />
          <span className="relative flex items-center justify-between gap-3">
            <span data-dx-ticon aria-hidden className="grid size-14 place-items-center rounded-[14px] bg-white/14 text-white">
              {svg(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8M12 18v3" /></>, 26)}
            </span>
            <span className="font-display text-sm font-semibold text-white/82">01</span>
          </span>
          <span className="relative flex flex-col gap-3.5">
            <h3 className="m-0 font-display leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-white">Portfolio website design &amp; build</h3>
            <p className="m-0 max-w-[44ch] text-base leading-normal text-white/82">
              A custom portfolio that shows your work, tells your story and makes it easy to hire you. Every project gets its own page.
            </p>
            <span className="flex flex-wrap gap-2">
              {["Design", "Development", "Launch"].map((t) => (
                <span key={t} className="rounded-full border border-white/30 bg-white/16 px-3 py-1.5 text-xs font-semibold text-white">
                  {t}
                </span>
              ))}
            </span>
          </span>
          <a href="#contact" data-dx-tbtn className="relative bg-white text-[#0A0A0A]">
            Start my portfolio <span aria-hidden>→</span>
          </a>
        </div>

        {tiles.map((t, i) => (
          <div key={t.area} data-dx-tile={t.area} style={{ gridArea: t.area, background: t.bg, color: t.fg, border: `1px solid ${t.border}` }}>
            <span className="relative flex items-center justify-between gap-3">
              <span data-dx-ticon aria-hidden className="grid size-[42px] place-items-center rounded-[14px]" style={{ background: t.iconBg, color: t.fg }}>
                {t.icon}
              </span>
              <span className="font-display text-sm font-semibold" style={{ color: t.sub }}>
                {String(i + 2).padStart(2, "0")}
              </span>
            </span>
            <span className="relative flex flex-col gap-2">
              <h3 className="m-0 font-display leading-[1.06] font-semibold tracking-[-0.035em] text-balance" style={{ color: t.fg }}>
                {t.title}
              </h3>
              <p className="m-0" style={{ color: t.sub }}>
                {t.body}
              </p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
