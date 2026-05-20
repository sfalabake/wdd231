const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

let currentView = "grid";
let cachedMembers = [];

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
        if (!res.ok) throw new Error("Data fetch error");
        const data = await res.json();
        cachedMembers = data.members;
        displayMembers(cachedMembers);
    } catch (err) {
        container.innerHTML = `<p style="color:red; text-align:center;">Failed to load data.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const info = getMembershipInfo(member.membership);
        const card = document.createElement("section");
        card.classList.add("member-card");

        if (currentView === "grid") {
            // Matches the precise side-by-side wireframe layout hierarchy
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p class="tagline">Verified Member Network</p>
                <hr>
                <div class="card-split-details">
                    <div class="img-box">
                        <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" onerror="this.src='images/placeholder.webp'">
                    </div>
                    <div class="contact-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Web:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                        <span class="membership-block-badge ${info.class}">${info.text}</span>
                    </div>
                </div>
            `;
        } else {
            // Clean table-row alternative text layout for list view
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
    container.className = view;
    gridBtn.classList.toggle("active", view === "grid");
    listBtn.classList.toggle("active", view === "list");
    displayMembers(cachedMembers);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();