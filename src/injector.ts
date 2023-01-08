export type ExecuteInPageArgs<Args extends any[]> = {
    tabId: number;
    func?: (...args: Args) => void;
    args?: Args;
    files?: string[];
};

async function executeInPage<T>(param: ExecuteInPageArgs<any>): Promise<T | undefined> {
    const args = getExecuteScriptingArgs(param);
    if (!args) return undefined;
    const injection = await chrome.scripting.executeScript(args);
    return injection ? (injection[0].result as T) : undefined;
}

const getExecuteScriptingArgs = (param: ExecuteInPageArgs<any>): chrome.scripting.ScriptInjection<any, any> | undefined => {
    // Only one can exist
    if ((param.files && param.func) || (!param.files && !param.func)) return undefined;
    if (param.files) {
        return {
            target: { tabId: param.tabId },
            files: param.files,
            world: 'MAIN',
            injectImmediately: true,
        };
    }
    return {
        target: { tabId: param.tabId },
        func: param.func as () => void,
        args: param.args,
        world: 'MAIN',
        injectImmediately: true,
    };
};

const scriptInjector = {
    executeInPage,
};

export default scriptInjector;
