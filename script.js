const textArea = document.querySelector("textarea");
const arrowIcon = document.querySelector(".arrow");
const nav = document.querySelector("nav");
let navExpanded = nav.getAttribute("aria-expanded");
let arrowExpanded = arrowIcon.getAttribute("aria-expanded");
console.log("first: ", navExpanded);

arrowIcon.addEventListener("click", () => {
    if (!navExpanded) {
        navExpanded = true;
    }
    else {
        navExpanded = false;
    }
    console.log(navExpanded);
    arrowExpanded = arrowExpanded ? false : true;
    nav.setAttribute("aria-expanded", navExpanded);
    arrowIcon.setAttribute("aria-expanded", arrowExpanded);
});

textArea.focus();
