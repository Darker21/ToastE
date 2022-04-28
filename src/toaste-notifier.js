import Core from './modules/Core';

/**
 * Wrapper module to expose public functionality
 * 
 * @module ToastE-Notifier
 */
class ToastENotifier {
    /**
     * Creates and displays a ToastE Notification
     * @param {Options} options The ToastE notification options
     */
    constructor(options) {
        this.toastE = new Core();
        this.toastE.init(options);
    }

    /**
     * Reset a specified option or a set of options
     * @param {string|string[]} option The name of the option to reset back to default or an options object containing all attributes to reset
     */
    reset(option) {
        this.toastE.reset(option);
    }

    /**
     * Update a ToastE notification's attributes
     * @param {Options} newOptions The new options for the ToastE Notification
     */
    update(newOptions) {
        this.toastE.update(newOptions);
    }

    /**
     * Close a ToastE notification
     */
    close() {
        this.toastE.close();
    }
}

if (typeof window !== 'undefined') {
    window.ToastENotifier = ToastENotifier;
}

output.exports = ToastENotifier;