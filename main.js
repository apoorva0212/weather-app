const apiKey = "67cba3d02fac0e3014fbc2c396db6adc";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apiKey}&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(apiURL + city);
  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    let weather = data.weather[0].main;
    if (weather) {
      document.querySelector(
        ".weather-icon"
      ).src = `assets/${weather.toLowerCase()}.png`;
      document.querySelector(".weather").style.display = "block";
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
