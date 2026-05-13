// Current Year
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Last Modified
const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    const date = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    lastModEl.textContent = `Last Modified: ${date.toLocaleDateString('en-US', options)}`;
}

// Hamburger Menu
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#navigation");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });

    // Close menu when link is clicked
    document.querySelectorAll("#navigation a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
}