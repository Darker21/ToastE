import Utils from "../../utils/Utils";
import AnimationOptions from "../settings/AnimationOptions";
import Animation from "./animation";

export default class ExpandAnimation extends Animation {
    constructor(element, objProps) {
        var elHeight;

        super(element);

        this.options.startStyle = {
            height: '0px'
        };

        // ensure visible
        element.style.display = "";
        elHeight = Utils.getCalculatedStyle(element, "height");
        this.options.endStyle = {
            height: this._parseCssValue(elHeight).value.toString(),
        }

        this.options = Utils.extend(objProps || {}, this.options);
    }

    play() {
        this.target.style.display = this.target.style.display !== "none" || "";

        // if the last tick was less than 0.5s, resume
        var resume = +new Date() - (this._last || 0) < 500;
        if (resume) {
            this.resume();
        } else {
            this.reset();
            this.resume();
        }
    }

    _tick() {
        var denominator,
            animationFinish,
            calculatedHeight,
            currentHeight,
            startHeight,
            endHeight;

        super._tick();

        startHeight = this._parseCssValue(this.options.startStyle.height);
        endHeight = this._parseCssValue(this.options.endStyle.height);
        console.log(startHeight, endHeight);

        // Get units being used (Most likely px)
        currentHeight = this._parseCssValue(this.style.height);

        // Calculate height
        // TODO  this is calculating a value WAY too small - needs to default if value is too small (maybe 0.25px increment)
        denominator = startHeight.value > endHeight.value ? Math.abs(this.options.duration) * -1 : Math.abs(this.options.duration);
        calculatedHeight = ((currentHeight.value || 1) * ((new Date() - this._last) / denominator));
        if (Math.abs(currentHeight.value - Math.abs(calculatedHeight)) < 1e-3) { this._tickTimeout = setTimeout(Utils.bind(this._tick, this), this.options.frameRate); return; };
        console.log(calculatedHeight, this.style.height);
        this.style.height = calculatedHeight + currentHeight.units;

        // Update _last to now
        this._last = +new Date();

        // Calculate new height and whether it has reached the target
        if (startHeight.value > endHeight.value) {
            animationFinish = +this._parseCssValue(this.style.height).value <= endHeight.value;
        } else {
            animationFinish = +this._parseCssValue(this.style.height).value >= endHeight.value;
        }

        // Check if the target opacity has been met
        animationFinish ? this.options.onAnimationEnd?.call() : this._tickTimeout = setTimeout(Utils.bind(this._tick, this), this.options.frameRate);
    }

    /**
     * It creates an ExpandAnimation object.
     * @param element - The element to animate.
     * @param animationProps - The animation properties that are passed to the animation constructor.
     * @returns The ExpandAnimation object.
     */
    static expandElement(element, animationProps) {
        return new ExpandAnimation(element, animationProps);
    }

}