const themeButtons = document.querySelectorAll(".theme-toggle");

function preferredTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // The system preference remains available when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function setTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;

  themeButtons.forEach((button) => {
    const icon = button.querySelector("i");
    const isDark = theme === "dark";

    if (icon) {
      icon.classList.toggle("bi-sun", isDark);
      icon.classList.toggle("bi-moon-stars", !isDark);
    }
    button.setAttribute(
      "aria-label",
      isDark ? "Schakel over naar licht thema" : "Schakel over naar donker thema",
    );
  });

  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Keep the selected theme for this page even when storage is blocked.
    }
  }
}

setTheme(preferredTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme, true);
  });
});
