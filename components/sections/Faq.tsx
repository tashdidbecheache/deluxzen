"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto box-border grid min-h-screen w-full max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] content-center gap-10 px-6 pt-24 pb-8">
      <h2 className="m-0 self-start font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance">
        <span className="text-brand">Questions,</span> answered plainly.
      </h2>
      <div className="flex flex-col border-t border-line">
        {FAQS.map((f, i) => {
          const on = open === i;
          return (
            <div key={f.q} className="border-b border-line">
              <button
                onClick={() => setOpen(on ? -1 : i)}
                aria-expanded={on}
                className="flex w-full items-center justify-between gap-4 border-0 bg-transparent py-[22px] text-left font-[inherit] text-lg font-medium text-ink"
              >
                <span>{f.q}</span>
                <span aria-hidden className="grid size-8 flex-none place-items-center rounded-full border border-line text-base text-ink">
                  {on ? "−" : "+"}
                </span>
              </button>
              {on && <p className="m-0 pr-14 pb-[22px] text-[15px] leading-[1.6] text-ink2">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
