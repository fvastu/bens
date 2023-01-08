import BensNotification from './bens-notification';
import BensPopup from './bens-popup';
import scriptInjector from './injector';

declare global {
  interface Window {
    BensNotification: typeof BensNotification;
    BensPopup: typeof BensPopup;
  }
}

const chromeProtocolPrefix = 'chrome:';
const mozillaExtensionPrefix = 'moz-extension://';
const chromeExtensionProtocolPrefix = 'chrome-extension:';
const NOT_SUPPORTED = [
  chromeExtensionProtocolPrefix,
  mozillaExtensionPrefix,
  chromeProtocolPrefix,
];
type PopupType = 'modal' | 'notification';

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

export const createModal = (params: ModalInjectionParameters, tabId?: number) =>
  schedulePopupExecutionOfType('modal', params, tabId);

export const createNotification = (
  params: ModalInjectionParameters,
  tabId?: number
) => schedulePopupExecutionOfType('notification', params, tabId);

const schedulePopupExecutionOfType = (
  type: PopupType,
  params: ModalInjectionParameters,
  tabId?: number
) => {
  // Inject by default in the active tab
  if (!tabId || tabId === -1) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      tabs
        .filter(t => !NOT_SUPPORTED.some(url => t.url?.startsWith(url)))
        .forEach(tab => createModal(params, tab.id ?? -1));
    });
    return;
  }
  console.log(self);
  /*
  // Inject in the provided tabId
  hasBeenAlreadyAttached(tabId as number).then(value => {
    (value ? Promise.resolve() : attachScriptToWindow(tabId as number)).then(
      () => {
        // if (type === 'modal') executePopup(tabId as number, params);
        // else executeNotification(tabId as number, params);
      }
    );
  });
  */
};

// @ts-ignore
const hasBeenAlreadyAttached = async (tabId: number) => {
  return scriptInjector.executeInPage({
    tabId,
    func: () => !!window.BensPopup && !!window.BensNotification,
  });
};

// @ts-ignore
const attachScriptToWindow = async (tabId: number) => {
  return scriptInjector.executeInPage<void>({ tabId, files: ['script.js'] });
};

// @ts-ignore
const executePopup = async (
  tabId: number,
  params: ModalInjectionParameters
) => {
  return scriptInjector.executeInPage<void>({
    tabId,
    func: PopupFactory,
    args: [params],
  });
};

const PopupFactory = (args: ModalInjectionParameters) =>
  new window.BensPopup(args);

// @ts-ignore
const executeNotification = async (
  tabId: number,
  params: ModalInjectionParameters
) => {
  return scriptInjector.executeInPage<void>({ tabId, func: () => {} });
};