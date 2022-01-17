import Utils from '../utils/Utils';
import { fadeIn, fadeOut } from './animations/fade';
import { expand, collapse } from './animations/expand';
import { Options } from './settings/Options';

const _positionClasses = [
    "bottom-left",
    "bottom-right",
    "top-right",
    "top-left",
    "bottom-center",
    "top-center",
    "mid-center"
];
const _defaultIcons = ["success", "error", "info", "warning"];

/**
 * ToastE core class responsible for core functionality
 * 
 * @module Core
 * @private
 */
export default class Core {
    /**
     * The initializer method for the ToastE notification library
     * @param {string | string[] | Options()} [opts=Options] The Options object or the toast notification text
     */
    init(opts = new Options()) {
        console.log(opts);
        // console.log(new Options());
        this.prepareOptions(opts, new Options());
        this.process();
    }

    /**
     * Prepares the Options for the Toast Notification before handling any functionality
     * @param {Options | string | string[]} options The new Options object or toast notifications desired text
     * @param {Options} optionsToExtend The old Options object to merge with
     */
    prepareOptions(options, optionsToExtend) {
        var _options = {};
        console.log(optionsToExtend);
        if (typeof options === "string" || options instanceof Array) {
            _options.text = options;
        } else {
            _options = options;
        }

        // Merge the Options objects
        this.options = Utils.extend(_options, optionsToExtend);
    }

    /**
     * Processes the toast notification
     */
    process() {
        this.setup();
        this.addToDom();
        this.position();
        this.bindToast();
        this.animate();
    }

    /**
     * Setup ToastE element
     */
    setup() {
        var _defaultToastContent = document.createElement("div");
        _defaultToastContent.className = "toaste-single";

        this._toastEl = this._toastEl || _defaultToastContent;

        // The Loader
        var toastLoader = document.createElement("span");
        toastLoader.className = "toaste-loader";
        this._toastEl.appendChild(toastLoader);

        // Insert Close Icon
        if (this.options.allowToastClose) {
            let toastCloseIcon = document.createElement("span");
            toastCloseIcon.className = "toaste-close";
            toastCloseIcon.innerText = "&times;";

            this._toastEl.appendChild(toastCloseIcon);
        }

        // Insert Header
        if (this.options.heading) {
            let toastHeader = document.createElement("h2");
            toastHeader.className = "toaste-heading";
            toastHeader.innerText = this.options.heading;
            this._toastEl.appendChild(toastHeader);
        }

        // Insert Text
        this.generateToastText();

        console.log(this);
        // Update the Toast styles
        this.setToastElementStyles();
    }

    /**
     * Generates and appends the text element(s) to the toast notification
     */
    generateToastText() {
        // if array: create an unordered list element of text
        // else: create span element of text
        if (this.options.text instanceof Array) {
            let toastLines = document.createElement("ul");
            toastLines.className = "toaste-ul";

            for (; i < this.options.text.length; i++) {
                let textElement = document.createElement("li");
                textElement.className = "toaste-li";
                textElement.id = `toaste-item-${i}`;
                textElement.innerText = this.options.text[i];

                toastLines.appendChild(textElement);
            }
        } else {
            let textElement = document.createElement("span");
            textElement.innerText = this.options.text;

            this._toastEl.appendChild(textElement);
        }
    }

    /**
     * Sets the Toast Notification element styles
     */
    setToastElementStyles() {
        // Set BG Colour
        if (this.options.bgColor !== false) {
            this._toastEl.style.backgroundColor = this.options.bgColor;
        }

        // Set Text Color
        if (this.options.textColor !== false) {
            this._toastEl.style.color = this.options.textColor;
        }

        // Set Text Align
        if (this.options.textAlign) {
            this._toastEl.style.textAlign = this.options.textAlign;
        }

        // Add Icon
        if (this.options.icon !== false) {
            this._toastEl.classList.add("toaste-has-icon");
            console.log(this.options);
            if (_defaultIcons.findIndex(this.options.icon) > -1) {
                this._toastEl.classList.add(
                    `toaste-icon-${this.options.icon}`
                );
            }
        }

        // Add custom class
        if (this.options.class !== false) {
            this._toastEl.classList.add(this.options.class);
        }
    }

