import { loadTheme, initializeThemeToggle } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Shared Global Core Utilities
    try {
        loadTheme();
        initializeThemeToggle();
    } catch (themeError) {
        console.warn("Theme storage sub-module missing or unlinked:", themeError);
    }
    
    initGlobalNavigation();
    injectFooterMetadata();

    // 2. Conditional Form Interception
    if (document.querySelector("form")) {
        initFormInterception();
    }
});

function initGlobalNavigation() {
    const menuBtn = document.querySelector("#menuBtn");
    const navLinks = document.querySelector("#navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isMenuOpen = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", isMenuOpen ? "true" : "false");
            menuBtn.textContent = isMenuOpen ? "✕" : "☰";
        });
    }
}

function injectFooterMetadata() {
    const yearEl = document.querySelector("#year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const lastModEl = document.querySelector("#lastModified");
    if (lastModEl) {
        lastModEl.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function initFormInterception() {
    const formElement = document.querySelector("form");
    
    if (formElement) {
        formElement.addEventListener("submit", (event) => {
            const urlInput = formElement.querySelector('input[name="website"]');

            if (urlInput && urlInput.value) {
                let cleanUrlValue = urlInput.value.trim();

                if (!cleanUrlValue.startsWith("http://") && !cleanUrlValue.startsWith("https://")) {
                    event.preventDefault(); 
                    urlInput.value = `https://${cleanUrlValue}`;
                    formElement.submit(); 
                }
            }
        });
    }
}