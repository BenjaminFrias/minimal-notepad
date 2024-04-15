const textArea = document.querySelector("textarea");
const nav = document.querySelector("nav");
const arrowIcon = document.querySelector(".arrow");
const wordBtn = document.querySelector(".word-limit-btn");
const timeBtn = document.querySelector(".time-limit-btn");
const fullWidthBtn = document.querySelector(".full-width-btn");
const fontBtn = document.querySelector(".change-font-btn");
const lockBtn = document.querySelector(".lock-btn");
const saveBtn = document.querySelector(".save-btn");
const limitContainer = document.querySelector(".input-container");
const limitText = document.querySelector(".input-container p");
const progressStatus = document.querySelector("#progress-status");
const progressBar = document.querySelector("#progress-bar");
const limitInput = limitContainer.querySelector("#limit-input");
const submitBtn = limitContainer.querySelector("#submit-input");
const congrats = document.querySelector("#congrats");
const resultNumber = document.querySelector(".results p span");
const resultsDiv = document.querySelector(".results");

let wordLimit = 0;

textArea.focus();

// Remove nav if click in Textarea
textArea.addEventListener("click", () => {
    limitContainer.classList.remove("expanded");
    arrowIcon.classList.remove("expanded");
    nav.classList.remove("expanded");
});

// Show word count if is > 0
textArea.addEventListener("keyup", () => {
    wordCount = countWords(textArea.value);

    wordCount > 0
        ? resultsDiv.classList.add("expanded")
        : resultsDiv.classList.remove("expanded");

    if (wordLimit > 0) {
        updateProgressBar(wordCount, wordLimit);
    }

    resultNumber.innerHTML = wordCount;
});

// Expand arrow
arrowIcon.addEventListener("click", () => {
    arrowIcon.classList.toggle("expanded");
    nav.classList.toggle("expanded");

    if (!arrowIcon.classList.contains("expanded")) {
        limitContainer.classList.remove("expanded");
    }
});

// Show word input
wordBtn.addEventListener("click", () => {
    displayLimitInput("Word Limit: ");
});

// Get the limit value of input
submitBtn.addEventListener("click", () => {
    if (limitInput.value > 1) {
        wordLimit = limitInput.value;
        limitContainer.classList.toggle("expanded");
        progressStatus.style.opacity = "1";
    } else {
        alert("Please enter a valid number!");
    }
});

fullWidthBtn.addEventListener("click", () => {
    textArea.classList.toggle("expanded");
});

function countWords(str) {
    const words = str.trim().split(/\s+/).length;
    return str.length == 0 ? 0 : words;
}

function updateProgressBar(current, limit) {
    const percentage = (current / limit) * 100;
    const width = Math.min(percentage, 100);
    progressBar.style.width = `${width}%`;

    if (width == 100) {
        congrats.classList.add("display");
    } else {
        congrats.classList.remove("display");
    }
}

function displayLimitInput(message) {
    limitContainer.classList.toggle("expanded");
    limitText.innerHTML = message;
}
