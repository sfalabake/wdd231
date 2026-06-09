// DOM Targets
const toolsGrid = document.querySelector("#toolsContainer");
const searchField = document.querySelector("#searchInput");
const filterGroup = document.querySelectorAll(".filters button");

// Modal Targets
const infoModal = document.querySelector("#toolModal");
const exitModalBtn = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDescription");
const modalPlatform = document.querySelector("#modalPlatform");
const modalPrice = document.querySelector("#modalPrice");
const modalImage = document.querySelector("#modalImage");
const modalLink = document.querySelector("#modalLink");

let primaryToolsDataset = [];
let activeCategorySelection = "All";
let operationalSearchQuery = "";

async function retrieveToolsInventory() {
    if (!toolsGrid) return;

    try {
        const networkResponse = await fetch("data/tools.json");
        if (!networkResponse.ok) {
            throw new Error(`HTTP Error Status: ${networkResponse.status}`);
        }

        primaryToolsDataset = await networkResponse.json();
        executeCombinedFiltering();
    } catch (networkException) {
        console.error("Data Load Exception Error:", networkException);
        toolsGrid.innerHTML = `<p class="error-msg">Unable to load tool directory records.</p>`;
    }
}

function renderToolsGridDisplay(dynamicToolsArray) {
    toolsGrid.innerHTML = "";

    if (dynamicToolsArray.length === 0) {
        toolsGrid.innerHTML = `<p class="no-results-msg">No tools match your search criteria.</p>`;
        return;
    }

    dynamicToolsArray.forEach(toolItem => {
        const functionalCardNode = document.createElement("div");
        functionalCardNode.classList.add("tool-card");

        functionalCardNode.innerHTML = `
            <img src="${toolItem.image}" alt="${toolItem.name} logo" loading="lazy" width="80" height="80">
            <h3>${toolItem.name}</h3>
            <p class="tool-category-badge">${toolItem.category}</p>
            <button class="view-btn">View Details</button>
        `;

        functionalCardNode.querySelector(".view-btn").addEventListener("click", () => triggerModalExpansion(toolItem));
        toolsGrid.appendChild(functionalCardNode);
    });
}

function executeCombinedFiltering() {
    const activeFilteredList = primaryToolsDataset.filter(tool => {
        const matchesCategory = (activeCategorySelection === "All" || tool.category === activeCategorySelection);
        const matchesSearchText = (
            tool.name.toLowerCase().includes(operationalSearchQuery) ||
            tool.category.toLowerCase().includes(operationalSearchQuery)
        );
        return matchesCategory && matchesSearchText;
    });

    renderToolsGridDisplay(activeFilteredList);
}

function triggerModalExpansion(toolObject) {
    if (!infoModal) return;

    modalTitle.textContent = toolObject.name;
    modalDesc.textContent = toolObject.description || "No supplemental details available.";
    modalPlatform.textContent = toolObject.platform || "Web / Universal Browser Access";
    modalPrice.textContent = toolObject.price || "Free Open Source Project";
    modalImage.src = toolObject.image;
    modalImage.alt = `${toolObject.name} interface`;
    modalLink.href = toolObject.website;

    infoModal.showModal();
}

// Event Listeners
if (searchField) {
    searchField.addEventListener("input", (event) => {
        operationalSearchQuery = event.target.value.toLowerCase().trim();
        executeCombinedFiltering();
    });
}

if (filterGroup) {
    filterGroup.forEach(buttonElement => {
        buttonElement.addEventListener("click", () => {
            filterGroup.forEach(btn => btn.classList.remove("active"));
            buttonElement.classList.add("active");
            activeCategorySelection = buttonElement.dataset.category;
            executeCombinedFiltering();
        });
    });
}

if (exitModalBtn && infoModal) {
    exitModalBtn.addEventListener("click", () => infoModal.close());
    infoModal.addEventListener("click", (event) => {
        if (event.target === infoModal) infoModal.close();
    });
}

document.addEventListener("DOMContentLoaded", retrieveToolsInventory);