"use client";

import { useEffect, useRef } from "react";
import { REPLYTE_HTML } from "../replyteMarkup";

// ─── Replyte marketing landing ──────────────────────────────
// Renders the design's VERBATIM markup (generated from the handoff's "Exact
// source" blocks → src/features/marketing/replyteMarkup.ts) and ports the
// handoff's DCLogic class method-for-method as an imperative effect. The
// markup is byte-identical to the design; this file only re-attaches the
// behaviour (hero ticker, nav, spotlight, pinned steps, how-it-works cursor,
// demo state machine, proof count-up, why-us stacking, FAQ clip reveal).
//
// Doing it this way is deliberate: a hand-rebuild drifted because the exact
// values + logic lived only in the prototype. Here nothing is re-imagined.

export function ReplyteLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s: string) => root.querySelector<HTMLElement>(s);
    const qa = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const refEl = (n: string) => q(`[data-ref="${n}"]`);
    const bind = (n: string) => qa(`[data-bind="${n}"]`);
    const setBind = (n: string, v: string) =>
      bind(n).forEach((el) => (el.textContent = v));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setInterval>[] = [];
    const cleanups: Array<() => void> = [];

    // ── Hover / focus (the prototype's style-hover / style-focus) ──
    const applyPairs = (el: HTMLElement, css: string) => {
      css.split(";").forEach((pair) => {
        const idx = pair.indexOf(":");
        if (idx === -1) return;
        const k = pair.slice(0, idx).trim();
        const v = pair.slice(idx + 1).trim();
        if (k) el.style.setProperty(k, v);
      });
    };
    const orig = new WeakMap<HTMLElement, string>();
    qa("[data-hover]").forEach((el) => {
      const hover = el.getAttribute("data-hover") || "";
      const onEnter = () => {
        orig.set(el, el.style.cssText);
        applyPairs(el, hover);
      };
      const onLeave = () => {
        const o = orig.get(el);
        if (o !== undefined) el.style.cssText = o;
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    qa("[data-focus]").forEach((el) => {
      const focus = el.getAttribute("data-focus") || "";
      const onFocus = () => {
        orig.set(el, el.style.cssText);
        applyPairs(el, focus);
      };
      const onBlur = () => {
        const o = orig.get(el);
        if (o !== undefined) el.style.cssText = o;
      };
      el.addEventListener("focus", onFocus);
      el.addEventListener("blur", onBlur);
      cleanups.push(() => {
        el.removeEventListener("focus", onFocus);
        el.removeEventListener("blur", onBlur);
      });
    });

    // ── Hero ticker (rAF, time-based — never re-renders siblings) ──
    const barRef = refEl("barRef");
    let rafTick = 0;
    if (reduce) {
      setBind("timerNum", "8.0");
      setBind("timerText", "replied 8.0s");
      if (barRef) barRef.style.width = "100%";
    } else {
      let t = 0;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        t += 0.06 * (dt / 55);
        if (t >= 9.4) t = 0;
        const shown = Math.min(t, 8);
        setBind("timerNum", shown.toFixed(1));
        setBind("timerText", t >= 8 ? "replied 8.0s" : shown.toFixed(1) + "s");
        if (barRef) {
          const pct = Math.min(100, (shown / 8) * 100);
          barRef.style.width = Math.max(8, pct) + "%";
        }
        rafTick = requestAnimationFrame(tick);
      };
      rafTick = requestAnimationFrame(tick);
    }

    // ── Pinned features ──
    const whyAccent = ["#2f6bf2", "#1f9d57", "#6d56cf", "#e0623f"];
    let _step = -1;
    const setStep = (idx: number, sec: HTMLElement, prog: number) => {
      const pinBar = refEl("pinBarRef");
      if (pinBar) pinBar.style.width = prog * 100 + "%";
      if (_step === idx) return;
      _step = idx;
      sec.querySelectorAll<HTMLElement>("[data-pin-item]").forEach((el, i) => {
        el.style.opacity = i === idx ? "1" : "0.36";
        const n = el.querySelector<HTMLElement>("[data-pin-num]");
        if (n) {
          const ac = ["#5b8dff", "#a78bff", "#3ddc84", "#f0815f"];
          n.style.background = i === idx ? ac[i] : "transparent";
          n.style.color = i === idx ? "#ffffff" : "rgba(255,255,255,0.5)";
          n.style.borderColor = i === idx ? "transparent" : "rgba(255,255,255,0.16)";
        }
      });
      sec.querySelectorAll<HTMLElement>("[data-pin-vis]").forEach((el, i) => {
        el.style.opacity = i === idx ? "1" : "0";
        el.style.transform = i === idx ? "scale(1)" : "scale(0.97)";
      });
    };

    // ── How it works ──
    let _hi = -1;
    const setHiStep = (idx: number) => {
      if (_hi === idx) return;
      _hi = idx;
      const hi = refEl("hiRef");
      if (!hi) return;
      const dotC = ["#2f6bf2", "#1f9d57", "#6d56cf"];
      const dot = hi.querySelector<HTMLElement>("[data-hi-dot]");
      if (dot) {
        dot.style.background = dotC[idx];
        dot.style.boxShadow = "0 16px 36px -10px " + dotC[idx] + "8c";
      }
      hi.querySelectorAll<HTMLElement>("[data-hi-ico]").forEach((el, i) => {
        el.style.opacity = i === idx ? "1" : "0";
      });
      hi.querySelectorAll<HTMLElement>("[data-hi-step]").forEach((b, i) => {
        const st = i === idx ? "0" : i < idx ? "-110%" : "110%";
        b.style.zIndex = i === idx ? "2" : "1";
        b.querySelectorAll<HTMLElement>("[data-hi-word]").forEach((w) => {
          w.style.transform = "translateY(" + st + ")";
        });
      });
      hi.querySelectorAll<HTMLElement>("[data-hi-pip]").forEach((p, i) => {
        p.style.background = i === idx ? "#14171a" : i < idx ? "#9aa1a9" : "#e3e6e9";
      });
    };

    // ── Scroll handler (nav, why stack, hero parallax, pinned, how) ──
    let _lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const nav = refEl("navRef");
      if (nav) {
        const goingDown = y > _lastY && y > 140;
        nav.style.transform = goingDown ? "translateY(-180%)" : "translateY(0)";
      }
      _lastY = y;

      const why = refEl("whyRef");
      if (why) {
        const rect = why.getBoundingClientRect();
        const total = why.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        const cards = why.querySelectorAll<HTMLElement>("[data-stack-card]");
        const n = cards.length;
        const af = p * n;
        cards.forEach((c, i) => {
          const lp = Math.min(1, Math.max(0, (af - i) / 0.85 + 0.18));
          const ty = (1 - lp) * 120;
          const rot = (1 - lp) * 6.5 * (i % 2 === 0 ? -1 : 1);
          c.style.transform =
            "translate(-50%, " + ty.toFixed(1) + "%) rotate(" + rot.toFixed(2) + "deg)";
          c.style.opacity = Math.min(1, lp * 5).toFixed(3);
          c.style.zIndex = String(10 + i);
          const covered = af > i + 1.05;
          const plate = c.querySelector<HTMLElement>("[data-plate]");
          const title = c.querySelector<HTMLElement>("[data-plate-title]");
          if (plate) plate.style.background = covered ? "#d4d6d2" : whyAccent[i];
          if (title) title.style.color = covered ? "#8a9099" : "#ffffff";
        });
      }

      const bg = refEl("bgRef");
      if (bg) {
        const sc = 1 + (Math.min(y, 900) / 900) * 0.12;
        bg.style.transform = "translateY(" + y * 0.16 + "px) scale(" + sc + ")";
      }

      const sec = refEl("pinRef");
      if (sec) {
        const vh = window.innerHeight;
        const blocks = sec.querySelectorAll<HTMLElement>("[data-pin-block]");
        let active = 0;
        blocks.forEach((b, i) => {
          const r = b.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - vh * 0.5);
          const op = Math.max(0.2, Math.min(1, 1.18 - d / (vh * 0.6)));
          b.style.opacity = op.toFixed(3);
          if (r.top <= vh * 0.46) active = i;
        });
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - vh;
        const prog = Math.min(0.999, Math.max(0, -rect.top / total));
        setStep(active, sec, prog);
      }

      const hi = refEl("hiRef");
      if (hi) {
        const rect = hi.getBoundingClientRect();
        const total = hi.offsetHeight - window.innerHeight;
        const prog = Math.min(0.999, Math.max(0, -rect.top / total));
        setHiStep(Math.min(2, Math.floor(prog * 3)));
      }
    };
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        handleScroll();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    // ── Custom cursor (How it works) ──
    const cursorTimeout = window.setTimeout(() => {
      const hi = refEl("hiRef");
      if (!hi) return;
      const sticky = hi.querySelector<HTMLElement>("[data-hi-sticky]");
      const dot = hi.querySelector<HTMLElement>("[data-hi-dot]");
      if (!sticky || !dot) return;
      let rect = sticky.getBoundingClientRect();
      const place = (x: number, y: number) => {
        dot.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%)";
      };
      place(rect.width / 2, rect.height / 2);
      let raf = 0;
      let mx = 0;
      let my = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          place(mx, my);
        });
      };
      const onRect = () => {
        rect = sticky.getBoundingClientRect();
      };
      sticky.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("scroll", onRect, { passive: true });
      window.addEventListener("resize", onRect, { passive: true });
      cleanups.push(() => {
        sticky.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", onRect);
        window.removeEventListener("resize", onRect);
      });
    }, 60);

    // ── Proof count-up (IntersectionObserver, once) ──
    const num1 = refEl("proofNum1Ref");
    const num2 = refEl("proofNum2Ref");
    if (num1) num1.textContent = "0s";
    if (num2) num2.textContent = "0h";
    const runProof = () => {
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      const animNum = (el: HTMLElement | null, to: number, suf: string, dur: number) => {
        if (!el) return;
        const t0 = performance.now();
        const step = (n: number) => {
          const k = Math.min(1, (n - t0) / dur);
          el.textContent = Math.round(to * ease(k)) + suf;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const b1 = refEl("proofBar1Ref");
      const b2 = refEl("proofBar2Ref");
      if (b1) {
        b1.style.transition = "width .6s cubic-bezier(.2,.9,.2,1)";
        requestAnimationFrame(() => (b1.style.width = "7%"));
      }
      if (b2) {
        b2.style.transition = "width 4.4s cubic-bezier(.1,.65,.2,1)";
        requestAnimationFrame(() => (b2.style.width = "100%"));
      }
      animNum(num1, 8, "s", 650);
      animNum(num2, 15, "h", 4400);
    };
    const proofRef = refEl("proofRef");
    let proofObs: IntersectionObserver | null = null;
    if (proofRef) {
      proofObs = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting && proofObs) {
              runProof();
              proofObs.disconnect();
            }
          });
        },
        { threshold: 0.45 },
      );
      proofObs.observe(proofRef);
    }

    // ── Spotlight carousel ──
    let _pc = 0;
    const setCard = (i: number) => {
      i = ((i % 3) + 3) % 3;
      _pc = i;
      const rootPc = refEl("pcRef");
      if (!rootPc) return;
      const accent = ["#6b7785", "#2f6bf2", "#6d56cf"];
      rootPc.querySelectorAll<HTMLElement>("[data-pcard]").forEach((c, idx) => {
        const a = idx === i;
        c.style.opacity = a ? "1" : "0.4";
        c.style.filter = a ? "none" : "grayscale(0.9)";
        c.style.transform = a ? "translateY(0) scale(1)" : "scale(0.96)";
        c.style.borderColor = a ? accent[idx] : "#e6e8ec";
        c.style.boxShadow = a ? "0 44px 80px -44px rgba(20,23,26,.32)" : "none";
        c.style.zIndex = a ? "2" : "1";
      });
    };

    // ── Demo state machine ──
    const setStage = (stage: "idle" | "sending" | "typing" | "done") => {
      const show = (name: string, on: boolean) => {
        const el = q(`[data-if="${name}"]`);
        if (el) el.style.display = on ? "contents" : "none";
      };
      show("dmTypingShown", stage === "sending");
      show("dmReplyShown", stage === "typing" || stage === "done");
      show("dmBadgeShown", stage === "done");
      setBind(
        "dmBtnLabel",
        stage === "idle"
          ? "Text me about this home"
          : stage === "done"
            ? "Run it again ↺"
            : "Sending…",
      );
      setBind(
        "dmDashText",
        stage === "idle"
          ? "waiting for enquiry…"
          : stage === "done"
            ? "qualified · booking sent"
            : "texting back…",
      );
    };
    const runDemo = () => {
      timers.forEach(clearInterval);
      timers.length = 0;
      const nameI = q("[data-dm-name]") as HTMLInputElement | null;
      const raw = ((nameI && nameI.value) || "").trim().split(/\s+/)[0] || "there";
      const name = raw.charAt(0).toUpperCase() + raw.slice(1);
      const reply =
        "Hi " +
        name +
        "! Yes — 14 Aspen Court is still available 👋 I’ve got Saturday 11am or Sunday 2pm open. Want me to lock one in for you?";
      setStage("sending");
      setBind("dmTimerText", "0.0");
      setBind("dmReplyText", "");
      let t = 0;
      const timer = setInterval(() => {
        t += 0.16;
        if (t >= 8) {
          t = 8;
          clearInterval(timer);
          setStage("typing");
          setBind("dmTimerText", "8.0");
          let i = 0;
          const type = setInterval(() => {
            i++;
            setBind("dmReplyText", reply.slice(0, i));
            if (i >= reply.length) {
              clearInterval(type);
              setStage("done");
            }
          }, 18);
          timers.push(type);
        } else {
          setBind("dmTimerText", t.toFixed(1));
        }
      }, 42);
      timers.push(timer);
    };

    // ── FAQ ──
    const FAQ = [
      {
        q: "Does it actually sound like a bot?",
        a: "No — that's the whole point. It's tuned to read like a sharp, human agent: short, warm, on-brand. Most buyers never suspect, and you can review every thread.",
      },
      {
        q: "Is this spammy or compliant?",
        a: "It only ever texts people who enquired on your listing, and it's A2P-registered for business messaging. No cold texting, no bought lists — ever.",
      },
      {
        q: "Does it work with my CRM?",
        a: "It works over SMS with zero migration. If you want, leads and bookings sync to your CRM and calendar — but nothing is required to go live.",
      },
      {
        q: "What does it cost?",
        a: "It's priced per agency, not per lead, so a single saved deal pays for it many times over. Book a 15-minute call and we'll size it to your volume.",
      },
      {
        q: "What if it doesn't know an answer about the home?",
        a: "It never invents facts. If a buyer asks something it isn't sure of, it says it'll check with you and pivots to booking the viewing — keeping the lead warm.",
      },
    ];
    let faqActive = 0;
    let faqOpen = false;
    let faqRAF = 0;
    const faqNo = (i: number) => "N°0" + (i + 1);
    const faqSetBase = () => {
      const el = refEl("faqPanelRef");
      if (el) {
        el.style.clipPath = "inset(100% 0px 0px 0px round 16px)";
        (el.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath =
          "inset(100% 0px 0px 0px round 16px)";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
    };
    const faqRun = (from: number, to: number, dur: number) => {
      const el = refEl("faqPanelRef");
      if (!el) return;
      if (faqRAF) cancelAnimationFrame(faqRAF);
      const t0 = performance.now();
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      el.style.pointerEvents = "auto";
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const cur = from + (to - from) * ease(k);
        const clip = "inset(" + cur.toFixed(2) + "% 0px 0px 0px round 16px)";
        el.style.clipPath = clip;
        (el.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath = clip;
        el.style.opacity = Math.max(0, Math.min(1, 1 - cur / 115)).toFixed(3);
        if (k < 1) faqRAF = requestAnimationFrame(step);
        else {
          faqRAF = 0;
          el.style.pointerEvents = to >= 99 ? "none" : "auto";
        }
      };
      faqRAF = requestAnimationFrame(step);
    };
    const faqOpenAnim = (quick: boolean) => faqRun(quick ? 40 : 100, 0, quick ? 470 : 730);
    const faqCloseAnim = () => faqRun(0, 100, 540);
    const updateFaq = () => {
      setBind("faqQuestion", FAQ[faqActive].q);
      setBind("faqAnswer", FAQ[faqActive].a);
      setBind("faqNo", faqNo(faqActive));
      setBind("faqBarLabel", faqOpen ? "Close answer" : "Read answer");
      qa("[data-faq-tab]").forEach((tab, i) => {
        const on = i === faqActive;
        tab.style.background = on ? "#ffffff" : "#eceae5";
        tab.style.zIndex = on ? "4" : "1";
        tab.style.marginBottom = on ? "-2px" : "0";
        const dot = tab.querySelector<HTMLElement>("span");
        if (dot) dot.style.opacity = on ? "1" : "0";
      });
    };
    const selectFaq = (i: number) => {
      faqActive = i;
      updateFaq();
      if (faqOpen) requestAnimationFrame(() => faqOpenAnim(true));
    };
    const gotoFaq = (dir: number) => {
      faqActive = (faqActive + dir + 5) % 5;
      updateFaq();
      if (faqOpen) requestAnimationFrame(() => faqOpenAnim(true));
    };
    const toggleFaqOpen = () => {
      faqOpen = !faqOpen;
      setBind("faqBarLabel", faqOpen ? "Close answer" : "Read answer");
      if (faqOpen) faqOpenAnim(false);
      else faqCloseAnim();
    };
    const faqBaseTimeout = window.setTimeout(faqSetBase, 80);

    // ── Action delegation ──
    const actions: Record<string, () => void> = {
      runDemo,
      demo: () => {
        window.location.href = "/demo-acres";
      },
      book: () =>
        window.open("https://cal.com/musawir/30min", "_blank", "noopener,noreferrer"),
      pcA: () => setCard(0),
      pcB: () => setCard(1),
      pcC: () => setCard(2),
      pcPrev: () => setCard(_pc - 1),
      pcNext: () => setCard(_pc + 1),
      toggleFaqOpen,
      faqPrev: () => gotoFaq(-1),
      faqNext: () => gotoFaq(1),
    };
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const tab = target.closest<HTMLElement>("[data-faq-tab]");
      if (tab && root.contains(tab)) {
        selectFaq(Number(tab.getAttribute("data-faq-tab")));
        return;
      }
      const act = target.closest<HTMLElement>("[data-action]");
      if (act && root.contains(act)) {
        const fn = actions[act.getAttribute("data-action") || ""];
        if (fn) fn();
      }
    };
    root.addEventListener("click", onClick);

    // ── Cleanup ──
    return () => {
      if (rafTick) cancelAnimationFrame(rafTick);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (faqRAF) cancelAnimationFrame(faqRAF);
      window.clearTimeout(cursorTimeout);
      window.clearTimeout(faqBaseTimeout);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("click", onClick);
      proofObs?.disconnect();
      timers.forEach(clearInterval);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <div ref={rootRef} className="mk-rb" dangerouslySetInnerHTML={{ __html: REPLYTE_HTML }} />;
}
