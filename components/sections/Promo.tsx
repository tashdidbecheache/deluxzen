"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Promo video: three stacked rounded bars (a square footprint) grow into a full-screen video as you scroll.
 * Autoplays muted once full screen; the rotating badge plays, unmutes or pauses.
 */
type Mode = "play" | "sound" | "pause";
const LABELS: Record<Mode, string> = { play: "Play the Deluxzen video", sound: "Turn the sound on", pause: "Pause the video" };

export default function Promo() {
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("play");

  useEffect(() => {
    const sec = secRef.current!, stage = stageRef.current!, media = mediaRef.current!, head = headRef.current, btn = btnRef.current!, vid = vidRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const L = (a: number, b: number, k: number) => a + (b - a) * k;
    const rr = (x: number, y: number, w: number, h: number, rt: number, rb: number) => {
      rt = Math.max(0, Math.min(rt, w / 2, h / 2));
      rb = Math.max(0, Math.min(rb, w / 2, h / 2));
      return `M${x + rt},${y} H${x + w - rt} A${rt},${rt} 0 0 1 ${x + w},${y + rt} V${y + h - rb} A${rb},${rb} 0 0 1 ${x + w - rb},${y + h} H${x + rb} A${rb},${rb} 0 0 1 ${x},${y + h - rb} V${y + rt} A${rt},${rt} 0 0 1 ${x + rt},${y} Z`;
    };
    let full = false, raf = 0, auto = false;
    const sync = () => setMode(vid.paused ? "play" : vid.muted ? "sound" : "pause");

    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect(), vh = stage.clientHeight || window.innerHeight, vw = stage.clientWidth;
      const range = Math.max(1, r.height - vh), p = Math.min(1, Math.max(0, -r.top / range));
      const z = reduced ? 1 : ease(Math.min(1, p / 0.55));
      const mob = vw < 720;
      const top0 = Math.min(vh * 0.62, (head ? head.offsetTop + head.offsetHeight : 260) + (mob ? 24 : 36));
      const sq = Math.max(160, Math.min(vh - top0 - (mob ? 24 : 32), vw - (mob ? 32 : 96)));
      const g0 = mob ? 10 : 16, bh0 = (sq - 2 * g0) / 3;
      const bw0 = Math.min(vw - (mob ? 32 : 160), sq * 1.9), x0 = (vw - bw0) / 2;
      const raw = reduced ? 1 : Math.min(1, p / 0.55);
      const zi = [0, 1, 2].map((i) => ease(Math.min(1, Math.max(0, (raw - i * 0.07) / 0.86))));
      const y0 = L(top0, 0, z), h = L(sq, vh, z);
      const gz = L(g0, 0, z), hh = (h - 2 * gz) / 3;
      let d = "";
      for (let i = 0; i < 3; i++) {
        const k = zi[i];
        const rad = L(Math.min(mob ? 18 : 26, bh0 / 2), 0, k);
        d += rr(L(x0, 0, k), y0 + i * (hh + gz), L(bw0, vw, k), hh, rad, rad) + " ";
      }
      const minZ = Math.min(...zi);
      media.style.clipPath = minZ >= 0.999 ? "none" : `path('${d.trim()}')`;
      if (head) {
        head.style.transform = `translateY(${(-z * 90).toFixed(1)}px)`;
        head.style.opacity = String(Math.max(0, 1 - z * 1.8));
      }
      const playing = !vid.paused;
      const bs0 = mob ? 0.62 : L(1, 0.9, z);
      const k = playing ? 1 : 0;
      const bx = vw / 2, by = L(y0 + h / 2, vh - (mob ? 56 : 84), k), bs = L(bs0, mob ? 0.5 : 0.62, k);
      btn.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
      btn.style.transform = `translate(${(bx - 78).toFixed(1)}px,${(by - 78).toFixed(1)}px) scale(${bs.toFixed(3)})`;
      const isFull = z >= 0.999 && minZ >= 0.999;
      if (isFull && !full) {
        full = true;
        if (!auto) {
          auto = true;
          vid.muted = true;
          vid.play().then(sync).catch(sync);
        }
      }
      if (!isFull && full) full = false;
      if (!vid.muted && (p > 0.96 || !isFull)) {
        vid.muted = true;
        sync();
      }
      if (p < 0.2 && !vid.paused) {
        vid.pause();
        auto = false;
        sync();
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onClick = () => {
      if (vid.paused) {
        vid.muted = false;
        vid.play().then(sync).catch(() => {
          vid.muted = true;
          vid.play().then(sync).catch(sync);
        });
      } else if (vid.muted) {
        vid.muted = false;
        sync();
      } else {
        vid.pause();
        sync();
      }
      onScroll();
    };
    const onMedia = () => {
      sync();
      onScroll();
    };
    btn.addEventListener("click", onClick);
    vid.addEventListener("play", onMedia);
    vid.addEventListener("pause", onMedia);
    vid.addEventListener("volumechange", sync);
    const io = new IntersectionObserver((en) =>
      en.forEach((e) => {
        if (!e.isIntersecting && !vid.paused) {
          vid.pause();
          auto = false;
        }
      })
    );
    io.observe(sec);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      btn.removeEventListener("click", onClick);
      vid.removeEventListener("play", onMedia);
      vid.removeEventListener("pause", onMedia);
      vid.removeEventListener("volumechange", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={secRef} id="promo" className="relative h-[320vh] w-screen bg-bg">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <div ref={headRef} className="absolute inset-x-0 top-[clamp(84px,11vh,124px)] z-[2] box-border flex flex-col items-center gap-3 px-6 text-center will-change-[transform,opacity]">
          <span className="text-xs font-semibold tracking-[.14em] text-brand uppercase">Deluxzen in motion</span>
          <h2 className="m-0 max-w-[22ch] font-display text-[clamp(32px,3.9vw,56px)] leading-[1.08] font-medium tracking-[-0.045em] text-balance text-ink">
            See how a portfolio becomes a <span className="text-brand">first impression.</span>
          </h2>
          <p className="m-0 text-[15px] leading-normal text-mute">41 seconds of what we build. Keep scrolling to watch it full screen.</p>
        </div>
        <div ref={mediaRef} className="absolute inset-0 z-[1] bg-night will-change-[clip-path]">
          <video
            ref={vidRef}
            title="Deluxzen portfolio website design agency: 41-second showreel"
            aria-label="Deluxzen showreel video"
            src="/assets/video/deluxzen-promo.mp4"
            poster="/assets/video/deluxzen-promo-poster.jpg"
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 block size-full object-cover"
          />
        </div>
        <button
          ref={btnRef}
          type="button"
          aria-label={LABELS[mode]}
          className="absolute top-0 left-0 z-[3] grid size-[156px] place-items-center rounded-full border-0 bg-white p-0 shadow-[0_18px_50px_rgba(10,3,5,.22)] will-change-transform"
        >
          <svg viewBox="0 0 156 156" width={156} height={156} aria-hidden className="absolute inset-0" style={{ animation: "dxSpin 10s linear infinite" }}>
            <defs>
              <path id="dxPvRing" d="M78,78 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
            </defs>
            <text style={{ font: "600 12.5px var(--font-inter), sans-serif", letterSpacing: ".32em", fill: "#0A0A0A", textTransform: "uppercase" }}>
              <textPath href="#dxPvRing">Watch video · Watch video · </textPath>
            </text>
          </svg>
          <span className="relative grid size-[62px] place-items-center rounded-full bg-brand shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)]">
            {mode === "play" && (
              <svg viewBox="0 0 24 24" width={26} height={26} style={{ marginLeft: 3 }}>
                <path d="M7 4.8c0-1 1.1-1.6 2-1.1l11 6.6c.8.5.8 1.7 0 2.2l-11 6.6c-.9.5-2-.1-2-1.1z" fill="#FFF" />
              </svg>
            )}
            {mode === "sound" && (
              <svg viewBox="0 0 24 24" width={26} height={26}>
                <path d="M4 9h3.5L12 5v14l-4.5-4H4z" fill="#FFF" />
                <path d="M15.5 9.5c1.2 1.4 1.2 3.6 0 5M18 7c2.4 2.8 2.4 7.2 0 10" stroke="#FFF" strokeWidth={2} fill="none" strokeLinecap="round" />
              </svg>
            )}
            {mode === "pause" && (
              <svg viewBox="0 0 24 24" width={24} height={24}>
                <rect x={6} y={5} width={4} height={14} rx={1.5} fill="#FFF" />
                <rect x={14} y={5} width={4} height={14} rx={1.5} fill="#FFF" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </section>
  );
}
