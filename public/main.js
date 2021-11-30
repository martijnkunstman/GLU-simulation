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

/***/ "./src/classes/Boid.ts":
/*!*****************************!*\
  !*** ./src/classes/Boid.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Boid = /** @class */ (function () {\r\n    function Boid(location) {\r\n        this.location = location;\r\n    }\r\n    Boid.prototype.render = function (ctx) {\r\n        ctx.beginPath();\r\n        ctx.arc(this.location.x, this.location.y, 10, 0, 2 * Math.PI);\r\n        ctx.stroke();\r\n    };\r\n    return Boid;\r\n}());\r\nexports[\"default\"] = Boid;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Boid.ts?");

/***/ }),

/***/ "./src/classes/Helper.ts":
/*!*******************************!*\
  !*** ./src/classes/Helper.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Helper = /** @class */ (function () {\r\n    function Helper() {\r\n    }\r\n    Helper.prototype.randomBetween = function (a, b) {\r\n        return Math.floor(Math.random() * (b - a + 1) + a);\r\n    };\r\n    ;\r\n    return Helper;\r\n}());\r\nexports[\"default\"] = Helper;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Helper.ts?");

/***/ }),

/***/ "./src/classes/Invection.ts":
/*!**********************************!*\
  !*** ./src/classes/Invection.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Invection = /** @class */ (function () {\r\n    function Invection(duration, mortality, contagiousness, transmittability) {\r\n        this.duration = duration;\r\n        this.mortality = mortality;\r\n        this.contagiousness = contagiousness;\r\n        this.transmittability = transmittability;\r\n    }\r\n    return Invection;\r\n}());\r\nexports[\"default\"] = Invection;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Invection.ts?");

/***/ }),

/***/ "./src/classes/Location.ts":
/*!*********************************!*\
  !*** ./src/classes/Location.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Location = /** @class */ (function () {\r\n    function Location(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Location;\r\n}());\r\nexports[\"default\"] = Location;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Location.ts?");

/***/ }),

/***/ "./src/classes/Simulation.ts":
/*!***********************************!*\
  !*** ./src/classes/Simulation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Simulation = /** @class */ (function () {\r\n    function Simulation(world, invection) {\r\n        this.world = world;\r\n    }\r\n    return Simulation;\r\n}());\r\nexports[\"default\"] = Simulation;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Simulation.ts?");

/***/ }),

/***/ "./src/classes/World.ts":
/*!******************************!*\
  !*** ./src/classes/World.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Helper_1 = __webpack_require__(/*! ./Helper */ \"./src/classes/Helper.ts\");\r\nvar Location_1 = __webpack_require__(/*! ./Location */ \"./src/classes/Location.ts\");\r\nvar Boid_1 = __webpack_require__(/*! ./Boid */ \"./src/classes/Boid.ts\");\r\nvar World = /** @class */ (function () {\r\n    function World(width, height, initialBoids) {\r\n        this.boids = [];\r\n        this.helper = new Helper_1.default();\r\n        this.canvas = document.createElement('canvas');\r\n        document.body.appendChild(this.canvas);\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        this.ctx.fillStyle = \"#00FF00\";\r\n        this.ctx.fillRect(0, 0, this.width, this.height);\r\n        this.initialBoids = initialBoids;\r\n        for (var a = 0; a < this.initialBoids; a++) {\r\n            this.createBoid(new Location_1.default(this.helper.randomBetween(0, width), this.helper.randomBetween(0, height)));\r\n        }\r\n        this.render();\r\n    }\r\n    World.prototype.createBoid = function (location) {\r\n        var boid = new Boid_1.default(location);\r\n        this.boids.push(boid);\r\n    };\r\n    World.prototype.render = function () {\r\n        var _this = this;\r\n        this.boids.map(function (boid) { return boid.render(_this.ctx); });\r\n    };\r\n    return World;\r\n}());\r\nexports[\"default\"] = World;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/World.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Simulation_1 = __webpack_require__(/*! ./classes/Simulation */ \"./src/classes/Simulation.ts\");\r\nvar World_1 = __webpack_require__(/*! ./classes/World */ \"./src/classes/World.ts\");\r\nvar Invection_1 = __webpack_require__(/*! ./classes/Invection */ \"./src/classes/Invection.ts\");\r\n//SIR\r\n//susceptible\r\n//infectious\r\n//recovered / removed\r\n//vaccinated\r\nvar world = new World_1.default(500, 500, 100);\r\nvar invection = new Invection_1.default(1, 1, 1, 1);\r\nvar simulation = new Simulation_1.default(world, invection);\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/main.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;