var apiKey = "bb5b8d2712dbcb1bab988a21751dbd74";
var weatherCards = document.getElementById("weatherCards");
var searchBtn = document.getElementById("searchBtn");
var locationInput = document.getElementById("locationInput");

searchBtn.addEventListener("click", () => {
    var location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    try {
        var response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
        );
        var data = await response.json();
        if (data.cod !== "200") {
            alert("City not found!");
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }
}

function displayWeather(data) {
    weatherCards.innerHTML = "";
    var days = [0, 8, 16];

    days.forEach((index) => {
        var weather = data.list[index];
        var date = new Date(weather.dt * 1000).toLocaleDateString();
        var temp = Math.round(weather.main.temp);
        var icon = weather.weather[0].icon;
        var description = weather.weather[0].description;

        var card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">${date}</h5>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
          <p class="card-text">${description}</p>
          <h6 class="temp">${temp}°C</h6>
        </div>
      </div>
    `;
        weatherCards.appendChild(card);
    });
}