const ANIMATION_DELAY_THRESHOLD = 50;

let appState = "intro"; // "intro" | "question" | "waitingForInput" | "renderingResponses"
let responses = [];

window.addEventListener("load", () => {
  renderApp();
});

const renderApp = () => {
  console.log({ appState });
  const appEl = document.getElementById("app");
  if (appState === "intro") {
    const messageEl = document.createElement("div");
    messageEl.id = "message";
    messageEl.innerHTML = "Think of someone special in your life.";
    messageEl.classList.add("message");
    messageEl.classList.add("fadeInOut");
    messageEl.addEventListener("animationend", () => {
      appState = "question";
      messageEl.remove();
      renderApp();
    });
    appEl.appendChild(messageEl);
    return;
  }
  if (appState === "question") {
    const messageEl = document.createElement("div");
    messageEl.id = "message";
    messageEl.classList.add("message");
    messageEl.classList.add("fadeIn");
    messageEl.innerHTML = "What would you say to them if you weren’t scared?";
    appEl.appendChild(messageEl);
    setTimeout(() => {
      const inputEl = document.createElement("input");
      inputEl.id = "input";
      const submitEl = document.createElement("button");
      submitEl.type = "submit";
      submitEl.innerHTML = "Share";
      submitEl.id = "submitButton";
      const inputContainerEl = document.createElement("div");
      inputContainerEl.id = "inputContainer";
      inputContainerEl.classList.add("inputContainer");
      inputContainerEl.appendChild(inputEl);
      inputContainerEl.appendChild(submitEl);
      messageEl.classList.add("shiftUp");
      messageEl.parentNode.appendChild(inputContainerEl);
      appState = "waitingForInput";
      renderApp();
    }, 2500);
    return;
  }
  if (appState === "waitingForInput") {
    const submitButtonEl = document.getElementById("submitButton");
    submitButtonEl.onclick = () => {
      const messageEl = document.getElementById("message");
      const inputContainerEl = document.getElementById("inputContainer");
      [messageEl, inputContainerEl].forEach((el) => {
        el.classList.remove("fadeIn");
        el.addEventListener("animationend", () => el.remove());
        el.classList.add("fadeOut");
      });
      appState = "waitingForResponses";
      renderApp();
    };
    return;
  }
  if (appState === "waitingForResponses") {
    const inputButtonEl = document.getElementById("input");
    const input = inputButtonEl.value;
    (async () => {
      const response = await fetch("submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      responses = await response.json();
      setTimeout(() => {
        appState = "renderingResponses";
        renderApp();
      }, 1000);
    })();
    return;
  }
  if (appState === "renderingResponses") {
    const responseContainerEl = document.createElement("div");
    responseContainerEl.classList.add("responseContainer");
    responses.forEach((response) => {
      const responseEl = document.createElement("div");
      responseEl.classList.add("response");
      responseEl.innerHTML = response;
      const scale = Math.random() + 0.5;
      const x = (Math.random() - 0.5) * window.innerWidth;
      const y = (Math.random() - 0.5) * window.innerHeight;
      const animationDelay = `${Math.random() * 5}s`;
      responseEl.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
      responseEl.style.animationDelay = animationDelay;
      responseContainerEl.appendChild(responseEl);
    });
    appEl.appendChild(responseContainerEl);
  }
};
