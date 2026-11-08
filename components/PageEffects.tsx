"use client";

import { useEffect } from "react";

/**
 * Page-level motion from the design:
 *  - each section's content rises in when the section arrives on screen (and resets when it leaves)
 *  (scrolling itself is handled by SmoothScroll)
 */
type Sec = HTMLElement & { _pgT?: HTMLElement[]; _pgShown?: boolean };
type Tgt = HTMLElement & { _pgTm?: number; _pgTr?: string };

export default function PageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.querySelector('[data-screen-label="Home"]') || document;
    const secs = () => Array.from(root.querySelectorAll<Sec>("section")).filter((x) => x.offsetHeight > 0 && !x.parentElement?.closest("section"));
    const ease = "cubic-bezier(.22,1,.36,1)";

    const targetsOf = (sec: Sec) => {
      if (sec._pgT) return sec._pgT;
      const out: HTMLElement[] = [];
      Array.from(sec.children).forEach((node) => {
        const c = node as HTMLElement;
        const cs = getComputedStyle(c);
        if (cs.position === "absolute" || cs.position === "fixed" || cs.position === "sticky") return;
        const kids = Array.from(c.children).filter((k) => getComputedStyle(k).position !== "absolute") as HTMLElement[];
        const row = (cs.display.includes("grid") || (cs.display.includes("flex") && cs.flexDirection.startsWith("row"))) && kids.length >= 3 && kids.length <= 12;
        if (row) out.push(...kids);
        else out.push(c);
      });
      return (sec._pgT = out.slice(0, 16));
    };
    const hide = (sec: Sec) => {
      if (reduced) return;
      sec._pgShown = false;
      targetsOf(sec).forEach((node) => {
        const t = node as Tgt;
        clearTimeout(t._pgTm);
        if (t._pgTr === undefined) t._pgTr = t.style.transition;
        t.style.transition = "none";
        t.style.opacity = "0";
        t.style.translate = "0 48px";
        t.style.scale = ".97";
      });
    };
    const show = (sec: Sec) => {
      sec._pgShown = true;
      if (reduced) return;
      targetsOf(sec).forEach((node, i) => {
        const t = node as Tgt;
        const d = Math.min(i, 10) * 90;
        t.style.transition = `opacity .8s ${ease} ${d}ms, translate 1s ${ease} ${d}ms, scale 1s ${ease} ${d}ms`;
        t.style.opacity = "";
        t.style.translate = "";
        t.style.scale = "";
        clearTimeout(t._pgTm);
        t._pgTm = window.setTimeout(() => {
          t.style.transition = t._pgTr || "";
        }, 1100 + d);
      });
    };

    const list0 = secs();
    list0.forEach((sec, i) => {
      if (i === 0) {
        sec._pgShown = true;
        return;
      }
      const r = sec.getBoundingClientRect();
      if (r.top >= window.innerHeight * 0.8 || r.bottom <= 0) hide(sec);
      else sec._pgShown = true;
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          const sec = en.target as Sec;
          if (en.intersectionRatio >= 0.3 || (en.isIntersecting && en.intersectionRect.height > window.innerHeight * 0.5)) {
            if (!sec._pgShown) show(sec);
          } else if (!en.isIntersecting && sec._pgShown) hide(sec);
        }),
      { threshold: [0, 0.3, 0.6] }
    );
    list0.forEach((sec) => io.observe(sec));

    return () => io.disconnect();
  }, []);

  return null;
}
