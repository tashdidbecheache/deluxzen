/* eslint-disable @next/next/no-img-element */
import CoverflowCarousel from "@/components/fx/CoverflowCarousel";
import { WORK } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" className="relative mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-center gap-2 px-6 pt-24 pb-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="m-0 font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance">
          Selected <span className="text-brand">work</span>
        </h2>
        <p className="m-0 text-[15px] leading-normal text-mute">Real estate, robotics, SaaS and service businesses. Click a site to preview it.</p>
      </div>
      <div data-dx-cover>
        <CoverflowCarousel items={WORK} initialIndex={1} label="Selected work" />
      </div>
      <div data-dx-workgrid>
        {WORK.map((w) => (
          <a key={w.id} href={w.href || "#contact"} target={w.href ? "_blank" : "_self"} rel="noopener" className="flex min-w-0 flex-col gap-2 rounded-[14px] bg-[#0A0A0A] px-1.5 pt-1.5 pb-3 text-white">
            <span className="block aspect-[4/3] overflow-hidden rounded-[9px] bg-[#1A1A1A]">
              <img src={w.image} alt={`${w.title} website`} loading="lazy" className="block size-full object-cover object-top" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5 px-1.5">
              <span className="truncate font-display text-[13.5px] font-semibold tracking-[-0.01em]">{w.title}</span>
              <span className="line-clamp-2 text-[11px] leading-[1.35] text-[#A8A8A8]">{w.subtitle}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
