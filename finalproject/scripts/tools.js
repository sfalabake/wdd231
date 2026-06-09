import { loadTheme, initializeThemeToggle } from "./storage.js";

const container = document.querySelector("#toolsContainer");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filters button");

// Modal elements
const modal = document.querySelector("#toolModal");
const closeModalBtn = document.querySelector("#closeModal");

const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDescription");
const modalPlatform = document.querySelector("#modalPlatform");
const modalPrice = document.querySelector("#modalPrice");
const modalImage = document.querySelector("#modalImage");
const modalLink = document.querySelector("#modalLink");

let toolsData = [];

// ===============================
// FETCH DATA (REQUIRED RUBRIC)
// ===============================
async function getTools() {
    try {
        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error("Failed to load tools data");
        }

        toolsData = await response.json();

        displayTools(toolsData);

    } catch (error) {
        container.innerHTML = `<p class="error">Error loading tools: ${error.message}</p>`;
    }
}

// ===============================
// DISPLAY TOOLS (ARRAY METHOD + TEMPLATE LITERAL)
// ===============================
function displayTools(tools) {
    container.innerHTML = "";

    tools.forEach(tool => {
        const card = document.createElement("div");
        card.classList.add("tool-card");

        card.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" loading="lazy">
            <h3>${tool.name}</h3>
            <p>${tool.category}</p>
            <button class="view-btn">View Details</button>
        `;

        card.querySelector(".view-btn").addEventListener("click", () => openModal(tool));

        container.appendChild(card);
    });
}

// ===============================
// MODAL FUNCTIONALITY
// ===============================
function openModal(tool) {
    modalTitle.textContent = tool.name;
    modalDesc.textContent = tool.description;
    modalPlatform.textContent = tool.platform;
    modalPrice.textContent = tool.price;
    modalImage.src = tool.image;
    modalImage.alt = tool.name;
    modalLink.href = tool.website;

    modal.showModal();
}

closeModalBtn.addEventListener("click", () => modal.close());

// ===============================
// SEARCH FUNCTION
// ===============================
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = toolsData.filter(tool =>
        tool.name.toLowerCase().includes(value) ||
        tool.category.toLowerCase().includes(value)
    );

    displayTools(filtered);
});

// ===============================
// CATEGORY FILTER
// ===============================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;

        if (category === "All") {
            displayTools(toolsData);
        } else {
            const filtered = toolsData.filter(tool => tool.category === category);
            displayTools(filtered);
        }
    });
});

// ===============================
// INIT
// ===============================
loadTheme();
initializeThemeToggle();
getTools();