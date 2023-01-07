'use strict';

import { ModalInjectionParameters } from '.';

class BensPopup {
    alarm_popup = 'Show_modal_alarm';
    ShadowDomContainer = 'ShadowDomContainer';
    private _subtext = '';
    private _text = '';
    private _logo = '';

    // Document Object
    private _document: Document;
    private _window: Window;

    // showInMs until modal is shown - in ms
    private _showInMs = 0;
    private _hideAfter: number;
    private _blurBackground: boolean;

    private _buttonContent: HTMLElement | string;
    private _cancelContent: HTMLElement | string;

    private _theme;
    private _useAnimation;

    private _onOpen: () => void;
    private _onClose: () => void;
    private _onConfirmClick: () => void;
    private _onCancelClick: () => void;

    noop = () => {};

    /**
     * Constructor
     * @param param0 object (see the docs for parameters)
     */
    constructor({
        subtext,
        text,
        logo,
        useAnimation,
        blurBackground,
        buttonContent,
        cancelContent,
        theme,
        hideAfter,
        onConfirmClick,
        onCancelClick,
        onOpen,
        onClose,
    }: ModalInjectionParameters) {
        this._window = self as Window;
        this._document = this._window.document;
        this._text = text;
        this._subtext = subtext || '';
        this._logo = logo || '';
        this._hideAfter = hideAfter || -1;
        this._buttonContent = buttonContent || '';
        this._cancelContent = cancelContent || '';
        this._blurBackground = blurBackground || true;
        this._theme = theme || 'light';
        this._useAnimation = useAnimation || false;

        // use parameter function or do nothing
        this._onConfirmClick = onConfirmClick || this.noop;
        this._onCancelClick = onCancelClick || this.noop;
        this._onOpen = onOpen || this.noop;
        this._onClose = onClose || this.noop;

        this.showModal();

        if (this._hideAfter <= 0) return;
        setTimeout(this.hideModal, this._hideAfter);
    }

    /**
     * Add the styles of the modal to <style> tag inserted into the document <head>
     * @param styleRules : string, CSS style rules
     */
    public setStyle = (styleRules: string): void => {
        const style = this.createElement('style');
        style.innerHTML = styleRules;
        this._document.head.appendChild(style);
    };

    /**
     * Add the default styles based on the chosen theme
     * @param theme "light" / "dark"
     */
    public getDefaultStyles = (theme: string): string => {
        const darkTheme = `
        * {
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        text-align:center;
    }

    h1,
    h2 {
    margin: 0;
    }


    .fade-in {
        animation: fadeIn 1s;
      }


      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

    button {
    display: block;
    margin-top: 2rem;
    width: calc(44px * 3.74);
    height: 44px;
    border-radius: calc(3px * 3.74);
    border: none;
    letter-spacing: ccalc(3 * 0.025em);
    font-family: inherit;
    color: rgb(107, 114, 128);
    background-color: rgb(238, 241, 247);
    font-size: large;
    font-weight: 700;
    outline: none;
    }

    button:focus {
    outline: none;
    border: 0.0625rem solid transparent;
    box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem rgb(55, 65, 81);
    }

    button.cta {
    background-color: rgb(0, 102, 254);
    color: white;
    }

    button.cta:focus {
    box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem rgb(0, 102, 254);
    outline: none;
    }

    .dialog-container {
        position: absolute;
        z-index: 2147483647;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        font-size: 1.1em;
        background: rgba(0,0,0,0.5);
    }

    .blur {
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }

    .dialog {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        align-items: center;
        border: none !important;
        border-radius: calc(5px * 3.74);
        box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        padding: 2rem;
        max-width: 450px;
        background: #232323;
        color: white;
    }

    .dialog img {
    display: block;
    max-width: 75%;
    }

    .h1 {
    margin: 2rem 0 1rem;
    font-weight: 900;
    }

    .h2 {
    margin: 2rem 0 1rem;
    font-weight: 800;
    }

    p {
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.025em;
    line-height: 1.625;
    }

    .flex {
        width: 100%;
    display: flex;
    flex-wrap: wrap;
    }

    .flex.flex-space-between {
    justify-content: space-between;
    }

    .flex button {
        margin: 8px auto;
    }
        `;
        const lightTheme = `
        * {
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        text-align:center;
    }

    .fade-in {
        animation: fadeIn 5s;
      }


      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

    h1,
    h2 {
    margin: 0;
    }

    button {
        outline: none;
    display: block;
    margin-top: 2rem;
    width: calc(44px * 3.74);
    height: 44px;
    border-radius: calc(3px * 3.74);
    border: none;
    letter-spacing: ccalc(3 * 0.025em);
    font-family: inherit;
    color: rgb(107, 114, 128);
    background-color: rgb(238, 241, 247);
    font-size: large;
    font-weight: 700;
    }

    button:focus {
    outline: none;
    border: 0.0625rem solid transparent;
    box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem rgb(55, 65, 81);
    }

    button.cta {
    background-color: rgb(0, 102, 254);
    color: white;
    }

    button.cta:focus {
    outline: none;
    box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.2rem rgb(0, 102, 254);
    }

    .dialog-container {
        position: absolute;
        z-index: 2147483647;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        font-size: 1.1em;
        background: rgba(0,0,0,0.5);
    }

    .blur {
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }

    .dialog {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        align-items: center;
        border: none !important;
        border-radius: calc(5px * 3.74);
        box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        padding: 1.6rem;
        max-width: 400px;
        background: white;
    }

    .dialog img {
    display: block;
    max-width: 75%;
    }

    .h1 {
    margin: 2rem 0 1rem;
    font-weight: 900;
    }

    .h2 {
    margin: 2rem 0 1rem;
    font-weight: 800;
    }

    p {
    color: rgb(107, 114, 128);
    letter-spacing: 0.025em;
    line-height: 1.625;
    }

    .flex {
        width: 100%;
    display: flex;
    flex-wrap: wrap;
    }

    .flex.flex-space-between {
    justify-content: space-between;
    }

    .flex button {
    margin: 8px auto;
    }
        `;
        const choice = theme === 'dark' ? darkTheme : lightTheme;
        return choice;
    };

