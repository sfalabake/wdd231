const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    const date = new Date(document.lastModified);
    lastModEl.textContent = `Last Modified: ${date.toLocaleString()}`;
}

// NAV
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#navigation");

if (menuToggle && nav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.textContent = open ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", open);
    });

    nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            nav.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}