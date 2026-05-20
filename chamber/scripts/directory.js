const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

let currentView = "grid";
let cachedMembers = []; // PERFORMANCE FIX: Caches network data to prevent repeated fetch calls

// Membership helper
function getMembershipInfo(level) {
    const lvl = Number(level);
    if (lvl === 3) return { text: "Gold Member", class: "gold" };
    if (lvl === 2) return { text: "Silver Member", class: "silver" };
    return { text: "Member", class: "member" };
}

async function getMembers() {
    // If data is already fetched and cached, use it immediately
    if (cachedMembers.length > 0) {
        displayMembers(cachedMembers);
        return;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        cachedMembers = data.members; // Store data in cache array
        displayMembers(cachedMembers);
    } catch (err) {
        container.innerHTML = `<p style="color:red;text-align:center;">Failed to load directory</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const info = getMembershipInfo(member.membership);

        const card = document.createElement("section");
        card.classList.add("member-card");

        if (currentView === "grid") {
            // PAGE WEIGHT FIX: Added loading="lazy" and dimensions to prevent layout shifts (CLS)
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="300" height="169">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <p class="${info.class}">${info.text}</p>
            `;
        } else {
            card.innerHTML = `
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <p class="${info.class}">${info.text}</p>
            `;
        }

        container.appendChild(card);
    });
}

function setView(view) {
    if (currentView === view) return; // Prevent unnecessary processing if clicking the already active view

    currentView = view;

    container.classList.remove("grid", "list");
    container.classList.add(view);

    gridBtn.classList.toggle("active", view === "grid");
    listBtn.classList.toggle("active", view === "list");

    gridBtn.setAttribute("aria-pressed", view === "grid");
    listBtn.setAttribute("aria-pressed", view === "list");

    // Pulls directly from memory cache instead of executing a network fetch re-download
    displayMembers(cachedMembers);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// Initial data execution
getMembers();