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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-class.js */ \"./src/weather-class.js\");\n\n\n\n\nconst apiKey = \"e13002eddd35b99554bbc7eb18a634aa\";\nconst cityListLimit = 5;\n\nconst citySearchBar = document.getElementById(\"cityInput\");\nconst citySearchButton = document.getElementById(\"citySearchButton\");\nconst sevenDayForecastContainer = document.getElementById(\"sevenDayForecastContainer\");\nconst temperatureDisplay = document.getElementById(\"temperatureDisplay\");\nconst chanceOfRain = document.getElementById(\"chanceOfRain\")\nconst cityListDisplayUl = document.createElement(\"ul\");\n\ncitySearchButton.onclick = () => {\n    temperatureDisplay.textContent = \"\"\n    chanceOfRain.textContent = \"\"\n    fetch(\n        `http://api.openweathermap.org/geo/1.0/direct?q==${citySearchBar.value}&limit=${cityListLimit}&appid=${apiKey}`,\n        { mode: \"cors\" }\n    )\n    .then((response) => response.json())\n    .then((res) => {\n        console.log(\"res test\");\n        temperatureDisplay.textContent = weather.temperature;\n        chanceOfRain.textContent = `${weather.chanceOfRain} chance of rain today`;\n    })\n    .catch ((err) => {\n        console.error(err);\n        feedbackP.textContent = err.message;\n    })\n}\n\n//# sourceURL=webpack://es6_modules/./src/index.js?");

/***/ }),

/***/ "./src/weather-class.js":
/*!******************************!*\
  !*** ./src/weather-class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Weather {\n    constructor (weatherAppArgs) {\n        this.city = weatherAppArgs.city,\n        this.temperature = weatherAppArgs.temperature,\n        this.chanceOfRain = weatherAppArgs.chanceOfRain\n    }    \n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);\n\n//# sourceURL=webpack://es6_modules/./src/weather-class.js?");

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