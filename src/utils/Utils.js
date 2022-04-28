/**
 * Generic functions which are not dependent on ToastE
*/
export default class Utils {

    /**
     * Create a new function that binds the current object to the first parameter of the original
     * function
     * @param {Function} fn - The function to bind.
     * @param {any} me - the object that the function is bound to.
     * @returns {Function} A function that is bound to the object.
     */
    static bind(fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    }

    /**
     * Returns true if the item is an object and not an array and not null.
     * @param {any} item - The item to check.
     * @returns {boolean} The `isObject` function returns a boolean value.
     */
    static isObject(item) {
        return (
            item && typeof item === 'object' && !Array.isArray(item) && item != null
        );
    }

    /**
     * Get all the possible DOM events that can be listened to
     * @returns {string[]} An array of all the possible DOM events.
     */
    static get _listAllPossibleDomEvents() {
        // credit: https://stackoverflow.com/a/18751951
        return [...new Set([
            ...Object.getOwnPropertyNames(document),
            ...Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))),
            ...Object.getOwnPropertyNames(Object.getPrototypeOf(window)),
        ].filter(k => k.startsWith("on") && (document[k] == null || typeof document[k] == "function")))];
    }

    static getCalculatedStyle(element, cssProp) {
        var elementStyles;

        if (typeof (cssProp) !== "string" || element instanceof HTMLElement === false) {
            return null;
        }

        elementStyles = window.getComputedStyle(element);
        return elementStyles.getPropertyValue(cssProp);
    }

    /**
     * Dispatch an event on an element.
     * @param {HTMLElement} element - The element that will be used to dispatch the event.
     * @param {string} eventName - The name of the event to dispatch.
     */
    static dispatchEvent(element, eventName) {
        let eventDispatching;
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
     * @param {Object} source The source object with the desired values to merge into the target
     * @returns {Object} An object with merged values from target and source
     */
    static extend(target, source) {
        // credit: http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7#answer-34749873

        if (typeof Object.assign !== 'function') {
            ; (function () {
                Object.assign = function (target) {
                    'use strict';

                    // We must check against these specific cases.
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    let output = Object(target);

                    for (let index = 1; index < arguments.length; index++) {
                        let source = arguments[index];

                        if (source !== undefined && source !== null) {
                            for (let nextKey in source) {
                                if (source.hasOwnProperty(nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }

                    return output;
                };
            })();
        }

        let output = Object.assign({}, target);

        if (Utils.isObject(target) && Utils.isObject(source)) {
            Object.keys(source).forEach((key) => {
                if (Utils.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, {
                            [key]: source[key]
                        });
                    } else {
                        output[key] = Utils.extend(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, {
                        [key]: source[key]
                    });
                }
            });
        }
        return output;
    }
}