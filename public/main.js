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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Vector_1 = __webpack_require__(/*! ./Vector */ \"./src/classes/Vector.ts\");\r\nvar Invection_1 = __webpack_require__(/*! ./Invection */ \"./src/classes/Invection.ts\");\r\nvar Util_1 = __webpack_require__(/*! ./Util */ \"./src/classes/Util.ts\");\r\nvar Boid = /** @class */ (function () {\r\n    function Boid(location, bounds, id, invection) {\r\n        if (invection === void 0) { invection = new Invection_1.default(); }\r\n        this.radius = 5;\r\n        this.overlap = false;\r\n        this.checked = false;\r\n        this.util = new Util_1.default();\r\n        this.invection = invection;\r\n        this.location = location;\r\n        this.bounds = bounds;\r\n        this.id = id;\r\n        this.direction = new Vector_1.default(this.util.randomBetween(-2, 2), this.util.randomBetween(-2, 2));\r\n    }\r\n    /*\r\n    public checkOverlap(boids: Array<Boid>):boolean {\r\n        if (this.checked) {\r\n            return true;\r\n        }\r\n        for (let i: number = 0; i < boids.length; i++) {\r\n            console.log(boids[i].id);\r\n            if (this.id != boids[i].id) {\r\n                if (this.location.distance(boids[i].location) < this.radius * 2) {\r\n                    this.overlap = true;\r\n                    this.checked = true;\r\n                    //boids[i].overlap = true;\r\n                    boids[i].checked = true;\r\n                }\r\n            }\r\n        }\r\n        this.checked = true;\r\n        return true;\r\n    }\r\n    */\r\n    Boid.prototype.render = function (ctx) {\r\n        this.location.x = this.location.x + this.direction.x;\r\n        this.location.y = this.location.y + this.direction.y;\r\n        if (this.location.x < 0) {\r\n            this.direction.x = -this.direction.x;\r\n        }\r\n        if (this.location.x > this.bounds.x) {\r\n            this.direction.x = -this.direction.x;\r\n        }\r\n        if (this.location.y < 0) {\r\n            this.direction.y = -this.direction.y;\r\n        }\r\n        if (this.location.y > this.bounds.y) {\r\n            this.direction.y = -this.direction.y;\r\n        }\r\n        ctx.beginPath();\r\n        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);\r\n        ctx.stroke();\r\n        if (this.overlap) {\r\n            ctx.fillStyle = \"red\";\r\n            ctx.fill();\r\n        }\r\n    };\r\n    return Boid;\r\n}());\r\nexports[\"default\"] = Boid;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Boid.ts?");

/***/ }),

/***/ "./src/classes/Invection.ts":
/*!**********************************!*\
  !*** ./src/classes/Invection.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Invection = /** @class */ (function () {\r\n    function Invection(duration, mortality, contagiousness, transmittability) {\r\n        if (duration === void 0) { duration = 1; }\r\n        if (mortality === void 0) { mortality = 1; }\r\n        if (contagiousness === void 0) { contagiousness = 1; }\r\n        if (transmittability === void 0) { transmittability = 1; }\r\n        this.duration = duration;\r\n        this.mortality = mortality;\r\n        this.contagiousness = contagiousness;\r\n        this.transmittability = transmittability;\r\n    }\r\n    return Invection;\r\n}());\r\nexports[\"default\"] = Invection;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Invection.ts?");

/***/ }),

/***/ "./src/classes/Simulation.ts":
/*!***********************************!*\
  !*** ./src/classes/Simulation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Simulation = /** @class */ (function () {\r\n    function Simulation(world, invection) {\r\n        this.world = world;\r\n    }\r\n    return Simulation;\r\n}());\r\nexports[\"default\"] = Simulation;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Simulation.ts?");

/***/ }),

/***/ "./src/classes/Util.ts":
/*!*****************************!*\
  !*** ./src/classes/Util.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Util = /** @class */ (function () {\r\n    function Util() {\r\n    }\r\n    Util.prototype.randomBetween = function (a, b) {\r\n        return Math.floor(Math.random() * (b - a + 1) + a);\r\n    };\r\n    ;\r\n    return Util;\r\n}());\r\nexports[\"default\"] = Util;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Util.ts?");

/***/ }),

