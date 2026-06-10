const featuredContainer = document.querySelector("#featuredTools");

async function loadFeaturedTools() {
    if (!featuredContainer) return;

    try {

        const response = await fetch("data/tools.json");

        if (!response.ok) {
            throw new Error("Unable to load tools.");
        }

        const tools = await response.json();

        const featured = tools.slice(0, 6);

        featured.forEach(tool => {

            const card = document.createElement("article");

            card.classList.add("featured-card");

            card.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" loading="lazy">
                <h3>${tool.name}</h3>
                <p>${tool.category}</p>
            `;

            featuredContainer.appendChild(card);
        });

    } catch (error) {

        featuredContainer.innerHTML =
            `<p>${error.message}</p>`;
    }
}

loadFeaturedTools();