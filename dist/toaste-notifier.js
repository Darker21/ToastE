/*!
 * ToastE-Notifier v1.0.0-alpha4
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['ToastE-Notifier'] = factory());
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

  var _cssUnits = ["cm", "mm", "in", "px", "pt", "pc", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%"];

  var _reCssUnits = new RegExp(_cssUnits.join("|"), "g");
  /**
   * Generic functions which are not dependent on ToastE
  */


  var Utils = /*#__PURE__*/function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
      key: "getElementMaxWidth",
      value:
      /**
       * Calculates the max width of the element
       * @param {HTMLElement} element The element to calculate the width of
       * @param {Boolean} removePaddingMarginBorder Should the margin, padding and border be included in calculation
       * @param {string} psuedoSelector The psuedo-selector for calculation of child element
       * @returns {Number} The outerWidth of the element
       */
      function getElementMaxWidth(element) {
        var removePaddingMarginBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var psuedoSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        // Display block so it can expand fully
        element.style.display = "block";
        var elementWidth = element.scrollWidth;
        element.style.display = ""; // Get numeric value to do math with

        elementWidth = this.parseCssValue(elementWidth); // calculate the box computed elements joined width

        var paddingMarginBorderValue = 0;

        if (removePaddingMarginBorder) {
          var padding = this.getComputedPaddingDimensions(element, psuedoSelector);
          paddingMarginBorderValue += padding.left + padding.right;
          var margin = this.getComputedMarginDimensions(element, psuedoSelector);
          paddingMarginBorderValue += margin.left + margin.right;
          var border = this.getComputedBorderDimensions(element, psuedoSelector);
          paddingMarginBorderValue += border.left + border.right;
        }

        return elementWidth + paddingMarginBorderValue;
      }
    }, {
      key: "getComputedBorderDimensions",
      value: function getComputedBorderDimensions(element) {
        var psuedoSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        if (psuedoSelector && !psuedoSelector.startsWith(":")) {
          psuedoSelector = ":" + psuedoSelector;
        }

        var elementStyle = window.getComputedStyle(element, psuedoSelector || null);
        var borders = elementStyle.borderWidth.split(" ");
        return this.mapElementBoxValuesToObject(borders);
      }
    }, {
      key: "getComputedMarginDimensions",
      value: function getComputedMarginDimensions(element) {
        var psuedoSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        if (psuedoSelector && !psuedoSelector.startsWith(":")) {
          psuedoSelector = ":" + psuedoSelector;
        }

        var elementStyle = window.getComputedStyle(element, psuedoSelector || null);
        var margins = elementStyle.margin.split(" ");
        return this.mapElementBoxValuesToObject(margins);
      }
    }, {
      key: "getComputedPaddingDimensions",
      value: function getComputedPaddingDimensions(element) {
        var psuedoSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        if (psuedoSelector && !psuedoSelector.startsWith(":")) {
          psuedoSelector = ":" + psuedoSelector;
        }

        var elementStyle = window.getComputedStyle(element, psuedoSelector || null);
        var paddings = elementStyle.padding.split(" ");
        return this.mapElementBoxValuesToObject(paddings);
      }
    }, {
      key: "mapElementBoxValuesToObject",
      value: function mapElementBoxValuesToObject(values) {
        var _this = this;

        values.forEach(function (value, index) {
          values[index] = _this.parseCssValue(value);
        });

        if (values.length === 1) {
          while (values.length < 4) {
            values[values.length] = values[0];
          }
        } else if (values.length === 2) {
          values[2] = 0;
          values[3] = 1;
        }

        return {
          top: values[0],
          right: values[1],
          bottom: values[2],
          left: values[3]
        };
      }
    }, {
      key: "parseCssValue",
      value: function parseCssValue(value) {
        var outputValue = value.toString(); // use regex replaceAll for ios compatability

        outputValue = outputValue.replaceAll(_reCssUnits, "");
        return +outputValue || 0;
      }
    }, {
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
        var _this2 = this;

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
            if (_this2.isObject(source[key])) {
              if (!(key in target)) {
                Object.assign(output, _defineProperty({}, key, source[key]));
              } else {
                output[key] = _this2.extend(target[key], source[key]);
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
   * @param {Object} callbackParams - The parameters for the callback param
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
  var _transitionEnd3;
  /**
   * Expand an HTMLElement in a particular direction
   * @param {HTMLElement} element Element to animate the expansion
   * @param {Number} duration The duration of the expand animation (milliseconds)
   * @param {string} direction The direction to expand the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
   * @param {Function} [callback=null] The callback function to run after element has been completely expanded
   */


  function expand(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    direction = direction.toUpperCase() || "UP";
    element.setAttribute("data-direction", direction);
    element.classList.add("expand"); // Call relevant function based on the direction passed

    if (direction === "UP" || direction === "DOWN") {
      expandVertical(element, duration, callback);
    }
  }
  /**
   * Collapse an HTMLElement in a particular direction
   * @param {HTMLElement} element Element to animate with the collapse
   * @param {Number} duration The duration of the collapse animation (milliseconds)
   * @param {string} direction The direction to collapse the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
   * @param {Function} [callback=null] The callback function to run after element has been completely collapsed
   */


  function collapse(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // Set data-direction attribute for element
    direction = direction.toUpperCase();

    if (!element.getAttribute("data-direction")) {
      element.setAttribute("data-direction", direction);
    }

    element.style.setProperty("--transition-duration", duration + "ms"); // Call relevant function based on the direction passed

    if (direction === "UP" || direction === "DOWN") {
      collapseVertical(element, duration, callback);
    }
  }

  function expandVertical(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // set start props
    element.style.height = "0px";
    element.classList.add("is-visible"); // Set the transition end function

    _transitionEnd3 = function _transitionEnd(ev) {
      // Remove the end transition to prevent extra calls on hide
      ev.target.removeEventListener("transitionend", _transitionEnd3);

      if (callback) {
        callback.call();
      }
    }; // Register the transitionend function


    element.addEventListener("transitionend", _transitionEnd3); // Get the end animation styles

    var animationEndStyle = _getExpandedElementDimensions(element); // Apply the styles after timeout to trigger CSS animation


    window.setTimeout(_applyAnimationEndStyles(animationEndStyle), 0);
  }

  function collapseVertical(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    element.style.height = "0px";

    _transitionEnd3 = function _transitionEnd2(ev) {
      ev.target.removeEventListener("transitionend", _transitionEnd3);
      ev.target.classList.remove("is-visible");

      if (callback) {
        callback.call();
      }
    };

    element.addEventListener("transitionend", _transitionEnd3);
  }

  function _applyAnimationEndStyles(target) {
    var styleObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var cssPropertyName in styleObj) {
      target.style[cssPropertyName] = styleObj[cssPropertyName];
    }
  }

  function _getElementInnerHeight(element) {
    return getComputedStyle(element).height;
  }

  function _getElementInnerWidth(element) {
    return getComputedStyle(element).width;
  }

  function _getExpandedElementDimensions(element) {
    var dimensions = {}; // Ensure element is shown for accurate calculations

    element.style.display = "block";
    dimensions.width = _getElementInnerWidth(element);
    dimensions.height = _getElementInnerHeight(element);
    dimensions.borderWidth = _getElementBorderWidth(element);
    dimensions.margin = _getElementMargin(element);
    dimensions.padding = _getElementPadding(element); // Reset inline display

    element.style.display = "";
    return dimensions;
  }

  function _getElementPadding(element) {
    return getComputedStyle(element).padding;
  }

  function _getElementBorderWidth(element) {
    return getComputedStyle(element).borderWidth;
  }

  function _getElementMargin(element) {
    return getComputedStyle(element).margin;
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
   * ToastE Notifier core class responsible for core functionality
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

          this._toastEl.appendChild(toastCloseIcon);
        } // Insert Header


        if (this.options.heading) {
          var toastHeader = document.createElement("h2");
          toastHeader.className = "toaste-heading";
          toastHeader.innerText = this.options.heading;

          this._toastEl.appendChild(toastHeader);
        } // Insert Text


        this.generateToastText(); // Update the Toast styles

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


        if (this.options.icon) {
          this._toastEl.classList.add("toaste-has-icon");

          if (this.options.icon && _defaultIcons.includes(this.options.icon)) {
            this._toastEl.classList.add("toaste-icon-".concat(this.options.icon));
          }
        } // Add custom class


        if (this.options.class) {
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
          this._toastEl.addEventListener("toast.on.shown", that.options.afterShown(that._toastEl));
        }

        if (typeof this.options.beforeHide === "function") {
          this._toastEl.addEventListener("toast.on.hide", that.options.beforeHide(that._toastEl));
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
        loader.style.setProperty("--toaste-transition-duration", transitionTime);

        if (loaderBg) {
          loader.style.setProperty("--toaste-loader-bg", this.options.loaderBg);
        }

        loader.classList.add("toaste-loaded");
      }
    }, {
      key: "animate",
      value: function animate() {
        var that = this;
        var evBeforeShow = new CustomEvent("toaste.on.show");

        var afterShown = function afterShown() {
          var afterShown = new CustomEvent("toast.on.shown");

          that._toastEl.dispatchEvent(afterShown);
        };

        this._toastEl.style.display = 'none';

        this._toastEl.dispatchEvent(evBeforeShow);

        if (this.options.showHideTransition.toLowerCase() === 'fade') {
          fadeIn(this._toastEl, 400, afterShown);
        } else if (this.options.showHideTransition.toLowerCase() === 'slide') {
          expand(this._toastEl, 400, "UP", afterShown);
        } else {
          expand(this._toastEl, 400, "RIGHT", afterShown);
        }

        if (this.canAutoHide()) {
          this.autoCloseTimeout = window.setTimeout(this.closeToast.bind(this, that), +this.options.hideAfter);
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
          this._toastEl.parentElement.removeChild(this._toastEl);

          this._toastEl = null;
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

        var animationEnd = function animationEnd() {
          toastEInstance._toastEl.style.display = "none";
          var evToastHidden = new CustomEvent("toast.on.hidden");

          toastEInstance._toastEl.dispatchEvent(evToastHidden);

          if (toastEInstance.autoCloseTimeout) {
            window.clearTimeout(toastEInstance.autoCloseTimeout);
          }
        }; // Dispatch event to trigger any event listeners


        var evToastHide = new CustomEvent("toast.on.hide");

        toastEInstance._toastEl.dispatchEvent(evToastHide);

        if (toastEInstance.options.showHideTransition === "fade") {
          fadeOut(toastEInstance._toastEl, 400, animationEnd);
        } else if (toastEInstance.options.showHideTransition === "slide") {
          collapse(toastEInstance._toastEl, 400, "DOWN", animationEnd); // fadeOut(toastEInstance._toastEl, 400, animationEnd);
        } else {
          collapse(toastEInstance._toastEl, 400, "LEFT", animationEnd); // fadeOut(toastEInstance._toastEl, 400, animationEnd);
        }
      }
    }]);

    return Core;
  }();

  /**
   * Wrapper module to expose public functionality
   * 
   * @module ToastE-Notifier
   */

  var ToastENotifier = /*#__PURE__*/function () {
    /**
     * Creates and displays a ToastE Notification
     * @param {Options} options The ToastE notification options
     */
    function ToastENotifier(options) {
      _classCallCheck(this, ToastENotifier);

      this.toastE = new Core();
      this.toastE.init(options);
    }
    /**
     * Reset a specified option or a set of options
     * @param {string|string[]} option The name of the option to reset back to default or an options object containing all attributes to reset
     */


    _createClass(ToastENotifier, [{
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

    return ToastENotifier;
  }();

  if (typeof window !== 'undefined') {
    window.ToastENotifier = ToastENotifier;
  }

  return ToastENotifier;

})));
