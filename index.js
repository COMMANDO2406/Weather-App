const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    if (data.weather[0].main == "Clouds") {
      weathericon.src = "assets/cloudy.png";
    }
    if (data.weather[0].main == "Clear") {
      weathericon.src = "assets/sun.png";
    }
    if (data.weather[0].main == "Rain") {
      weathericon.src = "assets/rainy.png";
    }
    if (data.weather[0].main == "Drizzle") {
      weathericon.src = "assets/drizzle.png";
    }
    if (data.weather[0].main == "Mist") {
      weathericon.src = "assets/cloudy.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  checkWeather(city);
});
