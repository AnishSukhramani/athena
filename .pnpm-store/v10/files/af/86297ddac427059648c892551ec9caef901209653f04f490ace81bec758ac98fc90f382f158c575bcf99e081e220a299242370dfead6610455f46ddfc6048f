export declare function retry<T>({ func, params, onError, }: {
    func: () => Promise<T>;
    params?: {
        retryCount: number;
    };
    onError?: (...err: Array<unknown>) => void;
}): Promise<T>;
