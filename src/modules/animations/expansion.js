import Utils from '../../utils/Utils';
// eslint-disable-next-line no-unused-vars
import AnimationOptions from '../settings/AnimationOptions';
import Animation from './animation';

export default class ExpandAnimation extends Animation {
  constructor(element, objProps) {
    super(element);

    this.options.startStyle = {
      height: '0px',
    };

    // ensure visible
    element.style.display = '';
    const elHeight = Utils.getCalculatedStyle(element, 'height');
    this.options.endStyle = {
      height: this._parseCssValue(elHeight).value.toString(),
    };

    this.options = Utils.extend(objProps || {}, this.options);
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

    const startHeight = this._parseCssValue(this.options.startStyle.height);
    const endHeight = this._parseCssValue(this.options.endStyle.height);
    console.log(startHeight, endHeight);

    // Get units being used (Most likely px)
    const currentHeight = this._parseCssValue(this.style.height);

    // Calculate height
    // TODO  this is calculating a value WAY too small -
    // needs to default if value is too small (maybe 0.25px increment)
    const denominator =
      startHeight.value > endHeight.value ?
        Math.abs(this.options.duration) * -1 :
        Math.abs(this.options.duration);
    const calculatedHeight = ((currentHeight.value || 1) *
      ((new Date() - this._last) / denominator));
    if (Math.abs(currentHeight.value - Math.abs(calculatedHeight)) < 1e-3) {
      this._tickTimeout = setTimeout(
          Utils.bind(this._tick, this),
          this.options.frameRate);
      return;
    };
    console.log(calculatedHeight, this.style.height);
    this.style.height = calculatedHeight + currentHeight.units;

    // Update _last to now
    this._last = +new Date();

    // Calculate new height and whether it has reached the target
    if (startHeight.value > endHeight.value) {
      animationFinish =
        +this._parseCssValue(this.style.height).value <= endHeight.value;
    } else {
      animationFinish =
        +this._parseCssValue(this.style.height).value >= endHeight.value;
    }

    // Check if the target opacity has been met
    animationFinish ? this.options.onAnimationEnd?.call() :
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
