const apiKey = "16e7014dc6dfecb4489759a286b4c544";
const lat = "4.7110";
const lon = "-74.0721";
const units = "metric";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

// Function to update weather data on the page
function updateWeatherData(data) {
  document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".description").textContent =
    data.weather[0].description;
  document.querySelector(
    ".high-low"
  ).textContent = `High: ${Math.round(data.main.temp_max)}°C Low: ${Math.round(data.main.temp_min)}°C`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  document.querySelector(".sunrise").textContent = `Sunrise: ${sunrise}`;
  document.querySelector(".sunset").textContent = `Sunset: ${sunset}`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector(".weather-icon img").src = iconUrl;
  document.querySelector(".weather-icon img").alt = data.weather[0].description;
}

// Function to update forecast data on the page
function updateForecastData(data) {
  const today = new Date();
  const twoDaysAfter = new Date(today);
  twoDaysAfter.setDate(today.getDate() + 2);
  const threeDaysAfter = new Date(today);
  threeDaysAfter.setDate(today.getDate() + 3);

  // Find the closest forecast for each day
  const todayForecast = data.list.find(
    (item) => new Date(item.dt * 1000).getDate() === today.getDate()
  );
  const twoDaysAfterForecast = data.list.find(
    (item) => new Date(item.dt * 1000).getDate() === twoDaysAfter.getDate()
  );
  const threeDaysAfterForecast = data.list.find(
    (item) => new Date(item.dt * 1000).getDate() === threeDaysAfter.getDate()
  );

  if (todayForecast) {
    document.querySelector(
      ".today"
    ).textContent = `Today: ${Math.round(todayForecast.main.temp)}°C`;
  }
  if (twoDaysAfterForecast) {
    document.querySelector(
      ".twoDaysAfter"
    ).textContent = `Two days after: ${Math.round(twoDaysAfterForecast.main.temp)}°C`;
  }
  if (threeDaysAfterForecast) {
    document.querySelector(
      ".threeDaysAfter"
    ).textContent = `Three days after: ${Math.round(threeDaysAfterForecast.main.temp)}°C`;
  }
}

// Fetch current weather data
fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => updateWeatherData(data))
  .catch((error) => console.error("Error fetching weather data:", error));

// Fetch forecast data
fetch(forecastUrl)
  .then((response) => response.json())
  .then((data) => updateForecastData(data))
  .catch((error) => console.error("Error fetching forecast data:", error));
