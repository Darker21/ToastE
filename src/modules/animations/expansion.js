import Utils from "../../utils/Utils";
import AnimationOptions from "../settings/AnimationOptions";

export default class ExpandAnimation extends Animation {
    constructor(element, objProps) {
        super(element);

        this.options = Utils.extend(objProps || {}, this.options);
    }

    play() {
        super.play();
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