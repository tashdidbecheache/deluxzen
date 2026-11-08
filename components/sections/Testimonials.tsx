/* eslint-disable @next/next/no-img-element */
import { WordBand } from "@/components/ui";
import { TM_ITEMS, TM_STRIP } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col items-center justify-center px-6 pt-24 pb-8">
      <h2 className="m-0 text-center font-display text-[clamp(34px,3.6vw,48px)] leading-[1.1] font-medium tracking-[-0.04em]">
        Success <span className="text-brand">stories</span>
      </h2>
      <p className="mt-3.5 mb-0 text-center text-[clamp(17px,1.6vw,22px)] tracking-[-0.015em] text-mute">Real words from the businesses we design and build for.</p>

      <div className="mt-12 w-screen">
        <WordBand words={TM_STRIP} duration="50s" />
      </div>

      <div
        data-dx-tm
        className="relative w-screen overflow-hidden bg-[#ECEBE8]"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent 0,#000 20%,#000 80%,transparent 100%)",
          maskImage: "linear-gradient(90deg,transparent 0,#000 20%,#000 80%,transparent 100%)",
        }}
      >
        <div data-dx-tmtrack className="animate-marquee flex w-max" style={{ ["--dur" as string]: "60s" }}>
          {TM_ITEMS.map((tm, i) => (
            <div key={i} data-dx-tmcol className="box-border flex w-[320px] flex-none border-r border-line" style={{ flexDirection: tm.dir }}>
              <div
                data-dx-tmcard
                className="m-2.5 box-border flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface px-5 py-[18px] shadow-[0_1px_3px_rgba(0,0,0,.03)]"
                style={{ height: "calc(var(--tmh,216px) - 20px)" }}
              >
                <div className="flex items-center gap-3">
                  <img src={tm.avatar} alt={tm.name} loading="lazy" className="block size-10 flex-none rounded-full object-cover" />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[15px] font-medium text-ink">{tm.name}</span>
                    <span className="text-[13px] text-mute">{tm.role}</span>
                  </span>
                </div>
                <p data-dx-tmq className="mt-3 mb-0 text-[14.5px] leading-[1.45] text-ink">
                  {tm.quote}
                </p>
              </div>
              <div
                className="relative box-border flex flex-none items-center justify-center p-5"
                style={{
                  height: "var(--tmh,216px)",
                  WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%,#000 55%,transparent 100%)",
                  maskImage: "radial-gradient(70% 70% at 50% 50%,#000 55%,transparent 100%)",
                }}
              >
                {tm.logoImg ? (
                  <img src={tm.logoImg} alt={tm.role} loading="lazy" className="relative block w-auto max-w-[200px] object-contain" style={{ height: tm.logoH }} />
                ) : (
                  <span
                    className="relative whitespace-nowrap text-[#0A0A0A]"
                    style={{ fontFamily: tm.logoFont, fontWeight: tm.logoWeight, fontSize: tm.logoSize, letterSpacing: tm.logoTrack, textTransform: tm.logoCase }}
                  >
                    {tm.logo}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-screen">
        <WordBand words={TM_STRIP} duration="50s" reverse />
      </div>
      <p className="mt-4 mb-0 text-center text-[11px] tracking-[.02em] text-mute">Sample quotes shown for layout. Final reviews are pending client approval.</p>
    </section>
  );
}
