/* ==========================================================================
   2sday — interactions
   ========================================================================== */

/* ---------- Portfolio data ----------
   Add a video by pushing an object into the right category:
     { title: "Client — Spot name", vimeo: "123456789", thumb: "assets/thumbs/x.jpg" }
   `vimeo` is the numeric ID from the Vimeo URL. `thumb` is optional;
   without it the tile shows a numbered placeholder. */
const PLACEHOLDER_VIMEO = "76979871";

const PORTFOLIO = {
  tech: [
    { title: "Tech spot one", vimeo: PLACEHOLDER_VIMEO },
    { title: "Tech spot two", vimeo: PLACEHOLDER_VIMEO },
    { title: "Tech spot three", vimeo: PLACEHOLDER_VIMEO },
    { title: "Tech spot four", vimeo: PLACEHOLDER_VIMEO },
    { title: "Tech spot five", vimeo: PLACEHOLDER_VIMEO },
    { title: "Tech spot six", vimeo: PLACEHOLDER_VIMEO },
  ],
  lifestyle: [
    { title: "Lifestyle spot one", vimeo: PLACEHOLDER_VIMEO },
    { title: "Lifestyle spot two", vimeo: PLACEHOLDER_VIMEO },
    { title: "Lifestyle spot three", vimeo: PLACEHOLDER_VIMEO },
    { title: "Lifestyle spot four", vimeo: PLACEHOLDER_VIMEO },
    { title: "Lifestyle spot five", vimeo: PLACEHOLDER_VIMEO },
    { title: "Lifestyle spot six", vimeo: PLACEHOLDER_VIMEO },
  ],
  street: [
    { title: "Street interview one", vimeo: PLACEHOLDER_VIMEO },
    { title: "Street interview two", vimeo: PLACEHOLDER_VIMEO },
    { title: "Street interview three", vimeo: PLACEHOLDER_VIMEO },
    { title: "Street interview four", vimeo: PLACEHOLDER_VIMEO },
    { title: "Street interview five", vimeo: PLACEHOLDER_VIMEO },
    { title: "Street interview six", vimeo: PLACEHOLDER_VIMEO },
  ],
};

const CATEGORY_LABEL = { tech: "tech", lifestyle: "lifestyle", street: "street" };

