import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const messageBox = document.querySelector("#visit-message");

// ================= LOCALSTORAGE VISIT MESSAGE =================
function handleVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const diffDays = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            message = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }

    if (messageBox) messageBox.textContent = message;

    localStorage.setItem("lastVisit", String(now));
}

// ================= BUILD CARDS =================
function buildCards() {
    if (!grid || !Array.isArray(places)) return;

    grid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img src="images/${place.image}"
                     alt="${place.name}"
                     loading="lazy">
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button type="button">Learn More</button>
        `;

        grid.appendChild(card);

        // grid-area assignment (REQUIRED for named areas)
        card.style.gridArea = `card${index + 1}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    buildCards();
    handleVisitMessage();
});