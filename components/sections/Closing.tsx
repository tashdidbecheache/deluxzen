/* eslint-disable @next/next/no-img-element */
import AsciiDither from "@/components/fx/AsciiDither";
import { Shimmer } from "@/components/ui";
import { CTA_ASCII, EMAIL, PHONE_LABEL, PHONE_TEL, WHATSAPP_URL } from "@/lib/data";

const footerCols = [
  { title: "Studio", links: [["Industries", "#industries"], ["Work", "#work"], ["Services", "#services"], ["Packages", "#packages"]] },
  { title: "Industries", links: ["Healthcare", "Fitness", "Corporate", "Real Estate", "Hospitality", "Education"].map((l) => [l, "#industries"]) },
  { title: "Follow", links: [["Facebook", "#"], ["Instagram", "#"], ["LinkedIn", "#"]] },
];

export default function Closing() {
  return (
    <section className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-end gap-12 px-6 pt-24">
      {/* Final CTA */}
      <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-brand px-[clamp(28px,5vw,72px)] py-[clamp(48px,7vw,104px)] text-center text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-35">
          <AsciiDither src="/assets/creation-of-adam.jpg" mono={CTA_ASCII.mono} cellSize={CTA_ASCII.cellSize} contrast={CTA_ASCII.contrast} density={CTA_ASCII.density} className="absolute inset-0" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%,rgba(248,16,72,.85) 0%,rgba(248,16,72,0) 100%)" }} />
        <h2 className="relative m-0 max-w-[20ch] font-display text-[clamp(36px,4.6vw,64px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance text-white">
          Ready to look as good online as you are in person?
        </h2>
        <p className="relative m-0 max-w-[46ch] text-[17px] leading-[1.55] text-white">
          Message us today and get a free website review of your current site, or a plan for your new one.
        </p>
        <div className="relative flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0A0A0A] px-7 py-4 text-base font-medium text-white hover:bg-[#1F1F1F]">
            <img src="/assets/icons/ui-whatsapp-FFFFFF.svg" width={20} height={20} alt="" className="block" />
            Chat on WhatsApp
            <Shimmer />
          </a>
          <a href="#quote" className="rounded-full bg-white px-7 py-4 text-base font-medium text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white">
            Get a Free Quote
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bleed box-border flex flex-col gap-[clamp(40px,5vw,64px)] overflow-hidden rounded-t-[28px] bg-[#0A0A0A] pb-7 text-white"
        style={{ padding: "clamp(48px,6vw,80px) max(24px,calc(50vw - 616px)) 28px" }}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-x-8 gap-y-10">
          <div className="col-span-2 flex min-w-[min(100%,280px)] flex-col gap-4">
            <span className="max-w-[36ch] text-base leading-[1.55] text-[#D9D9D9]">
              Deluxen designs and builds premium websites for businesses of every kind, in the UK, the USA, Canada and Sweden.
            </span>
            <a href={`mailto:${EMAIL}`} className="w-fit border-b border-brand pb-0.5 text-[15px] text-white hover:text-brand">
              {EMAIL}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2A2A2A] px-4 py-2.5 text-sm text-white hover:border-[#25D366]">
              <span aria-hidden className="size-2 rounded-full bg-[#3DDC84]" />
              WhatsApp · {PHONE_LABEL}
            </a>
            <a href={PHONE_TEL} className="w-fit text-sm text-[#D9D9D9] hover:text-brand">
              Call · {PHONE_LABEL}
            </a>
          </div>
          {footerCols.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[.08em] text-[#6E6E6E] uppercase">{col.title}</span>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} className="w-fit text-[15px] text-[#D9D9D9] hover:text-brand">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="mb-[-0.06em] text-center font-display text-[clamp(80px,19vw,270px)] leading-[.8] font-semibold tracking-[-0.06em] whitespace-nowrap select-none"
          style={{ background: "linear-gradient(180deg,#2A2A2A 0%,#0A0A0A 95%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}
        >
          DELUXEN
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-[#2A2A2A] pt-5 text-xs text-[#8A8A8A]">
          <span>© 2026 Deluxen. All rights reserved. A brand of Sitexzen Ltd, registered in England &amp; Wales, Company No. 16554216.</span>
          <span className="flex gap-5">
            <a href="#" className="text-[#8A8A8A] hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-[#8A8A8A] hover:text-white">
              Terms &amp; Refunds
            </a>
          </span>
        </div>
      </footer>
    </section>
  );
}
