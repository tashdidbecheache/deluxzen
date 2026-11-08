/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/** Light sweep across a pill button. Parent needs `relative overflow-hidden`. */
export const Shimmer = () => (
  <span
    aria-hidden
    className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-[34%]"
    style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)" }}
  />
);

export const Icon = ({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) => (
  <img src={`/assets/icons/${name}.svg`} width={size} height={size} alt="" className={`block ${className}`} />
);

export const Accent = ({ children, className = "text-brand" }: { children: ReactNode; className?: string }) => (
  <span className={className}>{children}</span>
);

/** Standard section title: Inter Tight, tight tracking, balanced wrap. */
export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`m-0 font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance ${className}`}>
      {children}
    </h2>
  );
}

/** Red marquee band of uppercase words separated by black dots. */
export function WordBand({ words, duration = "60s", reverse = false, ariaLabel }: { words: string[]; duration?: string; reverse?: boolean; ariaLabel?: string }) {
  return (
    <div className="overflow-hidden bg-brand py-1.5" aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true}>
      <div className="animate-marquee flex w-max" style={{ ["--dur" as string]: duration, animationDirection: reverse ? "reverse" : "normal" }}>
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 pr-5 font-display text-[clamp(15px,1.7vw,24px)] leading-none font-bold tracking-[-0.03em] whitespace-nowrap text-white uppercase"
          >
            {w}
            <span aria-hidden className="size-[.22em] flex-none rounded-full bg-[#0A0A0A]" />
          </span>
        ))}
      </div>
    </div>
  );
}
