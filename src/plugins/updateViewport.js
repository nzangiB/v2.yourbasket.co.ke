import verge from "verge";

export function updateViewport () {
  const root = document.documentElement;
  root.style.setProperty("--100vw", `${verge?.viewportW()}px`);
  root.style.setProperty("--100vh", `${verge?.viewportH()}px`);
}
