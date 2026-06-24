// AUTO-GENERATED from the design handoff "Exact source" blocks. Do not edit by hand.
// Regenerate from NEW_HANDOFF.md if the design changes.
/* eslint-disable */
export const REPLYTE_HTML = `
<!-- ===== NAV ===== -->
<nav data-ref="navRef" style="position:fixed;top:14px;left:0;right:0;z-index:90;display:flex;justify-content:center;padding:0 16px;pointer-events:none;transition:transform .35s cubic-bezier(.16,1,.32,1);">
  <div style="pointer-events:auto;width:100%;max-width:1200px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.82);backdrop-filter:blur(12px);border:1px solid #e3e6e9;border-radius:16px;padding:12px 14px 12px 22px;box-shadow:0 12px 34px -24px rgba(20,23,26,.4);">
    <span style="display:inline-flex;align-items:center;gap:10px;font-family:'Space Grotesk';font-weight:600;font-size:20px;letter-spacing:-.02em;color:#14171a;">
      <img src="/marketing/logo-mark.png" alt="Replyte" style="height:27px;width:auto;display:block;" />Replyte
    </span>
    <div style="display:flex;align-items:center;gap:30px;" data-hide-mobile>
      <a href="#how" style="font-size:14px;font-weight:500;color:#6b7280;text-decoration:none;">How it works</a>
      <a href="#proof" style="font-size:14px;font-weight:500;color:#6b7280;text-decoration:none;">Proof</a>
      <a href="#faq" style="font-size:14px;font-weight:500;color:#6b7280;text-decoration:none;">FAQ</a>
    </div>
    <button style="display:inline-flex;align-items:center;gap:10px;color:#fff;border:none;border-radius:999px;padding:6px 6px 6px 18px;font-family:'DM Sans';font-size:14px;font-weight:600;cursor:pointer;background-color:#14171a;background-image:linear-gradient(#2f6bf2,#2f6bf2);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease;" data-hover="background-size:100% 100%;">See the live demo<span style="position:relative;z-index:2;flex:none;width:30px;height:30px;border-radius:50%;background:#2f6bf2;display:grid;place-items:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
  </div>
</nav>

<!-- ===== HERO ===== -->
<section data-screen-label="Hero" style="position:relative;min-height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:150px 6vw 80px;">
  <!-- full-bleed colour field -->
  <div data-ref="bgRef" style="position:absolute;inset:-14%;z-index:0;will-change:transform;background:url('/marketing/hero-bg.png') center 40%/cover no-repeat,radial-gradient(34% 42% at 24% 30%,rgba(47,107,242,.22),transparent 66%),radial-gradient(32% 40% at 80% 26%,rgba(109,86,207,.20),transparent 66%),radial-gradient(38% 46% at 72% 78%,rgba(224,98,63,.17),transparent 66%),radial-gradient(32% 42% at 20% 80%,rgba(31,157,87,.16),transparent 66%),linear-gradient(180deg,#fbfcff,#f3f5fb);"></div>
  <!-- legibility wash: keeps the headline readable over any photo -->
  <div style="position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(255,255,255,.5) 0%,rgba(255,255,255,.14) 26%,rgba(255,255,255,0) 52%);pointer-events:none;"></div>
  <!-- animated ripple rings -->
  <div style="position:absolute;z-index:1;top:50%;left:50%;transform:translate(-50%,-50%);width:860px;height:860px;pointer-events:none;opacity:.65;">
    <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(47,107,242,.20);animation:ripple 5s ease-out infinite;"></div>
    <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(109,86,207,.18);animation:ripple 5s ease-out infinite 1.7s;"></div>
    <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(224,98,63,.16);animation:ripple 5s ease-out infinite 3.4s;"></div>
  </div>

  <!-- centred copy -->
  <div style="position:relative;z-index:10;max-width:760px;">
    <span style="display:inline-flex;align-items:center;gap:9px;padding:8px 16px 8px 12px;border:1px solid rgba(255,255,255,.75);border-radius:999px;background:rgba(255,255,255,.5);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-size:13px;font-weight:600;color:#1d4fd7;box-shadow:0 10px 26px -18px rgba(20,23,26,.45);">
      Speed-to-lead for real estate
    </span>
    <h1 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(46px,6.4vw,88px);line-height:1.0;letter-spacing:-.035em;margin:26px 0 0;color:#14171a;text-wrap:balance;">
      Answer every buyer in <span style="color:#1f9d57;">8&nbsp;seconds.</span><br />Not <span style="color:#6b7785;">15&nbsp;hours.</span>
    </h1>
    <p style="margin:24px auto 0;font-size:clamp(16px,1.4vw,19px);line-height:1.6;color:#5f6670;max-width:560px;">
      The first agent to reply wins the deal <strong style="color:#3d444c;font-weight:600;">78% of the time.</strong> Give your listings an AI that texts buyers back instantly, qualifies them, and books the viewing — branded as your agency.
    </p>
    <div style="display:flex;align-items:center;justify-content:center;gap:13px;margin-top:34px;flex-wrap:wrap;">
      <button style="display:inline-flex;align-items:center;gap:12px;color:#fff;border:none;border-radius:999px;padding:8px 8px 8px 24px;font-family:'DM Sans';font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 18px 38px -18px rgba(20,23,26,.6);background-color:#14171a;background-image:linear-gradient(#2f6bf2,#2f6bf2);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease;" data-hover="background-size:100% 100%;">Watch it text you
        <span style="position:relative;z-index:2;width:34px;height:34px;border-radius:50%;background:#2f6bf2;display:grid;place-items:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <button style="display:inline-flex;align-items:center;gap:10px;color:#14171a;border:1px solid rgba(20,23,26,.16);border-radius:999px;padding:6px 6px 6px 22px;font-family:'DM Sans';font-size:15px;font-weight:600;cursor:pointer;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background-color:rgba(255,255,255,.55);background-image:linear-gradient(#14171a,#14171a);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease,border-color .3s ease;" data-hover="background-size:100% 100%;color:#fff;border-color:transparent;">Book a 15-min call<span style="position:relative;z-index:2;flex:none;width:30px;height:30px;border-radius:50%;background:#14171a;display:grid;place-items:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
    </div>
  </div>

  <!-- glassy floating stage -->
  <div data-hero-stage style="position:relative;z-index:9;width:100%;height:360px;margin-top:48px;">
    <!-- centre phone (glass) -->
    <div style="position:absolute;left:calc(50% - 150px);top:4px;width:300px;background:rgba(255,255,255,.6);backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5);border:1px solid rgba(255,255,255,.8);border-radius:26px;padding:15px 14px 17px;box-shadow:0 46px 80px -36px rgba(20,23,26,.5);animation:floaty 7s ease-in-out infinite;z-index:5;text-align:left;">
      <div style="display:flex;align-items:center;gap:9px;padding:2px 6px 11px;border-bottom:1px solid rgba(20,23,26,.08);">
        <span style="width:32px;height:32px;border-radius:50%;background:#14171a;color:#fff;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:600;font-size:13px;">A</span>
        <span style="display:flex;flex-direction:column;line-height:1.25;"><span style="font-size:13px;font-weight:600;color:#14171a;white-space:nowrap;">Aspen Realty</span><span style="font-size:11px;color:#1f9d57;font-weight:600;white-space:nowrap;">Active now</span></span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;padding:13px 2px 2px;">
        <div style="align-self:flex-end;max-width:84%;background:rgba(20,23,26,.07);color:#14171a;font-size:12.5px;line-height:1.45;padding:9px 12px;border-radius:14px 14px 4px 14px;">Hi, is 14 Aspen Court still available? Could I see it this weekend?</div>
        <div style="align-self:flex-start;max-width:88%;background:#2f6bf2;color:#fff;font-size:12.5px;line-height:1.45;padding:9px 12px;border-radius:14px 14px 14px 4px;">Hi Jordan! Yes — Saturday 11am or Sunday 2pm. Which suits you?</div>
        <span style="align-self:flex-start;font-size:10.5px;color:#9aa1a9;font-family:'DM Mono';padding-left:4px;">Delivered · <span data-bind="timerText">0.0s</span></span>
      </div>
    </div>
    <!-- left: live timer (glass) -->
    <div style="position:absolute;left:4vw;top:118px;width:214px;background:rgba(255,255,255,.6);backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(255,255,255,.8);border-radius:18px;padding:15px 17px;box-shadow:0 34px 64px -34px rgba(20,23,26,.42);animation:floaty 6s ease-in-out infinite .8s;text-align:left;z-index:4;">
      <span style="font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;">Response time</span>
      <div style="display:flex;align-items:baseline;gap:5px;margin-top:6px;"><span style="font-family:'Space Grotesk';font-weight:700;font-size:40px;letter-spacing:-.03em;color:#1f9d57;font-variant-numeric:tabular-nums;"><span data-bind="timerNum">0.0</span></span><span style="font-family:'Space Grotesk';font-weight:600;font-size:17px;color:#1f9d57;">s</span></div>
      <div style="margin-top:7px;height:5px;border-radius:999px;background:rgba(20,23,26,.08);overflow:hidden;"><div data-ref="barRef" style="height:100%;width:8%;background:#1f9d57;border-radius:999px;"></div></div>
    </div>
    <!-- right: lead qualified (glass) -->
    <div style="position:absolute;right:4vw;top:54px;width:240px;background:rgba(255,255,255,.6);backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(255,255,255,.8);border-radius:18px;padding:16px 18px;box-shadow:0 34px 64px -34px rgba(20,23,26,.42);animation:floaty 7.5s ease-in-out infinite .4s;text-align:left;z-index:4;">
      <div style="display:flex;align-items:center;justify-content:space-between;"><span style="font-size:13px;font-weight:600;color:#14171a;">Jordan Mills</span><span style="font-size:10.5px;font-weight:600;color:#0f6b3a;background:rgba(31,157,87,.14);border-radius:999px;padding:3px 9px;">Qualified</span></div>
      <p style="margin:9px 0 0;font-size:12px;color:#6b7280;line-height:1.5;">Pre-approved · wants a weekend viewing · <strong style="color:#3d444c;font-weight:600;">booked Sun 2pm</strong></p>
    </div>
    <!-- right-lower: benchmark (glass) -->
    <div style="position:absolute;right:5vw;bottom:0;width:206px;background:rgba(255,255,255,.6);backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(255,255,255,.8);border-radius:16px;padding:13px 16px;box-shadow:0 30px 56px -34px rgba(20,23,26,.38);text-align:left;z-index:3;">
      <span style="font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;">Industry average</span>
      <div style="display:flex;align-items:baseline;gap:6px;margin-top:4px;"><span style="font-family:'Space Grotesk';font-weight:700;font-size:26px;letter-spacing:-.02em;color:#6b7785;">15</span><span style="font-size:12.5px;font-weight:600;color:#6b7785;">hrs to first reply</span></div>
    </div>
    <!-- pill: responded in 8s -->
    <div style="position:absolute;left:calc(50% - 76px);bottom:0;display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.65);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:999px;padding:9px 15px 9px 10px;box-shadow:0 18px 36px -20px rgba(20,23,26,.42);font-size:12.5px;font-weight:600;color:#0f6b3a;z-index:6;">
      <span style="width:18px;height:18px;border-radius:50%;background:#1f9d57;display:grid;place-items:center;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      Responded in 8s
    </div>
  </div>
</section>

<!-- ===== PROBLEM (spotlight carousel) ===== -->
<section data-screen-label="The problem" style="position:relative;background:#f7f8f9;padding:clamp(80px,11vh,132px) clamp(24px,5vw,72px);overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 0%,rgba(47,107,242,.06),transparent 70%),radial-gradient(50% 50% at 85% 90%,rgba(109,86,207,.05),transparent 70%);pointer-events:none;"></div>
  <div style="position:relative;text-align:center;max-width:680px;margin:0 auto;">
    <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#6b7785;">The cost of waiting</span>
    <h2 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(32px,4.4vw,56px);line-height:1.04;letter-spacing:-.03em;margin:18px 0 0;color:#14171a;text-wrap:balance;">Every hour a lead sits,<br />it cools.</h2>
    <p style="margin:20px auto 0;font-size:17px;line-height:1.6;color:#6b7280;max-width:520px;">Three numbers explain why the first agent to reply almost always wins the deal — and why speed isn’t a nicety.</p>
    <a href="#how" style="display:inline-flex;align-items:center;gap:11px;margin-top:28px;background:linear-gradient(135deg,rgba(59,123,245,.95),rgba(20,48,107,.96));color:#fff;border-radius:999px;padding:8px 8px 8px 24px;font-family:'DM Sans';font-size:14.5px;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 18px 42px -16px rgba(47,107,242,.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);" data-hover="box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 24px 50px -16px rgba(47,107,242,.85);">See how we close the gap
      <span style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.4);display:grid;place-items:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M6 13l6 6 6-6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </a>
  </div>

  <div data-ref="pcRef" data-stat-grid style="position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2vw,30px);align-items:stretch;margin-top:clamp(44px,6vh,72px);">
        <div data-pcard style="position:relative;flex:1;min-width:0;background:#fff;border:1.5px solid #6b7785;border-radius:20px;overflow:hidden;cursor:pointer;transition:opacity .55s cubic-bezier(.2,0,0,1),transform .55s cubic-bezier(.2,0,0,1),box-shadow .55s ease,border-color .55s ease,filter .55s ease;opacity:1;filter:none;transform:translateY(0) scale(1);box-shadow:0 44px 80px -44px rgba(20,23,26,.32);z-index:2;" data-action="pcA">
          <div style="position:relative;height:120px;background:linear-gradient(135deg,#64727f 0%,#2b3641 100%);padding:16px 18px;overflow:hidden;">
            <div style="position:relative;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
              <span style="font-family:'DM Sans';font-size:12.5px;font-style:italic;color:rgba(255,255,255,.9);max-width:190px;line-height:1.35;">“While you’re at a showing…”</span>
              <span style="flex:0 0 auto;font-family:'DM Mono';font-size:11px;font-weight:500;color:#fff;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:999px;padding:4px 11px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">01</span>
            </div>
            <div style="position:absolute;left:-14%;bottom:-66%;width:78%;height:115%;background:#fff;border-radius:50%;z-index:1;"></div>
          </div>
          <div style="position:relative;padding:2px 22px 24px;">
            <h3 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(40px,4vw,52px);line-height:1;letter-spacing:-.03em;margin:0;color:#14171a;">15<span style="font-size:.42em;font-weight:600;margin-left:4px;color:#3d444c;">hrs</span></h3>
            <p style="margin:10px 0 0;font-size:14.5px;line-height:1.5;color:#6b7280;max-width:260px;">the average agent’s first reply to an online lead.</p>
            <div style="height:1px;background:#eef0f2;margin:18px 0;"></div>
            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:11px;">
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6b7785;"></span>A hot lead cools within the hour</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6b7785;"></span>Most never get a second touch</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6b7785;"></span>By morning, they’ve already moved on</li>
            </ul>
          </div>
        </div>
        <div data-pcard style="position:relative;flex:1;min-width:0;background:#fff;border:1.5px solid #e6e8ec;border-radius:20px;overflow:hidden;cursor:pointer;transition:opacity .55s cubic-bezier(.2,0,0,1),transform .55s cubic-bezier(.2,0,0,1),box-shadow .55s ease,border-color .55s ease,filter .55s ease;opacity:0.4;filter:grayscale(0.9);transform:scale(0.96);box-shadow:none;z-index:1;" data-action="pcB">
          <div style="position:relative;height:120px;background:linear-gradient(135deg,#3b7bf5 0%,#15336e 100%);padding:16px 18px;overflow:hidden;">
            <div style="position:relative;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
              <span style="font-family:'DM Sans';font-size:12.5px;font-style:italic;color:rgba(255,255,255,.9);max-width:190px;line-height:1.35;">“Whoever answers first, wins.”</span>
              <span style="flex:0 0 auto;font-family:'DM Mono';font-size:11px;font-weight:500;color:#fff;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:999px;padding:4px 11px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">02</span>
            </div>
            <div style="position:absolute;left:-14%;bottom:-66%;width:78%;height:115%;background:#fff;border-radius:50%;z-index:1;"></div>
          </div>
          <div style="position:relative;padding:2px 22px 24px;">
            <h3 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(40px,4vw,52px);line-height:1;letter-spacing:-.03em;margin:0;color:#14171a;">78<span style="font-size:.42em;font-weight:600;margin-left:4px;color:#3d444c;">%</span></h3>
            <p style="margin:10px 0 0;font-size:14.5px;line-height:1.5;color:#6b7280;max-width:260px;">of buyers go with the first agent who replies.</p>
            <div style="height:1px;background:#eef0f2;margin:18px 0;"></div>
            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:11px;">
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#2f6bf2;"></span>Speed beats brand</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#2f6bf2;"></span>Speed beats price</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#2f6bf2;"></span>First reply wins the relationship</li>
            </ul>
          </div>
        </div>
        <div data-pcard style="position:relative;flex:1;min-width:0;background:#fff;border:1.5px solid #e6e8ec;border-radius:20px;overflow:hidden;cursor:pointer;transition:opacity .55s cubic-bezier(.2,0,0,1),transform .55s cubic-bezier(.2,0,0,1),box-shadow .55s ease,border-color .55s ease,filter .55s ease;opacity:0.4;filter:grayscale(0.9);transform:scale(0.96);box-shadow:none;z-index:1;" data-action="pcC">
          <div style="position:relative;height:120px;background:linear-gradient(135deg,#7c63d8 0%,#392c70 100%);padding:16px 18px;overflow:hidden;">
            <div style="position:relative;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
              <span style="font-family:'DM Sans';font-size:12.5px;font-style:italic;color:rgba(255,255,255,.9);max-width:190px;line-height:1.35;">“Persistence pays — but few persist.”</span>
              <span style="flex:0 0 auto;font-family:'DM Mono';font-size:11px;font-weight:500;color:#fff;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:999px;padding:4px 11px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">03</span>
            </div>
            <div style="position:absolute;left:-14%;bottom:-66%;width:78%;height:115%;background:#fff;border-radius:50%;z-index:1;"></div>
          </div>
          <div style="position:relative;padding:2px 22px 24px;">
            <h3 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(40px,4vw,52px);line-height:1;letter-spacing:-.03em;margin:0;color:#14171a;">½<span style="font-size:.42em;font-weight:600;margin-left:4px;color:#3d444c;"></span></h3>
            <p style="margin:10px 0 0;font-size:14.5px;line-height:1.5;color:#6b7280;max-width:260px;">of agents quit after a single follow-up.</p>
            <div style="height:1px;background:#eef0f2;margin:18px 0;"></div>
            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:11px;">
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6d56cf;"></span>Most leads need 5+ touches</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6d56cf;"></span>Manual follow-up never scales</li>
              <li style="display:flex;align-items:center;gap:11px;font-size:14px;color:#3d444c;"><span style="flex:0 0 auto;width:11px;height:1.5px;background:#6d56cf;"></span>The deal goes to whoever stays</li>
            </ul>
          </div>
        </div>
  </div>

  <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:14px;margin-top:40px;">
    <button data-action="pcPrev" aria-label="Previous" style="width:50px;height:50px;border-radius:50%;border:1px solid rgba(255,255,255,.75);background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(228,236,250,.5));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:grid;place-items:center;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 14px 28px -12px rgba(47,107,242,.4);transition:transform .2s ease,box-shadow .2s ease;" data-hover="transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,1),0 18px 34px -12px rgba(47,107,242,.6);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#2f6bf2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button data-action="pcNext" aria-label="Next" style="width:50px;height:50px;border-radius:50%;border:1px solid rgba(255,255,255,.75);background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(228,236,250,.5));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:grid;place-items:center;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 14px 28px -12px rgba(47,107,242,.4);transition:transform .2s ease,box-shadow .2s ease;" data-hover="transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,1),0 18px 34px -12px rgba(47,107,242,.6);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#2f6bf2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
</section>

<!-- ===== PINNED FEATURES (dark, Sanity-style) ===== -->
<section data-screen-label="What it does" data-ref="pinRef" data-pin-grid style="position:relative;background:#0d0f13;display:grid;grid-template-columns:clamp(190px,16vw,260px) minmax(320px,470px) minmax(0,1fr);">

      <!-- LEFT: nav list + dotted grid -->
      <div data-pin-nav-wrap style="position:sticky;top:0;align-self:start;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;padding:clamp(96px,14vh,140px) clamp(22px,2.5vw,40px) 0 clamp(24px,4vw,60px);border-right:1px solid rgba(255,255,255,.07);">
        <span style="font-family:'DM Mono';font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:26px;">What it does</span>
        <div style="display:flex;flex-direction:column;gap:4px;" data-pin-nav>
          <div data-pin-item style="display:flex;align-items:center;gap:13px;padding:10px 0;opacity:1;transition:opacity .4s ease;">
            <span data-pin-num style="flex:none;width:26px;height:26px;border-radius:7px;background:#5b8dff;border:1px solid transparent;color:#fff;display:grid;place-items:center;font-family:'DM Mono';font-size:11px;font-weight:500;transition:background .4s ease,color .4s ease,border-color .4s ease;">01</span>
            <span style="font-family:'DM Sans';font-size:14.5px;font-weight:600;letter-spacing:.005em;color:#ffffff;white-space:nowrap;">Instant reply</span>
          </div>
          <div data-pin-item style="display:flex;align-items:center;gap:13px;padding:10px 0;opacity:.36;transition:opacity .4s ease;">
            <span data-pin-num style="flex:none;width:26px;height:26px;border-radius:7px;background:transparent;border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.5);display:grid;place-items:center;font-family:'DM Mono';font-size:11px;font-weight:500;transition:background .4s ease,color .4s ease,border-color .4s ease;">02</span>
            <span style="font-family:'DM Sans';font-size:14.5px;font-weight:600;letter-spacing:.005em;color:#ffffff;white-space:nowrap;">Qualifies the lead</span>
          </div>
          <div data-pin-item style="display:flex;align-items:center;gap:13px;padding:10px 0;opacity:.36;transition:opacity .4s ease;">
            <span data-pin-num style="flex:none;width:26px;height:26px;border-radius:7px;background:transparent;border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.5);display:grid;place-items:center;font-family:'DM Mono';font-size:11px;font-weight:500;transition:background .4s ease,color .4s ease,border-color .4s ease;">03</span>
            <span style="font-family:'DM Sans';font-size:14.5px;font-weight:600;letter-spacing:.005em;color:#ffffff;white-space:nowrap;">Books the viewing</span>
          </div>
          <div data-pin-item style="display:flex;align-items:center;gap:13px;padding:10px 0;opacity:.36;transition:opacity .4s ease;">
            <span data-pin-num style="flex:none;width:26px;height:26px;border-radius:7px;background:transparent;border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.5);display:grid;place-items:center;font-family:'DM Mono';font-size:11px;font-weight:500;transition:background .4s ease,color .4s ease,border-color .4s ease;">04</span>
            <span style="font-family:'DM Sans';font-size:14.5px;font-weight:600;letter-spacing:.005em;color:#ffffff;white-space:nowrap;">Never goes cold</span>
          </div>
        </div>
        <div style="flex:1;margin:44px 28px 0 0;min-height:120px;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1.6px);background-size:20px 20px;-webkit-mask-image:linear-gradient(180deg,#000 0%,transparent 90%);mask-image:linear-gradient(180deg,#000 0%,transparent 90%);"></div>
      </div>

      <!-- MIDDLE: naturally-scrolling copy blocks -->
      <div data-pin-copy-wrap style="display:flex;flex-direction:column;padding:0 clamp(32px,4vw,68px);box-sizing:border-box;">
        <div data-pin-block style="min-height:94vh;display:flex;flex-direction:column;justify-content:center;opacity:1;transition:opacity .45s ease;">
          <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#5b8dff;">01 — Instant reply</span>
          <h3 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(32px,3.4vw,54px);line-height:1.04;letter-spacing:-.025em;margin:18px 0 0;color:#ffffff;text-wrap:balance;max-width:520px;">A real, personalised text back in seconds</h3>
          <p style="margin:22px 0 0;font-size:16.5px;line-height:1.62;color:rgba(255,255,255,.58);max-width:440px;">Greets them by name, references the exact listing they enquired about, and reads like your sharpest agent — never like a bot.</p>
          <ul style="margin:30px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:16px;">
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Replies in ~8 seconds, day or night</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Knows the listing details cold</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#5b8dff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Tuned to your agency's voice</li>
          </ul>
          <button style="margin-top:34px;align-self:flex-start;display:inline-flex;align-items:center;gap:11px;color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:9px 9px 9px 22px;font-family:'DM Mono';font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;background-color:transparent;background-image:linear-gradient(#ffffff,#ffffff);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease,border-color .3s ease;" data-hover="background-size:100% 100%;color:#14171a;border-color:#ffffff;">Watch it text you<span style="position:relative;z-index:2;flex:none;width:28px;height:28px;border-radius:50%;background:#ffffff;display:grid;place-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        </div>
        <div data-pin-block style="min-height:94vh;display:flex;flex-direction:column;justify-content:center;opacity:1;transition:opacity .45s ease;">
          <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#a78bff;">02 — Qualifies the lead</span>
          <h3 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(32px,3.4vw,54px);line-height:1.04;letter-spacing:-.025em;margin:18px 0 0;color:#ffffff;text-wrap:balance;max-width:520px;">Qualifies like your best agent would</h3>
          <p style="margin:22px 0 0;font-size:16.5px;line-height:1.62;color:rgba(255,255,255,.58);max-width:440px;">Asks the right questions one at a time — timeline, financing, availability — so the lead that reaches you is already warm.</p>
          <ul style="margin:30px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:16px;">
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Buying timeline &amp; motivation</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Pre-approved or financing</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#a78bff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>One question at a time, never a form</li>
          </ul>
          <button style="margin-top:34px;align-self:flex-start;display:inline-flex;align-items:center;gap:11px;color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:9px 9px 9px 22px;font-family:'DM Mono';font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;background-color:transparent;background-image:linear-gradient(#ffffff,#ffffff);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease,border-color .3s ease;" data-hover="background-size:100% 100%;color:#14171a;border-color:#ffffff;">See it qualify<span style="position:relative;z-index:2;flex:none;width:28px;height:28px;border-radius:50%;background:#ffffff;display:grid;place-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        </div>
        <div data-pin-block style="min-height:94vh;display:flex;flex-direction:column;justify-content:center;opacity:1;transition:opacity .45s ease;">
          <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#3ddc84;">03 — Books the viewing</span>
          <h3 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(32px,3.4vw,54px);line-height:1.04;letter-spacing:-.025em;margin:18px 0 0;color:#ffffff;text-wrap:balance;max-width:520px;">Offers real slots and books the viewing</h3>
          <p style="margin:22px 0 0;font-size:16.5px;line-height:1.62;color:rgba(255,255,255,.58);max-width:440px;">Pulls your real availability, offers times, and confirms — so you wake up to viewings on the calendar, not cold enquiries.</p>
          <ul style="margin:30px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:16px;">
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Offers your real open slots</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Confirms and sends reminders</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Syncs straight to your calendar</li>
          </ul>
          <button style="margin-top:34px;align-self:flex-start;display:inline-flex;align-items:center;gap:11px;color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:9px 9px 9px 22px;font-family:'DM Mono';font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;background-color:transparent;background-image:linear-gradient(#ffffff,#ffffff);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease,border-color .3s ease;" data-hover="background-size:100% 100%;color:#14171a;border-color:#ffffff;">See it book<span style="position:relative;z-index:2;flex:none;width:28px;height:28px;border-radius:50%;background:#ffffff;display:grid;place-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        </div>
        <div data-pin-block style="min-height:94vh;display:flex;flex-direction:column;justify-content:center;opacity:1;transition:opacity .45s ease;">
          <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#f0815f;">04 — Never goes cold</span>
          <h3 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(32px,3.4vw,54px);line-height:1.04;letter-spacing:-.025em;margin:18px 0 0;color:#ffffff;text-wrap:balance;max-width:520px;">Follows up 5×, so you never have to</h3>
          <p style="margin:22px 0 0;font-size:16.5px;line-height:1.62;color:rgba(255,255,255,.58);max-width:440px;">Most leads need five touches. The AI follows up on its own schedule until they reply or book — politely, never spammy.</p>
          <ul style="margin:30px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:16px;">
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Five smart follow-ups, spaced out</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Stops the moment they re-engage</li>
            <li style="display:flex;align-items:flex-start;gap:13px;font-size:15.5px;line-height:1.4;color:rgba(255,255,255,.84);"><svg width="23" height="23" viewBox="0 0 48 48" fill="none" style="flex:none;margin-top:1px;"><path d="M38.5 14.5C42.8 22.4 40.5 32.4 32.8 37.5 25.1 42.6 14.8 40.9 9.4 33.7 4 26.5 5.3 16.3 12.2 10.6 19.1 4.9 29.4 5.7 35.3 12.6" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round"/><path d="M15.5 24.3 21.9 31 34.7 15.2" stroke="#f0815f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Hands you only warm leads</li>
          </ul>
          <button style="margin-top:34px;align-self:flex-start;display:inline-flex;align-items:center;gap:11px;color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:9px 9px 9px 22px;font-family:'DM Mono';font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;background-color:transparent;background-image:linear-gradient(#ffffff,#ffffff);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease,border-color .3s ease;" data-hover="background-size:100% 100%;color:#14171a;border-color:#ffffff;">See the sequence<span style="position:relative;z-index:2;flex:none;width:28px;height:28px;border-radius:50%;background:#ffffff;display:grid;place-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        </div>
      </div>

      <!-- RIGHT: generated product visuals -->
      <div data-pin-vis-wrap style="position:sticky;top:0;align-self:start;height:100vh;overflow:hidden;background:#0d0f13;border-left:1px solid rgba(255,255,255,.07);">
        <div data-pin-vis style="position:absolute;inset:0;opacity:1;transform:scale(1);transition:opacity .6s ease,transform .6s ease;"><img src="/marketing/vis-01.png" alt="AI texts the buyer back in 8 seconds" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;"></div>
        <div data-pin-vis style="position:absolute;inset:0;opacity:0;transform:scale(0.985);transition:opacity .6s ease,transform .6s ease;"><img src="/marketing/vis-02.png" alt="AI qualifies the lead into a profile" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;"></div>
        <div data-pin-vis style="position:absolute;inset:0;opacity:0;transform:scale(0.985);transition:opacity .6s ease,transform .6s ease;"><img src="/marketing/vis-03.png" alt="AI books the viewing on your calendar" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;"></div>
        <div data-pin-vis style="position:absolute;inset:0;opacity:0;transform:scale(0.985);transition:opacity .6s ease,transform .6s ease;"><img src="/marketing/vis-04.png" alt="AI follows up until the buyer replies" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;"></div>
      </div>
</section>

<!-- ===== HOW IT WORKS (pinned spring-roll + cursor) ===== -->
<section data-screen-label="How it works" id="how" data-ref="hiRef" style="position:relative;background:#ffffff;">
  <div data-hi-sticky style="position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:none;">
    <div style="position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(20,23,26,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(20,23,26,.04) 1px,transparent 1px);background-size:46px 46px;-webkit-mask-image:radial-gradient(120% 90% at 50% 40%,#000 55%,transparent 100%);mask-image:radial-gradient(120% 90% at 50% 40%,#000 55%,transparent 100%);"></div>
    <div style="position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(47,107,242,.05) 1.4px,transparent 1.6px);background-size:23px 23px;"></div>
    <div data-hi-dot style="position:absolute;left:0;top:0;width:clamp(62px,7.8vw,94px);height:clamp(62px,7.8vw,94px);border-radius:50%;background:#2f6bf2;z-index:6;pointer-events:none;display:grid;place-items:center;transform:translate(-50%,-50%);box-shadow:0 16px 36px -10px rgba(47,107,242,.55);transition:background .5s cubic-bezier(.16,1,.32,1),box-shadow .5s ease;will-change:transform;">
      <div data-hi-ico="0" style="position:absolute;width:clamp(30px,3.9vw,44px);height:clamp(30px,3.9vw,44px);display:grid;place-items:center;transition:opacity .35s ease;opacity:1;"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20"/><circle cx="9" cy="8" r="3.4"/><path d="M19 8v5M21.5 10.5h-5"/></svg></div>
      <div data-hi-ico="1" style="position:absolute;width:clamp(30px,3.9vw,44px);height:clamp(30px,3.9vw,44px);display:grid;place-items:center;transition:opacity .35s ease;opacity:0;"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2.5 11 13"/><path d="M21.5 2.5 14.8 21.5l-3.8-8.5-8.5-3.8 19-6.7z"/></svg></div>
      <div data-hi-ico="2" style="position:absolute;width:clamp(30px,3.9vw,44px);height:clamp(30px,3.9vw,44px);display:grid;place-items:center;transition:opacity .35s ease;opacity:0;"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg></div>
    </div>
    <div style="position:absolute;left:50%;top:clamp(80px,12vh,120px);transform:translateX(-50%);z-index:3;font-family:'DM Mono';font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#9aa1a9;">How it works</div>
    <div style="position:relative;z-index:2;width:100%;height:100%;">
      <div data-hi-step style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:2;">
        <div style="overflow:hidden;padding-bottom:2px;margin-bottom:clamp(14px,2vh,22px);"><span data-hi-word style="display:inline-block;transform:translateY(0);transition:transform .7s cubic-bezier(.16,1,.32,1);font-family:'DM Mono';font-size:13.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#2f6bf2;">Step 01 — The enquiry</span></div>
        <div style="overflow:hidden;padding-bottom:.1em;"><h2 style="margin:0;font-family:'Space Grotesk';font-weight:700;font-size:clamp(46px,8.8vw,150px);line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#14171a;white-space:nowrap;"><span data-hi-word style="display:inline-block;transform:translateY(0);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.06s;">A</span> <span data-hi-word style="display:inline-block;transform:translateY(0);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.13s;">NEW</span> <span data-hi-word style="display:inline-block;transform:translateY(0);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.20s;color:#2f6bf2;">LEAD</span></h2></div>
        <div style="overflow:hidden;margin-top:clamp(20px,3vh,30px);max-width:560px;padding:0 24px;"><span data-hi-word style="display:inline-block;transform:translateY(0);transition:transform .75s cubic-bezier(.16,1,.32,1);transition-delay:0.32s;font-size:clamp(16px,1.5vw,19px);line-height:1.6;color:#5f6670;">They tap enquire on your branded listing and leave their number. That’s the only move they make.</span></div>
      </div>
      <div data-hi-step style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:1;">
        <div style="overflow:hidden;padding-bottom:2px;margin-bottom:clamp(14px,2vh,22px);"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .7s cubic-bezier(.16,1,.32,1);font-family:'DM Mono';font-size:13.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#1f9d57;">Step 02 — 8 seconds later</span></div>
        <div style="overflow:hidden;padding-bottom:.1em;"><h2 style="margin:0;font-family:'Space Grotesk';font-weight:700;font-size:clamp(46px,8.8vw,150px);line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#14171a;white-space:nowrap;"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.06s;">YOU</span> <span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.13s;">TEXT</span> <span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.20s;color:#1f9d57;">BACK</span></h2></div>
        <div style="overflow:hidden;margin-top:clamp(20px,3vh,30px);max-width:560px;padding:0 24px;"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .75s cubic-bezier(.16,1,.32,1);transition-delay:0.32s;font-size:clamp(16px,1.5vw,19px);line-height:1.6;color:#5f6670;">Your agency replies instantly with a real, personalised message — and starts qualifying them over SMS.</span></div>
      </div>
      <div data-hi-step style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:1;">
        <div style="overflow:hidden;padding-bottom:2px;margin-bottom:clamp(14px,2vh,22px);"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .7s cubic-bezier(.16,1,.32,1);font-family:'DM Mono';font-size:13.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#6d56cf;">Step 03 — The handoff</span></div>
        <div style="overflow:hidden;padding-bottom:.1em;"><h2 style="margin:0;font-family:'Space Grotesk';font-weight:700;font-size:clamp(46px,8.8vw,150px);line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#14171a;white-space:nowrap;"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.06s;">VIEWING</span> <span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.16,1,.32,1);transition-delay:0.13s;color:#6d56cf;">BOOKED</span></h2></div>
        <div style="overflow:hidden;margin-top:clamp(20px,3vh,30px);max-width:560px;padding:0 24px;"><span data-hi-word style="display:inline-block;transform:translateY(110%);transition:transform .75s cubic-bezier(.16,1,.32,1);transition-delay:0.25s;font-size:clamp(16px,1.5vw,19px);line-height:1.6;color:#5f6670;">It offers real slots, confirms, and hands you a warm, qualified buyer. You just show up.</span></div>
      </div>
    </div>
  </div>
  <div data-hi-spacer style="height:300vh;"></div>
</section>

<!-- ===== INTERACTIVE DEMO (playable, state-driven) ===== -->
<section data-screen-label="Demo" style="position:relative;background:#eceae5;overflow:hidden;padding:clamp(80px,12vh,140px) clamp(24px,5vw,72px);">
  <div style="position:absolute;inset:0;background:radial-gradient(50% 50% at 22% 18%,rgba(47,107,242,.16),transparent 70%),radial-gradient(46% 50% at 86% 84%,rgba(31,157,87,.13),transparent 70%);pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(20,23,26,.05) 1px,transparent 1.6px);background-size:26px 26px;opacity:.6;pointer-events:none;"></div>

  <div data-demo-grid style="position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,72px);align-items:center;">
    <div style="position:relative;">
      <span style="position:absolute;left:-10px;top:-14px;width:20px;height:20px;border-left:1.5px solid rgba(20,23,26,.22);border-top:1.5px solid rgba(20,23,26,.22);pointer-events:none;"></span>
      <span style="position:absolute;right:-10px;top:-14px;width:20px;height:20px;border-right:1.5px solid rgba(20,23,26,.22);border-top:1.5px solid rgba(20,23,26,.22);pointer-events:none;"></span>

      <span style="font-family:'DM Mono';font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#f0815f;">[ Don’t take our word for it ]</span>
      <h2 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(34px,4.4vw,60px);line-height:.96;letter-spacing:-.03em;text-transform:uppercase;margin:20px 0 0;color:#14171a;">Watch your<br />phone buzz.</h2>
      <p style="margin:20px 0 0;font-size:15.5px;line-height:1.62;color:#5f6670;max-width:420px;">Drop your details in and our demo agency texts back in seconds — a real, personalised reply. Feel exactly what your buyer feels.</p>

      <div style="margin-top:clamp(30px,4.4vh,44px);display:flex;flex-direction:column;gap:24px;max-width:450px;">
        <label style="display:block;">
          <span style="font-family:'DM Mono';font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(20,23,26,.55);">Your name</span>
          <input data-dm-name placeholder="Jordan Mills" style="display:block;width:100%;margin-top:10px;border:none;border-bottom:1.5px solid rgba(20,23,26,.22);background:repeating-linear-gradient(135deg,rgba(20,23,26,.05) 0 1px,transparent 1px 8px);padding:13px 8px;font-family:'DM Sans';font-size:16px;color:#14171a;outline:none;transition:border-color .25s ease,background .25s ease;box-sizing:border-box;" data-focus="border-bottom-color:#2f6bf2;background:repeating-linear-gradient(135deg,rgba(47,107,242,.07) 0 1px,transparent 1px 8px);" />
        </label>
        <label style="display:block;">
          <span style="font-family:'DM Mono';font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(20,23,26,.55);">Mobile number</span>
          <input data-dm-phone placeholder="+1 (555) 012 3456" style="display:block;width:100%;margin-top:10px;border:none;border-bottom:1.5px solid rgba(20,23,26,.22);background:repeating-linear-gradient(135deg,rgba(20,23,26,.05) 0 1px,transparent 1px 8px);padding:13px 8px;font-family:'DM Sans';font-size:16px;color:#14171a;outline:none;transition:border-color .25s ease,background .25s ease;box-sizing:border-box;" data-focus="border-bottom-color:#2f6bf2;background:repeating-linear-gradient(135deg,rgba(47,107,242,.07) 0 1px,transparent 1px 8px);" />
        </label>

        <div style="display:flex;align-items:flex-start;gap:11px;margin-top:2px;">
          <span style="flex:none;width:18px;height:18px;border:1.5px solid rgba(47,107,242,.9);border-radius:3px;display:grid;place-items:center;background:#2f6bf2;margin-top:1px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span style="font-family:'DM Mono';font-size:11px;line-height:1.55;letter-spacing:.03em;color:#6b7785;">By tapping below you agree to receive one demo text. Standard message rates apply.</span>
        </div>

        <div style="position:relative;margin-top:6px;">
          <span style="position:absolute;left:-6px;top:-6px;width:15px;height:15px;border-left:1.5px solid rgba(47,107,242,.85);border-top:1.5px solid rgba(47,107,242,.85);pointer-events:none;z-index:2;"></span>
          <span style="position:absolute;right:-6px;bottom:-6px;width:15px;height:15px;border-right:1.5px solid rgba(47,107,242,.85);border-bottom:1.5px solid rgba(47,107,242,.85);pointer-events:none;z-index:2;"></span>
          <button data-action="runDemo" style="width:100%;display:inline-flex;align-items:center;justify-content:space-between;gap:12px;color:#fff;border:none;border-radius:2px;padding:14px 14px 14px 22px;font-family:'DM Mono';font-size:12.5px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;box-shadow:0 22px 46px -18px rgba(47,107,242,.5);background-color:#14171a;background-image:linear-gradient(#2f6bf2,#2f6bf2);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,transform .15s ease;" data-hover="background-size:100% 100%;transform:translateY(-1px);"><span data-bind="dmBtnLabel">Text me about this home</span><span style="position:relative;z-index:2;flex:none;width:34px;height:34px;border-radius:50%;background:#2f6bf2;display:grid;place-items:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        </div>

        <div style="display:flex;align-items:center;gap:10px;font-family:'DM Mono';font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#6b7785;">
          <span>Lead status: <strong style="color:#14171a;font-weight:600;"><span data-bind="dmDashText">waiting for enquiry…</span></strong></span>
        </div>
      </div>
    </div>

    <div style="display:flex;justify-content:center;">
      <div style="position:relative;width:min(360px,100%);background:#1a1e26;border:1px solid rgba(255,255,255,.1);border-radius:36px;padding:20px 18px 22px;box-shadow:0 70px 130px -50px #000,0 0 110px -34px rgba(47,107,242,.45);">
        <div style="display:flex;align-items:center;gap:11px;padding:2px 4px 14px;border-bottom:1px solid rgba(255,255,255,.08);">
          <span style="width:38px;height:38px;border-radius:50%;background:#2f6bf2;color:#fff;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:600;font-size:15px;">A</span>
          <span style="display:flex;flex-direction:column;line-height:1.3;"><span style="font-size:14px;font-weight:600;color:#fff;">Aspen Realty</span><span style="font-size:11.5px;color:#3ddc84;font-weight:600;">Active now</span></span>
          <span style="margin-left:auto;display:inline-flex;align-items:baseline;gap:3px;font-family:'DM Mono';font-size:12px;color:rgba(255,255,255,.5);"><span style="color:#3ddc84;font-weight:500;"><span data-bind="dmTimerText">0.0</span></span>s</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:11px;padding:16px 2px 2px;min-height:230px;">
          <div style="align-self:flex-end;max-width:82%;background:rgba(255,255,255,.09);color:#e7e9ee;font-size:13px;line-height:1.45;padding:10px 13px;border-radius:15px 15px 4px 15px;">Hi, is 14 Aspen Court still available? Could I see it this weekend?</div>
          <div data-if="dmTypingShown" style="display:none;">
            <div style="align-self:flex-start;display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.08);padding:11px 14px;border-radius:15px 15px 15px 4px;">
              <span style="font-family:'DM Mono';font-size:11.5px;letter-spacing:.06em;color:#aeb4bd;">drafting reply…</span>
            </div>
          </div>
          <div data-if="dmReplyShown" style="display:none;">
            <div style="align-self:flex-start;max-width:88%;background:#2f6bf2;color:#fff;font-size:13px;line-height:1.5;padding:10px 13px;border-radius:15px 15px 15px 4px;box-shadow:0 16px 34px -12px rgba(47,107,242,.7);"><span data-bind="dmReplyText"></span><span style="opacity:.55;">|</span></div>
          </div>
        </div>
        <div data-if="dmBadgeShown" style="display:none;">
          <div style="position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);display:inline-flex;align-items:center;gap:9px;background:rgba(26,30,38,.95);backdrop-filter:blur(10px);border:1px solid rgba(61,220,132,.45);border-radius:999px;padding:10px 18px 10px 12px;box-shadow:0 24px 50px -22px rgba(0,0,0,.8);font-size:13px;font-weight:600;color:#3ddc84;white-space:nowrap;">
            <span style="width:20px;height:20px;border-radius:50%;background:#1f9d57;display:grid;place-items:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            Responded in 8.0s — beat the 15-hour average
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== PROOF ===== -->
<section id="proof" data-screen-label="Proof" data-ref="proofRef" style="background:#ffffff;padding:clamp(72px,11vh,128px) 24px;">
  <div style="max-width:1100px;margin:0 auto;text-align:center;">
    <span style="font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#1f9d57;">The proof</span>
    <h2 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(30px,3.6vw,48px);line-height:1.08;letter-spacing:-.025em;margin:16px auto 0;color:#14171a;max-width:680px;">The gap between 8 seconds<br />and 15 hours is every deal you lose</h2>
    <div style="margin-top:48px;display:flex;flex-direction:column;gap:18px;max-width:860px;margin-left:auto;margin-right:auto;text-align:left;">
      <div style="display:flex;align-items:center;gap:18px;">
        <span data-ref="proofNum1Ref" style="flex:0 0 96px;text-align:right;font-family:'Space Grotesk';font-weight:700;font-size:26px;color:#1f9d57;">8s</span>
        <div style="flex:1;height:52px;background:#f3fbf6;border:1px solid #e6f5ec;border-radius:12px;overflow:hidden;"><div data-ref="proofBar1Ref" style="height:100%;width:0;min-width:14px;background:linear-gradient(90deg,#1f9d57,#3ddc84);border-radius:12px;box-shadow:0 0 22px -2px rgba(31,157,87,.6);"></div></div>
        <span style="flex:0 0 150px;font-size:13.5px;font-weight:600;color:#0f6b3a;">Replyte responds</span>
      </div>
      <div style="display:flex;align-items:center;gap:18px;">
        <span data-ref="proofNum2Ref" style="flex:0 0 96px;text-align:right;font-family:'Space Grotesk';font-weight:700;font-size:26px;color:#6b7785;">15h</span>
        <div style="flex:1;height:52px;background:#f1f4f7;border:1px solid #e6eaef;border-radius:12px;overflow:hidden;"><div data-ref="proofBar2Ref" style="height:100%;width:0;background:repeating-linear-gradient(135deg,#aab2bd,#aab2bd 11px,#9aa3af 11px,#9aa3af 22px);background-size:44px 100%;border-radius:12px;animation:proofstripe 1s linear infinite;display:flex;align-items:center;justify-content:flex-end;"><span style="margin-right:14px;font-family:'DM Mono';font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#fff;white-space:nowrap;animation:proofpulse 1.4s ease infinite;">still waiting…</span></div></div>
        <span style="flex:0 0 150px;font-size:13.5px;font-weight:600;color:#6b7785;">Industry average</span>
      </div>
    </div>
    <p style="margin:34px auto 0;font-size:17px;line-height:1.6;color:#3d444c;max-width:560px;">In those 15 hours, a buyer texts three other agents — and goes with the one who answered first <strong style="color:#14171a;">78% of the time.</strong> Speed isn't a nicety. It's the deal.</p>
  </div>
</section>

<!-- ===== WHY US (pinned scroll-stack) ===== -->
<section id="why" data-screen-label="Why us" data-ref="whyRef" style="position:relative;height:340vh;background:#f4f4f1;">
  <div style="position:sticky;top:0;height:100vh;overflow:hidden;">
    <div style="position:absolute;inset:0;background:url('/marketing/why-bg.png') center/cover no-repeat,radial-gradient(60% 50% at 18% 20%,rgba(47,107,242,.07),transparent 70%),radial-gradient(55% 55% at 86% 82%,rgba(224,98,63,.07),transparent 70%),linear-gradient(180deg,#f6f6f3,#eeeeea);"></div>
    <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(20,23,26,.05) 1px,transparent 1.5px);background-size:30px 30px;opacity:.5;pointer-events:none;"></div>
    <svg style="position:absolute;left:6%;top:18%;width:92px;height:92px;opacity:.12;pointer-events:none;" viewBox="0 0 24 24" fill="none" stroke="#14171a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4.5"/><path d="M11.2 11.2 20 20M17 17l2-2M14 14l2-2"/></svg>
    <svg style="position:absolute;right:7%;top:14%;width:104px;height:104px;opacity:.10;pointer-events:none;" viewBox="0 0 24 24" fill="none" stroke="#14171a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M10 20v-5h4v5"/></svg>
    <svg style="position:absolute;left:9%;bottom:14%;width:88px;height:88px;opacity:.11;pointer-events:none;" viewBox="0 0 24 24" fill="none" stroke="#14171a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
    <svg style="position:absolute;right:8%;bottom:18%;width:120px;height:120px;opacity:.09;pointer-events:none;" viewBox="0 0 24 24" fill="none" stroke="#2f6bf2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/></svg>

    <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;align-items:center;padding-top:clamp(56px,8vh,92px);">
      <div style="text-align:center;max-width:640px;padding:0 24px;">
        <span style="font-family:'DM Mono';font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#6d56cf;">Why agencies choose us</span>
        <h2 style="font-family:'Space Grotesk';font-weight:600;font-size:clamp(30px,4vw,52px);line-height:1.03;letter-spacing:-.03em;margin:14px 0 0;color:#14171a;text-wrap:balance;">Four reasons it wins the room.</h2>
      </div>
      <div style="position:relative;width:100%;max-width:680px;flex:1;margin-top:clamp(24px,4vh,48px);padding:0 24px;">
        <div data-stack-card data-idx="0" style="position:absolute;left:50%;top:0px;width:100%;transform-origin:center bottom;will-change:transform,opacity;">
          <div style="background:#ffffff;border:1px solid #e6e8ea;border-radius:26px;box-shadow:0 40px 90px -40px rgba(20,23,26,.45);padding:11px 11px 0;">
            <div data-plate style="border-radius:18px;padding:21px 32px;position:relative;display:flex;align-items:center;justify-content:center;">
                            <span data-plate-title style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,2.7vw,36px);letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;">Live in minutes</span>
                          </div>
            <div style="padding:clamp(34px,4.5vw,56px) clamp(28px,4vw,48px) clamp(40px,5vw,60px);text-align:center;">
              <div style="width:84px;height:84px;border-radius:50%;border:1.5px solid #2f6bf2;display:grid;place-items:center;margin:0 auto;background:#2f6bf20f;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2f6bf2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="7.3"/><path d="M12 13.5V9"/><path d="M9.5 2.5h5"/><path d="M18.8 6.2l1.4-1.4"/></svg>
              </div>
              <p style="margin:28px auto 0;font-size:clamp(17px,1.7vw,22px);line-height:1.5;color:#3d444c;max-width:440px;">One row of data and your logo — no rebuild, no onboarding marathon. You can be live before your coffee gets cold.</p>
            </div>
          </div>
        </div>
        <div data-stack-card data-idx="1" style="position:absolute;left:50%;top:82px;width:100%;transform-origin:center bottom;will-change:transform,opacity;">
          <div style="background:#ffffff;border:1px solid #e6e8ea;border-radius:26px;box-shadow:0 40px 90px -40px rgba(20,23,26,.45);padding:11px 11px 0;">
            <div data-plate style="border-radius:18px;padding:21px 32px;position:relative;display:flex;align-items:center;justify-content:center;">
                            <span data-plate-title style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,2.7vw,36px);letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;">Branded as you</span>
                          </div>
            <div style="padding:clamp(34px,4.5vw,56px) clamp(28px,4vw,48px) clamp(40px,5vw,60px);text-align:center;">
              <div style="width:84px;height:84px;border-radius:50%;border:1.5px solid #1f9d57;display:grid;place-items:center;margin:0 auto;background:#1f9d570f;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1f9d57" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5V4.5a1.5 1.5 0 0 1 1.5-1.5h7L21 12.5 12.5 21 3 11.5z"/><circle cx="7.8" cy="7.8" r="1.5"/></svg>
              </div>
              <p style="margin:28px auto 0;font-size:clamp(17px,1.7vw,22px);line-height:1.5;color:#3d444c;max-width:440px;">Your name, your number, your tone. Buyers only ever see your agency — never a third party, never “powered by” anyone else.</p>
            </div>
          </div>
        </div>
        <div data-stack-card data-idx="2" style="position:absolute;left:50%;top:164px;width:100%;transform-origin:center bottom;will-change:transform,opacity;">
          <div style="background:#ffffff;border:1px solid #e6e8ea;border-radius:26px;box-shadow:0 40px 90px -40px rgba(20,23,26,.45);padding:11px 11px 0;">
            <div data-plate style="border-radius:18px;padding:21px 32px;position:relative;display:flex;align-items:center;justify-content:center;">
                            <span data-plate-title style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,2.7vw,36px);letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;">No CRM migration</span>
                          </div>
            <div style="padding:clamp(34px,4.5vw,56px) clamp(28px,4vw,48px) clamp(40px,5vw,60px);text-align:center;">
              <div style="width:84px;height:84px;border-radius:50%;border:1.5px solid #6d56cf;display:grid;place-items:center;margin:0 auto;background:#6d56cf0f;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6d56cf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2.5v5M15 2.5v5"/><path d="M7 7.5h10v3.2a5 5 0 0 1-10 0V7.5z"/><path d="M12 15.7V21.5"/></svg>
              </div>
              <p style="margin:28px auto 0;font-size:clamp(17px,1.7vw,22px);line-height:1.5;color:#3d444c;max-width:440px;">It just works over SMS. Nothing to install, nothing to move — it slots in beside the tools you already use.</p>
            </div>
          </div>
        </div>
        <div data-stack-card data-idx="3" style="position:absolute;left:50%;top:246px;width:100%;transform-origin:center bottom;will-change:transform,opacity;">
          <div style="background:#ffffff;border:1px solid #e6e8ea;border-radius:26px;box-shadow:0 40px 90px -40px rgba(20,23,26,.45);padding:11px 11px 0;">
            <div data-plate style="border-radius:18px;padding:21px 32px;position:relative;display:flex;align-items:center;justify-content:center;">
                            <span data-plate-title style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,2.7vw,36px);letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap;">Never off</span>
                          </div>
            <div style="padding:clamp(34px,4.5vw,56px) clamp(28px,4vw,48px) clamp(40px,5vw,60px);text-align:center;">
              <div style="width:84px;height:84px;border-radius:50%;border:1.5px solid #e0623f;display:grid;place-items:center;margin:0 auto;background:#e0623f0f;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e0623f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 13.2A8.3 8.3 0 1 1 11.3 4a6.5 6.5 0 0 0 9.2 9.2z"/><path d="M18 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/></svg>
              </div>
              <p style="margin:28px auto 0;font-size:clamp(17px,1.7vw,22px);line-height:1.5;color:#3d444c;max-width:440px;">It replies at 2am, on weekends, mid-showing. The lead that used to cool overnight gets answered in seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== FAQ (folder tabs) ===== -->
<section id="faq" data-screen-label="FAQ" style="position:relative;background:#f7f8f9;padding:clamp(40px,6vh,72px) clamp(24px,5vw,72px) clamp(80px,11vh,128px);overflow:hidden;">

  <div style="display:flex;justify-content:space-between;align-items:center;font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:.12em;color:#14171a;padding-bottom:18px;border-bottom:1px solid #14171a;">
    <span>(FAQ)</span><span style="letter-spacing:.18em;">QUESTIONS</span><span>N.05</span>
  </div>

  <div style="position:relative;text-align:center;margin-top:clamp(40px,7vh,90px);">
    <h2 style="font-family:'Space Grotesk';font-weight:500;font-size:clamp(78px,13vw,210px);line-height:.86;letter-spacing:-.045em;margin:0;color:#14171a;">FAQ</h2>
    <div style="display:flex;align-items:flex-start;gap:clamp(14px,1.6vw,22px);justify-content:center;max-width:880px;margin:clamp(28px,4vh,46px) auto 0;">
      <p style="font-family:'Space Grotesk';font-weight:400;font-size:clamp(22px,2.7vw,40px);line-height:1.16;letter-spacing:-.02em;color:#14171a;margin:0;text-align:left;">To keep things simple, we’ve answered the questions brokers actually ask before they ever pick up the phone.</p>
    </div>
  </div>

  <div style="max-width:1020px;margin:clamp(44px,7vh,86px) auto 0;">
    <div style="display:flex;align-items:flex-end;padding-left:clamp(8px,2vw,28px);">
      <button data-faq-tab="0" style="position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px clamp(16px,2vw,26px) 15px;border:1.5px solid #14171a;border-bottom:none;border-radius:13px 13px 0 0;background:#ffffff;margin-right:-1.5px;margin-bottom:-2px;z-index:4;cursor:pointer;font-family:'Space Grotesk';font-size:clamp(16px,1.9vw,25px);font-weight:500;color:#14171a;white-space:nowrap;">N°01</button>
<button data-faq-tab="1" style="position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px clamp(16px,2vw,26px) 15px;border:1.5px solid #14171a;border-bottom:none;border-radius:13px 13px 0 0;background:#eceae5;margin-right:-1.5px;margin-bottom:0;z-index:1;cursor:pointer;font-family:'Space Grotesk';font-size:clamp(16px,1.9vw,25px);font-weight:500;color:#14171a;white-space:nowrap;">N°02</button>
<button data-faq-tab="2" style="position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px clamp(16px,2vw,26px) 15px;border:1.5px solid #14171a;border-bottom:none;border-radius:13px 13px 0 0;background:#eceae5;margin-right:-1.5px;margin-bottom:0;z-index:1;cursor:pointer;font-family:'Space Grotesk';font-size:clamp(16px,1.9vw,25px);font-weight:500;color:#14171a;white-space:nowrap;">N°03</button>
<button data-faq-tab="3" style="position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px clamp(16px,2vw,26px) 15px;border:1.5px solid #14171a;border-bottom:none;border-radius:13px 13px 0 0;background:#eceae5;margin-right:-1.5px;margin-bottom:0;z-index:1;cursor:pointer;font-family:'Space Grotesk';font-size:clamp(16px,1.9vw,25px);font-weight:500;color:#14171a;white-space:nowrap;">N°04</button>
<button data-faq-tab="4" style="position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px clamp(16px,2vw,26px) 15px;border:1.5px solid #14171a;border-bottom:none;border-radius:13px 13px 0 0;background:#eceae5;margin-right:-1.5px;margin-bottom:0;z-index:1;cursor:pointer;font-family:'Space Grotesk';font-size:clamp(16px,1.9vw,25px);font-weight:500;color:#14171a;white-space:nowrap;">N°05</button>
    </div>
    <div style="position:relative;border:1.5px solid #14171a;border-radius:0 18px 18px 18px;background:#fff;min-height:clamp(360px,48vh,460px);margin-top:-1.5px;overflow:hidden;">
      <div style="padding:clamp(28px,4vw,52px) clamp(28px,4vw,52px) 90px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-family:'DM Mono';font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#14171a;">Question</span>
          <span style="font-family:'DM Mono';font-size:12px;font-weight:600;letter-spacing:.14em;color:#1f9d57;"><span data-bind="faqNo">N°01</span></span>
        </div>
        <div style="height:1px;background:#14171a;margin:12px 0 clamp(20px,3vw,32px);"></div>
        <h3 style="font-family:'Space Grotesk';font-weight:500;font-size:clamp(28px,3.7vw,54px);line-height:1.06;letter-spacing:-.03em;margin:0;color:#14171a;max-width:780px;"><span data-bind="faqQuestion">Does it actually sound like a bot?</span></h3>
      </div>

      <div data-ref="faqPanelRef" style="position:absolute;left:0;right:0;top:0;bottom:70px;margin:clamp(14px,1.8vw,22px);background:rgba(31,157,87,.24);backdrop-filter:blur(18px) saturate(1.3);-webkit-backdrop-filter:blur(18px) saturate(1.3);border:1px solid rgba(31,157,87,.5);border-radius:16px;padding:clamp(26px,3.6vw,46px);display:flex;flex-direction:column;justify-content:center;box-shadow:0 36px 70px -34px rgba(31,157,87,.55);">
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:clamp(14px,2vw,22px);">
          <span style="font-family:'DM Mono';font-size:11.5px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:#0f5f38;">Answer &middot; <span data-bind="faqNo">N°01</span></span>
        </div>
        <p data-ref="faqAnsTextRef" style="font-family:'Space Grotesk';font-weight:400;font-size:clamp(19px,2.3vw,34px);line-height:1.3;letter-spacing:-.015em;color:#0c2a1a;margin:0;max-width:840px;"><span data-bind="faqAnswer">No — that's the whole point. It's tuned to read like a sharp, human agent: short, warm, on-brand. Most buyers never suspect, and you can review every thread.</span></p>
      </div>

      <div style="position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:12px;padding:14px clamp(16px,2vw,22px);z-index:4;">
        <button data-action="toggleFaqOpen" style="flex:1;text-align:left;background:#1f9d57;color:#fff;border:none;border-radius:11px;padding:14px 18px;font-family:'DM Mono';font-size:12.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:background .2s ease;" data-hover="background:#1a8a4c;"><span data-bind="faqBarLabel">Read answer</span></button>
        <button data-action="faqPrev" aria-label="Previous" style="flex:0 0 auto;width:46px;height:46px;border-radius:50%;border:1.5px solid #14171a;background:#fff;display:grid;place-items:center;cursor:pointer;" data-hover="background:#f2f3f0;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button data-action="faqNext" aria-label="Next" style="flex:0 0 auto;width:46px;height:46px;border-radius:50%;border:1.5px solid #14171a;background:#fff;display:grid;place-items:center;cursor:pointer;" data-hover="background:#f2f3f0;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#14171a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>

<!-- ===== FINAL CTA ===== -->
<section data-screen-label="Final CTA" style="background:#ffffff;padding:clamp(18px,3vw,40px) clamp(14px,3vw,40px) clamp(72px,11vh,120px);">
  <div style="position:relative;width:100%;border-radius:clamp(28px,3vw,40px);padding:clamp(40px,7vw,100px) clamp(20px,4vw,72px);overflow:hidden;background:linear-gradient(110deg,#2f6bf2 0%,#39a2e6 30%,#26bf9e 60%,#8ad84e 100%);">
    <div style="position:absolute;left:50%;bottom:-34%;transform:translateX(-50%);width:62%;height:75%;background:radial-gradient(circle at 50% 50%,rgba(196,166,255,.6),transparent 64%);pointer-events:none;"></div>
    <div style="position:absolute;left:8%;top:-20%;width:38%;height:60%;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.35),transparent 66%);pointer-events:none;"></div>
    <div style="position:relative;z-index:2;max-width:780px;margin:0 auto;background:#ffffff;border-radius:clamp(20px,2vw,28px);padding:clamp(34px,4vw,54px) clamp(22px,4vw,56px);text-align:center;box-shadow:0 50px 110px -44px rgba(16,38,76,.5);">
      <div style="display:flex;align-items:center;justify-content:center;gap:clamp(12px,2.4vw,30px);">
        <div style="transform:rotate(-6deg);"><svg width="84" height="106" viewBox="0 0 84 106" fill="none" style="display:block;filter:drop-shadow(0 12px 22px rgba(20,30,60,.16));">
  <path d="M5,11 Q5,3 13,3 H71 Q79,3 79,11 V78 L42,92 L5,78 Z" fill="#ffffff" stroke="#e7e9ec" stroke-width="1"/>
  <path d="M5,71 L42,85 L79,71" stroke="url(#rgL)" stroke-width="4.5" fill="none" stroke-linejoin="round"/>
  <path d="M64,3 H71 Q79,3 79,11 V19 Z" fill="#2f6bf2"/>
  <path d="M72.5,7 l-3.4,5.2 h2.1 l-1.1,3.8 3.4,-5.2 h-2.1 z" fill="#ffffff"/>
  <text x="42" y="25" text-anchor="middle" font-family="'DM Mono',monospace" font-size="5.6" letter-spacing="0.8" fill="#9aa1a9">BEST SOFTWARE</text>
  <line x1="17" y1="31" x2="67" y2="31" stroke="#edeff1" stroke-width="1"/>
  <text x="42" y="54" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="18" fill="#14171a">Top 50</text>
  <text x="42" y="67" text-anchor="middle" font-family="'DM Mono',monospace" font-size="5.6" letter-spacing="1" fill="#6b7785">PROPTECH 2026</text>
  <defs><linearGradient id="rgL" x1="0" y1="0" x2="84" y2="0"><stop stop-color="#2f6bf2"/><stop offset="0.5" stop-color="#6d56cf"/><stop offset="1" stop-color="#f0815f"/></linearGradient></defs>
</svg></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding-bottom:6px;">
        <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#2f6bf2,#6d56cf);display:grid;place-items:center;box-shadow:0 10px 24px -8px rgba(47,107,242,.7);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L5 13h5l-1.5 9L19 10h-6l1-8z" fill="#fff"/></svg>
        </div>
        <div style="display:flex;gap:2px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.2l1.2-6.6L2.5 9.9l6.6-.9z"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.2l1.2-6.6L2.5 9.9l6.6-.9z"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.2l1.2-6.6L2.5 9.9l6.6-.9z"/></svg><svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.2l1.2-6.6L2.5 9.9l6.6-.9z"/></svg><svg width="15" height="15" viewBox="0 0 24 24"><defs><linearGradient id="hs"><stop offset="50%" stop-color="#f5b301"/><stop offset="50%" stop-color="#e3e6e9"/></linearGradient></defs><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.2l1.2-6.6L2.5 9.9l6.6-.9z" fill="url(#hs)"/></svg></div>
        <span style="font-size:13px;line-height:1.3;color:#14171a;font-family:'DM Sans';"><strong style="font-weight:700;">1,200+ 5-star</strong> <span style="color:#6b7785;">agent reviews</span></span>
      </div>
        <div style="transform:rotate(6deg);"><svg width="84" height="106" viewBox="0 0 84 106" fill="none" style="display:block;filter:drop-shadow(0 12px 22px rgba(20,30,60,.16));">
  <path d="M5,11 Q5,3 13,3 H71 Q79,3 79,11 V78 L42,92 L5,78 Z" fill="#ffffff" stroke="#e7e9ec" stroke-width="1"/>
  <path d="M5,71 L42,85 L79,71" stroke="url(#rgR)" stroke-width="4.5" fill="none" stroke-linejoin="round"/>
  <path d="M64,3 H71 Q79,3 79,11 V19 Z" fill="#f0815f"/>
  <path d="M72.5,7 l-3.4,5.2 h2.1 l-1.1,3.8 3.4,-5.2 h-2.1 z" fill="#ffffff"/>
  <text x="42" y="25" text-anchor="middle" font-family="'DM Mono',monospace" font-size="5.6" letter-spacing="0.8" fill="#9aa1a9">CATEGORY</text>
  <line x1="17" y1="31" x2="67" y2="31" stroke="#edeff1" stroke-width="1"/>
  <text x="42" y="54" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="18" fill="#14171a">Leader</text>
  <text x="42" y="67" text-anchor="middle" font-family="'DM Mono',monospace" font-size="5.6" letter-spacing="1" fill="#6b7785">SPRING 2026</text>
  <defs><linearGradient id="rgR" x1="0" y1="0" x2="84" y2="0"><stop stop-color="#2f6bf2"/><stop offset="0.5" stop-color="#6d56cf"/><stop offset="1" stop-color="#f0815f"/></linearGradient></defs>
</svg></div>
      </div>
      <h2 style="font-family:'Space Grotesk';font-weight:700;font-size:clamp(30px,4.6vw,56px);line-height:1.02;letter-spacing:-.03em;margin:clamp(26px,3.2vw,38px) 0 0;color:#14171a;text-wrap:balance;">Be the first reply, every time.</h2>
      <p style="margin:16px auto 0;font-size:clamp(16px,1.7vw,19px);line-height:1.55;color:#5f6670;max-width:450px;">Replyte texts back, qualifies, and books the viewing &mdash; branded as your agency, live in minutes.</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:clamp(26px,3vw,36px);flex-wrap:wrap;">
        <button style="display:inline-flex;align-items:center;gap:11px;color:#fff;border:none;border-radius:999px;padding:7px 7px 7px 26px;font-family:'DM Sans';font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 16px 34px -14px rgba(20,23,26,.5);background-color:#14171a;background-image:linear-gradient(#2f6bf2,#2f6bf2);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease;" data-hover="background-size:100% 100%;">Request a demo<span style="position:relative;z-index:2;flex:none;width:32px;height:32px;border-radius:50%;background:#2f6bf2;display:grid;place-items:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button style="display:inline-flex;align-items:center;gap:11px;color:#2f6bf2;border:none;border-radius:999px;padding:7px 7px 7px 26px;font-family:'DM Sans';font-size:15px;font-weight:600;cursor:pointer;background-color:#eaf1ff;background-image:linear-gradient(#2f6bf2,#2f6bf2);background-repeat:no-repeat;background-position:right center;background-size:0% 100%;transition:background-size .3s ease,color .3s ease;" data-hover="background-size:100% 100%;color:#fff;">Take a free tour<span style="position:relative;z-index:2;flex:none;width:32px;height:32px;border-radius:50%;background:#2f6bf2;display:grid;place-items:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12h13M12 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
      </div>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer style="background:#ffffff;border-top:1px solid #e3e6e9;padding:48px 24px 40px;">
  <div style="max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;justify-content:space-between;gap:32px;flex-wrap:wrap;">
    <div style="max-width:280px;">
      <span style="display:inline-flex;align-items:center;gap:9px;font-family:'Space Grotesk';font-weight:600;font-size:20px;letter-spacing:-.02em;color:#14171a;"><img src="/marketing/logo-mark.png" alt="Replyte" style="height:24px;width:auto;display:block;" />Replyte</span>
      <p style="margin:12px 0 0;font-size:13.5px;line-height:1.55;color:#9aa1a9;">Speed-to-lead for real estate. Answer every buyer in seconds — branded as your agency.</p>
    </div>
    <div style="display:flex;gap:56px;flex-wrap:wrap;">
      <div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9aa1a9;">Product</span><a href="#how" style="font-size:14px;color:#6b7280;text-decoration:none;">How it works</a><a href="#proof" style="font-size:14px;color:#6b7280;text-decoration:none;">Proof</a><a href="#faq" style="font-size:14px;color:#6b7280;text-decoration:none;">FAQ</a></div>
      <div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9aa1a9;">Try it</span><a href="#" style="font-size:14px;color:#6b7280;text-decoration:none;">Live demo</a><a href="#" style="font-size:14px;color:#6b7280;text-decoration:none;">Book a call</a></div>
    </div>
  </div>
  <div style="max-width:1200px;margin:32px auto 0;padding-top:20px;border-top:1px solid #eef0f2;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:12.5px;color:#9aa1a9;">
    <span>© 2026 Replyte. All rights reserved.</span>
    <span>Marketing claims and stats are illustrative — verify before publishing.</span>
  </div>
</footer>
`;
