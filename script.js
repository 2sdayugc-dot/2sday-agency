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

function openVideo(src) {
  lastFocus = document.activeElement;
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.title = "Video player";
  lightboxFrame.replaceChildren(iframe);
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  lightboxClose.focus();
}

function closeVideo() {
  lightbox.hidden = true;
  lightboxFrame.replaceChildren(); // removing the iframe stops playback
  document.body.classList.remove("no-scroll");
  if (lastFocus) lastFocus.focus();
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

document.querySelector(".vcard__card").addEventListener("click", (e) => {
  openVideo(e.currentTarget.dataset.video);
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
   Nav text is ink by default and flips to white over sections marked data-dark. */

const nav = document.querySelector(".nav");
const darkSections = document.querySelectorAll("[data-dark]");

function updateNav() {
  const y = nav.offsetHeight / 2;
  const onDark = [...darkSections].some((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= y && r.bottom >= y;
  });
  nav.classList.toggle("is-on-dark", onDark);
}

window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav);
updateNav();

/* ---------- Footer year ---------- */

document.getElementById("year").textContent = new Date().getFullYear();
