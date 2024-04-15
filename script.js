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
const resultNumber = document.querySelector(".results p span.number");
const resultType = document.querySelector(".results p span.limit-type");
const resultsDiv = document.querySelector(".results");

textArea.focus();

// Remove nav if click in Textarea
textArea.addEventListener("click", () => {
    limitContainer.classList.remove("expanded");
    arrowIcon.classList.remove("expanded");
    nav.classList.remove("expanded");
});

// Show word count if is > 0
let wordIsActive = false;
let timeIsActive = false;
let wordLimit = 0;
let timeLimit = 0;
let wordCount;
let timeInterval;
let started = false;

textArea.addEventListener("keyup", () => {
    wordCount = countWords(textArea.value);

    if (wordCount > 0) {
        resultsDiv.classList.add("expanded");
    } else {
        resultsDiv.classList.remove("expanded");
    }

    timeIsActive == false ? (resultNumber.innerHTML = wordCount) : 0;

    if (wordIsActive) {
        if (wordLimit > 0) {
            updateProgressBar(wordCount, wordLimit);
        }
    }
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
    submitBtn.addEventListener("click", () => {
        setLimit("word");
    });
});

// Show time input
timeBtn.addEventListener("click", () => {
    displayLimitInput("Time Limit: ");
    submitBtn.addEventListener("click", () => {
        setLimit("time");
        startCountdown(timeLimit);
        resultType.textContent = "Minutes"
    });
});

fullWidthBtn.addEventListener("click", () => {
    textArea.classList.toggle("expanded");
});

lockBtn.addEventListener("click", () => {
    if (textArea.classList.contains("locked")) {
        textArea.removeAttribute("disabled", "");
        textArea.classList.toggle("locked")
    }
    else {
        textArea.setAttribute("disabled", "");
        textArea.classList.toggle("locked")
    }
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

function setLimit(type) {
    if (limitInput.value > 1) {
        if (type == "word") {
            wordLimit = limitInput.value;
            wordIsActive = true;
            timeIsActive = false;
        } else {
            timeLimit = limitInput.value;
            timeIsActive = true;
            wordIsActive = false;
        }
        limitContainer.classList.toggle("expanded");
        progressStatus.style.opacity = "1";
    } else {
        alert("Please enter a valid number!");
    }
}

function startCountdown(minutes) {
    const seconds = minutes * 60;
    
    let remainingTime = seconds;
    let progressTime = 0;
    const intervalId = setInterval(() => {
        const minutesLeft = Math.floor(remainingTime / 60);
        resultNumber.textContent = minutesLeft;
        
        updateProgressBar(progressTime, seconds);
        resultNumber.textContent = `${minutesLeft}`;

        if (remainingTime <= 0) {
            clearInterval(intervalId);
            resultNumber.textContent = "Time's up!";
        }

        remainingTime--;
        progressTime++;

    }, 1000);
}
