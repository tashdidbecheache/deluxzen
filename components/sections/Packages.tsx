import { PACKAGES } from "@/lib/data";

const THEMES = {
  light: { card: "bg-white text-[#0A0A0A] border-[#0A0A0A]", blurb: "text-[#6E6E6E]", rule: "bg-[#E3E3E1]", chip: "border-[#0A0A0A] text-[#3D3D3D]", cta: "bg-[#0A0A0A] text-white hover:bg-brand", arrow: "bg-white text-[#0A0A0A]" },
  maroon: { card: "bg-maroon text-white border-maroon", blurb: "text-white/75", rule: "bg-white/25", chip: "border-white/70 text-white", cta: "bg-white text-[#0A0A0A] hover:bg-brand hover:text-white", arrow: "bg-[#0A0A0A] text-white" },
  red: { card: "bg-brand text-white border-brand", blurb: "text-white", rule: "bg-white/35", chip: "border-white text-white", cta: "bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white", arrow: "bg-[#0A0A0A] text-white" },
  dark: { card: "bg-[#0A0A0A] text-white border-[#0A0A0A]", blurb: "text-[#BDBDBD]", rule: "bg-[#2A2A2A]", chip: "border-white text-[#E3E3E1]", cta: "bg-brand text-white hover:bg-brand-dark", arrow: "bg-white text-brand" },
};

const guarantees = [
  { t: "You own everything", d: "Code, domain, content and analytics accounts are in your name after final payment." },
  { t: "Launch date in writing", d: "The delivery date is part of the contract you sign, not a goal we aim for." },
  { t: "No lock-in", d: "Cancel the care plan any month. Full handover documentation is included." },
];

export default function Packages() {
  return (
    <section id="packages" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-center gap-5 px-6 pt-24 pb-8">
      <div data-dx-head className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance">
          Simple packages. Clear <span className="text-brand">prices.</span>
        </h2>
        <p className="m-0 max-w-[44ch] text-right text-sm text-mute">
          Prices cover design and development only. Every package includes Google SEO setup, a sitemap and 30 days of free support. All prices in USD.
        </p>
      </div>

      <div data-dx-prices className="grid grid-cols-4 items-stretch gap-3 py-2">
        {PACKAGES.map((p) => {
          const th = THEMES[p.theme];
          return (
            <div key={p.name} className={`relative box-border flex min-h-[420px] flex-col gap-3.5 rounded-[18px] border p-[22px] ${th.card}`}>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-xl font-medium tracking-[.01em] uppercase">{p.name}</span>
                {"badge" in p && (
                  <span className="inline-flex items-center rounded-full border border-white px-[11px] py-[5px] text-[11px] font-medium whitespace-nowrap">{p.badge}</span>
                )}
              </div>
              <div className="mt-[18px] flex flex-col gap-1.5">
                <span className="font-display text-[44px] leading-none font-medium tracking-[-0.04em]">{p.price}</span>
                <span className={`text-sm ${th.blurb}`}>{p.blurb}</span>
              </div>
              <div className={`h-px ${th.rule}`} />
              <ul className="m-0 flex list-none flex-wrap gap-[7px] p-0">
                {p.items.map((it) => (
                  <li key={it} className={`rounded-full border px-3 py-1.5 text-[12.5px] ${th.chip}`}>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto" />
              <a href="#contact" className={`inline-flex items-center justify-between gap-2.5 rounded-full py-1.5 pr-1.5 pl-5 text-[15px] font-medium transition-colors ${th.cta}`}>
                {p.cta}{" "}
                <span aria-hidden className={`grid size-[34px] flex-none place-items-center rounded-full ${th.arrow}`}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-7 gap-y-1.5 text-xs text-mute">
        <span>
          <strong className="font-medium text-ink">Add-ons</strong> · Extra language $100 · Project write-ups from $100 · Care plan $30–60/mo · Photo retouching on quote
        </span>
        <span>
          <strong className="font-medium text-ink">Not included</strong> · Hosting, domain, paid plugins, APIs and any other third-party services. These are bought separately, outside the package price.
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 border-t border-line pt-5">
        {guarantees.map((g) => (
          <div key={g.t} className="flex flex-col gap-1.5">
            <span className="font-display text-base font-semibold tracking-[-0.02em] text-ink">{g.t}</span>
            <span className="text-[13px] leading-normal text-mute">{g.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
