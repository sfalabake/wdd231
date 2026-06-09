/* ==========================================================================
   WDD231 Final Project - Tech Tools Directory Main Script Engine
   Author: Solomon Oluwadunsin Falabake
   File: main.js (Global Production Logic Module)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeGlobalThemeEngine();
    populateContextualFooterMetrics();
});

/**
 * Orchestrates Mobile Dropdown Interactive Navigation Mechanics
 */
function initializeNavigation() {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            
            // Toggle accessible glyph indicator icon representation handles
            menuBtn.innerHTML = navLinks.classList.contains("open") ? "&#10006;" : "&#9776;";
            
            // Toggle accessibility state attributes
            const isOpen = navLinks.classList.contains("open");
            menuBtn.setAttribute("aria-expanded", isOpen.toString());
        });
    }
}

/**
 * Handles Global Native Dark/Light UI State Adjustments via Element State Interception
 */
function initializeGlobalThemeEngine() {
    const themeToggle = document.getElementById("themeToggle");
    
    // Retrieve stored configurations from localStorage
    const cachedPreference = localStorage.getItem("siteThemeEngineState");
    if (cachedPreference === "dark") {
        document.body.classList.add("dark");
        if (themeToggle) {
            themeToggle.innerHTML = "&#9789;";
            themeToggle.setAttribute("aria-label", "Switch to Light Mode");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const activeStateIsDark = document.body.classList.contains("dark");
            
            // Update button visual state and accessible text descriptions
            themeToggle.innerHTML = activeStateIsDark ? "&#9789;" : "&#9788;";
            themeToggle.setAttribute("aria-label", activeStateIsDark ? "Switch to Light Mode" : "Switch to Dark Mode");
            
            // Save state selection locally
            localStorage.setItem("siteThemeEngineState", activeStateIsDark ? "dark" : "light");
        });
    }
}

/**
 * Automates Dynamic Contextual Insertion of Date Metrics and Site Modification Meta Streams
 */
function populateContextualFooterMetrics() {
    const currentYearTarget = document.getElementById("currentYear");
    const lastModificationTarget = document.getElementById("lastModificationDate");

    // Dynamically write current calendar year
    if (currentYearTarget) {
        currentYearTarget.textContent = new Date().getFullYear();
    }

    // Capture and write document file's structural last update timestamp
    if (lastModificationTarget) {
        lastModificationTarget.textContent = document.lastModified;
    }
}