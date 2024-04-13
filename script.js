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

const resultNumber = document.querySelector(".results p span");
const resultsDiv = document.querySelector(".results");

let wordLimit = 0;
let timeLimit = 0;
let wordCount = 0;
let count;

textArea.focus();

textArea.addEventListener("click", () => {
    toogleInput();
    limitContainer.classList.remove("expanded");
    arrowIcon.classList.remove("expanded");
    nav.classList.remove("expanded");
});

textArea.addEventListener("keyup", () => {
    wordCount = countWords(textArea.value);
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
        resultsDiv.classList.add("expanded");
        limitContainer.classList.toggle("expanded");
    }
    else {
        alert("Please enter a valid number!")
    }
});


function countWords(str) {
    // let words = str.split(" ").length;
    const words = str.trim().split(/\s+/).length;
    return str.length == 0 ? 0 : words;
}

function toogleInput() {
    
}