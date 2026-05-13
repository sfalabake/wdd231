// Footer Year
const yearEl = document.querySelector("#year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Last Modified
const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    lastModEl.textContent = `Last Modification: ${document.lastModified}`;
}

// Mobile Navigation Toggle
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#navigation");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}