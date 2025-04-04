const apiKey = "16e7014dc6dfecb4489759a286b4c544";
const lat = "4.7110";
const lon = "-74.0721";
const units = "metric";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

// Function to update weather data on the page
function updateWeatherData(data) {
  document.querySelector(".temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.querySelector(".description").textContent =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
  document.querySelector(".high-low").textContent = `High: ${Math.round(
    data.main.temp_max
  )}°C - Low: ${Math.round(data.main.temp_min)}°C`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector(".weather-icon img").src = iconUrl;
  document.querySelector(".weather-icon img").alt = data.weather[0].description;
}

// Fetch current weather data
fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => updateWeatherData(data))
  .catch((error) => console.error("Error fetching weather data:", error));
