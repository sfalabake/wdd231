const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

// Get membership level text and class
function getMembershipInfo(level) {
    if (level === 3) return { text: "Gold Member", class: "gold" };
    if (level === 2) return { text: "Silver Member", class: "silver" };
    return { text: "Member", class: "member" };
}

// Fetch members
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<p style="color: red; text-align: center; grid-column: 1 / -1; padding: 2rem;">
            Failed to load business directory. Please try again later.
        </p>`;
    }
}

// Display members
function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const info = getMembershipInfo(member.membership);

        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy"
                 width="300" 
                 height="200">
            <h2>${member.name}</h2>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <a href="${member.website}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="website-link">Visit Website</a>
            <p class="membership ${info.class}">${info.text}</p>
        `;

        container.appendChild(card);
    });
}

// Toggle between Grid and List View
function setView(view) {
    container.classList.remove("grid", "list");
    container.classList.add(view);

    gridBtn.classList.toggle("active", view === "grid");
    listBtn.classList.toggle("active", view === "list");
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// Initialize
getMembers();
setView("grid");   // Default view