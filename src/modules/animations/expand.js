// Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/

var _transitionEnd;
const _collapsedElementDimensions = { width: 0, height: 0, padding: 0, margin: 0, borderWidth: 0 };
const _expandState = {};

/**
 * ? Maybe make this a toggle function?
 * Initializes the element state for the expansion/collapsing animation
 * @param {HTMLElement} element Element to expand
 */
function _expandInit(element) {
    if (element.classList.contains("is-visible")) {
        _expandState.startStyle = _getExpandedElementDimensions(element);
        _expandState.endStyle = _collapsedElementDimensions;
    } else {
        _expandState.startStyle = _collapsedElementDimensions;
        _expandState.endStyle = _getExpandedElementDimensions(element);
    }
}

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

    // Set data-direction attribute for element
    direction = direction.toUpperCase();
    if (!element.getAttribute("data-direction")) {
        element.setAttribute("data-direction", direction);
    }

    element.style.setProperty("--transition-duration", duration + "ms");

    // Call relevant function based on the direction passed
    if (direction === "UP" || direction === "DOWN") {
        collapseVertical(element, duration, callback);
    } else {
        collapseHorizontal(element, duration, direction, callback);
    }

}

function expandVertical(element, duration, callback = null) {
    // set start props
    element.style.height = "0px";
    element.classList.add("is-visible");

    // Set the transition end function
    _transitionEnd = function (ev) {
        // Remove the end transition to prevent extra calls on hide
        ev.target.removeEventListener("transitionend", _transitionEnd);
        if (callback) {
            callback.call();
        }
    };

    // Register the transitionend function
    element.addEventListener("transitionend", _transitionEnd);

    // Get the end animation styles
    var animationEndStyle = _getExpandedElementDimensions(element);

    // Apply the styles after timeout to trigger CSS animation
    window.setTimeout(_applyAnimationEndStyles(animationEndStyle), 0);
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
}

function expandHorizontal(element, duration, callback = null) {

}

function collapseHorizontal(element, duration, callback = null) {

}

function _applyAnimationEndStyles(target, styleObj = {}) {
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
    var dimensions = {};

    // Ensure element is shown for accurate calculations
    element.style.display = "block";

    dimensions.width = _getElementInnerWidth(element);
    dimensions.height = _getElementInnerHeight(element);
    dimensions.borderWidth = _getElementBorderWidth(element);
    dimensions.margin = _getElementMargin(element);
    dimensions.padding = _getElementPadding(element);

    // Reset inline display
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

export { expand, collapse };