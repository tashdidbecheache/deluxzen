"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { WorkSite } from "@/lib/data";

/** 3D coverflow of site previews. Auto-advances, drag/arrow keys to browse, click centre card to open a preview dialog. */

const Ic = ({ d, size = 16 }: { d: string[]; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d.map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);
const I = {
  up: ["M7 17L17 7", "M7 7h10v10"],
  max: ["M15 3h6v6", "M9 21H3v-6", "M21 3l-7 7", "M3 21l7-7"],
  x: ["M18 6L6 18", "M6 6l12 12"],
};
const wrap = (v: number, n: number) => ((v % n) + n) % n;
const domain = (u?: string) => {
  try {
    return u ? new URL(u).hostname.replace(/^www\./, "") : "Project preview";
  } catch {
    return "Project preview";
  }
};

type Props = { items: WorkSite[]; initialIndex?: number; interval?: number; autoPlay?: boolean; label?: string };

export default function CoverflowCarousel({ items, initialIndex = 0, interval = 1000, autoPlay = true, label = "Selected work" }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(1100);
  const [preview, setPreview] = useState<WorkSite | null>(null);
  const [hovered, setHovered] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const gesture = useRef<{ x: number; y: number; t: number; h: boolean } | null>(null);
  const suppress = useRef(0);
  const id = useId();
  const n = items.length;

  const vw = Math.max(260, width);
  const cardWidth = Math.round(Math.min(624, vw * (vw >= 1000 ? 0.48 : vw >= 600 ? 0.53 : 0.62)));
  const step = Math.max(24, Math.min(cardWidth * 0.78, (vw / 2 - cardWidth * 0.3 - 8) / 1.62));
  const shellHeight = Math.round((cardWidth * 9) / 16 + (vw < 600 ? 150 : 140) + 60);
  const running = autoPlay && !preview && !dragging && !hovered && n > 1;
  const before = Math.min(2, Math.floor((n - 1) / 2));
  const after = Math.min(2, Math.ceil((n - 1) / 2));
  const slots = n > 1 ? Array.from({ length: before + after + 3 }, (_, p) => index + p - before - 1) : [index];

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const m = () => setWidth(el.clientWidth);
    m();
    const o = new ResizeObserver(m);
    o.observe(el);
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((c) => c + 1), Math.max(800, interval));
    return () => clearTimeout(t);
  }, [running, index, interval]);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (preview && !d.open) d.showModal();
    if (!preview && d.open) d.close();
  }, [preview]);

  const select = (v: number) => {
    setIndex(v);
    setDrag(0);
  };
  const down = (e: React.PointerEvent) => {
    if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    gesture.current = { x: e.clientX, y: e.clientY, t: performance.now(), h: false };
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = gesture.current;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (!s.h && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
      gesture.current = null;
      return;
    }
    if (!s.h && Math.abs(dx) > 8) {
      s.h = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    if (s.h) setDrag(Math.max(-1.2, Math.min(1.2, dx / step)));
  };
  const up = (e: React.PointerEvent<HTMLDivElement>, cancel?: boolean) => {
    const s = gesture.current;
    gesture.current = null;
    if (s && s.h) {
      const dx = e.clientX - s.x, vel = Math.abs(dx) / Math.max(1, performance.now() - s.t);
      if (!cancel && (Math.abs(dx) > Math.min(55, cardWidth * 0.18) || (Math.abs(dx) > 14 && vel > 0.35))) setIndex((c) => c + (dx < 0 ? 1 : -1));
      suppress.current = performance.now() + 300;
    }
    setDrag(0);
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!n) return null;

  return (
    <section
      className="gc-shell"
      aria-label={label}
      aria-roledescription="carousel"
      style={{ ["--gc-card-width" as string]: cardWidth + "px", height: shellHeight + "px" }}
      onKeyDown={(e) => {
        if (preview) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          select(index + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          select(index - 1);
        }
      }}
    >
      <div className="gc-atmosphere" aria-hidden />
      <div
        className="gc-stage"
        ref={stage}
        data-dragging={dragging || undefined}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={(e) => up(e)}
        onPointerCancel={(e) => up(e, true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="gc-floor" aria-hidden />
        {slots.map((slot) => {
          const it = items[wrap(slot, n)];
          const d = slot - index, off = d + drag, abs = Math.abs(off), sel = slot === index;
          const hidden = d < -before || d > after;
          return (
            <button
              key={slot}
              type="button"
              className="gc-card"
              data-active={sel || undefined}
              tabIndex={sel ? 0 : -1}
              aria-label={sel ? "Preview " + it.title : "Select " + it.title}
              aria-hidden={hidden || undefined}
              onClick={() => {
                if (performance.now() < suppress.current) return;
                if (sel) setPreview(it);
                else select(index + d);
              }}
              style={{
                transform: `translate3d(${off * step}px,0,${-Math.min(abs, 3) * 130}px) rotateY(${-Math.max(-42, Math.min(42, off * 30))}deg) scale(${1 - Math.min(abs, 3) * 0.08})`,
                opacity: hidden ? 0 : 1,
                zIndex: 10 - Math.abs(d),
                pointerEvents: hidden ? "none" : undefined,
                ["--gc-shade" as string]: Math.min(abs, 2) * 0.12,
              }}
            >
              <span className="gc-browser-bar" aria-hidden>
                <span className="gc-browser-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{domain(it.href)}</span>
                <Ic d={I.max} size={10} />
              </span>
              <span className="gc-poster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.title + " website preview"} draggable={false} />
                <span className="gc-poster-shade" aria-hidden />
              </span>
              <span className="gc-card-info">
                <span>
                  <strong>{it.title}</strong>
                  <span>{it.subtitle}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className="gc-dialog"
        aria-labelledby={id + "-t"}
        onClose={() => setPreview(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPreview(null);
        }}
      >
        {preview && (
          <div className="gc-dialog-panel">
            <div className="gc-dialog-bar">
              <span>
                <i /> {domain(preview.href)}
              </span>
              <button type="button" onClick={() => setPreview(null)}>
                <Ic d={I.x} size={15} /> Close
              </button>
            </div>
            <div className="gc-project-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview.image} alt={preview.title + " preview"} />
            </div>
            <div className="gc-dialog-caption">
              <div>
                <h2 id={id + "-t"}>{preview.title}</h2>
                <p>{preview.description || preview.subtitle}</p>
              </div>
              <span>{preview.subtitle}</span>
            </div>
            {preview.href && (
              <a className="gc-external" href={preview.href} target="_blank" rel="noreferrer">
                Visit website <Ic d={I.up} size={15} />
              </a>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
