export default class AnimationOptions {
    constructor() {
        this.endStyle = {};
        this.startStyle = {};
        this.currentStyle = {};
        this.duration = 400;
        this.frameRate = 16;
        this.classes = {};
        this.currentClasses = [];
        this.endClasses = [];
        this.startClasses = [];
        this.onAnimationEnd = undefined;
        this.onAnimationStart = undefined;
        this.onAnimationTick = undefined;
    }
}

