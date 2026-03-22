const apiKey = "YOUR_API_KEY_HERE"; // Paste your OpenWeatherMap API Key here
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("currentWeather");
const errorMsg = document.getElementById("errorMsg");
const forecastContainer = document.getElementById("forecastContainer");

// Event Listener for Search
searchBtn.addEventListener("click", () => {
    if (cityInput.value) {
        checkWeather(cityInput.value);
    }
});

// Allow pressing "Enter" key
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && cityInput.value) {
        checkWeather(cityInput.value);
    }
});

async function checkWeather(city) {
    try {
        // 1. Fetch Current Weather
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherCard.style.display = "none";
            forecastContainer.innerHTML = "";
        } else {
            var data = await response.json();

            // Update DOM with Current Weather
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Fetch Forecast
            getForecast(city);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function getForecast(city) {
    try {
        const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        // The API returns data every 3 hours. We need to filter for 12:00 PM (noon) 
        // to get one card per day.
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        forecastContainer.innerHTML = ""; // Clear previous forecast

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const card = `
                <div class="forecast-card">
                    <p>${dayName}</p>
                    <img src="${iconUrl}" alt="weather icon">
                    <p>${temp}°c</p>
                </div>
            `;
            forecastContainer.innerHTML += card;
        });

        errorMsg.style.display = "none";
        weatherCard.style.display = "block";

    } catch (error) {
        console.error("Forecast error:", error);
    }
}