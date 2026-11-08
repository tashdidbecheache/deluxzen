"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Before / after wipe: left = generic AI-template hero, right = the designed "Prisma" hero.
 * Drag anywhere, tap to jump, arrow keys (Shift = 10%), Home/End, double-click the handle to centre.
 * While fully on screen, page scrolling drives the divider before the page moves on.
 */

const Chev = ({ d }: { d: string }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

function SlopHero() {
  return (
    <div className="slop" role="img" aria-label="Before: a generic AI-generated pixel art platform landing page with a purple gradient, emoji, gradient text and identical feature cards">
      <div className="slop-nav">
        <span className="slop-logo">✨ PrismaPixel</span>
        <span className="slop-links">
          {["Home", "Features", "Gallery", "Pricing", "Contact"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
        <span className="slop-cta">Sign Up 🚀</span>
      </div>
      <span className="slop-badge">🎉 Welcome to the Future of Pixel Art</span>
      <h3 className="slop-h">
        Unlock Your <span>Pixel Art Potential</span> With Prisma
      </h3>
      <p className="slop-p">
        Prisma is a revolutionary, AI-powered, cutting-edge platform that empowers pixel artists and game creators to seamlessly unleash their creativity and elevate their retro artwork to the next level.
      </p>
      <div className="slop-btns">
        <span>Get Started 🚀</span>
        <span>Learn More →</span>
      </div>
      <div className="slop-cards">
        {[
          ["⚡", "Lightning Fast", "Create stunning pixel art in seconds."],
          ["🎨", "Endless Creativity", "Unleash your imagination like never before."],
          ["🌍", "Global Community", "Connect with pixel artists all over the world."],
        ].map(([e, t, d]) => (
          <div key={t} className="slop-card">
            <b>{e}</b>
            <strong>{t}</strong>
            <small>{d}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrismaHero({ inView }: { inView: boolean }) {
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true;
    if (inView && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    else v.pause();
  }, [inView]);
  return (
    <div className={"prz" + (inView ? " prz-in" : "")} role="img" aria-label="After: a designed Prisma pixel-art collective hero over an animated pixel-art bar scene, with an oversized Prisma wordmark, a short statement and one clear Enter the gallery button">
      <video ref={vid} className="prz-bg" src="/assets/video/prisma-bg.mp4" poster="/assets/video/prisma-poster.jpg" muted loop playsInline preload="metadata" aria-hidden />
      <div className="prz-noise" />
      <div className="prz-shade" />
      <div className="prz-nav">
        {["Gallery", "Artists", "Sprite lab", "Workshops", "Commissions"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="prz-row">
        <h3 className="prz-h">
          <span className="prz-word">
            {"Prisma".split("").map((c, i) => (
              <i key={i} style={{ transitionDelay: i * 0.06 + "s" }}>
                {c}
              </i>
            ))}
            <sup>*</sup>
          </span>
        </h3>
        <div className="prz-side">
          <span className="prz-tag">Pixel art collective</span>
          <p>Prisma is a worldwide collective of pixel artists, sprite animators and indie game makers, building whole worlds one square at a time and sharing every frame of the craft.</p>
          <span className="prz-btn">
            Enter the gallery<b>→</b>
          </span>
        </div>
      </div>
    </div>
  );
}

type Gesture = { id: number; x: number; y: number; started: boolean; touch: boolean };

export default function BeforeAfter({ defaultPosition = 50, label = "Drag to compare the AI template with the designed site" }) {
  const [pos, setPos] = useState(defaultPosition);
  const [drag, setDrag] = useState(false);
  const [anim, setAnim] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const st = useRef<Gesture | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;
  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const at = (e: { clientX: number }) => {
    const r = root.current!.getBoundingClientRect();
    return clamp(((e.clientX - r.left) / (r.width || 1)) * 100);
  };
  const jump = (v: number) => {
    setAnim(true);
    setPos(clamp(v));
  };

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.3 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // Scroll-linked wipe (Before → After), then a little extra scroll lets the page move on.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const HOLD = 420;
    let over = 0, under = 0, touchY: number | null = null;
    const sec = el.closest("section");
    const engaged = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (!r.height) return false;
      if (r.top >= -24 && r.bottom <= vh + 24) return true;
      const sr = sec ? sec.getBoundingClientRect() : null;
      return !!sr && Math.abs(sr.top) <= 48 && r.top < vh * 0.6 && r.bottom > vh * 0.4;
    };
    const drive = (dy: number) => {
      if (!engaged() || st.current) return false;
      const p = posRef.current, w = el.clientWidth || 1000;
      if (dy > 0) {
        if (p <= 0) {
          over += dy;
          if (over > HOLD) {
            over = 0;
            return false;
          }
          return true;
        }
        under = 0;
      } else if (dy < 0) {
        if (p >= 100) {
          under -= dy;
          if (under > HOLD * 0.5) {
            under = 0;
            return false;
          }
          return true;
        }
        over = 0;
      } else return false;
      setAnim(false);
      const next = clamp(p - (dy / (w * 1.1)) * 100);
      posRef.current = next;
      setPos(next);
      return true;
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      if (drive(dy)) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const t = (e.target as HTMLElement | null)?.tagName;
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
      const k = ({ ArrowDown: 120, PageDown: 360, " ": 360, ArrowUp: -120, PageUp: -360 } as Record<string, number>)[e.key];
      if (!k || (e.key === " " && e.shiftKey)) return;
      if ((e.target as HTMLElement | null)?.closest?.("[data-ba-handle]")) return;
      if (drive(k)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0] ? e.touches[0].clientY : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || !e.touches[0]) return;
      const y = e.touches[0].clientY, dy = (touchY - y) * 2.2;
      touchY = y;
      if (drive(dy) && e.cancelable) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !e.isPrimary) return;
    const onHandle = !!(e.target as HTMLElement).closest("[data-ba-handle]");
    st.current = { id: e.pointerId, x: e.clientX, y: e.clientY, started: false, touch: e.pointerType === "touch" && !onHandle };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!st.current.touch) {
      st.current.started = true;
      setDrag(true);
      if (onHandle) setAnim(false);
      else jump(at(e));
      setTimeout(() => setAnim(false), 260);
    }
  };
  const move = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s || s.id !== e.pointerId) return;
    if (!s.started) {
      const dx = Math.abs(e.clientX - s.x), dy = Math.abs(e.clientY - s.y);
      if (dx < 6 && dy < 6) return;
      if (dy > dx) {
        st.current = null;
        return;
      }
      s.started = true;
      setDrag(true);
    }
    setAnim(false);
    setPos(at(e));
  };
  const up = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s || s.id !== e.pointerId) return;
    st.current = null;
    if (!s.started && e.type === "pointerup") jump(at(e));
    setDrag(false);
  };
  const key = (e: React.KeyboardEvent) => {
    const big = e.shiftKey ? 10 : 1;
    const map: Record<string, number> = { ArrowLeft: -big, ArrowDown: -big, ArrowRight: big, ArrowUp: big, PageDown: -10, PageUp: 10 };
    let v: number;
    if (e.key === "Home") v = 0;
    else if (e.key === "End") v = 100;
    else if (e.key in map) v = Math.round(pos) + map[e.key];
    else return;
    e.preventDefault();
    jump(v);
  };

  return (
    <div
      ref={root}
      className={"ba-root" + (anim ? " ba-anim" : "")}
      data-drag={drag ? "" : undefined}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="ba-layer">
        <PrismaHero inView={inView && pos < 60} />
      </div>
      <div className="ba-layer ba-clip" style={{ clipPath: "inset(0 " + (100 - pos).toFixed(2) + "% 0 0)" }}>
        <SlopHero />
      </div>
      <span className="ba-chip" data-side="l" aria-hidden style={{ opacity: pos < 14 ? 0 : 1 }}>
        <span>Before</span>
      </span>
      <span className="ba-chip" data-side="r" aria-hidden style={{ opacity: pos > 86 ? 0 : 1 }}>
        <span>After</span>
      </span>
      <div className="ba-pivot" style={{ left: pos.toFixed(2) + "%" }}>
        <span className="ba-line" />
        <div
          data-ba-handle=""
          className="ba-handle"
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(100 - pos)}
          aria-valuetext={Math.round(100 - pos) + "% designed version shown"}
          onKeyDown={key}
          onDoubleClick={() => jump(50)}
        >
          <Chev d="M15 18l-6-6 6-6" />
          <Chev d="M9 18l6-6-6-6" />
        </div>
      </div>
    </div>
  );
}
