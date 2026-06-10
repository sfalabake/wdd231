const DATA_URL = "./data/tools.json";
let toolsCache = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchAndInitializeDirectory();
    setupInteractiveFilterListeners();
    setupModalSystem();
});

/* ===============================
FETCH DATA
=============================== */
async function fetchAndInitializeDirectory() {
    const grid = document.getElementById("directoryGrid");
    if (!grid) return;

    try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error("Failed to load tools data");

        toolsCache = await res.json();
        renderTools(toolsCache);

    } catch (err) {
        console.error(err);
        grid.innerHTML = `<p class="error-msg">Failed to load tools.</p>`;
    }
}

/* ===============================
RENDER
=============================== */
function renderTools(list) {
    const grid = document.getElementById("directoryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (!list.length) {
        grid.innerHTML = `<p>No tools found.</p>`;
        return;
    }

    list.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";

        card.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" loading="lazy">
            <h3>${tool.name}</h3>
            <p>${tool.shortDescription}</p>
            <button class="view-btn" data-id="${tool.id}">
                Inspect Details
            </button>
        `;

        grid.appendChild(card);
    });
}

/* ===============================
FILTER SYSTEM
=============================== */
function setupInteractiveFilterListeners() {
    const search = document.getElementById("searchInput");
    const buttons = document.querySelectorAll(".filter-btn");

    search?.addEventListener("input", applyFilters);

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyFilters();
        });
    });
}

function applyFilters() {
    const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const active = document.querySelector(".filter-btn.active")?.dataset.category || "All";

    const filtered = toolsCache.filter(t => {
        const matchCategory =
            active === "All" || t.category === active;

        const matchSearch =
            (t.name || "").toLowerCase().includes(search) ||
            (t.shortDescription || "").toLowerCase().includes(search);

        return matchCategory && matchSearch;
    });

    renderTools(filtered);
}

/* ===============================
MODAL SYSTEM (CLEAN + RELIABLE)
=============================== */
function setupModalSystem() {
    const grid = document.getElementById("directoryGrid");
    const modal = document.getElementById("toolModal");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.getElementById("closeModalBtn");

    if (!grid || !modal || !modalBody) return;

    // Event delegation
    grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".view-btn");
        if (!btn) return;

        const id = btn.dataset.id;
        const tool = toolsCache.find(t => String(t.id) === String(id));

        if (!tool) return;

        modalBody.innerHTML = `
            <img src="${tool.image}" alt="${tool.name} logo" class="modal-image" loading="lazy">
            <h2>${tool.name}</h2>
            <p><strong>Category:</strong> ${tool.category}</p>
            <p><strong>Platform:</strong> ${tool.platform}</p>
            <p><strong>Price:</strong> ${tool.price}</p>
            <p>${tool.shortDescription}</p>
            <a href="${tool.url}" target="_blank" class="cta-btn">Visit Tool</a>
        `;

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            modal.setAttribute("open", "");
        }
        document.body.classList.add("modal-open");
    });

    closeBtn?.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.open) closeModal();
    });

    function closeModal() {
        if (typeof modal.close === "function") {
            modal.close();
        } else {
            modal.removeAttribute("open");
        }
        document.body.classList.remove("modal-open");
    }
}