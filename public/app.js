const STRINGS = {
  intro: "Think of someone you care deeply about.",
  prompt: "What would you say to them if you weren’t scared?",
  cta: "Speak Up",
};

let appState = "intro"; // "intro" | "question" | "waitingForInput" | "waitingForResponses" | "renderingResponses"
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
    messageEl.innerHTML = STRINGS.intro;
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
    messageEl.innerHTML = STRINGS.prompt;
    appEl.appendChild(messageEl);
    setTimeout(() => {
      const inputEl = document.createElement("input");
      inputEl.id = "input";
      const submitEl = document.createElement("button");
      submitEl.type = "submit";
      submitEl.innerHTML = STRINGS.cta;
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
      const scale = Math.random() * 0.25 + 0.25;
      const xRotate = (Math.random() - 0.5) * 30;
      const yRotate = (Math.random() - 0.5) * 50;
      const animationDelay = `${Math.random() * 5}s`;
      responseEl.style.transform = `perspective(800px) rotate3d(0, 1, 0, ${yRotate}deg) rotate3d(1, 0, 0, ${xRotate}deg) scale(${scale})`;
      responseEl.style.animationDelay = animationDelay;
      responseContainerEl.appendChild(responseEl);
    });
    appEl.appendChild(responseContainerEl);
  }
};
