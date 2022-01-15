export default class Options {
    constructor() {
        this.text = "";
        this.heading = "";
        this.showHideTransition = "fade";
        this.allowToastClose = true;
        this.hideAfter = 3000;
        this.loader = true;
        this.loaderBg = "#9EC600";
        this.stack = 5;
        this.position = "bottom-left";
        this.bgColor = false;
        this.textColor = false;
        this.textAlign = "left";
        this.icon = false;
        this.beforeShow = () => { };
        this.afterShown = () => { };
        this.beforeHide = () => { };
        this.afterHide = () => { };
        this.onClick = () => { };
    }
}