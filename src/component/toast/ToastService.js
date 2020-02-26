import PubSub from 'pubsub-js';

export const TOAST_TYPE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARN: 'WARN',
}

export const GLOBAL_TOAST = 'GLOBAL_TOAST';

export default class ToastService {

    static get toast() {
        return PubSub;
    }

    static success(toastObj, id) {
        PubSub.publish(
            id ? id : GLOBAL_TOAST, 
            { toasts: !toastObj.length ? [toastObj] : toastObj, type: TOAST_TYPE.SUCCESS }
        );
    }

    static error(toastObj, id) {
        PubSub.publish(
            id ? id : GLOBAL_TOAST,
            { toasts: !toastObj.length ? [toastObj] : toastObj, type: TOAST_TYPE.ERROR }
        );
    }

    static warn(toastObj, id) {
        PubSub.publish(
            id ? id : GLOBAL_TOAST,
            { toasts: !toastObj.length ? [toastObj] : toastObj, type: TOAST_TYPE.WARN }
        );
    }

}