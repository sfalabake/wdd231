const url = "data/members.json";
const container = document.querySelector("#member-container");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Get membership level label
function getMembershipLevel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

// Get membership badge class
function getMembershipClass(level) {
    if (level === 3) return "gold";
    if (level === 2) return "silver";
    return "member";
}

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
        container.innerHTML = `<p style="color: red; grid-column: 1 / -1; text-align: center;">
            Failed to load business directory. Please try again later.
        </p>`;
    }
}

// Display member cards
function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member) => {
        const section = document.createElement("section");
        section.classList.add("member-card");
        section.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy"
                 onerror="this.src='images/placeholder.webp';">
            
            <h3>${member.name}</h3>
            
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            
            <a href="${member.website}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="website-link">Visit Website</a>
            
            <p class="membership ${getMembershipClass(member.membership)}">
                ${getMembershipLevel(member.membership)} Member
            </p>
        `;
        container.appendChild(section);
    });
}

// Toggle between Grid and List View
function setView(view) {
    if (view === "grid") {
        container.classList.remove("list");
        container.classList.add("grid");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    } else {
        container.classList.remove("grid");
        container.classList.add("list");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    }
}

// Event Listeners
gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

// Initialize
getMembers();
setView("grid"); // Default to grid view