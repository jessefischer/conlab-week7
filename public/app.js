const ANIMATION_DELAY_THRESHOLD = 50;

let appState = "preload";

window.addEventListener("load", () => {
  const appEl = document.getElementById("app");
  const messageEl = document.createElement("div");
  messageEl.innerHTML = "Think of someone special in your life.";
  messageEl.classList.add("message");
  appEl.appendChild(messageEl);
  setTimeout(
    () => messageEl.classList.add("visible"),
    ANIMATION_DELAY_THRESHOLD
  );
});
