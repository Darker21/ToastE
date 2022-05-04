import Utils from '../../utils/Utils';
// eslint-disable-next-line no-unused-vars
import AnimationOptions from '../settings/AnimationOptions';
import Animation from './animation';

export default class ExpandAnimation extends Animation {
  constructor(element, objProps) {
    super(element);

    this.options.startStyle = {
      height: '0px',
      padding: '0px',
    };

    // ensure visible
    element.style.display = '';
    const elHeight = Utils.getCalculatedStyle(element, 'height');
    const elPadding = Utils.getCalculatedStyle(element, 'padding');
    this.options.endStyle = {
      height: elHeight,
      padding: elPadding,
    };

    this.options = Utils.extend(objProps || {}, this.options);

    this._startHeight = this._parseCssValue(this.options.startStyle.height);
    this._startPadding = this._parseCssValue(this.options.startStyle.padding);
    this._endHeight = this._parseCssValue(this.options.endStyle.height);
    this._endPadding = this._parseCssValue(this.options.endStyle.padding);
  }

  play() {
    this.target.style.display = this.target.style.display !== 'none' || '';

    // if the last tick was less than 0.5s, resume
    const resume = +new Date() - (this._last || 0) < 500;
    if (resume) {
      this.resume();
    } else {
      this.reset();
      this.resume();
    }
  }

  _tick() {
    let animationFinish;

    super._tick();

    // Get units being used (Most likely px)
    const currentHeight = this._parseCssValue(this.currentStyle.height);
    const currentPadding = this._parseCssValue(this.currentStyle.padding);

    // Calculate height
    const heightDenominator =
      this._startHeight.value > this._endHeight.value ?
        Math.abs(this.options.duration) * -1 :
        Math.abs(this.options.duration);

    const calculatedHeight = ((currentHeight.value || 1) *
      ((new Date() - this._last) / heightDenominator));

    this.currentStyle.height = (currentHeight.value + calculatedHeight) +
        currentHeight.units;

    const paddingDenominator =
      this._startPadding.value > this._endPadding.value ?
        Math.abs(this.options.duration) * -1 :
        Math.abs(this.options.duration);

    const calculatedPadding = ((currentPadding.value || 1) *
      ((new Date() - this._last)/paddingDenominator));

    this.currentStyle.padding = (currentPadding.value + calculatedPadding) +
      currentPadding.units;
    console.log(this.currentStyle.padding);

    // Update _last to now
    this._last = +new Date();

    // Calculate new height and whether it has reached the target
    if (this._startHeight.value > this._endHeight.value) {
      animationFinish =
        +this._parseCssValue(this.currentStyle.height).value <=
        this._endHeight.value;
    } else {
      animationFinish =
        +this._parseCssValue(this.currentStyle.height).value >=
        this._endHeight.value;
    }

    // Check if the target opacity has been met
    animationFinish ? this._end() :
    this._tickTimeout = setTimeout(
        Utils.bind(this._tick, this),
        this.options.frameRate);
  }

  /**
     * It creates an ExpandAnimation object.
     * @param {HTMLElement} element - The element to animate.
     * @param {AnimationOptions} animationProps -
     * The animation properties that are passed to the animation constructor.
     * @return {ExpandAnimation} The ExpandAnimation object.
     */
  static expandElement(element, animationProps) {
    return new ExpandAnimation(element, animationProps);
  }
}
