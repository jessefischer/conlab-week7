const ANIMATION_DELAY_THRESHOLD = 50;

let appState = "preload"; // "preload" | "intro" | "idle" |

window.addEventListener("load", () => {
  renderApp();
});

const renderApp = () => {
  console.log({ appState });
  const appEl = document.getElementById("app");
  if (appState === "preload") {
    const messageEl = document.createElement("div");
    messageEl.id = "message";
    messageEl.innerHTML = "Think of someone special in your life.";
    messageEl.classList.add("message");
    appEl.appendChild(messageEl);
    setTimeout(
      () => messageEl.classList.add("visible"),
      ANIMATION_DELAY_THRESHOLD
    );
    appState = "intro";
    renderApp();
    return;
  }
  if (appState === "intro") {
    setTimeout(() => {
      appState = "transition";
      renderApp();
    }, 3000);
    return;
  }
  if (appState === "transition") {
    const messageEl = document.getElementById("message");
    messageEl.classList.remove("visible");
    setTimeout(() => {
      appState = "question";
      renderApp();
    }, 2000);
    return;
  }
  if (appState === "question") {
    const messageEl = document.getElementById("message");
    messageEl.innerHTML = "What would you say to them if you weren’t scared?";
    setTimeout(() => {
      messageEl.classList.add("visible");
      setTimeout(() => {
        const inputEl = document.createElement("input");
        const submitEl = document.createElement("button");
        submitEl.type = "submit";
        submitEl.innerHTML = "Submit";
        const inputContainerEl = document.createElement("div");
        inputContainerEl.classList.add("inputContainer");
        inputContainerEl.appendChild(inputEl);
        inputContainerEl.appendChild(submitEl);
        messageEl.parentNode.appendChild(inputContainerEl);
        setTimeout(() => {
          inputContainerEl.classList.add("visible");
          appState = "waitingForInput";
          renderApp();
        }, ANIMATION_DELAY_THRESHOLD);
      }, 5000);
    }, ANIMATION_DELAY_THRESHOLD);
    return;
  }
};
