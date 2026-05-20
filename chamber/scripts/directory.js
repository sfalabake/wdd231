const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

let currentView = "grid";
let cachedMembers = []; // Cache layout storage system

function getMembershipInfo(level) {
    const lvl = Number(level);
    if (lvl === 3) return { text: "Gold Member", class: "gold" };
    if (lvl === 2) return { text: "Silver Member", class: "silver" };
    return { text: "Member", class: "member" };
}

async function getMembers() {
    if (cachedMembers.length > 0) {
        displayMembers(cachedMembers);
        return;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch operational degradation");

        const data = await res.json();
        cachedMembers = data.members;
        displayMembers(cachedMembers);
    } catch (err) {
        container.innerHTML = `<p style="color:red; text-align:center; font-weight:bold;">Failed to load business directory data.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const info = getMembershipInfo(member.membership);
        const card = document.createElement("section");
        card.classList.add("member-card");

        if (currentView === "grid") {
            // Grid contains completely safe responsive sizing references
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="300" height="169">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <p class="${info.class}">${info.text}</p>
            `;
        } else {
            // Text-only DOM allocation matches criteria strictly
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
    if (currentView === view) return;

    currentView = view;
    container.className = view; // Swaps out layout grid / list states explicitly

    gridBtn.classList.toggle("active", view === "grid");
    listBtn.classList.toggle("active", view === "list");

    gridBtn.setAttribute("aria-pressed", view === "grid");
    listBtn.setAttribute("aria-pressed", view === "list");

    displayMembers(cachedMembers);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();