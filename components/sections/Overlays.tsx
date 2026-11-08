"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/data";

/** Cookie notice, floating WhatsApp button (desktop) and call/WhatsApp/quote dock (mobile). */
export default function Overlays() {
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("dx-cookie")) setCookie(true);
    } catch {
      setCookie(true);
    }
  }, []);

  const choose = (v: "all" | "essential") => {
    try {
      localStorage.setItem("dx-cookie", v);
    } catch {}
    setCookie(false);
  };

  return (
    <>
      {cookie && (
        <div data-dx-cookie className="fixed bottom-4 left-4 z-40 box-border flex max-w-[min(92vw,360px)] flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[0_12px_32px_rgba(0,0,0,.14)]">
          <span className="text-[13px] leading-normal text-ink2">We use essential cookies and anonymous analytics only. No ad tracking.</span>
          <div className="flex gap-2">
            <button onClick={() => choose("all")} className="rounded-full border-0 bg-inv px-4 py-2.5 text-[13px] font-medium text-inv-ink">
              Accept
            </button>
            <button onClick={() => choose("essential")} className="rounded-full border border-line bg-transparent px-4 py-2.5 text-[13px] font-medium text-ink">
              Essential only
            </button>
          </div>
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener"
        data-dx-fab
        aria-label="Chat with us"
        title="Chat with us"
        className="fixed right-5 bottom-5 z-[39] grid size-[58px] place-items-center rounded-full bg-[#25D366] shadow-[0_12px_28px_rgba(37,211,102,.4)] transition-transform duration-200 hover:scale-[1.06]"
      >
        <img src="/assets/icons/ui-whatsapp-FFFFFF.svg" width={30} height={30} alt="" className="block" />
      </a>

      <div data-dx-mobilebar className="fixed right-3.5 z-[39] grid-flow-row gap-2.5" style={{ bottom: "calc(14px + env(safe-area-inset-bottom))" }}>
        <a href={PHONE_TEL} aria-label="Call us" title="Call" className="box-border grid size-[52px] place-items-center rounded-full border border-line bg-surface shadow-[0_10px_24px_-8px_rgba(0,0,0,.35)]">
          <img src="/assets/icons/ui-call-0A0A0A.svg" width={20} height={20} alt="" className="block" />
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="WhatsApp" className="grid size-[52px] place-items-center rounded-full bg-[#25D366] shadow-[0_10px_24px_-8px_rgba(0,0,0,.35)]">
          <img src="/assets/icons/ui-whatsapp-FFFFFF.svg" width={22} height={22} alt="" className="block" />
        </a>
        <a href="#quote" aria-label="Get a quote" title="Get a Quote" className="grid size-[52px] place-items-center rounded-full bg-brand text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,.35)]">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M8 13h8M8 17h5" />
          </svg>
        </a>
      </div>
    </>
  );
}
