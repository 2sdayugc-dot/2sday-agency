/* ==========================================================================
   2sday — interactions
   ========================================================================== */

/* ---------- Portfolio data ----------
   CATEGORIES sets the tabs, their order and the line under each name.
   VIDEOS is one flat list; each entry says which category it belongs to:

     { category: "wellness", brand: "Brand X", details: "Skincare device · EN",
       video: "https://vimeo.com/123456789" }

   `video` can be a Vimeo link (vimeo.com/ID, or vimeo.com/ID/HASH if unlisted),
   a YouTube link, or a direct video file (.mp4/.mov/.webm, e.g. Cloudinary).
   `thumb` (optional) sets the cover image. Cloudinary videos get one
   automatically; anything else without a thumb shows a numbered placeholder.
   Order within a category follows the order in this list. */
const CATEGORIES = [
  { id: "lifestyle", name: "lifestyle",         sub: "Travel, Fashion, Home & more" },
  { id: "tech",      name: "tech",              sub: "SaaS, Gadgets, Apps" },
  { id: "wellness",  name: "wellness",          sub: "Fitness, Supplements, Beauty" },
  { id: "street",    name: "street interviews", sub: "Authentic, Staged" },
];

const VIDEOS = [
  { category: "lifestyle", brand: "Holafly",    details: "eSim · EN",                        video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790530734/hflver1.mov" },
  { category: "lifestyle", brand: "Tabasco",    details: "Hot sauce · EN",                   video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790533317/0322_1.mov" },
  { category: "lifestyle", brand: "AkiyaHub",   details: "Real Estate Consulting · EN",      video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531090/akiyahub.mov" },
  { category: "lifestyle", brand: "SinPlayPen", details: "Premium Adult Products · EN",      video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790530933/sinplaypen2.mov" },
  { category: "lifestyle", brand: "Liftaya",    details: "Self-Adhesive Push-up Bra · PL",   video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531373/liftaya2.mov" },
  { category: "lifestyle", brand: "Prada ss27", details: "Personal Styling Content · EN",    video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791910297/prada2.mov" },

  { category: "tech",      brand: "Evelize",                details: "Teleprompter App · EN",         video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531535/evelize.mov" },
  { category: "tech",      brand: "GENIQO",                 details: "AI Smart Pen · EN",             video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790530801/GENIQO.mov" },
  { category: "tech",      brand: "Leatyon Ltd.",           details: "Private Cloud Storage · EN",    video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531198/leatyon_rev.mov" },
  { category: "tech",      brand: "Beauty Editor",          details: "Editing App · EN",              video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531341/be3.mov" },
  { category: "tech",      brand: "Wondershare PDFelement", details: "PDF Editing App · EN",          video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531556/0208_2pdfel1.mov" },
  { category: "tech",      brand: "iFLYTEK",                details: "AI Translation Earbuds EN+RU",  video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790533559/translation_1.mov" },

  { category: "wellness",  brand: "M17 Balance",         details: "Premium Fitness Supplements · PL",    video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791910297/m17_pl1.mov" },
  { category: "wellness",  brand: "Drexton",             details: "Oral Care · EN",                      video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790533045/dge.mov" },
  { category: "wellness",  brand: "The Pilates Academy", details: "Fitness Certification Platform · EN", video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790532543/pilates_academy1.mov" },
  { category: "wellness",  brand: "AllDayPretty",        details: "Online Drugstore · EN",               video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531859/adp_capt.mov" },
  { category: "wellness",  brand: "GLEAMO",              details: "Fitness App · EN",                    video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791910324/glm3.mov" },
  { category: "wellness",  brand: "ELYON Dubai",         details: "Niche Luxury Perfume · EN",           video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790532106/elyon_ugc_1capt.mov" },

  { category: "street",    brand: "ELYON Dubai",  details: "Niche Luxury Perfume · EN",  video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791911283/SnapInsta.to_AQMqX0HjNzfuLrgbo6f6Y0hYYnclPO9sYnqLOIdCwsiVHY51x_ORQ-bg-y_6IHGnosFLPOWxqdTFGDjWsT0nU-ub3eVClawQ7cL8bto.mp4" },
  { category: "street",    brand: "ELYON Dubai",  details: "Niche Luxury Perfume · EN",  video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791911281/SnapInsta.to_AQMC8oCm3cxdfnrU0V5QVzHS978kGltNm7ZRKAFwO_UXR6yP-BLLZHgWMcCJkCXa-jduc-qFx16Uj-gHC0-daUNTzIblR10JKREbl2Q.mp4" },
  { category: "street",    brand: "ELYON Dubai",  details: "Niche Luxury Perfume · EN",  video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791911289/SnapInsta.to_AQOMP9Wb1HaiaOe2_oiqU5IqozRMwc0QM5_q67bwBX3XRNu1urWl3MTjZBazgKCzLHAZ2ZVdfGJgVB-zuswrOT5pwUAbfHRi_fJwen0.mp4" },
  { category: "street",    brand: "Mukiz",        details: "Music Quiz Game · EN",       video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531015/mukiznew2.mov" },
  { category: "street",    brand: "Mukiz",        details: "Music Quiz Game · EN",       video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1790531013/mukiznew1.mov" },
  { category: "street",    brand: "Calorii",      details: "Fitness App · EN",           video: "https://res.cloudinary.com/fkq3p6m2/video/upload/v1791911513/cal1.mov" },
];

// Turn whatever link was pasted into something the lightbox can play
function toPlayableUrl(link) {
  const vimeo = link.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/i);
  if (vimeo) {
    const hash = vimeo[2] ? `&h=${vimeo[2]}` : "";
    return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0${hash}`;
  }
  const yt = link.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  // Cloudinary: ask for an H.264 .mp4 (originals are often large .mov/HEVC that
  // Chrome/Firefox can't play), capped at 1080px wide, unless already transformed
  if (/res\.cloudinary\.com\/.+\/video\/upload\//.test(link)) {
    return link
      .replace(/\/video\/upload\/(v\d+\/)/, "/video/upload/q_auto,w_1080,c_limit/$1")
      .replace(/\.(mov|webm|mp4)(\?.*)?$/i, ".mp4");
  }
  return link; // other direct files (.mp4/.webm) play in the native player
}

// Cloudinary renders a still from a video when the URL ends in .jpg
function autoThumb(link) {
  if (!/res\.cloudinary\.com\/.+\/video\/upload\//.test(link)) return null;
  return link
    .replace("/video/upload/", "/video/upload/q_auto,w_480,c_limit/")
    .replace(/\.(mp4|mov|webm)(\?.*)?$/i, ".jpg");
}

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

const tabsEl = document.getElementById("tabs");
const grid = document.getElementById("grid");

function renderGrid(categoryId) {
  const items = VIDEOS.filter((v) => v.category === categoryId);
  grid.replaceChildren(
    ...items.map((item, i) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.style.animationDelay = `${i * 60}ms`;
      tile.setAttribute("aria-label", `Play ${item.brand} — ${item.details}`);

      const thumb = document.createElement("div");
      thumb.className = "tile__thumb";
      const cover = item.thumb || autoThumb(item.video);
      if (cover) {
        const img = document.createElement("img");
        img.src = cover;
        img.alt = "";
        img.loading = "lazy";
        thumb.append(img);
      } else {
        const ph = document.createElement("span");
        ph.className = "tile__placeholder";
        ph.textContent = String(i + 1).padStart(2, "0");
        thumb.append(ph);
      }
      const play = document.createElement("span");
      play.className = "tile__play";
      play.setAttribute("aria-hidden", "true");
      play.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>';
      thumb.append(play);

      const meta = document.createElement("div");
      meta.className = "tile__meta";
      const brand = document.createElement("span");
      brand.className = "tile__brand";
      brand.textContent = item.brand;
      const details = document.createElement("span");
      details.className = "tile__details";
      details.textContent = item.details;
      meta.append(brand, details);

      tile.append(thumb, meta);
      tile.addEventListener("click", () => openVideo(toPlayableUrl(item.video)));
      return tile;
    })
  );
}

function selectCategory(categoryId) {
  tabsEl.querySelectorAll(".tab").forEach((t) => {
    const active = t.dataset.category === categoryId;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", String(active));
  });
  renderGrid(categoryId);
}

tabsEl.replaceChildren(
  ...CATEGORIES.map((cat) => {
    const item = document.createElement("div");
    item.className = "tabs__item";

    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "tab";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "grid");
    tab.setAttribute("aria-describedby", `tab-sub-${cat.id}`);
    tab.dataset.category = cat.id;
    tab.textContent = cat.name;
    tab.addEventListener("click", () => selectCategory(cat.id));

    const sub = document.createElement("p");
    sub.className = "tab__sub";
    sub.id = `tab-sub-${cat.id}`;
    sub.textContent = cat.sub;

    item.append(tab, sub);
    return item;
  })
);

selectCategory(CATEGORIES[0].id);

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
