import Weather from "./weather-class.js";



const apiKey = "e13002eddd35b99554bbc7eb18a634aa";
const cityListLimit = 5;

const citySearchBar = document.getElementById("cityInput");
const citySearchButton = document.getElementById("citySearchButton");
const sevenDayForecastContainer = document.getElementById("sevenDayForecastContainer");
const temperatureDisplay = document.getElementById("temperatureDisplay");
const chanceOfRain = document.getElementById("chanceOfRain")
const cityListDisplayUl = document.createElement("ul");

citySearchButton.onclick = () => {
    temperatureDisplay.textContent = ""
    chanceOfRain.textContent = ""
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q==${citySearchBar.value}&limit=${cityListLimit}&appid=${apiKey}`,
        { mode: "cors" }
    )
    .then((response) => response.json())
    .then((res) => {
        console.log("res test");
        temperatureDisplay.textContent = weather.temperature;
        chanceOfRain.textContent = `${weather.chanceOfRain} chance of rain today`;
    })
    .catch ((err) => {
        console.error(err);
        feedbackP.textContent = err.message;
    })
}