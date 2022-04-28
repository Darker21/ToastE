const NotificationApp = function() {};

NotificationApp.prototype.send = function(
    heading,
    body,
    position,
    loaderBgColor,
    icon = false,
    hideAfter = 3000,
    stack = 1,
    showHideTransition = "fade"
) {
    const options = {
        heading: heading,
        text: body,
        position: position,
        loaderBg: loaderBgColor,
        icon: icon,
        hideAfter: hideAfter,
        stack: stack,
    };

    if (showHideTransition) {
        options.showHideTransition = showHideTransition;
    } else {
        options.showHideTransition = "fade";
    }

    new ToastENotifier(options);
};

window.NotificationApp = new NotificationApp();
window.NotificationApp.Constructor = NotificationApp;

window.onload = function() {
    document.getElementById("btnNew").onclick = () => {
        new window.ToastENotifier({
            text: "hi",
            loaderBgColor: "#Bada55",
            showHideTransition: "expand",
            beforeShow: (el) => {
                console.log(el);
                el.style.display = "";
            },
        });
    };
};
