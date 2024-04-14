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
const progressStatus = document.querySelector("#progress-status");
const progressBar = document.querySelector("#progress-bar");
const limitInput = limitContainer.querySelector("#limit-input");
const submitBtn = limitContainer.querySelector("#submit-input");

const resultNumber = document.querySelector(".results p span");
const resultsDiv = document.querySelector(".results");

let wordLimit = 0;

textArea.focus();

textArea.addEventListener("click", () => {
    limitContainer.classList.remove("expanded");
    arrowIcon.classList.remove("expanded");
    nav.classList.remove("expanded");
});

textArea.addEventListener("keyup", () => {
    wordCount = countWords(textArea.value);

    wordCount > 0
        ? resultsDiv.classList.add("expanded")
        : resultsDiv.classList.remove("expanded");
    updateProgressBar(wordCount);
    resultNumber.innerHTML = wordCount;
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
    if (limitInput.value > 1) {
        wordLimit = limitInput.value;
        limitContainer.classList.toggle("expanded");
        progressStatus.style.opacity = "1";
    } else {
        alert("Please enter a valid number!");
    }
});

function countWords(str) {
    // let words = str.split(" ").length;
    const words = str.trim().split(/\s+/).length;
    return str.length == 0 ? 0 : words;
}

function updateProgressBar(currentWords) {
    const percentage = (currentWords / wordLimit) * 100;
    const width = Math.min(percentage, 100);
    progressBar.style.width = `${width}%`;
}
