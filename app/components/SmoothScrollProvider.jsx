"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScrollProvider() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    // Exact configuration used on getalchemystai.com
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      anchors: { offset: -96 },
      autoRaf: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    const handleChange = (e) => {
      if (e.matches) {
        lenis.destroy();
        lenisRef.current = null;
        window.__lenis = undefined;
      }
    };
    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  // Handle hash changes / route changes with smooth scroll
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) lenis.scrollTo(el, { offset: -96, immediate: false, duration: 1.2 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
