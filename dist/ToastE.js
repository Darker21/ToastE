/*!
 * ToastE v1.0.0
 * (c) 2022-2022 Jacob Darker
 * Released under the MIT License.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  /**
   * Fade an HTML Element into view
   * @param {HTMLElement} element - The element to fade in
   * @param {Number} duration - The duration of the fade animation
   * @param {Function} callback - The callback function after the animation has completed
   * @param {any[]} params - The parameters for the callback function
   * @see {@link https://codepen.io/jorgemaiden/pen/xoRKWN}
   */
  /**
   * Fade an HTML Element out of view
   * @param {HTMLElement}} element - The element to fade out
   * @param {Number} duration - The duration of the fade animation
   * @param {Function} callback - The callback function called after the animation has completed
   */


  function fadeOut(element, duration) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    element.style.display = '';
    element.style.opacity = 1;
    var last = +new Date();

    var tick = function tick() {
      element.style.opacity = +element.style.opacity - (new Date() - last) / duration;
      last = +new Date();

      if (+element.style.opacity > 0) {
        window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
      } else {
        if (callback) {
          callback.call();
        }
      }
    };

    tick();
  }

  // Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/
  function slideUp(element, duration) {
  }

  /*!
   * ToastE js 1.0.0
   * https://github.com/Darker21/ToastE
   * @license MIT licensed
   *
   * Copyright (C) 2022 Jacob Darker
   */

  (function () {
    var ToastE = /*#__PURE__*/function () {
      function ToastE() {
        _classCallCheck(this, ToastE);

        this._positionClasses = ["bottom-left", "bottom-right", "top-right", "top-left", "bottom-center", "top-center", "mid-center"];
        this._defaultIcons = ["success", "error", "info", "warning"];
      }

      _createClass(ToastE, [{
        key: "init",
        value: function init(options, element) {
          this.prepareOptions(options, window.toastE.options);
        }
      }, {
        key: "prepareOptions",
        value: function prepareOptions(options, optionsToExtend) {
          var _options = {};

          if (typeof options === "string" || options instanceof Array) {
            _options.text = options;
          } else {
            _options = options;
          }

          this.options = Object.assign({}, optionsToExtend, _options);
        }
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
         * Setup initial version of ToastE notification
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


          if (this.options.text instanceof Array) {
            var toastLines = document.createElement("ul");
            toastLines.className = "toaste-ul";

            for (; i < this.options.text.length; i++) {
              var textElement = document.createElement("li");
              textElement.className = "toaste-li";
              textElement.id = "toaste-item-".concat(i);
              textElement.innerText = this.options.text[i];
              toastLines.appendChild(textElement);
            }
          } else {
            var _textElement = document.createElement("span");

            _textElement.innerText = this.options.text;

            this._toastEl.appendChild(_textElement);
          } // Set BG Colour


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

            if (this._defaultIcons.findIndex(this.options.icon) > -1) {
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
          if (typeof this.options.position === "string" && this._positionClasses.indexOf(this.options.position) > -1) {
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
      }, {
        key: "bindToast",
        value: function bindToast() {
          var that = this; // Register the event handler to hide/remove the loader

          this._toastEl.addEventListener("toast.on.shown", function () {
            that.processLoader();
          }); // Attach the close event for the close button


          this._toastEl.querySelector("span.toaste-close").addEventListener("click", this._CloseToast(ev, that));

          if (typeof this.options.beforeShow === "function") {
            this._toastEl.addEventListener("toast.on.show", that.options.beforeShow(that._toastEl));
          }
        }
      }, {
        key: "_CloseToast",
        value: function _CloseToast(ev, toastEInstance) {
          ev.preventDefault();
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

            slideUp(toastEInstance._toastEl);
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

      return ToastE;
    }();

    window.toastE.options = {
      text: "",
      heading: "",
      showHideTransition: "fade",
      allowToastClose: true,
      hideAfter: 3000,
      loader: true,
      loaderBg: "#9EC600",
      stack: 5,
      position: "bottom-left",
      bgColor: false,
      textColor: false,
      textAlign: "left",
      icon: false,
      beforeShow: function beforeShow() {},
      afterShown: function afterShown() {},
      beforeHide: function beforeHide() {},
      afterHidden: function afterHidden() {},
      onClick: function onClick() {}
    };

    window.toastE = function (options) {
      var toastE = Object.create(ToastE);
      toastE.init(options, this);
      return {
        reset: function reset(optionName) {
          toastE.reset(optionName);
        },
        update: function update(newOptions) {
          toastE.update(newOptions);
        },
        close: function close() {
          toastE.close();
        }
      };
    };
  })();

})));
