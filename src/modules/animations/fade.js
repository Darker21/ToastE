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
function fadeIn(element, duration, callback = null) {

    fadeInit(element, 0);
    var tick = function () {
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
function fadeOut(element, duration, callback = null) {
    fadeInit(element, 1);
    var tick = function () {
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


export { fadeIn, fadeOut };