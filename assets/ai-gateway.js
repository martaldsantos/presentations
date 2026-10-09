"use strict";

const slides = Array.from(document.querySelectorAll(".slide"));
const picker = document.getElementById("slide-picker");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const notesToggle = document.getElementById("notes-toggle");
const fullscreen = document.getElementById("fullscreen");
const errorNotice = document.getElementById("presentation-error");
const aliases = {
  top: "title",
  why: "why-gateway",
  flow: "request-flow",
  labs: "lab-1",
  guardrails: "pilot-guardrails",
  canvas: "decisions"
};
let current = 0;
let showNotes = false;

function slideTitle(slide) {
  const heading = slide.querySelector("h1, h2").cloneNode(true);
  heading.querySelectorAll("br").forEach((lineBreak) => lineBreak.replaceWith(" "));
  return heading.textContent.replace(/\s+/g, " ").trim();
}

slides.forEach((slide, index) => {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = `${index + 1}. ${slideTitle(slide)}`;
  picker.append(option);
});

function render(index, focusSlide = false) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  const focusedSlide = document.activeElement.closest(".slide");
  slides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== current;
    slide.classList.toggle("active", slideIndex === current);
    slide.querySelector(".speaker-notes").hidden = !showNotes;
  });
  picker.value = String(current);
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  document.getElementById("slide-status").textContent = `${current + 1} / ${slides.length}`;
  const progress = document.getElementById("slide-progress");
  progress.max = slides.length;
  progress.value = current + 1;
  document.title = `${slideTitle(slides[current])} | AI Gateway in Practice`;
  if (focusSlide || (focusedSlide && focusedSlide !== slides[current])) {
    slides[current].focus({ preventScroll: true });
  }
  slides[current].scrollTop = 0;
}

function goTo(index, focusSlide = false) {
  const bounded = Math.max(0, Math.min(index, slides.length - 1));
  render(bounded, focusSlide);
  const hash = `#${slides[bounded].id}`;
  if (location.hash !== hash) history.pushState(null, "", hash);
}

function syncHash() {
  const id = location.hash.slice(1);
  const index = slides.findIndex((slide) => slide.id === (aliases[id] || id));
  render(index < 0 ? 0 : index);
  const canonical = `#${slides[current].id}`;
  if (location.hash !== canonical) history.replaceState(null, "", canonical);
}

function toggleNotes() {
  showNotes = !showNotes;
  notesToggle.setAttribute("aria-pressed", String(showNotes));
  slides.forEach((slide) => {
    slide.querySelector(".speaker-notes").hidden = !showNotes;
  });
}

async function toggleFullscreen() {
  errorNotice.hidden = true;
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.error("Unable to change presentation fullscreen mode:", error);
    errorNotice.textContent = "Fullscreen could not be changed. Use your browser's fullscreen command or continue with the slide controls.";
    errorNotice.hidden = false;
  }
}

previous.addEventListener("click", () => goTo(current - 1));
next.addEventListener("click", () => goTo(current + 1));
picker.addEventListener("change", () => goTo(Number(picker.value)));
notesToggle.addEventListener("click", toggleNotes);
fullscreen.addEventListener("click", toggleFullscreen);
fullscreen.hidden = !document.fullscreenEnabled;
document.addEventListener("fullscreenchange", () => {
  const active = Boolean(document.fullscreenElement);
  fullscreen.setAttribute("aria-pressed", String(active));
  fullscreen.textContent = active ? "Exit fullscreen" : "Fullscreen";
});
window.addEventListener("hashchange", syncHash);
window.addEventListener("popstate", syncHash);

document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
      event.target.closest("input, textarea, select, button, a, [contenteditable]")) return;
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goTo(current + 1, true);
  } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(current - 1, true);
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    goTo(event.key === "Home" ? 0 : slides.length - 1, true);
  } else if (event.key.toLowerCase() === "n") {
    toggleNotes();
  } else if (event.key.toLowerCase() === "f" && document.fullscreenEnabled) {
    event.preventDefault();
    toggleFullscreen();
  }
});

const deck = document.getElementById("deck");
deck.addEventListener("click", (event) => {
  if (event.target.closest("a, button, select, input, textarea, pre, .speaker-notes") ||
      window.getSelection().toString()) return;
  goTo(current + 1, true);
});

let touchStart = null;
deck.addEventListener("touchstart", (event) => {
  touchStart = event.touches.length === 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : null;
}, { passive: true });
deck.addEventListener("touchend", (event) => {
  if (!touchStart || event.changedTouches.length !== 1) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  touchStart = null;
  if (event.target.closest("a, button, select, input, textarea, pre, .diagram, .speaker-notes")) return;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    goTo(current + (dx < 0 ? 1 : -1), true);
  }
}, { passive: true });
deck.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

syncHash();
document.body.classList.add("presenting");
document.querySelector(".controls").hidden = false;
