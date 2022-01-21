var NotificationApp = function () { };

NotificationApp.prototype.send = function (heading, body, position, loaderBgColor, icon = false, hideAfter = 3000, stack = 1, showHideTransition = "fade") {

    var options = {
        heading: heading,
        text: body,
        position: position,
        loaderBg: loaderBgColor,
        icon: icon,
        hideAfter: hideAfter,
        stack: stack
    };

    if (showHideTransition) {
        options.showHideTransition = showHideTransition;
    }
    else {
        options.showHideTransition = "fade";
    }

    new ToastENotifier().reset('all');
    new ToastENotifier(options);
};

window.NotificationApp = new NotificationApp;
window.NotificationApp.Constructor = NotificationApp;