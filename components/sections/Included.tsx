"use client";

import { useEffect, useRef, useState } from "react";
import { COMMITMENTS, INCLUDED } from "@/lib/data";

const TONES = {
  r: { bg: "#F81048", fg: "#FFFFFF", border: "transparent", num: "#FFFFFF", sub: "#FFFFFF" },
  b: { bg: "#0A0A0A", fg: "#FFFFFF", border: "transparent", num: "#F81048", sub: "#BDBDBD" },
  w: { bg: "#FFFFFF", fg: "#0A0A0A", border: "#0A0A0A", num: "#F81048", sub: "#3D3D3D" },
};

export default function Included() {
  const ref = useRef<HTMLElement>(null);
  const [tick, setTick] = useState(0);

  // Count the stats up once the section is in view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, done = false;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting || done) return;
        done = true;
        const t0 = performance.now(), dur = 1600;
        const run = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          setTick(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="included" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-center gap-7 px-6 pt-24 pb-8">
      <div data-dx-head className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance">
          Every <span className="text-brand">Deluxen</span> website comes with:
        </h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 border-t border-line">
        {INCLUDED.map((inc) => (
          <div key={inc} className="flex items-center gap-3.5 border-b border-line py-[15px] text-[15.5px] text-ink">
            <span aria-hidden className="grid size-[22px] flex-none place-items-center rounded-full bg-brand text-[11px] font-semibold text-white">
              ✓
            </span>
            {inc}
          </div>
        ))}
      </div>
      <div data-dx-stats className="mt-2 grid grid-cols-4 gap-3.5">
        {COMMITMENTS.map((c) => {
          const t = TONES[c.tone];
          return (
            <div key={c.label} className="box-border flex min-h-[150px] flex-col justify-between gap-4 rounded-[18px] p-[22px]" style={{ background: t.bg, color: t.fg, border: `1px solid ${t.border}` }}>
              <span className="font-display text-[clamp(40px,4vw,56px)] leading-none font-semibold tracking-[-0.045em] tabular-nums" style={{ color: t.num }}>
                {c.pre}
                {Math.round(c.v * tick)}
                {c.suf}
              </span>
              <span className="text-sm leading-[1.45]" style={{ color: t.sub }}>
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
