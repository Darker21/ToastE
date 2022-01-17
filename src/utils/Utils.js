/**
 * Generic functions which are not dependent on ToastE
 */
class Utils {

    static bind(fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    }

    static isObject(item) {
        return (
            item && typeof item === 'object' && !Array.isArray(item) && item != null
        );
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

        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((key) => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, {
                            [key]: source[key]
                        });
                    } else {
                        output[key] = this.extend(target[key], source[key]);
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

export default { Utils };