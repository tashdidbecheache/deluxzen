import JournalSpreads from "@/components/fx/JournalSpreads";
import { IND_SPREADS } from "@/lib/data";

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative box-border flex min-h-screen w-screen flex-col justify-center gap-8 text-white"
      style={{
        padding: "clamp(72px,8vw,112px) max(24px,calc((100vw - 1232px) / 2)) clamp(40px,5vw,64px)",
        background: "radial-gradient(90% 70% at 50% 55%,#5C0A22 0%,#3E0716 55%,#2A040F 100%)",
      }}
    >
      <div data-dx-head className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 max-w-[24ch] font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance text-white">
          Portfolio websites built for your industry, not a <span className="text-brand-soft">template.</span>
        </h2>
        <p className="m-0 ml-auto max-w-[38ch] text-right text-sm text-white/72">Every industry has its own customers, questions and decisions. We design around yours.</p>
      </div>
      <JournalSpreads spreads={IND_SPREADS} initialIndex={0} autoPlay={2600} label="Industries we build for" />
      <p className="m-0 flex items-center justify-center gap-2.5 text-center text-[15px] text-white/85">
        <svg aria-hidden width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
          <path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
        Slide the pages with your mouse to see all the categories{" "}
        <span aria-hidden className="inline-flex gap-0.5 font-semibold">
          ← →
        </span>
      </p>
    </section>
  );
}
