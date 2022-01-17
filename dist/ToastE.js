/*!
 * ToastE v1.0.0
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ToastE = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Generic functions which are not dependent on ToastE
   */
  var Utils = /*#__PURE__*/function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
      key: "bind",
      value: function bind(fn, me) {
        return function () {
          return fn.apply(me, arguments);
        };
      }
    }, {
      key: "isObject",
      value: function isObject(item) {
        return item && _typeof(item) === 'object' && !Array.isArray(item) && item != null;
      }
      /**
       * Merges two objects properties
       * @param {Object} target The target object to receive the source values
       * @param {Object} source The source object with the desired values to merge into the target
       * @returns {Object} An object with merged values from target and source
       */

    }, {
      key: "extend",
      value: function extend(target, source) {
        var _this = this;

        // credit: http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7#answer-34749873
        if (typeof Object.assign !== 'function') {

          (function () {
            Object.assign = function (target) {

              if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
              }

              var output = Object(target);

              for (var index = 1; index < arguments.length; index++) {
                var _source = arguments[index];

                if (_source !== undefined && _source !== null) {
                  for (var nextKey in _source) {
                    if (_source.hasOwnProperty(nextKey)) {
                      output[nextKey] = _source[nextKey];
                    }
                  }
                }
              }

              return output;
            };
          })();
        }

        var output = Object.assign({}, target);

        if (this.isObject(target) && this.isObject(source)) {
          Object.keys(source).forEach(function (key) {
            if (_this.isObject(source[key])) {
              if (!(key in target)) {
                Object.assign(output, _defineProperty({}, key, source[key]));
              } else {
                output[key] = _this.extend(target[key], source[key]);
              }
            } else {
              Object.assign(output, _defineProperty({}, key, source[key]));
            }
          });
        }

        return output;
      }
    }]);

    return Utils;
  }();

  var _last;
  /**
   * Initialize the fade animation properties
   * @param {HTMLElement} element The element the fade animation will be applied to
   * @param {Number|string} startOpacity The starting opacity of the target element
   * @private
   */


  function fadeInit(element, startOpacity) {
    element.style.display = '';
    element.style.opacity = startOpacity;
    _last = +new Date();
  }
  /**
   * Fade an HTML Element into view
   * @param {HTMLElement} element - The element to fade in
   * @param {Number} duration - The duration of the fade animation
   * @param {Function} callback - The callback function after the animation has completed
   * @see {@link https://codepen.io/jorgemaiden/pen/xoRKWN}
   */


  function fadeIn(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    fadeInit(element, 0);

    var tick = function tick() {
      element.style.opacity = +element.style.opacity + (new Date() - _last) / duration;
      _last = +new Date();

      if (+element.style.opacity < 1) {
        window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
      } else {
        if (callback) {
          callback.call();
        }
      }
    };

    tick();
  }
  /**
   * Fade an HTML Element out of view
   * @param {HTMLElement} element - The element to fade out
   * @param {Number} duration - The duration of the fade animation
   * @param {Function} callback - The callback function called after the animation has completed
   */


  function fadeOut(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    fadeInit(element, 1);

    var tick = function tick() {
      element.style.opacity = +element.style.opacity - (new Date() - _last) / duration;
      _last = +new Date();

      if (+element.style.opacity > 0) {
        window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
      } else {
        element.hidden = true;

        if (callback) {
          callback.call();
        }
      }
    };

    tick();
  }

  // Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/
  /**
   * Expand an HTMLElement in a particular direction
   * @param {HTMLElement} element Element to animate the expansion
   * @param {Number} duration The duration of the expand animation (milliseconds)
   * @param {string} direction The direction to expand the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
   * @param {Function} [callback=null] The callback function to run after element has been completely expanded
   */

  function expand(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    direction = direction.toUpperCase() || "UP"; // Call relevant function based on the direction passed

    if (direction === "UP" || direction === "DOWN") {
      expandVertical(element, duration, direction, callback);
    }
  }

  function expandVertical(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    element.style.display = '';
    element.style.height = 0;
    var elementMaxHeight = getElementHeight(element);
    var last = +new Date();

    var tick = function tick() {
      element.style.height = +element.style.height + (new Date() - last) / duration;
      last = +new Date();

      if (+element.style.height < elementMaxHeight) {
        window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
      } else {
        element.style.height = 'auto';

        if (callback) {
          callback.call();
        }
      }
    };

    tick();
  }

  function parsePixelValue(value) {
    var output = value;
    output = output.replace("px", "");
    return +output;
  }

  function getElementHeight(element) {
    element.style.display = "block";
    var elementHeight = element.scrollHeight;
    element.style.display = 'none';
    return parsePixelValue(elementHeight);
  }

  var Options = /*#__PURE__*/_createClass(function Options() {
    _classCallCheck(this, Options);

    this.text = "";
    this.heading = "";
    this.showHideTransition = "fade";
    this.allowToastClose = true;
    this.hideAfter = 3000;
    this.loader = true;
    this.loaderBg = "#9EC600";
    this.stack = 5;
    this.position = "bottom-left";
    this.bgColor = false;
    this.textColor = false;
    this.textAlign = "left";
    this.icon = false;

    this.beforeShow = function () {};

    this.afterShown = function () {};

    this.beforeHide = function () {};

    this.afterHide = function () {};

    this.onClick = function () {};
  });

  var _positionClasses = ["bottom-left", "bottom-right", "top-right", "top-left", "bottom-center", "top-center", "mid-center"];
  var _defaultIcons = ["success", "error", "info", "warning"];
  /**
   * ToastE core class responsible for core functionality
   * 
   * @module Core
   * @private
   */

  var Core = /*#__PURE__*/function () {
    function Core() {
      _classCallCheck(this, Core);
    }

    _createClass(Core, [{
      key: "init",
      value:
      /**
       * The initializer method for the ToastE notification library
       * @param {string | string[] | Options()} [opts=Options] The Options object or the toast notification text
       */
      function init() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Options();
        console.log(opts); // console.log(new Options());

        this.prepareOptions(opts, new Options());
        this.process();
      }
      /**
       * Prepares the Options for the Toast Notification before handling any functionality
       * @param {Options | string | string[]} options The new Options object or toast notifications desired text
       * @param {Options} optionsToExtend The old Options object to merge with
       */

    }, {
      key: "prepareOptions",
      value: function prepareOptions(options, optionsToExtend) {
        var _options = {};
        console.log(optionsToExtend);

        if (typeof options === "string" || options instanceof Array) {
          _options.text = options;
        } else {
          _options = options;
        } // Merge the Options objects


        this.options = Utils.extend(optionsToExtend, _options);
      }
      /**
       * Processes the toast notification
       */

    }, {
      key: "process",
      value: function process() {
        this.setup();
        this.addToDom();
        this.position();
        this.bindToast();
        this.animate();
      }
      /**
       * Setup ToastE element
       */

    }, {
      key: "setup",
      value: function setup() {
        var _defaultToastContent = document.createElement("div");

        _defaultToastContent.className = "toaste-single";
        this._toastEl = this._toastEl || _defaultToastContent; // The Loader

        var toastLoader = document.createElement("span");
        toastLoader.className = "toaste-loader";

        this._toastEl.appendChild(toastLoader); // Insert Close Icon


        if (this.options.allowToastClose) {
          var toastCloseIcon = document.createElement("span");
          toastCloseIcon.className = "toaste-close";
          toastCloseIcon.innerText = "&times;";

          this._toastEl.appendChild(toastCloseIcon);
        } // Insert Header


        if (this.options.heading) {
          var toastHeader = document.createElement("h2");
          toastHeader.className = "toaste-heading";
          toastHeader.innerText = this.options.heading;

          this._toastEl.appendChild(toastHeader);
        } // Insert Text


        this.generateToastText();
        console.log(this); // Update the Toast styles

        this.setToastElementStyles();
      }
      /**
       * Generates and appends the text element(s) to the toast notification
       */

    }, {
      key: "generateToastText",
      value: function generateToastText() {
        // if array: create an unordered list element of text
        // else: create span element of text
        if (this.options.text instanceof Array) {
          var toastLines = document.createElement("ul");
          toastLines.className = "toaste-ul";

          for (var i = 0; i < this.options.text.length; i++) {
            var textElement = document.createElement("li");
            textElement.className = "toaste-li";
            textElement.id = "toaste-item-".concat(i);
            textElement.innerText = this.options.text[i];
            toastLines.appendChild(textElement);
          }

          this._toastEl.appendChild(toastLines);
        } else {
          var _textElement = document.createElement("span");

          _textElement.innerText = this.options.text;

          this._toastEl.appendChild(_textElement);
        }
      }
      /**
       * Sets the Toast Notification element styles
       */

    }, {
      key: "setToastElementStyles",
      value: function setToastElementStyles() {
        // Set BG Colour
        if (this.options.bgColor !== false) {
          this._toastEl.style.backgroundColor = this.options.bgColor;
        } // Set Text Color


        if (this.options.textColor !== false) {
          this._toastEl.style.color = this.options.textColor;
        } // Set Text Align


        if (this.options.textAlign) {
          this._toastEl.style.textAlign = this.options.textAlign;
        } // Add Icon


        if (this.options.icon !== false) {
          this._toastEl.classList.add("toaste-has-icon");

          console.log(this.options);

          if (_defaultIcons.findIndex(this.options.icon) > -1) {
            this._toastEl.classList.add("toaste-icon-".concat(this.options.icon));
          }
        } // Add custom class


        if (this.options.class !== false) {
          this._toastEl.classList.add(this.options.class);
        }
      }
      /**
       * Set the position of the toast notification
       */

    }, {
      key: "position",
      value: function position() {
        if (typeof this.options.position === "string" && _positionClasses.indexOf(this.options.position) > -1) {
          var containerRect = this._container.getBoundingClientRect(); // Set the position class or calculate for central values


          switch (this.options.position) {
            case "bottom-center":
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.bottom = "20px";
              break;

            case "top-center":
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.top = "20px";
              break;

            case "mid-center":
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.bottom = "".concat(window.outerHeight / 2 - containerRect.height / 2, "px");
              break;

            default:
              this._container.classList.add(this.options.position);

              break;
          }
        } else if (_typeof(this.options.position) === "object") {
          // Set defaults to 'auto'
          this._container.style.top = "auto";
          this._container.style.right = "auto";
          this._container.style.bottom = "auto";
          this._container.style.left = "auto"; // Each property will be set according to the options.position attributes 

          for (var position in this.options.position) {
            if (isNaN(Number.parseFloat(this.options.position[position]))) {
              this._container.style.setProperty(position, this.options.position[position]);
            } else {
              this._container.style.setProperty(position, this.options.position[position] + "px");
            }
          }
        } else {
          // Default to bottom-left
          this._container.classList.add("bottom-left");
        }
      }
      /**
       * Binds the events passed in the {@link Options} object to 
       */

    }, {
      key: "bindToast",
      value: function bindToast() {
        var that = this; // Register the event handler to hide/remove the loader

        this._toastEl.addEventListener("toast.on.shown", function () {
          that.processLoader();
        }); // Attach the close event for the close button


        this._toastEl.querySelector("span.toaste-close").addEventListener("click", that.closeToast.bind(that, that)); // Register the available event handlers passed in through options


        if (typeof this.options.beforeShow === "function") {
          this._toastEl.addEventListener("toast.on.show", that.options.beforeShow(that._toastEl));
        }

        if (typeof this.options.afterShown === "function") {
          this._toastEl.addEventListener("toast.on.show", that.options.afterShown(that._toastEl));
        }

        if (typeof this.options.beforeHide === "function") {
          this._toastEl.addEventListener("toast.on.hide", that.options.afterShown(that._toastEl));
        }

        if (typeof this.options.afterHidden === "function") {
          this._toastEl.addEventListener("toast.on.hidden", that.options.afterHidden(that._toastEl));
        }

        if (typeof this.options.onClick === "function") {
          this._toastEl.addEventListener("click", that.options.onClick(that._toastEl));
        }
      }
    }, {
      key: "addToDom",
      value: function addToDom() {
        var _container = document.querySelector(".toaste-wrap");

        var toastsRemoving;

        if (!_container) {
          _container = document.createElement("div");
          _container.className = "toaste-wrap";

          _container.setAttribute("role", "alert");

          _container.setAttribute("aria-live", "polite");

          document.body.appendChild(_container);
        } else if (!this.options.stack || isNaN(parseInt(this.options.stack, 10))) {
          // remove all child elements from container
          for (var ele in _container.children) {
            _container.removeChild(ele);
          }
        }

        toastsRemoving = _container.querySelectorAll(".toaste-single[hidden]");

        if (toastsRemoving) {
          toastsRemoving.forEach(function (toast) {
            _container.removeChild(toast);
          });
        }

        _container.appendChild(this._toastEl); // Remove old toasts if the number of toasts
        // is greater than the allowed stack


        if (this.options.stack && !isNaN(parseInt(this.options.stack), 10)) {
          var previousToastCount = _container.querySelectorAll(".toaste-single").length;

          var extraToastCount = previousToastCount - this.options.stack; // Remove oldest toasts that overflow

          if (extraToastCount > 0) {
            toastsRemoving = Array.from(_container.querySelectorAll(".toaste-single").values()).slice(0, extraToastCount);

            var _iterator = _createForOfIteratorHelper(toastsRemoving),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var toast = _step.value;

                _container.removeChild(toast);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }

        this._container = _container;
      }
    }, {
      key: "canAutoHide",
      value: function canAutoHide() {
        return this.options.hideAfter !== false && !isNaN(parseInt(this.options.hideAfter, 10));
      }
    }, {
      key: "processLoader",
      value: function processLoader() {
        // Show the loader only, if auto-hide is on and loader is demanded
        if (!this.canAutoHide() || this.options.loader === false) {
          return false;
        }

        var loader = this._toastEl.querySelector(".toaste-loader"); // 400 is the default time
        // Divide by 1000 for milliseconds to seconds


        var transitionTime = (this.options.hideAfter - 400) / 1000 + "s";
        var loaderBg = this.options.loaderBg || '';
        loader.style.setProperty("--toaste-transition-duration", transitionTime + "s");

        if (loaderBg) {
          loader.style.setProperty("--toaste-loader-bg", this.options.loaderBg);
        }
      }
    }, {
      key: "animate",
      value: function animate() {
        var that = this;
        var evBeforeShow = new Event("toaste.on.show");
        this._toastEl.style.display = 'none';

        this._toastEl.dispatchEvent(evBeforeShow);

        if (this.options.showHideTransition.toLowerCase() === 'fade') {
          fadeIn(this._toastEl, 400, function () {
            var afterShown = new Event("toaste.on.shown");

            that._toastEl.dispatchEvent(afterShown);
          });
        } else if (this.options.showHideTransition.toLowerCase() === 'slide') {
          expand(this._toastEl, 400, "UP", function () {
            var afterShown = new Event("toaste.on.shown");

            that._toastEl.dispatchEvent(afterShown);
          });
        } else {
          expand(this._toastEl, 400, "RIGHT", function () {
            var afterShown = new Event("toaste.on.shown");

            that._toastEl.dispatchEvent(afterShown);
          });
        }

        if (this.canAutoHide()) {
          window.setTimeout(this.closeToast.bind(this, that), +this.options.hideAfter);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (all) {
          document.querySelectorAll('.toaste-wrap').forEach(function (el) {
            return el.remove();
          });
        } else {
          this._toastEl.remove();
        }
      }
    }, {
      key: "update",
      value: function update(optionsUpdated) {
        this.prepareOptions(optionsUpdated, this.options);
        this.setup();
        this.bindToast();
      }
      /**
       * Closes the specified ToastE element
       * @param {Core} toastEInstance The ToastE object instance to close
       * @param {Event} event The event that triggered the close method
       */

    }, {
      key: "closeToast",
      value: function closeToast(toastEInstance, event) {
        if (event) {
          event.preventDefault();
        }

        var evToastHide = new Event("toast.on.hide");

        if (toastEInstance.options.showHideTransition === "fade") {
          // Dispatch event to trigger any event listeners
          toastEInstance._toastEl.dispatchEvent(evToastHide);

          fadeOut(toastEInstance._toastEl, 400, function () {
            var evToastHidden = new Event("toast.on.hidden");

            toastEInstance._toastEl.dispatchEvent(evToastHidden);
          });
        } else if (toastEInstance.options.showHideTransition === "slide") {
          // Dispatch event to trigger any event listeners
          toastEInstance._toastEl.dispatchEvent(evToastHide);

          slideUp(toastEInstance._toastEl, 400, function () {
            var evToastHidden = new Event("toast.on.hidden");

            toastEInstance._toastEl.dispatchEvent(evToastHidden);
          });
        } else {
          // Dispatch event to trigger any event listeners
          toastEInstance._toastEl.dispatchEvent(evToastHide);

          fadeOut(toastEInstance._toastEl, 400, function () {
            var evToastHidden = new Event("toast.on.hidden");

            toastEInstance._toastEl.dispatchEvent(evToastHidden);
          });
        }
      }
    }]);

    return Core;
  }();

  /**
   * Wrapper module to expose public functionality
   * 
   * @module ToastE
   */

  var ToastE = /*#__PURE__*/function () {
    /**
     * Creates and displays a ToastE Notification
     * @param {Options} options The ToastE notification options
     */
    function ToastE(options) {
      _classCallCheck(this, ToastE);

      this.toastE = new Core();
      this.toastE.init(options);
    }
    /**
     * Reset a specified option or a set of options
     * @param {string|string[]} option The name of the option to reset back to default or an options object containing all attributes to reset
     */


    _createClass(ToastE, [{
      key: "reset",
      value: function reset(option) {
        this.toastE.reset(option);
      }
      /**
       * Update a ToastE notification's attributes
       * @param {Options} newOptions The new options for the ToastE Notification
       */

    }, {
      key: "update",
      value: function update(newOptions) {
        this.toastE.update(newOptions);
      }
      /**
       * Close a ToastE notification
       */

    }, {
      key: "close",
      value: function close() {
        this.toastE.close();
      }
    }]);

    return ToastE;
  }();

  return ToastE;

})));
