import { loadTheme, initializeThemeToggle } from "./storage.js";

loadTheme();
initializeThemeToggle();

// Footer year
const yearEl = document.querySelector("#year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Last modified
const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    lastModEl.textContent = `Last Modified: ${document.lastModified}`;
}

// Mobile menu
const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");

menuBtn?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
});

// FORM HANDLING (FIXED - SINGLE VERSION)
const form = document.querySelector("form");

form?.addEventListener("submit", () => {
    const urlInput = form.querySelector('input[name="website"]');

    if (urlInput && urlInput.value) {
        let value = urlInput.value.trim();

        // Auto-fix missing protocol
        if (!value.startsWith("http")) {
            urlInput.value = "https://" + value;
        }
    }
});