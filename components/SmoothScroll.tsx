"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertial smooth scrolling for wheel and trackpad (touch keeps the phone's native scrolling).
 * Wheel events a component has already claimed (e.g. the before/after wipe) are left alone.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: true,
      allowNestedScroll: true,
      virtualScroll: ({ event }) => !event.defaultPrevented,
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
