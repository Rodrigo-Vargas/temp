/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/polyfills.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/polyfills.js":
/*!*****************************!*\
  !*** ./src/js/polyfills.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */

/* This file is meant as a standalone workflow for
- testing support for link[rel=preload]
- enabling async CSS loading in browsers that do not support rel=preload
- applying rel preload css once loaded, whether supported or not.
*/
(function (w) {
  "use strict"; // rel=preload support test

  if (!w.loadCSS) {
    w.loadCSS = function () {};
  } // define on the loadCSS obj


  var rp = loadCSS.relpreload = {}; // rel=preload feature support test
  // runs once and returns a function for compat purposes

  rp.support = function () {
    var ret;

    try {
      ret = w.document.createElement("link").relList.supports("preload");
    } catch (e) {
      ret = false;
    }

    return function () {
      return ret;
    };
  }(); // if preload isn't supported, get an asynchronous load by using a non-matching media attribute
  // then change that media back to its intended value on load


  rp.bindMediaToggle = function (link) {
    // remember existing media attr for ultimate state, or default to 'all'
    var finalMedia = link.media || "all";

    function enableStylesheet() {
      // unbind listeners
      if (link.addEventListener) {
        link.removeEventListener("load", enableStylesheet);
      } else if (link.attachEvent) {
        link.detachEvent("onload", enableStylesheet);
      }

      link.setAttribute("onload", null);
      link.media = finalMedia;
    } // bind load handlers to enable media


    if (link.addEventListener) {
      link.addEventListener("load", enableStylesheet);
    } else if (link.attachEvent) {
      link.attachEvent("onload", enableStylesheet);
    } // Set rel and non-applicable media type to start an async request
    // note: timeout allows this to happen async to let rendering continue in IE


    setTimeout(function () {
      link.rel = "stylesheet";
      link.media = "only x";
    }); // also enable media after 3 seconds,
    // which will catch very old browsers (android 2.x, old firefox) that don't support onload on link

    setTimeout(enableStylesheet, 3000);
  }; // loop through link elements in DOM


  rp.poly = function () {
    // double check this to prevent external calls from running
    if (rp.support()) {
      return;
    }

    var links = w.document.getElementsByTagName("link");

    for (var i = 0; i < links.length; i++) {
      var link = links[i]; // qualify links to those with rel=preload and as=style attrs

      if (link.rel === "preload" && link.getAttribute("as") === "style" && !link.getAttribute("data-loadcss")) {
        // prevent rerunning on link
        link.setAttribute("data-loadcss", true); // bind listeners to toggle media back

        rp.bindMediaToggle(link);
      }
    }
  }; // if unsupported, run the polyfill


  if (!rp.support()) {
    // run once at least
    rp.poly(); // rerun poly on an interval until onload

    var run = w.setInterval(rp.poly, 500);

    if (w.addEventListener) {
      w.addEventListener("load", function () {
        rp.poly();
        w.clearInterval(run);
      });
    } else if (w.attachEvent) {
      w.attachEvent("onload", function () {
        rp.poly();
        w.clearInterval(run);
      });
    }
  } // commonjs


  if (true) {
    exports.loadCSS = loadCSS;
  } else {}
})(typeof global !== "undefined" ? global : this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=polyfills.8b79ec47e6caf1367479.js.map