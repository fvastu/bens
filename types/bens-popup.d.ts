import { ModalInjectionParameters } from ".";
declare class BensPopup {
    alarm_popup: string;
    ShadowDomContainer: string;
    private _subtext;
    private _text;
    private _logo;
    private _document;
    private _window;
    private _showInMs;
    private _hideAfter;
    private _blurBackground;
    private _buttonContent;
    private _cancelContent;
    private _theme;
    private _useAnimation;
    private _onOpen;
    private _onClose;
    private _onConfirmClick;
    private _onCancelClick;
    noop: () => void;
    /**
     * Constructor
     * @param param0 object (see the docs for parameters)
     */
    constructor({ subtext, text, logo, useAnimation, blurBackground, buttonContent, cancelContent, theme, hideAfter, onConfirmClick, onCancelClick, onOpen, onClose, }: ModalInjectionParameters);
    /**
     * Add the styles of the modal to <style> tag inserted into the document <head>
     * @param styleRules : string, CSS style rules
     */
    setStyle: (styleRules: string) => void;
    /**
     * Add the default styles based on the chosen theme
     * @param theme "light" / "dark"
     */
    getDefaultStyles: (theme: string) => string;
    private createElement;
    private addModalToDocument;
    /**
     * Returns an HTMLElement Button representation with a onClick redirect
     * @param buttonContent string you want to inject as innerHTML
     * @param callbacks callbacks fired when element is clicked
     * @returns the button
     */
    private createButton;
    /**
     * Creates the image
     * @param src
     * @returns
     */
    private createImage;
    /**
     * Show the modal.
     */
    private showModal;
    /**
     * Hide the modal.
     */
    private hideModal;
    /**
     * Toggles scrolling the body (on/off) when the modal is open or closed
     */
    private toggleBodyScroll;
    get showInMs(): number;
    set showInMs(value: number);
    get window(): Window;
    set window(value: Window);
}
export default BensPopup;
