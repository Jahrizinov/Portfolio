const themeSliders = document.querySelectorAll(".theme-slider");
const themes = ["dark", "dark-gray", "gray", "light-gray", "light"];

function preferredTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (themes.includes(savedTheme)) return savedTheme;
  } catch {
    // The system preference remains available when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function setTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;

  const themeIndex = themes.indexOf(theme);
  themeSliders.forEach((slider) => {
    slider.value = String(themeIndex);
    slider.setAttribute("aria-valuetext", themeLabel(theme));
  });

  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Keep the selected theme for this page even when storage is blocked.
    }
  }
}

function themeLabel(theme) {
  return {
    dark: "Donker",
    "dark-gray": "Donkergrijs",
    gray: "Grijs",
    "light-gray": "Lichtgrijs",
    light: "Wit",
  }[theme];
}

setTheme(preferredTheme());

themeSliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    setTheme(themes[Number(slider.value)], true);
  });
});
