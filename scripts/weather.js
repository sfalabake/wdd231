const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Trier coordinates
const lat = 49.75;
const lon = 6.64;

// API key (replace this)
const apiKey = "76b590fa770df6225b2eebf12cf4867e";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log("Fetch error:", error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;

    const iconCode = data.weather[0].icon;
    const desc = data.weather[0].description;

    const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);

    captionDesc.textContent = desc;
}