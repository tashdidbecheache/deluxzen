/* eslint-disable @next/next/no-img-element */
import AsciiDither from "@/components/fx/AsciiDither";
import { Shimmer, WordBand } from "@/components/ui";
import { HERO_ASCII, INDUSTRY_STRIP, WHATSAPP_URL } from "@/lib/data";

const clients = [
  { src: "/assets/avatar-ahmed.jpg", alt: "Ahmed Saikat, Deluxzen client" },
  { src: "/assets/avatar-sifat.jpg", alt: "Sifat, Deluxzen client" },
  { src: "/assets/avatar-mujtahid.jpg", alt: "Muztahid Rahman, Deluxzen client" },
  { src: "/assets/avatar-sanjim.jpg", alt: "Sanjim Khan, Deluxzen client" },
  { src: "/assets/avatar-afridi.jpg", alt: "Kazi Afridi, Deluxzen client" },
];

export default function Hero() {
  return (
    <section className="relative box-border flex min-h-screen w-screen flex-col items-center justify-center gap-7 overflow-hidden bg-night px-6 pt-[104px] pb-[72px] text-center text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AsciiDither src="/assets/creation-of-adam.jpg" mono={HERO_ASCII.mono} cellSize={HERO_ASCII.cellSize} contrast={HERO_ASCII.contrast} density={HERO_ASCII.density} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 48%,rgba(10,3,5,.75) 0%,rgba(10,3,5,0) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: "linear-gradient(180deg,rgba(5,1,2,.95) 0%,rgba(5,1,2,.6) 35%,rgba(5,1,2,0) 100%)" }} />
      </div>

      <div data-dx-trust className="relative inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 py-[3px] pr-3 pl-[3px] backdrop-blur-[8px]">
        <span className="flex">
          {clients.map((c, i) => (
            <img key={c.src} src={c.src} alt={c.alt} width={24} height={24} className={`block size-6 rounded-full border-[1.5px] border-night object-cover ${i ? "-ml-2" : ""}`} />
          ))}
        </span>
        <span className="text-left text-xs text-[#E3D6D9]">
          Trusted by businesses in <strong className="font-semibold text-white">the UK, USA, Canada and Sweden</strong>
        </span>
      </div>

      <div className="relative flex flex-col items-center gap-[18px]">
        <span className="text-[13px] font-semibold tracking-[.08em] text-[#FF7A97] uppercase">Portfolio website design agency</span>
        <h1 className="m-0 max-w-full font-display text-[clamp(30px,5vw,76px)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-white">
          <span data-dx-h1a className="whitespace-nowrap">
            Everything your portfolio
          </span>
          <br />
          needs,{" "}
          <span
            className="text-shine animate-shine inline-block font-accent font-medium tracking-[-0.05em]"
            style={{ padding: ".08em .14em .08em .02em", margin: "-.08em -.14em -.08em -.02em" }}
          >
            in one place.
          </span>
        </h1>
        <p className="m-0 max-w-[60ch] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-pretty text-[#E3D6D9]">
          We design and build custom portfolio websites for businesses, creators and professionals. Fast, found on Google, and built to turn visitors into clients.
        </p>
      </div>

      <div data-dx-herocta className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand px-6 py-3.5 text-[15px] font-medium text-white hover:bg-brand-dark">
          <img src="/assets/icons/ui-whatsapp-FFFFFF.svg" width={18} height={18} alt="" className="block" />
          Chat on WhatsApp
          <Shimmer />
        </a>
        <a href="#work" className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10">
          See Our Work <span aria-hidden>→</span>
        </a>
        <span className="inline-flex items-center gap-2 text-[13px] text-[#CBBCC0]">
          <span aria-hidden className="size-2 rounded-full bg-[#3DDC84]" />
          Replies within 24 hours
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2]">
        <WordBand words={INDUSTRY_STRIP} duration="60s" ariaLabel="Industries we serve" />
      </div>
    </section>
  );
}
