"use client";

import { useEffect } from "react";

/**
 * Page-level motion from the design:
 *  - each section's content rises in when the section arrives on screen (and resets when it leaves)
 *  - desktop with a mouse/trackpad: one wheel gesture or PageUp/PageDown = one screen
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

    // One gesture = one screen (desktop, fine pointer).
    const mq = window.matchMedia("(min-width: 881px) and (pointer: fine)");
    const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let lock = false, lastWheel = 0, raf = 0, rel = 0;
    const animTo = (top: number, done: () => void) => {
      cancelAnimationFrame(raf);
      const y0 = window.scrollY, dy = top - y0, t0 = performance.now(), dur = reduced ? 1 : 900;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo({ top: y0 + dy * easeIO(p), behavior: "instant" as ScrollBehavior });
        if (p < 1) raf = requestAnimationFrame(step);
        else done();
      };
      raf = requestAnimationFrame(step);
    };
    const go = (dir: number) => {
      const list = secs(), vh = window.innerHeight, y = window.scrollY;
      let cur = 0;
      list.forEach((x, i) => {
        if (x.getBoundingClientRect().top <= vh * 0.45) cur = i;
      });
      const r = list[cur].getBoundingClientRect();
      if (dir > 0 && r.bottom > vh + 4) return "native";
      if (dir < 0 && r.top < -4) return "native";
      const nx = Math.max(0, Math.min(list.length - 1, cur + dir));
      if (nx === cur) return dir > 0 ? "native" : "stop";
      const tr = list[nx].getBoundingClientRect();
      let top = tr.top + y;
      if (dir < 0 && tr.height > vh + 4) top += tr.height - vh;
      lock = true;
      animTo(top, () => {
        const release = () => {
          if (performance.now() - lastWheel > 220) lock = false;
          else rel = window.setTimeout(release, 80);
        };
        rel = window.setTimeout(release, 120);
      });
      return "paged";
    };
    const scrollableUp = (el: Element | null, down: boolean) => {
      while (el && el !== document.body && el !== document.documentElement) {
        const h = el as HTMLElement;
        if (h.scrollHeight > h.clientHeight + 2) {
          const oy = getComputedStyle(h).overflowY;
          if ((oy === "auto" || oy === "scroll") && (down ? h.scrollTop + h.clientHeight < h.scrollHeight - 1 : h.scrollTop > 0)) return true;
        }
        el = el.parentElement;
      }
      return false;
    };
    const onWheel = (ev: WheelEvent) => {
      if (!mq.matches || ev.defaultPrevented || ev.ctrlKey || Math.abs(ev.deltaY) < Math.abs(ev.deltaX)) return;
      lastWheel = performance.now();
      if (lock) {
        ev.preventDefault();
        return;
      }
      if (Math.abs(ev.deltaY) < 3 || scrollableUp(ev.target as Element, ev.deltaY > 0)) return;
      if (go(ev.deltaY > 0 ? 1 : -1) !== "native") ev.preventDefault();
    };
    const onKey = (ev: KeyboardEvent) => {
      if (!mq.matches || ev.defaultPrevented || ev.altKey || ev.ctrlKey || ev.metaKey) return;
      const t = ev.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      const down = ev.key === "PageDown" || ev.key === "ArrowDown" || (ev.key === " " && !ev.shiftKey);
      const up = ev.key === "PageUp" || ev.key === "ArrowUp" || (ev.key === " " && ev.shiftKey);
      if (!down && !up) return;
      if (lock) {
        ev.preventDefault();
        return;
      }
      if (go(down ? 1 : -1) !== "native") ev.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(rel);
    };
  }, []);

  return null;
}
