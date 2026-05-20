// Dynamic Year Handler
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Strict Modification Localization Tracker
const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    const date = new Date(document.lastModified);
    lastModEl.textContent = `Last Modification: ${date.toLocaleString()}`;
}

// Accessible Context Navigation Menu
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#navigation");

if (menuToggle && nav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.textContent = open ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", open);
    });

    // Event delegation closing layout safely upon target selections
    nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            nav.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}