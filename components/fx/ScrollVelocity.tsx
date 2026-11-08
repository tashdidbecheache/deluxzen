"use client";

import { Fragment, useEffect, useRef } from "react";

/**
 * Text marquee whose speed follows page scroll velocity. "✦" becomes a spinning, pulsing star.
 * `velocity` sets base speed and direction (negative = reverse).
 */
type Props = { text: string; velocity?: number; starColor?: string; delay?: number; copies?: number };

export default function ScrollVelocity({ text, velocity = 3, starColor, delay = 0, copies = 4 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const track = trackRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, v = 0, raf = 0, visible = false, shown = false;
    let lastY = window.scrollY, lastT = performance.now();

    if (!reduced) {
      Object.assign(host.style, {
        opacity: "0",
        transform: `translate3d(${velocity < 0 ? -14 : 14}vw,0,0)`,
        transition: "opacity .9s cubic-bezier(.22,1,.36,1), transform 1.2s cubic-bezier(.22,1,.36,1)",
        transitionDelay: delay + "ms",
      });
    }

    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible || reduced) return;
      lastT = performance.now();
      lastY = window.scrollY;
      const tick = (now: number) => {
        const dt = Math.min(64, now - lastT) || 16;
        lastT = now;
        const y = window.scrollY, sv = ((y - lastY) / dt) * 1000;
        lastY = y;
        v += (sv - v) * 0.12;
        const factor = Math.min(5, Math.abs(v) / 200);
        let move = velocity * (dt / 16) * 0.5;
        move += move * factor;
        const first = track.firstElementChild as HTMLElement | null;
        const w = first ? first.offsetWidth : 0;
        if (w) {
          x -= move;
          if (x <= -w) x += w;
          if (x > 0) x -= w;
          track.style.transform = `translate3d(${x}px,0,0)`;
        }
        if (visible) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !shown) {
          shown = true;
          requestAnimationFrame(() => {
            host.style.opacity = "1";
            host.style.transform = "translate3d(0,0,0)";
          });
        }
        loop();
      },
      { threshold: 0.15 }
    );
    io.observe(host);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [velocity, delay]);

  const parts = text.split("✦");
  return (
    <div ref={hostRef} className="block w-full overflow-hidden whitespace-nowrap leading-none" style={{ padding: ".06em 0 .14em" }}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} className="block whitespace-pre" style={{ paddingRight: "0.25em" }}>
            {parts.map((part, k) => (
              <Fragment key={k}>
                {part}
                {k < parts.length - 1 && (
                  <span className="sv-pulse inline-block" style={{ animationDelay: k * 0.4 + "s" }}>
                    <span
                      className="inline-block"
                      style={{ color: starColor || "inherit", animation: `svSpin ${velocity < 0 ? 7 : 6}s linear infinite${velocity < 0 ? " reverse" : ""}` }}
                    >
                      ✦
                    </span>
                  </span>
                )}
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
