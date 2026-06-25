// =============================================
// SETTINGS SIDEBAR
// =============================================
import { resumeAudio, pauseAudio, setVolume } from "./audio.js";
import { setParticlesEnabled } from "./particles.js";

const settingsBar = document.getElementById("settings-bar");
const settingsToggleBtn = document.getElementById("settings-toggle-btn");
const audioToggle = document.getElementById("audioToggle");
const particleToggle = document.getElementById("particleToggle");
const volumeSlider = document.getElementById("volumeSlider");

export function initSettings() {
  // Sidebar toggle
  if (settingsToggleBtn && settingsBar) {
    settingsToggleBtn.addEventListener("click", () => {
      const isVisible = settingsBar.classList.contains("visible");
      if (isVisible) {
        settingsBar.classList.remove("visible");
      } else {
        settingsBar.classList.add("visible");
        settingsBar.classList.remove("hidden");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        settingsBar.classList.contains("visible") &&
        !settingsBar.contains(e.target) &&
        e.target !== settingsToggleBtn
      ) {
        settingsBar.classList.remove("visible");
      }
    });
  }

  // Audio toggle
  audioToggle?.addEventListener("change", () => {
    if (audioToggle.checked) {
      resumeAudio();
    } else {
      pauseAudio();
    }
  });

  // Particles toggle
  particleToggle?.addEventListener("change", () => {
    setParticlesEnabled(particleToggle.checked);
  });

  // Volume slider
  volumeSlider?.addEventListener("input", () => {
    setVolume(volumeSlider.value);
  });
}

// =============================================
// SKILL TREE — Node click interaction
// =============================================
export function initSkillTree() {
  const skillPanel = document.getElementById("skill-panel");
  const panelSkillName = document.getElementById("panel-skill-name");
  const panelStars = document.getElementById("panel-stars");
  const panelDesc = document.getElementById("panel-desc");
  const panelClose = document.getElementById("panel-close");

  document.querySelectorAll(".skill-node").forEach((node) => {
    node.addEventListener("click", () => {
      const skill = node.dataset.skill;
      const level = parseInt(node.dataset.level);
      const desc = node.dataset.desc;

      panelSkillName.textContent = skill;
      panelDesc.textContent = desc;
      panelStars.textContent = "★".repeat(level) + "☆".repeat(5 - level);

      skillPanel.classList.remove("hidden");
      skillPanel.style.opacity = "1";
      skillPanel.style.transform = "translateY(0)";
      skillPanel.style.pointerEvents = "all";
    });
  });

  panelClose?.addEventListener("click", () => {
    skillPanel.classList.add("hidden");
  });
}

// =============================================
// HAMBURGER MENU
// =============================================
export function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  // Sluit menu bij klik op een link
  navLinks?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-open");
    });
  });

  // Verwijder nav-open als scherm groter wordt dan 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      navLinks.classList.remove("nav-open");
    }
  });
}
