const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

let currentView = "grid";

// membership helper
function getMembershipInfo(level) {
    const lvl = Number(level);
    if (lvl === 3) return { text: "Gold Member", class: "gold" };
    if (lvl === 2) return { text: "Silver Member", class: "silver" };
    return { text: "Member", class: "member" };
}

async function getMembers() {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        displayMembers(data.members);
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
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit</a>
                <p class="${info.class}">${info.text}</p>
            `;
        } else {
            card.innerHTML = `
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit</a>
                <p class="${info.class}">${info.text}</p>
            `;
        }

        container.appendChild(card);
    });
}

function setView(view) {
    currentView = view;

    container.classList.remove("grid", "list");
    container.classList.add(view);

    gridBtn.classList.toggle("active", view === "grid");
    listBtn.classList.toggle("active", view === "list");

    gridBtn.setAttribute("aria-pressed", view === "grid");
    listBtn.setAttribute("aria-pressed", view === "list");

    getMembers();
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();