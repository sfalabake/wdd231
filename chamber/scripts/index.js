const membersUrl = "data/members.json";

// Lagos Regional Coordinates
const lat = 6.5244;
const lon = 3.3792;
const apiKey = "76b590fa770df6225b2eebf12cf4867e";

// ================= WEATHER SERVICES =================
async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        document.querySelector("#temp").textContent = `${Math.round(data.main.temp)}°C`;

        const desc = data.weather[0].description;
        document.querySelector("#description").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
        document.querySelector("#humidity").textContent = `${data.main.humidity}%`;

        getForecast();
    } catch (err) {
        console.error("Weather data generation error:", err);
    }
}

// Labeled 3-Day Forecast Compilation
async function getForecast() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        const forecastContainer = document.querySelector("#forecast");
        forecastContainer.innerHTML = "";

        // Filters out one checkpoint snapshot daily near solar midday (12:00:00)
        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        daily.forEach((day, index) => {
            const p = document.createElement("p");

            let dayName = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: 'long' });
            if (index === 0) dayName = "Today";

            p.innerHTML = `${dayName}: <strong>${Math.round(day.main.temp)}°C</strong> – <em>${day.weather[0].description}</em>`;
            forecastContainer.appendChild(p);

            if (index < daily.length - 1) {
                forecastContainer.appendChild(document.createElement("hr"));
            }
        });

    } catch (err) {
        console.error("Forecast data generation error:", err);
    }
}

// ================= RANDOM SPOTLIGHT ADVERTISEMENTS =================
async function loadSpotlights() {
    try {
        const res = await fetch(membersUrl);
        const data = await res.json();

        // Rubric Filter Requirement: Gold (3) or Silver (2) membership tiers
        const eligible = data.members.filter(m => m.membership === 2 || m.membership === 3);

        // Randomize list arrangement array positions
        const shuffled = eligible.sort(() => 0.5 - Math.random());

        // Extract a cluster subset of 3 random properties
        const selected = shuffled.slice(0, 3);

        displaySpotlights(selected);
    } catch (err) {
        console.error("Spotlight tracking resolution error:", err);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        // Translate the structural levels cleanly into clear label strings
        const tierLabel = member.membership === 3 ? "Gold Member" : "Silver Member";
        const tierClass = member.membership === 3 ? "gold" : "silver";

        card.innerHTML = `
            <h4>${member.name}</h4>
            <p class="tagline">${member.tagline || 'Verified Member Network'}</p>
            <hr>
            <div class="spotlight-details">
                <div class="img-box">
                    <img src="images/${member.image}" alt="${member.name} Logo" onerror="this.src='images/placeholder.webp'">
                </div>
                <div class="contact-info">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Web:</strong> <a href="${member.website}" target="_blank" rel="noopener">Visit Site</a></p>
                    <p class="membership-badge ${tierClass}"><strong>${tierLabel}</strong></p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ================= GLOBAL CONFIG INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    loadSpotlights();
});