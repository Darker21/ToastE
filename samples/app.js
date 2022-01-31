var NotificationApp = function () { };

NotificationApp.prototype.send = function (heading, body, position, loaderBgColor, icon = false, hideAfter = 3000, stack = 1, showHideTransition = "fade") {

    var options = {
        heading: heading,
        text: body,
        position: position,
        loaderBg: loaderBgColor,
        icon: icon,
        hideAfter: hideAfter,
        stack: stack
    };

    if (showHideTransition) {
        options.showHideTransition = showHideTransition;
    }
    else {
        options.showHideTransition = "fade";
    }

    new ToastENotifier().reset('all');
    new ToastENotifier(options);
};

window.NotificationApp = new NotificationApp;
window.NotificationApp.Constructor = NotificationApp;

// Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/

const _expandDirections = {
    UP: -1,
    DOWN: 1,
    LEFT: -1,
    RIGHT: 1
};

var _transitionEnd;

/**
 * Expand an HTMLElement in a particular direction
 * @param {HTMLElement} element Element to animate the expansion
 * @param {Number} duration The duration of the expand animation (milliseconds)
 * @param {string} direction The direction to expand the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
 * @param {Function} [callback=null] The callback function to run after element has been completely expanded
 */
function expand(element, duration, direction, callback = null) {
    direction = direction.toUpperCase() || "UP";
    element.setAttribute("data-direction", direction);
    element.classList.add("expand");
    // Call relevant function based on the direction passed
    if (direction === "UP" || direction === "DOWN") {
        expandVertical(element, duration, callback);
    } else {
        expandHorizontal(element, duration, direction, callback);
    }
}

/**
 * Collapse an HTMLElement in a particular direction
 * @param {HTMLElement} element Element to animate with the collapse
 * @param {Number} duration The duration of the collapse animation (milliseconds)
 * @param {string} direction The direction to collapse the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
 * @param {Function} [callback=null] The callback function to run after element has been completely collapsed
 */
function collapse(element, duration, direction, callback = null) {
    direction = direction.toUpperCase();
    if (!element.getAttribute("data-direction")) {
        element.setDirection("data-direction", direction);
    }
    // Call relevant function based on the direction passed
    if (direction === "UP" || direction === "DOWN") {
        collapseVertical(element, duration, callback);
    } else {
        collapseHorizontal(element, duration, direction, callback);
    }

}

function expandVertical(element, duration, callback = null) {
    var elementMaxHeight = getElementScrollHeight(element);
    element.style.height = "0px";
    element.classList.add("is-visible");
    _transitionEnd = function (ev) {
        ev.target.removeEventListener("transitionend", _transitionEnd);
        if (callback) {
            callback.call();
        }
    };

    window.setTimeout(() => { element.style.height = elementMaxHeight + "px"; }, 0);
    element.addEventListener("transitionend", _transitionEnd);
}

function collapseVertical(element, duration, callback = null) {
    element.style.height = "0px";
    _transitionEnd = function (ev) {
        ev.target.removeEventListener("transitionend", _transitionEnd);
        ev.target.classList.remove("is-visible");
        if (callback) {
            callback.call();
        }
    };
    element.addEventListener("transitionend", _transitionEnd);


    // var elementMaxHeight = getElementScrollHeight(element);
    // var last = +new Date();
    // var tick = function () {
    //     element.style.height = +element.style.height + (new Date() - last) / duration;
    //     last = +new Date();
    //     if (+parsePixelValue(element.style.height) > 0 && element.style.height !== "auto") {
    //         window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
    //     } else {
    //         element.style.height = 'auto';
    //         if (callback) {
    //             callback.call();
    //         }
    //     }
    // };
    // tick();
}

function expandHorizontal(element, duration, callback = null) {

}

function collapseHorizontal(element, duration, callback = null) {

}

function parsePixelValue(value) {
    let output = value;
    output = output.toString().replace("px", "");
    return +output;
}

function getElementScrollHeight(element) {
    element.style.display = "block";
    var elementHeight = getComputedStyle(element).height;
    element.style.display = "";
    return parsePixelValue(elementHeight);
}

function getElementWidth(element) {
    element.style.display = "block";
    var elementWidth = element.scrollWidth;
    element.style.display = "";
    return parsePixelValue(elementWidth);
}
