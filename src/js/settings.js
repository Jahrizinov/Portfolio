// =============================================
// SETTINGS SIDEBAR
// =============================================
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
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Sluit menu bij klik op een link
  mobileNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Verwijder nav-open als scherm groter wordt dan 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}
