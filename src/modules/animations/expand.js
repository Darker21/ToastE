// Convert this css to JS https://jsfiddle.net/cferdinandi/qgpxvhhb/23/

const _expandDirections = {
    UP: -1,
    DOWN: 1,
    LEFT: -1,
    RIGHT: 1
};

/**
 * Expand an HTMLElement in a particular direction
 * @param {HTMLElement} element Element to animate the expansion
 * @param {Number} duration The duration of the expand animation (milliseconds)
 * @param {string} direction The direction to expand the object (allowed-values: 'UP', 'DOWN', 'LEFT', 'RIGHT')
 * @param {Function} [callback=null] The callback function to run after element has been completely expanded
 */
function expand(element, duration, direction, callback = null) {
    direction = direction.toUpperCase() || "UP";

    // Call relevant function based on the direction passed
    if (direction === "UP" || direction === "DOWN") {
        expandVertical(element, duration, direction, callback);
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

    // Call relevant function based on the direction passed
    switch (direction) {
        case "UP":
        case "DOWN":
            collapseVertical(element, duration, direction, callback);
            break;

        case "LEFT":
        case "RIGHT":
            collapseHorizontal(element, duration, direction, callback);
            break;

        default:
            collapseVertical(element, duration, "DOWN", callback);
            break;

    }
}

function expandVertical(element, duration, direction, callback = null) {
    element.style.display = '';
    element.style.height = 0;
    var elementMaxHeight = getElementHeight(element);
    var last = +new Date();
    var tick = function () {
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

function collapseVertical(element, duration, callback = null) {
    element.style.display = '';
    element.style.height = 0;
    var elementMaxHeight = getElementHeight(element);
    var last = +new Date();
    var tick = function () {
        element.style.height = +element.style.height + (new Date() - last) / duration;
        last = +new Date();
        if (+parsePixelValue(element.style.height) > 0 && element.style.height !== "auto") {
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

function expandHorizontal(element, duration, callback = null) {

}

function collapseHorizontal(element, duration, callback = null) {

}

function parsePixelValue(value) {
    let output = value;
    output = output.replace("px", "");
    return +output;
}

function getElementHeight(element) {
    element.style.display = "block";
    var elementHeight = element.scrollHeight;
    element.style.display = 'none';
    return parsePixelValue(elementHeight);
}

function getElementWidth(element) {
    element.style.display = "block";
    var elementWidth = element.scrollWidth;
    element.style.display = 'none';
    return parsePixelValue(elementWidth);
}

export { expand, collapse };