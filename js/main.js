const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------
// Intro: "Project Unspooled"
// Plays once per browser session (the first page a visitor opens).
// To change the wording, edit INTRO_KICKER / INTRO_TITLE / INTRO_DESC.
// To show it again while testing, run in the browser console:
//   sessionStorage.removeItem("unspooled-intro-seen")
// ---------------------------------------------------------------
const INTRO_KICKER = "Project";
const INTRO_TITLE = "Unspooled";
const INTRO_DESC =
  "A student-led initiative helping teens in West Windsor-Plainsboro break free from endless scrolling and take back their time.";
const INTRO_HOLD_MS = 4000; // time on screen before the curtain lifts

if (root.classList.contains("intro-pending")) runIntro();

function runIntro() {
  window.unspooledIntro = true; // tells the failsafe in <head> the intro is handling things
  try { sessionStorage.setItem("unspooled-intro-seen", "1"); } catch (e) {}

  const hold = reduceMotion ? 2600 : INTRO_HOLD_MS;
  const letters = [...INTRO_TITLE]
    .map((ch, i) => `<span style="--i:${i}">${ch}</span>`)
    .join("");
  const touch = window.matchMedia("(hover: none)").matches;

  const intro = document.createElement("div");
  intro.className = "intro";
  intro.setAttribute("aria-hidden", "true");
  intro.style.setProperty("--hold", hold + "ms");
  intro.innerHTML = `
    <div class="intro__glow"></div>
    <div class="intro__inner">
      <div class="intro__spool-wrap">
        <span class="intro__string"></span>
        <svg class="intro__spool" viewBox="0 0 40 40">
          <rect x="8" y="5" width="20" height="4" rx="2" fill="#fbf8f3"/>
          <rect x="8" y="31" width="20" height="4" rx="2" fill="#fbf8f3"/>
          <rect x="11" y="9" width="14" height="22" fill="#e4572e"/>
          <path d="M11 13.5h14M11 18h14M11 22.5h14M11 27h14" stroke="#c4421d" stroke-width="1.5"/>
          <path class="intro__tail" pathLength="1" d="M25 27c7 0 11 3 9 9" stroke="#e4572e" fill="none" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="intro__kicker">${INTRO_KICKER}</p>
      <div class="intro__title">${letters}</div>
      <svg class="intro__line" viewBox="0 0 340 40" fill="none">
        <path pathLength="1" d="M4 24C70 24 110 10 150 18c28 6 32 18 16 18s-12-22 10-24c34-3 74 14 152 10" stroke="#e4572e" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="332" cy="28" r="4.5" fill="#f3a712"/>
      </svg>
      <p class="intro__desc">${INTRO_DESC}</p>
    </div>
    <div class="intro__hint">${touch ? "Tap" : "Click"} anywhere to skip</div>
    <div class="intro__progress"></div>
    <div class="intro__hem"></div>`;
  document.body.appendChild(intro);

  let timer;
  let finished = false;

  const play = () => {
    if (finished || intro.classList.contains("is-playing")) return;
    intro.classList.add("is-playing");
    timer = setTimeout(leave, hold);
  };

  function leave() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    removeListeners();
    intro.classList.add("is-leaving");
    root.classList.remove("intro-pending");
    root.classList.add("intro-reveal");
    setTimeout(() => {
      intro.remove();
      root.classList.remove("intro-reveal");
    }, 2200);
  }

  // Skip on click, tap, key press, or a scroll attempt
  const skip = () => leave();
  const events = ["click", "keydown", "wheel", "touchmove"];
  events.forEach((ev) => window.addEventListener(ev, skip, { passive: true }));
  function removeListeners() {
    events.forEach((ev) => window.removeEventListener(ev, skip));
  }

  // Wait (briefly) for the heading font so the title doesn't swap mid-animation
  const fontReady =
    document.fonts && document.fonts.load
      ? document.fonts.load(`700 64px "Fraunces"`).catch(() => {})
      : Promise.resolve();
  Promise.race([fontReady, new Promise((r) => setTimeout(r, 900))]).then(() =>
    requestAnimationFrame(play)
  );
}

// ---------------------------------------------------------------
// Header: soft shadow once the page scrolls
// ---------------------------------------------------------------
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------------------------------------------------------------
// Mobile navigation toggle
// ---------------------------------------------------------------
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  const setOpen = (open) => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (links.classList.contains("open") && !e.target.closest(".nav")) setOpen(false);
  });
}

// ---------------------------------------------------------------
// Scroll reveal: content eases in as it enters the screen
// ---------------------------------------------------------------
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    "main .section h2, main .section .lead, main .section .eyebrow, .card, .cycle-step, .cycle-loop, .cta-band, main blockquote, .table-wrap, .story, .sources"
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        io.unobserve(el);
        // Clean up afterwards so hover effects aren't slowed by the reveal delay
        const done = (e) => {
          if (e.target !== el || e.propertyName !== "transform") return;
          el.removeEventListener("transitionend", done);
          el.classList.remove("reveal", "is-visible");
          el.style.transitionDelay = "";
        };
        el.addEventListener("transitionend", done);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => {
    if (el.closest(".hero, .page-hero, .intro")) return;
    // Stagger siblings in a grid so cards cascade in
    const parent = el.parentElement;
    if (parent && (parent.classList.contains("grid") || parent.classList.contains("cycle"))) {
      const index = [...parent.children].indexOf(el);
      el.style.transitionDelay = `${(index % 4) * 90}ms`;
    }
    el.classList.add("reveal");
    io.observe(el);
  });
}

// ---------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------
// Contact form: opens the visitor's email app with the message pre-filled.
// (No server needed. To change the destination, edit data-to on the <form>.)
// ---------------------------------------------------------------
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const to = form.dataset.to;
    const subject = `[Unspooled] ${data.get("topic")} — ${data.get("name")}`;
    const body =
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n` +
      `Organization: ${data.get("org") || "N/A"}\n\n` +
      `${data.get("message")}`;
    window.location.href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
