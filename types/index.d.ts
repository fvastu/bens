import BensNotification from './bens-notification';
import BensPopup from './bens-popup';
declare global {
    interface Window {
        BensNotification: typeof BensNotification;
        BensPopup: typeof BensPopup;
    }
}
export type ModalInjectionParameters = {
    window?: Window;
    text: string;
    logo?: string;
    subtext?: string;
    useAnimation?: boolean;
    blurBackground?: boolean;
    hideAfter?: number;
    theme?: 'dark' | 'light';
    buttonContent?: HTMLElement | string;
    cancelContent?: HTMLElement | string;
    onConfirmClick?: () => void;
    onCancelClick?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
};
export declare const createModal: (params: ModalInjectionParameters, tabId?: number) => void;
export declare const createNotification: (params: ModalInjectionParameters, tabId?: number) => void;