const vimeoUrl = (id) =>
  `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;

/* ---------- Lightbox ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxFrame = document.getElementById("lightbox-frame");
const lightboxClose = lightbox.querySelector(".lightbox__close");
let lastFocus = null;
let onLightboxClose = null;

// Direct video files play in a native <video>; anything else (Vimeo) in an iframe
const isVideoFile = (src) => /\.(mp4|mov|webm)(\?|$)/i.test(src);

function openVideo(src, poster, onClose = null) {
  lastFocus = document.activeElement;
  onLightboxClose = onClose;
  let player;

  if (isVideoFile(src)) {
    player = document.createElement("video");
    player.src = src;
    if (poster) player.poster = poster;
    player.controls = true;
    player.playsInline = true;
    player.preload = "auto";
  } else {
    player = document.createElement("iframe");
    player.src = src;
    player.allow = "autoplay; fullscreen; picture-in-picture";
    player.allowFullscreen = true;
    player.title = "Video player";
  }

  lightboxFrame.replaceChildren(player);
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  lightboxClose.focus();

  // Called within the click, so browsers allow playback with sound.
  // If one still refuses, the visible controls let the viewer press play.
  if (player.tagName === "VIDEO") player.play().catch(() => {});
}

function closeVideo() {
  const video = lightboxFrame.querySelector("video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load(); // abort the download
  }
  lightbox.hidden = true;
  lightboxFrame.replaceChildren(); // removing an iframe stops Vimeo playback
  document.body.classList.remove("no-scroll");
  if (lastFocus) lastFocus.focus();
  if (onLightboxClose) onLightboxClose();
  onLightboxClose = null;
}

lightboxClose.addEventListener("click", closeVideo);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeVideo();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeVideo();
});

/* ---------- Video business card ---------- */

// Background loop is decorative; hold it on the poster frame for reduced-motion users
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const loop = document.querySelector(".vcard__video");
  loop.removeAttribute("autoplay");
  loop.pause();
}

// One calm sequence, each step waiting for the last:
//   1. card scrolls into view -> hint cursor glides in and "clicks" (once)
//   2. cursor finishes        -> card straightens to upright
//   3. card is upright        -> muted preview fades in and loops inside the card
//   4. preview is playing     -> "tap for sound" cue fades in
// A real click on the card before then jumps straight to step 2. Once live,
// clicking the card (preview or cue) opens the modal with sound.
const vcard = document.getElementById("card");
const card = vcard.querySelector(".vcard__card");
const hintCursor = vcard.querySelector(".vcard__cursor");
const playBtn = card.querySelector(".vcard__play");
const soundCue = card.querySelector(".vcard__sound");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const STRAIGHTEN_MS = reduceMotion ? 0 : 600; // matches .vcard__card.is-live transition
const CUE_DELAY_MS = 1200;
let cardScreen = null;

// Cursor path: ends on the play button's center, starts just off the card's right
// edge, level with the button (pulled in on narrow screens so it stays visible).
// Measured live because both move with viewport size and card tilt.
function placeHintCursor() {
  const sec = vcard.getBoundingClientRect();
  const play = playBtn.getBoundingClientRect();
  const box = card.getBoundingClientRect();
  const cursorW = parseFloat(hintCursor.getAttribute("width"));

  const endX = play.left + play.width / 2 - sec.left;
  const endY = play.top + play.height / 2 - sec.top;
  const startX = Math.min(box.right + 16, sec.right - cursorW - 8) - sec.left;

  hintCursor.style.setProperty("--end-x", `${endX}px`);
  hintCursor.style.setProperty("--end-y", `${endY}px`);
  hintCursor.style.setProperty("--dx", `${startX - endX}px`);
  hintCursor.style.setProperty("--dy", "0px");
}
new ResizeObserver(placeHintCursor).observe(vcard);

// Step 1 (skipped for reduced motion: the card just waits for a real click)
if (!reduceMotion) {
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    if (card.classList.contains("is-live")) return;
    placeHintCursor();
    vcard.classList.add("is-hinting");
  }, { threshold: 0.6 }).observe(card);
}
hintCursor.addEventListener("animationend", goLive);

// Step 2
function goLive() {
  if (card.classList.contains("is-live")) return;
  vcard.classList.remove("is-hinting");
  card.classList.add("is-live");
  card.setAttribute("aria-label", "Watch our presentation video with sound");
  setTimeout(startCardScreen, STRAIGHTEN_MS);
}

// Steps 3 + 4
function startCardScreen() {
  const video = document.createElement("video");
  video.className = "vcard__screen";
  video.src = card.dataset.preview;
  video.poster = card.dataset.previewPoster;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("aria-hidden", "true");
  card.insertBefore(video, soundCue);
  cardScreen = video;

  const reveal = () => {
    video.classList.add("is-shown");
    setTimeout(() => card.classList.add("has-cue"), CUE_DELAY_MS);
  };
  video.addEventListener("playing", reveal, { once: true });
  // If autoplay is blocked (e.g. iOS Low Power Mode), show the poster frame and cue anyway
  video.play().catch(reveal);
}

card.addEventListener("click", () => {
  if (!card.classList.contains("is-live")) {
    goLive();
    return;
  }
  const { video, poster } = card.dataset;
  if (cardScreen) cardScreen.pause();
  openVideo(video, poster, () => cardScreen && cardScreen.play().catch(() => {}));
});

/* ---------- Portfolio tabs + grid ---------- */

const grid = document.getElementById("grid");
const tabs = document.querySelectorAll(".tab");

function renderGrid(category) {
  const items = PORTFOLIO[category] || [];
  grid.replaceChildren(
    ...items.map((item, i) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.style.animationDelay = `${i * 60}ms`;
      tile.setAttribute("aria-label", `Play ${item.title}`);

      const num = String(i + 1).padStart(2, "0");
      const media = item.thumb
        ? `<img src="${item.thumb}" alt="" loading="lazy">`
        : `<span class="tile__placeholder">${num}</span>`;

      tile.innerHTML = `
        <div class="tile__thumb">
          ${media}
          <span class="tile__play label">▶ play</span>
        </div>
        <div class="tile__meta">
          <span class="tile__title">${item.title}</span>
          <span class="label">${CATEGORY_LABEL[category]} / ${num}</span>
        </div>`;

      tile.addEventListener("click", () => openVideo(vimeoUrl(item.vimeo)));
      return tile;
    })
  );
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    renderGrid(tab.dataset.filter);
  });
});

renderGrid("tech");

/* ---------- Review carousel ---------- */

(function carousel() {
  const root = document.getElementById("quotes");
  const slides = [...root.querySelectorAll(".quote")];
  const dotsWrap = root.querySelector(".quotes__dots");
  const INTERVAL = 5500;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Review ${i + 1}`);
    dot.addEventListener("click", () => {
      go(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
    dots.forEach((d, n) => d.setAttribute("aria-selected", String(n === index)));
  }

  function start() { timer = setInterval(() => go(index + 1), INTERVAL); }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  go(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
})();

/* ---------- Contact form ----------
   No backend yet. To go live, point this at a form service
   (Formspree, Basin, Netlify Forms, etc.) inside the submit handler. */

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("input, textarea").forEach((el) => {
    const ok = el.checkValidity() && el.value.trim() !== "";
    el.closest(".field").classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    statusEl.textContent = "fill in all three, please.";
    statusEl.style.color = "var(--pink)";
    return;
  }

  statusEl.textContent = "got it — we'll txt you back.";
  statusEl.style.color = "";
  form.reset();
});

form.addEventListener("input", (e) => {
  e.target.closest(".field")?.classList.remove("is-invalid");
});

/* ---------- Nav color ----------
   Nav text is ink by default and flips to white over sections marked data-dark
   that span (nearly) the full width, e.g. the flagship card once cards stack. */

const nav = document.querySelector(".nav");
const darkSections = document.querySelectorAll("[data-dark]");

function updateNav() {
  const y = nav.offsetHeight / 2;
  const onDark = [...darkSections].some((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= y && r.bottom >= y && r.width >= window.innerWidth * 0.9;
  });
  nav.classList.toggle("is-on-dark", onDark);
}

window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav);
updateNav();

/* ---------- Footer year ---------- */

document.getElementById("year").textContent = new Date().getFullYear();
