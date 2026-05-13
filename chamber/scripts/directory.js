const url = "data/members.json";
const container = document.querySelector("#member-container");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Fetch JSON
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// Display cards
function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member) => {
        const section = document.createElement("section");

        section.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <p>Membership Level: ${member.membership}</p>
    `;

        container.appendChild(section);
    });
}

// Grid/List Toggle
gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listButton.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

getMembers();