export function getInitialValues<T = object>(key: string) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) as T : undefined
    } catch (e) {
        localStorage.clear();
        return undefined;
    }
}