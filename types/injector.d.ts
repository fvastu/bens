export type ExecuteInPageArgs<Args extends any[]> = {
    tabId: number;
    func?: (...args: Args) => void;
    args?: Args;
    files?: string[];
};
declare function executeInPage<T>(param: ExecuteInPageArgs<any>): Promise<T | undefined>;
declare const scriptInjector: {
    executeInPage: typeof executeInPage;
};
export default scriptInjector;
