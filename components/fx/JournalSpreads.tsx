"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Spread } from "@/lib/data";

/**
 * Journal spread carousel: open double-page spreads in 3D; neighbours fold into stacks on each side.
 * Turns pages on its own on touch devices; drag, click, arrow keys or scroll (desktop) to browse.
 */

const OPEN = 5, SIDE = 80, FOLD = 174;
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const aspectFor = (sw: number, sh: number) => (sw < 640 && sh > sw ? 0.86 : 1.25);
const widthFor = (sw: number, sh: number) => {
  if (sw <= 0 || sh <= 0) return 0;
  const narrow = sw < 640;
  return Math.round(Math.min(sw * (narrow ? 0.84 : 0.54), sh * 0.9 * aspectFor(sw, sh), 980));
};
function pose(p: number, w: number) {
  const d = Math.abs(p), a = d < 1 ? d : 1, s = p < 0 ? -1 : 1, out = d > 1 ? d - 1 : 0;
  const x = s * (a * (w * 0.5 + w * 0.03) + out * w * 0.055);
  const z = -(a * w * 0.42 + out * w * 0.06);
  const fold = a * a;
  const left = p > 0 ? OPEN + (FOLD - OPEN) * fold : OPEN + (SIDE - OPEN) * a;
  const right = p < 0 ? -(OPEN + (FOLD - OPEN) * fold) : -(OPEN + (SIDE - OPEN) * a);
  const shade = (deg: number) => clamp((Math.abs(deg) - OPEN) / 95, 0, 0.62);
  return { x, z, left, right, shadeLeft: shade(left), shadeRight: shade(right), opacity: clamp(7.2 - d, 0, 1), hidden: d > 7.2 };
}
const settle = (pos: number, v: number, n: number) => clamp(Math.round(pos + clamp(v * 0.18, -1.5, 1.5)), 0, Math.max(0, n - 1));
const durFor = (steps: number) => (steps <= 0 ? 0 : Math.round(560 * Math.sqrt(Math.min(steps, 12))));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Sheet({ s }: { s: Spread }) {
  return (
    <div className="jsc-sheet" style={{ background: s.paper }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="jsc-bg" src={s.image} alt="" draggable={false} decoding="async" />
      {s.notes.map((t, k) => (
        <div key={k} className="jsc-note" style={{ left: t.x + "%", top: t.y + "%", width: t.w + "%", transform: `rotate(${t.rotate}deg)`, background: t.bg, color: t.color }}>
          <b>{t.title}</b>
          <small>{t.kicker}</small>
          <span>{t.body}</span>
        </div>
      ))}
      <div className="jsc-tags" style={{ left: s.tagsAt.x + "%", top: s.tagsAt.y + "%", width: s.tagsAt.w + "%", transform: `rotate(${s.tagsAt.rotate}deg)` }}>
        {s.tags.map((t, k) => (
          <i key={k}>{t}</i>
        ))}
      </div>
    </div>
  );
}

type Tween = { from: number; to: number; t0: number; dur: number; ease: (t: number) => number };
type Drag = { id: number; x: number; from: number; lastX: number; lastT: number; v: number; moved: boolean };

export default function JournalSpreads({ spreads, height = "clamp(440px,64vh,680px)", initialIndex = 0, autoPlay = 2600, label = "Industries" }: { spreads: Spread[]; height?: string; initialIndex?: number; autoPlay?: number; label?: string }) {
  const n = spreads.length;
  const start = clamp(Math.round(initialIndex), 0, Math.max(0, n - 1));
  const [index, setIndex] = useState(start);
  const [reduced, setReduced] = useState(false);
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const pages = useRef<(HTMLDivElement | null)[]>([]);
  const width = useRef(0), pos = useRef(start), target = useRef(start);
  const tween = useRef<Tween | null>(null), raf = useRef(0), drag = useRef<Drag | null>(null);
  const reducedRef = useRef(false), hovered = useRef(false);

  const paint = useCallback(() => {
    const w = width.current;
    if (!w) return;
    for (let i = 0; i < items.current.length; i++) {
      const el = items.current[i];
      if (!el) continue;
      const q = pose(i - pos.current, w);
      if (q.hidden) {
        el.style.visibility = "hidden";
        continue;
      }
      el.style.visibility = "visible";
      el.style.opacity = String(q.opacity);
      el.style.transform = `translate3d(${q.x.toFixed(2)}px,0,${q.z.toFixed(2)}px)`;
      const l = pages.current[i * 2], r = pages.current[i * 2 + 1];
      if (l) {
        l.style.transform = `rotateY(${q.left.toFixed(2)}deg)`;
        l.style.setProperty("--jsc-s", q.shadeLeft.toFixed(3));
      }
      if (r) {
        r.style.transform = `rotateY(${q.right.toFixed(2)}deg)`;
        r.style.setProperty("--jsc-s", q.shadeRight.toFixed(3));
      }
    }
  }, []);
  const frame = useCallback(
    (t: number) => {
      raf.current = 0;
      const tw = tween.current;
      if (tw) {
        const k = tw.dur > 0 ? clamp((t - tw.t0) / tw.dur, 0, 1) : 1;
        pos.current = tw.from + (tw.to - tw.from) * tw.ease(k);
        if (k >= 1) tween.current = null;
      }
      paint();
      if (tween.current) raf.current = requestAnimationFrame(frame);
    },
    [paint]
  );
  const kick = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(frame);
  }, [frame]);
  const go = useCallback(
    (to: number, ease = easeInOut) => {
      const next = clamp(to, 0, Math.max(0, n - 1));
      if (next !== target.current) {
        target.current = next;
        setIndex(next);
      }
      const dur = reducedRef.current ? 0 : durFor(Math.abs(next - pos.current));
      tween.current = { from: pos.current, to: next, t0: performance.now(), dur, ease };
      kick();
    },
    [n, kick]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      reducedRef.current = mq.matches;
      setReduced(mq.matches);
    };
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const stage = stageRef.current, root = rootRef.current;
    if (!stage || !root) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: sw, height: sh } = entry.contentRect;
      const w = widthFor(sw, sh);
      width.current = w;
      root.style.setProperty("--jsc-w", w + "px");
      root.style.setProperty("--jsc-h", Math.round(w / aspectFor(sw, sh)) + "px");
      paint();
    });
    ro.observe(stage);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [paint]);

  // Auto-turn on touch devices; pauses while hovered, dragged, off-screen or in a hidden tab.
  useEffect(() => {
    const root = rootRef.current;
    if (!autoPlay || reduced || n < 2 || !root) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(root);
    const desk = window.matchMedia("(min-width: 881px) and (pointer: fine)");
    const id = window.setInterval(() => {
      if (desk.matches || !visible || document.hidden || drag.current || hovered.current) return;
      go(target.current >= n - 1 ? 0 : target.current + 1);
    }, autoPlay);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [autoPlay, reduced, n, go]);

  // Sideways scroll anywhere in the section turns the spreads.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const zone = root.closest("section") || root;
    const w = { acc: 0, at: 0, last: 0 };
    const onWheel = (e: Event) => {
      const ev = e as WheelEvent;
      if (ev.ctrlKey) return;
      const dx = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.shiftKey ? ev.deltaY : 0;
      if (!dx) return;
      ev.preventDefault();
      if (ev.timeStamp - w.last > 260) w.acc = 0;
      w.last = ev.timeStamp;
      w.acc += dx;
      if (Math.abs(w.acc) < 40 || ev.timeStamp - w.at < 320) return;
      w.at = ev.timeStamp;
      go(target.current + (w.acc > 0 ? 1 : -1));
      w.acc = 0;
    };
    zone.addEventListener("wheel", onWheel, { passive: false });
    return () => zone.removeEventListener("wheel", onWheel);
  }, [go]);

  // Desktop: when the section fills the screen, each scroll gesture turns one spread.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || n < 2) return;
    const mq = window.matchMedia("(min-width: 881px) and (pointer: fine)");
    const sec = root.closest("section");
    let lastEv = 0, lastTurn = 0, engagedAt = 0;
    const engaged = () => {
      if (!mq.matches || !sec) return false;
      return Math.abs(sec.getBoundingClientRect().top) <= 8;
    };
    const onScroll = () => {
      if (!engaged()) engagedAt = 0;
      else if (!engagedAt) engagedAt = performance.now();
    };
    const step = (dir: number, now: number, fresh: boolean) => {
      if (!engaged()) return false;
      if (!engagedAt) engagedAt = now;
      const t = target.current, atEnd = dir > 0 ? t >= n - 1 : t <= 0;
      if (atEnd) return !(fresh && now - lastTurn > 450 && now - engagedAt > 350);
      if ((fresh || now - lastTurn > 750) && now - engagedAt > 350) {
        lastTurn = now;
        go(t + dir);
      }
      return true;
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX) || Math.abs(e.deltaY) < 2) return;
      const now = performance.now(), fresh = now - lastEv > 200;
      lastEv = now;
      if (step(e.deltaY > 0 ? 1 : -1, now, fresh)) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const tg = (e.target as HTMLElement | null)?.tagName;
      if (tg === "INPUT" || tg === "TEXTAREA" || tg === "SELECT" || e.altKey || e.ctrlKey || e.metaKey) return;
      const down = e.key === "PageDown" || e.key === "ArrowDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "PageUp" || e.key === "ArrowUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (step(down ? 1 : -1, performance.now(), true)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [n, go]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || n < 1) return;
    tween.current = null;
    drag.current = { id: e.pointerId, x: e.clientX, from: pos.current, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current, w = width.current;
    if (!d || d.id !== e.pointerId || !w) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = d.v * 0.6 + (-(e.clientX - d.lastX) / (w * 0.42) / (dt / 1000)) * 0.4;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    pos.current = clamp(d.from - dx / (w * 0.42), -0.3, n - 0.7);
    kick();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (d.moved) {
      go(settle(pos.current, d.v, n), easeOut);
      return;
    }
    const hit = (e.target as HTMLElement).closest("[data-i]");
    go(hit ? Number(hit.getAttribute("data-i")) : target.current);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") go(target.current + 1);
    else if (e.key === "ArrowLeft") go(target.current - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(n - 1);
    else return;
    e.preventDefault();
  };

  const cur = spreads[index];
  return (
    <div
      ref={rootRef}
      className="jsc-root"
      style={{ height }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
    >
      <div ref={stageRef} className="jsc-stage" data-drag={dragging ? "" : undefined} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <div className="jsc-view">
          <div className="jsc-scene">
            {spreads.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  items.current[i] = el;
                }}
                className="jsc-item"
                data-i={i}
                role="group"
                aria-roledescription="spread"
                aria-label={`${s.label}, ${i + 1} of ${n}`}
                aria-hidden={i !== index}
              >
                <span className="jsc-sr">{s.alt}</span>
                {(["l", "r"] as const).map((side, k) => (
                  <div
                    key={side}
                    ref={(el) => {
                      pages.current[i * 2 + k] = el;
                    }}
                    className="jsc-page"
                    data-side={side}
                  >
                    <Sheet s={s} />
                    <div className="jsc-gutter" />
                    <div className="jsc-shade" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="jsc-dots" role="tablist" aria-label="Choose an industry">
        {spreads.map((s, i) => (
          <button key={i} type="button" role="tab" aria-label={s.label} aria-current={i === index ? "true" : undefined} onClick={() => go(i)} />
        ))}
      </div>
      <p className="jsc-sr" aria-live="polite">
        {cur ? `${cur.label}, ${index + 1} of ${n}` : ""}
      </p>
    </div>
  );
}
