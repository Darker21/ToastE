import Animation from './animation';
import Utils from '../../utils/Utils';

/* Creates a new instance of the Fade Animation class */
export default class FadeAnimation extends Animation {
  /**
     * Creates a new instance of the Animation class
     * @param {HTMLElement} element - The element to animate.
     * @param {AnimationOptions|Object} animationOptions -
     * an object containing the options for the animation.
     */
  constructor(element, animationOptions) {
    super(element);

    this.options.startStyle = {
      opacity: 0,
    };
    this.options.endStyle = {
      opacity: 1,
    };

    this.options = Utils.extend(this.options, animationOptions);
  }

  /**
     * Play the animation
     */
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

  /**
     * Resume the animation
     */
  resume() {
    this._last = +new Date();
    this._tick();
  }

  /**
     * Calculate the new opacity and whether it has reached the target.
     * If the target opacity has not been reached:
     * call the _tick function again.
     *
     * If the target opacity has been reached: call the onAnimationEnd function
     */
  _tick() {
    let animationFinish;

    // Call base method
    super._tick();

    // Calculate Opacity
    const denominator =
      this.options.startStyle.opacity > this.options.endStyle.opacity ?
        Math.abs(this.options.duration) * -1 :
        Math.abs(this.options.duration);
    this.target.style.opacity =
    +this.target.style.opacity + (new Date() - this._last) / denominator;

    // Update _last to now
    this._last = +new Date();

    // Calculate new opacity and whether it has reached the target
    if (this.options.startStyle.opacity > this.options.endStyle.opacity) {
      animationFinish =
        +this.target.style.opacity <= +this.options.endStyle.opacity;
    } else {
      animationFinish =
        +this.target.style.opacity >= +this.options.endStyle.opacity;
    }

    // Check if the target opacity has been met
    animationFinish ?
      this.options.onAnimationEnd?.call() :
      this._tickTimeout = setTimeout(
          Utils.bind(this._tick, this),
          this.options.frameRate);
  }

  /**
     * Create a new instance of the FadeAnimation class
     * @param {HTMLElement} element - The element to be animated.
     * @param {AnimationOptions|Object} animationOptions -
     * An object containing the animation properties.
     * @return {FadeAnimation} Instance of a fade animation.
     */
  static fadeElement(element, animationOptions) {
    return new FadeAnimation(element, animationOptions);
  }
}
