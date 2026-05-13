// ====================== COMMON JAVASCRIPT ======================

// Footer: Current Year
const yearEl = document.querySelector("#year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Footer: Last Modified Date
const lastModEl = document.querySelector("#lastModified");
if (lastModEl) {
    const lastMod = new Date(document.lastModified);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    lastModEl.textContent = `Last Modified: ${lastMod.toLocaleDateString('en-US', options)}`;
}

// Mobile Navigation Toggle (Hamburger Menu)
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#navigation");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        // Optional: Change hamburger icon to X when open
        menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
}

// Close menu when clicking a link (better UX)
document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            menuToggle.textContent = "☰";
        }
    });
});