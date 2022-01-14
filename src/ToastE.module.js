import { ToastEDefaultOptions } from "./lib/options.default";

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
 * @module ToastE
 */
export default class ToastE {
    /**
     * The constructor for the Toast Notification
     * @param {string | number} opts The options object or the toast notification text
     */
    constructor(opts) {
        this.prepareOptions(opts, ToastEDefaultOptions);
        this.process();
    }
    prepareOptions(options, optionsToExtend) {
        var _options = {};

        if (typeof options === "string" || options instanceof Array) {
            _options.text = options;
        } else {
            _options = options;
        }

        this.options = Object.assign({}, optionsToExtend, _options);
    }

    process() {
        this.setup();
        this.addToDom();
        this.position();
        this.bindToast();
        this.animate();
    }

    /**
     * Setup initial version of ToastE notification
     */
    setup() {
        var toastContent = [];

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

            if (this._defaultIcons.findIndex(this.options.icon) > -1) {
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
            this._positionClasses.indexOf(this.options.position) > -1
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

    bindToast() {
        const that = this;

        // Register the event handler to hide/remove the loader
        this._toastEl.addEventListener("toast.on.shown", function () {
            that.processLoader();
        });

        // Attach the close event for the close button
        this._toastEl.querySelector("span.toaste-close").addEventListener("click", this._CloseToast(ev, that));

        if (typeof this.options.beforeShow === "function") {
            this._toastEl.addEventListener("toast.on.show", that.options.beforeShow(that._toastEl));
        }
    }

    _CloseToast(ev, toastEInstance) {
        ev.preventDefault();

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