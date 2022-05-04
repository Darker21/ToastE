import AnimationOptions from '../settings/AnimationOptions';

/**
 * The Animation class is a base class for all animations.
*/
export default class Animation {
  /**
     * @param {HTMLElement} element element Animating
     */
  constructor(element) {
    this.target = element;

    this.options = new AnimationOptions();
    this._tickTimeout = null;
    this._reverseAnimation = false;
  }

  /**
     * @return {CSSStyleDeclaration} current styles on `this.target`
     */
  get currentStyle() {
    return this.target.style;
  }

  play() {
    this.reset();

    this.options.onAnimationStart?.call();

    this.resume();
  }

  stop() {
    window.clearTimeout(this._tickTimeout);
    this._applyClasses(this.target, this.options.endClasses);
    this._applyStyles(this.target, this.options.endStyle);
  }

  reset() {
    this._applyStyles(this.target, this.options.startStyle);
    this._applyClasses(this.target, this.options.startClasses);
  }

  pause() {
    if (this._tickTimeout) {
      window.clearTimeout(this._tickTimeout);
    }
  }

  resume() {
    this._last = +new Date();
    this._tick();
  }

  reverse() {
    this._swapStartEndElementProps();
    this.options.reverse = true;
    this.reset();
    this.resume();
  }

  _end() {
    this._applyStyles(this.target, this.options.endStyle);
    this._applyClasses(this.target, this.options.endClasses);
    this.options.onAnimationEnd?.call();
  }

  _tick() {
    this.options.onAnimationTick?.call();
  }

  /**
     * It applies the styles in the styleObj to the Element.
     * @param {HTMLElement} element - The Element to apply the styles to.
     * @param {Object} styleObj - The object containing the styles to apply.
     */
  _applyStyles(element, styleObj) {
    for (const cssPropertyName in styleObj) {
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
  _applyClasses(element, classList) {
    for (const className in classList) {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
    }
  }

  _swapStartEndElementProps() {
    const { startStyle, endStyle, startClasses, endClasses } = this.options;
    this.options.startClasses = endClasses;
    this.options.startStyle = endStyle;
    this.options.endClasses = startClasses;
    this.options.endStyle = startStyle;
  }

  /**
     * It takes a string like "10px" and
     * returns an object like {value: 10, units: "px"}
     * @param {string} propValue - The value of the
     * CSS property you want to parse.
     * @return {object} An object with two properties: value and units.
     */
  _parseCssValue(propValue) {
    return {
      value: +propValue.replace(/[^0-9.]+$/g, ''),
      units: propValue.replace(/[0-9.]/g, ''),
    };
  }
}
