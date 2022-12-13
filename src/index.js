import Weather from "./weather-class.js";



const apiKey = "e13002eddd35b99554bbc7eb18a634aa";
const cityListLimit = 4;

const cityName = document.getElementById("cityName");
const citySearchBar = document.getElementById("cityInput");
const citySearchButton = document.getElementById("citySearchButton");
const temperatureDisplay = document.getElementById("temperatureDisplay");
const cloudCoverage = document.getElementById("cloudCoverage")
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const savedCityList = document.getElementById("savedCitiesContainer")
const cityListDisplayUl = document.createElement("ul");
const saveButton = document.getElementById("saveButton");

let savedCityArray = [];
let activeCity; 
let cityId = 0;

citySearchButton.onclick = (click) => {
    click.preventDefault();
    temperatureDisplay.textContent = ""
    cloudCoverage.textContent = ""

    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q==${citySearchBar.value}&limit=${cityListLimit}&appid=${apiKey}`,
        { mode: "cors" }
    )
    .then((response) => response.json())
    .then((res) => {
        giveWeatherOptions(res);
    })
    .catch ((err) => {
        console.error(err);
    })
}

function giveWeatherOptions(cityArray) {
    const weatherOption = document.getElementById("searchOptionsContainer");
    weatherOption.innerHTML = "";
    cityArray.forEach((city) => {
        let childElement = document.createElement("div");
        childElement.textContent = `${city.name}, ${city.state}`
        childElement.className = "individualCityOptions";
        childElement.addEventListener("click", (click) => {
            click.preventDefault();
            let latitude = city.lat;
            let longitude = city.lon;
            fetch (
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
                { mode: "cors" }
            ) .then ((response) => response.json())
            .then((res) => {
                let myWeatherAppArgs = {
                    city: city.name,
                    state: city.state,
                    temperature: res.main.temp,
                    cloudCoverage: res.weather[0].main,
                    humidity: res.main.humidity,
                    wind: res.wind.speed,
                    sunrise: res.sys.sunrise,
                    sunset: res.sys.sunset,
                    id: cityId++,
                }
                
                let newWeatherObject = new Weather (myWeatherAppArgs); 

                clickToPopulate(newWeatherObject);

            })
        
        });
        weatherOption.appendChild(childElement);
        
    })
} 

function clickToPopulate(weatherObject) {
    cityName.innerHTML = `${weatherObject.city}, ${weatherObject.state}`;
    temperatureDisplay.innerHTML = `${weatherObject.temperatureInFarenheit()} <sup>o</sup>F`;
    cloudCoverage.innerHTML = `${weatherObject.cloudCoverage}`;
    humidity.innerHTML = `${weatherObject.humidity}%`;
    windSpeed.innerHTML = `${weatherObject.wind}mph`;
    sunrise.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunrise)}`;
    sunset.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunset)}`;
    activeCity = weatherObject;
    if (activeCity.cloudCoverage == "Clear") {
        document.body.style.backgroundImage = "url('imgs/clear-sky.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Clouds") {
        document.body.style.backgroundImage = "url('imgs/cloudy-sky.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Fog") {
        document.body.style.backgroundImage = "url('imgs/fog.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Rain") {
        document.body.style.backgroundImage = "url('imgs/rainclouds.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Thunderstorm") {
        document.body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Mist") {
        document.body.style.backgroundImage = "url('imgs/mist.jpg')";
        return;
    } else if (activeCity.cloudCoverage == "Drizzle") {
        document.body.style.backgroundImage = "url('imgs/drizzle.jpg')";
        return;
    }
}

saveButton.addEventListener("click", (click) => {
    click.preventDefault();
    savedCityArray.push(activeCity);
    savedCityList.appendChild(cityListDisplayUl);
    let individualSavedCity = document.createElement("li");
    cityListDisplayUl.appendChild(individualSavedCity);
    individualSavedCity.textContent = `${activeCity.city}, ${activeCity.state}`;
    const removeButton = document.createElement("button");
    individualSavedCity.appendChild(removeButton);
    removeButton.textContent = "Remove";
    removeButton.dataset.id = activeCity.id;
    removeButton.addEventListener("click", (click) => {
        removeCity(click.target.dataset.id);
        // cityListDisplayUl.removeChild(individualSavedCity);
    });
    individualSavedCity.addEventListener("click", (click) => {
        clickToPopulate(activeCity);
    })
});

function removeCity(id){
        // console.log(id);
        // console.log(savedCityArray);
    const removeFromArrayOnClick = savedCityArray.filter((city) => {
        // console.log(id);
        // console.log(city);
        // console.log(id != city.id)
        return id !== city.id;
    })
    console.log(removeFromArrayOnClick);
    savedCityArray = removeFromArrayOnClick;
    console.log(savedCityArray);
}