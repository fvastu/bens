export const IsManifestV3 = () => chrome.runtime.getManifest().manifest_version === 3;

export type ExecuteInPageArgs<Args extends any[]> = {
    tabId: number;
    func?: (...args: Args) => void;
    args?: Args;
    files?: string[];
};

async function executeInPageV2<T>(param: ExecuteInPageArgs<any>): Promise<void> {
    if (IsManifestV3()) {
        console.log('IsManifest v3');
    }
    const injectDetails: chrome.tabs.InjectDetails = {
        code: param.func?.toString(),
    };
    await chrome.tabs.executeScript(param.tabId, injectDetails);
}

async function executeInPage<T>(param: ExecuteInPageArgs<any>): Promise<T | undefined> {
    const args = getExecuteScriptingArgs(param);
    if (!args) return undefined;
    const injection = await chrome.scripting.executeScript(args);
    return injection ? (injection[0].result as T) : undefined;
}

const getExecuteScriptingArgs = (param: ExecuteInPageArgs<any>): chrome.scripting.ScriptInjection | undefined => {
    // Only one can exist
    if ((param.files && param.func) || (!param.files && !param.func)) return undefined;
    if (param.files) {
        return {
            target: { tabId: param.tabId },
            files: param.files,
            world: 'MAIN',
            // @ts-ignore
            injectImmediately: true,
        };
    }
    return {
        target: { tabId: param.tabId },
        func: param.func as () => void,
        args: param.args,
        world: 'MAIN',
        // @ts-ignore
        injectImmediately: true,
    };
};

const scriptInjector = {
    executeInPage,
};

export default scriptInjector;
