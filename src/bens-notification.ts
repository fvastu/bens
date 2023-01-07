'use strict';

class BensNotification {
    // Frontend modal features
    _headline = '';
    _text = '';
    _logo = '';

    // Document Object
    private _document: Document;
    private _window: Window;

    // showInMs until modal is shown - in ms
    private _showInMs = 0;

    // Light/Dark Theme
    private _theme = 'light';

    private _onOpen: () => void;
    private _onClose: () => void;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    noop = function () {};

    /**
     * Constructor
     * @param param0 object (see the docs for parameters)
     */
    constructor({
        window,
        headline,
        text,
        logo,
        frequency,
        showInMs,
        theme,
        onOpen,
        onClose,
    }: {
        window: Window;
        headline: string;
        text: string;
        logo?: string;
        frequency?: number;
        showInMs?: number;
        theme?: 'dark' | 'light';
        onOpen?: () => void;
        onClose?: () => void;
    }) {
        this._document = window.document;
        this._window = window;

        this._headline = headline;
        this._text = text;
        this._logo = logo || '';

        this._showInMs = showInMs || 0;

        this._theme = theme || 'light';

        // use parameter function or do nothing
        this._onOpen = onOpen || this.noop;
        this._onClose = onClose || this.noop;

        // Show the modal if it's showtime and manual-mode is disabled (default)
        this.isShowtime().then((result) => {
            this.showModal();
        });
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
    public addDefaultStyles = (theme: string): void => {
        console.log(theme);
    };

    // Shortform create a HTMLElement
    private createElement(tagName: string): HTMLElement {
        return this._document.createElement(tagName);
    }

    // Add Modal to user-specified Document object
    private addModalToDocument = (): void => {
        const blurEl: HTMLElement = this.createElement('div');
        const modalEl: HTMLElement = this.createElement('div');
        const headline: HTMLElement = this.createElement('h3');
        const subtext: HTMLElement = this.createElement('span');

        const logo = this.createImage(this._logo);

        const button = this.createButton('this is a link', 'Visit now');

        headline.classList.add('fbm-headline');
        headline.innerHTML = this._headline;

        subtext.classList.add('fbm-text');
        subtext.innerHTML = this._text;

        modalEl.classList.add('fbm-modal');
        modalEl.appendChild(logo);
        modalEl.appendChild(headline);
        modalEl.appendChild(subtext);
        modalEl.appendChild(button);

        // Do not close the Modal when clicked on the child element
        modalEl.addEventListener('click', (ev) => {
            ev.stopPropagation();
        });

        blurEl.classList.add('fbm-blur');
        blurEl.appendChild(modalEl);

        // Close the Modal when clicked anywhere outside the modal (aka the blur element)
        blurEl.addEventListener('click', () => {
            this.hideModal(blurEl);
        });

        // Append the modal to the document body.
        this._document.body.appendChild(blurEl);
    };

    /**
     * Returns an HTMLElement Button representation with a onClick redirect
     * @param link string: url the user get's redirected to on click
     * @param buttonContent Array: [store icon, store button text]
     * @returns HTMLElement : r2u button element
     */
    private createButton = (link: string, buttonContent: any): HTMLElement => {
        const button: HTMLElement = this.createElement('button');
        button.classList.add('fbm-button');

        button.innerHTML = buttonContent[1];
        button.addEventListener('click', () => this.redirectTo(link));

        return button;
    };

    // Create Logo Element from source
    private createImage = (src: string): HTMLImageElement => {
        const logo = this._document.createElement('img');
        logo.classList.add('fbm-logo');
        logo.src = src;

        return logo;
    };

    // Open a new tab after clicking the button
    private redirectTo = (link: string): void => {
        this._window.open(link, '_blank');
    };

    /**
     * Show the modal.
     */
    private showModal = (): void => {
        const wrapper = document.createElement('div');
        const shadowRoot = wrapper.attachShadow({ mode: 'closed' });
        const template = document.createElement('template');

        template.innerHTML = `
        <iframe frameborder="0"></iframe>
        <style>
        :host {
            all: initial;
            display: flex !important;
            align-items: flex-end;
            position: fixed;
            top: 10px;
            right: 10px;
            left: 10px;
            bottom: 10px;
            z-index: 2147483647;
            pointer-events: none;
        }
        iframe {
            flex-grow: 1;
            pointer-events: auto;
            display: block;
            width: min(440px, calc(100% - 20px));
            height: 346px;
            box-shadow: 30px 60px 160px rgba(0, 0, 0, 0.4);
            border-radius: 16px;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.13) 0%, rgba(0, 0, 0, 0.27) 100%);
            opacity: 0;
            transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
            transform: translateY(20px);
        }
        iframe.active {
            opacity: 1;
            transform: translateY(0);
        }
        @media screen and (min-width: 640px) {
            :host {
            justify-content: flex-end;
            align-items: start;
            }
            iframe {
            flex-grow: 0;
            transform: translateY(-20px);
            }
        }
        </style>
    `;

        shadowRoot.appendChild(template.content);
        document.body.appendChild(wrapper);

        const iframe = shadowRoot.querySelector('iframe');

        setTimeout(() => {
            iframe?.classList.add('active');
        }, 100);
        // this.addDefaultStyles(this._theme);
        // this.addModalToDocument();
        // this.addToCache();
        this.toggleBodyScroll();
        this._onOpen();
    };
    /**
     * Hide the modal.
     * @param element fbm-blur div as HTMLElement
     */
    private hideModal = (element: HTMLElement): void => {
        this._document.body.removeChild(element);
        this.toggleBodyScroll();
        this._onClose();
    };

    /**
     * Check if showInMs has expired and modal can be shown
     * @returns Promise : true => show modal | false => don't show modal
     */
    private isShowtime = async () => {
        return new Promise((resolve, reject) => {
            /*
            // If the modal is already shown use the last "shown" date, not the installDate
            storage.local
                .get('feedbackprompt')
                .then((data) => {
                    const now = new Date(Date.now());
                    // Declaration if the modal hasn't been shown already.
                    let lastDate = this._installDate.getTime();

                    if (data.feedbackprompt && data.feedbackprompt.length > 0) {
                        const times = data.feedbackprompt;
                        lastDate = times[times.length - 1];
                    }

                    // Calculate the time passed to see if it's time to show the modal again
                    const timePassed = now.getTime() - lastDate;

                    if (timePassed > this._showInMs) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => reject(error));
                */
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
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

//attach the class
// @ts-ignore
window.BensNotification = BensNotification;

export default BensNotification;
