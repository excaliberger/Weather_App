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
const unitOfTemperatureMeasure = document.getElementById("farenheitToCelsius");

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
        childElement.textContent = city.state === undefined ? `${city.name}, ${city.country}` : `${city.name}, ${city.state}`
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
                    country: city.country,
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
    console.log(weatherObject.country);
    cityName.innerHTML = weatherObject.state === undefined ? `${weatherObject.city}, ${weatherObject.country}` : `${weatherObject.city}, ${weatherObject.state}`;
    const farenheitOrCelsius = () => {
        if (unitOfTemperatureMeasure.checked === true) {
            temperatureDisplay.innerHTML = `${weatherObject.temperatureInCelsius()} <sup>o</sup>C`;
        } else {
            temperatureDisplay.innerHTML = `${weatherObject.temperatureInFarenheit()} <sup>o</sup>F`;
        }};
    unitOfTemperatureMeasure.onclick = farenheitOrCelsius;
    farenheitOrCelsius();
    cloudCoverage.innerHTML = `${weatherObject.cloudCoverage}`;
    humidity.innerHTML = `${weatherObject.humidity}%`;
    windSpeed.innerHTML = `${weatherObject.wind}mph`;
    sunrise.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunrise)}`;
    sunset.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunset)}`;
    activeCity = weatherObject;
    switch (activeCity.cloudCoverage) {
        case "Clear":
            document.body.style.backgroundImage = "url('imgs/clear-sky.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Clouds":
            document.body.style.backgroundImage = "url('imgs/cloudy-sky.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Fog":
            document.body.style.backgroundImage = "url('imgs/fog.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Rain":
            document.body.style.backgroundImage = "url('imgs/rainclouds.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Mist":
            document.body.style.backgroundImage = "url('imgs/mist.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Drizzle":
            document.body.style.backgroundImage = "url('imgs/drizzle.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
        case "Snow":
            document.body.style.backgroundImage = "url('imgs/snow.jpg')";
            document.body.style.backgroundSize = "cover";
            break;
    }
}

saveButton.addEventListener("click", (click) => {
    click.preventDefault();
    savedCityArray.push(activeCity);

    const removeButton = document.createElement("button");
    let individualSavedCity = document.createElement("h3");
    let individualSavedCityBox = document.createElement("li");
    
    savedCityList.appendChild(cityListDisplayUl);
    cityListDisplayUl.appendChild(individualSavedCityBox);
    individualSavedCityBox.appendChild(individualSavedCity);
    individualSavedCityBox.appendChild(removeButton);
    individualSavedCityBox.className = "savedCity";
    individualSavedCity.className = "cityWords";
    individualSavedCity.textContent = `${activeCity.city}, ${activeCity.state}`;
    removeButton.textContent = "Remove";
    removeButton.dataset.id = activeCity.id;
    removeButton.className = "btn-saved-city cityWords";
    individualSavedCity.dataset.id = activeCity.id;

    removeButton.addEventListener("click", (click) => {
        removeCity(click.target.dataset.id);
        cityListDisplayUl.removeChild(individualSavedCityBox);
    });
    individualSavedCity.addEventListener("click", (click) => {
        const city = savedCityArray.find((city) => city.id == click.target.dataset.id);
        clickToPopulate(city);

    })
});

function removeCity(id){
    console.log(savedCityArray);
    const removeFromArrayOnClick = savedCityArray.filter((city) => {
        return id != city.id;
    })
    savedCityArray = removeFromArrayOnClick;
    console.log(savedCityArray);
}

