/**
 * Global Component Utilities (Header, Navigation, and Footer Meta)
 * Class Project: Lagos Chamber of Commerce
 * Author: Solomon Oluwadunsin Falabake
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ================= DYNAMIC FOOTER META =================
    const yearEl = document.querySelector("#year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Strict Modification Localization Tracker
    const lastModEl = document.querySelector("#lastModified");
    if (lastModEl) {
        const date = new Date(document.lastModified);
        lastModEl.textContent = `Last Modification: ${date.toLocaleString()}`;
    }

    // ================= ACCESSIBLE NAVIGATION MENU =================
    const menuToggle = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#navigation");

    if (menuToggle && nav) {
        // Initialize explicit accessibility state
        menuToggle.setAttribute("aria-expanded", "false");

        // Primary toggle button control listener
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
});