"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, DEMO } from "@/domain/marketing/content";
import {
  type DemoStage,
  demoButtonLabel,
  demoStatusLabel,
  formatTimer,
  nextTyped,
} from "@/domain/marketing/motion";
import { Check } from "../components/Icons";

// §6 — Interactive demo. A playable state machine: submit → race a 0→8s
// timer → typing dots → the reply types out char-by-char → success badge.
// The first reply in the real app is synchronous server-side; here it's a
// faithful front-end re-enactment for the pitch.

export function Demo() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<DemoStage>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [typed, setTyped] = useState("");
  const fullReply = useRef("");

  // Stage: sending → race the timer to 8.0s.
  useEffect(() => {
    if (stage !== "sending") return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = +(e + 0.2).toFixed(1);
        if (next >= 8) {
          clearInterval(id);
          setStage("typing");
          return 8;
        }
        return next;
      });
    }, 42);
    return () => clearInterval(id);
  }, [stage]);

  // Stage: typing → reveal the reply one character at a time.
  useEffect(() => {
    if (stage !== "typing") return;
    const id = setInterval(() => {
      setTyped((cur) => {
        const next = nextTyped(fullReply.current, cur);
        if (next === fullReply.current) {
          clearInterval(id);
          setStage("done");
        }
        return next;
      });
    }, 18);
    return () => clearInterval(id);
  }, [stage]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stage === "sending" || stage === "typing") return;
    if (stage === "done") {
      setStage("idle");
      setElapsed(0);
      setTyped("");
      return;
    }
    const first = name.trim().split(" ")[0] ?? "";
    fullReply.current = DEMO.reply(first);
    setElapsed(0);
    setTyped("");
    setStage("sending");
  }

  return (
    <section className="sl-mkt-demo" id="demo" data-screen-label="Demo">
      <div className="sl-mkt-demo__grid">
        {/* Left — the form */}
        <form className="sl-mkt-demo__form" onSubmit={onSubmit}>
          <span className="sl-mkt-eyebrow sl-mkt-eyebrow--coral">{DEMO.eyebrow}</span>
          <h2 className="sl-mkt-h2 sl-mkt-demo__title">{DEMO.title}</h2>
          <p className="sl-mkt-lead">{DEMO.body}</p>

          <label className="sl-mkt-demo__field">
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Avery"
            />
          </label>
          <label className="sl-mkt-demo__field">
            <span>Mobile</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-0123"
              inputMode="tel"
            />
          </label>

          <label className="sl-mkt-demo__consent">
            <input type="checkbox" defaultChecked /> {DEMO.consent}
          </label>

          <button type="submit" className="sl-mkt-demo__submit">
            {demoButtonLabel(stage, DEMO.idleButton)}
          </button>

          <p className="sl-mkt-demo__status">
            Lead status: <strong>{demoStatusLabel(stage)}</strong>
          </p>
        </form>

        {/* Right — dark phone mock */}
        <div className="sl-mkt-demo__phone">
          <div className="sl-mkt-demo__phonehdr">
            <span className="sl-mkt-demo__agency">{DEMO.agencyName}</span>
            <span className="sl-mkt-demo__active">
              Active now · {formatTimer(elapsed, 8)}s
            </span>
          </div>

          <div className="sl-mkt-demo__msg sl-mkt-demo__msg--in">{DEMO.buyerMessage}</div>

          {stage === "sending" && (
            <div className="sl-mkt-demo__typing" aria-label="typing">
              <span /> <span /> <span />
            </div>
          )}

          {(stage === "typing" || stage === "done") && (
            <div className="sl-mkt-demo__msg sl-mkt-demo__msg--out">
              {typed}
              {stage === "typing" && <span className="sl-mkt-demo__caret" />}
            </div>
          )}

          {stage === "done" && (
            <div className="sl-mkt-demo__badge">
              <span className="sl-mkt-demo__badgecheck">
                <Check size={13} />
              </span>
              {DEMO.successBadge}
            </div>
          )}

          <a className="sl-mkt-demo__seereal" href={BRAND.demoPath}>
            See the real thing →
          </a>
        </div>
      </div>
    </section>
  );
}
