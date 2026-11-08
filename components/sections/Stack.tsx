/* eslint-disable @next/next/no-img-element */
import { STACK_WALL_A, STACK_WALL_B } from "@/lib/data";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function Wall({ items, duration, reverse }: { items: typeof STACK_WALL_A; duration: string; reverse?: boolean }) {
  return (
    <div className="flex w-max gap-14 px-7 py-1" style={{ animation: `dxWall ${duration} linear infinite${reverse ? " reverse" : ""}` }}>
      {items.map((t, i) => (
        <span key={i} title={t.eyebrow} className="inline-flex items-center gap-[11px] text-white transition-opacity duration-[250ms] hover:opacity-80">
          <img src={t.logo} alt="" width={26} height={26} loading="lazy" className="block size-[26px] object-contain" />
          <span className="font-display text-[17px] font-semibold tracking-[-0.015em] whitespace-nowrap">{t.name}</span>
        </span>
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative box-border flex min-h-screen w-screen flex-col items-center justify-center gap-10 overflow-hidden px-6 pt-24 pb-8 text-white"
      style={{ background: "linear-gradient(160deg,#141414 0%,#0A0A0A 45%,#2A0710 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -ml-[60vw] h-[70vh] w-[120vw] rounded-full blur-[10px]"
        style={{ background: "radial-gradient(ellipse at center,rgba(248,16,72,.9) 0%,rgba(248,16,72,.4) 35%,rgba(10,10,10,0) 70%)", animation: "dxGlow 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-10%] h-[50vh] w-[60vw] rounded-full"
        style={{ background: "radial-gradient(ellipse at center,rgba(248,16,72,.28) 0%,rgba(10,10,10,0) 65%)", animation: "dxDrift 14s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-20%]"
        style={{
          background:
            "linear-gradient(115deg,transparent 38%,rgba(255,255,255,.05) 38%,rgba(255,255,255,.05) 46%,transparent 46%),linear-gradient(115deg,transparent 58%,rgba(255,255,255,.035) 58%,rgba(255,255,255,.035) 74%,transparent 74%)",
          animation: "dxSweep 18s linear infinite",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" style={{ backgroundImage: NOISE }} />

      <h2 className="relative m-0 text-center font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance text-white">
        Built on tools <span className="text-brand">you can own</span>
      </h2>
      <div
        className="relative flex w-screen flex-col gap-[26px] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent 0,#000 10%,#000 90%,transparent 100%)",
          maskImage: "linear-gradient(90deg,transparent 0,#000 10%,#000 90%,transparent 100%)",
        }}
      >
        <Wall items={STACK_WALL_A} duration="44s" />
        <Wall items={STACK_WALL_B} duration="52s" reverse />
      </div>
      <p className="relative m-0 text-center text-sm text-[#D9D9D9]">Open-source tools. You own the code and the data.</p>
    </section>
  );
}
