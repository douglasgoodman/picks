export type StorageKey = 'paletteMode' | 'signInHint';

export const useLocalStorage = () => {
    return {
        get<T>(key: StorageKey) {
            const result = localStorage.getItem(key);
            if (!result) {
                return undefined;
            }
            const value = JSON.parse(result);
            return value as T;
        },
        set<T>(key: StorageKey, value: T) {
            if (!value) {
                localStorage.removeItem(key);
                return;
            }
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove(key: StorageKey) {
            localStorage.removeItem(key);
        },
    };
};
