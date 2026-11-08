"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas photo → ordered-dither renderer (ported from the design's <ascii-effect>, dither mode only).
 * Renders the image as a monochrome Bayer-dithered field with a slow radial "pulse".
 */
type Props = {
  src: string;
  mono: string;
  cellSize?: number;
  contrast?: number; // percent, 100 = neutral
  density?: number; // 0..100
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const hexRgb = (h: string) => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export default function AsciiDither({ src, mono, cellSize = 9, contrast = 158, density = 20, animated = true, className, style }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const sm = document.createElement("canvas");
    const smx = sm.getContext("2d", { willReadFrequently: true })!;
    const lo = document.createElement("canvas");
    const lox = lo.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [mr, mg, mb] = hexRgb(mono);
    const t0 = performance.now();
    let img: HTMLImageElement | null = null;
    let L: Float32Array | null = null;
    let cols = 0, rows = 0, W = 0, H = 0, dpr = 1;
    let raf = 0, visible = true, last = 0;

    const sample = () => {
      if (!img) return;
      const cs = Math.max(2, cellSize);
      cols = Math.ceil(W / cs);
      rows = Math.ceil(H / cs);
      const s = Math.max(W / img.width, H / img.height);
      const fw = img.width * s, fh = img.height * s, fx = (W - fw) / 2, fy = (H - fh) / 2;
      sm.width = cols;
      sm.height = rows;
      smx.imageSmoothingQuality = "high";
      smx.drawImage(img, fx / cs, fy / cs, fw / cs, fh / cs);
      const d = smx.getImageData(0, 0, cols, rows).data;
      const ct = contrast / 100;
      L = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        let r = d[i * 4] / 255, g = d[i * 4 + 1] / 255, b = d[i * 4 + 2] / 255;
        r = (r - 0.5) * ct + 0.5;
        g = (g - 0.5) * ct + 0.5;
        b = (b - 0.5) * ct + 0.5;
        r = Math.min(1, Math.max(0, r));
        g = Math.min(1, Math.max(0, g));
        b = Math.min(1, Math.max(0, b));
        L[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
    };

    const draw = () => {
      if (!L) return;
      const cs = Math.max(2, cellSize);
      const t = (performance.now() - t0) / 1000;
      const dens = 0.5 + density / 50;
      const sub = 3, lw = cols * sub, lh = rows * sub;
      lo.width = lw;
      lo.height = lh;
      const im = lox.createImageData(lw, lh), o = im.data;
      const cx = cols / 2, cy = rows / 2;
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const a = animated && !reduced ? 0.6 * 0.3 * Math.sin(t * 1.6 - Math.hypot(x - cx, y - cy) * 0.06) : 0;
          const l = Math.min(1, Math.max(0, (L[i] + a) * dens));
          for (let sy = 0; sy < sub; sy++)
            for (let sx = 0; sx < sub; sx++) {
              const px = x * sub + sx, py = y * sub + sy;
              if (l <= BAYER[(py & 3) * 4 + (px & 3)]) continue;
              const p = (py * lw + px) * 4;
              o[p] = mr;
              o[p + 1] = mg;
              o[p + 2] = mb;
              o[p + 3] = 255;
            }
        }
      lox.putImageData(im, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(lo, 0, 0, lw, lh, 0, 0, cols * cs, rows * cs);
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      if (!animated || reduced || !visible) {
        draw();
        return;
      }
      const tick = (now: number) => {
        if (now - last > 33) {
          last = now;
          draw();
        }
        if (visible) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const layout = () => {
      if (!img) return;
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      cv.width = W * dpr;
      cv.height = H * dpr;
      sample();
      draw();
      loop();
    };

    const image = new Image();
    image.onload = () => {
      img = image;
      layout();
    };
    image.src = src;

    const ro = new ResizeObserver(layout);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [src, mono, cellSize, contrast, density, animated]);

  return (
    <div ref={hostRef} className={className} style={{ overflow: "hidden", ...style }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
