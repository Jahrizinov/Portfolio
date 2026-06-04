// =============================================
// MAIN.JS — Entry point
// =============================================
import "../css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import * as THREE from "three";

import { initAudio, getAudioLevel } from "./audio.js";
import { animateParticles } from "./particles.js";
import { initWheelScene, animateWheel } from "./wheel.js";
import { initSettings, initSkillTree, initHamburger } from "./settings.js";

// =============================================s
// DOM ELEMENTS
// =============================================
const settingsBar = document.getElementById("settings-bar");
const enterBtn = document.getElementById("enterBtn");
const domainOverlay = document.getElementById("domain-warning");
const mainContent = document.getElementById("main-content");
const mainNav = document.getElementById("main-nav");
const mainFooter = document.getElementById("main-footer");
// Null-safe: settings sidebar is uitgecommentarieerd

// =============================================
// ON DOM READY
// =============================================
window.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".domain-title");
  if (title) title.textContent = "Welkom op mijn portfolio";

  const subtitle = document.querySelector(".domain-subtitle");
  if (subtitle) subtitle.textContent = "Webdesign & 3D Ontwikkeling";

  const text = document.querySelector(".domain-text");
  if (text)
    text.textContent =
      "Deze site toont mijn werk in webdesign, 3D en game design. Voor de beste ervaring: geluid aan en ontdek de interactieve elementen.";

  const badge = document.querySelector(".domain-warning-badge");
  if (badge) badge.textContent = "⚠ VISUELE EFFECTEN & AUDIO";

  const btn = document.querySelector("#enterBtn span");
  if (btn) btn.textContent = "Start portfolio";

  // ── Intro overslaan als al gezien ──────────────────────────
  if (sessionStorage.getItem("introSeen")) {
    domainOverlay.style.display = "none";

    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
    mainNav.classList.remove("hidden");
    mainNav.classList.add("visible");
    mainFooter.classList.remove("hidden");
    mainFooter.classList.add("visible");
    settingsBar.classList.remove("hidden");
    settingsBar.classList.add("visible");

    initAudio();
    initWheelScene();
    initScrollReveal();
  }
  // ────────────────────────────────────────────────────────────

  markProjectPlaceholders();
  initSettings();
  initSkillTree();
  initHamburger();
});

// =============================================
// PROJECT PLACEHOLDER DETECTOR
// =============================================
function markProjectPlaceholders() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    const title = card.querySelector(".card-title");
    const desc = card.querySelector(".card-desc");
    const status = card.querySelector(".card-status");
    if (!title || !desc || !status) return;

    const titleText = title.textContent.trim().toUpperCase();
    const descText = desc.textContent.trim().toUpperCase();

    const isPlaceholder =
      titleText.includes("PROJECTNAAM") ||
      titleText.includes("VOEG PROJECTNAAM HIER TOE") ||
      descText.includes("VOEG PROJECTOMSCHRIJVING HIER TOE") ||
      descText.includes("WELKE TECHNIEKEN") ||
      descText.includes("WAT IS HET DOEL");

    if (isPlaceholder) {
      card.classList.add("placeholder-card");
      status.textContent = "VUL HIER IN";
    }
  });
}

// =============================================
// ENTER BUTTON — Loading sequence
// =============================================
enterBtn.addEventListener("click", () => {
  // ── Markeer als gezien zodat het niet meer terugkomt ───────
  sessionStorage.setItem("introSeen", "true");
  // ────────────────────────────────────────────────────────────

  domainOverlay.classList.add("fade-out");

  setTimeout(() => {
    domainOverlay.style.display = "none";

    const sigilLoader = document.getElementById("sigil-loader");
    const vfxCanvas = document.getElementById("vfx-canvas");
    vfxCanvas.style.zIndex = "9998";
    sigilLoader.style.display = "flex";
    sigilLoader.style.opacity = "1";

    let p = 0;
    const pctEl = document.getElementById("sigil-pct");
    const barEl = document.getElementById("sigil-bar");

    function tick() {
      p += Math.random() * 2.2 + 0.4;
      if (p > 100) p = 100;
      pctEl.textContent = Math.floor(p) + "%";
      barEl.style.width = p + "%";

      if (p < 100) {
        setTimeout(tick, 60 + Math.random() * 80);
      } else {
        setTimeout(() => {
          sigilLoader.style.transition = "opacity 0.8s ease";
          sigilLoader.style.opacity = "0";
          setTimeout(() => {
            sigilLoader.style.display = "none";
            vfxCanvas.style.zIndex = "0";

            mainContent.classList.remove("hidden");
            mainContent.classList.add("visible");
            mainNav.classList.remove("hidden");
            mainNav.classList.add("visible");
            mainFooter.classList.remove("hidden");
            mainFooter.classList.add("visible");
            settingsBar.classList.remove("hidden");
            settingsBar.classList.add("visible");

            initAudio();
            initWheelScene();
            initScrollReveal();
          }, 800);
        }, 3000);
      }
    }

    tick();
  }, 1000);
});

// =============================================
// SCROLL REVEAL
// =============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, i * 100);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => {
    el.classList.remove("show"); // reset eerst
    observer.observe(el);
  });
}

// =============================================
// MAIN ANIMATION LOOP
// =============================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const audioLevel = getAudioLevel();

  animateParticles(audioLevel);
  animateWheel(delta, audioLevel);
}

animate();