    /**
     * Set the position of the toast notification
     */
    position() {
        if (
            typeof this.options.position === "string" &&
            _positionClasses.indexOf(this.options.position) > -1
        ) {
            let containerRect = this._container.getBoundingClientRect();

            // Set the position class or calculate for central values
            switch (this.options.position) {
                case "bottom-center":
                    this._container.style.left = `${window.outerWidth / 2 - containerRect.width / 2
                        }px`;
                    this._container.style.bottom = "20px";
                    break;

                case "top-center":
                    this._container.style.left = `${window.outerWidth / 2 - containerRect.width / 2
                        }px`;
                    this._container.style.top = "20px";
                    break;

                case "mid-center":
                    this._container.style.left = `${window.outerWidth / 2 - containerRect.width / 2
                        }px`;
                    this._container.style.bottom = `${window.outerHeight / 2 - containerRect.height / 2
                        }px`;
                    break;

                default:
                    this._container.classList.add(this.options.position);
                    break;
            }
        } else if (typeof this.options.position === "object") {
            // Set defaults to 'auto'
            this._container.style.top = "auto";
            this._container.style.right = "auto";
            this._container.style.bottom = "auto";
            this._container.style.left = "auto";

            // Each property will be set according to the options.position attributes 
            for (const position in this.options.position) {

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
    bindToast() {
        const that = this;

        // Register the event handler to hide/remove the loader
        this._toastEl.addEventListener("toast.on.shown", function () {
            that.processLoader();
        });

        // Attach the close event for the close button
        this._toastEl
            .querySelector("span.toaste-close")
            .addEventListener("click", Utils.bind(this.closeToast, that));

        // Register the available event handlers passed in through options
        if (typeof this.options.beforeShow === "function") {
            this._toastEl.addEventListener(
                "toast.on.show",
                that.options.beforeShow(that._toastEl)
            );
        }

        if (typeof this.options.afterShown === "function") {
            this._toastEl.addEventListener(
                "toast.on.show",
                that.options.afterShown(that._toastEl)
            );
        }

        if (typeof this.options.beforeHide === "function") {
            this._toastEl.addEventListener(
                "toast.on.hide",
                that.options.afterShown(that._toastEl)
            );
        }

        if (typeof this.options.afterHidden === "function") {
            this._toastEl.addEventListener(
                "toast.on.hidden",
                that.options.afterHidden(that._toastEl)
            );
        }

        if (typeof this.options.onClick === "function") {
            this._toastEl.addEventListener(
                "click",
                that.options.onClick(that._toastEl)
            );
        }
    }

    addToDom() {
        var _container = document.querySelector(".toaste-wrap");

        if (!_container) {
            _container = document.createElement("div");
            _container.className = "toaste-wrap";
            _container.setAttribute("role", "alert");
            _container.setAttribute("aria-live", "polite");

            document.body.appendChild(_container);
        } else if (
            !this.options.stack ||
            isNaN(parseInt(this.options.stack, 10))
        ) {
            // remove all child elements from container
            for (let ele in _container.children) {
                _container.removeChild(ele);
            }
        }

        let toastRemoving = _container.querySelector(
            ".toaste-single[hidden]"
        );
        if (toastRemoving) {
            _container.removeChild(toastRemoving);
        }

        _container.appendChild(this._toastEl);

        // Remove old toasts if the number of toasts
        // is greater than the allowed stack
        if (
            this.options.stack &&
            !isNaN(parseInt(this.options.stack), 10)
        ) {
            var previousToastCount =
                _container.querySelectorAll(".toaste-single").length;
            var extraToastCount = previousToastCount - this.options.stack;

            // Remove oldest toasts that overflow
            if (extraToastCount > 0) {
                var toastsRemoving = Array.from(_container
                    .querySelectorAll(".toaste-single").values())
                    .slice(0, extraToastCount);

                for (let toast of toastsRemoving) {
                    _container.removeChild(toast);
                }
            }
        }

        this._container = _container;
    }

    canAutoHide() {
        return (
            this.options.hideAfter !== false &&
            !isNaN(parseInt(this.options.hideAfter, 10))
        );
    }

    processLoader() {
        // Show the loader only, if auto-hide is on and loader is demanded
        if (!this.canAutoHide() || this.options.loader === false) {
            return false;
        }

        var loader = this._toastEl.querySelector(".toaste-loader");

        // 400 is the default time
        // Divide by 1000 for milliseconds to seconds
        var transitionTime = (this.options.hideAfter - 400) / 1000 + "s";
        var loaderBg = this.options.loaderBg || '';

        loader.style.setProperty("--toaste-transition-duration", transitionTime + "s");

        if (loaderBg) {
            loader.style.setProperty("--toaste-loader-bg", this.options.loaderBg);
        }
    }


    animate() {
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

            window.setTimeout(Utils.bind(that.closeToast, that), +this.options.hideAfter);
        }
    }

    reset(all = true) {
        if (all) {
            document.querySelectorAll('.toaste-wrap').forEach(el => el.remove());
        } else {
            this._toastEl.remove();
        }
    }

    update(optionsUpdated) {
        this.prepareOptions(optionsUpdated, this.options);
        this.setup();
        this.bindToast();
    }

    /**
     * Closes the specified ToastE element
     * @param {HTMLElement} element The element that called the close method
     * @param {Core} toastEInstance The ToastE object instance to close
     */
    closeToast(element, toastEInstance) {

        var evToastHide = new Event("toast.on.hide");

        if (toastEInstance.options.showHideTransition === "fade") {
            // Dispatch event to trigger any event listeners
            toastEInstance._toastEl.dispatchEvent(evToastHide);
            fadeOut(toastEInstance._toastEl, 400, () => {
                var evToastHidden = new Event("toast.on.hidden");
                toastEInstance._toastEl.dispatchEvent(evToastHidden);
            });
        } else if (toastEInstance.options.showHideTransition === "slide") {
            // Dispatch event to trigger any event listeners
            toastEInstance._toastEl.dispatchEvent(evToastHide);
            slideUp(toastEInstance._toastEl, 400, () => {
                var evToastHidden = new Event("toast.on.hidden");
                toastEInstance._toastEl.dispatchEvent(evToastHidden);
            });
        } else {
            // Dispatch event to trigger any event listeners
            toastEInstance._toastEl.dispatchEvent(evToastHide);
            fadeOut(toastEInstance._toastEl, 400, () => {
                var evToastHidden = new Event("toast.on.hidden");
                toastEInstance._toastEl.dispatchEvent(evToastHidden);
            });
        }
    }
}