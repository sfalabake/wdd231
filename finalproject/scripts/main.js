import { loadTheme, initializeThemeToggle } from "./storage.js";

loadTheme();
initializeThemeToggle();

document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");

menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});