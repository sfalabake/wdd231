/* ==========================================================================
WDD231 Final Project - Interactive Tools Engine
Author: Solomon Oluwadunsin Falabake
========================================================================== */

const DATA_URL = "data/tools.json";
let toolsCache = [];

/* ===============================
INIT
=============================== */
document.addEventListener("DOMContentLoaded", () => {
    fetchAndInitializeDirectory();
    setupInteractiveFilterListeners();
});

/* ===============================
FETCH DATA
=============================== */
async function fetchAndInitializeDirectory() {
    const gridContainer = document.getElementById("directoryGrid");
    if (!gridContainer) return;

    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        toolsCache = await response.json();
        renderDirectoryCards(toolsCache);

    } catch (error) {
        console.error("Data load error:", error);
        gridContainer.innerHTML =
            `<p class="error-msg">Unable to load tools. Please refresh.</p>`;
    }
}

/* ===============================
RENDER CARDS
=============================== */
function renderDirectoryCards(toolsList) {
    const gridContainer = document.getElementById("directoryGrid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    if (!toolsList.length) {
        gridContainer.innerHTML =
            `<p class="no-results">No tools found.</p>`;
        return;
    }

    toolsList.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";
        card.setAttribute("data-category", tool.category);

        // SAFE IMAGE FALLBACK
        const iconPath =
            tool.icon ||
            tool.image ||
            tool.logo ||
            "images/placeholder-icon.png";

        card.innerHTML = `
            <img 
                src="${iconPath}" 
                alt="${tool.name} logo"
                class="tool-icon"
                loading="lazy"
                width="48"
                height="48">

            <h3>${tool.name}</h3>
            <p>${tool.shortDescription}</p>

            <button class="view-btn" data-id="${tool.id}">
                Inspect Details
            </button>
        `;

        gridContainer.appendChild(card);
    });

    setupModalTriggerBindings();
}

/* ===============================
FILTER + SEARCH
=============================== */
function setupInteractiveFilterListeners() {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (searchInput) {
        searchInput.addEventListener("input", executeDirectoryQueryFilter);
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");
            executeDirectoryQueryFilter();
        });
    });
}

/* ===============================
FILTER ENGINE
=============================== */
function executeDirectoryQueryFilter() {
    const searchInput = document.getElementById("searchInput");
    const activeFilterBtn = document.querySelector(".filter-btn.active");

    const queryString = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    // Synchronized to match the dataset configuration string "All"
    const activeCategory = activeFilterBtn
        ? activeFilterBtn.getAttribute("data-category")
        : "All";

    const filteredDataset = toolsCache.filter(tool => {
        // Keeps evaluation safe against lowercase/uppercase differences between HTML attributes and JSON keys
        const matchesCategory =
            activeCategory === "All" ||
            tool.category.toLowerCase() === activeCategory.toLowerCase();

        const matchesSearch =
            tool.name.toLowerCase().includes(queryString) ||
            tool.shortDescription.toLowerCase().includes(queryString) ||
            (tool.tags &&
                tool.tags.some(tag =>
                    tag.toLowerCase().includes(queryString)
                ));

        return matchesCategory && matchesSearch;
    });

    renderDirectoryCards(filteredDataset);
}

/* ===============================
MODAL SYSTEM
=============================== */
function setupModalTriggerBindings() {
    const openModalButtons =
        document.querySelectorAll(".tool-card .view-btn");

    const modalElement = document.getElementById("toolModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    openModalButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedId =
                e.currentTarget.getAttribute("data-id");

            const foundToolObj = toolsCache.find(
                t => String(t.id) === String(selectedId)
            );

            if (foundToolObj && modalElement) {
                displayPopulatedModalContent(foundToolObj, modalElement);
            }
        });
    });

    if (closeModalBtn && modalElement) {
        closeModalBtn.addEventListener("click", () =>
            modalElement.close()
        );

        modalElement.addEventListener("click", (e) => {
            if (e.target === modalElement) modalElement.close();
        });
    }
}

/* ===============================
MODAL CONTENT
=============================== */
function displayPopulatedModalContent(tool, modal) {
    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
        <h2>${tool.name}</h2>

        <p class="modal-category">
            <strong>Category:</strong> ${tool.category}
        </p>

        <p class="modal-desc">
            ${tool.longDescription || tool.shortDescription}
        </p>

        <p>
            <strong>Tags:</strong>
            ${tool.tags ? tool.tags.join(", ") : "General"}
        </p>

        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="cta-btn">
            Visit Tool
        </a>
    `;

    modal.showModal();
}