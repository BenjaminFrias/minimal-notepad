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
const fontContainer = document.querySelector(".fonts-container");
const fontOptionsBtns = document.querySelectorAll(".font-btn");
const lightDarkBtn = document.querySelector(".light-dark-btn button");

textArea.focus();

// Remove nav if click in Textarea
textArea.addEventListener("click", () => {
    limitContainer.classList.remove("expanded");
    fontContainer.classList.remove("expanded");
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
        fontContainer.classList.remove("expanded");
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
        resultType.textContent = "Minutes";
    });
});

fullWidthBtn.addEventListener("click", () => {
    textArea.classList.toggle("expanded");
    toggleFullScreen();
});

lockBtn.addEventListener("click", () => {
    if (textArea.classList.contains("locked")) {
        textArea.removeAttribute("disabled", "");
        textArea.classList.toggle("locked");
    } else {
        textArea.setAttribute("disabled", "");
        textArea.classList.toggle("locked");
    }
});

saveBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    const file = new Blob([textArea.value], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "notes.txt";

    if (window.confirm("Do you want to save the file?")) {
        link.click();
    }

    URL.revokeObjectURL(link.href);
});

fontBtn.addEventListener("click", () => {
    fontContainer.classList.toggle("expanded");
    fontOptionsBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            switch (btn.dataset.font) {
                case "serif":
                    textArea.style.fontFamily =
                        '"IBM Plex Serif", "Times New Roman", Times, serif';
                    break;
                case "sans-serif":
                    textArea.style.fontFamily =
                        '"Inter", Arial, Helvetica, sans-serif';
                    break;
                case "monospace":
                    textArea.style.fontFamily =
                        '"IBM Plex Mono", "Courier New", Courier, monospace';
                    break;
            }
        });
    });
});

// Light and dark mode
const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

iconSvg.setAttribute("fill", "none");
iconSvg.setAttribute("viewBox", "0 0 512 512");
/*
<?xml version="1.0" ?>
<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
<title/><path d="M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,1
19.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z"
 style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>

*/

const day = document.querySelector(".light-dark-btn button svg.feather-sun");
const night = document.querySelector(".light-dark-btn button svg.feather-moon");
lightDarkBtn.addEventListener("click", () => {
    textArea.classList.toggle("light-dark");

    if (textArea.classList.contains("light-dark")) {
        night.style.display = "none";
        day.style.display = "block";
    }
    else {
        night.style.display = "block";
        day.style.display = "none";
    }

});

function countWords(str) {
    const words = str.trim().split(/\s+/).length;
    return str.length == 0 ? 0 : words;
}

function toggleFullScreen() {
    if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullScreen(
                Element.ALLOW_KEYBOARD_INPUT
            );
        } else if (document.msRequestFullscreen) {
            /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            /* Chrome, Safari and Opera */
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
    }
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
