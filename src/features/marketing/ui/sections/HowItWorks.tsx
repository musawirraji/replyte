"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { HOW_STEPS } from "@/domain/marketing/content";
import { accentVars, stepFromProgress } from "@/domain/marketing/motion";
import { useSectionProgress, usePrefersReducedMotion } from "../hooks/scroll";
import { PersonPlus, Send, Eye } from "../components/Icons";

// §5 — How it works. Pins for ~3 viewport-heights; the headline words roll
// up/out per step and a custom colour-morphing cursor follows the pointer.

const CURSOR_ICON = [PersonPlus, Send, Eye];

type RollState = "in" | "up" | "down";

function rollFor(stepIndex: number, active: number): RollState {
  if (stepIndex === active) return "in";
  return stepIndex < active ? "up" : "down";
}

function Word({ text, state, delay }: { text: string; state: RollState; delay: number }) {
  const y = state === "in" ? "0%" : state === "up" ? "-110%" : "110%";
  const style: CSSProperties = {
    transform: `translateY(${y})`,
    transitionDelay: `${delay}ms`,
    opacity: state === "in" ? 1 : 0,
  };
  return (
    <span className="sl-mkt-roll">
      <span className="sl-mkt-roll__inner" style={style}>
        {text}
      </span>
    </span>
  );
}

export function HowItWorks() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const active = stepFromProgress(progress, HOW_STEPS.length);
  const reduced = usePrefersReducedMotion();

  const frameRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Custom cursor: follow the pointer smoothly via rAF inside the frame.
  useEffect(() => {
    if (reduced) return;
    const frame = frameRef.current;
    const dot = dotRef.current;
    if (!frame || !dot) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let inside = false;
    const onMove = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    const onEnter = () => {
      inside = true;
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      inside = false;
      dot.style.opacity = "0";
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      void inside;
    };
  }, [reduced]);

  const activeAccent = accentVars(HOW_STEPS[active].accent).base;
  const CursorIcon = CURSOR_ICON[active] ?? PersonPlus;

  return (
    <section ref={ref} className="sl-mkt-how" id="how" data-screen-label="How it works">
      <div ref={frameRef} className="sl-mkt-how__frame">
        <div className="sl-mkt-how__grid" aria-hidden />

        {HOW_STEPS.map((step, i) => {
          const words = step.lead.split(" ");
          return (
            <div
              key={step.eyebrow}
              className={`sl-mkt-how__step${i === active ? " sl-mkt-how__step--active" : ""}`}
              style={{ "--step-accent": accentVars(step.accent).base } as CSSProperties}
            >
              <span className="sl-mkt-how__eyebrow">{step.eyebrow}</span>
              <h2 className="sl-mkt-how__head">
                {words.map((w, wi) => (
                  <Word key={`${w}-${wi}`} text={w} state={rollFor(i, active)} delay={wi * 60} />
                ))}{" "}
                <span className="sl-mkt-how__emph">
                  <Word text={step.emphasis} state={rollFor(i, active)} delay={words.length * 60} />
                </span>
              </h2>
              <p className="sl-mkt-how__sub">{step.sub}</p>
            </div>
          );
        })}

        {/* Custom cursor */}
        <div
          ref={dotRef}
          className="sl-mkt-how__cursor"
          style={{ background: activeAccent }}
          aria-hidden
        >
          <CursorIcon size={26} />
        </div>

        {/* Progress pips */}
        <div className="sl-mkt-how__pips" aria-hidden>
          {HOW_STEPS.map((s, i) => (
            <span key={s.eyebrow} className={i === active ? "is-active" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
