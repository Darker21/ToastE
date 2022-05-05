/*!
 * ToastE-Notifier v1.0.0-alpha4
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
      value:
      /**
         * Create a new function that binds the current object to the
         * first parameter of the original function
         * @param {Function} fn - The function to bind.
         * @param {any} me - the object that the function is bound to.
         * @return {Function} A function that is bound to the object.
         */
      function bind(fn, me) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        return function () {
          return fn.apply(me, args);
        };
      }
      /**
         * Returns true if the item is an object and not an array and not null.
         * @param {any} item - The item to check.
         * @return {boolean} The `isObject` function returns a boolean value.
         */

    }, {
      key: "isObject",
      value: function isObject(item) {
        return item && _typeof(item) === 'object' && !Array.isArray(item) && item != null;
      }
      /**
         * Get all the possible DOM events that can be listened to
         * @return {string[]} An array of all the possible DOM events.
         */

    }, {
      key: "_listAllPossibleDomEvents",
      get: function get() {
        // credit: https://stackoverflow.com/a/18751951
        return _toConsumableArray(new Set([].concat(_toConsumableArray(Object.getOwnPropertyNames(document)), _toConsumableArray(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))), _toConsumableArray(Object.getOwnPropertyNames(Object.getPrototypeOf(window)))).filter(function (k) {
          return k.startsWith('on') && (document[k] == null || typeof document[k] == 'function');
        })));
      }
    }, {
      key: "getCalculatedStyle",
      value: function getCalculatedStyle(element, cssProp) {
        if (typeof cssProp !== 'string' || element instanceof HTMLElement === false) {
          return null;
        }

        var elementStyles = window.getComputedStyle(element);
        return elementStyles.getPropertyValue(cssProp);
      }
      /**
         * Dispatch an event on an element.
         * @param {HTMLElement} element - The element that will be
         * used to dispatch the event.
         * @param {string} eventName - The name of the event to dispatch.
         */

    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(element, eventName) {
        var eventDispatching;
        eventName = eventName.toLowerCase();

        if (Utils._listAllPossibleDomEvents.includes(eventName)) {
          eventDispatching = new Event(eventName);
          element.dispatchEvent(eventDispatching);
        } else {
          eventDispatching = new CustomEvent(eventName);
          element.dispatchEvent(eventDispatching);
        }
      }
      /**
         * Merges two objects properties
         * @param {Object} target The target object to receive the source values
         * @param {Object} source The source object with the desired values
         * to merge into the target
         * @return {Object} An object with merged values from target and source
         */

    }, {
      key: "extend",
      value: function extend(target, source) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        // credit: http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7#answer-34749873
        if (typeof Object.assign !== 'function') {
          (function () {
            Object.assign = function (target) {

              if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
              }

              var output = Object(target);

              for (var index = 1; index < arguments.length; index++) {
                var _source = args[index];

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

        if (Utils.isObject(target) && Utils.isObject(source)) {
          Object.keys(source).forEach(function (key) {
            if (Utils.isObject(source[key])) {
              if (!(key in target)) {
                Object.assign(output, _defineProperty({}, key, source[key]));
              } else {
                output[key] = Utils.extend(target[key], source[key]);
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

  /**
   * The events that can be listened for
   */
  var ToasteEvents = {
    onShown: 'toaste.on.shown',
    onHidden: 'toaste.on.hidden',
    onHide: 'toaste.on.hide',
    onShow: 'toaste.on.show'
  };
  /**
   * The built in positional classes
   */

  var PositionClasses = ['bottom-left', 'bottom-right', 'top-right', 'top-left', 'bottom-center', 'top-center', 'mid-center'];
  /**
   * The built in icons
   */

  var DefaultIcons = ['success', 'error', 'info', 'warning'];
  var EasingMode = {
    'LINEAR': 'LINEAR',
    'EASE_IN': 'EASE_IN'
  };

  var AnimationOptions = /*#__PURE__*/_createClass(function AnimationOptions() {
    _classCallCheck(this, AnimationOptions);

    this.endStyle = {};
    this.startStyle = {};
    this.currentStyle = {};
    this.duration = 400;
    this.frameRate = 16;
    this.easingMode = EasingMode.LINEAR, this.classes = {};
    this.currentClasses = [];
    this.endClasses = [];
    this.startClasses = [];
    this.onAnimationEnd = undefined;
    this.onAnimationStart = undefined;
    this.onAnimationTick = undefined;
  });

  /**
   * The Animation class is a base class for all animations.
  */

  var Animation = /*#__PURE__*/function () {
    /**
       * @param {HTMLElement} element element Animating
       */
    function Animation(element) {
      _classCallCheck(this, Animation);

      this.target = element;
      this.options = new AnimationOptions();
      this._tickTimeout = null;
      this._reverseAnimation = false;
    }
    /**
       * @return {CSSStyleDeclaration} current styles on `this.target`
       */


    _createClass(Animation, [{
      key: "currentStyle",
      get: function get() {
        return this.target.style;
      }
    }, {
      key: "play",
      value: function play() {
        var _this$options$onAnima;

        this.reset();
        (_this$options$onAnima = this.options.onAnimationStart) === null || _this$options$onAnima === void 0 ? void 0 : _this$options$onAnima.call();
        this.resume();
      }
    }, {
      key: "stop",
      value: function stop() {
        window.clearTimeout(this._tickTimeout);

        this._applyClasses(this.target, this.options.endClasses);

        this._applyStyles(this.target, this.options.endStyle);
      }
    }, {
      key: "reset",
      value: function reset() {
        this._applyStyles(this.target, this.options.startStyle);

        this._applyClasses(this.target, this.options.startClasses);
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._tickTimeout) {
          window.clearTimeout(this._tickTimeout);
        }
      }
    }, {
      key: "resume",
      value: function resume() {
        this._last = +new Date();

        this._tick();
      }
    }, {
      key: "reverse",
      value: function reverse() {
        this._swapStartEndElementProps();

        this.options.reverse = true;
        this.reset();
        this.resume();
      }
    }, {
      key: "_end",
      value: function _end() {
        var _this$options$onAnima2;

        this._applyStyles(this.target, this.options.endStyle);

        this._applyClasses(this.target, this.options.endClasses);

        (_this$options$onAnima2 = this.options.onAnimationEnd) === null || _this$options$onAnima2 === void 0 ? void 0 : _this$options$onAnima2.call();
      }
    }, {
      key: "_tick",
      value: function _tick() {
        var _this$options$onAnima3;

        (_this$options$onAnima3 = this.options.onAnimationTick) === null || _this$options$onAnima3 === void 0 ? void 0 : _this$options$onAnima3.call();
        console.log(this.currentStyle.height);
      }
      /**
         * It applies the styles in the styleObj to the Element.
         * @param {HTMLElement} element - The Element to apply the styles to.
         * @param {Object} styleObj - The object containing the styles to apply.
         */

    }, {
      key: "_applyStyles",
      value: function _applyStyles(element, styleObj) {
        for (var cssPropertyName in styleObj) {
          if ({}.hasOwnProperty.call(styleObj, cssPropertyName)) {
            element.style[cssPropertyName] = styleObj[cssPropertyName];
          }
        }
      }
      /**
         * Apply the classes in the classList to the Element.
         * @param {HTMLElement} element - The Element to apply the classes to.
         * @param {Array<string>} classList - A list of
         * class names to be added to the Element.
         */

    }, {
      key: "_applyClasses",
      value: function _applyClasses(element, classList) {
        for (var className in classList) {
          if (!element.classList.contains(className)) {
            element.classList.add(className);
          }
        }
      }
    }, {
      key: "_swapStartEndElementProps",
      value: function _swapStartEndElementProps() {
        var _this$options = this.options,
            startStyle = _this$options.startStyle,
            endStyle = _this$options.endStyle,
            startClasses = _this$options.startClasses,
            endClasses = _this$options.endClasses;
        this.options.startClasses = endClasses;
        this.options.startStyle = endStyle;
        this.options.endClasses = startClasses;
        this.options.endStyle = startStyle;
      }
    }, {
      key: "_calculatePropValue",
      value: function _calculatePropValue(cssPropertyName) {
        var currentProp = this._parseCssValue(this.currentStyle[cssPropertyName]);

        var denominator = this.options.startStyle[cssPropertyName].value > this.options.endStyle[cssPropertyName].value ? Math.abs(this.options.duration) * -1 : Math.abs(this.options.duration);
        this.target.style[cssPropertyName] = currentProp.value + (new Date() - this._last) / denominator + currentProp.units;
      }
      /**
         * It takes a string like "10px" and
         * returns an object like {value: 10, units: "px"}
         * @param {string} propValue - The value of the
         * CSS property you want to parse.
         * @return {object} An object with two properties: value and units.
         */

    }, {
      key: "_parseCssValue",
      value: function _parseCssValue(propValue) {
        return {
          value: +propValue.replace(/[^0-9.]+$/g, ''),
          units: propValue.replace(/[0-9.]/g, '')
        };
      }
    }]);

    return Animation;
  }();

  /* Creates a new instance of the Fade Animation class */

  var FadeAnimation = /*#__PURE__*/function (_Animation) {
    _inherits(FadeAnimation, _Animation);

    var _super = _createSuper(FadeAnimation);

    /**
       * Creates a new instance of the Animation class
       * @param {HTMLElement} element - The element to animate.
       * @param {AnimationOptions|Object} animationOptions -
       * an object containing the options for the animation.
       */
    function FadeAnimation(element, animationOptions) {
      var _this;

      _classCallCheck(this, FadeAnimation);

      _this = _super.call(this, element);
      _this.options.startStyle = {
        opacity: 0
      };
      _this.options.endStyle = {
        opacity: 1
      };
      _this.options = Utils.extend(_this.options, animationOptions);
      return _this;
    }
    /**
       * Play the animation
       */


    _createClass(FadeAnimation, [{
      key: "play",
      value: function play() {
        this.target.style.display = this.target.style.display !== 'none' || ''; // if the last tick was less than 0.5s, resume

        var resume = +new Date() - (this._last || 0) < 500;

        if (resume) {
          this.resume();
        } else {
          this.reset();
          this.resume();
        }
      }
      /**
         * Resume the animation
         */

    }, {
      key: "resume",
      value: function resume() {
        this._last = +new Date();

        this._tick();
      }
      /**
         * Calculate the new opacity and whether it has reached the target.
         * If the target opacity has not been reached:
         * call the _tick function again.
         *
         * If the target opacity has been reached: call the onAnimationEnd function
         */

    }, {
      key: "_tick",
      value: function _tick() {
        var _this$options$onAnima;

        var animationFinish; // Call base method

        _get(_getPrototypeOf(FadeAnimation.prototype), "_tick", this).call(this); // Calculate Opacity


        var denominator = this.options.startStyle.opacity > this.options.endStyle.opacity ? Math.abs(this.options.duration) * -1 : Math.abs(this.options.duration);
        this.target.style.opacity = +this.target.style.opacity + (new Date() - this._last) / denominator; // Update _last to now

        this._last = +new Date(); // Calculate new opacity and whether it has reached the target

        if (this.options.startStyle.opacity > this.options.endStyle.opacity) {
          animationFinish = +this.target.style.opacity <= +this.options.endStyle.opacity;
        } else {
          animationFinish = +this.target.style.opacity >= +this.options.endStyle.opacity;
        } // Check if the target opacity has been met


        animationFinish ? (_this$options$onAnima = this.options.onAnimationEnd) === null || _this$options$onAnima === void 0 ? void 0 : _this$options$onAnima.call() : this._tickTimeout = setTimeout(Utils.bind(this._tick, this), this.options.frameRate);
      }
      /**
         * Create a new instance of the FadeAnimation class
         * @param {HTMLElement} element - The element to be animated.
         * @param {AnimationOptions|Object} animationOptions -
         * An object containing the animation properties.
         * @return {FadeAnimation} Instance of a fade animation.
         */

    }], [{
      key: "fadeElement",
      value: function fadeElement(element, animationOptions) {
        return new FadeAnimation(element, animationOptions);
      }
    }]);

    return FadeAnimation;
  }(Animation);

  // Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/
  var _transitionEnd3; // const _collapsedElementDimensions = {
  //   width: 0,
  //   height: 0,
  //   padding: 0,
  //   margin: 0,
  //   borderWidth: 0,
  // };
  // const _expandState = {};
  // /**
  //  * ? Maybe make this a toggle function?
  //  * ? Maybe make this a base class method with overridable 'animate' function
  //  * Initializes the element state for the expansion/collapsing animation
  //  * @param {HTMLElement} element Element to expand
  //  */
  // function _expandInit(element) {
  //   if (element.classList.contains('is-visible')) {
  //     _expandState.startStyle = _getExpandedElementDimensions(element);
  //     _expandState.endStyle = _collapsedElementDimensions;
  //   } else {
  //     _expandState.startStyle = _collapsedElementDimensions;
  //     _expandState.endStyle = _getExpandedElementDimensions(element);
  //   }
  // }

  /**
   * Expand an HTMLElement in a particular direction
   * @param {HTMLElement} element Element to animate the expansion
   * @param {Number} duration The duration of the expand animation (milliseconds)
   * @param {string} direction The direction to expand the object
   * (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
   * @param {Function} [callback=null] The callback function to run
   * after element has been completely expanded
   */


  function expand(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    direction = direction.toUpperCase() || 'UP';
    element.setAttribute('data-direction', direction);
    element.classList.add('expand'); // Call relevant function based on the direction passed

    if (direction === 'UP' || direction === 'DOWN') {
      expandVertical(element, duration, callback);
    }
  }
  /**
   * Collapse an HTMLElement in a particular direction
   * @param {HTMLElement} element Element to animate with the collapse
   * @param {Number} duration The duration of the collapse animation (ms)
   * @param {string} direction The direction to collapse the object
   * (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
   * @param {Function} [callback=null] The callback function to run after
   * element has been completely collapsed
   */


  function collapse(element, duration, direction) {
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // Set data-direction attribute for element
    direction = direction.toUpperCase();

    if (!element.getAttribute('data-direction')) {
      element.setAttribute('data-direction', direction);
    }

    element.style.setProperty('--transition-duration', duration + 'ms'); // Call relevant function based on the direction passed

    if (direction === 'UP' || direction === 'DOWN') {
      collapseVertical(element, duration, callback);
    }
  }
  /**
   * Expand an element vertically
   * @param {HTMLElement} element - The element to expand.
   * @param {number} duration - The duration of the animation in milliseconds.
   * @param {function} [callback=null] - A function to be called
   * after the animation is complete.
   */


  function expandVertical(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // set start props
    element.style.height = '0px';
    element.classList.add('is-visible'); // Set the transition end function

    _transitionEnd3 = function _transitionEnd(ev) {
      // Remove the end transition to prevent extra calls on hide
      ev.target.removeEventListener('transitionend', _transitionEnd3);

      if (callback) {
        callback.call();
      }
    }; // Register the transitionend function


    element.addEventListener('transitionend', _transitionEnd3); // Get the end animation styles

    var animationEndStyle = _getExpandedElementDimensions(element); // Apply the styles after timeout to trigger CSS animation


    window.setTimeout(_applyAnimationEndStyles, 0, animationEndStyle);
  }

  function collapseVertical(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    element.style.height = '0px';

    _transitionEnd3 = function _transitionEnd2(ev) {
      ev.target.removeEventListener('transitionend', _transitionEnd3);
      ev.target.classList.remove('is-visible');

      if (callback) {
        callback.call();
      }
    };

    element.addEventListener('transitionend', _transitionEnd3);
  }

  function _applyAnimationEndStyles(target) {
    var styleObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var cssPropertyName in styleObj) {
      if (!{}.hasOwnProperty.call(styleObj, cssPropertyName)) {
        target.style[cssPropertyName] = styleObj[cssPropertyName];
      }
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

    element.style.display = 'block';
    dimensions.width = _getElementInnerWidth(element);
    dimensions.height = _getElementInnerHeight(element);
    dimensions.borderWidth = _getElementBorderWidth(element);
    dimensions.margin = _getElementMargin(element);
    dimensions.padding = _getElementPadding(element); // Reset inline display

    element.style.display = '';
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

    this.text = '';
    this.heading = '';
    this.showHideTransition = 'fade';
    this.allowToastClose = true;
    this.hideAfter = 3000;
    this.loader = true;
    this.loaderBg = '#9EC600';
    this.stack = 5;
    this.position = 'bottom-left';
    this.bgColor = false;
    this.textColor = false;
    this.textAlign = 'left';
    this.icon = false;

    this.beforeShow = function () {};

    this.afterShown = function () {};

    this.beforeHide = function () {};

    this.afterHide = function () {};

    this.onClick = function () {};
  });

  var ExpandAnimation = /*#__PURE__*/function (_Animation) {
    _inherits(ExpandAnimation, _Animation);

    var _super = _createSuper(ExpandAnimation);

    function ExpandAnimation(element, objProps) {
      var _this;

      _classCallCheck(this, ExpandAnimation);

      _this = _super.call(this, element);
      _this.options.startStyle = {
        height: '0px',
        padding: '0px'
      }; // ensure visible

      element.style.display = '';
      var elHeight = Utils.getCalculatedStyle(element, 'height');
      var elPadding = Utils.getCalculatedStyle(element, 'padding');
      _this.options.endStyle = {
        height: elHeight,
        padding: elPadding
      };
      _this.options = Utils.extend(objProps || {}, _this.options);
      _this._startHeight = _this._parseCssValue(_this.options.startStyle.height);
      _this._startPadding = _this._parseCssValue(_this.options.startStyle.padding);
      _this._endHeight = _this._parseCssValue(_this.options.endStyle.height);
      _this._endPadding = _this._parseCssValue(_this.options.endStyle.padding);
      return _this;
    }

    _createClass(ExpandAnimation, [{
      key: "play",
      value: function play() {
        this.target.style.display = this.target.style.display !== 'none' || ''; // if the last tick was less than 0.5s, resume

        var resume = +new Date() - (this._last || 0) < 500;

        if (resume) {
          this.resume();
        } else {
          this.reset();
          this.resume();
        }
      }
    }, {
      key: "_tick",
      value: function _tick() {
        var animationFinish;

        _get(_getPrototypeOf(ExpandAnimation.prototype), "_tick", this).call(this); // Get units being used (Most likely px)


        var currentHeight = this._parseCssValue(this.currentStyle.height);

        var currentPadding = this._parseCssValue(this.currentStyle.padding); // Calculate height


        var heightDenominator = this._startHeight.value > this._endHeight.value ? Math.abs(this.options.duration) * -1 : Math.abs(this.options.duration);
        var now = new Date();
        var calculatedHeight = (currentHeight.value || 1) * ((now - this._last) / heightDenominator);
        this.currentStyle.height = Math.min(this._endHeight.value, currentHeight.value + calculatedHeight) + currentHeight.units;
        var paddingDenominator = this._startPadding.value > this._endPadding.value ? Math.abs(this.options.duration) * -1 : Math.abs(this.options.duration);
        var calculatedPadding = (currentPadding.value || 0.1) * ((now - this._last) / paddingDenominator);
        this.currentStyle.padding = Math.min(this._endPadding.value, currentPadding.value + calculatedPadding) + currentPadding.units; // console.log(this.currentStyle.padding);
        // this._calculatePropValue('height');
        // this._calculatePropValue('padding');
        // Update _last to now

        this._last = +new Date(); // Calculate new height and whether it has reached the target

        if (this._startHeight.value > this._endHeight.value) {
          animationFinish = +this._parseCssValue(this.currentStyle.height).value <= this._endHeight.value;
        } else {
          animationFinish = +this._parseCssValue(this.currentStyle.height).value >= this._endHeight.value;
        } // Check if the target opacity has been met


        animationFinish ? this._end() : this._tickTimeout = setTimeout(Utils.bind(this._tick, this), this.options.frameRate);
      }
      /**
         * It creates an ExpandAnimation object.
         * @param {HTMLElement} element - The element to animate.
         * @param {AnimationOptions} animationProps -
         * The animation properties that are passed to the animation constructor.
         * @return {ExpandAnimation} The ExpandAnimation object.
         */

    }], [{
      key: "expandElement",
      value: function expandElement(element, animationProps) {
        return new ExpandAnimation(element, animationProps);
      }
    }]);

    return ExpandAnimation;
  }(Animation);

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
       * @param {string | string[] | Options} [opts=Options] The Options object or
       * the toast notification text
       */
      function init() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Options();
        this.prepareOptions(opts, new Options());
        this.process();
      }
      /**
         * Prepares the Options for the Toast
         * Notification before handling any functionality
         * @param {Options | string | string[]} options The new Options object or
         * toast notifications desired text
         * @param {Options} optionsToExtend The old Options object to merge with
         */

    }, {
      key: "prepareOptions",
      value: function prepareOptions(options, optionsToExtend) {
        var _options = {};

        if (typeof options === 'string' || options instanceof Array) {
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
        var _defaultToastContent = document.createElement('div');

        _defaultToastContent.className = 'toaste-single';
        this._toastEl = this._toastEl || _defaultToastContent; // The Loader

        var toastLoader = document.createElement('span');
        toastLoader.className = 'toaste-loader';

        this._toastEl.appendChild(toastLoader); // Insert Close Icon


        if (this.options.allowToastClose) {
          var toastCloseIcon = document.createElement('span');
          toastCloseIcon.className = 'toaste-close';

          this._toastEl.appendChild(toastCloseIcon);
        } // Insert Header


        if (this.options.heading) {
          var toastHeader = document.createElement('h2');
          toastHeader.className = 'toaste-heading';
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
          var toastLines = document.createElement('ul');
          toastLines.className = 'toaste-ul';

          for (var i = 0; i < this.options.text.length; i++) {
            var textElement = document.createElement('li');
            textElement.className = 'toaste-li';
            textElement.id = "toaste-item-".concat(i);
            textElement.innerText = this.options.text[i];
            toastLines.appendChild(textElement);
          }

          this._toastEl.appendChild(toastLines);
        } else {
          var _textElement = document.createElement('span');

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
          this._toastEl.classList.add('toaste-has-icon');

          if (this.options.icon && DefaultIcons.includes(this.options.icon)) {
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
        if (typeof this.options.position === 'string' && PositionClasses.indexOf(this.options.position) > -1) {
          var containerRect = this._container.getBoundingClientRect(); // Set the position class or calculate for central values


          switch (this.options.position) {
            case 'bottom-center':
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.bottom = '20px';
              break;

            case 'top-center':
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.top = '20px';
              break;

            case 'mid-center':
              this._container.style.left = "".concat(window.outerWidth / 2 - containerRect.width / 2, "px");
              this._container.style.bottom = "".concat(window.outerHeight / 2 - containerRect.height / 2, "px");
              break;

            default:
              this._container.classList.add(this.options.position);

              break;
          }
        } else if (_typeof(this.options.position) === 'object') {
          // Set defaults to 'auto'
          this._container.style.top = 'auto';
          this._container.style.right = 'auto';
          this._container.style.bottom = 'auto';
          this._container.style.left = 'auto'; // Each property will be set according to the options.position attributes

          for (var position in this.options.position) {
            if (isNaN(Number.parseFloat(this.options.position[position]))) {
              this._container.style.setProperty(position, this.options.position[position]);
            } else {
              this._container.style.setProperty(position, this.options.position[position] + 'px');
            }
          }
        } else {
          // Default to bottom-left
          this._container.classList.add('bottom-left');
        }
      }
      /**
         * Binds the events passed in the {@link Options} object to
         */

    }, {
      key: "bindToast",
      value: function bindToast() {
        var that = this; // Register the event handler to hide/remove the loader

        this._toastEl.addEventListener(ToasteEvents.onShown, function () {
          that.processLoader();
        }); // Attach the close event for the close button


        this._toastEl.querySelector('span.toaste-close').addEventListener('click', that.closeToast.bind(that, that)); // Register the available event handlers passed in through options


        if (typeof this.options.beforeShow === 'function') {
          this._toastEl.addEventListener(ToasteEvents.onShow, that.options.beforeShow(that._toastEl));
        }

        if (typeof this.options.afterShown === 'function') {
          this._toastEl.addEventListener(ToasteEvents.onShown, that.options.afterShown(that._toastEl));
        }

        if (typeof this.options.beforeHide === 'function') {
          this._toastEl.addEventListener(ToasteEvents.onHide, that.options.beforeHide(that._toastEl));
        }

        if (typeof this.options.afterHidden === 'function') {
          this._toastEl.addEventListener(ToasteEvents.onHidden, that.options.afterHidden(that._toastEl));
        }

        if (typeof this.options.onClick === 'function') {
          this._toastEl.addEventListener('click', that.options.onClick(that._toastEl));
        }
      }
    }, {
      key: "addToDom",
      value: function addToDom() {
        var _container = document.querySelector('.toaste-wrap');

        var toastsRemoving;

        if (!_container) {
          _container = document.createElement('div');
          _container.className = 'toaste-wrap';

          _container.setAttribute('role', 'alert');

          _container.setAttribute('aria-live', 'polite');

          document.body.appendChild(_container);
        } else if (!this.options.stack || isNaN(parseInt(this.options.stack, 10))) {
          // remove all child elements from container
          var _iterator = _createForOfIteratorHelper(_container.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var ele = _step.value;

              _container.removeChild(ele);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        toastsRemoving = _container.querySelectorAll('.toaste-single[hidden]');

        if (toastsRemoving) {
          toastsRemoving.forEach(function (toast) {
            _container.removeChild(toast);
          });
        }

        _container.appendChild(this._toastEl); // Remove old toasts if the number of toasts
        // is greater than the allowed stack


        if (this.options.stack && !isNaN(parseInt(this.options.stack), 10)) {
          var previousToastCount = _container.querySelectorAll('.toaste-single').length;

          var extraToastCount = previousToastCount - this.options.stack; // Remove oldest toasts that overflow

          if (extraToastCount > 0) {
            toastsRemoving = Array.from(_container.querySelectorAll('.toaste-single').values()).slice(0, extraToastCount);

            var _iterator2 = _createForOfIteratorHelper(toastsRemoving),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var toast = _step2.value;

                _container.removeChild(toast);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
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

        var loader = this._toastEl.querySelector('.toaste-loader'); // 400 is the default time
        // Divide by 1000 for milliseconds to seconds


        var transitionTime = (this.options.hideAfter - 400) / 1000 + 's';
        var loaderBg = this.options.loaderBg || '';
        loader.style.setProperty('--toaste-transition-duration', transitionTime);

        if (loaderBg) {
          loader.style.setProperty('--toaste-loader-bg', this.options.loaderBg);
        }

        loader.classList.add('toaste-loaded');
      }
    }, {
      key: "animate",
      value: function animate() {
        var that = this;

        var afterShown = function afterShown() {
          Utils.dispatchEvent(that._toastEl, ToasteEvents.onShown);
        };

        var optionsAnimation = new AnimationOptions();
        optionsAnimation.onAnimationEnd = afterShown;
        this._toastEl.style.display = 'none';
        Utils.dispatchEvent(that._toastEl, ToasteEvents.onShow);

        if (this.options.showHideTransition.toLowerCase() === 'fade') {
          FadeAnimation.fadeElement(this._toastEl, optionsAnimation).play();
        } else if (this.options.showHideTransition.toLowerCase() === 'slide') {
          expand(this._toastEl, 400, 'UP', afterShown);
        } else {
          ExpandAnimation.expandElement(this._toastEl, optionsAnimation).play();
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
            el.remove();
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
          toastEInstance._toastEl.style.display = 'none';
          Utils.dispatchEvent(toastEInstance._toastEl, ToasteEvents.onHidden);

          if (toastEInstance.autoCloseTimeout) {
            window.clearTimeout(toastEInstance.autoCloseTimeout);
          }
        };

        var animationOptions = new AnimationOptions();
        animationOptions.onAnimationEnd = animationEnd;
        animationOptions.startStyle = {
          opacity: toastEInstance._toastEl.style.opacity
        };
        animationOptions.endStyle = {
          opacity: 0
        }; // Dispatch event to trigger any event listeners

        Utils.dispatchEvent(toastEInstance._toastEl, ToasteEvents.onHide);

        if (toastEInstance.options.showHideTransition === 'fade') {
          FadeAnimation.fadeElement(toastEInstance._toastEl, animationOptions).play();
        } else if (toastEInstance.options.showHideTransition === 'slide') {
          collapse(toastEInstance._toastEl, 400, 'DOWN', animationEnd);
        } else {
          collapse(toastEInstance._toastEl, 400, 'LEFT', animationEnd);
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
       * @param {string|string[]} option The name of the option to reset
       * back to default or an options object containing all attributes to reset
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

  output.exports = ToastENotifier;

}));
