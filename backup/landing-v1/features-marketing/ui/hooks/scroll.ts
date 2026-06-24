"use client";

import { useEffect, useRef, useState } from "react";

// ─── Scroll / motion hooks (marketing) ──────────────────────
// UI-layer hooks that encapsulate the scroll + reduced-motion plumbing the
// animated sections share. Pure math lives in domain/marketing/motion.

/** True when the user prefers reduced motion (gate all animation on this). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Nav visibility: hidden when scrolling down past a threshold, shown when
 * scrolling up. Returns whether the nav should be visible.
 */
export function useNavVisibility(threshold = 140): boolean {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < threshold) {
        setVisible(true);
      } else if (y > lastY.current + 4) {
        setVisible(false);
      } else if (y < lastY.current - 4) {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return visible;
}

/**
 * Tracks 0→1 scroll progress of an element through the viewport, plus the
 * raw window scrollY. `ref` is the section root. `progress` is how far the
 * section has travelled across its own scrollable range (for pinned blocks
 * with a tall spacer). Updates on scroll via rAF.
 */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? scrolled / total : 0;
      setValue(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress: value };
}

/** Raw window scrollY, rAF-throttled — for hero parallax. */
export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setY(window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/**
 * A looping timer that ticks `t` from 0 toward `cap` and resets. Driven by
 * rAF (not setState-on-interval) so it never restarts sibling CSS
 * animations. Pauses under reduced motion (returns the cap).
 */
export function useLoopingTimer(cap = 8, speedPerSec = 1.4): number {
  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduced) {
      setT(cap);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let cur = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      cur += dt * speedPerSec;
      if (cur > cap + 1.4) cur = 0;
      setT(cur);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cap, speedPerSec, reduced]);
  return t;
}

/** Fires once when `ref` scrolls into view (IntersectionObserver). */
export function useInView<T extends HTMLElement>(threshold = 0.45) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}
