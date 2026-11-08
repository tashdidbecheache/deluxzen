"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/data";
import { Shimmer } from "@/components/ui";

const NAV_MAP: Record<string, string> = { reach: "", included: "services", stack: "services" };
const OBSERVED = ["reach", "work", "before-after", "industries", "services", "included", "stack", "packages", "testimonials", "faq", "contact"];

export default function Header() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef(menuOpen);
  menuRef.current = menuOpen;

  // Highlight the nav item for the section in the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = en.target.id;
          setActive(id in NAV_MAP ? NAV_MAP[id] : id);
        }),
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 }
    );
    OBSERVED.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Past the hero the bar hides; any upward scroll shows it for 5 seconds.
  useEffect(() => {
    const hdr = headerRef.current;
    if (!hdr) return;
    let lastY = window.scrollY, timer = 0, hover = false, ty: number | null = null;
    const pastHero = () => {
      const hero = document.querySelector('[data-screen-label="Home"] section') as HTMLElement | null;
      return window.scrollY > (hero ? hero.offsetHeight : window.innerHeight) * 0.6;
    };
    const hide = () => {
      if (!pastHero() || hover || menuRef.current) return;
      hdr.setAttribute("data-hidden", "");
    };
    const show = (ms: number) => {
      hdr.removeAttribute("data-hidden");
      clearTimeout(timer);
      timer = 0;
      if (ms) timer = window.setTimeout(() => { timer = 0; hide(); }, ms);
    };
    const sync = () => {
      if (!pastHero()) {
        clearTimeout(timer);
        timer = 0;
        hdr.removeAttribute("data-hidden");
      } else if (!hdr.hasAttribute("data-hidden") && !timer) hide();
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 2 && pastHero()) show(5000);
      else if (y > lastY + 2 && pastHero() && !timer) hide();
      lastY = y;
      if (!pastHero()) sync();
    };
    const onWheel = (e: WheelEvent) => { if (e.deltaY < -2 && pastHero()) show(5000); };
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey) || e.key === "Home") && pastHero()) show(5000);
    };
    const onTs = (e: TouchEvent) => { ty = e.touches[0] ? e.touches[0].clientY : null; };
    const onTm = (e: TouchEvent) => {
      if (ty !== null && e.touches[0] && e.touches[0].clientY - ty > 12 && pastHero()) {
        show(5000);
        ty = e.touches[0].clientY;
      }
    };
    const onEnter = () => { hover = true; clearTimeout(timer); timer = 0; };
    const onLeave = () => { hover = false; if (pastHero()) timer = window.setTimeout(() => { timer = 0; hide(); }, 2000); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("touchstart", onTs, { passive: true });
    window.addEventListener("touchmove", onTm, { passive: true });
    hdr.addEventListener("mouseenter", onEnter);
    hdr.addEventListener("mouseleave", onLeave);
    sync();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("touchstart", onTs);
      window.removeEventListener("touchmove", onTm);
      hdr.removeEventListener("mouseenter", onEnter);
      hdr.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-dx-header
      className="fixed inset-x-0 top-0 z-20 box-border flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(248,16,72,.18)] bg-[rgba(10,3,5,.82)] px-6 py-4 backdrop-blur-[14px]"
    >
      <a href="#" className="font-display text-xl font-semibold tracking-[-0.03em] text-white">
        DELUXEN
      </a>

      <div data-dx-desktopnav className="flex justify-center">
        <nav aria-label="Main" className="box-border flex h-[52px] items-center gap-1 rounded-full border border-white/14 bg-white/6 p-1.5 shadow-[0_12px_32px_-14px_rgba(0,0,0,.6)]">
          {NAV_ITEMS.map((it) => {
            const on = it.href.slice(1) === active;
            const mask = `url(/assets/icons/lucide-${it.icon}.svg) center/contain no-repeat`;
            return (
              <a
                key={it.href}
                href={it.href}
                aria-label={it.label}
                aria-current={on ? "page" : undefined}
                onClick={() => setActive(it.href.slice(1))}
                className={`box-border flex h-10 min-w-11 items-center rounded-full px-3 transition-[background,color] duration-[250ms] hover:bg-white/8 hover:text-white ${
                  on ? "bg-[rgba(248,16,72,.18)] text-brand-soft" : "text-white/62"
                }`}
              >
                <span aria-hidden className="size-5 flex-none bg-current" style={{ WebkitMask: mask, mask }} />
                <span
                  className="overflow-hidden text-sm font-medium tracking-[-0.01em] whitespace-nowrap"
                  style={{
                    maxWidth: on ? 130 : 0,
                    marginLeft: on ? 8 : 0,
                    opacity: on ? 1 : 0,
                    transition: "max-width .4s cubic-bezier(.3,1.3,.5,1), margin-left .2s ease, opacity .2s ease",
                  }}
                >
                  {it.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="box-border grid size-11 place-items-center rounded-full border border-white/12 bg-white/6 hover:border-[#25D366]"
        >
          <img src="/assets/icons/ui-whatsapp-FFFFFF.svg" width={22} height={22} alt="" className="block" />
        </a>
        <a href="#contact" className="relative overflow-hidden rounded-full bg-brand px-[22px] py-3 text-sm font-medium whitespace-nowrap text-white hover:bg-brand-dark">
          Let&apos;s Talk
          <Shimmer />
        </a>
        <button
          data-dx-burger
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="hidden size-11 place-items-center rounded-full border border-white/12 bg-white/6 text-[17px] text-white"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute inset-x-4 top-[calc(100%+4px)] flex flex-col rounded-[20px] border border-white/12 bg-[#140508] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,.14)]">
          {NAV_ITEMS.map((it) => (
            <a key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-medium text-white hover:bg-white/8">
              {it.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