/***/ "./src/classes/Vector.ts":
/*!*******************************!*\
  !*** ./src/classes/Vector.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Vector = /** @class */ (function () {\r\n    function Vector(x, y) {\r\n        if (x === void 0) { x = 1; }\r\n        if (y === void 0) { y = 1; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Vector.prototype.distance = function (vector) {\r\n        return Math.hypot(this.x - vector.x, this.y - vector.y);\r\n    };\r\n    Vector.prototype.add = function (vector) {\r\n        return new Vector(this.x + vector.x, this.y + vector.y);\r\n    };\r\n    Vector.prototype.substract = function (vector) {\r\n        return new Vector(this.x - vector.x, this.y - vector.y);\r\n    };\r\n    return Vector;\r\n}());\r\nexports[\"default\"] = Vector;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/Vector.ts?");

/***/ }),

/***/ "./src/classes/World.ts":
/*!******************************!*\
  !*** ./src/classes/World.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Util_1 = __webpack_require__(/*! ./Util */ \"./src/classes/Util.ts\");\r\nvar Vector_1 = __webpack_require__(/*! ./Vector */ \"./src/classes/Vector.ts\");\r\nvar Boid_1 = __webpack_require__(/*! ./Boid */ \"./src/classes/Boid.ts\");\r\nvar World = /** @class */ (function () {\r\n    function World(width, height, initialBoids) {\r\n        this.boids = [];\r\n        this.time = 0;\r\n        this.util = new Util_1.default();\r\n        this.width = width;\r\n        this.height = height;\r\n        this.canvas = document.createElement('canvas');\r\n        this.canvas.setAttribute(\"width\", this.width.toString());\r\n        this.canvas.setAttribute(\"height\", this.height.toString());\r\n        document.body.appendChild(this.canvas);\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        this.initialBoids = initialBoids;\r\n        for (var a = 0; a < this.initialBoids; a++) {\r\n            var location_1 = new Vector_1.default(this.util.randomBetween(0, width), this.util.randomBetween(0, height));\r\n            var bounds = new Vector_1.default(this.width, this.height);\r\n            var boid = new Boid_1.default(location_1, bounds, a);\r\n            this.boids.push(boid);\r\n        }\r\n        this.cycle();\r\n    }\r\n    World.prototype.cycle = function () {\r\n        var _this = this;\r\n        var d = new Date();\r\n        var time = d.getTime();\r\n        this.checkOverlap();\r\n        var dif = time - this.time;\r\n        this.render(dif);\r\n        console.log();\r\n        window.requestAnimationFrame(function () { return _this.cycle(); });\r\n        this.time = time;\r\n    };\r\n    World.prototype.checkOverlap = function () {\r\n        this.boids.map(function (boid) { boid.overlap = false; boid.checked = false; });\r\n        var counter = 1;\r\n        for (var i = 0; i < this.boids.length; i++) {\r\n            if (!this.boids[i].checked) {\r\n                for (var ii = counter; ii < this.boids.length; ii++) {\r\n                    if (this.boids[i].id != this.boids[ii].id) {\r\n                        if (this.boids[i].location.distance(this.boids[ii].location) < this.boids[i].radius + this.boids[ii].radius) {\r\n                            this.boids[i].overlap = true;\r\n                            this.boids[ii].overlap = true;\r\n                            this.boids[i].checked = true;\r\n                            this.boids[ii].checked = true;\r\n                            break;\r\n                        }\r\n                    }\r\n                    this.boids[i].checked = true;\r\n                }\r\n            }\r\n            counter++;\r\n        }\r\n    };\r\n    World.prototype.render = function (fps) {\r\n        var _this = this;\r\n        this.ctx.fillStyle = \"#00FF00\";\r\n        this.ctx.fillRect(0, 0, this.width, this.height);\r\n        this.ctx.font = \"30px Arial\";\r\n        this.boids.map(function (boid) { return boid.render(_this.ctx); });\r\n        this.ctx.fillText(fps.toString(), 50, 50);\r\n    };\r\n    return World;\r\n}());\r\nexports[\"default\"] = World;\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/classes/World.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Simulation_1 = __webpack_require__(/*! ./classes/Simulation */ \"./src/classes/Simulation.ts\");\r\nvar World_1 = __webpack_require__(/*! ./classes/World */ \"./src/classes/World.ts\");\r\nvar Invection_1 = __webpack_require__(/*! ./classes/Invection */ \"./src/classes/Invection.ts\");\r\n//SIR\r\n//susceptible\r\n//infectious\r\n//recovered / removed\r\n//vaccinated\r\nconsole.log(\"start\");\r\nvar world = new World_1.default(700, 700, 600);\r\nvar invection = new Invection_1.default(1, 1, 1, 1);\r\nvar simulation = new Simulation_1.default(world, invection);\r\n\n\n//# sourceURL=webpack://glu-simulation/./src/main.ts?");

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