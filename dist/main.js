/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-class.js */ \"./src/weather-class.js\");\n\n\n\n\nconst apiKey = \"e13002eddd35b99554bbc7eb18a634aa\";\nconst cityListLimit = 4;\n\nconst cityName = document.getElementById(\"cityName\");\nconst citySearchBar = document.getElementById(\"cityInput\");\nconst citySearchButton = document.getElementById(\"citySearchButton\");\nconst temperatureDisplay = document.getElementById(\"temperatureDisplay\");\nconst cloudCoverage = document.getElementById(\"cloudCoverage\")\nconst humidity = document.getElementById(\"humidity\");\nconst windSpeed = document.getElementById(\"windSpeed\");\nconst sunrise = document.getElementById(\"sunrise\");\nconst sunset = document.getElementById(\"sunset\");\nconst savedCityList = document.getElementById(\"savedCitiesContainer\")\nconst cityListDisplayUl = document.createElement(\"ul\");\nconst saveButton = document.getElementById(\"saveButton\");\n\nlet savedCityArray = [];\nlet activeCity; \nlet cityId = 0;\n\ncitySearchButton.onclick = (click) => {\n    click.preventDefault();\n    temperatureDisplay.textContent = \"\"\n    cloudCoverage.textContent = \"\"\n\n    fetch(\n        `http://api.openweathermap.org/geo/1.0/direct?q==${citySearchBar.value}&limit=${cityListLimit}&appid=${apiKey}`,\n        { mode: \"cors\" }\n    )\n    .then((response) => response.json())\n    .then((res) => {\n        giveWeatherOptions(res);\n    })\n    .catch ((err) => {\n        console.error(err);\n    })\n}\n\nfunction giveWeatherOptions(cityArray) {\n    const weatherOption = document.getElementById(\"searchOptionsContainer\");\n    weatherOption.innerHTML = \"\";\n    cityArray.forEach((city) => {\n        let childElement = document.createElement(\"div\");\n        childElement.textContent = `${city.name}, ${city.state}`\n        childElement.className = \"individualCityOptions\";\n        childElement.addEventListener(\"click\", (click) => {\n            click.preventDefault();\n            let latitude = city.lat;\n            let longitude = city.lon;\n            fetch (\n                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,\n                { mode: \"cors\" }\n            ) .then ((response) => response.json())\n            .then((res) => {\n                let myWeatherAppArgs = {\n                    city: city.name,\n                    state: city.state,\n                    temperature: res.main.temp,\n                    cloudCoverage: res.weather[0].main,\n                    humidity: res.main.humidity,\n                    wind: res.wind.speed,\n                    sunrise: res.sys.sunrise,\n                    sunset: res.sys.sunset,\n                    id: cityId++,\n                }\n                \n                let newWeatherObject = new _weather_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] (myWeatherAppArgs); \n\n                clickToPopulate(newWeatherObject);\n\n            })\n        \n        });\n        weatherOption.appendChild(childElement);\n        \n    })\n} \n\nfunction clickToPopulate(weatherObject) {\n    cityName.innerHTML = `${weatherObject.city}, ${weatherObject.state}`;\n    temperatureDisplay.innerHTML = `${weatherObject.temperatureInFarenheit()} <sup>o</sup>F`;\n    cloudCoverage.innerHTML = `${weatherObject.cloudCoverage}`;\n    humidity.innerHTML = `${weatherObject.humidity}%`;\n    windSpeed.innerHTML = `${weatherObject.wind}mph`;\n    sunrise.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunrise)}`;\n    sunset.innerHTML = `${weatherObject.timeInRegularTimeNotation(weatherObject.sunset)}`;\n    activeCity = weatherObject;\n    if (activeCity.cloudCoverage == \"Clear\") {\n        document.body.style.backgroundImage = \"url('imgs/clear-sky.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Clouds\") {\n        document.body.style.backgroundImage = \"url('imgs/cloudy-sky.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Fog\") {\n        document.body.style.backgroundImage = \"url('imgs/fog.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Rain\") {\n        document.body.style.backgroundImage = \"url('imgs/rainclouds.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Thunderstorm\") {\n        document.body.style.backgroundImage = \"url('imgs/thunderstorm.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Mist\") {\n        document.body.style.backgroundImage = \"url('imgs/mist.jpg')\";\n        return;\n    } else if (activeCity.cloudCoverage == \"Drizzle\") {\n        document.body.style.backgroundImage = \"url('imgs/drizzle.jpg')\";\n        return;\n    }\n}\n\nsaveButton.addEventListener(\"click\", (click) => {\n    click.preventDefault();\n    savedCityArray.push(activeCity);\n    savedCityList.appendChild(cityListDisplayUl);\n    let individualSavedCity = document.createElement(\"li\");\n    cityListDisplayUl.appendChild(individualSavedCity);\n    individualSavedCity.textContent = `${activeCity.city}, ${activeCity.state}`;\n    const removeButton = document.createElement(\"button\");\n    individualSavedCity.appendChild(removeButton);\n    removeButton.textContent = \"Remove\";\n    removeButton.dataset.id = activeCity.id;\n    removeButton.addEventListener(\"click\", (click) => {\n        removeCity(click.target.dataset.id);\n        // cityListDisplayUl.removeChild(individualSavedCity);\n    });\n    individualSavedCity.addEventListener(\"click\", (click) => {\n        clickToPopulate(activeCity);\n    })\n});\n\nfunction removeCity(id){\n        // console.log(id);\n        // console.log(savedCityArray);\n    const removeFromArrayOnClick = savedCityArray.filter((city) => {\n        // console.log(id);\n        // console.log(city);\n        // console.log(id != city.id)\n        return id !== city.id;\n    })\n    console.log(removeFromArrayOnClick);\n    savedCityArray = removeFromArrayOnClick;\n    console.log(savedCityArray);\n}\n\n//# sourceURL=webpack://es6_modules/./src/index.js?");

/***/ }),

/***/ "./src/weather-class.js":
/*!******************************!*\
  !*** ./src/weather-class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Weather {\n    constructor (weatherAppArgs) {\n        this.city = weatherAppArgs.city,\n        this.state = weatherAppArgs.state,\n        this.temperature = weatherAppArgs.temperature,\n        this.cloudCoverage = weatherAppArgs.cloudCoverage,\n        this.humidity = weatherAppArgs.humidity,\n        this.wind = weatherAppArgs.wind,\n        this.sunrise = weatherAppArgs.sunrise,\n        this.sunset = weatherAppArgs.sunset,\n        this.id = weatherAppArgs.id\n    }    \n\n    temperatureInCelsius(tempInCelsius) {\n        return tempInCelsius = Math.round(this.temperature - 273.15);\n    }\n\n    temperatureInFarenheit(tempInFarenheit) {\n        return tempInFarenheit = Math.round((this.temperatureInCelsius() * 1.8) + 32);\n    }\n\n    timeInRegularTimeNotation(time) {\n        const unixTimestamp = time * 1000;\n        const date = new Date (unixTimestamp);\n        const hours = date.getHours();\n        const minutes = date.getMinutes();\n        const regularTime = minutes < 10 ? `${hours} : 0${minutes}EST` : `${hours} : ${minutes}EST`;\n        return regularTime;\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);\n\n//# sourceURL=webpack://es6_modules/./src/weather-class.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;