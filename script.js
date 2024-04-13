const textArea = document.querySelector("textarea");
const nav = document.querySelector("nav");
const arrowIcon = document.querySelector(".arrow");
const wordBtn = document.querySelector(".word-limit-btn");
const timeBtn = document.querySelector(".time-limit-btn");
const widthBtn = document.querySelector(".full-width-btn");
const fontBtn = document.querySelector(".change-font-btn");
const lockBtn = document.querySelector(".lock-btn");
const saveBtn = document.querySelector(".save-btn");
const limitContainer = document.querySelector(".input-container");
const limitText = document.querySelector(".input-container p");
const limitInput = limitContainer.querySelector("#limit-input");
const submitBtn = limitContainer.querySelector("#submit-input");

let wordCount = 0;
let wordLimit = 0;
let timeLimit = 0;

textArea.focus();

textArea.addEventListener("click", () => {
    limitContainer.classList.remove("expanded");
    arrowIcon.classList.remove("expanded");
    nav.classList.remove("expanded");
});

textArea.addEventListener("keyup", (key) => {
    for (let i = 0; i < 1; i++) {
        if (key.key == " ") {
            wordCount += 1;
        }
    }
});

arrowIcon.addEventListener("click", () => {
    arrowIcon.classList.toggle("expanded");
    nav.classList.toggle("expanded");

    if (!arrowIcon.classList.contains("expanded")) {
        limitContainer.classList.remove("expanded");
    }
});

wordBtn.addEventListener("click", () => {
    limitContainer.classList.toggle("expanded");
    limitText.innerHTML = "Word limit:";
});

submitBtn.addEventListener("click", () => {
    limitContainer.classList.toggle("expanded");
    wordLimit = limitInput.value;
});