    // Shortform create a HTMLElement
    private createElement(tagName: string, withClasses: Array<string> = []): HTMLElement {
        const element = this._document.createElement(tagName);
        withClasses.forEach((c: string) => element.classList.add(c));
        return element;
    }

    // Add Modal to user-specified Document object
    private addModalToDocument = (style: string): void => {
        const wrapper = this.createElement('div');
        const shadowRoot: ShadowRoot = wrapper.attachShadow({ mode: 'open' });
        const shadowRootStyle: HTMLElement = this.createElement('style');
        const main: HTMLElement = this.createElement(
            'div',
            this._blurBackground ? ['blur', 'dialog-container'] : ['dialog-container']
        );
        const dialog: HTMLElement = this.createElement('div', ['dialog']);
        const img: HTMLImageElement = this.createImage(this._logo);
        const title: HTMLElement = this.createElement('h2', ['h2']);
        const subtext: HTMLElement = this.createElement('p');
        const buttonContainer: HTMLElement = this.createElement('div', ['flex', 'flex-space-between']);
        const button = this.createButton(this._buttonContent, [this._onConfirmClick, this.hideModal]);
        const cancelButton = this._cancelContent
            ? this.createButton(this._cancelContent, [this._onCancelClick, this.hideModal])
            : undefined;

        if (this._useAnimation) main.classList.add('fade-in');
        wrapper.id = this.ShadowDomContainer;
        title.innerHTML = this._text;
        subtext.innerHTML = this._subtext;
        button.classList.add('cta');
        buttonContainer.appendChild(button);
        if (cancelButton) buttonContainer.appendChild(cancelButton);
        [img, title, subtext, buttonContainer].forEach((el: HTMLElement) => dialog.appendChild(el));
        main.appendChild(dialog);
        shadowRootStyle.innerHTML = style;

        shadowRoot.appendChild(shadowRootStyle);
        shadowRoot.appendChild(main);

        // Append the modal to the document body.
        this._document.body.appendChild(wrapper);
    };

    /**
     * Returns an HTMLElement Button representation with a onClick redirect
     * @param buttonContent string you want to inject as innerHTML
     * @param callbacks callbacks fired when element is clicked
     * @returns the button
     */
    private createButton = (buttonContent: HTMLElement | string, callbacks: Array<Function>): HTMLElement => {
        const button: HTMLElement = this.createElement('button');
        button.innerHTML = buttonContent.toString();
        button.addEventListener('click', async () => {
            for await (const callback of callbacks) {
                callback();
            }
        });
        return button;
    };

    /**
     * Creates the image
     * @param src
     * @returns
     */
    private createImage = (src: string): HTMLImageElement => {
        const logo = this._document.createElement('img');
        logo.src = src;
        return logo;
    };

    /**
     * Show the modal.
     */
    private showModal = (): void => {
        this.addModalToDocument(this.getDefaultStyles(this._theme));
        this.toggleBodyScroll();
        this._onOpen();
    };

    /**
     * Hide the modal.
     */
    private hideModal = (): void => {
        const element = document.getElementById(this.ShadowDomContainer) as HTMLElement;
        this._document.body.removeChild(element);
        this.toggleBodyScroll();
        this._onClose();
    };

    /**
     * Toggles scrolling the body (on/off) when the modal is open or closed
     */
    private toggleBodyScroll = (): void => {
        if (this._document.body.style.position === 'fixed') {
            this._document.body.style.height = '100vh';
            this._document.body.style.overflowY = 'hidden';
        } else {
            this._document.body.style.height = '';
            this._document.body.style.overflowY = '';
        }
    };

    public get showInMs(): number {
        return this._showInMs;
    }
    public set showInMs(value) {
        this._showInMs = value;
    }

    public get window(): Window {
        return this._window;
    }
    public set window(value: Window) {
        this._window = value;
    }
}

window.BensPopup = BensPopup;

export default BensPopup;
